// Size classes
var sizeClass = 'xs'
function updateSizeClassForWidth (width) {
	if (typeof width == 'number') {
		if (width >= 0) {
			if (width < 768) {
				sizeClass = 'xs'
			} else if (width < 1030) {
				sizeClass = 's'
			} else if (width < 1200) {
				sizeClass = 'm'
			} else {
				sizeClass = 'l'
			}
		} else {
			updateSizeClassForWidth(-width)
		}
	}
}



// Property Support
function isPropertySupported(property)
{
	return property in document.body.style;
}



// Animation
var defaultAnimationDuration = 400

class CSSAnimationEngine  {
	
	constructor () {
		
		this.animations = {}
		
	}
	
	
	updateStyleSheet () {
		var animationListString = ''
		for (var key in this.animations) {
			animationListString += this.animations[key] + ' '
		}
		
		$('#css-animations').text(animationListString)
	}
	
	
	addAnimation (name, animationString) {
		
		this.animations[name] = animationString
		this.updateStyleSheet()
	}
	
	
	
	
	
	polygonMorphAnimationStringWithName (name, initialPolygon, finalPolygon) {
		
		if (initialPolygon instanceof Polygon && finalPolygon instanceof Polygon) {
			if (initialPolygon.points.length == finalPolygon.points.length) {
				
				var verifiedName = name
				if (verifiedName == null) {
					verifiedName = 'default'
				}
				
				if (initialPolygon.containsOnlyValidPoints && finalPolygon.containsOnlyValidPoints) {
					
					return '@keyframes ' + verifiedName + ' { 0% { -webkit-clip-path: ' + initialPolygon.polygonString + ';} 100% { -webkit-clip-path: ' + finalPolygon.polygonString + ';} }'
					
				}
				
			}
		}
		
		// return '@keyframes ' + verifiedName+ ' { 0% { clip-path: ' + initialPolygon.polygonString + '; -webkit-clip-path: ' + initialPolygon.polygonString + ';} 100% { clip-path: ' + finalPolygon.polygonString + '; -webkit-clip-path: ' + finalPolygon.polygonString + ';} }'
	}
	
	
	
}

var globalCSSAnimationEngine = new CSSAnimationEngine()



// Stopwatch
class Stopwatch {
	constructor () {
		this.timePointZero = this.currentAbsoluteTime
	}
	
	reset (message) {
		if (message != null) {
			console.log(message)
		}
		this.timePointZero = this.currentAbsoluteTime
	}
	
	get currentAbsoluteTime () {
		return (new Date()).getTime()
	}
	
	get currentStopwatchTime () {
		return this.currentAbsoluteTime - this.timePointZero
	}
	
	logTime (message) {
		if (message == null) {
			message = ''
		} else {
			message = ' ' + message
		}
		console.log(this.currentStopwatchTime + message)
	}
}

var globalStopwatch = new Stopwatch()




// Math
function greaterOfTwo (first, second) {
	if (second > first) {
		return second
	}
	return first
}

function lesserOfTwo (first, second) {
	if (second < first) {
		return second
	}
	return first
}