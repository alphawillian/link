/**
 * Created by dandan on 2017/7/12.
 * vision:1.0
 * title:
 * e-mail:sunchao5@jd.com
 */

// rem px换算
;
(function() {
    $('body').on('touchmove', function(event) {
        event.preventDefault();
    })
})();
(function() {
    function computeRem() {
        var winWidth = document.documentElement.clientWidth;
        var winHeight = window.innerHeight;
        if (winWidth <= 320) winWidth = 320;
        if (winWidth >= 750) winWidth = 750;
        var targetRem = parseInt(winWidth / 375 * 100);
        if (targetRem % 2) {
            targetRem++;
        }
        document.documentElement.style.fontSize = targetRem + "px";
    }
    //iPhone 底部适配
    function iosformat(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
            $("body").addClass("has-bottombar");
        }
    }
    // iosformat();

    window.addEventListener("resize", computeRem);
    computeRem();
})();
/**================================================================
 自定义覆盖物
 =================================================================*/
(function() {
    var c = "click";
    var idx = 0;

    function CustomOverlay(opts) {
        opts = opts || {};
        this.opts = opts;
        var data = opts.data || {};
        var cenPos = new qq.maps.LatLng(data.latitude, data.longitude);
        this.index = idx++;
        this.position = cenPos;
        this.data = data;
    }

    CustomOverlay.prototype = new qq.maps.Overlay();
    //定义construct,实现这个接口来初始化自定义的Dom元素
    CustomOverlay.prototype.construct = function() {
        var data = this.data;
        // 通过remark 判断是否有优惠 这一期全部有优惠 暂时屏蔽掉
        // data.coupMark = data.remark ? 'coupMark' : '';
        data.coupMark = 'coupMark';
        
        var tagStr = jm.tools.format('<div class="cus-tag s-2 {coupMark}" code="{storeCode}" type="{merchantType}"><div class="c-cont"><div class="c-disc"><p class=" abs-lm"><img src="{icon}" alt=""></p><div class="abs-mm"><span>{remark}</span><label>元</label></div></div><p class="c-name">{name}</p></div><img class="shopType" src="{img}?t=1501065754656" alt=""></div>', data);
        if(data.redPacket){
            tagStr = jm.tools.format('<div class="cus-tag s-2 {redPacket}" code="{storeCode}" type="{merchantType}"><div class="c-cont"><div class="c-disc"><p class=" abs-lm"><img src="{icon}" alt=""></p><div class="abs-mm"><span>{remark}</span><label>元</label></div></div><p class="c-name">{name}</p></div><span id="circle1" class="circle"></span><span id="circle2" class="circle"></span><span id="circle3" class="circle"></span><span id="circle4" class="circle"></span><img class="shopType" src="{img}?t=1501065754656" alt=""></div>', data);
        }
        var $over = $(tagStr);

        this.$tag = $over;

        //将dom添加到覆盖物层
        var panes = this.getPanes();
        //设置panes的层级，overlayMouseTarget可接收点击事件
        panes.overlayMouseTarget.appendChild($over.get(0));

        var self = this;
        $over.on(c, function() {
            self.opts.clickFn && self.opts.clickFn(this, data);
        });
    };

    //实现draw接口来绘制和更新自定义的dom元素
    CustomOverlay.prototype.draw = function() {
        var overlayProjection = this.getProjection();
        // 返回覆盖物容器的相对像素坐标
        var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
        var $tag = this.$tag;
        var obj = this.data.typeObj;
        $tag.css({ left: pixel.x - obj.w / 2 + "px", top: pixel.y - obj.h / 2 + "px" });
    };

    //实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
    CustomOverlay.prototype.destroy = function() {
        this.$tag.off().remove();
        this.$tag = null;
    };
    window.CustomOverlay = CustomOverlay;
})();

/**================================================================
 当前页面
 =================================================================*/
