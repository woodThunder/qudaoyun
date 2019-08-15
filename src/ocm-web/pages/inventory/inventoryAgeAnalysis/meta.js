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
            //商品分类
            goodsCategoryName: {type: 'string'},
            //规格
            specifications: {type: 'specifications'},
            //型号
            model: {type: 'model'},
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

            //分析范围
            analysisRange:{
              type:'integer',
              default:"0"
            },

            //预制库龄时段
            num1: {type: 'float'},
            num2: {type: 'float'},
            num3: {type: 'float'},
            num4: {type: 'float'},
            num5: {type: 'float'},
            num6: {type: 'float'},
            num7: {type: 'float'},
            num8: {type: 'float'},
            num9: {type: 'float'},
            num10: {type: 'float'},
            
            date1:{type: 'string'},
            date2:{type: 'string'},
            date3:{type: 'string'},
            date4:{type: 'string'},
            date5:{type: 'string'},
            date6:{type: 'string'},
            date7:{type: 'string'},
            date8:{type: 'string'},
            date9:{type: 'string'},
            date10:{type: 'string'},
          },
          pageSize: 10
        },
        analysisRange:{
          meta: {
            group:{type: 'string',default:"0"},
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
            key: "goods",
            label: "商品",
            refinfo: "goods",
          },
          {
            type: "combo",
            key: "analysisRange",
            label: "分析范围",
            dataSource:[
              {
                value:'0',
                name:'库存组织'
              },
              {
                value: '1',
                name: '仓库'
              }
            ],
            defaultvalue:"0"
          },
          {
            type: "refer",
            key: "org",
            label: "库存组织",
            refinfo: "organization_ocm",
          },
          {
            type: "refer",
            key: "warehouse",
            label: "仓库",
            refinfo: "warehouse",
            domid: "warehouse"
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
              field: "goodsCategoryName",
              dataType: "String",
              title: "商品分类",
            },

            {
              field: "goodsName",
              dataType: "String",
              title: "商品名称",
            },
            {
              field: "specifications",
              dataType: "String",
              title: "规格",
            },
            {
              field: "model",
              dataType: "String",
              title: "型号"
            },
            {
              field: "onhandnum",
              dataType: "String",
              title: "现存量",
            },
            {
              field: "num1",
              dataType: "Float",
              title: "0~10",
            },
            {
              field: "num2",  
              dataType: "Float",
              title: "10~60",
            },
            {
              field: "num3",
              dataType: "Float",
              title: "60~90",
            },
            {
              field: "num4",
              dataType: "Float",
              title: "90以上",
            },
            {
              field: "num5",
              dataType: "Float",
              title: "",
              visible:"false"
            },
            {
              field: "num6",
              dataType: "Float",
              title: "",
              visible:"false"
            },
            {
              field: "num7",
              dataType: "Float",
              title: "",
              visible:"false"
            },
            {
              field: "num8",
              dataType: "Float",
              title: "",
              visible:"false"
            },
            {
              field: "num9",
              dataType: "Float",
              title: "",
              visible:"false"
            },
            {
              field: "num10",
              dataType: "Float",
              title: "",
              visible:"false"
            },
          ]
        }
      }
    };
    return new basemodel(model);
  });