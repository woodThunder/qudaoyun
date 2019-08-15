define(["ocm_global"], function() {
    //主表商品
    window.PrimaryGoodsMeta = {
        meta: {        
            //平台id-参照
            platformId:{type: 'string',
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
            },
            platformCode:{type: 'string'},//平台编码-参照
            platformName: {type: 'string'},//平台名称-参照
            //店铺id-参照
            storeId:{type: 'string',
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
            },
            storeCode:{type: 'string'},//店铺编码-参照
            storeName: {type: 'string'},//店铺名称-参照
            platformNumber: {
                type: "string",
                required: true //平台单号
            },
            commerceNumber: {
                type: "string",
                required: true //电商单号
            },
            orderType: {
                type: "string",
                required: true //订单类型
            },
            orderStatus: {
                type: "string",
                required: true //订单状态
            },
            platformStatus: {
                type: "string",
                required: true //平台状态
            },
            logisticsMode: {
                type: "string",
                required: true //物流方式
            },
            buyerName: {
                type: "string",
                required: true //买家名称
            },
            totalTransactionAmount: {
                type: "string",
                required: true //总成交金额
            },
            totalClosingAmount: {
                type: "string",
                required: true //总关闭金额
            },
            totalDiffBillAmount: {
                type: "string",
                required: true //总对账金额
            },
            totalNoDiffBillAmount: {
                type: "string",
                required: true //总未对账金额
            },
            totalAlreadyDiffBillAmount: {
                type: "string",
                required: true //总已对账金额
            },
            diffBillStatus: {
                type: "string",
                required: true //对账状态
            },
            exceptionFlag: {
                type: "string",
                required: true //异常标识
            },
            verifyTime: {
                type: "string",
                required: true //勾兑时间
            },
            orderTime: {
                type: "string",
                required: true //下单时间
            },
            paymentTime: {
                type: "string",
                required: true //付款时间
            },
            checkPeople: {
                type: "string",
                required: true //对账人
            },        
        },
        pageSize: 10
    }
    //商品子表
    window.ECProductMeta = {
        meta: {
            id: {
                type: "string"
            },
			productCode: {
                type: "string"//商品编码
            },
            productName: {
                type: "string"//商品名称
            },
            productGroupCode: {
                type: "string"//商品组合编码
            },
            productGroupName: {
                type: "string"//商品组合名称
            },
            productGroupNumber: {
                type: "string"//商品组合数量
            },
            productGroupNumberDiff: {
                type: "string"//商品组合数量比
            },                                    
            isPresented: {
                type: "string"//是否赠品
            },
            tagPrice: {
                type: "string"//吊牌价
            },
            succeedUnitPrice: {
                type: "string"//成交单价
            },
            succeedMoney: {
                type: "string"//成交金额
            },
            buyNumber: {
                type: "string"//购买数量
            },
            closeNumber: {
                type: "string"//关闭数量
            },
            closeAmount: {
                type: "string"//关闭金额
            },
            diffBillAmount: {
                type: "string"//对账金额
            },
            alreadyDiffBillAmount: {
                type: "string"//已对账金额
            },
            noDiffBillAmount: {
                type: "string"//未对账金额
            },
        }
    }
})