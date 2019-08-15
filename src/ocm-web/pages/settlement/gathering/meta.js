define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
      metas: {
        gatheringMeta: {
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
            }, //名称
            isEnable: {
              type: 'integer',
              default: 1
            }, //是否启用
            operation: {
              type: 'string'
            },
            codeRef : {
              type : 'string',
              "refmodel": JSON.stringify(refinfo['settlementGatheringType']),
              "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}',
             
            }
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
          },
          {
            key: "isEnable",
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
            label: "收款类型编码"
          },
          {
            type: "text",
            key: "name",
            label: "收款类型名称",
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
              value: '2',
              name: '停用'
            }]
          },
          // {
          //   type: "refer",
          //   key: "id",
          //   label: "测试参照",
          //   refinfo: "settlementGatheringType",
          //   clientParam :{
          //     "EQ_isEnable":"1"
          //   },
          //   refName : '收款类型',
          //   multi : false,
          // }
        ]
      },
      dialogs: {
        dialog1: [{
            type: "text",
            key: "code",
            label: "收款类型编码",
            disableInEdit: true
          },
          {
            type: "text",
            key: "name",
            label: "收款类型名称",
          },
          {
            type: "label",
            key: "isEnable",
            label: "启用状态",
            defaultvalue: 1
          }
        ]
      },
      details: {
        detail: [{
            key: "code",
            label: "收款类型编码",
          },
          {
            key: "name",
            label: "收款类型名称",
          },
          {
            key: "isEnable",
            label: "启用状态",
            computed:"enableFmt"
          }
        ]
      },
      grids: {
        grid1: {
          domid: "gatheringtype",
          umeta: {
            id: "grid_gatheringtype",
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
              renderType: "detailRender"
            },
            {
              field: "name",
              dataType: "String",
              title: "名称",
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