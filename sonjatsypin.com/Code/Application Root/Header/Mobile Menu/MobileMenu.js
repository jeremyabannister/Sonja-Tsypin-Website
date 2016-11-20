class MobileMenu extends JABView {
	
	constructor (customId, items) {
		super(customId)
		
		// State
		this.state = {
			items: items,
			open: false,
		}
		this.requiredHeight = 400
		
		// Parameters
		this.parameters = {
			topBufferForItemViews: 10,
			heightOfItemViews: 40,
		}
		
		// UI
		this.itemViews = []
		for (var i = 0; i < this.state.items.length; i++) {
			this.itemViews.push(new MobileMenuItemView('ItemView' + i, this.state.items[i]))
		}
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		this.addItemViews()
	}
	
	
	addItemViews () {
		for (var i = 0; i < this.itemViews.length; i++) {
			this.addSubview(this.itemViews[i])
		}
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureItemViews()
		this.positionItemViews()
	}
	
	
	
	// Item Views
	configureItemViews () {
		for (var i = 0; i < this.itemViews.length; i++) {
			var view = this.itemViews[i]
			
			
			view.clickable = true
			view.cursor = 'pointer'
			
			if (this.state.open) {
				view.opacity = 1
			} else {
				view.opacity = 0
			}
			
			view.updateAllUI()
		}
	}
	
	positionItemViews () {
		for (var i = 0; i < this.itemViews.length; i++) {
			var view = this.itemViews[i]
			var newFrame = new CGRect()
								
			newFrame.size.width = this.width
			newFrame.size.height = this.parameters.heightOfItemViews

			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.parameters.topBufferForItemViews + (i * this.parameters.heightOfItemViews)
			
			if (!this.state.open) {
				newFrame.origin.y -= 100
			}
			
								
			view.frame = newFrame
			
			
			if (i == this.itemViews.length - 1) {
				this.requiredHeight = view.bottom + this.parameters.topBufferForItemViews
			}
		}
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
	
	// JABView
	viewWasClicked (view) {
		this.parent.menuItemWasSelected(view.menuItem)
	}
	
}