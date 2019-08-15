define(["ocm_global"],function(){

window.buoyancyfactorlistmeta = {
    params: {
        "cls": "cn.com.quanyou.cs.sp.service.dto.FloatCoefficientDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string'},//上浮系数编码
      name:{type: 'string',required:true},//上浮系数名称
      auditor:{type: 'string'},//审核人
      auditStatus:{type: 'string'},//审核状态
      auditTime:{type: 'date'},//审核时间
      invalider:{type: 'string'},//作废人
      invalidStatus:{type: 'string'},//作废状态
      invalidTime:{type: 'date'},//作废时间
      remark:{type: 'string'},//备注
      creator:{type: 'string'},//创建人
	  creationTime:{type: 'date'},//创建时间
	  modifier:{type: 'string'},//修改人
	  modifiedTime:{type: 'date'}//修改时间
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
window.buoyancyfactorlistchildmeta = {
	meta: {
		code:{},
		name:{},
		auditor:{},
		auditTime:{},
		invalider:{},
		invalidTime:{},//复制时清空类


		orderTypeId:{
			'refmodel':JSON.stringify(refinfo['busstype']),
    		'refcfg':'{"ctx":"/uitemplate_web"}'
		},//业务标识 参照
		orderTypeName: {

		},
		saleChannelId:{
			'refmodel':JSON.stringify(refinfo['orderType']),
    		'refcfg':'{"ctx":"/uitemplate_web"}'
		},//分销渠道 参照
		saleChannelName: {

		},
	    productGroupId:{
	    	'refmodel':JSON.stringify(refinfo['productGroup']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isEnable":"1"}'
	    },//产品组 参照
	    productGroupName:{
			type:'string'
	    },
	    productGroupCode:{
			type:'string'
	    },
	    agencyId:{
	    	'refmodel':JSON.stringify(refinfo['organization_ocm']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'//是否办事处
	    },//办事处 参照
	    agencyName: {

	    },
	    customerId:{
	    	'refmodel':JSON.stringify(refinfo['customer']),
    		'refcfg':'{"ctx":"/uitemplate_web"}',
    		"refparam":'{"EQ_isEnable":"1"}'
	    },//客户
	    customerName:{

	    },
	    proportion:{type: 'string',required:true},//上浮比例
	    beginTime:{type: 'date',required:true},//开始时间
	    endTime:{type: 'date',required:true},//结束时间
	    adjustCode:{type: 'string',required:true},//调整单号
	    isEnable:{type: 'string',required:true,default:"1"},//启用状态
	    changeHistory:{type: 'string',required:true},//变更历史
	    remark: {type: 'string'},//备注
	    creator:{type: 'string'},//创建人
		creationTime:{type: 'date'},//创建时间
		modifier:{type: 'string'},//修改人
		modifiedTime:{type: 'date'}//修改时间
	},
	pageSize: 10,
}
})
