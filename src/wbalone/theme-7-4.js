(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("tinper-bee"), require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "tinper-bee", "axios"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("ReactDOM"), require("tinper-bee"), require("axios")) : factory(root["React"], root["ReactDOM"], root["tinper-bee"], root["axios"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_92__, __WEBPACK_EXTERNAL_MODULE_178__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _Main = __webpack_require__(3);

	var _Main2 = _interopRequireDefault(_Main);

	__webpack_require__(209);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _reactDom.render)(_react2.default.createElement(_Main2.default, null), document.getElementById('app'));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getPrototypeOf = __webpack_require__(7);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(32);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(33);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(37);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tinperBee = __webpack_require__(92);

	var _OverlayTrigger = __webpack_require__(93);

	var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

	var _reactCookie = __webpack_require__(173);

	var _reactCookie2 = _interopRequireDefault(_reactCookie);

	var _Tabs = __webpack_require__(176);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	var _UserMenu = __webpack_require__(177);

	var _UserMenu2 = _interopRequireDefault(_UserMenu);

	var _directorRouter = __webpack_require__(179);

	var _axios = __webpack_require__(178);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var classNames = __webpack_require__(99);

	__webpack_require__(197).polyfill();
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);

	__webpack_require__(202);
	window.designer = __webpack_require__(190);
	window.widgets = __webpack_require__(181);
	__webpack_require__(203);

	__webpack_require__(204);
	// var Tabs = require('../js/ext/tabs');
	// var tabs = new Tabs();

	var Menu = _tinperBee.Navbar.Menu;
	var SubMenu = Menu.SubMenu;
	var MenuItemGroup = Menu.MenuItemGroup;
	var NavItem = _tinperBee.Navbar.NavItem;
	var Header = _tinperBee.Navbar.Header;
	var Brand = _tinperBee.Navbar.Brand;
	var Collapse = _tinperBee.Navbar.Collapse;
	var Toggle = _tinperBee.Navbar.Toggle;
	var Nav = _tinperBee.Navbar.Nav;
	var SideContainer = _tinperBee.Navbar.SideContainer;

	var App = function (_Component) {
	    (0, _inherits3.default)(App, _Component);

	    function App(props, context) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props, context));

	        var menus = _this.getTabs();

	        var self = _this;

	        _this.state = {
	            current: '',
	            openKeys: [],
	            currentRouter: '',
	            menu: [],
	            expanded: false,
	            firstUrl: '',
	            curentOpenKeys: [],
	            submenuSelected: '',
	            isOpenTab: window.isOpenTab,
	            menus: menus,
	            tabNum: menus.length
	        };

	        _this.delTrigger();

	        _this.showMenu = _this.showMenu.bind(_this);
	        _this.setCurrent = _this.setCurrent.bind(_this);
	        _this.del = _this.del.bind(_this);
	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'delTrigger',
	        value: function delTrigger() {
	            var self = this;
	            $('body').on('del', function (e, data) {

	                sessionStorage['tabs'] = (0, _stringify2.default)(data.menus);

	                sessionStorage['current'] = (0, _stringify2.default)({
	                    current: data.current
	                });

	                self.setState(data);
	            });
	            window.confirmDel = function (data) {
	                $('body').trigger('del', [data]);
	            };
	        }
	    }, {
	        key: 'onToggle',
	        value: function onToggle(value) {
	            //this.setState({expanded: value});
	            var v = this.state.expanded;

	            if (v) {
	                var keys = this.state.openKeys;
	                this.setState({ expanded: !v, openKeys: [], curentOpenKeys: keys });
	            } else {
	                var _keys = this.state.curentOpenKeys;
	                this.setState({ expanded: !v, openKeys: _keys, curentOpenKeys: _keys });
	            }
	            // if (value) {
	            //     var keys = this.state.openKeys;
	            //     this.setState({ expanded: value, openKeys: [], curentOpenKeys: keys });
	            // } else {
	            //     var _keys = this.state.curentOpenKeys;
	            //     this.setState({ expanded: value, openKeys: _keys, curentOpenKeys: _keys });
	            // }
	        }
	    }, {
	        key: 'handleDefault',
	        value: function handleDefault(e) {
	            if (window.isOpenTab) {
	                //dom.href = 'javascript:;'
	                e.preventDefault();
	            }
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e, obj) {
	            //判断是否点击子菜单,1:当前子菜单，2:2级别子菜单。。。

	            var self = this;

	            var data = e.keyPath.length == 1 ? {
	                current: e.key,
	                openKeys: [],
	                submenuSelected: '',
	                curentOpenKeys: [],
	                userMenu: false
	            } : {
	                current: e.key
	            };

	            if (obj) {
	                var title = obj.title;
	                var router = obj.router;
	            } else {
	                var dom = ReactDOM.findDOMNode(this.refs[e.key]);
	                var title = dom.title;
	                var router = dom.href;
	            }

	            var options = {
	                title: title,
	                router: router,
	                id: e.key
	            };

	            this.setState(data);

	            //点击已经选中的节点时
	            if (e.key == this.state.current) {
	                var url = location.hash;
	                window.router.dispatch('on', url.replace('#', ''));
	            } else {
	                this.createTab(options);
	            }
	        }
	    }, {
	        key: 'createTab',
	        value: function createTab(options, value) {

	            var self = this;

	            if (!window.sessionStorage) {
	                alert('This browser does NOT support sessionStorage');
	                return false;
	            }

	            var menu = this.state.menus;

	            if ((0, _stringify2.default)(menu).indexOf('"id":"' + options.id + '"') != -1 && menu.length != 0) {
	                return false;
	            }

	            var menuObj = JSON.parse((0, _stringify2.default)(menu));

	            menuObj[menuObj.length] = options;

	            if (menuObj.length == 10) {
	                return false;
	            }

	            sessionStorage['tabs'] = (0, _stringify2.default)(menuObj);

	            sessionStorage['current'] = (0, _stringify2.default)({
	                current: options.id
	            });

	            this.setState({
	                menus: menuObj,
	                current: options.id
	            });

	            setTimeout(function () {
	                self.resizeIfr();
	            }, 0);
	        }
	    }, {
	        key: 'getTabs',
	        value: function getTabs() {

	            if (!window.sessionStorage) {
	                alert('This browser does NOT support sessionStorage');
	                return false;
	            }

	            // var tabs = [];
	            // for (var i =0;i<sessionStorage['tabs'].length;i++){
	            //     var key = sessionStorage.key(i);
	            //     var obj = JSON.parse(sessionStorage[key]);
	            //     tabs.push(obj);
	            // }

	            var menus = sessionStorage['tabs'] != undefined ? JSON.parse(sessionStorage['tabs']) : [];

	            return menus;
	        }
	    }, {
	        key: 'setCurrent',
	        value: function setCurrent(value) {
	            var self = this;

	            this.setState({
	                current: value
	            });

	            sessionStorage['current'] = (0, _stringify2.default)({
	                current: value
	            });

	            setTimeout(function () {
	                self.resizeIfr();
	            }, 0);
	        }
	    }, {
	        key: 'del',
	        value: function del(data) {

	            sessionStorage['tabs'] = (0, _stringify2.default)(data.menus);

	            sessionStorage['current'] = (0, _stringify2.default)({
	                current: data.current
	            });

	            this.setState(data);
	        }
	    }, {
	        key: 'showMenu',
	        value: function showMenu(e) {
	            console.log(e);
	            var state = this.state.userMenu;
	            this.setState({ "userMenu": !state });
	        }
	    }, {
	        key: 'onOpenChange',
	        value: function onOpenChange(openKeys) {

	            var state = this.state;

	            var latestOpenKey = this.myfilter(openKeys, state.openKeys);
	            var latestCloseKey = this.myfilter(state.openKeys, openKeys);

	            /*   const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	             const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));*/

	            var nextOpenKeys = [];

	            if (latestOpenKey) {
	                nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	            }
	            if (latestCloseKey) {
	                nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	            }

	            this.setState({ current: openKeys, submenuSelected: openKeys, openKeys: openKeys, expanded: false });
	        }
	        //IE下 array.find（）方法不可用

	    }, {
	        key: 'myfilter',
	        value: function myfilter(arr1, arr2) {
	            if (arr2.length == 0 || !arr2) {
	                return arr1[0];
	            }

	            for (var i = 0; i < arr1.length; i++) {
	                if (arr2.indexOf(arr1[i].toString()) == -1) {
	                    return arr1[i];
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'getAncestorKeys',
	        value: function getAncestorKeys(key) {
	            var map = {
	                sub3: ['sub2']
	            };
	            return map[key] || [];
	        }
	    }, {
	        key: 'sessionStorage',
	        value: function (_sessionStorage) {
	            function sessionStorage(_x) {
	                return _sessionStorage.apply(this, arguments);
	            }

	            sessionStorage.toString = function () {
	                return _sessionStorage.toString();
	            };

	            return sessionStorage;
	        }(function (openKeys) {
	            if (sessionStorage && openKeys) {
	                sessionStorage['openKeys'] = openKeys;
	            } else {
	                return sessionStorage['openKeys'];
	            }
	        })
	    }, {
	        key: 'formmaterUrl',
	        value: function formmaterUrl(item) {
	            var uri = " ";
	            if (item.urltype === 'url') {
	                var target = item.openview == "blank" ? "_blank" : "";
	                if (target) {
	                    uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.location));
	                } else {
	                    uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
	                }
	                return uri;
	            } else if (item.urltype === 'plugin') {
	                uri = item.id ? '#/' + item.id : "#/index_plugin";
	                //window.registerRouter(uri.replace("#", ""), item.location);

	                uri = encodeURIComponent(encodeURIComponent('index-view.html' + uri));
	                return uri;
	            } else if (item.urltype === 'view') {
	                uri = item.location;
	                uri = uri.replace("#", "/");

	                if (uri[0] == '/') {
	                    uri = "/sidebar" + uri;
	                } else {
	                    uri = "/sidebar/" + uri;
	                }
	                // window.addRouter(uri);
	                // return  "#"+uri;

	                return encodeURIComponent(encodeURIComponent('index-view.html#' + uri));
	            } else if (item.urltype == undefined) {
	                item.location = '404';
	                return '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
	            } else {
	                return item.location;
	            }
	        }
	    }, {
	        key: 'setMenu',
	        value: function setMenu(response) {
	            var self = this;
	            var url = decodeURIComponent(decodeURIComponent(location.hash));

	            var obj = sessionStorage['current'] != undefined ? JSON.parse(sessionStorage['current']) : '';

	            if (obj) {
	                this.state.current = obj.current;

	                //设定iframe高度
	                setTimeout(function () {
	                    self.resizeIfr();
	                }, 0);
	                return false;
	            }

	            response.data.data.map(function (item, index) {

	                if (Array.isArray(item.children) && item.children.length > 0) {

	                    item.children.map(function (it, index) {
	                        var selected = url.indexOf(it.location || 'null') >= 0 ? it.id : "";
	                        if (selected) {
	                            self.setState({
	                                current: selected
	                            });
	                        }
	                        if (it == 0) {
	                            self.setState({
	                                firstUrl: item.location
	                            });
	                        }
	                        // it.children.map(function(itit,index2){
	                        //     let selected = url.indexOf(itit.location||'null')>=0?itit.id:"";
	                        //     if(selected){
	                        //         self.setState({
	                        //             current:selected
	                        //         })
	                        //     }
	                        //     if(itit==0){
	                        //         self.setState({
	                        //             firstUrl:it.location
	                        //         })
	                        //     }
	                        // });
	                    });
	                } else {

	                    var _selected = url.indexOf(item.location || 'null') >= 0 ? item.id : "";
	                    if (_selected) {
	                        self.setState({
	                            current: _selected
	                        });

	                        if (index == 0) {
	                            self.setState({
	                                firstUrl: item.location
	                            });
	                        }
	                    } else {
	                        if (index == 0) {
	                            self.setState({
	                                firstUrl: item.location,
	                                current: item.id
	                            });
	                        }
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'resizeIfr',
	        value: function resizeIfr() {
	            var self = this;

	            var autodiv = $('#' + self.state.current);

	            function autoH() {
	                var addh = document.body.clientHeight - 55;
	                autodiv.height(addh);
	            }
	            autoH();
	            if (autodiv) {
	                autodiv.css({ overflow: "auto" });
	                $(window).resize(function () {
	                    autoH();
	                });
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.resizeIfr();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var self = this;

	            // var data = {
	            //     data:{
	            //         "error_code" : null,
	            //         "error_message" : null,
	            //         "stack" : null,
	            //         "status" : "1",
	            //         "message" : "操作成功！",
	            //         "data" : [{
	            //             "id" : "console",
	            //             "name" : "控制台",
	            //             "location" : "/fe/dashboard/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-dashboard pink-400",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 1,
	            //             "openview" : "curpage",
	            //             "category" : "engine"
	            //         }, {
	            //             "id" : "confcenter",
	            //             "name" : "配置中心",
	            //             "location" : "/confcenter",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-setting-center cyan-500",
	            //             "target" : "",
	            //             "urltype" : "view",
	            //             "children" : [ {
	            //                 "id" : "appconf",
	            //                 "name" : "应用设置",
	            //                 "location" : "/confcenter/index.html#appMgr/appList",
	            //                 "menustatus" : "Y",
	            //                 "parentid" : null,
	            //                 "icon" : "iconfont cl cl-bk-conf green-A700",
	            //                 "target" : "",
	            //                 "urltype" : "url",
	            //                 "children" : [ {
	            //                     "id" : "appconf1",
	            //                     "name" : "应用设置1",
	            //                     "location" : "/confcenter/index.html#appMgr/appList",
	            //                     "menustatus" : "Y",
	            //                     "parentid" : null,
	            //                     "icon" : "iconfont cl cl-bk-conf green-A700",
	            //                     "target" : "",
	            //                     "urltype" : "url",
	            //                     "children" : [ ],
	            //                     "sort" : 1,
	            //                     "openview" : "curpage",
	            //                     "category" : "paas"
	            //                 }, {
	            //                     "id" : "configmgr1",
	            //                     "name" : "应用设置2",
	            //                     "location" : "/confcenter/index.html#confMgr/page",
	            //                     "menustatus" : "Y",
	            //                     "parentid" : null,
	            //                     "icon" : "iconfont cl cl-set indigo-700",
	            //                     "target" : "",
	            //                     "urltype" : "url",
	            //                     "children" : [ ],
	            //                     "sort" : 2,
	            //                     "openview" : "curpage",
	            //                     "category" : "paas"
	            //                 } ],
	            //                 "sort" : 1,
	            //                 "openview" : "curpage",
	            //                 "category" : "paas"
	            //             }, {
	            //                 "id" : "configmgr",
	            //                 "name" : "配置管理",
	            //                 "location" : "/confcenter/index.html#confMgr/page",
	            //                 "menustatus" : "Y",
	            //                 "parentid" : null,
	            //                 "icon" : "iconfont cl cl-set indigo-700",
	            //                 "target" : "",
	            //                 "urltype" : "url",
	            //                 "children" : [ {
	            //                     "id" : "appconf2",
	            //                     "name" : "配置管理1",
	            //                     "location" : "/confcenter/index.html#appMgr/appList",
	            //                     "menustatus" : "Y",
	            //                     "parentid" : null,
	            //                     "icon" : "iconfont cl cl-bk-conf green-A700",
	            //                     "target" : "",
	            //                     "urltype" : "url",
	            //                     "children" : [ ],
	            //                     "sort" : 1,
	            //                     "openview" : "curpage",
	            //                     "category" : "paas"
	            //                 }, {
	            //                     "id" : "configmgr2",
	            //                     "name" : "配置管理2",
	            //                     "location" : "/confcenter/index.html#confMgr/page",
	            //                     "menustatus" : "Y",
	            //                     "parentid" : null,
	            //                     "icon" : "iconfont cl cl-set indigo-700",
	            //                     "target" : "",
	            //                     "urltype" : "url",
	            //                     "children" : [ ],
	            //                     "sort" : 2,
	            //                     "openview" : "curpage",
	            //                     "category" : "paas"
	            //                 } ],
	            //                 "sort" : 2,
	            //                 "openview" : "curpage",
	            //                 "category" : "paas"
	            //             },{
	            //                 "id" : "configmgr3",
	            //                 "name" : "配置管理",
	            //                 "location" : "/confcenter/index.html#confMgr/page",
	            //                 "menustatus" : "Y",
	            //                 "parentid" : null,
	            //                 "icon" : "iconfont cl cl-set indigo-700",
	            //                 "target" : "",
	            //                 "urltype" : "url",
	            //                 "children" : [],
	            //                 "sort" : 2,
	            //                 "openview" : "curpage",
	            //                 "category" : "paas"
	            //             } ],
	            //             "sort" : 8,
	            //             "openview" : "curpage",
	            //             "category" : "paas"
	            //         },{
	            //             "id" : "myReleasePool",
	            //             "name" : "我的资源池",
	            //             "location" : "/fe/MyRP/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-filebox yellow-700",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 2,
	            //             "openview" : "curpage",
	            //             "category" : "pass"
	            //         }, {
	            //             "id" : "appmgr",
	            //             "name" : "应用管理",
	            //             "location" : "/fe/appManager/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-apps orange-600",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 2,
	            //             "openview" : "curpage",
	            //             "category" : "engine"
	            //         }, {
	            //             "id" : "yunw",
	            //             "name" : "运维管理",
	            //             "location" : "/fe/operation/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-windows cyan-500",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 3,
	            //             "openview" : "curpage",
	            //             "category" : "engine"
	            //         }, {
	            //             "id" : "mirrorRes",
	            //             "name" : "镜像仓库",
	            //             "location" : "/fe/imagesCata/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-depot deep-purple-300",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 3,
	            //             "openview" : "curpage",
	            //             "category" : "engine"
	            //         }, {
	            //             "id" : "runmgr",
	            //             "name" : "运营管理",
	            //             "location" : "/fe/runmsg/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-screen green-A700",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 5,
	            //             "openview" : "curpage",
	            //             "category" : "engine"
	            //         }, {
	            //             "id" : "middleware",
	            //             "name" : "中间件服务",
	            //             "location" : "/fe/md-service/index.html",
	            //             "menustatus" : "Y",
	            //             "parentid" : null,
	            //             "icon" : "iconfont cl cl-database green-A700",
	            //             "target" : "",
	            //             "urltype" : "url",
	            //             "children" : [ ],
	            //             "sort" : 9,
	            //             "openview" : "curpage",
	            //             "category" : "pass"
	            //         } ],
	            //         "string" : null
	            //     }
	            // }
	            //
	            // self.setMenu(data);
	            //
	            // self.setState({
	            //     menu: data.data.data
	            // });
	            // self.initRouter();


	            // url = /web/v1/menu/sidebarList,/appmenumgr/sidebarList'
	            _axios2.default.get(contextRoot + '/appmenumgr/sidebarList').then(function (response) {

	                self.setMenu(response);

	                self.setState({
	                    menu: response.data.data
	                });

	                window.menus = response.data.data;

	                window.getBreadcrumb = function (id) {
	                    var menus = window.menus;
	                    var n1, n2, n3;

	                    $.each(menus, function (i, item) {
	                        if (id == item.id) {
	                            n1 = item;
	                            return false;
	                        }
	                        if (item.children) {
	                            $.each(item.children, function (t, items) {
	                                if (id == items.id) {
	                                    n2 = items;
	                                    n1 = item;
	                                    return false;
	                                }

	                                $.each(items.children, function (tt, itemss) {
	                                    if (id == itemss.id) {
	                                        n3 = itemss;
	                                        n2 = items;
	                                        n1 = item;
	                                        return false;
	                                    }
	                                });
	                            });
	                        }
	                    });

	                    return function () {
	                        var data = [];
	                        $.each([n1, n2, n3], function (i, item) {
	                            if (item) {
	                                data.push(item.name);
	                            }
	                        });

	                        return data;
	                    }();
	                };

	                self.initRouter();

	                //var data = response;
	                //window.router.every.after = function(){
	                //    self.setMenu(data);
	                //}
	            }).catch(function (err) {
	                console.log(err);
	            });
	        }
	    }, {
	        key: 'initRouter',
	        value: function initRouter() {
	            var self = this;

	            var router = window.router;
	            router.init();
	            //获取第一个节点数据

	            if (this.state.menu.length == 0) return false;

	            this.state.menu[0].children = this.state.menu[0].children == null ? [] : this.state.menu[0].children;

	            var item = this.state.menu[0].children != null && this.state.menu[0].children.length == 0 ? this.state.menu[0] : this.state.menu[0].children[0];
	            var blank = item.openview == "blank" ? "_blank" : "";
	            var oUrl = '',
	                uri = encodeURIComponent(encodeURIComponent(item.location));
	            if (blank) {
	                oUrl = '#/ifrNoHead/' + uri;
	            } else {
	                oUrl = '#/ifr/' + uri;
	            }
	            var url = oUrl.replace('#', '');

	            if (window.extendRouteRegister) {
	                window.extendRouteRegister(router);
	            }
	            if (window.location.hash == '') {
	                if (oUrl.indexOf('ifrNoHead') >= 0) {
	                    var open = window.open;
	                    open(oUrl);
	                    return false;
	                }

	                if (window.isOpenTab) {
	                    if (self.state.menus.length == 0) {
	                        //true设定加载第一个tab
	                        var options = {
	                            title: item.name,
	                            router: self.formmaterUrl(item),
	                            id: item.id
	                        };
	                        self.createTab(options);
	                    }
	                } else {
	                    router.dispatch('on', url);
	                }
	            } else {
	                router.dispatch('on', window.location.hash.replace('#', ''));
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var self = this;

	            var expanded = this.state.expanded ? "expanded" : "";
	            var isSeleted = this.state.submenuSelected;
	            var isOpenTab = this.state.isOpenTab;
	            var TabBox = '';

	            var togCon = _react2.default.createElement('span', { className: 'uf uf-navmenu-light' });

	            var props = {
	                current: self.state.current,
	                menus: self.state.menus,
	                tabNum: self.state.menus.length,
	                setCurrent: self.setCurrent,
	                del: self.del
	            };

	            var UserMenuObj = {
	                formmaterUrl: self.formmaterUrl,
	                handleClick: self.handleClick,
	                handleDefault: self.handleDefault
	            };

	            if (isOpenTab) {
	                TabBox = _react2.default.createElement(_Tabs2.default, props);
	            } else {
	                TabBox = "";
	            }

	            return _react2.default.createElement(
	                'div',
	                { id: 'portal', className: "portal-expand " + expanded },
	                _react2.default.createElement(
	                    _tinperBee.Navbar,
	                    { fluid: true, className: "portal-navbar " + expanded, expanded: this.state.expanded, onToggle: this.onToggle.bind(this) },
	                    _react2.default.createElement(
	                        Header,
	                        null,
	                        _react2.default.createElement(
	                            Brand,
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: 'http://www.yonyoucloud.com' },
	                                _react2.default.createElement('img', { src: 'logo.png', className: 'portal-logo' })
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        Nav,
	                        { pullRight: true, className: 'portal-nav', onClick: self.showMenu.bind(self) },
	                        _react2.default.createElement(NavItem, { eventKey: 1, className: 'form-item' }),
	                        _react2.default.createElement(
	                            'div',
	                            { id: 'bs-example-navbar-collapse-9', className: 'collapse navbar-collapse navbar-right' },
	                            _react2.default.createElement(
	                                'ul',
	                                { className: 'nav navbar-nav' },
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'a',
	                                        { role: 'button', 'aria-expanded': 'false', href: 'javascript:void (0);', className: 'navbar-avatar ' },
	                                        _react2.default.createElement('i', { className: 'uf uf-qm-c' })
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'a',
											//增加消息提示需要的内容
	                                        {id:'messageCount', role: 'button', 'aria-expanded': 'false', href: 'index-view.html#msgCenter', className: 'navbar-avatar' },
											_react2.default.createElement('div', 
												{ className: 'u-badge', 'data-badge':'0'},
												_react2.default.createElement('i', { className: 'uf uf-bell' })
											)
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'a',
	                                        { role: 'button', 'aria-expanded': 'false', href: 'javascript:void (0);', className: 'navbar-avatar' },
	                                        _react2.default.createElement('i', { className: 'uf uf-settings' })
	                                    )
	                                ),
	                                _react2.default.createElement(
	                                    'li',
	                                    { className: 'dropdown' },
	                                    _react2.default.createElement(
	                                        'a',
	                                        { role: 'button', id: 'username', 'aria-expanded': 'false', href: 'javascript:void (0);', 'data-toggle': 'dropdown', className: 'navbar-avatar dropdown-toggle' },
	                                        _react2.default.createElement(
	                                            'span',
	                                            { className: 'avatar-name' },
	                                            ' ',
	                                            _reactCookie2.default.load('userName'),
	                                            ' '
	                                        ),
	                                        _react2.default.createElement('span', { className: 'iconfont icon-arrowdown' }),
	                                        _react2.default.createElement(
	                                            'span',
	                                            { className: 'avatar-icon' },
	                                            _react2.default.createElement('img', { src: 'userIcon.png' })
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'div',
	                                        { role: 'menu', className: 'dropdown-menu user-menu' },
	                                        _react2.default.createElement(_UserMenu2.default, UserMenuObj)
	                                    )
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    SideContainer,
	                    { onToggle: this.onToggle.bind(this), expanded: this.state.expanded },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'toggle-wrap-side', onClick: this.onToggle.bind(this) },
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', className: 'u-navbar-toggle show collapsed' },
	                            _react2.default.createElement('span', { className: 'uf uf-navmenu-light' })
	                        ),
	                        _react2.default.createElement('span', { className: 'toggle-text' })
	                    ),
	                    _react2.default.createElement(
	                        Menu,
	                        { onOpenChange: this.onOpenChange.bind(this), onClick: this.handleClick.bind(this), className: 'u-menu-max1', openKeys: this.state.openKeys, selectedKeys: [this.state.current], mode: 'inline' },
	                        this.state.menu.map(function (item) {

	                            var blank = item.openview == "blank" ? "_blank" : "";

	                            if (Array.isArray(item.children) && item.children.length > 0) {
	                                var list = [];
	                                var title = _react2.default.createElement(
	                                    'a',
	                                    { href: 'javascript:;' },
	                                    _react2.default.createElement('i', { className: 'icon ' + item.icon }),
	                                    _react2.default.createElement(
	                                        'span',
	                                        null,
	                                        _react2.default.createElement('label', { className: 'uf uf-triangle-left' }),
	                                        item.name
	                                    )
	                                );

	                                item.children.map(function (it) {
	                                    var blank = it.openview == "blank" ? "_blank" : "";

	                                    if (Array.isArray(it.children) && it.children.length > 0) {
	                                        var list2 = [];
	                                        var _title = _react2.default.createElement(
	                                            'a',
	                                            { href: 'javascript:;' },
	                                            _react2.default.createElement('i', { className: 'icon-child' }),
	                                            _react2.default.createElement(
	                                                'span',
	                                                null,
	                                                it.name
	                                            )
	                                        );

	                                        it.children.map(function (itit) {
	                                            var blank = it.openview == "blank" ? "_blank" : "";

	                                            list2.push(_react2.default.createElement(
	                                                Menu.Item,
	                                                { key: itit.id, title: itit.name },
	                                                ' ',
	                                                _react2.default.createElement(
	                                                    'a',
	                                                    { target: blank, onClick: function onClick(e) {
	                                                            return self.handleDefault(e);
	                                                        }, ref: itit.id, title: itit.name, href: self.formmaterUrl(itit) },
	                                                    itit.name
	                                                )
	                                            ));
	                                        });

	                                        list.push(_react2.default.createElement(
	                                            SubMenu,
	                                            { key: it.menuId, className: 'third-menu ' + selected, children: it.children, title: _title },
	                                            list2
	                                        ));
	                                    } else {

	                                        var _title2 = _react2.default.createElement(
	                                            'a',
	                                            { target: blank, onClick: function onClick(e) {
	                                                    return self.handleDefault(e);
	                                                }, href: self.formmaterUrl(it) },
	                                            _react2.default.createElement('i', { className: 'icon ' + it.icon }),
	                                            _react2.default.createElement(
	                                                'span',
	                                                null,
	                                                it.name
	                                            )
	                                        );

	                                        list.push(_react2.default.createElement(
	                                            Menu.Item,
	                                            { key: it.id, title: it.name },
	                                            _react2.default.createElement(
	                                                'a',
	                                                { target: blank, onClick: function onClick(e) {
	                                                        return self.handleDefault(e);
	                                                    }, ref: it.id, title: it.name, href: self.formmaterUrl(it) },
	                                                it.name
	                                            )
	                                        ));
	                                    }
	                                });

	                                var selected = item.id == isSeleted ? "u-menu-submenus-selected" : "";

	                                return _react2.default.createElement(
	                                    SubMenu,
	                                    { key: item.menuId, className: 'second-menu ' + selected, children: item.children, title: title },
	                                    list
	                                );
	                            } else {

	                                var _title3 = _react2.default.createElement(
	                                    'a',
	                                    { target: blank, onClick: function onClick(e) {
	                                            return self.handleDefault(e);
	                                        }, ref: item.id, href: self.formmaterUrl(item), title: item.name },
	                                    _react2.default.createElement('i', { className: 'icon ' + item.icon }),
	                                    _react2.default.createElement(
	                                        'span',
	                                        null,
	                                        _react2.default.createElement('label', { className: 'uf uf-triangle-left' }),
	                                        item.name
	                                    )
	                                );
	                                return _react2.default.createElement(
	                                    Menu.Item,
	                                    { key: item.id },
	                                    _title3
	                                );
	                            }
	                        })
	                    )
	                ),
	                TabBox,
	                _react2.default.createElement(
	                    'div',
	                    { id: 'content' },
	                    this.state.menus.map(function (item, index) {
	                        var match = /^((ht|f)tps?):\/\/.*(\/#\/ifr\/)/ig;
	                        var selected = self.state.current == item.id ? "ifr-selected" : "";

	                        item.router = decodeURIComponent(decodeURIComponent(item.router.replace(match, '')));

	                        return _react2.default.createElement('iframe', { className: 'ifr-tabs ' + selected, id: item.id, src: item.router, style: { width: '100%', overflow: 'auto', border: '0' } });
	                    })
	                )
	            );
	        }
	    }]);
	    return App;
	}(_react.Component);

	exports.default = App;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(6)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	module.exports = __webpack_require__(6).Object.getPrototypeOf;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(10)
	  , $getPrototypeOf = __webpack_require__(12);

	__webpack_require__(18)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(13)
	  , toObject    = __webpack_require__(10)
	  , IE_PROTO    = __webpack_require__(14)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(15)('keys')
	  , uid    = __webpack_require__(17);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(16)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(19)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(28);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(20)
	  , hide      = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(23)
	  , createDesc = __webpack_require__(31);
	module.exports = __webpack_require__(27) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(24)
	  , IE8_DOM_DEFINE = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(30)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(27) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(27) && !__webpack_require__(28)(function(){
	  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(28)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(25)
	  , document = __webpack_require__(16).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(25);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(34);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(35), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	var $Object = __webpack_require__(6).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(19);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(27), 'Object', {defineProperty: __webpack_require__(23).f});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(38);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(39);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(68);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(40), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(41);
	__webpack_require__(63);
	module.exports = __webpack_require__(67).f('iterator');

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(42)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(44)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(43)
	  , defined   = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(45)
	  , $export        = __webpack_require__(19)
	  , redefine       = __webpack_require__(46)
	  , hide           = __webpack_require__(22)
	  , has            = __webpack_require__(13)
	  , Iterators      = __webpack_require__(47)
	  , $iterCreate    = __webpack_require__(48)
	  , setToStringTag = __webpack_require__(61)
	  , getPrototypeOf = __webpack_require__(12)
	  , ITERATOR       = __webpack_require__(62)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(49)
	  , descriptor     = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(61)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(22)(IteratorPrototype, __webpack_require__(62)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(24)
	  , dPs         = __webpack_require__(50)
	  , enumBugKeys = __webpack_require__(59)
	  , IE_PROTO    = __webpack_require__(14)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(29)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(60).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(23)
	  , anObject = __webpack_require__(24)
	  , getKeys  = __webpack_require__(51);

	module.exports = __webpack_require__(27) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(52)
	  , enumBugKeys = __webpack_require__(59);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(13)
	  , toIObject    = __webpack_require__(53)
	  , arrayIndexOf = __webpack_require__(56)(false)
	  , IE_PROTO     = __webpack_require__(14)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(54)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(55);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(53)
	  , toLength  = __webpack_require__(57)
	  , toIndex   = __webpack_require__(58);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(43)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(43)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16).document && document.documentElement;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(23).f
	  , has = __webpack_require__(13)
	  , TAG = __webpack_require__(62)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(15)('wks')
	  , uid        = __webpack_require__(17)
	  , Symbol     = __webpack_require__(16).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	var global        = __webpack_require__(16)
	  , hide          = __webpack_require__(22)
	  , Iterators     = __webpack_require__(47)
	  , TO_STRING_TAG = __webpack_require__(62)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(65)
	  , step             = __webpack_require__(66)
	  , Iterators        = __webpack_require__(47)
	  , toIObject        = __webpack_require__(53);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(44)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(62);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(83);
	module.exports = __webpack_require__(6).Symbol;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(16)
	  , has            = __webpack_require__(13)
	  , DESCRIPTORS    = __webpack_require__(27)
	  , $export        = __webpack_require__(19)
	  , redefine       = __webpack_require__(46)
	  , META           = __webpack_require__(71).KEY
	  , $fails         = __webpack_require__(28)
	  , shared         = __webpack_require__(15)
	  , setToStringTag = __webpack_require__(61)
	  , uid            = __webpack_require__(17)
	  , wks            = __webpack_require__(62)
	  , wksExt         = __webpack_require__(67)
	  , wksDefine      = __webpack_require__(72)
	  , keyOf          = __webpack_require__(73)
	  , enumKeys       = __webpack_require__(74)
	  , isArray        = __webpack_require__(77)
	  , anObject       = __webpack_require__(24)
	  , toIObject      = __webpack_require__(53)
	  , toPrimitive    = __webpack_require__(30)
	  , createDesc     = __webpack_require__(31)
	  , _create        = __webpack_require__(49)
	  , gOPNExt        = __webpack_require__(78)
	  , $GOPD          = __webpack_require__(80)
	  , $DP            = __webpack_require__(23)
	  , $keys          = __webpack_require__(51)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(79).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(76).f  = $propertyIsEnumerable;
	  __webpack_require__(75).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(45)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(22)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(17)('meta')
	  , isObject = __webpack_require__(25)
	  , has      = __webpack_require__(13)
	  , setDesc  = __webpack_require__(23).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(28)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(16)
	  , core           = __webpack_require__(6)
	  , LIBRARY        = __webpack_require__(45)
	  , wksExt         = __webpack_require__(67)
	  , defineProperty = __webpack_require__(23).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(51)
	  , toIObject = __webpack_require__(53);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(51)
	  , gOPS    = __webpack_require__(75)
	  , pIE     = __webpack_require__(76);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(55);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(53)
	  , gOPN      = __webpack_require__(79).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(52)
	  , hiddenKeys = __webpack_require__(59).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(76)
	  , createDesc     = __webpack_require__(31)
	  , toIObject      = __webpack_require__(53)
	  , toPrimitive    = __webpack_require__(30)
	  , has            = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(26)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(27) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(72)('asyncIterator');

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(72)('observable');

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(85);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(89);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(38);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	module.exports = __webpack_require__(6).Object.setPrototypeOf;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(19);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(88).set});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(25)
	  , anObject = __webpack_require__(24);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(20)(Function.call, __webpack_require__(80).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var $Object = __webpack_require__(6).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(19)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(49)});

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_92__;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _contains = __webpack_require__(94);

	var _contains2 = _interopRequireDefault(_contains);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _warning = __webpack_require__(96);

	var _warning2 = _interopRequireDefault(_warning);

	var _Overlay = __webpack_require__(98);

	var _Overlay2 = _interopRequireDefault(_Overlay);

	var _createChainedFunction = __webpack_require__(172);

	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	/**
	 * 检查值是属于这个值，还是等于这个值
	 *
	 * @param {string} one
	 * @param {string|array} of
	 * @returns {boolean}
	 */
	function isOneOf(one, of) {
	  if (Array.isArray(of)) {
	    return of.indexOf(one) >= 0;
	  }
	  return one === of;
	}

	var triggerType = _react.PropTypes.oneOf(['click', 'hover', 'focus']);

	var propTypes = _extends({}, _Overlay2["default"].propTypes, {

	  /**
	  * 指定哪些操作或操作触发叠加层可见性
	  */
	  trigger: _react.PropTypes.oneOfType([triggerType, _react.PropTypes.arrayOf(triggerType)]),

	  /**
	   * 显示和隐藏覆盖一旦触发的毫秒延迟量
	   */
	  delay: _react.PropTypes.number,
	  /**
	   * 触发后显示叠加层之前的延迟毫秒
	   */
	  delayShow: _react.PropTypes.number,
	  /**
	   * 触发后隐藏叠加层的延迟毫秒
	   */
	  delayHide: _react.PropTypes.number,

	  // FIXME: This should be `defaultShow`.
	  /**
	   * 覆盖的初始可见性状态。对于更细微的可见性控制，请考虑直接使用覆盖组件。
	   */
	  defaultOverlayShown: _react.PropTypes.bool,

	  /**
	   * 要覆盖在目标旁边的元素或文本。
	   */
	  overlay: _react.PropTypes.node.isRequired,

	  /**
	   * @private
	   */
	  onBlur: _react.PropTypes.func,
	  /**
	   * @private
	   */
	  onClick: _react.PropTypes.func,
	  /**
	   * @private
	   */
	  onFocus: _react.PropTypes.func,
	  /**
	   * @private
	   */
	  onMouseOut: _react.PropTypes.func,
	  /**
	   * @private
	   */
	  onMouseOver: _react.PropTypes.func,

	  // Overridden props from `<Overlay>`.
	  /**
	   * @private
	   */
	  target: _react.PropTypes.oneOf([null]),
	  /**
	  * @private
	  */
	  onHide: _react.PropTypes.oneOf([null]),
	  /**
	   * @private
	   */
	  show: _react.PropTypes.oneOf([null])
	});

	var defaultProps = {
	  defaultOverlayShown: false,
	  trigger: ['hover', 'focus']
	};

	var OverlayTrigger = function (_Component) {
	  _inherits(OverlayTrigger, _Component);

	  function OverlayTrigger(props, context) {
	    _classCallCheck(this, OverlayTrigger);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.handleToggle = _this.handleToggle.bind(_this);
	    _this.handleDelayedShow = _this.handleDelayedShow.bind(_this);
	    _this.handleDelayedHide = _this.handleDelayedHide.bind(_this);
	    _this.handleHide = _this.handleHide.bind(_this);
	    _this.makeOverlay = _this.makeOverlay.bind(_this);

	    _this.handleMouseOver = function (e) {
	      return _this.handleMouseOverOut(_this.handleDelayedShow, e);
	    };
	    _this.handleMouseOut = function (e) {
	      return _this.handleMouseOverOut(_this.handleDelayedHide, e);
	    };

	    _this._mountNode = null;

	    _this.state = {
	      show: props.defaultOverlayShown
	    };
	    return _this;
	  }

	  OverlayTrigger.prototype.componentDidMount = function componentDidMount() {
	    this._mountNode = document.createElement('div');
	    this.renderOverlay();
	  };

	  OverlayTrigger.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.renderOverlay();
	  };

	  OverlayTrigger.prototype.componentWillUnmount = function componentWillUnmount() {
	    _reactDom2["default"].unmountComponentAtNode(this._mountNode);
	    this._mountNode = null;

	    clearTimeout(this._hoverShowDelay);
	    clearTimeout(this._hoverHideDelay);
	  };

	  OverlayTrigger.prototype.handleToggle = function handleToggle() {
	    if (this.state.show) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  };

	  OverlayTrigger.prototype.handleDelayedShow = function handleDelayedShow() {
	    var _this2 = this;

	    if (this._hoverHideDelay != null) {
	      clearTimeout(this._hoverHideDelay);
	      this._hoverHideDelay = null;
	      return;
	    }

	    if (this.state.show || this._hoverShowDelay != null) {
	      return;
	    }

	    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

	    if (!delay) {
	      this.show();
	      return;
	    }

	    this._hoverShowDelay = setTimeout(function () {
	      _this2._hoverShowDelay = null;
	      _this2.show();
	    }, delay);
	  };

	  OverlayTrigger.prototype.handleDelayedHide = function handleDelayedHide() {
	    var _this3 = this;

	    if (this._hoverShowDelay != null) {
	      clearTimeout(this._hoverShowDelay);
	      this._hoverShowDelay = null;
	      return;
	    }

	    if (!this.state.show || this._hoverHideDelay != null) {
	      return;
	    }

	    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

	    if (!delay) {
	      this.hide();
	      return;
	    }

	    this._hoverHideDelay = setTimeout(function () {
	      _this3._hoverHideDelay = null;
	      _this3.hide();
	    }, delay);
	  };

	  // 简单实现mouseEnter和mouseLeave。
	  // React的内置版本是有问题的：https://github.com/facebook/react/issues/4251
	  //在触发器被禁用的情况下，mouseOut / Over可能导致闪烁
	  //从一个子元素移动到另一个子元素。


	  OverlayTrigger.prototype.handleMouseOverOut = function handleMouseOverOut(handler, e) {
	    var target = e.currentTarget;
	    var related = e.relatedTarget || e.nativeEvent.toElement;

	    if (!related || related !== target && !(0, _contains2["default"])(target, related)) {
	      handler(e);
	    }
	  };

	  OverlayTrigger.prototype.handleHide = function handleHide() {
	    this.hide();
	  };

	  OverlayTrigger.prototype.show = function show() {
	    this.setState({ show: true });
	  };

	  OverlayTrigger.prototype.hide = function hide() {
	    this.setState({ show: false });
	  };

	  OverlayTrigger.prototype.makeOverlay = function makeOverlay(overlay, props) {
	    return _react2["default"].createElement(
	      _Overlay2["default"],
	      _extends({}, props, {
	        show: this.state.show,
	        onHide: this.handleHide,
	        target: this
	      }),
	      overlay
	    );
	  };

	  OverlayTrigger.prototype.renderOverlay = function renderOverlay() {
	    _reactDom2["default"].unstable_renderSubtreeIntoContainer(this, this._overlay, this._mountNode);
	  };

	  OverlayTrigger.prototype.render = function render() {
	    var _props = this.props;
	    var trigger = _props.trigger;
	    var overlay = _props.overlay;
	    var children = _props.children;
	    var onBlur = _props.onBlur;
	    var onClick = _props.onClick;
	    var onFocus = _props.onFocus;
	    var onMouseOut = _props.onMouseOut;
	    var onMouseOver = _props.onMouseOver;

	    var props = _objectWithoutProperties(_props, ['trigger', 'overlay', 'children', 'onBlur', 'onClick', 'onFocus', 'onMouseOut', 'onMouseOver']);

	    delete props.delay;
	    delete props.delayShow;
	    delete props.delayHide;
	    delete props.defaultOverlayShown;

	    var child = _react2["default"].Children.only(children);
	    var childProps = child.props;

	    var triggerProps = {
	      'aria-describedby': overlay.props.id
	    };

	    // FIXME: 这里用于传递这个组件上的处理程序的逻辑是不一致的。我们不应该通过任何这些道具。

	    triggerProps.onClick = (0, _createChainedFunction2["default"])(childProps.onClick, onClick);

	    if (isOneOf('click', trigger)) {
	      triggerProps.onClick = (0, _createChainedFunction2["default"])(triggerProps.onClick, this.handleToggle);
	    }

	    if (isOneOf('hover', trigger)) {
	      (0, _warning2["default"])(!(trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.');

	      triggerProps.onMouseOver = (0, _createChainedFunction2["default"])(childProps.onMouseOver, onMouseOver, this.handleMouseOver);
	      triggerProps.onMouseOut = (0, _createChainedFunction2["default"])(childProps.onMouseOut, onMouseOut, this.handleMouseOut);
	    }

	    if (isOneOf('focus', trigger)) {
	      triggerProps.onFocus = (0, _createChainedFunction2["default"])(childProps.onFocus, onFocus, this.handleDelayedShow);
	      triggerProps.onBlur = (0, _createChainedFunction2["default"])(childProps.onBlur, onBlur, this.handleDelayedHide);
	    }

	    this._overlay = this.makeOverlay(overlay, props);

	    return (0, _react.cloneElement)(child, triggerProps);
	  };

	  return OverlayTrigger;
	}(_react.Component);

	OverlayTrigger.propTypes = propTypes;
	OverlayTrigger.defaultProps = defaultProps;

	exports["default"] = OverlayTrigger;
	module.exports = exports['default'];

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _inDOM = __webpack_require__(95);

	var _inDOM2 = _interopRequireDefault(_inDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  // HTML DOM and SVG DOM may have different support levels,
	  // so we need to check on context instead of a document root element.
	  return _inDOM2.default ? function (context, node) {
	    if (context.contains) {
	      return context.contains(node);
	    } else if (context.compareDocumentPosition) {
	      return context === node || !!(context.compareDocumentPosition(node) & 16);
	    } else {
	      return fallback(context, node);
	    }
	  } : fallback;
	}();

	function fallback(context, node) {
	  if (node) do {
	    if (node === context) return true;
	  } while (node = node.parentNode);

	  return false;
	}
	module.exports = exports['default'];

/***/ }),
/* 95 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),
/* 97 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _classnames = __webpack_require__(99);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _BaseOverlay = __webpack_require__(100);

	var _BaseOverlay2 = _interopRequireDefault(_BaseOverlay);

	var _tinperBeeCore = __webpack_require__(105);

	var _Fade = __webpack_require__(167);

	var _Fade2 = _interopRequireDefault(_Fade);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var propTypes = _extends({}, _BaseOverlay2["default"].propTypes, {

	  /**
	   * 是否显示
	   */
	  show: _react.PropTypes.bool,
	  /**
	   * 是
	   */
	  rootClose: _react.PropTypes.bool,
	  /**
	   * 当点击rootClose触发close时的回调函数
	   */
	  onHide: _react.PropTypes.func,

	  /**
	   * 使用动画
	   */
	  animation: _react2["default"].PropTypes.oneOfType([_tinperBeeCore.elementType, _react.PropTypes.func]),

	  /**
	   * Callback fired before the Overlay transitions in
	   */
	  onEnter: _react2["default"].PropTypes.func,

	  /**
	   * Callback fired as the Overlay begins to transition in
	   */
	  onEntering: _react2["default"].PropTypes.func,

	  /**
	   * Callback fired after the Overlay finishes transitioning in
	   */
	  onEntered: _react2["default"].PropTypes.func,

	  /**
	   * Callback fired right before the Overlay transitions out
	   */
	  onExit: _react2["default"].PropTypes.func,

	  /**
	   * Callback fired as the Overlay begins to transition out
	   */
	  onExiting: _react2["default"].PropTypes.func,

	  /**
	   * Callback fired after the Overlay finishes transitioning out
	   */
	  onExited: _react2["default"].PropTypes.func,

	  /**
	   * Sets the direction of the Overlay.
	   */
	  placement: _react2["default"].PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
	});

	var defaultProps = {
	  animation: _Fade2["default"],
	  rootClose: false,
	  show: false,
	  placement: 'right'
	};

	var Overlay = function (_Component) {
	  _inherits(Overlay, _Component);

	  function Overlay() {
	    _classCallCheck(this, Overlay);

	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }

	  Overlay.prototype.render = function render() {
	    var _props = this.props;
	    var animation = _props.animation;
	    var children = _props.children;

	    var props = _objectWithoutProperties(_props, ['animation', 'children']);

	    var transition = animation === true ? _Fade2["default"] : animation || null;

	    var child = void 0;

	    if (!transition) {
	      child = (0, _react.cloneElement)(children, {
	        className: (0, _classnames2["default"])(children.props.className, 'in')
	      });
	    } else {
	      child = children;
	    }

	    return _react2["default"].createElement(
	      _BaseOverlay2["default"],
	      _extends({}, props, {
	        transition: transition
	      }),
	      child
	    );
	  };

	  return Overlay;
	}(_react.Component);

	Overlay.propTypes = propTypes;
	Overlay.defaultProps = defaultProps;

	exports["default"] = Overlay;
	module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Portal = __webpack_require__(101);

	var _Portal2 = _interopRequireDefault(_Portal);

	var _Position = __webpack_require__(146);

	var _Position2 = _interopRequireDefault(_Position);

	var _RootCloseWrapper = __webpack_require__(163);

	var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

	var _tinperBeeCore = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var propTypes = _extends({}, _Portal2["default"].propTypes, _Position2["default"].propTypes, {

	  /**
	   * 是否显示
	   */
	  show: _react.PropTypes.bool,

	  /**
	   * 点击其他地方，是否隐藏overlay
	   */
	  rootClose: _react.PropTypes.bool,

	  /**
	   * 当rootClose为true的时候，触发的隐藏方法
	   * @type func
	   */
	  onHide: function onHide(props) {
	    var propType = _react.PropTypes.func;
	    if (props.rootClose) {
	      propType = propType.isRequired;
	    }

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return propType.apply(undefined, [props].concat(args));
	  },


	  /**
	   * 过渡动画组件
	   */
	  transition: _react.PropTypes.oneOfType([_tinperBeeCore.elementType, _react.PropTypes.func]),

	  /**
	   * overlay添加动画前的钩子函数
	   */
	  onEnter: _react.PropTypes.func,

	  /**
	   * 开始动画的钩子函数
	   */
	  onEntering: _react.PropTypes.func,

	  /**
	   * 渲染之后的钩子函数
	   */
	  onEntered: _react.PropTypes.func,

	  /**
	   * 关闭开始时的钩子函数
	   */
	  onExit: _react.PropTypes.func,

	  /**
	   * 关闭时的钩子函数
	   */
	  onExiting: _react.PropTypes.func,

	  /**
	   * 关闭后的钩子函数
	   */
	  onExited: _react.PropTypes.func
	});

	function noop() {}

	var defaultProps = {
	  show: false,
	  rootClose: true
	};

	/**
	 * 悬浮组件
	 */

	var BaseOverlay = function (_Component) {
	  _inherits(BaseOverlay, _Component);

	  function BaseOverlay(props, context) {
	    _classCallCheck(this, BaseOverlay);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.state = { exited: !props.show };
	    _this.onHiddenListener = _this.handleHidden.bind(_this);
	    return _this;
	  }

	  BaseOverlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.show) {
	      this.setState({ exited: false });
	    } else if (!nextProps.transition) {
	      // Otherwise let handleHidden take care of marking exited.
	      this.setState({ exited: true });
	    }
	  };

	  BaseOverlay.prototype.handleHidden = function handleHidden() {
	    this.setState({ exited: true });

	    if (this.props.onExited) {
	      var _props;

	      (_props = this.props).onExited.apply(_props, arguments);
	    }
	  };

	  BaseOverlay.prototype.render = function render() {
	    var _props2 = this.props;
	    var container = _props2.container;
	    var containerPadding = _props2.containerPadding;
	    var target = _props2.target;
	    var placement = _props2.placement;
	    var shouldUpdatePosition = _props2.shouldUpdatePosition;
	    var rootClose = _props2.rootClose;
	    var children = _props2.children;
	    var Transition = _props2.transition;

	    var props = _objectWithoutProperties(_props2, ['container', 'containerPadding', 'target', 'placement', 'shouldUpdatePosition', 'rootClose', 'children', 'transition']);

	    // Don't un-render the overlay while it's transitioning out.


	    var mountOverlay = props.show || Transition && !this.state.exited;
	    if (!mountOverlay) {
	      // Don't bother showing anything if we don't have to.
	      return null;
	    }

	    var child = children;

	    // Position is be inner-most because it adds inline styles into the child,
	    // which the other wrappers don't forward correctly.
	    child = _react2["default"].createElement(
	      _Position2["default"],
	      {
	        container: container,
	        containerPadding: containerPadding,
	        target: target,
	        placement: placement,
	        shouldUpdatePosition: shouldUpdatePosition },
	      child
	    );

	    if (Transition) {
	      var onExit = props.onExit;
	      var onExiting = props.onExiting;
	      var onEnter = props.onEnter;
	      var onEntering = props.onEntering;
	      var onEntered = props.onEntered;

	      // This animates the child node by injecting props, so it must precede
	      // anything that adds a wrapping div.

	      child = _react2["default"].createElement(
	        Transition,
	        {
	          'in': props.show,
	          transitionAppear: true,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: this.onHiddenListener,
	          onEnter: onEnter,
	          onEntering: onEntering,
	          onEntered: onEntered
	        },
	        child
	      );
	    }

	    // This goes after everything else because it adds a wrapping div.
	    if (rootClose) {
	      child = _react2["default"].createElement(
	        _RootCloseWrapper2["default"],
	        { onRootClose: props.onHide },
	        child
	      );
	    }

	    return _react2["default"].createElement(
	      _Portal2["default"],
	      { container: container },
	      child
	    );
	  };

	  return BaseOverlay;
	}(_react.Component);

	BaseOverlay.propTypes = propTypes;
	BaseOverlay.defaultProps = defaultProps;

	exports["default"] = BaseOverlay;
	module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ownerDocument = __webpack_require__(102);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	var _getContainer = __webpack_require__(104);

	var _getContainer2 = _interopRequireDefault(_getContainer);

	var _tinperBeeCore = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var propTypes = {
	  /**
	   * 存放子组件的容器
	   */
	  container: _react.PropTypes.oneOfType([_tinperBeeCore.componentOrElement, _react.PropTypes.func])
	};

	var defaultProps = {};

	/**
	 * Portal组件是将子组件渲染
	 */

	var Portal = function (_Component) {
	  _inherits(Portal, _Component);

	  function Portal(props) {
	    _classCallCheck(this, Portal);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	    _this.getMountNode = _this.getMountNode.bind(_this);
	    _this.getOverlayDOMNode = _this.getOverlayDOMNode.bind(_this);
	    _this.mountOverlayTarget = _this.mountOverlayTarget.bind(_this);
	    _this.unmountOverlayTarget = _this.unmountOverlayTarget.bind(_this);
	    _this.renderOverlay = _this.renderOverlay.bind(_this);
	    _this.unrenderOverlay = _this.unrenderOverlay.bind(_this);
	    return _this;
	  }

	  Portal.prototype.componentDidMount = function componentDidMount() {
	    this.renderOverlay();

	    this.mounted = true;
	  };

	  Portal.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.renderOverlay();
	  };
	  //this._overlayTarget为当前的要添加的子组件， this._portalContainerNode要添加组件的容器元素


	  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (this.overlayTarget && nextProps.container !== this.props.container) {
	      this.portalContainerNode.removeChild(this.overlayTarget);
	      this.portalContainerNode = (0, _getContainer2["default"])(nextProps.container, (0, _ownerDocument2["default"])(this).body);
	      this.portalContainerNode.appendChild(this.overlayTarget);
	    }
	  };

	  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.unrenderOverlay();
	    this.unmountOverlayTarget();

	    this.mounted = false;
	  };

	  Portal.prototype.getMountNode = function getMountNode() {
	    return this.overlayTarget;
	  };

	  Portal.prototype.getOverlayDOMNode = function getOverlayDOMNode() {
	    if (!this.mounted) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
	    }

	    if (this.overlayInstance) {
	      return _reactDom2["default"].findDOMNode(this.overlayInstance);
	    }

	    return null;
	  };

	  /**
	   * 如果要添加的子组件不存在，就将div添加到要添加容器的DOM中；
	   */

	  Portal.prototype.mountOverlayTarget = function mountOverlayTarget() {
	    if (!this.overlayTarget) {
	      this.overlayTarget = document.createElement('div');
	      this.portalContainerNode = (0, _getContainer2["default"])(this.props.container, (0, _ownerDocument2["default"])(this).body);
	      this.portalContainerNode.appendChild(this.overlayTarget);
	    }
	  };
	  /**
	   * 将要添加的子元素从容器中移除，并把变量置为null
	   */


	  Portal.prototype.unmountOverlayTarget = function unmountOverlayTarget() {
	    if (this.overlayTarget) {
	      this.portalContainerNode.removeChild(this.overlayTarget);
	      this.overlayTarget = null;
	    }
	    this.portalContainerNode = null;
	  };
	  /**
	   * 手动渲染_overlayTarget
	   */


	  Portal.prototype.renderOverlay = function renderOverlay() {

	    var overlay = !this.props.children ? null : _react2["default"].Children.only(this.props.children);

	    // Save reference for future access.
	    if (overlay !== null) {
	      this.mountOverlayTarget();
	      this.overlayInstance = _reactDom2["default"].unstable_renderSubtreeIntoContainer(this, overlay, this.overlayTarget);
	    } else {
	      // Unrender if the component is null for transitions to null
	      this.unrenderOverlay();
	      this.unmountOverlayTarget();
	    }
	  };
	  /**
	   * 销毁_overlayTarget组件。并把_overlayInstance置为null
	   */


	  Portal.prototype.unrenderOverlay = function unrenderOverlay() {
	    if (this.overlayTarget) {
	      _reactDom2["default"].unmountComponentAtNode(this.overlayTarget);
	      this.overlayInstance = null;
	    }
	  };

	  Portal.prototype.render = function render() {
	    return null;
	  };

	  return Portal;
	}(_react.Component);

	;

	Portal.propTypes = propTypes;
	Portal.defaultProps = defaultProps;

	exports["default"] = Portal;
	module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (componentOrElement) {
	  return (0, _ownerDocument2["default"])(_reactDom2["default"].findDOMNode(componentOrElement));
	};

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ownerDocument = __webpack_require__(103);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ownerDocument;
	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}
	module.exports = exports["default"];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = getContainer;

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * 获取容器组件
	 * @param  {[type]} container        [description]
	 * @param  {[type]} defaultContainer [description]
	 * @return {[type]}                  [description]
	 */
	function getContainer(container, defaultContainer) {
	  container = typeof container === 'function' ? container() : container;
	  return _reactDom2["default"].findDOMNode(container) || defaultContainer;
	}
	module.exports = exports['default'];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Align = exports.toArray = exports.cssAnimation = exports.addEventListener = exports.contains = exports.KeyCode = exports.createChainedFunction = exports.splitComponent = exports.isRequiredForA11y = exports.elementType = exports.deprecated = exports.componentOrElement = exports.all = undefined;

	var _all2 = __webpack_require__(106);

	var _all3 = _interopRequireDefault(_all2);

	var _componentOrElement2 = __webpack_require__(108);

	var _componentOrElement3 = _interopRequireDefault(_componentOrElement2);

	var _deprecated2 = __webpack_require__(109);

	var _deprecated3 = _interopRequireDefault(_deprecated2);

	var _elementType2 = __webpack_require__(110);

	var _elementType3 = _interopRequireDefault(_elementType2);

	var _isRequiredForA11y2 = __webpack_require__(111);

	var _isRequiredForA11y3 = _interopRequireDefault(_isRequiredForA11y2);

	var _splitComponent2 = __webpack_require__(112);

	var _splitComponent3 = _interopRequireDefault(_splitComponent2);

	var _createChainedFunction2 = __webpack_require__(117);

	var _createChainedFunction3 = _interopRequireDefault(_createChainedFunction2);

	var _keyCode = __webpack_require__(118);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	var _contains2 = __webpack_require__(119);

	var _contains3 = _interopRequireDefault(_contains2);

	var _addEventListener2 = __webpack_require__(120);

	var _addEventListener3 = _interopRequireDefault(_addEventListener2);

	var _cssAnimation2 = __webpack_require__(125);

	var _cssAnimation3 = _interopRequireDefault(_cssAnimation2);

	var _toArray2 = __webpack_require__(129);

	var _toArray3 = _interopRequireDefault(_toArray2);

	var _Align2 = __webpack_require__(130);

	var _Align3 = _interopRequireDefault(_Align2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.all = _all3.default;
	exports.componentOrElement = _componentOrElement3.default;
	exports.deprecated = _deprecated3.default;
	exports.elementType = _elementType3.default;
	exports.isRequiredForA11y = _isRequiredForA11y3.default;
	exports.splitComponent = _splitComponent3.default;
	exports.createChainedFunction = _createChainedFunction3.default;
	exports.KeyCode = _keyCode2.default;
	exports.contains = _contains3.default;
	exports.addEventListener = _addEventListener3.default;
	exports.cssAnimation = _cssAnimation3.default;
	exports.toArray = _toArray3.default;
	//export getContainerRenderMixin from './getContainerRenderMixin';

	exports.Align = _Align3.default;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = all;

	var _createChainableTypeChecker = __webpack_require__(107);

	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function all() {
	  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
	    validators[_key] = arguments[_key];
	  }

	  function allPropTypes() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    var error = null;

	    validators.forEach(function (validator) {
	      if (error != null) {
	        return;
	      }

	      var result = validator.apply(undefined, args);
	      if (result != null) {
	        error = result;
	      }
	    });

	    return error;
	  }

	  return (0, _createChainableTypeChecker2.default)(allPropTypes);
	}

