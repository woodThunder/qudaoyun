var ActivityTypeCmeta = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.ActivityTypeCDto"
    },
    meta: {
        id:{type: 'string'},//id
        code:{type: 'string',required:true},//活动类型编码
        name: {type: 'string',required:true},//活动类型名称
        isEnable: {type: 'integer',required:true,enable:false},//启用状态
        creator:{type: 'string'},//创建人
        creationTime:{type: 'datetime'},//创建时间
        modifier:{type: 'string'},//修改人
        modifiedTime:{type: 'datetime'},//修改时间
        taskRequire:{type: 'string'},//提货任务
        preferentialWay:{type: 'string'},//优惠方式
        channelTypeId:{type: 'string'},//渠道类型ID
        channelTypeCode:{type: 'string',required:true},//渠道类型Code
        channelTypeName:{type: 'string'},//渠道类型Name
    },
    pageSize: 20,
    //是否启用前端缓存
    // pageCache: true
}
