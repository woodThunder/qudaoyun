define(["fmcg_core", "fmcg_base"], function (core) {
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
        // 处理行业模型
        modelHandle(this.model,viewModel);
        // 渲染content
        this.setTemplate(this.el, this.tpl);
        // 执行创建App前事件
        this.beforeCreate.apply(this, arguments);
        // 初始化iuap组件和ko组件
        var app = u.createApp({
            el: this.el,
            model: viewModel
        });
        // grid组件需要传入app，因此这里做全局处理将app添加到viewModel上
        viewModel.app = u.extend(this.app, app);
        // 试触三次后，判断是否拿到搜索或卡片编辑的实例作为渲染完成的标志，之后执行创建app后事件
        // timeHandle(isRenderOver.bind(this, viewModel), 3, 10, afterCreate.bind(this, this.model, viewModel))
        setTimeout(afterCreate.bind(this,this.model,viewModel),1);
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

    function modelHandle(model, viewModel) {
        // 处理行业新增ko事件
        if (model.events) {
            var events = model.events;
            for (var key in events) {
                if (typeof events[key] == 'function') {
                    events[key] = events[key].bind(viewModel);
                }
            }
            _.extend(viewModel, events)
        };
        // 为viewModel添加标题属性
        if (model.title) _.extend(viewModel, {
            title: model.title
        });
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
    return baseview;
});