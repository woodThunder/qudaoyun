define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            b2cshippermeta: {
                params: {
                    "cls": "com.yonyou.occ.dispatch.service.dto.B2cScheduleDto"
                },
                meta: {
                    logisticsModeCode: { //物流方式
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"LOGISTICS_MODE","refName":"物流方式"}',
                        required: true
                    },
                    logisticsModeName: {
                        type: 'string'
                    }, //物流方式
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
                    },//所在省份ID
                    provinceName: {type: 'string'},//所在省份名称
                    provinceCode: {type: 'string'},//所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
                    },//所在城市ID
                    cityName: {type: 'string'},//所在城市名称
                    cityCode: {type: 'string'},
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
                    },//所在区/县
                    countyName: {type: 'string'},//所在区/县名称
                    countyCode: {type: 'string'},
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4","EQ_isEnable":"1"}'
                    },//所在街道/镇
                    townName: {type: 'string'},//所在街道/镇名称
                    townCode: {type: 'string'},
                    productLineId: { //产品线
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['productLine']),
                        'refcfg': '{"ctx":"/uitemplate_web"}'
                    },
                    productLineCode: {type: 'string'}, //产品线
                    productLineName: {type: 'string'}, //产品线
                    goodsId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },//商品
                    goodsCode: {type: 'string'},//商品
                    goodsName: {type: 'string'},//商品
                    warehouseId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"NULL_ownerCustomer":"~","EQ_isEnable":"1"}'
                    },//仓库
                    warehouseCode: { type: 'string' },//仓库
                    warehouseName: { type: 'string' },//仓库
                    priority: {type: 'integer', min: 1,max: 999},//仓库优先级
                    stockOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },//库存组织
                    stockOrgCode: {type: 'string'},//库存组织
                    stockOrgName: {type: 'string'},//库存组织
                    serviceProviderId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo['customers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"服务商"}',
                        "refparam": '{"EQ_isServiceProvider":"1"}'
                    }, //服务商
                    serviceProviderCode: {type: 'string'}, //服务商
                    serviceProviderName: {type: 'string'}, //服务商
                    dealerId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["customer"]),
                        refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
                        refparam: '{"EQ_isChannelCustomer": "1"}'
                    }, //经销商
                    dealerCode: {type: "string"}, // 经销商
                    dealerName: {type: "string"},
                    supplierId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isCarrier":"0"}'
                    },//供应商
                    supplierCode: { type: 'string' },//供应商
                    supplierName: { type: 'string' },//供应商
                },
                pageSize: 10,
            }
        },
        buttons: {
            button1: [
                {
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "beforeEdit"
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                {
                    key: "batchWarehouse",
                    label: "批量调整仓库",
                    iconCls: "icon-edit",
                    click: "bathEdit"
                },
                {
                    key: "batchServiceProvider",
                    label: "批量调整服务商",
                    iconCls: "icon-edit",
                    click: "bathEdit"
                },
                {
                    key: "batchDealer",
                    label: "批量调整经销商",
                    iconCls: "icon-edit",
                    click: "bathEdit"
                },
                {
                    key: "batchSupplier",
                    label: "批量调整供应商",
                    iconCls: "icon-edit",
                    click: "bathEdit"
                },
                {
                    key: "batchPriority",
                    label: "批量调整优先级",
                    iconCls: "icon-edit",
                    click: "bathEdit"
                },
                {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle"
                }, {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
                }
            ]
        },
        searchs: {
            search1: [
                {
                    type: "refer",
                    compid: "warehouseId",
                    key: "warehouse",
                    label: "仓库",
                    refinfo:"warehouse",
                    clientParam: {
                        "NULL_ownerCustomer":"~",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    compid: "serviceProviderId",
                    key: "serviceProvider",
                    label: "服务商",
                    refinfo:"customers",
                    clientParam: {
                        "EQ_isServiceProvider": "1"
                    }
                },
                {
                    type: "refer",
                    compid: "dealerId",
                    key: "dealer",
                    label: "经销商",
                    refinfo:"customers",
                    clientParam: {
                        "EQ_isChannelCustomer": "1"
                    }
                },
                {
                    type: "refer",
                    compid: "supplierId",
                    key: "supplier",
                    label: "供应商",
                    refinfo:"suppliers",
                    clientParam: {
                        "EQ_isCarrier": "0"
                    }
                },
                {
                    type: "refer",
                    key: "province",
                    label: "省",
                    domid: "provinceIdSearch",
                    compid: "provinceIdBase",
                    refinfo:"region",
                    clientParam: {
                        "EQ_areaLevel":"1",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    key: "city",
                    label: "市",
                    domid: "cityIdSearch",
                    compid: "cityIdBase",
                    refinfo:"region",
                    clientParam: {
                        "EQ_areaLevel":"2",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    key: "county",
                    label: "区/县",
                    domid: "countyIdSearch",
                    compid: "countyIdBase",
                    refinfo:"region",
                    clientParam: {
                        "EQ_areaLevel":"3",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    key: "town",
                    label: "镇/街道",
                    domid: "townIdSearch",
                    compid: "townIdBase",
                    refinfo:"region",
                    clientParam: {
                        "EQ_areaLevel":"4",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "combo",
                    key: "logisticsMode",
                    label: "物流方式",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=LOGISTICS_MODE",
                    namefield: "name",
                    valuefield: "code"
                },
                {
                    type: "refer",
                    compid: "productLineId",
                    key: "productLine",
                    label: "产品线",
                    refinfo:"productLine"
                },
                {
                    type: "refer",
                    compid: "goodsId",
                    key: "goods",
                    label: "商品",
                    refinfo:"goods"
                }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "combo",
                    key: "logisticsModeCode",
                    compid: "logisticsModeId",
                    label: "物流方式",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=LOGISTICS_MODE",
                    namefield: "name",
                    valuefield: "code"
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "省",
                    domid: "provinceIdinfo",
                    compid: "provinceIdBase"
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase"
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase"
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "镇/街道",
                    domid: "townIdinfo",
                    compid: "townIdBase"
                },
                {
                    type: "refer",
                    compid: "productLineId",
                    key: "productLineId",
                    label: "产品线"
                },
                {
                    type: "refer",
                    compid: "goodsId",
                    key: "goodsId",
                    label: "商品"
                },
                {
                    type: "refer",
                    compid: "warehouseId",
                    key: "warehouseId",
                    label: "仓库名称",
                    rel: { inventoryOrgId: "stockOrgId" },
                    enable: false
                },
                {
                    type: "refer",
                    compid: "stockOrgId",
                    key: "stockOrgId",
                    label: "库存组织",
                    enable: false
                },
                {
                    type: "refer",
                    compid: "serviceProviderId",
                    key: "serviceProviderId",
                    label: "服务商",
                    enable: false
                },
                {
                    type: "refer",
                    compid: "dealerId",
                    key: "dealerId",
                    label: "经销商",
                    enable: false
                },
                {
                    type: "refer",
                    compid: "supplierId",
                    key: "supplierId",
                    label: "供应商",
                    enable: false
                },
                {
                    type: "text",
                    compid: "priorityId",
                    key: "priority",
                    label: "优先级"
                }
            ],
            dialog2:[
                {
                    type: "refer",
                    compid: "warehouseId",
                    key: "warehouseId",
                    label: "仓库名称",
                    rel: { inventoryOrgId: "stockOrgId" }
                },
                {
                    type: "refer",
                    compid: "stockOrgId",
                    key: "stockOrgId",
                    label: "库存组织",
                    enable: false
                }
            ],
            dialog3:[
                {
                    type: "refer",
                    compid: "serviceProviderId",
                    key: "serviceProviderId",
                    label: "服务商"
                }
            ],
            dialog4:[
                {
                    type: "refer",
                    compid: "dealerId",
                    key: "dealerId",
                    label: "经销商"
                }
            ],
            dialog5:[
                {
                    type: "refer",
                    compid: "supplierId",
                    key: "supplierId",
                    label: "供应商"
                }
            ],
            dialog6:[
                {
                    type: "text",
                    key: "priority",
                    label: "优先级"
                }
            ]

        },
        grids: {
            grid1: {
                domid: "shippermatch",
                umeta: {
                    id: "grid_shipper",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "logisticsModeName",
                        dataType: "String",
                        title: "物流方式"
                    },
                    {
                        field: "provinceName",
                        dataType: "String",
                        title: "省"
                    },
                    {
                        field: "cityName",
                        dataType: "String",
                        title: "市"
                    },
                    {
                        field: "countyName",
                        dataType: "String",
                        title: "区/县"
                    },
                    {
                        field: "townName",
                        dataType: "String",
                        title: "镇/街道"
                    },
                    {
                        field: "productLineName",
                        dataType: "String",
                        title: "产品线"
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品"
                    },
                    {
                        field: "warehouseName",
                        dataType: "String",
                        title: "仓库"
                    },
                    {
                        field: "stockOrgName",
                        dataType: "String",
                        title: "库存组织"
                    },
                    {
                        field: "priority",
                        dataType: "String",
                        title: "优先级"
                    },
                    {
                        field: "serviceProviderName",
                        dataType: "String",
                        title: "服务商"
                    },
                    {
                        field: "dealerName",
                        dataType: "String",
                        title: "经销商"
                    },
                    {
                        field: "supplierName",
                        dataType: "String",
                        title: "供应商"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});