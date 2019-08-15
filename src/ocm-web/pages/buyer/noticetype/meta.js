define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      Countrymeta: {
        params: {
          cls: "com.yonyou.ocm.buyer.service.dto.BulletinDto"
        },
        meta: {
          id: { type: "string" }, //id
          code: { type: "string", required: true }, //编码
          name: { type: "string", required: true }, //名称
          isEnable: { type: "integer", default: 1 }, //状态
          description: { type: "string" }, //说明
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" }
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true，
      }
    },
    //操作按钮组
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
    //查询条件组
    searchs: {
      search1: [
        {
          type: "text",
          key: "code",
          label: "分类编码"
        },
        {
          type: "text",
          key: "name",
          label: "分类名称"
        },
        {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          defaultvalue: "1",
          dataSource: [
            { value: "", name: "全部" },
            { value: "1", name: "启用" },
            { value: "0", name: "停用" }
          ]
        }
      ]
    },
    //弹窗组
    dialogs: {
      dialog1: [
        {
          type: "text",
          key: "code",
          label: "分类编码"
        },
        {
          type: "text",
          key: "name",
          label: "分类名称"
        },
        {
          type: "text",
          key: "description",
          label: "说明"
        },
        {
          type: "label",
          key: "isEnable",
          label: "启用状态"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid-noticetype-demo",
        umeta: {
          id: "grid_noticetype",
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
            title: "分类编码"
          },
          {
            field: "name",
            dataType: "String",
            title: "分类名称"
          },
          {
            field: "isEnable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableRender"
          },
          {
            field: "creator",
            dataType: "String",
            title: "创建人"
          },
          {
            field: "modifier",
            dataType: "String",
            title: "修改人"
          },
          {
            field: "creationTime",
            dataType: "Date",
            title: "创建时间"
          },
          {
            field: "modifiedTime",
            dataType: "Date",
            title: "修改时间"
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
