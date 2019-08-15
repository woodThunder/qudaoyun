define(["ocm_core", "ocm_templateBridge", "ocm_common", "ocm_base"], function (core, templateBridge, Common) {
    'use strict';

    var baseview = function (options) {
        // 参数初始化
        this.el = options.el;
        this.globalParams = options.params;
        this.app = {};
        //viewModel初始化
        var viewModel = _.extend(
            this.viewModel,
            this.baseData,
            this.rendertype,
            this.events, {
                title: this.title
            }
        );
        // 处理单据模板
        ;(templateBridge && setTimeout(templateBridge.call({viewModel: viewModel}, this), 0));
        
        // 渲染content
        templateHandle.bind(this)(this.el, this.tpl);
        // this.setTemplate(this.el, this.tpl);
        // 执行创建App前事件
        this.beforeCreate.apply(this, arguments);
        // 处理行业模型
        modelBeforeHandle(this.model, viewModel);
        modelHandle(this.model, viewModel);

        // 初始化iuap组件和ko组件
        var app = u.createApp({
            el: this.el,
            model: viewModel
        });
        // grid组件需要传入app，因此这里做全局处理将app添加到viewModel上
        viewModel.app = u.extend(this.app, app);
        // 试触三次后，判断是否拿到搜索或卡片编辑的实例作为渲染完成的标志，之后执行创建app后事件
        // timeHandle(isRenderOver.bind(this, viewModel), 3, 10, afterCreate.bind(this, this.model, viewModel))
        // 暂时以简单方式处理
        setTimeout(initListTemplate.bind(this, viewModel), 1);
    }
    _.extend(baseview.prototype, {
        setTemplate: function (el, tpl) {
            el.innerHTML = tpl;
        },
        beforeCreate: function () {},
        afterCreate: function () {},
        title: "未配置",
        tpl: "请配置tpl属性",
        baseData: {},
        rendertype: {},
        events: {},
        viewModel: {},
        model: {}
    });
    baseview.extend = core.extend;
    function modelBeforeHandle(model, viewModel) {
      if(model.baseData) {
        _.extend(viewModel, model.baseData || {});
      }
      if (model.events && model.events.getEvents) {
        _.extend(model.events, model.events.getEvents(viewModel));
      }
    }
    function modelHandle(model, viewModel) {
        // 处理行业新增ko事件
        if (model.events) {
            var events = model.events;
            for (var key in events) {
                if (typeof events[key] == 'function') {
                    // 支持对事件增加前后规则方法
                    (function(key) {
                        var baseFunName = key;
                        if(key.endsWith('_before')) {
                            baseFunName =  key.replace('_before', '');
                            var oldFun = viewModel[baseFunName];
                            viewModel[baseFunName] = function() {
                                    var newArgs = [];
                                    if (arguments) {
                                      for (var i = 0; i < arguments.length; i++) {
                                        newArgs.push(arguments[i]);
                                      }
                                    }
                                    events[key].apply(this, newArgs);
                                    oldFun.apply(this, newArgs);
                                }
                        } else
                        if(key.endsWith('_after')) {
                            baseFunName = key.replace('_after', '');
                            var oldFun = viewModel[baseFunName];
                            viewModel[baseFunName] = function() {
                                    var newArgs = [];
                                    if (arguments) {
                                      for (var i = 0; i < arguments.length; i++) {
                                        newArgs.push(arguments[i]);
                                      }
                                    }
                                    oldFun.apply(this, newArgs);
                                    events[key].apply(this, newArgs);
                                }
                        } else {
                            events[baseFunName] = events[baseFunName].bind(viewModel);
                        }
                    })(key);
                }
            }
            _.extend(viewModel, events)
        };
        // 为viewModel添加标题属性
        if (model.title) _.extend(viewModel, {
            title: model.title
        });
    }

    function templateHandle(el, tpl) {
        // 增加判断是否开启行业扩展
        if(window.modelExtendSwitch){
            var hash = window.location.hash;
            this.appCode = hash.slice(2);
            var currentmenu = {};
            try {
                currentmenu = parent.window.getCurrentMenu(this.appCode);
            }catch (e) {
                currentmenu['location'] = window.allPath[this.appCode];
            }
            if (currentmenu && currentmenu.location) {
                var lastIndex = currentmenu.location.lastIndexOf("/");
                var tpl_plugin = currentmenu.location.slice(0, lastIndex + 1) + projectCtx + "/tpl.html";
                var tpl_append = currentmenu.location.slice(0, lastIndex + 1) + projectCtx + "/tpl_append.html";
                if(tpl_plugin){
                    $.ajax({
                        type: "get",
                        dataType: "html",
                        url: tpl_plugin,
                        async: false,
                    }).done(function(res) {
                        if (typeof res == "string") {
                            // 扩展中拼接模板的场景很少，多是对现有的模板进行调整
                            tpl = res;
                        }
                    });
                }
                if( tpl_append){
                    $.ajax({
                        type: "get",
                        dataType: "html",
                        url: tpl_append,
                        async: false,
                    }).done(function(res) {
                        if (typeof res == "string") {
                            tpl += res;
                        }
                    });
                }
            }
        }
        this.setTemplate(el, tpl);
    }

    // 定时器处理，condition为正常循环停止条件，time为condition最大执行次数，ratio为延时执行比例（指数算法），callback为达成条件后的回调
    function timeHandle(condition, time, ratio, callback) {
        var t = 1,
            delaytime = 1;

        function handle() {
            if (t > time || condition()) {
                callback()
            } else {
                setTimeout(handle, delaytime);
                delaytime = delaytime * ratio;
                t++;
            }
        }
        handle();
    }

    function isRenderOver(viewModel) {
        if (viewModel.ensureRefKeys) {
            if (u.isArray(viewModel.ensureRefKeys)) {
                var result = true;
                for (var i = 0; i <= viewModel.ensureRefKeys.length; i++) {
                    var key = viewModel.ensureRefKeys[i];
                    if (!(viewModel[key] && viewModel[key].viewModel)) {
                        result = false;
                    }
                }
                return result
            } else {
                if (viewModel[viewModel.ensureRefKeys] && viewModel[viewModel.ensureRefKeys].viewModel) {
                    return true
                }
            }
            return false
        } else {
            return true
        }
    }

    function afterCreate(model, viewModel) {
        this.afterCreate();
        if (u.isArray(model.afterCreate)) {
            model.afterCreate.map(function (func) {
                func(viewModel);
            })
        }
    }

    function initListTemplate(viewModel) {
        var _afterCreate = afterCreate.bind(this, this.model, viewModel);
        var _listTemplate = viewModel.listTemplate;
        var menuCode = location.hash.split('/')[1].split("?")[0];
        if(viewModel.listTemplate && !Common.bill.openedPage[menuCode+"list"]) {
            Common.bill.openedPage[menuCode+"list"] = true;
            viewModel.listTemplate.getPage({
                viewModel: viewModel,
                matchParam: {
                    busiObjCode: menuCode,
                    tmplTypeId: "pc-list",
                    tranTypeId: window.__occ_app_param__ && window.__occ_app_param__.tranType,
                    // tranTypeId: 交易类型
                },
                billStatus: viewModel.billPanelStatus && viewModel.billPanelStatus(),
                success: function (pageEle) {
                    $('.ui-list-panel .ui-table-container').append(pageEle);
                    // _search();
                    _afterCreate();
                    viewModel.search(_listTemplate.updateExtendData.bind(this));
                    // setTimeout(_listTemplate.updateExtendData.bind(this), 10);
                }
            });
        } else {
            _afterCreate();
            viewModel.search();
        }
    }
    return baseview;
});