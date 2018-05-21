;
(function() {
    $('body').on('touchmove', function(event) {
        event.preventDefault();
    })
})();;
(function() {
    var h = "hidden";
    var c = "click";
    var d = "dis";
    var a = "active";
    var coupScroll;
    var timer = null;
    var isLoad = false; // 是否正在加载数据
    var curData = { info: {}, zoom: null };
    var merchantActivity = jm.getUrlString("merchantActivity") || jm.getCookie("merchantActivity");
    var htmlFontSize = parseInt($('html').css('font-size'));
    var storeHgtArr = [1.25 * htmlFontSize, 2.4 * htmlFontSize, 3.6 * htmlFontSize, 4 * htmlFontSize, 0];
    window.jmPage = window.jmPage || {};
    jmPage.storeHgtArr = storeHgtArr;
    var showDialog = jm.com.showDialog;
    // 用户登入后的位置坐标
    var index = 0;
    var firstPos = {};
    var city;
    // 获取位置后的回调    
    jmPage.posCallback = function(info, zoom) {
        city = info.adcode == 110000 ? 110101 : info.adcode; // 获取城市简码
        if (index == 0) {
            firstPos = info;
            index++
        }
        if (isLoad) return;
        clearTimeout(timer);
        timer = setTimeout(function() {
            pageController.getStoreList(info, zoom);
        }, 100);
    };
    // 点击marker或者图标logo，需要获取优惠券信息
    jmPage.markerClick = function(data) {
        // 获取优惠券
        console.log(data)       
        proHub.getStoreDetail({
            storeCode: data.storeCode,
            simpleCode: data.simpleCode,
            merchantActivity: merchantActivity,
            city: city || 110101
        }, function(result) {
            if (result && result.isSuccess) {

                var targetSlide = $('.dialog-coup .infoScro,.pro-info');
                // var length = result.couponCount;
                // length = length > 3 ? 3 : length;
                // if (length == 2) jmPage.storeHgtArr[3] = 3.6 * htmlFontSize;
                // if (length == 3) jmPage.storeHgtArr[3] = 4.0 * htmlFontSize;
                // jmPage.dialogCoup.length = length;
                jmPage.dialogCoup.show(2);
                targetSlide.addClass('allowDrag');
                // var FullList = result.FullList,
                //     RandomList = result.RandomList;
                // var lotteryList = result.lotteryList;
                fillInfo(result.data);
                // fillCoup(FullList, RandomList, lotteryList);
            } else {
                jm.com.toast(result.info);
            }
        }, function(err) {
            console.log(err);
        });

        // 优惠商户
        function fillCoup(FullList, RandomList, lotteryList) {
            var quanHtml = '',
                jianHtml = '';
            FullList.forEach(function(item, index) {
                var coupData = item.prizeInfo.prizeContentInfo;
                coupData.lingqu_hide = (coupData.couponLimitFlag && coupData.logoFlag == "1" )? '' : "hide";
                coupData.qiangguang_hide = (coupData.couponLimitFlag && coupData.logoFlag == "2" )? '' : "hide";
                coupData.chaoxian_hide = (coupData.couponLimitFlag && coupData.logoFlag == "3" )? '' : "hide";
                coupData.geted = coupData.couponLimitFlag ? 'geted' : "";
                coupData.willJump = coupData.jumpMyCouponFlag ? 'willJump': '';
                var template = $("#quanTemplate").html();
                var tagStr = jm.tools.format(template, coupData);
                quanHtml += tagStr;
                $('.quanCoupList-wrap').html(quanHtml);

            });
            FullList.forEach(function(item, index) {
                var coupData = item.prizeInfo.prizeContentInfo;
                coupData.couponType.forEach(function(item) {
                    $('.coup-quan').eq(index).find(".info-l").find("h6").after("<p><i class='icon'></i>" + item + "</p>");
                });
            });
            RandomList.forEach(function(item) {
                var coupData = item.prizeInfo.prizeContentInfo;
                var template = $("#jianTemplate").html();
                var tagStr = jm.tools.format(template, coupData);
                jianHtml += tagStr;
                $('.jianCoupList-wrap').html(jianHtml);
            });
            RandomList.forEach(function(item, index) {
                var coupData = item.prizeInfo.prizeContentInfo;
                coupData.couponType.forEach(function(item) {
                    $('.coup-jian').eq(index).find(".info-l").find("h6").after("<p><i class='icon'></i>" + item + "</p>");
                });
            })
            if(lotteryList){
                $('.lotteryList-wrap .lotteryList-get').addClass("hide").html('');
                $('.lotteryList-wrap .lotteryList-success').addClass("hide").html('');
                $('.lotteryList-wrap .lotteryList-fail').addClass("hide").html('');
                if(lotteryList.length > 0){ //显示红包券
                    var lotteryData = lotteryList[0].prizeInfo.prizeContentInfo;
                    if(!lotteryData.isTakeLottery ){ //用户未领取红包
                        //领奖样式
                        var template_get = $("#lotteryTemplate_get").html();
                        var lotteryStr_get = jm.tools.format(template_get, lotteryData);
                        $('.lotteryList-wrap .lotteryList-get').html(lotteryStr_get).removeClass('hide');
                    }else{
                        if(lotteryData.isGetLottery){   //已领取且成功
                            var template_success = $("#lotteryTemplate_success").html();
                            lotteryData.prizeDesc = lotteryData.prizeDesc||"";
                            lotteryData.prizeName = lotteryData.prizeName||"";
                            lotteryData.usingDesc = lotteryData.usingDesc||"";
                            lotteryData.validDate = lotteryData.validDate||"";
                            if(Number(lotteryData.prizeAmount_fen)>0){
                                lotteryData.prizeAmount_fenDot = '.'+lotteryData.prizeAmount_fen;
                            }else{
                                lotteryData.prizeAmount_fenDot = '';
                            }
                            var lotteryStr_success = jm.tools.format(template_success, lotteryData);
                            $('.lotteryList-wrap .lotteryList-success').html(lotteryStr_success).removeClass('hide');
                        }else{  //已领取但失败
                            var template_fail = $("#lotteryTemplate_fail").html();
                            var lotteryStr_fail = template_fail;
                            $('.lotteryList-wrap .lotteryList-fail').html(lotteryStr_fail).removeClass("hide");
                        }
                    }
                }    
            }
            setTimeout(function() {
                coupScroll.refresh();
            }, 10);
        }

        // 商户信息
        function fillInfo(data) {
            // // console.log(data);
            // var $dialog = $(".dialog-coup");
            // var $info = $dialog.find(".pro-info .info");
            // var $infop = $info.find("p");
            // // 根据storeCode 查询优惠
            // $dialog.find(".coup-quan").attr("code", data.storeCode);
            // // $dialog.find(".icon-box").find("img").attr("src", data.icon);
            // $dialog.find(".icon-box").find("img").attr("src", data.logoAddress);
            // $dialog.find(".go-nav").attr("code", data.storeCode);
            // $info.find("h4").text(data.realName);
            // $info.find("h6").text(data.address);
            // $infop.find("span").text(jmPage.getTitleById(data.merchantType));
            // // 110298203002 闪付       110298203001 码支付
            // $infop.find("i,a").remove();

            // if (data.unitPay.length > 0) {
            //     $infop.append('<i></i>');
            // }

            // $infop.append("<a>" + data.unitPay + "</a>");
            console.log(data)
            var template = document.getElementById("storeDetailTemplate").innerHTML;
            var html = ejs.render(template, data)
            $(".storeContent").html(html)
        }
    };
    //红包券领奖函数
    jmPage.lotteryGet = function(data,payPrizeId, index){
        proHub.getCoponInfo({
            storeCode: data.storeCode,
            payPrizeId: payPrizeId,
            merchantTag: data.merchantTag,
            userLongitude: firstPos.lng,
            userLatitude: firstPos.lat,
            merchantLongitude: data.longitude,
            merchantLatitude: data.latitude,
            simpleCode: data.simpleCode,
        },function(res){
            if(res.isSuccess && res.couponList.length>0 && res.couponList[0].prizeInfo && res.couponList[0].prizeInfo.prizeContentInfo){
                $('.lotteryList-wrap .lotteryList-get').addClass("hide").html('');
                //领奖成功样式
                var template_success = $("#lotteryTemplate_success").html();
                var lotteryData = res.couponList[0].prizeInfo.prizeContentInfo
                if(Number(lotteryData.prizeAmount_fen)>0){
                    lotteryData.prizeAmount_fenDot = '.'+lotteryData.prizeAmount_fen;
                }else{
                    lotteryData.prizeAmount_fenDot = '';
                }
                lotteryData.prizeDesc = lotteryData.prizeDesc||"";
                lotteryData.prizeName = lotteryData.prizeName||"";
                lotteryData.usingDesc = lotteryData.usingDesc||"";
                lotteryData.validDate = lotteryData.validDate||"";
                var lotteryStr_success = jm.tools.format(template_success, lotteryData);
                $('.lotteryList-wrap .lotteryList-success').html(lotteryStr_success).removeClass('hide');        
            }else{
                if( res.code === "JSJN800002" || res.code === "JSJN800003" || res.code === "JSJN800009"){  //弹出toast
                    jm.com.toast(res.info);
                }else{
                    var template_fail = $("#lotteryTemplate_fail").html();
                    var lotteryStr_fail = template_fail;
                    $('.lotteryList-wrap .lotteryList-get').addClass("hide").html('');
                    $('.lotteryList-wrap .lotteryList-fail').html(lotteryStr_fail).removeClass("hide");
                }
                
            }
        },function(error){
            console.log(error);
        })
    }
    // 领奖接口
    jmPage.coupGet = function(data, payPrizeId, index) {
        var payPrizeId = payPrizeId;
        proHub.getCoponInfo({
            storeCode: data.storeCode,
            payPrizeId: payPrizeId,
            merchantTag: data.merchantTag,
            userLongitude: firstPos.lng,
            userLatitude: firstPos.lat,
            merchantLongitude: data.longitude,
            merchantLatitude: data.latitude,
            simpleCode: data.simpleCode,
        }, function(result) {
            var href = "//home.jdpay.com/my/coupon/300/notused?source=JDSC";
            var $targetQuan = $('.coup-quan').eq(index);
            var $quana = $targetQuan.find('.info-r .abs-mm').find('a');
            var $flag = $targetQuan.find('img.flag.icon_lingqu');
            if(result.code == "JSJN020003"){
            //if(result.code == "JSJN020002"){
                var loginUrl = "//passport.m.jd.com/user/login.action";
                var curPath = location.href;
                window.location.href = loginUrl + "?returnurl=" + curPath;
                return;
            }
            (result.isSuccess && result.isSuccess == true)
            // 如果已经领取 退出
            ?
            (($quana.hasClass('geted')) ? (location.href = href) : ($flag.removeClass('hide'), $quana.addClass('geted').addClass('willJump').text('查看'), jm.com.toast(result.info))) :
            ($quana.hasClass('geted')) ? (location.href = href) : (jm.com.toast(result.info));
        }, function() {
            jm.com.toast('领取失败，请稍后重试');
        });
    }

    var pageController = {
        init: function() {
            this.pageInit();
            this.clickCount();
            this.sendPoint();
            // 安卓记性点击无效的问题
            coupScroll = new IScroll('.coup-box', { preventDefault: false });
        },
        pageInit: function() {

            var self = this;
            $("body").on(c, ".dialog .go-nav", function() { // 导航
                var code = $(this).attr("code");
                jmPage.goNav(code); // 参数：商户的code
            })    
        },


        // 获取商户数据
        getStoreList: function(info, zoom) {
            isLoad = true;
            var simpleCode = jm.getUrlString('simpleCode');
            info = info || curData.info;
            zoom = zoom || curData.zoom;
            city = (info.adcode == 110000 ? 110101 : info.adcode); // 获取城市简码
            proHub.getStoreList({
                userLongitude: firstPos.lng,
                userLatitude: firstPos.lat,
                longitude: info.lng,
                latitude: info.lat,
                rangeType: zoom,
                simpleCode: simpleCode || '',
                merchantActivity: merchantActivity,
                city: city || 110101
                    // longitude: 116.449295,
                    // latitude: 39.922032,
                    // userLongitude: 116.449295,
                    // userLatitude: 39.922032,
                    // merchantType: 0,
                    // rangeType: 250,
                    // city: 110000,
                    // merchantActivity: 188,
                    // testPin: 'hycD1'
            }, function(result) {
                jm.com.jdloading.close();
                isLoad = false;
                if (result.isSuccess) {
                    jmPage.fillMarker(result);
                    if (result.data.length == 0) {
                        // 获取位置后商户数据不为空 打开商户列表弹窗
                        jmPage.dialogStores.close();
                    } else {
                        // 可以用(info == firstPos)来判断用户是否是第一次进入页面
                        // 如果用户是第一次进来 页面展示商户 随后拖动就停在下面   默认页面不展示商户列表
                        //更改slider-bar的文案，显示商户数目。
                        var storeNum = result.data.length;
                        $(".dialog-stores .storeNum").text(storeNum);
                        //如果商户的优惠信息列表弹出，商户列表不显示。
                        if($(".dialog-coup").hasClass("dialogCoupShow")){
                            $(".dialog-coup").removeClass("dialogCoupShow");
                        }else{
                            jmPage.dialogStores.show(0);
                        }
                    }
                }
            }, function() {
                jm.com.jdloading.close();
                isLoad = false;
            });
            curData.info = info;
            curData.zoom = zoom;
        },

        // 发送埋点数据
        sendPoint: function (Area) {
        	var pin = jm.getCookie("pwdt_id");
            var key = jm.getUrlString("p_id") || "default";
            var keyVal = "";
            if(Area){
            	keyVal = "LHDT_click,"+Area;
            }else{
            	keyVal = "LHDT_view,"+key;
            }
            var data = {
                biz: "JR,LHDT",                    //业务类型KEY
                key: keyVal,         //业务KEY
                count: 1,                //数量统计
                uuid: "",        //唯一值
                timestamp: formatDateTime(),   // 时间戳
                visitor: pin,    //访问者(如需统计UV量，请传此值)
                eventId: "",    //事件ID
                callback: "sendCallback"   // 回调函数名
            };
            try {
                var script = document.createElement('script');
                script.setAttribute('src', "//oriondm.jd.com/service/writeH5Log?data=" + encodeURIComponent(JSON.stringify(data)));
                document.getElementsByTagName('head')[0].appendChild(script);
            } catch (e) {
            }
            function formatDateTime() {
                var date = new Date();
                return jm.tools.format("{0}-{1}-{2} {3}:{4}:{5}", date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            }
            // 成功回调
            window.sendCallback = function () {

            };

        },
        clickCount: function(){
        	var self = this;
        	$(".clickCount").on("click",function(){
        		var key = $(this).attr("data-key");
        		self.sendPoint(key);
        	})
        },
    };
    $(function() {
        pageController.init();
    });
})();