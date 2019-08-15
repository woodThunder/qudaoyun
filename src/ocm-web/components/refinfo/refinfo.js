define(["ocm_refinfoTemp"], function (refinfo_temp) {
    var refinfo = {};
    //iuap 工作台 start-----------------------------------------------------
    refinfo["RefGridTreeTest"] = {
        refUIType: "RefGridTree",
        refCode: "application",
        defaultFieldCount: 4,
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "全部",
        refModelUrl: "/wbalone/applicationRef/",
        refName: "Test",
        refClientPageInfo: {
            pageSize: 100,
            currPageIndex: 0,
            pageCount: 0
        }
    };
    refinfo["wbUser"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: "/wbalone/wbUserRef/",
        refName: "负责人",
        refUIType: "RefGrid",
        rootName: "负责人列表"
    };
    refinfo["dept"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: "/wbalone/deptUnderOrgRef/",
        refName: "组织下部门",
        refUIType: "RefTree",
        rootName: "部门列表"
    };
    // 注释愿意： 后台已找不到该服务
    // refinfo["organization"] = {
    //   refClientPageInfo: {
    //     currPageIndex: 0,
    //     pageCount: 0,
    //     pageSize: 100
    //   },
    //   refCode: "",
    //   refModelUrl: "/wbalone/organizationRef-ref/",
    //   refName: "组织",
    //   refUIType: "RefTree",
    //   rootName: "组织列表"
    // };
    refinfo["AuthorizedUsers"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "internalmsg",
        refModelUrl: "/iuap_qy/internalmsg/users/",
        refName: "用户",
        refUIType: "RefGrid",
        rootName: "用户"
    };
    //iuap工作台 end-----------------------------------------------------

    // 测试 start-----------------------------------------------------
    refinfo["treetest"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: "/ocm-web/tree-ref-example/",
        refName: "树测试",
        refUIType: "RefTree",
        rootName: "树测试列表"
    };
    refinfo["treegridtest"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: "/ocm-web/treegrid-ref-example/",
        refName: "树表测试",
        refUIType: "RefGridTree",
        rootName: "树表测试列表"
    };
    refinfo["gridtest"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: "/ocm-web/grid-ref-example/",
        refName: "表测试",
        refUIType: "RefGrid",
        rootName: "表测试列表"
    };
    //测试 end-----------------------------------------------------

    // 通用组件 start-----------------------------------------------------
    // iUAP审批流模型定义
    refinfo["act-proc-model"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cmpt + "/act-proc-model-ref/",
        refName: "流程定义",
        refUIType: "RefGrid",
        rootName: "流程定义"
    };
    // 通用组件 end-----------------------------------------------------

    // 基本档案 start-----------------------------------------------------
    //交易类型
    refinfo["trantype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/trantype-ref/",
        refName: "交易类型",
        refUIType: "RefGrid",
        rootName: "交易类型"
    };
    //币种档案
    refinfo["currency"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/currency-ref/",
        refName: "币种",
        refUIType: "RefGrid",
        rootName: "币种"
    };
    refinfo["custdocdef"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/cust-doc-defs-ref/",
        refName: "字典",
        refUIType: "RefGrid",
        rootName: "字典列表"
    };
    refinfo["productLine"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-line-ref/",
        refName: "产品线",
        refUIType: "RefGrid",
        rootName: "产品线列表"
    };
    refinfo["saleSerial"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/sale-series-ref/",
        refName: "销售系列",
        refUIType: "RefGrid",
        rootName: "销售系列列表"
    };
    refinfo["developmentSeries"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/development-series-ref/",
        refName: "研发系列",
        refUIType: "RefGrid",
        rootName: "研发系列列表"
    };
    refinfo["prodAttrStruc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/prod-attr-struc-ref/",
        refName: "特征属性结构",
        refUIType: "RefGrid",
        rootName: "特征属性结构"
    };
    refinfo["organization_ocm"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/organization-ref/",
        refName: "组织",
        refUIType: "RefTree",
        rootName: "组织"
    };
    refinfo["organization_ocm-muliti"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/organization-ref/",
        refName: "组织",
        refUIType: "RefTree",
        rootName: "组织",
        isMultiSelectedEnabled: true
    };
    refinfo["orderType"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/cust-doc-defs/",
        refName: "业务标识",
        refUIType: "RefGrid",
        rootName: "业务标识列表"
    };
    // 商品参照
    refinfo["goods"] = {
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
        strFieldName: ["编码", "名称", "显示名称", "简称", "版本号", "所属产品", "基本单位"]
    };
    // 忽略版本的商品参照
    refinfo["goods-no-version"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/goods-no-version-ref/",
        refName: "商品",
        refUIType: "RefGridTree",
        rootName: "商品分类",
        defaultFieldCount: 6,
        strFieldCode: ["refcode", "name", "displayName", "abbrName", "productName", "basicUnitName"],
        strFieldName: ["编码", "名称", "显示名称", "简称", "所属产品", "基本单位"]
    };
    /*refinfo["allowgoods"] = {
     refClientPageInfo: {
     currPageIndex: 0,
     pageCount: 0,
     pageSize: 100
     },
     refCode: "",
     refModelUrl: window.pathMap.b2b + "/b2b/goods-ref/",
     refName: "允销商品",
     refUIType: "RefGridTree",
     rootName: "商品分类",
     defaultFieldCount: 5,
     strFieldCode: ["refcode", "displayName", "abbrName", "version", "productName", "basicUnitName"],
     strFieldName: ["编码", "显示名称", "简称", "版本号", "所属产品", "基本单位"]
     };*/
    //新增允销商品参照（修改参照地址）
    refinfo["allowgoods"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/b2b/allow-sale-goods-ref/",
        refName: "允销商品",
        refUIType: "RefGridTree",
        rootName: "商品分类",
        defaultFieldCount: 5,
        strFieldCode: ["refcode", "displayName", "abbrName", "version", "productName", "basicUnitName"],
        strFieldName: ["编码", "显示名称", "简称", "版本号", "所属产品", "基本单位"]
    };
    // 合同参照
    refinfo["contractGoods"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/b2b/contract-goods-ref/",
        refName: "合同商品",
        refUIType: "RefGridTree",
        rootName: "商品分类",
        defaultFieldCount: 5,
        strFieldCode: ["refcode", "refname", "version", "productName", "basicUnitName"],
        strFieldName: ["编码", "显示名称", "版本号", "所属产品", "基本单位"]
    };
    refinfo["brandInfo"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/brand-ref/",
        refName: "品牌",
        refUIType: "RefGrid",
        rootName: "品牌列表"
    };
    refinfo["sys-doc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/sys-doc-ref/",
        refName: "系统档案",
        refUIType: "RefGrid",
        rootName: "系统档案列表"
    };
    // 成品中只查销售产品和套件
    refinfo["productsaleorsuite"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-info-saleorsuite-ref/",
        refName: "产品",
        refUIType: "RefGrid",
        rootName: "产品",
        defaultFieldCount: 5,
        strFieldCode: [
            "refcode",
            "description",
            "productSaleSeriesName",
            "productModelName",
            "baseUnitName"
        ],
        strFieldName: ["编码", "描述", "销售系列", "产品型号", "计量单位"]
    };
    refinfo["packBelongProduct"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/packBelongProduct-info-ref/",
        refName: "包件所属产品信息",
        refUIType: "RefGrid",
        rootName: "包件所属产品信息列表"
    };
    refinfo["suppliers"] = {
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
    refinfo["logistics-company"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/logistics-company-ref/",
        refName: "物流公司",
        refUIType: "RefGrid",
        rootName: "物流公司"
    };
    refinfo["productSaleSeries"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/series-docs-ref/",
        refName: "销售系列表",
        refUIType: "RefGrid",
        rootName: "销售系列表"
    };
    // 特征属性
    refinfo["productAttr"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/product-attr-ref/",
        refName: "特征属性",
        refUIType: "RefGrid",
        rootName: "特征属性"
    };
    // 特征属性值
    refinfo["prodAttrVal"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/prod-attr-val-ref/",
        refName: "特征属性值",
        refUIType: "RefGrid",
        rootName: "特征属性值"
    };
    // 单据字段
    refinfo["billField"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/bill-field-ref/",
        refName: "单据字段",
        refUIType: "RefGrid",
        rootName: "单据字段"
    };
    refinfo["prodStyle"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prod-style-ref/",
        refName: "风格表",
        refUIType: "RefGrid",
        rootName: "风格表"
    };
    refinfo["goodsCategory"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/goods-category-ref/",
        refName: "商品分类",
        refUIType: "RefTree",
        rootName: "商品分类"
    };
    refinfo["goodsCategory-muliti"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/goods-category-ref/",
        refName: "商品分类",
        refUIType: "RefTree",
        rootName: "商品分类",
        isMultiSelectedEnabled: true
    };
    refinfo["ProductTextureType"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-texture-type-ref/",
        refName: "上级材质",
        refUIType: "RefGrid",
        rootName: "上级材质"
    };
    refinfo["ProdMaterial"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-material-group-ref/",
        refName: "上级物料组",
        refUIType: "RefGrid",
        rootName: "上级物料组",
        defaultFieldCount: 4,
        strFieldCode: ["refcode", "name", "treePathCodePret", "treePathNamePret"],
        strFieldName: ["编码", "名称", "物料组编码", "物料组名称"]
    };
    refinfo["ProdMaterialtree"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-material-group-tree-ref/",
        refName: "物料组",
        refUIType: "RefTree",
        rootName: "物料组"
    };
    refinfo["productRadSeries"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-rad-series-ref/",
        refName: "产品研发表",
        refUIType: "RefGrid",
        rootName: "产品研发表"
    };
    refinfo["productModel"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-model-ref/",
        refName: "型号表",
        refUIType: "RefGrid",
        rootName: "型号表"
    };
    refinfo["CustDoc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/cust-docs-ref/",
        refName: "档案定义表",
        refUIType: "RefGrid",
        rootName: "档案定义表"
    };
    refinfo["customer"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-ref/",
        refName: "客户",
        refUIType: "RefGridTree",
        rootName: "客户"
    };
    refinfo["customer-muliti"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-ref/",
        refName: "客户",
        refUIType: "RefGridTree",
        rootName: "客户",
        isMultiSelectedEnabled: true
    };
    refinfo["customer_sale_muliti"] = {
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
        isMultiSelectedEnabled: true
    };
    refinfo["customer_sale"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-sale-ref/",
        refName: "客户",
        refUIType: "RefGridTree",
        rootName: "客户"
    };
    refinfo["customer_category"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/customer-category-ref/",
        refName: "客户分类",
        refUIType: "RefGrid",
        rootName: "客户分类"
    };

    refinfo["custFirstClass"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "QY023",
        refModelUrl: window.pathMap.base + "/cust-doc-defs-ref/",
        refName: "客户一级分类",
        refUIType: "RefGrid",
        rootName: "客户一级分类"
    };
    refinfo["channelCusStores"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/channel-cus-stores-ref/",
        refName: "账户送达方",
        refUIType: "RefGrid",
        rootName: "账户送达方",
        defaultFieldCount: 3,
        strFieldCode: ["refcode", "refname", "accountName"],
        strFieldName: ["编码", "送达方", "业务账户"]
    };
    refinfo["customeraddress"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-address-ref/",
        refName: "地址",
        refUIType: "RefGrid",
        rootName: "地址"
    };
    refinfo["saleorderCustomeraddress"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-address-ref/",
        refName: "地址",
        refUIType: "RefGrid",
        rootName: "地址",
        defaultFieldCount: 4,
        strFieldCode: ["refcode", "refname", "townName", "detailAddr"],
        strFieldName: ["编码", "名称", "地址", "详细地址"]
    };
    refinfo["busstype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "QY037",
        refModelUrl: window.pathMap.base + "/cust-doc-defs-ref/",
        refName: "业务类型",
        refUIType: "RefGrid",
        rootName: "业务类型"
    };
    refinfo["channeltype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "QY059",
        refModelUrl: window.pathMap.base + "/cust-doc-defs-ref/",
        refName: "渠道类型",
        refUIType: "RefGrid",
        rootName: "渠道类型"
    };
    refinfo["customerLevel"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "QY080",
        refModelUrl: window.pathMap.base + "/cust-doc-defs-ref/",
        refName: "客户级别",
        refUIType: "RefGrid",
        rootName: "客户级别"
    };
    refinfo["product"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/product-ref/",
        refName: "产品",
        refUIType: "RefGrid",
        rootName: "产品",
        defaultFieldCount: 5,
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"]
    };
    refinfo["customer-level"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/customer-level-ref",
        refName: "客户等级",
        refUIType: "RefGrid",
        rootName: "客户等级",
        defaultFieldCount: 5,
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"]
    };

    refinfo["colordoc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/color-doc-ref/",
        refName: "颜色表",
        refUIType: "RefGrid",
        rootName: "颜色表"
    };
    refinfo["prodSpec"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prod-spec-ref/",
        refName: "规格表",
        refUIType: "RefGrid",
        rootName: "规格表"
    };
    refinfo["utils"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/unit-ref/",
        refName: "计量单位表",
        refUIType: "RefGrid",
        rootName: "计量单位表"
    };
    refinfo["designProduct"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prod-design-ref/",
        refName: "设计产品表",
        refUIType: "RefGrid",
        rootName: "设计产品表"
    };
    refinfo["account"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/account-ref/",
        refName: "账户",
        refUIType: "RefGrid",
        rootName: "账户"
    };
    refinfo["productFunction"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/product-function-ref/",
        refName: "功能表",
        refUIType: "RefGrid",
        rootName: "功能表"
    };
    refinfo["productPack"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/finished-product-pack-ref/",
        refName: "包件信息",
        refUIType: "RefGrid",
        rootName: "包件信息"
    };
    refinfo["department"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/department-ref/",
        refName: "所属部门",
        refUIType: "RefTree",
        rootName: "所属部门"
    };
    refinfo["person"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/person-ref/",
        refName: "负责人",
        refUIType: "RefGrid",
        rootName: "负责人"
    };
    refinfo["channel-person"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/channel-person-ref/",
        refName: "负责人",
        refUIType: "RefGrid",
        rootName: "负责人"
    };
    refinfo["ecommerceplatform"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/comm-plat-ref/",
        refName: "所属平台编码",
        refUIType: "RefGrid",
        rootName: "所属平台编码"
    };
    /*refinfo['channelInvestUnit'] = {
     "refClientPageInfo": {
     "currPageIndex": 0,
     "pageCount": 0,
     "pageSize": 100
     },
     "refCode": "",
     "refModelUrl": window.pathMap.base + "/chan-inve-unit-ref/",
     "refName": "投资单位",
     "refUIType": "RefGrid",
     "rootName": "投资单位"
     };*/
    refinfo["customerGrade"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-ref/",
        refName: "上级经销商",
        refUIType: "RefGridTree",
        rootName: "上级经销商"
    };
    refinfo["country"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/country-ref/",
        refName: "国家地区",
        refUIType: "RefGrid",
        rootName: "国家地区"
    };
    refinfo["region"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/administrative-division-ref/",
        refName: "行政区划",
        refUIType: "RefGrid",
        rootName: "行政区划"
    };
    refinfo["market"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/market-areas-ref/",
        refName: "市场区域",
        refUIType: "RefTree",
        rootName: "市场区域"
    };
    refinfo["shipToPartys"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/ship-to-partys-ref/",
        refName: "送达方",
        refUIType: "RefGrid",
        rootName: "送达方",
        strFieldCode: ["customerAddresCode", "customerAddresName"],
        strFieldName: ["编码", "名称"]
    };
    refinfo["channelCusStores"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/channel-cus-stores-ref/",
        refName: "账户送达方",
        refUIType: "RefGrid",
        rootName: "账户送达方",
        defaultFieldCount: 3,
        strFieldCode: ["refcode", "refname", "accountName"],
        strFieldName: ["编码", "送达方", "业务账户"]
    };
    refinfo["shopdecoarea"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/shop-deco-area-ref/",
        refName: "门店装修区域",
        refUIType: "RefGrid",
        rootName: "门店装修区域"
        // "strFieldCode":["customerAddresCode","customerAddresName"],
        // "strFieldName":["编码","名称"],
    };
    refinfo["accountManager"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/person-ref/",
        refName: "客户经理",
        refUIType: "RefGrid",
        rootName: "客户经理"
    };
    refinfo["prodPhoto"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prod-photo-info-ref/",
        refName: "产品图片",
        refUIType: "RefGrid",
        rootName: "产品图片"
    };
    refinfo["pictureCategories"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/picture-categories-ref/",
        refName: "图片分类",
        refUIType: "RefGrid",
        rootName: "图片分类"
    };
    refinfo["picture"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/picture-ref/",
        refName: "图片",
        refUIType: "RefGrid",
        rootName: "图片"
    };
    refinfo["channelpostifnoref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/channel-postifno-ref/",
        refName: "岗位",
        refUIType: "RefGrid",
        rootName: "岗位"
    };
    refinfo["salePrincipal"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/cust-doc-defs/",
        refName: "销售主体",
        refUIType: "RefGrid",
        rootName: "销售主体列表"
    };
    refinfo["billtype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/billtype-ref/",
        refName: "单据类型",
        refUIType: "RefGrid",
        rootName: "单据类型"
    };
    refinfo["customer-level"] = {
        refModelUrl: window.pathMap.base + "/base/customer-level-ref/",
        refName: "客户等级",
        refUIType: "RefGrid",
        rootName: "客户等级"
    };
    refinfo["customer-category"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/customer-category-ref/",
        refName: "客户分类",
        refUIType: "RefTree",
        rootName: "客户分类"
    };
    refinfo["channel-type"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/channel-type-ref/",
        refName: "渠道类型",
        refUIType: "RefGrid",
        rootName: "渠道类型"
    };
    refinfo["post"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/posts-ref/",
        refName: "岗位",
        refUIType: "RefGrid",
        rootName: "岗位"
    };
    refinfo["brand"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/brand-ref/",
        refName: "品牌",
        refUIType: "RefGrid",
        rootName: "品牌"
    };
    refinfo["taxCategory"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/tax-category-ref/",
        refName: "税类",
        refUIType: "RefGrid",
        rootName: "税类"
    };
    refinfo["warehouse"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/warehouse-ref/",
        refName: "仓库",
        refUIType: "RefGrid",
        rootName: "仓库"
    };
    refinfo["channel-warehouse"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/channel-warehouse-ref/",
        refName: "仓库",
        refUIType: "RefGrid",
        rootName: "仓库"
    };
    // 基本档案 end-----------------------------------------------------
    //价格促销 start
    refinfo["organization_price"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/price-organization-ref/",
        refName: "组织",
        refUIType: "RefGrid",
        rootName: "组织列表"
    };
    refinfo["activenode"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.prom + "/prom/active-node-ref/",
        refName: "活动节点",
        refUIType: "RefGrid",
        rootName: "活动节点列表"
    };
    refinfo["Combination"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.prom + "/prom/product-combine/",
        refName: "商品组合",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname", "combinationType"],
        strFieldName: ["编码", "名称", "组合类型"],
        rootName: "商品组合"
    };
    refinfo["promotionRule"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.prom + "/prom/rule-ref/",
        refName: "促销规则",
        refUIType: "RefGrid",
        rootName: "促销规则",
        strFieldCode: ["refcode", "refname", "refRuledescripe"],
        strFieldName: ["编码", "名称", "规则描述"]
    };
    refinfo["productcombine"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/product-combine-ref/",
        refName: "产品组合",
        refUIType: "RefGrid",
        rootName: "产品组合列表"
    };
    refinfo["agencypartition"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/agency-partition-ref/",
        refName: "办事处分区",
        refUIType: "RefTree",
        rootName: "办事处分区列表"
    };
    refinfo["agencypartitionfilterbodys"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/agency-partition-filterbodys-tree-ref/",
        refName: "办事处分区",
        refUIType: "RefTree",
        rootName: "办事处分区列表"
    };
    refinfo["agencypartitiongrid"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/agency-partition-gird-ref/",
        refName: "办事处分区",
        refUIType: "RefGrid",
        rootName: "办事处分区列表"
    };
    refinfo["activitytypeb"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/activity-type-b-ref/",
        refName: "活动类型",
        refUIType: "RefGrid",
        rootName: "活动类型列表"
    };
    refinfo["activitytypec"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom/activity-type-c-ref/",
        refName: "活动类型",
        refUIType: "RefGrid",
        rootName: "活动类型列表"
    };
    refinfo["activitystore"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom/activity-stores/",
        refName: "活动门店",
        refUIType: "RefGrid",
        rootName: "活动门店"
    };
    refinfo["activitystorec"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prom/prom-store-c-ref/",
        refName: "活动门店",
        refUIType: "RefGrid",
        rootName: "活动门店",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"]
    };
    refinfo["strategys"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/price/strategys-ref/",
        refName: "定价策略",
        refUIType: "RefGrid",
        rootName: "定价策略"
    };
    refinfo["customerRefb"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prom-customer-ref/",
        refName: "经销商",
        refUIType: "RefGrid",
        rootName: "经销商"
    };
    refinfo["customerRefc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom/prom-customer-c-ref/",
        refName: "经销商",
        refUIType: "RefGrid",
        rootName: "经销商"
    };
    refinfo["customerRefbchoose"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom-customer-to-choose-product-ref/",
        refName: "经销商",
        refUIType: "RefGrid",
        rootName: "经销商"
    };
    refinfo["promofficeb"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/prom-office-ref/",
        refName: "办事处",
        refUIType: "RefGrid",
        rootName: "办事处"
    };
    refinfo["shopref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/shop-ref/",
        refName: "门店",
        refUIType: "RefGrid",
        rootName: "门店"
    };
    refinfo["promactivity"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom-activity-ref/",
        refName: "活动定义",
        refUIType: "RefGrid",
        rootName: "活动定义列表"
    };
    refinfo["promactivityc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom/activity-c-ref/",
        refName: "活动定义",
        refUIType: "RefGrid",
        rootName: "活动定义列表"
    };

    refinfo["demoactivitytypeb"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/demo-activity-type-b-ref/",
        refName: "活动类型",
        refUIType: "RefGrid",
        rootName: "活动类型列表",
        defaultFieldCount: 5,
        strFieldCode: ["refpk", "refcode", "refname", "status"],
        strFieldName: ["主键", "编码", "名称", "状态"]
        // "refCodeNamePK":["refcode","refname","refpk"],
    };
    refinfo["demotabref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/testref_grid_ctr/",
        refName: "产品/产品组合",
        refUIType: "RefGrid",
        rootName: "活动类型列表"
        // "refCodeNamePK":["refcode","refname","refpk"],
    };
    refinfo["promproducttab"] = {
        cancelNormal: false,
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom-product-ref/",
        refName: "产品/产品组合",
        refUIType: "RefGrid",
        rootName: "",
        hasTab: true,
        tab1: "产品组合",
        tab2: "产品"
        // "defaultFieldCount":3,
        // "strFieldCode":["refpk","refcode","refname"],
        // "strFieldName":["主键","编码","名称"],
        // "strFieldCode_tab":["refcode","refname"],
        // "strFieldName_tab":["编码","名称"],
        // "refCodeNamePK":["refcode","refname","refpk"],
    };
    refinfo["promproductstab"] = {
        cancelNormal: false,
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom-product-c-ref/",
        refName: "销售产品/产品组合",
        refUIType: "RefGrid",
        rootName: "",
        hasTab: true,
        tab1: "产品组合",
        tab2: "产品"
        // "defaultFieldCount":3,
        // "strFieldCode":["refpk","refcode","refname"],
        // "strFieldName":["主键","编码","名称"],
        // "strFieldCode_tab":["refcode","refname"],
        // "strFieldName_tab":["编码","名称"],
        // "refCodeNamePK":["refcode","refname","refpk"],
    };
    refinfo["promproductpack"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom-pack-pro-ref/",
        refName: "产品包件",
        refUIType: "RefGrid",
        rootName: "产品包件"
    };
    refinfo["floatCoefficient"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/float-coeff-ref/",
        refName: "上浮系数",
        refUIType: "RefGrid",
        rootName: "上浮系数列表"
    };
    refinfo["wholeSalePrice"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/whole-sale-price-ref/",
        refName: "批发基础价",
        refUIType: "RefGrid",
        rootName: "批发基础价列表"
    };
    refinfo["retailManager"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/retail-manager-ref/",
        refName: "零售管控价",
        refUIType: "RefGrid",
        rootName: "零售管控价列表"
    };
    refinfo["wholeSalePriceCopy"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/whole-sale-price-copy-ref/",
        refName: "批发基础价",
        refUIType: "RefGrid",
        rootName: "批发基础价列表",
        defaultFieldCount: 5,
        strFieldCode: ["refcode", "refname", "salePrincipal", "saleOrg"],
        strFieldName: ["价格表编码", "价格表名称", "销售主体", "销售组织"]
    };
    refinfo["promDesignProduct"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/prom-prod-design-ref/",
        refName: "设计产品",
        refUIType: "RefGrid",
        rootName: "设计产品"
    };
    refinfo["priceMaintain"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/price/price-maintain-ref/",
        refName: "价目表",
        refUIType: "RefGrid",
        rootName: "价目表"
    };
    refinfo["priceList"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/price/price-list-ref/",
        refName: "价目表定义",
        refUIType: "RefGrid",
        rootName: "价目表定义"
    };
    refinfo["priceListItem"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/price/price-list-items-ref/",
        refName: "价格项",
        refUIType: "RefGrid",
        rootName: "价格项"
    };
    refinfo["priceDiscount"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.price + "/price/price-discount-ref/",
        refName: "基准折扣模板",
        refUIType: "RefGrid",
        rootName: "基准折扣模板"
    };

    //价格促销 end-----------------------------------------------------

    //b2b订单中心 start-----------------------------------------------------
    refinfo["potypoe"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/po-type-ref/",
        refName: "客户订单类型",
        refUIType: "RefGrid",
        rootName: "客户订单类型列表"
    };
    refinfo["transportmode"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/transport-mode-ref/",
        refName: "运输方式",
        refUIType: "RefGrid",
        rootName: "运输方式类型列表",
        defaultFieldCount: 1,
        strFieldCode: ["refname"],
        strFieldName: ["运输方式"]
    };
    refinfo["sotypoe"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/so-type-ref/",
        refName: "销售订单类型",
        refUIType: "RefGrid",
        rootName: "销售订单类型列表"
    };
    refinfo["vehicletypoe"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/vehicle-type-ref/",
        refName: "车辆类型",
        refUIType: "RefGrid",
        rootName: "车辆类型列表"
    };
    refinfo["shippingport"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/shipping-port-ref/",
        refName: "装运点",
        refUIType: "RefGrid",
        rootName: "装运点"
    };
    refinfo["storeLocation"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/store-location-ref/",
        refName: "库存地址",
        refUIType: "RefGrid",
        rootName: "库存地址"
    };
    refinfo["storearea"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/store-area-ref/",
        refName: "库区",
        refUIType: "RefGrid",
        rootName: "库区"
    };
    refinfo["shippingcondition"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/shipping-condition-ref/",
        refName: "装运条件",
        refUIType: "RefGrid",
        rootName: "装运条件"
    };
    //b2b订单中心 end-----------------------------------------------------
    //b2b-buyer 采购门户start---------------------------------------------
    refinfo["noticetype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.buyer + "/bulletin-ref/",
        refName: "公告分类",
        refUIType: "RefGrid",
        rootName: "公告分类"
    };
    refinfo["casttype"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.fee + "/cast-type-ref/",
        refName: "费用类型",
        refUIType: "RefGrid",
        rootName: "费用类型"
    };
    //b2b-buyer 采购门户end-----------------------------------------------

    //B2C订单中心 start---------------------------------------------------
    //档案管理 start---------------------------------------------------
    refinfo["organization_auth_b2c"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/organization-ref/",
        refName: "组织",
        refUIType: "RefGrid",
        rootName: "组织列表"
    };
    refinfo["tray_managements"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/b2b/tray-managements-ref/",
        refName: "托型",
        refUIType: "RefGrid",
        rootName: "托型参照"
    };
    refinfo["b2cplatform"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/platform-ref/",
        refName: "所属平台",
        refUIType: "RefGrid",
        rootName: "所属平台"
    };
    refinfo["b2cStoreRef"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/store-auth-ref/",
        // "refModelUrl": window.pathMap.b2c+"/b2c/store-ref/",
        refName: "请选择",
        refUIType: "RefGrid",
        rootName: "店铺列表",
        strFieldCode: ["platformName", "refname"],
        strFieldName: ["平台名称", "店铺名称"]
    };
    refinfo["b2cPromotionRef"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/prom/activity-ref/",
        refName: "促销活动",
        refUIType: "RefGrid",
        rootName: "促销活动"
    };
    refinfo["b2cPromotionRuleRef"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/prom-rule-ref/",
        refName: "促销规则",
        refUIType: "RefGrid",
        rootName: "促销规则"
    };
    //档案管理 end-----------------------------------------------------
    // 订单路由Start----------------------------------
    //仓库产品组
    refinfo["warehouseproductgroup"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/route/stor-packages-ref/",
        refName: "仓库产品组",
        refUIType: "RefGrid",
        rootName: "仓库产品组"
    };
    //经销商产品组
    refinfo["agencyproductgroup"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/route/customer-packages-ref/",
        refName: "经销商产品组",
        refUIType: "RefGrid",
        rootName: "经销商产品组"
    };
    //供应商产品组
    refinfo["supplierproductgroup"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/route/supplier-packages-ref/",
        refName: "供应商产品组",
        refUIType: "RefGrid",
        rootName: "供应商产品组"
    };
    // 订单路由End----------------------------------
    // 结算方式
    refinfo["settlementMode"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/settlement-mode-ref/",
        refName: "结算方式",
        refUIType: "RefGrid",
        rootName: "结算方式"
    };
    //收付款类型
    refinfo["settlementPaymentType"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.settlement + "/settlement/payment-ref/",
        refName: "收付款类型",
        refUIType: "RefGrid",
        rootName: "收付款类型"
    };
    // 结算-收款类型
    refinfo["settlementGatheringType"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.settlement + "/settlement/gathering-type-ref/",
        refName: "收款类型",
        refUIType: "RefGrid",
        rootName: "收款类型"
    };
    refinfo["settlementSettings"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.settlement + "/settlement/settings-ref/",
        refName: "账期设置",
        refUIType: "RefGrid",
        rootName: "账期设置",
        refparam: "{\"EQ_isEnable\":\"1\"}"
    };
    refinfo["exacctType"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.stlb2c + "/stlb2c/exacct-type-ref/",
        refName: "收支类型",
        refUIType: "RefGrid",
        rootName: "收支类型"
    };

    //B2c订单中心 end-----------------------------------------------------
    //
    refinfo["filerSchemeRef"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/fields-configure-ref/",
        refName: "字段名称",
        refUIType: "RefGrid",
        rootName: "字段名称列表"
    };
    //模版管理Start----------------------------------
    refinfo["metadata"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cmpt + "/metadata-ref/",
        refName: "UI元数据",
        refUIType: "RefGrid",
        rootName: "UI元数据"
    };
    refinfo["menu"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cmpt + "/menu-ref/",
        refName: "菜单",
        refUIType: "RefTree",
        rootName: "菜单"
    };

    refinfo["role"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cmpt + "/role-ref/",
        refName: "角色",
        refUIType: "RefGrid",
        rootName: "角色"
    };
    //模版管理End----------------------------------

    refinfo["shopMenu"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cmpt + "/shop-menu-ref/",
        refName: "门户菜单",
        refUIType: "RefTree",
        rootName: "门户菜单"
    };
    // 订单标记参照服务order-sign-ref
    refinfo["ordersign"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2c + "/b2c/order-sign-ref/",
        refName: "订单标记",
        refUIType: "RefGrid",
        rootName: "订单标记"
    };

    //特征属性页面 自定义档案
    refinfo["custDoc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/cust-docs-ref/",
        refName: "自定义档案",
        refUIType: "RefGrid",
        rootName: "自定义档案"
    };
    //特征属性页面 系统档案
    refinfo["systemDoc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/cust-doc-defs-ref/",
        refName: "系统档案",
        refUIType: "RefGrid",
        rootName: "系统档案"
    };

    //服务中心参照列表--start
    refinfo["sc-spg-ref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/service-provider-grade-ref/",
        refName: "服务商等级",
        refUIType: "RefGrid",
        rootName: "服务商等级"
    };

    refinfo["sc-spn-ref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/service-network-ref/",
        refName: "网点",
        refUIType: "RefGrid",
        rootName: "网点"
    };

    refinfo["sc-sp-ref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/service-provider-ref/",
        refName: "服务商",
        refUIType: "RefGrid",
        rootName: "服务商"
    };

    refinfo["sc-per-ref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/service-person-ref/",
        refName: "服务人员",
        refUIType: "RefGrid",
        rootName: "服务人员"
    };

    refinfo["sc-st-ref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/service-type-ref/",
        refName: "服务类型",
        refUIType: "RefGrid",
        rootName: "服务类型"
    };

    refinfo["faultClassify-parentId-ref"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/fault-type-ref/",
        refName: "上级分类",
        refUIType: "RefGrid",
        rootName: "上级分类"
    };
    refinfo["customers"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/customer-ref/",
        refName: "客户",
        refUIType: "RefGrid",
        rootName: "客户"
    };
    refinfo["customerEquity"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/customer-equity-ref/",
        refName: "客户资产",
        refUIType: "RefGrid",
        rootName: "客户资产"
    };
    refinfo["parts"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/parts-ref/",
        refName: "备件",
        refUIType: "RefGrid",
        rootName: "备件"
    };
    refinfo["repairBom"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/repair-bom-ref/",
        refName: "维修BOM",
        refUIType: "RefGrid",
        rootName: "维修BOM"
    };
    refinfo["fault"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.servicecenter + "/sc/fault-ref/",
        refName: "故障",
        refUIType: "RefGrid",
        rootName: "故障"
    };
    //服务中心参照列表--end
    //库存中心参照列表--start
    refinfo["batchNumber"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.inventory + "/stock/batch-numbers/",
        refName: "批次号",
        refUIType: "RefGrid",
        rootName: "批次号"
    };
    refinfo["goodsposition"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.inventory + "/stock/goods-position-ref/",
        refName: "货位",
        refUIType: "RefGrid",
        rootName: "货位"
    };
    refinfo["inventorystate"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.inventory + "/stock/inventory-state-ref/",
        refName: "库存状态",
        refUIType: "RefGrid",
        rootName: "库存状态"
    };
    refinfo["batchCode"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.inventory + "/stock/batch-codes-ref/",
        refName: "批号",
        refUIType: "RefGrid",
        rootName: "批号"
    };
    refinfo["suppliers"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/suppliers-ref/",
        refName: "供应商",
        refUIType: "RefGridTree",
        rootName: "供应商"
    };
    refinfo["bank"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/bank-ref/",
        refName: "银行",
        refUIType: "RefGrid",
        rootName: "银行"
    };
    refinfo["ent-bank-account"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/enterprise-bank-account-ref/",
        refName: "企业银行账户",
        refUIType: "RefGrid",
        rootName: "企业银行账户"
    };
    refinfo["suppliercategory"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/supplier-category-ref/",
        refName: "供应商分类",
        refUIType: "RefTree",
        rootName: "供应商分类"
    };
    refinfo["bank"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/bank-ref/",
        refName: "银行",
        refUIType: "RefGrid",
        rootName: "银行"
    };
    refinfo["customer-invoice"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/customer-invoice-ref/",
        refName: "客户开票信息",
        refUIType: "RefGrid",
        rootName: "客户开票信息",
        defaultFieldCount: 4,
        strFieldCode: [
            "invoiceTypeName",
            "invoiceTypeCode",
            "refcode",
            "invoiceOrgName"
        ],
        strFieldName: ["开票类型名称", "开票类型编码", "税号", "客户开票单位"]
    };
    //库存中心参照列表--end

    //b2c结算中心参照 start
    refinfo["defferenceType"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.stlb2c + "/stlb2c/defference-type-ref/",
        refName: "对账差异类型",
        refUIType: "RefGrid",
        rootName: "对账差异类型"
    };
    //b2c结算中心参照 end

    // 项目参照
    refinfo["project"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/project-ref/",
        refName: "项目",
        refUIType: "RefGrid",
        rootName: "项目"
    };

    // 信用控制策略参照
    refinfo["creditCtrlStrategy"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cr + "/cr/credit-ctrl-stra-ref/",
        refName: "信用控制策略",
        refUIType: "RefGrid",
        rootName: "信用控制策略"
    };
    // 原信用余额参照
    refinfo["credLimits"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cr + "/cr/credit-limits-ref/",
        refName: "原信用余额",
        refUIType: "RefGrid",
        rootName: "原信用余额",
        defaultFieldCount: 3,
        strFieldCode: [
            "creditLimit",
            "startDate",
            "endDate"
        ],
        strFieldName: ["原信用额度", "开始时间", "结束时间"]
    };
    // 组织职能参照
    refinfo["orgfunc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/orgfunc-ref/",
        refName: "组织职能",
        refUIType: "RefGrid",
        rootName: "组织职能"
    };

    //退货原因
    refinfo["return_cause"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/b2b/return-causes-ref/",
        refName: "退货原因",
        refUIType: "RefGrid",
        rootName: "退货原因"
    };

    //自定义档案分组
    refinfo["cusdoc_group"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/cust-doc-groups-ref/",
        refName: "分组",
        refUIType: "RefGrid",
        rootName: "分组"
    };

    //销售档案参照
    refinfo["seriesDoc"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.base + "/base/series-docs-ref/",
        refName: "销售档案",
        refUIType: "RefGrid",
        rootName: "销售档案"
    };
    //客户费用账户参照
    refinfo["fee-accounts"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.fee + "/fee/account-ref/",
        refName: "客户费用账户",
        refUIType: "RefGrid",
        rootName: "客户费用账户参照"
    };
    refinfo["supplement-account"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 1000
        },
        refCode: "",
        refModelUrl: window.pathMap.fee + "/fee/account-supplement-ref/",
        refName: "补货账户",
        refUIType: "RefGrid",
        rootName: "补货账户",
        defaultFieldCount: 2,
        strFieldCode: ["refname", "accountBalance"],
        strFieldName: ["补货账户", "账户余额"]
    };
    /*refinfo["allowSupplementGoods"] = {
     refClientPageInfo: {
     currPageIndex: 0,
     pageCount: 0,
     pageSize: 100
     },
     refCode: "",
     refModelUrl: window.pathMap.b2b + "/b2b/goods-ref/",
     refName: "货补商品",
     refUIType: "RefGridTree",
     refUISearchType: true,
     refUISeachAfterInput: true,
     pageSize: 100,
     refUISearchFirstCallBack: "setSearchEleDefaultRefParams",
     refUISearchCallBack: "fillSearchParamsBySupplement",
     rootName: "商品分类",
     defaultFieldCount: 5,
     strFieldCode: ["refcode", "displayName", "abbrName", "version", "productName", "basicUnitName"],
     strFieldName: ["编码", "显示名称", "简称", "版本号", "所属产品", "基本单位"],
     searchSourceData: [
     {
     type: "refer",
     key: "accountId",
     domid: "accountIdBaseKey",
     compid: "accountIdBase",
     referId: "accountIdBase",
     refinfo: "supplement-account",
     required: true,
     label: "货补账户",
     refName: "货补账户",
     }, {
     type: "text",
     key: "keyword",
     label: "商品名称",
     refName: "商品名称"
     }
     ]
     };*/
    //新增货补商品参照（参照地址修改）
    refinfo["allowSupplementGoods"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.b2b + "/b2b/goods-supplement-ref/",
        refName: "货补商品",
        refUIType: "RefGridTree",
        refUISearchType: true,
        refUISeachAfterInput: true,
        pageSize: 100,
        refUISearchFirstCallBack: "setSearchEleDefaultRefParams",
        refUISearchCallBack: "fillSearchParamsBySupplement",
        rootName: "商品分类",
        defaultFieldCount: 5,
        strFieldCode: ["refcode", "displayName", "abbrName", "version", "productName", "basicUnitName"],
        strFieldName: ["编码", "显示名称", "简称", "版本号", "所属产品", "基本单位"],
        searchSourceData: [{
            type: "refer",
            key: "accountId",
            domid: "accountIdBaseKey",
            compid: "accountIdBase",
            referId: "accountIdBase",
            refinfo: "supplement-account",
            required: true,
            label: "货补账户",
            refName: "货补账户"
        }, {
            type: "text",
            key: "keyword",
            label: "商品名称",
            refName: "商品名称"
        }]
    };
    //可用量策略参照
    refinfo["availablestrategy"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: "/occ-stock/stock/availablestrategy-ref/",
        refName: "可用量策略",
        refUIType: "RefGrid",
        rootName: "可用量策略参照"
    };
    //业务对象
    refinfo["busiobject"] = {
        "refClientPageInfo": {
            "currPageIndex": 0,
            "pageCount": 0,
            "pageSize": 100
        },
        "refCode": "",
        "refModelUrl": "/fmcg-dynamic-object/busiobjects-ref/",
        "refName": "业务对象",
        "refUIType": "RefGrid"
    };
    //模板
    refinfo["templateRef"] = {
        "refClientPageInfo": {
            "currPageIndex": 0,
            "pageCount": 0,
            "pageSize": 100
        },
        "refCode": "",
        "refModelUrl": "/fmcg-dynamic-object/dynamic/trantemplate-ref/",
        "refName": "模板",
        "refUIType": "RefGrid"
    };
    //模板字段可选参照
    refinfo["tplfieldrefer"] = {
        "refClientPageInfo": {
            "currPageIndex": 0,
            "pageCount": 0,
            "pageSize": 100
        },
        "refCode": "",
        "refModelUrl": "/occ-base/base/ref-doc-ref/",
        "refName": "可选参照",
        "refUIType": "RefGrid"
    };
    //模板可分配业务对象
    refinfo["tplallotbusiobject"] = {
        "refClientPageInfo": {
            "currPageIndex": 0,
            "pageCount": 0,
            "pageSize": 100
        },
        "refCode": "",
        "refModelUrl": "/occ-base/busiobjects-ref/",
        "refName": "业务对象",
        "refUIType": "RefGrid",
        "refparam": "{\"EQ_hasBusiType\":\"1\"}"
    };
    //业务类型
    refinfo["busitype"] = {
        "refClientPageInfo": {
            "currPageIndex": 0,
            "pageCount": 0,
            "pageSize": 100
        },
        "refCode": "",
        "refModelUrl": "/occ-base/busitypes-ref/",
        "refName": "业务类型",
        "refUIType": "RefGrid"
    };
    // 角色多选参照
    refinfo["role_com"] = {
        "refClientPageInfo": {
            "currPageIndex": 0,
            "pageCount": 0,
            "pageSize": 100
        },
        "refCode": "",
        "refModelUrl": "/occ-base" + "/role-ref/",
        "refName": "角色",
        "refUIType": "RefGrid",
        "rootName": "角色"
    };
    // 返利周期
    refinfo["salesCycle"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.rebate + "/cycles-ref/",
        refName: "返利周期",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "返利周期"
    };
    // 销售返利指标
    refinfo["saleTarget"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.rebate + "/rebate/sales-target-ref/",
        refName: "销售指标",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "销售指标"
    };
    // 促销活动
    refinfo["promActivityFromProm"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.prom + "/prom/promactivity-ref/",
        refName: "促销活动",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "促销活动"
    };

    // 返利政策
    refinfo["rebatePolicy"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.rebate + "/rebate/policy-ref/",
        refName: "返利政策",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "返利政策"
    };

    // 返利依据
    refinfo["rebateBasis"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.rebate + "/rebate/basis-ref/",
        refName: "返利依据",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "返利依据"
    };

    // 返利值
    refinfo["rebateValue"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.rebate + "/rebate/value-ref/",
        refName: "返利值",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "返利值"
    };

    // 合同管理(同步)
    refinfo["contractSync"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.contract + "/contract/payment-sync-ref/",
        refName: "合同管理",
        refUIType: "RefGrid",
        strFieldCode: ["refcode", "refname"],
        strFieldName: ["编码", "名称"],
        rootName: "合同管理"
    };
    // 小应用
    refinfo["applicationCode"] = {
        refClientPageInfo: {
            currPageIndex: 0,
            pageCount: 0,
            pageSize: 100
        },
        refCode: "",
        refModelUrl: window.pathMap.cmpt + "/iuap-app-ref/",
        refName: "iUAP小应用",
        refUIType: "RefGrid",
        rootName: "iUAP小应用"
    };

    return $.extend({}, refinfo, refinfo_temp);
});
