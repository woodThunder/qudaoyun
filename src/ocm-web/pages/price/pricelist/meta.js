define(["ocm_basemodel"], function (basemodel) {
  var model = {
    metas: {
      complex: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.complexDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          code: {
            type: 'string',
            required: true
          }, //编码
          name: {
            type: 'string',
            required: true
          }, //名称
          currencyId: {
            type: 'string',
            'refmodel':JSON.stringify(refinfo['currency']),
            'refcfg':'{"ctx":"/uitemplate_web"}',
            'refparam':'{"EQ_isEnable":"1"}'
          }, //缺省币种id
          currencyName: {
            type: 'string',
          }, //缺省币种
          unitType: {
            type: 'string',
            required: true
          }, //默认计量单位
          organizationId: {
            type: 'string',
            required: true,
            'refmodel':JSON.stringify(refinfo['organization_ocm']),
            'refcfg':'{"ctx":"/uitemplate_web"}',
            'refparam':'{"EQ_orgFuncRel":"01","EQ_isEnable":"1"}'
          }, //销售组织
          organizationName: {
            type: 'string',
          }, //销售组织
          useGoods: {
            type: 'string',
            default: "0",
          }, //商品因素
          useProduct: {
            type: 'string',
            default: "0",
          }, //产品因素
          useBrand: {
            type: 'string',
            default: "0",
          }, //品牌因素
          useGoodsCategory: {
            type: 'string',
            default: "0",
          }, //商品分类因素
          useCustomer: {
            type: 'string',
            default: "0",
          }, //客户因素
          useCustomerCategory: {
            type: 'string',
            default: "0",
          }, //客户分类因素
          useShop: {
            type: 'string',
            default: "0",
          }, //门店因素

          // pkOrg: {
          //   type: 'string',
          //   required:true,
          //   "refmodel": JSON.stringify(refinfo['organization_ocm']),
          //   "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
          //   "refparam":'{"EQ_isAdministration": "1"}',
          // },//组织
          // pkOrgName: {type: 'string',required:true},//组织名称
          // enableStatus: {
          //   type: 'string',
          //   required: true
          // }, //启用状态
          creator: {
            type: 'string'
          },
          creationTime: {
            type: 'datetime'
          },
          modifier: {
            type: 'string'
          },
          modifiedTime: {
            type: 'datetime'
          }
        },
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      complexItem: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.complexItemDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //idp
          priceListId: {
            type: 'string',
          },
          priceItemId: {
            type: 'string',
          },
          priceItemCode: {
            type: 'string',
          },
          priceItemName: {
            type: 'string',
          },
          isSelected: {
            type: 'string',
            default: "0"
          },
          isModify: {
            type: 'string',
            default: "0"
          },

          dr: {
            type: 'integer'
          },
        },
        pageSize: 10,
      },
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['productInfo']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }
        }
      }
    },
    searchs: {
      search1: [
        {
          type: "text",
          key: "code",
          label: "价目表编码",
        },
        {
          type: "text",
          key: "name",
          label: "价目表名称",
        },
        {
          type: "refer",
          key: "organization",
          label: "销售组织",
          refinfo:"organization_ocm",
          clientParam:{"EQ_orgFuncRel":"01","EQ_isEnable":"1","AUTH_refdim":"organization"}
        },
        {
          type: "combo",
          key: "unitType",
          label: "默认计量单位",
          dataSource:[{ name: "基本单位", value: "2"}]
          //dataSource:[{name: "辅助单位", value: '1'}, { name: "基本单位", value: "2"}]
        },
        {
          type: "refer",
          key: "currency",
          label: "缺省币种",
          refinfo:"currency",
          clientParam:{"EQ_isEnable":"1"}
        },
        {
          type: "radio",
          key: "useGoods",
          label: "商品因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useProduct",
          label: "产品因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useBrand",
          label: "品牌因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useGoodsCategory",
          label: "商品分类因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useCustomer",
          label: "客户因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useCustomerCategory",
          label: "客户分类因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useShop",
          label: "门店因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
      ]
    },
    buttons: {
      button1: [{
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "showAddBillPanel"
        },
        {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "del"
        },
        // {
        //   key: "enable",
        //   label: "启用",
        //   iconCls: "icon-qiyong",
        //   click: "enable"
        // },
        // {
        //   key: "disable",
        //   label: "停用",
        //   iconCls: "icon-tingyong",
        //   click: "disable"
        // },
        // {
        //   key: "import",
        //   label: "导入",
        //   iconCls: "icon-import",
        //   click: "importHandle"
        // },
        // {
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
        },
        {
          key: "save",
          label: "保存",
          click: "saveBill",
          cls: "ui-btn-green"
        }
      ],
      button3: [{
          key: "addrow",
          label: "增行",
          iconCls: "icon-plus",
          click: "showAddItemsRef"
        },
        {
          key: "delrow",
          label: "删行",
          iconCls: "icon-shanchu1",
          click: "delItems",
        }
      ],
      button4: [{
          key: "return",
          label: "返回",
          click: "retListPanel"
        },
        {
          key: "edit",
          label: "编辑",
          click: "detail2bill",
          cls: "ui-btn-green"
        }
      ],
    },
    cards: {
      card1: [
        {
          type: "text",
          key: "code",
          label: "价目表编码",
          disableInEdit: true
        },
        {
          type: "text",
          key: "name",
          label: "价目表名称",
        },
        {
          type: "refer",
          key: "organizationId",
          label: "销售组织",
          refinfo:"organization_ocm",
          clientParam:{"EQ_isEnable":"1", "EQ_orgFuncRel":"01"},
          disableInEdit: true
        },
        {
          type: "combo",
          key: "unitType",
          label: "默认计量单位",
          default: "2",
          dataSource:[{ name: "基本单位", value: "2"}],
          onlySelect: true
          //dataSource:[{name: "辅助单位", value: '1'}, { name: "基本单位", value: "2"}]
        },
        {
          type: "refer",
          key: "currencyId",
          label: "缺省币种",
          refinfo:"currency",
          clientParam:{"EQ_isEnable":"1"}
        },
        {
          type: "radio",
          key: "useGoods",
          label: "商品因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useProduct",
          label: "产品因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useBrand",
          label: "品牌因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useGoodsCategory",
          label: "商品分类因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useCustomer",
          label: "客户因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useCustomerCategory",
          label: "客户分类因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        {
          type: "radio",
          key: "useShop",
          label: "门店因素",
          dataSource:[{name: "启用", value: "1"},{name: "停用", value: "0"}]
        },
        // {
        //   type: "label",
        //   key: "enableStatus",
        //   label: "启用状态"
        // }
      ]
    },
    details: {
      detail1: [
        {
          key: "code",
          label: "价目表编码",
        },
        {
          key: "name",
          label: "价目表名称",
        },
        {
          type: "refer",
          key: "organizationName",
          label: "销售组织",
          refinfo:"organization_ocm",
          clientParam: {"EQ_orgFuncRel": "01", "EQ_isEnable":"1"}
        },
        {
          key: "unitType",
          label: "默认计量单位",
          computed: "unitTypeFmt"
        },
        {
          key: "currencyName",
          label: "缺省币种",
        },
        {
          key: "useGoods",
          label: "商品因素",
          computed: "enableFmtGoods"
        },
        {
          key: "useProduct",
          label: "产品因素",
          computed: "enableFmtProduct"
        },
        {
          key: "useBrand",
          label: "品牌因素",
          computed: "enableFmtBrand"
        },
        {
          key: "useGoodsCategory",
          label: "商品分类因素",
          computed: "enableFmtCategory"
        },
        {
          key: "useCustomer",
          label: "客户因素",
          computed: "enableFmtCustomer"
        },
        {
          key: "useCustomerCategory",
          label: "客户分类因素",
          computed: "enableFmtCustomerCategory"
        },
        {
          key: "useShop",
          label: "门店因素",
          computed: "enableFmtShop"
        },
      ]
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
            "title": "价目表编码",
            "renderType": "detailRender"
          },
          {
            "field": "name",
            "dataType": "String",
            "title": "价目表名称"
          },
          {
            "field": "currencyName",
            "dataType": "String",
            "title": "缺省币种"
          },
          {
            "field": "unitType",
            "dataType": "String",
            "title": "默认计量单位",
            "renderType": "unitRender"
          },
          {
            "field": "organizationName",
            "dataType": "String",
            "title": "销售组织"
          },
          {
            "field": "useGoods",
            "dataType": "String",
            "title": "商品因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "useProduct",
            "dataType": "String",
            "title": "产品因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "useBrand",
            "dataType": "String",
            "title": "品牌因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "useGoodsCategory",
            "dataType": "String",
            "title": "商品分类因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "useCustomer",
            "dataType": "String",
            "title": "客户因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "useCustomerCategory",
            "dataType": "String",
            "title": "客户分类因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "useShop",
            "dataType": "String",
            "title": "门店因素",
            "renderType": "enableStatusRender"
          },
          {
            "field": "creator",
            "dataType": "String",
            "title": "创建人",
            "visible": "false"
          },
          {
            "field": "creationTime",
            "dataType": "Datetime",
            "title": "创建时间",
            "visible": "false"
          },
          {
            "field": "modifier",
            "dataType": "String",
            "title": "修改人",
            "visible": "false"
          },
          {
            "field": "modifiedTime",
            "dataType": "Datetime",
            "title": "修改时间",
            "visible": "false"
          },
          {
            "field": "operation",
            "dataType": "String",
            "title": "操作",
            "renderType": "operation",
            "fixed": true,
            "width": "100px"
          },
        ]
      },
      grid2: {
        domid: "grid_complexItem_dom",
        umeta: {
          "id": "grid_complexItem",
          "data": "complexItems",
          "type": "grid",
          "editable": true,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [
          {
            "field": "priceItemCode",
            "dataType": "String",
            "title": "价格项编码",
            "editable": false,
            "required": true
          },
          {
            "field": "priceItemName",
            "dataType": "String",
            "title": "价格项名称",
            "editable": false,
            "required": true
          },
          {
            "field": "isSelected",
            "dataType": "String",
            "title": "选中",
            "editable": true,
            "required": true,
            "renderType":"booleanRender"
          },
          {
            "field": "isModify",
            "dataType": "String",
            "title": "是否可手工修改价格",
            "editable": true,
            // "required": true,
            "renderType":"booleanRender"
          },
          // {
          //   "field": "num",
          //   "dataType": "String",
          //   "title": "数量",
          //   "editType": "float",
          //   "required": true,
          //   "editOptions": {
          //     "validType": "float",
          //     "precision": "0",
          //     "min": 1
          //   }
          // },
        ]
      },
      grid3: {
        domid: "grid_democomplexItem2_dom",
        umeta: {
          "id": "grid_democomplexItem2",
          "data": "complexItems",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [
          {
            "field": "priceItemCode",
            "dataType": "String",
            "title": "价格项编码",
            "editable": true,
            "required": true
          },
          {
            "field": "priceItemName",
            "dataType": "String",
            "title": "价格项名称",
            "editable": true,
            "required": true
          },
          {
            "field": "isSelected",
            "dataType": "String",
            "title": "选中",
            "editable": true,
            "required": true,
            "renderType":"disableBooleanRender"
          },
          {
            "field": "isModify",
            "dataType": "String",
            "title": "是否可手工修改价格",
            "editable": true,
            "required": true,
            "renderType":"disableBooleanRender"
          },
        ]
      },
    }
  }
  return new basemodel(model);
})
