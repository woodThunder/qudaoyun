define(["ocm_basemodel"], function (basemodel) {
  var model = {
    metas: {
      RebateDataMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.RebateDataDto"
        },
        meta: {
          //基本信息开始
          id: {
            type: "string"
          },
          billCode: {
            type: "string",
            required: true
          },
          billName: {
            type: "string",
            required: true
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
          salePolicyId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["rebatePolicy"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"返利政策" }',
            refparam: '{"EQ_state":"3"}'
          },
          salePolicyCode: {
            type: "string",
          },
          salePolicyName: {
            type: "string"
          },
          cycleId: {
            type: "string",
            required: true
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
          remark: {
            type: 'string'
          },
          rebateValueType: { // 返利值类型
            type: 'string'
          },
          isAccount: {
            type: 'integer'
          },
          fileId: {
            type: "string"
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
      DataBasisMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.DataBasisDto"
        },
        meta: {
          id: {
            type: "string"
          },
          mainId: { // 返利数据自制主表id
            type: "string"
          },
          customerId: { // 返利客户
            type: "string",
            required: true,
            // refmodel: JSON.stringify(refinfo["customer_sale"]), 需求变更，参照客户档案，不经交易关系过滤
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          basisId: { // 返利依据
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["rebateBasis"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"返利依据" }'
          },
          basisCode: {
            type: "string"
          },
          basisName: {
            type: "string"
          },
          rebateBasisType: { // 返利依据类型
            type: "string"
          },
          goodsId: { // 商品
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo['goods-no-version']),
            refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          goodsCode: {
            type: "string"
          },
          goodsName: {
            type: 'string'
          },
          unitId: {
            type: "string",
            required: true
          },
          unitCode: {
            type: "string"
          },
          unitName: {
            type: "string"
          },
          num: {
            type: "amountFloat"
          },
          mon: { // 金额
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
      DataValueMeta: {
        params: {
          "cls": "com.yonyou.occ.rebate.service.dto.DataValueDto"
        },
        meta: {
          id: {
            type: "string"
          },
          mainId: { // 返利数据自制主表id
            type: "string"
          },
          customerId: { // 返利客户
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"客户" }',
            refparam: '{"EQ_isEnable":"1"}'
          },
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          finanOrgId: {
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"财务组织" }',
            refparam: '{"EQ_orgFuncRel":"07","EQ_isEnable":"1"}'
          },
          finanOrgCode: {
            type: 'string'
          },
          finanOrgName: {
            type: 'string'
          },
          policyValueId: { // 返利值
            type: "string",
            required: true,
          },
          rebateValueType: { // 返利值类型
            type: "string"
          },
          goodsId: { // 商品
            type: "string",
            required: true,
            refmodel: JSON.stringify(refinfo['goods-no-version']),
            refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            refparam: '{"EQ_isEnable":"1"}'
          },
          goodsCode: {
            type: "string"
          },
          goodsName: {
            type: 'string'
          },
          unitId: {
            type: "string",
            required: true
          },
          unitCode: {
            type: "string"
          },
          unitName: {
            type: "string"
          },
          num: {
            type: "amountFloat"
          },
          mon: { // 金额
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
          type: "text",
          key: "billCode",
          label: "编码"
        },
        {
          type: "text",
          key: "billCode",
          label: "名称"
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
          clickArg: "DataBasisList",
          iconCls: "icon-plus"
        },
        {
          key: "delrow",
          label: "删行",
          click: "delChild",
          clickArg: "DataBasisList",
          iconCls: "icon-shanchu1"
        }
      ],
      button4: [{
        key: "addrow",
        label: "增行",
        click: "addRow",
        clickArg: "DataValueList",
        cls: "ui-btn-orange",
        iconCls: "icon-plus"
      }, {
        key: "delrow",
        label: "删行",
        click: "delChild",
        clickArg: "DataValueList",
        iconCls: "icon-shanchu1"
      }],
      button5: [{
        key: "cancel",
        label: "返回",
        click: "backPanel",
        cls: "ui-btn-primary"
      }],
      button6: [{
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
      button7: [{
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
          label: "编码"
        },
        {
          type: "text",
          key: "billName",
          label: "名称"
        },
        {
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
          type: "refer",
          key: "salePolicyId",
          label: "返利政策",
          refName: "返利政策",
          referId: "salePolicyReferId",
          domid: "salePolicyDomId",
          disableFilter: true
        },
        {
          type: "text",
          key: "cycleName",
          label: "周期",
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
        }
      ]
    },
    details: {
      detail1: [{
          key: "billCode",
          label: "编码"
        },
        {
          key: "billName",
          label: "名称"
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
          key: "cycleName",
          label: "周期"
        },
        {
          key: "startTime",
          label: "开始日期"
        },
        {
          key: "endTime",
          label: "结束日期"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_RebateDataList_dom",
        umeta: {
          id: "grid_RebateDataList",
          data: "RebateDataList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [, {
          field: "billCode",
          dataType: "String",
          title: "编码",
          renderType: "detailRender"
        }, {
          field: "billName",
          dataType: "String",
          title: "名称",
        }, {
          field: "saleOrgName",
          dataType: "String",
          title: "销售组织",
        }, {
          field: "salePolicyName",
          dataType: "String",
          title: "返利政策",
        }, {
          field: "cycleName",
          dataType: "String",
          title: "周期",
        }, {
          field: "state",
          dataType: "String",
          title: "状态",
          renderType: "isStateGrid"
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
          renderType: "operation",
          fixed: true,
          width: "100"
        }]
      },
      grid2: {
        domid: "grid_DataBasisList_dom",
        umeta: {
          id: "grid_DataBasisList",
          data: "DataBasisList",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "customerId",
            dataType: "String",
            title: "返利客户",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "customerName",
            required: true,
            editOptions: {
              validType: "string",
              rel: {
                refpk: "customerId",
                refname: "customerName"
              }
            }
          },
          {
            field: "basisId",
            title: "返利依据",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "basisName",
            required: true,
            editOptions: {
              validType: "string",
              rel: {
                refpk: "basisId",
                refname: "basisName"
              }
            }
          },
          {
            field: "rebateBasisType",
            dataType: "String",
            title: "返利依据类型",
            renderType: "rebateBasisTypeRender",
            editable: false
          },
          {
            field: "goodsId",
            title: "商品",
            referId: "basisGoodsIdRefer",
            domid: "basisGoodsIdDom",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "goodsName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "goodsId",
                refname: "goodsName"
              }
            }
          },
          {
            field: "unitName",
            dataType: "String",
            title: "计量单位",
            editable: false
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
      grid3: {
        domid: "grid_DataValueList_dom",
        umeta: {
          id: "grid_DataValueList",
          data: "DataValueList",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
            field: "customerId",
            dataType: "String",
            title: "返利客户",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "customerName",
            required: true,
            editOptions: {
              validType: "string",
              rel: {
                refpk: "customerId",
                refname: "customerName"
              }
            }
          },
          {
            field: "finanOrgId",
            dataType: "String",
            title: "财务组织",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "finanOrgName",
            required: true,
            editOptions: {
              validType: "string",
              rel: {
                refpk: "finanOrgId",
                refname: "finanOrgName"
              }
            }
          },
          {
            field: "rebateValueType",
            dataType: "String",
            title: "返利值类型",
            renderType: "rebateValueTypeRender",
            editable: false
          },
          {
            field: "goodsId",
            title: "商品",
            renderType: "ncReferRender",
            editType: "ncReferEditType",
            showField: "goodsName",
            editOptions: {
              validType: "string",
              rel: {
                refpk: "goodsId",
                refname: "goodsName"
              }
            }
          },
          {
            field: "unitName",
            dataType: "String",
            title: "计量单位",
            editable: false
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
      grid4: {
        domid: "grid_DataBasisList_detail_dom",
        umeta: {
          id: "grid_DataBasisList_detail",
          data: "DataBasisList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "customerName",
            dataType: "String",
            title: "返利客户"
          },
          {
            field: "basisName",
            dataType: "String",
            title: "返利依据",
          },
          {
            field: "rebateBasisType",
            dataType: "String",
            title: "返利依据类型",
            renderType: "rebateBasisTypeRender"
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
        domid: "grid_DataValueList_detail_dom",
        umeta: {
          id: "grid_DataValueList_detail",
          data: "DataValueList",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true
        },
        columns: [{
            field: "customerName",
            dataType: "String",
            title: "返利客户"
          },
          {
            field: "finanOrgName",
            dataType: "String",
            title: "财务组织"
          },
          {
            field: "rebateValueType",
            dataType: "String",
            title: "返利值类型",
            renderType: "rebateValueTypeRender"
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
      grid6: {
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
      grid7: {
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