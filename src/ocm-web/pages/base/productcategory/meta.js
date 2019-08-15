define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            productCategorymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.ProductCategoryDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    description: { type: 'string' },//描述
                    isEnable: { type: 'integer', default: 1 },// 状态
                    spaceCode: { type: 'string', required: true },// 所属功能空间
                    spaceId: { type: 'string', required: true },// 所属功能空间
                    spaceName: { type: 'string', required: true },// 所属功能空间
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
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
            },
            {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
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
            // {
            //     type: "refer",
            //     key: "space--id",
            //     label: "功能空间",
            //     refinfo: "custdocdef",
            //     refCode: "QY016",
            //     refName: "功能空间"
            // },
            {
                type: "radio",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '1', name: '启用' },
                    { value: '0', name: '停用' }
                ]
            }

            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true,
                // enable:false
            },
            {
                type: "text",
                key: "name",
                label: "名称"
            },
            {
                type: "refer",
                key: "parentProductCategoryId",
                label: "上级分类",
                refinfo: "productCategory",
                refCode: "",
                refName: "上级分类",
               
            },
            {
                type: "refer",
                key: "prodAttrStrucId",
                label: "属性结构",
                refinfo: "prodAttrStruc",
                refName: "属性结构"
            },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: 1
            },
            {
                type: "textarea",
                key: "description",
                label: "描述",
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
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "名称",
                },
                {
                    field: "description",
                    dataType: "String",
                    title: "描述",
                },
                {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
                    renderType: "enableRender"
                },
                {
                    field: "spaceName",
                    dataType: "String",
                    title: "功能区间",
                    visible: false
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
