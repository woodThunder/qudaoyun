define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            orgfuncrefmeta: {//组织职能关系元数据
                meta: {
                    id:{type:"string"},
                    orgFuncId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['orgfunc']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织职能"}',
                    },
                    orgFuncCode: { type: 'string' },
                    orgFuncName: { type: 'string' },
                    funcParentOrgId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织"}',
                    },
                    funcParentOrgCode: { type: 'string' },
                    funcParentOrgName: { type: 'string' },
                    organizationId:{
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['organization_ocm']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"组织"}',
                    },
                    organizationCode:{ type: 'string' },
                    organizationName:{ type: 'string' },
                    isEnable: { type: 'integer',default:"1"  },// 状态
                },
                pageSize: 10,
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit",
                auth:true
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del",
                auth:true
            }, {
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
                }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "orgFunc--id",
                label: "职能",
                refinfo: "orgfunc"
            }]
        }
    };
    return new basemodel(model);
});
