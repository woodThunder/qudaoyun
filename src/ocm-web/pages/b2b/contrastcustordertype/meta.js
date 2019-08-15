define(["ocm_basemodel"], function(basemodel) {
  'use strict';
  var model = {
    metas: {
      cust_ordertype: {
        meta: {
          id: {
            type: 'string'
          }, //id
          organizationId: {
            type: 'string'
          }, //销售组织
          organizationName: {
            type: 'string'
          }, //销售组织
          organizationCode: {
            type: 'string'
          }, //销售组织
          customerId: {
            type: 'string'
          }, //客户
          customerName: {
            type: 'string'
          }, //客户
          customerCode: {
            type: 'string'
          }, //客户
          customerCategoryId: {
            type: 'string'
          }, //客户分类
          customerCategoryName: {
            type: 'string'
          }, //客户分类
          customerCategoryCode: {
            type: 'string'
          }, //客户分类
          trantypeId: {
            type: 'string',
            required: true
          }, //订单类型
          trantypeCode: {
            type: 'string',
            required: true
          }, //订单类型
          trantypeName: {
            type: 'string',
            required: true
          }, //订单类型
          saleModelId: {
            type: 'string',
            // required: true,
            // "refmodel": JSON.stringify(refinfo["systemDoc"]),
            // "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"业务模式\"}",
            // refparam: '{"IN_custDocCode":"QY132,PAY132"}'
          }, //销售模式
          saleModelCode: {
            type: 'string',
            required: true
          }, //销售模式
          saleModelName: {
            type: 'string'
          }, //销售模式
          isEnable: {
            type: 'integer',
            default: 1
          }, //是否启用
          billTypeId: {
            type: "string",
            required: true,
            "refmodel": JSON.stringify(refinfo["billtype"]),
            "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refName\":\"单据类型\"}"
          }, //来源单据类型id
          billTypeCode: {
            type: "string"
          }, //单据类型code
          billTypeName: {
            type: "string"
          }, //单据类型name
        },
        pageSize: 10,
      }
    },
    buttons: {
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
      }, {
        key: "enable",
        label: "启用",
        iconCls: "icon-qiyong",
        click: "enable"
      }, {
        key: "disable",
        label: "停用",
        iconCls: "icon-tingyong",
        click: "disable"
      }]
    },
    searchs: {
      search1: [{
          type: "refer",
          key: "organization",
          keyfordisplay: "organizationName",
          label: "销售组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel": "01",
            "AUTH_refdim":"organization"
          }
        }, {
          type: "refer",
          key: "customer",
          keyfordisplay: "customerName",
          label: "客户",
          refinfo: "customer",
          clientParam: {
            "EQ_isEnable": "1",
            "AUTH_refdim":"customer"
          }
        },
        /*{
            type: "refer",
            key: "poType--id",
            keyfordisplay: "poTypeName",
            label: "订单类型",
            refinfo: "potypoe",
            clientParam: {"EQ_isEnable":"1"}
        },*/
        {
          type: "refer",
          key: "trantype",
          keyfordisplay: "trantypeName",
          label: "订单类型",
          refinfo: "trantype",
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_billTypeId": "ReqOrder"
          }
        }, {
          type: "refer",
          key: "customerCategory",
          keyfordisplay: "customerCategoryName",
          label: "客户分类",
          refinfo: "customer_category",
          clientParam: {
            "EQ_isEnable": "1",
            "AUTH_refdim":"customerCategory"
          }
        }, {
          type: "combo",
          key: "saleModel",
          keyfordisplay: "saleModelCode",
          label: "销售模式",
          url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY132',
          namefield: "name",
          valuefield: "code",
          clientParam: {
            "EQ_isEnable": "1"
          }
        }, {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          dataSource: [{
            value: CONST.DEFAULTOPTION,
            name: '全部'
          }, {
            value: '1',
            name: '启用'
          }, {
            value: '0',
            name: '停用'
          }]
        }
      ]
    },
    dialogs: {
      dialog1: [{
        type: "refer",
        key: "organizationId",
        keyfordisplay: "organizationName",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "01"
        }
      }, {
        type: "refer",
        key: "customerId",
        keyfordisplay: "customerName",
        label: "客户",
        compid: "customerIdBase",
        enable: false,
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "combo",
        key: "saleModelCode",
        keyfordisplay: "saleModelCode",
        compid: "saleModelCode",
        referId: "saleModelCode",
        label: "业务模式",
        url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY136',
        namefield: "name",
        valuefield: "code",
        // clientParam: {
        //   "IN_code": "01"
        // }
      // }, {
      //   type: "refer",
      //   key: "saleModelId",
      //   keyfordisplay: "saleModelCode",
      //   compid: "saleModelId",
      //   referId: "saleModelId",
      //   label: "业务模式",
      //   // url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY132',
      //   refinfo: "systemDoc"
        // clientParam: {
        //   "IN_code": "01"
        // }
      }, {
        type: "refer",
        key: "billTypeId",
        compid: "billTypeId",
        referId: "billTypeId",
        label: "单据类型",
        enable: false
      }, {
        type: "refer",
        key: "trantypeId",
        referId: "trantypeId",
        compid: "trantypeId",
        keyfordisplay: "trantypeName",
        label: "订单类型",
        refinfo: "trantype",
        clientParam: {
          "EQ_isEnable": "1"
        },
        enable: false
      }, {
        type: "refer",
        key: "customerCategoryId",
        keyfordisplay: "customerCategoryName",
        label: "客户分类",
        compid: "customerCategoryIdBase",
        enable: false,
        refinfo: "customer_category",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "label",
        key: "isEnable",
        label: "启用状态",
      }]
    },
    grids: {
      grid1: {
        domid: "cust_ordertype",
        umeta: {
          id: "grid_cust_ordertype",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "organizationName",
          dataType: "String",
          title: "销售组织",
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户",
        }, {
          field: "customerCategoryName",
          dataType: "String",
          title: "客户分类",
          //renderType: "whetherRender"
        }, {
          field: "billTypeName",
          dataType: "String",
          title: "单据类型",
        }, {
          //field: "poTypeName",
          field: "trantypeName",
          dataType: "String",
          title: "订单类型",
          //renderType: "whetherRender"
        }, {
          field: "saleModelName",
          dataType: "String",
          title: "销售模式",
        }, {
          field: "creator",
          dataType: "String",
          title: "创建人",
          visible: false
        }, {
          field: "modifier",
          dataType: "String",
          title: "修改人",
          visible: false
        }, {
          field: "creationTime",
          dataType: "Date",
          title: "创建时间",
          visible: false
        }, {
          field: "modifiedTime",
          dataType: "Date",
          title: "修改时间",
          visible: false
        }, {
          field: "isEnable",
          dataType: "String",
          title: "启用状态",
          renderType: "enableRender"
        }, {
          field: "operation",
          dataType: "String",
          title: "操作",
          renderType: "operation4single",
          fixed: true,
          width: "110px"
        }, ]
      }
    }
  };
  return new basemodel(model);
});