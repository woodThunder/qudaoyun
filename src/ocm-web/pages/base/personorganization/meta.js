var PersonOrganizationmeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.PersonOrganizationDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      status:{type: 'integer',default:1},// 状态
      personId:{type: 'string',required:true},
      personCode: {type: 'string',required:true},
      personName: {type: 'string',required:true},
      organizationId:{type: 'string',required:true},
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
