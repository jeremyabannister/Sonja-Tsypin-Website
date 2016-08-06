"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CGRect = function () {
	function CGRect(x, y, width, height) {
		_classCallCheck(this, CGRect);

		if (x == null) {
			x = 0;
		}
		if (y == null) {
			y = 0;
		}
		if (width == null) {
			width = 0;
		}
		if (height == null) {
			height = 0;
		}

		this.origin = new CGPoint(x, y);
		this.size = new CGSize(width, height);
	}

	// X


	_createClass(CGRect, [{
		key: "copy",


		//
		// Actions
		//

		// Copy
		value: function copy() {
			return new CGRect(this.x, this.y, this.width, this.height);
		}
	}, {
		key: "x",
		get: function get() {
			return this.origin.x;
		},
		set: function set(newX) {
			this.origin.x = newX;
		}

		// Y

	}, {
		key: "y",
		get: function get() {
			return this.origin.y;
		},
		set: function set(newY) {
			this.origin.y = newY;
		}

		// Width

	}, {
		key: "width",
		get: function get() {
			return this.size.width;
		},
		set: function set(newWidth) {
			this.size.width = newWidth;
		}

		// Height

	}, {
		key: "height",
		get: function get() {
			return this.size.height;
		},
		set: function set(newHeight) {
			this.size.height = newHeight;
		}

		// Left

	}, {
		key: "left",
		get: function get() {
			return this.x;
		}

		// Right

	}, {
		key: "right",
		get: function get() {
			return this.x + this.width;
		}

		// Top

	}, {
		key: "top",
		get: function get() {
			return this.y;
		}

		// Bottom

	}, {
		key: "bottom",
		get: function get() {
			return this.y + this.height;
		}
	}]);

	return CGRect;
}();