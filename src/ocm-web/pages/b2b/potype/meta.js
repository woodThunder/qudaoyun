define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      potypemeta : {
        meta: {
          id:{type: 'string'},//id
          code:{type: 'string',required:true},//编码
          name: {type: 'string',required:true},//名称
          isReturn: {type: 'integer',default:1},//是否退货
          isGoodsSupplement: {type: 'integer',default:1},//是否货补
          isEnable: {type: 'integer',default:1},//是否启用
          operation: {type: 'string'}
        },
        pageSize: 10,
      }
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
      search1: [{
        type: "text",
        key: "code",
        label: "订单类型编码"
      },
        {
          type: "text",
          key: "name",
          label: "订单类型名称",
        },
        {
          type: "radio",
          key: "isReturn",
          label: "是否退单",
          dataSource: [{
            value: CONST.DEFAULTOPTION,
            name: '全部'
          }, {
            value: '1',
            name: '是'
          }, {
            value: '0',
            name: '否'
          }]
        },
        {
          type: "radio",
          key: "isGoodsSupplement",
          label: "是否货补",
          dataSource: [{
            value: CONST.DEFAULTOPTION,
            name: '全部'
          }, {
            value: '1',
            name: '是'
          }, {
            value: '0',
            name: '否'
          }]
        },
        {
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
        }
      ]
    },
    dialogs: {
      dialog1: [{
        type: "text",
        key: "code",
        label: "订单类型编码",
        disableInEdit: true
      },
        {
          type: "text",
          key: "name",
          label: "订单类型名称",
        },
        {
          type: "checkbox",
          key: "isReturn",
          label: "是否退货",
          checkedValue:1,
          unCheckedValue:0,
          defaultvalue: 0
        },
        {
          type: "checkbox",
          key: "isGoodsSupplement",
          label: "是否货补",
          checkedValue:1,
          unCheckedValue:0,
          defaultvalue: 0
        },
        {
          type: "label",
          key: "isEnable",
          label: "启用状态",
          defaultvalue: 1
        }
      ]
    },
    grids: {
      grid1: {
        domid: "potype",
        umeta: {
          id: "grid_potype",
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
        },
          {
            field: "name",
            dataType: "String",
            title: "名称",
          },
          {
            field: "isReturn",
            dataType: "String",
            title: "是否退货",
            renderType: "whetherRender"
          },
          {
            field: "isGoodsSupplement",
            dataType: "String",
            title: "是否货补",
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
            field: "isEnable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableRender"
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