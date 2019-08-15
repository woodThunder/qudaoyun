define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      noticeMeta: {
        params: {
          cls: "com.yonyou.ocm.buyer.service.dto.NoticeDto"
        },
        meta: {
          id: { type: "string" }, //id
          title: { type: "string", required: true }, //公告标题
          noticeTypeId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["noticetype"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"公告分类" }',
            refparam: '{"EQ_isEnable":"1"}'
          }, //公告类型
          noticeTypeName: { type: "string" }, //公告类型名称
          noticeTypeCode: { type: "string" }, //公告类型编码
          effectiveRange: { type: "string", required: true }, //生效期间
          effectivedate: { type: "date", required: true }, //有效期从
          disabledate: { type: "date", required: true }, //有效期至
          custRange: { type: "integer", default: 1 }, //范围
          statusCode: { type: "integer", default: 1 }, // 状态
          content: { type: "string" }, //内容
          noticefile: { type: "string" }, //公告附件
          creator: { type: "string" }, //保存人
          creationTime: { type: "datetime" }, //保存时间
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" },
          publisher: { type: "string" }, //发布人
          pubdate: { type: "datetime", required: true }, //发布时间
          stopUser: { type: "string" }, //终止人
          stopDate: { type: "datetime" } //终止时间
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true
      },
      noticeCustRangeMeta: {
        params: {
          cls: "com.yonyou.ocm.buyer.service.dto.NoticeCustRangeDto"
        },
        meta: {
          id: { type: "string" }, //id
          //noticeId: { type: "string" },
          customerId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg:
              '{"ctx":"/uitemplate_web","refname":"客户","isReturnCode":"true"}',
            refparam: '{"EQ_isChannelCustomer":"1"}'
          }, //客户
          customerCode: { type: "string" },
          customerName: { type: "string" },
          //客户分类
          customerCategoryId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["customer_category"]),
            refcfg:
              '{"ctx":"/uitemplate_web", "refName":"客户分类"}'
          },
          customerCategoryCode: { type: "string" },
          customerCategoryName: { type: "string" },
          //渠道类型
          channelTypeId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["channeltype"]),
            refcfg:
              '{"ctx":"/uitemplate_web","refCode":"QY059","refName":"渠道类型"}'
          },
          channelTypeCode: { type: "string" },
          channelTypeName: { type: "string" },
          //销售组织
          organizationId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}'
          },
          organizationCode: { type: "string" },
          organizationName: { type: "string" },
          noContain: { type: "integer" } //不包含
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true
      }
    },
    searchs: {
      search1: [
        {
          type: "refer",
          key: "bulletin--id",
          label: "公告分类",
          refinfo: "noticetype"
        },
        {
          type: "combo",
          key: "pubdate",
          label: "发布时间",
            hasAll: true,
          dataSource: [
            {
              value: "1",
              name: "近一周"
            },
            {
              value: "2",
              name: "近一月"
            },
            {
              value: "3",
              name: "近一年"
            }
          ]
        },
        {
          type: "daterange",
          key: "effectivedate",
          label: "生效时间"
        },
        {
          type: "radio",
          key: "statusCode",
          label: "启用状态",
          multi: false,
          hasAll: true,
          dataSource: [
            {
              value: "1",
              name: "保存"
            },
            {
              value: "2",
              name: "发布"
            },
            {
              value: "3",
              name: "终止"
            },
            {
              value: "4",
              name: "失效"
            }
          ]
        }
      ]
    },
    buttons: {
      button1: [
        {
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddBillPanel",
          auth: true
        },
        {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del",
          auth: true
        }
      ],
      button2: [
        {
          key: "cancel",
          label: "取消",
          click: "cancelBill"
        },
        {
          key: "save",
          label: "保存",
          click: "saveBill",
          cls: "ui-btn-green"
        }
      ],
      button3: [
        {
          key: "addrow",
          label: "增行",
          iconCls: "icon-plus",
          click: "addItem"
        },
        {
          key: "delrow",
          label: "删行",
          iconCls: "icon-shanchu1",
          click: "delItems"
        }
      ],
      button4: [
        {
          key: "return",
          label: "返回",
          click: "retListPanel"
        }
      ]
    },
    cards: {
      card1: [
        {
          type: "text",
          key: "title",
          label: "标题",
          cls: "ui-w100-item"
        },
        {
          type: "refer",
          key: "noticeTypeId",
          referId: "noticeTypeId",
          label: "公告分类"
        },
        {
          type: "datetime",
          key: "pubdate",
          label: "发布时间"
        },
        {
          type: "daterange",
          key: "effectiveRange",
          label: "生效时间"
        },
        {
          type: "radio",
          key: "custRange",
          label: "范围",
          dataSource: "custRangeSource",
          cls: "ui-w100-item"
        }
      ]
    },
    details: {
      detail1: [
        {
          key: "title",
          label: "标题",
          cls: "ui-w100-item"
        },
        {
          key: "pubdate",
          label: "发布时间"
        },
        {
          key: "effectivedate",
          label: "生效时间"
        },
        {
          key: "disabledate",
          label: "失效时间"
        },
        {
          key: "custRange",
          label: "范围",
          computed: "custRangeFmt",
          cls: "ui-w100-item"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_noticeList_dom",
        umeta: {
          id: "grid_noticeList",
          data: "NoticeList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
          {
            field: "noticeTypeName",
            dataType: "String",
            title: "公告分类"
          },
          {
            field: "title",
            dataType: "String",
            title: "公告标题",
            renderType: "detailRender"
          },
          {
            field: "statusCode",
            dataType: "String",
            title: "状态",
            renderType: "statusCodeRender"
          },
          {
            field: "pubdate",
            dataType: "String",
            title: "发布时间"
          },
          {
            field: "effectivedate",
            dataType: "String",
            title: "生效时间"
          },
          {
            field: "disabledate",
            dataType: "String",
            title: "失效时间"
          },
          {
            field: "stopDate",
            dataType: "String",
            title: "终止时间"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation",
            fixed: true,
            width: "110px"
          }
        ]
      },
      grid2: {
        domid: "grid_noticeCustRangeList_dom",
        umeta: {
          id: "grid_noticeCustRangeList",
          data: "noticeCustRangeList",
          type: "grid",
          editable: true,
          multiSelect: false,
          showNumCol: true,
          onBeforeEditFun: "ifCanEidtHandle"
        },
        columns: [
          {
            field: "customerCategoryId",
            dataType: "String",
            title: "客户分类",
            width: "200px",
            icon: "J-customerCategoryId",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "customerCategoryName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "customerCategoryId",
                refcode: "customerCategoryCode",
                refname: "customerCategoryName"
              }
            }
          },
          {
            field: "customerId",
            dataType: "String",
            title: "客户",
            width: "200px",
            //"editable": false,
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "customerName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "customerId",
                refcode: "customerCode",
                refname: "customerName"
              }
            }
          },
          {
            field: "channelTypeId",
            dataType: "String",
            title: "渠道类型",
            width: "200px",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "channelTypeName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "channelTypeId",
                refcode: "channelTypeCode",
                refname: "channelTypeName"
              }
            }
          },
          {
            field: "organizationId",
            dataType: "String",
            title: "销售组织",
            width: "200px",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "organizationName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "organizationId",
                refcode: "organizationCode",
                refname: "organizationName"
              }
            }
          },
          {
            field: "noContain",
            dataType: "Integer",
            renderType: "booleanRender",
            title: "不包含"
          }
        ]
      },
      grid3: {
        domid: "grid_noticeCustRangeList_detail_dom",
        umeta: {
          id: "grid_noticeCustRangeList_detail",
          data: "noticeCustRangeList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [
          {
            field: "customerCategoryName",
            dataType: "String",
            width: "200px",
            title: "客户分类"
          },
          {
            field: "customerName",
            dataType: "String",
            width: "200px",
            title: "客户"
          },
          {
            field: "channelTypeName",
            dataType: "String",
            width: "200px",
            title: "渠道类型"
          },
          {
            field: "organizationName",
            dataType: "String",
            width: "200px",
            title: "销售组织"
          },
          {
            field: "noContain",
            dataType: "Integer",
            renderType: "booleanRender",
            title: "不包含"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});
