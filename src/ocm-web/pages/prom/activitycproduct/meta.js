define(["ocm_global"],function () {
    window.ProductcCombine = {
        meta:{
            id:{type:'string'},
            code:{
                type:'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['promactivityc']),
                "refcfg":'{"ctx":"/uitemplate_web","isReturnCode":true}'
            },  //活动编码
            name:{type:'string',required:true},  //活动名称
            activeTypecId: {type: 'string',required:true},  //活动类型
            activeTypecName: {type: 'string',required:true}, //活动类型名称
            agencyId: {
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                "refparam":'{"EQ_isOffice":"1","isEnable":"1"}'
            },
            agencyName: {type: 'string',required:true}, //所属办事处名称

            creator:{type: 'string'},  // 创建人
            creationTime:{type: 'datetime'}, //创建时间
            modifier:{type: 'string'}, //修改人
            modifiedTime:{type: 'datetime'},  //修改时间

            terminalStartDate: {type: 'date',format: "YYYY-MM-DD",required:true}, //活动开始日期
            terminalEndDate: {type: 'date',format: "YYYY-MM-DD",required:true}, //活动截至日期
            auditStatus: {type: 'string',required:true,default:'0'}, //审核状态
            auditor: {type: 'string',required:true}, //审核人
            auditTime: {type: 'string',required:true} //审核人
        },
      pageSize: 20,
    }
    window.ProductcombineItem = {
        meta:{
            id:{type: 'string'},
            activityId:{type:"string"},
            showCode:{type: 'string',required:true},//产品编码
            showName: {type: 'string',required:true},//产品名称
            combineId:{type:"string",required:true}, //组合产品id
            combineCode:{type:"string",required:true}, //组合产品code
            combineName:{type:"string",required:true}, //组合产品name

            productId :{type:"string",required:true}, // 产品id
            productCode :{type:"string",required:true}, // 产品编码
            productName :{type:"string",required:true},// 产品名称
            productCategoryName:{type:"string",required:true}, // 产品品类名称
            productSaleSeriesName:{type:"string",required:true}, //产品销售系列名称
            mainColorDocName:{type:"string",required:true}, //产品色号
            productModelName:{type:"string",required:true}, //产品型号
            standardName: {type:"string",required:true}, // 尺寸/规格
            productStatus: {type:"string",required:true}, // 产品状态
            isEnable :{type:"string",default:1},//启用状态
        },
      pageSize: 10,
    }
    window.ItemRef = {
        meta: {
            productRefer: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['promproductstab']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
                "refparam":'{"isEnable":"1"}'
            },
            refCode: {type: 'string'},
            refName: {type: 'string'},
            prodState: {type: 'string'},
        }
    }

    window.CopyAct = {
        meta: {
            copyactref: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['promactivityc']),
                "refcfg": '{"ctx":"/uitemplate_web"}',
                "refparam":'{"isEnable":"1"}'
            },
        }
    }
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
})
