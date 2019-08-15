define(["ocm_global"],function(){

//活动调品单
window.ActivityProductAdjust = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//调品单编码
      name:{type: 'string',required:true},//调品单名称
      activityId:{
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['promactivity']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isReturnCode":true}',
        'refparam': '{"EQ_approveStatus":"1"}',
      },//活动id
      activityCode:{type: 'string'},  //活动code
      activityName:{type: 'string'},  //活动name
      activeTypeName: {type: 'string',required:true},//活动类型名称
      activeNodeName: {type: 'string',required:true},//活动节点名称
      orderStartDate: {type: 'date',required:true},//订货开始日期
      orderEndDate: {type: 'date',required:true},//订货截至日期
      enrolStartDate: {type: 'date',required:true},//报名有效期-开始日期
      enrolEndDate: {type: 'date',required:true},//报名有效期-结束时期
      terminalStartDate: {type: 'date',required:true},//终端活动期间-开始日期
      terminalEndDate: {type: 'date',required:true},//终端活动期间-截至日期
      description:{type: 'string'},//活动描述
      higherActiveCode:{type: 'string'},//上级活动编码
      higherActiveName:{type: 'string'},//上级活动名称
      isEnable: {type: 'string'},//启用状态
      isProductDistri: {type: 'string'},//是否需要产品分配
      auditor:{type: 'string',required:true},//审核人
      auditStatus:{type: 'string',required:true},//审核状态
      auditTime:{type: 'date',required:true},//审核时间
      creator:{type: 'string',required:true},//创建人
	  creationTime:{type: 'date',required:true},//创建时间
	  modifier:{type: 'string',required:true},//修改人
	  modifiedTime:{type: 'date',required:true},//修改时间
    status: {type: 'string'},
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
// 调品单产品详情
window.ActivityProductAdjustDetail = {
  params: {
      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
  },
  meta: {
  	id:{type: 'string'},
    activityProductAdjustId:{type: 'string'},  //调品单id
    activityId:{type: 'string'},//idp
    productId:{type: 'string'},//idp
    combineId:{type: 'string'},//idp
    productRefer: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['promproducttab']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"isReturnCode":"true"}'
    },
    showCode:{type: 'string',required:true},//产品编码
    showName: {type: 'string',required:true},//产品名称
    productCode: {type: 'string',required:true},//产品编码
    productName: {type: 'string',required:true},//产品名称
    combineCode: {type: 'string',required:true},//产品编码
    combineName: {type: 'string',required:true},//产品名称
    productSys: {type: 'string'},//产品系列
    productType: {type: 'string',required:true},//产品型号
    productmainColorDocName: {type: 'string'},//色号
    productProState: {type: 'string'},//产品状态
    productUnitName: {type: 'string'},//产品单位
    productCategoryName: {type: 'string'},//产品品类
    standardName: {type: 'string'},//尺寸、规格
    isMain: {type: 'string'},//是否主推款
    isProduct: {type: 'string'},//是否是产品
    goalNumber: {type: 'string'},//目标数量
    minNumber: {type: 'string',regExp:/^\d+$/},//最低承诺订货量
    maxNumber: {type: 'string',regExp:/^\d+$/},//最大可订货量
    isEnable: {type: 'string',default:1},//启用状态
    isDistribution: {type: 'string', default:"0"},
    productTotalNum: {type: 'string',regExp:/^\d+$/},  //总量控制
  },
  pageSize: 10,
}
// 产品参照 DemoItemRef
window.ProductRef = {
  meta: {
    productRefer: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['promproducttab']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
    },
    refCode: {type: 'string'},
    refName: {type: 'string'}
  }
}
// 上级活动选品
window.ParentActivityProduct = {
  meta: {
    showCode: {type: 'string'},
    showName: {type: 'string'}
  }
}
// 待分配产品
window.DealeringProduct = {
  meta: {
    showCode: {type: 'string'},
    showName: {type: 'string'}
  }
}
// 产品待分配经销商  distributionNextItems
window.ProductDealeringCustomer = {
  meta: {
  	id:{type: 'string'},
    activityProductAdjustDetailId: {type: 'string'},  //详情子表id
  	distributorId: {type: 'string'},//经销商id
    distributorCode: {type: 'string'},//经销商编码
    distributorName: {type: 'string'},//经销商名称
    agencyCode: {type: 'string'},//所属办事处编码
    agencyName: {type: 'string'},//所属办事处名称
    agencyPartitionName: {type: 'string'},//办事处分区编码
    agencyPartitionCode: {type: 'string'}//办事处分区名称
  }
}
// 产品已分配经销商
window.ProductDealeredCustomer = {
  meta: {
  	id:{type: 'string'},
    activityProductAdjustDetailId: {type: 'string'},  //详情子表id
  	distributorId: {type: 'string'},//经销商id
    distributorCode: {type: 'string'},//经销商编码
    distributorName: {type: 'string'},//经销商名称
    agencyCode: {type: 'string'},//所属办事处编码
    agencyName: {type: 'string'},//所属办事处名称
    agencyPartitionName: {type: 'string'},//办事处分区编码
    agencyPartitionCode: {type: 'string'}//办事处分区名称
  }
}
// 产品可选分配经销商查询
window.ProductCustomerDealerSearch = {
  meta: {
    agencyPartitionIds: {
    	type: 'string',
    	"refmodel": JSON.stringify(refinfo['agencypartition']),
      	"refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
    },//办事处分区
    agencyIds: {
    	type: 'string',
      	'refmodel':JSON.stringify(refinfo['promofficeb']),
    	'refcfg':'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"refName":"办事处"}',
    	"refparam":'{"activityId":""}'
    },//办事处
    customerIds: {
    	type: 'string',
      "refmodel": JSON.stringify(refinfo['customerRefbchoose']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
      	"refparam":'{"activityId":""}'
    },//经销商
    activityId: {type: 'string'}
  }
}
})
