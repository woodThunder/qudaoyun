define(['text!./prombasicpriceadjust.html','ocm_common','searchbox','editcard'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/,'./meta.js','ocm_global'], function (tpl,common,searchbox,editcard/*,bpmopenbill*/) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,dialog_detailrefer,searcher_detailrefer;
  baseData = {
    baseurl : '/prom-basic-price-adjust',
    PriceAdjustList: new u.DataTable(PriceAdjust),
    PriceAdjustDetailItems: new u.DataTable(PriceAdjustDetail),
    PriceAdjustDetailRefer: new u.DataTable(PriceAdjustDetail),
    PackRef: new u.DataTable(PackRef),
    ProductRef: new u.DataTable(ProductRef),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    approveFormat: common.format.approveFormat,
    channeltypeSrc: ko.observable(CONST.CHANNELTYPE),
    // channeltypeSrc: ko.observable(CONST.CHANNELTYPE.concat([{name:"全部",value:""}])),
  };
  rendertype = {
    operation: common.rendertype.operation4auth,
    approveRender: common.rendertype.approveRender,
    detailRender: common.rendertype.detailRender,
    packRefRender: function(obj) {
      var referDOM = ''+
      '<div id="packRefShowDOM" class="input-group date form_date">' +
        '<input class="form-control" type="text" value="'+obj.value+'" />' +
          '<span class="u-form-control-feedback fa fa-list-ul refer" data-bind="click: showRealPackRef"></span>' +
      '</div>'
      obj.element.innerHTML = referDOM;
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
      //导入
      importHandle: function() {
        var realRows = viewModel.PriceAdjustDetailItems.getAllRealRows();
        if(realRows.length > 0) {
          toastr.error("表体已存在数据，不可导入");
          return;
        }
        var urlInfo = viewModel.baseurl + "/getDataFromExcelDataImport"; //倒入地址参数
        // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
        var ele = $('#importFiel')[0]; //挂载元素
        var setDate = function (data) {
          viewModel.PriceAdjustDetailItems.setSimpleData(data, {status: "new"});
          // for(var i=0; i<existRows.length;i++) {
          //   var status = existRows[i].status;
          //   var rowData = existRows[i].getSimpleData();
          //   viewModel.PriceAdjustDetailItems.addSimpleData(rowData, status);
          // }
        };
        common.fileHandle.importToPage(urlInfo,ele,setDate);
      },
      //导出
      exportHandle: function() {
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.PriceAdjustDetailItems; //需要导出表格的dataTable
        var searchParams = {}; //搜索查询参数
        var id = viewModel.PriceAdjustList.getCurrentRow().getValue("id");
        var ele = undefined;
        if(id) {
          searchParams['search_EQ_parent.id']=id;
          ele = $('#exportFiel')[0]; //挂载元素
        }
        else {
          ele = $("#exportAddTpl")[0];
        }
        common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.PriceAdjustList.createEmptyRow();
        viewModel.PriceAdjustList.setRowFocus(curRow);
        viewModel.PriceAdjustDetailItems.removeAllRows();
        common.bill.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      // 子表数据
      fillData: function(id) {
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/detail",
          data: {id: id},
          async: false,
          success: function(details) {
            viewModel.PriceAdjustDetailItems.removeAllRows();
            viewModel.PriceAdjustDetailItems.setSimpleData(details,{unSelect:true});
          }
        })
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.PriceAdjustList.setRowFocus(index);
        if(!viewModel.canInEdit()) return;
        var id = viewModel.PriceAdjustList.getValue("id");
        viewModel.PriceAdjustList.originEditData = viewModel.PriceAdjustList.getFocusRow().getSimpleData();
        //请求完整主子表信息
        viewModel.fillData(id);
        common.bill.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 详情
      detail: function() {
        setTimeout(function(){
          var id = viewModel.PriceAdjustList.getValue("id");
          viewModel.fillData(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          //加入bpm按钮
          //viewModel.initBPMFromBill(id,viewModel);
          common.bill.goDetailPanel();
        }, 0);
      },
      // 删除
      del: function(index,rowId) {
        var ids = [];
        var rows = [];
        if(Number.isInteger(index)) {
          viewModel.PriceAdjustList.setRowSelectbyRowId(rowId);
        }
        rows = viewModel.PriceAdjustList.getSelectedRows();
        if(rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
          }
        }
        for(var i=0;i<rows.length;i++) {
          var approveStatus = rows[i].getValue("auditStatus");
          approveStatus = parseInt(approveStatus);
          if(approveStatus == 1) {
            toastr.error("已审核数据不可删除");
            return;
          }
        }
        common.dialog.confirmDialog({
          msg1: '确认删除这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            $._ajax({
              url:appCtx + viewModel.baseurl + "/delete",
              type:"post",
              data:{
                ids:ids.join(",")
              },
              success:function(data){
                viewModel.PriceAdjustList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.PriceAdjustList.pageIndex(0);
        }
        viewModel.PriceAdjustList.removeAllRows();
        var queryData = searcher.getDataWithOpr();
        queryData.size = viewModel.PriceAdjustList.pageSize();
        queryData.page = viewModel.PriceAdjustList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.PriceAdjustList.setSimpleData(data.content,{unSelect:true});
            viewModel.PriceAdjustList.totalRow(data.totalElements);
            viewModel.PriceAdjustList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        searcher.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.PriceAdjustList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.PriceAdjustList.pageSize(size);
        viewModel.search(true);
      },
      // 取消单据
      cancelBill: function() {
        //清除子表数据
        viewModel.PriceAdjustDetailItems.removeAllRows();
        var curRow = viewModel.PriceAdjustList.getCurrentRow();
        // 修改，则还原
        if(curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.PriceAdjustList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.PriceAdjustList.removeRow(curRow);
        }
        viewModel.retListPanel();
      },
      // 保存单据
      saveBill: function() {
        var result = app.compsValidateMultiParam({element:$(".ui-bill-panel")[0],showMsg:true});
        if(!result.passed) {
          return;
        }
        var parentData = viewModel.PriceAdjustList.getCurrentRow().getSimpleData();
        var childDatas = viewModel.PriceAdjustDetailItems.getSimpleData();
        parentData.details = childDatas;
        var _ajaxType = viewModel.PriceAdjustList.getValue("id") ? "put": "post";
        $._ajax({
          url:appCtx + viewModel.baseurl,
          type:_ajaxType,
          data:JSON.stringify(parentData),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            viewModel.PriceAdjustList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
            viewModel.cleanSearch();
            viewModel.search();
          }
        })
      },
      // 弹出产品/产品组合参照
      showProductRef:function() {
        viewModel.clearProductRef();
        $("#productRefer").find(".refer").trigger("click");
      },
      // 清空已选产品/产品组合参照
      clearProductRef: function() {
        viewModel.ProductRef.setValue("productRefer", "");
        var refer = $("#refContainerproductRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 删除子表项
      delItems: function() {
        var selectedRows = viewModel.PriceAdjustDetailItems.getSelectedRows();
        if(selectedRows && selectedRows.length > 0) {
          for(var i=0;i<selectedRows.length;i++) {
            selectedRows[i].setValue("dr", "1");
          }
          viewModel.PriceAdjustDetailItems.removeRows(selectedRows);
        }
      },
      // 弹出促销基础价参照对话框
      showPriceRefDialog: function() {
        viewModel.cleanDetailReferSearch();
        viewModel.searchDetailRefer();
        if(!dialog_detailrefer) {
          dialog_detailrefer = u.dialog({content:"#dialog_detailrefer",hasCloseMenu:true,width:"80%"});
        }
        else {
          dialog_detailrefer.show();
        }
      },
      // 详情页跳转编辑单据页
      detail2bill: function() {
        if(!viewModel.canInEdit()) return;
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      canInEdit: function() {
        var canIn = true;
        var approveStatus = viewModel.PriceAdjustList.getValue("auditStatus");
        approveStatus = parseInt(approveStatus);
        if(approveStatus == 1) {
          toastr.error("已审核数据不可编辑");
          canIn = false;
        }
        return canIn;
      },
      // 返回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      searchDetailRefer: function(reindex) {
        if(reindex){
          viewModel.PriceAdjustDetailRefer.pageIndex(0);
        }
        viewModel.PriceAdjustDetailRefer.removeAllRows();
        var queryData = searcher_detailrefer.getDataWithOpr();
        queryData.size = viewModel.PriceAdjustDetailRefer.pageSize();
        queryData.page = viewModel.PriceAdjustDetailRefer.pageIndex();
        queryData["EQ_isEnable"] = "1";
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl + "/basic-price-query",
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.PriceAdjustDetailRefer.setSimpleData(data.content,{unSelect:true});
            viewModel.PriceAdjustDetailRefer.totalRow(data.totalElements);
            viewModel.PriceAdjustDetailRefer.totalPages(data.totalPages);
          }
        })
      },
      cleanDetailReferSearch: function() {
        searcher_detailrefer.clearSearch();
      },
      // 将参照中的促销基础价带入调价单
      confirmDetailRefer: function() {
        var selectedDatas = viewModel.PriceAdjustDetailRefer.getSimpleData({type:"select"});
        viewModel.PriceAdjustDetailItems.addSimpleData(selectedDatas, u.Row.STATUS.NEW);
        dialog_detailrefer.hide();
      },
      cancelDetailRefer: function() {
        dialog_detailrefer.hide();
      },
      pageChangeDetailRefer: function(index) {
        viewModel.PriceAdjustDetailRefer.pageIndex(index);
        viewModel.searchDetailRefer();
      },
      sizeChangeDetailRefer: function(size) {
        viewModel.PriceAdjustDetailRefer.pageSize(size);
        viewModel.searchDetailRefer();
      },
      // 点击grid包件参照 触发外部真实包件参照
      showRealPackRef: function() {
        viewModel.clearRealPackRef();
        //TODO: 产品/产品组合主键 作为参数传给包件参照，使其只能参照某一产品/产品组合下的包件
        var productId = viewModel.PriceAdjustDetailItems.getValue("productId");
        var combineId = viewModel.PriceAdjustDetailItems.getValue("productCombineId");
        if(!productId && !combineId) {
          toastr.error("请先录入产品");
          return;
        }
        var param = {};
        param["productId"] = productId ? productId: "";
        param["combineId"] = combineId ? combineId: "";
        $("#packRefer").attr("data-refparam",JSON.stringify(param));
        $("#packRefer .refer").trigger("click");
      },
      // 清除参照之前的选择
      clearRealPackRef: function() {
        viewModel.PackRef.setValue("packRefer", "");
        var refer = $("#refContainerpackRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //审核
      approve: function() {
        var selectedRows = viewModel.PriceAdjustList.getSelectedRows();
        if(selectedRows.length != 1) {
          toastr.error("请选择一条数据");
          return;
        }
        if(selectedRows[0].getValue("auditStatus") == "1") {
          toastr.error("已审核数据不可重复审核");
          return;
        }
        var id = selectedRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/approve",
          data: {
            id: id
          },
          success: function() {
            viewModel.search();
          }
        })
      },
      //弃审
      unapprove: function() {

      },
      //审批流添加功能----提交审批
      submit: function () {
          var selectedData = viewModel.PriceAdjustList.getSimpleData({type: 'select'});
          if(selectedData.length == 0) {
            toastr.error("请选择数据");
            return;
          }
          if(selectedData[0].state &&	selectedData[0].state !='0'){ //状态不为待确认
            toastr.error("该单据已经使用关联流程，不能启动","error");
            return ;
          }
          for(var i=0;i<selectedData.length;i++) {
            selectedData[i].details = [];
          }
          $.ajax({
              type: 'GET',
              url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=prombasicpriceadjust&nodekey=001',
              datatype: 'json',
              contentType: 'application/json;charset=utf-8',
              success: function (result) {
                if(result){
                  if(result.success=='success'){
                    var data = result.detailMsg.data;
                    var processDefineCode = data.res_code;
                    viewModel.submitBPMByProcessDefineCode(selectedData,processDefineCode);
                  }else{
                    toastr.error(data.detailMsg.msg);
                  }

                }else {
                      toastr.error("无返回数据");
                  }
              }
        })
      },
      submitBPMByProcessDefineCode:function(selectedData,processDefineCode){
        var nodeJs = "/ocm-web/pages/prom/prombasicpriceadjust/prombasicpriceadjust.js";
       //  nodeJs = encodeURIComponent(nodeJs);
        $.ajax({
              type: "post",
              url: appCtx + viewModel.baseurl + "/submit?processDefineCode=" + processDefineCode + "&nodeJs="+nodeJs,
              contentType: 'application/json;charset=utf-8',
              data: JSON.stringify(selectedData),
              success: function (res) {
                  if (res) {
                      if (res.success == 'success') {
                        toastr.success();
                        viewModel.search();
                      } else {
                        toastr.error(res.message);
                      }
                  } else {
                      toastr.error("无返回数据");
                  }
              }

          });
      },
  }
  viewModel = u.extend({},baseData,events,rendertype/*bpmopenbill.model*/);

  function appInit(element, params){
    viewModel.PriceAdjustDetailRefer.pageSize(5);
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
    searcher = new searchbox(
      $("#searcher-searchcontent")[0],
      [
         {
          type:"text",
          key:"code",
          label:"调价单编码",
        },
        {
          type:"text",
          key:"name",
          label:"调价单名称"
        },
        {
          type:"daterange",
          key:"auditTime",
          label:"审核日期"
        },
        {
          type:"combo",
          key:"auditStatus",
          label:"审核状态",
          dataSource: CONST.APPROVE,
        },
        {
          type:"text",
          key:"note",
          label:"备注"
        }
      ]);
    searcher_detailrefer = new searchbox(
      $("#pricerefer-searchcontent")[0],
      [
        {
         type:"text",
         key:"code",
         label:"产品编码",
        },
        {
         type:"text",
         key:"name",
         label:"产品名称",
        },
        {
         type:"refer",
         key:"agencypartition--id",
         label:"办事处分区",
         refinfo:"agencypartitiongrid",
         multi:true,
        },
        {
         type:"refer",
         key:"officeId",
         label:"办事处",
         refinfo:"organization_ocm",
         clientParam:{"EQ_isOffice":"1"},
         multi:true,
        },
        {
         type:"text",
         key:"packProCode",
         label:"包件编码",
        },
        {
         type:"text",
         key:"packProName",
         label:"包件名称",
        },
        {
         type:"combo",
         key:"channelId",
         label:"渠道类型",
         dataSource: CONST.CHANNELTYPE,
        //  hasAll: true
        },
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
    viewModel.searchDetailRefer();
    var row = viewModel.ProductRef.createEmptyRow();
    viewModel.ProductRef.setRowFocus(row);
    var packRow = viewModel.PackRef.createEmptyRow();
    viewModel.PackRef.setRowFocus(packRow);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#searcher-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //价格处理
    viewModel.PriceAdjustDetailItems.on("price.valuechange", function(obj) {
      var rowObj = obj.rowObj;
      var price = rowObj.getValue("price");
      price = parseFloat(price);
      var arr = parseInt(price).toString().split('');
      var num = parseInt(arr[arr.length-1]);
      if(num == 4 || num == 7) {
        price += 1;
        toastr.info("价格个位数如果是4则变更为5，如果是7则变更为8");
        obj.rowObj.setValue("price", price);
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
            // row = viewModel.PriceAdjustDetailItems.getRowByField("productId", refpk);
            productId = refpk;
          }
          else {
            // row = viewModel.PriceAdjustDetailItems.getRowByField("combineId", refpk);
            combineId = refpk
          }
          var newrow = undefined;
          // if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            newrow = viewModel.PriceAdjustDetailItems.createEmptyRow({unSelect:true});
            console.log(newrow);
            newrow.setValue("productShowCode", refValues[i].refcode);
            newrow.setValue("productShowName", refValues[i].refname);
            newrow.setValue("productId", productId);
            newrow.setValue("productCombineId", combineId);
            newrow.setValue("productSeriousId", refValues[i].saleSeriesId);
            newrow.setValue("productSeriousName", refValues[i].saleSeriesName);
            newrow.setValue("productGroup", refValues[i].productGroupName);
            console.log(newrow);
          // }
        }
      }
    });
    // 包件参照选择，为包件所在行对应的产品/产品组合增加多个包件行
    viewModel.PackRef.on("packRefer.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refValues = $("#refContainerpackRefer").data("uui.refer").values;
      var curDetailRow = viewModel.PriceAdjustDetailItems.getCurrentRow();
      console.log(curDetailRow);
      var showCode = curDetailRow.getValue("productShowCode");
      var showName = curDetailRow.getValue("productShowName");
      var productId = curDetailRow.getValue("productId");
      var combineId = curDetailRow.getValue("productCombineId");
      if(refValues && refValues.length > 0) {
        var newRows = [];
        for(var i =0;i<refValues.length; i++) {
          var newRow = undefined;
          if(i === 0) {
            newRow = curDetailRow;
          }
          else {
            newRow = new u.Row({parent: viewModel.PriceAdjustDetailItems});
            newRows.push(newRow);
          }
          newRow.setValue("packProId",refValues[i].refpk);
          newRow.setValue("packProName",refValues[i].refname);
          newRow.setValue("packProCode",refValues[i].refcode);
          newRow.setValue("productShowCode",showCode);
          newRow.setValue("productShowName",showName);
          newRow.setValue("productId",productId);
          newRow.setValue("productCombineId",combineId);
        }
        var focusIndex = viewModel.PriceAdjustDetailItems.focusIndex();
        viewModel.PriceAdjustDetailItems.insertRows(focusIndex+1, newRows);
      }
    });
  }

  function init(element, params) {
    console.log(location);
    appInit(element, params);
    afterRender();
    window.vm =viewModel;
  }

  return {
    init: init
  }
});
