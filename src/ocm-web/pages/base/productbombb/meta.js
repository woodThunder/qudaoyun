define(["ocm_global"],function(){
window.SaleProductInfometa = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ShopDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      description: {type: 'string',required:true},//名称
      suiteCode:{type: 'string'},
      suiteDescription:{type: 'string'},
      suiteNum:{type: 'string'},
      packCode:{type: 'string'},
      packDescription:{type: 'string'},
      packNum:{type: 'string'},
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
//联系人
window.SuiteProductInfometa ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
    },
    meta: {
    id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      description: {type: 'string',required:true},//名称
      suiteCode:{type: 'string'},
      suiteDescription:{type: 'string'},
      suiteNum:{type: 'string'},
      packCode:{type: 'string'},
      packDescription:{type: 'string'},
      packNum:{type: 'string'},
  },
  pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}

//市场区域  
window.PackProductInfometa ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.DealerMarketAreaDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      description: {type: 'string',required:true},//名称
      suiteCode:{type: 'string'},
      suiteDescription:{type: 'string'},
      suiteNum:{type: 'string'},
      packCode:{type: 'string'},
      packDescription:{type: 'string'},
      packNum:{type: 'string'},
    
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}




})
