define(["ocm_global"],function(){
	window.WholeSalePriceAdjust = {
	    params: {
	        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
	    },
	    meta: {
			  id:{type: 'string'},//id
			  code:{type: 'string'},//调价单号
			  name: {type: 'string',required:true},//调价单名称
			  floatCoefficientName:{type: 'string'},//询价上浮系数
			  salePrincipalCode:{type: 'string'},//销售主体code
			  saleOrgId:{type: 'string'},//销售组织Id
			  saleOrgName:{type: 'string'},//销售组织名称
			  auditor:{type: 'string'},//审核人
			  auditStatus:{type: 'string'},//审核状态
			  auditTime:{type: 'date'},//审核时间
			  remark:{type: 'string'},//备注
			  wholeSalePriceId:{
			  	type: 'string',
				required:true,
				"refmodel": JSON.stringify(refinfo['wholeSalePrice']),
				"refcfg":'{"ctx":"/uitemplate_web","isReturnCode":"true"}',
				"refparam":'{"EQ_auditStatus":"1","EQ_invalidStatus":"1"}'
			  },//价格表名称
			  wholeSalePriceCode: {type: 'string',required:true},//价格编码
			  wholeSalePriceName: {type: 'string',required:true},//价格名称

	    },
	    pageSize: 20,
	    //是否启用前端缓存
	    // pageCache: true
	}
	window.WholeSalePriceAdjustItem = {
	  params: {
	      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
	  },
	  meta: {
	  	code:{},
	  	name:{},
	  	auditor:{},
	  	auditTime:{},//复制清除基类

	  	id:{type: 'string'},
	  	name:{type: 'string'},
	  	parentId:{type: 'string'},
	  	belongProductId:{
	  		required:true,
			'refmodel':JSON.stringify(refinfo['packBelongProduct']),
			'refcfg':'{"ctx":"/uitemplate_web","isReturnCode":"true"}',
			"refparam":'{"EQ_isSaleProduct":"1","packId":""}'//是否销售产品
		},//产品编码 参照
	  	belongProductCode: {type: 'string',required:true},//所属产品编码
		belongProductName: {type: 'string',required:true},//所属产品名称
	  	productId:{
	  		required:true,
			'refmodel':JSON.stringify(refinfo['productInfo']),
			'refcfg':'{"ctx":"/uitemplate_web","isReturnCode":"true"}',
			"refparam":'{"EQ_isProductPack":"1"}'//是否包件
		},//产品编码 参照
		productCode: {
			type: 'string'
		},//产品编码
		productName: {
			type: 'string'
		},//产品名称
		productGroupId:{
			type: 'string'
		},
		productGroupName: {
			type: 'string'
		},//产品组
		saleSeriesName: {
			type: 'string'
		},//产品系列
		saleChannelId:{
			'refmodel':JSON.stringify(refinfo['orderType']),
			'refcfg':'{"ctx":"/uitemplate_web"}'
		},//分销渠道 参照
		saleChannelName: {

		},
		saleChannelCode: {

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
	    price:{type: 'float',required:true},//价格
	    beginTime:{type: 'date',required:true},//开始时间
	    endTime:{type: 'date',required:true},//结束时间
	    remark: {type: 'string',required:true},//备注
	    creator:{type: 'string'},
	    creationTime:{type: 'datetime'},
	    modifier:{type: 'string'},
	    modifiedTime:{type: 'datetime'},
			agencypartitionId: {  //办事处分区
				type: 'string',
				"refmodel": JSON.stringify(refinfo["agencypartitiongrid"]),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}',
			},
			agencypartitionCode: {type: 'string'},
			agencypartitionName: {type: 'string'},
	  },
	  pageSize: 5,
	}
	window.DemoItemRef = {
	  meta: {
	  	id:{type: 'string'},//id
	    productref: {
	      type: 'string',
	      "refmodel": JSON.stringify(refinfo['wholeSalePriceCopy']),
	      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
	      "refparam":'{"EQ_auditStatus":"1","EQ_invalidStatus":"1"}'
	    },
	    refcode: {type: 'string'},
	    refname: {type: 'string'},
	  }
	}
	//弹出框 批发价列表
	window.WholeSalePriceAdjustmeta = {
		meta: {
			id:{type: 'string'},
			productId:{
				'refmodel':JSON.stringify(refinfo['productPack']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
			},//产品编码 参照
			productCode: {

			},//产品编码
			productName: {

			},//产品名称
			belongProductId:{type: 'string'},
			belongProductCode: {type: 'string',required:true},//所属产品编码
		    belongProductName: {type: 'string',required:true},//所属产品名称
			productGroupId:{
		    	'refmodel':JSON.stringify(refinfo['productGroup']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
		    },//产品组 参照
			productGroupName: {
				type: 'string'
			},//产品组
			productSaleSeriesId:{
		    	'refmodel':JSON.stringify(refinfo['productGroup']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
		    },//产品系列 参照
			saleSeriesName: {
				type: 'string'
			},//产品系列
		    saleChannelId:{
				'refmodel':JSON.stringify(refinfo['orderType']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}'
			},//分销渠道 参照
			saleChannelName: {

			},
			saleChannelCode: {

			},
		    agencyId:{
		    	'refmodel':JSON.stringify(refinfo['organization_ocm']),
	    		'refcfg':'{"ctx":"/uitemplate_web"}',
		    },//办事处 参照
		    agencyName: {

		    },
		       customerId:{
	        'refmodel':JSON.stringify(refinfo['customer']),
	        'refcfg':'{"ctx":"/uitemplate_web"}',
	      },//客户
	      customerName:{

	      },
		    price:{type: 'float',required:true},//价格
		    beginTime:{type: 'date',required:true},//开始时间
		    endTime:{type: 'date',required:true},//结束时间
		    isEnable:{type: 'string',required:true},//启用状态
		    creator:{type: 'string',required:true},//创建人
		    creationTime:{type: 'date',required:true},//创建时间
		    modifier:{type: 'string',required:true},//修改人
		    modifiedTime:{type: 'date',required:true},//修改时间
		    remark: {type: 'string',required:true},//备注
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
	    pageCache: true
	}
});