/***/ }),
/* 107 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = createChainableTypeChecker;
	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	// Mostly taken from ReactPropTypes.

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;

	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
	      }

	      return null;
	    }

	    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
	      args[_key - 6] = arguments[_key];
	    }

	    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _createChainableTypeChecker = __webpack_require__(107);

	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function validate(props, propName, componentName, location, propFullName) {
	  var propValue = props[propName];
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

	  if (_react2.default.isValidElement(propValue)) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement. You can usually obtain a ReactComponent or DOMElement ' + 'from a ReactElement by attaching a ref to it.');
	  }

	  if ((propType !== 'object' || typeof propValue.render !== 'function') && propValue.nodeType !== 1) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement.');
	  }

	  return null;
	}

	exports.default = (0, _createChainableTypeChecker2.default)(validate);

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = deprecated;

	var _warning = __webpack_require__(96);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var warned = {};

	function deprecated(validator, reason) {
	  return function validate(props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;

	    if (props[propName] != null) {
	      var messageKey = componentName + '.' + propName;

	      (0, _warning2.default)(warned[messageKey], 'The ' + location + ' `' + propFullNameSafe + '` of ' + ('`' + componentNameSafe + '` is deprecated. ' + reason + '.'));

	      warned[messageKey] = true;
	    }

	    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
	      args[_key - 5] = arguments[_key];
	    }

	    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
	  };
	}

	/* eslint-disable no-underscore-dangle */
	function _resetWarned() {
	  warned = {};
	}

	deprecated._resetWarned = _resetWarned;
	/* eslint-enable no-underscore-dangle */

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _createChainableTypeChecker = __webpack_require__(107);

	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function elementType(props, propName, componentName, location, propFullName) {
	  var propValue = props[propName];
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

	  if (_react2.default.isValidElement(propValue)) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
	  }

	  if (propType !== 'function' && propType !== 'string') {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
	  }

	  return null;
	}

	exports.default = (0, _createChainableTypeChecker2.default)(elementType);

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = isRequiredForA11y;
	function isRequiredForA11y(validator) {
	  return function validate(props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;

	    if (props[propName] == null) {
	      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');
	    }

	    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
	      args[_key - 5] = arguments[_key];
	    }

	    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
	  };
	}

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _entries = __webpack_require__(113);

	var _entries2 = _interopRequireDefault(_entries);

	exports.default = splitComponentProps;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 分割要传入父元素和子元素的props
	 * @param  {[object]} props     传入的属性
	 * @param  {[reactElement]} Component 组件
	 * @return {[array]}           返回数组，第一个元素为父元素props对象，第二个子元素props对象
	 */
	function splitComponentProps(props, Component) {
	  var componentPropTypes = Component.propTypes;

	  var parentProps = {};
	  var childProps = {};

	  (0, _entries2.default)(props).forEach(function (_ref) {
	    var propName = _ref[0],
	        propValue = _ref[1];

	    if (componentPropTypes[propName]) {
	      parentProps[propName] = propValue;
	    } else {
	      childProps[propName] = propValue;
	    }
	  });

	  return [parentProps, childProps];
	}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	module.exports = __webpack_require__(6).Object.entries;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(19)
	  , $entries = __webpack_require__(116)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(51)
	  , toIObject = __webpack_require__(53)
	  , isEnum    = __webpack_require__(76).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }

	    if (acc === null) {
	      return f;
	    }

	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}
	exports.default = createChainedFunction;

/***/ }),
/* 118 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * @ignore
	 * some key-codes definition and utils from closure-library
	 * @author yiminghe@gmail.com
	 */

	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	};

	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
	  var keyCode = e.keyCode;
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	  // Function keys don't generate text
	  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false;
	  }

	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	    case KeyCode.ALT:
	    case KeyCode.CAPS_LOCK:
	    case KeyCode.CONTEXT_MENU:
	    case KeyCode.CTRL:
	    case KeyCode.DOWN:
	    case KeyCode.END:
	    case KeyCode.ESC:
	    case KeyCode.HOME:
	    case KeyCode.INSERT:
	    case KeyCode.LEFT:
	    case KeyCode.MAC_FF_META:
	    case KeyCode.META:
	    case KeyCode.NUMLOCK:
	    case KeyCode.NUM_CENTER:
	    case KeyCode.PAGE_DOWN:
	    case KeyCode.PAGE_UP:
	    case KeyCode.PAUSE:
	    case KeyCode.PRINT_SCREEN:
	    case KeyCode.RIGHT:
	    case KeyCode.SHIFT:
	    case KeyCode.UP:
	    case KeyCode.WIN_KEY:
	    case KeyCode.WIN_KEY_RIGHT:
	      return false;
	    default:
	      return true;
	  }
	};

	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
	  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
	    return true;
	  }

	  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true;
	  }

	  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
	    return true;
	  }

	  // Safari sends zero key code for non-latin characters.
	  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true;
	  }

	  switch (keyCode) {
	    case KeyCode.SPACE:
	    case KeyCode.QUESTION_MARK:
	    case KeyCode.NUM_PLUS:
	    case KeyCode.NUM_MINUS:
	    case KeyCode.NUM_PERIOD:
	    case KeyCode.NUM_DIVISION:
	    case KeyCode.SEMICOLON:
	    case KeyCode.DASH:
	    case KeyCode.EQUALS:
	    case KeyCode.COMMA:
	    case KeyCode.PERIOD:
	    case KeyCode.SLASH:
	    case KeyCode.APOSTROPHE:
	    case KeyCode.SINGLE_QUOTE:
	    case KeyCode.OPEN_SQUARE_BRACKET:
	    case KeyCode.BACKSLASH:
	    case KeyCode.CLOSE_SQUARE_BRACKET:
	      return true;
	    default:
	      return false;
	  }
	};

	module.exports = KeyCode;

/***/ }),
/* 119 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = contains;
	function contains(root, n) {
	  var node = n;
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = addEventListenerWrap;

	var _addDomEventListener = __webpack_require__(121);

	var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addEventListenerWrap(target, eventType, cb) {
	  /* eslint camelcase: 2 */
	  var callback = _reactDom2.default.unstable_batchedUpdates ? function run(e) {
	    _reactDom2.default.unstable_batchedUpdates(cb, e);
	  } : cb;
	  return (0, _addDomEventListener2.default)(target, eventType, callback);
	}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addEventListener;

	var _EventObject = __webpack_require__(122);

	var _EventObject2 = _interopRequireDefault(_EventObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function addEventListener(target, eventType, callback) {
	  function wrapCallback(e) {
	    var ne = new _EventObject2["default"](e);
	    callback.call(target, ne);
	  }

	  if (target.addEventListener) {
	    target.addEventListener(eventType, wrapCallback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, wrapCallback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, wrapCallback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, wrapCallback);
	      }
	    };
	  }
	}
	module.exports = exports['default'];

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _EventBaseObject = __webpack_require__(123);

	var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

	var _objectAssign = __webpack_require__(124);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * @ignore
	 * event object for dom
	 * @author yiminghe@gmail.com
	 */

	var TRUE = true;
	var FALSE = false;
	var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

	function isNullOrUndefined(w) {
	  return w === null || w === undefined;
	}

	var eventNormalizers = [{
	  reg: /^key/,
	  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
	  fix: function fix(event, nativeEvent) {
	    if (isNullOrUndefined(event.which)) {
	      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
	    }

	    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
	    if (event.metaKey === undefined) {
	      event.metaKey = event.ctrlKey;
	    }
	  }
	}, {
	  reg: /^touch/,
	  props: ['touches', 'changedTouches', 'targetTouches']
	}, {
	  reg: /^hashchange$/,
	  props: ['newURL', 'oldURL']
	}, {
	  reg: /^gesturechange$/i,
	  props: ['rotation', 'scale']
	}, {
	  reg: /^(mousewheel|DOMMouseScroll)$/,
	  props: [],
	  fix: function fix(event, nativeEvent) {
	    var deltaX = void 0;
	    var deltaY = void 0;
	    var delta = void 0;
	    var wheelDelta = nativeEvent.wheelDelta;
	    var axis = nativeEvent.axis;
	    var wheelDeltaY = nativeEvent.wheelDeltaY;
	    var wheelDeltaX = nativeEvent.wheelDeltaX;
	    var detail = nativeEvent.detail;

	    // ie/webkit
	    if (wheelDelta) {
	      delta = wheelDelta / 120;
	    }

	    // gecko
	    if (detail) {
	      // press control e.detail == 1 else e.detail == 3
	      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
	    }

	    // Gecko
	    if (axis !== undefined) {
	      if (axis === event.HORIZONTAL_AXIS) {
	        deltaY = 0;
	        deltaX = 0 - delta;
	      } else if (axis === event.VERTICAL_AXIS) {
	        deltaX = 0;
	        deltaY = delta;
	      }
	    }

	    // Webkit
	    if (wheelDeltaY !== undefined) {
	      deltaY = wheelDeltaY / 120;
	    }
	    if (wheelDeltaX !== undefined) {
	      deltaX = -1 * wheelDeltaX / 120;
	    }

	    // 默认 deltaY (ie)
	    if (!deltaX && !deltaY) {
	      deltaY = delta;
	    }

	    if (deltaX !== undefined) {
	      /**
	       * deltaX of mousewheel event
	       * @property deltaX
	       * @member Event.DomEvent.Object
	       */
	      event.deltaX = deltaX;
	    }

	    if (deltaY !== undefined) {
	      /**
	       * deltaY of mousewheel event
	       * @property deltaY
	       * @member Event.DomEvent.Object
	       */
	      event.deltaY = deltaY;
	    }

	    if (delta !== undefined) {
	      /**
	       * delta of mousewheel event
	       * @property delta
	       * @member Event.DomEvent.Object
	       */
	      event.delta = delta;
	    }
	  }
	}, {
	  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
	  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
	  fix: function fix(event, nativeEvent) {
	    var eventDoc = void 0;
	    var doc = void 0;
	    var body = void 0;
	    var target = event.target;
	    var button = nativeEvent.button;

	    // Calculate pageX/Y if missing and clientX/Y available
	    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
	      eventDoc = target.ownerDocument || document;
	      doc = eventDoc.documentElement;
	      body = eventDoc.body;
	      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	    }

	    // which for click: 1 === left; 2 === middle; 3 === right
	    // do not use button
	    if (!event.which && button !== undefined) {
	      if (button & 1) {
	        event.which = 1;
	      } else if (button & 2) {
	        event.which = 3;
	      } else if (button & 4) {
	        event.which = 2;
	      } else {
	        event.which = 0;
	      }
	    }

	    // add relatedTarget, if necessary
	    if (!event.relatedTarget && event.fromElement) {
	      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
	    }

	    return event;
	  }
	}];

	function retTrue() {
	  return TRUE;
	}

	function retFalse() {
	  return FALSE;
	}

	function DomEventObject(nativeEvent) {
	  var type = nativeEvent.type;

	  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

	  _EventBaseObject2["default"].call(this);

	  this.nativeEvent = nativeEvent;

	  // in case dom event has been mark as default prevented by lower dom node
	  var isDefaultPrevented = retFalse;
	  if ('defaultPrevented' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
	  } else if ('getPreventDefault' in nativeEvent) {
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
	    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
	  } else if ('returnValue' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
	  }

	  this.isDefaultPrevented = isDefaultPrevented;

	  var fixFns = [];
	  var fixFn = void 0;
	  var l = void 0;
	  var prop = void 0;
	  var props = commonProps.concat();

	  eventNormalizers.forEach(function (normalizer) {
	    if (type.match(normalizer.reg)) {
	      props = props.concat(normalizer.props);
	      if (normalizer.fix) {
	        fixFns.push(normalizer.fix);
	      }
	    }
	  });

	  l = props.length;

	  // clone properties of the original event object
	  while (l) {
	    prop = props[--l];
	    this[prop] = nativeEvent[prop];
	  }

	  // fix target property, if necessary
	  if (!this.target && isNative) {
	    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
	  }

	  // check if target is a text node (safari)
	  if (this.target && this.target.nodeType === 3) {
	    this.target = this.target.parentNode;
	  }

	  l = fixFns.length;

	  while (l) {
	    fixFn = fixFns[--l];
	    fixFn(this, nativeEvent);
	  }

	  this.timeStamp = nativeEvent.timeStamp || Date.now();
	}

	var EventBaseObjectProto = _EventBaseObject2["default"].prototype;

	(0, _objectAssign2["default"])(DomEventObject.prototype, EventBaseObjectProto, {
	  constructor: DomEventObject,

	  preventDefault: function preventDefault() {
	    var e = this.nativeEvent;

	    // if preventDefault exists run it on the original event
	    if (e.preventDefault) {
	      e.preventDefault();
	    } else {
	      // otherwise set the returnValue property of the original event to FALSE (IE)
	      e.returnValue = FALSE;
	    }

	    EventBaseObjectProto.preventDefault.call(this);
	  },
	  stopPropagation: function stopPropagation() {
	    var e = this.nativeEvent;

	    // if stopPropagation exists run it on the original event
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    } else {
	      // otherwise set the cancelBubble property of the original event to TRUE (IE)
	      e.cancelBubble = TRUE;
	    }

	    EventBaseObjectProto.stopPropagation.call(this);
	  }
	});

	exports["default"] = DomEventObject;
	module.exports = exports['default'];

/***/ }),
/* 123 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @ignore
	 * base event object for custom and dom event.
	 * @author yiminghe@gmail.com
	 */

	function returnFalse() {
	  return false;
	}

	function returnTrue() {
	  return true;
	}

	function EventBaseObject() {
	  this.timeStamp = Date.now();
	  this.target = undefined;
	  this.currentTarget = undefined;
	}

	EventBaseObject.prototype = {
	  isEventObject: 1,

	  constructor: EventBaseObject,

	  isDefaultPrevented: returnFalse,

	  isPropagationStopped: returnFalse,

	  isImmediatePropagationStopped: returnFalse,

	  preventDefault: function preventDefault() {
	    this.isDefaultPrevented = returnTrue;
	  },
	  stopPropagation: function stopPropagation() {
	    this.isPropagationStopped = returnTrue;
	  },
	  stopImmediatePropagation: function stopImmediatePropagation() {
	    this.isImmediatePropagationStopped = returnTrue;
	    // fixed 1.2
	    // call stopPropagation implicitly
	    this.stopPropagation();
	  },
	  halt: function halt(immediate) {
	    if (immediate) {
	      this.stopImmediatePropagation();
	    } else {
	      this.stopPropagation();
	    }
	    this.preventDefault();
	  }
	};

	exports["default"] = EventBaseObject;
	module.exports = exports['default'];

