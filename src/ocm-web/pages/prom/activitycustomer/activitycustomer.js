define(['text!./activitycustomer.html','ocm_common','searchbox','editcard','billfooter','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard,billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,dialog_commitDetail,itemSearchbox,detailItemSearchbox;
  baseData = {
    baseurl : '/prom/activity-customer-lists',
    PromoActivityList: new u.DataTable(PromoActivity),
    CustomerItems: new u.DataTable(Customer),
    CustomerRef: new u.DataTable(CustomerRef),
    CommitDetailSuns: new u.DataTable(CommitDetail),
    ProductRef: new u.DataTable(ProductRef),
    ActivityHis: new u.DataTable(ActivityHis),
    CommitDetailHis: new u.DataTable(CommitDetail),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
  };
  rendertype = {
    operation: function(obj) {
      var delfun = "data-bind=click:manageCustomer.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:showHistory.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      delfun +
      ' title="名单管理">名单管理</a>'+
      '</span>'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      editfun +
      ' title="变更历史">变更历史</a>'+
      '</span>'+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    itemOperation: function(obj) {
      var editfun = "data-bind=click:commitDetail.bind($data,'" + obj.row.value.id + "')";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      editfun +
      ' title="明细">明细</a>'+
      '</span>    '+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    enableRender: common.rendertype.enableRender,
    detailRender: common.rendertype.detailRender,
  };
  events = {
      //导入
      importHandle: function() {
        var urlInfo = viewModel.baseurl + "/excelDataImport"; //倒入地址参数
        var activityId = viewModel.PromoActivityList.getValue("id");
        urlInfo += "?activityId="+activityId;
        var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus';
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele,undefined, function() {
          viewModel.searchItem(true);
        });
      },
      //导出
      exportHandle: function() {
        var searchParams = detailItemSearchbox.getDataWithOpr(); //搜索查询参数
        var id = viewModel.PromoActivityList.getCurrentRow().getValue("id");
        if(!id) {
          toastr.error("请先保存单据");
          return;
        }
        searchParams['search_EQ_activity.id']=id;
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.CustomerItems; //需要导出表格的dataTable
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
        var searchkey = "search_EQ_activeType.applyWay";
        queryData[searchkey] = "1";
        queryData["search_EQ_approveStatus"] = "1";
        // queryData["search_EQ_enableStatus"] = "1";
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
      // 名单管理
      manageCustomer: function() {
        setTimeout(function(){
          viewModel.cleanItemSearch();
          viewModel.searchItem(true);
          $(".ui-list-panel").hide();
          $("#customerPanel").show();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        }, 0);
      },
      fillData: function() {
        var id = viewModel.PromoActivityList.getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/customer-list",
          async:false,
          data: {activityId: id},
          success: function(data) {
            viewModel.CustomerItems.setSimpleData(data);
          }
        })
      },
      // 变更历史
      showHistory: function() {
        setTimeout(function(){
          var activityId = viewModel.PromoActivityList.getValue("id");
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurl + "/history",
            data: {activityId: activityId},
            success: function(activityHis) {
              viewModel.ActivityHis.setSimpleData(activityHis);
              var rows = viewModel.ActivityHis.rows();
              var $container = $("#customerHistoryCollapse");
              $container.empty();
              for(var i=0;i<rows.length;i++) {
                var historyTime = rows[i].getValue("operationTime");
                var header = '' +
                '<h3 class="ui-collapse-title margin-top-10">' +
                  '<i class="uifont icon-tubiao-xiaosanjiao-xia"></i>' +
                  '<i class="uifont icon-tubiao-xiaosanjiao-you"></i>' +
                  '<span>'+historyTime+'</span>' +
                '</h3>';
                var data1 = {
                  values: activityHis[i].customerListDtos
                  };
                  var colu = [
                    {
                        field: "id",
                        title: "主键",
                        visible: false
                    }, {
                        field: "operation",
                        title: "变更类型"
                    }, {
                        field: "customerCode",
                        title: "经销商编码"
                    }, {
                        field: "customerName",
                        title: "经销商名称"
                    }, {
                        field: "commitDeliveryMny",
                        title: "承诺提货总额"
                    }, {
                        field: "pickAccountName",
                        title: "提货账户"
                    }, {
                        field: "accountTypeName",
                        title: "账号类型"
                    }, {
                        field: "enabled",
                        title: "启用状态",
                        renderType: viewModel.enableRender
                    }, {
                        field: "creator",
                        title: "创建人"
                    }, {
                        field: "creationTime",
                        dataType: "Datetime",
                        title: "创建时间"
                    }, {
                        field: "modifier",
                        title: "修改人"
                    }, {
                        field: "modifiedTime",
                        dataType: "Datetime",
                        title: "修改时间"
                    }, {
                        field: "operationCol",
                        title: "承诺提货明细",
                        renderType: viewModel.itemOperation,
                        fixed: true,
                        width: "150px",
                    },
                  ];
                  var grid = $("<div></div>").grid({
                    dataSource: data1,
                    editable: false,
                    columnmenu: false,
                    showNumCol: true,
                    columns: colu
                  })
                var content = '' +
                '<div class="ui-collapse-content">' +
                  '<div class="ui-bill-body-btns"></div>' +
                  '<div class="ui-table-container">' +
                    grid.ele.innerHTML+
                  '</div>' +
                '</div>';
                $container.append(header);
                $container.append(content);
              }
              $container.collapsepanel(false);
              $(".ui-list-panel").hide();
              $("#historyPanel").show();
            }
          })
        }, 0);
      },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.PromoActivityList.getCurrentRow();
          var id = curRow.getValue("id");
          //请求完整主子表信息
          viewModel.cleanDetailItemSearch();
          viewModel.searchItem(true);
          viewModel.goDetailPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        }, 0);
      },
      //保存单据
      saveBill: function(index) {
        var result = app.compsValidateMultiParam({element: ".ui-bill-panel",showMsg:true});
        if(!result.passed) {
          return;
        }
        var customerList = viewModel.CustomerItems.getSimpleData();
        var activityId = viewModel.PromoActivityList.getValue("id");
        var data = {
          activityId: activityId,
          dtoList: customerList
        }
        $._ajax({
          url:appCtx + viewModel.baseurl +"/saves",
          type: "post",
          data:JSON.stringify(data),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            if(index && index >= 0) {
              viewModel.searchItem(true);
            }
            else {
              viewModel.retListPanel();
            }
          }
        })
      },
      //取消单据
      cancelBill: function() {
        $("#customerPanel").hide();
        $(".ui-list-panel").show();
      },
      //启用
      enableItems: function() {
        var selectedRows = viewModel.CustomerItems.getSelectedRows();
        selectedRows.forEach(function(row) {
          row.setValue("enabled", "1");
        })
      },
      //停用
      disableItems: function() {
        var selectedRows = viewModel.CustomerItems.getSelectedRows();
        selectedRows.forEach(function(row) {
          row.setValue("enabled", "0");
        })
      },
      //清空已选经销商参照
      clearCustomRef: function() {
        viewModel.CustomerRef.setValue("customerref", "");
        var refer = $("#refContainercustomerref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //弹出经销商参照
      showCustomRef: function() {
        var activityId = viewModel.PromoActivityList.getValue("id");
        $("#customRefer").attr("data-refparam", JSON.stringify({activityId: activityId}));
        viewModel.clearCustomRef();
        $("#customRefer").find(".refer").trigger("click");
      },
      //删除已参照的经销商
      delCustomItems: function() {
        var selectedRows = viewModel.CustomerItems.getSelectedRows();
        if(selectedRows && selectedRows.length > 0) {
          viewModel.CustomerItems.removeRows(selectedRows);
        }
      },
      // 经销商提货明细
      commitDetail: function(customerlistId) {
        setTimeout(function(){
          var pickAccountId = viewModel.CustomerItems.getValue("pickAccountId");
          var accountTypeId = viewModel.CustomerItems.getValue("accountTypeId");
          var panelStatus = viewModel.billPanelStatus();
          viewModel.CommitDetailSuns.removeAllRows();
          if($("#historyPanel:visible").length > 0) {
            panelStatus = "HISTORY";
          }
          var $btnGroup = $("#dialog_commitDetail .u-msg-content .ui-btn-group");
          var detailGridComp = app.getComp("grid_CommitDetailSuns").grid;
          if(panelStatus == CONST.BILLPANELSTATUS.EDIT) {
            if(!pickAccountId || !accountTypeId) {
              toastr.error("请先录入提货账户、账号类型");
              return;
            }
            $btnGroup.show();
            detailGridComp.setEditable(true);
            var existDetails = viewModel.CustomerItems.getValue("commitDetailList").getDataByRule("all");
            viewModel.CommitDetailSuns.setData(existDetails);
          }
          else if(panelStatus == CONST.BILLPANELSTATUS.DETAIL) {
            detailGridComp.setEditable(false);
            $btnGroup.hide()
            var existDetails = viewModel.CustomerItems.getValue("commitDetailList").getDataByRule("all");
            viewModel.CommitDetailSuns.setData(existDetails);
          }
          // 变更历史页面，明细需重新请求
          else if(panelStatus == "HISTORY"){
            detailGridComp.setEditable(false);
            $btnGroup.hide();
            $._ajax({
              type: "post",
              url: appCtx + viewModel.baseurl + "/detail",
              async: false,
              data: {customerlistId: customerlistId},
              success: function(CommitDetails) {
                viewModel.CommitDetailSuns.setSimpleData(CommitDetails);
              }
            })
          }
          else {

          }
          if(dialog_commitDetail) {
            dialog_commitDetail.show();
          }
          else {
            dialog_commitDetail = u.dialog({content: "#dialog_commitDetail",hasCloseMenu:true,width: "900px"});
          }
        }, 0);
      },
      //清空已选产品参照
      clearProductRef: function() {
        viewModel.ProductRef.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 提货明细-产品参照
      showProductRef: function() {
        viewModel.clearProductRef();
        $("#productRefer .refer").trigger("click");
      },
      // 提货明细-删除产品
      delCommitDetail: function() {
        var selectedRows = viewModel.CommitDetailSuns.getSelectedRows();
        viewModel.CommitDetailSuns.removeRows(selectedRows);
        viewModel.CustomerItems.getValue("commitDetailList").removeAllRows();
      },
      // 确认提货明细
      confirmCommitDetail: function() {
        var historyPanel = $("#historyPanel:visible")[0];
        if(historyPanel) {
          dialog_commitDetail.hide();
          return;
        }
        var itemRow = viewModel.CustomerItems.getCurrentRow();
        var itemChild = viewModel.CustomerItems.getValue("commitDetailList");
        var sunDatas = viewModel.CommitDetailSuns.getSimpleData();
        itemChild.setData(viewModel.CommitDetailSuns.getDataByRule("all"));
        // 汇总提货明细总额
        var sumMoney = sunDatas.reduce(function(sum, v) {
          var money = v.commitDeliveryMny;
          money = parseFloat(money);
          if(v.persistStatus == "fdel" || Number.isNaN(money)) {
            money = 0;
          }
          return sum + money;
        }, 0);
        itemRow.setValue("commitDeliveryMny", sumMoney);
        dialog_commitDetail.hide();
      },
      // 引用上级活动名单
      importParentCustomer: function() {
        // 已存在经销商不允许引用
        var rows = viewModel.CustomerItems.rows();
        if(rows.length > 0) {
          var hasTrueData = rows.some(function(row) {
            return row.status != u.Row.STATUS.FALSE_DELETE;
          })
          if(hasTrueData) {
            toastr.error("已存在经销商不允许引用");
            return;
          }
        }
        var parentActivityId = viewModel.PromoActivityList.getValue("higherActiveId");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/customer-list",
          data: {activityId: parentActivityId},
          success: function(customList) {
            viewModel.CustomerItems.setSimpleData(customList, {status: "new"});
          }
        })
      },
      // 变更历史单据页返回列表页
      history2List: function() {
        $("#historyPanel").hide();
        $(".ui-list-panel").show();
      },
      // 询价
      getPrice: function(activityId, customerId, productId, combineId,accountId, accouTypeId) {
        var price = 0;
        $._ajax({
          type: "post",
          async: false,
          url: appCtx + viewModel.baseurl + "/findprice",
          data: {
            activityId: activityId,
            customerid: customerId,
            productId: productId,
            productCombine: combineId,
            accountId: accountId,
            accoutTypeId: accouTypeId
          },
          success: function(data) {
            price = data;
          }
        });
        return price;
      },
      // 活动grid行聚焦事件，活动变化，联动改变产品参照参数activityId
      activityRowFocus: function(obj) {
        var activityId = obj.rowObj.value.id;
        var data = {activityId: activityId};
        $("#productRefer").attr("data-refparam", JSON.stringify(data));
      },
      detail2bill: function() {
        viewModel.cleanItemSearch();
        viewModel.searchItem(true);
        $(".ui-bill-detail").hide();
        $("#customerPanel").show();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 变更历史-经销商产品承诺明细
      historyCommitDetail: function() {
        console.log("historyCommitDetail");
      },
      // 经销商grid编辑前事件：对于提货账户列，设置当前行经销商id作为参照查询条件
      itemBeforeEdit: function(obj) {
        if(obj.gridObj.gridCompColumnArr[obj.colIndex].options.field === "pickAccountId") {
          var rowId = obj.gridObj.dataSourceObj.rows[obj.rowIndex].value["$_#_@_id"];
          var curRow = viewModel.CustomerItems.getRowByRowId(rowId);
          if(!curRow) return
          var customer = curRow.getValue("customerId");
          var refparam = viewModel.CustomerItems.getMeta("pickAccountId","refparam");
          refparam = JSON.parse(refparam);
          refparam["EQ_customer.id"] = customer;
          viewModel.CustomerItems.setMeta("pickAccountId", "refparam", JSON.stringify(refparam));
        }
        return true
      },
      // 判断当前页数据是否变化
      currentChanged: function() {
        var changed = false;
        var childRows = viewModel.CustomerItems.getAllRows();
        //判断当前页是否有数据变化：1.子表值变化 2.孙表有值
        if(childRows.length > 0){
          for(var i = 0; i < childRows.length; i++){
            var status = childRows[i].status;
            var grands = childRows[i].getValue("commitDetailList").getSimpleData();
            if(status != 'nrm' || grands.length > 0){
              changed = true;
              break;
            }
          }
        }
        return changed;
      },
      // 编辑态查询前检测数据是否变化
      beforeSearchItem: function() {
        var changed = viewModel.currentChanged();
        if(changed){
          common.dialog.confirmDialog({
            msg1: '当前有修改，是否先保存后搜索？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              viewModel.saveBill(1);
            },
            onCancel: function(){
            }
          });
        }else{
          viewModel.searchItem();
        }
      },
      // 分页条件查询子表-经销商
      searchItem: function(reindex) {
        reindex ? viewModel.CustomerItems.pageIndex(0) : "";
        var queryData = {};
        // 详情态
        if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
          queryData = detailItemSearchbox.getDataWithOpr();
        }
        // 编辑态
        else {
          queryData = itemSearchbox.getDataWithOpr();
        }
        var activityId = viewModel.PromoActivityList.getValue("id");
        queryData["search_EQ_activity.id"] = activityId;
        queryData.page = viewModel.CustomerItems.pageIndex();
        queryData.size = viewModel.CustomerItems.pageSize();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          data: queryData,
          success: function(data) {
            viewModel.CustomerItems.setSimpleData(data.content,{unSelect: true});
            viewModel.CustomerItems.totalRow(data.totalElements);
            viewModel.CustomerItems.totalPages(data.totalPages);
          }
        })
      },
      cleanItemSearch: function() {
        itemSearchbox.clearSearch();
      },
      cleanDetailItemSearch: function() {
        detailItemSearchbox.clearSearch();
      },
      itemSizeChange: function(size) {
        viewModel.CustomerItems.pageSize(size);
        viewModel.searchItem();
      },
      itemBeforePageChange: function(index) {
        var changeFlag = viewModel.currentChanged();
	  		if(changeFlag){
	  			common.dialog.confirmDialog({
		        msg1: '当前有修改，是否先保存后跳转？',
		        msg2: '此操作不可逆',
		        width: '400px',
		        type: 'error',
		        onOk: function () {
		          viewModel.saveBill(index);
		        },
		        onCancel: function(){
		        }
		      });
	  		}else{
	  			viewModel.CustomerItems.pageIndex(index);
	  			viewModel.searchItem();
	  		}
      },
      itemPageChange: function(index) {
        viewModel.CustomerItems.pageIndex(index);
        viewModel.searchItem();
      },
  }
  viewModel = u.extend({},baseData,events,rendertype);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    window.initButton(viewModel, element);//初始化按钮权限
    ko.cleanNode(element);
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
          label: "报名开始日期",
          key: "enrolStartDate",
        },
        {
          type: "daterange",
          label: "报名截至日期",
          key: "enrolEndDate",
        },
        {
          type: "text",
          label: "活动描述",
          key: "description",
        },
      ]);
    // 子表查询组件初始化
    itemSearchbox = new searchbox(
      $("#item-searchcontent")[0],
      [
        {
          type:"text",
          key:"customer--code",
          label:"经销商编码",
        },
        {
          type:"text",
          key:"customer--name",
          label:"经销商名称",
        }
      ],undefined, true);
    // 详情-子表查询组件初始化
    detailItemSearchbox = new searchbox(
      $("#detail-item-searchcontent")[0],
      [
        {
          type:"text",
          key:"customer--code",
          label:"经销商编码",
        },
        {
          type:"text",
          key:"customer--name",
          label:"经销商名称",
        }
      ],undefined,true);
    // 列表查询数据(无查询条件)
    viewModel.search();

  }

  function afterRender(){
    // 初始化折叠面板
    $.fn.collapsepanel(false, true);
    //绑定输入框enter事件
    $('#PromoActivity-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //绑定编辑态子表查询输入框enter事件
    $('#item-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.searchItem();
      }
    });
    //绑定详情态子表查询输入框enter事件
    $('#detail-item-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.searchItem();
      }
    });
    // 监听经销商参照选择
    viewModel.CustomerRef.on("customerref.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainercustomerref").data("uui.refer");
      if(refer && refer.values.length > 0) {
        for(var i=0;i<refer.values.length;i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.CustomerItems.getRowByField("customerId", refpk);
          var newrow;
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            newrow = viewModel.CustomerItems.createEmptyRow({unSelect:true});
            newrow.setValue("customerCode", refer.values[i].refcode);
            newrow.setValue("customerName", refer.values[i].refname);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("customerId", refpk);
          }
        }
      }
    });
    // 监听产品参照选择
    viewModel.ProductRef.on("productref.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainerproductref").data("uui.refer");
      var refValues = refer.values;
      if(refer && refer.values.length > 0) {
        var accountId = viewModel.CustomerItems.getValue("pickAccountId");
        var accountTypeId = viewModel.CustomerItems.getValue("accountTypeId");
        for(var i=0;i<refer.values.length;i++) {
          var productId = undefined;
          var combineId = undefined;
          var baseUnitId = undefined;
          var baseUnitName = undefined;
          var minNumber = refValues[i].minNumber;
          var maxNumber = refValues[i].maxNumber;
          var row = undefined;
          //产品
          if(refValues[i].isproduct == "1") {
            productId = refValues[i].refpk;
            baseUnitId = refValues[i].baseUnitId;
            baseUnitName = refValues[i].baseUnitName;
            row = viewModel.CommitDetailSuns.getRowByField("productId", productId);
          }
          //产品组合
          else {
            combineId = refValues[i].refpk;
            row = viewModel.CommitDetailSuns.getRowByField("combineId", combineId);
          }
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            var newrow = viewModel.CommitDetailSuns.createEmptyRow({unSelect: true});
            // 询价
            var activityId = viewModel.PromoActivityList.getValue("id");
            var customerId = viewModel.CustomerItems.getValue("customerId");
            var price = viewModel.getPrice(activityId, customerId, productId, combineId, accountId, accountTypeId);
            newrow.setValue("price", price);
            newrow.setValue("showCode", refer.values[i].refcode);
            newrow.setValue("showName", refer.values[i].refname);
            newrow.setValue("productId", productId);
            newrow.setValue("combineId", combineId);
            newrow.setValue("productUnit", baseUnitName);
            newrow.setValue("minOrderAmount", minNumber);
            newrow.setValue("maxOrderAmount", maxNumber);
          }
        }
      }
    });
    // 承诺提货总额与承诺提货量联动
    //承诺提货量在最低承诺订货量和最大可订货量区间
    viewModel.CommitDetailSuns.on("commitDeliveryNum.valuechange", function(obj){
      var rowObj = obj.rowObj;
      var num = parseFloat(obj.newValue);
      var minOrderAmount = obj.rowObj.getValue("minOrderAmount");
      if(num < minOrderAmount) {
        obj.rowObj.setValue("commitDeliveryNum", minOrderAmount);
        return;
      }
      var price = rowObj.getValue("price");
      price = parseFloat(price);
      if(!Number.isNaN(num) && !Number.isNaN(price)) {
        var money = num * price;
        rowObj.setValue("commitDeliveryMny", money);
      }
    });
    // 经销商当前行变更，更新提货账户参照查询条件
    // viewModel.CustomerItems.on("currentRowChange",function(obj) {
    //   var curRow = viewModel.CustomerItems.getCurrentRow();
    //   if(!curRow) return
    //   var customer = curRow.getValue("customerId");
    //   var refparam = viewModel.CustomerItems.getMeta("pickAccountId","refparam");
    //   refparam = JSON.parse(refparam);
    //   refparam["EQ_customer.id"] = customer;
    //   viewModel.CustomerItems.setMeta("pickAccountId", "refparam", JSON.stringify(refparam));
    // });
    //展开搜索
    $(".searchChild-btn").bind('click',function(){
        if($(this).text() == "展开搜索"){
          $(this).text("收起搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideDown(300);
        }else{
          $(this).text("展开搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideUp(300);
        }
    });
    //分页显示条数判断
    $("#item-pagination").delegate("select","click",function(){
      if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
        var flag = viewModel.currentChanged();
        if(flag){
          $(this).prop("disabled",true);
          toastr.warning("当前数据已被修改，不可改变分页显示条数！");
        }else{
          $(this).prop("disabled",false);
        }
      }
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    var bussrefrow  = viewModel.CustomerRef.createEmptyRow();
    viewModel.CustomerRef.setRowFocus(bussrefrow);
    var agencyrefrow  = viewModel.ProductRef.createEmptyRow();
    viewModel.ProductRef.setRowFocus(agencyrefrow);
    window.vm = viewModel;
  }

  return {
    init: init
  }
});
