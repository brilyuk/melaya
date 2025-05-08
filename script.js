const header = document.querySelector("header");
const headroom = new Headroom(header);

// swiper logic  
function swiperInit() {
	document.querySelectorAll('.slider').forEach((slider) => {
		const swiper = new Swiper(slider.querySelector('.swiper'), {
			loop: false,
			speed: 400,
			navigation: {
				nextEl: slider.querySelector('.slider__button-next'),
				prevEl: slider.querySelector('.slider__button-prev'),
			},
			on: {
				slideChangeTransitionStart: () => {
						disableSlideAnimation(slider);
				},
				slideChange: () => {
						updateCurrentSlide(swiper,slider);
				},
				slideNextTransitionEnd: () => {
						enableSlideAnimation(slider, 'fade-left');
				},
				slidePrevTransitionEnd: () => {
						enableSlideAnimation(slider, 'fade-right');
				},
			}
		});
		allSlides(slider);
		updateCurrentSlide(swiper,slider);
	});
}

function initAnimation() {
	AOS.init({ once: true });
}

const allSlides = (slider) => {
	const allCount = slider.querySelector('.slider__count-all');
	const slides = slider.querySelectorAll('.swiper-slide');
	const totalSlides = slides.length;
	
	const formatNumber = (num) => num.toString().padStart(3, '0');
	allCount.innerHTML = formatNumber(totalSlides);
}

const updateCurrentSlide = (swiper, slider) => {
	const currentCount = slider.querySelector('.slider__count-current');
	const formatNumber = (num) => num.toString().padStart(3, '0');
	currentCount.innerHTML = formatNumber(swiper.activeIndex + 1);
};

const disableSlideAnimation = (slider) => {
	const slides = slider.querySelectorAll('.swiper-slide');
	slides.forEach((slide) => {
		slide.style.opacity = 0;
		slide.querySelectorAll('[data-aos]').forEach((element) => {
			element.classList.remove('aos-init', 'aos-animate');
		});
	});
};

const enableSlideAnimation = (slider, direction) => {
	slider.querySelectorAll('[data-aos]').forEach((element) => {
		element.setAttribute('data-aos', direction);
	});
	const currentSlide = slider.querySelector('.swiper-slide-active');
	setTimeout(() => {
		currentSlide.style.opacity = 1;
		initAnimation();
	}, 200);
};

const sliderFooterReversePosition = () => {
	const sliderReverseFooter = document.querySelector('.slider__footer.reverse');
	if (!sliderReverseFooter) return;

	const isMobile = window.innerWidth < 480;
	const cardContent = sliderReverseFooter.closest('.slider').querySelector('.card__content');
	const cardContentPosition = Math.round(cardContent.getBoundingClientRect().left);
	sliderReverseFooter.style.left = !isMobile ? `${cardContentPosition}px` : '85px';
}

const debounce = (func, wait) => {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

window.addEventListener("DOMContentLoaded", () => {
	headroom.init();
	swiperInit();
	initAnimation();
	sliderFooterReversePosition();
})

window.addEventListener('resize', debounce(sliderFooterReversePosition, 250));
