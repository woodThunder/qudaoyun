define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      poControlRulemeta: {
        meta: {
          id: { type: "string", required: true }, //规则Id
          ruleName: { type: "string", required: true }, //规则Name
          ruleCode: { type: "string", required: true }, //规则Code
          stockOrgId: { 
            type: "string", 
            required: true ,
            refparam: '{"EQ_orgFuncRel":"03"}' // 过滤组织职能 库存
          }, //库存组织
          stockOrgName: { type: "string", required: true }, //库存Name
          stockOrgCode: { type: "string", required: true }, //库存Code
          checkDimension: { type: "string", required: true }, //检查维度
          specialArea: { type: "Integer", required: true } //是否包含特殊区域
        },
        pageSize: 10
      },
      // 规则设置
      ruleSettingmeta: {
        meta: {
          filledTruckRule: { type: "string" }, //满车规则ID
          provinceId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["region"]),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_areaLevel":"1"}',
            required: true
          }, //省

          provinceName: { type: "string" }, //省
          cityId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["region"]),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_areaLevel":"2"}'
          }, //市
          cityName: { type: "string" }, //市
          countyId: {
            type: "string",
            refmodel: JSON.stringify(refinfo["region"]),
            refcfg: '{"ctx":"/uitemplate_web","refCode":""}',
            refparam: '{"EQ_areaLevel":"3"}'
          }, //区/县
          countyName: { type: "string" }, //区/县
          maxLoadableWeight: { type: "string", required: true }, //最大装载重量
          maxLoadableVolume: { type: "string", required: true } //最大装载体积
        },
        pageSize: 10
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
      // 规则设置
      button2: [
        {
          key: "add",
          label: "新增",
          iconCls: "icon-plus",
          click: "addruleFn"
        },
        {
          key: "del",
          label: "删除",
          iconCls: "icon-shanchu1",
          click: "ruledel"
        },
        {
          key: "del",
          label: "返回",
          iconCls: "icon-shanchu1",
          click: "goback"
        }
      ]
    },
    searchs: {
      search1: [
          {
              type: "text",
              key: "ruleCode",
              label: "规则编码"
          },
          {
          type: "text",
          key: "ruleName",
          label: "规则名称"
        },
        {
          type: "refer",
          key: "stockOrg",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam:{"EQ_orgFuncRel":"03","EQ_isEnable": "1"}
        },
        {
          type: "radio",
          key: "checkDimension",
          label: "检查维度",
          dataSource: [
            { value: "2", name: "体积" },
            { value: "1", name: "重量" }
          ]
        },
        {
          type: "radio",
          key: "specialArea",
          label: "是否包含特殊区域",
          dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
        }
      ]
    },
    dialogs: {
      dialog1: [
          {
              type: "text",
              key: "ruleCode",
              label: "规则编码"
          },
          {
          type: "text",
          key: "ruleName",
          label: "规则名称"
        },
        {
          type: "refer",
          key: "stockOrgId",
          label: "库存组织",
          refinfo: "organization_ocm",
          //clientParam: {"EQ_orgFuncRel":03} // 加在这里不生效 
        },
        {
          type: "radio",
          key: "checkDimension",
          label: "检查维度",
          dataSource: [
            { value: "2", name: "体积" },
            { value: "1", name: "重量" }
          ]
        },
        {
          type: "radio",
          key: "specialArea",
          label: "是否包含特殊区域",
          dataSource: [{ value: "1", name: "是" }, { value: "0", name: "否" }]
        }
      ],
      // 规则设置
      dialog2: [
        {
          type: "refer",
          key: "provinceId",
          label: "省"
        },
        {
          type: "refer",
          key: "cityId",
          label: "市",
          domid: "cityIdinfo",
          compid: "cityIdBase"
        },
        {
          type: "refer",
          key: "countyId",
          label: "区",
          domid: "countyIdinfo",
          compid: "countyIdBase"
        },
        {
          type: "text",
          key: "maxLoadableWeight",
          label: "最大载重量（吨）"
        },

        {
          type: "text",
          key: "maxLoadableVolume",
          label: "装载体积（立方米）"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "POControlRule",
        umeta: {
          id: "grid_POControlRule",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
            {
                field: "ruleCode",
                dataType: "String",
                title: "规则编码"
            },
            {
            field: "ruleName",
            dataType: "String",
            title: "规则名称"
          },
          {
            field: "stockOrgName",
            dataType: "Integer",
            title: "库存组织"
          },
          {
            field: "checkDimension",
            dataType: "Integer",
            renderType: "fullcarRender",
            title: "检查维度"
          },
          {
            field: "specialArea",
            dataType: "Integer",
            renderType: "isSpecRender",
            title: "是否包含特殊区域"
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
      // 规则设置
      grid2: {
        domid: "rulesSetting",
        umeta: {
          id: "grid_rulesSetting",
          data: "rulessimpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
          {
            field: "provinceName",
            dataType: "String",
            title: "省"
          },
          {
            field: "cityName",
            dataType: "String",
            title: "市"
          },
          {
            field: "countyName",
            dataType: "Integer",
            title: "区"
          },
          {
            field: "maxLoadableWeight",
            dataType: "Integer",
            title: "允许最大载重量（吨）",
            width: "170px"
          },
          // {
          //   field: "weightUnit",
          //   dataType: "Integer",
          //   title: "重量单位"
          // },
          {
            field: "maxLoadableVolume",
            dataType: "Integer",
            title: "允许最大体积（立方米）"
          },
          // {
          //   field: "volumeUnit",
          //   dataType: "Integer",
          //   title: "体积单位"
          // },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation4spec",
            fixed: true,
            width: "110px"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});
