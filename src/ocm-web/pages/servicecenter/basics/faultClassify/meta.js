define(["ocm_global"], function () {
    
  window.mainData = {
      meta: {
        //   parentId: {
        //       type: 'string',
        //       required: true,
        //       "refmodel": JSON.stringify(refinfo['settlementDetailsRef']),
        //       "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
        //   },
          parentId: { 
            type: "string",
            // required: true,
            "refmodel": JSON.stringify(refinfo['faultClassify-parentId-ref']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"上级分类"}'
           },
          // parentCode: { type: 'string',required:true},
          parentName: { type: 'string'},
          name: { type: 'string' ,required:true},
          code: { type: 'string',required:true},
          sort: {type: 'integer',required:true},

          creationTime:{type: 'datetime' },
          modifiedTime:{type: 'datetime' }  
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
  }

  //新增数据列表
  window.addMainDataList = {
      params: {
        //   "cls": "com.yonyou.ocm.b2c.service.dto.SettleRptDetailDto"
      },
      meta: {
        parentId: { type: 'string'},
        name: { type: 'string',required:true  },
        code: { type: 'string',required:true  }
      }
  }




});