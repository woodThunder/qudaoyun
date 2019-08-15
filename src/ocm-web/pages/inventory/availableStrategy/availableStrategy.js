define(['text!./availableStrategy.html', './meta.js', 'ocm_common',
  'ocm_baseview'
], function(tpl, model, common, baseview) {
  var viewModel;
  var view = baseview.extend({
    tpl: tpl,
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    model: model,
    baseData: {
      baseurl: '/stock/available-strategys',
      outChildUrl: '/stock/available-link-willouts',
      inChildUrl: '/stock/available-link-willins',
      willoutsUrl: '/stock/available-willouts',
      willinsUrl: '/stock/available-willins',
      statusField: 'isEnable',
      excelurl: '/person-excel',
      dialogWidth: '900px',
      simpleList: new u.DataTable(model.options.metas.availableStrategymeta),
      outChildList: new u.DataTable(model.options.metas.availableLinkWilloutmeta),
      inChildList: new u.DataTable(model.options.metas.availableLinkWillinmeta),
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      //buttonMenu1Source: model.options.buttonmenus.buttonmenu1,
      searchcomp: {},
      searchSource: model.options.searchs.search1,
      detail1Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      goBillPanel: common.bill.goBillPanel,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      // 跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      whetherSource: [{
        value: "1",
        name: "是"
      }, {
        value: "0",
        name: "否"
      }],
      limitTypeSource: ko.observable([{
        value: "0",
        name: "严控制"
      }, {
        value: "1",
        name: "不控制"
      }, {
        value: "2",
        name: "仅提醒"
      }]),
      occupyTimeSource: [{
        value: "0",
        name: "保存时"
      }, {
        value: "1",
        name: "审批时"
      }],
      avaResourceCom: ko.pureComputed(function() {
        var status = viewModel.simpleList.ref("avaResource")();
        var statusName
        if (status == '0') {
          statusName = "默认"
        }
        if (status == '1') {
          statusName = "NC可用量"
        }
        return statusName;
      }),
      //是否离职
      ifDepartureFmt: ko.pureComputed(function() {
        var status = viewModel.simpleList.ref("ifDeparture")();
        var statusName
        if (status == 0) {
          statusName = "否"
        }
        if (status == 1) {
          statusName = "是"
        }
        return statusName;
      }),
      accountManager: ko.pureComputed(function() {
        var isAccountManager = viewModel.simpleList.ref("isAccountManager")();
        return isAccountManager == 1 ? "是" : "否";
      }),

      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
    },
    rendertype: u.extend(common.rendertype, {
      detailRender: common.rendertype.detailRender,
      avaResourceRender: function(params) {
        params.element.innerHTML = "默认";
        if (params.value != 0 && params.value != "0") {
          params.element.innerHTML = "NC可用量";
        }
      },
      limitTypeRender: function(params) {
        if (params.value == 0 || params.value == "0") {
          params.element.innerHTML = "严控制";
        } else if (params.value == 1 || params.value == "1") {
          params.element.innerHTML = "不控制";
        }
        if (params.value == 2 || params.value == "2") {
          params.element.innerHTML = "仅提醒";
        }
      },
      whetherRender: function(params) {
        if (params.value == 0 || params.value == "0") {
          params.element.innerHTML = "否";
        } else if (params.value == 1 || params.value == "1") {
          params.element.innerHTML = "是";
        }
      },
      occupyTimeRender: function(params) {
        if (params.value == 0 || params.value == "0") {
          params.element.innerHTML = "保存时";
        } else if (params.value == 1 || params.value == "1") {
          params.element.innerHTML = "审批时";
        }
      },
      outBeforeEditCheck: function(obj) {
        var colIndex = obj.colIndex;
        if (colIndex == "1") {
          var bussiness = viewModel.outChildList.getRow(
            obj.rowIndex
          ).getValue("bussiness");
          if (bussiness == "销售业务") {
            viewModel.outChildList.meta.occupyBillId.refparam =
              '{"EQ_isEnable":"1","IN_code":"SaleOrder,DeliveryOrder"}';
          } else if (bussiness == "库存调拨") {
            viewModel.outChildList.meta.occupyBillId.refparam =
              '{"EQ_isEnable":"1","IN_code":"Transfer"}';
          } else if (bussiness == "采购退货") {
            viewModel.outChildList.meta.occupyBillId.refparam =
              '{"EQ_isEnable":"1","IN_code":"PurchaseBill"}';
          }
          return true;
        } else if(colIndex == "3"){
          var bussiness = viewModel.outChildList.getRow(
            obj.rowIndex
          ).getValue("bussiness");
          if (bussiness == "销售业务") {
            viewModel.limitTypeSource([{
              value: "0",
              name: "严控制"
            }, {
              value: "1",
              name: "不控制"
            }, {
              value: "2",
              name: "仅提醒"
            }])
          }else{
            viewModel.limitTypeSource([{
              value: "0",
              name: "严控制"
            }, {
              value: "1",
              name: "不控制"
            }])
          }
          return true;
        }else {
          return true;
        }
      },
      inBeforeEditCheck: function(obj) {
        var colIndex = obj.colIndex;
        if (colIndex == "1") {
          var bussiness = viewModel.inChildList.getRow(
            obj.rowIndex
          ).getValue("bussiness");
          if (bussiness == "采购业务") {
            viewModel.inChildList.meta.occupyBillId.refparam =
              '{"EQ_isEnable":"1","IN_code":"PurchaseBill"}';
          } else if (bussiness == "库存调拨") {
            viewModel.inChildList.meta.occupyBillId.refparam =
              '{"EQ_isEnable":"1","IN_code":"Transfer"}';
          } else if (bussiness == "销售退货") {
            viewModel.inChildList.meta.occupyBillId.refparam =
              '{"EQ_isEnable":"1","IN_code":"SaleOrder"}';
          }
          return true;
        } else {
          return true;
        }
      },
    }),

    events: {
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //点击取消 单据页
      cancelHandle: function() {
        viewModel.search();
        viewModel.retListPanel();
      },
      backPanel: function() {
        common.dialog.confirmDialog({
          msg1: "确认返回列表页？",
          msg2: "此操作不可逆",
          width: "400px",
          type: "error",
          onOk: function() {
            $("#code-text").empty();
            viewModel.search();
            viewModel.retListPanel();
          }
        });
      },

      //子表增行
      addRow: function(dataTable) {
        viewModel[dataTable].createEmptyRow();
        viewModel.currentFlag = 0;
      },
      //子表 删除和批量删除
      delChild: function(dataTable) {
        var rows = viewModel[dataTable].getSelectedRows();
        viewModel[dataTable].removeRows(rows);
      },

      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
      beforeEdit: function(index, rowId) {

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
          viewModel.availableStrategyId = currentData.id
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT)
          $._ajax({
            url: appCtx + viewModel.outChildUrl + '/findByAvailableStrategyId',
            type: "get",
            data: {
              availableStrategyId: currentData.id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.outChildList.setSimpleData(data, {
                unSelect: true
              });
            }
          })
          $._ajax({
            url: appCtx + viewModel.inChildUrl + '/findByAvailableStrategyId',
            type: "get",
            data: {
              availableStrategyId: currentData.id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.inChildList.setSimpleData(data, {
                unSelect: true
              });
            }
          })

        } else {
          title = "新增"
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
          viewModel.simpleList.setRowFocus(row);
          $._ajax({
            type: "get",
            url: appCtx + viewModel.willoutsUrl,
            dataType: "json",
            // data: queryData,
            success: function(data) {
              var outChildData = data.content;
              outChildData.forEach(function(d) {
                // d.stockWilloutId = d.id;
                d.limitType = 0;
                d.occupyTime = 0;
                d.isSelected = 1;
              });
              viewModel.outChildList.setSimpleData(outChildData, {
                unSelect: true
              });
            }
          })
          $._ajax({
            type: "get",
            url: appCtx + viewModel.willinsUrl,
            dataType: "json",
            // data: queryData,
            success: function(data) {
              var inChildData = data.content;
              inChildData.forEach(function(d) {
                // d.stockWillinId = d.id;
                d.limitType = 0;
                d.occupyTime = 0;
                d.isSelected = 1;
              });
              viewModel.inChildList.setSimpleData(inChildData, {
                unSelect: true
              });
            }
          })
        }

      },
      validate: function(element) {
        var result = viewModel.app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      //保存
      saveHandle: function() {
        var index = viewModel.index;
        var currentRow, type = "post";
        var baseInfo = $("#baseInfo")[0];
        var baseInfo1 = $("#baseInfo1")[0];
        var baseInfo2 = $("#baseInfo2")[0];
        var baseInfoPass = viewModel.validate(baseInfo);
        var baseInfo1Pass = viewModel.validate(baseInfo1);
        var baseInfo2Pass = viewModel.validate(baseInfo2);
        if (baseInfoPass.passed && baseInfo1Pass.passed && baseInfo2Pass.passed) {
          var postData = viewModel.simpleList.getFocusRow().getSimpleData();
          var outChildData = viewModel.outChildList.getSimpleData();
          outChildData.forEach(function(d) {
            if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
              d.persistStatus = 'upd';
            } else {
              d.persistStatus = 'new';
              d.stockWilloutId = d.id;
              delete d.id;
            }
          });
          postData.availableLinkWillouts = outChildData

          var inChildData = viewModel.inChildList.getSimpleData();
          inChildData.forEach(function(d) {
            if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
              d.persistStatus = 'upd';
            } else {
              d.persistStatus = 'new';
              d.stockWillinId = d.id;
              delete d.id;
            }

          });
          postData.availableLinkWillins = inChildData

          if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
            type = "put";
          }

          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              //如果index大于等于0说明是修改
              viewModel.search();
              viewModel.retListPanel();
            }
          })
        }
      },

      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
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
            onOk: function() {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                // data: "ids=" + ids.join(","),
                data: {
                  ids: ids.join(",")
                },
                success: function(data) {
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
      delChild: function() {
        var rows = viewModel.outChildList.getSelectedRows();
        viewModel.outChildList.removeRows(rows);
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.simpleList.pageIndex(0);
        }
        viewModel.simpleList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.simpleList.pageSize();
        queryData.page = viewModel.simpleList.pageIndex();
        $._ajax({
          type: "get",
          url: appCtx + (viewModel.searchBaseurl ? viewModel.searchBaseurl : viewModel.baseurl),
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.simpleList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(data.totalElements);
            viewModel.simpleList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.simpleList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.simpleList.pageSize(size);
        viewModel.search(true);
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                viewModel.statusField ?
                  selectedRows[i].setValue(viewModel.statusField, "1") :
                  selectedRows[i].setValue("isEnable", "1");
              }
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.simpleList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
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
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.simpleList.getCurrentRow();
          var id = curRow.getValue("id");
          $._ajax({
            url: appCtx + viewModel.outChildUrl + '/findByAvailableStrategyId',
            type: "get",
            data: {
              availableStrategyId: id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.outChildList.setSimpleData(data, {
                unSelect: true
              });
            }
          })
          $._ajax({
            url: appCtx + viewModel.inChildUrl + '/findByAvailableStrategyId',
            type: "get",
            data: {
              availableStrategyId: id
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.inChildList.setSimpleData(data, {
                unSelect: true
              });
            }
          })
          viewModel.goDetailPanel();
        }, 0);
      },
      //导入
      importPerson: function() {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportPerson: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.simpleList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      //导入---岗位
      importPost: function() {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = "/person-post-excel/excelLoadingStatus"; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出---岗位
      exportPost: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        //搜索参数加customer.
        for (var p in searchParams) {
          searchParams[
              p.replace("LIKE_", "LIKE_person.").replace("EQ_", "EQ_person.")
            ] =
            searchParams[p];
          delete searchParams[p];
        }
        var templateUrl = "/person-post-excel/downloadExcelTemplate"; //导出模板地址参数
        var excelDataUrl = "/person-post-excel/excelDataExport"; //导出数据地址参数
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
    },
    afterCreate: function() {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //viewModel.search();


      // viewModel.outChildList.on("organizationId.valuechange", function (obj) {
      //   var organizationId = obj.newValue;
      //   obj.rowObj.parent.meta.departmentId.refparam = "{\"EQ_isEnable\":\"1\",\"EQ_organization.id\":\"" + organizationId + "\"}";
      //   obj.rowObj.parent.meta.postId.refparam = "{\"EQ_isEnable\":\"1\",\"EQ_organization.id\":\"" + organizationId + "\"}";

      // });
    }
  });

  return view;
});