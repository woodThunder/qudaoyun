define(["ocm_global"], function () {
    window.mainListMeta = {
        meta: {
            id: { type: 'string' },
            modifier: { type: 'string' },
            modifiedTime: { type: 'datetime' },
            code: { type: 'string'},         
            creator: { type: 'string' },
            creationTime: { type: 'datetime' },
            acceptDate:{ type: 'datetime' },//受理日期
            repairDate:{ type: 'datetime' },//维修日期   
            successDate:{ type: 'datetime' },//完工时间
            reqType:{ type: 'string'},//请求类型
            // 流程
            processes:{
                type: 'child',
                meta:{

                }
            },
            // 领料单
            parts:{
                type: 'child',
                meta:{

                }
            },
            // 退料单
            returnParts:{
                type: 'child',
                meta:{

                }
            },
            // 结算清单
            cleanMoney:{
                type: 'child',
                meta:{

                }
            },
            serviceFee: { type: 'string',default:'0' },//结算费用                       
            processes:{},
            repAppCode: { type: 'string'},//请求单号
            customerId:{
                type: "string",
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            customerName: { type: 'string' },//客户
            customerCode: { type: 'string' },//客户
            countryId:{//国家
                type: 'string',
                "refmodel": JSON.stringify(refinfo['country']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
            },
            countryCode:{type: 'string' },
            countryName:{type: 'string',required:true},
            provinceId:{//注册所在省份ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"1"}'
            },
            provinceCode:{type: 'string' },
            pProvince:{type: 'string',required:true,maxLength:30},
            cityName:{type: 'string'},
            cityCode:{type: 'string'},
            cityId:{//注册所在城市ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"2"}'
            },
            pCity:{type: 'string',required:true,maxLength:30},
            districtName:{type: 'string',required:true},
            districtCode:{type: 'string',required:true},
            districtId:{//注册所在县ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"3"}'
            },
            pDistrict:{type: 'string',required:true,maxLength:30},
            townName:{type: 'string'},//注册所在街道/镇名称
            townCode:{type: 'string'},
            townId:{//注册所在街道/镇Id
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"4"}'
            },
            pTown:{type: 'string',maxLength:30},
            address: { type: 'string' },//地址
            phone:{ type: 'string'},//电话
            applyDate: { type: 'datetime' },//请求时间
            requireDate: { type: 'datetime' },// 要求服务时间
            protectType:{type: 'string'},//保修类型
            //处理服务商
            serviceProviderName:{ type: "string"},
            serviceProviderCode:{ type: "string"},
            serviceProviderId:{
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-sp-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            servicePersonId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//服务人员
            servicePersonCode:{type: 'string' },
            servicePersonName:{type: 'string' },           
            billStatus:{ type: "string",default:'0'},//单据状态
            //商品
            goodsId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            goodsCode:{type: 'string' },
            goodsName:{type: 'string' },
            //商品分类
            goodsCategoryName:{type: 'string'},   
            goodsCategoryCode:{type: 'string'},
            goodsCategoryId:{type: "string",
            "refmodel": JSON.stringify(refinfo['goodsCategory']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            //故障类型 
            faultId:{type: "string",
                "refmodel": JSON.stringify(refinfo['fault']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            faultCode:{type: 'string' },
            faultName:{type: 'string' },
            protectType:{},//保修类型
            resolvent:{type: 'string'},//解决方法
            remark: { type: 'string' },//备注
            dealSuggestion:{type: 'string'},//处理建议
            // 客户资产参照
            customerEquityId:{
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customerEquity']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":"请选择"}',
            },
            customerEquityName:{type: 'string'},//客户资产
            customerEquityCode:{type: 'string'},//客户资产

            priorityLevel:{type: 'string'},//优先级
            manHours:{type: 'string'},//工时
            
            
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
    //维修流程
    window.processMeta = {
        params: {
        "cls": "com.yonyou.ocm.b2c.service.dto.RepairProcessDto"
        },
        meta: {
        id: { type: "string" }, //
        repairBillId: { type: "string" }, //维修工单号
        operator: { type: "string" }, //操作人
        operateTime: { type: "datetime" }, //操作时间
        operateType: { type: "string" }, //操作类型
        description: { type: "string" }, //描述
        imgs: { type: "string" }, // 促销方式ID
        }
    }
    // 退料单
    window.returnPartsMeta = {
        meta: {
          
        }
    }
     // 领料单
     window.partsMeta = {
        meta: {
          
        }
    }
     // 结算
     window.cleanMoneyMeta = {
        meta: {
          
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
