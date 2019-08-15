define(['ocm_simpleview', './meta.js','ocm_common'], function (simpleview, model,common) {
    var viewModel;
    var view = simpleview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
        model: model,
        baseData: {
            baseurl: '/base/series-docs',
            dialogWidth: '900px',            
            searchBaseurl: '/base/series-docs?sort=creationTime,desc&sort=id,desc&search_EQ_seriesType=0',
            simpleList: new u.DataTable(model.options.metas.CustDocGroupDefmeta),
            buttonSource: model.options.buttons.button1,
            searchcomp: {},
            searchSource: model.options.searchs.search1,
            dialogcardcomp: {},
            dialogcardSource: model.options.dialogs.dialog1,
            gridOption: model.options.grids.grid1,
            statusField: 'isEnable'
        },
    });

    return view;
});


// define(['text!./custdocdef.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
//   'use strict'
//   var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt;
//   baseData = {
//     baseurl : '/base/cust-doc-defs',
//     CustDocDefList: new u.DataTable(CustDocDefmeta)
//   };
//   rendertype = {
//     operation:function(obj){
//       var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
//       var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
//       obj.element.innerHTML = '<div class="ui-handle-icon">'+
//       '<span class="ui-handle ui-tab-icon-b">'+
//       '<a href="#" class="uifont icon-edit font-c-c" '+
//       editfun +
//       ' title="编辑"></a>'+
//       '</span>    '+
//       '<span class="ui-handle ui-tab-icon-b">'+
//       '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
//       delfun +
//       ' title="删除"></a>'+
//       '</span></div>';
//       ko.cleanNode(obj.element);
//       ko.applyBindings(viewModel, obj.element);
//     }
//   };
//   events = {
//       //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
//       beforeEdit: function(index,rowId) {
//         var title;viewModel.index = index;
//         if (index >= 0) {
//           //修改操作
//           title = "编辑";
//           var currentData = viewModel.CustDocDefList.getRowByRowId(rowId).getSimpleData();
// 					viewModel.rowId = rowId;
//           singledoceidt.seteidtData(currentData);
//         }else {
//           title = "新增"
//           //清空编辑框的信息
//           singledoceidt.cleareidt();
//         }
//         //显示模态框
//         singledoceidt.show(title,"900px",viewModel.edit);
//       },
//       //将操作后的数据进行保存
//       edit: function() {
//         var result = singledoceidt.validate();
//         if(result.passed){
//           var index = viewModel.index;
//           var currentRow,type = "post";
//           var postdata = singledoceidt.geteidtData();
//           if(index>=0){
//             type = "put";
//           }
//           else{
//             postdata.statusCode=1;
//           }
//           //更改后台数据
//           $._ajax({
//             url:appCtx + viewModel.baseurl,
//             type:type,
//             data:JSON.stringify(postdata),
//             contentType : "application/json; charset=utf-8",
//             success:function(data){
//               //如果index大于等于0说明是修改
//               singledoceidt.close();
//               if (index >= 0) {
//                 //获取需要修改的行
//                 currentRow = viewModel.CustDocDefList.getRowByRowId(viewModel.rowId);
//                 //将用户填写的数据更新到CustDocDefList上
//               } else {
//                 //添加数据
//                 currentRow = viewModel.CustDocDefList.createEmptyRow();
//               }
//               currentRow.setSimpleData(data);
//               	toastr.success("保存成功");
//             }
//           })
//         }

