define(["ocm_global"],function(){

window.CustomAttribute = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
    },
    meta: {
       id:{type: 'string'},//idp
      name: {type: 'string',required:true},//名称
      statusCode: {type: 'string',defaultvalue:"1"},//
      unitId:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['utils']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":""}'
        },
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
window.CustomAttributeItem = {
  params: {
      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
  },
  meta: {
    id:{type: 'string'},//idp
    name: {type: 'string',required:true},//名称
   statusCode: {type: 'string',defaultvalue:"1"},
  },
  pageSize: 5,
}
window.DemoItemRef = {
  meta: {
    productref: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['productInfo']),
      "refcfg":'{"ctx":"/uitemplate_web"}'
    },
    refcode: {type: 'string'},
    refname: {type: 'string'},
  }
}

})