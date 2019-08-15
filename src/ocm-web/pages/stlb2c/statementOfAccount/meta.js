define(["ocm_global"], function () {
    //平台账单Meta
    window.PlatformBillSonMeta = {
        meta: {
            //平台账单
            platformBillId: {
                type: 'string'
            },
            //平台id
            platformId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['b2cplatform']),
                'refcfg': '{"ctx":"/uitemplate_web"}',
            },  
            //平台名称                             
            platformName: {
                type: 'string'
            },
            //平台编码  
            platformCode: {
                type: 'string'
            },
            //店铺ID
            storeId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
                'refcfg': '{"ctx":"/uitemplate_web"}',
            },
            //店铺名称
            storeName: {
                type: 'string'
            },
            //店铺编码               
            storeCode: {
                type: 'string'
            },
             //账务流水号
            accountRunningNumber: {
                type: 'string'
            },
            //业务流水号
            businessRunningNumber: {
                type: 'string'
            },
            //商户订单号
            merchantOrderNumber: {
                type: 'string'
            },
            //平台单号
            platformNumber: {
                type: 'string'
            },
            //收支日期
            revenueExpenditureTime: {
                type: 'date'
            },
            // 对方账号
            reciprocalAccount: {
                type: 'string'
            },
            //收支类型ID
            revenueExpenditureTypeId:{
                type: 'string',
                "refmodel": JSON.stringify(refinfo['exacctType']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
            },
            //收支类型Code
            revenueExpenditureTypeCode:{
                type: 'string'
            },
            //收支类型Name
             revenueExpenditureTypeName: {
                 type: 'string'
            },
            //收支金额
            revenueExpenditureMoney: {
                type: 'float'
            },
            //备注
            remark: {
                type: 'string',
            },
            //对账标识
            accountMark: {
                type: 'integer',
                default:'0' 
            },
            //异常标识
            exceptionalMark: {
                type: 'integer',
                default:'0' 
            },
            //对账金额
            accountMoney: {
                type: 'float'
            },
            //未对账金额
            nonAccountMoney: {
                type: 'float',
                default:'0'
            },
            //业务类型
            businessType: {
                type: 'string'
            },
            //商品名称
            goodsName: {
                type: 'string'
            },
            //勾兑时间
            blendingTime: {
                type: 'date'
            },
            //对账人
            checkMan: {
               type: 'string'
            },                  
        },
        pageSize: 10,
    }
    
    //订单列表Meta
    window.OrderListMeta = {
        meta: {        
            //平台ID
            platformId:{
                type: 'string',
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
            },
            //平台Code
            platformCode:{
                type: 'string'
            },
            //平台Name
            platformName:{
                type: 'string'
            },
            //店铺ID
            storeId:{type: 'string',
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
            },
            //店铺Code
            storeCode:{
                type: 'string'
            },
            //店铺Name
            storeName:{
                type: 'string'
            },
            //平台单号
            platformNumber: {
                type: "string"
            },
            //电商单号
            commerceNumber: {
                type: "string"
            },
            //订单类型
            orderType: {
                type: "string"
            },
            //订单状态
            orderStatus: {
                type: "string"
            },
            //平台状态
            platformStatus: {
                type: "string"
            },
            //物流方式
            logisticsMode: {
                type: "string"
            },
            //买家名称
            buyerName: {
                type: "string"
            },
            //总成交金额
            totalTransactionAmount: {
                type: "string" 
            },
            //总关闭金额
            totalClosingAmount: {
                type: "string"
            },
            //总对账金额
            totalDiffBillAmount: {
                type: "string"
            },
            //总未对账金额
            totalNoDiffBillAmount: {
                type: "string"
            },
            //总已对账金额
            totalAlreadyDiffBillAmount: {
                type: "string"
            },
            //对账状态
            diffBillStatus: {
                type: "string"
            },
            //异常标识
            exceptionFlag: {
                type: "string"
            },
            //勾兑时间
            verifyTime: {
                type: "string"
            },
            //下单时间
            orderTime: {
                type: "string" 
            },
            //付款时间
            paymentTime: {
                type: "string"
            },
            //对账人
            checkPeople: {
                type: "string"
            },        
        },
        pageSize: 10,
    }

    //核销结果Meta
    window.MergedResultMeta = {
        meta: {
            //平台ID
            platformId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['b2cplatform']),
                'refcfg': '{"ctx":"/uitemplate_web"}',
            },              
            //平台Name
            platformName: {
                type: 'string'
            },     
            //平台Code          
            platformCode: {
                type: 'string'
            },
            //店铺ID
            storeId: {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
                'refcfg': '{"ctx":"/uitemplate_web"}',
            },   
            //店铺Name               
            storeName: {
                type: 'string'
            },        
            //店铺Code       
            storeCode: {
                type: 'string'
            },
            //平台单号
            platformNumber: {
                type: 'string'
            },
            //单据号
            documentsNumber: {
                type: 'string'
            }, 
            //单据类型
            documentsType: {
                type: 'string'
            },
            //对应单据号
            diffDocumentsNumber: {
                type: 'string'
            },
            //对应单据类型
            diffDocumentsType: {
                type: 'string'
            },
            //对账金额
            diffMoney: {
                type: 'string'
            },
            //勾兑时间
            verifyTime: {
                type: 'float'
            },
            //对账人
            checkPeoplo: {
                type: 'string',
            },
            //对账状态
            diffMoneyStatus: {
                type: 'diffMoneyStatus',
            },
        },
        pageSize: 10,
    }

    //差异调整单Meta
    window.DefferenceAdjustMeta = {
        meta: {
            //id
            id: { 
                type: 'string' 
            },
            //调整单编码
            adjustCode: { 
                type: 'string'
            },
            //平台单号
            platformNumber: {
                type: 'string'
            },
            //电商单号
            commerceNumber:{
                type:'string'
            }, 
            //平台ID
            platformId:{ 
                type: "string",
                required: true,//不能为空 ，false 可以为空
                "refmodel": JSON.stringify(refinfo['b2cplatform']), //对应参照定义名称
                "refcfg": '{"ctx":"/uitemplate_web","refName":"平台信息"}',
            },
            //店铺ID 
            storeId:{
                type: "string",
                required: true,//不能为空 ，false 可以为空
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']), //对应参照定义名称
                "refcfg": '{"ctx":"/uitemplate_web","refName":"店铺信息"}',
            },            
            //差异类型
            defferenceTypeId:{ 
                type: "string",
                required: true,//不能为空 ，false 可以为空
                "refmodel": JSON.stringify(refinfo['defferenceType']), //对应参照定义名称
                "refcfg": '{"ctx":"/uitemplate_web","refName":"差异类型"}',
               // "refparam":'{"EQ_isEnable":"1"}'
            }, 
            //差异金额
            defferenceMoney:{
                type: 'float'
            },
            //单据状态 
            status: {
                type: 'integer'
            },
            adjustType:{
                type:'integer'
            }, //调整类型 0账单 1订单
        },
        pageSize: 10,
    }

})