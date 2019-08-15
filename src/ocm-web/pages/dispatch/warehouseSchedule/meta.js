define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            warehouseSchedulemeta: {
                params: {
                    "cls": "com.yonyou.occ.dispatch.service.dto.B2BResourceScheduleConfigurationDto"
                },
                meta: {
                    saleOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    },//销售组织
                    saleOrgCode: { type: 'string' },//销售组织
                    saleOrgName: { type: 'string' },//销售组织
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
                    },//所在省份ID
                    provinceName: { type: 'string' },//所在省份名称
                    provinceCode: { type: 'string' },//所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
                    },//所在城市ID
                    cityName: { type: 'string' },//所在城市名称
                    cityCode: { type: 'string' },
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
                    },//所在区/县
                    countyName: { type: 'string' },//所在区/县名称
                    countyCode: { type: 'string' },
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4","EQ_isEnable":"1"}'
                    },//所在街道/镇
                    townName: { type: 'string' },//所在街道/镇名称
                    townCode: { type: 'string' },
                    productLineId: { //产品线
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['productLine']),
                        'refcfg': '{"ctx":"/uitemplate_web"}'
                    },
                    productLineCode: { type: 'string' }, //产品线
                    productLineName: { type: 'string' }, //产品线
                    goodsCategoryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goodsCategory']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_isEnable":"1"}'
                    },//商品分类
                    goodsCategoryCode: { type: 'string' },//商品分类
                    goodsCategoryName: { type: 'string' },//商品分类
                    goodsId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },//商品
                    goodsCode: { type: 'string' },//商品
                    goodsName: { type: 'string' },//商品
                    warehouseId: {
                        type: 'string',
                        required:true,
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"NULL_ownerCustomer":"~","EQ_isEnable":"1"}'
                    },//仓库
                    warehouseCode: { type: 'string' },//仓库
                    warehouseName: { type: 'string' },//仓库
                    priority: { type: 'integer' },//仓库优先级

                    stockOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },//库存组织
                    stockOrgCode: { type: 'string' },//库存组织
                    stockOrgName: { type: 'string' },//库存组织

                    supplierId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },//工厂(供应商)
                    supplierCode: { type: 'string' },//工厂(供应商)
                    supplierName: { type: 'string' },//工厂(供应商)

                    logisticsId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['logisticss']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },//物流
                    logisticsCode: { type: 'string' },//物流
                    logisticsName: { type: 'string' },//物流

                    isEnable: { type: 'integer' },//是否启用
                },
                pageSize: 10,
                //启用前端缓存
                // pageCache: true
            }
        },
        buttons: {
            button1: [{
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
                iconCls: "icon-bianji",
                click: "batchWarehouse"
            },
            {
                key: "batchPriority",
                label: "批量调整优先级",
                iconCls: "icon-bianji",
                click: "batchPriority"
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
                    key: "saleOrg",
                    compid: "saleOrgId",
                    label: "销售组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel": "01",
                        "EQ_isEnable": "1"
                    }
                },

                {
                    type: "refer",
                    compid: "productLineId",
                    key: "productLine",
                    label: "产品线",
                    refinfo: "productLine"
                },

                {
                    type: "refer",
                    compid: "goodsCategoryId",
                    key: "goodsCategory",
                    label: "商品分类",
                    refinfo: "goodsCategory",
                    clientParam: {
                        "EQ_isEnable": "1"
                    }
                },

                {
                    type: "refer",
                    compid: "goodsId",
                    key: "goods",
                    label: "商品",
                    refinfo: "goods"
                },
                {
                    type: "refer",
                    key: "province",
                    label: "所在省份",
                    domid: "provinceIdSearch",
                    compid: "provinceIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel": "1",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "refer",
                    key: "city",
                    label: "所在城市",
                    domid: "cityIdSearch",
                    compid: "cityIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel": "2",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "refer",
                    key: "county",
                    label: "所在区/县",
                    domid: "countyIdSearch",
                    compid: "countyIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel": "3",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "refer",
                    key: "town",
                    label: "所在街道",
                    domid: "townIdSearch",
                    compid: "townIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel": "4",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "refer",
                    compid: "warehouseId",
                    key: "warehouseId",
                    label: "仓库名称",
                    refinfo: "warehouse"
                }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "refer",
                    key: "saleOrgId",
                    compid: "saleOrgId",
                    label: "销售组织",
                    clientParam: {
                        "EQ_orgFuncRel": "01",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "所在省份",
                    domid: "provinceIdinfo",
                    compid: "provinceIdBase"
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase"
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase"
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
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
                    compid: "goodsCategoryId",
                    key: "goodsCategoryId",
                    label: "商品分类",
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
                    rel: { inventoryOrgId: "stockOrgId" }
                },
                {
                    type: "refer",
                    compid: "stockOrgId",
                    key: "stockOrgId",
                    label: "库存组织",
                    clientParam: {
                        "EQ_orgFuncRel": "03",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "text",
                    key: "priority",
                    label: "优先级"
                }
            ],
            dialog2: [
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
                    clientParam: {
                        "EQ_orgFuncRel": "03",
                        "EQ_isEnable": "1"
                    },
                    enable: false
                },
            ],
            dialog3: [
                {
                    type: "text",
                    key: "priority",
                    label: "优先级"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "warehouseschedule",
                umeta: {
                    id: "grid_warehouseschedule",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "saleOrgName",
                        dataType: "String",
                        title: "销售组织"
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
                        field: "goodsCategoryName",
                        dataType: "String",
                        title: "商品分类",
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品",
                    },
                    {
                        field: "warehouseName",
                        dataType: "String",
                        title: "仓库名称"
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
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    },
                ]
            }
        }
    };
    return new basemodel(model);
});
