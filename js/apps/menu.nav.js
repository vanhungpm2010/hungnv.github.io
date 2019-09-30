;(function (win, $) {
    'use strict';

    // Open/Close menu
    var controlMenu = function () {
        $('.js_btn_menu').on('click', function() {
            $('#container').toggleClass('ct_blur');
            $('#nav').toggleClass('active');
        });

        
        // Swipe Up / Down / Left / Right
        var container = document.querySelector('body');
        container.addEventListener("touchstart", startTouch, false);
        container.addEventListener("touchmove", moveTouch, false);

        var initialX = null;
        var initialY = null;
    
        function startTouch(e) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        };
    
        function moveTouch(e) {
            if (initialX === null) {
                return;
            }

            if (initialY === null) {
                return;
            }

            var currentX = e.touches[0].clientX;
            var currentY = e.touches[0].clientY;
        
            var diffX = initialX - currentX;
            var diffY = initialY - currentY;
        
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // sliding horizontally
                if (diffX > 0) {
                // swiped left
                } else {
                // swiped right
                }  
            } else {
                if (diffY >= 0) {
                    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
                        $('#container').toggleClass('ct_blur');
                        $('#nav').toggleClass('active');
                    }
                }
            }
        
            initialX = null;
            initialY = null;
        };
    }

    
    $(win).on('load', function () {
        controlMenu();
    });

})(window, window.jQuery);