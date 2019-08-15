define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            personrelmarketareameta: {
                meta: {
                    id: { type: 'string' },//id
                    personId: { type: 'string', required: true },//管理人员
                    personCode: { type: 'string' },//管理人员
                    personName: { type: 'string' },//管理人员
                    saleOrgId: { type: 'string', required: true },//组织
                    saleOrgCode: { type: 'string' },//组织
                    saleOrgName: { type: 'string' },//组织
                    saleDeptId: { type: 'string', required: true},//部门
                    saleDeptCode: { type: 'string' },//部门
                    saleDeptName: { type: 'string' },//部门
                    marketAreaId: { type: 'string', required: true},//市场区域
                    marketAreaCode: { type: 'string' },//市场区域
                    marketAreaName: { type: 'string' },//市场区域
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
            ]
        },
        searchs: {
            search1: [
              {
                type:"refer",
                key:"saleOrg--id",
                label:"组织",
                refinfo:"organization_ocm",
              },{
                type:"refer",
                key:"saleDept--id",
                label:"部门",
                refinfo:"department",
              },
              {
                type:"refer",
                key:"person--id",
                label:"管理人员",
                refinfo:"person"
              },
              {
                type:"refer",
                key:"marketArea--id",
                label:"市场区域",
                refinfo:"market",
              },
            ]
        },
        dialogs: {
            dialog1: [
              {
                type:"refer",
                key:"saleOrgId",
                label:"组织",
                refinfo:"organization_ocm",
                required: true
              },{
                type:"refer",
                key:"saleDeptId",
                label:"部门",
                compid: "saleDept",
                domid: "saleDept",
                refinfo:"department",
              },
              {
                type:"refer",
                key:"personId",
                label:"管理人员",
                compid: "person",
                domid: "person",
                refinfo:"person"
              },
              {
                type:"refer",
                key:"marketAreaId",
                label:"市场区域",
                refinfo:"market",
                required: true,
              },
            ]
        },
        grids: {
            grid1: {
                domid: "channelpost",
                umeta: {
                    id: "grid_channelpost",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                {
                    field: "personName",
                    dataType: "String",
                    title: "管理人员"
                },
                {
                    field: "saleOrgName",
                    dataType: "String",
                    title: "组织"
                },
                {
                    field: "saleDeptName",
                    dataType: "String",
                    title: "部门"
                },
                {
                    field: "marketAreaName",
                    dataType: "String",
                    title: "市场区域",
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
