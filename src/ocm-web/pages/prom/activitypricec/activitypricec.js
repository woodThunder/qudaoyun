define(['text!./activitypricec.html','ocm_common','searchbox','billfooter','editcard','./meta.js','ocm_global'], function (tpl,common,searchbox,Billfooter) {
    'use strict'
  var app,baseData,events,rendertype,viewModel,dialog_priceformula,searcher,billfooter,dialog_bomprice,singledocSearchChild,singledocSearchChildDetail,picBigDialog,searchDt;
  baseData = {
        baseurl : "/prom/activity-c",
        baseurlChild :'/prom/sale-activity-prices',
        relationurl : '/prod-info-photo-info',//图片关系存储
        ActivityPriceList: new u.DataTable(ActivityPriceC),
        ActivityPriceItems: new u.DataTable(ActivityPriceItemC),
        ProductTabRefList: new u.DataTable(ProductTabRef),
        ActivityPriceFormulaList: new u.DataTable(ActivityPriceFormula),
        actselect:new u.DataTable(ActivityPriceC),
    poProductStrucs: new u.DataTable(poproductstrucsmeta),
    BomPriceTree: new u.DataTable(BomPrice),
        FileList: new u.DataTable(FileMeta),
        ProdInfoAndPhotoInfoList: new u.DataTable(ProdInfoAndPhotoInfometa),
        billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        enableFormat: common.format.enableFormat,
        saleEntitySrc: CONST.SALEENTITY,
        //跳转单据页
        goBillPanel : common.bill.goBillPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
         //跳转图片维护页
         goPicPanel:common.bill.goPicPanel,
         //返回列表页
         retListPanel: function() {
           viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
           viewModel.cleanSearchChild();
           common.bill.retListPanel();
         },
    };
    rendertype = {
        operation: common.rendertype.operation4auth,
        detailRender: common.rendertype.detailRender,
        enableRender:common.rendertype.enableRender,
        //判断表格里的状态
        approveFormat: function (obj) {
            var auditStatusValue = viewModel.ActivityPriceList.getRow(obj.rowIndex).getValue('auditStatus');
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
        priceItemRender: function(obj) {
          var productType = viewModel.ActivityPriceItems.getRow(obj.rowIndex).getValue("isCombine");
          if(Boolean(productType)&&!productType){
            obj.element.innerHTML = '<a href="#" data-bind="click: showBOM">明细</a>';
          }
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
      //列表图片维护操作
      operationPic:function(obj){
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var uploadBtn="data-bind=click:picPage.bind($data," + obj.rowIndex + ","+dataTableRowId+")";
        obj.element.innerHTML = '<div class="ui-handle-icon">'+
          '<span class="ui-handle-word">'+
          '<a href="#"'+
          uploadBtn +
          ' title="图片维护">图片维护</a>'+
          '</span>'+
          '</div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //  表格图片
      picShow:function(obj){
        var prodPhotoInfoUrl=viewModel.ProdInfoAndPhotoInfoList.getRow(obj.rowIndex).getValue("prodPhotoInfoUrl");
        var prodUrl="";
        if(prodPhotoInfoUrl){
          //特殊字符'.', '/' ,'-'  替换
          var prodUrl=prodPhotoInfoUrl.replace(/\./g,"spot").replace(/\//g,"linePath").replace(/\-/g,"lineThrough");
          obj.element.innerHTML = '<img width="30" height="30" src='+prodPhotoInfoUrl+ ' data-bind="click: picBig.bind($data,' + "'" + prodUrl + "'" + ')">';
        }
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //包件展开
      bomStrutsRenderType:function(obj){
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var isCombine = obj.row.value['isCombine']
        var bomexpandfun = "data-bind=click:bomexpand.bind($data," + dataTableRowId + ")";
        if(isCombine===1){
          obj.element.innerHTML =
            '<a class="ui-a-detail" ' + bomexpandfun + '><i class="uifont icon-add"></i>' + obj.value + '</a>';
        }else {
          obj.element.innerHTML =
            '<a class="ui-a-detail" ' + bomexpandfun + '>' + obj.value + '</a>';
        }
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      precision2Render: common.rendertype.precision2Render,
    };
    events = {
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function (reindex) {
            if(reindex){
                viewModel.ActivityPriceList.pageIndex(0);
            }
            viewModel.ActivityPriceList.removeAllRows();
            var queryData = searcher.getDataWithOpr();
            var pageSize = viewModel.ActivityPriceList.pageSize();
            var pageNumber = viewModel.ActivityPriceList.pageIndex();
            queryData.page = pageNumber;
            queryData.size = pageSize;
            $._ajax({
                type:"get",
                url:appCtx + viewModel.baseurl,
                dataType:"json",
                data:queryData,
                success:function(data){
                    viewModel.ActivityPriceList.setSimpleData(data.content,{unSelect:true});
                    viewModel.ActivityPriceList.totalRow(data.totalElements);
                    viewModel.ActivityPriceList.totalPages(data.totalPages);
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
            viewModel.ActivityPriceList.pageIndex(index);
            viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function (size) {
            viewModel.ActivityPriceList.pageSize(size);
            viewModel.search(true);
        },
        //详情编辑
        editHandle: function() {
          var self = this;
          var auditStatus = viewModel.ActivityPriceList.getCurrentRow().getValue("auditStatus");
          if(auditStatus==1||auditStatus=="1"){
            toastr.error("活动已审核！");
            return;
          };
          $(".ui-bill-detail").hide();
          var activityid = viewModel.ActivityPriceList.getValue("id");
          viewModel.ActivityPriceItems.setMeta("customerId","refparam",'{"activityId":"'+activityid+'"}');
          viewModel.ActivityPriceItems.setMeta("shopId","refparam",'{"activityId":"'+activityid+'"}');
          $(".ui-bill-panel").show();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        },
        //进入新增单据页
        showAddBillPanel: function() {
            var selectedRows = viewModel.ActivityPriceList.getSelectedRows();
            // 只支持单一复制，批量复制需单独处理
            if(selectedRows.length != 1) {
              toastr.warning("请选择一条要操作的行")
              return;
            }
            var auditStatus = viewModel.ActivityPriceList.getSelectedRows()[0].getValue("auditStatus");
            var activityid = viewModel.ActivityPriceList.getValue("id");
            if(auditStatus=="1"||auditStatus ===1){
                toastr.error("活动已审核！");
                return;
            }
            var curRow =  viewModel.ActivityPriceList.getSelectedRows()[0];
            viewModel.ActivityPriceItems.removeAllRows();
            viewModel.ActivityPriceFormulaList.removeAllRows();
            var id = curRow.getValue("id");
            viewModel.ActivityPriceList.setRowFocus(curRow);
            viewModel.findByParentid(id);
            viewModel.goBillPanel();

            viewModel.ActivityPriceItems.setMeta("customerId","refparam",'{"activityId":"'+activityid+'"}');
            viewModel.ActivityPriceItems.setMeta("shopId","refparam",'{"activityId":"'+activityid+'"}');
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
            viewModel.ActivityPriceList.setRowFocus(index);
            var curRow = viewModel.ActivityPriceList.getSelectedRows()[0];
            var id = curRow.getValue("id");
            viewModel.findByParentid(id)
            viewModel.ActivityPriceList.originEditData = viewModel.ActivityPriceList.getFocusRow().getSimpleData();
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        },
        //进入复制单据页
        showCopyBillPanel: function() {
            var selectedRows = viewModel.ActivityPriceList.getSelectedRows();
            viewModel.actselect.createEmptyRow();
          // 只支持单一复制，批量复制需单独处理
            if(selectedRows.length != 1) {
                //TODO: tips替换
                toastr.warning("请选择一条要复制的行")
                return;
            }
            var copyRow = selectedRows[0];
            var curRow = viewModel.ActivityPriceList.createEmptyRow();
            curRow.setSimpleData(copyRow.getSimpleData());
            viewModel.ActivityPriceList.setRowFocus(curRow);
            var id = copyRow.getValue("id");
            //查询子表数据
            viewModel.findByParentid(id);
            // 删除主表主键，编码，审计信息
            // viewModel.clearBaseProp(curRow);
            // // 删除子表主键，子表主表关联
            // var subRows = viewModel.ActivityPriceItems.getAllRows();
            // for(var i=0; i<subRows.length; i++) {
            //     viewModel.clearBaseProp(subRows[i]);
            //     subRows[i].setValue("parentid", "");
            // }
            viewModel.goBillPanel();
            viewModel.billPanelStatus (CONST.BILLPANELSTATUS.COPY);
        },
        //复制保存
        copyBill: function() {
            common.dialog.confirmDialog({
                msg1: '所选活动的已有价格清单会被覆盖',
                msg2: '确认覆盖？',
                width: '400px',
                type: 'error',
                onOk: function () {
                    var activityId = viewModel.actselect.getCurrentRow().getValue("code");
                    var activityC = viewModel.ActivityPriceList.getCurrentRow().getSimpleData();
                    var priceList = viewModel.ActivityPriceItems.getSimpleData();
                    var formulaList = viewModel.ActivityPriceFormulaList.getSimpleData();
                    var dataObj = {
                        activityId: activityId,
                        activityC:activityC,
                        priceList:priceList,
                        formulaList:formulaList,
                    };
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
        //详情
        detail: function() {
            //确保grid先将行设置为focus状态
            setTimeout(function(){
                var curRow = viewModel.ActivityPriceList.getCurrentRow();
                var id = curRow.getValue("id");
                viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
                viewModel.findByParentid(id);
                viewModel.goDetailPanel();
            }, 0);
        },
        //分页查询子表数据
        findByParentid: function(id) {
        var pageStatus = viewModel.billPanelStatus();
        var queryData = {};
        // 详情态
        if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
          queryData = singledocSearchChildDetail.getDataWithOpr();
        }
        // 编辑态
        else {
          queryData = singledocSearchChild.getDataWithOpr();
        }
        queryData.size = viewModel.ActivityPriceItems.pageSize();
        queryData.page = viewModel.ActivityPriceItems.pageIndex();
        queryData["search_EQ_activity.id"] = id;
        $._ajax({
          url:appCtx + viewModel.baseurlChild + "/findByActivityId",
          type: 'get',
          async: false,
          data: queryData,
          success:function(data){
            var ActivityPriceItemslist = data.priceList;
            var ActformulaList = data.formulaList;
            if(pageStatus === "detail"||"default"){
              viewModel.ActivityPriceItems.setSimpleData(ActivityPriceItemslist);
              viewModel.ActivityPriceFormulaList.setSimpleData(ActformulaList);
              viewModel.ActivityPriceItems.totalRow(data.totalElements);
              viewModel.ActivityPriceItems.totalPages(data.totalPage);
            }else if(pageStatus ==="copy") {
              viewModel.ActivityPriceItems.setSimpleData(ActivityPriceItemslist,{unSelect:true,status:"new"});
              viewModel.ActivityPriceFormulaList.setSimpleData(ActformulaList,{unSelect:true,status:"new"});
              viewModel.ActivityPriceItems.totalRow(data.totalElements);
              viewModel.ActivityPriceItems.totalPages(data.totalPage);
            } }
        })
      },
        //保存单据
        saveBill: function() {
            var productCombineData = viewModel.ActivityPriceList.getCurrentRow().getSimpleData();
            var ActivityPriceItemsData = viewModel.ActivityPriceItems.getSimpleData();
            var formulaData = viewModel.ActivityPriceFormulaList.getSimpleData();
            productCombineData.priceList = ActivityPriceItemsData;
            productCombineData.formulaList = formulaData;
            productCombineData.activityId = productCombineData.id;
            var _ajaxType = viewModel.ActivityPriceList.getValue("id") ? "put": "post";
            $._ajax({
                url:appCtx + viewModel.baseurlChild + "/batchSave",
                type:"post",
                data:JSON.stringify(productCombineData),
                contentType : "application/json; charset=utf-8",
                success:function(data){
                  viewModel.ActivityPriceList.getCurrentRow().setSimpleData(data);
                  viewModel.retListPanel();
                }
            })
        },
        //取消单据
        cancelBill: function() {
            var curRow = viewModel.ActivityPriceList.getCurrentRow();
            // 修改，则还原
            if(curRow.getValue("id")) {
                curRow.setSimpleData(viewModel.ActivityPriceList.originEditData)
            }
            // 新增或复制，则删除
            else {
                viewModel.ActivityPriceList.removeRow(curRow);
                viewModel.ActivityPriceItems.removeAllRows();
            }
            viewModel.retListPanel();
        },
        //复制取消单据
        copyCancelBill:function () {
            var curRow = viewModel.ActivityPriceList.getCurrentRow();
            viewModel.ActivityPriceList.removeRow(curRow);
            viewModel.ActivityPriceItems.removeAllRows();
            viewModel.ActivityPriceFormulaList.removeAllRows();
            viewModel.retListPanel();
        },
        //启用
        enable: function() {
            var selectedRows = viewModel.ActivityPriceList.getSelectedRows();
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
                    }
                }
            })
        },
        //停用
        disable: function() {
            var selectedRows = viewModel.ActivityPriceList.getSelectedRows();
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
                    }
                }
            })
        },
        showAddItemsRef: function() {
            viewModel.clearItemsRef();
            var pageStatus = viewModel.billPanelStatus();
            var activityId;
            if(pageStatus === "copy"){
              activityId = viewModel.actselect.getCurrentRow().getValue("code");
              $("#addItemsRef").attr("data-refparam",JSON.stringify({"activityId":activityId}));
              $("#addItemsRef").find(".refer").trigger("click");
            }else{
              activityId = viewModel.ActivityPriceList.getCurrentRow().getValue("id");
              $("#addItemsRef").attr("data-refparam",JSON.stringify({"activityId":activityId}));
              $("#addItemsRef").find(".refer").trigger("click");
            }
        },
        //清空已选产品组合参照
        clearItemsRef: function() {
            viewModel.ProductTabRefList.setValue("productref", "");
            var refer = $("#refContainerproductref").data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
        },
        // 自定义页签参照
        showTabRef: function() {
            $("#productTabRef .refer").trigger("click");
        },
        // 引用促销基础价
        importBasePrice: function() {
            var activityId = viewModel.ActivityPriceList.getValue("promoActivityId");
            $.ajax({
                type: "post",
                url: appCtx + viewModel.baseurl + "/promo_basicproduct",
                data: {activityId: activityId},
                success: function(items) {
                    // TODO: 判断表体行唯一性，行状态设置为new
                    if(items && items.length > 0) {
                        for(var i=0;i<items.length;i++) {
                            var row = viewModel.ActivityPriceItems.createEmptyRow();
                            row.setSimpleData(items[i],"new");
                        }
                    }
                }
            })
        },
        // 停用价格子表项
        disableItems: function() {
            var selectedRows = viewModel.ActivityPriceItems.getSelectedRows();
            selectedRows.forEach(function(row) {
                row.setValue("isEnable", 0);
            })
        },
        //新增子表项
        addItem: function() {
            var curRow = viewModel.ActivityPriceItems.createEmptyRow();
        },
        //删除子表项
        delItems: function() {
            var selectedRows = viewModel.ActivityPriceItems.getSelectedRows();
            for(var i=0;i<selectedRows.length;i++) {
                selectedRows[i].setValue("dr", "1");
            }
            viewModel.ActivityPriceItems.removeRows(selectedRows);
        },
        // 价格公式
        showPriceFormula: function() {
            var activityid = viewModel.ActivityPriceList.getValue("id");
            viewModel.ActivityPriceFormulaList.setMeta("showCode","refparam",'{"activityId":"'+activityid+'"}');
            // 保存原始价格公式，用于取消时还原
            viewModel.ActivityPriceFormulaList.originFormula = viewModel.ActivityPriceFormulaList.getDataByRule("all");
            if(!dialog_priceformula) {
                dialog_priceformula = u.dialog({content: "#dialog_priceformula", hasCloseMenu: true, "width":"900px",closeFun: viewModel.closeFormula});
            }
            else {
              var FormulaList = $("#repaintFormulaList").data("gridComp");
              FormulaList.repaintDivs()
              dialog_priceformula.show();
            }

        },
        // 价格公式增行
        addPriceFormula: function() {
            viewModel.ActivityPriceFormulaList.createEmptyRow({unSelect:true});
        },
        // 价格公式删行
        delPriceFormula: function() {
            var selectedRows = viewModel.ActivityPriceFormulaList.getSelectedRows();
            viewModel.ActivityPriceFormulaList.removeRows(selectedRows);
        },
        // 价格公式确认
        confirmPriceFormula: function() {
          var priceList = viewModel.ActivityPriceFormulaList;

          var priceObj = priceList.getSimpleData();
          for (var i = 0; i < priceObj.length; i++) {
            var batchBasePriceId = priceObj[i].batchBasePriceId;
            var saleManagerPriceId = priceObj[i].saleManagerPriceId;
            var productCode = priceObj[i].showCode;
            var agencyName = priceObj[i].agencyName;
            var floatScale = priceObj[i].floatScale;
            var persistStatus = priceObj[i].persistStatus;
            var seriesName = priceObj[i].seriesName;
            var j=i+1;
            if(j<priceObj.length){
              var seriesNameNext = priceObj[j].seriesName;
              var productCodeNext = priceObj[j].showCode;
            }
            if(persistStatus == "new"){
              if ((!batchBasePriceId && !saleManagerPriceId ) || (saleManagerPriceId && batchBasePriceId)) {
                toastr.error('价格表二选一且不能为空！');
                return;
              } else if (seriesName&&seriesNameNext&&persistStatus!=="fdel"&&(seriesName === seriesNameNext)) {
                toastr.error('产品系列唯一！');
                return;
              } else if (productCode&&productCodeNext&&persistStatus!=="fdel"&&(productCode === productCodeNext)) {
                toastr.error('产品编码唯一！');
                return;
              } else if(productCode&&seriesName){
                toastr.error('单行产品编码与产品系列不可同时填写！');
                return;
              }else if(!agencyName){
                toastr.error('办事处不能为空');
                return;
              }else if(!floatScale){
                toastr.error('上浮比例不能为空');
                return;
              }
            }
            seriesNameNext="";
            productCodeNext="";
          }
          dialog_priceformula.hide();
        },
        // 价格公式取消
        closeFormula: function() {
            viewModel.ActivityPriceFormulaList.removeAllRows();
            viewModel.ActivityPriceFormulaList.setData(viewModel.ActivityPriceFormulaList.originFormula);
        },
        // 根据价格公式计算价格，如果没有匹配到对应产品系列，则使用产品系列为空对应的批发基础价表 TODO:如何使用多维度价格列表
        getPriceByFormula: function(seriesId, productId, combineId) {
            var row = viewModel.ActivityPriceFormulaList.getRowByField("seriesId", seriesId);
            var formulaList = viewModel.ActivityPriceFormulaList.getAllRows();
            var priceList = viewModel.ProductTabRefList.getSelectedRows()[0];
            var curprice;
            if(!row) {
                row = viewModel.ActivityPriceFormulaList.getRowByField("seriesId", "");
                if(!row) {
                    row = viewModel.ActivityPriceFormulaList.getRowByField("seriesId", null);
                }
            }
            // 没有匹配到价格公式
            if(!row) {
                return null;
            }
            else {
                var data = {
                    priceList: priceList,
                    formulaList:formulaList
                };
                // $.ajax({
                //     type:"post",
                //     url: appCtx + viewModel.baseurl + "/queryFormulaPrice",
                //     async: false,
                //     data: data,
                //     success: function(result) {
                //
                //     }
                // })
                return priceList
            }

        },
        // 价格子表判重
        existPriceItem: function(priceItem) {
            var exist = false;
            var fields = [];
            var productId = priceItem.productId;
            if(productId) {
                fields.push({field:"productId", value:productId});
            }
            var channelId = priceItem.channelId;
            if(channelId) {
                fields.push({field:"channelId", value:channelId});
            }
            var customerId = priceItem.customerId;
            if(customerId) {
                fields.push({field:"customerId", value:customerId});
            }
            var officeId = priceItem.officeId;
            if(officeId) {
                fields.push({field:"officeId", value:officeId});
            }
            var rows = viewModel.ActivityPriceItems.getRowsByFields(fields);
            if(rows && rows.length >0) {
                exist = true;
            }
            //TODO: 演示暂时
            return false;
        },
        // 展示产品BOM
        showBOM: function() {
        //TODO: 请求后台BOM价格明细
        setTimeout(function(){
          var parentId = viewModel.ActivityPriceItems.getCurrentRow().getValue("id");
          viewModel.BomPriceTree.removeAllRows();
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurlChild + "/findByParentId",
            data: {parentId:parentId},
            success: function(detailBom) {
              viewModel.BomPriceTree.setSimpleData(detailBom);
              if(dialog_bomprice) {
                dialog_bomprice.show();
              }
              else {
                dialog_bomprice = u.dialog({content:"#dialog_bomprice",hasCloseMenu:true,width:"900px"});
              }
            }
          });
        }, 0)
      },
        // Bom确认
        confirmBom:function() {
        dialog_bomprice.hide();
      },
      //导入产品
      importHandle: function() {
        var urlInfo = "/prom/sale-activity-prices-excel/getDataFromExcelDataImport"; //导入地址参数
        // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
        var ele = $('#importFiel')[0]; //挂载元素
        var setDate = function (data) {
          return viewModel.ActivityPriceItems.addSimpleData(data, "new");
        };
        common.fileHandle.importToPage(urlInfo,ele,setDate);
      },
      //导出产品
      exportHandle: function() {
        var searchParams = {}; //搜索查询参数
        var curCode = viewModel.ActivityPriceList.getCurrentRow().getValue("code")
        searchParams['search_EQ_activity.code']=curCode;
        var templateUrl = '/prom/sale-activity-prices-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  '/prom/sale-activity-prices-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.ActivityPriceItems; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData,ele,searchParams,templateUrl,excelDataUrl);
      },
      //导入价格公式
      importHandle2: function() {
        var urlInfo = "/prom/sale-price-formulas-excel/getDataFromExcelDataImport"; //导入地址参数
        // var urlStatusInfo = '/prom/activity-store-excel/excelLoadingStatus';
        var ele = $('#importFiel')[0]; //挂载元素
        var setDate = function (data) {
          return viewModel.ActivityPriceFormulaList.setSimpleData(data,{status:"new"});
        };
        common.fileHandle.importToPage(urlInfo,ele,setDate);
      },
      //导出价格公式
      exportHandle2: function() {
        var searchParams = {}; //搜索查询参数
        var templateUrl = '/prom/sale-price-formulas-excel/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl =  '/prom/sale-price-formulas-excel/excelDataExport'; //导出数据地址参数
        var listData = viewModel.ActivityPriceFormulaList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportTemplate(listData,ele,"",templateUrl,excelDataUrl);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)--子表
      searchChild: function (reindex) {
        if(reindex){
          viewModel.ActivityPriceItems.pageIndex(0);
        }
        if(viewModel.billPanelStatus == CONST.BILLPANELSTATUS.EDIT){
          var flag = false;
          var childRows = viewModel.ActivityPriceItems.getAllRows();
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
        viewModel.ActivityPriceItems.removeAllRows();
        var id = viewModel.ActivityPriceList.getCurrentRow().getValue("id");
        var queryData = {};
        // 详情态
        if(viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
          queryData = singledocSearchChildDetail.getDataWithOpr();
        }
        // 编辑态
        else {
          queryData = singledocSearchChild.getDataWithOpr();
        }
        queryData.size = viewModel.ActivityPriceItems.pageSize();
        queryData.page = viewModel.ActivityPriceItems.pageIndex();
        queryData['search_EQ_activity.id'] = id;
        $._ajax({
          type:"get",
          url:appCtx + viewModel.baseurlChild+'/findByActivityId',
          dataType:"json",
          data:queryData,
          success:function(data){
            var ActivityPriceItemslist = data.priceList;
            var ActformulaList = data.formulaList;
            if(pageStatus === "detail"||"add"){
              viewModel.ActivityPriceItems.setSimpleData(ActivityPriceItemslist);
              viewModel.ActivityPriceFormulaList.setSimpleData(ActformulaList);
              viewModel.ActivityPriceItems.totalRow(data.totalElements);
              viewModel.ActivityPriceItems.totalPages(data.totalPage);
            }else if(pageStatus ==="copy") {
              viewModel.ActivityPriceItems.setSimpleData(ActivityPriceItemslist,{unSelect:true,status:"new"});
              viewModel.ActivityPriceFormulaList.setSimpleData(ActformulaList,{unSelect:true,status:"new"});
              viewModel.ActivityPriceItems.totalRow(data.totalElements);
              viewModel.ActivityPriceItems.totalPages(data.totalPage);
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
      itemSizeChange:function (size) {
        viewModel.ActivityPriceItems.pageSize(size)
        viewModel.findByParentid();
      },
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
          viewModel.ActivityPriceItems.pageIndex(index);
          viewModel.findByParentid();
        }
      },
      // 判断当前页数据是否变化
      currentChanged: function() {
        var changed = false;
        var childRows = viewModel.ActivityPriceItems.getAllRows();
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
      itemPageChange: function(index) {
        viewModel.ActivityPriceItems.pageIndex(index);
        viewModel.findByParentid();
      },
      //进入图片维护
      //进入图片维护页
      picPage:function(index,rowId){
        var currentData = viewModel.ActivityPriceItems.getRowByRowId(rowId).getSimpleData();
        viewModel.picRowId = currentData.productId;
        //根据id查图片维护
        $.ajax({
          url:appCtx + viewModel.relationurl + '/findByProductInfoId',
          type:'get',
          data:{
            productInfoId:viewModel.picRowId
          },
          contentType: "application/json; charset=utf-8",
          success:function(data){
            viewModel.ProdInfoAndPhotoInfoList.setSimpleData(data,{unSelect:true});
          }
        });
        viewModel.goPicPanel();
      },
      //大图
      picBig:function(url){
        var picUrl=url.replace(/spot/g,".").replace(/linePath/g,'\\').replace(/lineThrough/g,'\-');
        if(!picBigDialog) {
          picBigDialog = u.dialog({content:"#picBig-dialog",hasCloseMenu:true});
        }
        else {
          picBigDialog.show();
        }
        $("#picBig-dialog").parent().parent().css("width","auto");
        $("#picBig").attr("src",picUrl);
      },
      //图片添加返回列表页
      picBack:function(){
        var postdata = viewModel.ProdInfoAndPhotoInfoList.getSimpleData();
        var changedata=[];
        var tip="";
        for(var i=0;i< postdata.length;i++){
          if(postdata[i].persistStatus!="nrm"){
            changedata.push(postdata[i]);
          }
        }
        if(changedata.length>0){
          var picArr = function(){
            for (i=0;i<changedata.length;i++){
              tip+=changedata[i].prodPhotoInfoCode +"，";
            }
            return tip.substring(0,tip.length-1)
          }
          toastr.warning("图片" + picArr() +"没有保存");
          return false
        }
        else{
          viewModel.goDetailPanel();
        }
      },
      bomexpand:function(rowId){
        var curData = viewModel.ActivityPriceItems.getRowByRowId(rowId).getSimpleData();
        var id = curData.id;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurlChild + "/findByParentId",
          data: {parentId:id},
          success: function(detailBom) {
            viewModel.poProductStrucs.setSimpleData(detailBom);
            if(!viewModel.bomexpandialog){
              viewModel.bomexpandialog = u.dialog({
                id: 'dialog_bomexpand',
                content: "#dialog_bomexpand",
                hasCloseMenu: true,
                width: "700px"
              });
            }else{
              viewModel.bomexpandialog.show();
            }
          }
        });
      },
    }
    viewModel = u.extend({},baseData,events,rendertype);

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
            $("#ActivityPrice-searchcontent")[0],
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
                    clientParam:{"EQ_isOffice":"1","EQ_isEnable":"1"},
                    multi:true,
                    referId : "organizationId"
                },
                {
                    type:"text",
                    key:"code",
                    label:"活动编码",
                },
                {
                    type:"text",
                    key:"name",
                    label:"活动名称",
                },
                {
                    type:"daterange",
                    key:"terminalStartDate",
                    label:"活动开始日期",
                },
                {
                    type:"daterange",
                    key:"terminalEndDate",
                    label:"活动截至日期",
                },
                {
                    type:"combo",
                    key:"auditStatus",
                    label:"审核状态",
                    dataSource:CONST.APPROVE,
                },
                //    {
                //   type:"checkbox",
                //   key:"isenable",
                //   label:"是否启用",
                //   checkedValue:1,
                //   unCheckedValue:0
                // }

            ]);
      singledocSearchChild = new searchbox(
        $("#price-searchcontent-child")[0],
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
          {
            type:"refer",
            key:"productModelName",
            label:"产品型号",
            refinfo:"productModel",
          },
          {
            type:"refer",
            key:"seriesId",
            label:"产品系列",
            refinfo:"productSaleSeries",
          },
          {
            type:"range",
            key:"Long",
            keyStart:"longStart",
            keyEnd:"longEnd",
            label:"长(单位:mm)",
          },
          {
            type:"range",
            key:"width",
            label:"宽(单位:mm)",
            keyStart:"widthStart",
            keyEnd:"widthEnd",
          },
          {
            type:"range",
            key:"high",
            label:"高(单位:mm)",
            keyStart:"highStart",
            keyEnd:"highEnd",
          },
        ], undefined, true);
      singledocSearchChildDetail = new searchbox(
        $("#price-searchcontent-child-detail")[0],
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
          {
            type:"refer",
            key:"productModelName",
            label:"产品型号",
            refinfo:"productModel",
          },
          {
            type:"refer",
            key:"seriesId",
            label:"产品系列",
            refinfo:"productSaleSeries",
          },
          {
            type:"range",
            key:"Long",
            keyStart:"longStart",
            keyEnd:"longEnd",
            label:"长(单位:mm)",
          },
          {
            type:"range",
            key:"width",
            label:"宽(单位:mm)",
            keyStart:"widthStart",
            keyEnd:"widthEnd",
          },
          {
            type:"range",
            key:"high",
            label:"高(单位:mm)",
            keyStart:"highStart",
            keyEnd:"highEnd",
          },
        ], undefined, true);
      // billfooter = new Billfooter(
        //     $(".ui-bill-footer").get(),
        //     viewModel,
        //     "ActivityPriceList"
        // )
        viewModel.search();
        var refRow = viewModel.ProductTabRefList.createEmptyRow();
        viewModel.ProductTabRefList.setRowFocus(refRow);
    }

    function afterRender(){
        //绑定输入框enter事件
        $('#ActivityPrice-searchcontent input').off("keydown").on("keydown",function(e){
            if (e.keyCode == 13) {
                $(this).blur();
                viewModel.search();
            }
        });
        // 参照带入多字段
        viewModel.ProductTabRefList.on("productref.valuechange", function(obj) {
            // 清空参照时不增行
            if(!obj.newValue) {
                return;
            }
            var formulaList = viewModel.ActivityPriceFormulaList.getSimpleData();
            var activityId = viewModel.ActivityPriceList.getValue("id");
            var refer = $("#refContainerproductref").data("uui.refer");
            var querydata = {};
            var refValues = refer.values;
            var pricelists;
            if(refValues && refValues.length > 0) {
              for(var i=0; i<refValues.length;i++) {
                    var product = {};
                    //产品
                    if(refValues[i].isproduct == "1") {
                      refValues[i].productId = refValues[i].refpk;
                      refValues[i].productSaleSeriesId = refValues[i].saleSeriesId;
                      refValues[i].productSaleSeriesName = refValues[i].saleSeriesName;
                      refValues[i].isEnable = 1;
                    }
                    //产品组合
                    else {
                      refValues[i].combineId = refValues[i].refpk;
                      refValues[i].isEnable = 1;
                    }
              }
              querydata.priceList = refValues;
              querydata.formulaList=formulaList;
              querydata.activityId =activityId;
              $._ajax({
                type:"post",
                url: appCtx + viewModel.baseurlChild + "/queryFormulaPrice",
                async: false,
                contentType : 'application/json',
                data: JSON.stringify(querydata),
                success: function(result) {
                  pricelists = result.priceList;
                  var curFormulaList = viewModel.ActivityPriceFormulaList.getCurrentRow();
                  if(!curFormulaList){
                    return;
                  }
                  var errMsg = result.tipMsg;
                  if(errMsg){
                    toastr.warning(errMsg);
                  }
                  var floatScale = curFormulaList.getValue("floatScale");
                  floatScale = parseFloat(floatScale);
                  for(var i=0; i<pricelists.length;i++){
                    var price = pricelists[i].price;
                    price = parseFloat(price);
                    price *=1+floatScale;
                    pricelists[i].price==null?"": price;
                    refValues[i].price = pricelists[i].price;
                  }
                  // console.log(result);
                }
              });
              for(var j = 0;j<pricelists.length;j++){
                if(formulaList && formulaList.length > 0) {
                  var exist = viewModel.existPriceItem(pricelists[j]);
                  if(!exist) {
                    var newrow = viewModel.ActivityPriceItems.createEmptyRow({unSelect:true});
                    //TODO: 数据完整性测试
                    newrow.setSimpleData(pricelists[j],"new");
                    newrow.setValue("showCode", refValues[j].refcode);
                    newrow.setValue("showName", refValues[j].refname);
                    newrow.setValue("productSaleSeriesId", refValues[j].saleSeriesId);
                    newrow.setValue("productSaleSeriesName", refValues[j].saleSeriesName);
                    newrow.setValue("isEnable", refValues[j].isEnable);
                    newrow.setValue("productId", refValues[j].isproduct==1?refValues[j].refpk:null);
                    newrow.setValue("combineId", refValues[j].isproduct==0?refValues[j].refpk:null);
                    newrow.setValue("price", refValues[j].price);
                    newrow.setValue("isEnable", 1);
                  }
                }
                // 没有匹配的价格公式
                else {
                  var newrow = viewModel.ActivityPriceItems.createEmptyRow({unSelect:true});
                  newrow.setValue("showCode", refValues[j].refcode);
                  newrow.setValue("showName", refValues[j].refname);
                  newrow.setValue("productSaleSeriesId", refValues[j].saleSeriesId);
                  newrow.setValue("productSaleSeriesName", refValues[j].saleSeriesName);
                  newrow.setValue("isEnable", refValues[j].isEnable);
                  newrow.setValue("productId", refValues[j].isproduct==1?refValues[j].refpk:null);
                  newrow.setValue("combineId", refValues[j].isproduct==0?refValues[j].refpk:null);
                  newrow.setValue("price", refValues[j].price);
                }
              }
            }
        });
        viewModel.actselect.on("code.valuechange",function (obj) {
            if(!obj.newValue){
                return;
            }
            var refer = $("#refContainercode").data("uui.refer");
            if(refer&&refer.values.length>0){
                var curValue = refer.values[0];
                var name = curValue.activityTypeName
                var agencyName = curValue.agencyName;
                var starttime = curValue.terminalStartDate;
                var endtime = curValue.terminalEndDate;
                var description = curValue.description;
                viewModel.actselect.getCurrentRow().setValue("name",name);
                viewModel.actselect.getCurrentRow().setValue("agencyName",agencyName);
                viewModel.actselect.getCurrentRow().setValue("terminalStartDate",starttime);
                viewModel.actselect.getCurrentRow().setValue("terminalEndDate",endtime);
                viewModel.actselect.getCurrentRow().setValue("description",description);
            }
          // viewModel.ActivityPriceItems.removeAllRows();
        })
        viewModel.ActivityPriceItems.on("price.valuechange", function(obj) {
          var resultPrice = parseFloat(obj.newValue);
          isNaN(resultPrice) ?resultPrice = "":resultPrice;
          var arr = parseInt(resultPrice).toString().split('');
          var num = parseInt(arr[arr.length-1]);
          var num2 = parseInt(arr[arr.length-2]);
          if(num == 4 || num == 5 || num == 7) {
            toastr.info("价格个位数如果是4或5则变更为6，如果是7则变更为8");
            if(num == 5 || num == 7) {
              resultPrice += 1;
            }
            else {
              resultPrice += 2;
            }
            obj.rowObj.setValue("price", resultPrice);
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
        window.vm = viewModel;
    }

    return {
        init: init
    }
});
