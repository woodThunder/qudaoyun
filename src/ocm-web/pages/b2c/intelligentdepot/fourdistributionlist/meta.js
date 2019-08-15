define(["ocm_global"], function() {
    window.batchdocmeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.DistRelationDto"
        },
        meta: {
            id: {
                type: "string"
            },
            dr: {
                type: "string"
            },
            ts: {
                type: "string"
            },
            creator: {
                type: "string"
            },
            creationTime: {
                type: "string"
            },
            modifier: {
                type: "string"
            },
            modifiedTime: {
                type: "string"
            },
            persistStatus: {
                type: "string"
            },
            countryId: {
                type: "string"
            }, //国家ID
            provinceId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属省"}',
                "refparam": '{"EQ_areaLevel":"1"}'
            }, //省ID
            provinceName: {
                type: "string"
            }, //省名称
            cityId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属市"}',
                "refparam": '{"EQ_areaLevel":"2","EQ_parent.id":""}'
            }, //城市ID
            cityName: {
                type: "string"
            }, //城市名称
            districtId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属区(县)"}',
                "refparam": '{"EQ_areaLevel":"3","EQ_parent.id":""}'
            }, //区/街道ID
            districtName: {
                type: "string"
            }, //区/街道名称
            townId: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"所属镇(街)"}',
                "refparam": '{"EQ_areaLevel":"4","EQ_parent.id":""}'
            }, //城镇ID
            townName: {
                type: "string"
            }, //城镇名称
            agencyName: {
                type: "string"
            }, //办事处名称
            agencyCode: {
                type: 'string'
            }, //办事处编码
            agencyId: { //办事处ID
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"refName":"办事处"}',
                "refparam": '{"EQ_isEnable":"1"}'
                //              "refparam": '{"EQ_isOffice":"1"}'
            },
            customerId1: {
                type: 'string',
            },
            customerId2: {
                type: 'string',
            },
            customerId: {
                type: 'string',
            },
            serviceProvider1Name: {
                type: "string"
            }, //服务商1名称
            serviceProvider1Code: {
                type: 'string'
            }, //服务商1编码
            serviceProvider1: { //服务商1ID 
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"refName":"第一服务商"}',
                "refparam": '{"EQ_isServiceProvider":"1","EQ_isEnable":"1"}'
            },
            serviceProvider2Name: {
                type: "string"
            }, //服务商2名称
            serviceProvider2Code: {
                type: 'string'
            }, //服务商2编码
            serviceProvider2: { //服务商2ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customers']),
                "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"refName":"第二服务商"}',
                "refparam": '{"EQ_isServiceProvider":"1","EQ_isEnable":"1"}'
            },
            senderCode1Id: {
                type: 'string',
                required: true,
                "refmodel": JSON.stringify(refinfo['customeraddress']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"第一服务商地址"}',
                // "refparam": '{"search_EQ_customer.id":""}'
            }, //发送方1ID
            senderCode1: {
                type: "string"
            }, //送达方1编码
            senderCode1Name: {
                type: "string"
            }, //发送方编码1名称
            senderCode2Id: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['customeraddress']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"第二服务商地址"}',
                // "refparam": '{"search_EQ_customer.id":""}'
            }, //发送方2ID
            senderCode2: {
                type: "string"
            }, //送达方2编码
            senderCode2Name: {
                type: "string"
            }, //发送方编码2名称
            //          account1Id: {
            //              type: 'string',
            //              required: true,
            //              "refmodel": JSON.stringify(refinfo['account']),
            //              "refcfg": '{"ctx":"/uitemplate_web","refName":"第一业务账号"}',
            //              "refparam": '{"EQ_isEnable":"1"}'
            //          }, //业务账号1ID
            //          account1Code: {
            //              type: "string"
            //          }, //业务账号1编码
            //          account1Name: {
            //              type: "string"
            //          }, //业务账号1名称
            //          account2Id: {
            //              type: 'string',
            //              "refmodel": JSON.stringify(refinfo['account']),
            //              "refcfg": '{"ctx":"/uitemplate_web","refName":"第二业务账号"}',
            //              "refparam": '{"EQ_isEnable":"1"}'
            //          }, //业务账号2ID
            //          account2Code: {
            //              type: "string"
            //          }, //业务账号2编码
            //          account2Name: {
            //              type: "string"
            //          }, //业务账号2名称
            // account1Type: {
            //     type: 'string',
            //     required: true,
            //     "refmodel": JSON.stringify(refinfo['account']),
            //     "refcfg": '{"ctx":"/uitemplate_web","refName":"第一业务账号类型","strFieldCode": ["accountTypeCode","accountTypeName"],"strFieldName": ["编码", "名称"]}',
            //     "refparam": '{"EQ_isEnable":"1"}'
            // },
            //          account1Type: {
            //              type: 'string',
            //              required: true,
            //              "refmodel": JSON.stringify(refinfo['custdocdef']),
            //              "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY034","refName":"账号类型"}',
            //          }, //第一账号类型
            //          account1TypeName: {
            //              type: "string"
            //          }, //第一账号类型名称
            // account2Type: {
            //   type: 'string',
            //   "refmodel": JSON.stringify(refinfo['account']),
            //   "refcfg": '{"ctx":"/uitemplate_web","refName":"第一业务账号类型","strFieldCode": ["accountTypeCode","accountTypeName"],"strFieldName": ["编码", "名称"]}',
            //   "refparam": '{"EQ_isEnable":"1"}'
            // },
            //          account2Type: {
            //              type: 'string',
            //              "refmodel": JSON.stringify(refinfo['custdocdef']),
            //              "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY034","refName":"账号类型"}',
            //          }, //第二账号类型
            //          account2TypeName: {
            //              type: "string"
            //          }, //第二账号类型名称
            serviceType1: {
                type: "string",
            }, //第一服务商类型
            serviceType2: {
                type: "string"
            }, //第二服务商类型
            defaultService: {
                type: "string",
                //              required: true
            }, //默认送装
            defaultServiceCode: {
                type: "string"
            }, //默认送装编码
            defaultServiceName: {
                type: "string"
            }, //默认送装名称
            providerPriority: {
                type: "string"
            }, //服务商优先级
            //          isSendArea: {
            //              type: "string",
            //              required: true
            //          }, //是否送装区域
            //          isExpressDistribute: {
            //              type: "string",
            //              required: true
            //          }, //是否快递配送
            freight: {
                type: "string",
            }, //标准运费
            pkOrg: {
                type: "string"
            }
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    };
    window.agencymeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.ServiceProviderInfoDto"
        },
        meta: {
            orgName: { //办事处名称
                type: 'string',
                required: true
            },
            serviceType: { //应该是服务商编码，没找到先用服务商类型
                type: 'string',
                required: true
            },
            name: { //服务商名称
                type: 'string',
                required: true
            },
            prodRefMuGridTree: {
                refinfo: 'customers',
                clientParam: {
                    "EQ_isEnable": "1",
                    "EQ_isServiceProvider": "1"
                }
            },
            pageSize: 10
        }
    };
});