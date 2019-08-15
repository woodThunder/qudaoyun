var ProductTextureTypeMeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProductTextureTypeDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      statusCode:{type: 'string',default:1},// 状态
      parentName:{type: 'string'},//上级材质
      parentId:{type: 'string',"visible":false}
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}