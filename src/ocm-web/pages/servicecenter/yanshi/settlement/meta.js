define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        org: { type: 'string'},
        type: { type: 'string'},
        code: { type: 'string'},
        settlementRule:{type: 'String'},
        startDate: { type: 'datetime' }, 
        endDate: { type: 'datetime' }, 
        jiezhi: { type: 'integer'},
        tiaozheng: { type: 'integer'},
        jiesuan: { type: 'integer'},
        adjustmentReason: { type: 'string'},
        frozenReason: { type: 'string'},
        remark: { type: 'string'},
        status: { type: 'string'},
        payType: { type: 'string'},
        payDate: { type: 'datetime'},
        payVoucher: { type: 'string'},
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
        project: { type: 'string' }, //编码
        fee: { type: 'string' }, //名称
        payPerson: { type: 'string' }, //编码
       
      }
    }
  })