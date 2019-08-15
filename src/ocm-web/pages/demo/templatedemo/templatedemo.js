define(['text!./templatedemo.html', 'ocm_common', 'searchbox', 'ocm_baseview', 'handlebars', 'ocm_dynamicTemplate', './meta.js', 'ocm_global', 'ajaxfileupload', 'ossupload', 'interfaceFileImpl'],
  function (tpl, common, searchbox, baseview, Handlebars, DynamicTemplate) {
    'use strict'
    var baseData, events, rendertype, viewModel, dialog, comboSrc;

    baseData = {
      ParentDt: new u.DataTable(),
      Child1Dt: new u.DataTable(),  //主子结构-子
      Child1ParentDt: new u.DataTable(),  //子孙结构 => 主子结构，子作为主，孙作为子
      Grand1Dt: new u.DataTable(),
    };

    rendertype = {

    };
    events = {
      showAddTemplate: function() {
        viewModel.editTemplate.getPage({
          matchParam: {},
          billStatus: CONST.BILLPANELSTATUS.ADD,
          success: function(pageEle) {
            var parentAddRow = viewModel.ParentDt.createEmptyRow();
            viewModel.ParentDt.setRowFocus(parentAddRow);
            viewModel.templateWrap.innerHTML = '';
            viewModel.templateWrap.appendChild(pageEle);
          }
        })
      },
      showEditTemplate: function() {
        viewModel.editTemplate.getPage({
          matchParam: {},
          billStatus: CONST.BILLPANELSTATUS.EDIT,
          success: function(pageEle) {
            var parentAddRow = viewModel.ParentDt.createEmptyRow();
            viewModel.ParentDt.setRowFocus(parentAddRow);
            parentAddRow.setSimpleData({
                textField: "文本",
                dateField: +new Date(),
                booleanField: "1",
                comboField: "1",
                docreferField: "67a88e95-3f33-4995-9e46-826773dedb26",  //付费陈列: 地推
                referField: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //上级客户: 梦荷溏
            });
            viewModel.Child1Dt.setSimpleData([
              {
                textField: "文本",
                dateField: +new Date(),
                booleanField: "1",
                comboField: "1",
                docreferField: "67a88e95-3f33-4995-9e46-826773dedb26",  //付费陈列: 地推
                referField: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //上级客户: 梦荷溏
              }
            ]);
            viewModel.editTemplate.updateExtendData();
            viewModel.templateWrap.innerHTML = '';
            viewModel.templateWrap.appendChild(pageEle);
          }
        })
      },
      showDetailTemplate: function() {
        viewModel.detailTemplate.getPage({
          matchParam: {
            busiObject: "applyBase",
            templateType: "pc-detail",
            busiCatalog: "applyBase",
            busiType: "da38cb4c-12d2-4282-913b-c285ca47dd75",
          },
          success: function(pageEle) {
            // viewModel.setParentChildTestdata();
            viewModel.setParentChildActdata();
            viewModel.detailTemplate.updateExtendData();
            viewModel.templateWrap.innerHTML = '';
            viewModel.templateWrap.appendChild(pageEle);
          }
        })
      },
      //设置主子测试数据
      setParentChildTestdata: function() {
        var parentAddRow = viewModel.ParentDt.createEmptyRow();
        viewModel.ParentDt.setRowFocus(parentAddRow);
        parentAddRow.setSimpleData({
            textField: "文本",
            dateField: +new Date(),
            booleanField: "1",
            comboField: "1",
            imageField: "/g1/M00/00/06/Cg8AyFxzg6GAasJwAAAp9LXVEeY432.jpg,/g1/M00/00/06/Cg8AyFxzg6GAasJwAAAp9LXVEeY432.jpg",
            docreferField: "67a88e95-3f33-4995-9e46-826773dedb26",  //付费陈列: 地推
            referField: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //上级客户: 梦荷溏
        });
        viewModel.Child1Dt.setSimpleData([
          {
            textField: "文本",
            dateField: +new Date(),
            booleanField: "1",
            comboField: "1",
            docreferField: "67a88e95-3f33-4995-9e46-826773dedb26",  //付费陈列: 地推
            referField: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //上级客户: 梦荷溏
          }
        ]);
      },
      //设置子孙测试数据
      setChildGrandTestdata: function() {
        var parentAddRow = viewModel.Child1ParentDt.createEmptyRow();
        viewModel.Child1ParentDt.setRowFocus(parentAddRow);
        parentAddRow.setSimpleData({
            textField: "文本",
            dateField: +new Date(),
            booleanField: "1",
            comboField: "1",
            imageField: "/g1/M00/00/06/Cg8AyFxzg6GAasJwAAAp9LXVEeY432.jpg,/g1/M00/00/06/Cg8AyFxzg6GAasJwAAAp9LXVEeY432.jpg",
            docreferField: "67a88e95-3f33-4995-9e46-826773dedb26",  //付费陈列: 地推
            referField: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //上级客户: 梦荷溏
        });
        viewModel.Grand1Dt.setSimpleData([
          {
            textField: "文本",
            dateField: +new Date(),
            booleanField: "1",
            comboField: "1",
            docreferField: "67a88e95-3f33-4995-9e46-826773dedb26",  //付费陈列: 地推
            referField: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //上级客户: 梦荷溏
          }
        ]);
      },
      //设置主子活动方案数据
      setParentChildActdata: function() {
        var parentAddRow = viewModel.ParentDt.createEmptyRow();
        viewModel.ParentDt.setRowFocus(parentAddRow);
        parentAddRow.setSimpleData({
            billCode: "HDFA201903120023",
            beginDate: +new Date(),
            endDate: +new Date(),
            customerId: "82a80d93-173b-4974-bc3f-834a8bd6d4ea", //客户: 梦荷溏
            organizationId: "859f4d01-000d-492e-be78-b24c3632df45", //组织: 四川古蔺郎酒销售有限公司
            place: "北京市海淀区北清路69号用友软件园",
        });
        viewModel.Child1Dt.setSimpleData([
          {
            applyObject: "海底捞中关村分店",
            startDate: +new Date(),
            endDate: +new Date(),
          }
        ]);
      },
      //设置子孙活动方案数据
      setChildGrandActdata: function() {
        var parentAddRow = viewModel.Child1ParentDt.createEmptyRow();
        viewModel.Child1ParentDt.setRowFocus(parentAddRow);
        parentAddRow.setSimpleData({
          applyObject: "海底捞中关村分店",
          startDate: +new Date(),
          endDate: +new Date(),
        });
        viewModel.Grand1Dt.setSimpleData([
          {
            personId: "48b66aed-96dc-42a3-8967-56e924aa1db8", //周乐
          }
        ]);
      },
      child1Detail: function(rowId) {
        console.log("点击child1详情按钮，点击行:", rowId);
        viewModel.child1DetailTemplate.getPage({
          matchParam: {
            busiObject: "applyTerminalSign",
            templateType: "pc-detail",
            busiCatalog: "applyBase",
            busiType: "da38cb4c-12d2-4282-913b-c285ca47dd75",
          },
          success: function(pageEle) {
            // viewModel.setChildGrandTestdata();
            viewModel.setChildGrandActdata();
            viewModel.child1DetailTemplate.updateExtendData();
            viewModel.child1DetailTemplateWrap.innerHTML = '';
            viewModel.child1DetailTemplateWrap.appendChild(pageEle);
            viewModel.child1DetailDialog = u.dialog({
              content: "#child1DetailDialog",
              width: "80%",
            });
          }
        });
      },
    }

    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype, comboSrc);

    function afterRender() {


    }

    function appInit(element, params) {
      ko.cleanNode(element);
      //将模板页渲染到页面上
      element.innerHTML = tpl;
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      viewModel.app = u.createApp({
        el: element,
        model: viewModel
      });
      viewModel.templateWrap = document.getElementById('templateWrap');
      viewModel.child1DetailTemplateWrap = document.getElementById('child1DetailTemplateWrap');
      //创建编辑模板实例
      viewModel.editTemplate = new DynamicTemplate.Edit({
        vm: viewModel,
        models: [  //模板中涉及的模型，objectKey为Dto标识，dt为业务vm属性名，对应模型的DataTable
          {
            objectKey: "parent",
            dt: "ParentDt",
          },
          {
            objectKey: "child1",
            dt: "Child1Dt",
          },
        ],
        testdataFlag: "parent",
        dtEvents: function() {  //业务代码在dataTable上注册的事件
          //ui-card省市参照联动
          if(viewModel.ParentDt.getMeta("refer2Field")) {
            viewModel.ParentDt.on('refer2Field.valuechange', function(params) {
              var referId = "ParentDt_refer2LinkageField";
              common.referUtil.addParams(referId, {
                "EQ_parent.id": params.newValue,
              });
            });
          }
          //ui-grid省市参照联动
          if(viewModel.Child1Dt.getMeta("refer2Field")) {
            viewModel.Child1Dt.on('refer2Field.valuechange', function(params) {
              var referId = "Child1Dt_refer2LinkageField_" + params.rowId;
              common.referUtil.addParams(referId, {
                "EQ_parent.id": params.newValue,
              });
            });
          }
        },
      });
      viewModel.editTemplate.setGridOperations([{
        objectKey: "child1",
        btns: [
          {
            showHTML: "<span>详情</span>",
            onClick: "child1Detail",
          }
        ]
      }]);
      //创建主子详情模板实例
      viewModel.detailTemplate = new DynamicTemplate.Detail({
        vm: viewModel,
        models: [
          {
            objectKey: "applyBase",
            dt: "ParentDt",
          },
          {
            objectKey: "applyTerminalSign",
            dt: "Child1Dt",
          },
        ],
        // models: [
        //   {
        //     objectKey: "parent",
        //     dt: "ParentDt",
        //   },
        //   {
        //     objectKey: "child1",
        //     dt: "Child1Dt",
        //   },
        // ],
        // testdataFlag: "parent",
      });
      viewModel.detailTemplate.setGridOperations([{
        // objectKey: "child1",
        objectKey: "applyTerminalSign",
        btns: [
          {
            showHTML: "<span>详情</span>",
            onClick: "child1Detail",
          }
        ]
      }]);
      //创建子孙详情模板实例
      viewModel.child1DetailTemplate = new DynamicTemplate.Detail({
        vm: viewModel,
        models: [
          {
            objectKey: "applyTerminalSign",
            dt: "Child1ParentDt",
          },
          {
            objectKey: "applyTerminalSignPerson",
            dt: "Grand1Dt",
          },
        ],
        // models: [
        //   {
        //     objectKey: "child1",
        //     dt: "Child1ParentDt",
        //   },
        //   {
        //     objectKey: "grand1",
        //     dt: "Grand1Dt",
        //   },
        // ],
        // testdataFlag: "childGrand", //子孙
      });
      afterRender();
     }



    function init(element, params) {
      appInit(element, params);
      window.vm = viewModel;
    }

    return {
      init: init
    }
  });
