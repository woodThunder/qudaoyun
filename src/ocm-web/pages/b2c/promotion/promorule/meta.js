define(["ocm_global"], function() {
    window.promorulemeta = {
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

            //          promotionId: { type: 'string' },//促销活动主键
            //          fromRuleId: { type: 'string' },//引用规则主键
            //          priority: { type: 'integer' },//优先级
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
                default: '0'
            }, //是否启用
            beginTime: {
                type: 'string',
            }, //开始时间
            endTime: {
                type: 'string',
            }, //结束时间
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
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
                required: true
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
                type: 'float',
                required: true
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
    //时间范围
    window.promRuleTimeRanges = {
        meta: {
            beginTime: {
                type: 'string',
                required: true
            },
            endTime: {
                type: 'string',
                required: true
            }
        },
        pageSize: 10,
    }

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
    }

    // 产品编码参照3
    window.productRef3 = {
        meta: {
            productRefer3: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
//              'refparam': '{"EQ_pkEcGoodsCategory":"0","EQ_isSale":"1"}',
            }
        }
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
    }

    // 商品参照
    window.goodsmeta = {
        meta: {
            id: {
                type: 'string'
            },
            code: {
                type: 'string'
            },
            name: {
                type: 'string'
            },
        }
    }

})