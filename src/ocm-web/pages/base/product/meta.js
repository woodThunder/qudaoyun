define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            Productmeta: {
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string'},//编码
                    name: { type: 'string', required: true },//名称
                    goodsCategoryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goodsCategory']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"所属分类"}',
                        required: true
                    },//所属分类
                    goodsCategoryName: { type: 'string' },//所属分类
                    model: { type: 'string' },
                    productLineId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['productLine']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"产品线"}'
                    },//产品线
                    productLineName: { type: 'string' },//产品线
                    brandId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['brand']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"品牌"}'
                    },//品牌
                    brandName: { type: 'string' },//品牌
                    prodAttrStrucId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['prodAttrStruc']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"属性结构"}'
                    },//属性结构
                    prodAttrStrucName: { type: 'string' },//属性结构
                    unitId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['utils']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"单位"}'
                    },//单位
                    unitName: { type: 'string' },//单位名称
                    isEnable: { type: 'integer', required: true },// 状态
                },
                pageSize: 10,
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
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            },
            {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
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
            },
            ]
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            },
            {
                type: "text",
                key: "name",
                label: "名称",
            },
            {
                type: "refer",
                key: "goodsCategory--id",
                label: "商品分类",
                refinfo: "goodsCategory"
            },
            {
                type: "text",
                key: "model",
                label: "型号",
            },
            {
                type: "refer",
                key: "productLine--id",
                label: "产品线",
                refinfo: "productLine"
            },
            {
                type: "refer",
                key: "brand--id",
                label: "品牌",
                refinfo: "brand"
            },
            {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                enable: false
            },
            {
                type: "text",
                key: "name",
                label: "名称"
            },
            {
                type: "refer",
                key: "goodsCategoryId",
                label: "所属分类",
            },
            {
                type: "text",
                key: "model",
                label: "型号",
            },
            {
                type: "refer",
                key: "productLineId",
                label: "产品线",
            },
            {
                type: "refer",
                key: "brandId",
                label: "品牌",
            },
            {
                type: "refer",
                key: "prodAttrStrucId",
                label: "属性结构",
            },
			
            {
                type: "refer",
                key: "unitId",
                label: "单位",
            },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            },
            ]
        },
        grids: {
            grid1: {
                domid: "brand",
                umeta: {
                    id: "grid_brand",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                    renderType: "detailRender"
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "名称"
                },
                {
                    field: "goodsCategoryName",
                    dataType: "String",
                    title: "所属分类名称",
                },
                {
                    field: "model",
                    dataType: "String",
                    title: "型号",
                },
                {
                    field: "brandName",
                    dataType: "String",
                    title: "品牌",
                },
                {
                    field: "productLineName",
                    dataType: "String",
                    title: "产品线",
                },
                {
                    field: "prodAttrStrucName",
                    dataType: "String",
                    title: "属性结构名称",
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位名称",
                },
                {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
                    renderType: "enableRender"
                },
                {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                },
                {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                },
                {
                    field: "creationTime",
                    dataType: "Datetime",
                    title: "创建时间",
                    visible: false
                },
                {
                    field: "modifiedTime",
                    dataType: "Datetime",
                    title: "修改时间",
                    visible: false
                },
                {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation",
                    fixed: true,
                    width: "110px"
                },
                ]
            }
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码",
            },
            {
                key: "name",
                label: "名称"
            },
            {
                key: "goodsCategoryName",
                label: "所属分类名称",
            },
            {
                key: "model",
                label: "型号",
            },
            {
                key: "brandName",
                label: "品牌",
            },
            {
                key: "productLineName",
                label: "产品线",
            },
            {
                key: "prodAttrStrucName",
                label: "属性结构名称",
            },
            {
                key: "unitName",
                label: "单位名称",
            },
            {
                key: "isEnable",
                label: "状态",
                computed: "enableFmt"
            }]
        }
    };
    return new basemodel(model);
});

