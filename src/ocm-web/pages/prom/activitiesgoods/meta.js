define(["ocm_global"],function(){

window.DemoProductCombine = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//活动编码
      name:{type: 'string',required:true},//活动名称
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
      approveStatus:{type: 'string',required:true},//审核状态
      auditTime:{type: 'date',required:true},//审核时间
      remark:{type: 'string',required:true},//备注
      creator:{type: 'string',required:true},//创建人
	  creationTime:{type: 'date',required:true},//创建时间
	  modifier:{type: 'string',required:true},//修改人
	  modifiedTime:{type: 'date',required:true}//修改时间
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
window.DemoProductCombineItem = {
  params: {
      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineItemDto"
  },
  meta: {
  	id:{type: 'string'},
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
    isDistribution: {type: 'string', default:"0"},  //是否已分配
    productTotalNum: {type: 'string',regExp:/^\d+$/},  //总量控制
    // activityProductDealerSet: {
    // 	type: 'child',
    // 	meta: {
		//   	distributorId: {type: 'string'},//经销商id
		//     distributorCode: {type: 'string'},//经销商编码
		//     distributorName: {type: 'string'},//经销商名称
		//     agencyCode: {type: 'string'},//所属办事处编码
		//     agencyName: {type: 'string'},//所属办事处名称
		//     agencyPartitionName: {type: 'string'},//办事处分区编码
		//     agencyPartitionCode: {type: 'string'}//办事处分区名称
		// }
    // }//选品分配的经销商
  },
  pageSize: 10,
}
window.DemoItemRef = {
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
window.quoteItems = {
  meta: {
    showCode: {type: 'string'},
    showName: {type: 'string'}
  }
}
window.distributionItems = {
  meta: {
    showCode: {type: 'string'},
    showName: {type: 'string'}
  }
}
window.distributionNextItems = {
  meta: {
  	id:{},
  	distributorId: {type: 'string'},//经销商id
    distributorCode: {type: 'string'},//经销商编码
    distributorName: {type: 'string'},//经销商名称
    agencyCode: {type: 'string'},//所属办事处编码
    agencyName: {type: 'string'},//所属办事处名称
    agencyPartitionName: {type: 'string'},//办事处分区编码
    agencyPartitionCode: {type: 'string'}//办事处分区名称
  }
}
window.distributionSearchItems = {
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
