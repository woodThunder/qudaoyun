define(["ocm_global"],function(){

window.finishedProductSuite = {
    params: {
        "cls": "cn.com.quanyou.cs.prom.service.dto.ProductInfoDto"
    },
    meta: {
    	//基本信息开始
	    id:{type: 'string'},
	    code:{type: 'string',required:true},//编码
	    name:{type: 'string'},//名称
	    description:{type: 'string',required:true},//描述
	    statusCode:{type: 'string'},//状态编码
	    statusId:{type: 'string'},//状态编码
	    statusName:{type: 'string'},//状态名称
	    mainColorDocId: {
	        type: 'string',
	        "refmodel": JSON.stringify(refinfo['colordoc']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
	     },//主色ID
	    mainColorDocName:{type: 'string'},//主色名称
	    matchColorDocID:{
	    	type: 'string',
	        "refmodel": JSON.stringify(refinfo['colordoc']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":"true"}'
	    },
	    matchColorDoc:{type: 'string'},//配色
	    proNature:{type: 'string',required:true},//产品性质
	    proStateCode:{type: 'string',required:true},//产品状态
	    proStateId:{type: 'string'},//产品状态
	    proStateName:{type: 'string'},//产品状态
	    saleSeriesId: {
	        type: 'string',
            "refmodel": JSON.stringify(refinfo['productSaleSeries']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
	     },//销售系列ID
	    saleSeriesName:{type: 'string'},//销售系列名称
	    radSeriesId: {
	        type: 'string',
	        required:true,
            "refmodel": JSON.stringify(refinfo['productRadSeries']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
	        "refparam":'{"EQ_isEnable":"1"}'
	     },//研发系列ID
	    radSeriesCode:{type: 'string'},//研发系列编码
	    radSeriesName:{type: 'string'},//研发系列名称
	    productGroupId:{
	        type: 'string',
	        required:true,
            "refmodel": JSON.stringify(refinfo['productGroup']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
	        "refparam":'{"EQ_isEnable":"1"}'
	     },//产品组ID
	    productGroupCode:{type: 'string'},//产品组编码
	    productGropName:{type: 'string'},//产品组名称
	    productModelId: {
	        type: 'string',
	        required:true,
            "refmodel": JSON.stringify(refinfo['productModel']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
	     }, //型号id
	    productModelName:{type: 'string'},//型号名称
	    croMaStateId:{type: 'string'},//跨工厂物料状态
	    croMaStateCode:{type: 'string'},//跨工厂物料状态
	    croMaStateName:{type: 'string'},//跨工厂物料状态
	    proAbbreviation:{type: 'string',required:true},//简称
	    roughWeight:{type: 'float',precision:5},//毛重
	    cubage:{type: 'float',precision:5},//体积
	    weightUnitId:{
	        type: 'string',
	        required:true,
            "refmodel": JSON.stringify(refinfo['utils']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":"重量单位"}'
	     },//重量单位ID
	    weightUnitCode:{type: 'string',required:true},//重量单位
	    weightUnitName:{type: 'string'},//重量单位名称
	    volumeUnitId:{
	        type: 'string',
	        required:true,
	        "refmodel": JSON.stringify(refinfo['utils']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":"体积单位"}'
	     },//体积单位ID
	    volumeUnitCode:{type: 'string',required:true},//体积单位
	    volumeUnitName:{type: 'string'},//体积单位名称
	    baseUnitId:{
	        type: 'string',
	        required:true,
	        "refmodel": JSON.stringify(refinfo['utils']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":"基本单位"}',
	        "refparam":'{"EQ_isEnable":"1"}'
	     },//基本单位id
	    baseUnitCode:{type: 'string',required:true},//基本单位编码
	    baseUnitName:{type: 'string'},//基本单位名称
	    whetherSaleProduct:{type: 'integer',required:true},//是否销售产品
	    whetherProductPack:{type: 'integer',required:true},//是否包件
	    whetherProductSuite:{type: 'integer',required:true},//是否套件
	    customizeType:{type: 'string'},//异形类型
	    whetherUnconventionality:{type: 'integer'},//是否异形
	    whetherElecBusiniess:{type: 'integer',required:true},//是否电商
	    whetherEnginieering:{type: 'integer',required:true},//是否工程
	    whetherFinishedProduct:{type: 'integer',required:true},//是否成品
	    whetherCustomized:{type: 'integer',required:true},//是否定制
	    productTextureTypeId:{
	        type: 'string',
//	        required:true,
	        "refmodel": JSON.stringify(refinfo['ProductTextureType']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
	     },//材质类型ID

	    productTextureTypeName:{type: 'string'},//材质类型名称
	    mainTexture:{type: 'string'},//主要材质
	    boreColor:{type: 'string'},//内堂颜色
	    length:{type: 'float'},//长(外观)
	    width:{type: 'float'},//宽(外观)
	    height:{type: 'float'},//高(外观)
	    exteriorSize:{type: 'string'},//外观尺寸
	    whetherUpgrade:{type: 'integer'},//是否升级款
	    upgradeDesc:{type: 'string'},//升级款描述
	    whetherPromotion:{type: 'integer'},//是否促销款
	    proType:{type: 'string'},//物料类型
	    materialGroupId:{
	        type: 'string',
	        required:true,
            "refmodel": JSON.stringify(refinfo['ProdMaterial']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","refName":"物料组"}',
   			"refparam":'{"EQ_iSFinalStage":"1","EQ_isEnable":"1"}'
      },//物料组
	    materialGroupCode:{type: 'string'},//物料组
	    materialGroupName:{type: 'string'},//物料组
	    packageNum:{type: 'integer',required:true},//包装数量
	    proExplain:{type: 'string'},//要货说明
	    madeDays:{type: 'integer'},//自制天数
	    productFunctionID:{
	    	type: 'string',
	        "refmodel": JSON.stringify(refinfo['productFunction']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":"","isMultiSelectedEnabled":"true"}'
	    },
	   productFunction:{type: 'string'},//功能
	   functionDescription:{type: 'string'},//功能描述
	   standardId:{
	        type: 'string',
	        required:true,
	        "refmodel": JSON.stringify(refinfo['prodSpec']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
      },//规格ID
	    standardName:{type: 'string'},//规格名称
	    direction:{type: 'string'},//方向
	    productionModeCode:{type: 'string',required:true},//生产模式
	    productionModeId:{type: 'string'},//生产模式
	    productionModeName:{type: 'string'},//生产模式
	    diameter:{type: 'float'},//直径
	    whetherPart:{type: 'integer'},//是否为配件
	    mattressThckRef:{type: 'string'},//可配床垫厚度
	    prototypeId:{
	    	 type: 'string',
	        "refmodel": JSON.stringify(refinfo['product']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
	        "refparam":'{"EQ_productInfo.isUnconventionality":"0"}',
	    },//原型/异性产品ID
	    prototypeCode:{type: 'string'},//原型/异性产品编码
	    prototypeName:{type: 'string'},//原型/异性产品名称
	    productCategoryId: {
        type: 'string',
        required:true,
        "refmodel": JSON.stringify(refinfo['productCategory']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
      }, //品类id

	    productCategoryCode:{type: 'string'},//产品品类编码
	    productCategoryName:{type: 'string'},//产品品类名称
	    upgradeProductId:{
		    type: 'string',
	        "refmodel": JSON.stringify(refinfo['product']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
	        "refparam":'{"EQ_productInfo.isUpgrade" : "1"}'
	      },//升级款原型ID
	    upgradeProductCode:{type: 'string'},//升级款原型编码
	    upgradeProductName:{type: 'string'},//升级款原型名称
	    newSaleTime: {type: 'date'},//状态变更时间(新品)
        onStreamTime: {type: 'date'},//状态变更时间(在产)
        preDelistTime: {type: 'date'},//状态变更时间(预退市)
        delistTime: {type: 'date'},//状态变更时间(退市)
        stopSaleTime: {type: 'date'},//状态变更时间(停销)
	    colorDesc:{type: 'string'},//颜色描述
        


    //销售产品开始
      productId:{type: 'string'},//产品ID(销售产品)
      productCode:{type: 'string'},//产品编码(销售产品)
      productName: {type: 'string'},//产品名称(销售产品)
      productStatus: {type: 'string'},//产品状态(销售产品)
      productDescription: {type: 'string'},//产品描述(销售产品)
      whetherNewPro: {type: 'integer'},//是否新品(销售产品)
      designProductId:{
	        type: 'string',
	        "refmodel": JSON.stringify(refinfo['designProduct']),
	        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}'
	     },//所属设计产品ID(销售产品)
      designProductName: {type: 'string'},//所属设计产品名称(销售产品)
      trademarkId: {type: 'string'},//商标id(销售产品)
      trademarkCode: {type: 'string'},//商标编码(销售产品)
      trademarkName: {type: 'string'},//商标名称(销售产品)
      dismantleWashTypeCode: {type: 'string'},//拆洗类型(销售产品)
      dismantleWashTypeId: {type: 'string'},//拆洗类型(销售产品)
      dismantleWashTypeName: {type: 'string'},//拆洗类型(销售产品)
      dismantleWashDesc: {type: 'string'},//拆洗描述(销售产品)
      materialSupplyStatus: {type: 'string'},//拆洗状态(销售产品)
      whetherSupply: {type: 'integer'},//供货状态(销售产品)
      design:{type: 'string'},//款式
      whetherOuterFrame:{type: 'integer'},//是否带外架


      //成品套件开始
      finishedProductSuiteId: {type: 'string'},//成品套件ID(成品套件)
      finishedProductSuiteCode: {type: 'string'},//成品套件编码(成品套件)
      finishedProductSuiteName: {type: 'string'},//成品套件名称(成品套件)
      finishedProductSuiteDescription: {type: 'string'},//成品套件描述(成品套件)
      finishedProductSuiteStatus: {type: 'string'},//成品套件状态
//    whetherSingleRetail: {type: 'integer'},//是否单套可零售(成品套件)



      //包件开始
       finishedProductPackId: {type: 'string'},//包件ID(包件)
       finishedProductPackCode: {type: 'string'},//包件编码(包件)
       finishedProductPackName: {type: 'string'},//包件名称(包件)
       finishedProductPackDescription: {type: 'string'},//包件描述(包件)
       finishedProductPackStatus: {type: 'string'},//包件状态(包件)
       genericTypeCode: {type: 'string'},//通用类型(包件)
       genericTypeId: {type: 'string'},//通用类型(包件)
       genericTypeName: {type: 'string'},//通用类型(包件)
//     whetherPackSuite: {type: 'integer'},//是否单包成套(包件)
       packingStyleId: {type: 'string'},//包装方式(包件)
       packingStyleCode: {type: 'string'},//包装方式(包件)
       packingStyleName: {type: 'string'},//包装方式(包件)
       packageSize: {type: 'string'},//包装尺寸(包件)
       packageLength: {type: 'float'},//长(包装)(包件)
       packageWidth: {type: 'float'},//宽(包装)(包件)
       packageHeight: {type: 'float'},//高(包装)(包件)
       attributeClassId: {type: 'string'},//特征属性分类(包件)
       attributeClassCode: {type: 'string'},//特征属性分类(包件)
       attributeClassName: {type: 'string'},//特征属性分类(包件)
       suiteCoefficient: {type: 'float',precision:3},//折套系数(包件)
       labelStandardId: {type: 'string',required:true},//标签规格(包件)
       labelStandardCode: {type: 'string'},//标签规格(包件)
       labelStandardName: {type: 'string'},//标签规格(包件)
       corrugatedBoardId: {type: 'string'},//瓦楞纸板(包件)
       corrugatedBoardCode: {type: 'string'},//瓦楞纸板(包件)
       corrugatedBoardName: {type: 'string'},//瓦楞纸板(包件)
       area: {type: 'float'},//面积(包件)
       textureDesc: {type: 'string'},//材质描述(包件)
       surfaceDesc: {type: 'string'},//外观描述(包件)
       orderCode: {type: 'string'},//订单编码(包件)
       jalousieNum: {type: 'integer'},//百叶门扇数(包件)
       slidingDoorNum: {type: 'integer'},//移门扇数(包件)
       cabinetArea: {type: 'float'},//柜体面积(包件)
       slidingArea: {type: 'float'},//移门面积(包件)
       sealEdgeMeters: {type: 'float'},//封边米数(包件)
       plasticUptakeMeters: {type: 'float'},//吸塑面积(包件)
       backMeters: {type: 'float'},//背板面积(包件)
       plateMeters9mm: {type: 'float'},//9MM板件面积(包件)
       plateMeters18mm: {type: 'float'},//18MM板件面积(包件)
       plateMeters25mm: {type: 'float'},//25MM板件面积(包件)
       processList: {type: 'string'},//工序清单(包件)
       cabinetLabour: {type: 'string'},//柜体人工(包件)
       slidingLabour: {type: 'string'},//移门人工(包件)
       jalousieLabour: {type: 'string'},//百叶门人工(包件)
       plasticUptakeLabour: {type: 'string'},//吸塑人工(包件)
       difficultyParameter: {type: 'string'},//难度参数(包件)
       drawingType: {type: 'string'},//绘图类型(包件)
      
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
},

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
      pictureCategoryName: {type: 'string'},//图片类型
      pictureCategoryCode: {type: 'string'},//图片类型
      
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
},
  //办事处参照
  window.pictureCategoryRef = {
    meta: {
      pictureCategory: {
      	type: 'string',
  		"refmodel": JSON.stringify(refinfo['pictureCategories']),
        "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
        "refparam":'{"EQ_isEnable":"1"}'
      },//图片类型
    }
  },
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
