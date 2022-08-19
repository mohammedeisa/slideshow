window.onload = function () {
	let slider_ = document.querySelector(".eisa-slideshow");

	if (typeof slider_ !== "undefined" && slider_ !== null) {
		let assyncAddClass = function (element, className) {
			return new Promise((resolve) => {
				element.classList.add(className);
				resolve();
			});
		};

		let assyncRemoveClass = function (element, className) {
			return new Promise((resolve) => {
				element.classList.remove(className);
				resolve();
			});
		};

		const applyAnimation = function (currentSlide, newSlide, effect) {
			currentSlide.classList.add("animation");
			assyncAddClass(currentSlide, "fadeout").then(() => {
				assyncRemoveClass(currentSlide, "active").then(() => {
					currentSlide.classList.remove("fadeout");
					Array.from(document.querySelectorAll(".slide")).forEach(function (
						el
					) {
						el.classList.remove("active");
					});
					newSlide.classList.add("animation", "active");
					assyncAddClass(newSlide, "fadein").then(() => {
						// newSlide.classList.remove("fadein");
					});
				});
			});
		};

		setActiveNavItem = function (slide) {
			let slides = slider_.querySelectorAll(".slide");
			let slideIndex = Array.from(slides).indexOf(slide);
			let navItems = slider_.querySelectorAll(".eisa-slider-navigation a");
			slider_
				.querySelector(".eisa-slider-navigation a.active")
				.classList.remove("active");
			navItems[slideIndex].classList.add("active");
		};

		const goToNextSlide = function (slider) {
			let loop = slider.getAttribute("data-loop");
			let currentSlide = slider.querySelector(".active");
			let newSlide = null;
			if (currentSlide.nextElementSibling == null && loop == "true") {
				newSlide = slider.querySelectorAll(".slide")[0];
			} else if (currentSlide.nextElementSibling == null && loop == "false") {
				return;
			} else {
				newSlide = currentSlide.nextElementSibling;
			}
			applyAnimation(currentSlide, newSlide, "fade");
			setActiveNavItem(newSlide);
		};
		const goToPrevSlide = function (slider) {
			let loop = slider.getAttribute("data-loop");
			let currentSlide = slider.querySelector(".active");
			let newSlide = null;
			if (currentSlide.previousElementSibling == null && loop == "true") {
				let slides = slider.querySelectorAll(".slide");
				newSlide = slider.querySelectorAll(".slide")[slides.length - 1];
			} else if (
				currentSlide.previousElementSibling == null &&
				loop == "false"
			) {
				return;
			} else {
				newSlide = currentSlide.previousElementSibling;
			}
			applyAnimation(currentSlide, newSlide, "fade");
			setActiveNavItem(newSlide);
		};

		const navigateToSlide = function (e) {
			let slider = e.currentTarget.closest(".eisa-slideshow");
			let currentSlide = slider.querySelector(".active");
			let newSlideIndex = parseInt(
				e.currentTarget.getAttribute("data-slide-index")
			);
			let newSlide = slider.querySelectorAll(".slide")[newSlideIndex];
			applyAnimation(currentSlide, newSlide, "fade");

			slider
				.querySelector(".eisa-slider-navigation a.active")
				.classList.remove("active");
			e.currentTarget.classList.add("active");
			clearInterval(autoscrollInterval);
			autoscrollInterval = initiateAutoScroll();
		};

		if (document.querySelector(".eisa-slider-nav-next") !== null)
			document
				.querySelector(".eisa-slider-nav-next")
				.addEventListener("click", function (e) {
					let slider = e.currentTarget.closest(".eisa-slideshow");
					goToNextSlide(slider);
				});
		if (document.querySelector(".eisa-slider-nav-prev") !== null)
			document
				.querySelector(".eisa-slider-nav-prev")
				.addEventListener("click", function (e) {
					let slider = e.currentTarget.closest(".eisa-slideshow");

					goToPrevSlide(slider);
				});

		document
			.querySelectorAll(".eisa-slider-navigation a")
			.forEach((element) => {
				element.addEventListener("click", function (e) {
					navigateToSlide(e);
				});
			});

		function initiateAutoScroll() {
			let autoscrollInterval = null;
			if (
				null !== slider_.getAttribute("data-autoscroll") &&
				slider_.getAttribute("data-autoscroll") === "true"
			) {
				let scrollTimeout = parseInt(
					slider_.getAttribute("data-scrolltimeout")
				);
				autoscrollInterval = setInterval(() => {
					goToNextSlide(slider_);
				}, scrollTimeout);
			}
			return autoscrollInterval;
		}
		var autoscrollInterval = initiateAutoScroll();

		document.onkeydown = function (event) {
			switch (event.key) {
				case "ArrowRight":
					goToNextSlide(slider_);
					break;
				case "ArrowLeft":
					goToPrevSlide(slider_);
					break;
			}
		};

		slider_.addEventListener("touchstart", startTouch, false);
		slider_.addEventListener("touchmove", moveTouch, false);
		// Swipe Up / Down / Left / Right
		var initialX = null;
		function startTouch(e) {
			initialX = e.touches[0].clientX;
		}
		function moveTouch(e) {
			if (initialX === null) {
				return;
			}
			var currentX = e.touches[0].clientX;
			var diffX = initialX - currentX;
			// sliding horizontally
			if (diffX > 0) {
				// swiped left
				goToPrevSlide(slider_);
			} else {
				// swiped right
				goToNextSlide(slider_);
			}
			initialX = null;
			e.preventDefault();
		}

		let sliderHeight = slider_.offsetHeight;
		let navigationHeight = document.querySelector(
			".eisa-slider-navigation"
		).offsetHeight;
		let viewportHeight = sliderHeight - navigationHeight;
		document.querySelector(".eisa-slider-posts-container").style.height =
			viewportHeight + "px";

		Array.from(document.querySelectorAll(".slide img")).forEach(function (el) {
			el.style.maxHeight = (viewportHeight * 80) / 100 + "px";
		});

		/////////////////////
	} //End check if slider exists
};
