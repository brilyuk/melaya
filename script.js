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
                    disableSlideAnimation();
                },
                slideChange: () => {
                    updateCurrentSlide();
                },
                slideChangeTransitionEnd: () => {
                    enableSlideAnimation();
                },
            }
        });
        const currentCount = slider.querySelector('.slider__count-current');
        const allCount = slider.querySelector('.slider__count-all');
        const slides = slider.querySelectorAll('.swiper-slide');
        const totalSlides = slides.length;
        
        const formatNumber = (num) => num.toString().padStart(3, '0');
        allCount.innerHTML = formatNumber(totalSlides);
        
        const updateCurrentSlide = () => {
            currentCount.innerHTML = formatNumber(swiper.activeIndex + 1);
        };

        const disableSlideAnimation = () => {
            slides.forEach((slide) => {
                slide.querySelectorAll('[data-aos]').forEach((element) => {
                    element.style.visibility = 'hidden';
                    element.classList.remove('aos-init', 'aos-animate');
                });
            });
        };

        const enableSlideAnimation = () => {
            slides.forEach((slide) => {
                slide.querySelectorAll('[data-aos]').forEach((element) => {
                    element.style.visibility = 'visible';
                });
            });
            AOS.init();
        };
        
        updateCurrentSlide();
    });
}

window.addEventListener("DOMContentLoaded", () => {
    swiperInit();
    AOS.init();
})
