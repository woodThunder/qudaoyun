define(["ocm_global"], function () {
    //工单主表
    window.mainMeta = {
        params: {
            "cls": "com.yonyou.occ.sc.service.dto.RepairBillDto"
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
            parts:{},
            processes:{},
            theme: { type: 'string' },//主题
            repAppCode: { type: 'string'},//请求单号
            customerName: { type: 'string' },//客户
            address: { type: 'string' },//地址
            country: { type: 'string' },//国家
            province: { type: 'string' },//省份
            city: { type: 'string' },//城市
            district: { type: 'string' },//区县
            phone:{ type: 'string'},//电话
            applyDate: { type: 'datetime' },//请求时间
            requireDate: { type: 'datetime' },// 要求服务时间
            warrantyType:{type: 'string'},//保修类型
            serviceProvider:{ type: "string"},//服务商
            servicePersonId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//服务人员
            servicePersonCode:{type: 'string' },
            servicePersonName:{type: 'string' },           
            billStatus:{ type: "string"},//单据状态
            goodsId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['goods']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },//产品
            goodsCode:{type: 'string' },
            goodsName:{type: 'string' },           
            faultId:{type: "string",
            "refmodel": JSON.stringify(refinfo['fault']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'},//故障类型
            faultCode:{type: 'string' },
            faultName:{type: 'string' },
            resolvent:{type: 'string'},//解决方法
            remark: { type: 'string' },//备注
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
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

    //备件清单
    window.partsMeta = {
        params: {
        "cls": "com.yonyou.occ.sc.service.dto.RepairPartsDto"
        },
        meta: {
        id: { type: "string" }, //
        repairBillId: { type: "string" }, //维修工单号
        goodsName: { type: "string" }, //商品
        partsName: { type: "string" }, //备件
        unit: { type: "string" }, //单位
        num: { type: "float" }, // 数量
        remark: { type: "string" }, //备注
        }
    }

})