/***/ }),
/* 124 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Event = __webpack_require__(126);

	var _Event2 = _interopRequireDefault(_Event);

	var _componentClasses = __webpack_require__(127);

	var _componentClasses2 = _interopRequireDefault(_componentClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isCssAnimationSupported = _Event2.default.endEvents.length !== 0;


	var capitalPrefixes = ['Webkit', 'Moz', 'O',
	// ms is special .... !
	'ms'];
	var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

	function getStyleProperty(node, name) {
	  var style = window.getComputedStyle(node);

	  var ret = '';
	  for (var i = 0; i < prefixes.length; i++) {
	    ret = style.getPropertyValue(prefixes[i] + name);
	    if (ret) {
	      break;
	    }
	  }
	  return ret;
	}

	function fixBrowserByTimeout(node) {
	  if (isCssAnimationSupported) {
	    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
	    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
	    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
	    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
	    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
	    // sometimes, browser bug
	    node.rcEndAnimTimeout = setTimeout(function () {
	      node.rcEndAnimTimeout = null;
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }, time * 1000 + 200);
	  }
	}

	function clearBrowserBugTimeout(node) {
	  if (node.rcEndAnimTimeout) {
	    clearTimeout(node.rcEndAnimTimeout);
	    node.rcEndAnimTimeout = null;
	  }
	}

	var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
	  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object';
	  var className = nameIsObj ? transitionName.name : transitionName;
	  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
	  var end = endCallback;
	  var start = void 0;
	  var active = void 0;
	  var nodeClasses = (0, _componentClasses2.default)(node);

	  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
	    end = endCallback.end;
	    start = endCallback.start;
	    active = endCallback.active;
	  }

	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }

	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }

	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }

	    clearBrowserBugTimeout(node);

	    nodeClasses.remove(className);
	    nodeClasses.remove(activeClassName);

	    _Event2.default.removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;

	    // Usually this optional end is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (end) {
	      end();
	    }
	  };

	  _Event2.default.addEndEventListener(node, node.rcEndListener);

	  if (start) {
	    start();
	  }
	  nodeClasses.add(className);

	  node.rcAnimTimeout = setTimeout(function () {
	    node.rcAnimTimeout = null;
	    nodeClasses.add(activeClassName);
	    if (active) {
	      setTimeout(active, 0);
	    }
	    fixBrowserByTimeout(node);
	    // 30ms for firefox
	  }, 30);

	  return {
	    stop: function stop() {
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }
	  };
	};

	cssAnimation.style = function (node, style, callback) {
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }

	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }

	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }

	    clearBrowserBugTimeout(node);

	    _Event2.default.removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;

	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };

	  _Event2.default.addEndEventListener(node, node.rcEndListener);

	  node.rcAnimTimeout = setTimeout(function () {
	    for (var s in style) {
	      if (style.hasOwnProperty(s)) {
	        node.style[s] = style[s];
	      }
	    }
	    node.rcAnimTimeout = null;
	    fixBrowserByTimeout(node);
	  }, 0);
	};

	cssAnimation.setTransition = function (node, p, value) {
	  var property = p;
	  var v = value;
	  if (value === undefined) {
	    v = property;
	    property = '';
	  }
	  property = property || '';
	  capitalPrefixes.forEach(function (prefix) {
	    node.style[prefix + 'Transition' + property] = v;
	  });
	};

	cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

	exports.default = cssAnimation;

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },

	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
	      var baseEvents = EVENT_NAME_MAP[baseEventName];
	      for (var styleName in baseEvents) {
	        if (styleName in style) {
	          endEvents.push(baseEvents[styleName]);
	          break;
	        }
	      }
	    }
	  }
	}

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  detectEvents();
	}

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var TransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },


	  endEvents: endEvents,

	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	exports.default = TransitionEvents;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var index = __webpack_require__(128);
	} catch (err) {
	  var index = __webpack_require__(128);
	}

	/**
	 * Whitespace regexp.
	 */

	var re = /\s+/;

	/**
	 * toString reference.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */

	module.exports = function(el){
	  return new ClassList(el);
	};

	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */

	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}

	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }

	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */

	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};

	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }

	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }

	  return this;
	};

	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */

	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};

	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ }),
/* 128 */
/***/ (function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = toArray;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toArray(children) {
	  var ret = [];
	  _react2.default.Children.forEach(children, function (c) {
	    ret.push(c);
	  });
	  return ret;
	}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _createReactClass = __webpack_require__(131);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _domAlign = __webpack_require__(137);

	var _domAlign2 = _interopRequireDefault(_domAlign);

	var _addEventListener = __webpack_require__(120);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import isWindow from './isWindow';

	function isWindow(obj) {
	  /* eslint no-eq-null: 0 */
	  /* eslint eqeqeq: 0 */
	  return obj != null && obj == obj.window;
	}

	function buffer(fn, ms) {
	  var timer = void 0;

	  function clear() {
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	  }

	  function bufferFn() {
	    clear();
	    timer = setTimeout(fn, ms);
	  }

	  bufferFn.clear = clear;

	  return bufferFn;
	}

	var Align = _react2.default.createClass({
	  propTypes: {
	    childrenProps: _react.PropTypes.object,
	    align: _react.PropTypes.object.isRequired,
	    target: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    monitorBufferTime: _react.PropTypes.number,
	    monitorWindowResize: _react.PropTypes.bool,
	    disabled: _react.PropTypes.bool,
	    children: _react.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      target: function target() {
	        return window;
	      },
	      onAlign: function onAlign() {},

	      monitorBufferTime: 50,
	      monitorWindowResize: false,
	      disabled: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    // if parent ref not attached .... use document.getElementById
	    this.forceAlign();
	    if (!props.disabled && props.monitorWindowResize) {
	      this.startMonitorWindowResize();
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var reAlign = false;
	    var props = this.props;

	    if (!props.disabled) {
	      if (prevProps.disabled || prevProps.align !== props.align) {
	        reAlign = true;
	      } else {
	        var lastTarget = prevProps.target();
	        var currentTarget = props.target();
	        if (isWindow(lastTarget) && isWindow(currentTarget)) {
	          reAlign = false;
	        } else if (lastTarget !== currentTarget) {
	          reAlign = true;
	        }
	      }
	    }

	    if (reAlign) {
	      this.forceAlign();
	    }

	    if (props.monitorWindowResize && !props.disabled) {
	      this.startMonitorWindowResize();
	    } else {
	      this.stopMonitorWindowResize();
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.stopMonitorWindowResize();
	  },
	  startMonitorWindowResize: function startMonitorWindowResize() {
	    if (!this.resizeHandler) {
	      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
	      this.resizeHandler = (0, _addEventListener2.default)(window, 'resize', this.bufferMonitor);
	    }
	  },
	  stopMonitorWindowResize: function stopMonitorWindowResize() {
	    if (this.resizeHandler) {
	      this.bufferMonitor.clear();
	      this.resizeHandler.remove();
	      this.resizeHandler = null;
	    }
	  },
	  forceAlign: function forceAlign() {
	    var props = this.props;
	    if (!props.disabled) {
	      var source = _reactDom2.default.findDOMNode(this);
	      props.onAlign(source, (0, _domAlign2.default)(source, props.target(), props.align));
	    }
	  },
	  render: function render() {
	    var _props = this.props,
	        childrenProps = _props.childrenProps,
	        children = _props.children;

	    var child = _react2.default.Children.only(children);
	    if (childrenProps) {
	      var newProps = {};
	      for (var prop in childrenProps) {
	        if (childrenProps.hasOwnProperty(prop)) {
	          newProps[prop] = this.props[childrenProps[prop]];
	        }
	      }
	      return _react2.default.cloneElement(child, newProps);
	    }
	    return child;
	  }
	});

	exports.default = Align;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var React = __webpack_require__(1);
	var factory = __webpack_require__(132);

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(124);

	var emptyObject = __webpack_require__(133);
	var _invariant = __webpack_require__(134);

	if (process.env.NODE_ENV !== 'production') {
	  var warning = __webpack_require__(135);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context',
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */


	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {

	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @nosideeffects
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'

	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function (Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function (Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function (Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	    },
	    contextTypes: function (Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function (Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function (Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function (Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function () {} };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
	      }

	      return;
	    }

	    _invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
	    _invariant(!isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.');

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

	      var isInherited = name in Constructor;
	      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function (newThis) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	        } else if (!args.length) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedMixin = {
	    componentDidMount: function () {
	      this.__isMounted = true;
	    },
	    componentWillUnmount: function () {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {

	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function (newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function () {
	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component') : void 0;
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function () {};
	  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedMixin);
	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(136);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),
/* 136 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(138);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(140);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	var _getVisibleRectForElement = __webpack_require__(141);

	var _getVisibleRectForElement2 = _interopRequireDefault(_getVisibleRectForElement);

	var _adjustForViewport = __webpack_require__(142);

	var _adjustForViewport2 = _interopRequireDefault(_adjustForViewport);

	var _getRegion = __webpack_require__(143);

	var _getRegion2 = _interopRequireDefault(_getRegion);

	var _getElFuturePos = __webpack_require__(144);

	var _getElFuturePos2 = _interopRequireDefault(_getElFuturePos);

	var _getAlignOffset = __webpack_require__(145);

	var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * align dom node flexibly
	                                                                                                                                                                                                                   * @author yiminghe@gmail.com
	                                                                                                                                                                                                                   */

	// http://yiminghe.iteye.com/blog/1124720

	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}

	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}

	function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
	}

	function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
	}

	function isOutOfVisibleRect(target) {
	  var visibleRect = (0, _getVisibleRectForElement2['default'])(target);
	  var targetRegion = (0, _getRegion2['default'])(target);

	  return !visibleRect || targetRegion.left + targetRegion.width <= visibleRect.left || targetRegion.top + targetRegion.height <= visibleRect.top || targetRegion.left >= visibleRect.right || targetRegion.top >= visibleRect.bottom;
	}

	function flip(points, reg, map) {
	  var ret = [];
	  _utils2['default'].each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}

	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}

	function convertOffset(str, offsetLen) {
	  var n = void 0;
	  if (/%$/.test(str)) {
	    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
	  } else {
	    n = parseInt(str, 10);
	  }
	  return n || 0;
	}

	function ySize(region) {
	  return region.bottom - region.top;
	}

	function xSize(region) {
	  return region.right - region.left;
	}

	function normalizeOffset(offset, el) {
	  offset[0] = convertOffset(offset[0], el.width);
	  offset[1] = convertOffset(offset[1], el.height);
	}

	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset || [0, 0];
	  var targetOffset = align.targetOffset || [0, 0];
	  var overflow = align.overflow;
	  var target = align.target || refNode;
	  var source = align.source || el;
	  offset = [].concat(offset);
	  targetOffset = [].concat(targetOffset);
	  overflow = overflow || {};
	  var newOverflowCfg = {};
	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = (0, _getVisibleRectForElement2['default'])(source);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = (0, _getRegion2['default'])(source);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = (0, _getRegion2['default'])(target);
	  // 将 offset 转换成数值，支持百分比
	  normalizeOffset(offset, elRegion);
	  normalizeOffset(targetOffset, refNodeRegion);
	  // 当前节点将要被放置的位置
	  var elFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, points, offset, targetOffset);
	  // 当前节点将要所处的区域
	  var newElRegion = _utils2['default'].merge(elRegion, elFuturePos);

	  var isTargetNotOutOfVisible = !isOutOfVisibleRect(target);
	  var refNodeOffset = _utils2['default'].merge(refNodeRegion, (0, _getAlignOffset2['default'])(refNodeRegion, points[1]));

	  var Xregion = void 0;
	  var YRegion = void 0;
	  var xRefPoint = points[0].charAt(1);
	  // TODO if visibleRect.xx < refNodeOffset.left ??
	  if (xRefPoint === 'c') {
	    Xregion = _utils2['default'].merge(visibleRect, {
	      left: refNodeOffset.left - elRegion.width / 2
	    });
	  } else {
	    Xregion = _utils2['default'].merge(visibleRect, _defineProperty({}, xRefPoint === 'l' ? 'left' : 'right', refNodeOffset.left));
	  }

	  var yRefPoint = points[0].charAt(0);
	  if (yRefPoint === 'c') {
	    YRegion = _utils2['default'].merge(visibleRect, {
	      top: refNodeOffset.top - elRegion.height / 2
	    });
	  } else {
	    YRegion = _utils2['default'].merge(visibleRect, _defineProperty({}, yRefPoint === 't' ? 'top' : 'bottom', refNodeOffset.top));
	  }

	  var realXRegion = Xregion;
	  var realYRegion = YRegion;
	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY) && isTargetNotOutOfVisible) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 0);
	        var newTargetOffset = flipOffset(targetOffset, 0);
	        var newElFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);

	        var XregionReversal = _utils2['default'].merge(visibleRect, _defineProperty({}, newPoints[0].charAt(1) === 'l' ? 'left' : 'right', (0, _getAlignOffset2['default'])(refNodeRegion, newPoints[1]).left));
	        var canXFlip = xSize(XregionReversal) > xSize(Xregion);
	        if (canXFlip && !isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	          realXRegion = XregionReversal;
	        }
	      }
	    }

	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var _newPoints = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        var _newOffset = flipOffset(offset, 1);
	        var _newTargetOffset = flipOffset(targetOffset, 1);
	        var _newElFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, _newPoints, _newOffset, _newTargetOffset);

	        var YRegionReversal = _utils2['default'].merge(visibleRect, _defineProperty({}, _newPoints[0].charAt(0) === 't' ? 'top' : 'bottom', (0, _getAlignOffset2['default'])(refNodeRegion, _newPoints[1]).top));
	        var canYFlip = ySize(YRegionReversal) > ySize(YRegion);

	        if (canYFlip && !isCompleteFailY(_newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = _newPoints;
	          offset = _newOffset;
	          targetOffset = _newTargetOffset;
	          realYRegion = YRegionReversal;
	        }
	      }
	    }

	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, points, offset, targetOffset);
	      _utils2['default'].mix(newElRegion, elFuturePos);
	    }

	    newOverflowCfg.resizeHeight = overflow.resizeHeight;
	    newOverflowCfg.resizeWidth = overflow.resizeWidth;
	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, realXRegion);

	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, realYRegion);

	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = (0, _adjustForViewport2['default'])(elFuturePos, elRegion, realXRegion, realYRegion, newOverflowCfg);
	    }
	  }

	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    _utils2['default'].css(source, 'width', _utils2['default'].width(source) + newElRegion.width - elRegion.width);
	  }

	  if (newElRegion.height !== elRegion.height) {
	    _utils2['default'].css(source, 'height', _utils2['default'].height(source) + newElRegion.height - elRegion.height);
	  }

	  // https://github.com/kissyteam/kissy/issues/190
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  _utils2['default'].offset(source, {
	    left: newElRegion.left,
	    top: newElRegion.top
	  }, {
	    useCssRight: align.useCssRight,
	    useCssBottom: align.useCssBottom,
	    useCssTransform: align.useCssTransform
	  });

	  return {
	    points: points,
	    offset: offset,
	    targetOffset: targetOffset,
	    overflow: newOverflowCfg
	  };
	}

	domAlign.__getOffsetParent = _getOffsetParent2['default'];

	domAlign.__getVisibleRectForElement = _getVisibleRectForElement2['default'];

	exports['default'] = domAlign;
	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/

	module.exports = exports['default'];

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _propertyUtils = __webpack_require__(139);

	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

	var getComputedStyleX = void 0;

	function force(x, y) {
	  return x + y;
	}

	function css(el, name, v) {
	  var value = v;
	  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}

	function getClientPosition(elem) {
	  var box = void 0;
	  var x = void 0;
	  var y = void 0;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();

	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

	  x = box.left;
	  y = box.top;

	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.

	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.

	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;

	  return {
	    left: x,
	    top: y
	  };
	}

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function getScrollLeft(w) {
	  return getScroll(w);
	}

	function getScrollTop(w) {
	  return getScroll(w, true);
	}

	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}

	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj !== null && obj !== undefined && obj == obj.window;
	}

	function getDocument(node) {
	  if (isWindow(node)) {
	    return node.document;
	  }
	  if (node.nodeType === 9) {
	    return node;
	  }
	  return node.ownerDocument;
	}

	function _getComputedStyle(elem, name, cs) {
	  var computedStyle = cs;
	  var val = '';
	  var d = getDocument(elem);
	  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }

	  return val;
	}

	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';

	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];

	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;

	    // Revert the changed values
	    style[LEFT] = left;

	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}

	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}

	function getOffsetDirection(dir, option) {
	  if (dir === 'left') {
	    return option.useCssRight ? 'right' : dir;
	  }
	  return option.useCssBottom ? 'bottom' : dir;
	}

	function oppositeOffsetDirection(dir) {
	  if (dir === 'left') {
	    return 'right';
	  } else if (dir === 'right') {
	    return 'left';
	  } else if (dir === 'top') {
	    return 'bottom';
	  } else if (dir === 'bottom') {
	    return 'top';
	  }
	}

	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setLeftTop(elem, offset, option) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var presetH = -999;
	  var presetV = -999;
	  var horizontalProperty = getOffsetDirection('left', option);
	  var verticalProperty = getOffsetDirection('top', option);
	  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
	  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

	  if (horizontalProperty !== 'left') {
	    presetH = 999;
	  }

	  if (verticalProperty !== 'top') {
	    presetV = 999;
	  }
	  var originalTransition = '';
	  var originalOffset = getOffset(elem);
	  if ('left' in offset || 'top' in offset) {
	    originalTransition = (0, _propertyUtils.getTransitionProperty)(elem) || '';
	    (0, _propertyUtils.setTransitionProperty)(elem, 'none');
	  }
	  if ('left' in offset) {
	    elem.style[oppositeHorizontalProperty] = '';
	    elem.style[horizontalProperty] = presetH + 'px';
	  }
	  if ('top' in offset) {
	    elem.style[oppositeVerticalProperty] = '';
	    elem.style[verticalProperty] = presetV + 'px';
	  }
	  var old = getOffset(elem);
	  var originalStyle = {};
	  for (var key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      var dir = getOffsetDirection(key, option);
	      var preset = key === 'left' ? presetH : presetV;
	      var off = originalOffset[key] - old[key];
	      if (dir === key) {
	        originalStyle[dir] = preset + off;
	      } else {
	        originalStyle[dir] = preset - off;
	      }
	    }
	  }
	  css(elem, originalStyle);
	  // force relayout
	  force(elem.offsetTop, elem.offsetLeft);
	  if ('left' in offset || 'top' in offset) {
	    (0, _propertyUtils.setTransitionProperty)(elem, originalTransition);
	  }
	  var ret = {};
	  for (var _key in offset) {
	    if (offset.hasOwnProperty(_key)) {
	      var _dir = getOffsetDirection(_key, option);
	      var _off = offset[_key] - originalOffset[_key];
	      if (_key === _dir) {
	        ret[_dir] = originalStyle[_dir] + _off;
	      } else {
	        ret[_dir] = originalStyle[_dir] - _off;
	      }
	    }
	  }
	  css(elem, ret);
	}

	function setTransform(elem, offset) {
	  var originalOffset = getOffset(elem);
	  var originalXY = (0, _propertyUtils.getTransformXY)(elem);
	  var resultXY = { x: originalXY.x, y: originalXY.y };
	  if ('left' in offset) {
	    resultXY.x = originalXY.x + offset.left - originalOffset.left;
	  }
	  if ('top' in offset) {
	    resultXY.y = originalXY.y + offset.top - originalOffset.top;
	  }
	  (0, _propertyUtils.setTransformXY)(elem, resultXY);
	}

	function setOffset(elem, offset, option) {
	  if (option.useCssRight || option.useCssBottom) {
	    setLeftTop(elem, offset, option);
	  } else if (option.useCssTransform && (0, _propertyUtils.getTransformName)() in document.body.style) {
	    setTransform(elem, offset, option);
	  } else {
	    setLeftTop(elem, offset, option);
	  }
	}

	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}

	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}

	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;

	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = void 0;

	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }

	  callback.call(elem);

	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}

	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = void 0;
	  var j = void 0;
	  var i = void 0;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = void 0;
	        if (prop === 'border') {
	          cssProp = '' + prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}

	var domUtils = {};

	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };

	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});

	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, ex) {
	  var extra = ex;
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  } else if (borderBoxValueOrIsBorderBox) {
	    if (extra === BORDER_INDEX) {
	      return val;
	    }
	    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}

	var cssShow = {
	  position: 'absolute',
	  visibility: 'hidden',
	  display: 'block'
	};

	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay() {
	  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  var val = void 0;
	  var elem = args[0];
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}

	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

	  domUtils[name] = function (elem, v) {
	    var val = v;
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});

	function mix(to, from) {
	  for (var i in from) {
	    if (from.hasOwnProperty(i)) {
	      to[i] = from[i];
	    }
	  }
	  return to;
	}

	var utils = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },

	  getDocument: getDocument,
	  offset: function offset(el, value, option) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value, option || {});
	    } else {
	      return getOffset(el);
	    }
	  },

	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i = void 0;
	    var ret = {};
	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },

	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};

	    for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    for (var i = 0; i < args.length; i++) {
	      utils.mix(ret, args[i]);
	    }
	    return ret;
	  },

	  viewportWidth: 0,
	  viewportHeight: 0
	};

	mix(utils, domUtils);

	exports['default'] = utils;
	module.exports = exports['default'];

/***/ }),
/* 139 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTransformName = getTransformName;
	exports.setTransitionProperty = setTransitionProperty;
	exports.getTransitionProperty = getTransitionProperty;
	exports.getTransformXY = getTransformXY;
	exports.setTransformXY = setTransformXY;
	var vendorPrefix = void 0;

	var jsCssMap = {
	  Webkit: '-webkit-',
	  Moz: '-moz-',
	  // IE did it wrong again ...
	  ms: '-ms-',
	  O: '-o-'
	};

	function getVendorPrefix() {
	  if (vendorPrefix !== undefined) {
	    return vendorPrefix;
	  }
	  vendorPrefix = '';
	  var style = document.createElement('p').style;
	  var testProp = 'Transform';
	  for (var key in jsCssMap) {
	    if (key + testProp in style) {
	      vendorPrefix = key;
	    }
	  }
	  return vendorPrefix;
	}

	function getTransitionName() {
	  return getVendorPrefix() ? getVendorPrefix() + 'TransitionProperty' : 'transitionProperty';
	}

	function getTransformName() {
	  return getVendorPrefix() ? getVendorPrefix() + 'Transform' : 'transform';
	}

	function setTransitionProperty(node, value) {
	  var name = getTransitionName();
	  if (name) {
	    node.style[name] = value;
	    if (name !== 'transitionProperty') {
	      node.style.transitionProperty = value;
	    }
	  }
	}

	function setTransform(node, value) {
	  var name = getTransformName();
	  if (name) {
	    node.style[name] = value;
	    if (name !== 'transform') {
	      node.style.transform = value;
	    }
	  }
	}

	function getTransitionProperty(node) {
	  return node.style.transitionProperty || node.style[getTransitionName()];
	}

	function getTransformXY(node) {
	  var style = window.getComputedStyle(node, null);
	  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
	  if (transform && transform !== 'none') {
	    var matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');
	    return { x: parseFloat(matrix[12] || matrix[4], 0), y: parseFloat(matrix[13] || matrix[5], 0) };
	  }
	  return {
	    x: 0,
	    y: 0
	  };
	}

	var matrix2d = /matrix\((.*)\)/;
	var matrix3d = /matrix3d\((.*)\)/;

	function setTransformXY(node, xy) {
	  var style = window.getComputedStyle(node, null);
	  var transform = style.getPropertyValue('transform') || style.getPropertyValue(getTransformName());
	  if (transform && transform !== 'none') {
	    var arr = void 0;
	    var match2d = transform.match(matrix2d);
	    if (match2d) {
	      match2d = match2d[1];
	      arr = match2d.split(',').map(function (item) {
	        return parseFloat(item, 10);
	      });
	      arr[4] = xy.x;
	      arr[5] = xy.y;
	      setTransform(node, 'matrix(' + arr.join(',') + ')');
	    } else {
	      var match3d = transform.match(matrix3d)[1];
	      arr = match3d.split(',').map(function (item) {
	        return parseFloat(item, 10);
	      });
	      arr[12] = xy.x;
	      arr[13] = xy.y;
	      setTransform(node, 'matrix3d(' + arr.join(',') + ')');
	    }
	  } else {
	    setTransform(node, 'translateX(' + xy.x + 'px) translateY(' + xy.y + 'px) translateZ(0)');
	  }
	}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(138);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * 得到会导致元素显示不全的祖先元素
	 */

	function getOffsetParent(element) {
	  if (_utils2['default'].isWindow(element) || element.nodeType === 9) {
	    return null;
	  }
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = _utils2['default'].getDocument(element);
	  var body = doc.body;
	  var parent = void 0;
	  var positionStyle = _utils2['default'].css(element, 'position');
	  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }

	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = _utils2['default'].css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}

	exports['default'] = getOffsetParent;
	module.exports = exports['default'];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(138);

	var _utils2 = _interopRequireDefault(_utils);

	var _getOffsetParent = __webpack_require__(140);

	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * 获得元素的显示部分的区域
	 */
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  };
	  var el = (0, _getOffsetParent2['default'])(element);
	  var scrollX = void 0;
	  var scrollY = void 0;
	  var winSize = void 0;
	  var doc = _utils2['default'].getDocument(element);
	  var win = doc.defaultView || doc.parentWindow;
	  var body = doc.body;
	  var documentElement = doc.documentElement;

	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
	    // body may have overflow set on it, yet we still get the entire
	    // viewport. In some browsers, el.offsetParent may be
	    // document.documentElement, so check for that too.
	    el !== body && el !== documentElement && _utils2['default'].css(el, 'overflow') !== 'visible') {
	      var pos = _utils2['default'].offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = (0, _getOffsetParent2['default'])(el);
	  }

	  // Clip by window's viewport.
	  scrollX = _utils2['default'].getWindowScrollLeft(win);
	  scrollY = _utils2['default'].getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: _utils2['default'].viewportWidth(win),
	    height: _utils2['default'].viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}

	exports['default'] = getVisibleRectForElement;
	module.exports = exports['default'];

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(138);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function adjustForViewport(elFuturePos, elRegion, xRect, yRect, overflow) {
	  var pos = _utils2['default'].clone(elFuturePos);
	  var size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };

	  if (overflow.adjustX && pos.left < xRect.left) {
	    pos.left = xRect.left;
	  }

	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= xRect.left && pos.left + size.width > xRect.right) {
	    size.width -= pos.left + size.width - xRect.right;
	  }

	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > xRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(xRect.right - size.width, xRect.left);
	  }

	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < yRect.top) {
	    pos.top = yRect.top;
	  }

	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= yRect.top && pos.top + size.height > yRect.bottom) {
	    size.height -= pos.top + size.height - yRect.bottom;
	  }

	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > yRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(yRect.bottom - size.height, yRect.top);
	  }

	  return _utils2['default'].mix(pos, size);
	}

	exports['default'] = adjustForViewport;
	module.exports = exports['default'];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(138);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getRegion(node) {
	  var offset = void 0;
	  var w = void 0;
	  var h = void 0;
	  if (!_utils2['default'].isWindow(node) && node.nodeType !== 9) {
	    offset = _utils2['default'].offset(node);
	    w = _utils2['default'].outerWidth(node);
	    h = _utils2['default'].outerHeight(node);
	  } else {
	    var win = _utils2['default'].getWindow(node);
	    offset = {
	      left: _utils2['default'].getWindowScrollLeft(win),
	      top: _utils2['default'].getWindowScrollTop(win)
	    };
	    w = _utils2['default'].viewportWidth(win);
	    h = _utils2['default'].viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}

	exports['default'] = getRegion;
	module.exports = exports['default'];

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getAlignOffset = __webpack_require__(145);

	var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
	  var xy = void 0;
	  var diff = void 0;
	  var p1 = void 0;
	  var p2 = void 0;

	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };

	  p1 = (0, _getAlignOffset2['default'])(refNodeRegion, points[1]);
	  p2 = (0, _getAlignOffset2['default'])(elRegion, points[0]);

	  diff = [p2.left - p1.left, p2.top - p1.top];

	  return {
	    left: xy.left - diff[0] + offset[0] - targetOffset[0],
	    top: xy.top - diff[1] + offset[1] - targetOffset[1]
	  };
	}

	exports['default'] = getElFuturePos;
	module.exports = exports['default'];

/***/ }),
/* 145 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */

	function getAlignOffset(region, align) {
	  var V = align.charAt(0);
	  var H = align.charAt(1);
	  var w = region.width;
	  var h = region.height;
	  var x = void 0;
	  var y = void 0;

	  x = region.left;
	  y = region.top;

	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }

	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }

	  return {
	    left: x,
	    top: y
	  };
	}

	exports['default'] = getAlignOffset;
	module.exports = exports['default'];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _classnames = __webpack_require__(99);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tinperBeeCore = __webpack_require__(105);

	var _calculatePosition = __webpack_require__(147);

	var _calculatePosition2 = _interopRequireDefault(_calculatePosition);

	var _getContainer = __webpack_require__(104);

	var _getContainer2 = _interopRequireDefault(_getContainer);

	var _ownerDocument = __webpack_require__(102);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var propTypes = {
	  /**
	   * 要设置定位的元素
	   */
	  target: _react.PropTypes.oneOfType([_tinperBeeCore.componentOrElement, _react.PropTypes.func]),

	  /**
	   * 存放的容器元素
	   */
	  container: _react.PropTypes.oneOfType([_tinperBeeCore.componentOrElement, _react.PropTypes.func]),
	  /**
	   * 容器padding值
	   */
	  containerPadding: _react.PropTypes.number,
	  /**
	   * 位置设置
	   */
	  placement: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	  /**
	   * 是否需要更新位置
	   */
	  shouldUpdatePosition: _react.PropTypes.bool
	};

	var defaultProps = {
	  containerPadding: 0,
	  placement: 'right',
	  shouldUpdatePosition: false
	};

	/**
	 * 计算子组件的位置的组件
	 */

	var Position = function (_Component) {
	  _inherits(Position, _Component);

	  function Position(props, context) {
	    _classCallCheck(this, Position);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.state = {
	      positionLeft: 0,
	      positionTop: 0,
	      arrowOffsetLeft: null,
	      arrowOffsetTop: null
	    };

	    _this.needsFlush = false;
	    _this.lastTarget = null;

	    _this.getTarget = _this.getTarget.bind(_this);
	    _this.maybeUpdatePosition = _this.maybeUpdatePosition.bind(_this);
	    _this.updatePosition = _this.updatePosition.bind(_this);
	    return _this;
	  }

	  Position.prototype.componentDidMount = function componentDidMount() {
	    this.updatePosition(this.getTarget());
	  };

	  Position.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
	    this.needsFlush = true;
	  };

	  Position.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    if (this.needsFlush) {
	      this.needsFlush = false;
	      this.maybeUpdatePosition(this.props.placement !== prevProps.placement);
	    }
	  };
	  /**
	   * 获取要设置位置的子元素
	   */


	  Position.prototype.getTarget = function getTarget() {
	    var target = this.props.target;

	    var targetElement = typeof target === 'function' ? target() : target;
	    return targetElement && _reactDom2["default"].findDOMNode(targetElement) || null;
	  };

	  /**
	   * 验证是否需要更新位置
	   */


	  Position.prototype.maybeUpdatePosition = function maybeUpdatePosition(placementChanged) {
	    var target = this.getTarget();

	    if (!this.props.shouldUpdatePosition && target === this.lastTarget && !placementChanged) {
	      return;
	    }

	    this.updatePosition(target);
	  };
	  /**
	   * 更新位置
	   */

	  Position.prototype.updatePosition = function updatePosition(target) {
	    this.lastTarget = target;

	    if (!target) {
	      this.setState({
	        positionLeft: 0,
	        positionTop: 0,
	        arrowOffsetLeft: null,
	        arrowOffsetTop: null
	      });

	      return;
	    }

	    var overlay = _reactDom2["default"].findDOMNode(this);
	    var container = (0, _getContainer2["default"])(this.props.container, (0, _ownerDocument2["default"])(this).body);

	    this.setState((0, _calculatePosition2["default"])(this.props.placement, overlay, target, container, this.props.containerPadding));
	  };

	  Position.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;

	    var props = _objectWithoutProperties(_props, ['children', 'className']);

	    var _state = this.state;
	    var positionLeft = _state.positionLeft;
	    var positionTop = _state.positionTop;

	    var arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop']);

	    // These should not be forwarded to the child.


	    delete props.target;
	    delete props.container;
	    delete props.containerPadding;
	    delete props.shouldUpdatePosition;

	    var child = _react2["default"].Children.only(children);
	    return (0, _react.cloneElement)(child, _extends({}, props, arrowPosition, {
	      // FIXME:不要使用props来转发下面两个参数
	      positionLeft: positionLeft,
	      positionTop: positionTop,
	      className: (0, _classnames2["default"])(className, child.props.className),
	      style: _extends({}, child.props.style, {
	        left: positionLeft,
	        top: positionTop
	      })
	    }));
	  };

	  return Position;
	}(_react.Component);

	Position.propTypes = propTypes;
	Position.defaultProps = defaultProps;

	exports["default"] = Position;
	module.exports = exports['default'];

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = calculatePosition;

	var _offset = __webpack_require__(148);

	var _offset2 = _interopRequireDefault(_offset);

	var _position = __webpack_require__(150);

	var _position2 = _interopRequireDefault(_position);

	var _scrollTop = __webpack_require__(161);

	var _scrollTop2 = _interopRequireDefault(_scrollTop);

	var _ownerDocument = __webpack_require__(102);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getContainerDimensions(containerNode) {
	  var width = void 0,
	      height = void 0,
	      scroll = void 0;

	  if (containerNode.tagName === 'BODY') {
	    width = window.innerWidth;
	    height = window.innerHeight;

	    scroll = (0, _scrollTop2["default"])((0, _ownerDocument2["default"])(containerNode).documentElement) || (0, _scrollTop2["default"])(containerNode);
	  } else {
	    var _getOffset = (0, _offset2["default"])(containerNode);

	    width = _getOffset.width;
	    height = _getOffset.height;

	    scroll = (0, _scrollTop2["default"])(containerNode);
	  }

	  return { width: width, height: height, scroll: scroll };
	}

	function getTopDelta(top, overlayHeight, container, padding) {
	  var containerDimensions = getContainerDimensions(container);
	  var containerScroll = containerDimensions.scroll;
	  var containerHeight = containerDimensions.height;

	  var topEdgeOffset = top - padding - containerScroll;
	  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

	  if (topEdgeOffset < 0) {
	    return -topEdgeOffset;
	  } else if (bottomEdgeOffset > containerHeight) {
	    return containerHeight - bottomEdgeOffset;
	  } else {
	    return 0;
	  }
	}

	function getLeftDelta(left, overlayWidth, container, padding) {
	  var containerDimensions = getContainerDimensions(container);
	  var containerWidth = containerDimensions.width;

	  var leftEdgeOffset = left - padding;
	  var rightEdgeOffset = left + padding + overlayWidth;

	  if (leftEdgeOffset < 0) {
	    return -leftEdgeOffset;
	  } else if (rightEdgeOffset > containerWidth) {
	    return containerWidth - rightEdgeOffset;
	  }

	  return 0;
	}

	function calculatePosition(placement, overlayNode, target, container, padding) {
	  var childOffset = container.tagName === 'BODY' ? (0, _offset2["default"])(target) : (0, _position2["default"])(target, container);

	  var _getOffset2 = (0, _offset2["default"])(overlayNode);

	  var overlayHeight = _getOffset2.height;
	  var overlayWidth = _getOffset2.width;


	  var positionLeft = void 0,
	      positionTop = void 0,
	      arrowOffsetLeft = void 0,
	      arrowOffsetTop = void 0;

	  if (placement === 'left' || placement === 'right') {
	    positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

	    if (placement === 'left') {
	      positionLeft = childOffset.left - overlayWidth;
	    } else {
	      positionLeft = childOffset.left + childOffset.width;
	    }

	    var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

	    positionTop += topDelta;
	    arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
	    arrowOffsetLeft = void 0;
	  } else if (placement === 'top' || placement === 'bottom') {
	    positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

	    if (placement === 'top') {
	      positionTop = childOffset.top - overlayHeight;
	    } else {
	      positionTop = childOffset.top + childOffset.height;
	    }

	    var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);

	    positionLeft += leftDelta;
	    arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
	    arrowOffsetTop = void 0;
	  } else {
	    throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
	  }

	  return { positionLeft: positionLeft, positionTop: positionTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
	}
	module.exports = exports['default'];

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = offset;

	var _contains = __webpack_require__(94);

	var _contains2 = _interopRequireDefault(_contains);

	var _isWindow = __webpack_require__(149);

	var _isWindow2 = _interopRequireDefault(_isWindow);

	var _ownerDocument = __webpack_require__(103);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function offset(node) {
	  var doc = (0, _ownerDocument2.default)(node),
	      win = (0, _isWindow2.default)(doc),
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };

	  if (!doc) return;

	  // Make sure it's not a disconnected DOM node
	  if (!(0, _contains2.default)(docElem, node)) return box;

	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

	  // IE8 getBoundingClientRect doesn't support width & height
	  box = {
	    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
	    width: (box.width == null ? node.offsetWidth : box.width) || 0,
	    height: (box.height == null ? node.offsetHeight : box.height) || 0
	  };

	  return box;
	}
	module.exports = exports['default'];

