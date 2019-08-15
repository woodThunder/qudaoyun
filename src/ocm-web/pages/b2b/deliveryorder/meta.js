define(["ocm_basemodel"], function (basemodel) {
	var model = {
		metas: {
			deliveryMeta: {
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
					deliveryOrderCode: {
						type: "string"
					}, // 发货单号
					deliveryOperater: {
						type: "string"
					}, //发货安排人
					deliveryOrderDate: {
						type: "date"
					}, //发货日期
					// 总数量
					totalNum: {
						type: "numberFloat",
						precision: 2
					},
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
				pageSize: 10
				//是否启用前端缓存
				// pageCache: true
			},
			deliveryItemsMeta: {
				meta: {
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
						type: "numberFloat",
					},
					// 本次安排主数量
					mainNum: {
						type: "numberFloat",
					},
					// 换算率
					conversionRate: {
						type: "string"
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
						refmodel: JSON.stringify(refinfo["warehouse"]),
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
					}, // 赠品
					isClose: {
						type: "string"
					}, // 是否关闭
					stockOutNum: {
						type: "numberFloat"
					}, // 累计出库数量
					signNum: {
						type: "numberFloat"
					}, // 累计签收数量
					srcOrderCode: {
						type: "string"
					}, // 来源订单号
					srcOrderId: {
						type: "string"
					}, // 来源订单主键
					srcOrderItemId: {
						type: "string"
					}, // 来源订单行主键
					version: {
						type: "integer"
					}, //版本
					// 批号
					batchCodeId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["batchCode"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"批号" }'
					},
					batchCodeCode: {
						type: "string"
					},
					batchCodeName: {
						type: "string"
					},
					// 结算财务组织  730需求增加
					settleFinancialOrgId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"结算财务组织" }',
						refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
					},
					// "结算财务组织编码")
					settleFinancialOrgCode: {
						type: "string"
					},
					// "结算财务组织名称")
					settleFinancialOrgName: {
						type: "string"
					},
					// 主数量单位
					mainNumUnitId: {
						type: "string"
					},
					// 主数量单位编码
					mainNumUnitCode: {
						type: "string"
					},
					// 主数量单位名称
					mainNumUnitName: {
						type: "string"
					},
					// 订货单位
					orderNumUnitId: {
						type: "string"
					},
					// 订货单位位编码
					orderNumUnitCode: {
						type: "string"
					},
					// 订货单位单位名称
					orderNumUnitName: {
						type: "string"
					},
					// 项目
					projectId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["project"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"项目" }',
						refparam: '{"EQ_isEnable":"1"}'
					},
					// "项目编码"
					projectCode: {
						type: "string"
					},
					// "项目名称"
					projectName: {
						type: "string"
					},
					// 供应商
					supplierId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["suppliers"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"供应商名称" }',
						refparam: '{"EQ_isEnable":"1"}'
					},
					// "供应商编码"
					supplierCode: {
						type: "string"
					},
					// "供应商名称"
					supplierName: {
						type: "string"
					},
					// 承运商
					logisticsId: {
						type: "string",
						// required: true,
						refmodel: JSON.stringify(refinfo["suppliers"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"承运商名称" }',
						refparam: '{"EQ_isEnable":"1","EQ_isCarrier":"1"}'
					},
					logisticsName: {
						type: "string"
					},
					logisticsCode: {
						type: "string"
					},

					// 上级原价
					supplierPrice: {
						type: "priceFloat"
					},
					netWeight: {
						type: "string"
					},
					rowNetWeight: {
						type: "string"
					},
					rowWeight: {
						type: "string"
					},
					rowVolume: {
						type: "string"
					}
				},
				pageSize: 10
			},
			referSaleOrderItemsMeta: {
				params: {
					cls: "com.yonyou.occ.b2b.service.dto.OrderItemDto"
				},
				meta: {
					// 订单主表主键
					orderId: {
						type: "string"
					},
					orderCode: {
						type: "string"
					},
					orderDate: {
						type: "date"
					},
					// 销售组织
					saleOrgId: {
						type: "string"
					},
					saleOrgCode: {
						type: "string"
					},
					saleOrgName: {
						type: "string"
					},
					// 客户
					customerId: {
						type: "string"
					},
					customerCode: {
						type: "string"
					},
					customerName: {
						type: "string"
					},
					//选配结果主键
					baseGoodsOptId: {
						type: "string"
					},
					baseGoodsOptValue: {
						type: "string"
					},
					// 行号
					rowNum: {
						type: "string"
					},
					// 商品ID
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
					// 商品图片
					goodsImg: {
						type: "string"
					},
					// 产品线
					productLineId: {
						type: "string"
					},
					// 重量
					weight: {
						type: "string"
					},
					// 体积
					volume: {
						type: "string"
					},
					// 订货数量
					saleOrderNum: {
						type: "numberFloat"
					},
					// 本次发货数量 todo...
					arrangeNum: {
						type: "numberFloat"
					},
					// 订货单位
					orderNumUnitId: {
						type: "string"
					},
					// 订货单位编码
					orderNumUnitCode: {
						type: "string"
					},
					// 订货单位名称
					orderNumUnitName: {
						type: "string"
					},
					// 主数量单位
					mainNumUnitId: {
						type: "string"
					},
					// 主数量单位编码
					mainNumUnitCode: {
						type: "string"
					},
					// 主数量单位名称
					mainNumUnitName: {
						type: "string"
					},
					// 单位换算率
					conversionRate: {
						type: "integer"
					},
					// 单价
					salePrice: {
						type: "priceFloat"
					},
					// 成交价
					dealPrice: {
						type: "priceFloat"
					},
					// 冲抵前金额
					amount: {
						type: "amountFloat"
					},
					// 冲抵金额
					offsetAmount: {
						type: "amountFloat"
					},
					// 成交金额
					dealAmount: {
						type: "amountFloat"
					},
					// 币种
					currency: {
						type: "string"
					},
					// 是否为赠品
					isGift: {
						type: "integer"
					},
						// 货补
					goodsSupplement: {
						type: "integer"
					},
					// 促销活动
					promotinId: {
						type: "string"
					},
					// 期望收货日期
					deliveryDate: {
						type: "string"
					},
					// 计划发货日期
					planDeliveryDate: {
						type: "date"
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
						refmodel: JSON.stringify(refinfo["warehouse"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: "{}"
					}, //发货仓库
					deliveryWarehouseName: {
						type: "string"
					},
					deliveryWarehouseCode: {
						type: "string"
					},
					// 订单类型
					orderTypeId: {
						type: "string"
					},
					orderTypeCode: {
						type: "string"
					},
					orderTypeName: {
						type: "string"
					},
					// 收货地址
					addressId: {
						type: "string"
					},
					receiverAddress: {
						type: "string"
					},
					// 收货联系人
					receiver: {
						type: "string"
					},
					// 收货联系电话
					receiverPhone: {
						type: "string"
					},
					// 备注
					remark: {
						type: "string"
					},
					isGift: {
						type: "integer"
					},
					// 已安排数量（累计发货数量）
					deliveryNum: {
						type: "numberFloat"
					},
					version: {
						type: "integer"
					}, //版本号
					// 批号
					batchCodeId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["batchCode"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"批号" }'
					},
					batchCodeCode: {
						type: "string"
					},
					batchCodeName: {
						type: "string"
					},
					// 供应商
					supplierId: {
						type: "string"
					},
					// 供应商编码
					supplierCode: {
						type: "string"
					},
					// 供应商名称
					supplierName: {
						type: "string"
					},
					// 项目
					projectId: {
						type: "string"
					},
					// 项目编码
					projectCode: {
						type: "string"
					},
					// 项目名称
					projectName: {
						type: "string"
					},

					// 承运商
					logisticsId: {
						type: "string",
						// required: true,
						refmodel: JSON.stringify(refinfo["suppliers"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"承运商名称" }',
						refparam: '{"EQ_isEnable":"1","EQ_isCarrier":"1"}'
					},
					logisticsName: {
						type: "string"
					},
					logisticsCode: {
						type: "string"
					},
					operation: {
						type: "string"
					},
					// 上级原价
					supplierPrice: {
						type: "priceFloat"
					},
				},
				pageSize: 10
			},
			referSaleOrderItemBomsMeta: {
				params: {
					cls: "com.yonyou.occ.b2b.service.dto.OrderItemBomDto"
				},
				meta: {
					deliveryOrderId: {
						type: "string"
					}, // 销售订单主键
					deliveryOrderItemId: {
						type: "string"
					}, // 销售订单商品主键
					parentRowNum: {
						type: "string"
					}, // 母剑商品行 行号
					parentGoodsId: {
						type: "string"
					}, // 母剑商品id
					parentGoodsCode: {
						type: "string"
					}, // 母剑商品code
					parentGoodsName: {
						type: "string"
					}, // 母剑商品name
					rowNum: {
						type: "string",
						required: true
					}, //行号
					goodsId: {
						type: "string",
						required: true
					}, //商品
					goodsName: {
						type: "string",
						refmodel: JSON.stringify(refinfo["goods"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: '{"EQ_isEnable":"1"}'
					}, //商品名称
					goodsCode: {
						type: "string",
						required: true
					}, //商品Code
					orderNum: {
						type: "numberFloat",
						required: true
					}, //订货数量
					orderNumUnit: {
						type: "string",
						required: true
					}, //订货数量单位
					mainNum: {
						type: "numberFloat",
						required: true
					}, //订货主数量
					mainNumUnit: {
						type: "string",
						required: true
					}, //订货数量单位
					conversionRate: {
						type: "float",
						required: true
					}, //单位换算率
					// 供应商
					supplierId: {
						type: "string"
					},
					// 供应商编码
					supplierCode: {
						type: "string"
					},
					// 供应商名称
					supplierName: {
						type: "string"
					},
					// 项目
					projectId: {
						type: "string"
					},
					// 项目编码
					projectCode: {
						type: "string"
					},
					// 项目名称
					projectName: {
						type: "string"
					},
					weight: {
						type: "float",
						required: true
					}, //重量
					weightUnit: {
						type: "string",
						required: true
					}, //重量单位
					rowVolume: {
						type: "float",
						required: true
					}, //行合计体积
					volume: {
						type: "float",
						required: true
					}, //体积
					volumeUnit: {
						type: "string",
						required: true
					}, //体积单位
					basePrice: {
						type: "priceFloat",
						required: true
					}, //单价
					salePrice: {
						type: "priceFloat",
						required: true
					}, //销售价格
					amount: {
						type: "amountFloat",
						required: true
					}, //原价格
					dealPrice: {
						type: "priceFloat",
						required: true
					}, //成交价
					dealAmount: {
						type: "amountFloat",
						required: true
					}, //成交金额
					currency: {
						type: "string",
						required: true
					}, //币种
					planDeliveryDate: {
						type: "data",
						required: true
					}, //计划发货日期
					deliveryInvOrgId: {
						type: "string",
						required: true
					}, //发货库存组织
					deliveryWarehouseId: {
						type: "string",
						required: true
					}, //发货仓库呢
					isClose: {
						type: "string",
						required: true
					}, //是否关闭
					remark: {
						type: "string"
					}, //备注
					srcOrderCode: {
						type: "string"
					}, //来源订单号
					srcOrderId: {
						type: "string"
					}, //来源订单主键
					srcOrderItemId: {
						type: "string"
					}, //来源订单行主键
					srcOrderItemBomId: {
						type: "string"
					}, //来源订单bom主键
					srcReqOrderCode: {
						type: "string"
					}, //关联订单号
					srcReqOrderId: {
						type: "string"
					}, //关联订单主键
					srcReqOrderItemId: {
						type: "string"
					}, //关联订单行主键
					srcReqOrderItemBomId: {
						type: "string"
					}, //关联订单bom主键
					deliveryInvOrgId: {
						type: "string",
						required: true
					}, //发货库存组织
					deliveryWarehouseId: {
						type: "string",
						required: true
					}, //发货仓库
					baseGoodsOptId: {
						type: "string"
					}, //选配结果主键
					baseGoodsOptValue: {
						type: "string"
					},
					baseGoodsOptValue: {
						type: "string"
					},
					version: {
						type: "integer"
					}, //版本号
					originalGoodsId: {
						type: "string"
					}, //原始版本商品
					childGoodsQty: {
						type: "float"
					}, //包件标准用量
					existingNum: {
						type: "numberFloat"
					}, //现存量
					dr: {
						type: "integer"
					},

					creator: {
						ype: "string"
					}, //创建人
					//创建时间
					creationTime: {
						type: "datetime"
					},
					//修改人
					modifier: {
						type: "string"
					},
					//修改时间
					modifiedTime: {
						type: "datetime"
					}
				},
				pageSize: 10
			},
			deliveryItemBomsMeta: {
				meta: {
					deliveryOrderId: {
						type: "string"
					}, // 销售订单主键
					deliveryOrderItemId: {
						type: "string"
					}, // 销售订单商品主键
					parentRowNum: {
						type: "string"
					}, // 母件商品行 行号
					parentGoodsId: {
						type: "string"
					}, // 母件商品id
					parentGoodsCode: {
						type: "string"
					}, // 母件商品code
					parentGoodsName: {
						type: "string"
					}, // 母件商品name
					rowNum: {
						type: "string",
						required: true
					}, //行号
					goodsId: {
						type: "string",
						required: true
					}, //商品
					goodsName: {
						type: "string",
						refmodel: JSON.stringify(refinfo["goods"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: '{"EQ_isEnable":"1"}'
					}, //商品名称
					goodsCode: {
						type: "string",
						required: true
					}, //商品Code
					orderNum: {
						type: "numberFloat",
						required: true
					}, //本次安排数量
					mainNum: {
						type: "numberFloat",
						required: true
					}, //本次安排主数量
					// 主数量单位
					mainNumUnitId: {
						type: "string"
					},
					// 主数量单位编码
					mainNumUnitCode: {
						type: "string"
					},
					// 主数量单位名称
					mainNumUnitName: {
						type: "string"
					},
					// 订货单位
					orderNumUnitId: {
						type: "string"
					},
					// 订货单位位编码
					orderNumUnitCode: {
						type: "string"
					},
					// 订货单位单位名称
					orderNumUnitName: {
						type: "string"
					},
					// 供应商
					supplierId: {
						type: "string"
					},
					// 供应商编码
					supplierCode: {
						type: "string"
					},
					// 供应商名称
					supplierName: {
						type: "string"
					},
					// 项目
					projectId: {
						type: "string"
					},
					// 项目编码
					projectCode: {
						type: "string"
					},
					// 项目名称
					projectName: {
						type: "string"
					},
					conversionRate: {
						type: "float",
						required: true
					}, //单位换算率
					weight: {
						type: "float",
						required: true
					}, //重量
					volume: {
						type: "float",
						required: true
					}, //体积
					basePrice: {
						type: "priceFloat",
						required: true
					}, //单价
					salePrice: {
						type: "priceFloat",
						required: true
					}, //销售价格
					amount: {
						type: "amountFloat",
						required: true
					}, //原价格
					dealPrice: {
						type: "priceFloat",
						required: true
					}, //成交价
					dealAmount: {
						type: "amountFloat",
						required: true
					}, //成交金额
					planDeliveryDate: {
						type: "data",
						required: true
					}, //计划发货日期
					deliveryInvOrgId: {
						type: "string",
						required: true
					}, //发货库存组织
					deliveryWarehouseId: {
						type: "string",
						required: true
					}, //发货仓库呢
					isClose: {
						type: "string",
						required: true
					}, //是否关闭
					remark: {
						type: "string",
						required: true
					}, //备注
					srcOrderCode: {
						type: "string",
						required: true
					}, //来源订单号
					srcOrderId: {
						type: "string",
						required: true
					}, //来源订单主键
					srcOrderItemId: {
						type: "string",
						required: true
					}, //来源订单行主键
					srcOrderItemBomId: {
						type: "string",
						required: true
					}, //来源订单bom主键
					baseGoodsOptId: {
						type: "string",
						required: true
					}, //来源订单bom主键
					version: {
						type: "integer",
						required: true
					}, //版本
					originalGoodsId: {
						type: "string",
						required: true
					}, //原始版本商品
					childGoodsQty: {
						type: "float",
						required: true
					}, //包件标准用量
					existingNum: {
						type: "numberFloat"
					}, //现存量
					dr: {
						type: "integer"
					},

					creator: {
						type: "string"
					}, //创建人
					//创建时间
					creationTime: {
						type: "datetime"
					},
					//修改人
					modifier: {
						type: "string"
					},
					//修改时间
					modifiedTime: {
						type: "datetime"
					},
					netWeight: {
						type: "string"
					},
					rowNetWeight: {
						type: "string"
					},
					rowWeight: {
						type: "string"
					},
					rowVolume: {
						type: "string"
					}
				},
				pageSize: 10
			},
			referSaleOrderSearch: {
				meta: {
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
					deliveryOrderCode: {
						type: "string"
					}, // 发货单号
					deliveryOrderDate: {
						type: "date"
					} //发货日期
				},
				pageSize: 10
			},
			saveCheckCreditMeta: {}
		},
		searchs: {
			search1: [
				{
					type: "text",
					key: "deliveryOrderCode",
					label: "发货单号"
				},
				{
					type: "text",
					key: "deliveryOrderItems--saleOrderCode",
					label: "订单号"
				},
				{
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
				},
				{
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
					key: "order--saleOrg",
					label: "销售组织",
					refinfo: "organization_ocm",
					refName: "销售组织",
					required: true,
					clientParam: {
						EQ_orgFuncRel: "01",
						EQ_isEnable: "1",
						AUTH_refdim:"saleOrg"
					}
				},
				{
					type: "refer",
					key: "order--customer",
					label: "客户",
					refinfo: "customer_sale",
					refName: "客户",
					referId: "search_customer",
					enable: false,
					clientParam: {
						AUTH_refdim:"deliveryOrderItems.customer"
					}
				},
				/*
				        // PTQDYGG-1751 发货单参照销售订单生单界面，查询条件订单类型应该去销售订单类型
				        {
				            type: "combo",
				            key: "order--orderType",
				            label: "订单类型",
				            // url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY103",
				            namefield: "name",
				            valuefield: "code",
				            hasAll: true
				        },*/
				{
					type: "refer",
					key: "order--orderType",
					label: "订单类型",
					refinfo: "trantype",
					clientParam: {
						EQ_billTypeId: "SaleOrder",
						"IN_trantypeExtends.fieldValue": "01,03"
					},
					namefield: "name",
					valuefield: "code",
					hasAll: true
				},
				{
					type: "text",
					key: "order--orderCode",
					label: "订单编号",
					refName: "订单编号"
				},
				{
					type: "daterange",
					key: "order--orderDate",
					label: "订单日期"
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
					key: "submit",
					label: "提交",
					iconCls: "icon-tubiao-shenhe",
					// click: "submitBtn"
					click: "submitBillBpm"
				},
				{
					key: "back",
					label: "收回",
					iconCls: "icon-tubiao-shenhe",
					// click: "backBtn"
					click: "unsubmitBillList"
				},
				{
					key: "approve",
					label: "审批",
					iconCls: "icon-tubiao-shenhe",
					// click: "approve"
					click: "approveBill"
				},
				{
					key: "unapprove",
					label: "取消审批",
					iconCls: "icon-tubiao-quxiaoshenhe",
					// click: "unapprove"
					click: "unapproveBill"
				},
				{
					key: "orderOperation",
					label: "整单操作",
					iconCls: "icon-plus",
					clickArg: "$data",
					children: [
						{
							key: "openOrderBill",
							label: "整单打开",
							click: "openOrderBillPanel"
						},
						{
							key: "closeOrderBil",
							label: "整单关闭",
							click: "closeOrderBillPanel"
						}
					]
				}
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
				},
				{
					key: "save",
					label: "保存",
					click: "saveBill",
					cls: "ui-btn-green"
				},
				{
					key: "matchWarehouse",
					label: "匹配仓库",
					click: "resetdelivery",
				}
			],
			button3: [{
					key: "return",
					label: "返回",
					click: "retListPanel"
				},
				{
					key: "edit",
					label: "编辑",
					click: "detail2bill",
					cls: "ui-btn-green delivery-edit-show"
				},
			],
			buttonDetail: [
				{
					key: "export",
					label: "行关闭",
					iconCls: "icon-tubiao-guanbi-xianxing",
					click: "close_row"
				},
				{
					key: "export",
					label: "行打开",
					iconCls: "icon-tubiao-duigou-xianxing",
					click: "open_row"
				}
			]
		},
		details: {
			detail1: [{
					key: "deliveryOrderCode",
					label: "发货单号"
				},
				// {
				//   key: "saleOrgName",
				//   label: "销售组织"
				// },
				{
					key: "deliveryOrderDate",
					type: "date",
					label: "发货安排日期"
				},
				{
					key: "deliveryOperater",
					label: "发货安排人"
				},
				{
					key: "totalNum",
					label: "总数量"
				},
				{
					key: "totalAmount",
					label: "总金额"
				},
				{
					key: "orderStatus",
					label: "单据状态",
					computed: "orderStatus"
				},
				{
					key: "totalNetWeight",
					label: "总净重"
				},
				{
					key: "totalWeight",
					label: "总重量"
				},
				{
					key: "totalVolume",
					label: "总体积"
				},
			]
		},
		grids: {
			grid1: {
				domid: "grid_deliveryOrder_dom",
				umeta: {
					id: "grid_deliveryOrder",
					data: "deliveryOrderList",
					type: "grid",
					editable: false,
					multiSelect: true
				},
				columns: [{
						field: "deliveryOrderCode",
						dataType: "String",
						title: "发货单号",
						renderType: "detailRender",
						width: "200px"
					},
					// {
					//   field: "saleOrgName",
					//   dataType: "String",
					//   title: "销售组织"
					// },
					{
						field: "deliveryOrderDate",
						type: "date",
						title: "发货安排日期"
					},
					{
						field: "deliveryOperater",
						dataType: "String",
						title: "发货安排人"
					},
					{
						field: "totalNum",
						dataType: "String",
						title: "总数量"
					},
					{
						field: "totalAmount",
						dataType: "String",
						title: "总金额"
					},
					{
						field: "orderStatusName",
						dataType: "String",
						title: "状态"
					},
					{
						field: "isClose",
						dataType: "checkbox",
						title: "关闭",
						renderType: "disableBooleanRender"
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						visible: false
					},
					{
						field: "status",
						dataType: "String",
						title: "操作",
						renderType: "operation",
						fixed: true,
						width: "200px"
					}
				]
			},
			grid2: {
				domid: "grid_delivery_item_eidt_dom",
				umeta: {
					id: "grid_delivery_item_edit",
					data: "deliveryOrderItemsList",
					type: "grid",
					editable: true,
					showNumCol: true,
					onBeforeEditFun: "beforeEditCheck"
				},
				columns: [{
						field: "saleOrderCode",
						dataType: "String",
						title: "订单编号",
						editable: false
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户",
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
						field: "baseGoodsOptValue",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails"
					},

					{
						field: "logisticsId",
						dataType: "String",
						title: "承运商",
						// editable: false,
						showField: "logisticsName",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "logisticsId",
								refname: "logisticsName"
							}
						}

					},
					{
						field: "projectId",
						dataType: "String",
						title: "项目",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "projectName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "projectId",
								refname: "projectName"
							}
						}
					},
					{
						field: "supplierId",
						dataType: "String",
						title: "供应商",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "supplierName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "supplierId",
								refname: "supplierName"
							}
						},
						visible: false
					},
					{
						field: "batchCodeId",
						dataType: "String",
						title: "批号",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "batchCodeName",
						editable: false,
						editOptions: {
							validType: "string"
						}
					},
					{
						field: "orderNum",
						dataType: "String",
						title: "本次安排数量",
						required: true
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "本次安排主数量",
						editable: false,
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "单位",
						editable: false,
						visible: false
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "成交价",
						editable: false,
						visible: false
					},
					{
						field: "supplierPrice",
						dataType: "String",
						title: "上级原价",
						editable: false,
						visible: false,
					},
					{
						field: "weight",
						dataType: "Float",
						title: "重量",
						editable: false,
						visible: false
					},
					{
						field: "netWeight",
						dataType: "Float",
						title: "净重",
						editable: false,
						visible: false
					},
					{
						field: "volume",
						dataType: "Float",
						title: "体积",
						editable: false,
						visible: false
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "金额",
						editable: false
					},
					{
						field: "planDeliveryDate",
						dataType: "Date",
						editType: "date",
						title: "计划发货日期"
					},
					{
						field: "deliveryInvOrgId",
						dataType: "String",
						title: "发货库存组织",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "deliveryInvOrgName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "deliveryInvOrgId",
								refcode: "deliveryInvOrgCode",
								refname: "deliveryInvOrgName"
							}
						}
					},
					{
						field: "settleFinancialOrgId",
						dataType: "String",
						title: "结算财务组织",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "settleFinancialOrgName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "settleFinancialOrgId",
								refcode: "settleFinancialOrgCode",
								refname: "settleFinancialOrgName"
							}
						}
					},
					{
						field: "deliveryWarehouseId",
						dataType: "String",
						title: "发货仓库",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "deliveryWarehouseName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "deliveryWarehouseId",
								refcode: "deliveryWarehouseCode",
								refname: "deliveryWarehouseName"
							}
						}
					},
					{
						field: "receiverAddress",
						dataType: "String",
						title: "收货地址",
						editable: false
					},
					{
						field: "receiver",
						dataType: "String",
						title: "收货联系人",
						editable: false
					},
					{
						field: "receiverPhone",
						dataType: "String",
						title: "收货联系电话",
						editable: false
					},
					{
						field: "remark",
						dataType: "String",
						title: "备注"
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						editable: false,
						title: "货补",
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						editable: false,
						renderType: "disableBooleanRender"
					},
					{
						field: "stockOutNum",
						dataType: "String",
						title: "累计出库数量",
						editable: false
					},
					{
						field: "signNum",
						dataType: "String",
						title: "累计签收数量",
						editable: false
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					}
				]
			},
			grid3: {
				domid: "grid_delivery_item_detail_dom",
				umeta: {
					id: "grid_delivery_item_detail",
					data: "deliveryOrderItemsList",
					type: "grid",
					editable: false,
					showNumCol: true,
					multiSelect: true
				},
				columns: [{
						field: "saleOrderCode",
						dataType: "String",
						title: "订单编号"
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户"
					},
					{
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
						field: "baseGoodsOptValue",
						dataType: "String",
						title: "商品选配",
						renderType: "goodsOptDetails"
					},

					{
						field: "batchCodeName",
						dataType: "String",
						title: "批号"
					},
					{
						field: "supplierName",
						dataType: "String",
						title: "供应商",
						visible: false
					},
					{
						field: "logisticsName",
						dataType: "String",
						title: "承运商",
					},
					{
						field: "projectName",
						dataType: "String",
						title: "项目",
						visible: false
					},
					{
						field: "orderNum",
						dataType: "String",
						title: "本次安排数量",
						required: true
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "本次安排主数量",
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "单位",
						visible: false
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位",
						visible: false
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "成交价",
						visible: false
					},
					{
						field: "supplierPrice",
						dataType: "String",
						title: "上级原价",
						visible: false
					},
					{
						field: "weight",
						dataType: "Float",
						title: "重量",
						visible: false
					},
					{
						field: "netWeight",
						dataType: "Float",
						title: "净重",
						visible: false
					},
					{
						field: "volume",
						dataType: "Float",
						title: "体积",
						visible: false
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "金额"
					},
					{
						field: "planDeliveryDate",
						dataType: "Date",
						title: "计划发货日期"
					},
					{
						field: "deliveryInvOrgName",
						dataType: "String",
						title: "发货库存组织"
					},
					{
						field: "settleFinancialOrgName",
						dataType: "String",
						title: "结算财务组织 "
					},
					{
						field: "deliveryWarehouseName",
						dataType: "String",
						title: "发货仓库"
					},
					{
						field: "receiverAddress",
						dataType: "String",
						title: "收货地址"
					},
					{
						field: "receiver",
						dataType: "String",
						title: "收货联系人"
					},
					{
						field: "receiverPhone",
						dataType: "String",
						title: "收货联系电话"
					},
					{
						field: "remark",
						dataType: "String",
						title: "备注"
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						renderType: "disableBooleanRender"
					},
					{
						field: "isClose",
						dataType: "checkbox",
						title: "关闭",
						renderType: "disableBooleanRender"
					},
					{
						field: "stockOutNum",
						dataType: "String",
						title: "累计出库数量"
					},
					{
						field: "signNum",
						dataType: "String",
						title: "累计签收数量"
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					}
				]
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
						field: "orderCode",
						dataType: "String",
						width: "160px",
						title: "订单编号"
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户"
					},
					{
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
						title: "主数量",
						visible: false
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位",
						visible: false
					},

					{
						field: "supplierName",
						dataType: "String",
						title: "供应商",
						visible: false
					},
					{
						field: "logisticsName",
						dataType: "String",
						title: "承运商",
					},
					{
						field: "projectName",
						dataType: "String",
						title: "项目",
						visible: false
					},
					{
						field: "batchCodeName",
						dataType: "String",
						title: "批号",
						visible: false
					},
					{
						field: "saleOrderNum",
						dataType: "String",
						title: "订货量"
					},



					{
						field: "deliveryDate",
						dataType: "Date",
						title: "要求到货日期"
					},
					{
						field: "salePrice",
						dataType: "String",
						title: "单价",
						visible: false
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "成交价",
						visible: false
					},
					{
						field: "supplierPrice",
						dataType: "String",
						title: "上级原价",
						visible: false,
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "成交金额",
						visible: false
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						visible: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						visible: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "weight",
						dataType: "String",
						title: "重量",
						visible: false
					},
					{
						field: "weight",
						dataType: "String",
						title: "体积",
						visible: false
					},
					{
						field: "planDeliveryDate",
						dataType: "Date",
						renderType: "dateRender",
						title: "计划发货日期"
					},
					{
						field: "deliveryInvOrgName",
						dataType: "String",
						title: "发货库存组织"
					},
					{
						field: "deliveryWarehouseName",
						dataType: "String",
						title: "发货仓库"
					},
					{
						field: "receiverAddress",
						dataType: "String",
						title: "收货地址"
					},
					{
						field: "version",
						dataType: "Integer",
						title: "版本号",
						editable: false
					}
				]
			},
			grid5: {
				domid: "grid_referListItem_saleorder_dom",
				umeta: {
					id: "grid_referListItem_saleorder",
					data: "selectedreferListItems",
					type: "grid",
					editable: true,
					showNumCol: true,
					onBeforeEditFun: "beforeEditCheck2"
				},
				columns: [{
						field: "orderCode",
						dataType: "String",
						title: "订单编号",
						width: "160px",
						editable: false
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户",
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
						field: "mainNum",
						dataType: "String",
						title: "主数量",
						editable: false,
						visible: false
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位",
						visible: false
					},
					{
						field: "supplierName",
						dataType: "String",
						title: "供应商",
						visible: false
					},

					{
						field: "projectName",
						dataType: "String",
						title: "项目",
						visible: false
					},
					{
						field: "logisticsId",
						dataType: "String",
						title: "承运商",
						// editable: false,
						showField: "logisticsName",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "logisticsId",
								refname: "logisticsName"
							}
						}

					},
					{
						field: "saleOrderNum",
						dataType: "String",
						title: "订货量",
						editable: false
					},
					{
						field: "batchCodeId",
						dataType: "String",
						title: "批号",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "batchCodeName",
						editOptions: {
							validType: "string"
						}
					},
					{
						field: "arrangeNum",
						dataType: "String",
						title: "本次安排数量",
						required: true
					},
					{
						field: "deliveryDate",
						dataType: "Date",
						title: "要求到货日期",
						editable: false
					},
					{
						field: "salePrice",
						dataType: "String",
						title: "单价",
						editable: false,
						visible: false
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "成交价",
						editable: false,
						visible: false
					},
					{
						field: "supplierPrice",
						dataType: "String",
						title: "上级原价",
						visible: false,
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "成交金额",
						editable: false,
						visible: false
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						editable: false,
						visible: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						editable: false,
						visible: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "weight",
						dataType: "String",
						title: "重量",
						editable: false,
						visible: false
					},
					{
						field: "weight",
						dataType: "String",
						title: "体积",
						editable: false,
						visible: false
					},
					{
						field: "planDeliveryDate",
						dataType: "Date",
						editType: "date",
						title: "计划发货日期"
					},
					{
						field: "deliveryInvOrgId",
						dataType: "String",
						title: "发货库存组织",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "deliveryInvOrgName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "deliveryInvOrgId",
								refcode: "deliveryInvOrgCode",
								refname: "deliveryInvOrgName"
							}
						}
					},
					{
						field: "deliveryWarehouseId",
						dataType: "String",
						title: "发货仓库",
						renderType: "ncReferRender",
						editType: "ncReferEditType",
						showField: "deliveryWarehouseName",
						editOptions: {
							validType: "string",
							rel: {
								refpk: "deliveryWarehouseId",
								refcode: "deliveryWarehouseCode",
								refname: "deliveryWarehouseName"
							}
						}
					},
					{
						field: "receiverAddress",
						dataType: "String",
						editable: false,
						title: "收货地址"
					},
					{
						field: "remark",
						dataType: "String",
						title: "备注"
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					},
					{
						field: "operation",
						dataType: "String",
						title: "操作",
						editable: false,
						renderType: "rowRemove",
						fixed: true,
						width: "100px"
					}
				]
			},
			grid6: {
				domid: "",
				umeta: {
					id: "grid_refer_item_bom",
					data: "referSaleOrderItemBomsList",
					type: "grid",
					editable: false,
					showNumCol: true
				},
				columns: [{
						field: "rowNum",
						dataType: "String",
						title: "行号"
					},
					{
						field: "parentGoodsName",
						dataType: "String",
						title: "母件商品名称",
						editable: false
					},
					{
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
						field: "orderNum",
						dataType: "String",
						title: "订货数量",
						required: true
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "主数量"
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位"
					},
					{
						field: "childGoodsQty",
						dataType: "String",
						title: "标准用量"
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "单价",
						required: true
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "金额"
					},
					{
						field: "isClose",
						dataType: "checkbox",
						title: "关闭",
						width: "130px",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						editable: false,
						visible: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						editType: "float",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						editable: false,
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						editable: false,
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						editable: false,
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						editable: false,
						visible: false
					}
				]
			},
			grid7: {
				domid: "",
				umeta: {
					id: "grid_referListItem_bom_saleorder",
					data: "selectedreferListItemBoms",
					type: "grid",
					editable: false,
					showNumCol: true
				},
				columns: [{
						field: "rowNum",
						dataType: "String",
						title: "行号"
					},
					{
						field: "parentGoodsName",
						dataType: "String",
						title: "母件商品名称",
						editable: false
					},
					{
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
						field: "orderNum",
						dataType: "String",
						title: "订货数量",
						required: true
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "主数量"
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位"
					},
					{
						field: "childGoodsQty",
						dataType: "String",
						title: "标准用量"
					},
					{
						field: "existingNum",
						dataType: "String",
						title: "现存量"
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "单价",
						required: true
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "金额"
					},
					{
						field: "isClose",
						dataType: "checkbox",
						title: "关闭",
						width: "130px",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						editable: false,
						visible: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						editType: "float",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						editable: false,
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						editable: false,
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						editable: false,
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						editable: false,
						visible: false
					}
				]
			},
			grid8: {
				domid: "grid_delivery_item_bom_detail_dom",
				umeta: {
					id: "grid_delivery_item-bom_detail",
					data: "deliveryOrderItemBomsList",
					type: "grid",
					editable: false,
					showNumCol: true
				},
				columns: [{
						field: "rowNum",
						dataType: "String",
						title: "行号"
					},
					{
						field: "parentGoodsName",
						dataType: "String",
						title: "母件商品名称",
						editable: false
					},
					{
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
						field: "baseGoodsOptValue",
						dataType: "String",
						title: "商品选配"
					},
					{
						field: "orderNum",
						dataType: "Stringfloat",
						title: "订货数量",
						required: true
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "主数量"
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位"
					},
					{
						field: "childGoodsQty",
						dataType: "String",
						title: "标准用量"
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "单价",
						required: true
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "金额"
					},
					{
						field: "isClose",
						dataType: "checkbox",
						title: "关闭",
						width: "130px",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						editable: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						editType: "float",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						editable: false,
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						editable: false,
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						editable: false,
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						editable: false,
						visible: false
					}
				]
			},
			grid9: {
				domid: "grid_delivery_item_bom_edit_dom",
				umeta: {
					id: "grid_delivery_item-bom_edit",
					data: "deliveryOrderItemBomsList",
					type: "grid",
					editable: false,
					showNumCol: true
				},
				columns: [
					/* {
					  field: "rowNum",
					  dataType: "String",
					  title: "行号"
					}, */
					{
						field: "parentGoodsName",
						dataType: "String",
						title: "母件商品名称",
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
						field: "baseGoodsOptValue",
						dataType: "String",
						title: "商品选配"
					},
					{
						field: "orderNum",
						dataType: "String",
						title: "订货数量",
						required: true
					},
					{
						field: "mainNum",
						dataType: "String",
						title: "主数量",
						editable: false
					},
					{
						field: "mainNumUnitName",
						dataType: "String",
						title: "主数量单位"
					},
					{
						field: "childGoodsQty",
						dataType: "String",
						title: "标准用量",
						editable: false
					},
					{
						field: "dealPrice",
						dataType: "String",
						title: "单价",
						required: true,
						editable: false
					},
					{
						field: "dealAmount",
						dataType: "String",
						title: "金额",
						editable: false
					},
					{
						field: "isClose",
						dataType: "checkbox",
						title: "关闭",
						width: "130px",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "goodsSupplement",
						dataType: "checkbox",
						title: "货补",
						editable: false,
						renderType: "disableBooleanRender",
					},
					{
						field: "isGift",
						dataType: "checkbox",
						title: "赠品",
						editType: "float",
						renderType: "disableBooleanRender",
						editable: false
					},
					{
						field: "version",
						dataType: "integer",
						title: "版本号",
						editable: false
					},
					{
						field: "creator",
						dataType: "String",
						title: "创建人",
						editable: false,
						visible: false
					},
					{
						field: "creationTime",
						dataType: "Date",
						title: "创建时间",
						editable: false,
						visible: false
					},
					{
						field: "modifier",
						dataType: "String",
						title: "修改人",
						editable: false,
						visible: false
					},
					{
						field: "modifiedTime",
						dataType: "Date",
						title: "修改时间",
						editable: false,
						visible: false
					}
				]
			},
			saveCheckCreditDetail: {
				domid: "saveCheckCreditDetail",
				umeta: {
					id: "check_credit_detail",
					data: "saveCheckCreditDetailItems",
					type: "grid",
					editable: false
				},
				columns: [{
						field: "ctreditCtrlStrategyName",
						dataType: "String",
						title: "控制策略"
					},
					{
						field: "organizationName",
						dataType: "String",
						title: "财务组织"
					},
					{
						field: "saleOrgName",
						dataType: "String",
						title: "销售组织"
					},
					{
						field: "trantypeName",
						dataType: "String",
						title: "订单类型"
					},
					{
						field: "customerName",
						dataType: "String",
						title: "客户"
					},
					{
						field: "occupyOrderStatus",
						dataType: "String",
						title: "信用占用开始时点"
					},
					{
						field: "creditCtrlType",
						dataType: "String",
						title: "控制方式",
						dataSource: [{
								value: "01",
								name: "提示"
							},
							{
								value: "02",
								name: "严格控制"
							}
						]
					},
					{
						field: "creditLimit",
						dataType: "String",
						title: "信用额度"
					},
					{
						field: "occupyLimit",
						dataType: "String",
						title: "信用占用"
					},
					{
						field: "creditBeyondMoney",
						dataType: "String",
						title: "超信用金额"
					},
				]
			},
		}
	};
	return new basemodel(model);
});