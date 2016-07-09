class CGPoint {
	constructor (x, y) {
		
		if (x == null) {
			x = 0
		}
		if (y == null) {
			y = 0
		}
		
		
		this.x = x
		this.y = y
	}
	
	
	get containsOnlyValidValues () {
		
		if (this.x == null) {
			return false
		}
		
		if (this.y == null) {
			return false
		}
		
		return true
	}
	
	
	isEqualToPoint(point) {
		if (point instanceof CGPoint) {
			if (this.containsOnlyValidValues && point.containsOnlyValidValues) {
				if (this.x == point.x && this.y == point.y) {
					return true
				}
			}
		}
		
		return false
	}
}

