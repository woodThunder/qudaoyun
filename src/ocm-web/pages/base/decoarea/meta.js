var decoareameta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.proDesignDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string',required:true},//描述
      report_img_area: {type: 'float',required:true},//报图面积,
      report_img_time: {type: 'date',required: true},//报图时间
      plot_img_area: {type: 'string',required: true},//出图面积
      plot_img_time: {type: 'date',required: true},//出图时间
      decor_start_time: {type: 'date',required: true},//进场装修时间
      decor_end_time: {type: 'date',required: true},//出场装修时间
      acceptance_area: {type: 'string',required: true},//验收合格面积
      acceptance_time: {type: 'date',required: true},//验收合格时间
      opening_time: {type: 'date',required: true}//开业时间
    },
    pageSize: 5,
    //是否启用前端缓存
    // pageCache: true
}
