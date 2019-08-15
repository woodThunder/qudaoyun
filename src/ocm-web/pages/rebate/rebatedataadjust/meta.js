define(["ocm_basemodel"], function (basemodel) {
  var model = {
    metas: {
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
          fileId: { // 用于附件上传
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
            type: "amountFloat"
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
          includeSeccustomer: { // 是否包含子客户
            type: "stirng"
          },
          includeSubcustomer: { // 是否包含下级客户
            type: "stirng"
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
            type: "amountFloat"
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
            type: "float"
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
          isSource: { // 数据来源: 0自制 1销售订单 2销售出库单
            type: "integer"
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
          key: "customer",
          label: "客户",
          refinfo: "customer",
          refName: "客户",
          clientParam: {
            EQ_isEnable: "1",
            EQ_isChannelCustomer: "1"
          }
        },
        {
          type: "refer",
          key: "salePolicy--id",
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
        key: "cancel",
        label: "返回",
        click: "backPanel",
        cls: "ui-btn-primary"
      }],
      button3: [{
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
      button4: [{
        key: "cancel",
        label: "返回",
        click: "backPanel",
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
          type: "text",
          key: "billCode",
          label: "单据号",
          enable: false
        },
        {
          type: "text",
          key: "saleOrgName",
          label: "销售组织",
          enable: false
        },
        {
          type: "text",
          key: "salePolicyName",
          label: "返利政策",
          enable: false
        },
        {
          type: "text",
          key: "customerName",
          label: "返利客户",
          enable: false
        },
        {
          type: "text",
          key: "cycleName",
          label: "返利周期",
          enable: false
        },
        {
          type: "date",
          key: "startTime",
          label: "起始日期",
          enable: false
        },
        {
          type: "date",
          key: "endTime",
          label: "结束日期",
          enable: false
        },
        {
          type: "combo",
          key: "rebateValueType",
          label: "返利值类型",
          dataSource: "rebateValueTypeSource",
          enable: false
        },
        {
          type: "text",
          key: "rebateValueMon",
          label: "返利值总额"
        },
        {
          type: "combo",
          key: "isAccount",
          label: "是否已结算",
          dataSource: "whetherSrc",
          enable: false
        }
      ]
    },
    details: {
      detail1: [{
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
      ],
      detail2: [
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
          key: "includeSeccustomer",
          label: "包含子客户",
          computed: "includeSeccustomerComputed"
        },
        {
          key: "includeSubcustomer",
          label: "包含下级客户",
          computed: "includeSubcustomerComputed"
        },
        {
          key: "rebateBasisType",
          label: "返利依据类型",
          computed: "rebateBasisTypeComputed"
        },
        {
          key: "rebateBasisMon",
          label: "返利依据总额",
        },
        {
          key: "rebateBasisGroRate",
          label: "返利依据增长率"
        },
        {
          key: "isAccount",
          label: "是否已结算",
          computed: "isBasisAccountComputed"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_StatisticsList_dom",
        umeta: {
          id: "grid_StatisticsList",
          data: "StatisticsList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "billCode",
            dataType: "String",
            title: "单据号",
            renderType: "detailRender",
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
          },
          {
            field: "state",
            dataType: "String",
            title: "审批状态",
            renderType: "isStateGrid"
          },
          {
            field: "operation",
            title: "操作",
            renderType: "operation",
            fixed: true,
            width: "100"
          }
        ]
      },
      grid2: {
        domid: "grid_StatisticsList2_dom",
        umeta: {
          id: "grid_StatisticsList2",
          data: "StatisticsList2",
          type: "grid",
          editable: false,
          multiSelect: false,
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
          },
          {
            field: "operation",
            title: "操作",
            renderType: "operation2",
            fixed: true,
            width: "100"
          }
        ]
      },
      grid3: {
        domid: "grid_StatisticsBasisList_dom",
        umeta: {
          id: "grid_StatisticsBasisList",
          data: "StatisticsBasisList",
          type: "grid",
          editable: true,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "basisCode",
            dataType: "String",
            title: "依据编码",
            editable: false
          },
          {
            field: "basisName",
            dataType: "String",
            title: "依据名称",
            editable: false
          },
          {
            field: "rebateBasisType",
            dataType: "String",
            title: "返利依据类型",
            renderType: "rebateBasisTypeRender",
            editable: false
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
            field: "totalNum",
            dataType: "String",
            title: "数量合计",
            visible: false,
            editable: false
          },
          {
            field: "totalMoney",
            dataType: "String",
            title: "金额合计",
            visible: false,
            editable: false
          },
          {
            field: "lastTotalNum",
            dataType: "String",
            title: "去年同期数量合计",
            visible: false,
            editable: false
          },
          {
            field: "totalNumRate",
            dataType: "String",
            title: "同比数量增长率",
            visible: false,
            editable: false
          },
          {
            field: "lastTotalMoney",
            dataType: "String",
            title: "去年同期金额合计",
            visible: false,
            editable: false
          },
          {
            field: "totalMoneyRate",
            dataType: "String",
            title: "同比金额增长率",
            visible: false,
            editable: false
          },
          {
            field: "outPlanSale",
            dataType: "Date",
            title: "金额超目标额",
            visible: false,
            editable: false
          },
          {
            field: "outPlanSaleRate",
            dataType: "Date",
            title: "金额超目标率",
            visible: false,
            editable: false
          },
          {
            field: "isStandard",
            dataType: "Integer",
            title: "是否达标",
            renderType: "booleanRender"
          },
          {
            field: "includeSeccustomer",
            dataType: "String",
            title: "包含子客户",
            renderType: "whetherRender",
            editable: false
          },
          {
            field: "includeSubcustomer",
            dataType: "String",
            title: "包含下级客户",
            renderType: "whetherRender",
            editable: false
          },
          {
            field: "remark",
            dataType: "String",
            title: "备注"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "basisOperation",
            width: "100px"
          }
        ]
      },
      grid4: {
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
      grid5: {
        domid: "grid_StatisticsBasisList_detail_dom",
        umeta: {
          id: "grid_StatisticsBasisList_detail",
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
            field: "totalNum",
            dataType: "String",
            title: "数量合计",
            visible: false
          },
          {
            field: "totalMoney",
            dataType: "String",
            title: "金额合计",
            visible: false
          },
          {
            field: "lastTotalNum",
            dataType: "String",
            title: "去年同期数量合计",
            visible: false
          },
          {
            field: "totalNumRate",
            dataType: "String",
            title: "同比数量增长率",
            visible: false
          },
          {
            field: "lastTotalMoney",
            dataType: "String",
            title: "去年同期金额合计",
            visible: false
          },
          {
            field: "totalMoneyRate",
            dataType: "String",
            title: "同比金额增长率",
            visible: false
          },
          {
            field: "outPlanSale",
            dataType: "Date",
            title: "金额超目标额",
            visible: false
          },
          {
            field: "outPlanSaleRate",
            dataType: "Date",
            title: "金额超目标率",
            visible: false
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
            field: "remark",
            dataType: "String",
            title: "备注"
          }
        ]
      },
      grid6: {
        domid: "grid_StatisticsValueList_detail_dom",
        umeta: {
          id: "grid_StatisticsValueList_detail",
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
      grid8: {
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
      },
      grid9: {
        domid: "grid_StatisticsBasisTotalList_dom",
        umeta: {
          id: "grid_StatisticsBasisTotalList",
          data: "StatisticsBasisTotalList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [
          {
            field: "totalNum",
            dataType: "String",
            title: "数量合计"
          },
          {
            field: "totalMoney",
            dataType: "String",
            title: "金额合计"
          },
          {
            field: "totalNumRate",
            dataType: "String",
            title: "同比数量增长率"
          },
          {
            field: "totalMoneyRate",
            dataType: "String",
            title: "同比金额增长率"
          },
          {
            field: "outPlanSaleRate",
            dataType: "String",
            title: "金额超目标率"
          },
          {
            field: "isStandard",
            dataType: "String",
            title: "是否达标",
            renderType: "whetherRender"
          }
        ]
      },
      grid10: {
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