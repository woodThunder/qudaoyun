define(['ocm_simpleview', './meta.js', 'ocm_common', "text!./b2cShipperMatch.html"], function (simpleview, model, common, tpl) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate:function(){
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/dispatch/b2c-schedules',
      excelurl: '/b2c-shipper-excel',
      // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
      // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
      simpleList: new u.DataTable(model.options.metas.b2cshippermeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      dialogcardcomp2: {},
      dialogcardSource2: model.options.dialogs.dialog2,
      dialogcardcomp3: {},
      dialogcardSource3: model.options.dialogs.dialog3,
      dialogcardcomp4: {},
      dialogcardSource4: model.options.dialogs.dialog4,
      dialogcardcomp5: {},
      dialogcardSource5: model.options.dialogs.dialog5,
      dialogcardcomp6: {},
      dialogcardSource6: model.options.dialogs.dialog6,
      //detailSource: model.options.details.detail,
      gridOption: model.options.grids.grid1,
    },
    events: u.extend({}, simpleview.prototype.events, {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        if (index >= 0) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
          viewModel.dialogcardcomp.app.getComp("priorityId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("warehouseId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("serviceProviderId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("dealerId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("supplierId").setEnable(false);
          switch (currentData.logisticsModeCode) {
            case '2':
              viewModel.dialogcardcomp.app.getComp("priorityId").setEnable(true);
              viewModel.dialogcardcomp.app.getComp("warehouseId").setEnable(true);break;
            case '3':
              viewModel.dialogcardcomp.app.getComp("serviceProviderId").setEnable(true);break;
            case '4':
              viewModel.dialogcardcomp.app.getComp("supplierId").setEnable(true);break;
            case '5':
              viewModel.dialogcardcomp.app.getComp("dealerId").setEnable(true);break;
          }
        } else {
          title = "新增";
          viewModel.dialogcardcomp.app.getComp("priorityId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("warehouseId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("serviceProviderId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("dealerId").setEnable(false);
          viewModel.dialogcardcomp.app.getComp("supplierId").setEnable(false);
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //由于不同节点采用同一个后台模型，重写查询、编辑方法。
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          postdata.type = 1;
          if (index >= 0) {
            type = "put";
          }
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              //如果index大于等于0说明是修改
              viewModel.dialogcardcomp.close();
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.simpleList.getRowByRowId(viewModel.rowId);
                //将用户填写的数据更新到simpleList上
              } else {
                //添加数据
                currentRow = viewModel.simpleList.createEmptyRow();
              }
              currentRow.setSimpleData(data);
            }
          })

        }
      },
      search: function (reindex) {
        if (!viewModel.searchcomp) {
          $('div.ui-searchbox').css('display', 'none');
          // return;
        }
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        if (!viewModel.searchcomp) {
          var queryData = {};
        } else {
          var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        }
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        queryData["search_EQ_type"] = 1;
        $._ajax({
          type: "get",
          url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      },
      //批量调整
      bathEdit: function (data, rowId) {
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          switch (data.key) {
            case 'batchWarehouse':
              var title = "批量调整仓库";
              viewModel.dialogcardcomp2.show(title, "500px", viewModel.batchWarehouseOk);break;
            case 'batchServiceProvider':
              var title = "批量调整服务商";
              viewModel.dialogcardcomp3.show(title, "500px", viewModel.batchServiceProviderOk);break;
            case 'batchDealer':
              var title = "批量调整经销商";
              viewModel.dialogcardcomp4.show(title, "500px", viewModel.batchDealerOk);break;
            case 'batchSupplier':
              var title = "批量调整供应商";
              viewModel.dialogcardcomp5.show(title, "500px", viewModel.batchSupplierOk);break;
            case 'batchPriority':
              var title = "批量调整优先级";
              viewModel.dialogcardcomp6.show(title, "500px", viewModel.batchPriorityOk);
          }
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //批量调整仓库保存
      batchWarehouseOk: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        var data = viewModel.dialogcardcomp2.geteidtData();
        var postdata = []
        for (var i = 0; i < rows.length; i++) {
          var temp = rows[i].getSimpleData();
          if(!temp.warehouseId) {
            toastr.warning("您选择的数据中有仓库信息为空的行，请选择带有【仓库】信息的行数据。");return;
          }
          temp.warehouseId = data.warehouseId;
          temp.stockOrgId = data.stockOrgId;
          postdata.push(temp);
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/batch-adjust',
          type: "put",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.dialogcardcomp2.close();
            viewModel.search()
          }
        })
      },
      batchServiceProviderOk: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        var data = viewModel.dialogcardcomp3.geteidtData();
        var postdata = []
        for (var i = 0; i < rows.length; i++) {
          var temp = rows[i].getSimpleData();
          if(!temp.serviceProviderId) {
            toastr.warning("您选择的数据中有服务商信息为空的行，请选择带有【服务商】信息的行数据。");return;
          }
          temp.serviceProviderId = data.serviceProviderId;
          postdata.push(temp);
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/batch-adjust',
          type: "put",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.dialogcardcomp3.close();
            viewModel.search()
          }
        })
      },
      batchDealerOk: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        var data = viewModel.dialogcardcomp4.geteidtData();
        var postdata = []
        for (var i = 0; i < rows.length; i++) {
          var temp = rows[i].getSimpleData();
          if(!temp.dealerId) {
            toastr.warning("您选择的数据中有经销商信息为空的行，请选择带有【经销商】信息的行数据。");return;
          }
          temp.dealerId = data.dealerId;
          postdata.push(temp);
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/batch-adjust',
          type: "put",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.dialogcardcomp4.close();
            viewModel.search()
          }
        })
      },
      batchSupplierOk: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        var data = viewModel.dialogcardcomp5.geteidtData();
        var postdata = []
        for (var i = 0; i < rows.length; i++) {
          var temp = rows[i].getSimpleData();
          if(!temp.supplierId) {
            toastr.warning("您选择的数据中有供应商信息为空的行，请选择带有【供应商】信息的行数据。");return;
          }
          temp.supplierId = data.supplierId;
          postdata.push(temp);
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/batch-adjust',
          type: "put",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.dialogcardcomp5.close();
            viewModel.search()
          }
        })
      },
      batchPriorityOk: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        var data = viewModel.dialogcardcomp6.geteidtData();
        var postdata = []
        for (var i = 0; i < rows.length; i++) {
          var temp = rows[i].getSimpleData();
          temp.priority = data.priority;
          postdata.push(temp);
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + '/batch-adjust',
          type: "put",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.dialogcardcomp6.close();
            viewModel.search()
          }
        })
      },
      //导入
      importHandle: function () {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
        var ele = $("#importFiel")[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        searchParams["search_EQ_type"] = 1;
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
    }),
    afterCreate: function() {
      viewModel.dialogcardcomp.viewModel.params.on("logisticsModeCode.valuechange", function(obj) {
        switch (obj.oldValue) {
        case 2:
        case '2':
          var comp = viewModel.dialogcardcomp.app.getComp("warehouseId");
          comp.setEnable(false);
          comp.setValue("");
          viewModel.dialogcardcomp.app.getComp("priorityId").setEnable(false);
          viewModel.dialogcardcomp.viewModel.params.setValue("priority", "");
          viewModel.dialogcardcomp.viewModel.params.setValue("stockOrgId", "");
          break;
        case 3:
        case '3':
          var comp = viewModel.dialogcardcomp.app.getComp("serviceProviderId");
          comp.setEnable(false);
          comp.setValue("");
          break;
        case 4:
        case '4':
          var comp = viewModel.dialogcardcomp.app.getComp("supplierId");
          comp.setEnable(false);
          comp.setValue("");
          break;
        case 5:
        case '5':
          var comp = viewModel.dialogcardcomp.app.getComp("dealerId");
          comp.setEnable(false);
          comp.setValue("");
          break;
        }
        switch (obj.newValue) {
        case 2:
        case '2':
          viewModel.dialogcardcomp.app.getComp("warehouseId").setEnable(true);
          viewModel.dialogcardcomp.app.getComp("priorityId").setEnable(true);
          break;
        case 3:
        case '3':
          viewModel.dialogcardcomp.app.getComp("serviceProviderId").setEnable(true);
          break;
        case 4:
        case '4':
          viewModel.dialogcardcomp.app.getComp("supplierId").setEnable(true);
          break;
        case 5:
        case '5':
          viewModel.dialogcardcomp.app.getComp("dealerId").setEnable(true);
          break;
        }
      });
      viewModel.dialogcardcomp.viewModel.params.on("goodsId.valuechange", function (obj) {
        if(obj.newValue) {
          viewModel.dialogcardcomp.viewModel.params.setValue("productLineId", "");
        }
      });
      viewModel.dialogcardcomp.viewModel.params.on("productLineId.valuechange", function (obj) {
        if(obj.newValue) {
            viewModel.dialogcardcomp.viewModel.params.setValue("goodsId", "");
        }
      });
      //基本信息   省、城市、区县、街道四级联动
      viewModel.dialogcardcomp.viewModel.params.on("provinceId.valuechange", function (obj) {
        var cityValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": 2,
          "EQ_isEnable": 1
        };
        $("#cityIdinfo").attr("data-refparam", JSON.stringify(cityValue));
        viewModel.dialogcardcomp.viewModel.params.setValue("cityId", "");
      });
      viewModel.dialogcardcomp.viewModel.params.on("cityId.valuechange", function (obj) {
        var countyValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": 3,
          "EQ_isEnable": 1
        };
        $("#countyIdinfo").attr("data-refparam", JSON.stringify(countyValue));
        viewModel.dialogcardcomp.viewModel.params.setValue("countyId", "");
      });
      viewModel.dialogcardcomp.viewModel.params.on("countyId.valuechange", function (obj) {
        var townValue = {
          "EQ_parent.id": obj.newValue,
          "EQ_areaLevel": 4,
          "EQ_isEnable": 1
        };
        $("#townIdinfo").attr("data-refparam", JSON.stringify(townValue));
        viewModel.dialogcardcomp.viewModel.params.setValue("townId", "");
      });
    }
  });

  return view;
});