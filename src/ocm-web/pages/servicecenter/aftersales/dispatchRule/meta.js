define(["ocm_global"], function () {
    //规则主表
    window.mainMeta = {
        params: {
            "cls": "com.yonyou.occ.sc.service.dto.DispatchRuleDto"
          },
        meta: {
            id: { type: 'string' },
            code: { type: 'string', required: true,},
            dr: { type: 'integer' }, //dr
            ts: { type: 'datetime' }, //ts
            creator: { type: 'string' },
            creationTime: { type: 'datetime' },
            modifier: { type: 'string' },
            modifiedTime: { type: 'datetime' },
            serviceType: {type: "string"},
            range: {},
            area: {},
            fault: {},
            name: { type: 'string', required: true,},//名称
            billType: { type: 'string'},//单据类型
            serviceProviderId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-sp-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//服务商
            serviceProviderCode:{type: 'string' },
            serviceProviderName:{type: 'string' },           
            remark: { type: 'string' },//备注
            priorityLevel: {type: 'string', required: true,}
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }

     //商品范围
    window.rangeMeta = {
        params: {
        "cls": "com.yonyou.ocm.b2c.service.dto.GoodsRangeDto"
        },
        meta: {
        id: { type: "string" }, //
        dispatchBillId: { type: "string" }, //规则主键
        goodsCategoryId: { type: "string"
        
        }, //商品分类
        goodsCategoryCode: { type: "string" }, 
        goodsCategoryName: { type: "string" },
        goodsId: { type: "string" }, //商品
        goodsCode: { type: "string" }, 
        goodsName: { type: "string" }, 
        remark: { type: "string" }, // 备注
        }
    }

    //服务区域
    window.areaMeta = {
        params: {
        "cls": "com.yonyou.occ.sc.service.dto.ServiceAreaDto"
        },
        meta: {
        id: { type: "string" }, //
        dispatchBillId: { type: "string" }, //规则id
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
        provinceName:{type: 'string'},
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
        remark: { type: "string" }, // 备注
        }
    }

     //故障分类
     window.faultMeta = {
        params: {
        "cls": "com.yonyou.ocm.b2c.service.dto.DispatchRuleFaultTypeDto"
        },
        meta: {
        id: { type: "string" }, //
        dispatchBillId: { type: "string" }, //规则主键
        faultTypeId: { type: "string" }, //故障分类
        faultTypeCode: { type: "string" }, 
        faultTypeName: { type: "string" },
        }
    }

})
