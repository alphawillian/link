
/**================================================================
 接口对象
 =================================================================*/
window.proHub = (function() {
	var timeout = 7000;

	var baseUrl = "//10.222.11.216:8001/";

	var obj = {
		// 获取商户列表
		getShopList: function(data, callback, failFn) {
			var url = 'omm/ml.htm';
			requestJsonp.call(this, arguments, url);
		},
		// 获取商户详情接口
		getShopDetail: function(data, callback, failFn) {
			var url = 'omm/md.htm';
			requestJsonp.call(this, arguments, url);
		},
		// 领奖接口
		getCoupon: function(data, callback, failFn) {
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