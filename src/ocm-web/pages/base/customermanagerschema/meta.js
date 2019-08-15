define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        searchs: {
            search1: [{
                type: "refer",
                key: "saleOrganization--id",
                keyfordisplay: "saleOrganizationName",
                label: "销售组织",
                refinfo: "organization_ocm",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }, {
                type: "refer",
                key: "superiorCustomer--id",
                label: "上级客户",
                refinfo: "customer",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            },{
                type: "refer",
                key: "customer--id",
                label: "客户",
                refinfo: "customer",
                refcfg: { "ctx": "/uitemplate_web", "refCode": "", "refName": "", "isMultiSelectedEnabled": "true" },
                opr: "IN",
            }]
        }
    };
    return new basemodel(model);
});
