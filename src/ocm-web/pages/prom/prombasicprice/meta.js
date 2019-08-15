define(["ocm_global"],function(){
  // 促销基础价
  window.PromBasicPrice = {
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
         type:'string',
         "refmodel": JSON.stringify(refinfo['productPack']),
         "refcfg":'{"ctx":"/uitemplate_web"}'
       }, //包件
       packProCode:{type:'string'},
       packProName:{type:'string'},
       enabled: {type:'string'},
       adjustCode:{type:'string'},  //调价单号
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
        // "refparam": '{"LIKE_agencyPartitionDetailSet.agency.code":"%9992%"}',
      },
      agencypartitionCode: {type: 'string'},
      agencypartitionName: {type: 'string'},
    },
    pageSize: 20,
  }
})
