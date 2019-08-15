define(["ocm_global"],function(){
  //活动经销商执行结果
  window.ActivityCustomerExcute = {
    meta: {
      id:{type: 'string'},//id
      activityId:{type: 'string'},//活动
      activityCode:{type: 'string'},//活动
      activityName:{type: 'string'},//活动
      customerId:{type: 'string'},//经销商
      customerCode:{type: 'string'},//经销商
      customerName:{type: 'string'},//经销商
      officeId:{
        type:'string'
      }, //办事处
      officeCode:{type: 'string'},//办事处
      officeName:{type: 'string'},//办事处
      orderStartDate:{type: 'string'},//订单开始日期
      orderEndDate:{type: 'string'},//订货截至日期
      commitDeliveryMny:{type: 'string'},//承诺提货总额
      actualDeliveryMny:{type: 'string'},//实际提货总额
      completionRate:{type: 'string'},//提货完成率
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
  }
  //活动产品执行结果
  window.ActivityProductExcute = {
    meta: {
      id:{type: 'string'},//id
      showCode:{type: 'string'},//产品/产品组合
      showName:{type: 'string'},//产品/产品组合
      combineId:{type: 'string'},//产品组合
      combineCode:{type: 'string'},//产品组合
      combineName:{type: 'string'},//产品组合
      productId:{type: 'string'},//产品
      productCode:{type: 'string'},//产品
      productName:{type: 'string'},//产品
      seriesCode:{type: 'string'},//产品销售系列
      seriesName:{type: 'string'},//产品销售系列
      productCategoryName:{type: 'string'},//产品品类
      productCategoryCode:{type: 'string'},//产品品类
      productModelName:{type: 'string'},//产品型号
      productModelCode:{type: 'string'},//产品型号
      commitDeliveryNum:{type: 'string'},//承诺提货数量
      commitDeliveryMny:{type: 'string'},//承诺提货金额
      actualTakeNum:{type: 'string'},//实际提货数量
      actualTakeMny:{type: 'string'},//实际提货金额
      completionRate:{type: 'string'},//提货完成率
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
  }
})
