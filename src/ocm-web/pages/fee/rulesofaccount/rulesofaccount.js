define(['text!./rulesofaccount.html', 'ocm_common', 'ocm_baseview', './meta.js'], function(tpl, common, baseview, model) {
  'use strict'
  var viewModel, appCtx = "/occ-fee",
    app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/fee/account-rules',
      complexList: new u.DataTable(model.options.metas.complex),
      complexItems: new u.DataTable(model.options.metas.complexItem),
      goodsRangeList: new u.DataTable(model.options.metas.goodsRange),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      rulesdialogcardcomp: {},
      subArr: [],
      pubArr: [],
      bubArr: [],
      cubArr: [],
      gubArr: [],
      rulesdialogcardSource: model.options.dialogs.dialog1,
      gREditType: common.goodsRange.gREditType,
      // ruleedit: common.goodsRange.ruleedit,

      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      // retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      enableFmt: ko.pureComputed(function() {
        var isEnable = viewModel.complexList.ref("isEnable")();
        return isEnable == 1 ? "启用" : "停用";
      }),
      pRules: ko.pureComputed(function() {
        var pRule = viewModel.complexList.ref("priorityRule")();
        switch (pRule) {
          case "TIME":
            return "费用单有效期";
          case "PRIORITY":
            return "账户优先级";
        }
      }),
      castType: ko.pureComputed(function() {
        var castType = viewModel.complexList.ref("castTypeId")();
        switch (castType) {
          case "pay01":
            return "冲抵订单";
          case "pay02":
            return "货补";
          case "pay03":
            return "实物货补";
          case "pay04":
            return "账扣";
        }
      }),
      castTypeStr: [{
        value: 'pay01',
        name: '冲抵订单'
      }, {
        value: 'pay02',
        name: '货补'
      }, {
        value: 'pay03',
        name: '实物货补'
      }, {
        value: 'pay04',
        name: '账扣'
      }],
    },
    rendertype: {
      //主子表操作
      operation: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var status = obj.row.value['isEnable'];
        var delfun =
          "data-bind=click:del.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var editfun =
          "data-bind=click:showEditBillPanel.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var iHtml =
          '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a href="#" ' +
          editfun +
          ' title="编辑">编辑</a>' +
          "</span>    ";
        if (status == 0 || status == '0') {
          iHtml += '<span class="ui-handle-word">' +
            '<a href="#" ' +
            delfun +
            ' title="删除">删除</a>' +
            "</span>";
        }
        iHtml += "</div>";
        obj.element.innerHTML = iHtml
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
    },
    events: {
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].getValue('isEnable') == 0 || rows[i].getValue('isEnable') == '0') {
              ids.push(rows[i].getValue("id"));
            }
          }
        }
        if (!ids.length) {
          toastr.error('只有未启用的数据可以被删除！');
          return;
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
                viewModel.complexList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.complexList.pageIndex(0);
        }
        viewModel.complexList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.complexList.pageSize();
        var pageNumber = viewModel.complexList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.complexList.totalRow(data.totalElements);
            viewModel.complexList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.complexList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.complexList.pageSize(size);
        viewModel.search(true);
      },
      format: function(shijianchuo) {
        //日期格式格式化
        function add0(m) {
          return m < 10 ? '0' + m : m
        }
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.complexList.createEmptyRow();
        viewModel.complexList.setRowFocus(curRow);
        viewModel.complexItems.removeAllRows();
        curRow.setValue("isEnable", "0");
        // curRow.setValue('beginTime', viewModel.format(new Date()));
        viewModel.subArr = [];
        viewModel.pubArr = [];
        viewModel.bubArr = [];
        viewModel.cubArr = [];
        viewModel.gubArr = [];
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.complexList.setRowFocus(index);
        var id = viewModel.complexList.getValue("id"),
          datas = viewModel.complexList.getFocusRow().getSimpleData();
        viewModel.complexList.originEditData = datas;
        viewModel.accountChange(datas.castTypeId);
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },

      //详情
      // 方案1：clone编辑态模板，设置只读，返回删除
      // 方案2：重新定义详情模板
      // 主要看差异，如果差异不大公用模板，差异大重新定义
      // detail: function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function(){
      //     var curRow = viewModel.complexList.getCurrentRow();
      //     var id = curRow.getValue("id");
      //     viewModel.findByParentid(id);
      //     var $detailWrap = $("#bill-detail-wrap");
      //     $detailWrap.empty();
      //     var $billPanel_cl = $(".ui-bill-panel").clone();
      //     $billPanel_cl.show();
      //     $detailWrap.append($billPanel_cl);
      //     viewModel.showBillDetail();
      //     u.compMgr.updateComp($detailWrap[0]);
      //   }, 0);
      // },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/findByParentid",
          type: 'post',
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            viewModel.complexItems.setSimpleData(data.accountRuleRanges);
          }
        })
      },
      // 清除基类属性
      clearBaseProp: function(row) {
        row.setValue("id", "");
        row.setValue("code", "");
        row.setValue("name", "");
        row.setValue("creator", "");
        row.setValue("creationTime", "");
        row.setValue("modifier", "");
        row.setValue("modifiedTime", "");
      },
      //跳转单据详情页
      showBillDetail: function() {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },

      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          var idFind = false;
          // if(selectedRows[i].rowId == );
          selectedRows[i].setValue("dr", "1");
          for (var a = 0, len = viewModel.subArr.length; a < len; a++) {
            if (selectedRows[i].rowId == viewModel.subArr[a]) {
              viewModel.subArr.splice(a, 1);
              idFind = true;
              break;
            }
          }
          for (var b = 0, len = viewModel.pubArr.length; b < len; b++) {
            if (selectedRows[i].rowId == viewModel.subArr[b]) {
              viewModel.subArr.splice(b, 1);
              idFind = true;
              break;
            }
          }
          for (var c = 0, len = viewModel.bubArr.length; c < len; c++) {
            if (selectedRows[i].rowId == viewModel.pubArr[c]) {
              viewModel.pubArr.splice(c, 1);
              idFind = true;
              break;
            }
          }
          for (var d = 0, len = viewModel.cubArr.length; d < len; d++) {
            if (selectedRows[i].rowId == viewModel.cubArr[d]) {
              viewModel.cubArr.splice(d, 1);
              idFind = true;
              break;
            }
          }
          for (var e = 0, len = viewModel.gubArr.length; e < len; e++) {
            if (selectedRows[i].rowId == viewModel.gubArr[e]) {
              viewModel.gubArr.splice(e, 1);
              idFind = true;
              break;
            }
          }
        }
        viewModel.complexItems.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function() {
        var result = app.compsValidateMultiParam({
          element: ".ui-bill-panel",
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        viewModel.complexItems.setAllRowsUnSelect();
        var flag = false;
        if (viewModel.subArr.length > 0) {
          for (var s = 0; s < viewModel.subArr.length; s++) {
            var row = viewModel.complexItems.getRowByRowId(viewModel.subArr[s]),
              index = viewModel.complexItems.getRowIndex(row);
            viewModel.complexItems.addRowSelect(index);
          }
          flag = true;
        }
        if (viewModel.pubArr.length > 0) {
          for (var s = 0; s < viewModel.pubArr.length; s++) {
            var row = viewModel.complexItems.getRowByRowId(viewModel.pubArr[s]),
              index = viewModel.complexItems.getRowIndex(row);
            viewModel.complexItems.addRowSelect(index);
          }
          flag = true;
        }
        if (viewModel.bubArr.length > 0) {
          for (var s = 0; s < viewModel.bubArr.length; s++) {
            var row = viewModel.complexItems.getRowByRowId(viewModel.bubArr[s]),
              index = viewModel.complexItems.getRowIndex(row);
            viewModel.complexItems.addRowSelect(index);
          }
          flag = true;
        }
        if (viewModel.cubArr.length > 0) {
          for (var s = 0; s < viewModel.cubArr.length; s++) {
            var row = viewModel.complexItems.getRowByRowId(viewModel.cubArr[s]),
              index = viewModel.complexItems.getRowIndex(row);
            viewModel.complexItems.addRowSelect(index);
          }
          flag = true;
        }
        if (viewModel.gubArr.length > 0) {
          for (var s = 0; s < viewModel.gubArr.length; s++) {
            var row = viewModel.complexItems.getRowByRowId(viewModel.gubArr[s]),
              index = viewModel.complexItems.getRowIndex(row);
            viewModel.complexItems.addRowSelect(index);
          }
          flag = true;
        }
        if (flag) {
          toastr.error("相同数据不允许重复,请重新选择！")
          return;
        }
        var cCurRow = viewModel.complexList.getCurrentRow();
        if (cCurRow.getValue('castTypeId') == 'pay01') {
          if (!cCurRow.getValue('discountRate')) {
            toastr.error('请输入“商品优惠比例%”')
            return;
          }
        }
        var allRows = viewModel.complexItems.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {

        }
        // for(var k = 1,len = allRows.length;k<len;k++){
        // if(allRows[k-1].getValue('seriesId'))
        // }
        // {
        //   toastr.error("请录入表体行数据");
        //   return;
        // }
        var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.complexItems.getSimpleData();
        complexData.accountRuleRanges = complexItemsData;
        var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            toastr.success();
            viewModel.search();
            // viewModel.complexList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.complexList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.complexList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.complexList.removeRow(curRow);
          viewModel.complexItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              // for (var i = 0; i < selectedRows.length; i++) {
              //   selectedRows[i].setValue("isEnable", "1");
              // }
              viewModel.search();
            }
          })
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "2");
              }
            }
          })
        }
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        var newrow = viewModel.complexItems.createEmptyRow({
          unSelect: true
        });
        var cCurRow = viewModel.complexList.getCurrentRow();
        if (cCurRow.getValue('discountRate')) {
          newrow.setValue('discountRate', cCurRow.getValue('discountRate'))
        }
        if (cCurRow.getValue('castTypeId') == 'pay01') {
          var grid2 = viewModel.app.getComp("grid_complexItem").grid;
          grid2.setRequired("discountRate", true);
        } else {
          var grid2 = viewModel.app.getComp("grid_complexItem").grid;
          grid2.setRequired("discountRate", false);
        }
        // viewModel.subArr.push({
        //   rowId: newrow.rowId,
        //   s: '',
        //   p: '',
        //   b: '',
        //   c: '',
        //   g: ''
        // });
      },
      detail2bill: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      // //导入
      // importHandle: function() {
      //   var urlInfo = viewModel.baseurl + '/excelDataImport'; //倒入地址参数
      //   var urlStatusInfo = viewModel.baseurl + '/excelLoadingStatus'; //请求进度地址参数
      //   var ele = $('#importFiel')[0]; //挂载元素
      //   common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      // },
      // //导出
      // exportHandle: function() {
      //   var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
      //   var templateUrl = viewModel.baseurl + '/downloadExcelTemplate'; //导出模板地址参数
      //   var excelDataUrl = viewModel.baseurl + '/excelDataExport'; //导出数据地址参数
      //   var listData = viewModel.complexList; //需要导出表格的dataTable
      //   var ele = $('#exportFiel')[0]; //挂载元素
      //   common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      // },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      //主表帐户修改，子表显示切换
      accountChange: function(castTypeId) {
        var drComp = viewModel.app.getComp("disCountRateID"); //主表商品优惠比例
        var tabs = $('#accountswitch .u-tabs__ta'),
          pay1 = null,
          pay2 = null;
        drComp.setEnable(false);
        if (!viewModel.complexList.getValue('discountRate')) {
          viewModel.complexList.setValue('discountRate', '');
        }
        switch (castTypeId) {
          case 'pay01':
            viewModel.complexList.setValue('castTypeName', '冲抵订单');
            drComp.setEnable(true);
            if (!viewModel.complexList.getValue('discountRate')) {
              viewModel.complexList.setValue('discountRate', 50);
            }

            // drComp.setRequired(true)
            if ($(tabs[1]).hasClass('is-active')) {
              pay2 = viewModel.complexItems.getSimpleData();
            }
            if (pay1) {
              viewModel.complexItems.setSimpleData(pay1);
            } else {
              viewModel.complexItems.removeAllRows();
            }
            var grid2 = viewModel.app.getComp("grid_complexItem").grid;
            grid2.setRequired("discountRate", false);
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-1"]').addClass('is-active').css("display", "inline");
            // $(tabs[0]).attr('href', "#tab-panel-1")
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-2"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs #tab-panel-1').addClass('is-active')
            $('div.u-tabs #tab-panel-2').removeClass('is-active');
            break;
          case 'pay02':
            viewModel.complexList.setValue('castTypeName', '货补');
            if ($('div.u-tabs .u-tabs__tab[href="#tab-panel-1"]').hasClass('is-active')) {
              pay1 = viewModel.complexItems.getSimpleData();
            }
            if (pay2) {
              viewModel.complexItems.setSimpleData(pay2);
            } else {
              viewModel.complexItems.removeAllRows();
            }
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-1"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-2"]').addClass('is-active').css("display", "inline");
            $('div.u-tabs #tab-panel-1').removeClass('is-active')
            $('div.u-tabs #tab-panel-2').addClass('is-active');
            break;
          case 'pay03':
            viewModel.complexList.setValue('castTypeName', '实物货补');
            viewModel.complexItems.removeAllRows();
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-1"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-2"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs #tab-panel-1').removeClass('is-active')
            $('div.u-tabs #tab-panel-2').removeClass('is-active');
            break;
          case 'pay04':
            viewModel.complexList.setValue('castTypeName', '账扣');
            viewModel.complexItems.removeAllRows();
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-1"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-2"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs #tab-panel-1').removeClass('is-active')
            $('div.u-tabs #tab-panel-2').removeClass('is-active');
            break;
          default:
            viewModel.complexList.setValue('castTypeName', '');
            viewModel.complexItems.removeAllRows();
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-1"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs .u-tabs__tab[href="#tab-panel-2"]').removeClass('is-active').css("display", "none");
            $('div.u-tabs #tab-panel-1').removeClass('is-active')
            $('div.u-tabs #tab-panel-2').removeClass('is-active');
        }
      }

    },
    afterCreate: function() {
      app = viewModel.app;
      viewModel.complexList.on('customerId.valuechange', function(obj) {
        if (!obj.newValue) return;
        if (viewModel.complexList.getValue('customerCategoryId')) {
          viewModel.complexList.setValue('customerCategoryId', '')
        }
      });
      viewModel.complexList.on('customerCategoryId.valuechange', function(obj) {
        if (!obj.newValue) return;
        if (viewModel.complexList.getValue('customerId')) {
          viewModel.complexList.setValue('customerId', '')
        }
      });
      viewModel.complexList.on("discountRate.valuechange", function(obj) {
        if (!obj.newValue) return;
        var newVal = obj.newValue;
        var itemsAllRows = viewModel.complexItems.getAllRows();
        if (!itemsAllRows.length) return;
        for (var key = 0; key < itemsAllRows.length; key++) {
          itemsAllRows[key].setValue('discountRate', newVal);
        }
      });
      viewModel.complexItems.on("seriesId.valuechange", function(obj) {
        var index = viewModel.subArr.indexOf(obj.rowId);
        if (obj.newValue == '') {
          if (index > -1) {
            viewModel.subArr.splice(index, 1);
          }
          return;
        }
        if (!obj.newValue) return;

        var allRows = viewModel.complexItems.getAllRows(),
          newVal = obj.newValue,
          curRow = obj.rowObj,
          isOn = false;
        for (var key = 0; key < allRows.length; key++) {
          if (allRows[key].rowId != obj.rowId && allRows[key].getValue('seriesId') == newVal) {
            toastr.warning('相同数据不允许重复,请重新选择！');
            if (index > -1) {
              viewModel.subArr[index] = obj.rowId;
            } else {
              viewModel.subArr.push(obj.rowId);
            }
            break;
          }
        }

        if (curRow.getValue('productLineId')) {
          curRow.setValue('productLineId', '');
          curRow.setValue('productLineName', '');
          curRow.setMeta('productLineId', 'display', '');
        }
        if (curRow.getValue('brandId')) {
          curRow.setValue('brandId', '');
          curRow.setValue('brandName', '');
          curRow.setMeta('brandId', 'display', '');
        }
        if (curRow.getValue('goodsCategoryId')) {
          curRow.setValue('goodsCategoryId', '');
          curRow.setValue('goodsCategoryName', '');
          curRow.setMeta('goodsCategoryId', 'display', '');
        }
        if (curRow.getValue('goodsId')) {
          curRow.setValue('goodsId', '');
          curRow.setValue('goodsName', '');
          curRow.setMeta('goodsId', 'display', '');
        }
      });
      viewModel.complexItems.on("productLineId.valuechange", function(obj) {
        var index = viewModel.pubArr.indexOf(obj.rowId);
        if (obj.newValue == '') {
          if (index > -1) {
            viewModel.pubArr.splice(index, 1);
          }
          return;
        }
        if (!obj.newValue) return;
        var curRow = obj.rowObj;
        var newVal = obj.newValue,
          allRows = viewModel.complexItems.getAllRows();
        for (var key = 0; key < allRows.length; key++) {
          if (allRows[key].rowId != obj.rowId && allRows[key].getValue('productLineId') == newVal) {
            toastr.warning('相同数据不允许重复,请重新选择！');
            if (index > -1) {
              viewModel.pubArr[index] = obj.rowId;
            } else {
              viewModel.pubArr.push(obj.rowId);
            }
            break;
          }
        }
        if (curRow.getValue('seriesId')) {
          curRow.setValue('seriesId', '');
          curRow.setValue('seriesName', '');
          curRow.setMeta('seriesId', 'display', '');
        }
        if (curRow.getValue('brandId')) {
          curRow.setValue('brandId', '');
          curRow.setValue('pbrandName', '');
          curRow.setMeta('brandId', 'display', '');
        }
        if (curRow.getValue('goodsCategoryId')) {
          curRow.setValue('goodsCategoryId', '');
          curRow.setValue('goodsCategoryName', '');
          curRow.setMeta('goodsCategoryId', 'display', '');
        }
        if (curRow.getValue('goodsId')) {
          curRow.setValue('goodsId', '');
          curRow.setValue('goodsName', '');
          curRow.setMeta('goodsId', 'display', '');
        }
      });
      viewModel.complexItems.on("brandId.valuechange", function(obj) {
        var index = viewModel.bubArr.indexOf(obj.rowId);
        if (obj.newValue == '') {
          if (index > -1) {
            viewModel.bubArr.splice(index, 1);
          }
          return;
        }
        if (!obj.newValue) return;
        var curRow = obj.rowObj;
        var newVal = obj.newValue,
          allRows = viewModel.complexItems.getAllRows();
        for (var key = 0; key < allRows.length; key++) {
          if (allRows[key].rowId != obj.rowId && allRows[key].getValue('brandId') == newVal) {
            toastr.warning('相同数据不允许重复,请重新选择！');
            if (index > -1) {
              viewModel.bubArr[index] = obj.rowId;
            } else {
              viewModel.bubArr.push(obj.rowId);
            }
            break;
          }
        }
        if (curRow.getValue('seriesId')) {
          curRow.setValue('seriesId', '');
          curRow.setValue('seriesName', '');
          curRow.setMeta('seriesId', 'display', '');
        }
        if (curRow.getValue('productLineId')) {
          curRow.setValue('productLineId', '');
          curRow.setValue('productLineName', '');
          curRow.setMeta('productLineId', 'display', '');
        }
        if (curRow.getValue('goodsCategoryId')) {
          curRow.setValue('goodsCategoryId', '');
          curRow.setValue('goodsCategoryName', '');
          curRow.setMeta('goodsCategoryId', 'display', '');
        }
        if (curRow.getValue('goodsId')) {
          curRow.setValue('goodsId', '');
          curRow.setValue('goodsName', '');
          curRow.setMeta('goodsId', 'display', '');
        }
      });
      viewModel.complexItems.on("goodsCategoryId.valuechange", function(obj) {
        var index = viewModel.cubArr.indexOf(obj.rowId);
        if (obj.newValue == '') {
          if (index > -1) {
            viewModel.cubArr.splice(index, 1);
          }
          return;
        }
        if (!obj.newValue) return;
        var curRow = obj.rowObj;
        var newVal = obj.newValue,
          allRows = viewModel.complexItems.getAllRows();
        for (var key = 0; key < allRows.length; key++) {
          if (allRows[key].rowId != obj.rowId && allRows[key].getValue('goodsCategoryId') == newVal) {
            toastr.warning('相同数据不允许重复,请重新选择！');
            if (index > -1) {
              viewModel.cubArr[index] = obj.rowId;
            } else {
              viewModel.cubArr.push(obj.rowId);
            }
            // isOn = true;
            break;
          }
        }
        if (curRow.getValue('seriesId')) {
          curRow.setValue('seriesId', '');
          curRow.setValue('seriesName', '');
          curRow.setMeta('seriesId', 'display', '');
        }
        if (curRow.getValue('productLineId')) {
          curRow.setValue('productLineId', '');
          curRow.setValue('productLineName', '');
          curRow.setMeta('productLineId', 'display', '');
        }
        if (curRow.getValue('brandId')) {
          curRow.setValue('brandId', '');
          curRow.setValue('brandName', '');
          curRow.setMeta('brandId', 'display', '');
        }
        if (curRow.getValue('goodsId')) {
          curRow.setValue('goodsId', '');
          curRow.setValue('goodsName', '');
          curRow.setMeta('goodsId', 'display', '');
        }
      });
      viewModel.complexItems.on("goodsId.valuechange", function(obj) {
        var index = viewModel.gubArr.indexOf(obj.rowId);
        if (obj.newValue == '') {
          if (index > -1) {
            viewModel.gubArr.splice(index, 1);
          }
          return;
        }
        if (!obj.newValue) return;
        var curRow = obj.rowObj;
        var newVal = obj.newValue,
          allRows = viewModel.complexItems.getAllRows();
        for (var key = 0; key < allRows.length; key++) {
          if (allRows[key].rowId != obj.rowId && allRows[key].getValue('goodsId') == newVal) {
            toastr.warning('相同数据不允许重复,请重新选择！');
            if (index > -1) {
              viewModel.gubArr[index] = obj.rowId;
            } else {
              viewModel.gubArr.push(obj.rowId);
            }
            // isOn = true;
            break;
          }
        }
        if (curRow.getValue('seriesId')) {
          curRow.setValue('seriesId', '');
          curRow.setValue('seriesName', '');
          curRow.setMeta('seriesId', 'display', '');
        }
        if (curRow.getValue('productLineId')) {
          curRow.setValue('productLineId', '');
          curRow.setValue('productLineName', '');
          curRow.setMeta('productLineId', 'display', '');
        }
        if (curRow.getValue('brandId')) {
          curRow.setValue('brandId', '');
          curRow.setValue('brandName', '');
          curRow.setMeta('brandId', 'display', '');
        }
        if (curRow.getValue('goodsCategoryId')) {
          curRow.setValue('goodsCategoryId', '');
          curRow.setValue('goodsCategoryName', '');
          curRow.setMeta('goodsCategoryId', 'display', '');
        }
      });
      viewModel.complexList.on("accountId.valuechange", function(obj) {
        if (!obj.newValue) return;
        var refer = $('div[id^="refContaineraccountId"]').data("uui.refer");
        var refValues = refer.values[0];

        if (!refValues) return;
        viewModel.complexList.setValue('saleOrgId', refValues.saleOrgId)
        viewModel.complexList.setValue('financeOrgId', refValues.financeOrgId)
        viewModel.complexList.setValue('saleOrgName', refValues.saleOrgName)
        viewModel.complexList.setValue('financeOrgName', refValues.financeOrgName)
        viewModel.complexList.setValue('castTypeId', refValues.castTypeId);
        viewModel.accountChange(refValues.castTypeId);
      })
    }
  });
  return view;
});