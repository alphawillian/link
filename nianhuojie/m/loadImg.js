var docCookies = {
    getItem: function (sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
            case String:
                sExpires = "; expires=" + vEnd;
                break;
            case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};

var imgCount = "";
var removeCount = 46;
var bank_hasImg = false;
var isJump = false;
docCookies.getItem('bank_hasImg');
function loadPageImg(){
    $("#pageImg1").prop("src","//img30.360buyimg.com/jr_image/jfs/t16048/237/1564399294/268332/8e231a5f/5a6016a8N50413995.jpg");
    $("#pageImg2").prop("src","//img30.360buyimg.com/jr_image/jfs/t18094/266/114259045/10950/6ef10bcc/5a5dbff3N36065adc.png");
    $("#pageImg3").prop("src","//img30.360buyimg.com/jr_image/jfs/t16705/155/137952902/239247/c947b86f/5a6016a9N4a29a9a4.jpg");
    $("#pageImg4").prop("src","//img30.360buyimg.com/jr_image/jfs/t14884/365/1880109690/438780/ba51bdf9/5a5dbff2N1fc88624.png");
}
function imgRemove() {
    $("#start").show();
    setTimeout(function(){
        isJump = true;
        var timer = setInterval(function(){ 
            removeCount--;
            //最后一张图
            if(removeCount==1){
                clearInterval(timer);
                setTimeout(function(){
                    $("#jump"+removeCount).addClass('hide');
                    isJump = false;                     
                },1000)
            }else{
                $("#jump"+removeCount).addClass('hide');
            }
        },100)
    },700)
}
if(bank_hasImg){
    imgRemove();
    loadPageImg();
}
function imgLoad(){
    imgCount++;
    console.log(imgCount);
    if(imgCount > 44){
        docCookies.setItem('bank_hasImg','true',315360000);
        imgRemove();
        loadPageImg();
    }	
}
setTimeout(function(){
    loadPageImg();
    if(!isJump){
        $("#start").remove();
    }
},4000)