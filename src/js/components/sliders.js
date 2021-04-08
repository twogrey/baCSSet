var options = {
    'demo-1': {
        items: 1,
        responsive: {
            576: {
                items: 2,
                gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--sp-unitless')
            },
            1200: {
                items: 3
            },
            1600: {
                items: 4
            }
        }
    },
    'demo-2': {
        items: 1
    },
    'demo-3': {
        items: 1,
        gutter: baseFontSize,
        edgePadding: baseFontSize * 3,
        responsive: {
            576: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    },
    'demo-4': {
        items: 1,
    }
};

function showHideControls(slider) {
    if(slider.querySelector('.slider__controls')) {
        if(slider.querySelector('.tns-nav').style.display == 'none') {
            slider.querySelector('.slider__controls').style.display = 'none';
            slider.style.padding = '0';
        } else {
            slider.querySelector('.slider__controls').style.display = '';
            slider.style.removeProperty('padding');
        }
    }
}

function toggleDisabledControls(slider, sliderTNS) {
    if(slider.querySelector('.slider__controls')) {
        let sliderTNSinfos = sliderTNS.getInfo();
        if(sliderTNSinfos.pages == (sliderTNSinfos.navCurrentIndex + 1)) {
            slider.querySelector('[data-controls="next"]').setAttribute('disabled', '');
        } else {
            slider.querySelector('[data-controls="next"]').removeAttribute('disabled');
        }
        if(sliderTNSinfos.navCurrentIndex == 0) {
            slider.querySelector('[data-controls="prev"]').setAttribute('disabled', '');
        } else {
            slider.querySelector('[data-controls="prev"]').removeAttribute('disabled');
        }
    }
}

function preventFocusOnSlideOffScreen(slider) {
    slider.querySelectorAll('.tns-item').forEach((slide) => {
        let slideLeft = parseInt(slide.getBoundingClientRect().left),
            slideRight = parseInt(slide.getBoundingClientRect().right - (parseInt(getComputedStyle(slide).paddingRight))),
            sliderLeft = parseInt(slide.closest('.js-slider').getBoundingClientRect().left),
            sliderRight = parseInt(slide.closest('.js-slider').getBoundingClientRect().right);
        if(slide.getAttribute('tabindex') == '-1' || (slideLeft < sliderLeft) || (slideRight > sliderRight)) {
            slide.querySelectorAll(focusableSelector).forEach((elmt) => {
                elmt.setAttribute('tabindex', '-1');
            });
        } else {
            slide.querySelectorAll(focusableSelector).forEach((elmt) => {
                elmt.removeAttribute('tabindex');
            });
        }
    });
}

function initImgAsThumbnail(slider) {
    let imgs = slider.getAttribute('data-slider-img-as-thumbnail').split(',');
    slider.querySelectorAll('.tns-nav button').forEach((thumbnail, index) => {
        thumbnail.style.backgroundImage = 'url('+imgs[index]+')';
    });
}

document.querySelectorAll('.js-slider').forEach((slider) => {
    let sliderTNS = tns({
        container: slider.querySelector('.slider__content'),
        slideBy: 'page',
        nav: 'true',
        navPosition: 'bottom',
        controls: false,
        loop: false,
        preventScrollOnTouch: 'auto',
        onInit: function() {
            slider.classList.add('on');
            showHideControls(slider);
            preventFocusOnSlideOffScreen(slider);
            if(slider.getAttribute('data-slider-img-as-thumbnail')) {
                initImgAsThumbnail(slider);
            }
        },
        ...options[slider.getAttribute('data-slider-options')] // jshint ignore:line
    });

    slider.querySelectorAll('.js-slider-control').forEach((btn) => {
        btn.addEventListener('click', () => {
            let sliderTNSinfos = sliderTNS.getInfo();
            if(btn.getAttribute('data-controls') == 'next') {
                sliderTNS.goTo(parseInt((sliderTNSinfos.navCurrentIndex + 1) * sliderTNSinfos.items));
            }
            if(btn.getAttribute('data-controls') == 'prev') {
                sliderTNS.goTo(parseInt((sliderTNSinfos.navCurrentIndex - 1) * sliderTNSinfos.items));
            }
        });
    });

    sliderTNS.events.on('indexChanged', () => {
        toggleDisabledControls(slider, sliderTNS);
    });

    sliderTNS.events.on('transitionEnd', () => {
        preventFocusOnSlideOffScreen(slider);
    });

    sliderTNS.events.on('newBreakpointEnd', () => {
        showHideControls(slider);
        toggleDisabledControls(slider, sliderTNS);
        preventFocusOnSlideOffScreen(slider);
    });


});