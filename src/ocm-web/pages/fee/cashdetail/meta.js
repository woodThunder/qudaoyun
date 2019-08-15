define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      cashdetails : {
          params: {
              cls: "com.yonyou.occ.fee.service.dto.CustomerCastFlushItemDto"
          },
        meta: {
            customerCastBillCode:{type: 'string'},
            customerCastBillDate:{type: 'date'},
            financeOrgId:{type: 'string'},
            financeOrgCode:{type: 'string'},
            financeOrgName:{type: 'string'},
            saleOrgId:{type: 'string'},
            saleOrgCode:{type: 'string'},
            saleOrgName:{type: 'string'},
            customerId:{type: 'string'},
            customerCode:{type: 'string'},
            customerName:{type: 'string'},
            customerCastTypeId:{type: 'string'},
            customerCastTypeCode:{type: 'string'},
            customerCastTypeName:{type: 'string'},
            currencyId:{type: 'string'},
            currencyCode:{type: 'string'},
            currencyName:{type: 'string'},
            customerCastRemark:{type: 'string'},
            customerCastBillStatusId:{type: 'string'},
            customerCastBillStatusCode:{type: 'string'},
            customerCastBillStatusName:{type: 'string'},
            castAmount:{type: 'float'},
            actualFlushAmount:{type: 'float'},
            actualGoodssupplementAmount:{type: 'float'},
            castBalance:{type: 'float'},
            customerCastOrderCode:{type: 'string'},
            flushAmount:{type: 'float'},
            flushDate:{type: 'date'},
            flusherName:{type: 'string'},
            flushRemark:{type: 'string'}
        },
        pageSize: 10,
      }
    },
    buttons: {
      button1: [{
          key: "export",
          label: "导出",
          iconCls: "icon-export",
          click: "exportHandle"
      },
      ]
    },
    searchs: {
      search1: [{
          type: "refer",
          key: "financeOrg",
          keyfordisplay: "financeOrgName",
          label: "财务组织",
          refinfo: "organization_ocm",
          multi:true,
          clientParam: {"EQ_isEnable":"1","EQ_orgFuncRel":"07"}
      },
          {
              type: "refer",
              key: "customer",
              keyfordisplay: "customerName",
              label: "客户",
              refinfo: "customer",
              clientParam: {"EQ_isEnable":"1"},
              multi:true
          },
          {
              type: "combo",
              key: "summaryDimension",
              label: "汇总维度",
              url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=SUMMARY_DIMENSION',
              namefield: "name",
              valuefield: "code"
          },
          {
              type: "combo",
              key: "customerCastBillStatus",
              keyfordisplay: "customerCastBillStatusCode",
              label: "费用单状态",
              url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=CUST_CAST_STATUS',
              namefield: "name",
              multi:true,
              valuefield: "code"
          },
          {
              type: "refer",
              key: "customerCastType",
              keyfordisplay: "customerCastTypeName",
              label: "费用类型",
              refinfo: "trantype",
              clientParam: {"EQ_isEnable":"1","EQ_billTypeId":"CastType"},
              multi:true
          },
          {
              type: "daterange",
              key: "customerCastBillDate",
              label: "费用单日期"
          },
          {
              type: "type",
              key: "customerCastBillCode",
              label: "费用单号",
              opr: "LIKE"
          },
          {
              type: "refer",
              key: "saleOrg",
              keyfordisplay: "saleOrgName",
              label: "销售组织",
              refinfo: "organization_ocm",
              multi:true,
              clientParam: {"EQ_orgFuncRel":"01"}
          }
      ]
    },
    dialogs: {
      dialog1: [
      ]
    },
    grids: {
      grid1: {
        domid: "cashdetails",
        umeta: {
          id: "grid_cashdetails",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [
          {
            field: "customerCastBillCode",
            dataType: "String",
            title: "客户费用单号",
          },
          {
            field: "customerCastBillDate",
            dataType: "Date",
            title: "费用单日期",
          },
            {
                field: "financeOrgName",
                dataType: "String",
                title: "财务组织",
            },
            {
                field: "saleOrgName",
                dataType: "String",
                title: "销售组织",
            },
            {
                field: "customerName",
                dataType: "String",
                title: "客户",
            },
            {
                field: "customerCastTypeName",
                dataType: "String",
                title: "费用单类型",
            },
            {
                field: "currencyName",
                dataType: "String",
                title: "币种",
            },
            {
                field: "customerCastRemark",
                dataType: "String",
                title: "费用单备注",
            },
            {
                field: "customerCastBillStatusName",
                dataType: "String",
                title: "费用单状态",
            },
            {
                field: "castAmount",
                dataType: "Float",
                title: "费用金额",
            },
            {
                field: "actualFlushAmount",
                dataType: "Float",
                title: "订单冲抵金额",
            },
            {
                field: "actualGoodssupplementAmount",
                dataType: "Float",
                title: "货补金额",
            },
            {
                field: "castBalance",
                dataType: "Float",
                title: "费用余额",
            },
            {
                field: "customerCastOrderCode",
                dataType: "String",
                title: "客户订单号",
            },
            {
                field: "flushAmount",
                dataType: "Float",
                title: "冲抵金额",
            },
            {
                field: "flushDate",
                dataType: "Date",
                title: "冲抵日期",
            },
            {
                field: "flusherName",
                dataType: "String",
                title: "冲抵人",
            },
            {
                field: "flushRemark",
                dataType: "String",
                title: "冲抵备注",
            },

          /*{
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation4single",
            fixed: true,
            width: "110px"
          },*/
        ]
      }
    }
  };
  return new basemodel(model);
});