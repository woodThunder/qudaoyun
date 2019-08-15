define(["ocm_global"], function() {

	window.wholesalebasepricemeta = {
		params: {
			"cls": "com.yonyou.ocm.sp.service.dto.WholeSalePriceDto"
		},
		meta: {
			id: {
				type: 'string'
			}, //id
			code: {
				type: 'string'
			}, //价格表编码
			name: {
				type: 'string',
				required: true
			}, //价格表名称

			saleOrgId: {
				type: 'string',
				required: true,
				'refmodel': JSON.stringify(refinfo['organization_price']),
				'refcfg': '{"ctx":"/uitemplate_web"}',
				"refparam": '{"EQ_isSaleOrganization":""}'
			}, //销售组织
			saleOrgName: {

			},
			saleOrgCode: {

			},
			salePrincipalId: {
				type: 'string',
				required: true,
				'refmodel': JSON.stringify(refinfo['salePrincipal']),
				'refcfg': '{"ctx":"/uitemplate_web"}'
			}, //销售主体
			salePrincipalName: {

			},
			salePrincipalCode: {
				type: 'string',
				required: true
			},

			floatCoefficientId: {
				'refmodel': JSON.stringify(refinfo['floatCoefficient']),
				'refcfg': '{"ctx":"/uitemplate_web"}',
				"refparam": '{"EQ_auditStatus":"1","EQ_invalidStatus":"1"}'
			}, //询价上浮系数
			floatCoefficientName: {

			},
			salePrincipalFakeCode: {
				type: 'string'
			}, //临时存储销售主体
			saleOrgFakeId: {
				type: 'string'
			}, //临时存储销售组织
			auditor: {
				type: 'string'
			}, //审核人
			auditStatus: {
				type: 'string'
			}, //审核状态
			auditTime: {
				type: 'date'
			}, //审核时间
			invalider: {
				type: 'string'
			}, //作废人
			invalidStatus: {
				type: 'string'
			}, //作废状态
			invalidTime: {
				type: 'date'
			}, //作废时间
			remark: {
				type: 'string'
			}, //备注

		},
		pageSize: 20,
		//是否启用前端缓存
		pageCache: false
	}

	window.wholesalebasepricechildmeta = {
		meta: {
			code: {}, //清除基类用的
			name: {}, //清除基类用的
			saleOrgId: {}, //清除基类用的
			salePrincipalCode: {}, //清除基类用的
			belongProductId: {
				required: true,
				'refmodel': JSON.stringify(refinfo['packBelongProduct']),
				'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":"true"}',
				"refparam": '{"EQ_isSaleProduct":"1","packId":""}' //是否销售产品
			}, //所属产品编码 参照
			belongProductCode: {
				type: 'string',
				required: true
			}, //所属产品编码
			belongProductName: {
				type: 'string',
				required: true
			}, //所属产品名称
			productId: {
				'refmodel': JSON.stringify(refinfo['productInfo']),
				'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true}',
				"refparam": '{"EQ_isProductPack":"1","EQ_isEnable":"1"}' //是否包件
			}, //产品编码 参照
			productCode: {
				type: 'string',
			}, //产品编码
			productName: {
				type: 'string'
			}, //产品名称
			productGroupName: {
				type: 'string'
			}, //产品组
			saleSeriesName: {
				type: 'string'
			}, //产品系列
			saleChannelId: {
				'refmodel': JSON.stringify(refinfo['orderType']),
				'refcfg': '{"ctx":"/uitemplate_web"}'
			}, //分销渠道 参照
			saleChannelName: {
				type: 'string'
			},
			saleChannelCode: {

			},
			agencyId: {
				'refmodel': JSON.stringify(refinfo['organization_ocm']),
				'refcfg': '{"ctx":"/uitemplate_web"}',
				"refparam": '{"EQ_isOffice":"1","EQ_isEnable":"1"}' //是否办事处
			}, //办事处 参照
			agencyName: {
				type: 'string'
			},
			customerId: {
				'refmodel': JSON.stringify(refinfo['customer']),
				'refcfg': '{"ctx":"/uitemplate_web"}',
				"refparam": '{"EQ_isEnable":"1"}' //是否办事处
			}, //客户
			customerName: {
				type: 'string'
			},
			//      adjustId:{
			//			'refmodel':JSON.stringify(refinfo['productPack']),
			//			'refcfg':'{"ctx":"/uitemplate_web"}'
			//	    },//调价单 Id
			//	    adjustName:{type: 'float',required:true},//调价单 名称
			adjustCode: {
				type: 'string'
			}, //调价单 编码
			price: {
				type: 'float'
			}, //价格
			beginTime: {
				type: 'date'
			}, //开始时间
			endTime: {
				type: 'date'
			}, //结束时间
			isEnable: {
				type: 'string',
				default: "1"
			}, //启用状态
			remark: {
				type: 'string'
			}, //备注
			creator: {
				type: 'string'
			}, //创建人
			creationTime: {
				type: 'date'
			}, //创建时间
			modifier: {
				type: 'string'
			}, //修改人
			modifiedTime: {
				type: 'date'
			}, //修改时间
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
	// 包件参照
	window.ProductRef = {
		meta: {
			productRefer: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['productInfo']),
				'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
				"refparam": '{"EQ_isProductPack":"1","EQ_isEnable":"1"}' //是否包件
			}
		}
	}
	// 所属产品参照
	window.PackRef = {
		meta: {
			packRefer: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['packBelongProduct']),
				'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":"true"}',
				"refparam": '{"EQ_isSaleProduct":"1","packId":""}' //是否销售产品
			}
		}
	}
})
