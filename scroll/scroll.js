
window.onload = function(){
    var $element = document.querySelector('.scroll-content');
    Scroll.start($element,{position:4,range:20});
    var ul = document.querySelector('.scroll-content ul');
    var li = ul.innerHTML;
    
    // var i = 0
    // setInterval(function(){
    //     var _i = i + 1;
    //     li = li.replace(i + '</li>', _i + '</li>')
    //     ul.innerHTML = ul.innerHTML + li;
    //     i++
    // },100)

}
Math.format = function(number,type){
    type && (number = parseInt(number));
    var money1 = new Number(number);
    if (money1 > 1000000000000000000 || money1 < 0) {
        return;
    }
    var monee = Math.round(money1 * 100).toString(10)
    var i, j;
    j = 0;
    var leng = monee.length;
    var monval = "";
    for (i = 0; i < leng; i++) {
        monval = monval + to_upper(monee.charAt(i)) + to_mon(leng - i - 1,type);
    }
    return repace_acc(monval,type);

    function to_upper(a) {
        switch (a) {
            case '0': return '零';
            case '1': return '壹';
            case '2': return '贰';
            case '3': return '叁';
            case '4': return '肆';
            case '5': return '伍';
            case '6': return '陆';
            case '7': return '柒';
            case '8': return '捌';
            case '9': return '玖';
            default: return '';
        }
    }
    function to_mon(a,type) {
        if (a > 10) {
            a = a - 8;
            return (to_mon(a));
        }
        switch (a) {
            case 0: return type?'':'分';
            case 1: return type?'':'角';
            case 2: return type || '元';
            case 3: return '拾';
            case 4: return '佰';
            case 5: return '仟';
            case 6: return '万';
            case 7: return '拾';
            case 8: return '佰';
            case 9: return '仟';
            case 10: return '亿';
        }
    }

    function repace_acc(Money,type) {
        Money = Money.replace("零分", "");
        Money = Money.replace("零角", "零");
        var yy;
        var outmoney;
        outmoney = Money;
        yy = 0;
        while (true) {
            var lett = outmoney.length;
            if(type){
                outmoney = outmoney.replace("零"+type, type);
            }else{
                outmoney = outmoney.replace("零元", "元");
            }
            outmoney = outmoney.replace("零万", "万");
            outmoney = outmoney.replace("零亿", "亿");
            outmoney = outmoney.replace("零仟", "零");
            outmoney = outmoney.replace("零佰", "零");
            outmoney = outmoney.replace("零零", "零");
            outmoney = outmoney.replace("零拾", "零");
            outmoney = outmoney.replace("亿万", "亿零");
            outmoney = outmoney.replace("万仟", "万零");
            outmoney = outmoney.replace("仟佰", "仟零");
            yy = outmoney.length;
            if (yy == lett) break;
        }
        yy = outmoney.length;
        if (outmoney.charAt(yy - 1) == '零') {
            outmoney = outmoney.substring(0, yy - 1);
        }
        yy = outmoney.length;
        if (!type && outmoney.charAt(yy - 1) == '元') {
            outmoney = outmoney + '整';
        }
        return outmoney
    }
}

/**
 * 自定义滚动条
 * 
 * @param {any} $element 容器
 * @param {any} position 1上 2下 3左 4右
 */
function Scroll($element,config){
    this.event = {};
    this.range = config.range || 10;
    this.$element = $element;
    this.$content = this.$element.firstElementChild;
    this.$content.style.position = 'absolute'
    this.boxHeight = $element.clientHeight;//容器高度
    this.maxHeight = this.$content.clientHeight;//需滚动的高度
    this.proportion = +(this.boxHeight/this.maxHeight);//比例
    this.position = config.position || 4;
    this.init();
}