/***/ }),
/* 149 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getWindow;
	function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	}
	module.exports = exports["default"];

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = position;

	var _offset = __webpack_require__(148);

	var _offset2 = _interopRequireDefault(_offset);

	var _offsetParent = __webpack_require__(151);

	var _offsetParent2 = _interopRequireDefault(_offsetParent);

	var _scrollTop = __webpack_require__(161);

	var _scrollTop2 = _interopRequireDefault(_scrollTop);

	var _scrollLeft = __webpack_require__(162);

	var _scrollLeft2 = _interopRequireDefault(_scrollLeft);

	var _style = __webpack_require__(152);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function nodeName(node) {
	  return node.nodeName && node.nodeName.toLowerCase();
	}

	function position(node, offsetParent) {
	  var parentOffset = { top: 0, left: 0 },
	      offset;

	  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
	  // because it is its only offset parent
	  if ((0, _style2.default)(node, 'position') === 'fixed') {
	    offset = node.getBoundingClientRect();
	  } else {
	    offsetParent = offsetParent || (0, _offsetParent2.default)(node);
	    offset = (0, _offset2.default)(node);

	    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2.default)(offsetParent);

	    parentOffset.top += parseInt((0, _style2.default)(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2.default)(offsetParent) || 0;
	    parentOffset.left += parseInt((0, _style2.default)(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2.default)(offsetParent) || 0;
	  }

	  // Subtract parent offsets and node margins
	  return _extends({}, offset, {
	    top: offset.top - parentOffset.top - (parseInt((0, _style2.default)(node, 'marginTop'), 10) || 0),
	    left: offset.left - parentOffset.left - (parseInt((0, _style2.default)(node, 'marginLeft'), 10) || 0)
	  });
	}
	module.exports = exports['default'];

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = offsetParent;

	var _ownerDocument = __webpack_require__(103);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	var _style = __webpack_require__(152);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function nodeName(node) {
	  return node.nodeName && node.nodeName.toLowerCase();
	}

	function offsetParent(node) {
	  var doc = (0, _ownerDocument2.default)(node),
	      offsetParent = node && node.offsetParent;

	  while (offsetParent && nodeName(node) !== 'html' && (0, _style2.default)(offsetParent, 'position') === 'static') {
	    offsetParent = offsetParent.offsetParent;
	  }

	  return offsetParent || doc.documentElement;
	}
	module.exports = exports['default'];

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = style;

	var _camelizeStyle = __webpack_require__(153);

	var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

	var _hyphenateStyle = __webpack_require__(155);

	var _hyphenateStyle2 = _interopRequireDefault(_hyphenateStyle);

	var _getComputedStyle2 = __webpack_require__(157);

	var _getComputedStyle3 = _interopRequireDefault(_getComputedStyle2);

	var _removeStyle = __webpack_require__(158);

	var _removeStyle2 = _interopRequireDefault(_removeStyle);

	var _properties = __webpack_require__(159);

	var _isTransform = __webpack_require__(160);

	var _isTransform2 = _interopRequireDefault(_isTransform);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function style(node, property, value) {
	  var css = '';
	  var transforms = '';
	  var props = property;

	  if (typeof property === 'string') {
	    if (value === undefined) {
	      return node.style[(0, _camelizeStyle2.default)(property)] || (0, _getComputedStyle3.default)(node).getPropertyValue((0, _hyphenateStyle2.default)(property));
	    } else {
	      (props = {})[property] = value;
	    }
	  }

	  Object.keys(props).forEach(function (key) {
	    var value = props[key];
	    if (!value && value !== 0) {
	      (0, _removeStyle2.default)(node, (0, _hyphenateStyle2.default)(key));
	    } else if ((0, _isTransform2.default)(key)) {
	      transforms += key + '(' + value + ') ';
	    } else {
	      css += (0, _hyphenateStyle2.default)(key) + ': ' + value + ';';
	    }
	  });

	  if (transforms) {
	    css += _properties.transform + ': ' + transforms + ';';
	  }

	  node.style.cssText += ';' + css;
	}
	module.exports = exports['default'];

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = camelizeStyleName;

	var _camelize = __webpack_require__(154);

	var _camelize2 = _interopRequireDefault(_camelize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var msPattern = /^-ms-/; /**
	                          * Copyright 2014-2015, Facebook, Inc.
	                          * All rights reserved.
	                          * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	                          */
	function camelizeStyleName(string) {
	  return (0, _camelize2.default)(string.replace(msPattern, 'ms-'));
	}
	module.exports = exports['default'];

/***/ }),
/* 154 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = camelize;
	var rHyphen = /-(.)/g;

	function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	}
	module.exports = exports["default"];

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hyphenateStyleName;

	var _hyphenate = __webpack_require__(156);

	var _hyphenate2 = _interopRequireDefault(_hyphenate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var msPattern = /^ms-/; /**
	                         * Copyright 2013-2014, Facebook, Inc.
	                         * All rights reserved.
	                         * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	                         */

	function hyphenateStyleName(string) {
	  return (0, _hyphenate2.default)(string).replace(msPattern, '-ms-');
	}
	module.exports = exports['default'];

/***/ }),
/* 156 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = hyphenate;

	var rUpper = /([A-Z])/g;

	function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	}
	module.exports = exports['default'];

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = _getComputedStyle;

	var _camelizeStyle = __webpack_require__(153);

	var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

	function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;

	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
	    //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;

	      prop = (0, _camelizeStyle2.default)(prop);

	      if (prop == 'float') prop = 'styleFloat';

	      var current = node.currentStyle[prop] || null;

	      if (current == null && style && style[prop]) current = style[prop];

	      if (rnumnonpx.test(current) && !rposition.test(prop)) {
	        // Remember the original values
	        var left = style.left;
	        var runStyle = node.runtimeStyle;
	        var rsLeft = runStyle && runStyle.left;

	        // Put in the new values to get a computed value out
	        if (rsLeft) runStyle.left = node.currentStyle.left;

	        style.left = prop === 'fontSize' ? '1em' : current;
	        current = style.pixelLeft + 'px';

	        // Revert the changed values
	        style.left = left;
	        if (rsLeft) runStyle.left = rsLeft;
	      }

	      return current;
	    }
	  };
	}
	module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = removeStyle;
	function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	}
	module.exports = exports['default'];

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

	var _inDOM = __webpack_require__(95);

	var _inDOM2 = _interopRequireDefault(_inDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var transform = 'transform';
	var prefix = void 0,
	    transitionEnd = void 0,
	    animationEnd = void 0;
	var transitionProperty = void 0,
	    transitionDuration = void 0,
	    transitionTiming = void 0,
	    transitionDelay = void 0;
	var animationName = void 0,
	    animationDuration = void 0,
	    animationTiming = void 0,
	    animationDelay = void 0;

	if (_inDOM2.default) {
	  var _getTransitionPropert = getTransitionProperties();

	  prefix = _getTransitionPropert.prefix;
	  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
	  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


	  exports.transform = transform = prefix + '-' + transform;
	  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
	  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
	  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
	  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

	  exports.animationName = animationName = prefix + '-animation-name';
	  exports.animationDuration = animationDuration = prefix + '-animation-duration';
	  exports.animationTiming = animationTiming = prefix + '-animation-delay';
	  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
	}

	exports.transform = transform;
	exports.transitionProperty = transitionProperty;
	exports.transitionTiming = transitionTiming;
	exports.transitionDelay = transitionDelay;
	exports.transitionDuration = transitionDuration;
	exports.transitionEnd = transitionEnd;
	exports.animationName = animationName;
	exports.animationDuration = animationDuration;
	exports.animationTiming = animationTiming;
	exports.animationDelay = animationDelay;
	exports.animationEnd = animationEnd;
	exports.default = {
	  transform: transform,
	  end: transitionEnd,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};


	function getTransitionProperties() {
	  var style = document.createElement('div').style;

	  var vendorMap = {
	    O: function O(e) {
	      return 'o' + e.toLowerCase();
	    },
	    Moz: function Moz(e) {
	      return e.toLowerCase();
	    },
	    Webkit: function Webkit(e) {
	      return 'webkit' + e;
	    },
	    ms: function ms(e) {
	      return 'MS' + e;
	    }
	  };

	  var vendors = Object.keys(vendorMap);

	  var transitionEnd = void 0,
	      animationEnd = void 0;
	  var prefix = '';

	  for (var i = 0; i < vendors.length; i++) {
	    var vendor = vendors[i];

	    if (vendor + 'TransitionProperty' in style) {
	      prefix = '-' + vendor.toLowerCase();
	      transitionEnd = vendorMap[vendor]('TransitionEnd');
	      animationEnd = vendorMap[vendor]('AnimationEnd');
	      break;
	    }
	  }

	  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

	  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

	  style = null;

	  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
	}

/***/ }),
/* 160 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isTransform;
	var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

	function isTransform(property) {
	  return !!(property && supportedTransforms.test(property));
	}
	module.exports = exports["default"];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scrollTop;

	var _isWindow = __webpack_require__(149);

	var _isWindow2 = _interopRequireDefault(_isWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scrollTop(node, val) {
	  var win = (0, _isWindow2.default)(node);

	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	}
	module.exports = exports['default'];

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scrollTop;

	var _isWindow = __webpack_require__(149);

	var _isWindow2 = _interopRequireDefault(_isWindow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scrollTop(node, val) {
	  var win = (0, _isWindow2.default)(node);

	  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;

	  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
	}
	module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _contains = __webpack_require__(94);

	var _contains2 = _interopRequireDefault(_contains);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _addEventListener = __webpack_require__(164);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _ownerDocument = __webpack_require__(102);

	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var propTypes = {
	  onRootClose: _react.PropTypes.func,
	  children: _react.PropTypes.element,
	  /**
	   * 是否禁用
	   */
	  disabled: _react.PropTypes.bool,
	  /**
	   * 触发事件选择
	   */
	  event: _react.PropTypes.oneOf(['click', 'mousedown'])
	};

	var defaultProps = {
	  event: 'click'
	};

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	var RootCloseWrapper = function (_Component) {
	  _inherits(RootCloseWrapper, _Component);

	  function RootCloseWrapper(props, context) {
	    _classCallCheck(this, RootCloseWrapper);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.handleMouseCapture = function (e) {
	      _this.preventMouseRootClose = isModifiedEvent(e) || !isLeftClickEvent(e) || (0, _contains2["default"])(_reactDom2["default"].findDOMNode(_this), e.target);
	    };

	    _this.handleMouse = function () {
	      if (!_this.preventMouseRootClose && _this.props.onRootClose) {
	        _this.props.onRootClose();
	      }
	    };

	    _this.handleKeyUp = function (e) {
	      if (e.keyCode === 27 && _this.props.onRootClose) {
	        _this.props.onRootClose();
	      }
	    };

	    _this.preventMouseRootClose = false;

	    _this.addEventListeners = _this.addEventListeners.bind(_this);
	    _this.removeEventListeners = _this.removeEventListeners.bind(_this);

	    return _this;
	  }

	  RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
	    if (!this.props.disabled) {
	      this.addEventListeners();
	    }
	  };

	  RootCloseWrapper.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    if (!this.props.disabled && prevProps.disabled) {
	      this.addEventListeners();
	    } else if (this.props.disabled && !prevProps.disabled) {
	      this.removeEventListeners();
	    }
	  };

	  RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (!this.props.disabled) {
	      this.removeEventListeners();
	    }
	  };

	  RootCloseWrapper.prototype.addEventListeners = function addEventListeners() {
	    var event = this.props.event;

	    var doc = (0, _ownerDocument2["default"])(this);

	    // 避免react的监听事件触发引起判断的不准确
	    this.documentMouseCaptureListener = (0, _addEventListener2["default"])(doc, event, this.handleMouseCapture, true);

	    this.documentMouseListener = (0, _addEventListener2["default"])(doc, event, this.handleMouse);

	    this.documentKeyupListener = (0, _addEventListener2["default"])(doc, 'keyup', this.handleKeyUp);
	  };

	  RootCloseWrapper.prototype.removeEventListeners = function removeEventListeners() {
	    if (this.documentMouseCaptureListener) {
	      this.documentMouseCaptureListener.remove();
	    }

	    if (this.documentMouseListener) {
	      this.documentMouseListener.remove();
	    }

	    if (this.documentKeyupListener) {
	      this.documentKeyupListener.remove();
	    }
	  };

	  RootCloseWrapper.prototype.render = function render() {
	    return this.props.children;
	  };

	  return RootCloseWrapper;
	}(_react.Component);

	RootCloseWrapper.propTypes = propTypes;

	RootCloseWrapper.defaultProps = defaultProps;

	exports["default"] = RootCloseWrapper;
	module.exports = exports['default'];

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (node, event, handler, capture) {
	  (0, _on2["default"])(node, event, handler, capture);

	  return {
	    remove: function remove() {
	      (0, _off2["default"])(node, event, handler, capture);
	    }
	  };
	};

	var _on = __webpack_require__(165);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(166);

	var _off2 = _interopRequireDefault(_off);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	module.exports = exports['default'];

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _inDOM = __webpack_require__(95);

	var _inDOM2 = _interopRequireDefault(_inDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var on = function on() {};
	if (_inDOM2.default) {
	  on = function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, function (e) {
	        e = e || window.event;
	        e.target = e.target || e.srcElement;
	        e.currentTarget = node;
	        handler.call(node, e);
	      });
	    };
	  }();
	}

	exports.default = on;
	module.exports = exports['default'];

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _inDOM = __webpack_require__(95);

	var _inDOM2 = _interopRequireDefault(_inDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var off = function off() {};
	if (_inDOM2.default) {
	  off = function () {
	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  }();
	}

	exports.default = off;
	module.exports = exports['default'];

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _classnames = __webpack_require__(99);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Transition = __webpack_require__(168);

	var _Transition2 = _interopRequireDefault(_Transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var propTypes = {
	  /**
	   * Show the component; triggers the fade in or fade out animation
	   */
	  "in": _react2["default"].PropTypes.bool,

	  /**
	   * Unmount the component (remove it from the DOM) when it is faded out
	   */
	  unmountOnExit: _react2["default"].PropTypes.bool,

	  /**
	   * Run the fade in animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2["default"].PropTypes.bool,

	  /**
	   * Duration of the fade animation in milliseconds, to ensure that finishing
	   * callbacks are fired even if the original browser transition end events are
	   * canceled
	   */
	  timeout: _react2["default"].PropTypes.number,

	  /**
	   * Callback fired before the component fades in
	   */
	  onEnter: _react2["default"].PropTypes.func,
	  /**
	   * Callback fired after the component starts to fade in
	   */
	  onEntering: _react2["default"].PropTypes.func,
	  /**
	   * Callback fired after the has component faded in
	   */
	  onEntered: _react2["default"].PropTypes.func,
	  /**
	   * Callback fired before the component fades out
	   */
	  onExit: _react2["default"].PropTypes.func,
	  /**
	   * Callback fired after the component starts to fade out
	   */
	  onExiting: _react2["default"].PropTypes.func,
	  /**
	   * Callback fired after the component has faded out
	   */
	  onExited: _react2["default"].PropTypes.func
	};

	var defaultProps = {
	  "in": false,
	  timeout: 300,
	  unmountOnExit: false,
	  transitionAppear: false
	};

	var Fade = function (_React$Component) {
	  _inherits(Fade, _React$Component);

	  function Fade() {
	    _classCallCheck(this, Fade);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Fade.prototype.render = function render() {
	    return _react2["default"].createElement(_Transition2["default"], _extends({}, this.props, {
	      className: (0, _classnames2["default"])(this.props.className, 'fade'),
	      enteredClassName: 'in',
	      enteringClassName: 'in'
	    }));
	  };

	  return Fade;
	}(_react2["default"].Component);

	Fade.propTypes = propTypes;
	Fade.defaultProps = defaultProps;

	exports["default"] = Fade;
	module.exports = exports['default'];

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _properties = __webpack_require__(169);

	var _properties2 = _interopRequireDefault(_properties);

	var _on = __webpack_require__(171);

	var _on2 = _interopRequireDefault(_on);

	var _classnames = __webpack_require__(99);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var transitionEndEvent = _properties2["default"].end;

	//设置状态码
	var UNMOUNTED = exports.UNMOUNTED = 0;
	var EXITED = exports.EXITED = 1;
	var ENTERING = exports.ENTERING = 2;
	var ENTERED = exports.ENTERED = 3;
	var EXITING = exports.EXITING = 4;

	var propTypes = {
	  /**
	   * 是否触发动画
	   */
	  "in": _react.PropTypes.bool,

	  /**
	   * 不显示的时候是否移除组件
	   */
	  unmountOnExit: _react.PropTypes.bool,

	  /**
	   * 如果设置为默认显示，挂载时显示动画
	   */
	  transitionAppear: _react.PropTypes.bool,

	  /**
	   * 设置超时时间，防止出现问题，可设置为>=动画时间
	   */
	  timeout: _react.PropTypes.number,

	  /**
	   * 退出组件时添加的class
	   */
	  exitedClassName: _react.PropTypes.string,
	  /**
	   * 退出组件中添加的class
	   */
	  exitingClassName: _react.PropTypes.string,
	  /**
	   * 进入动画后添加的class
	   */
	  enteredClassName: _react.PropTypes.string,
	  /**
	   * 进入动画时添加的class
	   */
	  enteringClassName: _react.PropTypes.string,

	  /**
	   * 进入动画开始时的钩子函数
	   */
	  onEnter: _react.PropTypes.func,
	  /**
	   * 进入动画中的钩子函数
	   */
	  onEntering: _react.PropTypes.func,
	  /**
	   * 进入动画后的钩子函数
	   */
	  onEntered: _react.PropTypes.func,
	  /**
	   * 退出动画开始时的钩子函数
	   */
	  onExit: _react.PropTypes.func,
	  /**
	   * 退出动画中的钩子函数
	   */
	  onExiting: _react.PropTypes.func,
	  /**
	   * 退出动画后的钩子函数
	   */
	  onExited: _react.PropTypes.func
	};

	function noop() {}

	var defaultProps = {
	  "in": false,
	  unmountOnExit: false,
	  transitionAppear: false,
	  timeout: 5000,
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};

	/**
	 * 动画组件
	 */

	var Transition = function (_Component) {
	  _inherits(Transition, _Component);

	  function Transition(props, context) {
	    _classCallCheck(this, Transition);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    var initialStatus = void 0;
	    if (props["in"]) {
	      // 在componentdidmount时开始执行动画
	      initialStatus = props.transitionAppear ? EXITED : ENTERED;
	    } else {
	      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
	    }
	    _this.state = { status: initialStatus };

	    _this.nextCallback = null;
	    return _this;
	  }

	  Transition.prototype.componentDidMount = function componentDidMount() {
	    if (this.props.transitionAppear && this.props["in"]) {
	      this.performEnter(this.props);
	    }
	  };

	  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps["in"] && this.props.unmountOnExit) {
	      if (this.state.status === UNMOUNTED) {
	        // 在componentDidUpdate执行动画.
	        this.setState({ status: EXITED });
	      }
	    } else {
	      this._needsUpdate = true;
	    }
	  };

	  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
	    var status = this.state.status;

	    if (this.props.unmountOnExit && status === EXITED) {
	      // 当使用unmountOnExit时，exited为exiting和unmont的过渡状态
	      if (this.props["in"]) {
	        this.performEnter(this.props);
	      } else {
	        this.setState({ status: UNMOUNTED });
	      }

	      return;
	    }

	    // 确保只响应prop变化
	    if (this._needsUpdate) {
	      this._needsUpdate = false;

	      if (this.props["in"]) {
	        if (status === EXITING) {
	          this.performEnter(this.props);
	        } else if (status === EXITED) {
	          this.performEnter(this.props);
	        }
	        // 其他，当我们已经输入或输出
	      } else {
	        if (status === ENTERING || status === ENTERED) {
	          this.performExit(this.props);
	        }
	        // 我们已经输入或输出完成
	      }
	    }
	  };

	  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.cancelNextCallback();
	  };

	  Transition.prototype.performEnter = function performEnter(props) {
	    var _this2 = this;

	    this.cancelNextCallback();
	    var node = _reactDom2["default"].findDOMNode(this);

	    // 这里接收新props
	    props.onEnter(node);

	    this.safeSetState({ status: ENTERING }, function () {
	      _this2.props.onEntering(node);

	      _this2.onTransitionEnd(node, function () {
	        _this2.safeSetState({ status: ENTERED }, function () {
	          _this2.props.onEntered(node);
	        });
	      });
	    });
	  };

	  Transition.prototype.performExit = function performExit(props) {
	    var _this3 = this;

	    this.cancelNextCallback();
	    var node = _reactDom2["default"].findDOMNode(this);

	    props.onExit(node);

	    this.safeSetState({ status: EXITING }, function () {
	      _this3.props.onExiting(node);

	      _this3.onTransitionEnd(node, function () {
	        _this3.safeSetState({ status: EXITED }, function () {
	          _this3.props.onExited(node);
	        });
	      });
	    });
	  };

	  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
	    if (this.nextCallback !== null) {
	      this.nextCallback.cancel();
	      this.nextCallback = null;
	    }
	  };

	  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
	    // 确保在组件销毁后挂起的setState被消除
	    this.setState(nextState, this.setNextCallback(callback));
	  };

	  Transition.prototype.setNextCallback = function setNextCallback(callback) {
	    var _this4 = this;

	    var active = true;

	    this.nextCallback = function (event) {
	      if (active) {
	        active = false;
	        _this4.nextCallback = null;

	        callback(event);
	      }
	    };

	    this.nextCallback.cancel = function () {
	      active = false;
	    };

	    return this.nextCallback;
	  };

	  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, handler) {
	    this.setNextCallback(handler);

	    if (node) {
	      if (transitionEndEvent == undefined) {
	        this.nextCallback();
	      } else {
	        (0, _on2["default"])(node, transitionEndEvent, this.nextCallback);
	      }
	      setTimeout(this.nextCallback, this.props.timeout);
	    } else {
	      setTimeout(this.nextCallback, 0);
	    }
	  };

	  Transition.prototype.render = function render() {
	    var status = this.state.status;
	    if (status === UNMOUNTED) {
	      return null;
	    }

	    var _props = this.props;
	    var children = _props.children;
	    var className = _props.className;

	    var childProps = _objectWithoutProperties(_props, ['children', 'className']);

	    Object.keys(Transition.propTypes).forEach(function (key) {
	      return delete childProps[key];
	    });

	    var transitionClassName = void 0;
	    if (status === EXITED) {
	      transitionClassName = this.props.exitedClassName;
	    } else if (status === ENTERING) {
	      transitionClassName = this.props.enteringClassName;
	    } else if (status === ENTERED) {
	      transitionClassName = this.props.enteredClassName;
	    } else if (status === EXITING) {
	      transitionClassName = this.props.exitingClassName;
	    }

	    var child = _react2["default"].Children.only(children);
	    return _react2["default"].cloneElement(child, _extends({}, childProps, {
	      className: (0, _classnames2["default"])(child.props.className, className, transitionClassName)
	    }));
	  };

	  return Transition;
	}(_react.Component);

	Transition.propTypes = propTypes;

	Transition.defaultProps = defaultProps;

	exports["default"] = Transition;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

	var _inDOM = __webpack_require__(170);

	var _inDOM2 = _interopRequireDefault(_inDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var transform = 'transform';
	var prefix = void 0,
	    transitionEnd = void 0;
	var transitionTiming = void 0,
	    transitionDuration = void 0;
	var transitionProperty = void 0,
	    transitionDelay = void 0;

	if (_inDOM2.default) {
	  var _getTransitionPropert = getTransitionProperties();

	  prefix = _getTransitionPropert.prefix;
	  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;


	  exports.transform = transform = prefix + '-' + transform;
	  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
	  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
	  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
	  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';
	}

	exports.transform = transform;
	exports.transitionProperty = transitionProperty;
	exports.transitionTiming = transitionTiming;
	exports.transitionDelay = transitionDelay;
	exports.transitionDuration = transitionDuration;
	exports.transitionEnd = transitionEnd;
	exports.default = {
	  transform: transform,
	  end: transitionEnd,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};


	function getTransitionProperties() {
	  var transitionEnd = void 0;
	  var prefix = '';
	  var eventNames = {
	    O: 'otransitionend',
	    Moz: 'transitionend',
	    Webkit: 'webkitTransitionEnd',
	    ms: 'MSTransitionEnd'
	  };

	  var element = document.createElement('div');
	  for (var vendor in eventNames) {
	    if (eventNames.hasOwnProperty(vendor)) {
	      if (element.style[vendor + 'TransitionProperty'] !== undefined) {
	        prefix = '-' + vendor.toLowerCase();
	        transitionEnd = eventNames[vendor];
	        break;
	      }
	    }
	  }if (!transitionEnd && element.style.transitionProperty !== undefined) transitionEnd = 'transitionend';

	  element = null;

	  return { transitionEnd: transitionEnd, prefix: prefix };
	}

/***/ }),
/* 170 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	module.exports = exports['default'];

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _inDOM = __webpack_require__(170);

	var _inDOM2 = _interopRequireDefault(_inDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var on = function on() {};
	if (_inDOM2.default) {
	  on = function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  }();
	}

	exports.default = on;
	module.exports = exports['default'];

/***/ }),
/* 172 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }

	    if (acc === null) {
	      return f;
	    }

	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}

	exports["default"] = createChainedFunction;
	module.exports = exports['default'];

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.load = load;
	exports.select = select;
	exports.save = save;
	exports.remove = remove;
	exports.setRawCookie = setRawCookie;
	exports.plugToRequest = plugToRequest;

	var _cookie = __webpack_require__(174);

	var _cookie2 = _interopRequireDefault(_cookie);

	var _objectAssign = __webpack_require__(124);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _isNode = __webpack_require__(175);

	var _isNode2 = _interopRequireDefault(_isNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _rawCookie = {};
	var _res = undefined;

	function _isResWritable() {
	  return _res && !_res.headersSent;
	}

	function load(name, doNotParse, opt) {
	  var cookies = _isNode2.default ? _rawCookie : _cookie2.default.parse(document.cookie, opt);
	  var cookieVal = cookies && cookies[name];

	  if (typeof doNotParse === 'undefined') {
	    doNotParse = !cookieVal || cookieVal[0] !== '{' && cookieVal[0] !== '[';
	  }

	  if (!doNotParse) {
	    try {
	      cookieVal = JSON.parse(cookieVal);
	    } catch (e) {
	      // Not serialized object
	    }
	  }

	  return cookieVal;
	}

	function select(regex) {
	  var cookies = _isNode2.default ? _rawCookie : _cookie2.default.parse(document.cookie);

	  if (!cookies) {
	    return {};
	  }

	  if (!regex) {
	    return cookies;
	  }

	  return Object.keys(cookies).reduce(function (accumulator, name) {
	    if (!regex.test(name)) {
	      return accumulator;
	    }

	    var newCookie = {};
	    newCookie[name] = cookies[name];
	    return (0, _objectAssign2.default)({}, accumulator, newCookie);
	  }, {});
	}

	function save(name, val, opt) {
	  _rawCookie[name] = val;

	  // allow you to work with cookies as objects.
	  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	    _rawCookie[name] = JSON.stringify(val);
	  }

	  // Cookies only work in the browser
	  if (!_isNode2.default) {
	    document.cookie = _cookie2.default.serialize(name, _rawCookie[name], opt);
	  }

	  if (_isResWritable() && _res.cookie) {
	    var expressOpt = _extends({}, opt);
	    if (expressOpt.maxAge) {
	      // the standard for maxAge is seconds but express uses milliseconds
	      expressOpt.maxAge = opt.maxAge * 1000;
	    }

	    _res.cookie(name, val, opt);
	  }
	}

	function remove(name, opt) {
	  delete _rawCookie[name];

	  if (typeof opt === 'undefined') {
	    opt = {};
	  } else if (typeof opt === 'string') {
	    // Will be deprecated in future versions
	    opt = { path: opt };
	  } else {
	    // Prevent mutation of opt below
	    opt = (0, _objectAssign2.default)({}, opt);
	  }

	  if (typeof document !== 'undefined') {
	    opt.expires = new Date(1970, 1, 1, 0, 0, 1);
	    opt.maxAge = 0;
	    document.cookie = _cookie2.default.serialize(name, '', opt);
	  }

	  if (_isResWritable() && _res.clearCookie) {
	    _res.clearCookie(name, opt);
	  }
	}

	function setRawCookie(rawCookie) {
	  if (rawCookie) {
	    _rawCookie = _cookie2.default.parse(rawCookie);
	  } else {
	    _rawCookie = {};
	  }
	}

	function plugToRequest(req, res) {
	  if (req.cookie) {
	    _rawCookie = req.cookie;
	  } else if (req.cookies) {
	    _rawCookie = req.cookies;
	  } else if (req.headers && req.headers.cookie) {
	    setRawCookie(req.headers.cookie);
	  } else {
	    _rawCookie = {};
	  }

	  _res = res;

	  return function unplug() {
	    _res = null;
	    _rawCookie = {};
	  };
	}

	exports.default = {
	  setRawCookie: setRawCookie,
	  load: load,
	  select: select,
	  save: save,
	  remove: remove,
	  plugToRequest: plugToRequest
	};

/***/ }),
/* 174 */
/***/ (function(module, exports) {

	/*!
	 * cookie
	 * Copyright(c) 2012-2014 Roman Shtylman
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module exports.
	 * @public
	 */

	exports.parse = parse;
	exports.serialize = serialize;

	/**
	 * Module variables.
	 * @private
	 */

	var decode = decodeURIComponent;
	var encode = encodeURIComponent;
	var pairSplitRegExp = /; */;

	/**
	 * RegExp to match field-content in RFC 7230 sec 3.2
	 *
	 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
	 * field-vchar   = VCHAR / obs-text
	 * obs-text      = %x80-FF
	 */

	var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 *
	 * @param {string} str
	 * @param {object} [options]
	 * @return {object}
	 * @public
	 */

	function parse(str, options) {
	  if (typeof str !== 'string') {
	    throw new TypeError('argument str must be a string');
	  }

	  var obj = {}
	  var opt = options || {};
	  var pairs = str.split(pairSplitRegExp);
	  var dec = opt.decode || decode;

	  for (var i = 0; i < pairs.length; i++) {
	    var pair = pairs[i];
	    var eq_idx = pair.indexOf('=');

	    // skip things that don't look like key=value
	    if (eq_idx < 0) {
	      continue;
	    }

	    var key = pair.substr(0, eq_idx).trim()
	    var val = pair.substr(++eq_idx, pair.length).trim();

	    // quoted values
	    if ('"' == val[0]) {
	      val = val.slice(1, -1);
	    }

	    // only assign once
	    if (undefined == obj[key]) {
	      obj[key] = tryDecode(val, dec);
	    }
	  }

	  return obj;
	}

	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize the a name value pair into a cookie string suitable for
	 * http headers. An optional options object specified cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 *
	 * @param {string} name
	 * @param {string} val
	 * @param {object} [options]
	 * @return {string}
	 * @public
	 */

	function serialize(name, val, options) {
	  var opt = options || {};
	  var enc = opt.encode || encode;

	  if (typeof enc !== 'function') {
	    throw new TypeError('option encode is invalid');
	  }

	  if (!fieldContentRegExp.test(name)) {
	    throw new TypeError('argument name is invalid');
	  }

	  var value = enc(val);

	  if (value && !fieldContentRegExp.test(value)) {
	    throw new TypeError('argument val is invalid');
	  }

	  var str = name + '=' + value;

	  if (null != opt.maxAge) {
	    var maxAge = opt.maxAge - 0;
	    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
	    str += '; Max-Age=' + Math.floor(maxAge);
	  }

	  if (opt.domain) {
	    if (!fieldContentRegExp.test(opt.domain)) {
	      throw new TypeError('option domain is invalid');
	    }

	    str += '; Domain=' + opt.domain;
	  }

	  if (opt.path) {
	    if (!fieldContentRegExp.test(opt.path)) {
	      throw new TypeError('option path is invalid');
	    }

	    str += '; Path=' + opt.path;
	  }

	  if (opt.expires) {
	    if (typeof opt.expires.toUTCString !== 'function') {
	      throw new TypeError('option expires is invalid');
	    }

	    str += '; Expires=' + opt.expires.toUTCString();
	  }

	  if (opt.httpOnly) {
	    str += '; HttpOnly';
	  }

	  if (opt.secure) {
	    str += '; Secure';
	  }

	  if (opt.sameSite) {
	    var sameSite = typeof opt.sameSite === 'string'
	      ? opt.sameSite.toLowerCase() : opt.sameSite;

	    switch (sameSite) {
	      case true:
	        str += '; SameSite=Strict';
	        break;
	      case 'lax':
	        str += '; SameSite=Lax';
	        break;
	      case 'strict':
	        str += '; SameSite=Strict';
	        break;
	      default:
	        throw new TypeError('option sameSite is invalid');
	    }
	  }

	  return str;
	}

	/**
	 * Try decoding a string using a decoding function.
	 *
	 * @param {string} str
	 * @param {function} decode
	 * @private
	 */

	function tryDecode(str, decode) {
	  try {
	    return decode(str);
	  } catch (e) {
	    return str;
	  }
	}


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
	'use strict';

	exports = module.exports = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)))

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(7);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(32);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(33);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(37);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _tinperBee = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by yuzhao on 2017/5/31.
	 */

	var Tab = function (_Component) {
	    (0, _inherits3.default)(Tab, _Component);

	    function Tab(props) {
	        (0, _classCallCheck3.default)(this, Tab);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this, props));

	        var self = _this;

	        var value = typeof sessionStorage['tabNotice'] == 'undefined' ? true : sessionStorage['tabNotice'];

	        _this.state = {
	            menus: props.menus,
	            current: props.current,
	            tabNum: props.menus.length,
	            tabNotice: JSON.parse(value)
	        };

	        _this.setCurrent = _this.setCurrent.bind(_this);
	        _this.del = _this.del.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(Tab, [{
	        key: 'setCurrent',
	        value: function setCurrent(id) {
	            this.props.setCurrent(id);
	        }
	    }, {
	        key: 'del',
	        value: function del(id) {

	            var menu = this.state.menus;
	            var current = this.state.current;

	            var num = 0;
	            for (var i = 0; i < menu.length; i++) {
	                if (id == menu[i].id) {
	                    menu.splice(i, 1);
	                    num = i - 1;
	                }
	            }

	            var data = {
	                menus: menu

	                //删除选中的tab时
	            };if (current == id) {
	                data.current = menu[num].id;
	                data.router = menu[num].router;

	                var match = /^((ht|f)tps?):\/\/.*(\/#\/ifr)/ig;

	                //window.router.dispatch('on', data.router.replace(match,'\/ifr'));

	                //window.location.hash = data.router.replace(match,'#\/ifr')
	            }

	            var ifr = document.getElementById(id);

	            if (ifr.contentWindow.confirmClose && typeof ifr.contentWindow.confirmClose == 'function') {
	                ifr.contentWindow.confirmClose(id, data);
	                return false;
	            }

	            this.setState({
	                tabNum: menu.length
	            });

	            this.props.del(data);

	            return menu;
	        }
	    }, {
	        key: 'notice',
	        value: function notice() {
	            var value = this.state.tabNotice;

	            sessionStorage['tabNotice'] = !value;

	            this.setState({
	                tabNotice: !value
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({ current: nextProps.current, menus: nextProps.menus, tabNum: nextProps.menus.length });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var self = this;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { id: 'portalTabs', className: "tabs ui-tabs-num-" + this.state.tabNum },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'tabs-list-box' },
	                        _react2.default.createElement(
	                            'ul',
	                            { className: 'tabs-list' },
	                            self.state.menus.map(function (item, index) {

	                                var delIcon = index == 0 ? '' : _react2.default.createElement('i', { onClick: self.del.bind(this, item.id), className: 'iconfont icon-cancel02 x-close', key: item.router });

	                                var selected = self.state.current == item.id ? 'selected' : '';

	                                return _react2.default.createElement(
	                                    'li',
	                                    { className: selected },
	                                    _react2.default.createElement(
	                                        'a',
	                                        { onClick: self.setCurrent.bind(this, item.id), href: 'javascript:;', title: item.title },
	                                        item.title
	                                    ),
	                                    delIcon
	                                );
	                            })
	                        )
	                    )
	                ),
	                self.state.menus.length >= 10 && self.state.tabNotice ? _react2.default.createElement(
	                    'div',
	                    { className: 'portalTabs-message' },
	                    _react2.default.createElement(
	                        'p',
	                        null,
	                        _react2.default.createElement('i', { className: 'uf uf-exc-c' }),
	                        ' \u62B1\u6B49\uFF0C\u9875\u9762\u6700\u591A\u5C55\u793A10\u4E2A\u7A97\u53E3\uFF01'
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { onClick: this.notice.bind(this) },
	                        '\u4E0D\u518D\u663E\u793A'
	                    )
	                ) : null
	            );
	        }
	    }]);
	    return Tab;
	}(_react.Component);

	exports.default = Tab;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(7);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(32);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(33);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(37);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(84);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _tinperBee = __webpack_require__(92);

	var _axios = __webpack_require__(178);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = _tinperBee.Navbar.Menu; /**
	                                    * Created by yuzhao on 2017/6/7.
	                                    */

	var UserMenus = function (_Component) {
	    (0, _inherits3.default)(UserMenus, _Component);

	    function UserMenus(props) {
	        (0, _classCallCheck3.default)(this, UserMenus);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (UserMenus.__proto__ || (0, _getPrototypeOf2.default)(UserMenus)).call(this, props));

	        var self = _this;

	        _this.state = {
	            userMenus: []
	        };

	        return _this;
	    }

	    (0, _createClass3.default)(UserMenus, [{
	        key: 'formmaterUrl',
	        value: function formmaterUrl(item) {
	            var uri = " ";
	            if (item.urlType === 'url') {
	                var target = item.openview == "blank" ? "_blank" : "";
	                if (target) {
	                    uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.url));
	                } else {
	                    uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.url));
	                }
	                return uri;
	            } else if (item.urlType === 'plugin') {
	                uri = item.code ? '#/' + item.code : "#/index_plugin";
	                //window.registerRouter(uri.replace("#", ""), item.location);

	                uri = encodeURIComponent(encodeURIComponent('index-view.html' + uri));
	                return uri;
	            } else if (item.urlType === 'view') {
	                uri = item.code;

	                uri = uri.replace("#", "/");

	                // if(uri[0]=='/'){
	                //     uri = "/sidebar"+uri;
	                // }else{
	                //     uri = "/sidebar/"+uri;
	                // }
	                // window.addRouter(uri);
	                // return  "#"+uri;

	                return encodeURIComponent(encodeURIComponent('index-view.html#' + uri));
	            } else if (item.urlType == undefined) {
	                item.code = '404';
	                return '#/ifr/' + encodeURIComponent(encodeURIComponent(item.code));
	            } else {
	                return item.code;
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var self = this;
	            //
	            _axios2.default.get(contextRoot + '/moreMenu/list?r=' + Math.random()).then(function (res) {
	                if (res.data.status == 1) {
	                    self.setState({
	                        userMenus: res.data.data
	                    });
	                }
	            }).catch(function (err) {
	                console.log(err);
	            });
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            var obj = this.refs[e.key];
	            if (e.key == 'logout') return false;
	            this.props.handleClick(e, {
	                title: obj.title,
	                router: obj.href
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var self = this;

	            return _react2.default.createElement(
	                Menu,
	                { onClick: function onClick(e) {
	                        return self.handleClick(e);
	                    }, className: 'dropdown-menus', style: { width: '100%' }, mode: 'inline' },
	                self.state.userMenus.map(function (item) {
	                    var value = {
	                        title: item.name,
	                        router: self.formmaterUrl(item)
	                    };
	                    return _react2.default.createElement(
	                        Menu.Item,
	                        { key: item.code },
	                        _react2.default.createElement(
	                            'a',
	                            { ref: item.code, onClick: function onClick(e) {
	                                    return self.props.handleDefault(e);
	                                }, title: item.name, href: self.formmaterUrl(item) },
	                            _react2.default.createElement('i', { className: item.icon }),
	                            item.name
	                        )
	                    );
	                }),
	                _react2.default.createElement(
	                    Menu.Item,
	                    { key: 'logout' },
	                    _react2.default.createElement(
	                        'a',
	                        { ref: 'setting3', href: 'user/beflogout' },
	                        _react2.default.createElement('i', { 'aria-hidden': 'true', className: 'iconfont  icon-logout' }),
	                        ' \u6CE8\u9500'
	                    )
	                )
	            );
	        }
	    }]);
	    return UserMenus;
	}(_react.Component);

	exports.default = UserMenus;

