
;(function () {
    var h = "hidden";
    var c = "click";
    var d = "dis";
    var a = "active";
    window.jtools = window.jtools || {};
    var arr = ["fadeOut", "zoomOut", "slideDown"];

    //弹框动画
    var trsnsitionEnd = "transitionend webkitTransitionEnd mozTransitionEnd";
    var dialogAnimate = {
        show: function ($dialog) {// show动画未完成时，不能关闭
            var $mask = $dialog.find(".mask");
            $mask.on(trsnsitionEnd, function () {
                $mask.off(trsnsitionEnd);
            });
            var aniClass = "";
            for (var i = 0; i < arr.length; i++) {
                var className = arr[i];
                if ($dialog.hasClass(className)) {
                    aniClass = className;
                    $dialog.data("aniClass", className);
                    break;
                }
            }
            aniClass = aniClass || $dialog.data("aniClass");

            $dialog.removeClass(h);
            setTimeout(function () {
                $dialog.removeClass(aniClass);
            }, 10);
        },
        close: function ($dialog) {
            var isExec = false;
            var $cont = $dialog.find(".content");
            var aniClass = $dialog.data("aniClass");
            $cont.on(trsnsitionEnd, function (e) {
                if (isExec)return;
                isExec = true;
                $dialog.addClass(h);
                $cont.off(trsnsitionEnd);
            });
            setTimeout(function () {
                if (isExec)return;
                isExec = true;
                $dialog.addClass(h);
                $cont.off(trsnsitionEnd);
            }, 310);
            $dialog.addClass(aniClass);
        }
    };

    jtools.dialogAnimate = dialogAnimate;
})();
