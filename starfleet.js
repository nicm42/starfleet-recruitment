const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');

leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);

let carousel = document.getElementsByClassName('carousel');

function moveLeft(){
	for(var path of carousel){
		//path.classList.add('moveLeft');
		let pathOffset = offset(path);
		newLeft = pathOffset.left - 235;
		console.log(newLeft);
		//path.style.left = newLeft;
		path.style.transform = "translateX("+newLeft+"px)";
	}
}

function moveRight(){
	for(var path of carousel){
		//path.classList.add('moveRight');
		//let pathOffset = offset(path);
		//newRight = pathOffset.left + 235;
		//path.style.left = newRight;
		path.style.transform = "translateX(235px)";
	}
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}