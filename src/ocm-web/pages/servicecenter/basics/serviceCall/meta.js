define(["ocm_global"], function () {
    window.mainListMeta = {
        meta: {
            id: { type: 'string' },
           
            code: { type: 'string', required: true },
            theme: { type: 'string', required: true },
            customerId: { // 客户参照
                type: 'string', required: true,
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
             },
            customerCode: { type: 'string' },
            customerName: { type: 'string' },
            address: { type: 'string' },//地址
            phone:{ type: 'string'},
            applyDate: { type: 'datetime' },
            requireDate: { type: 'datetime' },
            billSource:{ type: 'integer'},
            warrantyType:{type: 'integer'},
          
            goodsId: {//商品
                type: "string",
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            goodsCode:{
                type: "string",
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            goodsName:{type: "string"},           
            faultId:{
                type: "string",
                "refmodel": JSON.stringify(refinfo['fault']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//故障类型
            faultCode:{type: 'string' },
            faultName:{type: 'string' },
            resolvent:{type: 'string'},
            dealSuggestion:{type: 'string'},
            remark: { type: 'string' },//备注
            serviceProviderId:{ 
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-sp-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//服务商
            serviceProviderCode:{type: 'string' },
            serviceProviderName:{type: 'string' },
            provinceName:{type: 'string',required:true},
            countryId:{//国家
                type: 'string',
                "refmodel": JSON.stringify(refinfo['country']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
            },
            countryCode:{type: 'string' },
            countryName:{type: 'string',required:true},
            provinceId:{//注册所在省份ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"1"}'
            },
            provinceCode:{type: 'string' },
            pProvince:{type: 'string',required:true,maxLength:30},
            cityName:{type: 'string',required:true},
            cityId:{//注册所在城市ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"2"}'
            },
            pCity:{type: 'string',required:true,maxLength:30},
            districtName:{type: 'string',required:true},
            districtId:{//注册所在县ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"3"}'
            },
            pDistrict:{type: 'string',required:true,maxLength:30},
            townName:{type: 'string'},//注册所在街道/镇名称
            townId:{//注册所在街道/镇Id
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"4"}'
            },
            pTown:{type: 'string',maxLength:30},
            customerEquityId:{// 客户资产参照
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customerEquity']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":"请选择"}',
            },
            customerEquityName:{type: 'string'},//客户资产
            customerEquityCode:{type: 'string'},//客户资产
            servicePersonId:{//服务人员
                type: 'string',
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            servicePersonName:{type: 'string'},
            servicePersonName:{type: 'string'},
            // 商品分类
            goodsCategoryId:{type: 'string',
                "refmodel": JSON.stringify(refinfo['goodsCategory']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            goodsCategoryCode:{type: 'string'},
            goodsCategoryName:{type: 'string'}
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }

    // 添加备件
    window.dispatchingMeta = {
        meta: {
            id: { type: 'string' },
            partsId: { type: 'string' },
            partsCode: { type: 'string' },
            partsName: { type: 'string' },
            goodsId: { type: 'string' },
            goodsCode: { type: 'string' },
            goodsName: { type: 'string' },
            unit:{type: 'string'},           
            num: { type: 'string',default:"1"},
            remark: { type: 'string' }
        }
    }
    // 备件参照
    window.partsRefMeta = {
         meta: {
            partsRefer: {
                type: 'string',defaulet:"-1",
                "refmodel": JSON.stringify(refinfo['repairBom']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
            }
         }
    }

})