/***/ }),
/* 178 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_178__;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _director = __webpack_require__(180);

	window.router = new _director.Router();

	function designClickFn() {
	    var str = '<div class="modal-dialog modal-center"><div class="modal-content"><div class="modal-header"><button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button><h4 class="modal-title">编辑小部件</h4></div><div class="modal-body"><div class="site-items list-unstyled"><div class="widget-create-edit"><div class="panel-body"><form  class="widget-form" ><div id="editModal" class="margin-bottom-15"></div><div id="errorMessage"></div><div class="modal-footer"><button class="u-button u-button-info font-size-14" data-type="save" type="button" id="modelSave" style="height: 36px;">保存</button><button data-dismiss="modal" class="u-button margin-left-10 font-size-14" type="button" style="height: 36px;border: 1px solid #cecece;">取消</button></div></form></div></div></div></div></div></div>';
	    $('#modalBlue').html(str);
	}
	designClickFn();

	var routeInit = function routeInit(p) {
	    return function () {
	        var module = p;
	        var content = document.getElementById("content");
	        requirejs([module], function (module) {
	            if (typeof ko != "undefined") ko.cleanNode(content);
	            content.innerHTML = "";
	            module.init(content);
	        });
	    };
	};
	var initLayout = function initLayout(p, params) {
	    var module = p;
	    var load = window.require;
	    requirejs.undef(module);
	    if (params.length == 1) params = params[0];
	    load([module], function (module) {
	        $('#content').html('');
	        module.init(params);
	    });
	};

	//注册路由
	window.registerRouter = function (id, path) {
	    router.on(id, routeInit(path));
	};
	window.addRouter = function (path, func) {
	    var pos = path.indexOf('/:');
	    var truePath = path;
	    if (pos != -1) truePath = path.substring(0, pos);
	    func = func || function () {
	        var params = arguments;
	        initLayout(contextRoot + '/data:layout' + truePath, params);
	    };
	    var tmparray = truePath.split("/");
	    if (tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
	        return;
	    } else {
	        router.on(path, func);
	    }
	};

	router.on('/widget', function () {
	    var widget = __webpack_require__(181);
	    widget.init();
	});
	//布局站点管理
	router.on('/layouts', function () {
	    var sites = __webpack_require__(185);
	    sites.init();
	});

	//布局模板管理
	router.on('/layout/template', function (id, viewid) {
	    var layout = __webpack_require__(188);
	    layout.init();
	});
	router.on('/design', function () {
	    var id = getParamUrl('lid', $('.unsortable').attr('data-ul'));
	    var version = $('#content').attr('v');
	    $('#content').attr('identity', 'normal');
	    var layout = __webpack_require__(190);
	    var param = {
	        id: id,
	        element: 'designerContent',
	        modifytime: decodeURIComponent(version),
	        router: id
	    };
	    layout.init(param);
	    designClickFn();
	});
	//设计器
	router.on('/layout/:id/:modifytime/back/:router', function (id, modifytime, router) {
	    var layout = __webpack_require__(190);
	    var param = {
	        id: id,
	        element: 'designerContent',
	        modifytime: decodeURIComponent(modifytime),
	        router: router
	    };
	    layout.init(param);
	    designClickFn();
	});

	router.on('after', '/layout/:id/:modifytime/back/:router', function (id, modifytime, router) {
	    $('.modal-backdrop').fadeOut(function () {
	        $(this).remove();
	    });
	});

	router.on('/home/:viewid', function (viewid) {
	    initLayout(contextRoot + "/data:layout/" + viewid, []);
	});

	router.on('/layout/:id/:viewid', function (id, viewid) {
	    var layout = __webpack_require__(190);
	    var param = {
	        id: id,
	        viewid: viewid
	    };
	    layout.init(param);
	    designClickFn();
	});

	router.on('/sidebar/:id/:viewid', function (id, viewid) {
	    var layout = __webpack_require__(190);
	    var param = {
	        id: id,
	        viewid: viewid
	    };
	    layout.init(param);
	});

	router.on('/ifr/:id', function (id) {

	    var ctn = document.getElementById("content");
	    ctn.innerHTML = '';
	    var ifr = document.createElement("iframe");
	    ifr.setAttribute("allowtransparency", true);
	    ifr.src = decodeURIComponent(decodeURIComponent(id));
	    ifr.style.width = '100%';
	    ifr.style.border = 'none';
	    ctn.appendChild(ifr);
	    var autodiv = $(ifr);

	    function autoH() {
	        var addh = $(window).height() - 55;
	        autodiv.height(addh);
	    }
	    autoH();
	    if (autodiv) {
	        autodiv.css({ overflow: "auto" });
	        $(window).resize(function () {
	            autoH();
	        });
	    }
	});
	router.on('/ifrNoHead/:id', function (id) {
	    var ctn = document.body;
	    ctn.innerHTML = '';
	    var ifr = document.createElement("iframe");
	    ifr.setAttribute("allowtransparency", true);
	    ifr.src = decodeURIComponent(decodeURIComponent(id));
	    ifr.style.width = '100%';
	    ifr.style.border = 'none';
	    ctn.appendChild(ifr);
	    var autodiv = $(ifr);

	    function autoH() {
	        var addh = $(window).height() - 55;
	        autodiv.height(addh);
	    }
	    autoH();
	    if (autodiv) {
	        autodiv.css({ overflow: "auto" });
	        $(window).resize(function () {
	            autoH();
	        });
	    }
	});

	router.on('/userMapping/relevance/:systemCode', function (systemCode) {
	    var userMapping = __webpack_require__(195);
	    userMapping.init(systemCode, document.getElementById('content'));
	});

	module.exports = router;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	

	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//

	(function (exports) {

	/*
	 * browser.js: Browser specific functionality for director.
	 *
	 * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
	 * MIT LICENSE
	 *
	 */

	var dloc = document.location;

	function dlocHashEmpty() {
	  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
	  // assumes both mean empty.
	  return dloc.hash === '' || dloc.hash === '#';
	}

	var listener = {
	  mode: 'modern',
	  hash: dloc.hash,
	  history: false,

	  check: function () {
	    var h = dloc.hash;
	    if (h != this.hash) {
	      this.hash = h;
	      this.onHashChanged();
	    }
	  },

	  fire: function () {
	    if (this.mode === 'modern') {
	      this.history === true ? window.onpopstate() : window.onhashchange();
	    }
	    else {
	      this.onHashChanged();
	    }
	  },

	  init: function (fn, history) {
	    var self = this;
	    this.history = history;

	    if (!Router.listeners) {
	      Router.listeners = [];
	    }

	    function onchange(onChangeEvent) {
	      for (var i = 0, l = Router.listeners.length; i < l; i++) {
	        Router.listeners[i](onChangeEvent);
	      }
	    }

	    //note IE8 is being counted as 'modern' because it has the hashchange event
	    if ('onhashchange' in window && (document.documentMode === undefined
	      || document.documentMode > 7)) {
	      // At least for now HTML5 history is available for 'modern' browsers only
	      if (this.history === true) {
	        // There is an old bug in Chrome that causes onpopstate to fire even
	        // upon initial page load. Since the handler is run manually in init(),
	        // this would cause Chrome to run it twise. Currently the only
	        // workaround seems to be to set the handler after the initial page load
	        // http://code.google.com/p/chromium/issues/detail?id=63040
	        setTimeout(function() {
	          window.onpopstate = onchange;
	        }, 500);
	      }
	      else {
	        window.onhashchange = onchange;
	      }
	      this.mode = 'modern';
	    }
	    else {
	      //
	      // IE support, based on a concept by Erik Arvidson ...
	      //
	      var frame = document.createElement('iframe');
	      frame.id = 'state-frame';
	      frame.style.display = 'none';
	      document.body.appendChild(frame);
	      this.writeFrame('');

	      if ('onpropertychange' in document && 'attachEvent' in document) {
	        document.attachEvent('onpropertychange', function () {
	          if (event.propertyName === 'location') {
	            self.check();
	          }
	        });
	      }

	      window.setInterval(function () { self.check(); }, 50);

	      this.onHashChanged = onchange;
	      this.mode = 'legacy';
	    }

	    Router.listeners.push(fn);

	    return this.mode;
	  },

	  destroy: function (fn) {
	    if (!Router || !Router.listeners) {
	      return;
	    }

	    var listeners = Router.listeners;

	    for (var i = listeners.length - 1; i >= 0; i--) {
	      if (listeners[i] === fn) {
	        listeners.splice(i, 1);
	      }
	    }
	  },

	  setHash: function (s) {
	    // Mozilla always adds an entry to the history
	    if (this.mode === 'legacy') {
	      this.writeFrame(s);
	    }

	    if (this.history === true) {
	      window.history.pushState({}, document.title, s);
	      // Fire an onpopstate event manually since pushing does not obviously
	      // trigger the pop event.
	      this.fire();
	    } else {
	      dloc.hash = (s[0] === '/') ? s : '/' + s;
	    }
	    return this;
	  },

	  writeFrame: function (s) {
	    // IE support...
	    var f = document.getElementById('state-frame');
	    var d = f.contentDocument || f.contentWindow.document;
	    d.open();
	    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
	    d.close();
	  },

	  syncHash: function () {
	    // IE support...
	    var s = this._hash;
	    if (s != dloc.hash) {
	      dloc.hash = s;
	    }
	    return this;
	  },

	  onHashChanged: function () {}
	};

	var Router = exports.Router = function (routes) {
	  if (!(this instanceof Router)) return new Router(routes);

	  this.params   = {};
	  this.routes   = {};
	  this.methods  = ['on', 'once', 'after', 'before'];
	  this.scope    = [];
	  this._methods = {};

	  this._insert = this.insert;
	  this.insert = this.insertEx;

	  this.historySupport = (window.history != null ? window.history.pushState : null) != null

	  this.configure();
	  this.mount(routes || {});
	};

	Router.prototype.init = function (r) {
	  var self = this
	    , routeTo;
	  this.handler = function(onChangeEvent) {
	    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
	    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
	    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
	  };

	  listener.init(this.handler, this.history);

	  if (this.history === false) {
	    if (dlocHashEmpty() && r) {
	      dloc.hash = r;
	    } else if (!dlocHashEmpty()) {
	      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
	    }
	  }
	  else {
	    if (this.convert_hash_in_init) {
	      // Use hash as route
	      routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
	      if (routeTo) {
	        window.history.replaceState({}, document.title, routeTo);
	      }
	    }
	    else {
	      // Use canonical url
	      routeTo = this.getPath();
	    }

	    // Router has been initialized, but due to the chrome bug it will not
	    // yet actually route HTML5 history state changes. Thus, decide if should route.
	    if (routeTo || this.run_in_init === true) {
	      this.handler();
	    }
	  }

	  return this;
	};

	Router.prototype.explode = function () {
	  var v = this.history === true ? this.getPath() : dloc.hash;
	  if (v.charAt(1) === '/') { v=v.slice(1) }
	  return v.slice(1, v.length).split("/");
	};

	Router.prototype.setRoute = function (i, v, val) {
	  var url = this.explode();

	  if (typeof i === 'number' && typeof v === 'string') {
	    url[i] = v;
	  }
	  else if (typeof val === 'string') {
	    url.splice(i, v, s);
	  }
	  else {
	    url = [i];
	  }

	  listener.setHash(url.join('/'));
	  return url;
	};

	//
	// ### function insertEx(method, path, route, parent)
	// #### @method {string} Method to insert the specific `route`.
	// #### @path {Array} Parsed path to insert the `route` at.
	// #### @route {Array|function} Route handlers to insert.
	// #### @parent {Object} **Optional** Parent "routes" to insert into.
	// insert a callback that will only occur once per the matched route.
	//
	Router.prototype.insertEx = function(method, path, route, parent) {
	  if (method === "once") {
	    method = "on";
	    route = function(route) {
	      var once = false;
	      return function() {
	        if (once) return;
	        once = true;
	        return route.apply(this, arguments);
	      };
	    }(route);
	  }
	  return this._insert(method, path, route, parent);
	};

	Router.prototype.getRoute = function (v) {
	  var ret = v;

	  if (typeof v === "number") {
	    ret = this.explode()[v];
	  }
	  else if (typeof v === "string"){
	    var h = this.explode();
	    ret = h.indexOf(v);
	  }
	  else {
	    ret = this.explode();
	  }

	  return ret;
	};

	Router.prototype.destroy = function () {
	  listener.destroy(this.handler);
	  return this;
	};

	Router.prototype.getPath = function () {
	  var path = window.location.pathname;
	  if (path.substr(0, 1) !== '/') {
	    path = '/' + path;
	  }
	  return path;
	};
	function _every(arr, iterator) {
	  for (var i = 0; i < arr.length; i += 1) {
	    if (iterator(arr[i], i, arr) === false) {
	      return;
	    }
	  }
	}

	function _flatten(arr) {
	  var flat = [];
	  for (var i = 0, n = arr.length; i < n; i++) {
	    flat = flat.concat(arr[i]);
	  }
	  return flat;
	}

	function _asyncEverySeries(arr, iterator, callback) {
	  if (!arr.length) {
	    return callback();
	  }
	  var completed = 0;
	  (function iterate() {
	    iterator(arr[completed], function(err) {
	      if (err || err === false) {
	        callback(err);
	        callback = function() {};
	      } else {
	        completed += 1;
	        if (completed === arr.length) {
	          callback();
	        } else {
	          iterate();
	        }
	      }
	    });
	  })();
	}

	function paramifyString(str, params, mod) {
	  mod = str;
	  for (var param in params) {
	    if (params.hasOwnProperty(param)) {
	      mod = params[param](str);
	      if (mod !== str) {
	        break;
	      }
	    }
	  }
	  return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
	}

	function regifyString(str, params) {
	  var matches, last = 0, out = "";
	  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
	    last = matches.index + matches[0].length;
	    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
	    out += str.substr(0, matches.index) + matches[0];
	  }
	  str = out += str.substr(last);
	  var captures = str.match(/:([^\/]+)/ig), capture, length;
	  if (captures) {
	    length = captures.length;
	    for (var i = 0; i < length; i++) {
	      capture = captures[i];
	      if (capture.slice(0, 2) === "::") {
	        str = capture.slice(1);
	      } else {
	        str = str.replace(capture, paramifyString(capture, params));
	      }
	    }
	  }
	  return str;
	}

	function terminator(routes, delimiter, start, stop) {
	  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
	  for (i = 0; i < routes.length; i++) {
	    var chunk = routes[i];
	    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
	      left = chunk.indexOf(start, last);
	      right = chunk.indexOf(stop, last);
	      if (~left && !~right || !~left && ~right) {
	        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
	        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
	      }
	      last = (right > left ? right : left) + 1;
	      i = 0;
	    } else {
	      last = 0;
	    }
	  }
	  return routes;
	}

	var QUERY_SEPARATOR = /\?.*/;

	Router.prototype.configure = function(options) {
	  options = options || {};
	  for (var i = 0; i < this.methods.length; i++) {
	    this._methods[this.methods[i]] = true;
	  }
	  this.recurse = options.recurse || this.recurse || false;
	  this.async = options.async || false;
	  this.delimiter = options.delimiter || "/";
	  this.strict = typeof options.strict === "undefined" ? true : options.strict;
	  this.notfound = options.notfound;
	  this.resource = options.resource;
	  this.history = options.html5history && this.historySupport || false;
	  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
	  this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
	  this.every = {
	    after: options.after || null,
	    before: options.before || null,
	    on: options.on || null
	  };
	  return this;
	};

	Router.prototype.param = function(token, matcher) {
	  if (token[0] !== ":") {
	    token = ":" + token;
	  }
	  var compiled = new RegExp(token, "g");
	  this.params[token] = function(str) {
	    return str.replace(compiled, matcher.source || matcher);
	  };
	  return this;
	};

	Router.prototype.on = Router.prototype.route = function(method, path, route) {
	  var self = this;
	  if (!route && typeof path == "function") {
	    route = path;
	    path = method;
	    method = "on";
	  }
	  if (Array.isArray(path)) {
	    return path.forEach(function(p) {
	      self.on(method, p, route);
	    });
	  }
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  if (Array.isArray(method)) {
	    return method.forEach(function(m) {
	      self.on(m.toLowerCase(), path, route);
	    });
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.insert(method, this.scope.concat(path), route);
	};

	Router.prototype.path = function(path, routesFn) {
	  var self = this, length = this.scope.length;
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.scope = this.scope.concat(path);
	  routesFn.call(this, this);
	  this.scope.splice(length, path.length);
	};

	Router.prototype.dispatch = function(method, path, callback) {
	  var self = this, fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""), invoked = this._invoked, after;
	  this._invoked = true;
	  if (!fns || fns.length === 0) {
	    this.last = [];
	    if (typeof this.notfound === "function") {
	      this.invoke([ this.notfound ], {
	        method: method,
	        path: path
	      }, callback);
	    }
	    return false;
	  }
	  if (this.recurse === "forward") {
	    fns = fns.reverse();
	  }
	  function updateAndInvoke() {
	    self.last = fns.after;
	    self.invoke(self.runlist(fns), self, callback);
	  }
	  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
	  if (after && after.length > 0 && invoked) {
	    if (this.async) {
	      this.invoke(after, this, updateAndInvoke);
	    } else {
	      this.invoke(after, this);
	      updateAndInvoke();
	    }
	    return true;
	  }
	  updateAndInvoke();
	  return true;
	};

	Router.prototype.invoke = function(fns, thisArg, callback) {
	  var self = this;
	  var apply;
	  if (this.async) {
	    apply = function(fn, next) {
	      if (Array.isArray(fn)) {
	        return _asyncEverySeries(fn, apply, next);
	      } else if (typeof fn == "function") {
	        fn.apply(thisArg, (fns.captures || []).concat(next));
	      }
	    };
	    _asyncEverySeries(fns, apply, function() {
	      if (callback) {
	        callback.apply(thisArg, arguments);
	      }
	    });
	  } else {
	    apply = function(fn) {
	      if (Array.isArray(fn)) {
	        return _every(fn, apply);
	      } else if (typeof fn === "function") {
	        return fn.apply(thisArg, fns.captures || []);
	      } else if (typeof fn === "string" && self.resource) {
	        self.resource[fn].apply(thisArg, fns.captures || []);
	      }
	    };
	    _every(fns, apply);
	  }
	};

	Router.prototype.traverse = function(method, path, routes, regexp, filter) {
	  var fns = [], current, exact, match, next, that;
	  function filterRoutes(routes) {
	    if (!filter) {
	      return routes;
	    }
	    function deepCopy(source) {
	      var result = [];
	      for (var i = 0; i < source.length; i++) {
	        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
	      }
	      return result;
	    }
	    function applyFilter(fns) {
	      for (var i = fns.length - 1; i >= 0; i--) {
	        if (Array.isArray(fns[i])) {
	          applyFilter(fns[i]);
	          if (fns[i].length === 0) {
	            fns.splice(i, 1);
	          }
	        } else {
	          if (!filter(fns[i])) {
	            fns.splice(i, 1);
	          }
	        }
	      }
	    }
	    var newRoutes = deepCopy(routes);
	    newRoutes.matched = routes.matched;
	    newRoutes.captures = routes.captures;
	    newRoutes.after = routes.after.filter(filter);
	    applyFilter(newRoutes);
	    return newRoutes;
	  }
	  if (path === this.delimiter && routes[method]) {
	    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
	    next.after = [ routes.after ].filter(Boolean);
	    next.matched = true;
	    next.captures = [];
	    return filterRoutes(next);
	  }
	  for (var r in routes) {
	    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
	      current = exact = regexp + this.delimiter + r;
	      if (!this.strict) {
	        exact += "[" + this.delimiter + "]?";
	      }
	      match = path.match(new RegExp("^" + exact));
	      if (!match) {
	        continue;
	      }
	      if (match[0] && match[0] == path && routes[r][method]) {
	        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
	        next.after = [ routes[r].after ].filter(Boolean);
	        next.matched = true;
	        next.captures = match.slice(1);
	        if (this.recurse && routes === this.routes) {
	          next.push([ routes.before, routes.on ].filter(Boolean));
	          next.after = next.after.concat([ routes.after ].filter(Boolean));
	        }
	        return filterRoutes(next);
	      }
	      next = this.traverse(method, path, routes[r], current);
	      if (next.matched) {
	        if (next.length > 0) {
	          fns = fns.concat(next);
	        }
	        if (this.recurse) {
	          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
	          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
	          if (routes === this.routes) {
	            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
	            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
	          }
	        }
	        fns.matched = true;
	        fns.captures = next.captures;
	        fns.after = next.after;
	        return filterRoutes(fns);
	      }
	    }
	  }
	  return false;
	};

	Router.prototype.insert = function(method, path, route, parent) {
	  var methodType, parentType, isArray, nested, part;
	  path = path.filter(function(p) {
	    return p && p.length > 0;
	  });
	  parent = parent || this.routes;
	  part = path.shift();
	  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
	    part = regifyString(part, this.params);
	  }
	  if (path.length > 0) {
	    parent[part] = parent[part] || {};
	    return this.insert(method, path, route, parent[part]);
	  }
	  if (!part && !path.length && parent === this.routes) {
	    methodType = typeof parent[method];
	    switch (methodType) {
	     case "function":
	      parent[method] = [ parent[method], route ];
	      return;
	     case "object":
	      parent[method].push(route);
	      return;
	     case "undefined":
	      parent[method] = route;
	      return;
	    }
	    return;
	  }
	  parentType = typeof parent[part];
	  isArray = Array.isArray(parent[part]);
	  if (parent[part] && !isArray && parentType == "object") {
	    methodType = typeof parent[part][method];
	    switch (methodType) {
	     case "function":
	      parent[part][method] = [ parent[part][method], route ];
	      return;
	     case "object":
	      parent[part][method].push(route);
	      return;
	     case "undefined":
	      parent[part][method] = route;
	      return;
	    }
	  } else if (parentType == "undefined") {
	    nested = {};
	    nested[method] = route;
	    parent[part] = nested;
	    return;
	  }
	  throw new Error("Invalid route context: " + parentType);
	};



	Router.prototype.extend = function(methods) {
	  var self = this, len = methods.length, i;
	  function extend(method) {
	    self._methods[method] = true;
	    self[method] = function() {
	      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
	      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
	    };
	  }
	  for (i = 0; i < len; i++) {
	    extend(methods[i]);
	  }
	};

	Router.prototype.runlist = function(fns) {
	  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
	  if (this.every && this.every.on) {
	    runlist.push(this.every.on);
	  }
	  runlist.captures = fns.captures;
	  runlist.source = fns.source;
	  return runlist;
	};

	Router.prototype.mount = function(routes, path) {
	  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
	    return;
	  }
	  var self = this;
	  path = path || [];
	  if (!Array.isArray(path)) {
	    path = path.split(self.delimiter);
	  }
	  function insertOrMount(route, local) {
	    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
	    if (isRoute) {
	      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
	      parts.shift();
	    }
	    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
	      local = local.concat(parts);
	      self.mount(routes[route], local);
	      return;
	    }
	    if (isRoute) {
	      local = local.concat(rename.split(self.delimiter));
	      local = terminator(local, self.delimiter);
	    }
	    self.insert(event, local, routes[route]);
	  }
	  for (var route in routes) {
	    if (routes.hasOwnProperty(route)) {
	      insertOrMount(route, path.slice(0));
	    }
	  }
	};



	}( true ? exports : window));

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by chief on 2015/10/21.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var template = __webpack_require__(182);
	    var minlayout = __webpack_require__(183);

	    var init = function init(options) {
	        var options = $.extend({}, options);
	        $(function () {

	            var url = contextRoot + '/widget/query?random=' + Math.random();

	            function getCatels(value) {
	                var value = value || '';
	                $.ptAjax({
	                    url: contextRoot + "/widget/catels",
	                    dataType: 'json',
	                    type: 'get',
	                    contentType: 'application/json',
	                    success: function success(res) {
	                        if (res.status == '1') {
	                            if (res.data && res.data.length) {
	                                var data = res.data;
	                                var str = [];
	                                $.each(data, function (i, item) {
	                                    str.push('<option ' + (item.id == value ? "selected" : "") + ' value="' + item.id + '">' + item.name + '</option>');
	                                });
	                                $('.category-list').html(str.join(''));
	                            }
	                        }
	                    },
	                    error: function error(XMLHttpRequest) {
	                        errorLogin(XMLHttpRequest);
	                    }
	                });
	            }

	            function getWidgets(url) {
	                $.ajax({
	                    url: url,
	                    dataType: 'json',
	                    type: 'post',
	                    contentType: 'application/json',
	                    success: function success(res) {
	                        var str = [];

	                        var render = template.compile(minlayout);
	                        var html = render({ list: res.data, backUrl: options.backUrl });
	                        function setScrollTop(scroll_top) {
	                            document.body.scrollTop = scroll_top;
	                            window.pageYOffset = scroll_top;
	                            document.documentElement.scrollTop = scroll_top;
	                        }
	                        setScrollTop(0);
	                        $('#content').html(html);

	                        var ipad = navigator.userAgent.indexOf("iPad");

	                        if (ipad != -1) {
	                            $('#widgetList .icon-pencil').hide();
	                            $('#widgetList .icons-l').removeClass('icons-l');
	                        }

	                        $('#widget-form input').placeholder();

	                        //$("#widget-list").append(str.join(''));
	                        $('.widget-content').data("list", res);

	                        getCatels();

	                        $('.wtype').on('change', function () {
	                            edit($(this));
	                        });

	                        $('#widgetList').on('focus', 'input', function () {
	                            $(this).closest('form').find('#errorMessage').html('');
	                        });

	                        $('#examplePositionCenter').on('hidden.bs.modal', function () {
	                            init(options);
	                        });

	                        $('#widgetList').on('click', '#widget-create,#edit-widget,#copy-widget', function (e) {
	                            e.preventDefault();
	                            var data = {};
	                            var element = $(this).closest('.site-items').find('.form-control');
	                            $.each(element, function (i, item) {
	                                var key = $(item).attr("name");
	                                var value = $(item).val();
	                                data[key] = value;
	                            });
	                            data = (0, _stringify2.default)(data);
	                            var _this = this;

	                            function checkForm() {
	                                var fields = $(_this).closest('form').find('.field:visible');
	                                var success = false;
	                                $.each(fields, function (i, item) {
	                                    var input = $(item).next();
	                                    if ($.trim(input.val()) == "") {
	                                        $(_this).closest('form').find('#errorMessage').html('请填写必填项！');
	                                        success = true;
	                                        return false;
	                                    }
	                                });
	                                return success;
	                            }

	                            if (checkForm()) {
	                                return false;
	                            }

	                            var url = contextRoot + '/widget/save';
	                            if ($(this).attr('id') == 'edit-widget') {
	                                var id = $('#examplePositionCenter').data('id');
	                                url = contextRoot + '/widget/save/' + id;
	                            }
	                            /* else if($(this).attr('id')=='copy-widget'){
	                                 url = contextRoot+'/widget/save';
	                             }*/
	                            $.ptAjax({
	                                url: url,
	                                dataType: 'json',
	                                data: data,
	                                type: 'post',
	                                contentType: 'application/json',
	                                success: function success(res) {
	                                    if (res.status == '0') {
	                                        alert(res.message);
	                                        return false;
	                                    } else {
	                                        $('.page-header-actions').removeClass('open');

	                                        if ($(_this).attr('id') == 'edit-widget') {
	                                            $('#widget-body input').val('');
	                                            $('#examplePositionCenter').modal('hide');
	                                            return false;
	                                        } else if ($(_this).attr('id') == 'copy-widget') {
	                                            alert('克隆成功');
	                                            $('#copy-body input').val('');
	                                            $('#copy').modal('hide');
	                                            init(options);
	                                            $('.modal-backdrop.fade.in').hide();
	                                            return false;
	                                        } else {
	                                            alert('提交成功');
	                                            init(options);
	                                        }
	                                    }
	                                    //location.reload(true);
	                                },
	                                error: function error(XMLHttpRequest) {
	                                    errorLogin(XMLHttpRequest);
	                                }
	                            });
	                        });

	                        $('#widgetDel .btn-del').click(function () {
	                            var _this = this;
	                            var id = $(this).attr("data-id");
	                            var data = { id: id };
	                            data = (0, _stringify2.default)(data);
	                            $.ptAjax({
	                                url: contextRoot + "/widget/delete/" + id,
	                                dataType: 'json',
	                                type: 'get',
	                                contentType: 'application/json',
	                                success: function success(res) {
	                                    if (res.status == "0") {
	                                        $('#widgetDel').modal('hide');
	                                        alert(res.message);
	                                        return false;
	                                    } else {
	                                        $('#widgetDel').on('hidden.bs.modal', function () {
	                                            init(options);
	                                        });
	                                        $('#widgetDel').modal('hide');
	                                    }

	                                    //$(_this).closest('.col-md-3').remove();
	                                },
	                                error: function error(XMLHttpRequest) {
	                                    errorLogin(XMLHttpRequest);
	                                }
	                            });
	                        });

	                        $('.widget-del').on('click', function () {
	                            var _this = this;
	                            var id = $(this).attr("data-id");
	                            $('#widgetDel').modal('show');
	                            $('#widgetDel .btn-del').attr('data-id', id);
	                        });

	                        function edit(element) {
	                            var _this = element;
	                            var val = $(_this).val();
	                            var parent = $(_this).closest('.site-items');

	                            if (val == 'htmlfragment') {
	                                parent.find('.wtype-url,.wtype-xml,.wtype-js').addClass('hide');
	                                parent.find('.wtype-html').removeClass('hide');
	                            } else if (val.search(/(url)/) != -1) {
	                                parent.find('.wtype-html,.wtype-xml,.wtype-js').addClass('hide');
	                                parent.find('.wtype-url').removeClass('hide');
	                            } else if (val.search(/(xml)/) != -1) {
	                                parent.find('.wtype-html,.wtype-url,.wtype-js').addClass('hide');
	                                parent.find('.wtype-xml').removeClass('hide').find('.control-label').text(val);
	                            } else if (val.search(/(js)/) != -1) {
	                                parent.find('.wtype-html,.wtype-url,.wtype-xml').addClass('hide');
	                                parent.find('.wtype-js').removeClass('hide').find('.control-label').text(val);
	                            }
	                        }

	                        $('.widget-edit').on('click', function () {
	                            var _this = this;
	                            var data = $(".widget-content").data("list");

	                            var createwidget = __webpack_require__(184);

	                            var pkWidget = $(this).attr("data-id");
	                            var items = {};

	                            $.each(data.data, function (i, item) {
	                                if (item.pkWidget == pkWidget) {
	                                    items = item;
	                                }
	                            });

	                            $('#examplePositionCenter').data('id', items.id);

	                            var render = template.compile(createwidget);
	                            var html = render({ item: items });

	                            $('.widget-edit-body').html(html);

	                            $('#examplePositionCenter input').placeholder();

	                            getCatels(items.category);
	                            //$('#widget-body').html(str);
	                            $('#examplePositionCenter .wtype').on('change', function () {
	                                edit($(this));
	                            });
	                            $('.wtype-url').show().find('.control-label').text($('#wtype').val());
	                        });
	                        $('.widget-copy').on('click', function () {
	                            var _this = this;
	                            var data = $(".widget-content").data("list");

	                            var createwidget = __webpack_require__(184);

	                            var pkWidget = $(this).attr("data-id");
	                            var items = {};

	                            $.each(data.data, function (i, item) {
	                                if (item.pkWidget == pkWidget) {
	                                    items = item;
	                                }
	                            });

	                            $('#copy').data('id', items.id);

	                            var render = template.compile(createwidget);
	                            var html = render({ item: items });

	                            $('.widget-edit-body').html(html);
	                            $('input[name="code"]').removeAttr('disabled');
	                            $('select[name="wtype"]').attr('disabled', true);
	                            $('input[name="url"]').attr('disabled', true);
	                            $('input[name="xml"]').attr('disabled', true);
	                            $('textarea[name="htmlfragment"]').attr('disabled', true);
	                            $('button[id="edit-widget"]').attr('id', 'copy-widget');
	                            $('#copy input').placeholder();

	                            getCatels(items.category);
	                            //$('#widget-body').html(str);
	                            $('#copy .wtype').on('change', function () {
	                                edit($(this));
	                            });
	                            $('.wtype-url').show().find('.control-label').text($('#wtype').val());
	                        });
	                        $('#copy').find('.close').on('click', function () {
	                            $('select[name="wtype"]').removeAttr('disabled');
	                            $('input[name="url"]').removeAttr('disabled');
	                            $('input[name="xml"]').removeAttr('disabled');
	                            $('textarea[name="htmlfragment"]').removeAttr('disabled');
	                        });
	                        $('#copy').on('click', function (e) {
	                            if ($(e.target).hasClass('btn')) {
	                                $('select[name="wtype"]').removeAttr('disabled');
	                                $('input[name="url"]').removeAttr('disabled');
	                                $('input[name="xml"]').removeAttr('disabled');
	                                $('textarea[name="htmlfragment"]').removeAttr('disabled');
	                            }
	                        });
	                    }
	                });
	            }
	            getWidgets(url);
	        });
	    };

	    return {
	        init: init
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof2 = __webpack_require__(38);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
	!function () {
	  function a(a) {
	    return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y);
	  }function b(a) {
	    return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
	  }function c(c, d) {
	    function e(a) {
	      return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a;
	    }function f(b) {
	      var c = m;if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function () {
	        return m++, "$line=" + m + ";";
	      })), 0 === b.indexOf("=")) {
	        var e = l && !/^=[=#]/.test(b);if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
	          var f = b.replace(/\s*\([^\)]+\)/, "");n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")");
	        } else b = "$string(" + b + ")";b = s[1] + b + s[2];
	      }return g && (b = "$line=" + c + ";" + b), r(a(b), function (a) {
	        if (a && !p[a]) {
	          var b;b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0;
	        }
	      }), b + "\n";
	    }var g = d.debug,
	        h = d.openTag,
	        i = d.closeTag,
	        j = d.parser,
	        k = d.compress,
	        l = d.escape,
	        m = 1,
	        p = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 },
	        q = "".trim,
	        s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
	        t = q ? "$out+=text;return $out;" : "$out.push(text);",
	        u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
	        v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
	        w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
	        x = s[0],
	        y = "return new String(" + s[3] + ");";r(c.split(h), function (a) {
	      a = a.split(i);var b = a[0],
	          c = a[1];1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)));
	    });var z = w + x + y;g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try {
	      var A = new Function("$data", "$filename", z);return A.prototype = n, A;
	    } catch (B) {
	      throw B.temp = "function anonymous($data,$filename) {" + z + "}", B;
	    }
	  }var d = function d(a, b) {
	    return "string" == typeof b ? q(b, { filename: a }) : g(a, b);
	  };d.version = "3.0.0", d.config = function (a, b) {
	    e[a] = b;
	  };var e = d.defaults = { openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null },
	      f = d.cache = {};d.render = function (a, b) {
	    return q(a, b);
	  };var g = d.renderFile = function (a, b) {
	    var c = d.get(a) || p({ filename: a, name: "Render Error", message: "Template not found" });return b ? c(b) : c;
	  };d.get = function (a) {
	    var b;if (f[a]) b = f[a];else if ("object" == (typeof document === "undefined" ? "undefined" : (0, _typeof3.default)(document))) {
	      var c = document.getElementById(a);if (c) {
	        var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");b = q(d, { filename: a });
	      }
	    }return b;
	  };var h = function h(a, b) {
	    return "string" != typeof a && (b = typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a), "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a;
	  },
	      i = { "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;" },
	      j = function j(a) {
	    return i[a];
	  },
	      k = function k(a) {
	    return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j);
	  },
	      l = Array.isArray || function (a) {
	    return "[object Array]" === {}.toString.call(a);
	  },
	      m = function m(a, b) {
	    var c, d;if (l(a)) for (c = 0, d = a.length; d > c; c++) {
	      b.call(a, a[c], c, a);
	    } else for (c in a) {
	      b.call(a, a[c], c);
	    }
	  },
	      n = d.utils = { $helpers: {}, $include: g, $string: h, $escape: k, $each: m };d.helper = function (a, b) {
	    o[a] = b;
	  };var o = d.helpers = n.$helpers;d.onerror = function (a) {
	    var b = "Template Error\n\n";for (var c in a) {
	      b += "<" + c + ">\n" + a[c] + "\n\n";
	    }"object" == (typeof console === "undefined" ? "undefined" : (0, _typeof3.default)(console)) && console.error(b);
	  };var p = function p(a) {
	    return d.onerror(a), function () {
	      return "{Template Error}";
	    };
	  },
	      q = d.compile = function (a, b) {
	    function d(c) {
	      try {
	        return new i(c, h) + "";
	      } catch (d) {
	        return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c));
	      }
	    }b = b || {};for (var g in e) {
	      void 0 === b[g] && (b[g] = e[g]);
	    }var h = b.filename;try {
	      var i = c(a, b);
	    } catch (j) {
	      return j.filename = h || "anonymous", j.name = "Syntax Error", p(j);
	    }return d.prototype = i.prototype, d.toString = function () {
	      return i.toString();
	    }, h && b.cache && (f[h] = d), d;
	  },
	      r = n.$each,
	      s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
	      t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
	      u = /[^\w$]+/g,
	      v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
	      w = /^\d[^,]*|,\d[^,]*/g,
	      x = /^,+|,+$/g,
	      y = /^$|,+/;e.openTag = "{{", e.closeTag = "}}";var z = function z(a, b) {
	    var c = b.split(":"),
	        d = c.shift(),
	        e = c.join(":") || "";return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")";
	  };e.parser = function (a) {
	    a = a.replace(/^\s/, "");var b = a.split(" "),
	        c = b.shift(),
	        e = b.join(" ");switch (c) {case "if":
	        a = "if(" + e + "){";break;case "else":
	        b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";break;case "/if":
	        a = "}";break;case "each":
	        var f = b[0] || "$data",
	            g = b[1] || "as",
	            h = b[2] || "$value",
	            i = b[3] || "$index",
	            j = h + "," + i;"as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";break;case "/each":
	        a = "});";break;case "echo":
	        a = "print(" + e + ");";break;case "print":case "include":
	        a = c + "(" + b.join(",") + ");";break;default:
	        if (/^\s*\|\s*[\w\$]/.test(e)) {
	          var k = !0;0 === a.indexOf("#") && (a = a.substr(1), k = !1);for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) {
	            o = z(o, m[l]);
	          }a = (k ? "=" : "=#") + o;
	        } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a;}return a;
	  },  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return d;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof exports ? module.exports = d : this.template = d;
	}();

