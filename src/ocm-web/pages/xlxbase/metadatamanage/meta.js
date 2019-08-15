define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      //业务实体元数据
      BusiEntityMeta: {
        meta: {
          "id": {type: 'string'},
          "code": {type: 'string'},//编码
          "name": {type: 'string'},//名称
          "busiobject": {type: 'string'},//所属业务对象
          "busiobjectName": {type: 'string'},//所属业务对象
          "className": {type: 'string'},
          "tableName": {type: 'string'},//表名
          "relKey": {type: 'string'},//父业务实体关联键
          "isEnable": {type: 'string'},//是否可用
          "isMain":  {type: 'string'},  //是否主表 0:否, 1:是
          "parentCode":  {type: 'string'},  //上级业务实体
          "entityType":  {type: 'string'},//0:标准实体，1：容器实体
        }
      },
      //业务实体元数据-字段子表
      BusiEntityFieldMeta: {
        meta: {
          "id": {type: 'string'},
          "busientity": {type: 'string'},
          "key": {type: 'string'},
          "tableFieldName": {type: 'string'},
          "isEssential": {type: 'string'},  //是否保留字段，1: 模板中可不删除 0 不限制
          "isInvalid": {type: 'string'},
          "enable": {type: 'string'},
          "label": {type: 'string'},
          "type": {type: 'string'},
          "required": {type: 'string'},
          "visible": {type: 'string'},
          "multi": {type: 'string'},
          "refkey": {
            type: 'string',
            refmodel: JSON.stringify(refinfo['tplfieldrefer']),
            refcfg: '{"ctx": "/uitemplate_web"}'
          },
          "refid": {
            type: 'string',
            refmodel: JSON.stringify(refinfo['CustDoc']),
            refcfg: '{"ctx": "/uitemplate_web", "isReturnCode": true}',
            refrel: {"refcode": "refcode", "refname": "refname"},
          },
          "refcode": {type: 'string'},
          "refname": {type: 'string'},
          "enumkey": {type: 'string'},
          "busiTip": {type: 'string'},
          "style": {type: 'string'},
          "needWaterMark": {type: 'string'},
          "maxLength": {type: 'string'},
          "dataSource": {type: 'string'},
          "isExtend": {type: 'string'},
        }
      },
      DefaultTplMeta: {
        meta: {
          "busiObject": {type: 'string'},
          "templateType": {type: 'string'},
        }
      },
      TemplateTypeMeta: {
        meta: {
          name: {type: 'string'},
          value: {type: 'string'},
        }
      }
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增页签",
        iconCls: "icon-add",
        click: "addTab"
      },
        {
          key: "enable",
          label: "生成初始模板",
          iconCls: "icon-copy",
          click: "showDefaultTplDialog"
        },
        {
          key: "disable",
          label: "修改",
          iconCls: "icon-edit",
          click: "showEditPanel"
        },
        {
          key: "del",
          label: "修改页签",
          iconCls: "icon-del",
          click: "updateTab"
        },
        {
          key: "del",
          label: "删除页签",
          iconCls: "icon-del",
          click: "delTab"
        },
      ]
    },
    searchs: {
      search1: [
        {
          type: "combo",
          key: "busiobject",
          label: "业务对象",
        },
        {
          type: "text",
          key: "code",
          label: "业务实体编码"
        },
        {
          type: "text",
          key: "name",
          label: "业务实体名称",
        },
        {
          type: "text",
          key: "className",
          label: "类名",
        },
        {
          type: "text",
          key: "tableName",
          label: "表名",
        },
      ]
    },
    dialogs: {
    },
    details: {
      detail: [{
          key: "code",
          label: "业务类型编码",
        },
        {
          key: "name",
          label: "业务类型名称",
        },
        {
          key: "busiobjectName",
          label: "业务对象",
        },
      ]
    },
    grids: {
      grid1: {
        domid: "busiEntity",
        umeta: {
          id: "grid_busiEntity",
          data: "BusiEntityParent",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
          onRowSelected: "handleListRowSelect",
          onRowUnSelected: "handleListRowSelect",
          afterCreate: "fixHeight"
        },
        columns: [
          {
            field: "busiobjectName",
            dataType: "String",
            title: "业务对象",
            width: "150px",
          },
          {
            field: "code",
            dataType: "String",
            title: "业务实体编码",
            renderType: "detailRender",
            width: "200px",
          },
          {
            field: "name",
            dataType: "String",
            title: "业务实体名称",
            width: "200px",
          },
          {
            field: "className",
            dataType: "String",
            title: "类名",
            width: "400px",
          },
          {
            field: "tableName",
            dataType: "String",
            title: "表名",
          },
        ]
      },
      grid2: {
        domid: "busiEntityFieldDetail",
        umeta: {
          id: "grid_busiEntityFieldDetail",
          data: "BusiEntityFieldChild",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: true,
        },
        columns: [{
            field: "label",
            dataType: "String",
            title: "字段名称",
          },
          {
            field: "key",
            dataType: "String",
            title: "字段键值",
          },
          {
            field: "isEssential",
            dataType: "String",
            title: "是否保留字段(模板中不可删)",
            renderType: "disableBooleanRender",
          },
          // {
          //   field: "isInvalid",
          //   dataType: "String",
          //   title: "是否作废",
          //   renderType: "disableBooleanRender",
          // },
          {
            field: "enable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableStatusRender",
          },
          {
            field: "required",
            dataType: "String",
            title: "是否必填",
            renderType: "disableBooleanRender",
          },
          {
            field: "type",
            dataType: "String",
            title: "类型",
            renderType: "itemTypeRender",
          },
          {
            field: "refkey",
            dataType: "String",
            title: "参照标识",
          },
          {
            field: "refcode",
            dataType: "String",
            title: "自定义档案参照编码",
          },
          {
            field: "refname",
            dataType: "String",
            title: "自定义档案参照名称",
          },
          {
            field: "enumkey",
            dataType: "String",
            title: "枚举标识",
          },
        ]
      },
      grid3: {
        domid: "busiEntityFieldEdit",
        umeta: {
          id: "grid_busiEntityFieldEdit",
          data: "BusiEntityFieldChild",
          type: "grid",
          editable: true,
          multiSelect: false,
          showNumCol: true,
        },
        columns: [{
            field: "label",
            dataType: "String",
            title: "字段名称",
            editable: false,
            width: "120px",
          },
          {
            field: "key",
            dataType: "String",
            title: "字段键值",
            editable: false,
            width: "120px",
          },
          {
            field: "isEssential",
            dataType: "String",
            title: "是否保留字段(模板中不可删)",
            renderType: "booleanRender",
            width: "180px",
          },
          // {
          //   field: "isInvalid",
          //   dataType: "String",
          //   title: "是否作废",
          //   renderType: "booleanRender",
          //   width: "80px",
          // },
          {
            field: "enable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableStatusRender",
            editable: false,
            width: "80px",
          },
          {
            field: "required",
            dataType: "String",
            title: "是否必填",
            renderType: "booleanRender",
            width: "80px",
          },
          {
            field: "type",
            dataType: "String",
            title: "类型",
            editType: 'combo',
            // renderType: "comboRender",
            editOptions: {
              id: "type",
              type: "combo",
              datasource: CONST.TEMPLATEITEMTYPE,
            },
            namefield: "name",
            width: "120px",
          },
          {
            field: "refkey",
            dataType: "String",
            title: "参照标识",
            // renderType: "referRender",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "editOptions": {
              "validType": "string"
            },
            width: "120px",
          },
          {
            field: "refid",
            dataType: "String",
            title: "自定义档案参照编码",
            // renderType: "referRender",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "editOptions": {
              "validType": "string"
            },
            width: "140px",
          },
          {
            field: "refname",
            dataType: "String",
            title: "自定义档案参照名称",
            width: "140px",
          },
          {
            field: "enumkey",
            dataType: "String",
            title: "枚举标识",
            editType: 'combo',
            // renderType: "comboRender",
            editOptions: {
              id: "enumkey",
              type: "combo",
              datasource: enuminfo['allenum'],
            },
            width: "120px",
          },
        ]
      },
    }
  };
  return new basemodel(model);
});
