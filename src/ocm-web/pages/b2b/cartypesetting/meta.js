define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      poControlRulemeta: {
        meta: {
          truckName: { type: "string", required: true }, //车型名称
          truckCode: { type: "string", required: true }, //车型编码
          truckId: { type: "string", required: true }, //车型id
          stockOrgId: { type: "string", required: true }, //所属库存组织Id
          stockOrgCode: { type: "string", required: true }, //所属库存组织Code
          stockOrgName: { type: "string", required: true }, //所属库存组织Name
          length: { type: "string", required: true }, //车身长度
          loadableWeight: { type: "string", required: true }, //装载重量
          loadableVolume: { type: "string", required: true } //装载体积
        },
        pageSize: 10
        //是否启用前端缓存
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
      ]
    },
    searchs: {
      search1: [
          {
              type: "text",
              key: "truckCode",
              label: "车型编码"
          },
          {
          type: "text",
          key: "truckName",
          label: "车型名称"
        },
        {
          type: "refer",
          key: "stockOrg",
          label: "库存组织",
          refinfo: "organization_ocm",
          clientParam: {"EQ_orgFuncRel":"03"}
        }
        // {
        //   type: "text",
        //   key: "length",
        //   label: "车身长度（米）",
        //   refinfo: "organization_ocm",
        //   clientParam: { EQ_orgFuncRel: "01", EQ_isEnable: "1" }
        // },
        // {
        //   type: "text",
        //   key: "loadableWeight",
        //   label: "载重量（吨）",
        //   refinfo: "organization_ocm",
        //   clientParam: { EQ_orgFuncRel: "01", EQ_isEnable: "1" }
        // },
        // {
        //   type: "text",
        //   key: "loadableVolume",
        //   label: "装载体积（立方米）",
        //   refinfo: "organization_ocm",
        //   clientParam: { EQ_orgFuncRel: "01", EQ_isEnable: "1" }
        // }
      ]
    },
    dialogs: {
      dialog1: [
          {
              type: "text",
              key: "truckCode",
              label: "车型编码"
          },
          {
          type: "text",
          key: "truckName",
          label: "车型名称"
        },
        {
          type: "refer",
          key: "stockOrgId",
          keyfordisplay: "stockOrgName",
          label: "库存组织",
          refinfo: "organization_ocm",
          refparam: {"EQ_orgFuncRel":"03","EQ_isEnable":"1"}
        },
        {
          type: "text",
          key: "length",
          label: "车身长度（米）"
        },
        {
          type: "text",
          key: "loadableWeight",
          label: "可装载重量（吨）"
        },
        {
          type: "text",
          key: "loadableVolume",
          label: "可装载体积（立方米）"
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
                field: "truckCode",
                dataType: "String",
                title: "车型编码"
            },
            {
            field: "truckName",
            dataType: "String",
            title: "车型名称"
          },
          {
            field: "stockOrgName",
            dataType: "String",
            title: "库存组织"
          },
          {
            field: "length",
            dataType: "String",
            title: "车身长度（米）"
          },
          {
            field: "loadableWeight",
            dataType: "String",
            title: "可装载重量（吨）",
            width: "150px"
          },
          {
            field: "loadableVolume",
            dataType: "String",
            title: "可装载体积（立方米）",
            width: "150px"
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
