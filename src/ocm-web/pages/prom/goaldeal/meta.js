define(["ocm_global"],function(){

//活动定义
window.PromoActivity = {
    params: {
        "cls": "cn.com.quanyou.cs.prom.service.dto.ProductCombineDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      activeNodeId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['activenode']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
      }, //活动节点id
      activeNodeName: {type: 'string',required:true}, //活动节点名称
      higherActiveId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['promactivity']),
        "refcfg":'{"ctx":"/uitemplate_web"}'
      }, //上级活动节点id
      higherActiveName: {type: 'string',required:true}, //上级活动节点名称
      approveStatus: {type: 'string'}, //审核状态
      orderStartDate: {type: 'Date',format: "YYYY-MM-DD",required:true}, //订货开始日期
      orderEndDate: {type: 'string',required:true}, //订货截至日期
      enrolStartDate: {type: 'date',required:true}, //报名开始日期
      enrolEndDate: {type: 'date',required:true}, //报名截至日期
      terminalStartDate: {type: 'date',required:true}, //终端开始日期
      terminalEndDate: {type: 'date',required:true}, //终端截至日期
      costBudgetAmout: {type: 'string'}, //费用预算金额
      deliveryTargetAmout: {type: 'string'}, //提货目标总额
      saleTargetAmout: {type: 'string'}, //零售目标总额
      description: {type: 'string'}, //活动描述
      attachmentUrl: {type: 'string'}, //上传活动文件
      activeTypeId: {
        type: 'string',
        required:true,
        'refmodel': JSON.stringify(refinfo['activitytypeb']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
      }, //活动类型id
      activeTypeName: {type: 'string',required:true}, //活动类型名称
      activeTypeIsProductTask: {type: 'string',required:true}, //活动类型-有提货任务
      activeTypeIsToProductDetail: {type: 'string',required:true}, //活动类型-提货任务到产品明细
      activeTypeIsPrice: {type: 'string',required:true}, //活动类型-优惠方式-价格
      activeTypeIsRebate: {type: 'string',required:true}, //活动类型-优惠方式-返利
      activeTypeIsCostSupport: {type: 'string',required:true}, //活动类型-优惠方式-费用支持
      //活动类型-活动目的
      //活动类型-经销商报名
      enableStatus: {type: 'string',required:true},//启用状态
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
// 活动目标分解
window.GoalDeal = {
  params: {
      "cls": "cn.com.quanyou.cs.prom.service.dto.GoalDealSaveDto"
  },
  meta: {
    id: {type: 'string'},
  }
}
// 产品目标
window.ProductGoal = {
  params: {
      "cls": "cn.com.quanyou.cs.prom.service.dto.ProductGoalDto"
  },
  meta: {
    id: {type: 'string'},
    activityId: {type: 'string'}, //活动
    combineId: {type: 'string'},  //产品组合
    productId: {type: 'string'},  //产品
    showCode: {type: 'string'},  //产品/产品组合编码
    showName: {type: 'string'},  //产品/产品组合名称
    productUnitName: {type: 'string'},  //计量单位
    goalNumber: {type: 'string',required:true}, //目标数量
    doneMonnyNumber: {type: 'string'},  //已分解金额
    doneNumber: {type: 'string'}, //已分解数量
    leftNumber: {type: 'string'}, //余量
    agencyProdgoalSet: {  //办事处产品目标
      type: 'child',
      meta: {
        id: {type: 'string'},
        parentId: {type: 'string'}, //产品目标分解
        agencyId: {type: 'string'},  //办事处id
        agencyCode: {type: 'string'},  //办事处code
        agencyName: {type: 'string'},  //办事处name
        todoNumber: {type: 'string'},  //分解数量
        doneMonnyNumber: {type: 'string'}, //已分解金额
        price: {type: 'string'}, //单价
        pkOrgId: {type: 'string'},  //询价销售组织
        pkOrgName: {type: 'string'},  //询价销售组织
      }
    },
  }
}
// 办事处产品目标
window.AgencyProdgoal = {
  params: {
      "cls": "cn.com.quanyou.cs.prom.service.dto.AgencyProdgoalDto"
  },
  meta: {
    id: {type: 'string'},
    parentId: {type: 'string'}, //产品目标分解
    agencyId: {type: 'string'},  //办事处id
    agencyCode: {type: 'string'},  //办事处code
    agencyName: {type: 'string'},  //办事处name
    todoNumber: {type: 'integer',required:true,min:1},  //分解数量
    doneMonnyNumber: {type: 'float'}, //已分解金额
    price: {type: 'float'}, //单价
    pkOrgId: {
      type: 'string',
      required:true,
      "refmodel": JSON.stringify(refinfo['organization_ocm']),
      "refcfg":'{"ctx":"/uitemplate_web"}',
      "refparam": '{"EQ_isSaleOrganization":"1","EQ_isEnable":"1"}'
    },//询价销售组织
    pkOrgName: {type: 'string'},
  }
}
// 办事处金额目标
window.AgencyCashgoal = {
  params: {
      "cls": "cn.com.quanyou.cs.prom.service.dto.AgencyCashgoalDto"
  },
  meta: {
    id: {type: 'string'},
    activityId: {type: 'string'}, //活动定义
    agencyId: {type: 'string'},  //办事处id
    agencyCode: {type: 'string'},  //办事处code
    agencyName: {type: 'string'},  //办事处name
    takeTargetMny: {type: 'float',required:true,precision:2, regExp: /^\d{1,13}(\.\d*)?$/,errorMsg:"金额整数位不能超过13"},  //提货目标金额
    saleTargetMny: {type: 'float',precision:2, regExp: /^\d{1,13}(\.\d*)?$/,errorMsg:"金额整数位不能超过13"}, //零售目标金额
    actualTakeMny: {type: 'string'}, //实际提货金额
    actualSaleMny: {type: 'string'},  //实际零售金额
  }
}
// 已选品（销售产品/产品组合）参照 TODO： iuap提供 暂时使用销售产品参照
var refcfg = {
  "ctx":"/uitemplate_web",
  "isMultiSelectedEnabled":true,
}
window.ProductRef = {
  meta: {
    productRefer: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['promproducttab']),
      "refcfg": JSON.stringify(refcfg)
    }
  }
}
//金额-办事处参照
window.AgencyRef = {
  meta: {
    agencyRefer: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['promofficeb']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
    }
  }
}
//产品-办事处参照
window.ProdAgencyRef = {
  meta: {
    prodagencyRefer: {
      type: 'string',
      "refmodel": JSON.stringify(refinfo['promofficeb']),
      "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
    }
  }
}
})
