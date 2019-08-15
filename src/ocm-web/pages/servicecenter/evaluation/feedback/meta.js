define(["ocm_global"], function () {
    window.mainListMeta = {
        meta: {
            id: { type: 'string' },
            code: { type: 'string'},//工单号   
            customerName: { type: 'string' },//客户
            serviceProviderPhone:{},//服务商电话
            phone:{ type: 'string'},//电话
            serviceEvaluation:{type: 'string'},//服务评价
            evaluationExplain:{type: 'string'},//评价说明
            creationTime: { type: 'datetime' },//创建时间
            acceptDate:{ type: 'datetime' },//受理日期
            repairDate:{ type: 'datetime' },//维修日期   
            successDate:{ type: 'datetime' },//完工时间
            applyDate: { type: 'datetime' },//请求时间
            requireDate: { type: 'datetime' },// 要求服务时间
            //服务商
            serviceProviderName:{ type: "string"},
            serviceProviderCode:{ type: "string"},
            serviceProviderId:{
                type: "string",
                "refmodel": JSON.stringify(refinfo['sc-per-ref']),
                "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
            }
        },
        pageSize: 10,
        //是否启用前端缓存
      
    }

})
