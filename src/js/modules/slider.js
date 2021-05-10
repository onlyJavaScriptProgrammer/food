function slider({containerInner, slide, prev, next, wrapperSlider, totalCounter, currentCounter, autoplay, duration}) {
    const slides = document.querySelectorAll(slide),
        prevArrow = document.querySelector(prev),
        nextArrow = document.querySelector(next),
        innerWrapper = document.querySelector(containerInner),
        wrapper = document.querySelector(wrapperSlider),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        width = window.getComputedStyle(wrapper).width;

    let slideIndex = 1,
        offset = 0,
        time;

    const timeId = () => {
        time = setTimeout(() => {
            offset += transformWidth();
            innerWrapper.style.transform = `translateX(-${offset}px)`;

            autoplaySlider();
        }, duration);
    };

    const makeChanges = () => {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    };

    const transformWidth = () => +width.replace(/\D/g, '');

    innerWrapper.style.width = 100 * slides.length + '%';
    innerWrapper.style.display = 'flex';
    wrapper.style.overflow = 'hidden';
    innerWrapper.style.transition = '0.5s all';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    nextArrow.addEventListener('click', () => {
        if (offset == (transformWidth() * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += transformWidth();
        }

        innerWrapper.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        clearTimeout(time);
        makeChanges();

    });

    prevArrow.addEventListener('click', () => {
        if (offset == 0) {
            offset += (transformWidth() * (slides.length - 1));
        } else {
            offset -= transformWidth();
        }

        innerWrapper.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        makeChanges();
    });

    const dotsWrapper = document.createElement('div'),
        offerSlider = document.querySelector('.offer__slider'),
        dots = [];

    dotsWrapper.classList.add('carousel-indicators');
    offerSlider.append(dotsWrapper);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        dotsWrapper.append(dot);

        if (i == 0) {
            dot.style.opacity = '1';
        }

        dots.push(dot);
    }

    dotsWrapper.addEventListener('click', event => {
        const target = event.target;

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });

        if (target && target.classList.contains('dot')) {
            dots.forEach(dot => {

                const dataAttr = +dot.getAttribute('data-slide-to');

                if (target == dot) {
                    dot.style.opacity = '1';

                    slideIndex = dataAttr;

                    offset = ((dataAttr - 1) * (transformWidth()));
                    innerWrapper.style.transform = `translateX(-${offset}px)`;

                    if (slides.length < 10) {
                        current.textContent = `0${slideIndex}`;
                    } else {
                        current.textContent = slideIndex;
                    }
                }
            });
        }
    });

    function autoplaySlider() {
        if(!autoplay){
            return;
        } 
        if (prevArrow.classList.contains('hide') == false && nextArrow.classList.contains('hide') == false && dotsWrapper.classList.contains('hide') == false) {
            prevArrow.classList.add('hide');
            nextArrow.classList.add('hide');
            dotsWrapper.classList.add('hide');
        }

        if(offset == (transformWidth() * (slides.length - 1) + transformWidth())) {
            offset = 0;
            innerWrapper.style.transform = `translateX(-${offset}px)`;
        } 

        timeId();
        makeChanges();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
    }

    autoplaySlider(); 
}

export default slider;