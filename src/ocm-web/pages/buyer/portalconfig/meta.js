var portalmeta = {
  params: {
    cls: "com.yonyou.ocm.buyer.service.dto.PortalconfigDto"
  },
  meta: {
    id: { type: "string" }, //id
    logoUrl: { type: "string", required: true }, //logo
    iosCodeUrl: { type: "string", required: true }, //iOS 二维码
    androidCodeUrl: { type: "string", required: true }, //Android 二维码
    description: { type: "string", required: false }, //帮助说明
    creator: { type: "string" },
    creationTime: { type: "datetime" },
    modifier: { type: "string" },
    modifiedTime: { type: "datetime" }
  },
  pageSize: 10
  //启用前端缓存
  // pageCache: true
};

var hotlineMeta = {
  params: {
    cls: "com.yonyou.ocm.buyer.service.dto.HotlineDto"
  },
  meta: {
    id: { type: "string" }, //id
    //portalId: { vtype: "string" },
    hotline: { type: "string", required: true, maxLength: 50 }, //服务热线
    creator: { type: "string" },
    creationTime: { type: "datetime" },
    modifier: { type: "string" },
    modifiedTime: { type: "datetime" }
  },
  pageSize: 10
  //启用前端缓存
  // pageCache: true
};
