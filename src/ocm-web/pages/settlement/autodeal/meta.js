define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      soitemmeta: { //收款单字段对照
        meta: {
          financeOrgId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}',
            required: true,
          },
          financeOrgName: {
            type: 'string',
          }, //财务组织
          saleOrgId: {
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}', //销售组织
          },
          saleOrgName: {
            type: 'string'
          },
          customerId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"客户"}'
          },
          customerName: {
            type: 'string'
          },
          billreceiptTime: {
            type: "date"
          }, //收款单收款日期
          billreceiptTimeE: {
            type: "date"
          }, //收款单收款日期
          code: {
            type: "string"
          }, //收款单号
          endDate: {
            type: "date"
          }, //应收单到期日期
          endDateE: {
            type: "date"
          }, //应收单到期日期
          billdate: {
            type: "date"
          }, //应收单单据日期
          billdateE: {
            type: "date"
          }, //应收单单据日期
          billReceivableCode: {
            type: "string"
          }, //应收单号
        },
        pageSize: 10
      },
      rulsItem: { //规则
        meta: {
          customer: {
            type: 'integer',
            default: 1
          }, //客户,
          saleOrg: {
            type: 'integer',
          }, //按销售组织匹配,
          saleOrgOrderNum: {
            type: 'integer',
            default: 1,
          }, // 销售订单号,
          saleOrgOrderType: {
            type: 'integer'
          }, //销售订单类型,
          productLine: {
            type: 'integer'
          }, //产品线,
          project: {
            type: 'integer'
          }, //项目,
          salesManager: {
            type: 'integer'
          }, //按业务员，销售经理,
          saleDepartment: {
            type: 'integer',
            default: 0
          }, //销售部门,
          saleManager: {
            type: 'integer',
            default: 0
          }, //按产销售经理匹配
        }
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
            type: 'float'
          }, //价格
          receivableMoney: {
            type: 'float'
          }, //应收金额
          cancellationMoney: {
            type: 'float',
          }, //已核销金额
          uncancellationMoney: {
            type: 'float',
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
            type: 'float'
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
            type: 'float',
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
            type: 'string',
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
          },
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
    cards: {
      card1: [{
        type: "refer",
        key: "financeOrgId",
        label: "财务组织",
        refName: "财务组织",
        required: true,
      }, {
        type: "refer",
        key: "saleOrgId",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "EQ_isEnable": "1"
        },
      }, {
        type: "refer",
        key: "customerId",
        label: "客户",
        refinfo: 'customer',
        clientParam: {
          "EQ_isEnable": "1"
        },
      }, {
        type: "text",
        key: "code",
        label: "收款单号",
      }, {
        type: "date",
        key: "billreceiptTime",
        label: "收款单收款日期起"
      }, {
        type: "date",
        key: "billreceiptTimeE",
        label: "收款单收款日期止"
      }, {
        type: "date",
        key: "endDate",
        label: "应收单到期日期起"
      }, {
        type: "date",
        key: "endDateE",
        label: "应收单到期日期止"
      }, {
        type: "date",
        key: "billdate",
        label: "应收单单据日期起"
      }, {
        type: "date",
        key: "billdateE",
        label: "应收单单据日期止"
      }, {
        type: "text",
        key: "billReceivableCode",
        label: "应收单单号",
      }, ],
      card2: [{
          type: "checkbox",
          key: "customer",
          label: "按客户匹配",
          defaultvalue: 1,
          checkedValue: 1,
          unCheckedValue: 0,
          enable: false,
        }, {
          type: "checkbox",
          key: "saleOrg",
          label: "按销售组织匹配",
          defaultvalue: 1,
          checkedValue: 1,
          unCheckedValue: 0,
          enable: false,
        }, {
          type: "checkbox",
          key: "saleOrgOrderNum",
          label: "按销售订单号匹配",
          defaultvalue: 0,
          checkedValue: 1,
          unCheckedValue: 0,
        }, {
          type: "checkbox",
          key: "saleOrgOrderType",
          label: "按销售订单类型匹配",
          defaultvalue: 0,
          checkedValue: 1,
          unCheckedValue: 0,
        }, {
          type: "checkbox",
          key: "productLine",
          label: "按产品线匹配",
          defaultvalue: 0,
          checkedValue: 1,
          unCheckedValue: 0,
        }, {
          type: "checkbox",
          key: "project",
          label: "按项目匹配",
          defaultvalue: 0,
          checkedValue: 1,
          unCheckedValue: 0,
        },
        // {
        //   type: "checkbox",
        //   key: "saleDepartment",
        //   label: "按销售部门匹配",
        //   defaultvalue: 0,
        //   checkedValue: 1,
        //   unCheckedValue: 0,
        //   enable: false,
        // //    默認要傳參數0
        // }, {
        //   type: "checkbox",
        //   key: "saleManager",
        //   label: "按产销售经理匹配",
        //   defaultvalue: 0,
        //   checkedValue: 1,
        //   unCheckedValue: 0,
        //   enable: false,
        //     },
      ],
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
        label: "收款单号",
      }, {
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
      }],
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
        key: "clear",
        label: "清空",
        iconCls: "icon-shanchu1",
        click: "clearFun"
      }, {
        key: "commit",
        label: "核销",
        iconCls: "icon-export",
        click: "commitFun"
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