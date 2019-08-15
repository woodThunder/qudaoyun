define(['text!./activitytypeb.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt;
  baseData = {
    baseurl : '/activity-type-b',
    ActivityTypeBList: new u.DataTable(ActivityTypeBmeta),
    singledoceidt: singledoceidt,
  };
  rendertype = {
  };
  events = {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var self = this;
        var title;
        viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.ActivityTypeBList.getRowByRowId(rowId).getSimpleData();
          viewModel.rowId = rowId;
          singledoceidt.seteidtData(currentData);
        }else {
          title = "新增"
          //清空编辑框的信息
          singledoceidt.cleareidt();
          singledoceidt.seteidtValue("isEnable",1);
          singledoceidt.seteidtValue("isPrice","0");
          singledoceidt.seteidtValue("isRebate","0");
          singledoceidt.seteidtValue("isCostSupport","0");
          singledoceidt.seteidtValue("isProductTask","0");
          singledoceidt.seteidtValue("isToProductDetail","0");
        }
        //显示模态框
        singledoceidt.show(title,"900px",viewModel.edit.bind(this,index));
      },
      //将操作后的数据进行保存
      edit: function() {
        var index = viewModel.index;
        // 优惠方式至少选中一项检验
        var postdata = singledoceidt.geteidtData();
        var editDt = singledoceidt.viewModel.params;
        if(postdata.isPrice != "1" && postdata.isRebate != "1" && postdata.isCostSupport != "1") {
          editDt.setValue("promWay","");
        }
        else {
          editDt.setValue("promWay","hasValue");
        }
        // isEnable
        var result = singledoceidt.validate();
        if(result.passed){
          var currentRow,type = "post";
          if(index>=0){
            type = "put";
          // TODO  字段补充
          }
        //更改后台数据
        $._ajax({
          url:appCtx + viewModel.baseurl,
          type:type,
          data:JSON.stringify(postdata),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            //如果index大于等于0说明是修改
            singledoceidt.close();
            if (index >= 0) {
              //获取需要修改的行
              currentRow = viewModel.ActivityTypeBList.getRowByRowId(viewModel.rowId);
              //将用户填写的数据更新到ActivityTypeBList上
            } else {
              //添加数据
              currentRow = viewModel.ActivityTypeBList.createEmptyRow();
            }
            currentRow.setSimpleData(data);
          }
        })
      }



      },
      //删除和批量删除
      del: function (data,rowId) {
        var ids = [];
        var rows = [];
        if (typeof(data) == 'number') {
          viewModel.ActivityTypeBList.setRowSelectbyRowId(rowId);
        }
        rows = viewModel.ActivityTypeBList.getSelectedRows();
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
                viewModel.ActivityTypeBList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.ActivityTypeBList.pageIndex(0);
        }
        viewModel.ActivityTypeBList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.ActivityTypeBList.pageSize();
        queryData.page = viewModel.ActivityTypeBList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.ActivityTypeBList.setSimpleData(data.content,{unSelect:true});
            viewModel.ActivityTypeBList.totalRow(data.totalElements);
            viewModel.ActivityTypeBList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ActivityTypeBList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ActivityTypeBList.pageSize(size);
        viewModel.search(true);
      },
         //启用
      enable: function() {
        var selectedRows = viewModel.ActivityTypeBList.getSelectedRows();
        var ids = [];
        for(var i=0;i<selectedRows.length;i++) {
          ids.push(selectedRows[i].getValue("id"));
        }
        if(ids.length == 0) {
          toastr.error("请选择数据");
        }
        ids = ids.join(",");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-enable",
          data: {ids: ids},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("isEnable", "1");
            }
          }
        })
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.ActivityTypeBList.getSelectedRows();
        var ids = [];
        for(var i=0;i<selectedRows.length;i++) {
          ids.push(selectedRows[i].getValue("id"));
        }
        if(ids.length == 0) {
          toastr.error("请选择数据");
        }
        ids = ids.join(",");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/batch-disable",
          data: {ids: ids},
          success:function(res){
            for(var i=0;i<selectedRows.length;i++) {
              selectedRows[i].setValue("isEnable", "0");
            }
          }
        })
      },
  }
  viewModel = u.extend({},baseData,events,common.rendertype,rendertype);

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
      $("#ActivityTypeB-searchcontent")[0],
      [
          {
            type:"text",
            key:"code",
            label:"活动类型编码",
          },
          {
            type:"text",
            key:"name",
            label:"活动类型名称",
          },
          {
            type:"radio",
            key:"isEnable",
            label:"启用状态",
            dataSource:CONST.ENABLESTATUSISALL,
          },
        //    {
        //   type:"checkbox",
        //   key:"isenable",
        //   label:"是否启用",
        //   checkedValue:1,
        //   unCheckedValue:0
        // }

          ]);
        singledoceidt = new editcard(
          $("#dialog_layer")[0],
          [
          {
            type:"text",
            key:"code",
            label:"活动类型编码",
            // disableInEdit: true,
          },
          {
            type:"text",
            key:"name",
            label:"活动类型名称",
            // disableInEdit: true,
          },
          {
            type:"combo",
            key:"activityGoalCode",
            label:"活动目的",
            url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY042",
            namefield:"name",
            valuefield:"code",
            onlySelect: true,
          },
          {
            type:"combo",
            key:"channelTypeCode",
            label:"渠道类型",
            url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY059",
            namefield:"name",
            valuefield:"code",
            onlySelect: true,
          },
          {
            type:"combo",
            key:"applyWayCode",
            label:"活动报名",
            url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY043",
            namefield:"name",
            valuefield:"code",
            onlySelect: true,
          },
          {
            type:"checkbox",
            key:"orderRequire",
            keyArray:[
            {key:'isProductTask',label:'提货任务'},
            {key:'isToProductDetail',label:'产品明细'},
            ],
            multi:true,
            // cls:"ui-checkboxes-item",
            label:"任务要求",
            checkedValue:1,
            unCheckedValue:0
          },
          {
            type:"checkbox",
            key:"promWay",
            keyArray:[
            {key:'isPrice',label:'价格'},
            {key:'isRebate',label:'返利',defaultvalue:"0"},
            {key:'isCostSupport',label:'费用支持'}
            ],
            multi:true,
            // cls:"ui-checkboxes-item",
            label:"优惠方式",
            checkedValue:1,
            unCheckedValue:0,
            requiredOne: true,
            domid: "promWay",
          },
          {
            type:"label",
            key:"isEnable",
            label:"启用状态",
            defaultvalue:1,
          },
          // {
          //   type:"text",
          //   key:"creator",
          //   label:"创建人",
          // },
          // {
          //   type:"datetime",
          //   key:"creationTime",
          //   label:"创建时间",
          // },
          // {
          //   type:"text",
          //   key:"modifier",
          //   label:"修改人",
          // },
          // {
          //   type:"datetime",
          //   key:"modifiedTime",
          //   label:"修改时间",
          // },
        ],ActivityTypeBmeta);
        viewModel.singledoceidt = singledoceidt;
    // 列表查询数据(无查询条件)

    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ActivityTypeB-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    var pagebcomp = $("#pagination")[0]['u.pagination'];
    // pagebcomp.update({showState:false});
  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
    window.vm = viewModel;
    window.app = app;
  }

  return {
    init: init
  }
});
