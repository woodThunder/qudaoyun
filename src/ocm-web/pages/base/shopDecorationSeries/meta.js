var shopDecorationSeriesmeta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ShopDecorationSeriesDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      status: {type: 'integer'},//状态
      shopId:{type:'string',required:true},//门店id
	  decorationAreaId:{type:'string'},//装修区域id
	  reportImgArea:{type:'float'},//报图面积
	  reportImgTime:{type:'datetime'},//报图时间
	  plotImgArea:{type:'float'},//出图面积
	  plotImgTime:{type:'datetime'},//出图时间
	  decorStartTime:{type:'datetime'},//进场装修时间
	  decorEndTime:{type:'datetime'},//出场装修时间
	  acceptanceArea:{type:'float'},//验收合格面积
	  acceptanceTime:{type:'datetime'}//验收合格时间
    },
    pageSize: 5,
    //启用前端缓存
    // pageCache: true
}
