define(["ocm_global"],function () {
  window.poproductstrucsmeta ={
    id:{type: 'string'},
    parentId:{type:'string'},
    showCode :{type:'string'},
    showName :{type:'string'},
    activityId : {type:"string"}, //活动id
    shopId : {type: 'string',
      required:true,
      "refmodel": JSON.stringify(refinfo['activitystorec']),
      "refcfg":'{"ctx":"/uitemplate_web"}',
      "refparam":'{"customerId":""}'
    },  // 门店
    shopCode : {type:"string"},  // 门店Code
    shopName : {type:"string"},  // 门店Name
    customerId:{type: 'string',
      required:true,
      "refmodel": JSON.stringify(refinfo['customerRefc']),
      "refcfg":'{"ctx":"/uitemplate_web"}',
    }, // 经销商id
    customerCode:{type:"string"}, // 经销商Code
    customerName:{type:"string"}, // 经销商Name
    price:{type:"float"}, // 价格

    /*产品*/
    productId : {type:"string"},
    productCode:{type:"string"},
    productName : {type:"string"},
    productSaleSeriesId:{type:"string"},   //产品系列id
    productSaleSeriesName : {type:"string"},  //产品系列Name
    /*产品型号*/
    productModelName: {
      type: 'string',
      required:true,
      "refmodel": JSON.stringify(refinfo['productModel']),
      "refcfg":'{"ctx":"/uitemplate_web"}',},
    /*外观尺寸*/
    exteriorSize: {type:"string"},
    /*产品规格*/
    productStandardName: {type:"string"},
    /*产品组合*/
    combineId : {type:"string"},
    combineCode:{type:"string"},
    combineName : {type:"string"},

    adjustId : {type:"string"},  // 调价单编码
    adjustCode : {type:"string"}, //调价单名称

    note:{type:"string"}, // 备注
    isEnable:{type : "string"}, //启用状态

    creator:{type: 'string'},
    creationTime:{type: 'date'},
    modifier:{type: 'string'},
    modifiedTime:{type: 'date'},
    isCombine:{type: 'string'},
    dr: {type: 'integer'},
  }
  //零售活动价
    window.ActivityPriceC = {
        meta:{
            id:{type:"string"}, //id
            code:{
                type:'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['promactivityc']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                'refparam':'{"NOTEQ_auditStatus":"1"}'
            },  //活动编码
            activitycId : {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['promactivityc']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isReturnCode":true}',
                'refparam':'{"EQ_auditStatus":"0"}'
            },
            name:{type:'string'},  //活动名称
            adjustCode:{type:'string'},  //调价单编码
            activeTypecId: {
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['activitytypec']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
            },
            activeTypecCode: {type: 'string',required:true},
            activeTypecName: {type: 'string',required:true},
            agencyId: {
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                "refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'
            },    // 办事处
            agencyCode: {type: 'string',required:true},  // 办事处
            agencyName: {type: 'string',required:true},  // 办事处
            auditStatus: {type: 'string',required:true,default:"0"}, //审核状态
            description: {type: 'string',required:true}, //活动描述
            terminalStartDate: {type: 'date',format: "YYYY-MM-DD",required:true}, //活动开始日期
            terminalEndDate: {type: 'date',format: "YYYY-MM-DD",required:true}, //活动截至日期
            isEnable : {type:'string',default:'0'},
        },
      pageSize: 20,
    }
    // 产品参照
    window.ProductTabRef = {
        meta: {
            productref: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['promproductstab']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}'
            }
        }
    }
    //零售活动价 - 产品子表
    window.ActivityPriceItemC = {
        meta:{
            id:{type: 'string'},
            parentId:{type:'string'},
            showCode :{type:'string'},
            showName :{type:'string'},
            activityId : {type:"string"}, //活动id
            adjustCode:{type:'string'},  //调价单编码
            shopId : {type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['activitystorec']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
                "refparam":'{"customerId":""}'
            },  // 门店
            shopCode : {type:"string"},  // 门店Code
            shopName : {type:"string"},  // 门店Name
            customerId:{type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['customerRefc']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
            }, // 经销商id
            customerCode:{type:"string"}, // 经销商Code
            customerName:{type:"string"}, // 经销商Name
            price:{type:"float"}, // 价格

            /*产品*/
            productId : {type:"string"},
            productCode:{type:"string"},
            productName : {type:"string"},
            productSaleSeriesId:{type:"string"},   //产品系列id
            productSaleSeriesName : {type:"string"},  //产品系列Name
            /*产品型号*/
          productModelName: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['productModel']),
            "refcfg":'{"ctx":"/uitemplate_web"}',},
          /*外观尺寸*/
            exteriorSize: {type:"string"},
            /*产品规格*/
            productStandardName: {type:"string"},
          /*产品组合*/
            combineId : {type:"string"},
            combineCode:{type:"string"},
            combineName : {type:"string"},

            adjustId : {type:"string"},  // 调价单编码
            adjustCode : {type:"string"}, //调价单名称

            note:{type:"string"}, // 备注
            isEnable:{type : "string"}, //启用状态

            creator:{type: 'string'},
            creationTime:{type: 'date'},
            modifier:{type: 'string'},
            modifiedTime:{type: 'date'},
            isCombine:{type: 'string'},
            dr: {type: 'integer'},
        },
      pageSize: 10,
    }
    // 价格公式
    window.ActivityPriceFormula = {
        meta: {
            id: {type: 'string'},//id
          showId:{type: 'string'},
          showCode :{
            type: 'string',
            "refmodel": JSON.stringify(refinfo['promproductstab']),
            "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}'
          },
          showName:{type: 'string'},
          batchBasePriceId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['wholeSalePrice']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam':'{"EQ_auditStatus":"1","EQ_invalidStatus":"1"}'
            },//批发基础价id
            batchBasePriceCode: {type: 'string'},//批发基础价code
            batchBasePriceName: {type: 'string'},//批发基础价name
            saleManagerPriceId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['retailManager']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                'refparam':'{"EQ_auditStatus":"1","EQ_saleChannel":"02"}'
            }, //零售管控价id
            saleManagerPriceCode: {type: 'string'},//零售管控价code
            saleManagerPriceName: {type: 'string'},//零售管控价name
            agencyId: {
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
                "refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'
            },    // 办事处
            agencyCode: {type: 'string',required:true},  // 办事处
            agencyName: {type: 'string',required:true},  // 办事处
            seriesId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['productSaleSeries']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                "refparam":'{"EQ_isEnable":"1"}'
            },//产品系列id
            seriesCode: {type: 'string'},//产品系列code
            seriesName: {type: 'string'},//产品系列name
            floatScale: {type: 'float'},//上浮比例
            channelType : {type:'string',default:"批发"},
        }
    }
    // 产品BOM价格明细
    window.BomPrice = {
    meta: {
      id:{type: 'string'},//id
      parentId:{type:'string'},
      showCode:{type: 'string'},
      showName:{type: 'string'},
      productId: {type: 'string'},  // 产品id
      productCode: {type: 'string'},  // 产品code
      productName: {type: 'string'},  // 产品name
      productCombineId: {type: 'string'}, //产品组合id
      productCombineName: {type: 'string'}, //产品组合name
      price: {type: 'float'},  //价格
      enable_status: {type: 'string'},//启用状态
      note: {type: 'string'},//备注
      isPackage: {type: 'string'},//是否包件
      upperClass: {type: 'string'},
      dr: {type: 'integer'},
    },
    pageSize: 10,
  },
    //文件上传
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
  //图片分类
  window.ProdInfoAndPhotoInfometa ={
    params: {
      "cls": "cn.com.quanyou.cs.base.service.dto.ProdInfoAndPhotoInfoDto"
    },
    meta: {
      productInfoId:{type: 'string'},//产品基础信息ID
      prodPhotoInfoId:{type: 'string'},//产品图片ID
      prodPhotoInfoCode:{type: 'string'},//产品图片编码
      prodPhotoInfoUrl: {type: 'string'},//产品图片URL
      isMainPhoto: {type: 'integer'},//是否主图
      pictureCategoryId: {type: 'string'},//图片类型
      pictureCategoryName: {type: 'string'},//图片类型
      pictureCategoryCode: {type: 'string'},//图片类型

    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
  }
});
