class JABImageView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.image = new UIImage('')
		
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
	
	
	
	//
	// Getters and Setters
	//
	
	get image () {
		return this._image
	}
	
	set image (newImage) {
		this._image = newImage
		$(this.selector + ' > img').attr({ 'src':newImage.src })
	}
	
	
	
	
	
	get src () {
		return this.image.src
	}
	
	set src (newSrc) {
		this.image.src = newSrc
		this.image = this.image
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