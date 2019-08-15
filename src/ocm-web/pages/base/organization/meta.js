// define(["ocm_basemodel"], function (basemodel) {
//     "use strict";
//     var model = {
//         metas: {
//             organizationmeta: {
//                 params: {
//                     "cls": "com.yonyou.ocm.base.service.dto.OrganizationDto"
//                 },
//                 meta: {
//                     id: { type: "string" },//id
//                     parentId: { type: "string" },//上级组织
//                     parentName: { type: "string" },
//                     parentSaleOrgId: { type: "string" },//上级销售组织
//                     parentSaleOrgName: { type: "string" },//上级销售组织
//                     parentAdminOrgId: { type: "string" },//上级行政组织
//                     parentAdminOrgName: { type: "string" },//上级行政组织
//                     code: { type: "string", required: true },//编码
//                     name: { type: "string", required: true },//名称
//                     remark: { type: "string" },//备注
//                     principalId: { type: "string" },//负责人
//                     principalCode: { type: "string", required: true },
//                     principalName: { type: "string", required: true },
//                     address: { type: "string" },//地址
//                     tel: { type: "string" },//电话
//                     // organizationTypeId: {type: "string", required: true},//组织类型
//                     organizationTypeCode: {
//                         type: 'string', required: true,
//                         "refmodel": JSON.stringify(refinfo['custdocdef']),
//                         "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY105","refName":"组织类型"}'
//                     },//组织类型
//                     organizationTypeName: { type: "string", required: true },//组织类型
//                     isLegalPersonCorp: { type: "integer"},//法人公司
//                     isAdministration: { type: "string"},//行政
//                     isSale: { type: "string"},//销售
//                     isInventory: { type: "string"},//库存
//                     // isLogistrics: { type: "string"},//物流
//                     isPurchase: { type: "string"},//采购
//                     isEnable: { type: "integer" }// 状态
//                 },
//                 pageSize: 10
//                 //是否启用前端缓存
//                 // pageCache: true，
//             }
//         },
//         //操作按钮组
//         buttons: {
//             button1: [
//                 {
//                     key: "add",
//                     label: "新增",
//                     iconCls: "icon-plus",
//                     click: "beforeEdit"
//                 },
//                 {
//                     key: "del",
//                     label: "删除",
//                     iconCls: "icon-shanchu1",
//                     click: "del"
//                 },
//                 {
//                     key: "enable",
//                     label: "启用",
//                     iconCls: "icon-qiyong",
//                     click: "enable"
//                 },
//                 {
//                     key: "disable",
//                     label: "停用",
//                     iconCls: "icon-tingyong",
//                     click: "disable"
//                 }
//             ]
//         },
//         //查询条件组
//         searchs: {
//             search1: [
//                 {
//                     type: "text",
//                     key: "code",
//                     label: "编码"
//                 },
//                 {
//                     type: "text",
//                     key: "name",
//                     label: "名称"
//                 },
//                 {
//                     type: "refer",
//                     key: "principal--id",
//                     label: "负责人",
//                     refinfo: "person"
//                 },
//                 {
//                     type: "refer",
//                     key: "parent--id",
//                     label: "上级组织名称",
//                     refinfo: "organization_ocm",
//                 },
//                 // {
//                 //     type: "refer",
//                 //     key: "parent--id",
//                 //     label: "上级组织",
//                 //     refinfo: "organization_ocm",
//                 //     isReturnCode: "true"
//                 // },
//                 // {
//                 //     type: "text",
//                 //     key: "parentSaleOrg--name",
//                 //     label: "上级销售组织名称"
//                 // },
//                 // {
//                 //     type: "refer",
//                 //     key: "parentSaleOrg--id",
//                 //     label: "上级销售组织",
//                 //     refinfo: "organization_ocm",
//                 //     isReturnCode: "true"
//                 // },
//                 // {
//                 //     type: "text",
//                 //     key: "parentAdminOrg--name",
//                 //     label: "上级行政组织名称"
//                 // },
//                 // {
//                 //     type: "refer",
//                 //     key: "parentAdminOrg--id",
//                 //     label: "上级行政组织",
//                 //     refinfo: "organization_ocm",
//                 //     isReturnCode: "true"
//                 // },
//                 {
//                     type: "combo",
//                     key: "organizationType",
//                     label: "组织类型",
//                     url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY105",
//                     namefield: "name",
//                     valuefield: "code"
//                 },
//                 {
//                     type: "combo",
//                     key: "isEnable",
//                     label: "启用状态",
//                     dataSource: [
//                         { value: '', name: '全部' },
//                         { value: '0', name: '未启用' },
//                         { value: '1', name: '已启用' },
//                         { value: '2', name: '已停用' }
//                     ]
//                 },
//                 // {
//                 //     type: "radio",
//                 //     key: "isLegalPersonCorp",
//                 //     label: "法人公司",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isAdministration",
//                 //     label: "行政",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isSale",
//                 //     label: "销售",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isInventory",
//                 //     label: "库存",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isLogistrics",
//                 //     label: "物流",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isPurchase",
//                 //     label: "采购",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
//                 //     default: "0"
//                 // },
//                 // {
//                 //     type:"radio",
//                 //     key:"isProduceFactory",
//                 //     label:"生产工厂",
//                 //     // enable:false,
//                 //     dataSource:[{value:'1',name:'是'},{value:'0',name:'否'}],
//
//                 // },
//
//             ]
//         },
//         //弹窗组
//         dialogs: {
//             dialog1: [
//                 {
//                     type: "text",
//                     key: "code",
//                     label: "编码",
//                     disableInEdit: true
//                 },
//                 {
//                     type: "text",
//                     key: "name",
//                     label: "名称"
//                 },
//                 {
//                     type: "refer",
//                     key: "parentId",
//                     label: "上级组织",
//                     refinfo: "organization_ocm",
//                     clientParam: {
//                         "EQ_isEnable": "1", "EQ_dr": "0"
//                     }
//                 },
//                 {
//                     type: "refer",
//                     key: "parentSaleOrgId",
//                     label: "上级销售组织",
//                     refinfo: "organization_ocm",
//                     clientParam: {
//                         "EQ_isEnable": "1", "EQ_dr": "0",
//                         "EQ_isSale":"1"
//                     }
//                 },
//                 {
//                     type: "refer",
//                     key: "parentAdminOrgId",
//                     label: "上级行政组织",
//                     refinfo: "organization_ocm",
//                     clientParam: {
//                         "EQ_isEnable": "1", "EQ_dr": "0",
//                         "EQ_isAdministration":"1"
//                     }
//                 },
//                 {
//                     type: "refer",
//                     key: "principalId",
//                     label: "负责人",
//                     refinfo: "person",
//                     refName: "负责人",
//                     clientParam: {
//                         // "EQ_isEnable":"1","EQ_dr":"0"
//                     }
//                 },
//
//                 {
//                     type: "text",
//                     key: "address",
//                     label: "地址"
//                 },
//                 {
//                     type: "text",
//                     key: "tel",
//                     label: "电话"
//                 },
//                 {
//                     type: "combo",
//                     key: "organizationTypeCode",
//                     label: "组织类型",
//                     url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY105",
//                     namefield: "name",
//                     valuefield: "code"
//                 },
//
//                 // {
//                 //     type: "radio",
//                 //     key: "isLegalPersonCorp",
//                 //     label: "法人公司",
//                 //     defaultvalue: "0",
//                 //     dataSource: [
//                 //         { value: "1", name: "是" },
//                 //         { value: "0", name: "否" }
//                 //     ],
//                 //
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isAdministration",
//                 //     label: "行政",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
//                 //     defaultvalue: "0"
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isSale",
//                 //     label: "销售",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
//                 //     defaultvalue: "0"
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isInventory",
//                 //     label: "库存",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
//                 //     defaultvalue: "0"
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isLogistrics",
//                 //     label: "物流",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
//                 //     defaultvalue: "0"
//                 // },
//                 // {
//                 //     type: "radio",
//                 //     key: "isPurchase",
//                 //     label: "采购",
//                 //     // enable:false,
//                 //     dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
//                 //     defaultvalue: "0"
//                 // },
//                 // {
//                 //     type:"radio",
//                 //     key:"isProduceFactory",
//                 //     label:"生产工厂",
//                 //     // enable:false,
//                 //     dataSource:[{value:'1',name:'是'},{value:'0',name:'否'}],
//                 //     defaultvalue:"0"
//                 // },
//                 {
//                     type: "label",
//                     key: "isEnable",
//                     label: "启用状态",
//                     defaultvalue: "0"
//                 },
//                 // {
//                 //     type:"checkbox",
//                 //     key:"promtype",
//                 //     keyArray:[
//                 //         {key:'isLegalPersonCorp',label:'法人公司',defaultvalue:"0"},
//                 //         {key:'isAdministration',label:'行政',defaultvalue:"0"},
//                 //         {key:'isSale',label:'销售',defaultvalue:"0"},
//                 //         {key:'isInventory',label:'库存',defaultvalue:"0"},
//                 //         {key:'isLogistrics',label:'物流',defaultvalue:"0"},
//                 //         {key:'isPurchasingOrganization',label:'采购',defaultvalue:"0"}
//                 //     ],
//                 //     multi:true,
//                 //     cls:"ui-checkboxes-item",
//                 //     label:"组织职能",
//                 //     checkedValue:1,
//                 //     unCheckedValue:0,
//                 //     defaultvalue:"0"
//                 // },
//                 {
//                     type: "textarea",
//                     key: "remark",
//                     label: "备注",
//                     cls: "ui-textarea-item"
//                 }
//             ]
//         },
//         grids: {
//             grid1: {
//                 domid: "simple1",
//                 umeta: {
//                     id: "grid_simple1",
//                     data: "simpleList",
//                     type: "grid",
//                     editable: false,
//                     multiSelect: true,
//                     showNumCol: true
//                 },
//                 columns: [
//                     {
//                         field: "code",
//                         dataType: "string",
//                         title: "编码",
//                         renderType: "detailRender"
//                     },
//                     {
//                         field: "name",
//                         dataType: "string",
//                         title: "名称"
//                     },
//                     {
//                         field: "parentName",
//                         dataType: "string",
//                         title: "上级组织名称"
//                     },
//                     {
//                         field: "parentSaleOrgName",
//                         dataType: "string",
//                         title: "上级销售组织名称"
//                     },
//                     {
//                         field: "parentAdminOrgName",
//                         dataType: "string",
//                         title: "上级行政组织名称"
//                     },
//                     {
//                         field: "principalName",
//                         dataType: "string",
//                         title: "负责人"
//                     },
//                     {
//                         field: "remark",
//                         dataType: "string",
//                         title: "备注",
//                         visible: false
//                     },
//                     {
//                         field: "isEnable",
//                         dataType: "string",
//                         title: "状态",
//                         renderType: "enableRender"
//                     },
//                     {
//                         field: "creator",
//                         dataType: "string",
//                         title: "创建人",
//                         visible: false
//                     },
//                     {
//                         field: "modifier",
//                         dataType: "string",
//                         title: "修改人",
//                         visible: false
//                     },
//                     {
//                         field: "creationTime",
//                         dataType: "Date",
//                         title: "创建时间",
//                         visible: false
//                     },
//                     {
//                         field: "modifiedTime",
//                         dataType: "Date",
//                         title: "修改时间",
//                         visible: false
//                     },
//                     {
//                         field: "operation",
//                         dataType: "string",
//                         title: "操作",
//                         renderType: "operation4single",
//                         fixed: true,
//                         width: "110px"
//                     }
//                 ]
//             }
//         },
//         details: {
//             detail1: [
//                 {
//                     key: "code",
//                     label: "编码"
//                 },
//                 {
//                     key: "name",
//                     label: "名称"
//                 },
//                 {
//                     key: "parentName",
//                     label: "上级组织"
//                 },
//                 {
//                     key: "parentSaleOrgName",
//                     label: "上级销售组织"
//                 },
//                 {
//                     key: "parentAdminOrgName",
//                     label: "上级行政组织"
//                 },
//                 {
//                     key: "principalName",
//                     label: "负责人"
//                 },
//                 {
//                     key: "address",
//                     label: "地址"
//                 },
//                 {
//                     key: "tel",
//                     label: "电话"
//                 },
//                 {
//                     key: "organizationTypeName",
//                     label: "组织类型"
//                 },
//                 {
//                     key: "promtype",
//                     label: "组织职能",
//                     computed: "promtype"
//                 },
//                 {
//                     key: "remark",
//                     label: "备注"
//                 },
//                 {
//                     key: "isEnable",
//                     label: "启用状态",
//                     computed: "enableFmt"
//                 }
//             ]
//         }
//     };
//     return new basemodel(model);
// });





