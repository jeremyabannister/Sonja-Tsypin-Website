class UIFont {
	
	constructor (size, family, weight, style, variant) {
		
		this.stateSelectors = ['size', 'family', 'weight', 'style', 'variant', 'letterSpacing', 'lineHeight']
		this.correspondingCSSSelectors = ['font-size', 'font-family', 'font-weight', 'font-style', 'font-variant', 'letter-spacing', 'line-height']
		
		// State
		this.size = null
		this.family = null
		this.weight = null
		this.style = null
		this.variant = null
		this.letterSpacing = null
		
		this.lineHeight = null
		this.lineHeightUnit = ''
		
		
		this.reservedId = 'UIFontReservedIDForTextMeasurement'
		
		
		// String Sizes
		this.knownStringSizes = {}
		
	}
	
	
	//
	// Getters and Setters
	//
	
	// Size
	get size () {
		return this._size
	}
	
	set size (newSize) {
		if (this.size != newSize) {
			this._size = newSize
			this.knownStringSizes = {}
		}
	}
	
	// Family
	get family () {
		return this._family
	}
	
	set family (newFamily) {
		if (this.family != newFamily) {
			this._family = newFamily
			this.knownStringSizes = {}
		}
	}
	
	
	// Weight
	get weight () {
		return this._weight
	}
	
	set weight (newWeight) {
		if (this.weight != newWeight) {
			this._weight = newWeight
			this.knownStringSizes = {}
		}
	}
	
	// Style
	get style () {
		return this._style
	}
	
	set style (newStyle) {
		if (this.style != newStyle) {
			this._style = newStyle
			this.knownStringSizes = {}
		}
	}
	
	// Variant
	get variant () {
		return this._variant
	}
	
	set variant (newVariant) {
		if (this.variant != newVariant) {
			this._variant = newVariant
			this.knownStringSizes = {}
		}
	}
	
	// Letter Spacing
	get letterSpacing () {
		return this._letterSpacing
	}
	
	set letterSpacing (newLetterSpacing) {
		if (this.letterSpacing != newLetterSpacing) {
			this._letterSpacing = newLetterSpacing
			this.knownStringSizes = {}
		}
	}
	
	// Line Height
	get lineHeight () {
		return this._lineHeight
	}
	
	set lineHeight (newLineHeight) {
		if (this.lineHeight != newLineHeight) {
			this._lineHeight = newLineHeight
			this.knownStringSizes = {}
		}
	}
	
	
	// Line Height Unit
	get lineHeightUnit () {
		return this._lineHeightUnit
	}
	
	set lineHeightUnit (newLineHeightUnit) {
		if (this.lineHeightUnit != newLineHeightUnit) {
			this._lineHeightUnit = newLineHeightUnit
			this.knownStringSizes = {}
		}
	}
	
	
	//
	// Actions
	//
	
	
	sizeOfString (string, widthConstraint) {
		
		if (this.knownStringSizes[string] == null) {
			$('body').append("<div id='" + this.reservedId + "'>" + string + "</div>")
			
			var cssOptions = {
				position: 'absolute',
				
				left: '-1000px',
				top: '-1000px',
				
				height: 'auto',
			}
			
			if (widthConstraint == 0 || widthConstraint == null) {
				cssOptions.whiteSpace = 'nowrap'
				cssOptions.width = 'auto'
			} else {
				cssOptions.width = widthConstraint + 'px'
			}
			
			for (var i = 0; i < this.stateSelectors.length; i++) {
				var property = this[this.stateSelectors[i]]
				if (property != null) {
					cssOptions[this.correspondingCSSSelectors[i]] = property
				}
			}
			
			
			$('#' + this.reservedId).css(cssOptions)
			
			var testDiv = document.getElementById(this.reservedId)
			var size = new CGSize(testDiv.clientWidth + 1, testDiv.clientHeight) // Add 1 because for some reason the output is off by 1
			
			$('#' + this.reservedId).remove()
			
			this.knownStringSizes[string] = size
			
			return size
		} else {
			return this.knownStringSizes[string]
		}
		
	}
	
	
}