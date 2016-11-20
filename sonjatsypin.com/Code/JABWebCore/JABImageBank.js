class JABImageBank {
	constructor () {
		
		// Queue
		this.queue = []
		
		// Images
		this.imageStatus = {}
		
		// Subscribers
		this.subscribersPerImage = {}
		
	}
	
	
	
	// Queue
	startQueue () {
		if (this.queue.length > 0) {
			var imageObject = new Image()
			var bank = this
			imageObject.onload = function () {bank.imageCompletedLoading(bank.queue[0])}
			imageObject.src = this.queue[0]
		}
	}
	
	advanceQueue () {
		if (this.queue.length > 0) {
			this.queue.splice(0,1)
		}
		
		this.startQueue()
	}
	
	addToQueue (src, subscriber) {
		if (subscriber != null) {
			this.subscribersPerImage[src] = subscriber
		}
		
		this.queue.push(src)
		if (this.queue.length == 1) {
			this.startQueue()
		}
	}
	
	
	
	// Loading
	imageCompletedLoading (src) {
		this.imageStatus[src] = true
		if (this.subscribersPerImage[src] != null) {
			this.subscribersPerImage[src].imageDidFinishLoading(src)
		}
		this.advanceQueue()
	}
	
	
	
	
}