/***/ }),
/* 183 */
/***/ (function(module, exports) {

	module.exports = "<div id=\"widgetList\">\n    <div class=\"page-header font-size-20 padding-bottom-20\">\n        <ol class=\"breadcrumb\">\n            <li class=\"page-title\" class=\"active\">小部件管理</li>\n        </ol>\n        <div class=\"page-header-actions dropdown\" style=\"z-index: 1\">\n            <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\"\n               data-toggle=\"dropdown\">\n                <button class=\"u-button u-button-info font-size-14\" type=\"button\">\n                    <span class=\"text hidden-xs\">创建小部件</span>\n                    <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\n                </button>\n            </a>\n            {{if backUrl }}\n            <a href=\"{{backUrl}}\" role=\"button\" class=\"\">\n                <button class=\"u-button btn-success btn-round btn-back font-size-14\" type=\"button\">\n                    <span class=\"text hidden-xs\">返回</span>\n                </button>\n            </a>\n            {{/if}}\n\n            <ul role=\"menu\" style=\"width:300px;\" class=\"dropdown-menu dropdown-menu-left dropdown-menu-media\">\n                <li role=\"presentation\" class=\"clearfix scrollable is-enabled scrollable-vertical\"\n                    style=\"position: relative\">\n                    <div data-role=\"container\" class=\"scrollable-container\">\n                        <div data-role=\"content\" class=\"scrollable-content\">\n                            <div id=\"widget-list\" class=\"site-items list-unstyled\">\n                                <div class=\"col-md-12 widget-create\">\n                                    <div class=\"panel-body\" id=\"widget-body\">\n                                        <form class=\"form-horizontal\" action=\"widget/save\" id=\"widget-form\">\n                                             <div class=\"form-inline\">\n                                                 <label class=\"control-label\">名称:</label>\n                                                 <span class=\"field\">*</span>\n                                                 <input type=\"text\" name=\"name\" placeholder=\"名称\" id=\"inputRounded\" class=\"form-control round\">\n                                             </div>\n                                              <div class=\"form-inline\">\n                                                  <label class=\"control-label\">编码:</label>\n                                                  <span class=\"field\">*</span>\n                                                  <input type=\"text\" name=\"code\" placeholder=\"编码\"  class=\"form-control round\">\n                                              </div>\n\n\n                                               <div class=\"form-inline\">\n                                                   <label class=\"control-label margin-right-10\">分类:</label>\n                                                   <select name=\"category\" class=\"form-control category-list round\">\n                                                       <option value=\"workbench\">工作台</option>\n                                                   </select>\n                                               </div>\n                                            <div class=\"form-inline\">\n                                                <label class=\"control-label margin-right-10\">类型:</label>\n                                                <select name=\"wtype\" class=\"form-control wtype round\">\n                                                    <option value=\"url\">url</option>\n                                                    <option value=\"xml\" selected=selected>xml</option>\n                                                    <option value=\"htmlfragment\">html片段</option>\n                                                    <option value=\"js\">js</option>\n                                                </select>\n                                            </div>\n                                             <div class=\"form-inline wtype-url hide\">\n                                                 <label class=\"control-label\">url</label>\n                                                 <span class=\"field\">*</span>\n                                                 <input type=\"text\" name=\"url\" placeholder=\"\" class=\"form-control round\"/>\n                                             </div>\n                                             <div class=\"form-inline wtype-xml\">\n                                                 <label class=\"control-label\">xml</label>\n                                                 <span class=\"field\">*</span>\n                                                 <input type=\"text\" name=\"xml\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\n                                             </div>\n                                             <div class=\"form-inline wtype-html hide\">\n                                                 <label class=\"control-label\">html片段</label>\n                                                 <span class=\"field\">*</span>\n                                                 <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\"\n                                               class=\"form-control\"></textarea>\n                                             </div>\n                                            <div class=\"form-inline wtype-js hide\">\n                                                <label class=\"control-label\">js</label>\n                                                <span class=\"field\">*</span>\n                                                <input type=\"text\" name=\"js\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\n                                            </div>\n                                            <div class=\"form-inline\">\n                                                <label class=\"control-label margin-right-10\">描述:</label>\n                                                <input type=\"text\" name=\"descr\" placeholder=\"描述\" class=\"form-control\">\n                                            </div>\n                                            <div class=\"form-inline text-left\">\n                                                <div id=\"errorMessage\"></div>\n                                            </div>\n                                            <div class=\"u-form-group width-full margin-bottom-0\" id=\"widgManBottom\">\n                                                <button id=\"widget-create\"\n                                                        class=\"u-button u-button-info margin-left-10 pull-right\">保存\n                                                </button>\n                                                <a href=\"javascript:void(0)\"\n                                                   class=\"u-button u-button-primary pull-right\" data-toggle=\"dropdown\"\n                                                   aria-expanded=\"false\">取消</a>\n                                            </div>\n                                        </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"scrollable-bar scrollable-bar-vertical scrollable-bar-hide\" draggable=\"false\">\n                        <div class=\"scrollable-bar-handle\" style=\"height: 30px;\"></div>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"page-content container-fluid\">\n        <div class=\"row\">\n            {{each list as item i}}\n            <div class=\"widget\">\n                <div class=\"widget-content padding-30 bg-white clearfix\">\n                    <div class=\"pull-left white icons-pull\">\n                        <i aria-hidden=\"true\" class=\"iconfont icon-component\"></i>\n                    </div>\n                    <div class=\"counter counter-md\">\n                        <div class=\"counter-number-group\">\n                            <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\n                        </div>\n                        <div class=\"counter-label text-capitalize font-size-16\"></div>\n                    </div>\n                </div>\n                <div class=\"widget-footer\">\n                    <div class=\"u-row\">\n                        <div class=\"u-col-4 text-center\">\n                            <div class=\"icons-button text-center icons-l\">\n                                <a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#examplePositionCenter\"\n                                   data-id=\"{{item.pkWidget}}\" class=\"widget-edit\" title=\"编辑\">\n                                    <i class=\"iconfont icon-pencil\"></i>\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"u-col-4 text-center\">\n                            <div class=\"icons-button text-center icons-l\">\n                                <a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#copy\"\n                                   data-id=\"{{item.pkWidget}}\" class=\"widget-copy\" title=\"克隆\">\n                                    <i class=\"iconfont icon-canvas\"></i>\n                                </a>\n                            </div>\n                        </div>\n                        <div class=\"u-col-4 text-center\">\n                            <div class=\"icons-button text-center\">\n                                <a href=\"javascript:;\" data-id=\"{{item.pkWidget}}\" class=\"widget-del\" title=\"删除\">\n                                    <i class=\"iconfont icon-delete\"></i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            {{/each}}\n\n        </div>\n    </div>\n    <!-- Modal -->\n    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"examplePositionCenter\" aria-hidden=\"true\"\n         id=\"examplePositionCenter\" class=\"modal fade\">\n        <div class=\"modal-dialog modal-center\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\">\n                        <span aria-hidden=\"true\">×</span>\n                    </button>\n                    <h4 class=\"modal-title\">编辑小部件</h4>\n                </div>\n                <div class=\"modal-body widget-edit-body\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- End Modal -->\n\n    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"copy\" aria-hidden=\"true\" id=\"copy\" class=\"modal fade\">\n        <div class=\"modal-dialog modal-center\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\">\n                        <span aria-hidden=\"true\">×</span>\n                    </button>\n                    <h4 class=\"modal-title\">克隆小部件</h4>\n                </div>\n                <div class=\"modal-body widget-edit-body\">\n                    <form action=\"widget/save\" class=\"widget-form\">\n                        <div class=\"form-inline\">\n                            <label class=\"control-label\">名称</label>\n                            <input type=\"text\" name=\"name\" value=\"我\" placeholder=\"名称\"\n                                   class=\"form-control inputRounded round\">\n                            <span class=\"field\">*</span>\n                        </div>\n                        <div class=\"form-inline\">\n                            <label class=\"control-label\">编码</label>\n                            <input type=\"text\" name=\"code\" placeholder=\"编码\" value=\"hde\" class=\"form-control round\">\n                            <span class=\"field\">*</span>\n                        </div>\n                        <div class=\"form-inline\">\n                            <label class=\"control-label\">分类</label>\n                            <select name=\"category\" class=\"form-control category-list round\">\n                                <option value=\"portal\">门户</option>\n                                <option selected=\"\" value=\"workbench\">工作台</option>\n                            </select>\n                        </div>\n                        <div class=\"form-inline\">\n                            <label class=\"control-label\">类型</label>\n                            <select name=\"wtype\" class=\"form-control wtype round\" disabled>\n                                <option selected=\"selected\" value=\"url\">url</option>\n                                <option value=\"xml\">xml</option>\n                                <option value=\"htmlfragment\">html片段</option>\n                            </select>\n                        </div>\n\n                        <div class=\"form-inline wtype-url  \">\n                            <label class=\"control-label\">url</label>\n                            <input disabled type=\"text\" name=\"url\" value=\"http://www.sohu.com\" placeholder=\"\"\n                                   class=\"form-control round\">\n                            <span class=\"field\">*</span>\n                        </div>\n\n                        <div class=\"form-inline wtype-xml hide \">\n                            <label class=\"control-label\">xml</label>\n                            <input type=\"text\" name=\"xml\" value=\"\" placeholder=\"/gadgets/xxx.xml\"\n                                   class=\"form-control round\">\n                            <span class=\"field\">*</span>\n                        </div>\n\n\n                        <div class=\"form-inline wtype-html hide\">\n                            <label class=\"control-label\">html片段</label>\n                            <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\"\n                                      class=\"form-control\"></textarea> <span class=\"field\">*</span>\n                        </div>\n                        <div class=\"form-inline\">\n                            <label class=\"control-label\">描述</label>\n                            <input type=\"text\" name=\"descr\" value=\"\" placeholder=\"描述\" class=\"form-control\">\n                        </div>\n                        <input type=\"hidden\" name=\"modifytime\" value=\"2016-06-23 14:48:50\" class=\"form-control\">\n                        <div id=\"errorMessage\"></div>\n                        <div class=\"modal-footer\">\n                            <button class=\"btn btn-primary\" id=\"copy-widget\" type=\"button\">保存</button>\n                            <button data-dismiss=\"modal\" class=\"btn btn-default\" type=\"button\">取消</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"widgetDel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\n         aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\" style=\"\">\n                    <button type=\"button\" class=\"close\" style=\"\" data-dismiss=\"modal\"\n                            aria-hidden=\"true\">&times;</button>\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">\n                        确认\n                    </h4>\n                </div>\n                <div class=\"modal-body\">\n                    您确认要删除小部件吗？\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"u-button u-button-info margin-right-10 btn-del\">确定</button>\n                    <button type=\"button\" class=\"u-button u-button-primary\" data-dismiss=\"modal\">取消</button>\n                </div>\n            </div><!-- /.modal-content -->\n        </div><!-- /.modal -->\n    </div>\n</div>    ";

/***/ }),
/* 184 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"site-items list-unstyled\">\n    <div class=\"widget-create-eidt\">\n        <div class=\"panel-body\">\n            <form action=\"widget/save\" class=\"widget-form\">\n                <div class=\"form-inline\">\n                    <label class=\"control-label\">名称:</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"name\" value=\"{{item.name}}\" placeholder=\"名称\" class=\"form-control inputRounded round\">\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label\">编码:</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"code\" placeholder=\"编码\" value=\"{{item.id}}\" class=\"form-control round\" disabled>\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label margin-right-10 \">分类:</label>\n                    <select name=\"category\" class=\"form-control category-list round\">\n                        <option value=\"workbench\">工作台</option>\n                    </select>\n                </div>\n                <div class=\"form-inline\">\n                    <label class=\"control-label margin-right-10\">类型:</label>\n                    <select name=\"wtype\" class=\"form-control wtype round\">\n                        <option {{ item.wtype=='url'?'selected=selected':'' }} value=\"url\">url</option>\n                        <option {{ item.wtype==\"xml\"?\"selected=selected\":\"\" }} value=\"xml\">xml</option>\n                        <option {{ item.wtype==\"htmlfragment\"?\"selected=selected\":\"\" }} value=\"htmlfragment\">html片段</option>\n                        <option {{ item.wtype==\"js\"?\"selected=selected\":\"\" }} value=\"js\">js</option>\n                    </select>\n                </div>\n\n                <div class=\"form-inline wtype-url {{if item.wtype!='url'}}hide{{/if}} \">\n                    <label class=\"control-label\">url</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"url\" value=\"{{if item.wtype=='url'}}{{item.cnf}}{{/if}}\" placeholder=\"\" class=\"form-control round\"/>\n\n                </div>\n\n                <div class=\"form-inline wtype-xml {{if item.wtype!='xml'}}hide{{/if}} \">\n                    <label class=\"control-label\">xml</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"xml\" value=\"{{if item.wtype=='xml'}}{{item.url}}{{/if}}\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\n\n                </div>\n\n\n                <div class=\"form-inline wtype-html {{if item.wtype!='htmlfragment'}}hide{{/if}}\" >\n                    <label class=\"control-label\">html片段</label>\n                     <span class=\"field\">*</span>\n                     <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\" class=\"form-control\">{{if item.wtype==\"htmlfragment\"}}{{item.cnf}}{{/if}}</textarea>\n                </div>\n\n                <div class=\"form-inline wtype-js {{if item.wtype!='js'}}hide{{/if}} \">\n                    <label class=\"control-label\">js</label>\n                    <span class=\"field\">*</span>\n                    <input type=\"text\" name=\"js\" value=\"{{if item.wtype=='js'}}{{item.cnf}}{{/if}}\" placeholder=\"/gadgets/xxx.js\" class=\"form-control round\"/>\n                </div>\n\n                <div class=\"form-inline\">\n                    <label class=\"control-label margin-right-10\">描述:</label>\n                    <input type=\"text\" name=\"descr\" value=\"{{item.descr}}\" placeholder=\"描述\" class=\"form-control\">\n                </div>\n                <input type=\"hidden\" name=\"modifytime\" value=\"{{item.modifytime}}\" class=\"form-control\"/>\n                <div id=\"errorMessage\"></div>\n\n                <div class=\" modal-footer u-form-group width-full \" id=\"editWidBottom\">\n                    <button data-dismiss=\"modal\"\n                            class=\"u-button u-button-primary pull-right margin-left-10\">取消\n                    </button>\n                    <button id=\"edit-widget\"\n                            class=\"u-button u-button-info margin-left-10 pull-right\">保存\n                    </button>\n                </div>\n\n\n        </form>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sites = __webpack_require__(186);
	var art = __webpack_require__(182);

	var init = function f() {
	    function loadData(key, pageIndex, pageSize) {
	        pageIndex = pageIndex || '0';
	        pageSize = pageSize || '10';
	        var method = 'get';
	        var url = contextRoot + '/layout/list?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&random=' + Math.random();
	        var data = '';
	        if (key) {
	            method = 'post';
	            url = contextRoot + '/layout/query';
	            var obj = { "val": key };
	            data = (0, _stringify2.default)(obj);
	        }
	        $.ptAjax({
	            url: url,
	            dataType: 'json',
	            type: method,
	            data: data,
	            contentType: 'application/json',
	            success: function success(res) {
	                var datas = [];
	                if (res.status == '1') {
	                    if (res.data && res.data.content && res.data.content.length) {
	                        for (var i = 0; i < res.data.content.length; i++) {
	                            if (res.data.content[i].modifytime) {
	                                res.data.content[i].modifytime = encodeURIComponent(res.data.content[i].modifytime);
	                            }
	                            if (res.data.content[i].isenable) {
	                                res.data.content[i].isenable = res.data.content[i].isenable == 'N' ? '否' : '是';
	                            }
	                        }
	                        datas = res.data.content;
	                    }
	                    var data = { list: datas };
	                    var render = art.compile(sites);
	                    var html = render(data);
	                    $('#content').html(html);

	                    $('#layoutList input').placeholder();

	                    var ipad = navigator.userAgent.indexOf("iPad");

	                    if (ipad != -1 || getBrowserVersion() == 'IE8') {
	                        $('#site-save-open').hide();
	                        $('.page-content .icon-pencil').hide();
	                        $('.page-content .icons-l').removeClass('icons-l');
	                    }
	                    eventInit();
	                    var page = document.getElementById('layoutPage');
	                    var comp = new u.pagination({ el: page, jumppage: true });
	                    comp.update({ totalPages: res.data.totalPages, pageSize: res.data.size, currentPage: pageIndex ? pageIndex + 1 : '1', totalCount: res.data.totalElements });

	                    comp.on('pageChange', function (pageIndex) {
	                        loadData($('#searchBtn').prev().val(), pageIndex);
	                    });
	                    comp.on('sizeChange', function (pageSize) {
	                        loadData($('#searchBtn').prev().val(), 0, pageSize);
	                    });
	                } else {
	                    alert(res.message);
	                }
	            },
	            error: function error(XMLHttpRequest) {
	                errorLogin(XMLHttpRequest);
	            }
	        });
	    }

	    /**
	     * 确认删除布局
	     * @param id  布局标示
	     */
	    function del(id) {
	        $.ptAjax({
	            url: contextRoot + "/layout/del/" + id + '?random=' + Math.random(),
	            dataType: 'json',
	            type: 'get',
	            async: false,
	            contentType: 'application/json',
	            success: function success(res) {
	                if (res.status == '1') {
	                    f();
	                } else {
	                    f();
	                };
	                $('.modal-backdrop').remove();
	            },
	            error: function error(XMLHttpRequest) {
	                errorLogin(XMLHttpRequest);
	            }
	        });
	    }

	    /**
	     * 发布到小应用
	     * @param id 布局标示
	     * @param name 布局名称
	     */
	    function publish(id, name) {
	        var json = {
	            "areaId": "274833475802f3ccc5a75cedcac6f239",
	            "groupId": "6",
	            "appName": name,
	            "appCode": id,
	            "appDesc": "",
	            "label": "common",
	            "appIcon": "icon-C-photo",
	            "urltype": "view",
	            "url": "#" + id,
	            "version": "",
	            "addremark": ""
	        };
	        $.ajax({
	            url: contextRoot + '/appMGT/create',
	            type: 'post',
	            data: (0, _stringify2.default)(json),
	            dataType: 'json',
	            contentType: 'application/json',
	            success: function success(res) {
	                if (res.status == '1') {
	                    alert('发布成功');
	                } else {
	                    alert(res.message);
	                }
	            }
	        });
	    }

	    function eventInit() {
	        $('#layoutDel .btn-del').click(function () {
	            var _this = this;
	            var id = $(this).attr("data-id");
	            var data = { id: id };
	            data = (0, _stringify2.default)(data);
	            $('#layoutDel').modal('show');
	            $('#layoutDel').on('hidden.bs.modal', function () {
	                del(id);
	            });
	            $('#layoutDel').modal('hide');
	        });

	        $('#layoutList').on('click', '.layout-del', function () {

	            var parent = $(this).closest('.col-md-3');
	            var id = $(this).attr("data-id");

	            $('#layoutDel').modal('show');
	            $('#layoutDel .btn-del').attr('data-id', id);
	        });

	        $('#layoutList .backBtn').on('click', function () {
	            //window.history.back(-1);
	            window.location.hash = '#sysmgr';
	        });

	        $('#site-save-open,#site-save').on('click', function (e) {
	            e.preventDefault();
	            var _this = $(this);
	            var name = $('#exampleName').val();
	            var code = $('#code').val();
	            var data = { name: name, id: code };
	            var parm = (0, _stringify2.default)(data);

	            var inputs = $('.dropdown-layout input');

	            inputs.focus(function () {
	                $('#errorMessage').html("");
	            });
	            function checkForm() {
	                var success = false;
	                $.each(inputs, function (i, item) {
	                    if ($.trim($(item).val()) == '') {
	                        $('#errorMessage').html('请输入必填项！');
	                        success = true;
	                        return true;
	                    }
	                });
	                return success;
	            }

	            if (checkForm()) {
	                return false;
	            }

	            $.ptAjax({
	                url: contextRoot + "/layout/save",
	                dataType: 'json',
	                type: 'post',
	                data: parm,
	                contentType: 'application/json',
	                success: function success(res) {

	                    var minlayout = __webpack_require__(187);

	                    if (res.status == '1') {
	                        $('#exampleName').val('');
	                    } else {
	                        alert(res.message);
	                        return false;
	                    }

	                    var data = [{
	                        "id": res.data.id,
	                        "name": name
	                    }];
	                    var render = art.compile(minlayout);
	                    var html = render({ list: data });

	                    //console.log(html);
	                    //$('.page-content .row').prepend(html);
	                    //layoutInit();

	                    if (_this.attr('id') == 'site-save-open' && res.status == "1") {
	                        setTimeout(function () {
	                            location.href = '#/layout/' + res.data.id;
	                            location.href = '#/layout/' + res.data.id + '/' + (res.data.modifytime || 'modifytime') + '/back/layouts';
	                        }, 100);
	                        f();
	                    } else {
	                        f();
	                    }
	                },
	                error: function error(XMLHttpRequest) {
	                    errorLogin(XMLHttpRequest);
	                }
	            });
	        });

	        $('#searchBtn').on('click', function () {
	            loadData($(this).prev().val());
	        });

	        $('#layoutList').on('click', '.layout-application', function () {
	            var id = $(this).attr('data-id');
	            var name = $(this).attr('data-name');
	            publish(id, name);
	        });

	        $('#layoutList').on('click', '.u-checkbox-outline', function (e) {
	            if ($(e.target).parents('label').parent()[0].nodeName == 'TH') {
	                if ($(e.target).parents('label').hasClass('is-checked')) {
	                    $('.u-checkbox').removeClass('is-checked');
	                } else {
	                    $('.u-checkbox').addClass('is-checked');
	                }
	            } else {
	                if ($(e.target).parents('label').hasClass('is-checked')) {
	                    $(e.target).parents('label').removeClass('is-checked');
	                } else {
	                    $(e.target).parents('label').addClass('is-checked');
	                }
	            }
	        });

	        $('#layoutList .batch-del').on('click', function () {
	            $('#layoutList table tbody .is-checked').each(function (i, v) {
	                $('#layoutDel').modal('show');
	                $('#layoutDel .btn-del').on('click', function () {
	                    if ($(v).parent()[0].nodeName == 'TD') {
	                        var id = $(v).attr('layout-id');
	                        if (id) del(id);
	                    }
	                });
	            });
	        });
	        $('#layoutList .batch-application').on('click', function () {
	            $('#layoutList table tbody .is-checked').each(function (i, v) {
	                if ($(v).parent()[0].nodeName == 'TD') {
	                    var id = $(v).attr('layout-id');
	                    var name = $(v).attr('layout-name');
	                    if (id && name) publish(id, name);
	                }
	            });
	        });
	    }
	    loadData();
	};

	module.exports = {
	    init: init
	};

