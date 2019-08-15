var prodSpecmeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProdSpecDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true,maxLength:10},//名称
      description: {type: 'string',maxLength:60},//描述
      productCategoryId:{type: 'string',required:true},//所属品类编码
      productCategoryName:{type: 'string',required:true},//所属品类名称
      statusCode:{type: 'integer',default:1},// 状态
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
