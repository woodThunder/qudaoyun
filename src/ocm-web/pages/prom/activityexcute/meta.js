define(["ocm_global"],function(){
  //活动执行结果
  window.PromoActivityExcute = {
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//活动编码
      name: {type: 'string',required:true},//活动名称

      description: {type: 'string'},//活动描述
      orderStartDate: {type: 'string'},//订货开始日期
      orderEndDate: {type: 'string'},//订货截至日期
      deliveryTargetAmout: {type: 'string'},//提货目标总额
      deliveryFactualAmout: {type: 'string'},//提货实际总额
      completionRate: {type: 'string'},//提货目标完成率
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
  }
  //活动办事处执行结果
  window.ActivityOfficeExcute = {
    meta: {
      id:{type: 'string'},//id
      agencyId:{type: 'string'},//办事处
      agencyCode:{type: 'string'},//办事处
      agencyName:{type: 'string'},//办事处
      takeTargetMny:{type: 'string'},//提货目标金额
      saleTargetMny:{type: 'string'},//零售目标金额
      actualTakeMny:{type: 'string'},//实际提货金额
      actualSaleMny:{type: 'string'},//实际零售金额
      completionRate: {type: 'string'},//提货完成率
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
