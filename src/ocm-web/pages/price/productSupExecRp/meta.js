define(["ocm_global"],function(){
  window.productsupxxeclistmeta = {
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

      //总量
      productTotalNum:{type: 'float'},
      //采购量
      productActualNum:{type: 'float'},
      //剩余量
      productLeftNum:{type: 'float'},
      //销售开单量
      saleBillingNum:{type: 'float'},
      //预销售订单量
      preSaleOrderNum:{type: 'float'},
    },
    pageSize: 10,
  };
})
