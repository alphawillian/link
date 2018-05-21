
/**================================================================
 接口对象
 =================================================================*/
window.proHub = (function() {
	var timeout = 7000;

	var baseUrl = "//10.222.11.216:8001/";
	if (location.host == "localmap.jd.com") {
		baseUrl = "//lbsfavorablemap.jd.local/merchantResource/";
	}
	if (location.host == "shopmap.jd.com") {
		baseUrl = "//test-lbspay.jd.com/merchantResource/";
	}

	var obj = {
		// 获取商户列表
		getStoreList: function(data, callback, failFn) {
			// var url = 'queryMerchantList.do';
			var url = 'omm/ml.htm';
			requestJsonp.call(this, arguments, url);
		},
		// 获取优惠券列表信息
		getStoreDetail: function(data, callback, failFn) {
			// var url = 'queryMerchantDiscount.do';
			var url = 'omm/md.htm';
			requestJsonp.call(this, arguments, url);
		},
		// 获取优惠券信息
		getCopon: function(data, callback, failFn) {
			// var url = 'takePrize.do';
			var url = 'omm/tp.htm';
			requestJsonp.call(this, arguments, url);
		},
	};

    // get jsonp 请求
    function requestJsonp(param, url) {
        var args = turnArr(param);
        var finalArgs = args.concat([url, 'get', 'jsonp']);
        request.apply(this, finalArgs);
    }

    // 把参数转换成数组
    function turnArr(args) {
        return Array.prototype.slice.call(args);
    }

    // ajax 请求
    function request(data, callback, failFn, url, type, dataType, async) {
        if (!url) {
            console.error("请传入请求地址");
            return;
        }
        if (!/^\/\//gmi.test(url)) {
            url = baseUrl + url
        }
        if(url.indexOf(".json")>2){
            url = url.replace(baseUrl,'');
            dataType = 'json';
        }
        type = type || "get";
        dataType = dataType || "jsonp";
        async = async || true;
        $.ajax({
            url: url,
            data: data,
            type: type,
            async: async,
            timeout: timeout, // 超时处理
            dataType: dataType,
            success: function(res) {
                callback && callback(res);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                failFn && failFn(data);
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

    return obj;
})();