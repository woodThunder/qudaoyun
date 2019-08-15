define(['text!./promoactivity.html','ocm_common','searchbox','editcard','billfooter',/*'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js',*/'./meta.js','ocm_global','ajaxfileupload','ossupload','interfaceFileImpl'], function (tpl,common,searchbox,editcard,billfooter/*,bpmopenbill*/) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,fileDialog;
  baseData = {
    baseurl : '/promo-activity',
    PromoActivityList: new u.DataTable(PromoActivity),
    BussTypeItems: new u.DataTable(BussType),
    BussTypeRef: new u.DataTable(BussTypeRef),
    AgencyItems: new u.DataTable(Agency),
    AgencyRef: new u.DataTable(AgencyRef),
    FileList: new u.DataTable(FileMeta),
    billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    approveFormat: common.format.approveFormat,
    enableFormat: common.format.enableFormat,
    dateFormat: common.format.dateFormat,
    checkboxsrc: [{value:"1",name:"选项1"},{value:"2",name:"选项2"}],
    activityUseStatusSrc: [{value: "all", name: "全部"},{value: "1", name: "已结束"},{value: "2", name: "执行中"},{value: "3", name: "未开始"}],
    copyActivityId: undefined,
  };
  rendertype = {
    operation: common.rendertype.operation,
    enableRender:common.rendertype.enableRender,
    detailRender:common.rendertype.detailRender,
    approveRender:common.rendertype.approveRender,
    useStatusRender: function(obj) {
      var orderStart = obj.row.value["orderStartDate"];
      var orderEnd = obj.row.value["orderEndDate"];
      var useStatus = undefined;
      var nowDateTime = new Date().getTime();
      if(nowDateTime < orderStart) {
        useStatus = "未开始";
      }
      else if(nowDateTime >= orderStart && nowDateTime<=orderEnd) {
        useStatus = "执行中";
      }
      else {
        useStatus = "已结束";
      }
      obj.element.innerHTML = useStatus;
    },
  };
  events = {
      //删除和批量删除
      del: function (data,rowId) {
        var ids = [];
        var rows = [];
        if (typeof(data) == 'number') {
          viewModel.PromoActivityList.setRowSelectbyRowId(rowId);
        }
        rows = viewModel.PromoActivityList.getSelectedRows();
        if(rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
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
              // data: "ids=" + ids.join(","),
              data:{
                ids:ids.join(",")
              },
              success:function(data){
                viewModel.PromoActivityList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.PromoActivityList.pageIndex(0);
        }
        viewModel.PromoActivityList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        // 根据使用状态及当前日期计算查询条件：
        // 已结束：订货结束日期 < 当前日期； 执行中： 订货开始日期 <= 当前日期 <= 订货结束日期； 未开始： 订货开始日期 > 当前日期
        var nowDate = new Date();
        var useStatus = queryData["search_EQ_useStatus"];
        //已结束
        if(useStatus === "1") {
          queryData["search_"+CONST.OPERATOR.LT+"_orderEndDate_date"] = nowDate.getTime();
        }
        //执行中
        else if(useStatus === "2") {
          queryData["search_"+CONST.OPERATOR.LTE+"_orderStartDate_date"] = nowDate.getTime();
          queryData["search_"+CONST.OPERATOR.GTE+"_orderEndDate_date"] = nowDate.getTime();
        }
        //未开始
        else if(useStatus === "3") {
          queryData["search_"+CONST.OPERATOR.GT+"_orderStartDate_date"] = nowDate.getTime();
        }
        delete queryData["search_EQ_useStatus"];
        var pageSize = viewModel.PromoActivityList.pageSize();
        var pageNumber = viewModel.PromoActivityList.pageIndex();
        queryData.size = pageSize;
        queryData.page = pageNumber;
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
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
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.PromoActivityList.createEmptyRow();
        viewModel.PromoActivityList.setRowFocus(curRow);
        viewModel.AgencyItems.removeAllRows();
        viewModel.BussTypeItems.removeAllRows();
        common.bill.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        setTimeout(function(){
          var approveStatus = viewModel.PromoActivityList.getValue("approveStatus");
          approveStatus = parseInt(approveStatus);
          if(approveStatus === 1) {
            toastr.error("已审核数据不可编辑");
            return;
          }
          viewModel.PromoActivityList.setRowFocus(index);
          var id = viewModel.PromoActivityList.getValue("id");
          viewModel.PromoActivityList.originEditData = viewModel.PromoActivityList.getFocusRow().getSimpleData();
          //请求完整主子表信息
          viewModel.fillData(id);
          common.bill.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        }, 0);
      },
      //进入复制单据页
      showCopyBillPanel: function() {
        var selectedRows = viewModel.PromoActivityList.getSelectedRows();
        var focusRow = viewModel.PromoActivityList.getFocusRow();
        // 只支持单一复制，批量复制需单独处理
        if(selectedRows.length != 1) {
          toastr.error("请选择一条数据");
          return;
        }
        var copyRow = selectedRows[0];
        viewModel.copyActivityId = copyRow.getValue("id");
        var curRow = viewModel.PromoActivityList.createEmptyRow();
        curRow.setSimpleData(copyRow.getSimpleData(),u.Row.STATUS.NEW);
        curRow.setValue("approveStatus", "0");
        curRow.setValue("enableStatus", "1");
        viewModel.PromoActivityList.setRowFocus(curRow);
        var id = copyRow.getValue("id");
        viewModel.fillData(id, u.Row.STATUS.NEW);
        //删除主表主键，编码，审计信息
        viewModel.clearBaseProp(curRow);
        viewModel.BussTypeItems.rows().forEach(function(row){
          viewModel.clearBaseProp(row);
        });
        viewModel.AgencyItems.rows().forEach(function(row){
          viewModel.clearBaseProp(row);
        });
        common.bill.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
      },
      //进入详情页
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.PromoActivityList.getCurrentRow();
          var id = curRow.getValue("id");
          //请求完整主子表信息
          viewModel.fillData(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          //加入bpm按钮
          //viewModel.initBPMFromBill(id,viewModel);
          common.bill.goDetailPanel();
        }, 0);
      },
      // 详情页跳转编辑单据页
      detail2bill: function() {
        var approveStatus = viewModel.PromoActivityList.getValue("approveStatus");
        approveStatus = parseInt(approveStatus);
        if(approveStatus === 1) {
          toastr.error("已审核数据不可编辑");
          return;
        }
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      // 返回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      // （编辑/详情）填充完整主子表数据
      fillData: function(id, status) {
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/queryDetail",
          data: {id: id},
          async: false,
          success: function(data) {
            var promoactivity = data;
            var bussTypes = data.bussTypes;
            var officeItems = data.officeItems;
            var row = viewModel.PromoActivityList.getCurrentRow();
            // row.setSimpleData(promoactivity);
            viewModel.BussTypeItems.removeAllRows();
            viewModel.BussTypeItems.addSimpleData(bussTypes,status);
            viewModel.AgencyItems.removeAllRows();
            viewModel.AgencyItems.addSimpleData(officeItems,status);
          }
        })
      },
      // 清除基类属性
      clearBaseProp: function(row) {
        var dataTable = row.parent;
        dataTable.getMeta("id") ? row.setValue("id", "") : '';
        dataTable.getMeta("code") ? row.setValue("code", "") : '';
        dataTable.getMeta("name") ? row.setValue("name", "") : '';
        dataTable.getMeta("creator") ? row.setValue("creator", "") : '';
        dataTable.getMeta("creationTime") ? row.setValue("creationTime", "") : '';
        dataTable.getMeta("modifier") ? row.setValue("modifier", "") : '';
        dataTable.getMeta("modifiedTime") ? row.setValue("modifiedTime", "") : '';
      },
      //保存单据
      saveBill: function() {
        var validate = $(".ui-bill-panel")[0];
        var result = app.compsValidateMultiParam({element:validate,showMsg:true});
        if(!result.passed) {
          return;
        }
        // 如果已录入终端活动期间，订货有效期必须在终端活动期间范围内
        var curActivityRow = viewModel.PromoActivityList.getCurrentRow();
        var terminalStartDate = curActivityRow.getValue("terminalStartDate");
        var terminalEndDate = curActivityRow.getValue("terminalEndDate");
        var orderStartDate = curActivityRow.getValue("orderStartDate");
        var orderEndDate = curActivityRow.getValue("orderEndDate");
        if(terminalStartDate && terminalEndDate) {
          if((orderStartDate > terminalStartDate) || (orderEndDate < terminalEndDate)) {
            toastr.error("终端活动期必须在订货有效期间范围内");
            return;
          }
        }
        var PromoActivityData = viewModel.PromoActivityList.getCurrentRow().getSimpleData();
        var busstypes = viewModel.BussTypeItems.getSimpleData();
        var agencys = viewModel.AgencyItems.getSimpleData();
        PromoActivityData.bussTypes = busstypes;
        PromoActivityData.officeItems = agencys;
        // 复制
        if(viewModel.billPanelStatus() === CONST.BILLPANELSTATUS.COPY) {
          PromoActivityData.id = viewModel.copyActivityId;
          $._ajax({
            url:appCtx + viewModel.baseurl + "/copy",
            type:"post",
            data:JSON.stringify(PromoActivityData),
            contentType : "application/json; charset=utf-8",
            success:function(data){
              // viewModel.PromoActivityList.getFocusRow().setSimpleData(data);
              viewModel.retListPanel();
              viewModel.cleanSearch();
              viewModel.search();
            }
          })
        }
        // 新增或修改
        else {
          var _ajaxType = viewModel.PromoActivityList.getValue("id") ? "put": "post";
          $._ajax({
            url:appCtx + viewModel.baseurl,
            type:_ajaxType,
            data:JSON.stringify(PromoActivityData),
            contentType : "application/json; charset=utf-8",
            success:function(data){
              // viewModel.PromoActivityList.getFocusRow().setSimpleData(data);
              viewModel.retListPanel();
              viewModel.cleanSearch();
              viewModel.search();
            }
          })
        }
      },
      //取消单据
      cancelBill: function() {
        //清除子表数据
        // viewModel.BussTypeItems.removeAllRows();
        // viewModel.AgencyItems.removeAllRows();
        // var curRow = viewModel.PromoActivityList.getCurrentRow();
        // // 修改，则还原
        // if(curRow.getValue("id")) {
        //   curRow.setSimpleData(viewModel.PromoActivityList.originEditData)
        // }
        // // 新增或复制，则删除
        // else {
        //   viewModel.PromoActivityList.removeRow(curRow);
        // }
        viewModel.search();
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.PromoActivityList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/enable",
          data: {ids: ids.join(",")},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("enableStatus", "1");
            }
          }
        })
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.PromoActivityList.getSelectedRows();
        if(selectedRows.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/disable",
          data: {ids: ids.join(",")},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("enableStatus", "0");
            }
          }
        })
      },
      //弹出业务类型参照
      showBussRef: function() {
        viewModel.clearBussRef();
        $("#bussRefer").find(".refer").trigger("click");
      },
      //删除已参照的业务类型
      delBussItems: function() {
        var selectedRows = viewModel.BussTypeItems.getSelectedRows();
        selectedRows.forEach(function(row, index, arr) {
          row.setValue("dr", "1");
        });
        if(selectedRows && selectedRows.length > 0) {
          viewModel.BussTypeItems.removeRows(selectedRows);
        }
      },
      //清空已选业务类型参照
      clearBussRef: function() {
        viewModel.BussTypeRef.setValue("bussRefer", "");
        var refer = $("#refContainerbussRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //弹出办事处参照
      showAgencyRef: function() {
        viewModel.clearAgencyRef();
        $("#agencyRefer").find(".refer").trigger("click");
      },
      //删除已参照的办事处
      delAgencyItems: function() {
        var selectedRows = viewModel.AgencyItems.getSelectedRows();
        selectedRows.forEach(function(row, index, arr) {
          row.setValue("dr", "1");
        });
        if(selectedRows && selectedRows.length > 0) {
          viewModel.AgencyItems.removeRows(selectedRows);
        }
      },
      //清空已选办事处参照
      clearAgencyRef: function() {
        viewModel.AgencyRef.setValue("agencyRefer", "");
        var refer = $("#refContaineragencyRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 审核
      approve: function() {
        var selectedRows = viewModel.PromoActivityList.getSelectedRows();
        if(selectedRows.length != 1) {
          toastr.error("请选择一条数据");
          return;
        }
        var id = selectedRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/approve",
          data: {id: id},
          success: function(activity) {
            toastr.success();
            // selectedRows[0].setSimpleData(activity);
            viewModel.search();
          }
        })
      },
      // 弃审
      unapprove: function() {
        var selectedRows = viewModel.PromoActivityList.getSelectedRows();
        if(selectedRows.length != 1) {
          toastr.error("请选择一条数据");
          return
        }
        if(selectedRows[0].getValue("approveStatus") != "1") {
          toastr.error("请选择一条已审核数据");
          return
        }
        var id = selectedRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/abond-approve",
          data: {id: id},
          success: function(activity) {
            // selectedRows[0].setSimpleData(activity);
            viewModel.search();
          }
        })
      },
      showFileDialog: function() {
        var pk = viewModel.PromoActivityList.getValue('id');
        if(!pk) {
          toastr.error("请先保存单据");
          return;
        }
        viewModel.fileQuery();
        // if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
        //   $("#file-dialog .ui-file-btns").hide();
        // }
        // else {
        //   $("#file-dialog .ui-file-btns").show();
        // }
        if(!fileDialog) {
          fileDialog = u.dialog({content:"#file-dialog",hasCloseMenu:true});
        }
        else {
          fileDialog.show();
        }
      },
      onOpenUploadWin: function(){
        $("#uploadbatch_id").val(undefined);
        $("#uploadbatch_id").trigger("click");
      },
      //上传附件
      onFileUpload: function(){
        //获取表单
        var pk = viewModel.PromoActivityList.getValue('id');
        var par = {
             fileElementId: "uploadbatch_id",  //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
             filepath: pk,   //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
             groupname: "ygdemo",//【必填】分組名称,未来会提供树节点
             permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
             url: true,          //【选填】是否返回附件的连接地址，并且会存储到数据库
             //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
             cross_url : window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
             }
         var f = new interface_file();
         f.filesystem_upload(par,viewModel.fileUploadCallback);
      },
      //上传文件回传信息
      fileUploadCallback: function(data){
         if(1 == data.status){//上传成功状态
           viewModel.FileList.addSimpleData(data.data);
          //  toastr.success();
         }else{//error 或者加載js錯誤
           toastr.error(data.message);
         }
       },
       fileQuery: function(){
        //获取表单
        var pk = viewModel.PromoActivityList.getValue('id');
         var par = {
               //建议一定要有条件否则会返回所有值
             filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
             groupname: "ygdemo",//【选填】[分組名称,未来会提供树节点]
             cross_url : window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          }
         var f = new interface_file();
         f.filesystem_query(par,viewModel.fileQueryCallBack);
       },
       fileQueryCallBack: function(data){
         if(1 == data.status){//上传成功状态
           viewModel.FileList.setSimpleData(data.data);
         }else{
           //删除成功后查询
           if(data.status == 0 &&!data.data) {
             viewModel.FileList.setSimpleData([]);
           }
         }
       },
       //附件删除
       fileDelete: function(){
         var row = viewModel.FileList.getSelectedRows();
         if(row==null || row.length==0 || row.length>1){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var pk = row[i].getValue("id");
           var par = {
                 id:pk,//【必填】表的id
                 cross_url : window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
           }
           var f = new interface_file();
           f.filesystem_delete(par,viewModel.fileDeleteCallBack);
         }
       },
       //附件删除回调
       fileDeleteCallBack: function(data){
         if(1 == data.status){//上传成功状态
           viewModel.fileQuery();
         }else{
           toastr.error(data.message);
         }
       },
       //下载
       fileDownload: function(){
         var row = viewModel.FileList.getSelectedRows();
         if(row==null || row.length==0 || row.length>1){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var pk = row[i].getValue("id");
           var form = $("<form>");   //定义一个form表单
           form.attr('style', 'display:none');   //在form表单中添加查询参数
           form.attr('target', '');
           form.attr('enctype', 'multipart/form-data');
           form.attr('method', 'post');
           form.attr('action', window.ctxfilemng+"file/download?permission=read&stream=false&id="+pk);
           $('#file-dialog').append(form);  //将表单放置在web中
           form.submit();
         }
       },
       //查看
       fileView: function(){
         var row = viewModel.FileList.getSelectedRows();
         if(row==null || row.length==0 || row.length > 1){
           toastr.error("请选择一个附件");
           return
         }
         for(var i=0;i<row.length;i++){
           var url = row[i].getValue("url");
           parent.open(location.origin+url);
         }
       },
       //审批流添加功能----提交审批
       submit: function () {
           var selectedData = viewModel.PromoActivityList.getSimpleData({type: 'select'});
           if(selectedData.length == 0) {
             toastr.error("请选择数据");
             return;
           }
           if(selectedData[0].state &&	selectedData[0].state !='0'){ //状态不为待确认
             toastr.error("该单据已经使用关联流程，不能启动","error");
             return ;
           }
           for(var i=0;i<selectedData.length;i++) {
             selectedData[i].bussTypes = [];
             selectedData[i].officeItems = [];
           }
           $.ajax({
               type: 'GET',
               url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=promoactivity&nodekey=001',
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
         var nodeJs = "/ocm-web/pages/prom/promoactivity/promoactivity.js";
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
       //审批流添加功能----取消提交
       unsubmit: function () {
           var selectedData = viewModel.PromoActivityList.getSimpleData({type: 'select'});
           if(selectedData.length == 0) {
             toastr.error("请选择数据");
             return;
           }
           for(var i=0;i<selectedData.length;i++) {
             selectedData[i].bussTypes = [];
             selectedData[i].officeItems = [];
           }
           $.ajax({
               type: "post",
               url: appCtx + viewModel.baseurl + "/unsubmit",
               contentType: 'application/json;charset=utf-8',
               data: JSON.stringify(selectedData),
               success: function (res) {
                   if (res) {
                       if (res.detailMsg.data.success == 'success') {
                        toastr.success();
                        viewModel.search();
                       } else {
                        toastr.error(res.detailMsg.data.message);
                       }
                   } else {
                       toastr.error("无返回数据");
                   }
               }

           });
       },
       // 任务中心打开单据详情
       openBillDetail: function(billId) {
         var queryData = {};
         queryData["search_EQ_id"] = billId;
         var pageSize = viewModel.PromoActivityList.pageSize();
         var pageNumber = viewModel.PromoActivityList.pageIndex();
         queryData.size = pageSize;
         queryData.page = pageNumber;
         $._ajax({
           type:"get",
           url:appCtx + viewModel.baseurl,
           dataType:"json",
           data:queryData,
           async:false,
           success:function(data){
             if(data && data.content &&data.content.length == 1) {
               viewModel.PromoActivityList.setSimpleData(data.content,{unSelect:true});
               viewModel.PromoActivityList.totalRow(data.totalElements);
               viewModel.PromoActivityList.totalPages(data.totalPages);
               viewModel.PromoActivityList.setRowFocus(0);
               viewModel.detail();
               // 隐藏单据详情顶级操作按钮（返回、编辑）
               $(".ui-bill-detail .ui-panel-btn-bg .ui-operate-btn").hide();
             }
             // 没有查询到相关单据
             else {
               toastr.error("没有查询到相关单据");
             }
           }
         })
       },
  }
  viewModel = u.extend({},baseData,events,rendertype/*,bpmopenbill.model*/);

  function appInit(element, params){
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    if(params.vtype == "bpm") {
      var billId = params.id;
      viewModel.openBillDetail(billId);
      return;
    }
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
          dataSource: CONST.APPROVESEARCH,
          opr: "IN"
        },
        {
          type:"combo",
          key:"useStatus",
          label:"使用状态",
          dataSource: viewModel.activityUseStatusSrc,
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
        // {
        //   type:"checkboxlist",
        //   key:"name",
        //   label:"活动名称",
        //   dataSource: viewModel.checkboxsrc,
        //   cls: "ui-checkboxes-item",
        // },
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
    // footer = new billfooter($(".ui-bill-footer").get(), viewModel, "PromoActivityList");
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
    // 监听业务类型参照选择
    viewModel.BussTypeRef.on("bussRefer.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContainerbussRefer").data("uui.refer");
      if(refer && refer.values.length > 0) {
        for(var i=0;i<refer.values.length;i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.BussTypeItems.getRowByField("bussiTypeId", refpk);
          var newrow;
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            newrow = viewModel.BussTypeItems.createEmptyRow({unSelect:true});
            newrow.setValue("bussiTypeCode", refer.values[i].refcode);
            newrow.setValue("bussiTypeName", refer.values[i].refname);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("bussiTypeId", refpk);
          }
        }
      }
    });
    // 监听办事处分区参照选择
    viewModel.AgencyRef.on("agencyRefer.valuechange", function(obj) {
      if(!obj.newValue) {
        return;
      }
      var refer = $("#refContaineragencyRefer").data("uui.refer");
      if(refer && refer.values.length > 0) {
        for(var i=0;i<refer.values.length;i++) {
          var refpk = refer.values[i].refpk;
          var row = viewModel.AgencyItems.getRowByField("officeId", refpk);
          if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
            var newrow = viewModel.AgencyItems.createEmptyRow({unSelect: true});
            newrow.setValue("officeCode", refer.values[i].refcode);
            newrow.setValue("officeName", refer.values[i].refname);
            //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
            newrow.setValue("officeId", refpk);
          }
        }
      }
    });
    // 订货日期范围选择，拆分范围字段到开始及截至日期
    viewModel.PromoActivityList.on("orderDateRange.valuechange", function(obj) {
      var rowObj = obj.rowObj;
      if(!obj.newValue) {
        rowObj.setValue("orderStartDate", "");
        rowObj.setValue("orderEndDate", "");
        return;
      }
      var range = obj.newValue.split(";");
      rowObj.setValue("orderStartDate", range[0]);
      rowObj.setValue("orderEndDate", range[1]);
    });
    // 报名日期范围选择，拆分范围字段到开始及截至日期
    viewModel.PromoActivityList.on("enrolDateRange.valuechange", function(obj) {
      var rowObj = obj.rowObj;
      if(!obj.newValue) {
        rowObj.setValue("enrolStartDate", "");
        rowObj.setValue("enrolEndDate", "");
        return;
      }
      var range = obj.newValue.split(";");
      rowObj.setValue("enrolStartDate", range[0]);
      rowObj.setValue("enrolEndDate", range[1]);
    });
    // 终端活动日期范围选择，拆分范围字段到开始及截至日期
    viewModel.PromoActivityList.on("terminalDateRange.valuechange", function(obj) {
      var rowObj = obj.rowObj;
      if(!obj.newValue) {
        rowObj.setValue("terminalStartDate", "");
        rowObj.setValue("terminalEndDate", "");
        return;
      }
      var range = obj.newValue.split(";");
      rowObj.setValue("terminalStartDate", range[0]);
      rowObj.setValue("terminalEndDate", range[1]);
    });
    // 监听单据页所处状态（默认、新增、编辑、详情、复制）
    viewModel.billPanelStatus.subscribe(function(status) {
      if(status == CONST.BILLPANELSTATUS.EDIT) {
        //订货有效期
        var orderStart = viewModel.PromoActivityList.getValue("orderStartDate");
        var orderEnd = viewModel.PromoActivityList.getValue("orderEndDate");
        if(orderStart && orderEnd) {
            viewModel.PromoActivityList.setValue("orderDateRange", orderStart+";"+orderEnd);
        }
        //报名有效期
        var enrolStart = viewModel.PromoActivityList.getValue("enrolStartDate");
        var enrolEnd = viewModel.PromoActivityList.getValue("enrolEndDate");
        if(enrolStart && enrolEnd) {
            viewModel.PromoActivityList.setValue("enrolDateRange", enrolStart+";"+enrolEnd);
        }
        //终端活动期间
        var terminalStart = viewModel.PromoActivityList.getValue("terminalStartDate");
        var terminalEnd = viewModel.PromoActivityList.getValue("terminalEndDate");
        if(terminalStart && terminalEnd) {
            viewModel.PromoActivityList.setValue("terminalDateRange", terminalStart+";"+terminalEnd);
        }
      }
      else if(status == CONST.BILLPANELSTATUS.COPY) {
        var copyActivityRow = viewModel.PromoActivityList.getRowByField("id", viewModel.copyActivityId);
        //订货有效期
        var orderStart = copyActivityRow.getValue("orderStartDate");
        var orderEnd = copyActivityRow.getValue("orderEndDate");
        if(orderStart && orderEnd) {
            viewModel.PromoActivityList.setValue("orderDateRange", orderStart+";"+orderEnd);
        }
        //报名有效期
        var enrolStart = copyActivityRow.getValue("enrolStartDate");
        var enrolEnd = copyActivityRow.getValue("enrolEndDate");
        if(enrolStart && enrolEnd) {
            viewModel.PromoActivityList.setValue("enrolDateRange", enrolStart+";"+enrolEnd);
        }
        //终端活动期间
        var terminalStart = copyActivityRow.getValue("terminalStartDate");
        var terminalEnd = copyActivityRow.getValue("terminalEndDate");
        if(terminalStart && terminalEnd) {
            viewModel.PromoActivityList.setValue("terminalDateRange", terminalStart+";"+terminalEnd);
        }
      }
    });
    // 选择上传文件后，直接调用上传方法
    $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
      if(this.value) {
        viewModel.onFileUpload();
      }
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    var bussrefrow  = viewModel.BussTypeRef.createEmptyRow();
    viewModel.BussTypeRef.setRowFocus(bussrefrow);
    var agencyrefrow  = viewModel.AgencyRef.createEmptyRow();
    viewModel.AgencyRef.setRowFocus(agencyrefrow);
    window.vm = viewModel;
  }

  return {
    init: init
  }
});
