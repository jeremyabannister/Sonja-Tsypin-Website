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
	
	reset () {
		this.timePointZero = this.currentAbsoluteTime
	}
	
	get currentAbsoluteTime () {
		return (new Date()).getTime()
	}
	
	get currentStopwatchTime () {
		return this.currentAbsoluteTime - this.timePointZero
	}
	
	logTime () {
		console.log(this.currentStopwatchTime)
	}
}

var globalStopwatch = new Stopwatch()

