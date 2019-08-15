define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            suppliercategorymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.SupplierCategoryDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true},//名称
                    remark: { type: 'string'},//备注
                    parentId: { type: 'string' },//父供应商类型id
                    parentName: { type: 'string' },//父供应商类型name
                    parentCode: { type: 'string' },//父供应商类型code
                    isEnable: { type: 'Integer', required: true},// 状态
                },
                pageSize: 10,
            }
        },
        tree: {
            tree1: []
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
                }
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
                    key: "parent--id",
                    keyfordisplay: "parentName",
                    label: "分类",
                    refinfo: "suppliercategory",
                    ifSeachTreeCode: true,
                    referId: "suppliercategoryKey"
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
            ],
            search2: [
                {
                    type: "text",
                    key: "code",
                    label: "编码"
                },
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                required: true
            },
                {
                    type: "text",
                    key: "name",
                    label: "名称",
                    required: true
                },
                {
                    type: "refer",
                    key: "parentId",
                    keyfordisplay: "parentName",
                    label: "上级分类",
                    refinfo: "suppliercategory",
                },
            
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue:'0'
                },
                {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item"
                },
            ]
        },
        grids: {
            grid1: {
                domid: "suppliercategory",
                umeta: {
                    id: "grid_suppliercategory",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码"
                },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "parentName",
                        dataType: "String",
                        title: "上级分类"
                    },
                    {
                        dataType: "String",
                        field: "remark",
                        title: "备注"
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
                    },
                ]
            }
        }
    };
    return new basemodel(model);
});
