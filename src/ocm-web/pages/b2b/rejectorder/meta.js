define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var billstatus = CONST.B2BENUM.SALEORDER;
    //销售订单单据类型
    var billStatusSrc = [
        // {value: billstatus.COMMITTED, name: "已提交"},
        // {value: billstatus.APPROVED, name: "已审核"},
        // {value: billstatus.FINISHED, name: "已完成"}
    ];
    var someta = {
        params: {
            cls: "com.yonyou.occ.b2b.service.dto.OrderDto"
        },
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
                refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
            },
            // "销售组织编码")
            saleOrgCode: {
                type: "string"
            },
            // "销售组织名称")
            saleOrgName: {
                type: "string"
            },
            // 结算财务组织
            settleFinancialOrgId: {
                type: "string",
                required: true,
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
            // 客户订单类型
            orderTypeId: {
                type: "string",
                required: true,
            },
            // "订单类型编码")
            orderTypeCode: {
                type: "string"
            },
            // "订单类型名称")
            orderTypeName: {
                type: "string"
            },
            // 订单编码
            orderCode: {
                type: "string"
            },
            // 退货单日期
            orderDate: {
                type: "date"
            },
            // 退货状态
            orderStatusId: {
                type: "string"
            },
            // "订单状态编码")
            orderStatusCode: {
                type: "string"
            },
            // "订单状态名称")
            orderStatusName: {
                type: "string"
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
            // 市场区域
            marketAreaId: {
                type: "string"
            },
            // "市场区域编码")
            marketAreaCode: {
                type: "string"
            },
            // "市场区域名称")
            marketAreaName: {
                type: "string"
            },
            // 客户经理
            salesManagerId: {
                type: "string"
            },
            // "客户经理编码")
            salesManagerCode: {
                type: "string"
            },
            // "客户经理名称")
            salesManagerName: {
                type: "string"
            },
            // 销售部门
            salesDeptId: {
                type: "string"
            },
            // "销售部门编码")
            salesDeptCode: {
                type: "string"
            },
            // "销售部门名称")
            salesDeptName: {
                type: "string"
            },
            // 运输方式
            transportModeId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["transportmode"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"运输方式" }'
            },

            receiveAddressId: {
                type: 'string'
            },
            receiveAddressName: {
                type: 'string'
            },
            // 收货详细地址
            receiverAddress: {
                type: "string"
            },
            // 客户开票信息
            customerInoviceId: {
                type: "string"
            }, // 发票档案ID
            invoiceId: {
                type: "string"
            }, // 发票类型
            invoiceType: {
                type: "string"
            }, // 发票类型
            invoiceTitle: {
                type: "string"
            }, // 发票抬头
            invoiceTaxId: {
                type: "string"
            }, // 纳税人识别码

            // "运输方式编码")
            transportModeCode: {
                type: "string"
            },
            // "运输方式名称")
            transportModeName: {
                type: "string"
            },
            // 结算方式
            settleModeId: {
                type: "string"
            },
            // "结算方式编码")
            settleModeCode: {
                type: "string"
            },
            // "结算方式名称")
            settleModeName: {
                type: "string"
            },
            // 交货日期(即客户期望的收货日期)
            deliveryDate: {
                type: "data"
            },
            // 总数量
			totalNum: {
				type: "numberFloat",
				precision: 2
			},
            // 币种
            currencyId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["currency"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"币种" }',
            },
            // "币种编码")
            currencyCode: {
                type: "string"
            },
            // "币种名称")
            currencyName: {
                type: "string"
            },
            // 币种单价精度  
            currencyPriceScale: {
                type: "integer"
            },
            // 币种金额精度
            currencyAmountScale: {
                type: "integer"
            },
            // 总成交金额
            totalDealAmount: {
                type: "amountFloat"
            },
            // 冲抵前金额
            totalAmount: {
                type: "amountFloat"
            },
            // 费用冲抵金额
            offsetAmount: {
                type: "amountFloat"
            },
            // 总重量
            totalWeight: {
                type: "string"
            },
            // 总净重
            totalNetWeight: {
                type: "string"
            },
            // 总体积
            totalVolume: {
                type: "string"
            },
            // 订单来源
            orderSource: {
                type: "string"
            },
            // 备注
            remark: {
                type: "string"
            },
            // 审批意见
            approveOpinion: {
                type: "string"
            },
            // 审核状态
            approveStatus: {
                type: "integer"
            },
            // 审批人
            approver: {
                type: "string"
            },
            // 审批时间
            approveTime: {
                type: "date"
            },
            // 来源订单号
            srcOrderCode: {
                type: "string"
            },
            // 来源订单主键
            srcOrderId: {
                type: "string"
            },
            // 客户发货地址
            customeraddressId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["customeraddress"]),
                refcfg: '{"ctx":"/uitemplate_web", "refName":"客户发货地址"}'
            },
            customeraddressCode: {
                type: "string"
            },
            customeraddressName: {
                type: "string"
            },
            // 账期
            accountPeriodId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["settlementSettings"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"账期" }',
            },
            // "账期编码"
            accountPeriodCode: {
                type: "string"
            },
            // "账期名称"
            accountPeriodName: {
                type: "string"
            },
            // 货补费用单类型
            costTypeId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["trantype"]),
                refparam: '{"EQ_billTypeId":"CastType"}',
                refcfg: '{"ctx":"/uitemplate_web","refName":"货补订单类型" }'
            },
            costTypeName: {
                type: "string"
            },
            costTypeCode: {
                type: "string"
            },
            saleModel: {
                type: "string"
            }, // 销售模式
            totalReturnAmount: {
                type: "amountFloat"
            }, //实际退货金额
            measurementUnitId: {
                type: 'string',
                required: true
            }, //计量单位
            measurementUnitCode: {
                type: 'string',
                required: true
            }, //计量单位
            measurementUnitName: {
                type: 'string',
                required: true
            }, //计量单位
            
        },
        pageSize: 10
    };
    var BomItem = {
        meta: {
            // 行号
            rowNum: {
                type: 'string',
                required: true
            },
            // 商品
            goodsId: {
                type: 'string',
                required: true
            },
            // 商品显示名称
            goodsDisplayName: {
                type: 'string',
                required: true
            },
            // 商品名称
            goodsName: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isEnable":"1"}'
            },
            // 商品Code
            goodsCode: {
                type: 'string',
                required: true
            },
            // 商品图片
            goodsImg: {
                type: 'string'
            },
            goodsNum: {
                type: 'numberFloat',
            }, //数量
            // 是否赠品
            isGift: {
                type: 'float',
                default: "0"
            },
            // 选配 id
            baseGoodsOptId: {
                type: 'string'
            },
            // 商品选配
            baseGoodsOptValue: {
                type: 'string',
            },
            // 产品线
            productLineId: {
                type: 'string'
            },
            // 行合计重量
            rowWeight: {
                type: 'string'
            },
            rowNetWeight: {
                type: 'string'
            },
            // 重量
            weight: {
                type: 'string'
            },
            netWeight: {
                type: 'string'
            },
            // 重量单位
            weightUnitId: {
                type: 'string'
            },
            // 重量单位
            weightUnitCode: {
                type: 'string'
            },
            // 重量单位
            weightUnitName: {
                type: 'string'
            },
            // 行合计体积
            rowVolume: {
                type: 'string'
            },
            // 体积
            volume: {
                type: 'string'
            },
            // 体积单位
            volumeUnitId: {
                type: 'string'
            },
            // 体积单位
            volumeUnitCode: {
                type: 'string'
            },
            // 体积单位
            volumeUnitName: {
                type: 'string'
            },
            // 计量单位
            measurementUnitId: {
                type: 'string',
                required: true
            },
            // 计量单位
            measurementUnitCode: {
                type: 'string',
                required: true
            },
            // 计量单位
            measurementUnitName: {
                type: 'string',
                required: true
            },
            // 数量
            orderNum: {
                type: 'numberFloat',
            },
            // 主数量
            mainNum: {
                type: "numberFloat"
            },
            // 主数量单位
            mainNumUnit: {
                type: "string"
            },
            // 主数量单位编码")
            mainNumUnitCode: {
                type: "string"
            },
            // 主数量单位名称")
            mainNumUnitName: {
                type: "string"
            },
            // 订货单位
            orderNumUnitId: {
                type: "string"
            },
            // 订货单位编码")
            orderNumUnitCode: {
                type: "string"
            },
            // 订货单位名称")
            orderNumUnitName: {
                type: "string"
            },
            // 基础折扣价
            baseDiscountPrice: {
                type: "priceFloat"
            },
            // 单位换算率
            conversionRate: {
                type: "string"
            },
            // 原金额
            amount: {
                type: 'amountFloat',
            },
            // 单价
            basePrice: {
                type: 'priceFloat',
            },
            // 销售价格
            salePrice: {
                type: 'priceFloat',
            },
            // 成交价
            dealPrice: {
                type: "priceFloat"
            },
            // 成交金额
            dealAmount: {
                type: "amountFloat"
            },
            // 币种
            currency: {
                type: "string"
            },
            isClosed: {
                type: 'string',
                default: "0"
            },
            customerId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['customer']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                "refparam": '{}'
            }, //客户
            customerCode: {
                type: 'string'
            }, //客户编码
            customerName: {
                type: 'string'
            }, //客户名称
            addStorageAmount: {
                type: 'float'
            }, //累计入库数量
            returnGoodsAmount: {
                type: 'float'
            }, //累计退货数量
            name: {
                type: 'string',
                required: true
            },

            //------- 630后 新加bom包件字段 -------
            // 商品版本号
            version: {
                type: 'string',
                required: true
            },
            // 项目
            project: {
                type: 'string',
            },
            // 母件商品ID
            parentGoodsId: {
                type: 'string',
                required: true
            },
            //母件商品Code
            parentGoodsCode: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam': '{"EQ_isEnable":"1"}'
            },
            //母件商品Name
            parentGoodsName: {
                type: 'string',
                required: true
            },
            //母件行号
            parentRowNum: {
                type: 'string',
            },
            childGoodsQty: {
                type: 'float',
            },

            dr: {
                type: 'integer'
            },
        },
        pageSize: 10,
    };
    // 收货地址
    var orderReceiveAddress = {
        type: "child",
        meta: {
            // 订单主键
            orderId: {
                type: "string"
            },
            id: {
                type: "string"
            },
            creator: {
                type: "string"
            },
            dr: {
                type: "string"
            },
            // 收货地址档案ID
            receiveAddressId: {
                type: "string"
            },
            receiveAddressName: {
                type: "string"
            },
            // 收货人
            receiver: {
                type: "string"
            },
            // 收货人电话
            receiverTel: {
                type: "string"
            },
            // 收货人手机
            receiverPhone: {
                type: "string"
            },
            // 国家
            country: {
                type: "string"
            },
            countryId: {
                type: "string"
            },
            // 收货省
            receiverProvince: {
                type: "string"
            },
            receiverProvinceId: {
                type: "string"
            },
            // 收货市
            receiverCity: {
                type: "string"
            },
            receiverCityId: {
                type: "string"
            },
            // 收货县
            receiverCounty: {
                type: "string"
            },
            receiverCountyid: {
                type: "string"
            },
            // 收货镇
            receiverTown: {
                type: "string"
            },
            receiverTownId: {
                type: "string"
            },
            // 收货详细地址
            receiverAddress: {
                type: "string"
            },
            // 收货邮编
            receiverZipcode: {
                type: "string"
            },
        }
    };
    // 发票信息
    var orderInvoice = {
        type: "child",
        meta: {
            // 订单主键
            orderId: {
                type: "string"
            },
            id: {
                type: "string"
            },
            creator: {
                type: "string"
            },
            dr: {
                type: "string"
            },
            // 发票档案ID
            invoiceId: {
                type: "string"
            },
            // 发票类型
            invoiceType: {
                type: "string"
            },
            // 开票项目
            invoiceContent: {
                type: "string"
            },
            // 发票抬头
            invoiceTitle: {
                type: "string"
            },
            // 纳税人识别码
            invoiceTaxId: {
                type: "string"
            },
            // 开户银行
            invoiceBank: {
                type: "string"
            },
            // 开户账户
            invoiceAccount: {
                type: "string"
            },
            // 支行
            invoiceSubBank: {
                type: "string"
            }
        }
    };
    var orderPromRels = {
        type: "child",        
        meta: {
            orderId: {
                type: "string"
            },
            orderItemId: {
                type: "string"
            },
            matchId: {
                type: "string"
            },
            giftId: {
                type: "string"
            },
            ruleId: {
                type: "string"
            },
            activityId: {
                type: "string"
            },
            activityName: {
                type: "string"
            },
            activityCode: {
                type: "string"
            },
            promWay: {
                type: "string"
            },
            combineType: {
                type: "string"
            },
            goodCombineNum: {
                type: "string"
            },
            isWhole: {
                type: "string"
            },
            description: {
                type: "string"
            },
        },
        pageSize: 10
    }
    var soitemmeta = {
        params: {
            cls: "com.yonyou.occ.b2b.service.dto.OrderItemDto"
        },
        meta: {
            // 订单主表主键
            orderId: {
                type: "string"
            },
            // 行号
            rowNum: {
                type: "string"
            },
            // 商品ID
            /* goodsId: {
                type: "string"
            }, */
            goodsId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["allowgoods"]),
                refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                refparam: '{"saleModel": "01", "customerRankCode": "01"}'
            },
            // 商品编码
            goodsCode: {
                type: "string"
            },
            // 商品名称
            goodsName: {
                type: "string"
            },
            // 商品显示名称
            goodsDisplayName: {
                type: 'string'
            },
            // 原始版本商品
            originalGoodsId: {
                type: "string"
            },
            // 商品分类ID
            goodsCategoryId: {
                type: "string"
            },
            // 商品图片
            goodsImg: {
                type: "string"
            },
            // 产品
            productId: {
                type: "string"
            },
            // 产品线
            productLineId: {
                type: "string"
            },
            // 行合计重量
            rowWeight: {
                type: 'string'
            },
            rowNetWeight: {
                type: 'string'
            },
            // 行合计体积
            rowVolume: {
                type: 'string'
            },
            // 重量
            weight: {
                type: "string"
            },
            netWeight: {
                type: 'string'
            },
            // 重量单位
            weightUnit: {
                type: "string"
            },
            // 体积
            volume: {
                type: "string"
            },
            // 体积单位
            volumeUnit: {
                type: "string"
            },
             // 重量单位
             weightUnitId: {
                type: 'string'
            },
            // 重量单位
            weightUnitCode: {
                type: 'string'
            },
            // 重量单位
            weightUnitName: {
                type: 'string'
            },
            // 体积单位
            volumeUnitId: {
                type: 'string'
            },
            // 体积单位
            volumeUnitCode: {
                type: 'string'
            },
            // 体积单位
            volumeUnitName: {
                type: 'string'
            },
            // 订货数量
            orderNum: {
                type: "numberFloat"
            },
             // 总数量
			totalNum: {
				type: "numberFloat",
				precision: 2
			},
            // 订货单位
            orderNumUnitId: {
                type: "string"
            },
            // 订货单位编码")
            orderNumUnitCode: {
                type: "string"
            },
            // 订货单位名称")
            orderNumUnitName: {
                type: "string"
            },
            // 主数量
            mainNum: {
                type: "numberFloat"
            },
            // 主数量单位
            mainNumUnitId: {
                type: "string"
            },
            // 主数量单位编码")
            mainNumUnitCode: {
                type: "string"
            },
            // 主数量单位名称")
            mainNumUnitName: {
                type: "string"
            },
            // 单位换算率
            conversionRate: {
                type: "integer"
            },
            // 单价
            basePrice: {
                type: "priceFloat"
            },
            // 基准折扣价格
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
                type: "float",
                default: "0"
            },
            isClosed: {
                type: 'string',
                default: "0"
            },
            // 促销活动
            promotinId: {
                type: "string"
            },
            promotinName: {
                type: "string"
            },
            // 计划发货日期
            planDeliveryDate: {
                type: "date"
            },
            // 发货库存组织
            deliveryInvOrgId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["organization_ocm"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"发货库存组织" }',
                refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
            },
            // 发货库存组织编码")
            deliveryInvOrgCode: {
                type: "string"
            },
            // 发货库存组织名称")
            deliveryInvOrgName: {
                type: "string"
            },
            // 发货仓库
            deliveryWarehouseId: {
                type: "string",
                required: true,
                refmodel: JSON.stringify(refinfo["warehouse"]),
                refcfg: '{"ctx":"/uitemplate_web"}',
                refparam: '{"EQ_isEnable":"1"}'
            },
            deliveryWarehouseCode: {
                type: "string"
            },
            deliveryWarehouseName: {
                type: "string"
            },
            // 备注
            remark: {
                type: "string"
            },
            // 累计发货数量
            deliveryNum: {
                type: "numberFloat"
            },
            // 累计出库数量
            stockOutNum: {
                type: "numberFloat"
            },
            // 累计入库数量
            stockInNum: {
                type: "numberFloat"
            },
            // 累计退货数量
            returnNum: {
                type: "numberFloat"
            },
            // 累计退款数量
            refundNum: {
                type: "numberFloat"
            },
            // 累计签收数量
            signNum: {
                type: "numberFloat"
            },
            // 累计补货数量
            replenishNum: {
                type: "numberFloat"
            },
            // 累计协同数量
            coordinateNum: {
                type: "numberFloat"
            },
            // 实际退货金额
            totalReturnAmount: {
                type: "amountFloat"
            },
            totalDealAmount: {
                type: "amountFloat"
            },
            // 来源订单号
            srcOrderCode: {
                type: "string"
            },
            // 来源订单主键
            srcOrderId: {
                type: "string"
            },
            // 来源订单行主键
            srcOrderItemId: {
                type: "string"
            },
            closeReason: {
                type: "string"
            },
            // 选配 id
            baseGoodsOptId: {
                type: 'string'
            },
            // 选配 name
            baseGoodsOptValue: {
                type: 'string'
            },
            measurementUnitId: {
                type: 'string',
                required: true
            }, //计量单位
            measurementUnitCode: {
                type: 'string',
                required: true
            }, //计量单位
            measurementUnitName: {
                type: 'string',
                required: true
            }, //计量单位
            arrivalBelongCode: {
                type: 'string',
                required: true
            },
            parentGoodsId: {
                type: 'string',
                required: true
            },
            parentRowNum: {
                type: 'string'
            },
            parentGoodsName: {
                type: 'string',
                required: true
            },
            goodsNum: {
                type: 'numberFloat',
            }, //数量
            baseDiscountPrice: {
                type: 'priceFloat',
                required: true
            }, //单价
            version: {
                type: 'float',
                required: true
            }, //商品版本
            // 结算财务组织
            settleFinancialOrgId: {
                type: "string",
                required: true,
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
            //供应商
            supplierId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["suppliers"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"供应商" }'
            },
            // "供应商编码"
            supplierCode: {
                type: "string"
            },
            // "供应商名称"
            supplierName: {
                type: "string"
            },
            dr: {
                type: 'integer'
            },
            // 客户
			customerId: {
				type: "string",
				required: true,
				refmodel: JSON.stringify(refinfo["customer_sale"]),
				refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
				refparam: '{"EQ_isChannelCustomer": "1"}'
			},
            // 订单状态
            orderStatusId: {
                type: "string"
            },
            // "订单状态编码")
            orderStatusCode: {
                type: "string"
            },
            // "订单状态名称")
            orderStatusName: {
                type: "string"
            },
            // 退货类型
            returnTypeId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["custdocdef"]),
                refcfg: '{"ctx":"/uitemplate_web","refCode":"QY135","refName":"退货类型"}'
            },
            // 退货类型
            returnTypeCode: {
                type: "string"
            },
            // 退货类型
            returnTypeName: {
                type: "string"
            },
            // 退货原因
            returnReasonId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["return_cause"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"退货原因" }'
            },
            // 退货原因
            returnReasonCode: {
                type: "string"
            },
            // 退货原因
            returnReasonName: {
                type: "string"
            },
            isOptional: {
                type: 'boolean'
            },
            // orderPromRels: orderPromRels,
            promRelsId: {
                type: "string"
            }
        },
        pageSize: 10
    };
    var sometaref = {
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
                refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
            },
            // "销售组织编码")
            saleOrgCode: {
                type: "string"
            },
            // "销售组织名称")
            saleOrgName: {
                type: "string"
            },
            // 结算财务组织
            settleFinancialOrgId: {
                type: "string",
                required: true,
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
            // 客户订单类型
            orderTypeId: {
                type: "string",
            },
            // "订单类型编码")
            orderTypeCode: {
                type: "string"
            },
            // "订单类型名称")
            orderTypeName: {
                type: "string"
            },
            // 订单编码
            orderCode: {
                type: "string"
            },
            // 退货单日期
            orderDate: {
                type: "date"
            },
            // 订单状态
            orderStatusId: {
                type: "string"
            },
            // "订单状态编码")
            orderStatusCode: {
                type: "string"
            },
            // "订单状态名称")
            orderStatusName: {
                type: "string"
            },
            // 客户
            customerId: {
                type: "string",
                required: true,
                refmodel: JSON.stringify(refinfo["customer"]),
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
            // 市场区域
            marketAreaId: {
                type: "string"
            },
            // "市场区域编码")
            marketAreaCode: {
                type: "string"
            },
            // "市场区域名称")
            marketAreaName: {
                type: "string"
            },
            // 客户经理
            salesManagerId: {
                type: "string"
            },
            // "客户经理编码")
            salesManagerCode: {
                type: "string"
            },
            // "客户经理名称")
            salesManagerName: {
                type: "string"
            },
            // 销售部门
            salesDeptId: {
                type: "string"
            },
            // "销售部门编码")
            salesDeptCode: {
                type: "string"
            },
            // "销售部门名称")
            salesDeptName: {
                type: "string"
            },
            // 运输方式
            transportModeId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["transportmode"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"运输方式" }'
            },

            // 客户开票信息
            customerInoviceId: {
                type: "string"
            }, // 发票档案ID
            invoiceType: {
                type: "string"
            }, // 发票类型
            invoiceTitle: {
                type: "string"
            }, // 发票抬头
            invoiceTaxId: {
                type: "string"
            }, // 纳税人识别码

            // "运输方式编码")
            transportModeCode: {
                type: "string"
            },
            // "运输方式名称")
            transportModeName: {
                type: "string"
            },
            // 结算方式
            settleModeId: {
                type: "string"
            },
            // "结算方式编码")
            settleModeCode: {
                type: "string"
            },
            // "结算方式名称")
            settleModeName: {
                type: "string"
            },
            // 交货日期(即客户期望的收货日期)
            deliveryDate: {
                type: "data"
            },
            // 总数量
			totalNum: {
				type: "numberFloat",
				precision: 2
			},
            // 币种
            currencyId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["currency"]),
                refcfg: '{"ctx":"/uitemplate_web","refName":"币种" }',
            },
            // "币种编码")
            currencyCode: {
                type: "string"
            },
            // "币种名称")
            currencyName: {
                type: "string"
            },
            // 币种单价精度
            currencyPriceScale: {
                type: "integer"
            },
            // 币种金额精度
            currencyAmountScale: {
                type: "integer"
            },
            // 总成交金额
            totalDealAmount: {
                type: "amountFloat"
            },
            // 冲抵前金额
            totalAmount: {
                type: "amountFloat"
            },
            // 费用冲抵金额
            offsetAmount: {
                type: "amountFloat"
            },
            // 总重量
            totalWeight: {
                type: "string"
            },
            // 总体积
            totalVolume: {
                type: "string"
            },
            // 订单来源
            orderSource: {
                type: "string"
            },
            // 备注
            remark: {
                type: "string"
            },
            // 审批意见
            approveOpinion: {
                type: "string"
            },
            // 审核状态
            approveStatus: {
                type: "integer"
            },
            // 审批人
            approver: {
                type: "string"
            },
            // 审批时间
            approveTime: {
                type: "date"
            },
            // 来源订单号
            srcOrderCode: {
                type: "string"
            },
            // 来源订单主键
            srcOrderId: {
                type: "string"
            },
            // 收货地址
            customeraddressId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["customeraddress"]),
                refcfg: '{"ctx":"/uitemplate_web", "refName":"收货地址"}'
            },
            customeraddressCode: {
                type: "string"
            },
            customeraddressName: {
                type: "string"
            },
            // 货补费用单类型
            costTypeId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["trantype"]),
                refparam: '{"EQ_billTypeId":"CastType"}',
                refcfg: '{"ctx":"/uitemplate_web","refName":"货补订单类型" }'
            },
            costTypeName: {
                type: "string"
            },
            costTypeCode: {
                type: "string"
            },
            saleModel: {
                type: "string"
            }, // 销售模式
            orderItems: soitemmeta,
            orderItemBoms: BomItem
        },
        pageSize: 5
    };
    var orderRefItems = {
        meta: soitemmeta,
        pageSize: 10
    };
    var orderRefBomItems = {
        meta: BomItem,
        pageSize: 10
    };
    var costFlushDetail = {
        meta: {
            supplyMaxOccupyMny: {
                type: 'string'
            },
            costOffsetRatio: {
                type: 'string'
            },
        },
        paheSize: 10

    }
    var orderItemMeta = {};
    var giftPromMeta = {};
    var orderPricePromMeta = {};
    var CustomerCastflushDetail = {
        meta: {
            id: {
                type: 'string'
            }, //id
            customerCastId: {
                type: 'string'
            }, //客户费用单ID
            customerOrderId: {
                type: 'string'
            }, //销售订单ID
            customerOrderCode: {
                type: 'string'
            }, //销售订单编码
            flushDate: {
                type: 'date'
            }, //冲抵日期
            flushAmount: {
                type: 'amountFloat'
            }, //冲抵金额
            flusher: {
                type: 'string'
            }, //冲抵人
            flusherName: {
                type: 'string'
            }, //冲抵人名称
            flushRemark: {
                type: 'string'
            }, //冲抵备注
            billDate: {
                type: "date"
            } //费用单日期
        },
        pageSize: 10
    }
    var searchs = {
        search1: [{
            type: "refer",
            key: "saleOrg",
            label: "销售组织",
            refinfo: "organization_ocm",
            refName: "销售组织",
            clientParam: {
                EQ_orgFuncRel: "01"
            },
        },
            {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                refName: "客户",
                opr: "IN",
                refcfg: {
                    ctx: "/uitemplate_web",
                    isMultiSelectedEnabled: "true"
                }
            },
            {
                type: "combo",
                key: "orderStatus",
                label: "退货状态",
                url: window.pathMap.base +
                    "/cust-doc-defs/cust_doc_code?cust_doc_code=QY133",
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "refer",
                key: "orderType",
                label: "订单类型",
                refinfo: "trantype",
                clientParam: {
                    "EQ_billTypeId": "SaleOrder",
                    "IN_trantypeExtends.fieldValue": "02,04"
                }
            },
            {
                type: "text",
                key: "orderCode",
                label: "订单编号",
                refName: "订单编号"
            },
            {
                type: "daterange",
                key: "orderDate",
                label: "退货单日期"
            },
            // {
            //   type: "radio",
            //   key: "isClose",
            //   label: "订单关闭",
            //   dataSource: [{ value: "1", name: "是" }, { value: "2", name: "否" }]
            // },
            {
                type: "refer",
                key: "marketArea",
                label: "市场区域",
                refinfo: "market",
                refName: "市场区域"
            },
            {
                type: "refer",
                key: "salesDept",
                label: "销售部门",
                refinfo: "department",
                refName: "销售部门"
            },
            {
                type: "refer",
                key: "salesManager",
                label: "客户经理",
                refinfo: "accountManager",
                refName: "客户经理"
            }
        ],
        search2: [{
            type: "text",
            key: "orderCode",
            label: "客户订单编号"
        },
            {
                type: "refer",
                key: "customer",
                label: "客户",
                refinfo: "customer",
                refName: "客户"
            },
            {
                type: "daterange",
                key: "orderDate",
                label: "订单日期"
            },
            {
                type: "refer",
                key: "orderType",
                label: "订单类型",
                refinfo: "trantype",
                clientParam: {
                    "EQ_billTypeId": "SaleOrder",
                    "IN_trantypeExtends.fieldValue": "01,03"
                }
            },
            {
                type: "refer",
                key: "saleOrg",
                label: "销售组织",
                refinfo: "organization_ocm",
                refName: "销售组织"
            },
            {
                type: "refer",
                key: "orderItems--goodsId",
                label: "商品",
                refinfo: "goods",
                refName: "商品"
            },
            {
                type: "refer",
                key: "marketArea",
                label: "市场区域",
                refinfo: "market",
                refName: "市场区域"
            },
            {
                type: "refer",
                key: "salesDept",
                label: "销售部门",
                refinfo: "department",
                refName: "销售部门"
            },
            {
                type: "refer",
                key: "salesManager",
                label: "客户经理",
                refinfo: "accountManager",
                refName: "客户经理"
            }
        ]
    };
    var buttons = {
        buttonList: [{
            key: "showAddRefer",
            label: "参照原单退货",
            iconCls: "icon-plus",
            click: "showAddRefer",
            clickArg: "$data"
        },
            {
                key: "addBillPanel",
                label: "自制退货单",
                iconCls: "icon-plus",
                click: "showAddBillPanel",
                clickArg: "$data"
            },
            // {
            //   key: "addBillPanel",
            //   label: "修改",
            //   iconCls: "icon-edit",
            //   click: "showEditBillPanel",
            //   clickArg: "$data"
            // },
            {
                key: "addBillPanel",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del",
                clickArg: "$data"
            },
            {
                key: "submit",
                label: "提交",
                iconCls: "icon-tubiao-shenhe",
                clickArg: "$data",
                children: [{
                    key: "addBillPanel",
                    label: "提交",
                    click: "submitBillList",
                },
                    {
                        key: "addBillPanel",
                        label: "收回",
                        click: "unsubmitBillList",
                    }
                ]
            },
            {
                key: "approve",
                label: "审批",
                iconCls: "icon-tubiao-shenhe",
                clickArg: "$data",
                children: [{
                    key: "addBillPanel",
                    label: "审批",
                    click: "approveBillList",
                },
                    {
                        key: "addBillPanel",
                        label: "取消审批",
                        click: "unapproveBillList",
                    }
                ]
            },
            {
                key: "addBillPanel",
                label: "驳回客户",
                iconCls: "icon-tubiao-quxiaoshenhe",
                click: "rejectBillPanel",
                clickArg: "$data"
            },
            {
                key: "addBillPanel",
                label: "整单关闭",
                iconCls: "icon-tubiao-guanbi-xianxing",
                click: "closeOrderBillPanel",
                clickArg: "$data"
            },
            {
                key: "addBillPanel",
                label: "整单打开",
                iconCls: "icon-tubiao-duigou-xianxing",
                click: "openOrderBillPanel",
                clickArg: "$data"
            },
            {
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                click: "importHandle"
            },
            {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                click: "exportHandle"
            }
        ],
        buttonEdit: [
           /*  {
                key: "addBillPanel",
                label: "商品参照",
                iconCls: "icon-plus",
                click: "showAddItemsRef"
            }, */
            {
                key: "addRow",
                label: "增行",
                iconCls: "icon-plus",
                click: "add_row"
            },
            {
                key: "export",
                label: "删行",
                iconCls: "icon-shanchu1",
                click: "del_row"
            },
            // {
            //   key: "export",
            //   label: "促销匹配",
            //   iconCls: "icon-tubiao-shenhe",
            //   click: "searchprom"
            // },
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
    };
    var grids = {
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
                    field: "orderTypeName",
                    dataType: "String",
                    title: "订单类型"
                },
                {
                    field: "orderCode",
                    dataType: "String",
                    title: "订单单号",
                    renderType: "detailRender",
                    width: "200px"
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
                    title: "退货状态"
                },
                {
					field: "isClose",
					dataType: "Integer",
					title: "关闭",
					renderType: "disableBooleanRender"
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
        gridDetailItem: {
            domid: "gridDetailItem",
            umeta: {
                id: "grid_salesorder_item",
                data: "saleOrderItems",
                type: "grid",
                editable: false,
                multiSelect: true,
                showNumCol: true
            },
            columns: [{
                field: "rowNum",
                dataType: "String",
                title: "行号",
                editable: false
            },
                {
                    field: "settleFinancialOrgName",
                    dataType: "String",
                    title: "结算财务组织",
                    width: "200px"
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    required: true
                },
                {
                    field: "goodsDisplayName",
                    dataType: "String",
                    title: "商品名称",
                },
                {
                    "field": "version",
                    "dataType": "String",
                    "title": "商品版本",
                },
                {
                    "field": "promotinName",
                    "dataType": "String",
                    "title": "促销活动",
                },
                {
                    "field": "baseGoodsOptValue",
                    "dataType": "String",
                    "title": "选配信息",
                    renderType: "goodsOptDetails",
                },
                {
                    field: "mainNum",
                    dataType: "String",
                    title: "商品数量",
                },
                {
                    field: "orderNum",
                    dataType: "String",
                    title: "退货量",
                    required: true
                },
                {
                    field: "salePrice",
                    dataType: "String",
                    title: "单价",
                    required: true
                },
                {
                    field: "dealPrice",
                    dataType: "String",
                    title: "成交价",
                    required: true
                },
                // {field:"amount",dataType:"String",title:"冲抵前金额",,editable: false, required: true},// 默认不显示
                // {field:"offsetAmount",dataType:"String",title:"冲抵金额"},// 默认不显示
                {
                    field: "dealAmount",
                    dataType: "String",
                    title: "成交金额",
                    required: true
                },
                {
                    field: "totalReturnAmount",
                    dataType: "String",
                    title: "实际退款金额",
                    required: true
                },
                {
                    field: "returnReasonName",
                    dataType: "String",
                    title: "退货原因",
                },
                {
                    field: "returnTypeName",
                    dataType: "String",
                    title: "退货类型",
                },
                {
                    field: "deliveryInvOrgName",
                    dataType: "String",
                    title: "收货库存组织",
                },
                {
                    field: "deliveryWarehouseName",
                    dataType: "String",
                    title: "收货仓库",
                },
                {
                    field: "isGift",
                    dataType: "checkbox",
                    editType: "float",
                    title: "赠品",
                    renderType: "disableBooleanRender",
                },
                {
					field: "isClose",
					dataType: "Integer",
					title: "关闭",
					editable: false,
					renderType: "disableBooleanRender"
				},
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "rowWeight",
                    dataType: "String",
                    title: "总重量",
                    editable: false
                },
                {
                    field: "rowNetWeight",
                    dataType: "String",
                    title: "总净重",
                    editable: false
                },
                {
                    field: "rowVolume",
                    dataType: "String",
                    title: "总体积",
                    editable: false
                },
                // { field:"weight",dataType:"String",title:"重量"},// 默认不显示
                // { field:"weight",dataType:"String",title:"体积"},// 默认不显示
                {
                    field: "planDeliveryDate",
                    dataType: "Date",
                    editType: "date",
                    title: "计划发货日期",
                    visible: false
                },
                { 
                    field: "stockInNum", 
                    dataType: "String", 
                    title: "累计入库数量", 
                    visible: false 
                },
                // {field:"deliveryNum",dataType:"String",title:"累计安排发货数量",editable: false},// 默认不显示
                // {field:"stockOutNum",dataType:"String",title:"累计出库数量",editable: false},// 默认不显示
                // {field:"returnNum",dataType:"String",title:"累计退货数量",editable: false},// 默认不显示

                // { field: "closeReason", dataType: "String", title: "关闭打开原因"},
                // { field: "deliveryNum", dataType: "String", title: "累计发货数量", editable: false, visible: false },
                // { field: "stockOutNum", dataType: "String", title: "累计出库数量", editable: false, visible: false },
                // { field: "signNum", dataType: "String", title: "累计签收数量", editable: false, visible: false  },
                // { field: "returnNum", dataType: "String", title: "累计退货数量", editable: false, visible: false }
            ]
        },
        gridEditItem: {
            domid: "gridEditItem",
            umeta: {
                id: "grid_salesorder_edit",
                data: "saleOrderItems",
                type: "grid",
                editable: true,
                multiSelect: true,
                // showNumCol: true,
                onBeforeEditFun: "beforeEditCheck"
            },
            columns: [{
                    field: "rowNum",
                    dataType: "String",
                    title: "行号",
                    editable: false
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
                            refname: "settleFinancialOrgName"
                        }
                    },
                    required: true,
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    editable: false,
                    required: true
                },
                {
                    field: "goodsId",
                    dataType: "String",
                    title: "商品名称",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "goodsDisplayName",
                    editOptions: {
                        validType: "string"
                    },
                    required: true,
                },
                /* {
                    field: "goodsDisplayName",
                    dataType: "String",
                    title: "商品名称",
                    editable: false
                }, */
                {
                    "field": "version",
                    "dataType": "String",
                    "title": "商品版本",
                    "editable": false,
                    "visible": true,
                },
                {
                    field: "promotinName",
                    dataType: "String",
                    title: "促销活动",
                    editable: false
                },
                {
                    field: "baseGoodsOptValue",
                    dataType: "String",
                    title: "商品选配",
                    renderType: "goodsOpt",
                    editable: false,
                },
                {
                    field: "baseGoodsOptId",
                    dataType: "String",
                    title: "商品选配Id",
                    editable: false,
                    visible: false
                },
                {
                    field: "mainNum",
                    dataType: "String",
                    title: "商品数量",
                    editable: false
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
                    },
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
                },
                {
                    field: "orderNum",
                    dataType: "String",
                    title: "退货量",
                    required: true
                },
                {
                    field: "salePrice",
                    dataType: "String",
                    title: "单价",
                    editable: true,
                    required: true
                },
                {
                    field: "dealPrice",
                    dataType: "String",
                    title: "成交价",
                    editable: true,
                    required: true
                },
                // {field:"amount",dataType:"String",title:"冲抵前金额",,editable: false, required: true},// 默认不显示
                // {field:"offsetAmount",dataType:"String",title:"冲抵金额"},// 默认不显示
                {
                    field: "dealAmount",
                    dataType: "String",
                    title: "成交金额",
                    editable: false,
                    required: true
                },
                {
                    field: "totalReturnAmount",
                    dataType: "String",
                    title: "实际退款金额",
                    editable: false,
                    required: true
                },
                {
                    field: "returnReasonId",
                    dataType: "String",
                    title: "退货原因",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "returnReasonName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "returnReasonId",
                            refname: "returnReasonName"
                        }
                    },
                },
                {
                    field: "returnTypeId",
                    dataType: "String",
                    title: "退货类型",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refname: "returnTypeName",
                            refcode: "returnTypeCode"
                        }
                    },
                    showField: "returnTypeName",
                    required: true,
                },
                {
                    field: "deliveryInvOrgId",
                    dataType: "String",
                    title: "收货库存组织",
                    renderType: "ncReferRender",
                    editType: "ncReferEditType",
                    showField: "deliveryInvOrgName",
                    editOptions: {
                        validType: "string",
                        rel: {
                            refpk: "deliveryInvOrgId",
                            refname: "deliveryInvOrgName"
                        }
                    },
                },
                {
                    field: "deliveryWarehouseId",
                    dataType: "String",
                    title: "收货仓库",
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
                    },
                },
                {
                    field: "isGift",
                    dataType: "checkbox",
                    editable: true,
                    editType: "float",
                    title: "赠品",
                    renderType: "booleanRender",
                    default: 0
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注",
                    editable: true
                },
                {
                    field: "rowWeight",
                    dataType: "String",
                    title: "总重量",
                    editable: false
                },
                {
                    field: "rowNetWeight",
                    dataType: "String",
                    title: "总净重",
                    editable: false
                },
                {
                    field: "rowVolume",
                    dataType: "String",
                    title: "总体积",
                    editable: false
                },
                {
                    field: "isClosed",
                    dataType: "checkbox",
                    title: "关闭",
                    width: "130px",
                    renderType: "booleanRender",
                },
                { 
                    field: "stockInNum", 
                    dataType: "String", 
                    title: "累计入库数量", 
                    editable: false, 
                    visible: false 
                },
                // { field:"weight",dataType:"String",title:"重量"},// 默认不显示
                // { field:"weight",dataType:"String",title:"体积"},// 默认不显示
                {
                    field: "planDeliveryDate",
                    dataType: "Date",
                    editType: "date",
                    title: "计划发货日期",
                    visible: false
                },
                // {field:"deliveryNum",dataType:"String",title:"累计安排发货数量",editable: false},// 默认不显示
                // {field:"stockOutNum",dataType:"String",title:"累计出库数量",editable: false},// 默认不显示
                // {field:"returnNum",dataType:"String",title:"累计退货数量",editable: false},// 默认不显示
                // { field: "closeReason", dataType: "String", title: "关闭打开原因"},
                // { field: "deliveryNum", dataType: "String", title: "累计发货数量", editable: false, visible: false },
                // { field: "stockOutNum", dataType: "String", title: "累计出库数量", editable: false, visible: false },
                // { field: "signNum", dataType: "String", title: "累计签收数量", editable: false, visible: false  },
                // { field: "returnNum", dataType: "String", title: "累计退货数量", editable: false, visible: false }
            ]
        },
        gridFlushDetail: {
            domid: "flush_detail",
            umeta: {
                id: "grid_flush_detail",
                data: "CustomerCastflushDetailItem",
                type: "grid",
                editable: false,
                //multiSelect: true,
                showNumCol: true,
            },
            columns: [{
                field: "customerOrderCode",
                dataType: "String",
                title: "订单号"
            },
                {
                    field: "flushDate",
                    dataType: "Date",
                    title: "冲抵日期"
                },
                {
                    field: "flushAmount",
                    dataType: "String",
                    title: "冲抵金额"
                },
                {
                    field: "flusherName",
                    dataType: "String",
                    title: "冲抵人"
                },
                {
                    field: "flushRemark",
                    dataType: "String",
                    title: "冲抵备注",
                }
            ]
        },
        //bom结构信息
        grid4: {
            domid: "grid_BomItem",
            umeta: {
                "id": "grid_complexBomItem",
                "data": "batchSaleOrderBomItems",
                "type": "grid",
                "editable": true,
                "showNumCol": true,
            },
            columns: [{
                "field": "rowNum",
                "dataType": "String",
                "title": "行号",
                "editable": false,
            },
                {
                    "field": "parentRowNum",
                    "dataType": "String",
                    "title": "母件商品行号",
                    "editable": false
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
                    "field": "version",
                    "dataType": "String",
                    "title": "商品版本",
                    "editable": false
                },
                {
                    "field": "baseGoodsOptValue",
                    "dataType": "String",
                    "title": "选配信息",
                    "editable": false
                },
                {
                    "field": "baseGoodsOptId",
                    "dataType": "String",
                    "title": "选配信息Id",
                    "editable": false,
                    visible: false
                },
                {
                    "field": "mainNum",
                    "dataType": "String",
                    "title": "主数量",
                    "editable": false
                },
                {
                    "field": "orderNum",
                    "dataType": "String",
                    "title": "数量",
                    "editable": false
                },
                {
                    "field": "mainNumUnitName",
                    "dataType": "String",
                    "title": "单位",
                    "editable": false
                },
                {
                    "field": "salePrice",
                    "dataType": "String",
                    "title": "单价",
                    "editable": false
                },
                {
                    "field": "dealAmount",
                    "dataType": "String",
                    "title": "成交金额",
                    "editable": false
                },
                /* {
                    "field": "isClosed",
                    "dataType": "checkbox",
                    "title": "关闭",
                    "editable": false,
                    "width": "130px",
                    "renderType": "disableBooleanRender",
                }, */
                {
                    "field": "isGift",
                    "dataType": "checkbox",
                    "title": "赠品",
                    "visible": false,
                    "editable": false,
                    "renderType": "disableBooleanRender",
                },
                /* {
                    "field": "addStorageAmount",
                    "dataType": "String",
                    "title": "累计入库数量",
                    "editable": false,
                },
                {
                    "field": "returnGoodsAmount",
                    "dataType": "String",
                    "title": "累计退货数量",
                    "editable": false,
                }, */
                {
                    "field": "stockStatus",
                    "dataType": "String",
                    "title": "库存状态",
                    "renderType": "stockRender",
                    "editable": false,
                },
            ]
        },
        grid5: {
            domid: "grid_complexBomItem_Detail",
            umeta: {
                "id": "grid_complexBomItem_detail",
                "data": "batchSaleOrderBomItems",
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
                    "field": "version",
                    "dataType": "String",
                    "title": "商品版本",
                },
                {
                    "field": "baseGoodsOptValue",
                    "dataType": "String",
                    "title": "选配信息",
                },
                {
                    "field": "mainNum",
                    "dataType": "String",
                    "title": "主数量",
                },
                {
                    "field": "orderNum",
                    "dataType": "String",
                    "title": "数量",
                    "required": true,
                },
                {
                    "field": "mainNumUnitName",
                    "dataType": "String",
                    "title": "单位",
                },
                {
                    "field": "basePrice",
                    "dataType": "String",
                    "title": "单价",
                },
                {
                    "field": "dealAmount",
                    "dataType": "String",
                    "title": "成交金额",
                },
                /* {
                    "field": "isClosed",
                    "dataType": "checkbox",
                    "title": "关闭",
                    "width": "130px",
                    "renderType": "disableBooleanRender",
                }, */
                {
                    "field": "isGift",
                    "dataType": "checkbox",
                    "title": "赠品",
                    "editType": "float",
                    "renderType": "disableBooleanRender",
                },
                /* {
                    "field": "addStorageAmount",
                    "dataType": "String",
                    "title": "累计入库数量",
                },
                {
                    "field": "returnGoodsAmount",
                    "dataType": "String",
                    "title": "累计退货数量",
                }, */
                {
                    "field": "stockStatus",
                    "dataType": "String",
                    "title": "库存状态",
                    "renderType": "stockRender",
                },
            ]
        },
        gridRefh: {
            domid: "grid_saleout4",
            umeta: {
                id: "grid_referList",
                data: "salesrefOrderList",
                type: "grid",
                editable: false,
                multiSelect: true,
                // onRowSelected: "referSelectHandle",
                onRowSelected: "referSelectBeforHandle",
                onBeforeClickFun: "referSelectBeforHandle",
                onRowUnSelected: "referUnSelectHandle",
            },
            columns: [{
                field: "orderCode",
                dataType: "String",
                title: "订单单号",
                width: "200px"
            },
                {
                    field: "orderDate",
                    dataType: "Date",
                    title: "订单日期"
                },
                {
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
                    field: "orderTypeName",
                    dataType: "String",
                    title: "订单类型"
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
                    field: "remark",
                    dataType: "String",
                    title: "备注"
                },
                {
                    field: "customeraddressName",
                    dataType: "String",
                    title: "收货地址"
                }
            ]
        },
        gridRefb: {
            domid: "grid_saleout5",
            umeta: {
                id: "grid_referListItem",
                data: "salesrefOrderItemList",
                type: "grid",
                editable: false,
                multiSelect: true,
                // "onRowSelected": "referSelectItemHandle",
                // "onRowUnSelected": "referUnSelectItemHandle",
            },
            columns: [{
                field: "goodsCode",
                dataType: "String",
                title: "商品编码",
            },
                {
                    field: "goodsDisplayName",
                    dataType: "String",
                    title: "商品名称",
                },
                {
                    field: "mainNum",
                    dataType: "Input",
                    title: "商品数量",
                    visible: true
                },
                {
                    field: "orderNum",
                    dataType: "String",
                    title: "订货量"
                },
                {
                    field: "salePrice",
                    dataType: "String",
                    title: "单价",
                },
                {
                    field: "dealPrice",
                    dataType: "String",
                    title: "成交价"
                },
                {
                    field: "dealAmount",
                    dataType: "String",
                    title: "成交金额",
                },

                // { field: "closeReason", dataType: "String", title: "关闭打开原因"},
                // { field: "deliveryNum", dataType: "String", title: "累计发货数量", editable: false, visible: false },
                {
                    field: "stockOutNum",
                    dataType: "String",
                    title: "累计出库数量",
                    editable: false
                },
                // { field: "signNum", dataType: "String", title: "累计签收数量", editable: false, visible: false  },
                // { field: "stockInNum", dataType: "String", title: "累计入库数量", editable: false, visible: false },
                {
                    field: "returnNum",
                    dataType: "String",
                    title: "累计退货数量",
                    editable: false
                },
                {
                    field: "deliveryInvOrgName",
                    dataType: "String",
                    title: "发货库存组织",
                },
                {
                    field: "settleFinancialOrgName",
                    dataType: "String",
                    title: "结算财务组织",
                },
                {
                    field: "isGift",
                    dataType: "checkbox",
                    editType: "float",
                    title: "赠品",
                    renderType: "disableBooleanRender",
                    default: 0
                },
                {
                    field: "promotinName",
                    dataType: "String",
                    title: "促销活动",
                    visible: false
                },
                {
                    field: "deliveryWarehouseName",
                    dataType: "String",
                    title: "发货仓库",
                    visible: true
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注",
                    editable: true,
                    visible: true
                },
            ]
        },
        gridRefBom: {
            domid: "grid_saleout6",
            umeta: {
                id: "grid_referBomListItem",
                data: "salesrefOrderBomItemList",
                type: "grid",
                editable: false,
                multiSelect: false,
                // "onRowSelected": "referSelectItemHandle",
                // "onRowUnSelected": "referUnSelectItemHandle",
            },
            columns: [{
                "field": "rowNum",
                "dataType": "String",
                "title": "行号",
                "editable": false,
            },
                {
                    "field": "parentRowNum",
                    "dataType": "String",
                    "title": "母件商品行号",
                    "editable": false
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
                    "field": "version",
                    "dataType": "String",
                    "title": "商品版本",
                    "editable": false
                },
                {
                    "field": "baseGoodsOptValue",
                    "dataType": "String",
                    "title": "选配信息",
                    "editable": false
                },
                {
                    "field": "mainNum",
                    "dataType": "String",
                    "title": "主数量",
                    "editable": false
                },
                {
                    "field": "goodsNum",
                    "dataType": "String",
                    "title": "数量",
                    "editable": false
                },
                {
                    "field": "mainNumUnitName",
                    "dataType": "String",
                    "title": "单位",
                    "editable": false
                },
                {
                    "field": "salePrice",
                    "dataType": "String",
                    "title": "单价",
                    "editable": false
                },
                {
                    "field": "dealAmount",
                    "dataType": "String",
                    "title": "成交金额",
                    "editable": false
                },
                {
                    "field": "isClosed",
                    "dataType": "checkbox",
                    "title": "关闭",
                    "editable": false,
                    "width": "130px",
                    "renderType": "booleanRender",
                },
                {
                    "field": "isGift",
                    "dataType": "checkbox",
                    "editable": true,
                    "title": "赠品",
                    "visible": false
                    // "renderType": "booleanRender",
                },
            ]
        },
    };
    var cards = {
        cardDetail: [{
            type: "textreadonly",
            key: "orderCode",
            label: "订单编号"
        },
            {
                type: "textreadonly",
                key: "saleOrgName",
                refinfo: "organization_ocm",
                label: "销售组织"
            },
            {
                type: "textreadonly",
                key: "customerName",
                refinfo: "customer",
                label: "客户"
            },
            {
                type: "textreadonly",
                key: "orderTypeName",
                label: "退货单类型",
            },
            {
                type: "textreadonly",
                key: "salesManagerName",
                label: "客户经理",
            },
            {
                type: "textreadonly",
                key: "salesDeptName",
                label: "销售部门",
            },
            {
                type: "textreadonly",
                key: "costTypeName",
                label: "货补费用单类型",
            },
            {
                type: "textreadonly",
                key: "orderStatusName",
                label: "退货状态",
                value: "待提交"
            },
            {
                type: "textreadonly",
                key: "deliveryDate",
                label: "预计发货日期"
            },
            {
                type: "textreadonly",
                key: "orderDate",
                label: "退货单日期",
                defaultValue: new Date().getTime(),
                required: true
            },
            {
                type: "textreadonly",
                key: "receiverAddress",
                refinfo: "customeraddress",
                label: "客户发货地址",
                disableFilter: true
            },
            {
                type: "textreadonly",
                key: "receiver",
                label: "发货人"
            },
            {
                type: "textreadonly",
                key: "receiverPhone",
                label: "发货人电话"
            },
            {
                type: "textreadonly",
                key: "accountPeriodName",
                label: "账期",
            },
            {
                type: "textreadonly",
                key: "invoiceTitle",
                label: "客户开票单位",
            },
            // {
            //   type: "refer",
            //   key: "settleFinancialOrgId",
            //   referId: "settleFinancialOrgId",
            //   label: "结算财务组织",
            //   refinfo: "organization_ocm",
            //   clientParam:{
            //     "EQ_isLegalPersonCorp":"1"
            //   },
            //   required: true
            // },
            {
                type: "textreadonly",
                key: "remark",
                label: "备注"
            },
            {
                type: "textreadonly",
                key: "approveOpinion",
                label: "审批意见"
            },
            {
                type: "textreadonly",
                key: "rejectReason",
                label: "驳回原因"
            },
            {
                type: "textreadonly",
                key: "returnReasonName",
                label: "退货原因"
            },
            {
                type: "textreadonly",
                key: "totalNum",
                label: "总数量"
            },
            {
                type: "textreadonly",
                key: "totalDealAmount",
                label: "总金额"
            },
            {
                type: "textreadonly",
                key: "totalReturnAmount",
                label: "实际退款金额"
            },
            {
                type: "textreadonly",
                key: "totalWeight",
                label: "总重量"
            },
            {
                type: "textreadonly",
                key: "totalNetWeight",
                label: "总净重"
            },
            {
                type: "textreadonly",
                key: "totalVolume",
                label: "总体积"
            },
            {
                type: "refer",
                key: "currencyName",
                label: "币种",
                refinfo: "currency",
            }
        ],
        cardEdit: [{
            type: "textreadonly",
            key: "orderCode",
            label: "订单编号"
        },
            {
                type: "refer",
                key: "saleOrgId",
                referId: "saleOrgId",
                label: "销售组织",
                refinfo: "organization_ocm",
                clientParam: {
                    "EQ_orgFuncRel": "01"
                },
                required: true
            },
            {
                type: "refer",
                key: "customerId",
                referId: "customerId",
                label: "客户",
                refinfo: "customer",
                clientParam: {
                    'EQ_isChannelCustomer': '1'
                },
                required: true,
            },
            {
                type: "refer",
                key: "orderTypeId",
                referId: "orderTypeId",
                label: "退货单类型",
                refinfo: "trantype",
                clientParam: {
                    "EQ_billTypeId": "SaleOrder",
                    "IN_trantypeExtends.fieldValue": "02,04"
                },
                required: true,
            },
            {
				referId: "personId",
				type: "refer",
				domid: "salesManagerId",
				compid: "salesManagerBase",
				key: "salesManagerId",
				label: "客户经理",
				refinfo: "person"
            },
            {
				referId: "departmentId",
				type: "refer",
				key: "salesDeptId",
				label: "销售部门",
				domid: "salesDeptId",
				compid: "salesDeptBase",
				refinfo: "department",
				clientParam: {
					"AUTH_refcod": "saleorder"
                },
                required: true,
			},
            // {
            // 	type: "refer",
            // 	key: "costTypeId",
            // 	referId: "costTypeId",
            // 	label: "货补费用单类型",
            // 	refinfo: "trantype",
            // 	clientParam: {
            // 		"EQ_billTypeId": "CastType"
            // 	},
            // },
            {
                type: "text",
                key: "orderStatus",
                label: "退货状态",
                value: "待提交",
                enable:false
            },
            {
                type: "date",
                key: "deliveryDate",
                label: "预计发货日期",
            },
            {
                type: "date",
                key: "orderDate",
                label: "退货单日期",
                defaultValue: new Date(),
                required: true
            },
            {
                type: "refer",
                key: "receiveAddressId",
                refinfo: "customeraddress",
                label: "客户发货地址",
                disableFilter: true,
				compid: "receiveAddressBase",
				referId: "receiveAddress"
            },
            {
                type: "text",
                key: "receiver",
                label: "发货人"
            },
            {
                type: "text",
                key: "receiverPhone",
                label: "发货人电话"
            },
            {
                type: "refer",
                key: "accountPeriodId",
                refinfo: "settlementSettings",
                label: "账期",
                disableFilter: true
            },
            {
                type: "refer",
                key: "invoiceId",
                referId: "customerInoviceId",
                label: "客户开票单位",
                refinfo: "customer-invoice",
                // clientParam: {"EQ_customer":"SaleOrder"},
                disableFilter: true,
				compid: "customerInoviceBase",
				referId: "invoiceId"
            },
            // {
            //   type: "refer",
            //   key: "settleFinancialOrgId",
            //   referId: "settleFinancialOrgId",
            //   label: "结算财务组织",
            //   refinfo: "organization_ocm",
            //   clientParam:{
            //     "EQ_isLegalPersonCorp":"1"
            //   },
            //   required: true
            // },
            {
                type: "text",
                key: "remark",
                label: "备注"
            },
            {
                type: "text",
                key: "approveOpinion",
                label: "审批意见"
            },
            {
                type: "text",
                key: "rejectReason",
                label: "驳回原因"
            },
            {
                type: "refer",
                key: "returnReasonId",
                label: "退货原因",
                refinfo: "return_cause",
            },
            {
                type: "text",
                key: "totalNum",
                label: "总数量",
                enable:false
            },
            {
                type: "text",
                key: "totalDealAmount",
                label: "总金额",
                enable:false
            },
            {
                type: "text",
                key: "totalReturnAmount",
                label: "实际退款金额",
                enable:false
            },
            {
                type: "text",
                key: "totalWeight",
                label: "总重量",
                enable:false
            },
            {
                type: "text",
                key: "totalNetWeight",
                label: "总净重",
                enable:false
            },
            {
                type: "text",
                key: "totalVolume",
                label: "总体积",
                enable:false
            },
            {
                type: "refer",
                key: "currencyId",
                label: "币种",
                refinfo: "currency",
            }
        ]
    };
    var ItemRef = {
        meta: {
            productref: {
                domid: "itemproductref",
                type: "string",
                refmodel: JSON.stringify(refinfo["allowgoods"]),
                refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                refparam: '{"saleModel": "01", "customerRankCode": "01"}'
            }
        }
    };
    var model = {
        metas: {
            someta: someta,
            soitemmeta: soitemmeta,
            sometaref: sometaref,
            orderRefItems: orderRefItems,
            ItemRef: ItemRef,
            CustomerCastflushDetail: CustomerCastflushDetail,
            orderReceiveAddress: orderReceiveAddress,
            orderInvoice: orderInvoice,
        },
        searchs: searchs,
        buttons: buttons,
        grids: grids,
        cards: cards,
    };
    return new basemodel(model);
});
