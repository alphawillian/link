;(function(){

  var userLatLng = {}
  var map = null;
  var mapController = {
    init: function(){
      this.getLatLng()
      this.getUserLatLng()
      // this.initMap()
    },
    // 获取位置信息，从url参数里获取或通过定位
    getLatLng: function(){
      var _this = this;
      var latLng = {}
      if(utils.getQueryString('cityCode')){


      }else{

      }
      // latLng = utils.getLatLng()
      // console.log('map')
      // console.log(JSON.stringify(latLng) )
      
    },
    //获取用户地理位置信息
    getUserLatLng: function(latLng){
      userLatLng = latLng
    },

    // 地图初始化
    initMap: function(latLng){
      var _this = this
      console.log("callback")
      if(!latLng.latitude || !latLng.longitude){
        var latitude = {
          // latitude: 
          // longitude: 
        }
      }
      map = new qq.maps.Map($("#map").get(0), { // 构造
        center: new qq.maps.LatLng(latLng.latitude, latLng.longitude), // 地图的中心地理坐标。
        zoom: 14,
        scrollwheel: false,
        //minZoom: 13,
        maxZoom: 18,
        //启用比例尺
        scaleControl: true,
        scaleControlOptions: {
            //设置控件位置相对右下角对齐，向左排列
            position: qq.maps.ControlPosition.BOTTOM_RIGHT
        },
        mapTypeControl: false, // 不显示地图类型
        test: ''
      });
      console.log(mapController)
      mapController.getShopList()
    },
    
    getShopList: function(){
      console.log('getShopList')
    }
  }
  mapController.init()

})();