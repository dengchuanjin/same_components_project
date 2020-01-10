function getEl(str) {
	return document.querySelector(str);
}


var imageList = getEl(".imageList");
var imgPicture = getEl("#imgPicture");
var iamgeW = imgPicture.clientWidth;
var translateZ = iamgeW / (2*Math.PI);
console.log(iamgeW)

