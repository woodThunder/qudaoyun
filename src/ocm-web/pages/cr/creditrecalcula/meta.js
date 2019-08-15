define(["ocm_basemodel"], function (basemodel) {
	var model = {
		metas: {
			complex: {
				meta: {
					id: {
						type: 'string'
					}, //id
					accountDeduction: {
						type: 'amountFloat'
					},
					creditCtrlStrategyId: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['creditCtrlStrategy']),
						"refcfg": '{"ctx":"/uitemplate_web"}',
					}, //控制策略
					creditCtrlStrategyCode: {
						type: 'string',
						required: true
					}, //控制策略
					creditCtrlStrategyName: {	
						type: 'string',
						required: true
					}, //控制策略
					saleOrgId: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['organization_ocm']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
						"refparam": '{"EQ_orgFuncRel": "01"}',
					}, //销售组织
					saleOrgName: {
						type: 'string',
						required: true
					}, //组织名称
					organizationId: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['organization_ocm']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
						"refparam": '{"EQ_orgFuncRel": "07"}',
					}, //财务组织
					organizationName: {
						type: 'string',
						required: true,
					}, //财务组织
					preoccupyLimit: {
						type: 'float'
					},
					customerCategoryId: {
						type: 'string',
						required: true
					}, //客户分类
					customerCategoryName: {
						type: 'string',
						required: true
					}, //客户分类
					productGroupId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['productLine']),
						'refcfg': '{"ctx":"/uitemplate_web"}',
					}, //产品线
					productGroupName: {
						type: 'string',
					}, //产品线
					currencyId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['currency']),
						'refcfg': '{"ctx":"/uitemplate_web"}',
					}, //币种
					currencyCode: {
						type: 'string'
					}, //币种
					currencyName: {
						type: 'string'
					}, //币种
					customerId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['customer']),
						'refcfg': '{"ctx":"/uitemplate_web"}',
						// 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
					}, //客户
					customerCode: {
						type: 'string',
					}, //客户
					customerName: {
						type: 'string',
					}, //客户
					orderOccupyLimit: {
						type: 'amountFloat'
					}, //订单预占应收
					orderPreoccupyLimit: {
						type: 'amountFloat'
					}, //订单应收预占
					receivableAmount: {
						type: 'amountFloat'
					}, //应收金额
					receiptAmount: {
						type: 'amountFloat'
					}, //收款余额
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			},
		},
		searchs: {
			search1: [{
				type: "refer",
				key: "creditCtrlStrategy--id",
				label: "控制策略",
				required: true,
				refinfo: "creditCtrlStrategy"
			}, {
				type: "refer",
				key: "saleOrgId",
				label: "销售组织",
				refinfo: "organization_ocm",
				refparam: '{"EQ_orgFuncRel": "01"}',
				enable: false,
			}, {
				type: "refer",
				key: "organizationId",
				refinfo: "organization_ocm",
				refparam: '{"EQ_orgFuncRel": "07"}',
				label: "财务组织",
				enable: false,
			}, {
				type: "text",
				key: "orderTypeName",
				label: "交易类型",
				enable: false,
			}, {
				type: "refer",
				key: "productGroup",
				label: "产品线",
				refinfo: "productLine"
			}, {
				type: "refer",
				key: "customerCategoryId",
				label: "客户分类",
				refinfo: "customer-category"
			}, {
				type: "refer",
				key: "customer",
				label: "客户",
				refinfo: "customer",
			},]
		},
		buttons: {
			button1: [
				// {
				//     key: "refresh",
				//     label: "刷新",
				//     iconCls: "icon-tubiao-huangou",
				//     click: "refresh"
				//   },
				{
					key: "update",
					label: "结果更新",
					iconCls: "icon-qiyong",
					click: "update"
				},
				{
					key: "export",
					label: "导出",
					iconCls: "icon-export",
					click: "exportHandle"
				},
			],
		},
		grids: {
			grid1: {
				domid: "grid_complex_dom",
				umeta: {
					"id": "grid_complex",
					"data": "complexList",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
					"field": "creditCtrlStrategyName",
					"dataType": "String",
					"title": "信用控制策略",
					// "renderType": "detailRender"
				}, {
					"field": "customerName",
					"dataType": "String",
					"title": "客户"
				}, {
					"field": "productGroupName",
					"dataType": "String",
					"title": "产品线",
				}, {
					"field": "currencyName",
					"dataType": "String",
					"title": "币种"
				}, {
					"field": "orderPreoccupyLimit",
					"dataType": "String",
					"title": "订单预占应收"
				}, {
					"field": "orderOccupyLimit",
					"dataType": "String",
					"title": "订单占用应收"
				}, {
					"field": "receivableAmount",
					"dataType": "String",
					"title": "应收余额"
				}, {
					"field": "receiptAmount",
					"dataType": "String",
					"title": "收款余额"
				}, {
					"field": "accountDeduction",
					"dataType": "String",
					"title": "账扣费用余额"
				},]
			},
		}
	}
	return new basemodel(model);
})