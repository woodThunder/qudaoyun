define(['text!./activitytypec.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
    'use strict'
    var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt;
    baseData = {
        baseurl : '/prom/activity-type-cs',
        ActivityTypeCList: new u.DataTable(ActivityTypeCmeta)
    };
    rendertype = {
    };
    events = {
        //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
        beforeEdit: function(index,rowId) {
            var title;viewModel.index = index;
            if (index >= 0) {
                //修改操作
                title = "编辑";
                // var currentData = viewModel.ActivityTypeCList.getSimpleData()[index];
                var currentData = viewModel.ActivityTypeCList.getRowByRowId(rowId).getSimpleData();
                viewModel.rowId = rowId;
                singledoceidt.seteidtData(currentData);
            }else {
                title = "新增"
                //清空编辑框的信息
                singledoceidt.cleareidt();
                singledoceidt.seteidtValue("isEnable",1);
            }
            //显示模态框
            singledoceidt.show(title,"900px",viewModel.edit);
        },
        //将操作后的数据进行保存
        edit: function() {
            // status
            var result = singledoceidt.validate();
            if(result.passed){
                var index = viewModel.index;
                var currentRow,type = "post";
                var postdata = singledoceidt.geteidtData();
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
                        singledoceidt.close();
                        if (index >= 0) {
                            //获取需要修改的行
                            // currentRow = viewModel.ActivityTypeCList.getRow(index);
                            currentRow = viewModel.ActivityTypeCList.getRowByRowId(viewModel.rowId)
                            //将用户填写的数据更新到ActivityTypeCList上
                        } else {
                            //添加数据
                            currentRow = viewModel.ActivityTypeCList.createEmptyRow();
                        }
                        currentRow.setSimpleData(data);
                    }
                })
            }
        },
        //删除和批量删除
        del: function (data,rowId) {
          if (typeof(data) == 'number') {
            viewModel.ActivityTypeCList.setRowSelectbyRowId(rowId);
          }
          var selectedRows = viewModel.ActivityTypeCList.getSelectedRows();
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
                      viewModel.ActivityTypeCList.removeRows(selectedRows);
                    }
                  });

                }
              });
            }
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if(reindex){
                viewModel.ActivityTypeCList.pageIndex(0);
            }
            viewModel.ActivityTypeCList.removeAllRows();
            var queryData = singledocSearch.getDataWithOpr();
            queryData.size = viewModel.ActivityTypeCList.pageSize();
            queryData.page = viewModel.ActivityTypeCList.pageIndex();
            $._ajax({
                type:"get",
                url:appCtx + viewModel.baseurl,
                dataType:"json",
                data:queryData,
                success:function(data){
                    viewModel.ActivityTypeCList.setSimpleData(data.content,{unSelect:true});
                    viewModel.ActivityTypeCList.totalRow(data.totalElements);
                    viewModel.ActivityTypeCList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            singledocSearch.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.ActivityTypeCList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.ActivityTypeCList.pageSize(size);
            viewModel.search(true);
        },
        //启用
        enable: function() {
          var selectedRows = viewModel.ActivityTypeCList.getSelectedRows();
          if(selectedRows.length < 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
          var ids = [];
            for(var i=0;i<selectedRows.length;i++) {
                ids.push(selectedRows[i].getValue("id"));
            }
            ids = ids.join(",");
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/batch-enable",
                data: {ids: ids},
                success:function(res){
                    for(var i=0;i<selectedRows.length;i++) {
                        selectedRows[i].setValue("isEnable", "1");
                      toastr.success();
                    }
                }
            })
        },
        //停用
        disable: function() {
          var selectedRows = viewModel.ActivityTypeCList.getSelectedRows();
          if(selectedRows.length < 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
          var ids = [];
            for(var i=0;i<selectedRows.length;i++) {
                ids.push(selectedRows[i].getValue("id"));
            }
            ids = ids.join(",");
            $._ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/batch-disable",
                data: {ids: ids},
                success:function(res){
                    for(var i=0;i<selectedRows.length;i++) {
                        selectedRows[i].setValue("isEnable", "0");
                        toastr.success();
                    }
                }
            })
        },
    }
    viewModel = u.extend({},baseData,events,common.rendertype);

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
            $("#ActivityTypeC-searchcontent")[0],
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
                    dataSource:CONST.ENABLESTATUSISALL
                },
            ]);
        singledoceidt = new editcard(
            $("#dialog_layer")[0],
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
                  type:"combo",
                  key:"channelTypeCode",
                  label:"渠道类型",
                  url:window.pathMap.base+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY059",
                  namefield:"name",
                  valuefield:"code",
                  onlySelect: true,
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
            ],ActivityTypeCmeta);
        // 列表查询数据(无查询条件)

        viewModel.search();
    }

    function afterRender(){
        //绑定输入框enter事件
        $('#ActivityTypeC-searchcontent input').off("keydown").on("keydown",function(e){
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
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
