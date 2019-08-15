define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            WareHousemeta: {
                meta: {
                    id: { type: 'string' },//id
                    warehouseOwnershipCode: {
                        type: 'string', required: true,
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY109","refName":"仓库权属"}',
                    },//仓库权属
                    // warehouseOwnershipCode: { type: 'string' },//仓库权属
                    warehouseOwnershipName: { type: 'string' },//仓库权属
                    inventoryOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },//所属库存组织
                    inventoryOrgCode: { type: 'string' },//所属库存组织
                    inventoryOrgName: { type: 'string' },//所属库存组织

                    ownerCustomerId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//所属客户
                    ownerCustomerCode: { type: 'string' },//所属客户
                    ownerCustomerName: { type: 'string' },//所属客户
                    negInventoryCtrlCode: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"NEG_INVENTORY_CTRL","refName":"负库存控制"}',
                    },
                    negInventoryCtrlName: { type: 'string' },//负库存控制
                    ownerSupplierId: {
                        type: 'string',
                        required: true,
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//所属供应商
                    ownerSupplierCode: { type: 'string', required: true },//所属供应商
                    ownerSupplierName: { type: 'string', required: true },//所属供应商

                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    // principalId: {
                    //     type: 'string',
                    //     required: true,
                    //     "refmodel": JSON.stringify(refinfo['person']),
                    //     "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    // },//负责人
                    // principalCode: { type: 'string', required: true },
                    principal: { type: 'string' },
                    //仓库类型
                    warehouseTypeCode: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['custdocdef']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY110","refName":"仓库类型"}',
                    },//仓库类型
                    // warehouseTypeCode: { type: 'string' },//仓库类型
                    warehouseTypeName: { type: 'string' },//仓库类型
                    //国家
                    countryId: {
                        type: 'string',
                        required: true,
                        // required: true,
                        "refmodel": JSON.stringify(refinfo['country']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}'
                    },//国别ID
                    countryName: { type: 'string' },//国家名称
                    provinceId: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1"}',
                    },//所在省份ID
                    provinceName: { type: 'string' },//所在省份名称
                    provinceCode: { type: 'string' },//所在省份名称
                    cityId: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2"}'
                    },//所在城市ID
                    cityName: { type: 'string' },//所在城市名称
                    cityCode: { type: 'string' },
                    countyId: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"3"}'
                    },//所在区/县
                    countyName: { type: 'string' },//所在区/县名称
                    countyCode: { type: 'string' },
                    townId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"4"}'
                    },//所在街道/镇
                    townName: { type: 'string' },//所在街道/镇名称
                    townCode: { type: 'string' },
                    address: { type: 'string' },//详细地址
                    tel: { type: 'string' },//电话号码
                    ifCalcInventoryCost: { type: 'integer', required: true },//进行存货成本计算
                    ifSlotManage: { type: 'integer', required: true },//货位管理
                    isFrozen: { type: 'integer', required: true },//冻结
                    isEnable: { type: 'integer' },//启用
                    remark: { type: 'string' },//备注
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
            // {
            //     key: "unfrozen",
            //     label: "冻结",
            //     iconCls: "icon-tingyong",
            //     click: "unfrozen"
            // },
            // {
            //     key: "frozen",
            //     label: "解冻",
            //     iconCls: "icon-qiyong",
            //     click: "frozen"
            // }
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
                key: "warehouseOwnership",
                label: "仓库权属",
                url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY109',
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "refer",
                key: "ownerCustomer--id",
                label: "所属客户",
                refinfo: "customer",
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
        dialogs: {
            dialog1: [
                {
                    type: "refer",
                    key: "ownerCustomerId",
                    compid: "ownerCustomerId",
                    label: "所属客户",
                    refinfo: "customer",
                }, {
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
                    key: "warehouseTypeCode",
                    label: "仓库类型",
                    url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY110',
                    namefield: "name",
                    valuefield: "code"
                },

                {
                    type: "refer",
                    key: "countryId",
                    label: "国家",
                    compid: "countryIdBase",
                    refinfo: "country",
                },
                {
                    type: "refer",
                    key: "provinceId",
                    label: "所在省份",
                    domid: "provinceIdinfo",
                    compid: "provinceIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel":"1"
                    }
                 
                },
                {
                    type: "refer",
                    key: "cityId",
                    label: "所在城市",
                    domid: "cityIdinfo",
                    compid: "cityIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel":"2"
                    }
                },
                {
                    type: "refer",
                    key: "countyId",
                    label: "所在区/县",
                    domid: "countyIdinfo",
                    compid: "countyIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel":"3"
                    }
                },
                {
                    type: "refer",
                    key: "townId",
                    label: "所在街道",
                    domid: "townIdinfo",
                    compid: "townIdBase",
                    refinfo: "region",
                    clientParam: {
                        "EQ_areaLevel":"4"
                    }
                },
                {
                    type: "text",
                    key: "address",
                    label: "详细地址",
                    required: true,
                },
                {
                    type: "text",
                    key: "principal",
                    label: "负责人",
                },
                {
                    type: "text",
                    key: "tel",
                    label: "电话号码",
                },
                {
                    type:"textarea",
                    key:"remark",
                    label:"备注",
                    cls:"ui-textarea-item"
                },
                {
                    type:"label",
                    key:"isEnable",
                    label:"是否启用",
                    defaultvalue:"0"
                },
            ]
        },
        details: {
            detail1: [
                {
                    key: "customerName",
                    label: "所属客户",
                }, {
                    key: "code",
                    label: "编码"
                },
                {
                    key: "name",
                    label: "名称"
                },
                {
                    key: "warehouseTypeName",
                    label: "仓库类型",
                },
                {
                    key: "countryName",
                    label: "所在国家",
                }, {
                    key: "provinceName",
                    label: "所在省份",
                }, {
                    key: "countyName",
                    label: "所在区/县",
                }, {
                    key: "townName",
                    label: "所在街道",
                }, {
                    key: "address",
                    label: "详细地址",
                },
                {
                    key: "principal",
                    label: "负责人",
                },
                {
                    key: "tel",
                    label: "电话号码",
                },
                {
                    key: "remark",
                    label: "备注",
                    cls:"ui-textarea-item"
                },
                {
                    key: "isEnable",
                    "computed": "enableFmt",
                    label: "状态",
                },]
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
                columns: [
                    {
                        field: "ownerCustomerName",
                        dataType: "String",
                        title: "所属客户",
                    }, {
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
                        field: "warehouseTypeName",
                        dataType: "String",
                        title: "仓库类型",
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
                        field: "address",
                        dataType: "String",
                        title: "详细地址",
                        visible: "false"
                    },
                    {
                        field: "principal",
                        dataType: "String",
                        title: "负责人",
                    },
                    {
                        field: "tel",
                        dataType: "String",
                        title: "电话号码",
                        visible: "false"
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注",
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

