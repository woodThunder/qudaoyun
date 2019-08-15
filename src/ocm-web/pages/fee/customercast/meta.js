define(["ocm_basemodel"], function(basemodel) {
  var subApplayBill = {
    id: {
      type: 'string'
    },
    applyId: {
      type: 'string'
    }, //申请单Id
    serialNum: {
      type: 'string'
    }, //行号
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
    balanceMny: {
      type: 'amountFloat'
    }, //费用金额
  };
  var reSaleItems = {
    rebateBillId: {
      type: "string"
    },
    financeOrgId: {
      type: "string",
      refmodel: JSON.stringify(refinfo["organization_ocm"]),
      refcfg: '{"ctx":"/uitemplate_web","refName":"财务组织" }',
      refparam: '{"EQ_orgFuncRel": "05","EQ_isEnable":"1"}',
      // required: true
    }, //财务组织
    financeOrgName: {
      type: 'string',
    },
    saleOrgId: {
      type: "string",
      refmodel: JSON.stringify(refinfo["organization_ocm"]),
      refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
      refparam: '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}'
    }, //销售组织
    saleOrgName: {
      type: 'string'
    },
    customerId: {
      type: "string",
      refmodel: JSON.stringify(refinfo['customer']),
      refcfg: '{"ctx":"/uitemplate_web","refName":"返利客户" }',
      // refparam: '{"EQ_isEnable":"1"}'
    }, //返利客户
    customerName: {
      type: 'string'
    },
    rebateSettlementId: {
      type: 'string'
    }, //返利结算id
    rebateMoney: {
      type: 'amountFloat'
    }, //返利金额
    fileId: {
      type: 'string'
    }, //附件id
    rebateAccountMoner: {
      type: 'amountFloat'
    }, //返利总额
    rebatePolicyId: {
      type: 'string'
    }, //销售政策
    rebatePolicyName: {
      type: 'string'
    }, //销售政策
    rebateBillCode: {
      type: 'string'
    }, //返利单据号
    remainFeeMoney: {
      type: 'amountFloat'
    }, //余额=累计生成费用金额-返利金额
    balanceMny: {
      type: 'amountFloat'
    },
    accountFeeMoney: {
      type: 'amountFloat'
    } //累计生成费用金额
    ,
    pageSize: 10
  };
  var model = {
    metas: {
      customer_cast: {
        params: {
          cls: "com.yonyou.occ.fee.service.dto.CustomerCastDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          financeOrgId: {
            type: 'string',
            required: true
          }, //财务组织
          financeOrgName: {
            type: 'string',
            required: true
          }, //财务组织
          financeOrgCode: {
            type: 'string',
            required: true
          }, //财务组织
          customerId: {
            type: 'string',
            required: true
          }, //客户
          customerName: {
            type: 'string',
            required: true
          }, //客户
          customerCode: {
            type: 'string',
            required: true
          }, //客户
          castTypeId: {
            type: 'string',
            required: true
          }, //费用单类型
          castTypeName: {
            type: 'string',
          }, //费用单类型
          castTypeCode: {
            type: 'string',
            required: true
          }, //费用单类型
          saleOrgId: {
            type: 'string',
            required: true
          }, //销售组织
          saleOrgCode: {
            type: 'string'
          }, //销售组织
          saleOrgName: {
            type: 'string'
          }, //销售组织
          accountId: {
            type: 'string',
            required: true,
          }, //账户编码
          accountCode: {
            type: 'string'
          }, //账户
          accountName: {
            type: 'string'
          }, //账户
          billCode: {
            type: 'string'
          }, //客户费用单号
          billDate: {
            type: 'date',
            required: true
          }, //费用单日期
          billStatusId: {
            type: 'string'
          }, //费用单状态
          billStatusCode: {
            type: 'string'
          }, //费用单状态
          billStatusName: {
            type: 'string'
          }, //费用单状态
          currencyId: {
            type: 'string',
            required: true
          },
          currencyCode: {
            type: 'string',
            required: true
          },
          currencyName: {
            type: 'string',
            required: true
          },
          castAmount: {
            type: 'amountFloat',
            required: true,
            regExp: /^\d+(\.{0,1}\d+){0,1}$/
          }, //费用金额(非负数)
          actualFlushAmount: {
            type: 'amountFloat'
          }, //已订单冲抵金额
          actualGoodssupplementAmount: {
            type: 'float'
          }, //
          castBalance: {
            type: 'amountFloat'
          }, //费用余额
          remark: {
            type: 'string'
          }, //备注
          projectId: {
            type: 'string'
          }, //项目
          projectCode: {
            type: 'string'
          }, //项目编码
          projectName: {
            type: 'string'
          }, //项目名称
          state: {
            type: 'string'
          }, //状态
          isMakeRec: {
            type: 'integer'
          },
          beginTime: {
            type: 'datetime'
          }, //开始时间
          endTime: {
            type: 'datetime'
          }, //结束时间
          ext01: {
            type: 'string'
          },
          srcBillTypeId: {
            type: 'string'
          } //来源单据类型主键
        },
        pageSize: 10,
      },
      customer_items: {
        meta: {
          id: {
            type: 'string'
          },
          goodsId: {
            type: 'string'
          },
          goodsName: {
            type: 'string'
          },
          num: {
            type: 'numberFloat'
          },
          price: {
            type: 'priceFloat'
          },
          mny: {
            type: 'amountFloat'
          },
          productLineId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['productLine']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //产品线
          productLineName: {
            type: 'string'
          },
          usedMny: {
            type: 'float'
          },
          balanceMny: {
            type: 'amountFloat'
          },
          balanceMnyTemp: {
            type: 'float'
          },
          usedNum: {
            type: 'float'
          },
          balanceNum: {
            type: 'float'
          },
          remark: {
            type: 'string'
          },
          dr: {
            type: 'string'
          }
        }
      },
      flush_detail: {
        params: {
          cls: "com.yonyou.occ.fee.service.dto.CustomerCastFlushItemDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          customerCastId: {
            type: 'string'
          },
          customerOrderId: {
            type: 'string'
          },
          customerOrderCode: {
            type: 'string'
          },
          flushDate: {
            type: 'date'
          },
          flushAmount: {
            type: 'amountFloat'
          },
          flusher: {
            type: 'string'
          },
          flusherName: {
            type: 'string'
          },
          flushRemark: {
            type: 'string'
          }
        },
        pageSize: 10
      },
      shBill: {
        meta: {
          financeOrgId: {
            type: 'string'
          }, //id
          saleOrgId: {
            type: 'string'
          },
          customerId: {
            type: 'string'
          },
          srcBillid: {
            type: 'string'
          },
          srcTranstype: {
            type: 'string'
          },
          currency: {
            type: 'string'
          },
          project: {
            type: 'string'
          },
          receivableMoney: {
            type: 'string'
          },
          LOAN: {
            type: 'string'
          },
          srcBilltype: {
            type: 'string'
          },
          beginDate: {
            type: 'string'
          },
          endDate: {
            type: 'date'
          },
          billdate: {
            type: 'date'
          },
          dealObject: {
            type: 'string'
          },
          creator: {
            type: 'string'
          },
          creationTime: {
            type: 'string'
          },
        }
      },
      soitemmeta: {
        meta: {
          id: {
            type: 'string'
          },
          serialnum: { //行号
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
          // billState: { //单据状态
          //   type: 'integer'
          // },
          currency: {
            type: 'string'
          },
          currencyName: {
            type: 'string'
          },
          note: {
            type: 'string',
          },
          billreceiptType: {
            type: 'tring'
          }, //收付款业务类型
          money: {
            type: 'amountFloat'
          }, //金钱
          dr: {
            type: 'string'
          },
        },
        pageSize: 10
      },
      soitemmetaItem: {
        meta: {
          id: {
            type: 'string'
          },
          receivableMoney: {
            type: 'amountFloat',
            required: true
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
          beginDate: {
            type: 'date'
          },
          endDate: {
            type: 'date'
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
          note: {
            type: 'string'
          },
          dr: {
            type: 'string'
          }
        },
        pageSize: 10
      },
      applaybill: {
        meta: {
          id: {
            type: "string"
          },
          financeOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"财务组织" }',
            refparam: '{"EQ_orgFuncRel": "05","EQ_isEnable":"1"}',
            // required: true
          }, //财务组织
          financeOrgName: {
            type: 'string',
          },
          saleOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            refparam: '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}'
          }, //销售组织
          saleOrgName: {
            type: 'string'
          },
          deptId: {
            type: 'string'
          }, //销售部门
          deptName: {
            type: 'string'
          }, //销售部门
          salePersonId: {
            type: 'string'
          }, //客户经理
          salePersonName: {
            type: 'string'
          }, //客户经理
          selectitemIds: {
            type: "string"
          },
          billDetails: subApplayBill,
        },
        pageSize: 10
      },
      applaybillItem: {
        meta: {
          id: {
            type: 'string'
          },
          applyId: {
            type: 'string'
          }, //申请单Id
          serialNum: {
            type: 'string'
          }, //行号
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
          balanceMny: {
            type: 'amountFloat'
          }, //费用金额
        },
        pageSize: 10,
      },
      resalebill: {
        meta: {
          id: {
            type: "string"
          },
          code: {
            type: "string"
          }, //结算单编码
          financeOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"财务组织" }',
            refparam: '{"EQ_orgFuncRel": "05","EQ_isEnable":"1"}',
            // required: true
          }, //财务组织
          financeOrgName: {
            type: 'string',
          },
          saleOrgId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"销售组织" }',
            refparam: '{"EQ_orgFuncRel": "01","EQ_isEnable":"1"}'
          }, //销售组织
          saleOrgName: {
            type: 'string'
          },
          rebatePolicyId: {
            type: 'string'
          }, //销售政策
          rebatePolicyName: {
            type: 'string'
          }, //销售政策
          salePersonId: {
            type: 'string'
          }, //客户
          salePersonName: {
            type: 'string'
          }, //客户
          selectitemIds: {
            type: "string"
          },
          rebateSettlemenDetails: reSaleItems,
        },
        pageSize: 10
      },
      resalebillItem: {
        meta: reSaleItems,
        pageSize: 10
      }
    },
    searchs: {
      search1: [{
          type: "refer",
          key: "account--saleOrg",
          keyfordisplay: "saleOrgName",
          label: "销售组织",
          multi: true,
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel": "01",
            "AUTH_refdim": "account.saleOrg"
          }
        }, {
          type: "refer",
          key: "account--financeOrg",
          label: "财务组织",
          required: true,
          refinfo: "organization_ocm",
          multi: true,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07",
            "AUTH_refdim": "account.financeOrg"
          }
        }, {
          type: "refer",
          key: "account--id",
          keyfordisplay: "accountName",
          label: "账户",
          refinfo: "fee-accounts"
        }, {
          type: "refer",
          key: "customer",
          keyfordisplay: "customerName",
          label: "客户",
          multi: true,
          refinfo: "customer",
          clientParam: {
            "EQ_isEnable": "1",
            "AUTH_refdim": "customer"
          },
        }, {
          type: "daterange",
          key: "billDate",
          label: "费用单日期",
        },
        //   {
        //   type: "refer",
        //   key: "productLineId",
        //   keyfordisplay: "productLineName",
        //   label: "产品线",
        //   refinfo: "productLine",
        //   clientParam: {
        //     "EQ_isEnable": "1"
        //   },
        //   multi: true
        // },
        {
          type: "combo",
          key: "account--castTypeId",
          label: "兑付类型",
          dataSource: [{
            value: "pay01",
            name: "冲抵订单"
          }, {
            value: "pay02",
            name: "货补"
          }, {
            value: "pay03",
            name: "实物货补"
          }, {
            value: "pay04",
            name: "账扣"
          }]
        }, {
          type: "type",
          key: "billCode",
          label: "费用单号"
        },
      ],
      search2: [{
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
        key: "deptId",
        keyfordisplay: "deptName",
        label: "销售部门",
        refinfo: "department",
        clientParam: {
          "EQ_isEnable": "1",
        }
      }, {
        type: "daterange",
        key: "billDate",
        label: "单据日期",
      }, {
        type: "text",
        key: "billCode",
        label: "单据号",
      }, {
        type: "refer",
        key: "salePersonId",
        keyfordisplay: "salePersonName",
        label: "客户经理",
        refinfo: "person",
      }, ],
      search3: [{
        type: "refer",
        key: "saleOrg",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "EQ_isEnable": "1",
          "AUTH_refdim": "saleOrg"
        }
      }, {
        type: "refer",
        key: "financeOrg",
        label: "财务组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "07"
        }
      }, {
        type: "refer",
        key: "customerId",
        keyfordisplay: "customerName",
        label: "客户",
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1",
        }
      }, {
        type: "daterange",
        key: "billDate",
        label: "单据日期",
      }, {
        type: "text",
        key: "billCode",
        label: "单据号",
      }, ]
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增费用单",
        auth: true,
        // iconCls: "icon-plus",
        iconCls: "icon-tubiao-riqi",
        children: [{
          key: "addself",
          label: "自制费用单",
          click: "showAddBillPanel",
          auth: true,
        }, {
          key: "refeebill",
          label: "参照费用申请单生成",
          click: "refeebillfun",
          auth: true,
        }, {
          key: "resalebill",
          label: "参照返利生成",
          click: "resalebillfun",
          auth: true,
        }]
      }, {
        key: "del",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "del"
      }, {
        key: "submit",
        label: "提交",
        iconCls: "icon-tubiao-shenhe",
        clickArg: "$data",
        auth: true,
        children: [{
          key: "addBillPanel",
          label: "提交",
          click: "submitCusReqForm",
        }, {
          key: "addBillPanel",
          label: "收回",
          click: "unsubmitCusReqForm",
        }]
      }, {
        key: "approve",
        label: "审批",
        iconCls: "icon-tubiao-shenhe",
        clickArg: "$data",
        auth: true,
        children: [{
          key: "addBillPanel",
          label: "审批",
          click: "approveCusReqForm",
        }, {
          key: "addBillPanel",
          label: "取消审批",
          click: "cancelApproveCusReqForm",
        }, {
          key: "disapprove",
          label: "审批不通过",
          click: "disapproveCusReqForm",
        }, ]
      }, {
        key: "import",
        label: "导入",
        iconCls: "icon-import",
        click: "importHandle"
      }, {
        key: "export",
        label: "导出",
        iconCls: "icon-export",
        click: "exportHandle"
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
      }, {
        key: "edit",
        label: "编辑",
        click: "showEditBillPanel",
        cls: "ui-btn-green customer-edit-show"
      }],
      button5: [{
        key: "cancel",
        label: "取消",
        click: "cancelShouldBill"
      }, {
        key: "save",
        label: "保存",
        click: "saveShouldBill",
        cls: "ui-btn-green"
      }],
      button6: [{
        key: "delAttach",
        label: "删除",
        click: "btnDelAttach",
        iconCls: "icon-shanchu1",
      }, {
        key: "uploadAttach",
        label: "上传",
        click: "btnUploadAttach",
        iconCls: "icon-tubiao-shangchuan"
      }, {
        key: "viewLoadAttach",
        label: "查看",
        click: "fileViewCustomercast",
        iconCls: "icon-tubiao-chakan",
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
      button8: [{
        key: "delshoudrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delShoudItems",
      }],
    },
    cards: {
      card1: [{
          type: "refer",
          key: "accountId",
          label: "账户",
          refinfo: "fee-accounts",
          required: true,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_isLeaf": "1"
          },
          compid: "accountComp",
          domid: "accountCompId"
        }, {
          type: "refer",
          key: "financeOrgId",
          keyfordisplay: "financeOrgName",
          label: "财务组织",
          refinfo: "organization_ocm",
          required: true,
          enable: false,
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "07"
          }
        }, {
          type: "refer",
          key: "saleOrgId",
          keyfordisplay: "saleOrgName",
          label: "销售组织",
          enable: false,
          required: true,
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_isEnable": "1",
            "EQ_orgFuncRel": "01"
          }
        }, {
          type: "combo",
          key: "castTypeId",
          label: "兑付类型",
          dataSource: [{
            value: 'pay01',
            name: '冲抵订单'
          }, {
            value: 'pay02',
            name: '货补'
          }, {
            value: 'pay03',
            name: '实物货补'
          }, {
            value: 'pay04',
            name: '账扣'
          }],
          namefield: "name",
          valuefield: "id",
          hasAll: true,
          required: true,
          enable: false,
        }, {
          type: "refer",
          key: "customerId",
          keyfordisplay: "customerName",
          label: "客户",
          referId: "customerId",
          compid: "customerIdBase",
          refinfo: "customer",
          required: true,
          clientParam: {
            "EQ_isEnable": "1"
          }
        },
        // {
        //   type: "refer",
        //   key: "castTypeId",
        //   keyfordisplay: "castTypeName",
        //   label: "费用单类型",
        //   refinfo: "trantype",
        //   required: true,
        //   clientParam: {
        //     "EQ_isEnable": "1",
        //     "EQ_billTypeId": "CastType"
        //   }
        // },
        {
          type: "text",
          key: "billCode",
          label: "客户费用单号",
          enable: false
        }, {
          type: "date",
          key: "billDate",
          label: "费用单日期",
          required: true,
        },
        // {
        //  type: "refer",
        //  key: "projectId",
        //  label: "项目",
        //  refinfo: "project",
        //  clientParam: {
        //    "EQ_isEnable": "1",
        //    "EQ_dr": "0"
        //  }
        // },
        /*{
            type: "combo",
            key: "billStatusCode",
            keyfordisplay: "billStatusCode",
            label: "费用单状态",
            url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=CUST_CAST_STATUS',
            namefield: "name",
            valuefield: "code",
            clientParam: {"EQ_isEnable":"1"}
        },*/
        {
          type: "refer",
          key: "currencyId",
          keyfordisplay: "currencyName",
          label: "币种",
          refinfo: "currency",
          required: true,
          clientParam: {
            "EQ_isEnable": "1"
          }
        }, {
          type: "combo",
          key: "state",
          label: "单据状态",
          enable: false,
          dataSource: [{
            value: '0',
            name: '保存'
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
          }, {
            value: '9',
            name: '关闭'
          }]
        }, {
          type: "datetime",
          key: "beginTime",
          label: "开始时间",
        }, {
          type: "datetime",
          key: "endTime",
          label: "结束时间",
        }, {
          type: "textarea",
          key: "remark",
          label: "备注",
          cls: "ui-textarea-item"
        }
      ],
      card2: [{
        type: "refer",
        key: "financeOrgId",
        label: "财务组织",
        refName: "财务组织",
        enable: false
      }, {
        type: "refer",
        key: "saleOrgId",
        label: "销售组织",
        refName: "销售组织",
        enable: false
      }, {
        type: "refer",
        key: "billreceiptType",
        label: "收付款类型",
        refinfo: "settlementPaymentType"
      }, {
        //   type: "textreadonly",
        //   key: "code",
        //   value: '',
        //   label: "单据号",
        // }, {
        type: "datetime",
        key: "billdate",
        label: "单据日期",
        required: true,
      }, {
        type: "refer",
        key: "customerId",
        label: "客户",
        refinfo: "customer",
        enable: false
      }, {
        type: "refer",
        key: "currency",
        label: "币种",
        refinfo: "currency",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "String",
        key: "money",
        label: "总金额",
        enable: false
      }]
    },
    details: {
      detail1: [{
        key: "financeOrgName",
        label: "财务组织",
      }, {
        key: "accountName",
        label: "帐户"
      }, {
        key: "castTypeId",
        label: "兑付类型",
        computed: "castTypeCom"
      }, {
        key: "customerName",
        label: "客户"
      }, {
        key: "billCode",
        label: "客户费用单号",
      }, {
        key: "saleOrgName",
        label: "销售组织",
      }, {
        key: "billDate",
        label: "费用单日期",
      }, {
        key: "currencyName",
        label: "币种",
      }, {
        key: "state",
        label: "状态",
        computed: "orderStatus"
      }, {
        key: "beginTime",
        label: "开始时间",
      }, {
        key: "endTime",
        label: "结束时间",
      }, {
        key: "remark",
        label: "备注",
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
            field: "billCode",
            dataType: "String",
            title: "客户费用单号",
            renderType: "detailRender"
          }, {
            field: "financeOrgName",
            dataType: "String",
            title: "财务组织",
          }, {
            field: "accountName",
            dataType: "String",
            title: "账户名称",
          }, {
            field: "castTypeId",
            dataType: "String",
            title: "兑付类型",
            editOptions: {
              type: "combo",
              datasource: "castTypeStr"
            },
            "renderType": "comboRender",
          }, {
            field: "customerName",
            dataType: "String",
            title: "客户",
          }, {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织",
          }, {
            field: "billDate",
            dataType: "Date",
            title: "费用单日期",
          },
          // {
          //   field: "projectName",
          //   dataType: "String",
          //   title: "项目",
          // },
          {
            field: "state",
            dataType: "String",
            title: "费用单状态",
            editOptions: {
              type: "combo",
              datasource: "billStateSrc"
            },
            "renderType": "comboRender",
          }, {
            field: "isMakeRec",
            dataType: "Integer",
            title: "已冲应收",
            renderType: "isMakeRecRender"
          }, {
            field: "currencyName",
            dataType: "String",
            title: "币种",
          }, {
            field: "beginTime",
            dataType: "Datetime",
            title: "开始时间"
          }, {
            field: "endTime",
            dataType: "Datetime",
            title: "结束时间"
          }, {
            field: "remark",
            dataType: "String",
            title: "备注",
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
            field: "billStatusName",
            dataType: "String",
            title: "操作",
            renderType: "operation",
            fixed: true,
            width: "200px"
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
        columns: [
          // {
          //     "field": "goodsId",
          //     "dataType": "String",
          //     "title": "商品编码",
          //     "required": true
          //   }, {
          //     "field": "num",
          //     "dataType": "String",
          //     "title": "数量",
          //     "editType": "float",
          //   }, {
          //     "field": "price",
          //     "dataType": "String",
          //     "title": "单价",
          //     "editType": "float",
          //   },
          {
            "dataType": "String",
            "field": "productLineId",
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
            },
          }, {
            "field": "mny",
            "dataType": "String",
            "title": "费用金额",
            "editType": "float",
            "renderType": "floatRender",
            "required": true,
            // "editOptions": {
            //   "validType": "float",
            //   "precision": "4",
            //   "min": 1
            // }
          },
          // {
          //   "field": "balanceMnyTemp",
          //   "dataType": "String",
          //   "title": "费用余额",
          //   "editType": "float",
          //   "required": true,
          //   "visible": false,
          //   "editOptions": {
          //     "validType": "float",
          //     "precision": "0",
          //     "min": 1
          //   }
          // },
          {
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
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [
          // {
          //   "field": "goodsId",
          //   "dataType": "String",
          //   "title": "商品编码",
          // }, {
          //   "field": "num",
          //   "dataType": "String",
          //   "title": "数量",
          // }, {
          //   "field": "price",
          //   "dataType": "String",
          //   "title": "单价",
          // },
          {
            "dataType": "String",
            "field": "productLineName",
            "title": "产品线",
          }, {
            "field": "mny",
            "dataType": "String",
            "title": "费用金额",
          }, {
            "field": "balanceMny",
            "dataType": "String",
            "title": "费用余额"
          }, {
            "field": "remark",
            "dataType": "String",
            "title": "备注",
          },
        ]
      },
      grid4: {
        domid: "flush_detail",
        umeta: {
          id: "grid_flush_detail",
          data: "flushDetailList",
          type: "grid",
          editable: false,
          //multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "flushDate",
          dataType: "Date",
          title: "兑付日期"
        }, {
          field: "flushAmount",
          dataType: "String",
          title: "兑付金额"
        }, {
          field: "flusherName",
          dataType: "String",
          title: "操作人"
        }, {
          field: "customerOrderCode",
          dataType: "String",
          title: "订单号"
        }, {
          field: "flushRemark",
          dataType: "String",
          title: "兑付备注",
        }]
      },
      grid5: {
        domid: "grid_shBilllItems_dom",
        umeta: {
          "id": "grid_shBilllItems",
          "data": "shBilllItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "receivableMoney",
          "dataType": "String",
          "title": "应收金额",
          'required': true
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
          "dataType": "String",
          "field": "productLineId",
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
          },
        }, {
          "field": "note",
          "dataType": "String",
          "title": "备注",
        }, ]
      },
      grid6: {
        domid: "applaybill_dom",
        umeta: {
          id: "grid_applaybill",
          data: "applaybillList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
          onRowSelected: "referSelectHandle",
          onRowUnSelected: "referUnSelectHandle",
          sortable: false
        },
        columns: [{
          field: "financeOrgName",
          dataType: "String",
          title: "财务组织"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "deptName",
          dataType: "String",
          title: "销售部门"
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户"
        }, {
          field: "billCode",
          dataType: "String",
          title: "订单号"
        }, {
          field: "salePersonName",
          dataType: "String",
          title: "客户经理",
        }]
      },
      grid6Item: {
        domid: "applaybillItem_dom",
        umeta: {
          id: "grid_applaybillItem",
          data: "applaybillItem",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
          onRowSelected: "referSelectItemHandle",
          onRowUnSelected: "referUnSelectItemHandle",
        },
        columns: [{
          field: "serialNum",
          dataType: "String",
          title: "行号"
          //        }, {
          //          field: "saleOrgName",
          //          dataType: "String",
          //          title: "销售组织"
          //        }, {
          //          field: "customerName",
          //          dataType: "String",
          //          title: "客户"
        }, {
          field: "projectName",
          dataType: "String",
          title: "收支项目",
        }, {
          field: "balanceMny",
          dataType: "String",
          title: "余额",
          editType: "float",
          renderType: "floatRender",
        }, ]
      },
      grid6refer: {
        domid: "applaybillrefer_dom",
        umeta: {
          id: "grid_applaybillrefer",
          data: "referapplaybillList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "financeOrgName",
          dataType: "String",
          title: "财务组织"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "deptName",
          dataType: "String",
          title: "销售部门"
        }, {
          field: "billCode",
          dataType: "String",
          title: "订单号"
        }, {
          field: "salePersonName",
          dataType: "String",
          title: "客户经理",
        }]
      },
      grid6Itemrefer: {
        domid: "applaybillItemrefer_dom",
        umeta: {
          id: "grid_applaybillItemrefer",
          data: "referapplaybillItem",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "serialNum",
          dataType: "String",
          title: "行号"
          //        }, {
          //          field: "saleOrgName",
          //          dataType: "String",
          //          title: "销售组织"
          //        }, {
          //          field: "customerName",
          //          dataType: "String",
          //          title: "客户"
        }, {
          field: "projectName",
          dataType: "String",
          title: "收支项目",
        }, {
          field: "balanceMny",
          dataType: "String",
          title: "余额",
          editType: "float",
          renderType: "floatRender",
        }, ]
      },
      grid7: {
        domid: "resalebill_dom",
        umeta: {
          id: "grid_resalebill",
          data: "resalebillListOp",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
          onRowSelected: "saleSelectHandle",
          onRowUnSelected: "saleUnSelectHandle",
          sortable: false
        },
        columns: [{
          field: "code",
          dataType: "String",
          title: "结算单号",
          renderType: "detailRender"
        }, {
          field: "rebatePolicyName",
          dataType: "String",
          title: "返利政策",
        }, {
          field: "cycleName",
          dataType: "String",
          title: "返利周期",
        }, {
          field: "financeOrgName",
          dataType: "String",
          title: "财务组织"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "rebatePolicyName",
          dataType: "String",
          title: "销售政策"
        }]
      },
      grid7Item: {
        domid: "resalebillItem_dom",
        umeta: {
          id: "grid_resalebillItem",
          data: "resalebillItemOp",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
          onRowSelected: "saleSelectItemHandle",
          onRowUnSelected: "saleUnSelectItemHandle",
        },
        columns: [
          //        {
          //          field: "rebateBillId",
          //          dataType: "String",
          //          title: "单据号"
          //        },
          {
            field: "financeOrgName",
            dataType: "String",
            title: "财务组织"
            //        }, {
            //          field: "saleOrgName",
            //          dataType: "String",
            //          title: "销售组织"
          }, {
            field: "customerName",
            dataType: "String",
            title: "客户"
          }, {
            field: "projectName",
            dataType: "String",
            title: "收支项目",
          }, {
            field: "remainFeeMoney",
            dataType: "String",
            title: "余额",
            editType: "float",
            renderType: "floatRender",
          },
        ]
      },
      grid7refer: {
        domid: "resalebillrefer_dom",
        umeta: {
          id: "grid_resalebillrefer",
          data: "selectResalebillListOp",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "financeOrgName",
          dataType: "String",
          title: "财务组织"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织"
        }, {
          field: "deptName",
          dataType: "String",
          title: "销售部门"
        }, {
          field: "customerOrderCode",
          dataType: "String",
          title: "订单号"
        }, {
          field: "salePersonName",
          dataType: "String",
          title: "客户经理",
        }]
      },
      grid7Itemrefer: {
        domid: "resalebillItemrefer_dom",
        umeta: {
          id: "grid_resalebillItemrefer",
          data: "selectResalebillItemOp",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "financeOrgName",
          dataType: "String",
          title: "财务组织"
          //        }, {
          //          field: "saleOrgName",
          //          dataType: "String",
          //          title: "销售组织"
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户"
        }, {
          field: "projectName",
          dataType: "String",
          title: "收支项目",
        }, {
          field: "remainFeeMoney",
          dataType: "String",
          title: "余额",
          editType: "float",
          renderType: "floatRender",
        }, ]
      },
    }
  }
  return new basemodel(model);
})