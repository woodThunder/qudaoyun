define(['text!./productbom.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,searcher,billfooter,proTyperef;
  baseData = {
    baseurl : '/base/product-boms',
    baseurlSub:'/sub-boms',
    ProductBomCombineList: new u.DataTable(ProductBomCombine),
    ProductBomCombineItems: new u.DataTable(ProductBomCombineItem),
    // DemoItemRefList: new u.DataTable(DemoItemRef),
    billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT,
    enableRadioSrc: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    enableCheckSrc: [{value:"1",name:"是"}],
    editStatus:"",
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,
    //返回列表页
    retListPanel: common.bill.retListPanel,
    enableFmt: ko.pureComputed(function() {
      var statusCode = viewModel.ProductBomCombineList.ref("statusCode")();
      return statusCode == 1 ? "启用" : "停用";
    }),

    enableStatusRender:function(obj) { 
            var showValue = obj.value == "1" ? "启用" : "停用"; 
            obj.element.innerHTML = showValue; 
        }, 
     //判断表格里的状态
     //审核状态
    stateGrid: function (obj) {
      var stateValue = viewModel.ProductBomCombineList.getRow(obj.rowIndex).getValue('statusCode');
      var stateName;
      stateValue ==1?stateName="启用": stateName="停用";
      obj.element.innerHTML = stateName;
    }

  };
  rendertype = {
    operation: common.rendertype.operation,
    detailRender: common.rendertype.detailRender,
    enableRender:common.rendertype.enableRender,
  };
  events = {
		//打印
	// printPage: function() {
 //    var nodeKey = "003"
 //    var curId = viewModel.ProductBomCombineList.getCurrentRow().getValue("id");
 //    var serverUrl =  '/productBom/dataForPrint';
 //    common.printTool.printCur(nodeKey,curId,serverUrl);
 //  },
	// printPageByTemplateCode: function(templateCode) {
	// 	//打印逻辑
	// 	id = viewModel.ProductBomCombineList.getValue('id');
	// 	if(id != undefined && id.trim() != null) {
	// 		//                		var tenantId = cookie.get('tenantid');//租户ID
	// 		var tenantId = "tenant"; //固定字符串
	// 		var serverUrl = appCtx + '/productBom/dataForPrint'; //取数据的url地址
	// 		var params = { //去后台打印数据的参数
	// 			'id': id
	// 		};
	// 		params = encodeURIComponent(JSON.stringify(params)); //URL参数部分有特殊字符，必须编码(不同的tomcat对特殊字符的处理不一样)
	// 		var url = '/print_service/print/preview?tenantId=' +
	// 			tenantId + '&printcode=' + templateCode + '&serverUrl=' + serverUrl +
	// 			'&params=' + params + '&sendType=post';
	// 		window.open(url);
	// 	} else {
	// 		u.messageDialog({
	// 			msg: '请选择一条数据进行打印',
	// 			title: '提示',
	// 			btnText: '确定'
	// 		});
	// 	}
	// },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function (reindex) {
      if(viewModel.productInfoCodeCount>499){
        var params = searcher.viewModel.params;
        params.setValue("productInfo--code", '');
        toastr.warning("父项产品编码最多输入500个，请重新输入");
        return false
     }
     if(viewModel.subBomsProductInfoCodeCount>499){
        var params = searcher.viewModel.params;
        params.setValue("subBoms--productInfo--code", '');
        toastr.warning("子项产品编码最多输入500个，请重新输入");
        return false
      }
      if(reindex){
        viewModel.ProductBomCombineList.pageIndex(0);
      }
      viewModel.ProductBomCombineList.removeAllRows();
      var queryData = searcher.getDataWithOpr();
      var pageSize = viewModel.ProductBomCombineList.pageSize();
      var pageNumber = viewModel.ProductBomCombineList.pageIndex();
      queryData.page = pageNumber;
      queryData.size = pageSize;
      var oldproductInfoCode = queryData["search_LIKE_productInfo.code"];
        if(oldproductInfoCode){
          queryData["search_IN_productInfo.code"] =oldproductInfoCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_productInfo.code"];
      var oldsubBomsproductInfoCode = queryData["search_LIKE_subBoms.productInfo.code"];
        if(oldsubBomsproductInfoCode){
          queryData["search_IN_subBoms.productInfo.code"] =oldsubBomsproductInfoCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_subBoms.productInfo.code"];
      $._ajax({
        type:"get",
        url:appCtx + viewModel.baseurl,
        dataType:"json",
        data:queryData,
        success:function(data){
          viewModel.ProductBomCombineList.setSimpleData(data.content,{unSelect:true});
          viewModel.ProductBomCombineList.totalRow(data.totalElements);
          viewModel.ProductBomCombineList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function () {
      searcher.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function (index) {
      viewModel.ProductBomCombineList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function (size) {
      viewModel.ProductBomCombineList.pageSize(size);
      viewModel.search(true);
    },
    //删除和批量删除
    del: function (data) {
        if (typeof(data) == 'number') {
          viewModel.ProductBomCombineList.setRowSelect(data);
        }
        var ids = [];
        var status=[];
        var statustip="";
        var rows = viewModel.ProductBomCombineList.getSelectedRows();
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
            var statusCode=rows[i].getValue("statusCode");
          	if(statusCode==1 || statusCode=="1"){
          		status.push(rows[i].getValue("productInfoCode"));
          	}
          }
          if(status.length >0){
	    			function statusArr(){
	    				for (i=0;i<status.length;i++){
	          			 	  statustip+=status[i] +"，";
	          		}
	    				return statustip.substring(0,statustip.length-1)
	    			}
	          		toastr.warning("数据   " + statusArr() +" 已启用不可删除");
	          		return false
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
                  viewModel.ProductBomCombineList.removeRows(rows);
                  toastr.success("删除成功");
                }
              });
            }
          });
        }else{
          toastr.warning("请先选择要删除的数据");
        }
      },
      spaceCount:function(str){
          var word = " "; // 要计算的字符
          var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
          var result = str.match(regex);
          return !result ? 0 : result.length;
      },
    //进入新增单据页
    showAddBillPanel: function() {
      viewModel.editStatus =  1;
      $("#productInfoHead").show();
      $("#code-refer").show();
      $("#code-text").hide();
      var curRow = viewModel.ProductBomCombineList.createEmptyRow();
      viewModel.ProductBomCombineList.setRowFocus(curRow);
      curRow.setValue("statusCode", "1");
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
      viewModel.ProductBomCombineItems.removeAllRows();  
    },
    //进入修改单据页
    showEditBillPanel: function(index) {
      viewModel.editStatus =  0;
      viewModel.ProductBomCombineList.setRowFocus(index);
      var id = viewModel.ProductBomCombineList.getValue("id");
      viewModel.ProductBomCombineList.originEditData = viewModel.ProductBomCombineList.getFocusRow().getSimpleData();
      viewModel.findByParentid(id);
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
      // var newrow = viewModel.ProductBomCombineItems.createEmptyRow();
      
      var bomTypeCode = viewModel.ProductBomCombineList.getRow(index).getValue("bomTypeCode");

      if (bomTypeCode==1) {
        // proTyperef = "2"
        viewModel.ProductBomCombineItems.meta.productInfoId.refparam = 
        '{"EQ_isSaleProduct":"0","EQ_isProductSuite":"1","NOTEQ_proNature":"4"}';
      }else if(bomTypeCode==2){
        // proTyperef = "1"
        viewModel.ProductBomCombineItems.meta.productInfoId.refparam = 
        '{"EQ_isProductPack":"1","NOTEQ_proNature":"4"}';
      }
      // var productInfoId =app.getComp("productInfo");
      // productInfoId.setEnable(false);
      var productInfoCode= viewModel.ProductBomCombineList.getRow(index).getValue('productInfoCode');
      // $("#productInfoId").html("<label>"+productInfoCode+"</label>");
      $("#productInfoHead").hide();
      $("#code-refer").hide();
      $("#code-text").show().html(productInfoCode);
    //   viewModel.ProductBomCombineItems.meta.productInfoId.refparam = 
    //       '{"EQ_proType":"'+proTyperef+'","NOTEQ_proNature":"4"}';
    },
    //进入复制单据页
    showCopyBillPanel: function() {
      var selectedRows = viewModel.ProductBomCombineList.getSelectedRows();
      // 只支持单一复制，批量复制需单独处理
      if(selectedRows.length != 1) {
        //TODO: tips替换
        alert("请选择一条要复制的行")
        return;
      }
      var copyRow = selectedRows[0];
      var curRow = viewModel.ProductBomCombineList.createEmptyRow();
      curRow.setSimpleData(copyRow.getSimpleData());
      viewModel.ProductBomCombineList.setRowFocus(curRow);
      var id = copyRow.getValue("id");
      //查询子表数据
      viewModel.findByParentid(id);
      //删除主表主键，编码，审计信息
      viewModel.clearBaseProp(curRow);
      //删除子表主键，子表主表关联
      var subRows = viewModel.ProductBomCombineItems.getAllRows();
      for(var i=0; i<subRows.length; i++) {
        viewModel.clearBaseProp(subRows[i]);
        subRows[i].setValue("parentid", "");
      }
      viewModel.goBillPanel();
      viewModel.billPanelStatus = CONST.BILLPANELSTATUS.COPY;
    },
    //时间大小限制
      disabledBegin: function(current){
        var newBomStartTime = viewModel.ProductBomCombineList.getValue("bomStartTime");
        if(newBomStartTime){
          newBomStartTime = new Date(newBomStartTime).getTime();
          if(current) {
            current = new Date(current.format("YYYY-MM-DD")).getTime();
          }
           return current && current < newBomStartTime;
        }
      },
    //详情
    detail: function() {

      //确保grid先将行设置为focus状态
      setTimeout(function(){
        var curRow = viewModel.ProductBomCombineList.getCurrentRow();
        var id = curRow.getValue("id");
        viewModel.findByParentid(id);
        viewModel.goDetailPanel();
      }, 0);
    },
    //查询子表数据
    findByParentid: function(id) {
      $._ajax({
        url:appCtx + viewModel.baseurl + viewModel.baseurlSub,
        type: 'get',
        async: false,
        data: {bomId: id},
        success:function(data){
          viewModel.ProductBomCombineItems.setSimpleData(data);
        }
      })
    },

    // 清除基类属性
    clearBaseProp: function(row) {
      row.setValue("id", "");
      row.setValue("code", "");
      row.setValue("name", "");
      row.setValue("creator", "");
      row.setValue("creationTime", "");
      row.setValue("modifier", "");
      row.setValue("modifiedTime", "");
    },
    //新增子表项
    addItem: function() {
      viewModel.ProductBomCombineItems.createEmptyRow();
    },
    //删除子表项
    // delItems: function() {
    //   var selectedRows = viewModel.ProductBomCombineItems.getSelectedRows();
    //   if(selectedRows.length < 1){
    //       toastr.warning("请选择数据");
    //       return;
    //   }
    //   for(var i=0;i<selectedRows.length;i++) {
    //     selectedRows[i].setValue("dr", "1");
    //   }
    //   viewModel.ProductBomCombineItems.removeRows([i], {forceDel: true});
    // },
     //删除子表项
    delItems: function() {
      var selectedRows = viewModel.ProductBomCombineItems.getSelectedRows();
      if(selectedRows.length < 1){
          toastr.warning("请选择数据");
          return;
      }
      var allData = viewModel.ProductBomCombineItems.getSimpleData();

      if (viewModel.editStatus==0) {
        if (selectedRows.length<allData.length) {
          viewModel.ProductBomCombineItems.removeRows(selectedRows);
        }else{
          toastr.warning("子表中数据不能全部删除");
            return;
        } 
      }else{
        viewModel.ProductBomCombineItems.removeRows(selectedRows);
      }
      
    },
    //保存单据
    saveBill: function() {
      //保存前校验
      var validate = $(".ui-bill-panel")[0];
      var result = app.compsValidateMultiParam({element:validate,showMsg:true});
      if(!result.passed) {
        return;
      }
      var productCombineData = viewModel.ProductBomCombineList.getCurrentRow().getSimpleData();
      var ProductBomCombineItemsData = viewModel.ProductBomCombineItems.getSimpleData();
      productCombineData.subBoms = ProductBomCombineItemsData;
      var _ajaxType = viewModel.ProductBomCombineList.getValue("id") ? "put": "post";
      $._ajax({
        url:appCtx + viewModel.baseurl,
        type:_ajaxType,
        data:JSON.stringify(productCombineData),
        contentType : "application/json; charset=utf-8",
        success:function(data){
          viewModel.ProductBomCombineList.getFocusRow().setSimpleData(data);
          viewModel.retListPanel();
          toastr.success("保存成功");
        }
      })
    },
    //取消单据
    cancelBill: function() {
      var curRow = viewModel.ProductBomCombineList.getCurrentRow();
      // 修改，则还原
      if(curRow.getValue("id")) {

        curRow.setSimpleData(viewModel.ProductBomCombineList.originEditData)
      }
      // 新增或复制，则删除
      else {
        viewModel.ProductBomCombineList.removeRow(curRow);
        viewModel.ProductBomCombineItems.removeAllRows();
      }
      viewModel.retListPanel();
    },
    //导入
      importHandle: function() {
        var urlInfo = '/product-bom-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/product-bom-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportHandle: function() {
          var searchParams = searcher.getDataWithOpr(); //搜索查询参数
          var oldproductInfoCode = searchParams["search_LIKE_productInfo.code"];
            if(oldproductInfoCode){
              searchParams["search_IN_productInfo.code"] =oldproductInfoCode.replace(/%/g,'');
            }
            delete searchParams["search_LIKE_productInfo.code"];
          var oldsubBomsproductInfoCode = searchParams["search_LIKE_subBoms.productInfo.code"];
            if(oldsubBomsproductInfoCode){
              searchParams["search_IN_subBoms.productInfo.code"] =oldsubBomsproductInfoCode.replace(/%/g,'');
            }
            delete searchParams["search_LIKE_subBoms.productInfo.code"];
          var templateUrl = '/product-bom-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/product-bom-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.ProductBomCombineList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
     //启用
      enable: function() {
        var selectedRows = viewModel.ProductBomCombineList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("statusCode")==1 || selectedRows[i].getValue("statusCode")=="1"){
		          	status.push(selectedRows[i].getValue("productInfoCode"));
		          }
		        }
        		if(status.length >0){
        			function statusArr(){
        				for (i=0;i<status.length;i++){
	          			 	  statustip+=status[i] +"，";
	          		}
        				return statustip.substring(0,statustip.length-1)
        			}
	          		toastr.warning("数据   " + statusArr() +" 不可重复启用");
	          		return false
          	}
		        ids = ids.join(",");
		        $._ajax({
		          type: "post",
		          url: appCtx + viewModel.baseurl + "/batch-enable",
		          data: {ids: ids},
		          success:function(res){
		            for(var i=0;i<selectedRows.length;i++) {
		              selectedRows[i].setValue("statusCode", "1");
		            }
        	      toastr.success("启用成功");
		          }
		        })
		    }
        else{
        	toastr.warning("请先选择需要启用数据");
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.ProductBomCombineList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
		        for(var i=0;i<selectedRows.length;i++) {
		          ids.push(selectedRows[i].getValue("id"));
		          if (selectedRows[i].getValue("statusCode")==0 ||                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        selectedRows[i].getValue("statusCode")=="0"){
		          	status.push(selectedRows[i].getValue("productInfoCode"));
		          }
		        }
		        if(status.length >0){
        			function statusArr(){
        				for (i=0;i<status.length;i++){
	          			 	  statustip+=status[i] +"，";
	          		}
        				return statustip.substring(0,statustip.length-1)
        			}
	          		toastr.warning("数据   " + statusArr() +" 不可重复停用");
	          		return false
          	}
		        ids = ids.join(",");
		        $._ajax({
		          type: "post",
		          url: appCtx + viewModel.baseurl + "/batch-disable",
		          data: {ids: ids},
		          success:function(res){
		            for(var i=0;i<selectedRows.length;i++) {
		              selectedRows[i].setValue("statusCode", "0");
		            }
        	      toastr.success("停用成功");
		          }
		        })
		    }
        else{
        	toastr.warning("请先选择需要停用数据")
        }
      },
    //参照选择批量新增子表
    showAddItemsRef: function() {
      // viewModel.clearItemsRef();
      // $("#addItemsRef .refer").trigger("click");
      // refparamChange();
      viewModel.ProductBomCombineItems.createEmptyRow();

    },
    //清空已选产品组合参照
    // clearItemsRef: function() {
    //   viewModel.DemoItemRefList.setValue("productref", "");
    //   var refer = $("#refContainerproductref").data("uui.refer");
    //   refer.uncheckAll();
    //   refer.setValue([]);
    // },
    // 自定义页签参照
    showTabRef: function() {
      $("#productTabRef .refer").trigger("click");
    },
  }
  // function refparamChange(){
  //     $("#grid_ProductBomItem_placeholder_divs").attr("data-refparam",'{"EQ_proType":"proTyperef","NOTEQ_proNature":"4"}');
  //   }
  viewModel = u.extend({},baseData,events,events,common.rendertype,rendertype);

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
    window.app = app;
    // 查询组件初始化
    searcher = new searchbox(
      $("#ProductBomCombine-searchcontent")[0],
      [
     
        // {
        //   type:"refer",
        //   key:"productInfo--id",
        //   label:"父项产品编码",
        //   refinfo:"productInfo",
        //   isReturnCode:"true"
        // },
        {
          type:"text",
          key:"productInfo--code",
          label:"父项产品编码",
        },
        {
          type:"text",
          key:"productInfo--description",
          label:"父项产品描述",
        },
        {
          type:"radio",
          key:"isValid",
          label:"是否最新版本",
          defaultvalue:"1",
          dataSource:[
          {value:'1',name:'是'},
          {value:'0',name:'否'}
          ]
        },
        {
          type:"text",
          key:"subBoms--productInfo--code",
          label:"子项产品编码",
        },
        // {
        //   type:"refer",
        //   key:"subBoms--productInfo--id",
        //   label:"子项产品编码",
        //   refinfo:"productInfo",
        //   isReturnCode:"true",
        //   clientParam:{
        //      "EQ_isSaleProduct":"bom"
        //       }
        // },
        {
          type:"combo",
          key:"bomType",
          label:"BOM层级类型",
          // multi:true,
          url:appCtx+"/cust-doc-defs/cust_doc_code?cust_doc_code=QY044",
          namefield:"name",
          valuefield:"code"
        },
        {
          type:"daterange",
          key:"bomStartTime",
          //小于结束日期+1
          label:"修改日期"
        },
        {
          type:"radio",
          key:"isEnable",
          label:"启用状态",
          defaultvalue:"1",
          dataSource:[
          {value:'',name:'全部'},
          {value:'1',name:'启用'},
          {value:'0',name:'停用'}
          ]
        }
        
      ]);
      // billfooter = new Billfooter(
      //   $(".ui-bill-footer").get(),
      //   viewModel,
      //   "ProductBomCombineList"
      // );
    // 列表查询数据(无查询条件)
    viewModel.search();
    // // 子表参照聚焦行，用于绑定子表参照组件
    // var refRow = viewModel.DemoItemRefList.createEmptyRow();
    // viewModel.DemoItemRefList.setRowFocus(refRow);
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#ProductBomCombine-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
  


    viewModel.ProductBomCombineList.on("productInfoId.valuechange", function(obj) {
        viewModel.ProductBomCombineItems.removeAllRows();
        if (!$("#refContainerproductInfoHead").data("uui.refer").values) {
          return 
        }
        var data = $("#refContainerproductInfoHead").data("uui.refer").values[0];
          // proTyperef = (data.proTypeCode)*1 - 1;

          // viewModel.ProductBomCombineItems.meta.productInfoId.refparam = 
          // '{"EQ_proType":"'+proTyperef+'","NOTEQ_proNature":"4"}';
          var newrow = viewModel.ProductBomCombineList.getCurrentRow();
           newrow.setValue("productInfoDescription", data.description=="null"?"":data.description);
            newrow.setValue("baseUnit", data.baseUnit=="null"?"":data.baseUnit);
            // newrow.setValue("simpleName", data.simpleName=="null"?"":data.simpleName);
            // newrow.setValue("countryName",  data.countryName=="null"?"":data.countryName);
            // newrow.setValue("proTypeCode", data.proTypeCode=="2"?"套件-包件关系":"销售产品-套件关系");
             var bomTypeName = "";
             var bomTypeCode = "";

             if (data.isSaleProduct =="1"&&data.isProductSuite =="0"&&data.isProductPack =="0") {
                bomTypeName="销售产品-套件关系";
                bomTypeCode="1";
                viewModel.ProductBomCombineItems.meta.productInfoId.refparam = 
                '{"EQ_isSaleProduct":"0","EQ_isProductSuite":"1","NOTEQ_proNature":"4"}';
             }else {
                bomTypeName="套件-包件关系";
                bomTypeCode="2";
                viewModel.ProductBomCombineItems.meta.productInfoId.refparam = 
                '{"EQ_isProductPack":"1","NOTEQ_proNature":"4"}';
             }


             // newrow.setValue("bomTypeName", data.proTypeCode=="2"?"套件-包件关系":"销售产品-套件关系");
             newrow.setValue("bomTypeName",bomTypeName);
            
            // newrow.setValue("bomTypeCode", data.proTypeCode=="2"?1:2);
            newrow.setValue("bomTypeCode", bomTypeCode);
            
        });

    // var temp = $("#grid_ProductBomItem_placeholder_div").children(":first").find("input");
    // temp.on("valuechange",function(){
    //   refparamChange();
    // });
  
    //查询编码
    searcher.viewModel.params.on("productInfo--code.valuechange", function(obj) {
          viewModel.productInfoCodeCount=viewModel.spaceCount(obj.newValue);
     });
    searcher.viewModel.params.on("subBoms--productInfo--code.valuechange", function(obj) {
          viewModel.subBomsProductInfoCodeCount=viewModel.spaceCount(obj.newValue);
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
