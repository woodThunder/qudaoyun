define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      complex: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.complexDto"
        },
        meta: {
          id: {
            type: 'string',
          },
          // 库存组织
          stockOrgId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          },
          stockOrgCode: {
            type: 'string',
            required: true,
          },
          stockOrgName: {
            type: 'string',
            required: true,
          },
          //入库单号
          stockInCode: {
            type: 'string',
            required: true,
          },
          //单据类型
          billType: {
            type: 'string',
            required: true,
            default: "OtherIn"
          },
          //入库仓库
          stockInStorageId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          stockInStorageCode: {
            type: 'string'
          },
          stockInStorageName: {
            type: 'string'
          },
          ifSlotManage: {
            type: 'string'
          },

          //其他入库类型（交易类型）
          tranTypeId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['trantype']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
            'refparam': '{"EQ_billTypeId":"OtherIn"}'
          },
          tranTypeCode: {
            type: 'string'
          },
          tranTypeName: {
            type: 'string'
          },

          //库管员
          storageAdminId: {
            type: 'string',
            // required:true,
            'refmodel': JSON.stringify(refinfo['person']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          storageAdminCode: {
            type: 'string'
          },
          storageAdminName: {
            type: 'string'
          },

          //业务员
          bizPersonId: {
            type: 'string',
            // required:true,
            'refmodel': JSON.stringify(refinfo['person']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"业务员"}',
          },
          bizPersonCode: {
            type: 'string'
          },
          bizPersonName: {
            type: 'string'
          },

          //部门
          deptId: {
            type: 'string',
            // required:true,
            'refmodel': JSON.stringify(refinfo['department']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"业务部门"}',
          },
          deptCode: {
            type: 'string'
          },
          deptName: {
            type: 'string'
          },

          //总实入数量
          totalFactInNum: {
            type: 'numberFloat',
            precision: 2
          },

          //备注
          remark: {
            type: 'string'
          },

          //状态
          statusId: {
            type: 'string'
          },
          statusCode: {
            type: 'string'
          },
          statusName: {
            type: 'string'
          },

          //是否自制单据
          isOwner: {
            type: 'string'
          },

          //入库日期
          stockInDate: {
            type: 'string'
          },
          //入库人
          stockInPerson: {
            type: 'string'
          },
          //签字日期
          signDate: {
            type: 'string'
          },
          //签字人
          signPerson: {
            type: 'string'
          },
          //单据日期
          billDate: {
            type: 'date'
          },
          //币种
          currencyId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['currency']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"refName":"请选择"}',
            "refparam": '{}'
          }, //币种
          currencyCode: {
            type: 'string',
            required: true
          },
          currencyName: {
            type: 'string',
            required: true
          },
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        meta: {
          id: {
            type: 'string'
          },
          dr: {
            type: 'integer'
          }, //dr
          // 行号
          rowNum: {
            type: 'string'
          },
          // 库存商品Id
          goodsId: {
            type: 'string',
            required: true
          },
          goodsCode: {
            type: 'string',
            required: true
          },
          goodsName: {
            type: 'string',
            required: true
          },
          isOptional: {
            type: "Integer"
          },
          enableBatchNumberManage: {
            type: 'string'
          },
          enableBatchNoManage: {
            type: 'string'
          },
          enableInvStatusManage: {
            type: 'string'
          },
          productId: {
            type: 'string'
          },
          productLineId: {
            type: 'string'
          },
          // 应入数量
          shouldInNum: {
            type: 'numberFloat'
          },
          // 单价
          unitPrice: {
            type: 'priceFloat'
          },
          // 金额p
          amountMoney: {
            type: 'amountFloat'
          },
          //（实入）数量
          factInNum: {
            type: 'numberFloat'
          },
          // 备注
          remark: {
            type: 'string'
          },
          // 入库日期
          stockInDate: {
            type: 'date'
          },
          // 入库人
          stockInPerson: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          //TODO  批次号没有  货位没有
          // 来源单据号
          srcBillCode: {
            type: 'string'
          },
          // 来源单据行号
          srcBillBcode: {
            type: 'string'
          },
          // 来源单据类型
          srcBillType: {
            type: 'string'
          },
          // 批次号
          batchNumId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
          batchNumCode: {
            type: 'string'
          },
          batchNumName: {
            type: 'string'
          },
          // 货位
          goodsPositionId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsposition']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          },
          goodsPositionCode: {
            type: 'string'
          },
          goodsPositionName: {
            type: 'string'
          },
          // 单位
          unitId: {
            type: 'string'
          },
          unitCode: {
            type: 'string'
          },
          unitName: {
            type: 'string'
          },
          goodsVersion: {
            type: 'string',
            required: true
          }, //商品版本号
          batchCodeId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          }, //批号
          batchCodeCode: {
            type: 'string',
          },
          batchCodeName: {
            type: 'string',
          },
          supplierId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //供应商
          supplierName: {
            type: 'string',
            /*required: true*/
          }, //供应商Name
          supplierCode: {
            type: 'string',
            /*required: true*/
          }, //供应商Code
          projectId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //项目
          projectCode: {
            type: 'string',
          }, //项目Name
          projectName: {
            type: 'string',
          }, //项目Code
          stockStateId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['inventorystate']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //库存状态
          stockStateCode: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          stockStateName: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          customerId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //客户
          customerCode: {
            type: 'string'
          }, //客户编码
          customerName: {
            type: 'string'
          }, //客户名称
          originalGoodsId: {
            type: 'string',
          }, //原始版本商品
          goodsSelection: {
            type: 'string',
            required: true
          }, //商品选配项
          goodsSelectionDescription: {
            type: 'string',
          }, //商品选项描述
        },
        pageSize: 10,
      },
      BomItem: {
        meta: {
          id: {
            type: 'string'
          },
          dr: {
            type: 'integer'
          },
          // 行号
          rowNum: {
            type: 'string'
          },
          // 库存商品Id
          goodsId: {
            type: 'string',
            required: true
          },
          goodsCode: {
            type: 'string',
            required: true
          },
          goodsName: {
            type: 'string',
            required: true
          },
          enableBatchNumberManage: {
            type: 'string'
          },
          enableBatchNoManage: {
            type: 'string'
          },
          enableInvStatusManage: {
            type: 'string'
          },
          productId: {
            type: 'string'
          },
          productLineId: {
            type: 'string'
          },
          // 应入数量
          shouldInNum: {
            type: 'numberFloat'
          },
          // 单价
          unitPrice: {
            type: 'priceFloat'
          },
          // 金额p
          amountMoney: {
            type: 'amountFloat'
          },
          //（实入）数量
          factInNum: {
            type: 'numberFloat'
          },
          // 备注
          remark: {
            type: 'string'
          },
          // 入库日期
          stockInDate: {
            type: 'date'
          },
          // 入库人
          stockInPerson: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          //TODO  批次号没有  货位没有
          // 来源单据号
          srcBillCode: {
            type: 'string'
          },
          // 来源单据行号
          srcBillBcode: {
            type: 'string'
          },
          // 来源单据类型
          srcBillType: {
            type: 'string'
          },
          // 批次号
          batchNumId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
          batchNumCode: {
            type: 'string'
          },
          batchNumName: {
            type: 'string'
          },
          // 货位
          goodsPositionId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsposition']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          },
          goodsPositionCode: {
            type: 'string'
          },
          goodsPositionName: {
            type: 'string'
          },
          // 单位
          unitId: {
            type: 'string'
          },
          unitCode: {
            type: 'string'
          },
          unitName: {
            type: 'string'
          },

          //------- 630后 新加bom包件字段 -------
          goodsVersion: {
            type: 'string',
            required: true
          }, //商品版本号
          goodsSelection: {
            type: 'string',
            required: true
          }, //商品选配项
          batchCodeId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          }, //批号
          batchCodeCode: {
            type: 'string',
          },
          batchCodeName: {
            type: 'string',
          },
          supplierId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //供应商
          supplierName: {
            type: 'string',
            /*required: true*/
          }, //供应商Name
          supplierCode: {
            type: 'string',
            /*required: true*/
          }, //供应商Code
          projectId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //项目
          projectCode: {
            type: 'string',
          }, //项目Name
          projectName: {
            type: 'string',
          }, //项目Code
          stockStateId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['inventorystate']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //库存状态
          stockStateCode: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          stockStateName: {
            type: 'string',
            /*required: true*/
          }, //库存状态
          customerId: {
            type: 'string',
            /*required: true,*/
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //客户
          customerCode: {
            type: 'string'
          }, //客户编码
          customerName: {
            type: 'string'
          }, //客户名称
          goodsNum: {
            type: 'string',
            required: true
          }, //数量
          parentGoodsId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}',
            required: true
          }, //商品
          parentGoodsCode: {
            type: 'string',
          }, //商品名称
          parentGoodsName: {
            type: 'string',
            required: true
          }, //商品Code
          childGoodsQty: {
            type: 'numberFloat',
          },
          parentRowNum: {
            type: 'string',
          }, //母件行号
          originalGoodsId: {
            type: 'string',
          }, //原始版本商品
          goodsSelectionDescription: {
            type: 'string',
          }, //商品选项描述
        },
      },
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
          }
        }
      }
    },
    searchs: {
      search1: [{
        type: "text",
        key: "stockInCode",
        label: "入库单号",
      }, {
        type: "daterange",
        key: "billDate",
        label: "单据日期"
      }, {
        type: "refer",
        key: "stockOrg",
        label: "库存组织",
        refinfo: "organization_ocm",
      }, {
        type: "refer",
        key: "stockInStorage",
        label: "入库仓库",
        refinfo: "warehouse",
        domid: "stockInStorage--id"
      }, {
        type: "refer",
        key: "bizPerson",
        label: "业务员",
        refinfo: "person"
      }, {
        type: "refer",
        key: "dept",
        label: "部门",
        refinfo: "department"
      }, {
        type: "refer",
        key: "storageAdmin",
        label: "库管员",
        refinfo: "person"
      }, {
        type: "refer",
        key: "otherInBillItems--goods",
        label: "库存商品",
        refinfo: "goods"
      }, {
        type: "combo",
        key: "statusId",
        label: "单据状态",
        dataSource: [{
          value: '1',
          name: '自由态'
        }, {
          value: '2',
          name: '已取消'
        }, {
          value: '3',
          name: '已签字'
        }, ],
      }, ]
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "showAddBillPanel"
      }, {
        key: "del",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "del"
      }, {
        key: "sign",
        label: "签字",
        iconCls: "icon-edit",
        click: "signbtn"
      }, {
        key: "cancelsign",
        label: "取消签字",
        iconCls: "icon-tubiao-quxiaoshenhe",
        click: "cancelsignbtn"
      }, ],
      button2: [{
        key: "autonum",
        label: "自动取数",
        click: "autonum"
      }, {
        key: "cancel",
        label: "取消",
        click: "cancelBill"
      }, {
        key: "save",
        label: "保存",
        click: "saveBill",
        cls: "ui-btn-green"
      }],
      button3: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "showAddItemsRef"
      }, {
        key: "delrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delItems",
      }],
      button4: [{
        key: "return",
        label: "返回",
        click: "retListPanel"
      }, {
        key: "edit",
        label: "编辑",
        click: "detail2bill",
        cls: "ui-btn-green"
      }],
    },
    cards: {
      card1: [{
          type: "textreadonly",
          key: "stockInCode",
          label: "入库单号",
        }, {
          type: "date",
          key: "billDate",
          label: "单据日期",
        }, {
          type: "refer",
          key: "stockOrgId",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel": "03"
          },
          referId: "stockOrgref"
        }, {
          type: "refer",
          key: "stockInStorageId",
          label: "入库仓库",
          refinfo: "warehouse",
          referId: "stockInStorageref"
        }, {
          type: "refer",
          key: "tranTypeId",
          label: "其他入库类型",
          refinfo: "trantype",
          domid: "tranTypeId",
          referId: "tranTypeId"
        }, {
          type: "refer",
          key: "storageAdminId",
          label: "库管员",
          refinfo: "person"
        }, {
          type: "refer",
          key: "bizPersonId",
          label: "业务员",
          refinfo: "person"
        }, {
          type: "refer",
          key: "deptId",
          label: "部门",
          refinfo: "department"
        }, {
          type: "combo",
          key: "statusCode",
          label: "单据状态",
          defaultvalue: "01",
          dataSource: [{
            value: '01',
            name: '自由态'
          }, ],
          enable: false
        }, {
          type: "textreadonly",
          key: "totalFactInNum",
          label: "总实入数量",
          enable: false
        }, {
          type: "textarea",
          key: "remark",
          label: "备注",
          cls: "ui-textarea-item"
        },

      ]
    },
    details: {
      detail1: [{
        key: "stockInCode",
        label: "入库单号",
      }, {
        key: "billDate",
        label: "单据日期",
      }, {
        key: "stockOrgName",
        label: "库存组织",
      }, {
        key: "stockInStorageName",
        label: "入库仓库",
      }, {
        key: "tranTypeName",
        label: "其他入库类型",
      }, {
        key: "storageAdminName",
        label: "库管员",
      }, {
        key: "bizPersonName",
        label: "业务员",
      }, {
        key: "deptName",
        label: "部门",
      }, {
        key: "statusName",
        label: "单据状态"
      }, {
        key: "totalFactInNum",
        label: "总实入数量",
      }, {
        key: "remark",
        label: "备注",
      }, ]
    },
    grids: {
      grid1: {
        domid: "",
        umeta: {
          "id": "grid_complex",
          "data": "complexList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "stockInCode",
          "dataType": "String",
          "title": "入库单号",
          "renderType": "detailRender"
        }, {
          "field": "billDate",
          "dataType": "Date",
          "title": "单据日期"
        }, {
          "field": "stockOrgName",
          "dataType": "String",
          "title": "库存组织",
        }, {
          "field": "stockInStorageName",
          "dataType": "String",
          "title": "仓库",
        }, {
          "field": "bizPersonName",
          "dataType": "String",
          "title": "业务员"
        }, {
          "field": "deptName",
          "dataType": "String",
          "title": "部门"
        }, {
          "field": "storageAdminName",
          "dataType": "String",
          "title": "库管员"
        }, {
          "field": "statusName",
          "dataType": "String",
          "title": "单据状态"
        }, {
          field: "creator",
          dataType: "String",
          title: "创建人",
          visible: false
        }, {
          field: "modifier",
          dataType: "String",
          title: "修改人",
          visible: false
        }, {
          field: "creationTime",
          dataType: "Date",
          title: "创建时间",
          visible: false
        }, {
          field: "modifiedTime",
          dataType: "Date",
          title: "修改时间",
          visible: false
        }, {
          "field": "statusCode",
          "dataType": "String",
          "title": "操作",
          "renderType": "operation",
          "fixed": true,
          "width": "100px"
        }, ]
      },

      //商品信息
      grid2: {
        domid: "",
        umeta: {
          "id": "grid_complexItem",
          "data": "complexItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeEditFun": "beforeEditCheck"
        },
        columns: [{
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
          "editable": false,
        }, {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编码",
          "required": true,
          "editable": false,
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
          "required": true,
          "editable": false
        }, {
          "field": "shouldInNum",
          "dataType": "String",
          "title": "应入数量",
          "editType": "float",
          "required": true,
        }, {
          "field": "factInNum",
          "dataType": "String",
          "title": "实入数量",
          "editType": "float",
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
          "editable": false
        }, {
          "field": "unitPrice",
          "dataType": "String",
          "title": "单价",
        }, {
          "field": "amountMoney",
          "dataType": "String",
          "title": "金额",
          "editable": false
        }, {
          field: "goodsSelection",
          dataType: "String",
          title: "商品选配ID",
          renderType: "goodsOpt",
          editable: false,
          visible: false,
        }, {
          field: "goodsSelectionDescription",
          dataType: "String",
          title: "商品选配",
          renderType: "goodsOpt",
          editable: false,
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeId",
          "dataType": "String",
          "title": "批号",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchCodeCode",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "supplierId",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "supplierName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "projectId",
          "dataType": "String",
          "title": "项目",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "projectName",
          "editOptions": {
            "validType": "string"
          },
          "editable": true,
          "visible": false,
        }, {
          "field": "stockStateId",
          "dataType": "String",
          "title": "库存状态",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "stockStateName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "customerId",
          "dataType": "String",
          "title": "客户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "customerName",
          "visible": false,
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "batchNumId",
          "dataType": "String",
          "title": "批次号",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchNumName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "goodsPositionId",
          "dataType": "String",
          "title": "货位",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsPositionName",
          "editOptions": {
            "validType": "string"
          }
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, {
          "field": "stockInPerson",
          "dataType": "String",
          "title": "入库人",
          "editable": false
        }, {
          "field": "stockInDate",
          "dataType": "Date",
          "title": "入库日期",
          "editable": false
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源单据号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillBcode",
          "dataType": "String",
          "title": "来源单据行号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillType",
          "dataType": "String",
          "title": "来源单据类型",
          "editable": false,
          "visible": false
        }, ]
      },
      grid3: {
        domid: "",
        umeta: {
          "id": "grid_complexItem2",
          "data": "complexItems",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
        }, {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编码",
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
        }, {
          "field": "shouldInNum",
          "dataType": "String",
          "title": "应入数量",
          "editType": "String",
          "required": true,
        }, {
          "field": "factInNum",
          "dataType": "String",
          "title": "实入数量",
          "editType": "String",
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
        }, {
          "field": "unitPrice",
          "dataType": "String",
          "title": "单价",
        }, {
          "field": "amountMoney",
          "dataType": "String",
          "title": "金额",
        }, {
          field: "goodsSelection",
          dataType: "String",
          title: "商品选配",
          renderType: "goodsOptDetails",
          editable: false,
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeCode",
          "dataType": "String",
          "title": "批号",
          "editable": false,
          "visible": false,
        }, {
          "field": "supplierName",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "editable": false,
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
          "editable": false,
          "visible": false,
        }, {
          "field": "stockStateName",
          "dataType": "String",
          "title": "库存状态",
          "editable": false,
          "visible": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "visible": false,
        }, {
          "field": "batchNumName",
          "dataType": "String",
          "title": "批次号",
        }, {
          "field": "goodsPositionName",
          "dataType": "String",
          "title": "货位",
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, {
          "field": "stockInPerson",
          "dataType": "String",
          "title": "入库人",
        }, {
          "field": "stockInDate",
          "dataType": "Date",
          "title": "入库时间",
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源单据号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillBcode",
          "dataType": "String",
          "title": "来源单据行号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillType",
          "dataType": "String",
          "title": "来源单据类型",
          "editable": false,
          "visible": false
        }, ]
      },

      //bom结构信息
      grid4: {
        domid: "",
        umeta: {
          "id": "grid_complexBomItem",
          "data": "BomItems",
          "type": "grid",
          "editable": true,
          "showNumCol": true,
          "onBeforeEditFun": "beforeBomEditCheck",
        },
        columns: [{
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
          "editable": false,
        }, {
          "field": "parentRowNum",
          "title": "所属商品行号",
          "dataType": "Integer",
          "editable": false
        }, {
          "field": "parentGoodsId",
          "dataType": "String",
          "title": "所属母件商品",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "parentGoodsName",
          "editOptions": {
            "validType": "string"
          },
        }, {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编码",
          "required": true,
          "editable": false,
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
          "required": true,
          "editable": false
        }, {
          "field": "shouldInNum",
          "dataType": "String",
          "title": "应入数量",
          "editable": false,
          "editType": "String",
        }, {
          "field": "factInNum",
          "dataType": "String",
          "title": "实入数量",
          "editType": "String",
          "editable": false
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
          "editable": false
        }, {
          "field": "unitPrice",
          "dataType": "String",
          "title": "单价",
          // "editType": "float",
        }, {
          "field": "amountMoney",
          "dataType": "String",
          "title": "金额",
          "editable": false
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeId",
          "dataType": "String",
          "title": "批号",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchCodeCode",
          "editOptions": {
            "validType": "string"
          },
          "visible": false,
          "editable": false,
        }, {
          "field": "supplierId",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "supplierName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "projectId",
          "dataType": "String",
          "title": "项目",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "projectName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
          "visible": false,
        }, {
          "field": "stockStateId",
          "dataType": "String",
          "title": "库存状态",
          "visible": false,
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "stockStateName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "customerId",
          "dataType": "String",
          "title": "客户",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "visible": false,
          "showField": "customerName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "batchNumId",
          "dataType": "String",
          "title": "批次号",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "batchNumName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "goodsPositionId",
          "dataType": "String",
          "title": "货位",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsPositionName",
          "editOptions": {
            "validType": "string"
          },
          "editable": false,
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, {
          "field": "stockInPerson",
          "dataType": "String",
          "title": "入库人",
          "editable": false
        }, {
          "field": "stockInDate",
          "dataType": "Date",
          "title": "入库日期",
          "editable": false
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源单据号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillBcode",
          "dataType": "String",
          "title": "来源单据行号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillType",
          "dataType": "String",
          "title": "来源单据类型",
          "editable": false,
          "visible": false
        }, ]
      },
      grid5: {
        domid: "",
        umeta: {
          "id": "grid_complexBomItem2",
          "data": "BomItems",
          "type": "grid",
          "editable": false,
          "showNumCol": true
        },
        columns: [{
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
        }, {
          field: "parentRowNum",
          title: "所属商品行号",
          dataType: "Integer",
          editable: false
        }, {
          "field": "parentGoodsName",
          "dataType": "String",
          "title": "母件商品名称",
          "editable": false
        }, {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编码",
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
        }, {
          "field": "shouldInNum",
          "dataType": "String",
          "title": "应入数量",
          "editType": "String",
        }, {
          "field": "factInNum",
          "dataType": "String",
          "title": "实入数量",
          "editType": "String",
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
        }, {
          "field": "unitPrice",
          "dataType": "String",
          "title": "单价",
        }, {
          "field": "amountMoney",
          "dataType": "String",
          "title": "金额",
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeCode",
          "dataType": "String",
          "title": "批号",
          "editable": false,
          "visible": false,
        }, {
          "field": "supplierName",
          "dataType": "String",
          "title": "供应商",
          "visible": false,
          "editable": false,
        }, {
          "field": "projectName",
          "dataType": "String",
          "title": "项目",
          "editable": false,
          "visible": false,
        }, {
          "field": "stockStateName",
          "dataType": "String",
          "title": "库存状态",
          "editable": false,
          "visible": false,
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户",
          "editable": false,
          "visible": false,
        }, {
          "field": "batchNumName",
          "dataType": "String",
          "title": "批次号",
        }, {
          "field": "goodsPositionName",
          "dataType": "String",
          "title": "货位",
        }, {
          "field": "remark",
          "dataType": "String",
          "title": "备注",
        }, {
          "field": "stockInPerson",
          "dataType": "String",
          "title": "入库人",
        }, {
          "field": "stockInDate",
          "dataType": "Date",
          "title": "入库时间",
        }, {
          "field": "srcBillCode",
          "dataType": "String",
          "title": "来源单据号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillBcode",
          "dataType": "String",
          "title": "来源单据行号",
          "editable": false,
          "visible": false
        }, {
          "field": "srcBillType",
          "dataType": "String",
          "title": "来源单据类型",
          "editable": false,
          "visible": false
        }, ]
      },


    }
  }
  return new basemodel(model);
})