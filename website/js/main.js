(function(){
    var main = {
        flag: false,
        box: $("#main"),
        text: function(){
            setTimeout(function(){
                this.box.find('.line').addClass('lactive')
            }.bind(this),1000);
            $(".text1").addClass('t1Active');
            $(".text2").addClass('t2Active');
            this.fontBig('text1');
            this.fontBig('text2');
        },
        fontBig: function(elem){
            $('.'+elem).stop().hover(function(){
                $('.'+elem).find('p').animate({
                    fontSize: 50
                },500)
            },function(){
                $('.'+elem).stop().find('p').animate({
                    fontSize: 36
                },500)
            })
        },
        ability: function(){
            $(".text2").click(function(){
                this.bg();
                this.compatible();
            }.bind(this));

        },
        project: function(){
            $('.text1').click(function(){
                banner.init()
            })

        },
        bg: function(){
            var _this = this;
            $('.bg-box').each(function(index,val){
                $(this).addClass('bgActive')
            })
            $('.ability').addClass('zIndex');
            _this.flag = true;
            this.desOpt();
        },
        compatible : function(){
            var _this = this;
            if(window.addEventListener) {
                window.addEventListener("DOMMouseScroll",_this.scroll.bind(_this),false);
            }
            window.onmousewheel = this.scroll.bind(this)
        },
        scroll: function(e){
            e = e || window.event
            if(e.wheelDelta < 0 && this.flag === true) {
                $('.bg-box').each(function(index,val){
                    $(this).removeClass('bgActive')
                })
                $('.ability').removeClass('zIndex')
                this.flag = false;
                this.desOpt();
            }
        },
        desOpt: function(){
            if(this.flag) {
                $('#des').addClass('opa')
                setTimeout(function(){
                    $(".i").find('i').each(function(index,val){
                        $(this).css({
                            width: $(this).attr('my-width')
                        })
                    })
                },1000)

            } else {
                $('#des').removeClass('opa');
                $(".i").find('i').each(function(index,val){
                    $(this).css({
                        width: 0
                    })
                })
            }
        },
        init: function(){
            this.text();
            this.ability();
            this.project();
        }
    };
    main.init();
    var banner = {
        flag : true,
        pos: [-1000,-320,600,1600,2700],
        setPos : function(){
            var _this  = this;
            $(".bg").each(function(index,value){
                $(this).css({
                    left: _this.pos[index]
                })

            });
        },
        move : function(){
            var _this = this,
                $bg = $(".bg");
            console.log($bg.eq(2))
            this.textShow($bg.eq(2));
            $bg.each(function(index,value){
                var $this = $(this);
                $this.click(function(index){
                    if (_this.flag ) {
                        _this.flag = false;
                        var my_index = $this.attr('myIndex')
                        _this.bgMain($this);
                        _this.judge(my_index);
                        _this.textShow($this);

                    }

                });
            });
        },
        bgMain: function($elem){
            $elem.siblings().find('img').removeClass('bgMain')
            $elem.find('img').addClass('bgMain')
        },
        remove: function(){
            var _this = this;
            $('#close').click(function(){
                $('.bg').css({
                    opacity: 0
                })
                $("#box").css({
                    height: 0,
                    marginTop: 0,
                })
                setTimeout(function(){
                    $("#container").css({
                        opacity: 0,
                        zIndex : 0,
                    });
                    _this.bgInit();
                    $("#box").css({
                        display:'none'
                    })
                },1500)
            })
        },
        judge: function(my_index){
            var _this = this;
            if(my_index > 2) {
                $('.bg').each(function(){
                    _this.setAttr($(this),-1);
                    $(this).css({
                        left: _this.pos[$(this).attr('myIndex')]
                    })
                })
            } else if (my_index <2){
                $(".bg").each(function(){
                    _this.setAttr($(this),1);
                    $(this).css({
                        left: _this.pos[$(this).attr('myIndex')]
                    })
                });
            } else {
                _this.flag = true;
            }
        },
        setAttr : function(elem,i){
            elem.attr('myIndex',parseFloat(elem.attr('myIndex'))+i);
            if(elem.attr('myIndex') < 0) { //flag === true => my_index<0
                elem.attr('myIndex',4);
                this.disp(elem)
            } else if (elem.attr('myIndex') > 4){ //flag === flase => my_index > 4
                elem.attr('myIndex',0);
                this.disp(elem)
            }

        },
        textShow:function(elem){
            if(elem.attr('myIndex')==2) {
                elem.find('.b-text').css({
                    opacity: 1
                })
                elem.find('p').css({
                    opacity: 1
                })
                elem.siblings().find('.b-text').css({
                    opacity: 0
                })
                elem.siblings().find('p').css({
                    opacity: 0
                })
            }
        },
        bgInit: function(){
            var _this = this;
            $('.bg').each(function(index){
                $(this).attr('myIndex',index)
                $(this).css({
                    left: _this.pos[$(this).attr('myIndex')]
                })
                if(index === 2) {
                    $(this).find('img').addClass('bgMain')
                    $(this).siblings().find('img').removeClass('bgMain')
                }
            })
        },
        disp : function(elem){
            var _this = this;
            elem.css({
                display: 'none'
            })
            setTimeout(function(){
                elem.css({
                    display : 'block'
                })
                _this.flag = true
            },1000)
        },

        open: function(){
            $("#container").css({
                opacity: 1,
                zIndex : 9999,
            });
            $("#box").css({
                display: 'block'
            })
            setTimeout(function(){
                $("#box").css({
                    height: 600,
                    marginTop: -300,
                })
            },300)

            setTimeout(function(){
                $('.bg').css({
                    opacity: 1
                })

            },1000)
        },
        init: function(){
            this.open()
            this.setPos()
            this.move();
            this.remove();
        }
    }

})()