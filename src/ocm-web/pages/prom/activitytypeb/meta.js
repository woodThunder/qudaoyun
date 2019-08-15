var ActivityTypeBmeta = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ActivityTypeBDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//活动类型编码
      name: {type: 'string',required:true},//活动类型名称
      activityGoalId: {type: 'string'},//活动目标
      activityGoalCode: {type: 'string',required:true},//活动目标
      activityGoalName: {type: 'string'},//活动目标
      isPrice: {type: 'integer',required:true},//价格
      isRebate: {type: 'integer',required:true},//返利
      isCostSupport: {type: 'integer',required:true},//费用支持
      isProductTask: {type: 'integer',required:true},//有提货任务
      isToProductDetail: {type: 'integer',required:true},//提货任务到产品明细
      applyWayId: {type: 'string'},//活动报名ID
      applyWayCode: {type: 'string',required:true},//活动报名CODE
      applyWayName: {type: 'string'},//活动报名NAME
      isEnable: {type: 'integer',required:true,enable:false},//启用状态
      creator:{type: 'string'},//创建人
      creationTime:{type: 'datetime'},//创建时间
      modifier:{type: 'string'},//修改人
      modifiedTime:{type: 'datetime'},//修改时间
      taskRequire:{type: 'string'},//提货任务
      preferentialWay:{type: 'string'},//优惠方式
      promWay:{type:'string',required:true},  //优惠方式-editcard所需占位key
      channelTypeId: {type: 'string', required:true}, //渠道类型
      channelTypeCode: {type: 'string', required:true}, //渠道类型
      channelTypeName: {type: 'string', required:true}, //渠道类型
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
