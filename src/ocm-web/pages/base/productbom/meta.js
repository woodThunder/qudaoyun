define(["ocm_global"],function(){

window.ProductBomCombine = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      statusCode: {type: 'string',defaultvalue:"1"},//组织
      productInfoId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['productInfo']),
        "refcfg":'{"ctx":"/uitemplate_web","isReturnCode":"true"}',
        "refparam":'{"EQ_isProductPack":"0","NOTEQ_proNature":"4"}'

      },//
      productInfoDescription: {type: 'string'},//
      productInfoCode: {type: 'string'},//
      description: {type: 'string'},//
      baseUnit: {type: 'string'},
      bomStartTime: {type: 'string',required:true},
      bomEndTime:{type: 'string'},
      bomTypeName:{type: 'string'},
      proTypeCode:{type: 'string'},
      // organizationId:{type: 'datetime'},
      organizationId:{
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg":'{"ctx":"/uitemplate_web","refName":"工厂"}',
        "refparam":'{"EQ_isFactory":"1"}'
        },//证件类型
      organizationName: {type: 'string',required:true},//证件名称
      organizationCode: {type: 'string',required:true},//证件编码
      bomVersion:{type: 'string'},
      // modifiedTime:{type: 'datetime'},
      // bomStartTime:{type: 'string'},
      bomTypeName:{type: 'string'},
      bomTypeCode:{type: 'string'},
      isValid:{type: 'string',default:1},
      bomVersion:{type: 'string'},
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
window.ProductBomCombineItem = {
  params: {
      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
  },
  meta: {
    id:{type: 'string'},//idp
    code:{type: 'string'},//编码
    name: {type: 'string',required:true},//名称
    // productid: {type: 'string',required:true},//销售产品id
    productInfoId: {
      type: 'string',
      required:true,
      'refmodel':JSON.stringify(refinfo['productInfo']),
      'refcfg':'{"ctx":"/uitemplate_web","refReturnCode":"true"}',
      // "refparam":'{"EQ_proType":"0","NOTEQ_proNature":"4"}'
    },//
    productInfoCode: {type: 'string'},
    productInfoName: {type: 'string'},
    childNum: {type: 'string'},
    productidSaleSeriesId: {type: 'string'},
    productBomCode: {type: 'string',required:true},//数量
    dr: {type: 'integer'},
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