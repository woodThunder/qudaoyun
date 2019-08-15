define(["ocm_global"],function(){
  // 上样标准及统计
  window.SampleSettingReport = {
    meta: {
      activityId: {type: 'string'},
      productId: {type: 'string'},
      productCode: {type: 'string'},
      productName: {type: 'string'},
      customerId: {type: 'string'},
      customerCode: {type: 'string'},
      customerName: {type: 'string'},
      accountId: {type: 'string'},
      accountCode: {type: 'string'},
      accountName: {type: 'string'},
      shopId: {type: 'string'},
      shopCode: {type: 'string'},
      shopName: {type: 'string'},
      agencyId: {type: 'string'},
      agencyCode: {type: 'string'},
      agencyName: {type: 'string'},
      sampleSettingNum: {type: 'string'},
      poCommitNum: {type: 'string'},
      soBillNum: {type: 'string'},
      poCommitRate: {type: 'string'},
      soBillRate: {type: 'string'},
    },
    pageSize: 20,
  }
  // 采购订单提交量、销售开单量明细
  window.SampleSettingDetailReportMeta = {
    meta: {
      productId: {type: 'string'},
      productCode: {type: 'string'},
      productName: {type: 'string'},
      customerId: {type: 'string'},
      customerCode: {type: 'string'},
      customerName: {type: 'string'},
      accountId: {type: 'string'},
      accountCode: {type: 'string'},
      accountName: {type: 'string'},
      agencyId: {type: 'string'},
      agencyCode: {type: 'string'},
      agencyName: {type: 'string'},
      sampleSettingNum: {type: 'string'},
      poCommitNum: {type: 'string'},
      soBillNum: {type: 'string'},
    },
    pageSize: 10,
  }
})
