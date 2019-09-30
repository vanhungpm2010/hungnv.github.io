(function (win, $) {
    'use strict';

    var injectImage = function(imageCover) {
        if (imageCover.isInViewport()) {
            imageCover.find('#preview').css('z-index', '-1');
            const singleImage = imageCover.find('.single-image');
            singleImage.css('z-index', 1);
            const imageURL = singleImage.attr('src');
            const currentImageURL = singleImage.find('img').attr('src');
            if (currentImageURL === "" || currentImageURL === 'undefined') {
                singleImage.find('img').attr('src', imageURL);
            }
        }
    }

    const loadImageCover = function () {
        const imageWithCover = $('.single-img-with-cover');
        imageWithCover.each(function () {
            const imageCover = $(this);
            injectImage(imageCover)
            $(window).scroll(function () {
                injectImage(imageCover)
            })
        })
    }

    $(win).on('load', function () {
        loadImageCover()
    });

})(window, window.jQuery);