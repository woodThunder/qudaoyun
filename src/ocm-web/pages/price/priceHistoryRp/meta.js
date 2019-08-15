define(["ocm_global"],function(){
  window.pricehistorymeta = {
    params: {
      "cls": "com.yonyou.ocm.base.service.dto.PurchaseOrderItemDto"
    },
    meta: {
      id:{type: 'string'},
      //  价格表（活动）id
      priceId:{type: 'string'},
      priceCode:{type: 'string'},
      priceName:{type: 'string'},
      code:{type: 'string'},
      name:{type: 'string'},
      //包件
      packId:{type: 'string'},
      packCode:{type: 'string'},
      packName:{type: 'string'},
      //所属产品
      belongProductId:{type: 'string'},
      belongProductCode:{type: 'string'},
      belongProductName:{type: 'string'},
      // 价格类型
      priceType:{type: 'string'},
      //渠道类型
      saleChannelId:{type: 'string'},
      saleChannelCode:{type: 'string'},
      saleChannelName:{type: 'string'},
      //办事处 分区
      agencypartitionId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['agencypartitiongrid']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}' ,
        "refparam":'{"EQ_isEnable":"1"}'
      },
      agencypartitionCode:{type: 'string'},
      agencypartitionName:{type: 'string'},
      //办事处
      agencyId:{type: 'string'},
      agencyCode:{type: 'string'},
      agencyName:{
        'refmodel':JSON.stringify(refinfo['organization_ocm']),
        'refcfg':'{"ctx":"/uitemplate_web"}',
        "refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'//是否办事处
      },
      //客户
      customerId:{type: 'string'},
      customerCode:{type: 'string'},
      customerName:{
        'refmodel':JSON.stringify(refinfo['customer']),
        'refcfg':'{"ctx":"/uitemplate_web"}',
        "refparam":'{"EQ_isEnable":"1"}'
      },
      //门店
      shopId:{type: 'string'},
      shopCode:{type: 'string'},
      shopName:{
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['shopref']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        "refparam":'{"customerId":""}'
      },
      //调价单
      adjustId:{type: 'string'},
      adjustCode:{type: 'string'},
      adjustName:{type: 'string'},
      //价格
      price:{type: 'float'},
      //  创建人
      creator:{type: 'string'},
      //  创建时间
      creationTime:{type: 'datetime'},
      //  修改人
      modifier:{type: 'string'},
      //  修改时间
      modifiedTime:{type: 'datetime'},
      //  审核人
      auditor:{type: 'string'},
      //审核时间
      auditTime:{type: 'datetime'},
      //审核状态
      auditStatus:{type: 'string'},
    },
    pageSize: 20,
  };
})