/***/ }),
/* 186 */
/***/ (function(module, exports) {

	module.exports = "\n <div id=\"layoutList\" class=\"layout-list\">\n    <div class=\"page-header\">\n        <ol class=\"breadcrumb\">\n            <li class=\"page-title\" class=\"active\">布局管理</li>\n        </ol>\n        <div class=\"page-header-actions dropdown\" style=\"z-index: 1;width: auto\">\n            <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\" data-toggle=\"dropdown\">\n                <button class=\"btn btn-sm btn-outline btn-success btn-round font-size-14\" type=\"button\">\n                    <span class=\"text hidden-xs\">创建布局</span>\n                    <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\n                </button>\n            </a>\n            <button class=\"u-button margin-left-10 font-size-14 backBtn\">返回</button>\n            <ul role=\"menu\" class=\"dropdown-menu dropdown-menu-left dropdown-menu-media dropdown-layout\">\n                <li role=\"presentation\" class=\"scrollable is-enabled scrollable-vertical\" style=\"position: relative\">\n                    <div data-role=\"container\" class=\"scrollable-container\" >\n\n                        <div data-role=\"content\" class=\"scrollable-content\" >\n                            <div class=\"panel-body\">\n                                <form>\n                                    <div class=\"form-inline\">\n                                        <label class=\"control-label\">名称</label>\n                                        <input type=\"text\" id=\"exampleName\" placeholder=\"名称\" class=\"form-control\" /> <span class=\"field\">*</span>\n                                    </div>\n                                    <div class=\"form-inline\">\n                                        <label class=\"control-label\">编码</label>\n                                        <input type=\"text\" name=\"id\" id=\"code\" placeholder=\"编码\" class=\"form-control\"> <span class=\"field\">*</span>\n                                    </div>\n                                    <div class=\"form-inline\">\n                                        <div id=\"errorMessage\"></div>\n                                    </div>\n                                    <div class=\"form-group text-right\">\n                                        <button id=\"site-save-open\"  class=\"btn btn-primary\">创建并打开</button>\n                                        <button id=\"site-save\" class=\"btn btn-primary\">保存</button>\n                                    </div>\n                                </form>\n                            </div>\n                        </div>\n\n                    </div>\n                </li>\n            </ul>\n            <button class=\"u-button font-size-14 batch-del\">批量删除</button>\n            <button class=\"u-button font-size-14 batch-application\">批量发布到小应用</button>\n        </div>\n\n        <div class=\"search  pull-right margin-right-20\">\n            <div class=\"u-input-group u-has-feedback \">\n                <input type=\"text\" class=\"u-form-control\"  placeholder=\"布局名称/布局编码\">\n                <span class=\"u-form-control-feedback uf uf-magnifyingglass\"  id=\"searchBtn\"></span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"page-content container-fluid\">\n        <div class=\"row\">\n            <table class=\"u-table b-table width-full\">\n                <thead>\n                    <tr>\n                        <th>\n                            <label class=\"u-checkbox only-style u-checkbox-info is-upgraded\"  data-upgraded=\",u.Checkbox\">\n                                <input  type=\"checkbox\" class=\"u-checkbox-input\">\n                                <span class=\"u-checkbox-label\"></span>\n                                <span class=\"u-checkbox-focus-helper\"></span>\n                                <span class=\"u-checkbox-outline\">\n                                    <span class=\"u-checkbox-tick-outline\"></span>\n                                </span>\n                                <span style=\"overflow: hidden; position: relative;\">\n                                    <span class=\"u-ripple\"></span>\n                                </span>\n                            </label>\n                        </th>\n                        <th>布局名称</th>\n                        <th>布局编码</th>\n                        <th>模板名称</th>\n                        <th>创建时间</th>\n                        <th>最后修改时间</th>\n                        <th>是否启用</th>\n                        <th>操作</th>\n                    </tr>\n                </thead>\n                <tbody>\n                {{each list as item i}}\n                    <tr>\n                        <td>\n                            <label class=\"u-checkbox only-style u-checkbox-info is-upgraded\"  data-upgraded=\",u.Checkbox\" layout-id=\"{{item.id}}\" layout-name=\"{{item.name}}\">\n                                <input  type=\"checkbox\" class=\"u-checkbox-input\">\n                                <span class=\"u-checkbox-label\"></span>\n                                <span class=\"u-checkbox-focus-helper\"></span>\n                                <span class=\"u-checkbox-outline\">\n                                    <span class=\"u-checkbox-tick-outline\"></span>\n                                </span>\n                                <span style=\"overflow: hidden; position: relative;\">\n                                    <span class=\"u-ripple\"></span>\n                                </span>\n                            </label>\n                        </td>\n                        <td>{{item.name}}</td>\n                        <td>{{item.id}}</td>\n                        <td>{{item.tplname}}</td>\n                        <td>{{item.createtime}}</td>\n                        <td>{{item.lastModifytime}}</td>\n                        <td>{{item.isenable}}</td>\n                        <td>\n                            <a href=\"#/layout/{{item.id}}/{{item.modifytime||'modify'}}/back/layouts\" data-id=\"{{item.id}}\" data-viewid=\"{{item.id}}\" title=\"设计\">\n                                <i class=\"iconfont icon-pencil\"></i>\n                            </a>&nbsp;\n                            <a href=\"javascript:;\" data-id=\"{{item.id}}\" data-name=\"{{item.name}}\" class=\"layout-application\" title=\"发布到小应用\">\n                                <i class=\"iconfont icon-appicon\"></i>\n                            </a>&nbsp;\n                            <a href=\"javascript:;\" data-id=\"{{item.id}}\" class=\"layout-del\" title=\"删除\">\n                                <i class=\"iconfont icon-delete\"></i>\n                            </a>\n                        </td>\n                    </tr>\n                {{/each}}\n                </tbody>\n            </table>\n        </div>\n    </div>\n     <div class=\"page\"><input type=\"text\" class=\"hide\" id=\"startPageIndex\">\n         <div id='layoutPage' class='u-pagination'>\n         </div>\n     </div>\n\n\n     <div class=\"modal fade\" id=\"layoutDel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n         <div class=\"modal-dialog\">\n             <div class=\"modal-content\">\n                 <div class=\"modal-header\">\n                     <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                     <h4 class=\"modal-title\" id=\"myModalLabel\">\n                         确认\n                     </h4>\n                 </div>\n                 <div class=\"modal-body\">\n                     您确认要删除此布局吗？\n                 </div>\n                 <div class=\"modal-footer\">\n                     <button type=\"button\" class=\"btn btn-del btn-primary\">确认</button>\n                     <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n                 </div>\n             </div><!-- /.modal-content -->\n         </div><!-- /.modal -->\n     </div>\n</div>\n";

/***/ }),
/* 187 */
/***/ (function(module, exports) {

	module.exports = "{{each list as item i}}\n<div class=\"col-md-3\">\n    <div class=\"widget \">\n        <div class=\"widget-content padding-35 bg-white clearfix\">\n            <div class=\"pull-left white\">\n                <i aria-hidden=\"true\" class=\"icon icon-circle icon-2x wb-clipboard bg-red-600\"></i>\n            </div>\n            <div class=\"counter counter-md counter text-right pull-right\">\n                <div class=\"counter-number-group\">\n                    <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\n                </div>\n                <div class=\"counter-label text-capitalize font-size-16\"></div>\n            </div>\n        </div>\n        <div class=\"padding-10 text-right\">\n            <a href=\"javascript:;\" class=\"add-to-sidebar\">\n                <button  type=\"button\" class=\"btn btn-sm btn-outline btn-default btn-round\">\n                    <span class=\"text hidden-xs\">设为首页</span>\n                </button>\n            </a>\n            <a href=\"#/layout/{{item.id}}\">\n                <button type=\"button\" class=\"btn btn-sm btn-outline btn-default btn-round\">\n                    <span class=\"text hidden-xs\">设计</span>\n                </button>\n            </a>\n            <button type=\"button\" data-id=\"{{item.id}}\" class=\"btn btn-sm btn-outline btn-default btn-round layout-del\">\n                <span class=\"text hidden-xs\" >删除</span>\n                <i class=\"icon wb-chevron-right\" aria-hidden=\"true\"></i>\n            </button>\n        </div>\n    </div>\n</div>\n{{/each}}";

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var template = __webpack_require__(182);
	    var temp = __webpack_require__(189);

	    var init = function init() {
	        $.ptAjax({
	            url: contextRoot + "/layout/tpl/list",
	            dataType: 'json',
	            type: 'get',
	            contentType: 'application/json',
	            success: function success(res) {
	                var str = [];

	                var render = template.compile(temp);
	                var html = render({ list: res });
	                $('#content').html(html);

	                $('#upload-form').submit(function (e) {});
	            },
	            error: function error(XMLHttpRequest) {
	                errorLogin(XMLHttpRequest);
	            }
	        });
	    };

	    return {
	        init: init
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 189 */
/***/ (function(module, exports) {

	module.exports = "\n<div class=\"page-header\">\n    <h1 class=\"page-title\">布局模板管理</h1>\n    <ol class=\"breadcrumb\">\n        <li><a href=\"index.html\">首页</a></li>\n        <li class=\"active\">布局模板</li>\n    </ol>\n    <div class=\"page-header-actions dropdown\" style=\"z-index: 1\">\n        <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\" data-toggle=\"dropdown\">\n            <button class=\"btn btn-sm btn-outline btn-default btn-round\" type=\"button\">\n                <span class=\"text hidden-xs\">导入布局模板</span>\n                <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\n            </button>\n        </a>\n        <ul role=\"menu\" class=\"dropdown-menu dropdown-menu-right dropdown-menu-media\">\n            <li role=\"presentation\" class=\"dropdown-menu-header\">\n                <h5>导入一个新的布局模板</h5>\n            </li>\n            <li role=\"presentation\" class=\"scrollable is-enabled scrollable-vertical\" style=\"position: relative\">\n                <div data-role=\"container\" class=\"scrollable-container\" >\n                    <div data-role=\"content\" class=\"scrollable-content\" >\n                        <div id=\"widget-list\" class=\"site-items list-unstyled\">\n                            <div class=\"col-md-12 widget-create\">\n                                <div class=\"panel-body\" id=\"widget-body\">\n                                    <form action=\"layout/tpl/import\" method=\"post\" enctype=\"multipart/form-data\" id=\"upload-form\"  target=\"hidden_frame\">\n                                        <div class=\"form-group\">\n                                            <h4 class=\"example-title\">名称</h4>\n                                            <input type=\"text\" name=\"name\" placeholder=\"名称\" id=\"inputRounded\" name=\"name\" class=\"form-control round\">\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <h4 class=\"example-title\">标识</h4>\n                                            <input type=\"text\" name=\"id\" placeholder=\"标识\" id=\"\" class=\"form-control round\">\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <h4 class=\"example-title\">模板上传</h4>\n                                            <div class=\"form-group\">\n                                                <div class=\"input-group input-group-file\">\n                                                    <input type=\"text\" readonly=\"\" class=\"form-control\">\n                                                    <span class=\"input-group-btn\">\n                                                      <span class=\"btn btn-outline btn-file\">\n                                                        <i aria-hidden=\"true\" class=\"icon wb-upload\"></i>\n                                                        <input type=\"file\" multiple=\"\" name=\"tpl\">\n                                                      </span>\n                                                    </span>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"form-group text-left\">\n                                            <div id=\"errorMessage\"></div>\n                                        </div>\n                                        <div class=\"form-group text-right\">\n                                            <button type=\"submit\" id=\"file-upload\" class=\"btn-blue btn-block btn-xs\">上传</button>\n                                        </div>\n                                    </form>\n                                    <iframe name='hidden_frame' id=\"hidden_frame\" style='display:none'></iframe>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                </li>\n            <li role=\"presentation\" class=\"dropdown-menu-footer\">\n                <a role=\"button\" href=\"javascript:void(0)\" class=\"dropdown-menu-footer-btn\">\n                    <i aria-hidden=\"true\" class=\"icon wb-settings\"></i>\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>\n\n<div class=\"page-content container-fluid\">\n    <div class=\"row\">\n        {{each list as item i}}\n        <div class=\"col-md-3\">\n            <div class=\"widget\">\n                <div class=\"widget-content padding-35 bg-white clearfix\">\n                    <div class=\"pull-left white\">\n                        <i aria-hidden=\"true\" class=\"icon icon-circle icon-2x wb-image bg-blue-600\"></i>\n                    </div>\n                    <div class=\"counter counter-md counter text-right pull-right\">\n                        <div class=\"counter-number-group\">\n                            <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\n                        </div>\n                        <div class=\"counter-label text-capitalize font-size-16\"></div>\n                    </div>\n                </div>\n                <div class=\"layout-template\">\n                    <!--\n                    {{echo item.tpl}}\n                    -->\n                </div>\n                <div class=\"padding-10 text-right\">\n                    <button type=\"button\" data-id=\"{{item.pkWidget}}\" class=\"btn btn-sm btn-outline btn-default btn-round widget-edit\">\n                        <span class=\"text hidden-xs\">编辑</span>\n                    </button>\n                    <button type=\"button\" data-id=\"{{item.pkWidget}}\" class=\"btn btn-sm btn-outline btn-default btn-round widget-del\">\n                        <span class=\"text hidden-xs\" >删除</span>\n                        <i class=\"icon wb-chevron-right\" aria-hidden=\"true\"></i>\n                    </button>\n                </div>\n            </div>\n        </div>\n        {{/each}}\n    </div>\n</div>";

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var Layout = __webpack_require__(191);
	    var Toolbar = __webpack_require__(192);
	    var designer = __webpack_require__(194);

	    var init = function init(param) {
	        var id = param.id;
	        var viewid = param.viewid;
	        var element = param.element;
	        var router = param.router;
	        var modifytime = param.modifytime;

	        if ($('#designer').length == 0) {
	            $('#content').append(designer);
	        } else {
	            $('#designerContent').html('');
	        }

	        function initLayout(p, params) {
	            var require = window.require;
	            var module = p;
	            requirejs.undef(module);
	            if (params.length == 1) params = params[0];
	            module = module + "?bust=" + new Date().getTime();
	            require([module], function (module) {
	                var options = {
	                    "isSortable": true,
	                    "isWidgetEdit": true,
	                    "ModifiedLayout": true,
	                    "isShowWidgetName": true,
	                    "element": element
	                };

	                require(['jqueryui'], function () {
	                    //初始化布局
	                    var layout = new Layout('#designerContent', {
	                        viewId: viewid,
	                        layoutId: id
	                    });
	                    //初始化工具栏
	                    var tools = new Toolbar('#toolbars', {
	                        layout: layout,
	                        layoutId: id,
	                        modifytime: modifytime
	                    });

	                    $('#designerContent').css('height', $('body').height() - 60);

	                    $('#designer').on('hidden.bs.modal', function () {
	                        setTimeout(function () {
	                            if (typeof PubSub != 'undefined' && PubSub.publish('designer.closeAfter')) {} else {
	                                location.href = '#/' + decodeURIComponent(router);
	                            }
	                        }, 100);
	                    }).on('shown.bs.modal', function () {
	                        if (typeof PubSub != 'undefined') {
	                            PubSub.publish('designer.showBefore');
	                        }
	                        module.init(options);
	                        $('#toolbars input').placeholder();
	                    }).modal('show');
	                });
	            });
	        }

	        initLayout(contextRoot + "/data:layout/" + id, []);
	        /*判断是否有无viewid*/
	        //if (viewid != null) {
	        //    initLayout(contextRoot + "/data:layout/" + id, []);
	        //}
	        //if(viewid == null) {
	        //    tools.setLayout(true);
	        //}
	    };

	    window.layout = init;
	    return {
	        init: init
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/**
	 * Created by chief on 15/11/4.
	 */
	//布局设置按钮
	/*
	 * options
	 *
	 * isLayoutEdit  是否可以编辑布局
	 * isSortable   是否可以拖动
	 * layoutId     布局id
	 * viewId       预览id
	 * status       用户态1 设计态0
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var Layout = function Layout(containter, options) {
	        var options = options || {};
	        this.options = {
	            isLayoutEdit: true,
	            isSortable: false,
	            layoutId: null,
	            viewId: null,
	            gridData: [],
	            status: 0
	        };
	        this.options = $.extend(this.options, options);
	        this.edit();
	        this.containter = $(containter) || $('#designerContent');
	        //this.editLayout();
	    };
	    Layout.prototype = {
	        init: function init() {
	            var d = this.options;
	            if (!d.layoutId) {
	                return false;
	            }
	            if (d.viewId || d.layoutId) {
	                this.initSortable($('.widgetBox'));
	            }
	            if (d.isLayoutEdit) {
	                this.getLayoutData();
	            }
	            if (d.isSortable) {
	                this.initSortable();
	            }
	            return this;
	        },
	        createElement: function createElement() {},
	        editLayout: function editLayout() {
	            var _this = this;
	            var container = _this.containter;
	            setTimeout(function () {

	                var w = (container.width() + 30) / 12;

	                var grid = _this.options.gridData;

	                function limit() {
	                    var lines = [],
	                        place = [],
	                        curLength = 0;
	                    $.each(grid, function (i, item) {
	                        var l = grid.length;
	                        var p = [],
	                            n = i + 1;
	                        curLength += item;
	                        var persent = (curLength / 12 * 100).toFixed(4) + '%';
	                        var line = '<div class="line" style="left:' + persent + '"></div>';
	                        if (i == l - 1) {
	                            return false;
	                        }
	                        var p = [parseInt((curLength - item + 1) * w), 0, parseInt((curLength + grid[n] - 1) * w), 0];
	                        place.push(p);
	                        lines.push(line);
	                    });
	                    if (container.find(".line").length == 0) {
	                        container.find(".row").eq(0).append(lines.join(""));
	                    }
	                    return place;
	                }

	                var place = limit();

	                container.find(".line").each(function (i, item) {
	                    var L = i;
	                    $(item).draggable({
	                        axis: 'x',
	                        containment: place[i],
	                        grid: [w],
	                        drag: function drag(event, ui) {
	                            var myW = ui.helper.width();
	                            var lW = Math.round(ui.position.left / w);
	                        },
	                        stop: function stop(event, ui) {
	                            var myW = ui.helper.width();
	                            var lW = Math.round(ui.position.left / w);
	                            var grid = _this.options.gridData;
	                            var curL = 0,
	                                prevL = 0;
	                            ui.helper.css('left', (lW / 12 * 100).toFixed(4) + '%');
	                            $.each(grid, function (t, item) {
	                                if (t < i) {
	                                    prevL += item;
	                                }
	                            });
	                            curL = i == 0 ? lW : lW - prevL;

	                            var l = grid[i] + grid[i + 1];
	                            //console.log(l);
	                            //console.log(grid[i]);
	                            $(".ui-grid").eq(i).attr("class", "col-md-" + curL + " ui-grid");
	                            $(".ui-grid").eq(i + 1).attr("class", "col-md-" + (l - curL) + " ui-grid");
	                            _this.options.gridData[i] = curL;

	                            _this.options.gridData[i + 1] = l - curL;

	                            var place = limit();

	                            //ui.helper.draggable('option',"containment",place[i]);

	                            //更新拖动限制范围
	                            if (grid.length == 2) {
	                                //ui.helper.draggable('option',"containment",place[i]);
	                            } else if (i == grid.length - 1 - 1 && grid.length != 2) {
	                                ui.helper.prev().draggable('option', "containment", place[i - 1]);
	                            } else {
	                                ui.helper.next().draggable('option', "containment", place[i + 1]);
	                            }
	                            //$(".ui-grid").eq(0).attr("class","col-md-"+lW+" ui-grid");
	                            //$(".ui-grid").eq(1).attr("class","col-md-"+(12-lW)+" ui-grid");
	                            //console.log(ui.helper.draggable('option',"containment",[500, 0, 1000, 0]));
	                            //var grid = _this.getLayoutData().options.gridData;
	                            //var length = grid-length,
	                            //    l = 0;
	                        }
	                    });
	                });
	            }, 0);
	        },
	        setLayout: function setLayout(data) {
	            $(containter).html(data);
	            this.initSortable();
	        },
	        getLayoutData: function getLayoutData() {
	            var layouts = $(this.containter).find('.ui-grid'),
	                data = [],
	                html = [],
	                str = 0,
	                length = layouts.length,
	                This = this;
	            $.each(layouts, function (i, item) {
	                var index = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
	                data.push(index);
	                //var edit = '<div index="'+i+'" class="layout-edit offset">' +
	                //    '<input class="layout-col"  value="'+index+'" />'+
	                //    '</div>'
	                //html.push(edit);
	                //$(item).append(edit).find('.layout-col').change(function(e,index){
	                //    var index = parseInt($(this).parent().attr("index"));
	                //
	                //    var value = $(this).val();
	                //    var isNum = value.search(/^[0-9]/ig);
	                //
	                //    if(length==1) return false;
	                //    var next = index+1;
	                //    if(next==length){
	                //        next = index-1;
	                //    };
	                //    str=0;
	                //    $.each($('.layout-col'),function(i,item){
	                //        if(i!=index&&i!=next){
	                //            str += parseInt($(this).val())
	                //        }
	                //    });
	                //
	                //    if(isNum==-1) {
	                //        alert("请输入1-12范围内的整数");
	                //        $(this).val(data[index]);
	                //        return false;
	                //    }
	                //    else if(isNum!=-1){
	                //        if(parseInt(value)>12||parseInt(value)<=0||parseInt(value)>(12-str-1)){
	                //            alert("请输入1-12范围内的整数");
	                //            $(this).val(data[index]);
	                //            return false;
	                //        }
	                //    }
	                //    $(item).attr("class",'col-md-'+value+' ui-grid ui-resizable');
	                //    layouts.eq(next).attr("class",'col-md-'+(12-str-value)+' ui-grid ui-resizable');
	                //    $('.layout-col').eq(next).val((12-str-value));
	                //    data[next] = 12-str-value;
	                //    data[index] = parseInt(value);
	                //});
	            });
	            This.options.gridData = data;
	            return this;
	        },
	        edit: function edit() {
	            $('#content').delegate('.widgetBox .well', 'mouseover', function (e) {
	                $(this).find(".edit").show();
	            });
	            $('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseover', function (e) {
	                $(this).find(".edit").show();
	            });

	            $('#content').delegate('.widgetBox .well', 'mouseleave', function (e) {
	                $(this).find(".edit").hide();
	            });

	            $('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseleave', function (e) {
	                $(this).find(".edit").hide();
	            });
	            var _this = this;
	        },
	        initSortable: function initSortable(elems) {
	            this.getLayoutData();
	            $(elems).sortable({
	                placeholder: "ui-portlet-placeholder",
	                connectWith: ".widgetBox",
	                forcePlaceholderSize: true,
	                stop: function stop(i) {
	                    //console.log(i);
	                },
	                over: function over() {}
	            }).disableSelection();
	            return this;
	        }
	    };

	    return Layout;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _defineProperty2 = __webpack_require__(193);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by chief on 15/11/10.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var Toolbar = function Toolbar(containter, options) {
	        var options = options || {};
	        this.options = {
	            viewId: null,
	            layoutId: null,
	            layout: {}
	        };

	        this.containter = containter;
	        this.options = $.extend(this.options, options);

	        this.createHtml();
	        this.init();
	    };
	    /**
	     * 过滤查询到的widget
	     * @param resWidget 结果widget
	     */
	    var filterWidget = function filterWidget(resWidget) {
	        var widgets = $('#designerContent').find('.well');
	        var widgetsId = {};
	        $.each(widgets, function (i, v) {
	            widgetsId[$(v).attr('data-id')] = '';
	        });
	        var newRes = resWidget.filter(function (item) {
	            if (!(item.id in widgetsId)) return item;
	        });
	        return newRes;
	    };
	    Toolbar.prototype = {
	        createHtml: function createHtml() {

	            var html = '<div id="tool-panel" class="sidebar-tools pannel">' + '<ul id="tool-panel-icons" class="icon-list">' + '<li data-pack="page" class="ion-android-settings ion-page" style="display:none;"></li>' + '<li title="布局模板" aria-hidden="true" data-pack="layout"><i class="iconfont icon-template"></i><b>模板</b></li>' + '<li data-pack="add"><i class="iconfont icon-component"></i><b>小部件</b></li>' + '<li id="layoutSave" data-pack="save"><i class="portalfont icon-baocun"></i><b>保存</b></li>' + '<li id="layoutReset" data-pack="reset" ><i class="portalfont icon-zhongzhi"></i><b>重置</b></li>' + '<li data-pack="close" data-dismiss="modal" aria-label="Close"><i class="iconfont icon-cancel"></i><b>关闭</b></li>' + '<li data-tags="camera, photo" data-pack="preview" class="ion-android-image" data-toggle="modal" data-target="#modalDefault"></li>' + '<li id="layoutCancel" class="icon-goto"><a href="index.html" style="color:#fff;" data-tags="reply" data-pack="ios7" class="ion-ios7-undo" class="ion-refresh"></a></li>' + '</ul>' + '<div id="tool-panel-add" class="tool-panels" style="display:none;">' + '<div class="panel">' + '<div class="panel-body">' + '<div class="form-container">' + '<select class="widget-category form-control">' + '<option selected value="all">全部分类</option>' + '</select>' + '</div>' + '<div class="form-inline">' + '<div class="input-search" style="margin-bottom:10px;">' + '<input type="text" placeholder="搜索" name="" class="form-control widget-key">' + '<button class="input-search-btn widget-search" type="submit"><i aria-hidden="true" class="icon wb-search"></i></button>' + '</div>' + '</div>' + '<div class="row"></div>' + '</div>' + '</div>' + '</div>' + '<div id="tool-panel-layout" class="tool-panels" style="display:none;">' + '<div class="panel">' + '<div class="panel-body">' + '<div class="row">' + '<ul class="list-unstyled text-center">' + '</ul>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';

	            $(this.containter).html(html);
	        },
	        init: function init() {
	            this.panel();
	            this.changeLayout();
	            this.search();
	            this.saveLayout();
	        },
	        panel: function panel() {
	            var _this = this;
	            /* 右侧工具面板展开收起*/
	            var ElemnetShow = null;
	            $('#tool-panel-icons').click(function (e) {

	                if ($(e.target).closest('li').attr("data-pack") == 'layout' || $(e.target).closest('li').attr("data-pack") == 'add') {
	                    if ($('#tool-panel-add').is(':visible') || $('#tool-panel-layout').is(':visible')) {
	                        $('#designerContent').css('margin-right', 80);
	                    } else {
	                        $('#designerContent').css('margin-right', $('#tool-panel-add').outerWidth() + $('#toolbars').outerWidth());
	                    }
	                }

	                var tar = $(e.target),
	                    tarName = tar.closest('li').attr("data-pack"),
	                    menu = $('#tool-panel-' + tarName);
	                if (ElemnetShow != null) {
	                    ElemnetShow.fadeOut();
	                }
	                if (menu.length > 0) {
	                    if (menu.css("display") == 'none') {
	                        menu.fadeIn();
	                        ElemnetShow = menu;
	                    } else {
	                        menu.fadeOut();
	                    }
	                };

	                //console.log(tarName);

	                switch (tarName) {
	                    case 'layout':
	                        if ($('#tool-panel-layout li').length > 0) {
	                            return false;
	                        };
	                        _this.setLayout();
	                        break;
	                    case 'preview':
	                        $('.modal-body').html($('#content .row').html());
	                        break;
	                    case 'add':
	                        if ($('#tool-panel-add .well').length > 0) {
	                            return false;
	                        };
	                        var url = contextRoot + '/widget/query?random=' + Math.random();

	                        var searchWidgets = function searchWidgets(data) {
	                            data.viewId = location.hash.split('/')[2];
	                            data = (0, _stringify2.default)(data);

	                            var option = {
	                                url: contextRoot + "/widget/query",
	                                dataType: 'json',
	                                data: data,
	                                type: 'post',
	                                contentType: 'application/json',
	                                success: function success(res) {
	                                    if (res.status == '1') {
	                                        var data = res.data || [];
	                                        _this.renderWidget(filterWidget(data));
	                                    }
	                                },
	                                error: function error(XMLHttpRequest) {
	                                    errorLogin(XMLHttpRequest);
	                                }

	                                //搜索订阅
	                            };if (typeof PubSub != 'undefined' && PubSub.publish('designer.searchWidgets', option)) {} else {
	                                $.ptAjax(option);
	                            }
	                        };

	                        var getWidgets = function getWidgets(url) {

	                            var option = {
	                                url: contextRoot + "/widget/query",
	                                dataType: 'json',
	                                type: 'post',
	                                data: { "viewId": location.hash.split('/')[2] },
	                                contentType: 'application/json',
	                                success: function success(res) {
	                                    if (res.status == '1') {
	                                        var data = res.data || [];
	                                        var newRes = filterWidget(data);
	                                        _this.renderWidget(newRes);
	                                    }
	                                },
	                                error: function error(XMLHttpRequest) {
	                                    errorLogin(XMLHttpRequest);
	                                }
	                            };
	                            //组件订阅
	                            if (typeof PubSub != 'undefined' && PubSub.publish('designer.getWidgets', option)) {} else {
	                                $.ptAjax(option);
	                            }
	                        };

	                        getWidgets(url);

	                        var option = {
	                            url: contextRoot + "/widget/catels",
	                            dataType: 'json',
	                            type: 'get',
	                            contentType: 'application/json',
	                            success: function success(res) {
	                                if (res.status == '1') {
	                                    if (res.data && res.data.length) {
	                                        var str = [];
	                                        str.push('<option selected  value="all">全部分类</option>');
	                                        $.each(res.data, function (i, item) {
	                                            str.push('<option value="' + item.id + '">' + item.name + '</option>');
	                                        });
	                                        $('.widget-category').html(str.join('')).change(function (e) {
	                                            var cate = $(this).val();
	                                            var value = $.trim($('.widget-key').val());
	                                            var data = {
	                                                category: cate,
	                                                keyword: value
	                                            };
	                                            searchWidgets(data);
	                                        });
	                                    }
	                                }
	                            },
	                            error: function error(XMLHttpRequest) {
	                                errorLogin(XMLHttpRequest);
	                            }

	                            //分类订阅
	                        };if (typeof PubSub != 'undefined' && PubSub.publish('designer.getCatels', option)) {} else {
	                            $.ptAjax(option);
	                        }
	                        break;
	                    case 'close':
	                        $('#content').removeAttr('identity');
	                }
	            });

	            var pannel = $('#create-site-panel');
	            $('#create-site').on('click', function () {
	                pannel.fadeIn();
	                $(this).hide();
	            });
	            $('#create-site-cannel').on('click', function () {
	                pannel.fadeOut(function () {
	                    $('#create-site').show();
	                });
	            });
	            $('#create-site-save').on('click', function () {
	                var workspan = $('#gadget-site-workspace');
	                $('#gadget-site-workspace').fadeIn(function () {
	                    $('#tool-panel').removeClass('diplaynoe').addClass("animated fadeInRight");
	                });
	            });
	        },
	        renderWidget: function renderWidget(res) {
	            var str = [];
	            $.each(res, function (i, item) {
	                str.push('<div class="col-sm-6">' + '<div data-id="' + item.id + '" data-url="' + item.url + '" class="well tile sort ui-draggable">' + '<div class="icons-text">' + '<i class="name">' + item.name + '</i>' + '</div>' + '<ul class="list-unstyled edit">' + '</ul>' + '<div class="innerHtml collapse in"></div>' + '</div></div>');
	            });

	            $("#tool-panel-add .row").html(str.join(''));

	            this.createDraggable();
	        },
	        createDraggable: function createDraggable() {
	            $("#tool-panel-add [class^='well']").draggable({
	                connectToSortable: ".widgetBox",
	                helper: "clone",
	                snapMode: "outer",
	                stop: function stop(event, ui) {
	                    var html = '<li><i class="portalfont btn btn-round btn-default btn-outline btn-pill-right icon-max" data-type="window" title="最大最小化"></i></li>' + '<li><i class="portalfont btn btn-default btn-outline icon-unfold" data-type="collage" title="折叠"></i></li>' + '<li><i class="portalfont btn btn-round btn-default btn-outline btn-pill-left icon-pencil" data-type="edit"  data-toggle="modal" data-target="#modalBlue" title="编辑"></i></li>' + '<li><i class="portalfont btn btn-default btn-outline icon-cancel02" data-type="del" title="删除"></i></a></li>';
	                    ui.helper.removeAttr("style").removeClass('tile').find('.edit').html(html);
	                    var url = $(this).attr('data-url');
	                    if (url.search(/^http:\/\//) != -1) {
	                        ui.helper.find('.innerHtml').html('');
	                        return false;
	                    }
	                    var dataId = $(this).attr('data-id');
	                    var container = $(this);
	                    $.ptAjax((0, _defineProperty3.default)({
	                        url: contextRoot + url,
	                        type: 'post',
	                        timeout: 2000,
	                        error: function error(xml) {
	                            alert("加载XML 文件出错！");
	                        },
	                        success: function success(data) {
	                            var xml;
	                            if (typeof data == "string") {
	                                xml = new ActiveXObject("Microsoft.XMLDOM");
	                                xml.async = false;
	                                xml.loadXML(data);
	                            } else {
	                                xml = data;
	                            }
	                            var layoutId = location.hash.split('/')[2];
	                            var key = 'file:' + url + '?id=' + dataId + '&lid=' + layoutId;
	                            window.container.preloadGadget(key, function (res) {
	                                var userPrefs = res[key].userPrefs;
	                                var url = contextRoot + '/widget/pref/' + dataId + '/' + layoutId;
	                                if ($('#content').attr('identity')) {
	                                    url = contextRoot + '/page/pref/' + dataId + '/' + layoutId;
	                                }
	                                $.ptAjax({
	                                    url: url,
	                                    type: 'get',
	                                    async: false,
	                                    dataType: 'json',
	                                    success: function success(datas) {
	                                        //datas=JSON.parse(datas);
	                                        if (datas.status == 1) {
	                                            var obj = {};
	                                            var data = datas.data;
	                                            if (data && data.length) {
	                                                for (var i = 0; i < data.length; i++) {
	                                                    obj[data[i].name] = data[i];
	                                                }
	                                            }
	                                            $.extend(userPrefs, obj);
	                                            res[key].userPrefs = userPrefs;
	                                        }
	                                    }
	                                });
	                                window.container.service_.cachedMetadatas_[key] = res[key];
	                            });
	                            var html = $(xml).find("Content").text().replace(/(\<!\[CDATA\[|\]\]\>)/ig, '').replace('${widgetId}', dataId);
	                            ui.helper.find('.innerHtml').html(html).parent().attr('data-ul', key);
	                            $('#tool-panel-add').find('[data-id=' + dataId + ']').remove();
	                        }
	                    }, 'error', function error(XMLHttpRequest) {
	                        errorLogin(XMLHttpRequest);
	                    }));
	                }
	            });
	        },
	        changeLayout: function changeLayout() {
	            var _this = this;
	            $('#tool-panel-layout').delegate('.item-layout', 'click', function (e) {
	                var selected = $('#tool-panel-layout .item-layout');
	                selected.removeClass("selected");
	                var id = $(this).attr("id");
	                var layoutId = "selected";
	                $(this).addClass(layoutId);
	                //var layoutArray = [
	                //    ['12'],
	                //    ['6-6'],
	                //    ['4-8'],
	                //    ['8-4'],
	                //    ['4-4-4'],
	                //];
	                var res = $("#tool-panel-layout").data('res');

	                var checkArrar = res[$(this).index()].tpl;

	                $('#designerContent .well').removeClass("ui-draggable-handle");
	                if ($("#designerContent .widgetBox").sortable) {
	                    $("#designerContent .widgetBox").unbind();
	                }

	                var well = $('#designerContent .well').clone();

	                var container = $('#designerContent').attr('code', res[$(this).index()].id).html(checkArrar);

	                container.find(".widgetBox").eq(0).append(well);

	                $("#designerContent .widgetBox").sortable({
	                    connectWith: "#designerContent .widgetBox",
	                    placeholder: "ui-portlet-placeholder",
	                    forcePlaceholderSize: true,
	                    edge: 300
	                });
	                _this.options.layout.getLayoutData();
	                _this.options.layout.editLayout();
	            });
	        },
	        search: function search() {
	            var _this = this;
	            function searchWidgets(data) {
	                data.viewId = location.hash.split('/')[2];
	                data = (0, _stringify2.default)(data);
	                var option = {
	                    url: contextRoot + "/widget/query",
	                    dataType: 'json',
	                    data: data,
	                    type: 'post',
	                    contentType: 'application/json',
	                    success: function success(res) {
	                        if (res.status == '1') {
	                            var data = res.data || [];
	                            _this.renderWidget(filterWidget(data));
	                        }
	                    },
	                    error: function error(XMLHttpRequest) {
	                        errorLogin(XMLHttpRequest);
	                    }
	                };
	                if (typeof PubSub != 'undefined' && PubSub.publish('designer.searchWidgets', option)) {} else {
	                    $.ptAjax(option);
	                }
	            }
	            $('.widget-search').click(function () {
	                var cate = $('.widget-category').val();
	                var value = $.trim($('.widget-key').val());
	                var data = {
	                    category: cate,
	                    keyword: value
	                };
	                searchWidgets(data);
	            });
	        },
	        saveLayout: function saveLayout() {
	            //保存布局
	            var _this = this;
	            $('#layoutReset').click(function () {
	                var options = _this.options;
	                var userRole = $('#content').attr('identity');
	                var url = contextRoot + "/layout/reset/" + options.layoutId + "?random=" + Math.random();
	                if (userRole) {
	                    url = contextRoot + "/layout/restore/" + options.layoutId + "?random=" + Math.random();
	                }
	                $.ptAjax({
	                    url: url,
	                    dataType: 'json',
	                    type: 'get',
	                    contentType: 'application/json',
	                    success: function success(res) {
	                        if (res.status == '1') {
	                            alert("重置成功");
	                        } else {
	                            alert(res.message);
	                        }
	                    },
	                    error: function error(XMLHttpRequest) {
	                        errorLogin(XMLHttpRequest);
	                    }
	                });
	            });

	            $('#layoutSave').click(function () {
	                var options = _this.options;
	                var list = $("#designerContent .widgetBox"),
	                    data = [],
	                    layData = [];
	                var layoutId = options.layoutId;
	                var viewId = options.viewId != null ? options.viewId : "";
	                var modifytime = options.modifytime;

	                function getGridData() {
	                    var layouts = $('.ui-grid'),
	                        data = [],
	                        html = [],
	                        str = 0,
	                        length = layouts.length,
	                        This = this;
	                    $.each(layouts, function (i, item) {
	                        var index = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
	                        data.push(index);
	                    });
	                    return data;
	                };

	                $.each(list, function (i, item) {
	                    var child = $(item).find('.well');
	                    n = [];
	                    if (child.length >= 1) {
	                        $.each(child, function (i, t) {
	                            n.push($(t).attr('data-id'));
	                        });
	                    }
	                    var wid = child.length >= 1 ? n : [];
	                    data.push({ wbid: $(item).attr('id'), wid: wid });

	                    var layouts = getGridData()[i];

	                    layData.push({
	                        "wbid": "widgetbox" + (i + 1),
	                        "attr": {
	                            "width": "col-md-" + layouts
	                        }
	                    });
	                });

	                var templateId = $('#designerContent').attr('code');

	                //viewId = viewId != null ? viewId : '';
	                data = {
	                    //viewId: viewId,
	                    order: data,
	                    templateId: templateId,
	                    layoutId: layoutId,
	                    layout: layData,
	                    modifytime: modifytime
	                };

	                var parm = (0, _stringify2.default)(data);
	                if ($("#designerContent .well").length == 0) {
	                    alert("请选择一个小部件");
	                    return false;
	                }

	                var hash = location.hash;
	                var url = hash.match(/\#\/layout\//ig) != null ? contextRoot + "/layout/design/save" : contextRoot + "/page/sort/save";

	                var option = {
	                    url: url,
	                    dataType: 'json',
	                    type: 'post',
	                    data: parm,
	                    contentType: 'application/json',
	                    success: function success(res) {
	                        if (res.status == '1') {
	                            $('#content').removeAttr('identity');
	                            alert("保存成功");
	                        } else {
	                            alert(res.message);
	                        }
	                        $('#designer').modal('hide');
	                    },
	                    error: function error(XMLHttpRequest) {
	                        errorLogin(XMLHttpRequest);
	                    }

	                    //订阅save方法
	                };if (typeof PubSub != 'undefined' && PubSub.publish('designer.save', option)) {} else {
	                    $.ptAjax(option);
	                }
	            });
	        },
	        setLayout: function setLayout(_setLayout) {
	            var _this = this;

	            function layoutData(layoutStr) {
	                var l = $(layoutStr).children(),
	                    d = [];
	                $.each(l, function (i, item) {
	                    var num = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
	                    d.push(num);
	                });
	                return d;
	            }

	            $.ptAjax({
	                url: contextRoot + "/layout/tpl/list",
	                dataType: 'json',
	                type: 'get',
	                contentType: 'application/json',
	                success: function success(res) {
	                    if (res.status == '1') {
	                        if (res.data && res.data.length) {
	                            var data = res.data;
	                            var str = [];
	                            $("#tool-panel-layout").data('res', data);
	                            $.each(data, function (i, item) {
	                                var num = item.tpl.match(/ui-grid/ig);
	                                var selected = i == 0 ? 'selected' : '';
	                                str.push('<div id="' + item.name + '"  class="container item-layout ' + selected + '">' + item.tpl + '</div>');
	                            });
	                            $("#tool-panel-layout").html(str.join(''));

	                            if (data[0] && !_this.options.viewId && _setLayout) {
	                                $("#designerContent").html(data[0].tpl).attr("code", data[0].id);
	                            }
	                            _this.options.layout.initSortable($('.widgetBox'));
	                        }
	                    }
	                },
	                error: function error(XMLHttpRequest) {
	                    errorLogin(XMLHttpRequest);
	                }
	            });
	        }

	    };

	    return Toolbar;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(34);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ }),
/* 194 */
/***/ (function(module, exports) {

	module.exports = "<div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"designer\" aria-hidden=\"true\" id=\"designer\" class=\"modal fade\">\n    <div class=\"modal-dialog modal-center\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <ol class=\"breadcrumb hide\">\n                    <li><a href=\"index.html\">首页</a></li>\n                    <li>布局管理</li>\n                    <li>编辑</li>\n                </ol>\n                     <span class=\"panel-save hide\">\n                         <button class=\"btn btn-primary\">保存</button>\n                         <button class=\"btn\" data-dismiss=\"modal\" aria-label=\"Close\">取消</button>\n                         <button class=\"btn\" >重置</button>\n                     </span>\n            </div>\n            <div class=\"modal-body widget-edit-body\" >\n                <div id=\"designerContent\">\n                </div>\n                <div id=\"toolbars\"></div>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Liushaozhen on 2016/9/12.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	    var _init = function _init(sysCode, content) {
	        /* var res={
	             "status" : "1",
	             "message" : null,
	             "data" : [ {
	                 "title" : "用户名1",
	                 "id" : "usercode",
	                 "required" : true,
	                 "visable" : true,
	                 "ispassword" : false,
	                 "isusercode" : false
	             }, {
	                 "title" : "公司1",
	                 "id" : "corp",
	                 "required" : true,
	                 "visable" : true,
	                 "ispassword" : false,
	                 "isusercode" : false
	             } ]
	         };*/
	        $.ptAjax({
	            url: '/integration/usermapping/system/verifyitem/' + sysCode,
	            dataType: 'json',
	            type: 'get',
	            async: false,
	            contentType: 'application/json',
	            success: function success(res) {
	                if (res.status == "1") {
	                    var html = __webpack_require__(196);
	                    content.innerHTML = html;
	                    var str = '';
	                    if (res.data && res.data.length) {
	                        for (var i = 0; i < res.data.length; i++) {
	                            var temp = res.data[i];
	                            var visable = temp.visable == true ? '' : 'hide';
	                            var require = temp.required == true ? '<div class="u-input-group-before" style="color: red;right:0">*</div>' : '';
	                            var requireAttr = temp.required == true ? 'require="1"' : '';
	                            var password = temp.ispassword == true ? 'password' : 'text';
	                            var defVal = temp.defVal == null ? '' : temp.defVal;
	                            str += '<div class="u-form-group u-has-feedback ' + visable + '"><label class="u-col-2 u-form-label ">' + temp.title + '</label>' + '<input ' + requireAttr + ' type="' + password + '" class="u-form-control u-col-10" name="' + temp.id + '" value="' + defVal + '">' + require + '</div>';
	                        }
	                        if (!str) {
	                            str = '暂无凭证关联信息';
	                        }
	                        $('#userRelevance').find('form').html(str);
	                        //content.innerHTML = $('#userRelevance').html();
	                    }
	                } else {
	                    alert(res.message);
	                }
	            }
	        });
	        function getParams(name) {
	            var url = window.location.hash.split('?')[1];
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var str = null;
	            if (url) {
	                str = url.match(reg);
	            }
	            if (str != null) return str[2];
	            return null;
	        };
	        $('.userRelevance').find('.u-msg-ok').on('click', function () {
	            var str = '';
	            $('input[require="1"]').each(function (i, v) {
	                if (!$(v).val()) {
	                    str += $(v).prev().html() + ' ';
	                }
	            });
	            if (str) {
	                str += ' 不能为空';
	                alert(str);
	                return;
	            }
	            var ary = $('.userRelevance').find('form').serializeArray();
	            var data = [];
	            for (var i = 0; i < ary.length; i++) {
	                var obj = {};
	                obj.id = ary[i].name;
	                obj.value = ary[i].value;
	                data.push(obj);
	            }
	            data.push({ id: "pt_systemcode", value: sysCode });
	            data.push({ id: "pt_usercode", value: $.cookie('u_usercode') });
	            $.ptAjax({
	                url: '/integration/usermapping/credential',
	                dataType: 'json',
	                data: (0, _stringify2.default)(data),
	                type: 'post',
	                contentType: 'application/json',
	                success: function success(res) {
	                    if (res.status == "1") {
	                        alert('关联成功');
	                        var flag = getParams('flag');
	                        if (flag) {
	                            window.history.go(-1);
	                        } else {
	                            if (window.parent) {
	                                window.parent.location.reload(true);
	                            }
	                        }
	                    } else {
	                        alert(res.message);
	                    }
	                }
	            });
	        });
	        $('.userRelevance').find(".u-msg-cancel").on('click', function () {
	            window.history.go(-1);
	        });
	    };
	    return {
	        init: function init(sysCode, content) {
	            _init(sysCode, content);
	        }
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 196 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"u-container\" id=\"userRelevance\">\n    <div class=\"userRelevance margin-top-30 margin-left-20 margin-right-20\">\n        <div class=\"u-msg-title\">\n            <h4 >凭证管理</h4>\n        </div>\n        <div class=\"u-msg-content padding-20 margin-top-20\" style=\"background: #fff\">\n            <form>\n                <!-- <div class=\"u-form-group\"><label class=\"u-col-2 u-form-label \">用户名</label>\n                     <input type=\"text\" class=\"u-form-control u-col-10\">\n                 </div>\n                 <div class=\"u-form-group\"><label class=\"u-col-2 u-form-label \">公司</label>\n                     <input type=\"text\" class=\"u-form-control u-col-10\">\n                 </div>-->\n            </form>\n        </div>\n        <div class=\"u-msg-footer width-full clearfix padding-bottom-10\" style=\"background: #fff\">\n            <button class=\"u-msg-cancel u-button pull-right\">取消<span class=\"u-button-container\"><span\n                    class=\"u-ripple\"></span></span>\n            </button>\n            <button class=\"u-msg-ok u-button u-button-info pull-right\">保存<span class=\"u-button-container\"><span class=\"u-ripple\"></span></span>\n            </button>\n\n        </div>\n    </div>\n</div>\n\n";

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.1.0
	 */

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(198);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	      GET_THEN_ERROR.error = null;
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;

	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);

	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }

	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._result = new Array(this.length);

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;

	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;

	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);

	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;

	Promise.prototype = {
	  constructor: Promise,

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};

	function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }

	    var P = local.Promise;

	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }

	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }

	    local.Promise = Promise;
	}

	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;

	return Promise;

	})));
	//# sourceMappingURL=es6-promise.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97), (function() { return this; }())))

