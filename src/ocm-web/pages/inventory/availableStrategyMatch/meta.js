define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            unitmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.UnitDto"
                },
                meta: {
                    avaSetType: { required: true,type: 'string' },//设置类型
                    organizationId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    },//组织
                    organizationCode: { type: 'string' },//组织
                    organizationName: { type: 'string' },//组织

                    orgFuncId:{ type: 'string' },//职能
                    orgFuncCode:{ type: 'string' },//职能
                    orgFuncName:{ type: 'string' },//职能

                    billTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['billtype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        // refparam: '{"EQ_isEnable":"1","IN_code":"SaleOrder,DeliveryOrder,PurchaseBill,Transfer,ReturnIn"}'
                        refparam: '{"EQ_isEnable":"1","IN_code":"SaleOrder"}'
                    },//订单类型
                    billTypeCode: { type: 'string' },//订单类型
                    billTypeName: { type: 'string' },//订单类型
                    saleTypeId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['trantype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_isEnable":"1"}',
                    },//交易类型
                    saleTypeName: { type: 'string' },//交易类型
                    saleTypeCode: { type: 'string' },//交易类型

                    stockOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },//库存组织
                    stockOrgCode: { type: 'string' },//库存组织
                    stockOrgName: { type: 'string' },//库存组织

                    warehouseId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//仓库
                    warehouseCode: { type: 'string' },//仓库
                    warehouseName: { type: 'string' },//仓库

                    availableStrategyId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['availablestrategy']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//可用量策略
                    availableStrategyCode: { type: 'string' },//可用量策略
                    availableStrategyName: { type: 'string' },//可用量策略
                    description: { type: 'string' },//备注
                },
                pageSize: 10,
                //启用前端缓存
                // pageCache: true
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
            search1: [
                 {
                    type: "combo",
                    key: "avaSetType",
                    label: "设置类型",
                    dataSource: [
                        { value: '0', name: '订单类型+交易类型' },
                        // { value: '1', name: '按组织' },
                        { value: '2', name: '按仓库' },
                        { value: '3', name: '按库存组织' }
                    ]
                },
                // {
                //     type: "refer",
                //     key: "organization",
                //     label: "组织",
                //     refinfo: "organization_ocm",
                //     isReturnCode: "true",
                //     clientParam: {
                //         "EQ_orgFuncRel":"01",
                //         "EQ_isEnable":"1"
                //     }
                // },
                {
                    type: "refer",
                    key: "billType",
                    label: "订单类型",
                    refinfo:"billtype",
                    clientParam:{
                        "EQ_isEnable":"1",
                        "IN_code":"SaleOrder,ReqOrder"
                    }
                },
                {
                    type: "refer",
                    key: "saleType",
                    label: "交易类型",
                    domid:"transTypeIdInfo",
                    refinfo:"trantype"
                },
                {
                    type: "refer",
                    key: "stockOrg",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel":"03",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    key: "warehouse",
                    label: "仓库",
                    refinfo: "warehouse",
                    clientParam: {
                        "EQ_orgFuncRel":"01",
                        "EQ_isEnable":"1"
                    }
                },
            ]
        },
        dialogs: {
            dialog1: [
                {
                    type: "combo",
                    key: "avaSetType",
                    label: "设置类型",
                    dataSource: [
                        { value: '0', name: '订单类型+交易类型' },
                        // { value: '1', name: '按组织' },
                        { value: '2', name: '按仓库' },
                        { value: '3', name: '按库存组织' }
                    ]
                },
                // {
                //     type: "refer",
                //     key: "organizationId",
                //     label: "组织",
                //     refinfo: "organization_ocm",
                //     isReturnCode: "true",
                //     clientParam: {
                //         "EQ_orgFuncRel":"01",
                //         "EQ_isEnable":"1"
                //     }
                // },
                {
                    type: "refer",
                    key: "billTypeId",
                    label: "订单类型",
                    refinfo:"billtype"
                },
                {
                    type: "refer",
                    key: "saleTypeId",
                    label: "交易类型",
                    domid:"saleTypeIdInfo",
                    refinfo:"transType",
                    compid: "saleTypeIdBase",
                    enable: false
                },
                {
                    type: "refer",
                    key: "stockOrgId",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                    clientParam: {
                        "EQ_orgFuncRel":"03",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    key: "warehouseId",
                    label: "仓库",
                    refinfo: "warehouse",
                    clientParam: {
                        "EQ_orgFuncRel":"01",
                        "EQ_isEnable":"1"
                    }
                },
                {
                    type: "refer",
                    key: "availableStrategyId",
                    label: "可用量策略",
                    refinfo:"availablestrategy"
                },
                {
                    type: "textarea",
                    key: "description",
                    label: "备注",
                    cls: "ui-textarea-item"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "unit",
                umeta: {
                    id: "grid_unit",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "avaSetType",
                        dataType: "String",
                        title: "设置类型",
                        renderType:"avaSetTypeRender"
                    },
                    // {
                    //     field: "organizationName",
                    //     dataType: "String",
                    //     title: "组织"
                    // },
                    {
                        field: "billTypeName",
                        dataType: "String",
                        title: "单据类型"
                    },
                    {
                        field: "saleTypeName",
                        dataType: "String",
                        title: "交易类型"
                    },
                    {
                        field: "stockOrgName",
                        dataType: "String",
                        title: "库存组织",
                    },
                    {
                        field: "warehouseName",
                        dataType: "String",
                        title: "仓库",
                    },
                    {
                        field: "availableStrategyName",
                        dataType: "String",
                        title: "可用量策略",
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Datetime",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Datetime",
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
