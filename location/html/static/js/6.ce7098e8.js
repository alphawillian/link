(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"/9aa":function(t,e,n){var s=n("NykK"),i=n("ExA7"),o="[object Symbol]";function a(t){return"symbol"==typeof t||i(t)&&s(t)==o}t.exports=a},"152E":function(t,e,n){},"91GP":function(t,e,n){var s=n("XKFU");s(s.S+s.F,"Object",{assign:n("czNK")})},AP2z:function(t,e,n){var s=n("nmnc"),i=Object.prototype,o=i.hasOwnProperty,a=i.toString,r=s?s.toStringTag:void 0;function c(t){var e=o.call(t,r),n=t[r];try{t[r]=void 0;var s=!0}catch(t){}var i=a.call(t);return s&&(e?t[r]=n:delete t[r]),i}t.exports=c},BTUV:function(t,e,n){},ExA7:function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},GoyQ:function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},J66h:function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(t,e){module.exports=e(t)})("undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof global?global:this,function(global){"use strict";global=global||{};var _Base64=global.Base64,version="2.5.1",buffer;if("undefined"!==typeof module&&module.exports)try{buffer=eval("require('buffer').Buffer")}catch(t){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(t){for(var e={},n=0,s=t.length;n<s;n++)e[t.charAt(n)]=n;return e}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(t){if(t.length<2){var e=t.charCodeAt(0);return e<128?t:e<2048?fromCharCode(192|e>>>6)+fromCharCode(128|63&e):fromCharCode(224|e>>>12&15)+fromCharCode(128|e>>>6&63)+fromCharCode(128|63&e)}e=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return fromCharCode(240|e>>>18&7)+fromCharCode(128|e>>>12&63)+fromCharCode(128|e>>>6&63)+fromCharCode(128|63&e)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(t){return t.replace(re_utob,cb_utob)},cb_encode=function(t){var e=[0,2,1][t.length%3],n=t.charCodeAt(0)<<16|(t.length>1?t.charCodeAt(1):0)<<8|(t.length>2?t.charCodeAt(2):0),s=[b64chars.charAt(n>>>18),b64chars.charAt(n>>>12&63),e>=2?"=":b64chars.charAt(n>>>6&63),e>=1?"=":b64chars.charAt(63&n)];return s.join("")},btoa=global.btoa?function(t){return global.btoa(t)}:function(t){return t.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(t){return(t.constructor===buffer.constructor?t:buffer.from(t)).toString("base64")}:function(t){return(t.constructor===buffer.constructor?t:new buffer(t)).toString("base64")}:function(t){return btoa(utob(t))},encode=function(t,e){return e?_encode(String(t)).replace(/[+\/]/g,function(t){return"+"==t?"-":"_"}).replace(/=/g,""):_encode(String(t))},encodeURI=function(t){return encode(t,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(t){switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),n=e-65536;return fromCharCode(55296+(n>>>10))+fromCharCode(56320+(1023&n));case 3:return fromCharCode((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return fromCharCode((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},btou=function(t){return t.replace(re_btou,cb_btou)},cb_decode=function(t){var e=t.length,n=e%4,s=(e>0?b64tab[t.charAt(0)]<<18:0)|(e>1?b64tab[t.charAt(1)]<<12:0)|(e>2?b64tab[t.charAt(2)]<<6:0)|(e>3?b64tab[t.charAt(3)]:0),i=[fromCharCode(s>>>16),fromCharCode(s>>>8&255),fromCharCode(255&s)];return i.length-=[0,0,2,1][n],i.join("")},_atob=global.atob?function(t){return global.atob(t)}:function(t){return t.replace(/\S{1,4}/g,cb_decode)},atob=function(t){return _atob(String(t).replace(/[^A-Za-z0-9\+\/]/g,""))},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(t){return(t.constructor===buffer.constructor?t:buffer.from(t,"base64")).toString()}:function(t){return(t.constructor===buffer.constructor?t:new buffer(t,"base64")).toString()}:function(t){return btou(_atob(t))},decode=function(t){return _decode(String(t).replace(/[-_]/g,function(t){return"-"==t?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var t=global.Base64;return global.Base64=_Base64,t};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"===typeof Object.defineProperty){var noEnum=function(t){return{value:t,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)})),Object.defineProperty(String.prototype,"toBase64",noEnum(function(t){return encode(this,t)})),Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,!0)}))}}return global["Meteor"]&&(Base64=global.Base64),"undefined"!==typeof module&&module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),{Base64:global.Base64}})}).call(this,__webpack_require__("yLpj"))},JiEa:function(t,e){e.f=Object.getOwnPropertySymbols},KWeh:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",staticClass:"container"},[t.isGetGeo||t.isFullLoading?n("div",{staticClass:"fullLoading"},[n("Loading",{attrs:{type:"spinner"}})],1):t._e(),n("div",{staticClass:"tab-list"},[n("div",{class:["tab-item",1===t.pageStatus?"selected":""],on:{click:function(e){t.changeTab(1)}}},[t._v("身边优惠")]),n("div",{class:["tab-item",2===t.pageStatus?"selected":""],on:{click:function(e){t.changeTab(2)}}},[t._v("京东到家")])]),n("div",{staticClass:"main-container"},[n("div",{staticClass:"block-public"},[n("div",{staticClass:"address-line",on:{click:t.goChageAddress}},[n("i",{staticClass:"icon-location"}),n("span",{staticClass:"address-txt"},[t._v(t._s(t.confirmedAddressInfo.addressInfo.addressTxt||"暂未获取位置信息"))]),n("i",{staticClass:"icon-right"})]),n("div",{staticClass:"fake-search"},[n("i",{staticClass:"icon-search"}),n("input",{directives:[{name:"show",rawName:"v-show",value:1===t.pageStatus,expression:"pageStatus === 1"},{name:"model",rawName:"v-model",value:t.searchLTxt,expression:"searchLTxt"}],ref:"searchL",attrs:{type:"search",disabled:!t.searchLAble,placeholder:"搜索更多附近商户"},domProps:{value:t.searchLTxt},on:{focus:t.searchLFocus,input:function(e){e.target.composing||(t.searchLTxt=e.target.value)}}}),n("input",{directives:[{name:"show",rawName:"v-show",value:2===t.pageStatus,expression:"pageStatus === 2"},{name:"model",rawName:"v-model",value:t.searchDTxt,expression:"searchDTxt"}],ref:"searchD",attrs:{type:"search",disabled:!t.searchDAble,placeholder:"搜索更多附近商户"},domProps:{value:t.searchDTxt},on:{focus:t.searchDFocus,input:function(e){e.target.composing||(t.searchDTxt=e.target.value)}}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.pageStatus&&t.enterList.length,expression:"pageStatus === 1 && enterList.length"}],staticClass:"public-in-liehu"},t._l(t.enterList,function(e,s){return n("a",{key:s,attrs:{href:"javascript:;"},on:{click:function(n){t.sendPoint(e.key||"enterItem",e.url)}}},[t._v(t._s(e.txt))])}))]),n("div",{directives:[{name:"show",rawName:"v-show",value:1===t.pageStatus,expression:"pageStatus === 1"}],staticClass:"block-liehu"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.shopListL.length,expression:"shopListL.length"}],staticClass:"list-liehu"},[t._l(t.shopListL,function(e,s){return n("shop-item-l",{key:s,attrs:{info:e,addressInfo:t.confirmedAddressInfo.addressInfo},on:{sendPoint:t.sendPoint}})}),t.noMoreDataL?n("div",{staticClass:"noMoreData"},[t._v("没有更多商户了")]):t._e()],2),t.isQueryingListL?n("div",{staticClass:"loading loadingL"},[n("Loading",{attrs:{type:"spinner"}})],1):t._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:t.noDataL&&!t.isQueryingListL,expression:"noDataL && !isQueryingListL"}],staticClass:"data-empty"},[n("img",{attrs:{src:"//img30.360buyimg.com/jr_image/jfs/t1/29851/2/12914/7602/5c9c55b2E9d8e908c/d2adddccca7adcde.png",alt:""}}),n("div",{staticClass:"desc"},[t._v("未找到您周边的商户~")])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:2===t.pageStatus,expression:"pageStatus === 2"}],staticClass:"block-daojia"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.shopListD.length,expression:"shopListD.length"}],staticClass:"list-daojia"},[n("div",{staticClass:"list-daojia-in"},[t._l(t.shopListD,function(e,s){return n("shop-item-d",{key:s,attrs:{info:e},on:{sendPoint:t.sendPoint}})}),t.noMoreDataD?n("div",{staticClass:"noMoreData"},[t._v("没有更多商户了")]):t._e()],2)]),t.isQueryingListD?n("div",{staticClass:"loading"},[n("Loading",{attrs:{type:"spinner"}})],1):t._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:t.noDataD||t.noMoreDataD&&!t.shopListD.length,expression:"noDataD || (noMoreDataD && !shopListD.length)"}],staticClass:"data-empty"},[n("img",{attrs:{src:"//img30.360buyimg.com/jr_image/jfs/t1/29851/2/12914/7602/5c9c55b2E9d8e908c/d2adddccca7adcde.png",alt:""}}),n("div",{staticClass:"desc"},[t._v("未找到您周边的商户~")])])])])])},i=[],o=(n("rGqo"),n("iv4g")),a=(n("91GP"),n("ls82"),n("MECJ")),r=(n("pIFo"),n("xfY5"),n("f3/d"),n("yt8O"),n("VRzm"),n("sEfC")),c=n.n(r),u=n("uXAG"),l=n("J66h"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"shop_item",on:{click:function(e){t.href(t.info.storeUrl)}}},[n("div",{staticClass:"shop_left"},[n("img",{attrs:{src:t.info.storeLogo,alt:"",srcset:""}})]),n("div",{staticClass:"shop_main"},[n("div",{staticClass:"info_line name_line"},[n("span",{staticClass:"shop_name"},[t._v(t._s(t.info.storeName))]),"0m"===t.info.distance||"0km"===t.info.distance?n("span",{staticClass:"distance_nearest"},[t._v("离你最近")]):n("span",{staticClass:"distance"},[n("span",[t._v(t._s(t.info.distance))])])]),n("div",{staticClass:"info_line carrier_line"},[n("span",{staticClass:"shop_support"},[t._v(t._s(t.info.freightWords))]),n("span",{staticClass:"shop_carrier"},[t._v(t._s(t.info.carrierType))])]),t._l(t.info.tags,function(e,s){return[s<2?n("div",{key:s,staticClass:"shop_benefit"},[0===s?n("span",{staticClass:"benefit_qiang"},[t._v(t._s(e.iconText))]):1===s?n("span",{staticClass:"benefit_cu"},[t._v(t._s(e.iconText))]):t._e(),t._v("\n        "+t._s(e.words)+"\n      ")]):t._e()]})],2)])},f=[],h={name:"",props:{info:{type:Object,default:function(){return{}}}},components:{},data:function(){return{}},filters:{},created:function(){},mounted:function(){},methods:{href:function(t){console.log(t),this.$emit("sendPoint","daojiaDetail",t)}}},p=h,g=(n("OAs0"),n("KHd+")),m=Object(g["a"])(p,d,f,!1,null,"13741de5",null),b=m.exports,L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"shop-item"},[n("div",{staticClass:"shop-main",on:{click:t.goShop}},[t.info.top?n("i",{staticClass:"shop-top"}):t._e(),n("span",{staticClass:"shop-logo"},[n("span",{staticClass:"shop-logo-inner"},[n("img",{attrs:{src:t.info.logoAddress,alt:""}})])]),n("span",{staticClass:"shop-info"},[n("div",{staticClass:"shop-name"},[t._v(t._s(t.info.realName))]),n("div",{staticClass:"shop-line2"},[t.info.payWays&&t.info.payWays.length?n("span",{staticClass:"shop-pay"},[n("span",{staticClass:"spt-key"},[t._v("支持")]),t._l(t.info.payWays,function(e,s){return n("span",{key:s,class:["spt-item",{ios:t.isIos}]},[t._v(t._s(t.payWayMaps[e]))])}),n("i")],2):t._e(),n("span",{staticClass:"shop-distance range"},[t._v(t._s(t.info.distance)+" "+t._s(t.info.distanceUnit))])])])]),t.info.preferenceActivities&&t.info.preferenceActivities.length?n("ul",{staticClass:"coupon-packet"},t._l(t.info.preferenceActivities,function(e,s){return n("coupon-item",{key:s,attrs:{info:e,latLng:t.latLng,storeCode:t.info.storeCode},on:{sendPoint:t.sendPoint}})})):t._e()])},v=[],y=(n("SRfc"),n("p3Gn")),_={name:"",props:{info:{type:Object,default:function(){return{}}},addressInfo:{type:Object,default:function(){return{}}}},components:{CouponItem:y["a"]},data:function(){return{latLng:{},isIos:!1,payWayMaps:{0:"京东支付",1:"京东码支付",2:"京东闪付"}}},filter:{},created:function(){},mounted:function(){this.setLatLng(),this.device()},methods:{setLatLng:function(){var t=this.addressInfo,e=Number(t.lat),n=Number(t.lng);this.latLng={lat:e,lng:n}},device:function(){var t=window.navigator.userAgent,e=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);this.isIos=e},goShop:function(){var t=location.protocol,e=location.host,n=this.latLng.lat,s=this.latLng.lng,i=this.info.storeCode,o="?storeCode="+i+"&lat="+n+"&lng="+s,a=t+"//"+e+"/activity/2018/location/html/map.html"+o;this.$emit("sendPoint","liehuMap",a)},isShowNearby:function(t,e){if("m"===e){var n=Number(t);return n<100}},sendPoint:function(t,e){this.$emit("sendPoint",t,e)}}},D=_,C=(n("NpTB"),Object(g["a"])(D,L,v,!1,null,"f2d3bc02",null)),A=C.exports,S=n("Is5O"),x=n("fAPB"),I=n("+n12"),T={name:"",components:{Loading:u["a"],ShopItemD:b,ShopItemL:A},data:function(){return this.searchListLInit=c()(this.searchListLInit,500),{sourceData:window.data_source_100002365,enterList:[],routerStatus:0,radius:3e4,lPage:{size:10,index:1},dPage:{size:10,index:1},isFullLoading:!1,isMiniLoadingL:!1,isMiniLoadingD:!1,pageStatus:1,shopListL:[],shopListD:[],shopListDRaw:[],isGetGeo:!1,isQueryingListL:!1,isQueryingListD:!1,queryLid:0,queryDid:0,noMoreDataL:!1,noMoreDataD:!1,noDataL:!1,noDataD:!1,searchLAble:!1,searchDAble:!1,latLng:{latitude:x["a"].default_lat,longitude:x["a"].default_lng},scrollTopL:0,scrollTopD:0,searchTxt:"",searchLTxt:"",searchDTxt:"",confirmedAddressInfo:{cityInfo:{cityName:"北京",defaultLat:"39.908823",defaultLng:"116.39747",isByLocation:null},addressInfo:{addressTxt:"",street:"",lat:"39.908823",lng:"116.39747"}},backupDataL:{},backupDataD:{}}},activated:function(){},mounted:function(){this.handleSourceData(),this.scroll(),this.sendPoint("page"),this.pageInit(),this.keyboardFix()},beforeRouteEnter:function(t,e,n){n(function(t){if("AddressHome"===e.name){if(t.routerStatus=1,sessionStorage.getItem("confirmedAddressInfo")){var n=JSON.parse(sessionStorage.getItem("confirmedAddressInfo"));t.confirmedAddressInfo=n,console.log("从地址页返回"),t.queryMerListInit(),console.log("info.addressTxt:",n.addressInfo.addressTxt),n&&n.addressInfo&&!n.addressInfo.addressTxt&&t.doQueryAddressName()}else t.getLatLng();sessionStorage.getItem("pageStatus")&&(t.pageStatus=Number(sessionStorage.getItem("pageStatus")))}else console.log("首次进来"),t.getLatLng()})},watch:{searchLTxtRes:function(t,e){console.log("oVal:",e),!e&&t.length&&(console.log("数据备份"),this.shopListBackup("l")),t.length?(console.log("开始搜索商户:",t),this.searchListLInit()):(console.log("恢复商户"),this.queryLid++,this.shopListRecover("l"))},searchDTxtRes:function(t){var e=t;e.length?this.searchShop():this.shopListD=this.shopListDRaw},shopListD:function(t,e){var n=t.length;console.log("length:",n),n<10&&!this.noMoreDataD&&this.queryListD()},noDataL:function(t){if(!this.routerStatus){var e=!0,n=!0;t&&1===this.queryLid&&(e=!1),!0===this.noDataD&&1===this.queryDid&&(n=!1),!e&&n&&(this.pageStatus=2)}},noDataD:function(t){if(!this.routerStatus){var e=!0,n=!0;t&&1===this.queryDid&&(n=!1),this.noDataL&&1===this.queryLid&&(e=!1),!e&&n&&(this.pageStatus=2)}}},computed:{searchLTxtRes:function(){return this.searchLTxt.trim()},searchDTxtRes:function(){return this.searchDTxt.replace(/\s*/g,"")}},methods:{getLatLng:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!Object(I["b"])("lat")||!Object(I["b"])("lng")){t.next=8;break}this.confirmedAddressInfo.cityInfo.defaultLat=Object(I["b"])("lat"),this.confirmedAddressInfo.cityInfo.defaultLng=Object(I["b"])("lng"),this.confirmedAddressInfo.addressInfo.lat=Object(I["b"])("lat"),this.confirmedAddressInfo.addressInfo.lng=Object(I["b"])("lng"),this.queryMerListInit(),t.next=24;break;case 8:return t.prev=8,this.isGetGeo=!0,t.next=12,Object(I["a"])();case 12:e=t.sent,this.isGetGeo=!1,e&&e.lat&&e.lng?(this.latLng.latitude=e.lat,this.latLng.longitude=e.lng,this.confirmedAddressInfo.cityInfo.defaultLat=e.lat,this.confirmedAddressInfo.cityInfo.defaultLng=e.lng,this.confirmedAddressInfo.addressInfo.lat=e.lat,this.confirmedAddressInfo.addressInfo.lng=e.lng):Object(u["b"])("未获取到您的位置，请在‘设置’中开启定位功能"),this.queryMerListInit(),t.next=24;break;case 18:t.prev=18,t.t0=t["catch"](8),console.log("err:",t.t0),Object(u["b"])("未获取到您的位置，请在‘设置’中开启定位功能"),this.isGetGeo=!1,this.queryMerListInit();case 24:this.doQueryAddressName();case 25:case"end":return t.stop()}},t,this,[[8,18]])}));return function(){return t.apply(this,arguments)}}(),doQueryAddressName:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,n,s,i,o,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.confirmedAddressInfo.addressInfo,!e.address){t.next=3;break}return t.abrupt("return");case 3:return n={latitude:e.lat,longitude:e.lng},s={},t.prev=5,this.isFullLoading=!0,t.next=9,Object(S["c"])(n);case 9:s=t.sent,this.isFullLoading=!1,t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](5),this.isFullLoading=!1,Object(u["b"])(s.resultMsg);case 17:"0"===s.resultCode&&(i=s.resultData,o={cityName:i.addressComponent.city,defaultLat:e.lat,defaultLng:e.lng,isByLocation:!0},this.confirmedAddressInfo={cityInfo:o,addressInfo:{addressTxt:i.address,street:i.street_number||i.street||i.district,lat:e.lat,lng:e.lng}},a=JSON.stringify(this.confirmedAddressInfo),sessionStorage.setItem("confirmedAddressInfo",a));case 18:case"end":return t.stop()}},t,this,[[5,13]])}));return function(){return t.apply(this,arguments)}}(),queryListL:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var n,s,i,a,r,c,d;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!(this.isQueryingListL&&!this.searchLTxtRes||this.noMoreDataL)){t.next=2;break}return t.abrupt("return",!1);case 2:return console.log("queryListL"+e),n=this.confirmedAddressInfo.addressInfo.lat,s=this.confirmedAddressInfo.addressInfo.lng,i={userLatitude:n,userLongitude:s,latitude:n,longitude:s,radius:this.radius,pageIndex:this.lPage.index,pageSize:this.lPage.size},this.searchLTxtRes&&(a={keywords:[this.searchLTxtRes]},r=l["Base64"].encode(JSON.stringify(a)),i=Object.assign(i,{queryCondition:r})),c={},this.queryLid++,d=this.queryLid,t.prev=10,1===this.queryLid&&1===this.pageStatus&&(this.isFullLoading=!0),this.isQueryingListL=!0,t.next=15,Object(S["f"])(i);case 15:c=t.sent,this.isQueryingListL=!1,this.isFullLoading=!1,t.next=25;break;case 20:t.prev=20,t.t0=t["catch"](10),this.isFullLoading=!1,this.isQueryingListL=!1,Object(u["b"])("稍后再试！");case 25:if("0"!==c.resultCode){t.next=33;break}if(this.searchLAble=!0,d===this.queryLid){t.next=29;break}return t.abrupt("return");case 29:1===this.lPage.index?(this.shopListL=c.resultData||[],c.resultData.length||(this.noDataL=!0)):this.shopListL=Object(o["a"])(this.shopListL).concat(Object(o["a"])(c.resultData)),c.resultData.length<this.lPage.size?this.noMoreDataL=!0:this.lPage.index++,t.next=34;break;case 33:Object(u["b"])(c.resultMsg);case 34:case"end":return t.stop()}},t,this,[[10,20]])}));return function(e){return t.apply(this,arguments)}}(),queryListD:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,n,s,i,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.isQueryingListD&&!this.noMoreDataD){t.next=2;break}return t.abrupt("return",!1);case 2:return this.isQueryingListD=!0,e=this.confirmedAddressInfo.addressInfo.lat,n=this.confirmedAddressInfo.addressInfo.lng,s={latitude:e,longitude:n,userLatitude:e,userLongitude:n,pageSize:this.dPage.size,pageIndex:this.dPage.index},i={},this.queryDid++,t.prev=8,1===this.queryDid&&2===this.pageStatus&&(this.isFullLoading=!0),t.next=12,Object(S["e"])(s);case 12:i=t.sent,this.searchDAble=!0,this.isQueryingListD=!1,this.isFullLoading=!1,t.next=23;break;case 18:t.prev=18,t.t0=t["catch"](8),Object(u["b"])("服务异常,请稍后再试！"),this.isQueryingListD=!1,this.isFullLoading=!1;case 23:1!==this.dPage.index||"0"!==i.resultCode||i.resultData.length||(this.noDataD=!0),i.resultData&&i.resultData.length>0?(a=this.shopListD,r=this.shopListDRaw,a.push.apply(a,Object(o["a"])(i.resultData)),r.push.apply(r,Object(o["a"])(i.resultData)),this.shopListD=a,this.shopListDRaw=r,this.dPage.index++,this.searchDTxtRes&&this.searchShop()):Object(u["b"])("服务异常,请稍后再试！"),i.resultData.length<this.dPage.size&&(this.noMoreDataD=!0);case 26:case"end":return t.stop()}},t,this,[[8,18]])}));return function(){return t.apply(this,arguments)}}(),handleSourceData:function(){this.judgeTime();var t=this.sourceData;this.enterList=t.enterList,this.setShareOption()},pageInit:function(){this.pageBackInit()},queryMerListInit:function(){console.log("queryMerListInit"),this.queryListLInit(),this.queryListDInit()},queryListLInit:function(){console.log("queryListLInit"),this.noMoreDataL=!1,this.noDataL=!1,this.lPage={index:1,size:10},this.shopListL=[],this.queryListL()},queryListDInit:function(){this.noMoreDataD=!1,this.noDataD=!1,this.dPage={index:1,size:10},this.shopListD=[]},searchListLInit:function(){this.searchLTxtRes&&this.queryListLInit()},shopListBackup:function(t){"l"===t&&(this.backupDataL={page:this.lPage,list:this.shopListL,noMoreData:this.noMoreDataL,noData:this.noDataL})},shopListRecover:function(t){"l"===t&&(this.lPage=this.backupDataL.page,this.shopListL=this.backupDataL.list,this.noMoreDataL=this.backupDataL.noMoreData,this.noDataL=this.backupDataL.noData,this.backupDataL.list.length||this.queryListLInit())},pageBackInit:function(){var t=this.$store.state.addressChange;console.log("isAddressChange:",t),t&&(this.$store.commit("SET_ADDRESSCHANGE",!1),this.confirmedCityInfo=JSON.parse(sessionStorage.getItem("confirmedCityInfo")))},searchLFocus:function(){this.sendPoint("searchLFocus")},searchDFocus:function(){this.sendPoint("searchDFocus")},changeTab:function(t){if(this.pageStatus===t)return!1;1===this.pageStatus?this.scrollTopL=document.body.scrollTop||document.documentElement.scrollTop||0:2===this.pageStatus&&(this.scrollTopD=document.body.scrollTop||document.documentElement.scrollTop||0),this.pageStatus=t,1===t?(document.body.scrollTop=this.scrollTopL,document.documentElement.scrollTop=this.scrollTopL):2===t&&(document.body.scrollTop=this.scrollTopD,document.documentElement.scrollTop=this.scrollTopD),this.sendPoint("changTab"+t)},goChageAddress:function(){sessionStorage.setItem("pageStatus",this.pageStatus),this.$router.push({name:"AddressHome",query:{}}),this.sendPoint("changeAddress")},goDaojiaMap:function(){var t=this.confirmedAddressInfo.addressInfo.lat,e=this.confirmedAddressInfo.addressInfo.lng;setTimeout(function(){location.href=origin+"/activity/2018/location/html/daojiamap.html?lat="+t+"&lng="+e+"&userLat="+t+"&userLng="+e},300)},searchShop:function(){var t=this.searchDTxtRes;if(!t.length)return!1;var e=[];this.shopListD.forEach(function(n,s){-1!==n.storeName.indexOf(t)&&e.push(n)}),this.shopListD=e},searchCancel:function(){this.shopListD=this.shopListDRaw,this.searchTxt=""},inputFocus:function(){},inputBlur:function(){},inputTouch:function(){},keyboardFix:function(){var t=this;document.addEventListener("touchstart",function(e){t.$refs.searchL.blur(),t.$refs.searchD.blur()},!1)},scroll:function(){var t=this;window.onscroll=function(){var e=document.documentElement.offsetHeight-document.documentElement.scrollTop-window.innerHeight<=10,n=document.body.offsetHeight-document.body.scrollTop-window.innerHeight<=10;(e||n)&&(1!==t.pageStatus||t.noMoreDataL?2!==t.pageStatus||t.noMoreDataD||t.queryListD():t.queryListL())}},sendPoint:function(t,e){window.JPTrack.emit(["liehudaojia",t],e)},judgeTime:function(){var t=(new Date).getTime(),e=this.sourceData.pageTime||{},n=e.onlineDate,s=e.onlineLink,i=e.offlineDate,o=e.offlineLink;if(n&&s){var a=new Date(n).getTime();if(a>t)return console.log("未上线"),location.href=s+"&timeLine="+n,!1}if(i&&o){var r=new Date(i).getTime();if(r<t)return console.log("已下线"),location.href=o,!1}},setShareOption:function(){var t=this.sourceData.share,e={moreItem:!0,share_img:t.logo,share_url:"https://pb.jd.com/activity/2018/location/html/liehudaojia.html#/home",share_title:t.title,share_subtitle:t.desc,channels:["1","2","3","4","5"]};window.JPFESDK.setShare(e)}}},w=T,j=(n("ifKJ"),Object(g["a"])(w,s,i,!1,null,"9147850c",null));e["default"]=j.exports},KfNM:function(t,e){var n=Object.prototype,s=n.toString;function i(t){return s.call(t)}t.exports=i},Kz5y:function(t,e,n){var s=n("WFqU"),i="object"==typeof self&&self&&self.Object===Object&&self,o=s||i||Function("return this")();t.exports=o},MooI:function(t,e,n){},NpTB:function(t,e,n){"use strict";var s=n("MooI"),i=n.n(s);i.a},NykK:function(t,e,n){var s=n("nmnc"),i=n("AP2z"),o=n("KfNM"),a="[object Null]",r="[object Undefined]",c=s?s.toStringTag:void 0;function u(t){return null==t?void 0===t?r:a:c&&c in Object(t)?i(t):o(t)}t.exports=u},OAs0:function(t,e,n){"use strict";var s=n("152E"),i=n.n(s);i.a},QIyF:function(t,e,n){var s=n("Kz5y"),i=function(){return s.Date.now()};t.exports=i},WFqU:function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(this,n("yLpj"))},XPPn:function(t,e,n){"use strict";var s=n("BTUV"),i=n.n(s);i.a},YRSS:function(t,e,n){},czNK:function(t,e,n){"use strict";var s=n("DVgA"),i=n("JiEa"),o=n("UqcF"),a=n("S/j/"),r=n("Ymqv"),c=Object.assign;t.exports=!c||n("eeVq")(function(){var t={},e={},n=Symbol(),s="abcdefghijklmnopqrst";return t[n]=7,s.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=s})?function(t,e){var n=a(t),c=arguments.length,u=1,l=i.f,d=o.f;while(c>u){var f,h=r(arguments[u++]),p=l?s(h).concat(l(h)):s(h),g=p.length,m=0;while(g>m)d.call(h,f=p[m++])&&(n[f]=h[f])}return n}:c},fAPB:function(t,e,n){"use strict";n.d(e,"a",function(){return s});var s={cityCode:"110100",cityName:"北京市",spelling:"beijingshi",default_lat:"39.90469000000",default_lng:"116.4071700000",search_word:"北京市,beijing"}},ifKJ:function(t,e,n){"use strict";var s=n("YRSS"),i=n.n(s);i.a},iv4g:function(t,e,n){"use strict";function s(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function i(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){return s(t)||i(t)||o()}n.d(e,"a",function(){return a})},nmnc:function(t,e,n){var s=n("Kz5y"),i=s.Symbol;t.exports=i},p3Gn:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{class:["item","coupon"]},["1"===t.info.mktActType||"2"===t.info.mktActType?n("span",{staticClass:"left"},[n("span",{staticClass:"coupon-sign"},[t._v("￥")]),n("span",{staticClass:"coupon-amount"},[t._v(t._s(t.info.prizeAmount))])]):n("div",{staticClass:"left lottery"}),n("span",{staticClass:"middle"},["1"===t.info.mktActType||"2"===t.info.mktActType?n("div",{staticClass:"coupon-name"},[t._v(t._s(t.info.prizeName))]):n("div",{staticClass:"coupon-name"},[t._v("红包")]),n("div",{staticClass:"coupon-limit"},[t._v(t._s(t.info.prizeDesc))])]),n("span",{staticClass:"right"},[1===t.info.operation?n("button",{on:{click:function(e){t.dogetCouponLottery(t.info.entranceId)}}},[t._v("领取")]):n("button",{on:{click:function(e){t.lookCoupon(t.info.useUrl)}}},[t._v("查看")]),n("div",{staticClass:"coupon-percent"},[t._v("剩余"+t._s(t.percent)+"%")])])])},i=[],o=(n("ls82"),n("MECJ")),a=n("uXAG"),r=n("Is5O"),c={name:"",props:{info:{type:Object,default:function(){return{}}},type:{type:String,default:""},storeCode:{type:String,default:""},latLng:{type:Object,default:function(){return{}}}},components:{},data:function(){return{}},computed:{percent:function(){var t=this.info.payCountLimit+this.info.payCount,e=this.info.payCountLimit,n=100*e/t;return n>100?n=100:n>99&&n<100?n=99:n>0&&n<1&&(n=1),n.toFixed(0)}},created:function(){},mounted:function(){},methods:{dogetCouponLottery:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n,s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=this.latLng,s={storeCode:this.storeCode,latitude:n.lat,longitude:n.lng,entranceId:e,site:"1",fromS:""},console.log("getCoupon reqParams",s),i={},t.prev=4,a["b"].loading({duration:0,forbidClick:!0,loadingType:"spinner"}),t.next=8,Object(r["b"])(s);case 8:i=t.sent,console.log(i),a["b"].clear(),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](4),a["b"].clear(),Object(a["b"])(i.data||"领奖异常请稍后再试！");case 17:"0"===i.resultCode?(this.info.operation=2,this.info.payCount++,"3"===this.info.mktActType&&(this.info.mktActType="2",this.info.prizeAmount=i.resultData.prizeAmount,this.info.prizeName=i.resultData.prizeName,this.info.prizeDesc=i.resultData.prizeDesc),this.$emit("sendPoint","getLotterySucc")):(this.$emit("sendPoint","getLotteryError"),Object(a["b"])(i.resultMsg)),this.$emit("sendPoint","getLottery");case 19:case"end":return t.stop()}},t,this,[[4,13]])}));return function(e){return t.apply(this,arguments)}}(),getLatLng:function(){var t=sessionStorage.getItem("confirmedAddressInfo"),e=JSON.parse(t);this.latLng.lat=e.addressInfo.lat,this.latLng.lng=e.addressInfo.lng},lookCoupon:function(t){location.href=t}}},u=c,l=(n("XPPn"),n("KHd+")),d=Object(l["a"])(u,s,i,!1,null,"1caaf4e4",null);e["a"]=d.exports},rGqo:function(t,e,n){for(var s=n("yt8O"),i=n("DVgA"),o=n("KroJ"),a=n("dyZX"),r=n("Mukb"),c=n("hPIQ"),u=n("K0xU"),l=u("iterator"),d=u("toStringTag"),f=c.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(h),g=0;g<p.length;g++){var m,b=p[g],L=h[b],v=a[b],y=v&&v.prototype;if(y&&(y[l]||r(y,l,f),y[d]||r(y,d,b),c[b]=f,L))for(m in s)y[m]||o(y,m,s[m],!0)}},sEfC:function(t,e,n){var s=n("GoyQ"),i=n("QIyF"),o=n("tLB3"),a="Expected a function",r=Math.max,c=Math.min;function u(t,e,n){var u,l,d,f,h,p,g=0,m=!1,b=!1,L=!0;if("function"!=typeof t)throw new TypeError(a);function v(e){var n=u,s=l;return u=l=void 0,g=e,f=t.apply(s,n),f}function y(t){return g=t,h=setTimeout(C,e),m?v(t):f}function _(t){var n=t-p,s=t-g,i=e-n;return b?c(i,d-s):i}function D(t){var n=t-p,s=t-g;return void 0===p||n>=e||n<0||b&&s>=d}function C(){var t=i();if(D(t))return A(t);h=setTimeout(C,_(t))}function A(t){return h=void 0,L&&u?v(t):(u=l=void 0,f)}function S(){void 0!==h&&clearTimeout(h),g=0,u=p=l=h=void 0}function x(){return void 0===h?f:A(i())}function I(){var t=i(),n=D(t);if(u=arguments,l=this,p=t,n){if(void 0===h)return y(p);if(b)return h=setTimeout(C,e),v(p)}return void 0===h&&(h=setTimeout(C,e)),f}return e=o(e)||0,s(n)&&(m=!!n.leading,b="maxWait"in n,d=b?r(o(n.maxWait)||0,e):d,L="trailing"in n?!!n.trailing:L),I.cancel=S,I.flush=x,I}t.exports=u},tLB3:function(t,e,n){var s=n("GoyQ"),i=n("/9aa"),o=NaN,a=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,u=/^0o[0-7]+$/i,l=parseInt;function d(t){if("number"==typeof t)return t;if(i(t))return o;if(s(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=s(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(a,"");var n=c.test(t);return n||u.test(t)?l(t.slice(2),n?2:8):r.test(t)?o:+t}t.exports=d}}]);
//# sourceMappingURL=6.ce7098e8.js.map