(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("tinper-bee"), require("axios"));
	else if (typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "tinper-bee", "axios"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("ReactDOM"), require("tinper-bee"), require("axios")) : factory(root["React"], root["ReactDOM"], root["tinper-bee"], root["axios"]);
		for (var i in a)(typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_91__, __WEBPACK_EXTERNAL_MODULE_99__) {
	return /******/ (function(modules) { // webpackBootstrap
		/******/ // The module cache
		/******/
		var installedModules = {};

		/******/ // The require function
		/******/
		function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/
			if (installedModules[moduleId])
			/******/
				return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/
			var module = installedModules[moduleId] = {
				/******/
				exports: {},
				/******/
				id: moduleId,
				/******/
				loaded: false
				/******/
			};

			/******/ // Execute the module function
			/******/
			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/
			module.loaded = true;

			/******/ // Return the exports of the module
			/******/
			return module.exports;
			/******/
		}


		/******/ // expose the modules object (__webpack_modules__)
		/******/
		__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/
		__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/
		__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/
		return __webpack_require__(0);
		/******/
	})
	/************************************************************************/
	/******/
	([
		/* 0 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _reactDom = __webpack_require__(2);

			var _Main = __webpack_require__(3);

			var _Main2 = _interopRequireDefault(_Main);

			__webpack_require__(151);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			(0, _reactDom.render)(_react2.default.createElement(_Main2.default, null), document.getElementById('app'));

			/***/
		}),
		/* 1 */
		/***/
		(function(module, exports) {

			module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

			/***/
		}),
		/* 2 */
		/***/
		(function(module, exports) {

			module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

			/***/
		}),
		/* 3 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

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

			var _inherits2 = __webpack_require__(83);

			var _inherits3 = _interopRequireDefault(_inherits2);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _reactDom = __webpack_require__(2);

			var _reactDom2 = _interopRequireDefault(_reactDom);

			var _tinperBee = __webpack_require__(91);

			var _reactCookie = __webpack_require__(92);

			var _reactCookie2 = _interopRequireDefault(_reactCookie);

			var _Tabs = __webpack_require__(97);

			var _Tabs2 = _interopRequireDefault(_Tabs);

			var _UserMenu = __webpack_require__(98);

			var _UserMenu2 = _interopRequireDefault(_UserMenu);

			var _RefreshMenu = __webpack_require__(100);

			var _RefreshMenu2 = _interopRequireDefault(_RefreshMenu);

			var _reactCustomScrollbars = __webpack_require__(101);

			var _directorRouter = __webpack_require__(126);

			var _axios = __webpack_require__(99);

			var _axios2 = _interopRequireDefault(_axios);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			var classNames = __webpack_require__(144);

			__webpack_require__(145).polyfill();
			__webpack_require__(146);
			__webpack_require__(147);
			__webpack_require__(148);

			__webpack_require__(149);
			window.designer = __webpack_require__(137);
			window.widgets = __webpack_require__(128);
			__webpack_require__(150);

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

			var App = function(_Component) {
				(0, _inherits3.default)(App, _Component);

				function App(props, context) {
					(0, _classCallCheck3.default)(this, App);

					var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props, context));

					var menus = _this.getTabs();

					var self = _this;

					_this.state = {
						current: "",
						openKeys: [],
						currentRouter: "",
						menu: [],
						expanded: false,
						firstUrl: "",
						curentOpenKeys: [],
						submenuSelected: "",
						isOpenTab: window.isOpenTab,
						menus: menus,
						tabNum: menus.length,
						showNotice: 0,
						curNum: 0,
						num: 0,
						clientHeight: document.body.clientHeight,
						reload: 0
					};

					_this.delTrigger();

					_this.showMenu = _this.showMenu.bind(_this);
					_this.setCurrent = _this.setCurrent.bind(_this);
					_this.del = _this.del.bind(_this);
					_this.handleClick = _this.handleClick.bind(_this);
					_this.handleRefreshClick = _this.handleRefreshClick.bind(_this);
					window.handleClick = _this.handleClick;
					return _this;
				}

				(0, _createClass3.default)(App, [{
					key: "delTrigger",
					value: function delTrigger() {
						var self = this;
						$("body").on("del", function(e, data) {
							sessionStorage["tabs"] = (0, _stringify2.default)(data.menus);

							sessionStorage["current"] = (0, _stringify2.default)({
								current: data.current
							});

							self.setState(data);
						});
						window.confirmDel = function(data) {
							$("body").trigger("del", [data]);
						};
					}
				}, {
					key: "onToggle",
					value: function onToggle(value) {
						//this.setState({expanded: value});
						var v = this.state.expanded;

						if (v) {
							var keys = this.state.openKeys;
							this.setState({
								expanded: !v,
								openKeys: [],
								curentOpenKeys: keys
							});
						} else {
							var _keys = this.state.curentOpenKeys;
							this.setState({
								expanded: !v,
								openKeys: _keys,
								curentOpenKeys: _keys
							});
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
					key: "handleDefault",
					value: function handleDefault(e, isDefault) {
						isDefault = isDefault == "_blank" ? false : true;
						if (window.isOpenTab && isDefault) {
							//dom.href = 'javascript:;'
							e.preventDefault();
						}
					}
				}, {
					key: "handleClick",
					value: function handleClick(e, reload) {
						//判断是否点击子菜单,1:当前子菜单，2:2级别子菜单。。。

						var self = this;

						// var data  = (e.keyPath.length==1)?{
						//     current: e.key,
						//     openKeys: [],
						//     submenuSelected:'',
						//     curentOpenKeys:[],
						//     userMenu:false
						// }:{
						//     current: e.key
						// };

						var tar = e.target || e.domEvent.target;

						var target = $(tar).closest("a");

						if (!target.is("a")) {
							return false;
						}
						var value = target.attr("value");

						var data = {
							current: value,
							showNotice: 0,
							reload: 0
						};

						if (typeof value == "undefined") {
							return false;
						}

						if (value == "logout") {
							return false;
						}

						var dom = target;
						var title = dom.attr("name");
						var router = dom.attr("href");

						var options = {
							title: title,
							router: router,
							id: value
						};

						var menu = this.state.menus;

						//点击已经选中的节点时
						if (value == this.state.current) {
							var url = location.hash;
							//window.router.dispatch('on', url.replace('#',''));
						} else {
							if (typeof dom != "undefined" && dom.attr("target") == "_blank") {
								return false;
							} else {
								var menuObj = JSON.parse((0, _stringify2.default)(menu));
								// 注释掉菜单数量的限制
								// if (
								//   menuObj.length == 11 &&
								//   JSON.stringify(menu).indexOf('"id":"' + options.id + '"') == -1 &&
								//   menu.length != 0
								// ) {
								//   self.setState({
								//     showNotice: 1
								//   });
								//   return false;
								// } else 
								if ((0, _stringify2.default)(menu).indexOf('"id":"' + options.id + '"') != -1) {
									data = {
										current: value,
										showNotice: 0,
										reload: reload ? 1 : 0,
										currentRouter: reload ? decodeURIComponent(decodeURIComponent(router.replace("#/ifr/", ""))) : ""
									};
								}
								this.setState(data);
							}
						}

						this.createTab(options);
					}
				}, {
					key: "handleRefreshClick",
					value: function handleRefreshClick(e, reload) {
						var self = this;
						var tar = e.target || e.domEvent.target;
						var target = $(tar).closest("a");
						if (!target.is("a")) {
							return false;
						}
						var value = target.attr("value");
						if (!value) {
							return false;
						}
						// 关闭页签逻辑
						if (value.indexOf('close') > -1) {
							var menu = self.state.menus,
								current = self.state.current,
								menuCloned = JSON.parse((0, _stringify2.default)(menu)),
								newMenu = menuCloned.slice(0, 1),
								newState;
							if (value == "closeAll") {
								newState = {
									menus: newMenu,
									current: menuCloned[0].id,
									router: menuCloned[0].router
									// 这里需要重新缓存当前id
								};
								sessionStorage["current"] = (0, _stringify2.default)({
									current: menuCloned[0].id
								});
							}
							if (value == "closeOther") {
								if (menuCloned.length > 1) {
									var tempMenu = {};
									for (var i = 0; i < menuCloned.length; i++) {
										if (current == menuCloned[i].id) {
											tempMenu = menuCloned[i];
										}
									}
									newMenu.push(tempMenu);
								}
								newState = {
									menus: newMenu
								};
							}
							// 重新缓存已打开的页签
							sessionStorage["tabs"] = (0, _stringify2.default)(newMenu);
							self.setState(newState);
							return false;
						}
						//刷新当前页逻辑  
						if (value == "refreshCurrent") {
							var ifr = document.getElementById(self.state.current);
							if (ifr) {
								ifr.contentWindow.location.reload(true);
							}
							return false;
						}
					}
				}, {
					key: "createTab",
					value: function createTab(options, value) {
						var self = this;

						if (!window.sessionStorage) {
							alert("This browser does NOT support sessionStorage");
							return false;
						}

						var menu = this.state.menus;

						if ((0, _stringify2.default)(menu).indexOf('"id":"' + options.id + '"') != -1 && menu.length != 0) {
							return false;
						}

						var menuObj = JSON.parse((0, _stringify2.default)(menu));
						// 注释掉对菜单数量的限制
						// if (menuObj.length == 11) {
						//   return false;
						// }

						menuObj[menuObj.length] = options;

						sessionStorage["tabs"] = (0, _stringify2.default)(menuObj);

						sessionStorage["current"] = (0, _stringify2.default)({
							current: options.id
						});

						this.setState({
							menus: menuObj,
							current: options.id
						});
					}
				}, {
					key: "getTabs",
					value: function getTabs() {
						if (!window.sessionStorage) {
							alert("This browser does NOT support sessionStorage");
							return false;
						}

						// var tabs = [];
						// for (var i =0;i<sessionStorage['tabs'].length;i++){
						//     var key = sessionStorage.key(i);
						//     var obj = JSON.parse(sessionStorage[key]);
						//     tabs.push(obj);
						// }

						var userId = sessionStorage["userId"];

						if (userId != undefined && userId != _reactCookie2.default.load("_A_P_userId")) {
							sessionStorage.clear();
						}

						sessionStorage["userId"] = _reactCookie2.default.load("_A_P_userId");

						var menus = sessionStorage["tabs"] != undefined ? JSON.parse(sessionStorage["tabs"]) : [];

						return menus;
					}
				}, {
					key: "setCurrent",
					value: function setCurrent(value) {
						var self = this;

						this.setState({
							current: value,
							showNotice: 0,
							reload: 0
						});

						sessionStorage["current"] = (0, _stringify2.default)({
							current: value
						});
					}
				}, {
					key: "del",
					value: function del(data) {
						sessionStorage["tabs"] = (0, _stringify2.default)(data.menus);

						sessionStorage["current"] = (0, _stringify2.default)({
							current: data.current
						});

						this.setState(data);
					}
				}, {
					key: "showMenu",
					value: function showMenu(e) {
						var state = this.state.userMenu;
						this.setState({
							userMenu: !state
						});
					}
				}, {
					key: "onOpenChange",
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

						this.setState({
							current: openKeys,
							submenuSelected: openKeys,
							openKeys: openKeys,
							expanded: false
						});
					}
					//IE下 array.find（）方法不可用

				}, {
					key: "myfilter",
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
					key: "getAncestorKeys",
					value: function getAncestorKeys(key) {
						var map = {
							sub3: ["sub2"]
						};
						return map[key] || [];
					}
				}, {
					key: "sessionStorage",
					value: function(_sessionStorage) {
						function sessionStorage(_x) {
							return _sessionStorage.apply(this, arguments);
						}

						sessionStorage.toString = function() {
							return _sessionStorage.toString();
						};

						return sessionStorage;
					}(function(openKeys) {
						if (sessionStorage && openKeys) {
							sessionStorage["openKeys"] = openKeys;
						} else {
							return sessionStorage["openKeys"];
						}
					})
				}, {
					key: "formmaterUrl",
					value: function formmaterUrl(item) {
						var uri = " ";
						if (item.urltype === "url") {
							var target = item.openview == "newpage" ? "_blank" : "";
							if (target) {
								// uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.location));
								uri = item.location;
							} else {
								uri = "#/ifr/" + encodeURIComponent(encodeURIComponent(item.location));
							}
							// if(uri.indexOf('?')!=-1){
							// 	uri+="&modulefrom=sidebar";
							// }else{
							// 	uri+="?modulefrom=sidebar"
							// }
							return uri;
						} else if (item.urltype === "plugin") {
							uri = item.id ? "#/" + item.id : "#/index_plugin";
							//window.registerRouter(uri.replace("#", ""), item.location);

							uri = encodeURIComponent(encodeURIComponent("index-view.html" + uri));
							// if(uri.indexOf('?')!=-1){
							// 	uri+="&modulefrom=sidebar";
							// }else{
							// 	uri+="?modulefrom=sidebar"
							// }
							return uri;
						} else if (item.urltype === "view") {
							uri = item.location;
							uri = uri.replace("#", "/");

							if (uri[0] == "/") {
								uri = "/sidebar" + uri;
							} else {
								uri = "/sidebar/" + uri;
							}
							// if(uri.indexOf('?')!=-1){
							// 	uri+="&modulefrom=sidebar";
							// }else{
							// 	uri+="?modulefrom=sidebar"
							// }
							// window.addRouter(uri);
							// return  "#"+uri;

							return encodeURIComponent(encodeURIComponent("index-view.html#" + uri));
						} else if (item.urltype == undefined) {
							item.location = "404";
							return "#/ifr/" + encodeURIComponent(encodeURIComponent(item.location));
						} else {
							return item.location;
						}
					}
				}, {
					key: "setMenu",
					value: function setMenu(response) {
						var self = this;
						var url = decodeURIComponent(decodeURIComponent(location.hash));

						var obj = sessionStorage["current"] != undefined ? JSON.parse(sessionStorage["current"]) : "";

						if (obj) {
							this.state.current = obj.current;

							return false;
						}

						response.data.data.map(function(item, index) {
							if (Array.isArray(item.children) && item.children.length > 0) {
								item.children.map(function(it, index) {
									var selected = url.indexOf(it.location || "null") >= 0 ? it.id : "";
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
								var selected = url.indexOf(item.location || "null") >= 0 ? item.id : "";
								if (selected) {
									self.setState({
										current: selected
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
					key: "resizeIfr",
					value: function resizeIfr() {
						var self = this;

						var autodiv = $("#" + self.state.current);
						var tabdiv = $("#portalTabsContainer");
						var reload = self.state.reload;

						//iframe刷新
						if (reload) {
							var ifr = document.getElementById(self.state.current);
							//ifr.contentWindow.location.href = self.state.currentRouter?self.state.currentRouter:ifr.contentWindow.location.href;
							autodiv.attr("src", self.state.currentRouter ? self.state.currentRouter : ifr.contentWindow.location.href);
						}

						function autoH() {
							var addh = document.body.clientHeight - 44;
							var tabw = document.body.clientWidth - 570;
							autodiv.height(addh);
							tabdiv.width(tabw);
							autodiv.css({
								overflow: "auto"
							});
						}
						autoH();
						if (autodiv) {
							autodiv.css({
								overflow: "auto"
							});
							$(window).resize(function() {
								autoH();
							});
						}
					}
				}, {
					key: "componentDidUpdate",
					value: function componentDidUpdate() {
						var self = this;
						self.resizeIfr();
						self.menubar();
					}
				}, {
					key: "componentDidMount",
					value: function componentDidMount() {
						var self = this;
						self.resizeIfr();
						self.menubar();
						self.confirm();
					}
				}, {
					key: "componentWillMount",
					value: function componentWillMount() {
						var self = this;
						_axios2.default.get(contextRoot + "/appmenumgr/sidebarList?r=" + Math.random()).then(function(response) {
							self.setMenu(response);

							self.setState({
								menu: response.data.data,
								num: response.data.data.length
							});

							window.menus = response.data.data;
							window.getBreadcrumb = function(id) {
								var menus = window.menus;
								var n1, n2, n3;

								$.each(menus, function(i, item) {
									if (id == item.id) {
										n1 = item;
										return false;
									}
									if (item.children && item.children.length > 0) {
										$.each(item.children, function(t, items) {
											if (id == items.id) {
												n2 = items;
												n1 = item;
												return false;
											}

											if (items.children && items.children.length > 0) {
												$.each(items.children, function(tt, itemss) {
													if (id == itemss.id) {
														n3 = itemss;
														n2 = items;
														n1 = item;
														return false;
													}
												});
											}
										});
									}
								});

								return function() {
									var data = [];
									$.each([n1, n2, n3], function(i, item) {
										if (item) {
											data.push(item.name);
										}
									});

									return data;
								}();
							};
							window.getCurrentMenu = function(id) {
								var menus = window.menus;
								var menuitem;
								$.each(menus, function(i, item) {
									if (item.id == id) {
										menuitem = item;
										return false;
									}
									if (item.children && item.children.length > 0) {
										$.each(item.children, function(i, item) {
											if (item.id == id) {
												menuitem = item;
												return false;
											}
											if (item.children && item.children.length > 0) {
												$.each(item.children, function(i, item) {
													if (item.id == id) {
														menuitem = item;
														return false;
													}
												});
											}
										});
									}
								});
								if (menuitem) {
									return menuitem;
								}
								return {};
							};
							self.initRouter();

							//var data = response;
							//window.router.every.after = function(){
							//    self.setMenu(data);
							//}
						}).catch(function(err) {
							console.log(err);
						});
					}
				}, {
					key: "initRouter",
					value: function initRouter() {
						var self = this;

						var router = window.router;
						router.init();
						//获取第一个节点数据

						//if(this.state.menu.length==0) return false;

						// this.state.menu[0].children = this.state.menu[0].children==null?[]:this.state.menu[0].children;

						// var item = this.state.menu[0].children!=null&&this.state.menu[0].children.length==0?this.state.menu[0]:this.state.menu[0].children[0];
						// var blank = item.openview=="newpage"?"_blank":"";
						// var oUrl = '',uri = encodeURIComponent(encodeURIComponent(item.location));
						// if(blank){
						//     oUrl = '#/ifrNoHead/' + uri;
						// }else{
						//     oUrl = '#/ifr/' + uri;
						// }
						// var url = oUrl.replace('#','');

						var item = {
							location: "pages/default/index.js",
							name: "首页",
							menustatus: "Y",
							children: null,
							icon: "iconfont icon-C-home",
							openview: "curnpage",
							menuId: "M0000000000002",
							urltype: "plugin",
							id: "index",
							isDefault: null,
							licenseControlFlag: 0
						};

						if (window.extendRouteRegister) {
							window.extendRouteRegister(router);
						}

						if (window.location.hash == "") {
							// if(oUrl.indexOf('ifrNoHead')>=0) {
							//     var open = window.open;
							//     open(oUrl);
							//     return false;
							// }

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
								router.dispatch("on", url);
							}
						} else {
							router.dispatch("on", window.location.hash.replace("#", ""));
						}
					}
				}, {
					key: "onTitleMouseEnter",
					value: function onTitleMouseEnter(e, domEvent) {
						var dom = $(e.domEvent.target).closest("li");
						var h = document.body.clientHeight;
						var w = document.body.clientWidth;

						this.setState({
							clientHeight: h
						});

						setTimeout(function() {
							var menu = dom.find(".u-menu");
							var arrow = dom.find(".arrow-menu");
							if (parseInt(dom.offset().top) + parseInt(menu.height()) > h) {
								if (parseInt(menu.height()) > parseInt(dom.offset().top)) {
									if (parseInt(menu.height()) > h) {
										menu.css({
											height: h - 115,
											width: menu.width() + 17,
											overflow: 'auto'
										});
									}
									menu.css({
										top: -(dom.offset().top - 50 - 20),
										bottom: 'inherit'
										// bottom: -(h - parseInt(dom.offset().top) - 50 - 20),
										// top: "inherit"
									});
									arrow.css({
										top: -(dom.offset().top - 50 - 20),
										bottom: 'inherit'
										// bottom: h - parseInt(dom.offset().top) - 50 + 15 - 20,
										// top: "inherit"
									});
								} else {
									menu.css({
										bottom: "0",
										top: "inherit"
									});
									arrow.css({
										bottom: "14px",
										top: "inherit"
									});
								}
							} else {
								menu.css({
									bottom: "inherit",
									top: "0"
								});
								arrow.css({
									bottom: "inherit",
									top: "14px"
								});
							}
						}, 0);
					}
				}, {
					key: "menubar",
					value: function menubar() {
						var cH = document.body.scrollHeight - 48 - 30;
						var sH = $(".u-menu-max1").height();
						//var menu = this.container.find('.menubar').parent();

						if (sH > cH) {
							$(".more-bar").show();
						}
					}
				}, {
					key: "scrollMenu",
					value: function scrollMenu(value, e) {
						// 减去header和collapsebar的高度以及出现的morebar的高度
						var h = document.body.clientHeight - 48 - 30 - 32;
						var showNum = parseInt(h / 48);

						var curNum = this.state.curNum + value;
						var num = this.state.num;

						if (curNum < 0) {
							curNum = 0;
							$(".arrow-up").addClass("lock");
							return false;
						} else if (curNum > num - showNum) {
							//fix: add 1 fake element
							curNum = num - showNum;
							$(".arrow-down").addClass("lock");
							return false;
						} else {
							$(".arrow-down,.arrow-up").removeClass("lock");
						}

						this.setState({
							curNum: curNum
						});
					}
				}, {
					key: "enter",
					value: function enter(e) {
						console.log(e);
					}
				}, {
					key: "leave",
					value: function leave(e) {
						console.log(e);
					}
				}, {
					key: "confirm",
					value: function confirm() {
						window.unloadNum = 0;
						window.onbeforeunload = function() {
							var tabs = JSON.parse(sessionStorage['tabs'])
							if(tabs.length>1 && unloadNum < 1) {
								window.unloadNum = window.unloadNum + 1;
								setTimeout(()=>{
									window.unloadNum = 0
								}, 5000)
								return '关闭后您打开的页签数据会自动清空'
							}
						};
						window.onunload = function(event) {
							if (event.clientX <= 0 && event.clientY < 0) {
								sessionStorage.clear();
							} else {
								if (location.href.match(/login\/login.html/gi) != null) {
									sessionStorage.clear();
								}
							}
						};
					}
				}, {
					key: "render",
					value: function render() {
						var self = this;

						var expanded = this.state.expanded ? "expanded" : "";
						var foldState = this.state.expanded ? "fold" : "unfold";
						var collapsed = this.state.expanded ? "collapsed" : "";

						var isSeleted = this.state.submenuSelected;
						var isOpenTab = this.state.isOpenTab;
						var TabBox = "";

						var togCon = _react2.default.createElement("span", {
							className: "uf uf-navmenu-light"
						});

						var props = {
							current: self.state.current,
							menus: self.state.menus,
							tabNum: self.state.menus.length,
							setCurrent: self.setCurrent,
							del: self.del,
							showNotice: self.state.showNotice
						};

						var UserMenuObj = {
							formmaterUrl: self.formmaterUrl,
							handleClick: self.handleClick,
							handleDefault: self.handleDefault
						};

						var menu = _react2.default.createElement(_UserMenu2.default, UserMenuObj);
						var refreshmenu = _react2.default.createElement(_RefreshMenu2.default, {
							handleRefreshClick: self.handleRefreshClick
						});
						if (isOpenTab) {
							TabBox = _react2.default.createElement(_Tabs2.default, props);
						} else {
							TabBox = "";
						}

						return _react2.default.createElement(
							"div", {
								id: "portal",
								className: "portal-expand " + collapsed
							},
							_react2.default.createElement(
								_tinperBee.Navbar, {
									fluid: true,
									className: "portal-navbar " + expanded,
									expanded: this.state.expanded,
									onToggle: this.onToggle.bind(this)
								},
								_react2.default.createElement(
									"div", {
										className: "portal-logo-ui"
									},
									_react2.default.createElement(
										"span",
										null,
										_react2.default.createElement("img", {
											alt: "image",
											src: "./images/portal-logo.png"
										})
									)
								),
								_react2.default.createElement(
									"div", {
										className: "portal-tabs-ui"
									},
									_react2.default.createElement("a", {
										className: "ui-collapse-sidebar",
										onClick: this.onToggle.bind(this)
									}),
									TabBox
								),
								_react2.default.createElement(
									Nav, {
										pullRight: true,
										className: "portal-nav",
										onClick: self.showMenu.bind(self)
									},
									_react2.default.createElement(
										"div", {
											id: "bs-example-navbar-collapse-9",
											className: "collapse navbar-collapse navbar-right"
										},
										_react2.default.createElement(
											Menu, {
												className: "nav navbar-nav"
											},
											_react2.default.createElement(
												"li", {
													className: "dropdown"
												},
												_react2.default.createElement(
													_tinperBee.Dropdown, {
														trigger: ["hover"],
														overlay: refreshmenu,
														animation: "slide-up",
														placement: "bottomCenter"
													},
													_react2.default.createElement(
														"a", {
															className: "navbar-avatar-refresh"
														},
														_react2.default.createElement("i", {
															className: "qy-iconfont icon-icon-refresh"
														})
													)
												)
											)
										),
										_react2.default.createElement(
											Menu, {
												className: "nav navbar-nav",
												onClick: self.handleClick.bind(this)
											},
											_react2.default.createElement(
												"li",
												null,
												_react2.default.createElement(
													"a", {
														id: "messageCount",
														value: "msgCenter",
														onClick: function onClick(e) {
															return self.handleDefault(e);
														},
														ref: "msgCenter",
														name: "站内信",
														title: "站内信",
														href: "index-view.html#/internalmsg",
														className: "navbar-avatar"
													},
													_react2.default.createElement(
														"div",
														// { className: "u-badge", "data-badge": "0" },
														{},
														_react2.default.createElement("i", {
															className: "qy-iconfont icon-tubiao-tongzhi"
														})
													)
												)
											)
										),
										_react2.default.createElement(
											"ul", {
												className: "nav navbar-nav"
											},
											_react2.default.createElement(
												"li", {
													className: "dropdown"
												},
												_react2.default.createElement(
													_tinperBee.Dropdown, {
														trigger: ["hover"],
														overlay: menu,
														animation: "slide-up"
													},
													_react2.default.createElement(
														"a", {
															role: "button",
															id: "username",
															"aria-expanded": "false",
															href: "javascript:void (0);",
															"data-toggle": "dropdown",
															className: "navbar-avatar dropdown-toggle"
														},
														_react2.default.createElement(
															"span", {
																className: "avatar-icon"
															},
															_react2.default.createElement("img", {
																src: contextRoot + decodeURIComponent(decodeURIComponent(_reactCookie2.default.load("_A_P_userAvator"))).replace(/\.\/images/, "/images")
															})
														),
														_react2.default.createElement(
															"span", {
																className: "avatar-name"
															},
															" ",
															decodeURIComponent(decodeURIComponent(_reactCookie2.default.load("_A_P_userName"))),
															" "
														),
														_react2.default.createElement("span", {
															className: "iconfont icon-arrowdown"
														})
													)
												)
											)
										)
									)
								)
							),
							_react2.default.createElement(
								SideContainer, {
									onToggle: this.onToggle.bind(this),
									className: collapsed
								},
								_react2.default.createElement(
									"div", {
										className: "sidebar-content"
									},
									_react2.default.createElement(
										Menu, {
											onClick: this.handleClick.bind(this),
											className: "u-menu-max1",
											style: {
												marginTop: "-" + this.state.curNum * 48
											},
											mode: "vertical"
										},
										this.state.menu.map(function(item) {
											var blank = item.openview == "newpage" ? "_blank" : "";
											var noSecond = "";
											var curHeight = 0;

											if (Array.isArray(item.children) && item.children.length > 0) {
												var list = [];
												var menulist = [
													[],
													[],
													[],
													[],
													[],
													[],
													[],
													[],
													[]
												];
												var pages = 0;

												var title = _react2.default.createElement(
													"a", {
														href: "javascript:;",
														key: item.id,
														className: "first-child",
														name: item.name
													},
													_react2.default.createElement("i", {
														className: "icon " + item.icon
													}),
													_react2.default.createElement(
														"span",
														null,
														_react2.default.createElement("label", {
															className: "uf uf-triangle-left"
														}),
														item.name
													)
												);

												item.children.map(function(it) {
													var blank = it.openview == "newpage" ? "_blank" : "";

													if (Array.isArray(it.children) && it.children.length > 0) {
														var list2 = [];
														var _title = _react2.default.createElement(
															"a", {
																href: "javascript:;",
																key: it.id,
																className: "child-title"
															},
															_react2.default.createElement("i", {
																className: "icon-child"
															}),
															_react2.default.createElement(
																"span",
																null,
																it.name
															)
														);
														noSecond = "no-second-menu";

														it.children.map(function(itit) {
															var blank = itit.openview == "newpage" ? "_blank" : "";

															list2.push(_react2.default.createElement(
																"li",
																null,
																_react2.default.createElement(
																	"a", {
																		target: blank,
																		value: itit.id,
																		onClick: function onClick(e) {
																			return self.handleDefault(e, blank);
																		},
																		ref: itit.id,
																		name: itit.name,
																		href: self.formmaterUrl(itit)
																	},
																	itit.name
																)
															));
														});

														curHeight = Math.ceil(it.children.length / 3) * 25 + 52 + curHeight;

														if (curHeight > self.state.clientHeight - 60) {
															pages = pages + 1;
															curHeight = 0;
															menulist[pages].push(_react2.default.createElement(
																"div", {
																	className: "menu-popup"
																},
																_title,
																_react2.default.createElement(
																	"div", {
																		className: "third-menu-content"
																	},
																	_react2.default.createElement(
																		"ul", {
																			className: "third-menu-list"
																		},
																		list2
																	)
																)
															));
														} else {
															menulist[pages].push(_react2.default.createElement(
																"div", {
																	className: "menu-popup"
																},
																_title,
																_react2.default.createElement(
																	"div", {
																		className: "third-menu-content"
																	},
																	_react2.default.createElement(
																		"ul", {
																			className: "third-menu-list"
																		},
																		list2
																	)
																)
															));
														}
													} else {
														curHeight = 46 + curHeight;

														var _title2 = _react2.default.createElement(
															"a", {
																target: blank,
																value: it.id,
																onClick: function onClick(e) {
																	return self.handleDefault(e, blank);
																},
																href: self.formmaterUrl(it)
															},
															_react2.default.createElement("i", {
																className: "icon " + it.icon
															}),
															_react2.default.createElement(
																"span",
																null,
																it.name
															)
														);

														if (curHeight > document.body.clientHeight - 60) {
															pages = pages + 1;
															curHeight = 0;
															menulist[pages].push(_react2.default.createElement(
																"div", {
																	className: "menu-popup"
																},
																_react2.default.createElement(
																	"a", {
																		target: blank,
																		value: it.id,
																		onClick: function onClick(e) {
																			return self.handleDefault(e, blank);
																		},
																		ref: it.id,
																		name: it.name,
																		href: self.formmaterUrl(it)
																	},
																	it.name
																)
															));
														} else {
															menulist[pages].push(_react2.default.createElement(
																"div", {
																	className: "menu-popup"
																},
																_react2.default.createElement(
																	"a", {
																		target: blank,
																		value: it.id,
																		onClick: function onClick(e) {
																			return self.handleDefault(e, blank);
																		},
																		ref: it.id,
																		name: it.name,
																		href: self.formmaterUrl(it)
																	},
																	it.name
																)
															));
														}
													}
												});

												var selected = item.id == isSeleted ? "u-menu-submenus-selected" : "";

												return _react2.default.createElement(
													SubMenu, {
														onTitleMouseEnter: self.onTitleMouseEnter.bind(self),
														key: item.menuId,
														className: "second-menu " + selected + " " + noSecond + " menu-cloum-" + pages,
														children: item.children,
														title: title
													},
													_react2.default.createElement("li", {
														className: "arrow-menu"
													}),
													menulist.map(function(ite, i) {
														ite = ite.length != 0 ? _react2.default.createElement(
															"li", {
																className: "u-menu-list"
															},
															ite
														) : ite;
														return ite;
													})
												);
											} else {
												var _blank = item.openview == "newpage" ? "_blank" : "";

												if (item.id == "index") {
													return false;
												}

												var _title3 = _react2.default.createElement(
													"a", {
														target: _blank,
														key: item.id,
														value: item.id,
														className: "first-child",
														onClick: function onClick(e) {
															return self.handleDefault(e, _blank);
														},
														ref: item.id,
														href: self.formmaterUrl(item),
														name: item.name
													},
													_react2.default.createElement("i", {
														className: "icon " + item.icon
													}),
													_react2.default.createElement(
														"span",
														null,
														_react2.default.createElement("label", {
															className: "uf uf-triangle-left"
														}),
														item.name
													)
												);
												return _react2.default.createElement(
													Menu.Item, {
														key: item.id
													},
													_title3
												);
											}
										})
									)
								),
								_react2.default.createElement(
									"div", {
										className: "toggle-wrap-side",
										onClick: this.onToggle.bind(this)
									},
									_react2.default.createElement(
										"button", {
											type: "button",
											className: "u-navbar-toggle show collapsed"
										},
										_react2.default.createElement("span", {
											className: "uf uf-navmenu-light"
										})
									),
									_react2.default.createElement("span", {
										className: "toggle-text"
									})
								),
								_react2.default.createElement(
									"div", {
										className: "more-bar",
										style: {
											display: "none"
										}
									},
									_react2.default.createElement(
										"div", {
											className: "arrow-up lock",
											title: "\u901A\u8FC7\u6EDA\u52A8\u9F20\u6807\u6765\u79FB\u52A8\u83DC\u5355",
											onClick: this.scrollMenu.bind(this, -1)
										},
										_react2.default.createElement("i", {
											className: "uf uf-2arrow-up"
										})
									),
									_react2.default.createElement(
										"div", {
											className: "arrow-down",
											title: "\u901A\u8FC7\u6EDA\u52A8\u9F20\u6807\u6765\u79FB\u52A8\u83DC\u5355",
											onClick: this.scrollMenu.bind(this, 1)
										},
										_react2.default.createElement("i", {
											className: "uf uf-2arrow-down"
										})
									)
								)
							),
							_react2.default.createElement(
								"div", {
									id: "content"
								},
								_react2.default.createElement(
									"div", {
										className: "content"
									},
									this.state.menus.map(function(item, index) {
										var match = /.*(#\/ifr\/)/gi;
										var selected = self.state.current == item.id ? "ifr-selected" : "";

										item.router = decodeURIComponent(decodeURIComponent(item.router.replace(match, "")));

										return _react2.default.createElement("iframe", {
											key: item.id,
											className: "ifr-tabs " + selected,
											id: item.id,
											src: item.router,
											style: {
												width: "100%",
												border: "0"
											}
										});
									})
								)
							)
						);
					}
				}]);
				return App;
			}(_react.Component);

			exports.default = App;

			/***/
		}),
		/* 4 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(5),
				__esModule: true
			};

			/***/
		}),
		/* 5 */
		/***/
		(function(module, exports, __webpack_require__) {

			var core = __webpack_require__(6);
			var $JSON = core.JSON || (core.JSON = {
				stringify: JSON.stringify
			});
			module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
				return $JSON.stringify.apply($JSON, arguments);
			};


			/***/
		}),
		/* 6 */
		/***/
		(function(module, exports) {

			var core = module.exports = {
				version: '2.5.3'
			};
			if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


			/***/
		}),
		/* 7 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(8),
				__esModule: true
			};

			/***/
		}),
		/* 8 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(9);
			module.exports = __webpack_require__(6).Object.getPrototypeOf;


			/***/
		}),
		/* 9 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 19.1.2.9 Object.getPrototypeOf(O)
			var toObject = __webpack_require__(10);
			var $getPrototypeOf = __webpack_require__(12);

			__webpack_require__(18)('getPrototypeOf', function() {
				return function getPrototypeOf(it) {
					return $getPrototypeOf(toObject(it));
				};
			});


			/***/
		}),
		/* 10 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 7.1.13 ToObject(argument)
			var defined = __webpack_require__(11);
			module.exports = function(it) {
				return Object(defined(it));
			};


			/***/
		}),
		/* 11 */
		/***/
		(function(module, exports) {

			// 7.2.1 RequireObjectCoercible(argument)
			module.exports = function(it) {
				if (it == undefined) throw TypeError("Can't call method on  " + it);
				return it;
			};


			/***/
		}),
		/* 12 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
			var has = __webpack_require__(13);
			var toObject = __webpack_require__(10);
			var IE_PROTO = __webpack_require__(14)('IE_PROTO');
			var ObjectProto = Object.prototype;

			module.exports = Object.getPrototypeOf || function(O) {
				O = toObject(O);
				if (has(O, IE_PROTO)) return O[IE_PROTO];
				if (typeof O.constructor == 'function' && O instanceof O.constructor) {
					return O.constructor.prototype;
				}
				return O instanceof Object ? ObjectProto : null;
			};


			/***/
		}),
		/* 13 */
		/***/
		(function(module, exports) {

			var hasOwnProperty = {}.hasOwnProperty;
			module.exports = function(it, key) {
				return hasOwnProperty.call(it, key);
			};


			/***/
		}),
		/* 14 */
		/***/
		(function(module, exports, __webpack_require__) {

			var shared = __webpack_require__(15)('keys');
			var uid = __webpack_require__(17);
			module.exports = function(key) {
				return shared[key] || (shared[key] = uid(key));
			};


			/***/
		}),
		/* 15 */
		/***/
		(function(module, exports, __webpack_require__) {

			var global = __webpack_require__(16);
			var SHARED = '__core-js_shared__';
			var store = global[SHARED] || (global[SHARED] = {});
			module.exports = function(key) {
				return store[key] || (store[key] = {});
			};


			/***/
		}),
		/* 16 */
		/***/
		(function(module, exports) {

			// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
			var global = module.exports = typeof window != 'undefined' && window.Math == Math ?
				window : typeof self != 'undefined' && self.Math == Math ? self
					// eslint-disable-next-line no-new-func
					:
					Function('return this')();
			if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


			/***/
		}),
		/* 17 */
		/***/
		(function(module, exports) {

			var id = 0;
			var px = Math.random();
			module.exports = function(key) {
				return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
			};


			/***/
		}),
		/* 18 */
		/***/
		(function(module, exports, __webpack_require__) {

			// most Object methods by ES6 should accept primitives
			var $export = __webpack_require__(19);
			var core = __webpack_require__(6);
			var fails = __webpack_require__(28);
			module.exports = function(KEY, exec) {
				var fn = (core.Object || {})[KEY] || Object[KEY];
				var exp = {};
				exp[KEY] = exec(fn);
				$export($export.S + $export.F * fails(function() {
					fn(1);
				}), 'Object', exp);
			};


			/***/
		}),
		/* 19 */
		/***/
		(function(module, exports, __webpack_require__) {

			var global = __webpack_require__(16);
			var core = __webpack_require__(6);
			var ctx = __webpack_require__(20);
			var hide = __webpack_require__(22);
			var PROTOTYPE = 'prototype';

			var $export = function(type, name, source) {
				var IS_FORCED = type & $export.F;
				var IS_GLOBAL = type & $export.G;
				var IS_STATIC = type & $export.S;
				var IS_PROTO = type & $export.P;
				var IS_BIND = type & $export.B;
				var IS_WRAP = type & $export.W;
				var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
				var expProto = exports[PROTOTYPE];
				var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
				var key, own, out;
				if (IS_GLOBAL) source = name;
				for (key in source) {
					// contains in native
					own = !IS_FORCED && target && target[key] !== undefined;
					if (own && key in exports) continue;
					// export native or passed
					out = own ? target[key] : source[key];
					// prevent global pollution for namespaces
					exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
						// bind timers to global for call from export context
						:
						IS_BIND && own ? ctx(out, global)
							// wrap global constructors for prevent change them in library
							:
							IS_WRAP && target[key] == out ? (function(C) {
								var F = function(a, b, c) {
									if (this instanceof C) {
										switch (arguments.length) {
											case 0:
												return new C();
											case 1:
												return new C(a);
											case 2:
												return new C(a, b);
										}
										return new C(a, b, c);
									}
									return C.apply(this, arguments);
								};
								F[PROTOTYPE] = C[PROTOTYPE];
								return F;
								// make static versions for prototype methods
							})(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
					// export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
					if (IS_PROTO) {
						(exports.virtual || (exports.virtual = {}))[key] = out;
						// export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
						if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
					}
				}
			};
			// type bitmap
			$export.F = 1; // forced
			$export.G = 2; // global
			$export.S = 4; // static
			$export.P = 8; // proto
			$export.B = 16; // bind
			$export.W = 32; // wrap
			$export.U = 64; // safe
			$export.R = 128; // real proto method for `library`
			module.exports = $export;


			/***/
		}),
		/* 20 */
		/***/
		(function(module, exports, __webpack_require__) {

			// optional / simple context binding
			var aFunction = __webpack_require__(21);
			module.exports = function(fn, that, length) {
				aFunction(fn);
				if (that === undefined) return fn;
				switch (length) {
					case 1:
						return function(a) {
							return fn.call(that, a);
						};
					case 2:
						return function(a, b) {
							return fn.call(that, a, b);
						};
					case 3:
						return function(a, b, c) {
							return fn.call(that, a, b, c);
						};
				}
				return function( /* ...args */ ) {
					return fn.apply(that, arguments);
				};
			};


			/***/
		}),
		/* 21 */
		/***/
		(function(module, exports) {

			module.exports = function(it) {
				if (typeof it != 'function') throw TypeError(it + ' is not a function!');
				return it;
			};


			/***/
		}),
		/* 22 */
		/***/
		(function(module, exports, __webpack_require__) {

			var dP = __webpack_require__(23);
			var createDesc = __webpack_require__(31);
			module.exports = __webpack_require__(27) ? function(object, key, value) {
				return dP.f(object, key, createDesc(1, value));
			} : function(object, key, value) {
				object[key] = value;
				return object;
			};


			/***/
		}),
		/* 23 */
		/***/
		(function(module, exports, __webpack_require__) {

			var anObject = __webpack_require__(24);
			var IE8_DOM_DEFINE = __webpack_require__(26);
			var toPrimitive = __webpack_require__(30);
			var dP = Object.defineProperty;

			exports.f = __webpack_require__(27) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
				anObject(O);
				P = toPrimitive(P, true);
				anObject(Attributes);
				if (IE8_DOM_DEFINE) try {
					return dP(O, P, Attributes);
				} catch (e) { /* empty */ }
				if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
				if ('value' in Attributes) O[P] = Attributes.value;
				return O;
			};


			/***/
		}),
		/* 24 */
		/***/
		(function(module, exports, __webpack_require__) {

			var isObject = __webpack_require__(25);
			module.exports = function(it) {
				if (!isObject(it)) throw TypeError(it + ' is not an object!');
				return it;
			};


			/***/
		}),
		/* 25 */
		/***/
		(function(module, exports) {

			module.exports = function(it) {
				return typeof it === 'object' ? it !== null : typeof it === 'function';
			};


			/***/
		}),
		/* 26 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = !__webpack_require__(27) && !__webpack_require__(28)(function() {
				return Object.defineProperty(__webpack_require__(29)('div'), 'a', {
					get: function() {
						return 7;
					}
				}).a != 7;
			});


			/***/
		}),
		/* 27 */
		/***/
		(function(module, exports, __webpack_require__) {

			// Thank's IE8 for his funny defineProperty
			module.exports = !__webpack_require__(28)(function() {
				return Object.defineProperty({}, 'a', {
					get: function() {
						return 7;
					}
				}).a != 7;
			});


			/***/
		}),
		/* 28 */
		/***/
		(function(module, exports) {

			module.exports = function(exec) {
				try {
					return !!exec();
				} catch (e) {
					return true;
				}
			};


			/***/
		}),
		/* 29 */
		/***/
		(function(module, exports, __webpack_require__) {

			var isObject = __webpack_require__(25);
			var document = __webpack_require__(16).document;
			// typeof document.createElement is 'object' in old IE
			var is = isObject(document) && isObject(document.createElement);
			module.exports = function(it) {
				return is ? document.createElement(it) : {};
			};


			/***/
		}),
		/* 30 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 7.1.1 ToPrimitive(input [, PreferredType])
			var isObject = __webpack_require__(25);
			// instead of the ES6 spec version, we didn't implement @@toPrimitive case
			// and the second argument - flag - preferred type is a string
			module.exports = function(it, S) {
				if (!isObject(it)) return it;
				var fn, val;
				if (S && typeof(fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
				if (typeof(fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
				if (!S && typeof(fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
				throw TypeError("Can't convert object to primitive value");
			};


			/***/
		}),
		/* 31 */
		/***/
		(function(module, exports) {

			module.exports = function(bitmap, value) {
				return {
					enumerable: !(bitmap & 1),
					configurable: !(bitmap & 2),
					writable: !(bitmap & 4),
					value: value
				};
			};


			/***/
		}),
		/* 32 */
		/***/
		(function(module, exports) {

			"use strict";

			exports.__esModule = true;

			exports.default = function(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			};

			/***/
		}),
		/* 33 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

			exports.__esModule = true;

			var _defineProperty = __webpack_require__(34);

			var _defineProperty2 = _interopRequireDefault(_defineProperty);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			exports.default = function() {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						(0, _defineProperty2.default)(target, descriptor.key, descriptor);
					}
				}

				return function(Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			/***/
		}),
		/* 34 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(35),
				__esModule: true
			};

			/***/
		}),
		/* 35 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(36);
			var $Object = __webpack_require__(6).Object;
			module.exports = function defineProperty(it, key, desc) {
				return $Object.defineProperty(it, key, desc);
			};


			/***/
		}),
		/* 36 */
		/***/
		(function(module, exports, __webpack_require__) {

			var $export = __webpack_require__(19);
			// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
			$export($export.S + $export.F * !__webpack_require__(27), 'Object', {
				defineProperty: __webpack_require__(23).f
			});


			/***/
		}),
		/* 37 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

			exports.__esModule = true;

			var _typeof2 = __webpack_require__(38);

			var _typeof3 = _interopRequireDefault(_typeof2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			exports.default = function(self, call) {
				if (!self) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}

				return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
			};

			/***/
		}),
		/* 38 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

			exports.__esModule = true;

			var _iterator = __webpack_require__(39);

			var _iterator2 = _interopRequireDefault(_iterator);

			var _symbol = __webpack_require__(68);

			var _symbol2 = _interopRequireDefault(_symbol);

			var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function(obj) {
				return typeof obj;
			} : function(obj) {
				return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
			};

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function(obj) {
				return typeof obj === "undefined" ? "undefined" : _typeof(obj);
			} : function(obj) {
				return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
			};

			/***/
		}),
		/* 39 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(40),
				__esModule: true
			};

			/***/
		}),
		/* 40 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(41);
			__webpack_require__(63);
			module.exports = __webpack_require__(67).f('iterator');


			/***/
		}),
		/* 41 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';
			var $at = __webpack_require__(42)(true);

			// 21.1.3.27 String.prototype[@@iterator]()
			__webpack_require__(44)(String, 'String', function(iterated) {
				this._t = String(iterated); // target
				this._i = 0; // next index
				// 21.1.5.2.1 %StringIteratorPrototype%.next()
			}, function() {
				var O = this._t;
				var index = this._i;
				var point;
				if (index >= O.length) return {
					value: undefined,
					done: true
				};
				point = $at(O, index);
				this._i += point.length;
				return {
					value: point,
					done: false
				};
			});


			/***/
		}),
		/* 42 */
		/***/
		(function(module, exports, __webpack_require__) {

			var toInteger = __webpack_require__(43);
			var defined = __webpack_require__(11);
			// true  -> String#at
			// false -> String#codePointAt
			module.exports = function(TO_STRING) {
				return function(that, pos) {
					var s = String(defined(that));
					var i = toInteger(pos);
					var l = s.length;
					var a, b;
					if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
					a = s.charCodeAt(i);
					return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ?
						TO_STRING ? s.charAt(i) : a :
						TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
				};
			};


			/***/
		}),
		/* 43 */
		/***/
		(function(module, exports) {

			// 7.1.4 ToInteger
			var ceil = Math.ceil;
			var floor = Math.floor;
			module.exports = function(it) {
				return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
			};


			/***/
		}),
		/* 44 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';
			var LIBRARY = __webpack_require__(45);
			var $export = __webpack_require__(19);
			var redefine = __webpack_require__(46);
			var hide = __webpack_require__(22);
			var has = __webpack_require__(13);
			var Iterators = __webpack_require__(47);
			var $iterCreate = __webpack_require__(48);
			var setToStringTag = __webpack_require__(61);
			var getPrototypeOf = __webpack_require__(12);
			var ITERATOR = __webpack_require__(62)('iterator');
			var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
			var FF_ITERATOR = '@@iterator';
			var KEYS = 'keys';
			var VALUES = 'values';

			var returnThis = function() {
				return this;
			};

			module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
				$iterCreate(Constructor, NAME, next);
				var getMethod = function(kind) {
					if (!BUGGY && kind in proto) return proto[kind];
					switch (kind) {
						case KEYS:
							return function keys() {
								return new Constructor(this, kind);
							};
						case VALUES:
							return function values() {
								return new Constructor(this, kind);
							};
					}
					return function entries() {
						return new Constructor(this, kind);
					};
				};
				var TAG = NAME + ' Iterator';
				var DEF_VALUES = DEFAULT == VALUES;
				var VALUES_BUG = false;
				var proto = Base.prototype;
				var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
				var $default = (!BUGGY && $native) || getMethod(DEFAULT);
				var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
				var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
				var methods, key, IteratorPrototype;
				// Fix native
				if ($anyNative) {
					IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
					if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
						// Set @@toStringTag to native iterators
						setToStringTag(IteratorPrototype, TAG, true);
						// fix for some old engines
						if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
					}
				}
				// fix Array#{values, @@iterator}.name in V8 / FF
				if (DEF_VALUES && $native && $native.name !== VALUES) {
					VALUES_BUG = true;
					$default = function values() {
						return $native.call(this);
					};
				}
				// Define iterator
				if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
					hide(proto, ITERATOR, $default);
				}
				// Plug for library
				Iterators[NAME] = $default;
				Iterators[TAG] = returnThis;
				if (DEFAULT) {
					methods = {
						values: DEF_VALUES ? $default : getMethod(VALUES),
						keys: IS_SET ? $default : getMethod(KEYS),
						entries: $entries
					};
					if (FORCED)
						for (key in methods) {
							if (!(key in proto)) redefine(proto, key, methods[key]);
						} else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
				}
				return methods;
			};


			/***/
		}),
		/* 45 */
		/***/
		(function(module, exports) {

			module.exports = true;


			/***/
		}),
		/* 46 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = __webpack_require__(22);


			/***/
		}),
		/* 47 */
		/***/
		(function(module, exports) {

			module.exports = {};


			/***/
		}),
		/* 48 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';
			var create = __webpack_require__(49);
			var descriptor = __webpack_require__(31);
			var setToStringTag = __webpack_require__(61);
			var IteratorPrototype = {};

			// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
			__webpack_require__(22)(IteratorPrototype, __webpack_require__(62)('iterator'), function() {
				return this;
			});

			module.exports = function(Constructor, NAME, next) {
				Constructor.prototype = create(IteratorPrototype, {
					next: descriptor(1, next)
				});
				setToStringTag(Constructor, NAME + ' Iterator');
			};


			/***/
		}),
		/* 49 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
			var anObject = __webpack_require__(24);
			var dPs = __webpack_require__(50);
			var enumBugKeys = __webpack_require__(59);
			var IE_PROTO = __webpack_require__(14)('IE_PROTO');
			var Empty = function() { /* empty */ };
			var PROTOTYPE = 'prototype';

			// Create object with fake `null` prototype: use iframe Object with cleared prototype
			var createDict = function() {
				// Thrash, waste and sodomy: IE GC bug
				var iframe = __webpack_require__(29)('iframe');
				var i = enumBugKeys.length;
				var lt = '<';
				var gt = '>';
				var iframeDocument;
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
				while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
				return createDict();
			};

			module.exports = Object.create || function create(O, Properties) {
				var result;
				if (O !== null) {
					Empty[PROTOTYPE] = anObject(O);
					result = new Empty();
					Empty[PROTOTYPE] = null;
					// add "__proto__" for Object.getPrototypeOf polyfill
					result[IE_PROTO] = O;
				} else result = createDict();
				return Properties === undefined ? result : dPs(result, Properties);
			};


			/***/
		}),
		/* 50 */
		/***/
		(function(module, exports, __webpack_require__) {

			var dP = __webpack_require__(23);
			var anObject = __webpack_require__(24);
			var getKeys = __webpack_require__(51);

			module.exports = __webpack_require__(27) ? Object.defineProperties : function defineProperties(O, Properties) {
				anObject(O);
				var keys = getKeys(Properties);
				var length = keys.length;
				var i = 0;
				var P;
				while (length > i) dP.f(O, P = keys[i++], Properties[P]);
				return O;
			};


			/***/
		}),
		/* 51 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 19.1.2.14 / 15.2.3.14 Object.keys(O)
			var $keys = __webpack_require__(52);
			var enumBugKeys = __webpack_require__(59);

			module.exports = Object.keys || function keys(O) {
				return $keys(O, enumBugKeys);
			};


			/***/
		}),
		/* 52 */
		/***/
		(function(module, exports, __webpack_require__) {

			var has = __webpack_require__(13);
			var toIObject = __webpack_require__(53);
			var arrayIndexOf = __webpack_require__(56)(false);
			var IE_PROTO = __webpack_require__(14)('IE_PROTO');

			module.exports = function(object, names) {
				var O = toIObject(object);
				var i = 0;
				var result = [];
				var key;
				for (key in O)
					if (key != IE_PROTO) has(O, key) && result.push(key);
				// Don't enum bug & hidden keys
				while (names.length > i)
					if (has(O, key = names[i++])) {
						~arrayIndexOf(result, key) || result.push(key);
					}
				return result;
			};


			/***/
		}),
		/* 53 */
		/***/
		(function(module, exports, __webpack_require__) {

			// to indexed object, toObject with fallback for non-array-like ES3 strings
			var IObject = __webpack_require__(54);
			var defined = __webpack_require__(11);
			module.exports = function(it) {
				return IObject(defined(it));
			};


			/***/
		}),
		/* 54 */
		/***/
		(function(module, exports, __webpack_require__) {

			// fallback for non-array-like ES3 and non-enumerable old V8 strings
			var cof = __webpack_require__(55);
			// eslint-disable-next-line no-prototype-builtins
			module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
				return cof(it) == 'String' ? it.split('') : Object(it);
			};


			/***/
		}),
		/* 55 */
		/***/
		(function(module, exports) {

			var toString = {}.toString;

			module.exports = function(it) {
				return toString.call(it).slice(8, -1);
			};


			/***/
		}),
		/* 56 */
		/***/
		(function(module, exports, __webpack_require__) {

			// false -> Array#indexOf
			// true  -> Array#includes
			var toIObject = __webpack_require__(53);
			var toLength = __webpack_require__(57);
			var toAbsoluteIndex = __webpack_require__(58);
			module.exports = function(IS_INCLUDES) {
				return function($this, el, fromIndex) {
					var O = toIObject($this);
					var length = toLength(O.length);
					var index = toAbsoluteIndex(fromIndex, length);
					var value;
					// Array#includes uses SameValueZero equality algorithm
					// eslint-disable-next-line no-self-compare
					if (IS_INCLUDES && el != el)
						while (length > index) {
							value = O[index++];
							// eslint-disable-next-line no-self-compare
							if (value != value) return true;
							// Array#indexOf ignores holes, Array#includes - not
						} else
						for (; length > index; index++)
							if (IS_INCLUDES || index in O) {
								if (O[index] === el) return IS_INCLUDES || index || 0;
							}
					return !IS_INCLUDES && -1;
				};
			};


			/***/
		}),
		/* 57 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 7.1.15 ToLength
			var toInteger = __webpack_require__(43);
			var min = Math.min;
			module.exports = function(it) {
				return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
			};


			/***/
		}),
		/* 58 */
		/***/
		(function(module, exports, __webpack_require__) {

			var toInteger = __webpack_require__(43);
			var max = Math.max;
			var min = Math.min;
			module.exports = function(index, length) {
				index = toInteger(index);
				return index < 0 ? max(index + length, 0) : min(index, length);
			};


			/***/
		}),
		/* 59 */
		/***/
		(function(module, exports) {

			// IE 8- don't enum bug keys
			module.exports = (
				'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
			).split(',');


			/***/
		}),
		/* 60 */
		/***/
		(function(module, exports, __webpack_require__) {

			var document = __webpack_require__(16).document;
			module.exports = document && document.documentElement;


			/***/
		}),
		/* 61 */
		/***/
		(function(module, exports, __webpack_require__) {

			var def = __webpack_require__(23).f;
			var has = __webpack_require__(13);
			var TAG = __webpack_require__(62)('toStringTag');

			module.exports = function(it, tag, stat) {
				if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
					configurable: true,
					value: tag
				});
			};


			/***/
		}),
		/* 62 */
		/***/
		(function(module, exports, __webpack_require__) {

			var store = __webpack_require__(15)('wks');
			var uid = __webpack_require__(17);
			var Symbol = __webpack_require__(16).Symbol;
			var USE_SYMBOL = typeof Symbol == 'function';

			var $exports = module.exports = function(name) {
				return store[name] || (store[name] =
					USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
			};

			$exports.store = store;


			/***/
		}),
		/* 63 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(64);
			var global = __webpack_require__(16);
			var hide = __webpack_require__(22);
			var Iterators = __webpack_require__(47);
			var TO_STRING_TAG = __webpack_require__(62)('toStringTag');

			var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
				'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
				'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
				'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
				'TextTrackList,TouchList').split(',');

			for (var i = 0; i < DOMIterables.length; i++) {
				var NAME = DOMIterables[i];
				var Collection = global[NAME];
				var proto = Collection && Collection.prototype;
				if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
				Iterators[NAME] = Iterators.Array;
			}


			/***/
		}),
		/* 64 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';
			var addToUnscopables = __webpack_require__(65);
			var step = __webpack_require__(66);
			var Iterators = __webpack_require__(47);
			var toIObject = __webpack_require__(53);

			// 22.1.3.4 Array.prototype.entries()
			// 22.1.3.13 Array.prototype.keys()
			// 22.1.3.29 Array.prototype.values()
			// 22.1.3.30 Array.prototype[@@iterator]()
			module.exports = __webpack_require__(44)(Array, 'Array', function(iterated, kind) {
				this._t = toIObject(iterated); // target
				this._i = 0; // next index
				this._k = kind; // kind
				// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
			}, function() {
				var O = this._t;
				var kind = this._k;
				var index = this._i++;
				if (!O || index >= O.length) {
					this._t = undefined;
					return step(1);
				}
				if (kind == 'keys') return step(0, index);
				if (kind == 'values') return step(0, O[index]);
				return step(0, [index, O[index]]);
			}, 'values');

			// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
			Iterators.Arguments = Iterators.Array;

			addToUnscopables('keys');
			addToUnscopables('values');
			addToUnscopables('entries');


			/***/
		}),
		/* 65 */
		/***/
		(function(module, exports) {

			module.exports = function() { /* empty */ };


			/***/
		}),
		/* 66 */
		/***/
		(function(module, exports) {

			module.exports = function(done, value) {
				return {
					value: value,
					done: !!done
				};
			};


			/***/
		}),
		/* 67 */
		/***/
		(function(module, exports, __webpack_require__) {

			exports.f = __webpack_require__(62);


			/***/
		}),
		/* 68 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(69),
				__esModule: true
			};

			/***/
		}),
		/* 69 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(70);
			__webpack_require__(80);
			__webpack_require__(81);
			__webpack_require__(82);
			module.exports = __webpack_require__(6).Symbol;


			/***/
		}),
		/* 70 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';
			// ECMAScript 6 symbols shim
			var global = __webpack_require__(16);
			var has = __webpack_require__(13);
			var DESCRIPTORS = __webpack_require__(27);
			var $export = __webpack_require__(19);
			var redefine = __webpack_require__(46);
			var META = __webpack_require__(71).KEY;
			var $fails = __webpack_require__(28);
			var shared = __webpack_require__(15);
			var setToStringTag = __webpack_require__(61);
			var uid = __webpack_require__(17);
			var wks = __webpack_require__(62);
			var wksExt = __webpack_require__(67);
			var wksDefine = __webpack_require__(72);
			var enumKeys = __webpack_require__(73);
			var isArray = __webpack_require__(76);
			var anObject = __webpack_require__(24);
			var isObject = __webpack_require__(25);
			var toIObject = __webpack_require__(53);
			var toPrimitive = __webpack_require__(30);
			var createDesc = __webpack_require__(31);
			var _create = __webpack_require__(49);
			var gOPNExt = __webpack_require__(77);
			var $GOPD = __webpack_require__(79);
			var $DP = __webpack_require__(23);
			var $keys = __webpack_require__(51);
			var gOPD = $GOPD.f;
			var dP = $DP.f;
			var gOPN = gOPNExt.f;
			var $Symbol = global.Symbol;
			var $JSON = global.JSON;
			var _stringify = $JSON && $JSON.stringify;
			var PROTOTYPE = 'prototype';
			var HIDDEN = wks('_hidden');
			var TO_PRIMITIVE = wks('toPrimitive');
			var isEnum = {}.propertyIsEnumerable;
			var SymbolRegistry = shared('symbol-registry');
			var AllSymbols = shared('symbols');
			var OPSymbols = shared('op-symbols');
			var ObjectProto = Object[PROTOTYPE];
			var USE_NATIVE = typeof $Symbol == 'function';
			var QObject = global.QObject;
			// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
			var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

			// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
			var setSymbolDesc = DESCRIPTORS && $fails(function() {
				return _create(dP({}, 'a', {
					get: function() {
						return dP(this, 'a', {
							value: 7
						}).a;
					}
				})).a != 7;
			}) ? function(it, key, D) {
				var protoDesc = gOPD(ObjectProto, key);
				if (protoDesc) delete ObjectProto[key];
				dP(it, key, D);
				if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
			} : dP;

			var wrap = function(tag) {
				var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
				sym._k = tag;
				return sym;
			};

			var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it) {
				return typeof it == 'symbol';
			} : function(it) {
				return it instanceof $Symbol;
			};

			var $defineProperty = function defineProperty(it, key, D) {
				if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
				anObject(it);
				key = toPrimitive(key, true);
				anObject(D);
				if (has(AllSymbols, key)) {
					if (!D.enumerable) {
						if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
						it[HIDDEN][key] = true;
					} else {
						if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
						D = _create(D, {
							enumerable: createDesc(0, false)
						});
					}
					return setSymbolDesc(it, key, D);
				}
				return dP(it, key, D);
			};
			var $defineProperties = function defineProperties(it, P) {
				anObject(it);
				var keys = enumKeys(P = toIObject(P));
				var i = 0;
				var l = keys.length;
				var key;
				while (l > i) $defineProperty(it, key = keys[i++], P[key]);
				return it;
			};
			var $create = function create(it, P) {
				return P === undefined ? _create(it) : $defineProperties(_create(it), P);
			};
			var $propertyIsEnumerable = function propertyIsEnumerable(key) {
				var E = isEnum.call(this, key = toPrimitive(key, true));
				if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
				return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
			};
			var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
				it = toIObject(it);
				key = toPrimitive(key, true);
				if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
				var D = gOPD(it, key);
				if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
				return D;
			};
			var $getOwnPropertyNames = function getOwnPropertyNames(it) {
				var names = gOPN(toIObject(it));
				var result = [];
				var i = 0;
				var key;
				while (names.length > i) {
					if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
				}
				return result;
			};
			var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
				var IS_OP = it === ObjectProto;
				var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
				var result = [];
				var i = 0;
				var key;
				while (names.length > i) {
					if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
				}
				return result;
			};

			// 19.4.1.1 Symbol([description])
			if (!USE_NATIVE) {
				$Symbol = function Symbol() {
					if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
					var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
					var $set = function(value) {
						if (this === ObjectProto) $set.call(OPSymbols, value);
						if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
						setSymbolDesc(this, tag, createDesc(1, value));
					};
					if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
						configurable: true,
						set: $set
					});
					return wrap(tag);
				};
				redefine($Symbol[PROTOTYPE], 'toString', function toString() {
					return this._k;
				});

				$GOPD.f = $getOwnPropertyDescriptor;
				$DP.f = $defineProperty;
				__webpack_require__(78).f = gOPNExt.f = $getOwnPropertyNames;
				__webpack_require__(75).f = $propertyIsEnumerable;
				__webpack_require__(74).f = $getOwnPropertySymbols;

				if (DESCRIPTORS && !__webpack_require__(45)) {
					redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
				}

				wksExt.f = function(name) {
					return wrap(wks(name));
				};
			}

			$export($export.G + $export.W + $export.F * !USE_NATIVE, {
				Symbol: $Symbol
			});

			for (var es6Symbols = (
				// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
				'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
			).split(','), j = 0; es6Symbols.length > j;) wks(es6Symbols[j++]);

			for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

			$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
				// 19.4.2.1 Symbol.for(key)
				'for': function(key) {
					return has(SymbolRegistry, key += '') ?
						SymbolRegistry[key] :
						SymbolRegistry[key] = $Symbol(key);
				},
				// 19.4.2.5 Symbol.keyFor(sym)
				keyFor: function keyFor(sym) {
					if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
					for (var key in SymbolRegistry)
						if (SymbolRegistry[key] === sym) return key;
				},
				useSetter: function() {
					setter = true;
				},
				useSimple: function() {
					setter = false;
				}
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
			$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
				var S = $Symbol();
				// MS Edge converts symbol values to JSON as {}
				// WebKit converts symbol values to JSON as null
				// V8 throws on boxed symbols
				return _stringify([S]) != '[null]' || _stringify({
					a: S
				}) != '{}' || _stringify(Object(S)) != '{}';
			})), 'JSON', {
				stringify: function stringify(it) {
					var args = [it];
					var i = 1;
					var replacer, $replacer;
					while (arguments.length > i) args.push(arguments[i++]);
					$replacer = replacer = args[1];
					if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
					if (!isArray(replacer)) replacer = function(key, value) {
						if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
						if (!isSymbol(value)) return value;
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


			/***/
		}),
		/* 71 */
		/***/
		(function(module, exports, __webpack_require__) {

			var META = __webpack_require__(17)('meta');
			var isObject = __webpack_require__(25);
			var has = __webpack_require__(13);
			var setDesc = __webpack_require__(23).f;
			var id = 0;
			var isExtensible = Object.isExtensible || function() {
				return true;
			};
			var FREEZE = !__webpack_require__(28)(function() {
				return isExtensible(Object.preventExtensions({}));
			});
			var setMeta = function(it) {
				setDesc(it, META, {
					value: {
						i: 'O' + ++id, // object ID
						w: {} // weak collections IDs
					}
				});
			};
			var fastKey = function(it, create) {
				// return primitive with prefix
				if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
				if (!has(it, META)) {
					// can't set metadata to uncaught frozen object
					if (!isExtensible(it)) return 'F';
					// not necessary to add metadata
					if (!create) return 'E';
					// add missing metadata
					setMeta(it);
					// return object ID
				}
				return it[META].i;
			};
			var getWeak = function(it, create) {
				if (!has(it, META)) {
					// can't set metadata to uncaught frozen object
					if (!isExtensible(it)) return true;
					// not necessary to add metadata
					if (!create) return false;
					// add missing metadata
					setMeta(it);
					// return hash weak collections IDs
				}
				return it[META].w;
			};
			// add metadata on freeze-family methods calling
			var onFreeze = function(it) {
				if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
				return it;
			};
			var meta = module.exports = {
				KEY: META,
				NEED: false,
				fastKey: fastKey,
				getWeak: getWeak,
				onFreeze: onFreeze
			};


			/***/
		}),
		/* 72 */
		/***/
		(function(module, exports, __webpack_require__) {

			var global = __webpack_require__(16);
			var core = __webpack_require__(6);
			var LIBRARY = __webpack_require__(45);
			var wksExt = __webpack_require__(67);
			var defineProperty = __webpack_require__(23).f;
			module.exports = function(name) {
				var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
				if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
					value: wksExt.f(name)
				});
			};


			/***/
		}),
		/* 73 */
		/***/
		(function(module, exports, __webpack_require__) {

			// all enumerable object keys, includes symbols
			var getKeys = __webpack_require__(51);
			var gOPS = __webpack_require__(74);
			var pIE = __webpack_require__(75);
			module.exports = function(it) {
				var result = getKeys(it);
				var getSymbols = gOPS.f;
				if (getSymbols) {
					var symbols = getSymbols(it);
					var isEnum = pIE.f;
					var i = 0;
					var key;
					while (symbols.length > i)
						if (isEnum.call(it, key = symbols[i++])) result.push(key);
				}
				return result;
			};


			/***/
		}),
		/* 74 */
		/***/
		(function(module, exports) {

			exports.f = Object.getOwnPropertySymbols;


			/***/
		}),
		/* 75 */
		/***/
		(function(module, exports) {

			exports.f = {}.propertyIsEnumerable;


			/***/
		}),
		/* 76 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 7.2.2 IsArray(argument)
			var cof = __webpack_require__(55);
			module.exports = Array.isArray || function isArray(arg) {
				return cof(arg) == 'Array';
			};


			/***/
		}),
		/* 77 */
		/***/
		(function(module, exports, __webpack_require__) {

			// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
			var toIObject = __webpack_require__(53);
			var gOPN = __webpack_require__(78).f;
			var toString = {}.toString;

			var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ?
				Object.getOwnPropertyNames(window) : [];

			var getWindowNames = function(it) {
				try {
					return gOPN(it);
				} catch (e) {
					return windowNames.slice();
				}
			};

			module.exports.f = function getOwnPropertyNames(it) {
				return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
			};


			/***/
		}),
		/* 78 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
			var $keys = __webpack_require__(52);
			var hiddenKeys = __webpack_require__(59).concat('length', 'prototype');

			exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
				return $keys(O, hiddenKeys);
			};


			/***/
		}),
		/* 79 */
		/***/
		(function(module, exports, __webpack_require__) {

			var pIE = __webpack_require__(75);
			var createDesc = __webpack_require__(31);
			var toIObject = __webpack_require__(53);
			var toPrimitive = __webpack_require__(30);
			var has = __webpack_require__(13);
			var IE8_DOM_DEFINE = __webpack_require__(26);
			var gOPD = Object.getOwnPropertyDescriptor;

			exports.f = __webpack_require__(27) ? gOPD : function getOwnPropertyDescriptor(O, P) {
				O = toIObject(O);
				P = toPrimitive(P, true);
				if (IE8_DOM_DEFINE) try {
					return gOPD(O, P);
				} catch (e) { /* empty */ }
				if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
			};


			/***/
		}),
		/* 80 */
		/***/
		(function(module, exports) {



			/***/
		}),
		/* 81 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(72)('asyncIterator');


			/***/
		}),
		/* 82 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(72)('observable');


			/***/
		}),
		/* 83 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

			exports.__esModule = true;

			var _setPrototypeOf = __webpack_require__(84);

			var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

			var _create = __webpack_require__(88);

			var _create2 = _interopRequireDefault(_create);

			var _typeof2 = __webpack_require__(38);

			var _typeof3 = _interopRequireDefault(_typeof2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			exports.default = function(subClass, superClass) {
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

			/***/
		}),
		/* 84 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(85),
				__esModule: true
			};

			/***/
		}),
		/* 85 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(86);
			module.exports = __webpack_require__(6).Object.setPrototypeOf;


			/***/
		}),
		/* 86 */
		/***/
		(function(module, exports, __webpack_require__) {

			// 19.1.3.19 Object.setPrototypeOf(O, proto)
			var $export = __webpack_require__(19);
			$export($export.S, 'Object', {
				setPrototypeOf: __webpack_require__(87).set
			});


			/***/
		}),
		/* 87 */
		/***/
		(function(module, exports, __webpack_require__) {

			// Works with __proto__ only. Old v8 can't work with null proto objects.
			/* eslint-disable no-proto */
			var isObject = __webpack_require__(25);
			var anObject = __webpack_require__(24);
			var check = function(O, proto) {
				anObject(O);
				if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
			};
			module.exports = {
				set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
					function(test, buggy, set) {
						try {
							set = __webpack_require__(20)(Function.call, __webpack_require__(79).f(Object.prototype, '__proto__').set, 2);
							set(test, []);
							buggy = !(test instanceof Array);
						} catch (e) {
							buggy = true;
						}
						return function setPrototypeOf(O, proto) {
							check(O, proto);
							if (buggy) O.__proto__ = proto;
							else set(O, proto);
							return O;
						};
					}({}, false) : undefined),
				check: check
			};


			/***/
		}),
		/* 88 */
		/***/
		(function(module, exports, __webpack_require__) {

			module.exports = {
				"default": __webpack_require__(89),
				__esModule: true
			};

			/***/
		}),
		/* 89 */
		/***/
		(function(module, exports, __webpack_require__) {

			__webpack_require__(90);
			var $Object = __webpack_require__(6).Object;
			module.exports = function create(P, D) {
				return $Object.create(P, D);
			};


			/***/
		}),
		/* 90 */
		/***/
		(function(module, exports, __webpack_require__) {

			var $export = __webpack_require__(19);
			// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
			$export($export.S, 'Object', {
				create: __webpack_require__(49)
			});


			/***/
		}),
		/* 91 */
		/***/
		(function(module, exports) {

			module.exports = __WEBPACK_EXTERNAL_MODULE_91__;

			/***/
		}),
		/* 92 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _extends = Object.assign || function(target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
				return target;
			};

			var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
				return typeof obj;
			} : function(obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			};

			exports.load = load;
			exports.select = select;
			exports.save = save;
			exports.remove = remove;
			exports.setRawCookie = setRawCookie;
			exports.plugToRequest = plugToRequest;

			var _cookie = __webpack_require__(93);

			var _cookie2 = _interopRequireDefault(_cookie);

			var _objectAssign = __webpack_require__(94);

			var _objectAssign2 = _interopRequireDefault(_objectAssign);

			var _isNode = __webpack_require__(95);

			var _isNode2 = _interopRequireDefault(_isNode);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

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

				return Object.keys(cookies).reduce(function(accumulator, name) {
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
					opt = {
						path: opt
					};
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

			/***/
		}),
		/* 93 */
		/***/
		(function(module, exports) {

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
					var sameSite = typeof opt.sameSite === 'string' ?
						opt.sameSite.toLowerCase() : opt.sameSite;

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


			/***/
		}),
		/* 94 */
		/***/
		(function(module, exports) {

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
					var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
					test1[5] = 'de';
					if (Object.getOwnPropertyNames(test1)[0] === '5') {
						return false;
					}

					// https://bugs.chromium.org/p/v8/issues/detail?id=3056
					var test2 = {};
					for (var i = 0; i < 10; i++) {
						test2['_' + String.fromCharCode(i)] = i;
					}
					var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
						return test2[n];
					});
					if (order2.join('') !== '0123456789') {
						return false;
					}

					// https://bugs.chromium.org/p/v8/issues/detail?id=3056
					var test3 = {};
					'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
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

			module.exports = shouldUseNative() ? Object.assign : function(target, source) {
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


			/***/
		}),
		/* 95 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) { // Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
				'use strict';

				exports = module.exports = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 96 */
		/***/
		(function(module, exports) {

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

			function defaultClearTimeout() {
				throw new Error('clearTimeout has not been defined');
			}
			(function() {
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
			}())

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
				} catch (e) {
					try {
						// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
						return cachedSetTimeout.call(null, fun, 0);
					} catch (e) {
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
				} catch (e) {
					try {
						// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
						return cachedClearTimeout.call(null, marker);
					} catch (e) {
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
				while (len) {
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

			process.nextTick = function(fun) {
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
			Item.prototype.run = function() {
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

			process.listeners = function(name) {
				return []
			}

			process.binding = function(name) {
				throw new Error('process.binding is not supported');
			};

			process.cwd = function() {
				return '/'
			};
			process.chdir = function(dir) {
				throw new Error('process.chdir is not supported');
			};
			process.umask = function() {
				return 0;
			};


			/***/
		}),
		/* 97 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

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

			var _inherits2 = __webpack_require__(83);

			var _inherits3 = _interopRequireDefault(_inherits2);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _reactDom = __webpack_require__(2);

			var _reactDom2 = _interopRequireDefault(_reactDom);

			var _tinperBee = __webpack_require__(91);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			var Tab = function(_Component) {
				(0, _inherits3.default)(Tab, _Component);

				function Tab(props) {
					(0, _classCallCheck3.default)(this, Tab);

					var _this = (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this, props));

					var self = _this;

					var value = typeof sessionStorage["tabNotice"] == "undefined" ? true : sessionStorage["tabNotice"];

					_this.state = {
						menus: props.menus,
						current: props.current,
						tabNum: props.menus.length,
						tabNotice: JSON.parse(value),
						showNotice: props.showNotice,
						position: 0
					};

					_this.setCurrent = _this.setCurrent.bind(_this);
					_this.del = _this.del.bind(_this);
					return _this;
				}

				(0, _createClass3.default)(Tab, [{
					key: "setCurrent",
					value: function setCurrent(id) {
						this.props.setCurrent(id);
					}
				}, {
					key: "del",
					value: function del(id) {
						var menu = this.state.menus;
						var current = this.state.current;

						var menuCloned = JSON.parse((0, _stringify2.default)(menu));

						var num = 0;
						for (var i = 0; i < menuCloned.length; i++) {
							if (id == menuCloned[i].id) {
								menuCloned.splice(i, 1);
								num = i - 1;
							}
						}

						var data = {
							menus: menuCloned
						};

						//删除选中的tab时
						if (current == id) {
							data.current = menuCloned[num].id;
							data.router = menuCloned[num].router;

							//window.router.dispatch('on', data.router.replace(match,'\/ifr'));

							//window.location.hash = data.router.replace(match,'#\/ifr')
						}

						var match = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;

						var ifr = document.getElementById(id);

						if (ifr.src.match(match) != null) {
							if (ifr.src.match(location.host) != null) {
								try {
									if (ifr.contentWindow.confirmClose && typeof ifr.contentWindow.confirmClose == "function") {
										ifr.contentWindow.confirmClose(id, data);
										return false;
									}
								} catch(e){}
							}
						}

						this.setState({
							tabNum: menuCloned.length
						});

						this.props.del(data);

						return menuCloned;
					}
				}, {
					key: "notice",
					value: function notice() {
						var value = this.state.tabNotice;

						sessionStorage["tabNotice"] = !value;

						this.setState({
							tabNotice: !value
						});
					}
					// componentDidMount(){
					//   this.moveState();
					// }

				}, {
					key: "componentDidUpdate",
					value: function componentDidUpdate() {
						// this.tabNotice();
						this.moveState();
					}
				}, {
					key: "moveState",
					value: function moveState() {
						if (this.refs.tabsListBox.clientWidth < this.refs.tabsList.clientWidth) {
							this.refs.tabsLeft.style.display = 'block';
							this.refs.tabsRight.style.display = 'block';
						} else {
							this.refs.tabsLeft.style.display = 'none';
							this.refs.tabsRight.style.display = 'none';
						}
					}
				}, {
					key: "movePostion",
					value: function movePostion(direction, position) {
						var p = this.state.position;
						var boxw = this.refs.tabsListBox.clientWidth;
						var tabsw = this.refs.tabsList.clientWidth;
						var p1 = null;
						if (direction == "left") {
							if (p < 0) {
								if (p + boxw < 0) {
									p1 = p + boxw;
								} else {
									p1 = 0;
								}
							}
						} else if (direction == "right") {
							if (tabsw + p - boxw > 0) {
								if (tabsw + p - boxw > boxw) {
									p1 = p - boxw;
								} else {
									p1 = boxw - tabsw;
								}
							}
						} else if (direction == "to") {
							p1 = position;
						} else {
							// 默认不传参数时移动至最右边,即打开新页签的情况
							if (tabsw > boxw) {
								p1 = boxw - tabsw;
							}
						}
						// 如果新位置计算成功，则改变tab的横向位置
						if (p1 != null) {
							this.refs.tabsList.style.transform = "translate3d(" + p1 + "px, 0px, 0px)";
							this.setState({
								position: p1
							});
						}
					}
				}, {
					key: "tabNotice",
					value: function tabNotice() {
						if (this.state.menus.length >= 11) {
							var dom = ReactDOM.findDOMNode(this.refs["tabNotice"]);
							if (dom) {
								dom.style.display = "";
							}
							setTimeout(function() {
								if (dom) {
									dom.style.display = "none";
								}
							}, 2000);
						}
					}
				}, {
					key: "componentWillReceiveProps",
					value: function componentWillReceiveProps(nextProps) {
						var _this2 = this;

						var curTabNum = this.state.tabNum;
						var current = this.state.current;
						this.setState({
							current: nextProps.current,
							showNotice: nextProps.showNotice,
							menus: nextProps.menus,
							tabNum: nextProps.menus.length
						}, function() {
							// 如果页签数量增多，则页签位置移动至最右
							if (nextProps.menus.length > curTabNum) {
								_this2.movePostion();
							} else if (current != nextProps.current) {
								var currentTab = document.querySelector(".tabs-list .selected");
								if (currentTab && currentTab.nodeType == 1) {
									var tabx = currentTab.offsetLeft;
									var tabw = currentTab.clientWidth;
									var boxw = _this2.refs.tabsListBox.clientWidth;
									var p = _this2.state.position;
									if (tabx + p < 0 || tabx + tabw + p - boxw > 0) {
										_this2.movePostion("to", -tabx);
									}
								}
							} else if (current == nextProps.current && nextProps.menus.length < curTabNum) {
								// 关闭其他页，且当前页不在可视范围内，需要移动到最左端
								var p = _this2.state.position;
								if (p != 0) {
									_this2.movePostion("to", 0);
								}
							}
						});
					}
				}, {
					key: "render",
					value: function render() {
						var self = this;

						return _react2.default.createElement(
							"div", {
								className: "pull-left",
								id: "portalTabsContainer"
							},
							_react2.default.createElement(
								"div", {
									id: "portalTabs",
									className: "tabs ui-tabs-num-" + this.state.tabNum
								},
								_react2.default.createElement(
									"span", {
										className: "tabs-list-left",
										ref: "tabsLeft",
										style: {
											display: 'none'
										},
										onClick: self.movePostion.bind(this, 'left')
									},
									_react2.default.createElement("i", {
										className: "qy-iconfont icon-tubiao-left"
									})
								),
								_react2.default.createElement(
									"div", {
										className: "tabs-list-box",
										ref: "tabsListBox"
									},
									_react2.default.createElement(
										"ul", {
											className: "tabs-list",
											ref: "tabsList"
										},
										self.state.menus.map(function(item, index) {
											var delIcon = index == 0 ? "" : _react2.default.createElement("i", {
												onClick: self.del.bind(this, item.id),
												className: "qy-iconfont icon-close x-close",
												key: item.router
											});

											// var homeIcon = index==0?<i className="qy-iconfont icon-tubiao-shouye"></i>:item.title;

											var homeIcon = item.title;

											var selected = self.state.current == item.id ? "selected" : "";

											return _react2.default.createElement(
												"li", {
													className: selected
												},
												_react2.default.createElement(
													"a", {
														onClick: self.setCurrent.bind(this, item.id),
														href: "javascript:;",
														title: item.title
													},
													homeIcon
												),
												delIcon
											);
										})
									)
								),
								_react2.default.createElement(
									"span", {
										className: "tabs-list-right",
										ref: "tabsRight",
										style: {
											display: 'none'
										},
										onClick: self.movePostion.bind(this, 'right')
									},
									_react2.default.createElement("i", {
										className: "qy-iconfont icon-tubiao-right"
									})
								)
							)
						);
					}
				}]);
				return Tab;
			}(_react.Component);
			/**
			 * Created by yuzhao on 2017/5/31.
			 */

			exports.default = Tab;

			/***/
		}),
		/* 98 */
		/***/
		(function(module, exports, __webpack_require__) {

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

			var _inherits2 = __webpack_require__(83);

			var _inherits3 = _interopRequireDefault(_inherits2);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _tinperBee = __webpack_require__(91);

			var _axios = __webpack_require__(99);

			var _axios2 = _interopRequireDefault(_axios);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			var Menu = _tinperBee.Navbar.Menu;
			/**
			 * Created by yuzhao on 2017/6/7.
			 */

			var UserMenus = function(_Component) {
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
						_axios2.default.get(contextRoot + '/moreMenu/list?r=' + Math.random()).then(function(res) {
							if (res.data.status == 1) {
								self.setState({
									userMenus: res.data.data
								});
							}
						}).catch(function(err) {
							console.log(err);
						});
					}
				}, {
					key: 'handleClick',
					value: function handleClick(e) {
						this.props.handleClick(e);
					}
				}, {
					key: 'confirm',
					value: function(_confirm) {
						function confirm() {
							return _confirm.apply(this, arguments);
						}

						confirm.toString = function() {
							return _confirm.toString();
						};

						return confirm;
					}(function() {
						var tabs = JSON.parse(sessionStorage['tabs']);
						if (tabs.length > 1) {
							var r = confirm("注销后您打开的页签数据会自动清空");
							if (r == true) {
								location.href = 'user/beflogout';
							}
						} else {
							location.href = 'user/beflogout';
						}
					})
				}, {
					key: 'render',
					value: function render() {

						var self = this;

						return _react2.default.createElement(
							Menu, {
								onClick: function onClick(e) {
									return self.handleClick(e);
								},
								className: 'dropdown-menus',
								style: {
									width: '100%'
								},
								mode: 'inline'
							},
							self.state.userMenus.map(function(item) {
								var value = {
									title: item.name,
									router: self.formmaterUrl(item)
								};
								return _react2.default.createElement(
									'li', {
										className: 'u-menu-item',
										style: {
											paddingLeft: 16
										}
									},
									_react2.default.createElement(
										'a', {
											ref: item.code,
											value: item.code,
											onClick: function onClick(e) {
												return self.props.handleDefault(e);
											},
											name: item.name,
											title: item.name,
											href: self.formmaterUrl(item)
										},
										_react2.default.createElement('i', {
											className: item.icon
										}),
										item.name
									)
								);
							}),
							_react2.default.createElement(
								'li', {
									className: 'u-menu-item',
									style: {
										paddingLeft: 16
									}
								},
								_react2.default.createElement(
									'a', {
										ref: 'setting3',
										title: '\u6CE8\u9500',
										value: 'logout',
										href: 'user/beflogout'
									},
									_react2.default.createElement('i', {
										'aria-hidden': 'true',
										className: 'qy-iconfont icon-tubiao-zhuxiao'
									}),
									' \u6CE8\u9500'
								)
							)
						);
					}
				}]);
				return UserMenus;
			}(_react.Component);

			exports.default = UserMenus;

			/***/
		}),
		/* 99 */
		/***/
		(function(module, exports) {

			module.exports = __WEBPACK_EXTERNAL_MODULE_99__;

			/***/
		}),
		/* 100 */
		/***/
		(function(module, exports, __webpack_require__) {

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

			var _inherits2 = __webpack_require__(83);

			var _inherits3 = _interopRequireDefault(_inherits2);

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			var _tinperBee = __webpack_require__(91);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/**
			 * Created by yuzhao on 2017/6/7.
			 */

			var Menu = _tinperBee.Navbar.Menu;

			var RefreshMenus = function(_Component) {
				(0, _inherits3.default)(RefreshMenus, _Component);

				function RefreshMenus(props) {
					(0, _classCallCheck3.default)(this, RefreshMenus);
					return (0, _possibleConstructorReturn3.default)(this, (RefreshMenus.__proto__ || (0, _getPrototypeOf2.default)(RefreshMenus)).call(this, props));
				}

				(0, _createClass3.default)(RefreshMenus, [{
					key: 'handleRefreshClick',
					value: function handleRefreshClick(e) {
						this.props.handleRefreshClick(e);
					}
				}, {
					key: 'render',
					value: function render() {
						var self = this;
						return _react2.default.createElement(
							Menu, {
								onClick: function onClick(e) {
									return self.handleRefreshClick(e);
								},
								className: 'dropdown-menus',
								style: {
									width: '100%'
								},
								mode: 'inline'
							},
							_react2.default.createElement(
								'li', {
									className: 'u-menu-item',
									style: {
										paddingLeft: 16
									}
								},
								_react2.default.createElement(
									'a', {
										title: '\u5237\u65B0\u5F53\u524D\u9875\u9762',
										value: 'refreshCurrent'
									},
									' \u5237\u65B0\u5F53\u524D\u9875\u9762'
								)
							),
							_react2.default.createElement(
								'li', {
									className: 'u-menu-item',
									style: {
										paddingLeft: 16
									}
								},
								_react2.default.createElement(
									'a', {
										title: '\u5173\u95ED\u5176\u4ED6\u9875\u9762',
										value: 'closeOther'
									},
									' \u5173\u95ED\u5176\u4ED6\u9875\u9762'
								)
							),
							_react2.default.createElement(
								'li', {
									className: 'u-menu-item',
									style: {
										paddingLeft: 16
									}
								},
								_react2.default.createElement(
									'a', {
										title: '\u5173\u95ED\u5168\u90E8\u9875\u9762',
										value: 'closeAll'
									},
									' \u5173\u95ED\u5168\u90E8\u9875\u9762'
								)
							)
						);
					}
				}]);
				return RefreshMenus;
			}(_react.Component);

			exports.default = RefreshMenus;

			/***/
		}),
		/* 101 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports.Scrollbars = undefined;

			var _Scrollbars = __webpack_require__(102);

			var _Scrollbars2 = _interopRequireDefault(_Scrollbars);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					"default": obj
				};
			}

			exports["default"] = _Scrollbars2["default"];
			exports.Scrollbars = _Scrollbars2["default"];

			/***/
		}),
		/* 102 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _extends = Object.assign || function(target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
				return target;
			};

			var _createClass = function() {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}
				return function(Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			var _raf2 = __webpack_require__(103);

			var _raf3 = _interopRequireDefault(_raf2);

			var _domCss = __webpack_require__(105);

			var _domCss2 = _interopRequireDefault(_domCss);

			var _react = __webpack_require__(1);

			var _propTypes = __webpack_require__(111);

			var _propTypes2 = _interopRequireDefault(_propTypes);

			var _isString = __webpack_require__(119);

			var _isString2 = _interopRequireDefault(_isString);

			var _getScrollbarWidth = __webpack_require__(120);

			var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

			var _returnFalse = __webpack_require__(121);

			var _returnFalse2 = _interopRequireDefault(_returnFalse);

			var _getInnerWidth = __webpack_require__(122);

			var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);

			var _getInnerHeight = __webpack_require__(123);

			var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);

			var _styles = __webpack_require__(124);

			var _defaultRenderElements = __webpack_require__(125);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					"default": obj
				};
			}

			function _objectWithoutProperties(obj, keys) {
				var target = {};
				for (var i in obj) {
					if (keys.indexOf(i) >= 0) continue;
					if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
					target[i] = obj[i];
				}
				return target;
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			}

			function _possibleConstructorReturn(self, call) {
				if (!self) {
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}
				return call && (typeof call === "object" || typeof call === "function") ? call : self;
			}

			function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
					throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
				}
				subClass.prototype = Object.create(superClass && superClass.prototype, {
					constructor: {
						value: subClass,
						enumerable: false,
						writable: true,
						configurable: true
					}
				});
				if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			}

			var Scrollbars = function(_Component) {
				_inherits(Scrollbars, _Component);

				function Scrollbars(props) {
					var _ref;

					_classCallCheck(this, Scrollbars);

					for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						rest[_key - 1] = arguments[_key];
					}

					var _this = _possibleConstructorReturn(this, (_ref = Scrollbars.__proto__ || Object.getPrototypeOf(Scrollbars)).call.apply(_ref, [this, props].concat(rest)));

					_this.getScrollLeft = _this.getScrollLeft.bind(_this);
					_this.getScrollTop = _this.getScrollTop.bind(_this);
					_this.getScrollWidth = _this.getScrollWidth.bind(_this);
					_this.getScrollHeight = _this.getScrollHeight.bind(_this);
					_this.getClientWidth = _this.getClientWidth.bind(_this);
					_this.getClientHeight = _this.getClientHeight.bind(_this);
					_this.getValues = _this.getValues.bind(_this);
					_this.getThumbHorizontalWidth = _this.getThumbHorizontalWidth.bind(_this);
					_this.getThumbVerticalHeight = _this.getThumbVerticalHeight.bind(_this);
					_this.getScrollLeftForOffset = _this.getScrollLeftForOffset.bind(_this);
					_this.getScrollTopForOffset = _this.getScrollTopForOffset.bind(_this);

					_this.scrollLeft = _this.scrollLeft.bind(_this);
					_this.scrollTop = _this.scrollTop.bind(_this);
					_this.scrollToLeft = _this.scrollToLeft.bind(_this);
					_this.scrollToTop = _this.scrollToTop.bind(_this);
					_this.scrollToRight = _this.scrollToRight.bind(_this);
					_this.scrollToBottom = _this.scrollToBottom.bind(_this);

					_this.handleTrackMouseEnter = _this.handleTrackMouseEnter.bind(_this);
					_this.handleTrackMouseLeave = _this.handleTrackMouseLeave.bind(_this);
					_this.handleHorizontalTrackMouseDown = _this.handleHorizontalTrackMouseDown.bind(_this);
					_this.handleVerticalTrackMouseDown = _this.handleVerticalTrackMouseDown.bind(_this);
					_this.handleHorizontalThumbMouseDown = _this.handleHorizontalThumbMouseDown.bind(_this);
					_this.handleVerticalThumbMouseDown = _this.handleVerticalThumbMouseDown.bind(_this);
					_this.handleWindowResize = _this.handleWindowResize.bind(_this);
					_this.handleScroll = _this.handleScroll.bind(_this);
					_this.handleDrag = _this.handleDrag.bind(_this);
					_this.handleDragEnd = _this.handleDragEnd.bind(_this);

					_this.state = {
						didMountUniversal: false
					};
					return _this;
				}

				_createClass(Scrollbars, [{
					key: 'componentDidMount',
					value: function componentDidMount() {
						this.addListeners();
						this.update();
						this.componentDidMountUniversal();
					}
				}, {
					key: 'componentDidMountUniversal',
					value: function componentDidMountUniversal() {
						// eslint-disable-line react/sort-comp
						var universal = this.props.universal;

						if (!universal) return;
						this.setState({
							didMountUniversal: true
						});
					}
				}, {
					key: 'componentDidUpdate',
					value: function componentDidUpdate() {
						this.update();
					}
				}, {
					key: 'componentWillUnmount',
					value: function componentWillUnmount() {
						this.removeListeners();
						(0, _raf2.cancel)(this.requestFrame);
						clearTimeout(this.hideTracksTimeout);
						clearInterval(this.detectScrollingInterval);
					}
				}, {
					key: 'getScrollLeft',
					value: function getScrollLeft() {
						if (!this.view) return 0;
						return this.view.scrollLeft;
					}
				}, {
					key: 'getScrollTop',
					value: function getScrollTop() {
						if (!this.view) return 0;
						return this.view.scrollTop;
					}
				}, {
					key: 'getScrollWidth',
					value: function getScrollWidth() {
						if (!this.view) return 0;
						return this.view.scrollWidth;
					}
				}, {
					key: 'getScrollHeight',
					value: function getScrollHeight() {
						if (!this.view) return 0;
						return this.view.scrollHeight;
					}
				}, {
					key: 'getClientWidth',
					value: function getClientWidth() {
						if (!this.view) return 0;
						return this.view.clientWidth;
					}
				}, {
					key: 'getClientHeight',
					value: function getClientHeight() {
						if (!this.view) return 0;
						return this.view.clientHeight;
					}
				}, {
					key: 'getValues',
					value: function getValues() {
						var _ref2 = this.view || {},
							_ref2$scrollLeft = _ref2.scrollLeft,
							scrollLeft = _ref2$scrollLeft === undefined ? 0 : _ref2$scrollLeft,
							_ref2$scrollTop = _ref2.scrollTop,
							scrollTop = _ref2$scrollTop === undefined ? 0 : _ref2$scrollTop,
							_ref2$scrollWidth = _ref2.scrollWidth,
							scrollWidth = _ref2$scrollWidth === undefined ? 0 : _ref2$scrollWidth,
							_ref2$scrollHeight = _ref2.scrollHeight,
							scrollHeight = _ref2$scrollHeight === undefined ? 0 : _ref2$scrollHeight,
							_ref2$clientWidth = _ref2.clientWidth,
							clientWidth = _ref2$clientWidth === undefined ? 0 : _ref2$clientWidth,
							_ref2$clientHeight = _ref2.clientHeight,
							clientHeight = _ref2$clientHeight === undefined ? 0 : _ref2$clientHeight;

						return {
							left: scrollLeft / (scrollWidth - clientWidth) || 0,
							top: scrollTop / (scrollHeight - clientHeight) || 0,
							scrollLeft: scrollLeft,
							scrollTop: scrollTop,
							scrollWidth: scrollWidth,
							scrollHeight: scrollHeight,
							clientWidth: clientWidth,
							clientHeight: clientHeight
						};
					}
				}, {
					key: 'getThumbHorizontalWidth',
					value: function getThumbHorizontalWidth() {
						var _props = this.props,
							thumbSize = _props.thumbSize,
							thumbMinSize = _props.thumbMinSize;
						var _view = this.view,
							scrollWidth = _view.scrollWidth,
							clientWidth = _view.clientWidth;

						var trackWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
						var width = Math.ceil(clientWidth / scrollWidth * trackWidth);
						if (trackWidth === width) return 0;
						if (thumbSize) return thumbSize;
						return Math.max(width, thumbMinSize);
					}
				}, {
					key: 'getThumbVerticalHeight',
					value: function getThumbVerticalHeight() {
						var _props2 = this.props,
							thumbSize = _props2.thumbSize,
							thumbMinSize = _props2.thumbMinSize;
						var _view2 = this.view,
							scrollHeight = _view2.scrollHeight,
							clientHeight = _view2.clientHeight;

						var trackHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
						var height = Math.ceil(clientHeight / scrollHeight * trackHeight);
						if (trackHeight === height) return 0;
						if (thumbSize) return thumbSize;
						return Math.max(height, thumbMinSize);
					}
				}, {
					key: 'getScrollLeftForOffset',
					value: function getScrollLeftForOffset(offset) {
						var _view3 = this.view,
							scrollWidth = _view3.scrollWidth,
							clientWidth = _view3.clientWidth;

						var trackWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
						var thumbWidth = this.getThumbHorizontalWidth();
						return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
					}
				}, {
					key: 'getScrollTopForOffset',
					value: function getScrollTopForOffset(offset) {
						var _view4 = this.view,
							scrollHeight = _view4.scrollHeight,
							clientHeight = _view4.clientHeight;

						var trackHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
						var thumbHeight = this.getThumbVerticalHeight();
						return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
					}
				}, {
					key: 'scrollLeft',
					value: function scrollLeft() {
						var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

						if (!this.view) return;
						this.view.scrollLeft = left;
					}
				}, {
					key: 'scrollTop',
					value: function scrollTop() {
						var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

						if (!this.view) return;
						this.view.scrollTop = top;
					}
				}, {
					key: 'scrollToLeft',
					value: function scrollToLeft() {
						if (!this.view) return;
						this.view.scrollLeft = 0;
					}
				}, {
					key: 'scrollToTop',
					value: function scrollToTop() {
						if (!this.view) return;
						this.view.scrollTop = 0;
					}
				}, {
					key: 'scrollToRight',
					value: function scrollToRight() {
						if (!this.view) return;
						this.view.scrollLeft = this.view.scrollWidth;
					}
				}, {
					key: 'scrollToBottom',
					value: function scrollToBottom() {
						if (!this.view) return;
						this.view.scrollTop = this.view.scrollHeight;
					}
				}, {
					key: 'addListeners',
					value: function addListeners() {
						/* istanbul ignore if */
						if (typeof document === 'undefined' || !this.view) return;
						var view = this.view,
							trackHorizontal = this.trackHorizontal,
							trackVertical = this.trackVertical,
							thumbHorizontal = this.thumbHorizontal,
							thumbVertical = this.thumbVertical;

						view.addEventListener('scroll', this.handleScroll);
						if (!(0, _getScrollbarWidth2["default"])()) return;
						trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
						trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
						trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
						trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
						trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
						trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
						thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
						thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
						window.addEventListener('resize', this.handleWindowResize);
					}
				}, {
					key: 'removeListeners',
					value: function removeListeners() {
						/* istanbul ignore if */
						if (typeof document === 'undefined' || !this.view) return;
						var view = this.view,
							trackHorizontal = this.trackHorizontal,
							trackVertical = this.trackVertical,
							thumbHorizontal = this.thumbHorizontal,
							thumbVertical = this.thumbVertical;

						view.removeEventListener('scroll', this.handleScroll);
						if (!(0, _getScrollbarWidth2["default"])()) return;
						trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
						trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
						trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
						trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
						trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
						trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
						thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
						thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
						window.removeEventListener('resize', this.handleWindowResize);
						// Possibly setup by `handleDragStart`
						this.teardownDragging();
					}
				}, {
					key: 'handleScroll',
					value: function handleScroll(event) {
						var _this2 = this;

						var _props3 = this.props,
							onScroll = _props3.onScroll,
							onScrollFrame = _props3.onScrollFrame;

						if (onScroll) onScroll(event);
						this.update(function(values) {
							var scrollLeft = values.scrollLeft,
								scrollTop = values.scrollTop;

							_this2.viewScrollLeft = scrollLeft;
							_this2.viewScrollTop = scrollTop;
							if (onScrollFrame) onScrollFrame(values);
						});
						this.detectScrolling();
					}
				}, {
					key: 'handleScrollStart',
					value: function handleScrollStart() {
						var onScrollStart = this.props.onScrollStart;

						if (onScrollStart) onScrollStart();
						this.handleScrollStartAutoHide();
					}
				}, {
					key: 'handleScrollStartAutoHide',
					value: function handleScrollStartAutoHide() {
						var autoHide = this.props.autoHide;

						if (!autoHide) return;
						this.showTracks();
					}
				}, {
					key: 'handleScrollStop',
					value: function handleScrollStop() {
						var onScrollStop = this.props.onScrollStop;

						if (onScrollStop) onScrollStop();
						this.handleScrollStopAutoHide();
					}
				}, {
					key: 'handleScrollStopAutoHide',
					value: function handleScrollStopAutoHide() {
						var autoHide = this.props.autoHide;

						if (!autoHide) return;
						this.hideTracks();
					}
				}, {
					key: 'handleWindowResize',
					value: function handleWindowResize() {
						this.update();
					}
				}, {
					key: 'handleHorizontalTrackMouseDown',
					value: function handleHorizontalTrackMouseDown(event) {
						event.preventDefault();
						var target = event.target,
							clientX = event.clientX;

						var _target$getBoundingCl = target.getBoundingClientRect(),
							targetLeft = _target$getBoundingCl.left;

						var thumbWidth = this.getThumbHorizontalWidth();
						var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
						this.view.scrollLeft = this.getScrollLeftForOffset(offset);
					}
				}, {
					key: 'handleVerticalTrackMouseDown',
					value: function handleVerticalTrackMouseDown(event) {
						event.preventDefault();
						var target = event.target,
							clientY = event.clientY;

						var _target$getBoundingCl2 = target.getBoundingClientRect(),
							targetTop = _target$getBoundingCl2.top;

						var thumbHeight = this.getThumbVerticalHeight();
						var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
						this.view.scrollTop = this.getScrollTopForOffset(offset);
					}
				}, {
					key: 'handleHorizontalThumbMouseDown',
					value: function handleHorizontalThumbMouseDown(event) {
						event.preventDefault();
						this.handleDragStart(event);
						var target = event.target,
							clientX = event.clientX;
						var offsetWidth = target.offsetWidth;

						var _target$getBoundingCl3 = target.getBoundingClientRect(),
							left = _target$getBoundingCl3.left;

						this.prevPageX = offsetWidth - (clientX - left);
					}
				}, {
					key: 'handleVerticalThumbMouseDown',
					value: function handleVerticalThumbMouseDown(event) {
						event.preventDefault();
						this.handleDragStart(event);
						var target = event.target,
							clientY = event.clientY;
						var offsetHeight = target.offsetHeight;

						var _target$getBoundingCl4 = target.getBoundingClientRect(),
							top = _target$getBoundingCl4.top;

						this.prevPageY = offsetHeight - (clientY - top);
					}
				}, {
					key: 'setupDragging',
					value: function setupDragging() {
						(0, _domCss2["default"])(document.body, _styles.disableSelectStyle);
						document.addEventListener('mousemove', this.handleDrag);
						document.addEventListener('mouseup', this.handleDragEnd);
						document.onselectstart = _returnFalse2["default"];
					}
				}, {
					key: 'teardownDragging',
					value: function teardownDragging() {
						(0, _domCss2["default"])(document.body, _styles.disableSelectStyleReset);
						document.removeEventListener('mousemove', this.handleDrag);
						document.removeEventListener('mouseup', this.handleDragEnd);
						document.onselectstart = undefined;
					}
				}, {
					key: 'handleDragStart',
					value: function handleDragStart(event) {
						this.dragging = true;
						event.stopImmediatePropagation();
						this.setupDragging();
					}
				}, {
					key: 'handleDrag',
					value: function handleDrag(event) {
						if (this.prevPageX) {
							var clientX = event.clientX;

							var _trackHorizontal$getB = this.trackHorizontal.getBoundingClientRect(),
								trackLeft = _trackHorizontal$getB.left;

							var thumbWidth = this.getThumbHorizontalWidth();
							var clickPosition = thumbWidth - this.prevPageX;
							var offset = -trackLeft + clientX - clickPosition;
							this.view.scrollLeft = this.getScrollLeftForOffset(offset);
						}
						if (this.prevPageY) {
							var clientY = event.clientY;

							var _trackVertical$getBou = this.trackVertical.getBoundingClientRect(),
								trackTop = _trackVertical$getBou.top;

							var thumbHeight = this.getThumbVerticalHeight();
							var _clickPosition = thumbHeight - this.prevPageY;
							var _offset = -trackTop + clientY - _clickPosition;
							this.view.scrollTop = this.getScrollTopForOffset(_offset);
						}
						return false;
					}
				}, {
					key: 'handleDragEnd',
					value: function handleDragEnd() {
						this.dragging = false;
						this.prevPageX = this.prevPageY = 0;
						this.teardownDragging();
						this.handleDragEndAutoHide();
					}
				}, {
					key: 'handleDragEndAutoHide',
					value: function handleDragEndAutoHide() {
						var autoHide = this.props.autoHide;

						if (!autoHide) return;
						this.hideTracks();
					}
				}, {
					key: 'handleTrackMouseEnter',
					value: function handleTrackMouseEnter() {
						this.trackMouseOver = true;
						this.handleTrackMouseEnterAutoHide();
					}
				}, {
					key: 'handleTrackMouseEnterAutoHide',
					value: function handleTrackMouseEnterAutoHide() {
						var autoHide = this.props.autoHide;

						if (!autoHide) return;
						this.showTracks();
					}
				}, {
					key: 'handleTrackMouseLeave',
					value: function handleTrackMouseLeave() {
						this.trackMouseOver = false;
						this.handleTrackMouseLeaveAutoHide();
					}
				}, {
					key: 'handleTrackMouseLeaveAutoHide',
					value: function handleTrackMouseLeaveAutoHide() {
						var autoHide = this.props.autoHide;

						if (!autoHide) return;
						this.hideTracks();
					}
				}, {
					key: 'showTracks',
					value: function showTracks() {
						clearTimeout(this.hideTracksTimeout);
						(0, _domCss2["default"])(this.trackHorizontal, {
							opacity: 1
						});
						(0, _domCss2["default"])(this.trackVertical, {
							opacity: 1
						});
					}
				}, {
					key: 'hideTracks',
					value: function hideTracks() {
						var _this3 = this;

						if (this.dragging) return;
						if (this.scrolling) return;
						if (this.trackMouseOver) return;
						var autoHideTimeout = this.props.autoHideTimeout;

						clearTimeout(this.hideTracksTimeout);
						this.hideTracksTimeout = setTimeout(function() {
							(0, _domCss2["default"])(_this3.trackHorizontal, {
								opacity: 0
							});
							(0, _domCss2["default"])(_this3.trackVertical, {
								opacity: 0
							});
						}, autoHideTimeout);
					}
				}, {
					key: 'detectScrolling',
					value: function detectScrolling() {
						var _this4 = this;

						if (this.scrolling) return;
						this.scrolling = true;
						this.handleScrollStart();
						this.detectScrollingInterval = setInterval(function() {
							if (_this4.lastViewScrollLeft === _this4.viewScrollLeft && _this4.lastViewScrollTop === _this4.viewScrollTop) {
								clearInterval(_this4.detectScrollingInterval);
								_this4.scrolling = false;
								_this4.handleScrollStop();
							}
							_this4.lastViewScrollLeft = _this4.viewScrollLeft;
							_this4.lastViewScrollTop = _this4.viewScrollTop;
						}, 100);
					}
				}, {
					key: 'raf',
					value: function raf(callback) {
						var _this5 = this;

						if (this.requestFrame) _raf3["default"].cancel(this.requestFrame);
						this.requestFrame = (0, _raf3["default"])(function() {
							_this5.requestFrame = undefined;
							callback();
						});
					}
				}, {
					key: 'update',
					value: function update(callback) {
						var _this6 = this;

						this.raf(function() {
							return _this6._update(callback);
						});
					}
				}, {
					key: '_update',
					value: function _update(callback) {
						var _props4 = this.props,
							onUpdate = _props4.onUpdate,
							hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;

						var values = this.getValues();
						if ((0, _getScrollbarWidth2["default"])()) {
							var scrollLeft = values.scrollLeft,
								clientWidth = values.clientWidth,
								scrollWidth = values.scrollWidth;

							var trackHorizontalWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
							var thumbHorizontalWidth = this.getThumbHorizontalWidth();
							var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
							var thumbHorizontalStyle = {
								width: thumbHorizontalWidth,
								transform: 'translateX(' + thumbHorizontalX + 'px)'
							};
							var scrollTop = values.scrollTop,
								clientHeight = values.clientHeight,
								scrollHeight = values.scrollHeight;

							var trackVerticalHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
							var thumbVerticalHeight = this.getThumbVerticalHeight();
							var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
							var thumbVerticalStyle = {
								height: thumbVerticalHeight,
								transform: 'translateY(' + thumbVerticalY + 'px)'
							};
							if (hideTracksWhenNotNeeded) {
								var trackHorizontalStyle = {
									visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
								};
								var trackVerticalStyle = {
									visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
								};
								(0, _domCss2["default"])(this.trackHorizontal, trackHorizontalStyle);
								(0, _domCss2["default"])(this.trackVertical, trackVerticalStyle);
							}
							(0, _domCss2["default"])(this.thumbHorizontal, thumbHorizontalStyle);
							(0, _domCss2["default"])(this.thumbVertical, thumbVerticalStyle);
						}
						if (onUpdate) onUpdate(values);
						if (typeof callback !== 'function') return;
						callback(values);
					}
				}, {
					key: 'render',
					value: function render() {
						var _this7 = this;

						var scrollbarWidth = (0, _getScrollbarWidth2["default"])();
						/* eslint-disable no-unused-vars */

						var _props5 = this.props,
							onScroll = _props5.onScroll,
							onScrollFrame = _props5.onScrollFrame,
							onScrollStart = _props5.onScrollStart,
							onScrollStop = _props5.onScrollStop,
							onUpdate = _props5.onUpdate,
							renderView = _props5.renderView,
							renderTrackHorizontal = _props5.renderTrackHorizontal,
							renderTrackVertical = _props5.renderTrackVertical,
							renderThumbHorizontal = _props5.renderThumbHorizontal,
							renderThumbVertical = _props5.renderThumbVertical,
							tagName = _props5.tagName,
							hideTracksWhenNotNeeded = _props5.hideTracksWhenNotNeeded,
							autoHide = _props5.autoHide,
							autoHideTimeout = _props5.autoHideTimeout,
							autoHideDuration = _props5.autoHideDuration,
							thumbSize = _props5.thumbSize,
							thumbMinSize = _props5.thumbMinSize,
							universal = _props5.universal,
							autoHeight = _props5.autoHeight,
							autoHeightMin = _props5.autoHeightMin,
							autoHeightMax = _props5.autoHeightMax,
							style = _props5.style,
							children = _props5.children,
							props = _objectWithoutProperties(_props5, ['onScroll', 'onScrollFrame', 'onScrollStart', 'onScrollStop', 'onUpdate', 'renderView', 'renderTrackHorizontal', 'renderTrackVertical', 'renderThumbHorizontal', 'renderThumbVertical', 'tagName', 'hideTracksWhenNotNeeded', 'autoHide', 'autoHideTimeout', 'autoHideDuration', 'thumbSize', 'thumbMinSize', 'universal', 'autoHeight', 'autoHeightMin', 'autoHeightMax', 'style', 'children']);
						/* eslint-enable no-unused-vars */

						var didMountUniversal = this.state.didMountUniversal;


						var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
							minHeight: autoHeightMin,
							maxHeight: autoHeightMax
						}), style);

						var viewStyle = _extends({}, _styles.viewStyleDefault, {
							// Hide scrollbars by setting a negative margin
							marginRight: scrollbarWidth ? -scrollbarWidth : 0,
							marginBottom: scrollbarWidth ? -scrollbarWidth : 0
						}, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
							// Add scrollbarWidth to autoHeight in order to compensate negative margins
							minHeight: (0, _isString2["default"])(autoHeightMin) ? 'calc(' + autoHeightMin + ' + ' + scrollbarWidth + 'px)' : autoHeightMin + scrollbarWidth,
							maxHeight: (0, _isString2["default"])(autoHeightMax) ? 'calc(' + autoHeightMax + ' + ' + scrollbarWidth + 'px)' : autoHeightMax + scrollbarWidth
						}), autoHeight && universal && !didMountUniversal && {
							minHeight: autoHeightMin,
							maxHeight: autoHeightMax
						}, universal && !didMountUniversal && _styles.viewStyleUniversalInitial);

						var trackAutoHeightStyle = {
							transition: 'opacity ' + autoHideDuration + 'ms',
							opacity: 0
						};

						var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
							display: 'none'
						});

						var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
							display: 'none'
						});

						return (0, _react.createElement)(tagName, _extends({}, props, {
							style: containerStyle,
							ref: function ref(_ref3) {
								_this7.container = _ref3;
							}
						}), [(0, _react.cloneElement)(renderView({
							style: viewStyle
						}), {
							key: 'view',
							ref: function ref(_ref4) {
								_this7.view = _ref4;
							}
						}, children), (0, _react.cloneElement)(renderTrackHorizontal({
							style: trackHorizontalStyle
						}), {
							key: 'trackHorizontal',
							ref: function ref(_ref5) {
								_this7.trackHorizontal = _ref5;
							}
						}, (0, _react.cloneElement)(renderThumbHorizontal({
							style: _styles.thumbHorizontalStyleDefault
						}), {
							ref: function ref(_ref6) {
								_this7.thumbHorizontal = _ref6;
							}
						})), (0, _react.cloneElement)(renderTrackVertical({
							style: trackVerticalStyle
						}), {
							key: 'trackVertical',
							ref: function ref(_ref7) {
								_this7.trackVertical = _ref7;
							}
						}, (0, _react.cloneElement)(renderThumbVertical({
							style: _styles.thumbVerticalStyleDefault
						}), {
							ref: function ref(_ref8) {
								_this7.thumbVertical = _ref8;
							}
						}))]);
					}
				}]);

				return Scrollbars;
			}(_react.Component);

			exports["default"] = Scrollbars;


			Scrollbars.propTypes = {
				onScroll: _propTypes2["default"].func,
				onScrollFrame: _propTypes2["default"].func,
				onScrollStart: _propTypes2["default"].func,
				onScrollStop: _propTypes2["default"].func,
				onUpdate: _propTypes2["default"].func,
				renderView: _propTypes2["default"].func,
				renderTrackHorizontal: _propTypes2["default"].func,
				renderTrackVertical: _propTypes2["default"].func,
				renderThumbHorizontal: _propTypes2["default"].func,
				renderThumbVertical: _propTypes2["default"].func,
				tagName: _propTypes2["default"].string,
				thumbSize: _propTypes2["default"].number,
				thumbMinSize: _propTypes2["default"].number,
				hideTracksWhenNotNeeded: _propTypes2["default"].bool,
				autoHide: _propTypes2["default"].bool,
				autoHideTimeout: _propTypes2["default"].number,
				autoHideDuration: _propTypes2["default"].number,
				autoHeight: _propTypes2["default"].bool,
				autoHeightMin: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
				autoHeightMax: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
				universal: _propTypes2["default"].bool,
				style: _propTypes2["default"].object,
				children: _propTypes2["default"].node
			};

			Scrollbars.defaultProps = {
				renderView: _defaultRenderElements.renderViewDefault,
				renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
				renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
				renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
				renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
				tagName: 'div',
				thumbMinSize: 30,
				hideTracksWhenNotNeeded: false,
				autoHide: false,
				autoHideTimeout: 1000,
				autoHideDuration: 200,
				autoHeight: false,
				autoHeightMin: 0,
				autoHeightMax: 200,
				universal: false
			};

			/***/
		}),
		/* 103 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(global) {
				var now = __webpack_require__(104),
					root = typeof window === 'undefined' ? global : window,
					vendors = ['moz', 'webkit'],
					suffix = 'AnimationFrame',
					raf = root['request' + suffix],
					caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

				for (var i = 0; !raf && i < vendors.length; i++) {
					raf = root[vendors[i] + 'Request' + suffix]
					caf = root[vendors[i] + 'Cancel' + suffix] ||
						root[vendors[i] + 'CancelRequest' + suffix]
				}

				// Some versions of FF have rAF but not cAF
				if (!raf || !caf) {
					var last = 0,
						id = 0,
						queue = [],
						frameDuration = 1000 / 60

					raf = function(callback) {
						if (queue.length === 0) {
							var _now = now(),
								next = Math.max(0, frameDuration - (_now - last))
							last = next + _now
							setTimeout(function() {
								var cp = queue.slice(0)
								// Clear queue here to prevent
								// callbacks from appending listeners
								// to the current frame's queue
								queue.length = 0
								for (var i = 0; i < cp.length; i++) {
									if (!cp[i].cancelled) {
										try {
											cp[i].callback(last)
										} catch (e) {
											setTimeout(function() {
												throw e
											}, 0)
										}
									}
								}
							}, Math.round(next))
						}
						queue.push({
							handle: ++id,
							callback: callback,
							cancelled: false
						})
						return id
					}

					caf = function(handle) {
						for (var i = 0; i < queue.length; i++) {
							if (queue[i].handle === handle) {
								queue[i].cancelled = true
							}
						}
					}
				}

				module.exports = function(fn) {
					// Wrap in a new function to prevent
					// `cancel` potentially being assigned
					// to the native rAF function
					return raf.call(root, fn)
				}
				module.exports.cancel = function() {
					caf.apply(root, arguments)
				}
				module.exports.polyfill = function(object) {
					if (!object) {
						object = root;
					}
					object.requestAnimationFrame = raf
					object.cancelAnimationFrame = caf
				}

				/* WEBPACK VAR INJECTION */
			}.call(exports, (function() {
				return this;
			}())))

			/***/
		}),
		/* 104 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) { // Generated by CoffeeScript 1.12.2
				(function() {
					var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

					if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
						module.exports = function() {
							return performance.now();
						};
					} else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
						module.exports = function() {
							return (getNanoSeconds() - nodeLoadTime) / 1e6;
						};
						hrtime = process.hrtime;
						getNanoSeconds = function() {
							var hr;
							hr = hrtime();
							return hr[0] * 1e9 + hr[1];
						};
						moduleLoadTime = getNanoSeconds();
						upTime = process.uptime() * 1e9;
						nodeLoadTime = moduleLoadTime - upTime;
					} else if (Date.now) {
						module.exports = function() {
							return Date.now() - loadTime;
						};
						loadTime = Date.now();
					} else {
						module.exports = function() {
							return new Date().getTime() - loadTime;
						};
						loadTime = new Date().getTime();
					}

				}).call(this);

				//# sourceMappingURL=performance-now.js.map

				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 105 */
		/***/
		(function(module, exports, __webpack_require__) {

			var prefix = __webpack_require__(106)
			var toCamelCase = __webpack_require__(107)
			var cache = {
				'float': 'cssFloat'
			}
			var addPxToStyle = __webpack_require__(110)

			function style(element, property, value) {
				var camel = cache[property]
				if (typeof camel === 'undefined') {
					camel = detect(property)
				}

				// may be false if CSS prop is unsupported
				if (camel) {
					if (value === undefined) {
						return element.style[camel]
					}

					element.style[camel] = addPxToStyle(camel, value)
				}
			}

			function each(element, properties) {
				for (var k in properties) {
					if (properties.hasOwnProperty(k)) {
						style(element, k, properties[k])
					}
				}
			}

			function detect(cssProp) {
				var camel = toCamelCase(cssProp)
				var result = prefix(camel)
				cache[camel] = cache[cssProp] = cache[result] = result
				return result
			}

			function set() {
				if (arguments.length === 2) {
					if (typeof arguments[1] === 'string') {
						arguments[0].style.cssText = arguments[1]
					} else {
						each(arguments[0], arguments[1])
					}
				} else {
					style(arguments[0], arguments[1], arguments[2])
				}
			}

			module.exports = set
			module.exports.set = set

			module.exports.get = function(element, properties) {
				if (Array.isArray(properties)) {
					return properties.reduce(function(obj, prop) {
						obj[prop] = style(element, prop || '')
						return obj
					}, {})
				} else {
					return style(element, properties || '')
				}
			}


			/***/
		}),
		/* 106 */
		/***/
		(function(module, exports) {

			var div = null
			var prefixes = ['Webkit', 'Moz', 'O', 'ms']

			module.exports = function prefixStyle(prop) {
				// re-use a dummy div
				if (!div) {
					div = document.createElement('div')
				}

				var style = div.style

				// prop exists without prefix
				if (prop in style) {
					return prop
				}

				// borderRadius -> BorderRadius
				var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)

				// find the vendor-prefixed prop
				for (var i = prefixes.length; i >= 0; i--) {
					var name = prefixes[i] + titleCase
					// e.g. WebkitBorderRadius or webkitBorderRadius
					if (name in style) {
						return name
					}
				}

				return false
			}


			/***/
		}),
		/* 107 */
		/***/
		(function(module, exports, __webpack_require__) {


			var space = __webpack_require__(108)

			/**
			 * Export.
			 */

			module.exports = toCamelCase

			/**
			 * Convert a `string` to camel case.
			 *
			 * @param {String} string
			 * @return {String}
			 */

			function toCamelCase(string) {
				return space(string).replace(/\s(\w)/g, function(matches, letter) {
					return letter.toUpperCase()
				})
			}


			/***/
		}),
		/* 108 */
		/***/
		(function(module, exports, __webpack_require__) {


			var clean = __webpack_require__(109)

			/**
			 * Export.
			 */

			module.exports = toSpaceCase

			/**
			 * Convert a `string` to space case.
			 *
			 * @param {String} string
			 * @return {String}
			 */

			function toSpaceCase(string) {
				return clean(string).replace(/[\W_]+(.|$)/g, function(matches, match) {
					return match ? ' ' + match : ''
				}).trim()
			}


			/***/
		}),
		/* 109 */
		/***/
		(function(module, exports) {


			/**
			 * Export.
			 */

			module.exports = toNoCase

			/**
			 * Test whether a string is camel-case.
			 */

			var hasSpace = /\s/
			var hasSeparator = /(_|-|\.|:)/
			var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

			/**
			 * Remove any starting case from a `string`, like camel or snake, but keep
			 * spaces and punctuation that may be important otherwise.
			 *
			 * @param {String} string
			 * @return {String}
			 */

			function toNoCase(string) {
				if (hasSpace.test(string)) return string.toLowerCase()
				if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
				if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
				return string.toLowerCase()
			}

			/**
			 * Separator splitter.
			 */

			var separatorSplitter = /[\W_]+(.|$)/g

			/**
			 * Un-separate a `string`.
			 *
			 * @param {String} string
			 * @return {String}
			 */

			function unseparate(string) {
				return string.replace(separatorSplitter, function(m, next) {
					return next ? ' ' + next : ''
				})
			}

			/**
			 * Camelcase splitter.
			 */

			var camelSplitter = /(.)([A-Z]+)/g

			/**
			 * Un-camelcase a `string`.
			 *
			 * @param {String} string
			 * @return {String}
			 */

			function uncamelize(string) {
				return string.replace(camelSplitter, function(m, previous, uppers) {
					return previous + ' ' + uppers.toLowerCase().split('').join(' ')
				})
			}


			/***/
		}),
		/* 110 */
		/***/
		(function(module, exports) {

			/* The following list is defined in React's core */
			var IS_UNITLESS = {
				animationIterationCount: true,
				boxFlex: true,
				boxFlexGroup: true,
				boxOrdinalGroup: true,
				columnCount: true,
				flex: true,
				flexGrow: true,
				flexPositive: true,
				flexShrink: true,
				flexNegative: true,
				flexOrder: true,
				gridRow: true,
				gridColumn: true,
				fontWeight: true,
				lineClamp: true,
				lineHeight: true,
				opacity: true,
				order: true,
				orphans: true,
				tabSize: true,
				widows: true,
				zIndex: true,
				zoom: true,

				// SVG-related properties
				fillOpacity: true,
				stopOpacity: true,
				strokeDashoffset: true,
				strokeOpacity: true,
				strokeWidth: true
			};

			module.exports = function(name, value) {
				if (typeof value === 'number' && !IS_UNITLESS[name]) {
					return value + 'px';
				} else {
					return value;
				}
			};

			/***/
		}),
		/* 111 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) {
				/**
				 * Copyright (c) 2013-present, Facebook, Inc.
				 *
				 * This source code is licensed under the MIT license found in the
				 * LICENSE file in the root directory of this source tree.
				 */

				if (process.env.NODE_ENV !== 'production') {
					var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
						Symbol.for &&
						Symbol.for('react.element')) ||
						0xeac7;

					var isValidElement = function(object) {
						return typeof object === 'object' &&
							object !== null &&
							object.$$typeof === REACT_ELEMENT_TYPE;
					};

					// By explicitly using `prop-types` you are opting into new development behavior.
					// http://fb.me/prop-types-in-prod
					var throwOnDirectAccess = true;
					module.exports = __webpack_require__(112)(isValidElement, throwOnDirectAccess);
				} else {
					// By explicitly using `prop-types` you are opting into new production behavior.
					// http://fb.me/prop-types-in-prod
					module.exports = __webpack_require__(118)();
				}

				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 112 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) {
				/**
				 * Copyright (c) 2013-present, Facebook, Inc.
				 *
				 * This source code is licensed under the MIT license found in the
				 * LICENSE file in the root directory of this source tree.
				 */

				'use strict';

				var emptyFunction = __webpack_require__(113);
				var invariant = __webpack_require__(114);
				var warning = __webpack_require__(115);
				var assign = __webpack_require__(94);

				var ReactPropTypesSecret = __webpack_require__(116);
				var checkPropTypes = __webpack_require__(117);

				module.exports = function(isValidElement, throwOnDirectAccess) {
					/* global Symbol */
					var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
					var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

					/**
					 * Returns the iterator method function contained on the iterable object.
					 *
					 * Be sure to invoke the function with the iterable as context:
					 *
					 *     var iteratorFn = getIteratorFn(myIterable);
					 *     if (iteratorFn) {
					 *       var iterator = iteratorFn.call(myIterable);
					 *       ...
					 *     }
					 *
					 * @param {?object} maybeIterable
					 * @return {?function}
					 */
					function getIteratorFn(maybeIterable) {
						var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
						if (typeof iteratorFn === 'function') {
							return iteratorFn;
						}
					}

					/**
					 * Collection of methods that allow declaration and validation of props that are
					 * supplied to React components. Example usage:
					 *
					 *   var Props = require('ReactPropTypes');
					 *   var MyArticle = React.createClass({
					 *     propTypes: {
					 *       // An optional string prop named "description".
					 *       description: Props.string,
					 *
					 *       // A required enum prop named "category".
					 *       category: Props.oneOf(['News','Photos']).isRequired,
					 *
					 *       // A prop named "dialog" that requires an instance of Dialog.
					 *       dialog: Props.instanceOf(Dialog).isRequired
					 *     },
					 *     render: function() { ... }
					 *   });
					 *
					 * A more formal specification of how these methods are used:
					 *
					 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
					 *   decl := ReactPropTypes.{type}(.isRequired)?
					 *
					 * Each and every declaration produces a function with the same signature. This
					 * allows the creation of custom validation functions. For example:
					 *
					 *  var MyLink = React.createClass({
					 *    propTypes: {
					 *      // An optional string or URI prop named "href".
					 *      href: function(props, propName, componentName) {
					 *        var propValue = props[propName];
					 *        if (propValue != null && typeof propValue !== 'string' &&
					 *            !(propValue instanceof URI)) {
					 *          return new Error(
					 *            'Expected a string or an URI for ' + propName + ' in ' +
					 *            componentName
					 *          );
					 *        }
					 *      }
					 *    },
					 *    render: function() {...}
					 *  });
					 *
					 * @internal
					 */

					var ANONYMOUS = '<<anonymous>>';

					// Important!
					// Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
					var ReactPropTypes = {
						array: createPrimitiveTypeChecker('array'),
						bool: createPrimitiveTypeChecker('boolean'),
						func: createPrimitiveTypeChecker('function'),
						number: createPrimitiveTypeChecker('number'),
						object: createPrimitiveTypeChecker('object'),
						string: createPrimitiveTypeChecker('string'),
						symbol: createPrimitiveTypeChecker('symbol'),

						any: createAnyTypeChecker(),
						arrayOf: createArrayOfTypeChecker,
						element: createElementTypeChecker(),
						instanceOf: createInstanceTypeChecker,
						node: createNodeChecker(),
						objectOf: createObjectOfTypeChecker,
						oneOf: createEnumTypeChecker,
						oneOfType: createUnionTypeChecker,
						shape: createShapeTypeChecker,
						exact: createStrictShapeTypeChecker,
					};

					/**
					 * inlined Object.is polyfill to avoid requiring consumers ship their own
					 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
					 */
					/*eslint-disable no-self-compare*/
					function is(x, y) {
						// SameValue algorithm
						if (x === y) {
							// Steps 1-5, 7-10
							// Steps 6.b-6.e: +0 != -0
							return x !== 0 || 1 / x === 1 / y;
						} else {
							// Step 6.a: NaN == NaN
							return x !== x && y !== y;
						}
					}
					/*eslint-enable no-self-compare*/

					/**
					 * We use an Error-like object for backward compatibility as people may call
					 * PropTypes directly and inspect their output. However, we don't use real
					 * Errors anymore. We don't inspect their stack anyway, and creating them
					 * is prohibitively expensive if they are created too often, such as what
					 * happens in oneOfType() for any type before the one that matched.
					 */
					function PropTypeError(message) {
						this.message = message;
						this.stack = '';
					}
					// Make `instanceof Error` still work for returned errors.
					PropTypeError.prototype = Error.prototype;

					function createChainableTypeChecker(validate) {
						if (process.env.NODE_ENV !== 'production') {
							var manualPropTypeCallCache = {};
							var manualPropTypeWarningCount = 0;
						}

						function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
							componentName = componentName || ANONYMOUS;
							propFullName = propFullName || propName;

							if (secret !== ReactPropTypesSecret) {
								if (throwOnDirectAccess) {
									// New behavior only for users of `prop-types` package
									invariant(
										false,
										'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
										'Use `PropTypes.checkPropTypes()` to call them. ' +
										'Read more at http://fb.me/use-check-prop-types'
									);
								} else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
									// Old behavior for people using React.PropTypes
									var cacheKey = componentName + ':' + propName;
									if (!manualPropTypeCallCache[cacheKey] &&
										// Avoid spamming the console because they are often not actionable except for lib authors
										manualPropTypeWarningCount < 3
									) {
										warning(
											false,
											'You are manually calling a React.PropTypes validation ' +
											'function for the `%s` prop on `%s`. This is deprecated ' +
											'and will throw in the standalone `prop-types` package. ' +
											'You may be seeing this warning due to a third-party PropTypes ' +
											'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
											propFullName,
											componentName
										);
										manualPropTypeCallCache[cacheKey] = true;
										manualPropTypeWarningCount++;
									}
								}
							}
							if (props[propName] == null) {
								if (isRequired) {
									if (props[propName] === null) {
										return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
									}
									return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
								}
								return null;
							} else {
								return validate(props, propName, componentName, location, propFullName);
							}
						}

						var chainedCheckType = checkType.bind(null, false);
						chainedCheckType.isRequired = checkType.bind(null, true);

						return chainedCheckType;
					}

					function createPrimitiveTypeChecker(expectedType) {
						function validate(props, propName, componentName, location, propFullName, secret) {
							var propValue = props[propName];
							var propType = getPropType(propValue);
							if (propType !== expectedType) {
								// `propValue` being instance of, say, date/regexp, pass the 'object'
								// check, but we can offer a more precise error message here rather than
								// 'of type `object`'.
								var preciseType = getPreciseType(propValue);

								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createAnyTypeChecker() {
						return createChainableTypeChecker(emptyFunction.thatReturnsNull);
					}

					function createArrayOfTypeChecker(typeChecker) {
						function validate(props, propName, componentName, location, propFullName) {
							if (typeof typeChecker !== 'function') {
								return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
							}
							var propValue = props[propName];
							if (!Array.isArray(propValue)) {
								var propType = getPropType(propValue);
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
							}
							for (var i = 0; i < propValue.length; i++) {
								var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
								if (error instanceof Error) {
									return error;
								}
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createElementTypeChecker() {
						function validate(props, propName, componentName, location, propFullName) {
							var propValue = props[propName];
							if (!isValidElement(propValue)) {
								var propType = getPropType(propValue);
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createInstanceTypeChecker(expectedClass) {
						function validate(props, propName, componentName, location, propFullName) {
							if (!(props[propName] instanceof expectedClass)) {
								var expectedClassName = expectedClass.name || ANONYMOUS;
								var actualClassName = getClassName(props[propName]);
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createEnumTypeChecker(expectedValues) {
						if (!Array.isArray(expectedValues)) {
							process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
							return emptyFunction.thatReturnsNull;
						}

						function validate(props, propName, componentName, location, propFullName) {
							var propValue = props[propName];
							for (var i = 0; i < expectedValues.length; i++) {
								if (is(propValue, expectedValues[i])) {
									return null;
								}
							}

							var valuesString = JSON.stringify(expectedValues);
							return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
						}
						return createChainableTypeChecker(validate);
					}

					function createObjectOfTypeChecker(typeChecker) {
						function validate(props, propName, componentName, location, propFullName) {
							if (typeof typeChecker !== 'function') {
								return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
							}
							var propValue = props[propName];
							var propType = getPropType(propValue);
							if (propType !== 'object') {
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
							}
							for (var key in propValue) {
								if (propValue.hasOwnProperty(key)) {
									var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
									if (error instanceof Error) {
										return error;
									}
								}
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createUnionTypeChecker(arrayOfTypeCheckers) {
						if (!Array.isArray(arrayOfTypeCheckers)) {
							process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
							return emptyFunction.thatReturnsNull;
						}

						for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
							var checker = arrayOfTypeCheckers[i];
							if (typeof checker !== 'function') {
								warning(
									false,
									'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
									'received %s at index %s.',
									getPostfixForTypeWarning(checker),
									i
								);
								return emptyFunction.thatReturnsNull;
							}
						}

						function validate(props, propName, componentName, location, propFullName) {
							for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
								var checker = arrayOfTypeCheckers[i];
								if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
									return null;
								}
							}

							return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
						}
						return createChainableTypeChecker(validate);
					}

					function createNodeChecker() {
						function validate(props, propName, componentName, location, propFullName) {
							if (!isNode(props[propName])) {
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createShapeTypeChecker(shapeTypes) {
						function validate(props, propName, componentName, location, propFullName) {
							var propValue = props[propName];
							var propType = getPropType(propValue);
							if (propType !== 'object') {
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
							}
							for (var key in shapeTypes) {
								var checker = shapeTypes[key];
								if (!checker) {
									continue;
								}
								var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
								if (error) {
									return error;
								}
							}
							return null;
						}
						return createChainableTypeChecker(validate);
					}

					function createStrictShapeTypeChecker(shapeTypes) {
						function validate(props, propName, componentName, location, propFullName) {
							var propValue = props[propName];
							var propType = getPropType(propValue);
							if (propType !== 'object') {
								return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
							}
							// We need to check all keys in case some are required but missing from
							// props.
							var allKeys = assign({}, props[propName], shapeTypes);
							for (var key in allKeys) {
								var checker = shapeTypes[key];
								if (!checker) {
									return new PropTypeError(
										'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
										'\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
										'\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
									);
								}
								var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
								if (error) {
									return error;
								}
							}
							return null;
						}

						return createChainableTypeChecker(validate);
					}

					function isNode(propValue) {
						switch (typeof propValue) {
							case 'number':
							case 'string':
							case 'undefined':
								return true;
							case 'boolean':
								return !propValue;
							case 'object':
								if (Array.isArray(propValue)) {
									return propValue.every(isNode);
								}
								if (propValue === null || isValidElement(propValue)) {
									return true;
								}

								var iteratorFn = getIteratorFn(propValue);
								if (iteratorFn) {
									var iterator = iteratorFn.call(propValue);
									var step;
									if (iteratorFn !== propValue.entries) {
										while (!(step = iterator.next()).done) {
											if (!isNode(step.value)) {
												return false;
											}
										}
									} else {
										// Iterator will provide entry [k,v] tuples rather than values.
										while (!(step = iterator.next()).done) {
											var entry = step.value;
											if (entry) {
												if (!isNode(entry[1])) {
													return false;
												}
											}
										}
									}
								} else {
									return false;
								}

								return true;
							default:
								return false;
						}
					}

					function isSymbol(propType, propValue) {
						// Native Symbol.
						if (propType === 'symbol') {
							return true;
						}

						// 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
						if (propValue['@@toStringTag'] === 'Symbol') {
							return true;
						}

						// Fallback for non-spec compliant Symbols which are polyfilled.
						if (typeof Symbol === 'function' && propValue instanceof Symbol) {
							return true;
						}

						return false;
					}

					// Equivalent of `typeof` but with special handling for array and regexp.
					function getPropType(propValue) {
						var propType = typeof propValue;
						if (Array.isArray(propValue)) {
							return 'array';
						}
						if (propValue instanceof RegExp) {
							// Old webkits (at least until Android 4.0) return 'function' rather than
							// 'object' for typeof a RegExp. We'll normalize this here so that /bla/
							// passes PropTypes.object.
							return 'object';
						}
						if (isSymbol(propType, propValue)) {
							return 'symbol';
						}
						return propType;
					}

					// This handles more types than `getPropType`. Only used for error messages.
					// See `createPrimitiveTypeChecker`.
					function getPreciseType(propValue) {
						if (typeof propValue === 'undefined' || propValue === null) {
							return '' + propValue;
						}
						var propType = getPropType(propValue);
						if (propType === 'object') {
							if (propValue instanceof Date) {
								return 'date';
							} else if (propValue instanceof RegExp) {
								return 'regexp';
							}
						}
						return propType;
					}

					// Returns a string that is postfixed to a warning about an invalid type.
					// For example, "undefined" or "of type array"
					function getPostfixForTypeWarning(value) {
						var type = getPreciseType(value);
						switch (type) {
							case 'array':
							case 'object':
								return 'an ' + type;
							case 'boolean':
							case 'date':
							case 'regexp':
								return 'a ' + type;
							default:
								return type;
						}
					}

					// Returns class name of the object, if any.
					function getClassName(propValue) {
						if (!propValue.constructor || !propValue.constructor.name) {
							return ANONYMOUS;
						}
						return propValue.constructor.name;
					}

					ReactPropTypes.checkPropTypes = checkPropTypes;
					ReactPropTypes.PropTypes = ReactPropTypes;

					return ReactPropTypes;
				};

				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 113 */
		/***/
		(function(module, exports) {

			"use strict";

			/**
			 * Copyright (c) 2013-present, Facebook, Inc.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 *
			 *
			 */

			function makeEmptyFunction(arg) {
				return function() {
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
			emptyFunction.thatReturnsThis = function() {
				return this;
			};
			emptyFunction.thatReturnsArgument = function(arg) {
				return arg;
			};

			module.exports = emptyFunction;

			/***/
		}),
		/* 114 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) {
				/**
				 * Copyright (c) 2013-present, Facebook, Inc.
				 *
				 * This source code is licensed under the MIT license found in the
				 * LICENSE file in the root directory of this source tree.
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
							error = new Error(format.replace(/%s/g, function() {
								return args[argIndex++];
							}));
							error.name = 'Invariant Violation';
						}

						error.framesToPop = 1; // we don't care about invariant's own frame
						throw error;
					}
				}

				module.exports = invariant;
				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 115 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) {
				/**
				 * Copyright (c) 2014-present, Facebook, Inc.
				 *
				 * This source code is licensed under the MIT license found in the
				 * LICENSE file in the root directory of this source tree.
				 *
				 */

				'use strict';

				var emptyFunction = __webpack_require__(113);

				/**
				 * Similar to invariant but only logs a warning if the condition is not met.
				 * This can be used to log issues in development environments in critical
				 * paths. Removing the logging code for production environments will keep the
				 * same logic and follow the same code paths.
				 */

				var warning = emptyFunction;

				if (process.env.NODE_ENV !== 'production') {
					var printWarning = function printWarning(format) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}

						var argIndex = 0;
						var message = 'Warning: ' + format.replace(/%s/g, function() {
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
				}

				module.exports = warning;
				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 116 */
		/***/
		(function(module, exports) {

			/**
			 * Copyright (c) 2013-present, Facebook, Inc.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 */

			'use strict';

			var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

			module.exports = ReactPropTypesSecret;


			/***/
		}),
		/* 117 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process) {
				/**
				 * Copyright (c) 2013-present, Facebook, Inc.
				 *
				 * This source code is licensed under the MIT license found in the
				 * LICENSE file in the root directory of this source tree.
				 */

				'use strict';

				if (process.env.NODE_ENV !== 'production') {
					var invariant = __webpack_require__(114);
					var warning = __webpack_require__(115);
					var ReactPropTypesSecret = __webpack_require__(116);
					var loggedTypeFailures = {};
				}

				/**
				 * Assert that the values match with the type specs.
				 * Error messages are memorized and will only be shown once.
				 *
				 * @param {object} typeSpecs Map of name to a ReactPropType
				 * @param {object} values Runtime values that need to be type-checked
				 * @param {string} location e.g. "prop", "context", "child context"
				 * @param {string} componentName Name of the component for error messages.
				 * @param {?Function} getStack Returns the component stack.
				 * @private
				 */
				function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
					if (process.env.NODE_ENV !== 'production') {
						for (var typeSpecName in typeSpecs) {
							if (typeSpecs.hasOwnProperty(typeSpecName)) {
								var error;
								// Prop type validation may throw. In case they do, we don't want to
								// fail the render phase where it didn't fail before. So we log it.
								// After these have been cleaned up, we'll let them throw.
								try {
									// This is intentionally an invariant that gets caught. It's the same
									// behavior as without this statement except with a better message.
									invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
									error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
								} catch (ex) {
									error = ex;
								}
								warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
								if (error instanceof Error && !(error.message in loggedTypeFailures)) {
									// Only monitor this failure once because there tends to be a lot of the
									// same error.
									loggedTypeFailures[error.message] = true;

									var stack = getStack ? getStack() : '';

									warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
								}
							}
						}
					}
				}

				module.exports = checkPropTypes;

				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96)))

			/***/
		}),
		/* 118 */
		/***/
		(function(module, exports, __webpack_require__) {

			/**
			 * Copyright (c) 2013-present, Facebook, Inc.
			 *
			 * This source code is licensed under the MIT license found in the
			 * LICENSE file in the root directory of this source tree.
			 */

			'use strict';

			var emptyFunction = __webpack_require__(113);
			var invariant = __webpack_require__(114);
			var ReactPropTypesSecret = __webpack_require__(116);

			module.exports = function() {
				function shim(props, propName, componentName, location, propFullName, secret) {
					if (secret === ReactPropTypesSecret) {
						// It is still safe when called from React.
						return;
					}
					invariant(
						false,
						'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
						'Use PropTypes.checkPropTypes() to call them. ' +
						'Read more at http://fb.me/use-check-prop-types'
					);
				};
				shim.isRequired = shim;

				function getShim() {
					return shim;
				};
				// Important!
				// Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
				var ReactPropTypes = {
					array: shim,
					bool: shim,
					func: shim,
					number: shim,
					object: shim,
					string: shim,
					symbol: shim,

					any: shim,
					arrayOf: getShim,
					element: shim,
					instanceOf: getShim,
					node: shim,
					objectOf: getShim,
					oneOf: getShim,
					oneOfType: getShim,
					shape: getShim,
					exact: getShim
				};

				ReactPropTypes.checkPropTypes = emptyFunction;
				ReactPropTypes.PropTypes = ReactPropTypes;

				return ReactPropTypes;
			};


			/***/
		}),
		/* 119 */
		/***/
		(function(module, exports) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports["default"] = isString;

			function isString(maybe) {
				return typeof maybe === 'string';
			}

			/***/
		}),
		/* 120 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports["default"] = getScrollbarWidth;

			var _domCss = __webpack_require__(105);

			var _domCss2 = _interopRequireDefault(_domCss);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					"default": obj
				};
			}

			var scrollbarWidth = false;

			function getScrollbarWidth() {
				if (scrollbarWidth !== false) return scrollbarWidth;
				/* istanbul ignore else */
				if (typeof document !== 'undefined') {
					var div = document.createElement('div');
					(0, _domCss2["default"])(div, {
						width: 100,
						height: 100,
						position: 'absolute',
						top: -9999,
						overflow: 'scroll',
						MsOverflowStyle: 'scrollbar'
					});
					document.body.appendChild(div);
					scrollbarWidth = div.offsetWidth - div.clientWidth;
					document.body.removeChild(div);
				} else {
					scrollbarWidth = 0;
				}
				return scrollbarWidth || 0;
			}

			/***/
		}),
		/* 121 */
		/***/
		(function(module, exports) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports["default"] = returnFalse;

			function returnFalse() {
				return false;
			}

			/***/
		}),
		/* 122 */
		/***/
		(function(module, exports) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports["default"] = getInnerWidth;

			function getInnerWidth(el) {
				var clientWidth = el.clientWidth;

				var _getComputedStyle = getComputedStyle(el),
					paddingLeft = _getComputedStyle.paddingLeft,
					paddingRight = _getComputedStyle.paddingRight;

				return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
			}

			/***/
		}),
		/* 123 */
		/***/
		(function(module, exports) {

			"use strict";

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			exports["default"] = getInnerHeight;

			function getInnerHeight(el) {
				var clientHeight = el.clientHeight;

				var _getComputedStyle = getComputedStyle(el),
					paddingTop = _getComputedStyle.paddingTop,
					paddingBottom = _getComputedStyle.paddingBottom;

				return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
			}

			/***/
		}),
		/* 124 */
		/***/
		(function(module, exports) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});
			var containerStyleDefault = exports.containerStyleDefault = {
				position: 'relative',
				overflow: 'hidden',
				width: '100%',
				height: '100%'
			};

			// Overrides containerStyleDefault properties
			var containerStyleAutoHeight = exports.containerStyleAutoHeight = {
				height: 'auto'
			};

			var viewStyleDefault = exports.viewStyleDefault = {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				overflow: 'scroll',
				WebkitOverflowScrolling: 'touch'
			};

			// Overrides viewStyleDefault properties
			var viewStyleAutoHeight = exports.viewStyleAutoHeight = {
				position: 'relative',
				top: undefined,
				left: undefined,
				right: undefined,
				bottom: undefined
			};

			var viewStyleUniversalInitial = exports.viewStyleUniversalInitial = {
				overflow: 'hidden',
				marginRight: 0,
				marginBottom: 0
			};

			var trackHorizontalStyleDefault = exports.trackHorizontalStyleDefault = {
				position: 'absolute',
				height: 6
			};

			var trackVerticalStyleDefault = exports.trackVerticalStyleDefault = {
				position: 'absolute',
				width: 6
			};

			var thumbHorizontalStyleDefault = exports.thumbHorizontalStyleDefault = {
				position: 'relative',
				display: 'block',
				height: '100%'
			};

			var thumbVerticalStyleDefault = exports.thumbVerticalStyleDefault = {
				position: 'relative',
				display: 'block',
				width: '100%'
			};

			var disableSelectStyle = exports.disableSelectStyle = {
				userSelect: 'none'
			};

			var disableSelectStyleReset = exports.disableSelectStyleReset = {
				userSelect: ''
			};

			/***/
		}),
		/* 125 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, "__esModule", {
				value: true
			});

			var _extends = Object.assign || function(target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
				return target;
			};

			exports.renderViewDefault = renderViewDefault;
			exports.renderTrackHorizontalDefault = renderTrackHorizontalDefault;
			exports.renderTrackVerticalDefault = renderTrackVerticalDefault;
			exports.renderThumbHorizontalDefault = renderThumbHorizontalDefault;
			exports.renderThumbVerticalDefault = renderThumbVerticalDefault;

			var _react = __webpack_require__(1);

			var _react2 = _interopRequireDefault(_react);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					"default": obj
				};
			}

			function _objectWithoutProperties(obj, keys) {
				var target = {};
				for (var i in obj) {
					if (keys.indexOf(i) >= 0) continue;
					if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
					target[i] = obj[i];
				}
				return target;
			}

			/* eslint-disable react/prop-types */

			function renderViewDefault(props) {
				return _react2["default"].createElement('div', props);
			}

			function renderTrackHorizontalDefault(_ref) {
				var style = _ref.style,
					props = _objectWithoutProperties(_ref, ['style']);

				var finalStyle = _extends({}, style, {
					right: 2,
					bottom: 2,
					left: 2,
					borderRadius: 3
				});
				return _react2["default"].createElement('div', _extends({
					style: finalStyle
				}, props));
			}

			function renderTrackVerticalDefault(_ref2) {
				var style = _ref2.style,
					props = _objectWithoutProperties(_ref2, ['style']);

				var finalStyle = _extends({}, style, {
					right: 2,
					bottom: 2,
					top: 2,
					borderRadius: 3
				});
				return _react2["default"].createElement('div', _extends({
					style: finalStyle
				}, props));
			}

			function renderThumbHorizontalDefault(_ref3) {
				var style = _ref3.style,
					props = _objectWithoutProperties(_ref3, ['style']);

				var finalStyle = _extends({}, style, {
					cursor: 'pointer',
					borderRadius: 'inherit',
					backgroundColor: 'rgba(0,0,0,.2)'
				});
				return _react2["default"].createElement('div', _extends({
					style: finalStyle
				}, props));
			}

			function renderThumbVerticalDefault(_ref4) {
				var style = _ref4.style,
					props = _objectWithoutProperties(_ref4, ['style']);

				var finalStyle = _extends({}, style, {
					cursor: 'pointer',
					borderRadius: 'inherit',
					backgroundColor: 'rgba(0,0,0,.2)'
				});
				return _react2["default"].createElement('div', _extends({
					style: finalStyle
				}, props));
			}

			/***/
		}),
		/* 126 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			var _director = __webpack_require__(127);

			window.router = new _director.Router();

			function designClickFn() {
				var str = '<div class="modal-dialog modal-center"><div class="modal-content"><div class="modal-header"><button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button><h4 class="modal-title">编辑小部件</h4></div><div class="modal-body"><div class="site-items list-unstyled"><div class="widget-create-edit"><div class="panel-body"><form  class="widget-form" ><div id="editModal" class="margin-bottom-15"></div><div id="errorMessage"></div><div class="modal-footer"><button class="u-button u-button-info font-size-14" data-type="save" type="button" id="modelSave" style="height: 36px;">保存</button><button data-dismiss="modal" class="u-button margin-left-10 font-size-14" type="button" style="height: 36px;border: 1px solid #cecece;">取消</button></div></form></div></div></div></div></div></div>';
				$('#modalBlue').html(str);
			}
			designClickFn();

			var routeInit = function routeInit(p) {
				return function() {
					var module = p;
					var content = document.getElementById("content");
					requirejs([module], function(module) {
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
				load([module], function(module) {
					$('#content').html('');
					module.init(params);
				});
			};

			//注册路由
			window.registerRouter = function(id, path) {
				router.on(id, routeInit(path));
			};
			window.addRouter = function(path, func) {
				var pos = path.indexOf('/:');
				var truePath = path;
				if (pos != -1) truePath = path.substring(0, pos);
				func = func || function() {
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

			router.on('/widget', function() {
				var widget = __webpack_require__(128);
				widget.init();
			});
			//布局站点管理
			router.on('/layouts', function() {
				var sites = __webpack_require__(132);
				sites.init();
			});

			//布局模板管理
			router.on('/layout/template', function(id, viewid) {
				var layout = __webpack_require__(135);
				layout.init();
			});
			router.on('/design', function() {
				var id = getParamUrl('lid', $('.unsortable').attr('data-ul'));
				var version = $('#content').attr('v');
				$('#content').attr('identity', 'normal');
				var layout = __webpack_require__(137);
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
			router.on('/layout/:id/:modifytime/back/:router', function(id, modifytime, router) {
				var layout = __webpack_require__(137);
				var param = {
					id: id,
					element: 'designerContent',
					modifytime: decodeURIComponent(modifytime),
					router: router
				};
				layout.init(param);
				designClickFn();
			});

			router.on('after', '/layout/:id/:modifytime/back/:router', function(id, modifytime, router) {
				$('.modal-backdrop').fadeOut(function() {
					$(this).remove();
				});
			});

			router.on('/home/:viewid', function(viewid) {
				initLayout(contextRoot + "/data:layout/" + viewid, []);
			});

			router.on('/layout/:id/:viewid', function(id, viewid) {
				var layout = __webpack_require__(137);
				var param = {
					id: id,
					viewid: viewid
				};
				layout.init(param);
				designClickFn();
			});

			router.on('/sidebar/:id/:viewid', function(id, viewid) {
				var layout = __webpack_require__(137);
				var param = {
					id: id,
					viewid: viewid
				};
				layout.init(param);
			});

			router.on('/ifr/:id', function(id) {

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
					autodiv.css({
						overflow: "auto"
					});
					$(window).resize(function() {
						autoH();
					});
				}
			});
			router.on('/ifrNoHead/:id', function(id) {
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
					autodiv.css({
						overflow: "auto"
					});
					$(window).resize(function() {
						autoH();
					});
				}
			});

			router.on('/userMapping/relevance/:systemCode', function(systemCode) {
				var userMapping = __webpack_require__(142);
				userMapping.init(systemCode, document.getElementById('content'));
			});

			module.exports = router;

			/***/
		}),
		/* 127 */
		/***/
		(function(module, exports, __webpack_require__) {



			//
			// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
			// Version 1.2.6
			//

			(function(exports) {

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

					check: function() {
						var h = dloc.hash;
						if (h != this.hash) {
							this.hash = h;
							this.onHashChanged();
						}
					},

					fire: function() {
						if (this.mode === 'modern') {
							this.history === true ? window.onpopstate() : window.onhashchange();
						} else {
							this.onHashChanged();
						}
					},

					init: function(fn, history) {
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
						if ('onhashchange' in window && (document.documentMode === undefined ||
							document.documentMode > 7)) {
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
							} else {
								window.onhashchange = onchange;
							}
							this.mode = 'modern';
						} else {
							//
							// IE support, based on a concept by Erik Arvidson ...
							//
							var frame = document.createElement('iframe');
							frame.id = 'state-frame';
							frame.style.display = 'none';
							document.body.appendChild(frame);
							this.writeFrame('');

							if ('onpropertychange' in document && 'attachEvent' in document) {
								document.attachEvent('onpropertychange', function() {
									if (event.propertyName === 'location') {
										self.check();
									}
								});
							}

							window.setInterval(function() {
								self.check();
							}, 50);

							this.onHashChanged = onchange;
							this.mode = 'legacy';
						}

						Router.listeners.push(fn);

						return this.mode;
					},

					destroy: function(fn) {
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

					setHash: function(s) {
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

					writeFrame: function(s) {
						// IE support...
						var f = document.getElementById('state-frame');
						var d = f.contentDocument || f.contentWindow.document;
						d.open();
						d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
						d.close();
					},

					syncHash: function() {
						// IE support...
						var s = this._hash;
						if (s != dloc.hash) {
							dloc.hash = s;
						}
						return this;
					},

					onHashChanged: function() {}
				};

				var Router = exports.Router = function(routes) {
					if (!(this instanceof Router)) return new Router(routes);

					this.params = {};
					this.routes = {};
					this.methods = ['on', 'once', 'after', 'before'];
					this.scope = [];
					this._methods = {};

					this._insert = this.insert;
					this.insert = this.insertEx;

					this.historySupport = (window.history != null ? window.history.pushState : null) != null

					this.configure();
					this.mount(routes || {});
				};

				Router.prototype.init = function(r) {
					var self = this,
						routeTo;
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
					} else {
						if (this.convert_hash_in_init) {
							// Use hash as route
							routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
							if (routeTo) {
								window.history.replaceState({}, document.title, routeTo);
							}
						} else {
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

				Router.prototype.explode = function() {
					var v = this.history === true ? this.getPath() : dloc.hash;
					if (v.charAt(1) === '/') {
						v = v.slice(1)
					}
					return v.slice(1, v.length).split("/");
				};

				Router.prototype.setRoute = function(i, v, val) {
					var url = this.explode();

					if (typeof i === 'number' && typeof v === 'string') {
						url[i] = v;
					} else if (typeof val === 'string') {
						url.splice(i, v, s);
					} else {
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

				Router.prototype.getRoute = function(v) {
					var ret = v;

					if (typeof v === "number") {
						ret = this.explode()[v];
					} else if (typeof v === "string") {
						var h = this.explode();
						ret = h.indexOf(v);
					} else {
						ret = this.explode();
					}

					return ret;
				};

				Router.prototype.destroy = function() {
					listener.destroy(this.handler);
					return this;
				};

				Router.prototype.getPath = function() {
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
					var matches, last = 0,
						out = "";
					while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
						last = matches.index + matches[0].length;
						matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
						out += str.substr(0, matches.index) + matches[0];
					}
					str = out += str.substr(last);
					var captures = str.match(/:([^\/]+)/ig),
						capture, length;
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
					var last = 0,
						left = 0,
						right = 0,
						start = (start || "(").toString(),
						stop = (stop || ")").toString(),
						i;
					for (i = 0; i < routes.length; i++) {
						var chunk = routes[i];
						if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
							left = chunk.indexOf(start, last);
							right = chunk.indexOf(stop, last);
							if (~left && !~right || !~left && ~right) {
								var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
								routes = [tmp].concat(routes.slice((i || 1) + 1));
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
					var self = this,
						length = this.scope.length;
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
					var self = this,
						fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""),
						invoked = this._invoked,
						after;
					this._invoked = true;
					if (!fns || fns.length === 0) {
						this.last = [];
						if (typeof this.notfound === "function") {
							this.invoke([this.notfound], {
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
					after = this.every && this.every.after ? [this.every.after].concat(this.last) : [this.last];
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
					var fns = [],
						current, exact, match, next, that;

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
						next = [
							[routes.before, routes[method]].filter(Boolean)
						];
						next.after = [routes.after].filter(Boolean);
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
								next = [
									[routes[r].before, routes[r][method]].filter(Boolean)
								];
								next.after = [routes[r].after].filter(Boolean);
								next.matched = true;
								next.captures = match.slice(1);
								if (this.recurse && routes === this.routes) {
									next.push([routes.before, routes.on].filter(Boolean));
									next.after = next.after.concat([routes.after].filter(Boolean));
								}
								return filterRoutes(next);
							}
							next = this.traverse(method, path, routes[r], current);
							if (next.matched) {
								if (next.length > 0) {
									fns = fns.concat(next);
								}
								if (this.recurse) {
									fns.push([routes[r].before, routes[r].on].filter(Boolean));
									next.after = next.after.concat([routes[r].after].filter(Boolean));
									if (routes === this.routes) {
										fns.push([routes["before"], routes["on"]].filter(Boolean));
										next.after = next.after.concat([routes["after"]].filter(Boolean));
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
								parent[method] = [parent[method], route];
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
								parent[part][method] = [parent[part][method], route];
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
					var self = this,
						len = methods.length,
						i;

					function extend(method) {
						self._methods[method] = true;
						self[method] = function() {
							var extra = arguments.length === 1 ? [method, ""] : [method];
							self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
						};
					}
					for (i = 0; i < len; i++) {
						extend(methods[i]);
					}
				};

				Router.prototype.runlist = function(fns) {
					var runlist = this.every && this.every.before ? [this.every.before].concat(_flatten(fns)) : _flatten(fns);
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
						var rename = route,
							parts = route.split(self.delimiter),
							routeType = typeof routes[route],
							isRoute = parts[0] === "" || !self._methods[parts[0]],
							event = isRoute ? "on" : rename;
						if (isRoute) {
							rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [""])[0].length);
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



			}(true ? exports : window));

			/***/
		}),
		/* 128 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			var _stringify = __webpack_require__(4);

			var _stringify2 = _interopRequireDefault(_stringify);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/**
			 * Created by chief on 2015/10/21.
			 */

			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				var template = __webpack_require__(129);
				var minlayout = __webpack_require__(130);

				var init = function init(options) {
					var options = $.extend({}, options);
					$(function() {

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
											$.each(data, function(i, item) {
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
									var html = render({
										list: res.data,
										backUrl: options.backUrl
									});

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

									$('.wtype').on('change', function() {
										edit($(this));
									});

									$('#widgetList').on('focus', 'input', function() {
										$(this).closest('form').find('#errorMessage').html('');
									});

									$('#examplePositionCenter').on('hidden.bs.modal', function() {
										init(options);
									});

									$('#widgetList').on('click', '#widget-create,#edit-widget,#copy-widget', function(e) {
										e.preventDefault();
										var data = {};
										var element = $(this).closest('.site-items').find('.form-control');
										$.each(element, function(i, item) {
											var key = $(item).attr("name");
											var value = $(item).val();
											data[key] = value;
										});
										data = (0, _stringify2.default)(data);
										var _this = this;

										function checkForm() {
											var fields = $(_this).closest('form').find('.field:visible');
											var success = false;
											$.each(fields, function(i, item) {
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

									$('#widgetDel .btn-del').click(function() {
										var _this = this;
										var id = $(this).attr("data-id");
										var data = {
											id: id
										};
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
													$('#widgetDel').on('hidden.bs.modal', function() {
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

									$('.widget-del').on('click', function() {
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

									$('.widget-edit').on('click', function() {
										var _this = this;
										var data = $(".widget-content").data("list");

										var createwidget = __webpack_require__(131);

										var pkWidget = $(this).attr("data-id");
										var items = {};

										$.each(data.data, function(i, item) {
											if (item.pkWidget == pkWidget) {
												items = item;
											}
										});

										$('#examplePositionCenter').data('id', items.id);

										var render = template.compile(createwidget);
										var html = render({
											item: items
										});

										$('.widget-edit-body').html(html);

										$('#examplePositionCenter input').placeholder();

										getCatels(items.category);
										//$('#widget-body').html(str);
										$('#examplePositionCenter .wtype').on('change', function() {
											edit($(this));
										});
										$('.wtype-url').show().find('.control-label').text($('#wtype').val());
									});
									$('.widget-copy').on('click', function() {
										var _this = this;
										var data = $(".widget-content").data("list");

										var createwidget = __webpack_require__(131);

										var pkWidget = $(this).attr("data-id");
										var items = {};

										$.each(data.data, function(i, item) {
											if (item.pkWidget == pkWidget) {
												items = item;
											}
										});

										$('#copy').data('id', items.id);

										var render = template.compile(createwidget);
										var html = render({
											item: items
										});

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
										$('#copy .wtype').on('change', function() {
											edit($(this));
										});
										$('.wtype-url').show().find('.control-label').text($('#wtype').val());
									});
									$('#copy').find('.close').on('click', function() {
										$('select[name="wtype"]').removeAttr('disabled');
										$('input[name="url"]').removeAttr('disabled');
										$('input[name="xml"]').removeAttr('disabled');
										$('textarea[name="htmlfragment"]').removeAttr('disabled');
									});
									$('#copy').on('click', function(e) {
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

			/***/
		}),
		/* 129 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_RESULT__;
			"use strict";

			var _typeof2 = __webpack_require__(38);

			var _typeof3 = _interopRequireDefault(_typeof2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
			! function() {
				function a(a) {
					return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y);
				}

				function b(a) {
					return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
				}

				function c(c, d) {
					function e(a) {
						return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a;
					}

					function f(b) {
						var c = m;
						if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
							return m++, "$line=" + m + ";";
						})), 0 === b.indexOf("=")) {
							var e = l && !/^=[=#]/.test(b);
							if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
								var f = b.replace(/\s*\([^\)]+\)/, "");
								n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")");
							} else b = "$string(" + b + ")";
							b = s[1] + b + s[2];
						}
						return g && (b = "$line=" + c + ";" + b), r(a(b), function(a) {
							if (a && !p[a]) {
								var b;
								b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0;
							}
						}), b + "\n";
					}
					var g = d.debug,
						h = d.openTag,
						i = d.closeTag,
						j = d.parser,
						k = d.compress,
						l = d.escape,
						m = 1,
						p = {
							$data: 1,
							$filename: 1,
							$utils: 1,
							$helpers: 1,
							$out: 1,
							$line: 1
						},
						q = "".trim,
						s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
						t = q ? "$out+=text;return $out;" : "$out.push(text);",
						u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
						v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
						w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
						x = s[0],
						y = "return new String(" + s[3] + ");";
					r(c.split(h), function(a) {
						a = a.split(i);
						var b = a[0],
							c = a[1];
						1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)));
					});
					var z = w + x + y;
					g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
					try {
						var A = new Function("$data", "$filename", z);
						return A.prototype = n, A;
					} catch (B) {
						throw B.temp = "function anonymous($data,$filename) {" + z + "}", B;
					}
				}
				var d = function d(a, b) {
					return "string" == typeof b ? q(b, {
						filename: a
					}) : g(a, b);
				};
				d.version = "3.0.0", d.config = function(a, b) {
					e[a] = b;
				};
				var e = d.defaults = {
						openTag: "<%",
						closeTag: "%>",
						escape: !0,
						cache: !0,
						compress: !1,
						parser: null
					},
					f = d.cache = {};
				d.render = function(a, b) {
					return q(a, b);
				};
				var g = d.renderFile = function(a, b) {
					var c = d.get(a) || p({
						filename: a,
						name: "Render Error",
						message: "Template not found"
					});
					return b ? c(b) : c;
				};
				d.get = function(a) {
					var b;
					if (f[a]) b = f[a];
					else if ("object" == (typeof document === "undefined" ? "undefined" : (0, _typeof3.default)(document))) {
						var c = document.getElementById(a);
						if (c) {
							var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
							b = q(d, {
								filename: a
							});
						}
					}
					return b;
				};
				var h = function h(a, b) {
						return "string" != typeof a && (b = typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a), "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a;
					},
					i = {
						"<": "&#60;",
						">": "&#62;",
						'"': "&#34;",
						"'": "&#39;",
						"&": "&#38;"
					},
					j = function j(a) {
						return i[a];
					},
					k = function k(a) {
						return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j);
					},
					l = Array.isArray || function(a) {
						return "[object Array]" === {}.toString.call(a);
					},
					m = function m(a, b) {
						var c, d;
						if (l(a))
							for (c = 0, d = a.length; d > c; c++) {
								b.call(a, a[c], c, a);
							} else
							for (c in a) {
								b.call(a, a[c], c);
							}
					},
					n = d.utils = {
						$helpers: {},
						$include: g,
						$string: h,
						$escape: k,
						$each: m
					};
				d.helper = function(a, b) {
					o[a] = b;
				};
				var o = d.helpers = n.$helpers;
				d.onerror = function(a) {
					var b = "Template Error\n\n";
					for (var c in a) {
						b += "<" + c + ">\n" + a[c] + "\n\n";
					}
					"object" == (typeof console === "undefined" ? "undefined" : (0, _typeof3.default)(console)) && console.error(b);
				};
				var p = function p(a) {
						return d.onerror(a),
							function() {
								return "{Template Error}";
							};
					},
					q = d.compile = function(a, b) {
						function d(c) {
							try {
								return new i(c, h) + "";
							} catch (d) {
								return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c));
							}
						}
						b = b || {};
						for (var g in e) {
							void 0 === b[g] && (b[g] = e[g]);
						}
						var h = b.filename;
						try {
							var i = c(a, b);
						} catch (j) {
							return j.filename = h || "anonymous", j.name = "Syntax Error", p(j);
						}
						return d.prototype = i.prototype, d.toString = function() {
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
					y = /^$|,+/;
				e.openTag = "{{", e.closeTag = "}}";
				var z = function z(a, b) {
					var c = b.split(":"),
						d = c.shift(),
						e = c.join(":") || "";
					return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")";
				};
				e.parser = function(a) {
					a = a.replace(/^\s/, "");
					var b = a.split(" "),
						c = b.shift(),
						e = b.join(" ");
					switch (c) {
						case "if":
							a = "if(" + e + "){";
							break;
						case "else":
							b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
							break;
						case "/if":
							a = "}";
							break;
						case "each":
							var f = b[0] || "$data",
								g = b[1] || "as",
								h = b[2] || "$value",
								i = b[3] || "$index",
								j = h + "," + i;
							"as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
							break;
						case "/each":
							a = "});";
							break;
						case "echo":
							a = "print(" + e + ");";
							break;
						case "print":
						case "include":
							a = c + "(" + b.join(",") + ");";
							break;
						default:
							if (/^\s*\|\s*[\w\$]/.test(e)) {
								var k = !0;
								0 === a.indexOf("#") && (a = a.substr(1), k = !1);
								for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) {
									o = z(o, m[l]);
								}
								a = (k ? "=" : "=#") + o;
							} else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a;
					}
					return a;
				}, true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
					return d;
				}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof exports ? module.exports = d : this.template = d;
			}();

			/***/
		}),
		/* 130 */
		/***/
		(function(module, exports) {

			module.exports = "<div id=\"widgetList\">\r\n    <div class=\"page-header font-size-20 padding-bottom-20\">\r\n        <ol class=\"breadcrumb\">\r\n            <li class=\"page-title\" class=\"active\">小部件管理</li>\r\n        </ol>\r\n        <div class=\"page-header-actions dropdown\" style=\"z-index: 1\">\r\n            <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\"\r\n               data-toggle=\"dropdown\">\r\n                <button class=\"u-button u-button-info font-size-14\" type=\"button\">\r\n                    <span class=\"text hidden-xs\">创建小部件</span>\r\n                    <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\r\n                </button>\r\n            </a>\r\n            {{if backUrl }}\r\n            <a href=\"{{backUrl}}\" role=\"button\" class=\"\">\r\n                <button class=\"u-button btn-success btn-round btn-back font-size-14\" type=\"button\">\r\n                    <span class=\"text hidden-xs\">返回</span>\r\n                </button>\r\n            </a>\r\n            {{/if}}\r\n\r\n            <ul role=\"menu\" style=\"width:300px;\" class=\"dropdown-menu dropdown-menu-left dropdown-menu-media\">\r\n                <li role=\"presentation\" class=\"clearfix scrollable is-enabled scrollable-vertical\"\r\n                    style=\"position: relative\">\r\n                    <div data-role=\"container\" class=\"scrollable-container\">\r\n                        <div data-role=\"content\" class=\"scrollable-content\">\r\n                            <div id=\"widget-list\" class=\"site-items list-unstyled\">\r\n                                <div class=\"col-md-12 widget-create\">\r\n                                    <div class=\"panel-body\" id=\"widget-body\">\r\n                                        <form class=\"form-horizontal\" action=\"widget/save\" id=\"widget-form\">\r\n                                             <div class=\"form-inline\">\r\n                                                 <label class=\"control-label\">名称:</label>\r\n                                                 <span class=\"field\">*</span>\r\n                                                 <input type=\"text\" name=\"name\" placeholder=\"名称\" id=\"inputRounded\" class=\"form-control round\">\r\n                                             </div>\r\n                                              <div class=\"form-inline\">\r\n                                                  <label class=\"control-label\">编码:</label>\r\n                                                  <span class=\"field\">*</span>\r\n                                                  <input type=\"text\" name=\"code\" placeholder=\"编码\"  class=\"form-control round\">\r\n                                              </div>\r\n\r\n\r\n                                               <div class=\"form-inline\">\r\n                                                   <label class=\"control-label margin-right-10\">分类:</label>\r\n                                                   <select name=\"category\" class=\"form-control category-list round\">\r\n                                                       <option value=\"workbench\">工作台</option>\r\n                                                   </select>\r\n                                               </div>\r\n                                            <div class=\"form-inline\">\r\n                                                <label class=\"control-label margin-right-10\">类型:</label>\r\n                                                <select name=\"wtype\" class=\"form-control wtype round\">\r\n                                                    <option value=\"url\">url</option>\r\n                                                    <option value=\"xml\" selected=selected>xml</option>\r\n                                                    <option value=\"htmlfragment\">html片段</option>\r\n                                                    <option value=\"js\">js</option>\r\n                                                </select>\r\n                                            </div>\r\n                                             <div class=\"form-inline wtype-url hide\">\r\n                                                 <label class=\"control-label\">url</label>\r\n                                                 <span class=\"field\">*</span>\r\n                                                 <input type=\"text\" name=\"url\" placeholder=\"\" class=\"form-control round\"/>\r\n                                             </div>\r\n                                             <div class=\"form-inline wtype-xml\">\r\n                                                 <label class=\"control-label\">xml</label>\r\n                                                 <span class=\"field\">*</span>\r\n                                                 <input type=\"text\" name=\"xml\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\r\n                                             </div>\r\n                                             <div class=\"form-inline wtype-html hide\">\r\n                                                 <label class=\"control-label\">html片段</label>\r\n                                                 <span class=\"field\">*</span>\r\n                                                 <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\"\r\n                                               class=\"form-control\"></textarea>\r\n                                             </div>\r\n                                            <div class=\"form-inline wtype-js hide\">\r\n                                                <label class=\"control-label\">js</label>\r\n                                                <span class=\"field\">*</span>\r\n                                                <input type=\"text\" name=\"js\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\r\n                                            </div>\r\n                                            <div class=\"form-inline\">\r\n                                                <label class=\"control-label margin-right-10\">描述:</label>\r\n                                                <input type=\"text\" name=\"descr\" placeholder=\"描述\" class=\"form-control\">\r\n                                            </div>\r\n                                            <div class=\"form-inline text-left\">\r\n                                                <div id=\"errorMessage\"></div>\r\n                                            </div>\r\n                                            <div class=\"u-form-group width-full margin-bottom-0\" id=\"widgManBottom\">\r\n                                                <button id=\"widget-create\"\r\n                                                        class=\"u-button u-button-info margin-left-10 pull-right\">保存\r\n                                                </button>\r\n                                                <a href=\"javascript:void(0)\"\r\n                                                   class=\"u-button u-button-primary pull-right\" data-toggle=\"dropdown\"\r\n                                                   aria-expanded=\"false\">取消</a>\r\n                                            </div>\r\n                                        </form>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"scrollable-bar scrollable-bar-vertical scrollable-bar-hide\" draggable=\"false\">\r\n                        <div class=\"scrollable-bar-handle\" style=\"height: 30px;\"></div>\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"page-content container-fluid\">\r\n        <div class=\"row\">\r\n            {{each list as item i}}\r\n            <div class=\"widget\">\r\n                <div class=\"widget-content padding-30 bg-white clearfix\">\r\n                    <div class=\"pull-left white icons-pull\">\r\n                        <i aria-hidden=\"true\" class=\"iconfont icon-component\"></i>\r\n                    </div>\r\n                    <div class=\"counter counter-md\">\r\n                        <div class=\"counter-number-group\">\r\n                            <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\r\n                        </div>\r\n                        <div class=\"counter-label text-capitalize font-size-16\"></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"widget-footer\">\r\n                    <div class=\"u-row\">\r\n                        <div class=\"u-col-4 text-center\">\r\n                            <div class=\"icons-button text-center icons-l\">\r\n                                <a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#examplePositionCenter\"\r\n                                   data-id=\"{{item.pkWidget}}\" class=\"widget-edit\" title=\"编辑\">\r\n                                    <i class=\"iconfont icon-pencil\"></i>\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"u-col-4 text-center\">\r\n                            <div class=\"icons-button text-center icons-l\">\r\n                                <a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#copy\"\r\n                                   data-id=\"{{item.pkWidget}}\" class=\"widget-copy\" title=\"克隆\">\r\n                                    <i class=\"iconfont icon-canvas\"></i>\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"u-col-4 text-center\">\r\n                            <div class=\"icons-button text-center\">\r\n                                <a href=\"javascript:;\" data-id=\"{{item.pkWidget}}\" class=\"widget-del\" title=\"删除\">\r\n                                    <i class=\"iconfont icon-delete\"></i>\r\n                                </a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            {{/each}}\r\n\r\n        </div>\r\n    </div>\r\n    <!-- Modal -->\r\n    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"examplePositionCenter\" aria-hidden=\"true\"\r\n         id=\"examplePositionCenter\" class=\"modal fade\">\r\n        <div class=\"modal-dialog modal-center\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\">\r\n                        <span aria-hidden=\"true\">×</span>\r\n                    </button>\r\n                    <h4 class=\"modal-title\">编辑小部件</h4>\r\n                </div>\r\n                <div class=\"modal-body widget-edit-body\">\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- End Modal -->\r\n\r\n    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"copy\" aria-hidden=\"true\" id=\"copy\" class=\"modal fade\">\r\n        <div class=\"modal-dialog modal-center\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\">\r\n                    <button aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\">\r\n                        <span aria-hidden=\"true\">×</span>\r\n                    </button>\r\n                    <h4 class=\"modal-title\">克隆小部件</h4>\r\n                </div>\r\n                <div class=\"modal-body widget-edit-body\">\r\n                    <form action=\"widget/save\" class=\"widget-form\">\r\n                        <div class=\"form-inline\">\r\n                            <label class=\"control-label\">名称</label>\r\n                            <input type=\"text\" name=\"name\" value=\"我\" placeholder=\"名称\"\r\n                                   class=\"form-control inputRounded round\">\r\n                            <span class=\"field\">*</span>\r\n                        </div>\r\n                        <div class=\"form-inline\">\r\n                            <label class=\"control-label\">编码</label>\r\n                            <input type=\"text\" name=\"code\" placeholder=\"编码\" value=\"hde\" class=\"form-control round\">\r\n                            <span class=\"field\">*</span>\r\n                        </div>\r\n                        <div class=\"form-inline\">\r\n                            <label class=\"control-label\">分类</label>\r\n                            <select name=\"category\" class=\"form-control category-list round\">\r\n                                <option value=\"portal\">门户</option>\r\n                                <option selected=\"\" value=\"workbench\">工作台</option>\r\n                            </select>\r\n                        </div>\r\n                        <div class=\"form-inline\">\r\n                            <label class=\"control-label\">类型</label>\r\n                            <select name=\"wtype\" class=\"form-control wtype round\" disabled>\r\n                                <option selected=\"selected\" value=\"url\">url</option>\r\n                                <option value=\"xml\">xml</option>\r\n                                <option value=\"htmlfragment\">html片段</option>\r\n                            </select>\r\n                        </div>\r\n\r\n                        <div class=\"form-inline wtype-url  \">\r\n                            <label class=\"control-label\">url</label>\r\n                            <input disabled type=\"text\" name=\"url\" value=\"http://www.sohu.com\" placeholder=\"\"\r\n                                   class=\"form-control round\">\r\n                            <span class=\"field\">*</span>\r\n                        </div>\r\n\r\n                        <div class=\"form-inline wtype-xml hide \">\r\n                            <label class=\"control-label\">xml</label>\r\n                            <input type=\"text\" name=\"xml\" value=\"\" placeholder=\"/gadgets/xxx.xml\"\r\n                                   class=\"form-control round\">\r\n                            <span class=\"field\">*</span>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"form-inline wtype-html hide\">\r\n                            <label class=\"control-label\">html片段</label>\r\n                            <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\"\r\n                                      class=\"form-control\"></textarea> <span class=\"field\">*</span>\r\n                        </div>\r\n                        <div class=\"form-inline\">\r\n                            <label class=\"control-label\">描述</label>\r\n                            <input type=\"text\" name=\"descr\" value=\"\" placeholder=\"描述\" class=\"form-control\">\r\n                        </div>\r\n                        <input type=\"hidden\" name=\"modifytime\" value=\"2016-06-23 14:48:50\" class=\"form-control\">\r\n                        <div id=\"errorMessage\"></div>\r\n                        <div class=\"modal-footer\">\r\n                            <button class=\"btn btn-primary\" id=\"copy-widget\" type=\"button\">保存</button>\r\n                            <button data-dismiss=\"modal\" class=\"btn btn-default\" type=\"button\">取消</button>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal fade\" id=\"widgetDel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\r\n         aria-hidden=\"true\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header\" style=\"\">\r\n                    <button type=\"button\" class=\"close\" style=\"\" data-dismiss=\"modal\"\r\n                            aria-hidden=\"true\">&times;</button>\r\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                        确认\r\n                    </h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    您确认要删除小部件吗？\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                    <button type=\"button\" class=\"u-button u-button-info margin-right-10 btn-del\">确定</button>\r\n                    <button type=\"button\" class=\"u-button u-button-primary\" data-dismiss=\"modal\">取消</button>\r\n                </div>\r\n            </div><!-- /.modal-content -->\r\n        </div><!-- /.modal -->\r\n    </div>\r\n</div>    ";

			/***/
		}),
		/* 131 */
		/***/
		(function(module, exports) {

			module.exports = "<div class=\"site-items list-unstyled\">\r\n    <div class=\"widget-create-eidt\">\r\n        <div class=\"panel-body\">\r\n            <form action=\"widget/save\" class=\"widget-form\">\r\n                <div class=\"form-inline\">\r\n                    <label class=\"control-label\">名称:</label>\r\n                    <span class=\"field\">*</span>\r\n                    <input type=\"text\" name=\"name\" value=\"{{item.name}}\" placeholder=\"名称\" class=\"form-control inputRounded round\">\r\n                </div>\r\n                <div class=\"form-inline\">\r\n                    <label class=\"control-label\">编码:</label>\r\n                    <span class=\"field\">*</span>\r\n                    <input type=\"text\" name=\"code\" placeholder=\"编码\" value=\"{{item.id}}\" class=\"form-control round\" disabled>\r\n                </div>\r\n                <div class=\"form-inline\">\r\n                    <label class=\"control-label margin-right-10 \">分类:</label>\r\n                    <select name=\"category\" class=\"form-control category-list round\">\r\n                        <option value=\"workbench\">工作台</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"form-inline\">\r\n                    <label class=\"control-label margin-right-10\">类型:</label>\r\n                    <select name=\"wtype\" class=\"form-control wtype round\">\r\n                        <option {{ item.wtype=='url'?'selected=selected':'' }} value=\"url\">url</option>\r\n                        <option {{ item.wtype==\"xml\"?\"selected=selected\":\"\" }} value=\"xml\">xml</option>\r\n                        <option {{ item.wtype==\"htmlfragment\"?\"selected=selected\":\"\" }} value=\"htmlfragment\">html片段</option>\r\n                        <option {{ item.wtype==\"js\"?\"selected=selected\":\"\" }} value=\"js\">js</option>\r\n                    </select>\r\n                </div>\r\n\r\n                <div class=\"form-inline wtype-url {{if item.wtype!='url'}}hide{{/if}} \">\r\n                    <label class=\"control-label\">url</label>\r\n                    <span class=\"field\">*</span>\r\n                    <input type=\"text\" name=\"url\" value=\"{{if item.wtype=='url'}}{{item.cnf}}{{/if}}\" placeholder=\"\" class=\"form-control round\"/>\r\n\r\n                </div>\r\n\r\n                <div class=\"form-inline wtype-xml {{if item.wtype!='xml'}}hide{{/if}} \">\r\n                    <label class=\"control-label\">xml</label>\r\n                    <span class=\"field\">*</span>\r\n                    <input type=\"text\" name=\"xml\" value=\"{{if item.wtype=='xml'}}{{item.url}}{{/if}}\" placeholder=\"/gadgets/xxx.xml\" class=\"form-control round\"/>\r\n\r\n                </div>\r\n\r\n\r\n                <div class=\"form-inline wtype-html {{if item.wtype!='htmlfragment'}}hide{{/if}}\" >\r\n                    <label class=\"control-label\">html片段</label>\r\n                     <span class=\"field\">*</span>\r\n                     <textarea name=\"htmlfragment\" placeholder=\"\" style=\"height:50px\" class=\"form-control\">{{if item.wtype==\"htmlfragment\"}}{{item.cnf}}{{/if}}</textarea>\r\n                </div>\r\n\r\n                <div class=\"form-inline wtype-js {{if item.wtype!='js'}}hide{{/if}} \">\r\n                    <label class=\"control-label\">js</label>\r\n                    <span class=\"field\">*</span>\r\n                    <input type=\"text\" name=\"js\" value=\"{{if item.wtype=='js'}}{{item.cnf}}{{/if}}\" placeholder=\"/gadgets/xxx.js\" class=\"form-control round\"/>\r\n                </div>\r\n\r\n                <div class=\"form-inline\">\r\n                    <label class=\"control-label margin-right-10\">描述:</label>\r\n                    <input type=\"text\" name=\"descr\" value=\"{{item.descr}}\" placeholder=\"描述\" class=\"form-control\">\r\n                </div>\r\n                <input type=\"hidden\" name=\"modifytime\" value=\"{{item.modifytime}}\" class=\"form-control\"/>\r\n                <div id=\"errorMessage\"></div>\r\n\r\n                <div class=\" modal-footer u-form-group width-full \" id=\"editWidBottom\">\r\n                    <button data-dismiss=\"modal\"\r\n                            class=\"u-button u-button-primary pull-right margin-left-10\">取消\r\n                    </button>\r\n                    <button id=\"edit-widget\"\r\n                            class=\"u-button u-button-info margin-left-10 pull-right\">保存\r\n                    </button>\r\n                </div>\r\n\r\n\r\n        </form>\r\n        </div>\r\n    </div>\r\n</div>";

			/***/
		}),
		/* 132 */
		/***/
		(function(module, exports, __webpack_require__) {

			'use strict';

			var _stringify = __webpack_require__(4);

			var _stringify2 = _interopRequireDefault(_stringify);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			var sites = __webpack_require__(133);
			var art = __webpack_require__(129);

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
						var obj = {
							"val": key
						};
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
								var data = {
									list: datas
								};
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
								var comp = new u.pagination({
									el: page,
									jumppage: true
								});
								comp.update({
									totalPages: res.data.totalPages,
									pageSize: res.data.size,
									currentPage: pageIndex ? pageIndex + 1 : '1',
									totalCount: res.data.totalElements
								});

								comp.on('pageChange', function(pageIndex) {
									loadData($('#searchBtn').prev().val(), pageIndex);
								});
								comp.on('sizeChange', function(pageSize) {
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
					$('#layoutDel .btn-del').click(function() {
						// var _this = this;
						var id = $(this).attr("data-id");
						var data = {
							id: id
						};
						data = (0, _stringify2.default)(data);
						$('#layoutDel').modal('show');
						$('#layoutDel').on('hidden.bs.modal', function() {
							del(id);
						});
						$('#layoutDel').modal('hide');
					});

					$('#layoutList').on('click', '.layout-del', function() {

						// var parent = $(this).closest('.col-md-3');
						var id = $(this).attr("data-id");

						$('#layoutDel').modal('show');
						$('#layoutDel .btn-del').attr('data-id', id);
					});

					$('#layoutList .backBtn').on('click', function() {
						//window.history.back(-1);
						window.location.hash = '#sysmgr';
					});

					$('#site-save-open,#site-save').on('click', function(e) {
						e.preventDefault();
						var _this = $(this);
						var name = $('#exampleName').val();
						var code = $('#code').val();
						var data = {
							name: name,
							id: code
						};
						var parm = (0, _stringify2.default)(data);

						var inputs = $('.dropdown-layout input');

						inputs.focus(function() {
							$('#errorMessage').html("");
						});

						function checkForm() {
							var success = false;
							$.each(inputs, function(i, item) {
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

								var minlayout = __webpack_require__(134);

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
								var html = render({
									list: data
								});

								//console.log(html);
								//$('.page-content .row').prepend(html);
								//layoutInit();

								if (_this.attr('id') == 'site-save-open' && res.status == "1") {
									setTimeout(function() {
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

					$('#searchBtn').on('click', function() {
						loadData($(this).prev().val());
					});

					$('#layoutList').on('click', '.layout-application', function() {
						var id = $(this).attr('data-id');
						var name = $(this).attr('data-name');
						publish(id, name);
					});

					$('#layoutList').on('click', '.u-checkbox-outline', function(e) {
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

					$('#layoutList .batch-del').on('click', function() {
						$('#layoutList table tbody .is-checked').each(function(i, v) {
							$('#layoutDel').modal('show');
							$('#layoutDel .btn-del').on('click', function() {
								if ($(v).parent()[0].nodeName == 'TD') {
									var id = $(v).attr('layout-id');
									if (id) del(id);
								}
							});
						});
					});
					$('#layoutList .batch-application').on('click', function() {
						$('#layoutList table tbody .is-checked').each(function(i, v) {
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

			/***/
		}),
		/* 133 */
		/***/
		(function(module, exports) {

			module.exports = "\r\n <div id=\"layoutList\" class=\"layout-list\">\r\n    <div class=\"page-header\">\r\n        <ol class=\"breadcrumb\">\r\n            <li class=\"page-title\" class=\"active\">布局管理</li>\r\n        </ol>\r\n        <div class=\"page-header-actions dropdown\" style=\"z-index: 1;width: auto\">\r\n            <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\" data-toggle=\"dropdown\">\r\n                <button class=\"btn btn-sm btn-outline btn-success btn-round font-size-14\" type=\"button\">\r\n                    <span class=\"text hidden-xs\">创建布局</span>\r\n                    <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\r\n                </button>\r\n            </a>\r\n            <button class=\"u-button margin-left-10 font-size-14 backBtn\">返回</button>\r\n            <ul role=\"menu\" class=\"dropdown-menu dropdown-menu-left dropdown-menu-media dropdown-layout\">\r\n                <li role=\"presentation\" class=\"scrollable is-enabled scrollable-vertical\" style=\"position: relative\">\r\n                    <div data-role=\"container\" class=\"scrollable-container\" >\r\n\r\n                        <div data-role=\"content\" class=\"scrollable-content\" >\r\n                            <div class=\"panel-body\">\r\n                                <form>\r\n                                    <div class=\"form-inline\">\r\n                                        <label class=\"control-label\">名称</label>\r\n                                        <input type=\"text\" id=\"exampleName\" placeholder=\"名称\" class=\"form-control\" /> <span class=\"field\">*</span>\r\n                                    </div>\r\n                                    <div class=\"form-inline\">\r\n                                        <label class=\"control-label\">编码</label>\r\n                                        <input type=\"text\" name=\"id\" id=\"code\" placeholder=\"编码\" class=\"form-control\"> <span class=\"field\">*</span>\r\n                                    </div>\r\n                                    <div class=\"form-inline\">\r\n                                        <div id=\"errorMessage\"></div>\r\n                                    </div>\r\n                                    <div class=\"form-group text-right\">\r\n                                        <button id=\"site-save-open\"  class=\"btn btn-primary\">创建并打开</button>\r\n                                        <button id=\"site-save\" class=\"btn btn-primary\">保存</button>\r\n                                    </div>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </li>\r\n            </ul>\r\n            <button class=\"u-button font-size-14 batch-del\">批量删除</button>\r\n            <button class=\"u-button font-size-14 batch-application\">批量发布到小应用</button>\r\n        </div>\r\n\r\n        <div class=\"search  pull-right margin-right-20\">\r\n            <div class=\"u-input-group u-has-feedback \">\r\n                <input type=\"text\" class=\"u-form-control\"  placeholder=\"布局名称/布局编码\">\r\n                <span class=\"u-form-control-feedback uf uf-magnifyingglass\"  id=\"searchBtn\"></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"page-content container-fluid\">\r\n        <div class=\"row\">\r\n            <table class=\"u-table b-table width-full\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>\r\n                            <label class=\"u-checkbox only-style u-checkbox-info is-upgraded\"  data-upgraded=\",u.Checkbox\">\r\n                                <input  type=\"checkbox\" class=\"u-checkbox-input\">\r\n                                <span class=\"u-checkbox-label\"></span>\r\n                                <span class=\"u-checkbox-focus-helper\"></span>\r\n                                <span class=\"u-checkbox-outline\">\r\n                                    <span class=\"u-checkbox-tick-outline\"></span>\r\n                                </span>\r\n                                <span style=\"overflow: hidden; position: relative;\">\r\n                                    <span class=\"u-ripple\"></span>\r\n                                </span>\r\n                            </label>\r\n                        </th>\r\n                        <th>布局名称</th>\r\n                        <th>布局编码</th>\r\n                        <th>模板名称</th>\r\n                        <th>创建时间</th>\r\n                        <th>最后修改时间</th>\r\n                        <th>是否启用</th>\r\n                        <th>操作</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                {{each list as item i}}\r\n                    <tr>\r\n                        <td>\r\n                            <label class=\"u-checkbox only-style u-checkbox-info is-upgraded\"  data-upgraded=\",u.Checkbox\" layout-id=\"{{item.id}}\" layout-name=\"{{item.name}}\">\r\n                                <input  type=\"checkbox\" class=\"u-checkbox-input\">\r\n                                <span class=\"u-checkbox-label\"></span>\r\n                                <span class=\"u-checkbox-focus-helper\"></span>\r\n                                <span class=\"u-checkbox-outline\">\r\n                                    <span class=\"u-checkbox-tick-outline\"></span>\r\n                                </span>\r\n                                <span style=\"overflow: hidden; position: relative;\">\r\n                                    <span class=\"u-ripple\"></span>\r\n                                </span>\r\n                            </label>\r\n                        </td>\r\n                        <td>{{item.name}}</td>\r\n                        <td>{{item.id}}</td>\r\n                        <td>{{item.tplname}}</td>\r\n                        <td>{{item.createtime}}</td>\r\n                        <td>{{item.lastModifytime}}</td>\r\n                        <td>{{item.isenable}}</td>\r\n                        <td>\r\n                            <a href=\"#/layout/{{item.id}}/{{item.modifytime||'modify'}}/back/layouts\" data-id=\"{{item.id}}\" data-viewid=\"{{item.id}}\" title=\"设计\">\r\n                                <i class=\"iconfont icon-pencil\"></i>\r\n                            </a>&nbsp;\r\n                            <a href=\"javascript:;\" data-id=\"{{item.id}}\" data-name=\"{{item.name}}\" class=\"layout-application\" title=\"发布到小应用\">\r\n                                <i class=\"iconfont icon-appicon\"></i>\r\n                            </a>&nbsp;\r\n                            <a href=\"javascript:;\" data-id=\"{{item.id}}\" class=\"layout-del\" title=\"删除\">\r\n                                <i class=\"iconfont icon-delete\"></i>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                {{/each}}\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n     <div class=\"page\"><input type=\"text\" class=\"hide\" id=\"startPageIndex\">\r\n         <div id='layoutPage' class='u-pagination'>\r\n         </div>\r\n     </div>\r\n\r\n\r\n     <div class=\"modal fade\" id=\"layoutDel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n         <div class=\"modal-dialog\">\r\n             <div class=\"modal-content\">\r\n                 <div class=\"modal-header\">\r\n                     <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                     <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n                         确认\r\n                     </h4>\r\n                 </div>\r\n                 <div class=\"modal-body\">\r\n                     您确认要删除此布局吗？\r\n                 </div>\r\n                 <div class=\"modal-footer\">\r\n                     <button type=\"button\" class=\"btn btn-del btn-primary\">确认</button>\r\n                     <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\r\n                 </div>\r\n             </div><!-- /.modal-content -->\r\n         </div><!-- /.modal -->\r\n     </div>\r\n</div>\r\n";

			/***/
		}),
		/* 134 */
		/***/
		(function(module, exports) {

			module.exports = "{{each list as item i}}\r\n<div class=\"col-md-3\">\r\n    <div class=\"widget \">\r\n        <div class=\"widget-content padding-35 bg-white clearfix\">\r\n            <div class=\"pull-left white\">\r\n                <i aria-hidden=\"true\" class=\"icon icon-circle icon-2x wb-clipboard bg-red-600\"></i>\r\n            </div>\r\n            <div class=\"counter counter-md counter text-right pull-right\">\r\n                <div class=\"counter-number-group\">\r\n                    <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\r\n                </div>\r\n                <div class=\"counter-label text-capitalize font-size-16\"></div>\r\n            </div>\r\n        </div>\r\n        <div class=\"padding-10 text-right\">\r\n            <a href=\"javascript:;\" class=\"add-to-sidebar\">\r\n                <button  type=\"button\" class=\"btn btn-sm btn-outline btn-default btn-round\">\r\n                    <span class=\"text hidden-xs\">设为首页</span>\r\n                </button>\r\n            </a>\r\n            <a href=\"#/layout/{{item.id}}\">\r\n                <button type=\"button\" class=\"btn btn-sm btn-outline btn-default btn-round\">\r\n                    <span class=\"text hidden-xs\">设计</span>\r\n                </button>\r\n            </a>\r\n            <button type=\"button\" data-id=\"{{item.id}}\" class=\"btn btn-sm btn-outline btn-default btn-round layout-del\">\r\n                <span class=\"text hidden-xs\" >删除</span>\r\n                <i class=\"icon wb-chevron-right\" aria-hidden=\"true\"></i>\r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>\r\n{{/each}}";

			/***/
		}),
		/* 135 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				var template = __webpack_require__(129);
				var temp = __webpack_require__(136);

				var init = function init() {
					$.ptAjax({
						url: contextRoot + "/layout/tpl/list",
						dataType: 'json',
						type: 'get',
						contentType: 'application/json',
						success: function success(res) {
							var str = [];

							var render = template.compile(temp);
							var html = render({
								list: res
							});
							$('#content').html(html);

							$('#upload-form').submit(function(e) {});
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

			/***/
		}),
		/* 136 */
		/***/
		(function(module, exports) {

			module.exports = "\r\n<div class=\"page-header\">\r\n    <h1 class=\"page-title\">布局模板管理</h1>\r\n    <ol class=\"breadcrumb\">\r\n        <li><a href=\"index.html\">首页</a></li>\r\n        <li class=\"active\">布局模板</li>\r\n    </ol>\r\n    <div class=\"page-header-actions dropdown\" style=\"z-index: 1\">\r\n        <a href=\"javascript:void(0)\" role=\"button\" data-animation=\"scale-up\" aria-expanded=\"false\" data-toggle=\"dropdown\">\r\n            <button class=\"btn btn-sm btn-outline btn-default btn-round\" type=\"button\">\r\n                <span class=\"text hidden-xs\">导入布局模板</span>\r\n                <i aria-hidden=\"true\" class=\"icon wb-chevron-right\"></i>\r\n            </button>\r\n        </a>\r\n        <ul role=\"menu\" class=\"dropdown-menu dropdown-menu-right dropdown-menu-media\">\r\n            <li role=\"presentation\" class=\"dropdown-menu-header\">\r\n                <h5>导入一个新的布局模板</h5>\r\n            </li>\r\n            <li role=\"presentation\" class=\"scrollable is-enabled scrollable-vertical\" style=\"position: relative\">\r\n                <div data-role=\"container\" class=\"scrollable-container\" >\r\n                    <div data-role=\"content\" class=\"scrollable-content\" >\r\n                        <div id=\"widget-list\" class=\"site-items list-unstyled\">\r\n                            <div class=\"col-md-12 widget-create\">\r\n                                <div class=\"panel-body\" id=\"widget-body\">\r\n                                    <form action=\"layout/tpl/import\" method=\"post\" enctype=\"multipart/form-data\" id=\"upload-form\"  target=\"hidden_frame\">\r\n                                        <div class=\"form-group\">\r\n                                            <h4 class=\"example-title\">名称</h4>\r\n                                            <input type=\"text\" name=\"name\" placeholder=\"名称\" id=\"inputRounded\" name=\"name\" class=\"form-control round\">\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <h4 class=\"example-title\">标识</h4>\r\n                                            <input type=\"text\" name=\"id\" placeholder=\"标识\" id=\"\" class=\"form-control round\">\r\n                                        </div>\r\n                                        <div class=\"form-group\">\r\n                                            <h4 class=\"example-title\">模板上传</h4>\r\n                                            <div class=\"form-group\">\r\n                                                <div class=\"input-group input-group-file\">\r\n                                                    <input type=\"text\" readonly=\"\" class=\"form-control\">\r\n                                                    <span class=\"input-group-btn\">\r\n                                                      <span class=\"btn btn-outline btn-file\">\r\n                                                        <i aria-hidden=\"true\" class=\"icon wb-upload\"></i>\r\n                                                        <input type=\"file\" multiple=\"\" name=\"tpl\">\r\n                                                      </span>\r\n                                                    </span>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"form-group text-left\">\r\n                                            <div id=\"errorMessage\"></div>\r\n                                        </div>\r\n                                        <div class=\"form-group text-right\">\r\n                                            <button type=\"submit\" id=\"file-upload\" class=\"btn-blue btn-block btn-xs\">上传</button>\r\n                                        </div>\r\n                                    </form>\r\n                                    <iframe name='hidden_frame' id=\"hidden_frame\" style='display:none'></iframe>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                </li>\r\n            <li role=\"presentation\" class=\"dropdown-menu-footer\">\r\n                <a role=\"button\" href=\"javascript:void(0)\" class=\"dropdown-menu-footer-btn\">\r\n                    <i aria-hidden=\"true\" class=\"icon wb-settings\"></i>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"page-content container-fluid\">\r\n    <div class=\"row\">\r\n        {{each list as item i}}\r\n        <div class=\"col-md-3\">\r\n            <div class=\"widget\">\r\n                <div class=\"widget-content padding-35 bg-white clearfix\">\r\n                    <div class=\"pull-left white\">\r\n                        <i aria-hidden=\"true\" class=\"icon icon-circle icon-2x wb-image bg-blue-600\"></i>\r\n                    </div>\r\n                    <div class=\"counter counter-md counter text-right pull-right\">\r\n                        <div class=\"counter-number-group\">\r\n                            <span class=\"counter-number-related text-capitalize\">{{item.name}}</span>\r\n                        </div>\r\n                        <div class=\"counter-label text-capitalize font-size-16\"></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"layout-template\">\r\n                    <!--\r\n                    {{echo item.tpl}}\r\n                    -->\r\n                </div>\r\n                <div class=\"padding-10 text-right\">\r\n                    <button type=\"button\" data-id=\"{{item.pkWidget}}\" class=\"btn btn-sm btn-outline btn-default btn-round widget-edit\">\r\n                        <span class=\"text hidden-xs\">编辑</span>\r\n                    </button>\r\n                    <button type=\"button\" data-id=\"{{item.pkWidget}}\" class=\"btn btn-sm btn-outline btn-default btn-round widget-del\">\r\n                        <span class=\"text hidden-xs\" >删除</span>\r\n                        <i class=\"icon wb-chevron-right\" aria-hidden=\"true\"></i>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        {{/each}}\r\n    </div>\r\n</div>";

			/***/
		}),
		/* 137 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
				var Layout = __webpack_require__(138);
				var Toolbar = __webpack_require__(139);
				var designer = __webpack_require__(141);

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
						require([module], function(module) {
							var options = {
								"isSortable": true,
								"isWidgetEdit": true,
								"ModifiedLayout": true,
								"isShowWidgetName": true,
								"element": element
							};

							require(['jqueryui'], function() {
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

								$('#designer').on('hidden.bs.modal', function() {
									setTimeout(function() {
										if (typeof PubSub != 'undefined' && PubSub.publish('designer.closeAfter')) {} else {
											location.href = '#/' + decodeURIComponent(router);
										}
									}, 100);
								}).on('shown.bs.modal', function() {
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

			/***/
		}),
		/* 138 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

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
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
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
						setTimeout(function() {

							var w = (container.width() + 30) / 12;

							var grid = _this.options.gridData;

							function limit() {
								var lines = [],
									place = [],
									curLength = 0;
								$.each(grid, function(i, item) {
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

							container.find(".line").each(function(i, item) {
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
										$.each(grid, function(t, item) {
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
						$.each(layouts, function(i, item) {
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
						$('#content').delegate('.widgetBox .well', 'mouseover', function(e) {
							$(this).find(".edit").show();
						});
						$('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseover', function(e) {
							$(this).find(".edit").show();
						});

						$('#content').delegate('.widgetBox .well', 'mouseleave', function(e) {
							$(this).find(".edit").hide();
						});

						$('#content').delegate('.widgetBox .ui-sortable-handle', 'mouseleave', function(e) {
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

			/***/
		}),
		/* 139 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			var _defineProperty2 = __webpack_require__(140);

			var _defineProperty3 = _interopRequireDefault(_defineProperty2);

			var _stringify = __webpack_require__(4);

			var _stringify2 = _interopRequireDefault(_stringify);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/**
			 * Created by chief on 15/11/10.
			 */
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
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
					$.each(widgets, function(i, v) {
						widgetsId[$(v).attr('data-id')] = '';
					});
					var newRes = resWidget.filter(function(item) {
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
						$('#tool-panel-icons').click(function(e) {

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
										};
										if (typeof PubSub != 'undefined' && PubSub.publish('designer.searchWidgets', option)) {} else {
											$.ptAjax(option);
										}
									};

									var getWidgets = function getWidgets(url) {

										var option = {
											url: contextRoot + "/widget/query",
											dataType: 'json',
											type: 'post',
											data: {
												"viewId": location.hash.split('/')[2]
											},
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
													$.each(res.data, function(i, item) {
														str.push('<option value="' + item.id + '">' + item.name + '</option>');
													});
													$('.widget-category').html(str.join('')).change(function(e) {
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
									};
									if (typeof PubSub != 'undefined' && PubSub.publish('designer.getCatels', option)) {} else {
										$.ptAjax(option);
									}
									break;
								case 'close':
									$('#content').removeAttr('identity');
							}
						});

						var pannel = $('#create-site-panel');
						$('#create-site').on('click', function() {
							pannel.fadeIn();
							$(this).hide();
						});
						$('#create-site-cannel').on('click', function() {
							pannel.fadeOut(function() {
								$('#create-site').show();
							});
						});
						$('#create-site-save').on('click', function() {
							var workspan = $('#gadget-site-workspace');
							$('#gadget-site-workspace').fadeIn(function() {
								$('#tool-panel').removeClass('diplaynoe').addClass("animated fadeInRight");
							});
						});
					},
					renderWidget: function renderWidget(res) {
						var str = [];
						$.each(res, function(i, item) {
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
										window.container.preloadGadget(key, function(res) {
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
						$('#tool-panel-layout').delegate('.item-layout', 'click', function(e) {
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
						$('.widget-search').click(function() {
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
						$('#layoutReset').click(function() {
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

						$('#layoutSave').click(function() {
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
								$.each(layouts, function(i, item) {
									var index = parseInt($(item).attr("class").replace(/[^0-9]/ig, ''));
									data.push(index);
								});
								return data;
							};

							$.each(list, function(i, item) {
								var child = $(item).find('.well');
								n = [];
								if (child.length >= 1) {
									$.each(child, function(i, t) {
										n.push($(t).attr('data-id'));
									});
								}
								var wid = child.length >= 1 ? n : [];
								data.push({
									wbid: $(item).attr('id'),
									wid: wid
								});

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
							};
							if (typeof PubSub != 'undefined' && PubSub.publish('designer.save', option)) {} else {
								$.ptAjax(option);
							}
						});
					},
					setLayout: function setLayout(_setLayout) {
						var _this = this;

						function layoutData(layoutStr) {
							var l = $(layoutStr).children(),
								d = [];
							$.each(l, function(i, item) {
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
										$.each(data, function(i, item) {
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

			/***/
		}),
		/* 140 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

			exports.__esModule = true;

			var _defineProperty = __webpack_require__(34);

			var _defineProperty2 = _interopRequireDefault(_defineProperty);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			exports.default = function(obj, key, value) {
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

			/***/
		}),
		/* 141 */
		/***/
		(function(module, exports) {

			module.exports = "<div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"designer\" aria-hidden=\"true\" id=\"designer\" class=\"modal fade\">\r\n    <div class=\"modal-dialog modal-center\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <ol class=\"breadcrumb hide\">\r\n                    <li><a href=\"index.html\">首页</a></li>\r\n                    <li>布局管理</li>\r\n                    <li>编辑</li>\r\n                </ol>\r\n                     <span class=\"panel-save hide\">\r\n                         <button class=\"btn btn-primary\">保存</button>\r\n                         <button class=\"btn\" data-dismiss=\"modal\" aria-label=\"Close\">取消</button>\r\n                         <button class=\"btn\" >重置</button>\r\n                     </span>\r\n            </div>\r\n            <div class=\"modal-body widget-edit-body\" >\r\n                <div id=\"designerContent\">\r\n                </div>\r\n                <div id=\"toolbars\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

			/***/
		}),
		/* 142 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			var _stringify = __webpack_require__(4);

			var _stringify2 = _interopRequireDefault(_stringify);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/**
			 * Created by Liushaozhen on 2016/9/12.
			 */
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
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
								var html = __webpack_require__(143);
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
					$('.userRelevance').find('.u-msg-ok').on('click', function() {
						var str = '';
						$('input[require="1"]').each(function(i, v) {
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
						data.push({
							id: "pt_systemcode",
							value: sysCode
						});
						data.push({
							id: "pt_usercode",
							value: $.cookie('u_usercode')
						});
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
					$('.userRelevance').find(".u-msg-cancel").on('click', function() {
						window.history.go(-1);
					});
				};
				return {
					init: function init(sysCode, content) {
						_init(sysCode, content);
					}
				};
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

			/***/
		}),
		/* 143 */
		/***/
		(function(module, exports) {

			module.exports = "<div class=\"u-container\" id=\"userRelevance\">\r\n    <div class=\"userRelevance margin-top-30 margin-left-20 margin-right-20\">\r\n        <div class=\"u-msg-title\">\r\n            <h4 >凭证管理</h4>\r\n        </div>\r\n        <div class=\"u-msg-content padding-20 margin-top-20\" style=\"background: #fff\">\r\n            <form>\r\n                <!-- <div class=\"u-form-group\"><label class=\"u-col-2 u-form-label \">用户名</label>\r\n                     <input type=\"text\" class=\"u-form-control u-col-10\">\r\n                 </div>\r\n                 <div class=\"u-form-group\"><label class=\"u-col-2 u-form-label \">公司</label>\r\n                     <input type=\"text\" class=\"u-form-control u-col-10\">\r\n                 </div>-->\r\n            </form>\r\n        </div>\r\n        <div class=\"u-msg-footer width-full clearfix padding-bottom-10\" style=\"background: #fff\">\r\n            <button class=\"u-msg-cancel u-button pull-right\">取消<span class=\"u-button-container\"><span\r\n                    class=\"u-ripple\"></span></span>\r\n            </button>\r\n            <button class=\"u-msg-ok u-button u-button-info pull-right\">保存<span class=\"u-button-container\"><span class=\"u-ripple\"></span></span>\r\n            </button>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

			/***/
		}),
		/* 144 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			/*!
				  Copyright (c) 2016 Jed Watson.
				  Licensed under the MIT License (MIT), see
				  http://jedwatson.github.io/classnames
				*/
			/* global define */

			(function() {
				'use strict';

				var hasOwn = {}.hasOwnProperty;

				function classNames() {
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
					!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
						return classNames;
					}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
				} else {
					window.classNames = classNames;
				}
			}());


			/***/
		}),
		/* 145 */
		/***/
		(function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */
			(function(process, global) {
				/*!
				 * @overview es6-promise - a tiny implementation of Promises/A+.
				 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
				 * @license   Licensed under MIT license
				 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
				 * @version   v4.2.4+314e4831
				 */

				(function(global, factory) {
					true ? module.exports = factory() :
						typeof define === 'function' && define.amd ? define(factory) :
							(global.ES6Promise = factory());
				}(this, (function() {
					'use strict';

					function objectOrFunction(x) {
						var type = typeof x;
						return x !== null && (type === 'object' || type === 'function');
					}

					function isFunction(x) {
						return typeof x === 'function';
					}



					var _isArray = void 0;
					if (Array.isArray) {
						_isArray = Array.isArray;
					} else {
						_isArray = function(x) {
							return Object.prototype.toString.call(x) === '[object Array]';
						};
					}

					var isArray = _isArray;

					var len = 0;
					var vertxNext = void 0;
					var customSchedulerFn = void 0;

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
					var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

					// test for web worker but not in IE10
					var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

					// node
					function useNextTick() {
						// node version 0.10.x displays a deprecation warning when nextTick is used recursively
						// see https://github.com/cujojs/when/issues/410 for details
						return function() {
							return process.nextTick(flush);
						};
					}

					// vertx
					function useVertxTimer() {
						if (typeof vertxNext !== 'undefined') {
							return function() {
								vertxNext(flush);
							};
						}

						return useSetTimeout();
					}

					function useMutationObserver() {
						var iterations = 0;
						var observer = new BrowserMutationObserver(flush);
						var node = document.createTextNode('');
						observer.observe(node, {
							characterData: true
						});

						return function() {
							node.data = iterations = ++iterations % 2;
						};
					}

					// web worker
					function useMessageChannel() {
						var channel = new MessageChannel();
						channel.port1.onmessage = flush;
						return function() {
							return channel.port2.postMessage(0);
						};
					}

					function useSetTimeout() {
						// Store setTimeout reference so es6-promise will be unaffected by
						// other code modifying setTimeout (like sinon.useFakeTimers())
						var globalSetTimeout = setTimeout;
						return function() {
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
							var vertx = Function('return this')().require('vertx');
							vertxNext = vertx.runOnLoop || vertx.runOnContext;
							return useVertxTimer();
						} catch (e) {
							return useSetTimeout();
						}
					}

					var scheduleFlush = void 0;
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
						var parent = this;

						var child = new this.constructor(noop);

						if (child[PROMISE_ID] === undefined) {
							makePromise(child);
						}

						var _state = parent._state;


						if (_state) {
							var callback = arguments[_state - 1];
							asap(function() {
								return invokeCallback(_state, child, callback, parent._result);
							});
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
					function resolve$1(object) {
						/*jshint validthis:true */
						var Constructor = this;

						if (object && typeof object === 'object' && object.constructor === Constructor) {
							return object;
						}

						var promise = new Constructor(noop);
						resolve(promise, object);
						return promise;
					}

					var PROMISE_ID = Math.random().toString(36).substring(2);

					function noop() {}

					var PENDING = void 0;
					var FULFILLED = 1;
					var REJECTED = 2;

					var TRY_CATCH_ERROR = {
						error: null
					};

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
							TRY_CATCH_ERROR.error = error;
							return TRY_CATCH_ERROR;
						}
					}

					function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
						try {
							then$$1.call(value, fulfillmentHandler, rejectionHandler);
						} catch (e) {
							return e;
						}
					}

					function handleForeignThenable(promise, thenable, then$$1) {
						asap(function(promise) {
							var sealed = false;
							var error = tryThen(then$$1, thenable, function(value) {
								if (sealed) {
									return;
								}
								sealed = true;
								if (thenable !== value) {
									resolve(promise, value);
								} else {
									fulfill(promise, value);
								}
							}, function(reason) {
								if (sealed) {
									return;
								}
								sealed = true;

								reject(promise, reason);
							}, 'Settle: ' + (promise._label || ' unknown promise'));

							if (!sealed && error) {
								sealed = true;
								reject(promise, error);
							}
						}, promise);
					}

					function handleOwnThenable(promise, thenable) {
						if (thenable._state === FULFILLED) {
							fulfill(promise, thenable._result);
						} else if (thenable._state === REJECTED) {
							reject(promise, thenable._result);
						} else {
							subscribe(thenable, undefined, function(value) {
								return resolve(promise, value);
							}, function(reason) {
								return reject(promise, reason);
							});
						}
					}

					function handleMaybeThenable(promise, maybeThenable, then$$1) {
						if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
							handleOwnThenable(promise, maybeThenable);
						} else {
							if (then$$1 === TRY_CATCH_ERROR) {
								reject(promise, TRY_CATCH_ERROR.error);
								TRY_CATCH_ERROR.error = null;
							} else if (then$$1 === undefined) {
								fulfill(promise, maybeThenable);
							} else if (isFunction(then$$1)) {
								handleForeignThenable(promise, maybeThenable, then$$1);
							} else {
								fulfill(promise, maybeThenable);
							}
						}
					}

					function resolve(promise, value) {
						if (promise === value) {
							reject(promise, selfFulfillment());
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

					function reject(promise, reason) {
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

						var child = void 0,
							callback = void 0,
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
							value = void 0,
							error = void 0,
							succeeded = void 0,
							failed = void 0;

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
								reject(promise, cannotReturnOwn());
								return;
							}
						} else {
							value = detail;
							succeeded = true;
						}

						if (promise._state !== PENDING) {
							// noop
						} else if (hasCallback && succeeded) {
							resolve(promise, value);
						} else if (failed) {
							reject(promise, error);
						} else if (settled === FULFILLED) {
							fulfill(promise, value);
						} else if (settled === REJECTED) {
							reject(promise, value);
						}
					}

					function initializePromise(promise, resolver) {
						try {
							resolver(function resolvePromise(value) {
								resolve(promise, value);
							}, function rejectPromise(reason) {
								reject(promise, reason);
							});
						} catch (e) {
							reject(promise, e);
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

					function validationError() {
						return new Error('Array Methods must be provided an Array');
					}

					var Enumerator = function() {
						function Enumerator(Constructor, input) {
							this._instanceConstructor = Constructor;
							this.promise = new Constructor(noop);

							if (!this.promise[PROMISE_ID]) {
								makePromise(this.promise);
							}

							if (isArray(input)) {
								this.length = input.length;
								this._remaining = input.length;

								this._result = new Array(this.length);

								if (this.length === 0) {
									fulfill(this.promise, this._result);
								} else {
									this.length = this.length || 0;
									this._enumerate(input);
									if (this._remaining === 0) {
										fulfill(this.promise, this._result);
									}
								}
							} else {
								reject(this.promise, validationError());
							}
						}

						Enumerator.prototype._enumerate = function _enumerate(input) {
							for (var i = 0; this._state === PENDING && i < input.length; i++) {
								this._eachEntry(input[i], i);
							}
						};

						Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
							var c = this._instanceConstructor;
							var resolve$$1 = c.resolve;


							if (resolve$$1 === resolve$1) {
								var _then = getThen(entry);

								if (_then === then && entry._state !== PENDING) {
									this._settledAt(entry._state, i, entry._result);
								} else if (typeof _then !== 'function') {
									this._remaining--;
									this._result[i] = entry;
								} else if (c === Promise$1) {
									var promise = new c(noop);
									handleMaybeThenable(promise, entry, _then);
									this._willSettleAt(promise, i);
								} else {
									this._willSettleAt(new c(function(resolve$$1) {
										return resolve$$1(entry);
									}), i);
								}
							} else {
								this._willSettleAt(resolve$$1(entry), i);
							}
						};

						Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
							var promise = this.promise;


							if (promise._state === PENDING) {
								this._remaining--;

								if (state === REJECTED) {
									reject(promise, value);
								} else {
									this._result[i] = value;
								}
							}

							if (this._remaining === 0) {
								fulfill(promise, this._result);
							}
						};

						Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
							var enumerator = this;

							subscribe(promise, undefined, function(value) {
								return enumerator._settledAt(FULFILLED, i, value);
							}, function(reason) {
								return enumerator._settledAt(REJECTED, i, reason);
							});
						};

						return Enumerator;
					}();

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
							return new Constructor(function(_, reject) {
								return reject(new TypeError('You must pass an array to race.'));
							});
						} else {
							return new Constructor(function(resolve, reject) {
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
					function reject$1(reason) {
						/*jshint validthis:true */
						var Constructor = this;
						var promise = new Constructor(noop);
						reject(promise, reason);
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
					 @param {Function} resolver
					 Useful for tooling.
					 @constructor
					 */

					var Promise$1 = function() {
						function Promise(resolver) {
							this[PROMISE_ID] = nextId();
							this._result = this._state = undefined;
							this._subscribers = [];

							if (noop !== resolver) {
								typeof resolver !== 'function' && needsResolver();
								this instanceof Promise ? initializePromise(this, resolver) : needsNew();
							}
						}

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


						Promise.prototype.catch = function _catch(onRejection) {
							return this.then(null, onRejection);
						};

						/**
						 `finally` will be invoked regardless of the promise's fate just as native
						 try/catch/finally behaves

						 Synchronous example:

						 ```js
						 findAuthor() {
						    if (Math.random() > 0.5) {
						      throw new Error();
						    }
						    return new Author();
						  }

						 try {
						    return findAuthor(); // succeed or fail
						  } catch(error) {
						    return findOtherAuther();
						  } finally {
						    // always runs
						    // doesn't affect the return value
						  }
						 ```

						 Asynchronous example:

						 ```js
						 findAuthor().catch(function(reason){
						    return findOtherAuther();
						  }).finally(function(){
						    // author was either found, or not
						  });
						 ```

						 @method finally
						 @param {Function} callback
						 @return {Promise}
						 */


						Promise.prototype.finally = function _finally(callback) {
							var promise = this;
							var constructor = promise.constructor;

							return promise.then(function(value) {
								return constructor.resolve(callback()).then(function() {
									return value;
								});
							}, function(reason) {
								return constructor.resolve(callback()).then(function() {
									throw reason;
								});
							});
						};

						return Promise;
					}();

					Promise$1.prototype.then = then;
					Promise$1.all = all;
					Promise$1.race = race;
					Promise$1.resolve = resolve$1;
					Promise$1.reject = reject$1;
					Promise$1._setScheduler = setScheduler;
					Promise$1._setAsap = setAsap;
					Promise$1._asap = asap;

					/*global self*/
					function polyfill() {
						var local = void 0;

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

						local.Promise = Promise$1;
					}

					// Strange compat..
					Promise$1.polyfill = polyfill;
					Promise$1.Promise = Promise$1;

					return Promise$1;

				})));



				//# sourceMappingURL=es6-promise.map

				/* WEBPACK VAR INJECTION */
			}.call(exports, __webpack_require__(96), (function() {
				return this;
			}())))

			/***/
		}),
		/* 146 */
		/***/
		(function(module, exports) {

			"use strict";

			(function(o) {
				//ajax 306 处理
				var until = {
					getParam: function getParam(name) {
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
						var r = window.location.search.substr(1).match(reg);
						if (r != null) return unescape(r[2]);
						return null;
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
						$("#" + _iframeid).attr({
							'width': '100%',
							'height': h
						});
					},
					addRouter: function addRouter(path, func) {
						var pos = path.indexOf('/:');
						var truePath = path;
						if (pos != -1) truePath = path.substring(0, pos);
						func = func || function() {
							var params = arguments;
							initLayout(contextRoot + '/data:layout' + truePath, params);
						};
						var tmparray = truePath.split("/");
						if (tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]) {
							return;
						} else {
							router.on(path, func);
							router.on('before', path, function() {
								var design = $("#design");
								if (navigator.userAgent.indexOf("iPad") != -1 || getBrowserVersion() == 'IE8') {} else {
									design.html('<i class="portalfont icon-personalized"></i>个性化').parent().show();
									design.parent().parent().find('.divider').show();
								}

								design.attr("path", path.replace(/#|\//ig, ''));
							});
							router.on('after', path, function() {
								var design = $("#design");
								if (design.attr("sortalbe") == "true") {
									var r = confirm("有尚未保存的内容,保存吗?");
									if (r == true) {
										$("#design").trigger("click");
									}
								}
								design.attr({
									"path": "",
									"sortalbe": "false"
								}).parent().hide();
								design.parent().parent().find('.divider').hide();
							});
						}
					},
					registerRouter: function registerRouter(id, path) {
						var routeInit = function routeInit(p) {
							return function() {
								var module = p;
								requirejs.undef(module);
								var content = document.getElementById("content");
								window.require([module], function(module) {
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
						load([module], function(module) {
							$('#content').html('');
							module.init(params);
						});
					},
					initLayoutTemplate: function initLayoutTemplate(p, params) {
						var module = p;
						var load = window.require;
						requirejs.undef(module);
						load([module], function(module) {
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
						window.addRouter("/" + oldViewId, function() {
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
						window.setTimeout(function() {
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

			/***/
		}),
		/* 147 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			var _typeof2 = __webpack_require__(38);

			var _typeof3 = _interopRequireDefault(_typeof2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/*
			Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
			License: MIT - http://mrgnrdrck.mit-license.org

			https://github.com/mroderick/PubSubJS
			*/
			(function(root, factory) {
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
			})((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && window || undefined, function(PubSub) {
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
				PubSub.publish = function(message, data) {
					return publish(message, data, false, PubSub.immediateExceptions);
				};

				/**
				 *	PubSub.publishSync( message[, data] ) -> Boolean
				 *	- message (String): The message to publish
				 *	- data: The data to pass to subscribers
				 *	Publishes the the message synchronously, passing the data to it's subscribers
				 **/
				PubSub.publishSync = function(message, data) {
					return publish(message, data, true, PubSub.immediateExceptions);
				};

				/**
				 *	PubSub.subscribe( message, func ) -> String
				 *	- message (String): The message to subscribe to
				 *	- func (Function): The function to call when a new message is published
				 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
				 *	you need to unsubscribe
				 **/
				PubSub.subscribe = function(message, func) {
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
				PubSub.unsubscribe = function(value) {
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

			/***/
		}),
		/* 148 */
		/***/
		(function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
			'use strict';

			/*! http://mths.be/placeholder v2.1.1 by @mathias */
			(function(factory) {
				if (true) {
					// AMD
					!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
				} else {
					// Browser globals
					factory(jQuery);
				}
			})(function() {
				// Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
				var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
				var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
				var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
				var valHooks = $.valHooks;
				var propHooks = $.propHooks;
				var hooks;
				var placeholder;

				if (isInputSupported && isTextareaSupported) {

					placeholder = $.fn.placeholder = function() {
						return this;
					};

					placeholder.input = placeholder.textarea = true;
				} else {

					var settings = {};

					placeholder = $.fn.placeholder = function(options) {

						var defaults = {
							customClass: 'placeholder'
						};
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

					$(function() {
						// Look for forms
						$(document).delegate('form', 'submit.placeholder', function() {
							// Clear the placeholder values so they don't get submitted
							var $inputs = $('.' + settings.customClass, this).each(clearPlaceholder);
							setTimeout(function() {
								$inputs.each(setPlaceholder);
							}, 10);
						});
					});

					// Clear placeholder values upon page reload
					$(window).bind('beforeunload.placeholder', function() {
						$('.' + settings.customClass).each(function() {
							this.value = '';
						});
					});
				}

				function args(elem) {
					// Return an object of element attributes
					var newAttrs = {};
					var rinlinejQuery = /^jQuery\d+$/;
					$.each(elem.attributes, function(i, attr) {
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
									$replacement = $input.clone().attr({
										'type': 'text'
									});
								} catch (e) {
									$replacement = $('<input>').attr($.extend(args(this), {
										'type': 'text'
									}));
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

			/***/
		}),
		/* 149 */
		/***/
		(function(module, exports, __webpack_require__) {

			"use strict";

			var _typeof2 = __webpack_require__(38);

			var _typeof3 = _interopRequireDefault(_typeof2);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : {
					default: obj
				};
			}

			/*!
			 * Bootstrap v3.3.4 (http://getbootstrap.com)
			 * Copyright 2011-2015 Twitter, Inc.
			 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
			 */
			if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
				"use strict";
				var b = a.fn.jquery.split(" ")[0].split(".");
				if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
			}(jQuery), + function(a) {
				"use strict";

				function b() {
					var a = document.createElement("bootstrap"),
						b = {
							WebkitTransition: "webkitTransitionEnd",
							MozTransition: "transitionend",
							OTransition: "oTransitionEnd otransitionend",
							transition: "transitionend"
						};
					for (var c in b) {
						if (void 0 !== a.style[c]) return {
							end: b[c]
						};
					}
					return !1;
				}
				a.fn.emulateTransitionEnd = function(b) {
					var c = !1,
						d = this;
					a(this).one("bsTransitionEnd", function() {
						c = !0;
					});
					var e = function e() {
						c || a(d).trigger(a.support.transition.end);
					};
					return setTimeout(e, b), this;
				}, a(function() {
					a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
						bindType: a.support.transition.end,
						delegateType: a.support.transition.end,
						handle: function handle(b) {
							return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
						}
					});
				});
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var c = a(this),
							e = c.data("bs.alert");
						e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
					});
				}
				var c = '[data-dismiss="alert"]',
					d = function d(b) {
						a(b).on("click", c, this.close);
					};
				d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
					function c() {
						g.detach().trigger("closed.bs.alert").remove();
					}
					var e = a(this),
						f = e.attr("data-target");
					f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
					var g = a(f);
					b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
				};
				var e = a.fn.alert;
				a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
					return a.fn.alert = e, this;
				}, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.button"),
							f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;
						e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
					});
				}
				var c = function c(b, d) {
					this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
				};
				c.VERSION = "3.3.4", c.DEFAULTS = {
					loadingText: "loading..."
				}, c.prototype.setState = function(b) {
					var c = "disabled",
						d = this.$element,
						e = d.is("input") ? "val" : "html",
						f = d.data();
					b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
						d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c));
					}, this), 0);
				}, c.prototype.toggle = function() {
					var a = !0,
						b = this.$element.closest('[data-toggle="buttons"]');
					if (b.length) {
						var c = this.$element.find("input");
						"radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change");
					} else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
					a && this.$element.toggleClass("active");
				};
				var d = a.fn.button;
				a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
					return a.fn.button = d, this;
				}, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
					var d = a(c.target);
					d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault();
				}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
					a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
				});
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.carousel"),
							f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b),
							g = "string" == typeof b ? b : f.slide;
						e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
					});
				}
				var c = function c(b, _c) {
					this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
				};
				c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
					interval: 5e3,
					pause: "hover",
					wrap: !0,
					keyboard: !0
				}, c.prototype.keydown = function(a) {
					if (!/input|textarea/i.test(a.target.tagName)) {
						switch (a.which) {
							case 37:
								this.prev();
								break;
							case 39:
								this.next();
								break;
							default:
								return;
						}
						a.preventDefault();
					}
				}, c.prototype.cycle = function(b) {
					return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
				}, c.prototype.getItemIndex = function(a) {
					return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
				}, c.prototype.getItemForDirection = function(a, b) {
					var c = this.getItemIndex(b),
						d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
					if (d && !this.options.wrap) return b;
					var e = "prev" == a ? -1 : 1,
						f = (c + e) % this.$items.length;
					return this.$items.eq(f);
				}, c.prototype.to = function(a) {
					var b = this,
						c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
					return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
						b.to(a);
					}) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
				}, c.prototype.pause = function(b) {
					return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
				}, c.prototype.next = function() {
					return this.sliding ? void 0 : this.slide("next");
				}, c.prototype.prev = function() {
					return this.sliding ? void 0 : this.slide("prev");
				}, c.prototype.slide = function(b, d) {
					var e = this.$element.find(".item.active"),
						f = d || this.getItemForDirection(b, e),
						g = this.interval,
						h = "next" == b ? "left" : "right",
						i = this;
					if (f.hasClass("active")) return this.sliding = !1;
					var j = f[0],
						k = a.Event("slide.bs.carousel", {
							relatedTarget: j,
							direction: h
						});
					if (this.$element.trigger(k), !k.isDefaultPrevented()) {
						if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
							this.$indicators.find(".active").removeClass("active");
							var l = a(this.$indicators.children()[this.getItemIndex(f)]);
							l && l.addClass("active");
						}
						var m = a.Event("slid.bs.carousel", {
							relatedTarget: j,
							direction: h
						});
						return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
							f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
								i.$element.trigger(m);
							}, 0);
						}).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
					}
				};
				var d = a.fn.carousel;
				a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
					return a.fn.carousel = d, this;
				};
				var e = function e(c) {
					var d,
						e = a(this),
						f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
					if (f.hasClass("carousel")) {
						var g = a.extend({}, f.data(), e.data()),
							h = e.attr("data-slide-to");
						h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
					}
				};
				a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
					a('[data-ride="carousel"]').each(function() {
						var c = a(this);
						b.call(c, c.data());
					});
				});
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					var c,
						d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
					return a(d);
				}

				function c(b) {
					return this.each(function() {
						var c = a(this),
							e = c.data("bs.collapse"),
							f = a.extend({}, d.DEFAULTS, c.data(), "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b);
						!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
					});
				}
				var d = function d(b, c) {
					this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
				};
				d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
					toggle: !0
				}, d.prototype.dimension = function() {
					var a = this.$element.hasClass("width");
					return a ? "width" : "height";
				}, d.prototype.show = function() {
					if (!this.transitioning && !this.$element.hasClass("in")) {
						var b,
							e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
						if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
							var f = a.Event("show.bs.collapse");
							if (this.$element.trigger(f), !f.isDefaultPrevented()) {
								e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
								var g = this.dimension();
								this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
								var h = function h() {
									this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
								};
								if (!a.support.transition) return h.call(this);
								var i = a.camelCase(["scroll", g].join("-"));
								this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
							}
						}
					}
				}, d.prototype.hide = function() {
					if (!this.transitioning && this.$element.hasClass("in")) {
						var b = a.Event("hide.bs.collapse");
						if (this.$element.trigger(b), !b.isDefaultPrevented()) {
							var c = this.dimension();
							this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
							var e = function e() {
								this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
							};
							return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
						}
					}
				}, d.prototype.toggle = function() {
					this[this.$element.hasClass("in") ? "hide" : "show"]();
				}, d.prototype.getParent = function() {
					return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
						var e = a(d);
						this.addAriaAndCollapsedClass(b(e), e);
					}, this)).end();
				}, d.prototype.addAriaAndCollapsedClass = function(a, b) {
					var c = a.hasClass("in");
					a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
				};
				var e = a.fn.collapse;
				a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
					return a.fn.collapse = e, this;
				}, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
					var e = a(this);
					e.attr("data-target") || d.preventDefault();
					var f = b(e),
						g = f.data("bs.collapse"),
						h = g ? "toggle" : e.data();
					c.call(f, h);
				});
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					b && 3 === b.which || (a(e).remove(), a(f).each(function() {
						var d = a(this),
							e = c(d),
							f = {
								relatedTarget: this
							};
						e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)));
					}));
				}

				function c(b) {
					var c = b.attr("data-target");
					c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
					var d = c && a(c);
					return d && d.length ? d : b.parent();
				}

				function d(b) {
					return this.each(function() {
						var c = a(this),
							d = c.data("bs.dropdown");
						d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
					});
				}
				var e = ".dropdown-backdrop",
					f = '[data-toggle="dropdown"]',
					g = function g(b) {
						a(b).on("click.bs.dropdown", this.toggle);
					};
				g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
					var e = a(this);
					if (!e.is(".disabled, :disabled")) {
						var f = c(e),
							g = f.hasClass("open");
						if (b(), !g) {
							"ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
							var h = {
								relatedTarget: this
							};
							if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
							e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h);
						}
						return !1;
					}
				}, g.prototype.keydown = function(b) {
					if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
						var d = a(this);
						if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
							var e = c(d),
								g = e.hasClass("open");
							if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
							var h = " li:not(.disabled):visible a",
								i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
							if (i.length) {
								var j = i.index(b.target);
								38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
							}
						}
					}
				};
				var h = a.fn.dropdown;
				a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
					return a.fn.dropdown = h, this;
				}, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
					a.stopPropagation();
				}).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown);
			}(jQuery), + function(a) {
				"use strict";

				function b(b, d) {
					return this.each(function() {
						var e = a(this),
							f = e.data("bs.modal"),
							g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b);
						f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
					});
				}
				var c = function c(b, _c2) {
					this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
						this.$element.trigger("loaded.bs.modal");
					}, this));
				};
				c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
					backdrop: !0,
					keyboard: !0,
					show: !0
				}, c.prototype.toggle = function(a) {
					return this.isShown ? this.hide() : this.show(a);
				}, c.prototype.show = function(b) {
					var d = this,
						e = a.Event("show.bs.modal", {
							relatedTarget: b
						});
					this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
						d.$element.one("mouseup.dismiss.bs.modal", function(b) {
							a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
						});
					}), this.backdrop(function() {
						var e = a.support.transition && d.$element.hasClass("fade");
						d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
						var f = a.Event("shown.bs.modal", {
							relatedTarget: b
						});
						e ? d.$dialog.one("bsTransitionEnd", function() {
							d.$element.trigger("focus").trigger(f);
						}).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
					}));
				}, c.prototype.hide = function(b) {
					b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
				}, c.prototype.enforceFocus = function() {
					a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
						this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
					}, this));
				}, c.prototype.escape = function() {
					this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
						27 == a.which && this.hide();
					}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
				}, c.prototype.resize = function() {
					this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
				}, c.prototype.hideModal = function() {
					var a = this;
					this.$element.hide(), this.backdrop(function() {
						a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
					});
				}, c.prototype.removeBackdrop = function() {
					this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
				}, c.prototype.backdrop = function(b) {
					var d = this,
						e = this.$element.hasClass("fade") ? "fade" : "";
					if (this.isShown && this.options.backdrop) {
						var f = a.support.transition && e;
						if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
							return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
						}, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
						f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
					} else if (!this.isShown && this.$backdrop) {
						this.$backdrop.removeClass("in");
						var g = function g() {
							d.removeBackdrop(), b && b();
						};
						a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
					} else b && b();
				}, c.prototype.handleUpdate = function() {
					this.adjustDialog();
				}, c.prototype.adjustDialog = function() {
					var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
					this.$element.css({
						paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
						paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
					});
				}, c.prototype.resetAdjustments = function() {
					this.$element.css({
						paddingLeft: "",
						paddingRight: ""
					});
				}, c.prototype.checkScrollbar = function() {
					var a = window.innerWidth;
					if (!a) {
						var b = document.documentElement.getBoundingClientRect();
						a = b.right - Math.abs(b.left);
					}
					this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
				}, c.prototype.setScrollbar = function() {
					var a = parseInt(this.$body.css("padding-right") || 0, 10);
					this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
				}, c.prototype.resetScrollbar = function() {
					this.$body.css("padding-right", this.originalBodyPad);
				}, c.prototype.measureScrollbar = function() {
					var a = document.createElement("div");
					a.className = "modal-scrollbar-measure", this.$body.append(a);
					var b = a.offsetWidth - a.clientWidth;
					return this.$body[0].removeChild(a), b;
				};
				var d = a.fn.modal;
				a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
					return a.fn.modal = d, this;
				}, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
					var d = a(this),
						e = d.attr("href"),
						f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
						g = f.data("bs.modal") ? "toggle" : a.extend({
							remote: !/#/.test(e) && e
						}, f.data(), d.data());
					d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
						a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
							d.is(":visible") && d.trigger("focus");
						});
					}), b.call(f, g, this);
				});
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.tooltip"),
							f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;
						(e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
					});
				}
				var c = function c(a, b) {
					this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b);
				};
				c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
					animation: !0,
					placement: "top",
					selector: !1,
					template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
					trigger: "hover focus",
					title: "",
					delay: 0,
					html: !1,
					container: !1,
					viewport: {
						selector: "body",
						padding: 0
					}
				}, c.prototype.init = function(b, c, d) {
					if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
					for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
						var g = e[f];
						if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
						else if ("manual" != g) {
							var h = "hover" == g ? "mouseenter" : "focusin",
								i = "hover" == g ? "mouseleave" : "focusout";
							this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
						}
					}
					this.options.selector ? this._options = a.extend({}, this.options, {
						trigger: "manual",
						selector: ""
					}) : this.fixTitle();
				}, c.prototype.getDefaults = function() {
					return c.DEFAULTS;
				}, c.prototype.getOptions = function(b) {
					return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
						show: b.delay,
						hide: b.delay
					}), b;
				}, c.prototype.getDelegateOptions = function() {
					var b = {},
						c = this.getDefaults();
					return this._options && a.each(this._options, function(a, d) {
						c[a] != d && (b[a] = d);
					}), b;
				}, c.prototype.enter = function(b) {
					var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
					return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
						"in" == c.hoverState && c.show();
					}, c.options.delay.show)) : c.show());
				}, c.prototype.leave = function(b) {
					var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
					return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
						"out" == c.hoverState && c.hide();
					}, c.options.delay.hide)) : c.hide();
				}, c.prototype.show = function() {
					var b = a.Event("show.bs." + this.type);
					if (this.hasContent() && this.enabled) {
						this.$element.trigger(b);
						var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
						if (b.isDefaultPrevented() || !d) return;
						var e = this,
							f = this.tip(),
							g = this.getUID(this.type);
						this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
						var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
							i = /\s?auto?\s?/i,
							j = i.test(h);
						j && (h = h.replace(i, "") || "top"), f.detach().css({
							top: 0,
							left: 0,
							display: "block"
						}).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
						var k = this.getPosition(),
							l = f[0].offsetWidth,
							m = f[0].offsetHeight;
						if (j) {
							var n = h,
								o = this.options.container ? a(this.options.container) : this.$element.parent(),
								p = this.getPosition(o);
							h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h);
						}
						var q = this.getCalculatedOffset(h, k, l, m);
						this.applyPlacement(q, h);
						var r = function r() {
							var a = e.hoverState;
							e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
						};
						a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r();
					}
				}, c.prototype.applyPlacement = function(b, c) {
					var d = this.tip(),
						e = d[0].offsetWidth,
						f = d[0].offsetHeight,
						g = parseInt(d.css("margin-top"), 10),
						h = parseInt(d.css("margin-left"), 10);
					isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
						using: function using(a) {
							d.css({
								top: Math.round(a.top),
								left: Math.round(a.left)
							});
						}
					}, b), 0), d.addClass("in");
					var i = d[0].offsetWidth,
						j = d[0].offsetHeight;
					"top" == c && j != f && (b.top = b.top + f - j);
					var k = this.getViewportAdjustedDelta(c, b, i, j);
					k.left ? b.left += k.left : b.top += k.top;
					var l = /top|bottom/.test(c),
						m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
						n = l ? "offsetWidth" : "offsetHeight";
					d.offset(b), this.replaceArrow(m, d[0][n], l);
				}, c.prototype.replaceArrow = function(a, b, c) {
					this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
				}, c.prototype.setContent = function() {
					var a = this.tip(),
						b = this.getTitle();
					a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
				}, c.prototype.hide = function(b) {
					function d() {
						"in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
					}
					var e = this,
						f = a(this.$tip),
						g = a.Event("hide.bs." + this.type);
					return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this);
				}, c.prototype.fixTitle = function() {
					var a = this.$element;
					(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
				}, c.prototype.hasContent = function() {
					return this.getTitle();
				}, c.prototype.getPosition = function(b) {
					b = b || this.$element;
					var c = b[0],
						d = "BODY" == c.tagName,
						e = c.getBoundingClientRect();
					null == e.width && (e = a.extend({}, e, {
						width: e.right - e.left,
						height: e.bottom - e.top
					}));
					var f = d ? {
							top: 0,
							left: 0
						} : b.offset(),
						g = {
							scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
						},
						h = d ? {
							width: a(window).width(),
							height: a(window).height()
						} : null;
					return a.extend({}, e, g, h, f);
				}, c.prototype.getCalculatedOffset = function(a, b, c, d) {
					return "bottom" == a ? {
						top: b.top + b.height,
						left: b.left + b.width / 2 - c / 2
					} : "top" == a ? {
						top: b.top - d,
						left: b.left + b.width / 2 - c / 2
					} : "left" == a ? {
						top: b.top + b.height / 2 - d / 2,
						left: b.left - c
					} : {
						top: b.top + b.height / 2 - d / 2,
						left: b.left + b.width
					};
				}, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
					var e = {
						top: 0,
						left: 0
					};
					if (!this.$viewport) return e;
					var f = this.options.viewport && this.options.viewport.padding || 0,
						g = this.getPosition(this.$viewport);
					if (/right|left/.test(a)) {
						var h = b.top - f - g.scroll,
							i = b.top + f - g.scroll + d;
						h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
					} else {
						var j = b.left - f,
							k = b.left + f + c;
						j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k);
					}
					return e;
				}, c.prototype.getTitle = function() {
					var a,
						b = this.$element,
						c = this.options;
					return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
				}, c.prototype.getUID = function(a) {
					do {
						a += ~~(1e6 * Math.random());
					} while (document.getElementById(a));
					return a;
				}, c.prototype.tip = function() {
					return this.$tip = this.$tip || a(this.options.template);
				}, c.prototype.arrow = function() {
					return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
				}, c.prototype.enable = function() {
					this.enabled = !0;
				}, c.prototype.disable = function() {
					this.enabled = !1;
				}, c.prototype.toggleEnabled = function() {
					this.enabled = !this.enabled;
				}, c.prototype.toggle = function(b) {
					var c = this;
					b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
				}, c.prototype.destroy = function() {
					var a = this;
					clearTimeout(this.timeout), this.hide(function() {
						a.$element.off("." + a.type).removeData("bs." + a.type);
					});
				};
				var d = a.fn.tooltip;
				a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
					return a.fn.tooltip = d, this;
				};
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.popover"),
							f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;
						(e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
					});
				}
				var c = function c(a, b) {
					this.init("popover", a, b);
				};
				if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
				c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
					placement: "right",
					trigger: "click",
					content: "",
					template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
				}), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
					return c.DEFAULTS;
				}, c.prototype.setContent = function() {
					var a = this.tip(),
						b = this.getTitle(),
						c = this.getContent();
					a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
				}, c.prototype.hasContent = function() {
					return this.getTitle() || this.getContent();
				}, c.prototype.getContent = function() {
					var a = this.$element,
						b = this.options;
					return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
				}, c.prototype.arrow = function() {
					return this.$arrow = this.$arrow || this.tip().find(".arrow");
				};
				var d = a.fn.popover;
				a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
					return a.fn.popover = d, this;
				};
			}(jQuery), + function(a) {
				"use strict";

				function b(c, d) {
					this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
				}

				function c(c) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.scrollspy"),
							f = "object" == (typeof c === "undefined" ? "undefined" : (0, _typeof3.default)(c)) && c;
						e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
					});
				}
				b.VERSION = "3.3.4", b.DEFAULTS = {
					offset: 10
				}, b.prototype.getScrollHeight = function() {
					return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
				}, b.prototype.refresh = function() {
					var b = this,
						c = "offset",
						d = 0;
					this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
						var b = a(this),
							e = b.data("target") || b.attr("href"),
							f = /^#./.test(e) && a(e);
						return f && f.length && f.is(":visible") && [
							[f[c]().top + d, e]
						] || null;
					}).sort(function(a, b) {
						return a[0] - b[0];
					}).each(function() {
						b.offsets.push(this[0]), b.targets.push(this[1]);
					});
				}, b.prototype.process = function() {
					var a,
						b = this.$scrollElement.scrollTop() + this.options.offset,
						c = this.getScrollHeight(),
						d = this.options.offset + c - this.$scrollElement.height(),
						e = this.offsets,
						f = this.targets,
						g = this.activeTarget;
					if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
					if (g && b < e[0]) return this.activeTarget = null, this.clear();
					for (a = e.length; a--;) {
						g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
					}
				}, b.prototype.activate = function(b) {
					this.activeTarget = b, this.clear();
					var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
						d = a(c).parents("li").addClass("active");
					d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
				}, b.prototype.clear = function() {
					a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
				};
				var d = a.fn.scrollspy;
				a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
					return a.fn.scrollspy = d, this;
				}, a(window).on("load.bs.scrollspy.data-api", function() {
					a('[data-spy="scroll"]').each(function() {
						var b = a(this);
						c.call(b, b.data());
					});
				});
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.tab");
						e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
					});
				}
				var c = function c(b) {
					this.element = a(b);
				};
				c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
					var b = this.element,
						c = b.closest("ul:not(.dropdown-menu)"),
						d = b.data("target");
					if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
						var e = c.find(".active:last a"),
							f = a.Event("hide.bs.tab", {
								relatedTarget: b[0]
							}),
							g = a.Event("show.bs.tab", {
								relatedTarget: e[0]
							});
						if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
							var h = a(d);
							this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
								e.trigger({
									type: "hidden.bs.tab",
									relatedTarget: b[0]
								}), b.trigger({
									type: "shown.bs.tab",
									relatedTarget: e[0]
								});
							});
						}
					}
				}, c.prototype.activate = function(b, d, e) {
					function f() {
						g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
					}
					var g = d.find("> .active"),
						h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
					g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
				};
				var d = a.fn.tab;
				a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
					return a.fn.tab = d, this;
				};
				var e = function e(c) {
					c.preventDefault(), b.call(a(this), "show");
				};
				a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
			}(jQuery), + function(a) {
				"use strict";

				function b(b) {
					return this.each(function() {
						var d = a(this),
							e = d.data("bs.affix"),
							f = "object" == (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) && b;
						e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
					});
				}
				var c = function c(b, d) {
					this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
				};
				c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
					offset: 0,
					target: window
				}, c.prototype.getState = function(a, b, c, d) {
					var e = this.$target.scrollTop(),
						f = this.$element.offset(),
						g = this.$target.height();
					if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
					if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
					var h = null == this.affixed,
						i = h ? e : f.top,
						j = h ? g : b;
					return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1;
				}, c.prototype.getPinnedOffset = function() {
					if (this.pinnedOffset) return this.pinnedOffset;
					this.$element.removeClass(c.RESET).addClass("affix");
					var a = this.$target.scrollTop(),
						b = this.$element.offset();
					return this.pinnedOffset = b.top - a;
				}, c.prototype.checkPositionWithEventLoop = function() {
					setTimeout(a.proxy(this.checkPosition, this), 1);
				}, c.prototype.checkPosition = function() {
					if (this.$element.is(":visible")) {
						var b = this.$element.height(),
							d = this.options.offset,
							e = d.top,
							f = d.bottom,
							g = a(document.body).height();
						"object" != (typeof d === "undefined" ? "undefined" : (0, _typeof3.default)(d)) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
						var h = this.getState(g, b, e, f);
						if (this.affixed != h) {
							null != this.unpin && this.$element.css("top", "");
							var i = "affix" + (h ? "-" + h : ""),
								j = a.Event(i + ".bs.affix");
							if (this.$element.trigger(j), j.isDefaultPrevented()) return;
							this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
						}
						"bottom" == h && this.$element.offset({
							top: g - b - f
						});
					}
				};
				var d = a.fn.affix;
				a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
					return a.fn.affix = d, this;
				}, a(window).on("load", function() {
					a('[data-spy="affix"]').each(function() {
						var c = a(this),
							d = c.data();
						d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
					});
				});
			}(jQuery);

			/***/
		}),
		/* 150 */
		/***/
		(function(module, exports) {

			'use strict';

			;
			(function($) {
				var _ajax = $.ajax;
				$.ptAjax = function(opt) {
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
							$.each(urlarys, function(i, n) {
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

			/***/
		}),
		/* 151 */
		/***/
		(function(module, exports) {

			// removed by extract-text-webpack-plugin

			/***/
		})
		/******/
	])
});;