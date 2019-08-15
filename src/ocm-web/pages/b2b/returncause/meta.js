define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      return_causes : {
        meta: {
            id:{type: 'string'},//id
            code:{type: 'string'},
            name:{type: 'string'},
        },
        pageSize: 10,
      },
    },
    buttons: {
      button1: [{
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
        }
      ]
    },
    searchs: {
      search1: [
          {
              type: "text",
              key: "name",
              label: "退货原因名称"
          },
          {
              type: "text",
              key: "code",
              label: "退货原因编码"
          }
      ]
    },
      dialogs: {
          dialog1: [
              {
                  type: "text",
                  key: "code",
                  label: "退货原因编码"
              }
              ,{
                  type: "text",
                  key: "name",
                  label: "退货原因名称"
              }
          ]
      },
    grids: {
      grid1: {
        domid: "return_causes",
        umeta: {
          id: "grid_return_causes",
          data: "simpleList",
          type: "grid",
          multiSelect: true,
          showNumCol: true,
        },
        columns: [
          {
            field: "code",
            dataType: "String",
            title: "退货原因编码",
          },
          {
            field: "name",
            dataType: "String",
            title: "退货原因名称",
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
          },
        ]
      }
    }
  };
  return new basemodel(model);
});