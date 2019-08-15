define(['text!./floatcoefffactor.html','ocm_common','searchbox','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,editcard) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch,singledoceidt,floatSetDialog;
  baseData = {
    baseurl : '/floatcoeff-factor-asse',
    factorurl : '/floatcoeff-factor',
    FloatCoeffFactorList: new u.DataTable(FloatCoeffFactormeta),
    floatSetItems: new u.DataTable(floatSetItems),
    billPanelStatus: CONST.BILLPANELSTATUS.DETAIL,
//  checkboxSrc:[checkedValue: "1",unCheckedValue: "0"]
	};
  rendertype = {
  	//因子组合名称
  	factorCombination: function(obj) {
  		var currentRow = viewModel.FloatCoeffFactorList.getRow(obj.rowIndex);
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
				var allRows = viewModel.FloatCoeffFactorList.getAllRows();
				var allRowValsArr = [];
				var flag = true;
				for(var i = 0; i < allRows.length; i++){
					// 防止从数据库查出来的数据修改后，删行，可能会报不能有重复数据
	        if(allRows[i].status!="fdel"){
	          allRowValsArr[i] = allRows[i].getValue("assemblePriority");
	        }
	         // 防止从数据库查出来的数据清空，删行，可能会报不能有重复数据
	        if(null==allRows[i].getValue("assembleName")&&allRows[i].status!="fdel"){
	          toastr.warning('保存不能有空行');
	          return;
	        }
	        if(allRows[i].getValue("assembleName") == ""){
	        	toastr.warning('“业务标识+渠道类型+产品组+办事处+客户”整体不能为空');
	          return;
	        }
				}
				//先排序再去重
				var newAllRowValsArr = allRowValsArr.sort();
				for(var j = 0; j < newAllRowValsArr.length; j++){
					if(newAllRowValsArr[j] == newAllRowValsArr[j+1]){
						flag = false;
					}
				}
				if(flag){
					var data = viewModel.FloatCoeffFactorList.getSimpleData();
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
		        viewModel.floatSetItems.setSimpleData(data.content,{unSelect:true});
		      }
		    });
		    //弹出框
		    floatSetDialog = u.dialog({id:'floatSetDialog',content:"#dialog_content_set",width:"35%"});
		    var okButton = $("#dialog_content_set .u-msg-ok");
				okButton.unbind("click").click(function(){
					self.floatSetSave();
				});
				var cancelButton = $("#dialog_content_set .u-msg-cancel");
				cancelButton.unbind("click").click(function(){
					floatSetDialog.close();
				});
  		},
  		//保存因子设置
  		floatSetSave: function() {
  			var self = this;
  			var data = viewModel.floatSetItems.getSimpleData();
  			var allRowsitem = viewModel.floatSetItems.getAllRows();
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
							floatSetDialog.close();
			      }
			    });
				}else{
					toastr.warning("优先级有重复！");
				}
  		},
      //增行
       addRow: function () {
        var emptyRow = viewModel.FloatCoeffFactorList.createEmptyRow({unselect:true});
        emptyRow.setValue("assemblePriority",0);
      },
      //删行
      delList: function () {
        var rows = viewModel.FloatCoeffFactorList.getSelectedRows();
        if(rows.length < 1){
        	toastr.warning("请选择数据");
        }
        viewModel.FloatCoeffFactorList.removeRows(rows);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if(reindex){
          viewModel.FloatCoeffFactorList.pageIndex(0);
        }
        viewModel.FloatCoeffFactorList.removeAllRows();
        var queryData = {};
        queryData.size = viewModel.FloatCoeffFactorList.pageSize();
        queryData.page = viewModel.FloatCoeffFactorList.pageIndex();
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.FloatCoeffFactorList.setSimpleData(data.content,{unSelect:true});
            viewModel.FloatCoeffFactorList.totalRow(data.totalElements);
            viewModel.FloatCoeffFactorList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
//    cleanSearch: function () {
//      singledocSearch.clearSearch();
//    },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.FloatCoeffFactorList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.FloatCoeffFactorList.pageSize(size);
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
    $('#FloatCoeffFactor-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
//  var pagebcomp = $("#pagination")[0]['u.pagination'];
//  pagebcomp.update({showState:false});


		//监听复选框变化，获取因子组合名称，计算计算组合优先级
		viewModel.FloatCoeffFactorList.on("valuechange", function (option) {
			  var newRow = option.rowObj;
			  //需要展现的字段名
  			var assembleNameArr = ["业务标识","渠道类型","产品组","办事处","客户"];
  			//当前已被选中的字段名
  			var newAssembleNameArr = [];

	  		//字段名
				var fileNameArr = ["identifier","saleChannel","productGroup","agency","customer"];
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
