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
       * 退款单id
       */
      refundid: { type: "string" },

      /**
       * 客户帐号
       */
      buyerid: { type: "string" },

      /**
       * 客户姓名
       */
      buyername: { type: "string" },

      /**
       * 审核日期
       */
      checktime: { type: "datetime" },

      /**
       * 申请时间
       */
      applytime: { type: "datetime" },

      /**
       * 退款金额（分）
       */
      applyrefundsum: { type: "float" },

      /**
       * 审核状态
       *  0、未审核 
       *  1、审核通过
       *  2、审核不通过 
       *  3、京东财务审核通过 
       *  4、京东财务审核不通过 
       *  5、人工审核通过 
       *  6、拦截并退款 
       *  7、青龙拦截成功 
       *  8、青龙拦截失败 
       *  9、强制关单并退款。
       */
      auditstatus: { type: "string" },

      /**
       * 审核人
       */
      checkusername: { type: "string" },

      /**
       * 订单号
       */
      orderid: { type: "string" },

      /**
       * 销售组织
       */
      pkOrg: { type: "string" },

      /**
       * 来源店铺
       */
      shopsource: { type: "string" },

      /**
       * 是否同步
       */
      issync: { type: "string" },

      /**
       * 是否异常
       */
      isexception: { type: "string" },

      /**
       * 异常原因
       */
      exceptiondesc: { type: "string" },

    },
    pageSize: 10
  }
})