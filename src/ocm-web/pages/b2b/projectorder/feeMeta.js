define(["ocm_basemodel"], function(basemodel) {
var offsetMeta = {
  params: {
      "cls": "com.yonyou.occ.fee.service.dto.FeeAccountBalance"
  },
  meta: {
      accountId: { type: 'string' }, // 账户id
      accountCode: { type: 'string' }, // 账户code
      accountName: { type: 'string'}, // 账户name
      accountBalance: { type: 'amountFloat'}, // 账户余额
      currAccountBalance: { type: 'amountFloat'}, // 本次可用余额
      financeOrgId: {type: 'string' }, // 财务组织id
      financeOrgCode: {type: 'string' }, // 财务组织Code
      financeOrgName: { type: 'string' }, // 财务组织 name
      offsetMoney: {type: 'amountFloat'}, // 冲抵金额
      adjustOffsetMoney: {type: 'amountFloat'}, // 调整金额
      operationStatus: {type: "string"}, // "01": 自由态 "02": 保存态，只为方便前端交互
      preferentialRatio: { type: 'object'}
  }
};
var offsetSelectMeta = {
  params: {
      "cls": "com.yonyou.occ.fee.service.dto.FeeAccountBalance"
  },
  meta: {
      accountId: { type: 'string' }, // 账户id
      accountCode: { type: 'string' }, // 账户code
      accountName: { type: 'string'}, // 账户name
      accountBalance: { type: 'amountFloat'}, // 账户余额
      currAccountBalance: { type: 'amountFloat'}, // 本次可用余额
      financeOrgId: {type: 'string' }, // 财务组织id
      financeOrgCode: {type: 'string' }, // 财务组织Code
      financeOrgName: { type: 'string' }, // 财务组织 name
      offsetMoney: {type: 'amountFloat'}, // 冲抵金额
      adjustOffsetMoney: {type: 'amountFloat'}, // 调整金额
      operationStatus: {type: "string"}, // "01": 自由态 "02": 保存态，只为方便前端交互
      preferentialRatio: { type: 'object'}
  }
};
var offsetDetailsMeta = {
  params: {
      "cls": "com.yonyou.occ.b2b.service.dto.OffsetDetailsDto"
  },
  meta: {
      orderId: { type: 'string' }, // 订单主键
      orderItemId: { type: 'string' }, // 订单行主键
      rowNum: { type: 'string'}, // 行号
      goodsId: { type: 'string'}, // 商品id
      feeAccountId: { type: 'string'}, // 账户id
      feeAccountCode: {type: 'string' }, // 账户code
      feeAccountName: {type: 'string' }, // 账户name
      totalOffsetAmount: { type: 'amountFloat' }, // 账户在该行总冲抵金额
      offsetType: { type: 'integer' }, // 冲抵类型 1：货补，2：冲抵费用
  }
};
var grids = {
  offsetGrid1: {
    domid: "grid_offset_account",
    umeta: {
      id: "grid_offset_account_id",
      data: "offsetList",
      type: "grid",
      editable: false,
      multiSelect: true,
      onBeforeRowSelected: "validIfAddOffsetAccount",
      onRowSelected: "addOffsetAccount",
//      onRowUnSelected: "cancelOffsetAccount",
    },
    columns: [{
      field: "accountName",
      dataType: "String",
      title: "账户名称",
      width: "50%"
    }, {
      field: "accountBalance",
      dataType: "String",
      title: "账户余额"
    }, {
      field: "offsetMoney",
      dataType: "String",
      title: "冲抵金额",
      visible: false
    }]
  },
  offsetGrid2: {
    domid: "grid_offset_account_selected",
    umeta: {
      id: "grid_offset_account_selected_id",
      data: "offsetSelectList",
      type: "grid",
      editable: true,
      onBeforeEditFun: "ifCanEidtoffsetAmountHandle"
    },
    columns: [{
      field: "accountName",
      dataType: "String",
      title: "账户名称",
      width: "25%",
      editable: false
    }, {
      field: "accountBalance",
      dataType: "String",
      title: "账户余额",
      width: "15%",
      editable: false
    }, {
      field: "currAccountBalance",
      dataType: "String",
      title: "本次可用余额",
      width: "15%",
      editable: false
    }, {
      field: "offsetMoney",
      dataType: "String",
      title: "冲抵金额",
      width: "15%",
      editable: false
    }, {
      field: "adjustOffsetMoney",
      dataType: "String",
      title: "调整金额",
      width: "15%",
      editable: true
    }, {
      field: "operationStatus",
      dataType: "String",
      title: "操作",
      editable: false,
      renderType: "offsetOperation",
    }]
  },
}

return {
  metas: {
    offsetMeta: offsetMeta,
    offsetSelectMeta: offsetSelectMeta,
    offsetDetailsMeta: offsetDetailsMeta
  },
  grids: grids
}
});