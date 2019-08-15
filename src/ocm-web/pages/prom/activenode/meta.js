define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      activeNodemeta: {
        meta: {
          id: { type: "string" }, //id
          code: { type: "string", required: true }, //编码
          name: { type: "string", required: true }, //名称
          creationTime: { type: "datetime", required: true }, //创建时间
          modifier: { type: "string", required: true }, //修改人
          modifiedTime: { type: "datetime", required: true }, //修改时间
          isEnable: { type: "integer", default: 0 } //启用状态
        },
        pageSize: 10
      }
    },
    buttons: {
      button1: [
        {
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "beforeEdit"
        },
        {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        },
        {
          key: "enable",
          label: "启用",
          iconCls: "icon-qiyong",
          click: "enable"
        },
        {
          key: "disable",
          label: "停用",
          iconCls: "icon-tingyong",
          click: "disable"
        }
      ]
    },
    searchs: {
      search1: [
        {
          type: "text",
          key: "code",
          label: "活动节点编码"
        },
        {
          type: "text",
          key: "name",
          label: "活动节点名称"
        },
        {
          type: "combo",
          key: "isEnable",
          label: "启用状态",
          defaultvalue: "",
          dataSource: [
            { value: "", name: "全部" },
            { value: "0", name: "未启用" },
            { value: "1", name: "已启用" },
            { value: "2", name: "已停用" }
          ]
        }
      ]
    },
    dialogs: {
      dialog1: [
        {
          type: "text",
          key: "code",
          label: "活动节点编码",
          disableInEdit: true
        },
        {
          type: "text",
          key: "name",
          label: "活动节点名称"
        },
        {
          type: "label",
          key: "isEnable",
          defaultvalue: "0",
          label: "启用状态"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "channelpost",
        umeta: {
          id: "grid_channelpost",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
          {
            field: "code",
            dataType: "String",
            title: "活动节点编码"
          },
          {
            field: "name",
            dataType: "String",
            title: "活动节点名称"
          },
            {
                field: "isEnable",
                dataType: "String",
                title: "状态",
                renderType: "enableRender"
            },
            {
                field: "creationTime",
                dataType: "datetime",
                title: "创建日期"
            },
          {
            field: "creator",
            dataType: "String",
            title: "创建人"
          },
            {
                field: "modifiedTime",
                dataType: "datetime",
                title: "修改日期"
            },
          {
            field: "modifier",
            dataType: "String",
            title: "修改人"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation4single",
            fixed: true,
            width: "110px"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});
