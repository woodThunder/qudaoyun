define([
    "text!./goods.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "searchbox",
    "billcard",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl",
    "ocm_kindeditor", , "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function(
    tpl,
    common, baseview, model, searchbox, billcard) {
    "use strict";
    var viewModel, app, editor, detailEditor;;
    var view = baseview.extend({
        beforeCreate: function() {
            viewModel = this.viewModel;
            app = this.app;
        },
        tpl: tpl,
        //    rendertype: common.rendertype,
        setTemplate: function(el, tpl) {
            el.innerHTML = tpl;
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: "/base/goods",
            attrStrucUrl: "/base/prod-attr-strucs/get-prod-attr-struc-items",
            attrUrl: "/base/product-attrs",
            productUrl: "/base/products",
            goodsCategorytUrl: "/goods-categorys",
            pictureurl: '/base/pictures',
            goodsrelpicturreurl: '/base/goods-rel-pictures',
            statusField: "isEnable",
            excelurl: '/goods-excel',
            dialogWidth: "900px",
            goodsbomurl: "/base/goods-boms",
            goodsattrvalsurl: "/base/goods-attr-vals",
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
            button1Source: model.options.buttons.button1,
            button2Source: model.options.buttons.button2,
            button3Source: model.options.buttons.button3,
            button4Source: model.options.buttons.button4,
            button5Source: model.options.buttons.button5,
            buttonMenu1Source: model.options.buttonmenus.buttonmenu1,
            buttonMenu2Source: model.options.buttonmenus.buttonmenu2,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            search2Source: model.options.searchs.search2,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            // detailSource: model.options.details.detail,
            gridOption: model.options.grids.grid1,
            goBillPanel: common.bill.goBillPanel,
            card1Source: model.options.cards.card1,
            card2Source: model.options.cards.card2,
            card3Source: model.options.cards.card3,
            card4Source: model.options.cards.card4,
            card5Source: model.options.cards.card5,
            card6Source: model.options.cards.card6,
            card7Source: model.options.cards.card7,
            detail1Source: model.options.details.detail1,
            detail2Source: model.options.details.detail2,
            detail3Source: model.options.details.detail3,
            detail4Source: model.options.details.detail4,
            detail5Source: model.options.details.detail5,
            detail6Source: model.options.details.detail6,
            detail7Source: model.options.details.detail7,
            detail8Source: model.options.details.detail8,
            goodsLifecycleDatasource: ko.observableArray([]),
            logisticsModeDatasource: ko.observableArray([]),
            virtualLinkDatasource: ko.observableArray([]),
            checkboxData: [],
            picArr: [],
            attachList: [],
            attrList: [],
            goodsrelpictures: [],
            //批次号管理
            isEnableBatchNumberManage: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("enableBatchNumberManage")();
                return status == 1 ? "是" : "否";
            }),
            //商品结构管理
            isEnableStrucManage: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("enableStrucManage")();
                return status == 1 ? "是" : "否";
            }),
            //批号管理
            isEnableBatchNoManage: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("enableBatchNoManage")();
                return status == 1 ? "是" : "否";
            }),
            //库存状态管理
            isEnableInvStatusManage: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("enableInvStatusManage")();
                return status == 1 ? "是" : "否";
            }),
            //电商在售
            com_isOnSle: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isOnSle")();
                return status == 1 ? "是" : "否";
            }),
            isNewcomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isNew")();
                return status == 1 ? "是" : "否";
            }),
            isOnShelfcomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isOnShelf")();
                return status == 1 ? "是" : "否";
            }),
            isPromotioncomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isPromotion")();
                return status == 1 ? "是" : "否";
            }),
            //服务类
            isServiceTypecomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isServiceType")();
                return status == 1 ? "是" : "否";
            }),
            isOptionalcomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isOptional")();
                return status == 1 ? "是" : "否";
            }),
            isSparePartcomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isSparePart")();
                return status == 1 ? "是" : "否";
            }),
            isEnablecomp: ko.pureComputed(function() {
                var status = viewModel.simpleList.ref("isEnable")();
                var statusName;
                if (status == 0) {
                    statusName = "未启用";
                }
                if (status == 1) {
                    statusName = "已启用";
                }
                if (status == 2) {
                    statusName = "已停用";
                }
                return statusName;
            }),
            billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        },

        rendertype: u.extend({}, common.rendertype, {
            detailRender: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var detailfun = "data-bind=click:detail.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<a href=\"#\" class=\"ui-a-detail\" " +
                    detailfun +
                    ">" +
                    obj.value +
                    "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            whetherRender: function(params) {
                params.element.innerHTML = "否";
                /*默认1表示启用，0表示停用*/
                if (params.value != 0 && params.value != "0") {
                    params.element.innerHTML = "是";
                }
            },
            operation: function(obj) {
                var viewModel = obj.gridObj.viewModel;
                var dataTableRowId = obj.row.value["$_#_@_id"];
                var params = {
                    id: obj.row.value.id
                }
                var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/goodsbomtree";
                var delfun =
                    "data-bind=click:del.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var editfun =
                    "data-bind=click:beforeEdit.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var newVersion =
                    "data-bind=click:newVersion.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                var detailfun = "data-bind=click:showGoodsBom.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                obj.element.innerHTML =
                    "<div class=\"ui-handle-icon\">" +

                    "<span  class=\"ui-handle-word\">" +
                    "<a href=" + hrefValue + " value=\"goodsbomtree\" name=\"联查商品结构\" class=\"ui-a-detail goodsbomtreeclass\" " +
                    detailfun +
                    ">" +
                    "联查商品结构" +
                    "</a>" +
                    "</span>    " +

                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    newVersion +
                    " title=\"新版本\">新版本</a>" +
                    "</span>    " +

                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    editfun +
                    " title=\"编辑\">编辑</a>" +
                    "</span>    " +
                    "<span class=\"ui-handle-word\">" +
                    "<a href=\"#\" " +
                    delfun +
                    " title=\"删除\">删除</a>" +
                    "</span></div>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            productRender: function(obj) {
                var viewModel = obj.gridObj.viewModel;

                var params = {
                    id: obj.row.value.productId
                }
                var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/product";
                var detailfun = "data-bind=click:productDetail.bind($data," + obj.rowIndex + ")";
                obj.element.innerHTML =
                    '<a href=' + hrefValue + ' value="product" name="产品" class="ui-a-detail" ' +
                    detailfun +
                    ">" +
                    obj.value + "</a>";
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
            //启用状态
            enableRender: function(obj) {
                var stateValue = viewModel.simpleList.getRow(obj.rowIndex).getValue("isEnable");
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
        }),

        events: {
            productDetail: function(index, viewModel, e) {
                e.preventDefault();
                parent.handleClick(e, 1);
            },
            showGoodsBom: function(index, rowId) {
                //先清空，不然会出现多个图
                $("#chart-container")[0].innerHTML = ""
                var goodsId = viewModel.simpleList.getRowByRowId(rowId).getSimpleData().id
                if (!viewModel.fieldMappingDialog) {
                    viewModel.fieldMappingDialog = u.dialog({
                        id: 'dialog_goodsbom',
                        content: "#dialog_goodsbom",
                        hasCloseMenu: true,
                        width: "98%"
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
                    success: function(data) {
                        if (!data || data.length < 1) {
                            $("#goodsbom-title")[0].innerHTML = "该商品无商品结构";
                            return;
                        }
                        var tempColorIndex = 0

                        function loop(data, arr) {
                            tempColorIndex++
                            for (var i = 0; i < data.length; i++) {
                                for (var j = 0; j < arr.length; j++) {
                                    if (arr[j].parentGoodsId == data[i].id) {
                                        arr[j].className = viewModel.baseColorClass[tempColorIndex] ? viewModel.baseColorClass[tempColorIndex] : "defaultColor"
                                        if (data[i].children == undefined || data[i].children.length == 0) {
                                            data[i].children = [];
                                        }
                                        data[i].children.push(arr[j])
                                    }
                                }
                                if (data[i].children) {
                                    loop(data[i].children, arr);
                                }
                            }
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
                            var qty = goodsBomChildren[i].childGoodsQty;
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
                        var result = [];
                        if (arr) {
                            result.push(datascource)
                            loop(result, arr);
                        }

                        $("#goodsbom-title")[0].innerHTML = datascource.name + "商品结构";
                        //先清空，不然会出现多个图
                        $("#chart-container")[0].innerHTML = ""
                        $("#chart-container").orgchart({
                            "data": result[0],
                            'direction': 'l2r',
                            "nodeContent": "title"
                        });
                    }
                });
            },
            showGoodsBomBtn: function(a, b, c) {
                var row = viewModel.simpleList.getSelectedRows();
                if (row.length != 1) {
                    toastr.warning("请选择一条数据！");
                    return;
                }
                viewModel.showGoodsBom(1, row[0].rowId)
                // var route = $(".goodsbomtreeclass");
                // route.eq(0).trigger("click");
            },
            //跳转单据详情页
            goDetailPanel: common.bill.goDetailPanel,
            //返回列表页
            retListPanel: common.bill.retListPanel,
            //返回
            backPanel: function() {
                if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                    $("#code-text").empty();
                    viewModel.search();
                    viewModel.retListPanel();
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                } else {
                    common.dialog.confirmDialog({
                        msg1: "确认返回列表页？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function() {
                            $("#code-text").empty();
                            viewModel.search();
                            viewModel.retListPanel();
                            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
                        }
                    });
                }
            },
            //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
            //特殊字符处理
            escapeChars: function(str) {
                //转义字符
                str = str.replace(/&lt;/g, "<");
                str = str.replace(/&gt;/g, ">");
                str = str.replace(/&quot;/g, "\"");
                //十进制
                str = str.replace(/&#34;/g, "\"");
                str = str.replace(/&#39;/g, "'");
                str = str.replace(/&#60;/g, "<");
                str = str.replace(/&#62;/g, ">");
                return str;
            },
            createNewVersion: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length == 1) {
                    viewModel.newVersion(1, selectedRows[0].rowId);
                } else {
                    toastr.warning("请选择一条数据！");
                    return;
                }

            },
            //复制商品，目前做法是复制新版本，并且版本号设置为1，code清空。
            createCopyGoods: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length == 1) {
                    viewModel.copyGoods("-2", selectedRows[0].rowId);
                } else {
                    toastr.warning("请选择一条数据！");
                    return;
                }
            },

            copyGoods: function(index, rowId) {
                //第一遍设置newVersion状态是给编辑方法传值，用以修改isEnable属性，但编辑方法会修改单据状态，因此调用beforeEdit后仍需再次赋值。
                viewModel.billPanelStatus("newVersion");
                viewModel.beforeEdit(index, rowId);
                viewModel.billPanelStatus("newVersion");
                var goodsRow = viewModel.simpleList.getFocusRow();
                var goods = goodsRow.getSimpleData();
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/get-LatestVersion",
                    type: "get",
                    data: {
                        code: goods.code
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {
                        viewModel.simpleList.setValue("code", null);
                        viewModel.simpleList.setValue("version", 1);
                        viewModel.simpleList.setValue("originalGoodsId", data["originalGoodsId"]);
                        viewModel.simpleList.setValue("id", null);
                        viewModel.simpleList.setValue("isEnable", "0");
                        var productId = viewModel.app.getComp("productId");
                        var prodAttrStrucId = viewModel.app.getComp("prodAttrStrucId");
                        var goodscategoryId = viewModel.app.getComp("goodscategoryId");
                        var brandId = viewModel.app.getComp("brandId");
                        var productLineId = viewModel.app.getComp("productLineId");
                        var basicUnitId = viewModel.app.getComp("basicUnitId");
                        var assistUnitId = viewModel.app.getComp("assistUnitId");
                        var conversionRate = viewModel.app.getComp("conversionRate");
                        var model = viewModel.app.getComp("model");

                        productId.setEnable(false);
                        basicUnitId.setEnable(false);
                        assistUnitId.setEnable(false);
                        if (goods.basicUnitId == goods.assistUnitId) {
                            conversionRate.setEnable(false);
                        }
                        if (data.productId && data.productId != "") {
                            prodAttrStrucId.setEnable(false);
                            model.setEnable(false);
                            goodscategoryId.setEnable(false);
                            brandId.setEnable(false);
                            productLineId.setEnable(false);
                        }

                    }
                });

            },
            newVersion: function(index, rowId) {
                //第一遍设置newVersion状态是给编辑方法传值，用以修改isEnable属性，但编辑方法会修改单据状态，因此调用beforeEdit后仍需再次赋值。
                viewModel.billPanelStatus("newVersion");
                viewModel.beforeEdit(index, rowId);
                viewModel.billPanelStatus("newVersion");
                // var goodsRow = viewModel.simpleList.getRowByRowId(rowId);
                // var goods = goodsRow.getSimpleData();
                var goodsRow = viewModel.simpleList.getFocusRow();
                var goods = goodsRow.getSimpleData();
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/get-LatestVersion",
                    type: "get",
                    data: {
                        code: goods.code
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data) {

                        viewModel.simpleList.setValue("version", data.version + 1);
                        viewModel.simpleList.setValue("originalGoodsId", data["originalGoodsId"]);
                        viewModel.simpleList.setValue("id", data["id"]);
                        viewModel.simpleList.setValue("isEnable", "0");
                        var productId = viewModel.app.getComp("productId");
                        var prodAttrStrucId = viewModel.app.getComp("prodAttrStrucId");
                        var goodscategoryId = viewModel.app.getComp("goodscategoryId");
                        var brandId = viewModel.app.getComp("brandId");
                        var productLineId = viewModel.app.getComp("productLineId");
                        var basicUnitId = viewModel.app.getComp("basicUnitId");
                        var assistUnitId = viewModel.app.getComp("assistUnitId");
                        var conversionRate = viewModel.app.getComp("conversionRate");
                        var model = viewModel.app.getComp("model");

                        productId.setEnable(false);
                        basicUnitId.setEnable(false);
                        assistUnitId.setEnable(false);
                        if (goods.basicUnitId == goods.assistUnitId) {
                            conversionRate.setEnable(false);
                        }
                        if (data.productId && data.productId != "") {
                            prodAttrStrucId.setEnable(false);
                            model.setEnable(false);
                            goodscategoryId.setEnable(false);
                            brandId.setEnable(false);
                            productLineId.setEnable(false);
                        }

                    }
                });

            },
            //点击取消 单据页
            cancelHandle: function() {
                viewModel.search();
                viewModel.retListPanel();
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
            },
            beforeEdit: function(index, rowId) {
                viewModel.index = index;
                if (index != "-1" && typeof index != "number" ) {
                    rowId = viewModel.simpleList.getCurrentRow().rowId;
                    if(index!="-2") index = viewModel.simpleList.getIndexByRowId(rowId);
                    viewModel.index = index;
                }
                viewModel.goBillPanel();
                $("#goodsBase").show();
                $("#goodsBase_show").hide();
                //设置tab显示基本信息
                $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab")
                    .removeClass("is-active");
                $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel")
                    .removeClass("is-active");
                //富文本
                if (!editor) {
                    editor = KindEditor.create("#editEditor", {
                        uploadJson: "/iuap-saas-filesystem-service/file/upload"
                    });
                }

                //有时会因为前一条数据导致很多框不可编辑，因此在打开框时修复
                var productId = viewModel.app.getComp("productId");
                var prodAttrStrucId = viewModel.app.getComp("prodAttrStrucId");
                var goodscategoryId = viewModel.app.getComp("goodscategoryId");
                var brandId = viewModel.app.getComp("brandId");
                var productLineId = viewModel.app.getComp("productLineId");
                var basicUnitId = viewModel.app.getComp("basicUnitId");
                var assistUnitId = viewModel.app.getComp("assistUnitId");
                var conversionRate = viewModel.app.getComp("conversionRate");
                var model = viewModel.app.getComp("model");
                var enableBatchNumberManage = viewModel.app.getComp("enableBatchNumberManage");
                var enableStrucManage = viewModel.app.getComp("enableStrucManage");
                productId.setEnable(true);
                prodAttrStrucId.setEnable(true);
                goodscategoryId.setEnable(true);
                brandId.setEnable(true);
                productLineId.setEnable(true);
                basicUnitId.setEnable(true);
                assistUnitId.setEnable(true);
                conversionRate.setEnable(true);
                model.setEnable(true);
                enableBatchNumberManage.setEnable(true);
                enableStrucManage.setEnable(true);
                viewModel.fileArr = undefined;
                if (index == -1) {
                    viewModel.isNewCreat = true;
                    // viewModel.picArr = [];
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
                    var GoodsRow = viewModel.simpleList.createEmptyRow();
                    viewModel.simpleList.setRowFocus(GoodsRow);
                    $.ajax({
                        type: 'get',
                        async: 'false',
                        url: appCtx + viewModel.baseurl + "/get-uuid",
                        success: function(uuid) {
                            viewModel.pk = uuid;
                            GoodsRow.setValue('id', uuid);
                        }
                    });
                    viewModel.picArr = [];
                    viewModel.attachList = [];
                    viewModel.goodsrelpictures = [];
                    editor.html("");
                } else {
                    viewModel.isNewCreat = false;
                    var GoodsRow = viewModel.simpleList.getRowByRowId(rowId);
                    viewModel.simpleList.setRowFocus(GoodsRow);
                    //如果是点击新版本方法调用编辑方法，设置启用状态为0，在此处设置，是因为之后步骤中，会根据启用状态，控制特征属性的是否可编辑状态。
                    if (viewModel.billPanelStatus() == "newVersion") {
                        viewModel.simpleList.setValue("isEnable", "0");
                    } else if (GoodsRow.getSimpleData().isEnable == 1) {
                        viewModel.simpleList.setValue("isEnable", "1");
                    }
                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                    // var GoodsRow = viewModel.simpleList.getRowByRowId(rowId);
                    // viewModel.simpleList.setRowFocus(GoodsRow);
                    viewModel.pk = GoodsRow.getSimpleData().id;
                    if (GoodsRow.getSimpleData().isEnable == "1") {
                        //如果已启用，则以下属性不可编辑，//设置延迟是因为，不设置会导致特征属性值不显示
                        // setTimeout(function () {
                        productId.setEnable(false);
                        // 需求变更，启用商品也可修改商品分类
                        // goodscategoryId.setEnable(false);
                        productLineId.setEnable(false);
                        basicUnitId.setEnable(false);
                        assistUnitId.setEnable(false);
                        enableBatchNumberManage.setEnable(false);
                        enableStrucManage.setEnable(false);
                        // }, 0);
                    }
                    //如果存在所属产品，则以下属性不可编辑
                    if (GoodsRow.getSimpleData().productId) {
                        goodscategoryId.setEnable(false);
                        model.setEnable(false);
                        prodAttrStrucId.setEnable(false);
                        productLineId.setEnable(false);
                        brandId.setEnable(false);
                    }
                    if (GoodsRow.getSimpleData().basicUnitId == GoodsRow.getSimpleData().assistUnitId) {
                        conversionRate.setEnable(false);
                    }
                    //编辑时，如果商品为可选配属性，则表示当前特征属性结构存在可选配属性。（用于保存时校验）
                    if (GoodsRow.getSimpleData().isOptional == 1) {
                        viewModel.isOptional = 1;
                    }
                    var goodsAttrVals = GoodsRow.getSimpleData().goodsAttrVals;
                    // viewModel.setGoodsAttr(goodsAttrVals)
                    viewModel.queryImage();
                    viewModel.queryAttach();
                    var strHtml = viewModel.escapeChars(GoodsRow.getSimpleData().description || "");
                    editor.html(strHtml);

                }
                viewModel.loadTemplate(GoodsRow.getSimpleData().prodAttrStrucId);
                viewModel.showPicture();
                viewModel.showAttachment();
            },
            validate: function(element) {
                var result = viewModel.app.compsValidateMultiParam({
                    element: element,
                    showMsg: true
                });
                return result;
            },
            //点击保存
            saveHandle: function() {
                var baseInfo = $("#baseInfo")[0];
                var channelInfo = $("#channelInfo")[0];
                var manageInfo = $("#manageInfo")[0];
                var eBusinessInfo = $("#eBusinessInfo")[0];
                var eBusinessPass = viewModel.validate(eBusinessInfo);
                var managePass = viewModel.validate(manageInfo);
                var channelPass = viewModel.validate(channelInfo);
                var basePass = viewModel.validate(baseInfo);
                if (basePass.passed && channelPass.passed && managePass.passed && eBusinessPass.passed) {
                    var postdata = viewModel.simpleList.getFocusRow().getSimpleData();
                    var description = editor.html() + "";
                    postdata.description = description;
                    var type = "post";
                    // viewModel.pk是在新增时获取pk时赋值的，有值时说明其是新增而非修改
                    // 使用viewModel.index 判断是否新增赋值和修改， 新增赋值 == -1  复制 -2
                    if(viewModel.index != -1 && viewModel.index != -2) {
                        type = "put";
                    }
                    /* if (postdata.id && !viewModel.pk) {
                        type = "put";
                    } */ else {
                        //新增和新版本时，传入 是最新版本
                        postdata.isLatestVersion = 1
                    }
                    if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.ADD) {
                        postdata.version = 1;
                    }
                    //新版本时，状态为新增
                    if (viewModel.billPanelStatus() == "newVersion") {
                        postdata.persistStatus = "new";
                    }
                    //15、	（曲美增加，20180730）可选配的商品必须存在可选配的特征属性，否则不允许保存。
                    if (postdata.isOptional == 1 && viewModel.isOptional != 1) {
                        toastr.warning("可选配的商品必须存在可选配的特征属性");
                        return;
                    }
                    if (postdata.basicUnitId == postdata.assistUnitId && postdata.conversionRate != 1) {
                        toastr.warning("销售单位与订货单位相同时，转化率只能为1");
                        return;
                    }
                    if (postdata.isOnSle == 1) {
                        if (postdata.logisticsModeCode == 0) {
                            toastr.warning("电商在售为是时，物流方式不可为空");
                            return;
                        }
                    }
                    var goodsAttr = viewModel.goodsAttrExt.getSimpleData()[0];
                    var goodsAttrVals = [];
                    //将可选配属性选择的一条中多数据，拆分成多条数据。
                    for (var key in goodsAttr) {
                        if (key == "null" || key == "persistStatus") {
                            continue;
                        }
                        //是否是文本类型，跟参照数组进行对比；
                        var flag = false;
                        for (var i = 0; i < viewModel.goodsAttrDataSource.length; i++) {
                            if (viewModel.goodsAttrDataSource[i].id == key && goodsAttr[key] != null && viewModel.goodsAttrDataSource[i].productAttrType == "04") {
                                flag = true;
                            }
                        }
                        if (flag) {
                            var attr = {};
                            attr.prodAttrStrucItemId = key
                            attr.attrValCode = goodsAttr[key];
                            attr.goodsId = postdata.id;
                            attr.productAttrTypeCode = "04";
                            goodsAttrVals.push(attr);
                            // break;
                            continue;
                        }

                        //兼容了错误数据，有一条未知的属性结构被挂在数据上。
                        if (!$("#refContainer" + key).data("uui.refer")) {
                            continue;
                        }
                        var attrVal = $("#refContainer" + key).data("uui.refer").values
                        if (attrVal && attrVal.length > 0) {
                            //取productAttrType
                            var productAttrType = "";
                            for (var i = 0; i < viewModel.goodsAttrDataSource.length; i++) {
                                if (viewModel.goodsAttrDataSource[i].id == key) {
                                    productAttrType = viewModel.goodsAttrDataSource[i].productAttrType;
                                }
                            }
                            for (var i = 0; i < attrVal.length; i++) {
                                var attr = {};
                                attr.prodAttrStrucItemId = key
                                if (!attrVal[i].refpk) {
                                    continue;
                                }
                                attr.attrValId = attrVal[i].refpk;
                                attr.attrValCode = attrVal[i].refcode;
                                attr.attrValName = attrVal[i].refname;
                                attr.goodsId = postdata.id;
                                attr.productAttrTypeCode = productAttrType;
                                goodsAttrVals.push(attr);
                            }
                        }
                    }
                    //有选配属性的情况下，遍历可选配属性，如果没有选择任何值，则默认为全选
                    // 修改为 可选配属性，如果没有选择任何值，传一条空数据
                    if (viewModel.goodsAttrDataSource && viewModel.goodsAttrDataSource.length > 0) {
                        var productAttrIdArr = []
                        var productAttrItemIdArr = []
                        var productAttrTypeCodeArr = []
                        for (var i = 0; i < viewModel.goodsAttrDataSource.length; i++) {
                            if (!viewModel.goodsAttrDataSource[i].isOptionalAttr) {
                                continue;
                            }
                            //是否已勾选改选配属性
                            var flag = false
                            for (var key in goodsAttr) {
                                if (key == viewModel.goodsAttrDataSource[i].id && goodsAttr[key] != undefined && goodsAttr[key] != null && goodsAttr[key] != "") {
                                    flag = true;
                                    break;
                                }
                            }
                            if (!flag) {
                                var productAttrItemId = viewModel.goodsAttrDataSource[i].id;
                                var productAttrId = viewModel.goodsAttrDataSource[i].productAttrId;
                                var productAttrTypeCode = viewModel.goodsAttrDataSource[i].productAttrType;
                                productAttrIdArr.push(productAttrId)
                                productAttrItemIdArr.push(productAttrItemId)
                                productAttrTypeCodeArr.push(productAttrTypeCode)
                            }
                        }
                        //传一条空数据
                        if (productAttrItemIdArr && productAttrItemIdArr.length > 0) {
                            for (var i = 0; i < productAttrItemIdArr.length; i++) {
                                var attr = {};
                                attr.prodAttrStrucItemId = productAttrItemIdArr[i]
                                attr.attrValId = "";
                                attr.attrValCode = "";
                                attr.attrValName = "";
                                attr.productAttrTypeCode = productAttrTypeCodeArr[i]
                                attr.goodsId = postdata.id;
                                goodsAttrVals.push(attr);
                            }
                        }
                    }
                    postdata.goodsAttrVals = goodsAttrVals;
                    for (var i = 0; i < viewModel.goodsrelpictures.length; i++) {
                        delete viewModel.goodsrelpictures[i].url;
                    }

                    postdata.goodsRelPictures = viewModel.goodsrelpictures;
                    viewModel.edit(type, postdata);
                } else {
                    postdata.goodsAttrVals = goodsAttrVals;
                    viewModel.edit(type, postdata);
                }
            },

            //将操作后的数据进行保存
            edit: function(type, postdata) {
                $._ajax({
                    url: appCtx + viewModel.baseurl + "/check-unique",
                    type: "post",
                    data: JSON.stringify(postdata),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function() {
                        u.hideLoader();
                    },
                    success: function(flag) {
                        if (flag) {
                            $._ajax({
                                url: appCtx + viewModel.baseurl,
                                type: type,
                                data: JSON.stringify(postdata),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                complete: function() {
                                    u.hideLoader();
                                },
                                success: function(data) {
                                    // viewModel.simpleList.addSimpleData(data, "nrm", {
                                    //     unSelect: true
                                    // });
                                    viewModel.pk = data.id;
                                    $("#goodsBase").hide();
                                    $("#goodsBase_show").show();
                                    viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                                    // viewModel.simpleList.setValue("id", data.id);
                                    var focusRow = viewModel.simpleList.getFocusRow();
                                    focusRow.setSimpleData(data);
                                    viewModel.simpleList.setRowFocus(focusRow);
                                    //为展示查看页面特征属性
                                    viewModel.loadTemplate(data.prodAttrStrucId);
                                    viewModel.goodsAttrExtDetail.removeAllRows();
                                    // 反格式html文档，setSimpledat时会吧html文档格式
                                    if(data.description){
                                        $(".ui-detail-description .ui-inputarea div").html(data.description);
                                    }
                                    // 新增保存后，把上传的图片保存，并与商品建立关联
                                    viewModel.saveBillCallbackGoods();
                                    toastr.success("保存成功");
                                }
                            });
                        } else {
                            common.dialog.confirmDialog({
                                msg1: "已经有名称+规格+特征属性重复的商品.",
                                msg2: "是否继续保存?",
                                width: "400px",
                                type: "error",
                                onOk: function() {
                                    $._ajax({
                                        url: appCtx + viewModel.baseurl,
                                        type: type,
                                        data: JSON.stringify(postdata),
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        complete: function() {
                                            u.hideLoader();
                                        },
                                        success: function(data) {
                                            viewModel.simpleList.addSimpleData(data, "nrm", {
                                                unSelect: true
                                            });
                                            viewModel.pk = data.id;
                                            $("#goodsBase").hide();
                                            $("#goodsBase_show").show();
                                            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                                            // viewModel.simpleList.setValue("id", data.id);
                                            var focusRow = viewModel.simpleList.getFocusRow();
                                            focusRow.setSimpleData(data);
                                            viewModel.simpleList.setRowFocus(focusRow);
                                            //为展示查看页面特征属性
                                            viewModel.loadTemplate(data.prodAttrStrucId);
                                            viewModel.goodsAttrExtDetail.removeAllRows();
                                            toastr.success("保存成功");
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            },
            //删除和批量删除
            del: function(data, rowId) {
                if (typeof(data) == "number") {
                    viewModel.simpleList.setRowSelectbyRowId(rowId);
                }
                var ids = [];
                var rows = viewModel.simpleList.getSelectedRows();
                if (rows && rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].getValue("id"));
                    }
                    common.dialog.confirmDialog({
                        msg1: "确认删除这些项？",
                        msg2: "此操作不可逆",
                        width: "400px",
                        type: "error",
                        onOk: function() {
                            $._ajax({
                                url: appCtx + viewModel.baseurl + "/delete",
                                type: "post",
                                // data: "ids=" + ids.join(","),
                                data: {
                                    ids: ids.join(",")
                                },
                                success: function(data) {
                                    viewModel.simpleList.removeRows(rows);
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
                    viewModel.simpleList.pageIndex(0);
                }
                viewModel.simpleList.removeAllRows();
                var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
                queryData.size = viewModel.simpleList.pageSize();
                queryData.page = viewModel.simpleList.pageIndex();
                $._ajax({
                    type: "get",
                    url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
                    dataType: "json",
                    data: queryData,
                    success: function(data) {
                        viewModel.simpleList.setSimpleData(data.content, {
                            unSelect: true
                        });
                        viewModel.simpleList.totalRow(data.totalElements);
                        viewModel.simpleList.totalPages(data.totalPages);
                    }
                });
            },
            //清空搜索条件
            cleanSearch: function() {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function(index) {
                viewModel.simpleList.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function(size) {
                viewModel.simpleList.pageSize(size);
                viewModel.search(true);
            },
            //启用
            enable: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    });
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
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //停用
            disable: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    });
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


            //上架
            onshelf: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {

                    for (var i = 0; i < selectedRows.length; i++) {
                        if (selectedRows[i].getValue("isEnable") != "1") {
                            toastr.warning("不能上架未启用的商品");
                            return
                        }
                    }
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-onshelf",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isOnShelf", "1");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //下架
            unonshelf: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-unonshelf",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {
                                selectedRows[i].setValue("isOnShelf", "0");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },

            //启用批次
            enableBatchNumber: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        if (row.getValue("isEnable") == 1) {
                            toastr.warning("已启用的数据不可修改是否启用批次管理");
                        }
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-on-batchmanage",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {

                                selectedRows[i].setValue("enableBatchNumberManage", "1");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },
            //停用批次
            disableBatchNumber: function() {
                var selectedRows = viewModel.simpleList.getSelectedRows();
                if (selectedRows && selectedRows.length > 0) {
                    var ids = selectedRows.map(function(row, index, arr) {
                        if (row.getValue("isEnable") == 1) {
                            toastr.warning("已启用的数据不可修改是否启用批次管理");
                        }
                        return row.getValue("id");
                    });
                    $._ajax({
                        type: "post",
                        url: appCtx + viewModel.baseurl + "/batch-off-batchmanage",
                        data: {
                            ids: ids.join(",")
                        },
                        success: function(res) {
                            for (var i = 0; i < selectedRows.length; i++) {

                                selectedRows[i].setValue("enableBatchNumberManage", "0");
                            }
                        }
                    });
                } else {
                    toastr.warning("请至少选择一项");
                }
            },


            detail: function(index, rowId) {
                viewModel.beforeEdit(index, rowId);
                $("#goodsBase").hide();
                $("#goodsBase_show").show();
                setTimeout(function() {
                    var num = $(".ui-bill-panel").find("ui-detail").find("div.ui-item").length;
                    for (var i = 0; i < num; i++) {
                        var title = $(".ui-bill-panel").find("ui-detail").find("div.ui-item")[i].childNodes[1].childNodes[0].innerHTML
                        $($(".ui-bill-panel").find("ui-detail").find("div.ui-item")[i].childNodes[1].childNodes[0]).attr("title", title)
                    }
                    // viewModel.goDetailPanel();
                }, 0);
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                var goodsRow = viewModel.simpleList.getRowByRowId(rowId);
                viewModel.loadTemplate(goodsRow.getSimpleData().prodAttrStrucId);
                viewModel.goodsAttrExtDetail.removeAllRows();
                // 反格式html文档，setSimpledat时会吧html文档格式
                $(".ui-detail-description .ui-inputarea div").html(goodsRow.getSimpleData().description.replace(/&#60;/g, "<").replace(/&#34;/g, '"').replace(/&#39;/g, "'"))

                //下方代码是详情页面中给产品字段增加跳转方法
                var params = {
                    id: goodsRow.getSimpleData().productId
                }
                var productName = goodsRow.getSimpleData().productName ? goodsRow.getSimpleData().productName : ''
                var hrefValue = "index-view.html?" + common.toUrlParam(params) + "#/product";
                var detailfun = "data-bind=click:productDetail.bind($data," + 0 + ")";
                $("#baseInfo_show")[0].childNodes[1].childNodes[0].childNodes[1].innerHTML =
                    '<a href=' + hrefValue + ' value="product" name="产品" class="ui-a-detail" ' +
                    detailfun +
                    ">" +
                    productName + "</a>";
                ko.cleanNode($("#baseInfo_show")[0].childNodes[1].childNodes[0].childNodes[1]);
                ko.applyBindings(viewModel, $("#baseInfo_show")[0].childNodes[1].childNodes[0].childNodes[1]);

            },
            //导入
            importHandle: function() {
                var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
                var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
                var ele = $("#importFiel")[0]; //挂载元素
                common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
            },
            //导出
            exportHandle: function() {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
                var listData = viewModel.simpleList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
            },
            //导出PDF
            exportHandlePdf: function() {
                var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
                var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
                var listData = viewModel.simpleList; //需要导出表格的dataTable
                var ele = $("#exportFiel")[0]; //挂载元素
                //是否导出pdf的标识
                var isPdf = "1"
                common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl, null, isPdf);
            },
            loadTemplate: function(prodAttrStrucId) {
                $("#goods-detail-attr").empty();
                $("#goods-card-attr").empty();
                // 若为父节点则清空当前模板
                if (!prodAttrStrucId) {
                    $("#goods-card-attr").empty();
                    viewModel.goodsAttrDataSource = [];
                    //没有特征属性结构时，是否可选配默认为否
                    //改为保存时校验
                    viewModel.simpleList.setValue("isOptional", "0");
                    viewModel.isOptional = 0
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

                        //改为保存时校验
                        viewModel.simpleList.setValue("isOptional", "0");
                        viewModel.isOptional = 0
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].isOptionalAttr == 1) {
                                //改为保存时校验
                                viewModel.simpleList.setValue("isOptional", "1");
                                viewModel.isOptional = 1
                                break;
                            }
                        }
                        viewModel.goodsAttrExt = new u.DataTable();
                        viewModel.goodsAttrExtDetail = new u.DataTable();
                        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                            // isDetail = true;
                            // 初始化详情页，设置为不可编辑状态
                            viewModel.initCard($("#goods-detail-attr"), options, "goodsAttrExtDetail", true);
                        }
                        viewModel.initCard($("#goods-card-attr"), options, "goodsAttrExt");
                    }
                });
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
                viewModel.goodsAttrExt.removeAllRows();
                var childrow = viewModel.goodsAttrExt.createEmptyRow();
                var childrow1 = viewModel.goodsAttrExtDetail.createEmptyRow();
                // 对模板中的组件进行初始化
                element.querySelectorAll("[u-meta]").forEach(function(ele) {
                    var options = JSON.parse(ele.getAttribute("u-meta"));
                    options["type"] = options["type"] || "string";
                    if (options && options["type"]) {
                        if (app.adjustFunc) {
                            app.adjustFunc.call(app, options);
                        }
                        var comp = u.compMgr.createDataAdapter({
                            el: ele,
                            options: options,
                            model: viewModel,
                            app: app
                        });
                        ele["u-meta"] = comp;
                        // app.comps.push(comp);
                    }
                });
                var GoodsRow = viewModel.simpleList.getFocusRow();
                var goodsId = GoodsRow.getSimpleData().id
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
                            viewModel.goodsAttrExt.setSimpleData(goodsAttr);
                            viewModel.goodsAttrExtDetail.setSimpleData(goodsAttr);
                        }
                    }
                })
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


            showPicture: function() {
                var picArr = viewModel.picArr;
                var htmlStr = "<div style=\"display:flex\" >";
                for (var i = 0; i < picArr.length; i++) {
                    htmlStr += "<div style=\"width:150px;height:200px;margin:5px\" >";

                    htmlStr += "<img width=\"150\" height=\"150\" src=\"" + picArr[i].pictureUrl + "\" />";
                    htmlStr +=
                        "<label id=\"" + (picArr[i].id ? picArr[i].id : picArr[i].pictureUrl) + "\" class=\"u-radio image-main\" for=\"option-" + i + "\"> <input type=\"radio\" id=\"option-" + i + "\" value=\"" + i + "\" class=\"u-radio-button\" name=\"options\" "
                    if (picArr[i].isMainPicture) {
                        htmlStr += "checked"
                    }
                    htmlStr += ">  <span class=\"u-radio-label\">主图</span> </label>";


                    htmlStr +=
                        "<span id=\"" + (picArr[i].id ? picArr[i].id : picArr[i].pictureUrl) + "\" class=\"image-del margin-left-10\" data-bind=\"pictureDelete\">删除</span>";
                    htmlStr += "</div>";
                }
                htmlStr +=
                    "<div id=\"goods-add-pic\" style=\"width:150px;height:150px;margin:5px;border:1px solid #aaa;\" > +</div>";
                htmlStr += "</div>";

                $("#goods-card-pic")[0].innerHTML = htmlStr;
                //图片删除按钮触发事件绑定
                $(".image-del").click(function(e) {
                    viewModel.pictureDelete(e.currentTarget.id);
                });
                $(".image-main").click(function(e) {
                    viewModel.pictureMain(e.currentTarget.id, viewModel.pk);
                });

                $("#goods-add-pic").click(function() {
                    $("#uploadbatch_id").val(undefined);
                    $("#uploadbatch_id").trigger("click");
                });

                //detail
                var detailStr = "<div style=\"display:flex\" >";
                for (var i = 0; i < picArr.length; i++) {
                    detailStr += "<div style=\"width:150px;height:200px;margin:5px\" >";

                    detailStr += "<img width=\"150\" height=\"150\" src=\"" + picArr[i].pictureUrl + "\" />";
                    detailStr += "</div>";
                }
                detailStr +=
                    "<div id=\"goods-add-pic\" style=\"width:150px;height:150px;margin:5px;border:1px solid #aaa;\" > +</div>";
                detailStr += "</div>";
                $("#goods-detail-pic")[0].innerHTML = detailStr;
            },
            //图片删除
            pictureDelete: function(id) {
                //如果是刚新增未保存的商品(此种产品没有rel关系表id，暂时以url作为id暂存)
                if (viewModel.isNewCreat) {
                    //用于存储
                    for (var i = 0; i < viewModel.goodsrelpictures.length; i++) {
                        if (viewModel.goodsrelpictures[i].url == id) {
                            viewModel.goodsrelpictures.splice(i, 1);
                            break;
                        }
                    }
                    //用于显示
                    for (var i = 0; i < viewModel.picArr.length; i++) {
                        if (viewModel.picArr[i].pictureUrl == id) {
                            viewModel.picArr.splice(i, 1);
                            viewModel.showPicture();
                            break;
                        }
                    }
                } else {
                    $._ajax({
                        url: appCtx + viewModel.goodsrelpicturreurl + "/delete",
                        type: "post",
                        data: {
                            ids: id
                        },
                        success: function(data) {
                            // viewModel.simpleList.removeRows(rows);
                            // viewModel.queryImage()
                            //用于显示
                            for (var i = 0; i < viewModel.picArr.length; i++) {
                                if (viewModel.picArr[i].pictureUrl == id) {
                                    viewModel.picArr.splice(i, 1);
                                    viewModel.showPicture();
                                    break;
                                }
                            }
                        }
                    });
                }
            },
            //设为主图
            pictureMain: function(id, goodsId) {
                //如果是刚新增未保存的商品
                if (viewModel.isNewCreat) {
                    //用于存储
                    for (var i = 0; i < viewModel.goodsrelpictures.length; i++) {
                        if (viewModel.goodsrelpictures[i].url == id) {
                            viewModel.goodsrelpictures[i].isMainPicture = '1';
                            // viewModel.showPicture();
                        }
                    }
                } else if (id.indexOf('.') == -1) {
                    $._ajax({
                        url: appCtx + viewModel.goodsrelpicturreurl + "/set-main",
                        type: "post",
                        data: {
                            id: id,
                            goodsId: goodsId
                        },
                        success: function(data) {
                            //viewModel.queryImage()
                        }
                    });
                }
            },

            //上传图片
            onFileUploadGoods: function() {
                var fileNum = $("#uploadbatch_id")[0].files.length;
                var fileSize = 0;
                var fileSizeMb = 0;
                var fileTypeArr = [];
                var filenames = [];
                var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
                var fileSizeSum = (function() {
                    for (var i = 0; i < fileNum; i++) {
                        fileSize += $("#uploadbatch_id")[0].files[i].size;
                        var fileName = $("#uploadbatch_id")[0].files[i].name;
                        var fileType = fileName
                            .substr(fileName.lastIndexOf("."))
                            .toLowerCase();
                        fileTypeArr.push(fileType);
                        filenames.push(fileName.replace(fileType, ''));
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
                    $.ajax({
                        type:'get',
                        async: false,
                        url: appCtx + viewModel.pictureurl +'?search_IN_name=' + filenames.splice(','),
                        success: function(data) {
                            if(data && data.content && data.content.length>0) {
                                var repeatPicIds = [];
                                for(var i = 0; i < data.content.length; ++i) {
                                    repeatPicIds.push(data.content[i].id);
                                }
                                common.dialog.confirmDialog({
                                    msg1: "相同名称图片已经存在，继续将覆盖原图片，是否继续？",
                                    msg2: filenames.splice(','),
                                    width: "400px",
                                    type: "warn",
                                    onOk: function () {
                                        viewModel.doFileDelete(repeatPicIds);
                                        viewModel.doupload();
                                    }
                                });
                            } else {
                                viewModel.doupload();
                            }
                        }
                    });
                } else {
                    toastr.warning("图片总和不能超过500MB");
                    return false;
                }
            },
            doupload: function() {
                //获取表单
                var pk = viewModel.pk;
                var par = {
                    fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
                    // />,可以修改，主要看你使用的 id是什么
                    filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                    groupname: pk, //【必填】分組名称,未来会提供树节点
                    permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
                    url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
                    uploadPic: true, //覆盖上传
                    isreplace: true,
                    //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                    cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                };
                var f = new interface_file();
                f.filesystem_upload(par, viewModel.fileUploadCallbackGoods);
            },

            doFileDelete: function(ids) {
                $._ajax({
                    url:appCtx + viewModel.pictureurl + "/delete",
                    type:"post",
                    async: false,
                    data:{
                        ids:ids.join(",")
                    },
                    success:function(){
                        // toastr.success("删除成功");
                        // viewModel.search();
                    }
                });
            },

            fileDelete: function(id) {
                var par = {
                    id: id, //【必填】表的id
                    cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                };
                var f = new interface_file();
                f.filesystem_delete(par, viewModel.fileDeleteCallBack);
                // }
            },
            //附件删除回调
            fileDeleteCallBack: function(data) {
                if (1 == data.status) { //删除成功状态
                    // viewModel.queryImage();
                    viewModel.queryAttach();
                } else {
                    toastr.error(data.message);
                }
            },

            //上传图片回传信息
            fileUploadCallbackGoods: function(data) {

                if (1 == data.status) {
                    if (!viewModel.fileArr) {
                        viewModel.fileArr = [];
                    }
                    for (var i = 0; i < data.data.length; ++i) {
                        var fileObj = {};
                        var uploadTime = new Date();
                        fileObj.name = data.data[i].filename.substring(0, data.data[i].filename.indexOf((".")));
                        fileObj.code = "code0001";
                        fileObj.isEnable = 1;
                        fileObj.fileUrl = data.data[i].url;
                        fileObj.persistStatus = "new";
                        fileObj.uploadTime = uploadTime;
                        // fileObj.pictureId = data.data[i].id

                        viewModel.fileArr.push(fileObj);
                        //新增商品时暂存在picArr中，需要这个字段存储地址（由于存储和获取时url字段接口传输的字段名不同导致）
                        fileObj.pictureUrl = data.data[i].url;
                        viewModel.picArr.push(fileObj);
                    }
                    viewModel.showPicture();
                } else {
                    toastr.error(data.message);
                }
            },
            saveBillCallbackGoods: function() {
                var fileArr = viewModel.fileArr;
                if (!fileArr) {
                    return;
                }
                $._ajax({
                    url: appCtx + viewModel.pictureurl + '/batch-save',
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(fileArr),
                    success: function(data) {
                        var goodsrelpictures = [],
                            radios = $("input[name='options']"),
                            isMainNum = $("input[name='options']:checked").val(),
                            rLen = radios.length,
                            dLen = data.length;
                        for (var i = 0; i < dLen; i++) {
                            var goodsrelpicture = {};
                            goodsrelpicture.goodsId = viewModel.pk;
                            goodsrelpicture.pictureId = data[i].id;
                            if ((viewModel.isNewCreat && isMainNum == i) || (!viewModel.isNewCreat && isMainNum >= (rLen - dLen))) {
                                goodsrelpicture.isMainPicture = 1;
                            } else {
                                goodsrelpicture.isMainPicture = 0;
                            }
                            goodsrelpicture.isEnable = 1;
                            goodsrelpicture.url = data[i].fileUrl;
                            goodsrelpictures.push(goodsrelpicture);
                            viewModel.goodsrelpictures.push(goodsrelpicture);
                        }

                        if (viewModel.pk) {
                            $._ajax({
                                url: appCtx + viewModel.goodsrelpicturreurl + "/batch-save",
                                type: "post",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(goodsrelpictures),
                                success: function(data) {
                                    //上传后当时不显示
                                    // viewModel.queryImage();
                                }
                            });
                        } else {
                            viewModel.showPicture();
                        }
                    }
                });
            },

            queryImage: function() {
                $._ajax({
                    type: "get",
                    dataType: "json",
                    url: appCtx + viewModel.goodsrelpicturreurl + '/find-pictures',
                    data: {
                        "goodsId": viewModel.pk
                    },
                    success: function(data) {
                        viewModel.picArr = data;
                        viewModel.showPicture();
                    }
                });
            },

            showAttachment: function() {
                // app.getComp("c1").setComboData([{ value: 'test1', name: '附件一678' }, { value: 'test2', name: '附件二' }])
                var attachList = viewModel.attachList;
                var htmlStr = "<div>";
                for (var i = 0; i < attachList.length; i++) {
                    // htmlStr += "<img width=\"150\" height=\"150\" src=\""+picArr[i].url+"\" style=\"margin:5px;\"\/>"
                    htmlStr += "<div style=\"display:flex\">";
                    htmlStr += "<input id=\"" + attachList[i].id + "\" class=\"attachSelect\" type=\"checkbox\">";
                    htmlStr += "<span>" + attachList[i].filename + "</span>";
                    htmlStr +=
                        "<a id=\"down_" + attachList[i].id + "\" href=\"" + attachList[i].url + "\" download = \"" +
                        attachList[i].filename.split("\.")[0] + "\">下载</a>";
                    htmlStr +=
                        "<div id=\"" + attachList[i].id + "\" class=\"attach-del\" data-bind=\"fileDelete\">删除</div>";
                    htmlStr += "</div>";
                }
                htmlStr += "</div>";

                $("#goods-card-attach")[0].innerHTML = htmlStr;
                $("#goods-add-attach").click(function() {
                    $("#attachuploadbatch_id").val(undefined);
                    $("#attachuploadbatch_id").trigger("click");
                });
                $(".attach-del").click(function(e) {
                    viewModel.fileDelete(e.currentTarget.id);
                });
                //detail页面
                var detailStr = "<div>";
                for (var i = 0; i < attachList.length; i++) {
                    detailStr += "<div style=\"display:flex\">";
                    // detailStr += "<input id=\"" + attachList[i].id + "\" class=\"attachSelect\" type=\"checkbox\">"
                    detailStr += "<span>" + attachList[i].filename + "</span>";
                    // detailStr += "<a id=\"down_" + attachList[i].id + "\" href=\"" + attachList[i].url + "\"
                    // download = \"" + attachList[i].filename.split("\.")[0] + "\">下载</a>"
                    detailStr += "</div>";
                }
                detailStr += "</div>";

                $("#goods-detail-attach")[0].innerHTML = detailStr;

            },
            btnDelAttach: function() {
                var row = $(".attachSelect");

                for (var i = 0; i < row.length; i++) {
                    if (!row[i].checked) {
                        continue;
                    }
                    viewModel.fileDelete(row[i].id);
                }
            },

            downLoadAttachBatch: function() {
                //下载
                var row = $(".attachSelect");

                for (var i = 0; i < row.length; i++) {
                    if (!row[i].checked) {
                        continue;
                    }
                    var pk = "down_" + row[i].id;
                    $("#" + pk)[0].click();
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


            downLoadAttach: function() {
                //下载
                var row = viewModel.attachList;

                for (var i = 0; i < row.length; i++) {
                    var pk = "down_" + row[i].id;
                    $("#" + pk).trigger("click");
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
            btnUploadAttach: function() {
                $("#attachuploadbatch_id").val(undefined);
                $("#attachuploadbatch_id").trigger("click");

            },
            uploadAttach: function() {
                var fileNum = $("#attachuploadbatch_id")[0].files.length;
                var fileSize = 0;
                var fileSizeMb = 0;
                var fileTypeArr = [];

                var pk = viewModel.pk;
                var par = {
                    fileElementId: "attachuploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file"
                    // name="file"
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

            uploadAttachCallback: function(data) {
                if (1 == data.status) {
                    //上传成功状态
                    for (var i = 0; i < data.data.length; ++i) {
                        viewModel.attachList.push(data.data[i]);
                        viewModel.showAttachment();
                    }
                } else {
                    //error 或者加載js錯誤
                    toastr.error(data.message);
                }
            },
            queryAttach: function() {
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

            queryAttachCallback: function(data) {
                if (1 == data.status) {
                    //上传成功状态
                    viewModel.attachList = data.data;
                    viewModel.showAttachment();
                } else {
                    //删除成功后查询
                    if (data.status == 0 && !data.data) {
                        viewModel.attachList = [];
                    }
                    viewModel.showAttachment();
                }
            }
        },


        afterCreate: function() {

            var routes = $(".goodsbomtreeclass");
            for (var i = 0; i < routes.length; i++) {
                routes.eq(i).on("click", function(e) {
                    e.preventDefault();
                    // var menu = parent.parent.getCurrentMenu("cusReqForm")
                    // if (menu.id) {
                    parent.parent.handleClick(e, 1);
                    // }
                })
            }

            //viewModel.search();
            viewModel.simpleList.on("prodAttrStrucId.valuechange", function(obj) {
                // model.options.metas.Goodsmeta;
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
                    cust_doc_code_batch: "GOODS_LIFECYCLE,LOGISTICS_MODE,VIRTUAL_LINK"
                },
                success: function(data) {
                    var newarray;
                    newarray = common.dataconvert.toMap(data["GOODS_LIFECYCLE"], "name", "code");
                    var logisticsArray = common.dataconvert.toMap(data["LOGISTICS_MODE"], "name", "code");
                    var virtualLinkArray = common.dataconvert.toMap(data["VIRTUAL_LINK"], "name", "code");
                    viewModel.goodsLifecycleDatasource(newarray);
                    viewModel.logisticsModeDatasource(logisticsArray);
                    viewModel.virtualLinkDatasource(virtualLinkArray);
                }
            });

            // 选择上传文件后，直接调用上传方法
            $("#piciptwrap").on("change", "#uploadbatch_id", function() {
                if (this.value) {
                    viewModel.onFileUploadGoods();
                }
            });
            // 选择上传文件后，直接调用上传方法
            $("#fileiptwrap").on("change", "#attachuploadbatch_id", function() {
                if (this.value) {
                    viewModel.uploadAttach();
                }
            });
            // 基本信息
            viewModel.simpleList.on("isEnable.valuechange", function(
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
            viewModel.simpleList.on("productId.valuechange", function(obj) {
                if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                    return;
                }
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
                    // basicUnitId.setEnable(false);
                    $._ajax({
                        type: "get",
                        url: appCtx + viewModel.productUrl + "/" + productId,
                        success: function(data) {
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
                } else {
                    prodAttrStrucId.setEnable(true);
                    goodscategoryId.setEnable(true);
                    brandId.setEnable(true);
                    productLineId.setEnable(true);
                    // basicUnitId.setEnable(true);
                }
            });

            //电商虚拟连接 选择后，将服务类字段设为是
            viewModel.simpleList.on("virtualLinkCode.valuechange", function(obj) {
                if (obj.newValue != 0) {
                    viewModel.simpleList.setValue("isServiceType", 1);
                }
            });

            //订货单位和换算率跟随销售单位变化
            viewModel.simpleList.on("basicUnitId.valuechange", function(obj) {
                if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                    return;
                }
                var rowData = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData();
                if (rowData.assistUnitId == undefined || rowData.assistUnitId == "") {
                    viewModel.simpleList.setValue("assistUnitId", rowData.basicUnitId);
                    viewModel.simpleList.setValue("conversionRate", 1);
                }
            });


            //订货单位和换算率跟随销售单位变化
            viewModel.simpleList.on("basicUnitId.valuechange", function(obj) {
                if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                    return;
                }
                var rowData = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData();
                if (rowData.assistUnitId == undefined || rowData.assistUnitId == "") {
                    viewModel.simpleList.setValue("assistUnitId", rowData.basicUnitId);
                    viewModel.simpleList.setValue("conversionRate", 1);
                }
            });

            //订货单位和换算率跟随销售单位变化
            viewModel.simpleList.on("assistUnitId.valuechange", function(obj) {
                if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                    return;
                }
                var rowData = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData();
                if (rowData.basicUnitId == undefined || rowData.basicUnitId == "") {
                    viewModel.simpleList.setValue("basicUnitId", rowData.assistUnitId);
                    viewModel.simpleList.setValue("conversionRate", 1);
                }
            });

            viewModel.simpleList.on("goodsCategoryId.valuechange", function(obj) {
                if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                    return;
                }
                var goodsCategoryId = obj.newValue;
                var productId = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData().productId;
                var comp = viewModel.app.getComp("prodAttrStrucId");
                if (productId && productId != "") {
                    return;
                }
                $._ajax({
                    type: "get",
                    url: appCtx + viewModel.goodsCategorytUrl + "/" + goodsCategoryId,
                    success: function(data) {
                        var prodAttrStrucId = viewModel.simpleList.getRowByRowId(obj.rowId).getSimpleData().prodAttrStrucId;
                        if (prodAttrStrucId && prodAttrStrucId != "") {

                        } else {
                            viewModel.simpleList.setValue("prodAttrStrucId", data.defaultProdAttrStrucId);
                            viewModel.simpleList.setValue("prodAttrStrucCode", data.defaultProdAttrStrucCode);
                            viewModel.simpleList.setValue("prodAttrStrucName", data.defaultProdAttrStrucName);
                        }
                        // viewModel.simpleList.getRowByRowId(obj.rowId).setSimpleData(rowData)
                        viewModel.simpleList.setValue("brandId", data.defaultBrandId);
                        viewModel.simpleList.setValue("brandCode", data.defaultBrandCode);
                        viewModel.simpleList.setValue("brandName", data.defaultBrandName);
                        viewModel.simpleList.setValue("productLineId", data.defaultProductLineId);
                        viewModel.simpleList.setValue("productLineCode", data.defaultProductLineCode);
                        viewModel.simpleList.setValue("productLineName", data.defaultProductLineName);

                    }
                });
            });

        }
    });
    return view;
});