define(["ocm_global"], function () {
  window.refundMeta = {
    meta: {
      id: { type: "string" },
      dr: { type: "integer" },
      ts: { type: "integer" },
      creator: { type: "string" },
      creationTime: { type: "datetime" },
      modifier: { type: "string" },
      modifiedTime: { type: "datetime" },

      /**
       * 店铺
       */
      storeId: { type: "string" },
      storeName: { type: "string" },

      /**
       * 退款单号
       */
      refundid: { type: "string" },

      /**
       * 淘宝交易单号
       */
      tid: { type: "string" },

      /**
       * 交易总额
       */
      totalfee: { type: "float" },

      /**
       * 子订单号
       */

      oid: { type: "string" },

      /**
       * 物流方式
       */

      shippingtype: { type: "string" },

      /**
       * 是否客服介入
       */

      csstatus: { type: "string" },

      /**
       * 退款垫付状态
       */

      advancestatus: { type: "string" },

      /**
       * 分账给淘宝金额
       */

      splittaobaofee: { type: "float" },

      /**
       * 分账给卖家金额
       */

      splitsellerfee: { type: "float" },

      /**
       * 支付宝交易号
       */

      alipayno: { type: "string" },

      /**
       * 买家昵称
       */

      buyernick: { type: "string" },

      /**
       * 卖家昵称
       */

      sellernick: { type: "string" },

      /**
       * 退款申请时间
       */
      created: { type: "datetime" },

      /**
       * 退款更新时间
       */
      modified: { type: "datetime" },

      /**
       * 退款对应订单交易状态
       */
      orderstatus: { type: "string" },

      /**
       * 退款状态
       * WAIT_SELLER_AGREE(买家已经申请退款，等待卖家同意) 
       * WAIT_BUYER_RETURN_GOODS(卖家已经同意退款，等待买家退货) 
       * WAIT_SELLER_CONFIRM_GOODS(买家已经退货，等待卖家确认收货) 
       * SELLER_REFUSE_BUYER(卖家拒绝退款) 
       * CLOSED(退款关闭) 
       * SUCCESS(退款成功)
       */
      refundstatus: { type: "string" },

      /**
       * 货物状态
       */
      goodstatus: { type: "string" },

      /**
       * 是否退货
       */
      hasgoodreturn: { type: "string" },

      /**
       * 退还给买家的金额
       */
      refundfee: { type: "float" },

      /**
       * 支付给卖家的金额
       */
      payment: { type: "float" },

      /**
       * 退款原因
       */
      reason: { type: "string" },

      /**
       * 退款说明
       */
      refunddesc: { type: "string" },

      /**
       * 商品字符串编号
       */
      iid: { type: "string" },

      /**
       * 商品标题
       */
      title: { type: "string" },

      /**
       * 商品价格
       */
      price: { type: "float" },

      /**
       * 商品数量
       */
      num: { type: "string" },

      /**
       * 退货时间
       */
      goodreturntime: { type: "datetime" },

      /**
       * 申通快递
       */
      companyname: { type: "string" },

      /**
       * 退货运单号
       */
      sid: { type: "string" },

      /**
       * 卖家收货地址
       */
      address: { type: "string" },

      /**
       * 商品数字编号
       */
      numIid: { type: "string" },

      /**
       * 是否同步
       */
      issync: { type: "string" },

      /**
       * 销售组织
       */
      pkOrg: { type: "string" },

      /**
       * 是否有异常
       */
      isexception: { type: "string" },

      /**
       * 异常原因
       */
      exceptiondesc: { type: "string" },

      /**
       * 是否被锁定
       */
      islock: { type: "string" },

      /**
       * 是否3W订单
       */
      iswww: { type: "string" },

      /**
       * 退款时机
       */
      refundPhase: { type: "string" },

      /**
       * 退款版本号
       */
      refundVersion: { type: "string" },

    },
    pageSize: 10
  }

})