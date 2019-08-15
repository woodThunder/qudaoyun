define(["ocm_global"], function () {
    //询价
    window.mainMeta = {
      meta: {
        organizationName: { type: 'string' }, // 销售组织名称
        customerName: { type: 'string'}, // 客户名称
        goodsCode: { type: 'string'}, // 商品编码
        goodsName: { type: 'string' }, // 商品名称
        num: { type: 'string' }, // 询价数量
        unitName: { type: 'string'}, // 计量单位名称
        strategyCode: { type: 'string'}, // 定价策略编码
        strategyName: { type: 'string' }, // 定价策略名称
        priceMaintainName: { type: 'string' }, // 价目表名称
        priceMaintainOrganization: { type: 'string' }, // 价目表所属销售组织
      },
      pageSize: 500,
      //是否启用前端缓存
      // pageCache: true
    }  
})