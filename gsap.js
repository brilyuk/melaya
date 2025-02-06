gsap.registerPlugin(ScrollTrigger);

// swiper logic  
function swiperInit() {
    document.querySelectorAll('.slider').forEach((slider) => {
        const swiper = new Swiper(slider.querySelector('.swiper'), {
            loop: false,
            effect: "fade",
            navigation: {
                nextEl: slider.querySelector('.slider__button-next'),
                prevEl: slider.querySelector('.slider__button-prev'),
            },
            on: {
                init: () => {
                    sliderAnimation(slider);
                },
                slideChange: () => {
                    resetSliderAnimation(slider);
                    updateCurrentSlide();
                },
                transitionEnd: () => {
                    sliderAnimation(slider);
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
        updateCurrentSlide();
    });
}

// intro animation
function introAnimation() {
    const headerInner = document.querySelector('.header__inner');
    const introFooter = document.querySelector('.intro__footer');

    gsap.fromTo(headerInner, { y: "-100%", opacity: 0 }, { y: 0, opacity: 1,  duration: 1 });
    gsap.fromTo(introFooter, { y: "100%", opacity: 0 }, { y: 0, opacity: 1,  duration: 0.5 }, 1);
}

// about animation
function aboutAnimation() {
    const about = document.querySelector('.about');
    const title = about.querySelector('.about__title');
    const text = about.querySelector('.about__text');

    const TL = gsap.timeline({
        scrollTrigger: {
            trigger: about,
            toggleActions: "play none none reverse",
            start: "top center"
        }
    });
    TL.fromTo(title, { x: "-100%", opacity: 0 }, { x: 0, opacity: 1,  duration: 0.5 });
    TL.fromTo(text, { x: "100%", opacity: 0 }, { x: 0, opacity: 1,  duration: 0.5 });
}

function resetSliderAnimation(currentSlider) {
    const allSlides = currentSlider.querySelectorAll('.swiper-slide');

    allSlides.forEach(slide => {
        const elements = {
            titleText: slide.querySelector('.card__title-text'),
            titleName: slide.querySelector('.card__title-name'),
            youtube: slide.querySelector('.card__link.youtube'),
            apple: slide.querySelector('.card__link.apple'),
            spotify: slide.querySelector('.card__link.spotify'),
            image: slide.querySelector('.card__image')
        };

        Object.entries(elements).forEach(([key, element]) => {
            if (element) {
                gsap.set(element, { x: "100%", opacity: 0 });
            }
        });
    });
}

// slider animation
function sliderAnimation(currentSlider) {
    const activeSlide = currentSlider.querySelector('.swiper-slide-active');

    if (!activeSlide) {
        console.error('Active slide not found');
        return;
    }

    const activeElements = {
        image: activeSlide.querySelector('.card__image'),
        titleText: activeSlide.querySelector('.card__title-text'),
        titleName: activeSlide.querySelector('.card__title-name'),
        youtube: activeSlide.querySelector('.card__link.youtube'),
        apple: activeSlide.querySelector('.card__link.apple'),
        spotify: activeSlide.querySelector('.card__link.spotify'),
    };

    const hasElements = Object.values(activeElements).some(element => element !== null);

    if (!hasElements) {
        console.error('No elements found in active slide');
        return;
    }


    if (activeElements.image) {
        gsap.fromTo(activeElements.image,
            { x: "100%", opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }
        );
    }

    if (activeElements.titleText) {
        gsap.fromTo(activeElements.titleText,
            { x: "100%", opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    }

    if (activeElements.titleName) {
        gsap.fromTo(activeElements.titleName,
            { x: "100%", opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.1,
                ease: "power2.out"
            }
        );
    }

    const links = [
        activeElements.youtube,
        activeElements.apple,
        activeElements.spotify
    ];

    links.forEach((link, index) => {
        if (link) {
            gsap.fromTo(link,
                { x: "100%", opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2 + (index * 0.1),
                    ease: "power2.out"
                }
            );
        }
    });
}

// contacts animation
function contactsAnimation() {
    const contacts = document.querySelector('.contacts');
    const title = contacts.querySelector('.contacts__title');
    const text = contacts.querySelector('.contacts__text');

    const TL = gsap.timeline({
        scrollTrigger: {
            trigger: contacts,
            toggleActions: "play none none reverse",
            start: "top center"
        }
    });
    TL.fromTo(title, { x: "-100%", opacity: 0 }, { x: 0, opacity: 1,  duration: 0.5 });
    TL.fromTo(text, { x: "100%", opacity: 0 }, { x: 0, opacity: 1,  duration: 0.5 });
}

// footer animation
function footerAnimation() {
    const footer = document.querySelector('.footer');
    const inner = footer.querySelector('.footer__inner');

    const TL = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            toggleActions: "play none none reverse",
            start: "top bottom"
        }
    });
    TL.fromTo(inner, { y: "100%", opacity: 0 }, { y: 0, opacity: 1,  duration: 0.5 }, 0.5);
}

window.addEventListener("DOMContentLoaded", () => {
    swiperInit();
    introAnimation();
    aboutAnimation();
    contactsAnimation();
    footerAnimation();
})
