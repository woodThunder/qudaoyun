define(['text!./trantype.html', 'ocm_common', 'ocm_baseview', './meta.js', 'billcard', 'css!./trantype.css'], function(tpl, common, baseview, model, billcard) {
    'use strict'
    var viewModel, app;
    var view = baseview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
            app = this.app;
        },
        tpl: tpl,
        model: model,
        baseData: {
            baseurl: "/base/trantypes",
            billtypeurl: "/base/billtypes",
            settingurl: "/base/trantype-sets",
            trantypeList: new u.DataTable(model.options.metas.trantypemeta),
            trantypeCard: new u.DataTable(model.options.metas.trantypemeta),
            billtypeList: new u.DataTable(model.options.metas.billtypemeta),
            trantypeExt: new u.DataTable(model.options.metas.trantypemeta.meta.trantypeExtends),
            trantypeExtDetail: new u.DataTable(model.options.metas.trantypemeta.meta.trantypeExtends),
            buttonSource: model.options.buttons.button1,
            gridOption: model.options.grids.grid1,
            treeSetting: {
                callback: {
                    onClick: treeClick
                },
                view: {
                    showLine: false,
                    multiSelect: true
                }
            }
        },
        rendertype: {
            operation4single: common.rendertype.operation4single,
            //启用状态
            enableRender: function(obj) {
                var stateValue = viewModel.trantypeList.getRow(obj.rowIndex).getValue("isEnable");
                var statusName;
                if (stateValue == "0") {
                    statusName = "未启用";
                }
                if (stateValue == "1") {
                    statusName = "已启用";
                }
                if (stateValue == "2") {
                    statusName = "已停用";
                }

                obj.element.innerHTML = statusName;
            }
        },
        events: {
            // 加载单据类型树
            loadleftTree: function() {
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.billtypeurl + "/getAll",
                    dataType: "json",
                    success: function(data) {
                        var tempObj = {};
                        var tempArr = [];
                        data.map(function(item) {
                            item.pid = item.moduleCode;
                            if (item.pid && !tempObj[item.pid]) {
                                tempObj[item.pid] = true;
                                tempArr.push({
                                    id: item.pid,
                                    code: item.pid,
                                    name: item.moduleName,
                                    pid: ""
                                })
                            }
                        })
                        var content = tempArr.concat(data);
                        viewModel.billtypeList.setSimpleData(content, {
                            unSelect: true
                        });
                        var treeObj = $.fn.zTree.getZTreeObj("billtype");
                        treeObj.expandAll(true);
                    }
                })

            },
            loadrightList: function() {
                // 若为父节点则清空右侧列表数据
                if (viewModel.checkIfparent(function() {
                        viewModel.trantypeList.setSimpleData([]);
                    })) {
                    return
                }

                var billTypeId = viewModel.billtypeList.getValue("id");
                var queryData = {
                    "search_EQ_billTypeId": billTypeId,
                    "size": viewModel.trantypeList.pageSize(),
                    "page": viewModel.trantypeList.pageIndex()
                }
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.trantypeList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.trantypeList.totalRow(data.totalElements);
                        viewModel.trantypeList.totalPages(data.totalPages);
                    }
                })
            },
            loadTemplate: function(node) {
                // 若为父节点则清空当前模板
                if (viewModel.checkIfparent(function() {
                        $("#detail").empty();
                        $("#billcard").empty();
                    })) {
                    return
                }

                // 获取聚焦行单据类型id，拼装搜索条件，查询对应的单据模板设置
                var billTypeId = viewModel.billtypeList.getValue("id");
                var queryData = {
                    "search_EQ_billTypeId": billTypeId
                }
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.settingurl,
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        // 将从数据库查出的数据转换成组件可识别的配置项
                        var options = viewModel.transSetting(data.content);

                        viewModel.trantypeExt = new u.DataTable(model.options.metas.trantypemeta.meta.trantypeExtends);
                        viewModel.trantypeExtDetail = new u.DataTable(model.options.metas.trantypemeta.meta.trantypeExtends);

                        // 初始化详情页，设置为不可编辑状态
                        viewModel.initCard($("#detail"), options, "trantypeExtDetail", true);
                        // 初始化编辑卡片页
                        viewModel.initCard($("#billcard"), options, "trantypeExt");
                    }
                })
            },
            // 初始化卡片设置
            initCard: function($element, options, dataTable, isDetail) {
                if (isDetail) {
                    options = options.map(function(item) {
                        return u.extend({}, item, {
                            enable: false
                        })
                    })
                }
                // 调用empty方法清空dom元素及相关事件，防止内存泄露
                $element.empty();
                // 取dom元素
                var element = $element[0];
                // 调用单据卡片模块初始化模板
                billcard(element, options, viewModel[dataTable], dataTable, viewModel);
                // 对模板中的组件进行初始化
                element.querySelectorAll('[u-meta]').forEach(function(ele) {
                    var options = JSON.parse(ele.getAttribute('u-meta'));
                    options['type'] = options['type'] || 'string';
                    if (options && options['type']) {
                        if (app.adjustFunc) app.adjustFunc.call(app, options);
                        var comp = u.compMgr.createDataAdapter({
                            el: ele,
                            options: options,
                            model: viewModel,
                            app: app
                        });
                        ele['u-meta'] = comp;
                    }
                });
            },
            // 设置转化方法
            transSetting: function(data) {
                if (data && data.length > 0) {
                    // 组装全局的字段配置，保存时从该字段进行过滤
                    viewModel.extfieldObj = {};
                    var cusDocCodes = "";
                    var newSetting = data.map(function(item) {
                        var base = {};
                        viewModel.extfieldObj[item.fieldName] = true;
                        if (item.fieldType == "Boolean") {
                            base.type = "radio";
                            base.dataSource = [{
                                value: '1',
                                name: '是'
                            }, {
                                value: '0',
                                name: '否'
                            }]
                        } else if (item.fieldType == "Enum") {
                            cusDocCodes += ("," + item.cusDocCode);
                            base.type = "combo";
                            base.dataSource = item.cusDocCode + "dataSource";
                            base.onlySelect = true;
                            // 此处创建下拉来源数组，保证下拉框组件在初始化过程中该对象存在
                            viewModel[base.dataSource] = ko.observableArray([]);
                        } else {
                            base.type = "text";
                        }
                        return u.extend(base, {
                            label: item.showName,
                            key: item.fieldName
                        })
                    })
                    if (cusDocCodes.length > 0) {
                        // 组装需要的自定义档案枚举类型
                        // 去掉开头的“，”
                        cusDocCodes = cusDocCodes.slice(1);
                        $._ajax({
                            type: "get",
                            url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                            data: {
                                cust_doc_code_batch: cusDocCodes
                            },
                            success: function(data) {
                                var cusDocCodeArr = cusDocCodes.split(",");
                                if (cusDocCodeArr && cusDocCodeArr.length > 0) {
                                    cusDocCodeArr.map(function(item) {
                                        var combodata = common.dataconvert.toMap(data[item], "name", "code");
                                        viewModel[item + "dataSource"](combodata);
                                    })
                                }
                            }
                        });
                    }
                    return newSetting;
                } else {
                    return [];
                }
            },
            // 转化设置数组为设置对象
            transArr2obj: function(list) {
                var result = {};
                for (var i = 0; i < list.length; i++) {
                    result[list[i].fieldName] = list[i].fieldValue;
                }
                return result
            },
            checkIfparent: function(callback) {
                // 从当前聚焦行上获取pid,如果pid为空，则为父节点
                var pid = viewModel.billtypeList.getValue("pid");
                if (!pid) {
                    if (typeof callback == "function") {
                        callback();
                    }
                    return true
                } else {
                    return false;
                }
            },

            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            beforeEdit: function(index, rowId) {
                // 若为父节点则不能新增
                if (viewModel.checkIfparent(function() {
                        toastr.warning("模块类型下不能新增交易类型");
                    })) {
                    return
                }
                var title;
                viewModel.index = index;
                viewModel.trantypeCard.removeAllRows();
                var row = viewModel.trantypeCard.createEmptyRow();
                //清空交易类型设置的数据
                viewModel.trantypeExt.removeAllRows();
                var childrow = viewModel.trantypeExt.createEmptyRow();
                if (u.isNumber(index)) {
                    //修改操作
                    title = "编辑";
                    var currentData = viewModel.trantypeList.getRowByRowId(rowId).getSimpleData();
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.baseurl + "/findByParentid",
                        data: {
                            "id": currentData.id
                        },
                        success: function(data) {
                            viewModel.extendsData = viewModel.transArr2obj(data.trantypeExtends);
                            childrow.setSimpleData(viewModel.extendsData);
                            row.setSimpleData(data);
                            viewModel.rowId = rowId;
                            if (!viewModel.transtypedialog) {
                                viewModel.transtypedialog = u.dialog({
                                    id: 'dialog_transtype',
                                    content: "#dialog_transtype",
                                    hasCloseMenu: true,
                                    width: "900px"
                                });
                                var okButton = $("#dialog_transtype .J-ok");
                                okButton.off().on('click', function() {
                                    viewModel.edit();
                                });
                                var cancelButton = $("#dialog_transtype .J-cancel");
                                cancelButton.off().on('click', function() {
                                    viewModel.transtypedialog.close();
                                });
                            } else {
                                viewModel.transtypedialog.show();
                            }
                        }
                    });

                } else {
                    title = "新增";
                    if (!viewModel.transtypedialog) {
                        viewModel.transtypedialog = u.dialog({
                            id: 'dialog_transtype',
                            content: "#dialog_transtype",
                            hasCloseMenu: true,
                            width: "900px"
                        });
                        var okButton = $("#dialog_transtype .J-ok");
                        okButton.off().on('click', function() {
                            viewModel.edit();
                        });
                        var cancelButton = $("#dialog_transtype .J-cancel");
                        cancelButton.off().on('click', function() {
                            viewModel.transtypedialog.close();
                        });
                    } else {
                        viewModel.transtypedialog.show();
                    }
                }

            },
            //将操作后的数据进行保存
            edit: function() {
                var index = viewModel.index;
                var currentRow, type = "post";
                var postdata = viewModel.trantypeCard.getSimpleData()[0];

                var billTypeId = viewModel.billtypeList.getValue("id");
                postdata.billTypeId = billTypeId;

                var childObj = viewModel.trantypeExt.getSimpleData()[0];
                // 判断该行数据是否有扩展子表,默认为否
                var ifexistExt = false;
                if (u.isNumber(index)) {
                    type = "put";
                    // 行上获取的扩展子表存在且长度大于0
                    if (childObj) {
                        ifexistExt = true;
                    }
                }

                if (ifexistExt) {
                    // 如果该行存在扩展子表,则修改原子表状态为upd以更新原有子表

                    var trantypeExtends = postdata.trantypeExtends;
                    for (var i = 0; i < trantypeExtends.length; i++) {
                        trantypeExtends[i].persistStatus = "upd";
                        trantypeExtends[i].fieldValue = childObj[trantypeExtends[i].fieldName] === null ? 0 : childObj[trantypeExtends[i].fieldName];
                    }
                    postdata.trantypeExtends = trantypeExtends;
                } else {
                    // 如果该行没有扩展子表,构造状态为new的子表以保存
                    // 从全局变量上获取本单据类型的设置字段，过滤多余项
                    if (viewModel.extfieldObj) {
                        var childData = [];
                        if (childObj) {
                            for (var key in childObj) {
                                if (viewModel.extfieldObj[key]) {
                                    childData.push({
                                        fieldName: key,
                                        fieldValue: childObj[key],
                                        persistStatus: "new"
                                    })
                                }
                            }
                        }
                        if (childData.length > 0) {
                            postdata.trantypeExtends = childData
                        }
                    }
                }
                //更改后台数据
                $._ajax({
                    url: appCtx + viewModel.baseurl,
                    type: type,
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        //如果index大于等于0说明是修改
                        viewModel.transtypedialog.close();
                        if (index >= 0) {
                            //获取需要修改的行
                            currentRow = viewModel.trantypeList.getRowByRowId(viewModel.rowId);
                            //将用户填写的数据更新到trantypeList上
                        } else {
                            //添加数据
                            currentRow = viewModel.trantypeList.createEmptyRow();
                        }
                        viewModel.trantypeExtDetail.setSimpleData(viewModel.transArr2obj(data.trantypeExtends));
                        currentRow.setSimpleData(data);
                    }
                })
            },
            //删除和批量删除
            del: function(data, rowId) {
                if (typeof(data) == 'number') {
                    viewModel.trantypeList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.trantypeList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                    }
                    common.dialog.confirmDialog({
                        msg1: '确认删除这些项？',
                        msg2: '此操作不可逆',
                        width: '400px',
                        type: 'error',
                        onOk: function() {
                            $._ajax({
                                url: appCtx + viewModel.baseurl + "/delete",
                                type: "post",
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function(data) {
                                    viewModel.trantypeList.removeRows(rows);
                                    viewModel.loadrightList();
                                }
                            });
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function(reindex) {
                if (reindex) {
                    viewModel.trantypeList.pageIndex(0);
                }
                viewModel.trantypeList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                queryData.size = viewModel.trantypeList.pageSize();
                queryData.page = viewModel.trantypeList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.trantypeList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.trantypeList.totalRow(data.totalElements);
                        viewModel.trantypeList.totalPages(data.totalPages);
                    }
                })
            },
            //清空搜索条件
            cleanSearch: function() {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function(index) {
                viewModel.trantypeList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function(size) {
                viewModel.trantypeList.pageSize(size);
                viewModel.search(true);
            },
            //启用
            enable: function() {
                var selectedRows = viewModel.trantypeList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-enable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                viewModel.statusField ?
                                    selectedRows[i].setValue(viewModel.statusField, "1") :
                                    selectedRows[i].setValue("isEnable", "1");
                            }
                        }
                    })
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //停用
            disable: function() {
                var selectedRows = viewModel.trantypeList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    })
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-disable",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                viewModel.statusField ?
                                    selectedRows[i].setValue(viewModel.statusField, "2") :
                                    selectedRows[i].setValue("isEnable", "2");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            detail: function(obj) {
                var rowId = obj.rowObj.value["$_#_@_id"];
                var curRow = viewModel.trantypeList.getRowByRowId(rowId);
                var currentData = curRow.getSimpleData();
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.baseurl + "/findByParentid",
                    data: {
                        "id": currentData.id
                    },
                    success: function(data) {
                        // viewModel.extendsData = viewModel.transArr2obj(data.trantypeExtends);
                        var childData = data.trantypeExtends;
                        viewModel.trantypeExtDetail.removeAllRows();
                        var childrow = viewModel.trantypeExtDetail.createEmptyRow();
                        childrow.setSimpleData(viewModel.transArr2obj(childData));
                        viewModel.trantypeList.setAllRowsUnSelect();
                        viewModel.trantypeList.setRowSelectbyRowId(rowId);
                    }
                });
                return true;
            },
            //导入
            importHandle: function() {
                var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                var ele = $('#importFiel')[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function() {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                var listData = viewModel.trantypeList; //需要导出表格的dataTable
                var ele = $('#exportFiel')[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
        },
        afterCreate: function() {
            viewModel.loadleftTree();
            parent.vm = viewModel;
        }
    });

    function treeClick(event, treeId, treeNode) {
        viewModel.loadrightList();
        viewModel.loadTemplate();
    }

    return view;
});