define(['text!./busitemplate.html', 'fmcg_common', 'fmcg_baseview', 'fmcg_searchbox', 'viewer', 'handlebars',
'text!./billTpl.html', 'text!./pclistTpl.html',
'./meta.js', 'fmcg_global', 'ajaxfileupload', 'ossupload', 'interfaceFileImpl'],
    function (tpl, common, searchbox, baseview, Viewer, Handlebars, billTpl, pclistTpl) {
        'use strict'
        var baseData, events, rendertype, viewModel, dialog;
        var busiObjectSrc = ko.observableArray([]);
        var templateTypeSrc = ko.observableArray(CONST.TEMPLATETYPE);
        //测试数据
        var templateInitData = {
            "templateData": {
                "head": {
                    "comps": [{
                        "type": "form",
                        "objectKey": "customerParent",
                        "items": [{
                                "label": "客户名称",
                                "type": "text",
                                "key": "customerName",
                                "required": true,
                                "visible": true,
                                "order": 1
                            },
                            {
                                "label": "客户类型",
                                "type": "refer",
                                "key": "customerType",
                                "required": false,
                                "visible": true,
                                "order": 2
                            },
                            {
                                "label": "客户等级",
                                "type": "combo",
                                "key": "customerLevel",
                                "required": false,
                                "visible": true,
                                "order": 3
                            }
                        ]
                    }],
                    visible: true,
                },
                "tabs": [{
                        "tabName": "收货地址",
                        "visible": true,
                        "order": 10,
                        "comps": [{
                            "type": "table",
                            "objectKey": "addressChild",
                            "items": [{
                                    "type": "text",
                                    "label": "收货人",
                                    "key": "person",
                                    "required": true
                                },
                                {
                                    "type": "text",
                                    "label": "收货地址",
                                    "key": "address",
                                    "required": true
                                }
                            ]
                        }]
                    },
                    {
                        "tabName": "联系人",
                        "visible": true,
                        "order": 20,
                        "comps": [{
                            "type": "table",
                            "objectKey": "contactChild",
                            "items": [{
                                    "type": "text",
                                    "label": "联系人姓名",
                                    "key": "contactName",
                                    "required": true
                                },
                                {
                                    "type": "text",
                                    "label": "联系人电话",
                                    "key": "contactPhone",
                                    "required": true
                                }
                            ]
                        }]
                    }
                ]
            },
            "busiObjectProperties": [{
                    "objectKey": "customerParent",
                    "objectName": "客户",
                    "parentObject":"",
                    "properties": [{
                            "key": "customerName",
                            "label": "客户名称",
                            "enable": true
                        },
                        {
                            "key": "customerType",
                            "label": "客户类型",
                            "enable": true
                        },
                        {
                            "key": "customerLevel",
                            "label": "客户等级",
                            "enable": true
                        },
                        {
                            "key": "busiNo",
                            "label": "营业执照号",
                            "enable": true
                        }
                    ]
                },
                {
                    "objectKey": "addressChild",
                    "objectName": "收货地址",
                    "parentObject":"customerParent",
                    "properties": [{
                            "key": "address",
                            "label": "收货地址",
                            "enable": true
                        },
                        {
                            "key": "person",
                            "label": "收货人",
                            "enable": true
                        },
                        {
                            "key": "person2",
                            "label": "收货人2",
                            "enable": true
                        }
                    ]
                },
                {
                    "objectKey": "contactChild",
                    "objectName": "联系人",
                    "parentObject":"customerParent",
                    "properties": [{
                            "key": "contactName",
                            "label": "联系人姓名",
                            "enable": true
                        },
                        {
                            "key": "contactPhone",
                            "label": "联系人电话",
                            "enable": true
                        },
                        {
                            "key": "phone2",
                            "label": "联系人电话2",
                            "enable": true
                        }
                    ]
                }
            ]
        };
        baseData = {
            compiledBillTpl: Handlebars.compile(billTpl),
            compiledPCListTpl: Handlebars.compile(pclistTpl),
            BusiTemplateParent: new u.DataTable(BusiTemplateParentMeta),
            BillHeadConf: new u.DataTable(BillHeadConfMeta),
            BillAttachConf: new u.DataTable(BillAttachConfMeta),
            BillChildsItems: {},
            BillTabsConf: new u.DataTable(BillTabsConfMeta),
            BusiTemplateItemProperty: new u.DataTable(BusiTemplateItemPropertyMeta),
            FieldSelector: new u.DataTable(FieldSelectorMeta),
            currentFieldSelector: { //当前正在处理的字段选择器归属（字段选择器在模板编辑器中共享）
              itemsDt: undefined,
              objectKey: undefined,
            },
            Extfield: new u.DataTable(FieldSelectorMeta),
            AllotGroup: new u.DataTable(AllotGroupMeta),
            TemplateAllot: new u.DataTable(TemplateAllotMeta),
            AllRefrel: new u.DataTable(AllRefrelMeta),
            DefaultValueDt: new u.DataTable(DefaultValueMeta),
            PCListSchemaItems: new u.DataTable(BusiTemplateItemPropertyMeta), //PC列表模板
            showAllotGroup: {
              orgArea: ko.observable(true),
              busiType: ko.observable(true),
              terminalProperty: ko.observable(true),
              customerProperty: ko.observable(true),
              userRole: ko.observable(true),
              actProperty: ko.observable(true),
              inspectProperty: ko.observable(true),
            },
            BusiTemplateParentData: {
              totalElements: 1,
              totalPages: 1,
              content: [
                {
                  id: "23333333",
                  code: "1111",
                  name: "模板1111",
                  busiObject: "01",
                  templateType: "001",
                },
              ]
            },
            MetaObjectProperties: {},
            busiObjectSrc: busiObjectSrc,
            templateTypeSrc: templateTypeSrc,
            itemTypeSrc: CONST.TEMPLATEITEMTYPE,
            templateDefineDialog: {},
            fieldSelectorDialog: {},
            searchSource: [
              {
                type: "combo",
                label: "业务对象",
                key: "busiObject",
                dataSource: busiObjectSrc
              },
              {
                type: "combo",
                label: "模板类型",
                key: "templateType",
                dataSource: templateTypeSrc
              },
              {
                type: "text",
                label: "模板编码",
                key: "code",
              },
              {
                type: "text",
                label: "模板名称",
                key: "name",
              },
              {
                type: "combo",
                label: "是否初始模板",
                key: "isDefault",
                onlySelect: true,
                dataSource: [
                  {name: "是", value: "1"},
                  {name: "否", value: "0"},
                ]
              },
            ],
            app: {},
            billStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
            baseurl: '/fmcg-dynamic-object/dynamic/trantemplates',
            searchcomp: {},
            orgAreaSrc: ko.observableArray([
              {name: "销售组织", value: "organizationId"},
              {name: "区域市场", value: "areaId"},
              {name: "部门", value: "departmentId"},
            ]),
            terminalPropertySrc: ko.observableArray([
              {name: "终端渠道类型", value: "channelType"},
              {name: "终端类型", value: "terminalType"},
              {name: "终端等级", value: "terminalGrade"},
            ]),
            customerPropertySrc: ko.observableArray([
              {name: "客户类型", value: "customerChannelType"},
              {name: "客户等级", value: "customerLevel"},
            ]),
            userRoleSrc: ko.observableArray([
              {name: "用户", value: "userId"},
              {name: "角色", value: "roleId"},
            ]),
            actPropertySrc: ko.observableArray([
              {name: "活动方案类型", value: "actScheme"},
            ]),
            inspectPropertySrc: ko.observableArray([
              {name: "巡查单类型", value: "inspectType"},
            ]),
            enumSrc: enuminfo.allenum,
            styleProperties: ["font-size", "color"],
            busiObjectName: ko.pureComputed(function() {
              var busiObject = viewModel.BusiTemplateParent.ref('busiObject')();
              for(var i=0; i<busiObjectSrc().length; i++) {
                if(busiObjectSrc()[i].value == busiObject) {
                  return busiObjectSrc()[i].name;
                }
              }
            }),
            templateTypeName: ko.pureComputed(function() {
              var templateType = viewModel.BusiTemplateParent.ref('templateType')();
              for(var i=0; i<templateTypeSrc().length; i++) {
                if(templateTypeSrc()[i].value == templateType) {
                  return templateTypeSrc()[i].name;
                }
              }
            }),
            //用户录入的默认值
            showInputItemTypes: ["text", "integer", "float", "phone", "textarea", "label"],
            refshowcontentSrc: ko.observableArray([]),
            comboDefaultSrc: ko.observableArray([]),
        };
        rendertype = {
            operation: common.rendertype.adddeloperation,
            //跳转详情页
            detailRender: common.rendertype.detailRender,
            editTypeText: common.rendertype.editTypeText,
            comboRender: common.rendertype.comboRender,
            referRender: common.rendertype.referRender,
            busiObjectRender: function(params) {
              for(var i=0; i<busiObjectSrc().length; i++) {
                if(busiObjectSrc()[i].value === params.value) {
                  params.element.innerHTML = busiObjectSrc()[i].name;
                }
              }
            },
            templateTypeRender: function(params) {
              for(var i=0; i<viewModel.templateTypeSrc().length; i++) {
                if(viewModel.templateTypeSrc()[i].value == params.value) {
                  params.element.innerHTML = templateTypeSrc()[i].name;
                  break;
                }
              }
            },
            fieldEnableRender: function(params) {
              if(params.value === "1") { //已启用
                params.element.innerHTML = '<span class="" style="color:green">已启用</span>';
              }
              else {//未启用
                params.element.innerHTML = '<a class="ui-template-addextfield" data-fieldid="'+params.row.value.id+'" data-objectkey="'+params.gridObj.dataTable._objectkey+'" data-fieldkey="'+params.row.value.key+'"  style="color:red;cursor:point">未启用</a>';
              }
            },
            isDefaultRender: function(params) {
              if(params.value == "1") { //默认
                params.element.innerHTML = "是";
              }
              else {//非默认
                params.element.innerHTML = "";
              }
            },
            //已经分配的组织区域
            orgAreaRender: function(params) {
              var templateauth = params.row.value.templateauth.getSimpleData();
              var orgAreaStr = "";
              for(var i=0; i<templateauth.length; i++) {
                if(templateauth[i].organizationName) {
                  orgAreaStr = "组织：" + templateauth[i].organizationName;
                }
                else if(templateauth[i].departmentName) {
                  orgAreaStr = "部门：" + templateauth[i].departmentName;
                }
                else if(templateauth[i].areaName) {
                  orgAreaStr = "区域市场：" + templateauth[i].areaName;
                }
                else {
                  orgAreaStr = "";
                }
              }
              params.element.innerHTML = orgAreaStr;
              params.element.title = orgAreaStr;
            },
            //已经分配的业务类型
            busiTypeRender: function(params) {
              var templateauth = params.row.value.templateauth.getSimpleData();
              var busiTypeStr = "";
              for(var i=0; i<templateauth.length; i++) {
                if(templateauth[i].busiTypeName) {
                  busiTypeStr = "" + templateauth[i].busiTypeName;
                }
                else {
                  busiTypeStr = "";
                }
              }
              params.element.innerHTML = busiTypeStr;
              params.element.title = busiTypeStr;
            },
            //已经分配的终端属性
            terminalPropertyRender: function(params) {
              var templateauth = params.row.value.templateauth.getSimpleData();
              var terminalPropertyStr = "";
              for(var i=0; i<templateauth.length; i++) {
                if(templateauth[i].channelTypeName) {
                  terminalPropertyStr = "终端渠道类型：" + templateauth[i].channelTypeName;
                }
                else if(templateauth[i].terminalTypeName) {
                  terminalPropertyStr = "终端类型：" + templateauth[i].terminalTypeName;
                }
                else if(templateauth[i].terminalGradeName) {
                  terminalPropertyStr = "终端等级：" + templateauth[i].terminalGradeName;
                }
                else {
                  terminalPropertyStr = "";
                }
              }
              params.element.innerHTML = terminalPropertyStr;
              params.element.title = terminalPropertyStr;
            },
            //已经分配的用户角色
            userRoleRender: function(params) {
              var templateauth = params.row.value.templateauth.getSimpleData();
              var userRoleStr = "";
              for(var i=0; i<templateauth.length; i++) {
                if(templateauth[i].userName) {
                  userRoleStr = "用户：" + templateauth[i].userName;
                }
                else if(templateauth[i].roleName) {
                  userRoleStr = "角色：" + templateauth[i].roleName;
                }
                else {
                  userRoleStr = "";
                }
              }
              params.element.innerHTML = userRoleStr;
              params.element.title = userRoleStr;
            },
        };
        events = {
            showTemplateDefine: function() {
              viewModel.templateDefineDialog = u.dialog({
                content: "#templateDefineDialog",
                hasCloseMenu: true,
                width: "400px",
                is_drag: true,
                closeFun: function() {
                  viewModel.search();
                }
              });
              var curRow = viewModel.BusiTemplateParent.createEmptyRow({unSelect: true});
              viewModel.BusiTemplateParent.setRowFocus(curRow);
            },
            cancelTemplateDefine: function() {
              viewModel.templateDefineDialog.close();
              viewModel.search();
            },
            //新增
            add: function() {
              viewModel.templateDefineDialog = u.dialog({
                content: "#templateDefineDialog",
                hasCloseMenu: true,
                width: "400px",
                is_drag: true,
                closeFun: function() {
                  viewModel.search();
                }
              });
              var curRow = viewModel.BusiTemplateParent.createEmptyRow({unSelect: true});
              viewModel.BusiTemplateParent.setRowFocus(curRow);
              viewModel.billStatus(CONST.BILLPANELSTATUS.ADD);
            },
            //修改
            update: function() {
              var updateRow = viewModel.BusiTemplateParent.getCurrentRow();
              $._ajax({
                type: 'post',
                url: viewModel.baseurl + "/edit",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                  trantemplateId: updateRow.getValue('id'),
                }),
                dataType: 'json',
                success: function(data) {
                  viewModel.showEditPanel(data.templateData);
                  viewModel.billStatus(CONST.BILLPANELSTATUS.EDIT);
                }
              });
            },
            //复制
            copy: function() {
              viewModel.templateDefineDialog = u.dialog({
                content: "#templateDefineDialog",
                hasCloseMenu: true,
                width: "400px",
                is_drag: true,
                closeFun: function() {
                  viewModel.search();
                }
              });
              var copyTemplateParentData = viewModel.BusiTemplateParent.getSelectedRows()[0].getSimpleData();
              copyTemplateParentData.isDefault = "0";
              // copyTemplateParentData.name = "";
              var curRow = viewModel.BusiTemplateParent.createEmptyRow({unSelect: true});
              viewModel.BusiTemplateParent.setRowFocus(curRow);
              curRow.setSimpleData(copyTemplateParentData);
              viewModel.billStatus(CONST.BILLPANELSTATUS.COPY);
            },
            //确认模板定义
            confirmTemplateDefine: function() {
              var validResult = viewModel.app.compsValidateMultiParam({element: $('#templateDefineDialog')[0], showMsg: true})
              if(!validResult.passed) {
                return;
              }
              //根据业务对象+模板类型获取默认模板及元数据
              var curRow = viewModel.BusiTemplateParent.getCurrentRow();
              if(viewModel.billStatus() === CONST.BILLPANELSTATUS.ADD) {
                $._ajax({
                  type: 'post',
                  url: viewModel.baseurl + "/init",
                  contentType: 'application/json; charset=utf-8',
                  data: JSON.stringify({
                    "busiObject": curRow.getValue('busiObject'),
                    "templateType": curRow.getValue('templateType'),
                  }),
                  dataType: 'json',
                  success: function(data) {
                    viewModel.showEditPanel(data.templateData);
                    viewModel.templateDefineDialog.hide();
                  }
                });
              }
              else if(viewModel.billStatus() === CONST.BILLPANELSTATUS.COPY) {
                $._ajax({
                  type: 'post',
                  url: viewModel.baseurl + "/edit",
                  contentType: 'application/json; charset=utf-8',
                  data: JSON.stringify({
                    trantemplateId: curRow.getValue('id'),
                  }),
                  dataType: 'json',
                  success: function(data) {
                    viewModel.showEditPanel(data.templateData);
                    viewModel.templateDefineDialog.hide();
                  }
                });
              }
            },
            //显示编辑面板
            showEditPanel: function(templateSchema) {
              viewModel.beforeEditSchema = templateSchema;
              var curTemplateRow = viewModel.BusiTemplateParent.getCurrentRow();
              var templateType = curTemplateRow.getValue('templateType');
              switch(templateType) {
                case "pc-list":
                  viewModel.showPCListEditor(templateSchema);
                  break;
                default:
                  viewModel.showBillEditor(templateSchema);
              }
              $('.ui-list-panel').hide();
              $('.ui-bill-panel').show();
            },
            //进入PC列表模板编辑器
            showPCListEditor: function(templateSchema) {
              createDt();
              showTplEditor(templateSchema);
              bindEvents();
              function createDt() {
                viewModel.PCListParentItems = new u.DataTable(BusiTemplateItemPropertyMeta);
                var headComps = templateSchema.list.comps;
                viewModel.PCListParentItems.setSimpleData((headComps && headComps[0] && headComps[0].items) || []);
                viewModel.AllRefrel = new u.DataTable(AllRefrelMeta);
              }
              function bindEvents() {
                //点击列表主表字段项
                $('.ui-template-head').on('click', '.ui-template-table-th', function(e) {
                  var field = $(this).attr('data-field');
                  var curRow = viewModel.PCListParentItems.getRowByField("key", field);
                  var existCurRow = viewModel.PCListParentItems.getCurrentRow();
                  existCurRow && viewModel.PCListParentItems.setRowUnFocus(existCurRow);
                  viewModel.PCListParentItems.setRowFocus(curRow);
                  $('.ui-template-property').hide();
                  $('.ui-template-property.ui-template-headitem-property').show();
                  $('.ui-template-focus').removeClass('ui-template-focus');
                  $(this).addClass('ui-template-focus');
                });
                //切换字段项配置时
                viewModel.PCListParentItems.on('focus', function(params) {
                  var dataTable = this;
                  var focusRow = viewModel.PCListParentItems.getRowByRowId(params.rowId);
                  var itemType = focusRow.getValue('type');
                  //显示全部参照关联字段，并选中已配置显示的参照关联字段
                  $('.ui-template-property-refrel').hide();
                  itemType === "refer" && viewModel.showRefrel(focusRow);
                  //构建默认值表单
                  var defaultValueReferWrap = document.getElementById('defaultValueReferWrap');
                  defaultValueReferWrap.innerHTML = "";
                  viewModel.buildDefaultValueForm({
                    dataTable: dataTable,
                    rowId: params.rowId,
                    defaultValueReferWrap: defaultValueReferWrap,
                  });
                });
                //模板头部重排序
                viewModel.PCListParentItems.on('order.valuechange', function(obj) {
                  viewModel.PCListParentItems.sortByField("order");
                });
                //参照关联字段
                viewModel.AllRefrel.on('select', function() {
                  viewModel.updateFocusRefrel(viewModel.refrelFocusRow);
                });
                viewModel.AllRefrel.on('unSelect', function() {
                  viewModel.updateFocusRefrel(viewModel.refrelFocusRow);
                });
                viewModel.AllRefrel.on('valuechange', function(params) {
                  var changeRow = viewModel.AllRefrel.getRowByRowId(params.rowId);
                  if(changeRow.selected()) {
                    viewModel.updateFocusRefrel(viewModel.refrelFocusRow);
                  }
                });
              }
              function showTplEditor(templateSchema) {
                viewModel.tplEditorWrap.innerHTML = viewModel.compiledPCListTpl({
                  listObjectKey: templateSchema.list.comps[0].objectKey,
                });
                ko.cleanNode(viewModel.tplEditorWrap);
                u.createApp({
                  el: viewModel.tplEditorWrap,
                  model: viewModel
                });
              }
            },
            //进入单据模板（PC、APP编辑及详情）编辑器
            showBillEditor: function(templateSchema) {
              createDt();
              showTplEditor(templateSchema);
              bindEvents();
              //创建模板编辑器相关DataTable
              function createDt() {
                viewModel.BillParentItems = new u.DataTable(BusiTemplateItemPropertyMeta);
                var headComps = templateSchema.head.comps;
                viewModel.BillParentItems.setSimpleData((headComps && headComps[0] && headComps[0].items) || []);
                viewModel.BillChildsItems = {}; //<objectKey, DataTable>
                //动态构造子表DataTable
                templateSchema.tabs.forEach(function(tab) {
                  tab.comps.forEach(function(comp) {
                    viewModel.BillChildsItems[comp.objectKey] = new u.DataTable(BusiTemplateItemPropertyMeta);
                    viewModel.BillChildsItems[comp.objectKey].setSimpleData((comp && comp.items) || []);
                  });
                });
                viewModel.BillHeadConf = new u.DataTable(BillHeadConfMeta);
                var billHeadConf = u.extend({}, templateSchema.head);
                delete billHeadConf.comps;
                viewModel.BillHeadConf.createFocusRow(billHeadConf);
                viewModel.BillTabsConf = new u.DataTable(BillTabsConfMeta);
                viewModel.BillTabsConf.setSimpleData(templateSchema.tabs);
                viewModel.BillAttachConf = new u.DataTable(BillAttachConfMeta);
                viewModel.BillAttachConf.createFocusRow(templateSchema.attachment);
                viewModel.AllRefrel = new u.DataTable(AllRefrelMeta);
              }
              //模板编辑器相关DataTable事件绑定
              function bindEvents() {
                //点击模板头部项
                $('.ui-template-head').on('click', '.ui-item', function(e) {
                  var field = $(this).attr('data-field');
                  var curRow = viewModel.BillParentItems.getRowByField("key", field);
                  var existCurRow = viewModel.BillParentItems.getCurrentRow();
                  existCurRow && viewModel.BillParentItems.setRowUnFocus(existCurRow);
                  viewModel.BillParentItems.setRowFocus(curRow);
                  $('.ui-template-property').hide();
                  $('.ui-template-property.ui-template-headitem-property').show();
                  $('.ui-template-focus').removeClass('ui-template-focus');
                  $(this).addClass('ui-template-focus');
                });
                //点击模板表体项
                $('.ui-template-body').on('click', '.ui-template-table-th', function(e) {
                  var field = $(this).attr('data-field');
                  var objectkey = $(this).attr('data-objectkey');
                  var curRow = viewModel.BillChildsItems[objectkey].getRowByField("key", field);
                  var existCurRow = viewModel.BillChildsItems[objectkey].getCurrentRow();
                  existCurRow && viewModel.BillChildsItems[objectkey].setRowUnFocus(existCurRow);
                  viewModel.BillChildsItems[objectkey].setRowFocus(curRow);
                  viewModel.BillChildsItems._focusObjectkey = objectkey;
                  $('.ui-template-property').hide();
                  $('.ui-template-property[data-objectkey='+objectkey+']').show();
                  $('.ui-template-focus').removeClass('ui-template-focus');
                  $(this).addClass('ui-template-focus');
                });
                //表体页签重排序
                viewModel.BillTabsConf.on('order.valuechange', function(obj) {
                  var $changeTab = $('.ui-template-body .u-tabs__tab.is-active');
                  var $allTabs = $('.ui-template-body .u-tabs__tab');
                  var changeTabOrder = $changeTab.attr('data-order');
                  changeTabOrder = parseInt(changeTabOrder);
                  var changeTabHref = $changeTab.attr("href");
                  var changeTabIndex = -1;
                  for(var i=0; i<$allTabs.length;i++) {
                    if($allTabs.eq(i).attr("href") === changeTabHref) {
                      changeTabIndex = i;
                      break;
                    }
                  }
                  if(obj.newValue > obj.oldValue) { //顺序变大，可能向后移动
                    for(var i=$allTabs.length-1; i>changeTabIndex; i--) { //从后向前寻找，如果变化页签顺序大于等于当前遍历页签顺序，则插入到当前遍历页签之后
                      var curTabOrder = $allTabs.eq(i).attr('data-order');
                      curTabOrder = parseInt(curTabOrder);
                      if(changeTabOrder >= curTabOrder) {
                        $changeTab.insertAfter($allTabs.eq(i));
                        break;
                      }
                    }
                  }
                  else {  //顺序变小，可能向前移动
                    for(var i=0; i<changeTabIndex; i++) { //从前向后寻找，如果变化页签顺序小于等于当前遍历页签顺序，则插入到当前遍历页签之前
                      var curTabOrder = $allTabs.eq(i).attr('data-order');
                      curTabOrder = parseInt(curTabOrder);
                      if(changeTabOrder <= curTabOrder) {
                        $changeTab.insertBefore($allTabs.eq(i));
                        break;
                      }
                    }
                  }
                });
                //切换字段项配置时
                viewModel.BillParentItems.on('focus', function(params) {
                  var dataTable = this;
                  var focusRow = viewModel.BillParentItems.getRowByRowId(params.rowId);
                  var itemType = focusRow.getValue('type');
                  //显示全部参照关联字段，并选中已配置显示的参照关联字段
                  $('.ui-template-property-refrel').hide();
                  itemType === "refer" && viewModel.showRefrel(focusRow);
                  //构建默认值表单
                  var defaultValueReferWrap = document.getElementById('defaultValueReferWrap');
                  defaultValueReferWrap.innerHTML = "";
                  viewModel.buildDefaultValueForm({
                    dataTable: dataTable,
                    rowId: params.rowId,
                    defaultValueReferWrap: defaultValueReferWrap,
                  });
                });
                //模板头部重排序
                viewModel.BillParentItems.on('order.valuechange', function(obj) {
                  viewModel.BillParentItems.sortByField("order");
                });
                //绑定子表DataTable事件
                for(var objectKey in viewModel.BillChildsItems) {
                  (function() {
                    var childObjectKey = objectKey;
                    var childDt = viewModel.BillChildsItems[childObjectKey];
                    //监听字段项顺序变化，调整DataTable中rows顺序
                    childDt.on("order.valuechange", function(obj) {
                      childDt.sortByField("order");
                    });
                    //子表行聚焦
                    childDt.on('focus', function(params) {
                      // setTimeout(function() {
                        var focusRow = childDt.getRowByRowId(params.rowId);
                        if(!focusRow) {
                          console.log("未找到focus行");
                          return;
                        }
                        var itemType = focusRow.getValue('type');
                        //显示全部参照关联字段，并选中已配置显示的参照关联字段
                        $('.ui-template-property-refrel').hide();
                        itemType === "refer" && viewModel.showRefrel(focusRow);
                        //选中子表字段项时，构建默认值表单
                        var defaultValueReferWrap = $('.ui-template-property[data-objectkey='+childObjectKey+'] .J-child-defaultValueRefer')[0];
                        defaultValueReferWrap.innerHTML = "";
                        viewModel.buildDefaultValueForm({
                          dataTable: childDt,
                          rowId: params.rowId,
                          defaultValueReferWrap: defaultValueReferWrap,
                        });
                      // }, 1);
                    });
                  })()
                }
                //参照关联字段
                viewModel.AllRefrel.on('select', function() {
                  viewModel.updateFocusRefrel(viewModel.refrelFocusRow);
                });
                viewModel.AllRefrel.on('unSelect', function() {
                  viewModel.updateFocusRefrel(viewModel.refrelFocusRow);
                });
                viewModel.AllRefrel.on('valuechange', function(params) {
                  var changeRow = viewModel.AllRefrel.getRowByRowId(params.rowId);
                  if(changeRow.selected()) {
                    viewModel.updateFocusRefrel(viewModel.refrelFocusRow);
                  }
                });
              }
              //显示模板编辑器
              function showTplEditor(templateSchema) {
                viewModel.tplEditorWrap.innerHTML = viewModel.compiledBillTpl({
                  childs: Object.keys(viewModel.BillChildsItems),
                  headObjectKey: templateSchema.head.comps[0].objectKey,
                });
                ko.cleanNode(viewModel.tplEditorWrap);
                u.createApp({
                  el: viewModel.tplEditorWrap,
                  model: viewModel
                });
              }
            },
            //显示字段选择器
            showFieldSelector: function(objectKey, itemsDtId) {
              var busiObject = viewModel.BusiTemplateParent.getValue("busiObject");
              var itemsDt = u.getJSObject(viewModel, itemsDtId);
              if(!itemsDt || !objectKey) {
                throw new Exception("字段选择器未找到对应模型(objectKey)或模板字段项DataTable");
              }
              var existProperties = itemsDt.getSimpleData();
              viewModel.currentFieldSelector = {
                itemsDt: itemsDt,
                objectKey: objectKey,
              };
              viewModel.searchFieldByObject(busiObject, objectKey, function afterSearch() {
                var allProperties = viewModel.MetaObjectProperties.properties;
                var filteredProperties = common.dataconvert.diff("key", allProperties, existProperties);
                viewModel.FieldSelector.setSimpleData(filteredProperties);
                viewModel.fieldSelectorDialog = u.dialog({
                  content: "#fieldSelectorDialog",
                  width: "800px",
                });
              });
            },
            //增加字段
            addField: function() {
              var selectedFields = viewModel.FieldSelector.getSimpleData({type: "select"});
              viewModel.currentFieldSelector.itemsDt.addSimpleData(selectedFields);
              viewModel.fieldSelectorDialog.close();
            },
            //删除字段
            delField: function(dataTable, rowId) {
              //至少保留一项
              var existDatas = dataTable.getSimpleData();
              if(existDatas.length === 1) {
                toastr.warning("至少保留一项，如无需显示，请将整个区域隐藏");
                return;
              }
              var delRow = dataTable.getRowByRowId(rowId);
              //保留字段不可删除
              if(delRow.getValue('isEssential') == "1") {
                toastr.warning("不能删除保留字段");
                return;
              }
              var delRowIndex = dataTable.getIndexByRowId(delRow.rowId);
              dataTable.removeRows([delRowIndex], {forceDel: true});
            },
            //删除表头字段
            delHeadField: function(key) {
              //至少保留一项
              var existDatas = viewModel.BillParentItems.getSimpleData();
              if(existDatas.length === 1) {
                toastr.warning("至少保留一项，如无需显示行信息，请反选是否显示");
                setTimeout(function() {
                  $('.ui-template-head-settingbtn').trigger('click');
                }, 1);
                return;
              }
              var delRow = viewModel.BillParentItems.getRowByField("key", key);
              //保留字段不可删除
              if(delRow.getValue('isEssential') == "1") {
                toastr.warning("不能删除保留字段");
                return;
              }
              var delRowIndex = viewModel.BillParentItems.getIndexByRowId(delRow.rowId);
              viewModel.BillParentItems.removeRows([delRowIndex], {forceDel: true});
            },
            //取消增加字段
            cancelAddField: function() {
              viewModel.fieldSelectorDialog.close();
            },
            //删除表体字段
            delBodyField: function(objectKey, key, row, e) {
              var existDatas = viewModel.BillChildsItems[objectKey].getSimpleData();
              if(existDatas.length === 1) {
                toastr.warning("至少保留一项，如无需显示子行信息，请反选是否显示");
                var tabid = $(e.target).parents('.u-tabs__panel').eq(0).attr('id');
                setTimeout(function() {
                  $('.u-tabs__tab[href=#'+tabid+']').trigger('click');
                }, 1);
                return;
              }
              var delRow = viewModel.BillChildsItems[objectKey].getRowByField("key", key);
              if(delRow.getValue('isEssential') == "1") {
                toastr.warning("不能删除保留字段");
                return;
              }
              var delRowIndex = viewModel.BillChildsItems[objectKey].getIndexByRowId(delRow.rowId);
              viewModel.BillChildsItems[objectKey].removeRows([delRowIndex], {forceDel: true});
            },
            //增加表体字段
            addBodyField: function() {

            },
            //取消编辑
            cancelEdit: function() {
              $('.ui-bill-panel').hide();
              $('.ui-list-panel').show();
              viewModel.billStatus(CONST.BILLPANELSTATUS.DEFAULT);
              viewModel.search();
            },
            //过滤保存数据
            filterSaveData:function(saveData){
              //执行单元数据
              /* var tempOraginItem = [
                {key:"billCode",label:"单据号",order:"10"},
                {key:"organizationName",label:"销售组织",order:"20"},
                {key:"applyBillName",label:"活动方案",order:"30"},
                {key:"customerName",label:"客户",order:"40"},
                {key:"applyObject",label:"参与对象",order:"50"},
                {key:"canalTypeName",label:"渠道类型",order:"60"},
                {key:"sumInspectTypeName",label:"检查类型",order:"70"},
                {key:"marrkName",label:"检查人",order:"80"},
                {key:"marrkDate",label:"检查日期",order:"90"},
                {key:"feeAmount",label:"费用",order:"100"},
                {key:"saleAmount",label:"销量",order:"110"},
                {key:"isInspectResult",label:"是否合格",order:"120"},
                {key:"remark",label:"评价",order:"130"},
                {key:"doorHeadPhoto",label:"门头照片",order:"140"},
                {key:"panoramaPhoto",label:"全景照片",order:"150"},
                {key:"dealPhoto",label:"兑付照片",order:"160"},
              ]; */
              //巡查单元数据
              var tempOraginItem = [
                {key:"billCode",label:"单据号",order:"10"},
                {key:"organizationName",label:"销售组织",order:"20"},
                {key:"applyTopic",label:"活动方案",order:"30"},
                {key:"customerName",label:"客户",order:"40"},
                {key:"applyObject",label:"参与对象",order:"50"},
                {key:"canalTypeName",label:"渠道类型",order:"60"},
                {key:"sumPotrolTypeName",label:"巡查类型",order:"70"},
                {key:"marrkName",label:"检查人",order:"80"},
                {key:"marrkDate",label:"巡查日期",order:"90"},
                {key:"saleAmount",label:"费用",order:"100"},
                {key:"saleAmount",label:"销量",order:"110"},
                {key:"isPotrolResult",label:"是否合格",order:"120"},
                {key:"potrolEvaluate",label:"评价",order:"130"},
                {key:"doorHeadPhoto",label:"门头照片",order:"140"},
                {key:"panoramaPhoto",label:"全景照片",order:"150"},
                {key:"dealPhoto",label:"兑付照片",order:"160"},
              ];
              saveData.templateData.head.comps[0].items = saveData.templateData.head.comps[0].items.filter(v => tempOraginItem.find(v1 => v1.key == v.key))
              .map(v => {
                var existKeyObj = tempOraginItem.find(v1=>v1.key == v.key);
                return Object.assign(
                  {},
                  v,
                  {
                    order:existKeyObj ? existKeyObj.order : v.order,
                    label:existKeyObj.label
                  }
                );
              })
              .sort((a,b) => a.order - b.order);
              return saveData;
            },
            //获取单据模板编辑器数据
            getBillSchema: function() {
              var templateData = u.extend({}, viewModel.beforeEditSchema);
              var headItemsData = viewModel.BillParentItems.getSimpleData();
              var headConfData = viewModel.BillHeadConf.getFocusRow().getSimpleData();
              u.extend(templateData.head, headConfData);
              templateData.head.comps[0].items = headItemsData;
              templateData.attachment = viewModel.BillAttachConf.getFocusRow().getSimpleData();
              templateData.tabs = viewModel.BillTabsConf.getSimpleData();
              for(var i=0; i<templateData.tabs.length; i++) {
                var tab = templateData.tabs[i];
                for(var j=0; j<tab.comps.length; j++) {
                  var objectKey = tab.comps[j].objectKey;
                  var childCompItems = viewModel.BillChildsItems[objectKey].getSimpleData();
                  tab.comps[j].items = childCompItems;
                }
              }
              return templateData;
            },
            //获取PC列表编辑器数据
            getPCListSchema: function() {
              var templateData = u.extend({}, viewModel.beforeEditSchema);
              var listItemsData = viewModel.PCListParentItems.getSimpleData();
              templateData.list.comps[0].items = listItemsData;
              return templateData;
            },
            //保存模板编辑器
            saveBill: function() {
              var template = viewModel.BusiTemplateParent.getCurrentRow().getSimpleData();
              var templateData = undefined;
              switch(template.templateType) {
                case "pc-list":
                  templateData = viewModel.getPCListSchema();
                  break;
                default:
                  templateData = viewModel.getBillSchema();
              }
              if(viewModel.billStatus() === CONST.BILLPANELSTATUS.COPY) {
                template.id = "";
              }
              var saveData = {
                template: template,
                templateData: templateData
              };
              // var saveData = viewModel.filterSaveData(saveData);
              console.log("保存模板的数据为:", saveData);
              $._ajax({
                type: 'post',
                url: viewModel.baseurl + "/save",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(saveData),
                dataType: 'json',
                success: function(data) {
                  if(data.success == "1") { //保存成功
                    viewModel.search();
                    $('.ui-bill-panel').hide();
                    $('.ui-list-panel').show();
                    viewModel.billStatus(CONST.BILLPANELSTATUS.DEFAULT);
                  }
                  else {  //保存失败
                    toastr.error(data.msg);
                  }
                }
              });
            },
            //配置表头
            setHeadConf: function() {
              $('.ui-template-property').hide();
              $('.ui-template-headconf-property').show();
              $('.ui-template-focus').removeClass('ui-template-focus');
              $('.ui-template-head').addClass('ui-template-focus');
            },
            //配置页签
            setTabConf: function(tabName) {
              $('.ui-template-property').hide();
              $('.ui-template-tab-property').show();
              var setTabRow = viewModel.BillTabsConf.getRowByField("tabName", tabName);
              viewModel.BillTabsConf.setRowFocus(setTabRow);
              $('.ui-template-focus').removeClass('ui-template-focus');
            },
            //配置附件
            attachConf: function() {
              $('.ui-template-property').hide();
              $('.ui-template-attachconf-property').show();
              $('.ui-template-focus').removeClass('ui-template-focus');
            },
            beforeSelectField: function(params) {
              if(params.rowObj.value.enable != "1") {
                toastr.warning("请先启用该字段");
                return false;
              }
              return true;
            },
            //取消启用扩展字段
            cancelExtfield: function() {
              viewModel.extfieldDialog.close();
            },
            //启用扩展字段
            addExtfield: function() {
              var extfieldType = viewModel.Extfield.getValue("type");
              var extEnumkey = viewModel.Extfield.getValue("enumkey");
              var extRefkey = viewModel.Extfield.getValue("refkey");
              var extRefid = viewModel.Extfield.getValue("refid");
              var passed = true;
              var errorMsg = "";
              if(extfieldType == "combo" && !extEnumkey) {
                passed = false;
                errorMsg = "请选择枚举信息";
              }
              else if(extfieldType == "refer" && !extRefkey) {
                passed = false;
                errorMsg = "请选择参照信息";
              }
              else if(extfieldType == "docrefer" && !extRefid) {
                passed = false;
                errorMsg = "请选择自定义参照";
              }
              else {}
              if(!passed) {
                toastr.error(errorMsg);
                return;
              }
              var busiObject = viewModel.BusiTemplateParent.getValue("busiObject");
              var objectkey = viewModel.Extfield._objectkey;
              var fieldKey = viewModel.Extfield.getValue("key");
              var fieldLabel = viewModel.Extfield.getValue("label");
              var extFieldData = viewModel.Extfield.getCurrentRow().getSimpleData();
              console.log("业务对象:"+busiObject);
              console.log("启用元数据:"+objectkey);
              console.log("扩展字段键值:"+fieldKey);
              console.log("扩展字段描述:"+fieldLabel);
              viewModel.extfieldDialog.close();
              //TODO: 更新扩展字段
              $._ajax({
                type: 'post',
                url: '/fmcg-dynamic-object/dynamic/busientity-meta-datas/save-meta-datas',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                  objectKey: objectkey,
                  properties: [
                    extFieldData
                  ]
                }),
                dataType: 'json',
                success: function(data) {
                // var data = {success: "1"}
                  if(data.success == "1") { //启用扩展字段成功
                    viewModel.searchFieldByObject(busiObject, objectkey, function afterSearch() {
                      var allProperties = viewModel.MetaObjectProperties.properties;
                      var existProperties = [];
                      if(viewModel.addFieldFlag === "templateHead") {
                        existProperties = viewModel.BillParentItems.getSimpleData();
                      }
                      else {
                        existProperties = viewModel.BillChildsItems[objectkey].getSimpleData();
                      }
                      var filteredProperties = common.dataconvert.diff("key", allProperties, existProperties);
                      viewModel.FieldSelector.setSimpleData(filteredProperties);
                    })
                  }
                  else {//启用扩展字段失败
                    toastr.error(data.msg);
                  }
                }
              })
            },
            //查询某一元数据字段列表
            searchFieldByObject: function(busiObject, objectkey, afterSearch) {
              $._ajax({
                type: 'post',
                url: '/fmcg-dynamic-object/dynamic/busientity-meta-datas/query-meta-datas',
                contentType: 'application/json; chartset=utf-8',
                data: JSON.stringify({
                  "busiObject": busiObject,
                  "objectKey": objectkey,
                }),
                success: function(data) {
                  // var data = {
                  //   objectKey: "customerParent",
                  //   objectName: "客户",
                  //   parentObject: "",
                  //   properties: [
                  //     {
                  //       key: "customerName",
                  //       label: "客户名称",
                  //       enable: true,
                  //       type: "text",
                  //     },
                  //     {
                  //       key: "customerJoindate",
                  //       label: "加盟日期",
                  //       enable: true,
                  //       type: "date",
                  //     },
                  //     {
                  //       key: "customerType",
                  //       label: "客户类型",
                  //       enable: true,
                  //       type: "combo",
                  //       enumkey: "customertype"
                  //     },
                  //     {
                  //       key: "organization",
                  //       label: "组织",
                  //       enable: true,
                  //       type: "refer",
                  //       refkey: "organizationId"
                  //     },
                  //     {
                  //       key: "customerLevel",
                  //       label: "终端渠道类型",
                  //       enable: true,
                  //       type: "docrefer",
                  //       refcode: "LJ200",
                  //       refname: "终端渠道类型"
                  //     },
                  //     {
                  //       key: "busiNo",
                  //       label: "营业执照号",
                  //       enable: true,
                  //     },
                  //     {
                  //       key: "ext01",
                  //       label: "扩展字段01",
                  //       enable: false,
                  //     },
                  //     {
                  //       key: "ext02",
                  //       label: "扩展字段02",
                  //       enable: false,
                  //     },
                  //   ]
                  // };
                  //带入模板的元数据字段默认visible为1
                  for(var i=0; i<data.properties.length;i++) {
                    data.properties[i].visible = "1";
                  }
                  viewModel.MetaObjectProperties = data;
                  afterSearch && afterSearch();
                }
              })

            },
            //初始化可分配维度分组
            initAllotGroup: function() {
              for(var key in viewModel.showAllotGroup) {
                viewModel.showAllotGroup[key](true);
              }
            },
            //显示分配弹框
            showAllotDialog: function() {
              var curTemplateParentRow = viewModel.BusiTemplateParent.getCurrentRow();
              viewModel.initAllotGroup();
              common.referUtil.clearRef(document.getElementById('allotDialog'));
              $._ajax({
                type: 'post',
                url: '/fmcg-dynamic-object/dynamic/trantemplate-auths-forbidden/query',
                data: JSON.stringify({
                  busiObject: curTemplateParentRow.getValue('busiObject')
                }),
                contentType: 'application/json; chartset=utf-8',
                success: function(data) {
                  for(var i=0; i<data.length;i++) {
                    viewModel.showAllotGroup[data[i]](false);
                  }
                  viewModel.allotDialog = u.dialog({
                    content: "#allotDialog",
                    width: "600px",
                  });
                  // common.referUtil.clearRef(document.getElementById('allotDialog'));
                }
              });
              viewModel.AllotGroup.removeAllRows();
              var curGroupRow = viewModel.AllotGroup.createEmptyRow();
              viewModel.AllotGroup.setRowFocus(curGroupRow);
              viewModel.TemplateAllot.removeAllRows();
              $._ajax({
                type: 'get',
                url: '/fmcg-dynamic-object/dynamic/trantemplate-auths/query-by-templateid',
                data: {templateId: curTemplateParentRow.getValue('id')},
                success: function(data) {
                  var curRow = viewModel.TemplateAllot.createEmptyRow();
                  viewModel.TemplateAllot.setRowFocus(curRow);
                  if(data) { //已有分配
                    //人员归属
                    if(data.organizationId) {//组织
                      curGroupRow.setValue("orgArea", "organizationId");
                    }
                    else if(data.departmentId) {//部门
                      curGroupRow.setValue("orgArea", "departmentId");
                    }
                    else {//区域市场
                      curGroupRow.setValue("orgArea", "areaId");
                    }
                    //终端属性
                    if(data.channelType) {//终端渠道类型
                      curGroupRow.setValue("terminalProperty", "channelType");
                    }
                    else if(data.terminalGrade) {
                      curGroupRow.setValue("terminalProperty", "terminalGrade");
                    }
                    else { //终端类型
                      curGroupRow.setValue("terminalProperty", "terminalType");
                    }
                    //客户属性
                    if(data.customerChannelType) {//客户类型
                      curGroupRow.setValue("customerProperty", "customerChannelType");
                    }
                    else { //客户等级
                      curGroupRow.setValue("customerProperty", "customerLevel");
                    }
                    //用户角色
                    if(data.userId) {  //用户
                      curGroupRow.setValue("userRole", "userId");
                    }
                    else {//角色
                      curGroupRow.setValue("userRole", "roleId");
                    }
                    // setTimeout(function() {
                      curRow.setSimpleData(data);
                    // }, 0);
                  }
                  else {  //新增分配
                    curGroupRow.setValue('orgArea', viewModel.orgAreaSrc()[0].value);
                    curGroupRow.setValue('terminalProperty', viewModel.terminalPropertySrc()[0].value);
                    curGroupRow.setValue('customerProperty', viewModel.customerPropertySrc()[0].value);
                    curGroupRow.setValue('userRole', viewModel.userRoleSrc()[0].value);
                  }
                }
              });
            },
            //取消分配
            cancelAllot: function() {
              viewModel.allotDialog.close();
            },
            //确认分配
            confirmAllot: function() {
              var templateAllot = viewModel.TemplateAllot.getCurrentRow().getSimpleData();
              templateAllot.templateId = viewModel.BusiTemplateParent.getValue('id');
              console.log("模板分配的数据为:", templateAllot);
              //TODO: 模板分配
              $._ajax({
                type: 'post',
                url: '/fmcg-dynamic-object/dynamic/trantemplate-auths/auth',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(templateAllot),
                dataType: 'json',
                success: function(data) {
                  if(data.success == "1") { //模板分配成功
                    viewModel.allotDialog.close();
                  }
                  else {//模板分配失败
                    toastr.error(data.msg);
                  }
                }
              })
            },
             // 操作区和表格头部固定
            fixHeight: function () {
              //表格头部尚未渲染，则稍后执行
              if($(".ui-list-panel .u-grid-header").length ===0) {
                setTimeout(viewModel.fixHeight, 0);
              }
                var $headHeight;
                if ($(".ui-list-panel-head").length > 0) {
                    $headHeight = $(".ui-list-panel-head").outerHeight(true);
                } else if ($(".ui-list-panel-head-operation").length > 0) {
                    $headHeight = $(".ui-list-panel-head-operation").outerHeight(true);
                }
                var $gridHeadWidth = $(".ui-panel-body").outerWidth(true);
                var cusH = $headHeight + "px";
                var gridHeadHeight  = $headHeight + "px";
                var headBgH = $headHeight + "px";
                $(".ui-panel-body").css({
                    "margin-top": cusH,
                    "border-top": "none",
                });
                $(".ui-list-panel-head").css({
                    "position": "fixed",
                    "top": "0",
                    "z-index": "1002",
                    "background": "#fff",
                    "padding-right": "30px",
                });
                $(".ui-list-panel .u-grid-header").eq(0).css({
                    "position": "fixed",
                    "width": $gridHeadWidth,
                    "top": gridHeadHeight,
                    "z-index": "1001",
                    "border-top": "1px solid #3CA4FB",
                });
                $(".ui-list-panel .u-grid").eq(0).css({
                    "padding-top": "47px",
                });
                $(".head-bg").css({
                    "width": "100%",
                    "position": "fixed",
                    "top": "0",
                    "height": headBgH,
                    "background": "#fff",
                    "z-index": "1000"
                });
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.BusiTemplateParent.pageIndex(0);
                }
                $('.ui-head-operation-close').trigger('click');
                var queryData = viewModel.searchcomp.getDataWithOpr();
                queryData.size = viewModel.BusiTemplateParent.pageSize();
                queryData.page = viewModel.BusiTemplateParent.pageIndex();
                queryData.sort = "ts,desc";
                $._ajax({
                    type: "get",
                    url: viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                      // var data = {
                      //   totalElements: 15,
                      //   totalPages: 2,
                      //   content: [
                      //     {
                      //         "id": "8047b532-dab9-44a6-96da-def1dd9991cb",
                      //         "dr": 0,
                      //         "ts": 1541064778608,
                      //         "creator": null,
                      //         "creationTime": 1541064778000,
                      //         "modifier": null,
                      //         "modifiedTime": null,
                      //         "persistStatus": "nrm",
                      //         "oldValue": null,
                      //         "promptMessage": null,
                      //         "code": "customer-pc-edit",
                      //         "name": "客户端pc编辑页面",
                      //         "templateType": "pc-edit",
                      //         "busiObject": "customer"
                      //     }
                      //   ]
                      // };
                      // data.content[0].templateauth = [{
                      //   "id": "04c9b5ce-b10d-44ed-ac4c-bf9523051cb6",
                      //   "templateId": "38748523-4fef-4782-a5f9-b848d62adea9",
                      //   "organizationId": "1111",
                      //   "organizationName": "组织11",
                      //   "areaId": null,
                      //   "areaName": "区域11",
                      //   "departmentId": null,
                      //   "departmentName": "",
                      //   "busiType": "1",
                      //   "busiTypeName": "业务类型1",
                      //   "channelType": "f136ee37-b1c8-49d7-bd27-32f822432190",
                      //   "channelTypeName": "烟酒",
                      //   "terminalType": null,
                      //   "terminalTypeName": null,
                      //   "userId": null,
                      //   "userName": "用户1",
                      //   "roleId": null,
                      //   "roleName": null,
                      // }];
                      viewModel.BusiTemplateParent.setSimpleData(data.content, {unSelect: true});
                      viewModel.BusiTemplateParent.totalRow(data.totalElements);
                      viewModel.BusiTemplateParent.totalPages(data.totalPages);
                      $(".ui-list-panel-head").removeClass("operation");
                      viewModel.fixHeight();
                    }
                });
            },
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.BusiTemplateParent.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.BusiTemplateParent.pageSize(size);
                viewModel.search(true);
            },
            handleListRowSelect: function (obj) {
                var selectedRows = obj.gridObj.dataTable.getSelectedRows();
                var $list_head = $(".ui-list-panel-head");
                // 所有行反选，则列表头部显示查询区
                if (selectedRows.length == 0) {
                    $list_head.removeClass("operation");
                }
                // 存在行选中，则列表头部显示操作区
                else {
                    $list_head.hasClass("operation") ? '' : $list_head.addClass("operation");
                }
                viewModel.fixHeight();
            },
            //删除模板
            del: function() {
              common.dialog.confirmDialog({
                  msg1: '确认删除这些项？',
                  msg2: '此操作不可逆',
                  width: '400px',
                  type: 'error',
                  onOk: function () {
                    var ids = [];
                    var selectedRows = viewModel.BusiTemplateParent.getSelectedRows();
                    for(var i=0; i<selectedRows.length; i++) {
                      ids.push(selectedRows[i].getValue('id'));
                    }
                    $._ajax({
                      type: 'get',
                      url: viewModel.baseurl + '/del',
                      data: {
                        trantemplateId: ids.join(',')
                      },
                      success: function(data) {
                        if(data.success == "1") { //删除成功
                          viewModel.search();
                        }
                        else {  //删除失败
                          toastr.error(data.msg);
                        }
                      }
                    });
                  }
              });
            },
            //设置默认模板
            setDefaultTemplate: function() {
              var curRow = viewModel.BusiTemplateParent.getSelectedRows()[0];
              $._ajax({
                type: 'get',
                url: '/fmcg-dynamic-object/dynamic/trantemplates/default/set-default',
                data: {
                  trantemplateId: curRow.getValue('id'),
                },
                success: function(data) {
                  if(data.success == "1") {
                    viewModel.search();
                  }
                  else {
                    toastr.error(data.msg);
                  }
                }
              });
            },
            //折叠头部
            collapseHead: function() {
              $('.ui-template-head').addClass('collapsed');
            },
            //展开头部
            expandHead: function() {
              $('.ui-template-head').removeClass('collapsed');
            },
            //更新要显示的参照关联字段
            updateFocusRefrel: function(focusRow) {
              var refrelDt = focusRow.getValue('refrel');
              var selectRefrelDatas = viewModel.AllRefrel.getSimpleData({type: 'select'});
              refrelDt.setSimpleData(selectRefrelDatas);
            },
            //显示可选参照关联字段，并选中已配置参照关联字段
            showRefrel: function(focusRow) {
              var type = focusRow.getValue('type');
              if(type === "refer") {
                var refkey = focusRow.getValue('refkey');
                if(!refkey) {
                  return;
                }
                viewModel.refrelFocusRow = focusRow;
                viewModel.AllRefrel.removeAllRows();
                //请求参照可关联字段
                $._ajax({
                  type: 'get',
                  url: '/occ-base/base/ref-centers/query-ref-rel',
                  data: {
                    code: refkey
                  },
                  success: function(data) {
                    for(var i=0;i<data.length;i++) {
                      data[i].showLabel = data[i].label;
                    }
                    viewModel.AllRefrel.setSimpleData(data);
                    $('.ui-template-property-refrel').show();
                    //参照显示内容只能是"code"或"name"
                    var couldRefshowcontent = [];
                    data.forEach(function(refrelObj) {
                      (refrelObj.key === "name" || "code") && couldRefshowcontent.push(refrelObj);
                    });
                    var nameValues = common.dataconvert.toMap(couldRefshowcontent, "label", "key");
                    viewModel.refshowcontentSrc(nameValues);
                    var existRefshowcontent = focusRow.getValue("refshowcontent");
                    focusRow.setValue("refshowcontent","");
                    existRefshowcontent = existRefshowcontent || "name";
                    focusRow.setValue("refshowcontent", existRefshowcontent);
                    var selectedRefrelDt = focusRow.getValue('refrel');
                    viewModel.selectRefrel(viewModel.AllRefrel, selectedRefrelDt, "key");
                  }
                });
              }
            },
            //选中已显示参照关联字段
            selectRefrel: function(allDt, existDt, keyField) {
              var existMap = {};
              var existDatas = existDt.getSimpleData();
              for(var i=0; i<existDatas.length; i++) {
                existMap[existDatas[i][keyField]] = existDatas[i];
              }
              var allRows = allDt.getAllRows();
              for(var i=0; i<allRows.length;i++) {
                var keyValue = allRows[i].getValue(keyField);
                if(existMap[keyValue]) {
                  allDt.addRowSelect(allRows[i]);
                  allRows[i].setSimpleData(existMap[keyValue]);
                }
              }
            },
            //构建默认值表单
            buildDefaultValueForm: function(params) {
              var dataTable = params.dataTable;
              var rowId = params.rowId;
              var defaultValueReferWrap = params.defaultValueReferWrap;
              var focusRow = dataTable.getRowByRowId(rowId);
              var itemType = focusRow.getValue('type');
              if(itemType === "combo") {
                var enumkey = focusRow.getValue('enumkey');
                enumkey && enuminfo[enumkey] && enuminfo[enumkey].dataSource &&
                 viewModel.comboDefaultSrc(enuminfo[enumkey].dataSource);
              }
              else if(itemType === "refer" || itemType === "docrefer") {
                viewModel.DefaultValueDt = new u.DataTable(DefaultValueMeta);
                var curDefaultValueRow = viewModel.DefaultValueDt.createEmptyRow();
                viewModel.DefaultValueDt.setRowFocus(curDefaultValueRow);
                //显示已有默认值
                if(focusRow.getValue('defaultValue')) {
                  curDefaultValueRow.setValue("defaultValue", focusRow.getValue('defaultValue'));
                }
                //默认值参照变化时同步到字段项DataTable
                viewModel.DefaultValueDt.on('defaultValue.valuechange', (function(rowId, params) {
                  console.log("默认值更新, dataTable:", this, ", rowId:", rowId, ", params: ", params);
                  var defaultValueOfRow = this.getRowByRowId(rowId);
                  defaultValueOfRow.setValue('defaultValue', params.newValue);
                }).bind(dataTable, rowId));
                defaultValueReferWrap.innerHTML = viewModel.defaultValueReferTpl();
                if(itemType === "refer") {
                  var refkey = focusRow.getValue('refkey');
                  if(refkey && refinfo[refkey]) {
                    viewModel.DefaultValueDt.updateMeta({
                      defaultValue: {
                        refmodel: JSON.stringify(refinfo[refkey]),
                        refcfg: JSON.stringify({
                          ctx: "/uitemplate_web",
                        }),
                      }
                    });
                  }
                }
                else {
                  var docrefer_refcfg = {
                    ctx: "/uitemplate_web",
                    refCode: focusRow.getValue('refcode'),
                    refName: focusRow.getValue('refname'),
                  };
                  viewModel.DefaultValueDt.updateMeta({
                    defaultValue: {
                      refmodel: JSON.stringify(refinfo['custdocdef']),
                      refcfg: JSON.stringify(docrefer_refcfg),
                    }
                  });
                }
                ko.cleanNode(defaultValueReferWrap);
                u.createApp({
                  el: defaultValueReferWrap,
                  model: viewModel,
                });
              }
              else {
              }
            }
        }

        viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

        function afterRender() {
            //分配分组变更，清空分配分组下已经分配的维度
            viewModel.AllotGroup.on('valuechange', function(obj) {
              if(obj.field === "orgArea") {
                viewModel.orgAreaSrc().forEach(function(item) {
                  viewModel.TemplateAllot.setValue(item.value, "");
                });
              }
              else if(obj.field === "terminalProperty") {
                viewModel.terminalPropertySrc().forEach(function(item) {
                  viewModel.TemplateAllot.setValue(item.value, "");
                });
              }
              else if(obj.field === "customerProperty") {
                viewModel.customerPropertySrc().forEach(function(item) {
                  viewModel.TemplateAllot.setValue(item.value, "");
                });
              }
              else if(obj.field === "userRole") {
                viewModel.userRoleSrc().forEach(function(item) {
                  viewModel.TemplateAllot.setValue(item.value, "");
                });
              }
              else {
              }
            });
            //扩展字段的枚举、参照、自定义参照为互斥，类型为下拉，枚举有值；类型为参照，参照有值；类型为自定义档案参照，自定义档案参照有值
            viewModel.Extfield.on("type.valuechange", function(obj) {
              var curRow = viewModel.Extfield.getCurrentRow();
              curRow.setValue("enumkey", "");
              curRow.setValue("refkey", "");
              curRow.setValue("refid", "");
              curRow.setValue("refcode", "");
              curRow.setValue("refname", "");
            });


            //业务对象、业务类型联动
            viewModel.TemplateAllot.on('busiCatalog.valuechange', function(params) {
              //清空业务类型数据
              viewModel.TemplateAllot.setValue('busiType', "");
              var busiTypeReferIptId = "allotBusiTypeRefer";
              var busiTypeReferIpt = document.getElementById(busiTypeReferIptId);
              if(params.newValue) {//有值 => 业务类型可用，并追加选择值到业务类型参数中
                busiTypeReferIpt.removeAttribute('disabled');
                common.referUtil.addParams(busiTypeReferIptId, {
                  "EQ_busiobject": params.newValue
                });
              }
              else {//无值 => 业务类型不可用
                busiTypeReferIpt.setAttribute("disabled", "disabled");
              }
            });


            //操作区关闭 切换到查询区
            $(".ui-head-operation-close").on("click", function (e) {
                var $list_head = $(this).parents(".ui-list-panel-head");
                $list_head.removeClass("operation");
                viewModel.BusiTemplateParent.setAllRowsUnSelect();
            });



        }


        function appInit(element, params) {
            //配置模板可选业务对象
            $._ajax({
              type: 'get',
              url: '/occ-base/base/busiobjects/',
              dataType: 'json',
              data: {page: 0, size: 999},
              success: function(data) {
                viewModel.busiObjectSrc(common.dataconvert.toMap(data.content, "name", "code"));
              }
            })
            ko.cleanNode(element);
            //将模板页渲染到页面上
            element.innerHTML = tpl;
            viewModel.defaultValueReferTpl = Handlebars.compile(document.getElementById('defaultValueReferTpl').innerHTML);
            viewModel.tplEditorWrap = document.getElementById('tplEditorWrap');
            //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
            viewModel.app = u.createApp({
                el: element,
                model: viewModel
            });
            //只能选取任职组织
            var organizationId = localStorage.getItem('organizationId');
            if(organizationId) {
              common.referUtil.addParams("allotOrgRefer", {
                "EQ_id": organizationId,
              });
            }
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
