var prodPhotoInfometa  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProdPhotoInfoDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string'},//编码
      name:{type: 'string'},//名称
      pictureCategoryId: {type: 'string'},//图片分类ID
      pictureCategoryName: {type: 'string'},//图片分类名称
      picturePath: {type: 'string'},//图片途径
      imgCode: {type: 'string'},//解析编码
      pictureFormat: {type: 'string'},//图片格式
      isMappingProduct: {type: 'string'},//是否匹配产品
      isMappingCategory: {type: 'string'},//是否匹配产品类型
      statusCode:{type: 'string'},// 状态
      statusId:{type: 'string'},// 状态
      statusName:{type: 'string'},// 状态
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
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
 //
window.ProdPhotoInfoParsemeta = {
  params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProdPhotoInfoParseDto"
  },
  meta: {
      id:{type: 'string'},//id
      code:{type: 'string'},//编码
      pictureCategoryId: {type: 'string'},//图片分类ID
      pictureCategoryName: {type: 'string'},//图片分类名称
      picturePath: {type: 'string'},//图片途径
      imgCode: {type: 'string'},//解析编码
      pictureFormat: {type: 'string'},//图片格式
      isMappingProduct: {type: 'string'},//是否匹配产品
      isMappingCategory: {type: 'string'},//是否匹配产品类型
      statusCode:{type: 'string'},// 状态
      statusId:{type: 'string'},// 状态
      statusName:{type: 'string'},// 状态
      productInfoId:{type: 'string'},// 产品基础信息ID
      
    }
}
//图片关系
var ProdInfoAndPhotoInfometa  = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ProdInfoAndPhotoInfoDto"
    },
    meta: {
      id:{type: 'string'},//id
      statusCode:{type: 'string',default:1},//状态编码
      productInfoId: {type: 'string'},//产品基础信息ID
      prodPhotoInfoId: {type: 'string'},//产品图片ID
      isMainPhoto: {type: 'integer'},//是否主图
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}