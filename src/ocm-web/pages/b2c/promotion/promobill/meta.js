define(["ocm_global"], function() {
    window.promotionMeta = {
        meta: {
            id: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            creationTime: {
                type: 'string'
            },
            modifier: {
                type: 'string'
            },
            modifiedTime: {
                type: 'datetime'
            },
            persistStatus: {
                type: 'string'
            },
            isRejected: {
                type: 'integer'
            },
            code: {
                type: 'string',
                required: true
            }, //促销活动号
            activityId: {
                type: "string",
                required: true,
                "refmodel": JSON.stringify(refinfo['b2cPromotionRef']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择","isReturnCode":true}'
            }, //活动ID
            activityCode: {
                type: 'string',
                required: true
            }, //活动编码
            activityName: {
                type: 'string',
                required: true
            }, //活动名称
            theme: {
                type: 'string',
                required: true
            }, //活动主题
            beginTimeTemp: {
                type: 'string',
                required: true,
            },
            beginTime: {
                type: 'string',
                required: true
            }, //开始时间
            endTime: {
                type: 'string',
                required: true
            }, //结束时间
            timeType: {
                type: 'string',
                required: true
            }, //促销时间类型
            isMutex: {
                type: 'integer',
                default: '0'
            }, //规则互斥
            type: {
                type: 'string'
            }, //促销类型
            isEnable: {
                type: 'integer',
                default: '0'
            }, //是否启用
            tembeginTime: {
                type: 'datetime',
            }, //开始时间
            temendTime: {
                type: 'datetime',
            }, //结束时间
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }
    window.promorulemeta = {
        meta: {
            id: {
                type: 'string'
            },
            ruleId: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            creationTime: {
                type: 'string'
            },
            modifier: {
                type: 'string'
            },
            modifiedTime: {
                type: 'datetime'
            },
            persistStatus: {
                type: 'string'
            },
            promotionId: {
                type: 'string'
            }, //促销活动主键
            fromRuleId: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['b2cPromotionRuleRef']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            }, //引用规则主键
            fromRuleName: {
                type: "string"
            },
            fromRuleCode: {
                type: "string"
            },
            priority: {
                type: 'integer'
            }, //优先级
            code: {
                type: 'string',
                required: true
            }, //规则编码
            name: {
                type: 'string',
                required: true
            }, //规则名称
            condition: {
                type: 'string',
                required: true
            }, //促销条件
            isProgressive: {
                type: 'integer'
            }, //递增
            //          orderType: { type: 'string' },//排序类型
            isForAll: {
                type: 'integer',
                required: true
            }, //是否适用全部商品
            isEnable: {
                type: 'integer',
                default: 1
            }, //是否启用
            ruleRefer: {
                type: "string",
                "refmodel": JSON.stringify(refinfo['b2cPromotionRuleRef']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            }, //规则参照
            // promRules: {
            //     type: 'child',
            //     meta: {

            //     }
            // },
            // promStoreSelects:{
            //     type:'child',
            //     meta:{

            //     }
            // }
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }
    //时间范围
    window.promRuleTimeRanges = {
        meta: {
            beginTime: {
                type: 'string'
            },
            endTime: {
                type: 'string'
            },
        },
        pageSize: 10,
    }
    window.promoruleitemmeta = {
        meta: {
            id: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            creationTime: {
                type: 'string'
            },
            modifier: {
                type: 'string'
            },
            modifiedTime: {
                type: 'datetime'
            },
            persistStatus: {
                type: 'string'
            },

            ruleId: {
                type: 'string',
                required: true,
                // "refmodel": JSON.stringify(refinfo['b2cPromotionRuleRef']),
                // "refcfg": '{"ctx":"/uitemplate_web","refName":"促销规则"}'
            }, //促销规则主键
            amountLowerLimit: {
                type: 'float'
            }, //满赠金额下限
            amountUpperLimit: {
                type: 'float'
            }, //满赠金额上限
            amountBase: {
                type: 'float'
            }, //满赠金额基数
            numberLowerLimit: {
                type: 'float'
            }, //买送数量下限
            numberUpperLimit: {
                type: 'float'
            }, //买送数量上限
            numberBase: {
                type: 'float'
            }, //买送数量基数
            topLowerLimit: {
                type: 'float'
            }, //排名TOP值下限
            topUpperLimit: {
                type: 'float'
            }, //排名TOP值上限
            giftCount: {
                type: 'float'
            }, //赠品数量
            giftId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true}',
//              'refparam': '{"EQ_pkEcGoodsCategory":"0","EQ_isSale":"1"}',
            }, //赠品ID
            giftCode: {
                type: 'string'
            }, //赠品编码
            giftName: {
                type: 'string'
            }, //赠品名称
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }
    window.promRuleTimeRangeMeta = {
        meta: {
            id: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            creationTime: {
                type: 'string'
            },
            modifier: {
                type: 'string'
            },
            modifiedTime: {
                type: 'datetime'
            },
            persistStatus: {
                type: 'string'
            },

            ruleId: {
                type: 'string',
                required: true
            }, //促销规则主键
            beginTime: {
                type: 'string'
            }, //开始时间
            endTime: {
                type: 'string'
            }, //结束时间
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }
    // 产品编码参照4
    window.productRef4 = {
        meta: {
            productRefer4: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
//              'refparam': '{"EQ_pkEcGoodsCategory":"0","EQ_isSale":"1"}',
            }
        }
    };
    // 产品编码参照2
    window.productRef2 = {
        meta: {
            productRefer2: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
//              'refparam': '{"EQ_pkEcGoodsCategory":"0","EQ_isSale":"1"}',
            }
        }
    };
    window.promRuleGoodsExcludeMeta = {
        meta: {
            id: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            creationTime: {
                type: 'string'
            },
            modifier: {
                type: 'string'
            },
            modifiedTime: {
                type: 'datetime'
            },
            persistStatus: {
                type: 'string'
            },

            ruleId: {
                type: 'string',
                required: true
            }, //促销规则主键
            goodsId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true}',
//              'refparam': '{"EQ_pkEcGoodsCategory":"0","EQ_isSale":"1"}',
            }, //商品ID
            goodsCode: {
                type: 'string'
            }, //商品编码
            goodsName: {
                type: 'string'
            }, //商品名称
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }
    window.promRuleGoodsIncludeMeta = {
        meta: {
            id: {
                type: 'string'
            },
            creator: {
                type: 'string'
            },
            creationTime: {
                type: 'string'
            },
            modifier: {
                type: 'string'
            },
            modifiedTime: {
                type: 'datetime'
            },
            persistStatus: {
                type: 'string'
            },

            ruleId: {
                type: 'string',
                required: true
            }, //促销规则主键
            goodsId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true}',
//              'refparam': '{"EQ_pkEcGoodsCategory":"0","EQ_isSale":"1"}',
            }, //商品ID
            goodsCode: {
                type: 'string'
            }, //商品编码
            goodsName: {
                type: 'string'
            }, //商品名称
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }
    // 平台店铺参照
    window.platItem = {
        meta: {
            storeId: {
                type: 'string'
            },
            platformName: {
                type: 'string',
            }, //平台名称
            storeName: {
                type: 'string',
            }, //店铺名称
            persistStatus: {
                type: 'string'
            }
        }
    };
    window.ItemRef = {
        meta: {
            b2cStoreRef: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            }
        }
    };
    // 平台店铺参照
    window.platformstoremeta = {
        meta: {
            id: {
                type: "string"
            },
            promId: {
                type: 'string'
            }, //促销活动主键
            platformId: {
                type: "string",
                required: true,
                // "refmodel": JSON.stringify(refinfo['b2cplatform']),
                // "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            },
            platformCode: {
                type: "string",
                required: true,
                // "refmodel": JSON.stringify(refinfo['b2cplatform']),
                // "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            }, //所属平台ID
            platformName: {
                type: 'string'
            }, //平台名称
            storeId: {
                type: "string",
                required: true,
                // "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                // "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            }, //店铺ID
            storeCode: {
                type: 'string'
            }, //店铺编码
            storeName: {
                type: 'string'
            }, //店铺名称
            persistStatus: {
                type: 'string'
            }
        }
    }

})