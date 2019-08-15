define(["ocm_basemodel"], function (basemodel) {
  var model = {
    metas: {
      SalesPolicyMeta: {
        params: {
          cls: "com.yonyou.occ.rebate.service.dto.PolicyDto"
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
            type: 'date',
            required: true
          },
          endTime: {
            type: 'date',
            required: true
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
          rebateValueType: { // 返利值类型
            type: 'string'
          },
          isAccount: { // 是否已结算
            type: 'integer'
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
      StatisticsMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.RebateStatisticsQueryResultDto" // 需进行一些处理，不能直接取统计结果
        },
        meta: {
          id: {
            type: "string"
          },
          saleOrgId: {
            type: "string",
            required: true
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          policyId: { // 返利政策
            type: "string",
            required: true
          },
          policyCode: {
            type: "string"
          },
          policyName: {
            type: "string"
          },
          customerId: { // 返利客户
            type: "string",
            required: true
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          cycleName: { // 返利周期
            type: "string"
          },
          startTime: { // 开始时间
            type: "date"
          },
          rebateValueMon: { // 返利值 (根据返利值类型，存金额或数量)
            type: "numberFloat"
          },
          endTime: {
            type: "date"
          },
          code: { // 单据号
            type: "string"
          },
          operation: { // 操作列，仅供前端交互
            type: "string"
          }
        },
        pageSize: 50
      },
      RebateSettlementMeta: {
        params: { // 表头已平铺到表体
          "cls": "com.yonyou.occ.rebate.service.dto.RebateSettlemenDetailDto"
        },
        meta: {
          id: {
            type: "string"
          },
          saleOrgId: {
            type: "string",
            required: true
          },
          saleOrgCode: {
            type: 'string'
          },
          saleOrgName: {
            type: 'string'
          },
          financeOrgId: { // 财务组织
            type: 'string',
          },
          financeOrgCode: {
            type: 'string',
          },
          financeOrgName: {
            type: 'string',
          },
          rebatePolicyId: { // 返利政策
            type: "string",
            required: true
          },
          rebatePolicyCode: {
            type: "string"
          },
          rebatePolicyName: {
            type: "string"
          },
          customerId: { // 返利客户
            type: "string",
            required: true
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          cycleId: {
            type: "string"
          },
          cycleName: { // 返利周期
            type: "string"
          },
          startTime: { // 开始时间
            type: "date"
          },
          endTime: {
            type: "date"
          },
          rebateMoney: { // 返利金额
            type: "amountFloat"
          },
          operation: { // 操作列，仅供前端交互
            type: "string"
          }
        },
        pageSize: 50
      },
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
        },
        {
          type: "refer",
          key: "id",
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
        key: "cancel",
        label: "返回",
        click: "backPanel",
        iconCls: "icon-tubiao-guanbi-anxing"
      }, {
        key: "cancel",
        label: "结算",
        click: "rebateSettlementHandle",
        iconCls: "icon-plus"
      }],
      button2: [{
        key: "cancel",
        label: "返回",
        click: "backPanel",
        cls: "ui-btn-primary"
      }],
    },
    grids: {
      grid1: {
        domid: "grid_StatisticsNoteDetailList_dom",
        umeta: {
          id: "grid_StatisticsNoteDetailList",
          data: "SalesPolicyList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [
          {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织"
          },
          {
            field: "name",
            dataType: "String",
            title: "返利政策"
          },
          {
            field: "cycleName",
            dataType: "String",
            title: "返利周期"
          },
          {
            field: "startTime",
            dataType: "DateTime",
            title: "起始日期",
            width: "180"
          },
          {
            field: "endTime",
            dataType: "DateTime",
            title: "结束日期",
            width: "180"
          },
          {
            field: "isAccount",
            dataType: "String",
            title: "是否已结算",
            renderType: "isAccountRender"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation",
            fixed: true,
            width: "180"
          }
        ]
      },
      grid2: {
        domid: "grid_StatisticsList_dom",
        umeta: {
          id: "grid_StatisticsList",
          data: "StatisticsList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
          {
            field: "code",
            dataType: "String",
            title: "单据号"
          },
          {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织"
          },
          {
            field: "policyName",
            dataType: "String",
            title: "返利政策"
          },
          {
            field: "customerName",
            dataType: "String",
            title: "返利客户"
          },
          {
            field: "cycleName",
            dataType: "String",
            title: "返利周期"
          },
          {
            field: "startTime",
            dataType: "Date",
            title: "起始日期"
          },
          {
            field: "endTime",
            dataType: "Date",
            title: "结束日期"
          },
          // {
          //   field: "rebateValueMon",
          //   dataType: "String",
          //   title: "返利值数量",
          //   // renderType: "rebateValueTypeRender"
          // },
          {
            field: "rebateValueMon",
            dataType: "String",
            title: "返利值总额"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation2",
            fixed: true,
            width: "100"
          }
        ]
      },
      grid3: {
        domid: "grid_RebateSettlementList_dom",
        umeta: {
          id: "grid_RebateSettlementList",
          data: "RebateSettlementList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [
          {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织"
          },
          {
            field: "financeOrgName",
            dataType: "String",
            title: "财务组织"
          },
          {
            field: "rebatePolicyName",
            dataType: "String",
            title: "返利政策"
          },
          {
            field: "customerName",
            dataType: "String",
            title: "返利客户"
          },
          {
            field: "cycleName",
            dataType: "String",
            title: "返利周期"
          },
          {
            field: "startTime",
            dataType: "Date",
            title: "起始日期"
          },
          {
            field: "endTime",
            dataType: "Date",
            title: "结束日期"
          },
          {
            field: "rebateMoney",
            dataType: "String",
            title: "返利金额"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});