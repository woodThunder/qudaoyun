define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            DesignProductmeta: {
                params: {
                    "cls": "com.yonyou.ocm.base.service.dto.DesignProductDto"
                },
                meta: {
                    id: { type: 'string' },//id
                    code: { type: 'string', required: true },//编码
                    name: { type: 'string', required: true },//名称
                    description: { type: 'string' },//描述
                    productCategoryId: { type: 'string', required: true },//产品品类ID
                    productCategoryName: { type: 'string', required: true },//产品品类名称              
                    productModelId: { type: 'string', required: true },// 产品型号ID
                    unitId: { type: 'string', required: true },// unit
                    unitName: { type: 'string', required: true },// unit
                    productRadSeriesId: { type: 'string', required: true },// 产品研发系列
                    productRadSeriesName: { type: 'string', required: true },// 产品研发系列
                    prodAttrStrucId: { type: 'string',  },// unit
                    prodAttrStrucName: { type: 'string',  },// unit
                    productSaleSeriesId: { type: 'string', required: true },//产品销售系列
                    productSaleSeriesName: { type: 'string', required: true },//产品销售系列
                    statusCode: { type: 'string', required: true },
                    isIncludePic: { type: 'integer' },// 是否图片
                },
                pageSize: 10,
                //是否启用前端缓存
                // pageCache: true，
            }

        },
        buttons: {
            button1: [{
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
        searchs: {
            search1: [{
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
                type: "radio",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    { value: '', name: '全部' },
                    { value: '1', name: '启用' },
                    { value: '0', name: '停用' }
                ]
            }

            ]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "code",
                label: "编码",
                // disableInEdit: true,
                // enable:false
            },
            {
                type: "text",
                key: "name",
                label: "名称"
            },
            {
                type: "refer",
                key: "productCategoryId",
                referId: "productCategoryId",
                label: "品类",
                refinfo: "productCategory"
            },
            {
                type: "text",
                key: "productModelId",
                label: "型号",
            },

            //  {
            //    type:"refer",
            //    key:"productRadSeriesId",
            //    label:"研发系列",
            //    refinfo:"productRadSeries"

            //  },
            //  {
            //    type:"refer",
            //    key:"productSaleSeriesId",
            //    label:"销售系列",
            //   refinfo:"productSaleSeries"
            //  },
            {
                type: "radio",
                key: "statusCode",
                label: "启用状态",
                defaultvalue: "1",
                dataSource: [

                    { value: '1', name: '启用' },
                    { value: '0', name: '停用' }
                ]
            },
            {
                type: "refer",
                key: "prodAttrStrucId",
                label: "属性结构",
                refinfo: "prodAttrStruc"
            },
            {
                type: "refer",
                key: "unitId",
                label: "计量单位",
                refinfo: "utils"
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
                columns: [{
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
                    field: "unitName",

                    title: "单位",
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
                    title: "上传图片",
                    renderType: "picUploadList",
                    fixed: true,
                    width: "110px"
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
