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
      goodsId: {type: 'string',
        "refmodel": JSON.stringify(refinfo['goods']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'}, //商品
      goodsName: {type: 'string',required: true}, //商品名称
      goodsCode: {type: 'string',required: true}, //商品Code

      goodsNum: {type: 'numberFloat',required: true}, //数量

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
      // 可出库数量
      couldOutNum:{type:'numberFloat'/*,required: true,*/},
      // 累计已出库数量
      returnGoodsAmount:{type:'numberFloat'/*,required: true,*/},
      originalGoodsId:{
        type: 'string',
      },  //原始版本商品
      goodsSelectionDescription:{
        type: 'string',
      },//商品选项描述
    },
    pageSize: 10
  };
  var BomItemsmeta = {
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
      goodsId: {type: 'string',
        "refmodel": JSON.stringify(refinfo['goods']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'}, //商品
      goodsName: {type: 'string',required: true}, //商品名称
      goodsCode: {type: 'string',required: true}, //商品Code

      goodsNum: {type: 'numberFloat',required: true}, //数量

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
      // 可出库数量
      couldOutNum:{type:'numberFloat'/*,required: true,*/},
      // 累计已出库数量
      returnGoodsAmount:{type:'numberFloat'/*,required: true,*/},
      //------- 630后 新加bom包件字段 -------
      goodsVersion:{
        type: 'string',
        required: true
      },  //商品版本号
      goodsSelection:{
        type: 'string',
        required: true
      },  //商品选配项
      goodsNum: {
        type: 'string',
        required: true
      }, //数量
      parentGoodsId: {
        type: 'string',
        required: true
      }, //商品
      parentGoodsCode: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['goods']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isEnable":"1"}'
      }, //商品名称
      parentGoodsName: {
        type: 'string',
        required: true
      }, //商品Code
      childGoodsQty:{
        type: 'numberFloat',
      },
      parentRowNum: {
        type: 'string',
      }, //母件行号
      originalGoodsId:{
        type: 'string',
      },  //原始版本商品
      goodsSelectionDescription:{
        type: 'string',
      },//商品选项描述
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
          // 库存组织
          stockOrgId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          },
          stockOutDate:{type:'date'},
          //单据日期
          billDate:{type:'date',required: true,},
          stockOrgCode: {type: 'string'},
          stockOrgName: {type: 'string'},
          // 出库单号
          stockOutCode: {type: 'string',},
          // 单据类型
          billType: {type: 'string'},
          // 出库仓库
          stockOutStorageId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          stockOutStorageCode: {type: 'string'},
          stockOutStorageName: {type: 'string'},
          ifSlotManage: {
            type: 'string'
          },
          //（最后）出库日期
          lastInDate:{type: 'date'},
          // 库管员
          storageAdminId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          storageAdminCode:{type:'string'},
          storageAdminName:{type:'string'},
          // 退货员
          returnedReasonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"退货员"}',
          },
          returnedReasonCode:{type:'string'},
          returnedReasonName:{type:'string'},
          //（最晚）预计到货日期
          lastReceiveDate:{type:'date'},
          // 发货日期
          deliverDate:{type:'date'},
          // 出库状态（QY107）
          stockOutStatus:{type:'string'},
          // 状态
          statusId: {type: 'string'},
          statusCode: {type: 'string'},
          statusName: {type: 'string'},
          // 取消原因
          cancelReason:{type:'string'},
          // 总应出数量
          totalShouldOutNum:{type:'numberFloat',precision:2/*,required: true,*/},
          // 总实出数量
          totalFactOutNum:{type:'numberFloat',precision:2/*,required: true,*/},
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
            'refmodel': JSON.stringify(refinfo['suppliers']),
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
            "refcfg": '{"ctx":"/uitemplate_web","refName":"物流公司"}',
          },
          logisticsCompanyCode:{type:"string",},
          logisticsCompanyName:{type:"string",},
          // 库存单据归属
          stockBillBelong:{type:"string",},
          // 所属客户
          belongCustomer:{type:"string"},
          // 出库人
          stockOutPersonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockOutPersonCode:{type:'string'},
          stockOutPersonName:{type:'string'},
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
            'refparam': '{"EQ_billTypeId":"PurchaseReturnOut"}'
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

          enableBatchNumberManage: {
            type: 'string'
          },
          enableBatchNoManage:{
            type: 'string'
          },
          enableInvStatusManage:{
              type: 'string'
          },
          isOptional : {
              type : "Integer"
          },
          // 计量单位
          unitId: {type: 'string'}, //计量单位
          unitCode: {type: 'string'}, //计量单位
          unitName: {type: 'string'}, //计量单位
          // 应出数量
          shouldOutNum:{type:'numberFloat'},

          // 单价
          unitPrice:{type:'priceFloat'},
          // 金额
          amountMoney:{type:'amountFloat'},
          //（实出）数量
          factOutNum:{type:'numberFloat'},
          // 是否赠品
          isGift:{type:'string'},
          // 备注
          remark:{type:'string'},
          // 出库日期
          stockOutDate:{type:'date'},
          // 出库人
          stockOutPersonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockOutPersonCode:{type:'string'},
          stockOutPersonName:{type:'string'},
          //TODO  批次号没有  货位没有
          // 源头单据号
          firstBillCode:{type:'string'},
          //源头单据行号
          firstBillBcode:{type:'string'},
          // 源头单据类型
          firstBillType:{type:'string'},
          // 来源单据号
          srcBillCode:{type:'string'},
          // 来源单据行号
          srcBillBcode:{type:'string'},
          // 来源单据类型
          srcBillType:{type:'string'},
          // 采购出库单据Id
          purchaseReturnOutId:{type:'string'},
          // 批次号
          batchNumId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
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
          // 收货联系人
          receiveContactId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          receiveContactCode:{type:'string'},
          receiveContactName:{type:'string'},
          // 收货联系人电话
          receiveContactPhone:{type:'string'},
          // 计划出库日期
          planOutDate:{type:'date'},
          // 预计到货日期
          expectArrivalDate:{type:'date'},

          provinceId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"2"}',
          },//注册所在省份ID
          provinceName: { type: 'string' },//注册所在省份名称
          provinceCode: { type: 'string' },//注册所在省份名称
          cityId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"3"}'
          },//注册所在城市ID
          cityName: { type: 'string' },//注册所在城市名称
          cityCode: { type: 'string' },
          districtId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"4"}'
          },//注册所在区/县
          districtName: { type: 'string' },//注册所在区/县名称
          districtCode: { type: 'string' },//注册所在区/县名称
          townId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"5"}'
          },//注册所在街道/镇
          townName: { type: 'string' },//注册所在街道/镇名称
          townCode: { type: 'string' },
          //详细地址
          detailAdress: { type: 'string' },
          //收货地址
          arrivalAddress: { type: 'string' },
            goodsVersion:{
                type: 'string',
                required: true
            },  //商品版本号
          batchCodeId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          },//批号
          batchCodeCode:{
            type: 'string',
          },
          batchCodeName:{
            type: 'string',
          },
            
            supplierId: {
                type: 'string',
               /* required: true,*/
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
          projectId:{
            type:'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //项目
          projectCode: {
            type: 'string',
          }, //项目Name
          projectName: {
            type: 'string',
          }, //项目Code
            stockStateId:{
                type:'string',
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
          originalGoodsId:{
            type: 'string',
          },  //原始版本商品
          goodsSelectionDescription:{
            type: 'string',
          },//商品选项描述
        },
        pageSize: 10,
      },
      BomItem: {
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

          enableBatchNumberManage: {
            type: 'string'
          },
          enableBatchNoManage:{
            type: 'string'
          },
            enableInvStatusManage:{
                type: 'string'
            },
            // 计量单位
            unitId: {type: 'string'}, //计量单位
            unitCode: {type: 'string'}, //计量单位
            unitName: {type: 'string'}, //计量单位
          // 应出数量
          shouldOutNum:{type:'numberFloat'},

          // 单价
          unitPrice:{type:'priceFloat'},
          // 金额
          amountMoney:{type:'amountFloat'},
          //（实出）数量
          factOutNum:{type:'numberFloat'},
          // 是否赠品
          isGift:{type:'string'},
          // 备注
          remark:{type:'string'},
          // 出库日期
          stockOutDate:{type:'date'},
          // 出库人
          stockOutPersonId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockOutPersonCode:{type:'string'},
          stockOutPersonName:{type:'string'},
          //TODO  批次号没有  货位没有
          // 源头单据号
          firstBillCode:{type:'string'},
          //源头单据行号
          firstBillBcode:{type:'string'},
          // 源头单据类型
          firstBillType:{type:'string'},
          // 来源单据号
          srcBillCode:{type:'string'},
          // 来源单据行号
          srcBillBcode:{type:'string'},
          // 来源单据类型
          srcBillType:{type:'string'},
          // 采购出库单据Id
          purchaseReturnOutId:{type:'string'},
          // 批次号
          batchNumId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchNumber']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批次号"}',
          },
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
          // 收货联系人
          receiveContactId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          receiveContactCode:{type:'string'},
          receiveContactName:{type:'string'},
          // 收货联系人电话
          receiveContactPhone:{type:'string'},
          // 计划出库日期
          planOutDate:{type:'date'},
          // 预计到货日期
          expectArrivalDate:{type:'date'},

          provinceId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"2"}',
          },//注册所在省份ID
          provinceName: { type: 'string' },//注册所在省份名称
          provinceCode: { type: 'string' },//注册所在省份名称
          cityId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"3"}'
          },//注册所在城市ID
          cityName: { type: 'string' },//注册所在城市名称
          cityCode: { type: 'string' },
          districtId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"4"}'
          },//注册所在区/县
          districtName: { type: 'string' },//注册所在区/县名称
          districtCode: { type: 'string' },//注册所在区/县名称
          townId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"5"}'
          },//注册所在街道/镇
          townName: { type: 'string' },//注册所在街道/镇名称
          townCode: { type: 'string' },
          //详细地址
          detailAdress: { type: 'string' },
          //收货地址
          arrivalAddress: { type: 'string' },

          //------- 630后 新加bom包件字段 -------
          goodsVersion:{
            type: 'string',
            required: true
          },  //商品版本号
          goodsSelection:{
            type: 'string',
            required: true
          },  //商品选配项
          goodsNum: {
            type: 'string',
            required: true
          }, //数量
          parentGoodsId: {
            type: 'string',
            required: true
          }, //商品
          parentGoodsCode: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //商品名称
          parentGoodsName: {
            type: 'string',
            required: true
          }, //商品Code

          parentRowNum: {
            type: 'string',
          }, //母件行号
          childGoodsQty:{
            type: 'numberFloat',
          },

          batchCodeId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['batchCode']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
          },//批号
          batchCodeCode:{
            type: 'string',
          },
          batchCodeName:{
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
          projectId:{
            type:'string',
            "refmodel": JSON.stringify(refinfo['project']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
          }, //项目
          projectCode: {
            type: 'string',
          }, //项目Name
          projectName: {
            type: 'string',
          }, //项目Code
            stockStateId:{
                type:'string',
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
          originalGoodsId:{
            type: 'string',
          },  //原始版本商品
          goodsSelectionDescription:{
            type: 'string',
          },//商品选项描述
        },
        pageSize: 10,
      },
      referPurchaseorder:{
        meta: {
          orderItems:{
            type:"child",
            meta:orderItemsmeta.meta
          },
          orderItemBoms:{
            type:"child",
            meta:BomItemsmeta.meta
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
          supplierId:{
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
          totalGoodsNum: {type: 'numberFloat', required: true}, //总数量
          totalAmountMoney: {type: 'amountFloat', required: true}, //总金额
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
          supplierId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['department']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
          }, // 供应商
          supplierName:{type:"string"},//供应商Name
          supplierCode:{type:"string"},//供应商Code

          stockOutStorageId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['person']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"库管员"}',
          },
          stockOutStorageName:{type:"string"},
          stockOutStorageCode:{type:"string"},

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
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{}'}, //客户
        },

        pageSize: 10
      },
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }
        }
      }
    },
    searchs: {
      search1: [
        {
          type: "text",
          key: "stockOutCode",
          label: "出库单号"
        },
        {
          type: "daterange",
          key: "signDate",
          label: "单据日期"
        },
        {
          type: "refer",
          key: "stockOrg",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel":"03"
          }
        },
        {
          type: "refer",
          key: "stockOutStorage",
          label: "出库仓库",
          refinfo: "warehouse",
          domid:"stockOutStorage--id"
        },
        {
          type: "refer",
          key: "supplier",
          label: "供应商",
          refinfo: "suppliers",
        },
        {
          type: "refer",
          key: "purchasePerson",
          label: "采购员",
          refinfo: "person"
        },
        {
          type: "refer",
          key: "purchaseDept",
          label: "采购部门",
          refinfo: "department"
        },
        {
          type: "refer",
          key: "outBillItems--goods",
          label: "库存商品",
          refinfo: "goods"
        },
        {
          type: "combo",
          key: "statusId",
          label: "单据状态",
          url: window.pathMap.base + '/cust-doc-defs/cust_doc_code?cust_doc_code=QY106',
          namefield: "name",
          valuefield: "code",
          hasAll: true
        },
      ],
      search2: [
        {
          type: "refer",
          key: "receiveStorageOrgId",
          label: "发货库存组织",
          refinfo: "organization_ocm",
          clientParam:{"EQ_orgFuncRel":"03","EQ_isEnable":"1"},
        },
        {
          type: "refer",
          key: "receiveStorageId",
          label: "发货仓库",
          refinfo: "warehouse",
          domid:"storehouse2"
        },
        {
          type: "text",
          key: "purchaseCode",
          label: "订单号"
        },
        {
          type: "daterange",
          key: "orderDate",
          label: "订单日期"
        },
        {
          type: "text",
          key: "otherOrderNum",
          label: "对方订单号"
        },
        {
          type: "refer",
          key: "supplierId",
          label: "供应商",
          refinfo:"suppliers"
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
          click: "batchdel"
        },
        {
          key: "sign",
          label: "签字",
          iconCls: "icon-edit",
          click: "signbtn"
        },
        {
          key: "cancelsign",
          label: "取消签字",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "cancelsignbtn"
        },
      ],
      button2: [{
      	key: "autonum",
        label: "自动取数",
        click: "autonum"
      },
        {
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
        // {
        // key: "addrow",
        // label: "增行",
        // iconCls: "icon-plus",
        // click: "showAddItemsRef"
        // },
        // {
        //   key: "delrow",
        //   label: "删行",
        //   iconCls: "icon-shanchu1",
        //   click: "delItems",
        // },
        // {
        //   key: "autoNumber",
        //   label: "自动取数",
        //   iconCls: "icon-tuihuoshouhou",
        //   click: "autoNumber",
        // }
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
          key: "stockOutCode",
          label: "出库单号",
        },
        {
          type: "date",
          key: "billDate",
          label: "单据日期",
        },
        {
          type: "refer",
          key: "stockOrgId",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam:{
            "EQ_orgFuncRel":"03"
          },
          domid:"cardStockOrgId",
          referId : "cardStockOrgId"
        },
        {
          type: "refer",
          key: "stockOutStorageId",
          label: "出库仓库",
          refinfo: "warehouse",
          referId : "stockOutStorageId"
        },
        {
          type: "refer",
          key: "supplierId",
          label: "供应商",
          refinfo: "suppliers",
          enable:false
        },
        {
          type: "refer",
          key: "purchasePersonId",
          label: "业务员",
          refinfo: "person"
        },
        {
          type: "refer",
          key: "purchaseDeptId",
          label: "部门",
          refinfo: "department"
        },
        {
          type: "refer",
          key: "storageAdminId",
          label: "库管员",
          refinfo: "person"
        },
        {
          type: "combo",
          key: "statusCode",
          label: "单据状态",
          defaultvalue: "01",
          dataSource: [
            { value: '01', name: '自由态' },

          ],
          enable:false
        },
        {
          type: "date",
          key: "lastReceiveDate",
          label: "计划到货日期",
        },
        {
          type: "textreadonly",
          key: "totalShouldOutNum",
          label: "总应出数量",
          enable:false
        },
        {
          type: "textreadonly",
          key: "totalFactOutNum",
          label: "总实出数量",
          enable:false
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
      ]
    },
    details: {
      detail1:
        [
          {
            key: "stockOutCode",
            label: "出库单号",
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
            key: "stockOutStorageName",
            label: "出库仓库",
          },
          {
            key: "supplierName",
            label: "供应商",
          },
          {
            key: "purchasePersonName",
            label: "业务员",
          },
          {
            key: "purchaseDeptName",
            label: "部门",
          },
          {
            key: "storageAdminName",
            label: "库管员",
          },
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
            key: "totalShouldOutNum",
            label: "总应出数量",
          },
          {
            key: "totalFactOutNum",
            label: "总实出数量",
          },
          {
            key: "logisticsCompanyName",
            label: "配送物流公司",
          },
          {
            key: "remark",
            label: "备注",
          },
        ]
    },
    grids: {
      grid1: {
        domid: "grid_complex_dom",
        umeta: {
          "id": "grid_complex",
          "data": "purchaseoutList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
        },
        columns: [
          {
            "field": "stockOutCode",
            "dataType": "String",
            "title": "出库单号",
            "renderType": "detailRender",
          },
          {
            "field": "billDate",
            "dataType": "Date",
            "title": "单据日期",
          },
          {
            "field": "stockOrgName",
            "dataType": "String",
            "title": "库存组织",
          },
          {
            "field": "stockOutStorageName",
            "dataType": "String",
            "title": "仓库",
          },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供应商",
          },
          {
            "field": "purchasePersonName",
            "dataType": "String",
            "title": "业务员",
          },
          {
            "field": "purchaseDeptName",
            "dataType": "String",
            "title": "部门",
          },
          {
            "field": "storageAdminName",
            "dataType": "String",
            "title": "库管员",
          },
          {
            "field": "status",
            "dataType": "String",
            "title": "单据状态",
            "renderType":"statusRender",
          },
          {
            "field": "totalShouldOutNum",
            "dataType": "String",
            "title": "总应出数量",
          },
          {
            "field": "totalFactOutNum",
            "dataType": "String",
            "title": "总实出数量",
          },
          {
            "field": "logisticsCompanyName",
            "dataType": "String",
            "title": "配送物流公司",
          },
          {
            "field": "cancelReason",
            "dataType": "String",
            "title": "取消原因",
          },
          {
            "field": "remark",
            "dataType": "String",
            "title": "备注",
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
      //商品信息
      gridGoodsEdit: {
        domid: "grid_purchaseorder2",
          umeta: {
          "id": "grid_complex_edit",
            "data": "purchaseoutItems",
            "type": "grid",
            "editable": true,
            "multiSelect": true,
            "onBeforeEditFun":"beforeEditCheck"
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
            "field": "shouldOutNum",
            "dataType": "String",
            "title": "应出数量",
            "editable": false,
          },
          {
            "field": "factOutNum",
            "dataType": "String",
            "title": "实出数量",
          },
          {
            "field": "unitName",
            "dataType": "String",
            "title": "单位",
            "editable": false
          },
          {
            "field": "unitPrice",
            "dataType": "String",
            "title": "单价",
            "editable": false
          },
          {
            "field": "amountMoney",
            "dataType": "String",
            "title": "金额",
            "editable": false,
          },
          {
            field: "goodsSelection",
            dataType: "String",
            title: "商品选配",
            renderType: "goodsOptDetails",
            editable: false,
          },
            {
                "field": "goodsVersion",
                "dataType": "String",
                "title": "商品多版本",
                "editable": false,
                "visible": true,
            },
            {
                "field": "batchCodeId",
                "dataType": "String",
                "title": "批号",
                "visible": false,
                "renderType": "ncReferRender",
                "editType": "ncReferEditType",
                "showField": "batchCodeName",
                "editOptions": {
                    "validType": "string"
                }
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
          {
            "field": "batchNumId",
            "dataType": "String",
            "title": "批次号",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "batchNumName",
            "editOptions": {
              "validType": "string"
            }
          },
          {
            "field": "goodsPositionId",
            "dataType": "String",
            "title": "货位",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "goodsPositionName",
            "editOptions": {
              "validType": "string"
            }
          },
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
            "field": "stockOutPersonName",
            "dataType": "String",
            "title": "出库人",
            "editable": false,
          },
          {
            "field": "stockOutDate",
            "dataType": "Date",
            "title": "出库时间",
            "editable": false,
          },
        ]
      },
      gridGoodsDetail: {
        domid: "grid_purchaseorder3",
          umeta: {
          "id": "grid_complex_detail",
            "data": "purchaseoutItems",
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
                  field: "parentRowNum",
                  title: "所属商品行号",
                  dataType: "Integer",
                  editable: false
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
              "field": "shouldOutNum",
              "dataType": "String",
              "title": "应出数量",
              "editable": false,
            },
            {
              "field": "factOutNum",
              "dataType": "String",
              "title": "实出数量",
              "editable": false,
            },
            {
              "field": "unitName",
              "dataType": "String",
              "title": "单位",
              "editable": false
            },
            {
              "field": "unitPrice",
              "dataType": "String",
              "title": "单价",
              "editable": false
            },
            {
              "field": "amountMoney",
              "dataType": "String",
              "title": "金额",
              "editable": false,
            },
            {
              field: "goodsSelection",
              dataType: "String",
              title: "商品选配",
              renderType: "goodsOptDetails",
            },
              {
                  "field": "goodsVersion",
                  "dataType": "String",
                  "title": "商品多版本",
                  "editable": false,
                  "visible": true,
              },
              {
                  "field": "batchCodeName",
                  "dataType": "String",
                  "title": "批号",
                  "editable": false,
                  "visible": false,
              },
              {
                  "field": "supplierName",
                  "dataType": "String",
                  "title": "供应商",
                  "visible": false,
                  "editable": false,
              },
              {
                  "field": "projectName",
                  "dataType": "String",
                  "title": "项目",
                  "editable": false,
                  "visible": false,
              },
              {
                  "field": "stockStateName",
                  "dataType": "String",
                  "title": "库存状态",
                  "editable": false,
                  "visible": false,
              },
              {
                  "field": "customerName",
                  "dataType": "String",
                  "title": "客户",
                  "editable": false,
                  "visible": false,
              },
            {
              "field": "batchNumName",
              "dataType": "String",
              "title": "批次号",
              "editable": false,
            },
            {
              "field": "goodsPositionName",
              "dataType": "String",
              "title": "货位",
              "editable": false,
            },
            {
              "field": "isGift",
              "dataType": "checkbox",
              "title": "赠品",
              "renderType":"booleanRender",
              "editable": false,
            },
            {
              "field": "remark",
              "dataType": "String",
              "title": "备注",
              "editable": false,
            },
            {
              "field": "stockOutPersonName",
              "dataType": "String",
              "title": "出库人",
              "editable": false,
            },
            {
              "field": "stockOutDate",
              "dataType": "Date",
              "title": "出库时间",
              "editable": false,
            },
          ]
      },
      //bom结构信息
      gridBomEdit:  {
        domid: "grid_purchaseorder2",
          umeta: {
            "id": "grid_complex_bomEdit",
            "data": "BomItems",
            "type": "grid",
            "editable": true,
            "multiSelect": true,
            "onBeforeEditFun":"beforeEditCheck"
        },
        columns: [
          {
            "field": "rowNum",
            "dataType": "String",
            "title": "行号",
            "editable": false,
          },
            {
                field: "parentRowNum",
                title: "所属商品行号",
                dataType: "Integer",
                editable: false
            },
          {
            "field": "parentGoodsName",
            "dataType": "String",
            "title": "母件商品名称",
            "editable": false
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
            "field": "shouldOutNum",
            "dataType": "String",
            "title": "应出数量",
            "editable": false,
          },
          {
            "field": "factOutNum",
            "dataType": "String",
              "editable": false,
            "title": "实出数量",
          },
          {
            "field": "unitName",
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
            "field": "amountMoney",
            "dataType": "String",
            "title": "金额",
            "editable": false,
          },
            {
                "field": "goodsVersion",
                "dataType": "String",
                "title": "商品多版本",
                "editable": false,
                "visible": true,
            },
          {
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
          },
          {
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
          },
            {
                "field": "batchCodeId",
                "dataType": "String",
                "title": "批号",
                "renderType": "ncReferRender",
                "editType": "ncReferEditType",
                "showField": "batchCodeName",
                "editOptions": {
                    "validType": "string"
                },
                "visible": false,
              "editable": false,
            },
            {
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
            },
          {
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
          },
            {
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
            },
            {
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
            },
          {
            "field": "remark",
            "dataType": "String",
            "title": "备注",
              "editable": false,
          },
          {
            "field": "stockOutPersonName",
            "dataType": "String",
            "title": "出库人",
            "editable": false,
          },
          {
            "field": "stockOutDate",
            "dataType": "Date",
            "title": "出库时间",
            "editable": false,
          },
        ]
      },
      gridBomDetail: {
        domid: "grid_purchaseorder3",
          umeta: {
            "id": "grid_complex_bomDetail",
            "data": "BomItems",
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
              "field": "parentGoodsName",
              "dataType": "String",
              "title": "母件商品名称",
              "editable": false
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
              "field": "shouldOutNum",
              "dataType": "String",
              "title": "应出数量",
              "editable": false,
            },
            {
              "field": "factOutNum",
              "dataType": "String",
              "title": "实出数量",
              "editable": false,
            },
            {
              "field": "unitName",
              "dataType": "String",
              "title": "单位",
              "editable": false
            },
            {
              "field": "unitPrice",
              "dataType": "String",
              "title": "单价",
              "editable": false
            },
            {
              "field": "amountMoney",
              "dataType": "String",
              "title": "金额",
              "editable": false,
            },
              {
                  "field": "goodsVersion",
                  "dataType": "String",
                  "title": "商品多版本",
                  "editable": false,
                  "visible": true,
              },
            {
              "field": "batchNumName",
              "dataType": "String",
              "title": "批次号",
              "editable": false,
            },
            {
              "field": "goodsPositionName",
              "dataType": "String",
              "title": "货位",
              "editable": false,
            },
              {
                  "field": "batchCodeName",
                  "dataType": "String",
                  "title": "批号",
                  "editable": false,
                  "visible": false,
              },
              {
                  "field": "supplierName",
                  "dataType": "String",
                  "title": "供应商",
                  "visible": false,
                  "editable": false,
              },
              {
                  "field": "projectName",
                  "dataType": "String",
                  "title": "项目",
                  "editable": false,
                  "visible": false,
              },
              {
                  "field": "stockStateName",
                  "dataType": "String",
                  "title": "库存状态",
                  "editable": false,
                  "visible": false,
              },
              {
                  "field": "customerName",
                  "dataType": "String",
                  "title": "客户",
                  "editable": false,
                  "visible": false,
              },
            {
              "field": "remark",
              "dataType": "String",
              "title": "备注",
              "editable": false,
            },
            {
              "field": "stockOutPersonName",
              "dataType": "String",
              "title": "出库人",
              "editable": false,
            },
            {
              "field": "stockOutDate",
              "dataType": "Date",
              "title": "出库时间",
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
            "field": "orderCode",
            "dataType": "String",
            "title": "订单号",
          },
          {
            "field": "orderDate",
            "dataType": "Date",
            "title": "订单日期",
          },
          {
            "field": "otherOrderNum",
            "dataType": "String",
            "title": "对方订单号"
          },
          {
            "field": "purchaseOrgName",
            "dataType": "String",
            "title": "采购组织",
          },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供应商",
          },
          {
            "field": "purchasePersonName",
            "dataType": "String",
            "title": "业务员",
          },
          {
            "field": "purchaseDeptName",
            "dataType": "String",
            "title": "部门",
          },
          {
            "field": "remark",
            "dataType": "string",
            "title": "备注",
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
            "field": "rowNum",
            "dataType": "String",
            "title": "行号",
            "width": "60px"
          },
          {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编号",
          },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          },
          {
            "field": "goodsNum",
            "dataType": "String",
            "title": "退货数量",
            "width": "100px"
          },
          {
            "field": "unitPrice",
            "dataType": "String",
            "title": "单价",
            "width": "60px"
          },
          {
            "field": "amountMoney",
            "dataType": "String",
            "title": "金额",
            "width": "60px"
          },
          {
            "field": "receiveStorageOrgName",
            "dataType": "String",
            "title": "发货库存组织",
          },
          {
            "field": "receiveStorageName",
            "dataType": "String",
            "title": "发货仓库",
          },
          {
            "field": "isGift",
            "dataType": "checkbox",
            "title": "赠品",
            "renderType":"disableBooleanRender",
            "editable": false,
            "width": "60px"
          },
          {
            "field": "couldOutNum",
            "dataType": "String",
            "title": "可出库数量",
          },
          {
            "field": "returnGoodsAmount",
            "dataType": "String",
            "title": "累计已出库数量",
              "width":"170px",
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
        columns: [
          {
            "field": "orderCode",
            "dataType": "String",
            "title": "订单号",
          },
          {
            "field": "orderDate",
            "dataType": "Date",
            "title": "订单日期",
          },
          {
            "field": "otherOrderNum",
            "dataType": "String",
            "title": "对方订单号"
          },
          {
            "field": "purchaseOrgName",
            "dataType": "String",
            "title": "采购组织",
          },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供应商",
          },
          {
            "field": "purchasePersonName",
            "dataType": "String",
            "title": "业务员",
          },
          {
            "field": "purchaseDeptName",
            "dataType": "String",
            "title": "部门",
          },
          {
            "field": "remark",
            "dataType": "string",
            "title": "备注",
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
            "field": "rowNum",
            "dataType": "String",
            "title": "行号",
            "width": "60px"
          },
          {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编号",
          },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          },
          {
            "field": "goodsNum",
            "dataType": "String",
            "title": "退货数量",
            "width": "100px"
          },
          // {
          //   "field": "unit",
          //   "dataType": "String",
          //   "title": "单位",
          //   "width": "60px"
          // },
          {
            "field": "unitPrice",
            "dataType": "String",
            "title": "单价",
            "width": "60px"
          },
          {
            "field": "amountMoney",
            "dataType": "String",
            "title": "金额",
            "width": "60px"
          },
          {
            "field": "receiveStorageOrgName",
            "dataType": "String",
            "title": "发货库存组织",
          },
          {
            "field": "receiveStorageName",
            "dataType": "String",
            "title": "发货仓库",
          },
          {
            "field": "isGift",
            "dataType": "checkbox",
            "title": "赠品",
            "renderType":"disableBooleanRender",
            "editable": false,
            "width": "60px"
          },
          {
            "field": "shouldOutNum",
            "dataType": "String",
            "title": "可出库数量",
          },
          {
            "field": "returnGoodsAmount",
            "dataType": "String",
            "title": "累计已出库数量",
          },
          {
            "field": "operation",
            "dataType": "String",
            "title": "操作",
            "renderType": "rowRemove",
            "fixed": true,
            "width": "100px"
          },
        ]
      },
    }
  };
  return new basemodel(model);
});