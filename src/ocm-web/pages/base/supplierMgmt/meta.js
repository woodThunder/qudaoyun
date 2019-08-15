define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      suppliermeta : {
        meta: {
          id:{type: 'string'},//id
          code:{type: 'string',required:true},//编码
          name: {type: 'string',required:true},//名称
          abName: {type: 'string',required:true},//简称
          isEnable: {type: 'string',required:true},//状态
          type: {type: 'string',required:true},//供应商类型
          remark: {type: 'string'},//备注
        },
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
          label: "名称",
        },
        {
          type: "text",
          key: "abName",
          label: "简称",
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
        },
        {
          type:"combo",
          key:"type",
          label:"供应商类型",
          url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY100",
          namefield:"name",
          valuefield:"code",
          onlySelect: true,
        },
      ]
    },
    dialogs: {
      dialog1: [{
        type: "text",
        key: "code",
        label: "编码",
      },
        {
          type: "text",
          key: "name",
          label: "名称",
        },
        {
          type: "text",
          key: "abName",
          label: "简称",
        },
        {
          type:"combo",
          key:"type",
          label:"供应商类型",
          url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY100",
          namefield:"name",
          valuefield:"code",
          onlySelect: true,
        },
        {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          dataSource: [
            { value: '1', name: '启用' },
            { value: '0', name: '停用' }
          ]
        },
        {
          type: "textarea",
          key: "remark",
          label: "备注",
          cls:"ui-textarea-item"
        },
      ]
    },
    grids: {
      grid1: {
        domid: "archivesmgmt",
        umeta: {
          id: "grid_archivesmgmt",
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
            field: "abName",
            dataType: "String",
            title: "简称",
          },
          {
            field: "type",
            dataType: "String",
            title: "供应商类型",
            renderType:"typeRender"
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
            title: "状态",
            renderType: "enableRender"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation",
            fixed: true,
            width: "110px"
          },
        ]
      }
    }
  };
  return new basemodel(model);
});