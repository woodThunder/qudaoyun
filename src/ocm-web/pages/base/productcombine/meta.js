define(["ocm_global"],function(){

window.ProductCombine = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      combinationType: {type: 'string'}, //组合类型
      description: {type: 'string'}, //描述
      isProduct: {type: 'string'}, //仅商品组合
      isEnable: {type: 'string',required:true},//启用状态
      isOnShelf: {type: 'string',required:true},//上架
      amount: {type: 'string',regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,errorMsg:"请输入正数"},//主数量
      isCite: {type: 'string',default: 0},//是否引用
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
    id:{type: 'string'},//id
    commodityId: {
      type: 'string',
      'refmodel':JSON.stringify(refinfo['goods']),
      'refcfg':'{"ctx":"/uitemplate_web"}',
      'refparam':'{"EQ_isEnable":"1","AUTH_refcod":"productcombine"}'
    }, // 商品Id
    commodityCode:{type: 'string',required:true},//商品编码
    commodityName: {type: 'string',required:true},//商品名称
    productId: {
      type: 'string',
      'refmodel':JSON.stringify(refinfo['product']),
      'refcfg':'{"ctx":"/uitemplate_web"}',
      'refparam':'{"EQ_isEnable":"1"}'
    },// 产品Id
    productCode: {type: 'string'},
    productName: {type: 'string'},
    productCategoryId: {
      type: 'string',
      'refmodel':JSON.stringify(refinfo['goodsCategory']),
      'refcfg':'{"ctx":"/uitemplate_web"}',
      'refparam':'{"AUTH_refcod":"productcombine"}'
      // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
    }, // 商品分类ID
    productCategoryCode:{type: 'string'}, // 商品分类编码
    productCategoryName:{type: 'string'}, // 商品分类名称
    amount: {type: 'string',required:true, regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,errorMsg:"请输入正数"}, //数量
       weight: {type: 'string',required:true, regExp: /^[0-9]+$/,errorMsg:"请输入正整数"}, //金额权重
  },
  pageSize: 10,
}
//文件上传
window.FileMeta = {
	meta: {
		id: {
			type: 'string'
		}, //主键
		filepath: {
			type: 'string'
		}, //文件名称
		filesize: {
			type: 'string'
		}, //文件大小
		filename: {
			type: 'string'
		}, //文件名称
		uploadtime: {
			type: 'datetime'
		}, //上传时间
		groupname: {
			type: 'string'
		}, //
		url: {
			type: 'string'
		}, //URL
	}
}
// window.ItemRef = {
//   meta: {
//     productref: {
//       type: 'string',
//       "refmodel": JSON.stringify(refinfo['productInfo']),
//       "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
//       'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
//     }
//   }
// }
})
