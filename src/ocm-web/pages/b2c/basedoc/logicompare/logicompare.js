define(['text!./logicompare.html', 'ocm_common', 'searchbox', 'editcard', './meta.js', 'ocm_global'], function(tpl, common, searchbox, editcard) {
  'use strict'
  var app, baseData, events, rendertype, viewModel, singledocSearch, singledoceidt, popupDialog;
  baseData = {
    baseurl: '/b2c/logistics-compares',
    logiCompareList: new u.DataTable(logiCompareMeta),
    storeList: new u.DataTable(mainDataMeta),
  };
  rendertype = {
    operation: function(obj) {
      var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
      var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
      obj.element.innerHTML = '<div class="ui-handle-icon">' +
        '<span class="ui-handle ui-tab-icon-b">' +
        '<a href="#" class="uifont icon-edit font-c-c" ' +
        editfun +
        ' title="编辑"></a>' +
        '</span>    ' +
        '<span class="ui-handle ui-tab-icon-b">' +
        '<a href="#" class="uifont icon-shanchu1 font-c-c" ' +
        delfun +
        ' title="删除"></a>' +
        '</span></div>';
      ko.cleanNode(obj.element);
      ko.applyBindings(viewModel, obj.element);
    }
  };
  events = {
    //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
    beforeEdit: function(index, rowId) {
      var title;
      viewModel.index = index;
      if (index >= 0) {
        //修改操作
        title = "编辑";
        var currentData = viewModel.logiCompareList.getRowByRowId(rowId).getSimpleData();
        viewModel.rowId = rowId;
        singledoceidt.seteidtData(currentData);
      } else {
        title = "新增"
        //清空编辑框的信息
        singledoceidt.cleareidt();
      }
      //显示模态框
      singledoceidt.show(title, "900px", viewModel.edit);
    },
    //将操作后的数据进行保存
    edit: function() {
      var result = singledoceidt.validate();
      if (result.passed) {
        var index = viewModel.index;
        var currentRow, type = "post";
        var postdata = singledoceidt.geteidtData();
        if (index >= 0) {
          type = "put";
        }
        //更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            //如果index大于等于0说明是修改
            singledoceidt.close();
            if (index >= 0) {
              //获取需要修改的行
              currentRow = viewModel.logiCompareList.getRowByRowId(viewModel.rowId);
              //将用户填写的数据更新到platformList上
            } else {
              //添加数据
              currentRow = viewModel.logiCompareList.createEmptyRow();
            }
            currentRow.setSimpleData(data);
            toastr.success("保存成功");
          }
        })
      }

    },
    //查询物流公司
    findtc: function() {
      //弹出
      viewModel.findtcRef();
      viewModel.storeList.removeAllRows();
      viewModel.storeList.createEmptyRow();
      if (!viewModel.findtcDialog) {
        viewModel.findtcDialog = u.dialog({
          // popupDialog = u.dialog({
          id: 'findtcPopup',
          content: "#findtcPopup",
          "width": "800px"
        });
        //保存按钮
        // var okButton = $("#clearStockPopup .J-ok");
        // okButton.unbind("click").click(function () {
        //   if (self.clearStockSave(orderId, rowId, rows)) {
        //     popupDialog.close();
        //   }
        // });
        var cancelButton = $("#findtcPopup .J-cancel");
        cancelButton.unbind("click").click(function() {
          viewModel.findtcDialog.close();
        });
      } else {
        viewModel.findtcDialog.show();
      }
    },
    findtcRef: function() {
      viewModel.storeList.on("storeName.valuechange", function(obj) {
        var rows = viewModel.storeList.getCurrentRow();
        var id = rows.getValue("storeName");
        // rows.setValue('tcname', appCtx + viewModel.baseurl);
        $._ajax({
          url: appCtx + viewModel.baseurl + "/queryByStoreId",
          type: "get",
          data: 'storeId=' + id,
          success: function(data) {
            // console.log(data)
            if(data.success){
              rows.setValue('tcname', data);
            }else{
              toastr.warning('此店铺没有设置物流公司！')
            }
          }
        });
      });
    },
    //删除和批量删除
    del: function(data, rowId) {
      if (typeof(data) == 'number') {
        viewModel.logiCompareList.setRowSelectbyRowId(rowId);
      }
      var ids = [];
      var rows = viewModel.logiCompareList.getSelectedRows();
      var status = [];
      var statustip = "";
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
                viewModel.logiCompareList.removeRows(rows);
                toastr.success("删除成功");

              }
            });

          }
        });
      } else {
        toastr.warning("请先选择需要删除数据");
      }

    },
    //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
    search: function(reindex) {
      if (reindex) {
        viewModel.logiCompareList.pageIndex(0);
      }
      viewModel.logiCompareList.removeAllRows();
      var queryData = singledocSearch.getDataWithOpr();
      queryData.size = viewModel.logiCompareList.pageSize();
      queryData.page = viewModel.logiCompareList.pageIndex();
      $._ajax({
        type: "get",
        url: appCtx + viewModel.baseurl,
        dataType: "json",
        data: queryData,
        success: function(data) {
          viewModel.logiCompareList.setSimpleData(data.content, {
            unSelect: true
          });
          viewModel.logiCompareList.totalRow(data.totalElements);
          viewModel.logiCompareList.totalPages(data.totalPages);
        }
      })
    },
    //清空搜索条件
    cleanSearch: function() {
      singledocSearch.clearSearch();
    },
    //页码改变时的回调函数
    pageChange: function(index) {
      viewModel.logiCompareList.pageIndex(index);
      viewModel.search();
    },
    //页码改变时的回调函数
    sizeChange: function(size) {
      viewModel.logiCompareList.pageSize(size);
      viewModel.search(true);
    }
  }
  viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

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
      $("#logicompare-searchcontent")[0], [{
        type: "text",
        key: "pcode",
        label: "平台物流公司编码"
      }, {
        type: "text",
        key: "pname",
        label: "平台物流公司名称"
      }, {
        type: "refer",
        key: "platform--id",
        label: "所属平台",
        refinfo: "b2cplatform",
        refName: "所属平台"
      }, {
        type: "refer",
        key: "logiCom",
        label: "物流公司",
        refinfo: "logistics-company",
        refName: "物流公司"
      }]);

    singledoceidt = new editcard(
      $("#dialog_layer")[0], [{
        type: "refer",
        key: "logiComId",
        label: "物流公司",
        refinfo: "logistics-company",
        refName: "物流公司",
        disableFilter: true,
        clientParam: {
          "EQ_dr": "0"
        }
      }, {
        type: "refer",
        key: "platformId",
        label: "所属平台",
        refinfo: "b2cplatform",
        refName: "所属平台",
        disableFilter: true,
        clientParam: {
          "EQ_dr": "0"
        }
      }, {
        type: "text",
        key: "pcode",
        label: "平台物流公司编码"
      }, {
        type: "text",
        key: "pname",
        label: "平台物流公司名称",
      }], logiCompareMeta);
    // 列表查询数据(无查询条件)
    viewModel.search();
  }

  function afterRender() {
    //绑定输入框enter事件
    $('#logicompare-searchcontent input').off("keydown").on("keydown", function(e) {
      if (e.keyCode == 13) {
        $(this).blur();
        viewModel.search();
      }
    });

  }

  function init(element, params) {
    appInit(element, params);
    afterRender();
  }

  return {
    init: init
  }
});