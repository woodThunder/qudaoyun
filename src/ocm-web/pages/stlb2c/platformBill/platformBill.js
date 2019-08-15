define(['text!./platformBill.html', './meta.js', 'ocm_common',
'ocm_baseview'], function (tpl, model, common, baseview) {
  var viewModel;
  var view = baseview.extend({
    tpl: tpl,
    beforeCreate: function () {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/stlb2c/platform-bills',
      posturl: '/stlb2c/platform-bill-sons',
    
      excelurl: '/stlb2c/platform-bill-excel',
      dialogWidth: '900px',
      simpleList: new u.DataTable(model.options.metas.platformBillmeta),
      postList: new u.DataTable(model.options.metas.platformBillSonmeta),
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      dialogcardcomp: {},
     
      detail1Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      goBillPanel: common.bill.goBillPanel,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      accountSource: [{
        value: "0",
        name: "未对帐"
      }, {
        value: "1",
        name: "对账中"
      }, {
        value: "2",
        name: "已对账"
      }],
      whetherSource: [{
        value: "0",
        name: "否"
      }, {
        value: "1",
        name: "是"
      }],
     
      //是否对账完成
      ifDepartureFmt: ko.pureComputed(function () {
        var status = viewModel.simpleList.ref("accountCompletionMark")();
        var statusName
        if (status == 0) {
          statusName = "否"
        }
        if (status == 1) {
          statusName = "是"
        }
        return statusName;
      }),
      accountManager: ko.pureComputed(function () {
        var isAccountManager = viewModel.simpleList.ref("isAccountManager")();
        return isAccountManager == 1 ? "是" : "否";
      }),

      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    },
    rendertype: common.rendertype,
   

    events: {
      //跳转单据详情页
      goDetailPanel: function (index, rowId) {
        // $(".ui-list-panel").hide();
        $(".ui-panel").hide();
        $(".ui-bill-detail").show();
        $(".ui-bill-detail").animateCss("fadeIn");
        var currentData = viewModel.simpleList.getFocusRow().getSimpleData();
        $._ajax({
          url: appCtx + viewModel.posturl + '/find-by-platformBillId',
          type: "get",
          data: { platformBillId: currentData.id },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.postList.setSimpleData(data);
          }
        })

      },
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //点击取消 单据页
      cancelHandle: function () {
        viewModel.search();
        viewModel.retListPanel();
      },
      backPanel: function () {
        common.dialog.confirmDialog({
          msg1: "确认返回列表页？",
          msg2: "此操作不可逆",
          width: "400px",
          type: "error",
          onOk: function () {
            $("#code-text").empty();
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      },

      //子表增行
      addRow: function (dataTable) {
        viewModel[dataTable].createEmptyRow();
        viewModel.currentFlag = 0;
      },
      //子表 删除和批量删除
      delChild: function (dataTable) {
        var rows = viewModel[dataTable].getSelectedRows();
        viewModel[dataTable].removeRows(rows);
      },

      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function (index, rowId) {

        viewModel.goBillPanel();
        $("#personBase").show();
        $("#personBase_show").hide();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");

        var title;
        viewModel.index = index;
        var row = viewModel.simpleList.createEmptyRow();
        if (u.isNumber(index)) {
          //修改操作
          title = "编辑";
          var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
          viewModel.rowId = rowId;
          viewModel.platformBillId = currentData.id
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT)
          $._ajax({
            url: appCtx + viewModel.posturl + '/find-by-platformBillId',
            type: "get",
            data: { platformBillId: currentData.id },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              viewModel.postList.setSimpleData(data);
            }
          })

        } else {
          title = "新增"
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD)
          // viewModel.simpleList.setSimpleData([])
          viewModel.simpleList.setRowFocus(row);
          viewModel.postList.setSimpleData([]);
        }

      },

      //将主表信息保存
      saveHandle: function () {
        var index = viewModel.index;
        var currentRow, type = "post";
        var simpleData = viewModel.simpleList.getFocusRow().getSimpleData();
        var postData = viewModel.postList.getSimpleData();
        simpleData.platformBillSon = postData;
        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
          type = "put";
        }

        //更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(simpleData),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            //如果index大于等于0说明是修改
            viewModel.search();
            viewModel.retListPanel();
          }
        })
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
      //子表 删除和批量删除
      delChild: function () {
        var rows = viewModel.postList.getSelectedRows();
        viewModel.postList.removeRows(rows);
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
       // queryData['search_NULL_ownerCustomer'] = "~";
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
     
      detail: function () {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          viewModel.goDetailPanel();
        }, 0);
      },
      //导入
		importHandle: function() {
			var urlInfo = viewModel.excelurl +"/excelDataImport"; //倒入地址参数
			var urlStatusInfo = viewModel.excelurl +"/excelLoadingStatus"; //请求进度地址参数
			var ele = $('#importFiel')[0]; //挂载元素
			common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
		},
		//导出
		exportHandle: function() {
			var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
			var templateUrl = viewModel.excelurl +"/downloadExcelTemplate"; //导出模板地址参数
			var excelDataUrl =  viewModel.excelurl +"/excelDataExport"; //导出数据地址参数
			var listData = viewModel.simpleList; //需要导出表格的dataTable
			var ele = $('#exportFiel')[0]; //挂载元素
			common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
		}
      
    },
    afterCreate: function () {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //viewModel.search();


      
    }
  });

  return view;
});
