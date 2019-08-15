var ProdStylemeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProdStyeDto"
    },
    meta: {
      id:{type: 'string',required:true},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      parentId:{type: 'string'},//上级ID
      parentCode:{type: 'string'},//上级编码
      parentName: {type: 'string'},//上级名称
      description: {type: 'string'},//描述
      statusCode:{type: 'integer',default:1},// 状态
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
