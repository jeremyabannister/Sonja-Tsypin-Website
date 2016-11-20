class JABVimeoView extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.vimeoId = null
		this.loadingVideo = false
		this.loadingGif = null
		this.loadedOnce = false
		
		this.coverImage = null // Should be a UIImage
		this.playButtonImage = null // Should be a UIImage
		this.labelText = null
		this.unplayed = true
		
		
		// UI
		this.loadingGifWrapper = new JABGifWrapper('LoadingGifWrapper')
		this.iFrameWrapper = new JABView('IFrameWrapper')
		
		this.player = null
		this.iframe = "<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
		
		this.coverImageView = new JABImageView('CoverImageView')
		this.playButton = new JABImageView('PlayButton')
		this.label = new UILabel('Label')
		
		// Parameters
		this.parameters = {
			sizeOfPlayButton: 80,
			bufferBetweenPlayButtonAndLabel: 10,
		}
		
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
	
	
	
	get coverImage () {
		return this._coverImage
	}
	
	set coverImage (newCoverImage) {
		if (this.coverImage != newCoverImage) {
			this._coverImage = newCoverImage
			
			this.updateSubviewOrder()
		}
	}
	
	
	
	get paused () {
		return this.player.getPaused()
	}
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		// These go behind the rest by default so that they are not blocking the vimeo player unless a cover image is specified
		this.addCoverImageView()
		this.addPlayButton()
		this.addLabel()
		
		
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
		this.addTouchListener()
	}
	
	
	
	
	
	addCoverImageView () {
		this.addSubview(this.coverImageView)
	}
	
	addPlayButton () {
		this.addSubview(this.playButton)
	}
	
	addLabel () {
		this.addSubview(this.label)
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
		
		
		this.configureCoverImageView()
		this.positionCoverImageView()
		
		this.configurePlayButton()
		this.positionPlayButton()
		
		this.configureLabel()
		this.positionLabel()
		
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
	
	
	
	
	
	// Cover Image
	configureCoverImageView () {
		var view = this.coverImageView
		
		var insertBelow = !this.unplayed
		if (this.coverImage != null) {
			
			var imagePath = this.coverImage.src
			if (imageBank.imageStatus[imagePath] == true) {
				view.src = imagePath
			}
			
			if (this.unplayed) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
			
		} else {
			view.opacity = 0
			insertBelow = true
		}
		
		
		view.clickable = true
		
	}
	
	positionCoverImageView () {
		var view = this.coverImageView
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	// Play Button
	configurePlayButton () {
		
		var view = this.playButton
		
		if (this.playButtonImage != null) {
			var imagePath = this.playButtonImage.src
			if (imageBank.imageStatus[imagePath] == true) {
				view.src = imagePath
			}
			if (this.unplayed) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
		} else {
			view.opacity = 0
		}
		
		view.clickable = true
		view.cursor = 'pointer'
	}
	
	positionPlayButton () {
		var view = this.playButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfPlayButton
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	// Label
	configureLabel () {
		
		var view = this.label
		
		if (this.labelText != null) {
			if (this.unplayed) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
			
			
			view.text = this.labelText
			view.fontFamily = 'siteFont'
			view.fontSize = 12
			view.textColor = 'white'
			view.letterSpacing = 1.5
		} else {
			view.opacity = 0
		}
		
		
	}
	
	positionLabel () {
		var view = this.label
		var newFrame = new CGRect()
		
		if (view.text != null) {
			var size = view.font.sizeOfString(view.text)
			newFrame.size.width = size.width
			newFrame.size.height = size.height

			newFrame.origin.x = this.playButton.x + (this.playButton.width - newFrame.size.width)/2
			newFrame.origin.y = this.playButton.bottom + this.parameters.bufferBetweenPlayButtonAndLabel
		}
							
		view.frame = newFrame
	}
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	// Vimeo Player
	play () {
		if (this.player != null) {
			
			if (this.coverImage != null) {
				this.unplayed = false
				var vimeoView = this
				this.animatedUpdate(null, function () {
					vimeoView.updateSubviewOrder()
					vimeoView.player.play()
				})
			} else {
				this.player.play()
			}
		}
	}
	
	pause () {
		if (this.player != null) {
			this.player.pause()
		}
	}
	
	addTouchListener () {
		document.getElementById(this.id).addEventListener('touchstart', handleTouchStart, false);        
		document.getElementById(this.id).addEventListener('touchmove', handleTouchMove, false);
		
		var vimeoView = this;
		var xDown = null;
		var yDown = null;                                                    

		function handleTouchStart(evt) {
			console.log('touch started!')
		    xDown = evt.touches[0].clientX;                                      
		    yDown = evt.touches[0].clientY;                                      
		};                                                

		function handleTouchMove(evt) {
		    if ( ! xDown || ! yDown ) {
		        return;
		    }

		    var xUp = evt.touches[0].clientX;                                    
		    var yUp = evt.touches[0].clientY;

		    var xDiff = xDown - xUp;
		    var yDiff = yDown - yUp;

		    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
		        if ( xDiff > 0 ) {
		            /* left swipe */
		            vimeoView.parent.leftSwipeDetected()
		        } else {
		            /* right swipe */
		            vimeoView.parent.rightSwipeDetected()
		        }                       
		    } else {
		        if ( yDiff > 0 ) {
		            /* up swipe */ 
		            vimeoView.parent.upSwipeDetected()
		        } else { 
		            /* down swipe */
		            vimeoView.parent.downSwipeDetected()
		        }                                                                 
		    }
		    /* reset values */
		    xDown = null;
		    yDown = null;                                             
		};
	}
	
	
	// Subviews
	updateSubviewOrder () {
		var bringToFront = this.unplayed
		if (this.coverImage == null) {
			bringToFront = false
		}
		
		if (bringToFront) {
			this.bringSubviewToFront(this.coverImageView)
			this.bringSubviewToFront(this.playButton)
			this.bringSubviewToFront(this.label)
		} else {
			this.pushSubviewToBack(this.coverImageView)
			this.pushSubviewToBack(this.playButton)
			this.pushSubviewToBack(this.label)
		}
	}
	
	
	//
	// Delegate
	//
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
	// JABView
	viewWasClicked (view) {
		if (view == this.coverImageView || view == this.playButton) {
			this.play()
		}
	}
}

