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




// Animation
var defaultAnimationDuration = 400



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