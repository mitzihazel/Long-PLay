(function ($) {
  var $page_aside = $(".singles-page-sidebar-wrapper");
  var $page_wrapper = $(".singles-page-wrapper");
  var $header = $(".header-main");
  var $emptyDiv = $(".aside__empty", $page_aside);
  var scrolling = false;
  var fix_height = false;
  var aside_height = 0;
  var timeout_scrolling, timeout_height;
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var breakpoint = {};


  if ($('#tablet-visibility .visible-tablet-up').css('display') == 'inline') {
    $page_aside.addClass('menu-opened').removeClass('menu-opened-tablet-up');
    $('.hamburger-box').addClass('active').removeClass('active-tablet-up');
  }
  else {
    $page_aside.removeClass('menu-opened-tablet-up');
    $('.hamburger-box').removeClass('active-tablet-up');
  }

  if (!($('.aside-content-wrapper', $page_aside).length)) {
    $('.singles-page-sidebar-wrapper').wrapInner("<div class=\"aside-content-wrapper\"></div>");
    fix_height = true;
  }

  function setScrollSidebar(click) {
    if (scrolling && click == false) {
      return;
    }
    scrolling = true;
    clearTimeout(timeout_scrolling);
    timeout_scrolling = setTimeout(function () {
      var pos = 0;
      var scrollTop = $(window).scrollTop();
      $('.scrollto').each(function (i) {
        if (scrollTop + $(window).height() / 2 > $(this).offset().top) {
          pos = i;
        } else {
          return false;
        }
      });
      var x = ($page_aside.find('.aside-content-wrapper').height() / 2) - ($page_aside.find('.singles-page-sidebar-wrapper').eq(pos).height() / 2);
      var c = 0;
      var i = 0;
      $page_aside.find('.sidebar-item').each(function () {
        if ($(this).hasClass('singles-page-sidebar-wrapper')) {
          i++;
        }
        if (i <= pos) {
          c += $(this).height();
        } else {
          return false;
        }
      });
      var scrollHeight = (x > c ? 0 : c - x);
      var scrollTime = 300;

      if ($('.aside-content-wrapper .all-singles').length) {
        $page_aside.find('.aside-content-wrapper .all-singles').stop(true, false).delay(100).queue(function () {
          $page_aside.find('.singles-page-sidebar-wrapper').removeClass('active');
          $page_aside.find('.singles-page-sidebar-wrapper').eq(pos).addClass('active');
          $(this).dequeue();
        }).animate({'scrollTop': scrollHeight}, scrollTime);
      }

      else {
        $page_aside.find('.aside-content-wrapper').stop(true, false).delay(100).queue(function () {
          $page_aside.find('.singles-page-sidebar-wrapper').removeClass('active');
          $page_aside.find('.singles-page-sidebar-wrapper').eq(pos).addClass('active');
          $(this).dequeue();
        }).animate({'scrollTop': scrollHeight}, scrollTime);
      }

      scrolling = false;

      setAsideHeight($(window).scrollTop(), 50);

    }, 600);
  }

  function setAsideHeight(scrollTop, offset) {
    var height = $div.height();
    var offsetTop = 0;
    if ($body.hasClass('menu-fixed')) {
      offsetTop = Math.max($page_aside.position().top, 0);
    } else {
      offsetTop = Math.max($page_aside.position().top - scrollTop, 0);
    }

    if (!offset) {
      offset = 0;
    }
    if ($(window).height() - offsetTop > 0 && !$body.hasClass('menu-bottom')) {
      var emptyHeight = parseInt($page_aside.find('.aside__empty').innerHeight());
      var emptyHeight1 = emptyHeight + parseInt($page_aside.find('.aside__empty').innerHeight());
      if ($page_aside.hasClass('header-main-smallest')) {
        emptyHeight1 = emptyHeight;
      }
      $('.singles-page-sidebar-wrapper singles-page-sidebar-wrapper').css('height', height - offsetTop + emptyHeight1 + offset);
      $('.singles-page-sidebar-wrapper .aside-content-wrapper').css('height', height - $page_aside.find('.aside-content-wrapper').position().top - offsetTop - emptyHeight);
      $('.singles-page-sidebar-wrapper .aside-content-wrapper .all-singles').css('height', height - $page_aside.find('.aside-content-wrapper').position().top - offsetTop - emptyHeight);
    } else if ($body.hasClass('menu-bottom')) {
      $('.singles-page-sidebar-wrapper singles-page-sidebar-wrapper').css('height', $page_aside.find('.region').height());
    }
  }


  if ($page_aside.length > 0) {
    var posMenu = -1, last_update, paused = false, offset = 100;
    var $body = $('body');
    var $content = $('.region.region-content').addClass('clearfix');
    var mouse_enter = false;
    var multi_block = $('.views-element-container', $page_aside).length > 1;
    var $div = $('<div></div>').css({
      'position': 'fixed',
      'top': 0,
      'bottom': 0,
    }).appendTo($body);

    $page_aside.on('header-smallest-on', function () {
      aside_height = 0;
      clearInterval(timeout_height);
      timeout_height = setInterval(function () {
        if (aside_height <= 500) {
          setAsideHeight($(window).scrollTop(), 50);
          aside_height += 10;
        }
      }, 10);
    }).on('header-smallest-off', function () {
      clearInterval(timeout_height);

    });

    $page_aside.on('mouseenter', function () {
      mouse_enter = true;
      // Dont scroll content on safari when top or bottom of sidebar reached.
      if (isSafari) {
        $('html').css('overflow-y', 'hidden');
      }
    }).on('mouseleave', function () {
      mouse_enter = false;
      if (isSafari) {
        $('html').css('overflow-y', 'auto');
      }
    });

    // Fix for mobile on tap and on taphold.

    $page_aside.on('touchstart',function(){
      if (isSafari) {
        $('html').css('overflow-y', 'hidden');
      }
    });

    $page_wrapper.on('touchstart',function(){
      setScrollSidebar(true);
      if (isSafari) {
        $('html').css('overflow-y', 'auto');
      }
    });

    if (multi_block) {
      var $title = $('<h2 />').text($page_aside.find('.aside-content-wrapper h2').eq(0).hide().text());
      $page_aside.find('.aside-content-wrapper').before($title).scroll(function () {
        var title = $page_aside.find('.aside-content-wrapper h2').eq(0).text();
        $page_aside.find('.aside-content-wrapper h2').each(function () {
          if ($(this).position().top < -30) {
            title = $(this).text();
          }
        });
        $title.text(title);
      });
    }


    var currentContentPosition = $(window).scrollTop();
    $(window).scroll(function (e) {
      if (mouse_enter == true && scrolling == false) {
        // Prevent scrolling page when the right column is scrolled (happens ex. when scrolled to first/last menu element).
        if (!isSafari) {
          $(window).scrollTop(currentContentPosition);
        }
      }
      currentContentPosition = $(window).scrollTop();

      if (!$body.hasClass('menu-fixed') && posMenu != $page_aside.offset().top) {
        posMenu = $page_aside.offset().top;
      }
      if ($body.hasClass('toolbar-fixed') && $body.hasClass('toolbar-horizontal') && $body.hasClass('toolbar-tray-open')) {
        offset = 150;
      } else if ($body.hasClass('toolbar-fixed')) {
        offset = 109;
      }

      var scrollTop = $(this).scrollTop();
      var height = $div.height();
      if ($content.offset().top + $content.height() < scrollTop + height && !$body.hasClass('menu-bottom')) {
        $body.addClass('menu-bottom');
      } else if ($content.offset().top + $content.height() > scrollTop + height && $body.hasClass('menu-bottom')) {
        $body.removeClass('menu-bottom');
      }
      if (posMenu - offset <= scrollTop && !$body.hasClass('menu-fixed')) {
        $body.addClass('menu-fixed');
      } else if (posMenu - offset > scrollTop && $body.hasClass('menu-fixed')) {
        $body.removeClass('menu-fixed');
      }

      if (paused) return;
      if (new Date() - last_update < 20) {
        setTimeout(function () {
          paused = false;
          $(window).trigger('scroll');
        }, 20);
        paused = true;
      }
      setAsideHeight(scrollTop);
      if(!mouse_enter || $(this).width() < 550) {
        setScrollSidebar(false);
      }
      last_update = new Date();
    }).resize(function () {
      setTimeout(function () {
        var w = $page_aside.width();
        var $items = $('singles-page-sidebar-wrapper');
        var $items_header = $('singles-page-sidebar-wrapper header');

        if ($(window).width() > 1024) {
            // We need margin but in Firefox is not possible to get value from selector eq. margin-right: auto
          if ($('.menu-fixed').hasClass('path-book') || $('.menu-fixed').hasClass('path-single')) {
            $('.page.with-sidebar').css({
              'padding-right': 0
            });
          }

          $('.page__main-content').addClass('open');

          $('.menu-opened').css({
            'right': 0
          });
        }

        $items.width(w - parseInt($items.css('padding-left')) * 2);
        $items_header.width(w - parseInt($items.css('padding-left')) * 2);
        $('singles-page-sidebar-wrapper .region').width(w + 50);
        if (fix_height) {
          var height_fix = $(window).height - $('.aside-content-wrapper').offset().top;
          $page_aside.find('.aside-content-wrapper').css({
            'height': height_fix
          });
          $page_aside.find('.all-singles').css({
            'overflow-y': 'scroll'
          });
          $page_aside.find('.author-list').css({
            'overflow-y': 'scroll'
          });
        }
        else {
          $page_aside.find('.aside-content-wrapper').css('overflow-y', 'scroll');
        }

        $(window).trigger('scroll');
      }, 50);
      if ($(this).width() > 980) {
        $emptyDiv.css('line-height', '');
      } else {
        $emptyDiv.css('line-height', ($header.height() - 20) + "px");
      }
    }).trigger('scroll').trigger('resize');

    $('.singles-page-sidebar-wrapper', $page_aside).click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      var pos = $page_aside.find('.singles-page-sidebar-wrapper').index($(this));
      if ($('.nav-main__extra .hamburger').css('display') != 'none' && $(window).width() <= 800) {
        $('.nav-main__extra .hamburger .hamburger-box').trigger('click');
      }
      if (!!(window.history && history.pushState)) {
        var h = $(this).attr("href");
        history.pushState({}, '', '/' + h);
        $("a .singles-page-sidebar-wrapper .active").attr("href", h)
      }

      var offset = 102;

      if ($body.hasClass('path-author')) {
        if ($(window).width() > 970) {
          offset = 102;
        } else {
          offset = 148;
        }
      } else if ($body.hasClass('path-sidetone')) {
        if ($(window).width() > 970) {
          offset = 180;
        } else {
          offset = 210;
        }
      } else if (pos > 0) {
        if ($(window).width() > 970) {
          offset = 53;
        } else {
          offset = 108;
        }
      }

      setScrollSidebar(true);
      $('body, html').stop(true, false).animate({'scrollTop': $('.scrollto', $content).eq(pos).offset().top - offset}, 500);

    });

  }

})(jQuery);
