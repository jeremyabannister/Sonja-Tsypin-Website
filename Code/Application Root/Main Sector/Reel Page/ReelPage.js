class ReelPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			readyToClose: true
		}
		this.currentlyActive = null
		
		this.scrollable = false
		this.scrollFinishTimer
		
		// Parameters
		this.reservedTopBuffer = 0
		this.topBufferForVimeoView = 58
		this.bottomBufferForVimeoView = 20
		
		// UI
		this.vimeoView = new JABVimeoView('VimeoView')
		this.footer = new Footer('Footer')
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
	
	get currentlyActive () {
		return this._currentlyActive
	}
	
	set currentlyActive (newCurrentlyActive) {
		var changed = this.currentlyActive != newCurrentlyActive
		
		if (changed) {
			this._currentlyActive = newCurrentlyActive
			
			if (!this.currentlyActive) {
				this.pauseReel()
			}
		}
	}
	
	
	requiredHeightForWidth (width) {
		return this.footer.bottom
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addVimeoView()
		this.addFooter()
	}
	
	
	addVimeoView () {
		this.addSubview(this.vimeoView)
	}
	
	addFooter () {
		this.addSubview(this.footer)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.configureVimeoView()
		this.positionVimeoView()
		
		this.configureFooter()
		this.positionFooter()
	}
	
	
	// Vimeo View
	
	configureVimeoView () {
		
		var vimeoId = '179671795'
		var view = this.vimeoView
		
		if (!(view.loadingGif instanceof LoadingGif)) {
			view.loadingGif = new LoadingGif()
		}
		
		if (view.vimeoId != vimeoId) {
			view.vimeoId = vimeoId
		}
		
		view.blur = 0
		
		view.coverImage = new UIImage("/Resources/Images/Reel Page/Reel Cover Photo.png")
		view.playButtonImage = new UIImage("/Resources/Images/Buttons/Play Button.png")
		view.labelText = "REEL"
		
		view.updateAllUI()
	}
	
	positionVimeoView () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = applicationRoot.contentWidth
		newFrame.size.height = newFrame.size.width * (9.0/16.0)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.reservedTopBuffer + this.topBufferForVimeoView
				
		this.vimeoView.frame = newFrame
		
	}
	
	
	
	
	// Footer
	configureFooter () {
		var view = this.footer
		
		view.updateAllUI()
	}
	
	positionFooter () {
		
		var view = this.footer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.footer.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.vimeoView.bottom + this.bottomBufferForVimeoView
		
		if (newFrame.origin.y + newFrame.size.height < this.height) {
			newFrame.origin.y = this.height - newFrame.size.height
		}
							
		view.frame = newFrame
		
	}
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		var reelPage = this
		
		$(this.selector).bind('mousewheel', function(evt) {
			
			if (!reelPage.scrollable) {
				evt.preventDefault()
			}
			
			clearTimeout(reelPage.scrollFinishTimer)
			if (reelPage.scrollTop <= 0) {
				reelPage.scrollFinishTimer = setTimeout(function () {
					reelPage.state.readyToClose = true
				}, 50)
			} else {
				reelPage.state.readyToClose = false
			}
			
			if (reelPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
				evt.preventDefault()
			}
		})
	}
	
	
	//
	// Actions
	//
	
	
	// Video
	playReel () {
		if (this.vimeoView != null) {
			this.vimeoView.play()
		}
	}
	
	pauseReel () {
		if (this.vimeoView != null) {
			this.vimeoView.pause()
		}
	}
	
	
	// Keys
	spaceBarWasPressed () {
		var reelPage = this
		this.vimeoView.paused.then(function(paused) {
			if (paused) {
				reelPage.playReel()
			} else {
				reelPage.pauseReel()
			}
		})
	}
	
	//
	// Delegate
	//
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
	// JABVimeoView
	vimeoViewDidFinishLoading (vimeoView) {
		
	}
	
	// Footer
	footerMailButtonWasClicked (footer) {
		this.parent.reelPageWantsToOpenMailForm(this)
	}
	
	
}