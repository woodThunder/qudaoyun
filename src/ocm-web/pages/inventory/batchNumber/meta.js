define(['ocm_basemodel'], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            batchList: {
                params: {},
                meta: {
                    id: {
                        type: 'string'
                    },
                    code: {
                        type: 'string',
                        required: true
                    },
                    goodsId: {
                        type: 'string'
                    }, //商品
                    goodsCode: {
                        type: 'string'
                    },
                    goodsName: {
                        type: 'string'
                    },
                    productId: {
                        type: 'string'
                    }, //产品
                    productCode: {
                        type: 'string'
                    },
                    productName: {
                        type: 'string'
                    },
                    productLineId: {
                        type: 'string'
                    }, //产品线
                    productLineCode: {
                        type: 'string'
                    },
                    productLineName: {
                        type: 'string',
                        required: true
                    },
                    batchNum: {
                        type: 'string',
                        maxLength: '40'
                    }, //批次号
                    productionDate: {
                        type: 'date'
                    }, //生产日期
                    invalidDate: {
                        type: 'date'
                    }, //失效日期
                    supplierBatchNum: {
                        type: 'string',
                        maxLength: '40'
                    }, //供应商批次号
                    productionBatchNumode: {
                        type: 'string',
                        maxLength: '40'
                    }, //生产批次号
                    firstWarehousingDate: {
                        type: 'date'
                    }, //首次入库日期
                    remark: {
                        type: 'string',
                        maxLength: '200'
                    }, //备注
                    isEnable: {
                        type: 'integer',
                        default: '0'
                    }, //是否启用
                    lastCheckDate: {
                        type: 'data'
                    }, //上次检验日期                   

                },
                pageSize: 10
            },
        },
        buttons: {
            buttonSource: [{
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "beforeEdit"
                },
                {
                    key: 'del',
                    label: '删除',
                    iconCls: 'icon-shanchu1',
                    click: 'del'
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
                }
            ]
        },
        searchs: {
            search: [{
                    type: 'text',
                    key: 'batchNum',
                    label: '批次号'
                },
                {
                    type: "refer",
                    key: "goods",
                    label: "商品",
                    refinfo: "goods",
                    refName: '商品'
                },
                {
                    type: 'refer',
                    key: 'product',
                    label: '产品',
                    refinfo: "product",
                    refName: '产品'
                },
                {
                    type: 'refer',
                    key: 'productLine',
                    label: '产品线',
                    refinfo: "productLine",
                    refName: '产品线'
                },
                {
                    type: 'text',
                    key: 'supplierbatchNo',
                    label: '供应商批号'
                },
                {
                    type: 'text',
                    key: 'productionBatchNum',
                    label: '生产批次号'
                },
                {
                    type: 'date',
                    key: 'productionDate',
                    label: '生产日期'
                },
                {
                    type: 'date',
                    key: 'invalidDate',
                    label: '失效日期'
                }
            ]
        },
        dialogs: {
            dialog: [{
                    type: 'text',
                    key: 'batchNum',
                    label: '批次号'
                },
                {
                    type: "refer",
                    key: "goodsId",
                    compid:"goodsIdBase",
                    label: "商品",
                    refinfo: "goods",
                    refName: '商品',
                    clientParam: {
                        "EQ_enableBatchNumberManage":"1",
                        "EQ_isEnable":"1"
                    },
                },
                {
                    type: 'refer',
                    key: 'productId',
                    compid:"productIdBase",
                    label: '产品',
                    refinfo: "product",
                    refName: '产品'
                },
                {
                    type: 'refer',
                    key: 'productLineId',
                    compid:"productLineIdBase",
                    label: '产品线',
                    refinfo: "productLine",
                    refName: '产品线'
                },
                {
                    type: 'date',
                    key: 'productionDate',
                    label: '生产日期'
                },
                {
                    type: 'date',
                    key: 'invalidDate',
                    label: '失效日期'
                },
                {
                    type: 'text',
                    key: 'supplierBatchNum',
                    label: '供应商批号'
                },
                {
                    type: 'text',
                    key: 'productionBatchNum',
                    label: '生产批次号'
                },
                {
                    type: 'date',
                    key: 'firstWarehousingDate',
                    label: '首次入库日期'
                },
                {
                    type: 'label',
                    label: '状态',
                    key: 'isEnable'
                },
                {
                    type: 'textarea',
                    label: '备注',
                    key: 'remark',
                    cls: "ui-textarea-item"
                }
            ]
        },
        grids: {
            grid: {
                domid: "batch",
                umeta: {
                    id: "grid_batch",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                        field: "goodsCode",
                        dataType: "String",
                        title: "商品编码"
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称"
                    },
                    {
                        field: "productCode",
                        dataType: "String",
                        title: "产品编码"
                    },
                    {
                        field: "productName",
                        dataType: "String",
                        title: "产品名称"
                    },
                    {
                        field: "productLineCode",
                        dataType: "String",
                        title: "产品线编码"
                    },
                    {
                        field: "productLineName",
                        dataType: "String",
                        title: "产品线名称"
                    },
                    {
                        field: "batchNum",
                        dataType: "String",
                        title: "批次号"
                    },
                    {
                        field: "productionDate",
                        dataType: "Date",
                        title: "生产日期"
                    },
                    {
                        field: "invalidDate",
                        dataType: "Date",
                        title: "失效日期"
                    },
                    {
                        field: "supplierBatchNum",
                        dataType: "String",
                        title: "供应商批次号"
                    },
                    {
                        field: "productionBatchNum",
                        dataType: "String",
                        title: "生产批次号"
                    },
                    {
                        field: "firstWarehousingDate",
                        dataType: "Date",
                        title: "首次入库日期"
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "creationTime",
                        dataType: "Date",
                        title: "批次形成时间"
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注"
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    },
                    {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "修改人",
                        "visible": false
                    },
                    {
                        "field": "modifiedTime",
                        "dataType": "Date",
                        "title": "修改时间",
                        "visible": false
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