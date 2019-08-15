define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        code: { type: 'string'},
        apply: { type: 'string'},
        applyDate: { type: 'datetime' }, 
        phone: { type: 'string'},
        billSource: { type: 'string'},
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
        goodsCode: { type: 'string' }, //编码
        goodsName: { type: 'string' }, //名称
        partsCode: { type: 'string' }, //编码
        partsName: { type: 'string' }, //名称
        unit: { type: 'string' }, //单位
        number: { type: 'integer' } //描述
      }
    }
  })