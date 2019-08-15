define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
      metas: {
        cust_ordertype : {
            meta: {
                id: {type: 'string'},//id
                saleOrgId: {type: 'string', required: true},//销售组织
                saleOrgCode: {type: 'string', required: true},//销售组织
                saleOrgName: {type: 'string', required: true},//销售组织
                productLineId: {type: 'string'},//产品线
                productLineCode: {type: 'string'},//产品线
                productLineName: {type: 'string'},//产品线
                consignInventoryOrgId: {type: 'string', required: true},//发货库存组织
                consignInventoryOrgCode: {type: 'string', required: true},//发货库存组织
                consignInventoryOrgName: {type: 'string', required: true},//发货库存组织
                settleFinancialOrgId: {type: 'string', required: true},//结算财务组织
                settleFinancialOrgName: {type: 'string', required: true},//结算财务组织
                settleFinancialOrgCode: {type: 'string', required: true},//结算财务组织
                marketAreaId: {type: 'string'},//市场区域ID
                marketAreaCode: {type: 'string'},//市场区域编码
                marketAreaName: {type: 'string'},//市场区域名称
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
            type: "refer",
            key: "saleOrg",
            keyfordisplay: "saleOrgName",
            label: "销售组织",
            refinfo: "organization_ocm",
            clientParam: {"EQ_orgFuncRel":"01","AUTH_refcod":"salebusinessrelation"}
          },
          {
            type: "refer",
            key: "productLine",
            keyfordisplay: "productLineName",
            label: "产品线",
            refinfo: "productLine",
          },
          {
            type: "refer",
            key: "consignInventoryOrg",
            keyfordisplay: "consignInventoryOrgName",
            label: "发货库存组织",
            refinfo: "organization_ocm",
            clientParam: {"EQ_orgFuncRel":"03","AUTH_refcod":"salebusinessrelation"}
          },
          {
            type: "refer",
            key: "settleFinancialOrg",
            keyfordisplay: "settleFinancialOrgName",
            label: "结算财务组织",
            refinfo: "organization_ocm",
            clientParam: {"EQ_orgFuncRel":"07","AUTH_refcod":"salebusinessrelation"}
          }, {
                type: "refer",
                key: "marketArea",
                label: "市场区域",
                refinfo: "market",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            },
        ]
      },
      dialogs: {
        dialog1: [
          {
            type: "refer",
            key: "saleOrgId",
            keyfordisplay: "saleOrgName",
            label: "销售组织",
            refinfo: "organization_ocm",
            clientParam: {"EQ_orgFuncRel":"01","AUTH_refcod":"salebusinessrelation"}
          },
          {
            type: "refer",
            key: "productLineId",
            keyfordisplay: "productLineName",
            label: "产品线",
            refinfo: "productLine"
          },
          {
            type: "refer",
            key: "consignInventoryOrgId",
            keyfordisplay: "consignInventoryOrgName",
            label: "发货库存组织",
            refinfo: "organization_ocm",
            clientParam: {"EQ_orgFuncRel":"03","AUTH_refcod":"salebusinessrelation"}
          },
            {
                type: "refer",
                key: "settleFinancialOrgId",
                keyfordisplay: "settleFinancialOrgName",
                label: "结算财务组织",
                refinfo: "organization_ocm",
                clientParam: {"EQ_orgFuncRel":"07","AUTH_refcod":"salebusinessrelation"}
            }, {
                referId: "marketId",
                type: "refer",
                key: "marketAreaId",
                label: "市场区域",
                refinfo: "market",
            },
        ]
      },
      grids: {
        grid1: {
          domid: "cust_ordertype",
          umeta: {
            id: "grid_cust_ordertype",
            data: "simpleList",
            type: "grid",
            editable: false,
            multiSelect: true,
            showNumCol: true,
          },
          columns: [
            {
              field: "saleOrgName",
              dataType: "String",
              title: "销售组织",
            },
            {
              field: "productLineName",
              dataType: "String",
              title: "产品线",
            },
            {
              field: "consignInventoryOrgName",
              dataType: "String",
              title: "发货库存组织",
            },
            {
              field: "settleFinancialOrgName",
              dataType: "String",
              title: "结算财务组织",
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
  