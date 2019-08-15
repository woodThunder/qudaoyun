define(['text!./permissionregister.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'],
  function (tpl, common, searchbox) {
    'use strict';
    var app, baseData, events, rendertype, viewModel, searcher,searchDt,
      billstatus = CONST.B2BENUM.PURCHASEORDER;
    baseData = {
      baseurl: '/notice/AppDataAuthority',
      permissionRegisterList: new u.DataTable(permissionregistermeta),
      appList:ko.observableArray([]),
    };
    rendertype = {
      //审核状态
      auditStatusGrid: function (obj) {
        var showValue = obj.value == "1" ? "已审核" : "未审核";
        obj.element.innerHTML = showValue;
      },
    };
    events = {
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.permissionRegisterList.pageIndex(0);
        }
        var queryData = searcher.getDataWithOpr();
        queryData.size = viewModel.permissionRegisterList.pageSize();
        queryData.page = viewModel.permissionRegisterList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.permissionRegisterList.setSimpleData(data.content, {unSelect: true});
            viewModel.permissionRegisterList.totalRow(data.totalElements);
            viewModel.permissionRegisterList.totalPages(data.totalPages);
          }
        })
      },
      //导出
      exportHandle: function() {
        var searchParams = searcher.getDataWithOpr(); //搜索查询参数
        var templateUrl = '/notice/AppDataAuthority/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  '/notice/AppDataAuthority/excelDataExport'; //导出数据地址参数
        var listData = viewModel.permissionRegisterList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //清空搜索条件
      cleanSearch: function () {
        searcher.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.permissionRegisterList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.permissionRegisterList.pageSize(size);
        viewModel.search(true);
      },
    };
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

    function appInit(element, params) {
      //将模板页渲染到页面上
      element.innerHTML = tpl;
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      app = u.createApp({
        el: element,
        model: viewModel
      });
      // 查询组件初始化
      searcher = new searchbox(
        $("#permissionregister-searchcontent")[0],
        [
          {
            type:"combo",
            key:"groupId",
            label:"应用分组",
            dataSource:viewModel.appList,
            namefield:"name",
            valuefield:"code",
            onlySelect: true,
          },
          {
            type: "text",
            key: "appName",
            label: "应用名称"
          },
          {
            type: "text",
            key: "authorityResourceName",
            label: "业务对象实体"
          },
        ]);
      viewModel.search();
    }

    function afterRender() {
      //绑定输入框enter事件
      $('#permissionregister-searchcontent input').off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });

      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl+"/findAppGroup",
        data:{},
        success:function(data){
          var newarray = [];
          for(var key in data){
            var newObj = {};
            newObj.value = key;
            newObj.name = data[key];
            newarray.push(newObj);
          }
          newarray.unshift({"name":"全部","value":""});
          viewModel.appList(newarray);
        }
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
