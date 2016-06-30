class JABImageView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.src = ''
		
		// UI*
		this.imageView = "<img>"
		
		
	}
	
	
	addAllUI () {
		$(this.selector).append(this.imageView)
	}
	
	updateAllUI () {
		super.updateAllUI()
		
		this.positionImageView()
		
	}
	
	
	
	
	get src () {
		return $(this.selector + ' > img').attr('src')
	}
	
	set src (newSrc) {
		this._src = newSrc
		$(this.selector + ' > img').attr({ 'src':newSrc })
	}
	
	
	//
	// UI
	//
	
	
	positionImageView () {
		
		$(this.selector + ' > img').css({
			'width': this.width + 'px',
			'height': this.height + 'px',
		})
	}
}