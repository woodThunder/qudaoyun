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
            required: true
          }, //财务组织
          financeOrgName: {
            type: 'string',
          },
          saleOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            refparam: '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}',
            required: true
          }, //销售组织
          saleOrgName: {
            type: 'string'
          },
          billCode: {
            type: 'string'
          }, //单据号
          transTypeId: {
            type: 'string',
            required: true
          }, //申请类型
          transTypeName: {
            type: 'string'
          },
          customerId: {
            type: 'string',
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            clientParam: {
              EQ_isChannelCustomer: "1"
            },
            required: true
          }, //客户
          ext01: {
            type: 'string'
          }, //上传附件用
          customerName: {
            type: 'string'
          }, //客户
          billDate: {
            type: 'date',
            required: true
          }, //单据日期
          deptId: {
            type: 'string'
          }, //销售部门
          deptName: {
            type: 'string'
          }, //销售部门
          // currencyId: {
          //   type: "string",
          //   refmodel: JSON.stringify(refinfo["currency"]),
          //   refcfg: '{"ctx":"/uitemplate_web","refName":"币种" }',
          // }, // 币种
          // currencyName: {
          //   type: "string"
          // }, // 币种名称
          salePersonId: {
            type: 'string'
          }, //客户经理
          salePersonName: {
            type: 'string'
          }, //客户经理
          totalMny: {
            type: 'amountFloat'
          }, //费用支持金额
          remark: {
            type: 'string'
          },
          expireDate: {
            type: 'date'
          }, //失效日期
          // recAddr: {
          //   type: 'string'
          // }, //收货地址
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
          applyId: {
            type: 'string'
          }, //申请单Id
          serialNum: {
            type: 'string'
          }, //行号
          deptId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["department"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"费用承担部门" }',
            refparam: '{"EQ_isEnable":"1"}'
          }, //费用承担部门
          deptName: {
            type: 'string'
          }, //费用承担部门
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
          applyMny: {
            type: "amountFloat"
          }, //费用申报金额
          actuallyMny: {
            type: "amountFloat"
          }, //费用支持金额
          totalBillMny: {
            type: 'amountFloat',
          }, //累计核报金额
          balanceMny: {
            type: 'amountFloat'
          }, //余额
          closeUser: {
            type: 'string'
          }, //关闭人
          applyNum: {
            type: 'numberFloat'
          }, //关闭日期
          remark: {
            type: 'string'
          }, //备注
          closeTime: {
            type: 'date'
          }, //关闭日期
        },
        pageSize: 10,
      },
      // ItemRef: {
      //   meta: {
      //     productref: {
      //       type: 'string',
      //       refmodel: JSON.stringify(refinfo["goods"]),
      //       refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}',
      //       refcfg: '{"ctx":"/uitemplate_web", "isMultiSelectedEnabled":true}'
      //     }
      //   }
      // }
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
        cls: "ui-btn-green"
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
          enable: false,
          // disableInEdit: true
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
          },
         required: true
        }, {
          type: "refer",
          key: "financeOrgId",
          keyfordisplay: "financeOrgName",
          label: "财务组织",
          refinfo: "organization_ocm",
          // required: true,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07"
          },
         required: true
        }, {
          type: "refer",
          key: "deptId",
          referId: "deptId",
          label: "销售部门",
          domid: "salesDeptId",
          compid: "salesDeptBase",
          refinfo: "department"
        }, {
          referId: "personId",
          type: "refer",
          domid: "salesManagerId",
          compid: "salesManagerBase",
          key: "salePersonId",
          label: "客户经理",
          refinfo: "person",
        }, {
          referId: "refer",
          type: "refer",
          key: "customerId",
          label: "客户",
          required: true
        }, {
          type: "refer",
          key: "transTypeId",
          label: "申请类型",
          refinfo: "trantype",
          referId: "tranTypeCls",
          clientParam: {
            EQ_billTypeId: "CustomerApply",
          },
          // required: true,
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
          key: "financeOrgName",
          label: "财务组织",
        }, {
          key: "saleOrgName",
          label: "销售组织",
        }, {
          key: "deptName",
          label: "销售部门",
        }, {
          key: "salePersonName",
          label: "客户经理",
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
        },
        //  {
        //   key: "recAddr",
        //   label: "收货地址",
        // },
        {
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
            "title": "申请类型",
          }, {
            "dataType": "String",
            "field": "deptName",
            "title": "销售部门",
          }, {
            "dataType": "String",
            "field": "customerName",
            "title": "客户",
          },{
            "dataType": "String",
            "field": "salePersonName",
            "title": "客户经理",
          }, {
            "dataType": "String",
            "field": "totalMny",
            "title": "费用支持金额",
          },
          //  {
          //   "dataType": "String",
          //   "field": "transTypeName",
          //   "title": "币种",
          // },
          //  {
          //   "dataType": "String",
          //   "field": "recAddr",
          //   "title": "收货地址",
          // },
          {
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
          },
        ]
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
            "field": "serialNum",
            "dataType": "String",
            "title": "行号",
            "editable": false
          },
          /*收支项目，目前还没有这个档案，与NC或者友赢销融合后，就有这个档案*/
          // {
          //   "field": "projectId",
          //   "dataType": "String",
          //   "title": "收支项目",
          //   "renderType": "ncReferRender",
          //   "editType": "ncReferEditType",
          //   "showField": "projectName",
          //   "editOptions": {
          //     "validType": "string",
          //     "rel": {
          //       "refpk": "projectId",
          //       "refname": "projectName"
          //     }
          //   }
          // },
          {
            "field": "deptId",
            "dataType": "String",
            "title": "费用承担部门",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "deptName",
            "editOptions": {
              "validType": "string",
              "rel": {
                "refpk": "deptId",
                "refname": "deptName"
              }
            },
          }, {
            "field": "applyMny",
            "dataType": "String",
            "title": "费用申报金额",
            "editType": "float",
            "renderType": "floatRender"
          }, {
            "field": "actuallyMny",
            "dataType": "String",
            "title": "费用支持金额",
            "editType": "float",
            "renderType": "floatRender",
            "required": true
          }, {
            "field": "totalBillMny",
            "dataType": "String",
            "title": "累计核报金额",
            "editType": "float",
            "renderType": "floatRender",
            "editable": false
          }, {
            "field": "balanceMny",
            "dataType": "String",
            "title": "余额",
            "editType": "float",
            "renderType": "floatRender",
            "editable": false
          }, {
            "field": "closeUser",
            "dataType": "String",
            "title": "关闭人",
            "editable": false
          }, {
            "field": "closeTime",
            "dataType": "Date",
            "editType": "date",
            "title": "关闭日期",
            "editable": false
          }, {
            "field": "remark",
            "dataType": "String",
            "title": "备注",
          },
        ]
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
          "field": "serialNum",
          "dataType": "String",
          "title": "行号",
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "收支项目",
        }, {
          "field": "deptName",
          "dataType": "String",
          "title": "费用承担部门",
        }, {
          "field": "applyMny",
          "dataType": "String",
          "title": "费用申报金额",
          "editType": "float",
          "renderType": "floatRender"
        }, {
          "field": "actuallyMny",
          "dataType": "String",
          "title": "费用支持金额",
          "editType": "float",
          "renderType": "floatRender",
        }, {
          "field": "totalBillMny",
          "dataType": "String",
          "title": "累计核报金额",
          "editType": "float",
          "renderType": "floatRender",
        }, {
          "field": "balanceMny",
          "dataType": "String",
          "title": "余额",
          "editType": "float",
          "renderType": "floatRender",
        }, {
          "field": "closeUser",
          "dataType": "String",
          "title": "关闭人",
        }, {
          "field": "closeTime",
          "dataType": "Date",
          "editType": "date",
          "title": "关闭日期",
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, ]
      },
    }
  }
  return new basemodel(model);
})