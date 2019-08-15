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
      StatisticsNoteDetailMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.StatisticsNoteDetailDto"
        },
        meta: {
          //基本信息开始
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
          salePolicyId: { // 返利政策
            type: "string",
            required: true
          },
          salePolicyCode: {
            type: "string"
          },
          salePolicyName: {
            type: "string"
          },
          startTime: { // 统计开始时间
            type: 'date',
          },
          success: { // 成功客户数
            type: "integer"
          },
          faile: { // 失败客户数
            type: "integer"
          },
          consumeTime: { // 统计耗时
            type: 'date',
          },
          total: { // 统计客户数
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
      StatisticsMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.StatisticsDto"
        },
        meta: {
          id: {
            type: "string"
          },
          statisticsNoteDetailId: { // 统计记录主键
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
          salePolicyId: { // 返利政策
            type: "string",
            required: true
          },
          salePolicyCode: {
            type: "string"
          },
          salePolicyName: {
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
          rebateValueType: { // 返利值类型
            type: "string"
          },
          rebateValueMon: { // 返利值总额
            type: "amoutFloat"
          },
          isAccount: { // 是否已结算
            type: "integer"
          },
          isSuccess: { // 是否成功
            type: "integer"
          },
          isException: { // 异常信息
            type: "string"
          },
          endTime: {
            type: "date"
          },
          billCode: { // 单据号
            type: "string"
          },
          operation: { // 操作列，仅供前端交互
            type: "string"
          }
        },
        pageSize: 10
      },
      StatisticsBasisMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.StatisticsBasisDto"
        },
        meta: {
          id: {
            type: "string"
          },
          statisticsId: { // 返利数据统计明细主键
            type: "string"
          },
          basisId: { // 返利依据
            type: "string"
          },
          basisCode: {
            type: "string",
          },
          basisName: {
            type: "string"
          },
          saleOrgId: { // 销售组织
            type: "string"
          },
          saleOrgCode: {
            type: "string",
          },
          saleOrgName: {
            type: "string"
          },
          salePolicyId: { // 返利政策
            type: "string"
          },
          salePolicyCode: {
            type: "string",
          },
          salePolicyName: {
            type: "string"
          },
          customerId: { // 返利客户
            type: "string"
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          includeSeccustomer: { // 是否包含子客户
            type: "integer"
          },
          includeSubcustomer: { // 是否包含下级客户
            type: "integer"
          },
          rebateBasisType: { // 返利单据类型
            type: "string"
          },
          rebateBasisMon: { // 返利依据总额
            type: "float"
          },
          rebateBasisGroRate: { // 返利依据增长率
            type: "float"
          },
          totalNum: { // 数量统计
            type: "numberFloat"
          },
          lastTotalNum: { // 去年同期数量统计
            type: "numberFloat"
          },
          totalNumRate: { // 同比数量增长率
            type: "float"
          },
          totalMoney: { // 金额统计
            type: "amountFloat"
          },
          lastTotalMoney: { // 去年同期金额统计
            type: "amountFloat"
          },
          totalMoneyRate: { // 同比金额增长率
            type: "float"
          },
          outPlanSale: { // 金额超目标额
            type: "amountFloat"
          },
          outPlanSaleRate: { // 金额超目标率
            type: "float"
          },
          isStandard: { // 是否达标
            type: "integer"
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
      StatisticsBasisDetailMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.StatisticsBasisDetailDto"
        },
        meta: {
          id: {
            type: "string"
          },
          statisticsBasisId: { // 返利数据统计返利依据主键
            type: "string"
          },
          saleOrgId: { // 销售组织
            type: "string"
          },
          saleOrgCode: {
            type: "string",
          },
          saleOrgName: {
            type: "string"
          },
          salePolicyId: { // 返利政策
            type: "string"
          },
          salePolicyCode: {
            type: "string",
          },
          salePolicyName: {
            type: "string"
          },
          customerId: { // 返利客户
            type: "string"
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          rebateBillId: { // 返利依据单主键
            type: "string"
          },
          rebateBillCode: { // 返利依据单号
            type: "string"
          },
          rebateBillRow: { // 返利依据单行号
            type: "string"
          },
          rebateBillRowId: { // 返利依据单行主键
            type: "string"
          },
          billCustomerId: { // 单据客户
            type: "string"
          },
          billCustomerCode: {
            type: "string"
          },
          billCustomerName: {
            type: "string"
          },
          goodsId: { // 商品
            type: "string"
          },
          goodsCode: {
            type: "string"
          },
          goodsName: {
            type: "string"
          },
          unitId: { // 计量单位
            type: "string"
          },
          unitCode: {
            type: "string"
          },
          unitName: {
            type: "string"
          },
          isSource: { // 数据来源: 0自制 1销售订单 2销售出库单
            type: "integer"
          },
          num: { // 数量
            type: "numberFloat"
          },
          money: { // 金额
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
      StatisticsValueMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.StatisticsValueDto"
        },
        meta: {
          id: {
            type: "string"
          },
          statisticsId: { // 返利统计明细主键
            type: "string"
          },
          saleOrgId: { // 销售组织
            type: "string"
          },
          saleOrgCode: {
            type: "string",
          },
          saleOrgName: {
            type: "string"
          },
          salePolicyId: { // 返利政策
            type: "string"
          },
          salePolicyCode: {
            type: "string",
          },
          salePolicyName: {
            type: "string"
          },
          customerId: { // 返利客户
            type: "string"
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          rebateValueType: { // 返利值类型
            type: "string"
          },
          rebateBillId: { // 返利依据单主键
            type: "string"
          },
          rebateBillCode: { // 返利依据单号
            type: "string"
          },
          rebateBillRow: { // 返利依据单行号
            type: "string"
          },
          rebateBillRowId: { // 返利依据单行主键
            type: "string"
          },
          valueId: { // 返利值id
            type: "string"
          },
          valueCode: {
            type: "string"
          },
          valueName: {
            type: "string"
          },
          includeSeccustomer: { // 是否包含子客户
            type: "stirng"
          },
          includeSubcustomer: { // 是否包含下级客户
            type: "stirng"
          },
          billCustomerId: { // 单据客户
            type: "string"
          },
          billCustomerCode: {
            type: "string"
          },
          billCustomerName: {
            type: "string"
          },
          goodsId: { // 商品
            type: "string"
          },
          goodsCode: {
            type: "string"
          },
          goodsName: {
            type: "string"
          },
          unitId: { // 计量单位
            type: "string"
          },
          unitCode: {
            type: "string"
          },
          unitName: {
            type: "string"
          },
          num: { // 数量
            type: "numberFloat"
          },
          mon: { // 金额
            type: "amountFloat"
          },
          totalNum: { // 金额
            type: "numberFloat"
          },
          totalMoney: {
            type: "amountFloat"
          },
          remark: {
            type: "string"
          },
          isSource: { // 数据来源: 0自制 1销售订单 2销售出库单
            type: "integer"
          },
          selfBillCode: { // 返利自制单据号
            type: "string"
          },
          operation: { // 操作列，仅供前端交互
            type: "string"
          }
        },
        pageSize: 10
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
        }
      ]
    },
    buttons: {
      button1: [{
        key: "add",
        label: "统计记录",
        iconCls: "icon-plus",
        click: "showStatisticsNotePanel",
      }],
      button2: [{
        key: "cancel",
        label: "返回",
        click: "backPanel",
        iconCls: "icon-tubiao-guanbi-anxing"
      }],
      button3: [{
        key: "cancel",
        label: "返回",
        click: "backStatisticsNotePanel",
        cls: "ui-btn-primary"
      }],
      button4: [{
        key: "cancel",
        label: "返回",
        click: "backPanel",
        cls: "ui-btn-primary"
      }, {
        key: "open",
        label: "打开",
        click: "openStatistics",
        cls: "ui-btn-primary"
      }, {
        key: "close",
        label: "关闭",
        click: "closeStatistics",
        cls: "ui-btn-primary"
      }]
    },
    details: {
      detail1: [{
          key: "saleOrgName",
          label: "销售组织"
        },
        {
          key: "salePolicyName",
          label: "返利政策"
        },
        {
          key: "startTime",
          label: "开始时间"
        },
        {
          key: "consumeTime",
          label: "统计耗时",
          computed: "timeTransComputed"
        },
        {
          key: "total",
          label: "统计客户数量"
        },
        {
          key: "success",
          label: "成功客户数量"
        },
        {
          key: "faile",
          label: "失败客户数量"
        },
        {
          key: "creator",
          label: "统计人"
        }
      ],
      detail2: [{
          key: "billCode",
          label: "单据号"
        },
        {
          key: "saleOrgName",
          label: "销售组织"
        },
        {
          key: "salePolicyName",
          label: "返利政策"
        },
        {
          key: "customerName",
          label: "返利客户"
        },
        {
          key: "cycleName",
          label: "返利周期"
        },
        {
          key: "startTime",
          label: "起始日期"
        },
        {
          key: "endTime",
          label: "结束日期"
        },
        {
          key: "rebateValueType",
          label: "返利值类型",
          computed: "rebateValueTypeComputed"
        },
        {
          key: "rebateValueMon",
          label: "返利值总额"
        },
        {
          key: "isAccount",
          label: "是否已结算",
          computed: "isAccountComputed"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_SalesTargetList_dom",
        umeta: {
          id: "grid_SalesTargetList",
          data: "SalesPolicyList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
          field: "name",
          dataType: "String",
          title: "返利政策"
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织",
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
          renderType: "policyOperation",
          fixed: true,
          width: "100"
        }]
      },
      grid2: {
        domid: "grid_StatisticsNoteDetailList_detail_dom",
        umeta: {
          id: "grid_StatisticsNoteDetailList_detail",
          data: "StatisticsNoteDetailList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "startTime",
            dataType: "Date",
            title: "统计开始时间"
          },
          {
            field: "salePolicyName",
            dataType: "String",
            title: "政策名称",
          },
          {
            field: "consumeTime",
            dataType: "Date",
            title: "统计耗时",
            // renderType: "timeTransRender"
          },
          {
            field: "total",
            dataType: "String",
            title: "统计客户数量"
          },
          {
            field: "success",
            dataType: "String",
            title: "成功客户数量"
          },
          {
            field: "faile",
            dataType: "String",
            title: "失败客户数量"
          },
          {
            field: "remark",
            dataType: "String",
            title: "备注",
            visible: false
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "noteOperation",
            fixed: true,
            width: "100"
          }
        ]
      },
      grid3: {
        domid: "grid_StatisticsList_detail_dom",
        umeta: {
          id: "grid_StatisticsList_detail",
          data: "StatisticsList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "customerName",
            dataType: "String",
            title: "客户名称"
          },
          {
            field: "billCode",
            dataType: "String",
            title: "单据号"
          },
          {
            field: "isSuccess",
            dataType: "String",
            title: "计算结果",
            renderType: "isSuccessRender"
          },
          {
            field: "isException",
            dataType: "String",
            title: "失败原因"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "statisticsOperation",
            fixed: true,
            width: "100"
          }
        ]
      },
      grid4: {
        domid: "grid_StatisticsList_edit_dom",
        umeta: {
          id: "grid_StatisticsList_edit",
          data: "StatisticsList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "billCode",
            dataType: "String",
            title: "单据号"
          },
          {
            field: "saleOrgName",
            dataType: "String",
            title: "销售组织"
          },
          {
            field: "salePolicyName",
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
            field: "rebateValueType",
            dataType: "String",
            title: "返利值类型",
            renderType: "rebateValueTypeRender"
          },
          {
            field: "rebateValueMon",
            dataType: "String",
            title: "返利值总额"
          },
          {
            field: "isAccount",
            dataType: "String",
            title: "是否已结算",
            renderType: "whetherRender"
          }
        ]
      },
      grid5: {
        domid: "grid_StatisticsBasisList_dom",
        umeta: {
          id: "grid_StatisticsBasisList",
          data: "StatisticsBasisList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "basisCode",
            dataType: "String",
            title: "依据编码"
          },
          {
            field: "basisName",
            dataType: "String",
            title: "依据名称"
          },
          {
            field: "rebateBasisType",
            dataType: "String",
            title: "返利依据类型",
            renderType: "rebateBasisTypeRender"
          },
          {
            field: "rebateBasisMon",
            dataType: "String",
            title: "返利依据总额",
            renderType: "rebateBasisMonRender"
          },
          {
            field: "rebateBasisGroRate",
            dataType: "String",
            title: "返利依据增长率",
            renderType: "rebateBasisGroRateRender"
          },
          {
            field: "isStandard",
            dataType: "Integer",
            title: "是否达标",
            renderType: "whetherRender"
          },
          {
            field: "includeSeccustomer",
            dataType: "String",
            title: "包含子客户",
            renderType: "whetherRender"
          },
          {
            field: "includeSubcustomer",
            dataType: "String",
            title: "包含下级客户",
            renderType: "whetherRender"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "statisBasisDetailOperation"
          }
        ]
      },
      grid6: {
        domid: "grid_StatisticsValueList_dom",
        umeta: {
          id: "grid_StatisticsValueList",
          data: "StatisticsValueList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "includeSeccustomer",
            dataType: "String",
            title: "包含子客户",
            renderType: "whetherRender"
          },
          {
            field: "includeSubcustomer",
            dataType: "String",
            title: "包含下级客户",
            renderType: "whetherRender"
          },
          // {
          //   field: "selfBillCode",
          //   dataType: "String",
          //   title: "返利单据"
          // },
          // {
          //   field: "rebateBillCode",
          //   dataType: "String",
          //   title: "返利自制名称"
          // },
          {
            field: "rebateBillCode",
            dataType: "String",
            title: "返利单据号"
          },
          {
            field: "isSource",
            dataType: "String",
            title: "来源",
            renderType: "isSourceRender"
          },
          {
            field: "rebateBillRow",
            dataType: "String",
            title: "返利单据行号"
          },
          {
            field: "billCustomerName",
            dataType: "String",
            title: "单据客户"
          },
          {
            field: "goodsName",
            dataType: "String",
            title: "商品"
          },
          {
            field: "unitName",
            dataType: "String",
            title: "计量单位"
          },
          {
            field: "num",
            dataType: "String",
            title: "数量"
          },
          {
            field: "mon",
            dataType: "String",
            title: "金额"
          },
          {
            field: "remark",
            dataType: "String",
            title: "备注"
          }
        ]
      },
      grid7: {
        domid: "grid_StatisticsBasisDetaiList_dom",
        umeta: {
          id: "grid_StatisticsBasisDetaiList",
          data: "StatisticsBasisDetaiList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [
          {
            field: "rebateBillCode",
            dataType: "String",
            title: "返利单据"
          },
          {
            field: "isSource",
            dataType: "String",
            title: "来源",
            renderType: "isSourceRender"
          },
          {
            field: "rebateBillRow",
            dataType: "String",
            title: "返利单据行号"
          },
          {
            field: "billCustomerName",
            dataType: "String",
            title: "单据客户"
          },
          {
            field: "goodsName",
            dataType: "String",
            title: "商品"
          },
          {
            field: "unitName",
            dataType: "String",
            title: "计量单位"
          },
          {
            field: "num",
            dataType: "String",
            title: "数量"
          },
          {
            field: "money",
            dataType: "String",
            title: "金额"
          },
          {
            field: "remark",
            dataType: "String",
            title: "备注"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});