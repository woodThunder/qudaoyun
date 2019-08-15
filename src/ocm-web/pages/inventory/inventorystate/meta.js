define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            InventoryStatesmeta: {
                params: {},
                meta: {
                    id: {
                        type: 'string'
                    },//id
                    code: {
                        type: 'string',
                        maxLength: 40,
                        required: true
                    }
                    ,//编码           
                    name: {
                        type: 'string',
                        maxLength: 40,
                        required: true,
                    },//名称
                    isUsable: {
                        type: 'integer'
                    },//可用性
                    note: {
                        type: 'string'
                    },//说明
                    isCheck:
                        {
                            type: 'integer',
                            defaultvalue: '0'
                        },//检验默认库存状态
                    isEnable: {
                        type: 'integer',
                        required: true
                    },// 状态

                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            }
        },
        //操作按钮组
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
        //查询条件组
        searchs: {
            search1: [
                {
                    type: "text",
                    key: "code",
                    label: "库存状态编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "库存状态名称",
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
        //弹窗组
        dialogs: {
            dialog1: [
                {
                    type: "text",
                    key: "code",
                    label: "库存状态编码",
                    required:true,
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    required:true,
                    label: "库存状态名称",
                }, 
                // {
                //     type: "combo",
                //     key: "isCheck",
                //     label: "检验默认库存状态",
                //     enable: false,
                //     defaultvalue: '0',
                //     dataSource: [
                //         { value: '0', name: '否' },
                //         { value: '1', name: '是' }
                //     ]
                // }
                {
                    type: "checkbox",
                    key: "isCheck",
                    label: "检验默认库存状态",
                    checkedValue:1,
                    unCheckedValue:0,
                    //enable:false
                },
                
                {
                   type: "combo",
                   key: "isUsable",
                   label: "可用性",
                   cls: 'isUsable',
                   defaultvalue: '1',
                   dataSource: [
                       { value: '0', name: '可用' },
                       { value: '1', name: '不可用' },
                   ],
                   //renderType:checkStatus,
                   //compid: "isUsable",                    
                   //disableInEdit: true

               },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: '0'
                },
                 {
                    type: "textarea",
                    key: "note",
                    label: "说明",
                    cls: "ui-textarea-item"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "simple1",
                umeta: {
                    id: "grid_simple1",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "code",
                        dataType: "String",
                        title: "库存状态编码",
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "库存状态名称",
                    },  {
                        field: "isCheck",
                        dataType: "Integer",
                        title: "检验默认库存状态",
                        renderType: "booleanRender",
                        "defaultvalue": "0",
                        width: 140
                    },
                    {
                        field: "isUsable",
                        dataType: 'Integer',
                        title: "可用性",
                        renderType: "checkStatus"
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "note",
                        dataType: "String",
                        title: "说明",
                        width: 500
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
                        dataType: "Date",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Date",
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
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});
