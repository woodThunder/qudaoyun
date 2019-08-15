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

  //订单状态
  enuminfo['orderStatus'] = {
    dataSource:[
      {name:"待处理", value:"01"},
      {name:"已提交", value:"02"},
      {name:"审批中", value:"03"},
      {name:"审批通过", value:"04"},
      {name:"审批不通过", value:"05"},
      {name:"已驳回", value:"06"},
      {name:"部分出库", value:"07"},
      {name:"全部出库", value:"08"},
      {name:"部分入库", value:"09"},
      {name:"全部入库", value:"10"},
    ],
    name:"订单状态",
  }
  enuminfo['deliveryOrderStatus'] = {
    dataSource:[
      {name:"待处理", value:"01"},
      {name:"已提交", value:"02"},
      {name:"审批中", value:"03"},
      {name:"审批通过", value:"04"},
      {name:"审批不通过", value:"05"},
      {name:"部分出库", value:"06"},
      {name:"全部出库", value:"07"},
    ],
    name:"发货单订单状态",
  }
  enuminfo['dealObject'] = {
    dataSource:[
      {name:"客户", value:"1"},
      {name:"部门", value:"2"},
      {name:"业务员", value:"3"},
      {name:"物流公司", value:"4"},
        ],
    name:"往来对象",
  }
  enuminfo['billClaimState'] = {
    dataSource:[
      {name:"待认领", value:"1"},
      {name:"部分认领", value:"2"},
      {name:"全部认领", value:"3"},
      {name:"待处理", value:"4"},
      {name:"已提交", value:"5"},
      {name:"审批中", value:"6"},
      {name:"审批不过", value:"7"},
        ],
    name:"认领状态",
  }
  enuminfo['orderType'] = {
    dataSource:[
      {name:"发货单", value:"DeliveryOrder"},
      {name:"销售订单", value:"SaleOrder"},
      {name:"NC虚拟销售订单", value:"NcSaleOrder"}
        ],
    name:"订单类型",
  }
  enuminfo['saleModel'] = {
    dataSource:[
      {name:"正向销售", value:"01"},
      {name:"退货", value:"02"},
      {name:"费用货补", value:"03"}
        ],
    name:"销售模式",
  }
  enuminfo['ReturnType'] = {
    dataSource:[
      {name:"仅退款", value:"01"},
      {name:"退货退款", value:"02"}
        ],
    name:"退货类型"
  }
  enuminfo['method'] = {
    dataSource:[
      {name:"宽松控制", value:"1"},
      {name:"严格控制", value:"2"}
        ],
    name:"控制方式"
  }
  enuminfo['isChannelCustomer'] = {
    dataSource:[
      {name:"否", value:"0"},
      {name:"是", value:"1"}
        ],
    name:"是否是经销商"
  }
  enuminfo['isServiceProvider'] = {
    dataSource:[
      {name:"否", value:"0"},
      {name:"是", value:"1"}
        ],
    name:"是否是服务商"
  }
  enuminfo['isFrozen'] = {
    dataSource:[
      {name:"否", value:"0"},
      {name:"是", value:"1"}
        ],
    name:"冻结状态"
  }
  enuminfo['isEnable'] = {
    dataSource:[
      {name:"否", value:"0"},
      {name:"是", value:"1"}
        ],
    name:"启用状态"
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