//       },
//       //删除和批量删除
//       del: function (data,rowId) {
//         if (typeof(data) == 'number') {
//           viewModel.CustDocDefList.setRowSelectbyRowId(rowId);
//         }
//         var ids = [];
//         var rows = viewModel.CustDocDefList.getSelectedRows();
//         var status=[];
//         var statustip="";
//         if(rows&&rows.length>0){
//           for(var i = 0;i<rows.length;i++){
//             ids.push(rows[i].getValue("id"));
//              var statusCode=rows[i].getValue("statusCode");
//           	if(statusCode==1 || statusCode=="1"){
//           		status.push(rows[i].getValue("code"));
//           	}
//           }
//           if(status.length >0){
//         			function statusArr(){
//         				for (i=0;i<status.length;i++){
// 	          			 	  statustip+=status[i] +"，";
// 	          		}
//         				return statustip.substring(0,statustip.length-1)
//         			}
// 	          		toastr.warning("数据   " + statusArr() +" 已启用不可删除");
// 	          		return false
//           	}
//            common.dialog.confirmDialog({
//           msg1: '确认删除这些项？',
//           msg2: '此操作不可逆',
//           width: '400px',
//           type: 'error',
//           onOk: function () {
//             $._ajax({
//               url:appCtx + viewModel.baseurl + "/delete",
//               type:"post",
//               // data: "ids=" + ids.join(","),
//               data:{
//                 ids:ids.join(",")
//               },
//               success:function(data){
//                 viewModel.CustDocDefList.removeRows(rows);
//                 toastr.success("删除成功");
//               }
//             });

//           }
//         });
//         }

//         else{
//         	toastr.warning("请先选择需要删除数据");
//         }
//       },


//         //启用
//       enable: function() {
// //    	alert("000");
//         var selectedRows = viewModel.CustDocDefList.getSelectedRows();
//         var ids = [];
//         var status=[];
//         var statustip="";
//         if (selectedRows&&selectedRows.length>0){
// 		        for(var i=0;i<selectedRows.length;i++) {
// 		          ids.push(selectedRows[i].getValue("id"));
// 		           if (selectedRows[i].getValue("statusCode")==1 || selectedRows[i].getValue("statusCode")=="1"){
// 		          	status.push(selectedRows[i].getValue("code"));
// 		          }
// 		          console.log(ids);
// 		        }
// 		        if(status.length >0){
//         			function statusArr(){
//         				for (i=0;i<status.length;i++){
// 	          			 	  statustip+=status[i] +"，";
// 	          		}
//         				return statustip.substring(0,statustip.length-1)
//         			}
// 	          		toastr.warning("数据   " + statusArr() +" 不可重复启用");
// 	          		return false
//           	}
// 		        ids = ids.join(",");
// 		        $._ajax({
// 		          type: "post",
// 		          url: appCtx + viewModel.baseurl + "/batch-enable",
// 		          data: {ids: ids},
// 		          success:function(res){
// 		            for(var i=0;i<selectedRows.length;i++) {
// 		              selectedRows[i].setValue("statusCode", "1");
// 		            }
// 		            toastr.success("启用成功");
// 		          }
// 		        })
// 		    }
//         else{
//         	toastr.warning("请先选择需要启用数据");
//         }
//       },

//       //停用
//       disable: function() {
//         var selectedRows = viewModel.CustDocDefList.getSelectedRows();
//         var ids = [];
//         var status=[];
//         var statustip="";
//         if (selectedRows&&selectedRows.length>0){
// 		        for(var i=0;i<selectedRows.length;i++) {
// 		          ids.push(selectedRows[i].getValue("id"));
// 		           if (selectedRows[i].getValue("statusCode")==0 || selectedRows[i].getValue("statusCode")=="0"){
// 		          	status.push(selectedRows[i].getValue("code"));
// 		          }
// 		        }
// 		        if(status.length >0){
//         			function statusArr(){
//         				for (i=0;i<status.length;i++){
// 	          			 	  statustip+=status[i] +"，";
// 	          		}
//         				return statustip.substring(0,statustip.length-1)
//         			}
// 	          		toastr.warning("数据   " + statusArr() +" 不可重复停用");
// 	          		return false
//           	}
// 		        ids = ids.join(",");
// 		        $._ajax({
// 		          type: "post",
// 		          url: appCtx + viewModel.baseurl + "/batch-disable",
// 		          data: {ids: ids},
// 		          success:function(res){
// 		            for(var i=0;i<selectedRows.length;i++) {
// 		              selectedRows[i].setValue("statusCode", "0");
// 		            }
// 		            toastr.success("停用成功");
// 		          }
// 		        })
// 		    }
//         else{
//         	toastr.warning("请先选择需要停用数据")
//         }
//       },

