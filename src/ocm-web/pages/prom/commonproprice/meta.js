define(["ocm_global"],function(){
  window.commonpropricemeta = {
    params: {
      "cls": "com.yonyou.ocm.prom.service.dto.CommonProPriceDto"
    },
    meta: {
      id:{type: 'string'},//id
      productid:{
        'refmodel':JSON.stringify(refinfo['productInfo']),
        'refcfg':'{"ctx":"/uitemplate_web"}',
        'refparam':'{"EQ_isProductPack": "1","EQ_isEnable":"1","EQ_proNature":"1"}'
      },//主键
      productidCode:{type: 'string'},//编码
      productidName:{type: 'string'},//编码
      channelCode:{type: 'string'},//编码
      channelName:{type: 'string'},//编码
      officeId:{
        type: 'string',
        'refmodel': JSON.stringify(refinfo['organization_ocm']),
        'refcfg':'{"ctx":"/uitemplate_web"}',
        'refparam': '{"EQ_isOffice":"1","EQ_isEnable":"1"}',
      },//编码
      officeName:{type: 'string'},//编码
      customerId:{
        type: 'string',
        'refmodel': JSON.stringify(refinfo['customer']),
        'refcfg': '{"ctx":"/uitemplate_web"}',
        'refparam':'{"EQ_isEnable":"1"}'
      },//编码
      customerName:{type: 'string'},//编码
      price: {type: 'float',required:true,minNotEq:0,precision:2, regExp: /^\d{1,8}(\.\d*)?$/,errorMsg:"金额整数位不能超过8"},//价格
      vnote: {type: 'string'},//名称
      enableStatus:{type: 'string',default:1},//启用状态
      creator:{type: 'string'},//创建人
      creationTime:{type: 'date'},//创建时间
      modifier:{type: 'string'},//修改人
      modifiedTime:{type: 'date'},//修改时间
      dr:{type: 'string'},//
      // agencypartitionId: {  //办事处分区
      //   type: 'string',
      //   "refmodel": JSON.stringify(refinfo["agencypartition"]),
      //   "refcfg": '{"ctx":"/uitemplate_web"}',
      //   "refparam": '{"EQ_isContainBodys":"1"}',
      // },
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
    //是否启用前端缓存
    // pageCache: true
  }
})
