define(["ocm_common"], function (common) {
    'use strict'; 
    //searchSet方法:改变搜索栏中枚举的dataSource值。
    //request枚举请求方法:返回枚举对象enumData数据。
    var enumObj = {
        searchSet:function(field,searchsModel,enumData){
            //参数：1搜索栏字段，2搜索数据模型，3赋值枚举数据
            //field参数1：'name';
            //searchsModel参数2：
            /*
                [
                    {key:'name',dataSource:enumArray},
                    {key:'name',dataSource:enumArray},
                    {key:'name',dataSource:enumArray}
                ]
            */
            //enumData参数：
            /*
                [
                    {name:'name0',value:'0'},
                    {name:'name1',value:'1'},
                    {name:'name2',value:'2'}
                ]
            */
            var searchs = searchsModel;
            var thisField = field;
            for (var i = 0; i < searchs.length; i++) {
                if(searchs[i].key == thisField){
                    searchsModel[i].dataSource = enumData;
                }
            }
        },
        request:function(paramsData,number){ 
            // request枚举请求方法
            // obj参数1：
            // 枚举请求接口enumReqPort:'',
            // 枚举请求参数enumReqData:[{enumClassName:'',enumArrayName:''}]枚举请求名称,枚举赋值数组名称
            // 数字参数2：1/null(值为1时执行请求数据拼接为enumName_as_arrName，其他值不执行)
            // paramsData参数1:
            // var enumObjData = {
            //     // enumData:{返回数据对象}
            //     // enumReqPort:'枚举请求接口',
            //     // enumReqData:[{enumClassName:'枚举请求名称',enumArrayName:'枚举赋值数组名称'}]
            //     enumData:{},
            //     enumReqPort:'/base/enums-service',
            //     enumReqData:[
            //             {
            //                 enumClassName:'QY029',
            //                 enumArrayName:'enumArray1'
            //             },
            //             {
            //                 enumClassName:'QY003',
            //                 enumArrayName:'enumArray2'
            //             },
            //             {
            //                 enumClassName:'QY070',
            //                 enumArrayName:'enumArray3'
            //             }
            //     ]
            // }
            var reqPort = paramsData.enumReqPort;
            var reqData = paramsData.enumReqData;
            if (reqPort && reqData) {
                var myReqData;
                var thisReqData = [];
                if (number == '1') {
                    for (var i = 0; i < reqData.length; i++) {
                        var as_Data = reqData[i].enumClassName + '_as_' + reqData[i].enumArrayName;
                        thisReqData.push(as_Data);
                    }
                    myReqData = {enumClassName: thisReqData.join(",")}
                } else {
                    myReqData = {enumClassName: reqData}
                }
                //发送请求枚举
                $._ajax({
                    type: "get",
                    url: appCtx + reqPort,
                    async: false,
                    data: myReqData,
                    success: function (data) {
                        paramsData.enumData = data;
                    }
                });
            }
            
            return paramsData.enumData;
        },
        enumRequest:function(paramsData){
            //返回枚举数据，并添加一个返回数据对象，如：paramsData.BillStatusEnum是以enumClassName.name作为对象名称
            // 参数数据结构
            // var paramsData = {
            //     //请求接口
            //     port:'/sc/enum-service/data',
            //     //枚举请求参数class + name拼接参数
            //     enumClassName:{class:'com.yonyou.occ.sc.enums.',name:'BillStatusEnum'},
            //     // 枚举返回的字段，需要转换为name,value
            //     enumField:["name","code"]
            // }
            // 后台返回数据结构
            // var data = [{name:'一年级',code:'0'},{name:'二年级',code:'1'},{name:'三年级',code:'2'}]

            $._ajax({
                type: "get",
                url: appCtx + paramsData.port,
                async: false,
                data: {
                    enumClassName: paramsData.enumClassName.class + paramsData.enumClassName.name
                },
                success: function (data) {
                    var enumArrayName = paramsData.enumClassName.name;
                    var enumData = common.dataconvert.toMap(data, paramsData.enumField[0], paramsData.enumField[1]);
                    paramsData[enumArrayName] = enumData;
                    return enumData;
                }
            });
        }
    };
    return  enumObj;
});