"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JABImageBank = function () {
	function JABImageBank() {
		_classCallCheck(this, JABImageBank);

		// Queue
		this.queue = [];

		// Images
		this.imageStatus = {};

		// Subscribers
		this.subscribersPerImage = {};
	}

	// Queue


	_createClass(JABImageBank, [{
		key: "startQueue",
		value: function startQueue() {
			if (this.queue.length > 0) {
				var imageObject = new Image();
				var bank = this;
				imageObject.onload = function () {
					bank.imageCompletedLoading(bank.queue[0]);
				};
				imageObject.src = this.queue[0];
			}
		}
	}, {
		key: "advanceQueue",
		value: function advanceQueue() {
			if (this.queue.length > 0) {
				this.queue.splice(0, 1);
			}

			this.startQueue();
		}
	}, {
		key: "addToQueue",
		value: function addToQueue(src, subscriber) {
			if (subscriber != null) {
				this.subscribersPerImage[src] = subscriber;
			}

			this.queue.push(src);
			if (this.queue.length == 1) {
				this.startQueue();
			}
		}

		// Loading

	}, {
		key: "imageCompletedLoading",
		value: function imageCompletedLoading(src) {
			this.imageStatus[src] = true;
			if (this.subscribersPerImage[src] != null) {
				this.subscribersPerImage[src].imageDidFinishLoading(src);
			}
			this.advanceQueue();
		}
	}]);

	return JABImageBank;
}();