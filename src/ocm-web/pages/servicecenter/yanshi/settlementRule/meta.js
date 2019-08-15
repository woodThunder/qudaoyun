define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        org: { type: 'string'},
        type: { type: 'string'},
        code: { type: 'string'},
        payPerson:{type: 'String'},
        settlement: { type: 'string' },
        isAuto: {type: 'string'}, 
        settlementDate : { type: 'datetime' }, 
        remark: { type: 'string'},
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        parts:{
          type:'child'
        },
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
     
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
    }
  
    //维修BOM备件信息
    window.partsMeta = {
      meta: {
        id: { type: "string" }, //
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
        modifiedTime: { type: 'datetime' },
        code: { type: 'string' }, //编码
        name: { type: 'string' }, //名称
       
      }
    }
  })