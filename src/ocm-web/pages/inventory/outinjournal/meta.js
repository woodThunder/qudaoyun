define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            simplemeta: {
                meta: {
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
                    billDate: { type: 'date' },
                    //单据类型
                    billType: { type: 'string',},
                    //出入库状态
                    billTranTypeId: {
                        type: 'string',
                        'refmodel': JSON.stringify(refinfo['trantype']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"交易类型"}',
                        'refparam': '{"EQ_isEnable":"1"}'
                    },
                    billTranTypeCode: { type: 'string' },
                    billTranTypeName: { type: 'string' },
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
                    //入库数量
                    factInNum: { type: 'integer' },
                    //出库数量
                    factOutNum: { type: 'integer' },
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
                    billStatusName: { type: 'string' },
                    srcBillCode : {
                        type: 'string'
                    }
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
                    type: "refer",
                    key: "stockOrg",
                    label: "库存组织",
                    refinfo: "organization_ocm",
                },
                {
                    type: "daterange",
                    key: "billDate",
                    label: "业务日期"
                },
                {
                    type: "refer",
                    key: "billType",
                    label: "单据类型",
                    refinfo: "billtype",
                    clientParam: {"EQ_moduleCode":"stock"},
                },
                {
                    type: "refer",
                    key: "billTranType",
                    label: "出入库状态",
                    refinfo: "trantype",
                },
                {
                    type: "refer",
                    key: "storage",
                    label: "仓库",
                    refinfo: "warehouse",
                    domid: "storage"
                },
                {
                    type: "combo",
                    key: "billStatus",
                    label: "单据状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '01', name: '自由态' },
                        { value: '02', name: '已签字' }
                    ],
                },
               /* {
                    type: "combo",
                    key: "gather",
                    label: "汇总条件",
                    defaultvalue: "1",
                    dataSource: [
                        { value: '1', name: '不汇总' },
                        { value: '2', name: '库存组织+仓库+商品' }
                    ],
                },*/
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
                /*{
                    type: "combo",
                    key: "byBatchNum",
                    label: "按批次展开",
                    defaultvalue: "3",
                    dataSource: [
                        { value: '3', name: '否' },
                        { value: '4', name: '是' }
                    ],
                },*/
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
                    visible: false
                },
                {
                    field: "storageName",
                    dataType: "String",
                    title: "仓库",
                    visible: false
                },
                {
                    field: "batchNumCode",
                    dataType: "String",
                    title: "批次号"
                },
                {
                    field: "billDate",
                    dataType: "Date",
                    title: "业务日期",
                },
                {
                    field: "billType",
                    dataType: "String",
                    title: "单据类型",
                },
                {
                    field: "billTranTypeName",
                    dataType: "String",
                    title: "出入库类型",
                },
                    {
                        field : "srcBillCode",
                        dataType : "string",
                        title : "单据号",
                    },
                {
                    field: "goodsCategoryName",
                    dataType: "String",
                    title: "商品分类",
                },
                {
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称"
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