var CommPlatmeta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.CommPlatDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string',required:true},//描述
    },
    pageSize: 5,
    //是否启用前端缓存
    // pageCache: true
}
