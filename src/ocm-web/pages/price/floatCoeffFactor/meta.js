var FloatCoeffFactormeta  = {
    params: {
        "cls": "cn.com.quanyou.cs.sp.service.dto.FloatCoeffFactorDto"
    },
    meta: {
      id:{type: 'string'},//id
      identifier:{type: 'string',required:true},//业务标识
      saleChannel: {type: 'string',required:true},//渠道类型
      productGroup: {type: 'string',required:true},//产品组
      agency:{type: 'string',required:true},// 办事处
      customer:{type: 'string',required:true},// 客户
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
var floatSetItems = {
	meta: {
      id:{type: 'string'},//id
      name:{type: 'string',required:true},//因子名称
      priority: {type: 'string',required:true,regExp:/^\d+$/}  //优先级
    }
}
