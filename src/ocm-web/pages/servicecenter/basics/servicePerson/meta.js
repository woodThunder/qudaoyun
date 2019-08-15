define(["ocm_global"], function () {

  window.personMeta = {
    meta: {
      id: { type: "string" },
      /**
       * 编码
       */
      code: { type: "string" },
      /**
       * 姓名
       */
      name: { type: "string" },
      /**
       * 性别
       */
      sex: { type: "string" },
      /**
       * 证件类型
       */
      credentialsType: { type: "string" },
      /**
       * 证件号码
       */
      credentialsNum: { type: "string" },
      /**
       * 手机
       */
      mobile: { type: "string" },
      /**
       * 电话信息1
       */
      officePhone: { type: "string" },
      /**
       * 电话信息2
       */
      // homePhone: { type: "string" },
      /**
       * 电子邮件
       */
      email: { type: "string" },
      /**
     * 人员类别
     */
      personType: { type: "string" },

      /**
       * 到职日期
       */
      joinDate: { type: "datetime" },

      /**
       * 技术等级
       */
      personGrade: { type: "string" },
      /**
       * 网点
       */
      networkId: {
        type: "string",
        required: true,
        "refmodel": JSON.stringify(refinfo['sc-spn-ref']),
        "refcfg": '{"ctx":"/uitemplate_web","refName":"网点"}'
      },
      networkName: { type: "string" },
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