(function () {
  if(/debug=61fa153f2827c887a48a351ae3c6cfd3/.test(window.location)){ //判断是否是debug模式
    var script = document.createElement('script');
    script.src="//cdn.jsdelivr.net/npm/eruda"; 
    document.body.appendChild(script);
    script.onload = function () { 
      eruda.init();
    }
  } 
})();