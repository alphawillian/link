/**
 * Created by dandan on 2017/7/19.
 * vision:1.0
 * title:
 * e-mail:sunchao5@jd.com
 */

/**================================================================
 接口对象
 =================================================================*/
window.proHub = (function() {
    var timeout = 7000;

    var baseUrl = "//lbspay.jd.com/merchantResource/";
    if (location.host == "localmap.jd.com") {
        baseUrl = "//lbsfavorablemap.jd.local/merchantResource/";
    }
    if (location.host == "shopmap.jd.com") {
        baseUrl = "//test-lbspay.jd.com/merchantResource/";
    }

    var obj = {
        // 获取顶部导航栏
        getTabData: function(data, callback, failFn) {
            var url = 'queryCategoryInfo.do';
            // var url = '/data/data1.json';
            requestJsonp.call(this, arguments, url);
        },
        // 获取商户列表
        getProList: function(data, callback, failFn) {
            var url = 'queryMerchantList.do';
            // var url = 'queryVenderShopInfo.do';
            // var url = '/data/data4.json';
            requestJsonp.call(this, arguments, url);
        },
        // 获取优惠券列表信息
        getCoupon: function(data, callback, failFn) {
            var url = 'queryMerchantDiscount.do';
            // var url = '../data/data3.json';
            requestJsonp.call(this, arguments, url);
        },

        // 获取优惠券信息
        getCoponInfo: function(data, callback, failFn) {
            var url = 'takePrize.do';
            // var url = "/data/data4.json";
            requestJsonp.call(this, arguments, url);
        },
        // 获取令牌墙数据接口
        getWallInfo: function(data, callback, failFn) {

            var url = 'getUserCoupon.do';
            requestJsonp.call(this, arguments, url);
        }
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