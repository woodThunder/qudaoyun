var WholeSaleFactorMeta  = {
  params: {
    "cls": "com.yonyou.ocm.price.service.dto.WholeSaleFactorAsseDto"
  },
  meta: {
      id:{type: 'string'},//id
      saleChannel: {type: 'string',required:true},//渠道类型
      product: {type: 'string',required:true},//产品
      belongProduct:{type: 'string',required:true},//所属产品
      agency:{type: 'string',required:true},// 办事处
      customer:{type: 'string',required:true},// 客户
      assembleName:{type: 'string',required:true},// 因子组合名称
      assemblePriority:{type: 'integer',required:true},// 组合优先级
      creator:{type: 'string',required:true},//创建人
	    creationTime:{type: 'date',required:true},//创建时间
	    modifier:{type: 'string',required:true},//修改人
	    modifiedTime:{type: 'date',required:true},//修改时间
      agencypartition: {type: 'string'},  //办事处分区
    },
    pageSize: 100,
    //是否启用前端缓存
    // pageCache: true
  }
  var WholeSaleSetItemsMeta = {
   meta: {
      id:{type: 'string'},//id
      name:{type: 'string',required:true},//因子名称
      priority: {type: 'string',required:true,regExp:/^\d+$/}  //优先级
    }
  }
