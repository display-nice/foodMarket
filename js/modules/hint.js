//-----------------------hint-----------------------------
function hint () {
	const hintBtn = document.querySelector('#hint__btn');
	const hintDesc = document.querySelector('#hint__description');
	const crossPointer = document.querySelector('#hint__pointer-close');
	const hintPointer = document.querySelector('#hint__pointer');
	const hintWrapper = document.querySelector('#hint__wrapper');
	
	function hideHintPointer () {
		hintPointer.classList.add('hint__pointer--hidden');
	};
	function openHintInfo () {
		hintPointer.classList.add('hint__pointer--hidden');
		hintWrapper.style.alignItems = "flex-start";
		hintDesc.classList.toggle('hint__description--active');
	}
	
	hintBtn.onclick = openHintInfo;
	crossPointer.onclick = hideHintPointer;
}

export default hint;