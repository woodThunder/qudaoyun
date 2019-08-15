define(["ocm_basemodel"], function(basemodel) {
  "use strict";
  var model = {
    metas: {
      bannerheadmeta: {
        params: {
          cls: "com.yonyou.ocm.buyer.service.dto.BannerSettingHDto"
        },
        meta: {
          id: { type: "string" }, //id
          autoPlaySpeed: {
            type: "integer",
            max: 10,
            min: 1,
            required: true,
            default: 3,
            regExp: /^[0-9]+$/,
            errorMsg: "请输入1-10的数字"
          }
        }
      },
      bannermeta: {
        params: {
          cls:
            "com.yonyou.ocm.buyer.service.dto.bannersettings.BannerSettingsDto"
        },
        meta: {
          id: { type: "string" }, //id
          productId: { type: "string", required: true }, //商品主键
          productCode: { type: "string" }, // 商品编码
          productName: { type: "string", required: true }, //商品名称
          isShowOrder: {
            type: "integer",
            max: 100,
            required: true,
            default: "1",
            regExp: /^[0-9]+$/,
            errorMsg: "请输入数字"
          }, //显示顺序
          imgUrl: { type: "string" }, //图片
          isEnable: { type: "integer", default: 1 }, //状态
          creator: { type: "string" },
          creationTime: { type: "datetime" },
          modifier: { type: "string" },
          modifiedTime: { type: "datetime" }
        },
        pageSize: 10
        //启用前端缓存
        // pageCache: true
      },
      FileMeta: {
        meta: {
          id: { type: "string" }, //主键
          filepath: { type: "string" }, //文件名称
          filesize: { type: "string" }, //文件大小
          filename: { type: "string" }, //文件名称
          uploadtime: { type: "datetime" }, //上传时间
          groupname: { type: "string" }, //
          url: { type: "string" } //URL
        }
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
        },
        {
          key: "enable",
          label: "启用",
          iconCls: "icon-qiyong",
          click: "enable"
        },
        {
          key: "disable",
          label: "停用",
          iconCls: "icon-tingyong",
          click: "disable"
        }
      ]
    },
    searchs: {
      search1: [
        {
          type: "text",
          key: "productCode",
          label: "商品编码"
        },
        {
          type: "text",
          key: "productName",
          label: "商品名称"
        },
        {
          type: "radio",
          key: "isEnable",
          label: "启用状态",
          defaultvalue: "1",
          dataSource: [
            { value: "", name: "全部" },
            { value: "1", name: "启用" },
            { value: "0", name: "停用" }
          ]
        }
      ]
    },
    dialogs: {
      dialog1: [
        {
          type: "refer",
          key: "productId",
          label: "商品编码",
          refinfo: "goods",
          referId: "productId",
          isReturnCode: true
        },
        {
          type: "text",
          key: "productCode",
          label: "商品编码",
          cls: "hidden"
        },
        {
          type: "text",
          key: "productName",
          label: "商品名称",
          enable: false
        },
        {
          type: "text",
          key: "isShowOrder",
          label: "显示顺序"
        },
        {
          type: "label",
          key: "isEnable",
          label: "启用状态"
        }
      ]
    },
    grids: {
      grid1: {
        domid: "grid_banner_dom",
        umeta: {
          id: "grid_banner",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true
        },
        columns: [
          {
            field: "picshwo",
            dataType: "String",
            title: "图片预览",
            renderType: "picShowList",
            width: "150px"
          },
          {
            field: "productCode",
            dataType: "String",
            title: "商品编码"
          },
          {
            field: "productName",
            dataType: "String",
            title: "商品名称"
          },
          {
            field: "isShowOrder",
            dataType: "integer",
            title: "显示顺序"
          },
          {
            field: "isEnable",
            dataType: "String",
            title: "启用状态",
            renderType: "enableRender"
          },
          {
            field: "creator",
            dataType: "String",
            title: "创建人"
          },
          {
            field: "creationTime",
            dataType: "Date",
            title: "创建时间"
          },
          {
            field: "modifier",
            dataType: "String",
            title: "修改人"
          },
          {
            field: "modifiedTime",
            dataType: "Date",
            title: "修改时间"
          },
          {
            field: "photoService",
            dataType: "String",
            title: "图片维护",
            renderType: "picUploadList",
            fixed: true,
            width: "110px"
          },
          {
            field: "operation",
            dataType: "String",
            title: "操作",
            renderType: "operation4single",
            fixed: true,
            width: "150px"
          }
        ]
      }
    }
  };
  return new basemodel(model);
});
