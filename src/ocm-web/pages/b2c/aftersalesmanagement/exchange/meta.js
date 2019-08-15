define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      exchangeMeta: {
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.ExchangeDto"
        },
        meta: {
          id: {
            type: 'String'
          },
          dr: {
            type: 'integer'
          },
          ts: {
            type: 'datetime'
          },
          creator: {
            type: 'string'
          },
          creationTime: {
            type: 'datetime'
          },
          modifier: {
            type: 'string'
          },
          modifiedTime: {
            type: 'datetime'
          },
          code: {
            type: 'string',
            required: true
          },
          returnId: {
            type: 'String'
          },
          // exchangeId:{
          //   type :'String'
          // },
          // exchangeCode:{
          //   type :'String'
          // },
          pcode: {
            type: 'String'
          },
          orderCode: {
            type: 'String'
          },
          platformId: {
            type: 'String'
          },
          platformCode: {
            type: 'String'
          },
          platformName: {
            type: 'String'
          },
          storeId: {
            type: 'String'
          },
          storeCode: {
            type: 'String'
          },
          storeName: {
            type: 'String'
          },
          buyerId: {
            type: 'String'
          },
          buyerName: {
            type: 'String'
          },
          contactInfo1: {
            type: 'String'
          },
          contactInfo2: {
            type: 'String'
          },
          receiveAddress: {
            type: 'String'
          },
          logisticsMode: {
            type: 'String'
          },
          serviceMode: {
            type: 'String'
          },
          handleState: {
            type: 'String'
          },
          handleTime: {
            type: 'datetime'
          },
          // exchangeReason:{
          // type:'String'
          // },      
          logisticsId: {
            type: 'String'
          },
          logisticsName: {
            type: 'String'
          },
          waybillNo: {
            type: 'String'
          },
          logisticsNameSpecial: {
            type: 'String'
          },
          deliverTime: {
            type: 'datetime'
          },
          saleOrg: {
            type: 'String'
          },
          bookTime: {
            type: 'datetime'
          },
          deliveryState: {
            type: 'String'
          },
          returnState: {
            type: 'String'
          },
          // isbackFirst:{
          // type:'String'
          // },
          pkOrg: {
            type: 'String'
          },

        },
        pageSize: 10,
      },
      exchangeLogsMeta: { //操作日志
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.ExchangeLogDto"
        },
        meta: {
          id: {
            type: "string"
          }, //
          operator: {
            type: "string"
          }, //操作人
          operationTime: {
            type: "datetime"
          }, //操作时间
          operationType: {
            type: "string"
          }, //操作类型
          operateContent: {
            type: "string"
          }, //操作内容
          pkOrg: {
            type: 'string'
          },
          exchangeId: {
            type: 'string'
          }

        },
        pageSize: 10,
      },
      exchangeGoodsMeta: {
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.ExchangeGoodsDto"
        },
        meta: {
          id: {
            type: 'String'
          },
          exchangeId: {
            type: 'String'
          },
          serialnum: {
            type: 'String'
          },
          goodsSource: {
            type: 'String'
          },
          goodsId: {
            type: 'String'
          },
          skuCode: {
            type: 'String'
          },
          skuName: {
            type: 'String'
          },
          goodsCategory: {
            type: 'String'
          },
          isVir: {
            type: 'integer'
          },
          isGift: {
            type: 'integer'
          },
          giftSource: {
            type: 'String'
          },
          price: {
            type: 'String'
          },
          buyNum: {
            type: 'String'
          },
          totalPrice: {
            type: 'String'
          },
          discountFee: {
            type: 'String'
          },
          adjustFee: {
            type: 'String'
          },
          receivableFee: {
            type: 'String'
          },
          settlementFee: {
            type: 'String'
          },
          closeNum: {
            type: 'String'
          },
          closedFee: {
            type: 'String'
          },
          sendNum: {
            type: 'String'
          },
          returnNum: {
            type: 'String'
          },
          exchangeNum: {
            type: 'String'
          },
          returnFee: {
            type: 'String'
          },
          sendStatus: {
            type: 'String'
          },
          returnGoodsStatus: {
            type: 'String'
          },
          returnFeeStatus: {
            type: 'String'
          },
          logisticsMode: {
            type: 'String'
          },
          remark: {
            type: 'String'
          },
          srcOrderId: {
            type: 'String'
          },
          srcGoodsId: {
            type: 'String'
          },
          srcGoodsSerialnum: {
            type: 'String'
          },
        }
      },


      exchangeDeliveryGoodsMeta: {
        params: {
          "cls": "com.yonyou.ocm.b2c.service.dto.ExchangeDeliveryGoodsDto"
        },
        meta: {
          id: {
            type: 'String'
          },
          exchangeId: {
            type: 'String'
          },

          serialnum: {
            type: 'String'
          },
          goodsSource: {
            type: 'String'
          },

          goodsId: {
            type: 'String'
          },

          skuCode: {
            type: 'String'
          },

          skuName: {
            type: 'String'
          },


          goodsCategory: {
            type: 'String'
          },

          isVir: {
            type: 'String'
          },

          isGift: {
            type: 'String'
          },

          giftSource: {
            type: 'String'
          },


          price: {
            type: 'String'
          },

          buyNum: {
            type: 'String'
          },

          totalPrice: {
            type: 'String'
          },

          discountFee: {
            type: 'String'
          },

          adjustFee: {
            type: 'String'
          },

          receivableFee: {
            type: 'String'
          },

          settlementFee: {
            type: 'String'
          },

          closeNum: {
            type: 'String'
          },

          closedFee: {
            type: 'String'
          },

          sendNum: {
            type: 'String'
          },


          returnNum: {
            type: 'String'
          },

          exchangeNum: {
            type: 'String'
          },

          returnFee: {
            type: 'String'
          },

          sendStatus: {
            type: 'String'
          },

          returnGoodsStatus: {
            type: 'String'
          },

          returnFeeStatus: {
            type: 'String'
          },

          logisticsMode: {
            type: 'String'
          },

          remark: {
            type: 'String'
          },

        }
      },

      returnWarehouseMeta: {
        meta: {
          warehouseId: {
            type: 'string', //仓库
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          placeholder1: {
            type: 'string'
          },
          placeholder2: {
            type: 'string'
          },
        }
      },
      returnWarehouse2Meta: {
        meta: {
          id: {
            type: 'String'
          },
          exchangeGoodsId: {
            type: 'String'
          },

          exchangeId: {
            type: 'String'
          },

          serialnum: {
            type: 'String'
          },

          goodsId: {
            type: 'String'
          },

          skuCode: {
            type: 'String'
          },

          skuName: {
            type: 'String'
          },

          buyNum: {
            type: 'String'
          },

          sendNum: {
            type: 'String'
          },


          returnNum: {
            type: 'String'
          },

          closeNum: {
            type: 'String'
          },

          warehouseId: {
            type: 'string', //仓库
            "refmodel": JSON.stringify(refinfo['warehouse']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
            "refparam": '{"EQ_isEnable":"1"}'
          },
          warehouserCode: {
            type: 'string'
          },
          warehouseName: {
            type: 'string'
          },

        }
      }
    },


    searchs: {
      search1: [{
        type: "text",
        key: "pcode",
        label: "平台单号"
      }, {
        type: "text",
        key: "code",
        label: "电商单号"
      }, {
        type: "refer",
        key: "platform--id",
        label: "三方平台",
        refinfo: "b2cplatform",
        refName: "所属平台",
        multi: true,
        opr: 'IN'
      }, {
        type: "text",
        key: "buyerId",
        label: "顾客ID"
      }, {
        type: "text",
        key: "buyerName",
        label: "收货人"
      }, {
        type: "text",
        key: "contactInfo1",
        label: "顾客联系方式"
      }, {
        type: "text",
        key: "receiveAddress",
        label: "顾客收货地址"
      }, {
        type: "daterange",
        key: "deliverTime",
        label: "发货时间"
      }, {
        type: "daterange",
        key: "bookTime",
        label: "下单时间"
      }, ]
    },
    buttons: {
      button1: [{
          key: 'audit',
          label: '审核',
          iconCls: 'icon-tubiao-shenhe',
          click: 'auditHandler',
        },
        // {
        //   key : 'assignReturnWarehouse0',
        //   label :'指定退货仓库',
        //   iconCls : 'icon-edit',
        //   auth: true,
        // 	children: [{
        // 		key: "assignReturnWarehouse",
        // 		label: "多行单仓库",
        // 		click: "assignReturnWarehouseHandler",
        // 		auth: true,
        // 	}, {
        // 		key: "assignReturnWarehouse2",
        // 		label: "单行多仓库",
        // 		click: "assignReturnWarehouse2Handler",
        // 		auth: true,
        // 	}]
        // }
        // ,
        {
          key: 'assignReturnWarehouse',
          label: '指定退货仓库',
          iconCls: 'icon-edit',
          click: 'assignReturnWarehouseHandler',
        }
        // ,{
        //   key : 'assignReturnWarehouse2',
        //   label :'指定退货仓库-单行多仓库',
        //   iconCls : 'icon-edit',
        //   click : 'assignReturnWarehouse2Handler',
        // }
        , {
          key: 'cancelExchange',
          label: '取消换货',
          iconCls: 'icon-tubiao-shenhe',
          click: 'cancelExchangeHandler',
        }
      ],
    },
    grids: {
      grid1: {
        domid: "grid_PromoActivity_dom",
        umeta: {
          "id": "grid_PromoActivity",
          "data": "exchangeList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeClickFun": "mainDetail"
        },
        columns: [{ //换货申请单
          "field": "code",
          "dataType": "String",
          "title": "单号",
        }, {
          "field": "pcode",
          "dataType": "String",
          "title": "平台订单号"
        }, {
          "field": "orderCode",
          "dataType": "String",
          "title": "电商订单号",
        }, {
          "field": "platformName",
          "dataType": "String",
          "title": "平台",
        }, {
          "field": "storeName",
          "dataType": "String",
          "title": "店铺"
        }, {
          "field": "buyerId",
          "dataType": "String",
          "title": "顾客ID",
        }, {
          "field": "buyerName",
          "dataType": "String",
          "title": "收货人",
        }, {
          "field": "contactInfo1",
          "dataType": "String",
          "title": "联系方式"
        }, {
          "field": "receiveAddress",
          "dataType": "String",
          "title": "收货地址",
        }, {
          "field": "logisticsMode",
          "dataType": "string",
          "title": "物流方式 ",
          // logisticsModeSrc
          "editable": false,
          "editOptions": {
            "type": "combo",
            "datasource": "logisticsModeSrc"
          },
          "renderType": "comboRender"
        }, {
          "field": "serviceMode",
          "dataType": "string",
          "title": "配送方式 ",
          "renderType": "logType"
        }, {
          // "field": "exchangeReason",
          // "dataType": "String",
          // "title": "换货原因",
          // }, {
          "field": "logisticsName",
          "dataType": "String",
          "title": "快递公司",
        }, {
          "field": "waybillNo",
          "dataType": "String",
          "title": "快递单号"
          // }, {
          //   "field": "isbackFirst",
          //   "dataType": "String",
          //   "title": "先退后发",
        }, ]
      },
      grid2: { //
        domid: "grid_exchangeGoods_dom",
        umeta: {
          "id": "grid_exchangeGoods",
          "data": "exchangeGoodsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          // }, {
          // "field": "model",
          // "dataType": "String",
          // "title": "商品型号",
          // }, {
          // "field": "color",
          // "dataType": "String",
          // "title": "商品颜色",
        }, {
          "field": "goodsCategory",
          "dataType": "String",
          "title": "商品类别",
          "renderType": "goodsCategoryRender"
          //      }, {
          //        "field": "isVir",
          //        "dataType": "integer",
          //        "title": "是否虚拟商品",

        }, {
          "field": "price",
          "dataType": "String",
          "title": "单价",
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "申请退货数量",
        }, {
          "field": "totalPrice",
          "dataType": "String",
          "title": "总金额",
          //      }, {
          //        "field": "discountFee",
          //        "dataType": "String",
          //        "title": "商品优惠",
          //      }, {
          //        "field": "receivableFee",
          //        "dataType": "String",
          //        "title": "成交金额",
          //      }, {
          //        "field": "settlementFee",
          //        "dataType": "String",
          //        "title": "结算金额",
        }, {
          "field": "closeNum",
          "dataType": "String",
          "title": "关闭数量",
        }, {
          "field": "closedFee",
          "dataType": "String",
          "title": "关闭金额",
        }, {
          "field": "sendNum",
          "dataType": "String",
          "title": "退货到货数量",
        }, {
          "field": "isGift",
          "dataType": "integer",
          "title": "是否赠品",
          "renderType": "isGiftRender"
        }, {
          "field": "giftSource",
          "dataType": "String",
          "title": "赠品来源",
          // }, {
          // "field": "isOwn",
          // "dataType": "String",
          // "title": "是否欠件",
          // }, {
          // "field": "returnNum",
          // "dataType": "String",
          // "title": "退货数量",
          //      }, {
          //        "field": "exchangeNum",
          //        "dataType": "String",
          //        "title": "换货数量",
        }, ]
      },
      grid4: { //发货商品信息
        domid: "grid_exchangeDeliveryGoods_dom",
        umeta: {
          "id": "grid_exchangeDeliveryGoods",
          "data": "exchangeDeliveryGoodsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          // }, {
          // "field": "model",
          // "dataType": "String",
          // "title": "商品型号",
          // }, {
          // "field": "color",
          // "dataType": "String",
          // "title": "商品颜色",
        }, {
          "field": "goodsCategory",
          "dataType": "String",
          "title": "商品类别",
          "renderType": "goodsCategoryRender"
          //      }, {
          //        "field": "isVir",
          //        "dataType": "integer",
          //        "title": "是否虚拟商品",

        }, {
          "field": "price",
          "dataType": "String",
          "title": "单价",
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "购买数量",
        }, {
          "field": "totalPrice",
          "dataType": "String",
          "title": "总价",
        }, {
          "field": "discountFee",
          "dataType": "String",
          "title": "商品优惠",
        }, {
          "field": "receivableFee",
          "dataType": "String",
          "title": "应收金额",
          //      }, {
          //        "field": "settlementFee",
          //        "dataType": "String",
          //        "title": "结算金额",
          // }, {
          // "field": "closeNum",
          // "dataType": "String",
          // "title": "关闭数量",
          // }, {
          // "field": "closedFee",
          // "dataType": "String",
          // "title": "关闭金额",
        }, {
          "field": "sendNum",
          "dataType": "String",
          "title": "发货数量",
          //      }, {
          //        "field": "returnNum",
          //        "dataType": "String",
          //        "title": "退货数量",
          //      }, {
          //        "field": "exchangeNum",
          //        "dataType": "String",
          //        "title": "换货数量",
          //      }, {
          //        "field": "returnFee",
          //        "dataType": "String",
          //        "title": "退款金额",
        }, {
          "field": "isGift",
          "dataType": "integer",
          "title": "是否赠品",
          "renderType": "isGiftRender"
        }, {
          "field": "giftSource",
          "dataType": "String",
          "title": "赠品来源",
          // }, {
          // "field": "sendStatus",
          // "dataType": "String",
          // "title": "发货状态",
          // }, {
          // "field": "returnGoodsStatus",
          // "dataType": "String",
          // "title": "关闭状态",
          //      }, {
          //        "field": "returnFeeStatus",
          //        "dataType": "String",
          //        "title": "退款状态",
          //      }, {
          //        "field": "logisticsMode",
          //        "dataType": "String",
          //        "title": "物流方式",
        }, ]
      },
      grid6: {
        domid: "grid_log_dom",
        umeta: {
          "id": "grid_log",
          "data": "exchangeLogsList",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "operator",
          "dataType": "String",
          "title": "操作人",
        }, {
          "field": "operationTime",
          "dataType": "Datetime",
          "title": "操作时间",
        }, {
          "field": "operationType",
          "dataType": "String",
          "title": "操作类型",
        }, {
          "field": "operationContent",
          "dataType": "String",
          "title": "操作内容",
        }, ]
      },
      grid7: {
        domid: "grid_returnWarehouse2",
        umeta: {
          "id": "grid_returnWarehouse2",
          "data": "returnWarehouse2List",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "skuCode",
          "dataType": "String",
          "title": "商品编码",
          "editable": false,
        }, {
          "field": "skuName",
          "dataType": "String",
          "title": "商品名称",
          "editable": false,
        }, {
          "field": "warehouseId",
          "dataType": "String",
          "title": "退返仓库",
          "editable": true,
          showField: "warehouseName",
          renderType: "ncReferRender",
          editType: "ncReferEditType",

          editOptions: {
            validType: "string",
            rel: {
              refname: "warehouseName",
            }
          }
        }, {
          "field": "buyNum",
          "dataType": "String",
          "title": "购买数量",
          "editable": false,
        }, {
          "field": "sendNum",
          "dataType": "String",
          "title": "发货数量",
          "editable": false,
        }, {
          "field": "returnNum  ",
          "dataType": "String",
          "title": "退货数量",
          "editable": false,
        }, {
          "field": "closeNum  ",
          "dataType": "String",
          "title": "关闭数量",
          "editable": false,
        }, ]
      },
    }
  }
  return new basemodel(model);
})