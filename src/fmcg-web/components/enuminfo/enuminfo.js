define(function() {
  var enuminfo = {};
  enuminfo['gender'] = {
    dataSource: [
      {name: "男", value: "1"},
      {name: "女", value: "0"},
    ],
    name: "性别",
  };
  //拜访记录状态
  enuminfo['visitrecordstatus'] = {
    dataSource: [
      {name: "未拜访", value: "0"},
      {name: "未完成", value: "1"},
      {name: "已作废", value: "2"},
      {name: "已完成", value: "3"},
    ],
    name: "拜访记录状态",
  };
  //活动执行单状态
  enuminfo['actinspectstatus'] = {
    dataSource: [
      {name: "未拜访", value: "0"},
      {name: "未完成", value: "1"},
    ],
    name: "活动执行单状态",
  }
  //活动巡查单状态
  enuminfo['actsumstatus'] = {
    dataSource: [
      {name: "未拜访", value: "0"},
      {name: "未完成", value: "1"},
    ],
    name: "活动巡查单状态",
  }
  //审批状态
  enuminfo['approvestatus'] = {
    dataSource:[
      {name:"自由态", value:"0"},
      {name:"审批中", value:"1"},
      {name:"审核通过", value:"2"},
    ],
    name:"审批状态",
  }
  //承担方
  enuminfo['UndertakeType'] = {
    dataSource:[
      {name:"公司", value:"01"},
      {name:"客户", value:"02"},
    ],
    name:"承担方",
  }
  //支付对象类型
  enuminfo['PayObjectType'] = {
    dataSource:[
      {name:"供应商", value:"01"},
      {name:"客户", value:"02"},
      {name:"人员", value:"03"},
    ],
    name:"支付对象类型",
  }
  //活动细案确认结果
  enuminfo['ConfirmSignResultEnum'] = {
    dataSource:[
      {name:"未确认", value:"01"},
      {name:"允许执行", value:"02"},
      {name:"不允许执行", value:"03"},
    ],
    name:"活动细案确认结果",
  }
  //服务项目
  enuminfo['SupplierProject'] = {
    dataSource:[
      {name:"餐饮", value:"01"},
      {name:"会议", value:"02"},
      {name:"住宿", value:"03"},
    ],
    name:"服务项目",
  }


  //可以支持的全部枚举---请保持在文档的最尾部
  for(var key in enuminfo) {
    if(!enuminfo['allenum']) {
      enuminfo['allenum'] = [];
    }
    enuminfo['allenum'].push({name: enuminfo[key].name, value: key})
  }
  return enuminfo;
});
