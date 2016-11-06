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
		
		var imageView = this
		$(this.selector + ' > img').on('load', function() {
			if (imageView.parent != null) {
				imageView.parent.imageViewDidFinishLoadingImage(this)
			}
		})
	}
	
	updateAllUI () {
		super.updateAllUI()
		
		this.configureImageView()
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
		if (this.src != newSrc) {
			this.image.src = newSrc
			this.image = this.image
		}
	}
	
	
	
	
	//
	// UI
	//
	
	configureImageView () {
		
		var configureDuration = this.animationOptions.configureDuration || 0
		var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out'
		var configureDelay = this.animationOptions.configureDelay || 0
		
		
		var positionDuration = this.animationOptions.positionDuration || 0
		var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out'
		var positionDelay = this.animationOptions.positionDelay || 0
		
		$(this.selector + ' > img').css({
			transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, -webkit-backdrop-filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms'
		})
		
	}
	
	
	positionImageView () {
		
		$(this.selector + ' > img').css({
			'width': this.width + 'px',
			'height': this.height + 'px',
		})
	}
}