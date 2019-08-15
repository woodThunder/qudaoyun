define(["ocm_global"], function() {
    //mainDataMeta
    window.mainDataMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.GoodsCompareDto"
        },
        meta: {
            platformName:{type: 'string'},
            platformId: { //所属平台ID
                type: "string",
//              required:true,
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg":'{"ctx":"/uitemplate_web","refName":"平台"}'
            },  
            storeName:{type: 'string'},
            storeId: { //所属店铺ID
                type: "string",
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                "refcfg":'{"ctx":"/uitemplate_web","refName":"店铺"}'
            }, 
            goodsName:{type: 'string'},//商品  
            goodsCode:{type: 'string'},//商品  
            goodsId:{//商品ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
//              "refparam":'{"EQ_areaLevel":"1"}'
            },
            combineGoodsName:{type: 'string'},//商品组合  
            combineGoodsCode:{type: 'string'},//商品组合  
            combineGoodsId:{//商品组合  ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['Combination']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
//              "refparam":'{"EQ_areaLevel":"1"}'
            },
            outSkuCode:{type: 'string',required:true},//平台商品编码
           
            creator: { type: "string" },   //创建人
            creation_time: { type: "string" },   //创建时间
            modifier: { type: "string" },   //修改人
            modified_time: { type: "string" },   //修改时间                   
        },
        pageSize: 10
    }
    
    //新增
    window.thisListMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.RegionControlDto"
        },
        meta: {
           platformName:{type: 'string'},
            platformId: { //所属平台ID
                type: "string",
//              required:true,
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg":'{"ctx":"/uitemplate_web","refName":"平台"}'
            },  
            storeName:{type: 'string'},
            storeId: { //所属店铺ID
                type: "string",
                "refmodel": JSON.stringify(refinfo['b2cStoreRef']),
                "refcfg":'{"ctx":"/uitemplate_web","refName":"店铺"}'
            }, 
            goodsName:{type: 'string',required:true},//商品  
            goodsCode:{type: 'string',required:true},//商品  
            goodsId:{//商品ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['goods-no-version']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
//              "refparam":'{"EQ_areaLevel":"1"}'
            },
            combineGoodsName:{type: 'string'},//商品组合  
            combineGoodsCode:{type: 'string'},//商品组合  
            combineGoodsId:{//商品组合  ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['Combination']),
                "refcfg":'{"ctx":"/uitemplate_web"}',
//              "refparam":'{"EQ_areaLevel":"1"}'
            },
            outSkuCode:{type: 'string',required:true},//平台商品编码
           
         
            // creator: { type: "string" },   //创建人
            // creation_time: { type: "string" },   //创建时间
            // modifier: { type: "string" },   //修改人
            // modified_time: { type: "string" },   //修改时间
        },
        pageSize: 5
    }
 
   
})