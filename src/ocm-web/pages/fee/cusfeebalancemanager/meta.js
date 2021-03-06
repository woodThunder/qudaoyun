define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
      metas: {
        potypemeta: {
          meta: {
            id: {
              type: 'string'
            }, //id
            accountId: {
              type: 'string',
              required: true
            }, //客户费用账户
            accountName: {
              type: 'string'
            },
            castTypeId: {
              type: 'string',
              required: true
            }, //兑付类型
            saleOrgId: {
              type: 'string',
              required: true
            }, //销售组织
            customerId: {
              type: 'string',
              required: true
            },
            customerName: {
              type: 'string',
              required: true
            },
            marketAreaId: {
              type: 'string',
              "refmodel": JSON.stringify(refinfo['market']),
              "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            },
            marketAreaName:{
              type: 'string',
              required: true
            },
            saleOrgName: {
              type: 'string',
              required: true
            }, //销售组织
            financeOrgId: {
              type: 'string',
              required: true
            }, //财务组织
            financeOrgName: {
              type: 'string',
              required: true
            }, //财务组织
            currencyId: {
              type: 'string',
              required: true
            }, //币种
            currencyName: {
              type: 'string'
            },
            projectId: {
              type: 'string',
            }, //项目
            freezeMny:{
              type: 'string'
            },//冻结金额
            freezeMny1:{
              type: 'string'
            },
            availableMny:{
              type: 'string'
            },//可用金额
            mny: {
              type: 'string',
            }, //金额
            operation: {
              type: 'string'
            },
            unfreezeMny:{
              type: 'string'
            },//解冻金额
            marketAreaName:{
                type:'string'
            },
            marketAreaCode:{
                type:'string'
            },
            customerId: {
              type: 'string',
              required: true,
              refmodel: JSON.stringify(refinfo['customer']),
              refcfg: '{"ctx":"/uitemplate_web","refName":"客户"}'
            },
            customerName: {
              type: 'string',
            }, //客户
          },
          pageSize: 10,
        }
      },
      buttons: {
        button1: [
          // {
          //   key: "add",
          //   label: "新增",
          //   iconCls: "icon-plus",
          //   click: "beforeEdit"
          // }, {
          //   key: "del",
          //   label: "删除",
          //   iconCls: "icon-shanchu1",
          //   click: "del"
          // },
          // {
          //   key: "refresh",
          //   label: "刷新",
          //   iconCls: "icon-tubiao-huangou",
          //   click: "refresh"
          //       }
        ]
      },
      searchs: {
        search1: [{
          type: "refer",
          key: "account--financeOrg",
          label: "财务组织",
          refinfo: "organization_ocm",
          required: true,
          multi: true,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07",
            "AUTH_refdim": "account.financeOrg"
          }
        }, {
          type: "refer",
          key: "account--saleOrg",
          keyfordisplay: "saleOrgName",
          label: "销售组织",
          refinfo: "organization_ocm",
          multi: true,
          clientParam: {
            "EQ_orgFuncRel": "01",
            "EQ_isEnable": "1",
            "AUTH_refdim": "account.saleOrg"
          }
        }, {
          type: "refer",
          key: "account--id",
          keyfordisplay: "accountName",
          label: "账户",
          refinfo: "fee-accounts"
        }, {
          type: "refer",
          key: "customer",
          keyfordisplay: "customerName",
          label: "客户",
          multi: true,
          refinfo: "customer",
          clientParam: {
            "EQ_isEnable": "1",
            "AUTH_refdim": "customer"
          },
        }, {
          type: "combo",
          key: "account--castTypeId",
          label: "兑付类型",
          dataSource: [{
            value: "pay01",
            name: "冲抵订单"
          }, {
            value: "pay02",
            name: "货补"
          }, {
            value: "pay03",
            name: "实物货补"
          }, {
            value: "pay04",
            name: "账扣"
          }]
        }, {
          type: "refer",
          key: "marketArea",
          keyfordisplay: "marketAreaName",
          label: "市场区域",
          referId: "marketAreaIdSearch",
          compid: "marketAreaCode",
          refinfo: "market",
          clientParam: {
              "EQ_isEnable": "1"
          }
        }]
      },
      dialogs: {
        dialog1: [
          {
            type: "text",
            key: "freezeMny",
            label: "冻结金额",
            disableInEdit: true,
          },{
            type: "text",
            key: "unfreezeMny",
            label: "解冻金额"
          }
        ],
        dialog2:[
          {
            type: "text",
            key: "availableMny",
            label: "可用金额",
            disableInEdit: true,
          },{
            type: "text",
            key: "freezeMny1",
            label: "冻结金额"
          }
        ],
        dialog3:[
          {
            type: "text",
            key: "mny",
            label: "交接金额",
            disableInEdit: true,
          },{
            type: "refer",
            key: "customerId",
            keyfordisplay: "customerName",
            label: "客户",
            referId: "customerId",
            compid: "customerIdBase",
            refinfo: "customer_sale",
            required: true,
            clientParam: {
              "EQ_isEnable": "1"
            }
          }
        ],
        dialog4:[
          {
            type: "text",
            key: "mny",
            label: "交接金额",
            disableInEdit: true,
          },{
            type: "refer",
            key: "marketAreaId",
            keyfordisplay: "marketAreaName",
            label: "市场区域",
            referId: "marketAreaId",
            compid: "marketAreaCode",
            refinfo: "market",
            required: true,
            clientParam: {
                "EQ_isEnable": "1"
            }
          }
        ]
      },
      details: {
        detail: [{
          key: "code",
          label: "账户编码",
        }, {
          key: "name",
          label: "账户名称",
        }, {
          key: "isEnable",
          label: "启用状态",
          computed: "enableFmt"
        }]
      },
      grids: {
        grid1: {
          domid: "potype",
          umeta: {
            id: "grid_potype",
            data: "simpleList",
            type: "grid",
            editable: false,
            multiSelect: true,
            showNumCol: true,
          },
          columns: [{
              field: "financeOrgName",
              dataType: "String",
              title: "财务组织",
            }, {
              field: "accountName",
              dataType: "String",
              title: "客户费用账户",
            }, {
              field: "castTypeId",
              dataType: "String",
              title: "兑付类型",
              renderType: "castTypeList"
            }, {
              field: "customerName",
              dataType: "String",
              title: "客户",
            }, {
              field: "marketAreaName",
              dataType: "String",
              title: "市场区域",
            }, {
              field: "saleOrgName",
              dataType: "String",
              title: "销售组织",
            }, {
              field: "projectName",
              dataType: "String",
              title: "项目",
            },  {
              field: "freezeMny",
              dataType: "String",
              title: "冻结金额",
              renderType: 'freezeMnyRender'
            },{
              field: "availableMny",
              dataType: "String",
              title: "可用金额",
              renderType: 'availMnyRender'
            },{
              field: "mny",
              dataType: "String",
              title: "总金额",
            }, {
              field: "currencyName",
              dataType: "String",
              title: "币种",
            },
             {
              field: "operation",
              dataType: "String",
              title: "操作",
              renderType: "feeManager",
              fixed: true,
              width: "110px"
            }
          ]
        }
      }
    };
    return new basemodel(model);
  });