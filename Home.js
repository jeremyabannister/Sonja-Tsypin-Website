
//
// Application Root
//

var applicationRoot

//
// Initialization
//

$(document).ready(function() {
  fontSpy('siteFont') // This causes the custom font 'siteFont' to be loaded so that the widths of the text elements of the website can be accurately calculated
})

$(window).load(function() {

  
   applicationRoot = new ApplicationRoot('ApplicationRoot')
   applicationRoot.addAllUI()
   positionApplicationRoot()

})

$(window).resize(function() {

	positionApplicationRoot()

})

function positionApplicationRoot () {
  applicationRoot.frame = new CGRect(0, 0, $('body').width(), $('body').height())
}


// Custom Easing Function
$.extend(jQuery.easing,{ease:function(x,t,b,c,d) {
  return x*x*Math.cos(1.05 * x)/0.497571;
}})


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

var userIsScrolling = false
var userStoppedScrollingTimeout

$(document).bind('mousewheel', function(evt) {
    var delta = evt.originalEvent.wheelDelta

    clearTimeout(userStoppedScrollingTimeout)
    userIsScrolling = true
    applicationRoot.userDidScrollByAmount(delta)
    setTimeoutForUserStoppedScrolling()
})

function setTimeoutForUserStoppedScrolling () {
	userStoppedScrollingTimeout = setTimeout(function() {
		userIsScrolling = false
		applicationRoot.userDidStopScrolling()
	}, 20)
}