define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            organizationmeta: {//组织元数据
                meta: {
                    id: { type: 'string' },//id
                    code: { type: "string", required: true },//编码
                    name: { type: "string", required: true },//名称
                    organizationTypeCode: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY105","refName":"组织类型"}'
                    },//组织类型
                    organizationTypeName: { type: "string", required: true },//组织类型
                    principalId: { type: "string" },//负责人
                    principalCode: { type: "string", required: true },
                    principalName: { type: "string", required: true },
                    address: { type: "string" },//地址
                    tel: { type: "string" },//电话
                    parentId: { type: "string" },//上级组织
                    parentCode: { type: 'string' },
                    parentName: { type: "string" },
                    isEnable: { type: 'integer' },// 状态
                    remark: { type: "string" },//备注
                    orgFuncRels: { type: "string"},
                    //国家
                    countryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    }, //注册国别ID
                    countryName: {
                        type: 'string'
                    }, //注册国家名称
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    }, //注册所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //注册所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    }, //注册所在城市ID
                    cityName: {
                        type: 'string'
                    }, //注册所在城市名称
                    cityCode: {
                        type: 'string'
                    },
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    }, //注册所在区/县
                    countyName: {
                        type: 'string'
                    }, //注册所在区/县名称
                    countyCode: {
                        type: 'string'
                    },
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    }, //注册所在街道/镇
                    townName: {
                        type: 'string'
                    }, //注册所在街道/镇名称
                    townCode: {
                        type: 'string'
                    },
                    detailAddr: {
                        type: 'string',
                    }, //经销商地址
                    postalCode: {
                        type: 'string',
                    }, //邮编
                },
                pageSize: 10,
            },
            organizationtreemeta: {//组织元数据
                meta: {
                    id: { type: 'string' },//id
                    code: { type: "string", required: true },//编码
                    name: { type: "string", required: true },//名称
                    organizationTypeCode: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY105","refName":"组织类型"}'
                    },//组织类型
                    organizationTypeName: { type: "string", required: true },//组织类型
                    principalId: { type: "string" },//负责人
                    principalCode: { type: "string", required: true },
                    principalName: { type: "string", required: true },
                    address: { type: "string" },//地址
                    tel: { type: "string" },//电话
                    parentId: { type: "string" },//上级组织
                    parentCode: { type: 'string' },
                    parentName: { type: "string" },
                    isEnable: { type: 'integer'},// 状态
                    remark: { type: "string" },//备注
                    orgFuncRels: { type: "string"},
                },
                pageSize: 10,
            },
            orgfuncrefmeta: {//组织职能关系元数据
                meta: {
                    id:{type:"string"},
                    orgFuncId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['orgfunc']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织职能"}',
                    },
                    orgFuncCode: { type: 'string' },
                    orgFuncName: { type: 'string' },
                    funcParentOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织"}',
                    },
                    funcParentOrgCode: { type: 'string' },
                    funcParentOrgName: { type: 'string' },
                    isEnable: { type: 'integer',default:"1"  },// 状态
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
                }
            ],
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
                    click: "cancelHandle",
                    iconCls: "icon-tubiao-guanbi-anxing"
                }],
            button4: [
                {
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
                },{
                    key: "enableChild",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enableVal"
                },
                {
                    key: "disableChild",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disableVal"
                }

            ],
            button5: [
                {
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enableVal",
                    auth: true
                },
                {
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disableVal",
                    auth: true
                },
            ],
        },

                // {
                //     type: "refer",
                //     key: "orgfuncId",
                //     label: "组织职能",
                //     refinfo: "orgfunc",
                // },
        //查询条件组
        searchs: {
            search1: [
                {
                    type: "text",
                    key: "code",
                    label: "编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },
                {
                    type: "refer",
                    key: "principal--id",
                    label: "负责人",
                    refinfo: "person",
                },
                {
                    type: "refer",
                    key: "parent--id",
                    label: "组织名称",
                    refinfo: "organization_ocm",
                    ifSeachTreeCode: true,
                    referId: "organization_ocmId"
                },
                {
                    type: "combo",
                    key: "organizationType",
                    label: "组织类型",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY105",
                    namefield: "name",
                    valuefield: "code"
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
                },
                {
                    type: "radio",
                    key: "isLegalPersonCorp",
                    label: "法人公司",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
                },
                {
                    type: "radio",
                    key: "isAdministration",
                    label: "行政",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
                },
                {
                    type: "radio",
                    key: "isSale",
                    label: "销售",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
                },
                {
                    type: "radio",
                    key: "isInventory",
                    label: "库存",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
                },
                {
                    type: "radio",
                    key: "isPurchase",
                    label: "采购",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
                    default: "0"
                },
                {
                    type: "radio",
                    key: "isLogistrics",
                    label: "物流",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
                },
                {
                    type: "radio",
                    key: "isFinance",
                    label: "财务",
                    // enable:false,
                    dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }],
                    default: "0"
                },
            ]
        },
        cards: {
            card1: [{
                type: "text",
                key: "code",
                label: "编码",
            },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },
                {
                    type: "combo",
                    key: "organizationTypeCode",
                    label: "组织类型",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY105",
                    namefield: "name",
                    valuefield: "code"
                },
                {
                    type: "refer",
                    key: "principalId",
                    label: "组织负责人",
                    refinfo: "person",
                    refName: "负责人",
                    domid: "principalIdinfo",
                    clientParam: {
                        "EQ_isEnable": "1",
                        "EQ_dr": "0"
                    }
                },
                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    compid: "countryIdBase",
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "所在省份",
                    compid: "provinceIdBase",
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "townIdinfo",
                    compid: "townIdBase",
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "detailAddr",
                    label: "详细地址",
                    required: true,
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "postalCode",
                    label: "邮编",
                    required: true,
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "tel",
                    label: "电话"
                },
                {
                    type: "refer",
                    key: "parentId",
                    label: "上级组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0"
                    }
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: '0'
                },
                {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item"
                },

            ]
        },
        dialogs: {
            dialog1: [{
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
                    type: "refer",
                    key: "countryId",
                    label: "管辖国家",
                    refinfo: "country",
                    refName: "管辖国家",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0"
                    }
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "管辖省",
                    refinfo: "region",
                    domid: "provinceIdinfo",
                    compid: "provinceIdBase",
                    refName: "管辖省",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0", "EQ_areaLevel": "1"
                    }
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "管辖市",
                    refinfo: "region",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    refName: "管辖市",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0", "EQ_areaLevel": "2"
                    }
                }, {
                    type: "refer",
                    key: "countyId",
                    label: "管辖区县",
                    refinfo: "region",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    refName: "区县",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0", "EQ_areaLevel": "3"
                    }
                },
                {
                    type: "refer",
                    key: "parentId",
                    label: "上级市场区域",
                    refinfo: "market",
                    compid: "parentIdBase",
                    visableInEdit: false,
                }, {
                    type: "text",
                    key: "parentName",
                    label: "上级市场区域",
                    compid: "parentNameBase",
                    editable: false,
                },
                {
                    type: "refer",
                    key: "organizationId",
                    label: "所属组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0"
                    },
                    isMultiSelectedEnabled:true
                },
                {
                    type: "refer",
                    key: "principalId",
                    label: "负责人",
                    refinfo: "person",
                    refName: "负责人",
                    clientParam: {
                        "EQ_isEnable": "1", "EQ_dr": "0"
                    }
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: '0'
                },
                {
                    type: "textarea",
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item"
                },

            ]
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码",
            },
                {
                    key: "name",
                    label: "名称"
                },
                {
                    key: "organizationTypeName",
                    label: "组织类型",
                },
                {
                    key: "principalName",
                    label: "组织负责人",
                },
                {
                    key: "countryName",
                    label: "国家"
                },
                {
                    key: "provinceName",
                    label: "所在省份"
                },
                {
                    key: "cityName",
                    label: "所在城市"
                },
                {
                    key: "countyName",
                    label: "所在区/县"
                },
                {
                    key: "townName",
                    label: "所在街道"
                },
                {
                    key: "detailAddr",
                    label: "详细地址"
                },
                {
                    key: "postalCode",
                    label: "邮编"
                },
                {
                    key: "tel",
                    label: "电话"
                },
                {
                    key: "parentName",
                    label: "上级组织",
                },
                {
                    key: "isEnable",
                    label: "启用状态",
                    computed: "enableFmt"
                },
                {
                    key: "remark",
                    label: "备注",
                    cls: "ui-textarea-item"
                },

            ]
        },
        grids: {
            grid1: {
                domid: "organization",
                umeta: {
                    id: "grid_organization",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "组织编码",
                    renderType: "detailRender"
                },
                    {
                        field: "name",
                        dataType: "String",
                        title: "组织名称"
                    },
                    {
                        field: "organizationTypeName",
                        dataType: "string",
                        title: "组织类型",
                    },
                    {
                        field: "principalName",
                        dataType: "String",
                        title: "组织负责人",
                        visible: false
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
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
            },
            "grid2": {
                "domid": "grid_1521683062231_dom",
                "umeta": {
                    "id": "grid_OrgFuncRel",
                    "data": "childList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true,
                    "onBeforeEditFun": "beforeEditCheck"
                },
                "columns": [
                    {
                        "field": "orgFuncId",
                        "dataType": "String",
                        "title": "组织职能",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        required: true,
                        "editOptions": {
                            "validType": "string"
                        },
                        "showField": "orgFuncName",
                    }, {
                        "field": "funcParentOrgId",
                        "dataType": "String",
                        "title": "上级组织",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": {
                            "validType": "string"
                        },
                        "showField": "funcParentOrgName",
                    }, {
                        "field": "isEnable",
                        "dataType": "integer",
                        "title": "启用状态",
                        "width": "220px",
                        defaultvalue:"1",
                        editable:false,
                        "editOptions": {
                            "id": "isEnablePAV",
                            "type": "combo",
                            "datasource": "enableRadioSrc",
                        },
                        "editType": "combo",
                        "renderType": "enableRender"
                    }
                ]
            },
            "grid3": {
                "domid": "grid_1521683062231_dom1",
                "umeta": {
                    "id": "grid_OrgFuncRel1",
                    "data": "childList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [
                    {
                        "field": "orgFuncName",
                        "dataType": "String",
                        "title": "组织职能",
                    }, {
                        "field": "funcParentOrgName",
                        "dataType": "String",
                        "title": "上级组织",
                    }, {
                        "field": "isEnable",
                        "dataType": "integer",
                        "title": "启用状态",
                        renderType:"enableRender"
                    }
                ]
            },
        }
    };
    return new basemodel(model);
});


