define(function() {
    var refinfo = {};
    // 销售订单-销售组织
    refinfo["organization_ocm_temp_sale"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/organization-ref/",
        refName: "销售组织",
        refUIType: "RefTree",
        rootName: "销售组织",
        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
    };
    // 销售订单-结算财务组织
    refinfo["organization_ocm_temp_finacial"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/organization-ref/",
        refName: "结算财务组织",
        refUIType: "RefTree",
        rootName: "结算财务组织",
        refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
    };
    // 销售订单-发货库存组织
    refinfo["organization_ocm_temp_deliveryInv"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/organization-ref/",
        refName: "发货库存组织",
        refUIType: "RefTree",
        rootName: "发货库存组织",
        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
    };
    // 销售订单-客户
    refinfo["customer_temp_channel"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-sale-ref/",
        refName: "客户",
        refUIType: "RefGridTree",
        rootName: "客户",
        refparam: '{"EQ_isChannelCustomer": "1"}'
    };
    //销售订单-交易类型
    refinfo["trantype_temp_saleorder"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/trantype-ref/",
        refName: "交易类型",
        refUIType: "RefGrid",
        rootName: "交易类型",
        clientParam: {
            EQ_billTypeId: "SaleOrder",
            "IN_trantypeExtends.fieldValue": "01,03"
        }
    };
    //销售订单-交易类型-货补订单类型
    refinfo["trantype_temp_casttype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/trantype-ref/",
        refName: "货补订单类型",
        refUIType: "RefGrid",
        rootName: "货补订单类型",
        refparam: '{"EQ_billTypeId":"CastType",  "IN_trantypeExtends.fieldValue": "pay02"}'
    };
    // 启用仓库
    refinfo["warehouse_temp_enable"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/warehouse-ref/",
        refName: "仓库",
        refUIType: "RefGrid",
        rootName: "仓库",
        refparam: '{"EQ_isEnable":"1"}'
    };
    // 承运商
    refinfo["suppliers_temp_carrier"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/suppliers-ref/",
        refName: "承运商",
        refUIType: "RefGridTree",
        rootName: "承运商",
        refparam: '{"EQ_isEnable":"1","EQ_isCarrier":"1"}'
    };
    //启用的供应商
    refinfo["suppliers_temp_enable"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/suppliers-ref/",
        refName: "供应商",
        refUIType: "RefGrid",
        rootName: "供应商"
    };
    // 启用的 项目参照
    refinfo["project_temp_enable"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/project-ref/",
        refName: "项目",
        refUIType: "RefGrid",
        rootName: "项目",
        refparam: '{"EQ_isEnable":"1"}'
    };
    // 启用的商品参照
    refinfo["goods_temp_enable"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/goods-ref/",
        refName: "商品",
        refUIType: "RefGridTree",
        rootName: "商品分类",
        defaultFieldCount: 7,
        strFieldCode: ["refcode", "name", "displayName", "abbrName", "version", "productName", "basicUnitName"],
        strFieldName: ["编码", "名称", "显示名称", "简称", "版本号", "所属产品", "基本单位"],
        refparam: '{"EQ_isEnable":"1"}'
    };
    // 促销
    refinfo["prom_temp"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.prom + "/prom/promactivity-ref/",
        refName: "促销",
        refUIType: "RefGrid",
        rootName: "促销",
        defaultFieldCount: 7
    };
    return refinfo;
});