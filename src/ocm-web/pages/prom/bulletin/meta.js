define(["ocm_global"], function() {
  window.Bulletin = {
    meta: {
      id: {type: 'string'},
      noticeStyleId: {type: 'string'},
      noticeStyleCode: {type: 'string',required:true},
      noticeStyleName: {type: 'string'},
      title: {type: 'string',required:true},
      content: {type: 'string'},
      textContent: {type: 'string'},
      isEnable: {type: 'string'},
      creator:{type: 'string'},
      creationTime:{type: 'datetime'},
      modifier:{type: 'string'},
      modifiedTime:{type: 'datetime'}
    },
    pageSize: 10
  }
  window.Customer = {
    meta: {
      id: {type: 'string'},
      parentId: {type: 'string'}, //公告主键
      officeId: {type: 'string'},
      officeCode: {type: 'string'},
      officeName: {type: 'string'},
      officePhone: {type: 'string'},
      customerId: {type: 'string'},
      customerCode: {type: 'string'},
      customerName: {type: 'string'},
      persistStatus:{type: 'string'},
    },
    pageSize: 10,
  }
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
  //多选参照-办事处、客户
  window.MultiReferMeta = {
    meta: {
      agencyId: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['organization_ocm']),
        "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"refName":"办事处","defaultFieldCount": 3,"strFieldCode": ["refcode", "refname", "tel"],"strFieldName": ["编码", "名称", "电话"]}',
        "refparam":'{"EQ_isOffice":"1","EQ_isEnable":"1"}'
      },
      customerId: {
        type: 'string',
        "refmodel": JSON.stringify(refinfo['customer']),
        "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true,"defaultFieldCount": 3,"strFieldCode": ["refcode", "refname", "organizationName"],"strFieldName": ["编码", "名称", "所属办事处"]}',
        "refparam":'{"EQ_isEnable":"1"}'
      }
    }
  }
})
