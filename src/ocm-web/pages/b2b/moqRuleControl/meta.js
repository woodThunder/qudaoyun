define(["ocm_basemodel"], function (basemodel) {
  'use strict';
  var model = {
      metas: {
          moqRuleManagementmeta: {
              params: {
                  "cls": "com.yonyou.occ.dispatch.service.dto.B2BResourceScheduleConfigurationDto"
              },
              meta: {
                  orderTypeId: {
                      type: 'string',
                      required: true,
                      "refmodel": JSON.stringify(refinfo['billtype']),
                      "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                      refparam: '{"EQ_isEnable":"1","IN_code":"SaleOrder,ReqOrder"}'
                  },//订单类型
                  orderTypeCode: { type: 'string' },//订单类型
                  orderTypeName: { type: 'string' },//订单类型
                  transTypeId: {
                      type: 'string',
                      required: true,
                      "refmodel": JSON.stringify(refinfo['trantype']),
                      "refcfg": '{"ctx":"/uitemplate_web","refCode":""}',
                      "refparam": '{"EQ_isEnable":"1"}',
                  },//交易类型
                  transTypeName: { type: 'string' },//交易类型
                  transTypeCode: { type: 'string' },//交易类型
                  method: { type: 'string', required: true}//控制方式
              },
              pageSize: 10,
              //启用前端缓存
              // pageCache: true
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
          }
          ]
      },
      searchs: {
          search1: [
              {
                  type: "refer",
                  key: "orderType",
                  label: "订单类型",
                  refinfo:"billtype",
                  clientParam: {
                      "IN_code": "SaleOrder,ReqOrder",
                      "EQ_isEnable": "1"
                  },
              },
              {
                  type: "refer",
                  key: "transType",
                  label: "交易类型",
                  refinfo:"trantype"
              },
              {
                  type: "combo",
                  key: "method",
                  label: "控制方式",
                  dataSource: [
                      { value: "1", name: "宽松控制" },
                      { value: "2", name: "严格控制" }
                  ]
              },
          ]
      },
      dialogs: {
          dialog1: [
              {
                  type: "refer",
                  key: "orderTypeId",
                  label: "订单类型",
                  refinfo:"billtype"
              },
              {
                  type: "refer",
                  key: "transTypeId",
                  label: "交易类型",
                  domid:"transTypeIdInfo",
                  refinfo:"transType"
              },
              {
                  type: "combo",
                  key: "method",
                  label: "控制方式",
                  dataSource: [
                      { value: "1", name: "宽松控制" },
                      { value: "2", name: "严格控制" }
                  ]
              },
          ],
      },
      grids: {
          grid1: {
              domid: "supplierschedule",
              umeta: {
                  id: "grid_supplierschedule",
                  data: "simpleList",
                  type: "grid",
                  editable: false,
                  multiSelect: true,
                  showNumCol: true,
              },
              columns: [
                  {
                      field: "orderTypeName",
                      dataType: "String",
                      title: "订单类型"
                  },
                  {
                      field: "transTypeName",
                      dataType: "String",
                      title: "交易类型"
                  },
                  {
                      field: "method",
                      dataType: "String",
                      title: "控制方式",
                      renderType:"methodRender"
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
