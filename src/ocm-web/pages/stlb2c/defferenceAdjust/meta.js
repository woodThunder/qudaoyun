define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            Adujstmeta: {
                meta: {
                    id: { type: 'string' },//id
                    adjustCode: { type: 'string', required: true},//调整单编码
                    platformNumber: { type: 'string', required: true },//平台单号
                    commerceNumber:{type:'string',required:true}, //电商单号
                    platformId:{ 
                        type: "string",
                        required: true,//不能为空 ，false 可以为空
                        "refmodel": JSON.stringify(refinfo['b2cplatform']), //对应参照定义名称
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"平台信息"}',
                    }, //平台名称
                    storeId:{
                        type: "string",
                        required: true,//不能为空 ，false 可以为空
                        "refmodel": JSON.stringify(refinfo['b2cStoreRef']), //对应参照定义名称
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"店铺信息"}',
                    },//店铺名称
                    defferenceTypeId:{ 
                        type: "string",
                        required: true,//不能为空 ，false 可以为空
                        "refmodel": JSON.stringify(refinfo['defferenceType']), //对应参照定义名称
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"差异类型"}',
                       // "refparam":'{"EQ_isEnable":"1"}'
                    }, //差异类型
                    defferenceMoney:{ type: 'float', required: true }, //差异金额
                    status: { type: 'integer', required: true },//单据状态
                    adjustType:{type:'integer',required:true}, //调整类型 0账单 1订单
                    //isEnable: { type: 'integer', required: true},// 状态
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
                key: "audit",
                label: "审核",
                iconCls: "icon-tubiao-shenhe",
                click: "audit"
            }
            ]
        },
        searchs: {
            search1: [{
                type: "text",
                key: "adjustCode",
                label: "差异单号"
            },
            {
                type: "text",
                key: "platformNumber",
                label: "平台单号",
            },
            {
                type: "refer",
                key: "defferenceType--id",
                label: "差异类型",
                refinfo: "defferenceType",
                clientParam: {
                    "EQ_isEnable": "1",
                }
            },
            {
                type: "combo",
                key: "status",
                label: "单据状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '0', name: '未审核' },
                    { value: '1', name: '已审核' },
                ]
            }
            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "adjustCode",
                label: "差异单号",
                defaultvalue:"系统自动",
                disableInEdit: true
            },
            {
                type: "text",
                key: "platformNumber",
                label: "平台单号",
                //disableInEdit: true
            },
            {
                type: "text",
                key: "commerceNumber",
                label: "电商单号",
               
            },
            {
                type: "refer",
                key: "platformId",
                label: "平台名称",
                disableFilter: true
            },
            {
                type: "refer",
                key: "storeId",
                label: "店铺名称",
                disableFilter: true
            },
            {
                type: "combo",
                key: "adjustType",
                label: "调整类型",
                dataSource: [
                    { value: '0', name: '账单' },
                    { value: '1', name: '订单' }
                ],
            },
            {
                type: "refer",
                key: "defferenceTypeId",
                label: "差异类型",
               
            },
            {
                type: "text",
                key: "defferenceMoney",
                label: "差异金额",
            },{
                type: "label",
                key: "status",
                label: "单据状态",
                dataSource: [
                    { value: '0', name: '未审核' },
                    { value: '1', name: '已审核' }
                ],
                defaultvalue:'0'
            },
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
                    field: "adjustCode",
                    dataType: "String",
                    title: "差异单编号"
                },
                {
                    field: "platformNumber",
                    dataType: "String",
                    title: "平台单号"
                },
                {
                    field: "commerceNumber",
                    dataType: "String",
                    title: "电商单号"
                },
                {
                    field: "platformName",
                    dataType: "String",
                    title: "平台名称"
                },
                {
                    field: "storeName",
                    dataType: "String",
                    title: "店铺名称"
                },
                {
                    field: "status",
                    dataType: "String",
                    title: "单据状态",
                    "editOptions": {
                        //"id": "isDefaultCA",
                        "type": "combo",
                        "datasource": "statusField",
                    },
                    "renderType":"comboRender",
                },
                {
                    field: "defferenceTypeName",
                    dataType: "String",
                    title: "对账差异类型"
                },
                {
                    field: "defferenceMoney",
                    dataType: "String",
                    title: "差异金额"
                },
                {
                    field: "adjustType",
                    dataType: "String",
                    title: "调整类型",
                    "editOptions": {
                        //"id": "isDefaultCA",
                        "type": "combo",
                        "datasource": "adjustTypeField",
                    },
                    "renderType":"comboRender",
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

