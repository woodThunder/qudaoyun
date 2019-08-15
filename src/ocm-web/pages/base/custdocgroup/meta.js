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
                  remark: {type: 'string'},//备注
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
                }
            ]
        },
        searchs:{
            search1: [
                {
                    type: "text",
                    key: "code",
                    label: "分组档案编码"
                },
                {
                    type: "text",
                    key: "name",
                    label: "分组档案名称",
                }
            ]
        },
        dialogs:{   
            dialog1:[
                {
                  type:"text",
                  key:"code",
                  label:"分组档案编码",
                  disableInEdit:true
                },
                {
                  type:"text",
                  key:"name",
                  label:"分组档案名称"
                },
               {
                  type:"textarea",
                  key:"remark",
                  label:"档案维护备注",
                  cls:"ui-textarea-item"
              }
        
              ]

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
                        "title":"分组档案编码"
                    },
                    {
                        "field":"name",
                        "dataType":"String",
                        "title":"分组档案名称"
                    },
                    {
                        "field":"remark",
                        "dataType":"String",
                        "title":"分组档案备注",
                        "visible":false
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
