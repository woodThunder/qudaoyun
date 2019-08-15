define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      complex: {
        meta: {
          id: {
            type: 'string'
          }, //id
          financeOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"财务组织" }',
            refparam: '{"EQ_orgFuncRel": "05","EQ_isEnable":"1"}',
            required: true,
          }, //财务组织
          financeOrgName: {
            type: 'string',
          },
          saleOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            refparam: '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}',
            required: true,
          }, //销售组织
          saleOrgName: {
            type: 'string'
          },
          billCode: {
            type: 'string',
            required: true,
          }, //单据号
          transTypeId: {
            type: 'string',
            required: true,
          }, //促销品申请类型
          transTypeName: {
            type: 'string',
            required: true,
          },
          customerId: {
            type: 'string',
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            clientParam: {
              EQ_isChannelCustomer: "1"
            }
          }, //客户
          customerName: {
            type: 'string'
          }, //客户
          billDate: {
            type: 'date',
            required: true,
          }, //费用单日期
          ext01: {
            type: 'string'
          }, //上传附件用
          deptId: {
            type: 'string',
            required: true,
          }, //承担费用销售部门
          deptName: {
            type: 'string',
          }, //承担费用销售部门

          currencyId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["currency"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"币种" }',
          }, // 币种
          currencyName: {
            type: "string"
          }, // 币种名称
          salePersonId: {
            type: 'string',
            required: true,
          }, //销售业务员
          salePersonName: {
            type: 'string'
          }, //销售业务员
          totalMny: {
            type: 'amountFloat'
          }, //费用支持金额
          remark: {
            type: 'string'
          },
          expireDate: {
            type: 'date'
          }, //失效日期
          recAddr: {
            type: 'string'
          }, //收货地址
          state: {
            type: 'string'
          }, //单据状态
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        meta: {
          id: {
            type: 'string'
          }, //idp
          projectId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["project"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"项目" }',
            refparam: '{"EQ_isEnable":"1"}'
          }, //收支项目
          projectName: {
            type: 'string',
            required: true
          }, //收支项目
          skuCode: {
            type: 'string',
          }, //商品编码
          skuName: {
            type: 'string',
            required: true,
          }, //商品名称
          unitId: {
            type: 'string',
            refmodel: JSON.stringify(refinfo['utils']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":"","refName":""}'
          }, //商品单位
          unitName: {
            type: 'string'
          }, //商品单位
          applyNum: {
            type: 'numberFloat'
          }, //商品数量
          specification: {
            type: 'string',
            required: true,
          }, //规格
          auditNum: {
            type: 'numberFloat',
            required: true,
          }, //批复数量
          num: {
            type: 'numberFloat',
          }, //数量
          price: {
            type: 'priceFloat',
            required: true,
          }, //商品单价
          mny: {
            type: 'amountFloat',
            required: true,
          }, //金额
          stockOrgId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //发货库存组织
          stockOrgName: {
            type: 'string'
          }, //发货库存组织
          totalSendNum: {
            type: 'amountFloat'
          }, //累计出库数量
          totalSendMny: {
            type: 'amountFloat'
          }, //累计出库执行金额
          planSendDate: {
            type: 'date'
          }, //计划发货日期
        },
        pageSize: 10,
      },
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            refmodel: JSON.stringify(refinfo["goods"]),
            refparam: '{"EQ_isEnable":"1","EQ_isPromotion":"1"}',
            refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
          }
        }
      }
    },
    searchs: {
      search1: [{
        type: "refer",
        key: "financeOrg",
        label: "财务组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "07",
          "AUTH_refdim": "financeOrg"
        }
      }, {
        type: "refer",
        key: "saleOrg",
        keyfordisplay: "saleOrgName",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "AUTH_refdim": "saleOrg"
        }
      }, {
        type: "refer",
        key: "customer",
        keyfordisplay: "customerName",
        label: "客户",
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1",
          "AUTH_refdim": "customer"
        }
      }, {
        type: "refer",
        key: "billDetails--goodsId",
        label: "商品",
        refinfo: "goods",
        clientParam: {
            "EQ_isEnable":"1","EQ_isPromotion":"1"
        },
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
        label: "驳回客户",
        iconCls: "icon-tubiao-shibai",
        click: "disapproveCusReqForm",
        auth: true
      }, {
        key: "cancelapprove",
        label: "取消审批",
        iconCls: "icon-tubiao-quxiaoshenhe",
        click: "cancelApproveCusReqForm",
        auth: true
      }, {
        key: "allbillclose",
        label: "整单关闭",
        iconCls: "icon-export",
        click: "allbillclose"
      }, {
        key: "allbillopen",
        label: "整单打开",
        iconCls: "icon-export",
        click: "allbillopen"
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
        click: "showAddItemsRef"
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
      }],
      button5: [{
        key: "lineopen",
        label: "行打开",
        click: "lineopen"
      }, {
        key: "lineclose",
        label: "行关闭",
        click: "lineclose",
        // cls: "ui-btn-green"
      }],
      button6: [{
        key: "delAttach",
        label: "删除",
        click: "btnDelAttach",
        iconCls: "icon-tubiao-shanchu1"
      }, {
        key: "uploadAttach",
        label: "上传",
        click: "btnUploadAttach",
        iconCls: "icon-tubiao-baocun"
      }, {
        key: "downLoadAttach",
        label: "下载",
        click: "downLoadAttachBatch",
        iconCls: "icon-tubiao-guanbi-anxing"
      }],
    },
    cards: {
      card1: [{
          type: "text",
          key: "billCode",
          label: "单据号",
          disableInEdit: true
        }, {
          type: "refer",
          key: "customerId",
          label: "客户",
          refinfo: "customer",
          clientParam: {
            "EQ_isEnable": "1",
            "AUTH_refdim": "customer"
          }
        }, {
          type: "refer",
          key: "financeOrgId",
          keyfordisplay: "financeOrgName",
          label: "财务组织",
          refinfo: "organization_ocm",
          required: true,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07"
          }
        }, {
          type: "refer",
          key: "saleOrgId",
          keyfordisplay: "saleOrgName",
          label: "销售组织",
          required: true,
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "01"
          }
        }, {
          type: "refer",
          key: "deptId",
          referId: "deptId",
          label: "承担费用销售部门",
          domid: "salesDeptId",
          compid: "salesDeptBase",
          required: true,
          refinfo: "department"
        }, {
          referId: "personId",
          type: "refer",
          domid: "salesManagerId",
          compid: "salesManagerBase",
          key: "salePersonId",
          label: "销售业务员",
          refinfo: "person",
          required: true,
        }, {
          type: "refer",
          key: "transTypeId",
          label: "助促销申请类型",
          required: true,
          refinfo: "trantype",
          referId: "tranTypeCls",
          clientParam: {
            EQ_billTypeId: "GiftApply",
            // search_AUTH_APPCODE: 'trantype'
          },

        },
        //  {
        //   type: "refer",
        //   key: "currencyId",
        //   label: "币种",
        //   refinfo: "currency",
        // },
        {
          type: "text",
          key: "totalMny",
          label: "费用支持金额",
          enable: false
        }, {
          type: "date",
          key: "billDate",
          label: "单据日期",
          required: true,
        }, {
          type: "date",
          key: "expireDate",
          label: "失效日期"
        },
        // {
        //   type: "combo",
        //   key: "state",
        //   label: "单据状态",
        //   // enable: false,
        //   dataSource: [{
        //     value: '0',
        //     name: '保存'
        //   }, {
        //     value: '1',
        //     name: '已提交'
        //   }, {
        //     value: '2',
        //     name: '审批中'
        //   }, {
        //     value: '3',
        //     name: '审批通过'
        //   }, {
        //     value: '4',
        //     name: '审批不通过'
        //   }]
        // },
        {
          type: "textarea",
          key: "recAddr",
          label: "收货地址",
          cls: "ui-textarea-item"
        }, {
          type: "textarea",
          key: "remark",
          label: "备注",
          cls: "ui-textarea-item"
        }
      ]
    },
    details: {
      detail1: [{
          key: "billCode",
          label: "单据号",
        }, {
          key: "customerName",
          label: "客户",
        }, {
          key: "financeOrgName",
          label: "财务组织",
        }, {
          key: "saleOrgName",
          label: "销售组织",
        }, {
          key: "deptName",
          label: "承担费用销售部门",
        }, {
          key: "salePersonName",
          label: "销售业务员",
        }, {
          key: "transTypeName",
          label: "助促销品申请类型",
        },
        // {
        //   key: "currencyName",
        //   label: "币种"
        // },
        {
          key: "totalMny",
          label: "费用支持金额"
        }, {
          key: "billDate",
          label: "单据日期",
        }, {
          key: "expireDate",
          label: "失效日期"
        }, {
          key: "state",
          label: "单据状态",
          computed: "stateFmt"
        }, {
          key: "recAddr",
          label: "收货地址",
        }, {
          key: "remark",
          label: "备注",
        }
      ]
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
          "field": "billCode",
          "dataType": "String",
          "title": "单据号",
          "renderType": "detailRender"
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户"
        }, {
          "field": "financeOrgName",
          "dataType": "String",
          "title": "财务组织",
        }, {
          "field": "saleOrgName",
          "dataType": "String",
          "title": "销售组织",
        }, {
          "dataType": "String",
          "field": "transTypeName",
          "title": "助促销品申请类型",
        }, {
          "dataType": "String",
          "field": "deptName",
          "title": "承担费用销售部门",
        }, {
          "dataType": "String",
          "field": "salePersonName",
          "title": "销售业务员",
        }, {
          "dataType": "String",
          "field": "totalMny",
          "title": "费用支持金额",
        }, {
          "dataType": "String",
          "field": "transTypeName",
          "title": "币种",
        }, {
          "dataType": "String",
          "field": "recAddr",
          "title": "收货地址",
        }, {
          "dataType": "Date",
          "field": "expireDate",
          "title": "失效日期",
        }, {
          "field": "state",
          "dataType": "String",
          "title": "单据状态",
          "renderType": "billStatusRender",
        }, {
          "field": "billDate",
          "dataType": "Date",
          "title": "单据日期"
        }, {
          "dataType": "String",
          "field": "remark",
          "title": "备注",
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
          "field": "projectId",
          "dataType": "String",
          "title": "收支项目",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "projectName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "projectId",
              "refname": "projectName"
            }
          }
        }, {
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "商品单位",
          "editable": false
        }, {
          "field": "applyNum",
          "dataType": "String",
          "title": "商品数量",
          "required": true,
          "editType": "float",
          "renderType": "floatRender",
        }, {
          "field": "specification",
          "dataType": "String",
          "title": "规格",
          "editable": false
        }, {
          "field": "auditNum",
          "dataType": "String",
          "title": "批复数量",
          "editType": "float",
          "renderType": "floatRender",
          "required": true,
        }, {
          "field": "price",
          "dataType": "String",
          "title": "商品单价",
          "editable": false
        }, {
          "field": "mny",
          "dataType": "String",
          "title": "金额",
          "editType": "float",
          "renderType": "floatRender",
          "required": true,
        }, {
          "field": "stockOrgId",
          "dataType": "String",
          "title": "发货库存组织",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "stockOrgName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "stockOrgId",
              "refname": "stockOrgName"
            }
          },
          "required": true
        }, {
          "field": "totalSendNum",
          "dataType": "String",
          "title": "累计出库数量",
          "editType": "float",
          "editable": false,
          "renderType": "floatRender",
        }, {
          "field": "totalSendMny",
          "dataType": "String",
          "title": "累计出库执行金额",
          "editType": "float",
          "editable": false,
          "renderType": "floatRender",
          "width": '150'
        }, {
          "field": "planSendDate",
          "dataType": "Date",
          "editType": "date",
          "title": "计划发货日期",
          "width": '150'
        }]
      },
      grid3: {
        domid: "grid_democomplexItem2_dom",
        umeta: {
          "id": "grid_democomplexItem2",
          "data": "complexItems",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "projectId",
          "dataType": "String",
          "title": "收支项目",
        }, {
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false
        }, {
          "field": "unitId",
          "dataType": "String",
          "title": "商品单位",
        }, {
          "field": "applyNum",
          "dataType": "String",
          "title": "商品数量",
          "editType": "float",
        }, {
          "field": "specification",
          "dataType": "String",
          "title": "规格",
          "editable": false
        }, {
          "field": "auditNum",
          "dataType": "String",
          "title": "批复数量",
        }, {
          "field": "price",
          "dataType": "String",
          "title": "商品单价",
          "editable": false
        }, {
          "field": "mny",
          "dataType": "String",
          "title": "金额",
        }, {
          "field": "stockOrgName",
          "dataType": "String",
          "title": "发货库存组织",
          "required": true
        }, {
          "field": "totalSendNum",
          "dataType": "String",
          "title": "累计出库数量",
          "editType": "float",
          "editable": false
        }, {
          "field": "totalSendMny",
          "dataType": "String",
          "title": "累计出库执行金额",
          "editable": false
        }, {
          "field": "planSendDate",
          "dataType": "Date",
          "title": "计划发货日期",
        }]
      },
    }
  }
  return new basemodel(model);
})