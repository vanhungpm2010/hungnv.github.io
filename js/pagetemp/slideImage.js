 (function (win, $) {
    'use strict';

    var sliderImage = function () {
      const slideImg = $('.slideImg');
  
      slideImg.each(function(){
        const slideContainer = $(this);
        const slideContainerId = '#' + $(this).prop('id');
  
        const swiperImg = new Swiper(slideContainerId + ' .slideImage', {
          slidesPerView: 'auto',
          speed: 500,
        });
  
        const swiperImgBg = new Swiper(slideContainerId + ' .slideImage_bg', {
            slidesPerView: 'auto',
            speed: 500,
        });
  
        const swiperImgBgOverlay = new Swiper(slideContainerId + ' .slideImage_overlaybg', {
            slidesPerView: 'auto',
            speed: 500,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
  
        swiperImg.controller.control = swiperImgBgOverlay;
        swiperImgBgOverlay.controller.control = swiperImgBg;
  
        var injectImage = function(box) {
          const avatarURL = box.attr('imgurl');
          const currentImgURL = box.find('img').attr('src');

          if (currentImgURL === "" || currentImgURL === 'undefined') {
            box.find('img').attr('src', avatarURL);
          }
        }
  
        var preloadSlideImg = function(slideContainer, slideContainerId) {
          if (slideContainer.isInViewport()) {
              var activeIndex = swiperImgBgOverlay.activeIndex;
              const nextImageIndex = activeIndex + 1;
      
              const avatarBox = $(slideContainerId + ' .slideImage .swiper-slide').eq(activeIndex).find('.box_avatar').first();
              injectImage(avatarBox);
      
              const nextAvatarBox = $(slideContainerId + ' .slideImage .swiper-slide').eq(nextImageIndex).find('.box_avatar').first();
              injectImage(nextAvatarBox);
      
              const avatarBgBox = $(slideContainerId + ' .slideImage_bg .swiper-slide').eq(activeIndex).find('.bg_avatar').first();
              injectImage(avatarBgBox);
      
              const nextAvatarBgBox = $(slideContainerId + ' .slideImage_bg .swiper-slide').eq(nextImageIndex).find('.bg_avatar').first();
              injectImage(nextAvatarBgBox);
          }
        }
  
        preloadSlideImg(slideContainer, slideContainerId);
  
        $(window).scroll(function () {
          preloadSlideImg(slideContainer, slideContainerId);
        });
    
  
        swiperImgBgOverlay.on('slideChange', function () {
          var activeIndex = swiperImgBgOverlay.activeIndex;
          const nextImageIndex = activeIndex + 1;
  
          const avatarBox = $(slideContainerId + ' .slideImage .swiper-slide').eq(activeIndex).find('.box_avatar').first();
          injectImage(avatarBox);
  
          const nextAvatarBox = $(slideContainerId + ' .slideImage .swiper-slide').eq(nextImageIndex).find('.box_avatar').first();
          injectImage(nextAvatarBox);
  
          const avatarBgBox = $(slideContainerId + ' .slideImage_bg .swiper-slide').eq(activeIndex).find('.bg_avatar').first();
          injectImage(avatarBgBox);
  
          const nextAvatarBgBox = $(slideContainerId + ' .slideImage_bg .swiper-slide').eq(nextImageIndex).find('.bg_avatar').first();
          injectImage(nextAvatarBgBox);
        })
     });
    }
  
    $(win).on('load', function () {
      sliderImage();
    });
  
  })(window, window.jQuery);