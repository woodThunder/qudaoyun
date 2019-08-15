define(['text!./shiptoparty.html','ocm_common','searchbox','./meta.js','ocm_global'], function (tpl,common,searchbox) {
  'use strict'
  var app,baseData,events,rendertype,viewModel,singledocSearch;
  
  baseData = {
    baseurl : '/ship-to-partys', 
    childListUrl: '/shop-deco-area',
    ContactListUrl: '/shiptoparty-contacts',
    MarketAreatUrl: '/account-mg-orgs',
    ShiptopartyList: new u.DataTable(Shiptopartymeta),
    ContactList: new u.DataTable(Contactmeta),
    MarketAreaList: new u.DataTable(MarketAreameta),
    stateSrc: [{value:0,name:"否"},{value:1,name:"是"}],
    statusSource: [{value:"1",name:"启用"},{value:"0",name:"停用"}],
    flag:0,
    currentFlag:1,
    currentTab:0,
    currentList:"",
    currentTip:"",
    whetherSrc: CONST.WHETHER,
    organizationdata:[],
    radiodata: [{
        "value": "1",
        "name": "是"
    }, {
        "value": "0",
        "name": "否"
    }],
    enableFmt: ko.pureComputed(function() {
      var status = viewModel.ShiptopartyList.ref("status")();
      return status == 1 ? "启用" : "停用";
    }),


    flag:0,
    //跳转单据页
    goBillPanel: common.bill.goBillPanel,
    //跳转单据详情页
    goDetailPanel: common.bill.goDetailPanel,

    saleChannelDataSource:ko.observableArray([]),
  
    //返回列表页
    retListPanel: common.bill.retListPanel
  };
  rendertype = {
    //跳转详情页
    detailRender: common.rendertype.detailRender,
    operation:function(obj){
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">'+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-edit font-c-c" '+
      editfun +
      ' title="修改"></a>'+
      '</span>    '+
      '<span class="ui-handle ui-tab-icon-b">'+
      '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
      delfun +
      ' title="删除"></a>'+
      '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    },
    stateGrid: function (obj) {
      var stateValue = viewModel.ShiptopartyList.getRow(obj.rowIndex).getValue('status');
      var stateName;
      stateValue ==1?stateName="启用": stateName="停用";
      obj.element.innerHTML = stateName;
    }
   
  };
  events = {
        tabContact:function (e){
//    if(current>0){
        e=window.event || e;
        if (viewModel.flag !=1){
          toastr.warning("请先填写基本信息");
          event.preventDefault();
          event.beforeEdit();
          var data = $("#refContainercode-input").data("uui.refer").values[0];
          $._ajax({
            url:appCtx + shiptoparty-contacts/findByCustomerAddressId,
            type:"get",
            data:JSON.stringify(data),
            contentType : "application/json; charset=utf-8",
            dataType:"json",
            success:function(data){
              viewModel.ContactList.removeAllRows();
              viewModel.ContactList.addSimpleData(data,"new",{"unSelect":true});
              viewModel.ContactList.addSimpleData(nochangeData,"new",{"unSelect":true});
            }
          })
            return false;
          }
//    }
    },
      
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，-2为复制,大于等于0为编辑)
      beforeEdit: function(index,rowId) {
        var self = this;
        viewModel.index = index;
        viewModel.rowId = rowId;
        viewModel.goBillPanel();
        viewModel.ContactList.clear();
        viewModel.MarketAreaList.clear();

         //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.currentFlag=1;
        viewModel.currentTab=0;

        if (index >= 0) {
          //修改操作
          var currentDataId = viewModel.ShiptopartyList.getRowByRowId(rowId).getValue('id');
          viewModel.ShiptopartyList.originEditData = viewModel.ShiptopartyList.getRowByRowId(rowId).getSimpleData();
          var CustomerAddressId = viewModel.ShiptopartyList.getRowByRowId(rowId).getValue('customerAddresId');
          viewModel.flag=1;
          var customerAddresCode= viewModel.ShiptopartyList.getRowByRowId(rowId).getValue('customerAddresCode');
          // $("#customerAddres").html("<label>"+customerAddresCode+"</label>");

          $("#code-input").hide();
          $("#code-refer").hide();
          $("#code-text").show().html(customerAddresCode);

          var countryCode = viewModel.ShiptopartyList.getRowByRowId(rowId).getValue("countryCode");
          var OneCategoryValue;
         
          if (countryCode=="CHN" || countryCode=="CN") {
            OneCategoryValue={"EQ_code":"Z410"}
          } else {
            OneCategoryValue={"EQ_code":"Z420"}
          }
          $("#OneCategory").attr("data-refparam",JSON.stringify(OneCategoryValue));
        

          //根据id查联系人表
          $._ajax({
            url:appCtx + viewModel.ContactListUrl + '/findByCustomerAddressId',
            type:'get',
            data:{
              CustomerAddressId:CustomerAddressId
            },
            contentType: "application/json; charset=utf-8",
            success:function(data){
              viewModel.ContactList.setSimpleData(data,{unSelect:true});
            }
          });
          
          //根据id查市场
          $._ajax({
            url:appCtx + viewModel.MarketAreatUrl + '/findByShipToPartyId',
            type:'get',
            data:{
              shipToPartyId:currentDataId
            },
            contentType: "application/json; charset=utf-8",
            success:function(data){
              viewModel.MarketAreaList.setSimpleData(data,{unSelect:true});
              viewModel.organizationdata = viewModel.MarketAreaList.getSimpleData();
            }
          });
//       
          
        }else if( index === -2){
          //复制操作
          var rowIndexArr = viewModel.ShiptopartyList.getSelectedIndices();
          var focusRow = viewModel.ShiptopartyList.getFocusRow();
          var currentRow = viewModel.ShiptopartyList.getCurrentRow();
          if( rowIndexArr.length > 1 || !currentRow ){
            u.confirmDialog({
                msg: "请选择一条数据？",
                title: "复制",
                onOk: function () {
                    //
                },
                onCancel: function () {
                    //
                }
            });
              viewModel.retListPanel();
          }else {
            var copyRow = focusRow ? focusRow : currentRow;
            var curRow = viewModel.ShiptopartyList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            viewModel.ShiptopartyList.setRowFocus(curRow);
            var currentDataId = copyRow.getValue('id');

            
            //根据id查子表
            
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
            //删除子表主键，子表主表关联
            // var subRows = viewModel.ShiptopartyList.getAllRows();
            // for(var i=0; i<subRows.length; i++) {
            //   viewModel.clearBaseProp(subRows[i]);
            //   subRows[i].setValue("parentid", "");
            // }
          }
        }else {
          //添加操作
          viewModel.flag=0;
          $("#code-input").show();
          $("#code-refer").show();
          $("#code-text").hide();
          var currentRow = viewModel.ShiptopartyList.createEmptyRow();
          viewModel.ShiptopartyList.setRowFocus(currentRow);
          currentRow.setValue('status','1');
          var isData=currentRow.getSimpleData();
          for(var k in currentRow){
                if (k.indexOf("is") > -1 && currentRow[k] == null){
                  currentRow[k]=0;
                }
           }
        }
      },
      // 清除基类属性
      clearBaseProp: function(curRow) {
        curRow.setValue("id", null);
        curRow.setValue("code", "");
        curRow.setValue("creator", "");
        curRow.setValue("creationTime", "");
        curRow.setValue("modifier", "");
        curRow.setValue("modifiedTime", "");
      },
      //点击保存按钮
      saveHandle: function () {
        var infoBase=$("#tab-panel-1")[0]; 
        var basePass =viewModel.validate(infoBase);
        if(basePass.passed){
          var _index = viewModel.index;
          viewModel.edit(_index);
        }

      },
      validate:function (element){
        var result = app.compsValidateMultiParam({element:element,showMsg:true});
        return result;
     },
      //启用
      enable: function() {
        var selectedRows = viewModel.ShiptopartyList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
            for(var i=0;i<selectedRows.length;i++) {
              ids.push(selectedRows[i].getValue("id"));
              if (selectedRows[i].getValue("status")==1 || selectedRows[i].getValue("status")=="1"){
		          	status.push(selectedRows[i].getValue("code"));
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
                  selectedRows[i].setValue("status", "1");
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
        var selectedRows = viewModel.ShiptopartyList.getSelectedRows();
        var ids = [];
        var status=[];
        var statustip="";
        if (selectedRows&&selectedRows.length>0){
            for(var i=0;i<selectedRows.length;i++) {
              ids.push(selectedRows[i].getValue("id"));
              if (selectedRows[i].getValue("status")==0 || selectedRows[i].getValue("status")=="0"){
		          	status.push(selectedRows[i].getValue("code"));
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
                  selectedRows[i].setValue("status", "0");
                }
                toastr.success("停用成功");
              }
            })
        }
        else{
          toastr.warning("请先选择需要停用数据")
        }
      },
      //将操作后的数据进行保存
      edit: function(index) {
        var self = this;
        var currentRow,type = "post";
        var postdata = viewModel.ShiptopartyList.getFocusRow().getSimpleData();
        // postdata.floatCoefficientDefs = dataListChild;
        if(index>=0){
          type = "put";
        }
        //更改后台数据
        $._ajax({
          url:appCtx + viewModel.baseurl ,
          type:type,
          data:JSON.stringify(postdata),
          contentType : "application/json; charset=utf-8",
          success:function(data){
            //如果index大于等于0说明是修改
            if (index >= 0) {
              //获取需要修改的行
              currentRow = viewModel.ShiptopartyList.getRowByRowId(viewModel.rowId);
              //将用户填写的数据更新到ShiptopartyList上
            } else {
              //添加数据
              currentRow = viewModel.ShiptopartyList.getFocusRow();
            }
            currentRow.setSimpleData(data);
            viewModel.flag=1;
            $("#productBase").hide();
            $("#productBase_show").show();
            // if(data.isChannelShop==1){
            //   $(".add-show")[0].show();
            //   $(".add-show-content")[0].show();
            // }
            // if(data.isOrganization==1){
            //   $(".add-show")[1].show();
            //   $(".add-show-content")[1].show();
            toastr.success("保存成功");
            }
//          viewModel.retListPanel();
          // }
        })
      },
    backPanle:function(){
        common.dialog.confirmDialog({
            msg1: '确认返回列表页？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              viewModel.cancelHandle();
              $("#productBase").show();
              $("#productBase_show").hide();
            }
          });
      },

    tabShop:function (e){
//    if(current>0){
        e=window.event || e;
        if (viewModel.flag !=1){
          toastr.warning("请先填写基本信息");
          event.preventDefault();
          // event.beforeEdit();
          return false;
        }
//    }
    },

    //市场区域保存
    saveMarket:function(){
        var curRow = viewModel.ShiptopartyList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.MarketAreaList.getSimpleData();
        var changeData = [];
        var nochangeData = [];
        if(postdata&&postdata.length>0){
          for(var i = 0;i< postdata.length;i++){
            if(postdata[i].persistStatus!="nrm"){
              postdata[i].statusCode=1;
              postdata[i].shipToPartyId=cId;
              changeData.push(postdata[i]);
            }else{
              nochangeData.push(postdata[i]);
            }
          }
        }
        var infoBase=$("#tab-panel-3")[0]; 
        var basePass =viewModel.validate(infoBase);
        if(basePass.passed){
          $._ajax({
          url:appCtx + viewModel.MarketAreatUrl + "/batch-save",
          type:"post",
          data:JSON.stringify(changeData),
          contentType : "application/json; charset=utf-8",
          dataType:"json",
          complete:function(){
            u.hideLoader();
//          viewModel.showDefaultPage();
          },
          success:function(data){
            viewModel.MarketAreaList.removeAllRows();
            viewModel.MarketAreaList.addSimpleData(data,"nrm",{"unSelect":true});
            viewModel.MarketAreaList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
            viewModel.organizationdata=viewModel.MarketAreaList.getSimpleData();
            toastr.success("保存成功");
            viewModel.currentFlag=1;
          }
        })
        }
        
      },
 
      //主表删除和批量删除
      del: function (data,rowId) {
        if (typeof(data) == 'number') {
          viewModel.ShiptopartyList.setRowSelect(viewModel.ShiptopartyList.getRowByRowId(rowId));
        }
        var ids = [];
        var rows = viewModel.ShiptopartyList.getSelectedRows();
        var status=[];
        var statustip="";
        if(rows&&rows.length>0){
          for(var i = 0;i<rows.length;i++){
            ids.push(rows[i].getValue("id"));
            ids.push(rows[i].getValue("id"));
            var statusCode=rows[i].getValue("status");
          	if(statusCode==1 || statusCode=="1"){
          		status.push(rows[i].getValue("code"));
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
                  viewModel.ShiptopartyList.removeRows(rows);
                  toastr.success("删除成功");
                }
              });
            }
          });
        }else{
          toastr.warning("请先选择要删除的数据");
        }
      },
      //子表 删除和批量删除
      delChild: function (dataTable) {
          var rows = viewModel[dataTable].getSelectedRows();
          viewModel[dataTable].removeRows(rows);
      },
      //子表增行
      addRow: function (dataTable) {
          viewModel[dataTable].createEmptyRow();
      },
      //查看详情
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function(){
          var curRow = viewModel.ShiptopartyList.getCurrentRow();
          var id = curRow.getValue("id");
          var CustomerAddressId = curRow.getValue("customerAddresId");
          viewModel.findByParentid(id);
          viewModel.findByMarketid(id);
          viewModel.goDetailPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        var curRow = viewModel.ShiptopartyList.getCurrentRow();
        var CustomerAddressId = curRow.getValue("customerAddresId");
        $._ajax({
          url:appCtx + viewModel.ContactListUrl + '/findByCustomerAddressId',
          type: 'get',
          async: false,
          data: {CustomerAddressId: CustomerAddressId},
          success:function(data){
            viewModel.ContactList.setSimpleData(data,{unSelect:true});
          }
        })
      },
      findByMarketid: function(id) {
        $._ajax({
          url:appCtx + viewModel.MarketAreatUrl + '/findByShipToPartyId',
          type: 'get',
          async: false,
          data: {shipToPartyId: id},
          success:function(data){
            viewModel.MarketAreaList.setSimpleData(data,{unSelect:true});
          }
        })
      },
      //点击取消 单据页
      cancelHandle: function () {
  			if(viewModel.currentTab==0){
             //	var row = viewModel.accountList.getFocusRow();
						  var curRow = viewModel.ShiptopartyList.getCurrentRow();
			        // 修改，则还原
			        if(curRow.getValue("id")) {
				        	if(curRow.status != "nrm"){
				            curRow.setSimpleData(viewModel.ShiptopartyList.originEditData)
				        	}
			        }
			        // 新增或复制，则删除
			        else {
			          viewModel.ShiptopartyList.removeRow(curRow);
			        }
	      	}
          viewModel.retListPanel();
      },
      organization:function(){
       viewModel.MarketAreaList.removeAllRows();
       viewModel.MarketAreaList.setSimpleData(viewModel.organizationdata,{"unSelect":true});
       viewModel.currentFlag=1;
    },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
      	if(viewModel.codeCount>499){
			      var params = singledocSearch.viewModel.params;
			      params.setValue("code", '');
      	    toastr.warning("编码最多输入500个，请重新输入");
      	    return false
  	    }
        if(reindex){
          viewModel.ShiptopartyList.pageIndex(0);
        }
        viewModel.ShiptopartyList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.ShiptopartyList.pageSize();
        queryData.page = viewModel.ShiptopartyList.pageIndex();
        var oldCode = queryData["search_LIKE_code"];
        if(oldCode){
          queryData["search_IN_code"] =oldCode.replace(/%/g,'');
        }
        delete queryData["search_LIKE_code"];
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurl,
          dataType:"json",
          data:queryData,
          success:function(data){
            viewModel.ShiptopartyList.setSimpleData(data.content,{unSelect:true});
            viewModel.ShiptopartyList.totalRow(data.totalElements);
            viewModel.ShiptopartyList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.ShiptopartyList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.ShiptopartyList.pageSize(size);
        viewModel.search(true);
      },
     

      //导入
      importHandle: function() {
        var urlInfo = '/ship-to-party-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/ship-to-party-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportHandle: function() {
          var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          var oldCode = searchParams["search_LIKE_code"];
          if(oldCode){
            searchParams["search_IN_code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_code"];
          var templateUrl = '/ship-to-party-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/ship-to-party-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.ShiptopartyList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //导入
      importaccountMgOrg: function() {
        var urlInfo = '/account-mg-org-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/account-mg-org-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
      //导出
      exportaccountMgOrg: function() {
         var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
          //搜索参数加customer.
          for (var p in searchParams){
            searchParams[p.replace("LIKE_","LIKE_shipToParty.").replace("EQ_","EQ_shipToParty.")]=searchParams[p];
            delete searchParams[p];
          }
          searchParams["search_EQ_shipToParty.dr"] = "0";
          var oldCode = searchParams["search_LIKE_shipToParty.code"];
          if(oldCode){
            searchParams["search_IN_shipToParty.code"] =oldCode.replace(/%/g,'');
          }
          delete searchParams["search_LIKE_shipToParty.code"];
          var templateUrl = '/account-mg-org-excel/downloadExcelTemplate'; //导出模板地址参数
          var excelDataUrl =  '/account-mg-org-excel/excelDataExport'; //导出数据地址参数
          var listData = viewModel.ShiptopartyList; //需要导出表格的dataTable
          var ele = $('#exportFiel')[0]; //挂载元素
          common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //停用
      enabledHandle: function () {
        var selectRowsArr = viewModel.ShiptopartyList.getSelectedRows();
        var ids = [];
        var flag = true;
        if( selectRowsArr.length > 0) {
          for( var i=0; i < selectRowsArr.length; i++ ){
            ids.push(selectRowsArr[i].getValue('id'));
          }
          for( var i=0; i < selectRowsArr.length; i++ ){
              var isEnable = selectRowsArr[i].getValue('isEnable');
              if( isEnable == "0"){
                flag = false;
              }
          }
          if(flag){
            for( var i=0; i < selectRowsArr.length; i++ ){
              selectRowsArr[i].setValue("isEnable", "0");
            }
          }else{
              u.confirmDialog({
                  msg: "请选择已启用的数据",
                  title: "取消停用",
                  onOk: function () {
                      //
                  },
                  onCancel: function () {
                      //
                  }
              });
            }

        }else{
          u.confirmDialog({
              msg: "请选择数据",
              title: "请选择",
              onOk: function () {
                  //
              },
              onCancel: function () {
                  //
              }
          });
        }
      }

  }
   viewModel = u.extend({},baseData,events,common.rendertype,rendertype);


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
    // 查询组件初始化
    singledocSearch = new searchbox(
      $("#buoyancyfactorlist-searchcontent")[0],
      [
    //     {
    //       type:"refer",
    //       key:"customerAddres--id",
    //       label:"送达方编码",
    //       refinfo:"customeraddress",
    //       refName:"送达方编码",
    //       isReturnCode:true
    // //       clientParam:{
    //     //  "EQ_isLogistrics":"1"
    //     // }

    //     },
        {
          type:"text",
          key:"code",
          label:"送达方编码",
        },
        {
          type:"text",
          key:"customerAddres--name",
          label:"送达方名称",
        },
        {
          type:"text",
          key:"customerAddres--simpleName",
          label:"送达方简称",
        },{
          type:"refer",
          key:"customerTwoCategory--id",
          label:"客户二级分类",
          refinfo:"custdocdef",
          refName:"客户二级分类",
          refCode:"QY024"
      },
      {
            type:"radio",
            key:"isEnable",
            label:"启用状态",
            defaultvalue:"1",
            dataSource:[
            {value:CONST.DEFAULTOPTION,name:'全部'},
            {value:'1',name:'启用'},
            {value:'0',name:'停用'}
            ]
         },
    ]);
    // 列表查询数据(无查询条件)
    viewModel.search();
    //处理由客户收货地址跳转过来的逻辑
    // debugger
      // var paramHref = window.location.href;
      // var paramobj = common.getParameter(paramHref);
      // if(paramobj.isShipToParty == 1){
      //   viewModel.beforeEdit(-1);
      // } else {
      //   var currentDataId = paramobj.cusId;
      //   viewModel.beforeEdit(currentDataId,1);
        
      // }
      
  }

  function afterRender(){
    //绑定输入框enter事件
    $('#buoyancyfactorlist-searchcontent input').off("keydown").on("keydown",function(e){
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });
    //查询编码
		singledocSearch.viewModel.params.on("code.valuechange", function(obj) {
	    	  var code=obj.newValue;
					var word = " "; // 要计算的字符
					var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
					var result = code.match(regex);
					viewModel.codeCount = !result ? 0 : result.length;
	   });
     //tab切换校验
    setTimeout(function() {
      $('.u-tabs')[0]['u.Tabs'].on('tabchange', function(obj) {
         viewModel.currentTab=obj.index;
         if(viewModel.currentTab==3){
              var curRow = viewModel.ShiptopartyList.getCurrentRow();
              var cId = curRow.getValue("id");
              // var fromAccountVlue={"EQ_shop.id":cId};
              // var toAccountVlue={"NOTEQ_shop.id":cId};
              // var fromAccount=viewModel.MarketAreaList.meta.fromAccountId;
              // var toAccount=viewModel.MarketAreaList.meta.toAccountId;
              // fromAccount["refparam"]=JSON.stringify(fromAccountVlue);
              // toAccount["refparam"]=JSON.stringify(toAccountVlue);
         }
      });
      $('.u-tabs')[0]['u.Tabs'].on('beforeTabChange', function(obj) {
				  if(obj.index != 0){
				  	 var persistStatus =viewModel.ShiptopartyList.getCurrentRow().status;
				  	 if(viewModel.flag ==0 || persistStatus =="upd"){
				  	 		toastr.warning("请先保存送达方基本信息");
					      return false;
				  	 }
				  }
          switch(viewModel.currentTab){
              // case 1:
              //     viewModel.currentList=viewModel.ContactList;
              //     viewModel.currentTip="联系人";
              //     break;
              // case 2:
              //     viewModel.currentList=viewModel.MarketAreaList;
              //     viewModel.currentTip="市场区域";
              //     break;
              // case 3:
              //     viewModel.currentList=viewModel.ShopDecoAreaList;
              //     viewModel.currentTip="装修区域";
              //     break;
              
              default:
                  viewModel.currentList=viewModel.MarketAreaList;
                  viewModel.currentTip="送达方所属组织";
           }
            //判断有无修改
            var postdata = viewModel.currentList.getSimpleData();
            var changeData = [];
            if(postdata&&postdata.length>0){
              for(var i = 0;i< postdata.length;i++){
                if(postdata[i].persistStatus!="nrm"){
                  changeData.push(postdata[i]);
                }
              }
              if(changeData.length>0){
                   viewModel.currentFlag=0;
              }
              
            }
            if(viewModel.currentFlag==0){
               toastr.warning("请先保存"+ viewModel.currentTip +"信息");
               return false;
            }
        return true
      });
    },100);   

    viewModel.ShiptopartyList.on("customerAddresId.valuechange", function(obj) {

          if (!obj.newValue) {
            var newrow = viewModel.ShiptopartyList.getCurrentRow();
            newrow.setValue("customerAddresName", "");
            newrow.setValue("customerAddresCode", "");
            newrow.setValue("simpleName", "");
            newrow.setValue("countryName",  "");
            newrow.setValue("provinceName",  "");
            newrow.setValue("cityName",  "");
            newrow.setValue("countyName",  "");
            newrow.setValue("townName",  "");
            newrow.setValue("address",  "");
            newrow.setValue("logisticPeriod", "");
            return 
          }
          if (!$("#refContainercode-input").data("uui.refer").values) {
          return 
          }
          var data = $("#refContainercode-input").data("uui.refer").values[0];
          var OneCategoryValue; 

          if (data.countryCode=="CHN" || data.countryCode=="CN") {
            OneCategoryValue={"EQ_code":"Z410"}
          } else {
            OneCategoryValue={"EQ_code":"Z420"}
          }
          $("#OneCategory").attr("data-refparam",JSON.stringify(OneCategoryValue));
          var customerOneCategoryId =app.getComp("OneCategory");
          viewModel.ShiptopartyList.setValue("customerOneCategoryId","");
          var newrow = viewModel.ShiptopartyList.getCurrentRow();
           newrow.setValue("customerAddresName", data.customerAddresName=="null"?"":data.refname);
            newrow.setValue("customerAddresCode", data.customerAddresCode=="null"?"":data.refcode);
            newrow.setValue("simpleName", data.simpleName=="null"?"":data.simpleName);
            newrow.setValue("countryName",  data.countryName=="null"?"":data.countryName);
            newrow.setValue("provinceName",  data.provinceName=="null"?"":data.provinceName);
            newrow.setValue("cityName",  data.cityName=="null"?"":data.cityName);
            newrow.setValue("countyName",  data.countyName=="null"?"":data.countyName);
            newrow.setValue("townName",  data.townName=="null"?"":data.townName);
            newrow.setValue("address",  data.Address=="null"?"":data.address);
            newrow.setValue("logisticPeriod",  data.logisticPeriod=="null"?"":data.logisticPeriod);

            var CustomerAddressId = data.id;
            $._ajax({

              type:"get",
              url:appCtx+"/shiptoparty-contacts/findByCustomerAddressId",
              data:{
              CustomerAddressId:CustomerAddressId
            },
              success:function(data){
                viewModel.ContactList.removeAllRows();
                for (var i = 0; i <= data.length - 1; i++) {
                    var newrow = viewModel.ContactList.createEmptyRow();
                    newrow.setValue("name", data[i].name);
                    newrow.setValue("phone", data[i].phone);
                    newrow.setValue("tel", data[i].tel);
                }
                
                
              }
            });
        });
    
  }

  function init(element, params) {
    appInit(element, params);
     function abc(current){
      alert(current);
      if(current>0){
        if (viewModel.flag ==0){
          toastr.warning("请先填写基本信息");
        }
      }
    }
    afterRender();
    window.ran = viewModel;
    $(".product-choose-result").hide();
    $(".product-choose-content").hide();
    $(".product-choose").each(function(index){
      var _this=$(this);
      if( _this.hasClass("is-checked")){
            $(".product-choose-result").eq(index).show();
            $(".product-choose-content").eq(index).show();
     }
        
      _this.click(function(){
        if($(this).hasClass("is-checked")){
            $(".product-choose-result").eq(index).show();
            $(".product-choose-content").eq(index).show();
          }
         else{
             $(".product-choose-result").eq(index).hide();
             $(".product-choose-content").eq(index).hide();
             $(".product-choose-result").eq(index).removeClass("open");
             $(".ui-collapse-content").eq(index + 1).attr("aria-hidden","true").hide();
           }
      })
       
    });
    // $("#user-action-add").click();
// var tab=function(){
//     $(".u-tabs__tab").each(function(index){
//          var _this=$(this);
//          _this.mousedown(function(e){
//              if(index >0){
//                if (viewModel.flag ==0){.....
//                  toastr.warning("请选填写客户基本信息");
//                  console.log("flag:"+viewModel.flag + ",index:" +index);
//                  e.preventDefault();
//                  return false;
//                }
//              }
//              else{
//                
//              }
//          })
//        })
// }
//    tab();
   
   
}

  return {
    init: init
  }
});
