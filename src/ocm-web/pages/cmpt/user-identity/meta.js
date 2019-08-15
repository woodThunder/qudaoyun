define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            userIdentityMeta: {
                meta: {
                    id: {type: "string"}, // 主键
                    loginName: {type: "string"}, // 登录名
                    name: {type: "string"}, // 姓名
                    channelCustomerId: {
                       /* type: "string",
                        "refmodel": JSON.stringify(refinfo["customer"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"*/
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['customer']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"渠道商身份"}',
                    }, // 渠道商身份
                    channelCustomerCode: {type: "string"},
                    channelCustomerName: {type: "string"},
                    businessPersonId: {
                       /* type: "string",
                        "refmodel": JSON.stringify(refinfo["channel-person"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\"}"*/
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['channel-person']),
                        "refcfg": '{"ctx":"/uitemplate_web","refCode":"","refName":"业务员身份"}',
                    }, // 业务员身份
                    businessPersonCode: {type: "string"},
                    businessPersonName: {type: "string"}
                },
                pageSize: 10
            }
        },
        searchs: {
            search1: [{
                type: "text",
                key: "loginName",
                label: "用户名"
            }, {
                type: "text",
                key: "name",
                label: "姓名"
            }, {
                type: "refer",
                key: "channelCustomer",
                label: "渠道商身份",
                refinfo: "customer",
            }, {
                type: "refer",
                key: "businessPerson",
                label: "业务员身份",
                refinfo: "channel-person"
            }]
        },
        buttons: {
            button1: []
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "loginName",
                label: "用户名",
                disableInEdit: true
            }, {
                type: "text",
                key: "name",
                label: "姓名",
                disableInEdit: true
            }, {
                type: "refer",
                key: "channelCustomerId",
                label: "渠道商身份",
                compid:"channelCustomerId"
            }, {
                type: "refer",
                key: "businessPersonId",
                label: "业务员身份"
            }]
        },
        grids: {
            grid1: {
                domid: "rule",
                umeta: {
                    id: "grid_rule",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: false,
                    showNumCol: true
                },
                columns: [{
                    field: "loginName",
                    dataType: "String",
                    title: "用户名"
                }, {
                    field: "name",
                    dataType: "String",
                    title: "姓名"
                }, {
                    field: "channelCustomerName",
                    dataType: "String",
                    title: "渠道商身份"
                }, {
                    field: "businessPersonName",
                    dataType: "String",
                    title: "业务员身份"
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            }
        }
    };
    return new basemodel(model);
});
