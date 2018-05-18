;(function(){

  var userLatLng = {} //用户经纬度
  var paramLatLng = {}  //传入的参数经纬度
  var map = null;
  var mapController = {
    init: function(){
      this.getLatLng()
      this.getUserLatLng()
      this.handleLatLng()
      // this.initMap()
      this.getShopList()
      this.getShopDetail()
    },
    // 获取位置信息，从url参数里获取或通过定位
    getLatLng: function(){
      var _this = this;
      var latLng = {}
      if(utils.getQueryString('cityCode')){

      }else if(utils.getQueryString('lat') && utils.getQueryString('lng')){
        latLng.latitude = utils.getQueryString('lat')
        latLng.longitude = utils.getQueryString('lng')
      }
      paramLatLng = latLng
      utils.getLatLng() 
    },
    //获取用户地理位置信息
    getUserLatLng: function(latLng){
      userLatLng = latLng
    },
    //处理地理位置信息
    handleLatLng: function(){
      var mapCenter = {}
      if(!true){
        mapCenter = paramLatLng
      }else{
        mapCenter = {
          latitude:39.916527,
          longitude: 116.397128,
        }
      }
      this.initMap(mapCenter)

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
        scaleControl: false,
        scaleControlOptions: {
            //设置控件位置相对右下角对齐，向左排列
            position: qq.maps.ControlPosition.BOTTOM_RIGHT
        },
        mapTypeControl: false, // 不显示地图类型
        test: ''
      });
      console.log(mapController)
    },
    //获取商户列表
    getShopList: function(){
      proHub.getShopList({},function(res){
        console.log(res)
      },function(err){
        console.log(err);
      })
    },
    getShopDetail: function(){
      proHub.getShopDetail({},function(res){
        console.log(res)
      },function(err){
        console.log(err);
      })
    }
  }
  mapController.init()

})();