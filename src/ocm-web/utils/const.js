define([], function () {
  var CONST = {
    B2BENUM: {
      PRESELLPLAN: {
        SAVED: "01",
        EXECUTING: "02",
        CLOSED: "03",
        FINISHED: "04"
      },
      PURCHASEAPPLY: {
        UNCOMMITTED: "01",
        COMMITTED: "02",
        AUDITED: "03",
        FINISHED: "04",
        ROWUNCOMMITTED: "05",
        ROWCOMMITTED: "06",
        ROWAUDITED: "07",
        ROWAUDITFAILED: "08",
        ROWCLOSED: "09"
      },
      PURCHASEORDER: {
        UNCOMMITTED: "01",
        COMMITTED: "02",
        AUDITED: "03",
        AUDITFAILED: "04",
        FINISHED: "05",
        ROWUNCOMMITTED: "06",
        ROWCOMMITTED: "07",
        ROWAUDITED: "08",
        ROWAUDITFAILED: "09",
        ROWARRANGED: "10",
        ROWCLOSED: "11"
      },
      SALEORDER: {
        COMMITTED: "01",
        APPROVED: "02",
        FINISHED: "03",
        ROWCOMMITTED: "04",
        ROWAUDITED: "05",
        ROWCLOSED: "06",
        ROWFINISHED: "07"
      },
      PROCESSSTATUS: {
        SUCCESS: "01",
        PROCESSING: "02",
        FAILED: "03",
      }
    },
    PURCHASE: {
      ORDERTYPE: {
        ORDINARY: "01",
        DIRECT: "02",
      },
      PURCHASETYPE: {
        IN: "01",
        FOREIGN: "02",
      },
      PURCHASESTATUS: {
        FREE: "1",
        COMMITTED: "2",
        CLOSED: "3",
        APPROVED: "4",
        UNAPPROVED: "5",
      }
    },
    STOCKENUM: {
      INITIN: {
        FREE: "01",
        SIGNED: "02",
      },
      TRANSFER: {
        TEMPORARY: "1",
        SUBMIT: "2",
        APPROVING: "3",
        APPROVESUCC: "4",
        APPROVEFAILED: "5",
        OUTSTOCK: "6",
        PARTINSTOCK: "7",
        ALLINSTOCK: "8"
      }
    },
    DEFAULTOPTION: "defaultoption",
    BILLPANELSTATUS: {
      ADD: "add",
      EDIT: "edit",
      COPY: "copy",
      DETAIL: "detail",
      DEFAULT: "default",
      CHANGE: "change"
    },
    PAGESTATUS: {
      DEFAULT: "default",
      EDIT: "edit"
    },
    OPERATOR: {
      EQ: "EQ",
      LIKE: "LIKE",
      GT: "GT",
      LT: "LT",
      GTE: "GTE",
      LTE: "LTE",
      NOTEQ: "NOTEQ",
      IN: "IN",
      NOTIN: "NOTIN",
      LIKEORIN: "LIKEORIN"
    },
    //是否
    WHETHER: [{
        name: "是",
        value: 1
      },
      {
        name: "否",
        value: 0
      },
    ],
    //启用状态
    ENABLESTATUS: [{
        name: "未启用",
        value: 0
      },
      {
        name: "已启用",
        value: 1
      },
      {
        name: "已停用",
        value: 2
      },
    ],
    //启用 包含全部
    ENABLESTATUSISALL: [{
        name: "全部",
        value: "defaultoption"
      },
      {
        name: "未启用",
        value: 0
      },
      {
        name: "已启用",
        value: 1
      },
      {
        name: "已停用",
        value: 2
      },
    ],
    DEFAULTSTATUS: [{
        name: "全部",
        value: 0
      },
      {
        name: "默认",
        value: 1
      },
    ],
    // 审核
    APPROVE: [{
        value: "defaultoption",
        name: "全部"
      },
      {
        value: "1",
        name: "已审核"
      },
      {
        value: "0",
        name: "未审核"
      }
    ],
    APPROVESEARCH: [{
        value: "",
        name: "全部"
      },
      {
        value: "1",
        name: "已审核"
      },
      {
        value: "0,2",
        name: "未审核"
      }
    ],
    //销售主体
    SALEENTITY: [{
        name: "全友",
        value: "00"
      },
      {
        name: "独合资办",
        value: "01"
      },
    ],
    // 渠道类型
    CHANNELTYPE: [{
        name: "全部",
        value: ""
      },
      {
        name: "电商",
        value: "01"
      },
      {
        name: "批发",
        value: "02"
      },
    ],
    //价格类型
    PRICETYPE: [{
        name: "批发基础价",
        value: "0"
      },
      {
        name: "促销基础价",
        value: "1"
      },
      {
        name: "批发活动价",
        value: "2"
      },
      {
        name: "零售活动价",
        value: "3"
      }
    ],
    //汇总条件
    PRODUCTSUMMARY: [{
        name: "活动编码/名称",
        value: "activity"
      },
      {
        name: "所属办事处编码/名称",
        value: "office"
      },
      {
        name: "经销商编码/名称",
        value: "customer"
      },
      {
        name: "业务账号编码/名称",
        value: "pickAccount"
      },
      {
        name: "产品编码/名称",
        value: "show"
      },
    ],
    //模板类型
    TEMPLATETYPE: [{
        name: "PC编辑",
        value: "pc-edit"
      },
      {
        name: "PC详情",
        value: "pc-detail"
      },
      {
        name: "PC列表",
        value: "pc-list"
      },
      // {name: "PC查询", value: "pc-search"},
      // {name: "Mob编辑", value: "mob-edit"},
      // {name: "Mob详情", value: "mob-detail"},
      // {name: "Mob列表", value: "mob-list"},
      // {name: "Mob查询", value: "mob-search"},
    ],
    //模板字段类型
    TEMPLATEITEMTYPE: [{
        name: "文本",
        value: "text"
      },
      {
        name: "整数",
        value: "integer"
      },
      {
        name: "浮点数",
        value: "float"
      },
      {
        name: "只读文本",
        value: "label"
      },
      {
        name: "图片",
        value: "image"
      },
      {
        name: "文本域",
        value: "textarea"
      },
      {
        name: "布尔型",
        value: "boolean"
      },
      {
        name: "参照",
        value: "refer"
      },
      {
        name: "自定义档案参照",
        value: "docrefer"
      },
      {
        name: "日期",
        value: "date"
      },
      {
        name: "日期时间",
        value: "datetime"
      },
      {
        name: "时间",
        value: "time"
      },
      {
        name: "下拉框",
        value: "combo"
      },
      {
        name: "电话",
        value: "phone"
      },
      {
        name: "地图",
        value: "map"
      },
      {
        name: "省市区",
        value: "division"
      },
      {
        name: "工商注册",
        value: "Businessreg"
      },
    ],
    // 销售订单 返利值 字段映射
    SALEORDERVALUE: [{
        conditionName: "交易类型",
        conditionCode: "orderType",
        comparison: "",
        findex: "1"
      },
      {
        conditionName: "促销活动",
        conditionCode: "activity",
        comparison: "",
        findex: "2"
      },
      {
        conditionName: "商品范围",
        conditionCode: "goodsRange",
        comparison: "",
        findex: "3"
      },
      {
        conditionName: "项目",
        conditionCode: "project",
        comparison: "",
        findex: "4"
      },
      {
        conditionName: "赠品",
        conditionCode: "isGift",
        comparison: "EQ",
        findex: "5"
      },
      {
        conditionName: "货补",
        conditionCode: "goodsSupplement",
        comparison: "EQ",
        findex: "6"
      }
    ],
    // 销售出库单 返利值 字段映射
    SALEOUTORDERVALUE: [{
        conditionName: "交易类型",
        conditionCode: "billTranType",
        comparison: "",
        findex: "1"
      },
      {
        conditionName: "促销活动",
        conditionCode: "activity",
        comparison: "",
        findex: "2"
      },
      {
        conditionName: "商品范围",
        conditionCode: "goodsRange",
        comparison: "",
        findex: "3"
      },
      {
        conditionName: "项目",
        conditionCode: "project",
        comparison: "",
        findex: "4"
      },
      {
        conditionName: "赠品",
        conditionCode: "isGift",
        comparison: "EQ",
        findex: "5"
      },
      {
        conditionName: "货补",
        conditionCode: "goodsSupplement",
        comparison: "EQ",
        findex: "6"
      }
    ],
    // 周期类型
    REBATECYCLETYPE: [{
        value: "YEAR",
        name: "年"
      },
      {
        value: "YEAR_MONTH",
        name: "年-月"
      },
      {
        value: "YEAR_SEASON",
        name: "年-季"
      },
      {
        value: "YEAR_HYEAR",
        name: "年-半年"
      },
      {
        value: "HYEAR_MONTH",
        name: "半年-月"
      },
      {
        value: "SEASON_MONTH",
        name: "季-月"
      },
      {
        value: "YEAR_SEASON_MONTH",
        name: "年-季-月"
      },
      {
        value: "YEAR_HYEAR_MONTH",
        name: "年-半年-月"
      },
      {
        value: "YEAR_HYEAR_SEASON_MONTH",
        name: "年-半年-季-月"
      },
      {
        value: "CUSTOM",
        name: "自定义"
      }
    ],
    // 返利依据类型
    REBATEBASISTYPE: [{
      value: "01",
      name: "数量",
    }, {
      value: "02",
      name: "金额"
    }, {
      value: "03",
      name: "数量增长率"
    }, {
      value: "04",
      name: "金额增长率"
    }, {
      value: "06",
      name: "金额超目标率"
    }],
    // 返利值类型
    REBATEVALUETYPE: [{
      value: "01",
      name: "数量"
    }, {
      value: "02",
      name: "金额"
    }, {
      value: "03",
      name: "金额超目标额"
    }],
    // 半年
    REBATE_HYEAR:  [{
      value: "1",
      name: "上半年"
    }, {
      value: "2",
      name: "下半年"
    }],
    // 季度
    REBATE_SEASON:  [{
      value: "1",
      name: "第一季度"
    }, {
      value: "2",
      name: "第二季度"
    }, {
      value: "3",
      name: "第三季度"
    }, {
      value: "4",
      name: "第四季度"
    }],
    // 月份
    REBATE_MONTH: [{
      value: "1",
      name: "1月"
    }, {
      value: "2",
      name: "2月"
    }, {
      value: "3",
      name: "3月"
    }, {
      value: "4",
      name: "4月"
    }, {
      value: "5",
      name: "5月"
    }, {
      value: "6",
      name: "6月"
    }, {
      value: "7",
      name: "7月"
    }, {
      value: "8",
      name: "8月"
    }, {
      value: "9",
      name: "9月"
    }, {
      value: "10",
      name: "10月"
    }, {
      value: "11",
      name: "11月"
    }, {
      value: "12",
      name: "12月"
    }],
    REBATE_PRICING: [{
      value: "value",
      name: "返利值"
    }, {
      value: "constant",
      name: "常量"
    }],
    STATISTICSRESOURCE: [{
      value: "0",
      name: "自制"
    }, {
      value: "1",
      name: "销售订单"
    }, {
      value: "2",
      name: "销售出库单"
    }],
  }
  return CONST;
})