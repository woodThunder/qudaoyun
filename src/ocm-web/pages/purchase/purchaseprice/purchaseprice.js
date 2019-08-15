define(['text!./purchaseprice.html', 'ocm_common', 'ocm_baseview',  './meta.js'], function (tpl,common,baseview, model) {
  var viewModel,app;
  var view = baseview.extend({
    beforeCreate:function(){
      viewModel = this.viewModel;
      app = this.app;
    },
    tpl:tpl,
    model:model,
    baseData:{
      baseurl: '/purchase/prices',
      simpleList: new u.DataTable(model.options.metas.purchasepricemeta),
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.grid1,
      //当前系统日期
      curDate: ko.observable(),
    },
    rendertype:{
      supplierTypeRender: function(obj) {
        var showValue = obj.value == "01" ? "内部单位" : obj.value == "02" ? "外部单位" : "";
        obj.element.innerHTML = showValue;
      },
      operation4single: common.rendertype.operation4single
    },
    events: {
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
        } else {
          title = "新增";
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
          $("#goodsId").removeAttr('readonly').attr('placeholder','');
          $("#productId").removeAttr('readonly').attr('placeholder','');
          $("#goodsTypeId").removeAttr('readonly').attr('placeholder','');
          var currow = viewModel.dialogcardcomp;
          viewModel.getCurDate(currow);
        }

        //显示模态框
        viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);

      },
      getCurDate: function (row) {
        // 服务器时间获取
        $._ajax({
          type: "get",
          url: appCtx + '/purchase/orders/search-date',
          success: function (data) {
            var truetime = u.date.format(data, 'YYYY/MM/DD');
            truetime = new Date(truetime).getTime();
            if (row) {
              row.viewModel.params.setValue("priceEffectTime",truetime)
            }
            viewModel.curDate(truetime);
          }
        });
      },
      //
      disabledEnd: function (current) {
        var beginTime = viewModel.dialogcardcomp.geteidtData().priceEffectTime;
        if (beginTime) {
          beginTime = new Date(beginTime).getTime();
          if (current) {
            current = new Date(current.format("YYYY-MM-DD")).getTime();
          }
          return current && current < beginTime;
        }
      },
      //将操作后的数据进行保存
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow, type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          var good = postdata.goodsId,
              product =postdata.productId,
              goodsType = postdata.goodsTypeId;
          if((good&&product&&goodsType)||(good&&product)||(good&&goodsType)||(product&&goodsType)||(!good&&!product&&!goodsType)){
            toastr.warning("商品、产品、商品分类三选一");
            return;
          }
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
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.simpleList.getSelectedRows();
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
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function (data) {
                  viewModel.simpleList.removeRows(rows);
                }
              });
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
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
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.simpleList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.simpleList.pageSize(size);
        viewModel.search(true);
      },
      //启用
      enable: function () {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //停用
      disable: function () {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function (row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "0");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //导入
      importHandle: function () {
        var urlInfo = viewModel.baseurl + '/excelDataImport';       //倒入地址参数
        var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus';      //请求进度地址参数
        var ele = $('#importFiel')[0];      //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr();       //搜索查询参数
        var templateUrl = viewModel.baseurl + '/downloadExcelTemplate';       //导出模板地址参数
        var excelDataUrl = viewModel.baseurl + '/excelDataExport';      //导出数据地址参数
        var listData = viewModel.simpleList;      //需要导出表格的dataTable
        var ele = $('#exportFiel')[0];      //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);

      },
    },
    afterCreate: function () {
      viewModel.dialogcardcomp.viewModel.params.on("goodsId.valuechange",function (obj) {
        var good = obj.newValue;
        if(good){
          $("#productId").attr("readonly", "readonly").attr('placeholder','商品、产品、商品分类三选一');
          $("#goodsTypeId").attr("readonly", "readonly").attr('placeholder','商品、产品、商品分类三选一');
        }else {
          $("#productId").removeAttr('readonly').attr('placeholder','');
          $("#goodsTypeId").removeAttr('readonly').attr('placeholder','');
        }
      });
      viewModel.dialogcardcomp.viewModel.params.on("productId.valuechange",function (obj) {
        var product = obj.newValue;
        if(product){
          $("#goodsId").attr("readonly", "readonly").attr('placeholder','商品、产品、商品分类三选一');
          $("#goodsTypeId").attr("readonly", "readonly").attr('placeholder','商品、产品、商品分类三选一');
        }else {
          $("#goodsId").removeAttr('readonly').attr('placeholder','');
          $("#goodsTypeId").removeAttr('readonly').attr('placeholder','');
        }
      });
      viewModel.dialogcardcomp.viewModel.params.on("goodsTypeId.valuechange",function (obj) {
        var goodsType = obj.newValue;
        if(goodsType){
          $("#goodsId").attr("readonly", "readonly").attr('placeholder','商品、产品、商品分类三选一');
          $("#productId").attr("readonly", "readonly").attr('placeholder','商品、产品、商品分类三选一');
        }else {
          $("#goodsId").removeAttr('readonly').attr('placeholder','');
          $("#productId").removeAttr('readonly').attr('placeholder','');
        };
      })

      viewModel.dialogcardcomp.viewModel.params.on("supplierId.valuechange",function (obj) {
        var refer = $("#refContainersupplierRef").data("uui.refer");
        var supplierType =refer.values[0].supplierTypeCode;
        viewModel.dialogcardcomp.viewModel.params.getCurrentRow().setValue("supplierType",supplierType);
      })

    }
  });

  return view;
});