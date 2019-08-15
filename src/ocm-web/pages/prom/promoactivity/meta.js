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
        // required:true,
        "refmodel": JSON.stringify(refinfo['activenode']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_enableStatus":"1"}'
      }, //活动节点id
      activeNodeName: {type: 'string'}, //活动节点名称
      higherActiveId: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['promactivity']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        "refparam":'{"EQ_enableStatus":"1"}'
      }, //上级活动节点id
      higherActiveName: {type: 'string'}, //上级活动节点名称
      approveStatus: {type: 'integer',default:"0"}, //审核状态
      orderStartDate: {type: 'string',required:true}, //订货开始日期
      orderEndDate: {type: 'string',required:true}, //订货截至日期
      orderDateRange: {type: 'string',required:true}, //订货有效期
      enrolStartDate: {type: 'string',required:true}, //报名开始日期
      enrolEndDate: {type: 'string',required:true}, //报名截至日期
      enrolDateRange: {type: 'string',required:true}, //报名有效期
      terminalStartDate: {type: 'string'}, //终端开始日期
      terminalEndDate: {type: 'string'}, //终端截至日期
      terminalDateRange: {type: 'string'}, //终端活动期间
      costBudgetAmout: {type: 'float',precision:2, regExp: /^\d{1,13}(\.\d*)?$/,errorMsg:"金额整数位不能超过13"}, //费用预算金额
      deliveryTargetAmout: {type: 'float',precision:2, regExp: /^\d{1,13}(\.\d*)?$/,errorMsg:"金额整数位不能超过13"}, //提货目标总额
      saleTargetAmout: {type: 'float',precision:2, regExp: /^\d{1,13}(\.\d*)?$/,errorMsg:"金额整数位不能超过13"}, //零售目标总额
      description: {type: 'string'}, //活动描述
      attachmentUrl: {type: 'string'}, //上传活动文件
      activeTypeId: {
        type: 'string',
        required:true,
        'refmodel': JSON.stringify(refinfo['activitytypeb']),
        "refcfg":'{"ctx":"/uitemplate_web"}',
        "refparam":'{"EQ_isEnable":"1"}'
      }, //活动类型id
      activeTypeName: {type: 'string'}, //活动类型名称
      activeTypeIsProductTask: {type: 'string'}, //活动类型-有提货任务
      activeTypeIsToProductDetail: {type: 'string'}, //活动类型-提货任务到产品明细
      activeTypeIsPrice: {type: 'string'}, //活动类型-优惠方式-价格
      activeTypeIsRebate: {type: 'string'}, //活动类型-优惠方式-返利
      activeTypeIsCostSupport: {type: 'string'}, //活动类型-优惠方式-费用支持
      //活动类型-活动目的
      //活动类型-经销商报名
      enableStatus: {type: 'string',required:true,default:1},//启用状态
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'},
      dr:{type: 'string'},
      state: {type: 'string',default:'0'},
      useStatus:{type: 'string'}, //使用状态，由当前日期和订货日期决定
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
  }
  //业务类型
  window.BussType = {
    meta: {
      id:{type:'string'},
      bussiTypeId:{type: 'string'},//id
      bussiTypeCode:{type: 'string',required:true},//编码
      bussiTypeName: {type: 'string',required:true},//名称
      dr:{type: 'string'},
    }
  }
  //办事处
  window.Agency = {
    meta: {
      id:{type:'string'},
      officeId:{type: 'string'},//id
      officeCode:{type: 'string',required:true},//编码
      officeName: {type: 'string',required:true},//名称
      dr:{type: 'string'},
    }
  }
  //业务类型参照
  window.BussTypeRef = {
    meta: {
      bussRefer:{
        type: 'string',
        "refmodel": JSON.stringify(refinfo['busstype']),
        "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
        "refparam":'{"EQ_isEnable":"1"}'
      },//id
    }
  }
  //办事处参照
  window.AgencyRef = {
    meta: {
      agencyRefer: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
        "refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'
      }
    }
  }
  window.FileMeta = {
      meta: {
        id: {type: 'string'},//主键
        filepath: {type: 'string'},//文件名称
        filesize: {type: 'string'},//文件大小
        filename: {type: 'string'},//文件名称
        uploadtime: {type: 'datetime'},//上传时间
        groupname: {type: 'string'},//
        url: {type: 'string'}//URL
      }
    }
})
