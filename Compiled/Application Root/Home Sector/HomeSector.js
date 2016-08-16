'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeSector = function (_JABView) {
	_inherits(HomeSector, _JABView);

	function HomeSector(customId) {
		_classCallCheck(this, HomeSector);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HomeSector).call(this, customId));

		_this.currentlyActive = true;

		// UI
		_this.homePage = new HomePage('HomePage');

		return _this;
	}

	//
	// Init
	//

	_createClass(HomeSector, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(HomeSector.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addHomePage();
		}
	}, {
		key: 'addHomePage',
		value: function addHomePage() {
			this.addSubview(this.homePage);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(HomeSector.prototype), 'updateAllUI', this).call(this);

			this.configureHomePage();
			this.positionHomePage();
		}

		// Home Page

	}, {
		key: 'configureHomePage',
		value: function configureHomePage() {

			this.homePage.overflow = 'hidden';
			this.homePage.currentlyActive = this.currentlyActive;
			this.homePage.updateAllUI();
		}
	}, {
		key: 'positionHomePage',
		value: function positionHomePage() {

			var newFrame = this.bounds;

			this.homePage.frame = newFrame;
		}

		// Header

	}, {
		key: 'configureHeader',
		value: function configureHeader() {

			this.header.websiteClosed = this.websiteClosed;
			this.header.selectedMenuIndex = $.inArray(this.state, this.possibleStates);
			this.header.updateAllUI();
		}
	}, {
		key: 'positionHeader',
		value: function positionHeader() {
			this.header.frame = new CGRect(0, 0, this.width, this.heightOfHeader);
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

		// Home Page

	}, {
		key: 'homePageDownArrowWasClicked',
		value: function homePageDownArrowWasClicked(homePage) {
			this.parent.homeSectorEnterButtonWasClicked(this);
		}
	}]);

	return HomeSector;
}(JABView);