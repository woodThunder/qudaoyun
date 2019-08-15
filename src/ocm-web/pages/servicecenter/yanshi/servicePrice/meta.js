define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        name: {type:'string'}, // 价表名称
        code: { type: 'string'},
        product:{type: 'string'}, // 产品
        goodsCode: {type: 'string'}, // 物料编码
        goodsName: {type: 'string'}, // 物料名称
        organization: {type: 'string'}, // 所属组织
        serviceOrganization:{type: 'string'}, // 服务组织
        bnPrice:{type:'float'}, // 保内单价
        bnjsPrice: {type:'float'}, // 保内结算价
        bwPrice: {type:'float'}, // 保外单价
        bwjsPrice: {type:'float'}, // 保外结算价
        source: {type: 'string'}, // 指标来源
        jtPrice: {type: 'integer'}, // 阶梯定价
        description: {type: 'string'}, // 描述
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
        qjxx: { type: 'string' }, //区间下限
        priceIndex: { type: 'integer' }, //价格指数
        bnPrice: { type: 'float' }, // 保内基价
        bnjsj:{type:'string'}, // 保内结算价
        bwjj:{type:'float'}, // 保外基价
        bwjsj:{type:'string'}, // 保外结算价
      }
    }
  })