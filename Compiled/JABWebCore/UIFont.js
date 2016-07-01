'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIFont = function () {
	function UIFont(size, family, weight, style, variant) {
		_classCallCheck(this, UIFont);

		this.stateSelectors = ['size', 'family', 'weight', 'style', 'variant', 'letterSpacing', 'lineHeight'];
		this.correspondingCSSSelectors = ['font-size', 'font-family', 'font-weight', 'font-style', 'font-variant', 'letter-spacing', 'line-height'];

		// State
		this.size = null;
		this.family = null;
		this.weight = null;
		this.style = null;
		this.variant = null;
		this.letterSpacing = null;
		this.lineHeight = null;

		this.reservedId = 'UIFontReservedIDForTextMeasurement';
	}

	//
	// Actions
	//

	_createClass(UIFont, [{
		key: 'sizeOfString',
		value: function sizeOfString(string, widthConstraint) {

			$('body').append("<div id='" + this.reservedId + "'>" + string + "</div>");

			var cssOptions = {
				position: 'absolute',

				left: '-1000px',
				top: '-1000px',

				height: 'auto'
			};

			if (widthConstraint == 0 || widthConstraint == null) {
				cssOptions.whiteSpace = 'nowrap';
				cssOptions.width = 'auto';
			} else {
				cssOptions.width = widthConstraint + 'px';
			}

			for (var i = 0; i < this.stateSelectors.length; i++) {
				var property = this[this.stateSelectors[i]];
				if (property != null) {
					cssOptions[this.correspondingCSSSelectors[i]] = property;
				}
			}

			$('#' + this.reservedId).css(cssOptions);

			var testDiv = document.getElementById(this.reservedId);
			var size = new CGSize(testDiv.clientWidth + 1, testDiv.clientHeight); // Add 1 because for some reason the output is off by 1

			$('#' + this.reservedId).remove();

			return size;
		}
	}]);

	return UIFont;
}();