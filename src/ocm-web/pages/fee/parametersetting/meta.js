define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      parameter_setting : {
        meta: {
          id:{type: 'string'},//id
          saleOrgId:{
            type: 'string',
              required:true,
            "refmodel": JSON.stringify(refinfo["organization_ocm"]),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"", "EQ_orgFuncRel": "01"}',
          },//销售组织
            saleOrgName:{type: 'string',required:true},
            saleOrgCode:{type: 'string',required:true},
        costOffsetRatio: {type: 'float',required:true,regExp:/^(\d|[1-9]\d|100)(\.\d{1,2})?$/}//费用冲抵金额比例
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
              key: "saleOrg",
              label: "销售组织",
              refinfo: "organization_ocm",
              clientParam: {"EQ_orgFuncRel": "01","EQ_isEnable":"1"}
          }
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
          clientParam: {"EQ_orgFuncRel": "01","EQ_isEnable":"1"}
        },
        {
          type: "float",
          key: "costOffsetRatio",
          label: "费用冲抵金额比例(%)",
        }
      ]
    },
    grids: {
      grid1: {
        domid: "saleorg_finanorg",
        umeta: {
          id: "grid_saleorg_finanorg",
          data: "simpleList",
          type: "grid",
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
            field: "costOffsetRatio",
            dataType: "BigDecimal",
            title: "费用冲抵金额比例(%)",
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