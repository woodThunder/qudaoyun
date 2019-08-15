define(["ocm_basemodel"], function (basemodel) {
  var model = {
    metas: {
      SalePolicyMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.PolicyDto"
        },
        meta: {
          //基本信息开始
          id: {
            type: "string"
          },
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
          dimensionName: { // 维度
            type: 'sring',
          },
          dimensionValue: { // 维度值
            type: 'stirng'
          },
          startTime: {
            type: 'date',
            required: true
          },
          endTime: {
            type: 'date',
            required: true
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
      CustomerScopeMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.CustomerScopeDto"
        },
        meta: {
          id: {
            type: "string"
          },
          policyId: {
            type: "string"
          },
          // 市场区域
          marketAreaId: {
            refmodel: JSON.stringify(refinfo["market"]),
            refparam: '{"EQ_isEnable":"1"}',
            refcfg: '{"ctx":"/uitemplate_web"}'
          },
          marketAreaCode: {
            type: "string"
          },
          marketAreaName: {
            type: "string"
          },
          customerId: {
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            clientParam: {
              EQ_isEnable: "1"
            }
          }, // 客户
          customerCode: {
            type: "string"
          }, // 客户编码
          customerName: {
            type: "string"
          }, // 客户名称
          customerCategoryId: {
            refmodel: JSON.stringify(refinfo["customer-category"]),
            refcfg: '{"ctx":"/uitemplate_web"}'
          }, // 客户分类
          customerCategoryCode: {
            type: "string"
          }, //客户分类编码
          customerCategoryName: {
            type: "string"
          }, //客户分类名称
          exclude: {
            type: "string",
            default: "0"
          }, //是否禁止
        },
        pageSize: 10
      },
      BasisMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.BasisDto"
        },
        meta: {
          id: {
            type: "string"
          }, //id
          policyId: {
            type: "string"
          },
          code: {
            type: "string",
            required: true
          },
          name: {
            type: "string",
            required: true
          },
          billTypeId: { // 单据类型
            type: 'string',
            refmodel: JSON.stringify(refinfo['billtype']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_isEnable":"1","IN_code":"SaleOrder,SaleOut"}',
            required: true
          },
          billTypeCode: {
            type: "string"
          },
          billTypeName: {
            type: "string"
          },
          rebateBasisType: { // 返利依据类型
            type: "string",
            required: true
          },
          salesTargetId: { // 销售指标
            type: 'string',
            refmodel: JSON.stringify(refinfo['saleTarget']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_state": "3"}',
            required: true
          },
          salesTargetCode: {
            type: "string",
          },
          salesTargetName: {
            type: "string"
          },
          accountTarget: { // 累计指标
            type: "string",
            default: "0"
          },
          includeSecCustomer: { // 包含子客户
            type: "integer",
            default: "0",
            required: true
          },
          includeLowCustomer: { // 包含下级客户
            type: "integer",
            default: "0",
            required: true
          }
        },
        pageSize: 10
      },
      BasisConditionDetailMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.BasisConditionDetailDto"
        },
        meta: {
          id: {
            type: "string"
          }, //id
          basisId: { // 返利依据主键
            type: "string"
          },
          trantypeId: { // 交易类型 仅供前端交互使用
            type: 'string',
            refmodel: JSON.stringify(refinfo['trantype']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            // refparam: '{"EQ_billTypeId": "SaleOrder"}'
          },
          trantypeName: {
            type: 'string'
          },
          promActivityId: { // 促销活动 仅供前端交互使用
            type: 'string',
            refmodel: JSON.stringify(refinfo['promActivityFromProm']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_state": "3"}'
          },
          promActivityName: {
            type: 'string'
          },
          goodsRangeId: { // 商品范围 仅供前端交互使用
            refmodel: JSON.stringify(refinfo["Combination"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"商品范围" }',
            refparam: '{"EQ_isEnable":"1"}',
          },
          goodsRangeName: {
            type: 'string'
          },
          projectId: { // 项目 仅供前端交互使用
            type: "string",
            refmodel: JSON.stringify(refinfo["project"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"项目" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          projectName: {
            type: 'string'
          },
          isGift: {
            type: 'integer',
            default: "0"
          },
          goodsSupplement: {
            type: 'integer',
            default: "0"
          },
          conditionName: { // 过滤条件
            type: "stirng"
          },
          conditionCode: {
            type: "stirng"
          },
          comparison: { // 比较符
            type: "stirng"
          },
          comparison1: { // comparison1~n 仅供前端交互使用
            type: "string"
          },
          comparison2: {
            type: "string"
          },
          comparison3: {
            type: "string"
          },
          comparison4: {
            type: "string"
          },
          comparison5: {
            type: "string"
          },
          comparison6: {
            type: "string"
          },
          rangeValues: { // 取值范围
            type: "string"
          }
        },
        pageSize: 50
      },
      ValueMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.ValueDto"
        },
        meta: {
          id: {
            type: "string"
          }, //id
          policyId: {
            type: "string"
          },
          billTypeId: { // 单据类型
            type: 'string',
            refmodel: JSON.stringify(refinfo['billtype']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_isEnable":"1","IN_code":"SaleOrder,SaleOut"}',
            required: true
          },
          billTypeCode: {
            type: "string"
          },
          billTypeName: {
            type: "string"
          },
          rebateValueType: { // 返利值类型
            type: "string",
            required: true,
          },
          salesTargetId: { // 销售指标
            type: 'string',
            refmodel: JSON.stringify(refinfo['saleTarget']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_state": "3"}'
          },
          salesTargetCode: {
            type: "string",
          },
          salesTargetName: {
            type: "string"
          },
          accountTarget: { // 累计指标
            type: "string",
            default: "0"
          },
          includeSecCustomer: { // 包含子客户
            type: "integer",
            default: "0",
            required: true
          },
          includeLowCustomer: { // 包含下级客户
            type: "integer",
            default: "0",
            required: true
          }
        },
        pageSize: 10
      },
      ValueConditionDetailMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.ValueConditionDetailDto"
        },
        meta: {
          id: {
            type: "string"
          }, //id
          valueId: { // 返利值主键
            type: "string"
          },
          trantypeId: { // 交易类型 仅供前端交互使用
            type: 'string',
            refmodel: JSON.stringify(refinfo['trantype']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            // refparam: '{"EQ_billTypeId": "SaleOrder"}'
          },
          trantypeName: {
            type: 'string'
          },
          promActivityId: { // 促销活动 仅供前端交互使用
            type: 'string',
            refmodel: JSON.stringify(refinfo['promActivityFromProm']),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_state": "3"}'
          },
          promActivityName: {
            type: 'string'
          },
          goodsRangeId: { // 商品范围 仅供前端交互使用
            required: true,
            refmodel: JSON.stringify(refinfo["Combination"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"商品范围" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          goodsRangeName: {
            type: 'string'
          },
          projectId: { // 项目 仅供前端交互使用
            type: "string",
            refmodel: JSON.stringify(refinfo["project"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"项目" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          projectName: {
            type: 'string'
          },
          isGift: {
            type: 'integer',
            default: "0"
          },
          goodsSupplement: {
            type: 'integer',
            default: "0"
          },
          conditionName: { // 过滤条件
            type: "stirng"
          },
          conditionCode: {
            type: "stirng"
          },
          comparison: { // 比较符
            type: "stirng"
          },
          comparison1: { // comparison1~n 仅供前端交互使用
            type: "string"
          },
          comparison2: {
            type: "string"
          },
          comparison3: {
            type: "string"
          },
          comparison4: {
            type: "string"
          },
          comparison5: {
            type: "string"
          },
          comparison6: {
            type: "string"
          },
          rangeValues: { // 取值范围
            type: "string"
          }
        },
        pageSize: 50
      },
      CalculationRuleMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.CalculationRuleDto"
        },
        meta: {
          id: {
            type: "string"
          }, //id
          policyId: {
            type: "string"
          },
          isFinanceOrg: { // 分财务组织
            type: "string",
            default: "0"
          },
          progressiveWay: { // 累计方式
            type: "stirng"
          },
          pricingIndexItem: { // 定价指标项
            type: "stirng"
          },
          /*pricingIndexItemCode: {
            type: "stirng"
          },
          pricingIndexItemName: {
            type: "stirng"
          }*/
        },
        pageSize: 50
      },
      CalculationRuleitemMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.CalculationRuleitemDto"
        },
        meta: {
          id: {
            type: "string"
          }, //id
          calculationRuleId: { // 计算规则主键
            type: "string"
          },
          upperLimit: { // 上限
            type: "stirng"
          },
          lowerLimit: { // 下限
            type: "stirng"
          },
          rebatePrice: { // 返利价格
            type: "stirng"
          }
        },
        pageSize: 50
      }
    },
    searchs: {
      search1: [{
          type: "refer",
          key: "saleOrg",
          keyfordisplay: "saleOrgName",
          label: "政策制定组织",
          multi: true,
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel": "01",
            "EQ_isEnable": "1",
            "AUTH_refdim": "saleOrg"
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
      }, {
        key: "return",
        label: "返回",
        cls: "ui-btn-green",
        click: "backPanel"
      }],
      button3: [{
          key: "addrow",
          label: "增行",
          click: "addRow",
          cls: "ui-btn-orange",
          clickArg: "CustomerScopeList",
          iconCls: "icon-plus"
        },
        {
          key: "delrow",
          label: "删行",
          click: "delChild",
          clickArg: "CustomerScopeList",
          iconCls: "icon-shanchu1"
        },
        {
          key: "save",
          label: "保存",
          click: "saveCustomerScope",
          iconCls: "icon-tubiao-baocun"
        }
      ],
      button4: [{
        key: "addrow",
        label: "增行",
        click: "showEditBasisDialog",
        cls: "ui-btn-orange",
        iconCls: "icon-plus"
      }],
      button5: [{
        key: "save",
        label: "保存",
        click: "saveRebateValue",
        iconCls: "icon-tubiao-baocun"
      }],
      button6: [{
          key: "save",
          label: "保存",
          click: "saveCalculationRule",
          iconCls: "icon-tubiao-baocun"
        }

      ],
      button7: [{
          key: "cancel",
          label: "返回",
          click: "backPanel",
          cls: "ui-btn-primary"
        }
      ],
      button8: [{
        key: "return",
        label: "返回",
        click: "retListPanel",
        cls: "ui-btn-green"
      }]
    },
    cards: {
      card1: [
        {
          type: "refer",
          key: "saleOrgId",
          label: "政策制定组织",
          refName: "政策制定组织",
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
          label: "年",
          enable: false
        },
        {
          type: "combo",
          key: "dimensionName",
          label: "维度",
          dataSource: "dimensionNameSource"
        }, {
          type: "combo",
          key: "dimensionValue",
          label: "维度值",
          dataSource: "dimensionValueSource"
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
        }
      ],
      card2: [{ // 返利依据卡片
          type: "text",
          key: "code",
          label: "编码"
        },
        {
          type: "text",
          key: "name",
          label: "名称"
        }, {
          type: "refer",
          key: "billTypeId",
          label: "单据类型"
        }, {
          type: "combo",
          key: "rebateBasisType",
          label: "返利依据类型",
          dataSource: "rebateBasisTypeSource"
        }, {
          type: "refer",
          key: "salesTargetId",
          domid: "basisSalesTargetId",
          referId: "basisSalesTargetIdRefer",
          label: "销售指标",
          disableFilter: true
        },
        {
          type: "radio",
          key: "accountTarget",
          label: "累计指标",
          dataSource: "whetherSrc"
        },
        {
          type: "radio",
          key: "includeSecCustomer",
          label: "包含子客户",
          dataSource: "whetherSrc"
        },
        {
          type: "radio",
          key: "includeLowCustomer",
          label: "包含下级客户",
          dataSource: "whetherSrc"
        },
      ],
      card3: [{ // 返利值卡片
          type: "refer",
          key: "billTypeId",
          label: "单据类型"
        }, {
          type: "combo",
          key: "rebateValueType",
          label: "返利值类型",
          dataSource: "rebateValueTypeSource"
        },
        {
          type: "refer",
          key: "salesTargetId",
          label: "销售指标",
          domid: "valueSalesTargetId",
          referId: "valueSalesTargetIdRefer",
          compid: "valueSalesTargetCompId",
          disableFilter: true
        },
        {
          type: "radio",
          key: "accountTarget",
          label: "累计指标",
          dataSource: "whetherSrc"
        },
        {
          type: "radio",
          key: "includeSecCustomer",
          label: "包含子客户",
          dataSource: "whetherSrc"
        },
        {
          type: "radio",
          key: "includeLowCustomer",
          label: "包含下级客户",
          dataSource: "whetherSrc"
        },
      ]
    },
    dialogs: {
      dialog1: [

      ]
    },
    details: {
      detail1: [{
          key: "saleOrgName",
          label: "政策制定组织"
        }, {
          key: "code",
          label: "编码"
        },
        {
          key: "name",
          label: "名称"
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
          key: "dimensionName",
          label: "维度",
          computed: "dimensionNameCompute"
        },
        {
          key: "dimensionValue",
          label: "维度值",
          computed: "dimensionValueCompute"
        },
        {
          key: "startTime",
          label: "开始日期"
        },
        {
          key: "endTime",
          label: "结束日期"
        }
      ],
      detail2: [{
          key: "billTypeName",
          label: "单据类型"
        }, {
          key: "rebateValueType",
          label: "返利值类型",
          computed: "rebateValueTypeComputed"
        },
        {
          key: "salesTargetName",
          label: "销售指标"
        },
        {
          key: "accountTarget",
          label: "累计指标",
          computed: "accountTargetComputed"
        },
        {
          key: "includeSecCustomer",
          label: "包含子客户",
          computed: "includeSecCustomerComputed"
        }, {
          key: "includeLowCustomer",
          label: "包含下级客户",
          computed: "includeLowCustomerComputed"
        }
      ],
      detail3: [{
          key: "code",
          label: "编码"
        },
        {
          key: "name",
          label: "名称"
        },
        {
          key: "billTypeName",
          label: "单据类型"
        },

        {
          key: "rebateBasisType",
          label: "返利依据类型",
          computed: "rebateBasisTypeComputed"
        },
        {
          key: "salesTargetName",
          label: "销售指标"
        },
        {
          key: "accountTarget",
          label: "累计指标",
          computed: "accountTargetComputed"
        },
        {
          key: "includeSecCustomer",
          label: "包含子客户",
          computed: "includeSecCustomerBasisComputed"
        }, {
          key: "includeLowCustomer",
          label: "包含下级客户",
          computed: "includeLowCustomerBasisComputed"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_salePolicyList_dom",
        umeta: {
          id: "grid_salePolicyList",
          data: "SalePolicyList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
          field: "saleOrgName",
          dataType: "String",
          title: "政策制定组织",
        }, {
          field: "code",
          dataType: "String",
          title: "编码",
          renderType: "detailRender"
        }, {
          field: "name",
          dataType: "String",
          title: "名称",
        }, {
          field: "cycleName",
          dataType: "String",
          title: "周期",
        }, , {
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
          field: "state",
          dataType: "String",
          title: "单据状态",
          renderType: "isStateGrid"
        }, {
          field: "remark",
          dataType: "String",
          title: "备注"
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
      grid2: {
        domid: "gridCustomerScopeList_dom",
        umeta: {
          id: "grid_CustomerScopeList",
          data: "CustomerScopeList",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true,
          // onBeforeEditFun: "ifCanEidtHandle"
        },
        columns: [{
            field: "customerCategoryId",
            dataType: "String",
            title: "客户分类",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "customerCategoryName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "customerCategoryId",
                refname: "customerCategoryName"
              }
            }
          },
          {
            field: "customerId",
            dataType: "String",
            title: "客户",
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
            field: "marketAreaId",
            dataType: "String",
            title: "市场区域",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "marketAreaName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "marketAreaId",
                refname: "marketAreaName",
                refcode: "marketAreaCode",
              }
            }
          },
          {
            field: "exclude",
            dataType: "Integer",
            title: "是否禁止",
            renderType: "booleanRender"
          }
        ]
      },
      grid3: {
        domid: "grid_BasisList_dom",
        umeta: {
          id: "grid_BasisList",
          data: "BasisList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
          field: "code",
          dataType: "String",
          title: "依据编码",
          renderType: "basisDetailRender"
        }, {
          field: "name",
          dataType: "String",
          title: "依据名称",
        }, {
          field: "billTypeName",
          dataType: "String",
          title: "单据类型",
        }, {
          field: "rebateBasisType",
          dataType: "String",
          title: "返利依据类型",
          renderType: "rebateBasisTypeRender"
        }, {
          field: "salesTargetName",
          dataType: "String",
          title: "销售指标",
        }, {
          field: "accountTarget",
          dataType: "String",
          title: "累计指标",
          renderType: "isAccountTarget"
        }, {
          field: "operation",
          dataType: "String",
          title: "操作",
          renderType: "basisOperation",
          fixed: true,
          width: "100"
        }]
      },
      grid4: {
        domid: "grid_CalculationRuleList_demo",
        umeta: {
          id: "grid_CalculationRuleList",
          data: "CalculationRuleList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "exclude",
            dataType: "Integer",
            title: "分财务组织",
            renderType: "booleanRender"
          },
          {
            field: "progressiveWay",
            dataType: "String",
            title: "累进方式",
            renderType: "comboRender",
            datasource: "progressiveWaySource"
          },
          {
            field: "pricingIndexItem",
            dataType: "String",
            title: "定价指标项",
            renderType: "comboRender",
            datasource: "pricingIndexItemSource"
          }
        ]
      },
      grid5: {
        domid: "gridCustomerScopeList_detail_dom",
        umeta: {
          id: "grid_CustomerScopeList_detail",
          data: "CustomerScopeList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "customerCategoryName",
            dataType: "String",
            title: "客户分类"
          },
          {
            field: "customerName",
            dataType: "String",
            title: "客户"
          },
          {
            field: "marketAreaName",
            dataType: "String",
            title: "市场区域"
          },
          {
            field: "exclude",
            dataType: "Integer",
            title: "是否禁止",
            renderType: "yesOrNoRender"
          }
        ]
      },
      grid6: {
        domid: "grid_BasisList_detail_dom",
        umeta: {
          id: "grid_BasisList_detail",
          data: "BasisList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
          field: "code",
          dataType: "String",
          title: "依据编码",
          renderType: "basisDetailRender"
        }, {
          field: "name",
          dataType: "String",
          title: "依据名称",
        }, {
          field: "billTypeName",
          dataType: "String",
          title: "单据类型",
        }, {
          field: "rebateBasisType",
          dataType: "String",
          title: "返利依据类型",
          renderType: "rebateBasisTypeRender"
        }, {
          field: "salesTargetName",
          dataType: "String",
          title: "销售指标",
        }, {
          field: "accountTarget",
          dataType: "Integer",
          title: "累计指标",
          renderType: "isAccountTarget"
        }]
      },
      grid7: {
        domid: "grid_CalculationRuleList_detail_demo",
        umeta: {
          id: "grid_CalculationRuleList_detail",
          data: "CalculationRuleList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "isFinanceOrg",
            dataType: "Integer",
            title: "分财务组织",
            renderType: "yesOrNoRender"
          },
          {
            field: "progressiveWay",
            dataType: "String",
            title: "累进方式",
            renderType: "progressiveWayRender"
          },
          {
            field: "pricingIndexItem",
            dataType: "String",
            title: "定价指标项"
          }
        ]
      },
      grid8: {
        domid: "grid_ValueConditionDetailList_detail_demo",
        umeta: {
          id: "grid_ValueConditionDetailList_detail",
          data: "ValueConditionDetailList",
          type: "grid",
          editable: true,
          multiSelect: false,
          showNumCol: false
        },
        columns: [{
            field: "conditionName",
            dataType: "String",
            title: "过滤条件名称",
            editable: false
          },
          {
            field: "comparison",
            dataType: "String",
            title: "比较符",
            renderType: "comparisonRender"
          },
          {
            field: "rangeValues",
            dataType: "String",
            title: "取值范围",
            renderType: "rangeValuesRender"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});