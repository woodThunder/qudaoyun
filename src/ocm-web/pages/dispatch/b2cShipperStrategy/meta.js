define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            shipperStrategymeta: {
                params: {
                    "cls": "com.yonyou.occ.dispatch.service.dto.B2cMatchStrategyDto"
                },
                meta: {
                    code: { type: 'string' ,required:true},//策略编码
                    name: { type: 'string' ,required:true},//策略名称
                    dimension: { type: 'string' ,required:true},//优先维度
                    branchMethod: { type: 'string'},//分仓策略
                    logisticsModeCode: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"LOGISTICS_MODE","refName":"物流方式"}',
                        required: true
                    },//适用发货方 物流方式
                    logisticsModeName: {
                        type: 'string'
                    }
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [
                {
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
                }
            ]
        },
        searchs: {
            search1: [
                {
                    type: "combo",
                    key: "logisticsMode",
                    label: "适用发货方",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=LOGISTICS_MODE",
                    namefield: "name",
                    valuefield: "code"
                },
                {
                    type: "text",
                    key: "code",
                    label: "策略编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "策略名称"
                }
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "text",
                    key: "code",
                    label: "策略编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "策略名称"
                },
                {
                    type: "combo",
                    key: "dimension",
                    label: "优先维度",
                    dataSource: [
                        { value: "1", name: "四级收货地址" },
                        { value: "2", name: "商品或产品线" }
                    ]
                },
                {
                    type: "combo",
                    key: "logisticsModeCode",
                    label: "适用发货方",
                    url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=LOGISTICS_MODE",
                    namefield: "name",
                    valuefield: "code",
                },
                {
                    type: "combo",
                    key: "branchMethod",
                    compid: "branchMethodId",
                    label: "分仓策略",
                    dataSource: [
                        { value: "1", name: "单仓" },
                        { value: "2", name: "分仓" }
                    ],
                    enable: false
                }
            ]
        },
        grids: {
            grid1: {
                domid: "shipperStrategy",
                umeta: {
                    id: "grid_shipper",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [
                    {
                        field: "code",
                        dataType: "String",
                        title: "策略编码"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "策略名称"
                    },
                    {
                        field: "dimension",
                        dataType: "String",
                        title: "优先维度",
                        renderType: "dimensionRender"
                    },
                    {
                        field: "logisticsModeName",
                        dataType: "String",
                        title: "适用发货方"
                    },
                    {
                        field: "branchMethod",
                        dataType: "String",
                        title: "分仓策略",
                        renderType: "branchMethodRender"
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    }
                ]
            }
        }
    };
    return new basemodel(model);
});