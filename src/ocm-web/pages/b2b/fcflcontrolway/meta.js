define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      poControlRulemeta: {
        meta: {
          orderTypeId: { type: "string", required: true }, //下单渠道Id
          orderTypeName: { type: "string", required: true }, //下单渠道Name
          orderTypeCode: { type: "string", required: true }, // 下单渠道Code
          tranTypeId: { type: "string", required: true }, //交易类型
          tranTypeCode: { type: "string", required: true }, //交易编码
          tranTypeName: { type: "string", required: true }, //交易名称
          ruleType: { type: "Integer", required: true, default: "1" }, //规则类型  1满车规则/2满托规则
          controlFlag: { type: "Integer", required: true, default: "1" } //控制方式 2刚性控制/1预警控制
        },
        pageSize: 10
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
          type: "refer",
          key: "orderType",
          label: "下单渠道",
          refinfo: "billtype",
          clientParam: { IN_id: "SaleOrder,ReqOrder" }
        },
        {
          type: "refer",
          key: "tranType",
          label: "交易类型",
          refinfo: "trantype",
          referId: "tranType_searchCls",
          clientParam: { IN_billTypeId: "SaleOrder,ReqOrder" }
        },
        {
          type: "radio",
          key: "ruleType",
          label: "规则类型",
          dataSource: [
            { value: "2", name: "满托规则" },
            { value: "1", name: "满车规则" }
          ]
        },
        {
          type: "radio",
          key: "controlFlag",
          label: "控制方式",
          dataSource: [
            { value: "1", name: "预警控制" },
            { value: "2", name: "刚性控制" }
          ]
        }
      ]
    },
    dialogs: {
      dialog1: [
        {
          type: "refer",
          key: "orderTypeId",
          label: "下单渠道",
          refinfo: "billtype",
          clientParam: { IN_id: "SaleOrder,ReqOrder" }
        },
        {
          type: "refer",
          key: "tranTypeId",
          label: "交易类型",
          refinfo: "trantype",
          referId: "tranTypeCls",
          clientParam: { IN_billTypeId: "SaleOrder,ReqOrder" }
        },
        {
          type: "radio",
          key: "ruleType",
          label: "规则类型",
          dataSource: [
            { value: "2", name: "满托规则" },
            { value: "1", name: "满车规则" }
          ]
        },
        {
          type: "radio",
          key: "controlFlag",
          label: "控制方式",
          dataSource: [
            { value: "1", name: "预警控制" },
            { value: "2", name: "刚性控制" }
          ]
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
            field: "orderTypeName",
            dataType: "String",
            title: "下单渠道"
          },
          {
            field: "tranTypeName",
            dataType: "String",
            title: "交易类型"
          },
          {
            field: "ruleType",
            dataType: "Integer",
            renderType: "ruleTypeRender",
            title: "规则类型"
          },
          {
            field: "controlFlag",
            dataType: "Integer",
            renderType: "controlFlagRender",
            title: "控制方式"
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
