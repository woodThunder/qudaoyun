define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      poControlRulemeta: {
        meta: {
          relationName: { type: "string", required: true }, //规则名称
          relationCode: { type: "string", required: true }, //规则编码
          stockOrgId: { 
            type: "string", 
            required: true,
            refparam: '{"EQ_orgFuncRel":"03"}' 
          },// 过滤组织职能 库存}, //库存组织
          stockOrgName: { type: "string", required: true }, //库存组织
          stockOrgCode: { type: "string", required: true }, //库存组织
          trayId: { type: "string", required: true }, //托型id
          trayName: { type: "string", required: true }, //托型Name
          trayCode: { type: "string", required: true }, //托型Code
          isEnable: { type: "integer" } //是否启用
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true
      }
    },
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
        }
      ]
    },
    searchs: {
      search1: [
          {
              type: "text",
              key: "relationCode",
              label: "规则编码"
          },
          {
          type: "text",
          key: "relationName",
          label: "规则名称"
        },
        {
          type: "refer",
          key: "stockOrg",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam: {"EQ_orgFuncRel":"03","EQ_isEnable":"1"}
        },
        {
          type: "refer",
          key: "tray--id",
          label: "对应托型",
          refinfo: "tray_managements"
        }
      ]
    },
    dialogs: {
      dialog1: [
          {
              type: "text",
              key: "relationCode",
              label: "规则编码"
          },
          {
          type: "text",
          key: "relationName",
          label: "规则名称"
        },
        {
          type: "refer",
          key: "stockOrgId",
          label: "库存组织",
          refinfo: "organization_ocm",
          refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
        },
        {
          type: "refer",
          key: "trayId",
          label: "对应托型",
          refinfo: "tray_managements"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "POControlRule",
        umeta: {
          id: "grid_POControlRule",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
            {
                field: "relationCode",
                dataType: "String",
                title: "规则编码"
            },
            {
            field: "relationName",
            dataType: "String",
            title: "规则名称"
          },
          {
            field: "stockOrgName",
            dataType: "String",
            title: "库存组织"
          },
          {
            field: "trayName",
            dataType: "String",
            title: "托型名称"
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
    }
  };
  return new basemodel(model);
});
