define(["ocm_global"],function(){
    //活动定义
    window.ActivityC = {
        meta: {
            id:{type: 'string'},//id
            code:{type: 'string',required:true},//编码
            name: {type: 'string',required:true},//名称

            /*活动类型*/
            activeTypecId: {
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['activitytypec']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}' ,
                "refparam":'{"EQ_isEnable":"1"}'
            },
            activeTypecCode: {type: 'string',required:true},
            activeTypecName: {type: 'string',required:true},

            responsiblePersonId: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['person']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_isEnable":"1"}'
            }, //活动负责人
            responsiblePersonCode: {
                type: 'string',
            }, //人员code
            responsiblePersonName: {type: 'string'}, //人员name

            responsiblePersonTel: {type: 'string'}, //人员联系方式
            linkPhone: {type: 'string'}, //联系电话

           /* 办事处*/
            agencyId: {
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['organization_ocm']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
                "refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'
            },
            agencyCode: {type: 'string',required:true},
            agencyName: {type: 'string',required:true},

            address: {type: 'string'},  //团购地址
            costAmount: {type: 'float',precision:2, regExp: /^\d{1,13}(\.\d*)?$/,errorMsg:"金额整数位不能超过13",required:true}, //费用预算金额
            theme: {type: 'string',required:true},  //活动主题
            goalMny: {type: 'string',required:true},  //活动总目标金额

            terminalStartDate: {type: 'string',required:true}, //活动开始日期
            terminalEndDate: {type: 'string',required:true},//活动截至日期
            terminalDateRange: {type: 'string',required:true}, //活动期间

            description: {type: 'string'}, //活动描述
            auditStatus: {type: 'string',required:true,default:"0"}, //审核状态
            isEnable: {type: 'string',required:true,default:"1"}, //启用状态
            auditor: {type: 'string',required:true}, //审核人
            auditTime: {type: 'string',required:true}, //审核时间
          creator: {type: 'string',required:true}, //创建人
          creationTime: {type: 'string',required:true}, //创建时间
            dr:{type:'string'},
          note:{type:'string'}
        },
        pageSize: 20, 
        //是否启用前端缓存
        // pageCache: true
    }
    //活动门店
    window.ActivityStore = {
        meta: {
            id:{type:'string'},
            activityId:{type: 'string'},// 活动

            customerId:{type: 'string',required:true},//经销商id
            customerCode: {type: 'string',required:true},//经销商Code
            customerName: {type: 'string',required:true},//经销商name

            /*门店*/
            storeId: {type: 'string',required:true},
            storeCode: {type: 'string',required:true},
            storeName: {type: 'string',required:true},

            joinNumber: {type: 'string',required:true}, //参与户数

            saleGoalMny: {type: 'float',required:true}, //零售活动目标金额

            dr:{type:'string'},
        }
    }
    //门店参照
    window.ActivityStoreRef = {
        meta: {
            storeRefer:{
                type: 'string',
                "refmodel": JSON.stringify(refinfo['activitystorec']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}' ,
                "refparam":'{"EQ_isEnable":"1"}'
            },//id
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
})
