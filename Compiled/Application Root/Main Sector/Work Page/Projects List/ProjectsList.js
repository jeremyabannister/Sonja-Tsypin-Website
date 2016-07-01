'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectsList = function (_JABView) {
	_inherits(ProjectsList, _JABView);

	function ProjectsList(customId) {
		_classCallCheck(this, ProjectsList);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectsList).call(this, customId));

		_this.projectDataBundles = _this.assembleProjectDataBundles();
		_this.comingSoon = true;

		// UI
		_this.projectRows = [];
		for (var i = 0; i < _this.projectDataBundles.length; i++) {
			_this.projectRows.push(new ProjectRow(null, _this.projectDataBundles[i]));
		}

		return _this;
	}

	//
	// UI
	//

	// Add


	_createClass(ProjectsList, [{
		key: 'addAllUI',
		value: function addAllUI() {

			this.addProjectRows();
		}
	}, {
		key: 'addProjectRows',
		value: function addProjectRows() {
			for (var i = 0; i < this.projectRows.length; i++) {
				this.addSubview(this.projectRows[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectsList.prototype), 'updateAllUI', this).call(this);

			this.configureProjectRows();
			this.positionProjectRows();
		}

		// Project Rows

	}, {
		key: 'configureProjectRows',
		value: function configureProjectRows() {

			for (var i = 0; i < this.projectRows.length; i++) {
				this.projectRows[i].projectDataBundle = this.projectDataBundles[i];

				if (this.comingSoon) {
					this.projectRows[i].opacity = 0;
				}
			}
		}
	}, {
		key: 'positionProjectRows',
		value: function positionProjectRows() {

			var topBufferForTopProjectRow = 0;
			var betweenBufferForProjectRows = 50;

			for (var i = 0; i < this.projectRows.length; i++) {
				var newFrame = new CGRect();

				newFrame.size.width = this.width;
				newFrame.size.height = applicationRoot.contentWidth / this.projectRows[i].widthToHeightRatio;

				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = topBufferForTopProjectRow + i * (newFrame.size.height + betweenBufferForProjectRows);

				this.projectRows[i].frame = newFrame;
			}
		}

		//
		// Actions
		//

	}, {
		key: 'assembleProjectDataBundles',
		value: function assembleProjectDataBundles() {

			var dataBundles = [];

			var powderRoom = new ProjectDataBundle();
			powderRoom.id = 'powderRoom';
			powderRoom.title = 'POWDER ROOM';
			powderRoom.subtitle = 'dir. SONJA TSYPIN';
			powderRoom.year = '2016';

			powderRoom.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg'];
			powderRoom.mainStillIndex = 2;

			dataBundles.push(powderRoom);

			var powderRoom2 = new ProjectDataBundle();
			powderRoom2.id = 'powderRoom';
			powderRoom2.title = 'POWDER ROOM';
			powderRoom2.subtitle = 'dir. SONJA TSYPIN';
			powderRoom2.year = '2016';

			powderRoom2.stills = ['./Resources/Images/Work Page/Project Data Bundles/Powder Room/main.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary1.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary2.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg', './Resources/Images/Work Page/Project Data Bundles/Powder Room/secondary3.jpg'];
			powderRoom2.mainStillIndex = 0;

			// dataBundles.push(powderRoom2)

			return dataBundles;
		}
	}]);

	return ProjectsList;
}(JABView);