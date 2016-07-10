class Laboratory extends JABView {

	constructor (customId) {
		super(customId)

		// State
		this.timeMark1 = 0
		this.big = false

		// UI
    	this.view1 = new UILabel('View1')
    	this.view2 = new JABView('View2', this)


		this.defaultTimeInterval = 2000
		this.specificTimeIntervals = [2000, 1000] // First one specifies start delay and is necessary

		this.numberOfExperiments = 0 // Actual value is set in runExperiment which is run on the next line

		this.runExperiment(0) // This is to set the actual number of experiments. The only reason for this way of doing it is so that when working quickly in the method down below the number of experiments can be changed without having to scroll up the document

	    var lab = this
	    for (var i = 0; i < this.numberOfExperiments; i++) {
	    	
	    	var interval = 0
	    	for (var j = 0; j < i; j++) {
	    		if (this.specificTimeIntervals.length > j) {
	    			interval += this.specificTimeIntervals[j]
	    		}
	    	}
	    	
	    	if (this.specificTimeIntervals.length > i) {
	    		interval += this.specificTimeIntervals[i]
	    	} else {
	    		interval += this.defaultTimeInterval
	    	}
	    	
	    	var k = i + 1
	    	setTimeout(function(k) {
	    		lab.runExperiment(k)
	    	}, interval, k)
	    }
	    
	    
	    
	    // Initialize
	}



	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addView1()
		this.addView2()
		
	}
	
	
	
	addView2 () {
		this.addSubview(this.view1)
	}
	
	addView1 () {
		this.addSubview(this.view2)
	}
	



	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
	    this.configureView1()
	    this.positionView1()

	    this.configureView2()
	    this.positionView2()
	}



	// View 1
	configureView1 () {
		
		var view = this.view1
		view.red()
		
		view.shapeDuration = 800
	}
	
	positionView1 () {
		
		var view = this.view1
		var newFrame = new CGRect()
							
		newFrame.size.width = 100
		newFrame.size.height = 100

		newFrame.origin.x = 300
		newFrame.origin.y = 100
							
		view.frame = newFrame
		
		
		view.clipPath = new Polygon([0, 0, 100, 90, 40, 60, 0, 12])
		
		
	}
	
	
	
	configureView2 () {
		
		var view = this.view2
		view.blue()
		// view.shapeDuration = 800
		
	}
	
	positionView2 () {
		
		var view = this.view2
		var newFrame = new CGRect()
				
		newFrame.size.width = 100
		newFrame.size.height = 100
				
		newFrame.origin.x = 600
		newFrame.origin.y = 200
				
				
		view.frame = newFrame
		
		// view.clipPath = new Polygon([0, 0, 40, 30, 87, 0, 9, 100])
		
	}


	//
	// Actions
	//

	currentTime () {
		return (new Date()).getTime()
	}
	
	
	runExperiment (experimentNumber) {
		
		var view1 = this.view1
		var view2 = this.view2
		
		this.numberOfExperiments = 3
		console.log('<<<<<<<<<< Launching Experiment #' + experimentNumber + ' >>>>>>>>>>')
		
		if (experimentNumber == 1) {
			
			view1.clipPath = new Polygon([0, 0, 100, 0, 100, 100, 0, 100])
			// view2.clipPath = new Polygon([0, 0, 100, 0, 100, 100, 0, 100])
			
			
		} else if (experimentNumber == 2) {
			
			view1.clipPath = new Polygon([0, 0, 9, 0, 100, 100, 0, 100])
			// view2.clipPath = new Polygon([0, 90, 50, 0, 23, 16, 40, 100])
			
			
		} else if (experimentNumber == 3) {
			
			view1.clipPath = new Polygon([0, 0, 70, 0, 100, 100, 0, 100])
			// view2.clipPath = new Polygon([0, 94, 15, 47, 0, 0, 100, 100])
			
		}
		
		console.log('<<<<<<<<<< Ending Experiment #' + experimentNumber + ' >>>>>>>>>>')
	}
	
	// @keyframes test {0% {-webkit-clip-path: polygon(0px 0px, 100px 90px, 40px 60px, 0px 12px);} 100% {-webkit-clip-path: polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px);}}
	
	
	
	// @keyframes View1---Laboratory---ApplicationRoot { 0% { clip-path: polygon(0px 0px, 100px 90px, 40px 60px, 0px 12px); -webkit-clip-path: polygon(0px 0px, 100px 90px, 40px 60px, 0px 12px);} 100% { clip-path: polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px); -webkit-clip-path: polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px);} }
}





class Test extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		// UI
		this.sub = new JABView()
		
		// Initialize
	}
	
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addSub()
		
	}
	
	addSub () {
		this.addSubview(this.sub)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureSub()
		this.positionSub()
	}
	
	
	
	configureSub () {
		
		this.sub.green()
		
	}
	
	positionSub () {
		
		var newFrame = new CGRect()
					
		newFrame.size.width = this.width/2
		newFrame.size.height = 30

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
					
		this.sub.frame = newFrame
		
	}
	
	
	
	
	
	//
	// Actions
	//
	
	
	// Delegate
	
}
