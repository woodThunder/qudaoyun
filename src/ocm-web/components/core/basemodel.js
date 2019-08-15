define(["ocm_base"], function () {
    'use strict';

    var basemodel = function (options) {
        this.options = _.extend({}, options);
        this.initialize.apply(this, arguments);
        if (window.modelExtendSwitch) {
            if(window.domainCtx) {
              this.handleDomain.apply(this, arguments);
            }
            if (window.projectCtx) {
              this.handleProject.apply(this, arguments);
            }
        }
        if (window.customSwitch) {
            this.handleCustom.apply(this, arguments);
        }
        if (window.authSwitch) {
            this.handleAuth.apply(this, arguments);
        }
    }
    _.extend(basemodel.prototype, {
        options: {},
        baseData: {},
        events: {},
        specialMap: {
            "metas": inheritMetaOpt,
            "grids": inheritGridOpt,
        },
        afterCreate: [],
        initialize: function () {
            var hash = window.location.hash;
            hash = hash.split('?')[0];
            this.appCode = hash.slice(2);
            var currentmenu = {};
            try {
                currentmenu = parent.window.getCurrentMenu(this.appCode);
            }catch (e) {
                currentmenu['location'] = window.allPath[this.appCode];
            }
            // if(parent.window.getCurrentMenu) {
            //     currentmenu = parent.window.getCurrentMenu(this.appCode);
            // } else {
            //     currentmenu['location'] = window.allPath[this.appCode];
            // }
            if (currentmenu) {
                var lastIndex = currentmenu.location.lastIndexOf("/");
                if(window.domainCtx) {
                  this.domainUrl = currentmenu.location.slice(0, lastIndex + 1) + domainCtx + "/config.js";
                }
                if(window.projectCtx) {
                  this.projectUrl = currentmenu.location.slice(0, lastIndex + 1) + projectCtx + "/config.js";
                }
                
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
            _.extend(this.events, {getEvents: events});
        },
        handleBaseData: function(baseData) {
          _.extend(this.baseData, baseData);
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

    function handleCustom() {
        var id = this.appCode;
        var options = this.options;
        handleCustomTpl(id, options);
    }

    function handleCustomTpl(id, options) {
        function changeOption(type, data) {
            var metaObj = {
                searchs: {
                    visibleField: "isVisible",
                    sortField: "displayOrder",
                    nameField: "conditionName",
                    valueField: "conditionCode",
                    nameKey: "label",
                    valueKey: "key",
                    defaultKey: "search1",
                    sourceKey: ""
                },
                dialogs: {
                    visibleField: "isVisible",
                    sortField: "displayOrder",
                    nameField: "fieldName",
                    valueField: "fieldCode",
                    nameKey: "label",
                    valueKey: "key",
                    defaultKey: "dialog1",
                    sourceKey: ""
                },
                grids: {
                    visibleField: "isVisible",
                    sortField: "displayOrder",
                    nameField: "fieldName",
                    valueField: "fieldCode",
                    nameKey: "title",
                    valueKey: "field",
                    defaultKey: "grid1",
                    sourceKey: "columns"
                }
            }
            var meta = metaObj[type];
            // 将后台查询出的模板依据展示字段排序
            var tpl = _.sortBy(data, meta.sortField);
            // 获取原有模板
            var origin = options[type];
            if (origin) {
                var defaultKey;
                if (u.isArray(origin[meta.defaultKey])||u.isArray(origin[meta.defaultKey][meta.sourceKey])) {
                    defaultKey = meta.defaultKey;
                } else {
                    for (var key in origin) {
                        if (u.isArray(origin[key])||u.isArray(origin[key][meta.sourceKey])) {
                            defaultKey = key;
                            break;
                        }
                    }
                }
                if (defaultKey && origin[defaultKey]) {
                    if ((meta.sourceKey && origin[defaultKey][meta.sourceKey].length > 0) || origin[defaultKey].length > 0) {
                        var tempObj = {};
                        var tempArr = [];
                        // 判断是否含有一层source(如grid和meta)，遍历不同的source来源
                        if (meta.sourceKey) {
                            origin[defaultKey][meta.sourceKey].forEach(function (item) {
                                tempObj[item[meta.valueKey]] = item;
                            })
                        } else {
                            origin[defaultKey].forEach(function (item) {
                                tempObj[item[meta.valueKey]] = item;
                            })
                        }

                        if (tpl.length > 0) {
                            for (var i = 0; i < tpl.length; i++) {
                                if (tpl[i][meta.visibleField] == "1" && tempObj[tpl[i][meta.valueField]]) {
                                    // 拷贝一个原有的对象
                                    var tempitem = u.extend({}, tempObj[tpl[i][meta.valueField]]);
                                    // 改变原有对象的显示名称
                                    tempitem[meta.nameKey] = tpl[i][meta.nameField];
                                    tempArr.push(tempitem);
                                }
                            }
                        }

                        if (meta.sourceKey) {
                            origin[defaultKey][meta.sourceKey] = tempArr;
                        } else {
                            origin[defaultKey] = tempArr;
                        }
                    }

                }

            }
        }
        // 旧的模板，不再使用，表结构已删除
        // $.ajax({
        //     type: 'get',
        //     async: false,
        //     url: window.pathMap.cmpt + "/cmpt/display-tmpls/get-default-tmpl-by-menu",
        //     data: {
        //         menuCode: id
        //     },
        //     dataType: "json",
        //     success: function (data) {
        //         // 处理搜索模板
        //         if (data.searchTmpl && data.searchTmpl.items && data.searchTmpl.items.length > 0) {
        //             changeOption("searchs", data.searchTmpl.items);
        //         }
        //         // 处理列表模板
        //         if (data.listDisplayTmpl && data.listDisplayTmpl.items && data.listDisplayTmpl.items.length > 0) {
        //             changeOption("grids", data.listDisplayTmpl.items);
        //         }
        //         // 处理卡片模板
        //         if (data.cardDisplayTmpl && data.cardDisplayTmpl.items && data.cardDisplayTmpl.items.length > 0) {
        //             changeOption("dialogs", data.cardDisplayTmpl.items);
        //         }
        //     }
        // });
    }


    function handleAuth() {
        var id = this.appCode;
        var options = this.options;
        //暂时只处理按钮权限
        handleButtonAuth(id, options);
        // TODO:添加字段权限处理
    }

    function handleButtonAuth(id, options) {
        $.ajax({
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
                if (typeof (getNewConfig) == "function") {
                  var SubOpt = getNewConfig();
                  inheritNewOpt(baseOpt, SubOpt);
                  getNewConfig = null;
                }
                if (typeof (getBaseData) == "function") {
                  var baseData = getBaseData({options: baseOpt});
                  self.handleBaseData(baseData);
                  getBaseData = null;
                }
                if (typeof (getEvents) == "function") {
                    self.handleEvents(getEvents);
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

    function inheritNewOpt(baseOpt, subOpt) {
      for (var key in subOpt) {
          if(baseOpt[key]) {
            $.extend(true, baseOpt[key], subOpt[key])
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
                if (parentObj[parent[j][key]] == delopr) {
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