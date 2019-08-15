define(["ocm_basemodel"], function(basemodel) {
    'use strict';
    var model = {
        metas: {
            depotrangprimeta: {
                meta: {
                    coverageId: {
                        type: 'string',
                    },
                    storId: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
                    }, //仓库
                    storCode: {
                        type: 'string',
                        required: true
                    }, //仓库编码
                    storName: {
                        type: 'string',
                    }, //仓库名称
                    routePackageId: {
                        type: "string",
                        "refmodel": JSON.stringify(refinfo['warehouseproductgroup']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库产品组"}'
                    }, //仓库产品组
                    routePackageCode: {
                        type: 'string',
                    }, //仓库产品组编码
                    routePackageName: {
                        type: 'string',
                    }, //仓库产品组名称
                    provinceId: {
                        type: 'string',
                        required: true
                    }, //省
                    provinceCode: {
                        type: 'string',
                        required: true
                    }, //省编码
                    provinceName: {
                        type: 'string',
                    }, //省名称
                    cityId: {
                        type: 'string',
                        required: true
                    }, //市
                    cityCode: {
                        type: 'string',
                        required: true
                    }, //市编码
                    cityName: {
                        type: 'string',
                    }, //市名称
                    districtId: {
                        type: 'string',
                        required: true
                    }, //区
                    districtCode: {
                        type: 'string',
                        required: true
                    }, //区编码
                    districtName: {
                        type: 'string',
                    }, //区名称
                    townId: {
                        type: 'string',
                        required: true
                    }, //镇
                    townCode: {
                        type: 'string',
                        required: true
                    }, //镇编码
                    townName: {
                        type: 'string',
                    }, //镇名称
                    priority: {
                        type: 'integer',
                        validType: 'integer'
                    }, //优先级
                    coverageId: {
                        type: 'string'
                    }, //仓库区域主键
                    id: {
                        type: 'string'
                    }, //主键
                    dr: {
                        type: 'integer'
                    }, //删除标识
                    ts: {
                        type: 'string'
                    }, //时间戳
                    creator: {
                        type: 'string'
                    }, //创建人
                    creationTime: {
                        type: 'datetime'
                    }, //创建时间
                    modifier: {
                        type: 'string'
                    }, //修改人
                    modifiedTime: {
                        type: 'datetime'
                    }
                },
                pageSize: 10
            },
            ItemRef: {
                meta: {
                    storref: {
                        type: 'string',
                        "refmodel": JSON.stringify(refinfo['warehouse']),
                        "refcfg": '{"ctx":"/uitemplate_web","refName":"仓库"}',
                        "refparam": '{"EQ_isEnable":"1"}' //是否启用
                    }
                }
            }
        },
        searchs: {
            search1: [{
                type: "refer",
                key: "province",
                label: "所属省",
                refinfo: "region",
                refName: "所属省",
                clientParam: {
                    "EQ_areaLevel": "1"
                },
                domid: "provinceInfo"
            }, {
                type: "refer",
                key: "city",
                label: "所属市",
                refinfo: "region",
                clientParam: {
                    "EQ_areaLevel": "2"
                },
                domid: "cityInfo"
            }, {
                type: "refer",
                key: "district",
                refinfo: "region",
                label: "所属区/县",
                clientParam: {
                    "EQ_areaLevel": "3"
                },
                domid: "districtInfo"
            }, {
                type: "refer",
                key: "town",
                refinfo: "region",
                label: "所属镇/街道",
                clientParam: {
                    "EQ_areaLevel": "4"
                },
                domid: "townInfo"
            }, {
                type: "refer",
                key: "routePackage--id",
                label: "仓库产品组",
                refinfo: "warehouseproductgroup",
            }, {
                type: "radio",
                key: "isRepeat",
                label: "是否重复优先级",
                dataSource: [{
                    value: '1',
                    name: '是'
                }, {
                    value: '0',
                    name: '否'
                }]
            }]
        },
        buttons: {
            button3: [{
                key: "edit",
                label: "编辑",
                iconCls: "icon-edit",
                click: "edit",
            }],
            button2: [{
                key: "adpri",
                label: "调整优先级",
                iconCls: "icon-tubiao-huangou",
                click: "adpri"
            }, {
                key: "batchdepots",
                label: "批选仓库",
                iconCls: "icon-tubiao-huangou",
                click: "batchdepots"
            }, {
                key: "save",
                label: "保存",
                iconCls: "icon-tubiao-baocun",
                click: "save"
            }, {
                key: "cancle",
                label: "取消",
                iconCls: "icon-tubiao-guanbi-xianxing",
                click: "cancle"
            }]
        },
        dialogs: {
            dialog1: [{
                type: "text",
                key: "priority",
                label: "优先级",
                required: true
            }],
        },
        grids: {
            grid1: {
                domid: "grid_depotrangpri_dom",
                umeta: {
                    id: "grid_depotrangpri",
                    data: "depotrangpriList",
                    type: "grid",
                    editable: false,
                    multiSelect: true,
                    showNumCol: true,
                },
                columns: [{
                    field: "provinceName",
                    dataType: "String",
                    title: "省",
                    editable: false
                }, {
                    field: "cityName",
                    dataType: "String",
                    title: "市",
                    editable: false
                }, {
                    field: "districtName",
                    dataType: "String",
                    title: "区/县",
                    editable: false
                }, {
                    field: "townName",
                    dataType: "String",
                    title: "镇/街道",
                    editable: false
                }, {
                    field: "storCode",
                    dataType: "String",
                    title: "仓库编码",
                    editable: false
                }, {
                    field: "storName",
                    dataType: "String",
                    title: "仓库名称",
                    editable: false
                }, {
                    field: "routePackageName",
                    dataType: "String",
                    title: "仓库产品组",
                    editable: false
                }, {
                    field: "priority",
                    dataType: "String",
                    title: "优先级",
                    width: "200px",
                }]
            }
        }
    };
    return new basemodel(model);
});