define(["ocm_global"],function(){
window.productPromotionOrderListmeta = {
	params: {
      "cls": "com.yonyou.ocm.b2c.service.dto.ChannelStockRptDto"
    },
    meta: {
      id:{type: 'string'},
      code:{type: 'string'},// 渠道库存号
      officeCode:{type: 'string'},// 办事处编号
      officeName:{type: 'string'},// 办事处名称
      serviceProviderId:{type: 'string'},// 服务商主键
      serviceProviderCode:{type: 'string'},// 服务商编码
      serviceProviderName:{type: 'string'},// 服务商名称
      productId:{type: 'string'},// 产品主键
      productCode:{type: 'string'},// 产品编码
      productName:{type: 'string'},// 产品名称
      num:{type: 'float'},// 数量
      price:{type: 'float'},// 采购单价
      rate:{type: 'float'},// 清理折扣
      discount:{type: 'float'},// 折后金额
      allowance:{type: 'float'},// 补贴金额
      cleanTime:{type: 'date'},// 清理时间
      cleanReason:{type: 'string'},// 清理原因
      accountCode:{type: 'string'},// 账号编码
      accountType:{type: 'string'},// 信贷类别
      storeId:{type: 'string'},// 店铺主键
      storeName:{type: 'string'},// 店铺名称
      orderPCode:{type: 'string'},// 平台单号
      orderCode:{type: 'string'},// 电商单号
      PO:{type: 'string'},// PO
      SO:{type: 'string'},// SO
      customer:{type: 'string'},// 顾客ID
      bookTime:{type: 'date'},// 下单时间
      customerName:{type: 'string'},// 顾客姓名
      customerPhone:{type: 'string'},// 联系方式
      customerAddr:{type: 'string'},// 收货地址
    },
    pageSize: 10,
};
}) 

