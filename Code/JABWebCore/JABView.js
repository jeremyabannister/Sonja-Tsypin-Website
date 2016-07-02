class JABView {

	constructor (customId, parent, idNumber) {

		this.customId = customId
		
		if (parent != null) {
			
			this.parent = parent
			this.idNumber = idNumber
			
			this.id = ''
			this.updateId()

			this.view = ''
			this.updateViewString()
		}
		
		
		// Subviews
		this.subviews = []
		

		// Animation
		this.disableAnimationsTimer = setTimeout(function() {}, 0)

		
		this.masterAnimationOptions = { // Master animation options retains the information about which slots should inherit (indicated by null) and which are fixed to a value, while animationOptions holds the actual current values to be used for animation
			configureDuration: null,
			configureEasingFunction: null,
			configureDelay: null,
			
			positionDuration: null,
			positionEasingFunction: null,
			positionDelay: null
		}
		this.animationOptions = {
			configureDuration: null,
			configureEasingFunction: null,
			configureDelay: null,
			
			positionDuration: null,
			positionEasingFunction: null,
			positionDelay: null
		}
		this.willingToInheritAnimationOptions = true


		// Position
		this.frame = new CGRect()


		// Configuration
		this.opacity = 1
		this.backgroundColor = 'transparent'
		this.borderRadius = 0
		this.zIndex = 0
		
		
		this.overflow = 'visible'
		this.cursor = 'auto'

	
	
		// Other
		this.clickable = false		


	}




	//
	// Id
	//
	updateId () {
		
		var connectorString = '---'
		var id = ''
		
		if (this.parent != null) {
			if (this.parent.id != null) {
				id = this.parent.id
			}
		}
		
		if (this.customId != null) {
			if (this.customId.indexOf(connectorString) == -1) {
				if (id != '') {
					id = this.customId + connectorString + id
				} else {
					id = this.customId
				}
			}
		} else {
			if (id != '') {
				id = this.idNumber + connectorString + id
			} else {
				id = this.idNumber
			}
		}
		
		this.id = id
	}
	
	
	
	get selector () {
		return '#' + this.id
	}
	
	
	
	
	get subviewIdNumbersInUse () {
		
		var idNumbers = []
		for (var i = 0; i < this.subviews.length; i++) {
			idNumbers.push(this.subviews[i].idNumber)
		}
		return idNumbers
	}
	
	
	get nextAvailableIdNumber () {
		
		var currentIdNumbers = this.subviewIdNumbersInUse
		var currentHighestId = 0
		
		for (var i = 0; i < currentIdNumbers.length; i++) {
			if (currentIdNumbers[i] > currentHighestId) {
				currentHighestId = currentIdNumbers[i]
			}
		}
		return currentHighestId + 1
	}
	
	
	
	//
	// View
	//
	
	updateViewString () {
		
		this.updateId()
		this.view = "<div id='" + this.id + "'></div>"
	}
	
	
	//
	// Subviews
	//
	updateZIndiciesOfSubviews () {
		
		for (var i = 0; i < this.subviews.length; i++) {
			this.subviews[i].zIndex = i
		}
		
	}
	
	addSubview (subview) {
		if (subview instanceof JABView) {
			
			this.removeSubview(subview)
			this.subviews.push(subview)
			
			subview.parent = this
			subview.idNumber = this.nextAvailableIdNumber
			
			
			subview.updateViewString()
			$(this.selector).append(subview.view)
			$(subview.selector).css({
				'position':'absolute',
			})
			
			subview.init()
		}
		
		this.updateZIndiciesOfSubviews()
	}
	
	removeSubview (subview) {
		if (subview instanceof JABView) {
			var removed = false
			for (var i = 0; i < this.subviews.length; i++) {
				if (!removed) {
					if (this.subviews[i] == subview) {
						this.subviews.splice(i, 1)
						$(subview.selector).remove()
						subview.parent = null
						removed = true
					}
				}
			}
		}
		
		this.updateZIndiciesOfSubviews()
	}
	
	bringSubviewToFront (subview) {
		this.removeSubview(subview)
		this.addSubview(subview)
	}
	
	
	insertSubviewAboveSubview(insertedSubview, anchorSubview) {
		
		if (anchorSubview != insertedSubview) {
			if (anchorSubview instanceof JABView && insertedSubview instanceof JABView) {
				
				var indexOfInsertedSubview = this.indexOfSubview(insertedSubview)
				if (indexOfInsertedSubview != -1) {
					this.subviews.splice(indexOfInsertedSubview, 1)
				}
				
				var indexOfAnchorSubview = this.indexOfSubview(anchorSubview)
				if (indexOfAnchorSubview != -1) {
					
					this.subviews.splice(indexOfAnchorSubview + 1, 0, insertedSubview)
					this.updateZIndiciesOfSubviews()
				}
				
			}
		}
		
	}
	
	insertSubviewAboveSubviews (subview, subviews) {
		
		var highestSubview = null
		var highestSubviewIndex = -1
		if (subviews instanceof Array) {
			for (var i = 0; i < subviews.length; i++) {
				var currentSubview = subviews[i]
				var currentSubviewIndex = this.indexOfSubview(currentSubview)
				if (currentSubviewIndex > highestSubviewIndex) {
					highestSubview = currentSubview
					highestSubviewIndex = currentSubviewIndex
				}
			}
			
			if (highestSubview != null) {
				this.insertSubviewAboveSubview(subview, highestSubview)
			}
		}
	}
	
	indexOfSubview (subview) {
		
		var index = -1
		
		if (subview instanceof JABView) {
			for (var i = 0; i < this.subviews.length; i++) {
				if (this.subviews[i] == subview) {
					index = i
				}
			}
		}
		
		return index
	}
	
	subviewIsAboveSubview (subview1, subview2) {
		return (this.indexOfSubview(subview1) > this.indexOfSubview(subview2))
	}
	
	subviewIsAboveSubviews (subview, subviews) {
		if (subviews instanceof Array) {
			for (var i = 0; i < subviews.length; i++) {
				if (!this.subviewIsAboveSubview(subview, subviews[i])) {
					return false
				}
			}
		}
		
		return true
	}
	
	
	
	//
	// Animation
	//
	
	
	// Options
	inheritAnimationOptions (newAnimationOptions) {
		
		if (this.willingToInheritAnimationOptions) {
			for (var key in newAnimationOptions) {
				if (this.masterAnimationOptions[key] == null) {
					this.animationOptions[key] = newAnimationOptions[key]
				}
			}
			
			this.updateTransition()
			this.setSubviewsAnimationOptions(newAnimationOptions)
		}
	}
	
	
	
	
	get animationOptions () {
		return this._animationOptions
	}
	
	set animationOptions (newAnimationOptions) {
		this._animationOptions = newAnimationOptions
		this.updateTransition()
	}
	
	
	
	get configureDuration () {
		return this.animationOptions.configureDuration
	}
	
	set configureDuration (newConfigureDuration) {
		this.masterAnimationOptions.configureDuration = newConfigureDuration
		this.animationOptions.configureDuration = newConfigureDuration
	}
	
	
	
	get configureEasingFunction () {
		return this.animationOptions.configureEasingFunction
	}
	
	set configureEasingFunction (newConfigureEasingFunction) {
		this.masterAnimationOptions.configureEasingFunction = newConfigureEasingFunction
		this.animationOptions.configureEasingFunction = newConfigureEasingFunction
	}
	
	
	
	get configureDelay () {
		return this.animationOptions.configureDelay
	}
	
	set configureDelay (newConfigureDelay) {
		this.masterAnimationOptions.configureDelay = newConfigureDelay
		this.animationOptions.configureDelay = newConfigureDelay
	}
	
	
	
	
	get positionDuration () {
		return this.animationOptions.positionDuration
	}
	
	set positionDuration (newPositionDuration) {
		this.masterAnimationOptions.positionDuration = newPositionDuration
		this.animationOptions.positionDuration = newPositionDuration
	}
	
	
	
	get positionEasingFunction () {
		return this.animationOptions.positionEasingFunction
	}
	
	set positionEasingFunction (newPositionEasingFunction) {
		this.masterAnimationOptions.positionEasingFunction = newPositionEasingFunction
		this.animationOptions.positionEasingFunction = newPositionEasingFunction
	}
	
	
	
	get positionDelay () {
		return this.animationOptions.positionDelay
	}
	
	set positionDelay (newPositionDelay) {
		this.masterAnimationOptions.positionDelay = newPositionDelay
		this.animationOptions.positionDelay = newPositionDelay
	}
	
	
	
	
	
	
	
	// Transition
	updateTransition () {
		
		if (this.id == '1---Menu---Header---MainSector---ApplicationRoot') {
			// console.log(this.selector + ' is updating transition with ' + this.animationOptions.configureDuration)
		}
		
		var configureDuration = this.animationOptions.configureDuration || 0
		var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out'
		var configureDelay = this.animationOptions.configureDelay || 0
		
		
		var positionDuration = this.animationOptions.positionDuration || 0
		var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out'
		var positionDelay = this.animationOptions.positionDelay || 0
		
		$(this.selector).css({
			transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms'
		})
	}
	
	
	
	// Computed Properties
	get computedOpacity () {
		return $(this.selector).css('opacity')
	}
	
	get computerBackgroundColor () {
		return $(this.selector).css('background-color')
	}
	
	get computedBorderRadius () {
		return $(this.selector).css('border-radius')
	}
	
	
	
	
	
	get computedX () {
		var transformString = $(this.selector).css('transform')
		if (transformString != 'none') {
			return $(this.selector).css('transform').split('(')[1].split(')')[0].split(',')[4]
		}
		return 0
	}
	
	get computedY () {
		var transformString = $(this.selector).css('transform')
		if (transformString != 'none') {
			return $(this.selector).css('transform').split('(')[1].split(')')[0].split(',')[5]
		}
		return 0
	}
	
	get computedWidth () {
		return $(this.selector).css('width')
	}
	
	get computedHeight () {
		return $(this.selector).css('height')
	}
	
	
	// Stopping Animations
	stopOpacity () {
		$(this.selector).css({
			opacity: this.computedOpacity
		})
	}
	
	stopBackgroundColor () {
		$(this.selector).css({
			backgroundColor: this.computerBackgroundColor
		})
	}
	
	stopBorderRadius () {
		$(this.selector).css({
			borderRadius: this.computedBorderRadius
		})
	}
	
	
	
	
	
	stopConfiguration () {
		this.stopOpacity()
		this.stopBackgroundColor()
		this.stopBorderRadius()
	}
	
	
	
	
	
	
	stopX () {
		$(this.selector).css({
			transform: 'translate3d(' + this.computedX + 'px, ' + this.y + 'px, 0px)'
		})
	}
	
	stopY () {
		$(this.selector).css({
			transform: 'translate3d(' + this.x + 'px, ' + this.computedY + 'px, 0px)'
		})
	}
	
	
	stopTranslation () {
		this.stopX()
		this.stopY()
	}
	
	
	
	
	stopWidth () {
		$(this.selector).css({
			width: this.computedWidth
		})
	}
	
	stopHeight () {
		$(this.selector).css({
			height: this.computedHeight
		})
	}
	
	stopResizing () {
		this.stopWidth()
		this.stopHeight()
	}
	
	
	
	stopPositioning () {
		this.stopTranslation()
		this.stopResizing()
	}
	
	
	
	
	stopAllAnimation () {
		this.stopConfiguration()
		this.stopPositioning()
	}


	// Frame
	

	get frame () {
		if (this._frame != null) {
			return (new CGRect(this._frame.origin.x, this._frame.origin.y, this._frame.size.width, this._frame.size.height))
		}
		return new CGRect()
	}

	set frame (newFrame) {
		
		this.updateTransition()
		
		var scaled = ((newFrame.size.width != this.width) || (newFrame.size.height != this.height))
		var moved = ((newFrame.origin.x != this.x) || (newFrame.origin.y != this.y))
		var changed = (moved || scaled)


		this._frame = newFrame

		if (changed) {
			
			this.stopPositioning()
			$(this.selector).css({
				
				transform: 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)',

				width: this.width,
				height: this.height,
			})


			if (scaled) {
				this.updateAllUI()
			}
		}
	}


	// X
	get x () {
		return this.frame.origin.x
	}

	set x (newX) {
		this.frame = new CGRect(newX, this.frame.origin.y, this.frame.size.width, this.frame.size.height)
	}


	// Y
	get y () {
		return this.frame.origin.y
	}

	set y (newY) {
		this.frame = new CGRect(this.frame.origin.x, newY, this.frame.size.width, this.frame.size.height)
	}


	// Width
	get width () {
		return this.frame.size.width
	}

	set width (newWidth) {
		this.frame = new CGRect(this.frame.origin.x, this.frame.origin.y, newWidth, this.frame.size.height)
	}


	// Height
	get height () {
		return this.frame.size.height
	}

	set height (newHeight) {
		this.frame = new CGRect(this.frame.origin.x, this.frame.origin.y, this.frame.size.width, newHeight)
	}




	// Left
	get left () {
		return this.x
	}


	// Top
	get top () {
		return this.y
	}


	// Right
	get right () {
		return (this.x + this.width)
	}


	// Bottom
	get bottom () {
		return (this.y + this.height)
	}




	// Bounds
	get bounds () {
		return new CGRect(0, 0, this.width, this.height)
	}






	// Opacity
	get opacity () {
		return this._opacity
	}

	set opacity (newOpacity) {
		
		this._opacity = newOpacity
		
		this.updateTransition()
		this.stopOpacity()
		$(this.selector).css({
			opacity: newOpacity,
		})
	}
	
	// Background Color
	get backgroundColor () {
		return this._backgroundColor
	}

	set backgroundColor (newBackgroundColor) {
		this._backgroundColor = newBackgroundColor
		
		this.updateTransition()
		this.stopBackgroundColor()
		$(this.selector).css({
			'background-color': newBackgroundColor,
		})
	}
	
	
	// Border Radius
	get borderRadius () {
		return this._borderRadius
	}

	set borderRadius (newBorderRadius) {
		this._borderRadius = newBorderRadius
		
		this.updateTransition()
		this.stopBorderRadius()
		$(this.selector).css({
			'border-radius': newBorderRadius,
		})
	}


	// ZIndex
	get zIndex () {
		return this._zIndex
	}

	set zIndex (newZIndex) {
		
		this._zIndex = newZIndex
		$(this.selector).css({
			'z-index': newZIndex,
		})
	}








	// Overflow
	get overflow () {
		return this._overflow
	}

	set overflow (newOverflow) {
		this._overflow = newOverflow

		$(this.selector).css({
			'overflow': newOverflow,
		})
	}


	// Cursor
	get cursor () {
		return this._cursor
	}

	set cursor (newCursor) {
		this._cursor = newCursor


		$(this.selector).css({
			'cursor': newCursor,
		})

		$(this.selector).find('*').css({
			'cursor': newCursor,
		})
	}








	// Color Shortcuts

	red () {
		this.backgroundColor = 'red'
	}

	orange () {
		this.backgroundColor = 'orange'
	}

	yellow () {
		this.backgroundColor = 'yellow'
	}

	green () {
		this.backgroundColor = 'green'
	}

	cyan () {
		this.backgroundColor = 'cyan'
	}

	blue () {
		this.backgroundColor = 'blue'
	}

	purple () {
		this.backgroundColor = 'purple'
	}

	white () {
		this.backgroundColor = 'white'
	}

	black () {
		this.backgroundColor = 'black'
	}
	
	
	
	//
	// Other
	//
	
	
	get clickable () {
		return this._clickable
	}
	
	set clickable (newClickable) {
		this._clickable = newClickable
		
		var thisView = this
		$(this.selector).off()
		if (this.clickable) {
			$(this.selector).click(function() {
				thisView.parent.viewWasClicked(thisView)
			})
		} else {
			$(this.selector).click(function() {})
		}
	}


	//
	// Init
	//
	
	init () {
		
		this.addAllUI()
		
	}
	

	//
	// UI
	//
	
	addAllUI () {
		
	}
	
	
	updateAllUI () {



	}

	
	//
	// Animated Update
	//
	
	animatedUpdate (options, configureCompletion, positionCompletion) {
		
		if (typeof options == 'number') {
			options = {
				configureDuration: options,
				positionDuration: options
			}
		} else if (options == null) {
			options = {
				configureDuration: defaultAnimationDuration,
				positionDuration: defaultAnimationDuration,
			}
		}
		
		clearTimeout(this.disableAnimationsTimer)
		
		this.setSubviewsAnimationOptions(options)
		this.updateAllUI()


		var longestConfigureTime = this.longestConfigureAnimationTimeOfSelfAndSubviews()
		var longestPositionTime = this.longestPositionAnimationTimeOfSelfAndSubviews()
		var disableDuration = greaterOfTwo(longestConfigureTime, longestPositionTime)
		
		var thisView = this
		this.disableAnimationsTimer = setTimeout(function() {
			thisView.setSubviewsAnimationOptions({
				configureDuration: 0,
				configureEasingFunction: 'ease-in-out',
				configureDelay: 0,
				
				positionDuration: 0,
				positionEasingFunction: 'ease-in-out',
				positionDelay: 0
			})
		}, disableDuration)
		
		
		if (configureCompletion == null) {
			configureCompletion = function() {}
		}
		
		if (positionCompletion == null) {
			positionCompletion = function() {}
			longestConfigureTime = disableDuration // If there is only one completion passed then ensure that it occurs at the end of all animations
		}
		
		
		setTimeout(function() {
			configureCompletion()
		}, longestConfigureTime)
		
		setTimeout(function() {
			positionCompletion()
		}, longestPositionTime)
	}
	
	longestConfigureAnimationTimeOfSelfAndSubviews () {
		
		var longestTime = (this.animationOptions.configureDelay || 0) + (this.animationOptions.configureDuration || 0)
		for (var i = 0; i < this.subviews.length; i++) {
			longestTime = greaterOfTwo(longestTime, this.subviews[i].longestConfigureAnimationTimeOfSelfAndSubviews())
		}
		
		return longestTime
	}
	
	longestPositionAnimationTimeOfSelfAndSubviews () {
		
		var longestTime = (this.animationOptions.positionDelay || 0) + (this.animationOptions.positionDuration || 0)
		for (var i = 0; i < this.subviews.length; i++) {
			longestTime = greaterOfTwo(longestTime, this.subviews[i].longestPositionAnimationTimeOfSelfAndSubviews())
		}
		
		return longestTime
	}
	
	


	setSubviewsAnimationOptions (options) {
		for (var i = 0; i < this.subviews.length; i++) {
			this.subviews[i].inheritAnimationOptions(options)
		}
	}



}
