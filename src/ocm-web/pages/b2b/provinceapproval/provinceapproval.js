
define(['text!./provinceapproval_tpl.html', 'ocm_common', 'ocm_baseview', './meta.js'], function (tpl, common, baseview, model) {
  var viewModel;
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    tpl: tpl,
    baseData: {
      baseurl: '/b2b/order',//?search_IN_saleModel=01%2C03
      simpleList: new u.DataTable(model.options.metas.Orderreviewmeta),
      simpleDetail: new u.DataTable(model.options.metas.Orderreviewmeta),
      OrderreviewItem: new u.DataTable(model.options.metas.OrderreviewItemmeta),
      OrderreviewItemBom: new u.DataTable(model.options.metas.OrderreviewItemBommmeta),
      statusField: 'isEnable',
      buttonSource: model.options.buttons.button1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
      // dialogcardSource: model.options.dialogs.dialog1,
      gridOption: model.options.grids.gridList,

      detailSource: model.options.details.detail1,

      gridGoodsSource: model.options.grids.gridGoods,
      gridBomSource: model.options.grids.gridBom,
      //返回列表页
      gridlogsItem: new u.DataTable(model.options.metas.gridlogsMeta),
      gridlogsSource: model.options.grids.gridlogs,
      dialogNopassSource: model.options.dialogs.dialog1,
      dialogNopassComp: {}
    },
    // 扩展common.rendertype
    rendertype: u.extend({}, common.rendertype, {
      // 关闭
      isCloseRender: function (obj) {
        var showValue = "";
        var isClose = obj.value;
        if (isClose == 1) {
          showValue = "是";
        } else {
          showValue = "否";
        }
        obj.element.innerHTML = showValue;
      },
      // 订单来源
      orderSourceRender: function (obj) {
        var showValue = "";
        if (obj.value == '01') {
          showValue = "门户";
        }
        if (obj.value == '02') {
          showValue = "中台";
        }
        obj.element.innerHTML = showValue;
      },
      // 查看选配
      goodsOptDetails: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var baseGoodsOptId = obj.row.value.baseGoodsOptId; // 选配id
        if (baseGoodsOptId) {
          // var detailfun = "data-bind=click:goodsOptDetailsFun.bind($data," + obj.rowIndex + ")";
          var detailfun = '';
          obj.element.innerHTML =
            '<a href="#" class="ui-a-detail" ' +
            detailfun +
            ">查看选配</a>";
        } else {
          obj.element.innerHTML =
            '<span>无选配信息</span>';
        }
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 复选框
      disableBooleanRender: function (obj) {
        var grid = obj.gridObj;
        // var newgrid = viewModel.app.getComp("grid_salesorder_edit").grid;
        var isDisabled = false;
        if (grid.getColumnByField("goodsSupplement")) {
          isDisabled = grid.getColumnByField("goodsSupplement").options
            .disabled;
        }
        var datatable = grid.dataTable;
        var rowId = obj.row.value["$_#_@_id"];
        var row = datatable.getRowByRowId(rowId);
        var checkStr = "",
          disableStr = "";

        if (
          obj.value == "Y" ||
          obj.value == "true" ||
          obj.value == "1" ||
          obj.value == 1
        ) {
          checkStr = " is-checked";
        }
        if (isDisabled) {
          disableStr = " is-disabled";
        }
        var htmlStr =
          '<label class="u-checkbox is-upgraded ' +
          checkStr +
          disableStr +
          '">' +
          '<input type="checkbox" class="u-checkbox-input" disabled>' +
          '<span class="u-checkbox-label"></span>' +
          '<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
          "</label>";

        obj.element.innerHTML = htmlStr;

        $(obj.element)
          .find("input")
          .on("click", function (e) {
            if (isDisabled) {
              return;
            }
          });
      }
    }),
    events: {
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {
        var title;
        viewModel.index = index;
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList
            .getRowByRowId(rowId)
            .getSimpleData();
          viewModel.rowId = rowId;
          viewModel.dialogcardcomp.seteidtData(currentData);
        } else {
          title = "新增";
          //清空编辑框的信息
          viewModel.dialogcardcomp.cleareidt();
        }
        //显示模态框
        viewModel.dialogWidth ?
          viewModel.dialogcardcomp.show(
            title,
            viewModel.dialogWidth,
            viewModel.edit
          ) :
          viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
      },
      //将操作后的数据进行保存
      edit: function () {
        var result = viewModel.dialogcardcomp.validate();
        if (result.passed) {
          var index = viewModel.index;
          var currentRow,
            type = "post";
          var postdata = viewModel.dialogcardcomp.geteidtData();
          //  对新增保存时有其他需求的校验添加的方法（命名editExtend） ---syf
          if (
            viewModel.editVerify &&
            typeof viewModel.editVerify == "function" &&
            viewModel.editVerify(postdata)
          ) {
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
                currentRow = viewModel.simpleList.getRowByRowId(
                  viewModel.rowId
                );
                currentRow.setSimpleData(data);
                //将用户填写的数据更新到simpleList上
              } else {
                viewModel.search();
                //添加数据
                // currentRow = viewModel.simpleList.createEmptyRow();
              }

            }
          });
        }
      },
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof data == "number") {
          viewModel.simpleList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function (data) {
                  // viewModel.simpleList.removeRows(rows);
                  viewModel.search();
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
        // debugger
        if (!viewModel.searchcomp) {
          $("div.ui-searchbox").css("display", "none");
          // return;
        }
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        if (!viewModel.searchcomp) {
          var queryData = {};
        } else {
          var queryData = viewModel.searchcomp.getDataWithOpr ?
            viewModel.searchcomp.getDataWithOpr() :
            {};
        }
        // console.log(viewModel.searchcomp)
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        queryData["search_IN_saleModel"] = "01,03";
        // queryData["search_IN_orderStatus"] = viewModel.searchcomp.getSearchData().orderStatus && viewModel.searchcomp.getSearchData().orderStatus != 'defaultoption' ? viewModel.searchcomp.getSearchData().orderStatus : "04,Ext01,Ext02";
        // 订单状态条件判定
        if (viewModel.searchcomp.getSearchData().orderStatus) {
          if (viewModel.searchcomp.getSearchData().orderStatus == 'defaultoption') {
            delete queryData["search_IN_orderStatus"];
          } else {
            queryData["search_IN_orderStatus"] = viewModel.searchcomp.getSearchData().orderStatus;
          }
        } else {
          queryData["search_IN_orderStatus"] = "Ext03";
        }

        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl, // + '?search_IN_saleModel=01%2C03&search_EQ_orderStatus=04'
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
            // if(queryData["search_IN_orderStatus"] == "04"){
            //   $(".orderreview_btn").show();
            // }else{
            //   $(".orderreview_btn").hide();
            // }
          }
        });
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
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "1") :
                  selectedRows[i].setValue("isEnable", "1");
              }
              viewModel.search();
            }
          });
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
          });
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function (res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "2") :
                  selectedRows[i].setValue("isEnable", "2");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      detail: function (rowId) {
        // viewModel.OrderreviewItem.removeAllRows();
        // viewModel.OrderreviewItemBom.removeAllRows();

        // 获取当前行数据
        var row = viewModel.simpleList.getRowByRowId(rowId);
        var id = row.getValue("id");
        //确保grid先将行设置为focus状态

        setTimeout(function () {
          $._ajax({
            url: appCtx + viewModel.baseurl + "/detail",
            type: "get",
            data: {
              id: id
            },
            success: function (data) {
              if (data) {
                viewModel.simpleDetail.setSimpleData(data);
                // viewModel.simpleChild.setSimpleData(data);
                viewModel.OrderreviewItem.setSimpleData(data.orderItems, { unSelect: true });
                viewModel.OrderreviewItemBom.setSimpleData(data.orderItemBoms, { unSelect: true });
                viewModel.goDetailPanel();
              } else {
                toastr.error();
              }
            }
          });
        }, 0);
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
        var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $("#exportFiel")[0]; //挂载元素
        common.fileHandle.exportFile(
          listData,
          ele,
          searchParams,
          templateUrl,
          excelDataUrl
        );
      },
      //选择商品页签
      checkGoods: function () {
        $("#tab-panel-4").hide();
        $("#tab-panel-3").show();
      },
      //选择Bom页签
      checkBom: function () {
        $("#tab-panel-4").show();
        $("#tab-panel-3").hide();
      },
      // 审核通过
      pass: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          var ids = [];
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          console.log(ids.join(','));
          common.dialog.confirmDialog({
            msg1: "确认审批通过这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "success",
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + '/provincial-approval-order?id=' + ids.join(','),
                type: "post",
                success: function (data) {
                  console.log(data)
                  if (data.success == 'success') {
                    toastr.success();
                    viewModel.search();
                  } else {
                    toastr.error();
                  }
                }
              });
            }
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      // 驳回
      nopass: function () {
        var rows = viewModel.simpleList.getSelectedRows();
        if (rows && rows.length > 0) {
          var curRow = viewModel.dialogNopassComp.viewModel.params;
          curRow.removeAllRows();
          curRow.createEmptyRow();
          viewModel.dialogNopassComp.show("驳回原因", "500px", viewModel.remarkSave);
          var ids = [];
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          viewModel.ids = ids;
          // common.dialog.confirmDialog({
          //   msg1: "确认驳回这些项？",
          //   msg2: "此操作不可逆",
          //   width: "400px",
          //   type: "error",
          //   onOk: function () {
          //     $._ajax({
          //       url: appCtx + viewModel.baseurl + '/headquarters-rejected-order?id=' + ids.join(','),
          //       type: "post",
          //       success: function (data) {
          //         console.log(data)
          //         if (data.success == 'success') {
          //           toastr.success();
          //           viewModel.search();
          //         } else {
          //           toastr.error();
          //         }
          //       }
          //     });
          //   }
          // });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      remarkSave: function(){
        var basePass = viewModel.dialogNopassComp.validate();
        if (basePass.passed) {
          var dialogRemarkData = viewModel.dialogNopassComp.geteidtData();
          $._ajax({
            url: appCtx + viewModel.baseurl + '/provincial-rejected-order?id=' + viewModel.ids.join(',') + '&remark=' + dialogRemarkData.remark,
            type: "post",
            success: function (data) {
              // console.log(data)
              if (data.success == 'success') {
                toastr.success();
                viewModel.search();
                viewModel.dialogNopassComp.close();
              } else {
                toastr.error();
              }
            }
          });
        }
      }
    },
    afterCreate: function () {
      // 监听search里面字段的变化
      viewModel.searchcomp.viewModel.params.on("orderStatus.valuechange", function (obj) {
        if (obj.newValue != "Ext03") {
          $(".provinceapproval_btn").hide();
        } else {
          $(".provinceapproval_btn").show();
        }
      })
    }
  });

  return view;
});

