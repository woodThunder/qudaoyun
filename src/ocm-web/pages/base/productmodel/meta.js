var productModelmeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProductModelDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      productRadSeriesId:{type: 'string',required:true},//研发系列ID
      productRadSeriesName:{type: 'string',required:true},//研发系列名称
      productRadSeriesCode:{type: 'string',required:true},//研发系列编码
      statusCode:{type: 'integer',default:1},// 状态
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
