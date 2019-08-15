define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            CustomerAddressmeta: {
                meta: {
                    id: {type: 'string'},//id
                    customerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//客户
                    customerCode: {type: 'string'},//客户
                    customerName: {type: 'string'},//客户
                    code: {type: 'string', required: true},//编码
                    name: {type: 'string', required: true},//名称

                    //国家
                    countryId: {
                        type: 'string',
                        // required: true,
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },//国别ID
                    countryName: {type: 'string'},//国家名称
                    provinceId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}',
                    },//所在省份ID
                    provinceName: {type: 'string'},//所在省份名称
                    cityId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    },//所在城市ID
                    cityName: {type: 'string'},//所在城市名称
                    cityCode: {type: 'string'},
                    countyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    },//所在区/县
                    countyName: {type: 'string'},//所在区/县名称
                    countyCode: {type: 'string'},
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"5"}'
                    },//所在街道/镇
                    townName: {type: 'string'},//所在街道/镇名称
                    townCode: {type: 'string'},
                    detailAddr: {type: 'string'},//详细地址
                    longitude: {type: 'float'},//经度
                    latitude: {type: 'float'},//纬度
                    fax: {type: 'string'},//传真
                    standardLogisticPeriod: {type: 'string'},//标准物流周期
                    firstReceiver: {type: 'string'},//收货第一联系人姓名
                    firstReceiverTel: {type: 'string'},//收货第一联系人电话
                    firstReceiverPhone: {type: 'string'},//收货第一联系人手机
                    secondReceiver: {type: 'string'},//收货第二联系人姓名
                    secondReceiverTel: {type: 'string'},//收货第二联系人电话
                    secondReceiverPhone: {type: 'string'},//收货第二联系人手机
                    thirdReceiver: {type: 'string'},//收货第三联系人姓名
                    thirdReceiverTel: {type: 'string'},//收货第三联系人电话
                    thirdReceiverPhone: {type: 'string'},//收货第三联系人手机
                    isDefault: {type: 'integer', default: 1},//是否默认
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
                    type: "refer",
                    key: "customerId",
                    label: "客户",
                }, {
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
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    enable: false,
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    enable: false,
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "townIdinfo",
                    compid: "townIdBase",
                    enable: false,
                },
                {
                    type: "text",
                    key: "detailAddr",
                    label: "详细地址",
                    required: true,
                },
                {
                    type: "text",
                    key: "longitude",
                    label: "经度",
                },
                {
                    type: "text",
                    key: "latitude",
                    label: "纬度",
                },
                {
                    type: "text",
                    key: "fax",
                    label: "传真"
                },
                {
                    type: "text",
                    key: "standardLogisticPeriod",
                    label: "标准物流周期"
                },
                {
                    type: "text",
                    key: "firstReceiver",
                    label: "收货第一联系人姓名"
                },
                {
                    type: "text",
                    key: "firstReceiverTel",
                    label: "收货第一联系人电话"
                },
                {
                    type: "text",
                    key: "firstReceiverPhone",
                    label: "收货第一联系人手机"
                },
                {
                    type: "radio",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: "1",
                    dataSource: [
                        {value: '', name: '全部'},
                        {value: '1', name: '启用'},
                        {value: '0', name: '停用'}
                    ]
                }

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
                    type: "refer",
                    key: "customerId",
                    label: "客户",
                }, {
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
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    enable: false,
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    enable: false,
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "townIdinfo",
                    compid: "townIdBase",
                    enable: false,
                },
                {
                    type: "text",
                    key: "detailAddr",
                    label: "详细地址",
                    required: true,
                },
                {
                    type: "text",
                    key: "longitude",
                    label: "经度",
                },
                {
                    type: "text",
                    key: "latitude",
                    label: "纬度",
                },
                {
                    type: "text",
                    key: "fax",
                    label: "传真"
                },
                {
                    type: "text",
                    key: "standardLogisticPeriod",
                    label: "标准物流周期"
                },
                {
                    type: "text",
                    key: "firstReceiver",
                    label: "收货第一联系人姓名"
                },
                {
                    type: "text",
                    key: "firstReceiverTel",
                    label: "收货第一联系人电话"
                },
                {
                    type: "text",
                    key: "firstReceiverPhone",
                    label: "收货第一联系人手机"
                },
                {
                    type: "text",
                    key: "secondReceiver",
                    label: "收货第二联系人姓名"
                },
                {
                    type: "text",
                    key: "secondReceiverTel",
                    label: "收货第二联系人电话"
                },
                {
                    type: "text",
                    key: "secondReceiverPhone",
                    label: "收货第二联系人手机"
                },
                {
                    type: "text",
                    key: "thirdReceiver",
                    label: "收货第三联系人姓名"
                },
                {
                    type: "text",
                    key: "thirdReceiverTel",
                    label: "收货第三联系人电话"
                },
                {
                    type: "text",
                    key: "thirdReceiverPhone",
                    label: "收货第三联系人手机"
                },
                {
                    type: "radio",
                    key: "isDefault",
                    label: "是否默认",
                    dataSource: [
                        {value: '1', name: '是'},
                        {value: '0', name: '否'},
                    ],
                    defaultvalue: "0"
                },

            ]
        },
        grids: {
            grid1: {
                domid: "prodgroup",
                umeta: {
                    id: "grid_prodgroup",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "code",
                    dataType: "String",
                    title: "编码"
                },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称"
                    },
                    {
                        field: "customerName",
                        dataType: "String",
                        title: "客户",
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
                    }, {
                        field: "longitude",
                        dataType: "String",
                        title: "经度",
                        visible: "false"
                    }, {
                        field: "latitude",
                        dataType: "String",
                        title: "纬度",
                        visible: "false"
                    },
                    {
                        field: "standardLogisticPeriod",
                        dataType: "String",
                        title: "标准物流周期",
                        visible: "false"
                    },
                    {
                        field: "fax",
                        dataType: "String",
                        title: "传真",
                        visible: "false"
                    },
                    {
                        field: "firstReceiver",
                        dataType: "String",
                        title: "收货第一联系人姓名",
                        visible: "false"
                    },
                    {
                        field: "firstReceiverTel",
                        dataType: "String",
                        title: "收货第一联系人电话",
                        visible: "false"
                    },
                    {
                        field: "firstReceiverPhone",
                        dataType: "String",
                        title: "收货第一联系人手机",
                        visible: "false"
                    },
                    {
                        field: "secondReceiver",
                        dataType: "String",
                        title: "收货第二联系人姓名",
                        visible: "false"
                    },
                    {
                        field: "secondReceiverTel",
                        dataType: "String",
                        title: "收货第二联系人电话",
                        visible: "false"
                    },
                    {
                        field: "secondReceiverPhone",
                        dataType: "String",
                        title: "收货第二联系人手机",
                        visible: "false"
                    },
                    {
                        field: "thirdReceiver",
                        dataType: "String",
                        title: "收货第三联系人姓名",
                        visible: "false"
                    },
                    {
                        field: "thirdReceiverTel",
                        dataType: "String",
                        title: "收货第三联系人电话",
                        visible: "false"
                    },
                    {
                        field: "thirdReceiverPhone",
                        dataType: "String",
                        title: "收货第三联系人手机",
                        visible: "false"
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
                    }, {
                        field: "isDefault",
                        dataType: "String",
                        title: "是否默认",
                        renderType: "whetherRender"
                    },

                ]
            }
        }
    };
    return new basemodel(model);
});

