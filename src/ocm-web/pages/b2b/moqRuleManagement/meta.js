define(["ocm_basemodel"], function(basemodel) {
    "use strict";
    var model = {
      metas: {
        moqRuleControlmeta: {
          meta: {
            code: { type: "string", required: true }, //规则编码
            name: { type: "string", required: true }, //规则名称
            linkOrgs: { type: "string" },
            linkOrgsId: {
              type: "string",
              required: true,
              refmodel: JSON.stringify(refinfo["organization_ocm-muliti"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
              refparam: '{"EQ_orgFuncRel":"03","EQ_isEnable":"1"}'
            }, //库存组织
            linkOrgsCode: { type: "string" }, //库存组织
            linkOrgsName: { type: "string" }, //库存组织
            limitType: { type: "string" }, //整单限制方式
            limitTypeRow: { type: "string" }, //订单行限制方式
            ruleType: { type: "string", required: true }, //  规则生效方式
            linkCustomers: { type: "string" },
            linkCustomersId: {
              type: "string",
              required: true,
              refmodel: JSON.stringify(refinfo["customer-muliti"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}'
            }, //适用客户
            linkCustomersCode: { type: "string" }, //适用客户
            linkCustomersName: { type: "string" } //适用客户
          },
          params: {
            dialogcardUseDynamicRequired: true
          },
          pageSize: 10
          //启用前端缓存
          // pageCache: true
        },
        allRulemeta: {
          params: {
            cls:
              "com.yonyou.occ.dispatch.service.dto.B2BResourceScheduleConfigurationDto"
          },
          meta: {
            id: { type: "string" },
            effectiveDate: { type: "datetime", required: true }, //起效日期
            expirationDate: { type: "datetime", required: true }, //失效日期
  
            priority: { type: "integer", required: true }, //权重
            provinceId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["region"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
              refparam: '{"EQ_areaLevel":"1","EQ_isEnable":"1"}'
            }, //所在省份ID
            provinceName: { type: "string" }, //所在省份名称
            provinceCode: { type: "string" }, //所在省份名称
            cityId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["region"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
              refparam: '{"EQ_areaLevel":"2","EQ_isEnable":"1"}'
            }, //所在城市ID
            cityName: { type: "string" }, //所在城市名称
            cityCode: { type: "string" },
            countyId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["region"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
              refparam: '{"EQ_areaLevel":"3","EQ_isEnable":"1"}'
            }, //所在区
            countyName: { type: "string" }, //所在区名称
            countyCode: { type: "string" },
            quantity: { type: "float" }, //订货数量
            weight: { type: "float" }, //订货重量
            volume: { type: "float" } //订货体积
          },
          pageSize: 10
          //启用前端缓存
          // pageCache: true
        },
        rowRulemeta: {
          params: {
            cls:
              "com.yonyou.occ.dispatch.service.dto.B2BResourceScheduleConfigurationDto"
          },
          meta: {
            id: { type: "string" },
            //商品主键
            goodsId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["goods"]),
              refcfg: '{"ctx":"/uitemplate_web"}',
              refparam: '{"EQ_isEnable":"1"}'
            },
            goodsName: { type: "string" },
            goodsCode: { type: "string" },
            //产品主键
            productId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["product"]),
              refcfg: '{"ctx":"/uitemplate_web"}',
              refparam: '{"EQ_isEnable":"1"}'
            },
            productName: { type: "string" },
            productCode: { type: "string" },
            //分类主键
            goodsCategoryId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["goodsCategory"]),
              refcfg: '{"ctx":"/uitemplate_web"}',
              refparam: '{"EQ_isEnable":"1"}'
            },
            goodsCategoryName: { type: "string" },
            goodsCategoryCode: { type: "string" },
  
            // 研发系列
            developSeriesId: {
              type: "string",
              required: true,
              refmodel: JSON.stringify(refinfo["productRadSeries"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
              refparam: '{"EQ_isEnable":"1"}'
            },
            developSeriesCode: { type: "string" },
            developSeriesName: { type: "string" },
            //  销售系列
            saleSeriesId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["productSaleSeries"]),
              refcfg: '{"ctx":"/uitemplate_web","refCode":""}'
            },
            saleSeriesName: { type: "string" },
            saleSeriesCode: { type: "string" },
            // 产品线
            productLineId: {
              type: "string",
              refmodel: JSON.stringify(refinfo["productLine"]),
              refcfg:
                '{"ctx":"/uitemplate_web","refName":"产品线","isMultiSelectedEnabled":true}',
              refparam: '{"EQ_isEnable": "1"}',
              required: true
            },
            productLineCode: { type: "string" },
            productLineName: { type: "string" },
            // 品牌
            brandId: {
              refmodel: JSON.stringify(refinfo["brand"]),
              refcfg: '{"ctx":"/uitemplate_web"}'
            },
            brandCode: { type: "string" }, // 商品编码
            brandName: { type: "string" }, // 商品名称
            // 商品组合
            productCombineId: {
              //商品组合
              type: "string",
              required: true,
              refmodel: JSON.stringify(refinfo["Combination"]),
              refcfg: '{"ctx":"/uitemplate_web"}',
              refparam: '{"EQ_isEnable":"1"}'
            },
            productCombineCode: { type: "string" },
            productCombineName: { type: "string" },
  
            specification: { type: "string" }, //规格
            model: { type: "string" }, //  型号
  
            isExclude: { type: "redio", default: "0" }, //是否排除
            quantity: { type: "float" }, //订货数量
            weight: { type: "float" }, //订货重量
            volume: { type: "float" } //订货体积
          },
          pageSize: 10
          //启用前端缓存
          // pageCache: true
        }
      },
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
          }
        ],
        button2: [
          {
            key: "return",
            label: "返回",
            cls: "ui-btn-green",
            click: "backPanel"
          }
        ],
        button3: [
          {
            key: "cancel",
            label: "取消",
            click: "backPanel",
            iconCls: "icon-tubiao-guanbi-anxing"
          }
        ],
        button4: [
          {
            key: "addRow",
            label: "增行",
            click: "addRow",
            cls: "ui-btn-orange",
            clickArg: "allRuleList",
            iconCls: "icon-plus"
          },
          {
            key: "delRow",
            label: "删行",
            click: "delRow",
            clickArg: "allRuleList",
            iconCls: "icon-shanchu1"
          },
          {
            key: "save",
            label: "保存",
            click: "saveAllRuleHandle",
            iconCls: "icon-tubiao-baocun"
          }
        ],
        button5: [
          {
            key: "addRow",
            label: "增行",
            click: "addRow",
            cls: "ui-btn-orange",
            clickArg: "rowRuleList",
            iconCls: "icon-plus"
          },
          {
            key: "delRow",
            label: "删行",
            click: "delRow",
            clickArg: "rowRuleList",
            iconCls: "icon-shanchu1"
          },
          {
            key: "save",
            label: "保存",
            click: "saveRowRuleHandle",
            iconCls: "icon-tubiao-baocun"
          }
        ]
      },
      searchs: {
        search1: [
          {
            type: "text",
            key: "code",
            label: "规则编码"
          },
          {
            type: "text",
            key: "name",
            label: "规则名称"
          },
          {
            type: "refer",
            key: "linkOrgs--stockOrg",
            label: "库存组织",
            refinfo: "organization_ocm",
            clientParam: {
              EQ_orgFuncRel: "03",
              EQ_isEnable: "1"
            }
          },
          {
            type: "refer",
            key: "linkCustomers--customer",
            label: "适用客户",
            refinfo: "customer"
          }
        ]
      },
      dialogs: {
        dialog1: [
          {
            type: "text",
            key: "code",
            label: "规则编码"
          },
          {
            type: "text",
            key: "name",
            label: "规则名称"
          },
          {
            type: "refer",
            key: "linkOrgsId",
            label: "库存组织",
            refinfo: "organization_ocm-muliti",
            clientParam: {
              EQ_orgFuncRel: "03",
              EQ_isEnable: "1"
            }
          },
          {
            type: "refer",
            key: "linkCustomersId",
            label: "适用客户",
            refinfo: "customer-muliti"
          },
          {
            type: "combo",
            key: "ruleType",
            required: true,
            label: "规则生效方式",
            dataSource: [
              { value: "1", name: "仅整单" },
              { value: "2", name: "仅单行" },
              { value: "3", name: "单行或整单" },
              { value: "4", name: "单行且整单" }
            ],
            fn: {
              after: function(data) {
                if (data.newValue == 1) {
                  data.row.setMeta("limitType", "enable", true);
                  data.row.setMeta("limitTypeRow", "enable", false);
                  data.row.setValue("limitTypeRow", "");
                } else if (data.newValue == 2) {
                  data.row.setMeta("limitType", "enable", false);
                  data.row.setMeta("limitTypeRow", "enable", true);
                  data.row.setValue("limitType", "");
                } else {
                  data.row.setMeta("limitType", "enable", true);
                  data.row.setMeta("limitTypeRow", "enable", true);
                }
              }
            }
          },
          {
            type: "combo",
            key: "limitType",
            label: "整单限制类型",
            required: true,
            dataSource: [
              { value: "1", name: "数量" },
              { value: "2", name: "重量" },
              { value: "3", name: "体积" }
            ]
          },
          {
            type: "combo",
            key: "limitTypeRow",
            label: "单行限制类型",
            required: true,
            dataSource: [
              { value: "1", name: "数量" },
              { value: "2", name: "重量" },
              { value: "3", name: "体积" }
            ]
          }
        ]
      },
      grids: {
        grid1: {
          domid: "moqRuleCOntrol",
          umeta: {
            id: "grid_moqRuleCOntrol",
            data: "simpleList",
            type: "grid",
            editable: false,
            multiSelect: true,
            showNumCol: true
          },
          columns: [
            {
              field: "code",
              dataType: "String",
              title: "规则编码"
            },
            {
              field: "name",
              dataType: "String",
              title: "规则名称"
            },
            {
              field: "ruleType",
              dataType: "String",
              title: "规则生效方式",
              renderType: "ruleTypeRender"
            },
            // {
            //   field: "limitType",
            //   dataType: "String",
            //   title: "限制类型",
            //   renderType: "limitTypeRender"
            // },
            {
              field: "linkOrgsName",
              dataType: "String",
              title: "库存组织"
            },
            {
              field: "linkCustomersName",
              dataType: "String",
              title: "适用客户"
            },
            {
              field: "allRule",
              dataType: "String",
              title: "整单规则",
              renderType: "allOperationAllRule",
              width: "110px"
            },
            {
              field: "jobRule",
              dataType: "String",
              title: "单行规则",
              renderType: "operationAllRule",
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
        },
        grid2: {
          domid: "moqControlRuleItem",
          umeta: {
            id: "grid_moqControlRuleItem",
            data: "allRuleList",
            type: "grid",
            editable: true,
            multiSelect: true,
            showNumCol: true,
            onBeforeEditFun: "beforeEditCheck"
          },
          columns: [
            {
              field: "effectiveDate",
              title: "起效日期",
              required: true,
              dataType: "Date",
              editType: "date"
            },
            {
              field: "expirationDate",
              title: "失效日期",
              required: true,
              dataType: "Date",
              editType: "date"
            },
            {
              field: "priority",
              required: true,
              title: "权重",
              dataType: "Integer"
            },
            {
              field: "provinceId",
              dataType: "String",
              title: "省",
              renderType: "ncReferRender",
              editType: "ncReferEditType",
              editOptions: {
                validType: "string",
                rel: {
                  refname: "provinceName"
                }
              },
              showField: "provinceName"
            },
            {
              field: "cityId",
              dataType: "String",
              title: "市",
              renderType: "ncReferRender",
              editType: "ncReferEditType",
              editOptions: {
                validType: "string",
                rel: {
                  refname: "cityName"
                }
              },
              showField: "cityName"
            },
            {
              field: "countyId",
              dataType: "String",
              title: "区",
              renderType: "ncReferRender",
              editType: "ncReferEditType",
              editOptions: {
                validType: "string",
                rel: {
                  refname: "countyName"
                }
              },
              showField: "countyName"
            },
            {
              field: "quantity",
              dataType: "float",
              title: "订货数量",
              editType: "float"
            },
            {
              field: "weight",
              dataType: "float",
              title: "订货重量 KG",
              editType: "float"
            },
            {
              field: "volume",
              dataType: "float",
              title: "订货体积 立方米",
              editType: "float"
            }
          ]
        },
        grid3: {
          domid: "moqControlRuleItem3",
          umeta: {
            id: "grid_moqControlRuleItem3",
            data: "rowRuleList",
            type: "grid",
            editable: true,
            multiSelect: true,
            showNumCol: true
          },
          columns: [
            {
              field: "goodsId",
              dataType: "String",
              title: "商品",
              editType: "ncReferEditType",
              renderType: "ncReferRender",
              editOptions: {
                validType: "string"
              },
              showField: "goodsName"
            },
            {
              field: "goodsCategoryId",
              dataType: "String",
              title: "商品分类",
              editType: "ncReferEditType",
              renderType: "ncReferRender",
              editOptions: {
                validType: "string"
              },
              showField: "goodsCategoryName"
            },
            {
              field: "productId",
              dataType: "String",
              title: "产品",
              editType: "ncReferEditType",
              renderType: "ncReferRender",
              editOptions: {
                validType: "string"
              },
              showField: "productName"
            },
            {
              field: "specification",
              // required: true,
              title: "规格",
              dataType: "string"
            },
            {
              field: "model",
              // required: true,
              title: "型号",
              dataType: "string"
            },
            {
              field: "productLineId",
              dataType: "String",
              title: "产品线",
              editType: "ncReferEditType",
              renderType: "ncReferRender",
              editOptions: {
                validType: "string"
              },
              showField: "productLineName"
            },
            {
              field: "brandId",
              dataType: "String",
              title: "品牌",
              editType: "ncReferEditType",
              renderType: "ncReferRender",
              editOptions: {
                validType: "string"
              },
              showField: "brandName"
            },
            {
              field: "productCombineId",
              dataType: "String",
              title: "商品组合",
              editType: "ncReferEditType",
              renderType: "ncReferRender",
              editOptions: {
                validType: "string"
              },
              showField: "productCombineName"
            },
            {
              field: "isExclude",
              dataType: "checkbox",
              title: "是否排除",
              renderType: "booleanRender"
            },
            {
              field: "quantity",
              dataType: "float",
              title: "订货数量",
              editType: "float"
            },
            {
              field: "weight",
              dataType: "float",
              title: "订货重量(KG)",
              editType: "float"
            },
            {
              field: "volume",
              dataType: "float",
              title: "订货体积(m2)",
              editType: "float"
            }
          ]
        }
      }
    };
    return new basemodel(model);
  });
  