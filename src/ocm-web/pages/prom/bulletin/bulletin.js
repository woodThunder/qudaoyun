define(['text!./bulletin.html','ocm_common','searchbox','editcard','ocm-wangEditor','./meta.js','ocm_global','ajaxfileupload','ossupload','interfaceFileImpl'], function (tpl,common,searchbox,editcard, wangEditor) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,bulletinDialog,fileDialog,customerDialog, editor;
  baseData = {
    baseurl: '/notice/notice-definition',
    childurl: '/notice/notice-customer-range',
    BulletinList: new u.DataTable(Bulletin),
    CustomerItem: new u.DataTable(Customer),
    FileList: new u.DataTable(FileMeta),
    MultiRefer: new u.DataTable(MultiReferMeta),
    bulletinTypeSrc: ko.observableArray([]),
    billStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    customerSearch: ko.observable(),
  };
  rendertype = {
    enableRender: common.rendertype.enableRender,
    operation: function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var dataTableRowId = obj.row.value['$_#_@_id'];
      var customerfun = "data-bind='click:showCustomerDialog.bind($data," + dataTableRowId + "), visible: buttonShowGroup[\"release\"]'";
      var editfun = "data-bind='click:showEditDialog.bind($data," + dataTableRowId + "), visible: buttonShowGroup[\"edit\"]'";
      var filefun = "data-bind='click:showFileDialog.bind($data," + dataTableRowId + "), visible: buttonShowGroup[\"file\"]'";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      editfun +
      ' title="编辑">编辑</a>'+
      '</span>    '+
        '<span class="ui-handle-word">'+
        '<a href="#" '+
        filefun +
        ' title="附件">附件</a>'+
        '</span>    '+
      '<span class="ui-handle-word">'+
      '<a href="#" '+
      customerfun +
      ' title="发布范围">发布范围</a>'+
      '</span></div>';

      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    detailRender: function(obj) {
      var viewModel = obj.gridObj.viewModel;
      var rowId = obj.row.value["$_#_@_id"];
      var detailfun = 'data-bind="click:detail.bind($data, '+rowId+')"';
      obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      var queryData = searcher.getDataWithOpr();
      if(reindex){
        viewModel.BulletinList.pageIndex(0);
      }
      viewModel.BulletinList.removeAllRows();
      var pageSize = viewModel.BulletinList.pageSize();
      var pageNumber = viewModel.BulletinList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.BulletinList.setSimpleData(data.content,{unSelect:true});
          viewModel.BulletinList.totalRow(data.totalElements);
          viewModel.BulletinList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.BulletinList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.BulletinList.pageSize(size);
      viewModel.search(true);
    },
    detail: function(rowId) {
      var curRow = viewModel.BulletinList.getRowByRowId(rowId);
      viewModel.BulletinList.setRowFocus(curRow);
      var htmlContent = curRow.getValue("content");
      htmlContent = common.htmlDecode(htmlContent);
      editor.txt.html(htmlContent);
      viewModel.billStatus(CONST.BILLPANELSTATUS.DETAIL);
      if(!bulletinDialog) {
        bulletinDialog = u.dialog({content: "#dialog_bulletin"});
      }
      bulletinDialog.show();
    },
    closeBulletinFun: function() {
      viewModel.billStatus(CONST.BILLPANELSTATUS.DEFAULT);
      viewModel.search();
    },
    showAddDialog: function() {
      var newRow = viewModel.BulletinList.createEmptyRow();
      viewModel.BulletinList.setRowFocus(newRow);
      editor.txt.html("");
      viewModel.billStatus(CONST.BILLPANELSTATUS.ADD);
      if(!bulletinDialog) {
        bulletinDialog = u.dialog({content: "#dialog_bulletin", hasCloseMenu: true, closeFun: viewModel.closeBulletinFun});
      }
      bulletinDialog.show();
    },
    showEditDialog: function(rowId) {
      var curRow = viewModel.BulletinList.getRowByRowId(rowId);
      viewModel.BulletinList.setRowFocus(curRow);
      viewModel.billStatus(CONST.BILLPANELSTATUS.EDIT);
      var htmlContent = curRow.getValue("content");
      htmlContent = common.htmlDecode(htmlContent);
      editor.txt.html(htmlContent);
      curRow.setValue("isEnable", "0");
      if(!bulletinDialog) {
        bulletinDialog = u.dialog({content: "#dialog_bulletin"});
      }
      bulletinDialog.show();
    },
    saveBulletin: function() {
      var validate = $("#dialog_bulletin")[0];
      var result = app.compsValidateMultiParam({element:validate,showMsg:true});
      if(!result.passed) {
        return;
      }
      var BulletinData = viewModel.BulletinList.getCurrentRow().getSimpleData();
      BulletinData.isEnable = "0";
      BulletinData.content = editor.txt.html();
      // 纯文本内容 去除html转义字符及空格
      var textContent = common.htmlDecode(editor.txt.text());
      textContent = textContent.trim("g");
      BulletinData.textContent = textContent;
      if(!textContent){
        toastr.warning("请填写内容");
        return;
      }
      var _ajaxType = viewModel.BulletinList.getValue("id") ? "put": "post";
      $._ajax({
        url:appCtx + viewModel.baseurl,
        type:_ajaxType,
        data:JSON.stringify(BulletinData),
        contentType : "application/json; charset=utf-8",
        success:function(data){
          viewModel.billStatus(CONST.BILLPANELSTATUS.DEFAULT);
          bulletinDialog.hide();
          viewModel.cleanSearch();
          viewModel.search();
        }
      })
    },
    cancelBulletin: function() {
      viewModel.billStatus(CONST.BILLPANELSTATUS.DEFAULT);
      bulletinDialog.hide();
      viewModel.search();
    },
    //启用
    enable: function() {
      var selectedRows = viewModel.BulletinList.getSelectedRows();
      if(selectedRows.length == 0) {
        toastr.error("请选择数据");
        return;
      }
      common.dialog.confirmDialog({
        msg1: '确定启用选中的公告吗？',
        msg2: '启用后，发布范围内的客户就可看到',
        width: '400px',
        type: 'error',
        onOk: function () {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/enable",
            data: {ids: ids.join(",")},
            success:function(res){
              viewModel.search();
            }
          })
        }
      });
    },
    //停用
    disable: function() {
      var selectedRows = viewModel.BulletinList.getSelectedRows();
      if(selectedRows.length == 0) {
        toastr.error("请选择数据");
        return;
      }
      common.dialog.confirmDialog({
        msg1: '确定停用选中的公告吗？',
        msg2: '停用后，所有客户都不能再看到',
        width: '400px',
        type: 'error',
        onOk: function () {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/disable",
            data: {ids: ids.join(",")},
            success:function(res){
              viewModel.search();
            }
          })
        }
      });
    },
    del: function() {
      var selectedRows = viewModel.BulletinList.getSelectedRows();
      if(selectedRows.length === 0) {
        toastr.error("请选择数据");
        return;
      }
      common.dialog.confirmDialog({
        msg1: '确认删除这些项？',
        msg2: '此操作不可逆',
        width: '400px',
        type: 'error',
        onOk: function () {
          var ids = [];
          for(var i=0;i<selectedRows.length;i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            url:appCtx + viewModel.baseurl + "/delete",
            type:"post",
            data:{
              ids:ids.join(",")
            },
            success:function(data){
              viewModel.search();
            }
          });

        }
      });
    },
    // 弹出发布范围对话框
    showCustomerDialog: function(rowId) {
      var curRow = viewModel.BulletinList.getRowByRowId(rowId);
      viewModel.BulletinList.setRowFocus(curRow);
      viewModel.CustomerItem.setSimpleData([]);
      viewModel.searchCustomer(true);
      if(!customerDialog) {
        customerDialog = u.dialog({content: "#dialog_customer",width: "800px"});
      }
      customerDialog.show();
    },
    // 发布范围-批量新增
    batchAddCustomer: function() {
      viewModel.clearAgencyRef();
      $("#agencyRefer .refer").trigger("click");
    },
    // 清除办事处参照
    clearAgencyRef: function() {
      viewModel.MultiRefer.setValue("agencyId", "");
      var refer = $("#refContaineragencyId").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    // 发布范围-新增
    addCustomer: function() {
      viewModel.clearCustomerRef();
      $("#customerRefer .refer").trigger("click");
    },
    // 清除经销商参照
    clearCustomerRef: function() {
      viewModel.MultiRefer.setValue("customerId", "");
      var refer = $("#refContainercustomerId").data("uui.refer");
      refer.uncheckAll();
      refer.setValue([]);
    },
    // 发布范围-删除
    delCustomer: function() {
      var selectedRows = viewModel.CustomerItem.getSelectedRows();
      if(selectedRows.length === 0) {
        toastr.error("请选择数据");
        return;
      }
      viewModel.CustomerItem.removeRows(selectedRows);
    },
    // 发布范围-清空查询条件
    cleanCustomerSearch: function() {
      viewModel.customerSearch(undefined);
    },
    // 发布范围-查询前事件
    beforeSearchCustomer: function() {
      if(viewModel.curDataChanged()) {
        common.dialog.confirmDialog({
          msg1: '当前有修改，是否先保存后搜索？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            viewModel.saveCustomer(true);
            viewModel.searchCustomer(true);
          },
          onCancel: function(){
          }
        });
      }
      else {
        viewModel.searchCustomer(true);
      }

    },
    // 发布范围-查询
    searchCustomer: function(reindex) {
      var bulletinId = viewModel.BulletinList.getValue("id");
      var searchContent = viewModel.customerSearch();
      if(reindex){
        viewModel.CustomerItem.pageIndex(0);
      }
      viewModel.CustomerItem.removeAllRows();
      var pageSize = viewModel.CustomerItem.pageSize();
      var pageNumber = viewModel.CustomerItem.pageIndex();
      $._ajax({
        type:"get",
        url:appCtx + viewModel.childurl,
        dataType:"json",
        data: {
          search_IN_parentId: bulletinId,
          search_searchContent: searchContent,
          page: pageNumber,
          size: pageSize
        },
        success:function(data){
          viewModel.CustomerItem.setSimpleData(data.content,{unSelect:true});
          viewModel.CustomerItem.totalRow(data.totalElements);
          viewModel.CustomerItem.totalPages(data.totalPages);
        }
      })
    },
    // 判断当前页数据是否有变化
    curDataChanged: function() {
      var changed = false;
      var curAllRows = viewModel.CustomerItem.getAllRows();
      for(var i=0; i<curAllRows.length;i++) {
        if(curAllRows[i].status !== "nrm") {
          changed = true;
          break;
        }
      }
      return changed;
    },
    // 发布范围-页码改变前事件
    customerBeforePageChange: function(pageIndex) {
      if(viewModel.curDataChanged()) {
        common.dialog.confirmDialog({
          msg1: '当前有修改，是否先保存后跳转？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            viewModel.saveCustomer(true);
          },
          onCancel: function(){
          }
        });
      }
      else {
        viewModel.CustomerItem.pageIndex(pageIndex);
        viewModel.searchCustomer();
      }
    },
    // 发布范围-页大小改变
    customerSizeChange: function(pageSize) {
      viewModel.CustomerItem.pageSize(pageSize);
      viewModel.searchCustomer();
    },
    // 发布范围-保存
    saveCustomer: function(noClose) {
      var customers = viewModel.CustomerItem.getSimpleData();
      if(customers!=null){
        for( var  i=0;i<customers.length;i++){
          if(customers[i].officeId&&customers[i].officeId=="null"){
            customers[i].officeId=null;
          }
        }
      }
      // TODO: 保存发布范围
      $._ajax({
        url:appCtx + viewModel.childurl + "/batch-save",
        type:"post",
        data:JSON.stringify(customers),
        contentType : "application/json; charset=utf-8",
        success:function(data){
          // 保存后不关闭对话框
          if(noClose) {
            viewModel.cleanCustomerSearch();
            viewModel.searchCustomer(true);
          }
          else {
            customerDialog.hide();
          }
        }
      })
    },
    // 发布范围-取消
    cancelCustomer: function() {
      customerDialog.hide();
    },
    // 弹出附件管理对话框
    showFileDialog: function(rowId) {
      var curRow = viewModel.BulletinList.getRowByRowId(rowId);
      viewModel.BulletinList.setRowFocus(curRow);
      // if(!pk) {
      //   toastr.error("请先保存单据");
      //   return;
      // }
      viewModel.fileQuery();
      if(!fileDialog) {
        fileDialog = u.dialog({content:"#file-dialog",hasCloseMenu:true});
      }
      fileDialog.show();
    },
    onOpenUploadWin: function(){
      $("#uploadbatch_id").val(undefined);
      $("#uploadbatch_id").trigger("click");
    },
    //上传附件
    onFileUpload: function(){
      //获取表单
      var pk = viewModel.BulletinList.getValue('id');
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
      var pk = viewModel.BulletinList.getValue('id');
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
       // if(row==null || row.length==0 || row.length>1){
       //   toastr.error("请选择一个附件");
       //   return
       // }
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
  }
  viewModel = u.extend({},baseData,events,rendertype);

  function appInit(element, params){
    window.initButton(viewModel, element);//初始化按钮权限
    ko.cleanNode(element);
    // TODO: 请求公告类型下拉菜单
    $._ajax({
      type:"get",
      url:appCtx+"/cust-doc-defs/cust_doc_code",
      async: false,
      data:{
        cust_doc_code:"QY078"
      },
      success:function(data){
        var newarray = common.dataconvert.toMap(data,"name","id");
        viewModel.bulletinTypeSrc(newarray);
      }
    });
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    var multiRefer = viewModel.MultiRefer.createEmptyRow();
    viewModel.MultiRefer.setRowFocus(multiRefer);
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    searcher = new searchbox(
      $("#Bulletin-searchcontent")[0],
      [
        {
          type:"combo",
          key:"noticeStyle",
          label:"公告类型",
          url:appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY078",
          namefield:"name",
          valuefield:"id",
          hasAll:true,
          onlySelect: true,
        },
        {
          type:"text",
          key:"title",
          label:"标题"
        },
        {
          type: "text",
          key: "textContent",
          label: "内容"
        },
        {
	        type:"radio",
	        key:"isEnable",
	        label:"启用状态",
	        dataSource:CONST.ENABLESTATUSISALL,
	      },
      ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
    // 初始化富文本编辑器
    editor = new wangEditor("#rich-text-container");
    editor.customConfig.uploadImgMaxSize = 30 * 1024 * 1024;
    editor.customConfig.uploadImgShowBase64 = true
    editor.create();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#Bulletin-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    // 选择上传文件后，直接调用上传方法
    $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
      if(this.value) {
        viewModel.onFileUpload();
      }
    });
    //分页显示条数判断
    $("#pagination-customer").delegate("select","click",function(){
      if(viewModel.curDataChanged()){
        $(this).prop("disabled",true);
        toastr.warning("当前数据已被修改，不可改变分页显示条数！");
      }else{
        $(this).prop("disabled",false);
      }
    });
    // 发布范围-批量添加办事处
    viewModel.MultiRefer.on("agencyId.valuechange", function(obj) {
      if(obj.newValue) {
        //TODO: 根据办事处查询经销商
        var queryData = {};
        // queryData["EQ_isEnable"] = "1";
        // queryData["IN_organization.id"] = obj.newValue;
        // queryData.page = 0;
        // queryData.size = 10000; //fix me 设置大数值将分页方法转换为非分页
        $._ajax({
          type: 'get',
          url: appCtx + viewModel.childurl + "/queryCustomerByOfficeIds?officeIds="+obj.newValue,
          data: queryData,
          success: function(customers) {
            var originCustomers = customers;
            var targetCustomers = [];
            var targetCustomer = {};
            var bulletinId = viewModel.BulletinList.getValue("id");
            // 经销商数据格式转换
            for(var i=0; i<originCustomers.length;i++) {
              var newrow = viewModel.CustomerItem.createEmptyRow({unSelect:true});
              newrow.setValue("officeId", originCustomers[i].organizationId);
              newrow.setValue("officeCode", originCustomers[i].organizationCode);
              newrow.setValue("officeName", originCustomers[i].organizationName);
              newrow.setValue("officePhone", originCustomers[i].organizationTel);
              newrow.setValue("customerId", originCustomers[i].id);
              newrow.setValue("customerCode", originCustomers[i].code);
              newrow.setValue("customerName", originCustomers[i].name);
              newrow.setValue("customerName", originCustomers[i].name);
              newrow.setValue("parentId",  bulletinId);
              newrow.setValue("persistStatus",  "new");
            }
          }
        })
      }
    });
    // 发布范围-添加经销商
    viewModel.MultiRefer.on("customerId.valuechange", function(obj) {
      if(obj.newValue) {
        var customerRefVals=  $("#refContainercustomerId").data("uui.refer").values;
        if(customerRefVals && customerRefVals.length > 0) {
          var newCustomers = [];
          var bulletinId = viewModel.BulletinList.getValue("id");
          for(var i=0;i<customerRefVals.length;i++) {
            var customer = {};
            customer.officeId = customerRefVals[i].organizationId;
            customer.officeCode = customerRefVals[i].orgCode;
            customer.officeName = customerRefVals[i].organizationName;
            customer.officePhone = customerRefVals[i].organizationTel;
            customer.customerId = customerRefVals[i].refpk;
            customer.customerCode = customerRefVals[i].refcode;
            customer.customerName = customerRefVals[i].refname;
            customer.parentId = bulletinId;
            customer.persistStatus = "new";
            newCustomers.push(customer);
          }
          var existCustomers = viewModel.CustomerItem.getSimpleData();
          newCustomers = newCustomers.concat(existCustomers);
          viewModel.CustomerItem.setSimpleData(newCustomers, {unSelect: true}, true);
        }
      }
    });
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
})
