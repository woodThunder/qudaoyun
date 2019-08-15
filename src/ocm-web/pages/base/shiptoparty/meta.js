define(["ocm_global"],function(){
window.Shiptopartymeta = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ShopDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      customerAddresId:{
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['customeraddress']),
        "refcfg":'{"ctx":"/uitemplate_web","isReturnCode":"true"}',
        "refparam":'{"EQ_isEnable":"1"}'
        },//送达方ID
      customerAddresName: {type: 'string'},//
      customerAddresCode: {type: 'string',required:true},//
      customerOneCategoryId:{
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['custdocdef']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":"QY023","refName":"一级客户分类"}'
        },//
      customerOneCategoryCode: {type: 'string',required:true},//
      customerOneCategoryName: {type: 'string',required:true},//
      customerTwoCategoryId:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['custdocdef']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":"QY024","refName":"二级客户分类"}',
         "refparam":'{"IN_code":"06,07,08,09,10"}'
        },//
      customerTwoCategoryCode: {type: 'string',required:true},//
      customerTwoCategoryName: {type: 'string',required:true},//
      simpleName: {type: 'string'},//简称
      countryName: {type: 'string'},//
      provinceName: {type: 'string'},//
      cityName: {type: 'string'},//
      countyName: {type: 'string'},//
      townName: {type: 'string'},//
      Address: {type: 'string'},//
      logisticPeriod: {type: 'string'},//
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
//联系人
window.Contactmeta ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
    },
    meta: {
    id:{type: 'string'},//idp
    code:{type: 'string',required:true},//编码
    name: {type: 'string',required:true},//名称
    // productid: {type: 'string',required:true},//销售产品id
    contactTypeId: {
      type: 'string',
      required:true,
      'refmodel':JSON.stringify(refinfo['demoactivitytypeb']),
      'refcfg':'{"ctx":"/uitemplate_web"}',
    },//联系人类型
    contactTypeCode: {type: 'string',required:true},//联系人类型编码
    contactTypeName: {type: 'string',required:true},//联系人类型名称
    contactTel: {type: 'string',required:true},//联系人电话
    contactPhone: {type: 'string',required:true},//联系人手机
    contactFax: {type: 'string',required:true},//传真
    address: {type: 'string',required:true},//联系人地址
    email: {type: 'string',required:true},//联系人邮箱
    QQ: {type: 'string',required:true},//联系人QQ
    productId:{type: 'string',required:true},//
    productCode: {type: 'string',required:true},//
    departmentId: {
      type: 'string',
      required:true,
      'refmodel':JSON.stringify(refinfo['department']),
      'refcfg':'{"ctx":"/uitemplate_web"}',
    },//联系人所在部门
    departmentCode: {type: 'string',required:true},//联系人所在部门编码
    departmentName: {type: 'string',required:true},//联系人所在部门名称
  },
  pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}

//市场区域  
window.MarketAreameta ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.DealerMarketAreaDto"
    },
    meta: {
      
      //
      organizationId: {
        type: 'string',
        required:true,
        'refmodel':JSON.stringify(refinfo['organization_ocm']),
        'refcfg':'{"ctx":"/uitemplate_web"}'
      },//销售组织
      organizationCode: {type: 'string'},
      organizationName: {type: 'string'},
      channelId: {
        type: 'string',
        required:true,
        'refmodel':JSON.stringify(refinfo['custdocdef']),
        'refcfg':'{"ctx":"/uitemplate_web","refCode":"QY033","refName":"分销渠道"}'
      },//分销渠道编码
      channelCode: {type: 'string'},
      channelName: {type: 'string'},
      productGroupId: {
        type: 'string',
        required:true,
        'refmodel':JSON.stringify(refinfo['productGroup']),
        'refcfg':'{"ctx":"/uitemplate_web"}'
      },//产品组
      productGroupCode: {type: 'string'},
      productGroupName: {type: 'string'},
      soState: {type: 'string',default:'0'},
      deliveryState: {type: 'string',default:'0'},
      invoiceState: {type: 'string',default:'0'},
      supportState: {type: 'string',default:'0'},
      accountState: {type: 'string'},
      statusCode: {type: 'string',default:"1"},
      disableReason:{type: 'string'},//停止原因
      disableDate:{type: 'date',required:true},//停止日期
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}




})
