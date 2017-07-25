/**
 * Created by a369785853 on 2017/7/23.
 */
(function(){
    if(/MSIE (6|7|8)/i.test(window.navigator.userAgent)) {
        str = '';
        str += "<h1 style='margin= 100px auto;width=500px;height=200px;text-align=center'>Sorry,歧视IE 6 7 8</h1>";
        str += "<h1 style='font-size: 40px;width=500px;height=200px;margin= 0 auto;text-align=center'>请使用高版本浏览器</h1>"
        document.body.innerHTML=str
        return false;
    };
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    var flag = IsPC();
    if (!flag) {
        window.location.href = './touch.html'
    }
})()