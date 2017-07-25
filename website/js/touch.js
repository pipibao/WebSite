new Swiper(".swiper-container",{
    direction : 'vertical',
    loop : true,
    onSlideChangeEnd : function(swiper){
        var arr = swiper.slides,
            cur = swiper.activeIndex,
            total = arr.length;
        var targetId = 'page';
        switch (cur) {
            case 0:
                targetId += total -2;
                break;
            case total-1:
                targetId += 1;
                break;
            default:
                targetId += cur;
        }
        for (var i = 0; i < arr.length; i++) {
            if (cur == i) {
                arr[i].id = targetId
                return;
            }
            arr[i].id = null;
        }

    }
})
var width = document.documentElement.clientWidth,
    x = width*100/640;
document.documentElement.style.fontSize = x + 'px';
