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
            'refmodel': JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          warehouseCode: {type: 'string'},
          warehouseName: {type: 'string'},

          //批次号
          batchNumId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',},
          batchNumCode:{type:'string'},
          batchNumName:{type:'string'},

          //货位
          positionId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsposition']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          },
          positionCode:{type:'string'},
          positionName:{type:'string'},
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

          //预计可用量
          willAvailablenum:{type:'float'},

          //可用量
          availablenum:{type:'float'},

          //预计入
          estimateinnum:{type:'float'},

          //预计出
          estimateoutnum:{type:'float'},

          //所属母件
          parentGoodsId:{type:'string'},
          parentGoodsCode:{type:'string'},
          parentGoodsName:{type:'string'},

          //版本
          version:{type:'float'},
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
        // {
        //   type: "date",
        //   key: "billDate",
        //   label: "计划发货日期"
        // },
        {
          type: "refer",
          key: "org",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam : {"EQ_orgFuncRel":"03","EQ_isEnable":"1"}
        },
        {
          type: "refer",
          key: "warehouse",
          label: "仓库",
          refinfo: "warehouse",
          domid:"warehouse"
        },
        {
          type: "refer",
          key: "goods",
          label: "库存商品",
          refinfo: "goods"
        },
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
        columns: [{
          field: "orgName",
          dataType: "String",
          title: "库存组织",
          },
          {
            field: "warehouseName",
            dataType: "String",
            title: "仓库",
            visible: false
          },
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
            field: "parentGoodsName",
            dataType: "String",
            title: "所属母件",
          },
          {
            field: "version",
            dataType: "String",
            title: "版本",
          },

          {
            field: "unitName",
            dataType: "String",
            title: "单位",
          },
          {
            field: "willAvailablenum",
            dataType: "String",
            title: "预计可用量",
          },
          {
            field: "availablenum",
            dataType: "String",
            title: "可用量",
          },
          {
            field: "onhandnum",
            dataType: "String",
            title: "现存量",
          },
          {
            field: "estimateinnum",
            dataType: "String",
            title: "预计入",
          },
          {
            field: "estimateoutnum",
            dataType: "String",
            title: "预计出",
          },

        ]
      }
    }
  };
  return new basemodel(model);
});