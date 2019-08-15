define([],function() {
  var CONST = {
    B2BENUM:{
      PRESELLPLAN:{
        SAVED:"01",
        EXECUTING:"02",
        CLOSED:"03",
        FINISHED:"04"
      },
      PURCHASEAPPLY:{
        UNCOMMITTED:"01",
        COMMITTED:"02",
        AUDITED:"03",
        FINISHED:"04",
        ROWUNCOMMITTED:"05",
        ROWCOMMITTED:"06",
        ROWAUDITED:"07",
        ROWAUDITFAILED:"08",
        ROWCLOSED:"09"
      },
      PURCHASEORDER:{
        UNCOMMITTED:"01",
        COMMITTED:"02",
        AUDITED:"03",
        AUDITFAILED:"04",
        FINISHED:"05",
        ROWUNCOMMITTED:"06",
        ROWCOMMITTED:"07",
        ROWAUDITED:"08",
        ROWAUDITFAILED:"09",
        ROWARRANGED:"10",
        ROWCLOSED:"11"
      },
		SALEORDER:{
        COMMITTED:"01",
        APPROVED:"02",
        FINISHED:"03",
        ROWCOMMITTED:"04",
        ROWAUDITED:"05",
        ROWCLOSED:"06",
		    ROWFINISHED:"07"
      },
      PROCESSSTATUS:{
        SUCCESS:"01",
        PROCESSING:"02",
        FAILED:"03",
      }
    },
    DEFAULTOPTION:"defaultoption",
    BILLPANELSTATUS: {
      ADD: "add",
      EDIT: "edit",
      COPY: "copy",
      DETAIL: "detail",
      DEFAULT: "default"
    },
    PAGESTATUS:{
      DEFAULT: "default",
      EDIT: "edit"
    },
    OPERATOR:{
      EQ:"EQ",
      LIKE:"LIKE",
      GT:"GT",
      LT:"LT",
      GTE:"GTE",
      LTE:"LTE",
      NOTEQ:"NOTEQ",
      IN:"IN",
      NOTIN:"NOTIN",
      LIKEORIN: "LIKEORIN"
    },
    //是否
    WHETHER: [
      {name: "是", value: 1},
      {name: "否", value: 0},
    ],
    //启用状态
    ENABLESTATUS: [
      {name: "未启用", value: 0},
      {name: "启用", value: 1},
      {name: "停用", value: 2},
    ],
      //启用 包含全部
      ENABLESTATUSISALL: [
          {name:"全部" , value : "defaultoption"},
          {name: "启用", value: 1},
          {name: "停用", value: 0}
      ],
      DEFAULTSTATUS: [
          {name:"全部", value: 0},
          {name:"默认", value: 1},
      ],
      // 审核
      APPROVE : [
          {value : "defaultoption" ,name : "全部"},
          {value:"1",name:"已审核"},
          {value:"0",name:"未审核"}
      ],
      APPROVESEARCH: [
          {value : "" ,name : "全部"},
          {value:"1",name:"已审核"},
          {value:"0,2",name:"未审核"}
      ],
    //销售主体
    SALEENTITY: [
      {name: "全友", value: "00"},
      {name: "独合资办", value: "01"},
    ],
    // 渠道类型
    CHANNELTYPE: [
      {name: "全部", value: ""},
      {name: "电商", value: "01"},
      {name: "批发", value: "02"},
    ],
    //价格类型
    PRICETYPE :[
      {name: "批发基础价", value: "0"},
      {name: "促销基础价", value: "1"},
      {name: "批发活动价", value: "2"},
      {name: "零售活动价", value: "3"}
    ],
    //汇总条件
    PRODUCTSUMMARY:[
      {name:"活动编码/名称",value:"activity"},
      {name:"所属办事处编码/名称",value:"office"},
      {name:"经销商编码/名称",value:"customer"},
      {name:"业务账号编码/名称",value:"pickAccount"},
      {name:"产品编码/名称",value:"show"},
    ],
    GRIDID:'10000',
    ALLOPTION: "ALLOPTION",
    //终端拜访卡
    VISITCARD: {
      SUMMARY: {name:"拜访小结",value:"SUMMARY"},
      MATERIALS_CHECK: {name:"物料使用及氛围",value:"MATERIALS_CHECK"},
      DISPLAY_CHECK: {name:"陈列检查",value:"DISPLAY_CHECK"},
      PURCHASE_REPORT: {name:"进货上报",value:"PURCHASE_REPORT"},
      MONTHLY_CHECK: {name:"月底盘点",value:"MONTHLY_CHECK"},
    },
    //客户拜访卡
    CUSVISITCARD: {
      SUMMARY: {name:"拜访小结",value:"SUMMARY"},
      MATERIALS_CHECK: {name:"物料使用及氛围",value:"MATERIALS_CHECK"},
      DISPLAY_CHECK: {name:"陈列检查",value:"DISPLAY_CHECK"},
      PURCHASE_REPORT: {name:"进货上报",value:"PURCHASE_REPORT"},
      MONTHLY_CHECK: {name:"库存盘点",value:"MONTHLY_CHECK"},
      CUSTOM_TABLE: {name:"自定义表",value:"CUSTOM_TABLE"},
    },
    //模板类型
    TEMPLATETYPE: [
      {name: "PC编辑", value: "pc-edit"},
      {name: "PC详情", value: "pc-detail"},
      {name: "PC列表", value: "pc-list"},
      // {name: "PC查询", value: "pc-search"},
      {name: "Mob编辑", value: "mob-edit"},
      {name: "Mob详情", value: "mob-detail"},
      // {name: "Mob列表", value: "mob-list"},
      // {name: "Mob查询", value: "mob-search"},
    ],
    //模板字段类型
    TEMPLATEITEMTYPE: [
      {name: "文本", value: "text"},
      {name: "整数", value: "integer"},
      {name: "浮点数", value: "float"},
      {name: "只读文本", value: "label"},
      {name: "图片", value: "image"},
      {name: "文本域", value: "textarea"},
      {name: "布尔型", value: "boolean"},
      {name: "参照", value: "refer"},
      {name: "自定义档案参照", value: "docrefer"},
      {name: "日期", value: "date"},
      {name: "日期时间", value: "datetime"},
      {name: "时间", value: "time"},
      {name: "下拉框", value: "combo"},
      {name: "电话", value: "phone"},
      {name: "地图", value: "map"},
      {name: "省市区", value: "division"},
      {name: "工商注册", value: "Businessreg"},
    ],
  }
  return CONST;
})
