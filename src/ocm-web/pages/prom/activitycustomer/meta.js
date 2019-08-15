define(["ocm_global"],function(){
  //活动定义
  window.PromoActivity = {
    params: {
      "cls": "com.yonyou.ocm.prom.service.dto.ProductCombineDto"
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
  // 经销商子表
  window.Customer = {
    meta: {
      id:{type:'string'},
      customerId:{type: 'string'},//id
      customerCode:{type: 'string'},//编码
      customerName: {type: 'string'},//名称
      commitDeliveryMny: {type: 'string'},//承诺提货总额
      actualDeliveryMny: {type: 'string'},//实际提货总额
      note: {type: 'string'},//备注
      enabled: {type: 'integer',default:1},//启用状态
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'},
      dr:{type:'string'},
      pickAccountId: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['account']),
        "refcfg": '{"ctx":"/uitemplate_web"}',
        "refparam": '{"EQ_isEnable":"1"}'
      },  //提货账户
      pickAccountCode: {type: 'string'},  //提货账户
      pickAccountName: {type: 'string'},  //提货账户
      accountTypeId: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['custdocdef']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":"QY034","refName":"账号类型"}',
      },  //账户类型
      accountTypeName: {type: 'string'},  //账户类型
      commitDetailList: {
        type: 'child',
        meta: {
          id:{type:'string'},
          showCode:{type:'string'},
          showName:{type:'string'},
          combineId:{type:'string'},
          combineCode:{type:'string'},
          combineName:{type:'string'},
          productId:{type:'string'},
          productCode:{type:'string'},
          productName:{type:'string'},
          seriesId:{type:'string'},
          seriesCode:{type:'string'},
          seriesName:{type:'string'},
          materialTypeCode:{type:'string'}, //物料类型编码
          materialTypeName:{type:'string'}, //物料类型名称
          productUnit:{type:'string'},  //计量单位
          price:{type:'string'},  //单价
          minOrderAmount:{type:'string'}, //最低订货量
          maxOrderAmount:{type:'string'},//最高订货量
          commitDeliveryNum:{type:'string'},//承诺提货数量
          commitDeliveryMny:{type:'string'},//承诺提货金额
          firstDemandNum:{type:'string'},//首批需求量
          actualTakeNum:{type:'string'},//实际提货数量
          actualTakeMny:{type:'string'},//实际提货金额
        }
      }
    },
    pageSize: 10,
  }
  // 经销商参照
  window.CustomerRef = {
    meta: {
      customerref:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['customerRefb']),
        "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
      },//id
    }
  }
  // 经销商产品明细孙表
  window.CommitDetail = {
    meta: {
      id:{type:'string'},
      showCode:{type:'string'},
      showName:{type:'string'},
      combineId:{type:'string'},
      combineCode:{type:'string'},
      combineName:{type:'string'},
      productId:{type:'string'},
      productCode:{type:'string'},
      productName:{type:'string'},
      seriesId:{type:'string'},
      seriesCode:{type:'string'},
      seriesName:{type:'string'},
      materialTypeCode:{type:'string'}, //物料类型编码
      materialTypeName:{type:'string'}, //物料类型名称
      productUnit:{type:'string'},  //计量单位
      price:{type:'string'},  //单价
      minOrderAmount:{type:'integer'}, //最低订货量
      maxOrderAmount:{type:'integer'},//最高订货量
      commitDeliveryNum:{type:'integer',min:1},//承诺提货数量
      commitDeliveryMny:{type:'string'},//承诺提货金额
      firstDemandNum:{type:'integer',min:1},//首批需求量
      actualTakeNum:{type:'string'},//实际提货数量
      actualTakeMny:{type:'string'},//实际提货金额
    }
  }
  //产品参照
  window.ProductRef = {
    meta: {
      productref: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['promproducttab']),
        "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
      }
    }
  }
  // 变更历史
  window.ActivityHis = {
    meta: {
      id: {type: 'string'},
      operationTime: {type: 'datetime'},
      customerListDtos: {
        type: 'child',
        meta: {
          id:{type:'string'},
          operation:{type:'string'},
          sourceId:{type:'string'},
          operationTime:{type:'string'},
          customerId:{type: 'string'},//id
          customerCode:{type: 'string'},//编码
          customerName: {type: 'string'},//名称
          commitDeliveryMny: {type: 'string'},//承诺提货总额
          actualDeliveryMny: {type: 'string'},//实际提货总额
          note: {type: 'string'},//备注
          enabled: {type: 'integer',default:1},//启用状态
          operationCol: {type: 'string'},  //操作
          creator:{type: 'string'},
          creationTime:{type: 'datetime'},
          modifier:{type: 'string'},
          modifiedTime:{type: 'datetime'},
          dr:{type:'string'},
        }
      }
    }
  }
})
