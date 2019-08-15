define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      poControlRulemeta: {
        meta: {
          organizationId: { type: "string", required: true }, //接单组织
          organizationName: { type: "string", required: true }, //接单组织Name
          trantypeId: { type: "string", required: true }, //订单类型
          trantypeCode: { type: "string", required: true }, //订单编码
          trantypeName: { type: "string", required: true }, //订单名称
          // isCheckCredit: {type: 'Integer',required:true,default:'0'},//是否检查信用
          isAutoCommit: { type: "Integer", required: true, default: "0" }, //是否自动提交
          isAutoApprove: { type: "Integer", required: true, default: "0" }, //是否自动审批
          // isCheckAval: { type: "Integer", required: true, default: "0" }, //是否检查库存
          priceEditFind: { type: "Integer", required: true, default: "0" }, //询到价是否可改
          priceEditNotFind: { type: "Integer", required: true, default: "0" }, //询不到价是否可改
          onceDelivery: { type: "Integer", required: true, default: "0" }, //是否一次发货
          onceOutStock: { type: "Integer", required: true, default: "0" }, //是否一次出库
          remark: { type: "string" }, // 备注
          preferentialRatio: { type: "string", required: true }, // 优惠比例
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
      search1: [
        {
          type: "refer",
          key: "organization",
          label: "销售组织",
          refinfo: "organization_ocm",
          clientParam: { EQ_orgFuncRel: "01", EQ_isEnable: "1", "AUTH_refdim":"organization"}
        },
        {
          type: "refer",
          key: "trantype",
          label: "客户订单类型",
          refinfo: "trantype",
          clientParam: { EQ_billTypeId: "SaleOrder" }
        },
        {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          dataSource: [
            { value: CONST.DEFAULTOPTION, name: "全部" },
            { value: "1", name: "启用" },
            { value: "0", name: "停用" }
          ]
        }
      ]
    },
    dialogs: {
      dialog1: [
        {
          type: "refer",
          key: "organizationId",
          label: "销售组织",
          refinfo: "organization_ocm",
          clientParam: { EQ_orgFuncRel: "01", EQ_isEnable: "1" }
        },
        {
          type: "refer",
          key: "trantypeId",
          keyfordisplay: "trantypeName",
          label: "客户订单类型",
          refinfo: "trantype",
          clientParam: { EQ_billTypeId: "SaleOrder" }
        },
        {
          type: "text",
          key: "preferentialRatio",
          label: "优惠比例（%）"
        },
        // {
        // 	type: "checkbox",
        // 	key: "isCheckCredit",
        // 	label: "是否检查信用",
        // 	checkedValue:1,
        // 	unCheckedValue:0
        // },
        {
          type: "checkbox",
          key: "isAutoCommit",
          label: "是否自动提交",
          checkedValue: 1,
          unCheckedValue: 0
        },
        {
          type: "checkbox",
          key: "isAutoApprove",
          label: "是否自动审批",
          checkedValue: 1,
          unCheckedValue: 0
        },
        // {
        //   type: "checkbox",
        //   key: "isCheckAval",
        //   label: "是否检查库存",
        //   checkedValue: 1,
        //   unCheckedValue: 0
        // },
        {
          type: "checkbox",
          key: "priceEditFind",
          label: "询到价是否可改",
          checkedValue: 1,
          unCheckedValue: 0
        },
        {
          type: "checkbox",
          key: "priceEditNotFind",
          label: "询不到价是否可改",
          checkedValue: 1,
          unCheckedValue: 0
        },
        {
          type: "checkbox",
          key: "onceDelivery",
          label: "是否一次发货",
          checkedValue: 1,
          unCheckedValue: 0
        },
        {
          type: "checkbox",
          key: "onceOutStock",
          label: "是否一次出库",
          checkedValue: 1,
          unCheckedValue: 0
        },
        {
          type: "label",
          key: "isEnable",
          label: "启用状态",
          defaultvalue: "0"
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
        domid: "POControlRule",
        umeta: {
          id: "grid_POControlRule",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: false
        },
        columns: [
          {
            field: "organizationName",
            dataType: "String",
            title: "接单组织"
          },
          {
            field: "trantypeName",
            dataType: "String",
            title: "销售订单类型"
          },
          // {
          // 	field: "isCheckCredit",
          // 	dataType: "Integer",
          // 	renderType: "disableBooleanRender",
          // 	title: "是否检查信用",
          // },
          {
            field: "isAutoCommit",
            dataType: "Integer",
            renderType: "disableBooleanRender",
            title: "是否自动提交"
          },
          {
            field: "isAutoApprove",
            dataType: "Integer",
            renderType: "disableBooleanRender",
            title: "是否自动审批"
          },
          // {
          //   field: "isCheckAval",
          //   dataType: "Integer",
          //   renderType: "disableBooleanRender",
          //   title: "是否检查库存"
          // },
          {
            field: "priceEditFind",
            dataType: "Integer",
            renderType: "disableBooleanRender",
            title: "询到价是否可改"
          },
          {
            field: "priceEditNotFind",
            dataType: "Integer",
            renderType: "disableBooleanRender",
            title: "询不到价是否可改"
          },
          {
            field: "onceDelivery",
            dataType: "Integer",
            renderType: "disableBooleanRender",
            title: "是否一次发货"
          },
          {
            field: "onceOutStock",
            dataType: "Integer",
            renderType: "disableBooleanRender",
            title: "是否一次出库"
          },
          {
            field: "preferentialRatio",
            dataType: "String",
            title: "优惠比例（%）",
            renderType: "addPercentage"
          },
          {
            field: "remark",
            dataType: "String",
            title: "备注"
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
            field: "isEnable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableRender"
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
