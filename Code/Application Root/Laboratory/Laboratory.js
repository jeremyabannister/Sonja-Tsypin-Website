class Laboratory extends JABView {

	constructor (customId) {
		super(customId)

		// State
		this.timeMark1 = 0
		this.big = false

		// UI
    	this.view1 = new UILabel()
    	this.view2 = new JABView('View2', this)


		this.defaultTimeInterval = 1000
		this.specificTimeIntervals = [26]

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
		this.view1.red()
		this.view1.text = 'SONJA TSYPIN'
		this.view1.fontFamily = 'siteFont'
		this.view1.positionDuration = 1000
		
	}
	
	positionView1 () {
		
		this.view1.width = 'auto'
		this.view1.height = 'auto'
		
		
	}
	
	
	
	configureView2 () {
		
		this.view2.blue()
	}
	
	positionView2 () {
		
		var newFrame = new CGRect()
				
		newFrame.size.width = 127
		newFrame.size.height = 20
				
		newFrame.origin.x = 0
		newFrame.origin.y = 40
				
				
		this.view2.frame = newFrame
		
		console.log(this.view1.font.sizeOfString(this.view1.text))
		
	}


	//
	// Actions
	//

	currentTime () {
		return (new Date()).getTime()
	}
	
	
	runExperiment (experimentNumber) {
		
		this.numberOfExperiments = 3
		console.log("<<<<<<<<<< Launching Experiment #" + experimentNumber + ' >>>>>>>>>>')
		
		if (experimentNumber == 1) {
			
			
			
			
		} else if (experimentNumber == 2) {
			
			this.view1.width = 300
			this.view1.x += 500
			
			
		} else if (experimentNumber == 3) {
			
			
		}
	}
	
	
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
