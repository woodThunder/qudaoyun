define(["ocm_global"], function() {
    //mainDataMeta
    window.mainDataMeta = {
        params: {
            "cls": "com.yonyou.ocm.b2c.service.dto.RegionControlDto"
        },
        meta: {
            platformName:{type: 'string',required:true},
            platformId: { //所属平台ID
                type: "string",
                required:true,
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg":'{"ctx":"/uitemplate_web","refName":"所属平台"}'
            },  
            provinceName:{type: 'string',required:true},//注册所在省份名称          
            provinceId:{//注册所在省份ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"1"}'
            },
            pProvince:{type: 'string',required:true,maxLength:30},
            cityName:{type: 'string',required:true},
            cityId:{//注册所在城市ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"2"}'
            },
            pCity:{type: 'string',required:true,maxLength:30},
            districtName:{type: 'string',required:true},
            districtId:{//注册所在县ID
                type: 'string',
                required:true,
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"3"}'
            },
            pDistrict:{type: 'string',required:true,maxLength:30},
            townName:{type: 'string'},//注册所在街道/镇名称
            townId:{//注册所在街道/镇Id
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"4"}'
            },
            pTown:{type: 'string',maxLength:30},
           
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
            platformName:{type: 'string',required:true},
            platformId: { //所属平台ID
                type: "string",
                required:true,
                "refmodel": JSON.stringify(refinfo['b2cplatform']),
                "refcfg":'{"ctx":"/uitemplate_web","refName":"所属平台"}'
            },  
            provinceName:{type: 'string'},//注册所在省份名称          
            provinceId:{//注册所在省份ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"1"}'
            },
            pProvince:{type: 'string',maxLength:30},
            cityName:{type: 'string'},
            cityId:{//注册所在城市ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"2","EQ_parent.id":""}'
            },
            pCity:{type: 'string',maxLength:30},
            districtName:{type: 'string'},
            districtId:{//注册所在县ID
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"3","EQ_parent.id":""}'
            },
            pDistrict:{type: 'string',maxLength:30},
            townName:{type: 'string'},//注册所在街道/镇名称
            townId:{//注册所在街道/镇Id
                type: 'string',
                "refmodel": JSON.stringify(refinfo['region']),
                "refcfg":'{"ctx":"/uitemplate_web","refCode":""}',
                "refparam":'{"EQ_areaLevel":"4","EQ_parent.id":""}'
            },
            pTown:{type: 'string',maxLength:30},
           
         
            // creator: { type: "string" },   //创建人
            // creation_time: { type: "string" },   //创建时间
            // modifier: { type: "string" },   //修改人
            // modified_time: { type: "string" },   //修改时间
        },
        pageSize: 5
    }
 
   
})