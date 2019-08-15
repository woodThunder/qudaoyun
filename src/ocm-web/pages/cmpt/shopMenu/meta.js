define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      ShopMenuMeta: {
        params: {
          cls: "com.yonyou.occ.cmpt.service.dto.ShopMenuDto"
        },
        meta: {
          id: { type: "string" }, //id
          parentId: { type: "string" }, //上级分类
          parentName: { type: "string" },
          parentCode: { type: "string" },
          code: { type: "string", required: true }, //编码
          name: { type: "string", required: true }, //名称
          menuPath: { type: "string" }, //路径
          // shopMenuIcon:{ type: "string"},//icon
          displayOrder: { type: "integer", required: true }, // 展示顺序
          isLeaf: { type: "integer", default: "0" }, // 是否末级
          remark: { type: "string" }, //备注
          isEnable: { type: "integer" } // 启用状态
        },
        pageSize: 10
        //是否启用前端缓存
        // pageCache: true，
      }
    },
    tree: {
      tree1: []
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
          key: "name",
          label: "菜单名称"
        },
        {
          type: "text",
          key: "code",
          label: "菜单编码"
        },
        {
          type: "refer",
          key: "parent--id",
          label: "分类",
          refinfo: "shopMenu",
          ifSeachTreeCode: true,
          referId: "shopMenuKey"
        },
        {
          type: "combo",
          key: "isEnable",
          label: "启用状态",
          dataSource: [
            { value: "", name: "全部" },
            { value: "0", name: "未启用" },
            { value: "1", name: "已启用" },
            { value: "2", name: "已停用" }
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
          label: "编码"
        },
        {
          type: "text",
          key: "name",
          label: "名称"
        },
        {
          type: "text",
          key: "menuPath",
          label: "菜单路径"
        },
        {
          type: "refer",
          key: "parentId",
          referId: "parentId",
          label: "上级分类",
          refinfo: "shopMenu",
          clientParam: {
            EQ_isLeaf: "0"
          }
        },
        {
          type: "text",
          key: "displayOrder",
          label: "展示顺序"
        },
        {
          type: "checkbox",
          key: "isLeaf",
          label: "是否末级",
          defaultvalue: 0,
          checkedValue: 1,
          unCheckedValue: 0
        },
        {
          type: "label",
          key: "isEnable",
          label: "启用状态",
          defaultvalue: "0"
        }
      ]
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
          showNumCol: true
        },
        columns: [
          {
            field: "code",
            dataType: "String",
            title: "菜单编码"
          },
          {
            field: "name",
            dataType: "String",
            title: "菜单名称"
          },
          {
            field: "menuPath",
            dataType: "String",
            title: "菜单路径"
          },
          {
            field: "parentName",
            dataType: "String",
            title: "上级分类"
          },
          {
            field: "displayOrder",
            dataType: "String",
            title: "展示顺序"
          },
          {
            field: "isEnable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableRender"
          },
          {
            field: "isLeaf",
            dataType: "String",
            title: "是否末级",
            renderType: "whetherRender"
          },
          {
            field: "creator",
            dataType: "String",
            title: "创建人",
            visible: false
          },
          {
            field: "modifier",
            dataType: "String",
            title: "修改人",
            visible: false
          },
          {
            field: "creationTime",
            dataType: "Date",
            title: "创建时间",
            visible: false
          },
          {
            field: "modifiedTime",
            dataType: "Date",
            title: "修改时间",
            visible: false
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
    },
    details: {
      detail1: [
        {
          key: "code",
          label: "编码"
        },
        {
          key: "name",
          label: "名称"
        },
        {
          key: "parentName",
          label: "上级分类"
        },
        {
          key: "menuPath",
          label: "菜单路径"
        },
        {
          key: "displayOrder",
          label: "展示顺序"
        },
        {
          key: "isLeaf",
          label: "是否末级",
          computed: "isLeafFmt"
        },
        {
          key: "isEnable",
          label: "启用状态",
          computed: "enableFmt"
        }
      ]
    }
  };
  return new basemodel(model);
});
