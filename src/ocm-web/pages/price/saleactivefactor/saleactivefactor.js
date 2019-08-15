define(['text!./saleactivefactor.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,saleActiveDialog;
  baseData = {
    baseurl : '/price/sale-active-factor-asses',
    factorurl : '/price/sale-active-factors',
    saleActiveFactorList: new u.DataTable(SaleActiveFactorMeta),
    saleActiveSetItems: new u.DataTable(SaleActiveSetItemsMeta),
    billPanelStatus: CONST.BILLPANELSTATUS.DETAIL,
//  checkboxSrc:[checkedValue: "1",unCheckedValue: "0"]
	};
  rendertype = {
  	//因子组合名称
  	factorCombination: function(obj) {
  		var currentRow = viewModel.saleActiveFactorList.getRow(obj.rowIndex);
  		var assembleNameVal = currentRow.getValue("assembleName");
  		obj.element.innerHTML = assembleNameVal;
  	}
  };
  events = {
  	  //点击编辑按钮
  	  editClick: function() {
  	  	$('.ui-bill-detail').hide();
  	  	$('.ui-list-panel').show();
  	  	viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
  	  },
  	  //取消
  	  cancelHandle: function() {
  	  	common.dialog.confirmDialog({
          msg1: '确认取消？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            viewModel.search();
            $('.ui-bill-detail').show();
		  	  	$('.ui-list-panel').hide();
		  	  	viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
          }
        });
  	  },
  		//保存组合设置
    	saveList: function() {
    		var self = this;
		  	//判断因子组合优先级是否有重复
						var allRows = viewModel.saleActiveFactorList.getAllRows();
						var allRowValsArr = [];
						var flag = true;
		    if(allRows.length>1){
		
		      for(var i = 0; i < allRows.length; i++){
		         // 防止从数据库查出来的数据修改后，删行，可能会报不能有重复数据
		        if(allRows[i].status!="fdel"){
		          allRowValsArr[i] = allRows[i].getValue("assemblePriority");
		        }
		        // 防止从数据库查出来的数据清空，删行，可能会报不能有重复数据
		        if(null==allRows[i].getValue("assembleName")&&allRows[i].status!="fdel"){
		          toastr.warning("保存不能有空行！");
		          return;
		        }
		        if(allRows[i].getValue("assembleName") == ""){
		        	toastr.warning('“业务标识+渠道类型+产品组+办事处+客户”整体不能为空');
		          return;
		        }
		      }
		      //先排序再去重
		      var newAllRowValsArr = allRowValsArr.sort();
		      for(var j = 0; j < newAllRowValsArr.length-1; j++){
		        if(newAllRowValsArr[j] == newAllRowValsArr[j+1]){
		          flag = false;
		        }
		      }
		      
		    }
				if(flag){
					var data = viewModel.saleActiveFactorList.getSimpleData();
					//发送请求
	  			$._ajax({
			      url:appCtx + viewModel.baseurl + '/batch-save',
			      type:'post',
			      data: JSON.stringify(data),
			      contentType: "application/json; charset=utf-8",
			      success:function(){   
			      	//刷新
							self.search();
							toastr.success();
							$('.ui-bill-detail').show();
	  	  			$('.ui-list-panel').hide();
	  	  			viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
			      }
			    });
				}else{
					toastr.warning('组合优先级不能有重复');
				}
  		},
  		//点击因子设置-弹出框
  		setClick: function() {
  			var self = this;
  			//请求数据
  			$._ajax({
		      url:appCtx + viewModel.factorurl,
		      type:'get',
		      contentType: "application/json; charset=utf-8",
		      success:function(data){            
		        viewModel.saleActiveSetItems.setSimpleData(data.content,{unSelect:true});
		      }
		    });
		    //弹出框
		    saleActiveDialog = u.dialog({id:'saleActiveDialog',content:"#dialog_content_set",width:"35%"});
		    var okButton = $("#dialog_content_set .u-msg-ok");
				okButton.unbind("click").click(function(){
					self.saleActiveSetSave();
				});
				var cancelButton = $("#dialog_content_set .u-msg-cancel");
				cancelButton.unbind("click").click(function(){
					saleActiveDialog.close();
				});
  		},
  		//保存因子设置
  		saleActiveSetSave: function() {
  			var self = this;
  			var data = viewModel.saleActiveSetItems.getSimpleData();
  			var allRowsitem = viewModel.saleActiveSetItems.getAllRows();
  			var valArr = [];
  			var flag = true;
  			for(var i = 0; i < allRowsitem.length; i++){
  				valArr.push(allRowsitem[i].getValue("priority"));
  			}
  			//先排序再去重
				var valArr = valArr.sort();
				for(var j = 0; j < valArr.length; j++){
					if(valArr[j] == valArr[j+1]){
						flag = false;
					}
				}
				if(flag){
					//发送请求
	  			$._ajax({
			      url:appCtx + viewModel.factorurl + '/batch-save',
			      type:'post',
			      data: JSON.stringify(data),
			      contentType: "application/json; charset=utf-8",
			      success:function(){   
			      	//刷新
							self.search();
							saleActiveDialog.close();
			      }
			    });
				}else{
					toastr.warning("优先级有重复！");
				}
  			
  		},
      //增行
       addRow: function () {
        var emptyRow = viewModel.saleActiveFactorList.createEmptyRow({unselect:true});
        emptyRow.setValue("assemblePriority","0");
      },
      //删行
      delList: function () {
        var rows = viewModel.saleActiveFactorList.getSelectedRows();
        if(rows.length < 1){
        	toastr.warning("请选择数据");
        }
        viewModel.saleActiveFactorList.removeRows(rows);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.saleActiveFactorList.pageIndex(0);
        }
        viewModel.saleActiveFactorList.removeAllRows();
        var queryData = {};
        queryData.size = viewModel.saleActiveFactorList.pageSize();
        queryData.page = viewModel.saleActiveFactorList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.saleActiveFactorList.setSimpleData(data.content,{unSelect:true});
            viewModel.saleActiveFactorList.totalRow(data.totalElements);
            viewModel.saleActiveFactorList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
//    cleanSearch: function () {
//      singledocSearch.clearSearch();
//    },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.saleActiveFactorList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.saleActiveFactorList.pageSize(size);
        viewModel.search(true);
      }
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
   


    viewModel.search();
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#SaleActiveFactor-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
//  var pagebcomp = $("#pagination")[0]['u.pagination'];
//  pagebcomp.update({showState:false});

		
		//监听复选框变化，获取因子组合名称，计算计算组合优先级
		viewModel.saleActiveFactorList.on("valuechange", function (option) {
			  var newRow = option.rowObj;
			  //需要展现的字段名
  			var assembleNameArr = ["产品","经销商","门店"];
  			//当前已被选中的字段名
  			var newAssembleNameArr = [];

	  		//字段名
				var fileNameArr = ["product","distributor","store"];
				//字段值
				var fieldValArr = [];
				for(var a=0; a < fileNameArr.length; a++){
					fieldValArr[a] = newRow.getValue(fileNameArr[a]);
				}
	  		//根据字段值设置数组
	  		for( var i = 0; i < fieldValArr.length; i++){
	  			if(fieldValArr[i] == null){
	  				newRow.setValue(fileNameArr[i],0);
	  				newAssembleNameArr[i] = assembleNameArr[i];
	  			}else if( fieldValArr[i] == "0" || fieldValArr[i] == 0){
						newAssembleNameArr[i] = "";
					}else{
						newAssembleNameArr[i] = assembleNameArr[i];
					}
	  		}
	  		//去掉空字符串
	  		for(var i = 0; i < newAssembleNameArr.length; i++){
	  			if(newAssembleNameArr[i] == ""){
	  				newAssembleNameArr.splice(i,1);
	  				i--;
	  			}
	  		}
				newRow.setValue("assembleName",newAssembleNameArr.join("+"));
				
				
				//组合优先级 计算
				var rowVal = newRow.getSimpleData();
				$._ajax({
			      url:appCtx + viewModel.baseurl + '/calculate',
			      type:'post',
			      data: JSON.stringify(rowVal),
			      contentType: "application/json; charset=utf-8",
			      success:function(data){   
	      	    	//刷新
								newRow.setValue("assemblePriority",data);
	      	  }
			  });
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
