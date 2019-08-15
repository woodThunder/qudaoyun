define(["ocm_global"], function () {
    //工单主表
    window.mainMeta = {
        params: {
            "cls": "com.yonyou.occ.sc.service.dto.DeliveryBillDto"
          },
        meta: {
            id: { type: 'string' },
            code: { type: 'string'},
            dr: { type: 'integer' }, //dr
            ts: { type: 'datetime' }, //ts
            creator: { type: 'string' },
            creationTime: { type: 'datetime' },
            modifier: { type: 'string' },
            modifiedTime: { type: 'datetime' },
            goods:{},
            processes:{},
            deliAppCode: { type: 'string'},//请求单号
            customer: { type: 'string' },//顾客
            address: { type: 'string' },//地址
            country: { type: 'string' },//国家
            province: { type: 'string' },//省份
            city: { type: 'string' },//城市
            district: { type: 'string' },//区县
            phone:{ type: 'string'},//电话
            deliveryDate: { type: 'datetime' },//派工时间
            planDeliveryDate: { type: 'datetime' },// 计划配送日期
            sendDeliveryDate: { type: 'datetime' },//配送时间
            installDate: { type: 'datetime' },// 安装时间
            serviceProvider:{ type: "string"},//服务商

            deliveryPersonId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//配送人员
            deliveryPersonCode:{type: 'string' },
            deliveryPersonName:{type: 'string' }, 

            installPersonId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//安装人员
            installPersonCode:{type: 'string' },
            installPersonName:{type: 'string' }, 
            freight: { type: 'float' },// 运费
            tailFee: { type: 'float' },// 尾款          
            billStatus:{ type: "string"},//单据状态
            remark: { type: 'string' },//备注

            deliverySuccessDate: { type: 'datetime' },//配送完成时间
            deliveryInfo:{type: 'string' },
            deliveryImgs:{type: 'string' }, 

            installSuccessDate: { type: 'datetime' },//安装完成时间
            installInfo:{type: 'string' },
            installImgs:{type: 'string' }, 
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }

     //送装流程
    window.processMeta = {
        params: {
        "cls": "com.yonyou.ocm.b2c.service.dto.DeliveryProcessDto"
        },
        meta: {
        id: { type: "string" }, //
        deliveryFlowId: { type: "string" }, //送装工单ID
        operator: { type: "string" }, //操作人
        operateTime: { type: "datetime" }, //操作时间
        operateType: { type: "string" }, //操作类型
        description: { type: "string" }, //描述
        imgs: { type: "string" }, // 促销方式ID
        }
    }

    //送装商品
    window.goodsMeta = {
        params: {
        "cls": "com.yonyou.occ.sc.service.dto.DeliveryBillGoodsDto"
        },
        meta: {
        id: { type: "string" }, //
        deliveryFlowId: { type: "string" }, //送装工单ID
        goodsInfoName: { type: "string" }, //商品
        goodsInfoCode: { type: "string" }, //商品
        conpany: { type: "string" }, //单位
        num: { type: "float" }, // 数量
        }
    }

})
