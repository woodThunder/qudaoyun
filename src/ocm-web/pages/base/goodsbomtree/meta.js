define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            departmentmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.DepartmentDto"
                },
                meta: {
                    id:{type: 'string'},//id
                    code:{type: 'string',required:true},//编码
                    name: {type: 'string',required:true},//名称
                    remark: {type: 'string'},//备注
                    isEnable:{type: 'integer',required:true},// 状态
                    parentId:{type: 'string'},//上级部门
                    parentName: {type: 'string'},
                    parentCode:{type: 'string'},
                    principalId:{type: 'string'},//负责人
                    principalCode:{type: 'string'},
                    principalName:{type: 'string'},
                    organizationId:{type: 'string',required:true},//所属组织
                    organizationCode:{type: 'string',required:true},//所属组织
                    organizationName:{type: 'string',required:true},//所属组织
                    tel:{type: 'string'},
                    address:{type: 'string'},
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
                },
                {
                    key: "del",
                    label: "删除",
                    iconCls: "icon-shanchu1",
                    click: "del"
                },
                {
                    key: "enable",
                    label: "启用",
                    iconCls: "icon-qiyong",
                    click: "enable"
                },
                {
                    key: "disable",
                    label: "停用",
                    iconCls: "icon-tingyong",
                    click: "disable"
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
                    type:"refer",
                    key:"principal--id",
                    label:"负责人",
                    refinfo:"person",
                },
                {
                    type:"refer",
                    key:"parent--id",
                    label:"上级部门",
                    refinfo:"department",
                    refName:"上级部门"
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
                }
            ]
        },
        //弹窗组
        dialogs: {
            dialog1: [
                {
                    type:"refer",
                    key:"organizationId",
                    label:"所属组织编码",
                    refinfo:"organization_ocm",
                    clientParam:{
                        "EQ_isEnable": "1", "EQ_dr": "0",
                    }
                },
                {
                    type:"refer",
                    key:"parentId",
                    label:"上级部门",
                    refinfo:"department",
                    domid:"parentId",
                    refName:"上级部门",
                },
        
              
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
                    type:"refer",
                    key:"principalId",
                    label:"负责人",
                    refinfo:"person",
                    clientParam:{
                        "EQ_isEnable":"1","EQ_dr":"0"
                    }
                },
                {
                    type:"text",
                    key:"tel",
                    label:"电话"
                },
                {
                    type:"text",
                    key:"address",
                    label:"地址"
                },
                
                {
                    type:"label",
                    key:"isEnable",
                    label:"是否启用",
                    defaultvalue:"0"
                },
                {
                    type:"textarea",
                    key:"remark",
                    label:"备注",
                    cls:"ui-textarea-item"
                }
            ]
        },
         //弹窗组
         cards: {
            card1: [
                {
                    type: "refer",
                    key: "goodsId",
                    label: "商品",
                    refinfo: "goods",
                    refName: "商品",
                },
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
                        dataType: "string",
                        title: "编码",
                        renderType:"detailRender"
                    },
                    {
                        field: "name",
                        dataType: "string",
                        title: "名称",
                    },
                    {
                        field: "tel",
                        dataType: "string",
                        title: "电话",
                    },
                    {
                        field: "address",
                        dataType: "string",
                        title: "地址",
                    },
                    {
                        field: "parentName",
                        dataType: "string",
                        title: "上级部门名称",
                    },
                    {
                        field: "organizationName",
                        dataType: "string",
                        title: "所属组织",
                    },
                    {
                        field: "principalName",
                        dataType: "string",
                        title: "负责人",
                    },
                    {
                        field: "remark",
                        dataType: "string",
                        title: "备注",
                        visible: false
                    },
                    {
                        field: "isEnable",
                        dataType: "string",
                        title: "状态",
                        renderType: "enableRender"
                    },
                    {
                        field: "creator",
                        dataType: "string",
                        title: "创建人",
                        visible: false
                    },
                    {
                        field: "modifier",
                        dataType: "string",
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
                        dataType: "string",
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
                    key: "principalName",
                    label: "负责人",
                },
                {
                    key: "tel",
                    label: "电话",

                },
                {
                    key: "address",
                    label: "地址",
                },
                {
                    key: "parentName",
                    label: "上级部门",
                },
                {
                    key: "organizationName",
                    label: "所属组织",
                },
                {
                    key: "isEnable",
                    label: "启用状态",
                    computed:"enableFmt"
                },
                {
                    key: "remark",
                    label: "备注",
                    cls:"ui-textarea-item"
                },
               
            ]
        }
    };
    return new basemodel(model);
});

