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
            }
        }
    },
    'demo-2': {
        items: 1,
        slideBy: 1,
        edgePadding: baseFontSize * 3,
        responsive: {
            576: {
                items: 2,
                gutter: baseFontSize
            },
            1200: {
                items: 3
            }
        }
    },
};

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
            //slider.style.display = 'block';
        },
        ...options[slider.getAttribute('data-slider-options')] // jshint ignore:line
    });

    slider.querySelectorAll('.js-slider-control').forEach((btn) => {
        btn.addEventListener('click', () => {
            sliderTNS.goTo(btn.getAttribute('data-controls'));
        });
    });
});