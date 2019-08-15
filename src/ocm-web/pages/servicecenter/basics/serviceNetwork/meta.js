define(["ocm_global"], function () {

  window.networkMeta = {
    meta: {
      id: { type: "string" },
      /**
       * 网点编码
       */
      code: { type: "string" },
      /**
       * 网点名称
       */
      name: { type: "string" },
      /**
       * 省
       */
      provinceId: {
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"1"}'
      },
      provinceCode: { type: "string" },
      provinceName: { type: "string" },
      /**
       * 市
       */
      cityId: {
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"2"}'
      },
      cityCode: { type: "string" },
      cityName: { type: 'string' },
      /**
       * 县区
       */
      districtId: {
        type: 'string',
        required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"3"}'
      },
      districtCode: { type: 'string' }, //
      districtName: { type: "string" },
      /**
       * 镇
       */
      townId: {
        type: 'string',
        // required: true,
        "refmodel": JSON.stringify(refinfo['region']),
        "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
        "refparam": '{"EQ_areaLevel":"4"}'
      },
      townCode: { type: "string" },
      townName: { type: "string" },
      /**
       * 详细地址
       */
      address: { type: "string" },
      /**
       * 邮政编码
       */
      zipcode: { type: "string" },
      /**
       * 电话信息1
       */
      tel1: { type: "string" },
      /**
       * 电话信息2
       */
      tel2: { type: "string" },
      /**
       * 备注
       */
      remark: { type: "string" },
      /**
       * 服务商
       */
      serviceProviderId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['sc-sp-ref']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"服务商"}'
      },
      serviceProviderName: { type: "string" },
      isEnable: { type: "string" },
      serviceType: {type: "string"},
      ts: { type: "string" },   //时间戳
      dr: { type: "string" },   //删除标识
      creator: { type: "string" },   //创建人
      creationTime: { type: "datetime" },   //创建时间
      modifier: { type: "string" },   //修改人
      modifiedTime: { type: "datetime" },   //修改时间

    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
  }






});