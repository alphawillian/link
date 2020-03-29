/**
 * Created by zhangguoxin on 2017/11/15.
 * vision:1.0
 * title:chihuojie
 * e-mail:zhangguoxin1@jd.com
 */

(function () {
    
    /**================================================================
     页面相关
     =================================================================*/
    var pageController = {
        init: function () {
            var _this = this;
            this.operate();
            this.pageInit();
            this.setShare();
            this.sendPoint();
            this.getNum();
            this.clickCount();
        },
        operate: function(){
        	$(".activeMoreSign").on("click",function(){
				$(this).toggleClass("arrowUp");
				if($(this).hasClass("arrowUp")){
					$(this).parent().siblings(".everyActiveBottom").find(".activeShop.willHide").removeClass("hide");
				}else{
					$(this).parent().siblings(".everyActiveBottom").find(".activeShop.willHide").addClass("hide");
				}
			})
			var $ruleWrap = $("#ruleWrap");
	
	        $(".ruleBtn").on("click", function () {
	            $ruleWrap.show();
	            new IScroll("#scrollBox");
	        })
	        $("#closeBtn").on("click", function () {
	            $ruleWrap.hide();
	        });
	        $(".willJump").on("click",function(){
	        	var link = $(this).attr("data-link");
	        	if(!link) return;
	        	setTimeout(function(){
	        		window.location.href = link;
	        	},300)
	        })
        },
        pageInit: function () {
			var self = this;	
			//图片更改
			if(data_source_100000302){
				var imgData = data_source_100000302;
				if(imgData.picture_2){
					$("#certainHeader1_img").prop("src",imgData.picture_2);
				}else{
					$("#certainHeader1_img").prop("src","//img30.360buyimg.com/jr_image/jfs/t13621/229/550691420/32128/441fbeb9/5a0e3a83N346d3e27.png");
				}
				if(imgData.picture_2){
					$("#active1_img").prop("src",imgData.picture_1);
				}else{
					$("#active1_img").prop("src","//img30.360buyimg.com/jr_image/jfs/t13645/263/565232481/119061/5d5daee2/5a0e3a7fNb432377a.png");
				}
			}else{
				$("#active1_img").prop("src","//img30.360buyimg.com/jr_image/jfs/t13645/263/565232481/119061/5d5daee2/5a0e3a7fNb432377a.png");
				$("#certainHeader1_img").prop("src","//img30.360buyimg.com/jr_image/jfs/t13621/229/550691420/32128/441fbeb9/5a0e3a83N346d3e27.png");
			}	
            var data = data_source_100000231;
			var merchantArr = ["merchant1","merchant2","merchant3"];
			// $("#certainHeader1_img").prop("src",data.picture_2);
			// $("#active1_img").prop("src",data.picture_1);
            if(data.banner){
            	$("#uncertainBlock").removeClass("hide");
            	$("#uncertainBlock>img").prop("src",data.banner);
            }
            if(data.topImage){
            	$("#headImg img").prop("src",data.topImage);
            }
            renderRule(data);
            for (var i = 0; i < merchantArr.length; i++) {
            	var activeData = (data[merchantArr[i]]);
            	if(activeData.prizeId != "-1"){
            		renderActive(activeData,i);
            	}
			}
			
            
            //给三个活动添加Id及活动商家
            function renderActive(data,i){
            	var data = data;
            	var currentEle = $("#active"+(i+1));
            	currentEle.attr("data-id",data.prizeId.trim());
            	var activeHtml = creatEleHtml(data.list,currentEle);
            	currentEle.find(".everyActiveBottom").html(activeHtml);
            }
            //活动商家的字符串拼接
            function creatEleHtml(data,currentEle){
            	if(!data) return;
            	var html = "";
            	if(data.length > 3){
            		//currentEle.find(".activeMoreLine").removeClass("hide");
            	}
            	for(var i = 0; i < data.length; i++){
            		var item = data[i];
            		var activeHide = "";
            		var link = item.link || "javascript:void(0)";
            		if(i>2){
            			//activeHide = "willHide hide";
            		}
            		html += '<a class="activeShop '+ activeHide +'" href="'+link+'">'+
								'<div class="activeShopImg">'+
									'<img src="'+ item.src +'"/>'+
								'</div>'+
								'<div class="activeShopTxt">'+
									'<span class="activeShopName">'+item.name+'</span>'+
									'<span class="activeShopArea">'+item.address+'</span>'+
								'</div>'+
							'</a>'
            	}
            	return html;
            }
            function renderRule(data){
            	var rulesHtml = ""
            	var moreRulesHtml = "";
            	var rules = data.rules;
            	var moreRules = data.moreRules;
            	for(var i = 0; i < rules.length; i++){
            		var item = rules[i];
            		rulesHtml += '<li>'+item.text+'</li>'
            	}
            	for(var i = 0; i < moreRules.length; i++){
            		var item = moreRules[i];
            		moreRulesHtml += '<li class="mt10">'+item.text+'</li>'
            	}
            	$(".ruleTxt").html(rulesHtml);
            	$("#moreRulesDetail").html(moreRulesHtml);
            }
        },


        // 分享设置
        setShare: function () {
            var url = location.origin + location.pathname;
            window.share && window.share.setShare({
                "title": "京东支付吃货节",
                "desc": "吃货天天享优惠",
                "link": url,
                "imgUrl": "https://img30.360buyimg.com/jr_image/jfs/t5863/184/8373437912/11900/5c7340d2/5979a086N794a2b26.png",
            });
        },

        // 发送埋点数据
        sendPoint: function (Area) {
        	var pin = jm.getCookie("pwdt_id");
            var key = jm.getUrlString("type") || "default";
            var keyVal = "";
            if(Area){
            	keyVal = "CHJ_click,"+Area;
            }else{
            	keyVal = "CHJ_view,"+key;
            }
            var data = {
                biz: "JR,QP,CHJ",                    //业务类型KEY
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

        // 未登录
        notLogin: function () {
            jm.setCookie("ts", new Date().getTime(), 1);
            window.location.href = loginUrl + "?returnurl=" + curPath;
        },
        
        // 进度条
        getNum: function () {
            var data = data_source_100000231;
            var merchantArr = ["merchant1","merchant2","merchant3"];
            var totalArr = [[],[],[]];
            var coupList = "";
            for (var i = 0; i < merchantArr.length; i++) {
            	var activeData = (data[merchantArr[i]]);
            	var prizeId = activeData.prizeId.trim();
            	if(prizeId && prizeId != "-1" ){
            		coupList += ","+prizeId;
            	}
            	totalArr[i][0] = prizeId;
            	if(activeData.prizeTotal){
            		totalArr[i][1] = Number(activeData.prizeTotal);
            	}
            }
            //uncertainBlock的操作逻辑
            if(data.prizeId && data.prizeId != "-1"){
            	var uncertainArr = [];
            	var uncertainId = data.prizeId.trim();
            	uncertainArr.push(uncertainId);
            	if(data.prizeTotal){
            		uncertainArr.push(Number(data.prizeTotal));
            	}
            	totalArr.push(uncertainArr);
            	coupList += ","+uncertainId;
            	$("#uncertainBlock .progressBlockLine").removeClass("hide");
            	$("#uncertainBlock").removeClass("hide").attr("data-id",uncertainId);
            	
            }
            coupList = coupList.substr(1);
            $.ajax({
                url: "https://mk.jd.com/marketing/query/prizeCount",
                data: {prizeId: coupList},
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "functionCall",
                success: function (result) {
                	if (result.respCode == "00000") {
                    	renderPrecent(result);
					}else{
						alert("请稍后重试");
					}
                },
                error: function () {}
            });
            function renderPrecent(data){
            	var mkDataArr = data.prizeCountInfoList;
				mkDataArr.forEach(function(val,ind){
    				var percent = 0;
    				var prizeId = (val.prizeId).trim();
    				var count = Number(val.dailyPrizePayCount);
    				var total = Number(val.dailyPrizePayCountTotal);
    				totalArr.forEach(function(value,index){
    					if(value[0] == prizeId && value[1]){
    						total = Number(value[1]);
    					}
    				})
					percent = ((count/total)*100).toFixed(2);
					percent = Number(percent);
    				if(percent >= 100){
    					percent = 100;
						$(".everyActive[data-id="+prizeId+"]").removeClass("hide").find(".progress_Txt").text("吃货你好 明日请早");
					}else{
	    				$(".everyActive[data-id="+prizeId+"]").removeClass("hide").find(".progress_Txt").text("已经领取"+percent+"%");
					}
    				$(".everyActive[data-id="+prizeId+"]").find(".progerssPrecent").css("width",percent+"%");
    			})
            	
            }
        },
    };

    $(function () {
        window.FastClick && FastClick.attach(document.body);
        pageController.init();

        var $ruleWrap = $("#ruleWrap");

        $("#ruleBtn").on("click", function () {
            $ruleWrap.show();
            new IScroll("#scrollBox");
        })

        $("#closeBtn").on("click", function () {
            $ruleWrap.hide();
        });
    })
})();