//       //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
//       search: function (reindex) {
//         if(reindex){
//           viewModel.CustDocDefList.pageIndex(0);
//         }
//         viewModel.CustDocDefList.removeAllRows();
//         var queryData = singledocSearch.getDataWithOpr();
//         queryData.size = viewModel.CustDocDefList.pageSize();
//         queryData.page = viewModel.CustDocDefList.pageIndex();
//         $._ajax({
//           type:"get",
//           url:appCtx + viewModel.baseurl,
//           dataType:"json",
//           data:queryData,
//           success:function(data){
//             viewModel.CustDocDefList.setSimpleData(data.content,{unSelect:true});
//             viewModel.CustDocDefList.totalRow(data.totalElements);
//             viewModel.CustDocDefList.totalPages(data.totalPages);
//           }
//         })
//       },
//       //清空搜索条件
//       cleanSearch: function () {
//         singledocSearch.clearSearch();
//       },
//       //页码改变时的回调函数
//       pageChange: function (index) {
//         viewModel.CustDocDefList.pageIndex(index);
//         viewModel.search();
//       },
//       //页码改变时的回调函数
//       sizeChange: function (size) {
//         viewModel.CustDocDefList.pageSize(size);
//         viewModel.search(true);
//       }
//   }
//   viewModel = u.extend({},baseData,events,common.rendertype,rendertype);

//   function appInit(element, params){
//     window.initButton(viewModel, element);//初始化按钮权限
//     ko.cleanNode(element);
//     //将模板页渲染到页面上
//     element.innerHTML = tpl;
//     //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
//     app = u.createApp({
//       el: element,
//       model: viewModel
//     });


//     // 查询组件初始化
//     singledocSearch = new searchbox(
//       $("#CustDocDef-searchcontent")[0],
//       [
//         // {
//         //   type:"text",
//         //   key:"code",
//         //   label:"档案维护编码"
//         // },
//         // {
//         //   type:"text",
//         //   key:"name",
//         //   label:"档案维护名称",
//         // },
//         {
//           type:"refer",
//           // key:"custDocId",
//           key:"custDoc--id",
//           label:"档案定义编码",
//           refinfo:"CustDoc"
//         },
//         {
//             type:"radio",
//             key:"isEnable",
//             label:"启用状态",
//             multi:false,
//             defaultvalue:"1",
//             dataSource:[
//             {value:' ',name:'全部'},
//             {value:'1',name:'启用'},
//             {value:'0',name:'停用'}
//             ]
//           }
//       ]);
//     // debugger
//     singledocSearch.viewModel.params.on('valueChange',function(obj){
//       viewModel.search(true);
//     })






//     singledoceidt = new editcard(
//       $("#dialog_layer")[0],
//       [
//         {
//           type:"text",
//           key:"code",
//           label:"档案维护编码",
//           disableInEdit:true
//         },
//         {
//           type:"text",
//           key:"name",
//           label:"档案维护名称"
//         },
//       {
//           type:"refer",
//           key:"custDocId",
//           label:"档案定义编码",
//           refinfo:"CustDoc",
//             clientParam:{
//               "EQ_isEnable":"1","EQ_dr":"0"
//               }
//         },
//        {
//            type:"label",
//           key:"statusCode",
//           label:"启用状态",
//        },
//        {
//           type:"textarea",
//           key:"description",
//           label:"档案维护描述",
//           cls:"ui-textarea-item"
//       }

//       ],CustDocDefmeta);
//     // 列表查询数据(无查询条件)

//   }

//   function afterRender(){
//     //绑定输入框enter事件
//     $('#CustDocDef-searchcontent input').off("keydown").on("keydown",function(e){
//       if (e.keyCode == 13) {
//         $(this).blur();
//         viewModel.search(true);
//       }
//     });

//   }

//   function init(element, params) {
//     appInit(element, params);
//     afterRender();
//   }




//   return {
//     init: init
//   }
// });
