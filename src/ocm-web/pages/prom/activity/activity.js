define(
  [
      "text!./activity.html",
      "ocm_common",
      "ocm_baseview",
      "./meta.js",
      '../../flow/bpmapproveref/bpmopenbill.js',
      "ajaxfileupload",
      "ossupload",
      "interfaceFileImpl"
  ],
  function(tpl, common, baseview, model, bpmopenbill) {
      var BILLPANELSTATUS = {
          ADD: "add",
          EDIT: "edit",
          //  COPY: "copy",
          DETAIL: "detail",
          DEFAULT: "default"
      };
      var viewModel, fileDialog, currentPk, lssuedActivityDialog;

      var view = baseview.extend({
          beforeCreate: function() {
              viewModel = this.viewModel;
          },
          tpl: tpl,
          model: model,
          baseData: {
              baseurl: "/prom/activitys",
              applicationUrl: "/prom/activitys",
              attrValue: "/prom/acti-cust-ranges",
              ruleListValue: "/prom/activity-rulelists",
              ProAttrDocList: new u.DataTable(model.options.metas.ProductAttrmeta),
              // 列表、卡片可共用meta,但不能共用一个DataTable实例
              // ProAttrDocCard: new u.DataTable(model.options.metas.ProductAttrmeta),
              ProductAttrValueList: new u.DataTable(
                  model.options.metas.ProductAttrValuemeta
              ),
              ActivityRulelistList: new u.DataTable(
                  model.options.metas.ActivityRulelistmeta
              ),
              FileList: new u.DataTable(model.options.metas.FileMeta),
              lowerOrgList: new u.DataTable(model.options.metas.lowerOrgmeta),
              ActivityExcuteList: new u.DataTable(
                  model.options.metas.ActivityExcuteMeta
              ),
              searchcomp: {},
              searchSource: model.options.searchs.search1,
              button1Source: model.options.buttons.button1,
              button2Source: model.options.buttons.button2,
              button3Source: model.options.buttons.button3,
              button33Source: model.options.buttons.button33,

              button44Source: model.options.buttons.button44,
              detail1Source: model.options.details.detail1,
              // button4Source: model.options.buttons.button4,
              button4Source: ko.observableArray(model.options.buttons.button4),
              button5Source: model.options.buttons.button5,
              card1Source: model.options.cards.card1,
              card2Source: model.options.cards.card2,
              grid1Option: model.options.grids.grid1,
              grid2Option: model.options.grids.grid2,
              grid22Option: model.options.grids.grid22,
              grid222Option: model.options.grids.grid222,
              grid3Option: model.options.grids.grid3,
              grid33Option: model.options.grids.grid33,
              grid4Option: model.options.grids.grid4,
              grid5Option: model.options.grids.grid5,
              //对话框
              dialogcardcomp: {},
              //批量新增客户
              custNum: 0,
              excuteRules: ko.observableArray(),
              // [{"name":"规则1","hrefValue":"#tab-panel-1","ruleId":"tab-panel-1"},
              // {"name":"规则2","hrefValue":"#tab-panel-2","ruleId":"tab-panel-2"}],
              dialogcardSource: model.options.dialogs.dialog1,

              billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
              state: ko.pureComputed(function() {
                  var state = viewModel.ProAttrDocList.ref("state")();
                  state = parseInt(state);
                  switch (state) {
                      case 0:
                          return "待处理";
                      case 1:
                          return "已提交";
                      case 2:
                          return "审批中";
                      case 3:
                          return "审批通过";
                      case 4:
                          return "审批不通过";
                      default:
                  }
              }),
              //TODO: 枚举值
              activityStatusSrc: [{
                  value: "0",
                  name: "保存"
              }, {
                  value: "1",
                  name: "生效"
              }, {
                  value: "2",
                  name: "终止"
              }],

              isMutualSrc: [{
                  name: "启用互斥规则",
                  value: "1"
              }],
              buyGiftOrderSrc: [{
                  name: "买赠-基于订单金额",
                  value: "1"
              }],
              fullCutOrderSrc: [{
                  name: "降价-基于订单金额",
                  value: "1"
              }],
              buyGiftProductSrc: [{
                  name: "买赠-基于商品金额/数量",
                  value: "1"
              }],
              fullCutProductSrc: [{
                  name: "降价-基于商品金额/数量",
                  value: "1"
              }],
              approveFormat: function() {
                  viewModel.ProAttrDocList.getValue("approveStatus");
              },
              isAllCustomerFormat: ko.pureComputed(function() {
                  var curbillstatus = viewModel.ProAttrDocList.ref("isAllCustomer")();
                  if (curbillstatus == 1) {
                      return "是";
                  }
                  if (curbillstatus == 0) {
                      return "否";
                  }
              }),
              //复写
              goBillPanel: function() {
                  // $(".ui-list-panel").hide();
                  $(".ui-panel").hide();
                  $(".ui-bill-panel-main").show();
                  $(".ui-bill-panel").animateCss("fadeIn");
              },

              //详情跳转单据页
              detail2bill: function() {
                  var row = viewModel.ProAttrDocList.getCurrentRow();
                  if (row.getValue("state") != 0) {
                      toastr.warning("不处于待处理的单据不能编辑");
                      return;
                  }
                  // $(".ui-bill-detail").hide();
                  $(".ui-panel").hide();
                  $(".ui-bill-panel").show();
                  $(".ui-bill-panel").animateCss("fadeIn");
              },
              //返回列表页
              retListPanel: common.bill.retListPanel,
              treeSetting: {
                  check: {
                      enable: true,
                      chkStyle: "checkbox",
                      chkboxType: {
                          Y: "ps",
                          N: "ps"
                      }
                  },
                  ata: {
                      keep: {
                          parent: false
                      }
                  },
                  view: {
                      showLine: true,
                      multiSelect: true
                  }
              }
          },
          rendertype: {
              // operation: common.rendertype.operation,
              //主子表操作
              approveStateRender: function(obj) {
                  var showValue = "";
                  switch (parseInt(obj.value)) {
                      case 0:
                          showValue = "待处理";
                          break;
                      case 1:
                          showValue = "已提交";
                          break;
                      case 2:
                          showValue = "审批中";
                          break;
                      case 3:
                          showValue = "审批通过";
                          break;
                      case 4:
                          showValue = "审批不通过";
                          break;
                      default:
                          showValue = "";
                          break;
                  }
                  obj.element.innerHTML = showValue;
              },
              operation: function(obj) {
                  var viewModel = obj.gridObj.viewModel;
                  var dataTableRowId = obj.row.value["$_#_@_id"];
                  var delfun =
                      "data-bind=click:del.bind($data," +
                      obj.rowIndex +
                      "," +
                      dataTableRowId +
                      ")";
                  var uploadfun =
                      "data-bind=click:uploadFileDialog.bind($data," +
                      obj.rowIndex +
                      "," +
                      dataTableRowId +
                      ")";
                  var editfun =
                      "data-bind=click:showEditBillPanel.bind($data," +
                      obj.rowIndex +
                      "," +
                      dataTableRowId +
                      ")";
                  /*  //生效
                   var effectivefun =
                    "data-bind=click:effective.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                  //下发
                   var lssuedfun =
                    "data-bind=click:lssuedActivityDialog.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";*/
                  obj.element.innerHTML =
                      '<div class="ui-handle-icon">' +
                      '<span class="ui-handle-word">' +
                      '<a href="#" ' +
                      editfun +
                      ' title="编辑">编辑</a>' +
                      "</span>    " +
                      '<span class="ui-handle-word">' +
                      '<a href="#" ' +
                      uploadfun +
                      ' title="上传附件">上传附件</a>' +
                      "</span>    " +
                      '<span class="ui-handle-word">' +
                      '<a href="#" ' +
                      delfun +
                      ' title="删除">删除</a>' +
                      "</span></div>";
                  ko.cleanNode(obj.element);
                  ko.applyBindings(viewModel, obj.element);
              },
              customerChangeOp: function(obj) {
                  var viewModel = obj.gridObj.viewModel;
                  var dataTableRowId = obj.row.value["$_#_@_id"];
                  var cancleCustfun =
                      "data-bind=click:cancleCustfun.bind($data," +
                      obj.rowIndex +
                      "," +
                      dataTableRowId +
                      ")";
                  var regainCustfun =
                      "data-bind=click:regainCustfun.bind($data," +
                      obj.rowIndex +
                      "," +
                      dataTableRowId +
                      ")";
                  var stopCustfun =
                      "data-bind=click:stopCustfun.bind($data," +
                      obj.rowIndex +
                      "," +
                      dataTableRowId +
                      ")";
                  /*  //生效
                   var effectivefun =
                    "data-bind=click:effective.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";
                  //下发
                   var lssuedfun =
                    "data-bind=click:lssuedActivityDialog.bind($data," +
                    obj.rowIndex +
                    "," +
                    dataTableRowId +
                    ")";*/
                  obj.element.innerHTML =
                      '<div class="ui-handle-icon">' +
                      '<span class="ui-handle-word">' +
                      '<a href="#" ' +
                      stopCustfun +
                      ' title="停止">停止</a>' +
                      "</span>    " +
                      '<span class="ui-handle-word">' +
                      '<a href="#" ' +
                      regainCustfun +
                      ' title="恢复">恢复</a>' +
                      "</span>    " +
                      '<span class="ui-handle-word">' +
                      '<a href="#" ' +
                      cancleCustfun +
                      ' title="终止">终止</a>' +
                      "</span></div>";
                  ko.cleanNode(obj.element);
                  ko.applyBindings(viewModel, obj.element);
              },
              statusRender: function(params) {
                  /*默认0表示保存，1表示生效，2表示中止*/
                  if (params.value == 0) {
                      params.element.innerHTML = "保存";
                  }
                  if (params.value == 1) {
                      params.element.innerHTML = "生效";
                  }
                  if (params.value == 2) {
                      params.element.innerHTML = "终止";
                  }
              },
              customerStatusRender: function(params) {
                  if (params.value == 0) {
                      params.element.innerHTML = "正常态";
                  }
                  if (params.value == 1) {
                      params.element.innerHTML = "停止态";
                  }
                  if (params.value == 2) {
                      params.element.innerHTML = "作废态";
                  }
              },
              ruleViewRender: function(obj) {
                  var viewModel = obj.gridObj.viewModel;
                  var rowId = obj.row.value["$_#_@_id"];
                  var isShow = obj.row.value.isShow;
                  var detailfun = "data-bind=click:viewRule.bind($data," + rowId + ","+ isShow +")";
                  obj.element.innerHTML =
                      '<a href="#" class="ui-a-detail" ' +
                      detailfun +
                      ">" +
                      obj.value +
                      "</a>";
                  ko.cleanNode(obj.element);
                  ko.applyBindings(viewModel, obj.element);
              },
              detailRender: common.rendertype.detailRender,
              //订单类型的互斥规则的显示内容监听
              orderMutualRuleObserve: ko.observable(0),
              //商品类型的互斥规则的显示内容监听
              proMutualRuleObserve: ko.observable(0)
          },
          events: {
              // 重新触发单选框
              createRadioComp: function (type) {
                $("#isAllCustomerDomId" + type).each(function (index, ele) {
                  var options = JSON.parse(ele.getAttribute('u-meta'));
                  if (!options.id) {
                    options.id = Math.random();
                  }
                  // 对单选框特殊处理
                  if (options['type'] == 'u-radio') {
                    var field = options['field'];
                    ele.innerHTML = '<label class="u-radio margin-right-15">' +
                      '<input type="radio" class="u-radio-button" name="' + field + '" />' +
                      '<span class="u-radio-label"></span>' +
                      '</label>';
                  }
                  options['type'] = options['type'] || 'string';
                  if (options && options['type']) {
                    var comp = u.compMgr.createDataAdapter({
                      el: ele,
                      options: options,
                      model: viewModel,
                      app: viewModel.app
                    });
                    ele['u-meta'] = comp;
                    viewModel.app.comps.push(comp);
                  }
                });
              },
              //提交
              submitBtn: function(obj) {
                  var listCompId = "ProAttrDocList";
                  var nodeJs = "/ocm-web/pages/prom/activity/activity.js";
                  var billTypeCode = "Activity";
                  var tranTypeCode = null;
                  var callback = null;
                  viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
              },

              unsubmitBtn: function() {
                  var listCompId = "ProAttrDocList";
                  var billTypeCode = "Activity";
                  var tranTypeCode = null;
                  var callback = null;
                  viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
              },
              // 审批通过
              approve: function() {
                  var listCompId = "ProAttrDocList";
                  var billTypeCode = "Activity";
                  var tranTypeCode = null;
                  var withBpmCallback = function() {
                      viewModel.detail();
                  };
                  var withoutBpmCallback = null;
                  viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                      withoutBpmCallback);
              },

              // 审批不通过
              disapprove: function() {
                  var listCompId = "ProAttrDocList";
                  var billTypeCode = "Activity";
                  var tranTypeCode = null;
                  var withBpmCallback = function() {
                      viewModel.detail();
                  };
                  var withoutBpmCallback = null;
                  viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                      withoutBpmCallback);
              },

              unapprove: function() {
                  var listCompId = "ProAttrDocList";
                  var billTypeCode = "Activity";
                  var tranTypeCode = null;
                  var withBpmCallback = function() {
                      viewModel.detail();
                  };
                  var withoutBpmCallback = null;
                  viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
                      withoutBpmCallback);
              },
              //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
              search: function(reindex) {
                  if (reindex) {
                      viewModel.ProAttrDocList.pageIndex(0);
                  }
                  viewModel.ProAttrDocList.removeAllRows();
                  var queryData = viewModel.searchcomp.getDataWithOpr ?
                      viewModel.searchcomp.getDataWithOpr() : {};
                  var pageSize = viewModel.ProAttrDocList.pageSize();
                  var pageNumber = viewModel.ProAttrDocList.pageIndex();
                  queryData.size = pageSize;
                  queryData.page = pageNumber;
                  $._ajax({
                      type: "get",
                      url: appCtx + viewModel.baseurl,
                      dataType: "json",
                      data: queryData,
                      success: function(data) {
                          viewModel.ProAttrDocList.setSimpleData(data.content, {
                              unSelect: true
                          });
                          viewModel.ProAttrDocList.totalRow(data.totalElements);
                          viewModel.ProAttrDocList.totalPages(data.totalPages);
                      }
                  });
              },
              detail: function() {
                  //类型为checkbox的几个容器不可编辑

                  var isMutualIdBox = viewModel.app.getComp("isMutualId");
                  isMutualIdBox.setEnable(false);
                  var isBuyGiftOrderIdBox = viewModel.app.getComp("isBuyGiftOrderId");
                  isBuyGiftOrderIdBox.setEnable(false);
                  var isFullCutOrderIdBox = viewModel.app.getComp("isFullCutOrderId");
                  isFullCutOrderIdBox.setEnable(false);
                  var isBuyGiftProductIdBox = viewModel.app.getComp(
                      "isBuyGiftProductId"
                  );
                  isBuyGiftProductIdBox.setEnable(false);
                  var isFullCutProductIdBox = viewModel.app.getComp(
                      "isFullCutProductId"
                  );
                  
                  //确保grid先将行设置为focus状态
                  setTimeout(function() {
                    var id = viewModel.ProAttrDocList.getCurrentRow().getValue("id");
                    viewModel.initBPMFromBill(id, viewModel);
                    isFullCutProductIdBox.setEnable(false);
                    viewModel.goDetailPanel();
                  }, 0);
              },
              //作废客户
              cancleCustfun: function(index) {
                  viewModel.ProductAttrValueList.setRowFocus(index);
                  viewModel.ProductAttrValueList.getCurrentRow().setValue("customerStatus", "2");
              },
              //恢复客户
              regainCustfun: function(index) {
                  viewModel.ProductAttrValueList.setRowFocus(index);
                  viewModel.ProductAttrValueList.getCurrentRow().setValue("customerStatus", "0");
              },
              //停止客户
              stopCustfun: function(index) {
                  viewModel.ProductAttrValueList.setRowFocus(index);
                  viewModel.ProductAttrValueList.setValue("customerStatus", "1");
                  // var grid = viewModel.app.getComp("grid_complexItem_222").grid;
                  // grid.repaintGridDivs();
              },
              //查看规则页面
              viewRule: function(rowId, flag) {
                  var selectRow = viewModel.ActivityRulelistList.getRowByRowId(rowId);
                  var ruleId = selectRow.getValue("ruleId");
                  var ruleContent = $("#ruleContent")[0];
                  var type = "viewRule";
                  var state = viewModel.ProAttrDocList.getCurrentRow().getValue("state");
                  if (flag == 0 && state == 0) {
                    type = "activityRuleEdit";
                  }
                  var params = {
                      src: type,
                      ruleId: ruleId,
                      callback: viewModel.viewRuleCallBack
                      // callback:viewModel.viewRuleR,
                  };
                  window.require(
                      ["/ocm-web/pages/prom/promotionrules/promotionrules.js"],
                      function(module) {
                          ko.cleanNode(ruleContent);
                          ruleContent.innerHTML = "";
                          module.init(ruleContent, params);
                      }
                  );
                  $("#ruleContent").show();

                  $("#bodyDiv").hide();
                  $(".ui-bill-detail-main").hide();
              },
              goDetailPanel: function() {
                  // $(".ui-list-panel").hide();
                  $(".ui-panel").hide();
                  $(".ui-bill-detail-main").show();
                  $(".ui-bill-detail-main").animateCss("fadeIn");
                  var currentData = viewModel.ProAttrDocList.getFocusRow().getSimpleData();
                  // $._ajax({
                  //   url: appCtx + viewModel.baseurl + '/findByPersonId',
                  //   type: "get",
                  //   data: { personId: currentData.id },
                  //   contentType: "application/json; charset=utf-8",
                  //   success: function (data) {
                  //     debugger
                  //     viewModel.postList.setSimpleData(data);
                  //   }
                  // })
                  viewModel.findByParentid(currentData.id);
              },
              //客户范围编辑前事件监听：客户，客户分类，渠道类型，客户级别只能选择一个值
              custRangeBeforeEdit: function(obj) {
                  var colIndex = obj.colIndex;
                  var rowIndex = obj.rowIndex;
                  //客户值
                  var custId = viewModel.ProductAttrValueList.getRow(rowIndex).getValue(
                      "custId"
                  );

                  //客户分类值
                  var custCateId = viewModel.ProductAttrValueList.getRow(
                      rowIndex
                  ).getValue("custCateId");
                  //渠道类型
                  var channelTypeId = viewModel.ProductAttrValueList.getRow(
                      rowIndex
                  ).getValue("channelTypeId");
                  //客户级别
                  var custLevelId = viewModel.ProductAttrValueList.getRow(
                      rowIndex
                  ).getValue("custLevelId");
                  //市场区域
                  var marketAreaId = viewModel.ProductAttrValueList.getRow(
                      rowIndex
                  ).getValue("marketAreaId");
                  if(colIndex == 0){
                      var row = viewModel.ProAttrDocList.getSelectedRows();
                      if(!row[0].getValue("saleOrgId")){
                          toastr.warning("请先选择销售组织");
                          return false;
                      }
                  }
                  if (colIndex == 0 && custId) {
                      return true;
                  }
                  if (colIndex == 0 && (custCateId || channelTypeId || custLevelId||marketAreaId)) {
                      return false;
                  }

                  if (colIndex == 1 && custCateId) {
                      return true;
                  }
                  if (colIndex == 1 && (custId || channelTypeId || custLevelId||marketAreaId)) {
                      return false;
                  }

                  if (colIndex == 2 && channelTypeId) {
                      return true;
                  }
                  if (colIndex == 2 && (custCateId || custId || custLevelId||marketAreaId)) {
                      return false;
                  }

                  if (colIndex == 3 && custLevelId) {
                      return true;
                  }
                  if (colIndex == 3 && (custCateId || custId || custLevelId||marketAreaId)) {
                      return false;
                  }
                  if (colIndex == 4 && marketAreaId) {
                      return true;
                  }
                  if (colIndex == 4 && (custCateId || custId || custLevelId||marketAreaId)) {
                      return false;
                  }
                  return true;
              },
              changeCustomerEditFun: function(obj) {

                  var rowIndex = obj.rowIndex;
                  //客户值
                  var id = viewModel.ProductAttrValueList.getRow(rowIndex).getValue(
                      "id"
                  );
                  if (id == null) {
                      return viewModel.custRangeBeforeEdit(obj);

                  } else {
                      return false;
                  }


              },
              //清空搜索条件
              cleanSearch: function() {
                  viewModel.searchcomp.clearSearch();
              },
              //页码改变时的回调函数
              pageChange: function(index) {
                  viewModel.ProAttrDocList.pageIndex(index);
                  viewModel.search();
              },
              //页码改变时的回调函数
              sizeChange: function(size) {
                  viewModel.ProAttrDocList.pageSize(size);
                  viewModel.search();
              },
              //进入新增单据页
              showAddBillPanel: function() {
                  viewModel.ProAttrDocList.removeAllRows();
                  var curRow = viewModel.ProAttrDocList.createEmptyRow();
                  //设置默认值：是否全部客户为是
                  curRow.setValue("isAllCustomer", 1);
                  viewModel.ProAttrDocList.setRowFocus(curRow);
                  viewModel.ProductAttrValueList.removeAllRows();
                  viewModel.ActivityRulelistList.removeAllRows();
                  viewModel.createRadioComp("1");
                  viewModel.goBillPanel();
                  viewModel.ProductAttrValueList.clear();
                  $(".product-choose-result").show();
                  $(".product-choose-content").show();
                  $(".pagelever").hide();
                  $(".product-choose-content").show();
                  viewModel.button4Source(model.options.buttons.button4);
                  viewModel.app
                      .getComp("grid_complexRuleItem")
                      .grid.setEditable(true);
                  $(".product-choose-result").addClass("open");
                  viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
              },
              //进入修改单据页
              showEditBillPanel: function(index) {
                  viewModel.ProAttrDocList.setRowFocus(index);
                  var id = viewModel.ProAttrDocList.getValue("id");
                  viewModel.ProAttrDocList.originEditData = viewModel.ProAttrDocList.getFocusRow().getSimpleData();
                  if ( //viewModel.ProAttrDocList.originEditData["activityStatusCode"] == 0 &&
                      viewModel.ProAttrDocList.originEditData["state"] == 0) {
                      viewModel.findByParentid(id);
                      viewModel.createRadioComp("1");
                      var saleOrgId = viewModel.ProAttrDocList.getValue("saleOrgId");
                      viewModel.ProductAttrValueList.meta.custId.refparam = '{"EQ_isEnable":"1","EQ_isChannelCustomer":"1","EQ_SaleOrder":"' + saleOrgId + '"}';
                      viewModel.goBillPanel();
                      viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
                  } else {
                      toastr.error("只有待处理状态才可以编辑");
                  }
              },
              //导入
              importHandle: function() {
                  var urlInfo = "/prom/activity-excel/excelDataImport"; //导入地址参数
                  var urlStatusInfo = "/prom/activity-excel/excelLoadingStatus"; //请求进度地址参数
                  var ele = $("#importFiel")[0]; //挂载元素
                  common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
              },
              //导出
              exportHandle: function() {
                  var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
                  var templateUrl = "/prom/activity-excel/downloadExcelTemplate"; //导出模板地址参数
                  var excelDataUrl = "/prom/activity-excel/excelDataExport"; //导出数据地址参数
                  var listData = viewModel.ProAttrDocList; //需要导出表格的dataTable
                  var ele = $('#exportFiel')[0]; //挂载元素
                  common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
              },
              //生效
              effective: function() {
                  var row = viewModel.ProAttrDocList.getSelectedRows();
                  if (row == null || row.length == 0) {
                      toastr.error("请选择一行");
                      return;
                  }
                  if (row.length == 1 && row[0].getValue("activityStatusCode") == 1) {
                      toastr.warning("该活动已生效");
                      return;
                  }
                  var ids = [];
                  if (row && row.length > 0) {
                      for (var i = 0; i < row.length; i++) {
                          if (row[i].getValue("state") != 3) {
                              toastr.warning("存在尚未审批通过的活动，请处理！");
                              return;
                          }
                          if (row[i].getValue("activityStatusCode") == 2) {
                              toastr.warning("存在已经终止的活动，不可以再次生效，请处理！");
                              //return;
                          }
                      }
                      for (var i = 0; i < row.length; i++) {
                          if (row[i].getValue("state") == 3 && row[i].getValue("activityStatusCode") != 1) {
                              ids.push(row[i].getValue("id"));
                          }
                      }
                  }
                  /*if (row == null || row.length == 0 || row.length > 1) {
                      toastr.error("请选择一行");
                      return;
                  }
                  if (row[0].getValue("state") != 3) {
                      toastr.warning("只有审批通过的活动才能生效");
                      return;
                  }
                  if (row[0].getValue("activityStatusCode") ==1 ) {
                      toastr.warning("该活动已生效");
                      return;
                  }*/
                  /*  var id = viewModel.ProAttrDocList.getSelectedRows()[0].getSimpleData()[
                        "id"
                        ];*/
                  $._ajax({
                      url: appCtx + viewModel.baseurl + "/effective",
                      type: "post",
                      async: false,
                      data: {
                          id: ids.join(",")
                      },
                      success: function(data) {
                          //viewModel.ProAttrDocList.setValue("activityStatusCode", "1");
                          for (var i = 0; i < row.length; i++) {
                              if (row[i].getValue("state") == 3 && row[i].getValue("activityStatusCode") != 1) {
                                  row[i].setValue("activityStatusCode", "1");
                              }
                          }
                      }
                  });
              },
              //中止
              terminalFun: function() {
                  var row = viewModel.ProAttrDocList.getSelectedRows();
                  if (row == null || row.length == 0) {
                      toastr.error("请选择一行");
                      return;
                  }
                  for (var i = 0; i < row.length; i++) {
                      var activityStatusCode = viewModel.ProAttrDocList.getSelectedRows()[i].getSimpleData()[
                          "activityStatusCode"
                      ];
                      if (activityStatusCode == 1) {
                          var id = viewModel.ProAttrDocList.getSelectedRows()[i].getSimpleData()[
                              "id"
                          ];
                          $._ajax({
                              url: appCtx + viewModel.baseurl + "/terminal",
                              type: "post",
                              async: false,
                              data: {
                                  id: id
                              },
                              success: function(data) {
                                  viewModel.ProAttrDocList.getSelectedRows()[i].setValue("activityStatusCode", "2");
                                  // viewModel.ProAttrDocList.setValue("activityStatusCode", "2");
                              }
                          });
                      } else {
                          // toastr.error("只有生效态的才可以终止");
                      }
                  }
              },
              changeActivity: function(index) {
                var row = viewModel.ProAttrDocList.getSelectedRows();
                if (row == null || row.length == 0 || row.length > 1) {
                    toastr.error("请选择一行");
                    return;
                }
                // var activityStatusCode = viewModel.ProAttrDocList.getSelectedRows()[0].getSimpleData()[
                //     "activityStatusCode"
                // ];

                // viewModel.ProAttrDocList.setRowFocus(index);
                var id = row[0].getValue("id");
                var activityStatusCode = row[0].getValue("activityStatusCode");
                // var id = viewModel.ProAttrDocList.getSelectedRows()[0].getSimpleData()[
                //     "id"
                // ];
                if (activityStatusCode == 1) {
                    viewModel.findByParentid(id);
                    var saleOrgId = viewModel.ProAttrDocList.getValue("saleOrgId");
                    viewModel.ProductAttrValueList.meta.custId.refparam = '{"EQ_isEnable":"1","EQ_isChannelCustomer":"1","EQ_SaleOrder":"' + saleOrgId + '"}';
                    viewModel.createRadioComp("2");
                    $(".ui-panel").hide();
                    $(".ui-bill-change").show();
                    viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
                } else {
                    toastr.error("只有生效态的才可以变更");
                }
                // $("#productBase").hide();
                // $("#changeCard").show();
              },
              //查看该活动的执行结果
              viewExcuteResult: function() {
                  var row = viewModel.ProAttrDocList.getSelectedRows();
                  if (row == null || row.length == 0 || row.length > 1) {
                      toastr.error("请选择一行活动");
                      return;
                  }
                  var actviityId = row[0].getSimpleData()["id"];
                  //给excuteRules 赋值
                  $._ajax({
                     // url: appCtx + viewModel.baseurl + "/findRules",
                      url: appCtx + viewModel.baseurl + "/findExcuteResultByActviity",
                      type: "get",
                      async: false,
                      data: {
                          activityId: actviityId
                      },
                      success: function(data) {
                          viewModel.excuteRules.removeAll();
                          for (var i = 0; i < data.length; i++) {
                              viewModel.excuteRules.push(data[i]);
                          }
                          viewModel.ActivityExcuteList.setSimpleData(data);
                      }
                  });
                  //监听切换tab页签,重新查询value值
                  $(".u-tabs__tab").on("click", function(e) {
                      var ruleId = e.currentTarget.getAttribute("ruleid");
                      //给当前选中的标签高亮，其他标签不高亮
                      for (var i = 0; i < $(".u-tabs__tab").length; i++) {
                          $($(".u-tabs__tab")[i]).removeClass("is-active");
                      }
                      $(e.currentTarget).addClass("is-active");
                      viewModel.changeExcuteListCompByRule(ruleId);
                      var rows = viewModel.ProAttrDocList.getSelectedRows();
                      var activityId = rows[0].getSimpleData()["id"];
                      $._ajax({
                          url: appCtx +
                              viewModel.baseurl +
                              "/findExcuteResultByActviityAndRuleId",
                          type: "get",
                          async: false,
                          data: {
                              ruleId: ruleId,
                              activityId: activityId
                          },
                          success: function(data) {
                              viewModel.ActivityExcuteList.setSimpleData(data);
                          }
                      });
                  });

                  if (
                      viewModel.excuteRules() == null ||
                      viewModel.excuteRules().length == 0
                  ) {
                      toastr.warning("该活动尚未执行过");
                      return;
                  }

                  //弹出框
                  var viewExcuteDialog = u.dialog({
                      id: "dialog_view_excute",
                      content: "#dialog_view_excute",
                      width: "1000px",
                      height: "1000px"
                  });
              },
              //根据规则值设置执行结果的列显示和隐藏
              changeExcuteListCompByRule: function(ruleId) {
                  $._ajax({
                      url: appCtx + "/prom/rules/getRulePromWayAndPromBench",
                      type: "get",
                      async: false,
                      data: {
                          ruleId: ruleId
                      },
                      success: function(data) {
                          var promway = data[0];
                          var bench = data[1];
                          //促销方式是降价
                          if (promway == 1) {
                              //设置匹配商品列的隐藏,赠品列的显示
                              viewModel.setGiftMatchColumnVisible(true, false);
                          } else {
                              //基准是订单金额，则都隐藏
                              if (bench == 3) {
                                  viewModel.setGiftMatchColumnVisible(false, false);
                              } else {
                                  //设置赠品列的隐藏,匹配商品列的显示
                                  viewModel.setGiftMatchColumnVisible(false, true);
                              }
                          }
                      }
                  });
              },
              setGiftMatchColumnVisible: function(isGiftVisible, isMatchVisible) {
                  var matchNameColumn = viewModel.app
                      .getComp("grid_excute_list")
                      .grid.getColumnByField("matchName");
                  viewModel.app
                      .getComp("grid_excute_list")
                      .grid.setColumnVisibleByColumn(matchNameColumn, isMatchVisible);
                  var giftColumn = viewModel.app
                      .getComp("grid_excute_list")
                      .grid.getColumnByField("giftName");
                  viewModel.app
                      .getComp("grid_excute_list")
                      .grid.setColumnVisibleByColumn(giftColumn, true);
              },
              //打开上传对话框，上传附件
              uploadFileDialog: function(index) {
                  viewModel.ProAttrDocList.setRowFocus(index);
                  var id = viewModel.ProAttrDocList.getValue("id");
                  currentPk = id;
                  viewModel.fileQuery(id);
                  // if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
                  //   $("#file-dialog .ui-file-btns").hide();
                  // }
                  // else {
                  //   $("#file-dialog .ui-file-btns").show();
                  // }
                  if (!fileDialog) {
                      fileDialog = u.dialog({
                          content: "#file-dialog",
                          hasCloseMenu: true
                      });
                  } else {
                      fileDialog.show();
                  }
              },
              onOpenUploadWin: function() {
                  $("#uploadbatch_id").val(undefined);
                  $("#uploadbatch_id").trigger("click");
              },
              //上传附件
              onFileUpload: function() {
                  var pk = currentPk;

                  var par = {
                      fileElementId: "uploadbatch_id",
                      //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
                      filepath: pk,
                      //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                      groupname: "ygdemo",
                      //【必填】分組名称,未来会提供树节点
                      permission: "read",
                      //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
                      url: true,
                      //【选填】是否返回附件的连接地址，并且会存储到数据库
                      //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
                      cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                  };
                  var f = new interface_file();
                  f.filesystem_upload(par, viewModel.fileUploadCallback);
              },
              //上传文件回传信息
              fileUploadCallback: function(data) {
                  if (1 == data.status) {
                      //上传成功状态
                      viewModel.FileList.addSimpleData(data.data);
                      //  toastr.success();
                  } else {
                      //error 或者加載js錯誤
                      toastr.error(data.message);
                  }
              },
              fileQuery: function(pk) {
                  var par = {
                      //建议一定要有条件否则会返回所有值
                      filepath: pk,
                      //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
                      groupname: "ygdemo",
                      //【选填】[分組名称,未来会提供树节点]
                      cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                  };
                  var f = new interface_file();
                  f.filesystem_query(par, viewModel.fileQueryCallBack);
              },
              fileQueryCallBack: function(data) {
                  if (1 == data.status) {
                      //上传成功状态
                      viewModel.FileList.setSimpleData(data.data);
                  } else {
                      //删除成功后查询
                      if (data.status == 0 && !data.data) {
                          viewModel.FileList.setSimpleData([]);
                      }
                  }
              },
              //下载
              fileDownload: function() {
                  var row = viewModel.FileList.getSelectedRows();
                  if (row == null || row.length == 0 || row.length > 1) {
                      toastr.error("请选择一个附件");
                      return;
                  }
                  for (var i = 0; i < row.length; i++) {
                      var pk = row[i].getValue("id");
                      var form = $("<form>"); //定义一个form表单
                      form.attr("style", "display:none"); //在form表单中添加查询参数
                      form.attr("target", "");
                      form.attr("enctype", "multipart/form-data");
                      form.attr("method", "post");
                      form.attr(
                          "action",
                          window.ctxfilemng +
                          "file/download?permission=write&stream=false&id=" +
                          pk
                      );
                      $("#file-dialog").append(form); //将表单放置在web中
                      form.submit();
                  }
              },
              //附件删除
              fileDelete: function() {
                  var row = viewModel.FileList.getSelectedRows();
                  if (row == null || row.length == 0 || row.length > 1) {
                      toastr.error("请选择一个附件");
                      return;
                  }
                  for (var i = 0; i < row.length; i++) {
                      var pk = row[i].getValue("id");
                      var par = {
                          id: pk,
                          //【必填】表的id
                          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
                      };
                      var f = new interface_file();
                      f.filesystem_delete(par, viewModel.fileDeleteCallBack);
                  }
              },
              //附件删除回调
              fileDeleteCallBack: function(data) {
                  if (1 == data.status) {
                      //上传成功状态
                      viewModel.fileQuery(currentPk);
                  } else {
                      toastr.error(data.message);
                  }
              },
              //查看
              fileView: function() {
                  var row = viewModel.FileList.getSelectedRows();
                  if (row == null || row.length == 0 || row.length > 1) {
                      toastr.error("请选择一个附件");
                      return;
                  }
                  for (var i = 0; i < row.length; i++) {
                      var url = row[i].getValue("url");
                      parent.open(location.origin + url);
                  }
              },
              //下发功能
              lssuedActivityFun: function(index) {
                  //校验是否选择行
                  var row = viewModel.ProAttrDocList.getSelectedRows();
                  if (row == null || row.length == 0 || row.length > 1) {
                      toastr.error("请选择一行");
                      return;
                  }
                  if (row[0].getValue("state") != 3) {
                      toastr.warning("只有审批通过的活动才能下发");
                      return;
                  }
                  //取得当前的组织值，取得组织的下级以及本身，加载到树当中，并且展开组织树
                  var saleOrg = row[0].getSimpleData()["saleOrgId"];
                  viewModel.fillOrgTree(saleOrg);
              },
              lssuedActivityDialogOpen: function() {
                  lssuedActivityDialog = u.dialog({
                      id: "dialog_content_product",
                      content: "#dialog_content_product",
                      width: "500px",
                      height: "400px"
                  });

                  var okButton = $("#dialog_content_product .u-msg-ok");
                  okButton.unbind("click").click(function(row) {
                      var saleOrgs = "";
                      var allCheckNodes = $.fn.zTree
                          .getZTreeObj("billtype")
                          .getCheckedNodes(true);
                      // 特殊处理，只默认手动点击勾选的
                      var newAllCheckNodes = (allCheckNodes || []).filter(function(node) {
                        return $("#" + node.tId + "_check").hasClass("checkbox_true_full");
                      });
                      if (newAllCheckNodes != null && newAllCheckNodes.length != 0) {
                          for (var i = 0; i < newAllCheckNodes.length; i++) {
                              saleOrgs = saleOrgs + newAllCheckNodes[i]["id"] + ",";
                          }
                          saleOrgs = saleOrgs.substr(0, saleOrgs.length - 1);
                          viewModel.lssuedActivity(saleOrgs);
                      }
                  });
                  var cancelButton = $("#dialog_content_product .u-msg-cancel");
                  cancelButton.unbind("click").click(function() {
                      lssuedActivityDialog.close();
                  });
              },
              //填充组织值
              fillOrgTree: function(saleOrg) {
                  // var fefefef=[{"id":"1","parentId":null,"name":"第一层"},{"id":"11","parentId":"1","name":"第二层"},{"id":"12","parentId":"1","name":"第三层"}];
                  $._ajax({
                      url: appCtx + viewModel.baseurl + "/getChildrenById",
                      type: "get",
                      async: false,
                      data: {
                          saleOrg: saleOrg
                      },
                      success: function(data) {
                          if (data != null && data.length != 0) {
                              viewModel.lowerOrgList.setSimpleData(data);
                              viewModel.lssuedActivityDialogOpen();
                          } else {
                              toastr.error("此销售组织没有下级");
                          }
                      }
                  });

                  //展开组织树
                  var treeObj = $.fn.zTree.getZTreeObj("billtype");
                  treeObj.expandAll(true);
              },
              //下发
              lssuedActivity: function(saleOrgs) {
                  var id = viewModel.ProAttrDocList.getSelectedRows()[0].getSimpleData()[
                      "id"
                  ];
                  $._ajax({
                      url: appCtx + viewModel.baseurl + "/lssuedActivity",
                      type: "post",
                      async: false,
                      data: {
                          id: id,
                          saleOrgs: saleOrgs
                      },
                      success: function(data) {
                          lssuedActivityDialog.close();
                          viewModel.search();
                      }
                  });
              },
              //查询子表数据
              findByParentid: function(id) {
                  $._ajax({
                      url: appCtx + viewModel.attrValue + "/findByActivityId",
                      type: "post",
                      async: false,
                      data: {
                          id: id
                      },
                      success: function(data) {
                          viewModel.ProductAttrValueList.setSimpleData(data, { unSelect: true});
                      }
                  });
                  $._ajax({
                      url: appCtx + viewModel.ruleListValue + "/findByActivityId",
                      type: "post",
                      async: false,
                      data: {
                          id: id
                      },
                      success: function(data) {
                          viewModel.ActivityRulelistList.setSimpleData(data, { unSelect: true});
                      }
                  });
              },
              showCopyBillPanel: function () {
                  var row = viewModel.ProAttrDocList.getSelectedRows();
                  if (row == null || row.length == 0) {
                      toastr.error("请选择一行");
                      return;
                  }
                  viewModel.findByParentidByCopy(row[0].getValue("id"));
                  //viewModel.initObject(row[0],new Array('id','status','code'),new Array('','new',''),2);
                  row[0].setValue("code",null);
                  row[0].setValue("id",null);
                  row[0].setValue("activityStatusCode",0);
                  row[0].setValue("state",0);
                  viewModel.ProAttrDocList.setRowFocus(row[0]);
                  viewModel.goBillPanel();
                  $(".product-choose-result").show();
                  $(".product-choose-content").show();
                  $(".pagelever").hide();
                  $(".product-choose-content").show();
                  viewModel.button4Source(model.options.buttons.button4);
                  viewModel.app
                      .getComp("grid_complexRuleItem")
                      .grid.setEditable(true);
                  $(".product-choose-result").addClass("open");
                  viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
              },
              //查询子表数据
              findByParentidByCopy: function(id) {
                  $._ajax({
                      url: appCtx + viewModel.attrValue + "/findByActivityId",
                      type: "post",
                      async: false,
                      data: {
                          id: id
                      },
                      success: function(data) {
                          viewModel.ProductAttrValueList.setSimpleData(data, { unSelect: true});
                          var productAttrValueList = viewModel.ProductAttrValueList.getSimpleData();
                          productAttrValueList.forEach(function(item) {
                              item["persistStatus"] = "new";
                              item["id"] = null;
                          });
                          viewModel.ProductAttrValueList.setSimpleData(productAttrValueList);
                      }
                  });
                  $._ajax({
                      url: appCtx + viewModel.ruleListValue + "/findByActivityId",
                      type: "post",
                      async: false,
                      data: {
                          id: id
                      },
                      success: function(data) {
                          viewModel.ActivityRulelistList.setSimpleData(data, { unSelect: true});
                          var attrActivityValueData = viewModel.ActivityRulelistList.getSimpleData();
                          attrActivityValueData.forEach(function(item) {
                              item["persistStatus"] = "new";
                              item["id"] = null;
                          });
                          viewModel.ActivityRulelistList.setSimpleData(attrActivityValueData);
                      }
                  });
              },
              initObject:function(obj,fields,values,kl){
                  var ki = kl+1;
                  if(ki>4){
                      return;
                  }
                  for(var name in obj){
                      var result = obj[name];
                      if(result instanceof Array){
                          for(var obj2 in Array){
                              viewModel.initObject(obj2,fields,values,ki);
                          }
                      }else if(result instanceof Object){
                          viewModel.initObject(result,fields,values,ki)
                      }else if(result instanceof Function){
                          continue;
                      }else{
                          for(var i=0;i<fields.length;i++){
                              if(fields[i]==name){
                                  obj[name]=values[i];
                              }
                          }
                      }
                  }
              },
              // // 清除基类属性
              // clearBaseProp: function(row) {
              //   row.setValue("id", "");
              //   row.setValue("code", "");
              //   row.setValue("name", "");
              //   row.setValue("creator", "");
              //   row.setValue("creationTime", "");
              //   row.setValue("modifier", "");
              //   row.setValue("modifiedTime", "");
              // },
              //保存单据
              saveBill: function() {
                  var productBase = $("#productBase")[0];
                  var basePass = viewModel.validate(productBase);
                  var attrActivityData = viewModel.ProAttrDocList.getCurrentRow().getSimpleData();
                  console.log(attrActivityData)
                  if (basePass.passed) {
                      if (viewModel.billPanelStatus == BILLPANELSTATUS.ADD) {
                          attrActivityData.persistStatus = "new";
                      } else if (viewModel.billPanelStatus == BILLPANELSTATUS.EDIT) {
                          attrActivityData.persistStatus = "upd";
                      } else {
                          attrActivityData.persistStatus = "";
                      }

                      var isAllCustomer = attrActivityData["isAllCustomer"];
                      if (isAllCustomer == 0) {
                          var attrActivityValueData = viewModel.ProductAttrValueList.getSimpleData();
                          attrActivityData.custRangeList = attrActivityValueData;
                          attrActivityData.custRangeList.forEach(function(item) {
                              if (item["id"] == "" || item["id"] == null) {
                                  item["persistStatus"] = "new";
                              }
                          })
                      }

                      var ruleListList = viewModel.ActivityRulelistList.getSimpleData();

                      /*//传入id为空时，将状态改为new,原返回值是nrm*/
                      ruleListList.forEach(function(item) {
                          if (item["id"] == "" || item["id"] == null) {
                              item["persistStatus"] = "new";
                          }
                          // item["id"] = item["ruleId"]
                          // if(!item["promotionBench"]) item["promotionBench"] = 1
                      })



                      attrActivityData.activityRulelistList = ruleListList;

                      var _ajaxType = attrActivityData.persistStatus == "upd" ? "put" : "post";
                      $._ajax({
                          url: appCtx + viewModel.baseurl,
                          type: _ajaxType,
                          data: JSON.stringify(attrActivityData),
                          contentType: "application/json; charset=utf-8",
                          success: function(data) {
                              // viewModel.ProAttrDocList.getFocusRow().setSimpleData(data);
                              toastr.success("保存成功");
                              viewModel.retListPanel();
                              $(".ui-bill-change").hide();
                              viewModel.search();
                          }
                      });
                  }
              },
              //取消单据
              cancelBill: function() {
                  var curRow = viewModel.ProAttrDocList.getCurrentRow();
                  // 修改，则还原
                  if (curRow.getValue("id")) {
                      curRow.setSimpleData(viewModel.ProAttrDocList.originEditData);
                  } else {
                      // 新增或复制，则删除
                      viewModel.ProAttrDocList.removeRow(curRow);
                  }
                  viewModel.search();
                  viewModel.retListPanel();
                  $(".ui-bill-change").hide();

              },

              //删除和批量删除
              del: function(data, rowId) {
                  if (typeof data == "number") {
                      viewModel.ProAttrDocList.setRowSelectbyRowId(rowId);
                  }
                  var ids = [];
                  var status = [];
                  var statustip = "";
                  var rows = viewModel.ProAttrDocList.getSelectedRows();
                  if (rows && rows.length > 0) {
                      for (var i = 0; i < rows.length; i++) {
                          ids.push(rows[i].getValue("id"));
                          var activityStatusCode = rows[i].getValue("activityStatusCode");
                          if (activityStatusCode != 0) {
                              status.push(rows[i].getValue("code"));
                          }
                      }
                      if (status.length > 0) {
                          function statusArr() {
                              for (i = 0; i < status.length; i++) {
                                  statustip += status[i] + "，";
                              }
                              return statustip.substring(0, statustip.length - 1);
                          }

                          toastr.warning("数据   " + statusArr() + " 已生效不可删除");
                          return false;
                      }
                      common.dialog.confirmDialog({
                          msg1: "确认删除这些项？",
                          msg2: "此操作不可逆",
                          width: "400px",
                          type: "error",
                          onOk: function() {
                              $._ajax({
                                  url: appCtx + viewModel.baseurl + "/delete",
                                  type: "post",
                                  // data: "ids=" + ids.join(","),
                                  data: {
                                      ids: ids.join(",")
                                  },
                                  success: function(data) {
                                      viewModel.ProAttrDocList.removeRows(rows);
                                      toastr.success("删除成功");
                                  }
                              });
                          }
                      });
                  } else {
                      toastr.warning("请先选择需要删除数据");
                  }
              },

              validate: function(element) {
                  var result = viewModel.app.compsValidateMultiParam({
                      element: element,
                      showMsg: true
                  });
                  return result;
              },

              //新增子表项
              addItem: function() {
                  // viewModel.ProductAttrValueList.createEmptyRow();

                  var length = viewModel.ProductAttrValueList.getAllRows().length;
                  viewModel.ProductAttrValueList.insertRow(length + 1);

                  // viewModel.ProductAttrValueList.insertRow(viewModel.ProductAttrValueList.get);
              },
              //删除子表项
              delItems: function() {
                  var selectedRows = viewModel.ProductAttrValueList.getSelectedRows();
                  // for(var i=0;i<selectedRows.length;i++) {
                  //   selectedRows[i].setValue("dr", "1");
                  // }
                  viewModel.ProductAttrValueList.removeRows(selectedRows);
              },
              //新增规则子表项
              addRuleItem: function() {
                  viewModel.ActivityRulelistList.createEmptyRow();
              },
              //删除规则子表项
              delRuleItems: function() {
                  var selectedRows = viewModel.ActivityRulelistList.getSelectedRows();
                  // for(var i=0;i<selectedRows.length;i++) {
                  //   selectedRows[i].setValue("dr", "1");
                  // }
                  viewModel.ActivityRulelistList.removeRows(selectedRows, { forceDel: true });
              },
              //根据选择的规则值确定规则互斥内容的显示
              changeRuleObserveValueByRules: function() {
                  //重写设置互斥的值
                  var mutualFields = new Array(
                      "isFullCutOrder",
                      "isBuyGiftOrder",
                      "isBuyGiftProduct",
                      "isFullCutProduct"
                  );
                  for (var i = 0; i < mutualFields.length; i++) {
                      viewModel.ProAttrDocList.getCurrentRow().setValue(
                          mutualFields[i],
                          0
                      );
                  }

                  var rows = viewModel.ActivityRulelistList.getAllRows();
                  var hasProduct = false;

                  for (var i = 0; i < rows.length; i++) {
                      var persistStatus = rows[i].getSimpleData()["persistStatus"];
                      if (persistStatus == "fdel") continue;
                      var promotionBench = rows[i].getSimpleData()["promotionBench"];
                      if (promotionBench) {
                          if (promotionBench == 1 || promotionBench == 2) {
                              hasProduct = true;
                          }
                      }
                  }
                  //如果有商品金额/数量规则，则显示订单
                  if (hasProduct == true) {
                      viewModel.proMutualRuleObserve(1);
                  } else {
                      //否则显示商品的规则
                      viewModel.proMutualRuleObserve(0);
                  }
              },
              nothingDo: function() {},
              //新增规则后回调的函数：把新增的规则插入到规则列表中
              insertNewRule: function(id, ruleDescripe, name) {
                // 先清空参照
                var ruleRefer = $("#refContainerruleId").data("uui.refer");
                if (ruleRefer) {
                  ruleRefer.uncheckAll();
                  ruleRefer.setValue([]);
                }
                  //如果传过来的规则id有值，则是保存规则，则新增规则行，并且给新增的规则行赋值
                  if (id != null) {
                      var row = viewModel.ActivityRulelistList.createEmptyRow();
                      var data = {
                          ruleId: id,
                          ruleName: name,
                          // persistStatus : "new",
                          ruleDescripe: ruleDescripe
                      };
                      row.setSimpleData(data);
                      data.persistStatus = 'new';
                  }

                  //规则界面隐藏
                  $("#ruleContent").hide();
                  //原来的主界面显示
                  $(".ui-bill-panel-main").show();
              },
              //查看规则后回调的函数：关闭规则页面
              viewRuleCallBack: function() {
                  //规则界面隐藏
                  $("#ruleContent").hide();
                  //原来的主界面显示
                  $(".ui-bill-detail-main").show();
              },
              addNewRule: function() {
                  var ruleContent = $("#ruleContent")[0];
                  var params = {
                      src: "activity",
                      callback: viewModel.insertNewRule
                  };
                  window.require(
                      ["/ocm-web/pages/prom/promotionrules/promotionrules.js"],
                      function(module) {
                          ko.cleanNode(ruleContent);
                          ruleContent.innerHTML = "";
                          module.init(ruleContent, params);
                      }
                  );
                  $("#ruleContent").show();

                  $("#bodyDiv").hide();
              }
          },
          afterCreate: function() {
              viewModel = u.extend(viewModel, bpmopenbill.model);
              // 选择上传文件后，直接调用上传方法
              $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
                  if (this.value) {
                      viewModel.onFileUpload();
                  }
              });

              // 是否全部商品控制
              viewModel.ProAttrDocList.on("isAllCustomer.valuechange", function(obj) {
                  $("#saleInfo").attr("disabled", true);
              });

              //启用互斥规则后的交互
              viewModel.ProAttrDocList.on("isMutual.valuechange", function(obj) {
                  if (obj.newValue == 1) {
                      //根据选择的规则值确定规则互斥内容的显示
                      viewModel.changeRuleObserveValueByRules();

                      //设置规则grid不可编辑
                      viewModel.app
                          .getComp("grid_complexRuleItem")
                          .grid.setEditable(false);
                      //设置按钮不可编辑
                      viewModel.button4Source(model.options.buttons.button44);
                  } else {
                      //设置规则grid不可编辑
                      viewModel.app
                          .getComp("grid_complexRuleItem")
                          .grid.setEditable(true);
                      //设置按钮不可编辑
                      viewModel.button4Source(model.options.buttons.button4);
                  }
              });
              //过滤没有与组织进行渠道客户交易关系配置的客户
              viewModel.ProAttrDocList.on("saleOrgId.valuechange", function(obj) {
                  var saleOrgId = obj.newValue;
                  if (saleOrgId) {
                      viewModel.ProductAttrValueList.meta.custId.refparam = '{"EQ_isEnable":"1","EQ_isChannelCustomer":"1","EQ_SaleOrder":"' + obj.newValue + '"}';
                      viewModel.ProductAttrValueList.removeAllRows();
                  }
              });
              //客户批量新增、
              viewModel.ProductAttrValueList.off("custId.valuechange").on("custId.valuechange", function(obj) {
                  if (!obj.newValue) return;
                  var str = obj.newValue;
                  var arr = str.split(",");
                  //已存在数据用做去重比较
                  var oldArr = [];
                  var oldRow = viewModel.ProductAttrValueList.getSimpleData();
                  for (var k = 0; k < oldRow.length; k++) {
                      oldArr.push(oldRow[k].custId);
                  }

                  if (arr.length == 1) {
                      return;
                  }
                  viewModel.ProductAttrValueList.removeRowByRowId(obj.rowId);
                  var refer = $("#refContainercustId").data("uui.refer");
                  var valNames = refer.values;
                  var datas = [];
                  for (var i = 0; i < arr.length; i++) {
                      if (oldArr.length > 0) {
                          if (oldArr.indexOf(arr[i]) < 0) {
                              datas.push({
                                  'custId': arr[i],
                                  'custName': valNames[i].refname
                              });
                          }
                      } else {
                          datas.push({
                              'custId': arr[i],
                              'custName': valNames[i].refname
                          });
                      }
                  }
                  viewModel.ProductAttrValueList.addSimpleData(datas);
              });
              //市场区域批量新增
              viewModel.ProductAttrValueList.off("marketAreaId.valuechange").on("marketAreaId.valuechange", function(obj) {
                  if (!obj.newValue) return;
                  var str = obj.newValue;
                  var arr = str.split(",");
                  //已存在数据用做去重比较
                  var oldArr = [];
                  var oldRow = viewModel.ProductAttrValueList.getSimpleData();
                  for (var k = 0; k < oldRow.length; k++) {
                      oldArr.push(oldRow[k].marketAreaId);
                  }

                  if (arr.length == 1) {
                      return;
                  }
                  viewModel.ProductAttrValueList.removeRowByRowId(obj.rowId);
                  var refer = $("#refContainercustId").data("uui.refer");
                  var valNames = refer.values;
                  var datas = [];
                  for (var i = 0; i < arr.length; i++) {
                      if (oldArr.length > 0) {
                          if (oldArr.indexOf(arr[i]) < 0) {
                              datas.push({
                                  'marketAreaId': arr[i],
                                  'marketAreaName': valNames[i].refname
                              });
                          }
                      } else {
                          datas.push({
                              'marketAreaId': arr[i],
                              'marketAreaName': valNames[i].refname
                          });
                      }
                  }
                  viewModel.ProductAttrValueList.addSimpleData(datas);
              });
          }
      });
      return view;
  }
);