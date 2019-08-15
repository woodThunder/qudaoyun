define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            Orderreviewmeta: {
                meta: {
                    // 订单日期
                    orderDate: {
                        type: "date"
                    },
                    /*
                    id: {
                        type: "string"
                    },
                    // 销售组织
                    saleOrgId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
                        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    },
                    // "销售组织编码")
                    saleOrgCode: {
                        type: "string"
                    },
                    // "销售组织名称")
                    saleOrgName: {
                        type: "string"
                    },
                    // 结算财务组织
                    settleFinancialOrgId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["organization_ocm"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"结算财务组织" }',
                        refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
                    },
                    // "结算财务组织编码")
                    settleFinancialOrgCode: {
                        type: "string"
                    },
                    // "结算财务组织名称")
                    settleFinancialOrgName: {
                        type: "string"
                    },
                    // 客户订单类型
                    orderTypeId: {
                        type: "string",
                        required: true
                    },
                    // "订单类型编码")
                    orderTypeCode: {
                        type: "string"
                    },
                    // "订单类型名称")
                    orderTypeName: {
                        type: "string"
                    },
                    // 订单编码
                    orderCode: {
                        type: "string"
                    },
                    // 订单日期
                    orderDate: {
                        type: "date"
                    },
                    // 订单状态
                    orderStatusId: {
                        type: "string"
                    },
                    // "订单状态编码")
                    orderStatusCode: {
                        type: "string"
                    },
                    // "订单状态名称")
                    orderStatusName: {
                        type: "string"
                    },
                    // 客户
                    customerId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["customer_sale"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
                        refparam: '{"EQ_isChannelCustomer": "1"}'
                    },
                    // "客户编码")
                    customerCode: {
                        type: "string"
                    },
                    // "客户名称")
                    customerName: {
                        type: "string"
                    },
                    //上级客户
                    superiorCustomerId: {
                        type: "string"
                    },
                    // "上级客户编码")
                    superiorCustomerCode: {
                        type: "string"
                    },
                    // "上级客户名称")
                    superiorCustomerName: {
                        type: "string"
                    },
                    // 市场区域
                    marketAreaId: {
                        type: "string"
                    },
                    // "市场区域编码")
                    marketAreaCode: {
                        type: "string"
                    },
                    // "市场区域名称")
                    marketAreaName: {
                        type: "string"
                    },
                    // 客户经理
                    salesManagerId: {
                        type: "string"
                    },
                    // "客户经理编码")
                    salesManagerCode: {
                        type: "string"
                    },
                    // "客户经理名称")
                    salesManagerName: {
                        type: "string"
                    },
                    // 销售部门
                    salesDeptId: {
                        type: "string"
                    },
                    // "销售部门编码")
                    salesDeptCode: {
                        type: "string"
                    },
                    // "销售部门名称")
                    salesDeptName: {
                        type: "string"
                    },
                    // 运输方式
                    transportModeId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["transportmode"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"运输方式" }'
                    },

                    receiveAddressId: {
                        required: true,
                        type: "string"
                    },
                    receiveAddressName: {
                        type: "string"
                    },
                    // 收货详细地址
                    receiverAddress: {
                        type: "string"
                    },
                    invoiceTitle: {
                        type: "string"
                    }, // 发票抬头

                    invoiceType: {
                        type: "string"
                    }, // 发票类型
                    invoiceTaxId: {
                        type: "string"
                    }, // 纳税人识别码

                    // "运输方式编码")
                    transportModeCode: {
                        type: "string"
                    },
                    // "运输方式名称")
                    transportModeName: {
                        type: "string"
                    },
                    // 结算方式
                    settleModeId: {
                        type: "string"
                    },
                    // "结算方式编码")
                    settleModeCode: {
                        type: "string"
                    },
                    // "结算方式名称")
                    settleModeName: {
                        type: "string"
                    },
                    // 交货日期(即客户期望的收货日期)
                    deliveryDate: {
                        type: "date"
                    },
                    // 总数量
                    totalNum: {
                        type: "numberFloat",
                        precision: 2
                    },
                    // 币种
                    currencyId: {
                        type: "string"
                    },
                    // "币种编码")
                    currencyCode: {
                        type: "string"
                    },
                    // "币种名称")
                    currencyName: {
                        type: "string"
                    },
                    // 币种单价精度
                    currencyPriceScale: {
                        type: "integer"
                    },
                    // 币种金额精度
                    currencyAmountScale: {
                        type: "integer"
                    },
                    // 总成交金额
                    totalDealAmount: {
                        type: "amountFloat",
                        precision: 2
                    },
                    // 冲抵前金额
                    totalAmount: {
                        type: "amountFloat",
                        precision: 2
                    },
                    // 费用冲抵金额
                    offsetAmount: {
                        type: "amountFloat",
                        precision: 2
                    },
                    totalGoodsSuppleAmount: {
                        type: "amountFloat",
                    },
                    // 总重量
                    totalWeight: {
                        type: "string"
                    },
                    // 总体积
                    totalVolume: {
                        type: "string"
                    },
                    // 订单来源
                    orderSource: {
                        type: "string"
                    },
                    // 备注
                    remark: {
                        type: "string"
                    },
                    // 审批意见
                    approveOpinion: {
                        type: "string"
                    },
                    // 审核状态
                    approveStatus: {
                        type: "integer"
                    },
                    // 审批人
                    approver: {
                        type: "string"
                    },
                    // 审批时间
                    approveTime: {
                        type: "date"
                    },
                    // 来源订单号
                    srcOrderCode: {
                        type: "string"
                    },
                    // 来源订单主键
                    srcOrderId: {
                        type: "string"
                    },
                    // 收货地址
                    customeraddressId: {
                        type: "string",
                        required: true,
                        refmodel: JSON.stringify(refinfo["saleorderCustomeraddress"]),
                        refcfg: '{"ctx":"/uitemplate_web", "refName":"收货地址"}'
                    },
                    // 发票信息
                    invoiceId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["customer-invoice"]),
                        refcfg: '{"ctx":"/uitemplate_web", "refName":"发票信息"}'
                    },
                    customeraddressCode: {
                        type: "string"
                    },
                    customeraddressName: {
                        type: "string"
                    },
                    // 账期
                    accountPeriodId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["settlementSettings"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"账期" }',
                        refparam: '{"EQ_isEnable":"1"}'
                    },
                    // "账期编码"
                    accountPeriodCode: {
                        type: "string"
                    },
                    // "账期名称"
                    accountPeriodName: {
                        type: "string"
                    },
                    // 货补费用单类型
                    costTypeId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["trantype"]),
                        refparam: '{"EQ_billTypeId":"CastType",  "IN_trantypeExtends.fieldValue": "pay02"}',
                        refcfg: '{"ctx":"/uitemplate_web","refName":"货补订单类型" }'
                    },
                    costTypeName: {
                        type: "string"
                    },
                    costTypeCode: {
                        type: "string"
                    },
                    saleModel: {
                        type: "string"
                    }, // 销售模式
                    measurementUnitId: {
                        type: "string",
                        required: true
                    }, //计量单位
                    measurementUnitCode: {
                        type: "string",
                        required: true
                    }, //计量单位
                    measurementUnitName: {
                        type: "string",
                        required: true
                    }, //计量单位
                    billStatusCode: {
                        type: "string"
                    },
                    billStatusId: {
                        type: "string"
                    },
                    billStatusName: {
                        type: "string"
                    },
                    state: {
                        type: "string"
                    },
                    receiverProvinceId: {
                        type: "string"
                    },
                    receiverCityId: {
                        type: "string"
                    },
                    receiverCountyId: {
                        type: "string"
                    },
                    receiverTownId: {
                        type: "string"
                    },
                    promotinIdName: {
                        type: "string"
                    },
                    promotinName: {
                        type: "string"
                    },
                    // 促销金额
                    promAmount: {
                        type: "amountFloat"
                    },
                    */
                },
                pageSize: 10
            },
            OrderreviewItemmeta: {
                meta: {

                    // 行号
                    rowNum: {
                        type: "string"
                    },
                    // 商品ID
                    goodsName: {
                        type: "string"
                    },
                    // 结算财务组织
                    settleFinancialOrgName: {
                        type: "string"
                    },
                    // 订货数量
                    orderNum: {
                        type: "numberFloat"
                    },
                    // 订货单位
                    orderNumUnitName: {
                        type: "string"
                    },
                    // 主数量
                    mainNum: {
                        type: "numberFloat"
                    },
                    // 主数量单位
                    mainNumUnitName: {
                        type: "string"
                    },
                    // 单价
                    basePrice: {
                        type: "priceFloat"
                    },
                    // 销售价格
                    salePrice: {
                        type: "priceFloat"
                    },
                    // 成交价
                    dealPrice: {
                        type: "priceFloat"
                    },
                    // 成交金额
                    dealAmount: {
                        type: "amountFloat"
                    },
                    // 是否为赠品
                    isGift: {
                        type: "float",
                        default: "0"
                    },
                    // 发货仓库
                    deliveryWarehouseName: {
                        type: "string"
                    },
                    // 发货库存组织
                    deliveryInvOrgName: {
                        type: "string"
                    },
                    // 版本
                    version: {
                        type: "string",
                        required: true
                    },
                    // 选配结果展示值
                    baseGoodsOptValue: {
                        type: "string"
                    },
                    // 重量
                    weight: {
                        type: "string"
                    },
                    // 行合计重量
                    rowWeight: {
                        type: "string"
                    },
                    // 体积
                    volume: {
                        type: "string"
                    },
                    // 行合计体积
                    rowVolume: {
                        type: "string"
                    },
                    // 产品线
                    productName: {
                        type: "string"
                    },
                    //是否为赠品
                    isGift: {
                        type: "integer"
                    },
                    //关闭
                    isClose: {
                        type: "integer"
                    },
                    //发货关闭
                    isDeClose: {
                        type: "integer"
                    },
                    //是否货补
                    goodsSupplement: {
                        type: "integer"
                    }

                },
                pageSize: 10
            },
            OrderreviewItemBommeta: {
                meta: {
                    rowNum: {
                        type: "string"
                    },
                    //是否货补
                    // goodsSupplement: {
                    //     type: "integer"
                    // },
                    // //是否为赠品
                    // isGift: {
                    //     type: "integer"
                    // },
                },
                pageSize: 10
            }
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                refName: "销售组织",
                clientParam: {
                    EQ_orgFuncRel: "01"
                },
                opr: "IN",
                refcfg: {
                    ctx: "/uitemplate_web",
                    refCode: "",
                    refName: "",
                    isMultiSelectedEnabled: "true",
                    EQ_orgFuncRel: "01"
                }
            },
            {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                refName: "客户",
                clientParam: {
                    EQ_isEnable: "1",
                    EQ_isChannelCustomer: "1"
                },
                opr: "IN",
                refcfg: {
                    ctx: "/uitemplate_web",
                    refCode: "",
                    refName: "",
                    isMultiSelectedEnabled: "true"
                }
            },
            {
                type: "combo",
                key: "orderStatus",
                label: "订单状态",
                url: window.pathMap.base +
                    "/cust-doc-defs/cust_doc_code?cust_doc_code=QY133",
                namefield: "name",
                hasAll: true,
                /*multi: 'true',*/
                valuefield: "code"
            },
            {
                type: "refer",
                key: "orderType",
                label: "订单类型",
                refinfo: "trantype",
                clientParam: {
                    EQ_billTypeId: "SaleOrder",
                    "IN_trantypeExtends.fieldValue": "01,03"
                }
            },
            {
                type: "text",
                key: "orderCode",
                label: "订单编号",
                refName: "订单编号"
            },
            {
                type: "daterange",
                key: "orderDate",
                label: "订单日期"
            },
            {
                type: "radio",
                key: "isClose",
                label: "订单关闭",
                dataSource: [{
                    value: "1",
                    name: "是"
                },
                {
                    value: "0",
                    name: "否"
                }
                ]
            },
            {
                type: "refer",
                key: "marketArea",
                label: "市场区域",
                refinfo: "market",
                refName: "市场区域"
            },
            {
                type: "refer",
                key: "salesDept",
                label: "销售部门",
                refinfo: "department",
                refName: "销售部门"
            },
            {
                type: "refer",
                key: "salesManager",
                label: "客户经理",
                refinfo: "accountManager",
                refName: "客户经理"
            }
            ]
        },
        buttons: {
            button1: [
                {
                    label: '财审通过',
                    key: 'code',
                    iconCls: "icon-plus",
                    click: 'pass',
                    cls: 'ui-btn-primary orderreview_btn'
                },
                {
                    label: '禁止信贷',
                    key: 'name',
                    iconCls: "icon-shanchu1",
                    click: 'nopass',
                    cls: 'ui-btn-primary orderreview_btn'
                },
            ]
        },
        grids: {
            gridList: {
                domid: "gridList",
                umeta: {
                    id: "grid_salesorder",
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
                },
                {
                    field: "customerName",
                    dataType: "String",
                    title: "客户"
                },
                {
                    field: "orderCode",
                    dataType: "String",
                    title: "订单编码",
                    renderType: "detailRender",
                    width: "200px"
                },
                {
                    field: "orderTypeName",
                    dataType: "String",
                    title: "订单类型",
                    clientParam: {
                        EQ_billTypeId: "SaleOrder"
                    }
                },
                {
                    field: "orderDate",
                    dataType: "Date",
                    title: "订单日期"
                },
                {
                    field: "totalNum",
                    dataType: "String",
                    title: "总数量"
                },
                {
                    field: "totalDealAmount",
                    dataType: "String",
                    title: "总成交金额"
                },
                {
                    field: "orderStatusName",
                    dataType: "String",
                    title: "订单状态"
                },
                {
                    field: "isClose",
                    dataType: "Integer",
                    renderType: "isCloseRender",
                    title: "关闭"
                },
                {
                    field: "isDeClose",
                    dataType: "Integer",
                    renderType: "isCloseRender",
                    title: "发货关闭"
                },
                {
                    field: "orderSource",
                    dataType: "Integer",
                    title: "订单来源",
                    renderType: "orderSourceRender"
                },
                {
                    field: "remark",
                    dataType: "Integer",
                    title: "备注"
                },
                    // {
                    //     field: "billStatusCode",
                    //     dataType: "String",
                    //     title: "操作",
                    //     renderType: "operation",
                    //     fixed: true,
                    //     width: "100px"
                    // },
                ]
            },
            gridGoods: {
                domid: "grid_GoodItem",
                umeta: {
                    id: "grid_GoodInfo",
                    data: "OrderreviewItem",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "rowNum",
                    dataType: "String",
                    title: "行号"
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品ID"
                },
                {
                    field: "settleFinancialOrgName",
                    dataType: "String",
                    title: "结算财务组织"
                },
                {
                    field: "orderNum",
                    dataType: "String",
                    title: "订货数量"
                },
                {
                    field: "orderNumUnitName",
                    dataType: "String",
                    title: "订货单位"
                },
                {
                    field: "mainNum",
                    dataType: "String",
                    title: "主数量"
                },
                {
                    field: "mainNumUnitName",
                    dataType: "String",
                    title: "主数量单位"
                },
                {
                    field: "basePrice",
                    dataType: "String",
                    title: "单价"
                },
                {
                    field: "dealPrice",
                    dataType: "String",
                    title: "成交价"
                },
                {
                    field: "isGift",
                    dataType: "checkbox",
                    title: "是否为赠品",
                    renderType: "disableBooleanRender",
                },
                {
                    field: "deliveryWarehouseName",
                    dataType: "String",
                    title: "发货仓库"
                },
                {
                    field: "deliveryInvOrgName",
                    dataType: "String",
                    title: "发货库存组织"
                },
                {
                    field: "version",
                    dataType: "String",
                    title: "版本号"
                },
                // {
                //     field: "baseGoodsOptValue",
                //     dataType: "String",
                //     title: "选配结果展示值",
                //     renderType: 'goodsOptDetails'
                // },
                {
                    field: "weight",
                    dataType: "String",
                    title: "重量"
                },
                {
                    field: "rowWeight",
                    dataType: "String",
                    title: "行合计重量"
                },
                {
                    field: "volume",
                    dataType: "String",
                    title: "体积"
                },
                {
                    field: "rowVolume",
                    dataType: "String",
                    title: "行合计体积"
                },
                {
                    field: "productName",
                    dataType: "String",
                    title: "产品线"
                },
                {
                    field: "isClose",
                    dataType: "checkbox",
                    title: "关闭",
                    renderType: "disableBooleanRender",
                },
                {
                    field: "isDeClose",
                    dataType: "checkbox",
                    title: "发货关闭",
                    renderType: "disableBooleanRender",
                },
                {
                    field: "promotinName",
                    dataType: "String",
                    title: "促销活动"
                },
                {
                    field: "logisticsName",
                    dataType: "String",
                    title: "承运商"
                },
                {
                    field: "promAmount",
                    dataType: "String",
                    title: "促销金额"
                },
                {
                    field: "promPrice",
                    dataType: "String",
                    title: "促销折扣价格"
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "batchCodeId",
                    dataType: "String",
                    title: "批号"
                },
                {
                    field: "goodsSupplement",
                    dataType: "checkbox",
                    title: "是否货补",
                    renderType: "disableBooleanRender",
                },
                {
                    field: "supplierName",
                    dataType: "String",
                    title: "供应商"
                },
                ]
            },
            gridBom: {
                domid: "grid_BomItem",
                umeta: {
                    id: "grid_BomInfo",
                    data: "OrderreviewItemBom",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "parentGoodsName",
                    dataType: "String",
                    title: "母件商品ID"
                },
                {
                    field: "rowNum",
                    dataType: "String",
                    title: "行号"
                },
                {
                    field: "parentRowNum",
                    dataType: "String",
                    title: "母件商品行号"
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品ID"
                },
                {
                    field: "mainNum",
                    dataType: "String",
                    title: "主数量"
                },
                {
                    field: "orderNum",
                    dataType: "String",
                    title: "订货数量"
                },
                {
                    field: "orderNumUnitName",
                    dataType: "String",
                    title: "订货单位"
                },
                {
                    field: "basePrice",
                    dataType: "String",
                    title: "单价"
                },
                {
                    field: "salePrice",
                    dataType: "String",
                    title: "销售价格"
                },
                {
                    field: "dealPrice",
                    dataType: "String",
                    title: "成交价"
                },
                {
                    field: "dealAmount",
                    dataType: "String",
                    title: "成交金额"
                },
                // {
                //     field: "baseGoodsOptValue",
                //     dataType: "String",
                //     title: "选配结果展示值",
                //     renderType: 'goodsOptDetails'
                // },
                {
                    field: "volume",
                    dataType: "String",
                    title: "体积"
                },
                {
                    field: "goodsSupplement",
                    dataType: "checkbox",
                    title: "是否货补",
                    renderType: "disableBooleanRender",
                },
                {
                    field: "weight",
                    dataType: "String",
                    title: "重量"
                },
                {
                    field: "isGift",
                    dataType: "checkbox",
                    title: "是否为赠品",
                    renderType: "disableBooleanRender",
                },
                ]
            }
        },
        dialogs: {

        },
        details: {
            detail1: [
                {
                    type: 'text',
                    label: '销售组织ID',
                    key: 'saleOrgName'
                },
                {
                    type: 'text',
                    label: '客户',
                    key: 'customerName'
                },
                {
                    type: 'text',
                    label: '上级客户',
                    key: 'superiorCustomerName'
                },
                {
                    type: 'text',
                    label: '订单类型',
                    key: 'orderTypeName'
                },
                {
                    type: 'text',
                    label: '订单编码',
                    key: 'orderCode'
                },
                {
                    type: 'text',
                    label: '订单日期',
                    key: 'orderDate'
                },
                {
                    type: 'text',
                    label: '开票单位名称',
                    key: 'orderInvoice.invoiceTitle'
                },
                {
                    type: 'text',
                    label: '销售部门',
                    key: 'salesDeptId'
                },
                {
                    type: 'text',
                    label: '市场区域',
                    key: 'marketAreaId'
                },
                {
                    type: 'text',
                    label: '客户经理',
                    key: 'salesManagerId'
                },
                {
                    type: 'text',
                    label: '交货日期',
                    key: 'deliveryDate'
                },
                {
                    type: 'text',
                    label: '账期',
                    key: 'accountPeriodId'
                },
                {
                    type: 'text',
                    label: '收货信息',
                    key: 'orderReceiveAddress'
                },
                {
                    type: 'text',
                    label: '联系人电话',
                    key: 'orderReceiveAddress.receiverPhone'
                },
                {
                    type: 'text',
                    label: '收货人',
                    key: 'orderReceiveAddress.receiver'
                },
                {
                    type: 'text',
                    label: '总数量',
                    key: 'totalNum'
                },
                {
                    type: 'text',
                    label: '总体积',
                    key: 'totalVolume'
                },
                {
                    type: 'text',
                    label: '总净重',
                    key: 'totalNetWeight'
                },
                {
                    type: 'text',
                    label: '总重量',
                    key: 'totalWeight'
                },
                {
                    type: 'text',
                    label: '币种',
                    key: 'currencyName'
                },
                // {
                //     type: 'text',
                //     label: '编码',
                //     key: 'currencyName'
                // },
                {
                    type: 'text',
                    label: '冲抵前金额',
                    key: 'totalAmount',
                    // precision: 2
                },
                {
                    type: 'text',
                    label: '总成交金额',
                    key: 'totalDealAmount'
                },
                {
                    type: 'text',
                    label: '费用冲抵金额',
                    key: 'offetAmount'
                },
                {
                    type: 'text',
                    label: '备注',
                    key: 'remark'
                },
                {
                    type: 'text',
                    label: '货补优惠',
                    key: 'totalGoodsSuppleAmount'
                },
                {
                    type: 'text',
                    label: '订单状态',
                    key: 'orderStatusName'
                }
            ]
        }
    };
    return new basemodel(model);
});