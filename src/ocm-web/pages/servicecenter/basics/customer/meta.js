define(["ocm_basemodel"], function (basemodel) {
    'use strict';
    var model = {
        metas: {
            customermeta: {
                params: {
                    "cls": "com.yonyou.occ.sc.service.dto.CustomerDto"
                },
                meta: {
                    id:{type: 'string'},//id
                    code:{type: 'string',required:true},//编码
                    name: {type: 'string',required:true},//名称
                    phone: {type: 'string',required:true},//手机
                    homeTel: {type: 'string'},//住宅电话
                    companyTel: {type: 'string'},//单位电话
                    email: {type: 'string'},//邮箱
                    countryId: { type: 'string' ,required:true},//注册国家ID
                    countryName: { type: 'string' },//注册国家名称
                    countryCode: { type: 'string' },
                    provinceId: { type: 'string' ,required:true},//注册所在省份ID
                    provinceName: { type: 'string' },//注册所在省份名称
                    provinceCode: { type: 'string' },
                    cityId: { type: 'string' ,required:true},//注册所在城市ID
                    cityName: { type: 'string' },//注册所在城市名称
                    cityCode: { type: 'string' },
                    districtId: { type: 'string' ,required:true},//注册所在区/县
                    districtName: { type: 'string' },//注册所在区/县名称
                    districtCode: { type: 'string' },
                    townId: { type: 'string' },//注册所在乡镇/街道
                    townName: { type: 'string' },
                    townCode: { type: 'string' },
                    postcode: { type: 'string' },//编码
                    idTypeId: { type: 'string' },//证件类型
                    idTypeCode: { type: 'string' },//证件类型
                    idTypeName: { type: 'string' },//证件类型
                    idNo: { type: 'string' },//证件号
                    address: { type: 'string' },//地址
                    
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
                    label:"客户编码"
                },
                {
                    type:"text",
                    key:"name",
                    label:"客户名称",
                },
                {
                    type:"text",
                    key:"phone",
                    label:"手机",
                }
            ]
        },
        //弹窗组
        dialogs: {
            dialog1: [
                {
                    type:"text",
                    key:"code",
                    label:"客户编码",
                    disableInEdit:true
                },
                {
                    type:"text",
                    key:"name",
                    label:"客户名称"
                },
                {
                    type:"text",
                    key:"phone",
                    label:"手机"
                },
                {
                    type:"text",
                    key:"homeTel",
                    label:"住宅电话"
                },
                {
                    type:"text",
                    key:"companyTel",
                    label:"单位电话"
                },
                {
                    type:"text",
                    key:"email",
                    label:"电子邮件"
                },
                {
                    type:"refer",
                    key:"countryId",
                    label:"国家",
                    refinfo:"country"
                },
                {
                    type:"refer",
                    key:"provinceId",
                    label:"省份",
                    refinfo:"region",
                    clientParam: {"EQ_areaLevel":"1"}
                },
                {
                    type:"refer",
                    key:"cityId",
                    label:"城市",
                    refinfo:"region",
                    clientParam: {"EQ_areaLevel":"2"}
                },
                { 
                    type:"refer",
                    key:"districtId",
                    label:"区/县",
                    refinfo:"region",
                    clientParam: {"EQ_areaLevel":"3"}
                },
                { 
                    type:"refer",
                    key:"townId",
                    label:"乡镇/街道",
                    refinfo:"region",
                    clientParam: {"EQ_areaLevel":"4"}
                },
                {
                    type:"text",
                    key:"address",
                    label:"地址"
                },
                {
                    type:"text",
                    key:"postcode",
                    label:"邮编"
                },
                {
                    type:"combo",
                    key:"idTypeId",
                    label:"证件类型",
                    url: window.pathMap.base +"/cust-doc-defs/cust_doc_code?cust_doc_code=QY022",
                    namefield:"name",
                    valuefield:"id"
                },
                {
                    type:"text",
                    key:"idNo",
                    label:"证件号"
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
                        title: "客户编码",
                        renderType:"detailRender"
                    },
                    {
                        field: "name",
                        dataType: "String",
                        title: "客户名称",
                    },
                    {
                        field: "phone",
                        dataType: "String",
                        title: "手机",
                    },
                    {
                        field: "companyTel",
                        dataType: "String",
                        title: "单位电话",
                    },
                    {
                        field: "email",
                        dataType: "String",
                        title: "电子邮件",
                    },
                    {
                        field: "address",
                        dataType: "String",
                        title: "地址",
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
                    label: "客户编码",
                },
                {
                    key: "name",
                    label: "客户名称",
                },
                {
                    key: "phone",
                    label: "手机",
                },
                {
                    key: "homeTel",
                    label: "住宅电话",

                },
                {
                    key: "companyTel",
                    label: "单位电话",
                },
                {
                    key: "email",
                    label: "电子邮件",
                },
                {
                    key:"countryName",
                    label:"国家"
                },
                {
                    key:"provinceName",
                    label:"省份",
                },
                {
                    key:"cityName",
                    label:"城市",
                },
                {
                    key:"provinceName",
                    label:"区/县",
                },
                {
                    key:"townName",
                    label:"乡镇/街道",
                },
                {
                    key:"address",
                    label:"地址"
                },
                {
                    key:"postcode",
                    label:"邮编"
                },
                {
                    key:"idTypeName",
                    label:"证件类型"
                },
                {
                    key:"idNo",
                    label:"证件号"
                },
            ]
        }
    };
    return new basemodel(model);
});

