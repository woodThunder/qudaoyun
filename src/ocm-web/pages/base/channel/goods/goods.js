define([
    'text!./goods.html',
    'ocm_common',
    'ocm_baseview',
    './meta.js',
    'searchbox',
    'billcard',
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl",
    "ocm_kindeditor",
    "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function (
    tpl,
    common, baseview, model, searchbox, billcard) {
        'use strict'
        var viewModel, app, editor, detailEditor;;
        var view = baseview.extend({
            beforeCreate: function () {
                viewModel = this.viewModel;
                app = this.app;
            },
            tpl: tpl,
            //    rendertype: common.rendertype,
            setTemplate: function (el, tpl) {
                el.innerHTML = tpl;
                viewModel = this.viewModel;
            },
            model: model,
            baseData: {
                baseurl: '/base/goods',
                channelGoodsUrl: '/base/channel/goods',
                attrStrucUrl: '/base/prod-attr-strucs/get-prod-attr-struc-items',
                attrUrl: '/base/product-attrs',
                productUrl: '/base/products',
                goodsCategorytUrl: '/goods-categorys',
                goodsRelCustomerUrl: '/base/goods-rel-customers',
                goodsattrvalsurl: "/base/goods-attr-vals",
                goodsbomurl: "/base/goods-boms",
                statusField: 'isEnable',
                // excelurl:'/person-excel',
                dialogWidth: '900px',
                baseColorClass: [
                    "color0",
                    "color1",
                    "color2",
                    "color3",
                    "color4",
                    "color5",
                    "color6",
                    "color7",
                    "color8",
                    "color9"
                ],
                simpleList: new u.DataTable(model.options.metas.Goodsmeta),
                goodsAttrExt: new u.DataTable(),
                goodsAttrExtDetail: new u.DataTable(),
                // simpleList: new u.DataTable(model.options.metas.Goodsmeta),
                // attachList: new u.DataTable({ meta: { f1: {} } }),
                button1Source: model.options.buttons.button1,
                button2Source: model.options.buttons.button2,
                button3Source: model.options.buttons.button3,
                button4Source: model.options.buttons.button4,
                searchcomp: {},
                searchSource: model.options.searchs.search1,
                search2Source: model.options.searchs.search2,
                dialogcardcomp: {},
                dialogcardSource: model.options.dialogs.dialog1,
                dialogcardcomp2: {},
                dialogcardSource2: model.options.dialogs.dialog2,
                // detailSource: model.options.details.detail,
                gridOption: model.options.grids.grid1,
                goBillPanel: common.bill.goBillPanel,
                card1Source: model.options.cards.card1,
                card2Source: model.options.cards.card2,
                card3Source: model.options.cards.card3,
                card4Source: model.options.cards.card4,
                detail1Source: model.options.details.detail1,
                detail2Source: model.options.details.detail2,
                detail3Source: model.options.details.detail3,
                detail4Source: model.options.details.detail4,
                detail5Source: model.options.details.detail5,

                goodsLifecycleDatasource: ko.observableArray([]),
                checkboxData: [],
                picArr: [],
                attachList: [],
                attrList: [],
                isEnableBatchNumberManage: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("enableBatchNumberManage")();
                    return status == 1 ? "是" : "否";
                }),
                isNewcomp: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("isNew")();
                    return status == 1 ? "是" : "否";
                }),
                isEnablecomp: ko.pureComputed(function () {
                    var status = viewModel.simpleList.ref("isEnable")();
                    var statusName
                    if (status == 0) {
                        statusName = '未启用'
                    }
                    if (status == 1) {
                        statusName = '已启用'
                    }
                    if (status == 2) {
                        statusName = '已停用'
                    }

                    return statusName;
                }),
                billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
            },

            rendertype: u.extend({}, common.rendertype, {
                detailRender: function (obj) {
                    var viewModel = obj.gridObj.viewModel;
                    var dataTableRowId = obj.row.value["$_#_@_id"];
                    var detailfun = "data-bind=click:detail.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<a href="#" class="ui-a-detail" ' +
                        detailfun +
                        ">" +
                        obj.value +
                        "</a>";
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                },
                whetherRender: function (params) {
                    params.element.innerHTML = "否";
                    /*默认1表示启用，0表示停用*/
                    if (params.value != 0 && params.value != "0") {
                        params.element.innerHTML = "是";
                    }
                },
                operation: function (obj) {
                    var viewModel = obj.gridObj.viewModel;
                    var dataTableRowId = obj.row.value["$_#_@_id"];
                    var params = {
                        id: obj.row.value.id
                    }
                    var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/channelgoodsbomtree";
                    var modifyfun =
                        "data-bind=click:modifyfun.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    var findStrucfun = "data-bind=click:showGoodsBom.bind($data," +
                        obj.rowIndex +
                        "," +
                        dataTableRowId +
                        ")";
                    obj.element.innerHTML =
                        '<div class="ui-handle-icon">' +
                        '<span class="ui-handle-word">' +
                        '<a href="#" ' +
                        modifyfun +
                        ' title="维护">维护</a>' +
                        "</span>    " +
                        "<span  class=\"ui-handle-word\">" +
                        "<a id=" + obj.row.value.productId + " href=" + hrefValue + " value=\"goodsbomtree\" name=\"联查商品结构\" class=\"ui-a-detail goodsbomtreeclass\" " +
                        findStrucfun +
                        ">" +
                        "联查商品结构" +
                        "</a>" +
                        "</span></div>";
                    ko.cleanNode(obj.element);
                    ko.applyBindings(viewModel, obj.element);
                },

                //启用状态
                enableRender: function (obj) {
                    var stateValue = viewModel.simpleList.getRow(obj.rowIndex).getValue('isEnable');
                    var statusName
                    if (stateValue == "0") {
                        statusName = '未启用'
                    }
                    if (stateValue == "1") {
                        statusName = '已启用'
                    }
                    if (stateValue == "2") {
                        statusName = '已停用'
                    }

                    obj.element.innerHTML = statusName;
                },
            }),

            events: {
                //跳转单据详情页
                goDetailPanel: common.bill.goDetailPanel,
                //返回列表页
                retListPanel: common.bill.retListPanel,
                showGoodsBom: function (index, rowId) {
                    //先清空，不然会出现多个图
                    $("#chart-container")[0].innerHTML = ""
                    var goodsId = viewModel.simpleList.getRowByRowId(rowId).getSimpleData().id
                    if (!viewModel.fieldMappingDialog) {
                        viewModel.fieldMappingDialog = u.dialog({
                            id: 'dialog_goodsbom',
                            content: "#dialog_goodsbom",
                            hasCloseMenu: true,
                            width: "600px"
                        });
                        viewModel.fieldMappingDialog.show();
                    } else {
                        viewModel.fieldMappingDialog.show();
                    }

                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.goodsbomurl + "/goods-bom-by-parent-good",
                        dataType: "json",
                        data: {
                            parentGoodId: goodsId
                        },
                        success: function (data) {
                            if (!data || data.length < 1) {
                                $("#goodsbom-title")[0].innerHTML = "该商品无商品结构";
                                return;
                            }

                            function loop(arr) {
                                var arr1 = arr;
                                //初始化设置首选color为color1
                                var tempColor = 1;
                                for (var i = arr.length - 1; i >= 0; i--) {
                                    for (var j = arr1.length - 1; j >= 0; j--) {
                                        //如果arr[i]是arr1的子节点
                                        if (arr[i].parentGoodsId == arr1[j].childGoodsId) {
                                            //如果该商品的父级没有子节点
                                            if (!arr1[j].children || arr1[j].children.length < 1) {
                                                arr1[j].children = [];
                                                arr1[i].className = viewModel.baseColorClass[tempColor] ?
                                                    viewModel.baseColorClass[tempColor] : "defaultColor";
                                                tempColor++;
                                            } else {
                                                //如果该商品父级有子节点，则当前节点和父级的第一个子节点同颜色
                                                arr1[i].className = arr1[j].children[0].className;
                                            }
                                            arr1[j].children.push(arr1[i]);
                                            arr1.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                                return arr1;
                            }

                            var datascource = {};
                            datascource.type = "goodsbom";
                            datascource.id = data[0].parentGoodsId;
                            datascource.code = data[0].parentGoodsCode;
                            datascource.name = data[0].parentGoodsName;
                            datascource.qty = 1;
                            datascource.model = data[0].parentGoodsModel;
                            datascource.specification = data[0].parentGoodsSpecification;
                            datascource.unit = data[0].parentGoodsUnitName;
                            datascource.className = "color0";
                            var goodsBomChildren = data[0].goodsBomChildren;
                            var arr = [];
                            for (var i = 0; i < goodsBomChildren.length; i++) {
                                var qty = qty = goodsBomChildren[i].childGoodsQty;
                                //计算数量时，要与其父节点数量相乘。parentId等于最外层id虽然查不到（不存在arr中），但最外层数量为1，故不需要额外逻辑。
                                for (var j = 0; j < arr.length; j++) {
                                    if (goodsBomChildren[i].parentGoodsId == arr[j].id) {
                                        qty *= arr[j].qty;
                                    }
                                }
                                arr.push({
                                    "type": "goodsbom",
                                    "qty": qty,
                                    "id": goodsBomChildren[i].childGoodsId,
                                    "code": goodsBomChildren[i].childGoodsCode,
                                    "name": goodsBomChildren[i].childGoodsName,
                                    "parentGoodsId": goodsBomChildren[i].parentGoodsId,
                                    "model": goodsBomChildren[i].parentGoodsModel,
                                    "specification": goodsBomChildren[i].childGoodsSpecification,
                                    "unit": goodsBomChildren[i].childGoodsUnitName
                                    // "childGoodsId": goodsBomChildren[i].childGoodsId
                                });
                            }
                            if (arr) {
                                var child = loop(arr);
                                datascource.children = child;
                            }

                            $("#goodsbom-title")[0].innerHTML = datascource.name + "商品结构";

                            $("#chart-container").orgchart({
                                "data": datascource,
                                "nodeContent": "title"
                            });
                        }
                    });
                },
                //返回
                backPanel: function () {

                    viewModel.retListPanel();

                },
                //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
                //特殊字符处理
                escapeChars: function (str) {
                    //转义字符
                    str = str.replace(/&lt;/g, "<");
                    str = str.replace(/&gt;/g, ">");
                    str = str.replace(/&quot;/g, '"');
                    //十进制
                    str = str.replace(/&#34;/g, '"');
                    str = str.replace(/&#39;/g, "'");
                    str = str.replace(/&#60;/g, "<");
                    str = str.replace(/&#62;/g, ">");
                    return str;
                },
                beforeEdit: function (index, rowId) {
                    viewModel.goBillPanel();
                    $("#goodsBase").show();
                    $("#goodsBase_show").hide();
                    //设置tab显示基本信息
                    $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
                    $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
                    //富文本
                    if (!editor) {
                        editor = KindEditor.create("#editEditor", {
                            uploadJson: "/iuap-saas-filesystem-service/file/upload"
                        });
                    }
                    if (index == -1) {
                        viewModel.picArr = []
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                        var GoodsRow = viewModel.simpleList.createEmptyRow();
                        viewModel.simpleList.setRowFocus(GoodsRow);
                        viewModel.attachList = []
                        viewModel.picArr = []
                        if (editor) {
                            editor.html("");
                        }
                    } else {
                        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                        var GoodsRow = viewModel.simpleList.getRowByRowId(rowId)
                        viewModel.simpleList.setRowFocus(GoodsRow);
                        viewModel.pk = GoodsRow.getSimpleData().id
                        if (GoodsRow.getSimpleData().isEnable == "1") {
                            //如果已启用，则特征属性等不可编辑，设置延迟是因为，不设置会导致特征属性值不显示
                            setTimeout(function () {
                                viewModel.app.getComp("prodAttrStrucId").setEnable(false)
                                viewModel.app.getComp("basicUnitId").setEnable(false)
                                viewModel.app.getComp("assistUnitId").setEnable(false)
                            }, 0);

                        }
                        var goodsAttrVals = GoodsRow.getSimpleData().goodsAttrVals;
                        // viewModel.setGoodsAttr(goodsAttrVals)
                        // viewModel.queryImage()
                        viewModel.queryAttach()
                        var strHtml = viewModel.escapeChars(GoodsRow.getSimpleData().description || "");
                        if (editor) {
                            editor.html(strHtml);
                        }
                    }
                    viewModel.loadTemplate(GoodsRow.getSimpleData().prodAttrStrucId)
                    // viewModel.showPicture()
                    viewModel.showAttachment()
                },
                setGoodsAttr: function (goodsAttrVals) {
                    for (var i = 0; i < goodsAttrVals.length; i++) {

                    }

                    var goodsAttrRow = viewModel.goodsAttrExt.createEmptyRow();
                    goodsAttrRow.setSimpleData(data);
                    viewModel.goodsAttrExt.setRowFocus(goodsAttrRow);
                },
                //点击保存
                saveHandle: function () {
                    var postdata = viewModel.simpleList.getFocusRow().getSimpleData();
                    var description = editor.html() + "";
                    postdata.description = description;
                    var type = "post"
                    if (postdata.id) {
                        type = "put"
                    }
                    if (postdata.basicUnitId == postdata.assistUnitId && postdata.conversionRate != 1) {
                        toastr.warning("基本单位与辅助单位相同时，转化率只能为1");
                        return
                    }

                    var goodsAttr = viewModel.goodsAttrExt.getSimpleData()[0];
                    var goodsAttrVals = []
                    for (var key in goodsAttr) {
                        var attr = {}
                        if (goodsAttr[key] && goodsAttr[key] != null && goodsAttr[key] != "") {
                            if (key == "null" || key == "persistStatus") {
                                continue;
                            }
                            var arr = goodsAttr[key].split("&&");
                            attr.attrValId = arr[0];
                            attr.attrValCode = arr[1];
                            attr.attrValName = arr[2];
                            attr.isKeyAttr = arr[3];
                            attr.productAttrId = arr[4];
                            attr.name = arr[5];
                            attr.goodsId = postdata.id;
                            goodsAttrVals.push(attr);
                        }
                    }
                    postdata.goodsAttrVals = goodsAttrVals;
                    $._ajax({
                        url: appCtx + viewModel.baseurl,
                        type: type,
                        data: JSON.stringify(postdata),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        complete: function () {
                            u.hideLoader();
                        },
                        success: function (data) {
                            viewModel.simpleList.addSimpleData(data, "nrm", {
                                unSelect: true
                            });
                            viewModel.pk = data.id;
                            $("#goodsBase").hide()
                            $("#goodsBase_show").show()
                            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                            var focusRow = viewModel.simpleList.createEmptyRow();
                            focusRow.setSimpleData(data);
                            viewModel.simpleList.setRowFocus(focusRow);
                            toastr.success("保存成功");
                        }
                    });
                },
                //点击取消 单据页
                cancelHandle: function () {
                    viewModel.search();
                    viewModel.retListPanel();
                },
                //将操作后的数据进行保存
                edit: function () {
                    var result = viewModel.dialogcardcomp.validate();
                    if (result.passed) {
                        var index = viewModel.index;
                        var currentRow, type = "post";
                        var postdata = viewModel.dialogcardcomp.geteidtData();
                        var parentId = postdata.parentId;
                        if (!parentId) {
                            postdata.areaLevel = 1;
                        } else {
                            var list = viewModel.simpleList.getSimpleData();
                            if (list.length > 0) {
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].id == parentId) {
                                        var parentAreaLevel = list[i].areaLevel;
                                        if (parentAreaLevel && parentAreaLevel != 0) {
                                            postdata.areaLevel = parseInt(parentAreaLevel) + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if (index >= 0) {
                            type = "put";
                        }
                        //更改后台数据
                        $._ajax({
                            url: appCtx + viewModel.baseurl,
                            type: type,
                            data: JSON.stringify(postdata),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                //如果index大于等于0说明是修改
                                viewModel.dialogcardcomp.close();
                                if (index >= 0) {
                                    //获取需要修改的行
                                    currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                                    //将用户填写的数据更新到simpleList上
                                } else {
                                    //添加数据
                                    currentRow = viewModel.simpleList.createEmptyRow();
                                }
                                currentRow.setSimpleData(data);
                            }
                        })

                    }
                },
                //删除和批量删除
                del: function (data, rowId) {
                    if (typeof (data) == 'number') {
                        viewModel.simpleList.setRowSelectbyRowId(rowId);
                    }
                    var ids = [];
                    var rows = viewModel.simpleList.getSelectedRows();
                    if (rows && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            ids.push(rows[i].getValue("id"));
                        }
                        common.dialog.confirmDialog({
                            msg1: '确认删除这些项？',
                            msg2: '此操作不可逆',
                            width: '400px',
                            type: 'error',
                            onOk: function () {
                                $._ajax({
                                    url: appCtx + viewModel.baseurl + "/delete",
                                    type: "post",
                                    // data: "ids=" + ids.join(","),
                                    data: {
                                        ids: ids.join(",")
                                    },
                                    success: function (data) {
                                        viewModel.simpleList.removeRows(rows);
                                    }
                                });
                            }
                        });
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                //修改价格与别名
                modifyfun: function (index, rowId) {
                    var title = "维护";
                    var list = viewModel.simpleList.getSimpleData();
                    var goodsId = list[index].id;
                    var customerStr = localStorage.getItem('_A_P_customer');
                    var customer = JSON.parse(customerStr);
                    $._ajax({
                        url: appCtx + viewModel.goodsRelCustomerUrl + "/find-rel",
                        type: "get",
                        data: { "goodsId": goodsId, "customerId": customer.id },
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            var type = "put";

                            if (data == null || data == "") {
                                type = "post";
                            } else {
                                viewModel.dialogcardcomp2.seteidtData(data);
                            }
                            viewModel.dialog2Type = type;
                            viewModel.customerId = customer.id;
                            viewModel.goodsId = goodsId;
                            //显示模态框
                            viewModel.dialogcardcomp2.show(title, "500px", viewModel.modify);
                        }
                    });
                    viewModel.dialogcardcomp2.cleareidt();

                },
                modify: function () {
                    var result = viewModel.dialogcardcomp2.validate();
                    if (result.passed) {
                        var index = viewModel.index;
                        var postdata = viewModel.dialogcardcomp2.geteidtData();
                        postdata['goodsId'] = viewModel.goodsId;
                        postdata['customerId'] = viewModel.customerId;

                        var type = viewModel.dialog2Type
                        //更改后台数据
                        $._ajax({
                            url: appCtx + viewModel.goodsRelCustomerUrl,
                            type: type,
                            data: JSON.stringify(postdata),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                //如果index大于等于0说明是修改
                                viewModel.dialogcardcomp2.close();
                                viewModel.dialogcardcomp2.cleareidt();
                            }
                        })

                    }
                },
                //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
                search: function (reindex) {
                    if (reindex) {
                        viewModel.simpleList.pageIndex(0);
                    }
                    viewModel.simpleList.removeAllRows();
                    var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                    queryData.size = viewModel.simpleList.pageSize();
                    queryData.page = viewModel.simpleList.pageIndex();
                    //取客户id
                    var customerStr = localStorage.getItem('_A_P_customer');
                    var customer = JSON.parse(customerStr);
                    // queryData["search_customerId"] = customer['id'];
                    // queryData["search_customerRankCode"] = customer['customerRankCode'];
                    // queryData["search_saleModel"] = "01";
                    //测试联查商品bom用数据
                    // var data = [{ id: "ded8a46e-587c-4ad9-9a26-dcef61961c11" },{ id: "23456789" }];
                    // viewModel.simpleList.setSimpleData(data, {
                    //     unSelect: true
                    // });
                    $._ajax({
                        type: "get",
                        // url: "/occ-b2b-order/b2b/goods/find-by-customer",
                        url: appCtx + viewModel.channelGoodsUrl,
                        dataType: "json",
                        data: queryData,
                        success: function (data) {
                            viewModel.simpleList.setSimpleData(data.content, {
                                unSelect: true
                            });
                            viewModel.simpleList.totalRow(data.totalElements);
                            viewModel.simpleList.totalPages(data.totalPages);
                        }
                    })
                },

                //清空搜索条件
                cleanSearch: function () {
                    viewModel.searchcomp.clearSearch();
                },
                //页码改变时的回调函数
                pageChange: function (index) {
                    viewModel.simpleList.pageIndex(index);
                    viewModel.search();
                },
                //页码改变时的回调函数
                sizeChange: function (size) {
                    viewModel.simpleList.pageSize(size);
                    viewModel.search(true);
                },
                //启用
                enable: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
                    if (selectedRows && selectedRows.length > 0) {
                        var ids = selectedRows.map(function (row, index, arr) {
                            return row.getValue("id");
                        })
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/batch-enable",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (res) {
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
                disable: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
                    if (selectedRows && selectedRows.length > 0) {
                        var ids = selectedRows.map(function (row, index, arr) {
                            return row.getValue("id");
                        })
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/batch-disable",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (res) {
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



                //启用
                onshelf: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
                    if (selectedRows && selectedRows.length > 0) {
                        var ids = selectedRows.map(function (row, index, arr) {
                            return row.getValue("id");
                        })
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/batch-onshelf",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (res) {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    selectedRows[i].setValue("isOnShelf", "1");
                                }
                            }
                        })
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },
                //停用
                unonshelf: function () {
                    var selectedRows = viewModel.simpleList.getSelectedRows();
                    if (selectedRows && selectedRows.length > 0) {
                        var ids = selectedRows.map(function (row, index, arr) {
                            return row.getValue("id");
                        })
                        $._ajax({
                            type: "post",
                            url: appCtx + viewModel.baseurl + "/batch-unonshelf",
                            data: {
                                ids: ids.join(",")
                            },
                            success: function (res) {
                                for (var i = 0; i < selectedRows.length; i++) {
                                    selectedRows[i].setValue("isOnShelf", "0");
                                }
                            }
                        });
                    } else {
                        toastr.warning("请至少选择一项");
                    }
                },


                detail: function (index, rowId) {
                    viewModel.beforeEdit(index, rowId)

                    $("#goodsBase").hide()
                    $("#goodsBase_show").show();

                    var goodsRow = viewModel.simpleList.getRowByRowId(rowId);
                    viewModel.loadTemplate(goodsRow.getSimpleData().prodAttrStrucId);
                    //viewModel.goodsAttrExtDetail.removeAllRows();
                    // 反格式html文档，setSimpledat时会吧html文档格式
                    //$(".ui-detail-description .ui-inputarea div").html(goodsRow.getSimpleData().description.replace(/&#60;/g, "<").replace(/&#34;/g, '"').replace(/&#39;/g, "'"));
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                },
                //导入
                importHandle: function () {
                    var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                    var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                    var ele = $('#importFiel')[0]; //挂载元素
                    common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
                },
                //导出
                exportHandle: function () {
                    var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                    var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
                    var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
                    var listData = viewModel.simpleList; //需要导出表格的dataTable
                    var ele = $('#exportFiel')[0]; //挂载元素
                    common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
                },

                loadTemplate: function (prodAttrStrucId) {
                    // 若为父节点则清空当前模板
                    if (!prodAttrStrucId) {
                        $("#goods-card-attr").empty();
                        return;
                    }
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.attrStrucUrl + "/" + prodAttrStrucId,
                        dataType: "json",
                        success: function(data) {
                            viewModel.attrList = data;
                            // // 将从数据库查出的数据转换成组件可识别的配置项
                            var options = viewModel.transSetting(data);
                            //viewModel.goodsAttrExt = new u.DataTable();
                            viewModel.goodsAttrExtDetail = new u.DataTable();
                                // 初始化详情页，设置为不可编辑状态
                            viewModel.initCard($("#goods-detail-attr"), options, "goodsAttrExtDetail", true);
                        }
                    });
                },

                // 初始化卡片设置
                initCard: function ($element, options, dataTable, isDetail) {
                   
                    // 调用empty方法清空dom元素及相关事件，防止内存泄露
                    $element.empty();
                    // 取dom元素
                    var element = $element[0];
                    // 调用单据卡片模块初始化模板
                    billcard(element, options, viewModel[dataTable], dataTable, viewModel);
                    viewModel.goodsAttrExt.removeAllRows();
                    var childrow = viewModel.goodsAttrExt.createEmptyRow();

                    // 对模板中的组件进行初始化
                    element.querySelectorAll('[u-meta]').forEach(function (ele) {
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
                            // app.comps.push(comp);
                        }
                    });

                    var GoodsRow = viewModel.simpleList.getFocusRow()
                    var goodsId = GoodsRow.getSimpleData().id;
                          //根据商品id，查询商品属性值。
                $._ajax({
                    url: appCtx + viewModel.goodsattrvalsurl + "/get-by-goods-id/" + goodsId,
                    type: "get",
                    data: {
                        goodsId: goodsId
                    },
                    success: function(goodsAttrVals) {
                        if (goodsAttrVals) {
                            var goodsAttr = {};
                            for (var i = 0; i < goodsAttrVals.length; i++) {
                                if (goodsAttr[goodsAttrVals[i].prodAttrStrucItemId]) {
                                    goodsAttr[goodsAttrVals[i].prodAttrStrucItemId] += ",";
                                    goodsAttr[goodsAttrVals[i].prodAttrStrucItemId] += goodsAttrVals[i].attrValId ? goodsAttrVals[i].attrValId : goodsAttrVals[i].attrValCode;
                                } else {
                                    goodsAttr[goodsAttrVals[i].prodAttrStrucItemId] = goodsAttrVals[i].attrValId ? goodsAttrVals[i].attrValId : goodsAttrVals[i].attrValCode;
                                }

                            }
                            childrow.setSimpleData(goodsAttr);
                            viewModel.goodsAttrExt.setRowFocus(childrow);
                            //viewModel.goodsAttrExt.setSimpleData(goodsAttr);
                            viewModel.goodsAttrExtDetail.setSimpleData(goodsAttr);
                        }
                    }
                })
                    // if (goodsAttrVals) {
                    //     var goodsAttr = {}
                    //     for (var i = 0; i < goodsAttrVals.length; i++) {
                    //         var temp = goodsAttrVals[i].attrValId
                    //         temp += "&&"
                    //         temp += goodsAttrVals[i].attrValCode
                    //         temp += "&&"
                    //         temp += goodsAttrVals[i].attrValName
                    //         temp += "&&"
                    //         temp += goodsAttrVals[i].isKeyAttr
                    //         temp += "&&"
                    //         temp += goodsAttrVals[i].productAttrId
                    //         temp += "&&"
                    //         temp += goodsAttrVals[i].name
                    //         goodsAttr[goodsAttrVals[i].productAttrId] = temp
                    //     }

                    //     childrow.setSimpleData(goodsAttr);
                    //     viewModel.goodsAttrExt.setRowFocus(childrow);
                    //     viewModel.goodsAttrExtDetail.setSimpleData(goodsAttr);
                    // }

                },

                  // 设置转化方法
            transSetting: function(data) {
                viewModel.goodsAttrDataSource = data;
                if (data && data.length > 0) {
                    // 组装全局的字段配置，保存时从该字段进行过滤
                    viewModel.extfieldObj = {};
                    var cusDocCodes = "";
                    var newSetting = data.map(function(item) {
                        var base = {};
                        //viewModel.extfieldObj[item.fieldName] = true;
                        // if (item.productAttrType == "01") {
                        //     // cusDocCodes += ("," + item.cusDocCode);
                        //     base.type = "combo";
                        //     base.dataSource = item.productAttrId + "sourceData";
                        //     base.onlySelect = true;
                        //     viewModel[base.dataSource] = ko.observableArray([]);
                        //     $._ajax({
                        //         type: "get",
                        //         queryData: {search_EQ_isEnable: 1},
                        //         url: appCtx + viewModel.attrUrl + "/" + item.productAttrId + "/prod-attr-val-page",
                        //         dataType: "json",
                        //         async: false,
                        //         success: function (data) {
                        //             // 此处创建下拉来源数组，保证下拉框组件在初始化过程中该对象存在
                        //             var combodata = [];
                        //             var isKeyAttr = null;
                        //             var attrId = null;
                        //             var attrName = null;
                        //             if (data.length > 0) {
                        //                 for (var i = 0; i < viewModel.attrList.length; i++) {
                        //                     if (data[0].productAttrId == viewModel.attrList[i].productAttrId) {
                        //                         isKeyAttr = viewModel.attrList[i].isKeyAttr;
                        //                         attrName = viewModel.attrList[i].name;
                        //                         attrId = viewModel.attrList[i].productAttrId;
                        //                         break;
                        //                     }
                        //                 }
                        //             }
                        //             //common.dataconvert.toMap(data, "name", "code");
                        //             //下拉框value中存入id、code、name、是否关键等字段
                        //             for (var i = 0; i < data.length; i++) {
                        //                 var temp = {};
                        //                 temp.name = data[i].name;
                        //                 temp.value = data[i].id;
                        //                 temp.value += "&&";
                        //                 temp.value += data[i].code;
                        //                 temp.value += "&&";
                        //                 temp.value += data[i].name;
                        //                 temp.value += "&&";
                        //                 temp.value += isKeyAttr;
                        //                 temp.value += "&&";
                        //                 temp.value += attrId;
                        //                 temp.value += "&&";
                        //                 temp.value += attrName;
                        //                 combodata.push(temp);
                        //             }
                        //             viewModel[base.dataSource](combodata);
                        //         }
                        //     });
                        //     // } else if (item.productAttrType == "02") {
                        //     //     continue;
                        //     //     cusDocCodes += ("," + item.productAttrCode);
                        //     //     base.type = "combo";
                        //     //     base.dataSource = item.code + "AttrDataSource";
                        //     //     base.onlySelect = true;
                        //     //     // 此处创建下拉来源数组，保证下拉框组件在初始化过程中该对象存在

                        //     //     viewModel[base.dataSource] = ko.observableArray([]);
                        //     //     viewModel[base.dataSource](item.prodAttrVals)
                        // } else {
                        //     base.type = "text";
                        // }


                        //已启用的数据，不可编辑特征属性
                        // if (viewModel.simpleList.getFocusRow().getSimpleData().isEnable == "1") {
                        //     return {
                        //         enable: false,
                        //         referId: item.id,
                        //         type: item.productAttrType == "04" ? "text" : "refer",
                        //         label: item.isOptionalAttr == 1 ? item.name + "(选配)" : item.name,
                        //         key: item.id,
                        //         required: item.isOptionalAttr == 1 ? false : true,
                        //         refinfo: "prodAttrVal",
                        //         clientParam: {
                        //             "productAttrId": item.productAttrId
                        //         },
                        //         refcfg: {
                        //             "ctx": "/uitemplate_web",
                        //             "refCode": "",
                        //             "refName": "商品",
                        //             "isMultiSelectedEnabled": item.isOptionalAttr == 1 ? true : false
                        //         },
                        //         // compid: item.productAttrId
                        //     };
                        // }
                        return {
                            type: item.productAttrType == "04" ? "text" : "refer",
                            referId: item.id,
                            label: item.isOptionalAttr == 1 ? item.name + "(选配)" : item.name,
                            key: item.id,
                            required: item.isOptionalAttr == 1 ? false : true,
                            refinfo: "prodAttrVal",
                            clientParam: {
                                "productAttrId": item.productAttrId
                            },
                            refcfg: {
                                "ctx": "/uitemplate_web",
                                "refCode": "",
                                "refName": "商品",
                                "isMultiSelectedEnabled": item.isOptionalAttr == 1 ? true : false
                            },
                            // compid: item.productAttrId
                        };

                    });
                    // if (cusDocCodes.length > 0) {
                    //     // 组装需要的自定义档案枚举类型
                    //     // 去掉开头的“，”
                    //     cusDocCodes = cusDocCodes.slice(1);
                    //     $._ajax({
                    //         type: "get",
                    //         url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    //         data: {
                    //             cust_doc_code_batch: cusDocCodes
                    //         },
                    //         success: function (data) {
                    //             var cusDocCodeArr = cusDocCodes.split(",");
                    //             if (cusDocCodeArr && cusDocCodeArr.length > 0) {
                    //                 cusDocCodeArr.map(function (item) {
                    //                     var combodata = common.dataconvert.toMap(data[item], "name", "code");
                    //                     viewModel[item + "dataSource"] = ko.observableArray([]);
                    //                     viewModel[item + "dataSource"](combodata);
                    //                 })
                    //             }
                    //         }
                    //     });
                    // }
                    return newSetting;
                } else {
                    return [];
                }
            },


                showPicture: function () {
                    var picArr = viewModel.picArr;
                    var htmlStr = "<div style=\"display:flex\" >";
                    for (var i = 0; i < picArr.length; i++) {
                        htmlStr += "<div style=\"width:150px;height:200px;margin:5px\" >"

                        htmlStr += "<img width=\"150\" height=\"150\" src=\"" + picArr[i].url + "\" />"
                        htmlStr += "<span id=\"" + picArr[i].id + "\" class=\"image-del\" data-bind=\"fileDelete\">删除</span>"
                        htmlStr += "</div>"
                    }
                    htmlStr += "<div id=\"goods-add-pic\" style=\"width:150px;height:150px;margin:5px;border:1px solid #aaa;\" > +</div>"
                    htmlStr += "</div>"

                    $("#goods-card-pic")[0].innerHTML = htmlStr
                    console.log($(".image-del"))
                    $(".image-del").click(function (e) {
                        viewModel.fileDelete(e.currentTarget.id)
                    })
                    $("#goods-add-pic").click(function () {
                        $("#uploadbatch_id").val(undefined);
                        $("#uploadbatch_id").trigger("click");
                    })

                    //detail
                    var detailStr = "<div style=\"display:flex\" >";
                    for (var i = 0; i < picArr.length; i++) {
                        detailStr += "<div style=\"width:150px;height:200px;margin:5px\" >"

                        detailStr += "<img width=\"150\" height=\"150\" src=\"" + picArr[i].url + "\" />"
                        detailStr += "</div>"
                    }
                    detailStr += "<div id=\"goods-add-pic\" style=\"width:150px;height:150px;margin:5px;border:1px solid #aaa;\" > +</div>"
                    detailStr += "</div>"
                    $("#goods-detail-pic")[0].innerHTML = detailStr
                },

                //上传图片
                onFileUploadGoods: function () {
                    var fileNum = $("#uploadbatch_id")[0].files.length;
                    var fileSize = 0;
                    var fileSizeMb = 0;
                    var fileTypeArr = [];
                    var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
                    var fileSizeSum = (function () {
                        for (var i = 0; i < fileNum; i++) {
                            fileSize += $("#uploadbatch_id")[0].files[i].size;
                            var fileName = $("#uploadbatch_id")[0].files[i].name;
                            var fileType = fileName
                                .substr(fileName.lastIndexOf("."))
                                .toLowerCase();
                            fileTypeArr.push(fileType);
                        }
                        fileSizeMb = fileSize / 1024 / 1024;
                        return fileSizeMb;
                    })();
                    for (var i = 0; i < fileTypeArr.length; i++) {
                        if (allowType.indexOf(fileTypeArr[i]) == -1) {
                            toastr.warning("仅支持" + allowType + "格式文件");
                            return false;
                        }
                    }
                    if (fileSizeSum <= 500) {
                        //获取表单
                        var pk = viewModel.pk;
                        var par = {
                            fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
                            // />,可以修改，主要看你使用的 id是什么
                            filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                            groupname: pk, //【必填】分組名称,未来会提供树节点
                            permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
                            url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
                            //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                        };
                        var f = new interface_file();
                        f.filesystem_upload(par, viewModel.fileUploadCallbackGoods);
                    } else {
                        toastr.warning("图片总和不能超过500MB");
                        return false;
                    }
                },

                fileDelete: function (id) {
                    debugger
                    // debugger
                    var par = {
                        id: id,//【必填】表的id
                        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                    }
                    var f = new interface_file();
                    f.filesystem_delete(par, viewModel.fileDeleteCallBack);
                    // }
                },
                //附件删除回调
                fileDeleteCallBack: function (data) {
                    debugger
                    // debugger
                    if (1 == data.status) {//删除成功状态
                        viewModel.queryImage();
                        viewModel.queryAttach()
                    } else {
                        toastr.error(data.message);
                    }
                },

                //上传文件回传信息
                fileUploadCallbackGoods: function (data) {
                    console.log(data)
                    if (1 == data.status) {
                        //上传成功状态
                        for (var i = 0; i < data.data.length; ++i) {
                            viewModel.picArr.push(data.data[i]);
                            viewModel.showPicture()
                        }
                    } else {
                        //error 或者加載js錯誤
                        toastr.error(data.message);
                    }
                },

                queryImage: function () {
                    //获取表单
                    var pk = viewModel.pk;
                    var par = {
                        //建议一定要有条件否则会返回所有值
                        filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                        groupname: pk, //【选填】[分組名称,未来会提供树节点]
                        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                    };
                    var f = new interface_file();
                    f.filesystem_query(par, viewModel.queryImageCallBack);
                },

                queryImageCallBack: function (data) {
                    if (1 == data.status) {
                        //上传成功状态
                        viewModel.picArr = data.data;
                        viewModel.showPicture()
                    } else {
                        //删除成功后查询
                        if (data.status == 0 && !data.data) {
                            viewModel.picArr = [];
                            viewModel.showPicture()
                        }
                    }
                },

                showAttachment: function () {
                    // app.getComp("c1").setComboData([{ value: 'test1', name: '附件一678' }, { value: 'test2', name: '附件二' }])
                    var attachList = viewModel.attachList;
                    var htmlStr = "<div>";
                    for (var i = 0; i < attachList.length; i++) {
                        // htmlStr += "<img width=\"150\" height=\"150\" src=\""+picArr[i].url+"\" style=\"margin:5px;\"\/>"
                        htmlStr += "<div style=\"display:flex\">"
                        htmlStr += "<input id=\"" + attachList[i].id + "\" class=\"attachSelect\" type=\"checkbox\">"
                        htmlStr += "<span>" + attachList[i].filename + "</span>"
                        htmlStr += "<a id=\"down_" + attachList[i].id + "\" href=\"" + attachList[i].url + "\" download = \"" + attachList[i].filename.split("\.")[0] + "\">下载</a>"
                        htmlStr += "<div id=\"" + attachList[i].id + "\" class=\"attach-del\" data-bind=\"fileDelete\">删除</div>"
                        htmlStr += "</div>"
                    }
                    htmlStr += "</div>"

                    $("#goods-card-attach")[0].innerHTML = htmlStr
                    $("#goods-add-attach").click(function () {
                        $("#attachuploadbatch_id").val(undefined);
                        $("#attachuploadbatch_id").trigger("click");
                    })
                    $(".attach-del").click(function (e) {
                        viewModel.fileDelete(e.currentTarget.id)
                    })
                    //detail页面
                    var detailStr = "<div>";
                    for (var i = 0; i < attachList.length; i++) {
                        detailStr += "<div style=\"display:flex\">"
                        // detailStr += "<input id=\"" + attachList[i].id + "\" class=\"attachSelect\" type=\"checkbox\">"
                        detailStr += "<span>" + attachList[i].filename + "</span>"
                        // detailStr += "<a id=\"down_" + attachList[i].id + "\" href=\"" + attachList[i].url + "\" download = \"" + attachList[i].filename.split("\.")[0] + "\">下载</a>"
                        detailStr += "</div>"
                    }
                    detailStr += "</div>"

                    $("#goods-detail-attach")[0].innerHTML = detailStr

                },
                btnDelAttach: function () {
                    var row = $(".attachSelect")

                    for (var i = 0; i < row.length; i++) {
                        if (!row[i].checked) {
                            continue;
                        }
                        viewModel.fileDelete(row[i].id)
                    }
                },

                downLoadAttachBatch: function () {
                    //下载
                    var row = $(".attachSelect")

                    for (var i = 0; i < row.length; i++) {
                        if (!row[i].checked) {
                            continue;
                        }
                        var pk = "down_" + row[i].id;
                        $('#' + pk)[0].click()
                        // var pk = row[i].id;
                        // var form = $("<form>");   //定义一个form表单
                        // form.attr('style', 'display:none');   //在form表单中添加查询参数
                        // form.attr('target', '');
                        // form.attr('enctype', 'multipart/form-data');
                        // form.attr('method', 'post');
                        // form.attr('action', window.ctxfilemng + "file/download?permission=read&stream=false&id=" + pk);
                        // $('#file-form').append(form);  //将表单放置在web中
                        // form.submit();
                    }
                },


                downLoadAttach: function () {
                    //下载
                    var row = viewModel.attachList

                    for (var i = 0; i < row.length; i++) {
                        var pk = "down_" + row[i].id;
                        $('#' + pk).trigger("click")
                        // var form = $("<form>");   //定义一个form表单
                        // form.attr('style', 'display:none');   //在form表单中添加查询参数
                        // form.attr('target', '');
                        // form.attr('enctype', 'multipart/form-data');
                        // form.attr('method', 'post');
                        // form.attr('action', window.ctxfilemng + "file/download?permission=read&stream=false&id=" + pk);
                        // $('#file-form').append(form);  //将表单放置在web中
                        // form.submit();
                    }
                },

                //点击上传按钮
                btnUploadAttach: function () {
                    $("#attachuploadbatch_id").val(undefined);
                    $("#attachuploadbatch_id").trigger("click");

                },
                uploadAttach: function () {
                    var fileNum = $("#attachuploadbatch_id")[0].files.length;
                    var fileSize = 0;
                    var fileSizeMb = 0;
                    var fileTypeArr = [];

                    var pk = viewModel.pk;
                    var par = {
                        fileElementId: "attachuploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
                        // />,可以修改，主要看你使用的 id是什么
                        filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                        groupname: "att" + pk, //【必填】分組名称,未来会提供树节点
                        permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
                        url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
                        //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                    };
                    var f = new interface_file();
                    f.filesystem_upload(par, viewModel.uploadAttachCallback);

                },

                uploadAttachCallback: function (data) {
                    console.log(data)
                    if (1 == data.status) {
                        //上传成功状态
                        for (var i = 0; i < data.data.length; ++i) {
                            viewModel.attachList.push(data.data[i]);
                            viewModel.showAttachment()
                        }
                    } else {
                        //error 或者加載js錯誤
                        toastr.error(data.message);
                    }
                },
                queryAttach: function () {
                    //获取表单
                    var pk = viewModel.pk;
                    var par = {
                        fileElementId: "attachuploadbatch_id",
                        //建议一定要有条件否则会返回所有值
                        filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                        groupname: "att" + pk, //【选填】[分組名称,未来会提供树节点]
                        cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                    };
                    var f = new interface_file();
                    f.filesystem_query(par, viewModel.queryAttachCallback);
                },

                queryAttachCallback: function (data) {
                    if (1 == data.status) {
                        //上传成功状态
                        viewModel.attachList = data.data;
                        viewModel.showAttachment()
                    } else {
                        //删除成功后查询
                        if (data.status == 0 && !data.data) {
                            viewModel.attachList = [];
                        }
                        viewModel.showAttachment()
                    }
                },
            },


            afterCreate: function () {
                //viewModel.search();
                viewModel.simpleList.on("prodAttrStrucId.valuechange", function (obj) {
                   // model.options.metas.Goodsmeta
                    viewModel.loadTemplate(obj.newValue);
                    //判断编辑时该字段数据无变化
                    // if (obj.oldValue != undefined && obj.oldValue != obj.newValue) {
                    //     var deposit = viewModel.app.getComp("deposit");
                    //     if (obj.newValue == 1) {
                    //         deposit.setEnable(true);
                    //     } else {
                    //         deposit.setEnable(false);
                    //     }
                    // }
                });

                // 初始化折叠面板
                $.fn.collapsepanel(false, true);
                //枚举
                $._ajax({
                    type: "get",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
                    data: {
                        cust_doc_code_batch: "GOODS_LIFECYCLE"
                    },
                    success: function (data) {
                        var newarray;
                        newarray = common.dataconvert.toMap(data["GOODS_LIFECYCLE"], "name", "code");
                        viewModel.goodsLifecycleDatasource(newarray);

                    }
                });

                // 选择上传文件后，直接调用上传方法
                $("#piciptwrap").on("change", "#uploadbatch_id", function () {
                    if (this.value) {
                        viewModel.onFileUploadGoods();
                    }
                });
                // 选择上传文件后，直接调用上传方法
                $("#fileiptwrap").on("change", "#attachuploadbatch_id", function () {
                    if (this.value) {
                        viewModel.uploadAttach();
                    }
                });
                // 基本信息
                viewModel.simpleList.on("isEnable.valuechange", function (
                    obj
                ) {
                    var comp = viewModel.app.getComp("prodAttrStrucId");
                    if (obj.newValue == 1) {
                        comp.setEnable(false);
                    } else {
                        comp.setEnable(true);
                        // viewModel.CustomerList.setValue("organizationId", null);
                    }
                });

                //选择产品，带入多字段
                viewModel.simpleList.on("productId.valuechange", function (obj) {
                    var productId = obj.newValue;
                    var prodAttrStrucId = viewModel.app.getComp("prodAttrStrucId");
                    var goodscategoryId = viewModel.app.getComp("goodscategoryId");
                    var brandId = viewModel.app.getComp("brandId");
                    var productLineId = viewModel.app.getComp("productLineId");
                    var basicUnitId = viewModel.app.getComp("basicUnitId");
                    if (productId && productId != "") {
                        prodAttrStrucId.setEnable(false);
                        goodscategoryId.setEnable(false);
                        brandId.setEnable(false);
                        productLineId.setEnable(false);
                        basicUnitId.setEnable(false);
                    } else {
                        prodAttrStrucId.setEnable(true);
                        goodscategoryId.setEnable(true);
                        brandId.setEnable(true);
                        productLineId.setEnable(true);
                        basicUnitId.setEnable(true);
                    }
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.productUrl + "/" + productId,
                        success: function (data) {
                            viewModel.simpleList.setValue("goodsCategoryId", data.goodsCategoryId);
                            viewModel.simpleList.setValue("goodsCategoryCode", data.goodsCategoryCode);
                            viewModel.simpleList.setValue("goodsCategoryName", data.goodsCategoryName);
                            viewModel.simpleList.setValue("prodAttrStrucId", data.prodAttrStrucId);
                            viewModel.simpleList.setValue("prodAttrStrucCode", data.prodAttrStrucCode);
                            viewModel.simpleList.setValue("prodAttrStrucName", data.prodAttrStrucName);
                            viewModel.simpleList.setValue("productLineId", data.productLineId);
                            viewModel.simpleList.setValue("productLineCode", data.productLineCode);
                            viewModel.simpleList.setValue("productLineName", data.productLineName);
                            viewModel.simpleList.setValue("brandId", data.brandId);
                            viewModel.simpleList.setValue("brandCode", data.brandCode);
                            viewModel.simpleList.setValue("brandName", data.brandName);
                            viewModel.simpleList.setValue("model", data.model);
                            viewModel.simpleList.setValue("basicUnitId", data.unitId);

                            // viewModel.simpleList.getRowByRowId(obj.rowId).setSimpleData(rowData)
                        }
                    });
                });

                //辅助单位和换算率跟随基本单位变化
                viewModel.simpleList.on("basicUnitId.valuechange", function (obj) {
                    var rowData = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData();
                    viewModel.simpleList.setValue("assistUnitId", rowData.basicUnitId);
                    viewModel.simpleList.setValue("conversionRate", 1);
                })

                viewModel.simpleList.on("goodsCategoryId.valuechange", function (obj) {
                    var goodsCategoryId = obj.newValue;
                    var productId = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData().productId;
                    var comp = viewModel.app.getComp("prodAttrStrucId");
                    if (productId && productId != "") {
                        return
                    }
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.goodsCategorytUrl + "/" + goodsCategoryId,
                        success: function (data) {

                            viewModel.simpleList.setValue("prodAttrStrucId", data.defaultProdAttrStrucId);
                            viewModel.simpleList.setValue("prodAttrStrucCode", data.defaultProdAttrStrucCode);
                            viewModel.simpleList.setValue("prodAttrStrucName", data.defaultProdAttrStrucName);
                            // viewModel.simpleList.getRowByRowId(obj.rowId).setSimpleData(rowData)

                        }
                    });
                });

            }
        });
        return view;
    });

