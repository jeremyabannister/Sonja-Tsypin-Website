class CGRect {
	constructor (x, y, width, height) {

		if (x == null) {
			x = 0
		}
		if (y == null) {
			y = 0
		}
		if (width == null) {
			width = 0
		}
		if (height == null) {
			height = 0
		}



		this.origin = new CGPoint(x, y)
		this.size = new CGSize(width, height)
	}
	
	
	
	// X
	get x () {
		return this.origin.x
	}
	
	set x (newX) {
		this.origin.x = newX
	}
	
	
	// Y
	get y () {
		return this.origin.y
	}
	
	set y (newY) {
		this.origin.y = newY
	}
	
	
	// Width
	get width () {
		return this.size.width
	}
	
	set width (newWidth) {
		this.size.width = newWidth
	}
	
	
	// Height
	get height () {
		return this.size.height
	}
	
	set height (newHeight) {
		this.size.height = newHeight
	}
	
	
	
	
	// Left
	get left () {
		return this.x
	}
	
	
	// Right
	get right () {
		return this.x + this.width
	}
	
	
	// Top
	get top () {
		return this.y
	}
	
	// Bottom
	get bottom () {
		return this.y + this.height
	}
	
	
	
	
	//
	// Actions
	//
	
	
	// Copy
	copy () {
		return new CGRect(this.x, this.y, this.width, this.height)
	}

}
