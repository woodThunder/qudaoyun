define(["ocm_basemodel"], function (basemodel) {
  // 孙表
  var salesTargetDetail = {
    meta: {
      id: {
        type: 'string'
      },
      mainId: {
        type: 'string' // 表头主键
      },
      cycleType: { // 周期类型
        type: 'string'
      },
      year: {
        type: 'string' // 年
      },
      label: {
        type: 'string', // 合计label
      },
      colspan: {
        type: 'string' // 合并列数
      },
      rowspan: {
        type: 'string' // 合并行数
      },
      yearAccount: {
        type: 'number' // 年度合计
      },
      hyear: {
        type: 'string' // 半年
      },
      hyearAccount: {
        type: 'number' // 半年合计
      },
      season: {
        type: 'string' // 季
      },
      seasonAccount: {
        type: 'number' // 季度合计
      },
      month: {
        type: 'string' // 月
      },
      target: {
        type: 'number' // 指标
      }
    }
  }
  var model = {
    metas: {
      salesTarget: {
        params: {
          cls: "com.yonyou.occ.rebate.service.dto.SalesTargetDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          saleOrgId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            refparam: '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          code: {
            required: true,
            type: 'string'
          },
          name: {
            required: true,
            type: 'string'
          },
          cycleId: {
            required: true,
            refmodel: JSON.stringify(refinfo["salesCycle"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"返利周期" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          cycleCode: {
            type: 'string'
          },
          cycleName: {
            type: 'string'
          },
          cycleType: {
            type: 'string'
          },
          year: { // 年度
            required: true,
            type: 'integer'
          },
          startTime: {
            type: 'date'
          },
          endTime: {
            type: 'date'
          },
          goodsRangeId: {
            required: true,
            refmodel: JSON.stringify(refinfo["Combination"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"商品范围" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          goodsRangeCode: {
            type: 'string'
          },
          goodsRangeName: {
            type: 'string'
          },
          state: {
            required: true,
            type: 'integer'
          },
          remark: {
            type: 'string'
          },
          operation: { // 虚拟字段，仅供前端使用
            type: 'string'
          },
          creator: {
            type: 'string'
          }, // 创建人
          createTime: {
            type: 'date'
          }, // 创建时间
          modifier: {
            type: 'string'
          }, // 修改人
          modifiedTime: {
            type: 'date'
          }, // 修改时间
          approver: {
            type: 'string'
          },
          approveTime: {
            type: 'strig'
          }
        },
        pageSize: 10
      },
      targetCustomerItem: {
        params: {
          cls: "com.yonyou.occ.rebate.service.dto.TargetCustomerItemDto"
        },
        meta: {
          id: {
            type: 'string'
          },
          cycleType: { // 周期类型
            type: 'string'
          },
          year: {
            type: 'integer'
          },
          customerId: {
            required: true,
            type: "string"
          },
          customerCode: {
            type: 'string'
          },
          customerName: {
            type: 'string'
          },
          customDetail: {
            type: "child",
            meta: salesTargetDetail.meta
          },
          yearDetails: {
            type: "child",
            meta: salesTargetDetail.meta
          },
          hyearDetails: {
            type: "child",
            meta: salesTargetDetail.meta
          },
          seasonDetails: {
            type: "child",
            meta: salesTargetDetail.meta
          },
          monthDetails: {
            type: "child",
            meta: salesTargetDetail.meta
          },
          details: {
            type: "child",
            meta: salesTargetDetail.meta
          }
        },
        pageSize: 10
      },
      ItemRef: {
        meta: {
          customerref: {
            domid: "itemcustomerref",
            type: "string",
            // refmodel: JSON.stringify(refinfo["customer_sale_muliti"]),
            refmodel: JSON.stringify(refinfo["customer-muliti"]),
            isMultiSelectedEnabled: true,
            refcfg: '{"ctx":"/uitemplate_web"}',
            refparam: '{"EQ_isEnable":"1"}'
          }
        }
      }
    },
    searchs: {
      search1: [{
        type: "refer",
        key: "saleOrg",
        keyfordisplay: "saleOrgName",
        label: "销售组织",
        multi: true,
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "EQ_isEnable": "1",
          "AUTH_refdim": "saleOrg"
        }
      }, {
        type: "type",
        key: "code",
        label: "编码"
      }]
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
        click: "submit",
        auth: true
      }, {
        key: "unsubmit",
        label: "收回",
        iconCls: "icon-tubiao-quxiaoshenhe",
        click: "unsubmit",
        auth: true
      }, {
        key: "approve",
        label: "审批通过",
        iconCls: "icon-tubiao-duigou-xianxing",
        click: "approve",
        auth: true
      }, {
        key: "disapprove",
        label: "审批不通过",
        iconCls: "icon-tubiao-shibai",
        click: "disapprove",
        auth: true
      }, {
        key: "cancelapprove",
        label: "取消审批",
        iconCls: "icon-tubiao-quxiaoshenhe",
        click: "cancelApprove",
        auth: true
      }, ],
      button2: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "showAddItemsCommonRef"
      }/*, {
        key: "delrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delItems",
      }*/]
    },
    cards: {
      card1: [{
          type: "refer",
          key: "saleOrgId",
          label: "销售组织",
          refName: "销售组织",
          clientParam: {
            EQ_isEnable: "1",
            EQ_orgFuncRel: "01"
          }
        },
        {
          type: "text",
          key: "code",
          label: "编码"
        },
        {
          type: "text",
          key: "name",
          label: "名称"
        },
        {
          type: "refer",
          key: "cycleId",
          label: "周期",
          refName: "周期",
          referId: "cycleIdBase"
        },
        {
          type: "text",
          key: "year",
          label: "年度",
          enable: false
        },
        {
          type: "date",
          key: "startTime",
          label: "开始日期",
          enable: false
        },
        {
          type: "date",
          key: "endTime",
          label: "结束日期",
          enable: false
        },
        {
          type: "refer",
          key: "goodsRangeId",
          label: "商品范围",
          refName: "商品范围",
        },
        {
          type: "combo",
          key: "state",
          label: "状态",
          dataSource: "stateSrc",
				  enable: false
        }
      ]
    },
    details: {
      detail1: [{
          key: "code",
          label: "编码"
        },
        {
          key: "name",
          label: "名称"
        },
        {
          key: "saleOrgName",
          label: "销售组织"
        },
        {
          key: "cycleName",
          label: "周期"
        },
        {
          key: "year",
          label: "年度"
        },
        {
          key: "startTime",
          label: "开始日期"
        },
        {
          key: "endTime",
          label: "结束日期"
        },
        {
          key: "goodsRangeName",
          label: "商品范围"
        },
        {
          key: "state",
          label: "状态",
          computed: "stateComputed"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_complex_target_dom",
        umeta: {
          "id": "grid_complex_target",
          "data": "complexList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          field: "code",
          dataType: "String",
          title: "编码",
          renderType: "detailRender",
          width: "200px"
        }, {
          field: "name",
          dataType: "String",
          title: "名称",
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "cycleName",
          dataType: "String",
          title: "周期",
        }, {
          field: "year",
          dataType: "String",
          title: "年度"
        }, {
          field: "startTime",
          dataType: "Datetime",
          title: "起始时间",
        }, {
          field: "endTime",
          dataType: "Datetime",
          title: "截止时间",
        }, {
          field: "goodsRangeName",
          dataType: "String",
          title: "商品范围"
        }, {
          field: "state",
          dataType: "String",
          title: "单据状态",
          renderType: "stateRender"
        }, {
          field: "remark",
          dataType: "String",
          title: "备注",
          visible: false
        }, {
          title: "创建人",
          field: "creator",
          dataType: "String",
          visible: false
        }, {
          title: "创建时间",
          field: "createTime",
          dataType: "Datetime",
          visible: false
        }, {
          title: "修改人",
          field: "modifier",
          dataType: "String",
          visible: false
        }, {
          title: "修改时间",
          field: "modifiedTime",
          dataType: "Datetime",
          visible: false
        }, {
          field: "approver",
          dataType: "String",
          title: "审批人",
          visible: false
        }, {
          field: "approveTime",
          dataType: "Date",
          title: "审批时间",
          visible: false
        }, {
          field: "operation",
          dataType: "String",
          title: "操作",
          renderType: "operation",
          fixed: true,
          width: "100"
        }]
      },
      gridDetailItem: {
        domid: "gridDetailItem",
        umeta: {
          id: "grid_detail_item",
          data: "complexItems",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
          field: "customerName",
          dataType: "String",
          title: "客户",
          width: "100"
        }]
      },
      gridEditItem: {
        domid: "gridEditItem",
        umeta: {
          id: "grid_edit_edit",
          data: "complexItems",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
          field: "customerId",
          dataType: "String",
          title: "客户",
          renderType: "ncReferRender",
          editType: "ncReferEditType",
          showField: "customerName",
          width: "200",
          editOptions: {
            validType: "string",
            rel: {
              refpk: "customerId",
              refname: "customerName"
            }
          },
        }]
      }
    }
  }
  return new basemodel(model);
})