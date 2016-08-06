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
		this.lineHeightUnit = '';

		this.reservedId = 'UIFontReservedIDForTextMeasurement';

		// String Sizes
		this.knownStringSizes = {};
	}

	//
	// Getters and Setters
	//

	// Size


	_createClass(UIFont, [{
		key: 'sizeOfString',


		//
		// Actions
		//

		value: function sizeOfString(string, widthConstraint) {

			if (this.knownStringSizes[string] == null) {
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

				this.knownStringSizes[string] = size;

				return size;
			} else {
				return this.knownStringSizes[string];
			}
		}
	}, {
		key: 'size',
		get: function get() {
			return this._size;
		},
		set: function set(newSize) {
			if (this.size != newSize) {
				this._size = newSize;
				this.knownStringSizes = {};
			}
		}

		// Family

	}, {
		key: 'family',
		get: function get() {
			return this._family;
		},
		set: function set(newFamily) {
			if (this.family != newFamily) {
				this._family = newFamily;
				this.knownStringSizes = {};
			}
		}

		// Weight

	}, {
		key: 'weight',
		get: function get() {
			return this._weight;
		},
		set: function set(newWeight) {
			if (this.weight != newWeight) {
				this._weight = newWeight;
				this.knownStringSizes = {};
			}
		}

		// Style

	}, {
		key: 'style',
		get: function get() {
			return this._style;
		},
		set: function set(newStyle) {
			if (this.style != newStyle) {
				this._style = newStyle;
				this.knownStringSizes = {};
			}
		}

		// Variant

	}, {
		key: 'variant',
		get: function get() {
			return this._variant;
		},
		set: function set(newVariant) {
			if (this.variant != newVariant) {
				this._variant = newVariant;
				this.knownStringSizes = {};
			}
		}

		// Letter Spacing

	}, {
		key: 'letterSpacing',
		get: function get() {
			return this._letterSpacing;
		},
		set: function set(newLetterSpacing) {
			if (this.letterSpacing != newLetterSpacing) {
				this._letterSpacing = newLetterSpacing;
				this.knownStringSizes = {};
			}
		}

		// Line Height

	}, {
		key: 'lineHeight',
		get: function get() {
			return this._lineHeight;
		},
		set: function set(newLineHeight) {
			if (this.lineHeight != newLineHeight) {
				this._lineHeight = newLineHeight;
				this.knownStringSizes = {};
			}
		}

		// Line Height Unit

	}, {
		key: 'lineHeightUnit',
		get: function get() {
			return this._lineHeightUnit;
		},
		set: function set(newLineHeightUnit) {
			if (this.lineHeightUnit != newLineHeightUnit) {
				this._lineHeightUnit = newLineHeightUnit;
				this.knownStringSizes = {};
			}
		}
	}]);

	return UIFont;
}();