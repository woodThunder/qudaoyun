define(["ocm_basemodel"], function(basemodel) {
  'use strict';
  var model = {
    metas: {
      listmeta: {
        meta: {
          id: {
            type: 'string'
          }, //id
          code: {
            type: 'string',
            required: true
          }, //编码
          name: {
            type: 'string',
            required: true
          }, //编码
          type: {
            type: 'string',
            required: true
          }, //预警类型
          isEnable: {
            type: 'integer',
          }, //是否启用
          time: {
            type: 'integer',
          }, //预警时间
          day: {
            type: 'integer',
            min: 0,
          },
          hour: {
            type: 'integer',
            min: 0,
          },
          minute: {
            type: 'integer',
            min: 0,
          },
          second: {
            type: 'integer',
            min: 0,
          },
          platformId: {
            type: "string",
            required: true,
          },
          platformName: {
            type: 'string',
          },
          storeId: {
            type: 'string',
          },
          storeName: {
            type: 'string',
          },
        },
        pageSize: 10
      }
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "beforeEdit",
      }, {
        key: "del",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "del",
        auth: true,
      }, {
        key: "enable",
        label: "启用",
        iconCls: "icon-qiyong",
        click: "enable",
        auth: true,
      }, {
        key: "disable",
        label: "停用",
        iconCls: "icon-tingyong",
        click: "disable",
        auth: true,
      }]
    },
    searchs: {
      search1: [{
        type: "text",
        key: "code",
        label: "编码"
      }, {
        type: "text",
        key: "name",
        label: "名称",
      }, {
        type: "refer",
        key: "platform--id",
        label: "平台名称",
        refinfo: "b2cplatform",
        refName: "所属平台"
      }, {
        type: "refer",
        key: "store--id",
        label: "店铺名称",
        refinfo: "b2cStoreRef",
        refName: "所属平台"
      }, {
        type: "combo",
        key: "type",
        label: "预警类型",
        onlySelect: true,
        dataSource: [{
          value: "1",
          name: '审核预警'
        }, {
          value: "2",
          name: '发货预警'
        }, ],
      }, {
        type: "radio",
        key: "isEnable",
        label: "启用状态",
        dataSource: [{
          value: CONST.DEFAULTOPTION,
          name: '全部'
        }, {
          value: '1',
          name: '启用'
        }, {
          value: '0',
          name: '停用'
        }]
      }]
    },
    dialogs: {
      dialog1: [{
        type: "text",
        key: "code",
        label: "编码",
        required: true,
        disableInEdit: true
      }, {
        type: "text",
        key: "name",
        required: true,
        label: "名称",
      }, {
        type: "combo",
        key: "type",
        required: true,
        label: "预警类型",
        onlySelect: true,
        required: true,
        dataSource: [{
          value: "1",
          name: '审核预警'
        }, {
          value: "2",
          name: '发货预警'
        }, ],
      }, {
        type: "label",
        key: "time",
        required: true,
        label: "预警时间",
      }, {
        type: "intinput",
        key: "day",
        label: "天",
      }, {
        type: "intinput",
        key: "hour",
        label: "时",
      }, {
        type: "intinput",
        key: "minute",
        label: "分",
      }, {
        type: "intinput",
        key: "second",
        label: "秒",
      }, {
        type: "refer",
        key: "platformId",
        required: true,
        label: "平台名称",
        refinfo: "b2cplatform",
        disableFilter: true,
        refName: "所属平台",
        // keyfordisplay: "platformName",
        // clientParam: {"EQ_isEnable":"1","EQ_orgFuncRel":"01"}
      }, {
        type: "refer",
        key: "storeId",
        label: "店铺名称",
        refinfo: "b2cStoreRef",
        refName: "店铺名称",
        disableFilter: true
      }, {
        type: "label",
        key: "isEnable",
        label: "启用状态",
        defaultvalue: 1
      }, ]
    },
    grids: {
      grid1: {
        domid: "simple1",
        umeta: {
          id: "grid_simple1",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          field: "code",
          dataType: "String",
          title: "编码",
        }, {
          field: "name",
          dataType: "String",
          title: "名称",
        }, {
          field: "type",
          dataType: "String",
          title: "预警类型",
          renderType: "warnType"
        }, {
          field: "time",
          dataType: "String",
          title: "预警时间",
        }, {
          field: "platformName",
          dataType: "Date",
          title: "平台名称",
        }, {
          field: "storeName",
          dataType: "Date",
          title: "店铺名称",
        }, {
          field: "isEnable",
          dataType: "String",
          title: "启用状态",
          renderType: "enableRender"
        }, {
          field: "operation",
          dataType: "String",
          title: "操作",
          renderType: "operation4single",
          fixed: true,
          width: "110px"
        }, ]
      }
    }
  };
  return new basemodel(model);
});