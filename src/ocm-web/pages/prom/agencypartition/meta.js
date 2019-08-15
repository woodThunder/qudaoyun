define(["ocm_global"],function(){
  window.agencypartitionmeta = {
      params: {
          "cls": "com.yonyou.ocm.prom.service.dto.AgencyPartitionDto"
      },
      meta: {
        id:{type: 'string'},//id
        code:{type: 'string',required:true},//编码
        name: {type: 'string',required:true},//名称
        parentId:{
          'refmodel':JSON.stringify(refinfo['agencypartitionfilterbodys']),
          'refcfg':'{"ctx":"/uitemplate_web"}'
        },//上级分区ID
        parentCode: {type: 'string',required:true},//上几分区编码
        parentName: {type: 'string',required:true},//上级分区名称
        creator:{type: 'string'},//创建人
        creationTime:{type: 'datetime'},//创建时间
        modifier:{type: 'string'},//修改人
        modifiedTime:{type: 'datetime'},//修改时间
        isEnable: {type: 'string',required:true,default:1},//启用状态
        // isEnable: {type: 'string',required:true,default:1},//启用状态
      },
      pageSize: 20,
      //是否启用前端缓存
      // pageCache: true
  }
  window.agencypartitionchildmeta = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.AgencyPartitionDetailDto"
    },
    meta: {
      id:{type: 'string'},//id
      agencyID:{
        type: 'string'
      },//办事处ID
      // agencyID:{
      //   'refmodel':JSON.stringify(refinfo['organization_ocm']),
      //   'refcfg':'{"ctx":"/uitemplate_web","isReturnCode":"true"}'
      // },//办事处ID
      agencyCode: {
        type: 'string'
      },
      agencyName: {
        type: 'string'
      },
    },
    pageSize: 10,
  }

  //多选参照取数据使用
  window.agencypartitionchildfakemeta = {
    params: {
        "cls": "com.yonyou.ocm.prom.service.dto.AgencyPartitionDetailDto"
    },
    meta: {
      id:{type: 'string'},//id
      agencyID:{
        'refmodel':JSON.stringify(refinfo['organization_ocm']),
        'refcfg':'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
        'refparam': '{"EQ_isOffice":"1","EQ_isEnable":"1"}'
      },//办事处ID
      agencyCode: {
      },
      agencyName: {
      },
    },
    pageSize: 10,
  }
})
