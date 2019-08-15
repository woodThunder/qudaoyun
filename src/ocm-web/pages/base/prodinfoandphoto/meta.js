var ColorDocmeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProdInfoAndPhotoInfoDto"
    },
    meta: {
      id:{type: 'string'},//id
      statusCode:{type: 'string',default:1},//状态编码
      productInfoId: {type: 'string'},//产品基础信息ID
      productInfoCode: {type: 'string'},//产品编码
      prodPhotoInfoId: {type: 'string'},//产品图片ID
      prodPhotoInfoCode: {type: 'string'},//产品图片编码
      prodPhotoInfoUrl: {type: 'string'},//产品图片URL
      isMainPhoto: {type: 'integer'},//是否主图
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
