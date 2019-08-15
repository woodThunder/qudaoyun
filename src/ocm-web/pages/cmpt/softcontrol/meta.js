define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            softControlMeta: {
                params: {
                    "cls": "com.yonyou.occ.cmpt.service.dto.SoftControlDto"
                },
                meta: {
                    id: {
                        type: 'string'
                    }, //id
                    versionName: {
                        type: 'string'
                    },
                    versionCode: {
                        type: 'string'
                    },
                    companyCount: {
                        type: 'string'
                    },
                    distributorCount: {
                        type: 'string'
                    },
                    termOfValidityCompany: {
                        type: 'string'
                    },
                    termOfValidityDistribution: {
                        type: 'string'
                    },
                    orderCodeNumber: {
                        type: 'string'
                    },
                    companyName: {
                        type: 'string'
                    },
                    expriedTime: {
                        type: 'string'
                    },
                    productName: {
                        type: 'string'
                    },
                    activitionCode: {
                        type: 'string'
                    },
                    creator: {
                        type: 'string'
                    },
                    creationTime: {
                        type: 'string'
                    },
                    modifier: {
                        type: 'string'
                    },
                    modifiedTime: {
                        type: 'string'
                    }
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            }
        },
        //弹窗组
        dialogs: {
            dialog1: [{
                type: "text",
                key: "versionName",
                label: "版本名称"
            }, {
                type: "text",
                key: "versionCode",
                label: "版本编码"
            }, {
                type: "text",
                key: "companyCount",
                label: "企业用户数"
            }, {
                type: "text",
                key: "distributorCount",
                label: "经销商用户数"
            }, {
                type: "text",
                key: "termOfValidityCompany",
                label: "中台版有效期"
            }, {
                type: "text",
                key: "termOfValidityDistribution",
                label: "渠道商版有效期"
            }, {
                type: "text",
                key: "orderCodeNumber",
                label: "订单号"
            }, {
                type: "text",
                key: "companyName",
                label: "企业名称"
            }, {
                type: "text",
                key: "expriedTime",
                label: "过期时间"
            }, {
                type: "text",
                key: "productName",
                label: "产品名称"
            }, {
                type: "text",
                key: "activitionCode",
                label: "激活码"
            }, {
                type: "text",
                key: "creator",
                label: ""
            }, {
                type: "text",
                key: "creationTime",
                label: ""
            }, {
                type: "text",
                key: "modifier",
                label: ""
            }, {
                type: "text",
                key: "modifiedTime",
                label: ""
            }, ]
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
                    field: "versionName",
                    dataType: "String",
                    title: "版本名称"
                }, {
                    field: "versionCode",
                    dataType: "String",
                    title: "版本编码",
                    visible: false
                }, {
                    field: "companyCount",
                    dataType: "String",
                    title: "企业用户数"
                }, {
                    field: "distributorCount",
                    dataType: "String",
                    title: "经销商用户数"
                }, {
                    field: "termOfValidityCompany",
                    dataType: "String",
                    title: "中台版有效期",
                    visible: false
                }, {
                    field: "termOfValidityDistribution",
                    dataType: "String",
                    title: "渠道商版有效期",
                    visible: false
                }, {
                    field: "orderCodeNumber",
                    dataType: "String",
                    title: "订单号"
                }, {
                    field: "companyName",
                    dataType: "String",
                    title: "企业名称"
                }, {
                    field: "productName",
                    dataType: "String",
                    title: "产品名称"
                }, {
                    field: "activitionCode",
                    dataType: "String",
                    title: "激活码"
                }, {
                    field: "creator",
                    dataType: "String",
                    title: "创建人",
                    visible: false
                }, {
                    field: "creationTime",
                    dataType: "String",
                    title: "创建时间",
                    visible: false
                }, {
                    field: "modifier",
                    dataType: "String",
                    title: "修改人",
                    visible: false
                }, {
                    field: "modifiedTime",
                    dataType: "String",
                    title: "修改时间",
                    visible: false
                }]
            }
        }
    };
    return new basemodel(model);
});