'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileMenu = function (_JABView) {
	_inherits(MobileMenu, _JABView);

	function MobileMenu(customId, items) {
		_classCallCheck(this, MobileMenu);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MobileMenu).call(this, customId));

		_this.state = {
			items: items,
			open: false
		};
		_this.requiredHeight = 400;

		// Parameters
		_this.parameters = {
			topBufferForItemViews: 10,
			heightOfItemViews: 40
		};

		// UI
		_this.itemViews = [];
		for (var i = 0; i < _this.state.items.length; i++) {
			_this.itemViews.push(new MobileMenuItemView('ItemView' + i, _this.state.items[i]));
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(MobileMenu, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(MobileMenu.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addItemViews();
		}
	}, {
		key: 'addItemViews',
		value: function addItemViews() {
			for (var i = 0; i < this.itemViews.length; i++) {
				this.addSubview(this.itemViews[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(MobileMenu.prototype), 'updateAllUI', this).call(this);

			this.configureItemViews();
			this.positionItemViews();
		}

		// Item Views

	}, {
		key: 'configureItemViews',
		value: function configureItemViews() {
			for (var i = 0; i < this.itemViews.length; i++) {
				var view = this.itemViews[i];

				view.clickable = true;
				view.cursor = 'pointer';

				if (this.state.open) {
					view.opacity = 1;
				} else {
					view.opacity = 0;
				}

				view.updateAllUI();
			}
		}
	}, {
		key: 'positionItemViews',
		value: function positionItemViews() {
			for (var i = 0; i < this.itemViews.length; i++) {
				var view = this.itemViews[i];
				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = this.parameters.heightOfItemViews;

				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = this.parameters.topBufferForItemViews + i * this.parameters.heightOfItemViews;

				if (!this.state.open) {
					newFrame.origin.y -= 100;
				}

				view.frame = newFrame;

				if (i == this.itemViews.length - 1) {
					this.requiredHeight = view.bottom + this.parameters.topBufferForItemViews;
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

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			this.parent.menuItemWasSelected(view.menuItem);
		}
	}]);

	return MobileMenu;
}(JABView);