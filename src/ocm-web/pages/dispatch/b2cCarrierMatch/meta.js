define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            b2ccarriermeta: {
                params: {
                    "cls": "com.yonyou.occ.dispatch.service.dto.B2cScheduleDto"
                },
                meta: {
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
                    supplierId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isCarrier":"1"}',
                        required: true
                    },//承运商
                    supplierCode: { type: 'string' },//承运商
                    supplierName: { type: 'string' },//承运商
                },
                pageSize: 10
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
                    key: "batchCarrier",
                    label: "批量调整承运商",
                    iconCls: "icon-edit",
                    click: "batchCarrier"
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
                },
                {
                    type: "refer",
                    compid: "supplierId",
                    key: "supplier",
                    label: "承运商名称",
                    refinfo:"suppliers",
                    clientParam: {
                        "EQ_isCarrier": "01"
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
                }
            ]
        },
        dialogs: {
            dialog1: [
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
                    compid: "supplierId",
                    key: "supplierId",
                    label: "承运商"
                }
            ],
            dialog2:[
                {
                    type: "refer",
                    compid: "supplierId",
                    key: "supplierId",
                    label: "承运商"
                }
            ],
        },
        grids: {
            grid1: {
                domid: "carriermatch",
                umeta: {
                    id: "grid_carrier",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
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
                        field: "supplierName",
                        dataType: "String",
                        title: "承运商"
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