define(['ocm_basemodel'], function(basemodel) {
  'use strict';
  var model = {
    metas: {
      someta: {
        meta: {
          id: {
            type: 'string'
          },
          financeOrgId: { //财务组织
            type: 'string',
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"财务组织" }',
            "refparam": '{"EQ_isEnable":"1","EQ_orgFuncRel":"07"}'
          },
          financeOrgCode: { //财务组织
            type: 'string'
          },
          financeOrgName: { //财务组织
            type: 'string'
          },
          billdate: {
            type: 'datetime'
          },
          dealObject: {
            type: 'string' //来往对象
          },
          customerId: { //客户
            type: 'string',
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
            refparam: '{"EQ_isEnable":"1"}',
          },
          customerCode: { //客户
            type: 'string'
          },
          customerName: { //客户
            type: 'string'
          },
          departmentId: { //部门
            type: 'string',
            refmodel: JSON.stringify(refinfo["department"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          departmentCode: { //部门
            type: 'string'
          },
          departmentName: {
            type: 'string'
          },
          salemanId: { //业务员
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"业务员" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          salemanCode: {
            type: 'string'
          },
          salemanName: {
            type: 'string'
          },
          // 物流公司
          logisticsCompanyId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['logistics-company']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司" }',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          logisticsCompanyCode: {
            type: 'string'
          },
          logisticsCompanyName: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          billState: { //单据状态
            type: 'integer'
          },
          note: { //note
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
          approver: { //审批人
            type: 'string'
          },
          approveTime: {
            type: 'datetime'
          },
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
          money: {
            type: 'amountFloat'
          }
        },
        pageSize: 10
      },
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
          beginBillcode: {
            type: 'string'
          },
          productLineId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['productLine']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
          }, //产品线
          productLineName: {
            type: 'string'
          }, //产品线
          saleOrgId: { //销售组织
            type: 'string',
            refmodel: JSON.stringify(refinfo['organization_ocm']),
            refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}',
            required: true,
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          invoiceCode: { //发票
            type: 'string'
          },
          currencyName: { //币种
            type: 'string'
          },
          goods: { //商品
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
            type: 'priceFloat'
          },
          receivableMoney: {
            type: 'amountFloat'
          },
          cancellationMoney: {
            type: 'amountFloat'
          },
          uncancellationMoney: {
            type: 'amountFloat'
          },
          account: { //账期
            type: 'string',
          },
          beginDate: {
            type: 'datetime'
          },
          endDate: {
            type: 'datetime'
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
            type: 'string'
          },
          projectName: {
            type: 'string'
          },
          money: {
            type: "amountFloat"
          }
        },
        pageSize: 10
      },
      currencyRefMeta: {
        meta: {
          currency: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['currency']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"币种" }',
          }
        },
        pageSize: 10
      },
      productRefMeta: {
        meta: {
          productref: {
            domid: "itemproductref",
            type: "string",
            refmodel: JSON.stringify(refinfo["product"]),
            refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            // refparam: '{"saleModel": "01", "customerRankCode": "01"}'
            // refparam: '{"customerId": '+localStorage.getItem("_A_P_customer")+'}'
          }
        }
      },
    },
    buttons: {
      buttonList: [
        // {
        //   key: "add",
        //   label: "新增",
        //   iconCls: "icon-plus",
        //   click: "showAddBillPanel",
        //   clickArg:"$data"
        // },
        //   {
        //     key: "del",
        //     label: "删除",
        //     iconCls: "icon-delete",
        //     click: "del",
        //   },
        // {
        //   key: "commit",
        //   label: "提交",
        //   iconCls: "icon-shanchu1",
        //   click: "commit"
        // },
        // {
        //   key: "audit",
        //   label: "审批",
        //   iconCls: "icon-qiyong",
        //   click: "audit"
        // },
        // {
        //   key: "export",
        //   label: " 导出",
        //   iconCls: "icon-tingyong",
        //   click: "exportHandle"
        // }
      ],
      buttonEdit: [
        //   {
        //   key: "addline",
        //   label: "增行",
        //   iconCls: "icon-plus",
        //   click: "addLineHandler",
        //   clickArg:"$data"
        // },
        {
          key: "addproducts",
          label: "产品",
          iconCls: "icon-plus",
          click: "addproductsHandler",
          clickArg: "$data"
        }, {
          key: "delline",
          label: "删行",
          iconCls: "icon-delete",
          click: "delLineHandler",
          clickArg: "$data"
        },
      ],
    },
    searchs: {
      search1: [{
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
        referId: 'cstm01',
        multi: true,
        opr: 'IN'
      }, {
        type: "refer",
        key: "billReceivableDetailsDtos--goods",
        label: "商品",
        refinfo: "goods",
        multi: true,
        opr: 'IN'
      }, {
        type: "daterange",
        key: "endDate",
        label: "到期日"
      }, {
        type: "daterange",
        key: "billdate",
        label: "应收日期"
      }, {
        type: "text",
        key: "code",
        label: "应收单号"
      }, {
        type: "refer",
        key: "billReceivableDetailsDtos--project",
        label: "项目",
        refinfo: "project"
      }, {
        type: "refer",
        key: "billReceivableDetailsDtos--billreceiptType",
        label: "收款款类型",
        refinfo: "settlementPaymentType"
      }, ],
    },
    grids: {
      gridList: {
        domid: "gridList",
        umeta: {
          id: "grid_head",
          data: "salesorderList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
          onBeforeClickFun: 'detail',
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
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织",
          }, {
            field: "billdate",
            dataType: "Date",
            title: "单据日期"
          },
          // {
          //   field: "beginTranstypeName",
          //   dataType: "String",
          //   title: "订单类型"
          // },
          {
            field: "dealObject",
            dataType: "Integer",
            title: "来往对象",
            renderType: "comboRender",
            editOptions: {
              type: "combo",
              datasource: "dealObjectSrc"
            },
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
          },
          // {
          //   field: "currencyName",
          //   dataType: "String",
          //   title: "币种",
          // },
          {
            field: "billState",
            dataType: "String",
            title: "单据状态",
            editOptions: {
              type: "combo",
              datasource: "billStateSrc"
            },
            renderType: "comboRender",
          }, {
            field: "money",
            dataType: "String",
            title: "总金额"
          }, {
            field: "note",
            dataType: "String",
            title: "备注"
          },
        ]
      },
      gridDetailItem: {
        domid: "gridDetailItem",
        umeta: {
          id: "grid_body",
          data: "saleOrderItems",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "serialnum",
          dataType: "String",
          title: "行号",
          editable: false
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          width: "200px"
        }, {
          field: "num",
          dataType: "String",
          title: "数量"
        }, {
          field: "price",
          dataType: "String",
          title: "价格"
        }, {
          field: "receivableMoney",
          dataType: "String",
          title: "应收金额"
        }, {
          field: "cancellationMoney",
          dataType: "String",
          title: "已核销金额"
        }, {
          field: "uncancellationMoney",
          dataType: "String",
          title: "待核销金额"
        }, {
          field: "accountName",
          dataType: "String",
          title: "账期"
        }, {
          field: "beginTranstypeName",
          dataType: "String",
          title: "订单类型"
        }, {
          field: "beginBillcode",
          dataType: "String",
          title: "销售订单号",
        }, {
          field: "productLineName",
          dataType: "String",
          title: "产品线",
        }, {
          field: "projectName",
          dataType: "String",
          title: "项目"
        }, {
          field: "beginDate",
          dataType: "String",
          title: "起算日"
        }, {
          field: "endDate",
          dataType: "String",
          title: "到期日"
        }, {
          field: "note",
          dataType: "String",
          title: "备注"
        }, ]
      },
      gridEditItem: {
        domid: "gridEditItem",
        umeta: {
          id: "grid_salesorder_edit",
          data: "saleOrderItems",
          type: "grid",
          editable: true,
          multiSelect: true,
          // showNumCol: true,
        },
        columns: [{
          field: "serialnum",
          dataType: "String",
          title: "行号",
          editable: false
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品",
          width: "200px",
          editable: false
        }, {
          field: "num",
          dataType: "float",
          title: "数量"
        }, {
          field: "price",
          dataType: "float",
          title: "价格"
        }, {
          field: "receivableMoney",
          dataType: "float",
          title: "应收金额"
        }, {
          field: "cancellationMoney",
          dataType: "float",
          title: "已核销金额"
        }, {
          field: "uncancellationMoney",
          dataType: "float",
          title: "待核销金额"
        }, {
          field: "account",
          dataType: "String",
          title: "账期",
          refinfo: 'settlementSettings',
          referId: 'accountsetting',
          renderType: "ncReferRender",
          editType: "ncReferEditType",
          showField: "accountName",
          editOptions: {
            validType: "string",
            rel: {
              // refpk: "account",
              refname: "accountName"
            }
          }
        }, {
          field: "productLineId",
          dataType: "String",
          title: "产品线",
          renderType: "ncReferRender",
          editType: "ncReferEditType",
          showField: "productLineName",
          editOptions: {
            validType: "string",
          }
        }, {
          field: "beginBillcode",
          dataType: "String",
          title: "销售订单号",
          // editable: false,
        }, {
          field: "beginTranstypeId",
          dataType: "String",
          title: "订单类型",
          refinfo: 'trantype',
          renderType: "ncReferRender",
          editType: "ncReferEditType",
          showField: "beginTranstypeName",
          editOptions: {
            validType: "string",
            rel: {
              refpk: "beginTranstypeId",
              refname: "beginTranstypeName"
            }
          },
        }, {
          field: "beginDate",
          dataType: "String",
          title: "起算日"
        }, {
          field: "endDate",
          dataType: "String",
          title: "到期日"
        }, {
          field: "note",
          dataType: "String",
          title: "备注"
        }, ]
      }
    },
    cards: {
      cardEdit: [{
          type: "refer",
          key: "financeOrgId",
          refinfo: "organization_ocm",
          label: "财务组织"
        }, {
          type: "refer",
          key: "saleOrgId",
          refinfo: "organization_ocm",
          label: "销售组织",
          required: true,
        }, {
          type: "refer",
          key: "customer",
          refinfo: "customer",
          label: "客户",
          referId: 'cstm00'
        },
        // {
        //   type: "refer",
        //   key: "gatherTypeId",
        //   label: "收款单类型",
        //   refinfo : "settlementGatheringType",
        // },
        {
          type: "textreadonly",
          key: "code",
          label: "单据号",
          value: ''
        }, {
          type: "date",
          key: "billdate",
          label: "单据日期"
        }, {
          type: "text",
          key: "dealObject",
          label: "来往对象"
        },

        {
          key: "department",
          type: "refer",
          label: "部门",
          refinfo: "department"
        }, {
          key: "saleman",
          type: "refer",
          label: "业务员",
          refinfo: "person"
        }, {
          key: "logisticsCompany",
          type: "refer",
          label: "物流公司",
          refinfo: "logistics-company"
        }, {
          type: "textarea",
          key: "note",
          label: "备注",
          cls: "ui-textarea-item"
        },
      ]
    },
    details: {
      cardDetail: [{
        key: "financeOrgName",
        label: "财务组织",
      }, {
        key: "saleOrgName",
        label: "销售组织"
      }, {
        key: "customerName",
        label: "客户",
      }, {
        key: "code",
        label: "单据号",
      }, {
        key: "billdate",
        label: "单据日期",
      }, {
        key: "dealObject",
        label: "来往对象",
        computed: "cgObj",
      }, {
        key: "departmentName",
        label: "部门",
      }, {
        key: "salemanName",
        label: "业务员",
      }, {
        key: "logisticsCompany",
        label: "物流公司",
      }, {
        key: "currencyName",
        label: "币种",
      }, {
        key: "money",
        label: "总金额",
      }, {
        key: "note",
        label: "备注",
      }, ],
    }
  };
  return new basemodel(model);
});