define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            Goodsmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.AdminiDiviDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    productId: {//所属产品
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['product']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },//所属产品
                    productCode: { type: 'string' },//所属产品
                    productName: { type: 'string' },//所属产品

                    code: { type: 'string', required: true, },//编码
                    displayName: {
                        type: 'string',
                        required: true
                    }, //显示名称
                    name: {
                        type: 'string',
                        required: true
                    }, //名称
                    abbrName: {
                        type: 'string'
                    }, //简称
                    goodsCategoryId: {//商品分类
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['goodsCategory']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },
                    goodsCategoryCode: { type: 'string' },//商品分类
                    goodsCategoryName: { type: 'string' },//商品分类

                    prodAttrStrucId: {//特征属性
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['prodAttrStruc']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },
                    prodAttrStrucCode: { type: 'string' },//特征属性
                    prodAttrStrucName: { type: 'string' },//特征属性
                    model: { type: 'string' },//型号
                    specification: { type: 'string' },//规格
                    brandId: {//品牌
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['brand']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },
                    brandCode: { type: 'string' },//品牌
                    brandName: { type: 'string' },//品牌

                    productLineId: {//产品线
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['productLine']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },
                    productLineCode: { type: 'string' },//产品线
                    productLineName: { type: 'string' },//产品线
                    basicUnitId: {//基本单位
                        type: 'string',
                        //required: true,
                        'refmodel': JSON.stringify(refinfo['utils']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                        required: true
                    },
                    basicUnitCode: { type: 'string' },//基本单位
                    basicUnitName: { type: 'string' },//基本单位
                    assistUnitId: {//辅助单位
                        type: 'string',
                        // required: true,
                        'refmodel': JSON.stringify(refinfo['utils']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                        required: true
                    },
                    assistUnitCode: { type: 'string' },//辅助单位
                    assistUnitName: { type: 'string' },//辅助单位
                    conversionRate: { type: 'integer', required: true, },//换算率
                    enableBatchNumberManage: { type: 'integer', required: true },//启用批次号管理

                    goodsLifecycleCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"GOODS_LIFECYCLE","refName":"商品生命周期"}'
                    },
                    goodsLifecycleName: { type: 'string' },//商品生命周期
                    productionCycle: { type: 'string' },//商品生产周期
                    isNew: { type: 'integer', required: true },//新品
                    externalLength: { type: 'string' },//外观长度
                    externalWidth: { type: 'string' },//外观宽度
                    externalHeight: { type: 'string' },//外观高度
                    externalDiameter: { type: 'string' },//外观直径
                    externalSize: { type: 'string' },//外观尺寸
                    packLength: { type: 'string' },//包装长度
                    packWidth: { type: 'string' },//包装宽度
                    packHeight: { type: 'string' },//包装高度
                    packDiameter: { type: 'string' },//包装直径
                    packSize: { type: 'string' },//包装尺寸

                    volume: { type: 'string' },//体积
                    volumeUnitId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['utils']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },//体积单位
                    volumeUnitCode: { type: 'string' },//体积单位
                    volumeUnitName: { type: 'string' },//体积单位
                    netWeight: { type: 'string' },//净重
                    grossWeight: { type: 'string' },//毛重
                    weightUnitId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['utils']),
                        'refcfg': '{"ctx":"/uitemplate_web"}',
                    },//重量单位
                    weightUnitCode: { type: 'string' },//重量单位
                    weightUnitName: { type: 'string' },//重量单位
                    description: { type: 'string' },//描述
                    isEnable: { type: 'integer', required: true },//启用状态
                    isOnShelf: { type: 'integer', required: true },//上架
                    goodsAttrVals: { type: 'string' },
                    price: { type: 'float' },
                    alias: { type: 'string' },
                    version: { type: 'integer' },//版本号
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            }
        },

        //操作按钮组
        buttons: {
            button1: [
                {
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    clickArg: "-1",
                    click: "beforeEdit"
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle"
                },
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
                },
                {
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enable"
                },
                {
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disable"
                },
                {
                    key: "onshelf",
                    label: "上架",
                    iconCls: "icon-qiyong",
                    click: "onshelf"
                },
                {
                    key: "unonshelf",
                    label: "下架",
                    iconCls: "icon-tingyong",
                    click: "unonshelf"
                },
            ],
            button2: [{
                key: "return",
                label: "返回",
                cls: "ui-btn-green",
                click: "backPanel"
            }],
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
            button4: [{
                key: "delAttach",
                label: "删除",
                click: "btnDelAttach",
                iconCls: "icon-shanchu1"
            }, {
                key: "uploadAttach",
                label: "上传",
                click: "btnUploadAttach",
                iconCls: "icon-tubiao-shangchuan"
            },
            {
                key: "downLoadAttach",
                label: "下载",
                click: "downLoadAttachBatch",
                iconCls: "icon-tubiao-xiazai"
            }
            ],
        },
        //查询条件组
        searchs: {
            search1: [

                {
                    type: "text",
                    key: "code",
                    label: "编码"
                },
                {
                    type: "text",
                    key: "displayName",
                    label: "全称",
                },
                {
                    type: "refer",
                    key: "goodsCategory--id",
                    label: "商品分类",
                    refinfo: "goodsCategory",
                },
                {
                    type: "refer",
                    key: "product--id",
                    label: "所属产品",
                    refinfo: "product",
                },
                {
                    type: "refer",
                    key: "productLine--id",
                    label: "产品线",
                    refinfo: "productLine",
                },
                {
                    type: "refer",
                    key: "brand--id",
                    label: "品牌",
                    refinfo: "brand",
                },
                {
                    type: "text",
                    key: "specification",
                    label: "规格"
                },
                {
                    type: "text",
                    key: "model",
                    label: "型号"
                },

                {
                    type: "radio",
                    key: "enableBatchNumberManage",
                    label: "启用批次号管理",
                    dataSource: [{
                        value: '',
                        name: '全部'
                    }, {
                        value: '1',
                        name: '是'
                    },
                    {
                        value: '0',
                        name: '否'
                    }]
                },

                {
                    type: "radio",
                    key: "isNew",
                    label: "新品推荐",
                    dataSource: [{
                        value: '',
                        name: '全部'
                    }, {
                        value: '1',
                        name: '是'
                    },
                    {
                        value: '0',
                        name: '否'
                    }]
                },
                {
                    type: "combo",
                    key: "isEnable",
                    defaultvalue: "1",
                    label: "启用状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '未启用' },
                        { value: '1', name: '已启用' },
                        { value: '2', name: '已停用' },
                        { value: '3', name: '未停用' }
                    ]
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
            card1: [
                {
                    type: "refer",
                    key: "productId",
                    label: "所属产品",
                },
                {
                    type: "text",
                    key: "code",
                    label: "编码",
                },
                {
                    type: "text",
                    key: "displayName",
                    label: "全称"
                },
                {
                    type: "text",
                    key: "abbrName",
                    label: "简称"
                },
                {
                    type: "text",
                    key: "version",
                    label: "版本号",
                    enable: false
                },
                {
                    type: "refer",
                    compid: "goodscategoryId",
                    key: "goodsCategoryId",
                    label: "商品分类",
                },

                {
                    type: "text",
                    key: "model",
                    label: "型号"
                },
                {
                    type: "text",
                    key: "specification",
                    label: "规格"
                },
                {
                    type: "refer",
                    compid: "brandId",
                    key: "brandId",
                    label: "品牌",
                },
                {
                    type: "refer",
                    compid: "productLineId",
                    key: "productLineId",
                    label: "产品线",
                },
                {
                    type: "refer",
                    compid: "basicUnitId",
                    key: "basicUnitId",
                    label: "基本单位",
                },
                {
                    type: "refer",
                    compid: "assistUnitId",
                    key: "assistUnitId",
                    label: "辅助单位",
                },
                {
                    type: "text",
                    compid: "conversionRate",
                    key: "conversionRate",
                    label: "换算率"
                },
                {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: "0"
                }
                // {
                //     type: "refer",
                //     key: "ownerOrganizationId",
                //     label: "所属组织",
                // },
                // {
                //     type: "refer",
                //     key: "ownerCustomerId",
                //     label: "所属客户",
                // },
            ],

            card2: [{
                type: "refer",
                compid: "prodAttrStrucId",
                key: "prodAttrStrucId",
                label: "特征属性",
            }],
            card3: [

                {
                    type: "radio",
                    key: "enableBatchNumberManage",
                    label: "启用批次号管理", defaultvalue: "0",
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
                    type: 'text',
                    label: '生产周期（天）',
                    key: 'productionCycle',
                },
                {
                    type: "combo",
                    key: "goodsLifecycleCode",
                    label: "商品生命周期",
                    dataSource: "goodsLifecycleDatasource"
                },
                {
                    type: "radio",
                    key: "isNew",
                    label: "新品推荐",
                    defaultvalue: "0",
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
                    type: "radio",
                    key: "isOnShelf",
                    label: "上架",
                    defaultvalue: "0",
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

            ],
            card4: [{
                type: "text",
                key: "externalLength",
                label: "外观长度"
            },
            {
                type: "text",
                key: "externalWidth",
                label: "外观宽度"
            },
            {
                type: "text",
                key: "externalHeight",
                label: "外观高度"
            },
            {
                type: "text",
                key: "externalDiameter",
                label: "外观直径"
            },
            {
                type: "text",
                key: "externalSize",
                label: "外观尺寸"
            },
            {
                type: "text",
                key: "packLength",
                label: "包装长度"
            },
            {
                type: "text",
                key: "packWidth",
                label: "包装宽度"
            },
            {
                type: "text",
                key: "packHeight",
                label: "包装高度"
            },
            {
                type: "text",
                key: "packDiameter",
                label: "包装直径"
            },
            {
                type: "text",
                key: "packSize",
                label: "包装尺寸"
            },
            {
                type: "text",
                key: "volume",
                label: "体积"
            },
            {
                type: "refer",
                key: "volumeUnitId",
                label: "体积单位",
            },
            {
                type: "text",
                key: "netWeight",
                label: "净重"
            },
            {
                type: "text",
                key: "grossWeight",
                label: "毛重"
            },
            {
                type: "refer",
                key: "weightUnitId",
                label: "重量单位",
            },
                // {
                //     type: "text",
                //     key: "description",
                //     label: "描述"
                // },
            ],
            // card4: [{
            //     type: "text",
            //     key: "description",
            //     label: "描述",
            //     cls: "ui-textarea-item"
            // }]
        },

        details: {
            detail1: [
                {
                    key: "productName",
                    label: "所属产品",
                },
                {
                    key: "code",
                    label: "编码",
                },
                {
                    key: "displayName",
                    label: "全称"
                },
                {
                    key: "abbrName",
                    label: "简称"
                },
                {
                    key: "version",
                    label: "版本号"
                },
                {
                    key: "goodsCategoryName",
                    label: "商品分类",
                },

                {
                    key: "model",
                    label: "型号"
                },
                {
                    key: "specification",
                    label: "规格"
                },
                {
                    key: "brandName",
                    label: "品牌",
                },
                {
                    key: "productLineName",
                    label: "产品线",
                },
                {
                    key: "brandName",
                    label: "品牌",
                },
                {
                    key: "goodsLifecycleName",
                    label: "生命周期",
                },
                {
                    key: "basicUnitName",
                    label: "基本单位",
                },
                {
                    key: "assistUnitName",
                    label: "辅助单位",
                },
                {
                    key: "conversionRate",
                    label: "换算率"
                },
                {
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
                label: "特征属性",
            }],
            detail3: [
                {
                    key: "enableBatchNumberManage",
                    label: "启用批次号管理",
                    computed: "isEnableBatchNumberManage"
                },
                {
                    key: "productionCycle",
                    label: "生产周期（天）",
                },
                {
                    key: "goodsLifecycleName",
                    label: "商品生命周期",
                },
                {
                    key: "isNew",
                    label: "新品推荐",
                    computed: "isNewcomp"
                },
                {
                    key: "isOnShelf",
                    label: "上架",
                    computed: "isNewcomp"
                },
            ],
            detail4: [
                {
                    key: "externalLength",
                    label: "外观长度"
                },
                {
                    key: "externalWidth",
                    label: "外观宽度"
                },
                {
                    key: "externalHeight",
                    label: "外观高度"
                },
                {
                    key: "externalDiameter",
                    label: "外观直径"
                },
                {
                    key: "externalSize",
                    label: "外观尺寸"
                },
                {
                    key: "packLength",
                    label: "包装长度"
                },
                {
                    key: "packWidth",
                    label: "包装宽度"
                },
                {
                    key: "packHeight",
                    label: "包装高度"
                },
                {
                    key: "packDiameter",
                    label: "包装直径"
                },
                {
                    key: "packSize",
                    label: "包装尺寸"
                },
                {
                    key: "volume",
                    label: "体积"
                },
                {
                    key: "volumeUnitName",
                    label: "体积单位",
                },
                {
                    key: "netWeight",
                    label: "净重"
                },
                {
                    key: "grossWeight",
                    label: "毛重"
                },
                {
                    key: "weightUnitName",
                    label: "重量单位",
                },

            ],
            detail5: [{
                key: "description",
                label: "描述",
                cls: "ui-textarea-item"
            },]
        },
        //弹窗组
        dialogs: {
            dialog1: [
                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    refinfo: "country",
                    refName: "国家",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "code",
                    label: "行政区域编码",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    label: "简称",
                },
                {
                    type: "text",
                    key: "displayName",
                    label: "全称"
                },

                {
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
                    label: "启用状态",
                },
                {
                    type: "text",
                    key: "postcode",
                    label: "邮编",
                },
                // {
                //     type: "textarea",
                //     key: "description",
                //     label: "描述",
                //     cls: "ui-textarea-item"
                // }
            ],
            dialog2: [
                {
                    type: "float",
                    key: "price",
                    label: "价格",
                },
                {
                    type: "text",
                    key: "alias",
                    label: "别名",
                }
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
                },
                columns: [
                    {
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
                        title: "显示名称",
                    }, {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    }, {
                        field: "abbrName",
                        dataType: "String",
                        title: "简称",
                    }, {
                    //     field: "abbrName",
                    //     dataType: "String",
                    //     title: "简称",
                    // }, {
                        field: "version",
                        dataType: "String",
                        title: "版本号",
                        title: "版本",
                    },
                    {
                        field: "goodsCategoryName",
                        dataType: "String",
                        title: "商品分类"
                    },
                    {
                        field: "prodAttrStrucName",
                        dataType: "String",
                        title: "特征属性",
                        visible: false
                    },
                    {
                        field: "productName",
                        dataType: "String",
                        title: "所属产品",
                    },
                    {
                        field: "specification",
                        dataType: "String",
                        title: "规格",
                    },
                    {
                        field: "model",
                        dataType: "String",
                        title: "型号",
                    },
                    {
                        field: "brandName",
                        dataType: "String",
                        title: "品牌",
                    },
                    {
                        field: "productLineName",
                        dataType: "String",
                        title: "产品线",
                        visible: false
                        // visible: false
                    },
                    {
                        field: "basicUnitName",
                        dataType: "String",
                        title: "基本单位",
                        visible: false
                        // visible: false
                    },
                    {
                        field: "assistUnitName",
                        dataType: "String",
                        title: "辅助单位",
                        visible: false
                    },
                    {
                        field: "conversionRate",
                        dataType: "String",
                        title: "换算率",
                        visible: false
                    },
                    {
                        field: "enableBatchNumberManage",
                        dataType: "String",
                        title: "启用批次号管理",
                        renderType: "whetherRender",
                        visible: false
                    },
                    {
                        field: "prodAttrStrucName",
                        dataType: "String",
                        title: "特征属性",
                        visible: false
                    },
                    {
                        field: "isNew",
                        dataType: "String",
                        title: "新品推荐",
                        renderType: "whetherRender"
                    },
                    {
                        field: "isOnShelf",
                        dataType: "String",
                        title: "上架",
                        renderType: "whetherRender"
                    },
                    {
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
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation",
                        fixed: true,
                        width: "180px"
                    }
                ]
            }
        },
    };
    return new basemodel(model);
});



