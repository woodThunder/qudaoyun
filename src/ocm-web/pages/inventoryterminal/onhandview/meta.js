define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      simplemeta: {
        meta: {
          // 库存组织
          orgId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          },
          orgCode:{type: 'string', required: true},
          orgName:{type: 'string', required: true},

          // 仓库
          warehouseId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['channel-warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          warehouseCode: {type: 'string'},
          warehouseName: {type: 'string'},

          // //批次号
          // batchNumId:{
          //   type: 'string',
          //   'refmodel': JSON.stringify(refinfo['batchNumber']),
          //   "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',},
          // batchNumCode:{type:'string'},
          // batchNumName:{type:'string'},
          //
          // //货位
          // positionId:{
          //   type: 'string',
          //   'refmodel': JSON.stringify(refinfo['goodsposition']),
          //   "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          // },
          // positionCode:{type:'string'},
          // positionName:{type:'string'},
          //批号
          // batchCode: {type: 'string', required: true},

          //项目
          // project: {type: 'string', required: true},

          //库存状态
          inventoryState: {type: 'string', required: true},

          //货权
          goodsOwner: {type: 'string', required: true},

          //商品
          goodsId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isEnable":"1"}'},
          goodsCode: {type: 'string'},
          goodsName: {type: 'string'},

          //基本单位
          unitId: {type: 'string'},
          unitCode: {type: 'string'},
          unitName: {type: 'string'},

          //首次入库时间
          firstInTime:{type:'date'},

          //现存量
          onhandnum:{type:'float'},

          //冻结量
          frozennum:{type:'float'},

          //预计可用量
          willAvailablenum:{type:'float'},

          //可用量
          availablenum:{type:'float'},

          //预计入
          estimateinnum:{type:'float'},

          //预计出
          estimateoutnum:{type:'float'},
        },
        pageSize: 10
      },
      groupQuery:{
        meta: {
          group:{type: 'string',default:"1"},
        }
      }
    },
    buttons: {
      button1: [
        {
          key: "export",
          label: "导出",
          iconCls: "icon-export",
          click: "exportHandle"
        },
      ]
    },
    searchs: {
      search1: [
        {
          type: "refer",
          key: "warehouse",
          label: "仓库",
          refinfo: "channel-warehouse",
          domid:"warehouse"
        },
        {
          type: "refer",
          key: "goods",
          label: "库存商品",
          refinfo: "goods"
        },
        // {
        //   type: "refer",
        //   key: "position",
        //   label: "货位",
        //   refinfo: "goodsposition"
        // },
        // {
        //   type: "refer",
        //   key: "batchNum",
        //   label: "批次号",
        //   refinfo: "batchNumber"
        // },
      ]
    },
    dialogs: {
      dialog1: [
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
          showNumCol: true,
        },
        columns: [
          {
            field: "warehouseName",
            dataType: "String",
            title: "仓库",
          },
         /* {
            field: "positionName",
            dataType: "String",
            title: "货位",
          },*/
          {
            field: "goodsCategoryName",
            dataType: "String",
            title: "商品分类",
          },
          {
            field: "goodsCode",
            dataType: "String",
            title: "商品编码",
          },
          {
            field: "goodsName",
            dataType: "String",
            title: "商品名称",
          },
          {
            field: "unitName",
            dataType: "String",
            title: "单位",
          },
          /*{
            field: "batchNumName",
            dataType: "String",
            title: "批次号",
          },*/
          {
            field: "onhandnum",
            dataType: "String",
            title: "现存量",
          },
         /* {
            field: "frozennum",
            dataType: "String",
            title: "冻结量",
          },*/
          // {
          //   field: "firstInTime",
          //   dataType: "Date",
          //   title: "首次入库时间",
          // },
          // {
          //   field: "estimateinnum",
          //   dataType: "String",
          //   title: "预计入",
          // },
          // {
          //   field: "estimateoutnum",
          //   dataType: "String",
          //   title: "预计出",
          // },
          // {
          //   field: "creator",
          //   dataType: "String",
          //   title: "创建人",
          //   visible: false
          // },
          // {
          //   field: "modifier",
          //   dataType: "String",
          //   title: "修改人",
          //   visible: false
          // },
          // {
          //   field: "creationTime",
          //   dataType: "Date",
          //   title: "创建时间",
          //   visible: false
          // },
          // {
          //   field: "modifiedTime",
          //   dataType: "Date",
          //   title: "修改时间",
          //   visible: false
          // },
          // {
          //   field: "isEnable",
          //   dataType: "String",
          //   title: "启用状态",
          //   renderType: "enableRender"
          // },
        ]
      }
    }
  };
  return new basemodel(model);
});