define(["ocm_basemodel"], function(basemodel) {
  'use strict';
  var model = {
    metas: {
      potypemeta: {
        meta: {
          balanceId: {
            type: 'string'
          }, //余额表主键
          accountId: {
            type: 'string',
          }, //客户费用账户
          accountName: {
            type: 'string'
          },
          customerId: {
            type: 'string'
          },
          customerName: {
            type: 'string'
          },
          castTypeId: {
            type: 'string',
          }, //兑付类型
          saleOrgId: {
            type: 'string',
            required: true
          }, //销售组织
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
            type: 'string'
          }, //币种
          currencyName: {
            type: 'string'
          },
          srcBillId: {
            type: 'string',
          }, //来源单主键
          srcBillCode: {
            type: 'string',
          }, //来源单号
          srcBillDate: {
            type: 'string',
          }, //来源单据日期
          srcBillDetailId: {
            type: 'string',
          }, //来源行主键
          srcBillDetailRowno: {
            type: 'string',
          }, //来源行号
          busiType: {
            type: 'string',
          }, //业务类型
          goodsId: {
            type: 'string',
          }, //商品
          goodsName: {
            type: 'string',
          }, //商品
          num: {
            type: 'numberFloat',
          }, //数量
          price: {
            type: 'priceFloat',
          }, //单价
          mny: {
            type: 'amountFloat'
          }, //金额
          balanceMny: {
            type: 'amountFloat',
          }, //结余金额
          balanceNum: {
            type: 'numberFloat',
          }, //结余数量
          updateTime: {
            type: 'date'
          }, //更新时间
        },
        pageSize: 10,
      }
    },
    searchs: {
      search1: [{
        type: "refer",
        key: "balance--account--financeOrg",
        label: "财务组织",
        refinfo: "organization_ocm",
        multi: true,
        required: true,
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "07",
          "AUTH_refdim": "balance.account.financeOrg"
        }
      }, {
        type: "refer",
        key: "balance--account--saleOrg",
        keyfordisplay: "saleOrgName",
        label: "销售组织",
        refinfo: "organization_ocm",
        multi: true,
        clientParam: {
          "EQ_orgFuncRel": "01",
          "AUTH_refdim": "balance.account.saleOrg"
        }
      }, {
        type: "refer",
        key: "balance--customer",
        label: "客户",
        refinfo: "customer",
        multi: true,
        clientParam: {
          "EQ_isEnable": "1",
          "AUTH_refdim": "balance.customer"
        }
      }, {
        type: "refer",
        key: "balance--account--id",
        label: "账户",
        refinfo: "fee-accounts",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "combo",
        key: "balance--account--castTypeId",
        label: "兑付类型",
        dataSource: [{
          value: "pay01",
          name: "冲抵订单"
        }, {
          value: "pay02",
          name: "货补"
//        }, {
//          value: "pay03",
//          name: "实物货补"
        }, {
          value: "pay04",
          name: "账扣"
        }]
      }, {
        type: "daterange",
        key: "updateTime",
        label: "起止时间",
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
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织",
        }, {
          field: "castTypeId",
          dataType: "String",
          title: "兑付类型",
          renderType: "castTypeList"
        }, {
          field: "currencyName",
          dataType: "String",
          title: "币种",
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户",
        }, {
          field: "mny",
          dataType: "String",
          title: "金额",
        }, {
          field: "balanceMny",
          dataType: "String",
          title: "结余金额",
        }, {
          field: "busiType",
          dataType: "String",
          title: "业务类型",
          renderType: "typeList"
        }, {
          field: "srcBillCode",
          dataType: "String",
          title: "来源单号"
        }, {
          field: "updateTime",
          dataType: "Date",
          title: "更新时间"
        }]
      }
    }
  };
  return new basemodel(model);
});