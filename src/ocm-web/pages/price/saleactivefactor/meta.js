var SaleActiveFactorMeta  = {
  params: {
    "cls": "com.yonyou.ocm.price.service.dto.SaleMgrFactorAsseDto"
  },
  meta: {
      id:{type: 'string'},//id
      product: {type: 'string',required:true},//产品
      distributor:{type: 'string',required:true},// 经销商
      store:{type: 'string',required:true},// 门店
      assembleName:{type: 'string',required:true},// 因子组合名称
      assemblePriority:{type: 'integer',required:true},// 组合优先级
      creator:{type: 'string',required:true},//创建人
	    creationTime:{type: 'date',required:true},//创建时间
	    modifier:{type: 'string',required:true},//修改人
	    modifiedTime:{type: 'date',required:true}//修改时间
    },
    pageSize: 100,
    //是否启用前端缓存
    // pageCache: true
  }
  var SaleActiveSetItemsMeta = {
   meta: {
      id:{type: 'string'},//id
      name:{type: 'string',required:true},//因子名称
      priority: {type: 'string',required:true,regExp:/^\d+$/}  //优先级
    }
  }
