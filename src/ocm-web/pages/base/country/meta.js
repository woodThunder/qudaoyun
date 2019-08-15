define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            Countrymeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.CountryDto"
                },
                meta: {
                    id:{type: 'string'},//id
                    code:{type: 'string', required:true},//编码
                    countryCode:{type: 'string', required:true},//国家代码（三位码）
                    name: {type: 'string', required:true},//名称
                    enName: {type: 'string'},//英文名称
                    fullName: {type: 'string'},//全称
                    telCode: {type: 'string'}, //电话代码
                    remark: {type: 'string'},//备注
                   // timeZoneId: {type: 'string',required:true},//时区主键
                    timeZoneCode: {type: 'string', required:true},
                    timeZoneName: {type: 'string'},//时区名称
                 //   languageId: {type: 'string',required:true},//语种
                    languageCode: {type: 'string', required:true},//语种
                    languageName: {type: 'string'},//语种名称
                    currencyId: {type: 'string'},//币种
                    currencyCode: {type: 'string'},//币种
                    currencyName: {type: 'string'},//币种名称
                    isEnable:{type: 'integer', required:true},// 状态
                    isDefault:{type: 'integer', required:true},// 是否默认
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
                },
                {
                    key: "import",
                    label: "导入",
                    iconCls: "icon-import",
                    click: "importHandle"
                },
                {
                    key: "export",
                    label: "导出",
                    iconCls: "icon-export",
                    click: "exportHandle"
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
                    key:"fullName",
                    label:"全称",
                },
                {
                    type:"text",
                    key:"enName",
                    label:"英文名称",
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
                    type:"text",
                    key:"code",
                    label:"编码",
                    disableInEdit:true
                },
                {
                    type:"text",
                    key:"countryCode",
                    label:"国家代码"
                },
                {
                    type:"text",
                    key:"name",
                    label:"名称"
                },
                {
                    type:"text",
                    key:"enName",
                    label:"英文名称"
                },
                {
                    type:"text",
                    key:"fullName",
                    label:"全称"
                },
                {
                    type:"text",
                    key:"telCode",
                    label:"电话代码"
                },
                {
                    type:"combo",
                    key:"timeZoneCode",
                    label:"时区",
                    url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY081",
                    namefield:"name",
                    valuefield:"code"
                },
                {
                    type:"combo",
                    key:"languageCode",
                    label:"语种",
                    url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY082",
                    namefield:"name",
                    valuefield:"code"
                },
                {
                    type:"refer",
                    key:"currencyId",
                    label:"币种",
                    refinfo:"currency",
                },
                {
                    type: "label",
                    key: "isEnable",
                    defaultvalue:'0',
                    label: "启用状态",
                },
                {
                    type:"radio",
                    key:"isDefault",
                    label:"系统默认",
                    defaultvalue:'0',
                    dataSource:[
                        {value:'1',name:'是'},
                        {value:'0',name:'否'}
                    ]
                },
                {
                    type:"textarea",
                    key:"remark",
                    label:"备注",
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
                        title: "编码",
                    },
                    {
                        field: "countryCode",
                        dataType: "String",
                        title: "国家代码",
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    },
                    {
                        field: "enName",
                        dataType: "String",
                        title: "英文名称",
                    },
                    {
                        field: "fullName",
                        dataType: "String",
                        title: "全称",
                    },
                    {
                        field: "telCode",
                        dataType: "String",
                        title: "电话代码",
                    },
                    {
                        field: "timeZoneName",
                        dataType: "String",
                        title: "时区",
                        // renderType: "timezoneRender"
                    },
                    {
                        field: "languageName",
                        dataType: "String",
                        title: "语种",
                        // renderType: "langRender"
                    },
                    {
                        field: "currencyName",
                        dataType: "String",
                        title: "币种",
                        // renderType: "currencyRender"
                    },
                    {
                        field: "remark",
                        dataType: "String",
                        title: "备注",
                        visible: false
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "是否启用",
                        renderType: "enableRender"
                    },
                    {
                        field: "isDefault",
                        dataType: "String",
                        title: "系统默认",
                        renderType: "whetherRender"
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
                        dataType: "Datetime",
                        title: "创建时间",
                        visible: false
                    },
                    {
                        field: "modifiedTime",
                        dataType: "Datetime",
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
        }
    };
    return new basemodel(model);
});
