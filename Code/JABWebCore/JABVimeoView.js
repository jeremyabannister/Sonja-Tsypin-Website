class JABVimeoView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.vimeoId = ''
		
		// UI
		this.iframe = "<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	//
	// Getters and Setters
	//
	get vimeoId () {
		return $(this.selector + ' > img').attr('src')
	}
	
	set vimeoId (newVimeoId) {
		this._vimeoId = newVimeoId
		$(this.selector + ' > iframe').attr({ 'src':('https://player.vimeo.com/video/' + newVimeoId + '?portrait=0&badge=0&byline=0&title=0') })
	}
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		$(this.selector).append(this.iframe)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureIframe()
		this.positionIframe()
		
	}
	
	configureIframe () {
		$(this.selector + ' > iframe').css({
			border: 0
		})
	}
	
	
	positionIframe () {
		
		$(this.selector + ' > iframe').css({
			'width': this.width + 'px',
			'height': this.height + 'px',
		})
	}
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	//
	// Delegate
	//
	
}