define(['searchbox', 'editcard', 'billcard'], function(searchbox, editcard, card) {
    'use strict';

    function bindHander() {
        // 注册按钮扩展事件以满足同时绑定多个ko事件
        ko.bindingHandlers.multiBind = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                // 处理click事件
                // 从上下文绑定的对象中获取点击事件的函数名称和参数
                var funcName = viewModel.click.split(".")[0];
                var $root = bindingContext["$root"];
                var func = $root[funcName];
                if (viewModel.clickArg != undefined) {
                    func = func.bind(viewModel, viewModel.clickArg);
                }
                var newValueAccessor = function() {
                    var result = {};
                    result.click = func;
                    return result;
                };

                ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindings, viewModel, bindingContext);

                // 处理cls样式更新
                ko.bindingHandlers['css']['update'].call(this, element, function() {
                    return viewModel.cls || "ui-btn-primary"
                })
                // 处理visible逻辑控制
                if (viewModel.visible) {
                    ko.computed(function() {
                        ko.bindingHandlers['visible']['update'].call(this, element, $root[viewModel.visible])
                    })
                }

            }
        };
        // 特殊icon绑定
        ko.bindingHandlers.icon = {
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                var iconcls = (viewModel.iconCls) ? (viewModel.iconCls + " margin-right-5") : "";
                // 处理cls样式更新
                ko.bindingHandlers['css']['update'].call(this, element, function() {
                    return iconcls;
                })
            }
        };
    }

    function registerComponents() {
        // 注册按钮组件ui-buttons
        var ui_buttons_tpl =
            '<div data-bind="foreach:datasource">' +
            '    <a class="ui-btn margin-right-5" data-bind="multiBind">' +
            '        <i class="uifont" data-bind="icon"></i>' +
            '        <!--ko text: label-->' +
            '        <!--/ko-->' +
            '    </a>' +
            '</div>';
        ko.components.register("ui-buttons", {
            viewModel: function(params) {
                if (ko.isObservable(params.datasource)) {
                    this.datasource = params.datasource;
                } else {
                    this.datasource = ko.observableArray(params.datasource);
                }
            },
            template: ui_buttons_tpl
        })

        function handleButtonsMenuTpl(datasource, sourcevm, targetvm) {
            function handleSubMenu(arr, id) {
                var temparr = arr.map(function(item) {
                    var clickEvent = ""
                    if (item.click && sourcevm && targetvm) {
                        if (item.clickArg != undefined) {
                            targetvm[item.click] = sourcevm[item.click].bind({}, item.clickArg);
                        } else {
                            targetvm[item.click] = sourcevm[item.click];
                        }
                        clickEvent = 'data-bind="click:' + item.click + '"';
                    }
                    return '<li class="u-menu-item" ' + clickEvent + '>' +
                        '<a>' + item.label + '</a>' +
                        '</li>'
                })

                return '<ul class="u-menu u-menu-info2" for="' + id + '">' + temparr.join("") + '</ul>';
            }
            var tempArr = datasource.map(function(item) {
                var tpl = "";
                var clickEvent = ""
                if (item.click && sourcevm && targetvm && !u.isArray(item.children)) {
                    if (item.clickArg != undefined) {
                        targetvm[item.click] = sourcevm[item.click].bind({}, item.clickArg);
                    } else {
                        targetvm[item.click] = sourcevm[item.click];
                    }
                    clickEvent = 'data-bind="click:' + item.click + '"';
                }
                var cls = item.cls || "ui-btn-primary"
                var icon = (item.iconCls) ? ('<i class="uifont ' + item.iconCls + ' margin-right-5"></i>') : "";
                tpl += '<a class="ui-btn ' + cls + ' margin-right-5" id="' + item.key + '-ui-button" ' + clickEvent + '>' +
                    icon + item.label + '</a>';

                if (u.isArray(item.children) && item.children.length > 0 && item.key) {
                    tpl += handleSubMenu(item.children, (item.key + '-ui-button'));
                }
                return tpl;
            })
            return tempArr.join("");
        }
        // 注册按钮组件ui-buttons-menu
        var ui_buttons_menu_tpl = '<div></div>';
        ko.components.register("ui-buttons-menu", {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var result = {}
                    var datasource = params.datasource;
                    var viewModel = params.vm;
                    result.datasource = datasource;
                    if (u.isArray(datasource)) {
                        var tpl = handleButtonsMenuTpl(datasource, viewModel, result);
                        componentInfo.element.innerHTML = tpl;
                        u.compMgr.updateComp(componentInfo.element);
                    }
                    return result;
                }
            },
            template: ui_buttons_menu_tpl
        })

        //注册弹出框编辑组件ui-dialogcard
        var ui_dialogcard_tpl =
            '<div>' +
            '    <div style="display:none" class="dialogcardContainer"></div>' +
            '</div>';
        ko.components.register("ui-dialogcard", {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var ele = componentInfo.element.querySelector(".dialogcardContainer");
                    ele.id = "dialogCard" + new Date().getTime();
                    var busimeta;
                    if (params.dt) busimeta = params.dt;
                    var dialogcardcomp = new editcard(ele, params.datasource, busimeta);
                    window.u.extend(params.ref, dialogcardcomp);
                }
            },
            template: ui_dialogcard_tpl
        })

        //注册搜索组件ui-searchbox
        var ui_searchbox_tpl =
            '<div class="ui-searchbox">' +
            '    <div class="ui-searchbox-content">' +
            '    </div>' +
            '    <div class="clearfix">' +
            '    </div>' +
            '    <div class="ui-searchbox-footer">' +
            '      <div class="ui-search-more hidden">' +
            '        <a>更多' +
            '          <i class="uifont icon-down"></i>' +
            '        </a>' +
            '      </div>' +
            '      <div class="ui-search-btn">' +
            '        <a class="ui-btn ui-btn-primary margin-right-5" data-bind="click:clean">清空' +
            '        </a>' +
            '        <a class="ui-btn ui-btn-green" data-bind="click:search">搜索' +
            '        </a>' +
            '      </div>' +
            '      <div class="clearfix">' +
            '      </div>' +
            '    </div>' +
            '  </div>';
        ko.components.register("ui-searchbox", {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var ele = componentInfo.element.querySelector(".ui-searchbox-content");
                    var inputs = ele.getElementsByTagName("input");
                    var searchcomp = new searchbox(ele, params.datasource);
                    window.u.extend(params.ref, searchcomp);
                    //搜索框实例化后，即执行首次查询
                    if (params.willSearch || params.willSearch == undefined) {
                        try{
                            // params.search(true);
                        }catch(e){
                            console.error('call auto search error， maybe template isnt ready')
                        }
                    }
                    // 首次执行，执行回调函数
                    if(params.firstCallBack && typeof params.firstCallBack == "function") {
                      params.firstCallBack();
                    }
                    for (var i = 0; i < inputs.length; i++) {
                        inputs[i].addEventListener("keydown", function(e) {
                            if (e.keyCode == 13) {
                                this.blur();
                                params.search(true);
                            }
                        });
                    }
                    return {
                        clean: params.clean.bind(params),
                        search: params.search.bind(params, true)
                    }
                }
            },
            template: ui_searchbox_tpl
        })

        // 注册卡片组件 ui-card
        var ui_card_tpl =
            '<div class="ui-card-content"></div>';
        ko.components.register("ui-card", {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var option = params.datasource;
                    var app = params.vm.app;
                    var element = componentInfo.element;
                    var dataTable = params.dt.id;
                    var busimeta = params.dt;
                    card(element, option, busimeta, dataTable, params.vm);
                    element.querySelectorAll('[u-meta]').forEach(function(ele) {
                        var options = JSON.parse(ele.getAttribute('u-meta'));
                        options['type'] = options['type'] || 'string';
                        if (options && options['type']) {
                            if (app.adjustFunc) app.adjustFunc.call(app, options);
                            var comp = u.compMgr.createDataAdapter({
                                el: ele,
                                options: options,
                                model: params.vm,
                                app: app
                            });
                            ele['u-meta'] = comp;
                            app.comps.push(comp);
                        }
                    });

                    var isDsObservable = ko.isObservable(params.billstatus);
                    if (isDsObservable) {
                        params.billstatus.subscribe(function(value) {
                            var disableInEditObj = {};
                            for (var i = 0; i < option.length; i++) {
                                if (option[i].disableInEdit) {
                                    disableInEditObj[option[i].key] = true;
                                }
                            }
                            var status = !(value == CONST.BILLPANELSTATUS.EDIT);
                            element.querySelectorAll('[u-meta]').forEach(function(ele) {
                                if (ele['u-meta']) {
                                    var tempComp = ele['u-meta'];
                                    if (disableInEditObj[tempComp.field]) {
                                        tempComp.setEnable(status)
                                    }
                                }
                            })

                        });
                    }
                    // 下拉框只能下拉选择
                    $(element).find(".u-combobox-input").attr("readonly", true);
                }

            },
            template: ui_card_tpl
        })

        // 注册详情组件 ui-detail
        var ui_detail_tpl =
            '<div class="ui-detail-content"></div>';

        function handleDetailTpl(params, dataTable, sourcevm, targetvm) {
            if (u.isArray(params)) {
                return (params.map(function(item) {
                    var textEvent = "";
                    if (item.computed) {
                        textEvent = item.computed;
                        if (sourcevm && targetvm) {
                            targetvm[textEvent] = sourcevm[textEvent];
                        }
                    } else {
                        textEvent = dataTable + '.ref("' + item.key + '")';
                    }
                    return '<div class="ui-item ' + item.cls + '">' +
                        '<div class="ui-name">' + item.label + '：</div>' +
                        '<div class="ui-inputarea">' +
                        '<div data-bind=\'text: ' + textEvent + '\'>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }).join(" ") + '<div class="clearfix"></div>');
            } else {
                return "datasource未配置为数组";
            }
        }
        ko.components.register("ui-detail", {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var result = {};
                    var datasource = params.datasource;
                    var dataTable = params.dt.id;
                    var viewModel = params.vm || null;
                    result[dataTable] = params.dt;
                    componentInfo.element.innerHTML = handleDetailTpl(datasource, dataTable, viewModel, result);
                    return result;
                }
            },
            template: ui_detail_tpl
        })

        // 注册表格组件ui-grid
        var ui_grid_tpl =
            '<div class="ui-grid-content"></div>';

        function handleGridTpl(param) {
            function handleUmeta(meta) {
                return JSON.stringify(meta);
            }

            function handleColumns(columns) {
                if (u.isArray(columns)) {
                    var optionArr = columns.map(function(item) {
                        return '<div options=\'' + JSON.stringify(item) + '\'></div>'
                    })
                    return optionArr.join(" ");

                } else {
                    throw new Error("columns must be Array");
                }
            }
            return '<div id=\'' + param.domid + '\' u-meta=\'' + handleUmeta(param.umeta) + '\'>' +
                handleColumns(param.columns) +
                '</div>'
        }
        ko.components.register("ui-grid", {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    var ele = componentInfo.element.querySelector(".ui-grid-content");
                    var vm = params.vm;
                    var options = params.options;
                    ele.innerHTML = handleGridTpl(options);
                    var gridEle = ele.children[0];
                    var comp = u.compMgr.createDataAdapter({
                        el: gridEle,
                        options: options.umeta,
                        model: vm,
                        app: vm.app
                    })
                    gridEle['u-meta'] = comp;
                    vm.app.comps.push(comp);
                }
            },
            template: ui_grid_tpl
        })
    }

    bindHander();
    registerComponents();
});