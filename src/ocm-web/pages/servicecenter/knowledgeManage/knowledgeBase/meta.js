define(["ocm_global"], function () {
    window.mainListMeta = {
        meta: {
            id: { type: 'string' },
            code: { type: 'string'},//编号   
            knowledgeType:{ type: 'integer'},//知识类型
            titleName:{type: 'string'},//标题
            creator:{type: 'string'},//创建人
            creationTime: { type: 'datetime' },//创建时间
            //阅读量
            readQ:{ type: "string"},
            //赞数
            praiseQ:{ type: "string"},
            knowledgeContent:{type: "string"} 
        },
        pageSize: 10,
        //是否启用前端缓存
      
    }

})
