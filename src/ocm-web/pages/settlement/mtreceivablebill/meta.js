define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      soitemmeta: {
        meta: {
          id: {
            type: 'string'
          },
          serialnum: { //行号
            type: 'string'
          },
          receivableId: {
            type: 'string'
          },
          code: { //code
            type: 'string'
          },
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
          saleOrgId: { //销售组织
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            "refparam": '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}'
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
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
          billdate: {
            type: 'dataTime',
            required: true,
          }, //单据日期
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
            type: "string",
            required: true,
            "refmodel": JSON.stringify(refinfo['logistics-company']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}'
          }, //物流公司
          logisticsCompanyName: {
            type: 'string'
          },
          // goods: { //商品
          //   type: 'string',
          //   "refmodel": JSON.stringify(refinfo['goods']),
          //   "refcfg": '{"ctx":"/uitemplate_web","refName":" 商品" }',
          //   "refparam": '{"EQ_isEnable":"1"}',
          // },
          billState: { //单据状态
            type: 'integer'
          },
          note: {
            type: 'string',
          },
          startdateHead: {
            type: 'dataTime',
            required:true
          },
          srcBilltype: {
            type: 'string'
          },
          srcBillcode: {
            type: 'string'
          },
          srcBillid: {
            type: 'string'
          },
          srcTranstype: {
            type: 'string'
          },
          beginBilltype: {
            type: 'string'
          },
          beginBillcode: {
            type: 'string'
          },
          beginBillid: {
            type: 'string',
          },
          beginTranstype: {
            type: 'string'
          },
          approver: { //审批人
            type: 'string'
          },
          approveTime: {
            type: 'datetime'
          },
          billreceiptType: {
            type: 'tring'
          }, //收付款业务类型
          money: {
            type: 'float'
          }, //金钱
          isnit: {
            type: 'integer'
          }, //是否期初
          loan: {
            type: 'integer'
          }, //是否红冲
          state: {
            type: 'integer'
          }, //审批流字段
          isCheckReceivable: {
            type: 'integer'
          }, //是否核销 
          creator: {
            type: 'string'
          },
          creationTime: {
            type: 'datetime'
          },
          modifier: {
            type: 'string'
          },
          modifiedTime: {
            type: 'datetime'
          },
          dr: {
            type: 'string'
          },
          operation: {
            type: 'string'
          }
        },
        pageSize: 10
      },
      soitemmetaItem: {
        meta: {
          id: {
            type: 'string'
          },
          serialnum: { //行号
            type: 'string'
          },
          receivableId: {
            type: 'string'
          },
          code: { //code
            type: 'string'
          },
          productLineId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['productLine']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          },
          productLineName: {
            type: 'string'
          }, //产品线
          saleOrgId: { //销售组织
            type: 'string',
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            "refparam": '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}',
            required: true,
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          invoiceCode: { //发票号
            type: 'string'
          },
          goodsId: { //商品
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":" 商品" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          goodsCode: { //商品
            type: 'string'
          },
          goodsName: { //商品
            type: 'string'
          },
          num: {
            type: 'float'
          },
          price: {
            type: 'float',
            min: 0.01
          },
          receivableMoney: {
            type: 'float',
            required: true
          },
          cancellationMoney: {
            type: 'float'
          },
          uncancellationMoney: {
            type: 'float'
          },
          accountId: { //账期
            type: 'string',
            "refmodel": JSON.stringify(refinfo['settlementSettings']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"账期设置" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          accountName: {
            type: 'string'
          },
          currencyId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['currency']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"币种" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          currencyName: {
            type: 'string'
          },
          beginDate: {
            type: 'date'
          },
          endDate: {
            type: 'date'
          },
          note: {
            type: 'string'
          },
          srcBilltype: {
            type: 'string'
          },
          srcBillcode: {
            type: 'string'
          },
          srcBillid: {
            type: 'string'
          },
          srcTranstype: {
            type: 'string'
          },
          beginBilltype: {
            type: 'string'
          },
          beginBillcode: {
            type: 'string'
          },
          beginBillid: {
            type: 'string',
          },
          beginTranstype: {
            type: 'string'
          },
          beginSerialnum: {
            type: 'string'
          },
          operation: {
            type: 'string'
          },
          projectId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"项目" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          projectName: {
            type: 'string'
          },
          beginTranstypeId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['trantype']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"订单类型" }',
            "refparam": '{"EQ_billTypeId": "SaleOrder"}'
          },
          beginTranstypeName: {
            type: 'string'
          },
          dr: {
            type: 'string'
          }
        },
        pageSize: 10
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
        }, {
          type: "refer",
          key: "billReceivableDetailsDtos--goods",
          label: "商品",
          refinfo: "goods",
        }, {
          type: "daterange",
          key: "endDate",
          label: "到期日"
        }, {
          type: "text",
          key: "code",
          label: "应收单号"
        }, {
          type: "refer",
          key: "billReceivableDetailsDtos--project",
          label: "项目",
          refinfo: "project"
        },
        // {
        //   type: "text",
        //   key: "billreceiptType",
        //   label: "收付款类型",
        // },
      ]
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
        },
        // {
        //   key: "audit",
        //   label: "审批",
        //   iconCls: "icon-qiyong",
        //   click: "audit"
        // }, {
        //   key: "unapprove",
        //   label: "取消审批",
        //   iconCls: "icon-tingyong",
        //   click: "unapprove"
        // }, {
        //   key: "commit",
        //   label: "提交",
        //   iconCls: "icon-shanchu1",
        //   click: "commit"
        // },
        // {
        //   key: "import",
        //   label: "导入",
        //   iconCls: "icon-import",
        //   click: "importHandle"
        // }, {
        //   key: "export",
        //   label: "导出",
        //   iconCls: "icon-export",
        //   click: "exportHandle"
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
        refName: "财务组织",
        required: true,
      }, {
        type: "refer",
        key: "saleOrgId",
        label: "销售组织",
        refName: "销售组织",
      }, {
        type: "radio",
        key: "isnit",
        label: "是否期初",
        required: true,
        dataSource: [{
          value: '0',
          name: '否'
        }, {
          value: '1',
          name: '是'
        }]
      }, {
        type: "textreadonly",
        key: "code",
        value: '',
        label: "单据号",
      }, {
        type: "datetime",
        key: "billdate",
        label: "单据日期",
        required: true,
      }, {
        type: "date",
        key: "startdateHead",
        label: "起算日期",
        required:true
      }, {
        type: "combo",
        key: "dealObject",
        label: "往来对象",
        required: true,
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
        compid: "customer",
        domid: "customer",
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
        type: "Float",
        key: "money",
        label: "总金额"
      }, {
        type: "textarea",
        key: "note",
        label: "备注",
        cls: "ui-textarea-item"
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
        key: "isnit",
        label: "是否期初",
        computed: "isnitSrc",
      }, {
        key: "code",
        label: "单据号",
      }, {
        key: "billdate",
        label: "单据日期",
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
        key: "money",
        label: "总金额"
      }, {
        key: "note",
        label: "备注",
        cls: "ui-textarea-item"
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
          field: "code",
          dataType: "String",
          title: "单据号",
          renderType: "detailRender",
          width: "200px"
        }, {
          field: "financeOrgName",
          dataType: "String",
          title: "财务组织"
        }, {
          field: "billdate",
          dataType: "Datetime",
          title: "单据日期",
          width: '150px'
        }, {
          field: "dealObject",
          dataType: "Integer",
          title: "来往对象",
          renderType: "comboRender",
          editOptions: {
            type: "combo",
            datasource: "dealObjectSrc"
          }
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户"
        }, {
          field: "departmentName",
          dataType: "String",
          title: "部门"
        }, {
          field: "salemanName",
          dataType: "String",
          title: "业务员"
        }, {
          field: "logisticsCompanyName",
          dataType: "String",
          title: "物流公司"
        }, {
          field: "isCheckReceivable",
          dataType: "String",
          title: "是否核销",
          editOptions: {
            type: "combo",
            datasource: "isCheckReceivableSrc"
          },
          renderType: "comboRender",
        }, {
          field: "billState",
          dataType: "String",
          title: "单据状态",
          editOptions: {
            type: "combo",
            datasource: "billStateSrc"
          },
          renderType: "comboRender",
        }, {
          field: "note",
          dataType: "String",
          title: "备注"
        }, {
          field: "operation",
          dataType: "String",
          title: "操作",
          renderType: "operation",
          fixed: true,
          width: "100px"
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
          "dataType": "String",
          "field": "currencyId",
          "title": "币种",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "currencyName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "currencyId",
              "refname": "currencyName"
            }
          },
        }, {
          "field": "goodsId",
          "dataType": "String",
          "title": "商品",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "goodsId",
              "refname": "goodsName"
            }
          },
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
          "field": "beginBillcode",
          "dataType": "String",
          "title": "销售订单号",
          // "editable": false,
        }, {
          "field": "productLineId",
          "dataType": "String",
          "title": "产品线",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "productLineName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "productLineId",
              "refname": "productLineName"
            }
          }
        }, {
          "field": "num",
          "dataType": "Float",
          "title": "数量",
        }, {
          "field": "price",
          "dataType": "Float",
          "title": "价格",
        }, {
          "field": "receivableMoney",
          "dataType": "Float",
          "title": "应收金额",
          'required': true
        }, {
          "field": "cancellationMoney",
          "dataType": "Float",
          "title": "已核销金额",
          "editable": false
        }, {
          "field": "uncancellationMoney",
          "dataType": "Float",
          "title": "待核销金额",
          "editable": false
        }, {
          "field": "beginTranstypeId",
          "dataType": "String",
          "title": "订单类型",
          "refinfo": 'trantype',
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "beginTranstypeName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "beginTranstypeId",
              "refname": "beginTranstypeName"
            }
          },
        }, {
          "field": "accountId",
          "dataType": "String",
          "title": "账期",
          "refinfo": 'settlementSettings',
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "accountName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "accountId",
              "refname": "accountName"
            }
          },
        }, {
          "field": "beginDate",
          "dataType": "String",
          "title": "起算日期",
          "editType": "date",
          'required': true
        }, {
          "field": "endDate",
          "dataType": "String",
          "title": "到期日期",
          "editType": "date"
        }, {
          "field": "note",
          "dataType": "String",
          "title": "备注",
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
        }, {
          "dataType": "String",
          "field": "currencyName",
          "title": "币种",
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品",
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
        }, {
          "field": "beginBillcode",
          "dataType": "String",
          "title": "销售订单号",
        }, {
          "field": "productLineName",
          "dataType": "String",
          "title": "产品线",
        }, {
          "field": "num",
          "dataType": "Float",
          "title": "数量",
        }, {
          "field": "price",
          "dataType": "Float",
          "title": "价格",
        }, {
          "field": "receivableMoney",
          "dataType": "Float",
          "title": "应收金额",
        }, {
          "field": "cancellationMoney",
          "dataType": "Float",
          "title": "已核销金额",
        }, {
          "field": "uncancellationMoney",
          "dataType": "Float",
          "title": "待核销金额",
        }, {
          "field": "accountName",
          "dataType": "String",
          "title": "账期",
        }, {
          "field": "beginTranstypeName",
          "dataType": "String",
          "title": "订单类型",
        }, {
          "field": "beginDate",
          "dataType": "Datetime",
          "title": "起算日期",
        }, {
          "field": "endDate",
          "dataType": "Datetime",
          "title": "到期日期",
        }, {
          "field": "note",
          "dataType": "String",
          "title": "备注",
        }, ]
      },
    }
  }
  return new basemodel(model);
})