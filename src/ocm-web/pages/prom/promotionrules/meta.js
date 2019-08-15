define(["ocm_global"], function () {
    window.ProductCombine = {
        params: {
            cls: "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
        },
        meta: {
            id: {type: "string"}, //id
            code: {type: "string",enable:false}, //编码
            name: {type: "string", required: true}, //名称
            // pkOrg: {
            //   type: 'string',
            //   required:true,
            //   "refmodel": JSON.stringify(refinfo['organization_ocm']),
            //   "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            //   "refparam":'{"EQ_isAdministration": "1"}',
            // },//组织
            // pkOrgName: {type: 'string',required:true},//组织名称
            // enableStatus: {type: 'string',required:true},//启用状态
            promWay: {type: "string", required: true, default: 1}, //促销方式
            promotionBench: {type: "string", required: true, default: 1}, //促销基准
            limit: {type: "string"}, //累计限量
            ladderWay: {type: "string", default: 1}, //阶梯方式
            giftStandard: {type: "string", required: true, default: 1}, //赠品基准
            precondition: {type: "string", required: true, default: 0}, //前置条件
            totalLimitFlag: {type: "string", default: 1}, //累计限量
            isAllProduct: {type: "string", default: 0}, //是否全部商品
            isShow: {type: "integer", default: 0}, //是否全部商品
            creator: {type: "string"},
            creationTime: {type: "datetime"},
            modifier: {type: "string"},
            modifiedTime: {type: "datetime"}
        },
        pageSize: 20
        //是否启用前端缓存
        // pageCache: true
    };

    // 买赠规则-孙表
    var grandchildmeta = {
        meta: {
            id: {type: "string"}, //id
            giftId: {
                type: "string"
            },
            giftCode: {
                type: "string"
            },
            giftName: {
                type: "string"
            },
            giftType: {
                type: "string"
            },
            giftAmout: {
                type: "string"
            }
        }
    };
    // 买赠规则-子表
    var childmeta = {
        meta: {
            giftConditionStart: {
                type: "string"
            },
            giftConditionEnd: {
                type: "string"
            },
            eachFull: {
                type: "string"
            },
            giftInfos: {
                type: "child",
                meta: grandchildmeta.meta
            }
        }
    };
    // 买赠规则-主表
    window.BuyGiftItem = {
        params: {
            cls: "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
        },
        meta: {
            id: {type: "string"}, //idp
            proId: {type: "string"}, // 商品主键
            proType: {type: "integer"}, // 商品主键
            proCode: {type: "string"}, // 商品主键
            proName: {type: "string"}, // 商品主键
            theSelected: {type: "integer"}, // 是否组合筛选
            ruleStandard: {type: "string"}, // 规则基准
            promProductRange: {
                type: "child",
                meta: {
                    id:{type: "string"}, //id
                    goodsScopeType:{type: "string"},//货物类型  即产品/商品/分类等
                    goodsId:{type:"string"},
                    goodsCode:{type:"string"},
                    goodsName:{type:"string"},
                    exclud:{type:"string"}
                }

            }, // 促销品范围
            conditionInfos: {
                type: "child",
                meta: childmeta.meta
            }
        },
        pageSize: 10
    };
    // 买赠规则-订单金额-主表
    window.BuyGiftItem2 = {
        meta: {
            giftConditionStart: {
                type: "string"
            },
            giftConditionEnd: {
                type: "string"
            },
            giftInfos: {
                type: "child",
                meta: grandchildmeta.meta
            }
        }
    };
    window.ItemRef = {
        meta: {
            productref: {
                type: "string",
                // "refmodel": JSON.stringify(refinfo['productInfo']),
                refmodel: JSON.stringify(refinfo["utils"]),
                refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
                // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
            }
        }
    };
    //赠品商品
    window.giftsProductItem = {
        meta: {
            id: {type: "string"}, //idp
            giftType: {
                type: "string"
            },
            saleOrgId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["productInfo"]),
                refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
            },
            commodityCode: {
                type: "string"
            }, //商品组合编码
            categoryCode: {
                type: "string"
            }, //商品分类编码
            productCode: {
                type: "string"
            }, //产品编码
            goodsCode: {
                type: "string"
            } //商品编码
        }
    };
    //本次促销中本订单的前置条件
    window.promOrderCondition = {
        meta: {
            id: {type: "string"}, //id
            numMeeet: {type: "string"}, //数量满足
            mnyMeet: {type: "string"}, //金额满足
            oneCondition: {
                type: "child",
                meta: {
                    id:{type: "string"}, //id
                    goodsScopeType:{type: "string"},//货物类型  即产品/商品/分类等
                    goodsId:{type:"string"},
                    goodsCode:{type:"string"},
                    goodsName:{type:"string"}
                }
            }
        }
    };
    // 前置条件
    window.PreconditionItem = {
        meta: {
            id: {type: "string"}, //idp
            preType: {type: "string"}, //前置条件类型
            startTime: {type: "string"}, //开始时间
            endTime: {type: "string"}, //截止日期
            amount: {type: "string"}, //金额
            // preType: {type: "string"}, //前置条件类型
            status: {type: "string", required: false},
            ruleProInfoDetails: {
                type: "child",
                meta: {
                    id: {type: "string"}, //idp
                    proSkuId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["productInfo"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //商品主键
                    proSkuName: {type: "string"},
                    proSkuCode: {type: "string"},

                    proSpuId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["product"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1"}',
                    }, //产品主键
                    proSpuName: {type: "string"},
                    proSpuCode: {type: "string"},
                    proCataId: {
                        type: "string",
                        refmodel: JSON.stringify(refinfo["productCategory"]),
                        refcfg: '{"ctx":"/uitemplate_web"}',
                        refparam: '{"EQ_isEnable":"1"}'
                    }, //分类主键
                    proCataName: {type: "string"},
                    proCataCode: {type: "string"},
                    num: {type: "string"}
                }
            }
        }
    };
    //前置条件-子表商品
    window.PreconditionChildItem = {
        meta: {
            proSkuId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goods-no-version"]),
                refcfg: '{"ctx":"/uitemplate_web"}',
                refparam: '{"EQ_isEnable":"1"}'
            }, //商品主键
            proSkuName: {type: "string"},
            proSkuCode: {type: "string"},
            //基本单位
            basicUnitCode: {type: "string"},
            //基本单位
            basicUnitName: {type: "string"},
            proSpuId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["product"]),
                refcfg: '{"ctx":"/uitemplate_web"}',
                // refparam: '{"EQ_isEnable":"1"}',
                refparam: '{"EQ_isEnable":"1"}'
            }, //产品主键
            proSpuName: {type: "string"},
            proSpuCode: {type: "string"},
            proCataId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goodsCategory"]),
                refcfg: '{"ctx":"/uitemplate_web"}',
                refparam: '{"EQ_isEnable":"1"}'
            }, //分类主键
            proCataName: {type: "string"},
            proCataCode: {type: "string"},
            num: {type: "string", required: true}
        }
    };
    // 赠品累计限制
    window.GiftsLimitItem = {
        meta: {
            giftId: {
                type: "string"
            },
            giftCode: {
                type: "string"
            },
            giftName: {
                type: "string"
            },
            giftType: {
                type: "string"
            },
            num: {
                type: "string"
            }
        }
    };

    //促销方式-减价类型begin

    var priceChildmeta = {
        meta: {
            id: {type: "string"}, //idp

            higherLimit: {type: "integer", required: true}, //上限
            lowerLimit: {type: "string", required: true}, //下限
            discount: {type: "string", required: true}, //折扣率
            price: {type: "string", required: true}, //价格
            fullcut: {type: "string", required: true} //满减
        }
    };
    window.priceItem = {
        params: {
            cls: "com.yonyou.occ.prom.service.dto.ActivityPriceDto"
        },
        meta: {
            id: {type: "string"}, //idp
            proId: {type: "string", required: true}, //商品/产品/商品分类/组合商品的主键
            proType: {type: "integer", required: true}, //主键类型
            showCode: {type: "string", required: true}, //显示编码
            showName: {type: "string", required: true}, //显示名称
            totalDiscount: {type: "string", required: true}, //累计优惠
            theSelected: {type: "integer"}, // 是否组合筛选
            ruleStandard: {type: "string"}, // 规则基准
            promProductRange: {
                type: "child",
                meta: {
                    id:{type: "string"}, //id
                    goodsScopeType:{type: "string"},//货物类型  即产品/商品/分类等
                    goodsId:{type:"string"},
                    goodsCode:{type:"string"},
                    goodsName:{type:"string"},
                    exclud:{type:"string"}
                }

            },
            dr: {type: "integer"},
            conditionInfos: {
                type: "child",
                meta: priceChildmeta.meta
            }
        },
        pageSize: 10
    };
    var priceOrderChildmeta = {
        meta: {
            id: {type: "string"}, //idp
            higherLimit: {type: "integer", required: true}, //上限
            lowerLimit: {type: "string", required: true}, //下限
            discount: {type: "string", required: true}, //折扣率
            fullcut: {type: "string", required: true}, //满减
            dr: {type: "integer"}
        }
    };
    window.orderStandDepreciateMeta = {
        params: {
            cls: "com.yonyou.occ.prom.service.dto.ActivityPriceDto"
        },
        meta: {
            totalDiscount: {type: "string", required: true}, //累计优惠
            conditionInfos: {
                type: "child",
                meta: priceOrderChildmeta.meta
            }
        },
        pageSize: 10
    };

    window.ItemRef = {
        meta: {
            productref: {
                type: "string",
                // "refmodel": JSON.stringify(refinfo['productInfo']),
                refmodel: JSON.stringify(refinfo["utils"]),
                refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
                // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
            }
        }
    };

    window.ProRangeMeta = {
        params: {
            cls: "com.yonyou.occ.prom.service.dto.ProdScopeDto"
        },
        meta: {
            id: {type: "string"}, //idp
            proSkuId: {
                type: "string",
                required: true,
                refmodel: JSON.stringify(refinfo["goods-no-version"]),
                refcfg: '{"ctx":"/uitemplate_web","isReturnCode":true}',
                refparam: '{"EQ_isEnable":"1"}'
            }, //商品主键
            proSkuCode: {type: "string", required: true}, //商品主键
            proSkuName: {type: "string", required: true}, //商品主键
            proSpuId: {
                type: "string",
                required: true,
                refmodel: JSON.stringify(refinfo["product"]),
                refcfg: '{"ctx":"/uitemplate_web"}',
                refparam: '{"EQ_isEnable":"1"}'
            }, //产品主键
            proSpuName: {type: "string", required: true}, //产品名称
            proSpuCode: {type: "string", required: true}, //产品名称
            //商品分类
            proCateId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goodsCategory"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refname":"proCateName","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1"}'
            },
            proCateName: {type: "string", required: true}, //商品分类名称
            proCateCode: {type: "string", required: true}, //商品分类名称
            isExclude: {type: "redio", required: true}, //是否包含

            status: {type: "string", required: false}, //显示名称

            dr: {type: "integer"}
        },
        pageSize: 10
    };

    // 赠品累计限制
    window.chooseProductItem = {
        meta: {
            proSkuId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goods-no-version"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}',
            },
            proSpuId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["product"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            proCombineId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["Combination"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            proCateId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goodsCategory"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            brandId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["brand"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            saleSeriesId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["productSaleSeries"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            productLineId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["productLine"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            proSkuCode: {
                type: "string"
            },
            proSpuCode: {
                type: "string"
            },
            proCombineCode: {
                type: "string"
            },
            proCateCode: {
                type: "string"
            },
            proSkuName: {
                type: "string"
            },
            proSpuName: {
                type: "string"
            },
            proCombineName: {
                type: "string"
            },
            proCateName: {
                type: "string"
            },
            brandCode: {
                type: "string"
            },
            brandName: {
                type: "string"
            },
            saleSeriesCode: {
                type: "string"
            },
            saleSeriesName: {
                type: "string"
            },
            productLineCode: {
                type: "string"
            },
            productLineName: {
                type: "string"
            },

            theSelected: {
                type: "string",
            },


            withProSkuId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goods-no-version"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}',
            },
            withProSpuId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["product"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            withProCombineId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["Combination"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            withProCateId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["goodsCategory"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            withBrandId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["brand"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            withSaleSeriesId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["productSaleSeries"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            withProductLineId: {
                type: "string",
                refmodel: JSON.stringify(refinfo["productLine"]),
                refcfg:
                    '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
                refparam: '{"EQ_isEnable":"1","AUTH_refcod":"promotionrules"}'
            },
            withProSkuCode: {
                type: "string"
            },
            withProSpuCode: {
                type: "string"
            },
            withProCombineCode: {
                type: "string"
            },
            withProCateCode: {
                type: "string"
            },
            withProSkuName: {
                type: "string"
            },
            withProSpuName: {
                type: "string"
            },
            withProCombineName: {
                type: "string"
            },
            withProCateName: {
                type: "string"
            },
            withBrandCode: {
                type: "string"
            },
            withBrandName: {
                type: "string"
            },
            withSaleSeriesCode: {
                type: "string"
            },
            withSaleSeriesName: {
                type: "string"
            },
            withProductLineCode: {
                type: "string"
            },
            withProductLineName: {
                type: "string"
            },
        }
    };
    //促销方式-减价类型end
});
