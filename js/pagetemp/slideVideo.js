(function (win, $) {
  'use strict';

  var playVideoSlider = function(boxVideo) {

      boxVideo.on('click', function() {
        boxVideo.find('video').get(0).play();
      });

      if(boxVideo.isInHalfViewport()) {
        var deviceAgent = navigator.userAgent.toLowerCase();
        var isIphone = deviceAgent.match(/(iphone|ipod|ipad)/);

        if (isIphone) {
          boxVideo.find('video').get(0).autoplay = true;
        }
        
        var counter = 0;
        var interval = setInterval(function() {
          counter +=1;
          boxVideo.find('#video-injector').find('video').get(0).play();

          if (boxVideo.find('#video-injector').find('video').get(0).readyState >= 2) {
              if(boxVideo.isInHalfViewport()) {
                  boxVideo.find('#preview').css('opacity', 0);
                  if (boxVideo.find('video').get(0).muted && !boxVideo.find('video').get(0).paused) {
                    boxVideo.parent().find('#off').show();
                    boxVideo.parent().find('#play').hide();
                  }
              }
              clearInterval(interval);
          }
          if (counter === 20) {
            clearInterval(interval);
          }
        }, 100);
      }
  }

  var sliderVideo = function () {
    const slideVid = $('.slidevid');

    slideVid.each(function() {
      const slideVidId = '#' + $(this).prop('id');

      var swiper = new Swiper(slideVidId + ' .slidetemp', {
        slidesPerView: 'auto',
        speed: 500,
      });
  
      var swiperBg = new Swiper(slideVidId + ' .slidertemp_bg', {
        slidesPerView: 'auto',
        speed: 500,
      });

      var swiperBgOverlay = new Swiper(slideVidId + ' .slidertemp_overlaybg', {
        slidesPerView: 'auto',
        speed: 500,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
      });
  
      swiper.controller.control = swiperBgOverlay;
  
      swiperBgOverlay.controller.control = swiperBg;


      const activeIndex = swiperBgOverlay.activeIndex;
      const currentVideoBox = $(slideVidId + ' .slidetemp .swiper-slide').eq(activeIndex).find('.box_video');

      if (currentVideoBox.isInViewport()) {
          playVideoSlider(currentVideoBox)
      }

      $(window).scroll(function() {
          const activeIndex = swiperBgOverlay.activeIndex;
          const currentVideoBox = $(slideVidId + ' .slidetemp .swiper-slide').eq(activeIndex).find('.box_video');
          $(slideVidId).find('video').each(function () {
              $(this).get(0).pause();
          });
          if (currentVideoBox.isInViewport()) {
              if (currentVideoBox.isInViewport())
              playVideoSlider(currentVideoBox);
          }
      });
  
      swiperBgOverlay.on('slideChange', function () {
        $(slideVidId).find('video').each(function () {
          $(this).get(0).pause();

          if (!$(this).get(0).muted) {
            $(this).prop('muted', true);
            $(this).parent().find('#on').hide();
            $(this).parent().find('#off').show();
          }
        });

        const activeIndex = swiperBgOverlay.activeIndex;
        const currentVideoBox = $(slideVidId + ' .slidetemp .swiper-slide').eq(activeIndex).find('.box_video');

        $(slideVidId).find('video').each(function () {
            $(this).get(0).pause();
        });

        if (currentVideoBox.isInViewport()) {
          playVideoSlider(currentVideoBox);
        }
      });
    })
  }

  $(win).on('load', function () {
    //sliderVideo();
  });

})(window, window.jQuery);