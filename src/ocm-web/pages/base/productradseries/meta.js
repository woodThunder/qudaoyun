var productRadSeriesmeta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProductRadSeriesDto"
    },
    meta: {
      id:{type: 'string',required:true},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      statusCode:{type: 'integer',default:1},// 状态
      productSaleSeriesId:{type:'string'},//销售系列编码
      productSaleSeriesName:{type:'string'},//销售系列名称
      productSaleSeriesCode:{type:'string'},//销售系列编码
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
