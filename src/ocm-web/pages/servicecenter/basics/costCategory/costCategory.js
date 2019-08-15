define(['text!./costCategory.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard) {
	'use strict'
	var app, baseData, events, rendertype, viewModel, singledocSearch,popupDialog,popupMainDataListData;
	baseData = {
		baseurl: '/sc/cost-categorys',
		mainDataList: new u.DataTable(mainData),
		mainDataListQuery:new u.DataTable(mainData),//查询条件
		mainDataListTop: new u.DataTable(mainData),//新增表头
		popupMainDataList: new u.DataTable(addMainDataList),//新增列表
		panelType: ko.observable("add"), //用于区分当前是新增还是查看弹框
		radiodata:[{value:'1',name:'启用'},{value:'0',name:'停用'}],//新增时单选框的数据源

		isEnable: [{
			value: "1",
			name: '启用'
		}, {
			value: "0",
			name: '停用'
		}],
		isDefaultSrc: [{
			value: "1",
			name: '是'
		}, {
			value: "0",
			name: '否'
		}],
	};
	rendertype = {
		operation: function(obj) {
			var dataRowId = obj.row.value['$_#_@_id'];			
			var delfun = "data-bind=click:delData.bind($data," + obj.rowIndex + "," + dataRowId + ")";
			var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + "," + dataRowId + ")";
			var isDefaultFun = "data-bind=click:defaultFun.bind($data," + obj.rowIndex + "," + dataRowId + ")";
			


			obj.element.innerHTML = '<div class="ui-handle-icon">' +
				'<span class="ui-handle-word">' +
				'<a href="#" class="u-grid-content-focus-row" ' +
				isDefaultFun +
				' title="默认">设为默认</a>' +
				'</span>    ' +
				'<span class="ui-handle-word">' +
				'<a href="#" class="u-grid-content-focus-row" ' +
				editfun +
				' title="编辑">编辑</a>' +
				'</span>    ' +
				'<span class="ui-handle-word">' +
				'<a href="#" class="u-grid-content-focus-row" ' +
				delfun +
				' title="删除">删除</a>' +
				'</span></div>';
			ko.cleanNode(obj.element);
			ko.applyBindings(viewModel, obj.element);
		}
	
	};
	events = {
		 //导入
		 importHandle: function () {
			var urlInfo = '/b2c/settle-rpt-details/address/excelDataImport'; //倒入地址参数
			var urlStatusInfo = '/b2c/settle-rpt-details/address/excelLoadingStatus'; //请求进度地址参数
			var ele = $('#importFiel')[0]; //挂载元素
			common.fileHandle.importFile(urlInfo, urlStatusInfo,ele,1); 
		  },
		  //导出
		  exportHandle: function () {
			var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
			var templateUrl = '/b2c/settle-rpt-details/address/downloadExcelTemplate'; //导出模板地址参数
			var excelDataUrl = '/b2c/settle-rpt-details/address/excelDataExport'; //导出数据地址参数
			var listData = viewModel.mainDataList; //需要导出表格的dataTable
			var ele = $('#exportFiel')[0]; //挂载元素
			searchParams.search_EQ_secondServiceSign = "1";//search_EQ_secondServiceSign
			//var typeArr = [{value:true,name:"导出模板"},{value:false,name:"导出数据"}]; //导出类型
			//common.fileHandle.exportTemplate(listData, ele, searchParams, templateUrl, excelDataUrl);
			//common.fileHandle.exportFileType(listData, ele, searchParams, templateUrl, excelDataUrl, typeArr);
			common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);

		  },		  	
		//弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
		beforeEdit: function(index,rowId) {
			var title;
			viewModel.index = index;
			if(index >= 0) {
				//修改操作
				title = "编辑";
				viewModel.panelType('edit');
			} else {
				title = "新增"
				viewModel.panelType('add');
				//singledoceidt.show(title, "700px", viewModel.edit);
			}
			viewModel.popupDialogList(index,rowId,title);
		},
		isDefaultFun:function(index,rowId){

		},


		//设为默认
		defaultFun:function(index,rowId){
			if (typeof (rowId) == 'number') {
				viewModel.mainDataList.setRowSelectbyRowId(rowId);
			  }
			  var ids = [];
			  var rows = viewModel.mainDataList.getSelectedRows();
			  if (rows && rows.length > 0) {
				if(rows.length==1){
					for (var i = 0; i < rows.length; i++) {
						ids.push(rows[i].getValue("id"));
					  }
					  $._ajax({
						url: appCtx + viewModel.baseurl + "/delete",
						type: "post",
						data: {
						  ids: ids.join(",")
						},
						success: function (data) {
						  viewModel.mainDataList.removeRows(rows);
						  toastr.success("设置成功");
						}
					  });
				}
				else{
					toastr.warning("只能选择一行数据");
				}
			
			  }
			  else {
				toastr.warning("请先选择一行数据");
			  }

		},


		// 删除
		delData:function(index,rowId){
			if (typeof (rowId) == 'number') {
				viewModel.mainDataList.setRowSelectbyRowId(rowId);
			  }
			  var ids = [];
			  var rows = viewModel.mainDataList.getSelectedRows();
			  if (rows && rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
				  ids.push(rows[i].getValue("id"));
				}
				common.dialog.confirmDialog({
				  msg1: '确认删除这些项？',
				  msg2: '此操作不可逆',
				  width: '400px',
				  type: 'error',
				  onOk: function () {
					$._ajax({
					  url: appCtx + viewModel.baseurl + "/delete",
					  type: "post",
					  data: {
						ids: ids.join(",")
					  },
					  success: function (data) {
						viewModel.mainDataList.removeRows(rows);
						toastr.success("删除成功");
					  }
					});
				  }
				});
			  }
			  else {
				toastr.warning("请先选择一行数据");
			  }

		},

		//启用
		Enable:function(index,rowId){
			if (typeof (rowId) == 'number') {
				viewModel.mainDataList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.mainDataList.getSelectedRows();
				if (rows && rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + "/batch-enable",
					type: "post",
					data: {
					ids: ids.join(",")
					},
					success: function (data) {
						viewModel.search();
					}
				});
				}
				else {
				toastr.warning("请先选择一行数据");
				}

		},

		//停用
		Disable:function(index,rowId){
			if (typeof (rowId) == 'number') {
				viewModel.mainDataList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.mainDataList.getSelectedRows();
				if (rows && rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + "/batch-disable",
					type: "post",
					data: {
					ids: ids.join(",")
					},
					success: function (data) {
						viewModel.search();
					}
				});
				}
				else {
				toastr.warning("请先选择一行数据");
				}

		},

		//新增、编辑弹窗
		popupDialogList: function(index,rowId,title) {
			//清除列表数据
			var thisTitle = title;
			var emptyRow = null;
			if(thisTitle == "编辑"){
				viewModel.mainDataList.setRowSelectbyRowId(rowId);
			}else{
				//加载新增数据
				//var curRow = viewModel.mainDataList.createEmptyRow();
				emptyRow = viewModel.mainDataList.createEmptyRow({ unSelect: true });
				viewModel.mainDataList.setRowFocus(emptyRow);
			}
			
			var self = this;
			popupDialog = u.dialog({
				id: 'listDataEdit',
				content: "#dialog_layer-popup",
				"width": "550px"
			});
			// 名称修改
			var titleName = $("#dialog_layer-popup .u-msg-title h4");
				titleName.text(title);
			// 保存按钮
			var okButton = $("#dialog_layer-popup .u-msg-ok");
			okButton.unbind("click").click(function() {
				if(thisTitle == "编辑") {
					viewModel.saveEdit();
				}else{
					viewModel.saveAdd();
				}
			//	popupDialog.close();
			});
			// 取消按钮
			var cancelButton = $("#dialog_layer-popup .u-msg-cancel");
			cancelButton.unbind("click").click(function() {
				 if(thisTitle == "新增"){
					viewModel.mainDataList.removeRow(emptyRow);
				 }
				 popupDialog.close();
			});
			// 关闭按钮
			var closeButton = $("#listDataEdit .u-msg-close span");
			closeButton.unbind("click").click(function() {
				if(thisTitle == "新增"){
					viewModel.mainDataList.removeRow(emptyRow);
				}
		    });
		},
		//保存
		saveEdit: function() {
			var type = "put";
			var validate = $("#validate")[0];//校验
			var result = app.compsValidateMultiParam({
				element: validate,
				showMsg: true
			});
			if(result.passed) {
				var currentRow = viewModel.mainDataList.getCurrentRow().getSimpleData();
				//更改后台数据
				$._ajax({
					url: appCtx +  viewModel.baseurl,
					type: type,
					data: JSON.stringify(currentRow),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						popupDialog.close();
						viewModel.search();
						toastr.success("修改成功");
						// if(index >= 0) {
						// 	//获取需要修改的行
						// 	currentRow = viewModel.mainDataList.getRow(index);
						// 	//将用户填写的数据更新到mainDataList上
						// } else {
						// 	//添加数据
						// 	currentRow = viewModel.mainDataList.createEmptyRow();
						// }
					}
				})
			}
		},

		//保存新增
		saveAdd:function(){
			var type = "post";		
			var validate = $("#validate")[0];//校验
			var result = app.compsValidateMultiParam({
				element: validate,
				showMsg: true
			});
			if(result.passed) {
				var mainData = viewModel.mainDataList.getCurrentRow().getSimpleData();
				$._ajax({
					url: appCtx + viewModel.baseurl ,
					type: type,
					data: JSON.stringify(mainData),
					
					contentType: "application/json; charset=utf-8",
					success: function(data) {
						// viewModel.mainDataList.getFocusRow().setSimpleData(data);
						viewModel.search();
						popupDialog.close();						
						toastr.success("保存成功");
					}
				});
			}
		},


		//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
		search: function(reindex) {
			if(reindex) {
				viewModel.mainDataList.pageIndex(0);
			}
			viewModel.mainDataList.removeAllRows();
			var queryData = singledocSearch.getDataWithOpr();
			//var queryData = {};
			//console.log(queryData);
			queryData.size = viewModel.mainDataList.pageSize();
			queryData.page = viewModel.mainDataList.pageIndex();
			// queryData["search_EQ_addressSign"] = "1";
			$._ajax({
				type: "get",
				url: appCtx + viewModel.baseurl,
				dataType: "json",
				data: queryData,
				success: function(data) {
					//viewModel.mainDataList.setSimpleData(data.content);
					viewModel.mainDataList.setSimpleData(data.content, {
						unSelect: true
					});
					viewModel.mainDataList.totalRow(data.totalElements);
					viewModel.mainDataList.totalPages(data.totalPages);
				}
			})
		},
		//清空搜索条件
		cleanSearch: function() {
			//viewModel.referLink();
			singledocSearch.clearSearch();
			//清除关联
			$("#parentCodeId").attr("data-refparam", '{}'); 
			$("#parentCodeId input").val('');
		},
		//页码改变时的回调函数
		pageChange: function(index) {
			viewModel.mainDataList.pageIndex(index);
			viewModel.search();
		},
		//页码改变时的回调函数
		sizeChange: function(size) {
			viewModel.mainDataList.pageSize(size);
			viewModel.search();
		},
		//参照关联
		referLink:function(){
			//结算单号-关联服务商
			singledocSearch.viewModel.params.on('serviceProvider--id.valuechange',function(obj){
				var id = obj.newValue;
				////console.log(id);
				if(id){
					//清除关联
					//$("#serviceProviderId").attr("data-search",id); 
					$("#parentCodeId").attr("data-refparam", '{"IN_serviceProvider.id":"' + id + '"}');
					$("#parentCodeId input").val('');
				}else{
					//清除关联
					$("#parentCodeId").attr("data-refparam", '{}'); 
					$("#parentCodeId input").val('');
				}
			});
		}
	}
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
		singledocSearch = new searchbox(
			$("#mainData-searchcontent")[0], [
				// {
				// 	type: "daterange",
				// 	key: "parent--startDate",
				// 	label: "起止日期",
				// },	
				
				// {
				// 	type: "refer",
				// 	key: "faultMainName--id",
				// 	label: "故障大类",
				// 	refinfo: "faultMainClassify",
				// 	multi: true, 
				// 	domid: "searchStoreId"
				// },
			
				// {
				// 	type: "text",
				// 	key: "buyerName",
				// 	label: "顾客姓名"
				// },				
				{
					type: "text",
					key: "code",
					label: "费用项目编码",
				},
				{
					type: "text",
					key: "name",
					label: "费用项目名称",
				}
			
			]);
		// 列表查询数据(无查询条件)
		viewModel.search();
	}

	function afterRender() {
		//绑定输入框enter事件
		$('#mainData-searchcontent input').off("keydown").on("keydown", function(e) {
			if(e.keyCode == 13) {
				$(this).blur();
				viewModel.search();
			}
		});
		// 监听业务类型参照选择
		singledocSearch.viewModel.params.on("pk_test_grid.valuechange", function(obj) {
			//console.log(obj);
		});
		//调用，参照关联
		viewModel.referLink();
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