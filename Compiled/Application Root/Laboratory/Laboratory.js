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
		_this.view1 = new JABImageView('View1');
		_this.view2 = new JABImageView('View2');

		_this.defaultTimeInterval = 5000;
		_this.specificTimeIntervals = [2000]; // First one specifies start delay and is necessary

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

			var view = this.view1;
			view.positionDuration = 600;
			view.red();
		}
	}, {
		key: 'positionView1',
		value: function positionView1() {

			var view = this.view1;
			var newFrame = new CGRect();

			newFrame.size.width = 100;
			newFrame.size.height = 100;

			newFrame.origin.x = 300;
			newFrame.origin.y = 100;

			view.frame = newFrame;
		}
	}, {
		key: 'configureView2',
		value: function configureView2() {

			var view = this.view2;
			view.blue();
		}
	}, {
		key: 'positionView2',
		value: function positionView2() {

			var view = this.view2;
			var newFrame = new CGRect();

			newFrame.size.width = 100;
			newFrame.size.height = 100;

			newFrame.origin.x = 600;
			newFrame.origin.y = 200;

			view.frame = newFrame;
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

			var view1 = this.view1;
			var view2 = this.view2;

			this.numberOfExperiments = 2;
			console.log('<<<<<<<<<< Launching Experiment #' + experimentNumber + ' >>>>>>>>>>');

			if (experimentNumber == 1) {

				// var ref = new Firebase("https://sonjatsypin-b7a3e.firebaseio.co./Resources/Images/Home Page/Featured Stills")

				this.downloaded = true;
				var lab = this;
				this.test = new Image();
				$(this.test).on('load', function () {
					console.log('finished download');
					lab.downloaded = true;
				});

				var imageRef = storageRef.child("Resources/Images/Home Page/Featured Stills/8.jpg");

				imageRef.getDownloadURL().then(function (url) {
					// Get the download URL for 'images/stars.jpg'
					// This can be inserted into an <img> tag
					// This can also be downloaded directly
					console.log('starting download');
					// lab.test.src = url
					lab.url = url;
				}).catch(function (error) {
					// Handle any errors
					console.log('error', error);
				});
			} else if (experimentNumber == 2) {

				if (this.downloaded) {
					view1.src = this.url;
				}
			} else if (experimentNumber == 3) {}

			console.log('<<<<<<<<<< Ending Experiment #' + experimentNumber + ' >>>>>>>>>>');
		}

		// @keyframes test {0% {-webkit-clip-path: polygon(0px 0px, 100px 90px, 40px 60px, 0px 12px);} 100% {-webkit-clip-path: polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px);}}

		// @keyframes View1---Laboratory---ApplicationRoot { 0% { clip-path: polygon(0px 0px, 100px 90px, 40px 60px, 0px 12px); -webkit-clip-path: polygon(0px 0px, 100px 90px, 40px 60px, 0px 12px);} 100% { clip-path: polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px); -webkit-clip-path: polygon(0px 0px, 100px 0px, 100px 100px, 0px 100px);} }

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