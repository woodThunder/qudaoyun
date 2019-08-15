define(["ocm_global"],function(){
	window.AdjustmentFloatingCoefficient = {
	    params: {
	        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
	    },
	    meta: {
			  id:{type: 'string'},//id
			  code:{type: 'string'},//上浮系数调整单编码
			  name: {type: 'string',required:true},//上浮系数调整单名称
			  floatCoefficientId:{
			  	required:true,
		      	'refmodel':JSON.stringify(refinfo['floatCoefficient']),
		    	'refcfg':'{"ctx":"/uitemplate_web","isReturnCode":true}',
		    	"refparam":'{"EQ_auditStatus":"1","EQ_invalidStatus":"1"}'
		      },//上浮系数
		      floatCoefficientName: {
				required:true
		      },//上浮系数名称
		       floatCoefficientCode: {
				required:true
		      },//上浮系数编码
			  auditor:{type: 'string'},//审核人
			  auditStatus:{type: 'string'},//审核状态
			  auditTime:{type: 'date'},//审核时间
			  remark:{type: 'string'},//备注
			  creator:{type: 'string'},
			  creationTime:{type: 'datetime'},
			  modifier:{type: 'string'},
			  modifiedTime:{type: 'datetime'}
	    },
	    pageSize: 20,
	    //是否启用前端缓存
	    // pageCache: true
	}
	window.AdjustmentFloatingCoefficientItem = {
	  params: {
	      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
	  },
	  meta: {
	  	code:{},
	  	name:{},
	  	id:{},
		orderTypeId:{

		},//业务标识 枚举
		orderTypeName: {

		},
		orderTypeCode: {

		},
		saleChannelId:{

		},//分销渠道 枚举
		saleChannelName: {

		},
		saleChannelCode: {

		},
	    productGroupId:{
	    	'refmodel':JSON.stringify(refinfo['productGroup']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isEnable":"1"}'
	    },//产品组 参照
	    productGroupName:{

	    },
	    agencyId:{
	    	'refmodel':JSON.stringify(refinfo['organization_ocm']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'//是否办事处
	    },//办事处 参照
	    agencyName: {

	    },
	    customerId:{
	    	'refmodel':JSON.stringify(refinfo['customer']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isEnable":"1"}'
	    },//客户
	    customerName:{

	    },
	    proportion:{type: 'string',required:true},//上浮比例
	    time:{type: 'string'},
	    beginTime:{type: 'date',required:true},//开始时间
	    endTime:{type: 'date',required:true},//结束时间
	    remark: {type: 'string'},//备注
	    creator:{type: 'string'},
		creationTime:{type: 'datetime'},
		modifier:{type: 'string'},
		modifiedTime:{type: 'datetime'}
	  },
	  pageSize: 10,
	}
	window.DemoItemRef = {
	  meta: {
	  	id:{type: 'string'},//id
	    productref: {
	      type: 'string',
	      "refmodel": JSON.stringify(refinfo['wholeSalePriceCopy']),
	      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
	    },
	    refcode: {type: 'string'},
	    refname: {type: 'string'},
	  }
	}
	//弹出框 批发价列表
	window.adjustmentRef = {
		meta: {
			id:{},
			orderTypeId:{
				'refmodel':JSON.stringify(refinfo['busstype']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
			},//业务标识 参照
			orderTypeName: {

			},
			orderTypeCode:{

			},
			saleChannelId:{
				'refmodel':JSON.stringify(refinfo['orderType']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
			},//分销渠道 参照
			saleChannelName: {

			},
			saleChannelCode: {

			},
		    productGroupId:{
		    	'refmodel':JSON.stringify(refinfo['productGroup']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
		    },//产品组 参照
		    productGroupName:{

		    },
		    agencyId:{
		    	'refmodel':JSON.stringify(refinfo['organization_ocm']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}',
		    },//办事处 参照
		    agencyName: {

		    },
		    agencyCode: {

		    },
		    customerId:{
		    	'refmodel':JSON.stringify(refinfo['customer']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}',
		    },//客户
		    customerName:{

		    },
		    isEnable:{type: 'string'},//启用状态
		    proportion:{type: 'string',required:true},//上浮比例
		    beginTime:{type: 'date',required:true},//开始时间
		    endTime:{type: 'date',required:true},//结束时间
		    remark: {type: 'string'}//备注
		},
		pageSize: 10,
		//是否启用前端缓存
		pageCache: true
	}
});
