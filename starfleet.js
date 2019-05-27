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
	//disable left arrow temporarily, so it's not possible to go mad clicking on it
	leftArrow.removeEventListener('click',moveRight);
	//re-enable it after transition has finished (it takes 1s)
	setTimeout(enableLeftArrow, 1000);
	if(!isInViewport(command)){
		moveArrow(leftArrow);
		for(var i=0; i<carousel.length; i++){
			pathOffset[i] += 235;
			carousel[i].style.left = pathOffset[i] + "px";
		}
	}
}

function moveRight(){
	//disable right arrow temporarily, so it's not possible to go mad clicking on it
	rightArrow.removeEventListener('click',moveRight);
	//re-enable it after transition has finished (it takes 1s)
	setTimeout(enableRightArrow, 1000);
	if(!isInViewport(security)){
		moveArrow(rightArrow);
		for(var i=0; i<carousel.length; i++){
			pathOffset[i] -= 235;
			carousel[i].style.left = pathOffset[i] + "px";
		}
	}
}

function enableLeftArrow(){
	//if command is now visible, disable left arrow
	if(isInViewport(command)){
		leftArrow.removeEventListener('click',moveLeft);
		leftArrow.style.cursor = 'auto';
		leftArrowImage.src = "./images/leftarrow-deactivated.png";
	}else{
		leftArrow.addEventListener('click',moveLeft);	
	}
	//if security is now invisible, enable right arrow
	if(!isInViewport(security)){
		rightArrow.addEventListener('click', moveRight);
		rightArrow.style.cursor = 'pointer';
		rightArrowImage.src = "./images/rightarrow.png";
	}
}

function enableRightArrow(){
	//if security is now visible, disable right arrow
	if(isInViewport(security)){
		rightArrow.removeEventListener('click',moveRight);
		rightArrow.style.cursor = 'auto';
		rightArrowImage.src = "./images/rightarrow-deactivated.png";
	}else{
		rightArrow.addEventListener('click',moveRight);
	}
	//if command is now invisible, enable left arrow
	if(!isInViewport(command)){
		leftArrow.addEventListener('click', moveLeft);
		leftArrow.style.cursor = 'pointer';
		leftArrowImage.src = "./images/leftarrow.png";
	}
}

function moveArrow(arrow){
	arrow.style.transform = "translateX(2px)";
	arrow.style.transform = "translateY(2px)";
	setTimeout(moveBack, 100, arrow);
}

function moveBack(arrow){
	arrow.style.transform = "translateX(0px)";
	arrow.style.transform = "translateY(0px)";
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
const email = document.getElementById('email');
submit.addEventListener('click', submitForm);

function submitForm(){
	if(email.value === ""){
		alert("Please enter your subspace address");
	}else{
		brocureForm.style.visibility = "hidden";
		submittedForm.style.visibility = "visible";
	}
}