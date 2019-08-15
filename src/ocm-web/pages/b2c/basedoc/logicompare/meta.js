define(["ocm_global"], function() {
    //对照
    window.mainDataMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.ChannelStockDto"
        },
        meta: {
            id: {
                type: "string"
            },
            storeName: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"店铺名称"}'
            }
        }
    }
    window.logiCompareMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.LogisticsCompareDto"
        },
        meta: {
            id: {
                type: "string"
            }, //主键
            logiComId: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['logistics-company']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}'
            }, //物流公司ID
            logiComName: {
                type: "string"
            }, //物流公司名称
            platformId: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属平台"}'
            }, //所属平台ID
            platformName: {
                type: "string"
            }, //平台名称
            pcode: {
                type: "string",
                required: true,
                maxLength: 30
            }, //平台物流编码
            pname: {
                type: "string",
                required: true,
                maxLength: 30
            }, //平台物流名称
            ts: {
                type: "string"
            }, //时间戳
            dr: {
                type: "string"
            }, //删除标识
            creator: {
                type: "string"
            }, //创建人
            creationTime: {
                type: "datetime"
            }, //创建时间
            modifier: {
                type: "string"
            }, //修改人
            modifiedTime: {
                type: "datetime"
            }, //修改时间
        },
        pageSize: 10
    }

})