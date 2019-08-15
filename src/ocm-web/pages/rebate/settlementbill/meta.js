define(["ocm_basemodel"], function (basemodel) {
  var model = {
    metas: {
      RebateSettlementMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.RebateSettlementDto"
        },
        meta: {
          id: {
            type: "string"
          },
          code: {
            type: "string"
          },
          fileId: { // 附件管理用
            type: "string"
          },
          saleOrgId: { // 销售组织
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
          financeOrgId: { // 财务组织
            type: "string",
            refmodel: JSON.stringify(refinfo['organization_ocm']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
          },
          financeOrgCode: {
            type: 'string'
          },
          financeOrgName: {
            type: 'string'
          },
          rebatePolicyId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["rebatePolicy"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"返利政策" }',
            refparam: '{"EQ_state":"3"}'
          },
          rebatePolicyCode: {
            type: "string"
          },
          rebatePolicyName: {
            type: "string"
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
          year: {
            type: 'string'
          },
          startTime: {
            type: 'date',
          },
          endTime: {
            type: 'date',
          },
          state: {
            required: true,
            type: 'integer'
          },
          rebateAccountMoney: { // 返利总额
            type: 'amountFloat'
          },
          isMadeOneself: { // 是否自制，1是 0 不是
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
      RebateSettlemenDetailMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.RebateSettlemenDetailDto"
        },
        meta: {
          id: {
            type: "string"
          },
          rebateSettlementId: { // 返利结算单主表主键
            type: "string"
          },
          financeOrgId: { // 财务组织
            type: "string",
            refmodel: JSON.stringify(refinfo['organization_ocm']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}',
            required: true
          },
          financeOrgCode: {
            type: 'string'
          },
          financeOrgName: {
            type: 'string'
          },
          customerId: { // 返利客户
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["customer_sale"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
            refparam: '{"EQ_isChannelCustomer": "1"}',
            required: true
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          rebateMoney: { // 返利金额
            type: "amountFloat",
            required: true
          },
          accountFeeMoney: { // 累计生成费用金额
            type: "amountFloat"
          },
          remark: {
            type: "string"
          },
          operation: { // 操作列，仅供前端交互
            type: "string"
          }
        },
        pageSize: 10
      },
      FileMeta: {
        meta: {
          id: {
            type: "string"
          }, //主键
          filepath: {
            type: "string"
          }, //文件名称
          filesize: {
            type: "string"
          }, //文件大小
          filename: {
            type: "string"
          }, //文件名称
          uploadtime: {
            type: "datetime"
          }, //上传时间
          groupname: {
            type: "string"
          }, //
          url: {
            type: "string"
          } //URL
        }
      }
    },
    searchs: {
      search1: [{
          type: "text",
          key: "code",
          label: "结算单号",
        }, {
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
        },
        /*{
          type: "refer",
          key: "financeOrg",
          label: "财务组织",
          required: true,
          refinfo: "organization_ocm",
          multi: true,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07",
            "AUTH_refdim": "financeOrg"
          }
        },
        {
          type: "refer",
          key: "rebateSettlemenDetails--customer",
          label: "客户",
          refinfo: "customer",
          refName: "客户",
          clientParam: {
            EQ_isEnable: "1",
            EQ_isChannelCustomer: "1"
          }
        },*/
        {
          type: "refer",
          key: "rebatePolicy--id",
          label: "返利政策",
          refinfo: "rebatePolicy",
          refName: "返利政策",
          clientParam: {
            "EQ_state": "3"
          }
        },
        {
          type: "refer",
          key: "cycle--id",
          label: "返利周期",
          refinfo: "salesCycle",
          refName: "返利周期",
          clientParam: {
            "EQ_isEnable": "1"
          }
        }
      ]
    },
    buttons: {
      button1: [{
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddBillPanel",
        },
        {
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
        }
      ],
      button2: [{
        key: "save",
        label: "保存",
        click: "saveHandle",
        iconCls: "icon-tubiao-baocun"
      }, {
        key: "cancel",
        label: "取消",
        click: "cancelHandle",
        iconCls: "icon-tubiao-guanbi-anxing"
      }],
      button3: [{
          key: "addrow",
          label: "增行",
          click: "addRow",
          cls: "ui-btn-orange",
          clickArg: "RebateSettlemenDetailList",
          iconCls: "icon-plus"
        },
        {
          key: "delrow",
          label: "删行",
          click: "delChild",
          clickArg: "RebateSettlemenDetailList",
          iconCls: "icon-shanchu1"
        }
      ],
      button4: [{
        key: "cancel",
        label: "返回",
        click: "cancelHandle",
        cls: "ui-btn-primary"
      }],
      button5: [{
          key: "onupload",
          label: "上传",
          iconCls: "icon-tubiao-shangchuan",
          click: "onOpenUploadBtn"
        },
        {
          key: "filedel",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "fileDelete"
        },
        {
          key: "fileview",
          label: "查看",
          iconCls: "icon-tubiao-chakan",
          click: "fileView"
        },
        {
          key: "fileDownload",
          label: "下载",
          iconCls: "icon-tubiao-xiazai",
          click: "fileDownload"
        }
      ],
      button6: [{
          key: "fileview",
          label: "查看",
          iconCls: "icon-tubiao-chakan",
          click: "fileView"
        },
        {
          key: "fileDownload",
          label: "下载",
          iconCls: "icon-tubiao-xiazai",
          click: "fileDownload"
        }
      ]
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
        // {
        //   type: "refer",
        //   key: "financeOrgId",
        //   keyfordisplay: "financeOrgName",
        //   label: "财务组织",
        //   refinfo: "organization_ocm",
        //   clientParam: {
        //     "EQ_isEnable": "1",
        //     "EQ_orgFuncRel": "07"
        //   }
        // },
        {
          type: "refer",
          key: "rebatePolicyId",
          label: "返利政策",
          refName: "返利政策",
          referId: "salePolicyReferId",
          domid: "salePolicyDomId",
          disableFilter: true
        },
        {
          type: "refer",
          key: "cycleId",
          label: "返利周期",
          refName: "返利周期",
          referId: "cycleIdBase",
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
          type: "text",
          key: "rebateAccountMoney",
          label: "返利总额",
          enable: false
        },
      ]
    },
    details: {
      detail1: [{
          key: "saleOrgName",
          label: "销售组织"
        },
        // {
        //   key: "financeOrgName",
        //   label: "财务组织"
        // },
        {
          key: "rebatePolicyName",
          label: "返利政策"
        },
        {
          key: "cycleName",
          label: "返利周期"
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
          key: "rebateAccountMoney",
          label: "返利金额"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_RebateSettlementList_dom",
        umeta: {
          id: "grid_RebateSettlementList",
          data: "RebateSettlementList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "code",
            dataType: "String",
            title: "结算单号",
            renderType: "detailRender"
          },
          {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织",
          }
          /*, {
                    field: "financeOrgName",
                    dataType: "String",
                    title: "财务组织",
                  }*/
          , {
            field: "rebatePolicyName",
            dataType: "String",
            title: "返利政策",
          }, {
            field: "cycleName",
            dataType: "String",
            title: "返利周期",
          }, {
            field: "startTime",
            dataType: "Datetime",
            title: "起始时间",
          }, {
            field: "endTime",
            dataType: "Datetime",
            title: "截止时间",
          }, {
            field: "rebateAccountMoney",
            dataType: "String",
            title: "返利总额",
          }, {
            field: "state",
            dataType: "String",
            title: "单据状态",
            renderType: "isStateGrid"
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
          }
        ]
      },
      grid2: {
        domid: "grid_RebateSettlemenDetailList_dom",
        umeta: {
          id: "grid_RebateSettlemenDetailList",
          data: "RebateSettlemenDetailList",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "financeOrgId",
            dataType: "String",
            title: "财务组织",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "financeOrgName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "financeOrgId",
                refname: "financeOrgName"
              }
            }
          }, {
            field: "customerId",
            dataType: "String",
            title: "返利客户",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "customerName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "customerId",
                refname: "customerName"
              }
            }
          },
          {
            field: "rebateMoney",
            dataType: "String",
            title: "返利金额"
          },
          {
            field: "accountFeeMoney",
            dataType: "String",
            title: "累计生成费用单金额",
            editable: false
          }
        ]
      },
      grid3: {
        domid: "grid_RebateSettlemenDetailList_detail_dom",
        umeta: {
          id: "grid_RebateSettlemenDetailList_detail",
          data: "RebateSettlemenDetailList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "financeOrgName",
            dataType: "String",
            title: "财务组织"
          },
          {
            field: "customerName",
            dataType: "String",
            title: "返利客户"
          },
          {
            field: "rebateMoney",
            dataType: "String",
            title: "返利金额"
          },
          {
            field: "accountFeeMoney",
            dataType: "String",
            title: "累计生成费用单金额"
          }
        ]
      },
      grid4: {
        domid: "grid_FileList_dom",
        umeta: {
          id: "grid_FileList",
          data: "FileList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "filename",
            dataType: "String",
            title: "名称"
          },
          {
            field: "filesize",
            dataType: "String",
            title: "大小",
            editable: false
          },
          {
            field: "uploadtime",
            dataType: "String",
            title: "上传时间",
            editable: false
          }
        ]
      },
      grid5: {
        domid: "grid_FileList_detail_dom",
        umeta: {
          id: "grid_FileList_detail",
          data: "FileList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "filename",
            dataType: "String",
            title: "名称"
          },
          {
            field: "filesize",
            dataType: "String",
            title: "大小"
          },
          {
            field: "uploadtime",
            dataType: "String",
            title: "上传时间"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});