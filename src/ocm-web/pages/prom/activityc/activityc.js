define(['text!./activityc.html','ocm_common','searchbox','editcard','billfooter'/*,'/iuap_qy/pages/flow/bpmapproveref/bpmopenbill.js'*/,'./meta.js','ocm_global','ajaxfileupload','ossupload','interfaceFileImpl'], function (tpl,common,searchbox,editcard,billfooter/*,bpmopenbill*/) {
    'use strict'
    var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,footer,fileDialog;
    baseData = {
        baseurl : "/prom/activity-c",
        ActivityCList: new u.DataTable(ActivityC),
        ActivityStoreItems: new u.DataTable(ActivityStore),
        ActivityStoreRef: new u.DataTable(ActivityStoreRef),
        FileList: new u.DataTable(FileMeta),
        dateFormat: common.format.dateFormat,
        billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel:  function() {
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
          common.bill.retListPanel();
        },
        copyActivityId: undefined,
    };

    rendertype = {
      operation: common.rendertype.operation,
      enableRender:common.rendertype.enableRender,
      detailRender:function(obj) {
            var detailfun = "data-bind=click:detail.bind($data)";
            obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        },
      approveRender:common.rendertype.approveRender,
    };
    events = {
        //删除和批量删除
        del: function (data,rowId) {
          if (typeof(data) == 'number') {
                viewModel.ActivityCList.setRowSelectbyRowId(rowId);
          }
          var selectedRows = viewModel.ActivityCList.getSelectedRows();
          if(!selectedRows.length) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
            var ids = [];
            if(selectedRows&&selectedRows.length>0){
                for(var i = 0;i<selectedRows.length;i++){
                    ids.push(selectedRows[i].getValue("id"));
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
                            viewModel.ActivityCList.removeRows(selectedRows);
                        }
                    });

                }
            });
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if(reindex){
                viewModel.ActivityCList.pageIndex(0);
            }
            viewModel.ActivityCList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            var pageSize = viewModel.ActivityCList.pageSize();
            var pageNumber = viewModel.ActivityCList.pageIndex();
            queryData.size = pageSize;
            queryData.page = pageNumber;
            $._ajax({
                type:"get",
                url:appCtx + viewModel.baseurl,
                dataType:"json",
                data:queryData,
                success:function(data){
                    viewModel.ActivityCList.setSimpleData(data.content,{unSelect:true});
                    viewModel.ActivityCList.totalRow(data.totalElements);
                    viewModel.ActivityCList.totalPages(data.totalPages);
                }
            })
        },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
        viewModel.clearRef(["organizationId","activitytypecId"]);
      },
      // 清空已选参照
      clearRef: function(referids) {
        if(referids&&referids.length>0){
          for(var i=0;i<referids.length;i++){
            var refer = $("#refContainer"+referids[i]).data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
          }
        }
      },
      //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.ActivityCList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.ActivityCList.pageSize(size);
            viewModel.search(true);
        },
        //进入新增单据页
        showAddBillPanel: function() {
            var curRow = viewModel.ActivityCList.createEmptyRow();
            viewModel.ActivityCList.setRowFocus(curRow);
            viewModel.ActivityStoreItems.removeAllRows();
            // curRow.setValue("enableStatus", "1");
            // curRow.setValue("approveStatus", "2");
            common.bill.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        },
        //进入复制单据页
        showCopyBillPanel: function() {
          var selectedRows = viewModel.ActivityCList.getSelectedRows();
          // var focusRow = viewModel.ActivityCList.getFocusRow();
          // 只支持单一复制，批量复制需单独处理
            if(selectedRows.length != 1) {
                //TODO: tips替换
              toastr.warning("请选择一条操作的行");
                return;
            }
            var copyRow = selectedRows[0];
            var curRow = viewModel.ActivityCList.createEmptyRow();
            viewModel.copyActivityId = copyRow.getValue("id");
            curRow.setSimpleData(copyRow.getSimpleData(),u.Row.STATUS.NEW);
            curRow.setValue('auditStatus',"0");
            viewModel.ActivityCList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
             $._ajax({
               type: "get",
               url: appCtx + viewModel.baseurl + "/copyByActivityId",
               data: {id: id},
               async: false,
               success: function(data) {
                 var storeList = data.storeList;
                 viewModel.ActivityStoreItems.removeAllRows();
                 viewModel.ActivityStoreItems.setSimpleData(storeList,{unSelect:true,status:"new"});
               }
             });
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
          common.bill.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
        setTimeout(function(){
          var isApprove = viewModel.ActivityCList.getValue("auditStatus");
          if(isApprove==1||isApprove=="1"){
            toastr.error('已审核的数据不可编辑！');
            return;
          };
          viewModel.ActivityCList.setRowFocus(index);
          var id = viewModel.ActivityCList.getValue("id");
          viewModel.ActivityCList.originEditData = viewModel.ActivityCList.getFocusRow().getSimpleData();
          //请求完整主子表信息
          viewModel.fillData(id);
          common.bill.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        }, 0);
      },
        //进入详细页
        detail: function() {
            //确保grid先将行设置为focus状态
            setTimeout(function(){
                var curRow = viewModel.ActivityCList.getCurrentRow();
                var id = curRow.getValue("id");
                //请求完整主子表信息
                viewModel.fillData(id);
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                //加入bpm按钮
          //viewModel.initBPMFromBill(id,viewModel);
              common.bill.goDetailPanel();
            }, 0);
        },
        // （编辑/详情）填充完整主子表数据
        fillData: function(id) {
            $._ajax({
                type: "get",
                url: appCtx + viewModel.baseurl + "/findByActivityId",
                data: {id: id},
                async: false,
                success: function(data) {
                    var storeList = data;
                    viewModel.ActivityStoreItems.removeAllRows();
                    viewModel.ActivityStoreItems.setSimpleData(storeList,{unSelect:true});
                }
            })
        },
        // 清除基类属性
        clearBaseProp: function(row) {
            row.setValue("id", "");
            row.setValue("code", "");
            row.setValue("name", "");
            row.setValue("creator", "");
            row.setValue("creationTime", "");
            row.setValue("modifier", "");
            row.setValue("modifiedTime", "");
        },
        //保存单据
        saveBill: function() {
          var validate = $(".ui-bill-panel")[0];
          var result = app.compsValidateMultiParam({element:validate,showMsg:true});
          if(!result.passed) {
            return;
          }
          var ActivityCData = viewModel.ActivityCList.getCurrentRow().getSimpleData();
          var storeList = viewModel.ActivityStoreItems.getSimpleData();
          // if(allRows[i].getValue("assembleName") == ""){
          //   toastr.warning('“业务标识+渠道类型+产品组+办事处+客户”整体不能为空');
          //   return;
          // }
          ActivityCData.storeList = storeList;
          // 复制
          if(viewModel.billPanelStatus() === CONST.BILLPANELSTATUS.COPY) {
            ActivityCData.id = viewModel.copyActivityId;
            $._ajax({
              url:appCtx + viewModel.baseurl + "/copySave",
              type:"post",
              data:JSON.stringify(ActivityCData),
              contentType : "application/json; charset=utf-8",
              success:function(data){
                // viewModel.PromoActivityList.getFocusRow().setSimpleData(data);
                viewModel.retListPanel();
                viewModel.cleanSearch();
                viewModel.search();
              }
            })
          }else {
            var _ajaxType = viewModel.ActivityCList.getValue("id") ? "put" : "post";
            $._ajax({
              url: appCtx + viewModel.baseurl,
              type: _ajaxType,
              data: JSON.stringify(ActivityCData),
              contentType: "application/json; charset=utf-8",
              success: function (data) {
                viewModel.ActivityCList.getFocusRow().setSimpleData(data);
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
            viewModel.ActivityStoreItems.removeAllRows();
            var curRow = viewModel.ActivityCList.getCurrentRow();
            // 修改，则还原
            if(curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.ActivityCList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.ActivityCList.removeRow(curRow);
            }
            viewModel.retListPanel();
        },
        //启用
        enable: function() {
            var selectedRows = viewModel.ActivityCList.getSelectedRows();
            var ids = selectedRows.map(function(row, index, arr) {
                return row.getValue("id");
            })
          if(selectedRows.length != 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
          $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/batch-enable",
                data: {ids: ids.join(",")},
                success:function(res){
                    for(var i=0;i<selectedRows.length;i++) {
                        selectedRows[i].setValue("isEnable", "1");
                    }
                }
            })
        },
        //停用
        disable: function() {
            var selectedRows = viewModel.ActivityCList.getSelectedRows();
            var ids = selectedRows.map(function(row, index, arr) {
                return row.getValue("id");
            })
          if(selectedRows.length != 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/batch-disable",
                data: {ids: ids.join(",")},
                success:function(res){
                    for(var i=0;i<selectedRows.length;i++) {
                        selectedRows[i].setValue("isEnable", "0");
                    }
                }
            })
        },

        //门店启用
        storeEnable: function() {
        var selectedRows = viewModel.ActivityStoreItems.getSelectedRows();
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        if(selectedRows.length < 1) {
          //TODO: tips替换
          toastr.warning("请选择一条操作的行");
          return;
        }
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batchEnable",
          data: {ids: ids.join(",")},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("isEnable", "1");
            }
          }
        })
      },
        //门店停用
        storeDisable: function() {
        var selectedRows = viewModel.ActivityStoreItems.getSelectedRows();
        var ids = selectedRows.map(function(row, index, arr) {
          return row.getValue("id");
        })
        if(selectedRows.length < 1) {
          //TODO: tips替换
          toastr.warning("请选择一条操作的行");
          return;
        }
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batchDisable",
          data: {ids: ids.join(",")},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("isEnable", "0");
            }
          }
        })
      },

        //审批流添加功能----提交审批
        submit: function () {
        var selectedData = viewModel.ActivityCList.getSimpleData({type: 'select'});
        if(selectedData.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        if(selectedData[0].state &&	selectedData[0].state !='0'){ //状态不为待确认
          toastr.error("该单据已经使用关联流程，不能启动","error");
          return ;
        }
        for(var i=0;i<selectedData.length;i++) {
          selectedData[i].storeList = [];
        }
        $.ajax({
          type: 'GET',
          url: appCtx + viewModel.baseurl + '/appResAllocate/queryBpmTemplateAllocate?funccode=activityc&nodekey=001',
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
        var nodeJs = "/ocm-web/pages/prom/activityc/activityc.js";
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

        })},
      // 收回
        unsubmit: function () {
        var selectedData = viewModel.ActivityCList.getSimpleData({type: 'select'});
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
                toastr.error(res.message);
              }
            } else {
              toastr.error("无返回数据");
            }
          }

        });
      },
         //审核
         approve: function() {
        var selectedRows = viewModel.ActivityCList.getSelectedRows();
        if(selectedRows.length != 1) {
          toastr.warning("请选择一条操作的行");
          return;
        }
        var id = selectedRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/audit",
          data: {
            ids: id
          },
          success: function() {
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("auditStatus", "1");
            }
            // viewModel.search();
          }
        })
      },
          //弃审
         unapprove: function() {
           var selectedRows = viewModel.ActivityCList.getSelectedRows();
           if(selectedRows.length != 1) {
             toastr.warning("请选择一条操作的行");
             return;
           }
           var id = selectedRows[0].getValue("id");
           $._ajax({
             type: "post",
             url: appCtx + viewModel.baseurl + "/abandon",
             data: {
               ids: id
             },
             success: function() {
               for(var i=0;i<selectedRows.length;i++) {
                 selectedRows[i].setValue("auditStatus", "0");
               }
               // viewModel.search();
             }
           })
        },
        //弹出门店类型参照
        showStoreRef : function () {
          var agencyId = viewModel.ActivityCList.getCurrentRow().getValue("agencyId")
          $("#storeRefer").attr("data-refparam",JSON.stringify({"agencyId":agencyId}));
          var anencyValue = $("#agencyId").val();
            if(!anencyValue){
              toastr.error("根据所属办事处确定门店范围");
            }else {
              viewModel.clearStoreRef();
              $('#storeRefer').find(".refer").trigger("click");
            }

        },
        //删除已参照的门店类型
        delStoreItems:function () {
            var selectedRows = viewModel.ActivityStoreItems.getSelectedRows();
            selectedRows.forEach(function (row, index, arr) {
                row.setValue("dr","1");
            });
            if(selectedRows&&selectedRows.length>0){
                viewModel.ActivityStoreItems.removeRows(selectedRows);
            }
        },
        //清空已选门店类型参照
        clearStoreRef : function () {
            viewModel.ActivityStoreRef.setValue("storeRefer", "");
            var refer = $("#refContainerstoreRefer").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },
      //显示文件上传弹窗
      showFileDialog: function() {
        var pk = viewModel.ActivityCList.getValue('id');
        if(!pk) {
          toastr.error("请先保存单据");
          return;
        }
        viewModel.fileQuery();
        if(!fileDialog) {
          fileDialog = u.dialog({content:"#file-dialog",hasCloseMenu:true});
        }
        else {
          fileDialog.show();
        }
      },
      onOpenUploadWin: function(){
        $("#uploadbatch_id")[0].value = "";
        $("#uploadbatch_id").trigger("click");
      },
      //上传附件
      onFileUpload: function(){
        //获取表单
        var pk = viewModel.ActivityCList.getValue('id');
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
        $("#uploadbatch_id").on("change", function() {
          var hasVal = $("#uploadbatch_id")[0].value;
          if(hasVal){
            viewModel.onFileUpload();
          }
        });
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
        var pk = viewModel.ActivityCList.getValue('id');
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
          //没有查询到数据，可以不用提醒
        }
      },
      //附件删除
      fileDelete: function(){
        var row = viewModel.FileList.getSelectedRows();
        if(row==null || row.length==0 || row.length>1){
          toastr.warning("请选择一个附件");
          return;
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
        if(1 == data.status){
            viewModel.FileList.removeRows(viewModel.FileList.getSelectedRows())
            viewModel.fileQuery();
        }else{
          toastr.error(data.message);
        }
      },
      //下载
      fileDownload: function(){
        var row = viewModel.FileList.getSelectedRows();
        if(row==null || row.length==0 || row.length>1){
          toastr.warning("请选择一个附件");
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
          toastr.warning("请选择一个附件");
          return
        }
        for(var i=0;i<row.length;i++){
          var url = row[i].getValue("url");
          parent.open(location.origin+url);
        }
      },
      //导入
      importHandle: function() {
        var urlInfo = "/prom/activity-store-excel/getDataFromExcelDataImport"; //倒入地址参数
        // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
        var ele = $('#importFiel')[0]; //挂载元素
        var setDate = function (data) {
            return viewModel.ActivityStoreItems.addSimpleData(data,"new");
        };
        common.fileHandle.importToPage(urlInfo,ele,setDate);
      },
      //导出
      exportHandle: function() {
        var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
        var curCode = viewModel.ActivityCList.getCurrentRow().getValue("code")
        searchParams['search_EQ_activity.code']=curCode;
        var templateUrl = '/prom/activity-store-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  '/prom/activity-store-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.ActivityStoreItems; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
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
        // 查询组件初始化
        singledocSearch = new searchbox(
                $("#ActivityC-searchcontent")[0],
                [
                    {
                        type: "refer",
                        key: "activeTypec--id",
                        label: "活动类型",
                        refinfo: "activitytypec",
                        multi:true,
                        referId:"activitytypecId"
                    },
                    {
                        type: "refer",
                        key: "agency--id",
                        label: "所属办事处",
                        refinfo: "organization_ocm" ,
                        multi:true,
                        clientParam:{"EQ_isOffice":"1","EQ_isEnable":"1"},
                        referId:"organizationId"
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
                        type:"daterange",
                        label:"活动开始日期",
                        key:"terminalStartDate"
                    },
                    {
                        type:"daterange",
                        label:"活动截至日期",
                        key:"terminalEndDate"
                    },
                    {
                        type:"combo",
                        key:"auditStatus",
                        label:"审核状态",
                        dataSource: CONST.APPROVE
                    },




                    //TODO: 日期范围匹配日期范围
                // {
                //   type: "daterange",
                //   label: "订货有效期",
                //   startkey: "orderStartDate",
                //   endkey: "orderEndDate",
                // },
                // {
                //   type: "daterange",
                //   label: "终端活动期间",
                //   startkey: "terminalStartDate",
                //   endkey: "terminalEndDate",
                // },
                // {
                //   type: "daterange",
                //   label: "报名有效期",
                //   startkey: "enrolStartDate",
                //   endkey: "enrolEndDate",
                // },
            ]);
        // footer = new billfooter($(".ui-bill-footer").get(), viewModel, "ActivityCList");
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function afterRender(){
        // 初始化折叠面板
        $.fn.collapsepanel(false, true);
        //绑定输入框enter事件
        $('#ActivityC-searchcontent input').off("keydown").on("keydown",function(e){
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        viewModel.ActivityCList.on("responsiblePersonId.valuechange",function (obj) {
          if(!obj.newValue){
              viewModel.ActivityCList.getCurrentRow().setValue("linkPhone","");
              return;
          }
          var refer = $("#refContainerresponsiblePersonId").data("uui.refer");
          if(!refer.values){
              return;
          } else if(refer&&refer.values.length>0){
              var curValue = refer.values;
              var curTel = curValue[0].tel;
              var refname =curValue[0].refname;
              if(!refname||curTel=="null"){
                curTel ==""
              }
              viewModel.ActivityCList.getCurrentRow().setValue("linkPhone",curTel);
          }
       });

        //根据办事处决定门店范围
        viewModel.ActivityCList.on("agencyId.valuechange",function (obj){
          if(!obj.newValue){
            return;
          }
          var refer = $("#refContaineragencyId").data("uui.refer");
          if(!refer.values){
            return;
          }else if(refer&&refer.values.length>0){
            var curValue = refer.values;
            var curAgencyId = curValue[0].id;
          }
          $("#storeRefer").attr("data-refparam",JSON.stringify({"agencyId":curAgencyId}));
        });
      // 监听业务类型参照选择
        viewModel.ActivityStoreRef.on("storeRefer.valuechange", function(obj) {
            if(!obj.newValue) {
                return;
            }
            var refer = $("#refContainerstoreRefer").data("uui.refer");
            if(refer && refer.values.length > 0) {
                for(var i=0;i<refer.values.length;i++) {
                    var refpk = refer.values[i].refpk;
                    var row = viewModel.ActivityStoreItems.getRowByField("storeId", refpk);
                    var newrow;
                    if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
                        newrow = viewModel.ActivityStoreItems.createEmptyRow({unSelect:true});
                        newrow.setValue("customerId", refer.values[i].customerpk);
                        newrow.setValue("customerCode", refer.values[i].customercode);
                        newrow.setValue("customerName", refer.values[i].customername);
                        newrow.setValue("storeCode", refer.values[i].refcode);
                        newrow.setValue("storeName", refer.values[i].refname);
                        //如果使用了grid参照及showField属性，需要最后设置参照字段（通常是id）的值
                        newrow.setValue("storeId", refpk);
                        newrow.setValue("isEnable", 1);
                    }
                }
            }
        });

        //终端日期范围选择,拆分范围字段到开始及截止日期
        viewModel.ActivityCList.on("terminalDateRange.valuechange",function (obj) {
          if(!obj.newValue){
              return;
          }
          var rowObj = obj.rowObj;
          var range = obj.newValue.split(";");
          rowObj.setValue("terminalStartDate",range[0]);
          rowObj.setValue("terminalEndDate",range[1]);
        });
      // 监听单据页所处状态（默认、新增、编辑、详情、复制）
      viewModel.billPanelStatus.subscribe(function (status) {
        if(status == "edit" || status == "copy"){
          var terminalStart = viewModel.ActivityCList.getValue("terminalStartDate");
          var terminalEnd = viewModel.ActivityCList.getValue("terminalEndDate");
          if(terminalStart && terminalEnd) {
            viewModel.ActivityCList.setValue("terminalDateRange", terminalStart+";"+terminalEnd);
          }
        }
      })
      // 选择上传文件后，直接调用上传方法
      $("#uploadbatch_id").on("change", function() {
        viewModel.onFileUpload();
      });

      //活动目标总额
      viewModel.ActivityStoreItems.on("saleGoalMny.valuechange",function (obj) {
        var arr = viewModel.ActivityStoreItems.getSimpleData();
        var goalMny = viewModel.ActivityCList.getCurrentRow().getValue("goalMny");
        var price =[];
        for(var i=0;i<arr.length;i++){
          if(!arr[i].saleGoalMny){
            arr[i].saleGoalMny = 0
          }
          var priceItem = parseFloat(arr[i].saleGoalMny)
          price.push(priceItem);
        }
        var getSum =  function(array){
          var sum= 0;
          for (var i = 0; i < array.length; i++){
            sum += parseInt(array[i]);
          }
          return sum;
        }
        var pricesum = getSum(price);
        viewModel.ActivityCList.getCurrentRow().setValue("goalMny",pricesum);
      })
    }

    function init(element, params) {
        appInit(element, params);
        afterRender();
        var bussrefrow  = viewModel.ActivityStoreRef.createEmptyRow();
        viewModel.ActivityStoreRef.setRowFocus(bussrefrow);
        window.vm = viewModel;
    }

    return {
        init: init
    }
});

