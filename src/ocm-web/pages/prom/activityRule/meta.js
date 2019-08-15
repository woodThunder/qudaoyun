define(["ocm_global"],function(){

window.ProductCombine = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      // pkOrg: {
      //   type: 'string',
      //   required:true,
      //   "refmodel": JSON.stringify(refinfo['organization_ocm']),
      //   "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
      //   "refparam":'{"EQ_isAdministration": "1"}',
      // },//组织
      // pkOrgName: {type: 'string',required:true},//组织名称
      enableStatus: {type: 'string',required:true},//启用状态
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
window.ProductCombineItem = {
  params: {
      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
  },
  meta: {
    id:{type: 'string'},//idp
    code:{type: 'string',required:true},//编码
    name: {type: 'string',required:true},//名称
    // productid: {type: 'string',required:true},//销售产品id
    productid: {
      type: 'string',
      // 'refmodel':JSON.stringify(refinfo['productInfo']),
      // 'refcfg':'{"ctx":"/uitemplate_web"}',
      // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
    },
    productidCode: {type: 'string'},
    productidName: {type: 'string'},
    productidStandardName: {type: 'string'},
    unitName: {type: 'string'},
    productidSaleSeriesId: {type: 'string'},
    productidSaleSeriesName: {type: 'string'},
    num: {type: 'string',required:true},//数量
    dr: {type: 'integer'},
  },
  pageSize: 10,
}
  
  //促销方式-减价类型begin



  var childmeta = {
    meta: {
     id:{type: 'string'},//idp

    higherLimit: {type: 'integer',required:true},//上限
    lowerLimit: {type: 'string',required:true},//下限
    discount: {type: 'string',required:true},//折扣率
    price: {type: 'string',required:true},//价格
    fullcut: {type: 'string',required:true},//满减
    }
  }
window.priceItem = {
  params: {
      "cls": "com.yonyou.occ.prom.service.dto.ActivityPriceDto"
  },
  meta: {
    id:{type: 'string'},//idp
    proId:{type: 'string',required:true},//商品/产品/商品分类/组合商品的主键
    proType: {type: 'integer',required:true},//主键类型  
    showCode: {type: 'string',required:true},//显示编码
    showName: {type: 'string',required:true},//显示名称
    totalDiscount:{type: 'string',required:true},//累计优惠
    dr: {type: 'integer'},
    conditionInfos:{
      type:"child",
      meta:childmeta.meta
    }
  },
  pageSize: 10,
}
window.ItemRef = {
  meta: {
    productref: {
      type: 'string',
      // "refmodel": JSON.stringify(refinfo['productInfo']),
      "refmodel": JSON.stringify(refinfo['utils']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
      // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
    }
  }
}

window.ProRangeMeta = {
  params: {
      "cls": "com.yonyou.occ.prom.service.dto.ProdScopeDto"
  },
  meta: {
    id:{type: 'string'},//idp
    proSkuId:{type: 'string',
    required:true,
   "refmodel": JSON.stringify(refinfo['utils']),
   "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isReturnCode":true}',
    "refparam":'{"EQ_isEnable":"1"}'
    },//商品主键
    proSkuName:{type: 'string',required:true},//商品主键   
    proSpuId: {type: 'string',
    required:true,
   "refmodel": JSON.stringify(refinfo['utils']),
   "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isReturnCode":true}',
    "refparam":'{"EQ_isEnable":"1"}'
    },//产品主键
    proSpuName: {type: 'string',required:true},//产品名称
    isExclude: {type: 'redio',required:true},//是否包含
  
    status: {type: 'string',required:false},//显示名称
   
    dr: {type: 'integer'},
    
  },
  pageSize: 10,
}
 
window.orderStandDepreciateMeta = {
  params: {
      "cls": "com.yonyou.occ.prom.service.dto.ActivityPriceConditionDto"
  },
  meta: {
    id:{type: 'string'},//idp

    higherLimit:{type: 'float',required:true},//商品主键   
    lowerLimit: {type: 'float',required:true },//产品主键
     discount: {type: 'float',required:true },//产品主键
    fullcut: {type: 'float',required:true},//产品名称 
    totalDiscount: {type: 'float',required:true},//产品名称 
    status: {type: 'string',required:false},//显示名称
  },
  pageSize: 10,
}
   


  // 赠品累计限制
window.chooseProductItem = {
  meta: {
    proId:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['utils']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
    },
    proCode:{
      type:"string"
    },
    proName:{
      type:"string"
    },
    proType:{
      type:"string"
    }
    
  }
}
  //促销方式-减价类型end



})
