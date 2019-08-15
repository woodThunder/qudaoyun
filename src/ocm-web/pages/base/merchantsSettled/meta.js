define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            Brandmeta: {
                meta: {
                    id: { type: 'string' },//id
                    customerId: { type: 'string', required: true},//商家id
                    isEnableStock: { type: 'integer', required: true},//是否启用库存
                    isEnable: { type: 'integer', required: true},// 状态
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
                }/*, {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle",
                    auth: true
                }, {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle",
                    auth: true
                }*/
            ]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "customer",
                refinfo: "customers",
                refcfg: {"ctx":"/uitemplate_web","isMultiSelectedEnabled":true},
                clientParam: {
                    "EQ_isEnable":"1"
                },
                opr: "IN",
                label: "商家参照列表",
            },{
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
                type: "refer",
                key: "customerId",
                refinfo: "customers",
                clientParam: {
                    "EQ_isEnable":"1"
                },
                label: "商家"
            }, {
                type:"radio",
                key:"isEnableStock",
                label:"是否启用库存组织",
                defaultvalue:'0',
                dataSource:[
                    {value:'1',name:'是'},
                    {value:'0',name:'否'}
                ]
            },{
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue:'0'
            }]
        },details: {
            detail: [{
                key: "customerCode",
                label: "商家编码"
            },{
                key: "customerName",
                label: "商家名称"
            },{
                key: "isEnableStock",
                dataType: "String",
                label: "是否启用库存",
                renderType: "whetherRender"
            },
                {
                    key: "isEnable",
                    label: "启用状态",
                    computed: "enableFmt"
                }
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
                        field: "customerCode",
                        dataType: "String",
                        title: "商家编码"
                    },
                    {
                        field: "customerName",
                        dataType: "String",
                        title: "商家名称"
                    },
                    {
                        field: "isEnableStock",
                        dataType: "String",
                        title: "是否启用库存",
                        renderType: "enableRender"
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

