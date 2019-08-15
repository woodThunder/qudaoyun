define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        code: { type: 'string'},
        name: { type: 'string' }, 
        parent: { type: 'string'},
        isEnable: { type: 'string'},
        feeType: { type: 'string'},
        detail: { type: 'string'},
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
     
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
    }
  })