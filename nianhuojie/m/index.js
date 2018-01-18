/**
 * Created by zhangguoxin on 2018/1/16.
 * vision:1.0
 * title:jiaohangnianhuojie
 * e-mail:zhangguoxin1@jd.com
 */

(function () {
    
    /**================================================================
     页面相关
     =================================================================*/
    var pageController = {
        init: function () {
            var _this = this;
            this.pageInit();
            this.setShare();
            this.operate();
        },
        operate: function(){
	        $(".willJump").on("click",function(){
	        	var link = $(this).attr("data-link");
	        	if(link){
	        		window.location.href = link;
	        	}
	        })
        },
        pageInit: function () {
			var dataMobile = data_source_100000316.infoArray_mobile;
			var dataPC = data_source_100000316.infoArray_pc;
			dataMobile.forEach(function(data){
				if(data.link){
					$("#"+data.name).attr("data-link",data.link);
				}
			})           
       },
        // 分享设置
        setShare: function () {
            var url = location.origin + location.pathname;
            window.share && window.share.setShare({
                "title": "交行京东年货节",
                "desc": "交行信用卡，“交”你省更多",
                "link": url,
                "imgUrl": "https://img30.360buyimg.com/jr_image/jfs/t17755/128/128477655/18084/2d9cc297/5a5eaec4N858d5f81.png"
            });
        },
    };
    $(function () {
        window.FastClick && FastClick.attach(document.body);
        pageController.init();
    })
})();
