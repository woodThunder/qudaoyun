define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      settingsMeta: {
        meta: {
          id: {
            type: "string"
          }, //id
          code: {
            type: "string",
            required: true
          }, //编码
          name: {
            type: "string",
            required: true
          }, //名称
          isEnable: {
            type: "integer",
            default: "0"
          }, //是否启用
          diesAQuo: {
            //起算日
            type: "integer",
            default: 1
          },
          orderType: {
            type: "string"
          },
          calcType: {
            //计算方式
            type: "integer",
            default: 1
          },
          fixedAccountPeriodDays: {
            //固定账期天数
            type: "integer",
            min: 0
          },
          transfersDay: {
            //出账日
            type: "integer",
            min: 1,
            max: 31
          },
          fixedSettlementDay: {
            //固定结算日
            type: "integer",
            min: 1,
            max: 31
          },
          additionalMonth: {
            //附加月
            type: "integer",
            default: 0,
            min: 0
          },
          operation: {
            type: "string"
          },
          codeRef: {
            type: "string",
            refmodel: JSON.stringify(refinfo["settlementGatheringType"]),
            refcfg: '{"ctx":"/uitemplate_web","refName":"请选择"}'
          }
        },
        pageSize: 10,
        params: {
          dialogcardUseDynamicRequired: true
        }
      }
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "beforeEdit"
      }, {
        key: "del",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "delNew"
      }, {
        key: "isEnable",
        label: "启用",
        iconCls: "icon-qiyong",
        click: "enable"
      }, {
        key: "disable",
        label: "停用",
        iconCls: "icon-tingyong",
        click: "disable"
      }]
    },
    searchs: {
      search1: [{
          type: "text",
          key: "code",
          label: "账期编码"
        }, {
          type: "text",
          key: "name",
          label: "账期名称"
        }, {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          dataSource: [{
            value: CONST.DEFAULTOPTION,
            name: "全部"
          }, {
            value: "1",
            name: "启用"
          }, {
            value: "2",
            name: "停用"
          }],
          defaultvalue:CONST.DEFAULTOPTION,
        }
        //   {
        //     type: "refer",
        //     key: "id",
        //     label: "测试参照",
        //     refinfo: "settlementSettings",
        //     clientParam :{
        //       "EQ_isEnable":"1"
        //     },
        //     refName : '账期设置',
        //     multi : false,
        //   }
      ]
    },
    dialogs: {
      dialog1: [{
        type: "text",
        key: "code",
        label: "编码",
        disableInEdit: true,
        required: true
      }, {
        type: "text",
        key: "name",
        label: "名称",
        required: true
      }, {
        type: "combo",
        key: "diesAQuo",
        label: "起算日",
        onlySelect: true,
        required: true,
        dataSource: [{
          value: 1,
          name: "订单审批日"
        }, {
          value: 2,
          name: "出库签字日"
        }]
      }, {
        type: "combo",
        key: "calcType",
        label: "计算方式",
        onlySelect: true,
        required: true,
        dataSource: [{
          value: 1,
          name: "按天数"
        }, {
          value: 2,
          name: "按固定日"
        }],
        fn: {
          after: function(data) {
            debugger;
            if (data.newValue == 1) {
              data.row.setValue("transfersDay", "");
              data.row.setValue("fixedSettlementDay", "");
              data.row.setValue("additionalMonth", "");
            }
            if (data.newValue == 2) {
              data.row.setValue("fixedAccountPeriodDays", "");
            }
          }
        }
      }, {
        type: "intinput",
        key: "fixedAccountPeriodDays",
        label: "固定账期天数",
        required: true,
        fn: {
          before: function(row) {
            if (row.getValue("calcType") != 1) {
              return false;
            }
          },
          required: function(data) {
            if (data["calcType"] == 1) {
              return true;
            }
          }
        }
      }, {
        type: "intinput",
        key: "transfersDay",
        label: "出账日",
        required: true,
        fn: {
          before: function(row) {
            if (row.getValue("calcType") == 1) {
              return false;
            }
          },
          required: function(data) {
            if (data["calcType"] == 2) {
              return true;
            }
          }
        }
      }, {
        type: "intinput",
        key: "fixedSettlementDay",
        label: "固定结算日",
        required: true,
        fn: {
          before: function(row) {
            if (row.getValue("calcType") == 1) {
              return false;
            }
          },
          required: function(data) {
            if (data["calcType"] == 2) {
              return true;
            }
          }
        }
      }, {
        type: "intinput",
        key: "additionalMonth",
        label: "附加月",
        required: true,
        fn: {
          before: function(row) {
            if (row.getValue("calcType") == 1) {
              return false;
            }
          },
          required: function(data) {
            return false;
          }
        }
      }, {
        type: "label",
        key: "isEnable",
        label: "启用状态",
        defaultvalue: 0
      }]
    },
    details: {
      detail: [{
        type: "text",
        key: "code",
        label: "编码",
        disableInEdit: true
      }, {
        type: "text",
        key: "name",
        label: "名称"
      }, {
        type: "text",
        key: "diesAQuo",
        label: "起算日",
        computed: "startDateFmt"
      }, {
        type: "text",
        key: "calcType",
        label: "计算方式",
        computed: "calcTypeFmt"
      }, {
        type: "text",
        key: "fixedAccountPeriodDays",
        label: "固定账期天数"
      }, {
        type: "text",
        key: "transfersDay",
        label: "出账日"
      }, {
        type: "text",
        key: "fixedSettlementDay",
        label: "固定结算日"
      }, {
        type: "intinput",
        key: "additionalMonth",
        label: "附加月"
      }, {
        key: "isEnable",
        label: "启用状态",
        computed: "enableFmt"
      }]
    },
    grids: {
      grid1: {
        domid: "settings",
        umeta: {
          id: "grid_settings",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
          field: "code",
          dataType: "String",
          title: "编码",
          renderType: "detailRender"
        }, {
          field: "name",
          dataType: "String",
          title: "名称"
        }, {
          field: "diesAQuo",
          dataType: "String",
          title: "起算日",
          renderType: "diesAQuoSrc"
        }, {
          field: "calcType",
          dataType: "String",
          title: "计算方式",
          renderType: "calcTypeSrc"
        }, {
          field: "fixedAccountPeriodDays",
          dataType: "String",
          title: "固定账期天数"
        }, {
          field: "transfersDay",
          dataType: "String",
          title: "出账日"
        }, {
          field: "fixedSettlementDay",
          dataType: "String",
          title: "固定结算日"
        }, {
          field: "additionalMonth",
          dataType: "String",
          title: "附加月"
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
          field: "isEnable",
          dataType: "String",
          title: "启用状态",
          renderType: "enableRender"
        }, {
          field: "operation",
          dataType: "String",
          title: "操作",
          renderType: "operationSetting",
          fixed: true,
          width: "110px"
        }]
      }
    }
  };
  return new basemodel(model);
});