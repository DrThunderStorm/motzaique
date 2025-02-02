function adjustFontSize() {
	if (window.innerWidth < window.innerHeight) {
		var navbarLinks = document.querySelectorAll('.navbar a');
		for (var i = 0; i < navbarLinks.length; i++) {
			navbarLinks[i].style.fontSize = '1.8vw';
		}
	} else {
		var navbarLinks = document.querySelectorAll('.navbar a');
		for (var i = 0; i < navbarLinks.length; i++) {
			navbarLinks[i].style.fontSize = '';
		}
	}
}

adjustFontSize();

window.addEventListener('resize', adjustFontSize);
	
window.onload = function() {
	const draggableImage = document.getElementById('draggableImage');
	let isDragging = false;

	draggableImage.addEventListener('mousedown', startDragging);
	draggableImage.addEventListener('touchstart', startDragging);

	function startDragging(event) {
		event.preventDefault();
		if (!isDragging) {
			isDragging = true;

			const offsetX = event.clientX ? event.clientX - draggableImage.getBoundingClientRect().left : event.touches[0].clientX - draggableImage.getBoundingClientRect().left;
			const offsetY = event.clientY ? event.clientY - draggableImage.getBoundingClientRect().top : event.touches[0].clientY - draggableImage.getBoundingClientRect().top;

			if (event.type === 'mousedown') {
				document.addEventListener('mousemove', moveImage);
				document.addEventListener('mouseup', stopDragging);
			} else if (event.type === 'touchstart') {
				document.addEventListener('touchmove', moveImage);
				document.addEventListener('touchend', stopDragging);
			}

			function moveImage(event) {
				if (isDragging) {
					const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
					const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
					let newLeft = clientX - offsetX;
					let newTop = clientY - offsetY;

						newLeft = Math.max(newLeft, 0);
					newTop = Math.max(newTop, 0);
					newLeft = Math.min(newLeft, window.innerWidth - draggableImage.offsetWidth);
					newTop = Math.min(newTop, window.innerHeight - draggableImage.offsetHeight);

					draggableImage.style.left = newLeft + 'px';
					draggableImage.style.top = newTop + 'px';
				}
			}
				
			function stopDragging() {
				isDragging = false;
				if (event.type === 'mousedown') {
					document.removeEventListener('mousemove', moveImage);
					document.removeEventListener('mouseup', stopDragging);
				} else if (event.type === 'touchstart') {
					document.removeEventListener('touchmove', moveImage);
					document.removeEventListener('touchend', stopDragging);
				}
			}
		}
	}
}