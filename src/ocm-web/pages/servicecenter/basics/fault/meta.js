define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            faultmeta: {
                params: {
                    "cls": "com.yonyou.occ.sc.service.dto.FaultDto"
                },
                meta: {
                    id:{type: 'string'},//id
                    code:{type: 'string',required:true},//编码
                    name: {type: 'string',required:true},//名称
                    goodsId:{type: 'string',required:true},
                    goodsName:{type: 'string'},
                    goodsCode:{type: 'string'},
                    faultMainId:{type: 'string',required:true},
                    faultMainCode:{type: 'string'},
                    faultMainName:{type: 'string'},
                    faultSubId:{type: 'string',required:true},
                    faultSubCode:{type: 'string'},
                    faultSubName:{type: 'string'},
                    faultReason: {type: 'string'},
                    repair: {type: 'string'},
                    
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            }
        },
        //操作按钮组
        buttons: {
            button1: [
                {
                    key: "add",
                    label: "新增",
                    iconCls: "icon-plus",
                    click: "beforeEdit"
                }
            ]
        },
        //查询条件组
        searchs: {
            search1: [
                {
                    type:"text",
                    key:"code",
                    label:"故障编码"
                },
                {
                    type:"text",
                    key:"name",
                    label:"故障名称",
                }
            ]
        },
        //弹窗组
        dialogs: {
            dialog1: [
                {
                    type:"text",
                    key:"code",
                    label:"故障编码",
                    disableInEdit:true
                },
                {
                    type:"text",
                    key:"name",
                    label:"故障名称"
                },
                {
                    type:"refer",
                    key:"goodsId",
                    label:"商品",
                    refinfo:"goods"
                },
                {
                    type:"refer",
                    key:"faultMainId",
                    label:"故障大类",
                    refinfo:"faultClassify-parentId-ref",
                    clientParam: {"EQ_isEnable":""}
                },
                { 
                    type:"refer",
                    key:"faultSubId",
                    label:"故障小类",
                    refinfo:"faultClassify-parentId-ref",
                    clientParam: {"EQ_isEnable":""}
                },
                {
                    type:"text",
                    key:"faultReason",
                    label:"故障原因"
                },
                {
                    type:"text",
                    key:"repair",
                    label:"维修措施",
                    cls:"ui-textarea-item"
                }
              
            ]
        },
        grids: {
            grid1: {
                domid: "simple1",
                umeta: {
                    id: "grid_simple1",
                    data: "simpleList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [
                    {
                        field: "code",
                        dataType: "String",
                        title: "故障编码",
                        renderType:"detailRender"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "故障名称",
                    },
                    {
                        field: "goodsName",
                        dataType: "String",
                        title: "商品名称",
                    },
                    {
                        field: "faultMainName",
                        dataType: "String",
                        title: "故障大类",
                    },
                    {
                        field: "faultSubName",
                        dataType: "String",
                        title: "故障小类",
                    },
                    {
                        field: "faultReason",
                        dataType: "String",
                        title: "故障原因",
                    },
                    {
                        field: "repair",
                        dataType: "String",
                        title: "维修措施",
                    },
                    {
                        field: "creator",
                        dataType: "String",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "String",
                        title: "修改人",
                        visible: false
                    },
                    {
                        field: "creationTime",
                        dataType: "Date",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Date",
                        title: "修改时间",
                        visible: false
                    },
                    {
                        field: "operation",
                        dataType: "String",
                        title: "操作",
                        renderType: "operation4single",
                        fixed: true,
                        width: "110px"
                    }
                ]
            }
        },

        details: {
            detail: [
                {
                    key:"code",
                    label:"故障编码"
                },
                {
                    key:"name",
                    label:"故障名称"
                },
                {
                    key:"goodsName",
                    label:"商品"
                },
                {
                    key:"faultMainName",
                    label:"故障大类",
                },
                { 
                    key:"faultSubName",
                    label:"故障小类",
                },
                {
                    key:"faultReason",
                    label:"故障原因"
                },
                {
                    key:"repair",
                    label:"维修措施"
                }
            ]
        }
    };
    return new basemodel(model);
});

