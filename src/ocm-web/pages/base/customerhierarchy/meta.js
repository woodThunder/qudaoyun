// var CustomerHierarchymeta = {
//     params: {
//         "cls": "com.yonyou.ocm.base.service.dto.CustomerHierarchyDto"
//     },
//     meta: {
//         id: { type: 'string' },//id
//         superiorCustomerId: { type: 'string', required: true },
//         superiorCustomerCode: { type: 'string', required: true },
//         superiorCustomerName: { type: 'string', required: true },
//         juniorCustomerId: { type: 'string', required: true },
//         juniorCustomerCode: { type: 'string', required: true },
//         juniorCustomerName: { type: 'string', required: true },

//     },
//     pageSize: 10,
//     //是否启用前端缓存
//     // pageCache: true
// }



define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            CustomerHierarchydmeta: {
                meta: {
                    id: { type: 'string' },//id
                    superiorCustomerId: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    superiorCustomerCode: { type: 'string' },
                    superiorCustomerName: { type: 'string' },
                    juniorCustomerId: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                     },
                    juniorCustomerCode: { type: 'string' },
                    juniorCustomerName: { type: 'string' },
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
            ]
        },
        searchs: {
            search1: []
        },
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "superiorCustomerId",
                label: "上级客户",
                
            },
            {
                type: "refer",
                key: "juniorCustomerId",
                label: "下级客户"
            },
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
                    field: "superiorCustomerName",
                    dataType: "String",
                    title: "上级客户"
                },
                {
                    field: "juniorCustomerName",
                    dataType: "String",
                    title: "下级客户"
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

