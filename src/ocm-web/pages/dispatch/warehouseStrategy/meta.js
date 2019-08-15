define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            warehouseStrategymeta: {
                params: {
                    "cls": "com.yonyou.occ.dispatch.service.dto.B2BMatchStrategyDto"
                },
                meta: {
                    type: { type: 'integer'},//策略类型
                    code: { type: 'string' ,required:true},//策略编码
                    name: { type: 'string' ,required:true},//策略名称
                    dimension: { type: 'string' ,required:true},//优先维度
                    branchMethod: { type: 'string' ,required:true},//分仓策略
                    linkOrgs: { type: 'string' },
                    linkOrgsId: {
                        type: 'string',
                        required:true,
                        "refmodel": JSON.stringify(refinfo['organization_ocm-muliti']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                        refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
                    },
                    linkOrgsCode: { type: 'string' },//销售组织
                    linkOrgsName: { type: 'string' },//销售组织
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
                    type: "refer",
                    key: "linkOrgs--saleOrg",
                    label: "销售组织",
                    refinfo:"organization_ocm-muliti",
                    clientParam: {
                        "EQ_orgFuncRel": "01",
                        "EQ_isEnable": "1"
                    }
                },
                {
                    type: "text",
                    key: "code",
                    label: "仓库策略编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "仓库策略名称"
                },
            ]
        },
        dialogs: {
            dialog1: [

                {
                    type: "text",
                    key: "code",
                    label: "仓库策略编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "仓库策略名称"
                },
                {
                    type: "combo",
                    key: "dimension",
                    label: "优先维度",
                    dataSource: [
                        { value: "1", name: "收货地址" },
                        { value: "2", name: "商品" }
                    ]
                },
                {
                    type: "combo",
                    key: "branchMethod",
                    label: "分仓策略",
                    dataSource: [
                        { value: "1", name: "单仓" },
                        { value: "2", name: "分仓" }
                    ]
                },
                {
                    type: "refer",
                    key: "linkOrgsId",
                    label: "销售组织",
                    refinfo:"organization_ocm-muliti",
                    clientParam: {
                        "EQ_orgFuncRel": "01",
                        "EQ_isEnable": "1"
                    }
                },

            ]
        },
        grids: {
            grid1: {
                domid: "warehouseStrategy",
                umeta: {
                    id: "grid_warehouseStrategy",
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
                        title: "仓库策略编码"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "仓库策略名称"
                    },
                    {
                        field: "dimension",
                        dataType: "String",
                        title: "优先维度",
                        renderType: "dimensionRender",
                    },
                    {
                        field: "branchMethod",
                        dataType: "String",
                        title: "分仓策略",
                        renderType: "branchMethodRender",
                    },
                    {
                        field: "linkOrgsName",
                        dataType: "String",
                        title: "销售组织",
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
