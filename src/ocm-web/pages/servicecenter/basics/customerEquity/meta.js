define(["ocm_global"], function () {
    window.customerequitymeta = {
        meta: {
            id: { type: 'string' },
            creator: { type: 'string' },
            creationTime: { type: 'string' },
            modifier: { type: 'string' },
            modifiedTime: { type: 'datetime' },
            persistStatus: { type: 'string' },
            name: { type: 'string', required: true },//资产名称
            code: { type: 'string', required: true },//资产编码
            customerId: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//购买人
            customerCode: { type: 'string' },
            customerName: { type: 'string' },
            countryName: { type: 'string' },//国家
            provinceName: { type: 'string' },//省份
            cityName: { type: 'string' },//城市
            districtName: { type: 'string' },//区县
            townName: { type: 'string' },//乡镇
            postcode: { type: 'string' },//邮编
            address: { type: 'string' },//地址
            idTypeName:{type: 'string' },
            idNo:{type: 'string' },
            phone:{type: 'string' },
            homeTel:{type: 'string' },
            companyTel:{type: 'string' },
            email:{type: 'string' },
            shop:{type: 'string' },
            shopingPerson:{type: 'string' },
            dealerName:{type: 'string' },
            goodsId: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//商品
            goodsCode:{ type: 'string'},
            goodsName:{ type: 'string'},
            buyDate: { type: 'datetime' },//购买日期
            warrantyStartDate: { type: 'datetime' },//保修起始日期
            warranty: { type: 'integer' },//保修期（月）
            warrantyEndDate: { type: 'datetime' },//保修终止日期
            remark: { type: 'string' },//备注
            // isEnable: { type: 'integer', default: 1 },//是否启用
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }

    window.goodsListMeta = {
        meta:{
            id:{type:'string'},
            goodsId:{type:'string'},
            goodsName:{type:'string'},
            goodsCode:{type:'string'},
            remark:{type:'string'},
            warranty:{type:'string'},
            buyDate:{type:'datetime'},
            warrantyStartDate:{type:'datetime'},
            warrantyEndDate:{type:'datetime'}
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true

    }
    window.installListMeta = {
            meta:{
                        id:{type:'string'},
                        code:{type:'string'},
                        
                        providerId:{type:'string'},
                        providerName:{type:'string'},
                        providerCode:{type:'string'},
                        installCode:{type:'string'},
                        installPerson:{type:'string'},
                        installedDate:{type:'datetime'}
                       
            },
            pageSize: 10
            //是否启用前端缓存
            // pageCache: true
    }
    window.consultListMeta = {
        meta:{
            id:{type:'string'},
            code:{type:'string'},
            consultContent:{type:'string'},
            consultPerson:{type:'string'},
            consultDate:{type:'datetime'}
           
            },
            pageSize: 10
            //是否启用前端缓存
            // pageCache: true
    }
    window.repairListMeta = {
        meta:{
            id:{type:'string'},
            code:{type:'string'},
            repairCode:{type:'string'},
            providerName:{type:'string'},
            repairGoods:{type:'string'},
            faultClassify:{type:'string'},
            repairPerson:{type:'string'},
            repairDate:{type:'datetime'}
           
            },
            pageSize: 10
            //是否启用前端缓存
            // pageCache: true
    }

})