define(["ocm_basemodel"], function(basemodel) {
  'use strict';
  var model = {
    metas: {
      matchMeta: {
        params: {
          "cls": "com.yonyou.occ.settlement.service.dto.AccountDateRuleDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          code: {
            type: 'string',
            required: true
          }, //编码
          financeOrgId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
          }, //财务组织
          financeOrgCode: {
            type: 'string'
          }, //组织编码
          financeOrgName: {
            type: 'string'
          }, //组织名称
          saleOrgId: {
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
          }, //销售组织ID
          saleOrgCode: {
            type: 'string'
          }, //销售组织编码
          saleOrgName: {
            type: 'string'
          }, //销售组织名称
          orderTypeId: {
            type: 'String',
          }, //订单类型
          orderTypeName: {
            type: 'String'
          },
          customerTypeId: {
            type: "string",
          }, //客户分类
          customerTypeName: {
            type: "string",
            required: true,
          }, //客户分类
          customer: {
            type: "string",
            required: true,
          }, //客户
          accountId: {
            type: 'string',
            required: true,
          }, //账期
          accountName: {
            type: 'string',
            required: true,
          } //账期
        },
        pageSize: 10,
      },
    },
    details: {
      detail: [
        // {
        //   type: "text",
        //   key: "code",
        //   label: "编码",
        //   disableInEdit: true
        // },
        // {
        //   type: "text",
        //   key: "financeOrgName",
        //   label: "财务组织",
        // },
        {
          type: "text",
          key: "saleOrgName",
          label: "销售组织",
        }, {
          type: "text",
          key: "orderTypeName",
          label: "订单类型",
        }, {
          type: "text",
          key: "fixedAccountPeriodDays",
          label: "固定账期天数",
        }, {
          type: "text",
          key: "customerTypeName",
          label: "客户分类",
        }, {
          type: "text",
          key: "customerName",
          label: "客户",
        }, {
          type: "text",
          key: "accountName",
          label: "账期",
        }
      ]
    },

    buttons: { //操作按钮
      button1: [{
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "beforeEdit"
      }, {
        key: "del",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "del"
      }]
    },

    searchs: {
      search1: [{
        type: "refer",
        key: "saleOrg",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "01"
        }, //销售组织
        // multi: true,
        // opr: 'IN'
      }, {
        type: "refer",
        key: "orderType",
        label: "订单类型",
        refinfo: "trantype",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_billTypeId": "ReqOrder"
        }
      }, {
        type: "refer",
        key: "customerType",
        keyfordisplay: "customerCategoryName",
        label: "客户分类",
        refinfo: "customer-category",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "refer",
        key: "customer",
        keyfordisplay: "customerName",
        label: "客户",
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "refer",
        key: "account",
        label: "账期",
        refinfo: "settlementSettings",
      }]
    },

    //弹窗组
    dialogs: {
      dialog1: [
        // {
        //     type: "text",
        //     key: "code",
        //     label: "编码",
        //     disableInEdit: true
        //   },
        //  {
        //   type: "refer",
        //   key: "financeOrgId",
        //   label: "财务组织",
        // },
        {
          type: "refer",
          key: "saleOrgId",
          label: "销售组织",
          required: true,
        }, {
          type: "refer",
          key: "orderTypeId",
          referId: "orderTypeId",
          label: "订单类型",
          refinfo: "trantype",
          refName: "订单类型",
          clientParam: {
            "EQ_billTypeId": "SaleOrder"
          },
          required: true,
        },
        //      {
        //        type: "combo",
        //        key: "saleModelCode",
        //        keyfordisplay: "saleModelCode",
        //        label: "销售模式",
        //      },
        {
          type: "refer",
          key: "customerTypeId",
          label: "客户分类",
          refinfo: "customer-category",
        }, {
          type: "refer",
          key: "customerId",
          label: "客户",
          refinfo: "customer",
        }, {
          type: "refer",
          key: "accountId",
          label: "账期",
          refinfo: "settlementSettings",
        }
      ]
    },

    grids: {
      grid1: {
        domid: "paymenttype",
        umeta: {
          id: "grid_paymenttype",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [
          // {
          //   field: "code",
          //   dataType: "String",
          //   title: "编码",
          //   renderType: "detailRender"
          // },
          // {
          //   field: "financeOrgName",
          //   dataType: "String",
          //   title: "财务组织",
          // },
          {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织",
          }, {
            field: "orderTypeName",
            dataType: "String",
            title: "订单类型"
          }, {
            field: "customerTypeName",
            dataType: "String",
            title: "客户分类"
          }, {
            field: "customerName",
            dataType: "String",
            title: "客户"
          }, {
            field: "accountName",
            dataType: "String",
            title: "账期"
          }, {
            field: "creator",
            dataType: "String",
            title: "创建人"
          }, {
            field: "creationTime",
            dataType: "Date",
            title: "创建时间"
          }, {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation4single",
            fixed: true,
            width: "110px"
          },
        ]
      }
    }
  };
  return new basemodel(model);
});