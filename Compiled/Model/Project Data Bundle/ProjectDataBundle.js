'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectDataBundle = function () {
	function ProjectDataBundle() {
		_classCallCheck(this, ProjectDataBundle);

		this.metaDataBundle = new ProjectMetaDataBundle();
		this.stillsBundle = new ProjectStillsBundle();
		this.videoBundle = new ProjectVideoBundle();

		this.id = '';
		this.title = '';
		this.subtitle = '';
		this.year = '';

		this.vimeoId = '';
		this.stills = [];
		this.mainStillIndex = 0;

		this.mainStill = '';
		this.secondaryStills = [];
	}

	// Custom Getters and Setters

	// Id


	_createClass(ProjectDataBundle, [{
		key: 'id',
		get: function get() {
			return this.metaDataBundle.id;
		},
		set: function set(newId) {
			this.metaDataBundle.id = newId;
			this.metaDataBundle = this.metaDataBundle;
		}

		// Title

	}, {
		key: 'title',
		get: function get() {
			return this.metaDataBundle.title;
		},
		set: function set(newTitle) {
			this.metaDataBundle.title = newTitle;
			this.metaDataBundle = this.metaDataBundle;
		}

		// Subtitle

	}, {
		key: 'subtitle',
		get: function get() {
			return this.metaDataBundle.subtitle;
		},
		set: function set(newSubtitle) {
			this.metaDataBundle.subtitle = newSubtitle;
			this.metaDataBundle = this.metaDataBundle;
		}

		// Year

	}, {
		key: 'year',
		get: function get() {
			return this.metaDataBundle.year;
		},
		set: function set(newYear) {
			this.metaDataBundle.year = newYear;
			this.metaDataBundle = this.metaDataBundle;
		}

		// Vimeo Id

	}, {
		key: 'vimeoId',
		get: function get() {
			return this.videoBundle.vimeoId;
		},
		set: function set(newVimeoId) {
			this.videoBundle.vimeoId = newVimeoId;
			this.videoBundle = this.videoBundle;
		}

		// Stills

	}, {
		key: 'stills',
		get: function get() {
			return this.stillsBundle.stills;
		},
		set: function set(newStills) {
			this.stillsBundle.stills = newStills;
			this.stillsBundle = this.stillsBundle;
		}

		// Main Still Index

	}, {
		key: 'mainStillIndex',
		get: function get() {
			return this.stillsBundle.mainStillIndex;
		},
		set: function set(newMainStillIndex) {
			this.stillsBundle.mainStillIndex = newMainStillIndex;
			this.stillsBundle = this.stillsBundle;
		}

		// Main Still

	}, {
		key: 'mainStill',
		get: function get() {
			return this.stillsBundle.mainStill;
		},
		set: function set(newMainStill) {
			this.stillsBundle.mainStill = newMainStill;
			this.stillsBundle = this.stillsBundle;
		}

		// Secondary Stills

	}, {
		key: 'secondaryStills',
		get: function get() {
			return this.stillsBundle.secondaryStills;
		},
		set: function set(newSecondaryStills) {
			this.stillsBundle.secondaryStills = newSecondaryStills;
			this.stillsBundle = this.stillsBundle;
		}
	}]);

	return ProjectDataBundle;
}();