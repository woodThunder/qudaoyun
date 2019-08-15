define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            projectsMeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.ProjectDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    // symbol: { type: 'string' },//币符
                    // pricePrecision: { type: 'integer', required: true,  regExp:/^[0-6]$/, errorMsg:'请输入0-6的数字' },// 价格精度
                    // amountPrecision: { type: 'integer', required: true,  regExp:/^[0-6]$/, errorMsg:'请输入0-6的数字' },// 金额精度
                   // isDefault: {type: 'string', required: true},//是否启用
                    isEnable: {type: 'string',  required: true}//是否启用
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
                // ,
                // {
                //     key: "import",
                //     label: "导入",
                //     iconCls: "icon-import",
                //     click: "importHandle"
                // },
                // {
                //     key: "export",
                //     label: "导出",
                //     iconCls: "icon-export",
                //     click: "exportHandle"
                // }
            ]
        },
        //查询条件组
        searchs: {
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
                }
            ]
        },
        //弹窗组
        dialogs: {
            dialog1: [
                {
                    type: "text",
                    key: "code",
                    label: "编码",
                    disableInEdit: true
                },
                {
                    type: "text",
                    key: "name",
                    label: "名称"
                },
                  {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue:"0"
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
                        field: "name",
                        dataType: "String",
                        title: "名称",
                    },
                    {
                        field: "isEnable",
                        dataType: "String",
                        title: "状态",
                        renderType: "enableRender"
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
