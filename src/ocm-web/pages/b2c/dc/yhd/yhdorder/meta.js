define(["ocm_global"], function() {
    //活动定义
    window.Order = {
        params: {
            "cls": "com.yonyou.ocm.dc.service.dto.YhdOrderDto"
        },
        meta: [{
            id: {
                type: "string"
            },
            dr: {
                type: "integer"
            },
            ts: {
                type: "integer"
            },
            creator: {
                type: "string"
            },
            creationTime: {
                type: "integer"
            },
            modifier: {
                type: "string"
            },
            modifiedTime: {
                type: "integer"
            },
            persistStatus: {
                type: "string"
            },
            orderid: {
                type: "string"
            },
            ordercode: {
                type: "string"
            },
            orderstatus: {
                type: "string"
            },
            orderamount: {
                type: "float"
            },
            productamount: {
                type: "float"
            },
            ordercreatetime: {
                type: "integer"
            },
            orderdeliveryfee: {
                type: "float"
            },
            orderneedinvoice: {
                type: "string"
            },
            updatetime: {
                type: "integer"
            },
            goodreceivername: {
                type: "string"
            },
            goodreceiveraddress: {
                type: "string"
            },
            goodreceiverprovince: {
                type: "string"
            },
            goodreceivercity: {
                type: "string"
            },
            goodreceivercounty: {
                type: "string"
            },
            goodreceiverarea: {
                type: "string"
            },
            goodreceiverpostcode: {
                type: "string"
            },
            goodreceiverphone: {
                type: "string"
            },
            goodreceivermoblie: {
                type: "string"
            },
            deliverysupplierid: {
                type: "string"
            },
            deliverydate: {
                type: "integer"
            },
            receivedate: {
                type: "float"
            },
            deliveryremark: {
                type: "string"
            },
            merchantremark: {
                type: "string"
            },
            orderpaymentconfirmdate: {
                type: "integer"
            },
            payservicetype: {
                type: "string"
            },
            orderpromotiondiscount: {
                type: "float"
            },
            merchantexpressnbr: {
                type: "string"
            },
            sitetype: {
                type: "string"
            },
            ordercoupondiscount: {
                type: "float"
            },
            orderplatformdiscount: {
                type: "float"
            },
            issync: {
                type: "string"
            },
            exceptiondesc: {
                type: "string"
            },
            isexception: {
                type: "string"
            },
            pkOrg: {
                type: "string"
            },
            shopsource: {
                type: "string",
                'refmodel': JSON.stringify(refinfo['b2cStoreRef']),
                'refcfg': '{"ctx":"/uitemplate_web", "refName":"店铺来源"}'
              },
            issynuser: {
                type: "string"
            },
            ismobileorder: {
                type: "string"
            },
            enduserid: {
                type: "string"
            }
        }],
        last: {
            type: "boolean"
        },
        totalElements: {
            type: "integer"
        },
        totalPages: {
            type: "integer"
        },
        number: {
            type: "integer"
        },
        size: {
            type: "integer"
        },
        first: {
            type: "boolean"
        },
        numberOfElements: {
            type: "integer"
        },
         pageSize: 10,
         //是否启用前端缓存
        // pageCache: true
        

    }

    //子页面
    window.OrderChild = {
        meta: {
            id: {
                type: "string"
            },
            dr: {
                type: "integer"
            },
            ts: {
                type: "integer"
            },
            creator: {
                type: "string"
            },
            creationTime: {
                type: "integer"
            },
            modifier: {
                type: "string"
            },
            modifiedTime: {
                type: "integer"
            },
            persistStatus: {
                type: "string"
            },
            orderid: {
                type: "string"
            },
            ordercode: {
                type: "string"
            },
            orderstatus: {
                type: "string"
            },
            orderamount: {
                type: "float"
            },
            productamount: {
                type: "float"
            },
            ordercreatetime: {
                type: "integer"
            },
            orderdeliveryfee: {
                type: "float"
            },
            orderneedinvoice: {
                type: "string"
            },
            updatetime: {
                type: "integer"
            },
            goodreceivername: {
                type: "string"
            },
            goodreceiveraddress: {
                type: "string"
            },
            goodreceiverprovince: {
                type: "string"
            },
            goodreceivercity: {
                type: "string"
            },
            goodreceivercounty: {
                type: "string"
            },
            goodreceiverarea: {
                type: "string"
            },
            goodreceiverpostcode: {
                type: "string"
            },
            goodreceiverphone: {
                type: "string"
            },
            goodreceivermoblie: {
                type: "string"
            },
            deliverysupplierid: {
                type: "string"
            },
            deliverydate: {
                type: "integer"
            },
            receivedate: {
                type: "float"
            },
            deliveryremark: {
                type: "string"
            },
            merchantremark: {
                type: "string"
            },
            orderpaymentconfirmdate: {
                type: "integer"
            },
            payservicetype: {
                type: "string"
            },
            orderpromotiondiscount: {
                type: "float"
            },
            merchantexpressnbr: {
                type: "string"
            },
            sitetype: {
                type: "string"
            },
            ordercoupondiscount: {
                type: "float"
            },
            orderplatformdiscount: {
                type: "float"
            },
            issync: {
                type: "string"
            },
            exceptiondesc: {
                type: "string"
            },
            isexception: {
                type: "string"
            },
            pkOrg: {
                type: "string"
            },
            shopsource: {
                type: "string"
            },
            issynuser: {
                type: "string"
            },
            ismobileorder: {
                type: "string"
            },
            enduserid: {
                type: "string"
            }
        },
        last: {
            type: "boolean"
        },
        totalElements: {
            type: "integer"
        },
        totalPages: {
            type: "integer"
        },
        number: {
            type: "integer"
        },
        size: {
            type: "integer"
        },
        first: {
            type: "boolean"
        },
        numberOfElements: {
            type: "integer"
        }


    }

    //商品
    window.Goodss = {}

    //发票
    window.invoices = {}

    //业务类型
    window.BussType = {
            meta: {
                id: {
                    type: 'string'
                },
                bussiTypeId: {
                    type: 'string'
                }, //id
                bussiTypeCode: {
                    type: 'string',
                    required: true
                }, //编码
                bussiTypeName: {
                    type: 'string',
                    required: true
                }, //名称
            }
        }
        //办事处
    window.Agency = {
            meta: {
                id: {
                    type: 'string'
                },
                officeId: {
                    type: 'string'
                }, //id
                officeCode: {
                    type: 'string',
                    required: true
                }, //编码
                officeName: {
                    type: 'string',
                    required: true
                }, //名称
            }
        }
        //业务类型参照
    window.BussTypeRef = {
            meta: {
                bussRefer: {
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['busstype']),
                    "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
                }, //id
            }
        }
        //办事处参照
    window.AgencyRef = {
        meta: {
            agencyRefer: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                "refparam": '{"EQ_isOffice":"1"}'
            }
        }
    }
})