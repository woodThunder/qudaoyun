define(["ocm_basemodel"], function (basemodel) {
	var returnOrderItemsMeta = {
		id: {
			type: "string"
		},
		saleOrderId: {
			type: "string"
		}, // 销售订单主键
		saleOrderCode: {
			type: "string"
		}, // 销售订单编码
		// 客户
		customerId: {
			type: "string",
			required: true,
			refmodel: JSON.stringify(refinfo["customer"]),
			refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
			refparam: '{"EQ_isEnable":"1"}'
		},
		// 客户编码
		customerCode: {
			type: "string"
		},
		// 客户名称
		customerName: {
			type: "string"
		},
		// 商品id
		goodsId: {
			type: "string"
		},
		// 商品编码
		goodsCode: {
			type: "string"
		},
		// 商品名称
		goodsName: {
			type: "string"
		},
		// 本次安排数量
		orderNum: {
			type: "numberFloat"
		},
		// 本次安排主数量
		mainNum: {
			type: "numberFloat"
		},
		// 换算率
		conversionRate: {
			type: "string"
		},
		// 成交价
		dealPrice: {
			type: "priceFloat"
		},
		// 单价
		salePrice: {
			type: "priceFloat"
		},
		// 重量
		weight: {
			type: "string"
		},
		// 体积
		volume: {
			type: "string"
		},
		// 金额
		amountMoney: {
			type: "amountFloat"
		},
		planDeliveryDate: {
			type: "string"
		}, //计划发货日期
		deliveryInvOrgId: {
			type: "string",
			required: true,
			refmodel: JSON.stringify(refinfo["organization_ocm"]),
			refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
			refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
		},
		deliveryInvOrgName: {
			type: "string"
		},
		deliveryInvOrgCode: {
			type: "string"
		}, // 发货库存组织
		deliveryWarehouseId: {
			type: "string",
			required: true,
			refmodel: JSON.stringify(refinfo["channel-warehouse"]),
			refcfg: '{"ctx":"/uitemplate_web"}',
			refparam: "{}"
		}, //发货仓库
		deliveryWarehouseName: {
			type: "string"
		},
		deliveryWarehouseCode: {
			type: "string"
		},
		receiverAddress: {
			type: "string"
		}, // 收货地址
		receiver: {
			type: "string"
		}, // 收货联系人
		receiverPhone: {
			type: "string"
		}, // 收货联系电话
		remark: {
			type: "string"
		}, // 备注
		isGift: {
			type: "string"
		} // 赠品
	};
	var model = {
		metas: {
			complex: {
				meta: {
					id: {
						type: "string"
					},
					pkOrgId: {
						type: "string",
						// required: true,
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
						refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
					},
					pkOrgCode: {
						type: "string"
					},
					pkOrgName: {
						type: "string"
					},
					ifSlotManage: {
						type: 'string'
					},
					//交易类型
					tranTypeId: {
						type: 'string',
						// required:true,
						'refmodel': JSON.stringify(refinfo['trantype']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
					},
					tranTypeCode: {
						type: 'string'
					},
					tranTypeName: {
						type: 'string'
					},
					// 单据编码
					billCode: {
						type: "string"
					},
					// 单据日期
					billDate: {
						type: "date"
					},
					// 单据类型
					billType: {
						type: "string",
					},
					//入库类型
					billTranTypeId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["trantype"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"出入库类型"}',
						refparam: '{"EQ_billTypeId":"ReturnIn"}'
					},
					billTranTypeCode: {
						type: "string"
					},
					billTranTypeName: {
						type: "string"
					},
					// 仓库
					storehouseId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["channel-warehouse"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
						refparam: '{"EQ_isEnable":"1"}'
					},
					storehouseCode: {
						type: "string"
					},
					storehouseName: {
						type: "string"
					},
					// 库管员
					storekeeperId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["person"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
						refparam: '{"EQ_isEnable":"1"}'
					},
					storekeeperCode: {
						type: "string"
					},
					storekeeperName: {
						type: "string"
					},
					// 客户
					customerId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["customers"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
						refparam: '{"EQ_isEnable":"1"}'
					},
					// 客户编码
					customerCode: {
						type: "string"
					},
					// 客户名称
					customerName: {
						type: "string"
					},
					// 业务人员
					bizId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["person"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
						refparam: '{"EQ_isEnable":"1"}'
					},
					bizCode: {
						type: "string"
					},
					bizName: {
						type: "string"
					},
					// 部门
					deptId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["department"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
						refparam: '{"EQ_isEnable":"1"}'
					},
					deptCode: {
						type: "string"
					},
					deptName: {
						type: "string"
					},
					// 单据状态
					billStatusId: {
						type: "string"
					},
					billStatusCode: {
						type: "string"
					},
					billStatusName: {
						type: "string"
					},
					//总应入数量
					totalShouldOutNum: {
						type: "numberFloat",
						precision: 2,
						required: true
					},

					//总实入数量
					totalFactOutNum: {
						type: "numberFloat",
						precision: 2,
						required: true
					},
					//订单客户
					billCustomerId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["customer"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"客户"}',
					},
					billCustomerCode: {
						type: "string"
					},
					billCustomerName: {
						type: "string"
					},

					// 订单归属
					ascription: {
						type: "string"
					},
					//指定物流公司
					designatedLogisticsId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['logistics-company']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}',
					},
					designatedLogisticsCode: {
						type: "string"
					},
					designatedLogisticsName: {
						type: "string"
					},
					//实发物流公司
					realLogisticsCompanyId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['logistics-company']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}',
					},
					realLogisticsCompanyCode: {
						type: "string"
					},
					realLogisticsCompanyName: {
						type: "string"
					},
					// 物流单号
					logisticsBillCode: {
						type: "string"
					},
					// 拦截状态
					interceptingState: {
						type: "integer"
					},
					// 拦截失败原因
					interceptingReason: {
						type: "string"
					},
					// 退货原因
					returnReasonId: {
						type: "string"
					},
					returnReasonCode: {
						type: "string"
					},
					returnReasonName: {
						type: "string"
					},
					// 签字人
					siger: {
						type: "string"
					},
					// 签字时间
					signTime: {
						type: "datetime"
						// 备注
					},
					note: {
						type: "string"
					}
				},
				pageSize: 10
				//是否启用前端缓存
				// pageCache: true
			},
			complexItem: {
				meta: {
					id: {
						type: "string"
					},
					// 行号
					rowNum: {
						type: "integer"
					},
					// 库存商品id
					goodsId: {
						type: "string"
					},
					// 库存商品编码
					goodsCode: {
						type: "string"
					},
					// 库存商品名称
					goodsName: {
						type: "string"
					},
					goodsFullName: {
						type: "string"
					},
					goodsBasicUnitName: {
						type: "string"
					},
					goodsAssistUnitName: {
						type: "string"
					},
					goodsConversionRate: {
						type: "integer"
					},
					enableBatchNumberManage: {
						type: 'string'
					},
					// 应收数量
					shouldOutNum: {
						type: "numberFloat"
					},
					// 实出数量
					factOutNum: {
						type: "numberFloat"
					},
					// 单价
					unitPrice: {
						type: "priceFloat"
					},
					// 金额
					amountMoney: {
						type: "amountFloat"
					},
					// 是否赠品
					isGift: {
						type: "string"
					},
					// 备注
					remark: {
						type: "string"
					},
					// 出库日期
					outDate: {
						type: "date"
					},
					// 出库人
					outerCode: {
						type: "string",
						refmodel: JSON.stringify(refinfo["person"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"出库员"}'
					},
					// 批次号
					batchNumId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['batchNumber']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
					},
					batchNumCode: {
						type: 'string'
					},
					batchNumName: {
						type: 'string'
					},
					// 货位
					goodsPositionId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['goodsposition']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
					},
					goodsPositionCode: {
						type: 'string'
					},
					goodsPositionName: {
						type: 'string'
					},
					// 收货地址
					receiverAddress: {
						type: "string"
					},
					//详细地址
					detailAddr: {
						type: "string"
					},
					//收货联系人
					receiver: {
						type: "string"
					},
					//收货联系电话
					receiverPhone: {
						type: "string"
					},
					//收货联系电话（备用）
					receiverPhoneSpare: {
						type: "string"
					},
					//重量
					weight: {
						type: "string"
					},
					//体积
					volume: {
						type: "string"
					},
					//计划发货日期
					planDeliveryDate: {
						type: "date"
					},
					//计划到货日期
					arrivalDate: {
						type: "date"
					},
					// 源头单据号
					firstBillCode: {
						type: "string"
					},
					// 源头单据行号
					firstBillBcode: {
						type: "string"
					},
					// 源头单据类型
					firstBillType: {
						type: "string"
					},
					// 来源单据号
					srcBillCode: {
						type: "string"
					},
					// 来源单据行号
					srcBillBcode: {
						type: "string"
					},
					// 来源单据类型
					srcBillType: {
						type: "string"
					},
					unitId: {
						type: "string"
					},
					unitName: {
						type: "string"
					},
					unitCode: {
						type: "string"
					},
					note: {
						type: "string"
					},
					amountMoney: {
						type: "amountFloat"
					},
					unitPrice: {
						type: "priceFloat"
					},
				},
				pageSize: 10
			},
			ItemRef: {
				meta: {
					goodsref: {
						type: "string",
						refmodel: JSON.stringify(refinfo["goods"]),
						refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
						refparam: '{"EQ_isEnable":"1"}'
					}
				}
			},
			return: {
				meta: {
					id: {
						type: "string"
					},
					// 销售组织
					saleOrgId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
						refparam: '{"EQ_orgFuncRel": "01"}'
					},
					// 销售组织编码
					saleOrgCode: {
						type: "string"
					},
					// 销售组织名称
					saleOrgName: {
						type: "string"
					},
					OrderCode: {
						type: "string"
					}, // 退货单号
					deliveryOperater: {
						type: "string"
					}, //发货安排人
					deliveryOrderDate: {
						type: "data"
					}, //发货日期
					totalNum: {
						type: "numberFloat",
						precision: 2
					}, // 总数量
					totalAmount: {
						type: "amountFloat",
					}, // 总金额
					orderStatus: {
						type: "string"
					}, // 单据状态
					orderStatusCode: {
						type: "string"
					},
					orderStatusName: {
						type: "string"
					},
					selectitemIds: {
						type: "string"
					},
					orderItems: returnOrderItemsMeta
				},
				pageSize: 10
				//是否启用前端缓存
				// pageCache: true
			},
			returnItems: {
				meta: returnOrderItemsMeta,
				pageSize: 10
			}
		},
		searchs: {
			search1: [{
					type: "text",
					key: "billCode",
					label: "入库单号"
				},
				{
					type: "daterange",
					key: "billDate",
					label: "单据日期"
				},
				{
					type: "refer",
					key: "pkOrg",
					label: "库存组织",
					refinfo: "organization_ocm",
					clientParam: {
						"EQ_orgFuncRel": "03"
					}
				},
				{
					type: "refer",
					key: "storehouse",
					label: "入库仓库",
					refinfo: "channel-warehouse",
					domid: "storehouse",
				},
				{
					type: "refer",
					key: "billCustomer",
					label: "客户",
					refinfo: "customer"
				},
				{
					type: "refer",
					key: "biz",
					label: "业务员",
					refinfo: "person"
				},
				{
					type: "refer",
					key: "dept",
					label: "部门",
					refinfo: "department"
				},
				{
					type: "refer",
					key: "saleOutOrderItems--goods",
					label: "库存商品",
					refinfo: "goods"
				},
				{
					type: "combo",
					key: "billStatus",
					label: "单据状态",
					url: window.pathMap.base +
						"/cust-doc-defs/cust_doc_code?cust_doc_code=QY106",
					namefield: "name",
					valuefield: "code",
					hasAll: true
				}
			],
			search2: [{
					type: "refer",
					key: "saleOrg",
					label: "销售组织",
					refinfo: "organization_ocm",
					clientParam: {
						"EQ_orgFuncRel": "01"
					},
					domid: "orgId"
				},
				{
					type: "refer",
					key: "customer",
					label: "客户",
					refinfo: "customers",
					domid: "customerId"
				},
				{
					type: "combo",
					key: "billStatus",
					label: "退货状态",
					dataSource: [{
						value: '',
						name: '全部'
					}, {
						value: '0',
						name: '部分退货'
					}, {
						value: '1',
						name: '全部退货'
					}]
				}
			]
		},
		buttons: {
			button1: [{
					key: "add",
					label: "新增",
					iconCls: "icon-plus",
					click: "showAddRefer"
				},
				{
					key: "del",
					label: "删除",
					iconCls: "icon-shanchu1",
					click: "del"
				},
				{
					key: "sign",
					label: "签字",
					iconCls: "icon-edit",
					click: "sign"
				},
				{
					key: "cancelsign",
					label: "取消签字",
					iconCls: "icon-tubiao-quxiaoshenhe",
					click: "cancelsign"
				},
				// {
				//   key: "cancelsign",
				//   label: "录入拦截结果",
				//   iconCls: "icon-tubiao-quxiaoshenhe",
				//   click: "showHoldResult"
				// },
				// {
				//   key: "cancelsign",
				//   label: "录入物流单号",
				//   iconCls: "icon-tubiao-quxiaoshenhe",
				//   click: "showLogistics"
				// }
				// {
				//   key: "import",
				//   label: "导入",
				//   iconCls: "icon-import",
				//   click: "importHandle"
				// },
				// {
				//   key: "export",
				//   label: "导出",
				//   iconCls: "icon-export",
				//   click: "exportHandle"
				// },
			],
			button2: [{
					key: "cancel",
					label: "取消",
					click: "retListPanel"
				},
				{
					key: "save",
					label: "保存",
					click: "saveBill",
					cls: "ui-btn-green"
				}
			],
			button3: [{
					key: "addrow",
					label: "增行",
					iconCls: "icon-plus",
					click: "showAddItemsRef"
				},
				{
					key: "delrow",
					label: "删行",
					iconCls: "icon-shanchu1",
					click: "delItems"
				}
			],
			button4: [{
					key: "return",
					label: "返回",
					click: "retListPanel"
				},
				{
					key: "edit",
					label: "编辑",
					click: "detail2bill",
					cls: "ui-btn-green",
					visible: "canEdit"
				}
			]
		},
		dialogs: {
			dialog1: [{
					type: "refer",
					key: "logisticsId",
					label: "物流公司",
					refinfo: "logistics-company"
				},
				{
					type: "text",
					key: "logisticsBillCode",
					label: "物流单号"
				}
			],
			dialog2: [{
					type: "combo",
					key: "interceptingState",
					label: "拦截状态",
					dataSource: [{
							name: "拦截成功",
							value: 1
						},
						{
							name: "拦截失败",
							value: 0
						}
					]
				},
				{
					type: "textarea",
					key: "interceptingReason",
					label: "失败原因",
					cls: "ui-textarea-item"
				}
			]
		},
		cards: {
			//b2b
			card1: [{
					type: "text",
					key: "orderCode",
					label: "入库单号",
					enable: false
				},
				{
					type: "date",
					key: "billDate",
					label: "单据日期",
				},
				{
					type: "refer",
					key: "storehouseId",
					label: "入库仓库",
					domid: "storehouseDomId",
					referId: "storehouseRef",
				},
				{
					type: "refer",
					key: "bizId",
					label: "业务员"
				},
				{
					type: "refer",
					key: "deptId",
					label: "部门"
				},
				{
					type: "refer",
					key: "billCustomerId",
					label: "订单客户"
				},
				{
					type: "refer",
					key: "storekeeperId",
					label: "库管员"
				},
				{
					type: "date",
					key: "planDeliveryDate",
					label: "计划到货日期"
				},
				{
					type: "text",
					key: "totalShouldOutNum",
					label: "总应入数量",
					enable: false
				},
				{
					type: "text",
					key: "totalFactOutNum",
					label: "总实入数量",
					enable: false
				},
				{
					type: "textarea",
					key: "note",
					label: "备注",
					cls: "ui-textarea-item"
				}
			],
			//b2c
			card2: [{
					type: "textreadonly",
					key: "billCode",
					label: "入库单号",
				},
				{
					type: "date",
					key: "billDate",
					label: "单据日期",
				},
				{
					type: "refer",
					key: "storehouseId",
					label: "入库仓库"
				},
				{
					type: "date",
					key: "planDeliveryDate",
					label: "计划到货日期"
				},
				{
					type: "textreadonly",
					key: "totalShouldOutNum",
					label: "总应入数量"
				},
				{
					type: "textreadonly",
					key: "totalFactOutNum",
					label: "总实入数量"
				},
				{
					type: "refer",
					key: "designatedLogisticsId",
					label: "物流公司",
				},
				{
					type: "text",
					key: "logisticsBillCode",
					label: "物流单号"
				},
				{
					type: "text",
					key: "returnReasonName",
					label: "退货原因"
				},
				{
					type: "textarea",
					key: "note",
					label: "备注",
					cls: "ui-textarea-item"
				}
			]
		},
		details: {
			//b2b
			detail1: [{
					key: "billCode",
					label: "入库单号",
				},
				{
					key: "orderDate",
					label: "单据日期",
					computed: "billDateComputed",
				},
				{
					key: "storehouseName",
					label: "入库仓库"
				},
				{
					key: "bizName",
					label: "业务员"
				},
				{
					key: "deptName",
					label: "部门"
				},
				{
					key: "billCustomerName",
					label: "订单客户"
				},
				{
					key: "storekeeperName",
					label: "库管员"
				},
				{
					key: "planDeliveryDate",
					label: "计划到货日期"
				},
				{
					key: "totalShouldOutNum",
					label: "总应入数量"
				},
				{
					key: "totalFactOutNum",
					label: "总实入数量"
				},
				{
					key: "note",
					label: "备注",
					cls: "ui-textarea-item"
				}
			],
			//b2c
			detail2: [{
					key: "billCode",
					label: "入库单号",
				},
				{
					key: "billDate",
					label: "单据日期",
					computed: "billDateComputed",
				},
				{
					key: "storehouseName",
					label: "入库仓库"
				},
				{
					key: "planDeliveryDate",
					label: "计划到货日期"
				},
				{
					key: "totalShouldOutNum",
					label: "总应入数量"
				},
				{
					key: "totalFactOutNum",
					label: "总实入数量"
				},
				{
					key: "designatedLogisticsName",
					label: "物流公司",
				},
				{
					key: "logisticsBillCode",
					label: "物流单号"
				},
				{
					key: "returnReasonName",
					label: "退货原因"
				},
				{
					key: "note",
					label: "备注",
					cls: "ui-textarea-item"
				}
			]
		},
		grids: {
			grid1: {
				domid: "grid_complex_dom",
				umeta: {
					id: "grid_complex",
					data: "returninList",
					type: "grid",
					editable: false,
					multiSelect: true
				},
				columns: [{
						field: "billCode",
						dataType: "String",
						title: "入库单号",
						renderType: "detailRender"
					},
					// {
					//   field: "billType",
					//   dataType: "String",
					//   title: "单据类型编码",
					//   visible: false
					// },
					// {
					//   field: "billTranTypeCode",
					//   dataType: "String",
					//   title: "单据类型编码",
					//   visible: false
					// },
					// {
					//   field: "billTranTypeName",
					//   dataType: "String",
					//   title: "出库类型"
					// },
					{
						field: "billDate",
						dataType: "Date",
						title: "单据日期"
					},
					{
						field: "billTranTypeName",
						dataType: "String",
						title: "交易类型",
					},
					{
						field: "storehouseName",
						dataType: "String",
						title: "仓库"
					},
					// {
					//   field: "storehouseCode",
					//   dataType: "String",
					//   title: "出库仓库编码",
					//   visible: false
					// },

					// {
					//   field: "bizCode",
					//   dataType: "String",
					//   title: "销售员编码",
					//   visible: false
					// },
					{
						field: "bizName",
						dataType: "String",
						title: "业务员"
					},
					// {
					//   field: "deptCode",
					//   dataType: "String",
					//   title: "销售部门编码",
					//   visible: false
					// },
					{
						field: "deptName",
						dataType: "String",
						title: "部门"
					},
					{
						field: "storekeeperCode",
						dataType: "String",
						title: "库管员编码",
						visible: false
					},
					{
						field: "storekeeperName",
						dataType: "String",
						title: "库管员"
					},
					{
						field: "billStatusName",
						dataType: "String",
						title: "单据状态"
					},
					{
						field: "siger",
						dataType: "String",
						title: "签字人",
						visible: false
					},
					{
						field: "signTime",
						dataType: "String",
						title: "签字时间",
						visible: false
					},
					// {
					//   field: "note",
					//   dataType: "String",
					//   title: "备注",
					//   visible: false
					// },
					// {
					//   field: "interceptingState",
					//   dataType: "String",
					//   title: "拦截状态",
					//   renderType: "interceptingStateRender",
					//   visible: false
					// },
					// {
					//   field: "interceptingReason",
					//   dataType: "String",
					//   title: "拦截失败原因",
					//   visible: false
					// },
					//
					// {
					//   field: "logisticsBillCode",
					//   dataType: "String",
					//   title: "物流单号",
					//   visible: false
					// },
					// {
					//   field: "designatedLogisticsCode",
					//   dataType: "String",
					//   title: "指定物流公司编码",
					//   visible: false
					// },
					// {
					//   field: "designatedLogisticsName",
					//   dataType: "String",
					//   title: "指定物流公司",
					//   visible: false
					// },
					// {
					//   field: "designatedLogisticsCode",
					//   dataType: "String",
					//   title: "实发物流公司编码",
					//   visible: false
					// },
					// {
					//   field: "designatedLogisticsName",
					//   dataType: "String",
					//   title: "实发物流公司",
					//   visible: false
					// },
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						visible: false
					},
					{
						field: "billStatusCode",
						dataType: "String",
						title: "操作",
						renderType: "operation",
						fixed: true,
						width: "100px"
					}
				]
			},
			grid2: {
				domid: "grid_salereturnin2",
				umeta: {
					id: "grid_complex_edit",
					data: "returninItems",
					type: "grid",
					editable: true,
					multiSelect: true,
					onBeforeEditFun: "beforeEditCheck"
				},
				columns: [{
						field: "rowNum",
						title: "行号",
						dataType: "Integer",
						editable: false
					},
					{
						field: "goodsCode",
						dataType: "String",
						title: "商品编码",
						editable: false
					},
					{
						field: "goodsName",
						dataType: "String",
						title: "商品名称",
						editable: false
					},
					{
						field: "shouldOutNum",
						dataType: "String",
						title: "应入数量",
						editable: false
					},
					{
						field: "factOutNum",
						dataType: "String",
						title: "实入数量"
					},
					{
						field: "goodsBasicUnitName",
						dataType: "String",
						title: "单位",
						editable: false
					},
					{
						field: "unitPrice",
						dataType: "String",
						title: "单价",
						editable: false
					},
					{
						field: "amountMoney",
						dataType: "String",
						title: "金额",
						editable: false
					},
					// {
					//   field: "goodsPositionId",
					//   dataType: "String",
					//   title: "货位",
					//   renderType: "ncReferRender",
					//   editType: "ncReferEditType",
					//   showField: "goodsPositionName",
					//   editOptions: {
					//     "validType": "string"
					//   }
					// },
					{
						field: "isGift",
						dataType: "Integer",
						title: "赠品",
						renderType: "whetherRender",
						editable: false
					},
					{
						field: "note",
						dataType: "String",
						title: "备注"
					},
					{
						field: "planDeliveryDate",
						dataType: "date",
						title: "计划到货日期",
						editType: "date",
						editable: false
					},
					{
						field: "outerName",
						dataType: "String",
						title: "入库人",
						editable: false,
						visible: false
					},
					{
						field: "outDate",
						dataType: "DateTime",
						title: "入库时间",
						editable: false,
						visible: false
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						visible: false
					},
				]
			},
			grid3: {
				domid: "grid_salereturnin3",
				umeta: {
					id: "grid_complex_detail",
					data: "returninItems",
					type: "grid",
					editable: false,
					multiSelect: false
				},
				columns: [{
						field: "rowNum",
						title: "行号",
						dataType: "Integer",
					},
					{
						field: "goodsCode",
						dataType: "String",
						title: "商品编码",
					},
					{
						field: "goodsName",
						dataType: "String",
						title: "商品名称",
					},
					{
						field: "shouldOutNum",
						dataType: "String",
						title: "应入数量",
					},
					{
						field: "factOutNum",
						dataType: "String",
						title: "实入数量"
					},
					{
						field: "goodsBasicUnitName",
						dataType: "String",
						title: "单位",
					},
					{
						field: "unitPrice",
						dataType: "String",
						title: "单价",
					},
					{
						field: "amountMoney",
						dataType: "String",
						title: "金额",
					},
					// {
					//   field: "batchCode",
					//   dataType: "String",
					//   title: "批次号",
					// },
					// {
					//   field: "cargoPosition",
					//   dataType: "String",
					//   title: "货位",
					// },
					{
						field: "isGift",
						dataType: "Integer",
						title: "赠品",
						renderType: "whetherRender",
					},
					{
						field: "note",
						dataType: "String",
						title: "备注"
					},
					{
						field: "planDeliveryDate",
						dataType: "date",
						title: "计划到货日期",
						editType: "date",
					},
					{
						field: "outerName",
						dataType: "String",
						title: "入库人",
						visible: false
					},
					{
						field: "outDate",
						dataType: "DateTime",
						title: "入库时间",
						visible: false
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						visible: false
					},
				]
			},
			grid4: {
				domid: "grid_salereturnin4",
				umeta: {
					id: "grid_referList",
					data: "referReturnorderList",
					type: "grid",
					editable: false,
					multiSelect: true,
					onRowSelected: "referSelectHandle",
					onRowUnSelected: "referUnSelectHandle",
				},
				columns: [{
						field: "saleOrgName",
						dataType: "String",
						title: "销售组织"
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户"
					},
					{
						field: "orderCode",
						dataType: "String",
						title: "退货单号"
					},
					{
						field: "orderDate",
						dataType: "Date",
						title: "退货单日期"
					},
					{
						field: "totalNum",
						dataType: "String",
						title: "总数量"
					},
					{
						field: "totalDealAmount",
						dataType: "String",
						title: "总金额"
					},
					{
						field: "orderStatusName",
						dataType: "String",
						title: "订单状态"
					}
				]
			},
			grid5: {
				domid: "grid_salereturnin5",
				umeta: {
					id: "grid_referListItem",
					data: "referReturnorderitemList",
					type: "grid",
					editable: false,
					multiSelect: true,
					"onRowSelected": "referSelectItemHandle",
					"onRowUnSelected": "referUnSelectItemHandle",
				},
				columns: [{
						field: "goodsCode",
						dataType: "String",
						title: "商品编码"
					},
					{
						field: "goodsName",
						dataType: "String",
						title: "商品名称"
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "退货量"
					},
					{
						field: "salePrice",
						dataType: "String",
						title: "单价"
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "成交价",
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "退货金额"
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						renderType: "disableBooleanRender"
					},
					{
						field: "returnReasonName",
						dataType: "String",
						title: "退货原因"
					},
					{
						field: "deliveryWarehouseName",
						dataType: "String",
						title: "收货仓库"
					},
					{
						field: "remark",
						dataType: "String",
						title: "备注"
					},
				]
			},
			grid6: {
				domid: "grid_salereturnin6",
				umeta: {
					id: "grid_referList_Sel",
					data: "selectedreferList",
					type: "grid",
					showNumCol: true,
					editable: false
				},
				columns: [{
						field: "saleOrgName",
						dataType: "String",
						title: "销售组织"
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户"
					},
					{
						field: "orderCode",
						dataType: "String",
						title: "退货单号"
					},
					{
						field: "orderDate",
						dataType: "Date",
						title: "退货单日期"
					},
					{
						field: "totalNum",
						dataType: "String",
						title: "总数量"
					},
					{
						field: "totalDealAmount",
						dataType: "String",
						title: "总金额"
					},
					{
						field: "orderStatusName",
						dataType: "String",
						title: "订单状态"
					}
				]
			},
			grid7: {
				domid: "grid_salereturnin7",
				umeta: {
					id: "grid_referListItem_Sel",
					data: "selectedreferListItem",
					type: "grid",
					editable: false,
					showNumCol: true
				},
				columns: [{
						field: "goodsCode",
						dataType: "String",
						title: "商品编码"
					},
					{
						field: "goodsName",
						dataType: "String",
						title: "商品名称"
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "退货量"
					},
					{
						field: "amount",
						dataType: "String",
						title: "单价"
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "成交价",
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "退货金额"
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						renderType: "disableBooleanRender"
					},
					{
						field: "returnReasonName",
						dataType: "String",
						title: "退货原因"
					},
					{
						field: "deliveryWarehouseName",
						dataType: "String",
						title: "收货仓库"
					},
					{
						field: "remark",
						dataType: "String",
						title: "备注"
					},
				]
			}
		}
	};
	return new basemodel(model);
});