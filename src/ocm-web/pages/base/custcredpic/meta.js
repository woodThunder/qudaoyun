var custcredpicmeta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.proDesignDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string',required:true},//描述
      customer_id: {type: 'string',required:true},//客户编码
      credential_type: {type: 'string',required:true},//证件类型
      picture_id: {type: 'string',required:true},//图片编码
      picture_name: {type: 'string',required:true},//图片名称
      suffix: {type: 'string',required:true},//图片格式
      picture_url: {type: 'string',required: true}//图片存储路径
    },
    pageSize: 5,
    //是否启用前端缓存
    // pageCache: true
}
