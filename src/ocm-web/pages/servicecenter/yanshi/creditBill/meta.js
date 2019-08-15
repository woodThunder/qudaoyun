define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      meta: {
        id: { type: 'string' }, //id
        org:{ type: 'string' }, //所属组织
        code: { type: 'string'},
        type: { type: 'string'},
        woType: { type: 'string' }, 
        serviceWo:{ type: 'string' }, 
        serviceOrg:{ type: 'string' }, 
        serviceDept:{ type: 'string' }, 
        servicePerson:{ type: 'string' }, 
        applyStatus:{ type: 'string' }, 
        creditBillStatus:{ type: 'string' }, 
        confirmTime:{ type: 'datetime' }, 
        remark:{ type: 'string' }, 
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        items1:{
          type:'child'
        },
        items2:{
          type:'child'
        },
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
        modifiedTime: { type: 'datetime' },
     
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
    }
  
    //维修BOM备件信息
    window.item1Meta = {
      meta: {
        id: { type: "string" }, //
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
        modifiedTime: { type: 'datetime' },
        materialCode: { type: 'string' }, //编码
        materialName: { type: 'string' }, //名称
        materialCate: { type: 'string' }, //编码
        unit: { type: 'string' }, //名称
        number: { type: 'integer' }, //描述
        price:{ type: 'float' },
        guaranteeType:{ type: 'string' }, 
        amount:{ type: 'float' },
        remark:{ type: 'string' }, 
      }
    },

 //维修BOM备件信息
 window.item2Meta = {
  meta: {
    id: { type: "string" }, //
    dr: { type: 'integer' }, //dr
    ts: { type: 'datetime' }, //ts
    creator: { type: 'string' },
    creationTime: { type: 'datetime' },
    modifier: { type: 'string' },
    modifiedTime: { type: 'datetime' },
    feeCode: { type: 'string' }, //编码
    feeName: { type: 'string' }, //名称
    payer: { type: 'string' }, //编码
    amount: { type: 'float' }, //名称
    coefficient: { type: 'float' }, //描述
    adjustAmount:{ type: 'float' },
    billAmount:{ type: 'float' }, 
    adjustReason:{ type: 'string' },
    remark:{ type: 'string' }, 
  }
}

  })