(function(){
    var box = document.getElementById("begin"),
        fake = document.getElementById('fake'),
        boss = document.getElementById('boss'),
        clientWidth = document.documentElement.clientWidth || document.body.clientWidth,
        clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
        width = box.offsetWidth,
        height = box.offsetHeight;
    var animate = {
        num: 1,
        time : 3000,
        elem : $(box),
        boss: boss,
        right: function(){
            var _this = this;
            this.elem.animate({
                left: (clientWidth-width)/2
            },this.time,'linear',function(){
               _this.elem.css('display','none');
                $(fake).css('opacity',1)
                setTimeout(_this.finish.bind(_this),200)
            })
        },
        down : function () {
            var _this = this;
            var speed = 9.6,top = clientHeight/2 - height/2,time=0;
            var anim = setInterval(function(){
                speed+= 9.6;
                speed *= 0.99;
                time += 31;
                var cur = parseFloat(_this.elem.css('top'))+speed;
                if (time >= _this.time) {
                    clearInterval(anim);
                }
                if(cur > top) {
                    speed *= -1;
                    cur = top;
                }
                _this.elem.css("top",cur)
            },31)
        },
        finish: function(){
            var _this = this;
            var cir = $('.cir1')[0],sm_cir = $(".sm_cir")[0],sm_cir1 = $(".sm_cir1")[0],sm_cir2 = $(".sm_cir2")[0],
                cir2 = $('.cir2')[0],sm_cir3 = $(".sm_cir3")[0],sm_cir4 = $(".sm_cir4")[0],sm_cir5 = $(".sm_cir5")[0],
                cir3 = $('.cir3')[0],sm_cir6 = $(".sm_cir6")[0],sm_cir7 = $(".sm_cir7")[0],sm_cir8 = $(".sm_cir8")[0];
            this.circleCreate({
                r: 250,
                elem : [sm_cir,sm_cir1,sm_cir2],
                father : cir,
                deg:[270,0,90],
                time: [10,27,34]
            });
            setTimeout(function(){
                this.circleCreate({
                    r: 500,
                    elem : [sm_cir3,sm_cir4,sm_cir5],
                    father : cir2,
                    deg:[270,0,90],
                    time: [10,17,24]
                });
            }.bind(this),200);
            setTimeout(function(){
                this.circleCreate({
                    r: 800,
                    elem : [sm_cir6,sm_cir7,sm_cir8],
                    father : cir3,
                    deg:[270,0,90],
                    time: [10,17,24]
                });
                this.show();
                $('.tip').animate({
                    opacity: 1
                },2200,'swing')
            }.bind(this),500)
        },

        circleCreate: function(options){
            for (var i = 0; i < options.elem.length; i++) {
                this.drow(options.r,options.elem[i],options.deg[i],options.time[i])
            }
            $(options.father).animate({
                opacity: 1
            },600,function(){

            }.bind(this))
        },
        circle: function(deg,r){
            var top = Math.sin(deg*Math.PI/180)*r ;
            var left = Math.cos(deg*Math.PI/180)*r;
            return {
                top: top,
                left: left
            }
        },
        show : function () {
            $("#boss").animate({
                opacity: 1,
                width: 800,
                marginLeft: -400,
            },500,function(){
                setTimeout(function(){
                    $("#boss").addClass('show')
                },700)
            })
            $(this.boss).find('.pic').animate({
                opacity: 1
            },600,function(){
                $(".pic").addClass('picActive');
                $(".introduce").addClass('introActive');
                $(".hobby").addClass('hobActive');
                this.compatible();
            }.bind(this))
        },
        drow: function(r,elem,deg,time){
            setInterval(function(){
                if(deg>=360) {
                    deg = 0;
                } else {
                    deg++;
                }
                var top = this.circle(deg,r).top,
                    left = this.circle(deg,r).left;
                elem.style.left = parseFloat(r)+parseFloat(left)-30/2+'px';
                elem.style.top = parseFloat(r)+parseFloat(top)-30/2+'px';

            }.bind(this),time)
        },
        compatible : function(){
            var _this = this;
            if(window.addEventListener) {
                window.addEventListener("DOMMouseScroll",_this.scroll.bind(_this),false);
            }
            window.onmousewheel = this.scroll.bind(this)
        },
        scroll: function(e){
            var e = e || window.event;
            if (e.wheelDelta < 0 && this.num ===1) {
                this.removeBoss()
                this.num++;
            }
            if (e.detail > 0 && this.num ===1) {
                this.removeBoss();
                this.num++;
            }
        },
        removeBoss: function(){
            $(".pic").removeClass('picActive');
            $(".introduce").removeClass('introActive');
            $(".hobby").removeClass('hobActive');;
            $("#boss").css({
                height: 0,
                marginTop: 0
            });
            setTimeout(function(){
                $("#boss").css({
                    width: 0,
                    marginLeft: 0
                });
                this.removeIn()
            }.bind(this),1500)
        },
        removeIn: function(){
            var _this = this;
            setTimeout(function(){
                $("#in").animate({
                    opacity:0
                },900,function(){
                    $(this).css('display','none');
                    $('#video').animate({
                        opacity: 1,
                    },1000);
                })
                _this.addMain();

            },600)
        },
        addMain : function(){
            var script = document.createElement('script');
            script.setAttribute('src',"js/main.js")
            document.body.appendChild(script);

        },
        init : function(){
            this.right();
            this.down();
        }
    }
    animate.init()
})();