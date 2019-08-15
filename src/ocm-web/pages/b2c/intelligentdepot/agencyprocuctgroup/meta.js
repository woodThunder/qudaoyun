define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      depotproduct: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.RoutePackageDto"
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
          brandId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['brand']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
          }, //品牌
          brandCode: {
            type: 'string',
            required: true
          }, //品牌编码
          brandName: {
            type: 'string',
            required: true
          }, //品牌名称
          dr: {
            type: 'string'
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
        pageSize: 10,
        //是否启用前端缓存
        // pageCache: true
      },
      productcateItem: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.RoutePackageDetailDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //idp
          packageId: {
            type: 'string',
            required: true
          }, //产品组主键
          categoryId: {
            type: 'string',
            required: true
          }, //商品分类
          categoryCode: {
            type: 'string',
            required: true
          }, //商品分类编码
          categoryName: {
            type: 'string',
            // 'refmodel':JSON.stringify(refinfo['productInfo']),
            // 'refcfg':'{"ctx":"/uitemplate_web"}',
            // 'refparam':'{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }, //商品分类名称
          dr: {
            type: 'string'
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
        pageSize: 10,
      },
      ItemRef: {
        meta: {
          goodscatref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['goodsCategory']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"所属分类","isMultiSelectedEnabled":true}'
          }
        }
      }
    },
    searchs: {
      search1: [{
        type: "text",
        key: "code",
        label: "编码",
      }, {
        type: "text",
        key: "name",
        label: "名称",
      }, {
        type: "text",
        key: "brandCode",
        label: "品牌编码",
      }, {
        type: "refer",
        key: "brand",
        label: "品牌名称",
        refinfo: "brand",
        refName: "品牌",
      }]
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
        },
        // {
        //   key: "refresh",
        //   label: "刷新",
        //   iconCls: "icon-tubiao-huangou",
        //   click: "refresh"
        // }
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
        label: "编码",
        disableInEdit: true
      }, {
        type: "text",
        key: "name",
        label: "名称",
      }, {
        type: "text",
        key: "brandCode",
        label: "品牌编码",
        enable: false
      }, {
        type: "refer",
        key: "brandId",
        label: "品牌名称",
        refinfo: "brand",
        refName: "品牌",
      }]
    },
    details: {
      detail1: [{
          key: "code",
          label: "编码",
        }, {
          key: "name",
          label: "名称",
        }, {
          key: "brandCode",
          label: "品牌编码"
        }, {
          key: "brandName",
          label: "品牌名称"
        }
        // {
        //   key: "enableStatus",
        //   label: "启用状态",
        //   computed: "enableFmt"
        // }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_depotproduct_dom",
        umeta: {
          "id": "grid_depotproduct",
          "data": "depotProductList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeClickFun": "detail"
        },
        columns: [{
          "field": "code",
          "dataType": "String",
          "title": "编码",
        }, {
          "field": "name",
          "dataType": "String",
          "title": "名称"
        }, {
          "field": "brandCode",
          "dataType": "String",
          "title": "品牌编码",
        }, {
          "field": "brandName",
          "dataType": "String",
          "title": "品牌名称"
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
        domid: "grid_depotproductItem_dom",
        umeta: {
          "id": "grid_depotproductItem",
          "data": "productCateItem",
          "type": "grid",
          "editable": true,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "categoryCode",
          "dataType": "String",
          "title": "分类编码",
          "editable": false,
          "required": true
        }, {
          "field": "categoryName",
          "dataType": "String",
          "title": "销售产品名称",
          "editable": false
        }]
      },
      grid3: {
        domid: "grid_democomplexItem2_dom",
        umeta: {
          "id": "grid_democomplexItem2",
          "data": "productCateItem",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "categoryCode",
          "dataType": "String",
          "title": "分类编码",
          "editable": false,
          "required": true
        }, {
          "field": "categoryName",
          "dataType": "String",
          "title": "销售产品名称",
          "editable": false
        }]
      },
    }
  }
  return new basemodel(model);
})