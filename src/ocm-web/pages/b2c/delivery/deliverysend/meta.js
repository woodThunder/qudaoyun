define(["ocm_basemodel"], function(basemodel) {
	var model = {
		metas: {
			//订单列表
			Order: {
				meta: {
					"code": {
						"type": "string",
						"text": "发货单号"
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
						"text": "冻结标识"
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
						"text": "是否拆单发货"
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
						"text": "发货时间"
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
						"text": "发货状态"
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
			},
			OrderLogs: {
				meta: {
					"creationTime": {
						"type": "datetime",
						"text": "创建时间"
					},
					"creator": {
						"type": "string",
						"text": "创建人"
					},
					"deliveryId": {
						"type": "string",
						"text": "发货单主键"
					},
					"modifiedTime": {
						"type": "datetime",
						"text": "修改时间"
					},
					"modifier": {
						"type": "string",
						"text": "修改人"
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
						"text": "操作者"
					}
				},
				"pageSize": 10
			},
			OrderProducts: {
				meta: {
					"srcBillCode": {
						"type": "String",
						"text": "来源订单号"
					},
					"serialnum": {
						"type": "String",
						"text": "行号"
					},
					"deliveryNumber": {
						"type": "bigdecimal",
						"text": "发货数量"
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
						"text": "创建时间"
					},
					"creator": {
						"type": "string",
						"text": "创建人"
					},
					"srcSerialnum": {
						"type": "string",
						"text": "来源行号"
					},
					"srcOrdercode": {
						"type": "string",
						"text": "来源订单号"
					},
					"modifiedTime": {
						"type": "time",
						"text": "修改时间"
					},
					"modifier": {
						"type": "string",
						"text": "修改人"
					},
					"pkOrgId": {
						"type": "string",
						"text": "所属组织"
					},
					"pkOrgCode": {
						"type": "string",
						"text": "所属组织"
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
						"text": "发货单主键"
					}
				},
				"pageSize": 10
			},
			//业务类型
			BussType: {
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
			},
			//办事处
			Agency: {
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
			},
			//业务类型参照
			BussTypeRef: {
				meta: {
					bussRefer: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['busstype']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
					}, //id
				}
			},
			// 办事处参照
			AgencyRef: {
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
			remarkMeta: {
				meta: {
					id: {
						type: 'string'
					},
					vnote: {
						type: 'string'
					},
				}
			}
		},
		searchs: {
			search1: [{
				type: "string",
				key: "code",
				label: "发货单号",
				// dataSource: viewModel.dispatchTypes
			}, {
				type: "refer",
				key: "platform--id",
				label: "平台名称",
				refinfo: "b2cplatform",
				refName: "所属平台",
				multi: true,
				opr: "IN",
			}, {
				type: "refer",
				key: "store--id",
				label: "店铺名称",
				refinfo: "b2cStoreRef",
				refName: "店铺",
				domid: "searchStoreId"
			}, {
				type: "text",
				key: "orderCode",
				label: "电商单号",
			}, {
				type: "refer",
				key: "storeLocation--id",
				// keyfordisplay: "storeLocationName",
				label: "仓库",
				refinfo: "storeLocation"
			}, {
				type: "combo",
				key: "sendStatusSrc--id",
				// keyfordisplay: "sendStatus",
				label: "发货状态",
				dataSource: [{
					value: "",
					name: "请选择"
				}, {
					value: "0",
					name: "未发货"
				}, {
					value: "1",
					name: "已发货"
				}, {
					value: "2",
					name: "已作废"
				}]
			}, {
				type: "text",
				key: "buyerId",
				label: "顾客ID",
			}, {
				type: "text",
				key: "buyerName",
				label: "顾客姓名",
			}, {
				type: "text",
				key: "contactInfo1",
				label: "联系方式1",
			}, {
				type: "text",
				key: "contactInfo2",
				label: "联系方式2",
			}, {
				type: "combo",
				key: "isLock",
				label: "冻结标识",
				dataSource: [{
					"value": "1",
					"name": "是"
				}, {
					"value": "0",
					"name": "否"
				}]
			}]
		},
		buttons: {
			button1: [{
				key: "remark",
				label: "备注",
				iconCls: "icon-export",
				click: "remarkEvt"
			}],
		},
		grids: {
			grid1: {
				domid: "grid_orderList_dom",
				umeta: {
					"id": "grid_orderList",
					"data": "OrderList",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeClickFun": "detailClick"
				},
				columns: [{
					"field": "code",
					"dataType": "String",
					"title": "发货单号",
					"renderType": "detailRender"
				}, {
					"field": "platformName",
					"dataType": "String",
					"title": "平台名称"
				}, {
					"field": "storeName",
					"dataType": "String",
					"title": "店铺名称",
				}, {
					"field": "buyerId",
					"dataType": "String",
					"title": "买家账户"
				}, {
					"field": "buyerName",
					"dataType": "String",
					"title": "收货人"
				}, {
					"field": "contactInfo1",
					"dataType": "String",
					"title": "收货人手机"
				}, {
					"field": "contactInfo2",
					"dataType": "String",
					"title": "收货人电话"
				}, {
					"field": "deliveryReceiverProvinceName",
					"dataType": "String",
					"title": "收货省",
				}, {
					"field": "deliveryReceiverCityName",
					"dataType": "String",
					"title": "收货市"
				}, {
					"field": "deliveryReceiverDistrictName",
					"dataType": "String",
					"title": "收货区/县"
				}, {
					"field": "deliveryReceiverTownName",
					"dataType": "String",
					"title": "收货街道/镇"
				}, {
					"field": "deliveryReceiverAddress",
					"dataType": "String",
					"title": "收货地址"
				}, {
					"field": "logisticsMode",
					"dataType": "String",
					"title": "物流方式",
					"editOptions": {
						"type": "combo",
						"datasource": "logisticsModeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "serviceMode",
					"dataType": "String",
					"title": "配送方式",
					"editOptions": {
						"type": "combo",
						"datasource": "deliveryModes"
					},
					"renderType": "comboRender"
				}, {
					"field": "sendStatus",
					"dataType": "String",
					"title": "发货状态",
					"editOptions": {
						"type": "combo",
						"datasource": "sendStatusSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "isLock",
					"dataType": "String",
					"title": "冻结标识",
					"editOptions": {
						"type": "combo",
						"datasource": "frozenFlags"
					},
					"renderType": "comboRender"
				}, {
					"field": "lockType",
					"dataType": "String",
					"title": "冻结原因"
				}, {
					"field": "isSynch",
					"dataType": "String",
					"title": "是否同步",
					"renderType": "isSynchRT"
				}, {
					"field": "isSplit",
					"dataType": "String",
					"title": "是否拆单发货",
					"editOptions": {
						"type": "combo",
						"datasource": "splitDispatchSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "isUrgent",
					"dataType": "String",
					"title": "是否加急",
					"editOptions": {
						"type": "combo",
						"datasource": "urgentSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "logisticsName",
					"dataType": "String",
					"title": "快递公司名称"
				}, {
					"field": "waybillNo",
					"dataType": "String",
					"title": "快递编号"
				}, {
					"field": "deliverTime",
					"dataType": "Datetime",
					"title": "发货时间"
				}, {
					"field": "bookTime",
					"dataType": "Datetime",
					"title": "下单时间"
				}, {
					"field": "deliveryTime",
					"dataType": "Datetime",
					"title": "要求送货时间"
				}, {
					"field": "wareHouseName",
					"dataType": "String",
					"title": "仓库名称"
				}, {
					"field": "isReturn",
					"dataType": "String",
					"title": "是否退货",
					"editOptions": {
						"type": "combo",
						"datasource": "returnSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "vnote",
					"dataType": "String",
					"title": "备注"
				}, {
					"field": "operation",
					"dataType": "String",
					"title": "操作",
					"renderType": "operation",
					"fixed": true,
					"width": "100px"
				}, ]
			},
			grid2: {
				domid: "orderProducts_dom",
				umeta: {
					"id": "orderProducts",
					"data": "OrderProducts",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": false
				},
				columns: [{
					"field": "serialnum",
					"dataType": "String",
					"title": "行号"
				}, {
					"field": "srcBillCode",
					"dataType": "String",
					"title": "电商订单号"
				}, {
					"field": "productCode",
					"dataType": "String",
					"title": "商品编码"
				}, {
					"field": "productName",
					"dataType": "String",
					"title": "商品名称"
				}, {
					"field": "deliveryNumber",
					"dataType": "String",
					"title": "发货数量"
				}, {
					"field": "outboundsNumber",
					"dataType": "String",
					"title": "出库数量"
				}, {
					"field": "price",
					"dataType": "String",
					"title": "应收单价"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "应收金额"
				}, {
					"field": "isGift",
					"dataType": "String",
					"title": "是否赠品",
					"editOptions": {
						"type": "combo",
						"datasource": "isGiftSrc"
					},
					"renderType": "comboRender"
				}]
			},
			grid3: {
				domid: "orderLogs_dom",
				umeta: {
					"id": "orderLogs",
					"data": "OrderLogs",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": false
				},
				columns: [{
					"field": "operator",
					"dataType": "String",
					"title": "操作人"
				}, {
					"field": "operationTime",
					"dataType": "Datetime",
					"title": "操作时间"
				}, {
					"field": "operateType",
					"dataType": "String",
					"title": "操作"
				}, {
					"field": "operateContent",
					"dataType": "String",
					"title": "操作事项"
				}]
			},
		}
	}
	return new basemodel(model);
})