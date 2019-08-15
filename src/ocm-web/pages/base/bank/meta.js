define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            bankmeta: {
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    abbrName: { type: 'string' },//简称
                    bankCategoryCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"BANK_CATEGORY","refName":"银行类别"}',
                    },//银行类别
                    bankCategoryName: { type: 'string' },//银行类别
                    superiorBankId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['bank']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//上级银行
                    superiorBankCode: { type: 'string' },//上级银行
                    superiorBankName: { type: 'string' },//上级银行

                    //国家
                    countryId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    },//国别ID
                    countryName: { type: 'string' },//国家名称
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
                    },//所在省份ID
                    provinceName: { type: 'string' },//所在省份名称
                    provinceCode: { type: 'string' },//所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
                    },//所在城市ID
                    cityName: { type: 'string' },//所在城市名称
                    cityCode: { type: 'string' },
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
                    },//所在区/县
                    countyName: { type: 'string' },//所在区/县名称
                    countyCode: { type: 'string' },
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4","EQ_isEnable":"1"}'
                    },//所在街道/镇
                    townName: { type: 'string' },//所在街道/镇名称
                    townCode: { type: 'string' },
                    detailAddr: { type: 'string' },//详细地址
                    contact: { type: 'string' },//联系人
                    tel: { type: 'string' },//电话号码
                    email: { type: 'string' },//邮箱
                    fax: { type: 'string' },//传真
                    isEnable: { type: 'integer', required: true },//启用
                },
                pageSize: 10,
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit"
            },
            {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
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
            }
            ]
        },
        searchs: {
            search1: [{
                type: "text",
                key: "code",
                label: "编码"
            },
            {
                type: "text",
                key: "name",
                label: "名称",
            },
            {
                type: "combo",
                key: "bankCategory",
                label: "银行类别",
                url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=BANK_CATEGORY',
                namefield: "name",
                valuefield: "code"
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
            },
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码"
            },
            {
                type: "text",
                key: "name",
                label: "名称",
            },
            {
                type: "text",
                key: "abbrName",
                label: "简称",
            },
            {
                type: "combo",
                key: "bankCategoryCode",
                label: "银行类别",
                url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=BANK_CATEGORY',
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "refer",
                key: "superiorBankId",
                compid: "bank",
                label: "上级银行",
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
                domid: "provinceIdinfo",
                compid: "provinceIdBase",
            },
            {
                type: "refer",
                key: "cityId",
                label: "所在城市",
                domid: "cityIdinfo",
                compid: "cityIdBase",
            },
            {
                type: "refer",
                key: "countyId",
                label: "所在区/县",
                domid: "countyIdinfo",
                compid: "countyIdBase",
            },
            {
                type: "refer",
                key: "townId",
                label: "所在街道",
                domid: "townIdinfo",
                compid: "townIdBase",
            },
            {
                type: "text",
                key: "detailAddr",
                label: "详细地址",
            },
            {
                type: "text",
                key: "contact",
                label: "联系人",
            },
            {
                type: "text",
                key: "tel",
                label: "电话",
            },
            {
                type: "text",
                key: "email",
                label: "邮箱",
            },
            {
                type: "text",
                key: "fax",
                label: "传真",
            },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: '0'
            },
            ]
        },
        details: {
            detail1: [{
                key: "code",
                label: "编码"
            },
            {
                key: "name",
                label: "名称",
            },
            {
                key: "abbrName",
                label: "简称",
            },
            {
                key: "bankCategoryName",
                label: "银行类别",
            },
            {
                key: "superiorBankName",
                label: "上级银行",
            },
            {
                key: "countryName",
                label: "国家",
            },
            {
                key: "provinceName",
                label: "所在省份",
            },
            {
                key: "cityName",
                label: "所在城市",
            },
            {
                key: "countyName",
                label: "所在区/县",
            },
            {
                key: "townName",
                label: "所在街道",
            },
            {
                type: "text",
                key: "detailAddr",
                label: "详细地址",
            },
            {
                type: "text",
                key: "contact",
                label: "联系人",
            },
            {
                type: "text",
                key: "tel",
                label: "电话",
            },
            {
                type: "text",
                key: "email",
                label: "邮箱",
            },
            {
                type: "text",
                key: "fax",
                label: "传真",
            },
            {
                key: "isEnable",
                "computed": "enableFmt",
                label: "状态",
            },
            ]
        },
        grids: {
            grid1: {
                domid: "warehouse",
                umeta: {
                    id: "grid_warehouse",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码",
                    "renderType": "detailRender"
                },
                {
                    field: "name",
                    dataType: "String",
                    title: "名称"
                },
                {
                    field: "abbrName",
                    dataType: "String",
                    title: "简称"
                },
                {
                    field: "bankCategoryName",
                    dataType: "String",
                    title: "银行类别",
                },
                {
                    field: "superiorBankName",
                    dataType: "String",
                    title: "上级银行",
                },
                {
                    field: "countryName",
                    dataType: "String",
                    title: "所在国家",
                    visible: "false"
                }, {
                    field: "provinceName",
                    dataType: "String",
                    title: "所在省份",
                    visible: "false"
                }, {
                    field: "countyName",
                    dataType: "String",
                    title: "所在区/县",
                    visible: "false"
                }, {
                    field: "townName",
                    dataType: "String",
                    title: "所在街道",
                    visible: "false"
                }, {
                    field: "detailAddr",
                    dataType: "String",
                    title: "详细地址",
                    visible: "false"
                },
                {
                    field: "contact",
                    dataType: "String",
                    title: "联系人",
                    visible: "false"
                }, {
                    field: "tel",
                    dataType: "String",
                    title: "电话号码",
                    visible: "false"
                }, {
                    field: "email",
                    dataType: "String",
                    title: "邮箱",
                    visible: "false"
                }, {
                    field: "fax",
                    dataType: "String",
                    title: "传真",
                    visible: "false"
                },

                {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
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
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                },
                ]
            }
        }
    };
    return new basemodel(model);
});

