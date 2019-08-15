define(["ocm_basemodel"], function (basemodel) {
	var OrderItemsMeta = {
		id: {
			type: "string"
		},
		rowNum: {
			type: "string"
		}, //行号
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
		mainNum: {
			type: "numberFloat"
		},
		// 订货数量
		orderNum: {
			type: "numberFloat"
		},

		//主数量单位
		mainNumUnitId: {
			type: "string"
		},
		mainNumUnitCode: {
			type: "String"
		},

		mainNumUnitName: {
			type: "String"
		},
		// 成交价
		dealPrice: {
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
		// 成交金额
		dealAmount: {
			type: "amountFloat"
		},
		planDeliveryDate: {
			type: "date",
		},
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
		remark: {
			type: "string"
		}, // 备注
		isGift: {
			type: "string"
		}, // 赠品
		basePrice: {
			type: "priceFloat"
		} // 单价

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
						default: "SaleOut"
					},
					//出库类型
					billTranTypeId: {
						type: "string",
						required: true,
						default: "SaleOut",
						refmodel: JSON.stringify(refinfo["trantype"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"出库类型"}',
						refparam: '{"EQ_billTypeId":"SaleOut"}'
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
					//总应出数量
					totalShouldOutNum: {
						type: "numberFloat",
						precision: 2,
						required: true
					},

					//总实出数量
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
						refparam: '{"EQ_isEnable":"1"}'
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
						type: "string"
					},
					designatedLogisticsCode: {
						type: "string"
					},
					designatedLogisticsName: {
						type: "string"
					},
					//实发物流公司
					realLogisticsCompanyId: {
						type: "string"
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
					signNum: {
						type: "numberFloat"
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
					// 应收数量
					shouldOutNum: {
						type: "numberFloat"
					},
					// 实出数量
					factOutNum: {
						type: "numberFloat"
					},
					// 单价
					price: {
						type: "priceFloat"
					},
					// 金额
					amount: {
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
					//TODO  批次号没有  货位没有
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
					bnote: {
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
			order: {
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
					// 订单类型
					orderTypeId: {
						type: "string",
						required: true,
					},
					// 订单类型编码
					orderTypeCode: {
						type: "string"
					},
					// 订单类型名称
					orderTypeName: {
						type: "string"
					},
					orderCode: {
						type: "string"
					}, // 订单编号
					orderDate: {
						type: "data"
					}, //订单日期
					totalNum: {
						type: "amountFloat"
					}, // 总数量
					totalAmount: {
						type: "amountFloat"
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
					orderItems: OrderItemsMeta
				},
				pageSize: 10
				//是否启用前端缓存
				// pageCache: true
			},
			orderItems: {
				meta: OrderItemsMeta,
				pageSize: 10
			},
			operateArea: {
				meta: {
					oneStepSaleout: {
						type: 'string',
						default: 1
					},
					StorageId: {
						type: 'string',
						refmodel: JSON.stringify(refinfo['channel-warehouse']),
						refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
					},
					StorageCode: {
						type: 'string'
					},
					StorageName: {
						type: 'string'
					},
				},
			}

		},
		searchs: {
			search1: [{
				type: "refer",
				key: "billCustomer",
				label: "客户",
				refinfo: "customer",
			}, {
				type: "daterange",
				key: "billDate",
				label: "单据日期"
			}, {
				type: "refer",
				key: "storehouse",
				label: "仓库",
				refinfo: "channel-warehouse"
			}, {
				type: "text",
				key: "billCode",
				label: "入库单号",
			}, ],
			search2: [{
				type: "refer",
				key: "customer",
				label: "客户",
				refinfo: "customer",
			}, {
				type: "daterange",
				key: "orderDate",
				label: "订单日期"
			}, {
				type: "text",
				key: "orderCode",
				label: "订单编号"
			}, ]
		},
		buttons: {
			button1: [{
					key: "add",
					label: "客户订单",
					iconCls: "icon-plus",
					click: "showAddRefer"
				}, {
					key: "del",
					label: "删除",
					iconCls: "icon-shanchu1",
					click: "del"
				},
				// {
				//   key: "sign",
				//   label: "签字",
				//   iconCls: "icon-edit",
				//   click: "sign"
				// },
				// {
				//   key: "cancelsign",
				//   label: "取消签字",
				//   iconCls: "icon-tubiao-quxiaoshenhe",
				//   click: "cancelsign"
				// },
				//
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
				click: "cancelBill"
			}, {
				key: "save",
				label: "保存",
				click: "saveBill",
				cls: "ui-btn-green"
			}],
			button3: [{
				key: "addrow",
				label: "增行",
				iconCls: "icon-plus",
				click: "showAddItemsRef"
			}, {
				key: "delrow",
				label: "删行",
				iconCls: "icon-shanchu1",
				click: "delItems"
			}],
			button4: [{
				key: "return",
				label: "返回",
				click: "retListPanel"
			}, {
				key: "edit",
				label: "编辑",
				click: "detail2bill",
				cls: "ui-btn-green",
				visible: "canEdit"
			}]
		},
		dialogs: {
			dialog1: [{
				type: "refer",
				key: "logisticsId",
				label: "物流公司",
				refinfo: "logistics-company"
			}, {
				type: "text",
				key: "logisticsBillCode",
				label: "物流单号"
			}],
			dialog2: [{
				type: "combo",
				key: "interceptingState",
				label: "拦截状态",
				dataSource: [{
					name: "拦截成功",
					value: 1
				}, {
					name: "拦截失败",
					value: 0
				}]
			}, {
				type: "textarea",
				key: "interceptingReason",
				label: "失败原因",
				cls: "ui-textarea-item"
			}]
		},
		cards: {
			card1: [{
				type: "text",
				key: "billCode",
				label: "入库单号",
				enable: false
			}, {
				type: "date",
				key: "billDate",
				label: "单据日期"
			}, {
				type: "refer",
				key: "billCustomerId",
				label: "客户",
				refinfo: "customer",
			}, {
				type: "refer",
				key: "bizId",
				label: "销售员"
			}, {
				type: "refer",
				key: "storehouseId",
				label: "仓库"
			}, {
				type: "text",
				key: "totalShouldOutNum",
				label: "总应出数量",
				enable: false
			}, {
				type: "text",
				key: "totalFactOutNum",
				label: "总实出数量",
				enable: false
			}, {
				type: "text",
				key: "billStatusName",
				label: "出库状态",
				enable: false
			}, {
				type: "text",
				key: "realLogisticsCompanyName",
				label: "配送物流公司",
				enable: false
			}, {
				type: "textarea",
				key: "note",
				label: "备注",
				cls: "ui-textarea-item"
			}]
		},
		details: {
			detail1: [{
				key: "billCode",
				label: "入库单号"
			}, {
				key: "billDate",
				label: "单据日期",
				computed: "billDateComputed"
			}, {
				key: "billCustomerName",
				label: "客户"
			}, {
				key: "bizName",
				label: "销售员"
			}, {
				key: "storehouseName",
				label: "仓库"
			}, {
				key: "totalShouldOutNum",
				label: "总应出数量"
			}, {
				key: "totalFactOutNum",
				label: "总实出数量"
			}, {
				key: "billStatusName",
				label: "出库状态"
			}, {
				key: "realLogisticsCompanyName",
				label: "配送物流公司"
			}, {
				key: "note",
				label: "备注",
				cls: "ui-textarea-item"
			}]
		},
		grids: {
			grid1: {
				domid: "grid_complex_dom",
				umeta: {
					id: "grid_complex",
					data: "saleoutList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true,
				},
				columns: [{
					field: "billCode",
					dataType: "String",
					title: "出库单号",
					renderType: "detailRender"
				}, {
					field: "billDate",
					dataType: "Date",
					title: "单据日期"
				}, {
					field: "billCustomerName",
					dataType: "String",
					title: "客户"
				}, {
					field: "bizName",
					dataType: "String",
					title: "客户经理"
				}, {
					field: "storehouseName",
					dataType: "String",
					title: "仓库"
				}, {
					field: "shouldOutNum",
					dataType: "String",
					title: "应出数量",
					visible: false
				}, {
					field: "totalfactOutNum",
					dataType: "String",
					title: "实出数量",
					visible: false
				}, {
					field: "billStatusName",
					dataType: "String",
					title: "出库状态"
				}, {
					field: "note",
					dataType: "String",
					title: "备注",
					visible: false
				}, {
					field: "creator",
					dataType: "String",
					title: "创建人",
					visible: false
				}, {
					field: "creationTime",
					dataType: "Date",
					title: "创建时间",
					visible: false
				}, {
					field: "modifier",
					dataType: "String",
					title: "修改人",
					visible: false
				}, {
					field: "modifiedTime",
					dataType: "Date",
					title: "修改时间",
					visible: false
				}, {
					field: "billStatusCode",
					dataType: "String",
					title: "操作",
					renderType: "operation",
					fixed: true,
					width: "100px"
				}]
			},
			grid2: {
				domid: "grid_saleout2",
				umeta: {
					id: "grid_complex_edit",
					data: "saleoutItems",
					type: "grid",
					editable: true,
					multiSelect: true
				},
				columns: [{
						field: "rowNum",
						title: "行号",
						dataType: "Integer",
						editable: false
					}, {
						field: "goodsCode",
						dataType: "String",
						title: "商品编码",
						editable: false
					}, {
						field: "goodsName",
						dataType: "String",
						title: "商品名称",
						editable: false
					}, {
						field: "shouldOutNum",
						dataType: "String",
						title: "应出数量",
						editable: false
					}, {
						field: "factOutNum",
						dataType: "String",
						title: "实出数量"
					}, {
						field: "goodsBasicUnitName",
						dataType: "String",
						title: "单位",
						editable: false
					}, {
						field: "unitPrice",
						dataType: "String",
						title: "单价",
						editable: false
					}, {
						field: "amountMoney",
						dataType: "String",
						title: "金额",
						editable: false
					}, {
						field: "signNum",
						dataType: "String",
						title: "累计签收数量"
					},
					// {
					//   field: "batchCode",
					//   dataType: "String",
					//   title: "批次号",
					//   editable: false
					// },
					// {
					//   field: "cargoPosition",
					//   dataType: "String",
					//   title: "货位",
					//   editable: false
					// },
					{
						field: "isGift",
						dataType: "Integer",
						title: "赠品",
						renderType: "whetherRender",
						editable: false
					}, {
						field: "bnote",
						dataType: "String",
						title: "行备注"
					}, {
						field: "outerName",
						dataType: "String",
						title: "出库人",
						editable: false
					}, {
						field: "outDate",
						dataType: "DateTime",
						title: "出库时间",
						editable: false
					},
				]
			},
			grid3: {
				domid: "grid_saleoutorder3",
				umeta: {
					id: "grid_complex_detail",
					data: "saleoutItems",
					type: "grid",
					editable: false,
					multiSelect: false
				},
				columns: [{
						field: "rowNum",
						title: "行号",
						dataType: "Integer",
					}, {
						field: "goodsCode",
						dataType: "String",
						title: "商品编码",
					}, {
						field: "goodsName",
						dataType: "String",
						title: "商品名称",
					}, {
						field: "shouldOutNum",
						dataType: "String",
						title: "应出数量",
					}, {
						field: "factOutNum",
						dataType: "String",
						title: "实出数量"
					}, {
						field: "goodsBasicUnitName",
						dataType: "String",
						title: "单位",
					}, {
						field: "unitPrice",
						dataType: "String",
						title: "单价",
					}, {
						field: "amountMoney",
						dataType: "String",
						title: "金额",
					}, {
						field: "signNum",
						dataType: "String",
						title: "累计签收数量"
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
					}, {
						field: "bnote",
						dataType: "String",
						title: "行备注"
					}, {
						field: "outerName",
						dataType: "String",
						title: "出库人",
					}, {
						field: "outDate",
						dataType: "DateTime",
						title: "出库时间",
					},
				]
			},
			grid4: {
				domid: "grid_saleout4",
				umeta: {
					id: "grid_referList",
					data: "referDeliveryorderList",
					type: "grid",
					editable: false,
					multiSelect: true,
					onRowSelected: "referSelectHandle",
					onRowUnSelected: "referUnSelectHandle",
					onBeforeClickFun: "itemDetail"
				},
				columns: [{
					field: "customerName",
					dataType: "String",
					title: "客户"
				}, {
					field: "orderTypeName",
					dataType: "String",
					title: "订单类型"
				}, {
					field: "orderCode",
					dataType: "String",
					title: "订单编号",
				}, {
					field: "orderDate",
					dataType: "Date",
					title: "订单日期"
				}, {
					field: "totalNum",
					dataType: "String",
					title: "未发货总数量"
				}, {
					field: "totalNum",
					dataType: "String",
					title: "总数量"
				}, {
					field: "orderStatusName",
					dataType: "String",
					title: "状态"
				}]
			},
			grid5: {
				domid: "grid_saleout5",
				umeta: {
					id: "grid_referListItem",
					data: "referDeliveryorderitemList",
					type: "grid",
					editable: false,
					multiSelect: true,
					onRowSelected: "referSelectItemHandle",
					onRowUnSelected: "referUnSelectItemHandle",
				},
				columns: [{
						field: "goodsCode",
						dataType: "String",
						title: "商品编码"
					}, {
						field: "goodsName",
						dataType: "String",
						title: "商品名称"
					}, {
						field: "basePrice",
						dataType: "String",
						title: "单价",
					}, {
						field: "mainNum",
						dataType: "String",
						title: "数量",
					}, {
						field: "orderNum",
						dataType: "String",
						title: "订货数量",
					}, {
						field: "dealAmount",
						dataType: "String",
						title: "成交金额"
					}, {
						field: "orderNum",
						dataType: "String",
						title: "未发货数量",
					},
					// {
					//   field: "orderNum",
					//   dataType: "String",
					//   title: "已发货数量",
					// },
					{
						field: "planDeliveryDate",
						dataType: "Date",
						title: "计划发货日期"
					}, {
						field: "remark",
						dataType: "String",
						title: "备注"
					},
				]
			},
			grid6: {
				domid: "grid_saleout6",
				umeta: {
					id: "grid_referList_Sel",
					data: "selectedreferList",
					type: "grid",
					showNumCol: true,
					editable: false
				},
				columns: [{
					field: "customerName",
					dataType: "String",
					title: "客户"
				}, {
					field: "orderTypeName",
					dataType: "String",
					title: "订单类型"
				}, {
					field: "orderCode",
					dataType: "String",
					title: "订单编号",
				}, {
					field: "orderDate",
					dataType: "Date",
					title: "订单日期"
				}, {
					field: "totalNum",
					dataType: "String",
					title: "未发货总数量"
				}, {
					field: "totalNum",
					dataType: "String",
					title: "总数量"
				}, {
					field: "orderStatusName",
					dataType: "String",
					title: "状态"
				}]
			},
			grid7: {
				domid: "grid_saleout7",
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
					}, {
						field: "goodsName",
						dataType: "String",
						title: "商品名称"
					}, {
						field: "basePrice",
						dataType: "String",
						title: "单价",
					}, {
						field: "mainNum",
						dataType: "String",
						title: "数量",
					}, {
						field: "orderNum",
						dataType: "String",
						title: "订货数量",
					}, {
						field: "dealAmount",
						dataType: "String",
						title: "成交金额"
					}, {
						field: "orderNum",
						dataType: "String",
						title: "未发货数量",
					},
					// {
					//   field: "orderNum",
					//   dataType: "String",
					//   title: "已发货数量",
					// },
					{
						field: "planDeliveryDate",
						dataType: "Date",
						title: "计划发货日期"
					}, {
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