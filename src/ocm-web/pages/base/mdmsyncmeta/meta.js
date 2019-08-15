var MdmSyncMeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.MdmSyncMetaDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string',maxLength:30},//描述
      statusCode:{type: 'integer',default:1},// 状态
      createTime:{type: 'datetime'},
      updateTime:{type: 'datetime'}
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
