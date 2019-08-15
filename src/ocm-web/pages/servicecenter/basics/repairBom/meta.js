define(["ocm_global"], function () {
    //维修bom列表
    window.mainMeta = {
      params: {
        "cls": "com.yonyou.occ.sc.service.dto.RepairBomDto"
      },
      meta: {
        id: { type: 'string' }, //id
        parentId:{type: 'string'},
        code: { type: 'string',required:true },
        name: { type: 'string',required:true },
        goodsId: {
          type: "string",
          required: true,
          "refmodel": JSON.stringify(refinfo['goods']),
          "refcfg": '{"ctx":"/uitemplate_web","refName":"请选择"}'
        }, //商品ID
        partsList:{
                type: 'child',
                meta:{

                }
        },
        goodsName: { type: 'string' }, //商品名称
        goodsCode: { type: 'string'},
        version: { type: 'string'},//版本
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
        modifiedTime: { type: 'datetime' },
     
      },
      pageSize: 10,
      //是否启用前端缓存
      // pageCache: true
    }

     // 备件参照
    window.partsRef = {
        meta: {
        partsRefer: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['parts']),
            'refcfg': '{"ctx":"/uitemplate_web","isReturnCode":true,"isMultiSelectedEnabled":true}',
        }
        }
    }
  
    //维修BOM备件信息
    window.partsMeta = {
      params: {
        "cls": "com.yonyou.occ.sc.service.dto.RepairBomPartsDto"
      },
      meta: {
        id: { type: "string" }, //
        dr: { type: 'integer' }, //dr
        ts: { type: 'datetime' }, //ts
        creator: { type: 'string' },
        creationTime: { type: 'datetime' },
        modifier: { type: 'string' },
        modifiedTime: { type: 'datetime' },
        partsId: { type: 'string' }, //备件id    
        partsCode: { type: 'string' }, //编码
        partsName: { type: 'string' }, //名称
        model: { type: 'string' }, //型号
        unit: { type: 'string' }, //单位
        description: { type: 'string' } //描述
      }
    }



  });

