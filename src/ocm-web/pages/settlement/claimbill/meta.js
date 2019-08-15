define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      claimbillList: {
        meta: {
          id: {
            type: 'string'
          }, //id
          financeOrgId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
          },
          financeOrgName: {
            type: 'string',
          }, //财务组织
          customerId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"客户"}'
          },
          customerName: {
            type: 'string',
          }, //客户
          claimFrom: {
            type: 'string',
          }, //来源
          code: {
            type: 'string'
          }, //单号
          claimTime: {
            type: 'datetime',
            required: true,
          }, //收款日期
          receiveTime: {
            type: 'datetime'
          },
          payAccount: {
            type: 'string'
          },
          payAccountId: {
            type: 'string'
          }, //付款银行账户
          payAccountAccountName: {
            type: 'string'
          }, //付款银行账户
          receiptAccountId: {
            type: 'string',
          }, //收款银行账户
          receiptAccountAccountName: {
            type: 'string',
          }, //收款银行账户
          currencyId: {
            type: 'string',
          },
          currencyName: {
            type: 'string'
          }, //币种
          note: {
            type: 'string'
          }, //备注
          billClaimState: {
            type: 'integer'
          }, //认领单状态
          creator: {
            type: 'string'
          }, //创建人
          creationTime: {
            type: 'datetime',
          }, //创建时间
          modifier: {
            type: 'string'
          }, //修改人
          modifiedTime: {
            type: 'datetime'
          }, //修改时间
          ts: {
            type: 'string'
          }, //时间戳
          dr: {
            type: 'integer'
          }, //删除标志
          payAccountBank: {
            type: 'string',
          }, //付款
          gatherAccountBank: {
            type: 'string'
          }, //收款
          saleOrgId: {
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
          },
          saleOrgName: {
            type: 'string'
          }, //销售组织
          dealObject: {
            type: 'string',
            required: true,
          }, //往来对象
          departmentId: {
            type: 'string',
            required: true,
          }, //部门
          departmentName: {
            type: 'string'
          }, //部门
          salemanId: {
            type: 'string',
            required: true,
          },
          salemanName: {
            type: 'string'
          }, //业务员
          logisticsCompanyId: {
            required: true,
            type: "string",
            "refmodel": JSON.stringify(refinfo['logistics-company']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}'
          }, //物流公司
          logisticsCompanyName: {
            type: "string"
          }, //物流公司
          ncOrder: {
            type: 'string'
          }, //nc单据号
          cliamState: {
            type: 'integer'
          }, //认领状态
          payTerm: {
            type: 'string'
          }, //收款方式
          money: {
            type: 'amountFloat'
          }, //金钱
          billclaimDetailDto: {
            type: 'array'
          },
          operation: {
            type: 'string'
          }
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      claimbillItem: {
        meta: {
          id: {
            type: 'string'
          }, //idp
          serialnum: {
            type: 'string',
          }, //行号
          billclaimId: {
            type: 'string',
          }, //认领单主键
          // productid: {type: 'string',required:true},//销售产品id
          money: {
            type: 'amountFloat',
          }, //金钱
          remainMoney: {
            type: 'amountFloat'
          }, //余额
          note: {
            type: 'string'
          }, //备注
          creator: {
            type: 'string'
          }, //创建人
          creationTime: {
            type: 'datetime'
          }, //创建时间
          modifier: {
            type: 'string'
          }, //修改人
          modifiedTime: {
            type: 'datetime'
          }, //修改时间
          ts: {
            type: 'string',
          }, //时间戳
          dr: {
            type: 'integer'
          },
          payTerm: {
            type: 'string'
          }, //收款方式
          orderCode: {
            type: 'string'
          }, //订单号
          saleOrgName: {
            type: 'string'
          }, //销售组织
          settleMethodId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['settlementMode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"结算方式" }',
          }, //结算方式
          settleMethodName: {
            type: 'string'
          }, //结算方式
          payAccountId: { //付款银行账户
            type: 'string',
            "refmodel": JSON.stringify(refinfo['ent-bank-account']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"付款银行账户" }',
            "refparam": '{"EQ_isEnable":"1"}'
          }, //付款银行账户
          payAccountAccountName: {
            type: 'string'
          }, //付款银行账户
          receiptAccountId: { //收款银行账户
            type: 'string',
            "refmodel": JSON.stringify(refinfo['ent-bank-account']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"付款银行账户" }',
            "refparam": '{"EQ_isEnable":"1"}'
          }, //收款银行账户
          receiptAccountAccountName: {
            type: 'string',
          }, //收款银行账户
          code: {
            type: 'string'
          }, //单号
          accountMoney: {
            type: "amountFloat"
          }, //累计认领金额
          projectId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"项目" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          projectName: {
            type: 'string'
          },
          billreceiptTypeId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['settlementPaymentType']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"收付款类型" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          billreceiptTypeName: {
            type: 'string',
          },
        },
        pageSize: 10,
      },
    },
    searchs: {
      search1: [{
        type: "refer",
        key: "financeOrg",
        label: "财务组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "07",
          "EQ_isEnable": "1"
        },
        multi: true,
        opr: 'IN'
      }, {
        type: "refer",
        key: "saleOrg",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "EQ_isEnable": "1"
        },
        multi: true,
        opr: 'IN'
      }, {
        type: "refer",
        key: "customer",
        label: "客户",
        refinfo: "customer",
        multi: true,
        opr: 'IN'
      }, {
        type: "daterange",
        key: "claimTime",
        label: "收款日期"
      }, {
        type: "text",
        key: "code",
        label: "认领单号"
      }, {
        type: "refer",
        key: "payAccount",
        label: "付款银行账户",
        refinfo: "ent-bank-account",
        multi: true,
        opr: 'IN'
      }, {
        type: "refer",
        key: "projectId",
        label: "项目",
        refinfo: "project"
      }, {
        type: "refer",
        key: "billreceiptType",
        label: "收付款类型",
        refinfo: "settlementPaymentType"
      }, {
        type: "checkboxlist",
        key: "cliamState",
        label: "认领状态",
        dataSource: [{
          value: '1',
          name: '待认领'
        }, {
          value: '2',
          name: '部分认领'
        }, {
          value: '3',
          name: '全部认领'
        }, ],
        cls: "ui-checkboxes-item"
      }, ]
    },
    buttons: {
      button1: [{
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddBillPanel"
        }, {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        }, {
          key: "submit",
          label: "提交",
          iconCls: "icon-tubiao-shenhe",
          click: "submitCusReqForm",
          auth: true
        }, {
          key: "unsubmit",
          label: "收回",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "unsubmitCusReqForm",
          auth: true
        }, {
          key: "approve",
          label: "审批通过",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "approveCusReqForm",
          auth: true
        }, {
          key: "disapprove",
          label: "审批不通过",
          iconCls: "icon-tubiao-shibai",
          click: "disapproveCusReqForm",
          auth: true
        }, {
          key: "cancelapprove",
          label: "取消审批",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "cancelApproveCusReqForm",
          auth: true
        }
        //            {
        //   key: "commit",
        //   label: "提交",
        //   iconCls: "icon-shanchu1",
        //   click: "commit"
        // },
        // {
        //   key: "audit",
        //   label: "审批通过",
        //   iconCls: "icon-tubiao-duigou-xianxing",
        //   // click: "approveCusReqForm",
        //   auth: true,
        //   click: "audit"
        // }, {
        //   key: "disapprove",
        //   label: "审批不通过",
        //   iconCls: "icon-tubiao-shibai",
        //   click: "disapproveCusReqForm",
        //   auth: true
        // }, {
        //   key: "unapprove",
        //   label: "取消审批",
        //   iconCls: "icon-tubiao-quxiaoshenhe",
        //   click: "unapprove"
        // },
      ],
      button2: [{
        key: "cancel",
        label: "取消",
        click: "cancelBill"
      }, {
        key: "save",
        label: "保存",
        click: "saveBill",
        cls: "ui-btn-green"
      }],
      button3: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "addNewItems"
      }, {
        key: "delrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delItems",
      }],
      button4: [{
        key: "return",
        label: "返回",
        click: "retListPanel"
      }, ],
    },
    cards: {
      card1: [{
        type: "refer",
        key: "financeOrgId",
        label: "财务组织",
        // refinfo: "organization_ocm",
        refName: "财务组织",
        required: true,
      }, {
        type: "refer",
        key: "saleOrgId",
        label: "销售组织",
        // refinfo: "organization_ocm",
        refName: "销售组织",
      }, {
        type: "combo",
        key: "dealObject",
        label: "往来对象",
        dataSource: [{
          value: "1",
          name: "客户"
        }, {
          value: "2",
          name: "部门"
        }, {
          value: "3",
          name: "业务员"
        }, {
          value: "4",
          name: "物流公司"
        }, ],
        namefield: "name",
        valuefield: "id",
        hasAll: true
      }, {
        type: "refer",
        key: "customerId",
        label: "客户",
        compid: "customerId",
        domid: "customerId",
        refinfo: "customer",
        refName: "客户",
        referId: 'cstm01',
        cls: 'custormerv visibleFalse',
        enable: false,
      }, {
        referId: "departmentId",
        type: "refer",
        compid: "department",
        key: "departmentId",
        label: "部门",
        domid: "department",
        refinfo: "department",
        cls: 'departmentv visibleFalse',
        enable: false
      }, {
        referId: "salemanId",
        type: "refer",
        key: "salemanId",
        label: "业务员",
        compid: "saleman",
        refinfo: "person",
        cls: 'salemanv visibleFalse',
        enable: false
      }, {
        type: "refer",
        key: "logisticsCompanyId",
        label: "物流公司",
        compid: "logisticsCompany",
        refName: "物流公司",
        cls: 'logisticsv visibleFalse',
        enable: false
      }, {
        type: "datetime",
        key: "claimTime",
        label: "收款日期",
        required: true,
        "rangeFlag": true,
      }, {
        type: "text",
        key: "payAccountAccountName",
        // refinfo: "ent-bank-account",
        label: "付款银行账户",
        // referId: 'payCard00',
      }, {
        type: "refer",
        key: "receiptAccountId",
        refinfo: "ent-bank-account",
        label: "收款银行账户",
        referId: 'receiptCard00',
      }, {
        type: "text",
        key: "money",
        label: "收款金额",
        enable: false
      }, {
        key: "currencyId",
        type: "refer",
        label: "币种",
        refinfo: "currency",
        referId: 'currencyRef',
      }, {
        type: "label",
        key: "cliamState",
        label: "认领状态",
        datasource: [{
          value: '1',
          name: '待认领'
        }, {
          value: '2',
          name: '部分认领'
        }, {
          value: '3',
          name: '全部认领'
        }, ],
      }, ]
    },
    details: {
      detail1: [{
        key: "financeOrgName",
        label: "财务组织",
      }, {
        key: "saleOrgName",
        label: "销售组织",
      }, {
        key: "dealObject",
        label: "往来对象",
        computed: "cgObj",
      }, {
        key: "customerName",
        label: "客户",
      }, {
        key: "departmentName",
        label: "部门",
      }, {
        key: "salemanName",
        label: "业务员",
      }, {
        key: "logisticsCompanyName",
        label: "物流公司",
      }, {
        key: "claimTime",
        label: "收款日期",
      }, {
        key: "payAccountAccountName",
        label: "付款银行账户"
      }, {
        key: "receiptAccountAccountName",
        label: "收款银行账户"
      }, {
        key: "money",
        label: "收款金额",
      }, {
        key: "currencyName",
        label: "币种",
      }, {
        key: "cliamState",
        label: "认领状态",
        computed: "claimStateDetail"
      }, ]
    },
    grids: {
      grid1: {
        domid: "grid_complex_dom",
        umeta: {
          "id": "grid_complex",
          "data": "complexList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "code",
          "dataType": "String",
          "title": "收款认领单号",
          "renderType": "detailRender"
        }, {
          "field": "financeOrgName",
          "dataType": "String",
          "title": "财务组织",
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户"
        }, {
          "field": "claimTime",
          "dataType": "Datetime",
          "title": "收款日期"
        }, {
          "field": "creationTime",
          "dataType": "Datetime",
          "title": "创建时间"
        }, {
          "field": "money",
          "dataType": "String",
          "title": "收款总金额"
        }, {
          "field": "cliamState",
          "dataType ": "String ",
          "title": "认领状态",
          "renderType": "claimOrderState"
        }, {
          "field": "billClaimState",
          "dataType": "String",
          "title": "认领单状态",
          "renderType": "claimState"
        }, {
          "field": "operation",
          "dataType": "String",
          "title": "操作",
          "renderType": "operation",
          "fixed": true,
          "width": "100px"
        }, ]
      },
      grid2: {
        domid: "grid_complexItem_dom",
        umeta: {
          "id": "grid_complexItem",
          "data": "complexItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "serialnum",
          "dataType": "String",
          "title": "行号",
          "editable": false
        }, {
          "field": "money",
          "dataType": "String",
          "title": "收款金额",
          "editType": "float",
          "required": true
        }, {
          "dataType": "String",
          "field": "settleMethodId",
          "title": "结算方式",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "settleMethodName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "settleMethodId",
              "refname": "settleMethodName"
            }
          },

        }, {
          "field": "payAccountAccountName",
          "dataType": "String",
          "title": "付款银行账户",
        }, {
          "field": "receiptAccountId",
          "dataType": "String",
          "title": "收款银行账户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "receiptAccountAccountName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "receiptAccountId",
              "refname": "receiptAccountAccountName"
            }
          },
        }, {
          "field": "orderCode",
          "dataType": "String",
          "title": "订单号",
        }, {
          "field": "projectId",
          "dataType": "String",
          "title": "项目",
          "refinfo": 'project',
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "projectName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "projectId",
              "refname": "projectName"
            }
          },
        }, {
          "field": "billreceiptTypeId",
          "dataType": "String",
          "title": "收付款类型",
          "refinfo": 'settlementPaymentType',
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "billreceiptTypeName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "billreceiptTypeId",
              "refname": "billreceiptTypeName"
            }
          },
        }, ]
      },
      grid3: {
        domid: "grid_democomplexItem2_dom",
        umeta: {
          "id": "grid_democomplexItem2",
          "data": "complexItems",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "serialnum",
          "dataType": "String",
          "title": "行号",
          "editable": false
        }, {
          "field": "money",
          "dataType": "String",
          "title": "收款金额",
        }, {
          "dataType": "String",
          "field": "settleMethodName",
          "title": "结算方式",
        }, {
          "field": "payAccountAccountName",
          "dataType": "String",
          "title": "付款银行账户",
        }, {
          "field": "receiptAccountAccountName",
          "dataType": "String",
          "title": "收款银行账户",
        }, {
          "field": "accountMoney",
          "dataType": "Float",
          "title": "累计认领金额",
        }, {
          "field": "orderCode",
          "dataType": "String",
          "title": "订单号",
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
        }, {
          "field": "billreceiptTypeName",
          "dataType": "String",
          "title": "收付款类型",
        }, ]
      },
    }
  }
  return new basemodel(model);
})