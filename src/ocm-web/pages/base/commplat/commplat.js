define(['text!./CommPlat.html','ocm_common','searchbox','./meta.js','ocm_global'], function (tpl,common,searchbox) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,queryViewModel;
  baseData = {
    baseurl : '/comm-plat',
    CommPlatList: new u.DataTable(CommPlatmeta),
    CommPlatCard: new u.DataTable(CommPlatmeta),
  };
  rendertype = {
    operation:function(obj){
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-edit font-c-c" '+
      editfun +
      ' title="编辑"></a>'+
      '</span>    '+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
      delfun +
      ' title="删除"></a>'+
      '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var self = this;
        viewModel.index = index;
        if (index >= 0) {
          //修改操作
          var currentData = viewModel.CommPlatList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
          viewModel.CommPlatCard.removeAllRows();
          var temprow = viewModel.CommPlatCard.createEmptyRow();
          temprow.setSimpleData(currentData);
        } else {
          //添加操作
          viewModel.CommPlatCard.removeAllRows();
          viewModel.CommPlatCard.createEmptyRow();
        }
        //显示模态框
        //如果模态框不存在创建模态框，存在则直接显示
        if (!viewModel.dialog) {
          viewModel.dialog = u.dialog({
            id: 'testDialg',
            content: "#dialog_content",
            hasCloseMenu: true,
            width: "27.8%",
          });
          var okButton = document.body.querySelector(".J-ok");
          u.on(okButton, 'click', function() {
            viewModel.edit(viewModel.index);
            viewModel.dialog.close();
          });

          var cancelButton = document.body.querySelector(".J-cancel");
          u.on(cancelButton, 'click', function() {
            viewModel.dialog.close();
          });
        } else {
          viewModel.dialog.show();
        }
      },
      //将操作后的数据进行保存
      edit: function(index) {
        var currentRow,type = "post";
        var postdata = viewModel.CommPlatCard.getSimpleData()[0];
        if(index>=0){
          type = "put";
        }
        //更改后台数据
        $._ajax({
          url:appCtx + viewModel.baseurl,
          type:type,
          data:JSON.stringify(postdata),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            //如果index大于等于0说明是修改
            if (index >= 0) {
              //获取需要修改的行
              currentRow = viewModel.CommPlatList.getRowByRowId(viewModel.rowId);
              //将用户填写的数据更新到CommPlatList上
            } else {
              //添加数据
              currentRow = viewModel.CommPlatList.createEmptyRow();
            }
            currentRow.setSimpleData(data);
          }
        })


      },
      //删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.CommPlatList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.CommPlatList.getSelectedRows();
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
              data: "ids=" + ids.join(","),
              success:function(data){
                viewModel.CommPlatList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.CommPlatList.pageIndex(0);
        }
        viewModel.CommPlatList.removeAllRows();
        var queryData = {};
        queryData = queryViewModel.getSearchData();
        var pageSize = viewModel.CommPlatList.pageSize();
        var pageNumber = viewModel.CommPlatList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:{
            page:pageNumber,
            size:pageSize
          },
          success:function(data){
            viewModel.CommPlatList.setSimpleData(data.content,{unSelect:true});
            viewModel.CommPlatList.totalRow(data.totalElements);
            viewModel.CommPlatList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        queryViewModel.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.CommPlatList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.CommPlatList.pageSize(size);
        viewModel.search(true);
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
    queryViewModel = new searchbox(
      $("#CommPlat-searchcontent")[0],
      [{
        type:"text",
        key:"code",
        label:"编码"
      },
      {
        type:"text",
        key:"name",
        label:"名称"
      }]);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#CommPlat-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    var pagebcomp = $("#pagination")[0]['u.pagination'];
    pagebcomp.update({showState:false});
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
});
