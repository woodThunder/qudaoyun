define(["ocm_global"],function(){
window.Accountmeta = {
    params: {
        "cls": "cn.com.quanyou.cs.prom.service.dto.AccountDto"
    },
    meta: {
    	//基本信息开始
    	id:{type: 'string'},
	    code:{type: 'string',enable:false},//编码
	    name:{type: 'string',required:true},//名称
	    description:{type: 'string'},//描述
	    accountAbbr:{type: 'string',required:true},//简称
	    customerId:{
	    	type: 'string',
	    	required:true,
	    	"refmodel": JSON.stringify(refinfo['customer']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isReturnCode":true}',
            "refparam":'{"EQ_isEnable":"1"}'
	    },//客户主键
	    customerName:{type: 'string'},//客户名称
	    customerCode:{type: 'string'},//客户编码
	    customerAddressId:{
	    	type: 'string',
	    	required:true,
	    	"refmodel":JSON.stringify(refinfo['customeraddress']),
	    	"refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
//	    	"refparams":''
	    },//地址主键
	    customerAddressName:{type: 'string'},//地址名称
	    customerAddressCode:{type: 'string'},//地址编码
	    accountTypeId:{
	    	type: 'string',
	        "refmodel":JSON.stringify(refinfo['custdocdef']),
	    	"refcfg":'{"ctx":"/uitemplate_web","refCode":"QY034","refName":"账号类型"}',
	    },//业务账号类型
	    accountTypeCode:{type: 'string'},//业务账号类型
	    accountTypeName:{type: 'string'},//业务账号类型
	    bank:{type: 'string'},//开户银行
	    bankAccount:{type: 'string'},//银行账号
	    statusCode:{type: 'string'},//状态
	    statusId:{type: 'string'},//状态
	    statusName:{type: 'string'},//状态
	    countryName:{type: 'string'},//国别
	    addressDetail:{type: 'string'},//详细地址
	    stopTime:{type: 'date'},//停止时间
	    stopCause:{type: 'string'},//停止原因
	    isAutoEncoded: {type: 'string'}, // 是否自动编码
    },
    pageSize:10,
    //是否启用前端缓存
    // pageCache: true
}

window.Contactmeta ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.ContactDto"
    },
    meta: {
      id:{type: 'string'},
      code:{type: 'string'},//编码
      name:{type: 'string'},//名称
      contactTypeId: {
      type: 'string',
      'refmodel':JSON.stringify(refinfo['custdocdef']),
      'refcfg':'{"ctx":"/uitemplate_web","refCode":"QY019","refName":"联系人类别"}',
       },//联系人类别
      contactTypeCode: {type: 'string'},//联系人类别
      contactTypeName: {type: 'string'},//联系人类别
      contactTel: {type: 'string'},//联系人电话
      contactPhone: {type: 'string'},//联系人手机
      contactFax: {type: 'string'},//传真
      address: {type: 'string'},//联系人地址
      email: {type: 'string'},//联系人邮箱
      QQ: {type: 'string'},//联系人邮箱
      accountId: {type: 'string'},//业务账号
      accountCode: {type: 'string'},//业务账号
      accountName: {type: 'string'},//业务账号
      statusCode: {type: 'string'},//状态
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
window.accountMgOrgmeta ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.AccountMgOrgDto"
    },
      
    meta: {
      id:{type: 'string'},
      accountId:{type: 'string'},//账户ID
      personId:{
      	type: 'string',
      	'refmodel':JSON.stringify(refinfo['accountManager']),
      	'refcfg':'{"ctx":"/uitemplate_web"}',
      },//人员
      personCode:{type: 'string'},//人员
      personName:{type: 'string'},//人员
      personTel:{type: 'string'},//人员
      organizationId:{
      	type: 'string',
      	'refmodel':JSON.stringify(refinfo['organization_ocm']),
        'refcfg':'{"ctx":"/uitemplate_web","refReturnCode":true}',
        'refparam':'{"EQ_isSaleOrganization":"1"}',
      },//销售组织ID
      organizationIsOffice:{type: 'string'},
      isOffice:{type: 'string'},
      organizationCode:{type: 'string'},//销售组织
      organizationName:{type: 'string'},//销售组织
      officeOrganizationId:{
      	type: 'string',
      	'refmodel':JSON.stringify(refinfo['organization_ocm']),
        'refcfg':'{"ctx":"/uitemplate_web","refName":"办事处"}',
      },//办事处ID
      officeOrganizationCode:{type: 'string'},//办事处
      officeOrganizationName:{type: 'string'},//办事处
      channelId:{
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['custdocdef']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":"QY033","refName":"分销渠道","refReturnCode":true}'
      },//分销渠道
      channelCode:{type: 'string'},//分销渠道
      channelName:{type: 'string'},//分销渠道
      productGroupId:{
      	type: 'string',
      	'refmodel':JSON.stringify(refinfo['productGroup']),
        'refcfg':'{"ctx":"/uitemplate_web","refReturnCode":true}',
      },//产品组编码
      productGroupName:{type: 'string'},//产品组编码
      productGroupCode:{type: 'string'},//产品组编码
      accountAllocationGroupId:{type: 'string'},//账户分配租
      accountAllocationGroupCode:{type: 'string'},//账户分配租
      accountAllocationGroupName:{type: 'string'},//账户分配租
      
      soState: {type: 'integer'},//销售订单冻结
      deliveryState: {type: 'integer'},//交货冻结
      invoiceState: {type: 'integer'},//出具发票冻结
      supportState: {type: 'integer'},//冻结销售支持
      accountState: {type: 'integer'},//记账冻结
      stopTime: {type: 'date'},//停止时间
      statusCode:{type: 'string'},//状态
      shipToPartyId:{type: 'string'},//送达方
      
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
window.channelCusStoremeta ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.ChannelCusStoreDto"
    },
    meta: {
	  id:{type: 'string'},
      code:{type: 'string'},//编码
      name:{type: 'string'},//名称
      description:{type: 'string'},//描述
      accountId:{type: 'string'},//账户
      accountCode:{type: 'string'},//账户
      accountName:{type: 'string'},//账户
      shipToPartyId:{
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['shipToPartys']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        'refparam':'{"EQ_isEnable":"1"}'
      },//送达方
      shipToPartyCode:{type: 'string'},//送达方
      shipToPartyName:{type: 'string'},//送达方
      countryName:{type: 'string'},//国别
      provinceName:{type: 'string'},//省
      cityName:{type: 'string'},//市
      countyName:{type: 'string'},//区
      townName:{type: 'string'},//镇
      address:{type: 'string'},//详细地址
      logisticPeriod:{type: 'string'},//标准物流周期
      longitude:{type: 'string'},//经度
      latitude:{type: 'string'},//纬度
      firstReceiver:{type: 'string'},//收货第一联系人姓名
      firstReceiverTel:{type: 'string'},//纬度收货第一联系人电话
      firstReceiverPhone:{type: 'string'},//收货第一联系人手机
      secondReceiver:{type: 'string'},//收货第二联系人姓名
      secondReceiverTel:{type: 'string'},//收货第二联系人手机
      secondReceiverPhone:{type: 'string'},//收货第二联系人手机
      thirdReceiver:{type: 'string'},//收货第三联系人姓名
      thirdReceiverTel:{type: 'string'},//收货第三联系人电话
      thirdReceiverPhone:{type: 'string'},//收货第三联系人手机
      statusCode:{type: 'string'},//状态
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
window.companyInfometa ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.CompanyInfoDto"
    },
    meta: {
	  id:{type: 'string'},
      accountId: {type: 'string'},//账号编码
      corporateUnitId: {
      	type: 'string',
      	"refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg":'{"ctx":"/uitemplate_web","refName":"公司代码"}',
        "refparam":'{"EQ_isCorporationEnterprise" : "1"}'
      },//公司代码
      corporateUnitCode: {type: 'string'},//公司代码
      corporateUnitName: {type: 'string'},//公司代码
      reconciliationAccountId:{
      	type: 'string',
  		"refmodel": JSON.stringify(refinfo['custdocdef']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":"QY035","refName":"统驭科目"}'
      },//统驭科目
      reconciliationAccountCode:{type: 'string'},//统驭科目
      reconciliationAccountName:{type: 'string'},//统驭科目
      status:{type: 'string',required:true},
      accountState:{type: 'string'},
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}

})
