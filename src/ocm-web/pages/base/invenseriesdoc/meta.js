define(['ocm_basemodel'], function(basemodel) {
    'use strict';
    var model = {
        metas:{
            CustDocGroupDefmeta : {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CustDocGroupDto"
                },
                meta: {
                  id:{type: 'string'},//id
                  code:{type: 'string',required:true},//编码
                  name: {type: 'string',required:true},//名称
                  isEnable:  {type: 'string'},//状态

                  seriesDocId: {
                    type: 'string',
                    "refmodel": JSON.stringify(refinfo['seriesDoc']),
                    "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                    refparam: '{"EQ_seriesType":"0","EQ_isEnable":"1"}'
                },//所属客户
                seriesDocCode: { type: 'string' },//所属客户
                seriesDocName: { type: 'string' },//所属客户

                  seriesType:  {type: 'string'},//类型
                  reamrk:  {type: 'string'},//备注
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true
            } 
        },
        buttons:{
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit",
                auth: true

            },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del",
                    auth: true
                },
                {
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enable",
                    auth: true
                },
                {
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disable",
                    auth: true
                }
            ]
        },
        searchs:{
            search1: [
                {
                    type: "text",
                    key: "code",
                    label: "编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称",
                },
                {
                    type: "combo",
                    key: "isEnable",
                    label: "启用状态",
                    dataSource: [
                        { value: '', name: '全部' },
                        { value: '0', name: '未启用' },
                        { value: '1', name: '已启用' },
                        { value: '2', name: '已停用' }
                    ]
                },
                {
                    type: "label",
                    key: "seriesDocName",
                    label: "所属销售序列",


                    type: "refer",
                key: "seriesDocId",
                label: "所属销售序列",
                refinfo: "seriesDoc",
                //refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
                isReturnCode: "true",
                clientParam: {
                    "EQ_seriesType":"0","EQ_isEnable":"1"
                }
                }
                


            ]
        },
        dialogs:{   
            dialog1:[
                {
                  type:"text",
                  key:"code",
                  label:"编码",
                  disableInEdit:true
                },
                {
                  type:"text",
                  key:"name",
                  label:"名称"
                },
                {
                    type: "label",
                    key: "isEnable",
                    defaultvalue: '0',
                    label: "启用状态",
                },    
                {
                    type: "refer",
                    key: "seriesDocId",
                    compid:"seriesDocId",
                    label: "所属销售序列"
                },
               {
                  type:"textarea",
                  key:"remark",
                  label:"备注",
                  cls:"ui-textarea-item"
              },{
                type: "text",
                key: "seriesType",
                defaultvalue: '1',
                label: "类型",
                cls:"hidden"
            }]
        },
        grids:{
            grid1:{
                domid: "grid_CustDocDef",
                umeta: {
                    "id": "CustDocGroupDefList",
                    "data": "simpleList",
                    "type": "grid",
                    "editable": false,
                    "multiSelect": true,
                    "showNumCol": true
                },
                columns:[
                    {
                        "field":"code",
                        "dataType":"String",
                        "title":"编码"
                    },
                    {
                        "field":"name",
                        "dataType":"String",
                        "title":"名称"
                    },
                    {
                        "field":"seriesDocName",
                        "dataType":"String",
                        "title":"所属销售序列"
                    },
                    {
                        "field":"remark",
                        "dataType":"String",
                        "title":"备注"
                    },
                    {
                        "field":"isEnable",
                        "dataType":"String",
                        "title":"状态",
                        "renderType":"enableRender"
                    },
                    {
                        "field":"creator",
                        "dataType":"String",
                        "title":"创建人",
                        "visible":false
                    },
                    {
                        "field":"modifier",
                        "dataType":"String",
                        "title":"修改人",
                        "visible":false
                    },
                    {
                        "field":"creationTime",
                        "dataType":"Date",
                        "title":"创建时间",
                        "visible":false
                    },
                    {
                        "field":"modifiedTime",
                        "dataType":"Date",
                        "title":"修改时间",
                        "visible":false
                    },
                    {
                        "field":"operation",
                        "dataType":"String",
                        "title":"操作",
                        "renderType":"operation4single",
                        "fixed":true,
                        "width":"110px"
                    }
                ]
            }
        }   
    };  
    return new basemodel(model);
});

// var CustDocDefmeta = {
//     params: {
//         "cls": "com.yonyou.ocm.base.service.dto.CustDocDefDto"
//     },
//     meta: {
//       id:{type: 'string'},//id
//       code:{type: 'string',required:true},//编码
//       name: {type: 'string',required:true},//名称
//       remark: {type: 'string'},//备注
//       isEnable:{type: 'integer',default:1},// 状态
//       custDocId:{type:'string'},
//       custDocName: {type: 'string'},
//       custDocCode: {type: 'string',required:true},
//     },
//     pageSize: 10,
//     //是否启用前端缓存
//     // pageCache: true
// }
