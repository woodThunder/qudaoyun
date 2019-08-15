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
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
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

          /*--------------730新增-------------*/

          //母件商品
          parentGoodsName:{type: 'string'},

          //批号
          batchCodeId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          },
          batchCodeCode:{
            type: 'string',
          },
          batchCodeName:{
            type: 'string',
          },
          //项目
          projectId:{
            type:'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          },
          projectCode: {
            type: 'string',
          },
          projectName: {
            type: 'string',
          },
          //供应商
          supplierId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          },
          supplierName: {
            type: 'string',
          },
          supplierCode: {
            type: 'string',
          },
          //库存状态
          stockStateId:{
            type:'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['inventorystate']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          },
          stockStateCode: {
            type: 'string',
          },
          stockStateName: {
            type: 'string',
          },
          //客户
          goodsOwnerId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          },
          goodsOwnerCode: {
            type: 'string'
          },
          goodsOwnerName: {
            type: 'string'
          },
            goodsSelection : {
                type: 'string'
            },
          goodsSelectionValue:{
            type: 'string'
          }
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
        {
          type: "refer",
          key: "position",
          label: "货位",
          refinfo: "goodsposition"
        },
        {
          type: "refer",
          key: "batchNum",
          label: "批次号",
          refinfo: "batchNumber"
        },
        {
          type: "refer",
          key: "batchCode",
          label: "批号",
          refinfo: "batchCode"
        },
        {
          type: "refer",
          key: "supplier",
          label: "供应商",
          refinfo: "suppliers"
        },
        {
          type: "refer",
          key: "goodsOwner",
          label: "客户",
          refinfo: "customers"
        },
        {
          type: "refer",
          key: "project",
          label: "项目",
          refinfo: "project"
        },
        {
          type: "refer",
          key: "stockState",
          label: "库存状态",
          refinfo: "inventorystate"
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
          },
          {
            field: "positionName",
            dataType: "String",
            title: "货位",
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
            title: "所属母件商品",
          },
          {
            field: "unitName",
            dataType: "String",
            title: "单位",
          },
          {
            field: "batchNumCode",
            dataType: "String",
            title: "批次号",
          },
          {
            field: "onhandnum",
            dataType: "String",
            title: "现存量",
          },
          {
            field: "frozennum",
            dataType: "String",
            title: "冻结量",
          },
          {
            field: "batchCodeCode",
            dataType: "String",
            title: "批号",
          },
          {
            field: "supplierName",
            dataType: "String",
            title: "供应商",
          },
          {
            field: "goodsOwnerName",
            dataType: "String",
            title: "客户",
          },
          {
            field: "projectName",
            dataType: "String",
            title: "项目",
          },
          {
            field: "stockStateName",
            dataType: "String",
            title: "库存状态",
          },
          {
            field: "goodsSelection",
            dataType: "String",
            renderType: "goodsOptDetails",
            title: "选配信息",
          },
        ]
      }
    }
  };
  return new basemodel(model);
});