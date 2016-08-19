'use strict';

//
// Application Root
//

var applicationRoot;

//
// Initialization
//

$(document).ready(function () {

  fontSpy('siteFont'); // This causes the custom font 'siteFont' to be loaded so that the widths of the text elements of the website can be accurately calculated
});

$(window).load(function () {

  applicationRoot = new ApplicationRoot('ApplicationRoot');
  applicationRoot.addAllUI();
  configureApplicationRoot();
  positionApplicationRoot();

  /*
  $(applicationRoot.selector).append("<div id='hello'></div>")
  $('#hello').css({
   'background-color': 'red',
   'width': '400',
   'height': '300',
   'position': 'fixed'
  })
  */
});

$(window).resize(function () {

  websiteIsResizing = true;
  positionApplicationRoot();
  websiteIsResizing = false;
});

$(document).keydown(function (event) {
  var keyCode = event.keyCode || event.which;
  if (keyCode == 32) {
    event.preventDefault();
    applicationRoot.spaceBarWasPressed();
  } else if (keyCode == 37) {
    event.preventDefault();
    applicationRoot.leftArrowWasPressed();
  } else if (keyCode == 38) {
    event.preventDefault();
    applicationRoot.upArrowWasPressed();
  } else if (keyCode == 39) {
    event.preventDefault();
    applicationRoot.rightArrowWasPressed();
  } else if (keyCode == 40) {
    event.preventDefault();
    applicationRoot.downArrowWasPressed();
  }
});

function configureApplicationRoot() {
  applicationRoot.overflow = 'hidden';
}

function positionApplicationRoot() {
  applicationRoot.frame = new CGRect(0, 0, $('body').width(), $('body').height());
}

// Custom Easing Function
$.extend(jQuery.easing, { ease: function ease(x, t, b, c, d) {
    return x * x * Math.cos(1.05 * x) / 0.497571;
  } });

// Scroll detection
/*
var lethargy = new Lethargy(); // Use defaults
$(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll', function(e){
    e.preventDefault()
    e.stopPropagation();
    if(lethargy.check(e) !== false) {
      applicationRoot.userDidScrollByAmount(-e.originalEvent.deltaY)
    }
});
*/

$(document).bind('mousewheel', function (evt) {

  var delta = evt.originalEvent.wheelDelta;
  applicationRoot.userDidScrollByAmount(delta);
});