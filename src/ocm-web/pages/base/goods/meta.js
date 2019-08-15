define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            Goodsmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.GoodsDto"
                },
                meta: {
                    id: {
                        type: "string"
                    }, //id
                    productId: { //所属产品
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["product"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    }, //所属产品
                    productCode: {
                        type: "string"
                    }, //所属产品
                    productName: {
                        type: "string"
                    }, //所属产品

                    code: {
                        type: "string"
                    }, //编码
                    displayName: {
                        type: "string",
                        required: true
                    }, //显示名称
                    name: {
                        type: "string",
                        required: true
                    }, //名称
                    abbrName: {
                        type: "string"
                    }, //简称
                    goodsCategoryId: { //商品分类
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["goodsCategory"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    goodsCategoryCode: {
                        type: "string"
                    }, //商品分类
                    goodsCategoryName: {
                        type: "string"
                    }, //商品分类

                    saleSeriesId: { //销售系列
                        type: "string"
                        // "refmodel": JSON.stringify(refinfo["productSaleSeries"]),
                        // "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    // saleSeriesCode: {
                    //     type: "string"
                    // }, //销售系列
                    // saleSeriesName: {
                    //     type: "string"
                    // }, //销售系列


                    developSeriesId: { //研发系列
                        type: "string"
                        // "refmodel": JSON.stringify(refinfo["productSaleSeries"]),
                        // "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    // developSeriesCode: {
                    //     type: "string"
                    // }, //研发系列
                    // developSeriesName: {
                    //     type: "string"
                    // }, //研发系列

                    prodAttrStrucId: { //属性结构
                        type: "string",
                        //不选择产品时，可不选
                        // required: true,
                        "refmodel": JSON.stringify(refinfo["prodAttrStruc"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    prodAttrStrucCode: {
                        type: "string"
                    }, //属性结构
                    prodAttrStrucName: {
                        type: "string"
                    }, //属性结构
                    model: {
                        type: "string"
                    }, //型号
                    specification: {
                        type: "string"
                    }, //规格
                    brandId: { //品牌
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["brand"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    brandCode: {
                        type: "string"
                    }, //品牌
                    brandName: {
                        type: "string"
                    }, //品牌
                    isServiceType: {
                        type: "integer",
                        default: "0",
                        required: true
                    }, //服务类
                    productLineId: { //产品线
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["productLine"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    productLineCode: {
                        type: "string"
                    }, //产品线
                    productLineName: {
                        type: "string"
                    }, //产品线
                    basicUnitId: { //销售单位
                        type: "string",
                        //required: true,
                        "refmodel": JSON.stringify(refinfo["utils"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        required: true
                    },
                    basicUnitCode: {
                        type: "string"
                    }, //销售单位
                    basicUnitName: {
                        type: "string"
                    }, //销售单位
                    assistUnitId: { //订货单位
                        type: "string",
                        // required: true,
                        "refmodel": JSON.stringify(refinfo["utils"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}",
                        required: true
                    },
                    assistUnitCode: {
                        type: "string"
                    }, //订货单位
                    assistUnitName: {
                        type: "string"
                    }, //订货单位
                    taxCategoryId: { //税类
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["taxCategory"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    },
                    taxCategoryCode: {
                        type: "string"
                    }, //税类
                    taxCategoryName: {
                        type: "string"
                    }, //税类
                    //conversionRate: { type: 'float',validType:"float"},//换算率
                    // conversionRate: { type: 'string',regExp:/^\d+$/, required: true,errorMsg:"只能输入整数" },//换算率
                    conversionRate: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        required: true,
                        errorMsg: "只能输入数字"
                    }, //换算率
                    // ^[1-9]\d{0,5}(\.\d{1,2})?$
                    enableBatchNumberManage: {
                        type: "integer",
                        required: true
                    }, //启用批次号管理
                    enableStrucManage: {
                        type: "integer"
                    }, //启用商品结构管理
                    enableBatchNoManage: {
                        type: "integer"
                        // required: true
                    }, //启用批号管理
                    enableInvStatusManage: {
                        type: "integer",
                        required: true
                    }, //启用库存状态管理
                    goodsLifecycleCode: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"GOODS_LIFECYCLE\",\"refName\":\"商品生命周期\"}"
                    },
                    goodsLifecycleName: {
                        type: "string"
                    }, //商品生命周期
                    productionCycle: {
                        type: "string"
                    }, //商品生产周期
                    isNew: {
                        type: "integer",
                        required: true
                    }, //新品
                    externalLength: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //外观长度
                    externalWidth: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //外观宽度
                    externalHeight: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //外观高度
                    externalDiameter: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //外观直径
                    externalSize: {
                        type: "string"
                    }, //外观尺寸
                    packLength: {
                        type: "string",
                        regExp: /^[1-9]\d{0,17}(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //包装长度
                    packWidth: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //包装宽度
                    packHeight: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //包装高度
                    packDiameter: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //包装直径
                    packSize: {
                        type: "string"
                    }, //包装尺寸

                    volume: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //体积
                    volumeUnitId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["utils"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    }, //体积单位
                    volumeUnitCode: {
                        type: "string"
                    }, //体积单位
                    volumeUnitName: {
                        type: "string"
                    }, //体积单位
                    netWeight: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //净重
                    grossWeight: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //毛重
                    weightUnitId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["utils"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"
                    }, //重量单位
                    weightUnitCode: {
                        type: "string"
                    }, //重量单位
                    weightUnitName: {
                        type: "string"
                    }, //重量单位
                    description: {
                        type: "string"
                    }, //描述
                    isEnable: {
                        type: "integer",
                        required: true
                    }, //启用状态
                    isOnShelf: {
                        type: "integer",
                        required: true
                    }, //上架
                    isPromotion: {
                        type: "integer",
                        required: true
                    }, //助促销品
                    isSparePart: {
                        type: "integer",
                        required: true
                    }, //备件
                    goodsAttrVals: {
                        type: "string"
                    },
                    version: {
                        type: "integer"
                    }, //版本号
                    originalGoodsId: {
                        type: "string"
                    }, //原始版本
                    isOnSle: {
                        type: "integer",
                        required: true
                    }, //在售
                    virtualLinkCode: { //虚拟连接编码
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"VIRTUAL_LINK\",\"refName\":\"虚拟链接\"}"
                    },
                    virtualLinkName: {
                        type: "string"
                    }, //虚拟连接名字
                    LogisticsModeCode: { //物流方式
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"LOGISTICS_MODE\",\"refName\":\"物流方式\"}",
                        required: true
                    },
                    logisticsModeName: {
                        type: "string"
                    }, //物流方式
                    isLatestVersion: {
                        type: "string"
                    }, //是否是最新的
                    costPrice: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //成本价
                    advicePrice: {
                        type: "string",
                        regExp: /^0|([1-9]\d{0,17})(\.\d{1,6})?$/,
                        errorMsg: "只能输入数字"
                    }, //建议价
                    upgradeVersion: {
                        type: "string"
                    }, //升级款
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true，
            }
        },

        //操作按钮组
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                clickArg: "-1",
                click: "beforeEdit"
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }, {
                key: "createCopyGoods",
                clickArg: "-2",
                label: "复制",
                click: "createCopyGoods"
            }

            ],
            button2: [{
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }, {
                key: "onshelf",
                label: "上架",
                iconCls: "icon-qiyong",
                click: "onshelf"
            }, {
                key: "unonshelf",
                label: "下架",
                iconCls: "icon-tingyong",
                click: "unonshelf"
            }, {
                key: "import",
                label: "导入EXCEL",
                iconCls: "icon-import",
                click: "importHandle"
            }, {
                key: "export",
                label: "导出EXCEL",
                iconCls: "icon-export",
                click: "exportHandle"
            }, {
                key: "exportpdf",
                label: "导出PDF",
                iconCls: "icon-export",
                click: "exportHandlePdf"
            }],
            button3: [{
                key: "return",
                label: "返回",
                cls: "ui-btn-primary",
                click: "backPanel"
            },
                {
                    key: "edit",
                    label: "编辑",
                    click: "beforeEdit",
                    cls: "ui-btn-green"
                }],
            button4: [{
                key: "save",
                label: "保存",
                click: "saveHandle",
                iconCls: "icon-tubiao-baocun"
            }, {
                key: "cancel",
                label: "取消",
                click: "cancelHandle",
                iconCls: "icon-tubiao-guanbi-anxing"
            }],
            button5: [{
                key: "delAttach",
                label: "删除",
                click: "btnDelAttach",
                iconCls: "icon-shanchu1"
            }, {
                key: "uploadAttach",
                label: "上传",
                click: "btnUploadAttach",
                iconCls: "icon-tubiao-shangchuan"
            }, {
                key: "downLoadAttach",
                label: "下载",
                click: "downLoadAttachBatch",
                iconCls: "icon-tubiao-xiazai"
            }]
        },
        buttonmenus: {
            buttonmenu1: [{
                key: "batch",
                label: "批量设置",
                iconCls: "icon-import",
                auth: true,
                children: [{
                    key: "enableBatchNumber",
                    label: "启用批次",
                    click: "enableBatchNumber"
                }, {
                    key: "disableBatchNumber",
                    label: "停用批次",
                    click: "disableBatchNumber"
                }

                ]
            }],
            buttonmenu2: [
                {
                    key: "assistFunction",
                    label: "辅助功能",
                    iconCls: "icon-import",
                    auth: true,
                    children: [{
                        key: "showGoodsBomBtn",
                        label: "联查商品结构",
                        domid: "showGoodsBomBtn",
                        click: "showGoodsBomBtn"
                    }, {
                        key: "createNewVersion",
                        label: "创建新版本",
                        click: "createNewVersion"
                    }]
                }
            ]
        },
        //查询条件组
        searchs: {
            search1: [

                {
                    type: "text",
                    key: "code",
                    label: "编码"
                }, {
                    type: "text",
                    key: "displayName",
                    label: "显示名称"
                }, {
                    type: "refer",
                    key: "goodsCategory--id",
                    label: "商品分类",
                    referId: "goodsCategoryBase",
                    ifSeachTreeCode: true,
                    refinfo: "goodsCategory",
                    clientParam: {"AUTH_refdim":"goodsCategory"}
                }, {
                    type: "refer",
                    key: "product--id",
                    label: "所属产品",
                    refinfo: "product"
                }, {
                    type: "refer",
                    key: "productLine--id",
                    label: "产品线",
                    refinfo: "productLine"
                }, {
                    type: "refer",
                    key: "brand--id",
                    label: "品牌",
                    refinfo: "brand"
                }, {
                    type: "text",
                    key: "specification",
                    label: "规格"
                }, {
                    type: "text",
                    key: "model",
                    label: "型号"
                },{
                    type: "refer",
                    key: "saleSeries",
                    refinfo: "saleSerial",
                    refcfg: {"ctx":"/uitemplate_web","isMultiSelectedEnabled":true},
                    clientParam: {
                        "EQ_isEnable":"1"
                    },
                    opr: "IN",
                    label: "销售系列",
                },{
                    type: "refer",
                    key: "developSeries",
                    refinfo: "developmentSeries",
                    refcfg: {"ctx":"/uitemplate_web","isMultiSelectedEnabled":true},
                    clientParam: {
                        "EQ_isEnable":"1"
                    },
                    opr: "IN",
                    label: "研发系列",
                },

                {
                    type: "radio",
                    key: "enableBatchNumberManage",
                    label: "启用批次号管理",
                    defaultvalue: " ",
                    dataSource: [{
                        value: " ",
                        name: "全部"
                    }, {
                        value: "1",
                        name: "是"
                    }, {
                        value: "0",
                        name: "否"
                    }]
                }, {
                    type: "radio",
                    key: "isNew",
                    label: "新品推荐",
                    defaultvalue: " ",
                    dataSource: [{
                        value: " ",
                        name: "全部"
                    }, {
                        value: "1",
                        name: "是"
                    }, {
                        value: "0",
                        name: "否"
                    }]
                }, {
                    type: "radio",
                    key: "isOnShelf",
                    label: "上架",
                    defaultvalue: " ",
                    dataSource: [{
                        value: " ",
                        name: "全部"
                    }, {
                        value: "1",
                        name: "是"
                    }, {
                        value: "0",
                        name: "否"
                    }]
                }, {
                    type: "combo",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: "1",
                    dataSource: [{
                        value: "",
                        name: "全部"
                    }, {
                        value: "0",
                        name: "未启用"
                    }, {
                        value: "1",
                        name: "已启用"
                    }, {
                        value: "2",
                        name: "已停用"
                    }, {
                        value: "3",
                        name: "未停用"
                    }]
                }
            ],
            search2: [{
                type: "text",
                key: "searchKey",
                label: "国家"
                // refinfo:"country",
                // refName: "国家"
            }]
        },
        cards: {
            card1: [{
                type: "refer",
                key: "productId",
                compid: "productId",
                label: "所属产品"
            }, {
                type: "text",
                key: "code",
                label: "编码",
                enable: false
            }, {
                type: "text",
                key: "displayName",
                label: "显示名称"
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "text",
                key: "abbrName",
                label: "简称"
            }, {
                type: "text",
                key: "version",
                label: "版本号",
                enable: false
            }, {
                type: "refer",
                compid: "goodscategoryId",
                key: "goodsCategoryId",
                label: "商品分类",
                clientParam: {
                    "EQ_isLeaf": "1",
                    "EQ_isEnable": "1",
                    "AUTH_refcod": "baseGoods"
                }
            }, {
                type: "refer",
                key: "saleSeriesId",
                refinfo: "saleSerial",
                label: "销售系列",
                clientParam: {
                    "EQ_isEnable": "1"
                }
            }, {
                type: "refer",
                key: "developSeriesId",
                refinfo: "developmentSeries",
                label: "研发系列",
                clientParam: {
                    "EQ_isEnable": "1"
                }
            }, {
                type: "text",
                key: "specification",
                label: "规格"
            }, {
                type: "text",
                key: "model",
                compid: "model",
                label: "型号"
            }, {
                type: "refer",
                compid: "productLineId",
                key: "productLineId",
                label: "产品线"
            }, {
                type: "refer",
                compid: "brandId",
                key: "brandId",
                label: "品牌"
            }, {
                type: "radio",
                key: "isServiceType",
                label: "服务类",
                defaultvalue: "0",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }, {
                type: "combo",
                key: "goodsLifecycleCode",
                label: "商品生命周期",
                dataSource: "goodsLifecycleDatasource"
            }, {
                type: "text",
                label: "生产周期（天）",
                key: "productionCycle"
            }, {
                type: "refer",
                compid: "basicUnitId",
                key: "basicUnitId",
                label: "销售单位"
            }, {
                type: "refer",
                compid: "assistUnitId",
                key: "assistUnitId",
                label: "订货单位"
            }, {
                type: "text",
                compid: "conversionRate",
                key: "conversionRate",
                label: "换算率"
            }, {
                type: "text",
                key: "costPrice",
                label: "成本价"
            }, {
                type: "text",
                key: "advicePrice",
                label: "建议价"
            }, {
                type: "refer",
                compid: "taxCategoryId",
                key: "taxCategoryId",
                label: "税类"
            }, {
                type: "text",
                key: "upgradeVersion",
                label: "升级款",
                enable: false
            }, {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: "0"
            }],
            card2: [{
                type: "refer",
                compid: "prodAttrStrucId",
                key: "prodAttrStrucId",
                label: "属性结构"
            }],
            card3: [{
                type: "radio",
                key: "isNew",
                label: "新品推荐",
                defaultvalue: "0",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }, {
                type: "radio",
                key: "isOnShelf",
                label: "上架",
                defaultvalue: "0",
                enable: false,
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }, {
                type: "radio",
                key: "isPromotion",
                label: "助促销品",
                defaultvalue: "0",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }, {
                type: "radio",
                key: "isOptional",
                label: "可选配",
                defaultvalue: "0",
                enable: false,
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }],
            card4: [{
                type: "radio",
                key: "enableBatchNumberManage",
                compid: "enableBatchNumberManage",
                label: "批次号管理",
                defaultvalue: "0",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            },

                {
                    type: "radio",
                    key: "enableStrucManage",
                    compid: "enableStrucManage",
                    label: "商品结构管理",
                    defaultvalue: "0",
                    dataSource: [{
                        value: "1",
                        name: "是"
                    }, {
                        value: "0",
                        name: "否"
                    }]
                },
                // {
                //     type: "radio",
                //     key: "enableBatchNoManage",
                //     label: "批号管理",
                //     defaultvalue: "0",
                //     dataSource: [{
                //         value: "1",
                //         name: "是"
                //     }, {
                //         value: "0",
                //         name: "否"
                //     }]
                // },

                {
                    type: "radio",
                    key: "enableInvStatusManage",
                    label: "库存状态管理",
                    defaultvalue: "0",
                    dataSource: [{
                        value: "1",
                        name: "是"
                    }, {
                        value: "0",
                        name: "否"
                    }]
                }
            ],
            card5: [{
                type: "radio",
                key: "isSparePart",
                label: "备件",
                defaultvalue: "0",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }],
            card6: [{
                type: "text",
                key: "externalLength",
                label: "外观长度"
            }, {
                type: "text",
                key: "externalWidth",
                label: "外观宽度"
            }, {
                type: "text",
                key: "externalHeight",
                label: "外观高度"
            }, {
                type: "text",
                key: "externalDiameter",
                label: "外观直径"
            }, {
                type: "text",
                key: "externalSize",
                label: "外观尺寸"
            }, {
                type: "text",
                key: "packLength",
                label: "包装长度"
            }, {
                type: "text",
                key: "packWidth",
                label: "包装宽度"
            }, {
                type: "text",
                key: "packHeight",
                label: "包装高度"
            }, {
                type: "text",
                key: "packDiameter",
                label: "包装直径"
            }, {
                type: "text",
                key: "packSize",
                label: "包装尺寸"
            }, {
                type: "text",
                key: "volume",
                label: "体积"
            }, {
                type: "refer",
                key: "volumeUnitId",
                label: "体积单位"
            }, {
                type: "text",
                key: "netWeight",
                label: "净重"
            }, {
                type: "text",
                key: "grossWeight",
                label: "毛重"
            }, {
                type: "refer",
                key: "weightUnitId",
                label: "重量单位"
            }],
            card7: [{
                type: "radio",
                key: "isOnSle",
                label: "电商在售",
                defaultvalue: "0",
                dataSource: [{
                    value: "1",
                    name: "是"
                }, {
                    value: "0",
                    name: "否"
                }]
            }, {
                type: "combo",
                key: "virtualLinkCode",
                label: "虚拟连接",
                dataSource: "virtualLinkDatasource",
                defaultvalue: "0"
            }, {
                type: "combo",
                key: "logisticsModeCode",
                label: "物流方式",
                dataSource: "logisticsModeDatasource",
                defaultvalue: "1"
            }]

        },

        details: {
            detail1: [{
                key: "productName",
                label: "所属产品"
            }, {
                key: "code",
                label: "编码"
            }, {
                key: "displayName",
                label: "显示名称"
            }, {
                key: "name",
                label: "名称"
            }, {
                key: "abbrName",
                label: "简称"
            }, {
                key: "version",
                label: "版本号"
            }, {
                key: "goodsCategoryName",
                label: "商品分类"
            }, {
                key: "saleSeriesName",
                label: "销售系列"
            }, {
                key: "developSeriesName",
                label: "研发系列"
            }, {
                key: "specification",
                label: "规格"
            }, {
                key: "model",
                label: "型号"
            }, {
                key: "productLineName",
                label: "产品线"
            }, {
                key: "brandName",
                label: "品牌"
            }, {
                key: "isServiceType",
                label: "服务类",
                computed: "isServiceTypecomp"
            }, {
                key: "goodsLifecycleName",
                label: "商品生命周期"
            }, {
                key: "productionCycle",
                label: "生产周期（天）"
            }, {
                key: "basicUnitName",
                label: "销售单位"
            }, {
                key: "assistUnitName",
                label: "订货单位"
            }, {
                key: "conversionRate",
                label: "换算率"
            }, {
                key: "costPrice",
                label: "成本价"
            }, {
                key: "advicePrice",
                label: "建议价"
            }, {
                key: "taxCategoryName",
                label: "税类"
            }, {
                key: "upgradeVersion",
                label: "升级款"
            }, {
                key: "isEnable",
                label: "启用状态",
                computed: "isEnablecomp"
            }
                // {
                //     key: "ownerOrganizationName",
                //     label: "所属组织",
                // },
                // {
                //     key: "ownerCustomerName",
                //     label: "所属客户",
                // },
            ],
            detail2: [{
                key: "prodAttrStrucName",
                label: "属性结构"
            }],
            detail3: [

                {
                    key: "isNew",
                    label: "新品推荐",
                    computed: "isNewcomp"
                }, {
                    key: "isOnShelf",
                    label: "上架",
                    computed: "isOnShelfcomp"
                }, {
                    key: "isPromotion",
                    label: "助促销品",
                    computed: "isPromotioncomp"
                }, {
                    key: "isOptional",
                    label: "可选配",
                    computed: "isOptionalcomp"
                }
            ],
            detail4: [{
                key: "enableBatchNumberManage",
                label: "批次号管理",
                computed: "isEnableBatchNumberManage"
            }, {
                key: "enableStrucManage",
                label: "商品结构管理",
                computed: "isEnableStrucManage"
            },
            //     {
            //     key: "enableBatchNoManage",
            //     label: "批号管理",
            //     computed: "isEnableBatchNoManage"
            // },
                {
                key: "enableInvStatusManage",
                label: "库存状态管理",
                computed: "isEnableInvStatusManage"
            }

            ],
            detail5: [{
                key: "isSparePart",
                label: "备件",
                computed: "isSparePartcomp"
            }],
            detail6: [{
                key: "externalLength",
                label: "外观长度"
            }, {
                key: "externalWidth",
                label: "外观宽度"
            }, {
                key: "externalHeight",
                label: "外观高度"
            }, {
                key: "externalDiameter",
                label: "外观直径"
            }, {
                key: "externalSize",
                label: "外观尺寸"
            }, {
                key: "packLength",
                label: "包装长度"
            }, {
                key: "packWidth",
                label: "包装宽度"
            }, {
                key: "packHeight",
                label: "包装高度"
            }, {
                key: "packDiameter",
                label: "包装直径"
            }, {
                key: "packSize",
                label: "包装尺寸"
            }, {
                key: "volume",
                label: "体积"
            }, {
                key: "volumeUnitName",
                label: "体积单位"
            }, {
                key: "netWeight",
                label: "净重"
            }, {
                key: "grossWeight",
                label: "毛重"
            }, {
                key: "weightUnitName",
                label: "重量单位"
            }

            ],

            detail7: [{
                key: "description",
                label: "描述",
                cls: "ui-textarea-item ui-detail-description"
            }],
            detail8: [{
                key: "isOnSle",
                label: "电商在售",
                computed: "com_isOnSle"
            }, {
                key: "virtualLinkName",
                label: "虚拟连接"
            }, {
                key: "logisticsModeName",
                label: "物流方式"
            }]
        },
        //弹窗组
        dialogs: {
            dialog1: [{
                type: "refer",
                key: "countryId",
                label: "国家",
                refinfo: "country",
                refName: "国家",
                disableInEdit: true
            }, {
                type: "text",
                key: "code",
                label: "行政区域编码",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "名称"
            }, {
                type: "text",
                key: "displayName",
                label: "显示名称"
            }, {
                type: "text",
                key: "abbrName",
                label: "简称"
            }, {
                type: "refer",
                key: "parentId",
                referId: "parentId",
                label: "上级行政区划",
                refinfo: "region"
            },
                // {
                //     type:"text",
                //     key:"parentCountryId",
                //     label:"上级行政区划国家主键",
                //     cls: "hidden"
                // },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态"
                }, {
                    type: "text",
                    key: "postcode",
                    label: "邮编"
                }
                // {
                //     type: "textarea",
                //     key: "description",
                //     label: "描述",
                //     cls: "ui-textarea-item"
                // }
            ]
        },
        grids: {
            grid1: {
                domid: "simple1",
                umeta: {
                    id: "grid_simple1",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                    contentSelect: true,
                    contentFocus: true
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                    renderType: "detailRender",
                    enable: false
                },
                    // {
                    //     field: "ownerOrganizationName",
                    //     dataType: "String",
                    //     title: "所属组织",
                    //     visible: false
                    // },
                    // {
                    //     field: "ownerCustomerName",
                    //     dataType: "String",
                    //     title: "所属客户",
                    //     visible: false
                    // },

                    {
                        field: "displayName",
                        dataType: "String",
                        title: "显示名称"
                    }, {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    }, {
                        field: "abbrName",
                        dataType: "String",
                        title: "简称"
                    }, {
                        field: "version",
                        dataType: "String",
                        title: "版本号"
                    }, {
                        field: "goodsCategoryName",
                        dataType: "String",
                        title: "商品分类"
                    }, {
                        field: "saleSeriesName",
                        dataType: "String",
                        title: "销售系列",
                        visible: false
                    }, {
                        field: "developSeriesName",
                        dataType: "String",
                        title: "研发系列",
                        visible: false
                    }, {
                        field: "prodAttrStrucName",
                        dataType: "String",
                        title: "属性结构",
                        visible: false
                    }, {
                        field: "productName",
                        dataType: "String",
                        title: "所属产品",
                        "renderType": "productRender"
                    }, {
                        field: "specification",
                        dataType: "String",
                        title: "规格"
                    }, {
                        field: "model",
                        dataType: "String",
                        title: "型号"
                    }, {
                        field: "brandName",
                        dataType: "String",
                        title: "品牌"
                    }, {
                        field: "productLineName",
                        dataType: "String",
                        title: "产品线",
                        visible: false
                    }, {
                        field: "basicUnitName",
                        dataType: "String",
                        title: "销售单位",
                        visible: false
                    }, {
                        field: "assistUnitName",
                        dataType: "String",
                        title: "订货单位",
                        visible: false
                    }, {
                        field: "conversionRate",
                        dataType: "String",
                        title: "换算率",
                        visible: false
                    }, {
                        field: "enableBatchNumberManage",
                        dataType: "String",
                        title: "启用批次号管理",
                        renderType: "whetherRender",
                        visible: false
                    }, {
                        field: "prodAttrStrucName",
                        dataType: "String",
                        title: "属性结构",
                        visible: false
                    }, {
                        field: "isNew",
                        dataType: "String",
                        title: "新品推荐",
                        renderType: "whetherRender"
                    }, {
                        field: "isOnShelf",
                        dataType: "String",
                        title: "上架",
                        renderType: "whetherRender"
                    }, {
                        field: "isPromotion",
                        dataType: "String",
                        title: "助促销品",
                        renderType: "whetherRender"
                    }, {
                        field: "isEnable",
                        dataType: "String",
                        title: "启用状态",
                        renderType: "enableRender"
                    },

                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    }, {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    }, {
                        field: "creationTime",
                        dataType: "Datetime",
                        title: "创建时间",
                        visible: false
                    }, {
                        field: "modifiedTime",
                        dataType: "Datetime",
                        title: "修改时间",
                        visible: false
                    }, {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                        width: "240px"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});
