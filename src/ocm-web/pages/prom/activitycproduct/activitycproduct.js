define(['text!./activitycproduct.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
    'use strict'
    var app,baseData,events,rendertype,viewModel,searcher,billfooter,quoteDialog,distributionDialog,distributionNextDialog,
        distributionDeleteDialog,distributionLookDialog,singledocSearchChild,singledocSearchChildDetail;
    baseData = {
        baseurl: '/prom/activity-c',
        baseurlChild: '/prom/activity-c-products',
        ProductCombineList: new u.DataTable(ProductcCombine),
        ProductCombineItem: new u.DataTable(ProductcombineItem),
        ItemRefList: new u.DataTable(ItemRef),
        CopyActRef: new u.DataTable(CopyAct),
        CopyList : new u.DataTable(ProductcCombine),
        actselect : new u.DataTable(ProductcCombine),
        FileList: new u.DataTable(FileMeta),
        billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        enableRadioSrc: [{value:1,name:"是"},{value:0,name:"否"}],
        prodStateSrc: ko.observableArray([]),
        // enableCheckSrc: [{value:"1",name:"是"}],
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: function() {
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
          common.bill.retListPanel();
        },
//  //需要产品分配-查看状态
//  enableFmt: ko.pureComputed(function() {
//    var enableStatus = viewModel.ProductCombineList.ref("isProductDistri")();
//    return enableStatus == 1 ? "是" : "否";
//  }),
        //浏览状态，点击分配结果没有“删除分配”按钮
        isLook: ko.observable(),
        isLookComputed: ko.pureComputed(function() {
            if(this.billPanelStatus() === CONST.BILLPANELSTATUS.DETAIL){
                return this.isLook(false);
            }else{
                return this.isLook(true);
            }
        },this),

    };
    rendertype = {
      operation: common.rendertype.operation,
        detailRender: common.rendertype.detailRender,
        enableRender:common.rendertype.enableRender,
        booleanRenderText:common.rendertype.whetherRender,
        //判断表格里的状态
        approveFormat: function (obj) {
            var auditStatusValue = viewModel.ProductCombineList.getRow(obj.rowIndex).getValue('auditStatus');
            var auditStatusName;
            switch(auditStatusValue){
                case 0:
                    auditStatusName = '未审核';
                    break;
                case 1:
                    auditStatusName = '已审核';
                    break;
                default:
                    auditStatusName = '未审核';
            }
            obj.element.innerHTML = auditStatusName;
        },
        //分配详情
        allotDetail:function(obj){
            var viewModel = obj.gridObj.viewModel;
            var lookfun = "data-bind=click:lookfun.bind($data," + obj.rowIndex + ")";
            obj.element.innerHTML = '<div class="ui-handle-icon">'+
                '<span class="ui-handle ui-tab-icon-b">'+
                '<a href="#" class="font-c-c" '+
                lookfun +
                ' title="分配结果">分配结果</a>'+
                '</span>'+
                '</div>';
            ko.cleanNode(obj.element);
            ko.applyBindings(viewModel, obj.element);
        }
    };
    events = {
        //编辑状态
        editHandle: function() {
            var self = this;
            var auditStatus = viewModel.ProductCombineList.getCurrentRow().getValue("auditStatus");
            if(auditStatus==1||auditStatus=="1"){
                toastr.error("已审核活动不可编辑！");
                return;
            };
            $(".ui-bill-detail").hide();
            $(".ui-bill-panel").show();
            self.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        },
        //点击选品
        selectionClick: function() {
            var self = this;
            var selectRowArr = viewModel.ProductCombineList.getSelectedRows();
            if(selectRowArr.length !=0){
              var auditStatus = selectRowArr[0].data.auditStatus.value;
            }
            var id;
          if(selectRowArr.length != 1) {
            toastr.warning("请选择一条数据");
            return;
          }
          if( selectRowArr.length > 1){
            }else if( selectRowArr.length < 1){
            }else{
                id = selectRowArr[0].getValue("id");
                viewModel.ProductCombineList.setRowFocus(selectRowArr[0]);
                //根据id查子表
                self.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
                self.findByParentid(id);
                if(auditStatus ==1||auditStatus=="1"){
                    toastr.error("已审核活动不能选品！");
                  return;
                }
                self.goBillPanel();
            }
        },
        clearBaseProp: function(row) {
            row.setValue("id", "");
            row.setValue("code", "");
            row.setValue("name", "");
            row.setValue("creator", "");
            row.setValue("creationTime", "");
            row.setValue("modifier", "");
            row.setValue("modifiedTime", "");
        },
        //进入修改单据页面
        showEditBillPanel: function(index) {
            viewModel.ProductCombineList.setRowFocus(index);
            var id = viewModel.ProductCombineList.getValue("id");
            viewModel.ProductCombineList.originEditData = viewModel.ProductCombineList.getFocusRow().getSimpleData();
            //请求完整主子表信息
            viewModel.fillData(id);
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        },



        search: function (reindex) {
            if(reindex){
                viewModel.ProductCombineList.pageIndex(0);
            }
            viewModel.ProductCombineList.removeAllRows();
            var queryData = searcher.getDataWithOpr();
            var pageSize = viewModel.ProductCombineList.pageSize();
            var pageNumber = viewModel.ProductCombineList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type:"get",
                url:appCtx + viewModel.baseurl,
                dataType:"json",
                data:queryData,
                success:function(data){
                    viewModel.ProductCombineList.setSimpleData(data.content,{unSelect:true});
                    viewModel.ProductCombineList.totalRow(data.totalElements);
                    viewModel.ProductCombineList.totalPages(data.totalPages);
                }
            })
        },
        //清空搜索条件
        cleanSearch: function () {
            searcher.clearSearch();
            viewModel.clearRef(["organizationId","activitytypecId"]);
        },
      // 清空已选参照
      clearRef: function(referids) {
        if(referids&&referids.length>0){
          for(var i=0;i<referids.length;i++){
            var refer = $("#refContainer"+referids[i]).data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
          }
        }
      },
        //页码改变时的回调函数
        pageChange: function (index) {
            viewModel.ProductCombineList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.ProductCombineList.pageSize(size);
            viewModel.search(true);
        },
      //子表页码改变回调
      itemBeforePageChange: function(index) {
        var changeFlag = viewModel.currentChanged();
        if(changeFlag){
          common.dialog.confirmDialog({
            msg1: '当前有修改，是否先保存后跳转？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function () {
              viewModel.saveBill(index);
            },
            onCancel: function(){
            }
          });
        }else{
          viewModel.ProductCombineItem.pageIndex(index);
          viewModel.searchChildFun();
        }
      },
      itemSizeChange:function (size) {
        viewModel.ProductCombineItem.pageSize(size)
        viewModel.searchChildFun();
      },
      itemPageChange: function(index) {
        viewModel.ProductCombineItem.pageIndex(index);
        viewModel.searchChildFun();
      },
      // 判断当前页数据是否变化
      currentChanged: function() {
        var changed = false;
        var childRows = viewModel.ProductCombineItem.getAllRows();
        //判断当前页是否有数据变化：1.子表值变化
        if(childRows.length > 0){
          for(var i = 0; i < childRows.length; i++){
            var status = childRows[i].status;
            if(status != 'nrm'){
              changed = true;
              break;
            }
          }
        }
        return changed;
      },
      //详情
        detail: function() {
            // //确保grid先将行设置为focus状态
            // var selectedRows = viewModel.ProductCombineList.getSelectedRows();
            // if(selectedRows.length != 1) {
            //     //TODO: tips替换
            //     return;
            // }
            setTimeout(function(){
                var curRow = viewModel.ProductCombineList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                viewModel.findByParentid(id);
                viewModel.goDetailPanel();

            }, 0);
        },

        //进入复制单据页面
        showCopyBillPanel: function() {
            var selectedRows = viewModel.ProductCombineList.getSelectedRows();
            viewModel.actselect.createEmptyRow();
            // 只支持单一复制，批量复制需单独处理
            if(selectedRows.length != 1) {
                //TODO: tips替换
                toastr.warning("请选择一条要复制的行");
                return;
            }
            /*$("#copyactref .refer").trigger("click");
            var selectedRows = viewModel.CopyActRef.getSelectedRows();*/
            var copyRow = selectedRows[0];
            var curRow = viewModel.ProductCombineList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData(),u.Row.STATUS.NEW);
            viewModel.ProductCombineList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow);
            viewModel.goBillPanel();
            viewModel.billPanelStatus (CONST.BILLPANELSTATUS.COPY);
            viewModel.findByParentid(id);
            /* curRow.setSimpleData(copyRow.getSimpleData());
             viewModel.ProductCombineList.setRowFocus(curRow);
             var id = copyRow.getValue("id");
             //删除主表主键，编码，审计信息

             viewModel.billPanelStatus =CONST.BILLPANELSTATUS.COPY;*/
        },
        //查询子表数据
        findByParentid: function(id) {
          var pageStatus = viewModel.billPanelStatus();
          var queryData = {};
          queryData.size = viewModel.ProductCombineItem.pageSize();
          queryData.page = viewModel.ProductCombineItem.pageIndex();
          queryData["search_EQ_activity.id"] = id;
          $._ajax({
                url:appCtx + viewModel.baseurlChild + '/findByActivityId',
                type: 'get',
                async: false,
                data: queryData,
                success:function(data){
                  viewModel.ProductCombineItem.removeAllRows();
                  if(pageStatus === "detail"||pageStatus ==="edit"){
                    viewModel.ProductCombineItem.setSimpleData(data.list,{unSelect:true});
                    viewModel.ProductCombineItem.totalRow(data.totalElements);
                    viewModel.ProductCombineItem.totalPages(data.totalPage);
                  }else if(pageStatus ==="copy"){
                    viewModel.ProductCombineItem.setSimpleData(data.list,{unSelect:true,status:"new"});
                    viewModel.ProductCombineItem.totalRow(data.totalElements);
                    viewModel.ProductCombineItem.totalPages(data.totalPage);
                  }
                }
            })
        },
        //删除子表项
        delItems: function() {
          var selectedRows = viewModel.ProductCombineItem.getSelectedRows();
          if(selectedRows.length < 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
          for(var i=0;i<selectedRows.length;i++) {
            viewModel.ProductCombineItem.removeRows(selectedRows[i]);
          }
        },
        //保存
        saveBill: function() {
          var activityId = viewModel.ProductCombineList.getCurrentRow().getValue("id");
          var allRows = viewModel.ProductCombineItem.getAllRows();
          for (var i = 0; i < allRows.length; i++) {
            allRows[i].setValue("activityId", activityId);
            if (!allRows[i].getValue("id")) {
              allRows[i].status = "new";
            }
          }
          var combineItems = viewModel.ProductCombineItem.getSimpleData();
          var dataObj = {
            activityId: activityId,
            list: combineItems
          };
            /* var _ajaxType = viewModel.ActivityCList.getValue("id") ? "put": "post";*/
          $._ajax({
            url: appCtx + viewModel.baseurlChild + "/batchSave",
            type: "post",
            data: JSON.stringify(dataObj),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              viewModel.retListPanel();
              u.hideLoader({hasback: true});
            }
          })
        },
        //复制保存
        copyBill: function() {
            common.dialog.confirmDialog({
                msg1: '确认覆盖？',
                msg2: '此操作不可逆',
                width: '400px',
                type: 'error',
                onOk: function () {
                    var activityId = viewModel.actselect.getSimpleData()[0].code;
                    var allRows = viewModel.ProductCombineItem.getAllRows();
                    for(var i = 0; i < allRows.length; i++){
                        allRows[i].setValue("activityId",activityId);
                        if(!allRows[i].getValue("id")){
                            allRows[i].status = "new";
                        }
                    }
                    var combineItems = viewModel.ProductCombineItem.getSimpleData();
                    var dataObj = {
                        activityId: activityId,
                        list:combineItems
                    };
                    /* var _ajaxType = viewModel.ActivityCList.getValue("id") ? "put": "post";*/
                    $._ajax({
                        url:appCtx + viewModel.baseurlChild + "/copySave",
                        type:"post",
                        data:JSON.stringify(dataObj),
                        contentType : "application/json; charset=utf-8",
                        success:function(data){
                            viewModel.retListPanel();
                            u.hideLoader({hasback:true});
                            viewModel.search();
                        }
                    })
                }
            });
        },
        //取消单据
        cancelBill: function() {
            //清除子表数据
            viewModel.ProductCombineItem.removeAllRows();
            viewModel.actselect.removeAllRows();
            var curRow = viewModel.ProductCombineList.getCurrentRow();
            // 修改，则还原
            if(curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.ProductCombineList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.ProductCombineList.removeRow(curRow);
            }
            viewModel.retListPanel();
        },
        //启用
        enable: function() {
          var selectedRows = viewModel.ProductCombineItem.getSelectedRows();
          if(selectedRows.length < 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurlChild + "/batch-enable",
            data: {ids: ids.join(",")},
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            },
          })
        },
        //停用
        disable: function() {
          var selectedRows = viewModel.ProductCombineItem.getSelectedRows();
          if(selectedRows.length < 1) {
            //TODO: tips替换
            toastr.warning("请选择一条操作的行");
            return;
          }
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurlChild + "/batch-disable",
            data: {ids: ids.join(",")},
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "0");
              }
            },
          })

      },
        //参照选择批量新增子表
        showAddItemsRef: function() {
            viewModel.clearItemsRef();
            var prodState = viewModel.ItemRefList.getValue("prodState");
            var param = viewModel.ItemRefList.getMeta("productRefer", "refparam");
            param = JSON.parse(param);
            if(prodState && prodState.length > 0) {
              if(prodState.charAt(prodState.length-1) === ",") {
                prodState = prodState.slice(0, prodState.length-1);
              }
              param["IN_productState"] = prodState;
            }
            else {
              delete param["IN_productState"];
            }
            $("#addItemsRef").attr("data-refparam", JSON.stringify(param));
            $("#addItemsRef .refer").trigger("click");
        },
        //清空已选产品组合参照
        clearItemsRef: function() {
            viewModel.ItemRefList.setValue("productRefer", "");
            var refer = $("#refContainerproductRefer").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },
        //导入
        importHandle: function() {
          var urlInfo = '/prom/activity-c-products-excel/excelDataImport';
          var urlStatusInfo = '/prom/activity-c-products-excel/excelLoadingStatus'; //请求进度地址参数
          var activityId = viewModel.ProductCombineList.getValue("id");
          urlInfo += "?activityId="+activityId;
          var ele = $('#importFiel')[0]; //挂载元素
          common.fileHandle.importFile(urlInfo,urlStatusInfo,ele);
      },
       //导出
       exportHandle: function() {
        var searchParams = searcher.getDataWithOpr(); //搜索查询参数
         var curCode = viewModel.ProductCombineList.getCurrentRow().getValue("code");
        searchParams['search_EQ_activity.code']=curCode;
        var templateUrl = '/prom/activity-c-products-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  '/prom/activity-c-products-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.ProductCombineItem; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
      searchChild: function (reindex) {
        if(reindex){
          viewModel.ProductCombineItem.pageIndex(0);
        }
        if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
          var flag = false;
          var childRows = viewModel.ProductCombineItem.getAllRows();
          if(childRows.length > 0){
            for(var i = 0; i < childRows.length; i++){
              var status = childRows[i].status;
              if(status != 'nrm'){
                flag = true;
              }
            }
          }
          if(flag){
            common.dialog.confirmDialog({
              msg1: '当前有修改，是否先保存后搜索？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function () {
                viewModel.saveBill(-2);
              },
              onCancel: function(){
              }
            });
          }else{
            viewModel.searchChildFun();
          }
        }else{
          viewModel.searchChildFun();
        }
      },
      //搜索子表方法
      searchChildFun: function(){
        var pageStatus = viewModel.billPanelStatus();
        viewModel.ProductCombineItem.removeAllRows();
        var id = viewModel.ProductCombineList.getCurrentRow().getValue("id");
        var queryData = {};
        // 详情态
        if(pageStatus == CONST.BILLPANELSTATUS.DETAIL) {
          queryData = singledocSearchChildDetail.getDataWithOpr();
        }
        // 编辑态
        else {
          queryData = singledocSearchChild.getDataWithOpr();
        }
        queryData.size = viewModel.ProductCombineItem.pageSize();
        queryData.page = viewModel.ProductCombineItem.pageIndex();
        queryData['search_EQ_activity.id'] = id;
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurlChild+'/findByActivityId',
          dataType:"json",
          data:queryData,
          success:function(data){
            var ActivityProductItemslist = data.list;
            if(pageStatus === "detail"||"edit"){
              viewModel.ProductCombineItem.setSimpleData(ActivityProductItemslist);
              viewModel.ProductCombineItem.totalRow(data.totalElements);
              viewModel.ProductCombineItem.totalPages(data.totalPage);
            }else if(pageStatus ==="copy") {
              viewModel.ProductCombineItem.setSimpleData(ActivityProductItemslist,{unSelect:true,status:"new"});
              viewModel.ProductCombineItem.totalRow(data.totalElements);
              viewModel.ProductCombineItem.totalPages(data.totalPage);
            }
          }
        })
      },
      //清空搜索条件--子表
      cleanSearchChild: function () {
        if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL){
          singledocSearchChildDetail.clearSearch();
        }else{
          singledocSearchChild.clearSearch();
        }
      },

    }
    viewModel = u.extend({},baseData,events,rendertype);

    function appInit(element, params){
        //将模板页渲染到页面上
        element.innerHTML = tpl;
        // 请求产品状态下拉选项
        $._ajax({
          type:"get",
          url:/*appCtx+*/window.pathMap.base+"/cust-doc-defs/cust_doc_code",
          data:{
            cust_doc_code:"QY003"
          },
          success:function(data){
            var newarray = common.dataconvert.toMap(data,"name","code");
            viewModel.prodStateSrc(newarray);
          }
        });
        //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
        app = u.createApp({
            el: element,
            model: viewModel
        });
        // 查询组件初始化
        searcher = new searchbox(
            $("#ProductCombine-searchcontent")[0],
            [
                {
                    type:"refer",
                    key:"activeTypec--id",
                    label:"活动类型",
                    refinfo:"activitytypec",
                    multi:true,
                    referId : "activitytypecId"
                },
                {
                    type:"refer",
                    key:"agency--id",
                    label:"所属办事处",
                    refinfo:"organization_ocm",
                    multi:true,
                    clientParam:{"EQ_isOffice":"1","EQ_isEnable":"1"},
                    referId : "organizationId"
                },
                {
                    type:"text",
                    key:"code",
                    label:"活动编码"
                },
                {
                    type:"text",
                    key:"name",
                    label:"活动名称"
                },
                {
                    type:"daterange",
                    label:"活动开始日期",
                    key:"terminalStartDate"
                },
                {
                    type:"daterange",
                    label:"活动截至日期",
                    key:"terminalEndDate"
                },
                {
                    type:"combo",
                    key:"auditStatus",
                    label:"审核状态",
                    dataSource:CONST.APPROVE,
                },
                // {
                //   type:"checkbox",
                //   key:"enableStatus",
                //   label:"是否启用",
                //   checkedValue: "1",
                //   unCheckedValue: "0",
                // },
//      {
//        type:"radio",
//        key:"enableStatus",
//        label:"启用/停用",
//        dataSource: viewModel.enableRadioSrc
//      },
            ]);
      singledocSearchChild = new searchbox(
        $("#product-searchcontent-child")[0],
        [ {
          type:"text",
          key:"productCode",
          label:"产品编码",
        },
          {
            type:"text",
            key:"productName",
            label:"产品名称",
          },
        ]);
      singledocSearchChildDetail = new searchbox(
        $("#product-searchcontent-child-detail")[0],
        [{
          type:"text",
          key:"productCode",
          label:"产品编码",
        },
          {
            type:"text",
            key:"productName",
            label:"产品名称",
          },

        ]);
        billfooter = new Billfooter(
            $(".ui-bill-footer").get(),
            viewModel,
            "ProductCombineList"
        );
        // 列表查询数据(无查询条件)
        viewModel.search();
    }

    function afterRender(){
        //绑定输入框enter事件
        $('#ProductCombine-searchcontent input').off("keydown").on("keydown",function(e){
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        var pagebcomp = $("#pagination")[0]['u.pagination'];
        // pagebcomp.update({showState:false});
        // 点击增行 参照带入多字段
        viewModel.ItemRefList.on("productRefer.valuechange", function(obj) {
            // 清空参照时不增行(点取消)
            if(!obj.newValue) {
                return;
            }
            var refer = $("#refContainerproductRefer").data("uui.refer");
            var refValues = refer.values;
            if(refValues && refValues.length > 0) {
              var existItems = viewModel.ProductCombineItem.getSimpleData();
              var needAddItems = [];
                for(var i=0;i<refValues.length;i++) {
                    var refpk = refValues[i].refpk;
                    var row = undefined;
                    var productId = undefined;
                    var combineId = undefined;
                    if(refValues[i].isproduct == "1") {
                        row = viewModel.ProductCombineItem.getRowByField("productId", refpk);
                        productId = refpk;
                    }
                    else {
                        row = viewModel.ProductCombineItem.getRowByField("combineId", refpk);
                        combineId = refpk
                    }
                    if(!row || row.status === u.Row.STATUS.FALSE_DELETE) {
                      var needAddItem = {};
                        needAddItem.showCode =  refValues[i].refcode;
                        needAddItem.showName = refValues[i].refname;
                        needAddItem.productCategoryName = refValues[i].productCategoryName; //品类
                        needAddItem.productSaleSeriesName = refValues[i].saleSeriesName; //系列
                        needAddItem.mainColorDocName = refValues[i].mainColorDocName; //色号
                        needAddItem.productModelName = refValues[i].productModelName; //型号
                        needAddItem.standardName = refValues[i].standardName; //尺寸/规格
                        needAddItem.combineId = combineId;
                        needAddItem.productId = productId;
                        needAddItem.persistStatus = "new";
                        needAddItems.push(needAddItem);
                    }
                }
              var concatItems = needAddItems.concat(existItems);
              viewModel.ProductCombineItem.setSimpleData(concatItems, {unSelect: true}, true);

            }
        });
        viewModel.actselect.on("code.valuechange",function (obj) {
            if(!obj.newValue){
                return;
            }
            var refer = $("#refContainercode").data("uui.refer");
            if(refer&&refer.values.length>0){
                var curValue = refer.values;
                var name = curValue[0].name;
                var activeTypecName = curValue[0].activityTypeName;
                var agencyName = curValue[0].agencyName;
                viewModel.actselect.getCurrentRow().setValue("name",name);
                viewModel.actselect.getCurrentRow().setValue("activeTypecName",activeTypecName);
                viewModel.actselect.getCurrentRow().setValue("agencyName",agencyName);
            }
        });
      //展开搜索
      $(".searchChild-btn").bind('click',function(){
        if($(this).text() == "展开搜索"){
          $(this).text("收起搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideDown(300);
        }else{
          $(this).text("展开搜索").closest('.ui-bill-body').siblings('.ui-searchbox').find('.searchChild-area').slideUp(300);
        }
      });
    }

    function init(element, params) {
        appInit(element, params);
        afterRender();
        var refRow = viewModel.ItemRefList.createEmptyRow();
        viewModel.actselect.createEmptyRow();
        viewModel.ItemRefList.setRowFocus(refRow);
        window.vm = viewModel;
        window.app = app;

    }

    return {
        init: init
    }
});
