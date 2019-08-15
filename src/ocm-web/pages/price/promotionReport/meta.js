define(["ocm_global"],function(){
  window.promotionlistmeta = {
    meta: {
      id:{type: 'string'},
      //  活动id
      activityId:{type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['promactivity']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_approveStatus":"1","EQ_activeType.applyWay":"1"}'
      },
      activityCode:{type: 'string'},
      activityName: {type: 'string'},
      //产品组合编码
      showCode:{ type: 'string',
        "refmodel": JSON.stringify(refinfo['promproducttab']),
        "refcfg": '{"ctx":"/uitemplate_web"}'},
      //产品组合名称
      showName:{type: 'string'},

      //总量
      productTotalNum:{type: 'float'},
      //采购量
      actualTakeNum:{type: 'float'},
      //剩余量
      productLeftNum:{type: 'float'},
      //销售开单量
      saleBillingNum:{type: 'float'},
      //预销售订单量
      preSaleOrderNum:{type: 'float'},
      //业务账户编码
      pickAccountCode:{type: 'string'},
      //业务账户名称
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
    },
    pageSize: 20,
  };
})
