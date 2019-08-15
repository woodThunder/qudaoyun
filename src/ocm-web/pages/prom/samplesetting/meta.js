define(["ocm_global"],function(){

window.PromoActivity = {
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
// 上样标准（设计产品）
window.SampleSetting = {
  meta: {
    id: {type: 'string'},
    activityId: {type: 'string'},
    activityCode: {type: 'string'},
    activityName: {type: 'string'},
    productId: {type: 'string'},  //设计产品
    productCode: {type: 'string'},
    productName: {type: 'string'},
    productCategory: {type: 'string'},  //产品品类
    productModel: {type: 'string'}, //产品型号
    productSaleSerie: {type: 'string'}, //产品系列
    num: {type: 'string', default: 1, min: 1}, //数量
    isDistribution: {type: 'string', default:"0"}, //是否已分配
    operation: {type: 'string'},
    sampleSettingSubstis: {
      type: "child",
      meta: {
        sampleSettingId: {type: 'string'},  //所属上样标准（设计产品）
        productId: {type: 'string'},  //设计产品
        productCode: {type: 'string'},
        productName: {type: 'string'},
        productCategory: {type: 'string'},  //产品品类
        productModel: {type: 'string'}, //产品型号
        productModel: {type: 'string'}, //产品系列
      }
    }
  },
  pageSize: 10,
}

// 替代品
window.Substi = {
  meta: {
    sampleSettingId: {type: 'string'},  //所属上样标准（设计产品）
    productId: {type: 'string'},  //设计产品
    productCode: {type: 'string'},
    productName: {type: 'string'},
    productCategory: {type: 'string'},  //产品品类
    productModel: {type: 'string'}, //产品型号
    productSaleSerie: {type: 'string'}, //产品系列
  },
  pageSize: 10,
}
// 分配
window.Dealer = {
  meta: {
    sampleSettingId: {type: 'string'},  //所属上样标准（设计产品）
    shopId: {type: 'string'},
    shopCode: {type: 'string'},
    shopName: {type: 'string'},
    customerCode: {type: 'string'},
    customerName: {type: 'string'},
    operateArea: {type: 'string'},
    agencyCode: {type: 'string'},
    agencyName: {type: 'string'},
  },
  pageSize: 10,
}
// 设计产品参照
window.DesignProductReferMeta = {
  meta: {
    designProductId: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['promDesignProduct']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
    },
  }
}
})
