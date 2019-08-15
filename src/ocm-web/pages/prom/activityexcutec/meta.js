define(["ocm_global"],function(){
    window.ActivityCExcute = {
        meta: {
          id:{type: 'string'},
          code:{type: 'string'},
          activeTypecId:{type: 'string',required:true},//活动类型
          activeTypecCode: {type: 'string',required:true},//活动类型
          activeTypecName: {type: 'string',required:true},//活动类型

          responsiblePersonId: {type: 'string',required:true},//活动负责人
          responsiblePersonCode: {type: 'string',required:true},//人员code
          responsiblePersonName: {type: 'string',required:true},//人员name

          linkPhone: {type: 'string',required:true},//联系电话

          agencyId: {type: 'string',required:true},//办事处
          agencyCode: {type: 'string',required:true},//办事处
          agencyName: {type: 'string',required:true},//办事处

          address: {type: 'string',required:true},//团购地址

          costAmount: {type: 'string',required:true},//费用预算金额
          goalMny: {type: 'string',required:true},//活动总目标金额
          actualMny: {type: 'string',required:true},//实际零售金额
          completionRate: {type: 'string',required:true},//目标完成率

          theme: {type: 'string',required:true},//活动主题

          terminalStartDate: {type: 'string'},//活动开始日期
          terminalEndDate: {type: 'string'},//活动截至日期

          description: {type: 'string',required:true},//活动描述
          auditStatus: {type: 'string',required:true,default:"0"}, //审核状态
          isEnable: {type: 'string',required:true}, //启用状态
          auditor: {type: 'string',required:true},//审核人
          auditTime: {type: 'datetime',required:true},//审核时间
        },
        pageSize: 20,
        //是否启用前端缓存
        // pageCache: true
    }
});
