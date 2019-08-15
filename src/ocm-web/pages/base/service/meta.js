define(["ocm_global"],function(){

window.finishedProductSuite = {
    params: {
        "cls": "cn.com.quanyou.cs.prom.service.dto.ProductInfoDto"
    },
    meta: {
    	//基本信息开始
	    code:{type: 'string',required:true},//编码
	    description:{type: 'string',required:true},//描述
	    proAbbreviation:{type: 'string',required:true},//简称
	    statusCode:{type: 'string',default:1},//状态编码
	    statusId:{type: 'string'},//状态编码
	    statusName:{type: 'string'},//状态名称
	    whetherSaleProduct:{type: 'integer'},//是否销售产品
	    whetherProductPack:{type: 'integer'},//是否包件
	    whetherProductSuite:{type: 'integer'},//是否套件
	    productType:{type: 'integer',default:'0'},//产品类型
	    
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}




})
