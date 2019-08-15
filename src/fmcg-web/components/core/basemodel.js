define(["fmcg_base"], function () {
    'use strict';

    var basemodel = function (options) {
        this.options = _.extend({}, options);
        this.initialize.apply(this, arguments);
        this.handleDomain.apply(this, arguments);
        this.handleProject.apply(this, arguments);
        this.handleCustom.apply(this, arguments);
        this.handleAuth.apply(this, arguments);
    }
    _.extend(basemodel.prototype, {
        options: {},
        events: {},
        specialMap: {
            "metas": inheritMetaOpt,
            "grids": inheritGridOpt,
        },
        afterCreate: [],
        initialize: function () {
            var hash = window.location.hash;
            this.appCode = hash.slice(2);
            var currentmenu = parent.window.getCurrentMenu(this.appCode);
            if (currentmenu && currentmenu.location) {
                var lastIndex = currentmenu.location.lastIndexOf("/");
                this.domainUrl = currentmenu.location.slice(0, lastIndex + 1) + domainCtx + "/config.js";
                this.projectUrl = currentmenu.location.slice(0, lastIndex + 1) + projectCtx + "/config.js";
                if (currentmenu.name) {
                    this.title = currentmenu.name;
                }
            }
        },
        // 处理领域定制化
        handleDomain: handleDomain,
        // 处理项目定制化
        handleProject: handleProject,
        // 处理后台个性化
        handleCustom: handleCustom,
        // 处理权限
        handleAuth: handleAuth,
        // 处理重载事件
        handleEvents: function (events) {
            _.extend(this.events, events);
        }
    });

    function handleDomain() {
        if (this.domainUrl) {
            handleGeneral.call(this, this.domainUrl);
        }
    }

    function handleProject() {
        if (this.projectUrl) {
            handleGeneral.call(this, this.projectUrl);
        }
    }

    function handleCustom() {}

    function handleAuth() {
        var id = this.appCode;
        var options = this.options;
        //暂时只处理按钮权限
        handleButtonAuth(id, options);
        // TODO:添加字段权限处理
    }

    function handleButtonAuth(id, options) {
        $._ajax({
            type: 'get',
            async: false,
            url: "/wbalone/security/auth?funcCode=" + id,
            success: function (data) {
                if (data && u.isArray(data)) {
                    var buttons = options.buttons;
                    var AuthedButtons = data;
                    if (buttons) {
                        for (var key in buttons) {
                            if (u.isArray(buttons[key])) {
                                for (var i = buttons[key].length - 1; i >= 0; i--) {
                                    if (($.inArray(buttons[key][i].key, AuthedButtons) == -1 && buttons[key][i].auth)) {
                                        buttons[key].splice(i, 1);
                                        continue;
                                    }
                                    // 处理子按钮权限
                                    if (u.isArray(buttons[key][i].children) && buttons[key][i].children.length > 0) {
                                        var tempArr = buttons[key][i].children;
                                        for (var j = tempArr.length - 1; j >= 0; j--) {
                                            if (($.inArray(tempArr[j].key, AuthedButtons) == -1 && tempArr[j].auth)) {
                                                tempArr.splice(j, 1);
                                            }
                                        }
                                        // 当所有子按钮都不可见时，隐藏父按钮
                                        if (tempArr.length == 0 && buttons[key][i].auth) {
                                            buttons[key].splice(i, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    function handleGeneral(url, callback) {
        var baseOpt = this.options;
        var self = this;
        try {
            $.ajax({
                type: "get",
                dataType: "script",
                url: url,
                async: false,
            }).done(function (script, textStatus) {
                if (typeof (getConfig) == "function") {
                    var SubOpt = getConfig();
                    inheritOpt(baseOpt, SubOpt, self.specialMap);
                    getConfig = null;
                }
                if (typeof (getEvents) == "function") {
                    self.handleEvents(getEvents());
                    getEvents = null;
                }
                if (typeof (afterCreate) == "function") {
                    self.afterCreate.push(afterCreate());
                    afterCreate = null;
                }
                if (typeof (callback) == "function") {
                    callback();
                }
            }).fail(function (jqxhr, settings, exception) {
                console.log(exception);
            })
        } catch (e) {
            console.log(e);
        }
    }

    function isFunction(val) {
        return Object.prototype.toString.call(val) === '[object Function]';
    }

    function inheritOpt(baseOpt, subOpt, specialMap) {
        for (var key in subOpt) {
            for (var keys in baseOpt) {
                if (baseOpt[keys][key]) {
                    if (isFunction(specialMap[keys])) {
                        var handler = specialMap[keys];
                        handler(baseOpt[keys][key], subOpt[key]);
                    } else {
                        if (u.isArray(subOpt[key]) && u.isArray(baseOpt[keys][key])) {
                            var parent = baseOpt[keys][key];
                            var child = subOpt[key];
                            arrayCompare(parent, child, "key", "del", "sort");
                        }
                    }
                    break;
                }
            }
        }
    }

    function arrayCompare(parent, child, key, delopr, sortopr) {
        var parentObj = {};
        var needSort = [];
        for (var i = 0; i < parent.length; i++) {
            parentObj[parent[i][key]] = i;
        }
        for (var i = 0; i < child.length; i++) {
            var parentIndex = parentObj[child[i][key]];
            if (u.isNumber(parentIndex)) {
                if (child[i].status && child[i].status == delopr) {
                    parentObj[child[i][key]] = delopr;
                } else {
                    u.extend(parent[parentIndex], child[i])
                    if (u.isNumber(child[i][sortopr])) {
                        parentObj[child[i][key]] = 'fdel';
                    }
                }
            } else {
                if (u.isNumber(child[i][sortopr])) {
                    needSort.push(child[i]);
                } else {
                    parent.push(child[i]);
                }
            }
        }
        for (var j = parent.length - 1; j >= 0; j--) {
            if (parentObj[parent[j][key]]) {
                if (parentObj[parent[j][key]] == delopr){
                    parent.splice(j, 1);
                    continue;
                }
                if (parentObj[parent[j][key]] == 'fdel') {
                    needSort.push(parent[j]);
                    parent.splice(j, 1);
                    continue;
                }
            }
        }

        if (needSort.length > 0) {
            var sorted = _.sortBy(needSort, sortopr);
            for (var k = 0; k < sorted.length; k++) {
                var maxIndex = parent.length;
                var currentSort = sorted[k][sortopr];
                if (currentSort < maxIndex) {
                    parent.splice(currentSort, 0, sorted[k]);
                } else {
                    parent.push(sorted[k])
                }
                delete sorted[k][sortopr];
            }
        }
    }

    function inheritMetaOpt(basemeta, submeta) {
        $.extend(true, basemeta, submeta)
        var tempMeta = basemeta.meta;
        for (var key in tempMeta) {
            if (tempMeta[key].status == "del") {
                delete tempMeta[key];
            }
        }
    }

    function inheritGridOpt(basegrid, subgrid) {
        var tempColumns;
        if (subgrid.columns) {
            tempColumns = subgrid.columns;
            delete subgrid.columns;
        }
        $.extend(true, basegrid, subgrid)
        if (u.isArray(tempColumns) && u.isArray(basegrid.columns)) {
            arrayCompare(basegrid.columns, tempColumns, "field", "del", "sort");
        }
    }
    return basemodel;
});