class JABVimeoView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.vimeoId = null
		this.loadingVideo = false
		this.loadingGif = null
		this.loadedOnce = false
		
		// UI
		this.loadingGifWrapper = new JABGifWrapper('LoadingGifWrapper')
		this.iFrameWrapper = new JABView('IFrameWrapper')
		
		this.player = null
		this.iframe = "<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
		
		
		// Parameters
		
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
		return this._vimeoId
	}
	
	set vimeoId (newVimeoId) {
		var changed = this.vimeoId != newVimeoId
		
		if (changed) {
			this._vimeoId = newVimeoId
			
			if (!this.loadedOnce || this.player == null) {
				$(this.iFrameWrapper.selector + ' > iframe').attr({ 'src':('https://player.vimeo.com/video/' + newVimeoId + '?portrait=0&badge=0&byline=0&title=0&api=1') })
				
				this.player = new Vimeo.Player($(this.iFrameWrapper.selector + ' > iframe'));
				this.loadedOnce = true
			} else {
				this.player.loadVideo(newVimeoId)
			}
			
			
			this.loadingVideo = true
			this.loadingGifWrapper.play()
			this.updateAllUI()
			
			var vimeoView = this
			this.player.on('loaded', function() {
				vimeoView.loadingVideo = false
				vimeoView.animatedUpdate()
				vimeoView.parent.vimeoViewDidFinishLoading(vimeoView)
				vimeoView.loadingGifWrapper.stop()
			})
		}
	}
	
	get loadingGif () {
		return this._loadingGif
	}
	
	set loadingGif (newLoadingGif) {
		var changed = (this.loadingGif != newLoadingGif)
		if (changed) {
			if (this.loadingGifWrapper != null) {
				this._loadingGif = newLoadingGif
				this.loadingGifWrapper.gif = this.loadingGif
			}
		}
	}
	
	test () {
		console.log('here')
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addLoadingGifWrapper()
		this.addIFrameWrapper()
		
		this.addIFrame()
	}
	
	
	addLoadingGifWrapper () {
		this.addSubview(this.loadingGifWrapper)
	}
	
	addIFrameWrapper () {
		this.addSubview(this.iFrameWrapper)
	}
	
	
	
	
	addIFrame () {
		$(this.iFrameWrapper.selector).append(this.iframe)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureLoadingGifWrapper()
		this.positionLoadingGifWrapper()
		
		this.configureIFrameWrapper()
		this.positionIFrameWrapper()
		
		
		
		
		
		this.configureIframe()
		this.positionIframe()
		
	}
	
	
	
	// Loading Gif
	configureLoadingGifWrapper () {
		
		var view = this.loadingGifWrapper
		
		if (this.loadingVideo) {
			view.opacity = 1
		} else {
			view.opacity = 0
		}
	}
	
	positionLoadingGifWrapper () {
		
		var loadingGifWrapperSizes = {'xs': 60, 's': 60, 'm': 60, 'l': 60, 'xl': 60}
		
		var view = this.loadingGifWrapper
		var newFrame = new CGRect()
							
		newFrame.size.width = loadingGifWrapperSizes[sizeClass]
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
		
	}
	
	
	
	
	// IFrame Wrapper
	configureIFrameWrapper () {
		var view = this.iFrameWrapper
		
		
		if (this.loadingVideo) {
			view.opacity = 0
		} else {
			view.opacity = 1
		}
	}
	
	positionIFrameWrapper () {
		this.iFrameWrapper.frame = this.bounds
	}
	
	
	
	
	// IFrame
	configureIframe () {
		$(this.iFrameWrapper.selector + ' > iframe').css({
			border: 0,
			zIndex: 0,
		})
	}
	
	
	positionIframe () {
		
		$(this.iFrameWrapper.selector + ' > iframe').css({
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
	
	play () {
		if (this.player != null) {
			this.player.play()
		}
	}
	
	pause () {
		if (this.player != null) {
			this.player.pause()
		}
	}
	
	
	//
	// Delegate
	//
	
	
}

