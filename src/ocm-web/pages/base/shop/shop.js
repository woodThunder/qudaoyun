define(['text!./shop.html', 'ocm_common', 'ocm_baseview', './meta.js', 'ajaxfileupload', 'ossupload', 'interfaceFileImpl'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, comboData, shopToShopDecorationSeriesId, fileDialog, picBigDialog;
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/base/shops',
      childListUrl: '/shop-deco-area',
      ContactListUrl: '/base/shop-contacts',
      MarketAreatUrl: '/dealer-market-area',
      ShopDecorationSeriesListUrl: '/shop-decoration-series',
      picurl: '/cust-cred-pic',
      shopClerksurl: "/base/shop-clerks",
      shopWarehousesurl: "/base/shop-warehouses",
      personPosturl: "/base/person-posts",
      ShopList: new u.DataTable(model.options.metas.Shopmeta),
      ContactList: new u.DataTable(model.options.metas.Contactmeta),
      //ShopDecoAreaList: new u.DataTable(ShopDecoAreameta),
      MarketAreaList: new u.DataTable(model.options.metas.MarketAreameta),
      // ShopDecorationSeriesList: new u.DataTable(ShopDecorationSeriesmeta),
      shopCredPicList: new u.DataTable(model.options.metas.shopCredPicmeta),
      ShopClerkList: new u.DataTable(model.options.metas.shopClerkmeta),
      ShopWarehouseList: new u.DataTable(model.options.metas.shopWarehousemeta),
      FileList: new u.DataTable(model.options.metas.FileMeta),
      pictureCategoryRef: new u.DataTable(model.options.metas.pictureCategoryRef),
      stateSrc: [{
        value: "0",
        name: "无效"
      }, {
        value: "1",
        name: "有效"
      }],
      statusSource: [{
        value: "1",
        name: "启用"
      }, {
        value: "0",
        name: "停用"
      }],
      whetherSrc: CONST.WHETHER,
      enableFormat: common.format.enableFormat,
      oneCategorySrc: ko.observableArray([]),
      twoCategorySrc: ko.observableArray([]),
      registTypeSrc: ko.observableArray([]),
      credentialsTypeSrc: ko.observableArray([]),
      flag: 0,
      currentFlag: 1,
      currentTab: 0,
      currentList: "",
      currentTip: "",
      pictureCategory: "",
      pictureCategoryName: "",
      picRowId: "",
      picArr: [],
      shopPattern: ko.observableArray([]),
      shopNature: ko.observableArray([]),
      shopType: ko.observableArray([]),
      shopContactType: ko.observableArray([]),
      cityLevel: ko.observableArray([]),
      incaseType: ko.observableArray([]),
      shopStatus: ko.observableArray([]),
      customerSourceSrc: ko.observableArray([]),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      ensureRefKeys: "searchcomp",

      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      button7Source: model.options.buttons.button7,
      button8Source: model.options.buttons.button8,
      button9Source: model.options.buttons.button9,
      button10Source: model.options.buttons.button10,
      button11Source: model.options.buttons.button11,

      buttonMenu1Source: model.options.buttonmenus.buttonmenu1,

      card1Source: model.options.cards.card1,
      detail1Source: model.options.details.detail1,

      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      grid8Option: model.options.grids.grid8,
      grid9Option: model.options.grids.grid9,
      isRent: [{
        value: "1",
        name: "是"
      }, {
        value: "0",
        name: "否"
      }],
      contactdata: [],
      shopdecoareadata: [],
      shopdecorationseriesdata: [],
      marketdata: [],
      ContactListStatus: [],
      businessTypeCode: "",
      enableFmt: ko.pureComputed(function() {
        var status = viewModel.ShopList.ref("isEnable")();
        var statusName
        if (status == 0) {
          (statusName = "未启用")
        }
        if (status == 1) {
          (statusName = "已启用")
        }
        if (status == 2) {
          (statusName = "已停用")
        }
        return statusName;
      }),
      Rent: ko.pureComputed(function() {
        var isRent = viewModel.ShopList.ref("isRent")();
        return isRent == 1 ? "是" : "否";
      }),
      ManageVariousBusiness: ko.pureComputed(function() {
        var isManageVariousBusiness = viewModel.ShopList.ref("isManageVariousBusiness")();
        return isManageVariousBusiness == 1 ? "是" : "否";
      }),
      // businessType: ko.pureComputed(function () {
      //   var businessType = viewModel.ShopList.ref("description")();
      //   return businessType;
      // }),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,

      saleChannelDataSource: ko.observableArray([]),

      //返回列表页
      retListPanel: common.bill.retListPanel,
      businessTypeCheckboxData: [],
      //跳转图片维护页
      goPicPanel: common.bill.goPicPanel,
    },
    rendertype: {
      //启用状态
      operation4single: common.rendertype.operation4single,
      whetherRender: common.rendertype.whetherRender,
      booleanRender: common.rendertype.booleanRender,
      //跳转详情页
      detailRender: common.rendertype.detailRender,
      operation: function(obj) {
        var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
        var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML = '<div class="ui-handle-icon">' +
          '<span class="ui-handle ui-tab-icon-b">' +
          '<a href="#" class="uifont icon-edit font-c-c" ' +
          editfun +
          ' title="修改"></a>' +
          '</span>    ' +
          '<span class="ui-handle ui-tab-icon-b">' +
          '<a href="#" class="uifont icon-shanchu1 font-c-c" ' +
          delfun +
          ' title="删除"></a>' +
          '</span></div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //列表图片维护操作
      operationPic: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var uploadBtn = "data-bind=click:picPage.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        obj.element.innerHTML = '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a href="#"' +
          uploadBtn +
          ' title="图片维护">图片维护</a>' +
          '</span>' +
          '</div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      enableStatusRender: function(obj) {
        var showValue = obj.value == "1" ? "启用" : "停用";
        obj.element.innerHTML = showValue;
      },
      //判断表格里的状态
      //审核状态
      stateGrid: function(obj) {
        var stateValue = viewModel.ShopList.getRow(obj.rowIndex).getValue('isEnable');
        var stateName;
        if (stateValue == 0) {
          (stateName = "未启用")
        }
        if (stateValue == 1) {
          (stateName = "已启用")
        }
        if (stateValue == 2) {
          (stateName = "已停用")
        }
        obj.element.innerHTML = stateName;
      },
    },
    events: {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，-2为复制,大于等于0为编辑)
      beforeEdit: function(index, rowId) {
        var self = this;
        viewModel.index = index;
        viewModel.rowId = rowId;
        viewModel.goBillPanel();
        viewModel.ContactList.clear();
        viewModel.ShopClerkList.clear();
        viewModel.ShopWarehouseList.clear();
        /*viewModel.ShopDecoAreaList.clear();*/
        viewModel.MarketAreaList.clear();
        /*viewModel.ShopDecorationSeriesList.clear();*/
        $("#productBase").show();
        $("#productBase_show").hide();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.currentFlag = 1;
        viewModel.currentTab = 0;

        if (index >= 0) {
          //修改操作
          var currentDataId = viewModel.ShopList.getRowByRowId(rowId).getValue('id');
          viewModel.ShopList.originEditData = viewModel.ShopList.getRowByRowId(rowId).getSimpleData();
          //viewModel.ShopDecorationSeriesList.meta.shopDecorationAreaId.refparam ='{"EQ_shop.id":"'+currentDataId+'"}';
          viewModel.flag = 1;

          var shopleaserent = viewModel.app.getComp("shopleaserent");
          var shopleasetime = viewModel.app.getComp("shopleasetime");
          var shopleasestart = viewModel.app.getComp("shopleasestart");
          //编辑时客户来源不可编辑
          // var sourceCode = viewModel.app.getComp("sourceCode");
          // sourceCode.setEnable(false);

          var cityId = viewModel.app.getComp("cityIdBase");
          cityId.setEnable(true);
          var cityValue = {
            "EQ_parent.id": viewModel.ShopList.getRowByRowId(rowId).getValue('provinceId')
          };
          $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
          var countyId = viewModel.app.getComp("countyIdBase");
          countyId.setEnable(true);
          var countyValue = {
            "EQ_parent.id": viewModel.ShopList.getRowByRowId(rowId).getValue('cityId')
          };
          $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
          var townId = viewModel.app.getComp("townIdBase");
          townId.setEnable(true);
          var townValue = {
            "EQ_parent.id": viewModel.ShopList.getRowByRowId(rowId).getValue('countyId')
          };
          $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
          //根据id查联系人表
          $._ajax({
            url: appCtx + viewModel.ContactListUrl + '/findByShopId',
            type: 'get',
            data: {
              shopId: currentDataId
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ContactList.setSimpleData(data, {
                unSelect: true
              });
              viewModel.contactdata = viewModel.ContactList.getSimpleData();
            }
          });
          //根据id查店员表
          $._ajax({
            url: appCtx + viewModel.shopClerksurl + '/findByShopId',
            type: 'get',
            data: {
              shopId: currentDataId
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ShopClerkList.setSimpleData(data, {
                unSelect: true
              });
            }
          });
          //根据id查仓库表
          $._ajax({
            url: appCtx + viewModel.shopWarehousesurl + '/findByShopId',
            type: 'get',
            data: {
              shopId: currentDataId
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ShopWarehouseList.setSimpleData(data, {
                unSelect: true
              });
            }
          });
        } else if (index === -2) {
          //复制操作
          var rowIndexArr = viewModel.ShopList.getSelectedIndices();
          var focusRow = viewModel.ShopList.getFocusRow();
          var currentRow = viewModel.ShopList.getCurrentRow();
          if (rowIndexArr.length > 1 || !currentRow) {
            u.confirmDialog({
              msg: "请选择一条数据？",
              title: "复制",
              onOk: function() {
                //
              },
              onCancel: function() {
                //
              }
            });
            viewModel.retListPanel();
          } else {
            var copyRow = focusRow ? focusRow : currentRow;
            var curRow = viewModel.ShopList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            viewModel.ShopList.setRowFocus(curRow);
            var currentDataId = copyRow.getValue('id');


            //根据id查子表
            /*$._ajax({
	         		url:appCtx + viewModel.childListUrl + '/findByShopId',
		          type:'get',
		          data:{
		          	findByShopId:currentDataId
		          },
		          contentType: "application/json; charset=utf-8",
		          success:function(data){
		            viewModel.ShopDecoAreaList.setSimpleData(data,{unSelect:true});
		          }
		        });*/
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
            //删除子表主键，子表主表关联
            //var subRows = viewModel.ShopDecoAreaList.getAllRows();
            for (var i = 0; i < subRows.length; i++) {
              viewModel.clearBaseProp(subRows[i]);
              //subRows[i].setValue("parentid", "");
            }
          }
        } else {
          //添加操作
          viewModel.flag = 0;
          var currentRow = viewModel.ShopList.createEmptyRow();
          currentRow.setSimpleData({
            "sourceCode": "01"
          })
          viewModel.ShopList.setRowFocus(currentRow);
          var isData = currentRow.getSimpleData();
          for (var k in currentRow) {
            if (k.indexOf("is") > -1 && currentRow[k] == null) {
              currentRow[k] = 0;
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
      saveHandle: function() {
        var infoBase = $("#tab-panel-1")[0];
        var basePass = viewModel.validate(infoBase);
        if (basePass.passed) {
          var _index = viewModel.index;
          viewModel.edit(_index);
        }


      },

      //启用
      enable: function() {
        var selectedRows = viewModel.ShopList.getSelectedRows();
        var ids = [];
        if (selectedRows && selectedRows.length > 0) {
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          ids = ids.join(",");
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        } else {
          toastr.warning("请先选择需要启用数据");
        }
      },

      //停用
      disable: function() {
        var selectedRows = viewModel.ShopList.getSelectedRows();
        var ids = [];
        if (selectedRows && selectedRows.length > 0) {
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          ids = ids.join(",");
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "2");
              }
            }
          })
        } else {
          toastr.warning("请先选择需要停用数据")
        }
      },
      //将操作后的数据进行保存
      edit: function(index) {
        var self = this;

        var currentRow, type = "post";
        var postdata = viewModel.ShopList.getFocusRow().getSimpleData();
        postdata.shopPatternCode = 1;
        if (index >= 0) {
          type = "put";
          postdata.persistStatus = "upd";
        } else {
          postdata.status = 1;
          postdata.isAutoEncoded = 1;
        }
        var shopContacts = viewModel.ContactList.getSimpleData();
        postdata.shopContacts = shopContacts;
        var shopClerks = viewModel.ShopClerkList.getSimpleData();
        postdata.shopClerks = shopClerks;
        var shopWarehouses = viewModel.ShopWarehouseList.getSimpleData();
        postdata.shopWarehouses = shopWarehouses;

        // 更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            //如果index大于等于0说明是修改
            // if (index >= 0) {
            //   //获取需要修改的行
            //   currentRow = viewModel.ShopList.getRowByRowId(viewModel.rowId);
            //   //将用户填写的数据更新到ShopList上
            // } else {
            //   //添加数据
            //   currentRow = viewModel.ShopList.getFocusRow();
            // }
            // currentRow.setSimpleData(data);
            // viewModel.flag = 1;
            // $(".ui-bill-panel").eq(0).hide();
            // $(".ui-bill-detail").eq(0).show();
            // 
            // shopToShopDecorationSeriesId = viewModel.ShopList.getRow().getValue('id');
            //shopToShopDecorationSeriesId = viewModel.ShopList.getCurrentRow().getValue('id');
            //viewModel.ShopDecorationSeriesList.meta.shopDecorationAreaId.refparam ='{"EQ_shop.id":"'+shopToShopDecorationSeriesId+'"}';
            toastr.success("保存成功");
            viewModel.search();
            viewModel.retListPanel();
          }
        })

      },


      tabShop: function(e) {
        //  	if(current>0){
        e = window.event || e;
        if (viewModel.flag != 1) {
          toastr.warning("请先填写基本信息");
          event.preventDefault();
          event.beforeEdit();
          return false;
        }
        //  	}
      },
      backPanle: function() {
        common.dialog.confirmDialog({
          msg1: '确认返回列表页？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      },
      validate: function(element) {
        var result = viewModel.app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      //联系人保存
      saveContact: function() {
        viewModel.ContactListStatus = viewModel.ContactList.getSimpleData();

        var curRow = viewModel.ShopList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.ContactList.getSimpleData();
        // postdata.statusCode = 1;
        var changeData = [];
        var newChangeData = [];
        var nochangeData = [];
        var delChangeData = [];
        if (postdata && postdata.length > 0) {
          for (var i = 0; i < postdata.length; i++) {
            if (postdata[i].persistStatus != "nrm") {
              postdata[i].status = 0;
              postdata[i].shopId = cId;
              changeData.push(postdata[i]);
            } else {
              nochangeData.push(postdata[i]);
            }
            if (postdata[i].persistStatus == "new") {

              postdata[i].shopId = cId;
              newChangeData.push(postdata[i]);
            }
            if (postdata[i].persistStatus == "fdel") {

              postdata[i].shopId = cId;
              delChangeData.push(postdata[i]);
            }
          }
        }
        if (changeData.length == 0) {
          toastr.warning("没有相关数据需要保存");
          return false
        }
        if (newChangeData.length == 0) {
          if (postdata.length == delChangeData.length) {
            for (var i = 0; i < postdata.length; i++) {
              for (var j = 0; j < delChangeData.length; j++) {
                if (postdata[i] == delChangeData[j]) {
                  toastr.warning("联系人已存在的情况下，不可全部删除");
                  viewModel.cancelContact();
                  return false
                }
              }
            }
          }

        }


        var infoBase = $("#tab-panel-2")[0];
        var basePass = viewModel.validate(infoBase);
        if (basePass.passed) {
          $._ajax({
            url: appCtx + viewModel.ContactListUrl + "/batch-save",
            type: "post",
            data: JSON.stringify(changeData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function() {
              u.hideLoader();
              //          viewModel.showDefaultPage();
            },
            success: function(data) {
              viewModel.ContactList.removeAllRows();
              viewModel.ContactList.addSimpleData(data, "nrm", {
                "unSelect": true
              });
              viewModel.ContactList.addSimpleData(nochangeData, "nrm", {
                "unSelect": true
              });
              viewModel.contactdata = viewModel.ContactList.getSimpleData();
              toastr.success("保存成功");
              viewModel.currentFlag = 1;
            }
          })
        }

        return
      },
      //地址保存
      /*saveAddress:function(){
          var curRow = viewModel.ShopList.getCurrentRow();
          var cId = curRow.getValue("id");
          var postdata = viewModel.ShopDecoAreaList.getSimpleData();
          var changeData = [];
          var nochangeData = []
          if(postdata&&postdata.length>0){
            for(var i = 0;i< postdata.length;i++){
              if(postdata[i].persistStatus!="nrm"){
                postdata[i].Status=0;
                postdata[i].shopId=cId;
                changeData.push(postdata[i]);
              }else{
                nochangeData.push(postdata[i]);
              }
            }
          }
          if(changeData.length==0){
            toastr.warning("没有相关数据需要保存");
            return false
          }
          var infoBase=$("#tab-panel-4")[0]; 
          var basePass =viewModel.validate(infoBase);  
          if(basePass.passed){
            $._ajax({
              url:appCtx + viewModel.childListUrl + "/batch-save",
              type:"post",
              data:JSON.stringify(changeData),
              contentType : "application/json; charset=utf-8",
              dataType:"json",
              complete:function(){
                u.hideLoader();
    //          viewModel.showDefaultPage();
              },
              success:function(data){
                viewModel.ShopDecoAreaList.removeAllRows();
                viewModel.ShopDecoAreaList.addSimpleData(data,"nrm",{"unSelect":true});
                viewModel.ShopDecoAreaList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
                viewModel.shopdecoareadata=viewModel.ShopDecoAreaList.getSimpleData();
                toastr.success("保存成功");
                viewModel.currentFlag=1;
              }
            })
          }
          
        },*/
      //市场区域保存
      saveMarket: function() {
        var curRow = viewModel.ShopList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.MarketAreaList.getSimpleData();
        var changeData = [];
        var nochangeData = []
        if (postdata && postdata.length > 0) {
          for (var i = 0; i < postdata.length; i++) {
            if (postdata[i].persistStatus != "nrm") {
              postdata[i].status = 1;
              postdata[i].shopId = cId;
              changeData.push(postdata[i]);
            } else {
              nochangeData.push(postdata[i]);
            }
          }
        }
        if (changeData.length == 0) {
          toastr.warning("没有相关数据需要保存");
          return false
        }
        var infoBase = $("#tab-panel-3")[0];
        var basePass = viewModel.validate(infoBase);
        if (basePass.passed) {
          $._ajax({
            url: appCtx + viewModel.MarketAreatUrl + "/batch-save",
            type: "post",
            data: JSON.stringify(changeData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            complete: function() {
              u.hideLoader();
              //          viewModel.showDefaultPage();
            },
            success: function(data) {
              viewModel.MarketAreaList.removeAllRows();
              viewModel.MarketAreaList.addSimpleData(data, "nrm", {
                "unSelect": true
              });
              viewModel.MarketAreaList.addSimpleData(nochangeData, "nrm", {
                "unSelect": true
              });
              viewModel.marketdata = viewModel.MarketAreaList.getSimpleData();
              toastr.success("保存成功");
              viewModel.currentFlag = 1;
            }
          })
        }

      },
      //合伙人保存saveShopDecorationSeries
      /*saveShopDecorationSeries:function(){
          var curRow = viewModel.ShopList.getCurrentRow();
          var cId = curRow.getValue("id");
          var postdata = viewModel.ShopDecorationSeriesList.getSimpleData();
          var changeData = [];
          var nochangeData = []
          if(postdata&&postdata.length>0){
            for(var i = 0;i< postdata.length;i++){
              if(postdata[i].persistStatus!="nrm"){
                postdata[i].status=1;
                postdata[i].logistic_period=0;
                postdata[i].shopId=cId;
                changeData.push(postdata[i]);
              }else{
                nochangeData.push(postdata[i]);
              }
            }
          }
          if(changeData.length==0){
            toastr.warning("没有相关数据需要保存");
            return false
          }
          var infoBase=$("#tab-panel-5")[0]; 
          var basePass =viewModel.validate(infoBase);  
          if(basePass.passed){
            $._ajax({
            url:appCtx + viewModel.ShopDecorationSeriesListUrl + "/batch-save",
            type:"post",
            data:JSON.stringify(changeData),
            contentType : "application/json; charset=utf-8",
            dataType:"json",
            complete:function(){
              u.hideLoader();
  //          viewModel.showDefaultPage();
            },
            success:function(data){
              viewModel.ShopDecorationSeriesList.removeAllRows();
              viewModel.ShopDecorationSeriesList.addSimpleData(data,"nrm",{"unSelect":true});
              viewModel.ShopDecorationSeriesList.addSimpleData(nochangeData,"nrm",{"unSelect":true});
              viewModel.shopdecorationseriesdata=viewModel.ShopDecorationSeriesList.getSimpleData();
              toastr.success("保存成功");
              viewModel.currentFlag=1;
            }
          })
          }
          
        },*/

      //主表删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.ShopList.setRowSelect(viewModel.ShopList.getRowByRowId(rowId));
        }
        var ids = [];
        var rows = viewModel.ShopList.getSelectedRows();
        var status = [];
        var statustip = "";
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            var statusCode = rows[i].getValue("isEnable");
            if (statusCode == 1 || statusCode == "1") {
              status.push(rows[i].getValue("code"));
            }
          }
          if (status.length > 0) {
            function statusArr() {
              for (i = 0; i < status.length; i++) {
                statustip += status[i] + "，";
              }
              return statustip.substring(0, statustip.length - 1)
            }
            toastr.warning("数据   " + statusArr() + " 已启用不可删除");
            return false
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                data: "ids=" + ids.join(","),
                success: function(data) {
                  viewModel.ShopList.removeRows(rows);
                  toastr.success("删除成功");
                }
              });
            }
          });
        } else {
          toastr.warning("请先选择要删除的数据");
        }
      },
      //子表 删除和批量删除
      delChild: function(dataTable) {
        viewModel.ContactListStatus = viewModel.ContactList.getSimpleData();
        var rows = viewModel[dataTable].getSelectedRows();
        viewModel[dataTable].removeRows(rows);
      },
      //子表增行
      addRow: function(dataTable) {
        viewModel[dataTable].createEmptyRow();
        viewModel.currentFlag = 0;
      },
      //查看详情
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.ShopList.getCurrentRow();
          var id = curRow.getValue("id");

          viewModel.findByParentid(id);
          //viewModel.findByAddressid(id);
          // viewModel.findByMarketid(id);
          //viewModel.findByPartnerid(id);
          viewModel.goDetailPanel();
          //根据id查联系人表
          $._ajax({
            url: appCtx + viewModel.ContactListUrl + '/findByShopId',
            type: 'get',
            data: {
              shopId: id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ContactList.setSimpleData(data, {
                unSelect: true
              });
              viewModel.contactdata = viewModel.ContactList.getSimpleData();
            }
          });
          //根据id查店员表
          $._ajax({
            url: appCtx + viewModel.shopClerksurl + '/findByShopId',
            type: 'get',
            data: {
              shopId: id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ShopClerkList.setSimpleData(data, {
                unSelect: true
              });
            }
          });
          //根据id查仓库表
          $._ajax({
            url: appCtx + viewModel.shopWarehousesurl + '/findByShopId',
            type: 'get',
            data: {
              shopId: id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ShopWarehouseList.setSimpleData(data, {
                unSelect: true
              });
            }
          });
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.DETAIL;
        }, 0);
      },
      //查询子表数据
      /*findByParentid: function(id) {
        $._ajax({
          url:appCtx + viewModel.childListUrl + '/findByShopId',
          type: 'get',
          async: false,
          data: {shopId: id},
          success:function(data){
            viewModel.ShopDecoAreaList.setSimpleData(data,{unSelect:true});
          }
        })
      },*/
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.ContactListUrl + '/findByShopId',
          type: 'get',
          async: false,
          data: {
            shopId: id
          },
          success: function(data) {
            viewModel.ContactList.setSimpleData(data, {
              unSelect: true
            });
          }
        })
      },
      /*findByAddressid: function(id) {
        $._ajax({
          url:appCtx + viewModel.childListUrl + '/findByShopId',
          type: 'get',
          async: false,
          data: {shopId: id},
          success:function(data){
            viewModel.ShopDecoAreaList.setSimpleData(data,{unSelect:true});
          }
        })
      },*/
      // findByMarketid: function (id) {
      //   $._ajax({
      //     url: appCtx + viewModel.MarketAreatUrl + '/findByShopId',
      //     type: 'get',
      //     async: false,
      //     data: { shopId: id },
      //     success: function (data) {
      //       viewModel.MarketAreaList.setSimpleData(data, { unSelect: true });
      //     }
      //   })
      // },
      /*findByPartnerid: function(id) {
        $._ajax({
          url:appCtx + viewModel.ShopDecorationSeriesListUrl + '/findByShopId',
          type: 'get',
          async: false,
          data: {shopId: id},
          success:function(data){
            viewModel.ShopDecorationSeriesList.setSimpleData(data,{unSelect:true});
          }
        })
      },*/
      //点击取消 单据页
      cancelHandle: function() {
        viewModel.search();
        viewModel.retListPanel();
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (viewModel.codeCount > 499) {
          var params = viewModel.searchcomp.viewModel.params;
          params.setValue("code", "");
          toastr.warning("编码最多输入500个，请重新输入");
          return false;
        }
        if (reindex) {
          viewModel.ShopList.pageIndex(0);
        }
        viewModel.ShopList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr();
        queryData.size = viewModel.ShopList.pageSize();
        queryData.page = viewModel.ShopList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.ShopList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.ShopList.totalRow(data.totalElements);
            viewModel.ShopList.totalPages(data.totalPages);
          }
        });
      },
      //search: function (reindex) {
      //  if (viewModel.codeCount > 499) {
      //    var params = viewModel.searchcomp.viewModel.params;
      //    params.setValue("code", '');
      //    toastr.warning("编码最多输入500个，请重新输入");
      //    return false
      //  }
      //  if (reindex) {
      //    viewModel.ShopList.pageIndex(0);
      //  }
      //  viewModel.ShopList.removeAllRows();

      //  var queryData = viewModel.searchcomp.getDataWithOpr();
      //  // if (queryData.hasOwnProperty("search_LIKE_businessType")) {
      //  //   queryData.search_LIKE_businessType = viewModel.businessTypeCode;
      //  // }
      //  var oldCode = queryData["search_LIKE_code"];
      //  if (oldCode) {
      //    queryData["search_IN_code"] = oldCode.replace(/%/g, '');
      //  }
      //  delete queryData["search_LIKE_code"];
      //  queryData.size = viewModel.ShopList.pageSize();
      //  queryData.page = viewModel.ShopList.pageIndex();
      //  $._ajax({
      //    type: "get",
      //    url: appCtx + viewModel.baseurl,
      //    dataType: "json",
      //    data: queryData,
      //    success: function (data) {
      //      viewModel.ShopList.setSimpleData(data.content, { unSelect: true });
      //      viewModel.ShopList.totalRow(data.totalElements);
      //      viewModel.ShopList.totalPages(data.totalPages);
      //    }
      //  })
      //},
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.ShopList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.ShopList.pageSize(size);
        viewModel.search(true);
      },
      //   //进入图片维护页
      // picPage:function(index,rowId){
      //   var curRow = viewModel.ShopList.getCurrentRow();
      //   var cId = curRow.getValue("id");
      //   //根据id查图片维护
      //   $.ajax({
      //       url:appCtx + viewModel.picurl + '/findByShopId',
      //       type:'get',
      //       data:{
      //         shopId:cId
      //       },
      //       contentType: "application/json; charset=utf-8",
      //       success:function(data){
      //         viewModel.shopCredPicList.setSimpleData(data,{unSelect:true});
      //       }
      //     });
      //   viewModel.goPicPanel();
      // },
      //进入图片维护页
      picPage: function(index, rowId) {
        var currentData = viewModel.ShopList.getRowByRowId(rowId).getSimpleData();
        viewModel.picRowId = currentData.id;
        //根据id查图片维护
        $.ajax({
          url: appCtx + viewModel.picurl + '/findByShopId',
          type: 'get',
          data: {
            shopId: viewModel.picRowId
          },
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.shopCredPicList.setSimpleData(data, {
              unSelect: true
            });
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                viewModel.picArr.push(data[i].pictureUrl);
              }
            }
          }
        });
        viewModel.goPicPanel();
      },
      //图片添加返回列表页
      picBack: function() {
        var postdata = viewModel.shopCredPicList.getSimpleData();
        var changedata = [];
        var tip = "";
        for (var i = 0; i < postdata.length; i++) {
          if (postdata[i].persistStatus != "nrm") {
            changedata.push(postdata[i]);
          }
        }
        if (changedata.length > 0) {
          function picArr() {
            for (i = 0; i < changedata.length; i++) {
              tip += changedata[i].prodPhotoInfoCode + "，";
            }
            return tip.substring(0, tip.length - 1)
          }
          toastr.warning("图片" + picArr() + "没有保存");
          return false
        } else {
          viewModel.retListPanel();
        }
      },
      picBig: function(url) {
        var picUrl = url.replace(/spot/g, ".").replace(/linePath/g, '\/').replace(/lineThrough/g, '\-');
        if (!picBigDialog) {
          picBigDialog = u.dialog({
            content: "#picBig-dialog",
            hasCloseMenu: true
          });
        } else {
          picBigDialog.show();
        }
        $("#picBig-dialog").parent().parent().css("width", "auto");
        $("#picBig").attr("src", picUrl);
      },
      //--------------------------------门店图片上传-------------------------------------------------
      //随机生成文件夹
      generateMixed: function() {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var result = "";
        for (var i = 0; i < 20; i++) {
          var id = Math.ceil(Math.random() * 35);
          result += chars[id];
        }
        return result;
      },
      //上传弹框调用
      showFileDialog: function() {
        viewModel.pk = viewModel.generateMixed();
        var pk = viewModel.pk;
        viewModel.fileQueryShop();
        if (!fileDialog) {
          fileDialog = u.dialog({
            content: "#file-dialog",
            hasCloseMenu: true
          });
        } else {
          fileDialog.show();
        }
      },
      onOpenUploadWinShop: function() {

        if (viewModel.pictureCategory != "") {
          $("#uploadbatch_id").val(undefined);
          $("#uploadbatch_id").trigger("click");
        } else {
          toastr.warning("请先选择图片分类");
        }
      },

      //上传附件
      onFileUploadShop: function() {
        var fileNum = $("#uploadbatch_id")[0].files.length;
        var fileSize = 0;
        var fileSizeMb = 0;
        var fileTypeArr = [];
        var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
        var fileSizeSum = function() {
          for (var i = 0; i < fileNum; i++) {
            fileSize += $("#uploadbatch_id")[0].files[i].size;
            var fileName = $("#uploadbatch_id")[0].files[i].name;
            var fileType = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
            fileTypeArr.push(fileType);
          }
          fileSizeMb = fileSize / 1024 / 1024;
          return fileSizeMb
        }();
        for (var i = 0; i < fileTypeArr.length; i++) {
          if (allowType.indexOf(fileTypeArr[i]) == -1) {
            toastr.warning("仅支持" + allowType + "格式文件");
            return false
          }
        }
        if (fileSizeSum <= 500) {
          //获取表单
          var pk = viewModel.pk;
          var par = {
            fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
            filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
            groupname: pk, //【必填】分組名称,未来会提供树节点
            permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
            url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
            //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          }

          var f = new interface_file();
          f.filesystem_upload(par, viewModel.fileUploadCallbackShop);

        } else {
          toastr.warning("图片总和不能超过500MB");
          return false
        }
      },
      //上传文件回传信息
      fileUploadCallbackShop: function(data) {

        if (1 == data.status) { //上传成功状态
          viewModel.FileList.addSimpleData(data.data);
          //  toastr.success();
        } else { //error 或者加載js錯誤
          toastr.error(data.message);
        }
      },
      fileQueryShop: function() {
        //获取表单
        var pk = viewModel.pk;
        var par = {
          //建议一定要有条件否则会返回所有值
          filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: pk, //【选填】[分組名称,未来会提供树节点]
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        }
        var f = new interface_file();
        f.filesystem_query(par, viewModel.fileQueryCallBackShop);
      },
      fileQueryCallBackShop: function(data) {

        if (1 == data.status) { //上传成功状态
          viewModel.FileList.setSimpleData(data.data);
        } else {
          //删除成功后查询
          if (data.status == 0 && !data.data) {
            viewModel.FileList.setSimpleData([]);
          }
        }
      },
      //附件删除
      fileDeleteShop: function() {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0) {
          toastr.error("请选择一个附件");
          return
        }
        for (var i = 0; i < row.length; i++) {
          var pk = row[i].getValue("id");
          var par = {
            id: pk, //【必填】表的id
            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          }
          var f = new interface_file();
          f.filesystem_delete(par, viewModel.fileDeleteCallBackShop);
        }
      },
      //附件删除回调
      fileDeleteCallBackShop: function(data) {
        if (1 == data.status) { //上传成功状态
          viewModel.fileQuery();
        } else {
          toastr.error(data.message);
        }
      },
      //下载
      fileDownloadShop: function() {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0 || row.length > 1) {
          toastr.error("请选择一个附件");
          return
        }
        for (var i = 0; i < row.length; i++) {
          var pk = row[i].getValue("id");
          var form = $("<form>"); //定义一个form表单
          form.attr('style', 'display:none'); //在form表单中添加查询参数
          form.attr('target', '');
          form.attr('enctype', 'multipart/form-data');
          form.attr('method', 'post');
          form.attr('action', window.ctxfilemng + "file/download?permission=read&stream=false&id=" + pk);
          $('#file-dialog').append(form); //将表单放置在web中
          form.submit();
        }
      },
      //查看
      fileViewShop: function() {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0) {
          toastr.error("请选择一个附件");
          return
        }
        for (var i = 0; i < row.length; i++) {
          var url = row[i].getValue("url");
          parent.open(location.origin + url);
        }
      },
      //图片保存
      savePic: function() {
        var curRow = viewModel.ShopList.getCurrentRow();
        var cId = curRow.getValue("id");
        var postdata = viewModel.FileList.getSimpleData();
        if (postdata.length == 0) {
          toastr.warning("没有相关数据需要保存");
          return false
        }
        var picdata = new Array();
        for (var i = 0; i < postdata.length; i++) {
          picdata[i] = {};
          picdata[i].shopId = cId;
          picdata[i].pictureUrl = postdata[i].url;
          picdata[i].credentialTypeId = viewModel.pictureCategory;
          picdata[i].persistStatus = "new";
        }
        $._ajax({
          url: appCtx + viewModel.picurl + "/batch-save",
          type: "post",
          data: JSON.stringify(picdata),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          complete: function() {
            u.hideLoader();
          },
          success: function(data) {
            toastr.success("保存成功");
            fileDialog.hide();
            viewModel.shopCredPicList.addSimpleData(data, "nrm", {
              "unSelect": true
            });
          }
        })

      },
      //上一张下一张
      prev: function() {
        var current = $("#picBig").attr("src");
        for (var i = 0; i < viewModel.picArr.length; i++) {
          if (viewModel.picArr[i] == current) {
            if (viewModel.picArr[i - 1]) {
              $("#picBig").attr("src", viewModel.picArr[i - 1])
            } else {
              $("#imgTip").html("已经是第一张了").show().fadeOut(5000);
            }
          }
        }
      },
      next: function() {
        var current = $("#picBig").attr("src");
        for (var i = 0; i < viewModel.picArr.length; i++) {
          if (viewModel.picArr[i] == current) {
            if (viewModel.picArr[i + 1]) {
              $("#picBig").attr("src", viewModel.picArr[i + 1])
            } else {
              $("#imgTip").html("已经是最后一张了").show().fadeOut(5000);
            }
          }
        }

      },
      //删除图片
      delPic: function(data) {
        if (typeof(data) == 'number') {
          viewModel.shopCredPicList.setRowSelect(data);
        }
        var ids = [];
        var rows = viewModel.shopCredPicList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.picurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
                  viewModel.shopCredPicList.removeRows(rows);
                  toastr.success("删除成功");
                }
              });

            }
          });
        } else {
          toastr.warning("请先选择需要删除数据");
        }
      },
      cancelContact: function() {
        viewModel.ContactList.removeAllRows();
        viewModel.ContactList.setSimpleData(viewModel.contactdata, {
          "unSelect": true
        });
        viewModel.currentFlag = 1;
      },
      /*cancelShopDecoArea:function(){
         viewModel.ShopDecoAreaList.removeAllRows();
         viewModel.ShopDecoAreaList.setSimpleData(viewModel.shopdecoareadata,{"unSelect":true});
         viewModel.currentFlag=1;
      },*/
      cancelMarket: function() {
        viewModel.MarketAreaList.removeAllRows();
        viewModel.MarketAreaList.setSimpleData(viewModel.marketdata, {
          "unSelect": true
        });
        viewModel.currentFlag = 1;
      },
      /*cancelShopDecorationSeries:function(){
         viewModel.ShopDecorationSeriesList.removeAllRows();
         viewModel.ShopDecorationSeriesList.setSimpleData(viewModel.shopdecorationseriesdata,{"unSelect":true});
         viewModel.currentFlag=1;
      },*/
      //--------------------------------门店图片上传-------------------------------------------------
      //导入
      importShop: function() {
        var urlInfo = '/shop-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/shop-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportShop: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var oldCode = searchParams["search_LIKE_code"];
        if (oldCode) {
          searchParams["search_IN_code"] = oldCode.replace(/%/g, '');
        }
        delete searchParams["search_LIKE_code"];
        var templateUrl = '/shop-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = '/shop-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.ShopList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      //导入
      importContact: function() {
        var urlInfo = '/shop-contact-excel/excelDataImport'; //倒入地址参数
        var urlStatusInfo = '/shop-contact-excel/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportContact: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        //搜索参数加customer.
        for (var p in searchParams) {
          searchParams[p.replace("LIKE_", "LIKE_shop.").replace("EQ_", "EQ_shop.")] = searchParams[p];
          delete searchParams[p];
        }
        searchParams["search_EQ_shop.dr"] = "0";
        var oldCode = searchParams["search_LIKE_shop.code"];
        if (oldCode) {
          searchParams["search_IN_shop.code"] = oldCode.replace(/%/g, '');
        }
        delete searchParams["search_LIKE_shop.code"];
        var templateUrl = '/shop-contact-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = '/shop-contact-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.ShopList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
    },
    afterCreate: function() {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      // 选择上传文件后，直接调用上传方法
      $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
        if (this.value) {
          viewModel.onFileUploadShop();
        }
      });
      //绑定输入框enter事件
      $('#buoyancyfactorlist-searchcontent input').off("keydown").on("keydown", function(e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });
      //查询编码
      viewModel.searchcomp.viewModel.params.on("code.valuechange", function(obj) {
        var code = obj.newValue;
        var word = " "; // 要计算的字符
        var regex = new RegExp(word, 'g'); // 使用g表示整个字符串都要匹配
        var result = code.match(regex);
        viewModel.codeCount = !result ? 0 : result.length;
      });
      //tab切换校验
      setTimeout(function() {
        /*$('.u-tabs')[0]['u.Tabs'].on('tabchange', function(obj) {
           viewModel.currentTab=obj.index;
           if(viewModel.currentTab==3){
                var curRow = viewModel.ShopList.getCurrentRow();
                var cId = curRow.getValue("id");
                var fromAccountVlue={"EQ_shop.id":cId};
                var toAccountVlue={"NOTEQ_shop.id":cId};
                var fromAccount=viewModel.MarketAreaList.meta.fromAccountId;
                var toAccount=viewModel.MarketAreaList.meta.toAccountId;
                fromAccount["refparam"]=JSON.stringify(fromAccountVlue);
                toAccount["refparam"]=JSON.stringify(toAccountVlue);
           }
        });*/
        $('.u-tabs')[0]['u.Tabs'].on('beforeTabChange', function(obj) {
          viewModel.currentTab = obj.index;
          if (obj.index != 0) {
            var persistStatus = viewModel.ShopList.getCurrentRow().status;
            if (viewModel.flag == 0 || persistStatus == "upd") {
              toastr.warning("请先保存门店基本信息");
              return false;
            }
          }
          switch (viewModel.currentTab) {
            case 1:
              viewModel.currentList = viewModel.ContactList;
              viewModel.currentTip = "联系人";
              break;
            case 2:
              viewModel.currentList = viewModel.MarketAreaList;
              viewModel.currentTip = "市场区域";
              break;
              /*case 3:
                  viewModel.currentList=viewModel.ShopDecoAreaList;
                  viewModel.currentTip="装修区域";
                  break;
            
              default:
                  viewModel.currentList=viewModel.ShopDecorationSeriesList;
                  viewModel.currentTip="装修系列";*/
            default:
              break;
          }
          //判断有无修改
          var postdata = viewModel.currentList.getSimpleData();
          var changeData = [];
          if (postdata && postdata.length > 0) {
            for (var i = 0; i < postdata.length; i++) {
              if (postdata[i].persistStatus != "nrm") {
                changeData.push(postdata[i]);
              }
            }
            if (changeData.length > 0) {
              viewModel.currentFlag = 0;
            }

          }
          if (viewModel.currentFlag == 0) {
            toastr.warning("请先保存" + viewModel.currentTip + "信息");
            return false;
          }
          return true
        });
      }, 100);
      // var pagebcomp = $("#pagination")[0]['u.pagination'];
      // pagebcomp.update({showState:false});

      $._ajax({
        type: "get",
        url: appCtx + "/cust-doc-defs/cust_doc_code/batch",
        data: {
          cust_doc_code_batch: "QY026,QY027,QY028,QY030,QY032,QY039,QY116,CUSTOMER_SOURCE",
        },
        success: function(data) {
          var combodata = common.dataconvert.toMap(data.QY026, "name", "code");
          viewModel.shopPattern(combodata);
          var combodata1 = common.dataconvert.toMap(data.QY027, "name", "code");
          viewModel.shopNature(combodata1);
          var combodata2 = common.dataconvert.toMap(data.QY028, "name", "code");
          viewModel.shopType(combodata2);
          var shopContactTypeCombo = common.dataconvert.toMap(data.QY116, "name", "code");
          viewModel.shopContactType(shopContactTypeCombo);
          var combodata3 = common.dataconvert.toMap(data.QY030, "name", "code");
          viewModel.cityLevel(combodata3);
          var combodata4 = common.dataconvert.toMap(data.QY032, "name", "code");
          viewModel.incaseType(combodata4);
          var combodata5 = common.dataconvert.toMap(data.QY039, "name", "code");
          viewModel.shopStatus(combodata5);
          var combodata6 = common.dataconvert.toMap(data["CUSTOMER_SOURCE"], "name", "code");
          viewModel.customerSourceSrc(combodata6);
        }
      });
      $._ajax({
        type: "get",
        url: appCtx + "/cust-doc-defs/cust_doc_code",
        data: {
          cust_doc_code: "QY037",
        },
        success: function(data) {
          // // var comboData = data.map(v=>({name:v.name,value:v.code}));
          comboData = common.dataconvert.toMap(data, "name", "code");
        }
      });

      viewModel.pictureCategoryRef.createEmptyRow();
      //判断上传选择图片分类
      viewModel.pictureCategoryRef.on("pictureCategory.valuechange", function(obj) {
        viewModel.pictureCategory = obj.newValue;
        var refValues = $("#refContainerpictureCategory").data("uui.refer").values;
        viewModel.pictureCategoryName = refValues[0].refname;
      });

      //基本信息   国家、省、城市、区县、街道联动
      viewModel.ShopList.on("countryId.valuechange", function(obj) {
        var provinceValue = {
          "EQ_country.id": obj.newValue,
          "EQ_isEnable": "1",
          "EQ_areaLevel": "1"
        };
        $("#provinceIdinfo").attr("data-refparam", JSON.stringify(provinceValue));
        var provinceId = viewModel.app.getComp("provinceIdBase");
        viewModel.ShopList.setValue("provinceId", "");
        viewModel.ShopList.setValue("provinceCode", "");
        viewModel.ShopList.setValue("provinceName", "");
      });
      viewModel.ShopList.on("provinceId.valuechange", function(obj) {
        var cityValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": "2",
          "EQ_isEnable": "1"
        };
        $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
        // viewModel.ShopList.meta.cityId.refparam = cityValue
        var cityId = viewModel.app.getComp("cityIdBase");
        viewModel.ShopList.setValue("cityId", "");
        viewModel.ShopList.setValue("cityCode", "");
        viewModel.ShopList.setValue("cityName", "");
        if (obj.oldValue != obj.newValue) {
          cityId.setEnable(true);
        } else {
          cityId.setEnable(false);
        }
      });
      viewModel.ShopList.on("cityId.valuechange", function(obj) {
        var countyValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": "3",
          "EQ_isEnable": "1"
        };
        $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
        var countyId = viewModel.app.getComp("countyIdBase");
        viewModel.ShopList.setValue("countyId", "");
        viewModel.ShopList.setValue("countyCode", "");
        viewModel.ShopList.setValue("countyName", "");
        if (obj.oldValue != obj.newValue) {
          countyId.setEnable(true);
        } else {
          countyId.setEnable(false);
        }
      });
      viewModel.ShopList.on("countyId.valuechange", function(obj) {
        //       var a=JSON.parse($("#townIdinfo").attr("data-refparam"));
        //       a["EQ_parent.id"]=obj.newValue;
        var townValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": "4",
          "EQ_isEnable": "1"
        };
        $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
        var townId = viewModel.app.getComp("townIdBase");
        viewModel.ShopList.setValue("townId", "");
        viewModel.ShopList.setValue("townCode", "");
        viewModel.ShopList.setValue("townName", "");
        if (obj.oldValue != obj.newValue) {
          townId.setEnable(true);
        } else {
          townId.setEnable(false);
        }
      });
      viewModel.ShopClerkList.on("personId.valuechange", function(obj) {
        if (obj.newValue != "") {
          $._ajax({
            url: appCtx + viewModel.personPosturl + "/findByPersonId",
            type: "get",
            data: {
              personId: obj.newValue
            },
            success: function(data) {
              viewModel.ShopClerkList.setValue("postName", data[0] ? data[0].postName : "");
              viewModel.ShopClerkList.setValue("postId", data[0] ? data[0].postId : "");
            }
          });
        }


      });
      window.ran = viewModel;
      $(".product-choose-result").hide();
      $(".product-choose-content").hide();
      $(".product-choose").each(function(index) {
        var _this = $(this);
        if (_this.hasClass("is-checked")) {
          $(".product-choose-result").eq(index).show();
          $(".product-choose-content").eq(index).show();
        }

        _this.click(function() {
          if ($(this).hasClass("is-checked")) {
            $(".product-choose-result").eq(index).show();
            $(".product-choose-content").eq(index).show();
          } else {
            $(".product-choose-result").eq(index).hide();
            $(".product-choose-content").eq(index).hide();
            $(".product-choose-result").eq(index).removeClass("open");
            $(".ui-collapse-content").eq(index + 1).attr("aria-hidden", "true").hide();
          }
        })

      });
      window.vm = viewModel;
      //加载条
      window.vm.onLoading = function onLoading() {
        var centerContent = '<i class="fa fa-cloud u-loader-centerContent"></i>';
        var opt1 = {
          hasback: true,
          hasDesc: true, //是否含有加载内容描述
          centerContent: centerContent
        };
        u.showLoader(opt1);
      }

      //关闭加载条
      window.vm.onCloseLoading = function onCloseLoading() {
        u.hideLoader();
      }
    }
  });

  return view;
});