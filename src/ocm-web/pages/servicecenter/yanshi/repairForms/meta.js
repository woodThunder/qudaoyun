define(["ocm_global"], function () {
    window.mainListMeta = {
        meta: {
            id: { type: 'string' },
            modifier: { type: 'string' },//修改人
            modifiedTime: { type: 'datetime' },//修改时间
            creator: { type: 'string' },//创建人
            creationTime: { type: 'datetime' },//创建时间

            code: { type: 'string' },// 回访单编码
            visitDate:{ type: 'datetime' },//回访日期
            visitPerson: { type: 'string',required:true,default:"李亚萍" },//回访人
            parentDealers: { type: 'string' },//所属经销商
            customerName: { type: 'string' },//顾客姓名
            phone: { type: 'string',
                    maxLength: 30,
                    regExp: /^\d+$/,
                    errorMsg: '电话号码不正确',required:true},//电话
            serviceType: { type: 'integer' },//服务类型
            serviceDate: { type: 'datetime' },//服务完成时间
            serviceCode: { type: 'string' ,required:true,maxLength: 30,regExp:/^[A-Za-z0-9]+$/ , errorMsg: '请输入字母或数字',},//服务工单号
            satisfiedLevel: { type: 'integer' },//满意度评分
            notSatisfied: { type: 'string' },//不满原因
            
            whetherHome: { type: 'integer',required:true },//是否按时上门
            whetherIntroduce: { type: 'integer',required:true  },//是否有产品知识介绍
            whetherCollectFree: { type: 'integer',required:true  },//是否有其他收费
            whetherVisit: { type: 'integer',required:true  },//专卖店是否回访
            whetherSuggest: { type: 'integer' ,required:true },//是否有产品建议
            productSuggest: { type: 'string' },//产品意见或建议
            remark: { type: 'string' },//备注    
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
    }

});
