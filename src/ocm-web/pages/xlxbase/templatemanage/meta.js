define(['ocm_global'], function () {

    window.BusiTemplateParentMeta = {
      meta: {
        id: {type: 'string'},
        code: {type: 'string', required: true}, //模板编码
        name: {type: 'string', required: true},//模板名称
        busiObject: {type: 'string', required: true}, //业务对象
        templateType: {type: 'string', required: true}, //模板类型
        isDefault: {type: 'string', default: "0"}, //是否默认模板
        templateauth: {
          type: 'child',
          meta: {
            "id": {type: 'string'},
            "templateId": {type: 'string'},
            "organizationId": {type: 'string'},
            "organizationName": {type: 'string'},
            "areaId": {type: 'string'},
            "areaName": {type: 'string'},
            "departmentId": {type: 'string'},
            "departmentName": {type: 'string'},
            "busiType": {type: 'string'},
            "busiTypeName": {type: 'string'},
            "channelType": {type: 'string'},
            "channelTypeName": {type: 'string'},
            "terminalType": {type: 'string'},
            "terminalTypeName": {type: 'string'},
            "terminalGrade": {type: 'string'},
            "terminalGradeName": {type: 'string'},
            "userId": {type: 'string'},
            "userName": {type: 'string'},
            "roleId": {type: 'string'},
            "roleName": {type: 'string'},
          }
        },
      }
    }
    //模板字段属性
    window.BusiTemplateItemPropertyMeta = {
      meta: {
        id: {type: 'string'},
        label: {type: 'string'},
        type: {type: 'string'},
        precision: {type: 'integer'},
        key: {type: 'string'},
        required: {type: 'string', default: "0"},
        visible: {type: 'string', default: "1"},
        order: {type: 'integer', default: 10},
        multi: {type: 'string', default: "0"},
        dataSource: {type: 'string',},
        enumkey: {type: 'string'},
        refkey: {
          type: 'string',
          refmodel: JSON.stringify(refinfo['tplfieldrefer']),
          refcfg: '{"ctx": "/uitemplate_web"}'
        },
        refshowcontent: {type: 'string'},
        refrel: {
          type: 'child',
          meta: {
            label: {type: 'string'},
            key: {type: 'string'},
          }
        },
        refid: {
          type: 'string',
          refmodel: JSON.stringify(refinfo['CustDoc']),
          refcfg: '{"ctx":"/uitemplate_web","refCode":"","refName":"自定义档案定义"}',
          refrel: {"refcode":"refcode","refname":"refname"},
        },
        feildgroup: {type: 'string',},
        refcode: {type: 'string',},
        refname: {type: 'string',},
        busiTip: {type: 'string',},
        "font-size": {type: 'string',default: '14px'},
        color: {type: 'string', default: '#333333'},
        style: {type: 'string'},
        maxLength: {type: 'string'},
        needWatermark: {type: 'string', default: "1"},
        editable: {type: 'string', default: "1"},
        defaultValue: {type: 'string'},
      }
    }
    window.DefaultValueMeta = {
      meta: {
        defaultValue: {type: 'string'},
      }
    }
    window.AllRefrelMeta = {
      meta: {
        label: {type: 'string'},
        key: {type: 'string'},
        showLabel: {type: 'string'},
        order: {type: 'string'},
      }
    }
    window.BillHeadConfMeta = {
      meta: {
        visible: {type: 'string', default: "1"},
      }
    }
    //附件
    window.BillAttachConfMeta = {
      meta: {
        visible: {type: 'string', default: "0"},  //是否显示附件
        canDownload: {type: 'string', default: "0"},  //是否可下载
        canUpload: {type: 'string', default: "0"},  //是否可上传
        canDelete: {type: 'string', default: "0"},  //是否可删除
      }
    }
    //控件
    // window.TemplateCompMeta = {
    //   meta: {
    //     type: {type: 'string'},
    //     objectKey: {type: 'string'},
    //   }
    // }
    //模板页签
    window.BillTabsConfMeta = {
      meta: {
        tabName: {type: 'string'},
        visible: {type: 'string', default: "1"},
        order: {type: 'integer', default: 10},
        comps: {
          type: 'child',
          meta: window.TemplateCompMeta
        }
      }
    }
    //字段选择器
    window.FieldSelectorMeta = {
      meta: {
        id: {type: 'string'},
        key: {type: 'string', required: true},
        label: {type: 'string'},
        enable: {type: 'string', default: "1"},
        visible: {type: 'string', default: "1"},
        type: {type: 'string',default: "text"},
        enumkey: {type: 'string'},  //枚举标识
        refkey: {
          type: 'string',
          refmodel: JSON.stringify(refinfo['tplfieldrefer']),
          refcfg: '{"ctx": "/uitemplate_web"}'
        },   //参照标识
        refid: {
          type: 'string',
          refmodel: JSON.stringify(refinfo['CustDoc']),
          refcfg: '{"ctx":"/uitemplate_web","refCode":"","refName":"自定义档案定义"}'
        },
        refcode: {type: 'string'},  //自定义档案参照编码
        refname: {type: 'string'},  //自定义档案参照名称
        dr: {type: 'string'},
      }
    }
    window.AllotGroupMeta = {
      meta: {
        orgArea: {type: 'string'},  //组织区域
        busiType: {type: 'string'}, //业务类型
        customerProperty: {type: 'string'}, //客户属性
        terminalProperty: {type: 'string'}, //终端属性
        userRole: {type: 'string'}, //用户角色
        actProperty: {type: 'string'},  //活动属性
        inspectProperty: {type: 'string'},  //巡查属性
        // busiObject: {//业务对象
        //   type: 'string',
        //   refmodel: JSON.stringify(refinfo['tplallotbusiobject']),
        //   refcfg: '{"ctx":"/uitemplate_web"}',
        // },
      }
    }
    window.TemplateAllotMeta = {
      meta: {
        organizationId: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['organization_bu']),
          "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织","isMultiSelectedEnabled":true}',
          "refparam": '{"EQ_isEnable":"1"}',
        }, //组织
        areaId: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['marketareas']),
          "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
        }, //区域市场
        departmentId: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['department']),
          "refcfg": '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
          "refparam": '{"EQ_isEnable": "1" }',

        }, //部门
        busiCatalog: {//业务对象
          type: 'string',
          refmodel: JSON.stringify(refinfo['tplallotbusiobject']),
          refcfg: '{"ctx":"/uitemplate_web"}',
        },
        busiType: {//业务类型
          type: 'string',
          refmodel: JSON.stringify(refinfo['busitype']),
          refcfg: '{"ctx": "/uitemplate_web"}',
        },
        channelType: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['canaltyperef']),
          "refcfg": '{"ctx":"/uitemplate_web","refName":"终端渠道类型","isMultiSelectedEnabled":true}'
        },  //渠道类型
        userId: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['user']),
          "refcfg": '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
        }, //用户
        roleId: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['role_com']),
          "refcfg": '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
        }, //角色
        //客户等级
        customerLevel: {
          type: 'string',
          "refmodel": JSON.stringify(refinfo['custlevel']),
          "refcfg": '{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":true}',
        },
      },
    }

    window.buttons = {
        button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-add",
                click: "add"
            },
            {
                key: "enable",
                label: "复制",
                iconCls: "icon-copy",
                click: "copy"
            },
            {
                key: "disable",
                label: "修改",
                iconCls: "icon-edit",
                click: "update"
            },
            {
                key: "del",
                label: "删除",
                iconCls: "icon-del",
                click: "del"
            },
        ]
    }

    window.companyinfometa = {
        meta: {
            companyid: { type: 'string' },
            companyname: { type: 'string' },
        }
    }

    window.customertypemeta = {
        // forceDel:true,
        meta: {
            id: { type: 'string' },
            name: { type: 'string' }, //
            app_temp_code: { type: 'string' }, //
            pc_temp_code: { type: 'string' }, //
            code: { type: 'string' }, //
        }
    }
    window.basicinfometa = {
        meta: {
            id: { type: 'string' },
            memberCode: { type: 'string' }, // 助记码

        }
    }
    window.customerareameta = {
        forceDel: true,
        meta: {
            id: { type: 'string' },     //经营范围id
            dr: { type: 'string' },
            ts: { type: 'string' },
            creator: { type: 'string' }, // 创建人
            createTime: { type: 'date' }, // 创建时间
            modifier: { type: 'string' }, // 修改人
            modifiedTime: { type: 'date' }, // 修改时间
            brandId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['brandref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"品牌","isMultiSelectedEnabled":true}',
                "refparam": '{"EQ_isEnable": "1"}',
                required: true
            }, //品牌id
            brandCode: { type: 'string' },//品牌code
            brandName: { type: 'string' },//品牌name
            prodlineId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['prodlineref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"产品线","isMultiSelectedEnabled":true}',
                "refparam": '{"EQ_isEnable": "1"}',
                required: true
            },//产品线id
            prodlineCode: { type: 'string' },//产品线code
            prodlineName: { type: 'string' },//产品线名称
            staffUserId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['persons']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"业务员"}',
                required: true,
            },//业务员id
            staffUserCode: { type: 'string' },//业务员code
            staffUserName: { type: 'string' },//业务员名称
            customerId: { type: 'string' },//客户id
            rowno: { type: 'string' },//行号
            rowStatus: { type: "string" },//行状态
        }
    }
    window.accessorymeta = {
        meta: {
            id: { type: 'string' },
            fileGroup: { type: 'string' },//所属分组id
            fileUrl: { type: 'string' },
            fileSize: { type: 'string' },
            type: { type: 'string' },
            suffix: { type: 'string' },
            fileRename: { type: 'string' },//别名 非必填
            fileName: { type: 'string' },//
            fileId: { type: 'string' },//
            uploadTime: { type: 'string' },//
            creator: { type: 'string' },//
            ischecked: { type: 'string' },
            creationTime: { type: 'date', format: "YYYY-MM-DD" },//上传时间
            userId: { type: 'string' },//上传人id
            userName: { type: 'string' },//上传人name
            typeImageUrl: { type: 'string' },//类型图片typeImageUrl
        }
    }
    window.accessorycheckmeta = {
        meta: {
            ischecked: { type: 'string' },
            num: { type: 'string' }
        }
    }
    window.accessorygrpmeta = {
        meta: {
            index: { type: 'string' },
            id: { type: 'string' },
        }
    }
    window.customermeta = {
        params: {
            "cls": "com.yonyou.ocm.base.service.dto.personDto"
        },
        meta: {
            id: { type: 'string' },
            dr: { type: 'string' },
            ts: { type: 'string' },
            creator: { type: 'string' }, // 创建人
            creationTime: { type: 'datetime' }, // 创建时间
            modifier: { type: 'string' }, //修改人
            modifiedTime: { type: 'datetime' }, // 修改时间
            code: { type: 'string' },//客户编码
            name: { type: 'string', required: true }, //客户名称
            // customerType:{type: 'string'}, //客户类型
            // basicClassi: {type: 'string'}, //基本分类
            // specialistSalesman: {type: 'string'}, //专管业务员
            // regionalClassi: {type: 'string'}, //地区分类
            // customerTaxCategory: {type: 'string'}, //客户税类
            abbr: { type: 'string' }, // 简称
            description: { type: 'string' }, // 描述
            businessScope: { type: 'string' }, //经营范围
            marketAreaId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['areaMarketTree']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"区域市场","isNotLeafSelected":false}',
                "refparam": '{"EQ_isEnable":"1"}',
                required: true
            }, // 区域市场
            marketAreaCode: { type: 'string' }, // 区域市场Code
            marketAreaName: { type: 'string' }, // 区域市场name
            customerCategoryId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customercategorys']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"客户基本分类"}',
                required: true
            }, // 客户分类
            customerCategoryCode: { type: 'string' }, // 客户分类code
            customerCategoryName: { type: 'string' }, // 客户分类name
            channelTypeId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['channeltypes']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"客户类型"}',
                required: true
            }, // 渠道类型id
            channelTypeCode: { type: 'string' }, // 渠道类型code
            channelTypeName: { type: 'string' }, // 渠道类型name
            isInnerOrganization: { type: 'string' }, // 是否内部组织
            organizationId: {           //对应组织id
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['organizationId']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"组织"}',
                "refparam": '{ "EQ_isEnable":"1"}',
            },
            organizationCode: { type: 'string' }, // 对应组织code
            organizationName: { type: 'string' }, // 对应组织name
            isChannelCustomer: { type: 'string' }, // 是否经销商
            credentialsTypeId: { type: 'string' }, // 证件类型ID
            credentialsTypeCode: { type: 'string' }, // 证件类型code
            credentialsTypeName: { type: 'string' }, // 证件类型name
            credentialsNo: { type: 'string' }, // 证件号码

            // legalPerson: { type: 'string', required: true }, // 法人代表  暂时
            legalPerson: { type: 'string' }, // 法人代表
            // taxRegNo: { type: 'string', required: true }, // 税务登记号  暂时
            taxRegNo: { type: 'string'}, // 税务登记号
            countryId: { type: 'string' }, // 注册国家
            countryCode: { type: 'string' }, // 注册国家code
            countryName: { type: 'string' }, // 注册国家name
            provinceId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['areaclass']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属省份"}',
                // required: true  暂时
            }, // 省份id
            provinceName: { type: 'string' }, // 省份名称
            provinceCode: { type: 'string' }, // 省份code
            cityId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['areaclass']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属城市"}',
                // required: true  暂时
            }, // 城市ID
            cityCode: { type: 'string' }, // 城市code
            cityName: { type: 'string' }, // 城市name
            countyId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['areaclass']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属区县"}',
                // required: true  暂时
            }, // 区县id
            countyName: { type: 'string' }, // 区县name
            countyCode: { type: 'string' }, // 区县code
            townId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['areaclass']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属乡镇"}',
                // required: true  暂时
            }, // 街道/镇id
            townName: { type: 'string' }, // 街道/镇name
            townCode: { type: 'string' }, // 街道/镇code
            detailAddr: { type: 'string' }, // 详细地址
            // detailAddr: { type: 'string', required: true }, // 详细地址  暂时
            longitude: { type: 'string' }, // 经度
            latitude: { type: 'string' }, // 维度
            bank: { type: 'string'}, // 开户行  暂时
            bankAccount: { type: 'string'}, // 开户银行账户  暂时
            // bank: { type: 'string', required: true }, // 开户行
            // bankAccount: { type: 'string', required: true }, // 开户银行账户
            accountName: { type: 'string' }, // 开户银行户名
            isFrozen: { type: 'string' }, // 是否冻结
            isEnable: { type: 'string' }, // 是否停用
            payerCustomerId: { type: 'string' }, // 付款方客户id
            payerCustomerCode: { type: 'string' }, // 付款方客户code
            payerCustomerName: { type: 'string' }, // 付款方客户name
            customerRankId: { type: 'string' }, // 客户if
            customerRankCode: { type: 'string' }, // 客户级别code
            customerRankName: { type: 'string' }, // 客户级别name
            parentCustomerId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"上级客户"}'
            }, // 上级客户id
            parentCustomerCode: { type: 'string' }, // 上级客户code
            parentCustomerName: { type: 'string' }, //上级客户name
            saleCustomerId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"上级经销商"}',
                "refparam": '{"NOTEQ_channelType.code":"02","EQ_state":"2"}',
                required: true
                // required: true  暂时
            }, // 零售商上级客户id
            saleCustomerCode: { type: 'string' }, // 零售商上级客户code
            saleCustomerName: { type: 'string' }, //零售商上级客户name
            customerLevelId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['custlevel']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"客户等级"}',
                "refparam": '{"EQ_isEnable":"1"}',
                // required: true  暂时
            }, // 客户等级id
            customerLevelCode: { type: 'string' }, // 客户等级code
            customerLevelName: { type: 'string' }, // 客户等级name
            custBasetype: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customercategorys']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"客户基本分类"}'
            }, // 客户基本分类
            taxtypeId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['taxtype']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"客户税类"}',
                // required: true  暂时
            }, // 客户税类
            taxtypeCode: { type: 'string' }, // 客户税类
            taxtypeName: { type: 'string' }, // 客户税类
            bankaddress: { type: 'string'}, // 开票地址
            linkman: { type: 'string'}, // 联系人
            mobile: { type: 'string'}, // 电话
            // bankaddress: { type: 'string', required: true }, // 开票地址  暂时
            // linkman: { type: 'string', required: true }, // 联系人 暂时
            // mobile: { type: 'string', required: true }, // 电话 暂时
            years: { type: 'string' }, // 年龄
            storeadd: { type: 'string' }, // 门店位置
            storeper: { type: 'string' }, // 店员人数
            workmoney: { type: 'string' }, // 流动资金
            extension: { type: 'string' }, // 推广新产品能力
            workyears: { type: 'string' }, // 从事农资年数
            yearsales: { type: 'string' }, // 年销售量
            salesbrand: { type: 'string' }, // 销售品牌
            ispesticides: { type: 'string' }, // 是否销售农药
            warehouse: { type: 'string' }, // 仓库大小
            isdistributor: { type: 'string' }, //是否有配送员
            vehicle: { type: 'string' }, // 配送车辆
            brand: { type: 'string' }, // 经营品牌
            dotnum: { type: 'string' }, // 网点数量
            intention: { type: 'string' }, // 合作意向
            issale: { type: 'string' }, // 是否交易客户
            ispotential: { type: 'string' }, // 是否潜在客户
            isapplied: { type: 'string' }, // 是否已生成申请单
            nccustomer_id: { type: 'string' }, // nc客户id
            lastvisit_date: { type: 'date' }, //最后拜访时间
            custapply_id: { type: 'string' }, //来源申请单id
            customerAreas: { type: 'child', meta: customerareameta },   //关于详细信息的
            customerAttachs: { type: 'child', meta: accessorymeta }, //关于上传文件的
            phone: { type: 'string'},
            // phone: { type: 'string', required: true }, //暂时
            syncNcBtn: { type: 'string' }, // 判断同步NC按钮是否隐藏
            workmoney: { type: 'float' }, // 资金状况
            storeper: { type: 'integer' }, // 业务员人数
            vehicle: { type: 'integer' }, // 配送能力（车辆数）
            brand: { type: 'string' }, // 代理品牌
            dotnum: { type: 'integer' }, // 网点数量
            warehous: { type: 'float' }, // 仓储能力
            brand_businum: { type: 'string' }, // 代理农药品牌及业务额
            brand_salenum: { type: 'string' }, // 代理种子品牌及销量

            //暂时
            // workmoney: { type: 'float', required: true }, // 资金状况
            // storeper: { type: 'integer', required: true }, // 业务员人数
            // vehicle: { type: 'integer', required: true }, // 配送能力（车辆数）
            // brand: { type: 'string' , required: true}, // 代理品牌
            // dotnum: { type: 'integer' , required: true}, // 网点数量
            // warehous: { type: 'float' , required: true}, // 仓储能力
            // brand_businum: { type: 'string', required: true }, // 代理农药品牌及业务额
            // brand_salenum: { type: 'string' , required: true}, // 代理种子品牌及销量
        },
    }


    //渠道结构
    window.customerpsrmeta = {
        meta: {
            id: { type: 'string' },
            code: { type: 'string' },
            name: { type: 'string' },
            detailAddr: { type: 'string' },
            unvisitday_num: { type: 'string' },
            channelTypeId: { type: 'string' },
            channelTypeName: { type: 'string' },
            mobile: { type: 'string' },
        }
    }

    //交易信息
    // window.customertrademeta = {
    //     meta: {
    //         orderout: {type: 'child', meta: tradeordermeta},
    //         ticket: {type: 'child', meta: tradeticketmeta},
    //         money: {type: 'child', meta: trademoneymeta},
    //     }
    // }

    //交易-资金
    window.trademoneymeta = {
        meta: {
            prodlineid: { type: 'string' },
            costbalance: { type: 'string' },
            nlimitmny: { type: 'string' },
        }
    }

    //交易-余票
    window.tradeticketmeta = {
        meta: {
            commodity: { type: 'string' },
            nnum: { type: 'string' },
        }
    }

    //交易-订单
    window.tradeordermeta = {
        meta: {
            type: { type: 'string' },
            OrderNum: { type: 'string' },
            OutNum: { type: 'string' },
        }
    }

    //零售商交易
    window.secondtrademeta = {
        meta: {

        }
    }

    //变更记录
    window.customerchangemeta = {
        meta: {
            creationTime: { type: 'datetime' }, // 创建时间
            oldFieldValue: { type: 'string' }, //
            newFieldValue: { type: 'string' }, //
            fieldName: { type: 'string' }, //
            creator: { type: 'string' }, //
        }
    }

    //拜访记录
    window.custvisitmeta = {
        meta: {
            personName: { type: 'string' },
            visitTime: { type: 'datetime' },
            id: { type: 'string' },
            state: { type: 'string' },
            visitSubject: { type: 'string' },
        }
    }

    window.customerareaindexmeta = {
        meta: {
            index: { type: 'string' }
        }
    }
})
