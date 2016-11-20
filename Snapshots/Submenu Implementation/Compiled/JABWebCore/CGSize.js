"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CGSize = function CGSize(width, height) {
	_classCallCheck(this, CGSize);

	if (width == null) {
		width = 0;
	}
	if (height == null) {
		height = 0;
	}

	this.width = width;
	this.height = height;
};