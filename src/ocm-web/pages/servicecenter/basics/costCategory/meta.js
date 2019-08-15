define(["ocm_global"], function () {
    
  window.mainData = {
      meta: {
        
          //非空验证
          name: { type: 'string' ,required:true},
          code: { type: 'string',required:true},
          costType: { type: 'string',required:true},
          isEnable:{type:'string',required:true,default:"1"},
          //时间戳
          creationTime:{type: 'datetime' },
          modifiedTime:{type: 'datetime' },


          parentId: { 
            type: "string",
            "refmodel": JSON.stringify(refinfo['isEnableDoc']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"上级费用项目"}'
           },
          
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
  }

  //新增数据列表
  window.addMainDataList = {
      params: {
         // "cls": "com.yonyou.occ.sc.service.dto.CostCategoryDto"
      },
      meta: {
        //code: { type: 'string'},
        //name: { type: 'String'},
        //mnemonic: { type: 'String' },
        //parentId: { type: 'String' },
        //costType: { type: 'String'},
        //description: { type: 'String' },
      }
  }




});