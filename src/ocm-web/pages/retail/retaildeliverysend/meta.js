define(["ocm_basemodel"], function(basemodel) {
	var model = {
		metas: {
			//订单列表
			Order: {
				meta: {
					id: {
						type: "string"
					},
					code: {
						type: "string",
						required: true
					}, //发货单号
					pcode: {
						type: "string"
					}, //平台单号
					platformId: {
						type: "string"
					}, //平台
					platformName: {
						type: "string"
					}, //平台
					orderCode: {
						type: "string"
					}, //电商单号
					storeId: {
						type: "string"
					}, //店铺名称
					storeName: {
						type: "string"
					}, //店铺名称
					buyerId: {
						type: "string"
					}, //顾客ID
					buyerName: {
						type: "string"
					}, //顾客姓名
					contactInfo1: {
						type: "string",
					}, //联系方式1
					deliveryAddress: {
						type: "string"
					}, //收货地址
					deliveryReceiverProvince: {
						type: "string"
					}, //收货省份
					deliveryReceiverProvinceName: {
						type: "string"
					}, //收货省份
					deliveryReceiverCity: {
						type: "string"
					}, //收货城市
					deliveryReceiverCityName: {
						type: "string"
					}, //收货城市
					deliveryReceiverDistrict: {
						type: "string"
					}, //收货区县
					deliveryReceiverDistrictName: {
						type: "string"
					}, //收货区县
					deliveryReceiverTown: {
						type: "string"
					}, //收货乡镇
					deliveryReceiverTownName: {
						type: "string"
					}, //收货乡镇
					deliveryReceiverAddress: {
						type: "string"
					}, //详细地址
					wareHouseId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["warehouse"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: "{}",
						required: true
					}, //发货仓库
					wareHouseName: {
						type: "string"
					},
					logisticsMode: {
						type: "string"
					}, //物流方式
					logisticsModeId: {
						type: "string"
					}, //物流方式
					serviceMode: {
						type: "string"
					}, //配送方式
					billStatus: {
						type: "string",
						required: true
					}, //订单状态
					craetionTime: {
						type: "date",
						required: true
					}, //单据日期
					creationTime: {
						type: "datetime",
					},
					creator: {
						type: "string",
					},
					contactInfo2: {
						type: "string",
					}, //联系方式2	
					isLock: {
						type: "int",
					}, //冻结标识
					modifiedTime: {
						type: "datetime",
					},
					modifier: {
						type: "string",
					},
					lockType: {
						type: "string",
					}, //冻结原因
					isSplit: {
						type: "int",
					}, //是否拆单发货
					isUrgent: {
						type: "int",
					}, //是否加急
					logisticsId: {
						type: "string",
					},
					logisticsName: {
						type: "string",
					}, //快递公司名称
					waybillNo: {
						type: "string",
					}, //快递编号
					deliverTime: {
						type: "datetime",
					}, //发货时间
					bookTime: {
						type: "datetime",
					}, //下单时间
					deliveryTime: {
						type: "string",
					}, //要求送货时间
					isSynch: {
						type: "string",
					}, //是否同步
					billDate: {
						type: "date"
					},
					// 销售组织
					saleOrgId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
						refparam: '{"EQ_isEnable":"1"}'
					},
					// 销售组织编码
					saleOrgCode: {
						type: "string"
					},
					// 销售组织名称
					saleOrgName: {
						type: "string"
					},
					// deliveryOrderCode: {
					// 	type: "string"
					// }, // 发货单号
					deliveryOperater: {
						type: "string"
					}, //发货安排人
					deliveryOrderDate: {
						type: "date"
					}, //发货日期

					totalDeliveryNumber: {
						type: "numberFloat",
						precision: 2,
						required: true
					}, // 总数量
					totalAmount: {
						type: "amountFloat"
					}, // 总金额
					orderStatusId: {
						type: "string"
					}, // 单据状态
					orderStatusCode: {
						type: "string"
					},
					orderStatusName: {
						type: "string"
					},
					totalNetWeight: {
						type: "string"
					},
					totalWeight: {
						type: "string"
					},
					totalVolume: {
						type: "string"
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
					urmOrderCode: {
						type: "string",
						required: true
					}, //零售单号
					pcode: {
						type: "string",
						required: true
					}, //外系统单号
					shopId: {
						type: "string",
						required: true
					}, //门店
					shopName: {
						type: "string",
						required: true
					}, //门店
					pkOrgId: {
						type: "string"
					}, //销售组织
					pkOrgName: {
						type: "string"
					}, //销售组织
					productCode: {
						type: "string",
						required: true
					}, //商品编码
					productName: {
						type: "string",
						required: true
					}, //商品名称
					productVersionId: {
						type: "string"
					}, //版本号
					deliveryNumber: {
						type: "numberFloat",
						required: true
					}, //本次安排数量
					outboundsNumber: {
						type: "numberFloat",
						required: true
					}, //累计出库数量
					expectedArrivalDate: {
						type: "datetime"
					}, //期望收货时间
					isGift: {
						type: "integer",
						required: true
					}, //是否赠品
					remark: {
						type: "string"
					}, //备注
					close: {
						type: "integer",
						required: true
					}, //订单关闭
				},
				pageSize: 10
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
			},
			//拉式生成发货单开始
			referSaleOrderItemsMeta: {
				meta: {
					retailOrderCode: {
						type: "string"
					}, // 零售单号
					pcode: {
						type: "string"
					}, //外系统单号
					shopId: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['shop']),
						"refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
					}, //门店
					shopName: {
						type: "string"
					}, //门店
					pkOrgId: {
						type: "string"
					}, // 销售组织
					pkOrgCode: {
						type: "string"
					},
					pkOrgName: {
						type: "string"
					},
					goodsId: {
						type: "string"
					}, // 商品编码
					goodsVersionId: {
						type: "string"
					}, //商品版本号
					skuName: {
						type: "string"
					}, // 商品名称
					orderNum: {
						type: "numberFloat"
					}, //订货数量
					alreadyProductDeliveryNum: {
						type: "numberFloat"
					}, //已安排数量
					readyProductDeliveryNum: {
						type: "numberFloat"
					}, //待安排发货数量
					stockOnHandNum: {
						type: "numberFloat"
					}, // 现存量
					expectedArrivalDate: {
						type: "date"
					}, // 期望收货时间
					deliveryInvOrgId: {
						type: "string"
					}, // 发货库存组织
					deliveryInvOrgName: {
						type: "string"
					},
					orderReceiverProvince: {
						type: "string"
					}, // 收货地址省
					orderReceiverCity: {
						type: "string"
					}, // 收货地址市
					orderReceiverDistrict: {
						type: "string"
					}, // 收货地址区					
					orderReceiverTown: {
						type: "string"
					}, // 收货地址镇
					orderReceiverAddress: {
						type: "string"
					}, // 收货地址	.
					orderFullReceiverAddress: {
						type: "string"
					}, // 收货地址全部
					transTypeId: {
						type: "string"
					}, // 订单交易类型
					transTypeName: {
						type: "string"
					}, // 订单交易类型
				},
				pageSize: 10
			},
			deliveryItemsBomMeta: {
				meta: {
					deliveryGoodsId: {
						type: "string"
					}, //发货单子表主键
					parentGoodsName: {
						type: "string"
					}, //母件商品名称
					childGoodsCode: {
						type: "string"
					}, //子件商品编码
					childGoodsName: {
						type: "string"
					}, //子件商品名称
					productVersionId: {
						type: "string"
					}, //商品版本
					orderNumUnitName: {
						type: "string"
					}, //单位
					deliveryNumber: {
						type: "numberFloat"
					}, //发货安排数量
					outboundsNumber: {
						type: "numberFloat"
					}, //累计出库数量
					deliveryInvOrgId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"发货库存组织" }',
						refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}',
						required: true
					},
					// 发货库存组织编码")
					deliveryInvOrgCode: {
						type: "string"
					},
					// 发货库存组织名称")
					deliveryInvOrgName: {
						type: "string"
					},
					isGift: {
						type: "numberFloat"
					}, //赠品
				},
				pageSize: 10
			},
		},
		searchs: {
			search1: [{
					type: "text",
					key: "code",
					label: "发货单号"
				}, {
					type: "text",
					key: "deliveryOrderItems--saleOrderCode",
					label: "订单号"
				}, {
					type: "refer",
					key: "deliveryOrderItems--customer",
					label: "客户",
					refinfo: "customer",
					refName: "客户",
					clientParam: {
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1"
					},
					opr: "IN",
					refcfg: {
						ctx: "/uitemplate_web",
						refCode: "",
						refName: "",
						isMultiSelectedEnabled: "true"
					}
				},
				// {
				//   type: "refer",
				//   key: "saleOrg--id",
				//   label: "销售组织",
				//   refinfo: "organization_ocm"
				// },
				{
					type: "daterange",
					key: "deliveryOrderDate",
					label: "发货日期"
				}, {
					type: "combo",
					key: "orderStatus",
					label: "发货单状态",
					url: window.pathMap.base +
						"/cust-doc-defs/cust_doc_code?cust_doc_code=QY134",
					namefield: "name",
					valuefield: "code",
					hasAll: true
				}
			],
			search2: [{
				type: "refer",
				key: "shopId",
				label: "门店",
				refinfo: "shop",
				refName: "门店",
				// required: true,
				clientParam: {
					EQ_isEnable: "1",
				}
			}, {
				type: "text",
				key: "retailOrderCode",
				label: "零售单号",
			}, {
				type: "daterange",
				key: "documentDate",
				label: "零售单日期",
			}]
		},
		buttons: {
			button1: [{
				key: "add",
				label: "新增",
				iconCls: "icon-plus",
				click: "showAddRefer"
			}, {
				key: "submit",
				label: "提交",
				iconCls: "icon-tubiao-shenhe",
				click: "submitBillBpm"
			}, {
				key: "back",
				label: "收回",
				iconCls: "icon-tubiao-shenhe",
				click: "unsubmitBillList"
			}, {
				key: "approve",
				label: "审批",
				iconCls: "icon-tubiao-shenhe",
				click: "approveBill"
			}, {
				key: "unapprove",
				label: "取消审核",
				iconCls: "icon-tubiao-quxiaoshenhe",
				click: "unapproveBill"
			}, {
				key: "remark",
				label: "备注",
				iconCls: "icon-export",
				click: "remarkEvt"
			}],
			button2: [{
				key: "cancel",
				label: "取消",
				click: "cancelBill"
			}, {
				key: "save",
				label: "保存",
				click: "saveBill",
				cls: "ui-btn-green"
			}, {
				key: "matchWarehouse",
				label: "匹配仓库",
				click: "resetdelivery",
			}],
			button3: [{
				key: "return",
				label: "返回",
				click: "retListPanel"
			}, {
				key: "edit",
				label: "编辑",
				click: "detail2bill",
				cls: "ui-btn-green delivery-edit-show"
			}, ],
			buttonDetail: [{
				key: "export",
				label: "行关闭",
				iconCls: "icon-tubiao-guanbi-xianxing",
				click: "close_row"
			}, {
				key: "export",
				label: "行打开",
				iconCls: "icon-tubiao-duigou-xianxing",
				click: "open_row"
			}]
		},
		cards: {
			card1: [{
				type: "text",
				key: "code",
				label: "发货单号",
			}, {
				key: "craetionTime",
				type: "date",
				label: "单据日期"
			}, {
				type: "text",
				key: "buyerName",
				label: "收货人"
			}, {
				type: "text",
				key: "contactInfo1",
				label: "收货人电话"
			}, {
				type: "text",
				key: "deliveryAddress",
				label: "收货地址"
			}, {
				type: "refer",
				key: "deliveryInvOrgId",
				keyfordisplay: "deliveryInvOrgName",
				label: "发货库存组织",
				refinfo: "organization_ocm",
				clientParam: {
					"EQ_orgFuncRel": "03",
					"EQ_isEnable": "1"
				},
			}, {
				type: "refer",
				key: "wareHouseId",
				keyfordisplay: "wareHouseName",
				label: "发货仓库",
				refinfo: "warehouse",
			}, {
				type: "text",
				key: "totalDeliveryNumber",
				label: "总数量"
			}, {
				type: "combo",
				key: "billStatus",
				label: "状态",
				enable: false,
				dataSource: [{
					value: '0',
					name: '保存'
				}, {
					value: '1',
					name: '已提交'
				}, {
					value: '2',
					name: '审批中'
				}, {
					value: '3',
					name: '审批通过'
				}, {
					value: '4',
					name: '审批不通过'
				}],
				namefield: "name",
				valuefield: "code",
			}, ]
		},
		details: {
			detail1: [{
				key: "deliveryOrderCode",
				label: "发货单号"
			}, {
				key: "documentDate",
				type: "date",
				label: "单据日期"
			}, {
				key: "receiver",
				label: "收货人"
			}, {
				key: "receiverTel",
				label: "收货人电话"
			}, {
				key: "orderFullReceiverAddress",
				label: "收货地址"
			}, {
				key: "deliveryInvOrgName",
				label: "发货库存组织",
				// computed: "orderStatus"
			}, {
				key: "totalNetWeight",
				label: "发货仓库"
			}, {
				key: "totalNum",
				label: "总数量"
			}, {
				key: "billStatus",
				label: "状态",
				computed: "orderStatus"
			}, ]
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
						// "renderType": "detailRender"
					}, {
						"field": "buyerName",
						"dataType": "String",
						"title": "收货人"
					}, {
						"field": "contactInfo1",
						"dataType": "String",
						"title": "收货人手机"
					}, {
						"field": "deliveryAddress",
						"dataType": "String",
						"title": "收货人地址"
					}, {
						"field": "totalDeliveryNumber",
						"dataType": "String",
						"title": "总数量"
					}, {
						"field": "bookTime",
						"dataType": "datetime",
						"title": "单据日期",
						"width": "100",
					}, {
						"field": "billStatus",
						"dataType": "String",
						"title": "订单状态",
						"renderType": "billStatusRt"
					}, {
						"field": "creator",
						"dataType": "String",
						"title": "创建人",
					},
					// {
					// 	"field": "platformName",
					// 	"dataType": "String",
					// 	"title": "平台名称"
					// }, {
					// 	"field": "storeName",
					// 	"dataType": "String",
					// 	"title": "店铺名称",
					// }, {
					// 	"field": "buyerId",
					// 	"dataType": "String",
					// 	"title": "买家账户"
					// }, {
					// 	"field": "buyerName",
					// 	"dataType": "String",
					// 	"title": "收货人"
					// }, {
					// 	"field": "contactInfo1",
					// 	"dataType": "String",
					// 	"title": "收货人手机"
					// }, {
					// 	"field": "contactInfo2",
					// 	"dataType": "String",
					// 	"title": "收货人电话"
					// }, {
					// 	"field": "deliveryReceiverProvinceName",
					// 	"dataType": "String",
					// 	"title": "收货省",
					// }, {
					// 	"field": "deliveryReceiverCityName",
					// 	"dataType": "String",
					// 	"title": "收货市"
					// }, {
					// 	"field": "deliveryReceiverDistrictName",
					// 	"dataType": "String",
					// 	"title": "收货区/县"
					// }, {
					// 	"field": "deliveryReceiverTownName",
					// 	"dataType": "String",
					// 	"title": "收货街道/镇"
					// }, {
					// 	"field": "deliveryReceiverAddress",
					// 	"dataType": "String",
					// 	"title": "收货地址"
					// }, {
					// 	"field": "logisticsMode",
					// 	"dataType": "String",
					// 	"title": "物流方式",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "logisticsModeSrc"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "serviceMode",
					// 	"dataType": "String",
					// 	"title": "配送方式",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "deliveryModes"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "sendStatus",
					// 	"dataType": "String",
					// 	"title": "发货状态",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "sendStatusSrc"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "isLock",
					// 	"dataType": "String",
					// 	"title": "冻结标识",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "frozenFlags"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "lockType",
					// 	"dataType": "String",
					// 	"title": "冻结原因"
					// }, {
					// 	"field": "isSynch",
					// 	"dataType": "String",
					// 	"title": "是否同步",
					// 	"renderType": "isSynchRT"
					// }, {
					// 	"field": "isSplit",
					// 	"dataType": "String",
					// 	"title": "是否拆单发货",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "splitDispatchSrc"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "isUrgent",
					// 	"dataType": "String",
					// 	"title": "是否加急",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "urgentSrc"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "logisticsName",
					// 	"dataType": "String",
					// 	"title": "快递公司名称"
					// }, {
					// 	"field": "waybillNo",
					// 	"dataType": "String",
					// 	"title": "快递编号"
					// }, {
					// 	"field": "deliverTime",
					// 	"dataType": "Datetime",
					// 	"title": "发货时间"
					// }, {
					// 	"field": "bookTime",
					// 	"dataType": "Datetime",
					// 	"title": "下单时间"
					// }, {
					// 	"field": "deliveryTime",
					// 	"dataType": "Datetime",
					// 	"title": "要求送货时间"
					// }, {
					// 	"field": "wareHouseName",
					// 	"dataType": "String",
					// 	"title": "仓库名称"
					// }, {
					// 	"field": "isReturn",
					// 	"dataType": "String",
					// 	"title": "是否退货",
					// 	"editOptions": {
					// 		"type": "combo",
					// 		"datasource": "returnSrc"
					// 	},
					// 	"renderType": "comboRender"
					// }, {
					// 	"field": "vnote",
					// 	"dataType": "String",
					// 	"title": "备注"
					// }, 
					{
						"field": "operation",
						"dataType": "String",
						"title": "操作",
						"renderType": "operation",
						"fixed": true,
						"width": "150px"
					},
				]
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
					"field": "urmOrderCode",
					"dataType": "String",
					"title": "零售单号"
				}, {
					"field": "pcode",
					"dataType": "String",
					"title": "外系统单号"
				}, {
					"field": "shopName",
					"dataType": "String",
					"title": "门店"
				}, {
					"field": "pkOrgName",
					"dataType": "String",
					"title": "销售组织"
				}, {
					"field": "productCode",
					"dataType": "String",
					"title": "商品编码"
				}, {
					"field": "productName",
					"dataType": "String",
					"title": "商品名称"
				}, {
					"field": "productVersionId",
					"dataType": "String",
					"title": "版本号"
				}, {
					"field": "deliveryNumber",
					"dataType": "String",
					"title": "本次安排数量"
				}, {
					"field": "outboundsNumber",
					"dataType": "String",
					"title": "累计出库数量"
				}, {
					"field": "expectedArrivalDate",
					"dataType": "Datetime",
					"title": "期望收货时间"
				}, {
					"field": "isGift",
					"dataType": "String",
					"title": "是否赠品",
					"editOptions": {
						"type": "combo",
						"datasource": "isGiftSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "remark",
					"dataType": "String",
					"title": "备注",
				}, {
					"field": "close",
					"dataType": "String",
					"title": "订单关闭",
					"editOptions": {
						"type": "combo",
						"datasource": "isGiftSrc"
					},
					"renderType": "comboRender"
				}, ]
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
			grid4: {
				domid: "grid_refer_item_dom",
				umeta: {
					id: "grid_refer_item",
					data: "referSaleOrderItemsList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true,
					onRowSelected: "referSelectItemHandle",
					onRowUnSelected: "referUnSelectItemHandle"
				},
				columns: [{
					field: "retailOrderCode",
					dataType: "String",
					width: "160px",
					title: "零售单号"
				}, {
					field: "pcode",
					dataType: "String",
					title: "外系统单号"
				}, {
					field: "shopName",
					dataType: "String",
					title: "门店"
				}, {
					field: "pkOrgName",
					dataType: "String",
					title: "销售组织"
				}, {
					field: "receiver",
					dataType: "String",
					title: "收货人",
				}, {
					field: "receiverTel",
					dataType: "String",
					title: "收货人电话",
				}, {
					field: "orderFullReceiverAddress",
					dataType: "String",
					title: "收货人地址",
				}, {
					field: "goodsId",
					dataType: "String",
					title: "商品编码",
				}, {
					field: "skuName",
					dataType: "String",
					title: "商品名称",
				}, {
					field: "goodsVersionId",
					dataType: "String",
					title: "商品版本号",
				}, {
					field: "orderNum",
					dataType: "String",
					title: "订货数量"
				}, {
					field: "alreadyProductDeliveryNum",
					dataType: "String",
					title: "已安排数量",
				}, {
					field: "readyProductDeliveryNum",
					dataType: "String",
					title: "待安排发货数量"
				}, {
					field: "stockOnHandNum",
					dataType: "String",
					title: "现存量"
				}, {
					field: "deliveryTime",
					dataType: "Date",
					title: "期望收货时间"
				}, {
					field: "deliveryInvOrgName",
					dataType: "String",
					title: "发货库存组织"
				}, {
					field: "transTypeName",
					dataType: "String",
					title: "订单交易类型"
				}, {
					field: "remark",
					dataType: "String",
					title: "备注",
				}]
			},
			grid5: {
				domid: "grid_referListItem_saleorder_dom",
				umeta: {
					id: "grid_referListItem_saleorder",
					data: "selectedreferListItems",
					type: "grid",
					editable: false,
					showNumCol: true,
					// onBeforeEditFun: "beforeEditCheck2"
				},
				columns: [{
					field: "retailOrderCode",
					dataType: "String",
					width: "160px",
					title: "零售单号"
				}, {
					field: "pcode",
					dataType: "String",
					title: "外系统单号"
				}, {
					field: "shopName",
					dataType: "String",
					title: "门店"
				}, {
					field: "pkOrgName",
					dataType: "String",
					title: "销售组织"
				}, {
					field: "receiver",
					dataType: "String",
					title: "收货人",
				}, {
					field: "receiverTel",
					dataType: "String",
					title: "收货人电话",
				}, {
					field: "orderFullReceiverAddress",
					dataType: "String",
					title: "收货人地址",
				}, {
					field: "goodsId",
					dataType: "String",
					title: "商品编码",
				}, {
					field: "skuName",
					dataType: "String",
					title: "商品名称",
				}, {
					field: "goodsVersionId",
					dataType: "String",
					title: "商品版本号",
				}, {
					field: "orderNum",
					dataType: "String",
					title: "订货数量"
				}, {
					field: "alreadyProductDeliveryNum",
					dataType: "String",
					title: "已安排数量",
				}, {
					field: "readyProductDeliveryNum",
					dataType: "String",
					title: "待安排发货数量"
				}, {
					field: "stockOnHandNum",
					dataType: "String",
					title: "现存量"
				}, {
					field: "deliveryTime",
					dataType: "Date",
					title: "期望收货时间"
				}, {
					field: "deliveryInvOrgName",
					dataType: "String",
					title: "发货库存组织"
				}, {
					field: "transTypeName",
					dataType: "String",
					title: "订单交易类型"
				}, {
					field: "remark",
					dataType: "String",
					title: "备注",
				}]
			},
			grid6: {
				domid: "orderProductsEdit_dom",
				umeta: {
					"id": "orderProductsEdit",
					"data": "OrderProducts",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
					"field": "urmOrderCode",
					"dataType": "String",
					"title": "零售单号",
					"editable": false,
				}, {
					"field": "pcode",
					"dataType": "String",
					"title": "外系统单号",
					"editable": false,
				}, {
					"field": "shopId",
					"dataType": "String",
					"title": "门店",
					"editable": false,
				}, {
					"field": "pkOrgName",
					"dataType": "String",
					"title": "销售组织",
					"editable": false,
				}, {
					"field": "productCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "productName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "productVersionId",
					"dataType": "String",
					"title": "版本号",
					"editable": false,
				}, {
					"field": "deliveryNumber",
					"dataType": "String",
					"title": "本次安排数量",
				}, {
					"field": "outboundsNumber",
					"dataType": "String",
					"title": "累计出库数量",
					"editable": false,
				}, {
					"field": "expectedArrivalDate",
					"dataType": "Datetime",
					"editable": false,
					"title": "期望收货时间"
				}, {
					"field": "isGift",
					"dataType": "String",
					"title": "是否赠品",
					"editOptions": {
						"type": "combo",
						"datasource": "isGiftSrc"
					},
					"renderType": "comboRender",
					"editable": false,
				}, {
					"field": "remark",
					"dataType": "String",
					"title": "备注",
				}, {
					"field": "close",
					"dataType": "String",
					"title": "订单关闭",
					"editOptions": {
						"type": "combo",
						"datasource": "isGiftSrc"
					},
					"renderType": "comboRender"
				}]
			},
			grid7: {
				domid: "orderItemBoms_dom",
				umeta: {
					"id": "orderItemBoms",
					"data": "deliveryOrderItemBomsList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": false
				},
				columns: [{
					"field": "parentGoodsName",
					"dataType": "String",
					"title": "母件商品名称"
				}, {
					"field": "childGoodsCode",
					"dataType": "String",
					"title": "子件商品编码"
				}, {
					"field": "childGoodsName",
					"dataType": "String",
					"title": "子件商品名称"
				}, {
					"field": "productVersionId",
					"dataType": "String",
					"title": "商品版本"
				}, {
					"field": "orderNumUnitName",
					"dataType": "String",
					"title": "单位"
				}, {
					"field": "deliveryNumber",
					"dataType": "String",
					"title": "发货安排数量"
				}, {
					"field": "outboundsNumber",
					"dataType": "String",
					"title": "累计出库数量"
				}, {
					"field": "isGift",
					"dataType": "String",
					"title": "赠品",
					"editOptions": {
						"type": "combo",
						"datasource": "isGiftSrc"
					},
					"renderType": "comboRender"
				}]
			},
		}
	}
	return new basemodel(model);
})