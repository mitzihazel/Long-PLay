// We define a function that takes one parameter named $.
(function ($) {
  // Use jQuery with the shortcut:
  $(document).ready(function(){
    $('.bxslider').bxSlider({
      mode: 'horizontal',
      captions: false,
      minSlides: 2,
      maxSlides: 2,
      slideWidth: 600,
      slideMargin: 10,
      nextSelector: '#slider-next',
      prevSelector: '#slider-prev',
      nextText: ' &#xf178; ',
      prevText: ' &#xf177; '
    });
  });
// Here we immediately call the function with jQuery as the parameter.
}(jQuery));
