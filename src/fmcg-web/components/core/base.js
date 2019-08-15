define(['fmcg_searchbox', 'fmcg_editcard', 'fmcg_billcard'], function (searchbox, editcard, card) {
    'use strict';

    function bindHander() {
        // 注册按钮扩展事件以满足同时绑定多个ko事件
        ko.bindingHandlers.multiBind = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                // 处理click事件
                // 从上下文绑定的对象中获取点击事件的函数名称和参数
                var funcName = viewModel.click.split(".")[0];
                var $root = bindingContext["$root"];
                var func = $root[funcName];
                if (viewModel.clickArg != undefined) {
                    func = func.bind(viewModel, viewModel.clickArg);
                }
                var newValueAccessor = function () {
                    var result = {};
                    result.click = func;
                    return result;
                };

                ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindings, viewModel, bindingContext);

                // 处理cls样式更新
                ko.bindingHandlers['css']['update'].call(this, element, function () {
                    return viewModel.cls || "ui-btn-primary-new"
                })
                // 处理visible逻辑控制
                if (viewModel.visible) {
                    ko.computed(function(){
                        ko.bindingHandlers['visible']['update'].call(this, element, $root[viewModel.visible])
                    })
                }

            }
        };
        // 特殊icon绑定
        ko.bindingHandlers.icon = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var iconcls = (viewModel.iconCls) ? (viewModel.iconCls + " margin-right-5") : "";
                // 处理cls样式更新
                ko.bindingHandlers['css']['update'].call(this, element, function () {
                    return iconcls;
                })
            }
        };
    }

    function registerComponents() {
        // 注册按钮组件ui-buttons
        var ui_buttons_tpl =
            '<div data-bind="foreach:datasource">' +
            '    <a class="ui-btn " data-bind="multiBind">' +
            '        <i class="uifont" data-bind="icon"></i>' +
            '        <!--ko text: label-->' +
            '        <!--/ko-->' +
            '    </a>' +
            '</div>';
        ko.components.register("ui-buttons", {
            viewModel: function (params) {
                this.datasource = ko.observableArray(params.datasource);
            },
            template: ui_buttons_tpl
        })

        function handleButtonsMenuTpl(datasource, sourcevm, targetvm) {
            function handleSubMenu(arr, id) {
                var temparr = arr.map(function (item) {
                    var clickEvent = ""
                    if (item.click && sourcevm && targetvm) {
                        if (item.clickArg != undefined) {
                            targetvm[item.click] = sourcevm[item.click].bind({}, item.clickArg);
                        } else {
                            targetvm[item.click] = sourcevm[item.click];
                        }
                        clickEvent = 'data-bind="click:' + item.click + '"';
                    }
                    return '<li class="u-menu-item">' +
                        '<a ' + clickEvent + '>' + item.label + '</a>' +
                        '</li>'
                })

                return '<ul class="u-menu u-menu-info2" for="' + id + '">' + temparr.join("") + '</ul>';
            }
            var tempArr = datasource.map(function (item) {
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
                var cls = item.cls || "ui-btn-primary-new"
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
                createViewModel: function (params, componentInfo) {
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
                createViewModel: function (params, componentInfo) {
                    var ele = componentInfo.element.querySelector(".dialogcardContainer");
                    // ele.id = "dialogCard" + new Date().getTime();
                    ele.id = "dialogCard" ;
                    var busimeta;
                    if (params.dt) busimeta = params.dt;
                    var dialogcardcomp = new editcard(ele, params.datasource, busimeta);
                    window.u.extend(params.ref, dialogcardcomp);
                }
            },
            template: ui_dialogcard_tpl
        })

        //注册弹出框查看组件ui-dialogcard-show
        var ui_dialogcard_show_tpl =
        '<div>' +
        '    <div style="display:none" class="dialogcardShowContainer"></div>' +
        '</div>';
        ko.components.register("ui-dialogcard-show", {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var ele = componentInfo.element.querySelector(".dialogcardShowContainer");
                // ele.id = "dialogCard" + new Date().getTime();
                ele.id = "dialogCardShow" ;
                var busimeta;
                if (params.dt) busimeta = params.dt;
                var dialogcardcompshow = new editcard(ele, params.datasource, busimeta);
                window.u.extend(params.ref, dialogcardcompshow);
            }
        },
        template: ui_dialogcard_show_tpl
        })

        //注册搜索组件ui-searchbox
        var ui_searchbox_tpl =
        '<div class="ui-searchbox-container">' +
          '<div class="ui-searchbox">'+
            '<div class="ui-searchbox-items">'+
            '</div>'+
          '</div>'+
        '</div>';
        ko.components.register("ui-searchbox", {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var ele = componentInfo.element.querySelector(".ui-searchbox");
                    var inputs = ele.getElementsByTagName("input");
                    var searchcomp = new searchbox(ele, params.datasource);
                    window.u.extend(params.ref, searchcomp);
                    //搜索框实例化后，即执行首次查询
                    params.search(true);
                    for (var i = 0; i < inputs.length; i++) {
                        inputs[i].addEventListener("keydown", function (e) {
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
                createViewModel: function (params, componentInfo) {
                    var option = params.datasource;
                    var app = params.vm.app;
                    var element = componentInfo.element;
                    var dataTable = params.dt.id;
                    var busimeta = params.dt;
                    card(element, option, busimeta, dataTable, params.vm);
                    element.querySelectorAll('[u-meta]').forEach(function (ele) {
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
                        params.billstatus.subscribe(function (value) {
                            var disableInEditObj = {};
                            for (var i = 0; i < option.length; i++) {
                                if (option[i].disableInEdit) {
                                    disableInEditObj[option[i].key] = true;
                                }
                                //++
                                if(option[i].disableInAdd){
                                    disableInEditObj[option[i].key] = "disableInAdd";
                                }
                                //++
                            }
                            var status = !(value == CONST.BILLPANELSTATUS.EDIT );
                            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                                if (ele['u-meta']) {
                                    var tempComp = ele['u-meta'];
                                    if (disableInEditObj[tempComp.field]) {
                                        tempComp.setEnable(status);
                                        //++
                                        if(value == CONST.BILLPANELSTATUS.ADD && disableInEditObj[tempComp.field] == "disableInAdd"){
                                          tempComp.setEnable(false);
                                        }
                                        //++
                                    }
                                }
                            })

                        });
                    }
                }

            },
            template: ui_card_tpl
        })

        // 注册详情组件 ui-detail
        var ui_detail_tpl =
            '<div class="ui-detail-content"></div>';

        function generateDetailItem(itemOption, dataTable, targetvm) {
          var $itemElement = $(
            '<div>' +
              '<div class="ui-item">' +
                '<div class="ui-name">'+itemOption.label+'：</div>' +
                '<div class="ui-inputarea"></div>' +
              '</div>' +
            '</div>'
          );
          var $itemInput = $itemElement.find('.ui-inputarea');
          switch(itemOption.type) {
            case "date":
              var dateBind = dataTable + ".ref('"+itemOption.key+"')()";
              $itemInput.append('<div data-bind="dateText: '+dateBind+'"></div>');
              break;
            case "datetime":
              var datetimeBind = dataTable + ".ref('"+itemOption.key+"')()";
              $itemInput.append('<div data-bind="datetimeText: '+datetimeBind+'"></div>');
              break;
            case "combo":
              var comboBind = {
                enum: itemOption.enumkey,
                text: dataTable + ".ref('"+itemOption.key+"')()",
              };
              // $itemInput[0].setAttribute('data-bind', 'comboText: '+JSON.stringify(comboBind).replaceAll("'", "\\'").replaceAll('"', "'"));
              $itemInput[0].setAttribute('data-bind', 'comboText: {enum: "'+itemOption.enumkey+'", text: '+dataTable+'.ref("'+itemOption.key+'")()}');
              break;
            case "boolean":
              var booleanMeta = {
                type: "u-checkbox",
                data: dataTable,
                field: itemOption.key,
                checkedValue: "1",
                unCheckedValue: "0",
                enable: false,
              }
              $itemInput.append(
                '<label class="u-checkbox margin-right-20" u-meta=\''+JSON.stringify(booleanMeta)+'\'>' +
                  '<input type="checkbox" class="u-checkbox-input">' +
                  '<span class="u-checkbox-label">&nbsp;</span>' +
                '</label>'
              );
              break;
            case "textarea":
              $itemElement.find('.ui-item').addClass('ui-textarea-item');
              $itemInput.append('<div data-bind="text: '+dataTable+'.ref(\''+itemOption.key+'\')()></div>');
              break;
            case "refer":
              targetvm[dataTable].setMeta(itemOption.key, 'refmodel', JSON.stringify(refinfo[itemOption.refinfo]));
              targetvm[dataTable].setMeta(itemOption.key, 'refcfg', '{"ctx":"/uitemplate_web"}');
              $itemElement.find('.ui-item').addClass('ui-item-refer-detail');
              $itemInput.append(
                '<div u-meta=\'{"type":"uiRefer","data":"'+dataTable+'","field":"'+itemOption.key+'"}\'>' +
                  '<input readonly="readonly"/>' +
                  '<span class="ui-icon uifont icon-bar refer"></span>' +
                '</div>'
              );
              break;
            case "docrefer":
              targetvm[dataTable].setMeta(itemOption.key, 'refmodel', JSON.stringify(refinfo['custdocdef']));
              var refcfg = {
                ctx: "/uitemplate_web",
                refName: itemOption.refname,
                refCode: itemOption.refcode,
              };
              targetvm[dataTable].setMeta(itemOption.key, 'refcfg', JSON.stringify(refcfg));
              $itemElement.find('.ui-item').addClass('ui-item-refer-detail');
              $itemInput.append(
                '<div u-meta=\'{"type":"uiRefer","data":"'+dataTable+'","field":"'+itemOption.key+'"}\'>' +
                  '<input />' +
                  '<span class="ui-icon uifont icon-bar refer"></span>' +
                '</div>'
              );
              break;
            case "image":
              var imageBind = dataTable + ".ref('"+itemOption.key+"')()";
              $itemInput.append('<div data-bind="imageRender: '+imageBind+'"></div>');
              break;
            default:
              if(itemOption.computed) {
                $itemInput.append('<div data-bind="text: ' + itemOption.computed + '"></div>');
              }
              else {
                $itemInput.append('<div data-bind="text: '+dataTable+'.ref(\''+itemOption.key+'\')()"></div>');
              }

          }
          return $itemElement.html();
        }

        function handleDetailTpl(params, dataTable, sourcevm, targetvm) {
            if (u.isArray(params)) {
                var filteredParams = [];  //过滤图片类型并将文本域类型置后
                var textareaOptions = [];
                filteredParams = params.filter(function(item) {
                  if(item.type === "textarea") {
                    textareaOptions.push(item);
                  }
                  return item.type !== "textarea";
                  // return item.type !== "image" && item.type !== "textarea";
                });
                filteredParams = filteredParams.concat(textareaOptions);
                return (filteredParams.map(function (item) {
                    var textEvent = "";
                    var itemHTML = "";
                    if (item.computed) {
                        textEvent = item.computed;
                        if (sourcevm && targetvm) {
                            targetvm[textEvent] = sourcevm[textEvent];
                        }
                    } else {

                        textEvent = dataTable + '.ref("' + item.key + '")';
                    }
                    return generateDetailItem(item, dataTable, targetvm);;
                }).join(" ") + '<div class="clearfix"></div>');
            } else {
                return "datasource未配置为数组";
            }
        }
        ko.components.register("ui-detail", {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var result = {};
                    var datasource = params.datasource;
                    var dataTable = params.dt.id;
                    var viewModel = params.vm || null;
                    var app = params.vm.app;
                    result[dataTable] = params.dt;
                    componentInfo.element.innerHTML = handleDetailTpl(datasource, dataTable, viewModel, result);
                    componentInfo.element.querySelectorAll('[u-meta]').forEach(function (ele) {
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
                    var optionArr = columns.map(function (item) {
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
                createViewModel: function (params, componentInfo) {
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
                    //保证comp唯一性，使用新comp替换同名旧comp
                    var compIsExist = false;
                    vm.app.comps.forEach(function(existComp, index, existComps) {
                      if(comp.id === existComp.id) {
                        console.log("发现存在comp:", existComp);
                        existComps[index] = comp;
                        compIsExist = true;
                      }
                    });
                    if(!compIsExist) {
                      console.log("新增comp:", comp)
                      vm.app.comps.push(comp);
                    }
                }
            },
            template: ui_grid_tpl
        })

        // 注册表单详情组件 ui-form-detail
        var ui_form_detail_tpl =
            '<div class="ui-form-detail-content"></div>';

        function handleFormDetailTpl(datasource, dataTable, sourcevm, targetvm) {
            if (u.isArray(datasource)) {
                return (datasource.map(function (item) {
                    var textEvent = "";
                    if (item.computed) {
                        textEvent = item.computed;
                        if (sourcevm && targetvm) {
                            targetvm[textEvent] = sourcevm[textEvent];
                        }
                    } else {
                        textEvent = dataTable + '.ref("' + item.key + '")';
                    }
                    item.cls = item.cls ? item.cls : "";
                    return '<div class="ui-item '+ item.cls +'">' +
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
        ko.components.register("ui-form-detail", {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var result = {};
                    var datasource = params.datasource;
                    var dataTable = params.dt.id;
                    var viewModel = params.vm || null;
                    result[dataTable] = params.dt;
                    componentInfo.element.innerHTML = handleFormDetailTpl(datasource, dataTable, viewModel, result);
                    return result;
                }
            },
            template: ui_form_detail_tpl
        })

        //注册图片列表组件 ui-imglist
        var ui_imglist_tpl =
            '<div class="ui-imglist-content"></div>';

        function handleImgListTpl(dataTable, key) {
          var dataBind = "imgitems: " + dataTable + ".ref('"+key+"')()";
          return '' +
          '<div class="ui-imglist" data-bind="'+dataBind+'"></div>'
        }
        ko.components.register("ui-imglist", {
            viewModel: {
                createViewModel: function (params, componentInfo) {
                    var result = {};
                    var dataTable = params.dt;
                    var key = params.key;
                    componentInfo.element.innerHTML = handleImgListTpl(dataTable, key);
                    return result;
                }
            },
            template: ui_imglist_tpl
        });
    }

    bindHander();
    registerComponents();
});
