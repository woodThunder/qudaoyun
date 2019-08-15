define(["ocm_basemodel"], function (basemodel) {
	var complexItem = {
		meta: {

			parentGoodsId: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['goods']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}',
			}, //母件商品
			parentGoodsCode: {
				type: 'string',
			}, //母件商品名称
			parentGoodsName: {
				type: 'string',

			}, //母件商品Code
			dr: {
				type: 'string'
			},
			//行号
			rowNum: {
				type: 'string',
				required: true
			},

			//库存商品
			goodsId: {
				type: 'string',
				required: true
			},
			goodsName: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['goods']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}'
			},
			goodsCode: {
				type: 'string',
				required: true
			},
            goodsOwner : {
                type: 'string',
			},

			//账面数量
			accountsNum: {
				type: 'float',
				required: true
			},

			//盘点数量
			inventoryNum: {
				type: 'float',
				required: true
			},

			//调整数量
			adjustmentNum: {
				type: 'float'
			},
			isOptional : {
				type : "Integer"
			},

			//差异数量
			subNum: {
				type: 'float',
				required: true
			},

			//账实一致
			unanimousAccount: {
				type: 'float',
				default: "0"
			},

			//备注
			remark: {
				type: 'string'
			},

			//审批时间
			approveTime: {
				type: 'date'
			},

			//审批人
			approvalPersonId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['person']),
				'refcfg': '{"ctx":"/uitemplate_web"}',
			},
			approvalPersonCode: {
				type: 'string'
			},
			approvalPersonName: {
				type: 'string'
			},

			//计量单位
			unitId: {
				type: 'string'
			},
			unitCode: {
				type: 'string'
			},
			unitName: {
				type: 'string'
			},
			goodsVersion: {
				type: 'string',
				required: true
			}, //商品版本号
			batchCodeId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['batchCode']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
			}, //批号
			batchCodeCode: {
				type: 'string',
			},
			batchCodeName: {
				type: 'string',
			},
			supplierId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['suppliers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //供应商
			supplierName: {
				type: 'string',
				/*required: true*/
			}, //供应商Name
			supplierCode: {
				type: 'string',
				/*required: true*/
			}, //供应商Code
			projectId: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['project']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //项目
			projectCode: {
				type: 'string',
			}, //项目Name
			projectName: {
				type: 'string',
			}, //项目Code
			stockStateId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['inventorystate']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}'
			}, //库存状态
			stockStateCode: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			stockStateName: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			customerId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['customers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{}'
			}, //客户
			customerCode: {
				type: 'string'
			}, //客户编码
			customerName: {
				type: 'string'
			}, //客户名称

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

			//手动录入
			isManual: {
				type: 'string'
			},

			//是否开启批次
			enableBatchNumberManage: {
				type: 'string'
			},
			enableBatchNoManage: {
				type: 'string'
			},
			enableInvStatusManage: {
				type: 'string'
			},
			productLineId: {
				type: 'string'
			},
			productId: {
				type: 'string'
			},
			originalGoodsId: {
				type: 'string',
			}, //原始版本商品
			goodsSelection: {
				type: 'string',
				required: true
			}, //商品选配项
			goodsSelectionDescription: {
				type: 'string',
			}, //商品选项描述
		},
	};
	var otheroutItem = {
		meta: {
			id: {
				type: 'string'
			},
			//其他出库id
			otherOutId: {
				type: 'string'
			},
			// 行号
			rowNum: {
				type: 'string'
			},
			// 库存商品Id
			goodsId: {
				type: 'string',
				required: true,
			},
			// 库存商品编码
			goodsCode: {
				type: 'string',
				required: true,
			},
			// 库存商品名称
			goodsName: {
				type: 'string',
				required: true,
			},
			// 应出数量
			shouldOutNum: {
				type: 'float',
				required: true,
			},
			// 单价
			unitPrice: {
				type: 'float'
			},
			// 金额
			amountMoney: {
				type: 'float'
			},
			//（实出）数量
			factOutNum: {
				type: 'float'
			},
			// 行备注
			remark: {
				type: 'string'
			},
			// 出库日期
			stockOutDate: {
				type: 'date'
			},
			// 出库人
			stockOutPersonId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['person']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
			},
			stockOutPersonCode: {
				type: 'string'
			},
			stockOutPersonName: {
				type: 'string'
			},
			// 来源单据号
			srcBillCode: {
				type: 'string'
			},
			// 来源单据行号
			srcBillBcode: {
				type: 'string'
			},
			// 来源单据类型
			srcBillType: {
				type: 'string'
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
			// 单位
			unitId: {
				type: 'string'
			},
			unitCode: {
				type: 'string'
			},
			unitName: {
				type: 'string'
			},
			dr: {
				type: 'string'
			},
			goodsVersion: {
				type: 'string',
				required: true
			}, //商品版本号
			batchCodeId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['batchCode']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
			}, //批号
			batchCodeCode: {
				type: 'string',
			},
			batchCodeName: {
				type: 'string',
			},
			supplierId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['suppliers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //供应商
			supplierName: {
				type: 'string',
				/*required: true*/
			}, //供应商Name
			supplierCode: {
				type: 'string',
				/*required: true*/
			}, //供应商Code
			projectId: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['project']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //项目
			projectCode: {
				type: 'string',
			}, //项目Name
			projectName: {
				type: 'string',
			}, //项目Code
			stockStateId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['inventorystate']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}'
			}, //库存状态
			stockStateCode: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			stockStateName: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			customerId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['customers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{}'
			}, //客户
			customerCode: {
				type: 'string'
			}, //客户编码
			customerName: {
				type: 'string'
			}, //客户名称
			originalGoodsId: {
				type: 'string',
			}, //原始版本商品
			goodsSelection: {
				type: 'string',
				required: true
			}, //商品选配项
			goodsSelectionDescription: {
				type: 'string',
			}, //商品选项描述
		},
		pageSize: 10,
	};
	var otherinItem = {
		meta: {
			id: {
				type: 'string'
			},
			dr: {
				type: 'integer'
			}, //dr
			// 行号
			rowNum: {
				type: 'string'
			},
			// 库存商品Id
			goodsId: {
				type: 'string',
				required: true
			},
			goodsCode: {
				type: 'string',
				required: true
			},
			goodsName: {
				type: 'string',
				required: true
			},
			// 应入数量
			shouldInNum: {
				type: 'float',
				required: true
			},
			// 单价
			unitPrice: {
				type: 'float'
			},
			// 金额p
			amountMoney: {
				type: 'float'
			},
			//（实入）数量
			factInNum: {
				type: 'float',
				required: true
			},
			// 备注
			remark: {
				type: 'string'
			},
			// 入库日期
			stockInDate: {
				type: 'date'
			},
			// 入库人
			stockInPerson: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['person']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
			},
			//TODO  批次号没有  货位没有
			// 来源单据号
			srcBillCode: {
				type: 'string'
			},
			// 来源单据行号
			srcBillBcode: {
				type: 'string'
			},
			// 来源单据类型
			srcBillType: {
				type: 'string'
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
			// 单位
			unitId: {
				type: 'string'
			},
			unitCode: {
				type: 'string'
			},
			unitName: {
				type: 'string'
			},
			goodsVersion: {
				type: 'string',
				required: true
			}, //商品版本号
			batchCodeId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['batchCode']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
			}, //批号
			batchCodeCode: {
				type: 'string',
			},
			batchCodeName: {
				type: 'string',
			},
			supplierId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['suppliers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //供应商
			supplierName: {
				type: 'string',
				/*required: true*/
			}, //供应商Name
			supplierCode: {
				type: 'string',
				/*required: true*/
			}, //供应商Code
			projectId: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['project']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //项目
			projectCode: {
				type: 'string',
			}, //项目Name
			projectName: {
				type: 'string',
			}, //项目Code
			stockStateId: {
				type: 'string',
				/* required: true,*/
				"refmodel": JSON.stringify(refinfo['inventorystate']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}'
			}, //库存状态
			stockStateCode: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			stockStateName: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			customerId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['customers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{}'
			}, //客户
			customerCode: {
				type: 'string'
			}, //客户编码
			customerName: {
				type: 'string'
			}, //客户名称
			originalGoodsId: {
				type: 'string',
			}, //原始版本商品
			goodsSelection: {
				type: 'string',
				required: true
			}, //商品选配项
			goodsSelectionDescription: {
				type: 'string',
			}, //商品选项描述

		},
		pageSize: 10,
	};
	var otherinBom = {
		meta: {
			id: {
				type: 'string'
			},
			dr: {
				type: 'integer'
			},
			// 行号
			rowNum: {
				type: 'string'
			},
			// 库存商品Id
			goodsId: {
				type: 'string',
				required: true
			},
			goodsCode: {
				type: 'string',
				required: true
			},
			goodsName: {
				type: 'string',
				required: true
			},
			enableBatchNumberManage: {
				type: 'string'
			},
			enableBatchNoManage: {
				type: 'string'
			},
			enableInvStatusManage: {
				type: 'string'
			},
			productId: {
				type: 'string'
			},
			productLineId: {
				type: 'string'
			},
			// 应入数量
			shouldInNum: {
				type: 'float'
			},
			// 单价
			unitPrice: {
				type: 'float'
			},
			// 金额p
			amountMoney: {
				type: 'float'
			},
			//（实入）数量
			factInNum: {
				type: 'float'
			},
			// 备注
			remark: {
				type: 'string'
			},
			// 入库日期
			stockInDate: {
				type: 'date'
			},
			// 入库人
			stockInPerson: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['person']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
			},
			//TODO  批次号没有  货位没有
			// 来源单据号
			srcBillCode: {
				type: 'string'
			},
			// 来源单据行号
			srcBillBcode: {
				type: 'string'
			},
			// 来源单据类型
			srcBillType: {
				type: 'string'
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
			// 单位
			unitId: {
				type: 'string'
			},
			unitCode: {
				type: 'string'
			},
			unitName: {
				type: 'string'
			},

			//------- 630后 新加bom包件字段 -------
			goodsVersion: {
				type: 'string',
				required: true
			}, //商品版本号
			goodsSelection: {
				type: 'string',
				required: true
			}, //商品选配项
			batchCodeId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['batchCode']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
			}, //批号
			batchCodeCode: {
				type: 'string',
			},
			batchCodeName: {
				type: 'string',
			},
			supplierId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['suppliers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //供应商
			supplierName: {
				type: 'string',
				/*required: true*/
			}, //供应商Name
			supplierCode: {
				type: 'string',
				/*required: true*/
			}, //供应商Code
			projectId: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['project']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //项目
			projectCode: {
				type: 'string',
			}, //项目Name
			projectName: {
				type: 'string',
			}, //项目Code
			stockStateId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['inventorystate']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}'
			}, //库存状态
			stockStateCode: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			stockStateName: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			customerId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['customers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{}'
			}, //客户
			customerCode: {
				type: 'string'
			}, //客户编码
			customerName: {
				type: 'string'
			}, //客户名称
			goodsNum: {
				type: 'string',
				required: true
			}, //数量
			parentGoodsId: {
				type: 'string',
			}, //商品
			parentGoodsCode: {
				type: 'string',
			}, //商品名称
			parentGoodsName: {
				type: 'string',
			}, //商品Code
			childGoodsQty: {
				type: 'float',
			},
			parentRowNum: {
				type: 'string',
			}, //母件行号
			originalGoodsId: {
				type: 'string',
			}, //原始版本商品
			goodsSelectionDescription: {
				type: 'string',
			}, //商品选项描述
		},
	};
	var otheroutBom = {
		meta: {
			id: {
				type: 'string'
			},
			//其他出库id
			otherOutId: {
				type: 'string'
			},
			// 行号
			rowNum: {
				type: 'string'
			},
			// 库存商品Id
			goodsId: {
				type: 'string',
				required: true,
			},
			// 库存商品编码
			goodsCode: {
				type: 'string',
				required: true,
			},
			// 库存商品名称
			goodsName: {
				type: 'string',
				required: true,
			},
			enableBatchNumberManage: {
				type: 'string'
			},
			enableBatchNoManage: {
				type: 'string'
			},
			enableInvStatusManage: {
				type: 'string'
			},
			productId: {
				type: 'string'
			},
			productLineId: {
				type: 'string'
			},
			// 应出数量
			shouldOutNum: {
				type: 'float',
				required: true,
			},
			// 单价
			unitPrice: {
				type: 'float'
			},
			// 金额
			amountMoney: {
				type: 'float'
			},
			//（实出）数量
			factOutNum: {
				type: 'float'
			},
			// 行备注
			remark: {
				type: 'string'
			},
			// 出库日期
			stockOutDate: {
				type: 'date'
			},
			// 出库人
			stockOutPersonId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['person']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
			},
			stockOutPersonCode: {
				type: 'string'
			},
			stockOutPersonName: {
				type: 'string'
			},
			//TODO  批次号没有
			// 来源单据号
			srcBillCode: {
				type: 'string'
			},
			// 来源单据行号
			srcBillBcode: {
				type: 'string'
			},
			// 来源单据类型
			srcBillType: {
				type: 'string'
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
			// 单位
			unitId: {
				type: 'string'
			},
			unitCode: {
				type: 'string'
			},
			unitName: {
				type: 'string'
			},
			dr: {
				type: 'string'
			},
			//------- 630后 新加bom包件字段 -------
			goodsVersion: {
				type: 'string',
				required: true
			}, //商品版本号
			goodsSelection: {
				type: 'string',
				required: true
			}, //商品选配项
			goodsNum: {
				type: 'string',
				required: true
			}, //数量
			parentGoodsId: {
				type: 'string',
			}, //所属母件商品
			parentGoodsCode: {
				type: 'string',
			}, //所属母件商品名称
			parentGoodsName: {
				type: 'string',
			}, //商品Code
			childGoodsQty: {
				type: 'float',
			},
			parentRowNum: {
				type: 'string',
			}, //母件行号
			batchCodeId: {
				type: 'string',
				'refmodel': JSON.stringify(refinfo['batchCode']),
				"refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
			}, //批号
			batchCodeCode: {
				type: 'string',
			},
			batchCodeName: {
				type: 'string',
			},
			supplierId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['suppliers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //供应商
			supplierName: {
				type: 'string',
				/*required: true*/
			}, //供应商Name
			supplierCode: {
				type: 'string',
				/*required: true*/
			}, //供应商Code
			projectId: {
				type: 'string',
				"refmodel": JSON.stringify(refinfo['project']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
			}, //项目
			projectCode: {
				type: 'string',
			}, //项目Name
			projectName: {
				type: 'string',
			}, //项目Code
			stockStateId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['inventorystate']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				'refparam': '{"EQ_isEnable":"1"}'
			}, //库存状态
			stockStateCode: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			stockStateName: {
				type: 'string',
				/*required: true*/
			}, //库存状态
			customerId: {
				type: 'string',
				/*required: true,*/
				"refmodel": JSON.stringify(refinfo['customers']),
				"refcfg": '{"ctx":"/uitemplate_web"}',
				"refparam": '{}'
			}, //客户
			customerCode: {
				type: 'string'
			}, //客户编码
			customerName: {
				type: 'string'
			}, //客户名称
			originalGoodsId: {
				type: 'string',
			}, //原始版本商品
			goodsSelectionDescription: {
				type: 'string',
			}, //商品选项描述
		},
		pageSize: 10,
	};
	var model = {
		metas: {
			complex: {
				meta: {
					inventoryItems: {
						type: "child",
						meta: complexItem.meta
					},
					id: {
						type: 'string'
					}, //id
					state: {
						type: "integer"
					},
					stockOrgId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['organization_ocm']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
						'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
					}, // 库存组织
					stockOrgCode: {
						type: 'string',
						required: true
					},
					stockOrgName: {
						type: 'string',
						required: true
					},

					inventoryCode: {
						type: 'string',
						required: true
					}, //单据号

					billType: {
						type: 'string',
						required: true
					}, //单据类型

					//盘点仓库
					inventoryStorageId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['warehouse']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
					},
					inventoryStorageCode: {
						type: 'string'
					},
					inventoryStorageName: {
						type: 'string'
					},

					// 库管员
					storageAdminId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['person']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
					},
					storageAdminCode: {
						type: 'string'
					},
					storageAdminName: {
						type: 'string'
					},

					//单据状态
					status: {
						type: 'string',
						required: true
					},
					statusName: {
						type: 'string',
						required: true
					},

					//操作code
					operationCode: {
						type: 'string'
					},

					//盘点人
					inventoryPersonId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['person']),
						'refcfg': '{"ctx":"/uitemplate_web"}',
					},
					inventoryPersonCode: {
						type: 'string'
					},
					inventoryPersonName: {
						type: 'string'
					},

					//帐实一致
					unanimousAccount: {
						type: 'string'
					},

					//备注
					remark: {
						type: 'string'
					},

					//库存单据归属
					stockBillBelong: {
						type: "string",
					},

					//所属客户
					belongCustomerId: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['customers']),
						"refcfg": '{"ctx":"/uitemplate_web"}',
						"refparam": '{}'
					},
					belongCustomerCode: {
						type: "string",
					},
					belongCustomerName: {
						type: "string",
					},

					//审批批语
					approveOpinion: {
						type: 'string'
					},

					//审批人
					approvalPersonId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['person']),
						'refcfg': '{"ctx":"/uitemplate_web"}',
					},
					approvalPersonCode: {
						type: 'string'
					},
					approvalPersonName: {
						type: 'string'
					},

					// 审批时间
					approvalDate: {
						type: 'date'
					},

					//单据日期
					billDate: {
						type: 'date',
						required: true,
					},

					//盘点日期
					inventoryDate: {
						type: 'date',
						required: true,
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

					//币种
					currencyId: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['currency']),
						"refcfg": '{"ctx":"/uitemplate_web",,"refName":"请选择"}',
						"refparam": '{}'
					}, //币种
					currencyName: {
						type: 'string',
						required: true
					},
					currencyCode: {
						type: 'string',
						required: true
					},

					//供应商
					supplierId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['suppliers']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
						'refparam': '{"EQ_isEnable":"1"}'
					},
					supplierName: {
						type: 'string',
						required: true
					}, //供应商Name
					supplierCode: {
						type: 'string',
						required: true
					}, //供应商Code

					//创建人
					creator: {
						type: 'string'
					},
					//创建时间
					creationTime: {
						type: 'datetime'
					},
					//修改人
					modifier: {
						type: 'string'
					},
					//修改时间
					modifiedTime: {
						type: 'datetime'
					},

					//是否开启货位
					ifSlotManage: {
						type: 'string'
					},
					//是否开启批次
					enableBatchNumberManage: {
						type: 'string'
					},
					enableBatchNoManage: {
						type: 'string'
					},
					enableInvStatusManage: {
						type: 'string'
					},
					inventoryMode: {
						type: 'string'
					}
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			},
			complexItem: {
				meta: complexItem.meta,
				pageSize: 10,
			},
			ItemRef: {
				meta: {
					parentgoodsref: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
						'refparam': '{"EQ_isEnable":"1","EQ_enableStrucManage":"1","EQ_isServiceType":"0"}'
					},
					productref: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
						'refparam': '{"EQ_isEnable":"1","EQ_enableStrucManage":"0","EQ_isServiceType":"0"}'
					},
					warehouseref: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['warehouse']),
						"refcfg": '{"ctx":"/uitemplate_web"}',
					},
					goodPoRef: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goodsposition']),
						"refcfg": '{"ctx":"/uitemplate_web"}',
					},
					supplierRef: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['suppliers']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
					},
				}
			},
			stockItemsSearch: {
				meta: {
					//库存商品编码
					goodsName: {
						type: 'string',
						required: true
					},
					goodsId: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
						'refparam': '{"EQ_isEnable":"1"}'
					},
					goodsCode: {
						type: 'string',
						required: true
					},
					//显示零库存
					isEmptyStock: {
						type: 'string'
					},
				},
			},
			stockItems: {
				meta: { //序号
					id: {
						type: 'string'
					},
					goodsName: {
						type: 'string',
						required: true
					},
					goodsId: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
						'refparam': '{"EQ_isEnable":"1"}'
					},
					goodsCode: {
						type: 'string',
						required: true
					},
					//显示零库存
					isEmptyStock: {
						type: 'string'
					},
					//现存量
					onhandnum: {
						type: 'string'
					},
					//货位
					positionId: {
						type: 'string'
					},
					positionCode: {
						type: 'string'
					},
					positionName: {
						type: 'string'
					},
					//批次号
					batchNumId: {
						type: 'string'
					},
					batchNumCode: {
						type: 'string'
					},
                    batchNumName: {
                        type: 'string'
                    },
				},
			},
			//其他出
			otherout: {
				meta: {
					otherOutBillItems: {
						type: "child",
						meta: otheroutItem.meta
					},
					id: {
						type: 'string',
					},
					// 库存组织
					stockOrgId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['organization_ocm']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
						'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
					},
					stockOrgCode: {
						type: 'string',
						required: true,
					},
					stockOrgName: {
						type: 'string',
						required: true,
					},
					//出库单号
					stockOutCode: {
						type: 'string',
						required: true,
					},
					//单据类型
					billType: {
						type: 'string',
						required: true,
					},
					//出库仓库
					stockOutStorageId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['warehouse']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
					},
					stockOutStorageCode: {
						type: 'string'
					},
					stockOutStorageName: {
						type: 'string'
					},

					//其他出库类型（交易类型）
					tranTypeId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['trantype']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
						'refparam': '{"EQ_billTypeId":"OtherOut"}'
					},
					tranTypeCode: {
						type: 'string'
					},
					tranTypeName: {
						type: 'string'
					},

					//库管员
					storageAdminId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['person']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"库管员"}',
					},
					storageAdminCode: {
						type: 'string'
					},
					storageAdminName: {
						type: 'string'
					},

					//业务员
					bizPersonId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['person']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"业务员"}',
					},
					bizPersonCode: {
						type: 'string'
					},
					bizPersonName: {
						type: 'string'
					},

					//部门
					deptId: {
						type: 'string',
						'refmodel': JSON.stringify(refinfo['department']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"业务部门"}',
					},
					deptCode: {
						type: 'string'
					},
					deptName: {
						type: 'string'
					},

					//总实出数量
					factOutNum: {
						type: 'string'
					},

					//备注
					remark: {
						type: 'string'
					},

					//状态
					statusId: {
						type: 'string'
					},
					statusCode: {
						type: 'string'
					},
					statusName: {
						type: 'string'
					},

					//自制单据
					isOwner: {
						type: 'string'
					},

					//入库日期
					stockInDate: {
						type: 'string'
					},
					//入库人
					stockInPerson: {
						type: 'string'
					},
					//签字日期
					signDate: {
						type: 'string'
					},
					//签字人
					signPerson: {
						type: 'string'
					},
					//单据日期
					billDate: {
						type: 'string'
					},
					//币种
					currencyId: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['currency']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"refName":"请选择"}',
						"refparam": '{}'
					}, //币种
					currencyCode: {
						type: 'string',
						required: true
					},
					currencyName: {
						type: 'string',
						required: true
					},
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			},
			otheroutItem: {
				meta: otheroutItem.meta,
				pageSize: 10,
			},
			otheroutBom: {
				meta: otheroutBom.meta,
			},
			//其他入
			otherin: {
				meta: {
					otherInBillItems: {
						type: "child",
						meta: otherinItem.meta
					},
					id: {
						type: 'string',
					},
					// 库存组织
					stockOrgId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['organization_ocm']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
						'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
					},
					stockOrgCode: {
						type: 'string',
						required: true,
					},
					stockOrgName: {
						type: 'string',
						required: true,
					},
					//入库单号
					stockInCode: {
						type: 'string',
						required: true,
					},
					//单据类型
					billType: {
						type: 'string',
						required: true,
					},
					//入库仓库
					stockInStorageId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['warehouse']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
					},
					stockInStorageCode: {
						type: 'string'
					},
					stockInStorageName: {
						type: 'string'
					},

					//其他入库类型（交易类型）
					tranTypeId: {
						type: 'string',
						required: true,
						'refmodel': JSON.stringify(refinfo['trantype']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
						'refparam': '{"EQ_billTypeId":"OtherIn"}'
					},
					tranTypeCode: {
						type: 'string'
					},
					tranTypeName: {
						type: 'string'
					},

					//库管员
					storageAdminId: {
						type: 'string',
						// required:true,
						'refmodel': JSON.stringify(refinfo['person']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"库管员"}',
					},
					storageAdminCode: {
						type: 'string'
					},
					storageAdminName: {
						type: 'string'
					},

					//业务员
					bizPersonId: {
						type: 'string',
						// required:true,
						'refmodel': JSON.stringify(refinfo['person']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"业务员"}',
					},
					bizPersonCode: {
						type: 'string'
					},
					bizPersonName: {
						type: 'string'
					},

					//部门
					deptId: {
						type: 'string',
						// required:true,
						'refmodel': JSON.stringify(refinfo['department']),
						'refcfg': '{"ctx":"/uitemplate_web","refName":"业务部门"}',
					},
					deptCode: {
						type: 'string'
					},
					deptName: {
						type: 'string'
					},

					//总实入数量
					factInNum: {
						type: 'string'
					},

					//备注
					remark: {
						type: 'string'
					},

					//状态
					statusId: {
						type: 'string'
					},
					statusCode: {
						type: 'string'
					},
					statusName: {
						type: 'string'
					},

					//是否自制单据
					isOwner: {
						type: 'string'
					},

					//入库日期
					stockInDate: {
						type: 'string'
					},
					//入库人
					stockInPerson: {
						type: 'string'
					},
					//签字日期
					signDate: {
						type: 'string'
					},
					//签字人
					signPerson: {
						type: 'string'
					},
					//单据日期
					billDate: {
						type: 'string'
					},
					//币种
					currencyId: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['currency']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"refName":"请选择"}',
						"refparam": '{}'
					}, //币种
					currencyCode: {
						type: 'string',
						required: true
					},
					currencyName: {
						type: 'string',
						required: true
					},
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			},
			otherinItem: {
				meta: otherinItem.meta,
				pageSize: 10,
			},
			otherinBom: {
				meta: otherinBom.meta,
			}
		},
		searchs: {
			search1: [{
					type: "text",
					key: "inventoryCode",
					label: "单据号",
				},
				{
					key: "billDate",
					type: "daterange",
					label: "单据日期",
				},
				{
					type: "refer",
					key: "stockOrg",
					label: "库存组织",
					refinfo: "organization_ocm",
					clientParam: {
						"EQ_orgFuncRel": "03",
						"EQ_isEnable": "1"
					},
				},
				{
					type: "refer",
					key: "inventoryStorage",
					label: "盘点仓库",
					refinfo: "warehouse",
					domid: "inventoryStorage"
				},
				{
					type: "refer",
					key: "inventoryPerson",
					label: "盘点人",
					refinfo: "person",
				},
				{
					type: "refer",
					key: "inventoryItems--goods",
					label: "库存商品",
					refinfo: "goods",
				},
				{
					type: "combo",
					key: "status",
					label: "订单状态",
					dataSource: [{
							value: '01',
							name: '待处理'
						},
						{
							value: '02',
							name: '已录入'
						},
						{
							value: '03',
							name: '已提交审批'
						},
						{
							value: '04',
							name: '审批中'
						},
						{
							value: '05',
							name: '审批通过'
						},
						{
							value: '09',
							name: '审批不通过'
						},
					],
					hasAll: true,
				},
				{
					type: "radio",
					key: "unanimousAccount",
					label: "显示帐实一致",
					dataSource: [{
							value: '',
							name: '全部'
						},
						{
							value: '1',
							name: '是'
						},
						{
							value: '0',
							name: '否'
						}
					]
				},
			],
			search2: [{
					type: "refer",
					key: "goods",
					label: "商品编码",
					refinfo: "goods",
					refcfg: {
						"ctx": "/uitemplate_web",
						"isMultiSelectedEnabled": "true"
					},
					referId: "goodsRef"
				},
				{
					type: "checkbox",
					key: "isEmptyStock",
					label: "显示零库存",
					default: 0,
					checkedValue: 1,
					unCheckedValue: 0,
				},
			]
		},
		buttons: {
			button1: [{
					key: "add",
					label: "新增",
					iconCls: "icon-plus",
					children: [{
							key: "addWareHouse",
							label: "整仓盘点",
							click: "addWareHouse",
						},
						{
							key: "addGoodPo",
							label: "按货位",
							click: "addGoodPo",
						},
						{
							key: "addStock",
							label: "按存货",
							click: "addStock",
						},
						{
							key: "addSupplier",
							label: "按供应商",
							click: "addSupplier",
						},
						{
							key: "addDefault",
							label: "普通新增",
							click: "addDefault",
						},
					]
				},
				{
					key: "del",
					label: "删除",
					iconCls: "icon-shanchu1",
					click: "del"
				},
				{
					key: "submit",
					label: "提交",
					iconCls: "icon-tubiao-shenhe",
					click: "submitBtn"
				},
				{
					key: "back",
					label: "收回",
					iconCls: "icon-tubiao-shenhe",
					click: "backBtn"
				},
				{
					key: "approve",
					label: "审批通过",
					iconCls: "icon-tubiao-shenhe",
					click: "approve"
				},
				{
					key: "approve",
					label: "审批不通过",
					iconCls: "icon-tubiao-shenhe",
					click: "disapprove"
				},
				{
					key: "unapprove",
					label: "取消审核",
					iconCls: "icon-tubiao-quxiaoshenhe",
					click: "unapprove"
				},
				{
					key: "import",
					label: "导入实盘",
					iconCls: "icon-import",
					click: "importHandle"
				},
				{
					key: "export",
					label: "导出",
					iconCls: "icon-export",
					click: "exportHandle"
				},
				{
					key: "clearnum",
					label: "清空实盘",
					iconCls: "icon-shanchu1",
					click: "clearnum"
				},
				{
					key: "adjust",
					label: "调整",
					iconCls: "icon-edit",
					click: "adjust"
				},
				{
					key: "unadjust",
					label: "取消调整",
					iconCls: "icon-edit",
					click: "unAdjust"
				},
			],
			button2: [{
					key: "billnum",
					label: "账面取数",
					click: "billnum"
				},
				{
					key: "autonum",
					label: "自动取数",
					click: "autonum"
				},
				{
					key: "Manualnum",
					label: "手动录入",
					click: "Manualnum"
				},
				{
					key: "cancel",
					label: "取消",
					click: "cancelBill"
				},
				{
					key: "save",
					label: "保存",
					click: "saveBill",
					cls: "ui-btn-green",
					clickArg: "save"
				},
				{
					key: "saveSubmit",
					label: "保存并提交",
					click: "saveBill",
					cls: "ui-btn-green",
					clickArg: "saveSubmit"
				},
			],
			//普通
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
					click: "delItems",
				},

			],
			//按整仓
			button4: [{
				key: "addrow",
				label: "选择仓库",
				iconCls: "icon-plus",
				click: "showAddwarehouseRef"
			}, ],
			//按货位
			button5: [{
				key: "addrow",
				label: "选择货位",
				iconCls: "icon-plus",
				click: "showAddGoodPoRef"
			}],
			//按供应商
			buttonSupl: [{
				key: "addrow",
				label: "选择供应商",
				iconCls: "icon-plus",
				click: "showAddSupplierRef"
			}, ],
			//按存货
			button6: [{
				key: "addrow",
				label: "添加存货",
				iconCls: "icon-plus",
				click: "showAddstockRef"
			}, ],
			button7: [{
					key: "return",
					label: "返回",
					click: "retListPanel"
				},
				{
					key: "edit",
					label: "编辑",
					click: "detail2bill",
					cls: "ui-btn-green"
				}
			],
			//调整保存取消
			button8: [{
					key: "cancel",
					label: "取消",
					click: "cancelBill"
				},
				{
					key: "save",
					label: "保存",
					click: "saveAdjust",
					cls: "ui-btn-green"
				}
			]
		},

		cards: {
			card1: [{
					type: "textreadonly",
					key: "inventoryCode",
					label: "单据号",
				},
				{
					type: "date",
					key: "billDate",
					label: "单据日期",
				},
				{
					type: "date",
					key: "inventoryDate",
					label: "盘点日期",
				},
				{
					type: "refer",
					key: "stockOrgId",
					label: "库存组织",
					refinfo: "organization_ocm",
					clientParam: {
						"EQ_orgFuncRel": "03",
						"EQ_isEnable": "1"
					},
					referId: "stockOrgId"
				},
				{
					type: "refer",
					key: "inventoryStorageId",
					label: "盘点仓库",
					refinfo: "warehouse",
					refName: "盘点仓库",
					referId: "inventoryStorageRefer",
					domid: "inventoryStorage"
				},
				{
					type: "refer",
					key: "inventoryPersonId",
					label: "盘点人",
					refinfo: "person",
					refName: "盘点人"
				},
				{
					type: "refer",
					key: "storageAdminId",
					label: "库管员",
					refinfo: "person",
					refName: "库管员"
				},
				{
					type: "combo",
					key: "status",
					label: "单据状态",
					defaultvalue: "01",
					dataSource: [{
							value: '01',
							name: '待处理'
						},
						{
							value: '02',
							name: '已录入'
						},
						{
							value: '03',
							name: '已提交审批'
						},
						{
							value: '04',
							name: '审批中'
						},
						{
							value: '05',
							name: '审批通过'
						},
						{
							value: '06',
							name: '审批不通过'
						},
					],
					enable: false,
					computed: "status",
				},
				{
					type: "label",
					key: "state",
					label: "审批状态",
					defaultvalue: "0",
					datasource: [{
							name: "待处理",
							value: 0
						},
						{
							name: "已提交",
							value: 1
						},
						{
							name: "审批中",
							value: 2
						},
						{
							name: "审批通过",
							value: 3
						},
						{
							name: "审批不通过",
							value: 4
						}
					]
				},
				{
					type: "text",
					key: "remark",
					label: "备注",
				},
			],
			//按供应商
			card2: [{
					type: "textreadonly",
					key: "inventoryCode",
					label: "单据号",
				},
				{
					type: "date",
					key: "billDate",
					label: "单据日期",
				},
				{
					type: "date",
					key: "inventoryDate",
					label: "盘点日期",
				},
				{
					type: "refer",
					key: "stockOrgId",
					label: "库存组织",
					refinfo: "organization_ocm",
					clientParam: {
						"EQ_orgFuncRel": "03",
						"EQ_isEnable": "1"
					},
					referId: "stockOrgId"
				},
				{
					type: "refer",
					key: "inventoryStorageId",
					label: "盘点仓库",
					refinfo: "warehouse",
					refName: "盘点仓库",
					referId: "inventoryStorageRefer",
					domid: "inventoryStorage"
				},
				{
					type: "refer",
					key: "inventoryPersonId",
					label: "盘点人",
					refinfo: "person",
					refName: "盘点人"
				},
				{
					type: "refer",
					key: "storageAdminId",
					label: "库管员",
					refinfo: "person",
					refName: "库管员"
				},
				{
					type: "combo",
					key: "status",
					label: "单据状态",
					defaultvalue: "01",
					dataSource: [{
							value: '01',
							name: '待处理'
						},
						{
							value: '02',
							name: '已录入'
						},
						{
							value: '03',
							name: '已提交审批'
						},
						{
							value: '04',
							name: '审批中'
						},
						{
							value: '05',
							name: '审批通过'
						},
						{
							value: '06',
							name: '审批不通过'
						},
					],
					enable: false,
					computed: "status",
				},
				{
					type: "text",
					key: "remark",
					label: "备注",
				},
			],
		},
		details: {
			detail1: [{
					key: "inventoryCode",
					label: "单据号",
				},
				{
					key: "billDate",
					label: "单据日期",
				},
				{
					key: "inventoryDate",
					label: "盘点日期",
				},
				{
					key: "stockOrgName",
					label: "库存组织",
				},
				{
					key: "inventoryStorageName",
					label: "盘点仓库",
				},
				{
					key: "inventoryPersonName",
					label: "盘点人",
				},
				{
					key: "storageAdminName",
					label: "库管员",
				},
				{
					key: "status",
					label: "单据状态",
					computed: "status",
				},
				{
					key: "state",
					label: "审批状态",
					computed: "state",
				},
				{
					key: "remark",
					label: "备注",
				},
			],
			//其他出
			detail2: [

				{
					key: "billDate",
					label: "单据日期",
					computed: "otherOutBillDate"
				},
				{
					key: "stockOrgName",
					label: "库存组织",
				},
				{
					key: "stockOutStorageName",
					label: "出库仓库",
				},
				{
					key: "tranTypeName",
					label: "其他出库类型",
				},
				{
					key: "storageAdminName",
					label: "库管员",
				},
				{
					key: "bizPersonName",
					label: "业务员",
				},
				{
					key: "deptName",
					label: "部门",
				},
				{
					key: "statusName",
					label: "单据状态"
				},
				{
					key: "totalFactOutNum",
					label: "总实出数量",
				},
			],
			//其他入
			detail3: [{
					key: "billDate",
					label: "单据日期",
					computed: "otherOutBillDate"
				},
				{
					key: "stockOrgName",
					label: "库存组织",
				},
				{
					key: "stockInStorageName",
					label: "入库仓库",
				},
				{
					key: "tranTypeName",
					label: "其他入库类型",
				},
				{
					key: "storageAdminName",
					label: "库管员",
				},
				{
					key: "bizPersonName",
					label: "业务员",
				},
				{
					key: "deptName",
					label: "部门",
				},
				{
					key: "statusName",
					label: "单据状态"
				},
				{
					key: "totalFactInNum",
					label: "总实入数量",
				},
			]
		},

		grids: {
			grid1: {
				domid: "",
				umeta: {
					"id": "grid_complex",
					"data": "inventorybillList",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
						"field": "inventoryCode",
						"dataType": "String",
						"title": "单据号",
						"renderType": "detailRender"
					},
					{
						"field": "billDate",
						"dataType": "Date",
						"title": "单据日期",
					},
					{
						"field": "inventoryDate",
						"dataType": "Date",
						"title": "盘点日期",
					},
					{
						"field": "stockOrgName",
						"dataType": "String",
						"title": "库存组织",
					},
					{
						"field": "inventoryStorageName",
						"dataType": "String",
						"title": "盘点仓库",
					},
					{
						"field": "inventoryPersonName",
						"dataType": "String",
						"title": "盘点人",
					},
					{
						"field": "storageAdminName",
						"dataType": "String",
						"title": "库管员",
					},
					{
						"field": "unanimousAccount",
						"dataType": "checkbox",
						"title": "帐实一致",
						"editType": "float",
						"renderType": "disableBooleanRender",
						"editable": false
					},
					{
						"field": "status",
						"dataType": "String",
						"title": "单据状态",
						"renderType": "statusRender"
					},
					{
						"field": "state",
						"dataType": "String",
						"title": "审批状态",
						"renderType": "approveStateRender"
					},
					{
						"field": "creator",
						"dataType": "String",
						"title": "创建人",
						"visible": false
					},
					{
						"field": "creationTime",
						"dataType": "Date",
						"title": "创建时间",
						"visible": false
					},
					{
						"field": "modifier",
						"dataType": "String",
						"title": "修改人",
						"visible": false
					},
					{
						"field": "modifiedTime",
						"dataType": "Date",
						"title": "修改时间",
						"visible": false
					},
					{
						"field": "operationCode",
						"dataType": "String",
						"title": "操作",
						"renderType": "operation",
						"fixed": true,
						"width": "100px"
					},
				]
			},
			grid2: {
				domid: "",
				umeta: {
					"id": "grid_complexItem",
					"data": "inventoryItems",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"onBeforeEditFun": "beforeEditCheck"
				},
				columns: [{
						"field": "rowNum",
						"dataType": "String",
						"title": "行号",
						"editable": false,
					},
					{
						"field": "parentGoodsId",
						"dataType": "String",
						"title": "所属母件商品",
						"visible": false,
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "parentGoodsName",
						"editOptions": {
							"validType": "string"
						},
					},
					{
						"field": "goodsCode",
						"dataType": "String",
						"title": "商品编号",
						"editable": false
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "商品名称",
						"editable": false
					},
					{
						"field": "accountsNum",
						"dataType": "float",
						"title": "账面数量",
						"editable": false
					},
					{
						"field": "inventoryNum",
						"dataType": "float",
						"title": "盘点数量",
						"editable": false
					},
					{
						"field": "unitName",
						"dataType": "String",
						"title": "单位",
						"editable": false
					},
					{
						"field": "subNum",
						"dataType": "float",
						"title": "差异数量",
						"editable": false
					},
					{
						"field": "adjustmentNum",
						"dataType": "float",
						"title": "调整数量",
					},
					{
						"field": "batchNumId",
						"dataType": "String",
						"title": "批次号",
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "batchNumCode",
						"editOptions": {
							"validType": "string"
						},
						"editable": false
					},
					{
						field: "goodsSelection",
						dataType: "String",
						title: "商品选配ID",
						editable: false,
						visible: false,
					},
					{
						field: "goodsSelectionDescription",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOpt",
						editable: false,
					},
					{
						"field": "goodsVersion",
						"dataType": "String",
						"title": "商品多版本",
						"editable": false,
						"visible": true,
					},
					{
						"field": "goodsPositionId",
						"dataType": "String",
						"title": "货位",
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "goodsPositionName",
						"editOptions": {
							"validType": "string"
						},
						"editable": false
					},
					{
						"field": "isManual",
						"dataType": "checkbox",
						"title": "手动录入",
						"editType": "float",
						"renderType": "disableBooleanRender",
						"editable": false
					},
					{
						"field": "unanimousAccount",
						"dataType": "checkbox",
						"title": "帐实一致",
						"editType": "float",
						"renderType": "disableBooleanRender",
						"editable": false
					},
					{
						"field": "approvalPersonName",
						"dataType": "String",
						"title": "审批人",
						"editable": false,
						"visible": false
					},
					{
						"field": "approveTime",
						"dataType": "Date",
						"title": "审批时间",
						"editable": false,
						"visible": false
					},
					{
						"field": "remark",
						"dataType": "String",
						"title": "备注",
						"editable": false
					},

					{
						"field": "batchCodeId",
						"dataType": "String",
						"title": "批号",
						"visible": false,
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "batchCodeName",
						"editOptions": {
							"validType": "string"
						}
					},
					{
						"field": "supplierId",
						"dataType": "String",
						"title": "供应商",
						"visible": false,
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "supplierName",
						"editOptions": {
							"validType": "string"
						}
					},
					{
						"field": "projectId",
						"dataType": "String",
						"title": "项目",
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "projectName",
						"editOptions": {
							"validType": "string"
						},
						"editable": true,
						"visible": false,
					},
					{
						"field": "stockStateId",
						"dataType": "String",
						"title": "库存状态",
						"visible": false,
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "stockStateName",
						"editOptions": {
							"validType": "string"
						}
					},
					{
						"field": "customerId",
						"dataType": "String",
						"title": "客户",
						"renderType": "ncReferRender",
						"editType": "ncReferEditType",
						"showField": "customerName",
						"visible": false,
						"editOptions": {
							"validType": "string"
						}
					},
				]
			},
			grid3: {
				domid: "",
				umeta: {
					"id": "grid_complexItemdetail",
					"data": "inventoryItems",
					"type": "grid",
					"editable": false,
				},
				columns: [{
						"field": "rowNum",
						"dataType": "String",
						"title": "行号",
					},
					{
						"field": "parentGoodsName",
						"dataType": "String",
						"title": "所属母件商品",
						"visible": false
					},
					{
						"field": "goodsCode",
						"dataType": "String",
						"title": "商品编号",
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "商品名称",
					},
					{
						"field": "accountsNum",
						"dataType": "float",
						"title": "账面数量",
					},
					{
						"field": "inventoryNum",
						"dataType": "float",
						"title": "盘点数量",
					},
					{
						"field": "unitName",
						"dataType": "String",
						"title": "单位",
					},
					{
						"field": "subNum",
						"dataType": "float",
						"title": "差异数量",
					},
					{
						"field": "adjustmentNum",
						"dataType": "float",
						"title": "调整数量",
					},
					{
						"field": "batchNumCode",
						"dataType": "String",
						"title": "批次号",
					},
					{
						"field": "goodsVersion",
						"dataType": "String",
						"title": "商品多版本",
						"editable": false,
						"visible": true,
					},
					{
						"field": "goodsPositionName",
						"dataType": "String",
						"title": "货位",
					},
					{
						field: "goodsSelection",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails",
						editable: false,
					},

					{
						"field": "isManual",
						"dataType": "checkbox",
						"title": "手动录入",
						"editType": "float",
						"renderType": "disableBooleanRender",
					},
					{
						"field": "unanimousAccount",
						"dataType": "checkbox",
						"title": "帐实一致",
						"editType": "float",
						"renderType": "disableBooleanRender",
					},
					{
						"field": "approvalPersonName",
						"dataType": "String",
						"title": "审批人",
					},
					{
						"field": "approvalDate",
						"dataType": "Date",
						"title": "审批时间",
					},
					{
						"field": "remark",
						"dataType": "String",
						"title": "备注",
					},

					{
						"field": "batchCodeName",
						"dataType": "String",
						"title": "批号",
						"editable": false,
						"visible": false,
					},
					{
						"field": "supplierName",
						"dataType": "String",
						"title": "供应商",
						"visible": false,
						"editable": false,
					},
					{
						"field": "projectName",
						"dataType": "String",
						"title": "项目",
						"editable": false,
						"visible": false,
					},
					{
						"field": "stockStateName",
						"dataType": "String",
						"title": "库存状态",
						"editable": false,
						"visible": false,
					},
					{
						"field": "customerName",
						"dataType": "String",
						"title": "客户",
						"editable": false,
						"visible": false,
					},
				]
			},
			//存货
			grid4: {
				domid: "grid_stockreferItems",
				umeta: {
					"id": "grid_stockreferItems",
					"data": "stockreferItems",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onRowSelected": "referSelectItemHandle",
					"onRowUnSelected": "referUnSelectItemHandle",
				},
				columns: [{
						"field": "goodsCode",
						"dataType": "String",
						"title": "库存商品编码",
						"editable": false,
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "库存商品名称",
						"editable": false,
					},
					{
						"field": "onhandNum",
						"dataType": "Float",
						"title": "现存量",
						"editable": false,
					},
					{
						"field": "batchNumName",
						"dataType": "String",
						"title": "批次号",
						"editable": false,
					},
					{
						"field": "positionName",
						"dataType": "String",
						"title": "货位",
						"editable": false,
					},

				]
			},
			//存货已选
			grid5: {
				domid: "grid_selectedItems",
				umeta: {
					"id": "grid_selectedItems",
					"data": "selectedstockreferItems",
					"type": "grid",
					"editable": false,
					"showNumCol": true
				},
				columns: [{
						"field": "goodsCode",
						"dataType": "String",
						"title": "库存商品编码",
						"editable": false,
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "库存商品名称",
						"editable": false,
					},
					{
						"field": "onhandNum",
						"dataType": "Float",
						"title": "现存量",
						"editable": false,
					},
					{
						"field": "batchNumCode",
						"dataType": "String",
						"title": "批次号",
						"editable": false,
					},
					{
						"field": "positionName",
						"dataType": "String",
						"title": "货位",
						"editable": false,
					},
				]
			},
			//其他出表体行
			grid6: {
				domid: "grid_otheroutItem_dom",
				umeta: {
					"id": "grid_otheroutItem",
					"data": "otheroutItem",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
						"field": "rowNum",
						"dataType": "String",
						"title": "行号",
						"editable": false,
					},
					{
						"field": "goodsCode",
						"dataType": "String",
						"title": "商品编码",
						"editable": false,
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "商品名称",
						"editable": false,
					},
					{
						"field": "shouldOutNum",
						"dataType": "float",
						"title": "应出数量",
						"editType": "float",
						"editable": false,
					},
					{
						"field": "factOutNum",
						"dataType": "float",
						"title": "实出数量",
						"editType": "float",
					},
					{
						"field": "unitName",
						"dataType": "String",
						"title": "单位",
						"editable": false,
					},
					{
						"field": "unitPrice",
						"dataType": "String",
						"title": "单价",
						"editable": false,
					},
					{
						"field": "amountMoney",
						"dataType": "String",
						"title": "金额",
						"editable": false,
					},
					{
						"field": "batchNumName",
						"dataType": "String",
						"title": "批次号",
						"editable": false,
					},

					{
						field: "goodsSelection",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails",
						editable: false,
					},
					{
						"field": "goodsVersion",
						"dataType": "String",
						"title": "商品多版本",
						"editable": false,
						"visible": true,
					},
					{
						"field": "goodsPositionName",
						"dataType": "String",
						"title": "货位",
						// "renderType": "ncReferRender",
						// "editType": "ncReferEditType",
						// "showField": "goodsPositionName",
						// "editOptions": {
						//   "validType": "string"
						// },
						"editable": false,
					},
					{
						"field": "remark",
						"dataType": "String",
						"title": "备注",
						"editable": false,
					},
					{
						"field": "stockOutPerson",
						"dataType": "String",
						"title": "出库人",
						"editable": false,
					},
					{
						"field": "stockOutDate",
						"dataType": "Date",
						"title": "出库日期",
						"editable": false,
					},
					{
						"field": "srcBillCode",
						"dataType": "String",
						"title": "来源单据号",
						"visible": false,
						"editable": false,

					},
					{
						"field": "srcBillBcode",
						"dataType": "String",
						"title": "来源单据行号",
						"visible": false,
						"editable": false,
					},
					{
						"field": "srcBillType",
						"dataType": "String",
						"title": "来源单据类型",
						"visible": false,
						"editable": false,
                        width: "200px"
					},
					{
						"field": "batchCodeCode",
						"dataType": "String",
						"title": "批号",
						"editable": false,
						"visible": false,
					},
					{
						"field": "supplierName",
						"dataType": "String",
						"title": "供应商",
						"visible": false,
						"editable": false,
					},
					{
						"field": "projectName",
						"dataType": "String",
						"title": "项目",
						"editable": false,
						"visible": false,
					},
					{
						"field": "stockStateName",
						"dataType": "String",
						"title": "库存状态",
						"editable": false,
						"visible": false,
					},
					{
						"field": "customerName",
						"dataType": "String",
						"title": "客户",
						"editable": false,
						"visible": false,
					},
				]
			},
			//其他入表体行
			grid7: {
				domid: "grid_otherinItem_dom",
				umeta: {
					"id": "grid_otherinItem",
					"data": "otherinItem",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
						"field": "rowNum",
						"dataType": "String",
						"title": "行号",
						"editable": false,
					},
					{
						"field": "goodsCode",
						"dataType": "String",
						"title": "商品编码",
						"editable": false,
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "商品名称",
						"editable": false,
					},
					{
						"field": "shouldInNum",
						"dataType": "float",
						"title": "应入数量",
						"editable": false,
					},
					{
						"field": "factInNum",
						"dataType": "float",
						"title": "实入数量",
						"editType": "float",
					},
					{
						"field": "unitName",
						"dataType": "String",
						"title": "单位",
						"editable": false,
					},
					{
						"field": "unitPrice",
						"dataType": "String",
						"title": "单价",
						"editable": false,
					},
					{
						"field": "amountMoney",
						"dataType": "String",
						"title": "金额",
						"editable": false,
					},
					{
						"field": "batchNumName",
						"dataType": "String",
						"title": "批次号",
						"editable": false,
					},
					{
						field: "goodsSelection",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails",
						editable: false,
					},
					{
						"field": "goodsVersion",
						"dataType": "String",
						"title": "商品多版本",
						"editable": false,
						"visible": true,
					},
					{
						"field": "goodsPositionName",
						"dataType": "String",
						"title": "货位",
						// "renderType": "ncReferRender",
						// "editType": "ncReferEditType",
						// "showField": "goodsPositionName",
						// "editOptions": {
						//   "validType": "string"
						// },
						"editable": false,
					},
					{
						"field": "remark",
						"dataType": "String",
						"title": "备注",
						"editable": false,
					},
					{
						"field": "stockInPerson",
						"dataType": "String",
						"title": "入库人",
						"editable": false,
					},
					{
						"field": "stockInDate",
						"dataType": "Date",
						"title": "入库日期",
						"editable": false,
					},
					{
						"field": "srcBillCode",
						"dataType": "String",
						"title": "来源单据号",
						"visible": false,
						"editable": false,
					},
					{
						"field": "srcBillBcode",
						"dataType": "String",
						"title": "来源单据行号",
						"visible": false,
						"editable": false,
					},
					{
						"field": "srcBillType",
						"dataType": "String",
						"title": "来源单据类型",
						"visible": false,
						"editable": false,
                        width: "200px"
					},
					{
						"field": "batchCodeCode",
						"dataType": "String",
						"title": "批号",
						"editable": false,
						"visible": false,
					},
					{
						"field": "supplierName",
						"dataType": "String",
						"title": "供应商",
						"visible": false,
						"editable": false,
					},
					{
						"field": "projectName",
						"dataType": "String",
						"title": "项目",
						"editable": false,
						"visible": false,
					},
					{
						"field": "stockStateName",
						"dataType": "String",
						"title": "库存状态",
						"editable": false,
						"visible": false,
					},
					{
						"field": "customerName",
						"dataType": "String",
						"title": "客户",
						"editable": false,
						"visible": false,
					},
				]
			},
			//其他入BOM行
			grid8: {
				domid: "",
				umeta: {
					"id": "grid_otherinItem2_dom",
					"data": "otherinBom",
					"type": "grid",
					"editable": false,
					"showNumCol": true
				},
				columns: [{
						"field": "rowNum",
						"dataType": "String",
						"title": "行号",
					},
                    {
                        field: "parentRowNum",
                        title: "所属商品行号",
                        dataType: "Integer",
                        editable: false
                    },
					{
						"field": "parentGoodsName",
						"dataType": "String",
						"title": "母件商品名称",
						"editable": false
					},
					{
						"field": "goodsCode",
						"dataType": "String",
						"title": "商品编码",
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "商品名称",
					},
					{
						"field": "shouldInNum",
						"dataType": "float",
						"title": "应入数量",
						"editType": "float",
					},
					{
						"field": "factInNum",
						"dataType": "float",
						"title": "实入数量",
						"editType": "float",
					},
					{
						"field": "unitName",
						"dataType": "String",
						"title": "单位",
					},
					{
						"field": "unitPrice",
						"dataType": "String",
						"title": "单价",
					},
					{
						"field": "amountMoney",
						"dataType": "String",
						"title": "金额",
					},
					{
						field: "goodsSelection",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails",
						editable: false,
					},

					{
						"field": "goodsVersion",
						"dataType": "String",
						"title": "商品多版本",
						"editable": false,
						"visible": true,
					},
					{
						"field": "batchCodeCode",
						"dataType": "String",
						"title": "批号",
						"editable": false,
						"visible": false,
					},
					{
						"field": "supplierName",
						"dataType": "String",
						"title": "供应商",
						"visible": false,
						"editable": false,
					},
					{
						"field": "projectName",
						"dataType": "String",
						"title": "项目",
						"editable": false,
						"visible": false,
					},
					{
						"field": "stockStateName",
						"dataType": "String",
						"title": "库存状态",
						"editable": false,
						"visible": false,
					},
					{
						"field": "customerName",
						"dataType": "String",
						"title": "客户",
						"editable": false,
						"visible": false,
					},
					{
						"field": "batchNumName",
						"dataType": "String",
						"title": "批次号",
					},
					{
						"field": "goodsPositionName",
						"dataType": "String",
						"title": "货位",
					},
					{
						"field": "remark",
						"dataType": "String",
						"title": "备注",
					},
					{
						"field": "stockInPerson",
						"dataType": "String",
						"title": "入库人",
					},
					{
						"field": "stockInDate",
						"dataType": "Date",
						"title": "入库时间",
					},
					{
						"field": "srcBillCode",
						"dataType": "String",
						"title": "来源单据号",
						"editable": false,
						"visible": false
					},
					{
						"field": "srcBillBcode",
						"dataType": "String",
						"title": "来源单据行号",
						"editable": false,
						"visible": false
					},
					{
						"field": "srcBillType",
						"dataType": "String",
						"title": "来源单据类型",
						"editable": false,
						"visible": false,
                        width: "200px"
					},
				]
			},
			//其他出BOM行
			grid9: {
				domid: "",
				umeta: {
					"id": "grid_complexBomItem2",
					"data": "otheroutBom",
					"type": "grid",
					"editable": false,
					"showNumCol": true
				},
				columns: [{
						"field": "rowNum",
						"dataType": "String",
						"title": "行号",
					},
                    {
                        field: "parentRowNum",
                        title: "所属商品行号",
                        dataType: "Integer",
                        editable: false
                    },
					{
						"field": "parentGoodsName",
						"dataType": "String",
						"title": "母件商品名称",
						"editable": false
					},
					{
						"field": "goodsCode",
						"dataType": "String",
						"title": "商品编码",
					},
					{
						"field": "goodsName",
						"dataType": "String",
						"title": "商品名称",
					},
					{
						"field": "shouldOutNum",
						"dataType": "float",
						"title": "应出数量",
						"editType": "float",
					},
					{
						"field": "factOutNum",
						"dataType": "float",
						"title": "实出数量",
						"editType": "float",
					},
					{
						"field": "unitName",
						"dataType": "String",
						"title": "单位",
					},
					{
						"field": "unitPrice",
						"dataType": "String",
						"title": "单价",
					},
					{
						"field": "amountMoney",
						"dataType": "String",
						"title": "金额",
					},
					{
						field: "goodsSelection",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails",
						editable: false,
					},

					{
						"field": "goodsVersion",
						"dataType": "String",
						"title": "商品多版本",
						"editable": false,
						"visible": true,
					},
					{
						"field": "batchCodeCode",
						"dataType": "String",
						"title": "批号",
						"editable": false,
						"visible": false,
					},
					{
						"field": "supplierName",
						"dataType": "String",
						"title": "供应商",
						"visible": false,
						"editable": false,
					},
					{
						"field": "projectName",
						"dataType": "String",
						"title": "项目",
						"editable": false,
						"visible": false,
					},
					{
						"field": "stockStateName",
						"dataType": "String",
						"title": "库存状态",
						"editable": false,
						"visible": false,
					},
					{
						"field": "customerName",
						"dataType": "String",
						"title": "客户",
						"editable": false,
						"visible": false,
					},
					{
						"field": "batchNumName",
						"dataType": "String",
						"title": "批次号",
					},
					{
						"field": "goodsPositionName",
						"dataType": "String",
						"title": "货位",
					},
					{
						"field": "remark",
						"dataType": "String",
						"title": "备注",
					},
					{
						"field": "stockOutPerson",
						"dataType": "String",
						"title": "出库人",
					},
					{
						"field": "stockOutDate",
						"dataType": "Date",
						"title": "出库时间",
					},
					{
						"field": "srcBillCode",
						"dataType": "String",
						"title": "来源单据号",
						"editable": false,
						"visible": false
					},
					{
						"field": "srcBillBcode",
						"dataType": "String",
						"title": "来源单据行号",
						"editable": false,
						"visible": false
					},
					{
						"field": "srcBillType",
						"dataType": "String",
						"title": "来源单据类型",
						"editable": false,
						"visible": false,
                        width: "200px"
					},
				]
			},
		}
	}
	return new basemodel(model);
})