define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      complex: {
        meta: {
          id: {
            type: 'string'
          }, //id
          billCode: {
            type: 'string',
          }, //编码
          name: {
            type: 'string',
            required: true
          }, //名称
          creditCtrlStrategyId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['creditCtrlStrategy']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            required: true,
            // "refparam": '{"EQ_isAdministration": "1"}',
          }, //信用控制策略
          creditCtrlStrategyCode: {
            type: 'string'
          }, //信用控制策略
          creditCtrlStrategyName: {
            type: 'string'
          }, //信用控制策略
          billDate: {
            type: 'date',
            required: true,
          }, //单据日期
          applicantId: {
            type: 'string'
          }, //申请人
          applicantName: {
            type: 'string'
          },
          applicationSectorId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['department']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //申请部门
          applicationSectorName: {
            type: 'string'
          },
          // departmentId: {
          //   type: 'string'
          // },
          // departmentName: {
          //   type: 'string'
          // },
          remarks: {
            type: 'string'
          }, //备注
          state: {
            type: 'string',
          }, //单据状态
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
          ext01: {
            type: 'string'
          }
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
          customerId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['customer']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //客户
          customerCode: {
            type: 'string',
          }, //客户
          customerName: {
            type: 'string',
          }, //客户
          productLineId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['productLine']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //产品线
          productLineName: {
            type: 'string'
          },
          productidCode: {
            type: 'string'
          }, //产品线
          productidName: {
            type: 'string'
          }, //产品线
          currencyId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['currency']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
          }, //币种
          currencyCode: {
            type: 'string'
          }, //币种
          currencyName: {
            type: 'string'
          }, //币种
          adjustmentQuota: {
            type: 'priceFloat'
          }, //调整额度
          oldCreditLimit: {
            type: 'priceFloat',
          },
          creditLimit: {
            type: 'string',
          },
          creditLimitId: {
            type: 'string'
          },
          newCreditLimit: {
            type: 'priceFloat'
          }, //新信用额度
          validFrom: {
            type: 'date'
          }, //有效期从
          validUntil: {
            type: 'date'
          }, //有效期至
          remark: {
            type: 'string'
          }, //备注
          dr: {
            type: 'integer'
          },
        },
        pageSize: 10,
      },
      // ItemRef: {
      //   meta: {
      //     productref: {
      //       type: 'string',
      //       "refmodel": JSON.stringify(refinfo['productInfo']),
      //       "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
      //       'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
      //     }
      //   }
      // }
    },
    searchs: {
      search1: [{
        type: "refer",
        key: "creditCtrlStrategy--id",
        label: "控制策略",
        refinfo: "creditCtrlStrategy",
        required: true
      }, {
        type: "text",
        key: "billCode",
        label: "单据号",
      }, {
        type: "daterange",
        key: "billDate",
        label: "单据日期",
      }, {
        type: "refer",
        key: "applicationSector",
        label: "申请部门",
        refinfo: "department",
      }, {
        type: "refer",
        key: "applicant",
        label: "申请人",
        refinfo: "person",
        compid: "applicantsearch",
        domid: "applicantsearch",
        // enable: false,
        clientParam: {
          EQ_isEnable: "1"
        }
      }, {
        type: "refer",
        key: "customerName",
        label: "客户",
        refinfo: "customer"
      }, {
        type: "refer",
        key: "productidName",
        label: "产品线",
        refinfo: "productLine"
      }, {
        type: "refer",
        key: "currencyId",
        label: "币种",
        refinfo: "currency"
      }, {
        type: "date",
        key: "validFrom",
        label: "有效期从",
      }, {
        type: "date",
        key: "validUntil",
        label: "有效期至",
      }, {
        type: "checkboxlist",
        key: "state",
        label: "单据状态",
        dataSource: [{
          value: '1',
          name: '自由'
        }, {
          value: '2',
          name: '已提交'
        }, {
          value: '3',
          name: '审批通过'
        }, {
          value: '4',
          name: '审批中'
        }, {
          value: '6',
          name: '审批不通过'
        }],
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
      }],
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
        },
        // {
        //   key: "edit",
        //   label: "编辑",
        //   click: "showEditBillPanel",
        //   cls: "ui-btn-green"
        // }
      ],
      button6: [{
        key: "delAttach",
        label: "删除",
        click: "btnDelAttach",
        iconCls: "icon-shanchu1"
      }, {
        key: "uploadAttach",
        label: "上传",
        click: "btnUploadAttach",
        iconCls: "icon-tubiao-shangchuan"
      }, {
        key: "downLoadAttach",
        label: "下载",
        click: "downLoadAttachBatch",
        iconCls: "icon-tubiao-xiazai"
      }],
      button7: [{
        key: "viewLoadAttach-",
        label: "查看",
        click: "fileViewCustomercast",
        iconCls: "icon-tubiao-chakan",
      }, {
        key: "downLoadAttach",
        label: "下载",
        click: "downLoadAttachBatch",
        iconCls: "icon-tubiao-xiazai"
      }],
    },
    cards: {
      card1: [{
        type: "refer",
        key: "creditCtrlStrategyId",
        label: "信用控制策略",
        refinfo: "creditCtrlStrategy",
      }, {
        type: "date",
        key: "billDate",
        label: "单据日期",
      }, {
        type: "refer",
        key: "applicationSectorId",
        label: "申请部门",
        refinfo: "department",
        compid: "saleDept",
        domid: "saleDept",
      }, {
        type: "refer",
        key: "applicantId",
        label: "申请人",
        refinfo: "person",
        compid: "person",
        domid: "person",
      }, {
        type: "combo",
        key: "state",
        label: "单据状态",
        enable: false,
        dataSource: [{
          value: '0',
          name: '自由'
        }, {
          value: '1',
          name: '已提交'
        }, {
          value: '2',
          name: '审批中'
        }, {
          value: '3',
          name: '审批通过'
        }, {
          value: '4',
          name: '审批不通过'
        }]
      }, {
        type: "textarea",
        key: "remarks",
        label: "备注",
        cls: "ui-textarea-item"
      }]
    },
    details: {
      detail1: [{
        key: "billCode",
        label: "单据号",
      }, {
        key: "creditCtrlStrategyName",
        label: "信用控制策略",
      }, {
        key: "billDate",
        label: "单据日期",
      }, {
        key: "applicantName",
        label: "申请人",
      }, {
        key: "applicationSectorName",
        label: "申请部门",
      }, {
        key: "state",
        label: "单据状态",
        computed: "stateFmt"
      }, {
        key: "remarks",
        label: "备注"
      }]
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
          "field": "creditCtrlStrategyName",
          "dataType": "String",
          "title": "信用控制策略"
        }, {
          "field": "billDate",
          "dataType": "Date",
          "title": "单据日期",
          // "renderType": "enableStatusRender"
        }, {
          "field": "applicantName",
          "dataType": "String",
          "title": "申请人"
        }, {
          "field": "applicationSectorName",
          "dataType": "String",
          "title": "申请部门"
        }, {
          "field": "remarks",
          "dataType": "String",
          "title": "备注"
        }, {
          "field": "modifiedTime",
          "dataType": "Datetime",
          "title": "修改时间"
        }, {
          "field": "state",
          "dataType": "String",
          "title": "单据状态",
          "editOptions": {
            "type": "combo",
            "datasource": "billStateSrc"
          },
          "renderType": "comboRender",
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
          "showNumCol": true,
          // "onBeforeEditFun": "selectHandle",
        },
        columns: [{
          "field": "customerId",
          "dataType": "String",
          "title": "客户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "customerName",
          "multi": true,
          "required": true,
          "editOptions": {
            "validType": "string",
            "required": true,
            "rel": {
              "multi": true,
            }
          }
        }, {
          "field": "currencyId",
          "dataType": "String",
          "title": "币种",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "currencyName",
          "required": true,
          "editOptions": {
            "validType": "string",
            "required": true,
          }
        }, {
          "field": "productLineId",
          "dataType": "String",
          "title": "产品线",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "productLineName",
          "editOptions": {
            "validType": "string",
          }
        }, {
          "field": "oldCreditLimit",
          "dataType": "String",
          "title": "原信用额度",
          "editable": false,
        }, {
          "field": "adjustmentQuota",
          "dataType": "String",
          "title": "调整额度",
          // "editType": "float",
          // "renderType": "floatRender",
        }, {
          "field": "newCreditLimit",
          "dataType": "String",
          "title": "新信用额度",
          // "editType": "float",
          // "renderType": "floatRender",
          "required": true,
        }, {
          "field": "validFrom",
          "dataType": "Date",
          "editType": "date",
          "title": "有效期从",
        }, {
          "field": "validUntil",
          "dataType": "Date",
          "editType": "date",
          "title": "有效期至",
        }, {
          "dataType": "string",
          "field": "remark",
          "title": "备注"
        }]
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
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
        }, {
          "field": "currencyName",
          "dataType": "String",
          "title": "币种",
        }, {
          "field": "oldCreditLimit",
          "dataType": "Float",
          "title": "原信用额度",
        }, {
          "field": "adjustmentQuota",
          "dataType": "String",
          "title": "调整额度",
        }, {
          "field": "newCreditLimit",
          "dataType": "Float",
          "title": "新信用额度",
        }, {
          "field": "validFrom",
          "dataType": "datetime",
          "title": "有效期从",
        }, {
          "field": "validUntil",
          "dataType": "datetime",
          "title": "有效期至",
        }, {
          "dataType": "string",
          "field": "remark",
          "title": "备注"
        }]
      },
    }
  }
  return new basemodel(model);
})