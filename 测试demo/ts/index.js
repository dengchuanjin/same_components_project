//元素拖拽
function drag(str) {
    //初始化数据
    var data = {
        el: ''
    };
    //方法集合
    var methods = {
        //获取元素
        getEl: function (str) {
            return document.querySelector(str);
        },
        //拖拽
        dragFn: function (el) {
            var pEl = el.parentNode;
            var pW = pEl.clientWidth;
            var pH = pEl.clientHeight;
            var elW = el.clientWidth;
            var elH = el.clientHeight;
            var arr = [];
            var mX, mY, nX, nY, timer;
            var minL = 0;
            var minT = 0;
            var maxL = pW - elW;
            var maxT = pH - elH;
            //拖动函数
            function move(ev) {
                var e = ev || window.event;
                e.preventDefault();
                nX = e.pageX - mX;
                nY = e.pageY - mY;
                arr.push({ x: nX, y: nY });
                el.style.top = nY + 'px';
                el.style.left = nX + 'px';
            }
            el.addEventListener("mousedown", function (ev) {
                var e = ev || window.event;
                e.preventDefault();
                mX = e.pageX - el.offsetLeft;
                mY = e.pageY - el.offsetTop;
                document.addEventListener('mousemove', move, false);
            }, false);
            el.addEventListener("mouseup", function () {
                document.removeEventListener('mousemove', move);
                // if( arr.length ) {
                // 	let point1 = arr[arr.length-1];
                // 	let point2 = arr[arr.length-2];
                // 	let point = {
                // 		x: point1.x - point2.x,
                // 		y: point1.y - point2.y
                // 	}
                // 	animationFn(point);
                // }
            }, false);
            //缓冲动画
            function animationFn(obj) {
                var sX = obj.x;
                var sTimer = setInterval(function () {
                    var n = Math.ceil(sX * .2);
                    console.log(n);
                    sX -= n;
                    el.style.left = nX + n + 'px';
                    if (sX <= 0) {
                        clearInterval(sTimer);
                    }
                }, 30);
            }
        }
    };
    for (var attr in data) {
        this[attr] = data[attr];
    }
    for (var attr in methods) {
        this[attr] = methods[attr];
    }
    this.el = this.getEl(str);
    this.dragFn(this.el);
}
new drag('.drag');
