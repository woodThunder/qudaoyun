define(["ocm_basemodel"], function(basemodel) {
  'use strict';
  var model = {
    metas: {
      potypemeta: {
        meta: {
          id: {
            type: 'string'
          }, //id
          saleOrgId: {
            required: true,
            refmodel: JSON.stringify(refinfo["organization_ocm"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            refparam: '{"EQ_isEnable":"1","EQ_orgFuncRel":"01"}' //销售组织
          }, //销售组织
          saleOrgName: {
            type: 'string',
            required: true
          }, //销售组织
          agencyId: {
            refmodel: JSON.stringify(refinfo["customer"]),
            refcfg: '{"ctx":"/uitemplate_web"}',
            clientParam: {
              EQ_isChannelCustomer: "1"
            },
            required: true
          }, //经销商
          agencyName: {
            type: 'string',
            required: true
          }, //经销商
          settleRule: {
            type: 'integer',
            required: true
          }, //结算规则
        },
        pageSize: 10,
      }
    },
    buttons: {
      button1: [{
        key: "add",
        label: "新增",
        iconCls: "icon-plus",
        click: "beforeEdit"
      }, {
        key: "del",
        label: "删除",
        iconCls: "icon-shanchu1",
        click: "del"
      }]
    },
    searchs: {
      search1: [{
        type: "text",
        key: "saleOrgId",
        label: "销售组织"
      }, {
        type: "text",
        key: "agencyId",
        label: "经销商",
      }, {
        type: "radio",
        key: "settleRule",
        label: "结算规则",
        dataSource: [{
          value: CONST.DEFAULTOPTION,
          name: '全部'
        }, {
          value: '1',
          name: '启用'
        }, {
          value: '0',
          name: '停用'
        }]
      }]
    },
    dialogs: {
      dialog1: [{
        type: "refer",
        key: "saleOrgId",
        keyfordisplay: "saleOrgName",
        label: "销售组织",
        refinfo: "organization_ocm",
        clientParam: {
          "EQ_isEnable": "1",
          "EQ_orgFuncRel": "01"
        }
      }, {
        type: "refer",
        key: "agencyId",
        keyfordisplay: "agencyName",
        label: "经销商",
        compid: "customerIdBase",
        // enable: false,
        refinfo: "customer",
        clientParam: {
          "EQ_isEnable": "1"
        }
      }, {
        type: "combo",
        key: "settleRule",
        label: "结算规则",
        dataSource: [{
          value: 4,
          name: "回购"
        }, {
          value: 1,
          name: "自营"
        }],
        defaultvalue: 1
      }]
    },
    details: {
      detail: [{
        key: "saleOrgName",
        label: "销售组织",
      }, {
        key: "agencyName",
        label: "经销商",
      }, {
        key: "settleRule",
        label: "结算规则",
        computed: "enableFmt"
      }]
    },
    grids: {
      grid1: {
        domid: "potype",
        umeta: {
          id: "grid_potype",
          data: "simpleList",
          type: "grid",
          editable: false,
          multiSelect: true,
          showNumCol: true,
        },
        columns: [{
          "field": "saleOrgName",
          "dataType": "String",
          "title": "销售组织",
        }, {
          "field": "agencyName",
          "dataType": "String",
          "title": "经销商"
        }, {
          "field": "settleRule",
          "dataType": "Integer",
          "title": "结算规则"
        }, {
          "field": "operation",
          "dataType": "String",
          "title": "操作",
          "renderType": "operation4single",
          "fixed": true,
          "width": "110px"
        }, ]
      }
    }
  };
  return new basemodel(model);
});