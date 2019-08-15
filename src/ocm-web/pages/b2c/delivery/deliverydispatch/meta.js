define(["ocm_global"], function() {
	//活动定义
	window.Order = {
		"params": {
			"cls": "com.yonyou.ocm.b2c.service.dto.DispatchNoteDto"
		},
		meta: {
			"belongOffice": {
				"type": "string",
				"text": "办事处"
			},
			"belongOfficeName": {
				"type": "string",
				"text": "办事处名称"
			},
			"billStatus": {
				"type": "string",
				"text": "处理状态"
			},
			"bookTime": {
				"type": "datetime",
				"text": "下单时间"
			},
			"buyer": {
				"type": "string",
				"text": "顾客ID"
			},
			"buyerMsg": {
				"type": "string",
				"text": "买家留言"
			},
			"code": {
				"type": "string",
				"text": "任务单号"
			},
			"creationTime": {
				"type": "datetime",
				"text": "creationTime"
			},
			"creator": {
				"type": "string",
				"text": "creator"
			},
			"deliveryTime": {
				"type": "datetime",
				"text": "要求送货时间"
			},
			"id": {
				"type": "string",
				"text": "id"
			},
			"isLock": {
				"type": "string",
				"text": "冻结标识"
			},
			"isLockName": {
				"type": "string",
				"text": "冻结原因"
			},

			"isSubsidy": {
				"type": "string",
				"text": "已补贴费用"
			},
			"isVerify": {
				"type": "string",
				"text": "是否核销"
			},
			"logisticsMode": {
				"type": "string",
				"text": "物流方式"
			},
			"sendPersons": {
				"type": "string",
				"text": "送装人员"
			},
			"sendPersons": {
				"type": "string",
				"text": "送装人员"
			},
			"modifiedTime": {
				"type": "datetime",
				"text": "modifiedTime"
			},
			"modifier": {
				"type": "string",
				"text": "modifier"
			},
			"orderId": {
				"type": "string",
				"text": "订单主键"
			},
			"payTime": {
				"type": "datetime",
				"text": "付款时间"
			},
			"pcode": {
				"type": "string",
				"text": "平台订单号"
			},
			"persistStatus": {
				"type": "string",
				"text": "persistStatus"
			},
			"pkOrg": {
				"type": "string",
				"text": "组织"
			},
			"platformId": {
				"type": "string",
				"text": "来源平台"
			},
			"receipt": {
				"type": "string",
				"text": "配送回执"
			},
			"receiptStatus": {
				"type": "string",
				"text": "配送回执确认状态"
			},
			// "receiver": {
			// 	"type": "dispatchnotereceiverdto",
			// 	"text": "收货信息"
			// },
			"sellerRemark": {
				"type": "string",
				"text": "卖家备注"
			},
			"serviceMode": {
				"type": "string",
				"text": "配送方式"
			},
			"serviceProvider": {
				"type": "string",
				"text": "服务商"
			},
			"storeId": {
				"type": "string",
				"text": "店铺"
			},
			"syscode": {
				"type": "string",
				"text": "电商订单号"
			},
			"sendStatus": {
				"type": "string",
				"text": "发货状态"
			},
			"completeTime": {
				"type": "date",
				"text": "完成日期"
			},
			"receiverProvinceName": {
				"type": "string",
				"text": "所属省"
			},
			"receiverCityName": {
				"type": "string",
				"text": "所属市"
			},
			"receiverDistrictName": {
				"type": "string",
				"text": "所属区（县）"
			},
			"receiverTownName": {
				"type": "string",
				"text": "所属镇（街）"
			},
			receiverProviceId: { //注册所在省份ID
				type: 'string',
				required: true,
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"1"}'
			},
			receiverCityId: { //注册所在城市ID
				type: 'string',
				required: true,
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"2"}'
			},
			receiverDistrictId: { //注册所在县ID
				type: 'string',
				required: true,
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"3"}'
			},
			receiverTownId: { //注册所在街道/镇Id
				type: 'string',
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"4"}'
			},
		},
		"pageSize": 10
	};
	window.receiver = {
			meta: {
				receiverProvinceName: {
					type: "string",
				},
				receiverCityName: {
					type: "string",
				},
				receiverDistrictName: {
					type: "string",
				},
				receiverTownName: {
					type: "string",
				},
			}
		},
		window.OrderLogs = {
			"params": {
				"cls": "com.yonyou.ocm.b2c.service.dto.DispatchNoteLogDto"
			},
			meta: {
				"creationTime": {
					"type": "datetime",
					"text": "creationTime"
				},
				"creator": {
					"type": "string",
					"text": "creator"
				},
				"dispatchnoteId": {
					"type": "string",
					"text": "发货单主键"
				},
				"id": {
					"type": "string",
					"text": "id"
				},
				"modifiedTime": {
					"type": "datetime",
					"text": "modifiedTime"
				},
				"modifier": {
					"type": "string",
					"text": "modifier"
				},
				"operate": {
					"type": "string",
					"text": "操作"
				},
				"operateContent": {
					"type": "string",
					"text": "操作内容"
				},
				"operateTime": {
					"type": "datetime",
					"text": "操作时间"
				},
				"operator": {
					"type": "string",
					"text": "操作人"
				},
				"persistStatus": {
					"type": "string",
					"text": "persistStatus"
				}
			},
			"pageSize": 10
		};

	window.OrderProducts = {
		"params": {
			"cls": "com.yonyou.ocm.b2c.service.dto.DispatchNoteProductsDto"
		},
		meta: {
			"buyNum": {
				"type": "bigdecimal",
				"text": "采购数量"
			},
			"channelStockNum": {
				"type": "bigdecimal",
				"text": "渠道库存占用量"
			},
			"creationTime": {
				"type": "datetime",
				"text": "creationTime"
			},
			"creator": {
				"type": "string",
				"text": "creator"
			},
			"dispatchnoteId": {
				"type": "string",
				"text": "发货单主键"
			},
			"needNum": {
				"type": "string",
				"text": "应发数量"
			},
			"id": {
				"type": "string",
				"text": "id"
			},
			"modifiedTime": {
				"type": "time",
				"text": "modifiedTime"
			},
			"modifier": {
				"type": "string",
				"text": "modifier"
			},
			"needNum": {
				"type": "bigdecimal",
				"text": "应发数量"
			},
			"orderDispatchId": {
				"type": "string",
				"text": "订单发货安排主键"
			},
			"persistStatus": {
				"type": "string",
				"text": "persistStatus"
			},
			"poBillNo": {
				"type": "string",
				"text": "采购订单号"
			},
			"productCode": {
				"type": "string",
				"text": "产品编码"
			},
			"productId": {
				"type": "string",
				"text": "产品主键"
			},
			"productName": {
				"type": "string",
				"text": "产品名称"
			},
			"remark": {
				"type": "string",
				"text": "备注"
			},
			"returnNum": {
				"type": "bigdecimal",
				"text": "关闭数量"
			},
			"serialnum": {
				"type": "string",
				"text": "行号"
			},
			"soBillNo": {
				"type": "string",
				"text": "销售订单号"
			},
			"storeFinishNum": {
				"type": "bigdecimal",
				"text": "完工数量"
			},
			"storePlanNum": {
				"type": "bigdecimal",
				"text": "排工数量"
			},
			"storeSendNum": {
				"type": "bigdecimal",
				"text": "出库数量"
			}
		},
		"pageSize": 10
	};

	//业务类型
	window.BussType = {
		meta: {
			id: {
				type: 'string'
			},
			bussiTypeId: {
				type: 'string'
			}, //id
			bussiTypeCode: {
				type: 'string',
				required: true
			}, //编码
			bussiTypeName: {
				type: 'string',
				required: true
			}, //名称
		}
	}
	//办事处
	window.Agency = {
		meta: {
			id: {
				type: 'string'
			},
			officeId: {
				type: 'string'
			}, //id
			officeCode: {
				type: 'string',
				required: true
			}, //编码
			officeName: {
				type: 'string',
				required: true
			}, //名称
		}
	}
	//业务类型参照
	window.BussTypeRef = {
		meta: {
			bussRefer: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['busstype']),
				"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
			}, //id
		}
	}
	//办事处参照
	window.AgencyRef = {
			meta: {
				agencyRefer: {
					type: 'string',
					"refmodel": JSON.stringify(refinfo['organization_auth_b2c']),
					"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
					"refparam": '{"EQ_isOffice":"1"}'
				}
			}
		},

		//订单备注
		window.remarkMeta = {
			meta: {
				id: {
					type: 'string'
				}, //id
				dr: {
					type: 'integer'
				}, //dr
				ts: {
					type: 'datetime'
				}, //ts
				creator: {
					type: 'string'
				},
				creationTime: {
					type: 'datetime'
				},
				modifier: {
					type: 'string'
				},
				modifiedTime: {
					type: 'datetime'
				},
				commentTypes: {
					type: 'string'
				},
				commentInfo: {
					type: 'string'
				},
				commentCategory: {
					type: 'string'
				},
			}
		}
})