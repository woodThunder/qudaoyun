define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        organization: {type: 'string'}, // 所属组织
        orderType:{type:'string'}, // 申请单类型
        orderSn:{type:'string'}, // 申请单号
        server:{type:'string'}, // 服务商
        orderTotalNum:{type:'string'}, // 订单总金额
        thType:{type:'string'},// 提货方式
        dhType:{type:'string'}, // 订货方式
        sqDate:{type:'datatime'}, // 申请日期
        qhAddress:{type:'string'}, // 取货地址
        shAddress:{type:'string'}, // 收货地址
        beizhu:{type:'string'}, // 备注
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        parts:{
          type:'child'
        },
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
    }
  
    //维修BOM备件信息
    window.partsMeta = {
      meta: {
        id: { type: "string" }, //
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
        modifiedTime: { type: 'datetime' },
        bjCode:{type:'string'}, // 备件编码
        bjName:{type:'string'}, // 备件名称
        mainUnit:{type:'string'}, // 主单位
        unit:{type:'string'}, // 单位
        rate:{type:'float'}, // 换算率
        dhNumber:{type:'integer'}, // 订货数量
        sqzNumber:{type:'integer'}, // 申请主数量
        price:{type:'float'}, // 单价
        dhje:{type:'float'}, // 订货金额
        beizhu:{type:'string'}, // 备注
      }
    }
  })