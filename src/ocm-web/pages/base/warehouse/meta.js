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
                        "refmodel": JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    },//所属供应商
                    ownerSupplierCode: { type: 'string'},//所属供应商
                    ownerSupplierName: { type: 'string'},//所属供应商

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
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{\"EQ_isEnable":"1"}',

                    },//国别ID
                    countryName: { type: 'string' },//国家名称
                    provinceId: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"1","EQ_isEnable":"1"}',
                    },//所在省份ID
                    provinceName: { type: 'string' },//所在省份名称
                    provinceCode: { type: 'string' },//所在省份名称
                    cityId: {
                        required: true,
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['region']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        "refparam": '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
                    },//所在城市ID
                    cityName: { type: 'string' },//所在城市名称
                    cityCode: { type: 'string' },
                    countyId: {
                        required: true,
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
                    address: { type: 'string' },//详细地址
                    longitude : { type: 'string' },//经度
                    latitude : { type: 'string' },//纬度
                    tel: { type: 'string' },//电话号码
                    ifCalcInventoryCost: { type: 'integer', required:true},//进行存货成本计算
                    ifSlotManage: { type: 'integer', required:true},//货位管理
                    isFrozen: { type: 'integer', required:true},//冻结
                    isEnable: { type: 'integer', required:true },//启用
                    remark: { type: 'string',  },//备注
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
                key: "unfrozen",
                label: "冻结",
                iconCls: "icon-tingyong",
                click: "frozen"
            },
            {
                key: "frozen",
                label: "解冻",
                iconCls: "icon-qiyong",
                click: "unfrozen"
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
                key: "warehouseOwnership",
                label: "仓库权属",
                url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY109',
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "refer",
                key: "inventoryOrg--id",
                label: "所属库存组织",
                refinfo: "organization_ocm",
                //refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                //isReturnCode: "true",
                clientParam: {
                    "EQ_orgFuncRel":"03",
                    "EQ_isEnable":"1"
                }
            },
            {
                type: "refer",
                key: "ownerCustomer--id",
                label: "所属客户",
                refinfo: "customer",
            },
            {
                type: "refer",
                key: "ownerSupplier--id",
                label: "所属供应商",
                refinfo: "suppliers",
            },
            // {
            //     type: "text",
            //     key: "principal",
            //     label: "负责人",
            //    // refinfo: "person",
            // },
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
            {
                type: "radio",
                key: "isFrozen",
                label: "是否冻结",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '1', name: '是' },
                    { value: '0', name: '否' }
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
                type: "combo",
                key: "warehouseOwnershipCode",
                label: "仓库权属",
                url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY109',
                namefield: "name",
                valuefield: "code"
            },
            {
                type: "refer",
                key: "inventoryOrgId",
                compid:"inventoryOrgId",
                enable:false,
                label: "所属库存组织",
            },
            {
                type: "refer",
                key: "ownerCustomerId",
                compid:"ownerCustomerId",
                enable:false,
                label: "所属客户",
            },
            {
                type: "refer",
                key: "ownerSupplierId",
                compid:"ownerSupplierId",
                enable:false,
                label: "所属供应商",
            },
            {
                type: "text",
                key: "principal",
                label: "负责人",
            },
            {
                type: "combo",
                key: "negInventoryCtrlCode",
                label: "负库存控制",
                url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=NEG_INVENTORY_CTRL',
                namefield: "name",
                valuefield: "code"
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
                key: "address",
                label: "详细地址",
                domid: "addressinfo",
                required: true,
            },
            {
                type: "text",
                key: "longitude",
                label: "经度",
                domid: "longitudeinfo",
                required: true,
            },
            {
                type: "text",
                key: "latitude",
                label: "纬度",
                domid: "latitudeinfo",
                required: true,
            },
            {
                type: "text",
                key: "tel",
                label: "电话号码",
            },
            {
                type: "radio",
                key: "ifCalcInventoryCost",
                label: "进行存货成本计算",
                defaultvalue:'0',
                dataSource: [
                    { value: '1', name: '是' },
                    { value: '0', name: '否' }
                ]
            },
            {
                type: "radio",
                key: "ifSlotManage",
                label: "货位管理",
                defaultvalue:'0',
                dataSource: [
                    { value: '1', name: '是' },
                    { value: '0', name: '否' }
                ]
            },
            {
                type: "radio",
                key: "isFrozen",
                label: "是否冻结",
                defaultvalue:'0',
                dataSource: [
                    { value: '1', name: '是' },
                    { value: '0', name: '否' }
                ]
            },
            {
                type: "label",
                key: "isEnable",
                label: "启用状态",
                defaultvalue: '0'
            },
            {
                type: "textarea",
                key: "remark",
                label: "备注",
                cls: "ui-textarea-item"
            }
            ]
        },
        details:{
            detail1:[{
                key: "code",
                label: "编码"
            },
            {
                key: "name",
                label: "名称"
            },
            {
                key: "warehouseOwnershipName",
                label: "仓库权属",
            },
            {
                key: "inventoryOrgName",
                label: "所属库存组织",
            },
            {
                key: "customerName",
                label: "所属客户",
            },
            {
                key: "ownerSupplierName",
                label: "所属供应商",
            },
            {
                key: "principal",
                label: "负责人",
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
                key: "cityName",
                label: "所在城市",
            }, {
                key: "countyName",
                label: "所在区/县",
            }, {
                key: "townName",
                label: "所在街道",
            }, {
                key: "address",
                label: "详细地址",
            }, {
                key: "longitude",
                label: "经度",
            },
            {
                key: "latitude",
                label: "纬度",
            },
            {
                key: "tel",
                label: "电话号码",
            },
            {
                key: "ifCalcInventoryCost",
                label: "进行存货成本计算",
                "computed": "ifCalcInventoryCostFmt",
            },
            {
                key: "ifSlotManage",
                label: "货位管理",
                "computed": "ifSlotManageFmt",
            },
            {
                key: "isFrozen",
                label: "是否冻结",
                "computed": "isFrozenFmt",
            },
            {
                key: "isEnable",
                "computed": "enableFmt",
                label: "状态",
            },   {
                key: "remark",
                label: "备注",
                cls:"ui-textarea-item"
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
                    field: "warehouseOwnershipName",
                    dataType: "String",
                    title: "仓库权属",
                },
                {
                    field: "inventoryOrgName",
                    dataType: "String",
                    title: "所属库存组织",
                },
                {
                    field: "ownerCustomerName",
                    dataType: "String",
                    title: "所属客户",
                },
                {
                    field: "ownerSupplierName",
                    dataType: "String",
                    title: "所属供应商",
                },
                {
                    field: "principal",
                    dataType: "String",
                    title: "负责人",
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
                    field: "longitude",
                    dataType: "String",
                    title: "经度",
                    visible: "false"
                },
                {
                    field: "latitude",
                    dataType: "String",
                    title: "纬度",
                    visible: "false"
                },
                {
                    field: "tel",
                    dataType: "String",
                    title: "电话号码",
                    visible: "false"
                },
                {
                    field: "ifCalcInventoryCost",
                    dataType: "String",
                    title: "进行存货成本计算",
                    visible: "false",
                    renderType: "whetherRender"
                },
                {
                    field: "ifSlotManage",
                    dataType: "String",
                    title: "货位管理",
                    visible: "false",
                    renderType: "whetherRender"
                },
                {
                    field: "isFrozen",
                    dataType: "String",
                    title: "是否冻结",
                    renderType: "whetherRender"
                },
                {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
                    renderType: "enableRender"
                },
                {
                    field: "remark",
                    dataType: "String",
                    title: "备注",
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
                    dataType: "Datetime",
                    title: "创建时间",
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

