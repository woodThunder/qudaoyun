define(["ocm_basemodel"], function (basemodel) { "use strict";
    var model = {
        metas: {
            CustomerCategorymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.GoodsCategorymetaDto"
                },
                meta: {
                    id: { type: "string" },//id
                    parentId: { type: "string" },//上级分类
                    parentName: { type: "string" },
                    parentCode: { type: "string" },
                    code: { type: "string", required: true },//编码
                    name: { type: "string", required: true },//名称
                    //默认属性结构
                    defaultProdAttrStrucId: { type: "string" },
                    defaultProdAttrStrucName: { type: "string" },
                    defaultProdAttrStrucCode: { type: "string" },
                    //默认产品线
                    defaultProductLineId: { type: "string" },
                    defaultProductLineName: { type: "string" },
                    defaultProductLineCode: { type: "string" },
                    //默认品牌
                    defaultBrandId: { type: "string" },
                    defaultBrandName: { type: "string" },
                    defaultBrandCode: { type: "string" },
					displayInPortal : {type: 'integer',  default: '0'},
                    isLeaf: { type: "integer", default: '0' },// 是否末级
                    remark: { type: "string" },//备注
                    isEnable: { type: "integer"}// 启用状态
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true，
            }
        },
        tree: {
            tree1: []
        },

        //操作按钮组
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
            }, {
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }]
        },
        //查询条件组
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "refer",
                key: "parentId",
                label: "分类",
                refinfo: "goodsCategory",
                ifSeachTreeCode: true,
                referId: "goodsCategoryKey"
            }, {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }],
            search2: [{
                type: "text",
                key: "searchKey",
                label: "国家"
                // refinfo:"country",
                // refName: "国家"
            }]
        },
        //弹窗组
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "refer",
                key: "parentId",
                referId: "parentId",
                label: "上级分类",
                refinfo: "goodsCategory",
                clientParam: {
                    "EQ_isLeaf": "0","AUTH_refcod":"goodscategory"
                }
            }, {
                type: "refer",
                key: "defaultProdAttrStrucId",
                label: "默认属性结构",
                refinfo: "prodAttrStruc"
            }, {
                type: "refer",
                key: "defaultProductLineId",
                label: "默认产品线",
                refinfo: "productLine"
            }, {
                type: "refer",
                key: "defaultBrandId",
                label: "默认品牌",
                refinfo: "brand"
            }, {
                type: "checkbox",
                key: "isLeaf",
                label: "是否末级",
                defaultvalue:0,
                checkedValue: 1,
                unCheckedValue: 0
            }, 
            {
                type: "checkbox",
                key: "displayInPortal",
                label: "门户可显示",
                defaultvalue:0,
                checkedValue: 1,
                unCheckedValue: 0
            },{
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }, {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }]
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
                    showNumCol: true
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                    renderType: "detailRender",
                    enable: false
                }, {
                    field: "name",
                    dataType: "String",
                    title: "名称"
                }, {
                    field: "parentName",
                    dataType: "String",
                    title: "上级分类"
                }, {
                    field: "defaultProdAttrStrucName",
                    dataType: "String",
                    title: "默认属性结构"
                }, {
                    field: "defaultProductLineName",
                    dataType: "String",
                    title: "默认产品线"
                }, {
                    field: "defaultBrandName",
                    dataType: "String",
                    title: "默认品牌"
                }, {
                    field: "isLeaf",
                    dataType: "String",
                    title: "是否末级",
                    renderType: "whetherRender"
                },
                {
                    field: "displayInPortal",
                    dataType: "String",
                    title: "门户可显示",
                    renderType: "whetherRender"
                }, {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                }, {
                    field: "isEnable",
                    dataType: "String",
                    title: "启用状态",
                    renderType: "enableRender"
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
                    dataType: "Date",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "Date",
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
            }
        },
        details: {
            detail1: [
                {
                    key: "code",
                    label: "编码",
                },
                {
                    key: "name",
                    label: "名称",
                },
                {
                    key: "parentName",
                    label: "上级分类",
                },
                {
                    key: "defaultProdAttrStrucName",
                    label: "默认属性结构",
        
                },
                {
                    key: "defaultProductLineName",
                    label: "默认产品线",
                },
                {
                    key: "defaultBrandName",
                    label: "默认品牌",
                },
                {
                    key: "isLeaf",
                    label: "是否末级",
                    computed:"isLeafFmt"
                },
                {
                    key: "displayInPortal",
                    label: "门户可显示",
                    computed:"displayInPortalFmt"
                },
                {
                    key: "remark",
                    label: "备注",
                },
                {
                    key: "isEnable",
                    label: "启用状态",
                    computed:"enableFmt"
                }
            ]
        }
    };
    return new basemodel(model);
});


