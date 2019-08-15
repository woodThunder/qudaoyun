define(["ocm_basemodel"], function (basemodel) {
    "use strict";
    var model = {
        metas: {
            GoodsRelPicturemeta: {
                meta: {
                    id: {type: "string"},//id
                    goodsId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["goods"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\",\"refName\":\"商品\",\"isMultiSelectedEnabled\": \"true\"}"
                    },//商品
                    pictureCategoryName: {type: "string"},//图片分类名称
                    pictureId: {
                        type: "string",
                        required: true,
                        "refmodel": JSON.stringify(refinfo["picture"]),
                        "refcfg": "{\"ctx\":\"/uitemplate_web\",\"refCode\":\"\",\"refName\":\"图片\",\"isMultiSelectedEnabled\": \"true\"}"
                    },//图片
                    isMainPicture: {type: "integer", required: true},//主图
                    isEnable: {type: "integer", required: true}// 状态
                },
                pageSize: 10
            }
        },
        buttons: {
            button1: [{
                key: "add",
                label: "新增",
                iconCls: "icon-plus",
                click: "beforeEdit"
            }, {
                key: "del",
                label: "删除",
                iconCls: "icon-shanchu1",
                click: "del"
            }, {
                key: "enable",
                label: "启用",
                iconCls: "icon-qiyong",
                click: "enable"
            }, {
                key: "disable",
                label: "停用",
                iconCls: "icon-tingyong",
                click: "disable"
            }]
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "goods--id",
                label: "商品",
                refinfo: "goods",
                refName: "商品",
                refcfg: {
                    "ctx": "/uitemplate_web",
                    "refCode": "",
                    "refName": "商品",
                    "isMultiSelectedEnabled": "true"
                },//商品
                clientParam: {
                    "AUTH_refcod":"goods-rel-picture"
                },
                opr: "IN"
            }, {
                type: "refer",
                key: "picture--pictureCategory--id",
                label: "图片分类",
                refinfo: "pictureCategories",
                refName: "图片分类",
                refcfg: {
                    "ctx": "/uitemplate_web",
                    "refCode": "",
                    "refName": "图片分类",
                    "isMultiSelectedEnabled": "true"
                },//商品
                opr: "IN"
            }, {
                type: "radio",
                key: "isMainPicture",
                label: "主图",
                defaultvalue: "",
                dataSource: [
                    {value: "", name: "全部"},
                    {value: "1", name: "是"},
                    {value: "0", name: "否"}
                ]
            }, {
                type: "combo",
                key: "isEnable",
                label: "启用状态",
                dataSource: [
                    {value: "", name: "全部"},
                    {value: "0", name: "未启用"},
                    {value: "1", name: "已启用"},
                    {value: "2", name: "已停用"}
                ]
            }]
        },
        dialogs: {
            dialog1: [
                {
                    type: "refer",
                    key: "goodsId",
                    referId: "goodsId",
                    label: "商品",
                    refinfo: "goods",
                    refcfg: {
                        "ctx": "/uitemplate_web",
                        "refCode": "",
                        "refName": "商品",
                        "isMultiSelectedEnabled": "true"
                    },//商品
                    clientParam: {
                        "AUTH_refcod":"goods-rel-picture"
                    }
                }, {
                    type: "refer",
                    key: "pictureId",
                    referId: "pictureId",
                    label: "图片",
                    refinfo: "picture",
                    refcfg: {
                        "ctx": "/uitemplate_web",
                        "refCode": "",
                        "refName": "图片",
                        "isMultiSelectedEnabled": "true"
                    }//商品
                }, {
                    type: "radio",
                    key: "isMainPicture",
                    label: "主图",
                    dataSource: [
                        {value: "1", name: "是"},
                        {value: "0", name: "否"}
                    ]
                }, {
                    type: "label",
                    key: "isEnable",
                    label: "启用状态",
                    defaultvalue: "0"
                }
            ]
        },
        grids: {
            grid1: {
                domid: "GoodsRelPictureGrid-domid",
                umeta: {
                    id: "GoodsRelPictureGrid-id",
                    data: "GoodsRelPictureList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true
                },
                columns: [{
                    field: "goodsName",
                    dataType: "String",
                    title: "商品名称"
                }, {
                    field: "goodsCode",
                    dataType: "String",
                    title: "商品编码"
                }, {
                    field: "description",
                    dataType: "String",
                    title: "描述",
                    visible: false
                }, {
                    field: "pictureCategoryName",
                    dataType: "String",
                    title: "图片分类"
                }, {
                    field: "picUrl",
                    dataType: "String",
                    title: "图片预览",
                    renderType: "picShow"
                }, {
                    field: "pictureName",
                    dataType: "String",
                    title: "图片名称"
                }, {
                    field: "isMainPicture",
                    dataType: "String",
                    title: "主图",
                    renderType: "isMainPictureGrid"
                }, {
                    field: "uploadTime",
                    dataType: "Date",
                    title: "上传时间"
                }, {
                    field: "modifiedTime",
                    dataType: "Datetime",
                    title: "修改时间",
                    visible: false
                }, {
                    field: "isEnable",
                    dataType: "String",
                    title: "状态",
                    renderType: "isEnableGrid"
                }, {
                    field: "operation",
                    dataType: "String",
                    title: "操作",
                    renderType: "operation4single",
                    fixed: true,
                    width: "110px"
                }]
            }
        }
    };
    return new basemodel(model);
});