Scroll.start = function($element,config){
    var startEvent = 'mouseover';
    var endEvent = 'mouseleave';

    var scroll;
    if(navigator.userAgent.match(/.*Mobile.*/)){
        startEvent = 'touchstart';
        endEvent = 'touchend';
        scroll = new Scroll($element);
    };
    $element.addEventListener(startEvent,function(e){
        if(!scroll){
            scroll = new Scroll($element,config);
        }else{
            if(scroll.initHeight())return;
            scroll.btnShow();
            // var _setInterval = scroll.$setInterval$ = setInterval(function(){
            //     if(scroll){
            //         var maxHeight = scroll.maxHeight;
            //         var _maxHeight = scroll.$content.clientWidth;
            //         if(maxHeight != _maxHeight){
            //             scroll.initHeight();
            //         }
            //     }
            // },500)
        }
    });
    $element.addEventListener(endEvent,function(e){
        if(scroll && !scroll.move){
            scroll.btnHide();
            // scroll.$setInterval$ && clearInterval(scroll.$setInterval$);
        }
        scroll.callback = function(){
            scroll.btnHide()
        }
    });
}

Scroll.prototype = {
    btnShow:function(){
        var _this = this;
        var $btn = _this.$btn;
        $btn.classList.remove('fadeOut');
        $btn.style.display = 'block';
        $btn.classList.add('animated','fadeIn');
    },
    btnHide:function(){
        var _this = this;
        var $btn = _this.$btn;
        $btn.classList.remove('fadeIn');
        $btn.classList.add('fadeOut');
        setTimeout(function() {
            $btn.style.display = 'none';
        }, 150);
    },
    destroy:function(){
        var _this = this;
        var $content = _this.$content;
        var $btn = _this.$btn;
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
        $content.removeEventListener(mousewheelevt,_this.event.content_mousewheelevt);
        $btn.removeEventListener('mousedown',_this.event.btn_mousedown);
        document.removeEventListener('mousemove',_this.event.document_mousemove);
        $btn.removeEventListener('touchstart',_this.event.btn_touchstart);
        document.removeEventListener('touchmove',_this.event.document_touchmove);
        document.removeEventListener('touchend',_this.event.document_touchend);
        $content.removeEventListener('touchstart',_this.event.content_touchstart);
        $content.removeEventListener('touchmove',_this.event.content_touchmove);
        $content.removeEventListener('touchend',_this.event.content_touchend);
        _this.btnHide();
    },
    pcInit:function(){
        var $content = this.$content;
        var $btn = this.$btn;

        var _this = this;
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

        _this.event.content_mousewheelevt = function(e){
            e.preventDefault();
            e.stopPropagation();
            _this.range = 10;
            var d = e.wheelDelta || -e.detail;
            _this.slide(d > 0);
        }
        $content.addEventListener(mousewheelevt,_this.event.content_mousewheelevt);

        _this.event.btn_mousedown = function(e){
            e.stopPropagation();
            e.preventDefault();
            _this.x = e.clientX;
            _this.y = e.clientY;
        }
        $btn.addEventListener('mousedown',_this.event.btn_mousedown);

        _this.event.document_mousemove = function(e){
            e.stopPropagation();
            e.preventDefault();
            if(e.buttons == 1){
                var x = e.clientX;
                var y = e.clientY;
                var oldY = _this.y;
                if(y == oldY){return};
                var bo = y - oldY < 0;
                _this.range = _this.y - y;
                _this.slide(true);
                _this.y = y;
            }
        }
        document.addEventListener('mousemove',_this.event.document_mousemove);
    },
    mobileInit:function(){
        var _this = this;
        var $content = this.$content;
        var $btn = this.$btn;
        this.range = 2;

        _this.event.btn_touchstart = function(e){
            e.stopPropagation();
            e.preventDefault();
            var touchstart = e.changedTouches;
            if(touchstart && touchstart.length == 1){
                var touch = touchstart[0];
                _this.dragging = true;
                _this.x = touch.clientX;
                _this.y = touch.clientY;
            }
        }
        $btn.addEventListener('touchstart',_this.event.btn_touchstart);

        _this.event.document_touchmove = function(e){
            e.stopPropagation();
            e.preventDefault();
            if(!_this.dragging){return};
            var touchmove = e.changedTouches;
            if(touchmove && touchmove.length == 1){
                var touch = touchmove[0];
                var x = touch.clientX;
                var y = touch.clientY;
                if(y == _this.y){return};
                _this.range = _this.y - y;
                _this.slide(true);
                _this.y = y;
            }
        }

        document.addEventListener('touchmove',_this.event.document_touchmove);

        _this.event.document_touchend = function(e){
            _this.dragging = false;
        }
        document.addEventListener('touchend',_this.event.document_touchend)

        _this.event.content_touchstart = function(e){
            // e.stopPropagation();
            e.preventDefault();
            _this.move && _this.move.$setInterval && clearInterval(_this.move.$setInterval);
            var touchstart = e.changedTouches;
            if(touchstart && touchstart.length == 1){
                var touch = touchstart[0];
                var x = touch.clientX;
                var y = touch.clientY;
                _this.move = new MovePoint(x,y);
                _this.move.time = e.timeStamp
            }
        }
        $content.addEventListener('touchstart',_this.event.content_touchstart);

        _this.event.content_touchmove = function(e){
            if(!_this.move){return};
            var touchmove = e.changedTouches;
            if(touchmove && touchmove.length == 1){
                var touch = touchmove[0];
                var x = touch.clientX;
                var y = touch.clientY;

                this.range = 2;
                
                var path = _this.move.move(x,y)*180/Math.PI;
                var direction = _this.move.path(path);
                _this.move.direction = direction;
                if(direction == 1){
                    _this.slide(false)
                }else if(direction == 2){
                    _this.slide(true)
                }
                _this.move.x = x;
                _this.move.y = y;
            }
        }
        $content.addEventListener('touchmove',_this.event.content_touchmove);

        _this.event.content_touchend = function(e){
            if(!_this.move){return};
            var touchend = e.changedTouches;
            if(touchend && touchend.length == 1){
                var touch = touchend[0];
                var x = touch.clientX;
                var y = touch.clientY;
                var speed = _this.move.speed(e.timeStamp,x,y);
                if(speed > 0.8 && _this.$last == false){
                    _this.range = Math.floor(6*speed);
                    var $setInterval = _this.move.$setInterval = setInterval(function(){
                        var bo = false;
                        if(_this.move.direction == 1){
                            bo = false;
                        }else if((_this.move.direction == 2)){
                            bo = true;
                        }
                        _this.slide(bo,function(){
                            _this.$last = true;
                        });
                        _this.range = _this.range - 0.5;
                        if(_this.range < 0 || _this.$last){
                            clearInterval($setInterval);
                            _this.callback && _this.callback();
                            _this.range = 2;
                            _this.move = null;
                        }
                    },20)
                }else{
                    _this.move = null;
                }
            }
        }
        $content.addEventListener('touchend',_this.event.content_touchend);
    },
    initHeight:function(){
        var position = this.position;
        
        switch (+position) {
            case 1:
            case 2:
            this.boxHeight = this.$element.clientWidth;//容器高度
            this.maxHeight = this.$content.clientWidth;//需滚动的高度

            this.proportion = +(this.boxHeight/this.maxHeight);//比例
            var btnHeight = +(this.boxHeight*this.proportion);
            if(btnHeight < 20){
                btnHeight = 20;
            }
            this.btnHeight = btnHeight;

            this.$btn.style.height = '8px';
            this.$btn.style.width = this.btnHeight + 'px';
            break;
            case 3:
            case 4:
            default:
            this.boxHeight = this.$element.clientHeight;//容器高度
            this.maxHeight = this.$content.clientHeight;//需滚动的高度

            this.proportion = +(this.boxHeight/this.maxHeight);//比例
            var btnHeight = +(this.boxHeight*this.proportion);
            if(btnHeight < 20){
                btnHeight = 20;
            }
            this.btnHeight = btnHeight;

            this.$btn.style.height = this.btnHeight + 'px';
            this.$btn.style.width = '8px';
            break;
        }
        return this.proportion >= 1;
    },
    location:function(){//1上 2下 3左 4右
        var position = this.position;
        var $scroll = this.$scroll;
        var $btn = this.$btn;
        switch (+position) {
            case 1:
                // $scroll.classList.add('scroll-position-1');
                $btn.classList.add('scroll-position-1');
            break;
            case 2:
                // $scroll.classList.add('scroll-position-2');
                $btn.classList.add('scroll-position-2');
            break;
            case 3:
                // $scroll.classList.add('scroll-position-3');
                $btn.classList.add('scroll-position-3');
            break;
            case 4:
                // $scroll.classList.add('scroll-position-4');
                $btn.classList.add('scroll-position-4');
            break;
            default:
                // $scroll.classList.add('scroll-position-4');
                $btn.classList.add('scroll-position-4');
                break;
        }
    },
    init:function(){
        //创建必要元素
        // var $scroll = document.createElement('div');
        // $scroll.classList.add('scroll');
        // this.$element.appendChild($scroll);
        // this.$scroll = $scroll;
        this.$content.style.position = 'absolute'
        var $btn = document.createElement('div');
        $btn.classList.add('scroll-btn');
        this.$element.appendChild($btn);
        this.$btn = $btn;
        this.location();
        this.addEvent();
        if(this.initHeight())return;//计算高度
        this.btnShow();//展现滚轮
        
    },
    addEvent:function(){
        //初始化事件
        if(navigator.userAgent.match(/.*Mobile.*/)){
            this.mobileInit();
        }else{
            this.pcInit();
        }
    },
    slide:function(bo,callback){
        var position = this.position;
        var $position = 'left';
        switch (+position) {
            case 1:
            case 2:
            $position = 'left';
            break;
            case 3:
            $position = 'top';
            break;
            case 4:
            $position = 'top';
            break;
            default:
            $position = 'top';
                break;
        }

        var $content = this.$content;//内容
        var $btn = this.$btn;//按钮

        var btnTop = +$btn.style[$position].replace(/px/ig,'');
        var contentTop = +$content.style[$position].replace(/px/ig,'');

        var rangeHeight = this.range/this.proportion;//内容滑动的高度
        var boxHeight = this.boxHeight;
        var btnHeight = this.btnHeight;
        var maxHeight = this.maxHeight;
        var range = this.range;

        this.$last = false;//是否滚到最后或开始

        if(bo){
            btnTop = btnTop - range;
            if(btnTop < 0){
                btnTop = 0;
            }
            if(btnTop > (boxHeight - btnHeight)){
                btnTop = boxHeight - btnHeight
            }
            contentTop = contentTop + rangeHeight;
            if(contentTop > 0){
                contentTop = 0;
                this.$last = true;
            }
            if(Math.abs(contentTop) > (maxHeight - boxHeight)){
                contentTop = (boxHeight - maxHeight);
                this.$last = true;
            }
            $btn.style[$position] = btnTop + 'px';
            $content.style[$position] = contentTop + 'px';
        }else{
            btnTop = btnTop + range;
            if(btnTop > (boxHeight - btnHeight)){
                btnTop = boxHeight - btnHeight
            }
            contentTop = contentTop - rangeHeight;
            if(Math.abs(contentTop) > (maxHeight - boxHeight)){
                contentTop = boxHeight - maxHeight
                this.$last = true;
            }
            $btn.style[$position] = btnTop + 'px';
            $content.style[$position] = contentTop + 'px';
        }
    }
}

//移动端 手势移动方向
function MovePoint(x,y) {
    this.x = x;
    this.oldX = x;
    this.y = y;
    this.oldY = y;
}
MovePoint.prototype = {
    move:function(x, y){
        return Math.atan2(y-this.y,x-this.x);
    },
    //1向上 2向下 3向左 4向右 0未滑动
    path:function (path) {
        if (path >= -135 && path <= -45) {
            return 1;
        } else if (path > 45 && path < 135) {
            return 2;
        } else if ((path >= 135 && path <= 180) || (path >= -180 && path < -135)) {
            return 3;
        } else if (path >= -45 && path <= 45) {
            return 4;
        }
    },
    speed:function(time,x,y){//速度
        var x = Math.abs(this.oldX - x);
        var y = Math.abs(this.oldY - y);
        var p = Math.pow(x,2) + Math.pow(y,2);
        return Math.sqrt(p)/(time-this.time);
    }
}