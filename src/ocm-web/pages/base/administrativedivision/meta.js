define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            AdministrativeDivisionmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.AdminiDiviDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true, "maxLength": 50, errorMsg: "最大长度50字符" },//编码
                    fullName: { type: 'string', required: true },//全称
                    name: { type: 'string', required: true },//简称

                    parentId: { type: 'string' },//上级ID
                    parentCode: { type: 'string' },//上级
                    parentName: { type: 'string' },//上级
                    countryId: { type: 'string', required: true },
                    countryName: { type: 'string' },
                    // shortname: { type: 'string' },//简称
                    postcode: { type: 'string' },//邮编
                    isEnable: { type: 'string' },
                    areaLevel: { type: 'integer' },//市场区域级别
                    isLeaf: { type: 'integer' },
                    isParent: { type: 'integer' },
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            }
        },
        tree: {
            tree1: []
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
                },

            ]
        },
        //查询条件组
        searchs: {
            search1: [
                // {
                //     type: "refer",
                //     key: "country--id",
                //     label: "国家",
                //     refinfo: "country",
                //     refName: "国家"
                // },
                {
                    type: "text",
                    key: "code",
                    label: "编码"
                },
                {
                    type: "text",
                    key: "fullName",
                    label: "全称",
                },
                {
                    type: "text",
                    key: "name",
                    label: "简称",
                },
                {
                    type: "refer",
                    key: "parent--id",
                    label: "行政区划",
                    refinfo: "region",
                    ifSeachTreeCode: true,
                    referId: "regionKey"
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
            dialog1: [
                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    refinfo: "country",
                    refName: "国家",
                },
                {
                    type: "text",
                    key: "code",
                    label: "编码",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    compid: "name",
                    label: "简称",
                },
                {
                    type: "text",
                    key: "fullName",
                    label: "全称"
                },
                {
                    type: "text",
                    key: "postcode",
                    label: "邮编",
                },
                {
                    type: "refer",
                    key: "parentId",
                    referId: "parentId",
                    label: "上级行政区划",
                    compid: "parentId",
                    refinfo: "region",
                },
                {
                    type: "label",
                    key: "isEnable",
                    defaultvalue: '0',
                    label: "启用状态",
                },

            ]
        },
        //弹窗组
        cards: {
            card1: [
                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    refinfo: "country",
                    refName: "国家",
                },
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
                        title: "编码",
                        // renderType: "detailRender",
                        enable: false
                    },
                    {
                        field: "countryName",
                        dataType: "String",
                        title: "国家",
                    },
                    {
                        field: "fullName",
                        dataType: "String",
                        title: "全称",
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "简称",
                    },
                    {
                        field: "postcode",
                        dataType: "String",
                        title: "邮编"
                    },
                    {
                        field: "parentName",
                        dataType: "String",
                        title: "上级行政区划",
                        // visible: false
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
                    }
                ]
            }
        },
    };
    return new basemodel(model);
});


