define(['text!./samplesetting.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,dealeringProductDialog, dealeringShopDialog, dealerResultDialog, deleteAllotDialog, substiDialog, shopSearcher;
  baseData = {
    activityUrl: '/promo-activity',
    baseurl: '/prom/sample-setting',
    PromoActivityList: new u.DataTable(PromoActivity),
    DesignProductRefer: new u.DataTable(DesignProductReferMeta),
    SampleSettingItems: new u.DataTable(SampleSetting),
    DealeringProduct: new u.DataTable(SampleSetting),
    DealeringShop: new u.DataTable(Dealer),
    DeleteDealerProduct: new u.DataTable(SampleSetting),
    SubstiGrands: new u.DataTable(Substi),
    SubstiRefer: new u.DataTable(DesignProductReferMeta),
    //<设计产品id, 门店集合>，门店集合可能的情况：
    //1: 为字符串key，关联shopSetMap中的门店数组
    //2：门店数组
    dealerMap: {},
    //<shopSet_i(i=1,2,...n), 门店数组>
    shopSetMap: {size: 0},
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    // 日期格式化
    dateFormat: common.format.dateFormat,

  };
  rendertype = {
    itemOperation: function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var substi = "data-bind='click:showSubstiDialog.bind($data, " + obj.row.value["$_#_@_id"] + ")'";
      var dealer = "data-bind='click:showDealerDialog.bind($data, " + obj.row.value["$_#_@_id"] + ")'";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      substi +
      ' title="替代品">替代品</a>'+
      '</span>'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      dealer +
      ' title="分配结果">分配结果</a>'+
      '</span>'+
      '</div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    isDistributionRender: function(params) {
      params.element.innerHTML = "否";
      if(params.value!=0&&params.value!="0"){
        params.element.innerHTML = "是";
      }
    },
    detailRender: common.rendertype.detailRender,
    booleanRenderText:common.rendertype.whetherRender,
    //判断表格里的状态
	  approveFormat: function (obj) {
	  	var showValue = obj.value == "1" ? "已审核" : "未审核";
      obj.element.innerHTML = showValue;
	  },
	  enableRender: common.rendertype.enableRender,
  };
  events = {
    // 进入编辑态前事件
    beforeInEdit: function() {
      // 门店查询-办事处参照赋值活动id
      var activityId = viewModel.PromoActivityList.getValue("id");
      var param = {
        activityId: activityId
      }
      $("#shopSearchAgency").attr("data-refparam", JSON.stringify(param));
    },
    // 进入单据编辑页
    setProductSample: function() {
      var selectedRows = viewModel.PromoActivityList.getSelectedRows();
      if(selectedRows.length !== 1) {
        toastr.error("请选择一条数据");
        return;
      }
      viewModel.beforeInEdit();
      var activityId = selectedRows[0].getValue("id");
      viewModel.findByParentid(activityId);
      viewModel.goBillPanel();
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
    },
    // 进入详情页
    detail: function() {
      setTimeout(function() {
        var curRow = viewModel.PromoActivityList.getCurrentRow();
        var id = curRow.getValue("id");
        viewModel.findByParentid(id);
        viewModel.goDetailPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
      }, 0);
    },
    // 根据主表填充子表数据
    findByParentid: function(id) {
      //TODO: 根据活动id查询上样标准设置
      $._ajax({
        url:appCtx + viewModel.baseurl + '/findByActivitytId',
        type: 'get',
        async: false,
        data: {activityId: id},
        success:function(data){
          viewModel.SampleSettingItems.setSimpleData(data,{unSelect:true});
        }
      })
    },
    // 详情页跳转单据页
    detail2bill: function() {
      // var approveStatus = viewModel.PromoActivityList.getValue("approveStatus");
      // approveStatus = parseInt(approveStatus);
      // if(approveStatus == 1) {
      //   toastr.warning("已审核数据不可编辑");
      //   return;
      // }
      viewModel.beforeInEdit();
  		common.bill.detail2bill();
  		viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
    },
    //参照选择批量新增子表
    showAddItemsRef: function() {
      viewModel.clearItemsRef();
      var activityId = viewModel.PromoActivityList.getValue("id");
      var param = {
        activityId: activityId,
        EQ_isEnable: "1"
      }
      $("#addItemsRef").attr("data-refparam", JSON.stringify(param));
      $("#addItemsRef .refer").trigger("click");
    },
    //清空已选子表参照
    clearItemsRef: function() {
      viewModel.DesignProductRefer.setValue("designProductId", "");
      var refer = $("#refContainerdesignProductId").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    //删除子表项
    delItems: function() {
      var selectedRows = viewModel.SampleSettingItems.getSelectedRows();
      viewModel.SampleSettingItems.removeRows(selectedRows);
    },
    // 清空门店查询条件
    clearShopSearcher: function() {
      shopSearcher.clearSearch();
    },
    // 条件查询门店
    searchShop: function() {
      var queryData = shopSearcher.getDataWithOpr();
      queryData["search_EQ_activityId"] = viewModel.PromoActivityList.getValue("id");
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl + "/getAllShops",
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.DealeringShop.setSimpleData(data, {unSelect: true});
        }
      })

    },
    // 全选或全反选门店分配
    toggleAllShop: function(vm, vent) {
      var $allcheckspan = $(vent.target).closest(".ui-table").find(".u-grid-checkbox-outline");
      if(viewModel.DealeringShop.allSelected()===true) {
        viewModel.DealeringShop.setAllRowsUnSelect({quiet:true});
        $allcheckspan.removeClass("is-checked");
      }
      else {
        viewModel.DealeringShop.setAllRowsSelect();
        $allcheckspan.addClass("is-checked");
      }
    },
    // 选择/反选门店分配
    toggleOneShop: function(row, row2, vent) {
      var $checkspan = $(vent.target).closest(".checkbox-wrap").find(".u-grid-checkbox-outline");
      if(row.selected() === true) {
        viewModel.DealeringShop.setRowUnSelect(row);
        $checkspan.removeClass("is-checked");
      }
      else {
        viewModel.DealeringShop.addRowSelect(row);
        $checkspan.addClass("is-checked");
      }
    },
    // 分配
    allot: function() {
      var selectedItemDatas = viewModel.SampleSettingItems.getSimpleData({type: "select"});
      if(!selectedItemDatas || selectedItemDatas.length === 0) {
        toastr.error("请选择要分配的数据");
        return;
      }
      viewModel.DealeringProduct.setSimpleData(selectedItemDatas);
      if(!dealeringProductDialog) {
        dealeringProductDialog = u.dialog({content: "#dialog_dealeringProduct"});
      }
      dealeringProductDialog.show();
    },
    // 正在分配产品对话框下一步
    dealeringProductNext: function() {
      viewModel.clearShopSearcher();
      viewModel.DealeringShop.setSimpleData([]);
      dealeringProductDialog.hide();
      if(!dealeringShopDialog) {
        dealeringShopDialog = u.dialog({content: "#dialog_dealeringShop","width":"92%"});
      }
      dealeringShopDialog.show();
    },
    // 正在分配产品对话框取消
    dealeringProductCancel: function() {
      dealeringProductDialog.hide();
    },
    // 正在分配门店对话框上一步
    dealeringShopPrev: function() {
      dealeringShopDialog.hide();
      dealeringProductDialog.show();
    },
    // 正在分配门店对话框取消
    dealeringShopCancel: function() {
      dealeringShopDialog.hide();
    },
    // 正在分配门店对话框分配
    dealeringShopAllot: function() {
      var addDealerShops = viewModel.DealeringShop.getSimpleData({type:"select"});
      if(!addDealerShops || addDealerShops.length === 0) {
        toastr.error("请选择要分配的数据");
        return;
      }
      var showSetKey = "shopSet_" + (++viewModel.shopSetMap.size);
      viewModel.shopSetMap[showSetKey] = addDealerShops;
      var productItemRows = viewModel.SampleSettingItems.getSelectedRows();
      var productItems = viewModel.SampleSettingItems.getSimpleData({type:"select"});
      var ids = [];
      for(var i=0;i<productItems.length;i++) {
        if(productItems[i].id) {
          ids.push(productItems[i].id);
        }
      }
      var serverExistDealer = {};
      //TODO: 请求后台设计产品已分配门店
      if(ids.length > 0) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/findDealerByIds",
          data: {ids: ids.join(",")},
          async: false,
          success: function(map) {
            serverExistDealer = map
          }
        })
      }
      for(var i=0;i<productItemRows.length;i++) {
        var productId = productItemRows[i].getValue("productId");
        var unionItems = undefined;  //最终分配门店
        // 情况1：前台存在已分配门店
        if(viewModel.dealerMap[productId]) {
          //情况1-1：dealerMap存储字符串
          if(typeof viewModel.dealerMap[productId] === "string") {
            unionItems = viewModel.unionSet("shopId", addDealerShops, viewModel.shopSetMap[viewModel.dealerMap[productId]]);
          }
          //情况1-2：dealerMap存储数组
          else {
            unionItems = viewModel.unionSet("shopId", addDealerShops, viewModel.dealerMap[productId]);
          }
        }
        // 情况2：后台存在已分配门店
        else if(serverExistDealer[productId]) {
          unionItems = viewModel.unionSet("shopId", addDealerShops, serverExistDealer[productId]);
        }
        // 情况3：前台、后台都不存已分配门店
        else {
          unionItems = showSetKey;
        }
        viewModel.dealerMap[productId] =unionItems;
        // 设置子表为已分配状态
        productItemRows[i].setValue("isDistribution", "1");
      }
      dealeringShopDialog.hide();
    },
    // 并集操作
    unionSet: function(keyName) {
      var setArray = Array.prototype.slice.call(arguments, 1);
      var unionMap = {};
      var unionArr = [];
      for(var i=0;i<setArray.length;i++) {
        var oneSet = setArray[i];
        for(var j=0;j<oneSet.length;j++) {
          var keyValue = oneSet[j][keyName];
          if(!unionMap[keyValue]) {
            unionMap[keyValue] = oneSet[j];
          }
        }
      }
      for(var key in unionMap) {
        unionArr.push(unionMap[key]);
      }
      return unionArr;
    },
    // 删除分配
    deleteAllot: function() {
      var selectedItems = viewModel.SampleSettingItems.getSimpleData({type: "select"});
      if(!selectedItems || selectedItems.length === 0) {
        toastr.error("请选择要分配的数据");
        return;
      }
      viewModel.DeleteDealerProduct.setSimpleData(selectedItems);
      if(!deleteAllotDialog) {
        deleteAllotDialog = u.dialog({content: "#dialog_deleteAllot"});
      }
      deleteAllotDialog.show();
    },
    // 删除分配-取消
    deleteAllotCancel: function() {
      deleteAllotDialog.hide();
    },
    // 删除分配-确认
    deleteAllotConfirm: function() {
      var selectedRows = viewModel.SampleSettingItems.getSelectedRows();
      for(var i=0;i<selectedRows.length;i++) {
        var productId = selectedRows[i].getValue("productId");
        viewModel.dealerMap[productId] = [];
        // 设置子表为未分配状态
        selectedRows[i].setValue("isDistribution", "0");
      }
      toastr.success();
      deleteAllotDialog.hide();
    },
    // 查看分配
    showDealerDialog: function(rowId) {
      var curRow = viewModel.SampleSettingItems.getRowByRowId(rowId);
      viewModel.SampleSettingItems.setRowFocus(curRow);
      var productId = curRow.getValue("productId");
      var showDealer = [];
      // 前台存在已分配
      if(viewModel.dealerMap[productId]) {
        // 字符串
        if(typeof viewModel.dealerMap[productId] === "string") {
          showDealer = [].concat(viewModel.shopSetMap[viewModel.dealerMap[productId]]);
        }
        // 数组
        else {
          showDealer = [].concat(viewModel.dealerMap[productId]);
        }
      }
      // 后台存在已分配
      else {
        var itemId = viewModel.SampleSettingItems.getValue("id");
        if(itemId) {
          var serverExistDealer = {};
          //TODO: 查询后台存在已分配
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurl + "/findDealerByIds",
            data: {ids: itemId},
            async: false,
            success: function(map) {
              serverExistDealer = map
            }
          })
          if(serverExistDealer[productId]) {
            showDealer = serverExistDealer[productId];
          }
        }
      }
      viewModel.DealeringShop.setSimpleData(showDealer,{unSelect:true});
      if(!dealerResultDialog) {
        dealerResultDialog = u.dialog({content: "#dialog_dealerResult","width":"92%"});
      }
      dealerResultDialog.show();
    },
    // 删除某一设计产品下的分配
    deleteOneProductAllot: function() {
      var itemRow = viewModel.SampleSettingItems.getCurrentRow();
      var productId = itemRow.getValue("productId");
      var selectedDealerRows = viewModel.DealeringShop.getSelectedRows();
      viewModel.DealeringShop.removeRows(selectedDealerRows, {forceDel: true});
      var dealerShops = viewModel.DealeringShop.getSimpleData();
      viewModel.dealerMap[productId] = dealerShops;
      // 删除全部分配，则设置子表为未分配状态
      if(dealerShops.length == 0) {
        itemRow.setValue("isDistribution", "0");
      }
    },
    // 显示替代品对话框
    showSubstiDialog: function(rowId) {
      viewModel.SubstiGrands.setSimpleData([]);
      var curRow = viewModel.SampleSettingItems.getRowByRowId(rowId);
      viewModel.SampleSettingItems.setRowFocus(curRow);
      // 优先从前台主子DataTable中获取
      var substiDt = curRow.getValue("sampleSettingSubstis");
      if(substiDt.rows().length > 0) {
        viewModel.SubstiGrands.setData(substiDt.getDataByRule("all"));
      }
      // 如前台不存在，请求后台
      else {
        var itemId = curRow.getValue("id");
        if(itemId) {
          //TODO: 根据上样标准子表id查询替代品
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurl + "/findSubstitutionById",
            data: {
              id: itemId
            },
            success: function(data) {
              viewModel.SubstiGrands.setSimpleData(data, {unSelect: true});
            }
          })
        }
      }
      if(!substiDialog) {
        substiDialog = u.dialog({content: "#dialog_substi"});
      }
      substiDialog.show();
    },
    // 替代品取消
    substiCancel: function() {
      substiDialog.hide();
    },
    // 替代品确认
    substiConfirm: function() {
      if(viewModel.billPanelStatus() === CONST.BILLPANELSTATUS.EDIT) {
        // if(viewModel.dataHasChanged(viewModel.SubstiGrands)) {
          var curRow = viewModel.SampleSettingItems.getCurrentRow();
          var substiDt = curRow.getValue("sampleSettingSubstis");
          substiDt.setSimpleData([]);
          substiDt.setData(viewModel.SubstiGrands.getDataByRule("all"));
        // }
      }
      substiDialog.hide();
    },
    // 判断DataTable中数据是否变化
    dataHasChanged: function(dataTable) {
      var hasChanged = false;
      var datas = dataTable.getSimpleData();
      for(var i=0;i<datas.length;i++) {
        if(datas[i].persistStatus !== "nrm") {
          hasChanged = true;
          break;
        }
      }
      return hasChanged;
    },
    // 替代品增行
    addSubsti: function() {
      viewModel.clearSubstiRef();
      var activityId = viewModel.PromoActivityList.getValue("id");
      var param = {
        activityId: activityId,
        EQ_isEnable: "1"
      }
      $("#substiReferDiv").attr("data-refparam", JSON.stringify(param));
      $("#substiRefer + .refer").trigger("click");
    },
    // 替代品删行
    deleteSubsti: function() {
      var selectedRows = viewModel.SubstiGrands.getSelectedRows();
      if(selectedRows.length === 0) {
        toastr.error("请选择要删除的数据");
        return;
      }
      viewModel.SubstiGrands.removeRows(selectedRows);
    },
    //清空已选替代品参照
    clearSubstiRef: function() {
      viewModel.SubstiRefer.setValue("designProductId", "");
      var refer = $("#refContainersubstiRefer").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    // 保存单据
    saveBill: function() {
      var saveData = {
        activityId: viewModel.PromoActivityList.getValue("id"),
        details: viewModel.SampleSettingItems.getSimpleData(),
        distributionMap: viewModel.dealerMap,
        storeSetMap: viewModel.shopSetMap
      };
      //TODO: 保存单据请求
      $._ajax({
        url:appCtx + viewModel.baseurl + "/batchSave",
        type:"post",
        data:JSON.stringify(saveData),
        contentType : "application/json; charset=utf-8",
        success:function(data){
          u.hideLoader({hasback:true});
          viewModel.search();
          viewModel.retListPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        }
      });
    },
    //取消单据
    cancelBill: function() {
      viewModel.search();
      viewModel.retListPanel();
      viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if(reindex){
        viewModel.PromoActivityList.pageIndex(0);
      }
      viewModel.PromoActivityList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.PromoActivityList.pageSize();
      var pageNumber = viewModel.PromoActivityList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.activityUrl,
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
      searcher.clearSearch();
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


    //导入
    importHandle: function() {
      var urlInfo = viewModel.baseurlChild + "/getDataFromExcelDataImport"; //倒入地址参数
      // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
      var ele = $('#importFiel')[0]; //挂载元素
      var setDate = function (data) {
          viewModel.DemoProductCombineItems.setSimpleData(data, {status: "new"});
      };
      common.fileHandle.importToPage(urlInfo,ele,setDate);
    },
    //导出
    exportHandle: function() {
      var searchParams = {}; //搜索查询参数
      var id = viewModel.PromoActivityList.getCurrentRow().getValue("id")
      searchParams['search_EQ_activityId']=id;
      var templateUrl = viewModel.baseurlChild + '/downloadExcelTemplate'; //导出模板地址参数
      var excelDataUrl =  viewModel.baseurlChild + '/excelDataExport'; //导出数据地址参数
      var listData = viewModel.DemoProductCombineItems; //需要导出表格的dataTable
      var ele = $('#exportFiel')[0]; //挂载元素
      common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);

    },
    //启用
    enable: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedRows();
      if(selectedRows.length < 1){
      		toastr.warning("请选择数据");
      		return;
      }
      for(var i=0;i<selectedRows.length;i++) {
        selectedRows[i].setValue("isEnable", "1");
      }
    },
    //停用
    disable: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedRows();
      if(selectedRows.length < 1){
      		toastr.warning("请选择数据");
      		return;
      }
      for(var i=0;i<selectedRows.length;i++) {
        selectedRows[i].setValue("isEnable", "0");
      }
    },
    // 详情-停用
    detailDisable: function() {
      var selectedRows = viewModel.DemoProductCombineItems.getSelectedRows();
      var ids = [];
      for(var i=0;i<selectedRows.length;i++) {
        if(selectedRows[i].getValue("isEnable") == "1") {
          ids.push(selectedRows[i].getValue("id"));
        }
      }
      $._ajax({
        type: "post",
        url: appCtx + viewModel.baseurlChild + "/batch-disable",
        data: {ids: ids.join(",")},
        success: function() {
          for(var i=0;i<selectedRows.length;i++) {
            if(selectedRows[i].getValue("isEnable") == "1") {
              selectedRows[i].setValue("isEnable", "0");
            }
          }
          toastr.success();
        }
      });
    },
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
    searcher = new searchbox(
      $("#promoActivity-searchcontent")[0],
      [
        {
          type:"refer",
          key:"activeType--id",
          label:"活动类型名称",
          refinfo:"activitytypeb",
          multi:true,
        },
        {
          type:"refer",
          key:"activeNode--id",
          label:"活动节点名称",
          refinfo:"activenode",
          multi:true
        },
        {
	        type:"radio",
	        key:"approveStatus",
	        label:"审核状态",
	        dataSource:CONST.APPROVESEARCH,
	        defaultvalue: CONST.DEFAULTOPTION,
	        opr: "IN",
	      },
        {
          type:"text",
          key:"code",
          label:"活动编码"
        },
        {
          type:"text",
          key:"name",
          label:"活动名称"
        },
        {
          type:"daterange",
          label:"订货开始日期",
        	key:"orderStartDate"
        },
        {
          type:"daterange",
          label:"订货截至日期",
        	key:"orderEndDate"
        },
        {
          type:"daterange",
          label:"终端活动开始日期",
          key:"terminalStartDate"
        },
        {
          type:"daterange",
          label:"终端活动截至日期",
          key:"terminalEndDate"
        },
        {
          type:"daterange",
          label:"报名开始日期",
          key:"enrolStartDate"
        },
        {
          type:"daterange",
          label:"报名结束日期",
          key:"enrolEndDate"
        },
      ]);
      // billfooter = new Billfooter(
      //   $(".ui-bill-footer").get(),
      //   viewModel,
      //   "PromoActivityList"
      // );
    // 列表查询数据(无查询条件)
    viewModel.search();
    // TODO: 门店查询组件
    shopSearcher = new searchbox($("#shop-searchcontent")[0], [
      {
        type:"refer",
        key:"agencyId",
        label:"办事处",
        refinfo:"promofficeb",
        domid: "shopSearchAgency",
        multi:true
      },
      {
        type:"text",
        label:"面积 大于等于",
        key:"operateAreaG",
        opr: CONST.OPERATOR.GTE
      },
      {
        type:"text",
        label:"面积 小于等于",
        key:"operateAreaL",
        opr: CONST.OPERATOR.LTE
      },
    ]);
    var r1 = viewModel.DesignProductRefer.createEmptyRow();
    viewModel.DesignProductRefer.setRowFocus(r1);
    var r2 = viewModel.SubstiRefer.createEmptyRow();
    viewModel.SubstiRefer.setRowFocus(r2);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#promoActivity-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 分配门店查询组件-回车出发查询
    $('#shop-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.searchShop();
      }
    });
    // 选择子表参照后增行,合并已存在行和新增行
    viewModel.DesignProductRefer.on("designProductId.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainerdesignProductId").data("uui.refer");
      var refValues = refer.values;
      if(refValues && refValues.length > 0) {
        var addItems = [];
        var existRealItems = viewModel.SampleSettingItems.getRealSimpleData();
        var existRealItemsMap = {}; // 用于快速判断新增行是否已存在
        for(var i=0;i<existRealItems.length;i++) {
          existRealItemsMap[existRealItems[i]["productId"]] = true;
        }
        for(var i=0;i<refValues.length;i++) {
          // 新增行已存在，则忽略
          if(existRealItemsMap[refValues[i].refpk]) {
            continue;
          }
          var addItem = {};
          addItem["productId"] = refValues[i].refpk;
          addItem["productCode"] = refValues[i].refcode;
          addItem["productName"] = refValues[i].refname;
          addItem["productCategory"] = refValues[i].productCategory;
          addItem["productModel"] = refValues[i].productModel;
          addItem["productSaleSerie"] = refValues[i].productSaleSerie;
          addItem["isDistribution"] = "0";
          addItem["num"] = 1;
          addItem["persistStatus"] = "new";
          addItems.push(addItem);
        }
        var existItems = viewModel.SampleSettingItems.getSimpleData();
        viewModel.SampleSettingItems.setSimpleData(addItems.concat(existItems), {unSelect: true}, true);
      }
    });
    // 替代品参照选择后，替代品增行
    viewModel.SubstiRefer.on("designProductId.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainersubstiRefer").data("uui.refer");
      var refValues = refer.values;
      if(refValues && refValues.length > 0) {
        var existRealSubstis = viewModel.SubstiGrands.getRealSimpleData();
        var existRealSubstiMap = {}; // 用于快速判断新增行是否已存在
        for(var i=0;i<existRealSubstis.length;i++) {
          existRealSubstiMap[existRealSubstis[i]["productId"]] = true;
        }
        for(var i=0;i<refValues.length;i++) {
          if(existRealSubstiMap[refValues[i].refpk]) {
            continue;
          }
          var newRow = viewModel.SubstiGrands.createEmptyRow();
          var newData = {
            productId: refValues[i].refpk,
            productCode: refValues[i].refcode,
            productName: refValues[i].refname,
            productCategory: refValues[i].productCategory,
            productModel: refValues[i].productModel,
            productSaleSerie: refValues[i].productSaleSerie,
          }
          newRow.setSimpleData(newData, "new");
        }
      }
    });
    // 单据状态变化后事件
    viewModel.billPanelStatus.subscribe(function(value) {
      // 进入编辑态后操作
      if(value === CONST.BILLPANELSTATUS.EDIT || value === CONST.BILLPANELSTATUS.DETAIL) {
        viewModel.dealerMap = {};
        viewModel.shopSetMap = {size: 0};
      }
    })
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
});
