define(["ocm_basemodel"], function (basemodel) {
  var orderItemsmeta = {
    meta: {
      orderCode: {type: 'string', required: true}, //订单编码
      purchaseOrgId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        "refparam":'{"EQ_orgFuncRel":"04"}',
      }, //采购组织
      purchaseOrgName:{type: 'string', required: true},
      receiveStorageId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['storeLocation']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        "refparam":'{}'
      }, //仓库
      receiveStorageName:{type: 'string',},
      receiveStorageCode:{type: 'string',},
      //表头ID
      reqOrderId:{type: 'string',},
      goodsId: {type: 'string',
        "refmodel": JSON.stringify(refinfo['productInfo']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'}, //商品
      goodsName: {type: 'string',required: true}, //商品名称
      goodsCode: {type: 'string',required: true}, //商品Code

      amount: {type: 'amountFloat',required: true}, //原金额
      dealAmount: {type: 'amountFloat',required: true}, //成交金额


      basePrice: {type: 'priceFloat',required: true}, //单价

      orderNum: {type: 'numberFloat',required: true}, // 订货量

      unrec: {type: 'numberFloat'},//未收货数量
      mainNum: {type: 'numberFloat'},//主数量
      stockInNum: {type: 'numberFloat'},//累计入库数量
      orderDate: {type: 'string', required: true}, //订单日期


      orderTypeCode: {type: 'string', required: true}, //订单类型
      orderTypeName: {type: 'string', required: true}, //订单类型
      otherOrderNum: {type: 'string'}, //对方订单号
      supplierId:{
        type: 'string',
        'refmodel': JSON.stringify(refinfo['suppliers']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
      },
      supplierName: {type: 'string', required: true}, //供应商Name
      supplierCode: {type: 'string', required: true}, //供应商Code
      purchasePersonId: {
        type: 'string',
        'refmodel':JSON.stringify(refinfo['person']),
        'refcfg':'{"ctx":"/uitemplate_web"}',
      }, //采购员
      purchasePersonCode: {type: 'string'}, //采购员Code
      purchasePersonName: {type: 'string'}, //采购员Name
      purchaseDeptId:{
        type: 'string',
        'refmodel': JSON.stringify(refinfo['department']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
      },
      purchaseDeptCode:{type:"string"},
      purchaseDeptName:{type:"string"},
      operation:{type: 'string'},
    },
    pageSize: 10
  };
  var model = {
    metas: {
      complex: {
        meta: {
          id:{
            type: 'string',
          },
            saleOrgId : {
                type: 'string',
                'refmodel': JSON.stringify(refinfo['organization_ocm']),
                'refcfg': '{"ctx":"/uitemplate_web","refName":"销售组织"}',
                'refparam': '{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
            },
            saleOrgCode : {
                type: 'string',
            },
            saleOrgName : {
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
          stockInDate:{type:'date'},
          //单据日期
          billDate:{type:'date',required: true,},
          stockOrgCode: {type: 'string'},
          stockOrgName: {type: 'string'},
          // 入库单号
          stockInCode: {type: 'string',},
          // 单据类型
          billType: {type: 'string'},
          // 入库仓库
          stockInStorageId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['channel-warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          stockInStorageCode: {type: 'string'},
          stockInStorageName: {type: 'string'},
          //（最后）入库日期
          lastInDate:{type: 'date'},
          // 库管员
          storageAdminId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          storageAdminCode:{type:'string'},
          storageAdminName:{type:'string'},
          //（最晚）预计到货日期
          lastReceiveDate:{type:'date'},
          // 发货日期
          deliverDate:{type:'date'},
          // 入库状态
          stockInStatus:{type:'string'},
          // 状态
          status:{type:'string'/*,required: true,*/},
          // 取消原因
          cancelReason:{type:'string'},
          // 总应入数量
          shouldInAmount:{type:'numberFloat',precision:2/*,required: true,*/},
          // 总实入数量
          factInAmount:{type:'numberFloat',precision:2/*,required: true,*/},
          // 采购员
          purchasePersonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"采购员"}',
          },
          purchasePersonName:{type:"string"},
          purchasePersonCode:{type:"string"},
          // 采购部门
          purchaseDeptId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['department']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
          },
          purchaseDeptCode:{type:"string"},
          purchaseDeptName:{type:"string"},
          // 供应商
          supplierId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
          },
          supplierCode:{type:"string"},
          supplierName:{type:"string"},
          // 备注
          remark:{type:"string"},
          // 物流公司
          logisticsCompanyId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['logistics-company']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
          },
          logisticsCompanyCode:{type:"string",},
          logisticsCompanyName:{type:"string",},
          // 库存单据归属
          stockBillBelong:{type:"string",},
          // 所属客户
          belongCustomer:{type:"string"},
          // 入库人
          stockInPersonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockInPersonCode:{type:'string'},
          stockInPersonName:{type:'string'},
          // 签字人
          signPerson:{type:"string"},
          // 签字日期
          signDate:{type:'date'},
          //交易类型
          tranTypeId: {
            type: 'string',
            // required:true,
            'refmodel': JSON.stringify(refinfo['trantype']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"交易类型"}',
            'refparam': '{"EQ_billTypeId":"PurchaseIn"}'
          },
          tranTypeCode: {type: 'string'},
          tranTypeName: {type: 'string'},
          //币种
          currencyId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['currency']),
            "refcfg":'{"ctx":"/uitemplate_web",,"refName":"请选择"}',
            "refparam":'{}'}, //币种
          currencyName:{type: 'string', required:true},
          currencyCode:{type: 'string', required:true},
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        meta: {
          id:{type:'string'},
          // 行号
          rowNum: {type: 'string'},
          // 库存商品id
          goodsId: {type: 'string'},
          // 库存商品编码
          goodsCode: {type: 'string'},
          // 库存商品名称
          goodsName: {type: 'string'},
          // 计量单位
          measurementUnit: {type: 'string'}, //计量单位
          // 应收数量
          shouldInAmount:{type:'numberFloat'},
          // 单价
          unitPrice:{type:'priceFloat'},
          // 金额
          amountPrice:{type:'amountFloat'},
          //（实收）数量
          factInAmount:{type:'numberFloat'},
          // 是否赠品
          isGift:{type:'string'},
          // 备注
          remark:{type:'string'},
          // 入库日期
          stockInDate:{type:'date'},
          // 入库人
          stockInPersonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockInPersonCode:{type:'string'},
          stockInPersonName:{type:'string'},
          // 批次号
          batchNumId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',},
          batchNumCode:{type:'string'},
          batchNumName:{type:'string'},

          // 货位
          goodsPositionId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsposition']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"货位"}',
          },
          goodsPositionCode:{type:'string'},
          goodsPositionName:{type:'string'},
          // 源头单据号
          sourceId:{type:'string'},
          // 源头单据类型
          sourceType:{type:'string'},
          // 来源单据号
          srcBillCode:{type:'string'},
          // 来源单据行号
          srcBillBcode:{type:'string'},
          // 来源单据类型
          srcBillType:{type:'string'},

        },
        pageSize: 10,
      },
      referPurchaseorder:{
        meta: {
          reqOrderItems:{
            type:"child",
            meta:orderItemsmeta.meta
          },
          purchaseOrgId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{"EQ_orgFuncRel":"04"}',
          }, //采购组织
          purchaseOrgName:{type: 'string', required: true},
          tranTypeId: {
            type: 'string',
            required: true,
            default: "PurchaseBill",
            'refmodel': JSON.stringify(refinfo['trantype']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"订单类型"}',
            'refparam': '{"EQ_billTypeId":"PurchaseBill"}'
          }, //交易id
          tranTypeName: {type: 'string', required: true}, //交易Name
          tranTypeCode: {type: 'string', required: true}, //交易Code
          orderCode: {type: 'string', required: true}, //订单编码
          otherOrderNum: {type: 'string'}, //对方订单号
          orderDate: {type: 'string', required: true}, //订单日期
          purchaseTypeCode: {type: 'string', required: true}, //采购类型
          purchaseTypeName: {type: 'string', required: true}, //采购类型
          bizTypeId: {type: 'string', required: true}, //交易id
          bizTypeName: {type: 'string', required: true}, //交易Name
          bizTypeCode: {type: 'string', required: true}, //交易Code
          supplier:{
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['suppliers']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{}',
          }, //供应商
          supplierName: {type: 'string', required: true}, //供应商Name
          supplierCode: {type: 'string', required: true}, //供应商Code
          purchasePersonId: {
            type: 'string',
            'refmodel':JSON.stringify(refinfo['person']),
            'refcfg':'{"ctx":"/uitemplate_web"}',
          }, //采购员
          purchasePersonCode: {type: 'string'}, //采购员Code
          purchasePersonName: {type: 'string'}, //采购员Name
          purchaseDeptId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['department']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
          },
          purchaseDeptCode:{type:"string"},
          purchaseDeptName:{type:"string"},
          currencyId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['currency']),
            "refcfg":'{"ctx":"/uitemplate_web","refName":"请选择"}',
            "refparam":'{}'}, //币种
          currencyName:{type: 'string', required:true},
          currencyCode:{type: 'string', required:true},
          status: {type: 'string', required: true,default: 1}, //单据状态
          remark: {type: 'string'}, //备注
          operation:{type: 'string'},
          selectitemIds:{type:'string'},

          receiver:{type:'string'}, //联系人
          receiverAddress:{type:'string'}, //联系地址
          receiverPhone:{type:'string'}, //联系电话

          unrecsum:{type:'numberFloat'}, //未收货数量
          totalNum:{type:'numberFloat'}, //总数量
        },
        pageSize: 10
      },
      referPurchaseorderitem:orderItemsmeta,
      referPurchaseorderSearch:{
        meta: {
          // // 库存组织
          // receiveStorageOrgId: {
          //   type: 'string',
          //   'refmodel': JSON.stringify(refinfo['organization_ocm']),
          //   "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
          // },
          receiveStorageId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['storeLocation']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{}'
          }, //仓库
          receiveStorageName:{type: 'string',},
          receiveStorageCode:{type: 'string',},
          purchaseCode:{type:"string",},//订单号
          orderDate:{type:"string",},//订单日期
          otherOrderNum:{type:"string",},//对方订单号
          //供应商（一级经销商）- 销售组织
          saleOrgId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供货方"}',
          }, // 供应商
          saleOrgCode:{type:"string"},//供应商Name
          saleOrgName:{type:"string"},//供应商Code

          customerId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供货方"}',
          }, // 供应商
          customerCode:{type:"string"},//供应商Name
          customerName:{type:"string"},//供应商Code

          //供应商（非一级经销商）- 客户
          supplierId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供货方"}',
          }, // 供应商
          supplierName:{type:"string"},//供应商Name
          supplierCode:{type:"string"},//供应商Code

          stockInStorageId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockInStorageName:{type:"string"},
          stockInStorageCode:{type:"string"},

          arrivalBelongId: {type: 'string',required: true}, //到货地归属
          arrivalBelongName: {type: 'string',required: true},
          arrivalBelongCode: {type: 'string',required: true},

          receiveStorageOrgId: {
            type: 'string',
            required:true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //收货库存组织
          receiveStorageOrgName:{type: 'string',},
          receiveStorageOrgCode:{type: 'string',},

          customer: { type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{}'}, //客户
        },

        pageSize: 10
      },
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['productInfo']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }
        }
      },
      operateArea:{
        meta:{
          oneStepPurchasein:{type: 'string',default:1},
          stockInStorageId: {
            type: 'string',
            refmodel: JSON.stringify(refinfo['channel-warehouse']),
            refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          stockInStorageCode: {type: 'string'},
          stockInStorageName: {type: 'string'},
        },
      }
    },
    searchs: {
      search1: [
        {
          type: "refer",
          key: "saleOrg",
          label: "供货组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel": "01"
          },
            domid:"orgIdSearch1"
        },
        {
          type: "refer",
          key: "supplier",
          label: "供货客户",
          refinfo: "customer",
          domid : "supplierIdSearch1",
        },
        {
          type: "daterange",
          key: "billDate",
          label: "订单日期"
        },
        {
          type: "refer",
          key: "stockInStorage",
          label: "仓库",
          refinfo: "channel-warehouse"
        },
        {
          type: "text",
          key: "stockInCode",
          label: "入库单号"
        },
      ],
      search2: [
        {
          type: "refer",
          key: "saleOrg",
          label: "供货组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel":"01",
              "EQ_isEnable":"1"
          },
          domid:"saleOrgSearch2"
        },
        {
          type: "refer",
          key: "supplier",
          label: "供货客户",
          refinfo: "customer",
          domid:"supplierSearch2"
        },
        {
          type: "daterange",
          key: "orderDate",
          label: "订单日期"
        },
        {
          type: "text",
          key: "orderCode",
          label: "订单编号"
        },
      ]
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "showAddRefer"
        },
        {
          key: "cancel",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        },
        // {
        //   key: "sign",
        //   label: "签字",
        //   iconCls: "icon-edit",
        //   click: "signbtn"
        // },
        // {
        //   key: "cancelsign",
        //   label: "取消签字",
        //   iconCls: "icon-tubiao-quxiaoshenhe",
        //   click: "cancelsignbtn"
        // },
      ],
      button2: [{
        key: "cancel",
        label: "取消",
        click: "cancelBill"
      },
        {
          key: "save",
          label: "保存",
          click: "saveBill",
          cls: "ui-btn-green"
        }
      ],
      button3: [
      ],
      button4: [{
        key: "return",
        label: "返回",
        click: "retListPanel"
      },
        {
          key: "edit",
          label: "编辑",
          click: "detail2bill",
          cls: "ui-btn-green"
        }
      ],
    },
    cards: {
      card1: [
        {
          type: "textreadonly",
          key: "stockInCode",
          label: "入库单号",
        },
        {
          type: "date",
          key: "billDate",
          label: "单据日期",
        },
          {
              type: "refer",
              key: "saleOrgId",
              label: "供货方",
              domid : "saleOrgCard",
              cls : "saleOrgCls",
          },
        {
          type: "refer",
          key: "supplierId",
          label: "供货方",
          domid : "supplierCard",
          cls : "supplierCls",
        },
        {
          type: "textreadonly",
          key: "purchasePerson",
          label: "采购员",
          refinfo: "person",
            enable: false
        },
        {
          type: "refer",
          key: "stockInStorageId",
          label: "入库仓库",
          refinfo: "channel-warehouse",
          referId : "stockInStorageId"
        },
        {
          type: "textreadonly",
          key: "shouldInAmount",
          label: "应入数量",
          enable:false
        },
        {
          type: "textreadonly",
          key: "factInAmount",
          label: "实入数量",
          enable:false
        },
        {
          type: "combo",
          key: "stockInStatus",
          label: "入库状态",
          enable:false,
          dataSource: [
            {value: '1', name: '未入库'},
            {value: '2', name: '部分入库'},
            {value: '3', name: '全部入库'},
          ],
          defaultvalue: "1",
          renderType:"statusRender"
        },
        {
          type: "refer",
          key: "logisticsCompanyId",
          label: "配送物流公司",
          refinfo: "logistics-company"
        },
        {
          type: "textarea",
          key: "remark",
          label: "备注",
          cls: "ui-textarea-item"
        },
        // {
        //   type: "combo",
        //   key: "stockBillBelong",
        //   keyfordisplay: "stockBillBelongName",
        //   label: "库存单据归属",
        //   dataSource: "orderTypeSource"
        // },
        // {
        //   type: "refer",
        //   key: "belongCustomer",
        //   label: "所属客户",
        //   refinfo: "person"
        // },


        // {
        //   type: "text",
        //   key: "stockInDate",
        //   label: "上游出库单号",
        // },
        // {
        //   type: "text",
        //   key: "stockInDate",
        //   label: "上游出库单行号",
        // },

        // {
        //   type: "refer",
        //   key: "belongCustomer",
        //   label: "所属客户",
        //   refinfo: "person"
        // },
        // {
        //   type: "textreadonly",
        //   key: "signPerson",
        //   label: "签字人",
        // },
        // {
        //   type: "textreadonly",
        //   key: "signDate",
        //   label: "签字日期",
        // },
      ]
    },
    details: {
      detail1: [
        {
          key: "stockInCode",
          label: "入库单号",
        },
        {
          key: "billDate",
          label: "单据日期",
          computed: "billDateComputed"
        },
        {
          key: "stockOrgName",
          label: "库存组织",
        },
        {
          key: "stockInStorageName",
          label: "入库仓库",
        },
        // {
        //   type: "combo",
        //   key: "billType",
        //   label: "入库类型",
        //   defaultvalue: "1",
        //   dataSource: [
        //     { value: '1', name: '采购入库' },
        //   ],
        //   enable:false
        // },
        {
          key: "supplierName",
          label: "供应商",
        },
        {
          key: "purchasePerson",
          label: "采购员",
        },
        {
          key: "purchaseDeptName",
          label: "采购部门",
        },
        {
          key: "storageAdminName",
          label: "库管员",
        },
        // {
        //   key: "deliverDate",
        //   label: "发货日期",
        // },
        {
          key: "status",
          label: "单据状态",
          computed: "status",
        },
        {
          key: "lastReceiveDate",
          label: "计划到货日期",
        },
        {
          key: "shouldInAmount",
          label: "总应入数量",
        },
        {
          key: "factInAmount",
          label: "总实入数量",
        },
        {
          key: "carrierName",
          label: "配送物流公司",
        },
        {
          key: "remark",
          label: "备注",
        },
        // {
        //   type: "combo",
        //   key: "stockBillBelong",
        //   keyfordisplay: "stockBillBelongName",
        //   label: "库存单据归属",
        //   dataSource: "orderTypeSource"
        // },
        // {
        //   type: "refer",
        //   key: "belongCustomer",
        //   label: "所属客户",
        //   refinfo: "person"
        // },


        // {
        //   type: "text",
        //   key: "stockInDate",
        //   label: "上游出库单号",
        // },
        // {
        //   type: "text",
        //   key: "stockInDate",
        //   label: "上游出库单行号",
        // },

        // {
        //   type: "refer",
        //   key: "belongCustomer",
        //   label: "所属客户",
        //   refinfo: "person"
        // },
        // {
        //   type: "textreadonly",
        //   key: "signPerson",
        //   label: "签字人",
        // },
        // {
        //   type: "textreadonly",
        //   key: "signDate",
        //   label: "签字日期",
        // },
      ]
    },
    grids: {
      grid1: {
        domid: "grid_complex_dom",
        umeta: {
          "id": "grid_complex",
          "data": "purchaseinList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
        },
        columns: [
          {
            "field": "stockInCode",
            "dataType": "String",
            "title": "入库单号",
            "renderType": "detailRender",
          },
          {
            "field": "billDate",
            "dataType": "Date",
            "title": "单据日期",
          },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供货方",
          },
          {
            "field": "purchasePerson",
            "dataType": "String",
            "title": "采购员",
          },
          {
            "field": "stockInStorageName",
            "dataType": "String",
            "title": "仓库",
          },
          {
            "field": "shouldInAmount",
            "dataType": "String",
            "title": "应入数量",
          },
          {
            "field": "factInAmount",
            "dataType": "String",
            "title": "实入数量",
          },
          {
            "field": "stockInStatus",
            "dataType": "String",
            "title": "入库状态",
            "renderType":"statusRender",
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
            "field": "statusCode",
            "dataType": "String",
            "title": "操作",
            "renderType": "operation",
            "fixed": true,
            "width": "100px"
          },
        ]
      },
      grid2: {
        domid: "grid_purchaseorder2",
        umeta: {
          "id": "grid_complex_edit",
          "data": "purchaseinItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
        },
        columns: [
          {
            "field": "rowNum",
            "dataType": "String",
            "title": "行号",
            "editable": false,
          },
          {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编号",
            "editable": false,
          },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
            "editable": false,
          },
          {
            "field": "shouldInAmount",
            "dataType": "String",
            "title": "应入数量",
            "editable": false,
          },
          {
            "field": "factInAmount",
            "dataType": "String",
            "title": "实入数量",
          },
          {
            "field": "measurementUnit",
            "dataType": "String",
            "title": "单位",
            "editable": false
          },
          {
            "field": "unitPrice",
            "dataType": "String",
            "title": "单价",
          },
          {
            "field": "amountPrice",
            "dataType": "String",
            "title": "金额",
            "editable": false,
          },
          // {
          //   "field": "batchNumId",
          //   "dataType": "String",
          //   "title": "批次号",
          //   "renderType": "ncReferRender",
          //   "editType": "ncReferEditType",
          //   "showField": "goodsPositionName",
          //   "editOptions": {
          //     "validType": "string"
          //   }
          // },
          // {
          //   "field": "goodsPositionId",
          //   "dataType": "String",
          //   "title": "货位",
          //   "renderType": "ncReferRender",
          //   "editType": "ncReferEditType",
          //   "showField": "goodsPositionName",
          //   "editOptions": {
          //     "validType": "string"
          //   }
          // },
          {
            "field": "isGift",
            "dataType": "checkbox",
            "title": "赠品",
            "renderType":"booleanRender",
          },
          {
            "field": "remark",
            "dataType": "String",
            "title": "备注",
          },
          {
            "field": "stockInPersonName",
            "dataType": "String",
            "title": "入库人",
            "editable": false,
          },
          {
            "field": "stockInDate",
            "dataType": "Date",
            "title": "入库日期",
            "editable": false,
          },

        ]
      },
      grid3: {
        domid: "grid_purchaseorder3",
        umeta: {
          "id": "grid_complex_detail",
          "data": "purchaseinItems",
          "type": "grid",
          "editable": false,
          "showNumCol": true
        },
        columns:
          [
            {
              "field": "rowNum",
              "dataType": "String",
              "title": "行号",
              "editable": false,
            },
            {
              "field": "goodsCode",
              "dataType": "String",
              "title": "商品编号",
              "editable": false,
            },
            {
              "field": "goodsName",
              "dataType": "String",
              "title": "商品名称",
              "editable": false,
            },
            {
              "field": "shouldInAmount",
              "dataType": "String",
              "title": "应入数量",
              "editable": false,
            },
            {
              "field": "factInAmount",
              "dataType": "String",
              "title": "实入数量",
              "editable": false,
            },
            {
              "field": "measurementUnit",
              "dataType": "String",
              "title": "单位",
              "editable": false
            },
            {
              "field": "unitPrice",
              "dataType": "String",
              "title": "单价",
              "editable": false,
            },
            {
              "field": "amountPrice",
              "dataType": "String",
              "title": "金额",
              "editable": false,
            },
            // {
            //   "field": "batchNumName",
            //   "dataType": "String",
            //   "title": "批次号",
            // },
            // {
            //   "field": "goodsPositionName",
            //   "dataType": "String",
            //   "title": "货位",
            // },
            {
              "field": "isGift",
              "dataType": "checkbox",
              "title": "赠品",
              "renderType":"disableBooleanRender",
              "editable": false,
            },
            {
              "field": "remark",
              "dataType": "String",
              "title": "备注",
              "editable": false,
            },
            {
              "field": "stockInPersonName",
              "dataType": "String",
              "title": "入库人",
              "editable": false,
            },
            {
              "field": "stockInDate",
              "dataType": "Date",
              "title": "入库日期",
              "editable": false,
            },
          ]
      },
      grid4: {
        domid: "grid_purchaseorder4",
        umeta: {
          "id": "grid_referList",
          "data": "referPurchaseorderList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "onRowSelected" : "referSelectHandle",
          "onRowUnSelected": "referUnSelectHandle",
        },
        columns: [
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供货方",
          },
          {
            "field": "receiver",
            "dataType": "String",
            "title": "收货人",
          },
          {
            "field": "receiverAddress",
            "dataType": "String",
            "title": "收货地址",
          },
          {
            "field": "receiverPhone",
            "dataType": "String",
            "title": "收货人电话"
          },
          {
            "field": "deliveryDate",
            "dataType": "Date",
            "title": "期望到货日期",
          },
          {
            "field": "unrecsum",
            "dataType": "String",
            "title": "未收货总数量",
          },
          {
            "field": "totalNum",
            "dataType": "String",
            "title": "总数量",
          },
        ]
      },
      grid5: {
        domid: "grid_purchaseorder5",
        umeta: {
          "id": "grid_referListItem",
          "data": "referPurchaseorderitemList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "onRowSelected" : "referSelectItemHandle",
          "onRowUnSelected": "referUnSelectItemHandle",
        },
        columns: [
          {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编码",
          },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          },
          {
            "field": "basePrice",
            "dataType": "String",
            "title": "单价",
            "width": "60px"
          },
          {
            "field": "orderNum",
            "dataType": "String",
            "title": "订货量",
            "width": "60px"
          },
          {
            "field": "amount",
            "dataType": "String",
            "title": "金额",
            "width": "60px"
          },
          {
            "field": "dealAmount",
            "dataType": "String",
            "title": "成交金额",
          },
          {
            "field": "unrec",
            "dataType": "String",
            "title": "未收货数量",
          },
          {
            "field": "stockInNum",
            "dataType": "String",
            "title": "已收货数量",
          },
        ]
      },
      grid6: {
        domid: "grid_purchaseorder6",
        umeta: {
          "id": "grid_referList_Sel",
          "data": "selectedreferList",
          "type": "grid",
          "showNumCol": true,
          "editable": false,
        },
        columns:  [
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供货方",
          },
          {
            "field": "tranTypeName",
            "dataType": "String",
            "title": "收货人",
          },
          {
            "field": "orderCode",
            "dataType": "String",
            "title": "收货地址",
          },
          {
            "field": "otherOrderNum",
            "dataType": "String",
            "title": "收货人电话"
          },
          {
            "field": "deliveryDate",
            "dataType": "Date",
            "title": "期望到货日期",
          },
          {
            "field": "totalAmount",
            "dataType": "String",
            "title": "未收货总数量",
          },
          {
            "field": "totalMoney",
            "dataType": "String",
            "title": "总数量",
          },
        ]
      },
      grid7: {
        domid: "grid_purchaseorder7",
        umeta: {
          "id": "grid_referListItem_Sel",
          "data": "selectedreferListItem",
          "type": "grid",
          "editable": false,
          "showNumCol": true,
        },
        columns: [
          {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编码",
          },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          },
          {
            "field": "basePrice",
            "dataType": "String",
            "title": "单价",
            "width": "60px"
          },
          {
            "field": "orderNum",
            "dataType": "String",
            "title": "订货量",
            "width": "60px"
          },
          {
            "field": "amount",
            "dataType": "String",
            "title": "金额",
            "width": "60px"
          },
          {
            "field": "dealAmount",
            "dataType": "String",
            "title": "成交金额",
          },
          {
            "field": "orderNum",
            "dataType": "String",
            "title": "未收货数量",
          },
          {
            "field": "orderNum",
            "dataType": "String",
            "title": "已收货数量",
          },
        ]
      },
    }
  }
  return new basemodel(model);
})