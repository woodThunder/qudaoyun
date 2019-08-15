define(["ocm_global"], function() {
	//活动定义
	window.Order = {
		"params": {
			"cls": "com.yonyou.ocm.b2c.service.dto.DeliveryDto"
		},
		meta: {
			"code": {
				"type": "string",
				"text": "退货单号"
			},
			"orderCode": {
				"type": "string",
				"text": "电商单号"
			},
			"pcode": {
				"type": "string",
				"text": "平台单号"
			},
			"platformId": {
				"type": "string",
				"text": "平台"
			},
			"platformName": {
				"type": "string",
				"text": "平台"
			},
			"storeId": {
				"type": "string",
				"text": "店铺名称"
			},
			"storeName": {
				"type": "string",
				"text": "店铺"
			},
			"creationTime": {
				"type": "datetime",
				"text": "creationTime"
			},
			"creator": {
				"type": "string",
				"text": "creator"
			},
			"buyerId": {
				"type": "string",
				"text": "顾客ID"
			},
			"buyerName": {
				"type": "string",
				"text": "顾客姓名"
			},
			"contactInfo1": {
				"type": "string",
				"text": "联系方式1"
			},
			"contactInfo2": {
				"type": "string",
				"text": "联系方式2"
			},
            "deliveryReceiverProvinceName": {
                "type": "string",
                "text": "收货省"
            },
            "deliveryReceiverCityName": {
                "type": "string",
                "text": "收货市"
            },
            "deliveryReceiverDistrictName": {
                "type": "string",
                "text": "收货区/县"
            },
            "deliveryReceiverTownName": {
                "type": "string",
                "text": "收货街道/镇"
            },
			"deliveryReceiverAddress": {
				"type": "string",
				"text": "收货地址"
			},
			
			"logisticsMode": {
				"type": "string",
				"text": "物流方式"
			},
			"logisticsModeId": {
				"type": "string",
				"text": "物流方式"
			},
			"serviceMode": {
				"type": "string",
				"text": "配送方式"
			},
			"billStatus": {
				"type": "string",
				"text": "订单状态"
			},
			"isLock": {
				"type": "int",
				"text": "冻结标识",
				// default : '0'
			},
			"modifiedTime": {
				"type": "datetime",
				"text": "modifiedTime"
			},
			"modifier": {
				"type": "string",
				"text": "modifier"
			},
			"lockType": {
				"type": "string",
				"text": "冻结原因"
			},
			"isSplit": {
				"type": "int",
				"text": "是否拆单退货"
			},
			"isUrgent": {
				"type": "int",
				"text": "是否加急"
			},
			"logisticsId": {
				"type": "string",
				"text": "快递公司编码"
			},
			"logisticsName": {
				"type": "string",
				"text": "快递公司名称"
			},
			"waybillNo": {
				"type": "string",
				"text": "快递编号"
			},
			"deliverTime": {
				"type": "datetime",
				"text": "退货时间"
			},
			"saleOrgId": {
				"type": "string",
				"text": "销售组织"
			},
			"saleOrgCode": {
				"type": "string",
				"text": "销售组织"
			},
			"saleOrgName": {
				"type": "string",
				"text": "销售组织"
			},
			"bookTime": {
				"type": "datetime",
				"text": "下单时间"
			},
			"deliveryTime": {
				"type": "string",
				"text": "要求送货时间"
			},
			"isSynch": {
				"type": "string",
				"text": "是否同步"
			},
			"wareHouseId": {
				"type": "string",
				"text": "仓库ID"
			},
			"wareHouseCode": {
				"type": "string",
				"text": "仓库编码"
			},
			"wareHouseName": {
				"type": "string",
				"text": "仓库名称"
			},
			"isReturn": {
				"type": "string",
				"text": "是否退货"
			},
			"vnote": {
				"type": "string",
				"text": "备注"
			},
			"sendStatus": {
				"type": "string",
				"text": "退货状态"
			},
			"isException": {
				"type": "string",
				"text": "异常标识"
			},
			"exceptionType": {
				"type": "string",
				"text": "异常原因"
			},
			"pkOrgId": {
				"type": "string",
				"text": "组织"
			},
			"pkOrgCode": {
				"type": "string",
				"text": "组织"
			},
			"pkOrgName": {
				"type": "string",
				"text": "组织"
			},
			receiverProviceId: { //注册所在省份ID
				type: 'string',
				required: true,
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"2"}'
			},
			receiverCityId: { //注册所在城市ID
				type: 'string',
				required: true,
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"3"}'
			},
			receiverDistrictId: { //注册所在县ID
				type: 'string',
				required: true,
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"4"}'
			},
			receiverTownId: { //注册所在街道/镇Id
				type: 'string',
				"refmodel": JSON.stringify(refinfo['region']),
				"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
				"refparam": '{"EQ_areaLevel":"5"}'
			}
			


		},
		"pageSize": 10
	};
	

	window.OrderLogs = {
		"params": {
			"cls": "com.yonyou.ocm.b2c.service.dto.DeliveryLogDto"
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
			"deliveryId": {
				"type": "string",
				"text": "退货单主键"
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
			"cls": "com.yonyou.ocm.b2c.service.dto.DeliveryProductDto"
		},
		meta: {
			"deliveryNumber": {
				"type": "bigdecimal",
				"text": "退货数量"
			},
			"outboundsNumber": {
				"type": "bigdecimal",
				"text": "出库数量"
			},
            "receivableFee": {
                "type": "bigdecimal",
                "text": "应收金额"
            },
            "price": {
                "type": "bigdecimal",
                "text": "应收单价"
            },
			"creationTime": {
				"type": "datetime",
				"text": "creationTime"
			},
			"creator": {
				"type": "string",
				"text": "creator"
			},
			"srcSerialnum": {
				"type": "string",
				"text": "来源行号"
			},
			"srcBillCode": {
				"type": "string",
				"text": "来源订单号"
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
			"pkOrgId": {
				"type": "string",
				"text": "所属组织"
			},
			"pkOrgCode": {
				"type": "string",
				"text": "所属组织"
			},
			"persistStatus": {
				"type": "string",
				"text": "persistStatus"
			},
			"pkOrgName": {
				"type": "string",
				"text": "所属组织"
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
			"serialnum": {
				"type": "string",
				"text": "行号"
			},
			"deliveryId": {
				"type": "string",
				"text": "退货单主键"
			},
			cancelReturnNumber :{
				type :'bigdecimal',
				text : '取消退货数量'
			},
			returnFee :{
				type :'bigdecimal',
				text : '退货金额'
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
		  },
		  vnote: {
			type: 'string'
		  },
		}
	  }
})