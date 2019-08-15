define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            simplemeta: {
                meta: {
                    //包含转库
                    isTransfer:{type:"integer" },
                    //日期类型
                    dateType: { type:"integer" },
                    // 库存组织
                    stockOrgId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
                        'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                    },
                    stockOrgCode: { type: 'string', required: true },
                    stockOrgName: { type: 'string', required: true },
                    //业务日期
                    dateLine: { type: 'date' },
                    //单据类型
                    // billType: { type: 'string' },
                    // //出入库状态
                    // billTranTypeId: {
                    //     type: 'string',
                    //     'refmodel': JSON.stringify(refinfo['trantype']),
                    //     "refcfg": '{"ctx":"/uitemplate_web","refName":"交易类型"}',
                    //     'refparam': '{"EQ_isEnable":"1"}'
                    // },
                    // billTranTypeCode: { type: 'string' },
                    // billTranTypeName: { type: 'string' },
                    // 仓库
                    storageId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    storageCode: { type: 'string' },
                    storageName: { type: 'string' },
                    // 货位
                    goodsPositionId: {
                        type: 'string',
                        required: true,
                        'refmodel': JSON.stringify(refinfo['goodsposition']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    goodsPositionCode: { type: 'string' },
                    goodsPositionName: { type: 'string' },
                    //商品分类
                    goodsCategoryId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['goodsCategory']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"商品分类"}',
                    },
                    goodsCategoryName: { type: 'string' },
                    goodsCategoryCode: { type: 'string' },
                    //规格
                    goodsModel: { type: 'string' },
                    //型号
                    goodsSpecification: { type: 'string' },
                    //商品版本
                    goodsVersion: { type: 'string' },
                    //期初数量
                    firstTimeNum: { type: 'integer' },
                    //入库数量
                    factInNum: { type: 'integer' },
                    //出库数量
                    factOutNum: { type: 'integer' },
                    //结存数量
                    reserveNum: { type: 'integer' },
                    //批号
                    batchCodeId: { type: 'string' },
                    batchCodeCode: { type: 'string' },
                    //项目
                    projectId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['project']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    projectCode: { type: 'string' },
                    projectName: { type: 'string' },
                    //库存状态
                    stockStateId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['inventorystate']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    stockStateCode: { type: 'string' },
                    stockStateName: { type: 'string' },
                    //商品
                    goodsId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['goods']),
                        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    goodsCode: { type: 'string' },
                    goodsName: { type: 'string' },
                    //批次号
                    batchNumId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batchNumber']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
                    },
                    batchNumCode: { type: 'string' },
                    batchNumName: { type: 'string' },
                    //批号
                    batchCodeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['batch-code']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}'
                    },
                    batchCodeCode: { type: 'string' },
                    //基本单位
                    unitId: { type: 'string' },
                    unitCode: { type: 'string' },
                    unitName: { type: 'string' },
                    //供应商
                    supplierId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['suppliers']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}'
                    },
                    supplierCode: { type: 'string' },
                    supplierName: { type: 'string' },
                    //选配项
                    goodsSelection: { type: 'string' },
                    //单据状态
                    billStatusId: { type: 'string' },
                    billStatusCode: { type: 'string' },
                    billStatusName: { type: 'string' }
                },
                pageSize: 10
            },
        },

        buttons: {
            button1: [
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
                },
            ]
        },
        searchs: {
            search1: [
                {
                    type: "combo",
                    key: "dateType",
                    label: "日期类型",
                    defaultvalue: '1',
                    dataSource: [
                        { value: '1', name: '业务日期' },
                        { value: '2', name: '签字日期' }
                    ],
                },
                {
                    type: "daterange",
                    key: "billDate",
                    label: "日期"
                },
                {
                    type: "combo",
                    key: "gather",
                    label: "汇总条件",
                    defaultvalue: "1",
                    dataSource: [
                        { value: '1', name: '库存组织' },
                        { value: '2', name: '库存组织+仓库' },
                        { value: '3', name: '库存组织+仓库+货位' }
                    ],
                },
                {
                    type: "combo",
                    key: "isTransfer",
                    label: "包含转库",
                    defaultvalue: "0",
                    dataSource: [
                        { value: '0', name: '否' },
                        { value: '1', name: '是' }
                    ],
                },
                {
                    type: "refer",
                    key: "stockOrg",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                },
                {
                    type: "refer",
                    key: "storage",
                    label: "仓库",
                    refinfo: "warehouse",
                    domid: "storage"
                },
                {
                    type: "refer",
                    key: "goodsCategory",
                    label: "商品分类",
                    refinfo: "goodsCategory"
                },
                {
                    type: "refer",
                    key: "goods",
                    label: "商品",
                    refinfo: "goods",
                    domid: "goods"
                },
                {
                    type: "refer",
                    key: "batchNum",
                    label: "批次号",
                    refinfo: "batchNumber"
                },
                {
                    type: "combo",
                    key: "byBatchNum",
                    label: "按批次展开",
                    defaultvalue: "4",
                    dataSource: [
                        { value: '4', name: '否' },
                        { value: '5', name: '是' }
                    ],
                },
                {
                    type: "refer",
                    key: "project",
                    label: "项目",
                    refinfo: "project"
                },
                {
                    type: "refer",
                    key: "stockState",
                    label: "库存状态",
                    refinfo: "inventorystate"
                },
                {
                    type: "refer",
                    key: "batchCode",
                    label: "批号",
                    refinfo: "batchCode"
                },
                {
                    type: "refer",
                    key: "supplier",
                    label: "供应商",
                    refinfo: "suppliers"
                },
                {
                    type: "refer",
                    key: "supplier",
                    label: "货位",
                    refinfo: "goodsposition"
                },
            ]
        },
        dialogs: {
            dialog1: [
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
                columns: [{
                    field: "stockOrgName",
                    dataType: "String",
                    title: "库存组织",
                },
                {
                    field: "storageName",
                    dataType: "String",
                    title: "仓库",
                    visible: false
                },
                {
                    field: "goodsPositionName",
                    dataType: "String",
                    title: "货位",
                    visible: false
                },
                {
                    field: "batchNumCode",
                    dataType: "String",
                    title: "批次号"
                },
                {
                    field: "goodsCategoryName",
                    dataType: "String",
                    title: "商品分类",
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称",
                },
                {
                    field: "goodsModel",
                    dataType: "String",
                    title: "规格",
                },
                {
                    field: "goodsSpecification",
                    dataType: "String",
                    title: "型号",
                },
                {
                    field: "firstTimeNum",
                    dataType: "Integer",
                    title: "期初数量",
                },
                {
                    field: "factInNum",
                    dataType: "Integer",
                    title: "入库数量",
                },
                {
                    field: "factOutNum",
                    dataType: "Integer",
                    title: "出库数量",
                },
                {
                    field: "reserveNum",
                    dataType: "Integer",
                    title: "结存数量",
                },
                {
                    field: "goodsCategoryCode",
                    dataType: "String",
                    title: "商品分类编码",
                    visible: false
                },
                {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码",
                    visible: false
                },
                {
                    field: "goodsVersion",
                    dataType: "String",
                    title: "商品版本",
                    visible: false
                },
                {
                    field: "goodsSelection",
                    dataType: "String",
                    title: "选配项",
                    visible: false
                },
                {
                    field: "unitName",
                    dataType: "String",
                    title: "单位",
                    visible: false
                },
                {
                    field: "projectName",
                    dataType: "String",
                    title: "项目",
                    visible: false
                },
                {
                    field: "stockStateName",
                    dataType: "String",
                    title: "库存状态",
                    visible: false
                },
                {
                    field: "supplierName",
                    dataType: "String",
                    title: "供应商",
                    visible: false
                },
                {
                    field: "batchCodeCode",
                    dataType: "String",
                    title: "批号",
                    visible: false
                }
                ]
            }
        }
    };
    return new basemodel(model);
});