var baseUrl = "http://orionmm.jd.local:8001"
var baseUrl = "http://lbsfavorablemap.jd.local:8001"
var baseUrl = "http://orionmm.jd.com:8001"
// var baseUrl = "http://10.222.11.216:8001"
$.ajax({
  url: baseUrl+"/omm/ml.htm",
  type: 'GET',
  dataType:'jsonp',
  xhrFields: {
    withCredentials: true
  },
  success: function(res){
    console.log(res)
  },
  error: function(err){
    console.log(err)
  }
})