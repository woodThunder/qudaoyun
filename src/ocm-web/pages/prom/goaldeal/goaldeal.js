define(['text!./goaldeal.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,prodagencyDialog;
  baseData = {
    baseurl : '/prom/product-goals',
    PromoActivityList: new u.DataTable(PromoActivity),
    GoalDeal: new u.DataTable(GoalDeal),
    ProductGoalItems: new u.DataTable(ProductGoal),
    AgencyCashgoalItems: new u.DataTable(AgencyCashgoal),
    AgencyProdgoalSuns: new u.DataTable(AgencyProdgoal),
    ProductRef: new u.DataTable(ProductRef),
    AgencyRef: new u.DataTable(AgencyRef),
    ProdAgencyRef: new u.DataTable(ProdAgencyRef),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    dateFormat: common.format.dateFormat,
  };
  rendertype = {
    detailRender:common.rendertype.detailRender,
    approveRender: common.rendertype.approveRender,
    // 产品目标分解操作列
    productGoalOperate: function(obj) {
      obj.element.innerHTML = '<a href="javascript:void(0);" data-bind="click: showAgencyProdDialog">目标分解</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
  };
  events = {
    //导入
    importHandle: function() {
      var urlInfo = viewModel.baseurl + "/getDataFromExcelDataImport"; //倒入地址参数
      // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
      var ele = $('#importFiel')[0]; //挂载元素
      var setDate = function (data) {
          return viewModel.ProductGoalItems.addSimpleData(data, "new");
      };
      common.fileHandle.importToPage(urlInfo,ele,setDate);
    },
    //导出
    exportHandle: function() {
      var searchParams = {}; //搜索查询参数
      var id = viewModel.PromoActivityList.getCurrentRow().getValue("id");
      searchParams['search_EQ_activityId']=id;
      var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
      var listData = viewModel.ProductGoalItems; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
    },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.PromoActivityList.pageIndex(0);
        }
        viewModel.PromoActivityList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var pageSize = viewModel.PromoActivityList.pageSize();
        var pageNumber = viewModel.PromoActivityList.pageIndex();
        queryData.size = pageSize;
        queryData.page = pageNumber;
        // queryData["search_EQ_enableStatus"] = "1";
        // queryData["search_IN_approveStatus"] = "0,2";
        $._ajax({
          type:"get",
          url:appCtx + "/promo-activity",
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.PromoActivityList.setSimpleData(data.content,{unSelect:true});
            viewModel.PromoActivityList.totalRow(data.totalElements);
            viewModel.PromoActivityList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.PromoActivityList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.PromoActivityList.pageSize(size);
        viewModel.search(true);
      },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.PromoActivityList.getCurrentRow();
          var id = curRow.getValue("id");
          //请求完整主子表信息
          viewModel.fillData(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      // （编辑/详情）填充完整主子表数据 根据活动id获取并填充活动目标及其子表（产品目标，办事处金额目标）
      fillData: function(id) {
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/findGoalByActivityId",
          data: {id: id},
          async: false,
          success: function(data) {
            viewModel.ProductGoalItems.removeAllRows();
            viewModel.AgencyCashgoalItems.removeAllRows();
            // 活动已经定义活动目标
            if(data) {
              var goaldeal = data;
              var productgoal = data.productGoalDtoList;
              var agencycashgoal = data.agencyCashgoalDtoList;
              viewModel.GoalDeal.setSimpleData(goaldeal);
              viewModel.ProductGoalItems.setSimpleData(productgoal);
              viewModel.AgencyCashgoalItems.setSimpleData(agencycashgoal);
            }
          }
        })
      },
      //保存单据
      saveBill: function() {
        var result = app.compsValidateMultiParam({element: $(".ui-bill-panel")[0]});
        if(!result.passed) {
          return
        }
        var activityId = viewModel.PromoActivityList.getSelectedRows()[0].getValue("id");
        var GoalDeal = viewModel.GoalDeal.getCurrentRow().getSimpleData();
        GoalDeal.activityId = activityId;
        var productgoal = viewModel.ProductGoalItems.getSimpleData();
        var agencycash = viewModel.AgencyCashgoalItems.getSimpleData();
        GoalDeal.productGoalDtoList = productgoal;
        GoalDeal.agencyCashgoalDtoList = agencycash;
        $._ajax({
          url:appCtx + viewModel.baseurl + "/saveAll",
          type: "post",
          data:JSON.stringify(GoalDeal),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.retListPanel();
          }
        })
      },
      //取消单据
      cancelBill: function() {
        //清除子表数据
        viewModel.ProductGoalItems.removeAllRows();
        viewModel.AgencyCashgoalItems.removeAllRows();
        var curRow = viewModel.PromoActivityList.getCurrentRow();
        // 修改，则还原
        if(curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.PromoActivityList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.PromoActivityList.removeRow(curRow);
        }
        viewModel.retListPanel();
      },
      //删除已参照的产品目标
      delProductGoalItems: function() {
        var selectedRows = viewModel.ProductGoalItems.getSelectedRows();
        if(selectedRows && selectedRows.length > 0) {
          viewModel.ProductGoalItems.removeRows(selectedRows);
        }
      },
      //删除已参照的办事处
      delAgencyCashgoalItems: function() {
        var selectedRows = viewModel.AgencyCashgoalItems.getSelectedRows();
        if(selectedRows && selectedRows.length > 0) {
          viewModel.AgencyCashgoalItems.removeRows(selectedRows);
        }
      },
      // 进入指定活动的目标分解编辑态单据
      showDispatchPanel: function() {
        var selectedRows = viewModel.PromoActivityList.getSelectedRows();
        if(!selectedRows ||selectedRows.length != 1) {
          toastr.error("请选择一条数据");
          return;
        }
        viewModel.PromoActivityList.setRowFocus(selectedRows[0]);
        var id = viewModel.PromoActivityList.getValue("id");
        viewModel.GoalDeal.removeAllRows();
        var row = viewModel.GoalDeal.createEmptyRow();
        viewModel.GoalDeal.setRowFocus(row);
        viewModel.fillData(id);
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        viewModel.goBillPanel();
      },
      // 弹出产品/产品组合参照
      showProductRef:function() {
        viewModel.clearProductRef();
        // 变更产品/产品组合参照-活动定义参数
        var activityId = viewModel.PromoActivityList.getValue("id");
        var data = {activityId: activityId};
        $("#productRefer").attr("data-refparam",JSON.stringify(data));
        $("#productRefer").find(".refer").trigger("click");
      },
      // 清空已选产品/产品组合参照
      clearProductRef: function() {
        viewModel.ProductRef.setValue("productRefer", "");
        var refer = $("#refContainerproductRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //弹出办事处参照
      showAgencyRef: function() {
        viewModel.clearAgencyRef();
        var activityId = viewModel.PromoActivityList.getValue("id");
        var data = JSON.stringify({activityId: activityId});
        $("#agencyRefer").attr("data-refparam",data);
        $("#agencyRefer").find(".refer").trigger("click");
      },
      //弹出产品-办事处参照
      showProdAgencyRef: function() {
        viewModel.clearProdAgencyRef();
        var activityId = viewModel.PromoActivityList.getValue("id");
        var data = JSON.stringify({activityId: activityId});
        $("#prodagencyRefer").attr("data-refparam",data);
        $("#prodagencyRefer").find(".refer").trigger("click");
      },
      //清空已选办事处参照
      clearAgencyRef: function() {
        viewModel.AgencyRef.setValue("agencyRefer", "");
        var refer = $("#refContaineragencyRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //清空已选产品-办事处参照
      clearProdAgencyRef: function() {
        viewModel.ProdAgencyRef.setValue("prodagencyRefer", "");
        var refer = $("#refContainerprodagencyRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 导入产品目标 TODO:导入
      importProductGoal: function() {

      },
      // 导出产品目标 TODO:导出
      exportProductGoal: function() {

      },
      // 弹出办事处产品目标分解对话框
      showAgencyProdDialog: function() {
        setTimeout(function(){
          var curRow = viewModel.ProductGoalItems.getCurrentRow();
          if(!curRow.getValue("goalNumber")) {
            toastr.error("请先录入目标数量");
            return
          }
          var childDt = curRow.getValue("agencyProdgoalSet");
          var childData = childDt.getDataByRule("all");
          viewModel.AgencyProdgoalSuns.removeAllRows();
          //已存在分配的产品-办事处目标
          if(childData && childData.rows.length > 0) {
            viewModel.AgencyProdgoalSuns.setData(childData);
          }
          else {
            var id = curRow.getValue("id");
            if(id) {
              $.ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/findAgencyProdgoalByProductGoalId",
                data: {id: id},
                success: function(data) {
                  viewModel.AgencyProdgoalSuns.setSimpleData(data);
                }
              });
            }
          }
          // 详情页隐藏对话框按钮
          if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
            $("#dialog-btns").hide();
          }
          else {
            $("#dialog-btns").show();
          }
          if(!prodagencyDialog) {
            prodagencyDialog = u.dialog({content: "#dialog_agencyprod",hasCloseMenu: true,width:"900px"});
          }
          else {
            prodagencyDialog.show();
          }
        }, 0)
      },
      // 产品-办事处目标分配确定
      confirmProdAgency: function() {
        var result = app.compsValidateMultiParam({element: $("#dialog_agencyprod")[0]});
        if(!result.passed) return
        var curRow = viewModel.ProductGoalItems.getCurrentRow();
        var childDt = viewModel.ProductGoalItems.getValue("agencyProdgoalSet");
        var realRows = viewModel.AgencyProdgoalSuns.getAllRealRows();
        //已分解数量
        var doneNumber = realRows.reduce(function(sum, row){
          var num = row.getValue("todoNumber");
          num = parseInt(num);
          if(!Number.isInteger(num)) {
            num = 0;
          }
          return sum += num;
        }, 0);
        // 已分解数量总和不能超过目标数量
        if(curRow.getValue("goalNumber") < doneNumber) {
          toastr.error("已分解数量总和不能超过目标数量");
          return
        }
        //已分解金额
        var doneMonnyNumber = realRows.reduce(function(sum, row) {
          var money = row.getValue("doneMonnyNumber");
          money = parseFloat(money);
          if(isNaN(money)) {
            money = 0;
          }
          return sum + money;
        }, 0);
        curRow.setValue("doneNumber", doneNumber);
        curRow.setValue("doneMonnyNumber", doneMonnyNumber);
        childDt.removeAllRows();
        childDt.setData(viewModel.AgencyProdgoalSuns.getDataByRule("all"));
        prodagencyDialog.hide();
      },
      // 删除产品-办事处目标
      delProdAgencySun: function() {
        var delRows = viewModel.AgencyProdgoalSuns.getSelectedRows();
        viewModel.AgencyProdgoalSuns.removeRows(delRows);
      },
      detail2bill: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      }
  }
  viewModel = u.extend({},baseData,events,rendertype);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#PromoActivity-searchcontent")[0],
      [
        {
          type:"refer",
          key:"activeType--id",
          label:"活动类型",
          refinfo:"activitytypeb",
          multi:true,
        },
        {
          type:"refer",
          key:"activeNode--id",
          label:"活动节点",
          refinfo:"activenode",
          multi:true,
        },
        {
          type:"combo",
          key:"approveStatus",
          label:"审核状态",
          // dataSource: CONST.APPROVE,
          dataSource: CONST.APPROVESEARCH,
          opr: "IN",
        },
        {
          type:"text",
          key:"code",
          label:"活动编码",
        },
        {
          type:"text",
          key:"name",
          label:"活动名称",
        },
        {
          type: "daterange",
          label: "订货开始日期",
          key: "orderStartDate",
        },
        {
          type: "daterange",
          label: "订货截至日期",
          key: "orderEndDate",
        },
        {
          type: "daterange",
          label: "终端活动开始日期",
          key: "terminalStartDate",
        },
        {
          type: "daterange",
          label: "终端活动截至日期",
          key: "terminalEndDate",
        },
        {
          type: "daterange",
          label: "报名开始日期",
          key: "enrolStartDate",
        },
        {
          type: "daterange",
          label: "报名截至日期",
          key: "enrolEndDate",
        },
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
    var bussrefrow  = viewModel.ProductRef.createEmptyRow();
    viewModel.ProductRef.setRowFocus(bussrefrow);
    var agencyrefrow  = viewModel.AgencyRef.createEmptyRow();
    viewModel.AgencyRef.setRowFocus(agencyrefrow);
    var prodagencyrefrow  = viewModel.ProdAgencyRef.createEmptyRow();
    viewModel.ProdAgencyRef.setRowFocus(prodagencyrefrow);
  }

  function afterRender(){
    // 初始化折叠面板
    // $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#PromoActivity-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 监听产品/产品组合参照选择
    viewModel.ProductRef.on("productRefer.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerproductRefer").data("uui.refer").values;
      if(refValues && refValues.length > 0) {
        for(var i=0;i<refValues.length;i++) {
          var refpk = refValues[i].refpk;
          var row = undefined;
          var productId = undefined;
          var combineId = undefined;
          if(refValues[i].isproduct == "1") {
            row = viewModel.ProductGoalItems.getRowByField("productId", refpk);
            productId = refpk;
          }
          else {
            row = viewModel.ProductGoalItems.getRowByField("combineId", refpk);
            combineId = refpk
          }
          var newrow = undefined;
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            newrow = viewModel.ProductGoalItems.createEmptyRow({unSelect:true});
            newrow.setValue("showCode", refValues[i].refcode);
            newrow.setValue("showName", refValues[i].refname);
            newrow.setValue("productUnitName", refValues[i].baseUnitName);
            newrow.setValue("productId", productId);
            newrow.setValue("combineId", combineId);
          }
        }
      }
    });
    // 监听金额-办事处参照选择
    viewModel.AgencyRef.on("agencyRefer.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContaineragencyRefer").data("uui.refer");
      if(refer && refer.values.length > 0) {
        for(var i=0;i<refer.values.length;i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.AgencyCashgoalItems.getRowByField("agencyId", refpk);
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            var newrow = viewModel.AgencyCashgoalItems.createEmptyRow({unSelect: true});
            newrow.setValue("agencyCode", refer.values[i].refcode);
            newrow.setValue("agencyName", refer.values[i].refname);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("agencyId", refpk);
          }
        }
      }
    });
    // 监听产品-办事处参照选择
    viewModel.ProdAgencyRef.on("prodagencyRefer.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var rows = viewModel.AgencyProdgoalSuns.rows().filter(function(row){
        return row.status != u.Row.STATUS.FALSE_DELETE
      });
      var saleOrgId = undefined;
      var saleOrgName = undefined;
      if(rows.length > 0) {
        saleOrgId = rows[rows.length-1].getValue("pkOrgId");
        saleOrgName = rows[rows.length-1].getValue("pkOrgName");
      }
      var refer = $("#refContainerprodagencyRefer").data("uui.refer");
      if(refer && refer.values.length > 0) {
        for(var i=0;i<refer.values.length;i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.AgencyProdgoalSuns.getRowByField("agencyId", refpk);
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            var newrow = viewModel.AgencyProdgoalSuns.createEmptyRow({unSelect: true});
            newrow.setValue("agencyCode", refer.values[i].refcode);
            newrow.setValue("agencyName", refer.values[i].refname);
            if(saleOrgName) newrow.setValue("pkOrgName", saleOrgName);
            if(saleOrgId) newrow.setValue("pkOrgId", saleOrgId);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("agencyId", refpk);
          }
        }
      }
    });
    // 产品目标数量或已分解数量变化时，余量随之变化
    viewModel.ProductGoalItems.on("valuechange", function(obj) {
      var curRow = obj.rowObj;
      if(obj.field == "goalNumber") {
        var doneNumber = curRow.getValue("doneNumber");
        doneNumber = parseInt(doneNumber);
        if(!Number.isInteger(doneNumber)) {
          doneNumber = 0;
        }
        var leftNumber = obj.newValue - doneNumber;
        curRow.setValue("leftNumber", leftNumber);
      }
      else if(obj.field == "doneNumber") {
        var goalNumber = curRow.getValue("goalNumber");
        goalNumber = parseInt(goalNumber);
        if(Number.isInteger(goalNumber)) {
          curRow.setValue("leftNumber", goalNumber - obj.newValue);
        }
      }
    });
    // 询价组织选择后执行询价
    viewModel.AgencyProdgoalSuns.on("pkOrgId.valuechange", function(obj) {
      var currRow = obj.rowObj;
      // 询价所需数据
      var pkOrg = obj.newValue;
      var activityId = viewModel.PromoActivityList.getCurrentRow().getValue("id");
      var productRow = viewModel.ProductGoalItems.getCurrentRow();
      var productId = productRow.getValue("productId");
      var combineId = productRow.getValue("combineId");
      var agencyId = currRow.getValue("agencyId");
      var data = {
        saleOrg: pkOrg,
        activityId: activityId,
        productId: productId,
        productCombineId: combineId,
        officeId: agencyId
      }
      $._ajax({
        type: "post",
        url: appCtx + viewModel.baseurl + "/getPrice",
        data: data,
        success: function(price) {
          price = parseInt(price);
          if(!isNaN(price)) {
            currRow.setValue("price",price);
          }
        }
      })
    });
    //办事处产品目标数量或单价变动，已分解金额随之联动
    viewModel.AgencyProdgoalSuns.on("valuechange", function(obj) {
      if(obj.field == "todoNumber" ) {
        var todoNumber = obj.newValue;
        todoNumber = parseFloat(todoNumber);
        var price = obj.rowObj.getValue("price");
        price = parseFloat(price);
        if(!isNaN(todoNumber) && !isNaN(price)) {
          obj.rowObj.setValue("doneMonnyNumber",todoNumber*price);
        }
      }
      else if(obj.field == "price") {
        var price = obj.newValue;
        price = parseFloat(price);
        var todoNumber = obj.rowObj.getValue("todoNumber");
        todoNumber = parseFloat(todoNumber);
        if(!isNaN(todoNumber) && !isNaN(price)) {
          obj.rowObj.setValue("doneMonnyNumber",todoNumber*price);
        }
      }
    });
    // 活动定义变化，改变办事处参照（金额目标、产品目标）参数
    viewModel.PromoActivityList.on("id.valuechange", function(obj) {
      var activityId = obj.newValue;
      var data = JSON.stringify({activityId: activityId});
      $("#prodagencyRefer").attr("data-refparam",data);
      $("#agencyRefer").attr("data-refparam",data);
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
  }

  return {
    init: init
  }
});
