define(["ocm_global"],function(){
    //活动经销商执行结果
    window.ActivityStoreExcute = {
        meta: {
            id:{type: 'string'},//id
            code:{type: 'string'},
            customerId:{type: 'string'},//经销商
            customerCode:{type: 'string'},//经销商
            customerName:{type: 'string'},//经销商

            storeId:{
              type: 'string',
              required:true,
              "refmodel": JSON.stringify(refinfo['activitystorec']),
              "refcfg":'{"ctx":"/uitemplate_web","refCode":""}' },
            storeCode:{type: 'string'},//门店编码
            storeName:{type: 'string'},//门店名称

            saleGoalMny:{type: 'string'},//零售活动目标
            actualMny:{type: 'string'},//零售完成总额
            completionRate:{type: 'string'},//完成率

            creator:{type: 'string'},
            creationTime:{type: 'datetime'},
            modifier:{type: 'string'},
            modifiedTime:{type: 'datetime'}
        },
        pageSize: 20,
        //是否启用前端缓存
        // pageCache: true
    }
    //产品明细页面
    window.ActivityProductExcute = {
    meta : {
      showId:{type: 'string'},//id
      showCode:{type: 'string'},// code
      showName:{type: 'string'},// name
      showQuantity:{type: 'string'},//数量
      showPrice:{type: 'string'},//价格
      showAmount:{type: 'string'},//金额
      saleOrderCode:{type: 'string'},//订单号
      formmakerTime:{type: 'string'},//单据日期

      productId:{type: 'string'},//产品Id
      productCode:{type: 'string'},//产品编码
      productName:{type: 'string'},//产品名称

      color:{type: 'string'},//产品颜色
      productCategoryName:{type: 'string'},//产品品类
      saleSeriesName:{type: 'string'},//产品系列
      productModelName:{type: 'string'},//产品型号
      standardName:{type: 'string'},//产品规格

      salePrice:{type: 'string'},//零售标价
      discount:{type: 'string'},//折扣
      price:{type: 'string'},//单价
      quantity:{type: 'string'},//数量
      amount:{type: 'string'},//金额
      isSample:{type: 'string'},//是否样品
      isActivityProduct:{type: 'string'},//是否活动产品

      activityId:{type: 'string'},//活动ID
      activityName:{type: 'string'},//活动名称
      isGroupProduct:{type: 'string'}, //是否产品组合
      productGroupId:{type: 'string'}, //产品组合ID
      productGroupCode:{type: 'string'}, //产品组合编码
      productGroupName:{type: 'string'}, //产品组合名称
      groupQuantity:{type: 'string'}, //组合数量
      productGroupPrice:{type: 'string'}, //组合单价
      groupAmount:{type: 'string'}, //组合金额
      distId:{type: 'string'}, //经销商ID
      storeId:{type: 'string'}, //门店ID
    }
  }
})
