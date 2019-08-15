define(["ocm_basemodel"], function (basemodel) {
    var model = {
        metas: {
            CusReqFormMeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CusReqFormDto"
                },
                meta: {
                    //申请信息
                    id: { type: "string" },
                    code: { type: "string" },//申请编码
                    applicantId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"人员"}',
                    },//申请人
                    applicantPhone: { type: "string" },//申请人手机
                    applicantEmail: { type: "string" },//申请人邮箱
                    apendix: { type: "string" },//附言
                    state: { type: "integer", default: 0 },

                    customerName: { type: "string" },//客户名称
                    channelTypeName: { type: "string" },//渠道类型
                    // customerRankName: { type: "string" },//客户级别
                    customerAddressName: { type: "string" },//客户地址
                    shopName: { type: "string" },//门店名称
                    applicantOrganizationId :{
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织"}',
                    },//申请人组织
                    applicantOrganizationCode: { type: "string" },//申请人组织
                    applicantOrganizationName: { type: "string" },//申请人组织
                    applicantDepartmentId :{
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['department']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"部门"}',
                    },//申请人部门
                    applicantDepartmentCode: { type: "string" },//申请人部门
                    applicantDepartmentName: { type: "string" },//申请人部门
                    // billTypeCode: {
                    //     type: "string",
                    //     "refmodel": JSON.stringify(refinfo['custdocdef']),
                    //     "refcfg": '{"ctx":"/uitemplate_web","refCode":"CUSTOMER_TYPE","refName":"客户类型"}',
                    //     required: true
                    // },
                    // billTypeName: { type: "string" }
                },
                pageSize: 10
            },
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
                       // required: true
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
                        refparam: '{"AUTH_refdim":"customer.customerCategory"}',
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
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"渠道类型"}',

                    },
                    channelTypeCode: {
                        type: 'string'
                    },
                    channelTypeName: {
                        type: 'string'
                    },
                    //客户等级
                    customerLevelId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer-level']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"客户等级"}'
                    },
                    customerLevelCode: {
                        type: 'string'
                    },
                    customerLevelName: {
                        type: 'string'
                    },
                    //客户类型
                    customerTypeCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"CUSTOMER_TYPE","refName":"客户类型"}',
                        required: true
                    },
                    customerTypeName: {
                        type: 'string'
                    },
                    //内部单位
                    organizationId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    }, //内部单位ID
                    orgCode: {
                        type: 'string'
                    }, //内部单位编码
                    organizationName: {
                        type: 'string'
                    }, //所属组织名称
                    isChannelCustomer: {
                        type: 'string',
                        required: true,
                        default: '1'
                    }, //是否经销商
                    isServiceProvider: {
                        type: 'string',
                        required: true,
                        default: '0'
                    }, //是否服务商
                    //客户来源
                    customerSourceCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"CUSTOMER_SOURCE","refName":"客户来源"}',
                    },
                    customerSourceName: {
                        type: 'string'
                    },
                    //申请单编码
                    cusReqFormId: {
                        type: 'string'
                    },
                    //客户级别
                    /*customerRankCode: {
                        type: 'string',
                        required: true
                    },
                    customerRankName: {
                        type: 'string'
                    },*/
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
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
                    }, //注册所在省份ID
                    provinceName: {
                        type: 'string'
                    }, //注册所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
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
                        "refparam": '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
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
                        "refparam": '{"EQ_areaLevel":"4","EQ_isEnable":"1"}'
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
                        type: 'string'
                    }, //经度
                    latitude: {
                        type: 'string'
                    }, //纬度
                    depositBankId: {
                        type: 'string'
                    }, 
                    bankCode: {
                        type: 'string'
                    }, 
                    depositBankName: {
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

            Shopmeta: {
                params: {
                    "cls": "com.yonyou.ocm.service.dto.ShopDto"
                },
                meta: {
                    id: { type: 'string', required: true },//id
                    customerId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"所属客户","isReturnCode":"true"}',
                        // "refparam": '{"EQ_isChannelCustomer":"1"}',
                    },//所属客户
                    customerCode: { type: 'string' },//所属客户编码
                    customerName: { type: 'string' },//所属客户名称
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    remark: { type: 'string' },//描述
                    shopNatureCode: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"店铺性质","refCode":"QY027"}',
                    },//店铺性质
                    shopNatureName: { type: 'string', required: true },//店铺性质名称
                    shopTypeCode: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refname":"店铺类型","refCode":"QY028"}',
                    },//店铺类型
                    shopTypeName: { type: 'string', required: true },//店铺类型名称
                    countryId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    },//所在国别
                    countryName: { type: 'string' },//国别名称
                    countryCode: { type: 'string' },//国别编码
                    provinceId: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}'
                    },//所在省份
                    provinceName: { type: 'string' },//省份名称
                    provinceCode: { type: 'string' },//省份编码
                    cityId: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
                    },//所在城市
                    cityName: { type: 'string' },//城市名称
                    cityCode: { type: 'string' },//城市编码
                    countyId: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
                    },//所在区县
                    countyCode: { type: 'string' },//区县编码
                    countyName: { type: 'string' },//区县名称
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4","EQ_isEnable":"1"}'
                    },//所在街道
                    townCode: { type: 'string' },//所在街道
                    townName: { type: 'string' },//所在街道
                    address: { type: 'string', required: true },//详细地址
                    legalPerson: { type: 'string' },//法人代表
                    credentialsTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY022","refName":"证件类型"}'
                    },//证件类型
                    credentialsTypeName: { type: 'string' },//证件名称
                    credentialsTypeCode: { type: 'string' },//证件编码
                    credentialsNo: { type: 'string' },//证件号码
                    taxRegNo: { type: 'string' },//税务登记证号
                    businessArea: { type: 'string' },//营业面积
                    postalCode: { type: 'string' },//邮政编码
                    longitude: { type: 'string' },//精度
                    latitude: { type: 'string' },//纬度
                    businessScope: { type: 'string' },//经营范围
                    //   isEnable: { type: 'integer' ,required: true , },//启用状态
                    //客户来源
                    sourceCode: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"CUSTOMER_SOURCE","refName":"客户来源"}',
                    },
                    sourceName: {
                        type: 'string'
                    },
                    cusReqFormId: {
                        type: 'string'
                    },//客户申请单编码
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },

            ShopContactmeta: {//联系人
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
                },
                meta: {
                    id: { type: 'string' },//idp
                    shopId: { type: 'string' },//所属门店
                    //code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    // productid: {type: 'string'},//销售产品id
                    contactTypeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['custdocdef']),
                        'refcfg': '{"ctx":"/uitemplate_web","refCode":"QY019","refName":"联系人类别"}',
                    },//联系人类型
                    contactTypeCode: { type: 'string', required: true, default: '1' },//联系人类型编码
                    contactTypeName: { type: 'string', required: true },//联系人类型名称
                    tel: { type: 'string' },//联系人电话
                    phone: { type: 'string', required: true },//联系人手机
                    fax: { type: 'string' },//传真
                    address: { type: 'string' },//联系人地址
                    email: { type: 'string' },//联系人邮箱
                    isDefault: { type: 'integer' },//是否默认

                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            },
            custCredPicmeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.CustCredPicDto"
                },
                meta: {
                    id: { type: "string" },
                    customerId: { type: "string" },//客户ID
                    credentialTypeId: { type: "string" },//证件类型ID
                    credentialTypeCode: { type: "string" },
                    credentialTypeName: { type: "string" },
                    pictureUrl: { type: "string" }
                },
                pageSize: 10
                //是否启用前端缓存
                // pageCache: true
            },
            FileMeta: {
                meta: {
                    id: { type: "string" },//主键
                    filepath: { type: "string" },//文件名称
                    filesize: { type: "string" },//文件大小
                    filename: { type: "string" },//文件名称
                    uploadtime: { type: "datetime" },//上传时间
                    groupname: { type: "string" },//
                    url: { type: "string" }//URL
                }
            },
            pictureCategoryRef: {
                meta: {
                    pictureCategory: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["custdocdef"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"QY045\"}",
                        "refparam": "{\"EQ_isEnable\":\"1\"}"
                    }//图片类型
                }
            },
            refuseReasonMete: {
                meta: {
                    refuseReason: { type: "string" }
                }
            },
            CustomerAccountmeta: {
                params: {
                    "cls": "cn.com.quanyou.cs.base.service.dto.PartnerDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    },
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

                    depositBankId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['bank']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable": "1"}',
                    },//开户银行
                    depositBankCode: {
                        type: 'string'
                    },//开户银行
                    depositBankName: {
                        type: 'string'
                    },//开户银行
                    bankCategoryName: {
                        type: 'string'
                    },//银行类别
                    accountNumber: {
                        type: 'string'
                    }, //银行账号
                    accountName: {
                        type: 'string'
                    }, //户名
                    accountNatureCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"ACCOUNT_NATURE"}',
                    }, //账户性质
                    accountNatureName: {
                        type: 'string'
                    },

                    currencyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['currency']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable": "1"}',
                    },//币种
                    currencyCode: {
                        type: 'string'
                    },//币种
                    currencyName: {
                        type: 'string'
                    },//币种
                    contact: {
                        type: 'string'
                    }, //联系人
                    tel: {
                        type: 'string'
                    },//联系电话
                    isDefault: {
                        type: 'integer'
                    },//是否默认
                },
                pageSize: 10,
                //启用状态前端缓存
                // pageCache: true
            },
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "申请单编号"
            }, {
                type: "text",
                key: "customer--name",
                label: "客户",
                opr: "LIKE"
            }, {
                type: "text",
                key: "customer--customerContactList--name",
                label: "联系人",
                opr: "LIKE"
            }, {
                type: "text",
                key: "customer--customerAddressDtos--name",
                label: "收货单位",
                opr: "LIKE"
            }, {
                type: "text",
                key: "shop--name",
                label: "门店",
                opr: "LIKE"
            }, {
                type: "text",
                key: "shop--shopContacts--name",
                label: "门店联系人",
                opr: "LIKE"
            }, {
                type: "refer",
                key: "customer--province--id",
                label: "客户所在省份",
                refinfo: "region",
                clientparam: '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
            },
            {
                type: "refer",
                key: "customer--city--id",
                label: "客户所在城市",
                refinfo: "region",
                clientparam: '{"EQ_areaLevel":"2","EQ_isEnable":"1"}',
            },
            {
                type: "refer",
                key: "shop--province--id",
                label: "门店所在省份",
                refinfo: "region",
                clientparam: '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
            },
            {
                type: "refer",
                key: "shop--city--id",
                label: "门店所在城市",
                refinfo: "region",
                clientparam: '{"EQ_areaLevel":"2","EQ_isEnable":"1"}',
            },
            {
                type: "combo",
                key: "state",
                label: "单据状态",
                dataSource: [
                    { name: "全部", value: "" },
                    { name: "待处理", value: "0" },
                    { name: "已提交", value: "1" },
                    { name: "审批中", value: "2" },
                    { name: "审批通过", value: "3" },
                    { name: "审批不通过", value: "4" }]
            },
            {
                type: "daterange",
                key: "creationTime",
                label: "申请提交时间"
            }]
        },
        dialogs: {
            dialog1: [{
                type: "textarea",
                key: "refuseReason",
                label: "不通过原因",
                cls: "ui-textarea-item"
            }]
        },
        buttons: {
            //<i class="uifont icon-plus margin-right-5"></i>新增
            button0: [{
                key: "save",
                label: "保存",
                click: "saveApplicationHandle",
                iconCls: "icon-tubiao-baocun"
            }],
            button1: [
                {
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "beforeEdit",
				    clickArg: "-1"
                   // auth: true
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del",
                   // auth: true
                },
                {
                    key: "submit",
                    label: "提交",
                    iconCls: "icon-tubiao-shenhe",
                    click: "submitCusReqForm",
                   // auth: true
                },
                {
                    key: "unsubmit",
                    label: "收回",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "unsubmitCusReqForm",
                   // buttonShowGroup: "unsubmit",
                    auth: true
                }
            ],
            button2: [
                {
                    key: "approve",
                    label: "审批通过",
                    iconCls: "icon-tubiao-duigou-xianxing",
                    click: "approveCusReqForm",
                   // auth: true
                },
                {
                    key: "disapprove",
                    label: "审批不通过",
                    iconCls: "icon-tubiao-shibai",
                    click: "disapproveCusReqForm",
                   // auth: true
                },
                {
                    key: "cancelapprove",
                    label: "取消审批",
                    iconCls: "icon-tubiao-quxiaoshenhe",
                    click: "cancelApproveCusReqForm",
                    //auth: true
                }
            ],
            button3: [{
                key: "return",
                label: "返回",
                click: "backPanel"
            }
            ],
            button4: [
                {
                    key: "save",
                    label: "保存",
                    click: "saveHandle",
                    clickArg: "applyBase",
                    iconCls: "icon-tubiao-baocun"
                }
            ],
            button5: [
                {
                    key: "save",
                    label: "保存",
                    click: "saveHandle",
                    clickArg: "productBase",
                    iconCls: "icon-tubiao-baocun"
                }
            ],
            button6: [
                {
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
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

            ],
            button7: [
                {
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
                    clickArg: "CustomerAddressList",
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

            ],
            button8: [
                {
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
                    clickArg: "ShopList",
                    iconCls: "icon-plus"
                },
                {
                    key: "delrow",
                    label: "删行",
                    click: "delChild",
                    clickArg: "ShopList",
                    iconCls: "icon-shanchu1"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveShop",
                    iconCls: "icon-tubiao-baocun"
                },

            ],
            button9: [
                {
                    key: "cancel",
                    label: "返回",
                    click: "cancelHandle"
                }
            ],
            button10: [{
                key: "return",
                label: "返回",
                click: "retListPanel"
            }
            ],
            button12: [
                {
                    key: "save",
                    label: "保存",
                    click: "saveShopHandle",
                    iconCls: "icon-tubiao-baocun"
                },
                {
                    key: "cancel",
                    label: "取消",
                    click: "cancelHandle",
                    iconCls: "icon-tubiao-guanbi-anxing"
                }
            ],
            button13: [
                {
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
                    clickArg: "ShopContactList",
                    iconCls: "icon-plus"
                },
                {
                    key: "delrow",
                    label: "删行",
                    click: "delChild",
                    clickArg: "ShopContactList",
                    iconCls: "icon-shanchu1"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveShopContact",
                    iconCls: "icon-tubiao-baocun"
                },
            ],
            button14: [{
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
            // {
            //     key: "saveFile",
            //     label: "保存",
            //     click: "saveFile"
            // }
            {
              key: "fileDownload",
              label: "下载",
              iconCls: "icon-tubiao-xiazai",
              click: "fileDownloadCustomer"
            }
            ],
            button15: [
                {
                    key: "addrow",
                    label: "增行",
                    click: "addRow",
                    clickArg: "AccountList",
                    iconCls: "icon-plus"
                },
                {
                    key: "delrow",
                    label: "删行",
                    click: "delChild",
                    clickArg: "AccountList",
                    iconCls: "icon-shanchu1"
                },
                {
                    key: "save",
                    label: "保存",
                    click: "saveAccount",
                    iconCls: "icon-tubiao-baocun"
                },
            ],
            button16: [
              {
                  key: "fileview",
                  label: "查看",
                  iconCls: "icon-tubiao-chakan",
                  click: "fileViewCustomer"
              },
              {
                  key: "fileDownload",
                  label: "下载",
                  iconCls: "icon-tubiao-xiazai",
                  click: "fileDownloadCustomer"
              }
            ]
        },
        cards: {
            card1: [
                {
                    type: "text",
                    key: "code",
                    label: "编号",
                    // placeholder:"21"
                    enable: false,
                },
                {
                    type: "refer",
                    key: "applicantId",
                    referId: "applicantId",
                    clientParam: {
                        "AUTH_refcod":"cusReqForm"
                    },
                    label: "申请人",
                },
                {
                    type: "text",
                    key: "applicantPhone",
                    label: "申请人手机",
                },
                {
                    type: "text",
                    key: "applicantEmail",
                    label: "申请人邮箱",
                },
                {
                    type: "refer",
                    key: "applicantOrganizationId",
                    label: "申请人组织",
                    clientParam: {
                        "AUTH_refcod":"cusReqForm"
                    }
                },
                {
                    type: "refer",
                    key: "applicantDepartmentId",
                    label: "申请人部门",
                    clientParam: {
                        "AUTH_refcod":"cusReqForm"
                    },
                    domid:"applicantDepartmentIdinfo"
                },
                {
                    type: "label",
                    key: "state",
                    label: "单据状态",
                    // computed: "isEnable",
                    defaultvalue: "0",
                    datasource: [{ name: "待处理", value: "0" },
                    { name: "已提交", value: "1" },
                    { name: "审批中", value: "2" },
                    { name: "审批通过", value: "3" },
                    { name: "审批不通过", value: "4" }]
                    // dataSource: "customerReqState"
                },
                {
                    type: "textarea",
                    key: "apendix",
                    label: "附言",
                    cls: "ui-textarea-item"
                }
            ],
            card2: [
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
                    clientParam: {
                        "AUTH_refcod":"cusReqForm","AUTH_refdim":"customer.customerCategory"

                    }
                },
                {
                    type: "refer",
                    key: "channelTypeId",
                    label: "渠道类型",
                },

                {
                    type: "refer",
                    key: "customerLevelId",
                    label: "客户等级",
                },
                {
                    type: "combo",
                    key: "customerTypeCode",
                    label: "客户类型",
                    defaultvalue: "01",
                    dataSource: "customerTypeSourceSrc"
                },
                {
                    type: "refer",
                    key: "organizationId",
                    compid: "innerorganizationIdBase",
                    label: "内部单位",
                    enable: false
                },
                {
                    //默认否
                    type: "radio",
                    key: "isChannelCustomer",
                    label: "经销商",
                    default: '1',
                    dataSource: "whetherSrc"
                },
                {
                    //默认否
                    type: "radio",
                    key: "isServiceProvider",
                    label: "服务商",
                    dataSource: "whetherSrc"
                },
                /*{
                    type: "combo",
                    key: "customerRankCode",
                    label: "客户级别",
                    dataSource: "customerRankSrc"
                },*/

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
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    // disableInEdit: true
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "townIdinfo",
                    compid: "townIdBase",
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
                    type: "refer",
                    key: "marketAreaId",
                    label: "市场区域",
                    domid: "marketAreaIdinfo",
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
                    type: "refer",
                    key: "superiorCustomerId",
                    label: "上级客户",
                    clientParam: {
                        "AUTH_refcod":"cusReqForm"
                    }
                },
                {
                    type: "refer",
                    key: "payerCustomerId",
                    label: "付款方客户",
                    clientParam: {
                        "AUTH_refcod":"cusReqForm"
                    }
                    // disableInEdit: true
                },
            ],
            card3: [
                {
                    "type": "text",
                    "key": "code",
                    // "enable": false,
                    "label": "编码"
                },
                {
                    "type": "text",
                    "key": "name",
                    "required": true,
                    "label": "名称"
                },

                {
                    "type": "combo",
                    "key": "shopNatureCode",
                    "dataSource": "shopNature",
                    "compid": "shopNatureCode",
                    "label": "店铺性质"
                },
                {
                    "type": "combo",
                    "key": "shopTypeCode",
                    "label": "店铺类型",
                    "dataSource": "shopType",
                    "compid": "shopTypeCode",
                },

                {
                    "type": "refer",
                    "key": "countryId",
                    "referId": "countryId",
                    "required": true,
                    "label": "所在国别",
                    domid: "shop-countryId"
                },
                {
                    "type": "refer",
                    "key": "provinceId",
                    "referId": "provinceId",
                    "required": true,
                    "compid": "provinceIdBase",
                    "label": "所在省份",
                    domid: "shop-provinceId"
                },
                {
                    "type": "refer",
                    "key": "cityId",
                    "referId": "cityId",
                    "required": true,
                    "compid": "cityIdBase",
                    "label": "所在城市",
                    domid: "shop-cityId"
                },
                {
                    "type": "refer",
                    "key": "countyId",
                    "referId": "countyId",
                    "required": true,
                    "compid": "countyIdBase",
                    "label": "所在区/县",
                    domid: "shop-countyId"
                },
                {
                    "type": "refer",
                    "key": "townId",
                    "referId": "townId",
                    "compid": "townIdBase",
                    "label": "所在街道",
                    domid: "shop-townId"
                },
                {
                    "type": "text",
                    "key": "address",
                    "required": true,
                    "label": "详细地址"
                },
                {
                    "type": "text",
                    "key": "legalPerson",
                    "label": "法人代表"
                },
                {
                    "type": "refer",
                    "key": "credentialsTypeId",
                    "referId": "credentialsTypeId",
                    "required": true,
                    "label": "证件类型"
                },
                {
                    "type": "text",
                    "key": "credentialsNo",
                    "required": true,
                    "label": "证件号码"
                },
                {
                    "type": "text",
                    "key": "taxRegNo",
                    "label": "税务登记证号"
                },
                {
                    "type": "text",
                    "key": "businessArea",
                    "label": "经营面积"
                },
                {
                    "type": "text",
                    "key": "postalCode",
                    "label": "邮政编码"
                },
                {
                    "type": "text",
                    "key": "longitude",
                    "label": "经度"
                },
                {
                    "type": "text",
                    "key": "latitude",
                    "label": "纬度"
                },
                {
                    "type": "text",
                    "key": "businessScope",
                    "label": "经营范围"
                },
                {
                    "type": "textarea",
                    "key": "remark",
                    "label": "备注",
                    "cls": "ui-textarea-item"
                },
            ]
        },
        details: {
            detail1: [
                {
                    key: "code",
                    label: "编码"
                },
                {
                    key: "applicantName",
                    label: "申请人"
                },
                {
                    key: "applicantPhone",
                    label: "申请人手机"
                },
                {
                    key: "applicantEmail",
                    label: "申请人邮箱"
                },
                {
                    key: "applicantOrganizationName",
                    label: "申请人组织",
                },
                {
                    key: "applicantDepartmentName",
                    label: "申请人部门",
                },
                {
                    key: "state",
                    label: "单据状态",
                    computed: "stateComputed"
                },
                {
                    key: "apendix",
                    label: "附言",
                    cls: "ui-textarea-item"
                }
            ],
            detail2: [
                {
                    "key": "code",
                    "label": "编码"
                },
                {
                    "key": "name",
                    "label": "名称"
                },
                {
                    "key": "shopNatureName",
                    "label": "店铺性质"
                },
                {
                    "key": "organizationName",
                    "label": "所属组织"
                },
                {
                    "key": "customerName",
                    "label": "所属客户"
                },
                {
                    "key": "shopTypeName",
                    "label": "店铺类型"
                },
                {
                    "key": "countryName",
                    "label": "所在国别"
                },
                {
                    "key": "provinceName",
                    "label": "所在省份"
                },
                {
                    "key": "cityName",
                    "label": "所在城市"
                },
                {
                    "key": "countyName",
                    "label": "所在区/县"
                },
                {
                    "key": "townName",
                    "label": "所在街道"
                },
                {
                    "key": "address",
                    "label": "详细地址"
                },
                {
                    "key": "legalPerson",
                    "label": "法人代表"
                },
                {
                    "key": "credentialsTypeName",
                    "label": "证件类型"
                },
                {
                    "key": "credentialsNo",
                    "label": "证件号码"
                },
                {
                    "key": "taxRegNo",
                    "label": "税务登记证号"
                },

                {
                    "key": "businessArea",
                    "label": "经营面积"
                },
                {
                    "key": "postalCode",
                    "label": "邮政编码"
                },
                {
                    "key": "longitude",
                    "label": "经度"
                },
                {
                    "key": "latitude",
                    "label": "纬度"
                },
                {
                    "key": "businessScope",
                    "label": "经营范围"
                },
                {
                    "key": "remark",
                    "label": "备注",
                    cls: "ui-textarea-item"
                },
            ],
            detail3: [{
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
                key: "channelTypeName",
                label: "渠道类型",
            },

            {
                key: "customerLevelName",
                label: "客户等级",
                // computed: "customerType"
            },
            {
                key: "customerTypeName",
                label: "客户类型",
                // computed: "customerType"
            },
            {
                key: "organizationName",
                label: "内部单位",
            },
            {
                key: "isChannelCustomer",
                label: "经销商",
                computed: "isChannelCustomer"
            },
            {
                key: "isServiceProvider",
                label: "服务商",
                computed: "isServiceProvider"
            },

            /*{
                key: "customerRankName",
                label: "客户级别",
            },*/

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
                key: "marketAreaName",
                label: "市场区域"
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
                key: "superiorCustomerName",
                label: "上级客户"
            },
            {
                key: "payerCustomerName",
                label: "付款方客户"
            },

            ],
        },
        grids: {
            grid1: {
                domid: "buoyancyfactorlist",
                umeta: {
                    "id": "grid_buoyancyfactorlist",
                    "data": "customerApplicationList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "编码",
                        "renderType": "detailRender"
                    },
                    // {
                    //     "field": "applicantName",
                    //     "dataType": "String",
                    //     "title": "申请人"
                    // },
                    // {
                    //     "field": "applicantPhone",
                    //     "dataType": "String",
                    //     "title": "申请人手机"
                    // },
                    // {
                    //     "field": "applicantEmail",
                    //     "dataType": "String",
                    //     "title": "申请人邮箱"
                    // },
                    // {
                    //     "field": "apendix",
                    //     "dataType": "String",
                    //     "title": "附言"
                    // },
                    {
                        "field": "customerName",
                        "dataType": "String",
                        "title": "客户名称"
                    },
                    {
                        "field": "channelTypeName",
                        "dataType": "String",
                        "title": "渠道类型"
                    },
                    /*{
                        "field": "customerRankName",
                        "dataType": "String",
                        "title": "客户级别",
                        "renderType": "customerRankRender"
                    },*/
                    {
                        "field": "detailAddr",
                        "dataType": "String",
                        "title": "客户地址"
                    },
                    {
                        "field": "shopName",
                        "dataType": "String",
                        "title": "门店名称"
                    },
                    {
                        "field": "state",
                        "dataType": "String",
                        "title": "单据状态",
                        "renderType": "approveStateRender"
                    },
                    {
                        "field": "operation",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "operation",
                        "fixed": true,
                        "width": "150px"
                    }
                ]
            },
            grid2: {
                domid: "buoyancyfactorlist2",
                umeta: {
                    "id": "grid_buoyancyfactorlist2",
                    "data": "customerApplicationList_un",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "编码",
                        "renderType": "detailRender_un"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "客户名称"
                    },
                    {
                        "field": "customerAbbr",
                        "dataType": "String",
                        "title": "简称",
                        "visible": false
                    },
                    {
                        "field": "customerCategoryName",
                        "dataType": "String",
                        "title": "客户分类",
                        "visible": false
                    },
                    {
                        "field": "organizationName",
                        "dataType": "String",
                        "title": "对应组织",
                        "visible": false
                    },
                    {
                        "field": "legalRepresentative",
                        "dataType": "String",
                        "title": "法人",
                        "visible": false
                    },
                    {
                        "field": "taxRegistryNo",
                        "dataType": "String",
                        "title": "税务登记号",
                        "visible": false
                    },
                    {
                        "field": "businessScope",
                        "dataType": "String",
                        "title": "经营范围",
                        "visible": false
                    },
                    {
                        "field": "creationTime",
                        "dataType": "String",
                        "title": "创建时间",
                        "width": "200px"
                    },
                    {
                        "field": "invoicesStatusCode",
                        "dataType": "integer",
                        "title": "状态",
                        "renderType": "stateGrid"
                    },
                    {
                        "field": "operation",
                        "dataType": "String",
                        "title": "操作",
                        "renderType": "operation_un",
                        "fixed": true,
                        "width": "110px"
                    }
                ]
            },
            grid3: {
                domid: "grid_democomplexItem2_dom",
                umeta: {
                    "id": "grid_Contact",
                    "data": "ContactList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "联系人编码",
                        "required": true
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "姓名",
                        "required": true
                    },
                    {
                        "field": "contactTypeId",
                        "dataType": "String",
                        "title": "类别",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "showField": "contactTypeName",
                        "editOptions": { "validType": "string", "rel": { "refpk": "contactTypeId" } }
                    },
                    {
                        "field": "contactTel",
                        "dataType": "String",
                        "title": "电话"
                    },
                    {
                        "field": "contactPhone",
                        "dataType": "String",
                        "title": "手机",
                        "required": true
                    },
                    {
                        "field": "contactFax",
                        "dataType": "String",
                        "title": "传真"
                    },
                    {
                        "field": "address",
                        "dataType": "String",
                        "title": "地址"
                    },
                    {
                        "field": "email",
                        "dataType": "String",
                        "title": "邮箱"
                    },
                ]
            },
            grid4: {
                domid: "grid_democomplexItem3_dom",
                umeta: {
                    "id": "grid_CustomerAddress",
                    "data": "CustomerAddressList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true,
                    "onBeforeEditFun": "areasCheck"
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "收货单位编码"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "收货单位名称",
                        "required": true
                    },
                    {
                        "field": "countryId",
                        "dataType": "String",
                        "title": "国别",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string", "rel": { "refname": "countryName" } },
                        "showField": "countryName",
                        "required": true
                    },
                    {
                        "field": "provinceId",
                        "dataType": "String",
                        "title": "省份",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string", "rel": { "refname": "provinceName" } },
                        "showField": "provinceName", "required": true
                    },
                    {
                        "id": "cityAddress",
                        "field": "cityId",
                        "dataType": "String",
                        "title": "城市",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string", "rel": { "refname": "cityName" } },
                        "showField": "cityName", "required": true
                    },
                    {
                        "id": "countyAddress",
                        "field": "countyId",
                        "dataType": "String",
                        "title": "区县",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string", "rel": { "refname": "countyName" } },
                        "showField": "countyName"
                    },
                    {
                        "id": "townAddress",
                        "field": "townId",
                        "dataType": "String",
                        "title": "街道/镇",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string", "rel": { "refname": "townName" } },
                        "showField": "townName"
                    },
                    {
                        "field": "address",
                        "dataType": "String",
                        "title": "详细地址",
                        "required": true
                    },
                    {
                        "field": "fax",
                        "dataType": "String",
                        "title": "传真"
                    },
                    {
                        "field": "logisticPeriod",
                        "dataType": "integer",
                        "title": "标准物流周期",
                        "renderType": "logisticPeriod"
                    },


                    {
                        "field": "longitude",
                        "dataType": "String",
                        "title": "经度"
                    },
                    {
                        "field": "latitude",
                        "dataType": "String",
                        "title": "纬度"
                    },
                    {
                        "field": "firstReceiver",
                        "dataType": "String",
                        "title": "收货第一联系人姓名",
                        "required": true
                    },
                    {
                        "field": "firstReceiverTel",
                        "dataType": "String",
                        "title": "收货第一联系人电话",
                        "required": true
                    },
                    {
                        "field": "firstReceiverPhone",
                        "dataType": "String",
                        "title": "收货第一联系人手机",
                        "required": true
                    },
                    {
                        "field": "secondReceiver",
                        "dataType": "String",
                        "title": "收货第二联系人姓名"
                    },
                    {
                        "field": "secondReceiverTel",
                        "dataType": "String",
                        "title": "收货第二联系人电话"
                    },
                    {
                        "field": "secondReceiverPhone",
                        "dataType": "String",
                        "title": "收货第二联系人手机"
                    },
                    {
                        "field": "thirdReceiver",
                        "dataType": "String",
                        "title": "收货第三联系人姓名"
                    },
                    {
                        "field": "thirdReceiverTel",
                        "dataType": "String",
                        "title": "收货第三联系人电话"
                    },
                    {
                        "field": "thirdReceiverPhone",
                        "dataType": "String",
                        "title": "收货第三联系人手机"
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
            grid5: {
                domid: "grid_democomplexItem4_dom",
                umeta: {
                    "id": "grid_MarketArea",
                    "data": "ShopList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "门店编码"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "名称",
                        "required": true
                    },
                    {
                        "field": "remark",
                        "dataType": "String",
                        "title": "备注"
                    },
                    {
                        "field": "shopNatureCode",
                        "dataType": "String",
                        "title": "店铺性质",
                        "editOptions": { "id": "shopNature", "type": "combo", "datasource": "shopNature" },
                        "editType": "combo",
                        "renderType": "comboRender",
                        "required": true
                    },
                    {
                        "field": "shopClassifyCode",
                        "dataType": "String",
                        "title": "店铺类型",
                        "editOptions": { "id": "shopClassify", "type": "combo", "datasource": "shopClassify" },
                        "editType": "combo",
                        "renderType": "comboRender",
                        "required": true
                    },
                    {
                        "field": "customerAddresId",
                        "dataType": "String",
                        "title": "客户地址（仓库）",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "customerAddresName"
                    },
                    {
                        "field": "reason",
                        "dataType": "String",
                        "title": "法人代表"
                    },
                    {
                        "field": "credentialsTypeId",
                        "dataType": "String",
                        "title": "证件类型",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "credentialsTypeName"
                    },
                    {
                        "field": "isTransferSales",
                        "dataType": "String",
                        "title": "证件号码"
                    },
                    {
                        "field": "taxRegistNo",
                        "dataType": "String",
                        "title": "税务登记号"
                    },
                    {
                        "field": "countryId",
                        "dataType": "String",
                        "title": "国别",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "countryName"
                    },
                    {
                        "field": "provinceId",
                        "dataType": "String",
                        "title": "省份",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "provinceName"
                    },
                    {
                        "field": "cityId",
                        "dataType": "String",
                        "title": "城市",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "cityName"
                    },
                    {
                        "field": "countyId",
                        "dataType": "String",
                        "title": "区县",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "countyName"
                    },
                    {
                        "field": "townId",
                        "dataType": "String",
                        "title": "街道",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "townName"
                    },
                    {
                        "field": "shopAddr",
                        "dataType": "String",
                        "title": "详细地址"
                    },
                    {
                        "field": "operateArea",
                        "dataType": "String",
                        "title": "营业面积"
                    },
                    {
                        "field": "otherThings",
                        "dataType": "String",
                        "title": "其他事宜"
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
            grid6: {
                domid: "grid_democomplexItem5_dom",
                umeta: {
                    "id": "grid_Contact_detail",
                    "data": "ContactList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "联系人姓名"
                    },
                    {
                        "field": "contactTypeName",
                        "dataType": "String",
                        "title": "联系人类别"
                    },
                    {
                        "field": "contactTel",
                        "dataType": "String",
                        "title": "联系人电话"
                    },
                    {
                        "field": "contactPhone",
                        "dataType": "String",
                        "title": "联系人手机"
                    },
                    {
                        "field": "contactFax",
                        "dataType": "String",
                        "title": "传真"
                    },
                    {
                        "field": "address",
                        "dataType": "String",
                        "title": "联系人地址"
                    },
                    {
                        "field": "email",
                        "dataType": "String",
                        "title": "联系人邮箱"
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    },
                    {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "修改人",
                        "visible": false
                    },
                    {
                        "field": "creationTime",
                        "dataType": "Date",
                        "title": "创建时间",
                        "visible": false
                    },
                    {
                        "field": "modifiedTime",
                        "dataType": "Date",
                        "title": "修改时间",
                        "visible": false
                    }
                ]
            },
            grid7: {
                domid: "grid_democomplexItem6_dom",
                umeta: {
                    "id": "grid_CustomerAddress_detail",
                    "data": "CustomerAddressList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": false,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "收货单位编码"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "收货单位名称"
                    },
                    {
                        "field": "simpleName",
                        "dataType": "String",
                        "title": "简称"
                    },
                    {
                        "field": "countryId",
                        "dataType": "String",
                        "title": "国别",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "countryName"
                    },
                    {
                        "field": "provinceId",
                        "dataType": "String",
                        "title": "所在省份",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "provinceName"
                    },
                    {
                        "field": "cityId",
                        "dataType": "String",
                        "title": "所在城市",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "cityName"
                    },
                    {
                        "field": "countyId",
                        "dataType": "String",
                        "title": "所在区/县",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "countyName"
                    },
                    {
                        "field": "townId",
                        "dataType": "String",
                        "title": "所在街道/镇",
                        "renderType": "ncReferRender",
                        "editType": "ncReferEditType",
                        "editOptions": { "validType": "string" },
                        "showField": "townName"
                    },
                    {
                        "field": "logistic_period",
                        "dataType": "String",
                        "title": "标准物流周期"
                    },
                    {
                        "field": "address",
                        "dataType": "String",
                        "title": "详细地址"
                    },
                    {
                        "field": "fax",
                        "dataType": "String",
                        "title": "传真"
                    },
                    {
                        "field": "longitude",
                        "dataType": "String",
                        "title": "经度"
                    },
                    {
                        "field": "latitude",
                        "dataType": "String",
                        "title": "纬度"
                    },
                    {
                        "field": "firstReceiver",
                        "dataType": "String",
                        "title": "收货第一联系人姓名"
                    },
                    {
                        "field": "firstReceiverTel",
                        "dataType": "String",
                        "title": "收货第一联系人电话"
                    },
                    {
                        "field": "firstReceiverPhone",
                        "dataType": "String",
                        "title": "收货第一联系人手机"
                    },
                    {
                        "field": "secondReceiver",
                        "dataType": "String",
                        "title": "收货第二联系人姓名"
                    },
                    {
                        "field": "secondReceiverTel",
                        "dataType": "String",
                        "title": "收货第二联系人电话"
                    },
                    {
                        "field": "secondReceiverPhone",
                        "dataType": "String",
                        "title": "收货第二联系人手机"
                    },
                    {
                        "field": "thirdReceiver",
                        "dataType": "String",
                        "title": "收货第三联系人姓名"
                    },
                    {
                        "field": "thirdReceiverTel",
                        "dataType": "String",
                        "title": "收货第三联系人电话"
                    },
                    {
                        "field": "thirdReceiverPhone",
                        "dataType": "String",
                        "title": "收货第三联系人手机"
                    },
                    {
                        "field": "isDefault",
                        "dataType": "integer",
                        "title": "是否默认",
                        "renderType": "addressStateGrid"
                    }
                ]
            },
            grid8: {
                domid: "grid_democomplexItem7_dom",
                umeta: {
                    "id": "grid_Shop",
                    "data": "ShopList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "code",
                        "dataType": "String",
                        "title": "门店编码"
                    },
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "名称"
                    },
                    {
                        "field": "customerName",
                        "dataType": "String",
                        "title": "所属经销商名称"
                    },
                    {
                        "field": "remark",
                        "dataType": "String",
                        "title": "备注",
                        "visible": false
                    },
                    {
                        "field": "creator",
                        "dataType": "String",
                        "title": "创建人",
                        "visible": false
                    },
                    {
                        "field": "creationTime",
                        "dataType": "date",
                        "title": "创建时间",
                        "visible": false
                    },
                    {
                        "field": "modifier",
                        "dataType": "String",
                        "title": "修改人",
                        "visible": false
                    },
                    {
                        "field": "modifiedTime",
                        "dataType": "date",
                        "title": "修改时间",
                        "visible": false
                    }
                ]
            },
            grid9: {
                domid: "grid_democomplexItem8_dom",
                umeta: {
                    "id": "grid_custCredPic",
                    "data": "custCredPicList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [
                    {
                        "field": "pictureUrl",
                        "dataType": "String",
                        "title": "图片预览",
                        "renderType": "picShow"
                    },
                    {
                        "field": "pictureName",
                        "dataType": "String",
                        "title": "文件名称"
                    },
                    {
                        "field": "creationTime",
                        "dataType": "Datetime",
                        "title": "上传时间"
                    }
                ]
            },
            grid10: {
                "domid": "grid_ShopContactList_dom",
                "umeta": {
                    "id": "grid_Shop_Contact",
                    "data": "ShopContactList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "姓名",
                        "required": "true"
                    },
                    {
                        "field": "contactTypeCode",
                        "dataType": "String",
                        "title": "联系人类别",
                        "editable": true,
                        "editOptions": {
                            "id": "contactTypeComnoId",
                            "type": "combo",
                            "datasource": "shopContactType"
                        },
                        "editType": "combo",
                        "renderType": "comboRender"
                    },
                    {
                        "field": "tel",
                        "dataType": "String",
                        "title": "电话"
                    },
                    {
                        "field": "phone",
                        "dataType": "String",
                        "title": "联系人手机",
                        "required": "true"
                    },
                    {
                        "field": "fax",
                        "dataType": "String",
                        "title": "传真"
                    },
                    {
                        "field": "address",
                        "dataType": "String",
                        "title": "联系人地址"
                    },
                    {
                        "field": "email",
                        "dataType": "String",
                        "title": "联系人邮箱"
                    },
                    {
                        "field": "isDefault",
                        "dataType": "integer",
                        "title": "是否默认",
                        "width": "220px",
                        "editOptions": {
                            "id": "isDefaultShopContact",
                            "type": "combo",
                            "datasource": "whetherSource",
                        },
                        "editType": "combo",
                        "renderType": "isDefaultShopContact"
                    }
                ]
            },
            grid11: {
                domid: "grid_FileList_dom_detail",
                umeta: {
                    id: "grid_FileList_detail",
                    data: "FileList",
                    type: "grid",
                    editable: true,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "filename",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "filesize",
                        dataType: "String",
                        title: "大小",
                        editable: false
                    },
                    {
                        field: "uploadtime",
                        dataType: "String",
                        title: "上传时间",
                        editable: false,
                    },
                    {
                        field: "filepath",
                        dataType: "String",
                        title: "访问地址",
                        visible: false,
                    },

                ]
            },
            grid12: {
                "domid": "grid_ShopContactList_dom1",
                "umeta": {
                    "id": "grid_Shop_Contact1",
                    "data": "ShopContactList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                "columns": [
                    {
                        "field": "name",
                        "dataType": "String",
                        "title": "姓名",
                        "required": "true"
                    },
                    {
                        "field": "contactTypeName",
                        "dataType": "String",
                        "title": "联系人类别",
                    },
                    {
                        "field": "tel",
                        "dataType": "String",
                        "title": "电话"
                    },
                    {
                        "field": "phone",
                        "dataType": "String",
                        "title": "联系人手机",
                        "required": "true"
                    },
                    {
                        "field": "fax",
                        "dataType": "String",
                        "title": "传真"
                    },
                    {
                        "field": "address",
                        "dataType": "String",
                        "title": "联系人地址"
                    },
                    {
                        "field": "email",
                        "dataType": "String",
                        "title": "联系人邮箱"
                    }, {
                        "field": "isDefault",
                        "dataType": "integer",
                        "title": "是否默认",
                        "width": "220px",
                        "renderType": "isDefaultShopContact",
                    }

                ]
            },
            grid13: {
                domid: "grid_FileList_dom_detail1",
                umeta: {
                    id: "grid_FileList_detail1",
                    data: "FileList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "filename",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "filesize",
                        dataType: "String",
                        title: "大小",
                        editable: false
                    },
                    {
                        field: "uploadtime",
                        dataType: "String",
                        title: "上传时间",
                        editable: false,
                    },
                    {
                        field: "filepath",
                        dataType: "String",
                        title: "访问地址",
                        visible: false,
                    },

                ]
            },
            grid14: {//账户信息编辑页面
                "domid": "grid_democomplexItem1_dom",
                "umeta": {
                    "id": "grid_Account",
                    "data": "AccountList",
                    "type": "grid",
                    "editable": true,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    "field": "depositBankId",
                    "dataType": "String",
                    "title": "开户银行",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string",
                        "rel": { "bankCategoryName": "bankCategoryName" }
                    },
                    "showField": "depositBankName",
                    "required": true,
                },
                {
                    field: "bankCategoryName",
                    dataType: "String",
                    title: "银行类别",
                    required: true
                },
                {
                    field: "accountNumber",
                    dataType: "String",
                    title: "银行账号",
                    required: true
                },
                {
                    field: "accountName",
                    dataType: "String",
                    title: "户名",
                    required: true
                },
                {
                    field: "accountNatureCode",
                    dataType: "String",
                    title: "账户性质",
                    "editOptions": {
                        "id": "accountNature",
                        "type": "combo",
                        "datasource": "accountNatureSrc"
                    },
                    "editType": "combo",
                    "renderType": "comboRender",
                    required: true
                },
                {
                    "field": "currencyId",
                    "dataType": "String",
                    "title": "币种",
                    "renderType": "ncReferRender",
                    "editType": "ncReferEditType",
                    "editOptions": {
                        "validType": "string"
                    },
                    "showField": "currencyName",
                    "required": true
                },
                {
                    field: "contact",
                    dataType: "String",
                    title: "联系人",
                },
                {
                    field: "tel",
                    dataType: "String",
                    "required": true,
                    title: "联系电话",
                },
                {
                    field: "isDefault",
                    dataType: "integer",
                    title: "是否默认",
                    // width: "220px",
                    editOptions: {
                        id: "isDefaultACC",
                        type: "combo",
                        datasource: "whetherSource"
                    },
                    editType: "combo",
                    renderType: "isDefaultACC"
                }
                ]
            },
            grid15: {//账户信息查看页面
                "domid": "grid_democomplexItem1_dom1",
                "umeta": {
                    "id": "grid_Account1",
                    "data": "AccountList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns: [{
                    field: "depositBankName",
                    dataType: "String",
                    title: "开户银行",
                },
                {
                    field: "bankCategoryName",
                    dataType: "String",
                    title: "银行类别",
                },
                {
                    field: "accountNumber",
                    dataType: "String",
                    title: "银行账号",
                },
                {
                    field: "accountName",
                    dataType: "String",
                    title: "户名",
                },
                {
                    field: "accountNatureName",
                    dataType: "String",
                    title: "发票类型",
                },
                {
                    "field": "currencyName",
                    "dataType": "String",
                    "title": "币种",
                },
                {
                    field: "contact",
                    dataType: "String",
                    title: "联系人",
                },
                {
                    field: "tel",
                    dataType: "String",
                    title: "联系电话",
                },
                {
                    field: "isDefault",
                    dataType: "integer",
                    title: "是否默认",
                    renderType: "isDefaultACC"
                },
                ]
            },

        }
    };
    return new basemodel(model);
});
