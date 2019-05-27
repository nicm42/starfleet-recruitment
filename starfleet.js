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

const leftArrowImage = document.getElementById('left-arrow-img');
const rightArrowImage = document.getElementById('right-arrow-img');

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
	if(!isInViewport(command)){
		for(var i=0; i<carousel.length; i++){
			pathOffset[i] += 235;
			carousel[i].style.left = pathOffset[i] + "px";
		}
	}
	//if command is now visible, disable left arrow
	if(isInViewport(command)){
		leftArrow.removeEventListener('click',moveLeft);
		leftArrow.style.cursor = 'auto';
		leftArrowImage.src = "./images/leftarrow-deactivated.png";
	}
	//if security is now invisible, enable right arrow
	if(!isInViewport(security)){
		rightArrow.addEventListener('click', moveRight);
		rightArrow.style.cursor = 'pointer';
		rightArrowImage.src = "./images/rightarrow.png";
	}
}

function moveRight(){
	if(!isInViewport(security)){
		for(var i=0; i<carousel.length; i++){
			var forced = carousel[i].scrollLeft; // Forces a redraw - doesn't work!
			pathOffset[i] -= 235;
			carousel[i].style.left = pathOffset[i] + "px";
		}
	}
	var forced = carousel[0].scrollLeft; // Forces a redraw - doesn't work!
	//if security is now visible, disable right arrow
	if(isInViewport(security)){
		rightArrow.removeEventListener('click',moveRight);
		rightArrow.style.cursor = 'auto';
		rightArrowImage.src = "./images/rightarrow-deactivated.png";
	}
	//if command is now invisible, enable left arrow
	if(!isInViewport(command)){
		leftArrow.addEventListener('click', moveLeft);
		leftArrow.style.cursor = 'pointer';
		leftArrowImage.src = "./images/leftarrow.png";
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

/* Form */
const submit = document.getElementById('submit');
const brocureForm = document.getElementById('brochure-form');
const submittedForm = document.getElementById('submitted-form');
submit.addEventListener('click', submitForm);

function submitForm(){
	brocureForm.style.visibility = "hidden";
	submittedForm.style.visibility = "visible";
}