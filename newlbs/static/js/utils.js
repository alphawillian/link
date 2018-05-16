var utils = {
  //获取url里的query值
  getQueryString: function(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
  },
  //获取当前的运行环境
  runEnvironment: function(){
    var isWX = /MicroMessenger/i;
    var isJDJR = /jdjr-app/i;
    var isJDAPP = /jdapp/i;
    var UA = window.navigator.userAgent.toLocaleLowerCase();
    var environment = 'H5';
    if(isWX.test(UA)){
      environment = 'WX';
    }else if(isJDAPP.test(UA)){
      environment = 'JD';
    }else if(isJDJR.test(UA)){
      environment = 'JR';
    }else{
      environment = 'H5';
    }
    return environment
  },
  //获取地理位置 
  getLatLng: function(callback,failFn){
    var _this = this;
    var latLng = {};
    var environment = _this.runEnvironment();
    if(environment == 'JD'){
      console.log('runEnvironment:JD')
      latLng = _this.getLatLngH5(callback, failFn)
    }else if(environment == 'JR'){
      var defer = jsBridgeV3.onReady();
      defer.then(function(res) {
        res.jsToGetResp(function(d) {
          d = (typeof d == 'object') ? d : JSON.parse(d);
          console.log(JSON.stringify(d));//这里的d即是返回的设备信息
          if(d.deviceInfo.latitude && d.deviceInfo.longitude){
            console.log("qwerty")
            latLng.latitude = d.deviceInfo.latitude
            latLng.longitude = d.deviceInfo.longitude
            callback(latLng)
          }else{
            latLng = _this.getLatLngH5(callback,failFn)
          } 
          // callback(latLng)
        }, {
            type: 9,
            //isLocation—是否要获取定位信息,原生默认为true
            isLocation: true,
            data: ''
          });
      });
      // return latLng
    }else if(environment == 'WX'){
      console.log('runEnvironment:WX')
      // latLng = _this.getLatLngH5(callback, failFn)
      // wx.config({
      //   debug: false, // 微信调试
      //   // appId: data.appId,
      //   // timestamp: data.timestamp,
      //   // nonceStr: data.nonceStr,
      //   // signature: data.signature,
      //   jsApiList: [
      //       // "scanQRCode",
      //       "getLocation",
      //   ]
      // });
      // wx.ready(function(){
      //   console.log(wx.getLocation())
      //   wx.getLocation({
      //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function (res) {
      //       latLng.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //       latLng.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //       console.log('WX经度：'+_this.longitude+'WX纬度'+_this.latitude);
      //       callback(latLng)
      //     }
      //   });
      // });
      var citylocation = new qq.maps.CityService();
      console.log('aa')
      //请求成功回调函数
      citylocation.setComplete(function(result) {
          var pos = result.detail.latLng;
          console.log('tencentSuc')
      });
      //请求失败回调函数                                                                             
      citylocation.setError(function() {
          // gps获取位置失败                        
          var center = new qq.maps.LatLng(39.916527, 116.397128); // 故宫
          console.log('tencentError')
      });
    }else if(environment == 'H5'){
      latLng = _this.getLatLngH5(callback, failFn)
    }
  },
  // H5获取地理位置
  getLatLngH5: function(callback, failFn){
    var latLng = {}
    navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
      function(pos){ // 如果成果则执行该回调函数
        latLng.latitude = pos.coords.latitude;
        latLng.longitude = pos.coords.longitude;
        callback(latLng)

      }, function(err){ // 如果失败则执行该回调函数
        console.log('h5未获取地理位置信息的处理逻辑')
        if(failFn){
          failFn()
        }
      }, { // 附带参数
        enableHighAccuracy: true, // 提高精度(耗费资源)
        timeout: 10000, // 超过timeout则调用失败的回调函数
        maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
      }
    );
    return latLng
  }
}