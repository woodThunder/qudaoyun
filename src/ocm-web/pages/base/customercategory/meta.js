define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            CustomerCategorymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustomerCategorymetaDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true, "maxLength": 50, errorMsg: "最大长度50字符" },//编码
                    name: { type: 'string', required: true },//名称
                    isEnable: { type: 'string', required: true},
                    remark: {type: 'string'},//备注
                    // longitude: {type: 'string'},//经度
                    // latitude: {type: 'string'},//纬度
                    parentId: {
                        type: "string",
                        // required: true,
                        "refmodel": JSON.stringify(refinfo["customer-category"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\",\"refName\":\"客户分类\"}",
                        "refparam": "{\"EQ_isEnable\": 1}"
                    },//上级ID
                    parnetName: { type: 'string' },
                    // countryId: { type: 'string', required: true },
                    // countryName: { type: 'string' },
                    // shortname: { type: 'string' },//简称
                    // postcode: { type: 'string', regExp: '/^[0-9]{6}$/', errorMsg: '邮政编码格式不正确' },//邮编
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
                    key: "name",
                    label: "名称",
                },
                // {
                //     type: "text",
                //     key: "shortname",
                //     label: "简称",
                // },
                /*      {
                 type:"refer",
                 key:"parent--id",
                 label:"上级行政区划",
                 refinfo:"region"
                 },*/
                 {
                    type: "refer",
                    key: "parent--id",
                    // referId: "parentId",
                    label: "上级分类",
                    refinfo: "customer-category",
                    referId: "customercategoryId",
                    ifSeachTreeCode: true
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
                    type: "text",
                    key: "code",
                    label: "编码",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue:'0',
                },
				{
				  type: "refer",
				  key: "parentId",
				  referId: "parentId",
				  label: "分类"
				},
                {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
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
                        title: "编码",
                    //    renderType: "detailRender",
                        enable: false
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    },
                    {
                        field: "parentName",
                        dataType: "String",
                        title: "上级客户分类",
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注",
                        visible: false
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

        // details: {
        //     detail: [
        //         {
        //             key: "code",
        //             label: "行政区划编码",
        //         },
        //         {
        //             key: "name",
        //             label: "行政区划名称",
        //         },
        //         {
        //             key: "leaderPersonName",
        //             label: "部门负责人",
        //         },
        //         {
        //             key: "tel",
        //             label: "部门联系人电话",
        //
        //         },
        //         {
        //             key: "parentName",
        //             label: "上级部门编码",
        //         },
        //         {
        //             key: "organizationName",
        //             label: "所属组织编码",
        //         },
        //         {
        //             key: "remark",
        //             label: "备注",
        //         },
        //         {
        //             key: "enableFmt",
        //             label: "启用状态",
        //             computed:"enableFmt"
        //         }
        //     ]
        // }
    };
    return new basemodel(model);
});


