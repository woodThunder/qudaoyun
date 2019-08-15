var ShopOnlinemeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ShopDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string'},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      status:{type: 'integer',default:1},// 状态
      platformId:{type: 'string',required:true},
      platformCode:{type: 'string',required:true},
      platformName:{type: 'string',required:true},
      customerId:{type: 'string',required:true},
      customerName:{type: 'string',required:true},
      customerCode:{type: 'string',required:true},
      platformCode:{type: 'string',required:true},
      shopLeaseStart:{type: 'string',required:true},
      shopPatternName: {type: 'string',required:true,default:2},
      shopOnlineStatusCode:{type: 'string',required:true},
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
