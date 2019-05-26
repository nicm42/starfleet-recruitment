/* Menu */
const menuHeader = document.getElementById('menu-header');
const menu = document.getElementById('menu');
menuHeader.addEventListener('click', toggleMenu);
menu.addEventListener('click', toggleMenu);

function toggleMenu(){
	menu.classList.toggle('hide');
	menu.classList.toggle('show');
}

/* Carousel */
const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');

const command = document.getElementById('command');  //left-most career path
const security = document.getElementById('security');  //right-most career path

let carousel = document.getElementsByClassName('carousel');
let pathOffset = [];
for(var i=0; i<carousel.length; i++){
	pathOffset[i] = 0;
}

leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);

function moveLeft(){
	//if Command is at position left <= 15 then disable left arrow
	let commandPosition = offset(command);
	let commandLeft = commandPosition.left;
	//if command is visible, disable left arrow
	if(isInViewport(command)){
		leftArrow.removeEventListener('click',moveLeft);
		leftArrow.style.cursor = 'auto';
	}else{
		for(var i=0; i<carousel.length; i++){
			pathOffset[i] += 235;
			carousel[i].style.left = pathOffset[i] + "px";
		}		
	}
	//if security is invisible, enable right arrow
	if(!isInViewport(security)){
		rightArrow.addEventListener('click', moveRight);
		rightArrow.style.cursor = 'pointer';
	}
}

function moveRight(){
	//if security is visible, disable right arrow
	if(isInViewport(security)){
		rightArrow.removeEventListener('click',moveLeft);
		rightArrow.style.cursor = 'auto';
	}else{
		for(var i=0; i<carousel.length; i++){
			pathOffset[i] -= 235;
			carousel[i].style.left = pathOffset[i] + "px";
		}
	}
	//if command is invisible, enable right arrow
	if(!isInViewport(command)){
		leftArrow.addEventListener('click', moveLeft);
		leftArrow.style.cursor = 'pointer';
	}
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

/*!
 * Determine if an element is in the viewport
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}    elem The element
 * @return {Boolean}      Returns true if element is in the viewport
 */
var isInViewport = function (elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};