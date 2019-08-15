define(["ocm_basemodel"], function(basemodel) {
	var model = {
		metas: {
			complex: {
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
					code: {
						type: 'string',
						// required: true
					}, //要货单号
					externalSystemCode: {
						type: 'string',
						// required: true
					}, //外系统单号
					trantypeId: {
						type: 'string',
						required: true
					}, //交易类型
					trantypeName: {
						type: 'string',
					}, //交易类型
					trantypeCode: {
						type: 'string',
					}, //交易类型
					// reqCreateDate: {
					// 	type: 'date',
					// 	required: true
					// }, //单据日期
					outboundInvOrgId: {
						type: 'string',
						required: true
					}, //出库组织
					outboundInvOrgName: {
						type: 'string'
					}, //出库组织
					outboundWarehouseId: {
						type: 'string'
					}, //出库仓库
					outboundWarehouseName: {
						type: 'string'
					}, //出库仓库
					reqShopId: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['shopref']),
						"refcfg": '{"ctx":"/uitemplate_web", "refcode":"", "refname":"门店"}'
					}, //门店
					reqShopName: {
						type: 'string'
					},
					reqWarehouseId: {
						type: 'string',
						required: true
					}, //要货仓库
					reqWarehouseName: {
						type: 'string'
					}, //要货仓库
					reqInvOrgId: {
						type: 'string',
						required: true
					}, //要货组织
					reqInvOrgName: {
						type: 'string'
					}, //要货组织
					// reqerId: {
					// 	type: 'string',
					// 	required: true
					// }, //要货人
					// reqerName: {
					// 	type: 'string'
					// }, //要货人
					expectedArrivalDate: {
						type: 'date'
					}, //期望到货时间
					remark: {
						type: 'string'
					}, //备注
					close: {
						type: 'string',
						required: true
					}, //关闭
					state: {
						type: 'string',
						required: true
					}, // 要货单状态
					rejectReason: {
						type: 'string'
					}, //驳回原因
					source: {
						type: 'string',
					}, //订单来源
					rejecter: {
						type: 'string',
					}, //驳回人
					closer: {
						type: 'string'
					}, //关闭人
					closeDate: {
						type: 'string'
					}, //关闭时间
				},
				pageSize: 10,
			},
			// complexItem: {
			// 	meta: {
			// 		id: {
			// 			type: 'string'
			// 		}, //idp
			// 		requisitionBillId: {
			// 			type: 'string',
			// 			required: true
			// 		}, //要货申请主键
			// 		rowNum: {
			// 			type: 'integer',
			// 		}, //行号
			// 		goodsId: {
			// 			type: 'string',
			// 			refmodel: JSON.stringify(refinfo['goods']),
			// 			refcfg: '{"ctx":"/uitemplate_web","refName":"商品"}',
			// 			refparam: '{"EQ_isEnable":"1"}'
			// 		}, //商品主键
			// 		goodsName: {
			// 			type: 'string'
			// 		},
			// 		goodsNum: {
			// 			type: 'float'
			// 		}, //主数量
			// 		purchaseNum: {
			// 			type: 'float'
			// 		}, //采购数量
			// 		unitName: {
			// 			type: 'float'
			// 		}, //主单位
			// 		transferNum: {
			// 			type: 'integer'
			// 		}, //调拨数量
			// 		storageDate: {
			// 			type: 'date',
			// 		}, //期望到货日期
			// 		batchCode: {
			// 			type: 'string'
			// 		}, //批号
			// 		stockState: {
			// 			type: 'string'
			// 		}, //商品库存状态
			// 		remark: {
			// 			type: 'string'
			// 		}, //行备注
			// 		goodsVersion: {
			// 			type: 'string'
			// 		}, //商品版本号
			// 		goodsSelection: {
			// 			type: 'string'
			// 		}, //商品选配项
			// 		goodsSelectionDescription: {
			// 			type: 'string'
			// 		}, //商品选项描述
			// 		isMotherPiece: {
			// 			type: 'string'
			// 		}, //是否母件
			// 		srcBillId: {
			// 			type: 'string'
			// 		}, //来源单据号
			// 		srcBillBid: {
			// 			type: 'string'
			// 		}, //来源单据行
			// 		srcBillType: {
			// 			type: 'string'
			// 		}, //来源单据类型
			// 		originalGoodsId: {
			// 			type: 'string'
			// 		}, //原始商品版本
			// 		dr: {
			// 			type: 'integer'
			// 		},
			// 	},
			// 	pageSize: 10,
			// },
			//商品信息
			goodsMeta: {
				meta: {
					id: {
						type: "string"
					}, //
					batchCode: {
						type: "string",
					}, //面料id
					goodsCategoryCode: {
						type: "string"
					},
					goodsCode: {
						type: "string"
					}, //面料编码
					goodsName: {
						type: "string"
					}, //面料名称
					goodsId: {
						type: "string"
					}, //折扣
					goodsNum: {
						type: "float"
					}, //申请数量
					billCode: {
						type: "string"
					}, //订单编码
					storeName: {
						type: "string"
					}, //门店名称
					storageDate: {
						type: "date"
					}, //申购单号
					purchaseNum: {
						type: "string"
					}, //申购数量
					goodsSelectionDescription: {
						type: "string"
					}, //可用量（电商库）
					rowNum: {
						type: "integer"
					}, //行号
					storageDate: {
						type: "date"
					}, //预计可用量（电商库）
					transferNum: {
						type: "integer"
					}, //调拨数量
					transferNumCopy: {
						type: "integer"
					}, //调拨数量copy
					dr: {
						type: 'string'
					},
					// 面料级别
					isFabric: {
						type: 'string'
					},
					productionLine: {
						type: 'string'
					}, //生产线
					cprodcycle: {
						type: 'string'
					}, // 生产周期
					provider: {
						type: 'string'
					}, //工厂
				},
				pageSize: 10,
			},
			// 商品参照
			ProductRef: {
				meta: {
					productRefer: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods-no-version']),
						'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
						'refparam': '{"EQ_isEnable":"1","EQ_isOnSle":"1"}'
					}
				}
			},
			complexItem: {
				meta: {
					rowNum: {
						type: 'string',
						required: true
					}, //行号
					goodsId: {
						type: 'string',
						required: true
					}, //商品
					goodsName: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods']),
						"refcfg": '{"ctx":"/uitemplate_web"}',
						'refparam': '{"EQ_isEnable":"1"}',
						required: true
					}, //商品名称
					goodsCode: {
						type: 'string',
						required: true
					}, //商品编码
					unitId: {
						type: 'string',
						required: true
					}, //计量单位
					unitCode: {
						type: 'string',
						required: true
					}, //计量单位
					unitName: {
						type: 'string',
						required: true
					}, //计量单位
					reqNum: {
						type: 'numberFloat',
						required: true
					}, //要货数量
					approveNum: {
						type: 'numberFloat',
					}, //已批复数量
					expectedArrivalDate: {
						type: 'date',
					}, //期望要货时间
					allocatedNum: {
						type: 'numberFloat',
					}, //已调拨数量
					close: {
						type: 'integer',
					}, //关闭
					remark: {
						type: 'float',
					}, //备注
					goodsVersion: {
						type: 'string',
						required: true,
					}, //商品版本号
				},
				pageSize: 10,
			},
		},
		cards: {
			purchaseCard: [{
				type: "text",
				key: "code",
				label: "要货单号",
				enable: false
			}, {
				type: "text",
				key: "externalSystemCode",
				label: "外系统单号",
				enable: false
			}, {
				type: "refer",
				key: "trantypeId",
				label: "交易类型",
				refinfo: "trantype",
				referId: "tranType_searchCls",
				clientParam: {
					IN_billTypeId: "SaleOrder,ReqOrder"
				} //参数庭苇还没给
			}, {
				type: "refer",
				key: "outboundInvOrgId",
				label: "出库组织",
				refinfo: "organization_ocm",
				clientParam: {
					"EQ_orgFuncRel": "03"
				},
				domid: "outOrg",
				compid: "outOrg",
			}, {
				type: "refer",
				key: "outboundWarehouseId",
				label: "出库仓库",
				refinfo: "warehouse",
				clientParam: '{"EQ_isEnable":"1"}',
				domid: "outWarehouse",
				compid: "outWarehouse",
			}, {
				type: "refer",
				key: "reqWarehouseId",
				label: "要货仓库",
				refinfo: "warehouse",
				clientParam: '{"EQ_isEnable":"1"}',
				domid: "askWarehouse",
				compid: "askWarehouse",
			}, {
				type: "refer",
				key: "reqInvOrgId",
				label: "要货组织",
				refinfo: "organization_ocm",
				clientParam: {
					"EQ_orgFuncRel": "03"
				},
				enable: false,
			}, {
				type: "refer",
				key: "reqShopId",
				label: "要货门店",
				domid: "askShop",
				compid: "askShop",
			}, {
				type: "date",
				key: "expectedArrivalDate",
				label: "期望到货时间",
			}, {
				type: "radio",
				key: "close",
				label: "关闭",
				dataSource: [{
					value: "0",
					name: "是"
				}, {
					value: "1",
					name: "否"
				}],
				defaultvalue: "0",
			}, {
				type: "combo",
				key: "state",
				label: "要货单状态",
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
				defaultvalue: "0",
				enable: false
			}, {
				type: "text",
				key: "source",
				label: "订单来源",
				enable: false
			}, {
				type: "textarea",
				key: "rejectReason",
				label: "驳回原因",
				cls: "ui-textarea-item"
			}, {
				type: "textarea",
				key: "remark",
				label: "备注",
				cls: "ui-textarea-item"
			}]
		},
		searchs: {
			search1: [{
				type: "text",
				key: "billCode",
				label: "单据编码",
			}, {
				type: "date",
				key: "billDate",
				label: "单据日期",
			}, {
				type: "refer",
				key: "store--id",
				label: "门店",
				refinfo: "shopref"
			}, {
				type: "refer",
				key: "goods--goodsId",
				label: "商品",
				refinfo: "goods",
				refName: "商品"
			}]
		},
		buttons: {
			button1: [{
				key: "plus",
				label: "新增订单",
				iconCls: "icon-plus",
				click: "showEditBillPanel",
				clickArg: ["$data", -1]
			}, {
				key: "del",
				label: "删除",
				iconCls: "icon-shanchu1",
				click: "del"
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
				key: "delivery",
				label: "驳回",
				iconCls: "icon-tubiao-quxiaoshenhe",
				click: "rejectBillPanel",
				auth: true
			}, ],
			button2: [{
				key: "cancel",
				label: "取消",
				iconCls: "ui-btn-primary",
				click: "cancelBill",
			}, {
				key: "save",
				label: "保存",
				iconCls: "ui-btn-green",
				click: "saveBill"
			}, ],
			button3: [{
				key: "add",
				label: "商品",
				click: "addRow",
			}, {
				key: "delrow",
				label: "删行",
				iconCls: "icon-shanchu1",
				click: "delItems",
			}],
			button4: [{
				key: "return",
				label: "返回",
				click: "retListPanel"
			}, {
				key: "edit",
				label: "编辑",
				click: "detail2bill",
				cls: "ui-btn-green"
			}],
		},
		details: {
			detail1: [{
				key: "billCode",
				label: "单据编码",
			}, {
				key: "billDate",
				label: "单据日期",
			}, {
				key: "storeName",
				label: "门店",
			}, {
				key: "pkOutOrgName",
				label: "出库库存组织",
			}, {
				key: "pkInOrgName",
				label: "入库库存组织",
			}, {
				key: "outwarehouseName",
				label: "出库仓库",
			}, {
				key: "inwarehouseName",
				label: "入库仓库",
			}, {
				key: "outBillCode",
				label: "外系统单据号",
			}, {
				key: "billStatus",
				label: "审批状态",
				computed: "enableFmt"
			}, {
				key: "remark",
				label: "备注",
			}, ]
		},
		grids: {
			grid1: {
				domid: "grid_complex_dom",
				umeta: {
					"id": "grid_requestList",
					"data": "complexList",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeClickFun": "detail"
				},
				columns: [{
					"field": "reqShopName",
					"dataType": "String",
					"title": "要货门店",
				}, {
					"field": "reqWarehouseName",
					"dataType": "String",
					"title": "要货仓库",
				}, {
					"field": "code",
					"dataType": "String",
					"title": "要货单号",
				}, {
					"field": "trantypeName",
					"dataType": "String",
					"title": "交易类型",
				}, {
					"field": "totalReqNumber",
					"dataType": "String",
					"title": "电商单号",
					"width": "130px",
				}, {
					"field": "billStatus",
					"dataType": "String",
					"title": "订单状态",
					// "editOptions": {
					// 	"type": "combo",
					// 	"datasource": "orderStatusSrc"
					// },
					"renderType": "orderStatusRT",
					"width": "80px",
				}, {
					"field": "expectedArrivalDate",
					"dataType": "Date",
					"title": "期望到货时间",
				}, {
					"field": "source",
					"dataType": "String",
					"title": "单据来源"

				}, {
					"field": "creator",
					"dataType": "String",
					"title": "创建人",
					"visible": false
				}, {
					"field": "modifier",
					"dataType": "String",
					"title": "修改人",
					"visible": false
				}, {
					"field": "creationTime",
					"dataType": "Datetime",
					"title": "创建时间",
					"visible": false
				}, {
					"field": "modifiedTime",
					"dataType": "Integer",
					"title": "修改时间",
					"visible": false
				}, {
					"field": "operation",
					"dataType": "String",
					"title": "操作",
					"renderType": "operation",
					"fixed": true,
					"width": "100px",
					"visible": false
				}, ]
			},
			grid2: {
				domid: "grid_democomplexItem2_dom",
				umeta: {
					"id": "grid_editItem",
					"data": "complexItems",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
					"field": "goodsCode",
					"dataType": "String",
					"title": "商品编码",
					"required": true,
					// "editable": false
				}, {
					"field": "goodsName",
					"dataType": "String",
					"title": "商品名称",
					"required": true,
					"editable": false
				}, {
					"field": "goodsVersion",
					"dataType": "String",
					"title": "商品版本号",
					"required": true,
					"editable": false
				}, {
					"field": "storageDate",
					"dataType": "Date",
					"title": "期望到货日期",
					"editable": false
				}, {
					"field": "reqNum",
					"dataType": "String",
					"title": "要货数量",
					"required": true,
					// "editable": false
				}, {
					"field": "approveNum",
					"dataType": "String",
					"title": "已批复数量",
				}, {
					"field": "unitName",
					"dataType": "String",
					"title": "计量单位",
					"required": true
				}, {
					"field": "expectedArrivalDate",
					"dataType": "Date",
					"title": "期望要货时间",
				}, {
					"field": "allocatedNum",
					"dataType": "String",
					"title": "已调拨数量",
					"editable": false
				}, {
					"field": "close",
					"dataType": "checkbox",
					"title": "关闭",
					"renderType": "booleanRender",
					"required": true,
					"editable": false
				}, {
					"field": "remark",
					"dataType": "String",
					"title": "备注",
				}, ]
			},
			grid3: {
				domid: "grid_democomplexItem2detail_dom",
				umeta: {
					"id": "grid_detailItem",
					"data": "complexItems",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "goodsCode",
					"dataType": "String",
					"title": "商品编码",
				}, {
					"field": "goodsName",
					"dataType": "String",
					"title": "商品名称",
				}, {
					"field": "goodsVersion",
					"dataType": "String",
					"title": "商品版本号",
				}, {
					"field": "storageDate",
					"dataType": "Date",
					"title": "期望到货日期",
				}, {
					"field": "reqNum",
					"dataType": "String",
					"title": "要货数量",
				}, {
					"field": "approveNum",
					"dataType": "String",
					"title": "已批复数量",
				}, {
					"field": "unitName",
					"dataType": "String",
					"title": "计量单位",
				}, {
					"field": "expectedArrivalDate",
					"dataType": "Date",
					"title": "期望要货时间",
				}, {
					"field": "allocatedNum",
					"dataType": "String",
					"title": "已调拨数量",
				}, {
					"field": "close",
					"dataType": "String",
					"title": "关闭",
					"renderType": "closeSrc"
				}, {
					"field": "remark",
					"dataType": "String",
					"title": "备注",
				}, ]
			},
			allocateGrid: {
				domid: "grid_allocate_dom",
				umeta: {
					"id": "grid_allocate",
					"data": "goodsList",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": false
				},
				columns: [{
					"field": "batchCode",
					"dataType": "String",
					"title": "单号",
					"editable": false,
				}, {
					"field": "storeName",
					"dataType": "String",
					"title": "门店",
					"editable": false,
				}, {
					"field": "rowNum",
					"dataType": "String",
					"title": "行号",
					"editable": false,
				}, {
					"field": "goodsCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "goodsName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "goodsSelectionDescription",
					"dataType": "String",
					"title": "选配项",
					"editable": false,
				}, {
					"field": "goodsNum",
					"dataType": "String",
					"title": "申请数量",
					"editable": false,
				}, {
					"field": "transferNum",
					"dataType": "Integer",
					"title": "调拨数量",
				}, {
					"field": "purchaseNum",
					"dataType": "String",
					"title": "申购数量",
					"editable": false,
				}, {
					"field": "goodsSelectionDescription",
					"dataType": "String",
					"title": "可用量",
					"editable": false,
				}, ]
			},
			purchaseGrid: {
				domid: "grid_purchase_dom",
				umeta: {
					"id": "grid_purchase",
					"data": "goodsList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": false
				},
				columns: [{
					"field": "batchCode",
					"dataType": "String",
					"title": "单号",
					"editable": false,
				}, {
					"field": "storeName",
					"dataType": "String",
					"title": "门店",
					"editable": false,
				}, {
					"field": "rowNum",
					"dataType": "String",
					"title": "行号",
					"editable": false,
				}, {
					"field": "goodsCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "goodsName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "goodsSelectionDescription",
					"dataType": "String",
					"title": "选配项",
					"editable": false,
				}, {
					"field": "goodsNum",
					"dataType": "String",
					"title": "申请数量",
					"editable": false,
				}, {
					"field": "purchaseNum",
					"dataType": "String",
					"title": "申购数量",
				}, {
					"field": "transferNum",
					"dataType": "Integer",
					"title": "调拨数量",
					"editable": false,
				}, {
					"field": "provider",
					"dataType": "String",
					"title": "工厂",
					"editable": false,
				}, {
					"field": "storageDate",
					"dataType": "Date",
					"title": "期望到货日期",
					"editable": false,
				}, {
					"field": "cprodcycle",
					"dataType": "String",
					"title": "生产周期",
					"editable": false,
				}, {
					"field": "reqPurNumber",
					"dataType": "String",
					"title": "销售提前期",
					"editable": false,
				}, {
					"field": "storageDate",
					"dataType": "Date",
					"title": "建议转申购日期",
					"editable": false,
				}, ]
			},
			checkpartinfo: {
				domid: "grid_complexItemPart",
				umeta: {
					"id": "grid_complexItemPart",
					"data": "purchasePartItems",
					"type": "grid",
					"editable": false,
					"showNumCol": true
				},
				columns: [{
					"field": "rowNum",
					"dataType": "String",
					"title": "行号",
				}, {
					"field": "parentGoodsName",
					"dataType": "String",
					"title": "母件商品名称",
					"editable": false
				}, {
					"field": "goodsCode",
					"dataType": "String",
					"title": "商品编码",
				}, {
					"field": "goodsName",
					"dataType": "String",
					"title": "商品名称",
				}, {
					"field": "goodsNum",
					"dataType": "float",
					"title": "数量",
				}, {
					"field": "unitName",
					"dataType": "String",
					"title": "单位",
				}, {
					"field": "conversionRate",
					"dataType": "float",
					"title": "换算率"
				}, {
					"field": "astNum",
					"dataType": "float",
					"title": "辅数量",
				}, {
					"field": "astUnitName",
					"dataType": "String",
					"title": "辅单位",
				}, {
					"field": "unitPrice",
					"dataType": "float",
					"title": "单价",
					"renderType": "floatTypeSetRendertype"
				}, {
					"field": "amountMoney",
					"dataType": "float",
					"title": "金额",
					"renderType": "floatTypeSetRendertype"
				}, {
					"field": "deliveryDate",
					"dataType": "Date",
					"title": "交货日期",
				}, {
					"field": "specModel",
					"dataType": "String",
					"title": "规格型号"
				}, {
					"field": "goodsVersion",
					"dataType": "String",
					"title": "商品版本号",
					"required": true,
				}, {
					"field": "creator",
					"dataType": "String",
					"title": "创建人",
					"visible": false
				}, {
					"field": "creationTime",
					"dataType": "Date",
					"title": "创建时间",
					"visible": false
				}, {
					"field": "modifier",
					"dataType": "String",
					"title": "修改人",
					"visible": false
				}, {
					"field": "modifiedTime",
					"dataType": "Date",
					"title": "修改时间",
					"visible": false
				}, {
					"field": "demandStockOrgName",
					"dataType": "String",
					"title": "需求库存组织",
					"visible": false
				}, {
					"field": "arrivalBelongName",
					"dataType": "String",
					"title": "收货地归属",
					"visible": false
				}, {
					"field": "receiveStorageOrgName",
					"dataType": "String",
					"title": "收货库存组织",
					"visible": false
				}, {
					"field": "receiveStorageName",
					"dataType": "String",
					"title": "收货仓库",
					"visible": false
				}, {
					"field": "customerName",
					"dataType": "String",
					"title": "收货客户",
					"visible": false
				}, {
					"field": "detailAddr",
					"dataType": "String",
					"title": "地址信息",
					"visible": false
				}, {
					"field": "receiveAddress",
					"dataType": "String",
					"title": "收货地址",
					"visible": false
				}, {
					"field": "receiveContact",
					"dataType": "String",
					"title": "收货联系人",
					"visible": false
				}, {
					"field": "receiveContactPhone",
					"dataType": "String",
					"title": "收货联系人电话",
					"visible": false
				}, ]
			},
		}
	}
	return new basemodel(model);
})