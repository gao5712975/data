/**
 * Created by moka on 2016/11/8.
 */
var app = angular.module('app',[]);

app.directive('ycText',[function () {
    return {
        restrict: 'A',
        templateUrl:'temp.html',
        link:function(scope, element, attrs){

        }
    }
}])


app.directive('ycScroll',[function () {
    return {
        restrict: "A",
        link:function(scope, element, attrs){
            var $element = element[0];
            var width = 'width:' + (attrs.width || 0) + 'px;';
            var height = 'height:' + (attrs.height || 0) + 'px;';
            $element.style.cssText = 'position: absolute;top: 0;bottom: 0;overflow: hidden;' + width + height;
            var $content = $element.firstElementChild;
            $content.style.cssText = 'position: absolute;';
            var $scroll = document.createElement('div');
            var $scrollBtn = document.createElement('div');

            $scroll.classList.add('scroll');
            $scrollBtn.classList.add('scroll-btn');
            $element.appendChild($scrollBtn);
            $element.appendChild($scroll);

            var boxHeight = $element.clientHeight;
            var maxHeight = $content.clientHeight;

            var proportion =  +(boxHeight/maxHeight);//比例

            var btnHeight = +(boxHeight*proportion);

            $scrollBtn.style.height = btnHeight + 'px';

            var range = 10;

            function slide(bo,content,btn,range,proportion) {
                var btnTop = +btn.style.top.replace(/px/ig,'');
                var contentTop = +content.style.top.replace(/px/ig,'');
                if(bo){
                    btnTop = btnTop - range;
                    if(btnTop < 0){
                        btnTop = 0;
                    }
                    contentTop = contentTop + range/proportion;
                    if(contentTop > 0){
                        contentTop = 0;
                    }
                    btn.style.top = btnTop + 'px';
                    content.style.top = contentTop + 'px';
                }else{
                    btnTop = btnTop + range;
                    if(btnTop > (boxHeight - btnHeight)){
                        btnTop = boxHeight - btnHeight
                    }
                    contentTop = contentTop - range/proportion;
                    if(Math.abs(contentTop) > (maxHeight - boxHeight)){
                        contentTop = boxHeight - maxHeight
                    }
                    btn.style.top = btnTop + 'px';
                    content.style.top = contentTop + 'px';
                }
            }

            function MovePoint(x,y) {
                this.x = x;
                this.y = y;
            }
            MovePoint.prototype.move = function (x, y) {
                return Math.atan2(y-this.y,x-this.x);
            };
            //1向上 2向下 3向左 4向右 0未滑动
            MovePoint.prototype.path = function (path) {
                if (path >= -135 && path <= -45) {
                    return 1;
                } else if (path > 45 && path < 135) {
                    return 2;
                } else if ((path >= 135 && path <= 180) || (path >= -180 && path < -135)) {
                    return 3;
                } else if (path >= -45 && path <= 45) {
                    return 4;
                }
            };

            var dragging = false;
            var oldX = 0;
            var oldY = 0;
            if(navigator.userAgent.match(/.*Mobile.*/)){
                $scrollBtn.addEventListener('touchstart',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.info(e.changedTouches[0]);
                    var touchstart = e.changedTouches;
                    if(touchstart && touchstart.length == 1){
                        var touch = touchstart[0];
                        dragging = true;
                        oldX = touch.clientX;
                        oldY = touch.clientY;
                    }
                });
                document.addEventListener('touchmove',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if(!dragging){return};
                    var touchmove = e.changedTouches;
                    if(touchmove && touchmove.length == 1){
                        var touch = touchmove[0];
                        var x = touch.clientX;
                        var y = touch.clientY;
                        if(y == oldY){return};
                        var bo = y-oldY < 0;
                        // console.info(touch)
                        console.info(y-oldY)
                        slide(bo,$content,$scrollBtn,Math.abs(y-oldY),proportion);
                        oldY = y;
                    }
                });
                document.addEventListener('touchend',function (e) {
                    dragging = false;
                })
            }else{
                $scrollBtn.addEventListener('mousedown',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    dragging = true;
                    oldY = e.clientY;
                    oldX = e.clientX;
                });
                document.addEventListener('mousemove',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if(dragging && e.buttons == 1){
                        var x = e.clientX;
                        var y = e.clientY;
                        if(y == oldY){return};
                        var bo = y-oldY < 0;
                        if(bo){
                            slide(bo,$content,$scrollBtn,oldY-y,proportion);
                        }else{
                            slide(bo,$content,$scrollBtn,y-oldY,proportion);
                        }
                        oldY = y;
                    }
                });
                document.addEventListener('mouseup',function (e) {
                    dragging = false;
                });
            }

            /**
             * touchstart:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
             touchmove:当手指在屏幕上滑动时连续的触发。在这个事件发生期间，调用preventDefault()可阻止滚动。
             touchend:当手指从屏幕上移开时触发。
             touchcancel:当系统停止跟踪触摸时触发。关于此事件的确切触发事件，文档中没有明确说明。
             */
            if(navigator.userAgent.match(/.*Mobile.*/)){
                var move;
                $element.addEventListener('touchstart',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var touchstart = e.changedTouches;
                    if(touchstart && touchstart.length == 1){
                        var touch = touchstart[0];
                        var x = touch.clientX;
                        var y = touch.clientY;
                        move = new MovePoint(x,y);
                    }
                })
                $element.addEventListener('touchmove',function (e) {
                    if(!move){return};
                    if(dragging){return};
                    var touchmove = e.changedTouches;
                    if(touchmove && touchmove.length == 1){
                        var touch = touchmove[0];
                        var x = touch.clientX;
                        var y = touch.clientY;

                        var path = move.move(x,y)*180/Math.PI;
                        console.info(move.path(path));
                        var direction = move.path(path);
                        if(direction == 1){
                            slide(false,$content,$scrollBtn,range/5,proportion)
                        }else if(direction == 2){
                            slide(true,$content,$scrollBtn,range/5,proportion)
                        }
                        move.x = x;
                        move.y = y;
                    }
                });
                $element.addEventListener('touchend',function (e) {
                    move = null;
                })
            }else{
                var mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";//火狐SB
                $element.addEventListener(mousewheelevt,function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var d = e.wheelDelta || -e.detail;
                    slide(d > 0,$content,$scrollBtn,range,proportion)
                })
            }
        }
    }
}]);

