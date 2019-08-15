define(['ocm_simpleview', './meta.js'], function (simpleview, model) {
  
  var view = simpleview.extend({
    model:model,
    baseData:{
      baseurl: '/prod-design',
      simpleList: new u.DataTable(model.options.metas.DesignProductmeta),
      statusField:'statusCode',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1
    },
    // events:{
    //  enable:function(){
    //     var selectedRows = viewModel.designProductList.getSelectedRows();
    //     var ids = [];
    //     var status=[];
    //     var statustip="";
    //     if (selectedRows&&selectedRows.length>0){
    //         for(var i=0;i<selectedRows.length;i++) {
    //           ids.push(selectedRows[i].getValue("id"));
    //           if (selectedRows[i].getValue("statusCode")==1 || selectedRows[i].getValue("statusCode")=="1"){
    //             status.push(selectedRows[i].getValue("code"));
    //           }
    //         }
    //         if(status.length >0){
    //           function statusArr(){
    //             for (i=0;i<status.length;i++){
    //                   statustip+=status[i] +"，";
    //             }
    //             return statustip.substring(0,statustip.length-1)
    //           }
    //             toastr.warning("数据   " + statusArr() +" 不可重复启用");
    //             return false
    //         }
    //         ids = ids.join(",");
    //         $._ajax({
    //           type: "post",
    //           url: appCtx + viewModel.baseurl + "/batch-enable",
    //           data: {ids: ids},
    //           success:function(res){
    //             for(var i=0;i<selectedRows.length;i++) {
    //               selectedRows[i].setValue("statusCode", "1");
    //             }
    //             toastr.success("启用成功");
    //           }
    //         })
    //     }
    //     else{
    //       toastr.warning("请先选择需要启用数据");
    //     }
    //  },
    //  disable:function(){
    //     var selectedRows = viewModel.designProductList.getSelectedRows();
    //     var ids = [];
    //     var status=[];
    //     var statustip="";
    //     if (selectedRows&&selectedRows.length>0){
    //         for(var i=0;i<selectedRows.length;i++) {
    //           ids.push(selectedRows[i].getValue("id"));
    //           if (selectedRows[i].getValue("statusCode")==0 || selectedRows[i].getValue("statusCode")=="0"){
    //             status.push(selectedRows[i].getValue("code"));
    //           }
    //         }
    //         if(status.length >0){
    //           function statusArr(){
    //             for (i=0;i<status.length;i++){
    //                   statustip+=status[i] +"，";
    //             }
    //             return statustip.substring(0,statustip.length-1)
    //           }
    //             toastr.warning("数据   " + statusArr() +" 不可重复停用");
    //             return false
    //         }
    //         ids = ids.join(",");
    //         $._ajax({
    //           type: "post",
    //           url: appCtx + viewModel.baseurl + "/batch-disable",
    //           data: {ids: ids},
    //           success:function(res){
    //             for(var i=0;i<selectedRows.length;i++) {
    //               selectedRows[i].setValue("statusCode", "0");
    //             }
    //             toastr.success("停用成功");
    //           }
    //         })
    //     }
    //     else{
    //       toastr.warning("请先选择需要停用数据")
    //     }

    //  },
    //   //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    //   search: function (reindex) {
    //     if (reindex) {
    //       viewModel.complexList.pageIndex(0);
    //     }
    //     viewModel.complexList.removeAllRows();
    //     var queryData = viewModel.searchcomp.getDataWithOpr?viewModel.searchcomp.getDataWithOpr():{};
    //     var pageSize = viewModel.complexList.pageSize();
    //     var pageNumber = viewModel.complexList.pageIndex();
    //     queryData.page = pageNumber;
    //     queryData.size = pageSize;
    //     $._ajax({
    //       type: "get",
    //       url: appCtx + viewModel.baseurl,
    //       dataType: "json",
    //       data: queryData,
    //       success: function (data) {
    //         viewModel.complexList.setSimpleData(data.content, {
    //           unSelect: true
    //         });
    //         viewModel.complexList.totalRow(data.totalElements);
    //         viewModel.complexList.totalPages(data.totalPages);
    //       }
    //     })
    //   },
    // },
  });
  return view;
});