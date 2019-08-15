define(["ocm_global"],function(){
  window.productPromotionOrderListmeta = {
    meta: {
      id:{type: 'string'},
      //  活动id
      activityId:{type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['promactivity']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_approveStatus":"1","EQ_activeType.applyWay":"1"}',
      },
      activityCode:{type: 'string'},
      activityName: {type: 'string'},
      //产品组合编码
      showCode:{ type: 'string',
        "refmodel": JSON.stringify(refinfo['promproducttab']),
        "refcfg": '{"ctx":"/uitemplate_web"}'},
      //产品组合名称
      showName:{type: 'string'},

      // 业务账户编码
      pickAccountCode:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['account']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        "refparam": '{"EQ_isEnable":"1"}'
      },
      // 业务账户名称
      pickAccountName:{type: 'string'},
      // 经销商编码
      customerCode:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['customerRefb']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
      },
      // 经销商名称
      customerName:{type: 'string'},
      // 办事处编码
      officeCode:{
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['promofficeb']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"refName":"办事处"}'
      },
      // 办事处名称
      officeName:{type: 'string'},
      //承诺量
      commitDeliveryNum:{type: 'float'},
      //采购量
      actualTakeNum:{type: 'float'},
      //剩余量
      actualLeftNum:{type: 'float'},
      //总量
      productTotalNum:{type: 'float'},
      //销售开单量
      saleBillingNum:{type: 'float'},
      //开单剩余量
      orderLeftNum:{type: 'float'},
      //开单完成率
      orderRate:{type: 'float'},
      //采购完成率
      purchaseRate:{type: 'float'},
      //预销售订单量
      preSaleOrderNum:{type: 'float'},
      //汇总条件
      productSummary:{type:'string'},
    },
    pageSize: 20,
  };
  window.towDimensional = {
    meta: {
      id:{},
      //产品编码
      showCode:{ type: 'string'},
      //产品名称
      showName:{type: 'string'},
      //采购量
      actualTakeNum:{type: 'float'},
      //销售开单量
      saleBillingNum:{type: 'float'},
      //预销售订单量
      preSaleOrderNum:{type: 'float'},
    }
  }
})
