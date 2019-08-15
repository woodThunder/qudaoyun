define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            ProductLineCategorymeta: {
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    description: { type: 'string' },//描述
                    statusCode: { type: 'integer', default: 1 },// 状态
                    prodGroupId: { type: 'string', required: true },//产品线
                    prodGroupCode: { type: 'string' },//产品线编码
                    prodGroupName: { type: 'string' },//产品线名称
                    productCategoryId: { type: 'string', required: true },//产品品类
                    productCategoryCode: { type: 'string' },//产品品类编码
                    productCategoryName: { type: 'string' },//产品品类名称
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
                type: "refer",
                key: "prodGroup--id",
                label: "产品线",
                refinfo: "productGroup"
            }
            ]
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "prodGroupId",
                label: "产品线",
                refinfo: "productGroup",
                refName: "产品线",
                disableInEdit: false,
                namefield: "name",
                valuefield: "code",
                keyfordisplay: "prodGroupName"
            },
            {
                type: "refer",
                key: "productCategoryId",
                label: "产品品类",
                refinfo: "productCategory",
                keyfordisplay: "productCategoryName",
                disableInEdit: false,
                multi: true
            }
            ]
        },
        grids: {
            grid1: {
                domid: "productlinecategory",
                umeta: {
                    id: "grid_productlinecategory",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "prodGroupName",
                    dataType: "String",
                    title: "产品线名称"
                },
                {
                    field: "productCategoryName",
                    dataType: "String",
                    title: "品类名称"
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

