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
		
		
		//
		// Debug
		//
		
		this.debugTargetId = 'Underline---Menu---Header---ApplicationRoot'
		
		
		
		// Subviews
		this.subviews = []
		
		// State
		this.state = {}
		this.parameters = {}

		// Animation
		this.disableAnimationsTimer = setTimeout(function() {}, 0)
		this.clipPathSetTimer = setTimeout(function() {}, 0)
		
		this.masterAnimationOptions = { // Master animation options retains the information about which slots should inherit (indicated by null) and which are fixed to a value, while animationOptions holds the actual current values to be used for animation
			configureDuration: null,
			configureEasingFunction: null,
			configureDelay: null,
			
			positionDuration: null,
			positionEasingFunction: null,
			positionDelay: null,
			
			shapeDuration: null,
			shapeEasingFunction: null,
			shapeDelay: null
		}
		this.animationOptions = {
			configureDuration: null,
			configureEasingFunction: null,
			configureDelay: null,
			
			positionDuration: null,
			positionEasingFunction: null,
			positionDelay: null,
			
			shapeDuration: null,
			shapeEasingFunction: null,
			shapeDelay: null
		}
		this.willingToInheritAnimationOptions = true



		// Configuration
		this.opacity = 1
		this.backgroundColor = 'transparent'
		this.borderStyle = null
		this.borderWidth = null
		this.borderColor = null
		this.borderRadius = null
		this.blur = 0
		
		this.zIndex = 0
		this.position = 'absolute'
		this.overflowX = 'visible'
		this.overflowY = 'visible'
		this.overflow = 'visible'
		this.cursor = 'auto'
		this.animation = 'none'
		this.paddingLeft = 0
		this.paddingRight = 0
		this.paddingTop = 0
		this.paddingBottom = 0
		
		
		// Position
		this.frame = new CGRect()
		this.angle = 0
		
		// Shape
		this.clipPath = 'none'
	
	
		// Other
		this.clickable = false
		this.hoverable = false
		
		
		viewHierarchy.push(this)
	}

	


	//
	// Id
	//
	updateId () {
		
		var view = this
		var connectorString = '---'
		
		function idTail () {
			if (view.parent != null) {
				if (view.parent.id != null) {
					return connectorString + view.parent.id
				}
			}
			return ''
		}
		function displayId () {
			if (view.customId != null) {
				if (view.customId.indexOf(connectorString) == -1) {
					return view.customId
				}
			}
			return view.idNumber
		}
		
		this.id = displayId() + idTail()
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
	
	
	
	get scrollTop () {
		return $(this.selector).scrollTop()
	}
	
	set scrollTop (newScrollTop) {
		$(this.selector).scrollTop(newScrollTop)
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
			subview.position = 'absolute'
			
			// console.log('initing ' + subview.id)
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
		this.insertSubviewAboveSubviews(subview, this.subviews)
	}
	
	pushSubviewToBack (subview) {
		
		if (subview instanceof JABView) {
			
			var indexOfSubview = this.indexOfSubview(subview)
			if (indexOfSubview != -1) {
				this.subviews.splice(indexOfSubview, 1)
			}
			
			this.subviews.splice(0, 0, subview)
			this.updateZIndiciesOfSubviews()
			
		}
		
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
	
	
	
	subviewIsBelowSubview (subview1, subview2) {
		return (this.indexOfSubview(subview1) < this.indexOfSubview(subview2))
	}
	
	subviewIsBelowSubviews (subview, subviews) {
		if (subviews instanceof Array) {
			for (var i = 0; i < subviews.length; i++) {
				if (!this.subviewIsBelowSubview(subview, subviews[i])) {
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
	
	
	// Configure Animation Options
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
	
	
	// Position Animation Options
	
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
	
	
	
	
	// Shape Animation Options
	get shapeDuration () {
		return this.animationOptions.shapeDuration
	}
	
	set shapeDuration (newShapeDuration) {
		this.masterAnimationOptions.shapeDuration = newShapeDuration
		this.animationOptions.shapeDuration = newShapeDuration
	}
	
	
	get shapeEasingFunction () {
		return this.animationOptions.shapeEasingFunction
	}
	
	set shapeEasingFunction (newShapeEasingFunction) {
		this.masterAnimationOptions.shapeEasingFunction = newShapeEasingFunction
		this.animationOptions.shapeEasingFunction = newShapeEasingFunction
	}
	
	
	
	get shapeDelay () {
		return this.animationOptions.shapeDelay
	}
	
	set shapeDelay (newShapeDelay) {
		this.masterAnimationOptions.shapeDelay = newShapeDelay
		this.animationOptions.shapeDelay = newShapeDelay
	}
	
	
	
	
	
	
	
	// State
	get state () {
		return this._state
	}
	
	set state (newState) {
		if (this.state == null) {
			this._state = {}
		}
		for (var key in newState) {
			this._state[key] = newState[key]
		}
	}
	
	
	
	// Parameters
	get parameters () {
		return this._parameters
	}
	
	set parameters (newParameters) {
		if (this.parameters == null) {
			this._parameters = {}
		}
		for (var key in newParameters) {
			this._parameters[key] = newParameters[key]
		}
	}
	
	
	
	// Transition
	updateTransition () {
		
		
		var configureDuration = this.animationOptions.configureDuration || 0
		var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out'
		var configureDelay = this.animationOptions.configureDelay || 0
		
		
		var positionDuration = this.animationOptions.positionDuration || 0
		var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out'
		var positionDelay = this.animationOptions.positionDelay || 0
		
		
		
		
		$(this.selector).css({
			transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, -webkit-backdrop-filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms'
		})
	}
	
	
	//
	// Computed Properties
	//
	
	// Configure
	get computedOpacity () {
		return $(this.selector).css('opacity')
	}
	
	get computerBackgroundColor () {
		return $(this.selector).css('background-color')
	}
	
	get computedBorderRadius () {
		return $(this.selector).css('border-radius')
	}
	
	get computedFilter () {
		return $(this.selector).css('filter')
	}
	
	get computedFilterWebkit () {
		return $(this.selector).css('-webkit-filter')
	}
	
	get computedFilterMoz () {
		return $(this.selector).css('-moz-filter')
	}
	
	get computedFilterO () {
		return $(this.selector).css('-o-filter')
	}
	
	get computedFilterMS () {
		return $(this.selector).css('-ms-filter')
	}
	
	get computedBackdropBlur () {
		return $(this.selector).css('-webkit-backdrop-blur')
	}
	
	
	
	
	// Position
	
	get computedX () {
		
		var transformString = $(this.selector).css('transform')
		if (transformString != 'none' && transformString != undefined) {
			
			return $(this.selector).css('transform').split('(')[1].split(')')[0].split(',')[4]
		}
		return 0
	}
	
	get computedY () {
		var transformString = $(this.selector).css('transform')
		if (transformString != 'none' && transformString != undefined) {
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
	
	
	
	// Shape
	get computedClipPath () {
		return $(this.selector).css('-webkit-clip-path')
	}
	
	
	//
	// Stopping Animations
	//
	
	
	// Configure
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
	
	stopBlur () {
		$(this.selector).css({
			'-webkit-filter': this.computedFilterWebkit,
			'-moz-filter': this.computedFilterMoz,
			'-o-filter': this.computedFilterO,
			'-ms-filter': this.computedFilterMS,
			'filter': this.computedFilter
		})
	}
	
	stopBackdropBlur () {
		$(this.selector).css({
			'-webkit-backdrop-blur': this.computerBackdropBlur
		})
	}
	
	
	
	
	
	stopConfiguration () {
		this.stopOpacity()
		this.stopBackgroundColor()
		this.stopBorderRadius()
	}
	
	
	
	
	
	// Position
	
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
	
	
	
	
	
	
	// Shape
	stopClipPath () {
		clearTimeout(this.clipPathSetTimer)
		$(this.selector).css({
			'animation-play-state': 'paused',
			'-webkit-animation-play-state': 'paused'
		})
		$(this.selector).css({
			'clip-path': this.computedClipPath,
			'-webkit-clip-path': this.computedClipPath
		})
		this._clipPath = new Polygon(this.computedClipPath)
		this.animation = 'none'
		$(this.selector).css({
			'animation-play-state': 'running',
			'-webkit-animation-play-state': 'running'
		})
		
	}
	
	
	
	stopShape () {
		this.stopClipPath()
	}
	
	
	
	
	stopAllAnimation () {
		this.stopConfiguration()
		this.stopPositioning()
		this.stopShape()
	}



	//
	//
	// Configuration
	//
	//
	
	
	
	//
	// Animatable
	//

	// Opacity
	get opacity () {
		return this._opacity
	}

	set opacity (newOpacity) {
		
		if (this.opacity != newOpacity) {
			this._opacity = newOpacity
			
			this.updateTransition()
			this.stopOpacity()
			$(this.selector).css({
				opacity: newOpacity,
			})
		}
	}
	
	// Background Color
	get backgroundColor () {
		return this._backgroundColor
	}

	set backgroundColor (newBackgroundColor) {
		
		if (this.backgroundColor != newBackgroundColor) {
			this._backgroundColor = newBackgroundColor
			
			this.updateTransition()
			this.stopBackgroundColor()
			$(this.selector).css({
				'background-color': newBackgroundColor,
			})
		}
	}
	
	
	
	// Border Style
	get borderStyle () {
		return this._borderStyle
	}
	
	set borderStyle (newBorderStyle) {
		if (this.borderStyle != newBorderStyle) {
			this._borderStyle = newBorderStyle
			
			$(this.selector).css({
				'border-style': newBorderStyle
			})
		}
	}
	
	
	// Border Width
	get borderWidth () {
		return this._borderWidth
	}
	
	set borderWidth (newBorderWidth) {
		if (this.borderWidth != newBorderWidth) {
			this._borderWidth = newBorderWidth
			
			$(this.selector).css({
				'border-width': newBorderWidth + 'px'
			})
		}
	}
	
	
	
	// Border Color
	get borderColor () {
		return this._borderColor
	}
	
	set borderColor (newBorderColor) {
		if (this.borderColor != newBorderColor) {
			this._borderColor = newBorderColor
			
			$(this.selector).css({
				'border-color': newBorderColor
			})
		}
	}
	
	
	
	// Border Radius
	get borderRadius () {
		return this._borderRadius
	}

	set borderRadius (newBorderRadius) {
		
		if (this.borderRadius !=  newBorderRadius) {
			this._borderRadius = newBorderRadius
			
			this.updateTransition()
			this.stopBorderRadius()
			$(this.selector).css({
				'border-radius': newBorderRadius,
			})
		}
	}

	
	// Blur
	get blur () {
		return this._blur
	}
	
	set blur (newBlur) {
		if (this.blur != newBlur) {
			this._blur = newBlur
			
			this.updateTransition()
			this.stopBlur()
			$(this.selector).css({
				'-webkit-filter': 'blur(' + newBlur + 'px)',
				'-moz-filter': 'blur(' + newBlur + 'px)',
				'-o-filter': 'blur(' + newBlur + 'px)',
				'-ms-filter': 'blur(' + newBlur + 'px)',
				'filter': 'blur(' + newBlur + 'px)'
			})
		}
	}
	
	
	get backdropBlur () {
		return this._backdropBlur
	}
	
	
	set backdropBlur (newBackdropBlur) {
		if (this.backdropBlur != newBackdropBlur) {
			this._backdropBlur = newBackdropBlur
			
			this.updateTransition()
			this.stopBackdropBlur()
			$(this.selector).css({
				'-webkit-backdrop-filter': 'blur(' + newBackdropBlur + 'px)'
			})
		}
	}








	//
	// Non-Animatable
	//
	
	// ZIndex
	get zIndex () {
		return this._zIndex
	}

	set zIndex (newZIndex) {
		
		if (this.zIndex != newZIndex) {
			this._zIndex = newZIndex
			$(this.selector).css({
				'z-index': newZIndex,
			})
		}
	}


	// Position
	get position () {
		return this._position
	}
	
	set position (newPosition) {
		this._position = newPosition
		$(this.selector).css({
			'position': newPosition
		})
	}


	// Overflow
	get overflowX () {
		return this._overflowX
	}
	
	set overflowX (newOverflowX) {
		if (this.overflowX != newOverflowX) {
			this._overflowX = newOverflowX
			
			$(this.selector).css({
				'overflow-x': newOverflowX,
				'-webkit-overflow-scrolling': 'touch',
			})
		}
	}
	
	
	get overflowY () {
		return this._overflowY
	}
	
	set overflowY (newOverflowY) {
		if (this.overflowY != newOverflowY) {
			this._overflowY = newOverflowY
			
			$(this.selector).css({
				'overflow-y': newOverflowY,
				'-webkit-overflow-scrolling': 'touch',
			})
		}
	}
	
	
	
	
	get overflow () {
		return this._overflow
	}

	set overflow (newOverflow) {
		
		if (this.overflow != newOverflow) {
			this._overflow = newOverflow

			$(this.selector).css({
				'overflow': newOverflow,
				'-webkit-overflow-scrolling': 'touch',
			})
		}
	}


	// Cursor
	get cursor () {
		return this._cursor
	}

	set cursor (newCursor) {
		
		if (this.cursor != newCursor) {
			this._cursor = newCursor

			$(this.selector).css({
				'cursor': newCursor,
			})

			$(this.selector).find('*').css({
				'cursor': newCursor,
			})
		}
	}
	
	
	// Animation
	get animation () {
		return this._animation
	}
	
	set animation (newAnimation) {
		if (this.animation != newAnimation) {
			this._animation = newAnimation
			
			$(this.selector).css({
				'animation': newAnimation
			})
		}
	}
	
	
	
	// Padding Left
	get paddingLeft () {
		return this._paddingLeft
	}
	
	set paddingLeft (newPaddingLeft) {
		if (this.paddingLeft != newPaddingLeft) {
			this._paddingLeft = newPaddingLeft
			
			$(this.selector).css({
				'padding-left': newPaddingLeft + 'px'
			})
		}
	}
	
	
	// Padding Right
	get paddingRight () {
		return this._paddingRight
	}
	
	set paddingRight (newPaddingRight) {
		if (this.paddingRight != newPaddingRight) {
			this._paddingRight = newPaddingRight
			
			$(this.selector).css({
				'padding-right': newPaddingRight + 'px'
			})
		}
	}
	
	
	// Padding Top
	get paddingTop () {
		return this._paddingTop
	}
	
	set paddingTop (newPaddingTop) {
		if (this.paddingTop != newPaddingTop) {
			this._paddingTop = newPaddingTop
			
			$(this.selector).css({
				'padding-top': newPaddingTop + 'px'
			})
		}
	}
	
	
	// Padding Bottom
	get paddingBottom () {
		return this._paddingBottom
	}
	
	set paddingBottom (newPaddingBottom) {
		if (this.paddingBottom != newPaddingBottom) {
			this._paddingBottom = newPaddingBottom
			
			$(this.selector).css({
				'padding-bottom': newPaddingBottom + 'px'
			})
		}
	}
	
	
	
	//
	// Scrolling
	//
	
	scrollTo (newScrollTop, duration, easingFunction) {
		$(this.selector).animate({
			'scrollTop': newScrollTop
		}, {
			duration: duration + 'ms',
			easingFunction: easingFunction,
		})
	}
	
	
	//
	//
	// Position
	//
	//
	
	
	get frame () {
		if (this._frame != null) {
			return (new CGRect(this._frame.origin.x, this._frame.origin.y, this._frame.size.width, this._frame.size.height))
		}
		return new CGRect()
	}

	set frame (newFrame) {
		
		
		var scaled = ((newFrame.size.width != this.width) || (newFrame.size.height != this.height))
		var moved = ((newFrame.origin.x != this.x) || (newFrame.origin.y != this.y))
		var changed = (moved || scaled)


		this._frame = newFrame

		if (changed) {
			
			this.updateTransition()
			this.stopPositioning()
			
			var rotationTransform = ''
			if (this.angle != null && this.angle != 0) {
				rotationTransform = ' rotate(' + this.angle + 'deg)'
			}
			
			
			$(this.selector).css({
				
				transform: 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)' + rotationTransform,

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
	
	
	
	
	// Angle
	get angle () {
		return this._angle
	}
	
	set angle (newAngle) {
		
		var changed = (this.angle != newAngle)
		
		if (changed) {
			
			this._angle = newAngle
			this.updateTransition()
			var rotationTransform = ''
			if (this.angle != null && this.angle != 0) {
				rotationTransform = ' rotate(' + this.angle + 'deg)'
			}
			
			$(this.selector).css({
				transform: 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)' + rotationTransform,
			})
		}
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
	
	
	
	
	
	//
	//
	// Shape
	//
	//
	
	
	// Clip Path
	get clipPath () {
		return this._clipPath
	}
	
	set clipPath (newClipPath) {
		
		this.stopClipPath()
		
		var changed = true
		var sameNumberOfPoints = false
		if (this.clipPath instanceof Polygon && newClipPath instanceof Polygon) {
			changed = !this.clipPath.isEqualToPolygon(newClipPath)
			if (this.clipPath.points.length == newClipPath.points.length) {
				sameNumberOfPoints = true
			}
		}
		
		if (changed) {
			this.stopClipPath()
			
			if (this.shapeDuration != 0 && this.shapeDuration != null && this.clipPath != null && sameNumberOfPoints) {
				
				globalCSSAnimationEngine.addAnimation(this.id, globalCSSAnimationEngine.polygonMorphAnimationStringWithName(this.id, this.clipPath, newClipPath))
				
				var easingFunction = this.shapeEasingFunction || 'ease-in-out'
				var delay = this.shapeDelay || 0
				
				
				this.animation = this.id + ' ' + this.shapeDuration + 'ms ' + easingFunction + ' ' + delay + 'ms'
				
			}
			
			var timeoutDuration = 0
			if (this.clipPath != null && sameNumberOfPoints) {
				timeoutDuration = this.longestShapeAnimationTimeOfSelfAndSubviews()
			}
			
			
			
			this._clipPath = newClipPath
			
			var thisView = this
			this.clipPathSetTimer = setTimeout(function() {
				thisView.animation = 'none'
				$(thisView.selector).css({
					'clip-path': newClipPath.polygonString,
					'-webkit-clip-path': newClipPath.polygonString
				})
				
				
			}, timeoutDuration)
			
			
		}
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
		
		var changed = this.clickable != newClickable
		
		if (changed) {
			this._clickable = newClickable
			
			var thisView = this
			$(this.selector).off()
			if (this.clickable) {
				$(this.selector).click(function() {
					thisView.parent.viewWasClicked(thisView)
				})
				
				$(this.selector).css({
					'-webkit-touch-callout': 'none',
					'-webkit-user-select': 'none',
					'-khtml-user-select': 'none',
					'moz-user-select': 'none',
					'-ms-user-select': 'none',
					'user-select': 'none',
				})
			} else {
				$(this.selector).click(function() {})
				$(this.selector).css({
					'-webkit-touch-callout': 'text',
					'-webkit-user-select': 'text',
					'-khtml-user-select': 'text',
					'moz-user-select': 'text',
					'-ms-user-select': 'text',
					'user-select': 'text',
				})
			}
		}
	}
	
	
	
	get hoverable () {
		return this._hoverable
	}
	
	set hoverable (newHoverable) {
		
		var changed = this.hoverable != newHoverable
		
		if (changed) {
			this._hoverable = newHoverable
			
			var thisView = this
			$(this.selector).off()
			if (this.hoverable) {
				$(this.selector).hover(function() {
					thisView.parent.viewWasHovered(thisView)
				}, function(){
					thisView.parent.viewWasUnhovered(thisView)
				})
			} else {
				$(this.selector).hover(function() {}, function() {})
			}
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
	
	animatedUpdate (options, configureCompletion, positionCompletion, shapeCompletion) {
		
		if (typeof options == 'number') {
			options = {
				configureDuration: options,
				positionDuration: options,
				shapeDuration: options,
			}
		} else if (options == null) {
			options = {
				configureDuration: defaultAnimationDuration,
				positionDuration: defaultAnimationDuration,
				shapeDuration: defaultAnimationDuration,
			}
		}
		
		clearTimeout(this.disableAnimationsTimer)
		
		this.setSubviewsAnimationOptions(options)
		this.updateAllUI()


		var longestConfigureTime = this.longestConfigureAnimationTimeOfSelfAndSubviews()
		var longestPositionTime = this.longestPositionAnimationTimeOfSelfAndSubviews()
		var longestShapeTime = this.longestShapeAnimationTimeOfSelfAndSubviews()
		var disableDuration = greaterOfTwo(longestConfigureTime, longestPositionTime)
		
		var thisView = this
		this.disableAnimationsTimer = setTimeout(function() {
			thisView.setSubviewsAnimationOptions({
				configureDuration: 0,
				configureEasingFunction: 'ease-in-out',
				configureDelay: 0,
				
				positionDuration: 0,
				positionEasingFunction: 'ease-in-out',
				positionDelay: 0,
				
				shapeDuration: 0,
				shapeEasingFunction: 'ease-in-out',
				shapeDelay: 0,
			})
		}, disableDuration)
		
		
		if (configureCompletion == null) {
			configureCompletion = function() {}
		}
		
		if (positionCompletion == null) {
			positionCompletion = function() {}
		}
		
		if (shapeCompletion == null) {
			shapeCompletion = function() {}
			longestConfigureTime = disableDuration // If there is only one completion passed then ensure that it occurs at the end of all animations
		}
		
		
		setTimeout(function() {
			configureCompletion()
		}, longestConfigureTime)
		
		setTimeout(function() {
			positionCompletion()
		}, longestPositionTime)
		
		setTimeout(function() {
			shapeCompletion()
		}, longestShapeTime)
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
	
	
	longestShapeAnimationTimeOfSelfAndSubviews () {
		
		var longestTime = (this.animationOptions.shapeDelay || 0) + (this.animationOptions.shapeDuration || 0)
		for (var i = 0; i < this.subviews.length; i++) {
			longestTime = greaterOfTwo(longestTime, this.subviews[i].longestShapeAnimationTimeOfSelfAndSubviews())
		}
		
		return longestTime
	}
	
	


	setSubviewsAnimationOptions (options) {
		for (var i = 0; i < this.subviews.length; i++) {
			this.subviews[i].inheritAnimationOptions(options)
		}
	}





	//
	// Debug
	//
	
	debugLog (message) {
		if (this.id == this.debugTargetId) {
			console.log(message)
		}
	}


}
