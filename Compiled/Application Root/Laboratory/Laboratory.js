'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Laboratory = function (_JABView) {
	_inherits(Laboratory, _JABView);

	function Laboratory(customId) {
		_classCallCheck(this, Laboratory);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Laboratory).call(this, customId));

		_this.timeMark1 = 0;
		_this.big = false;

		// UI
		_this.view1 = new UILabel();
		_this.view2 = new JABView('View2', _this);

		_this.defaultTimeInterval = 1000;
		_this.specificTimeIntervals = [26];

		_this.numberOfExperiments = 0; // Actual value is set in runExperiment which is run on the next line

		_this.runExperiment(0); // This is to set the actual number of experiments. The only reason for this way of doing it is so that when working quickly in the method down below the number of experiments can be changed without having to scroll up the document

		var lab = _this;
		for (var i = 0; i < _this.numberOfExperiments; i++) {

			var interval = 0;
			for (var j = 0; j < i; j++) {
				if (_this.specificTimeIntervals.length > j) {
					interval += _this.specificTimeIntervals[j];
				}
			}

			if (_this.specificTimeIntervals.length > i) {
				interval += _this.specificTimeIntervals[i];
			} else {
				interval += _this.defaultTimeInterval;
			}

			var k = i + 1;
			setTimeout(function (k) {
				lab.runExperiment(k);
			}, interval, k);
		}

		// Initialize
		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(Laboratory, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addView1();
			this.addView2();
		}
	}, {
		key: 'addView2',
		value: function addView2() {
			this.addSubview(this.view1);
		}
	}, {
		key: 'addView1',
		value: function addView1() {
			this.addSubview(this.view2);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(Laboratory.prototype), 'updateAllUI', this).call(this);

			this.configureView1();
			this.positionView1();

			this.configureView2();
			this.positionView2();
		}

		// View 1

	}, {
		key: 'configureView1',
		value: function configureView1() {
			this.view1.red();
			this.view1.text = 'SONJA TSYPIN';
			this.view1.fontFamily = 'siteFont';
			this.view1.positionDuration = 1000;
		}
	}, {
		key: 'positionView1',
		value: function positionView1() {

			this.view1.width = 'auto';
			this.view1.height = 'auto';
		}
	}, {
		key: 'configureView2',
		value: function configureView2() {

			this.view2.blue();
		}
	}, {
		key: 'positionView2',
		value: function positionView2() {

			var newFrame = new CGRect();

			newFrame.size.width = 127;
			newFrame.size.height = 20;

			newFrame.origin.x = 0;
			newFrame.origin.y = 40;

			this.view2.frame = newFrame;

			console.log(this.view1.font.sizeOfString(this.view1.text));
		}

		//
		// Actions
		//

	}, {
		key: 'currentTime',
		value: function currentTime() {
			return new Date().getTime();
		}
	}, {
		key: 'runExperiment',
		value: function runExperiment(experimentNumber) {

			this.numberOfExperiments = 3;
			console.log("<<<<<<<<<< Launching Experiment #" + experimentNumber + ' >>>>>>>>>>');

			if (experimentNumber == 1) {} else if (experimentNumber == 2) {

				this.view1.width = 300;
				this.view1.x += 500;
			} else if (experimentNumber == 3) {}
		}
	}]);

	return Laboratory;
}(JABView);

var Test = function (_JABView2) {
	_inherits(Test, _JABView2);

	function Test(customId) {
		_classCallCheck(this, Test);

		// State

		// UI

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Test).call(this, customId));

		_this2.sub = new JABView();

		// Initialize
		return _this2;
	}

	//
	// UI
	//

	// Add


	_createClass(Test, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addSub();
		}
	}, {
		key: 'addSub',
		value: function addSub() {
			this.addSubview(this.sub);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(Test.prototype), 'updateAllUI', this).call(this);

			this.configureSub();
			this.positionSub();
		}
	}, {
		key: 'configureSub',
		value: function configureSub() {

			this.sub.green();
		}
	}, {
		key: 'positionSub',
		value: function positionSub() {

			var newFrame = new CGRect();

			newFrame.size.width = this.width / 2;
			newFrame.size.height = 30;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			this.sub.frame = newFrame;
		}

		//
		// Actions
		//

		// Delegate

	}]);

	return Test;
}(JABView);