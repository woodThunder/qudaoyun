define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            partsmeta: {
                params: {
                    "cls": "com.yonyou.occ.sc.service.dto.PartsDto"
                },
                meta: {
                    id:{type: 'string'},//主键
                    code:{type: 'string',required:true},//编码
                    name: {type: 'string',required:true},//名称
                    model: {type: 'string'},//模型
                    unit: {type: 'string'},//单位
                    description: {type: 'string'},//描述
                    
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
                    label:"编码"
                },
                {
                    type:"text",
                    key:"name",
                    label:"名称",
                },
                {
                    type:"text",
                    key:"model",
                    label:"型号",
                }
            ]
        },
        //弹窗组
        dialogs: {
            dialog1: [
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
                    type:"text",
                    key:"model",
                    label:"型号"
                },
                {
                    type:"text",
                    key:"unit",
                    label:"单位"
                },
                {
                    type: "textarea",
                    key: "description",
                    label: "描述",
                    cls: "ui-textarea-item"
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
                        title: "编码",
                        renderType:"detailRender"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    },
                    {
                        field: "model",
                        dataType: "String",
                        title: "型号",
                    },
                    {
                        field: "unit",
                        dataType: "String",
                        title: "单位",
                    },
                    {
                        field: "description",
                        dataType: "String",
                        title: "描述",
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
                    key: "code",
                    label: "编码",
                },
                {
                    key: "name",
                    label: "名称",
                },
                {
                    key: "model",
                    label: "型号",
                },
                {
                    key: "unit",
                    label: "单位",
                },
                {
                    key: "description",
                    label: "描述",
                }
            ]
        }
    };
    return new basemodel(model);
});

