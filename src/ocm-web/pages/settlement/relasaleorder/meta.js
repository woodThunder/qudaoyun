define(['ocm_basemodel'], function(basemodel) {
	'use strict';
	var model = {
		metas: {
			soitemmeta: {
				meta: {
					id: {
						type: "string"
					},
					// 销售组织名称
					saleOrgName: {
						type: "string"
					},
					// "销售组织编码")
					saleOrgCode: {
						type: "string"
					},
					// 销售组织
					saleOrgId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
						refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
					},
					orderCode: {
						type: "string"
					}, //订单编号
					orderId: {
						type: "string"
					}, //订单Id
					// 客户订单类型
					orderTypeId: {
						type: "string",
						required: true
					},
					// "订单类型编码"
					orderTypeCode: {
						type: "string"
					},
					// "订单类型名称"
					orderTypeName: {
						type: "string"
					},
					// 订单日期
					orderDate: {
						type: "date"
					},
					// 客户
					customerId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["customer_sale"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
						refparam: '{"EQ_isChannelCustomer": "1"}'
					},
					// "客户编码")
					customerCode: {
						type: "string"
					},
					// "客户名称")
					customerName: {
						type: "string"
					},
					// 总成交金额
					totalDealAmount: {
						type: "amountFloat"
					},
				},
				pageSize: 10
			},
			someta: {
				meta: {
					id: {
						type: 'string'
					},
					gatherTypeCode: { //收款单号
						type: 'string',
					},
					gatherTypeName: { //收款单号
						type: 'string'
					},
					code: { //收款单号
						type: 'string'
					},
					billreceiptTime: { //收款日期
						type: 'datetime',
						required: true,
					},
					note: {
						type: 'string'
					},
					billreceiptState: { //收款单状态
						type: 'string'
					},
					billreceiptStateName: { //收款单状态
						type: 'string'
					},
					approver: { //审批人
						type: 'string'
					},
					approveTime: {
						type: 'datetime'
					},
					isRedflush: { //是否被红冲
						type: 'integer',
						default: 0
					},
					money: {
						type: "amountFloat"
					}
				},
				pageSize: 10
			},
			recmeta: {
				meta: {
					id: {
						type: 'string'
					},
					code: { //收款单号
						type: "string",
					},
					billreceiptId: {
						type: "string"
					},
					billreceiptTime: { //收款日期
						type: "date",
					},
					billreceiptCode: {
						type: "string"
					},
					alreadyMoney: {
						type: "amountFloat",
					},
					billreceiptTypeName: { //收款类型
						type: "string",
					},
					productLineName: { //产品线
						type: "string",
					},
					projectName: { //项目
						type: "string",
					},
					saveTime: { //核销日期
						type: "string",
					},
					money: { //收款金额
						type: "amountFloat",
					},
					orderCorrelationMoney: { //订单关联收款金额
						type: "amountFloat",
					},
					adjustMoney: { //本次调整金额
						type: "amountFloat",
					},
					serialnum: {
						type: 'numberFloat'
					},
				},
				pageSize: 10
			},
			setmeta: {
				meta: {
					id: {
						type: 'string'
					},
					financeOrg: { //按财务组织匹配
						type: "integer",
						default: 1
					},
					customer: { //按客户匹配
						type: "integer",
						default: 1
					},
					saleOrg: { //按销售组织匹配
						type: "integer",
					},
					productLine: { //按产品线匹配
						type: "integer",
					},
					project: { //按项目匹配
						type: "integer",
					},
					saleOrgOrderType: { //按订单类型匹配
						type: "integer",
					},
				},
				pageSize: 10
			},
		},
		searchs: {
			search1: [{
				type: "refer",
				key: "saleOrg",
				label: "销售组织",
				refinfo: "organization_ocm",
				refName: "销售组织",
				clientParam: {
					EQ_orgFuncRel: "01",
					AUTH_refcod: "saleorder",
					AUTH_refdim: "saleOrg"
				},
				opr: "IN",
				refcfg: {
					ctx: "/uitemplate_web",
					refCode: "",
					refName: "",
					isMultiSelectedEnabled: "true",
					EQ_orgFuncRel: "01"
				}
			}, {
				type: "refer",
				key: "customer",
				label: "客户",
				refinfo: "customer",
				refName: "客户",
				clientParam: {
					EQ_isEnable: "1",
					EQ_isChannelCustomer: "1",
					AUTH_refcod: "saleorder",
					AUTH_refdim: "customer"
				},
				opr: "IN",
				refcfg: {
					ctx: "/uitemplate_web",
					refCode: "",
					refName: "",
					isMultiSelectedEnabled: "true"
				}
			}, {
				type: "refer",
				key: "orderType",
				label: "订单类型",
				refinfo: "trantype",
				clientParam: {
					EQ_billTypeId: "SaleOrder",
					"IN_trantypeExtends.fieldValue": "01,03"
				}
			}, {
				type: "text",
				key: "orderCode",
				label: "订单编号",
				refName: "订单编号"
			}, {
				type: "daterange",
				key: "orderDate",
				label: "订单日期"
			}, ]
		},
		buttons: {
			button1: [{
				key: "add",
				label: "新增",
				iconCls: "icon-plus",
				click: "showAddBillPanel"
			}, {
				key: "del",
				label: "删除",
				iconCls: "icon-shanchu1",
				click: "del"
			}, {
				key: "submit",
				label: "提交",
				iconCls: "icon-tubiao-shenhe",
				click: "submitCusReqForm",
				auth: true
			}, {
				key: "unsubmit",
				label: "收回",
				iconCls: "icon-tubiao-quxiaoshenhe",
				click: "unsubmitCusReqForm",
				auth: true
			}, {
				key: "approve",
				label: "审批通过",
				iconCls: "icon-tubiao-duigou-xianxing",
				click: "approveCusReqForm",
				auth: true
			}, {
				key: "disapprove",
				label: "审批不通过",
				iconCls: "icon-tubiao-shibai",
				click: "disapproveCusReqForm",
				auth: true
			}, {
				key: "cancelapprove",
				label: "取消审批",
				iconCls: "icon-tubiao-quxiaoshenhe",
				click: "cancelApproveCusReqForm",
				auth: true
			}, ],
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
				click: "addNewItems"
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
			}, ],
			button5: [{
				key: "cancel",
				label: "取消",
				click: "cancelBill"
			}, {
				key: "searchbut",
				label: "查询",
				click: "searchBill",
				cls: "ui-btn-green"
			}, {
				key: "searchbut",
				label: "确认",
				click: "confirmBill",
				cls: "ui-btn-green"
			}],
		},
		cards: {
			card1: [{
				type: "checkbox",
				key: "financeOrg",
				label: "按财务组织匹配",
				checkedValue: 1,
				unCheckedValue: 0,
				defalutValue: 1,
				enable: false,
			}, {
				type: "checkbox",
				key: "customer",
				label: "按客户匹配",
				checkedValue: 1,
				unCheckedValue: 0,
				defalutValue: 1,
				enable: false,
			}, {
				type: "checkbox",
				key: "saleOrg",
				label: "按销售组织匹配",
				checkedValue: 1,
				unCheckedValue: 0
			}, {
				type: "checkbox",
				key: "productLine",
				label: "按产品线匹配",
				checkedValue: 1,
				unCheckedValue: 0
			}, {
				type: "checkbox",
				key: "project",
				label: "按项目匹配",
				checkedValue: 1,
				unCheckedValue: 0
			}, {
				type: "checkbox",
				key: "saleOrgOrderType",
				label: "按订单类型匹配",
				checkedValue: 1,
				unCheckedValue: 0
			}, ]
		},
		grids: {
			gridList: {
				domid: "gridList",
				umeta: {
					id: "grid_salesorder",
					data: "salesorderList",
					type: "grid",
					editable: false,
					multiSelect: true,
					showNumCol: true
				},
				columns: [{
					field: "orderCode",
					dataType: "String",
					title: "订单单号",
					renderType: "detailRender",
					width: "200px"
				}, {
					field: "saleOrgName",
					dataType: "String",
					title: "销售组织"
				}, {
					field: "customerName",
					dataType: "String",
					title: "客户"
				}, {
					field: "orderTypeName",
					dataType: "String",
					title: "订单类型",
					clientParam: {
						EQ_billTypeId: "SaleOrder"
					}
				}, {
					field: "orderDate",
					dataType: "Date",
					title: "订单日期"
				}, {
					field: "totalDealAmount",
					dataType: "String",
					title: "总金额"
				}, {
					field: "modifiedTime",
					dataType: "String",
					title: "订单关联收款金额"
				}, {
					field: "operation",
					dataType: "String",
					title: "操作",
					renderType: "operation",
					fixed: true,
					width: "100px"
				}, ]
			},
			gridEditMain: {
				domid: "gridEditMainId",
				umeta: {
					id: "grid_salesordereditmain",
					data: "salesordereditmain",
					type: "grid",
					editable: false,
					multiSelect: false,
					showNumCol: false
				},
				columns: [{
					field: "saleOrgName",
					dataType: "String",
					title: "销售组织"
				}, {
					field: "customerName",
					dataType: "String",
					title: "客户"
				}, {
					field: "orderTypeName",
					dataType: "String",
					title: "订单类型",
					clientParam: {
						EQ_billTypeId: "SaleOrder"
					}
				}, {
					field: "orderCode",
					dataType: "String",
					title: "订单单号",
					renderType: "detailRender",
					width: "200px"
				}, {
					field: "orderDate",
					dataType: "Date",
					title: "订单日期"
				}, {
					field: "totalDealAmount",
					dataType: "String",
					title: "总金额"
				}, {
					field: "modifiedTime",
					dataType: "String",
					title: "订单关联收款金额"
				}]
			},
			gridEditSub: {
				domid: "gridEditSub",
				umeta: {
					id: "grid_salesordereditsub",
					data: "salesordereditsub",
					type: "grid",
					editable: true,
					multiSelect: true,
					showNumCol: true
				},
				columns: [{
					field: "code",
					dataType: "String",
					title: "收款单号",
					editable: false,
				}, {
					field: "billreceiptTime",
					dataType: "Date",
					title: "收款日期",
					editable: false,
				}, {
					field: "billreceiptTypeName",
					dataType: "String",
					title: "收款类型",
					editable: false,
				}, {
					field: "productLineName",
					dataType: "String",
					title: "产品线",
					editable: false,
				}, {
					field: "projectName",
					dataType: "String",
					title: "项目",
					editable: false,
				}, {
					field: "saveTime",
					dataType: "String",
					title: "核销日期",
					editable: false,
				}, {
					field: "money",
					dataType: "String",
					title: "收款金额",
					editable: false,
				}, {
					field: "orderCorrelationMoney",
					dataType: "String",
					title: "订单关联收款金额",
					editable: false,
				}, {
					field: "adjustMoney",
					dataType: "String",
					title: "本次调整金额"
				}]
			},
			gridSetSub: {
				domid: "gridSetSub",
				umeta: {
					id: "grid_salesorderset",
					data: "salesorderSetSub",
					type: "grid",
					editable: true,
					multiSelect: true,
					showNumCol: true
				},
				columns: [{
					field: "code",
					dataType: "String",
					title: "收款单号"
				}, {
					field: "billreceiptTime",
					dataType: "Date",
					title: "收款日期"
				}, {
					field: "billreceiptTypeName",
					dataType: "String",
					title: "收款类型",
					// clientParam: {
					// 	EQ_billTypeId: "SaleOrder"
					// }
				}, {
					field: "productLineName",
					dataType: "String",
					title: "产品线",
				}, {
					field: "projectName",
					dataType: "String",
					title: "项目"
				}, {
					field: "saveTime",
					dataType: "String",
					title: "核销日期 "
				}, {
					field: "money",
					dataType: "String",
					title: "收款金额"
				}, {
					field: "orderCorrelationMoney",
					dataType: "String",
					title: "订单关联收款金额"
				}, {
					field: "adjustMoney",
					dataType: "String",
					title: "本次调整金额"
				}]
			},
			gridDetailMain: {
				domid: "gridDetailMainId",
				umeta: {
					id: "grid_salesorderdetailmain",
					data: "saleDetailMain",
					type: "grid",
					editable: false,
					multiSelect: false,
					showNumCol: false
				},
				columns: [{
					field: "saleOrgName",
					dataType: "String",
					title: "销售组织"
				}, {
					field: "customerName",
					dataType: "String",
					title: "客户"
				}, {
					field: "orderTypeName",
					dataType: "String",
					title: "订单类型",
					clientParam: {
						EQ_billTypeId: "SaleOrder"
					}
				}, {
					field: "orderCode",
					dataType: "String",
					title: "订单单号",
					renderType: "detailRender",
					width: "200px"
				}, {
					field: "orderDate",
					dataType: "Date",
					title: "订单日期"
				}, {
					field: "totalDealAmount",
					dataType: "String",
					title: "总金额"
				}, {
					field: "modifiedTime",
					dataType: "String",
					title: "订单关联收款金额"
				}]
			},
			gridDetailSub: {
				domid: "gridDetailSub",
				umeta: {
					id: "grid_salesorderDetailsub",
					data: "salesorderDetailsub",
					type: "grid",
					editable: false,
					multiSelect: false,
					showNumCol: false
				},
				columns: [{
					field: "code",
					dataType: "String",
					title: "收款单号"
				}, {
					field: "billreceiptTime",
					dataType: "Date",
					title: "收款日期"
				}, {
					field: "billreceiptTypeName",
					dataType: "String",
					title: "收款类型",
					// clientParam: {
					// 	EQ_billTypeId: "SaleOrder"
					// }
				}, {
					field: "productLineName",
					dataType: "String",
					title: "产品线",
				}, {
					field: "projectName",
					dataType: "String",
					title: "项目"
				}, {
					field: "saveTime",
					dataType: "String",
					title: "核销日期 "
				}, {
					field: "money",
					dataType: "String",
					title: "收款金额"
				}, {
					field: "orderCorrelationMoney",
					dataType: "String",
					title: "订单关联收款金额"
				}, {
					field: "adjustMoney",
					dataType: "String",
					title: "本次调整金额"
				}]
			},
		}
	};
	return new basemodel(model);
});