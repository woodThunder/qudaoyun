define(["ocm_basemodel"], function(basemodel) {
	var model = {
		metas: {
			//订单列表
			orderMeta: {
				params: {
					"cls": "com.yonyou.ocm.b2c.service.dto.OrderDto"
				},
				meta: {
					id: {
						type: 'string'
					}, //id
					intercepterReason: {
						type: 'string',
						required: true
					},
					deliveredTogether: {
						type: 'string'
					},
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
						required: true
					}, //电商订单号
					pcode: {
						type: 'string',
						required: true
					}, //平台订单号
					deliveryWarning: {
						type: 'string'
					},
					auditWarning: {
						type: 'string'
					},
					orderSource: {
						type: 'string',
						required: true
					}, //订单来源
					orderType: {
						type: 'string',
						required: true
					}, //订单类型
					platformId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['b2cplatform']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //平台ID
					platformName: {
						type: 'string'
					}, //平台名称
					storeId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //店铺ID
					storeName: {
						type: 'string'
					}, //店铺名称
					buyer: {
						type: 'string'
					}, //顾客
					bookTime: {
						type: 'datetime'
					}, //下单时间
					auditTime: {
						type: 'datetime'
					}, //审核时间
					payTime: {
						type: 'datetime'
					}, //付款时间
					deliveryTime: {
						type: 'datetime'
					}, //要求送货时间
					logisticsMode: {
						type: 'string'
					}, //物流方式
					serviceMode: {
						type: 'string'
					}, //配送方式
					supplierId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['b2csupplier']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //供应商ID
					supplierName: {
						type: 'string'
					}, //供应商名称
					belongOffice: {
						type: 'string'
					}, //办事处
					serviceProvider: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['B2CfourdDList']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //服务商ID
					serviceProviderName: {
						type: 'string'
					}, //服务商名称
					payMode: {
						type: 'string'
					}, //支付方式
					billStatus: {
						type: 'string'
					}, //订单状态
					sendStatus: {
						type: 'string'
					}, //发货状态
					payStatus: {
						type: 'string'
					}, //付款状态
					returnGoodsStatus: {
						type: 'string'
					}, //关闭状态
					returnFeeStatus: {
						type: 'string'
					}, //退款状态
					payCheckStatus: {
						type: 'string'
					}, //收款确认状态
					isLock: {
						type: 'integer'
					}, //冻结标识
					lockReason: {
						type: 'string'
					}, //冻结原因
					receipt: {
						type: 'string'
					}, //配送回执
					receiptStatus: {
						type: 'string'
					}, //配送回执确认状态
					isAddPromotion: {
						type: 'integer'
					}, //已自动添加优惠
					isException: {
						type: 'integer'
					}, //异常标识
					exceptionType: {
						type: 'string'
					}, //异常原因
					isUrgent: {
						type: 'integer'
					}, //加急标识
					isPromo: {
						type: 'integer'
					}, //已促销
					buyerMsg: {
						type: 'string'
					}, //买家留言
					sellerRemark: {
						type: 'string'
					}, //卖家备注
					isSynDispStatus: {
						type: 'integer'
					}, //是否需要同步发货状态
					issynsuccess: {
						type: 'integer'
					}, //发货状态同步标识
					synmsg: {
						type: 'string'
					}, //发货状态同步异常信息
					isSplitDispatch: {
						type: 'integer'
					}, //是否允许拆单发货
					totalNum: {
						type: 'float'
					}, //总数量
					totalFee: {
						type: 'float'
					}, //总金额
					freight: {
						type: 'float'
					}, //运费
					rOrderPcode: {
						type: 'string'
					}, //关联订单号
					rOrderId: {
						type: 'string'
					}, //关联订单主键
					freightOrderFee: {
						type: 'float'
					}, //关联运费
					pOrderId: {
						type: 'string'
					}, //主订单主键
					pOrderCode: {
						type: 'string'
					}, //主订单号
					pkOrgId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['organization_ocm']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"商品列表"}'
					}, //组织主键
					pkOrgCode: {
						type: 'string'
					}, //组织编码
					pkOrgName: {
						type: 'string'
					}, //组织名称
					orderReceiverName: {
						type: 'string',
						required: true
					}, //收货人姓名
					orderReceiverPhone: {
						type: 'string'
					}, //联系电话
					orderReceiverProvince: {
						type: 'string'
					}, //省
					orderReceiverCity: {
						type: 'string'
					}, //市
					orderReceiverDistrict: {
						type: 'string'
					}, //区
					orderReceiverTown: {
						type: 'string'
					}, //街道
					orderReceiverAddress: {
						type: 'string'
					}, //收货地址
					comment: {
						type: 'string',
						required: true
					}, //订单备注
					storeLocationName: {
						type: 'string',
					},
					customerName: {
						type: "string"
					}, //经销商
					downStreamOrderCode: {
						type: "string"
					}, //下游单据号
					takeUpNumber: {
						type: 'BigDecimal'
					}, //预占数量
					takeUpStatus: {
						type: 'integer'
					}, //预占状态
					warehouseName: {
						type: "string"
					}, //仓库名称
					supplierName: {
						type: 'string'
					}, //供应商名称
					changedLogisticsCompanyName: {
						type: "string"
					}, //指定物流公司
				},
				pageSize: 10,
				//是否启用前端缓存
				// pageCache: true
			},
			//截单原因
			irMeta: {
				meta: {
					intercepterReason: {
						type: 'string',
						required: true
					},
				}
			},
			//订单详情
			orderDetailMeta: {
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
						required: true
					}, //电商订单号
					pcode: {
						type: 'string',
						required: true
					}, //平台订单号
					orderSource: {
						type: 'string',
						required: true
					}, //订单来源
					orderType: {
						type: 'string',
						required: true
					}, //订单类型
					platformId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['b2cplatform']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //平台ID
					platformName: {
						type: 'string'
					}, //平台名称
					storeId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //店铺ID
					storeName: {
						type: 'string'
					}, //店铺名称
					buyer: {
						type: 'string'
					}, //顾客
					bookTime: {
						type: 'datetime'
					}, //下单时间
					auditTime: {
						type: 'datetime'
					}, //审核时间
					payTime: {
						type: 'datetime'
					}, //付款时间
					deliveryTime: {
						type: 'datetime'
					}, //要求送货时间
					logisticsMode: {
						type: 'string'
					}, //物流方式
					serviceMode: {
						type: 'string'
					}, //配送方式
					supplierId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['b2csupplier']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //供应商ID
					supplierName: {
						type: 'string'
					}, //供应商名称
					belongOffice: {
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['organization_auth_b2c']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"refName":"办事处"}',
					}, //办事处参照
					belongOfficeName: {
						type: 'string',
					}, //办事处名称
					serviceProviderId: {
						type: "string",
						"refmodel": JSON.stringify(refinfo['B2CfourdDList']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //服务商ID
					serviceProviderName: {
						type: 'string'
					}, //服务商名称
					shiptopartyId: {
						type: "string",
						"refmodel": JSON.stringify(refinfo['channelCusStores']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"送达方","strFieldCode": ["refcode", "refname"],"strFieldName": ["编码", "名称"]}',
						"refparam": '{"EQ_isEnable":"1"}'
					}, //送达方参照
					shiptopartyName: {
						type: 'string'
					}, //送达方名称
					payMode: {
						type: 'string'
					}, //支付方式
					billStatus: {
						type: 'string'
					}, //订单状态
					sendStatus: {
						type: 'string'
					}, //发货状态
					payStatus: {
						type: 'string'
					}, //付款状态
					returnGoodsStatus: {
						type: 'string'
					}, //关闭状态
					returnFeeStatus: {
						type: 'string'
					}, //退款状态
					payCheckStatus: {
						type: 'string'
					}, //收款确认状态
					isLock: {
						type: 'integer'
					}, //冻结标识
					receipt: {
						type: 'string'
					}, //配送回执
					receiptStatus: {
						type: 'string'
					}, //配送回执确认状态
					isAddPromotion: {
						type: 'integer'
					}, //已自动添加优惠
					isException: {
						type: 'integer'
					}, //异常标识
					exceptionType: {
						type: 'string'
					}, //异常原因
					isUrgent: {
						type: 'integer'
					}, //加急标识
					isPromo: {
						type: 'integer'
					}, //已促销
					promStatus: {
						type: 'integer'
					}, //活动作废
					buyerMsg: {
						type: 'string'
					}, //买家留言
					sellerRemark: {
						type: 'string'
					}, //卖家备注
					isSynDispStatus: {
						type: 'integer'
					}, //是否需要同步发货状态
					issynsuccess: {
						type: 'integer'
					}, //发货状态同步标识
					synmsg: {
						type: 'string'
					}, //发货状态同步异常信息
					isSplitDispatch: {
						type: 'integer'
					}, //是否允许拆单发货
					totalNum: {
						type: 'float'
					}, //总数量
					totalFee: {
						type: 'float'
					}, //总金额
					freight: {
						type: 'float'
					}, //运费
					rOrderPcode: {
						type: 'string'
					}, //关联订单号
					rOrderId: {
						type: 'string'
					}, //关联订单主键
					freightOrderFee: {
						type: 'float'
					}, //关联运费
					pOrderId: {
						type: 'string'
					}, //主订单主键
					pOrderCode: {
						type: 'string'
					}, //主订单号
					pkOrgId: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['organization_ocm']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"商品列表"}'
					}, //组织主键
					pkOrgCode: {
						type: 'string'
					}, //组织编码
					pkOrgName: {
						type: 'string'
					}, //组织名称
					orderReceiverName: {
						type: 'string',
						required: true,
						maxLength: 10
					}, //收货人姓名
					orderReceiverPhone: {
						type: 'string',
						required: true,
						validType: "phone",
					}, //联系手机
					orderReceiverTel: {
						type: 'string',
						maxLength: 30
					}, //联系电话
					//			orderReceiverProvince: {
					//				type: 'string'
					//			}, //省
					//			orderReceiverCity: {
					//				type: 'string'
					//			}, //市
					//			orderReceiverDistrict: {
					//				type: 'string'
					//			}, //区
					//			orderReceiverTown: {
					//				type: 'string'
					//			}, //街道
					orderReceiverAddress: {
						type: 'string',
						required: true,
						maxLength: 100
					}, //收货地址
					orderReceiverProvince: { //注册所在省份ID
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['region']),
						"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
						"refparam": '{"EQ_areaLevel":"1"}'
					},
					orderReceiverCity: { //注册所在城市ID
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['region']),
						"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
						"refparam": '{"EQ_areaLevel":"2"}'
					},
					orderReceiverDistrict: { //注册所在县ID
						type: 'string',
						required: true,
						"refmodel": JSON.stringify(refinfo['region']),
						"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
						"refparam": '{"EQ_areaLevel":"3"}'
					},
					orderReceiverTown: { //注册所在街道/镇Id
						type: 'string',
						"refmodel": JSON.stringify(refinfo['region']),
						"refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
						"refparam": '{"EQ_areaLevel":"4"}'
					},
					logisticsCode: {
						type: "string"
					}, //快递公司编码
					logisticsName: {
						type: 'string'
					}, //快递公司
					waybillNo: {
						type: 'string',
						maxLength: 30
					}, //快递单号
					logisticsInfo: {
						type: 'string',
						maxLength: 200
					}, //快递其他信息
					totalReceivableFee: {
						type: 'float'
					}, //总成交金额
					totalSettlementFee: {
						type: 'float'
					}, //总结算金额
					totalClosedFee: {
						type: 'float'
					}, //总关闭金额
					isDelay: {
						type: "string"
					}, //延期发货标识
					delayTimes: {
						type: "integer"
					}, //延期次数
					delayDays: {
						type: "integer"
					}, //延期总天数
				}
			},
			//商品信息
			goodsMeta: {
				params: {
					"cls": "com.yonyou.ocm.b2c.service.dto.OrderGoodsDto"
				},
				meta: {
					id: {
						type: "string"
					}, //
					serialnum: {
						type: "string"
					}, //行号
					goodsSource: {
						type: "string"
					}, //商品来源
					goodsId: {
						type: "string"
					}, //商品
					sosonid: {
						type: "string"
					}, //平台子订单号
					goodsCategory: {
						type: "string"
					}, //商品类别
					logisticsMode: {
						type: "string"
					}, //物流方式
					isVir: {
						type: "string",
						default: '1'
					}, //虚拟商品
					isCombine: {
						type: "integer"
					}, //是否组合
					adjustFee: {
						type: "float"
					}, //手工调整金额
					receivableFee: {
						type: "float"
					}, // 应收金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					limitPrice: {
						type: "float"
					}, // 最低零售价
					costPrice: {
						type: "float"
					}, // 成本价
					giftSource: {
						type: "string"
					}, //赠品来源
					combineGoodsId: {
						type: "string"
					}, //商品主键
					combineGoodsCode: {
						type: "string"
					}, //商品编码
					combineGoodsName: {
						type: "string"
					}, //商品名称
					combineGoodsNum: {
						type: "string"
					}, //商品数量
					goodsNumRate: {
						type: "string"
					}, //商品数量比
					warehouseId: {
						"refmodel": JSON.stringify(refinfo['warehouse']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
						"refparam": '{"EQ_isEnable":"1"}'
					}, //仓库
					warehouseCode: {
						type: "string"
					}, //仓库编码
					sidyMny: {
						type: "float"
					},
					warehouseName: {
						type: "string"
					}, //仓库名称
					takeUpNumber: {
						type: 'BigDecimal'
					}, //预占数量
					takeUpStatus: {
						type: 'integer'
					}, //预占状态
					takeUpDate: {
						type: 'datetime'
					}, //预占时间
					customerId: {
						"refmodel": JSON.stringify(refinfo['customer']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"经销商"}',
						"refparam": '{"EQ_isEnable":"1"}'
					}, //经销商ID
					customerName: {
						type: "string"
					}, //经销商名称
					downStreamOrderCode: {
						type: "string"
					}, //下游单据号
					isPushDownStreamOrder: {
						type: "integer"
					}, //已推送下游订单
					supplierId: {
						"refmodel": JSON.stringify(refinfo['suppliers']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
						"refparam": '{"EQ_isEnable":"1"}'
					}, //供应商ID
					supplierCode: {
						type: "string"
					}, //供应商编码
					supplierName: {
						type: "string"
					}, //供应商名称
					deliveredTogether: {
						type: "string"
					}, //合并发单流水号
					deliveredTogetherStatus: {
						type: "string"
					}, //合并发货状态
					interceptDownStreamOrder: {
						type: "string"
					}, //截单标识
					interceptfailReason: {
						type: "string"
					}, //截单失败原因
					returnNum: {
						type: "string"
					}, //退货数量
					skuCode: {
						type: "string",
						required: true,
						"refmodel": JSON.stringify(refinfo['goods-no-version']),
						"refcfg": '{"ctx":"/uitemplate_web","refName":"商品"}'
					}, //商品编码
					skuName: {
						type: "string"
					}, //商品名称
					buyNum: {
						type: "float"
					}, //购买数量
					sendNum: {
						type: "float"
					}, //发货数量
					closeNum: {
						type: "float"
					}, // 关闭数量
					price: {
						type: "float"
					}, //单价
					discountFee: {
						type: "float"
					}, //商品优惠
					returnFeeStatus: {
						type: "string"
					}, //退款状态
					totalPrice: {
						type: "float"
					}, //总价
					settlementFee: {
						type: "float"
					}, //结算金额
					returnFee: {
						type: "float"
					}, //退款金额
					remark: {
						type: "string"
					}, //备注
					isOwn: {
						type: "string"
					}, //是否欠件
					isGift: {
						type: "integer"
					}, //是否赠品
					applyNum: {
						type: "string"
					}, //申请退款数量
					applyFee: {
						type: "integer"
					}, //申请退款金额
				}
			},
			//促销信息
			promMeta: {
				params: {
					"cls": "com.yonyou.ocm.b2c.service.dto.OrderPromotionDto"
				},
				meta: {
					id: {
						type: "string"
					}, //
					orderId: {
						type: "string"
					}, //订单主键
					promotionSource: {
						type: "string"
					}, //优惠类型
					promotionName: {
						type: "string"
					}, //优惠方案名称
					promotionId: {
						type: "string"
					}, //促销活动ID
					promotionModeId: {
						type: "string"
					}, // 促销方式ID
					promEndTime: {
						type: "datetime"
					}, //活动结束时间

				}
			},
			//关联订单信息
			linkMeta: {
				params: {
					"cls": "com.yonyou.ocm.b2c.service.dto.OrderLinkDto"
				},
				meta: {
					id: {
						type: "string"
					}, //
					code: {
						type: "string"
					}, //电商订单号
					pcode: {
						type: "string"
					}, //平台订单号
					orderType: {
						type: "string"
					}, //订单类型
					buyer: {
						type: "string"
					}, //顾客ID
					receivableFee: {
						type: "float"
					}, // 成交金额
					linkFee: {
						type: "float"
					}, //关联金额

				}
			},
			//关联运费
			freightMeta: {
				meta: {
					id: {
						type: "string"
					}, //
					code: {
						type: "string"
					}, //电商订单号
					pcode: {
						type: "string"
					}, //平台订单号
					payTime: {
						type: "string"
					}, //付款时间
					billStatus: {
						type: "string"
					}, //订单状态
					orderType: {
						type: "string"
					}, //订单类型
					buyer: {
						type: 'string'
					}, //顾客Id
					orderReceiverName: {
						type: "string",
						required: true
					}, //顾客姓名
					freight: {
						type: "float"
					}, //运费
					totalReceivableFee: {
						type: "float"
					}, // 总金额
				}
			},
			//商品换购--弹出子表信息
			productBuyMete: {
				meta: {
					id: {
						type: "string"
					}, //
					orderCode: {
						type: "string"
					}, //电商订单号
					orderPcode: {
						type: "string"
					}, //平台订单号
					orderBillStatus: {
						type: "string"
					}, //订单状态
					goodsCategory: {
						type: "string"
					}, //订单类型
					orderBuyer: {
						type: 'string'
					}, //顾客Id
					skuCode: {
						type: "string"
					}, //商品编码
					skuName: {
						type: "float"
					}, //商品名称
					buyNum: {
						type: "string",
						regExp: /^\d+$/
					}, // 购买数量
					closeNum: {
						type: "float"
					}, // 关闭数量
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, // 结算金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					isTrade: {
						type: "float"
					}, // 换购商品
					num: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量
					amount: {
						type: "float"
					}, // 本次关联金额
				}
			},
			//商品换购--商品
			productBuyChangeMete: {
				meta: {
					id: {
						type: "string"
					}, //
					goodsId: {
						'refmodel': JSON.stringify(refinfo['goods-no-version']),
						'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":"true"}',
						//						"refparam": '{"EQ_pkcombineGoodsCategory":"0"}'
					}, //商品编码
					skuCode: {
						type: "float"
					}, //商品编码
					skuName: {
						type: "float"
					}, //商品名称
					buyNum: {
						type: "float"
					}, // 购买数量
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, // 结算金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					closeNum: {
						type: "float"
					}, // 关闭数量
				}
			},
			//商品升级--低升高
			upgradeHightMete: {
				meta: {
					id: {
						type: "string"
					}, //
					code: {
						type: "string"
					},
					orderCode: {
						type: "string"
					}, //电商订单号
					orderPcode: {
						type: "string"
					}, //平台订单号
					orderBillStatus: {
						type: "string"
					}, //订单状态
					goodsCategory: {
						type: "string"
					}, //订单类型
					orderBuyer: {
						type: 'string'
					}, //顾客Id
					skuCode: {
						type: "string"
					}, //商品编码
					skuName: {
						type: "float"
					}, //商品名称
					buyNum: {
						type: "float"
					}, // 购买数量
					closeNum: {
						type: "float"
					}, // 关闭数量
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, // 结算金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					isTrade: {
						type: "float"
					}, // 换购商品
					isPushDownStreamOrder: {
						type: "integer"
					}, //已推下游单据标志
					num: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量
					amount: {
						type: "float"
					}, // 本次关联金额
					changeNum: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量-商品变更
					changeAmount: {
						type: "float"
					}, // 本次关联金额-商品变更
					saleReturnNum: {
						type: "Integer"
					},
					saleReturnFee: {
						type: "float"
					},
				}
			},
			//商品升级--低升高-链接
			upgradeHightLinkMete: {
				meta: {
					id: {
						type: "string"
					}, //
					code: {
						type: 'string'
					},
					orderCode: {
						type: "string"
					}, //电商订单号
					orderPcode: {
						type: "string"
					}, //平台订单号
					orderBillStatus: {
						type: "string"
					}, //订单状态
					goodsCategory: {
						type: "string"
					}, //订单类型
					orderBuyer: {
						type: 'string'
					}, //顾客Id
					skuCode: {
						type: "string"
					}, //商品编码
					skuName: {
						type: "float"
					}, //商品名称
					buyNum: {
						type: "float"
					}, // 购买数量
					closeNum: {
						type: "float"
					}, // 关闭数量
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, // 结算金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					isTrade: {
						type: "float"
					}, // 换购商品
					num: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量
					amount: {
						type: "float"
					}, // 本次关联金额
					changeNum: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量-商品变更
					changeAmount: {
						type: "float"
					}, // 本次关联金额-商品变更
				}
			},
			//商品升级--待选商品
			upgradeHightWaitMete: {
				meta: {
					id: {
						type: "string"
					}, //
					saleReturnNum: {
						type: "string",
						regExp: /^[1-9]\d*$/
					}, //售后退货数量
					saleReturnFee: {
						type: "string",
						regExp: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
					}, //售后退货金额
					goodsId: {
						'refmodel': JSON.stringify(refinfo['goods-no-version']),
						'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":"true"}',
						//						"refparam": '{"EQ_pkcombineGoodsCategory":"0"}'
					}, //商品编码
					skuCode: {
						type: "string"
					}, //商品编码
					skuName: {
						type: "string"
					}, //商品名称
					buyNum: {
						type: "float",
						regExp: /^\d+$/,
						required: true
					}, // 购买数量
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, // 结算金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					closeNum: {
						type: "float"
					}, // 关闭数量
					logisticsMode: {
						type: "string"
					} //物流方式
				}
			},
			//订单变更-订单信息
			orderInfoMeta: {
				meta: {
					id: {
						type: 'string'
					}, //id
					code: {
						type: 'string',
						required: true
					}, //电商订单号
					pcode: {
						type: 'string',
						required: true
					}, //平台订单号
					//			platformId: {
					//				type: "string",
					//				required: true,
					//				"refmodel": JSON.stringify(refinfo['b2cplatform']),
					//				"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					//			}, //平台ID
					platformName: {
						type: 'string'
					}, //平台名称
					//			storeId: {
					//				type: "string",
					//				required: true,
					//				"refmodel": JSON.stringify(refinfo['b2cStoreRef']),
					//				"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					//			}, //店铺ID
					storeName: {
						type: 'string'
					}, //店铺名称
					buyer: {
						type: 'string'
					}, //顾客id
					orderReceiverName: {
						type: "string"
					}, //顾客姓名
					orderReceiverPhone: {
						type: 'string'
					}, //联系电话
					orderReceiverProvince: {
						type: 'string'
					}, //省
					orderReceiverCity: {
						type: 'string'
					}, //市
					orderReceiverDistrict: {
						type: 'string'
					}, //区
					orderReceiverTown: {
						type: 'string'
					}, //街道
					orderReceiverAddress: {
						type: 'string'
					}, //收货地址
					serviceMode: {
						type: 'string',
						required: true,
						default: 0
					}, //配送方式
					belongOffice: {
						type: 'string'
					}, //办事处
					//			serviceProvider: {
					//				type: "string",
					//				required: true,
					//				"refmodel": JSON.stringify(refinfo['B2CfourdDList']),
					//				"refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					//			}, //服务商ID
					serviceProviderName: {
						type: 'string'
					}, //服务商名称
					bookTime: {
						type: 'datetime'
					}, //下单时间
					payTime: {
						type: 'datetime'
					}, //付款时间
					deliveryTime: {
						type: 'datetime'
					}, //要求送货时间
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, //结算金额
					payMode: {
						type: 'string'
					}, //支付方式
					billStatus: {
						type: 'string'
					}, //订单状态
					buyerMsg: {
						type: 'string'
					}, //买家留言
					orderSource: {
						type: 'string',
						required: true
					}, //订单来源
					orderType: {
						type: 'string',
						required: true
					}, //订单类型
					isException: {
						type: 'integer'
					}, //异常标识
					exceptionType: {
						type: 'string'
					}, //异常原因
					isLock: {
						type: 'integer'
					}, //冻结标识
					isUrgent: {
						type: 'integer',
						required: true
					}, //加急标识
					isSplitDispatch: {
						type: 'integer',
						required: true
					}, //是否允许拆单发货
					logisticsMode: {
						type: 'string'
					}, //物流方式
					sellerRemark: {
						type: 'string'
					}, //卖家备注
					isPromo: {
						type: 'integer'
					}, //已促销
					promStatus: {
						type: 'integer'
					}, //活动作废
				}
			},
			//订单变更-商品信息
			productInfoMeta: {
				meta: {
					id: {
						type: "string"
					}, //
					skuCode: {
						type: "string"
					}, //商品编码
					skuName: {
						type: "string"
					}, //商品名称
					buyNum: {
						type: "float"
					}, //购买数量
					soNum: {
						type: "float"
					}, //开单数量
					soDistNum: {
						type: "float"
					}, // 配车数量
					sendNum: {
						type: "float"
					}, //发货数量
					storePlanNum: {
						type: "float"
					}, //排工数量
					storeSendNum: {
						type: "float"
					}, //出库数量
					storeFinishNum: {
						type: "float"
					}, //完工数量
					closeNum: {
						type: "float"
					}, //关闭数量
					price: {
						type: "float"
					}, //单价
					discountFee: {
						type: "float"
					}, //商品优惠
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, //结算金额
					returnFee: {
						type: "float"
					}, //退款金额
					remark: {
						type: "string"
					}, //备注
					isOwn: {
						type: "string"
					}, //是否欠件
					isGift: {
						type: "integer"
					}, //是否赠品
					returnFeeStatus: {
						type: "string"
					}, //退款状态
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
			//延期发货
			delayShipMeta: {
				meta: {
					days: {
						type: "integer"
					},
					errIds: {
						type: "string"
					}
				}
			},
			//订单备注
			remarkMeta: {
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
					commentTypes: {
						type: 'string'
					},
					commentInfo: {
						type: 'string'
					},
					commentCategory: {
						type: 'string'
					},
				}
			},
			//订单跟踪 
			orderTracMeta: {
				params: {
					"cls": "com.yonyou.ocm.b2c.service.dto.OrderProductDto"
				},
				meta: {
					id: {
						type: "string"
					},
					dr: {
						type: "string"
					},
					ts: {
						type: "string"
					},
					creator: {
						type: "string"
					},
					creationTime: {
						type: "datetime"
					},
					modifier: {
						type: "string"
					},
					modifiedTime: {
						type: "datetime"
					},
					persistStatus: {
						type: "string"
					},
					orderId: {
						type: "string"
					},
					node: {
						type: "string"
					}, //步骤
					content: {
						type: "string"
					}, //内容
					operateTime: {
						type: "datetime"
					} //时间
				}
			},
			changedLogisticsRef: {
				meta: {
					changedlogisticsref: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['logistics-company']),
						"refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
					}
				}
			}, //
			//换货主表
			changeGoodsMeta: {
				meta: {
					id: {
						type: "string"
					}, //
					exchangeNum: {
						type: "string",
						regExp: /^[1-9]\d*$/,
						errorMsg: "请输入大于等于1的正整数"
					},
					exchangeMoney: {
						type: "string"
					},
					code: {
						type: "string"
					},
					orderCode: {
						type: "string"
					}, //电商订单号
					orderPcode: {
						type: "string"
					}, //平台订单号
					orderBillStatus: {
						type: "string"
					}, //订单状态
					goodsCategory: {
						type: "string"
					}, //订单类型
					orderBuyer: {
						type: 'string'
					}, //顾客Id
					skuCode: {
						type: "string"
					}, //商品编码
					skuName: {
						type: "float"
					}, //商品名称
					buyNum: {
						type: "float"
					}, // 购买数量
					closeNum: {
						type: "float"
					}, // 关闭数量
					receivableFee: {
						type: "float"
					}, // 成交金额
					settlementFee: {
						type: "float"
					}, // 结算金额
					closedFee: {
						type: "float"
					}, // 关闭金额
					isTrade: {
						type: "float"
					}, // 换购商品
					num: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量
					amount: {
						type: "float"
					}, // 本次关联金额
					changeNum: {
						type: "string",
						regExp: /^\d+$/
					}, // 本次关联数量-商品变更
					changeAmount: {
						type: "float"
					}, // 本次关联金额-商品变更
					saleReturnNum: {
						type: "Integer"
					},
					saleReturnFee: {
						type: "float"
					}
				}
			},
			//换货主表
			changeGoodsSubMeta: {
				meta: {
					id: {
						type: 'string'
					}, //id
					skuCodeAll: {
						type: "string"
					},
					skuCode: {
						type: "string",
						// required: true,
						// "refmodel": JSON.stringify(refinfo['b2cGoodsRef']),
						// "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
					}, //商品编码
					skuName: {
						type: 'string'
					}, //商品名称
					buyNum: {
						type: "float",
						regExp: /^[1-9]\d*$/,
						errorMsg: "请输入大于等于1的正整数"
					}, //购买数量
					receivableFee: {
						type: "float"
					}
				}
			},
			ProductRef: {
				meta: {
					productRefer: {
						type: 'string',
						"refmodel": JSON.stringify(refinfo['goods-no-version']),
						'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
					}
				}
			},
			//订单分拨
			splitOrder: {
				params: {
					"cls": "com.yonyou.ocm.base.service.dto.CustomerAddressDto"
				},
				meta: {
					id: {
						type: "string"
					}, //客户收货地址主键---保存参数
					code: {
						type: "string"
					}, //地址编码
					name: {
						type: "string"
					}, //地址名称
					customerName: {
						type: "string"
					}, //服务商名称
					customerCode: {
						type: "string"
					}, //服务商编码---保存参数
				},
				pageSize: 5,
			},
			//采购
			pushPurchaseMain: {
				meta: {
					orderId: {
						type: "string",
					}, //订单id
					purchaseOrgId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["organization_ocm"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"04"}' //采购组织
					}, //采购组织
					purchaseOrgName: {
						type: "string",
					},
					supplierId: {
						type: "string",
						required: true,
						refmodel: JSON.stringify(refinfo["suppliers"]),
						refcfg: '{"ctx":"/uitemplate_web","refName":"供应商" }',
						refparam: '{"EQ_isEnable":"1"}'
					}, //供应商
					remark: {
						type: "string",
						maxLength: 600
					}
				},
			},
			pushPurchaseSub: {
				meta: {
					serialnum: {
						type: "string"
					},
					orderGoodsId: {
						type: "string",
					}, //订单商品行id
					orderGoodsName: {
						type: "string",
					},
					goodsNum: {
						type: "integer",
						required: true
					}, //采购数量
					warehouseId: {
						type: "string",
						refmodel: JSON.stringify(refinfo["warehouse"]),
						refcfg: '{"ctx":"/uitemplate_web"}',
						refparam: '{"EQ_isEnable":"1"}'
					},
					warehouseName: {
						type: "string",
					}, // 发货仓库
				},
			}
		},
		searchs: {
			search1: [{
				type: "text",
				key: "pcode",
				label: "平台单号"
			}, {
				type: "text",
				key: "code",
				label: "电商单号"
			}, {
				type: "refer",
				key: "platform--id",
				label: "三方平台",
				refinfo: "b2cplatform",
				refName: "所属平台",
				multi: true,
				opr: 'IN'
			}, {
				type: "text",
				key: "buyer",
				label: "买家账号"
			}, {
				type: "text",
				key: "orderReceiver--receiver",
				label: "收货人"
			}, {
				type: "text",
				key: "orderReceiver--receiverPhone",
				label: "收货人手机"
			}, {
				type: "text",
				key: "orderReceiver--receiverAddress",
				label: "收货详细地址"
			}, {
				type: "daterange",
				key: "deliverTime",
				label: "发货时间"
			}, {
				type: "daterange",
				key: "auditTime",
				label: "审核时间"
			}, {
				type: "daterange",
				key: "payTime",
				label: "付款时间"
			}, {
				type: "text",
				key: "store--name",
				label: "店铺名称"
			}, {
				type: "refer",
				key: "serviceProvider--id",
				label: "客户",
				refinfo: "B2CfourdDList",
				multi: true,
				opr: 'IN'
			}, {
				type: "radio",
				key: "isLock",
				label: "冻结状态",
				dataSource: [{
					value: '',
					name: '全部'
				}, {
					value: '0',
					name: '否'
				}, {
					value: '1',
					name: '是'
				}]
			}, {
				type: "radio",
				key: "auditWarning",
				label: "审核预警",
				dataSource: [{
					value: '0',
					name: '否'
				}, {
					value: '1',
					name: '是'
				}]
			}, {
				type: "radio",
				key: "deliveryWarning",
				label: "发货预警",
				dataSource: [{
					value: '0',
					name: '否'
				}, {
					value: '1',
					name: '是'
				}]
			}, {
				type: "radio",
				key: "isException",
				label: "异常状态",
				dataSource: [{
					value: '',
					name: '全部'
				}, {
					value: '0',
					name: '否'
				}, {
					value: '1',
					name: '是'
				}]
			}, {
				type: "checkboxlist",
				key: "platformBillStatus",
				label: "平台状态",
				dataSource: [{
					value: '01',
					name: '待发货'
				}, {
					value: '02',
					name: '已发货'
				}, {
					value: '03',
					name: '交易完成'
				}],
				cls: "ui-checkboxes-item"
			}, {
				type: "checkboxlist",
				key: "orderType",
				label: "订单类型",
				dataSource: [{
					value: '0',
					name: '普通商品'
				}, {
					value: '1',
					name: '运费链接'
				}, {
					value: '2',
					name: '补差链接'
				}],
				cls: "ui-checkboxes-item"
			}, {
				type: "checkboxlist",
				key: "billStatus",
				label: "订单状态",
				dataSource: [{
					value: '01',
					name: '暂存'
				}, {
					value: '02',
					name: '未处理'
				}, {
					value: '03',
					name: '未审核'
				}, {
					value: '04',
					name: '已审核'
				}, {
					value: '05',
					name: '已财审'
				}, {
					value: '06',
					name: '已发货'
				}, {
					value: '07',
					name: '已完成'
				}, {
					value: '08',
					name: '已关闭'
				}, {
					value: '09',
					name: '已拆分'
				}],
				cls: "ui-checkboxes-item"
			}, {
				type: "checkboxlist",
				key: "logisticsMode",
				label: "物流方式1",
				dataSource: [{
					value: '1',
					name: ''
				}, {
					value: '2',
					name: '快递配送'
				}, {
					value: '3',
					name: '服务商配送'
				}, {
					value: '4',
					name: '供应商直发'
				}, {
					value: '5',
					name: '经销商订单'
				}, ],
				cls: "ui-checkboxes-item"
			}, ],
			search2: [{
				type: "refer",
				key: "agency--id",
				label: "组织",
				refinfo: "organization_ocm",
				clientParam: {
					//          "EQ_isOffice": "1",
					"EQ_isEnable": "1"
				},
				domid: 'splitorderAgency',
				required: true
			}, {
				type: "refer",
				key: "serviceProvider",
				label: "服务商",
				refinfo: "customers",
				clientParam: {
					"EQ_isEnable": "1",
					"EQ_isServiceProvider": "1"
				},
				domid: 'splitorderServiceProvider',
				referId: "SplitorderServiceProviderId",
				required: true
			}, ],
		},
		buttons: {
			button1: [{
				key: "audit",
				label: "审核",
				iconCls: "icon-tubiao-shenhe",
				click: "auditHandle"
			}, {
				key: "autoCheck",
				label: "自动提交",
				click: "autoCheck"
			}, {
				key: "antiAudit",
				label: "反审核",
				iconCls: "icon-tubiao-quxiaoshenhe",
				click: "antiAuditFun"
			}, {
				key: "freight",
				label: "运费",
				iconCls: "icon-tubiao-guanlian",
				click: "freightFun"
			}, {
				key: "orderChange",
				label: "变更",
				iconCls: "icon-tubiao-zhuanhua",
				click: "orderChangeFun"
			}, {
				key: "delayShip",
				label: "延期收货",
				iconCls: "icon-tubiao-riqi",
				click: "delayShipFun"
			}, {
				key: "closeOrder",
				label: "关闭",
				iconCls: "icon-tubiao-guanbi-xianxing",
				click: "closeOrder"
			}, {
				key: "remarkOrder",
				label: "备注",
				iconCls: "icon-edit",
				click: "remarkOrder"
			}, {
				key: "freez",
				label: "冻结",
				iconCls: "icon-tubiao-dongjie",
				click: "freezFun"
			}, {
				key: "unfreeze",
				label: "解冻",
				iconCls: "icon-tubiao-dongjiejiedong",
				click: "unfreezeFun"
			}, {
				key: "rejected",
				label: "退货",
				iconCls: "icon-tubiao-riqi",
				// click: "beforeEdit",
				// clickArg: -1,
				auth: true,
				children: [{
					key: "allRejected",
					label: "整单退",
					click: "totalRefundFun",
					auth: true,
				}, {
					key: "partRejected",
					label: "部分退",
					click: "partRefundFun",
					auth: true,
				}]
			}, {
				key: "change",
				label: "换货",
				iconCls: "icon-tubiao-huangou",
				click: "productBuyFun"
			}, {
				key: "expressImport",
				label: "导快递单",
				iconCls: "icon-tubiao-riqi",
				// click: "beforeEdit",
				// clickArg: -1,
				auth: true,
				children: [{
					key: "ImportData",
					label: "导入数据",
					click: "importHandle",
					auth: true,
				}, {
					key: "exportMode",
					label: "导出模板",
					click: "exportTemplateHandle",
					auth: true,
				}]
			}, {
				key: "exportHandle",
				label: "导出",
				iconCls: "icon-export",
				click: "exportHandle"
			}, {
				key: "assigntranscom",
				label: "指定物流公司",
				click: "assignTransCom"
			}, {
				key: "orderfinish",
				label: "订单完成",
				click: "orderfinish"
			}, {
				key: "intercept",
				label: "截单",
				click: "interceptOrder"
			}, {
				key: "cdt",
				label: "取消合并发货",
				click: "cancelDeliveredTogether"
			}, {
				key: "sop",
				label: "订单分拨",
				click: "splitOrderPopup"
			}, {
				key: "pp",
				label: "采购",
				click: "pushPurchase"
			}, {
				key: "bt",
				label: "补贴",
				click: "subsidies"
			}],
			button2: [{
				key: "changeProduct",
				label: "变更商品",
				click: "changeProduct"
			}, {
				key: "changeGift",
				label: "变更赠品",
				click: "changeGift",
				cls: "ui-btn-green"
			}],
			button3: [{
				key: "addrow",
				label: "增行",
				iconCls: "icon-plus",
				click: "addUpgradeHightWaitRow"
			}, {
				key: "delrow",
				label: "删除",
				iconCls: "icon-shanchu1",
				click: "delUpgradeHightWaitRow",
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
			button5: [{
				key: "addrow",
				label: "增行",
				iconCls: "icon-plus",
				click: "addUpgradeHightWaitRow2"
			}, {
				key: "delrow",
				label: "删除",
				iconCls: "icon-shanchu1",
				click: "delUpgradeHightWaitRow",
			}],
			button6: [{
				key: "addproductrow",
				label: "增行",
				iconCls: "icon-plus",
				click: "AddProductItemsRef"
			}, {
				key: "delrow",
				label: "删行",
				iconCls: "icon-shanchu1",
				click: "delProductItemsRef",
			}],
			button7: [{
				key: "ppaddrow",
				label: "增行",
				iconCls: "icon-plus",
				click: "ppAddRow"
			}, {
				key: "ppdelrow",
				label: "删除",
				iconCls: "icon-shanchu1",
				click: "ppDelRow",
			}],
		},
		cards: {
			card1: [{
				type: "text",
				key: "code",
				label: "电商单号",
				enable: false,
			}, {
				type: "text",
				key: "pcode",
				label: "平台单号",
				enable: false,
			}, {
				type: "text",
				key: "storeName",
				label: "店铺名称",
				enable: false,
			}, {
				type: "text",
				key: "buyer",
				label: "买家账号",
				enable: false,
			}, {
				type: "text",
				key: "orderReceiverName",
				label: "收货人",
			}, {
				type: "text",
				key: "orderReceiverPhone",
				label: "收货人手机",
			}, {
				type: "text",
				key: "orderReceiverTel",
				label: "收货人电话"
			}, {
				type: "refer",
				key: "orderReceiverProvince",
				label: "收货省",
				refinfo: "region",
				refName: "地区",
				multi: false,
				opr: 'IN'
			}, {
				type: "refer",
				key: "orderReceiverCity",
				label: "收货市",
				refinfo: "region",
				refName: "地区",
				multi: false,
				domid: "city",
				opr: 'IN'
			}, {
				type: "refer",
				key: "orderReceiverDistrict",
				label: "收货区（县）",
				refinfo: "region",
				refName: "地区",
				multi: false,
				domid: "district",
				opr: 'IN'
			}, {
				type: "refer",
				key: "orderReceiverTown",
				label: "收货街（镇）",
				refinfo: "region",
				refName: "地区",
				multi: false,
				domid: 'town',
				opr: 'IN'
			}, {
				type: "text",
				key: "orderReceiverAddress",
				label: "收货详细地址",
			}, {
				type: "combo",
				key: "serviceMode",
				label: "配送方式",
				dataSource: [{
					value: "0",
					name: "送装"
				}, {
					value: "1",
					name: "自提"
				}],
				namefield: "name",
				valuefield: "id",
				hasAll: true
			}, {
				type: "refer",
				key: "belongOffice",
				label: "服务商所属组织",
				refinfo: "organization_auth_b2c",
				refName: "服务商所属组织",
				multi: false,
				opr: 'IN'
			}, {
				type: "datetime",
				key: "deliveryTime",
				label: "要求送货时间"
			}, {
				type: "radio",
				key: "isSplitDispatch",
				label: "拆单发货",
				dataSource: [{
					value: '0',
					name: '否'
				}, {
					value: '1',
					name: '是'
				}]
			}, {
				type: "radio",
				key: "isUrgent",
				label: "加急",
				dataSource: [{
					value: '0',
					name: '否'
				}, {
					value: '1',
					name: '是'
				}]
			}, ],
			ppCards: [{
				type: "refer",
				key: "purchaseOrgId",
				label: "采购组织",
				refName: "采购组织",
			}, {
				type: "refer",
				key: "supplierId",
				label: "供应商",
				refName: "供应商",
			}, {
				type: "textarea",
				key: "remark",
				label: "备注",
				cls: "ui-textarea-item"
			}, ]
		},
		details: {
			detail1: [{
				key: "pcode",
				label: "平台单号",
			}, {
				key: "platformName",
				label: "平台名称"
			}, {
				key: "storeName",
				label: "店铺名称",
			}, {
				key: "platformBillStatus",
				label: "平台状态",
				computed: "enableFmt"
			}, ],
			detail2: [{
				key: "code",
				label: "电商单号",
			}, {
				key: "orderType",
				label: "订单类型",
				computed: "ordrTypeList"
			}, {
				key: "logisticsMode",
				label: "物流方式",
				computed: "logistics",
			}, {
				key: "serviceMode",
				label: "配送方式",
				computed: "deliveryModeList"
			}, {
				key: "billStatus",
				label: "订单状态",
				computed: "orderStatusList"
			}, {
				key: "serviceProviderName",
				label: "服务商"
			}, {
				key: "isSplitDispatch",
				label: "拆单标识",
				computed: "splitDispatchList"
			}, {
				key: "isUrgent",
				label: "加急标识",
				computed: "urgentList"
			}, {
				key: "isException",
				label: "异常标识",
				computed: "exceptionStatusList"
			}, {
				key: "exceptionType",
				label: "异常原因",
				attr: {
					title: "exceptionType"
				}
			}, {
				key: "isLock",
				label: "冻结标识",
				computed: "lockStatusList"
			}, {
				key: "lockReason",
				label: "冻结原因",
				attr: {
					title: "lockReason"
				}
			}, {
				key: "orderSource",
				label: "订单来源",
				computed: "orderSourceList"
			}, {
				key: "payMode",
				label: "支付方式"

			}, {
				key: "bookTime",
				label: "下单时间",
			}, {
				key: "payTime",
				label: "付款时间"
			}, {
				key: "auditTime",
				label: "审核时间",
			}, {
				key: "deliverTime",
				label: "发货时间"
			}, {
				key: "deliveryTime",
				label: "要求送货时间",
			}, {
				key: "logisticsName",
				label: "快递公司名称",
			}, {
				key: "waybillNo",
				label: "快递单号"
			}, {
				key: "sendStatus",
				label: "发货状态",
				computed: "sendStatusList"
			}, {
				key: "isDelay",
				label: "延期发货标识"
			}, {
				key: "delayTimes",
				label: "延期发货次数",
			}, {
				key: "delayDays",
				label: "延期发货总天数"
			}, {
				key: "belongOfficeName",
				label: "服务商所属组织",
			}, {
				key: "issynsuccess",
				label: "已同步平台发货状态",
				computed: "synsuccessList"
			}, {
				key: "synmsg",
				label: "同步平台发货状态反馈"
			}, ],
			detail3: [{
				key: "buyer",
				label: "买家账号"
			}, {
				key: "orderReceiverName",
				label: "收货人",
			}, {
				key: "orderReceiverPhone",
				label: "收货人手机"
			}, {
				key: "orderReceiverTel",
				label: "收货人电话",
			}, {
				key: "orderReceiverProvinceName",
				label: "收货省"
			}, {
				key: "orderReceiverCityName",
				label: "收货市",
			}, {
				key: "orderReceiverDistrictName",
				label: "收货区/县"
			}, {
				key: "orderReceiverTownName",
				label: "收货街道/镇",
			}, {
				key: "orderReceiverAddress",
				label: "收货详细地址",
				attr: {
					title: "orderReceiverAddress"
				}
			}, ],
			detail4: [
				// {
				// 	key: "shiptopartyName",
				// 	label: "服务商网点",
				// }, 
				{
					key: "freightOrderFee",
					label: "关联运费",
				}, {
					key: "totalReceivableFee",
					label: "总成交金额"
				}, {
					key: "totalClosedFee",
					label: "总关闭金额"
				},
			]
		},
		dialogs: {
			dialog1: [{
				type: "textarea",
				key: "intercepterReason",
				label: "截单原因",
				cls: "ui-textarea-item"
			}],
		},
		grids: {
			grid1: {
				domid: "grid_PromoActivity_dom",
				umeta: {
					"id": "grid_PromoActivity",
					"data": "processOrderList",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeClickFun": "detail"
				},
				columns: [{
						"field": "orderSource",
						"dataType": "String",
						"title": "来源",
						"editOptions": {
							"type": "combo",
							"datasource": "orderSourceSrc"
						},
						"renderType": "comboRender",
						"width": "50px",
					}, {
						"field": "platformName",
						"dataType": "String",
						"title": "平台",
						"width": "50px",
					}, {
						"field": "storeName",
						"dataType": "String",
						"title": "店铺",
					}, {
						"field": "pcode",
						"dataType": "String",
						"title": "平台单号",
					}, {
						"field": "code",
						"dataType": "String",
						"title": "电商单号",
						"width": "130px",
					}, {
						"field": "orderType",
						"dataType": "String",
						"title": "订单类型",
						"editOptions": {
							"type": "combo",
							"datasource": "orderTypeSrc"
						},
						"renderType": "comboRender",
						"width": "80px",
					}, {
						"field": "billStatus",
						"dataType": "String",
						"title": "订单状态",
						"editOptions": {
							"type": "combo",
							"datasource": "orderStatusSrc"
						},
						"renderType": "comboRender",
						"width": "80px",
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
						"field": "auditWarning",
						"dataType": "String",
						"title": "审核预警",
						"editOptions": {
							"type": "combo",
							"datasource": "deliveryWarn"
						},
						"renderType": "comboRender",
					}, {
						"field": "deliveryWarning",
						"dataType": "String",
						"title": "发货预警",
						"editOptions": {
							"type": "combo",
							"datasource": "deliveryWarn"
						},
						"renderType": "comboRender",
					}, {
						"field": "platformBillStatus",
						"dataType": "String",
						"title": "平台状态",
						"editOptions": {
							"type": "combo",
							"datasource": "OrderPlatformBillStatusSrc"
						},
						"renderType": "comboRender"
					}, {
						"field": "auditTime",
						"dataType": "Datetime",
						"title": "审核时间",
						"visible": false
					}, {
						"field": "orderType",
						"dataType": "String",
						"title": "发货时间",
						"visible": false
					}, {
						"field": "logisticsMode",
						"dataType": "String",
						"title": "物流方式",
						"editOptions": {
							"type": "combo",
							"datasource": "logisticsModeSrc"
						},
						"renderType": "comboRender",
						"width": "80px",
					}, {
						"field": "isLock",
						"dataType": "String",
						"title": "冻结",
						"renderType": "lockRender",
						"width": "50px",
					}, {
						"field": "lockReason",
						"dataType": "String",
						"title": "冻结原因"
					}, {
						"field": "buyer",
						"dataType": "String",
						"title": "买家账号"
					}, {
						"field": "bookTime",
						"dataType": "Datetime",
						"title": "下单时间",
						"width": "130px",
					}, {
						"field": "payTime",
						"dataType": "Datetime",
						"title": "付款时间",
						"width": "130px",
					}, {
						"field": "isUrgent",
						"dataType": "String",
						"title": "加急",
						"renderType": "urgentStatusGrid",
						"width": "50px",
					},
					// {//庭苇说去掉
					// 	"field": "deliveredTogether",
					// 	"dataType": "String",
					// 	"title": "合并发货",
					// 	"renderType": "deleverTogether",
					// 	"width": "150px",
					// }, 
					{
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
					},
				]
			},
			grid2: {
				domid: "grid_goods_dom",
				umeta: {
					"id": "grid_goods",
					"data": "goodsList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
						"field": "serialnum",
						"dataType": "String",
						"title": "行号",
						"width": "50px",
					}, {
						"field": "goodsSource",
						"dataType": "String",
						"title": "商品来源",
						"editOptions": {
							"type": "combo",
							"datasource": "goodsSourceSrc"
						},
						"renderType": "comboRender"
					}, {
						"field": "skuCode",
						"dataType": "String",
						"title": "商品编码",
					}, {
						"field": "skuName",
						"dataType": "String",
						"title": "商品名称",
						"width": "200px",

					}, {
						"field": "sosonid",
						"dataType": "String",
						"title": "平台子订单号",
					}, {
						"field": "goodsCategory",
						"dataType": "String",
						"title": "商品类型",
						"editOptions": {
							"type": "combo",
							"datasource": "orderTypeSrc"
						},
						"renderType": "comboRender"
						//				}, {
						//					"field": "logisticsMode",
						//					"dataType": "String",
						//					"title": "物流方式",
						//					"editOptions": {
						//						"type": "combo",
						//						"datasource": "logisticsModeSrc"
						//					},
						//					"renderType": "comboRender"
						//				}, {
						//					"field": "isCombine",
						//					"dataType": "String",
						//					"title": "是否组合",
						//					"renderType": "isGiftRender"
					}, {
						"field": "buyNum",
						"dataType": "Float",
						"title": "购买数量",
					}, {
						"field": "price",
						"dataType": "Float",
						"title": "吊牌价",
					}, {
						"field": "totalPrice",
						"dataType": "Float",
						"title": "总价",
					}, {
						"field": "discountFee",
						"dataType": "Float",
						"title": "优惠金额",
					}, {
						"field": "adjustFee",
						"dataType": "Float",
						"title": "手工调整金额",
						"editType": "float",
					}, {
						"field": "receivableFee",
						"dataType": "Float",
						"title": "成交金额",
					}, {
						"field": "receivablePriceUntil",
						"dataType": "Float",
						"title": "成交单价",
						"editable": false,
						"renderType": "precision2Render"
					}, {
						"field": "limitPrice",
						"dataType": "Float",
						"title": "最低零售价",
						//				}, {
						//					"field": "settlementFee",
						//					"dataType": "Float",
						//					"title": "结算金额",
					}, {
						"field": "isGift",
						"dataType": "String",
						"title": "是否赠品",
						"editable": false,
						"renderType": "isGiftRender"
						//				}, {
						//					"field": "isVir",
						//					"dataType": "Integer",
						//					"title": "虚拟商品",
						//					"renderType": "isGiftRender"
					}, {
						"field": "giftSource",
						"dataType": "String",
						"title": "赠品来源",
						"renderType": "giftSourceRender"
					}, {
						"field": "closeNum",
						"dataType": "Float",
						"title": "关闭数量",
					}, {
						"field": "closedFee",
						"dataType": "String",
						"title": "关闭金额",
						"editable": false

					}, {
						"field": "deliveryWarning",
						"dataType": "String",
						"title": "发货预警",
						"editOptions": {
							"type": "combo",
							"datasource": "deliveryWarn"
						},
						"renderType": "comboRender",
					}, {
						"field": "sendNum",
						"dataType": "Float",
						"title": "发货数量",
					}, {
						"field": "returnNum",
						"dataType": "Float",
						"title": "退货数量",
					}, {
						"field": "returnFee",
						"dataType": "Float",
						"title": "退款金额",
					}, {
						"field": "applyNum",
						"dataType": "String",
						"title": "申请退货数量",
					}, {
						"field": "applyFee",
						"dataType": "String",
						"title": "申请退款金额",
						"width": "150px"
						//				}, {
						//					"field": "combineGoodsId",
						//					"dataType": "String",
						//					"title": "商品组合主键",
					}, {
						"field": "combineGoodsCode",
						"dataType": "String",
						"title": "商品组合编码",
					}, {
						"field": "combineGoodsName",
						"dataType": "String",
						"title": "商品组合名称",
						"width": "200px",
					}, {
						"field": "combineGoodsNum",
						"dataType": "Float",
						"title": "商品组合数量",
					}, {
						"field": "goodsNumRate",
						"dataType": "Float",
						"title": "商品组合数量比",
						//				}, {
						//					"field": "warehouseId",
						//					"dataType": "String",
						//					"title": "仓库ID",
						//				}, {
						//					"field": "warehouseCode",
						//					"dataType": "String",
						//					"title": "仓库编码",
					}, {
						"field": "warehouseName",
						"dataType": "String",
						"title": "仓库",
						//					"width": "100px",
					}, {
						"field": "takeUpNumber",
						"dataType": "BigDecimal",
						"title": "预占数量",
					}, {
						"field": "takeUpStatus",
						"dataType": "Integer",
						"title": "预占状态",
						"renderType": "hastacked"
					}, {
						"field": "takeUpDate",
						"dataType": "Datetime",
						"title": "预占时间",
						//				}, {
						//					"field": "customerId",
						//					"dataType": "String",
						//					"title": "经销商id",
					}, {
						"field": "customerName",
						"dataType": "String",
						"title": "经销商",
						//					"width": "200px",
						//				}, {
						//					"field": "supplierId",
						//					"dataType": "String",
						//					"title": "供应商ID",
						//				}, {
						//					"field": "supplierCode",
						//					"dataType": "String",
						//					"title": "供应商编码",
					}, {
						"field": "supplierName",
						"dataType": "String",
						"title": "供应商",
						//					"width": "200px",
					}, {
						"field": "downStreamOrderCode",
						"dataType": "string",
						"title": "下游单据号"
						//				}, {
						//					"field": "isPushDownStreamOrder",
						//					"dataType": "string",
						//					"title": "已推送下游订单"
					}, {
						"field": "deliveredTogether",
						"dataType": "String",
						"title": "合并发货号",
					}, {
						"field": "deliveredTogetherStatus",
						"dataType": "String",
						"title": "合并发货状态",
						"editOptions": {
							"type": "combo",
							"datasource": "deleverTogetherStatus"
						},
						"renderType": "comboRender"

					}, {
						"field": "interceptDownStreamOrder",
						"dataType": "String",
						"title": "截单标识",
						"renderType": "inteCeptSrc"
					}, {
						"field": "interceptfailReason",
						"dataType": "String",
						"title": "截单失败原因",
						"width": "150px",
					},

				]
			},
			grid3: {
				domid: "subsidies_dom",
				umeta: {
					"id": "subsidies",
					"data": "subsidiesList",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"width": "200px",
					"editable": false
				}, {
					"field": "sidyMny",
					"dataType": "String",
					"title": "补贴金额",
				}, ]
			},
			grid4: {
				domid: "grid_prom_dom",
				umeta: {
					"id": "grid_prom",
					"data": "promList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "promotionSource",
					"dataType": "String",
					"title": "优惠来源",
					"renderType": "promotionRender"
				}, {
					"field": "promotionType",
					"dataType": "String",
					"title": "优惠类型",
					"renderType": "promotionTypeRender"
				}, {
					"field": "promotionName",
					"dataType": "String",
					"title": "优惠方案名称",
				}, {
					"field": "promotionName",
					"dataType": "String",
					"title": "促销活动",
				}, {
					"field": "promotionModeName",
					"dataType": "String",
					"title": "促销方式",
				}, {
					"field": "promStatus",
					"dataType": "datetime",
					"title": "处理状态",
					"renderType": "promStatusRender"
				}, {
					"field": "promEndTime",
					"dataType": "String",
					"title": "活动结算时间",
				}, {
					"field": "promotionFee",
					"dataType": "String",
					"title": "优惠金额",
				}, {
					"field": "promotionDesc",
					"dataType": "String",
					"title": "优惠方案描述",
				}, {
					"field": "goodsRow",
					"dataType": "String",
					"title": "关联商品行号",
				}, {
					"field": "goodsSkucode",
					"dataType": "String",
					"title": "关联商品编码",
				}, {
					"field": "goodsName",
					"dataType": "String",
					"title": "关联商品名称",
					"width": "150px;"
				}, ]
			},
			grid5: {
				domid: "grid_link_dom",
				umeta: {
					"id": "grid_link",
					"data": "linkList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "linkType",
					"dataType": "String",
					"title": "关联关系",
					"editOptions": {
						"type": "combo",
						"datasource": "linkTypeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "creationTime",
					"dataType": "Datetime",
					"title": "关联时间",
				}, {
					"field": "code",
					"dataType": "String",
					"title": "电商单号",
				}, {
					"field": "orderType",
					"dataType": "String",
					"title": "订单类型",
					"editOptions": {
						"type": "combo",
						"datasource": "orderTypeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "goodsSku",
					"dataType": "String",
					"title": "商品编码",
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
				}, ]
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
			grid7: {
				domid: "grid_products_dom",
				umeta: {
					"id": "grid_products",
					"data": "productList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
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
					"dataType": "Float",
					"title": "购买数量",
					//      }, {
					//        "field": "soNum",
					//        "dataType": "Float",
					//        "title": "开单数量",
					//      }, {
					//        "field": "soDistNum",
					//        "dataType": "Float",
					//        "title": "配车数量",
				}, {
					"field": "soSendNum",
					"dataType": "Float",
					"title": "发货数量",
					//      }, {
					//        "field": "storePlanNum",
					//        "dataType": "Float",
					//        "title": "排工数量",
					//      }, {
					//        "field": "storeSendNum",
					//        "dataType": "Float",
					//        "title": "出库数量",
					//      }, {
					//        "field": "storeFinishNum",
					//        "dataType": "Float",
					//        "title": "完工数量",
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",
					//      }, {
					//        "field": "poBillNo",
					//        "dataType": "String",
					//        "title": "采购单号",
					//      }, {
					//        "field": "isOwn",
					//        "dataType": "String",
					//        "title": "是否欠件",
					//        "renderType": "ownRender"
				}, ]
			},
			grid8: {
				domid: "grid_remark_1_dom",
				umeta: {
					"id": "grid_remark_1",
					"data": "commentList1",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "creationTime",
					"dataType": "Datetime",
					"title": "时间",
				}, {
					"field": "creator",
					"dataType": "String",
					"title": "备注人",
				}, {
					"field": "commentTypes",
					"dataType": "String",
					"title": "备注类型",
					"visible": false
				}, {
					"field": "commentInfo",
					"dataType": "String",
					"title": "备注内容",
				}, ]
			},
			grid9: {
				domid: "grid_remark_2_dom",
				umeta: {
					"id": "grid_remark_2",
					"data": "commentList2",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "creationTime",
					"dataType": "Datetime",
					"title": "时间",
				}, {
					"field": "creator",
					"dataType": "String",
					"title": "备注人",
				}, {
					"field": "commentTypes",
					"dataType": "String",
					"title": "备注类型",
					"visible": false
				}, {
					"field": "commentInfo",
					"dataType": "String",
					"title": "备注内容",
				}, ]
			},
			grid10: {
				domid: "grid_remark_3_dom",
				umeta: {
					"id": "grid_remark_3",
					"data": "commentList3",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "creationTime",
					"dataType": "Datetime",
					"title": "时间",
				}, {
					"field": "creator",
					"dataType": "String",
					"title": "备注人",
				}, {
					"field": "commentTypes",
					"dataType": "String",
					"title": "备注类型",
					"visible": false
				}, {
					"field": "commentInfo",
					"dataType": "String",
					"title": "备注内容",
				}, ]
			},
			grid11: {
				domid: "grid_productInfo_dom",
				umeta: {
					"id": "grid_productInfo",
					"data": "goodsList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
				}, {
					"field": "buyNum",
					"dataType": "Float",
					"title": "购买数量",
				}, {
					"field": "price",
					"dataType": "Float",
					"title": "吊牌价",
				}, {
					"field": "discountFee",
					"dataType": "Float",
					"title": "优惠金额",
				}, {
					"field": "adjustFee",
					"dataType": "Float",
					"title": "手工调整金额",
					"editType": "float",


				}, {
					"field": "receivablePriceUntil",
					"dataType": "Float",
					"title": "成交单价",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "Float",
					"title": "成交金额",
				}, {
					"field": "isGift",
					"dataType": "String",
					"title": "是否赠品",
					"editable": false,
					"renderType": "isGiftRender"
				}, {
					"field": "giftSource",
					"dataType": "String",
					"title": "赠品来源",
					"renderType": "giftSourceRender"
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",

				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, {
					"field": "returnNum",
					"dataType": "Float",
					"title": "退货数量",
				}, {
					"field": "returnFee",
					"dataType": "Float",
					"title": "退款金额",
				}, {
					"field": "applyNum",
					"dataType": "String",
					"title": "申请退货数量",
				}, {

					"field": "applyFee",
					"dataType": "String",
					"title": "申请退款金额",
					"width": "150px",
				}]
			},
			grid12: {
				domid: "grid_productInfo_after_dom",
				umeta: {
					"id": "grid_productInfo_after",
					"data": "afterGoodsList",
					"type": "grid",
					"editable": false,
					"multiSelect": false,
					"showNumCol": true
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
				}, {
					"field": "buyNum",
					"dataType": "Float",
					"title": "购买数量",
				}, {
					"field": "price",
					"dataType": "Float",
					"title": "吊牌价",
				}, {
					"field": "discountFee",
					"dataType": "Float",
					"title": "优惠金额",
				}, {
					"field": "adjustFee",
					"dataType": "Float",
					"title": "手工调整金额",
					"editType": "float",
				}, {
					"field": "receivablePriceUntil",
					"dataType": "Float",
					"title": "成交单价",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "Float",
					"title": "成交金额",
				}, {
					"field": "isGift",
					"dataType": "String",
					"title": "是否赠品",
					"editable": false,
					"renderType": "isGiftRender"
				}, {
					"field": "giftSource",
					"dataType": "String",
					"title": "赠品来源",
					"renderType": "giftSourceRender"
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",

				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, {
					"field": "returnNum",
					"dataType": "Float",
					"title": "退货数量",
				}, {
					"field": "returnFee",
					"dataType": "Float",
					"title": "退款金额",
				}, {
					"field": "applyNum",
					"dataType": "String",
					"title": "申请退货数量",
				}, {

					"field": "applyFee",
					"dataType": "String",
					"title": "申请退款金额",
					"width": "150px;"
				}]
			},
			grid13: {
				domid: "grid_freight_dom",
				umeta: {
					"id": "grid_freight",
					"data": "freightData",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
					"field": "code",
					"dataType": "String",
					"title": "电商订单号",
				}, {
					"field": "pcode",
					"dataType": "String",
					"title": "平台订单号",
				}, {
					"field": "payTime",
					"dataType": "Datetime",
					"title": "付款时间",
				}, {
					"field": "billStatus",
					"dataType": "String",
					"title": "订单状态",
					"editOptions": {
						"type": "combo",
						"datasource": "orderStatusSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "orderType",
					"dataType": "String",
					"title": "订单类型",
					"editOptions": {
						"type": "combo",
						"datasource": "orderTypeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "buyer",
					"dataType": "String",
					"title": "买家账号",
				}, {
					"field": "orderReceiverName",
					"dataType": "String",
					"title": "收货人",
				}, {
					"field": "freight",
					"dataType": "String",
					"title": "运费",
				}, {
					"field": "totalReceivableFee",
					"dataType": "String",
					"title": "总金额",
				}, ]
			},
			grid14: {
				domid: "grid_productBuy_dom",
				umeta: {
					"id": "grid_productBuy",
					"data": "productBuyData",
					"onBeforeRowSelected": "rowClickFun",
					"type": "grid",
					"editable": false,
					"multiSelect": true,
					"showNumCol": true
				},
				columns: [{
					"field": "orderBuyer",
					"dataType": "String",
					"title": "顾客ID",
				}, {
					"field": "goodsCategory",
					"dataType": "String",
					"title": "订单类型",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "orderTypeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, {
					"field": "num",
					"dataType": "Integer",
					"title": "本次关联数量",
					"editType": "integer",
					"required": true
				}, {
					"field": "amount",
					"dataType": "String",
					"title": "本次关联金额",
					"editable": false
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false

				}, {
					"field": "orderBillStatus",
					"dataType": "String",
					"title": "订单状态",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "orderStatusSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "orderCode",
					"dataType": "String",
					"title": "电商单号",
					"editable": false
				}, {
					"field": "orderPcode",
					"dataType": "String",
					"title": "平台订单",
					"editable": false
				}, {
					"field": "isTrade",
					"dataType": "String",
					"title": "换购商品",
					"editable": false,
					"renderType": "isTradeRender"
				}, ]
			},
			grid15: {
				domid: "grid_productChangeBuy_dom",
				umeta: {
					"id": "grid_productChangeBuy",
					"data": "productBuyChangeData",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
					"onBeforeClickFun": "rowChangeClickFun"
				},
				columns: [{
					"field": "goodsId",
					"dataType": "String",
					"title": "商品编码",
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "skuCode",
					"editOptions": {
						"validType": "string",
						"rel": {
							"refpk": "goodsId",
							"refcode": "skuCode",
							"refname": "skuName"
						}
					}
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "Integer",
					"title": "购买数量",
					"required": true,
					"editType": "integer"

				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}]
			},
			grid16: {
				domid: "grid_changeProduct_wait_dom",
				umeta: {
					"id": "grid_changeProduct_wait",
					"data": "upgradeCommodityData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeRowSelected": "rowBeforeSelectedFun"
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "Integer",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "changeNum",
					"dataType": "String",
					"title": "本次关联数量",
					"editType": "integer",
					"required": true
				}, {
					"field": "changeAmount",
					"dataType": "String",
					"title": "本次关联金额",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}]
			},
			grid17: {
				domid: "grid_changeProduct_link_dom",
				umeta: {
					"id": "grid_changeProduct_link",
					"data": "upgradeCommodityLinkData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeRowSelected": "rowBeforeSelectedLinkFun"
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "orderBuyer",
					"dataType": "String",
					"title": "买家账号",
					"editable": false
				}, {
					"field": "changeAmount",
					"dataType": "String",
					"title": "本次关联金额",
					"editType": "float",
					"editOptions": {
						"validType": "float",
						"min": "0"
					},
					"required": true
				}, {
					"field": "goodsCategory",
					"dataType": "String",
					"title": "订单类型",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "orderTypeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "orderBillStatus",
					"dataType": "String",
					"title": "订单状态",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "orderStatusSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
					//				}, {
					//					"field": "settlementFee",
					//					"dataType": "String",
					//					"title": "结算金额",
					//					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, {
					"field": "orderCode",
					"dataType": "String",
					"title": "电商单号",
					"editable": false
				}, {
					"field": "orderPcode",
					"dataType": "String",
					"title": "平台单号",
					"editable": false
				}]
			},
			grid18: {
				domid: "grid_changeProduct_select_dom",
				umeta: {
					"id": "grid_changeProduct_select",
					"data": "upgradeHightWaitData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
				},
				columns: [{
					"field": "goodsId",
					"dataType": "String",
					"title": "商品编码",
					"required": true,
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "skuCode",
					"editOptions": {
						"validType": "string",
						"rel": {
							"refpk": "goodsId",
							"refname": "skuName",
							"refcode": "skuCode",
							//							"logisticsMode": "logisticsMode"
						}
					}
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
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
					"field": "buyNum",
					"dataType": "Integer",
					"title": "购买数量",
					"editType": "integer",
					"required": true
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": true
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}]
			},
			grid19: {
				domid: "grid_changeGift_wait_dom",
				umeta: {
					"id": "grid_changeGift_wait",
					"data": "upgradeGiftData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onBeforeRowSelected": "rowBeforeSelectedFun2"
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "num",
					"dataType": "Integer",
					"title": "本次关联数量",
					"editType": "integer",
					"required": true
				}, {
					"field": "changeAmount",
					"dataType": "String",
					"title": "本次关联金额",
					"editable": false,
					// "editType": "float",
					// "editOptions": {
					// 	"validType": "float",
					// 	"min": "0"
					// },
					// "required": true
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
					//				}, {
					//					"field": "settlementFee",
					//					"dataType": "String",
					//					"title": "结算金额",
					//					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, ]
			},
			grid20: {
				domid: "grid_changeGift_select_dom",
				umeta: {
					"id": "grid_changeGift_select",
					"data": "upgradeHightWaitData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
				},
				columns: [{
					"field": "goodsId",
					"dataType": "String",
					"title": "商品编码",
					"required": true,
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "skuCode",
					"editOptions": {
						"validType": "string",
						"rel": {
							"refpk": "goodsId",
							"refname": "skuName",
							"refcode": "skuCode",
							"logisticsMode": "logisticsMode"
						}
					}
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "logisticsMode",
					"dataType": "String",
					"title": "物流方式",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "logisticsModeSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "buyNum",
					"dataType": "Integer",
					"title": "购买数量",
					"editType": "integer",
					"required": true
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
					//				}, {
					//					"field": "settlementFee",
					//					"dataType": "String",
					//					"title": "结算金额",
					//					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, ]
			},
			grid21: {
				domid: "grid_returnGoods_wait_dom",
				umeta: {
					"id": "grid_returnGoods_wait",
					"data": "returnGoodsWaitData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onRowSelected": "rowSelectedFun",
					"onRowUnSelected": "rowUnSelectedFun"
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "returnNum",
					"dataType": "String",
					"title": "已退货数量",
					"editable": false
				}, {
					"field": "receivablePriceUntil",
					"dataType": "String",
					"title": "成交单价",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, {
					"field": "price",
					"dataType": "String",
					"title": "吊牌价",
					"editable": false
				}, {
					"field": "discountFee",
					"dataType": "String",
					"title": "优惠金额",
					"editable": false
					//				}, {
					//					"field": "settlementFee",
					//					"dataType": "String",
					//					"title": "结算金额",
					//					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, ]
			},
			grid22: {
				domid: "grid_returnGoods_select_dom",
				umeta: {
					"id": "grid_returnGoods_select",
					"data": "returnGoodsSelectData",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "saleReturnNum",
					"dataType": "Integer",
					"title": "售后退货数量",
					"editType": "integer",
					"required": true,
					"editOptions": {
						"validType": "integer",
						"min": "1"
					}
				}, {
					"field": "saleReturnFee",
					"dataType": "Float",
					"title": "售后退款金额",
					"editTYpe": "float",
					"required": true,
					"editOptions": {
						"validType": "float",
						"min": "0"
					}
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, {
					"field": "price",
					"dataType": "String",
					"title": "吊牌价",
					"editable": false
				}, {
					"field": "discountFee",
					"dataType": "String",
					"title": "优惠金额",
					"editable": false
				}, {
					"field": "receivablePriceUntil",
					"dataType": "String",
					"title": "成交单价",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
					//				}, {
					//					"field": "settlementFee",
					//					"dataType": "String",
					//					"title": "结算金额",
					//					"editable": false
				}, ]
			},
			grid23: {
				domid: "grid_salingrefund_wait_dom",
				umeta: {
					"id": "grid_salingrefund_wait",
					"data": "salingRefundWaitGoodsData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onRowSelected": "rowSelectedFun2",
					"onRowUnSelected": "rowUnSelectedFun2"
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "returnNum",
					"dataType": "String",
					"title": "已退货数量",
					"editable": false
				}, {
					"field": "receivablePriceUntil",
					"dataType": "String",
					"title": "成交单价",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, {
					"field": "price",
					"dataType": "String",
					"title": "吊牌价",
					"editable": false
				}, {
					"field": "discountFee",
					"dataType": "String",
					"title": "优惠金额",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, ]
			},
			grid24: {
				domid: "grid_salingrefund_select_dom",
				umeta: {
					"id": "grid_salingrefund_select",
					"data": "salingRefundSelectedGoodsData",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "saleReturnNum",
					"dataType": "Integer",
					"title": "本次退货数量",
					"editType": "integer",
					"required": true,
					"editOptions": {
						"validType": "integer",
						"min": "1"
					}
				}, {
					"field": "saleReturnFee",
					"dataType": "Float",
					"title": "本次退款金额",
					"editTYpe": "float",
					"required": true,
					"editOptions": {
						"validType": "float",
						"min": "0"
					},
					"renderType": "precision2Render"
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, {
					"field": "price",
					"dataType": "String",
					"title": "吊牌价",
					"editable": false
				}, {
					"field": "discountFee",
					"dataType": "String",
					"title": "优惠金额",
					"editable": false
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, ]
			},
			gridchangemain: {
				domid: "grid_changegoods_dom",
				umeta: {
					"id": "grid_changegoods_wait",
					"data": "changeGoodsList",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"onRowSelected": "rowSelectedFun3",
					"onRowUnSelected": "rowUnSelectedFun3"
				},
				columns: [{
					"field": "exchangeNum",
					"dataType": "String",
					"title": "换货数量",
					"editable": true
				}, {
					"field": "exchangeMoney",
					"dataType": "String",
					"title": "换货金额",
					"editable": false
				}, {
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "String",
					"title": "购买数量",
					"editable": false
				}, {
					"field": "closeNum",
					"dataType": "String",
					"title": "关闭数量",
					"editable": false
				}, {
					"field": "returnNum",
					"dataType": "String",
					"title": "已退货数量",
					"editable": false
				}, {
					"field": "receivablePriceUntil",
					"dataType": "String",
					"title": "成交单价",
					"editable": false,
					"renderType": "precision2Render"
				}, {
					"field": "receivableFee",
					"dataType": "String",
					"title": "成交金额",
					"editable": false
				}, {
					"field": "price",
					"dataType": "String",
					"title": "吊牌价",
					"editable": false
				}, {
					"field": "discountFee",
					"dataType": "String",
					"title": "优惠金额",
					"editable": false
				}, {
					"field": "closedFee",
					"dataType": "String",
					"title": "关闭金额",
					"editable": false
				}, ]
			},
			gridchangesub: {
				domid: "grid_exchangesub_dom",
				umeta: {
					"id": "grid_exchangesub",
					"data": "changeGoodsSubList",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false
				}, {
					"field": "buyNum",
					"dataType": "Integer",
					"title": "购买数量",
					"required": true,
					"editType": "integer"
				}, {
					"field": "receivableFee",
					"dataType": "Float",
					"title": "成交金额",
					"required": true,
					"editType": "float",
					"editOptions": {
						"validType": "float",
						"min": 0,
						"max": 100000000
					},
					"renderType": "precision2Render"
				}, ]
			},
			gridsplitorder: {
				domid: "splitOrderData1_dom",
				umeta: {
					"id": "splitOrderData1",
					"data": "splitOrderData",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"columnMenu": false
				},
				columns: [{
					"field": "customerCode",
					"dataType": "String",
					"title": "服务商编码",
					"editable": false,
				}, {
					"field": "customerName",
					"dataType": "String",
					"title": "服务商名称",
					"editable": false,
				}, {
					"field": "code",
					"dataType": "String",
					"title": "地址编码",
					"editable": false,
				}, {
					"field": "name",
					"dataType": "String",
					"title": "地址名称",
					"editable": false,
				}, ]
			},
			gridsplitorderSub: {
				domid: "productOrderSplit_warse_dom",
				umeta: {
					"id": "productOrderSplit_warse",
					"data": "goodsList",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
					"columnMenu": false
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "buyNum",
					"dataType": "Float",
					"title": "购买数量",
					"editable": false,
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",
					"editable": false,
				}, {
					"field": "warehouseId",
					"dataType": "String",
					"title": "仓库",
					"width": "180px",
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "warehouseName",
					"editOptions": {
						"validType": "string"
					}
				}, {
					"field": "takeUpNumber",
					"dataType": "Float",
					"title": "预占数量",
					"editable": false,
				}, {
					"field": "takeUpStatus",
					"dataType": "String",
					"title": "预占状态",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "preemptedStatusSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "takeUpDate",
					"dataType": "Datetime",
					"title": "预占时间",
					"editable": false,
				}, ]
			},
			gridcustomersub: {
				domid: "customersub_dom",
				umeta: {
					"id": "customersub",
					"data": "goodsList",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
					"columnMenu": false
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "buyNum",
					"dataType": "Float",
					"title": "购买数量",
					"editable": false,
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",
					"editable": false,
				}, {
					"field": "customerId",
					"dataType": "String",
					"title": "经销商",
					"width": "180px",
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "customerName",
					"editOptions": {
						"validType": "string",
						"rel": {
							"refname": "customerName"
						}
					}
				}, ]
			},
			gridsuppliersub: {
				domid: "suppliersub_dom",
				umeta: {
					"id": "suppliersub",
					"data": "goodsList",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
					"columnMenu": false
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "buyNum",
					"dataType": "Float",
					"title": "购买数量",
					"editable": false,
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",
					"editable": false,
				}, {
					"field": "supplierId",
					"dataType": "String",
					"title": "供应商",
					"width": "180px",
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "supplierName",
					"editOptions": {
						"validType": "string",
						"rel": {
							"refname": "supplierName"
						}
					}
				}, ]
			},
			productOrderSplit: {
				domid: "productOrderSplit_dom",
				umeta: {
					"id": "productOrderSplit",
					"data": "goodsList",
					"type": "grid",
					"editable": true,
					"multiSelect": false,
					"showNumCol": true,
					"columnMenu": false
				},
				columns: [{
					"field": "skuCode",
					"dataType": "String",
					"title": "商品编码",
					"editable": false,
				}, {
					"field": "skuName",
					"dataType": "String",
					"title": "商品名称",
					"editable": false,
				}, {
					"field": "buyNum",
					"dataType": "Float",
					"title": "购买数量",
					"editable": false,
				}, {
					"field": "closeNum",
					"dataType": "Float",
					"title": "关闭数量",
					"editable": false,
				}, {
					"field": "warehouseId",
					"dataType": "String",
					"title": "仓库",
					"width": "180px",
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "warehouseName",
					"editOptions": {
						"validType": "string"
					}
				}, {
					"field": "takeUpNumber",
					"dataType": "Float",
					"title": "预占数量",
					"editable": false,
				}, {
					"field": "takeUpStatus",
					"dataType": "String",
					"title": "预占状态",
					"editable": false,
					"editOptions": {
						"type": "combo",
						"datasource": "preemptedStatusSrc"
					},
					"renderType": "comboRender"
				}, {
					"field": "takeUpDate",
					"dataType": "Datetime",
					"title": "预占时间",
					"editable": false,
				}, ]
			},
			pushPurchaseItems: {
				domid: "pushpurchase_item_dom",
				umeta: {
					"id": "pushpurchase_item",
					"data": "pushPurchaseItems",
					"type": "grid",
					"editable": true,
					"multiSelect": true,
					"showNumCol": true,
					"columnMenu": false
				},
				columns: [{
					"field": "serialnum",
					"dataType": "String",
					"title": "行号",
					"editable": false
				}, {
					"field": "orderGoodsName",
					"dataType": "String",
					"title": "商品",
					"editable": false
				}, {
					"field": "goodsNum",
					"dataType": "Integer",
					"title": "采购数量",
				}, {
					"field": "warehouseId",
					"dataType": "String",
					"title": "收货仓库",
					"renderType": "ncReferRender",
					"editType": "ncReferEditType",
					"showField": "warehouseName",
					"editOptions": {
						"validType": "string"
					}
				}, ]
			}
		}
	}
	return new basemodel(model);
})