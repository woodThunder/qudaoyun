define(["ocm_basemodel"], function (basemodel) {
  var purchasestatus = CONST.PURCHASE.PURCHASESTATUS;
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
      goodsNum: {type: 'float',required: true}, //数量
      couldOutNum : {type: 'float',required: true}, //可退货数量
      orderDate: {type: 'string', required: true}, //订单日期
      detailAddr: {type: 'string', required: true}, //收货地址
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
      customerId: {
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['customer']),
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
    pageSize: 10
  };
  var orderBomItemsmeta = {
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
        'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1","EQ_isServiceType":"0"}'}, //商品
      goodsName: {type: 'string',required: true}, //商品名称
      goodsCode: {type: 'string',required: true}, //商品Code

      goodsNum: {type: 'float',required: true}, //数量

      orderDate: {type: 'string', required: true}, //订单日期

      detailAddr: {type: 'string', required: true}, //收货地址

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
      customerId: {
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['customer']),
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

        //------- 630后 新加bom包件字段 -------
        goodsVersion:{
          type: 'string',
          required: true
        },  //商品版本号
        goodsSelection:{
          type: 'string',
          required: true
        },  //商品选配项
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
          type: 'float',
        },
        parentRowNum: {
          type: 'string',
        }, //母件行号
    },
    pageSize: 10
  };
  var model = {
    metas: {
      complex: {
        meta: {
          id: {
            type: 'string'
          }, //id
            state : {
                type : 'Integer',
            },
          purchaseOrgId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{"EQ_orgFuncRel":"04"}',
          }, //采购组织
          purchaseOrgName:{type: 'string', required: true},
          // orderTypeCode: {type: 'string', required: true}, //订单类型
          // orderTypeName: {type: 'string', required: true}, //订单类型
          orderCode: {type: 'string', required: true}, //订单编码
          otherOrderNum: {type: 'string'}, //对方订单号
          orderDate: {type: 'string', required: true}, //订单日期
          purchaseTypeCode: {type: 'date', required: true}, //采购类型
          purchaseTypeName: {type: 'string', required: true}, //采购类型
          tranTypeId: {
            type: 'string',
            required: true,
            default: "PurchaseReturnBill",
            'refmodel': JSON.stringify(refinfo['trantype']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"订单类型"}',
            'refparam': '{"EQ_billTypeId":"PurchaseReturnBill","EQ_trantypeExtends.fieldName":"isReturn","EQ_trantypeExtends.fieldValue":"1"}'
          }, //交易id
          tranTypeName: {type: 'string', required: true}, //交易Name
          tranTypeCode: {type: 'string', required: true}, //交易Code
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
          purchasePersonCode: {type: 'string', required: true},
          purchasePersonName: {type: 'string', required: true},
          purchaseDeptId: {
            type: 'string',
            'refmodel':JSON.stringify(refinfo['department']),
            'refcfg':'{"ctx":"/uitemplate_web"}',
          }, //采购部门
          purchaseDeptName: {type: 'string', required: true},
          purchaseDeptCode: {type: 'string', required: true},
          totalGoodsNum: {type: 'float', required: true}, //总数量
          totalAmountMoney: {type: 'float', required: true}, //总金额
          currencyId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['currency']),
            "refcfg":'{"ctx":"/uitemplate_web","refName":"请选择"}',
            "refparam":'{}'}, //币种
          currencyName:{type: 'string', required:true},
          status: {type: 'string', required: true,default: "01"}, //单据状态

          operationCode: {type: 'string'},  //操作code

          approveStatus: {type: 'string', required: true}, //审批状态

          isClosed: {type: 'string'}, //关闭状态
          approvalSummary: {type: 'string'}, //审批批语
          refusedReason: {type: 'string'}, //拒单原因
          confirmPerson: {type: 'string',
            'refmodel':JSON.stringify(refinfo['person']),
            'refcfg':'{"ctx":"/uitemplate_web"}',}, //确认人
          remark: {type: 'string'}, //备注
          isReturned: {type: 'string', required: true,default:"1"}, //是否退货
          returnedOrder: {type: 'string',
            'refmodel':JSON.stringify(refinfo['accountManager']),
            'refcfg':'{"ctx":"/uitemplate_web"}',
          },
          //创建人
          creator: {
            type: 'string'
          },
          //创建时间
          creationTime: {
            type: 'datetime'
          },
          //修改人
          modifier: {
            type: 'string'
          },
          //修改时间
          modifiedTime: {
            type: 'datetime'
          },
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        meta: {
          code: {
            type: 'string'
          }, //id
          displayName: {
            type: 'string'
          },
          version: {
            type: 'string'
          },
          rowNum: {type: 'string',required: true}, //行号
          goodsId: {type: 'string',required: true}, //商品
          goodsName: {type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1",,"EQ_isServiceType":"0"}'}, //商品名称
          goodsCode: {type: 'string',required: true}, //商品Code
          unitId: {type: 'string', required: true}, //计量单位
          unitCode: {type: 'string', required: true}, //计量单位
          unitName: {type: 'string', required: true}, //计量单位
          goodsNum: {type: 'float',required: true}, //数量
          unitPrice: {type: 'float'}, //单价
          amountMoney: {type: 'float',required: true}, //金额
          isGift: {type: 'float',required: true,default: "0"}, //是否赠品
            goodsVersion:{
                type:'string',
                required: true
            }, //商品版本号
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
          sourceType: {type: 'string'}, //来源单据类型
          sourceId: {type: 'string'}, //来源单据号
          sourceLineNum: {type: 'string'}, //来源单据行号
          isClosed: {type: 'string',default: "0"}, //商品状态
          stockStatus: {type: 'string'}, //库存状态
          payStatus: {type: 'string'}, //付款状态
          arrivalBelongId: {type: 'string',required: true}, //发货地归属
          arrivalBelongName: {type: 'string',required: true},
          arrivalBelongCode: {type: 'string',required: true},
          demandStockOrgId:{
            type: 'string',
            required:true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          },
          demandStockOrgName:{type: 'string',},
          demandStockOrgCode:{type: 'string',},//需求库存组织

          receiveStorageOrgId: {
            type: 'string',
            required:true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //发货库存组织
          receiveStorageOrgName:{type: 'string',},
          receiveStorageOrgCode:{type: 'string',},
          receiveStorageId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{}'
          }, //发货仓库
          receiveStorageName:{type: 'string',},
          receiveStorageCode:{type: 'string',},
          customerId: { type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{}'}, //客户
          customerCode:{type: 'string',},
          customerName:{type: 'string',},

          detailAddr: {
            type: 'string',
            required: true,
          },//收货地址

          countryId: {
            type: 'string',
            // required: true,
            "refmodel": JSON.stringify(refinfo['country']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_isEnable":"1"}',
          },//注册国别ID
          countryName: { type: 'string' },//注册国家名称
          countryCode: { type: 'string' },//注册国家名称
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
          receiveContact: {type: 'string'}, //收货联系人
          receiveContactPhone: {type: 'string'}, //收货联系人电话

          receiveAddress: {type: 'string',required: true}, //收货地址
          // addStorageAmount: {type: 'float'}, //累计入库数量
          returnGoodsAmount: {type: 'float'}, //累计退货出库数量
          // 选配 id
          baseGoodsOptId: {
            type: 'string'
          },
          name: {
            type: 'string',
            required: true
          }, //名称
          // productid: {type: 'string',required:true},//销售产品id
          productid: {
            type: 'string',
             'refmodel':JSON.stringify(refinfo['goods']),
             'refcfg':'{"ctx":"/uitemplate_web"}',
             'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          },
          productidCode: {
            type: 'string'
          },
          productidName: {
            type: 'string'
          },
          productidStandardName: {
            type: 'string'
          },
          productidSaleSeriesId: {
            type: 'string'
          },
          productidSaleSeriesName: {
            type: 'string'
          },
          num: {
            type: 'string',
            required: true
          }, //数量
          dr: {
            type: 'integer'
          },
          //创建人
          creator: {
            type: 'string'
          },
          //创建时间
          creationTime: {
            type: 'datetime'
          },
          //修改人
          modifier: {
            type: 'string'
          },
          //修改时间
          modifiedTime: {
            type: 'datetime'
          },
          originalGoodsId:{
            type: 'string',
          },  //原始版本商品
          goodsSelectionDescription:{
            type: 'string',
          },//商品选项描述
          goodsSelection:{
            type:'string',
          }, //选配项
          isOptional : {
            type : "Integer"
          },
        },
        pageSize: 10,
      },
      BomItem:{
        meta: {
          rowNum: {
            type: 'string',
            required: true
          }, //行号
          goodsId: {
            type: 'string',
            required: true
          }, //商品
          goodsName: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            'refparam': '{"EQ_isEnable":"1"}'
          }, //商品名称
          goodsCode: {
            type: 'string',
            required: true
          }, //商品Code
          unitId: {
            type: 'string',
            required: true
          }, //计量单位
          unitCode: {
            type: 'string',
            required: true
          }, //计量单位
          unitName: {
            type: 'string',
            required: true
          }, //计量单位
          goodsNum: {
            type: 'float',
          }, //数量
          unitPrice: {
            type: 'float',
          }, //单价
          amountMoney: {
            type: 'float',
          }, //金额
          isGift: {
            type: 'float',
            required: true,
            default: "0"
          }, //是否赠品
          sourceType: {
            type: 'string'
          }, //来源单据类型
          sourceId: {
            type: 'string'
          }, //来源单据号
          sourceLineNum: {
            type: 'string'
          }, //来源单据行号
          isClosed: {
            type: 'string',
            default: "0"
          }, //商品状态
          stockStatus: {
            type: 'string'
          }, //库存状态
          payStatus: {
            type: 'string'
          }, //付款状态
          arrivalBelongId: {
            type: 'string',
            required: true
          }, //发货地归属
          arrivalBelongName: {
            type: 'string',
            required: true
          },
          arrivalBelongCode: {
            type: 'string',
            required: true
          },
          demandStockOrgId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          },
          demandStockOrgName: {
            type: 'string',
          },
          demandStockOrgCode: {
            type: 'string',
          }, //需求库存组织
          receiveStorageOrgId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //发货库存组织
          receiveStorageOrgName: {
            type: 'string',
          },
          receiveStorageOrgCode: {
            type: 'string',
          },
          receiveStorageId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //发货仓库
          receiveStorageName: {
            type: 'string',
          },
          receiveStorageCode: {
            type: 'string',
          },
          customerId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //客户
          customerCode: {
            type: 'string'
          }, //客户编码
          customerName: {
            type: 'string'
          }, //客户名称
          countryId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['country']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_isEnable":"1"}',
          }, //注册国别ID
          countryName: {
            type: 'string'
          }, //注册国家名称
          countryCode: {
            type: 'string'
          }, //注册国家名称
          provinceId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"1"}',
          }, //注册所在省份ID
          provinceName: {
            type: 'string'
          }, //注册所在省份名称
          provinceCode: {
            type: 'string'
          }, //注册所在省份名称
          cityId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"2"}'
          }, //注册所在城市ID
          cityName: {
            type: 'string'
          }, //注册所在城市名称
          cityCode: {
            type: 'string'
          },
          districtId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"3"}'
          }, //注册所在区/县
          districtName: {
            type: 'string'
          }, //注册所在区/县名称
          districtCode: {
            type: 'string'
          }, //注册所在区/县名称
          townId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['region']),
            "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
            "refparam": '{"EQ_areaLevel":"4"}'
          }, //注册所在街道/镇
          townName: {
            type: 'string'
          }, //注册所在街道/镇名称
          townCode: {
            type: 'string'
          },
          receiveContact: {
            type: 'string'
          }, //收货联系人
          receiveContactPhone: {
            type: 'string'
          }, //收货联系人电话
          receiveAddress: {
            type: 'string',
            required: true
          }, //收货地址
          detailAddr: {
            type: 'string',
            required: true,
          },
          returnGoodsAmount: {
            type: 'float'
          }, //累计退货出库数量
          name: {
            type: 'string',
            required: true
          }, //名称
          productid: {
            type: 'string',
             'refmodel':JSON.stringify(refinfo['goods']),
             'refcfg':'{"ctx":"/uitemplate_web"}',
              'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1","EQ_isServiceType":"0"}'
          },
          productidCode: {
            type: 'string'
          },
          productidName: {
            type: 'string'
          },
          productidStandardName: {
            type: 'string'
          },
          productidSaleSeriesId: {
            type: 'string'
          },
          productidSaleSeriesName: {
            type: 'string'
          },
          dr: {
            type: 'integer'
          },
          //创建人
          creator: {
            type: 'string'
          },
          //创建时间
          creationTime: {
            type: 'datetime'
          },
          //修改人
          modifier: {
            type: 'string'
          },
          //修改时间
          modifiedTime: {
            type: 'datetime'
          },

          //------- 630后 新加bom包件字段 -------

          goodsVersion:{
            type: 'string',
            required: true
          },  //商品版本号
          goodsSelection:{
            type: 'string',
            required: true
          },  //商品选配项
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
            type: 'float',
          },
          originalGoodsId:{
            type: 'string',
          },  //原始版本商品
          goodsSelectionDescription:{
            type: 'string',
          },//商品选项描述
          // 选配 id
          baseGoodsOptId: {
            type: 'string'
          },
          persistStatus: {
             type: 'string',
          }
        },
        pageSize: 10,
      },

      refcomplex: {
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
            'refmodel': JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          stockInStorageCode: {type: 'string'},
          stockInStorageName: {type: 'string'},
          ifSlotManage: {
            type: 'string'
          },
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
          // //（最晚）预计到货日期
          // lastReceiveDate:{type:'date'},
          // 发货日期
          deliverDate:{type:'date'},
          // 入库状态（QY107）
          stockInStatus:{type:'string'},
          // 状态
          status:{type:'string'/*,required: true,*/},
          statusCode:{type:'string'/*,required: true,*/},
          // 取消原因
          cancelReason:{type:'string'},
          // 总应入数量
          shouldInAmount:{type:'float'/*,required: true,*/},
          // 总实入数量
          factInAmount:{type:'float'/*,required: true,*/},
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
          // 承运商
          carrierId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['department']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"部门"}',
          },
          carrierCode:{type:"string",},
          carrierName:{type:"string",},
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
      refcomplexItem: {
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
          productId: {
            type: 'string'
          },
          productLineId: {
            type: 'string'
          },
          // 计量单位
          unit: {type: 'string'}, //计量单位
          // 应收数量
          shouldInAmount:{type:'float'},
          // 单价
          unitPrice:{type:'float'},
          // 金额
          amountMoney:{type:'float'},
          //（实收）数量
          factInAmount:{type:'float'},
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
          //TODO  批次号没有  货位没有
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
            meta:orderBomItemsmeta.meta
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
            default: "PurchaseReturnBill",
            'refmodel': JSON.stringify(refinfo['trantype']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"订单类型"}',
            'refparam': '{"EQ_billTypeId":"PurchaseReturnBill"}'
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
          totalGoodsNum: {type: 'float', required: true}, //总数量
          totalAmountMoney: {type: 'float', required: true}, //总金额
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

          stockInStorageId:{
            type: 'string',
            'refmodel': JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
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
          }, //发货库存组织
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
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isEnable":"1","EQ_isServiceType":"0"}'
          }
        }
      }
    },
    searchs: {
      search1: [
        {
          type: "text",
          key: "orderCode",
          label: "订单编号",
        },
        {
          key: "orderDate",
          type: "daterange",
          label: "订单日期",
        },
        {
          type: "refer",
          key: "purchaseOrg",
          label: "采购组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel":"04"
          },
        },
        {
          type: "text",
          key: "otherOrderNum",
          label: "对方订单号",
        },
        {
          type: "refer",
          key: "tranType",
          label: "交易类型",
          refinfo: "trantype",
          refName: "交易类型"
        },
        {
          type: "refer",
          key: "supplier",
          label: "供应商名称",
          refinfo: "suppliers",
          refName:"供应商"
        },
        {
          type:"refer",
          key:"purchasePerson",
          label:"采购员",
          refinfo:"person",
          refName:"采购员"
        },
        {
          type:"refer",
          key:"purchaseDept",
          label:"采购部门",
          refinfo:"department",
          refName:"采购部门"
        },
        {
          type: "combo",
          key: "status",
          label: "订单状态",
          dataSource: [
            {value: '01', name: '待处理'},
            {value: '02', name: '已提交审批'},
            {value: '03', name: '审批中'},
            {value: '04', name: '审批通过'},
            {value: '05', name: '审批不通过'},
            {value: '06', name: '部分入库'},
            {value: '07', name: '全部入库'},
            {value: '08', name: '部分出库'},
            {value: '09', name: '全部出库'},
          ],
          hasAll: true,
        },
        {
          type: "refer",
          key: "orderItems--goods",
          label: "商品",
          refinfo: "goods",
          clientParam: {
            "EQ_isSaleProduct":"1",
            "EQ_isEnable":"1","EQ_isServiceType":"0"
          },
        },
      ],
      search2: [
        {
          type: "refer",
          key: "receiveStorageOrgId",
          label: "库存组织",
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
        key: "addref",
        label: "采购订单参照新增",
        iconCls: "icon-plus",
        click: "showAddBillPanelRef"
      },
      {
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "showAddBillPanel"
      },
        {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        },
        {
          key: "open",
          label: "打开",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "openOrder"
        },
        {
          key: "close",
          label: "关闭",
          iconCls: "icon-tubiao-guanbi-xianxing",
          click: "closeOrder"
        },
        {
          key: "submit",
          label: "提交",
          iconCls: "icon-tubiao-shenhe",
          click: "submitBtn"
        },
        {
          key: "back",
          label: "收回",
          iconCls: "icon-tubiao-shenhe",
          click: "backBtn"
        },
        {
          key: "approve",
          label: "审批通过",
          iconCls: "icon-tubiao-shenhe",
          click: "approve"
        },
          {
              key: "disapprove",
              label: "审批不通过",
              iconCls: "icon-tubiao-shenhe",
              click: "disapprove"
          },
        {
          key: "unapprove",
          label: "取消审核",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "unapprove"
        // },
        // {
        //   key: "freeze",
        //   label: "冻结",
        //   iconCls: "icon-tubiao-dongjie",
        //   click: "freeze"
        // },
        // {
        //   key: "unfreeze",
        //   label: "解冻",
        //   iconCls: "icon-tubiao-dongjiejiedong",
        //   click: "unfreeze"
        },

        {
          key: "import",
          label: "导入",
          iconCls: "icon-import",
          click: "importHandle"
        },
        {
          key: "export",
          label: "导出",
          iconCls: "icon-export",
          click: "exportHandle"
        },
      ],
      button2: [{
        key: "cancel",
        label: "取消",
        click: "cancelBillRef"
      },
        {
          key: "save",
          label: "保存",
          click: "saveBill",
          cls: "ui-btn-green"
        },
        /*{
          key: "save",
          label: "保存并提交",
          click: "submitBill",
          cls: "ui-btn-green"
        }*/
      ],
      button3: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "showAddItemsRef"
      },
        {
          key: "delrow",
          label: "删行",
          iconCls: "icon-shanchu1",
          click: "delItems",
        },
        {
          key: "requery",
          label: "重新询价",
          iconCls: "icon-shanchu1",
          click: "requery",
        },
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
      button5: [
        {
          key: "closeRow",
          label: "关闭",
          iconCls: "icon-tubiao-guanbi-xianxing",
          click: "closeItems",

        },
        {
          key: "openRow",
          label: "打开",
          iconCls: "icon-tubiao-duigou-xianxing",
          click: "openItems",
        },
      ],
    },

    cards: {
      card1: [
        {
          type: "textreadonly",
          key: "orderCode",
          label: "订单编号",
          // enable: false,
          domid:"orderCode"
        },
        {
          type:"date",
          key:"orderDate",
          label:"订单日期",
        },
        {
          type: "refer",
          key: "purchaseOrgId",
          label: "采购组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_isPurchasingOrganization": "1"
          },
          refName: "所属办事处"
        },
        {
          type: "refer",
          key: "supplierId",
          label: "供应商",
          refinfo: "suppliers",
          refName: "供应商"
        },
        {
          type: "refer",
          key: "tranTypeId",
          label: "交易类型",
          refinfo: "trantype",
          refName: "交易类型",
          referId:"trantypeRef"
        },
        {
          type: "text",
          key: "otherOrderNum",
          label: "对方订单号",
        },
        {
          type:"refer",
          key:"purchasePersonId",
          label:"采购员",
          refinfo:"person",
          refName:"采购员"
        },
        {
          type:"refer",
          key:"purchaseDeptId",
          label:"采购部门",
          refinfo:"department",
          refName:"采购部门"
        },
        {
          type: "textreadonly",
          key: "refusedReason",
          label: "冻结原因",
        },
        {
          type: "textreadonly",
          key: "totalAmountMoney",
          label: "总金额",
          enable:false
        },
        {
          type: "combo",
          key: "status",
          label: "单据状态",
          defaultvalue: "01",
          dataSource: [
            { value: '01', name: '待处理' },
          ],
          enable:false
        },
          {
              type: "combo",
              key: "state",
              label: "审批状态",
              defaultvalue: "0",
              dataSource: [{
                  value: "0",
                  name: '待处理'
              },
              {
                  value: "1",
                  name: '已提交'
                },
                {
                  value: "2",
                  name: '审批中'
                },
                {
                  value: "3",
                  name: '审批通过'
                },
                {
                  value: "4",
                  name: '审批不通过'
                },
              ],
              enable: false
          },
        {
          type: "text",
          key: "remark",
          label: "备注",
        },
      ]
    },
    dialogs: {
      dialog1: [{
        type: "refer",
        key: "countryId",
        label: "国家",
        refinfo: "country",
        refName: "国家",
        keyfordisplay: "countryName",
        compid: "countryIdBase",
        required: true,
      }, {
        type: "refer",
        key: "provinceId",
        keyfordisplay: "provinceName",
        label: "所在省份",
        refinfo: "region",
        domid: "provinceIdinfo",
        compid: "provinceIdBase",
        enable: true,
        required: true,
        clientParam: {
          "EQ_areaLevel": "2"
        },
      }, {
        type: "refer",
        key: "cityId",
        keyfordisplay: "cityName",
        label: "所在城市",
        domid: "cityIdinfo",
        compid: "cityIdBase",
        enable: false,
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "3"
        },
        required: true,
      }, {
        type: "refer",
        key: "districtId",
        keyfordisplay: "districtName",
        label: "所在区/县",
        domid: "countyIdinfo",
        compid: "districtIdBase",
        enable: false,
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "4",
        },
      }, {
        type: "refer",
        keyfordisplay: "townName",
        key: "townId",
        label: "所在街道",
        domid: "townIdinfo",
        compid: "townIdBase",
        enable: false,
        refinfo: "region",
        clientParam: {
          "EQ_areaLevel": "5"
        },
        required: true,
      }, {
        type: "text",
        key: "receiveAddress",
        label: "详细地址",
        required: true,
      }, {
        type: "text",
        key: "detailAddr",
        label: "收货地址",
        enable: false,
        width: "400px"
      }]
    },
    details: {
      detail1:[
        {
          key: "orderCode",
          label: "订单编号",
        },
        {
          key:"orderDate",
          label:"订单日期",
          computed: "billDateComputed"
        },
        {
          key: "purchaseOrgName",
          label: "采购组织",
        },
        {
          key: "supplierName",
          label: "供应商",
        },
        {
          key: "tranTypeName",
          label: "交易类型",
        },
        {
          key: "otherOrderNum",
          label: "对方订单号",
        },
        {
          key:"purchasePersonName",
          label:"采购员",
        },
        {
          key:"purchaseDeptName",
          label:"采购部门",
        },
        {
          key: "refusedReason",
          label: "冻结原因",
        },
        {
          key: "totalAmountMoney",
          label: "总金额",
        },
        {
          key: "status",
          label: "单据状态",
          computed: "status",
        },
          {
              key: "state",
              label: "审批状态",
              computed: "state",
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
          "data": "purchaseList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [
          {
            "field": "orderCode",
            "dataType": "String",
            "title": "订单编号",
            "renderType": "detailRender"
          },
          {
            "field": "orderDate",
            "dataType": "Date",
            "title": "订单日期",
          },
          {
            "field": "purchaseOrgName",
            "dataType": "String",
            "title": "采购组织",
          },
          {
            "field": "tranTypeName",
            "dataType": "String",
            "title": "交易类型",
          },
          // {
          //   "field": "orderTypeName",
          //   "dataType": "String",
          //   "title": "订单类型",
          // },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供应商",
          },
          {
            "field": "otherOrderNum",
            "dataType": "String",
            "title": "对方订单号"
          },
          {
            "field": "totalAmountMoney",
            "dataType": "float",
            "title": "总金额",
          },
          {
            "field": "status",
            "dataType": "string",
            "title": "订单状态",
            "renderType": "statusRender",
          },
            {
                "field": "state",
                "dataType": "integer",
                "title": "审批状态",
                "renderType": "approveStateRender",
            },
          {
            "field": "purchaseDeptName",
            "dataType": "String",
            "title": "采购部门",
          },
          // {
          //   "field": "purchaseTypeName",
          //   "dataType": "String",
          //   "title": "采购类型",
          //   "visible":false
          // },
          {
            "field": "purchasePerson",
            "dataType": "String",
            "title": "采购员",
            "visible":false
          },

          // {
          //   "field": "totalGoodsNum",
          //   "dataType": "float",
          //   "title": "总数量",
          // },

          {
            "field": "currencyName",
            "dataType": "String",
            "title": "币种",
            "visible":false
          },
          {
            "field": "approvalSummary",
            "dataType": "string",
            "title": "审批批语",
            "visible":false
          },
          // {
          //   "field": "confirmPerson",
          //   "dataType": "String",
          //   "title": "确认人"
          // },
          {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "visible":false
          },
          {
            "field": "creationTime",
            "dataType": "Date",
            "title": "创建时间",
            "visible":false
          },
          {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "visible":false
          },
          {
            "field": "modifiedTime",
            "dataType": "Date",
            "title": "修改时间",
            "visible":false
          },
          {
            "field": "operationCode",
            "dataType": "String",
            "title": "操作",
            "renderType": "operation",
            "fixed": true,
            "width": "100px"
          },
        ]
      },

      //商品信息
      grid2: {
        domid: "",
        umeta: {
          "id": "grid_complexItem",
          "data": "purchaseItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeEditFun":"beforeEditCheck"
        },
        columns: [{
          "field": "rowNum",
          "dataType": "String",
          "title": "行号",
          "editable": false,
        }, {
          "field": "goodsCode",
          "dataType": "String",
          "title": "商品编号",
          "editable": false
        }, {
          "field": "goodsName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false
        }, {
          "field": "goodsNum",
          "dataType": "float",
          "title": "数量",
          "editType": "float",
          "required": true,
        }, {
          "field": "unitName",
          "dataType": "String",
          "title": "单位",
          "editable": false
        }, {
          "field": "unitPrice",
          "dataType": "float",
          "title": "单价",
          "editType": "float",
        }, {
          "field": "amountMoney",
          "dataType": "String",
          "title": "金额",
          "editType": "float",
          "editable": false
        },
          {
            field: "goodsSelection",
            dataType: "String",
            title: "商品选配ID",
            renderType: "goodsOpt",
            editable: false,
            visible: false,
          },
          {
            field: "goodsSelectionDescription",
            dataType: "String",
            title: "商品选配",
            renderType: "goodsOpt",
            editable: false,
          },
          {
                "field": "goodsVersion",
                "dataType": "String",
                "title": "商品多版本",
                "editable": false,
                "required": true,
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
            "visible": false,
          },
          {
          "field": "isClosed",
          "dataType": "checkbox",
          "title": "关闭",
          "width": "130px",
          "renderType": "disableBooleanRender",
          "editable": false
        }, {
          "field": "isGift",
          "dataType": "checkbox",
          "editable": true,
          "title": "赠品",
          "renderType": "booleanRender",
        },
          {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "editable": false,
            "visible": false
          }, {
            "field": "creationTime",
            "dataType": "Date",
            "title": "创建时间",
            "editable": false,
            "visible": false
          }, {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "editable": false,
            "visible": false
          }, {
            "field": "modifiedTime",
            "dataType": "Date",
            "title": "修改时间",
            "editable": false,
            "visible": false
          },
          {
            "field": "demandStockOrgId",
            "dataType": "String",
            "title": "需求库存组织",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "demandStockOrgName",
            "editOptions": {
              "validType": "string"
            }
          }, {
            "field": "arrivalBelongCode",
            "dataType": "string",
            "title": "发货地归属",
            "editOptions": {
              "id": "arrivalBelongId",
              "type": "combo",
              "datasource": "arrivalBelongDataSource"
            },
            "editType": "combo",
            "renderType": "comboRender"
          }, {
            "field": "receiveStorageOrgId",
            "dataType": "String",
            "title": "发货库存组织",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "receiveStorageOrgName",
            "editOptions": {
              "validType": "string"
            },
            "required": true,
          }, {
            "field": "receiveStorageId",
            "dataType": "String",
            "title": "发货仓库",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "receiveStorageName",
            "editOptions": {
              "validType": "string"
            }
          }, {
            "field": "customerId",
            "dataType": "String",
            "title": "收货客户",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "customerName",
            "editOptions": {
              "validType": "string"
            }
          }, {
            "field": "detailAddr",
            "dataType": "String",
            "title": "地址信息",
            "editType": "addressInfo",
          }, {
            "field": "receiveAddress",
            "dataType": "String",
            "title": "收货地址",
                "required": true,
          }, {
            "field": "receiveContact",
            "dataType": "String",
            "title": "收货联系人",
          }, {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "收货联系人电话",
          },
          // {
          //   "field": "addStorageAmount",
          //   "dataType": "String",
          //   "title": "累计入库数量",
          //   "editable": false,
          // },
          {
            "field": "returnGoodsAmount",
            "dataType": "String",
            "title": "累计退货出库数量",
            "editable": false,
          }, {
            "field": "stockStatus",
            "dataType": "String",
            "title": "库存状态",
            "renderType": "stockRender",
            "editable": false,
          },
        ]
      },
      grid3: {
        domid: "",
        umeta: {
          "id": "grid_complexItem_detail",
          "data": "purchaseItems",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [
          {
            "field": "rowNum",
            "dataType": "String",
            "title": "行号",
          },
            {
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编码",
          }, {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          }, {
            "field": "goodsNum",
            "dataType": "float",
            "title": "数量",
            "required": true,
          }, {
            "field": "unitName",
            "dataType": "String",
            "title": "单位",
          }, {
            "field": "unitPrice",
            "dataType": "float",
            "title": "单价",
          }, {
            "field": "amountMoney",
            "dataType": "float",
            "title": "金额",
            "required": true,
          },
          {
            field: "goodsSelection",
            dataType: "String",
            title: "商品选配",
            renderType: "goodsOptDetails",

          },{
                "field": "goodsVersion",
                "dataType": "String",
                "title": "商品多版本",
                "required": true,
            }, {
                "field": "projectName",
                "dataType": "String",
                "title": "项目",
                "visible": false,
            }, {
            "field": "isClosed",
            "dataType": "checkbox",
            "title": "关闭",
            "width": "130px",
            "renderType": "disableBooleanRender",
          }, {
            "field": "isGift",
            "dataType": "checkbox",
            "title": "赠品",
            "editType": "float",
            "renderType": "disableBooleanRender",
          }, {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "visible": false
          }, {
            "field": "creationTime",
            "dataType": "Date",
            "title": "创建时间",
            "visible": false
          }, {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "visible": false
          }, {
            "field": "modifiedTime",
            "dataType": "Date",
            "title": "修改时间",
            "visible": false
          },
          {
            "field": "demandStockOrgName",
            "dataType": "String",
            "title": "需求库存组织",
          }, {
            "field": "arrivalBelongName",
            "dataType": "String",
            "title": "发货地归属",
          }, {
            "field": "receiveStorageOrgName",
            "dataType": "String",
            "title": "发货库存组织",
          }, {
            "field": "receiveStorageName",
            "dataType": "String",
            "title": "发货仓库",
          }, {
            "field": "customerName",
            "dataType": "String",
            "title": "收货客户",
          }, {
            "field": "detailAddr",
            "dataType": "String",
            "title": "地址信息",
          }, {
            "field": "receiveAddress",
            "dataType": "String",
            "title": "收货地址",
                "required": true,
          }, {
            "field": "receiveContact",
            "dataType": "String",
            "title": "收货联系人",
          }, {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "收货联系人电话",
          },
          // {
          //   "field": "addStorageAmount",
          //   "dataType": "String",
          //   "title": "累计入库数量",
          // },
          {
            "field": "returnGoodsAmount",
            "dataType": "String",
            "title": "累计退货出库数量",
          }, {
            "field": "stockStatus",
            "dataType": "String",
            "title": "库存状态",
            "renderType": "stockRender",
          },
        ]
      },

      //bom结构信息
      grid4: {
        domid: "",
        umeta: {
          "id": "grid_complexBomItem",
          "data": "purchaseBomItems",
          "type": "grid",
          "editable": true,
          "showNumCol": true,
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
            "editable": false
          }, {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
            "editable": false
          }, {
            "field": "goodsNum",
            "dataType": "float",
            "title": "数量",
            "editType": "float",
            "editable": false
          }, {
            "field": "unitName",
            "dataType": "String",
            "title": "单位",
            "editable": false
          }, {
            "field": "unitPrice",
            "dataType": "float",
            "title": "单价",
            "editType": "float",
          }, {
            "field": "amountMoney",
            "dataType": "String",
            "title": "金额",
            "editType": "float",
            "editable": false
          }, {
                "field": "goodsVersion",
                "dataType": "String",
                "title": "商品多版本",
                "editable": false,
                "required": true,
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
            "field": "isClosed",
            "dataType": "checkbox",
            "title": "关闭",
            "editable": false,
            "width": "130px",
            "renderType": "booleanRender",
          }, {
            "field": "isGift",
            "dataType": "checkbox",
             "editable": false,
            "title": "赠品",
            "renderType": "booleanRender",
          },
          {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "editable": false,
            "visible": false
          }, {
            "field": "creationTime",
            "dataType": "Date",
            "title": "创建时间",
            "editable": false,
            "visible": false
          }, {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "editable": false,
            "visible": false
          }, {
            "field": "modifiedTime",
            "dataType": "Date",
            "title": "修改时间",
            "editable": false,
            "visible": false
          },
          {
            "field": "demandStockOrgId",
            "dataType": "String",
            "title": "需求库存组织",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "demandStockOrgName",
            "editOptions": {
              "validType": "string"
            },
            "visible": false,
            "editable": false,
          }, {
            "field": "arrivalBelongCode",
            "dataType": "string",
            "title": "发货地归属",
            "editOptions": {
              "id": "arrivalBelongId",
              "type": "combo",
              "datasource": "arrivalBelongDataSource"
            },
            "editType": "combo",
            "renderType": "comboRender",
            "editable": false,
            "visible": false
          }, {
            "field": "receiveStorageOrgId",
            "dataType": "String",
            "title": "发货库存组织",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "receiveStorageOrgName",
            "editOptions": {
              "validType": "string"
            },
            "editable": false,
            "visible": false
          }, {
            "field": "receiveStorageId",
            "dataType": "String",
            "title": "发货仓库",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "receiveStorageName",
            "editOptions": {
              "validType": "string"
            },
            "editable": false,
            "visible": false
          },
          // {
          //   "field": "customerId",
          //   "dataType": "String",
          //   "title": "收货客户",
          //   "renderType": "ncReferRender",
          //   "editType": "ncReferEditType",
          //   "showField": "customerName",
          //   "editOptions": {
          //     "validType": "string"
          //   }
          // }, {
          //   "field": "detailAddr",
          //   "dataType": "String",
          //   "title": "地址信息",
          //   "editType": "addressInfo",
          // }, {
          //   "field": "receiveAddress",
          //   "dataType": "String",
          //   "title": "收货地址",
          //   "editable": true
          // }, {
          //   "field": "receiveContact",
          //   "dataType": "String",
          //   "title": "收货联系人",
          //   "editable": true
          // }, {
          //   "field": "receiveContactPhone",
          //   "dataType": "String",
          //   "title": "收货联系人电话",
          //   "editable": true
          // },
          // {
          //   "field": "addStorageAmount",
          //   "dataType": "String",
          //   "title": "累计入库数量",
          //   "editable": false,
          // },
          {
            "field": "returnGoodsAmount",
            "dataType": "String",
            "title": "累计退货出库数量",
            "editable": false,
          }, {
            "field": "stockStatus",
            "dataType": "String",
            "title": "库存状态",
            "renderType": "stockRender",
            "editable": false,
          },
        ]
      },
      grid5: {
        domid: "",
        umeta: {
          "id": "grid_complexBomItem_detail",
          "data": "purchaseBomItems",
          "type": "grid",
          "editable": false,
          "showNumCol": true
        },
        columns: [
          {
            "field": "rowNum",
            "dataType": "String",
            "title": "行号",
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
          },{
            "field": "goodsCode",
            "dataType": "String",
            "title": "商品编码",
          }, {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          }, {
            "field": "goodsNum",
            "dataType": "float",
            "title": "数量",
            "required": true,
          }, {
            "field": "unitName",
            "dataType": "String",
            "title": "单位",
          }, {
            "field": "unitPrice",
            "dataType": "float",
            "title": "单价",
          }, {
            "field": "amountMoney",
            "dataType": "float",
            "title": "金额",
          }, {
                "field": "goodsVersion",
                "dataType": "String",
                "title": "商品多版本",
                "required": true,
            },
          {
                "field": "projectName",
                "dataType": "String",
                "title": "项目",
                "visible": false,
            },
          {
            "field": "isClosed",
            "dataType": "checkbox",
            "title": "关闭",
            "width": "130px",
            "renderType": "disableBooleanRender",
          }, {
            "field": "isGift",
            "dataType": "checkbox",
            "title": "赠品",
            "editType": "float",
            "renderType": "disableBooleanRender",
          }, {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "visible": false
          }, {
            "field": "creationTime",
            "dataType": "Date",
            "title": "创建时间",
            "visible": false
          }, {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "visible": false
          }, {
            "field": "modifiedTime",
            "dataType": "Date",
            "title": "修改时间",
            "visible": false
          },
          {
            "field": "demandStockOrgName",
            "dataType": "String",
            "title": "需求库存组织",
          }, {
            "field": "arrivalBelongName",
            "dataType": "String",
            "title": "发货地归属",
          }, {
            "field": "receiveStorageOrgName",
            "dataType": "String",
            "title": "发货库存组织",
          }, {
            "field": "receiveStorageName",
            "dataType": "String",
            "title": "发货仓库",
          },
          // {
          //   "field": "customerName",
          //   "dataType": "String",
          //   "title": "收货客户",
          // }, {
          //   "field": "detailAddr",
          //   "dataType": "String",
          //   "title": "地址信息",
          // }, {
          //   "field": "receiveAddress",
          //   "dataType": "String",
          //   "title": "收货地址",
          // }, {
          //   "field": "receiveContact",
          //   "dataType": "String",
          //   "title": "收货联系人",
          // }, {
          //   "field": "receiveContactPhone",
          //   "dataType": "String",
          //   "title": "收货联系人电话",
          // },
          // {
          //   "field": "addStorageAmount",
          //   "dataType": "String",
          //   "title": "累计入库数量",
          // },
          {
            "field": "returnGoodsAmount",
            "dataType": "String",
            "title": "累计退货出库数量",
          }, {
            "field": "stockStatus",
            "dataType": "String",
            "title": "库存状态",
            "renderType": "stockRender",
          },
        ]
      },


      grid7: {
        domid: "grid_purchaseorder7",
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
            "field": "purchaseOrgName",
            "dataType": "String",
            "title": "采购组织",
          },
          {
            "field": "tranTypeName",
            "dataType": "String",
            "title": "交易类型",
          },
          {
            "field": "orderCode",
            "dataType": "String",
            "title": "订单编码",
          },
          {
            "field": "otherOrderNum",
            "dataType": "String",
            "title": "对方订单号"
          },
          {
            "field": "orderDate",
            "dataType": "Date",
            "title": "订单日期",
          },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供应商",
          },
          {
            "field": "purchasePersonName",
            "dataType": "String",
            "title": "采购员",
          },
          {
            "field": "purchaseDeptName",
            "dataType": "String",
            "title": "采购部门",
          },
          {
            "field": "totalGoodsNum",
            "dataType": "float",
            "title": "总数量",
          },
          {
            "field": "totalAmountMoney",
            "dataType": "float",
            "title": "总金额",
          },
          {
            "field": "status",
            "dataType": "string",
            "title": "单据状态",
            "renderType": "statusRender",
          },
          {
            "field": "remark",
            "dataType": "string",
            "title": "备注",
          },
        ]
      },
      grid8: {
        domid: "grid_purchaseorder8",
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
            "title": "商品编码",
          },
          {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
          },
          {
            "field": "unitName",
            "dataType": "String",
            "title": "单位",
            "width": "60px"
          },
          {
            "field": "couldOutNum",
            "dataType": "float",
            "title": "数量",
            "width": "60px"
          },
          {
            "field": "unitPrice",
            "dataType": "float",
            "title": "单价",
            "width": "60px"
          },
          {
            "field": "amountMoney",
            "dataType": "float",
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
            "field": "arrivalBelongName",
            "dataType": "String",
            "title": "到货地归属",
          },
          {
            "field": "customerName",
            "dataType": "String",
            "title": "客户",
          },
          {
            "field": "detailAddr",
            "dataType": "String",
            "title": "收货地址",
          },
          {
            "field": "receiveContact",
            "dataType": "String",
            "title": "收货联系人",
          },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "收货联系人电话",
          },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "收货联系人电话（备用）",
          },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "预计到货时间",
              width: "200px"
          },
        ]
      },
      grid9: {
        domid: "grid_purchaseorder9",
        umeta: {
          "id": "grid_referList_Sel",
          "data": "selectedreferList",
          "type": "grid",
          "showNumCol": true,
          "editable": false,
        },
        columns: [
          {
            "field": "purchaseOrgName",
            "dataType": "String",
            "title": "采购组织",
          },
          {
            "field": "tranTypeName",
            "dataType": "String",
            "title": "订单类型",
          },
          {
            "field": "orderCode",
            "dataType": "String",
            "title": "订单编码",
          },
          {
            "field": "otherOrderNum",
            "dataType": "String",
            "title": "对方订单号"
          },
          {
            "field": "orderDate",
            "dataType": "Date",
            "title": "订单日期",
          },
          {
            "field": "supplierName",
            "dataType": "String",
            "title": "供应商",
          },
          {
            "field": "purchasePersonName",
            "dataType": "String",
            "title": "采购员",
          },
          {
            "field": "purchaseDeptName",
            "dataType": "String",
            "title": "采购部门",
          },
          {
            "field": "totalGoodsNum",
            "dataType": "float",
            "title": "总数量",
          },
          {
            "field": "totalAmountMoney",
            "dataType": "float",
            "title": "总金额",
          },
          {
            "field": "status",
            "dataType": "string",
            "title": "单据状态",
            "renderType": "statusRender",
          },
          {
            "field": "remark",
            "dataType": "string",
            "title": "备注",
          },
        ]
      },
      grid10: {
        domid: "grid_purchaseorder10",
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
            "width": "80px"
          },
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
            "field": "unitName",
            "dataType": "String",
            "title": "单位",
          },
          {
            "field": "couldOutNum",
            "dataType": "float",
            "title": "数量",
          },
          {
            "field": "unitPrice",
            "dataType": "float",
            "title": "单价",
          },
          {
            "field": "amountMoney",
            "dataType": "float",
            "title": "金额",
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
            "field": "arrivalBelongCode",
            "dataType": "String",
            "title": "到货地归属",
          },
          {
            "field": "customerName",
            "dataType": "String",
            "title": "客户",
          },
          {
            "field": "detailAddr",
            "dataType": "String",
            "title": "收货地址",
          },
          {
            "field": "receiveContact",
            "dataType": "String",
            "title": "收货联系人",
          },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "收货联系人电话",
          },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "收货联系人电话（备用）",
          },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "预计到货时间",
              width: "200px"
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
  }
  return new basemodel(model);
})