define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            unitmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.UnitDto"
                },
                meta: {
                    id: {type: "string"},//id
                    code: {type: "string"},//编码
                    name: {type: "string", maxLength: 50},//名称

                    legalPersonCorpId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo["organization_ocm"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"财务组织\"}"
                    },//财务组织
                    legalPersonCorpCode: {type: "string"},
                    legalPersonCorpName: {type: "string"},
                    chanpayMerchantAccount: {type: "string"},//畅捷支付商户账号
                    chanpayMerchantPrivateKey: {type: "string"},//畅捷支付商户私钥
                    chanpayMerchantPublicKey: {type: "string"},//畅捷支付商户公钥
                    alipayMerchantNumber: {type: "string"},//支付宝商号
                    alipayMerchantSecretKey: {type: "string"},//支付宝密钥
                    alipayMerchantCooperatorId: {type: "string"},//支付宝合作者身份ID
                    alipayRsaSecretKey: {type: "string"},//RSA密钥
                    alipayRsaPublicKey: {type: "string"},//RSA公钥
                    wechatAppId: {type: "string"},//微信APPID
                    wechatMerchantSecretKey: {type: "string"},//微信扫码支付商户密钥
                    wechatMerchantNumber: {type: "string"},//微信支付商户号
                    wechatAppSecret: {type: "string"}//微信应用密钥
                },
                pageSize: 10
                //启用前端缓存
                // pageCache: true
            }
        },
        buttons: {
            button1: [{
                key: "cancel",
                label: "取消",
                // iconCls: "icon-plus",
                click: "btnCancel"
            },
                {
                    key: "ok",
                    label: "确定",
                    // iconCls: "icon-shanchu1",
                    click: "btnOk"
                }
            ]
        },
        searchs: {
            search1: [
                {
                    type: "refer",
                    key: "legalPersonCorp--id",
                    // keyfordisplay: "consignInventoryOrgName",
                    label: "财务组织",
                    refinfo: "organization_ocm",
                    clientParam: {"EQ_orgFuncRel": "07"}
                }
            ]
        },
        cards: {
            card1: [
                {
                    type: "text",
                    key: "chanpayMerchantAccount",
                    label: "畅捷支付商户账号"
                },
                {
                    type: "textarea",
                    key: "chanpayMerchantPrivateKey",
                    label: "畅捷支付商户私钥",
                    cls: "ui-textarea-item"
                },
                {
                    type: "textarea",
                    key: "chanpayMerchantPublicKey",
                    label: "畅捷支付商户公钥",
                    cls: "ui-textarea-item"
                }
            ],
            card2: [
                {
                    type: "text",
                    key: "alipayMerchantNumber",
                    label: "支付宝商号"
                },
                {
                    type: "text",
                    key: "alipayMerchantSecretKey",
                    label: "支付宝密钥"
                },
                {
                    type: "text",
                    key: "alipayMerchantCooperatorId",
                    label: "支付宝合作者身份ID"
                },
                {
                    type: "textarea",
                    key: "alipayRsaSecretKey",
                    label: "RSA密钥",
                    cls: "ui-textarea-item"
                },
                {
                    type: "textarea",
                    key: "alipayRsaPublicKey",
                    label: "RSA公钥",
                    cls: "ui-textarea-item"
                }
            ],
            card3: [
                {
                    type: "text",
                    key: "wechatAppId",
                    label: "微信APPID"
                },
                {
                    type: "text",
                    key: "wechatMerchantSecretKey",
                    label: "微信扫码支付商户密钥"
                },
                {
                    type: "text",
                    key: "wechatMerchantNumber",
                    label: "微信支付商户号"
                },
                {
                    type: "textarea",
                    key: "wechatAppSecret",
                    label: "微信应用密钥",
                    cls: "ui-textarea-item"
                }
            ]
        }
    };
    return new basemodel(model);
});
