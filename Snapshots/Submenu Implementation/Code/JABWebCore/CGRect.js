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




}
