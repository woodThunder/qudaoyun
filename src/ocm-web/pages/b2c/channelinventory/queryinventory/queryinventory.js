define(['text!./queryinventory.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function (tpl, common, searchbox) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch, platStoreDetailDialog;
    baseData = {
        baseurl: '/b2c/channel-stocks',
        storeList: new u.DataTable(mainDataMeta),
        storeParamList: new u.DataTable(childListDataMeta),
        billPanelStatusB: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        radio2Preserveinventory: [{
            value: "0",
            name: "否"
        },
        {
            value: '1',
            name: "是"
        }
        ],
        stockStatusSrc: [{
            value: "0",
            name: "已处理"
        },
        {
            value: "1",
            name: "未确认"
        },
        {
            value: "2",
            name: "已确认"
        },
        {
            value: "3",
            name: "处理中"
        },
        {
            value: "4",
            name: "已占用"
        },
        {
			value: "5",
			name: "调拨中"
		},
        ],
        isCanSellSrc: [{
            value: "Y",
            name: "是"
        },
        {
            value: "N",
            name: "否"
        },
        ],
        isCanSellSearchSrc: [{
            value: "",
            name: "全部"
        },
        {
            value: "Y",
            name: "是"
        },
        {
            value: "N",
            name: "否"
        },
        ],

        //认证方式枚举
        authenticationSrc: ko.observableArray([]),
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,

        billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
    };
    rendertype = {
        //跳转详情页
        detailRender: function (obj) {
            var viewModel = obj.gridObj.viewModel;
			var dataTableRowId = obj.row.value['$_#_@_id'];
      		var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
            obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        }
    };
    events = {
        //查看详情
        detail: function (index,rowId) {
            viewModel.storeList.setRowSelectbyRowId(rowId);
			var id = viewModel.storeList.getCurrentRow().getValue("id");
            //请求完整主子表信息
            viewModel.findByParentid(id);
            viewModel.goDetailPanel();
        },
        //查询子表数据
        findByParentid: function (id) {
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + '/detail',
                data: {
                    id: id
                },
                success: function (data) {
                    viewModel.storeParamList.removeAllRows();
                    viewModel.storeParamList.setSimpleData(data.logs, {
                        unSelect: true
                    });
                }
            })
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if (reindex) {
                viewModel.storeList.pageIndex(0);
            }
            viewModel.storeList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.storeList.pageSize();
            queryData.page = viewModel.storeList.pageIndex();
            $.ajax({
                type: "get",
                url: appCtx + viewModel.baseurl,
                dataType: "json",
                data: queryData,
                success: function (data) {
                    viewModel.storeList.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.storeList.totalRow(data.totalElements);
                    viewModel.storeList.totalPages(data.totalPages);
                    var dataList = viewModel.storeList.getAllRows();

                    //默认值:是否初期库存/是否可二次销售
                    for (var i = 0; i < dataList.length; i++) {
                        var isInit = dataList[i].getValue('isInit');
                        var isCanSell = dataList[i].getValue('isCanSell');
                        if (isInit == null) {
                            dataList[i].setValue('isInit', '0');
                        }
                        if (isInit == null) {
                            dataList[i].setValue('isCanSell', 'Y');
                        }
                    }

                }
            });
        },
        //清空搜索条件
        cleanSearch: function () {
            singledocSearch.clearSearch();
            $("#searchStoreId").attr("data-refparam", '{"EQ_platform.id":""}');
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.storeList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.storeList.pageSize(size);
            viewModel.search(true);
        }
    }
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

    function appInit(element, params) {
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        singledocSearch = new searchbox(
            $("#storeList-searchcontent")[0], [{
                type: "refer",
                key: "product--id",
                label: "产品名称",
                refinfo: "productInfo",
            },
            {
                type: "refer",
                key: "serviceProvider--organization--id",
                label: "办事处",
                refinfo: "organization_auth_b2c",
                clientParam: {
                    "EQ_isOffice": "1"
                }
            },
            {
                type: "refer",
                key: "serviceProvider--customer--twoCategory--id", // customer--twoCategory--id//ServiceProviderInfo--customer--twoCategory--id
                label: "服务商类型",
                refinfo: "custdocdef",
                refCode: "QY024",
                refName: "二级客户分类",
                domid: 'serviceProviderType',
                referId: 'ServiceProviderTypeId'
            },
            {
                type: "refer",
                key: "serviceProvider",
                label: "服务商",
                refinfo: "customers",
                clientParam: {
                        "EQ_isEnable": "1",
                        "EQ_isServiceProvider":"1"
          			},
                domid: 'serviceProvider',
                referId: 'ServiceProviderId'
            },
            {
                type: "text",
                key: "code",
                label: "渠道库存号"
            },
            {
                type: "text",
                key: "syscode",
                label: "电商订单号"
            },
            {
                type: "refer",
                key: "platform--id",
                //key: "platformName",
                label: "平台名称",
                refinfo: "b2cplatform",
                refName: "所属平台"

            },
            {
                type: "refer",
                key: "store--id",
                label: "店铺名称",
                refinfo: "b2cStoreRef",
                refName: "店铺",
                domid: "searchStoreId"
            },
            {
                type: "combo",
                key: "stockStatus",
                label: "库存状态",
                dataSource: viewModel.stockStatusSrc,
            },
            {
                type: "daterange",
                key: "creationTime",
                label: "库存产生时间"
            },
            {
                type: "text",
                key: "soBillNo",
                label: "销售单号"
            }, {
                type: "text",
                key: "purchaseBillCode",
                label: "采购单号"
            }, {
                type: "text",
                key: "buyer",
                label: "顾客ID"
            },
            {
                type: "text",
                key: "channelStockReceiver--receiver",
                label: "顾客姓名"
            },
            {
                type: "text",
                key: "channelStockReceiver--receiverPhone",
                label: "联系电话"
            }, {
                type: "radio",
                key: "isCanSell",
                label: "二次销售",
                dataSource: viewModel.isCanSellSearchSrc,
                //cls: "ui-checkboxes-item"
            }
                // },
                // {
                //     type: "refer",
                //     key: "platform--id",
                //     label: "所属平台",
                //     refinfo: "b2cplatform",
                //     refName: "所属平台"
                // }
            ]);
        // 列表查询数据(无查询条件)
        viewModel.search();
        //服务商类型与服务商-联动
        var officeId1, serviceId1 = "";
        // singledocSearch.viewModel.params.on("serviceProvider--customer--twoCategory--id.valuechange", function (obj) {
        //     serviceId1 = obj.newValue;
        //     $("#serviceProvider").attr("data-refparam", '{"EQ_organization.id":"' + officeId1 + '","EQ_customer.twoCategory.id":"' + serviceId1 + '"}');
        //     // $("#serviceProvider input").val('');   
        //     $("#refContainerServiceProviderId").data("uui.refer").setValue([]);
        // });
        // //办事处与服务商-联动
        // singledocSearch.viewModel.params.on("office--id.valuechange", function (obj) {
        //     officeId1 = obj.newValue;
        //     $("#serviceProvider").attr("data-refparam", '{"EQ_organization.id":"' + officeId1 + '","EQ_customer.twoCategory.id":"' + serviceId1 + '"}');
        //     // $("#serviceProviderId input").val('');
        //     $("#refContainerServiceProviderId").data("uui.refer").setValue([]);
        //     //服务商类型
        //     // $("#serviceProviderType input").val('');
        //     $("#refContainerServiceProviderTypeId").data("uui.refer").setValue([]);

        // });

    }

    function afterRender() {
        //绑定输入框enter事件
        $('#storeList-searchcontent input').off("keydown").on("keydown", function (e) {
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });

        //查询平台名称-联动店铺名称
        singledocSearch.viewModel.params.on("platform--id.valuechange", function (obj) {
            var id = obj.newValue;
            $("#searchStoreId").attr("data-refparam", '{"EQ_platform.id":"' + id + '"}');
            $("#searchStoreId input").val('');
        });

        //认证方式枚举
        $._ajax({
            type: "get",
            url: appCtx + "/b2c/enum-service/data",
            data: {
                enumClassName: "com.yonyou.ocm.b2c.enums.StoreAuthenticationEnum"
            },
            success: function (data) {
                var newarray = common.dataconvert.toMap(data, "name", "code");
                viewModel.authenticationSrc(newarray);
            }
        });
        //电商订单号，数据联动
        viewModel.storeList.on("syscode.valuechange", function (obj) {
            if (obj.oldValue == obj.newValue) return;
            var syscodeValue = obj.newValue;
            var curRow = obj.rowObj;
            $.ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + '/getOrderInfo',
                dataType: "json",
                data: {
                    'orderCode': syscodeValue
                },
                success: function (res) {
                    if (res.code == 0) {
                        curRow.setValue('officeId', res.data.officeId);
                        curRow.setValue('serviceProviderType', res.data.serviceProviderType);
                        curRow.setValue('serviceProviderId', res.data.serviceProviderId);
                        curRow.setValue('busiAccount', res.data.busiAccount);
                        curRow.setValue('platformId', res.data.platformId);
                        curRow.setValue('storeId', res.data.storeId);
                        curRow.setValue('bookTime', res.data.bookTime);
                        curRow.setValue('buyer', res.data.buyer);
                        curRow.setValue('receiverName', res.data.receiverName);
                        curRow.setValue('receiverPhone', res.data.receiverPhone);
                        curRow.setValue('receiverTel', res.data.receiverTel);
                        curRow.setValue('receiverAddress', res.data.receiverAddress);
                        //
                        viewModel.storeList.setRowFocus(curRow);
                    } else {
                        toastr.warning('电商订单号不正确，请重新输入');
                    }
                }
            });
        });
    }

    function init(element, params) {
        appInit(element, params);
        afterRender();
        window.vm = viewModel;
    }

    return {
        init: init
    }
});