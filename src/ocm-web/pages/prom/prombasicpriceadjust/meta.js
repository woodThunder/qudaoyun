define(["ocm_global"],function(){
  // 调价单
  window.PriceAdjust = {
    meta: {
       id:{type: 'string'},//id
       code:{type: 'string'},//调价单编号
       name:{type: 'string',required:true},//调价单名称
       auditStatus:{type: 'string',default:"0"},//审核状态
       promoActivityId:{type: 'string'},//活动id
       promoActivityCode:{type: 'string'},//活动编码
       promoActivityName:{type: 'string'},//活动名称
       auditTime:{type: 'string'},//审批时间
       auditor:{type: 'string'},//审批人
       note:{type: 'string'},//备注
      creator:{type: 'string'},//创建人
      creationTime:{type: 'date'},//创建时间
      modifier:{type: 'string'},//修改人
      modifiedTime:{type: 'date'},//修改时间
      state: {type: 'string',default:'0'},
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
  }
  // 调价单明细
  window.PriceAdjustDetail = {
    meta: {
       id:{type: 'string'},//id
       isproduct:{type:'string'},
       channelId:{
         type:'string',
         "refmodel": JSON.stringify(refinfo["channeltype"]),
         "refcfg": '{"ctx":"/uitemplate_web"}'
       },//渠道类型id
       channelName:{type:'string'},//渠道类型名称
       channelCode:{type:'string'},//渠道类型编码
       officeId:{
         type:'string',
         "refmodel": JSON.stringify(refinfo["organization_ocm"]),
         "refcfg": '{"ctx":"/uitemplate_web"}',
         "refparam": '{"EQ_isOffice":"1"}'
       },
       officeName:{type:'string'},
       customerId:{
         type:'string',
         "refmodel": JSON.stringify(refinfo["customer"]),
         "refcfg": '{"ctx":"/uitemplate_web"}',
       },
       customerName:{type:'string'},
       productId:{type:'string'},
       productName:{type:'string'},
       productCode:{type:'string'},
       productGroup:{type:'string'},
       productSeriousId:{type:'string'},
       productSeriousName:{type:'string'},
       productShowName:{type:'string'},
       productShowCode:{type:'string'},
       price:{
         type:'string',
       },
       note:{type:'string'},
       productCombineId:{type:'string'},
       productCombineName:{type:'string'},
       packProId:{
         type:'string',
       }, //包件
       packProCode:{type:'string'},
       packProName:{type:'string'},
      creator:{type: 'string',required:true},//创建人
      creationTime:{type: 'date',required:true},//创建时间
      modifier:{type: 'string',required:true},//修改人
      modifiedTime:{type: 'date',required:true},//修改时间
      dr:{type: 'string'},
      agencypartitionId: {  //办事处分区
        type: 'string',
        "refmodel": JSON.stringify(refinfo["agencypartitiongrid"]),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        "refparam": '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}',
      },
      agencypartitionCode: {type: 'string'},
      agencypartitionName: {type: 'string'},
    },
    pageSize: 10,
  }
  // 调价单明细参照
  window.PriceAdjustDetailRefer = {
    meta: {
       id:{type: 'string'},//id
       isproduct:{type:'string'},
       channelId:{type:'string'},//渠道类型id
       channelName:{type:'string'},//渠道类型名称
       channelCode:{type:'string'},//渠道类型编码
       officeId:{type:'string'},
       officeName:{type:'string'},
       customerId:{type:'string'},
       customerName:{type:'string'},
       productId:{type:'string'},
       productName:{type:'string'},
       productCode:{type:'string'},
       productGroup:{type:'string'},
       productSeriousId:{type:'string'},
       productSeriousName:{type:'string'},
       productShowName:{type:'string'},
       productShowCode:{type:'string'},
       price:{type:'string'},
       note:{type:'string'},
       productCombineId:{type:'string'},
       productCombineName:{type:'string'},
       packProId:{
         type:'string'
       }, //包件
       packProCode:{type:'string'},
       packProName:{type:'string'},
      creator:{type: 'string',required:true},//创建人
      creationTime:{type: 'date',required:true},//创建时间
      modifier:{type: 'string',required:true},//修改人
      modifiedTime:{type: 'date',required:true},//修改时间
      dr:{type: 'string'},
      agencypartitionId: {  //办事处分区
        type: 'string',
        "refmodel": JSON.stringify(refinfo["agencypartitiongrid"]),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        "refparam": '{"EQ_isContainBodys":"1","EQ_isEnable":"1"}',
      },
      agencypartitionCode: {type: 'string'},
      agencypartitionName: {type: 'string'},
    },
    pageSize: 5,
  }
  // 产品/产品组合
  window.ProductRef = {
    meta: {
      productRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['promproducttab']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
      }
    }
  }
  // 包件参照
  window.PackRef = {
    meta: {
      packRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['promproductpack']),
        "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
      }
    }
  }
})
