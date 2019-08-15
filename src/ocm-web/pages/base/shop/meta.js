define(["ocm_basemodel"], function (basemodel) {
  //查询当前登录人员的身份
    var customer = localStorage.getItem("_A_P_customer");
    var channelCustomer = JSON.parse(customer);
   // channelCustomer.isChannelCustomer=1;
    if (channelCustomer!=null){
      //渠道商不要查询条件所属客户，设置默认值
        var model = {
            metas: {
                Shopmeta: {
                    params: {
                        "cls": "com.yonyou.ocm.service.dto.ShopDto"
                    },
                    meta: {
                        id: { type: 'string', required: true },//id
                        organizationId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['organization_ocm']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"所属组织"}',
                            "refparam": '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}',
                        },//所属组织
                        organizationCode: { type: 'string' },//所属组织编码
                        organizationName: { type: 'string' },//所属组织名称
                        customerId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['customer']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"所属客户"}',
                            "refparam": '{"EQ_isEnable":"1", "EQ_isFrozen":"0"}',
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
                        businessArea: { type: 'float', validType: "float" },//营业面积
                        postalCode: { type: 'string' },//邮政编码
                        longitude: { type: 'string' },//精度
                        latitude: { type: 'string' },//纬度
                        businessScope: { type: 'string' },//经营范围
                        isEnable: { type: 'integer', required: true, },//启用状态
                        //客户来源
                        sourceCode: {
                            required: true,
                            default: '01',
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['custdocdef']),
                            "refcfg": '{"ctx":"/uitemplate_web","refCode":"CUSTOMER_SOURCE","refName":"来源"}',
                        },
                        sourceName: {
                            type: 'string'
                        },
                        cusReqFormCode: {
                            type: 'string'
                        },//客户申请单编码
                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
                Contactmeta: {//联系人
                    params: {
                        "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
                    },
                    meta: {
                        id: { type: 'string' },//idp
                        shopId: { type: 'string' },//所属门店
                        code: { type: 'string'},//编码
                        name: { type: 'string', required: true },//名称
                        // productid: {type: 'string'},//销售产品id
                        contactTypeId: {
                            type: 'string',
                            required: true,
                            'refmodel': JSON.stringify(refinfo['custdocdef']),
                            'refcfg': '{"ctx":"/uitemplate_web","refCode":"QY019","refName":"联系人列别"}',
                        },//联系人类型
                        contactTypeCode: { type: 'string', required: true, default: '1' },//联系人类型编码
                        contactTypeName: { type: 'string', required: true },//联系人类型名称
                        tel: { type: 'string' },//联系人电话
                        phone: { type: 'string', required: true },//联系人手机
                        fax: { type: 'string' },//传真
                        address: { type: 'string' },//联系人地址
                        email: { type: 'string' },//联系人邮箱
                        isDefault: { type: 'integer', default: 0 }
                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
                shopClerkmeta: {//店员
                    params: {
                        "cls": "cn.com.quanyou.cs.base.service.dto.ShopClerkDto"
                    },
                    meta: {
                        id: { type: 'string' },//idp
                        shopId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['shop']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
                        },//所属门店
                        shopCode: { type: 'string', required: true },//编码
                        shopName: { type: 'string', required: true },//名称
                        personId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['person']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"人员"}',
                        },//人员
                        personCode: { type: 'string', required: true },//编码
                        personName: { type: 'string', required: true },//名称
                        postId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['post']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"所属客户"}',
                        },//岗位
                        postCode: { type: 'string', required: true },//岗位编码
                        postName: { type: 'string', required: true },//岗位名称
                        idTypeCode: {
                            type: 'string',
                            required: true,
                            'refmodel': JSON.stringify(refinfo['custdocdef']),
                            'refcfg': '{"ctx":"/uitemplate_web","refCode":"QY019","refName":"证件类型"}',
                        },//证件类型
                        idTypeName: { type: 'string', required: true },//证件类型名称
                        credentialsNo: { type: 'string' },//证件号码
                        phone: { type: 'string', required: true },//手机
                        postStartDate: { type: 'date' },//入职时间
                        isPostEnd: { type: 'integer', default: 0 },//是否离职
                        postEndDate: { type: 'date'},//离职时间
                        isShopKeeper: { type: 'integer', default: 0 },//店长

                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
                shopWarehousemeta: {//仓库
                    params: {
                        "cls": "cn.com.quanyou.cs.base.service.dto.ShopWarehouseDto"
                    },
                    meta: {
                        id: { type: 'string' },//idp
                        shopId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['shop']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
                        },//所属门店
                        shopCode: { type: 'string', required: true },//编码
                        shopName: { type: 'string', required: true },//名称
                        warehouseId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['warehouse']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"仓库"}',
                        },//人员
                        warehouseCode: { type: 'string', required: true },//编码
                        warehouseName: { type: 'string', required: true },//名称
                        isDefault: { type: 'integer', default: 0 },//是否默认

                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
            },
            searchs: {
                search1: [
                    {
                        type: "text",
                        key: "code",
                        label: "门店编码",
                    },
                    {
                        type: "text",
                        key: "name",
                        label: "门店名称",
                    },
                    {
                        type: "combo",
                        key: "shopNature",
                        label: "店铺性质",
                        url: appCtx + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY027",
                        namefield: "name",
                        valuefield: "code"
                    },
                    {
                        type: "refer",
                        key: "organization--id",
                        label: "所属组织",
                        refinfo: "organization_ocm",
                        refName: "",
                        clientParam: {
                            "EQ_isEnable": "1", "EQ_orgFuncRel": "01","AUTH_refcod":"shop"
                        }
                    },
                    // {
                    //     type: "refer",
                    //     key: "customer--id",
                    //     label: "所属客户",
                    //     refinfo: "customer",
                    //     refName: "",
                    //     clientParam: {
                    //         "EQ_isEnable": "1",
                    //     }
                    // },
                    {
                        type: "combo",
                        key: "shopType",
                        label: "店铺类型",
                        url: appCtx + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY028",
                        namefield: "name",
                        valuefield: "code"
                    },
                    {
                        type: "refer",
                        key: "province--id",
                        label: "所在省份",
                        refinfo: "region",
                        refName: "行政区划",
                        clientParam: {
                            "EQ_isEnable": "1", "EQ_areaLevel": "1",
                        }
                    },
                    {
                        type: "refer",
                        key: "city--id",
                        label: "所在城市",
                        refinfo: "region",
                        refName: "行政区划",
                        clientParam: {
                            "EQ_isEnable": "1", "EQ_areaLevel": "2",
                        }
                    },
                    {
                        type: "text",
                        key: "shopContacts--name",
                        label: "联系人",
                    },
                    {
                        type: "text",
                        key: "shopContacts--tel",
                        label: "联系人电话",
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
                button1: [
                    {
                        key: "add",
                        label: "新增",
                        iconCls: "icon-plus",
                        click: "beforeEdit",
                        auth: true,
                        buttonShowGroup: "add"
                    },
                    {
                        key: "del",
                        label: "删除",
                        iconCls: "icon-shanchu1",
                        click: "del",
                        // auth: true
                    },
                    {
                        key: "enable",
                        label: "启用",
                        iconCls: "icon-qiyong",
                        click: "enable",
                        // auth: true
                    },
                    {
                        key: "disable",
                        label: "停用",
                        iconCls: "icon-tingyong",
                        click: "disable",
                        // auth: true
                    }
                ],
                button2: [{
                    key: "return",
                    label: "返回",
                    cls: "ui-btn-green",
                    click: "backPanle"
                }
                ],
                button3: [
                    {
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
                button4: [
                    {
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
                    }
                ],
                button5: [
                    {
                        key: "addrow",
                        label: "增行",
                        click: "addRow",
                        clickArg: "ShopClerkList",
                        cls: "ui-btn-orange",
                        iconCls: "icon-plus"
                    },
                    {
                        key: "delrow",
                        label: "删行",
                        click: "delChild",
                        clickArg: "ShopClerkList",
                        iconCls: "icon-shanchu1"
                    },
                ],
                button6: [
                    {
                        key: "cancel",
                        label: "返回",
                        click: "cancelHandle",
                        cls: "ui-btn-green"
                    }
                ],
                button7: [{
                    key: "return",
                    label: "返回",
                    click: "picBack",
                    cls: "ui-btn-green"
                }
                ],
                button8: [
                    {
                        key: "showfile",
                        label: "上传图片",
                        iconCls: "icon-plus",
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
                    click: "onOpenUploadWinShop"
                },
                    {
                        key: "filedel",
                        label: "删除",
                        iconCls: "icon-shanchu1",
                        click: "fileDeleteShop"
                    },
                    {
                        key: "fileview",
                        label: "查看",
                        iconCls: "icon-tubiao-chakan",
                        click: "fileViewShop"
                    },
                    {
                        key: "savepic",
                        label: "保存",
                        click: "savePic"
                    }
                ],
                button10: [
                    {
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
                button11: [
                    {
                        key: "addrow",
                        label: "增行",
                        click: "addRow",
                        clickArg: "ShopWarehouseList",
                        cls: "ui-btn-orange",
                        iconCls: "icon-plus"
                    },
                    {
                        key: "delrow",
                        label: "删行",
                        click: "delChild",
                        clickArg: "ShopWarehouseList",
                        iconCls: "icon-shanchu1"
                    },
                ],
            },
            buttonmenus: {
                buttonmenu1: [
                    {
                        key: "import",
                        label: "导入",
                        iconCls: "icon-import",
                        children: [
                            {
                                key: "importShop",
                                label: "导入主表信息",
                                click: "importShop",
                                auth: true
                            },
                            {
                                key: "importContact",
                                label: "导入门店联系人",
                                click: "importContact",
                                auth: true
                            },
                        ]
                    },
                    {
                        key: "export",
                        label: "导出",
                        iconCls: "icon-export",
                        children: [
                            {
                                key: "exportShop",
                                label: "导出主表信息",
                                click: "exportShop"
                            },
                            {
                                key: "exportContact",
                                label: "导出门店联系人",
                                click: "exportContact"
                            },
                        ]
                    },
                ]
            },
            cards: {
                card1: [
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
                        "type": "refer",
                        "key": "organizationId",
                        "label": "所属组织",
                        "clientParam": {
                            "AUTH_refcod":"shop"
                        }
                    },
                    {
                        "type": "refer",
                        "key": "customerId",
                        "label": "所属客户",
                        "clientParam": {
                            "AUTH_refcod":"shop"
                        }
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
                        domid: "countryIdinfo",
                        "label": "所在国别"
                    },
                    {
                        "type": "refer",
                        "key": "provinceId",
                        "referId": "provinceId",
                        "required": true,
                        "compid": "provinceIdBase",
                        domid: "provinceIdinfo",
                        "label": "所在省份"
                    },
                    {
                        "type": "refer",
                        "key": "cityId",
                        "referId": "cityId",
                        "required": true,
                        "compid": "cityIdBase",
                        domid: "cityIdinfo",
                        "label": "所在城市"
                    },
                    {
                        "type": "refer",
                        "key": "countyId",
                        "referId": "countyId",
                        "required": true,
                        "compid": "countyIdBase",
                        domid: "countyIdinfo",
                        "label": "所在区/县"
                    },
                    {
                        "type": "refer",
                        "key": "townId",
                        "referId": "townId",
                        "compid": "townIdBase",
                        "enable": false,
                        domid: "townIdinfo",
                        "label": "所在街道"
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
                        type: "combo",
                        key: "sourceCode",
                        label: "来源",
                        enable: false,
                        compid: "sourceCode",
                        dataSource: "customerSourceSrc"
                    },
                    {
                        "type": "text",
                        "key": "cusReqFormCode",
                        enable: false,
                        "label": "申请单编码"
                    },

                    {
                        type: "label",
                        key: "isEnable",
                        label: "启用状态",
                        defaultvalue: '0'
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
                        "key": "sourceName",
                        "label": "来源"
                    },
                    {
                        "key": "cusReqFormCode",
                        "label": "申请单编码"
                    },


                    {
                        "computed": "enableFmt",
                        "key": "isEnable",
                        "label": "启用状态"
                    },
                    {
                        "key": "remark",
                        "label": "备注",
                        cls: "ui-textarea-item"
                    },
                ]
            },
            grids: {
                "grid1": {
                    "domid": "grid_1521683062230_dom",
                    "umeta": {
                        "id": "grid_Shop",
                        "data": "ShopList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "code",
                            "dataType": "String",
                            "title": "编码",
                            "renderType": "detailRender"
                        },
                        {
                            "field": "name",
                            "dataType": "String",
                            "title": "名称"
                        },
                        {
                            "field": "shopNatureName",
                            "dataType": "String",
                            "title": "店铺性质"
                        },
                        {
                            "field": "organizationName",
                            "dataType": "String",
                            "title": "所属组织"
                        },
                        {
                            "field": "customerName",
                            "dataType": "String",
                            "title": "所属客户"
                        },

                        {
                            "field": "shopTypeName",
                            "dataType": "String",
                            "title": "店铺类型"
                        },
                        {
                            "field": "countryName",
                            "dataType": "String",
                            "title": "所在国家"
                        },
                        {
                            "field": "provinceName",
                            "dataType": "String",
                            "title": "所在省份"
                        },
                        {
                            "field": "cityName",
                            "dataType": "String",
                            "title": "所在城市"
                        },
                        {
                            "field": "countyName",
                            "dataType": "String",
                            "title": "所在区/县"
                        },
                        {
                            "field": "townName",
                            "dataType": "String",
                            "title": "所在街道"
                        },
                        {
                            "field": "legalPerson",
                            "dataType": "String",
                            "title": "法人代表"
                        },
                        {
                            "field": "credentialsTypeName",
                            "dataType": "String",
                            "title": "证件类型"
                        },

                        {
                            "field": "credentialsNo",
                            "dataType": "String",
                            "title": "证件号码"
                        },
                        {
                            "field": "taxRegNo",
                            "dataType": "String",
                            "title": "税务登记号"
                        },
                        {
                            "field": "businessArea",
                            "dataType": "String",
                            "title": "经营面积"
                        },
                        {
                            "field": "postalCode",
                            "dataType": "String",
                            "title": "邮政编码"
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
                            "field": "businessScope",
                            "dataType": "String",
                            "title": "经营范围"
                        },
                        {
                            "field": "isEnable",
                            "dataType": "String",
                            "title": "启用状态",
                            "renderType": "stateGrid"
                        },
                        {
                            "field": "creator",
                            "dataType": "String",
                            "title": "创建人",
                            "visible": false
                        },
                        {
                            "field": "creationTime",
                            "dataType": "Datetime",
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
                            "dataType": "Datetime",
                            "title": "修改时间",
                            "visible": false
                        },
                        {
                            "field": "operationPic",
                            "dataType": "String",
                            "title": "图片维护",
                            "renderType": "operationPic",
                            "fixed": true,
                            "width": "110px",
                            "visible": false,

                        },
                        {
                            "field": "operation",
                            "dataType": "String",
                            "title": "操作",
                            "renderType": "operation4single",
                            "fixed": true,
                            "width": "110px"
                        }
                    ]
                },
                "grid2": {
                    "domid": "grid_1521683062231_dom",
                    "umeta": {
                        "id": "grid_Contact",
                        "data": "ContactList",
                        "type": "grid",
                        "editable": true,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "code",
                            "dataType": "String",
                            "title": "联系人编码"
                        },
                        {
                            "field": "name",
                            "dataType": "String",
                            "title": "姓名",
                            "required": "true"
                        },
                        {
                            "field": "contactTypeCode",
                            "dataType": "String",
                            "title": "类别",
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
                            "title": "手机",
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
                            "title": "地址"
                        },
                        {
                            "field": "email",
                            "dataType": "String",
                            "title": "邮箱"
                        },
                        {
                            "field": "isDefault",
                            "dataType": "Integer",
                            "editable": true,
                            "renderType": "booleanRender",
                            "title": "是否默认",
                        }
                    ]
                },
                "grid3": {
                    "domid": "grid_1521683062231_dom1",
                    "umeta": {
                        "id": "grid_ShopClerk",
                        "data": "ShopClerkList",
                        "type": "grid",
                        "editable": true,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "personId",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "showField": "personCode",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refcode": "personCode",
                                    "refname": "personName",
                                    "idTypeCode": "idTypeCode",
                                    "idTypeName": "idTypeName",
                                    "idNo": "credentialsNo",
                                    "dateOnBoard": "postStartDate",
                                    "phone": "phone"
                                }
                            }
                        },
                        {
                            "field": "personName",
                            "dataType": "String",
                            "title": "名称",
                            "editable": false
                        },
                        {
                            "field": "postId",
                            "dataType": "String",
                            "title": "岗位",
                            visible: false,
                            "editable": false
                        },
                        {
                            "field": "postName",
                            "dataType": "String",
                            "title": "岗位",
                            "editable": false
                        },
                        {
                            "field": "idTypeCode",
                            "dataType": "String",
                            "title": "证件类型",
                            visible: false,
                            "editable": false
                        },
                        {
                            "field": "idTypeName",
                            "dataType": "String",
                            "title": "证件类型",
                            "editable": false
                        },
                        {
                            "field": "credentialsNo",
                            "dataType": "String",
                            "title": "证件号码",
                            "editable": false
                        },
                        {
                            "field": "phone",
                            "dataType": "String",
                            "title": "手机",
                            "editable": false
                        },
                        {
                            "field": "postStartDate",
                            "dataType": "Date",
                            "title": "入职时间",
                            "editable": false
                        },
                        {
                            "field": "isPostEnd",
                            "dataType": "Integer",
                            "renderType": "booleanRender",
                            "title": "是否离职",
                            "defaultvalue": "1"
                        },
                        {
                             "field": "postEndDate",
                             "dataType": "Date",
                             "title": "离职日期",
                             "editable": false
                        },
                        {
                            "field": "isShopKeeper",
                            "dataType": "Integer",
                            "renderType": "booleanRender",
                            "title": "店长",
                            "defaultvalue": "1"
                        },
                    ]
                },
                "grid4": {
                    "domid": "grid_1521683062231_dom2",
                    "umeta": {
                        "id": "grid_Contact1",
                        "data": "ContactList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": false,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "code",
                            "dataType": "String",
                            "title": "联系人编码",
                        },
                        {
                            "field": "name",
                            "dataType": "String",
                            "title": "姓名",
                            "editable": false
                        },
                        {
                            "field": "contactTypeCode",
                            "dataType": "String",
                            "title": "类别",
                            "editable": true,
                            "editOptions": {
                                "id": "contactTypeComnoId1",
                                "type": "combo",
                                "datasource": "shopContactType"
                            },
                            "editType": "combo",
                            "renderType": "comboRender"
                        },
                        {
                            "field": "tel",
                            "dataType": "String",
                            "title": "电话",
                            "editable": false
                        },
                        {
                            "field": "phone",
                            "dataType": "String",
                            "title": "手机",
                            "editable": false
                        },
                        {
                            "field": "fax",
                            "dataType": "String",
                            "title": "传真",
                            "editable": false
                        },
                        {
                            "field": "address",
                            "dataType": "String",
                            "title": "地址",
                            "editable": false
                        },
                        {
                            "field": "email",
                            "dataType": "String",
                            "title": "邮箱",
                            "editable": false
                        },
                    ]
                },
                "grid5": {
                    "domid": "grid_1521683062232_dom",
                    "umeta": {
                        "id": "grid_ShopClerkList1",
                        "data": "ShopClerkList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": false,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "personCode",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",
                        },
                        {
                            "field": "personName",
                            "dataType": "String",
                            "title": "名称",
                        },
                        {
                            "field": "postName",
                            "dataType": "String",
                            "title": "岗位",
                            "editable": false
                        },
                        {
                            "field": "idTypeName",
                            "dataType": "String",
                            "title": "证件类型",
                            "editable": false
                        },
                        {
                            "field": "credentialsNo",
                            "dataType": "String",
                            "title": "证件号码",
                            "editable": false
                        },
                        {
                            "field": "phone",
                            "dataType": "String",
                            "title": "手机",
                            "editable": false
                        },
                        {
                            "field": "postStartDate",
                            "dataType": "Date",
                            "title": "入职时间",
                            "editable": false
                        },
                        {
                            "field": "isPostEnd",
                            "dataType": "Integer",
                            "renderType": "whetherRender",
                            "title": "是否离职",
                            "defaultvalue": "1"
                        },
                        {
                            "field": "postEndDate",
                            "dataType": "Date",
                            "title": "离职日期",
                            "editable": false
                        },
                        {
                            "field": "isShopKeeper",
                            "dataType": "Integer",
                            "renderType": "whetherRender",
                            "title": "店长",
                            "defaultvalue": "1"
                        },
                    ]
                },
                "grid6": {
                    "domid": "grid_1521683062232_dom",
                    "umeta": {
                        "id": "grid_shopCredPic",
                        "data": "shopCredPicList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "pictureUrl",
                            "dataType": "String",
                            "title": "图片预览",
                            "renderType": "picShow"
                        },
                        {
                            "field": "credentialTypeName",
                            "dataType": "String",
                            "title": "证件类型"
                        }
                    ]
                },
                "grid7": {
                    "domid": "grid_1521683062233_dom",
                    "umeta": {
                        "id": "grid_attach",
                        "data": "FileList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": true,
                        "showNumCol": true,
                        "columnMenu": false
                    },
                    "columns": [
                        {
                            "field": "filename",
                            "dataType": "String",
                            "title": "文件名称"
                        },
                        {
                            "field": "filesize",
                            "dataType": "String",
                            "title": "文件大小"
                        },
                        {
                            "field": "uploadtime",
                            "dataType": "Datetime",
                            "title": "上传时间"
                        }
                    ]
                },
                "grid8": {
                    "domid": "grid_ShopWarehouse_dom1",
                    "umeta": {
                        "id": "grid_ShopWarehouse",
                        "data": "ShopWarehouseList",
                        "type": "grid",
                        "editable": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "warehouseId",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "showField": "warehouseCode",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refcode": "warehouseCode",
                                    "refname": "warehouseName"
                                }
                            }
                        },
                        {
                            "field": "warehouseName",
                            "dataType": "String",
                            "title": "名称",
                            "editable": false
                        },
                        {
                            "field": "isDefault",
                            "dataType": "Integer",
                            "renderType": "booleanRender",
                            "title": "是否默认",
                            "defaultvalue": "0"
                        },
                    ]
                },
                "grid9": {
                    "domid": "grid_ShopWarehouse_dom2",
                    "umeta": {
                        "id": "grid_ShopWarehouse2",
                        "data": "ShopWarehouseList",
                        "type": "grid",
                        "editable": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "warehouseCode",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",

                        },
                        {
                            "field": "warehouseName",
                            "dataType": "String",
                            "title": "名称",
                            "editable": false
                        },
                        {
                            "field": "idDefault",
                            "dataType": "Integer",
                            "renderType": "whetherRender",
                            "title": "是否默认",
                            "defaultvalue": "1"
                        },
                    ]
                },
            }
        }
        return new basemodel(model);
    } else {
        var model = {
            metas: {
                Shopmeta: {
                    params: {
                        "cls": "com.yonyou.ocm.service.dto.ShopDto"
                    },
                    meta: {
                        id: { type: 'string', required: true },//id
                        organizationId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['organization_ocm']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"所属组织"}',
                            "refparam": '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}',
                        },//所属组织
                        organizationCode: { type: 'string' },//所属组织编码
                        organizationName: { type: 'string' },//所属组织名称
                        customerId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['customer']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"所属客户"}',
                            "refparam": '{"EQ_isEnable":"1", "EQ_isFrozen":"0"}',
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
                        businessArea: { type: 'float', validType: "float" },//营业面积
                        postalCode: { type: 'string' },//邮政编码
                        longitude: { type: 'string' },//精度
                        latitude: { type: 'string' },//纬度
                        businessScope: { type: 'string' },//经营范围
                        isEnable: { type: 'integer', required: true, },//启用状态
                        //客户来源
                        sourceCode: {
                            required: true,
                            default: '01',
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['custdocdef']),
                            "refcfg": '{"ctx":"/uitemplate_web","refCode":"CUSTOMER_SOURCE","refName":"来源"}',
                        },
                        sourceName: {
                            type: 'string'
                        },
                        cusReqFormCode: {
                            type: 'string'
                        },//客户申请单编码
                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
                Contactmeta: {//联系人
                    params: {
                        "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
                    },
                    meta: {
                        id: { type: 'string' },//idp
                        shopId: { type: 'string' },//所属门店
                        code: { type: 'string'},//编码
                        name: { type: 'string', required: true },//名称
                        // productid: {type: 'string'},//销售产品id
                        contactTypeId: {
                            type: 'string',
                            required: true,
                            'refmodel': JSON.stringify(refinfo['custdocdef']),
                            'refcfg': '{"ctx":"/uitemplate_web","refCode":"QY019","refName":"联系人列别"}',
                        },//联系人类型
                        contactTypeCode: { type: 'string', required: true, default: '1' },//联系人类型编码
                        contactTypeName: { type: 'string', required: true },//联系人类型名称
                        tel: { type: 'string' },//联系人电话
                        phone: { type: 'string', required: true },//联系人手机
                        fax: { type: 'string' },//传真
                        address: { type: 'string' },//联系人地址
                        email: { type: 'string' },//联系人邮箱
                        isDefault: { type: 'integer', default: 0 }
                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
                shopClerkmeta: {//店员
                    params: {
                        "cls": "cn.com.quanyou.cs.base.service.dto.ShopClerkDto"
                    },
                    meta: {
                        id: { type: 'string' },//idp
                        shopId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['shop']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
                        },//所属门店
                        shopCode: { type: 'string', required: true },//编码
                        shopName: { type: 'string', required: true },//名称
                        personId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['person']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"人员"}',
                        },//人员
                        personCode: { type: 'string', required: true },//编码
                        personName: { type: 'string', required: true },//名称
                        postId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['post']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"所属客户"}',
                        },//岗位
                        postCode: { type: 'string', required: true },//岗位编码
                        postName: { type: 'string', required: true },//岗位名称
                        idTypeCode: {
                            type: 'string',
                            required: true,
                            'refmodel': JSON.stringify(refinfo['custdocdef']),
                            'refcfg': '{"ctx":"/uitemplate_web","refCode":"QY019","refName":"证件类型"}',
                        },//证件类型
                        idTypeName: { type: 'string', required: true },//证件类型名称
                        credentialsNo: { type: 'string' },//证件号码
                        phone: { type: 'string', required: true },//手机
                        postStartDate: { type: 'date' },//入职时间
                        isPostEnd: { type: 'integer', default: 0 },//是否离职
                        isShopKeeper: { type: 'integer', default: 0 },//店长

                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
                shopWarehousemeta: {//仓库
                    params: {
                        "cls": "cn.com.quanyou.cs.base.service.dto.ShopWarehouseDto"
                    },
                    meta: {
                        id: { type: 'string' },//idp
                        shopId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['shop']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"门店"}',
                        },//所属门店
                        shopCode: { type: 'string', required: true },//编码
                        shopName: { type: 'string', required: true },//名称
                        warehouseId: {
                            type: 'string',
                            "refmodel": JSON.stringify(refinfo['warehouse']),
                            "refcfg": '{"ctx":"/uitemplate_web","refname":"仓库"}',
                        },//人员
                        warehouseCode: { type: 'string', required: true },//编码
                        warehouseName: { type: 'string', required: true },//名称
                        isDefault: { type: 'integer', default: 0 },//是否默认

                    },
                    pageSize: 10,
                    //是否启用前端缓存
                    // pageCache: true
                },
            },
            searchs: {
                search1: [
                    {
                        type: "text",
                        key: "code",
                        label: "门店编码",
                    },
                    {
                        type: "text",
                        key: "name",
                        label: "门店名称",
                    },
                    {
                        type: "combo",
                        key: "shopNature",
                        label: "店铺性质",
                        url: appCtx + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY027",
                        namefield: "name",
                        valuefield: "code"
                    },
                    {
                        type: "refer",
                        key: "organization--id",
                        label: "所属组织",
                        refinfo: "organization_ocm",
                        refName: "",
                        clientParam: {
                            "EQ_isEnable": "1", "EQ_orgFuncRel": "01","AUTH_refcod":"shop"
                        }
                    },
                    {
                        type: "refer",
                        key: "customer--id",
                        label: "所属客户",
                        refinfo: "customer",
                        refName: "",
                        clientParam: {
                            "EQ_isEnable": "1",
                        }
                    },
                    {
                        type: "combo",
                        key: "shopType",
                        label: "店铺类型",
                        url: appCtx + "/cust-doc-defs/cust_doc_code?cust_doc_code=QY028",
                        namefield: "name",
                        valuefield: "code"
                    },
                    {
                        type: "refer",
                        key: "province--id",
                        label: "所在省份",
                        refinfo: "region",
                        refName: "行政区划",
                        clientParam: {
                            "EQ_isEnable": "1", "EQ_areaLevel": "1",
                        }
                    },
                    {
                        type: "refer",
                        key: "city--id",
                        label: "所在城市",
                        refinfo: "region",
                        refName: "行政区划",
                        clientParam: {
                            "EQ_isEnable": "1", "EQ_areaLevel": "2",
                        }
                    },
                    {
                        type: "text",
                        key: "shopContacts--name",
                        label: "联系人",
                    },
                    {
                        type: "text",
                        key: "shopContacts--tel",
                        label: "联系人电话",
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
                button1: [
                    {
                        key: "add",
                        label: "新增",
                        iconCls: "icon-plus",
                        click: "beforeEdit",
                        auth: true,
                        buttonShowGroup: "add"
                    },
                    {
                        key: "del",
                        label: "删除",
                        iconCls: "icon-shanchu1",
                        click: "del",
                        // auth: true
                    },
                    {
                        key: "enable",
                        label: "启用",
                        iconCls: "icon-qiyong",
                        click: "enable",
                        // auth: true
                    },
                    {
                        key: "disable",
                        label: "停用",
                        iconCls: "icon-tingyong",
                        click: "disable",
                        // auth: true
                    }
                ],
                button2: [{
                    key: "return",
                    label: "返回",
                    cls: "ui-btn-green",
                    click: "backPanle"
                }
                ],
                button3: [
                    {
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
                button4: [
                    {
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
                    }
                ],
                button5: [
                    {
                        key: "addrow",
                        label: "增行",
                        click: "addRow",
                        clickArg: "ShopClerkList",
                        cls: "ui-btn-orange",
                        iconCls: "icon-plus"
                    },
                    {
                        key: "delrow",
                        label: "删行",
                        click: "delChild",
                        clickArg: "ShopClerkList",
                        iconCls: "icon-shanchu1"
                    },
                ],
                button6: [
                    {
                        key: "cancel",
                        label: "返回",
                        click: "cancelHandle",
                        cls: "ui-btn-green"
                    }
                ],
                button7: [{
                    key: "return",
                    label: "返回",
                    click: "picBack",
                    cls: "ui-btn-green"
                }
                ],
                button8: [
                    {
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
                    click: "onOpenUploadWinShop"
                },
                    {
                        key: "filedel",
                        label: "删除",
                        iconCls: "icon-shanchu1",
                        click: "fileDeleteShop"
                    },
                    {
                        key: "fileview",
                        label: "查看",
                        iconCls: "icon-tubiao-chakan",
                        click: "fileViewShop"
                    },
                    {
                        key: "savepic",
                        label: "保存",
                        iconCls: "icon-tubiao-baocun",
                        click: "savePic"
                    }
                ],
                button10: [
                    {
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
                button11: [
                    {
                        key: "addrow",
                        label: "增行",
                        click: "addRow",
                        clickArg: "ShopWarehouseList",
                        cls: "ui-btn-orange",
                        iconCls: "icon-plus"
                    },
                    {
                        key: "delrow",
                        label: "删行",
                        click: "delChild",
                        clickArg: "ShopWarehouseList",
                        iconCls: "icon-shanchu1"
                    },
                ],
            },
            buttonmenus: {
                buttonmenu1: [
                    {
                        key: "import",
                        label: "导入",
                        iconCls: "icon-import",
                        children: [
                            {
                                key: "importShop",
                                label: "导入主表信息",
                                click: "importShop",
                                auth: true
                            },
                            {
                                key: "importContact",
                                label: "导入门店联系人",
                                click: "importContact",
                                auth: true
                            },
                        ]
                    },
                    {
                        key: "export",
                        label: "导出",
                        iconCls: "icon-export",
                        children: [
                            {
                                key: "exportShop",
                                label: "导出主表信息",
                                click: "exportShop"
                            },
                            {
                                key: "exportContact",
                                label: "导出门店联系人",
                                click: "exportContact"
                            },
                        ]
                    },
                ]
            },
            cards: {
                card1: [
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
                        "type": "refer",
                        "key": "organizationId",
                        "label": "所属组织",
                    },
                    {
                        "type": "refer",
                        "key": "customerId",
                        "label": "所属客户",
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
                        domid: "countryIdinfo",
                        "label": "所在国别"
                    },
                    {
                        "type": "refer",
                        "key": "provinceId",
                        "referId": "provinceId",
                        "required": true,
                        "compid": "provinceIdBase",
                        domid: "provinceIdinfo",
                        "label": "所在省份"
                    },
                    {
                        "type": "refer",
                        "key": "cityId",
                        "referId": "cityId",
                        "required": true,
                        "compid": "cityIdBase",
                        domid: "cityIdinfo",
                        "label": "所在城市"
                    },
                    {
                        "type": "refer",
                        "key": "countyId",
                        "referId": "countyId",
                        "required": true,
                        "compid": "countyIdBase",
                        domid: "countyIdinfo",
                        "label": "所在区/县"
                    },
                    {
                        "type": "refer",
                        "key": "townId",
                        "referId": "townId",
                        "compid": "townIdBase",
                        "enable": false,
                        domid: "townIdinfo",
                        "label": "所在街道"
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
                        type: "combo",
                        key: "sourceCode",
                        label: "来源",
                        enable: false,
                        compid: "sourceCode",
                        dataSource: "customerSourceSrc"
                    },
                    {
                        "type": "text",
                        "key": "cusReqFormCode",
                        enable: false,
                        "label": "申请单编码"
                    },

                    {
                        type: "label",
                        key: "isEnable",
                        label: "启用状态",
                        defaultvalue: '0'
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
                        "key": "sourceName",
                        "label": "来源"
                    },
                    {
                        "key": "cusReqFormCode",
                        "label": "申请单编码"
                    },


                    {
                        "computed": "enableFmt",
                        "key": "isEnable",
                        "label": "启用状态"
                    },
                    {
                        "key": "remark",
                        "label": "备注",
                        cls: "ui-textarea-item"
                    },
                ]
            },
            grids: {
                "grid1": {
                    "domid": "grid_1521683062230_dom",
                    "umeta": {
                        "id": "grid_Shop",
                        "data": "ShopList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "code",
                            "dataType": "String",
                            "title": "编码",
                            "renderType": "detailRender"
                        },
                        {
                            "field": "name",
                            "dataType": "String",
                            "title": "名称"
                        },
                        {
                            "field": "shopNatureName",
                            "dataType": "String",
                            "title": "店铺性质"
                        },
                        {
                            "field": "organizationName",
                            "dataType": "String",
                            "title": "所属组织"
                        },
                        {
                            "field": "customerName",
                            "dataType": "String",
                            "title": "所属客户"
                        },

                        {
                            "field": "shopTypeName",
                            "dataType": "String",
                            "title": "店铺类型"
                        },
                        {
                            "field": "countryName",
                            "dataType": "String",
                            "title": "所在国家"
                        },
                        {
                            "field": "provinceName",
                            "dataType": "String",
                            "title": "所在省份"
                        },
                        {
                            "field": "cityName",
                            "dataType": "String",
                            "title": "所在城市"
                        },
                        {
                            "field": "countyName",
                            "dataType": "String",
                            "title": "所在区/县"
                        },
                        {
                            "field": "townName",
                            "dataType": "String",
                            "title": "所在街道"
                        },
                        {
                            "field": "legalPerson",
                            "dataType": "String",
                            "title": "法人代表"
                        },
                        {
                            "field": "credentialsTypeName",
                            "dataType": "String",
                            "title": "证件类型"
                        },

                        {
                            "field": "credentialsNo",
                            "dataType": "String",
                            "title": "证件号码"
                        },
                        {
                            "field": "taxRegNo",
                            "dataType": "String",
                            "title": "税务登记号"
                        },
                        {
                            "field": "businessArea",
                            "dataType": "String",
                            "title": "经营面积"
                        },
                        {
                            "field": "postalCode",
                            "dataType": "String",
                            "title": "邮政编码"
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
                            "field": "businessScope",
                            "dataType": "String",
                            "title": "经营范围"
                        },
                        {
                            "field": "isEnable",
                            "dataType": "String",
                            "title": "启用状态",
                            "renderType": "stateGrid"
                        },
                        {
                            "field": "creator",
                            "dataType": "String",
                            "title": "创建人",
                            "visible": false
                        },
                        {
                            "field": "creationTime",
                            "dataType": "Datetime",
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
                            "dataType": "Datetime",
                            "title": "修改时间",
                            "visible": false
                        },
                        {
                            "field": "operationPic",
                            "dataType": "String",
                            "title": "图片维护",
                            "renderType": "operationPic",
                            "fixed": true,
                            "width": "110px",
                            "visible": false,

                        },
                        {
                            "field": "operation",
                            "dataType": "String",
                            "title": "操作",
                            "renderType": "operation4single",
                            "fixed": true,
                            "width": "110px"
                        }
                    ]
                },
                "grid2": {
                    "domid": "grid_1521683062231_dom",
                    "umeta": {
                        "id": "grid_Contact",
                        "data": "ContactList",
                        "type": "grid",
                        "editable": true,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "code",
                            "dataType": "String",
                            "title": "联系人编码"
                        },
                        {
                            "field": "name",
                            "dataType": "String",
                            "title": "姓名",
                            "required": "true"
                        },
                        {
                            "field": "contactTypeCode",
                            "dataType": "String",
                            "title": "类别",
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
                            "title": "手机",
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
                            "title": "地址"
                        },
                        {
                            "field": "email",
                            "dataType": "String",
                            "title": "邮箱"
                        },
                        {
                            "field": "isDefault",
                            "dataType": "Integer",
                            "editable": true,
                            "renderType": "booleanRender",
                            "title": "是否默认",
                        }
                    ]
                },
                "grid3": {
                    "domid": "grid_1521683062231_dom1",
                    "umeta": {
                        "id": "grid_ShopClerk",
                        "data": "ShopClerkList",
                        "type": "grid",
                        "editable": true,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "personId",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "showField": "personCode",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refcode": "personCode",
                                    "refname": "personName",
                                    "idTypeCode": "idTypeCode",
                                    "idTypeName": "idTypeName",
                                    "idNo": "credentialsNo",
                                    "dateOnBoard": "postStartDate",
                                    "phone": "phone"
                                }
                            }
                        },
                        {
                            "field": "personName",
                            "dataType": "String",
                            "title": "名称",
                            "editable": false
                        },
                        {
                            "field": "postId",
                            "dataType": "String",
                            "title": "岗位",
                            visible: false,
                            "editable": false
                        },
                        {
                            "field": "postName",
                            "dataType": "String",
                            "title": "岗位",
                            "editable": false
                        },
                        {
                            "field": "idTypeCode",
                            "dataType": "String",
                            "title": "证件类型",
                            visible: false,
                            "editable": false
                        },
                        {
                            "field": "idTypeName",
                            "dataType": "String",
                            "title": "证件类型",
                            "editable": false
                        },
                        {
                            "field": "credentialsNo",
                            "dataType": "String",
                            "title": "证件号码",
                            "editable": false
                        },
                        {
                            "field": "phone",
                            "dataType": "String",
                            "title": "手机",
                            "editable": false
                        },
                        {
                            "field": "postStartDate",
                            "dataType": "Date",
                            "title": "入职时间",
                            "editable": false
                        },
                        {
                            "field": "isPostEnd",
                            "dataType": "Integer",
                            "renderType": "booleanRender",
                            "title": "是否离职",
                            "defaultvalue": "1"
                        },
                        {
                            "field": "isShopKeeper",
                            "dataType": "Integer",
                            "renderType": "booleanRender",
                            "title": "店长",
                            "defaultvalue": "1"
                        },
                    ]
                },
                "grid4": {
                    "domid": "grid_1521683062231_dom2",
                    "umeta": {
                        "id": "grid_Contact1",
                        "data": "ContactList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": false,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "code",
                            "dataType": "String",
                            "title": "联系人编码",
                        },
                        {
                            "field": "name",
                            "dataType": "String",
                            "title": "姓名",
                            "editable": false
                        },
                        {
                            "field": "contactTypeCode",
                            "dataType": "String",
                            "title": "类别",
                            "editable": true,
                            "editOptions": {
                                "id": "contactTypeComnoId1",
                                "type": "combo",
                                "datasource": "shopContactType"
                            },
                            "editType": "combo",
                            "renderType": "comboRender"
                        },
                        {
                            "field": "tel",
                            "dataType": "String",
                            "title": "电话",
                            "editable": false
                        },
                        {
                            "field": "phone",
                            "dataType": "String",
                            "title": "手机",
                            "editable": false
                        },
                        {
                            "field": "fax",
                            "dataType": "String",
                            "title": "传真",
                            "editable": false
                        },
                        {
                            "field": "address",
                            "dataType": "String",
                            "title": "地址",
                            "editable": false
                        },
                        {
                            "field": "email",
                            "dataType": "String",
                            "title": "邮箱",
                            "editable": false
                        },
                    ]
                },
                "grid5": {
                    "domid": "grid_1521683062232_dom",
                    "umeta": {
                        "id": "grid_ShopClerkList1",
                        "data": "ShopClerkList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": false,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "personCode",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",
                        },
                        {
                            "field": "personName",
                            "dataType": "String",
                            "title": "名称",
                        },
                        {
                            "field": "postName",
                            "dataType": "String",
                            "title": "岗位",
                            "editable": false
                        },
                        {
                            "field": "idTypeName",
                            "dataType": "String",
                            "title": "证件类型",
                            "editable": false
                        },
                        {
                            "field": "credentialsNo",
                            "dataType": "String",
                            "title": "证件号码",
                            "editable": false
                        },
                        {
                            "field": "phone",
                            "dataType": "String",
                            "title": "手机",
                            "editable": false
                        },
                        {
                            "field": "postStartDate",
                            "dataType": "Date",
                            "title": "入职时间",
                            "editable": false
                        },
                        {
                            "field": "isPostEnd",
                            "dataType": "Integer",
                            "renderType": "whetherRender",
                            "title": "是否离职",
                            "defaultvalue": "1"
                        },

                        {
                            "field": "isShopKeeper",
                            "dataType": "Integer",
                            "renderType": "whetherRender",
                            "title": "店长",
                            "defaultvalue": "1"
                        },
                    ]
                },
                "grid6": {
                    "domid": "grid_1521683062232_dom",
                    "umeta": {
                        "id": "grid_shopCredPic",
                        "data": "shopCredPicList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "pictureUrl",
                            "dataType": "String",
                            "title": "图片预览",
                            "renderType": "picShow"
                        },
                        {
                            "field": "credentialTypeName",
                            "dataType": "String",
                            "title": "证件类型"
                        }
                    ]
                },
                "grid7": {
                    "domid": "grid_1521683062233_dom",
                    "umeta": {
                        "id": "grid_attach",
                        "data": "FileList",
                        "type": "grid",
                        "editable": false,
                        "multiSelect": true,
                        "showNumCol": true,
                        "columnMenu": false
                    },
                    "columns": [
                        {
                            "field": "filename",
                            "dataType": "String",
                            "title": "文件名称"
                        },
                        {
                            "field": "filesize",
                            "dataType": "String",
                            "title": "文件大小"
                        },
                        {
                            "field": "uploadtime",
                            "dataType": "Datetime",
                            "title": "上传时间"
                        }
                    ]
                },
                "grid8": {
                    "domid": "grid_ShopWarehouse_dom1",
                    "umeta": {
                        "id": "grid_ShopWarehouse",
                        "data": "ShopWarehouseList",
                        "type": "grid",
                        "editable": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "warehouseId",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",
                            "renderType": "ncReferRender",
                            "editType": "ncReferEditType",
                            "showField": "warehouseCode",
                            "editOptions": {
                                "validType": "string",
                                "rel": {
                                    "refcode": "warehouseCode",
                                    "refname": "warehouseName"
                                }
                            }
                        },
                        {
                            "field": "warehouseName",
                            "dataType": "String",
                            "title": "名称",
                            "editable": false
                        },
                        {
                            "field": "isDefault",
                            "dataType": "Integer",
                            "renderType": "booleanRender",
                            "title": "是否默认",
                            "defaultvalue": "0"
                        },
                    ]
                },
                "grid9": {
                    "domid": "grid_ShopWarehouse_dom2",
                    "umeta": {
                        "id": "grid_ShopWarehouse2",
                        "data": "ShopWarehouseList",
                        "type": "grid",
                        "editable": true,
                        "showNumCol": true
                    },
                    "columns": [
                        {
                            "field": "warehouseCode",
                            "required": "true",
                            "dataType": "String",
                            "title": "编码",

                        },
                        {
                            "field": "warehouseName",
                            "dataType": "String",
                            "title": "名称",
                            "editable": false
                        },
                        {
                            "field": "idDefault",
                            "dataType": "Integer",
                            "renderType": "whetherRender",
                            "title": "是否默认",
                            "defaultvalue": "1"
                        },
                    ]
                },
            }
        }
        return new basemodel(model);
    }

})
