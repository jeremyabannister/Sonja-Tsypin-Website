class UILabel extends JABView {

	constructor (customId) {
		super(customId)

		// State
		this.text = ''
		this.font = new UIFont()
		this.textColor = '#000000'
		this.textAlign = null
		

		

		// UI
	}



	updateAllUI () {
		super.updateAllUI()



	}



	//
	// Property Getters and Setters
	//


	// Text
	get text () {
		return this._text
	}

	set text (newText) {
		this._text = newText
		$(this.selector).text(newText)
	}


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
		
		$(this.selector).css({
			'fontSize': newFont.size,
			'font-family': newFont.family,
			'font-weight': newFont.weight,
			'font-style': newFont.style,
			'font-variant': newFont.variant,
			'letter-spacing': newFont.letterSpacing
		})
	}



	// Text Color
	get textColor () {
		return this._textColor
	}

	set textColor (newTextColor) {
		this._textColor = newTextColor
		$(this.selector).css({
			'color': newTextColor,
		})
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





	//
	// Font properties
	//

	// Font Size
	get fontSize () {
		return this.font.size
	}

	set fontSize (newFontSize) {
		this.font.size = newFontSize
		this.font = this.font
	}



	// Font Family
	get fontFamily () {
		return this.font.family
	}

	set fontFamily (newFontFamily) {
		this.font.family = newFontFamily
		this.font = this.font
	}



	// Font Weight
	get fontWeight () {
		return this.font.weight
	}

	set fontWeight (newFontWeight) {
		this.font.weight = newFontWeight
		this.font = this.font
	}



	// Font Style
	get fontStyle () {
		return this.font.style
	}

	set fontStyle (newFontStyle) {
		this.font.style = newFontStyle
		this.font = this.font
	}



	// Font Variant
	get fontVariant () {
		return this.font.variant
	}

	set fontVariant (newFontVariant) {
		this.font.variant = newFontVariant
		this.font = this.font
	}



	// Letter Spacing
	get letterSpacing () {
		return this.font.letterSpacing
	}

	set letterSpacing (newLetterSpacing) {
		this.font.letterSpacing = newLetterSpacing
		this.font = this.font
	}





	//
	// UI
	//




	//
	// Actions
	//

}
