define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            orderexecutionquery: {
                meta: {
                    saleOrgId: { type: "string", required: true },
                    saleOrgCode: { type: "string" },
                    saleOrgName: { type: "string" },
                    customerId: { type: "string", required: true },
                    customerCode: { type: "string", required: true },
                    customerName: { type: "string" },
                    orderTypeId: { type: "string" },
                    orderTypeCode: { type: "string" },
                    orderTypeName: { type: "string" },
                    orderCode: { type: "string" },
                    orderDate: { type: "date" },
                    marketAreaId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['market']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    marketAreaCode: { type: "string" },
                    marketAreaName: { type: "string" },
                    salesDeptId: { type: "string" },
                    salesDeptCode: { type: "string" },
                    salesDeptName: { type: "string" },
                    salesManagerId: { type: "string" },
                    salesManagerCode: { type: "string" },
                    salesManagerName: { type: "string" },
                    invoiceTitle: { type: "string" },
                    settleFinancialOrgId: { type: "string" },
                    settleFinancialOrgCode: { type: "string" },
                    settleFinancialOrgName: { type: "string" },
                    goodsId: { type: "string" },
                    goodsCode: { type: "string" },
                    goodsName: { type: "string" },
                    orderNum: { type: "numberFloat" },
                    promotinId: { type: "string" },
                    isGift: { type: "integer" },
                    dealPrice: { type: "priceFloat" },
                    offsetAmount: { type: "amountFloat" },
                    dealAmount: { type: "amountFloat" },
                    deliveryNum: { type: "numberFloat" },
                    stockOutNum: { type: "numberFloat" },
                    totalDealAmount: { type: "amountFloat" },
                },
                pageSize: 10
            }
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "saleOrgId",
                keyfordisplay: "saleOrgName",
                label: "销售组织",
                refinfo: "organization_ocm",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                clientParam: {"EQ_orgFuncRel": "01" },
                opr: "IN",
            },{
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                key: "orderDate",
                type: "daterange",
                label: "订单日期",
            },{
                type: "refer",
                key: "orderTypeId",
                label: "订单类型",
                refinfo: "trantype",
                refName: "订单类型",
                clientParam: {
					EQ_billTypeId: "SaleOrder",
					"IN_trantypeExtends.fieldValue": "01,02,03,04"
				}
            }, {
                type: "text",
                key: "orderCode",
                label: "订单号",
                opr: "IN",
            }, {
                type: "refer",
                key: "salesDeptId",
                domid: "salesDeptId",
                label: "销售部门",
                refinfo: "department",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "salesManagerId",
                label: "客户经理",
                refinfo: "person",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                    type: "refer",
                    key: "marketAreaId",
                    label: "市场区域",
                    refinfo: "market",
                    refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                    opr: "IN",
                },{
                type: "refer",
                key: "goodsId",
                label: "商品",
                refinfo: "goods",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "saleOrgId",
                keyfordisplay: "saleOrgName",
                domid: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: { "EQ_orgFuncRel": "01" },
            },{
                type: "refer",
                key: "customerId",
                label: "客户",
                refinfo: "customer",
                required: true
            },{
                key: "orderDate",
                label: "订单日期",
                computed: "billDateComputed"
            }, {
                key: "orderTypeName",
                label: "订单类型",
            }, {
                type: "text",
                key: "orderCode",
                label: "订单号",
            }, {
                referId: "departmentId",
                type: "refer",
                compid: "salesDeptId",
                key: "salesDeptId",
                label: "销售部门",
                domid: "salesDeptId",
                refinfo: "department",
                enable: false
            }, {
                referId: "personId",
                type: "refer",
                domid: "salesManagerId",
                compid: "salesManagerId",
                key: "salesManagerId",
                label: "客户经理",
                refinfo: "person",
                enable: false
            }, {
                referId: "marketId",
                type: "refer",
                key: "marketAreaId",
                label: "市场区域",
                refinfo: "market",
            },{
                type: "text",
                key: "goodsName",
                label: "商品",
            }]
        },
        grids: {
            grid1: {
                domid: "orderexecutionquery",
                umeta: {
                    id: "grid_orderexecutionquery",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "saleOrgName",
                    dataType: "String",
                    title: "销售组织"
                }, {
                    field: "customerName",
                    dataType: "String",
                    title: "客户"
                }, {
                    field: "orderTypeName",
                    dataType: "String",
                    title: "订单类型"
                }, {
                    field: "orderCode",
                    dataType: "String",
                    title: "订单编号"
                }, {
                    field: "orderDate",
                    dataType: "Date",
                    title: "订单日期"
                }, {
                    field: "marketAreaName",
                    dataType: "String",
                    title: "市场区域"
                },{
                    field: "salesDeptName",
                    dataType: "String",
                    title: "销售部门"
                }, {
                    field: "salesManagerName",
                    dataType: "String",
                    title: "客户经理"
                },{
                    field: "invoiceTitle",
                    dataType: "String",
                    title: "客户开票单位"
                }, {
                    field: "settleFinancialOrgName",
                    dataType: "String",
                    title: "结算财务组织"
                }, {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码"
                }, {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称"
                }, {
                    field: "orderNum",
                    dataType: "String",
                    title: "订货量"
                },  {
                    field: "promotinId",
                    dataType: "String",
                    title: "促销活动"
                }, {
                    field: "isGift",
                    dataType: "Integer",
                    title: "赠品",
					renderType: "disableBooleanRender",
                }, {
                    field: "dealPrice",
                    dataType: "String",
                    title: "成交价"
                }, {
                    field: "offsetAmount",
                    dataType: "String",
                    title: "费用冲抵金额"
                },  {
                    field: "dealAmount",
                    dataType: "String",
                    title: "成交金额"
                }, {
                    field: "deliveryNum",
                    dataType: "String",
                    title: "已安排发货数量"
                }, {
                    field: "stockOutNum",
                    dataType: "String",
                    title: "已出库数量"
                }, {
                    field: "totalDealAmount",
                    dataType: "String",
                    title: "订单应收金额",
                    width: "140px"
                }, {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                }, {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                }, {
                    field: "creationTime",
                    dataType: "DateTime",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "DateTime",
                    title: "修改时间",
                    visible: false
                }]
            }
        }
    };
    return new basemodel(model);
});