/***/ }),
/* 198 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 199 */
/***/ (function(module, exports) {

	"use strict";

	(function (o) {
		//ajax 306 处理
		var until = {
			getParam: function getParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);return null;
			},
			getQueryString: function getQueryString(name) {
				return this.getParam(name);
			},
			errorLogin: function errorLogin(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == '306') {
					location.href = '/portal/login.html?r=L3BvcnRhbC8';
				}
			},
			crosser: function crosser(w, h, iframeid) {
				var _iframeid = "__url_gadget-site-" + iframeid;
				$("#" + _iframeid).attr({ 'width': '100%', 'height': h });
			},
			addRouter: function addRouter(path, func) {
				var pos = path.indexOf('/:');
				var truePath = path;
				if (pos != -1) truePath = path.substring(0, pos);
				func = func || function () {
					var params = arguments;
					initLayout(contextRoot + '/data:layout' + truePath, params);
				};
				var tmparray = truePath.split("/");
				if (tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
					return;
				} else {
					router.on(path, func);
					router.on('before', path, function () {
						var design = $("#design");
						if (navigator.userAgent.indexOf("iPad") != -1 || getBrowserVersion() == 'IE8') {} else {
							design.html('<i class="portalfont icon-personalized"></i>个性化').parent().show();
							design.parent().parent().find('.divider').show();
						}

						design.attr("path", path.replace(/#|\//ig, ''));
					});
					router.on('after', path, function () {
						var design = $("#design");
						if (design.attr("sortalbe") == "true") {
							var r = confirm("有尚未保存的内容,保存吗?");
							if (r == true) {
								$("#design").trigger("click");
							}
						}
						design.attr({ "path": "", "sortalbe": "false" }).parent().hide();
						design.parent().parent().find('.divider').hide();
					});
				}
			},
			registerRouter: function registerRouter(id, path) {
				var routeInit = function routeInit(p) {
					return function () {
						var module = p;
						requirejs.undef(module);
						var content = document.getElementById("content");
						window.require([module], function (module) {
							ko.cleanNode(content);
							content.innerHTML = "";
							module.init(content);
						});
					};
				};
				router.on(id, routeInit(path));
			},
			initLayout: function initLayout(p, params) {
				var module = p;
				var load = window.require;
				requirejs.undef(module);
				if (params.length == 1) params = params[0];
				load([module], function (module) {
					$('#content').html('');
					module.init(params);
				});
			},
			initLayoutTemplate: function initLayoutTemplate(p, params) {
				var module = p;
				var load = window.require;
				requirejs.undef(module);
				load([module], function (module) {
					module.init(params);
				});
			},
			rebindView: function rebindView(oldViewId, newViewId) {
				var idx = -1;
				var layoutRoutes = window.router.routes[oldViewId].on;
				if ($.isArray(layoutRoutes)) {
					var len = layoutRoutes.length;
					for (var k = 0; k < len; k++) {
						if (layoutRoutes[k].toString().indexOf("initLayout") != -1) {
							idx = k;
						}
					}
					layoutRoutes.splice(idx, 0);
				} else {
					window.router.routes[oldViewId].on = [];
				}
				//fix:跳转到新地址
				window.addRouter("/" + oldViewId, function () {
					window.router.setRoute("/" + newViewId);
				});

				window.addRouter("/" + newViewId);
			},
			include: function include(html, target) {
				$(target).load(html);
			},
			getBrowserVersion: function getBrowserVersion() {
				var userAgent = navigator.userAgent.toLowerCase();
				if (userAgent.match(/msie ([\d.]+)/) != null) {
					//ie6--ie9
					uaMatch = userAgent.match(/msie ([\d.]+)/);
					return 'IE' + uaMatch[1].match(/\d/);
				} else if (userAgent.match(/(trident)\/([\w.]+)/)) {
					uaMatch = userAgent.match(/trident\/([\w.]+)/);
					switch (uaMatch[1]) {
						case "4.0":
							return "IE8";
							break;
						case "5.0":
							return "IE9";
							break;
						case "6.0":
							return "IE10";
							break;
						case "7.0":
							return "IE11";
							break;
						default:
							return "undefined";
					}
				}
				return "undefined";
			},
			/**
	   * 获得小部件信息的默认值
	   * @param id  小部件id
	   * @param key  属性key
	   */
			getWidgetAttr: function getWidgetAttr(id, key) {
				var res = window.container.service_.cachedMetadatas_;
				var data = {},
				    obj = {};
				for (var attr in res) {
					var ary = attr.split('?')[1].split('&');
					if (id == ary[0].split('=')[1]) {
						data = res[attr]['userPrefs'];
					}
				}
				if (key) {
					if (data && data[key] && data[key]['defaultValue']) {
						return obj[key] = data[key]['defaultValue'];
					}
				} else {
					for (var attr in data) {
						obj[attr] = data[attr]['defaultValue'];
					}
					return obj;
				}
			},
			/**
	   * 提示消息
	   * @param msg  提示消息内容(不写则显示默认的操作成功和操作失败)
	         * @param type 提示消息类型:成功(success),失败(error),警告(warn),默认success
	         * @param time 设置提示消息显示多久后消失，单位毫秒，默认2000毫秒
	         */
			message: function message(msg, type, time) {
				time = time || 2000;
				type = type || 'success';
				var message = $('body').children('.u-message');
				msg = msg || message.find('span.msg').eq(0).html();
				if (type == 'success') {
					message = $('body').children('.u-message.u-mesinfo');
				} else if (type == 'error') {
					message = $('body').children('.u-message.u-mesdanger');
				} else if (type == 'warn') {
					message = $('body').children('.u-message.u-meswarning');
				}
				message.find('span.msg').eq(0).html(msg);
				message.show();
				message.css('left', ($('body').width() - message.find('i').eq(0).width()) / 2);
				message.width(message.find('i').eq(0).width() + 20);
				message.css('opacity', 1);
				window.setTimeout(function () {
					message.hide();
					message.css('opacity', '0');
				}, time);
			},
			/**
	   * 显示等待效果图
	   */
			loadShow: function loadShow() {
				$('#uLoadeBack').show();
				$('#uLoad').show();
			},
			/**
	   * 隐藏等待效果图
	   */
			loadHide: function loadHide() {
				$('#uLoadeBack').hide();
				$('#uLoad').hide();
			}
		};
		$.extend(o, until);
	})(window);

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof2 = __webpack_require__(38);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org

	https://github.com/mroderick/PubSubJS
	*/
	(function (root, factory) {
		'use strict';

		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') {
			// CommonJS
			factory(exports);
		}

		// Browser globals
		var PubSub = {};
		root.PubSub = PubSub;
		factory(PubSub);
	})((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window || undefined, function (PubSub) {
		'use strict';

		var messages = {},
		    lastUid = -1;

		function hasKeys(obj) {
			var key;

			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					return true;
				}
			}
			return false;
		}

		/**
	  *	Returns a function that throws the passed exception, for use as argument for setTimeout
	  *	@param { Object } ex An Error object
	  */
		function throwException(ex) {
			return function reThrowException() {
				throw ex;
			};
		}

		function callSubscriberWithDelayedExceptions(subscriber, message, data) {
			try {
				subscriber(message, data);
			} catch (ex) {
				setTimeout(throwException(ex), 0);
			}
		}

		function callSubscriberWithImmediateExceptions(subscriber, message, data) {
			subscriber(message, data);
		}

		function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
			var subscribers = messages[matchedMessage],
			    callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
			    s;

			if (!messages.hasOwnProperty(matchedMessage)) {
				return;
			}

			for (s in subscribers) {
				if (subscribers.hasOwnProperty(s)) {
					callSubscriber(subscribers[s], originalMessage, data);
				}
			}
		}

		function createDeliveryFunction(message, data, immediateExceptions) {
			return function deliverNamespaced() {
				var topic = String(message),
				    position = topic.lastIndexOf('.');

				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);

				// trim the hierarchy and deliver message to each level
				while (position !== -1) {
					topic = topic.substr(0, position);
					position = topic.lastIndexOf('.');
					deliverMessage(message, topic, data, immediateExceptions);
				}
			};
		}

		function messageHasSubscribers(message) {
			var topic = String(message),
			    found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic])),
			    position = topic.lastIndexOf('.');

			while (!found && position !== -1) {
				topic = topic.substr(0, position);
				position = topic.lastIndexOf('.');
				found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic]));
			}

			return found;
		}

		function publish(message, data, sync, immediateExceptions) {
			var deliver = createDeliveryFunction(message, data, immediateExceptions),
			    hasSubscribers = messageHasSubscribers(message);

			if (!hasSubscribers) {
				return false;
			}

			if (sync === true) {
				deliver();
			} else {
				setTimeout(deliver, 0);
			}
			return true;
		}

		/**
	  *	PubSub.publish( message[, data] ) -> Boolean
	  *	- message (String): The message to publish
	  *	- data: The data to pass to subscribers
	  *	Publishes the the message, passing the data to it's subscribers
	 **/
		PubSub.publish = function (message, data) {
			return publish(message, data, false, PubSub.immediateExceptions);
		};

		/**
	  *	PubSub.publishSync( message[, data] ) -> Boolean
	  *	- message (String): The message to publish
	  *	- data: The data to pass to subscribers
	  *	Publishes the the message synchronously, passing the data to it's subscribers
	 **/
		PubSub.publishSync = function (message, data) {
			return publish(message, data, true, PubSub.immediateExceptions);
		};

		/**
	  *	PubSub.subscribe( message, func ) -> String
	  *	- message (String): The message to subscribe to
	  *	- func (Function): The function to call when a new message is published
	  *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
	  *	you need to unsubscribe
	 **/
		PubSub.subscribe = function (message, func) {
			if (typeof func !== 'function') {
				return false;
			}

			// message is not registered yet
			if (!messages.hasOwnProperty(message)) {
				messages[message] = {};
			}

			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;

			// return token for unsubscribing
			return token;
		};

		/* Public: Clears all subscriptions
	  */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
			messages = {};
		};

		/*Public: Clear subscriptions by the topic
	 */
		PubSub.clearSubscriptions = function clearSubscriptions(topic) {
			var m;
			for (m in messages) {
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0) {
					delete messages[m];
				}
			}
		};

		/* Public: removes subscriptions.
	  * When passed a token, removes a specific subscription.
	  * When passed a function, removes all subscriptions for that function
	  * When passed a topic, removes all subscriptions for that topic (hierarchy)
	  *
	  * value - A token, function or topic to unsubscribe.
	  *
	  * Examples
	  *
	  *		// Example 1 - unsubscribing with a token
	  *		var token = PubSub.subscribe('mytopic', myFunc);
	  *		PubSub.unsubscribe(token);
	  *
	  *		// Example 2 - unsubscribing with a function
	  *		PubSub.unsubscribe(myFunc);
	  *
	  *		// Example 3 - unsubscribing a topic
	  *		PubSub.unsubscribe('mytopic');
	  */
		PubSub.unsubscribe = function (value) {
			var isTopic = typeof value === 'string' && messages.hasOwnProperty(value),
			    isToken = !isTopic && typeof value === 'string',
			    isFunction = typeof value === 'function',
			    result = false,
			    m,
			    message,
			    t;

			if (isTopic) {
				delete messages[value];
				return;
			}

			for (m in messages) {
				if (messages.hasOwnProperty(m)) {
					message = messages[m];

					if (isToken && message[value]) {
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}

					if (isFunction) {
						for (t in message) {
							if (message.hasOwnProperty(t) && message[t] === value) {
								delete message[t];
								result = true;
							}
						}
					}
				}
			}

			return result;
		};
	});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/*! http://mths.be/placeholder v2.1.1 by @mathias */
	(function (factory) {
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			// Browser globals
			factory(jQuery);
		}
	})(function () {
		// Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
		var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
		var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
		var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
		var valHooks = $.valHooks;
		var propHooks = $.propHooks;
		var hooks;
		var placeholder;

		if (isInputSupported && isTextareaSupported) {

			placeholder = $.fn.placeholder = function () {
				return this;
			};

			placeholder.input = placeholder.textarea = true;
		} else {

			var settings = {};

			placeholder = $.fn.placeholder = function (options) {

				var defaults = { customClass: 'placeholder' };
				settings = $.extend({}, defaults, options);

				var $this = this;
				$this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]').not('.' + settings.customClass).bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				}).data('placeholder-enabled', true).trigger('blur.placeholder');
				return $this;
			};

			placeholder.input = isInputSupported;
			placeholder.textarea = isTextareaSupported;

			hooks = {
				'get': function get(element) {
					var $element = $(element);

					var $passwordInput = $element.data('placeholder-password');
					if ($passwordInput) {
						return $passwordInput[0].value;
					}

					return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
				},
				'set': function set(element, value) {
					var $element = $(element);

					var $passwordInput = $element.data('placeholder-password');
					if ($passwordInput) {
						return $passwordInput[0].value = value;
					}

					if (!$element.data('placeholder-enabled')) {
						return element.value = value;
					}
					if (value === '') {
						element.value = value;
						// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
						if (element != safeActiveElement()) {
							// We can't use `triggerHandler` here because of dummy text/password inputs :(
							setPlaceholder.call(element);
						}
					} else if ($element.hasClass(settings.customClass)) {
						clearPlaceholder.call(element, true, value) || (element.value = value);
					} else {
						element.value = value;
					}
					// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
					return $element;
				}
			};

			if (!isInputSupported) {
				valHooks.input = hooks;
				propHooks.value = hooks;
			}
			if (!isTextareaSupported) {
				valHooks.textarea = hooks;
				propHooks.value = hooks;
			}

			$(function () {
				// Look for forms
				$(document).delegate('form', 'submit.placeholder', function () {
					// Clear the placeholder values so they don't get submitted
					var $inputs = $('.' + settings.customClass, this).each(clearPlaceholder);
					setTimeout(function () {
						$inputs.each(setPlaceholder);
					}, 10);
				});
			});

			// Clear placeholder values upon page reload
			$(window).bind('beforeunload.placeholder', function () {
				$('.' + settings.customClass).each(function () {
					this.value = '';
				});
			});
		}

		function args(elem) {
			// Return an object of element attributes
			var newAttrs = {};
			var rinlinejQuery = /^jQuery\d+$/;
			$.each(elem.attributes, function (i, attr) {
				if (attr.specified && !rinlinejQuery.test(attr.name)) {
					newAttrs[attr.name] = attr.value;
				}
			});
			return newAttrs;
		}

		function clearPlaceholder(event, value) {
			var input = this;
			var $input = $(input);
			if (input.value == $input.attr('placeholder') && $input.hasClass(settings.customClass)) {
				if ($input.data('placeholder-password')) {
					$input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
					// If `clearPlaceholder` was called from `$.valHooks.input.set`
					if (event === true) {
						return $input[0].value = value;
					}
					$input.focus();
				} else {
					input.value = '';
					$input.removeClass(settings.customClass);
					input == safeActiveElement() && input.select();
				}
			}
		}

		function setPlaceholder() {
			var $replacement;
			var input = this;
			var $input = $(input);
			var id = this.id;
			if (input.value === '') {
				if (input.type === 'password') {
					if (!$input.data('placeholder-textinput')) {
						try {
							$replacement = $input.clone().attr({ 'type': 'text' });
						} catch (e) {
							$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
						}
						$replacement.removeAttr('name').data({
							'placeholder-password': $input,
							'placeholder-id': id
						}).bind('focus.placeholder', clearPlaceholder);
						$input.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						}).before($replacement);
					}
					$input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', id).show();
					// Note: `$input[0] != input` now!
				}
				$input.addClass(settings.customClass);
				$input[0].value = $input.attr('placeholder');
			} else {
				$input.removeClass(settings.customClass);
			}
		}

		function safeActiveElement() {
			// Avoid IE9 `document.activeElement` of death
			// https://github.com/mathiasbynens/jquery-placeholder/pull/99
			try {
				return document.activeElement;
			} catch (exception) {}
		}
	});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = __webpack_require__(38);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Bootstrap v3.3.4 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */
	if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");+function (a) {
	  "use strict";
	  var b = a.fn.jquery.split(" ")[0].split(".");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
	}(jQuery), +function (a) {
	  "use strict";
	  function b() {
	    var a = document.createElement("bootstrap"),
	        b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };for (var c in b) {
	      if (void 0 !== a.style[c]) return { end: b[c] };
	    }return !1;
	  }a.fn.emulateTransitionEnd = function (b) {
	    var c = !1,
	        d = this;a(this).one("bsTransitionEnd", function () {
	      c = !0;
	    });var e = function e() {
	      c || a(d).trigger(a.support.transition.end);
	    };return setTimeout(e, b), this;
	  }, a(function () {
	    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function handle(b) {
	        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
	      } });
	  });
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var c = a(this),
	          e = c.data("bs.alert");e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
	    });
	  }var c = '[data-dismiss="alert"]',
	      d = function d(b) {
	    a(b).on("click", c, this.close);
	  };d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
	    function c() {
	      g.detach().trigger("closed.bs.alert").remove();
	    }var e = a(this),
	        f = e.attr("data-target");f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));var g = a(f);b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
	  };var e = a.fn.alert;a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
	    return a.fn.alert = e, this;
	  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.button"),
	          f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
	    });
	  }var c = function c(b, d) {
	    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
	  };c.VERSION = "3.3.4", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function (b) {
	    var c = "disabled",
	        d = this.$element,
	        e = d.is("input") ? "val" : "html",
	        f = d.data();b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
	      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
	    }, this), 0);
	  }, c.prototype.toggle = function () {
	    var a = !0,
	        b = this.$element.closest('[data-toggle="buttons"]');if (b.length) {
	      var c = this.$element.find("input");"radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change");
	    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));a && this.$element.toggleClass("active");
	  };var d = a.fn.button;a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
	    return a.fn.button = d, this;
	  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
	    var d = a(c.target);d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault();
	  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
	    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
	  });
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.carousel"),
	          f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b),
	          g = "string" == typeof b ? b : f.slide;e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
	    });
	  }var c = function c(b, _c) {
	    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
	  };c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, c.prototype.keydown = function (a) {
	    if (!/input|textarea/i.test(a.target.tagName)) {
	      switch (a.which) {case 37:
	          this.prev();break;case 39:
	          this.next();break;default:
	          return;}a.preventDefault();
	    }
	  }, c.prototype.cycle = function (b) {
	    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
	  }, c.prototype.getItemIndex = function (a) {
	    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
	  }, c.prototype.getItemForDirection = function (a, b) {
	    var c = this.getItemIndex(b),
	        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;if (d && !this.options.wrap) return b;var e = "prev" == a ? -1 : 1,
	        f = (c + e) % this.$items.length;return this.$items.eq(f);
	  }, c.prototype.to = function (a) {
	    var b = this,
	        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
	      b.to(a);
	    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
	  }, c.prototype.pause = function (b) {
	    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
	  }, c.prototype.next = function () {
	    return this.sliding ? void 0 : this.slide("next");
	  }, c.prototype.prev = function () {
	    return this.sliding ? void 0 : this.slide("prev");
	  }, c.prototype.slide = function (b, d) {
	    var e = this.$element.find(".item.active"),
	        f = d || this.getItemForDirection(b, e),
	        g = this.interval,
	        h = "next" == b ? "left" : "right",
	        i = this;if (f.hasClass("active")) return this.sliding = !1;var j = f[0],
	        k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });if (this.$element.trigger(k), !k.isDefaultPrevented()) {
	      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
	        this.$indicators.find(".active").removeClass("active");var l = a(this.$indicators.children()[this.getItemIndex(f)]);l && l.addClass("active");
	      }var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
	        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
	          i.$element.trigger(m);
	        }, 0);
	      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
	    }
	  };var d = a.fn.carousel;a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
	    return a.fn.carousel = d, this;
	  };var e = function e(c) {
	    var d,
	        e = a(this),
	        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));if (f.hasClass("carousel")) {
	      var g = a.extend({}, f.data(), e.data()),
	          h = e.attr("data-slide-to");h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
	    }
	  };a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
	    a('[data-ride="carousel"]').each(function () {
	      var c = a(this);b.call(c, c.data());
	    });
	  });
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    var c,
	        d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");return a(d);
	  }function c(b) {
	    return this.each(function () {
	      var c = a(this),
	          e = c.data("bs.collapse"),
	          f = a.extend({}, d.DEFAULTS, c.data(), "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b);!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
	    });
	  }var d = function d(b, c) {
	    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
	  };d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {
	    var a = this.$element.hasClass("width");return a ? "width" : "height";
	  }, d.prototype.show = function () {
	    if (!this.transitioning && !this.$element.hasClass("in")) {
	      var b,
	          e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
	        var f = a.Event("show.bs.collapse");if (this.$element.trigger(f), !f.isDefaultPrevented()) {
	          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));var g = this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;var h = function h() {
	            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
	          };if (!a.support.transition) return h.call(this);var i = a.camelCase(["scroll", g].join("-"));this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
	        }
	      }
	    }
	  }, d.prototype.hide = function () {
	    if (!this.transitioning && this.$element.hasClass("in")) {
	      var b = a.Event("hide.bs.collapse");if (this.$element.trigger(b), !b.isDefaultPrevented()) {
	        var c = this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;var e = function e() {
	          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
	        };return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
	      }
	    }
	  }, d.prototype.toggle = function () {
	    this[this.$element.hasClass("in") ? "hide" : "show"]();
	  }, d.prototype.getParent = function () {
	    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
	      var e = a(d);this.addAriaAndCollapsedClass(b(e), e);
	    }, this)).end();
	  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
	    var c = a.hasClass("in");a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
	  };var e = a.fn.collapse;a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
	    return a.fn.collapse = e, this;
	  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
	    var e = a(this);e.attr("data-target") || d.preventDefault();var f = b(e),
	        g = f.data("bs.collapse"),
	        h = g ? "toggle" : e.data();c.call(f, h);
	  });
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    b && 3 === b.which || (a(e).remove(), a(f).each(function () {
	      var d = a(this),
	          e = c(d),
	          f = { relatedTarget: this };e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)));
	    }));
	  }function c(b) {
	    var c = b.attr("data-target");c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));var d = c && a(c);return d && d.length ? d : b.parent();
	  }function d(b) {
	    return this.each(function () {
	      var c = a(this),
	          d = c.data("bs.dropdown");d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
	    });
	  }var e = ".dropdown-backdrop",
	      f = '[data-toggle="dropdown"]',
	      g = function g(b) {
	    a(b).on("click.bs.dropdown", this.toggle);
	  };g.VERSION = "3.3.4", g.prototype.toggle = function (d) {
	    var e = a(this);if (!e.is(".disabled, :disabled")) {
	      var f = c(e),
	          g = f.hasClass("open");if (b(), !g) {
	        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);var h = { relatedTarget: this };if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
	      }return !1;
	    }
	  }, g.prototype.keydown = function (b) {
	    if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
	      var d = a(this);if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
	        var e = c(d),
	            g = e.hasClass("open");if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");var h = " li:not(.disabled):visible a",
	            i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);if (i.length) {
	          var j = i.index(b.target);38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
	        }
	      }
	    }
	  };var h = a.fn.dropdown;a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
	    return a.fn.dropdown = h, this;
	  }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
	    a.stopPropagation();
	  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown);
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b, d) {
	    return this.each(function () {
	      var e = a(this),
	          f = e.data("bs.modal"),
	          g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b);f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
	    });
	  }var c = function c(b, _c2) {
	    this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
	      this.$element.trigger("loaded.bs.modal");
	    }, this));
	  };c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) {
	    return this.isShown ? this.hide() : this.show(a);
	  }, c.prototype.show = function (b) {
	    var d = this,
	        e = a.Event("show.bs.modal", { relatedTarget: b });this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
	      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
	        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
	      });
	    }), this.backdrop(function () {
	      var e = a.support.transition && d.$element.hasClass("fade");d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();var f = a.Event("shown.bs.modal", { relatedTarget: b });e ? d.$dialog.one("bsTransitionEnd", function () {
	        d.$element.trigger("focus").trigger(f);
	      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
	    }));
	  }, c.prototype.hide = function (b) {
	    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
	  }, c.prototype.enforceFocus = function () {
	    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
	      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
	    }, this));
	  }, c.prototype.escape = function () {
	    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
	      27 == a.which && this.hide();
	    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
	  }, c.prototype.resize = function () {
	    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
	  }, c.prototype.hideModal = function () {
	    var a = this;this.$element.hide(), this.backdrop(function () {
	      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
	    });
	  }, c.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
	  }, c.prototype.backdrop = function (b) {
	    var d = this,
	        e = this.$element.hasClass("fade") ? "fade" : "";if (this.isShown && this.options.backdrop) {
	      var f = a.support.transition && e;if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
	        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
	      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass("in");var g = function g() {
	        d.removeBackdrop(), b && b();
	      };a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
	    } else b && b();
	  }, c.prototype.handleUpdate = function () {
	    this.adjustDialog();
	  }, c.prototype.adjustDialog = function () {
	    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" });
	  }, c.prototype.resetAdjustments = function () {
	    this.$element.css({ paddingLeft: "", paddingRight: "" });
	  }, c.prototype.checkScrollbar = function () {
	    var a = window.innerWidth;if (!a) {
	      var b = document.documentElement.getBoundingClientRect();a = b.right - Math.abs(b.left);
	    }this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
	  }, c.prototype.setScrollbar = function () {
	    var a = parseInt(this.$body.css("padding-right") || 0, 10);this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
	  }, c.prototype.resetScrollbar = function () {
	    this.$body.css("padding-right", this.originalBodyPad);
	  }, c.prototype.measureScrollbar = function () {
	    var a = document.createElement("div");a.className = "modal-scrollbar-measure", this.$body.append(a);var b = a.offsetWidth - a.clientWidth;return this.$body[0].removeChild(a), b;
	  };var d = a.fn.modal;a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
	    return a.fn.modal = d, this;
	  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
	    var d = a(this),
	        e = d.attr("href"),
	        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
	        g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
	      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
	        d.is(":visible") && d.trigger("focus");
	      });
	    }), b.call(f, g, this);
	  });
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.tooltip"),
	          f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;(e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
	    });
	  }var c = function c(a, b) {
	    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b);
	  };c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function (b, c, d) {
	    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
	      var g = e[f];if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
	        var h = "hover" == g ? "mouseenter" : "focusin",
	            i = "hover" == g ? "mouseleave" : "focusout";this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
	      }
	    }this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle();
	  }, c.prototype.getDefaults = function () {
	    return c.DEFAULTS;
	  }, c.prototype.getOptions = function (b) {
	    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b;
	  }, c.prototype.getDelegateOptions = function () {
	    var b = {},
	        c = this.getDefaults();return this._options && a.each(this._options, function (a, d) {
	      c[a] != d && (b[a] = d);
	    }), b;
	  }, c.prototype.enter = function (b) {
	    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c && c.$tip && c.$tip.is(":visible") ? void (c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
	      "in" == c.hoverState && c.show();
	    }, c.options.delay.show)) : c.show());
	  }, c.prototype.leave = function (b) {
	    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
	      "out" == c.hoverState && c.hide();
	    }, c.options.delay.hide)) : c.hide();
	  }, c.prototype.show = function () {
	    var b = a.Event("show.bs." + this.type);if (this.hasContent() && this.enabled) {
	      this.$element.trigger(b);var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);if (b.isDefaultPrevented() || !d) return;var e = this,
	          f = this.tip(),
	          g = this.getUID(this.type);this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
	          i = /\s?auto?\s?/i,
	          j = i.test(h);j && (h = h.replace(i, "") || "top"), f.detach().css({ top: 0, left: 0, display: "block" }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);var k = this.getPosition(),
	          l = f[0].offsetWidth,
	          m = f[0].offsetHeight;if (j) {
	        var n = h,
	            o = this.options.container ? a(this.options.container) : this.$element.parent(),
	            p = this.getPosition(o);h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h);
	      }var q = this.getCalculatedOffset(h, k, l, m);this.applyPlacement(q, h);var r = function r() {
	        var a = e.hoverState;e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
	      };a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r();
	    }
	  }, c.prototype.applyPlacement = function (b, c) {
	    var d = this.tip(),
	        e = d[0].offsetWidth,
	        f = d[0].offsetHeight,
	        g = parseInt(d.css("margin-top"), 10),
	        h = parseInt(d.css("margin-left"), 10);isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({ using: function using(a) {
	        d.css({ top: Math.round(a.top), left: Math.round(a.left) });
	      } }, b), 0), d.addClass("in");var i = d[0].offsetWidth,
	        j = d[0].offsetHeight;"top" == c && j != f && (b.top = b.top + f - j);var k = this.getViewportAdjustedDelta(c, b, i, j);k.left ? b.left += k.left : b.top += k.top;var l = /top|bottom/.test(c),
	        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
	        n = l ? "offsetWidth" : "offsetHeight";d.offset(b), this.replaceArrow(m, d[0][n], l);
	  }, c.prototype.replaceArrow = function (a, b, c) {
	    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
	  }, c.prototype.setContent = function () {
	    var a = this.tip(),
	        b = this.getTitle();a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
	  }, c.prototype.hide = function (b) {
	    function d() {
	      "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
	    }var e = this,
	        f = a(this.$tip),
	        g = a.Event("hide.bs." + this.type);return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this);
	  }, c.prototype.fixTitle = function () {
	    var a = this.$element;(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
	  }, c.prototype.hasContent = function () {
	    return this.getTitle();
	  }, c.prototype.getPosition = function (b) {
	    b = b || this.$element;var c = b[0],
	        d = "BODY" == c.tagName,
	        e = c.getBoundingClientRect();null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));var f = d ? { top: 0, left: 0 } : b.offset(),
	        g = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
	        h = d ? { width: a(window).width(), height: a(window).height() } : null;return a.extend({}, e, g, h, f);
	  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
	    return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
	  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
	    var e = { top: 0, left: 0 };if (!this.$viewport) return e;var f = this.options.viewport && this.options.viewport.padding || 0,
	        g = this.getPosition(this.$viewport);if (/right|left/.test(a)) {
	      var h = b.top - f - g.scroll,
	          i = b.top + f - g.scroll + d;h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
	    } else {
	      var j = b.left - f,
	          k = b.left + f + c;j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k);
	    }return e;
	  }, c.prototype.getTitle = function () {
	    var a,
	        b = this.$element,
	        c = this.options;return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
	  }, c.prototype.getUID = function (a) {
	    do {
	      a += ~~(1e6 * Math.random());
	    } while (document.getElementById(a));return a;
	  }, c.prototype.tip = function () {
	    return this.$tip = this.$tip || a(this.options.template);
	  }, c.prototype.arrow = function () {
	    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
	  }, c.prototype.enable = function () {
	    this.enabled = !0;
	  }, c.prototype.disable = function () {
	    this.enabled = !1;
	  }, c.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled;
	  }, c.prototype.toggle = function (b) {
	    var c = this;b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
	  }, c.prototype.destroy = function () {
	    var a = this;clearTimeout(this.timeout), this.hide(function () {
	      a.$element.off("." + a.type).removeData("bs." + a.type);
	    });
	  };var d = a.fn.tooltip;a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
	    return a.fn.tooltip = d, this;
	  };
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.popover"),
	          f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;(e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
	    });
	  }var c = function c(a, b) {
	    this.init("popover", a, b);
	  };if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
	    return c.DEFAULTS;
	  }, c.prototype.setContent = function () {
	    var a = this.tip(),
	        b = this.getTitle(),
	        c = this.getContent();a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
	  }, c.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent();
	  }, c.prototype.getContent = function () {
	    var a = this.$element,
	        b = this.options;return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
	  }, c.prototype.arrow = function () {
	    return this.$arrow = this.$arrow || this.tip().find(".arrow");
	  };var d = a.fn.popover;a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
	    return a.fn.popover = d, this;
	  };
	}(jQuery), +function (a) {
	  "use strict";
	  function b(c, d) {
	    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
	  }function c(c) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.scrollspy"),
	          f = "object" == (typeof c === "undefined" ? "undefined" : (0, _typeof3.default)(c)) && c;e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
	    });
	  }b.VERSION = "3.3.4", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
	  }, b.prototype.refresh = function () {
	    var b = this,
	        c = "offset",
	        d = 0;this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
	      var b = a(this),
	          e = b.data("target") || b.attr("href"),
	          f = /^#./.test(e) && a(e);return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
	    }).sort(function (a, b) {
	      return a[0] - b[0];
	    }).each(function () {
	      b.offsets.push(this[0]), b.targets.push(this[1]);
	    });
	  }, b.prototype.process = function () {
	    var a,
	        b = this.$scrollElement.scrollTop() + this.options.offset,
	        c = this.getScrollHeight(),
	        d = this.options.offset + c - this.$scrollElement.height(),
	        e = this.offsets,
	        f = this.targets,
	        g = this.activeTarget;if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);if (g && b < e[0]) return this.activeTarget = null, this.clear();for (a = e.length; a--;) {
	      g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
	    }
	  }, b.prototype.activate = function (b) {
	    this.activeTarget = b, this.clear();var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
	        d = a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
	  }, b.prototype.clear = function () {
	    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
	  };var d = a.fn.scrollspy;a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
	    return a.fn.scrollspy = d, this;
	  }, a(window).on("load.bs.scrollspy.data-api", function () {
	    a('[data-spy="scroll"]').each(function () {
	      var b = a(this);c.call(b, b.data());
	    });
	  });
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.tab");e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
	    });
	  }var c = function c(b) {
	    this.element = a(b);
	  };c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
	    var b = this.element,
	        c = b.closest("ul:not(.dropdown-menu)"),
	        d = b.data("target");if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
	      var e = c.find(".active:last a"),
	          f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
	          g = a.Event("show.bs.tab", { relatedTarget: e[0] });if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
	        var h = a(d);this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
	          e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
	        });
	      }
	    }
	  }, c.prototype.activate = function (b, d, e) {
	    function f() {
	      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
	    }var g = d.find("> .active"),
	        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
	  };var d = a.fn.tab;a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
	    return a.fn.tab = d, this;
	  };var e = function e(c) {
	    c.preventDefault(), b.call(a(this), "show");
	  };a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
	}(jQuery), +function (a) {
	  "use strict";
	  function b(b) {
	    return this.each(function () {
	      var d = a(this),
	          e = d.data("bs.affix"),
	          f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
	    });
	  }var c = function c(b, d) {
	    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
	  };c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function (a, b, c, d) {
	    var e = this.$target.scrollTop(),
	        f = this.$element.offset(),
	        g = this.$target.height();if (null != c && "top" == this.affixed) return c > e ? "top" : !1;if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";var h = null == this.affixed,
	        i = h ? e : f.top,
	        j = h ? g : b;return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
	  }, c.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a = this.$target.scrollTop(),
	        b = this.$element.offset();return this.pinnedOffset = b.top - a;
	  }, c.prototype.checkPositionWithEventLoop = function () {
	    setTimeout(a.proxy(this.checkPosition, this), 1);
	  }, c.prototype.checkPosition = function () {
	    if (this.$element.is(":visible")) {
	      var b = this.$element.height(),
	          d = this.options.offset,
	          e = d.top,
	          f = d.bottom,
	          g = a(document.body).height();"object" != (typeof d === "undefined" ? "undefined" : (0, _typeof3.default)(d)) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));var h = this.getState(g, b, e, f);if (this.affixed != h) {
	        null != this.unpin && this.$element.css("top", "");var i = "affix" + (h ? "-" + h : ""),
	            j = a.Event(i + ".bs.affix");if (this.$element.trigger(j), j.isDefaultPrevented()) return;this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
	      }"bottom" == h && this.$element.offset({ top: g - b - f });
	    }
	  };var d = a.fn.affix;a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
	    return a.fn.affix = d, this;
	  }, a(window).on("load", function () {
	    a('[data-spy="affix"]').each(function () {
	      var c = a(this),
	          d = c.data();d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
	    });
	  });
	}(jQuery);

/***/ }),
/* 203 */
/***/ (function(module, exports) {

	'use strict';

	;(function ($) {
		var _ajax = $.ajax;
		$.ptAjax = function (opt) {
			var fn = {
				error: function error(XMLHttpRequest, textStatus, errorThrown) {},
				success: function success(data, textStatus) {}
			};
			if (opt.error) {
				fn.error = opt.error;
			}
			if (opt.success) {
				fn.success = opt.success;
			}
			var _opt = $.extend(opt, {
				error: function error(XMLHttpRequest, textStatus, errorThrown) {
					_wrapError(errorThrown, textStatus, XMLHttpRequest);
					fn.error(XMLHttpRequest, textStatus, errorThrown);
				},
				success: function success(data, state, xhr) {
					if (_processXHRError(data, state, xhr)) {
						//notice: context must process 
						if (_opt.context) {
							fn.success.call(_opt.context, data, state);
						} else fn.success(data, state);
						_wrapSuccess(data, state);
					}
				},
				beforeSend: function beforeSend(XHR) {
					//显示等待
					$('#uLoadeBack').show();
					$('#uLoad').show();
				},
				complete: function complete(XHR, TS) {
					//requset success or failure also call
					//隐藏等待
					$('#uLoadeBack').hide();
					$('#uLoad').hide();
				}
			});
			var _processXHRError = function _processXHRError(rsl, state, xhr) {
				if (xhr && xhr.getResponseHeader && xhr.getResponseHeader("X-Error")) {
					alert(rsl["message"]);
					return false;
				}
				return true;
			};
			var _wrapSuccess = function _wrapSuccess(data, textStatus) {
				//to do ...
			};
			var _wrapError = function _wrapError(rsl, state, xhr) {
				_processXHRError(rsl, state, xhr);
				//to do ...
			};

			var _publishTopic = function _publishTopic(params) {
				var topic;
				if (params.topic) {
					topic = params.topic;
				} else {
					//默认取url  url: "/demo/layout/set/save",
					var urlarys = params.url.split("?")[0].split("/");
					var nurl = [];
					$.each(urlarys, function (i, n) {
						if (i != 0 && i != 1) {
							nurl.push(n);
						}
					});
					topic = "/" + nurl.join("/");
				}
				Topic.publish(topic, params);
			};

			var _wrapParam = function _wrapParam(params) {
				//to do
			};

			//platform process begin
			_wrapParam(_opt);

			_publishTopic(_opt);

			//adjust opt param
			opt.data = $.isEmptyObject(_opt.data) ? null : _opt.data;

			//fire ajax request
			return _ajax(_opt);
		};
	})(jQuery);

/***/ }),
/* 204 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ])
});
;