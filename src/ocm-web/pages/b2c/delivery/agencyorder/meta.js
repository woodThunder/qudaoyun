define(["ocm_basemodel"], function(basemodel) {
	var model = {
		metas: {
			//订单列表
			agencyordermain: {
				params: {
					"cls": "com.yonyou.ocm.util.codegenerator.CodeGenerator"
				},
				meta: {
					code: {
						type: 'string'
					}, //经销商订单号
					orderCode: {
						type: 'string'
					}, //电商订单号
					pcode: {
						type: 'string'
					}, //平台订单号
					platformName: {
						type: 'string',
					}, //平台
					storeName: {
						type: 'string'
					}, //店铺
					buyer: {
						type: 'string'
					}, //顾客ID
					bookTime: {
						type: 'datetime'
					}, //下单时间
					payTime: {
						type: 'datetime'
					}, //付款时间
					deliveryTime: {
						type: 'datetime'
					}, //要求送货时间
					serviceMode: {
						type: 'string'
					}, //配送方式
					customerName: {
						type: 'string'
					}, //经销商
					logisticsCompanyName: {
						type: 'string'
					}, //物流公司
					waybillNo: {
						type: 'string'
					}, //快递单号
					status: {
						type: 'string'
					}, //状态
					isLock: {
						type: 'integer'
					}, //冻结标识
					isSynsuccess: {
						type: 'integer'
					}, //同步标识
					isException: {
						type: 'integer'
					}, //异常标识
					exceptionType: {
						type: 'string'
					}, //异常原因
					isUrgent: {
						type: 'integer'
					}, //加急标识
					isSplitDispatch: {
						type: 'integer'
					}, //是否允许拆单发货
					buyerMsg: {
						type: 'string'
					}, //买家留言
					freight: {
						type: 'string'
					}, //运费
					totalNum: {
						type: 'string'
					}, //总数量
					totalReceivableFee: {
						type: 'string'
					}, //总应收
				},
				pageSize: 10,
			},
			//经销商订单产品信息
			agencyordersub: {
				meta: {
					// rowNum: {
					// 	type: 'string'
					// }, //行号
					orderProductId: {
						type: 'string'
					}, //关联订单产品行主键
					productId: {
						type: 'string'
					}, //产品
					productCode: {
						type: 'string'
					}, //产品编码
					productName: {
						type: 'string'
					}, //产品名称
					buyNum: {
						type: 'string'
					}, //购买数量
					soSendNum: {
						type: 'string'
					}, //发货数量
					price: {
						type: 'string'
					}, //单价
					totalPrice: {
						type: 'string'
					}, //总价
					discountFee: {
						type: 'string'
					}, //商品优惠
					receivableFee: {
						type: 'string'
					}, //应收金额
				}
			},
			//操作日志
			logMeta: {
				params: {
					"cls": "com.yonyou.ocm.b2c.service.dto.OrderLogDto"
				},
				meta: {
					id: {
						type: "string"
					}, //
					operator: {
						type: "string"
					}, //操作人
					operationTime: {
						type: "datetime"
					}, //操作时间
					operationType: {
						type: "string"
					}, //操作类型
					operateContent: {
						type: "string"
					}, //操作内容
				},
				pageSize: 10,
			},
		},
		searchs: {
			search1: [{
				type: "text",
				key: "code",
				label: "经销订单号"
			}, {
				type: "text",
				key: "orderCode",
				label: "电商单号"
			}, {
				type: "refer",
				key: "platform--id",
				label: "平台名称",
				refinfo: "b2cplatform",
				refName: "所属平台"
			}, {
				type: "combo",
				key: "billstatus",
				label: "订单状态",
				dataSource: [{
					value: '1',
					name: '未发货'
				}, {
					value: '2',
					name: '已发货'
				}, {
					value: '3',
					name: '已签收'
				}, {
					value: '4',
					name: '已结算'
				}, {
					value: '5',
					name: '已关闭'
				}, ]
			}, {
				type: "text",
				key: "buyer",
				label: "顾客ID"
			}, {
				type: "text",
				key: "waybillNo",
				label: "快递单号"
			}, {
				type: "refer",
				key: "store--id",
				label: "店铺名称",
				refinfo: "b2cStoreRef",
				refName: "所属店铺",
			}, {
				type: "text",
				key: "receiver--receiverPhone",
				label: "顾客联系方式",
			}, ]
		},
		grids: {
			grid1: {
				domid: "grid_PromoActivity_dom",
				umeta: {
					"id": "grid_PromoActivity",
					"data": "agencyOrderList",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeClickFun": "detail"
				},
				columns: [{
						"field": "code",
						"dataType": "String",
						"title": "经销商单号",
						// "renderType": "detailRender"
					}, {
						"field": "orderCode",
						"dataType": "String",
						"title": "电商单号",
						// "renderType": "detailRender"
					}, {
						"field": "pcode",
						"dataType": "String",
						"title": "平台订单号"
					}, {
						"field": "platformName",
						"dataType": "String",
						"title": "平台",
					}, {
						"field": "storeName",
						"dataType": "String",
						"title": "店铺 "
					}, {
						"field": "buyer",
						"dataType": "String",
						"title": "顾客ID",
						// "renderType": "detailRender"
					}, {
						"field": "bookTime",
						"dataType": "DateTime",
						"title": "下单时间",
						// "renderType": "detailRender"
					}, {
						"field": "payTime",
						"dataType": "String",
						"title": "付款时间"
					}, {
						"field": "deliveryTime",
						"dataType": "String",
						"title": "要求送货时间",
					}, {
						"field": "serviceMode",
						"dataType": "string",
						"title": "配送方式 ",
						"renderType": "logType"
					}, {
						"field": "customerName",
						"dataType": "String",
						"title": "经销商",
					}, {
						"field": "logisticsCompanyName",
						"dataType": "String",
						"title": "物流公司",
					}, {
						"field": "waybillNo",
						"dataType": "String",
						"title": "快递单号"
					}, {
						"field": "billstatus",
						"dataType": "String",
						"title": "订单状态",
						"renderType": "statusLists"
					}, {
						"field": "isLock",
						"dataType": "String",
						"title": "冻结标识 ",
						"renderType": "lockRender"
					}, {
						"field": "isSynsuccess",
						"dataType": "String",
						"title": "同步标识",
						"renderType": "synsRender"
					}, {
						"field": "isException",
						"dataType": "Integer",
						"title": "异常",
						"editOptions": {
							"type": "combo",
							"datasource": "exceptionStatusSrc"
						},
						"renderType": "comboRender",
						"width": "50px",
					}, {
						"field": "exceptionType",
						"dataType": "String",
						"title": "异常原因"
					}, {
						"field": "isUrgent",
						"dataType": "String",
						"title": "加急标识",
						"renderType": "urgentStatusGrid"
					}, {
						"field": "isSplitDispatch",
						"dataType": "String",
						"title": "是否允许拆单发货",
						"renderType": "splitStatusGrid"
					},
					//  {
					// 	"field": "buyerMsg",
					// 	"dataType": "String",
					// 	"title": "买家留言",
					// },
					{
						"field": "freight",
						"dataType": "String",
						"title": "运费"
					}, {
						"field": "totalReceivableFee",
						"dataType": "String",
						"title": "总应收"
					}
				]
			},
			grid3: {
				domid: "grid_productAll_dom",
				umeta: {
					"id": "grid_productAll",
					"data": "agencyOrderItem",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [
					// 	{
					// 	"field": "rowNum",
					// 	"dataType": "String",
					// 	"title": "行号",
					// },
					// 	{
					// 	"field": "orderProductId",
					// 	"dataType": "String",
					// 	"title": "关联订单产品行主键",
					// },
					{
						"field": "productId",
						"dataType": "String",
						"visible": "false",
						"title": "产品",
					}, {
						"field": "productCode",
						"dataType": "String",
						"title": "商品编码",
					}, {
						"field": "productName",
						"dataType": "String",
						"title": "商品名称",
					}, {
						"field": "buyNum",
						"dataType": "String",
						"title": "购买数量",
					}, {
						"field": "soSendNum",
						"dataType": "String",
						"title": "发货数量",
					}, {
						"field": "price",
						"dataType": "String",
						"title": "应收单价",
					}, {
						"field": "totalPrice",
						"dataType": "String",
						"visible": "false",
						"title": "总价",
					}, {
						"field": "productDiscount",
						"dataType": "String",
						"visible": "false",
						"title": "商品优惠",
					}, {
						"field": "receivableFee",
						"dataType": "String",
						"title": "应收金额",
					},
				]
			},
			grid6: {
				domid: "grid_log_dom",
				umeta: {
					"id": "grid_log",
					"data": "logList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "operator",
					"dataType": "String",
					"title": "操作人",
				}, {
					"field": "operationTime",
					"dataType": "Datetime",
					"title": "操作时间",
				}, {
					"field": "operateType",
					"dataType": "String",
					"title": "操作类型",
				}, {
					"field": "operateContent",
					"dataType": "String",
					"title": "操作内容",
				}, ]
			},
		}
	}
	return new basemodel(model);
})