;
(function() {
    var h = "hidden";
    var c = "click";
    var d = "disabled";
    var a = "active";
    var curPos = {};
    var mapKey = "42DBZ-MDEK3-IKS3Q-3MI6O-YN2EE-NJFSL";
    var sid = jm.getUrlString("sid") || jm.getCookie("sid");
    var myScroll;
    var titleSco;
    var map;
    var htmlFontSize = parseInt($('html').css('font-size'));
    var toLimitArr = [ 0, 0.5 * htmlFontSize, 1 * htmlFontSize, 1.5 * htmlFontSize]
    var storeHgtArr = [1 * htmlFontSize, 2.4 * htmlFontSize, 3.6 * htmlFontSize, 4 * htmlFontSize, 0];

    window.jmPage = window.jmPage || {};
    jmPage.storeHgtArr = storeHgtArr;
    var markerArr = [];

    // 0 - 优惠商户，1 - ka商户；2 - 普通商户
    var typeMap = {
        "0": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8632/167/893476203/5007/7aa0faea/59b0ab35Ndc4ce67e.png" }, // 全部
        "1": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8578/237/891379670/4029/c4fada55/59b0accfN139d6f1d.png" }, // 自动售卖机,蓝色
        "2": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8584/225/865875473/4785/22c5159b/59b0acc1Nbfb83962.png" }, // 商超
        "3": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8632/167/893476203/5007/7aa0faea/59b0ab35Ndc4ce67e.png" }, // 百货
        "4": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8683/256/876144465/4990/be9b6a67/59b0ab6bN967f5e80.png" }, // 便利店,绿色
        "5": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t9343/228/892577380/4671/7adb0c1f/59b0acd9N2a432bd5.png" }, // 餐饮,红色
        "6": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8578/237/891379670/4029/c4fada55/59b0accfN139d6f1d.png" },
        "7": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8578/237/891379670/4029/c4fada55/59b0accfN139d6f1d.png" },
        "8": { w: 32, h: 32, img: "//img30.360buyimg.com/jr_image/jfs/t8578/237/891379670/4029/c4fada55/59b0accfN139d6f1d.png" },
    };
    var tabList = [];
    // var markerClusterer;

    var MapController = {
        init: function() {
            this.mapInit();
            jmPage.storeClusterFn = this.storeClusterFn;      
        },
        mapInit: function() {
            var _this = this;
            var map = null;
            var selfMarker = null;
            var $dialogCoup = $(".dialog-coup");
            var $dialogStores = $(".dialog-stores");

            // 优惠信息展示
            jmPage.dialogCoup = {
                show: function(state) {
                    setTimeout(function() {
                        // 先把$dialogCoup的hidden属性关闭
                        jtools.dialogAnimate.show($dialogCoup);
                    }, 10);
                    // state = (state) ? state : 0;
                    jmPage.showCoupStatus(state);
                },
                close: function() {
                    jtools.dialogAnimate.close($dialogCoup);
                }
            };
            // 优惠商家展示
            jmPage.dialogStores = {
                show: function(state) {
                    if (state !== undefined) {
                        jmPage.showStatus(state);
                    }
                    setTimeout(function() {
                        jtools.dialogAnimate.show($dialogStores);
                    }, 10);
                },
                close: function() {
                    jtools.dialogAnimate.close($dialogStores);
                }
            };

            // 导航
            jmPage.goNav = function(code) {
                var data = jmPage.findByCode(code);
                var arr = [];
                arr.push("eword=" + data.name);
                arr.push("epointx=" + data.latitude); // 终点经度
                arr.push("epointy=" + data.longitude); // 终点纬度
                var str = arr.join("&");
                var param = jm.tools.format("?key={0}&referer={1}", mapKey, "京东支付优惠商户列表")

                var url = "//apis.map.qq.com/tools/routeplan/" + str + param;
                location.href = url
            };

            this.getPos(function(pos) {
                curPos = pos;
                init(pos);
                jmPage.posCallback && jmPage.posCallback(pos, getScale());
            }, function() {
                jm.com.showDialog({
                    content: "请在系统设置中打开GPS定位服务，为您提供更全面的地图服务",
                    btnText: "知道了",
                    btnType: "line",
                    title: "提示信息"
                });
                //设置城市信息查询服务
                var citylocation = new qq.maps.CityService();
                //请求成功回调函数
                citylocation.setComplete(function(result) {
                    var pos = result.detail.latLng;
                    curPos = pos;
                    init(pos);
                    jmPage.posCallback && jmPage.posCallback(pos, getScale());
                });
                //请求失败回调函数                                                                             
                citylocation.setError(function() {
                    // gps获取位置失败                        
                    var center = new qq.maps.LatLng(39.916527, 116.397128); // 故宫
                    init(center);
                    jmPage.posCallback && jmPage.posCallback(center, getScale());
                });
                citylocation.searchLocalCity();
            });
            // 初始化地图
            function init(pos) {
                var center = new qq.maps.LatLng(pos.lat, pos.lng);
                map = new qq.maps.Map($("#map").get(0), { // 构造
                    center: center, // 地图的中心地理坐标。
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
                    test: ""
                });
                MapController.map = map;
                setSelfMarker(center);
                _this.storeClusterInit();

                // 点击地图
                qq.maps.event.addListener(map, 'click', function() {
                    jmPage.dialogCoup.close();
                    if ($('.store-list li').length > 0) {
                        jmPage.dialogStores.show(0);
                    }
                    $(".cus-tag").removeClass(a);
                });
                // 缩放更改
                qq.maps.event.addListener(map, 'zoom_changed', function(e) {
                    var zoom = map.getZoom();
                    if (zoom <= 13) {
                        //$(".scale-mask").removeClass(h);
                    } else {
                        //$(".scale-mask").addClass(h);
                    }
                });
                // 如果地图在平移或缩放之后变为闲置状态，则会触发此事件。
                qq.maps.event.addListener(map, 'bounds_changed', function(e) {
                    if(!$('.dialog-coup').hasClass('dialogCoupShow')){
                        jmPage.dialogCoup.close();
                    }
                    var center = map.getCenter();
                    jmPage.posCallback(center, getScale());
                    //var callback = jmPage.posCallback;
                    //获取城市编码并展示所在地商户信息
                    //getCityCode(center,jmPage.posCallback);
                });
            }

            function getCityCode(data,callback){
                $.ajax({
                    url: '//apis.map.qq.com/ws/geocoder/v1?',
                    type: 'get',
                    async: false,
                    jsonp:"callback",
                    data:{
                        output:"jsonp",
                        location:data.lat+','+data.lng,
                        key:"42DBZ-MDEK3-IKS3Q-3MI6O-YN2EE-NJFSL"
                    },
                    dataType:'jsonp', 
                    success: function(res) {
                        if(res.status == 0){
                            data.adcode = res.result.ad_info.adcode;
                        }else{
                            data.adcode =  null;
                        }
                        callback(data,getScale());
                    },
                    error: function(res) {                     
                        data.adcode =  null;
                        callback(data,getScale());
                    }
                });
            }

            // 获取范围
            function getScale() {
                var zoom = map.getZoom();
                var obj = {
                    // 18: 1000,
                    // 17: 1500,
                    // 16: 2000,
                    // 15: 2500,
                    // 14: 3000,
                    // 13: 5000,
                    18: 500,
                    17: 1000,
                    16: 1000,
                    15: 1000,
                    14: 2000,
                    13: 4000,
                    12: 8000,
                    11: 12000,
                    10: 16000,
                };
                return obj[zoom] || 0;
            }

            // 设置当前的位置
            function setSelfMarker(center) {
                selfMarker = new qq.maps.Marker({
                    position: center,
                    map: map
                });
                var anchor = new qq.maps.Point(10, 10);
                var size = new qq.maps.Size(20, 20);
                var origin = new qq.maps.Point(0, 0);
                var scaleSize = new qq.maps.Size(20, 20);
                var markerIcon = new qq.maps.MarkerImage(
                    "//storage.jd.com/static-res/payment/custom/active/lbs/images/dot.png",
                    size, origin, anchor, scaleSize
                );
                selfMarker.setIcon(markerIcon);
            }

        },

        // 创建自定义覆盖物
        createMarker: function(data) {
            var self = this;
            var type = 2;
            
            var typeObj = typeMap[data.merchantType];
            data.redPacket = "";
            if(!true){
                typeObj = typeMap[9];
                data.redPacket = "redPacket"
            }
            data.img = typeObj.img;
            data.type = type;
            var txt = data.remark || "";
            data.icon = data.logoAddress || "//storage.jd.com/static-res/payment/custom/active/lbs/images/default.png";
            data.typeObj = typeObj;
            var $prev = $(".cus-tag[code='" + data.storeCode + "']");
            if ($prev.hasClass(a)) {
                jmPage.dialogCoup.close();
            }
            $prev.remove();

            var overlay = new CustomOverlay({
                //pos: cenPos,
                data: data,
                clickFn: function(tar, obj) {
                    var code;
                    code = $(tar).attr('code');
                    MapController.turnCoup(code);
                }
            });
            overlay.setMap(self.map);
            markerArr.push(overlay);

        },

        // 创建商家信息
        createStoreItem: function(data, template) {
            data.hide = (data.remark == '') ? 'hide' : '';
            data.unitPay = data.unitPay.join('、');
            var tagStr = jm.tools.format(template, data);
            return tagStr
        },


        // 创建优惠券领券信息
        createQuanItem: function(data, template) {
            var quanStr = jm.tools.format(template, data);
            return quanStr;
        },
        // 检测当前的marker是否存在，如果存在就不创建了
        hasMarker: function(tar) {
            var $list = $("body").find(".cus-tag");
            for (var i = 0, len = $list.length; i < len; i++) {
                var $item = $($list[i]);
                var code = $item.attr("code");
                if (code == tar) {
                    return true;
                }
            }
            return false;
        },

        // 清空 marker
        clearMarker: function() {
            for (var i = 0; i < markerArr.length; i++) {
                var item = markerArr[i];
                item.setMap(null);
            }
            markerArr = [];
        },


        // 获取当前位置
        getPos: function(successFn, failFn) {
            var geolocation = new qq.maps.Geolocation(mapKey, "jd");
            geolocation.getLocation(function(pos) {
                    successFn && successFn(pos);
                }, function() {
                    failFn && failFn();
                }, { timeout: 5000 })
                /*
                 geolocation.watchPosition(showPosition);
                 geolocation.clearWatch();
                 */
        },

        // 跳转优惠列表弹窗
        turnCoup: function(code) {
            $(".cus-tag").removeClass(a);
            $('.cus-tag[code="' + code + '"]').addClass(a);
            jmPage.dialogStores.close();
            // jmPage.dialogCoup.show();
            var obj = jmPage.findByCode(code);
            jmPage.markerClick && jmPage.markerClick(obj);
        },
        // 跳转红包券具体信息
        turnLotteryInfo: function(code, payPrizeId){

            var obj = jmPage.findByCode(code);
            var payPrizeId = payPrizeId;
            jmPage.lotteryGet && jmPage.lotteryGet(obj, payPrizeId);
        },

        // 跳转优惠券具体信息
        turnCoupInfo: function(code, payPrizeId, index) {
            var obj = jmPage.findByCode(code);
            var payPrizeId = payPrizeId;
            jmPage.coupGet && jmPage.coupGet(obj, payPrizeId, index);
        },

        //点击商户列表，地图中心定位到商户
        storeCenter: function(location){
            var center = new qq.maps.LatLng(location.latitude, location.longitude);
            MapController.map.setCenter(center);
            MapController.map.setZoom(17);
            $(".dialog-coup").addClass("dialogCoupShow");
        },
        // 商户聚合初始化
        storeClusterInit: function (){
            var map = MapController.map;
            var MVCArray = qq.maps.MVCArray;
            var MarkerCluster = qq.maps.MarkerCluster;
            var MarkerDecoration = qq.maps.MarkerDecoration;

            var MarkerImage = qq.maps.MarkerImage;
            var MarkerShape = qq.maps.MarkerShape;
            var Point = qq.maps.Point;
            var Size = qq.maps.Size;
            
            var markers = new MVCArray();
            markerClusterer = new MarkerCluster({
                map: map,
                minimumClusterSize: 2, //默认2
                markers: markers,
                zoomOnClick: true, //默认为true
                gridSize: 60, //默认60
                averageCenter: true, //默认false
                maxZoom: 15, //默认18
                zIndex: 1000,
            });
            MapController.markerClusterer = markerClusterer;
            MapController.markers = markers;
            var MarkerImage_size = new qq.maps.Size(27,50);
            var MarkerImage_origin = new qq.maps.Point(0,0);
            var MarkerImage_anchor = new qq.maps.Point(11,21);
            var MarkerImage_scaleSize = new qq.maps.Size(27,50);
            var Styles = [{
                icon: new MarkerImage("//img30.360buyimg.com/jr_image/jfs/t16438/212/2680454590/1559/87ea1160/5ab8cb7eNe5edfaaf.png",MarkerImage_size,MarkerImage_origin,MarkerImage_anchor,MarkerImage_scaleSize),
                text: new MarkerDecoration('<font style="position: relative; left:0; top: -17px; width:100%; text-align: center ; color:#129ba7;font-size:10px;font-weight:bold;">{num}</font>', new Point(0, 5))
            }]
             
            function setMarkerClusterOption(key, value) {
                markerClusterer.set(key, value);
            }
            setMarkerClusterOption("styles", Styles ? Styles : null);
            
        },
        // 通过数据聚合商户
        storeClusterFn: function(data){
            if (!data) return;
            var _this = this;
            MapController.markerClusterer.clearMarkers();
            var Marker = qq.maps.Marker;
            var LatLng = qq.maps.LatLng;
            var Event = qq.maps.event;

            for (var i = 0; i < data.length; i++) {
                var latLng = new LatLng(data[i].latitude, data[i].longitude);
                var marker = new Marker({
                    position: latLng,
                    map: MapController.map,
                    visible: true,
                    title: data[i].storeCode
                });
                var marker_img = typeMap[data[i].merchantType].img;
                var anchor = new qq.maps.Point(15, 15);
                var    size = new qq.maps.Size(30,30);
                var    origin = new qq.maps.Point(0, 0);
                var    scaleSize = new qq.maps.Size(30,30);
                var    icon = new qq.maps.MarkerImage(
                        marker_img,
                        size,
                        origin,
                        anchor,
                        scaleSize
                    );
                marker.setIcon(icon);
                MapController.markers.push(marker);
            }
            
            MapController.markerClusterer.markers = MapController.markers;
            Event.addListener(markerClusterer, 'clusterclick', function(evt) {
                // writeLog("mouse event", eventType);
                // alert('点击了聚合点');
                MapController.map.setCenter(evt.latLng);
                MapController.map.setZoom(16);
            });
            setTimeout(function(){    
                data.forEach(function(item,index){
                    var currMarker = $("div[title='"+data[index].storeCode+"']");
                    currMarker.append('<div class="storeDot"></div><div class="storeName">'+data[index].name+'</div>');
                    currMarker.css('overflow','unset');
                    currMarker.attr("data-storeCode",data[index].storeCode);
                    currMarker.on("click",function(){
                        var code = $(this).attr('data-storeCode');
                        MapController.turnCoup(code);
                    })
                })
            },300)
            
        },
    };

    var pageController = {
        init: function() {
            this.pageInit();
            this.setShare();
            // 执行滑动方法
            slideUD();
            slideCP();
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                myScroll = new IScroll('.scrwrap', { preventDefault: true, });
            } else {
                myScroll = new IScroll('.scrwrap', { preventDefault: false, });
            }
            titleSco = new IScroll('.title', {
                preventDefault: false,
                scrollX: true,
                scrollY: false,
            });
        },
        pageInit: function() {
            var $title = $(".title");
            var defaultHeight = $('.dialog-stores').height();

            $("body").on(c, ".title li", function() {
                $(this).addClass(a).siblings().removeClass(a);
            }).on(c, 'li.store', function() {
                var code = $(this).attr('code');
                var storeLocation = {
                    latitude: $(this).attr('data-lat'),
                    longitude: $(this).attr('data-lon'),
                }
                MapController.turnCoup(code);
                MapController.storeCenter(storeLocation);
            }).on(c, '.coup-quan .info-r', function() {
                var code = $(this).parent().attr('code');
                var payPrizeId = $(this).parent().attr('payPrizeId');
                var index = $(this).parent().index();
                //pageController.checkLogin(code, payPrizeId, index);
                if($(this).find('a').hasClass('willJump')){
                    location.href = "//home.jdpay.com/my/coupon/300/notused?source=JDSC";
                }else{
                    MapController.turnCoupInfo(code, payPrizeId, index);
                }
                // MapController.turnCoupInfo(code, payPrizeId, index);
            }).on(c, '.coup-quan .info-r a.look', function(event) {
                return false;
            }).on(c, ".backCenter", function() {
                // 返回到用户所在位置
                var center = new qq.maps.LatLng(curPos.lat, curPos.lng);
                MapController.map.setCenter(center);
            }).on(c, ".slide-bar", function() {
                jmPage.dialogStores.show(1);
            }).on(c,'.getRedCoup',function(){
                // 可计算两点距离
                // var userLocation = new qq.maps.LatLng(curPos.lat, curPos.lng);
                // var mapLocation = MapController.map.getCenter();
                // var distance = qq.maps.geometry.spherical.computeDistanceBetween(userLocation, mapLocation);
                var code = $(this).attr('data-code');
                var prizeId = $(this).attr('data-prizeId');
                MapController.turnLotteryInfo(code, prizeId);
            });



            // 生成顶部tab选项
            jmPage.fillTab = function(list) {
                tabList = list;
                var str = "";
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    item.active = i == 0 ? "active" : "";
                    str += jm.tools.format('<li class="{active}" cid="{cateId}">{cateName}</li>', item);
                }
                $title.find("ul").append(str);
                titleSco.refresh();
            };

            // 通过tab-id获取到name
            jmPage.getTitleById = function(id) {
                for (var i = 0, len = tabList.length; i < len; i++) {
                    var tab = tabList[i];
                    if (tab.cateId == id) {
                        return tab.cateName;
                    }
                }
                return "";
            };

            // 填充商户数据                               
            jmPage.fillMarker = function(list) {
                if(!list) return
                var storeLocationArr = [];
                jmPage.storeClusterFn(list);
                var storeTemp = '';
                var template = $("#storeTemplate").html();
                // 通过覆盖物来生成商户图标
                // MapController.clearMarker();
                console.log('返回的商户列表数：'+list.length)
                for (var i = 0, len = list.length; i < len; i++) {
                    var item = list[i];
                    // MapController.createMarker(item);
                    storeTemp += MapController.createStoreItem(item, template);
                }
                $('.store-list').html(storeTemp);
                myScroll.refresh();
                jmPage.proList = list;

                jmPage.findByCode = function(code) {
                    var list = jmPage.proList;
                    for (var i = 0, len = list.length; i < len; i++) {
                        var pro = list[i];
                        if (pro.storeCode == code) return pro;
                    }
                    return null;
                };
            }
        },

        // 判断登录状态
        checkLogin: function(code, payPrizeId, index) {

            var loginUrl = "//passport.m.jd.com/user/login.action";
            if (!sid) {
                // 当前页面地址
                var curPath = window.location.origin + window.location.pathname;
                window.location.href = loginUrl + "?returnurl=" + curPath;
                return;
            } else {
                var payPrizeId = payPrizeId;
                MapController.turnCoupInfo(code, payPrizeId, index);
            }
        },

        setShare: function() {
            window.share && window.share.setShare({
                "title": "京东闪付尝鲜令",
                "desc": "这些店每天无门槛立减6.6，爽不爽试了再说！",
                "link": "https://lbspay.jd.com/merchantActivity/mainPage/default_cxl.do",
                "imgUrl": "https://img30.360buyimg.com/jr_image/jfs/t11005/211/193727467/21541/7e3dcdc8/59e9c6aeN150ef65a.jpg"
            })
        }
    };

    $(function() {
        window.FastClick && FastClick.attach(document.body);
        jm.com.jdloading.show();
        pageController.init();
        MapController.init();
    })

    // 商户列表上下滑动
    function slideUD() {
        var $dialogSto = $('.dialog-stores');
        var height = $(window).height();
        var storeStaus = 1;
        // 列表的三种状态值 底部 半屏以及全屏
        var storeHgtArr = [$('.slide-bar').height(), height * 0.5, height - $('.title').height()];
        // 列表更改的临界值 
        var toLimitArr = [storeHgtArr[0] + (storeHgtArr[1] - storeHgtArr[0]) / 2, storeHgtArr[1] + (storeHgtArr[2] - storeHgtArr[1]) / 2]
        var moveHeight,
            endY;
        $('body').on('touchstart', '.slide-bar', function(event) {
            // 获取点击的起始位置
            var touch = event.touches[0];
            startY = touch.pageY;
        }).on('touchmove', '.slide-bar', function(event) {
            var touch = event.touches[0];
            // 拖动的距离值
            endY = startY - touch.pageY;
            moveHeight = endY + storeHgtArr[storeStaus];
            // 当列表不是在顶部 如果列表位置大于状态值 就置变为更高的一种状态 
            if (storeStaus !== 2) {
                if (moveHeight >= storeHgtArr[storeStaus + 1]) {
                    moveHeight = storeHgtArr[storeStaus + 1];
                }
            } else {

                if (moveHeight >= storeHgtArr[storeStaus]) {
                    moveHeight = storeHgtArr[storeStaus];
                }
            }
            // 当列表不是在底部， 如果列表位置小于状态值 就变为更低的一种状态
            if (storeStaus !== 0) {
                if (moveHeight < storeHgtArr[storeStaus - 1]) {
                    moveHeight = storeHgtArr[storeStaus - 1];
                }
            } else {
                if (moveHeight < storeHgtArr[storeStaus]) {
                    moveHeight = storeHgtArr[storeStaus];
                }
            }
            $('.dialog-stores').css('height', moveHeight);
        }).on('touchend', '.slide-bar', function(event) {
            var cacheHgt = 1;
            if (storeStaus == 0) {
                cacheHgt = (moveHeight < toLimitArr[0]) ? 0 : 1;
            } else if (storeStaus == 1) {
                if (moveHeight > toLimitArr[1]) {
                    cacheHgt = 2;
                } else if (moveHeight < toLimitArr[0]) {
                    cacheHgt = 0
                } else {
                    cacheHgt = 1
                }
            } else if (storeStaus == 2) {
                cacheHgt = (moveHeight < toLimitArr[1]) ? 1 : 2;
            }
            storeStaus = cacheHgt;
            jmPage.showStatus(storeStaus);
            // 将上一次滑动的距离清空
            moveHeight = undefined;
            // 如果列表是在顶部 就把导航栏的阴影关闭掉
            if (storeStaus == 2) {
                $('.dialog.slide .content').addClass('noShadow');
            } else {
                $('.dialog.slide .content').removeClass('noShadow');
            }
        });
        jmPage.showStatus = function(state) {
            storeStaus = state;
            //通过state来改变底部滑动栏
            if(state){
                $('.varyBar').removeClass('varyBar-text').addClass('varyBar-icon');
            }else{
                $('.varyBar').removeClass('varyBar-icon').addClass('varyBar-text');
            }
            //通过state来改变底部滑动栏 结束
            $('.dialog-stores').addClass('animateT').css('height', storeHgtArr[state]);
            setTimeout(function() {
                $('.dialog-stores').removeClass('animateT');
                myScroll.refresh();
            }, 310)
        }
    }

    // 优惠信息上下滑动
    function slideCP() {
        var moveHeight = 0;
        // 弹窗的两种状态
        $('body').on('touchstart', ".allowDrag", function() {
            // 获取拖动的初始位置
            var touch = event.touches[0];
            startY = touch.pageY;
        }).on('touchmove', '.allowDrag', function() {
            var touch = event.touches[0];
            endY = startY - touch.pageY;
            moveHeight = endY + jmPage.storeHgtArr[jmPage.dialogCoup.length];
            // 如果是向上拖动 ，moveHeight 保持原状
            if (endY >= 0) return;
            $('.dialog-coup').css('height', moveHeight);
        }).on('touchend', '.allowDrag', function() {
            // 如果拖动的距离到了临界值 商户列表停于底部
            // 如果商户数量是3  就把高度调整为4rem 数组的第三个元素
            (moveHeight < toLimitArr[jmPage.dialogCoup.length] && moveHeight !== 0) ? (storeStaus = 4, jmPage.dialogStores.show(0)) : ( jmPage.dialogCoup.length == 1 ? storeStaus=1 : storeStaus = 3);
            jmPage.showCoupStatus(storeStaus);
        });
        jmPage.showCoupStatus = function(storeStaus) {
            moveHeight = 0;
            // if(storeStaus == 2) storeHgtArr[3] = storeHgtArr[2];
            $('.dialog-coup').addClass('animateT').css('height', jmPage.storeHgtArr[storeStaus]);
            setTimeout(function() {
                $('.dialog-coup').removeClass('animateT');
            }, 310)
        }
    }
})();