define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      complex: {
        meta: {
          id: {
            type: 'string'
          }, //id
          code: {
            type: 'string',
            required: true
          }, //规则编码
          name: {
            type: 'string',
            required: true
          }, //规则名称
          // pkOrg: {
          //   type: 'string',
          //   required:true,
          //   "refmodel": JSON.stringify(refinfo['organization_ocm']),
          //   "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
          //   "refparam":'{"EQ_isAdministration": "1"}',
          // },//组织
          // pkOrgName: {type: 'string',required:true},//组织名称
          customerId: {
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            clientParam: {
              EQ_isChannelCustomer: "1"
            }
          }, // 客户
          customerName: {
            type: "string"
          },
          customerCategoryId: {
            refmodel: JSON.stringify(refinfo["customer-category"]),
            refcfg: '{"ctx":"/uitemplate_web"}'
          }, // 客户分类
          customerCategoryCode: {
            type: "string"
          }, //客户分类编码
          customerCategoryName: {
            type: "string"
          }, //客户分类名称
          accountId: {
            refmodel: JSON.stringify(refinfo["fee-accounts"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            required: true
          }, //账户
          accountCode: {
            type: 'string'
          }, //账户
          accountName: {
            type: 'string'
          }, //账户
          saleOrgId: {
            type: 'string',
            required: true
          }, //销售组织
          saleOrgName: {
            type: 'string',
            // required: true
          }, //销售组织
          financeOrgId: {
            type: 'string',
            required: true
          }, //财务组织
          financeOrgName: {
            type: 'string',
            // required: true
          }, //财务组织
          customerCode: {
            type: "string"
          }, // 客户编码
          isEnable: {
            type: 'string',
            default: "0"
          }, //启用状态
          castTypeId: {
            type: 'string'
          },
          castTypeName: {
            type: 'string'
          },
          // beginTime: {
          //   type: 'datetime'
          // }, //开始时间
          // endTime: {
          //   type: 'datetime'
          // }, //结束时间
          discountRate: {
            type: 'float',
            // required: true,
            precision: 2,
            regExp: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,
            errorMsg: "请输入大于等于0，小于100的数值"
          }, //商品优惠比例%
          remark: {
            type: 'string'
          }, //备注
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        meta: {
          id: {
            type: 'string'
          }, //idp
          ruleId: {
            type: 'string',
          }, //规则主键
          seriesId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['seriesDoc']),
            'refcfg': '{"ctx":"/uitemplate_web","refname":"系列"}',
            'refparam': '{"EQ_seriesType":"0","EQ_isEnable":"1"}'
          }, //系列
          seriesCode: {
            type: 'string',
          }, //系列
          seriesName: {
            type: 'string',
          }, //系列
          productLineId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['productLine']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //产品线
          productLineName: {
            type: 'string'
          },
          brandId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['brand']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //品牌
          brandName: {
            type: 'string',
          }, //品牌
          goodsCategoryId: {
            type: 'string',
            'refmodel': JSON.stringify(refinfo['goodsCategory']),
            'refcfg': '{"ctx":"/uitemplate_web"}',
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //商品分类
          goodsCategoryCode: {
            type: 'string',
          }, //商品分类
          goodsCategoryName: {
            type: 'string',
          }, //商品分类
          goodsId: {
            type: 'string',
            refmodel: JSON.stringify(refinfo["goods"]),
            refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}',
            refcfg: '{"ctx":"/uitemplate_web"}'
            // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //商品
          goodsName: {
            type: 'string'
          }, //商品
          // goodsRangeId: {
          //   type: 'string',
          // }, //商品范围主键
          // goodsRangeDesc: {
          //   type: 'string',
          // }, //商品范围描述
          discountRate: {
            type: 'float',
            precision: 2,
            regExp: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,
            errorMsg: "请输入大于等于0，小于100的数值"
          }, //商品优惠比例%
          exclude: {
            type: 'integer'
          }, //排除
          dr: {
            type: 'string'
          }
        },
        pageSize: 10,
      },
      goodsRange: {
        seriesId: {
          type: 'string',
          'refmodel': JSON.stringify(refinfo['seriesDoc']),
          'refcfg': '{"ctx":"/uitemplate_web","refname":"系列"}',
          'refparam': '{"EQ_seriesType":"0","EQ_isEnable":"1"}'
        }, //系列
        seriesCode: {
          type: 'string',
        }, //系列
        seriesName: {
          type: 'string',
        }, //系列
        productLineId: {
          type: 'string',
          'refmodel': JSON.stringify(refinfo['productLine']),
          'refcfg': '{"ctx":"/uitemplate_web"}',
          // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
        }, //产品线
        productLineName: {
          type: 'string'
        },
        brandId: {
          type: 'string',
          'refmodel': JSON.stringify(refinfo['brand']),
          'refcfg': '{"ctx":"/uitemplate_web"}',
          // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
        }, //品牌
        brandName: {
          type: 'string',
        }, //品牌
        goodsCategoryId: {
          type: 'string',
          'refmodel': JSON.stringify(refinfo['goodsCategory']),
          'refcfg': '{"ctx":"/uitemplate_web"}',
          // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
        }, //商品分类
        goodsCategoryCode: {
          type: 'string',
        }, //商品分类
        goodsCategoryName: {
          type: 'string',
        }, //商品分类
        goodsId: {
          type: 'string',
          refmodel: JSON.stringify(refinfo["goods"]),
          refparam: '{"EQ_isEnable":"1","EQ_isServiceType":"0"}',
          refcfg: '{"ctx":"/uitemplate_web"}'
          // 'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
        }, //商品
        goodsName: {
          type: 'string'
        }, //商品

      },
    },
    searchs: {
      search1: [{
        type: "refer",
        key: "saleOrg",
        keyfordisplay: "saleOrgName",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_orgFuncRel": "01",
          "AUTH_refdim":"saleOrg"
        }
      }, {
        type: "refer",
        key: "financeOrg",
        label: "财务组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "07",
          "AUTH_refdim":"financeOrg"
        }
      }, {
        type: "refer",
        key: "account--id",
        keyfordisplay: "accountName",
        label: "账户",
        refinfo: "fee-accounts"
      }, {
        type: "refer",
        key: "customer",
        keyfordisplay: "customerName",
        label: "客户",
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1",
          "AUTH_refdim":"customer"
        }
      }, {
        type: "refer",
        key: "customerCategory",
        keyfordisplay: "customerCategoryName",
        label: "客户分类",
        refinfo: "customer-category",
        clientParam: {
          "EQ_isEnable": "1",
          "AUTH_refdim":"customerCategory"
        }
      }, {
        type: "combo",
        key: "account--castTypeId",
        label: "兑付类型",
        dataSource: [{
          value: "pay01",
          name: "冲抵订单"
        }, {
          value: "pay02",
          name: "货补"
        }, {
          value: "pay03",
          name: "实物货补"
        }, {
          value: "pay04",
          name: "账扣"
        }]
      }, {
        type: "radio",
        key: "isEnable",
        label: "状态",
        dataSource: CONST.ENABLESTATUSISALL,
      }, ]
    },
    buttons: {
      button1: [{
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddBillPanel"
        }, {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        }, {
          key: "refresh",
          label: "刷新",
          iconCls: "icon-tubiao-huangou",
          click: "refresh"
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
        },
        // {
        //   key: "import",
        //   label: "导入",
        //   iconCls: "icon-import",
        //   click: "importHandle"
        // }, {
        //   key: "export",
        //   label: "导出",
        //   iconCls: "icon-export",
        //   click: "exportHandle"
        // },
      ],
      button2: [{
        key: "cancel",
        label: "取消",
        click: "cancelBill"
      }, {
        key: "save",
        label: "保存",
        click: "saveBill",
        cls: "ui-btn-green"
      }],
      button3: [{
        key: "addrow",
        label: "增行",
        iconCls: "icon-plus",
        click: "showAddItemsRef"
      }, {
        key: "delrow",
        label: "删行",
        iconCls: "icon-shanchu1",
        click: "delItems",
      }],
      button4: [{
        key: "return",
        label: "返回",
        click: "retListPanel"
      }, {
        key: "edit",
        label: "编辑",
        click: "detail2bill",
        cls: "ui-btn-green"
      }],
    },
    cards: {
      card1: [{
        type: "text",
        key: "code",
        label: "规则编码",
        disableInEdit: true
      }, {
        type: "text",
        key: "name",
        label: "规则名称",
      }, {
        type: "refer",
        key: "customerId",
        label: "客户",
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "refer",
        key: "customerCategoryId",
        label: "客户分类",
        refinfo: "customer-category",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "refer",
        key: "accountId",
        label: "账户",
        refinfo: "fee-accounts",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_isRootAccount": "1",
        }
      }, {
        type: "text",
        key: "castTypeName",
        label: "兑付类型",
        enable: false,
      }, {
        type: "text",
        key: "saleOrgName",
        label: "销售组织",
        enable: false,
      }, {
        type: "text",
        key: "financeOrgName",
        label: "财务组织",
        enable: false,
      }, {
         type: "combo",
        key: "priorityRule",
        label: "优先规则",
        dataSource: [{
          value: "TIME",
          name: "费用单有效期"
        }, {
          value: "PRIORITY",
          name: "账户优先级"
        }],
        defaultvalue:"TIME"
      },{
        type: "text",
        key: "discountRate",
        compid: "disCountRateID",
        domid: "disCountRateID",
        label: "商品优惠比例%",
        // enable: false,
      }, 
      // {
      //   type: "datetime",
      //   key: "beginTime",
      //   label: "开始时间",
      // }, 
      // {
      //   type: "datetime",
      //   key: "endTime",
      //   label: "结束时间",
      // }, 
      {
        type: "label",
        key: "isEnable",
        label: "状态",
      }, {
        type: "textarea",
        key: "remark",
        label: "备注",
        cls: "ui-textarea-item"
      }, ]
    },
    details: {
      detail1: [{
        key: "code",
        label: "规则编码",
      }, {
        key: "name",
        label: "规则名称",
      }, {
        key: "customerName",
        label: "客户",
      }, {
        key: "customerCategoryName",
        label: "客户分类",
      }, {
        key: "accountName",
        label: "账户",
      }, {
        key: "castTypeId",
        label: "兑付类型",
        computed: "castType"
      }, {
        key: "saleOrgName",
        label: "销售组织",
      }, {
        key: "financeOrgName",
        label: "财务组织",
      },  {
        key: "priorityRule",
        label: "优先规则",
        computed: "pRules"
      },

      // {
      //   key: "beginTime",
      //   label: "开始时间",
      // }, 
      // {
      //   key: "endTime",
      //   label: "结束时间",
      // },
       {
        key: "remark",
        label: "备注",
      }, {
        key: "isEnable",
        label: "状态",
        computed: "enableFmt"
      }]
    },
    dialogs: {
      dialog1: [{
        type: "refer",
        key: "seriesId",
        keyfordisplay: "seriesName",
        label: "系列",
        refinfo: "seriesDoc",
      }, {
        type: "refer",
        key: "productLineId",
        keyfordisplay: "productLineName",
        label: "产品线",
        refinfo: "productLine",
      }, {
        type: "refer",
        key: "brandId",
        keyfordisplay: "brandName",
        label: "品牌",
        refinfo: "brand",
      }, {
        type: "refer",
        key: "goodsCategoryId",
        keyfordisplay: "goodsCategoryName",
        label: "商品分类",
        refinfo: "goodsCategory",
      }, {
        type: "refer",
        key: "goodsId",
        keyfordisplay: "goodsName",
        label: "商品",
        refinfo: "goods",
      }, ]
    },
    grids: {
      grid1: {
        domid: "grid_complex_dom",
        umeta: {
          "id": "grid_complex",
          "data": "complexList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "code",
          "dataType": "String",
          "title": "规则编码",
          "renderType": "detailRender"
        }, {
          "field": "name",
          "dataType": "String",
          "title": "规则名称"
        }, {
          "field": "isEnable",
          "dataType": "String",
          "title": "状态",
          "renderType": "enableStatusRender"
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "客户"
        }, {
          "field": "customerCategoryName",
          "dataType": "String",
          "title": "客户分类"
        }, {
          "field": "accountName",
          "dataType": "String",
          "title": "账户"
        }, {
          "field": "saleOrgName",
          "dataType": "String",
          "title": "销售组织"
        }, {
          "field": "financeOrgName",
          "dataType": "String",
          "title": "财务组织"
        }, {
          "field": "discountRate",
          "dataType": "Float",
          "title": "商品优惠比例%"
        }, {
          "field": "castTypeId",
          "dataType": "String",
          "title": "兑付类型",
          "editOptions": {
            "type": "combo",
            "datasource": "castTypeStr"
          },
          "renderType": "comboRender",
        }, 
        // {
        //   "field": "beginTime",
        //   "dataType": "Datetime",
        //   "title": "开始时间"
        // }, {
        //   "field": "endTime",
        //   "dataType": "Datetime",
        //   "title": "结束时间"
        // },
         {
          "field": "remark",
          "dataType": "String",
          "title": "备注"
        }, {
          "field": "operation",
          "dataType": "String",
          "title": "操作",
          "renderType": "operation",
          "fixed": true,
          "width": "100px"
        }, ]
      },
      grid2: {
        domid: "grid_complexItem_dom",
        umeta: {
          "id": "grid_complexItem",
          "data": "complexItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
            "dataType": "String",
            "field": "seriesId",
            "title": "系列",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "seriesName",
            "editOptions": {
              "validType": "string",
              "rel": {
                "refpk": "seriesId",
                "refname": "seriesName"
              }
            },
          }, {
            "dataType": "String",
            "field": "productLineId",
            "title": "产品线",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "productLineName",
            "editOptions": {
              "validType": "string",
              "rel": {
                "refpk": "productLineId",
                "refname": "productLineName"
              }
            },
          }, {
            "dataType": "String",
            "field": "brandId",
            "title": "品牌",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "brandName",
            "editOptions": {
              "validType": "string",
              "rel": {
                "refpk": "brandId",
                "refname": "brandName"
              }
            },
          }, {
            "dataType": "String",
            "field": "goodsCategoryId",
            "title": "商品分类",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "goodsCategoryName",
            "editOptions": {
              "validType": "string",
              "rel": {
                "refpk": "goodsCategoryId",
                "refname": "goodsCategoryName"
              }
            },
          }, {
            "dataType": "String",
            "field": "goodsId",
            "title": "商品",
            "renderType": "ncReferRender",
            "editType": "ncReferEditType",
            "showField": "goodsName",
            "editOptions": {
              "validType": "string",
              "rel": {
                "refpk": "goodsId",
                "refname": "goodsName"
              }
            },
          },
          // {
          //   "field": "goodsRangeId",
          //   "dataType": "String",
          //   "title": "商品范围主键",
          //   "editType": "gREditType"
          // }, 
          // {
          //   "field": "goodsRangeDesc",
          //   "dataType": "String",
          //   "title": "商品范围描述",
          //   "editable": false,
          //   "width": "400"
          // },
          {
            "field": "discountRate",
            "dataType": "Float",
            "title": "商品优惠比例%",
            "editType": "float",
            "required": true,
            "width": "150",
            "editOptions": {
              "validType": "float",
              "precision": "2",
              "min": 0,
              "max": 100
            }
          },
        ]
      },
      grid4: {
        domid: "grid_complexItem4_dom",
        umeta: {
          "id": "grid_complexItem4",
          "data": "complexItems",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "dataType": "String",
          "field": "seriesId",
          "title": "系列",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "seriesName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "seriesId",
              "refname": "seriesName"
            }
          },
        }, {
          "dataType": "String",
          "field": "productLineId",
          "title": "产品线",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "productLineName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "productLineId",
              "refname": "productLineName"
            }
          },
        }, {
          "dataType": "String",
          "field": "brandId",
          "title": "品牌",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "brandName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "brandId",
              "refname": "brandName"
            }
          },
        }, {
          "dataType": "String",
          "field": "goodsCategoryId",
          "title": "商品分类",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsCategoryName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "goodsCategoryId",
              "refname": "goodsCategoryName"
            }
          },
        }, {
          "dataType": "String",
          "field": "goodsId",
          "title": "商品",
          "renderType": "ncReferRender",
          "editType": "ncReferEditType",
          "showField": "goodsName",
          "editOptions": {
            "validType": "string",
            "rel": {
              "refpk": "goodsId",
              "refname": "goodsName"
            }
          },
        }, {
          "field": "exclude",
          "dataType": "checkbox",
          "title": "排除",
          "renderType": "booleanRender",
        }, ]
      },
      grid3: {
        domid: "grid_democomplexItem2_dom",
        umeta: {
          "id": "grid_democomplexItem2",
          "data": "complexItems",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true,
          "sortable": false
        },
        columns: [{
          "dataType": "String",
          "field": "seriesName",
          "title": "系列",
        }, {
          "dataType": "String",
          "field": "productLineName",
          "title": "产品线",
        }, {
          "dataType": "String",
          "field": "brandName",
          "title": "品牌",
        }, {
          "dataType": "String",
          "field": "goodsCategoryName",
          "title": "商品分类",
        }, {
          "dataType": "String",
          "field": "goodsName",
          "title": "商品",
        }, {
          "field": "discountRate",
          "dataType": "Float",
          "title": "商品优惠比例%",
        }, {
          "field": "exclude",
          "dataType": "Integer",
          "title": "排除",
        }, ]
      },
    }
  }
  return new basemodel(model);
})