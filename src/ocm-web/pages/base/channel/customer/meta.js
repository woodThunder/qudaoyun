define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
            Customermeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.prom.service.dto.CustomerDto"
                },
                meta: {
                    //基本信息开始
                    id: {
                        type: 'string',
                        required: true
                    },
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    abbr: {
                        type: 'string'
                    }, //简称
                    remark: {
                        type: 'string'
                    }, //备注

                    //客户分类
                    customerCategoryId: {
                        type: 'string',
                        // required: true,
                        "refmodel": JSON.stringify(refinfo['customer-category']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"客户分类"}',
                        required: true
                    },
                    customerCategoryCode: {
                        type: 'string'
                    },
                    customerCategoryName: {
                        type: 'string'
                    },
                    //渠道类型
                    channelTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['channel-type']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"渠道类型"}'
                    },
                    channelTypeCode: {
                        type: 'string'
                    },
                    channelTypeName: {
                        type: 'string'
                    },
                    //是否内部组织
                    isInnerOrganization: {
                        type: 'Integer',
                        required: true
                    },
                    //内部组织
                    organizationId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    }, //内部组织ID
                    orgCode: {
                        type: 'string'
                    }, //内部组织编码
                    organizationName: {
                        type: 'string'
                    }, //所属组织名称
                    isChannelCustomer: {
                        type: 'string',
                        required: true,
                        default: '0'

                    }, //是否经销商

                    //客户来源
                    customerSourceCode: {
                        type: 'string',
                    },
                    customerSourceName: {
                        type: 'string'
                    },
                    //申请单编码
                    cusReqFormCode: {
                        type: 'string'
                    },
                    //客户级别
                    customerRankCode: {
                        type: 'string',
                        required: true
                    },
                    customerRankName: {
                        type: 'string'
                    },
                    marketAreaId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['market']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"市场区域"}'
                    }, //市场区域
                    marketAreaCode: {
                        type: 'string'
                    }, //市场区域
                    marketAreaName: {
                        type: 'string'
                    }, //市场区域
                    //证件类型
                    credentialsTypeId: {
                        type: 'string',
                        // "refmodel": JSON.stringify(refinfo['custdocdef']),
                        // "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY022","refName":"证件类型"}',
                        required: true
                    }, //证件类型
                    credentialsTypeCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY022","refName":"证件类型"}',
                        required: true
                    }, //证件类型
                    credentialsTypeName: {
                        type: 'string'
                    }, //证件类型
                    credentialsNo: {
                        type: 'string',
                        required: true
                    }, //证件号

                    legalPerson: {
                        type: 'string'
                    }, //法人代表
                    taxRegNo: {
                        type: 'string'
                    }, //税务登记证号                   
                    businessScope: {
                        type: 'string'
                    }, //经营范围   
                    //国家
                    countryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    }, //注册国别ID
                    countryName: {
                        type: 'string'
                    }, //注册国家名称
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    }, //注册所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //注册所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    }, //注册所在城市ID
                    cityName: {
                        type: 'string'
                    }, //注册所在城市名称
                    cityCode: {
                        type: 'string'
                    },
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    }, //注册所在区/县
                    countyName: {
                        type: 'string'
                    }, //注册所在区/县名称
                    countyCode: {
                        type: 'string'
                    },
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    }, //注册所在街道/镇
                    townName: {
                        type: 'string'
                    }, //注册所在街道/镇名称
                    townCode: {
                        type: 'string'
                    },
                    detailAddr: {
                        type: 'string',
                    }, //经销商地址
                    postalCode: {
                        type: 'string',
                    }, //邮编
                    longitude: {
                        type: 'float'
                    }, //经度
                    latitude: {
                        type: 'float'
                    }, //纬度

                    bank: {
                        type: 'string'
                    }, //开户银行
                    bankAccount: {
                        type: 'string'
                    }, //银行账号
                    accountName: {
                        type: 'string'
                    }, //户名
                    //付款方客户
                    payerCustomerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    }, //付款方客户
                    payerCustomerName: {
                        type: 'string'
                    }, //付款方客户
                    payerCustomerCode: {
                        type: 'string'
                    },
					//上级客户
                    superiorCustomerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    }, //上级客户名称
                    superiorCustomerName: {
                        type: 'string'
                    }, //上级客户编码
                    superiorCustomerCode: {
                        type: 'string'
                    },
                    
                    // //是否冻结
                    isFrozen: {
                        type: 'Integer'
                    },
                    //启用状态
                    isEnable: {
                        type: 'Integer',
                        required: true,
                    },
                    //删除标记
                    dr: {
                        type: 'Integer'
                    },
                    //时间戳
                    ts: {
                        type: 'date'
                    },
                    state: {
                        type: "Integer"
                    }
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
            Contactmeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    }, //客户
                    customerCode: {
                        type: 'string'
                    }, //客户
                    customerName: {
                        type: 'string'
                    }, //客户
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    //类别
                    contactTypeId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY118","refName":"联系人类别"}'
                    },
                    contactTypeCode: {
                        type: 'string'
                    },
                    contactTypeName: {
                        type: 'string'
                    },
                    tel: {
                        type: 'string'
                    }, //电话
                    phone: {
                        type: 'string'
                    }, //手机
                    fax: {
                        type: 'string'
                    }, //传真
                    address: {
                        type: 'string'
                    }, //地址
                    email: {
                        type: 'string'
                    }, //邮箱
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
            CustomerAddressmeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.CustomerAddressDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    customerCode: {
                        type: 'string'
                    }, //客户
                    customerName: {
                        type: 'string'
                    }, //客户
                    code: {
                        type: 'string',
                        required: true
                    }, //编码
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    //国家
                    countryId: {
                        type: 'string',
                        // required: true,
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    }, //国别ID
                    countryName: {
                        type: 'string'
                    }, //国家名称
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    }, //所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    }, //所在城市ID
                    cityName: {
                        type: 'string'
                    }, //所在城市名称
                    cityCode: {
                        type: 'string'
                    },
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    }, //所在区/县
                    countyName: {
                        type: 'string'
                    }, //所在区/县名称
                    countyCode: {
                        type: 'string'
                    },
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    }, //所在街道/镇
                    townName: {
                        type: 'string'
                    }, //所在街道/镇名称
                    townCode: {
                        type: 'string'
                    },
                    detailAddr: {
                        type: 'string'
                    }, //详细地址
                    longitude: {
                        type: 'float'
                    }, //经度
                    latitude: {
                        type: 'float'
                    }, //纬度
                    fax: {
                        type: 'string'
                    }, //传真
                    standardLogisticPeriod: {
                        type: 'string'
                    }, //标准物流周期
                    firstReceiver: {
                        type: 'string'
                    }, //收货第一联系人姓名
                    firstReceiverTel: {
                        type: 'string'
                    }, //收货第一联系人电话
                    firstReceiverPhone: {
                        type: 'string'
                    }, //收货第一联系人手机
                    secondReceiver: {
                        type: 'string'
                    }, //收货第二联系人姓名
                    secondReceiverTel: {
                        type: 'string'
                    }, //收货第二联系人电话
                    secondReceiverPhone: {
                        type: 'string'
                    }, //收货第二联系人手机
                    thirdReceiver: {
                        type: 'string'
                    }, //收货第三联系人姓名
                    thirdReceiverTel: {
                        type: 'string'
                    }, //收货第三联系人电话
                    thirdReceiverPhone: {
                        type: 'string'
                    }, //收货第三联系人手机
                    isDefault: {
                        type: 'integer'
                    },//是否默认
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
            MarketConnectmeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.MarketConnectDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    code: {
                        type: 'string'
                    }, //编码
                    statusCode: {
                        type: 'string'
                    }, //状态
                    //客户
                    customerId: {
                        type: 'string'
                    },

                    //原业务账号ID
                    fromAccountId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['account']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"原业务账号"}'
                    },
                    fromAccountCode: {
                        type: 'string'
                    },
                    fromAccountName: {
                        type: 'string'
                    },

                    //现业务账号ID
                    toAccountId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['account']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"现业务账号"}'
                    },
                    toAccountCode: {
                        type: 'string'
                    },
                    toAccountName: {
                        type: 'string'
                    },

                    //新老业务账号关系
                    relationId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY066","refName":"新老业务账号关系"}'
                    },
                    relationCode: {
                        type: 'string'
                    },
                    relationName: {
                        type: 'string'
                    },

                    //售后问题负责帐号
                    afterServiceAccountCode: {
                        type: 'string'
                    },
                    afterServiceAccountId: {
                        type: 'string'
                    },
                    afterServiceAccountName: {
                        type: 'string'
                    },

                    //经销商交接证明图片url
                    picUrl: {
                        type: 'string'
                    },

                    //交接原因
                    reason: {
                        type: 'string'
                    },

                    //销量问题（是否将原商家的销量转到新商家户头上）
                    isTransferSales: {
                        type: 'integer'
                    },

                    //返利问题（交接后原商家的广告及各类返利返给）
                    rebateProblemCode: {
                        type: 'string'
                    },
                    rebateProblemId: {
                        type: 'string'
                    },
                    rebateProblemName: {
                        type: 'string'
                    },

                    //促销活动（新商家是否延续原商家参加的未完的活动及新品活动）
                    isContinuePromotion: {
                        type: 'integer'
                    },

                    //经营保证金（原商家是否将经营保证金转给新商家）
                    isTransferDeposit: {
                        type: 'integer'
                    },

                    //余款处理（原商家是否将原账户的余款（包含其他类保证金）转给新商家）
                    isTransferBalance: {
                        type: 'integer'
                    },

                    //其他事宜
                    otherThings: {
                        type: 'string'
                    },
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
            Partnermeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.PartnerDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    }, //名称
                    tel: {
                        type: 'string'
                    }, //电话
                    status: {
                        type: 'integer'
                    },
                    credentialNo: {
                        type: 'string'
                    }, //身份证号
                    customerId: {
                        type: 'string'
                    },
                    customerName: {
                        type: 'string'
                    },
                    customerCode: {
                        type: 'string'
                    },

                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
            custCredPicmeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.CustCredPicDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    customerId: {
                        type: 'string'
                    }, //客户ID
                    credentialTypeId: {
                        type: 'string'
                    }, //证件类型ID
                    credentialTypeCode: {
                        type: 'string'
                    },
                    credentialTypeName: {
                        type: 'string'
                    },
                    pictureUrl: {
                        type: 'string'
                    },
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },

            //客户变更记录
            CustomerAltermeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustomerAlterDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
                    //字段名
                    fieldName: {
                        type: 'string'
                    },
                    //客户
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"原业务账号"}'
                    },
                    customerCode: {
                        type: 'string'
                    },
                    customerName: {
                        type: 'string'
                    },
                    oldFieldValue: {
                        type: 'string'
                    }, //旧值
                    newFieldValue: {
                        type: 'string'
                    }, //新值
                    //变更来源
                    alterSourceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY107","refName":"变更来源"}'
                    },
                    alterSourceCode: {
                        type: 'string'
                    },
                    alterSourceName: {
                        type: 'string'
                    },
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
            //开票信息
            CustomerInvoicemeta: {
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    }, //客户
                    customerCode: {
                        type: 'string'
                    }, //客户
                    customerName: {
                        type: 'string'
                    }, //客户
                    //发票类型
                    invoiceTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY128"}',
                    },
                    invoiceTypeCode: {
                        type: 'string'
                    },
                    invoiceTypeName: {
                        type: 'string'
                    },
                    invoiceOrgName: {
                        type: 'string'
                    }, //开票单位名称
                    taxpayerNo: {
                        type: 'string'
                    }, //信用代码
                    address: {
                        type: 'string'
                    }, //公司地址
                    tel: {
                        type: 'string'
                    }, //联系电话
                    bank: {
                        type: 'string'
                    }, //开户银行
                    bankAccount: {
                        type: 'string'
                    }, //银行账户
                    isDefault: {
                        type: 'integer',
                        defaultvalue: 0,
                    }
                },
                pageSize: 10,
            },

            CustAttachmentMeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustomerAttachmentDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //主键
                    fileName: {
                        type: 'string'
                    }, //文件名称
                    fileSize: {
                        type: 'string'
                    }, //文件大小
                    creationTime: {
                        type: 'datetime'
                    }, //上传时间
                    fileUrl: {
                        type: 'string'
                    },
                    remark: {
                        type: 'string'
                    },
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },
                    persistStatus: {
                        type: 'string'
                    },
                    pageSize: 10,
                },
            },
            pictureCategoryRef: {
                meta: {
                    pictureCategory: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY045"}',
                        "refparam": '{"EQ_isEnable":"1"}'
                    } //图片类型
                }
            }
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "客户编码"
            },
            {
                type: "text",
                key: "name",
                label: "客户名称"
            },
            {
                type: "text",
                key: "abbr",
                label: "客户简称"
            },
            {
                type: "refer",
                key: "customerCategoryId",
                label: "客户分类",
                refinfo: "customer-category",
                refName: "客户分类"
            },
            {
                type: "refer",
                key: "channelTypeId",
                label: "渠道类型",
                refinfo: "channel-type",
                refName: "渠道类型"
            },
            {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未启用' },
                    { value: '1', name: '已启用' },
                    { value: '2', name: '已停用' }
                ]
            }

            ]
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit",
                auth: true
            },
            {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del",
                auth: true
            },
            {
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable",
                auth: true
            },
            {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable",
                auth: true
            }
            ],
            button2: [{
                key: "return",
                label: "返回",
                cls: "ui-btn-green",
                click: "backPanel"
            }],
            button3: [{
                key: "save",
                label: "保存",
                click: "saveHandle",
                iconCls: "icon-tubiao-baocun"
            },
            {
                key: "cancel",
                label: "取消",
                click: "cancelHandle",
                iconCls: "icon-tubiao-guanbi-anxing"
            }
            ],
            button4: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                cls: "ui-btn-orange",
                clickArg: "ContactList",
                iconCls: "icon-plus"
            },
            {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "ContactList",
                iconCls: "icon-shanchu1"
            },
            {
                key: "save",
                label: "保存",
                click: "saveContact",
                iconCls: "icon-tubiao-baocun"
            },
            {
                key: "cancel",
                label: "取消",
                click: "cancelContact",
                iconCls: "icon-tubiao-guanbi-anxing"
            }
            ],
            button5: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                clickArg: "CustomerAddressList",
                cls: "ui-btn-orange",
                iconCls: "icon-plus"
            },
            {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "CustomerAddressList",
                iconCls: "icon-shanchu1"
            },
            {
                key: "save",
                label: "保存",
                click: "saveAddress",
                iconCls: "icon-tubiao-baocun"
            },
            {
                key: "cancel",
                label: "取消",
                click: "cancelAddress",
                iconCls: "icon-tubiao-guanbi-anxing"
            }
            ],
            button6: [{
                key: "cancel",
                label: "返回",
                click: "cancelHandle",
                cls: "ui-btn-primary"
            }, {
                key: "edit",
                label: "编辑",
                click: "beforeEdit",
                cls: "ui-btn-green"
            },],
            button7: [{
                key: "return",
                label: "返回",
                click: "retListPanel",
                cls: "ui-btn-green"
            }],
            button8: [{
                key: "showfile",
                label: "上传图片",
                iconCls: "icon-tubiao-shangchuan",
                click: "showFileDialog"
            },
            {
                key: "delpic",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "delPic"
            }
            ],
            button9: [{
                key: "onupload",
                label: "上传",
                iconCls: "icon-tubiao-shangchuan",
                click: "onOpenUploadWinCustomer"
            },
            {
                key: "filedel",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "fileDeleteCustomer"
            },
            {
                key: "fileview",
                label: "查看",
                iconCls: "icon-tubiao-chakan",
                click: "fileViewCustomer"
            },
            {
                key: "saveFile",
                label: "保存",
                iconCls: "icon-tubiao-baocun",
                click: "saveFile"
            }
            ],
            button10: [{
                key: "pre",
                label: "上一张",
                click: "prev"
            },
            {
                key: "next",
                label: "下一张",
                click: "next"
            }
            ],
            button11: [{
                key: "addrow",
                label: "增行",
                click: "addRow",
                clickArg: "CustomerInvoiceList",
                cls: "ui-btn-orange",
                iconCls: "icon-plus"
            },
            {
                key: "delrow",
                label: "删行",
                click: "delChild",
                clickArg: "CustomerInvoiceList",
                iconCls: "icon-shanchu1"
            },
            {
                key: "saveInvoice",
                label: "保存",
                click: "saveInvoice",
                iconCls: "icon-tubiao-baocun"
            },
            {
                key: "cancelInvoice",
                label: "取消",
                click: "cancelInvoice",
                iconCls: "icon-tubiao-guanbi-anxing"
            }
            ],
        },
        buttonmenus: {
            buttonmenu1: [{
                key: "import",
                label: "导入",
                iconCls: "icon-import",
                auth: true,
                children: [{
                    key: "importHandle",
                    label: "导入主表信息",
                    click: "importHandle"
                },
                {
                    key: "importContact",
                    label: "导入客户联系人",
                    click: "importContact"
                },
                {
                    key: "importAddr",
                    label: "导入客户收货地址",
                    click: "importCustomerAddress"
                }
                ]
            },
            {
                key: "export",
                label: "导出",
                iconCls: "icon-export",
                children: [{
                    key: "exportHandle",
                    label: "导出主表信息",
                    click: "exportHandle"
                },
                {
                    key: "exportContact",
                    label: "导出客户联系人",
                    click: "exportContact"
                },
                {
                    key: "exportAddr",
                    label: "导出客户收货地址",
                    click: "exportCustomerAddress"
                }
                ]
            },
            ]
        },
        cards: {
            card1: [
                //     {
                //     type: "checkbox",
                //     key: "promtype",
                //     keyArray: [
                //         { key: 'isChannelCustomer', label: '经销商', labelCls: "product-choose" },
                //         { key: 'isOrganization', label: '组织', labelCls: "product-choose" },
                //     ],
                //     multi: true,
                //     label: "客户类型",
                //     checkedValue: 1,
                //     unCheckedValue: 0,
                //     enable: true
                // },
                {
                    type: "text",
                    key: "code",
                    label: "编码",
                    // enable: false,
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },
                {
                    type: "text",
                    key: "abbr",
                    label: "简称"
                },
                {
                    type: "text",
                    key: "remark",
                    label: "备注"
                },
                {
                    type: "refer",
                    key: "customerCategoryId",
                    label: "客户分类",
                    // referId: "oneCategoryId-input",
                    // enable: false
                },
                {
                    type: "combo",
                    key: "customerSourceCode",
                    label: "客户来源",
                    dataSource: "customerSourceSrc"
                },
                {
                    type: "text",
                    key: "cusReqFormCode",
                    label: "申请单编码"
                },
                {
                    type: "refer",
                    key: "channelTypeId",
                    label: "渠道类型",
                },
                // {
                //     type: "radio",
                //     key: "isInnerOrganization",
                //     label: "内部组织",
                //     dataSource: [{
                //         value: '1',
                //         name: '是'
                //     },
                //     {
                //         value: '0',
                //         name: '否'
                //     }
                //     ]
                // },
                {
                    type: "refer",
                    key: "organizationId",
                    compid: "innerorganizationIdBase",
                    label: "内部组织",
                    enable: false
                },
                {
                    //默认否
                    type: "radio",
                    key: "isChannelCustomer",
                    label: "经销商",
                    dataSource: "whetherSrc"
                },
                {
                    type: "combo",
                    key: "customerRankCode",
                    label: "客户级别",
                    dataSource: "customerRankSrc"
                },
                {
                    type: "refer",
                    key: "marketAreaId",
                    label: "市场区域",
                },
                {
                    type: "combo",
                    key: "credentialsTypeCode",
                    label: "证件类型",
                    dataSource: "credentialsTypeSrc"
                },
                {
                    type: "text",
                    key: "credentialsNo",
                    label: "证件号码"
                },
                {
                    type: "text",
                    key: "legalPerson",
                    label: "法人代表"
                },
                {
                    type: "text",
                    key: "taxRegNo",
                    label: "税务登记号"
                },
                {
                    type: "text",
                    key: "businessScope",
                    label: "经营范围"
                },
                
                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    compid: "countryIdBase"
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "所在省份",
                    compid: "provinceIdBase",
                    enable: false,
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    enable: false,
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    enable: false,
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "townIdinfo",
                    compid: "townIdBase",
                    enable: false,
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "detailAddr",
                    label: "详细地址",
                    required: true,
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "postalCode",
                    label: "邮编",
                    required: true,
                    // disableInEdit: true
                },


                {
                    type: "text",
                    key: "longitude",
                    label: "经度",
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "latitude",
                    label: "纬度",
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "bank",
                    label: "开户银行",
                    // disableInEdit: true
                },
                {
                    type: "text",
                    key: "bankAccount",
                    label: "银行账号",
                    // disableInEdit: true
                }, {
                    type: "text",
                    key: "accountName",
                    label: "户名",
                    // disableInEdit: true
                },
				{
                    type: "refer",
                    key: "superiorCustomerId",
                    label: "上级客户",
                },
                {
                    type: "refer",
                    key: "payerCustomerId",
                    label: "付款方客户",
                    // disableInEdit: true
                },
                {
                    type: "radio",
                    key: "isFrozen",
                    label: "冻结",
                    defaultvalue:"0",
                    dataSource: [{
                        value: '1',
                        name: '是'
                    },
                    {
                        value: '0',
                        name: '否'
                    }
                    ]
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: '0'
                }

            ],
            // card2: [{
            //     type: "refer",
            //     key: "parentId",
            //     label: "上级经销商",
            // },
            // {
            //     type: "combo",
            //     key: "marketTypeCode",
            //     label: "所辖市场级别",
            //     dataSource: "marketTypeSrc"
            // },
            // {
            //     type: "radio",
            //     key: "isOfflineChannelCustomer",
            //     label: "线下经销商",
            //     dataSource: "whetherSrc"
            // },
            // {
            //     type: "date",
            //     key: "cooperateStart",
            //     label: "合作起始时间",
            //     disabledDate: function (current) {
            //         var cooperateEnd = viewModel.CustomerList.getValue("cooperateEnd");
            //         if (cooperateEnd) {
            //             cooperateEnd = new Date(cooperateEnd).getTime();
            //             if (current) {
            //                 current = new Date(current.format("YYYY-MM-DD")).getTime();
            //             }
            //             return current && current > cooperateEnd;
            //         }
            //     }
            // },
            // {
            //     type: "date",
            //     key: "cooperateEnd",
            //     label: "合作终止时间",
            //     disabledDate: function (current) {
            //         var cooperateStart = viewModel.CustomerList.getValue("cooperateStart");
            //         if (cooperateStart) {
            //             cooperateStart = new Date(cooperateStart).getTime();
            //             if (current) {
            //                 current = new Date(current.format("YYYY-MM-DD")).getTime();
            //             }
            //             return current && current < cooperateStart;
            //         }
            //     }
            // },
            // {
            //     type: "radio",
            //     key: "isDeposit",
            //     label: "缴纳保证金",
            //     dataSource: "whetherSrc"
            // },
            // {
            //     type: "text",
            //     key: "deposit",
            //     label: "保证金缴纳金额(万元)",
            //     compid: "deposit",
            //     enable: false
            // },
            // {
            //     type: "date",
            //     key: "depositDate",
            //     label: "保证金缴纳日期"
            // },
            // {
            //     type: "combo",
            //     key: "managementTypeCode",
            //     label: "多业态经营类型",
            //     dataSource: "managementTypeSrc"
            // },
            // {
            //     type: "textarea",
            //     key: "managementTypeDesc",
            //     label: "多业态经营类型描述"
            // }
            // ],
            // card3: [{
            //     type: "refer",
            //     key: "corrOrganizationId",
            //     label: "组织"
            // }
            // ]
        },
        details: {
            detail1: [{
                key: "code",
                label: "客户编号"
            },
            {
                key: "name",
                label: "客户名称"
            },
            {
                key: "abbr",
                label: "简称"
            },
            {
                key: "remark",
                label: "备注"
            },

            {
                key: "customerCategoryName",
                label: "客户分类",
            },
            {
                key: "customerSourceName",
                label: "客户来源",
            },
            {
                key: "cusReqFormCode",
                label: "申请单编码",
            },
            {
                key: "channelTypeName",
                label: "客户类型",
            },

            // {
            //     key: "isInnerOrganization",
            //     label: "内部组织",
            //     computed: "isInnerOrganization"
            // },
            {
                key: "organizationName",
                label: "内部组织",
            },
            {
                key: "isChannelCustomer",
                label: "经销商",
                computed: "isChannelCustomer"
            },
            {
                key: "customerRankName",
                label: "客户级别",
            },
            {
                key: "marketAreaName",
                label: "市场区域"
            },
            {
                key: "credentialsTypeName",
                label: "证件类型",
            },
            {
                key: "credentialsNo",
                label: "证件号码",
            },

            {
                key: "legalPerson",
                label: "法人代表"
            },
            {
                key: "taxRegNo",
                label: "税务登记号"
            },
            {
                key: "businessScope",
                label: "经营范围"
            },
            {
                key: "countryName",
                label: "所在国家",
            },
            {
                key: "provinceName",
                label: "所在省份"
            },
            {
                key: "cityName",
                label: "所在城市"
            },
            {
                key: "countyName",
                label: "所在区/县"
            },
            {
                key: "townName",
                label: "所在街道/镇"
            },
            {
                key: "detailAddr",
                label: "详细地址"
            },
            {
                key: "postalCode",
                label: "邮编"
            },

            {
                key: "longitude",
                label: "经度"
            },
            {
                key: "latitude",
                label: "纬度"
            },
            {
                key: "bank",
                label: "开户银行"
            },
            {
                key: "bankAccount",
                label: "银行账号"
            },
            {
                key: "accountName",
                label: "户名"
            },
			{
                key: "superiorCustomerName",
                label: "上级客户"
            },
            {
                key: "payerCustomerName",
                label: "付款方客户"
            },
            {
                key: "isFrozen",
                label: "冻结",
                computed: "isFrozen"
            },
            {
                key: "isEnable",
                label: "启用状态",
                computed: "isEnable"
            }
            ],
        },
        grids: {
            grid1: {
                "domid": "buoyancyfactorlist",
                "umeta": {
                    "id": "grid_buoyancyfactorlist",
                    "data": "CustomerList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [{
                    "field": "code",
                    "dataType": "String",
                    "title": "编码",
                    "renderType": "detailRender"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "名称"
                }, {
                    "field": "abbr",
                    "dataType": "String",
                    "title": "简称",
                    "visible": "false"
                }, {
                    "field": "remark",
                    "dataType": "String",
                    "title": "备注",
                    "visible": "false"
                }, {
                    "field": "customerCategoryName",
                    "dataType": "String",
                    "title": "客户分类",
                }, {
                    "field": "customerSourceName",
                    "dataType": "String",
                    "title": "客户来源",
                }, {
                    "field": "cusReqFormCode",
                    "dataType": "String",
                    "title": "申请单编码",
                    "renderType": "reqFormRender"
                }, {
                    "field": "channelTypeName",
                    "dataType": "String",
                    "title": "渠道类型",
                    "visible": "false"
                }, {
                //     "field": "isInnerOrganization",
                //     "dataType": "integer",
                //     "title": "内部组织",
                //     "renderType": "isInnerOrganizationGrid",
                //     "visible": "false"
                // }, {
                    "field": "organizationName",
                    "dataType": "integer",
                    "title": "内部组织",
                    "visible": "false"
                }, {
                    //
                    "field": "isChannelCustomer",
                    "dataType": "integer",
                    "title": "经销商",
                    "renderType": "isChannelCustomerGrid",
                    "visible": "false"
                }, {

                    "field": "customerRankName",
                    "dataType": "String",
                    "title": "客户级别",
                    "visible": "false"
                }, {
                    "field": "marketAreaName",
                    "dataType": "String",
                    "title": "市场区域",
                }, {
                    "field": "credentialsTypeName",
                    "dataType": "String",
                    "title": "证件类型",
                    "visible": "false"
                }, {
                    "field": "credentialsNo",
                    "dataType": "String",
                    "title": "证件号码",
                    "visible": "false"
                }, {
                    "field": "legalPerson",
                    "dataType": "String",
                    "title": "法人代表",
                    "visible": "false"
                }, {

                    "field": "taxRegNo",
                    "dataType": "String",
                    "title": "税务登记号",
                    "visible": "false"
                },
                {

                    "field": "businessScope",
                    "dataType": "String",
                    "title": "经营范围",
                    "visible": "false"
                },  {
                    "field": "countryName",
                    "dataType": "String",
                    "title": "所在国家",
                    "visible": "false"
                }, {
                    "field": "provinceName",
                    "dataType": "String",
                    "title": "所在省份",
                    "visible": "false"
                }, {
                    "field": "countyName",
                    "dataType": "String",
                    "title": "所在区/县",
                    "visible": "false"
                }, {
                    "field": "townName",
                    "dataType": "String",
                    "title": "所在街道",
                    "visible": "false"
                }, {
                    "field": "detailAddr",
                    "dataType": "String",
                    "title": "详细地址",
                    "visible": "false"
                }, {
                    "field": "postalCode",
                    "dataType": "String",
                    "title": "邮编",
                    "visible": "false"
                }, {
                    "field": "longitude",
                    "dataType": "String",
                    "title": "经度",
                    "visible": "false"
                }, {
                    "field": "latitude",
                    "dataType": "String",
                    "title": "纬度",
                    "visible": "false"
                }, {
                    "field": "bank",
                    "dataType": "String",
                    "title": "开户银行",
                    "visible": "false"
                }, {
                    "field": "bankAccount",
                    "dataType": "String",
                    "title": "银行账号",
                    "visible": "false"
                }, {
                    "field": "acctountName",
                    "dataType": "String",
                    "title": "户名",
                    "visible": "false"
                }, {
                    "field": "superiorCustomerName",
                    "dataType": "String",
                    "title": "上级客户",
                    "visible": "false"
                }, {
                    "field": "payerCustomerName",
                    "dataType": "String",
                    "title": "付款方客户",
                    "visible": "false"
                }, {
                    "field": "isFrozen",
                    "dataType": "integer",
                    "title": "冻结",
                    "renderType": "isFrozenGrid",
                    "visible": "false"
                }, {
                    "field": "isEnable",
                    "dataType": "integer",
                    "title": "启用状态",
                    "renderType": "isEnableGrid"
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人",
                    "visible": "false"
                }, {
                    "field": "creationTime",
                    "dataType": "Datetime",
                    "title": "创建时间",
                    "visible": "false"
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人",
                    "visible": "false"
                },
                // {
                //     "field": "operationPic",
                //     "dataType": "String",
                //     "title": "图片维护",
                //     "renderType": "operationPic",
                //     "fixed": true,
                //     "width": "110px"
                // }, 
                {
                    "field": "modifiedTime",
                    "dataType": "Datetime",
                    "title": "修改时间",
                    "visible": "false"
                }, 
                // {
                //     "field": "operation",
                //     "dataType": "String",
                //     "title": "操作",
                //     "renderType": "operation",
                //     "fixed": true,
                //     "width": "160px"
                // }
                ]
            },
            grid2: {
                "domid": "grid_democomplexItem1_dom",
                "umeta": {
                    "id": "grid_Contact",
                    "data": "ContactList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "联系人编码",
                    required: true
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "联系人名称",
                    required: true
                },
                {
                    field: "contactTypeId",
                    dataType: "String",
                    title: "类别",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string"
                    },
                    "showField": "contactTypeName",
                    "required": true
                },
                {
                    field: "tel",
                    dataType: "String",
                    title: "电话",
                },
                {
                    field: "phone",
                    dataType: "String",
                    title: "手机",
                },
                {
                    field: "fax",
                    dataType: "String",
                    title: "传真",
                },
                {
                    field: "address",
                    dataType: "String",
                    title: "地址",
                },
                {
                    field: "email",
                    dataType: "String",
                    title: "邮箱",
                }
                ]
            },
            grid3: {
                "domid": "grid_democomplexItem2_dom",
                "umeta": {
                    "id": "grid_CustomerAddress",
                    "data": "CustomerAddressList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true,
                    "onBeforeEditFun": "areasCheck"
                },
                "columns": [{
                    "field": "code",
                    "dataType": "String",
                    "title": "收货地址编码",
                    "editable": "false"
                }, {
                    "field": "name",
                    "dataType": "String",
                    "title": "收货地址名称",
                    "required": true
                }, {
                    "field": "countryId",
                    "dataType": "String",
                    "title": "国别",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string"
                    },
                    "showField": "countryName",
                    "required": true
                }, {
                    "field": "provinceId",
                    "dataType": "String",
                    "title": "所在省份",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string",
                        "rel": {
                            "refname": "provinceName"
                        }
                    },
                    "showField": "provinceName",
                    "required": true
                }, {
                    "id": "cityAddress",
                    "field": "cityId",
                    "dataType": "String",
                    "title": "所在城市",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string",
                        "rel": {
                            "refname": "cityName"
                        }
                    },
                    "showField": "cityName",
                    "required": true
                }, {
                    "id": "countyAddress",
                    "field": "countyId",
                    "dataType": "String",
                    "title": "所在区/县",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string",
                        "rel": {
                            "refname": "countyName"
                        }
                    },
                    "showField": "countyName",
                    "required": true
                }, {
                    "id": "townAddress",
                    "field": "townId",
                    "dataType": "String",
                    "title": "所在街道/镇",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string",
                        "rel": {
                            "refname": "townName"
                        }
                    },
                    "showField": "townName"
                }, {
                    "field": "standardLogisticPeriod",
                    "dataType": "integer",
                    "title": "标准物流周期",
                }, {
                    "field": "detailAddr",
                    "dataType": "String",
                    "title": "详细地址",
                    "required": true
                }, {
                    "field": "fax",
                    "dataType": "String",
                    "title": "传真"
                }, {
                    "field": "longitude",
                    "dataType": "String",
                    "title": "经度"
                }, {
                    "field": "latitude",
                    "dataType": "String",
                    "title": "纬度"
                }, {
                    "field": "firstReceiver",
                    "dataType": "String",
                    "title": "收货第一联系人姓名",
                    "required": true,
                    "width": "220px"
                }, {
                    "field": "firstReceiverTel",
                    "dataType": "String",
                    "title": "收货第一联系人电话",
                    "width": "220px"
                }, {
                    "field": "firstReceiverPhone",
                    "dataType": "String",
                    "title": "收货第一联系人手机",
                    "required": true,
                    "width": "220px"
                }, {
                    "field": "secondReceiver",
                    "dataType": "String",
                    "title": "收货第二联系人姓名",
                    "width": "220px"
                }, {
                    "field": "secondReceiverTel",
                    "dataType": "String",
                    "title": "收货第二联系人电话",
                    "width": "220px"
                }, {
                    "field": "secondReceiverPhone",
                    "dataType": "String",
                    "title": "收货第二联系人手机",
                    "width": "220px"
                }, {
                    "field": "thirdReceiver",
                    "dataType": "String",
                    "title": "收货第三联系人姓名",
                    "width": "220px"
                }, {
                    "field": "thirdReceiverTel",
                    "dataType": "String",
                    "title": "收货第三联系人电话",
                    "width": "220px"
                }, {
                    "field": "thirdReceiverPhone",
                    "dataType": "String",
                    "title": "收货第三联系人手机",
                    "width": "220px"
                },
                {
                    "field": "isDefault",
                    "dataType": "integer",
                    "title": "是否默认",
                    "width": "220px",
                    "editOptions": {
                        "id": "isDefaultCA",
                        "type": "combo",
                        "datasource": "whetherSource",
                    },
                    "editType": "combo",
                    "renderType": "isDefaultCA"
                }
                ]
            },
            grid4: {
                "domid": "grid_democomplexItem3_dom",
                "umeta": {
                    "id": "grid_Contact_detail",
                    "data": "ContactList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": true
                },
                "columns": [{
                    field: "code",
                    dataType: "String",
                    title: "联系人编码",
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "联系人名称",
                },
                {
                    field: "contactTypeName",
                    dataType: "String",
                    title: "类别",
                },
                {
                    field: "tel",
                    dataType: "String",
                    title: "电话",
                },
                {
                    field: "phone",
                    dataType: "String",
                    title: "手机",
                },
                {
                    field: "fax",
                    dataType: "String",
                    title: "传真",
                },
                {
                    field: "address",
                    dataType: "String",
                    title: "地址",
                },
                {
                    field: "email",
                    dataType: "String",
                    title: "邮箱",
                }, {
                    "field": "creator",
                    "dataType": "String",
                    "title": "创建人",
                    "visible": false
                }, {
                    "field": "modifier",
                    "dataType": "String",
                    "title": "修改人",
                    "visible": false
                }, {
                    "field": "creationTime",
                    "dataType": "Date",
                    "title": "创建时间",
                    "visible": false
                }, {
                    "field": "modifiedTime",
                    "dataType": "Date",
                    "title": "修改时间",
                    "visible": false
                }
                ]
            },
            grid5: {
                "domid": "grid_1521531161903_dom",
                "umeta": {
                    "id": "grid_CustomerAddress_detail",
                    "data": "CustomerAddressList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": true
                },
                "columns": [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "收货地址编码",
                        "editable": "false"
                    }, {
                        "field": "name",
                        "dataType": "String",
                        "title": "收货地址名称",
                    }, {
                        "field": "countryName",
                        "dataType": "String",
                        "title": "国别"
                    }, {
                        "field": "provinceName",
                        "dataType": "String",
                        "title": "所在省份",
                    }, {
                        "field": "cityName",
                        "dataType": "String",
                        "title": "所在城市",
                    }, {
                        "field": "countyName",
                        "dataType": "String",
                        "title": "所在区/县",
                    }, {
                        "field": "townName",
                        "dataType": "String",
                        "title": "所在街道/镇",
                    }, {
                        "field": "standardLogisticPeriod",
                        "dataType": "integer",
                        "title": "标准物流周期",
                    }, {
                        "field": "detailAddr",
                        "dataType": "String",
                        "title": "详细地址",
                    }, {
                        "field": "fax",
                        "dataType": "String",
                        "title": "传真"
                    }, {
                        "field": "longitude",
                        "dataType": "String",
                        "title": "经度"
                    }, {
                        "field": "latitude",
                        "dataType": "String",
                        "title": "纬度"
                    }, {
                        "field": "firstReceiver",
                        "dataType": "String",
                        "title": "收货第一联系人姓名",
                        "width": "220px"
                    }, {
                        "field": "firstReceiverTel",
                        "dataType": "String",
                        "title": "收货第一联系人电话",
                        "width": "220px"
                    }, {
                        "field": "firstReceiverPhone",
                        "dataType": "String",
                        "title": "收货第一联系人手机",
                        "width": "220px"
                    }, {
                        "field": "secondReceiver",
                        "dataType": "String",
                        "title": "收货第二联系人姓名",
                        "width": "220px"
                    }, {
                        "field": "secondReceiverTel",
                        "dataType": "String",
                        "title": "收货第二联系人电话",
                        "width": "220px"
                    }, {
                        "field": "secondReceiverPhone",
                        "dataType": "String",
                        "title": "收货第二联系人手机",
                        "width": "220px"
                    }, {
                        "field": "thirdReceiver",
                        "dataType": "String",
                        "title": "收货第三联系人姓名",
                        "width": "220px"
                    }, {
                        "field": "thirdReceiverTel",
                        "dataType": "String",
                        "title": "收货第三联系人电话",
                        "width": "220px"
                    }, {
                        "field": "thirdReceiverPhone",
                        "dataType": "String",
                        "title": "收货第三联系人手机",
                        "width": "220px"
                    }, {
                        "field": "isDefault",
                        "dataType": "integer",
                        "title": "是否默认",
                        "width": "220px",
                        "renderType": "isDefaultCA",
                    }]
            },
            grid6: {
                "domid": "grid_1521531260564_dom",
                "umeta": {
                    "id": "grid_custCredPic",
                    "data": "custCredPicList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [{
                    "field": "pictureUrl",
                    "dataType": "String",
                    "title": "图片预览",
                    "renderType": "picShow"
                }, {
                    "field": "credentialTypeName",
                    "dataType": "String",
                    "title": "图片类型"
                }]
            },
            //grid7: {
            //    "domid": "grid_1521531318054_dom",
            //    "umeta": {
            //        "id": "grid_attach",
            //        "data": "FileList",
            //        "type": "grid",
            //        "editable": false,
            //        "multiSelect": true,
            //        "showNumCol": true,
            //        "columnMenu": false
            //    },
            //    "columns": [{
            //        "field": "filename",
            //        "dataType": "String",
            //        "title": "文件名称"
            //    }, {
            //        "field": "filesize",
            //        "dataType": "String",
            //        "title": "文件大小"
            //    }, {
            //        "field": "uploadtime",
            //        "dataType": "Datetime",
            //        "title": "上传时间"
            //    }]
            //},
            grid8: {
                "domid": "grid_customer_alter_dom",
                "umeta": {
                    "id": "grid_alter",
                    "data": "AlterList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true,
                    "columnMenu": false
                },
                "columns": [{
                    //     "field": "customerName",
                    //     "dataType": "String",
                    //     "title": "客户"
                    // },{
                    "field": "fieldName",
                    "dataType": "String",
                    "title": "字段名称"
                }, {
                    "field": "oldFieldValue",
                    "dataType": "String",
                    "title": "原值"
                }, {
                    "field": "newFieldValue",
                    "dataType": "String",
                    "title": "新值"
                },
                {
                    "field": "alterSourceName",
                    "dataType": "refer",
                    "title": "变更来源"
                }
                ]
            },
            grid9: {
                domid: "grid_CustomerInvoiceList_dom",
                umeta: {
                    id: "grid_CustomerInvoiceList",
                    data: "CustomerInvoiceList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "invoiceTypeCode",
                        dataType: "String",
                        title: "发票类型",
                        "editOptions": {
                            "id": "invoiceType",
                            "type": "combo",
                            "datasource": "invoiceTypeSrc"
                        },
                        "editType": "combo",
                        "renderType": "comboRender",
                        required: true
                    },
                    {
                        field: "invoiceOrgName",
                        dataType: "String",
                        title: "开票单位名称",
                        required: true
                    },
                    {
                        field: "taxpayerNo",
                        dataType: "String",
                        title: "信用代码",
                        required: true
                    },
                    {
                        field: "address",
                        dataType: "String",
                        title: "公司地址",
                        required: true
                    },
                    {
                        field: "tel",
                        dataType: "String",
                        title: "联系电话",
                        required: true
                    },
                    {
                        field: "bank",
                        dataType: "String",
                        title: "开户银行",
                        required: true
                    },
                    {
                        field: "bankAccount",
                        dataType: "String",
                        title: "银行账户",
                        required: true
                    },
                    {
                        field: "isDefault",
                        dataType: "integer",
                        title: "是否默认",
                        width: "220px",
                        editOptions: {
                            id: "isDefaultCI",
                            type: "combo",
                            datasource: "whetherSource"
                        },
                        editType: "combo",
                        renderType: "isDefaultCI"
                    }
                ]
            },
            grid10: {
                domid: "grid_CustomerInvoiceList_dom_detail",
                umeta: {
                    id: "grid_CustomerInvoiceList_detail",
                    data: "CustomerInvoiceList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "invoiceTypeName",
                        dataType: "String",
                        title: "发票类型"
                    },
                    {
                        field: "invoiceOrgName",
                        dataType: "String",
                        title: "开票单位名称",
                    },
                    {
                        field: "taxpayerNo",
                        dataType: "String",
                        title: "信用代码",
                    },
                    {
                        field: "address",
                        dataType: "String",
                        title: "公司地址",
                    },
                    {
                        field: "tel",
                        dataType: "String",
                        title: "联系电话",
                    },
                    {
                        field: "bank",
                        dataType: "String",
                        title: "开户银行",
                    },
                    {
                        field: "bankAccount",
                        dataType: "String",
                        title: "银行账户",
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Date",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Date",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "isDefault",
                        dataType: "integer",
                        title: "是否默认",
                        renderType: "isDefaultCI"
                    },
                ]
            },
            grid11: {
                domid: "grid_CustAttachmentList_dom_detail",
                umeta: {
                    id: "grid_CustAttachmentList_detail",
                    data: "CustAttachmentList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "fileName",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "fileSize",
                        dataType: "String",
                        title: "大小",
                        editable: false
                    },
                    {
                        field: "creationTime",
                        dataType: "String",
                        title: "上传时间",
                        editable: false,
                    },
                    {
                        field: "fileUrl",
                        dataType: "String",
                        title: "访问地址",
                        visible: false,
                    },

                ]
            },grid12: {
                domid: "grid_CustAttachmentList_dom_detail1",
                umeta: {
                    id: "grid_CustAttachmentList_detail1",
                    data: "CustAttachmentList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "fileName",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "fileSize",
                        dataType: "String",
                        title: "大小",
                        editable: false
                    },
                    {
                        field: "creationTime",
                        dataType: "String",
                        title: "上传时间",
                        editable: false,
                    },
                    {
                        field: "fileUrl",
                        dataType: "String",
                        title: "访问地址",
                        visible: false,
                    },

                ]
            },
        }
    }
    return new basemodel(model);
})
