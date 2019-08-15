define(["ocm_global"], function () {
    //店铺
    window.StoreMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.StoreDto"
        },
        meta: {
            id: { type: "string" },   //店铺主键
            platformId: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属平台"}'
            },   //所属平台ID
            platformName: { type: "string" },   //平台名称
            code: { type: "string", required: true, maxLength: 30 },   //店铺编码
            name: { type: "string", required: true, maxLength: 30 },   //店铺名称
            storetype: { type: "string" },   //店铺类型
            authentication: { type: "string", required: true },   //认证方式
            enting: { type: "string" },   //加密串
            remark: { type: "string", maxLength: 600 },   //备注
            ts: { type: "string" },   //时间戳
            dr: { type: "string" },   //删除标识
            pk_org: { type: "string" },   //组织
            creator: { type: "string" },   //创建人
            creationTime: { type: "datetime" },   //创建时间
            modifier: { type: "string" },   //修改人
            modifiedTime: { type: "datetime" },   //修改时间
            shopTime: { type: "datetime" }   //开店日期
        },
        pageSize: 10,
    }
    //店铺参数
    window.StoreParamListMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.StoreparamsDto"
        },
        meta: {
            id: { type: "string" },   //店铺参数主键
            storeid: { type: "string" },   //店铺主键
            param: { type: "string" },   //参数名
            value: { type: "string", required: true, maxLength: 200 },   //参数值
            remark: { type: "string", maxLength: 600 },   //备注
            ts: { type: "string" },   //时间戳
            dr: { type: "string" },   //删除标识
            pk_org: { type: "string" },   //组织
            creator: { type: "string" },   //创建人
            creationTime: { type: "datetime" },   //创建时间
            modifier: { type: "string" },   //修改人
            modifiedTime: { type: "datetime" }   //修改时间
        }
    }
})