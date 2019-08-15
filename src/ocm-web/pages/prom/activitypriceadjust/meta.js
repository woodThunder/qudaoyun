define(["ocm_global"], function() {
    // 批发活动价调价单
    window.ActivityPriceAdjust = {
            meta: {
                id: { type: 'string' }, //id
                code: { type: 'string' }, //code
                name: { type: 'string', required: true }, //name
                promoActivityId: {
                    type: 'string',
                    required: true,
                    "refmodel": JSON.stringify(refinfo['promactivity']),
                    "refcfg": '{"ctx":"/uitemplate_web","refCode":"","isReturnCode":true}',
                    'refparam': '{"IN_approveStatus":"1","EQ_activeType.isPrice":"1","EQ_enableStatus":"1"}'
                }, //活动id
                promoActivityCode: { type: 'string' }, //活动code
                promoActivityName: { type: 'string' }, //活动name
                promoActivityOrderEndDate: { type: 'date' }, //活动订货截至日期
                promoActivityOrderStartDate: { type: 'date' }, //活动订货开始日期
                promoActivityDescription: { type: 'string' }, //活动描述
                saleEntity: { type: 'string', required: true }, //销售主体
                saleOrgId: {
                    type: 'string',
                    required: true,
                    "refmodel": JSON.stringify(refinfo['organization_price']),
                    "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    "refparam": '{"EQ_isSaleOrganization":"1","EQ_isEnable":"1"}'
                }, //销售组织id
                saleOrgName: { type: 'string' }, //销售组织name
                saleOrgCode: { type: 'string' }, //销售组织code
                floatRatioId: {
                    type: 'string',
                }, //上浮系数id
                floatRatioName: { type: 'string' }, //上浮系数name
                note: { type: 'string' }, //备注
                creator: { type: 'string' },
                creationTime: { type: 'datetime' },
                modifier: { type: 'string' },
                modifiedTime: { type: 'datetime' },
                auditor: { type: 'string' },
                auditTime: { type: 'datetime' },
                auditStatus: { type: 'string', default: "0" },
                excuteResult: { type: 'string' }, //执行结果
                effectiveDate: { type: 'date', required: true }, //调价生效日期
                state: { type: 'string', default: '0' },
            },
            pageSize: 20,
            //是否启用前端缓存
            // pageCache: true
        }
        // 批发活动价调价单-产品子表
    window.ActivityPriceAdjustItem = {
            meta: {
                id: { type: 'string' }, //idp
                activityPriceId: { type: 'string' }, //批发活动价id
                productShowCode: { type: 'string' },
                productShowName: { type: 'string' },
                productId: { type: 'string' }, // 产品id
                productCode: { type: 'string' }, // 产品code
                productName: { type: 'string' }, // 产品name
                productCombineId: { type: 'string' }, //产品组合id
                productCombineName: { type: 'string' }, //产品组合name
                productSaleSeries: { type: 'string' }, //产品销售系列id
                productSaleSeriesName: { type: 'string' }, //产品销售系列name
                channelCode: { type: 'string' }, //渠道类型code
                channelName: { type: 'string' }, //渠道类型name
                channelId: {
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['channeltype']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                }, //渠道类型id
                officeId: {
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['organization_ocm']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                    "refparam": '{"EQ_isOffice":"1"}'
                }, //办事处id
                officeCode: { type: 'string' }, //办事处code
                officeName: { type: 'string' }, //办事处name
                customerId: {
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['customer']),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                }, //客户id
                customerCode: { type: 'string' }, //客户code
                customerName: { type: 'string' }, //客户name
                price: { type: 'float' }, //价格
                enable_status: { type: 'string', default: 1 }, //启用状态
                note: { type: 'string' }, //备注
                isPackage: { type: 'string' }, //是否包件
                upperClass: { type: 'string' }, //上级
                dr: { type: 'integer' },
                agencypartitionId: { //办事处分区
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo["agencypartitiongrid"]),
                    "refcfg": '{"ctx":"/uitemplate_web"}',
                    "refparam": '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}',
                },
                agencypartitionCode: { type: 'string' },
                agencypartitionName: { type: 'string' },
                lowerDtos: {
                    type: 'child',
                    meta: {
                        id: { type: 'string' }, //idp
                        productShowCode: { type: 'string' },
                        productShowName: { type: 'string' },
                        num: { type: 'integer' }, //数量
                        price: { type: 'float' }, //价格
                        note: { type: 'string' }, //备注
                        isPackage: { type: 'string' }, //是否包件
                        upperClass: { type: 'string' }, //上级
                        lowerDtos: { type: 'string' }
                    }
                }
            },
            pageSize: 10,
        }
        // 产品参照
    window.ProductTabRef = {
            meta: {
                productref: {
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['promproducttab']),
                    "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
                }
            }
        }
        // 产品BOM价格明细
    window.BomPrice = {
            meta: {
                id: { type: 'string' }, //idp
                productShowCode: { type: 'string' },
                productShowName: { type: 'string' },
                num: { type: 'integer' }, //数量
                price: { type: 'float' }, //价格
                note: { type: 'string' }, //备注
                isPackage: { type: 'string' }, //是否包件
                upperClass: { type: 'string' }, //上级
            },
            pageSize: 10,
        }
        // 批量复制-组织参照
    window.CopyOrg = {
        meta: {
            copyorgref: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                "refparam": '{"EQ_isSaleOrganization":"1","EQ_orgFuncRel": "02","EQ_isEnable": "1","EQ_isOffice":"1"}'
            }
        }
    }
})