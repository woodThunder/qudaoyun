define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      saleorg_stockorg : {
        meta: {
          id:{type: 'string'},//id
          organizationId:{type: 'string',required:true},//销售组织
          organizationName:{type: 'string',required:true},
          organizationCode:{type: 'string',required:true},
          productLineId: {type: 'string'},//产品线
          productLineCode: {type: 'string'},
          productLineName: {type: 'string'},
          stockOrgId: {type: 'string',required:true},//发货库存组织
          stockOrgName: {type: 'string',required:true},
          stockOrgCode: {type: 'string',required:true},
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
        }
      ]
    },
    searchs: {
      search1: [
        {
          type: "refer",
          key: "organization",
          label: "销售组织",
          refinfo:"organization_ocm",
          clientParam: {"EQ_isEnable":"1","EQ_orgFuncRel": "01"}
        },
        {
          type: "refer",
          key: "productLine",
          label: "产品线",
          refinfo:"productLine"
        },
        {
          type: "refer",
          key: "stockOrg",
          label: "发货库存组织",
          refinfo:"organization_ocm",
          clientParam: {"EQ_isEnable":"1","EQ_orgFuncRel":"03"}
        }
      ]
    },
    dialogs: {
      dialog1: [
        {
          type: "refer",
          key: "organizationId",
          keyfordisplay: "organizationName",
          label: "销售组织",
          refinfo: "organization_ocm",
          clientParam: {"EQ_isEnable":"1","EQ_orgFuncRel": "01"}
        },
        {
          type: "refer",
          key: "productLineId",
          keyfordisplay: "productLineName",
          label: "产品线",
          refinfo: "productLine",
          clientParam: {"EQ_isEnable":"1"}
        },
        {
          type: "refer",
          key: "stockOrgId",
          keyfordisplay: "stockOrgName",
          label: "发货库存组织",
          refinfo: "organization_ocm",
          clientParam: {"EQ_isEnable":"1","EQ_orgFuncRel":"03"}
        }
      ]
    },
    grids: {
      grid1: {
        domid: "saleorg_stockorg",
        umeta: {
          id: "grid_saleorg_stockorg",
          data: "simpleList",
          type: "grid",
          multiSelect: true,
          showNumCol: true,
        },
        columns: [
          {
            field: "organizationName",
            dataType: "String",
            title: "销售组织",
          },
          {
            field: "productLineName",
            dataType: "String",
            title: "产品线",
          },
          {
            field: "stockOrgName",
            dataType: "String",
            title: "发货库存组织",
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