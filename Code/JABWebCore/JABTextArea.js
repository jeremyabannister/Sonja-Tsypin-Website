class JABTextArea extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		// Configuration
		this.font = new UIFont()
		this.textColor = 'black'
		this.textAlign = null
		this.wordBreak = null
		this.hyphenate = null
		this.placeholder = ''
		
		// Parameters
		
		// UI*
		this.textArea = "<textarea></textarea>"
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.startEventListeners()
	}
	
	
	
	//
	// Getters and Setters
	//
	
	
	
	// Font
	get font () {
		return this._font
	}

	set font (newFont) {
		this._font = newFont
		
		// for (var i = 0; i < this.stateSelectors.length; i++) {
		// 	var property = this[this.stateSelectors[i]]
		// 	if (property != null) {
		// 		cssOptions[this.correspondingCSSSelectors[i]] = property
		// 	}
		// }
		
		$(this.selector + ' > textarea').css({
			'fontSize': newFont.size,
			'font-family': newFont.family,
			'font-weight': newFont.weight,
			'font-style': newFont.style,
			'font-variant': newFont.variant,
			'letter-spacing': newFont.letterSpacing,
			'line-height': newFont.lineHeight,
		})
	}
		
	
	
	// Text Color
	get textColor () {
		return this._textColor
	}
	
	set textColor (newTextColor) {
		if (this.textColor != newTextColor) {
			this._textColor = newTextColor
			
			$(this.selector + ' > textarea').css({
				'color': newTextColor,
			})
		}
	}
	
	
	// Text Align
	get textAlign () {
		return this._textAlign
	}
	
	set textAlign (newTextAlign) {
		this._textAlign = newTextAlign
		
		if (newTextAlign != null) {
			$(this.selector).css({
				'text-align': newTextAlign
			})
		}
	}
	
	
	// Word Break
	get wordBreak () {
		return this._wordBreak
	}
	
	set wordBreak (newWordBreak) {
		this._wordBreak = newWordBreak
		
		if (newWordBreak != null) {
			$(this.selector + ' > textarea').css({
				'word-break': newWordBreak
			})
		}
	}
	
	
	
	// Hyphenate
	get hyphenate () {
		return this._hyphenate
	}
	
	set hyphenate (newHyphenate) {
		this._hyphenate = newHyphenate
		
		if (newHyphenate) {
			$(this.selector + ' > textarea').css({
				'-webkit-hyphens': 'auto',
				'-moz-hyphens': 'auto',
				'-ms-hyphens': 'auto',
				'hyphens': 'auto'
			})
		} else {
			$(this.selector + ' > textarea').css({
				'-webkit-hyphens': 'none',
				'-moz-hyphens': 'none',
				'-ms-hyphens': 'none',
				'hyphens': 'none'
			})
		}
	}
	
	
	// Placeholder
	get placeholder () {
		return this._placeholder
	}
	
	set placeholder (newPlaceholder) {
		if (this.placeholder != newPlaceholder) {
			this._placeholder = newPlaceholder
			
			$(this.selector + ' > textarea').attr({
				'placeholder': newPlaceholder,
			})
		}
	}
	
	
	//
	// Font properties
	//

	// Font Size
	get fontSize () {
		return this.font.size
	}

	set fontSize (newFontSize) {
		this.font.size = newFontSize
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}



	// Font Family
	get fontFamily () {
		return this.font.family
	}

	set fontFamily (newFontFamily) {
		this.font.family = newFontFamily
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}



	// Font Weight
	get fontWeight () {
		return this.font.weight
	}

	set fontWeight (newFontWeight) {
		this.font.weight = newFontWeight
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}



	// Font Style
	get fontStyle () {
		return this.font.style
	}

	set fontStyle (newFontStyle) {
		this.font.style = newFontStyle
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}



	// Font Variant
	get fontVariant () {
		return this.font.variant
	}

	set fontVariant (newFontVariant) {
		this.font.variant = newFontVariant
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}



	// Letter Spacing
	get letterSpacing () {
		return this.font.letterSpacing
	}

	set letterSpacing (newLetterSpacing) {
		this.font.letterSpacing = newLetterSpacing
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}

	
	
	// Line Height
	get lineHeight () {
		return this.font.lineHeight
	}
	
	set lineHeight (newLineHeight) {
		this.font.lineHeight = newLineHeight
		this.font = this.font // Reassiging the font triggers set font which updates the DOM
	}
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		$(this.selector).append(this.textArea)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureTextArea()
		this.positionTextArea()
	}
	
	
	configureTextArea () {
		
		var configureDuration = this.animationOptions.configureDuration || 0
		var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out'
		var configureDelay = this.animationOptions.configureDelay || 0
		
		
		var positionDuration = this.animationOptions.positionDuration || 0
		var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out'
		var positionDelay = this.animationOptions.positionDelay || 0
		
		$(this.selector + ' > textarea').css({
			transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, -webkit-backdrop-filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms',
			
			'background': 'none',
			'border': 'none',
		})
		
	}
	
	
	positionTextArea () {
		
		$(this.selector + ' > textarea').css({
			'width': this.width + 'px',
			'height': this.height + 'px',
		})
	}
	
	
	//
	// Event Listeners
	//
	
	startEventListeners () {
		var textarea = this
		$(this.selector + ' > textarea').keydown(function(event) {
			textarea.keyWasReleased(event)
		})
	}
	
	
	//
	// Actions
	//
	
	
	keyWasReleased (event) {
		var keyCode = event.keyCode ||  event.which
		
		if (keyCode == 9) {
			event.preventDefault()
			$(this.selector + ' > textarea').val($(this.selector + ' > textarea').val() + '        ')
		}
	}
	
	//
	// Delegate
	//
	
}