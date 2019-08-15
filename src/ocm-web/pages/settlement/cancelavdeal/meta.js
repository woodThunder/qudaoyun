define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      soitemmeta: { //收款单字段对照
        meta: {
          id: {
            type: 'string'
          },
          serialnum: { //行号
            type: 'string'
          },
          billreceiptId: {
            type: 'string'
          }, //收款单主键
          billreceiptCode: { //code
            type: 'string'
          },
          financeOrgName: {
            type: 'string',
          }, //财务组织
          saleOrgId: { //销售组织
            type: 'string',
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          customerName: {
            type: 'string'
          },
          gatherTypeName: {
            type: 'string'
          },
          paymentType: { //收付款类型
            type: 'string',
          },
          money: { //金额
            type: 'amountFloat'
          },
          productLineName: { //产品线
            type: 'string'
          },
          remainMoney: {
            type: 'amountFloat'
          }, //未核销金额曾用名 余额
          alreadyMoney: { //已核销金额
            type: 'amountFloat'
          },
          accountMoney: { //累计认领金额
            type: 'amountFloat'
          },
          note: { //备注
            type: 'string',
            maxLength: 400
          },
          orderId: { //订单号
            type: 'string'
          },
          caMoney: { //本次核销金额
            type: 'amountFloat'
          },
          payTerm: {
            type: 'string'
          }, //收款方式
          claimId: {
            type: 'string'
          }, //认领单id
          claimPeoId: {
            type: 'string'
          }, //认领人员id
          billreceiptTypeId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['settlementPaymentType']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"收付款类型" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          billreceiptTypeName: {
            type: 'string',
          },
          projectName: {
            type: 'string'
          }, //项目
          payAccountName: { //付款银行账户
            type: 'string',
          },
          receiptAccountName: {
            type: 'string',
          }, //收款银行账户
          fromCode: {
            type: 'string'
          }, //来源单据号
          code: {
            type: 'string'
          }, //收款单号
          billreceiptTime: {
            type: 'data'
          }, //收款日期
        },
        pageSize: 10
      },
      claimbillList: { //应收单字段显示页面对照
        meta: {
          id: {
            type: 'string'
          }, //id
          serialnum: {
            type: 'string',
          }, //行号
          code: {
            type: 'string',
          }, //编码
          receivableId: {
            type: 'string',
          }, //应收单主键
          billreceiptTypeId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['settlementPaymentType']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"收付款类型" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          billreceiptTypeName: {
            type: 'string',
          }, //应收单类型
          billReceivableCode: {
            type: 'string',
          }, //应收单号
          invoiceCode: {
            type: 'string',
          }, //发票号
          saleOrg: {
            type: 'string',
          }, //销售组织
          currencyName: {
            type: 'string'
          }, //币种
          goodsName: {
            type: 'string',
          }, //商品
          num: {
            type: 'string'
          }, //数量
          price: {
            type: 'priceFloat'
          }, //价格
          receivableMoney: {
            type: 'amountFloat'
          }, //应收金额
          cancellationMoney: {
            type: 'amountFloat',
          }, //已核销金额
          uncancellationMoney: {
            type: 'amountFloat',
          }, //待核销金额
          accountName: {
            type: 'string'
          }, //账期
          note: {
            type: 'string',
            maxLength: 400
          }, //备注
          srcBilltype: {
            type: 'string'
          }, //来源单据类型
          srcBillcode: {
            type: 'string'
          }, //来源单据号
          srcBillid: {
            type: 'datetime',
          }, //来源单据主键
          srcSerialnum: {
            type: 'string'
          }, //来源单据行号
          beginBillcode: {
            type: 'string'
          }, //源头单据号
          ts: {
            type: 'string'
          }, //时间戳
          dr: {
            type: 'integer'
          }, //删除标志
          beginBillid: {
            type: 'string',
          }, //源头单据主键
          beginTranstype: {
            type: 'string'
          }, //源头单据交易类型
          beginSerialnum: {
            type: 'string'
          }, //源头单据行号
          billdate: {
            type: 'data'
          }, //单据日期
          endDate: {
            type: 'data'
          }, //到期日
          caMoney: {
            type: 'amountFloat'
          }, //本次核销金额
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
          num: {
            type: 'float',
          }, //核销组号
          customerCode: {
            type: 'string',
          },
          customerId: {
            type: 'string',
          },
          customerName: {
            type: 'string',
          },
          money: {
            type: 'amountFloat',
          }, //核销金额
          billType: {
            type: 'string',
          }, //单据类型
          peo: {
            type: 'string'
          }, //核销人
          checkDay: {
            type: 'datetime'
          }, //核销日期
          billCode: {
            type: 'string'
          }, //单据编号
          tranType: {
            type: 'string'
          }, //交易类型
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
          projectId: {
            type: 'string'
          }, //项目
          projectName: {
            type: 'string'
          }, //项目
          financeOrgCode: {
            type: 'string'
          }, //订单号
          financeOrgId: {
            type: 'string'
          }, //订单号
          financeOrgName: {
            type: 'string'
          }, //订单号
          saleOrgId: {
            type: 'string'
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          }, //销售组织
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
          required: true,
          clientParam: {
            "EQ_orgFuncRel": "07",
            "EQ_isEnable": "1"
          },
        }, {
          type: "refer",
          key: "saleOrg",
          label: "销售组织",
          refinfo: "organization_ocm",
          required: true,
          clientParam: {
            "EQ_orgFuncRel": "01",
            "EQ_isEnable": "1"
          },
        }, {
          type: "refer",
          key: "customer",
          label: "客户",
          refinfo: 'customer',
          required: true,
          clientParam: {
            "EQ_isEnable": "1"
          },
        }, {
          type: "daterange",
          key: "billreceiptTime",
          label: "收款单收款日期"
        }, {
          type: "text",
          key: "code",
          label: "收款单收款单号",
        },
        // {
        //   type: "refer",
        //   key: "orderType",
        //   label: "收款单类型",
        //   refinfo: "trantype",
        //   multi: true,
        //   opr: 'IN'
        // },
        {
          type: "daterange",
          key: "endDate",
          label: "应收单到期日期"
        }, {
          type: "daterange",
          key: "billdate",
          label: "应收单单据日期"
        }, {
          type: "text",
          key: "billReceivableCode",
          label: "应收单单号",
        },
      ],
      search2: [{
        type: "refer",
        key: "financeOrg",
        label: "财务组织",
        refinfo: "organization_ocm",
        required: true,
        clientParam: {
          "EQ_orgFuncRel": "07",
          "EQ_isEnable": "1"
        },
      }, {
        type: "refer",
        key: "saleOrg",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "EQ_isEnable": "1"
        },
      }, {
        type: "refer",
        key: "customer",
        label: "客户",
        refinfo: "customer",
      }, ],
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
        key: "audit",
        label: "审批",
        iconCls: "icon-qiyong",
        click: "audit"
      }, {
        key: "unapprove",
        label: "取消审批",
        iconCls: "icon-tingyong",
        click: "unapprove"
      }, {
        key: "commit",
        label: "提交",
        iconCls: "icon-shanchu1",
        click: "commit"
      }, ],
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
      }, {
        key: "edit",
        label: "编辑",
        click: "detail2bill",
        cls: "ui-btn-green"
      }],
    },
    grids: {
      grid1: {
        domid: "grid_complex_dom",
        umeta: {
          "id": "grid_complex",
          "data": "salesorderList",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "height": "300px",
          "showSumRow": true,
          "sortable": false,
          "onRowSelected": "autoSetMoney",
          "onRowUnSelected": "autoUnSetMoney",
          "sumRowFixed": true,
        },
        columns: [{
          "field": "financeOrgName",
          "dataType": "String",
          "title": "财务组织",
          "editable": false,
        }, {
          "field": "saleOrgName",
          "dataType": "String",
          "title": "销售组织",
          "editable": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "width": "100px",
        }, {
          "field": "billreceiptTypeName",
          "dataType": "String",
          "title": "收款类型",
          "editable": false,
          "width": "100px",
        }, {
          "field": "code",
          "dataType": "String",
          "title": "收款单号",
          "editable": false,
        }, {
          "field": "productLineName",
          "dataType": "String",
          "title": "产品线",
          "editable": false,
        }, {
          "field": "billreceiptTime",
          "dataType": "Datetime",
          "title": "收款日期",
          "editable": false,
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
          "editable": false,
        }, {
          "field": "money",
          "dataType": "String",
          "title": "金额",
          "editable": false,
          "width": "80px",
        }, {
          "field": "remainMoney",
          "dataType": "String",
          "title": "余额",
          "editable": false,
          "width": "80px",
        }, {
          "field": "caMoney",
          "dataType": "String",
          "title": "本次核销金额",
          "sumCol": true,
          "width": "150px",
          "editType": "float",
        }, ]
      },
      grid2: {
        domid: "grid_shouldReceivable_dom",
        umeta: {
          "id": "grid_shouldReceivable",
          "data": "shouldReceivable",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "height": "400px",
          "sortable": false,
          "showSumRow": true,
          "onRowSelected": "autoSetMoney",
          "onRowUnSelected": "autoUnSetMoney",
          "sumRowFixed": true,
        },
        columns: [{
          "field": "financeOrgName",
          "dataType": "String",
          "title": "财务组织",
          "editable": false,
        }, {
          "field": "saleOrgName",
          "dataType": "String",
          "title": "销售组织",
          "editable": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "width": "100px",
        }, {
          "field": "billreceiptTypeName",
          "dataType": "String",
          "title": "应收单类型",
          "editable": false,
          "width": "100px",
        }, {
          "field": "billReceivableCode",
          "dataType": "String",
          "title": "应收单号",
          "editable": false,
        }, {
          "field": "billdate",
          "dataType": "Datetime",
          "title": "单据日期",
          "editable": false,
        }, {
          "field": "endDate",
          "dataType": "Datetime",
          "title": "到期日期",
          "editable": false,
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
          "editable": false,
        }, {
          "field": "receivableMoney",
          "dataType": "String",
          "title": "金额",
          "editable": false,
          "width": "80px",
        }, {
          "field": "uncancellationMoney",
          "dataType": "String",
          "title": "余额",
          "editable": false,
          "width": "80px",
        }, {
          "field": "caMoney",
          "dataType": "String",
          "title": "本次核销金额",
          "sumCol": true,
          "width": "150px",
          "editType": "float",
        }, ]
      },
      grid3: {
        domid: "grid_democomplexItem2_dom",
        umeta: {
          "id": "grid_democomplexItem2",
          "data": "complexItems",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true,
          "onRowSelected": "selectByGroup",
          "onRowUnSelected": "unSelectByGroup",
          "height": "400px",
        },
        columns: [{
          "field": "num",
          "dataType": "string",
          "title": "核销组号",
        }, {
          "field": "financeOrgName",
          "dataType": "String",
          "title": "财务组织",
          "editable": false,
        }, {
          "field": "saleOrgName",
          "dataType": "String",
          "title": "销售组织",
          "editable": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "width": "100px",
        }, {
          "field": "billType",
          "dataType": "String",
          "title": "单据类型",
          "editOptions": {
            "type": "combo",
            "datasource": "billTypeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "billCode",
          "dataType": "String",
          "title": "单据编号",
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
        }, {
          "field": "checkDay",
          "dataType": "data",
          "title": "核销日期",
        }, {
          "field": "money",
          "dataType": "String",
          "title": "核销金额",
        }, {
          "field": "peo",
          "dataType": "String",
          "title": "核销人",
        }, ]
      },
    }
  }
  return new basemodel(model);
})