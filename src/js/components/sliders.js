var demoSlider = document.querySelector('.js-slider-demo');

if(demoSlider) {

    tns({
        container: demoSlider.querySelector('.slider__content'),
        items: 1,
        slideBy: 'page',
        nav: 'true',
        navPosition: 'bottom',
        controlsContainer: demoSlider.querySelector('.slider__controls'),
        arrowKeys: true, 
        autoplayButtonOutput: false,
        loop: false,
        responsive: {
            576: {
                items: 2,
                gutter: baseFontSize * getComputedStyle(html).getPropertyValue('--sp-unitless')
            },
            1200: {
                items: 3
            }
        },
        preventScrollOnTouch: 'auto',
        onInit: function() {
            demoSlider.style.display = 'block';
        }
    });

}