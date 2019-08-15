define(['text!./customercon.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt;
  baseData = {
    baseurl : '/customer-control/getList',
    counturl : '/customer-control/getCount',
    businessTypeCode:"",
    CustomerConList: new u.DataTable(CustomerConmeta)
  };
  rendertype = {
   
  };
  events = {
     
    
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.CustomerConList.pageIndex(0);
        }
        viewModel.CustomerConList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var businessType = queryData["search_LIKE_businessType"];
        if(businessType){
          queryData["businessType"] =viewModel.businessTypeCode;
        }
        delete queryData["search_LIKE_businessType"];
        var isPrecision = queryData["search_EQ_isPrecision"];
        if(isPrecision){
          queryData["isPrecision"] =isPrecision.replace(/%/g,'');
        }
        delete queryData["search_EQ_isPrecision"];
        
        var GTE_startDate = queryData["search_GTE_startDate_date"];
        if(GTE_startDate){
          queryData["GTE_startDate"] =GTE_startDate;
        }
        delete queryData["search_GTE_startDate_date"];

        var LT_startDate = queryData["search_LT_startDate_date"];
         if(LT_startDate){
          queryData["LT_startDate"] =LT_startDate;
        }
        delete queryData["search_LT_startDate_date"];

        var GTE_endDate = queryData["search_GTE_endDate_date"];
        if(GTE_endDate){
          queryData["GTE_endDate"] =GTE_endDate;
        }
        delete queryData["search_GTE_endDate_date"];

        var LT_endDate = queryData["search_LT_endDate_date"];
         if(LT_endDate){
          queryData["LT_endDate"] =LT_endDate;
        }
        delete queryData["search_LT_endDate_date"];
        // queryData.size = viewModel.CustomerConList.pageSize();
        // queryData.page = viewModel.CustomerConList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.CustomerConList.setSimpleData(data,{unSelect:true});
            viewModel.CustomerConList.totalRow(data.totalElements);
            viewModel.CustomerConList.totalPages(data.totalPages);
          }
        });
        $._ajax({
          type:"get",
          url:appCtx + viewModel.counturl,
          dataType:"json",
          data:queryData,
          success:function(data){
            var num = data;
            $("#searchNum").html(num);
           
          }
        })  
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      // //页码改变时的回调函数
      // pageChange: function (index) {
      //   viewModel.CustomerConList.pageIndex(index);
      //   viewModel.search();
      // },
      // //页码改变时的回调函数
      // sizeChange: function (size) {
      //   viewModel.CustomerConList.pageSize(size);
      //   viewModel.search();
      // },
      //导出
      exportHandle: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var businessType = searchParams["search_LIKE_businessType"];
          if(businessType){
            searchParams["businessType"] =viewModel.businessTypeCode;
          }
          delete searchParams["search_LIKE_businessType"];
          var isPrecision = searchParams["search_EQ_isPrecision"];
          if(isPrecision){
            searchParams["isPrecision"] =isPrecision.replace(/%/g,'');
          }
          delete searchParams["search_EQ_isPrecision"];
          
          var GTE_startDate = searchParams["search_GTE_startDate_date"];
          if(GTE_startDate){
            searchParams["GTE_startDate"] =GTE_startDate;
          }
          delete searchParams["search_GTE_startDate_date"];

          var LT_startDate = searchParams["search_LT_startDate_date"];
           if(LT_startDate){
            searchParams["LT_startDate"] =LT_startDate;
          }
          delete searchParams["search_LT_startDate_date"];

          var GTE_endDate = searchParams["search_GTE_endDate_date"];
          if(GTE_endDate){
            searchParams["GTE_endDate"] =GTE_endDate;
          }
          delete searchParams["search_GTE_endDate_date"];

          var LT_endDate = searchParams["search_LT_endDate_date"];
           if(LT_endDate){
            searchParams["LT_endDate"] =LT_endDate;
          }
          delete searchParams["search_LT_endDate_date"];
          var templateUrl = '/customer-control-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/customer-control-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.CustomerConList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          viewModel.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      exportFile: function(dataTable,element,searchParams,templateUrl,excelDataUrl,isAuditStatus){
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
      $("#CustomerCon-searchcontent")[0],
      [
        {
          type:"refer",
          key:"businessType",
          label:"业务类型",
          refinfo:"busstype",
          referId:"businessType",
          multi:true,
          opr: "LIKE",
        },{
          type:"daterange",
          key:"startDate",
          label:"起始日期"
        },
        // {
        //   type:"daterange",
        //   key:"endDate",
        //   label:"截止日期",
        // },

       {
            type:"radio",
            key:"isPrecision",
            label:"匹配模式",
            defaultvalue:"1",
            dataSource:[
            {value:'1',name:'精确'},
            {value:'0',name:'模糊'}
            ]
          }
      ]);
      
    singledoceidt = new editcard(
      $("#dialog_layer")[0],
      [
      
      ],CustomerConmeta);
    // 列表查询数据(无查询条件)

    // viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#CustomerCon-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //业务类型传参照传code
    singledocSearch.viewModel.params.on("businessType.valuechange",function(obj){
        if(obj.newValue!=obj.oldValue){
          var refer = $("#refContainerbusinessType").data("uui.refer");
          var refValues = refer.values;
          var refcode=[];
          if(refer.values.length>0){
            for(var i=0;i<refValues.length;i++){
               refcode.push(refValues[i].refcode);
            }
          }
          viewModel.businessTypeCode=refcode.sort().join();
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
});
