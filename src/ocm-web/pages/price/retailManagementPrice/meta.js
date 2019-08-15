define(["ocm_global"],function(){

window.retailmanagementpricemeta = {
    params: {
        "cls": "com.yonyou.ocm.sp.service.dto.WholeSalePriceDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string'},//管控价表编码
      name:{type: 'string',required:true},//管控价表名称
//    priceType:{type: 'string',required:true},//价格类型
      priceTypeName:{type: 'string',required:true},//价格类型
      priceTypeCOde:{type: 'string',required:true},//价格类型
      saleChannel:{
			type: 'string',
			required:true
	  },//渠道类型
	  saleChannelName:{type: 'string',required:true},
	  saleChannelCode:{type: 'string',required:true},
	  auditor:{type: 'string'},//审核人
      auditStatus:{type: 'string'},//审核状态
      auditTime:{type: 'date'},//审核时间
      remark:{type: 'string'},//备注

    },
    pageSize: 20,
    //是否启用前端缓存
    pageCache: false
}
window.retailmanagementpricechildmeta = {
	meta: {
		code:{},//清除基类用的
		name:{},//清除基类用的
		id:{type: 'string'},
		isProduct:{type: 'string'},
		id:{type: 'string'},
		productId:{type: 'string'},
		combineId:{type: 'string'},
		productGroupName: {
			type: 'string'
		},//产品组
//		productRefer: {
//	      type: 'string',
//	      "refmodel": JSON.stringify(refinfo['promproducttab']),
//	      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"isReturnCode":"true"}',
//	      "refparam":'{"EQ_isSaleProduct":"1"}'
//	    },
	    showCode:{type: 'string',required:true},//产品编码
	    showName: {type: 'string',required:true},//产品名称
	    productCode: {type: 'string',required:true},//产品编码
	    productName: {type: 'string',required:true},//产品名称
	    combineCode: {type: 'string',required:true},//产品编码
	    combineName: {type: 'string',required:true},//产品名称

	    agencyId:{
	    	'refmodel':JSON.stringify(refinfo['organization_ocm']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'//是否办事处
	    },//办事处 参照
	    agencyName: {
			type: 'string'
	    },
	    customerId:{
	        'refmodel':JSON.stringify(refinfo['customer']),
	        'refcfg':'{"ctx":"/uitemplate_web"}',
	        "refparam":'{"EQ_isEnable":"1"}'
        },//客户
        customerName:{
			type: 'string'
        },
	    price:{type: 'float'},//价格
	    isEnable:{type: 'string',default:"1"},//启用状态
	    remark: {type: 'string'},//备注
	    creator:{type: 'string'},//创建人
	    creationTime:{type: 'date'},//创建时间
	    modifier:{type: 'string'},//修改人
	    modifiedTime:{type: 'date'},//修改时间
	    agencypartitionId: {  //办事处分区
				type: 'string',
				"refmodel": JSON.stringify(refinfo["agencypartitiongrid"]),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}',
			},
		agencypartitionCode: {type: 'string'},
		agencypartitionName: {type: 'string'},
	},
	pageSize: 10,
	//是否启用前端缓存
    pageCache: false
}
// 产品/产品组合
  window.ProductRef = {
    meta: {
      productRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['promproducttab']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"isReturnCode":"true"}',
         "refparam":'{"EQ_isSaleProduct":"1"}'
      }
    }
  }
window.changehistorymeta = {
	meta:{
		id:{},
		operator:{type: 'string'},//修改人
	  	operationTime:{type: 'date'},//修改时间
	  	preContent:{type: 'string'},//修改前内容
	  	content:{type: 'string'},//修改后内容
	  	handleType:{type: 'string'}//操作类型
	},
	pageSize: 10,
	//是否启用前端缓存
    pageCache: true
}
window.changehistorylistmeta = {
	meta:{
		id:{},
		preContent:{type: 'string'},//修改前内容
	  	content:{type: 'string'},//修改后内容
		operator:{type: 'string'},//修改人
	  	operationTime:{type: 'date'},//修改时间
	  	handleType:{type: 'string'}//操作类型
	},
	pageSize: 10,
	//是否启用前端缓存
    pageCache: true
}
})
