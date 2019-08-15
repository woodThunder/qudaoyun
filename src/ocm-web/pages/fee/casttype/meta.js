define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      casttype : {
        meta: {
          id:{type: 'string'},//id
          code:{type: 'string',required:true},//编码
          name:{type: 'string',required:true},//名称
          paymentMethodId:{type: 'string',required:true},//兑付方式
          paymentMethodCode:{type: 'string',required:true},//兑付方式
          paymentMethodName:{type: 'string',required:true},//兑付方式
          flushing:{type: 'integer',default:1},//冲抵
          isEnable: {type: 'integer',default:1},//是否启用
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
          label: "编码"
      },
          {
              type: "text",
              key: "name",
              label: "名称"
          },
          {
              type: "combo",
              key: "paymentMethod",
              keyfordisplay: "paymentMethodCode",
              label: "兑付方式",
              url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY130',
              namefield: "name",
              valuefield: "code",
              clientParam: {"EQ_isEnable":"1"}
          },
          {
              type: "radio",
              key: "flushing",
              label: "冲抵",
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
          label: "编码"
      },
          {
              type: "text",
              key: "name",
              label: "名称"
          },
          {
              type: "combo",
              key: "paymentMethodCode",
              keyfordisplay: "paymentMethodCode",
              label: "兑付方式",
              url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY130',
              namefield: "name",
              valuefield: "code",
              clientParam: {"EQ_isEnable":"1"}
          },
          {
              type: "checkbox",
              key: "flushing",
              label: "冲抵",
              checkedValue:1,
              unCheckedValue:0,
              defaultvalue: 0
          },
        {
          type: "label",
          key: "isEnable",
          label: "启用状态",
          defaultvalue:1
        }
      ]
    },
    grids: {
      grid1: {
        domid: "casttype",
        umeta: {
          id: "grid_casttype",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [
          {
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
            field: "paymentMethodName",
            dataType: "String",
            title: "兑付方式",
          },
          {
            field: "flushing",
            dataType: "String",
            title: "冲抵",
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