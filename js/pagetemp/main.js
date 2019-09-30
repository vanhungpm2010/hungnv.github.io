$.fn.isInHalfViewport = function () {
  var elementTop = $(this).offset().top;
  const elHeight = $(this).height();

  const windowHeight = $(window).height();
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  const elHeightTop = windowHeight - (viewportBottom - elementBottom);
  const elHeightBottom = viewportBottom - elementTop;

  return elHeightBottom >= elHeight / 2 && elHeightTop >= elHeight / 2;
};

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

(function (win, $) {
  'use strict';

  window.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  window.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  }

  const url = $(location).attr('href');
  const referalLink = getCookie('referalLink');

  if (referalLink && referalLink.indexOf('/?') > -1) {
    if (url.indexOf('/?') > -1) {
      const id = url.split('/?')[1];
      const oldId = referalLink.split('/?')[1];
      if (id && id !== '' && id !== oldId) {
        setCookie('referalLink', url, 7);
      }
    }
  } else {
    setCookie('referalLink', url, 7);
  }

  var showVolumeIcon = function (wrapper) {
    const video = wrapper.find('video');
    wrapper.find('#play').hide();
    if (video.get(0).muted) {
      video.prop('muted', false)
      wrapper.find('#on').show();
      wrapper.find('#off').hide();
    } else {
      video.prop('muted', true)
      wrapper.find('#on').hide();
      wrapper.find('#off').show();
    }
  }

  var changeVolumeSingleVideo = function () {
    const wrapper = $('.video-wrap');
    wrapper.on('click', function (e) {
      e.stopPropagation()
      showVolumeIcon($(this));
    })
  }

  changeVolumeSingleVideo();

  $('.slidetemp .swiper-slide').on('click', function (e) {
    e.stopPropagation();
    showVolumeIcon($(this));
  });

  $(window).on('beforeunload', function () {
    var page_y = document.getElementsByTagName("body")[0].scrollTop;
    window.location.href = window.location.href.split('?')[0] + '?page_y=' + page_y;
  });
})(window, window.jQuery);