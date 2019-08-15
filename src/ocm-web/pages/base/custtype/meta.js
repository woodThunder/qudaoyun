var CustTypemeta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.CustTypeDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string',required:true},//描述
	  parentId: {type: 'string',required:true},//父级编码
    },
    pageSize: 5,
    //是否启用前端缓存
    // pageCache: true
}
