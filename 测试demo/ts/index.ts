//元素拖拽
function drag(str: string) {
	//初始化数据
	let data = {
		el: ''
	}
	
	//方法集合
	let methods = {
		//获取元素
		getEl(str: string) {
			return document.querySelector(str);
		},
		//拖拽
		dragFn(el: any) {
			let pEl = el.parentNode;
			let pW = pEl.clientWidth;
			let pH = pEl.clientHeight;
			
			let elW = el.clientWidth;
			let elH = el.clientHeight;
			
			let arr = [];
			let mX, mY, nX, nY, timer;
			
			let minL = 0;
			let minT = 0;
			let maxL = pW - elW;
			let maxT = pH - elH;
						
			//拖动函数
			function move(ev) {
				let e = ev || window.event;
				e.preventDefault();
				nX = e.pageX - mX;
				nY = e.pageY - mY;
				arr.push({x: nX, y: nY});
				el.style.top = nY + 'px';
				el.style.left = nX + 'px';
			}
			
			el.addEventListener("mousedown", function(ev){
				let e = ev || window.event;
				e.preventDefault();
				mX = e.pageX - el.offsetLeft;
				mY = e.pageY - el.offsetTop;
				document.addEventListener('mousemove', move, false);
			}, false);
			
			el.addEventListener("mouseup", function() {
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
			function animationFn(obj: any) {
				let sX = obj.x;
				let sTimer = setInterval(() => {
					let n = Math.ceil(sX * .2);
					console.log(n)
					sX -= n;
					el.style.left = nX + n + 'px';
					if( sX <= 0 ) {
						clearInterval(sTimer);
					}
				}, 30)
			}
		},
	}
	
	for( let attr in data ) {
		this[attr] = data[attr];
	}
	
	for( let attr in methods ) {
		this[attr] = methods[attr];
	}
	
	this.el = this.getEl(str);
	this.dragFn(this.el);
}

new drag('.drag');

