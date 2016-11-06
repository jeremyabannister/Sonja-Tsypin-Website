
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
   $('body').append(applicationRoot.view)
   applicationRoot.init()
   configureApplicationRoot()
   positionApplicationRoot()
   
})

$(window).resize(function() {
  
  websiteIsResizing = true
	positionApplicationRoot()
  websiteIsResizing = false

})

$(document).keydown(function(event) {
  var keyCode = event.keyCode || event.which
  if (keyCode == 32) {
    event.preventDefault()
    applicationRoot.spaceBarWasPressed()
  } else if (keyCode == 37) {
    event.preventDefault()
    applicationRoot.leftArrowWasPressed()
    // applicationRoot.leftSwipeDetected()
  } else if (keyCode == 38) {
    event.preventDefault()
    applicationRoot.upArrowWasPressed()
  } else if (keyCode == 39) {
    event.preventDefault()
    applicationRoot.rightArrowWasPressed()
    // applicationRoot.rightSwipeDetected()
  } else if (keyCode == 40) {
    event.preventDefault()
    applicationRoot.downArrowWasPressed()
  }
  
})


function configureApplicationRoot () {
  applicationRoot.overflow = 'hidden'
}

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

$(document).bind('mousewheel', function(evt) {
  
  var delta = evt.originalEvent.wheelDelta
  applicationRoot.userDidScrollByAmount(delta)
  
  
})


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                       
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            // evt.preventDefault()
            applicationRoot.leftSwipeDetected()
        } else {
            /* right swipe */
            // evt.preventDefault()
            applicationRoot.rightSwipeDetected()
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            // evt.preventDefault()
            applicationRoot.upSwipeDetected()
        } else { 
            /* down swipe */
            // evt.preventDefault()
            applicationRoot.downSwipeDetected()
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};


