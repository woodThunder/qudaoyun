define(['text!./repairBom.html', 'ocm_common', 'searchbox', './meta.js', 'ocm_global'], function (tpl, common, searchbox) {
    'use strict'
    var app, baseData, events, rendertype, viewModel, singledocSearch;
    baseData = {
      baseurl: '/sc/repair-boms',
      mainList: new u.DataTable(mainMeta),
      bomDetails: new u.DataTable(mainMeta),
      partsList: new u.DataTable(partsMeta),
      repairBomAdd: new u.DataTable(mainMeta),
      partsList4Add: new u.DataTable(partsMeta),
      //备件参照
      partsRef: new u.DataTable(partsRef),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
  
      billPanelStatus: CONST.BILLPANELSTATUS.DEFAULT
    };
    rendertype = {
  
      precision2Render: common.rendertype.precision2Render,
      
      //跳转详情页
      detailRender: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
        obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
  
      //操作
      operation: function (obj) {
        var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
        var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML = '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a ' +
          editfun +
          ' title="编辑">编辑</a>' +
          '</span>    ' +
          '<span class="ui-handle-word">' +
          '<a ' +
          delfun +
          ' title="删除">删除</a>' +
          '</span></div>';
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      }
    };
    events = {
      //查看详情
      detail: function (index,rowId) {
        viewModel.mainList.setRowSelectbyRowId(rowId);
        var id = viewModel.mainList.getCurrentRow().getValue("id");
        //请求完整主子表信息
        viewModel.fillOrderDetailData(id);
        viewModel.goDetailPanel();
      },

          //查询子表数据
      fillOrderDetailData: function (id) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/detail/' + id,
          async: false,
          success: function (data) {
            //当前data
            viewModel.bomDetails.setSimpleData(data);
            viewModel.partsList.setSimpleData(data.parts);
            viewModel.repairBomAdd.setSimpleData(data);
            viewModel.partsList4Add.setSimpleData(data.parts);
          }
        })
      },
  
      //编辑
      beforeEdit: function (index) {
        if (index >= 0) { //编辑
          viewModel.mainList.setRowFocus(index);
          var id = viewModel.mainList.getCurrentRow().getValue("id");
          //请求完整主子表信息
          viewModel.fillOrderDetailData(id);
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.EDIT;
        } else { //新增
          var row = viewModel.repairBomAdd.createEmptyRow();
          viewModel.repairBomAdd.setRowFocus(row);
          viewModel.partsList4Add.removeAllRows();
          viewModel.goBillPanel();
          viewModel.billPanelStatus = CONST.BILLPANELSTATUS.ADD;
        }
        
      },

      //删除和批量删除
      del: function (index) {
        if (typeof (index) == 'number') {
          viewModel.mainList.setRowSelect(index);
        }
        var ids = [];
        var rows = viewModel.mainList.getSelectedRows();
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
                data: {
                  ids: ids.join(",")
                },
                success: function (data) {
                  viewModel.mainList.removeRows(rows);
                }
              });
            }
          });
        }
        else {
          toastr.warning("请先选择一行数据");
        }
      },
  
      //增行
      addRow: function () {
        viewModel.showRealPartsRef();
      },
      //删行
      delRow: function () {
        if (typeof (data) == 'number') {
          viewModel.partsList4Add.setRowSelect(data);
        }
        var ids = [];
        var rows = viewModel.partsList4Add.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
          var rows = viewModel.partsList4Add.getSelectedRows();
          viewModel.partsList4Add.removeRows(rows);
        } else {
          toastr.warning('请选择数据');
          return;
        }
      },
      // 点击grid备件参照 触发外部真实备件参照
      showRealPartsRef: function () {
        viewModel.clearRealPartsRef();
        $("#partsRefer .refer").trigger("click");
      },
      // 清除参照之前的选择
      clearRealPartsRef: function () {
        viewModel.partsRef.setValue("partsRefer", "");
        var refer = $("#refContainerpartsRefer").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      saveBill: function () {
        var type = "post";
        if (viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.ADD && viewModel.billPanelStatus !== CONST.BILLPANELSTATUS.COPY) {
          type = "put";
        }
        var repairBomData = viewModel.repairBomAdd.getCurrentRow().getSimpleData();
        var partsData = viewModel.partsList4Add.getSimpleData() || [];
        repairBomData.parts = partsData;
        var validate = $("#validate")[0];
        var result = app.compsValidateMultiParam({ element: validate, showMsg: true });
        if (partsData.length == 0) {
          toastr.warning('备件不可为空');
          return;
        }
        if (result.passed) {
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(repairBomData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              viewModel.search();
              viewModel.retListPanel();
            }
          });
        }
      },
      //点击取消 单据页
      cancelBill: function () {
        viewModel.retListPanel();
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.mainList.pageIndex(0);
        }
        viewModel.mainList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        queryData.size = viewModel.mainList.pageSize();
        queryData.page = viewModel.mainList.pageIndex();
        $.ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.mainList.setSimpleData(data.content, { unSelect: true });
            viewModel.mainList.totalRow(data.totalElements);
            viewModel.mainList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.mainList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.mainList.pageSize(size);
        viewModel.search(true);
      }
    }
  
    viewModel = u.extend({}, baseData, events, rendertype);
  
    function appInit(element, params) {
  
      //将模板页渲染到页面上
      element.innerHTML = tpl;
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      app = u.createApp({
        el: element,
        model: viewModel
      });
  
      // 查询组件初始化
      singledocSearch = new searchbox(
        $("#mainList-searchcontent")[0], [
          {
            type: "string",
            key: "code",
            label: "编码",
          },
          {
            type: "string",
            key: "name",
            label: "名称",
          },
          {
            type: "refer",
            key: "goodsId",
            label: "商品",
            refinfo: "goods",
            refName: "商品",
          }
         
        ]);
      // 列表查询数据(无查询条件)
      viewModel.search();
      var partsRow = viewModel.partsRef.createEmptyRow();
      viewModel.partsRef.setRowFocus(partsRow);
    }
  
    function afterRender() {
      // 初始化折叠面板
      $.fn.collapsepanel(false, true);
      //绑定输入框enter事件
      $('#mainList-searchcontent input').off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
          $(this).blur();
          viewModel.search();
        }
      });
      // 插件参照选择
      viewModel.partsRef.on("partsRefer.valuechange", function (obj) {
        if (!obj.newValue) {
          return;
        }
        var refValues = $("#refContainerpartsRefer").data("uui.refer").values;
        var selecRows = [];
  
        if (refValues && refValues.length > 0) {
          var newRows = [];
          for (var i = 0; i < refValues.length; i++) {
            var newRow = undefined;
            newRow = new u.Row({
              parent: viewModel.partsList4Add
            });
            //判断是否存在row
            var row = viewModel.partsList4Add.getRowByField("partsCode", refValues[i].refcode);
            if (!row) {
              newRows.push(newRow);
              selecRows.push(newRow);
            }
            newRow.setValue("partsId", refValues[i].id);
            newRow.setValue("partsName", refValues[i].refname);
            newRow.setValue("partsCode", refValues[i].refcode);
            newRow.setValue("model", refValues[i].model);
            newRow.setValue("unit", refValues[i].unit);
            newRow.setValue("description", refValues[i].description);
            
          }
          viewModel.partsList4Add.insertRows(0, newRows);
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