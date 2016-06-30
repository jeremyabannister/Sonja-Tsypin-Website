class UIFont {
	
	constructor (size, family, weight, style, variant) {
		
		this.stateSelectors = ['size', 'family', 'weight', 'style', 'variant', 'letterSpacing']
		this.correspondingCSSSelectors = ['font-size', 'font-family', 'font-weight', 'font-style', 'font-variant', 'letter-spacing']
		
		// State
		this.size = null
		this.family = null
		this.weight = null
		this.style = null
		this.variant = null
		this.letterSpacing = null
		
		
		this.reservedId = 'UIFontReservedIDForTextMeasurement'
		
	}
	
	
	
	
	//
	// Actions
	//
	
	
	sizeOfString (string) {
		
		$('body').append("<div id='" + this.reservedId + "'>" + string + "</div>")
		
		var cssOptions = {
			position: 'absolute',
			
			left: '-1000px',
			top: '-1000px',
			
			width: 'auto',
			height: 'auto',
			whiteSpace: 'nowrap'
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
		
		return size
		
	}
	
}