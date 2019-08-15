define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
    metas: {
      purchasepricemeta : {
        meta: {
          purchaseOrgId: {
            type: 'string',
            required:true,
            "refmodel": JSON.stringify(refinfo['organization_ocm']),
            "refcfg":'{"ctx":"/uitemplate_web"}',
            "refparam":'{"EQ_orgFuncRel":"04"}',
          }, //采购组织
          purchaseOrgCode:{type: 'string', required: true},
          purchaseOrgName:{type: 'string', required: true},
        },
        supplierId:{
          type: 'string',
          required:true,
          "refmodel": JSON.stringify(refinfo['suppliers']),
          "refcfg":'{"ctx":"/uitemplate_web"}',
          "refparam":'{}',
        }, //供应商
        supplierName: {type: 'string', required: true}, //供应商Name
        supplierCode: {type: 'string', required: true}, //供应商Code

        supplierTypeCode: {
          type: 'string', required: true,
          "refmodel": JSON.stringify(refinfo['custdocdef']),
          "refcfg": '{"ctx":"/uitemplate_web","refCode":"SUPPLIER_TYPE","refName":"供应商类型"}'
        },//供应商类型code
        supplierTypeName: { type: 'string' },//供应商类型name

        goodsId: {type: 'string',
            "refmodel": JSON.stringify(refinfo['goods']),
            "refcfg": '{"ctx":"/uitemplate_web"}',
            required: true}, //商品
        goodsName: {type: 'string',

        }, //商品名称
        goodsCode: {type: 'string',required: true}, //商品Code

        productName: {type: 'string',required: true}, //产品
        productId: {type: 'string',
          "refmodel": JSON.stringify(refinfo['product']),
          "refcfg": '{"ctx":"/uitemplate_web"}',
        }, //产品名称
        productCode: {type: 'string',required: true}, //产品Code

        goodsTypeId: {type: 'string',required: true}, //商品分类
        goodsTypeName: {type: 'string',
          "refmodel": JSON.stringify(refinfo['goodsCategory']),
          "refcfg": '{"ctx":"/uitemplate_web"}'}, //商品分类
        goodsTypeCode: {type: 'string',required: true}, //商品分类
        purchasePrice: {type: 'float',required: true},  //采购价格

        priceEffectTime: {type: 'string', required: true}, //价格生效时间
        priceInvalidTime: {type: 'string', required: true}, //价格失效时间

        pageSize: 10,
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
        // {
        //   key: "syn",
        //   label: "同步",
        //   iconCls: "icon-tuihuoshouhou",
        //   click: "syn"
        // },
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
        },
      ]
    },
    searchs: {
      search1: [
        {
          type: "refer",
          key: "purchaseOrg",
          label: "采购组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel":"04"
          },
        },
        {
          type: "refer",
          key: "supplier",
          label: "供应商",
          refinfo: "suppliers",
        },
        {
          type: "combo",
          key: "supplierType",
          label: "供应商类型",
          url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=SUPPLIER_TYPE",
          namefield: "name",
          valuefield: "code"
        },
        {
          type: "refer",
          key: "goods",
          label: "商品",
          refinfo: "goods",
        },
        {
          type: "refer",
          key: "product",
          label: "产品",
          refinfo: "product",
        },
        {
          type: "refer",
          key: "goodsType",
          label: "商品分类",
          refinfo: "goodsCategory",
        },
        {
          type: "float",
          key: "purchasePrice",
          label: "采购价格",
        },
        {
          key: "priceEffectTime",
          type: "daterange",
          label: "价格生效时间",
        },
        {
          key: "priceInvalidTime",
          type: "daterange",
          label: "价格失效时间",
        },
      ]
    },
    dialogs: {
      dialog1: [
        {
          type: "refer",
          key: "purchaseOrgId",
          label: "采购组织",
          refinfo: "organization_ocm",
          clientParam: {
            "EQ_orgFuncRel":"04"
          },
          required:true
        },
        {
          type: "refer",
          key: "supplierId",
          label: "供应商",
          refinfo: "suppliers",
          referId:"supplierRef",
          required:true
        },
        {
          type: "combo",
          key: "supplierType",
          label: "供应商类型",
          url: window.pathMap.base + "/cust-doc-defs/cust_doc_code?cust_doc_code=SUPPLIER_TYPE",
          namefield: "name",
          valuefield: "code",
          enable:false
        },
        {
          type: "refer",
          key: "goodsId",
          label: "商品",
          refinfo: "goods",
          referId: "goodsId",
          domId: "goodsId",
            clientParam: {
                "EQ_isEnable":"1",
                "EQ_enableStrucManage":"0",
                "EQ_isServiceType":"0"
            },
        },
        {
          type: "refer",
          key: "productId",
          label: "产品",
          refinfo: "product",
          clientParam: {
          },
          referId: "productId",
          domId: "productId",
        },
        {
          type: "refer",
          key: "goodsTypeId",
          label: "商品分类",
          refinfo: "goodsCategory",
          referId: "goodsTypeId",
          domId: "goodsTypeId",
        },
        {
          type: "number",
          key: "purchasePrice",
          label: "采购价格",
          required:true
        },
        {
          key: "priceEffectTime",
          type: "date",
          label: "价格生效时间",
          required:true
        },
        {
          key: "priceInvalidTime",
          type: "date",
          label: "价格失效时间",
          disabledDate:"disabledEnd"
        },
      ]
    },
    grids: {
      grid1: {
        domid: "purchaseprice",
        umeta: {
          id: "grid_purchaseprice",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [
          {
          field: "purchaseOrgName",
          dataType: "String",
          title: "采购组织",
          },
          {
            field: "supplierName",
            dataType: "String",
            title: "供应商",
          },
          {
            field: "supplierType",
            dataType: "String",
            title: "供应商类型",
            renderType: "supplierTypeRender",
          },
          {
            field: "goodsName",
            dataType: "String",
            title: "商品",
          },
          {
            field: "productName",
            dataType: "String",
            title: "产品",
          },
          {
            field: "goodsTypeName",
            dataType: "String",
            title: "商品分类",
          },
          {
            field: "purchasePrice",
            dataType: "String",
            title: "采购价格",
          },
          {
            field: "priceEffectTime",
            dataType: "Date",
            title: "价格生效时间",
          },
          {
            field: "priceInvalidTime",
            dataType: "Date",
            title: "价格失效时间",
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
          },
        ]
      }
    }
  };
  return new basemodel(model);
});