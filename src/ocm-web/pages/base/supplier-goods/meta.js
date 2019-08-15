define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            supplierMeta: {
                meta: {
                    id: { type: "string" },//id
                    supplierId: { type: "string", required: true },//供应商
                    supplierCode: { type: "string" },//供应商
                    supplierName: { type: "string" },//供应商
                    goodsCategoryId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo['goodsCategory']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"商品分类"}'
                    },//商品分类
                    goodsCategoryCode: { type: "string" },//商品分类
                    goodsCategoryName: { type: "string" },//商品分类
                    goodsId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"商品"}'
                    },//商品
                    goodsCode: { type: "string" },//商品
                    goodsName: { type: "string" },//商品
             
                    supplierGoodsCode: { type: "string" },//供应商商品编码
                    supplierGoodsName: { type: "string" },//供应商商品名称
                    supplierCategoryName: { type: "string" },//供应商分类名称
                    purchasePrice: { type: "number", visible: false },// 采购价
                    ifExclude: { type: "integer", required: true }//是否排除
                },
                pageSize: 10
            },

            supplierGoodsMeta: {
                meta: {
                    id: { type: "string" },//id
                    supplierId: { type: "string", required: true },//供应商
                    supplierCode: { type: "string" },//供应商
                    supplierName: { type: "string" },//供应商
                    goodsCategoryId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo['goodsCategory']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"商品分类"}'
                    },//商品分类
                    goodsCategoryCode: { type: "string" },//商品分类
                    goodsCategoryName: { type: "string" },//商品分类
                    goodsId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"商品"}'
                    },//商品
                    goodsCode: { type: "string" },//商品
                    goodsName: { type: "string" },//商品
             
                    supplierGoodsCode: { type: "string" },//供应商商品编码
                    supplierGoodsName: { type: "string" },//供应商商品名称
                    supplierCategoryName: { type: "string" },//供应商分类名称
                    purchasePrice: { type: "number", visible: false },// 采购价
                    ifExclude: { type: "integer", required: true }//是否排除
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit"
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }, {
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle"
            }, {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
            }],
            button2: [{
                key: "return",
                label: "返回",
                cls: "ui-btn-green",
                click: "backPanel"
            }],
            button3: [{
                key: "save",
                label: "保存",
                click: "saveHandle",
                iconCls: "icon-tubiao-baocun"
            },
            {
                key: "cancel",
                label: "取消",
                click: "backPanel",
                iconCls: "icon-tubiao-guanbi-anxing"
            }],
            button4: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                cls: "ui-btn-orange",
                clickArg: "childList",
                iconCls: "icon-plus"
            },
            {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "childList",
                iconCls: "icon-shanchu1"
            },],
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "supplier--supplierCategory--id",
                label: "供应商分类",
                refinfo: "suppliercategory",
                clientParam: {}
            }, {
                type: "refer",
                key: "supplier--id",
                label: "供应商",
                refinfo: "suppliers"
            }, {
                type: "refer",
                key: "goodsCategory--id",
                label: "商品分类",
                refinfo: "goodsCategory"
            }, {
                type: "refer",
                key: "goods--id",
                label: "商品",
                refinfo: "goods"
            }, {
                type: "text",
                key: "supplierGoodsCode",
                label: "供应商商品编码"
            }, {
                type: "text",
                key: "supplierGoodsName",
                label: "供应商商品名称"
            }]
        },
        dialogs: {
            dialog1: [
                {
                    type: "string",
                    key: "supplierCategoryName",
                    label: "供应商分类",
                }, {
                    type: "refer",
                    key: "supplierId",
                    label: "供应商",
                    refinfo: "suppliers",
                    required: true,
                    rel: { "supplierCategoryName": "supplierCategoryName" }
                }, {
                    type: "refer",
                    key: "goodsCategoryId",
                    label: "商品分类",
                    refinfo: "goodsCategory"
                }, {
                    type: "refer",
                    key: "goodsId",
                    label: "商品",
                    refinfo: "goods"
                }, {
                    type: "text",
                    key: "supplierGoodsCode",
                    label: "供应商商品编码"
                }, {
                    type: "text",
                    key: "supplierGoodsName",
                    label: "供应商商品名称"
                },
                {
                    type: "radio",
                    key: "ifExclude",
                    label: "是否排除",
                    dataSource: [
                        { value: '1', name: '是' },
                        { value: '0', name: '否' },
                    ],
                    defaultvalue: '0'
                }
            ]
        },
        cards: {
            card1: [
                {
                    type: "refer",
                    key: "supplierCategoryId",
                    label: "供应商分类",
                    refinfo: "suppliercategory"
                }, {
                    type: "refer",
                    key: "supplierId",
                    label: "供应商",
                    refinfo: "suppliers",
                    required: true,
                    rel: { "supplierCategoryId": "supplierCategoryId" }
                }
            ],

        },
        grids: {
            grid1: {
                domid: "supplierGoods",
                umeta: {
                    id: "grid_supplierGoods",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "supplierCategoryName",
                    dataType: "String",
                    title: "供应商分类"
                }, {
                    field: "supplierName",
                    dataType: "String",
                    title: "供应商"
                }, {
                    field: "goodsCategoryName",
                    dataType: "String",
                    title: "商品分类"
                }, {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品"
                }, {
                    field: "supplierGoodsCode",
                    dataType: "String",
                    title: "供应商商品编码"
                }, {
                    field: "supplierGoodsName",
                    dataType: "String",
                    title: "供应商商品名称"
                }, {
                    field: "purchasePrice",
                    dataType: "Number",
                    title: "采购价",
                    visible: false
                }, {
                    dataType: "Integer",
                    field: "ifExclude",
                    title: "是否排除",
                    renderType: "whetherRender"
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
                    dataType: "Datetime",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "Datetime",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            },
            grid2: {
                domid: "childList",
                umeta: {
                    id: "grid_childList",
                    data: "childList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "goodsCategoryCode",
                        dataType: "String",
                        title: "商品分类编码",
                        editable:false
                    },
                    {
                        field: "goodsCategoryId",
                        dataType: "String",
                        title: "商品分类",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refcode": "goodsCategoryCode",
                                "refname": "goodsCategoryName",
                            }
                        },
                        "showField": "goodsCategoryName",
                        "required": true
                    },
                    {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                        editable:false
                    },
                    {
                        field: "goodsId",
                        dataType: "String",
                        title: "商品",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string",
                            "rel": {
                                "refcode": "goodsCode",
                                "refname": "goodsName"
                            }
                        },
                        "showField": "goodsName",
                        "required": true
                    },
                  
                    {
                        "field": "ifExclude",
                        "dataType": "integer",
                        "title": "是否排除",
                        "required": true,
                        "editOptions": {
                            "id": "isDefaultCA",
                            "type": "combo",
                            "datasource": "whetherSource",
                            defaultvalue: "0",
                        },
                        "editType": "combo",
                        defaultvalue: "0",
                        "renderType": "whetherRender"
                    },
                    {
                        field: "supplierGoodsCode",
                        dataType: "String",
                        title: "供应商商品编码",
                    },
                    {
                        field: "supplierGoodsName",
                        dataType: "String",
                        title: "供应商商品",
                    },
                   ]
            },
            grid3: {
                domid: "childList1",
                umeta: {
                    id: "grid_childList1",
                    data: "childList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "goodsCategoryCode",
                        dataType: "String",
                        title: "商品分类编码",
                        editable:false
                    },
                    {
                        field: "goodsCategoryName",
                        dataType: "String",
                        title: "商品分类",
                    },
                    {
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码",
                        editable:false
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品",
                    },
                  
                    {
                        "field": "ifExclude",
                        "dataType": "integer",
                        "title": "是否排除",
                        "renderType": "whetherRender"
                    },
                    {
                        field: "supplierGoodsCode",
                        dataType: "String",
                        title: "供应商商品编码",
                        editable:false
                    },
                    {
                        field: "supplierGoodsName",
                        dataType: "String",
                        title: "供应商商品",
                    },
                   ]
            },
        }
    };
    return new basemodel(model);
});
