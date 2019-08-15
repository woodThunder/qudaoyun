define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var orderItemsmeta = {
		meta: {
      transferOutBill: {
        type: "string",

      }, //主表ID
      rowNum: {
        type: "integer",
        required: true,

      }, //行号
      goodsId: {
        type: "string",
        required: true,

      }, //库存商品id
      goodsCode: {
        type: "string",
        required: true,

      },
      goodsName: {
        type: "string",
        required: true,

      },
      goodsFullName: {
        type: "string",

      },
      goodsBasicUnitName: {
        type: "string",

      },
      goodsAssistUnitName: {
        type: "string",

      },
      goodsConversionRate: {
        type: "string",

      },
      unitId: {
        type: 'string'
      },
      unitCode: {
        type: 'string'
      },
      unitName: {
        type: 'string'
      },
      totalShouldOutNum: {
        type: "numberFloat",
        required: true
      }, //应转数量
      factOutNum: {
        type: "numberFloat"
      }, //实出数量
      unitPrice: {
        type: "priceFloat"
      }, //单价
      amountMoney: {
        type: "amountFloat"
      }, //金额
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
      goodsPositionId: {
        type: "string",
        refmodel: JSON.stringify(refinfo.goodsposition),
        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
      }, //货位
      goodsPositionCode: {
        type: "string",

      },
      goodsPositionName: {
        type: "string",

      },
      stockOutPersonId: {
        type: "string",
        required: true,

      }, //出库人
      stockOutPersonCode: {
        type: "string",

      },
      stockOutPersonName: {
        type: "string",

      },
      stockOutDate: {
        type: "date"
      }, //出库日期
      receiverAddress: {
        type: "string",
        maxLength: "200"
      }, //收货地址
      provinceId: {
        type: "string",

      }, //省
      provinceCode: {
        type: "string",

      },
      provinceName: {
        type: "string",

      },
      cityId: {
        type: "string",

      }, //市
      cityCode: {
        type: "string",

      },
      cityName: {
        type: "string",

      },
      countyId: {
        type: "string",

      }, //区/县
      countyCode: {
        type: "string",

      },
      countyName: {
        type: "string",

      },
      townId: {
        type: "string",

      }, //街道/乡/镇
      townCode: {
        type: "string",

      },
      townName: {
        type: "string",

      },
      detailAddr: {
        type: "string",
        maxLength: "200"
      }, //详细地址
      receiver: {
        type: "string",

      }, //收货联系人
      receiverPhone: {
        type: "string",

      }, //收货联系电话
      receiverPhoneSpare: {
        type: "string",

      }, //收货联系电话（备用）
      firstBillCode: {
        type: "string",

      }, //源头单据号
      firstBillBcode: {
        type: "string",

      }, //源头单据行号
      firstBillType: {
        type: "string",

      }, //源头单据类型
      srcBillCode: {
        type: "string",

      }, //来源单据号
      srcBillBcode: {
        type: "string",

      }, //来源单据行号
      srcBillType: {
        type: "string",

      }, //来源单据类型
      remark: {
        type: "string",
        maxLength: "200"
      }, //备注
      goodsVersion: {
        type: 'string',
        required: true
      },  //商品版本号
      batchCodeId: {
        type: 'string',
        'refmodel': JSON.stringify(refinfo['batchCode']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
      },//批号
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
      },  //原始版本商品
      goodsSelection: {
        type: 'string',
      },  //商品选配项
      goodsSelectionDescription: {
        type: 'string',
      },//商品选项描述
		},
		pageSize: 10
	};
  var BomItemsmeta = {
		meta: {
      transferOutBill: {
        type: "string",

      }, //主表ID
      rowNum: {
        type: "integer",
        required: true,

      }, //行号
      goodsId: {
        type: "string",
        required: true,

      }, //库存商品id
      goodsCode: {
        type: "string",
        required: true,

      },
      goodsName: {
        type: "string",
        required: true,

      },
      goodsFullName: {
        type: "string",

      },
      goodsBasicUnitName: {
        type: "string",

      },
      goodsAssistUnitName: {
        type: "string",

      },
      goodsConversionRate: {
        type: "string",

      },
      unitId: {
        type: 'string'
      },
      unitCode: {
        type: 'string'
      },
      unitName: {
        type: 'string'
      },
      totalShouldOutNum: {
        type: "numberFloat",
        required: true
      }, //应转数量
      factOutNum: {
        type: "numberFloat"
      }, //实出数量
      unitPrice: {
        type: "priceFloat"
      }, //单价
      amountMoney: {
        type: "amountFloat"
      }, //金额
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
      goodsPositionId: {
        type: "string",
        refmodel: JSON.stringify(refinfo.goodsposition),
        refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
      }, //货位
      goodsPositionCode: {
        type: "string",

      },
      goodsPositionName: {
        type: "string",

      },
      stockOutPersonId: {
        type: "string",
        required: true,

      }, //出库人
      stockOutPersonCode: {
        type: "string",

      },
      stockOutPersonName: {
        type: "string",

      },
      stockOutDate: {
        type: "date"
      }, //出库日期
      receiverAddress: {
        type: "string",
        maxLength: "200"
      }, //收货地址
      provinceId: {
        type: "string",

      }, //省
      provinceCode: {
        type: "string",

      },
      provinceName: {
        type: "string",

      },
      cityId: {
        type: "string",

      }, //市
      cityCode: {
        type: "string",

      },
      cityName: {
        type: "string",

      },
      countyId: {
        type: "string",

      }, //区/县
      countyCode: {
        type: "string",

      },
      countyName: {
        type: "string",

      },
      townId: {
        type: "string",

      }, //街道/乡/镇
      townCode: {
        type: "string",

      },
      townName: {
        type: "string",

      },
      detailAddr: {
        type: "string",
        maxLength: "200"
      }, //详细地址
      receiver: {
        type: "string",

      }, //收货联系人
      receiverPhone: {
        type: "string",

      }, //收货联系电话
      receiverPhoneSpare: {
        type: "string",

      }, //收货联系电话（备用）
      firstBillCode: {
        type: "string",

      }, //源头单据号
      firstBillBcode: {
        type: "string",

      }, //源头单据行号
      firstBillType: {
        type: "string",

      }, //源头单据类型
      srcBillCode: {
        type: "string",

      }, //来源单据号
      srcBillBcode: {
        type: "string",

      }, //来源单据行号
      srcBillType: {
        type: "string",

      }, //来源单据类型
      remark: {
        type: "string",
        maxLength: "200"
      }, //备注
      //------- 630后 新加bom包件字段 -------
      goodsVersion: {
        type: 'string',
        required: true
      },  //商品版本号
      goodsSelection: {
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
      childGoodsQty: {
        type: 'float',
      },
      batchCodeId: {
        type: 'string',
        'refmodel': JSON.stringify(refinfo['batchCode']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"批号"}',
      },//批号
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
      },  //原始版本商品
      goodsSelectionDescription: {
        type: 'string',
      },//商品选项描述
		},
		pageSize: 10
	};
  var model = {
    metas: {
      defaultPage: {
        meta: {
          id: {
            type: "string"
          },
          stockOrgInId: {
            type: "string",
            required: true,

            refmodel: JSON.stringify(refinfo.organization_ocm),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //库存组织
          stockOrgInCode: {
            type: "string"
          },
          stockOrgInName: {
            type: "string"
          },
          billCode: {
            type: "string",

          }, //单据号
          billDate: {
            type: "data",
            required: true
          }, //单据日期
          billType: {
            type: "string",
            required: true,

            default: "TransferIn"
          }, //单据类型
          billTranTypeId: {
            type: "string",
            required: true,

            default: "TransferIn"
          }, //交易类型
          billTranTypeCode: {
            type: "string"
          },
          billTranTypeName: {
            type: "string"
          },
          storageId: {
            type: "string",
            required: true,

            refmodel: JSON.stringify(refinfo.warehouse),
            refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //入库仓库
          storageCode: {
            type: "string"
          },
          storageName: {
            type: "string"
          },
          // 是否开启货位管理
          ifSlotManage: {
            type: 'string'
          },
          storekeeperId: {
            type: "string",

            refmodel: JSON.stringify(refinfo.person),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //库管员
          storekeeperCode: {
            type: "string"
          },
          storekeeperName: {
            type: "string"
          },
          inDate: {
            type: "date"
          }, //入库日期
          planSendDate: {
            type: "date"
          }, //计划发货日期
          planArriveDate: {
            type: "date"
          }, //计划到货日期
          currencyId: {
            type: "string",
            required: true,

          }, //币种
          currencyCode: {
            type: "string"
          },
          currencyName: {
            type: "string"
          },
          totalShouldInNum: {
            type: "numberFloat",
            precision: 2
          }, //应入总数量
          totalFactInNum: {
            type: "numberFloat",
            precision: 2
          }, //实入总数量
          billStatusId: {
            type: "string"
          }, //单据状态
          billStatusName: {
            type: "string"
          },
          billStatusCode: {
            type: "string"
          },
          stockBillBelong: {
            type: "string",

          }, //库存单据归属
          customerId: {
            type: "string",

          }, //客户
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          bizPersonId: {
            type: "string",

            refmodel: JSON.stringify(refinfo.person),
            refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //业务员
          bizPersonCode: {
            type: "string"
          },
          bizPersonName: {
            type: "string"
          },
          deparmentId: {
            type: "string",

            refmodel: JSON.stringify(refinfo.department),
            refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //部门
          deparmentCode: {
            type: "string"
          },
          deparmentName: {
            type: "string"
          },
          logisticsId: {
            type: "string",

          }, //物流公司
          logisticsCode: {
            type: "string"
          },
          logisticsName: {
            type: "string"
          },
          siger: {
            type: "string",

          }, //签字人
          signTime: {
            type: "date"
          }, //签字日期
          cancelReason: {
            type: "string",
            maxLength: "200"
          }, //取消原因
          remark: {
            type: "string",
            maxLength: "200"
          } //备注
        },
        pageSize: 10
      },
      defaultItemPageDatas: {
        meta: {
          transferOutBillId: {
            type: "string",

          }, //主表ID
          rowNum: {
            type: "integer",
            required: true,

          }, //行号
          goodsId: {
            type: "string",
            required: true,

          }, //库存商品id
          goodsCode: {
            type: "string",
            required: true,

          },
          goodsName: {
            type: "string",
            required: true,

          },
          goodsFullName: {
            type: "string",

          },
          goodsBasicUnitName: {
            type: "string",

          },
          goodsAssistUnitName: {
            type: "string",

          },
          unitId: {
            type: 'string'
          },
          unitCode: {
            type: 'string'
          },
          unitName: {
            type: 'string'
          },
          goodsConversionRate: {
            type: "string",

          },
          shouldInNum: {
            type: "numberFloat",
            required: true
          }, //应入数量
          factInNum: {
            type: "numberFloat"
          }, //实入数量
          unitPrice: {
            type: "priceFloat"
          }, //单价
          amountMoney: {
            type: "amountFloat"
          }, //金额
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
          goodsPositionId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.goodsposition),
            refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
          }, //货位
          goodsPositionName: {
            type: "string",

          },
          stockInPersonId: {
            type: "string",
            required: true,

          }, //入库人
          stockInPersonCode: {
            type: "string",

          },
          stockInPersonName: {
            type: "string",

          },
          stockInDate: {
            type: "date"
          }, //入库日期
          firstBillCode: {
            type: "string",

          }, //源头单据号
          firstBillBcode: {
            type: "string",

          }, //源头单据行号
          firstBillType: {
            type: "string",

          }, //源头单据类型
          srcBillCode: {
            type: "string",

          }, //来源单据号
          srcBillBcode: {
            type: "string",

          }, //来源单据行号
          srcBillType: {
            type: "string",

          }, //来源单据类型
          remark: {
            type: "string",
            maxLength: "200"
          }, //备注
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
          }, //商品选配项
          goodsSelectionDescription: {
            type: 'string',
          }, //商品选项描述
        },
        pageSize: 10
      },
      BomItemPage: {
        meta: {
          transferOutBillId: {
            type: "string",

          }, //主表ID
          rowNum: {
            type: "integer",
            required: true,

          }, //行号
          goodsId: {
            type: "string",
            required: true,

          }, //库存商品id
          goodsCode: {
            type: "string",
            required: true,

          },
          goodsName: {
            type: "string",
            required: true,

          },
          goodsFullName: {
            type: "string",

          },
          goodsBasicUnitName: {
            type: "string",

          },
          goodsAssistUnitName: {
            type: "string",

          },
          unitId: {
            type: 'string'
          },
          unitCode: {
            type: 'string'
          },
          unitName: {
            type: 'string'
          },
          goodsConversionRate: {
            type: "string",

          },
          shouldInNum: {
            type: "numberFloat",
            required: true
          }, //应入数量
          factInNum: {
            type: "numberFloat"
          }, //实入数量
          unitPrice: {
            type: "priceFloat"
          }, //单价
          amountMoney: {
            type: "amountFloat"
          }, //金额
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
          goodsPositionId: {
            type: "string",
            refmodel: JSON.stringify(refinfo.goodsposition),
            refcfg: '{"ctx":"/uitemplate_web","refName":"货位"}'
          }, //货位
          goodsPositionName: {
            type: "string",
          },
          stockInPersonId: {
            type: "string",
            required: true,

          }, //入库人
          stockInPersonCode: {
            type: "string",

          },
          stockInPersonName: {
            type: "string",

          },
          stockInDate: {
            type: "date"
          }, //入库日期
          firstBillCode: {
            type: "string",

          }, //源头单据号
          firstBillBcode: {
            type: "string",

          }, //源头单据行号
          firstBillType: {
            type: "string",

          }, //源头单据类型
          srcBillCode: {
            type: "string",

          }, //来源单据号
          srcBillBcode: {
            type: "string",

          }, //来源单据行号
          srcBillType: {
            type: "string",

          }, //来源单据类型
          remark: {
            type: "string",
            maxLength: "200"
          }, //备注

          //------- 630后 新加bom包件字段 -------
          goodsVersion: {
            type: 'string',
            required: true
          }, //商品版本号
          goodsSelection: {
            type: 'string',
            required: true
          }, //商品选配项
          goodsNum: {
            type: 'numberFloat',
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
            type: 'numberFloat',
          }, //母件行号
          childGoodsQty: {
            type: 'numberFloat',
          },
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
          goodsSelectionDescription: {
            type: 'string',
          }, //商品选项描述
        },
        pageSize: 10
      },
      ItemRef: {
        meta: {
          goodsref: {
            type: "string",
            refmodel: JSON.stringify(refinfo.goods),
            refcfg: '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            refparam: '{"EQ_isEnable":"1"}'
          }
        }
      },
      referTransferOutSearch: {
        meta: {
          // // 库存组织
          // receiveStorageOrgId: {
          //   type: 'string',
          //   'refmodel': JSON.stringify(refinfo['organization_ocm']),
          //   "refcfg": '{"ctx":"/uitemplate_web","refName":"库存组织"}',
          // },
          receiveStorageId: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['storeLocation']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //仓库
          receiveStorageName: {type: 'string',},
          receiveStorageCode: {type: 'string',},
          purchaseCode: {type: "string",},//订单号
          orderDate: {type: "string",},//订单日期
          otherOrderNum: {type: "string",},//对方订单号
          supplierId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['department']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"供应商"}',
          }, // 供应商
          supplierName: {type: "string"},//供应商Name
          supplierCode: {type: "string"},//供应商Code

          stockInStorageId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
          },
          stockInStorageName: {type: "string"},
          stockInStorageCode: {type: "string"},

          arrivalBelongId: {type: 'string', required: true}, //到货地归属
          arrivalBelongName: {type: 'string', required: true},
          arrivalBelongCode: {type: 'string', required: true},

          receiveStorageOrgId: {
            type: 'string',
            required: true,
            'refmodel': JSON.stringify(refinfo['organization_ocm']),
            'refcfg': '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            'refparam': '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //收货库存组织
          receiveStorageOrgName: {type: 'string',},
          receiveStorageOrgCode: {type: 'string',},

          customer: {
            type: 'string',
            required: true,
            "refmodel": JSON.stringify(refinfo['customers']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            "refparam": '{}'
          }, //客户
        },

        pageSize: 10
      },
      referTransferOut: {
        meta: {
          transferBillOutItems: {
            type: "child",
            meta: orderItemsmeta.meta
          },
          transferOutBillItemBoms: {
            type: "child",
            meta: BomItemsmeta.meta
          },
          id: {
            type: "string"
          },
          stockOrgId: {
            type: "string",
            required: true,

            refmodel: JSON.stringify(refinfo.organization_ocm),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库存组织"}',
            refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
          }, //库存组织
          stockOrgCode: {
            type: "string"
          },
          stockOrgName: {
            type: "string"
          },
          billCode: {
            type: "string",

          }, //单据号
          billDate: {
            type: "date",
            required: true
          }, //单据日期
          billType: {
            type: "string",
            required: true,

            default: "TransferOut"
          }, //单据类型
          billTranTypeId: {
            type: "string",
            required: true,

            default: "TransferOut"
          }, //交易类型
          billTranTypeCode: {
            type: "string"
          },
          billTranTypeName: {
            type: "string"
          },
          storageId: {
            type: "string",
            required: true,

            refmodel: JSON.stringify(refinfo.warehouse),
            refcfg: '{"ctx":"/uitemplate_web","refName":"仓库"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //出库仓库
          storageCode: {
            type: "string"
          },
          storageName: {
            type: "string"
          },
          // 是否开启货位管理
          ifSlotManage: {
            type: 'string'
          },
          storekeeperId: {
            type: "string",

            refmodel: JSON.stringify(refinfo.person),
            refcfg: '{"ctx":"/uitemplate_web","refName":"库管员"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //库管员
          storekeeperCode: {
            type: "string"
          },
          storekeeperName: {
            type: "string"
          },
          planSendDate: {
            type: "date"
          }, //计划发货日期
          planArriveDate: {
            type: "date"
          }, //计划到货日期
          currencyId: {
            type: "string",
            required: true,

          }, //币种
          currencyCode: {
            type: "string"
          },
          currencyName: {
            type: "string"
          },
          totalShouldOutNum: {
            type: "numberFloat",
            precision: 2
          }, //应出总数量
          totalFactOutNum: {
            type: "numberFloat",
            precision: 2
          }, //实出总数量
          billStatusId: {
            type: "string"
          }, //单据状态
          billStatusName: {
            type: "string"
          },
          billStatusCode: {
            type: "string"
          },
          stockBillBelong: {
            type: "string",

          }, //库存单据归属
          customerId: {
            type: "string",

          }, //客户
          customerCode: {
            type: "string"
          },
          customerName: {
            type: "string"
          },
          bizPersonId: {
            type: "string",

            refmodel: JSON.stringify(refinfo.person),
            refcfg: '{"ctx":"/uitemplate_web","refName":"业务员"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //业务员
          bizPersonCode: {
            type: "string"
          },
          bizPersonName: {
            type: "string"
          },
          deparmentId: {
            type: "string",

            refmodel: JSON.stringify(refinfo.department),
            refcfg: '{"ctx":"/uitemplate_web","refName":"部门"}',
            refparam: '{"EQ_isEnable":"1"}'
          }, //部门
          deparmentCode: {
            type: "string"
          },
          deparmentName: {
            type: "string"
          },
          logisticsId: {
            type: "string",

          }, //物流公司
          logisticsCode: {
            type: "string"
          },
          logisticsName: {
            type: "string"
          },
          siger: {
            type: "string",

          }, //签字人
          signTime: {
            type: "date"
          }, //签字日期
          cancelReason: {
            type: "string",
            maxLength: "200"
          }, //取消原因
          remark: {
            type: "string",
            maxLength: "200"
          } //备注
        },
        pageSize: 10
      },
      referTransferOutItem: orderItemsmeta,
    },
    buttons: {
      buttonSource: [
        {
          key:    'add',
          label:  '新增',
          iconCls:'icon-puls',
          click:  'showAddRefer'
        },
        {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        }, {
          key: "sign",
          label: "签字",
          iconCls: "icon-edit",
          click: "sign"
        }, {
          key: "cancelsign",
          label: "取消签字",
          iconCls: "icon-tubiao-quxiaoshenhe",
          click: "sign"
        }
      ],
      buttonEdit: [
          {
        key: "autonum",
        label: "自动取数",
        click: "autonum"
      }, {
        key: "cancel",
        label: "取消",
        click: "retListPanel"
      }, {
        key: "save",
        label: "保存",
        click: "saveBill",
        cls: "ui-btn-green"
      }],
      editItemButton: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "showAddItemsRef"
      }, {
        key: "delrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delItems"
      }],
      detailsButton: [{
        key: "return",
        label: "返回",
        click: "retListPanel"
      }, {
        key: "edit",
        label: "编辑",
        click: "detail2bill",
        cls: "ui-btn-green",
        visible: "canEdit"
      }]
    },
    cards: {
      editCard: [{
        type: "textreadonly",
        key: "billCode",
        label: "入库单号"
      }, {
        type: "date",
        key: "billDate",
        label: "单据日期"
      }, {
        type: "refer",
        key: "stockOrgInId",
        label: "库存组织",
      }, {
        type: "refer",
        key: "storageId",
        label: "入库仓库",
        referId: "inCardStorageId"
      }, {
        type: "refer",
        key: "bizPersonId",
        label: "业务员"
      }, {
        type: "refer",
        key: "deparmentId",
        label: "部门"
      }, {
        type: "refer",
        key: "storekeeperId",
        label: "库管员"
      }, {
        type: "textreadonly",
        key: "billStatusName",
        label: "单据状态"
      }, {
        type: "textreadonly",
        key: "inDate",
        label: "入库日期"
      }, {
        type: "textreadonly",
        key: "totalShouldInNum",
        label: "应入总数量"
      }, {
        type: "textreadonly",
        key: "totalFactInNum",
        label: "实入总数量"
      }, {
        type: "textreadonly",
        key: "logisticsName",
        label: "物流公司"
      }, {
        type: "textarea",
        key: "remark",
        label: "备注",
        cls: "ui-textarea-item"
      }]
    },
    details: {
      detail: [{
        key: "billCode",
        label: "入库单号"
      }, {
        key: "billDate",
        label: "单据日期",
        computed: "billDateComputed"
      }, {
        key: "stockOrgInName",
        label: "库存组织"
      }, {
        key: "storageName",
        label: "入库仓库"
      }, {
        key: "bizPersonName",
        label: "业务员"
      }, {
        key: "deparmentName",
        label: "部门"
      }, {
        key: "storekeeperName",
        label: "库管员"
      }, {
        key: "billStatusName",
        label: "单据状态"
      }, {
        key: "inDate",
        label: "入库日期"
      }, {
        key: "totalShouldInNum",
        label: "应入总数量"
      }, {
        key: "totalFactInNum",
        label: "实入总数量"
      }, {
        key: "logisticsName",
        label: "物流公司"
      }, {
        key: "remark",
        label: "备注",
        cls: "ui-textarea-item"
      }]
    },
    searchs: {
      defaultSearch: [
        {
          type: "text",
          key: "billCode",
          label: "入库单号"
        }, {
          type: "daterange",
          key: "billDate",
          label: "单据日期"
        }, {
          type: "refer",
          refinfo: "organization_ocm",
          key: "stockOrgIn",
          label: "库存组织",
          clientParam: {
            "EQ_orgFuncRel": "03"
          }
        }, {
          type: "refer",
          refinfo: "warehouse",
          key: "storage",
          label: "入库仓库",
          domid: "warehouseIn"
        }, {
          type: "refer",
          refinfo: "person",
          key: "bizPerson",
          label: "业务员"
        }, {
          type: "refer",
          refinfo: "department",
          key: "deparment",
          label: "部门"
        }, {
          type: "refer",
          refinfo: "goods",
          key: "transferBillInItem--goods",
          label: "库存商品"
        }, {
          type: "combo",
          refinfo: "department",
          key: "billStatus",
          label: "单据状态",
          url: window.pathMap.base +
              "/cust-doc-defs/cust_doc_code?cust_doc_code=QY106",
          namefield: "name",
          valuefield: "code",
          hasAll: true
        }],
      search2: [
        {
          type: "refer",
          key: "receiveStorageOrgId",
          label: "调入库存组织",
          refinfo: "organization_ocm",
          clientParam: {"EQ_orgFuncRel": "03", "EQ_isEnable": "1"},
        },
        {
          type: "refer",
          key: "receiveStorageId",
          label: "调入仓库",
          refinfo: "warehouse",
          domid: "storehouse2"
        },
        {
          type: "text",
          key: "purchaseCode",
          label: "订单号"
        },
        // {
        //   type: "daterange",
        //   key: "orderDate",
        //   label: "订单日期"
        // },
        // {
        //   type: "text",
        //   key: "otherOrderNum",
        //   label: "对方订单号"
        // },
        // {
        //   type: "refer",
        //   key: "supplier",
        //   label: "供应商",
        //   refinfo: "suppliers"
        // },

      ]
    },
    grids: {
      defaultGrid: {
        domid: "transferInBill",
        umeta: {
          id: "grid_transferInBill",
          data: "defaultPage",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [{
          field: "billCode",
          dataType: "String",
          title: "入库单号",
          renderType: "detailRender"
        }, {
          field: "billDate",
          dataType: "Date",
          title: "单据日期"
        }, {
          field: "billType",
          dataType: "String",
          title: "单据类型",
          visible: false
        }, {
          field: "stockOrgInCode",
          dataType: "String",
          title: "库存组织编码",
          visible: false
        }, {
          field: "stockOrgInName",
          dataType: "String",
          title: "库存组织"
        }, {
          field: "billTranTypeCode",
          dataType: "String",
          title: "交易类型编码",
          visible: false
        }, {
          field: "billTranTypeName",
          dataType: "String",
          title: "交易类型",
          visible: false
        }, {
          field: "storageCode",
          dataType: "String",
          title: "入库仓库编码",
          visible: false
        }, {
          field: "storageName",
          dataType: "String",
          title: "入库仓库"
        }, {
          field: "bizPersonCode",
          dataType: "String",
          title: "业务员编码",
          visible: false
        }, {
          field: "bizPersonName",
          dataType: "String",
          title: "业务员"
        }, {
          field: "deparmentCode",
          dataType: "String",
          title: "部门编码",
          visible: false
        }, {
          field: "deparmentName",
          dataType: "String",
          title: "部门"
        }, {
          field: "storekeeperCode",
          dataType: "String",
          title: "库管员编码",
          visible: false
        }, {
          field: "storekeeperName",
          dataType: "String",
          title: "库管员"
        }, {
          field: "billStatusName",
          dataType: "String",
          title: "状态"
        }, {
          field: "planSendDate",
          dataType: "String",
          title: "计划发货日期",
          visible: false
        }, {
          field: "planArriveDate",
          dataType: "String",
          title: "计划到货日期",
          visible: false
        }, {
          field: "currencyCode",
          dataType: "String",
          title: "币种编码",
          visible: false
        }, {
          field: "currencyName",
          dataType: "String",
          title: "币种",
          visible: false
        }, {
          field: "totalShouldInNum",
          dataType: "String",
          title: "应入总数量",
          visible: false
        }, {
          field: "totalFactInNum",
          dataType: "String",
          title: "实入总数量",
          visible: false
        }, {
          field: "stockBillBelong",
          dataType: "String",
          title: "库存单据归属",
          visible: false
        }, {
          field: "customerCode",
          dataType: "String",
          title: "客户编码",
          visible: false
        }, {
          field: "customerName",
          dataType: "String",
          title: "客户",
          visible: false
        }, {
          field: "logisticsCode",
          dataType: "String",
          title: "物流公司编码",
          visible: false
        }, {
          field: "logisticsName",
          dataType: "String",
          title: "物流公司",
          visible: false
        }, {
          field: "siger",
          dataType: "String",
          title: "签字人",
          visible: false
        }, {
          field: "signTime",
          dataType: "String",
          title: "签字日期",
          visible: false
        }, {
          field: "cancelReason",
          dataType: "String",
          title: "取消原因",
          visible: false
        }, {
          field: "remark",
          dataType: "String",
          title: "备注",
          visible: false
        }, {
          field: "billStatusCode",
          dataType: "String",
          title: "操作",
          renderType: "operation",
          fixed: true,
          width: "110px"
        }]
      },

      //商品信息
      gridGoodsEdit: {
        domid: "transferInBill1",
        umeta: {
          "id": "grid_transferInBill1",
          "data": "defaultItemPage",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": false,
          "onBeforeEditFun": "beforeEditCheck"
        },
        columns: [{
            "field": "rowNum",
            "dataType": "Integer",
            "title": "行号",
            "editable": false
          }, {
            "field": "goodsCode",
            "dataType": "String",
            "title": "库存商品编码",
            "editable": false
          }, {
            "field": "goodsName",
            "dataType": "String",
            "title": "商品名称",
            "editable": false
          }, {
            "field": "shouldInNum",
            "dataType": "String",
            "title": "应入数量",
            "editable": false
          }, {
            "field": "factInNum",
            "dataType": "String",
            "title": "实入数量 "
          }, {
            "field": "unitName",
            "dataType": "String",
            "title": "单位 ",
            "editable": false
          }, {
            "field": "unitPrice",
            "dataType": "String",
            "title": "单价",
            "editable": false
          }, {
            "field": "amountMoney",
            "dataType": "String",
            "title": "金额 ",
            "editable": false
          }, {
            "field": "goodsSelection",
            "dataType": "String",
            "title": "商品选配",
            "renderType": "goodsOptDetails",
            "editable": false,
            "visible": false,
          },

          {
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
            "showField": "batchCodeName",
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
            "title": "备注"
          }, {
            "field": "stockInPersonName",
            "dataType": "String",
            "title": "入库人",
            "editable": false
          }, {
            "field": "stockInDate",
            "dataType": "String",
            "title": "入库日期",
            "editable": false
          }
        ]
      },
      gridGoodsDetail: {
        domid: "transferInBill2",
        umeta: {
          id: "grid_transferInBill2",
          data: "defaultItemPage",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: false
        },
        columns: [{
          field: "rowNum",
          dataType: "Integer",
          title: "行号",
          editable: false
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          editable: false
        }, {
          field: "shouldInNum",
          dataType: "String",
          title: "应入数量",
          editable: false
        }, {
          field: "factInNum",
          dataType: "String",
          title: "实入数量 "
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位 ",
          editable: false
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价",
          editable: false
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额 ",
          editable: false
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
          "field": "batchCodeName",
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
          field: "batchNumName",
          dataType: "String",
          title: "批次号",
          editable: false
        }, {
          field: "goodsPositionName",
          dataType: "String",
          title: "货位 ",
          editable: false
        }, {
          field: "remark",
          dataType: "String",
          title: "备注"
        }, {
          field: "stockInPersonName",
          dataType: "String",
          title: "入库人",
          editable: false
        }, {
          field: "stockInDate",
          dataType: "String",
          title: "入库日期",
          editable: false
        }, {
          field: "firstBillCode",
          dataType: "String",
          title: "源头单据号",
          visible: false,
          editable: false
        }, {
          field: "firstBillBcode",
          dataType: "String",
          title: "源头单据行号 ",
          visible: false,
          editable: false
        }, {
          field: "firstBillType",
          dataType: "String",
          title: "源头单据类型",
          visible: false,
          editable: false
        }, {
          field: "srcBillCode",
          dataType: "String",
          title: "来源单据号",
          visible: false,
          editable: false
        }, {
          field: "srcBillBcode",
          dataType: "String",
          title: "来源单据行号 ",
          visible: false,
          editable: false
        }, {
          field: "srcBillType",
          dataType: "String",
          title: "来源单据类型",
          visible: false,
          editable: false
        }]
      },

      //bom结构信息
      gridBomEdit: {
        domid: "transferBomEdit",
        umeta: {
          id: "grid_transferBomEdit",
          data: "BomItemPage",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: false,
        },
        columns: [{
          field: "rowNum",
          dataType: "Integer",
          title: "行号",
          editable: false
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
          field: "goodsCode",
          dataType: "String",
          title: "库存商品编码",
          editable: false
        }, {
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          editable: false
        }, {
          field: "shouldInNum",
          dataType: "String",
          title: "应入数量",
          editable: false
        }, {
          field: "factInNum",
          dataType: "String",
          title: "实入数量 ",
          "editable": false,
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位 ",
          editable: false
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价",
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额 ",
          editable: false
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
          "showField": "batchCodeName",
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
          "editable": false,
          "editOptions": {
            "validType": "string"
          }
        }, {
          field: "remark",
          dataType: "String",
          title: "备注",
          "editable": false,
        }, {
          field: "stockInPersonName",
          dataType: "String",
          title: "入库人",
          editable: false
        }, {
          field: "stockInDate",
          dataType: "String",
          title: "入库日期",
          editable: false
        }]
      },
      gridBomDetail: {
        domid: "transferBomDetail",
        umeta: {
          id: "grid_transferBomDetail",
          data: "BomItemPage",
          type: "grid",
          editable: false,
          multiSelect: false,
          showNumCol: false
        },
        columns: [{
          field: "rowNum",
          dataType: "Integer",
          title: "行号",
          editable: false
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
          field: "goodsName",
          dataType: "String",
          title: "商品名称",
          editable: false
        }, {
          field: "shouldInNum",
          dataType: "String",
          title: "应入数量",
          editable: false
        }, {
          field: "factInNum",
          dataType: "String",
          title: "实入数量 "
        }, {
          field: "unitName",
          dataType: "String",
          title: "单位 ",
          editable: false
        }, {
          field: "unitPrice",
          dataType: "String",
          title: "单价",
          editable: false
        }, {
          field: "amountMoney",
          dataType: "String",
          title: "金额 ",
          editable: false
        }, {
          "field": "goodsVersion",
          "dataType": "String",
          "title": "商品多版本",
          "editable": false,
          "visible": true,
        }, {
          "field": "batchCodeName",
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
          field: "batchNumName",
          dataType: "String",
          title: "批次号",
          editable: false
        }, {
          field: "goodsPositionName",
          dataType: "String",
          title: "货位 ",
          editable: false
        }, {
          field: "remark",
          dataType: "String",
          title: "备注"
        }, {
          field: "stockInPersonName",
          dataType: "String",
          title: "入库人",
          editable: false
        }, {
          field: "stockInDate",
          dataType: "String",
          title: "入库日期",
          editable: false
        }, {
          field: "firstBillCode",
          dataType: "String",
          title: "源头单据号",
          visible: false,
          editable: false
        }, {
          field: "firstBillBcode",
          dataType: "String",
          title: "源头单据行号 ",
          visible: false,
          editable: false
        }, {
          field: "firstBillType",
          dataType: "String",
          title: "源头单据类型",
          visible: false,
          editable: false
        }, {
          field: "srcBillCode",
          dataType: "String",
          title: "来源单据号",
          visible: false,
          editable: false
        }, {
          field: "srcBillBcode",
          dataType: "String",
          title: "来源单据行号 ",
          visible: false,
          editable: false
        }, {
          field: "srcBillType",
          dataType: "String",
          title: "来源单据类型",
          visible: false,
          editable: false
        }]
      },

      //拉单弹窗相关grid元数据
      grid4: {
        domid: "grid_purchaseorder4",
        umeta: {
          "id": "grid_referList",
          "data": "referTransferOutList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "onRowSelected": "referSelectHandle",
          "onRowUnSelected": "referUnSelectHandle",
        },
        columns: [
					{
						field: "billCode",
						dataType: "String",
						title: "订单编码",
					},
					{
						field: "billDate",
						dataType: "Date",
						title: "订单日期",
					},
					{
						field: "stockOrgName",
						dataType: "String",
						title: "出库库存组织"
					},
					{
						field: "stockOrgInName",
						dataType: "String",
						title: "入库库存组织"
					},
					{
						field: "totalShouldOutNum",
						dataType: "String",
						title: "应出总数量"
					},
					{
						field: "totalFactOutNum",
						dataType: "String",
						title: "实出总数量"
					},
					{
						field: "billStatusName",
						dataType: "String",
						title: "单据状态"
					},
					{
						field: "remark",
						dataType: "String",
						title: "备注"
					}
				]
      },
      grid5: {
        domid: "grid_purchaseorder5",
        umeta: {
          "id": "grid_referListItem",
          "data": "referTransferOutItemList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "onRowSelected": "referSelectItemHandle",
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
            "field": "factOutNum",
            "dataType": "String",
            "title": "数量",
            "width": "60px"
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
          // {
          //   "field": "receiveStorageOrgName",
          //   "dataType": "String",
          //   "title": "收货库存组织",
          // },
          // {
          //   "field": "receiveStorageName",
          //   "dataType": "String",
          //   "title": "收货仓库",
          // },
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
          // {
          //   "field": "detailAddr",
          //   "dataType": "String",
          //   "title": "收货地址",
          // },
          // {
          //   "field": "receiveContact",
          //   "dataType": "String",
          //   "title": "收货联系人",
          // },
          // {
          //   "field": "receiveContactPhone",
          //   "dataType": "String",
          //   "title": "收货联系人电话",
          // },
          // {
          //   "field": "receiveContactPhone",
          //   "dataType": "String",
          //   "title": "收货联系人电话（备用）",
          // },
          {
            "field": "receiveContactPhone",
            "dataType": "String",
            "title": "预计到货时间",
            "visible": false,
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
            "dataType": "String",
            "title": "总数量",
          },
          {
            "field": "totalAmountMoney",
            "dataType": "String",
            "title": "总金额",
          },
          {
            "field": "status",
            "dataType": "string",
            "title": "单据状态",
            "renderType": "purchasestatusRender",
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
            "field": "factOutNum",
            "dataType": "String",
            "title": "数量",
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
          },
          {
            "field": "receiveStorageOrgName",
            "dataType": "String",
            "title": "收货库存组织",
          },
          {
            "field": "receiveStorageName",
            "dataType": "String",
            "title": "收货仓库",
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
            "visible": false,
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
      }
    }
  };

  return new basemodel(model);
});