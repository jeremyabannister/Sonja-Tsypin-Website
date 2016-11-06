'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApplicationRoot = function (_JABApplicationRoot) {
	_inherits(ApplicationRoot, _JABApplicationRoot);

	function ApplicationRoot(customId) {
		_classCallCheck(this, ApplicationRoot);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationRoot).call(this, customId));

		_this.laboratoryEnabled = false;
		_this.contentWidth = { 'xxs': 0, 'xs': 0, 's': 780, 'm': 1000, 'l': 1000, 'xl': 1450 };
		_this.state = {
			headerBackdropHidden: false,
			initiallyLoading: true
		};

		_this.projectDataBundles = _this.assembleProjectDataBundles();
		_this.images = {};

		_this.websiteClosed = true;
		_this.websiteClosedLocked = false;

		// Parameters
		_this.parameters = {
			sizeOfInitialLoadingGifWrapper: 50,

			heightOfHeader: 110,

			numberOfHomePageImages: 10
		};

		if (_this.laboratoryEnabled) {
			_this.laboratory = new Laboratory('Laboratory');
		} else {

			// UI
			_this.initialLoadingGifWrapper = new JABGifWrapper('InitialLoadingGifWrapper');

			_this.mainSector = new MainSector('MainSector', _this.projectDataBundles);
			_this.headerBackdrop = new JABView('HeaderBackdrop');
			_this.homeSector = new HomeSector('HomeSector');
			_this.header = new Header('Header');
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(ApplicationRoot, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'init', this).call(this);

			this.getCoreImages();
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

			if (this.laboratoryEnabled) {
				this.addLaboratory();
			} else {

				this.addInitialLoadingGifWrapper();

				this.addMainSector();
				this.addHeaderBackdrop();
				this.addHomeSector();
				this.addHeader();
			}
		}
	}, {
		key: 'addInitialLoadingGifWrapper',
		value: function addInitialLoadingGifWrapper() {
			this.addSubview(this.initialLoadingGifWrapper);
		}
	}, {
		key: 'addMainSector',
		value: function addMainSector() {
			this.addSubview(this.mainSector);
		}
	}, {
		key: 'addHeaderBackdrop',
		value: function addHeaderBackdrop() {
			this.addSubview(this.headerBackdrop);
		}
	}, {
		key: 'addHomeSector',
		value: function addHomeSector() {
			this.addSubview(this.homeSector);
		}
	}, {
		key: 'addHeader',
		value: function addHeader() {
			this.addSubview(this.header);
		}
	}, {
		key: 'addLaboratory',
		value: function addLaboratory() {
			this.addSubview(this.laboratory);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ApplicationRoot.prototype), 'updateAllUI', this).call(this);

			if (this.laboratoryEnabled) {
				this.configureLaboratory();
				this.positionLaboratory();
			} else {

				this.configureInitialLoadingGifWrapper();
				this.positionInitialLoadingGifWrapper();

				this.configureMainSector();
				this.positionMainSector();

				this.configureHeaderBackdrop();
				this.positionHeaderBackdrop();

				this.configureHomeSector();
				this.positionHomeSector();

				this.configureHeader();
				this.positionHeader();
			}
		}

		// Initial Loading Gif Wrapper

	}, {
		key: 'configureInitialLoadingGifWrapper',
		value: function configureInitialLoadingGifWrapper() {

			var view = this.initialLoadingGifWrapper;

			if (this.state.initiallyLoading) {
				if (!(view.gif instanceof LoadingGif)) {
					view.gif = new LoadingGif();
				}

				if (!view.state.playing) {
					view.play();
				}
			}
		}
	}, {
		key: 'positionInitialLoadingGifWrapper',
		value: function positionInitialLoadingGifWrapper() {
			var view = this.initialLoadingGifWrapper;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfInitialLoadingGifWrapper;
			newFrame.size.height = newFrame.size.width;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = (this.height - newFrame.size.height) / 2;

			view.frame = newFrame;
		}

		// Main Sector

	}, {
		key: 'configureMainSector',
		value: function configureMainSector() {
			var view = this.mainSector;

			view.backgroundColor = 'black';
			view.parameters = {
				reservedTopBuffer: this.header.logo.bottom,
				heightOfHeader: this.parameters.heightOfHeader
			};
			view.projectDataBundles = this.projectDataBundles;

			view.state.currentlyActive = !this.websiteClosed;
			view.positionDuration = 0;

			if (this.state.initiallyLoading) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionMainSector',
		value: function positionMainSector() {
			this.mainSector.frame = new CGRect(0, 0, this.width, this.height);
		}

		// Header Backdrop

	}, {
		key: 'configureHeaderBackdrop',
		value: function configureHeaderBackdrop() {

			var view = this.headerBackdrop;
			view.backgroundColor = 'black';

			if (this.state.headerBackdropHidden || this.state.initiallyLoading) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}
		}
	}, {
		key: 'positionHeaderBackdrop',
		value: function positionHeaderBackdrop() {

			var view = this.headerBackdrop;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.parameters.heightOfHeader;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Home Sector

	}, {
		key: 'configureHomeSector',
		value: function configureHomeSector() {

			var view = this.homeSector;

			view.backgroundColor = 'black';

			if (websiteIsResizing) {
				view.positionDuration = 0;
			} else {
				view.positionDuration = 800;
			}

			view.positionEasingFunction = 'cubic-bezier(0.45, 0.06, 0.01, 0.95)';
			view.currentlyActive = this.websiteClosed;

			if (this.state.initiallyLoading) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionHomeSector',
		value: function positionHomeSector() {
			var newFrame = this.bounds;

			if (!this.websiteClosed) {
				newFrame.origin.y = -this.height;
			}

			this.homeSector.frame = newFrame;
		}

		// Header

	}, {
		key: 'configureHeader',
		value: function configureHeader() {

			var view = this.header;

			view.websiteClosed = this.websiteClosed;
			view.selectedMenuIndex = this.mainSector.state.pageIndex;
			view.configureDuration = 0;
			view.clickable = true;

			if (this.state.initiallyLoading) {
				view.opacity = 0;
			} else {
				view.opacity = 1;
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionHeader',
		value: function positionHeader() {
			this.header.frame = new CGRect(0, 0, this.width, this.parameters.heightOfHeader);

			this.configureMainSector(); // This is done because the mainSector's heightOfHeader parameter is dependent on the logo in the header which doesn't get positioned until after the parameter is given to the mainSector
		}

		// Laboratory

	}, {
		key: 'configureLaboratory',
		value: function configureLaboratory() {

			this.laboratory.backgroundColor = 'white';
		}
	}, {
		key: 'positionLaboratory',
		value: function positionLaboratory() {
			if (this.laboratoryEnabled) {
				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = this.height;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			} else {
				var newFrame = new CGRect();

				newFrame.size.width = 0;
				newFrame.size.height = 0;

				newFrame.origin.x = 0;
				newFrame.origin.y = 0;

				this.laboratory.frame = newFrame;
			}
		}

		//
		// Actions
		//

		// Navigation

	}, {
		key: 'openWebsite',
		value: function openWebsite(duration) {
			if (this.websiteClosed) {
				if (!this.websiteClosedLocked) {
					this.websiteClosed = false;
					websiteIsResizing = false;

					this.setWebsiteClosedLockedForTimeout(duration);

					if (duration == null) {
						duration = 800;
					}

					var applicationRoot = this;
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					}, function () {
						applicationRoot.homePageHidden = true;
						applicationRoot.mainSector.state.scrollable = true;
						applicationRoot.updateAllUI();
					});
				}
			}
		}
	}, {
		key: 'closeWebsite',
		value: function closeWebsite(duration) {
			if (!this.websiteClosed) {
				if (!this.websiteClosedLocked) {
					this.websiteClosed = true;
					websiteIsResizing = false;

					this.setWebsiteClosedLockedForTimeout(duration);

					if (duration == null) {
						duration = 800;
					}

					this.homePageHidden = false;
					this.configureHomeSector();
					this.animatedUpdate({

						configureDuration: duration,
						configureEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)',

						positionDuration: duration,
						positionEasingFunction: 'cubic-bezier(0.45, 0.06, 0.01, 0.95)'
					}, function () {
						applicationRoot.mainSector.state.scrollable = false;
						applicationRoot.updateAllUI();
					});
				}
			}
		}
	}, {
		key: 'setWebsiteClosedLockedForTimeout',
		value: function setWebsiteClosedLockedForTimeout(timeoutDuration) {
			this.websiteClosedLocked = true;
			var applicationRoot = this;
			setTimeout(function () {
				applicationRoot.websiteClosedLocked = false;
			}, timeoutDuration);
		}

		// Scrolling

	}, {
		key: 'userDidScrollByAmount',
		value: function userDidScrollByAmount(amount) {

			if (this.websiteClosed) {
				if (amount < 0) {
					this.openWebsite();
				}
			} else {
				if (amount > 0) {
					if (this.mainSector.readyToClose) {
						this.closeWebsite();
					}
				}
			}
		}

		// Swipe

	}, {
		key: 'leftSwipeDetected',
		value: function leftSwipeDetected() {
			this.mainSector.leftSwipeDetected();
		}
	}, {
		key: 'rightSwipeDetected',
		value: function rightSwipeDetected() {
			this.mainSector.rightSwipeDetected();
		}
	}, {
		key: 'upSwipeDetected',
		value: function upSwipeDetected() {
			if (this.websiteClosed) {
				this.openWebsite();
			}
		}
	}, {
		key: 'downSwipeDetected',
		value: function downSwipeDetected() {}

		// Keys

	}, {
		key: 'spaceBarWasPressed',
		value: function spaceBarWasPressed() {
			if (!this.websiteClosed) {
				this.mainSector.spaceBarWasPressed();
			}
		}
	}, {
		key: 'leftArrowWasPressed',
		value: function leftArrowWasPressed() {
			if (!this.websiteClosed) {
				this.mainSector.leftArrowWasPressed();
			}
		}
	}, {
		key: 'upArrowWasPressed',
		value: function upArrowWasPressed() {
			if (!this.websiteClosed) {
				if (this.mainSector.state.pageIndex == 0 || this.mainSector.state.pageIndex == 2) {
					this.closeWebsite();
				} else {
					this.mainSector.upArrowWasPressed();
				}
			}
		}
	}, {
		key: 'rightArrowWasPressed',
		value: function rightArrowWasPressed() {
			if (!this.websiteClosed) {
				this.mainSector.rightArrowWasPressed();
			}
		}
	}, {
		key: 'downArrowWasPressed',
		value: function downArrowWasPressed() {
			if (!this.websiteClosed) {
				this.mainSector.downArrowWasPressed();
			} else {
				this.openWebsite();
			}
		}

		// Project Data

	}, {
		key: 'assembleProjectDataBundles',
		value: function assembleProjectDataBundles() {

			var dataBundles = [];

			// Powder Room
			var dataBundle = new ProjectDataBundle();
			dataBundle.id = 'powderRoom';
			dataBundle.title = 'POWDER ROOM';
			dataBundle.director = 'SONJA TSYPIN';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Jessica Kay Park, John Patrick Maddock</span><br/>A wildly popular online personality who hasn't left her apartment in four years has her tiny world turned upside down when a stranger forces himself into her peculiar space.";

			dataBundle.vimeoId = '167824606';
			dataBundle.vimeoHeightToWidth = 1.0 / 2.35;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/1/';
			for (var i = 0; i < 4; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 2;

			dataBundles.push(dataBundle);

			// Angels
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'angels';
			dataBundle.title = 'ANGELS';
			dataBundle.director = 'AUDREY BANKS';
			dataBundle.movieType = 'FEATURE';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Moni Bell, Eva Evans, Gabriel Sommer, Joanna Janetakis</span><br/>A man who goes by 'Sir' is holding a mansion full of beautiful women prisoner when a new arrival threatens his power.";

			dataBundle.noVideoMessage = 'TRAILER COMING SOON';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/2/';
			for (var i = 0; i < 5; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 3;

			dataBundles.push(dataBundle);

			// Birth Day
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'birthDay';
			dataBundle.title = 'BIRTH DAY';
			dataBundle.director = 'EVA EVANS';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Tessa Gourin</span><br/>A young girl finds herself struggling to distinguish between reality and a haunting memory.";

			dataBundle.vimeoId = '172178428';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/3/';
			for (var i = 0; i < 2; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// Theodore
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'theodore';
			dataBundle.title = 'THEODORE';
			dataBundle.director = 'ONDINE VI' + upperCaseEnya + 'AO';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2015';
			dataBundle.description = "<span style='color:white'>Starring Camillia Hartman, Dexter Zimet</span><br/>A romantic rural retreat takes a terrifying turn after a local offers some chilling advice.";

			dataBundle.vimeoId = '139578681';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/4/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// Found Guilty
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'foundGuilty';
			dataBundle.title = 'FOUND GUILTY';
			dataBundle.director = 'SONJA TSYPIN';
			dataBundle.movieType = 'SHORT';
			dataBundle.year = '2014';
			dataBundle.description = '<span style="color:white">Starring Tuva Hildebrand</span><br/>In a short film remake of the famous murder scene from Alfred Hitchcock\'s "Blackmail," a woman must come to terms with herself after commiting an unthinkable crime out of self-defense.';

			dataBundle.vimeoId = '99426346';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/5/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			// As Long As I Have You
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'asLongAsIHaveYou';
			dataBundle.title = 'AS LONG AS I HAVE YOU';
			dataBundle.director = 'ONDINE VI' + upperCaseEnya + 'AO';
			dataBundle.movieType = 'MUSIC VIDEO';
			dataBundle.year = '2016';
			dataBundle.description = "<span style='color:white'>Starring Annalisa Plumb</span><br/>An experimental video to the track 'As Long As I Have You' by Elvis Presley.";

			dataBundle.vimeoId = '152982438';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/6/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			//
			// Hidden
			//

			// Contact Esterina
			dataBundle = new ProjectDataBundle();
			dataBundle.id = 'contactEsterina';
			dataBundle.title = 'CONTACT ESTERINA';
			dataBundle.director = 'SONJA TSYPIN';
			dataBundle.movieType = 'DOCUMENTARY';
			dataBundle.year = '2014';
			dataBundle.description = "<span style='color:white'>Starring Esterina Seto</span><br/>";
			dataBundle.hidden = true;

			dataBundle.vimeoId = '126022343';
			dataBundle.vimeoHeightToWidth = 9.0 / 16.0;

			var pathStem = '/Resources/Images/Projects Page/Project Data Bundles/6/';
			for (var i = 0; i < 1; i++) {
				var index = i + 1;
				dataBundle.stills.push(pathStem + 'still' + index + '.jpg');
			}
			dataBundle.mainStillIndex = 0;

			dataBundles.push(dataBundle);

			return dataBundles;
		}
	}, {
		key: 'getCoreImages',
		value: function getCoreImages() {

			var numberOfHomePageImagesLoadedAtFirst = 2;

			var homePageImageStem = '/Resources/Images/Home Page/Featured Stills/';
			var buttonImageStem = '/Resources/Images/Buttons/';
			var projectsPageImageStem = '/Resources/Images/Projects Page/Project Data Bundles/';

			var projectsPageIndexCombinations = [[1, 3], [2, 4], [3, 1], [4, 1], [5, 1], [6, 1]];

			// Home Page (first batch)
			for (var i = 0; i < numberOfHomePageImagesLoadedAtFirst; i++) {
				imageBank.addToQueue(homePageImageStem + (i + 1) + '.jpg');
			}
			imageBank.addToQueue(buttonImageStem + 'Enter Arrow.png');

			// Reel Page
			imageBank.addToQueue('/Resources/Images/Reel Page/Reel Cover Photo.png');
			imageBank.addToQueue(buttonImageStem + 'Play Button.png', this);

			// Footer
			imageBank.addToQueue(buttonImageStem + 'Instagram Button.png');
			imageBank.addToQueue(buttonImageStem + 'Art Button.png');
			imageBank.addToQueue(buttonImageStem + 'Email Button.png', this);

			// Projects Page
			for (var i = 0; i < projectsPageIndexCombinations.length; i++) {
				imageBank.addToQueue(projectsPageImageStem + projectsPageIndexCombinations[i][0] + '/still' + projectsPageIndexCombinations[i][1] + '.jpg');
			}

			// Home Page (second batch)
			for (var i = 0; i < this.parameters.numberOfHomePageImages - numberOfHomePageImagesLoadedAtFirst; i++) {
				imageBank.addToQueue(homePageImageStem + (numberOfHomePageImagesLoadedAtFirst + i) + '.jpg', this);
			}
		}

		//
		// Delegate
		//

		// Image Bank

	}, {
		key: 'imageDidFinishLoading',
		value: function imageDidFinishLoading(src) {
			if (src == '/Resources/Images/Buttons/Play Button.png') {
				this.state.initiallyLoading = false;
				this.updateAllUI();
			} else if (src.lastIndexOf('/Resources/Images/Buttons/', 0) != -1) {
				this.updateAllUI();
			} else if (src.lastIndexOf('/Resources/Images/Home Page/Featured Stills/', 0) != -1) {
				this.homeSector.updateAllUI();
			}
		}

		// JABView

	}, {
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {

			if (view == this.header) {
				this.mainSector.closeCurrentlyOpenProject();
				this.mainSector.closeMailFormPage();
				this.mainSector.projectsPage.deselectProjects();
			}
		}

		// Main Sector

	}, {
		key: 'mainSectorWantsToUseFullScreen',
		value: function mainSectorWantsToUseFullScreen(mainSector) {
			this.state = { headerBackdropHidden: true };
			this.animatedUpdate();
		}
	}, {
		key: 'mainSectorWantsToRelinquishFullScreen',
		value: function mainSectorWantsToRelinquishFullScreen(mainSector) {
			this.state = { headerBackdropHidden: false };
			this.animatedUpdate();
		}
	}, {
		key: 'mainSectorWantsToOpenAboutPage',
		value: function mainSectorWantsToOpenAboutPage(mainSector) {
			this.mainSector.state = {
				pageIndex: 2,
				projectOpen: false
			};
			this.animatedUpdate();
		}

		// Home Sector

	}, {
		key: 'homeSectorEnterButtonWasClicked',
		value: function homeSectorEnterButtonWasClicked(homeSector) {
			this.openWebsite();
		}

		// Header

	}, {
		key: 'headerLogoWasClicked',
		value: function headerLogoWasClicked() {
			this.closeWebsite();
		}
	}, {
		key: 'headerDidSelectPage',
		value: function headerDidSelectPage(pageIndex) {

			this.mainSector.state = {
				pageIndex: pageIndex,
				projectOpen: false
			};

			if (this.websiteClosed) {
				this.openWebsite();
			} else {
				this.updateAllUI(); // Use non-animated update because the only thing that should animate is the menu underline which has its own hardcoded positionDuration. If animated update is used then the newly selected page fades in but we want it to pop it
			}
		}
	}, {
		key: 'contentWidth',
		get: function get() {
			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				return this.width;
			} else {
				return this._contentWidth[sizeClass];
			}
		},
		set: function set(newContentWidth) {
			this._contentWidth = newContentWidth;
		}
	}]);

	return ApplicationRoot;
}(JABApplicationRoot);