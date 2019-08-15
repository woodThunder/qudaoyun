define(["ocm_global"],function(){
	window.RetailActivityPrice = {
	    params: {
	        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
	    },
	    meta: {
				id:{type: 'string'},//id
				code:{type: 'string'},//调价单编码
				name: {type: 'string',required:true},//调价单名称
				activityId:{
			    	'refmodel':JSON.stringify(refinfo['promactivityc']),
		    		'refcfg':'{"ctx":"/uitemplate_web","isReturnCode":"true"}',
		    		"refparam":'{"EQ_auditStatus":"1"}',required:true
			    },//活动  参照
				activityCode: {type: 'string',required:true},//活动编码
				activityName: {type: 'string',required:true},//活动名称
				activityTypeName: {type: 'string',required:true},//活动类型
//				agencyId:{
//			    	'refmodel':JSON.stringify(refinfo['organization_ocm']),
//		    		'refcfg':'{"ctx":"/uitemplate_web"}'
//			    },//办事处 参照
			    agencyName: {

			    },
			  	terminalStartDate: {type:"date",format:"YYYY-MM-DD"},//活动开始时间
			  	terminalEndDate: {type:"date",format:"YYYY-MM-DD"},//活动结束时间
			  	activityDescription: {type:"string"},//活动描述
			  	effectiveDate: {type:"date",format:"YYYY-MM-DD",required:true},//调价生效日期
			  	result: {type:"string"},//执行结果
			  	auditor:{type: 'string'},//审核人
				auditStatus:{type: 'string'},//审核状态
				auditTime:{type: 'date'},//审核时间
				vnote:{type: 'string'},//备注
				creator:{type: 'string'},
				creationTime:{type: 'datetime'},
				modifier:{type: 'string'},
			    modifiedTime:{type: 'datetime'}
	    },
	    pageSize: 20,
	    //是否启用前端缓存
	    // pageCache: true
	}
	window.RetailActivityPriceItem = {
	  params: {
	      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
	  },
	  meta: {
	  	code:{},
	  	name:{},
	  	id:{},
	  	isProduct:{type: 'string'},
	  	activityId:{type: 'string'},//idp
	    productId:{type: 'string'},//idp
	    combineId:{type: 'string'},//idp
//	    productRefer: {
//	      type: 'string',
//	      "refmodel": JSON.stringify(refinfo['promproductstab']),
//	      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"isReturnCode":"true"}',
//	      "refparam":'{"activityId":""}'
//	    },
	  	showCode:{type: 'string',required:true},//产品编码
	    showName: {type: 'string',required:true},//产品名称
	    productCode: {type: 'string',required:true},//产品编码
	    productName: {type: 'string',required:true},//产品名称
	    combineCode: {type: 'string',required:true},//产品编码
	    combineName: {type: 'string',required:true},//产品名称
		productSaleSeriesName: {

		},//产品系列名称


	    shopId:{
	    	'refmodel':JSON.stringify(refinfo['activitystorec']),
    		'refcfg':'{"ctx":"/uitemplate_web"}'
	    },//门店 参照
	    shopName: {

	    },
	    shopCode: {

	    },
	    customerId:{
	    	'refmodel':JSON.stringify(refinfo['customerRefc']),
    		'refcfg':'{"ctx":"/uitemplate_web"}'
	    },//经销商
	    customerName:{

	    },
	    customerCode:{

	    },
	    price:{type: 'string',required:true},//价格
	    vnote: {type: 'string'}//备注
	  },
	  pageSize: 10,
	}
// 产品/产品组合
  window.ProductRef = {
    meta: {
      productRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['promproductstab']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"isReturnCode":"true"}'
      }
    }
  }
	//弹出框 批发价列表
	window.adjustmentRef1 = {
		meta: {
			id:{},
			productRefer:{},//临时存储productId或者combineId
			isProduct:{type: 'string'},//是否产品
			productId:{type: 'string'},//idp
	    	combineId:{type: 'string'},//idp
			combineCode: {type: 'string',required:true},//产品编码
	    	combineName: {type: 'string',required:true},//产品名称
			productCode:{type: 'string'},//活动编码
	  	    productName:{type: 'string'},//活动名称
	  	    showCode:{type: 'string',required:true},//产品编码
	    	showName: {type: 'string',required:true},//产品名称
	  	    productSaleSeriesId:{
		    	'refmodel':JSON.stringify(refinfo['orderType']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}',
		    },//产品系列名称
	  	    productSaleSeriesName: {
				type: 'string'
			},//产品系列名称
	  	    customerName:{
				type: 'string'
	    	},//经销商
	    	shopName: {
				type: 'string'
	    	},//门店
	    	price:{type: 'string',required:true},//价格
	  	    isEnable:{type: 'string'},//启用状态
//	  	    beginTime:{type: 'date'},//开始时间
//		    endTime:{type: 'date'},//结束时间
		},
		pageSize: 10,
		//是否启用前端缓存
	    pageCache: true
	}
});
