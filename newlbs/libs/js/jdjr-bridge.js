(function(e,t){"use strict";"function"==typeof define&&define.amd?define(function(){return e.jsBridgeV3=t(e)}):"undefined"!=typeof module&&module.exports?module.exports=t(e):e.jsBridgeV3=t(e)})("undefined"!=typeof window?window:this,function(e){function t(){this.tasks=[],this.state="pending",this.data=null}t.prototype={constructor:t,resolve:function(e){this.state="resolved",e&&(this.data=e);var t=this.tasks;for(t.length;t.length>0;)t.shift().call(this.data,this.data)},then:function(e){return"function"==typeof e&&(this.tasks.push(e),"resolved"===this.state&&this.resolve()),this}};var o=null,n=e.navigator.userAgent,i=/(iPhone|iPad|iPod)/i,a=/(jdapp)/i,s=null;return i.test(n)||(e.goToGetres=function(e){try{o(e)}catch(e){console.log(e)}}),a.test(n)&&(e.goToJDAppGetres=function(e){o(e)}),function(){function r(){var e=n.toLowerCase(),t={},o=/jdjr-app/.test(e);return t.isOur=o,o&&(t.isIos=/clienttype=ios/.test(e),t.isAnd=/jdjr-app-android/.test(e)),t}function c(e){return"string"==typeof e&&(e=e.replace(/\"/g,"'")),e}function l(e){var t="";if(e instanceof Array){for(var o=0,n=e.length;o<n;o++)t+="object"==typeof e[o]?u(e[o])+",":'"'+e[o]+'",';return t.substring(0,t.length-1)}}function u(e){var t="{";for(key in e)t+="object"==typeof e[key]?e[key]instanceof Array?'"'+key+'":['+l(e[key])+"],":'"'+key+'":'+u(e[key])+",":'"'+key+'":"'+c(e[key])+'",';return t=t.substring(0,t.length-1),t+="}"}function d(e,t){try{var o=q;if(e&&e.length>0&&!U){for(var n=0;n<e.length;n++)2==parseInt(e[n])&&e.splice(n,1);o=e}return t.length>0&&t.toString().indexOf("open.weixin.qq.com")!=-1&&(o=["0","1"]),o}catch(e){}}function f(e,t){try{var o=[];if(e)for(var n=0;n<6;n++)o.push(e[n]||t);else for(var n=0;n<q.length;n++)o.push(t);return o}catch(e){}}function p(e,t){try{var o={isLogin:e.isLogin||"0",id:e.id||"5",linkSubtitle:e.linkSubtitle||t.desc,imageUrl:e.imageUrl||t.img,link:f(e.link,t.link),linkTitle:e.linkTitle||t.title,channels:d(e.channels,f(e.link,t.link)),productName:e.productName||"",productId:e.productId||""};return o}catch(e){}}function y(t){try{i.test(n)?A&&A(t):"object"==typeof t?e.jd.closeAndWebView(u(t)):e.jd.closeWebView(t)}catch(e){console.log("error")}}function h(t){try{var o={},a=function(e){var t={},o={appId:z.appId,img:z.img,link:z.link,desc:z.desc,title:z.title,friendesc:z.friendesc};"object"!=typeof e&&(e=o);for(k in o)"img"==k||"link"==k?t[k]=e[k].length<=0?o[k]:/http:|https:/i.test(e[k])?e[k]:window.location.protocol+e[k]:t[k]=e[k]||o[k];return t};switch(t.optionType){case 1:o.isShow=t.isShow,o.optionType=1,o.btnText=t.btnText||z.btnTextS,o.shareDate=a(t.shareDate),o.shareDataNew=p(t.shareDataNew||{},t.shareDate),t.shareDate.type&&(o.shareDate.type=t.shareDate.type);break;case 2:o.isShow=t.isShow,o.optionType=2,o.btnText=t.btnText||z.btnTextJ,o.jumpLiDate=t.jumpLiDate;break;case 3:o.isShow=t.isShow,o.optionType=3,o.btnText=t.btnText||z.btnTextN,o.jumpNaDate=t.jumpNaDate;break;case 4:o.isShow=t.isShow,o.optionType=4,o.btnText=t.btnText||z.btnTextN,o.showData=t.showData;break;default:o.isShow=t.isShow,o.optionType=1,o.btnText=t.btnText,o.shareDate=a(t.shareDate),o.shareDataNew=p(t.shareDataNew||{},t.shareDate),t.shareDate.type&&(o.shareDate.type=t.shareDate.type)}i.test(n)?L&&L(o):e.jd.sendWeiXinCot(u(o))}catch(e){console.log("error")}}function b(){try{i.test(n)?G&&G():e.jd.goToComment()}catch(e){console.log("error")}}function w(t){try{i.test(n)?K&&K(t):e.jd.getResponse(u(t))}catch(e){console.log("error")}}function g(t){try{a.test(n.toLowerCase())?i.test(n)?window.location.href="native://pay?type="+t.type+"&appId="+t.appId+"&payParam="+t.payParam+"&bizParam="+t.bizParam+"&callback=goToJDAppGetres":e.JDPaySdk&&e.JDPaySdk.pay(t.type,t.appId,t.payParam,t.bizParam,"goToJDAppGetres"):i.test(n)?iosJDPaySDK&&iosJDPaySDK(t):e.jd.JDPaySDK(u(t))}catch(e){console.log("error")}}function v(t){try{if(i.test(n))iosWebExtend&&iosWebExtend(t);else{var o={};o.productId=t.productId,o.forward=t,o.isclose=t.isclose,o.isShowTitle=t.isShowTitle,"object"==typeof o?e.jd.closeWebViewExtend(u(o)):e.jd.closeWebViewExtend(o)}}catch(e){console.log("error")}}function j(t){try{i.test(n)?iosWebViewNaviBar&&iosWebViewNaviBar(t):"object"==typeof t?e.jd.WebViewNaviBar(u(t)):e.jd.WebViewNaviBar(t)}catch(e){console.log("error")}}function D(t){try{i.test(n)?iosJDJRWebStat&&iosJDJRWebStat(t):"object"==typeof t?e.jd.JDJRWebStat(u(t)):e.jd.JDJRWebStat(t)}catch(e){console.log("error+"+e)}}function T(t){try{i.test(n)?O&&O(t):e.jd.sendRecord(u(t))}catch(e){console.log("error")}}function S(e){""!=e&&"object"==typeof e&&y(e)}function m(){y()}function W(e){""!=e&&"object"==typeof e&&h(e)}function J(){b()}function N(){return r()}function x(e,t){o=e,""!==t&&"object"==typeof t&&(t.type&&4==parseInt(t.type)&&(t.shareDataNew=p(t.shareDataNew||{},t.shareDate||{})),w(t))}function B(e){""!=e&&"object"==typeof e&&T(e)}function P(e){""!=e&&"object"==typeof e&&v(e)}function C(t){if(""!=t&&"object"==typeof t)try{i.test(n)?iosCloseXview&&iosCloseXview(t):e.jd.closeXview(u(t))}catch(e){console.log("error")}}function I(t){if(""!=t&&"object"==typeof t)try{i.test(n)?iosXviewPageStatusCallBack&&iosXviewPageStatusCallBack(t):e.jd.pageStatusCallBack(u(t))}catch(e){console.log("error")}}function V(t){if(""!=t&&"object"==typeof t)try{i.test(n)?iosEtcH5InvokeNative&&iosEtcH5InvokeNative(t):e.jd.etcH5InvokeNative(u(t))}catch(e){console.log("error")}}function H(e){""!=e&&"object"==typeof e&&j(e)}function R(e,t){o=e,""!==t&&"object"==typeof t&&g(t)}function X(s){var r=new t,c=this,l=function(e){A=function(t){e.callHandler("closeWebView",t,function(e){})},iosWebExtend=function(t){e.callHandler("closeWebViewExtend",t,function(e){})},iosWebViewNaviBar=function(t){e.callHandler("WebViewNaviBar",t,function(e){})},L=function(t){e.callHandler("sendWeiXinCot",t,function(e){})},G=function(t){e.callHandler("goToComment",t,function(e){})},K=function(t){e.callHandler("getResponse",t,function(e){})},iosJDPaySDK=function(t){e.callHandler("JDPaySDK",t,function(e){})},O=function(t){e.callHandler("sendRecord",t,function(e){})},iosJDJRWebStat=function(t){e.callHandler("JDJRWebStat",t,function(e){})},iosCloseXview=function(t){e.callHandler("closeXview",t,function(e){})},iosXviewPageStatusCallBack=function(t){e.callHandler("pageStatusCallBack",t,function(e){})},iosEtcH5InvokeNative=function(t){e.callHandler("etcH5InvokeNative",t,function(e){})},i.test(n)&&e.init(function(e,t){o(e)}),s&&"function"==typeof s&&s.call(c,c),r.resolve(c)};return e.WebViewJavascriptBridge?l(WebViewJavascriptBridge):e.document.attachEvent?l(WebViewJavascriptBridge):a.test(n.toLowerCase())?(s&&"function"==typeof s&&s.call(c,c),r.resolve(c)):(e.document.addEventListener("WebViewJavascriptBridgeReady",function(){l(WebViewJavascriptBridge)},!1),i.test(n)||(s&&"function"==typeof s&&s.call(c,c),r.resolve(c))),r}function E(e){return window.isBridgeOnReady&&null!==s||(window.isBridgeOnReady=!0,s=X.call(this,e)),s}var A=null,L=null,G=null,K=null,O=null,z={appId:"",img:window.location.protocol+"//m.jr.jd.com/statics/logo.jpg",link:window.location.protocol+"//m.jr.jd.com/",desc:"最具全面的理财软件",title:"欢迎使用京东金融app",friendesc:"欢迎使用京东金融app",btnTextS:"分享",btnTextJ:"跳转",btnTextN:"金融"},q=["0","1","4","5","3"],U=!1;return{onReady:E,jsToNative:S,jsToNaClose:m,jsToNaWeiXin:W,jsToComment:J,jsToNaMsg:N,jsToGetResp:x,jdPay:R,jsSendRecord:B,jsOpenWeb:P,jsCloseXview:C,jsXviewPageStatusCallBack:I,jsEtcH5InvokeNative:V,setNaviBar:H,setJRWebStat:D}}()});