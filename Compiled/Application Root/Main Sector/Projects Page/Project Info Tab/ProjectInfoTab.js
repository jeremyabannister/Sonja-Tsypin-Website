'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectInfoTab = function (_JABView) {
	_inherits(ProjectInfoTab, _JABView);

	function ProjectInfoTab(customId) {
		_classCallCheck(this, ProjectInfoTab);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectInfoTab).call(this, customId));

		_this.state = {
			projectDataBundle: null,
			leftHanded: false,
			usedAtleastOnce: false
		};

		// Parameters
		_this.parameters = {
			sizeOfPlayButton: 80,
			sideBufferForPlayButton: 23,

			leftBufferForTitleLabel: 10,
			topBufferForTitleLabel: 0,
			bufferBetweenTitleLabelAndSubtitleLabel: 3,
			bufferBetweenSubtitleLabelAndDescriptionLabel: 7

		};

		// UI
		_this.bottomLine = new JABView('BottomLine');
		_this.sideLine = new JABView('SideLine');

		_this.noVideoMessageLabel = new UILabel('NoVideoMessageLabel');
		_this.playButton = new JABImageView('PlayButton');

		_this.titleLabel = new UILabel('TitleLabel');
		_this.subtitleLabel = new UILabel('SubtitleLabel');
		_this.descriptionLabel = new UILabel('DescriptionLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectInfoTab, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectInfoTab.prototype), 'init', this).call(this);
		}

		//
		// Getters and Setters
		//

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {

			this.addBottomLine();
			this.addSideLine();

			this.addNoVideoMessageLabel();
			this.addPlayButton();

			this.addTitleLabel();
			this.addSubtitleLabel();
			this.addDescriptionLabel();
		}
	}, {
		key: 'addBottomLine',
		value: function addBottomLine() {
			this.addSubview(this.bottomLine);
		}
	}, {
		key: 'addSideLine',
		value: function addSideLine() {
			this.addSubview(this.sideLine);
		}
	}, {
		key: 'addNoVideoMessageLabel',
		value: function addNoVideoMessageLabel() {
			this.addSubview(this.noVideoMessageLabel);
		}
	}, {
		key: 'addPlayButton',
		value: function addPlayButton() {
			this.addSubview(this.playButton);
		}
	}, {
		key: 'addTitleLabel',
		value: function addTitleLabel() {
			this.addSubview(this.titleLabel);
		}
	}, {
		key: 'addSubtitleLabel',
		value: function addSubtitleLabel() {
			this.addSubview(this.subtitleLabel);
		}
	}, {
		key: 'addDescriptionLabel',
		value: function addDescriptionLabel() {
			this.addSubview(this.descriptionLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectInfoTab.prototype), 'updateAllUI', this).call(this);

			this.parameters.sizeOfPlayButton = this.height * 0.5;

			this.configureBottomLine();
			this.positionBottomLine();

			this.configureSideLine();
			this.positionSideLine();

			this.configureNoVideoMessageLabel();
			this.positionNoVideoMessageLabel();

			this.configurePlayButton();
			this.positionPlayButton();

			this.configureTitleLabel();
			this.positionTitleLabel();

			this.configureSubtitleLabel();
			this.positionSubtitleLabel();

			this.configureDescriptionLabel();
			this.positionDescriptionLabel();
		}

		// Bottom Line

	}, {
		key: 'configureBottomLine',
		value: function configureBottomLine() {

			var view = this.bottomLine;

			view.backgroundColor = 'white';
		}
	}, {
		key: 'positionBottomLine',
		value: function positionBottomLine() {

			var view = this.bottomLine;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = 1;

			newFrame.origin.x = 0;
			newFrame.origin.y = this.height - newFrame.size.height;

			view.frame = newFrame;
		}

		// Side Line

	}, {
		key: 'configureSideLine',
		value: function configureSideLine() {

			var view = this.sideLine;

			view.backgroundColor = 'white';
			view.positionDuration = 0;
		}
	}, {
		key: 'positionSideLine',
		value: function positionSideLine() {

			var view = this.sideLine;
			var newFrame = new CGRect();

			newFrame.size.width = 1;
			newFrame.size.height = this.height;

			if (this.state.leftHanded) {
				newFrame.origin.x = 0;
			} else {
				newFrame.origin.x = this.width - newFrame.size.width;
			}

			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// No Video Message

	}, {
		key: 'configureNoVideoMessageLabel',
		value: function configureNoVideoMessageLabel() {

			var view = this.noVideoMessageLabel;
			var dataBundle = this.state.projectDataBundle;
			view.configureDuration = 0;

			if (dataBundle != null) {
				if (dataBundle.noVideoMessage != null) {

					view.opacity = 1;

					view.text = this.state.projectDataBundle.noVideoMessage;
					view.fontFamily = 'siteFont';
					view.fontSize = 12;
					view.textColor = 'white';
					view.textAlign = 'center';
				} else {
					view.opacity = 0;
				}
			}
		}
	}, {
		key: 'positionNoVideoMessageLabel',
		value: function positionNoVideoMessageLabel() {
			var view = this.noVideoMessageLabel;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text, 80);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.width - newFrame.size.width - 12;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Play Button

	}, {
		key: 'configurePlayButton',
		value: function configurePlayButton() {

			var view = this.playButton;
			view.src = './Resources/Images/Buttons/Play Button.png';
			view.cursor = 'pointer';
			view.positionDuration = 0;
			view.configureDuration = 0;

			if (this.state.projectDataBundle != null) {
				if (this.state.projectDataBundle.noVideoMessage == null) {
					view.opacity = 1;
					view.clickable = true;
				} else {
					view.opacity = 0;
					view.clickable = false;
				}
			}
		}
	}, {
		key: 'positionPlayButton',
		value: function positionPlayButton() {

			var view = this.playButton;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfPlayButton;
			newFrame.size.height = newFrame.size.width;

			if (this.state.leftHanded) {
				newFrame.origin.x = this.parameters.sideBufferForPlayButton;
			} else {
				newFrame.origin.x = this.width - newFrame.size.width - this.parameters.sideBufferForPlayButton;
			}
			newFrame.origin.y = (this.height - this.bottomLine.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Title Label

	}, {
		key: 'configureTitleLabel',
		value: function configureTitleLabel() {

			var view = this.titleLabel;
			var dataBundle = this.state.projectDataBundle;
			view.positionDuration = 0;

			if (dataBundle != null) {
				view.text = this.state.projectDataBundle.title;
				view.fontFamily = 'siteFont';
				view.fontSize = this.titleFontSize;
				view.letterSpacing = 1.5;
				view.textColor = 'white';
			}
		}
	}, {
		key: 'positionTitleLabel',
		value: function positionTitleLabel() {

			var view = this.titleLabel;
			var newFrame = new CGRect();
			var size = this.titleLabel.font.sizeOfString(this.titleLabel.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			if (this.state.leftHanded) {
				newFrame.origin.x = this.width - newFrame.size.width - this.parameters.leftBufferForTitleLabel;
			} else {
				newFrame.origin.x = this.parameters.leftBufferForTitleLabel;
			}

			newFrame.origin.y = this.parameters.topBufferForTitleLabel;

			view.frame = newFrame;
		}

		// Subtitle Label

	}, {
		key: 'configureSubtitleLabel',
		value: function configureSubtitleLabel() {

			var view = this.subtitleLabel;
			var dataBundle = this.state.projectDataBundle;

			view.positionDuration = 0;

			if (dataBundle != null) {
				view.text = 'dir. ' + this.state.projectDataBundle.director + ' | ' + this.state.projectDataBundle.movieType + ' | ' + this.state.projectDataBundle.year;
				view.fontFamily = 'siteFont';
				view.fontSize = this.titleFontSize * (13.0 / 20.0);
				view.letterSpacing = 1.5;
				view.textColor = '#ffffff';
			}
		}
	}, {
		key: 'positionSubtitleLabel',
		value: function positionSubtitleLabel() {

			var view = this.subtitleLabel;
			var newFrame = new CGRect();
			var size = this.subtitleLabel.font.sizeOfString(this.subtitleLabel.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			if (this.state.leftHanded) {
				newFrame.origin.x = this.titleLabel.right - newFrame.size.width;
			} else {
				newFrame.origin.x = this.titleLabel.x;
			}
			newFrame.origin.y = this.titleLabel.bottom + this.parameters.bufferBetweenTitleLabelAndSubtitleLabel;

			view.frame = newFrame;
		}

		// Description Label

	}, {
		key: 'configureDescriptionLabel',
		value: function configureDescriptionLabel() {

			var view = this.descriptionLabel;

			var dataBundle = this.state.projectDataBundle;
			if (dataBundle != null) {
				view.text = this.state.projectDataBundle.description;
			}
			view.fontFamily = 'siteFont';
			view.fontSize = this.titleFontSize * (11.0 / 20.0);
			view.hyphenate = true;
			view.positionDuration = 0;

			if (this.state.leftHanded) {
				view.textAlign = 'right';
			} else {
				view.textAlign = 'left';
			}

			view.textColor = '#aaaaaa';
		}
	}, {
		key: 'positionDescriptionLabel',
		value: function positionDescriptionLabel() {

			var view = this.descriptionLabel;
			var newFrame = new CGRect();

			newFrame.size.width = 300;
			if (this.playButton.x - this.titleLabel.x - 20 < newFrame.size.width) {
				newFrame.size.width = this.playButton.x - this.titleLabel.x - 20;
			}
			var size = view.font.sizeOfString(view.font.text, newFrame.size.width);

			newFrame.size.height = size.height;

			if (this.state.leftHanded) {
				newFrame.origin.x = this.titleLabel.right - newFrame.size.width;
			} else {
				newFrame.origin.x = this.titleLabel.x;
			}
			newFrame.origin.y = this.subtitleLabel.bottom + this.parameters.bufferBetweenSubtitleLabelAndDescriptionLabel;

			view.frame = newFrame;
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
			if (view == this.playButton) {
				this.parent.projectInfoTabPlayButtonWasClicked(this);
			}
		}
	}, {
		key: 'titleFontSize',
		get: function get() {
			if (sizeClass == 'xs') {
				return 14;
			} else if (sizeClass == 's') {
				return 16;
			} else {
				return 20;
			}
		}
	}]);

	return ProjectInfoTab;
}(JABView);