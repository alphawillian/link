(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79fd9a76"],{3875:function(t,e,i){"use strict";var n=i("a643"),o=i.n(n);o.a},"3e5a":function(t,e,i){"use strict";var n,o=i("2b0e"),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isShow?i("div",{attrs:{id:"fullLoading",tip:t.tip}},[t._m(0)]):t._e()},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"loading_box"},[i("span",{staticClass:"loading_circle"})])}],c={name:"fe-loading",data:function(){return{isShow:!1,size:"default",tip:""}},watch:{isShow:function(t){var e=this;t||window.setTimeout(function(){e.destroyElement()},1e3)}},methods:{destroyElement:function(){this.$destroy(),this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)}},mounted:function(){var t=this;window.setTimeout(function(){t.isShow=!0},0)}},r=c,l=(i("3875"),i("2877")),u=Object(l["a"])(r,s,a,!1,null,"7e3114c2",null),f=u.exports,d=o["default"].extend(f),h=[],y=function(t){t=t||{},n=new d({data:t}),n.vm=n.$mount(),n.dom=n.vm.$el,n.id="loading",document.body.appendChild(n.dom),h.push(n)};y.close=function(t,e){t="loading";for(var i=0,n=h.length;i<n;i++)if(t===h[i].id){"function"===typeof e&&e(h[i]),h[i].$set(h[i].$data,"isShow",!1),h.splice(i,1);break}setTimeout(function(){var t=document.getElementById("fullLoading");t&&t.parentNode&&t.parentNode.removeChild(t)},500)};e["a"]=y},"9c5c":function(t,e,i){},a21f:function(t,e,i){var n=i("584a"),o=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},a643:function(t,e,i){},b58d:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-out"},[i("div",{staticClass:"address-city"},[t.cityInfo.cityName?i("div",{staticClass:"city-current"},[t._m(0),i("span",{staticClass:"city"},[t._v(t._s(t.cityInfo.cityName))])]):t._e(),t.hotCityList.length?i("div",{staticClass:"city-hot"},[i("div",{staticClass:"title"},[t._v("热门城市")]),i("ul",{staticClass:"hot-list"},t._l(t.hotCityList,function(e,n){return i("li",{key:n,staticClass:"hot-item",on:{click:function(i){return t.confirmCity(e,"hot")}}},[i("span",[t._v(t._s(e.cityName))])])}),0)]):t._e(),t.cityList.length?i("div",{staticClass:"city-block"},t._l(t.cityList,function(e,n){return i("div",{key:n,staticClass:"alpha-block"},[i("div",{ref:e.groupName,refInFor:!0,staticClass:"alpha"},[t._v(t._s(e.groupName))]),t._l(e.data,function(e,n){return i("ul",{key:n,staticClass:"city-list"},[i("li",{staticClass:"city-item",on:{click:function(i){return t.confirmCity(e,"normal")}}},[t._v(t._s(e.cityName))])])})],2)}),0):t._e(),i("div",{staticClass:"alphabet-block"},[i("ul",{staticClass:"alpha-list"},t._l(t.cityList,function(e,n){return i("li",{key:n,staticClass:"alpha-item",on:{click:function(i){return t.goAnchorAlpha(e.groupName)}}},[t._v(t._s(e.groupName))])}),0)])])])},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("span",{staticClass:"desc"},[i("i",{staticClass:"icon-location"}),i("span",[t._v("当前城市")])])}],s=(i("4917"),i("96cf"),i("3b8d")),a=i("f499"),c=i.n(a),r=(i("7f7f"),i("4cc8")),l=i("3e5a"),u=i("22ce"),f=i("fa7d"),d={name:"",components:{},data:function(){return{confirmedAddressInfo:{cityInfo:{cityName:"",cityCode:""},addressInfo:{addressTxt:"",street:"",lat:"",lng:""}},cityInfo:{cityCode:"",cityName:""},hotCityList:[],cityList:[],data:{hotCityList:[],cityList:[]}}},created:function(){},watch:{},mounted:function(){this.pageInit()},beforeRouteLeave:function(t,e,i){if(console.log("to:",t),"index"===t.name){var n=c()(this.cityInfo);sessionStorage.setItem("cityInfo",n)}i()},methods:{doQueryCityList:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,i,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={biz:"trafficHome"},i={},t.prev=2,Object(l["a"])(),t.next=6,Object(u["e"])(e);case 6:i=t.sent,l["a"].close(),t.next=15;break;case 10:return t.prev=10,t.t0=t["catch"](2),l["a"].close(),Object(r["a"])("网络繁忙，请稍后重试！"),t.abrupt("return",!1);case 15:"F_000000"===i.code?(this.$store.commit("SET_RAW_CITYINFO",i.data),console.log("store.state.rawCityInfo:",this.$store.state.rawCityInfo),n=this.$store.state.rawCityInfo,this.hotCityList=n.hotCityList,this.cityList=n.cityList):Object(r["a"])(i.msg||"网络繁忙，请稍后重试！");case 16:case"end":return t.stop()}},t,this,[[2,10]])}));function e(){return t.apply(this,arguments)}return e}(),pageInit:function(){this.handleSessionStorage(),this.getStoreInfo()},handleSessionStorage:function(){var t=JSON.parse(sessionStorage.getItem("beforeCityInfo"));console.log("cityInfo",t),t?this.cityInfo=t:console.log("无城市信息")},getStoreInfo:function(){var t=this.$store.state.rawCityInfo;console.log(t),t.cityList&&this.hotCityList?(console.log("有数据"),this.hotCityList=t.hotCityList,this.cityList=t.cityList):(console.log("无数据"),this.doQueryCityList())},confirmCity:function(t,e){this.cityInfo=t,this.$router.back(),this.sendPoint(t.cityCode,e)},sendPoint:function(t,e){var i="city";t=t||"default",e=e||"default",Object(f["c"])(i,e,t)},goAnchorAlpha:function(t){var e=window.navigator.userAgent,i=e.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);console.log("ismobile:",i),console.log("alpha:",t);var n=this.$refs[t];console.log(n);var o=n[0].offsetTop,s=document.body||document.documentElement;i||(s=document.documentElement),console.log("doc.scrollTop:",s.scrollTop),clearInterval(window.anchorTimer),window.anchorTimer=setInterval(function(){var t=(o-s.scrollTop)/8;t=t>0?Math.ceil(t):Math.floor(t),s.scrollTop+window.innerHeight-s.offsetHeight===0&&clearInterval(window.anchorTimer),Math.abs(t)<=1&&clearInterval(window.anchorTimer),s.scrollTop===o?clearInterval(window.anchorTimer):s.scrollTop+=t},20)}}},h=d,y=(i("f0e0"),i("2877")),m=Object(y["a"])(h,n,o,!1,null,"699ed386",null);e["default"]=m.exports},f0e0:function(t,e,i){"use strict";var n=i("9c5c"),o=i.n(n);o.a},f499:function(t,e,i){t.exports=i("a21f")}}]);
//# sourceMappingURL=chunk-79fd9a76.3444017e.js.map