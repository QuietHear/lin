var bigCarousel = {
    $carousel: $('.bigCarousel'),//轮播对象
    $msg: $('.bigCarousel .list'),//轮播内容
    $prv: $('.bigCarousel .prv-btn'),//上一个按钮
    $next: $('.bigCarousel .next-btn'),//下一个按钮
    $indicator: $('.bigCarousel .indicator'),//指示器
    itemNum: null,//轮播项总个数
    indexMax: null,//下标最大值
    itemWidth: null,//每个元素宽度
    beforePlace: null,//之前下标
    nowPlace: null,//动作后下标
    INIT: null,//存储定时器
    start: function () {
        var it = this;
        this.itemNum = this.$msg.children('.item').length;
        this.indexMax = this.itemNum - 1;
        this.itemWidth = parseInt(this.$carousel.css('width'));
        if(this.itemNum>2){
            this.$msg.find('.item').each(function (index) {
                if (index === 0) {
                    $(this).addClass('top');
                }
                else if (index === 1) {
                    $(this).addClass('moveRight middle');
                }
                else if (index === it.indexMax) {
                    $(this).addClass('moveLeft middle');
                }
                else {
                    $(this).addClass('bottom');
                }
            });
        }
        this.$indicator.css({
            width: this.itemNum * 20 + (this.itemNum - 1) * 10,
        });
        for (var i = 0; i < this.itemNum; i++) {
            this.$indicator.append($('<li />', {'data-place': i, class: i === 0 ? 'active' : '', css: {left: i * 30}}));
        }
        //ie8对 nth-child兼容解决
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
            this.$indicator.find('li').each(function (index) {
                $(this).css({'left': 30 * index, 'background': 'rgb(204,204,204)'});
            });
        }
        //载入页面启动轮播
        if (this.$carousel.length > 0 && this.itemNum > 4) {//判断是否存在巨型轮播
            this.INIT = setInterval(this.along.bind(this), 5000);
            this.addEvent();
        }
    },
    numRule: function (num) {//下标数字规范:下标范围0-indexMax
        if (num > this.indexMax) {
            return num - this.indexMax - 1;
        }
        else if (num < 0) {
            return num + this.indexMax + 1;
        }
        else {
            return num;
        }
    },
    calculation: function (nowPlace) {//指示器事件计算跳转差值differ
        this.beforePlace = parseInt(this.$indicator.find('.active').attr('data-place'));
        var differ = nowPlace - this.beforePlace;
        if (differ === -this.indexMax) {
            differ = 1;
        }
        else if (differ === this.indexMax) {
            differ = -1;
        }
        if (differ !== 0) {
            if (differ === 1) {//正向移一个
                this.along();
            }
            else if (differ === -1) {//反向移一个
                this.back();
            }
            else {//跳跃性的移动
                this.jump(differ);
            }
        }
    },
    along: function () {//正向轮播
        //当前下标位置及样式清除
        this.beforePlace = parseInt(this.$indicator.find('.active').attr('data-place'));
        this.$indicator.find('li').eq(this.beforePlace).removeClass('active');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace - 2)).removeClass('bottom').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace - 1)).removeClass('middle moveLeft').css('animation', 'unset');
        this.$msg.find('.item').eq(this.beforePlace).removeClass('top').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace + 1)).removeClass('middle moveRight').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace + 2)).removeClass('bottom').css('animation', 'unset');
        //动作后下标位置及样式添加
        this.nowPlace = this.numRule(this.beforePlace + 1);
        this.$indicator.find('li').eq(this.nowPlace).addClass('active');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace - 2))
            .css('animation', 'leaveLeft .4s ease')
            .css('-moz-animation', 'leaveLeft .4s ease')
            .css('-webkit-animation', 'leaveLeft .4s ease')
            .css('-o-animation', 'leaveLeft .4s ease').addClass('bottom');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace - 1)).addClass('middle')
            .css('animation', 'moveLeft .4s ease')
            .css('-moz-animation', 'moveLeft .4s ease')
            .css('-webkit-animation', 'moveLeft .4s ease')
            .css('-o-animation', 'moveLeft .4s ease').addClass('moveLeft');
        this.$msg.find('.item').eq(this.nowPlace).addClass('top')
            .css('animation', 'topLeft .4s ease')
            .css('-moz-animation', 'topLeft .4s ease')
            .css('-webkit-animation', 'topLeft .4s ease')
            .css('-o-animation', 'topLeft .4s ease');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace + 1)).addClass('middle')
            .css('animation', 'moveRight .4s ease')
            .css('-moz-animation', 'moveRight .4s ease')
            .css('-webkit-animation', 'moveRight .4s ease')
            .css('-o-animation', 'moveRight .4s ease').addClass('moveRight');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace + 2)).addClass('bottom');
    },
    back: function () {//反向轮播
        //当前下标位置及样式清除
        this.beforePlace = parseInt(this.$indicator.find('.active').attr('data-place'));
        this.$indicator.find('li').eq(this.beforePlace).removeClass('active');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace - 2)).removeClass('bottom').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace - 1)).removeClass('middle moveLeft').css('animation', 'unset');
        this.$msg.find('.item').eq(this.beforePlace).removeClass('top').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace + 1)).removeClass('middle moveRight').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace + 2)).removeClass('bottom').css('animation', 'unset');
        //动作后下标位置及样式添加
        this.nowPlace = this.numRule(this.beforePlace - 1);
        this.$indicator.find('li').eq(this.nowPlace).addClass('active');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace - 2)).addClass('bottom');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace - 1)).addClass('middle')
            .css('animation', 'moveLeft .4s ease')
            .css('-moz-animation', 'moveLeft .4s ease')
            .css('-webkit-animation', 'moveLeft .4s ease')
            .css('-o-animation', 'moveLeft .4s ease').addClass('moveLeft');
        this.$msg.find('.item').eq(this.nowPlace).addClass('top')
            .css('animation', 'topRight .4s ease')
            .css('-moz-animation', 'topRight .4s ease')
            .css('-webkit-animation', 'topRight .4s ease')
            .css('-o-animation', 'topRight .4s ease');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace + 1)).addClass('middle')
            .css('animation', 'moveRight .4s ease')
            .css('-moz-animation', 'moveRight .4s ease')
            .css('-webkit-animation', 'moveRight .4s ease')
            .css('-o-animation', 'moveRight .4s ease').addClass('moveRight');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace + 2))
            .css('animation', 'leaveRight .4s ease')
            .css('-moz-animation', 'leaveRight .4s ease')
            .css('-webkit-animation', 'leaveRight .4s ease')
            .css('-o-animation', 'leaveRight .4s ease').addClass('bottom');
    },
    jump: function (num) {//跳转情况
        //当前下标位置及样式清除
        this.beforePlace = parseInt(this.$indicator.find('.active').attr('data-place'));
        this.$indicator.find('li').eq(this.beforePlace).removeClass('active');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace - 2)).removeClass('bottom').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace - 1)).removeClass('middle moveLeft').css('animation', 'unset');
        this.$msg.find('.item').eq(this.beforePlace).removeClass('top').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace + 1)).removeClass('middle moveRight').css('animation', 'unset');
        this.$msg.find('.item').eq(this.numRule(this.beforePlace + 2)).removeClass('bottom').css('animation', 'unset');
        //动作后下标位置及样式添加
        this.nowPlace = this.numRule(this.beforePlace + num);
        this.$indicator.find('li').eq(this.nowPlace).addClass('active');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace - 2))
            .css('animation', 'leaveLeft .4s ease')
            .css('-moz-animation', 'leaveLeft .4s ease')
            .css('-webkit-animation', 'leaveLeft .4s ease')
            .css('-o-animation', 'leaveLeft .4s ease').addClass('bottom');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace - 1)).addClass('middle')
            .css('animation', 'moveLeft .4s ease')
            .css('-moz-animation', 'moveLeft .4s ease')
            .css('-webkit-animation', 'moveLeft .4s ease')
            .css('-o-animation', 'moveLeft .4s ease').addClass('moveLeft');
        this.$msg.find('.item').eq(this.nowPlace).addClass('top')
            .css('animation', 'topJump .4s ease')
            .css('-moz-animation', 'topJump .4s ease')
            .css('-webkit-animation', 'topJump .4s ease')
            .css('-o-animation', 'topJump .4s ease');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace + 1)).addClass('middle')
            .css('animation', 'moveRight .4s ease')
            .css('-moz-animation', 'moveRight .4s ease')
            .css('-webkit-animation', 'moveRight .4s ease')
            .css('-o-animation', 'moveRight .4s ease').addClass('moveRight');
        this.$msg.find('.item').eq(this.numRule(this.nowPlace + 2))
            .css('animation', 'leaveRight .4s ease')
            .css('-moz-animation', 'leaveRight .4s ease')
            .css('-webkit-animation', 'leaveRight .4s ease')
            .css('-o-animation', 'leaveRight .4s ease').addClass('bottom');
    },
    addEvent: function () {//添加事件
        //鼠标放上轮播时暂停,鼠标离开轮播时开始
        this.$carousel.on({
            'mouseenter': function () {
                clearInterval(this.INIT);
            }.bind(this),
            'mouseleave': function () {
                this.INIT = setInterval(this.along.bind(this), 5000);
            }.bind(this)
        });
        //上一个下一个按钮事件
        this.$prv.on('click', this.back.bind(this));
        this.$next.on('click', this.along.bind(this));
        //指示器鼠标放上事件
        this.$indicator.on('mouseenter', 'li', function (event) {
            var it = event.currentTarget;//当前对象
            this.calculation(parseInt($(it).attr('data-place')));
        }.bind(this));
    }
};