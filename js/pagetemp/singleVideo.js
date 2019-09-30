(function (win, $) {
    'use strict';

    var injectVideoSingle = function(videobox) {
      if (videobox.isInHalfViewport()) {

        videobox.parent().on('click', function() {
          videobox.find('video').get(0).play();
        });

        var deviceAgent = navigator.userAgent.toLowerCase();
        var isIphone = deviceAgent.match(/(iphone|ipod|ipad)/);
        if (isIphone) {
          videobox.find('video').get(0).autoplay = true;
        }
        videobox.find('video').get(0).play();

        if (videobox.find('video').get(0).muted && !videobox.find('video').get(0).paused) {
          videobox.parent().find('#off').show();
          videobox.parent().find('#play').hide();
        }

        videobox.parent().find('#single-preview').css('z-index', -1);
      } else {
        videobox.find('video').get(0).pause();
      }
    }

    var playSingleVideo = function () {
        const singleVideoWrap = $('.single-video-wrap');
    
        singleVideoWrap.each(function () {
          const wrapper = $(this);
    
          function checkLoad() {
            if (wrapper.isInViewport()) {
              const videoInjector = wrapper.find('#video-injector');
              injectVideoSingle(videoInjector)
            }
          }
    
          checkLoad();
    
          $(window).scroll(function() {
            checkLoad();
          })
        })
      }
  
    $(win).on('load', function () {
      playSingleVideo();
    });
  
  })(window, window.jQuery);