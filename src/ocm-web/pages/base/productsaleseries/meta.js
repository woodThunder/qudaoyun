
//------
define(["ocm_global"],function(){
  window.ProductSaleSeriesmeta  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProductSaleSeriesDto"
    },
   meta: {
      id:{type: 'string'},//id
      code:{type: 'string',required:true},//编码
      name: {type: 'string',required:true},//名称
      description: {type: 'string'},//描述
      styleId:{type: 'string',required:true},//产品风格ID
      styleName:{type: 'string'},//产品风格名称
      styleCode:{type: 'string'},//产品风格编码
      statusCode:{type: 'string',default:1},// 状态
      styleTypeId:{type: 'string',required:true},
      styleTypeCode:{type: 'string'},
      
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
},

window.ProductSaleSeriesPhotoinfometa ={
    params: {
        "cls": "cn.com.quanyou.cs.base.service.dto.ProductSaleSeriesPhotoinfoDto"
    },
    meta: {
      id:{type: 'string'},
      productSaleSeriesId:{type: 'string'},//产品基础信息ID
      productPhotoId:{type: 'string'},//产品图片ID
      productPhotoCode:{type: 'string'},//产品图片编码
      productPhotoUrl: {type: 'string'},//产品图片URL
      // isMainPhoto: {type: 'integer'},//是否主图
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
},
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