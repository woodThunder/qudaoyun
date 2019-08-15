define(["ocm_global"], function () {
    
        //主表
        window.mainDataMeta = {
            params: {
                "cls": "com.yonyou.ocm.b2c.service.dto.ChannelStockDto"
            },
            meta: {
                id: { type: "string" },
    
                code: { type: "string" },
                officeId: {//办事处id
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['organization_auth_b2c']),
                    "refcfg": '{"ctx":"/uitemplate_web","refName":"办事处" }',
                    "refparam": '{"EQ_isOffice":"1"}'
                },
                officeName: { type: "string" },
                //服务商类型
                serviceProviderTypeName: { type: "string" },
                serviceProviderType: {
                    type: "string",
                    "refmodel": JSON.stringify(refinfo['custdocdef']),
                    "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY024","refName":"服务商类型","isReturnCode":false}'
                }, 
                //服务商
                serviceProviderName: { type: "string" },
                serviceProviderId: {
                    type: "string",
                    required: true,
                    "refmodel": JSON.stringify(refinfo['customers']),
                    "refcfg": '{"ctx":"/uitemplate_web","refName":"服务商"}',
                    "refparam": '{"EQ_isServiceProvider":"1","EQ_isEnable":"1"}'
                },
                accountNumber: { type: "string" },
                //  业务账号
                accountName: { type: "string" },
                busiAccount: {
                    required: true,
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['account']),
                    "refcfg": '{"ctx":"/uitemplate_web","refName":"业务账号"}',
                    "refparam": '{"EQ_isEnable":"1"}'
                },
                //所属平台ID
                platformName: { type: "string" },
                platformId: {
                    type: "string",
                    "refmodel": JSON.stringify(refinfo['b2cplatform']),
                    "refcfg": '{"ctx":"/uitemplate_web","refName":"平台名称"}'
                },
                storeId: {
                    type: "string",
                    "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                    "refcfg": '{"ctx":"/uitemplate_web","refName":"店铺"}'
                }, //店铺ID
                storeName: { type: "string" },
                syscode: { type: "string", maxLength: 30 },
                soBillNo: { type: "string" },
                purchaseBillCode: { type: "string" },
                buyer: { type: "string" },
                buyerName: { type: "string" },
                buyerTel: { type: "string" },
                payTime: { type: "datetime" },
                bookTime: { type: "datetime" },
    
                //22
                productId: {    //产品编码
                    required: true,
                    'refmodel': JSON.stringify(refinfo['productInfo']),
                    'refcfg': '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled": false, "isReturnCode": true}',
                },
                productCode: { type: "string" },
                productName: { type: "string" },
                proType: { type: "string" },
                proTypeName: { type: "string" },
                stockNum: { type: "string", regExp: /^\d+$/, errorMsg: '启运数量不正确' },//启运数量
                buyNum: { type: "string", default: "1", required: true, regExp: /^\d+$/, errorMsg: '数量不正确' },//数量
                soBillNo: { type: "string", maxLength: 30 },
                purchaseCode: { type: "string", maxLength: 30 },
                creationTime: { type: "string", default: "1", required: true },//库存产生时间
                isInit: { type: "integer", default: "0", required: true },//是否初期库存
                confirmTime: { type: "datetime"},
                sellerRemark: { type: "string", required: true, maxLength: 200 },
                isCanSell: { type: "integer", required: true, default: "Y" },//是否可二次销售
                stockStatus: {type: "integer",default:'2'},
                price: { type: "float", required: true },
                clearRate: { type: "float" },
                sellMny: { type: "float" },
                discountMny: { type: "float" },
                remark: { type: "string", maxLength: 600 },
                logs: {
                    type: "child",
                    meta: {
                        id: { type: 'string' },
                        operateType: { type: 'string' },
                        operateContent: { type: 'string' },
                        operateTime: { type: 'datetime' },
                        operator: { type: 'string' }
                    }
                },
                buyerAddress: { type: "string" },
                creator: { type: "string" },   //创建人
                creationTime: { type: "datetime" },   //创建时间
                modifier: { type: "string" },   //修改人
                modifiedTime: { type: "datetime" },   //修改时间
    
                // id: { type: "string" },   //店铺主键
    
                // platformName: { type: "string" },   //平台名称
                // code: { type: "string",required:true },   //店铺编码
                // name: { type: "string",required:true },   //店铺名称
                // storetype: { type: "string"},   //店铺类型
                // authentication: { type: "string",required:true },   //认证方式
                // enting: { type: "string" },   //加密串
                // remark: { type: "string" },   //备注
                // ts: { type: "string" },   //时间戳
                // dr: { type: "string" },   //删除标识
                // pk_org: { type: "string" },   //组织
                // creator: { type: "string" },   //创建人
                // creationTime: { type: "datetime" },   //创建时间
                // modifier: { type: "string" },   //修改人
                // modifiedTime: { type: "datetime" },   //修改时间
                // shopTime: { type: "datetime" }   //开店日期
            },
            pageSize: 10,
        }
    
    
        //操作日志
        window.childListDataMeta = {
            params: {
                "cls": "com.yonyou.ocm.b2c.service.dto.ChannelStockDto"
            },
            meta: {
                operateType: { type: 'string' },
                operateContent: { type: 'string' },
                operateTime: { type: 'datetime' },
                operator: { type: 'string' },
                creator: { type: "string" },   //创建人
                creationTime: { type: "datetime" },   //创建时间
                modifier: { type: "string" },   //修改人
                modifiedTime: { type: "datetime" }   //修改时间
            }
        }
    })