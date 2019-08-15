define(["ocm_basemodel"], function(basemodel) {
  var model = {
    metas: {
      depotdistrict: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.RoutePackageDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          customerId: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['customer']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"经销商名称"}'
          }, //经销商
          customerCode: {
            type: 'string',
            required: true
          }, //经销商编码
          customerName: {
            type: 'string',
          }, //经销商名称
          routePackageId: {
            type: "string",
            required: true,
            "refmodel": JSON.stringify(refinfo['agencyproductgroup']),
            "refcfg": '{"ctx":"/uitemplate_web","refName":"经销商产品组"}'
          }, //经销商产品组
          routePackageCode: {
            type: 'string',
          }, //经销商产品组编码
          routePackageName: {
            type: 'string',
          }, //经销商产品组名称
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
      districtItem: {
        params: {
          "cls": "com.yonyou.ocm.prom.service.dto.RoutePackageDetailDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //idp
          coverageId: {
            type: 'string',
            required: true
          }, //仓库区域主键
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
      // 分配组织穿梭框的数据
      ItemRef: {
        meta: {
          productref: {
            type: 'string',
            "refmodel": JSON.stringify(refinfo['product_category']),
            "refcfg": '{"ctx":"/uitemplate_web","isMultiSelectedEnabled":true}',
            'refparam': '{"EQ_isSaleProduct":"1","EQ_isEnable":"1"}'
          }
        }
      },
      AdministrativeDivisionmeta: {
        params: {
          "cls": "com.yonyou.ocm.base.service.dto.AdminiDiviDto"
        },
        meta: {
          id: {
            type: 'string'
          }, //id
          code: {
            type: 'string',
            required: true,
            "maxLength": 20,
            errorMsg: "最大长度20字符"
          }, //编码
          fullName: {
            type: 'string',
            required: true
          }, //全称
          name: {
            type: 'string',
            required: true
          }, //简称
          parentId: {
            type: 'string'
          }, //上级ID
          parentCode: {
            type: 'string'
          }, //上级
          parentName: {
            type: 'string'
          }, //上级
          countryId: {
            type: 'string',
            required: true
          },
          countryName: {
            type: 'string'
          },
          // shortname: { type: 'string' },//简称
          postcode: {
            type: 'string',
            regExp: '/^[0-9]{6}$/',
            errorMsg: '邮政编码格式不正确'
          }, //邮编
          isEnable: {
            type: 'string',
            default: 1
          },
          areaLevel: {
            type: 'integer'
          }, //市场区域级别
        },
        pageSize: 100,
        //是否启用前端缓存
        // pageCache: true，
      }
    },
    searchs: {
      search1: [{
        type: "text",
        key: "customerCode",
        label: "经销商编码",
      }, {
        type: "refer",
        key: "targetId",
        label: "经销商名称",
        refinfo: "customer",
      }, {
        type: "refer",
        key: "routePackage--id",
        label: "经销商产品组",
        refinfo: "agencyproductgroup",
        // disableFilter: true, //不传默认的参数
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
        // }, {
        //   key: "refresh",
        //   label: "刷新",
        //   iconCls: "icon-tubiao-huangou",
        //   click: "refresh"
      }],
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
        click: "showAddItems"
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
      button5: [{
        key: "cancel",
        label: "取消",
        click: "cancelBill"
      }, {
        key: "save",
        label: "保存",
        click: "saveAsign",
        cls: "ui-btn-green"
      }],
    },
    cards: {
      card1: [{
        type: "text",
        key: "customerCode",
        label: "经销商编码",
        enable: false
      }, {
        type: "refer",
        key: "customerId",
        label: "经销商名称",
        refinfo: "customer",
      }, {
        type: "refer",
        key: "routePackageId",
        label: "经销商产品组",
        refinfo: "agencyproductgroup",
        disableFilter: true, //不传默认的参数
      }, ]
    },
    details: {
      detail1: [{
        key: "customerCode",
        label: "经销商编码",
      }, {
        key: "customerName",
        label: "经销商名称",
      }, {
        key: "routePackageName",
        label: "经销商产品组",
      }, ]
    },
    grids: {
      grid1: {
        domid: "grid_depotdistrictList_dom",
        umeta: {
          "id": "grid_depotdistrictList",
          "data": "depotDistrictList",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true,
          "onBeforeClickFun": "detail"
        },
        columns: [{
          "field": "customerCode",
          "dataType": "String",
          "title": "经销商编码",
        }, {
          "field": "customerName",
          "dataType": "String",
          "title": "经销商名称"
        }, {
          "field": "routePackageName",
          "dataType": "String",
          "title": "经销商产品组",
        }, {
          "field": "operation",
          "dataType": "String",
          "title": "操作",
          "renderType": "operation",
          "fixed": true,
        }, ]
      },
      grid2: {
        domid: "grid_districtItem_dom",
        umeta: {
          "id": "grid_districtItem",
          "data": "districtItem",
          "type": "grid",
          "editable": false,
          "multiSelect": true,
          "showNumCol": true
        },
        columns: [{
          "field": "provinceName",
          "dataType": "String",
          "title": "省",
        }, {
          "field": "cityName",
          "dataType": "String",
          "title": "市",
        }, {
          "field": "districtName",
          "dataType": "String",
          "title": "区/县",
        }, {
          "field": "townName",
          "dataType": "String",
          "title": "镇/街道",
        }]
      },
      grid3: {
        domid: "grid_districtDetail_dom",
        umeta: {
          "id": "grid_districtDetail",
          "data": "districtItem",
          "type": "grid",
          "editable": false,
          "multiSelect": false,
          "showNumCol": true
        },
        columns: [{
          "field": "provinceName",
          "dataType": "String",
          "title": "省",
        }, {
          "field": "cityName",
          "dataType": "String",
          "title": "市",
        }, {
          "field": "districtName",
          "dataType": "String",
          "title": "区/县",
        }, {
          "field": "townName",
          "dataType": "String",
          "title": "镇/街道",
        }]
      },
    }
  }
  return new basemodel(model);
})