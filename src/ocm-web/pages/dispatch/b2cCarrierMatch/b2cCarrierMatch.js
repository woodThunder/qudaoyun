define(['ocm_simpleview', './meta.js', 'ocm_common', "text!./b2cCarrierMatch.html"], function (simpleview, model, common, tpl) {
  var viewModel;
  var view = simpleview.extend({
    beforeCreate:function(){
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/dispatch/b2c-schedules',
      excelurl: '/b2c-carrier-excel',
      // dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
      // statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
      simpleList: new u.DataTable(model.options.metas.b2ccarriermeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      dialogcardcomp2: {},
      dialogcardSource2: model.options.dialogs.dialog2,
      //detailSource: model.options.details.detail,
      gridOption: model.options.grids.grid1
    },
    events: u.extend({}, simpleview.prototype.events, {
      //由于不同节点采用同一个后台模型，重写查询、编辑方法。
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          postdata.type = 2;
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
        queryData["search_EQ_type"] = 2;
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
      //批量调整承运商
      batchCarrier: function (data, rowId) {
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          var title = "批量调整承运商"
          viewModel.dialogcardcomp2.show(title, "500px", viewModel.batchCarrierOk);
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //批量调整承运商保存
      batchCarrierOk: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        var data = viewModel.dialogcardcomp2.geteidtData();
        var postdata = []
        for (var i = 0; i < rows.length; i++) {
          var temp = rows[i].getSimpleData();
          temp.supplierId = data.supplierId;
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
        searchParams["search_EQ_type"] = 2;
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
    }),
    afterCreate: function () {
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