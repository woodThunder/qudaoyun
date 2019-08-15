define(['text!./productbombb.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,suitesingledocSearch,packSingledocSearch,singledoceidt;
  baseData = {
    salelisturl : '/sale-product-info/getList',
    salecounturl : '/sale-product-info/getCount',
    suitelisturl:'/suite-product-info/getList',
    suitecounturl:'/suite-product-info/getCount',
    packlisturl:'/pack-product-info/getList',
    packcounturl:'/pack-product-info/getCount',
    SaleProductInfoList: new u.DataTable(SaleProductInfometa),
    SuiteProductInfoList: new u.DataTable(SuiteProductInfometa),
    PackProductInfoList: new u.DataTable(PackProductInfometa)
  };
  rendertype = {
    
  };
  events = {

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        // $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        // $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        if(reindex){
          viewModel.SaleProductInfoList.pageIndex(0);
        }
        viewModel.SaleProductInfoList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();


        // queryData.size = viewModel.SaleProductInfoList.pageSize();
        // queryData.page = viewModel.SaleProductInfoList.pageIndex();
        var oldCode = queryData["search_LIKE_code"];
        if(oldCode){
          queryData["codes"] =oldCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_code"];
        var olddescription = queryData["search_LIKE_description"];
        if(olddescription){
          queryData["description"] =olddescription.replace(/%/g,'');
        }
        delete queryData["search_LIKE_description"];
        
        var suiteCode = queryData["search_LIKE_suiteCode"];
        if(suiteCode){
          queryData["suiteCodes"] =suiteCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_suiteCode"];
        
        var oldsuiteDescription = queryData["search_LIKE_suiteDescription"];
        if(oldsuiteDescription){
          queryData["suiteDescription"] =oldsuiteDescription.replace(/%/g,'');
        }
        delete queryData["search_LIKE_suiteDescription"];
        var oldpackCode = queryData["search_LIKE_packCode"];
        if(oldpackCode){
          queryData["packCodes"] =oldpackCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_packCode"];
        var oldpackDescription = queryData["search_LIKE_packDescription"];
        if(oldpackDescription){
          queryData["packDescription"] =oldpackDescription.replace(/%/g,'');
        }
        delete queryData["search_LIKE_packDescription"];
      
        var oldisContain = queryData["search_EQ_isContain"];
        if(oldisContain){
          queryData["isContain"] =oldisContain.replace(/%/g,'');
        }
        delete queryData["search_EQ_isContain"];
        
        var oldisContain = queryData["search_EQ_isContainPack"];
        if(oldisContain){
          queryData["isContainPack"] =oldisContain.replace(/%/g,'');
        }
        delete queryData["search_EQ_isContainPack"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.salelisturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.SaleProductInfoList.setSimpleData(data,{unSelect:true});
            viewModel.SaleProductInfoList.totalRow(data.totalElements);
            viewModel.SaleProductInfoList.totalPages(data.totalPages);
          }
        });
        $._ajax({
          type:"get",
          url:appCtx + viewModel.salecounturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            var num = data;
            $("#searchNum").html(num);
            // viewModel.SaleProductInfoList.setSimpleData(data,{unSelect:true});
            // viewModel.SaleProductInfoList.totalRow(data.totalElements);
            // viewModel.SaleProductInfoList.totalPages(data.totalPages);
          }
        })  
      },
      //清空搜索条件
      cleanSearch: function () {
        $("#suiteCode").children().attr("disabled",false);
        $("#suiteDescription").children().attr("disabled",false);
        $("#packCode").children().attr("disabled",false);
        $("#packDescription").children().attr("disabled",false);
        $("#isContainPack").find("input").attr("disabled",false);
        $("#isContainPack").find("label").removeClass('is-disabled');
        singledocSearch.clearSearch();

      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.SaleProductInfoList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.SaleProductInfoList.pageSize(size);
        viewModel.search(true);
      },
      //导出
      exportHandle: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var oldCode = searchParams["search_LIKE_code"];
          if(oldCode){
            searchParams["codes"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_code"];
          var olddescription = searchParams["search_LIKE_description"];
          if(olddescription){
            searchParams["description"] =olddescription.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_description"];
          
          var suiteCode = searchParams["search_LIKE_suiteCode"];
          if(suiteCode){
            searchParams["suiteCodes"] =suiteCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_suiteCode"];
          
          var oldsuiteDescription = searchParams["search_LIKE_suiteDescription"];
          if(oldsuiteDescription){
            searchParams["suiteDescription"] =oldsuiteDescription.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_suiteDescription"];
          var oldpackCode = searchParams["search_LIKE_packCode"];
          if(oldpackCode){
            searchParams["packCodes"] =oldpackCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_packCode"];
          var oldpackDescription = searchParams["search_LIKE_packDescription"];
          if(oldpackDescription){
            searchParams["packDescription"] =oldpackDescription.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_packDescription"];
          
          var oldisContain = searchParams["search_EQ_isContain"];
          if(oldisContain){
            searchParams["isContain"] =oldisContain.replace(/%/g,'');
          }
          delete searchParams["search_EQ_isContain"];
          
          var oldisContain = searchParams["search_EQ_isContainPack"];
          if(oldisContain){
            searchParams["isContainPack"] =oldisContain.replace(/%/g,'');
          }
          delete searchParams["search_EQ_isContainPack"];
          
          var templateUrl = '/sale-product-Info-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/sale-product-Info-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.SaleProductInfoList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          viewModel.exportBombb(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
        // 根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      suitesearch: function (reindex) {
        if(reindex){
          viewModel.SuiteProductInfoList.pageIndex(0);
        }
        viewModel.SuiteProductInfoList.removeAllRows();
        var queryData = suitesingledocSearch.getDataWithOpr();
        // queryData.size = viewModel.SuiteProductInfoList.pageSize();
        // queryData.page = viewModel.SuiteProductInfoList.pageIndex();

        var suiteCode = queryData["search_LIKE_suiteCode"];
        if(suiteCode){
          queryData["suiteCodes"] =suiteCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_suiteCode"];
        
        var oldsuiteDescription = queryData["search_LIKE_suiteDescription"];
        if(oldsuiteDescription){
          queryData["suiteDescription"] =oldsuiteDescription.replace(/%/g,'');
        }
        delete queryData["search_LIKE_suiteDescription"];
        var oldpackCode = queryData["search_LIKE_packCode"];
        if(oldpackCode){
          queryData["packCodes"] =oldpackCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_packCode"];
        var oldpackDescription = queryData["search_LIKE_packDescription"];
        if(oldpackDescription){
          queryData["packDescription"] =oldpackDescription.replace(/%/g,'');
        }
        delete queryData["search_LIKE_packDescription"];
      
        var oldisContain = queryData["search_EQ_isContainPack1"];
        if(oldisContain){
          queryData["isContainPack1"] =oldisContain.replace(/%/g,'');
        }
        delete queryData["search_EQ_isContainPack1"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.suitelisturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.SuiteProductInfoList.setSimpleData(data,{unSelect:true});
            viewModel.SuiteProductInfoList.totalRow(data.totalElements);
            viewModel.SuiteProductInfoList.totalPages(data.totalPages);
          }
        });
        $._ajax({
          type:"get",
          url:appCtx + viewModel.suitecounturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            var num = data;
            $("#searchSuiteNum").html(num);
            // viewModel.SuiteProductInfoList.setSimpleData(data.content,{unSelect:true});
            // viewModel.SuiteProductInfoList.totalRow(data.totalElements);
            // viewModel.SuiteProductInfoList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSuiteSearch: function () {
        $("#suitepackCode").children().attr("disabled",false);
        $("#suitepackDescription").children().attr("disabled",false);
        suitesingledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.SuiteProductInfoList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.SuiteProductInfoList.pageSize(size);
        viewModel.search();
      },
      //导出
      suiteExportHandle: function() {
          var searchParams = suitesingledocSearch.getDataWithOpr(); //搜索查询参数
          var suiteCode = searchParams["search_LIKE_suiteCode"];
          if(suiteCode){
            searchParams["suiteCodes"] =suiteCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_suiteCode"];
          
          var oldsuiteDescription = searchParams["search_LIKE_suiteDescription"];
          if(oldsuiteDescription){
            searchParams["suiteDescription"] =oldsuiteDescription.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_suiteDescription"];
          var oldpackCode = searchParams["search_LIKE_packCode"];
          if(oldpackCode){
            searchParams["packCodes"] =oldpackCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_packCode"];
          var oldpackDescription = searchParams["search_LIKE_packDescription"];
          if(oldpackDescription){
            searchParams["packDescription"] =oldpackDescription.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_packDescription"];
          
          var oldisContain = searchParams["search_EQ_isContainPack1"];
          if(oldisContain){
            searchParams["isContainPack1"] =oldisContain.replace(/%/g,'');
          }
          delete searchParams["search_EQ_isContainPack1"];
          var templateUrl = '/suite-product-Info-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/suite-product-Info-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.SuiteProductInfoList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          viewModel.exportBombb(listData,ele,searchParams,templateUrl,excelDataUrl);
      },

      // //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      packSearch: function (reindex) {
        if(reindex){
          viewModel.PackProductInfoList.pageIndex(0);
        }
        viewModel.PackProductInfoList.removeAllRows();
        var queryData = packSingledocSearch.getDataWithOpr();
        // queryData.size = viewModel.PackProductInfoList.pageSize();
        // queryData.page = viewModel.PackProductInfoList.pageIndex();
        var oldpackCode = queryData["search_LIKE_packCode"];
        if(oldpackCode){
          queryData["packCodes"] =oldpackCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_packCode"];
        var oldpackDescription = queryData["search_LIKE_packDescription"];
        if(oldpackDescription){
          queryData["packDescription"] =oldpackDescription.replace(/%/g,'');
        }
        delete queryData["search_LIKE_packDescription"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.packlisturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.PackProductInfoList.setSimpleData(data,{unSelect:true});
            viewModel.PackProductInfoList.totalRow(data.totalElements);
            viewModel.PackProductInfoList.totalPages(data.totalPages);
          }
        });
        $._ajax({
          type:"get",
          url:appCtx + viewModel.packcounturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            var num = data;
            $("#searchPackNum").html(num);
            // viewModel.PackProductInfoList.setSimpleData(data,{unSelect:true});
            // viewModel.PackProductInfoList.totalRow(data.totalElements);
            // viewModel.PackProductInfoList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanPackSearch: function () {
        packSingledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.PackProductInfoList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.PackProductInfoList.pageSize(size);
        viewModel.search();
      },
      //导出
      packExportHandle: function() {
          var searchParams = packSingledocSearch.getDataWithOpr(); //搜索查询参数
          var oldpackCode = searchParams["search_LIKE_packCode"];
          if(oldpackCode){
            searchParams["packCodes"] =oldpackCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_packCode"];
          var oldpackDescription = searchParams["search_LIKE_packDescription"];
          if(oldpackDescription){
            searchParams["packDescription"] =oldpackDescription.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_packDescription"];
          var templateUrl = '/pack-product-Info-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/pack-product-Info-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.PackProductInfoList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          viewModel.exportBombb(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      exportBombb: function(dataTable,element,searchParams,templateUrl,excelDataUrl,isAuditStatus){
          //导出
          var exportmeta = {
            meta: {
              isEdit:{type: 'string',required:true},
              isAll:{type: 'string',required:true},
              excelFileName:{type: 'string'}
            }
          }
          var viewModel = {
            exportData: new u.DataTable(exportmeta),
            listData: dataTable,
            exportTypeSrc: [],
            exportRangeSrc: []
          };
          viewModel.exportData.removeAllRows();
          viewModel.exportData.createEmptyRow();
          if(element.id != "exportFiel"){
            viewModel.exportTypeSrc = [];
            viewModel.exportRangeSrc= [];
          }else {
            viewModel.exportTypeSrc = [{value:false,name:"导出数据"}]
            viewModel.exportRangeSrc= [{value:true,name:"符合当前查询条件的全部数据行"}];
          }
          //初始默认选择导出新增模板
          viewModel.exportData.setValue("isEdit",0);
           var exportHtml= '<div id="dialog_content_export'+ element.id +'">'+  '<div class="u-msg-title">'+
          '<h4>导出</h4>'+
          '</div>'+
          '<div class="u-msg-content" id="validateExport">'+
          '<div class="ui-panel-head ui-bill-head">'+
          '<div class="ui-item" style="float: none;">'+
          '<div class="ui-name" style="line-height: 28px;">导出类型：</div>'+
          '<div class="ui-inputarea">'+
          '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isEdit","datasource":"exportTypeSrc","required":true}\' id="exportType">'+
          '<label  class="u-radio margin-right-10" >'+
          '<input type="radio" class="u-radio-button" name="exportType">'+
          '<span class="u-radio-label"></span>'+
          '</label>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="ui-item" style="float: none;display:none;" id="exportRange">'+
          '<div class="ui-name" style="line-height: 28px;">导出范围：</div>'+
          '<div class="ui-inputarea">'+
          '<div u-meta=\'{"type":"u-radio","data":"exportData","field":"isAll","datasource":"exportRangeSrc","required":true}\'>'+
          '<label  class="u-radio margin-right-10" >'+
          '<input type="radio" class="u-radio-button" name="exportRange">'+
          '<span class="u-radio-label"></span>'+
          '</label>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="ui-item" style="float: none;">'+
          '<div class="ui-name">请输入文件名：</div>'+
          '<div class="ui-inputarea">'+
          '<div u-meta=\'{"type":"u-text","data":"exportData","field":"excelFileName"}\'>'+
          '<input/>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="u-msg-footer">'+
          '<a class="u-msg-cancel ui-btn ui-btn-primary margin-right-5">取消</a>'+
          '<a class="u-msg-ok ui-btn ui-btn-green">确定</a>'+
          '</div>'+
          '</div>';
          $(element).empty();
          $(element).append($(exportHtml));
          ko.cleanNode(element);
          var app = u.createApp({
            el: element,
            model: viewModel
          });
          //判断是否选择导出新增模板
          $(element).find("#exportType").on("click","input",function(){
            var txt = $(this).closest("label").text();
            if(txt == '导出新增模板'){
              $(this).parents(".u-msg-content").find("#exportRange").slideUp(300);
              viewModel.exportData.setValue("isAll",null);
            }else{
              $(this).parents(".u-msg-content").find("#exportRange").slideDown(300);
            }
          })

          var exportDialog = u.dialog({content: "#dialog_content_export"+element.id,hasCloseMenu:true});
          var okButton = $("#dialog_content_export" + element.id + " .u-msg-ok");
          okButton.unbind("click").click(function(vent){
            exportOk(vent);
          });
          var cancelButton = $("#dialog_content_export" + element.id + " .u-msg-cancel");
          cancelButton.unbind("click").click(function(){
            exportDialog.close();
          });

          function exportOk(vent){
            var isAll = viewModel.exportData.getValue("isAll");
            var isEdit = viewModel.exportData.getValue("isEdit");
            var excelFileName = viewModel.exportData.getValue("excelFileName");
            var selectRowsArr = viewModel.listData.getSelectedRows();

            var exportUrl;
            //校验
            var validate = $(vent.target).closest(".u-msg-footer").prevAll("#validateExport")[0];
            var result = app.compsValidateMultiParam({element:validate,showMsg:true});
            if(isEdit != "0"){
              if(!result.passed){
                  toastr.warning("请选择导出范围!");
                  return;
              }
            }

            //有审核条件限制
            if(isAuditStatus == true && isEdit == "true"){
              var flag = false;
              if(isAll == "false"){
                for(var i = 0; i < selectRowsArr.length; i++){
                  var auditStatus = selectRowsArr[i].getValue("auditStatus");
                  if(auditStatus == "1"){
                    flag = true;
                  }
                }
              }else{
                var allRows = viewModel.listData.getAllRows();
                for(var i = 0; i < allRows.length; i++){
                  var auditStatus = allRows[i].getValue("auditStatus");
                  if(auditStatus == "1"){
                    flag = true;
                  }
                }
              }
              if(flag){
                toastr.warning("已审核数据不能导出，请重新选择！");
                return;
              }
            }
            if(isAll == "false"){
              if(selectRowsArr.length < 1){
                toastr.warning("导出选中行方式下需要选择数据导出！");
                return;
              }
            }
            if(isEdit == "0"){
              exportUrl = templateUrl;
            }else{
              exportUrl = excelDataUrl;
            }
            var ids = selectRowsArr.map(function(row, index, arr) {
              return row.getValue("id");
            });
            $('#exportForm').remove();
            var form = $("<form id='exportForm'>");   //定义一个form表单
            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', '');
            form.attr('method', 'post');
            form.attr('action', appCtx+exportUrl);

            var input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', 'ids');
            input1.attr('value', ids);

            var input2 = $('<input>');
            input2.attr('type', 'hidden');
            input2.attr('name', 'excelFileName');
            input2.attr('value', excelFileName);

            var input3 = $('<input>');
            input3.attr('type', 'hidden');
            input3.attr('name', 'isAll');
            input3.attr('value', isAll);

            if(searchParams){
              var input4 = $('<input>');
              input4.attr('type', 'hidden');
              input4.attr('name', 'searchParams');
              input4.attr('value', JSON.stringify(searchParams));
            }

            var input5 = $('<input>');
            input5.attr('type', 'hidden');
            input5.attr('name', 'isEdit');
            input5.attr('value', isEdit);

            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.append(input2);   //将查询参数控件提交到表单上
            form.append(input3);   //将查询参数控件提交到表单上
            if(searchParams){form.append(input4)};   //将查询参数控件提交到表单上
            form.append(input5);  //将查询参数控件提交到表单上
            form.submit();
            exportDialog.close();
          }
        },
  }
  viewModel = u.extend({},baseData,events,common.rendertype,rendertype);

  function appInit(element, params){
  	window.initButton(viewModel, element);//初始化按钮权限
    ko.cleanNode(element);
    //将模板页渲染到页面上
    element.innerHTML = tpl;
    //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
    app = u.createApp({
      el: element,
      model: viewModel
    });
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#SaleProductInfo-searchcontent")[0],
      [
        {
          type:"text",
          key:"code",
          label:"销售产品编码"
        },
        {
          type:"text",
          key:"description",
          label:"销售产品描述",
        },
        {
          type:"text",
          // compid:"suiteCode",
          key:"suiteCode",
          label:"套件编码",
          domid:"suiteCode"
        },
        {
          type:"text",
          key:"suiteDescription",
          label:"套件描述",
          domid:"suiteDescription"
        },
        {
          type:"text",
          key:"packCode",
          label:"包件编码",
          domid:"packCode"
        },
        {
          type:"text",
          key:"packDescription",
          label:"包件描述",
          domid:"packDescription"
        },
       {
            type:"radio",
            key:"isContain",
            label:"是否有下层套件",
            defaultvalue:"1",
            dataSource:[
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
          },
       {
            type:"radio",
            key:"isContainPack",
            label:"是否有下层包件",
            defaultvalue:"1",
            domid:"isContainPack",
            // enable:false,
            dataSource:[
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
          }
      ]);
    //查询组件初始化
    suitesingledocSearch = new searchbox(
      $("#SuiteProductInfo-searchcontent")[0],
      [
        {
          type:"text",
          key:"suiteCode",
          label:"套件编码",
        },
        {
          type:"text",
          key:"suiteDescription",
          label:"套件描述",
        },
        {
          type:"text",
          key:"packCode",
          label:"包件编码",
          domid:"suitepackCode"
        },
        {
          type:"text",
          key:"packDescription",
          label:"包件描述",
          domid:"suitepackDescription"
        }
        ,
       {
            type:"radio",
            key:"isContainPack1",
            label:"是否有下层包件",
            defaultvalue:"1",
            dataSource:[
            {value:'1',name:'是'},
            {value:'0',name:'否'}
            ]
          }
      ]);  
     // 查询组件初始化
    packSingledocSearch = new searchbox(
      $("#PackProductInfo-searchcontent")[0],
      [
        {
          type:"text",
          key:"packCode",
          label:"包件编码"
        },
        {
          type:"text",
          key:"packDescription",
          label:"包件描述",
        }
      ]);
    singledoceidt = new editcard(
      $("#dialog_layer")[0],
      [
       

      ],SaleProductInfometa);
    // 列表查询数据(无查询条件)

    // viewModel.search();
    // viewModel.suitesearch();
    // viewModel.packSearch();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#SaleProductInfo-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
     singledocSearch.viewModel.params.on("isContain.valuechange", function(obj) {
          var ispcattr = {"type":"u-radio","data":"params","field":"isContainPack","datasource":"isContainPacksourceData","enable":"false"}
          if (!obj.newValue) {
            return 
          }
          if (obj.newValue==1) {
            $("#suiteCode").children().attr("disabled",false);
            $("#suiteDescription").children().attr("disabled",false);
            $("#packCode").children().attr("disabled",false);
            $("#packDescription").children().attr("disabled",false);
            $("#isContainPack").find("input").attr("disabled",false);
            $("#isContainPack").find("label").removeClass('is-disabled');
          } else {
            $("#suiteCode").children().attr("disabled",true);
            $("#suiteDescription").children().attr("disabled",true);
            $("#packCode").children().attr("disabled",true);
            $("#packDescription").children().attr("disabled",true);
            $("#suiteCode").children().val("");
            $("#suiteDescription").children().val("");
            $("#packCode").children().val("");
            $("#packDescription").children().val("");
            $("#isContainPack").find("input").attr("disabled",true);
            $("#isContainPack").find("label").addClass('is-disabled');
            // $("#isContainPack").find("label").removeClass('is-checked');
          }
          
    });
     suitesingledocSearch.viewModel.params.on("isContainPack1.valuechange", function(obj) {
          if (!obj.newValue) {
            return 
          }
          if (obj.newValue==1) {
            $("#suitepackCode").children().attr("disabled",false);
            $("#suitepackDescription").children().attr("disabled",false);
          } else {
            $("#suitepackCode").children().attr("disabled",true);
            $("#suitepackDescription").children().attr("disabled",true);
            $("#suitepackCode").children().val("");
            $("#suitepackDescription").children().val("");
          }
          
    });
  
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.singledocSearch=singledocSearch;
  }

  return {
    init: init
  }
});


