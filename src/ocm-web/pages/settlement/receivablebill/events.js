define(['ocm_common'], function(common) {
  'use strict';
  var events = function(viewModel) {
    var billstatus = CONST.B2BENUM.SALEORDER;
    return {
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {

        if (reindex) {
          viewModel.salesorderList.pageIndex(0);
        }
        viewModel.salesorderList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.salesorderList.pageSize();
        var pageNumber = viewModel.salesorderList.pageIndex();
        var searchindex = viewModel.tabindex;
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.salesorderList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.salesorderList.totalRow(data.totalElements);
            viewModel.salesorderList.totalPages(data.totalPages);
            viewModel.dataHolder = data.content;
          }
        })
      },
      addproductsHandler: function() {
        viewModel.clearItemsRef();
        $("#saleorderaddItemsRef .refer").trigger("click");
      },
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      //导出
      exportHandle: function() {

        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var searchindex = viewModel.tabindex;
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.salesorderList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      //清空搜索条件
      cleanSearch: function() {

        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {

        viewModel.salesorderList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {

        viewModel.salesorderList.pageSize(size);
        viewModel.search(true);
      },
      beforebatchoperate: function(opr) {

        viewModel.batchopr(opr);
        if (opr == 'del') {
          viewModel.batchoprtitle("删除");
        } else if (opr == 'close') {
          viewModel.closeReason.removeAllRows();
          viewModel.closeReason.createEmptyRow();
          viewModel.batchoprtitle("关闭");
        } else {
          viewModel.batchoprtitle("审核");
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows && rows.length > 0) {
          var totalData = [];
          viewModel.batchSaleOrderItems.removeAllRows();
          var ids = rows.map(function(row) {
            return row.getValue("id");
          })
          var queryData = {
            "search_IN_saleOrder.id": ids.join(",")
          };
          $._ajax({
            type: "get",
            url: appCtx + '/sale-order-item/find-items-batch',
            dataType: "json",
            data: queryData,
            success: function(data) {
              viewModel.batchSaleOrderItems.setSimpleData(data, {
                unSelect: true
              });
            }
          })
          if (!viewModel.batchoperatedialog) {
            viewModel.batchoperatedialog = u.dialog({
              id: 'dialog_batchoperate',
              content: "#dialog_batchoperate",
              hasCloseMenu: true,
              width: "90%"
            });
            var cancelButton = $("#dialog_batchoperate .J-cancel");
            cancelButton.off().on('click', function() {

              viewModel.batchoperatedialog.close();
            });
          } else {
            viewModel.batchoperatedialog.show();
          }
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      batchOperateConfirm: function() {

        var opr = viewModel.batchopr();
        var rows = viewModel.salesorderList.getSelectedRows();
        var closefunc = function() {
          viewModel.batchoperatedialog.close();
        }
        if (opr == 'del') {
          viewModel.del_ajax(rows, closefunc);
        } else if (opr == 'close') {
          var closeReason = viewModel.closeReason.getValue("closeReason");
          viewModel.closelist_ajax(rows, closeReason, closefunc);
        } else {
          viewModel.approvelist_ajax("/approve-list", rows, "", 1, closefunc);
        }

      },
      //删除和批量删除
      del: function(data, rowId) {

        if (typeof(data) == 'number') {
          viewModel.salesorderList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows && rows.length > 0) {
          common.dialog.confirmDialog({
            msg1: '确认删除这些项？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              viewModel.del_ajax(rows);
            }
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      del_ajax: function(rows, callback) {

        var ids = [];
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + "/delete",
          type: "post",
          data: {
            ids: ids.join(",")
          },
          success: function(data) {
            if (typeof callback == "function") {
              callback();
            }
            toastr.success();
            viewModel.salesorderList.removeRows(rows);
          }
        });
      },
      commit: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.salesorderList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('state') == '1' || data.getValue('state') == '6';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认提交这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/send",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('state', '2');
                      item.setValue('operation', '2');
                    });
                    // viewModel.salesorderList.trigger('valuechange')
                    toastr.success();
                    // viewModel.salesorderList.removeRows(rows);
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以提交的数据");
          }
        });
      },
      commitRollback: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.salesorderList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('state') == '2';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认收回这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/unsend",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('state', '1');
                      item.setValue('operation', '1');
                    });
                    toastr.success();
                    // viewModel.salesorderList.removeRows(rows);
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以收回的数据");
          }
        });
      },
      audit: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.salesorderList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('state') == '2';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认审批这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/audit",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('state', '3');
                      item.setValue('operation', '3');
                    });
                    toastr.success();
                    // viewModel.salesorderList.removeRows(rows);
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以审批的数据");
          }
        });
      },
      unapprove: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.salesorderList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows.length < 1) {
          toastr.warning("请先选择一行数据");
          return
        }
        viewModel.filterRowAndSubmit(rows, function(data) {
          return data.getValue('state') == '3';
        }, function(datas) {
          if (datas.length > 0) {
            common.dialog.confirmDialog({
              msg1: '确认取消审批这些项？',
              msg2: '此操作不可逆',
              width: '400px',
              type: 'error',
              onOk: function() {
                var ids = datas.map(function(item) {
                  return item.getValue('id');
                });
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/unapprove",
                  type: "post",
                  data: {
                    id: ids
                  },
                  success: function(data) {
                    rows.forEach(function(item, index) {
                      item.setValue('state', '2');
                      item.setValue('operation', '2');
                    });
                    toastr.success();
                    // viewModel.salesorderList.removeRows(rows);
                  }
                });
              }
            });
          } else {
            toastr.warning("没有可以取消审批的数据");
          }
        });
      },
      /**
       * rows DataTable.Row 对象数组
       * predicateFunc 谓言函数
       * callback 过滤后的 row 数组的执行函数
       */
      filterRowAndSubmit: function(rows, predicateFunc, callback) {
        var newRows = rows.filter(function(row, index) {
          return typeof predicateFunc == 'function' ? predicateFunc(row) : true;
        });
        if (callback && typeof callback == 'function') {
          callback(newRows);
        }
        return newRows;
      },
      //进入新增单据页
      showAddBillPanel: function() {

        viewModel.index = -1;
        viewModel.salesorderCard.removeAllRows();
        var curRow = viewModel.salesorderCard.createEmptyRow();
        // 行号池
        viewModel.curRowNum(0);
        // viewModel.getCurDate(curRow);
        //合计行还原
        viewModel.totalPrecisionHandle(curRow, "add");
        // 单据状态为未提交
        // curRow.setValue("state", '1');
        // curRow.setValue("stateName", "未提交");

        viewModel.saleOrderItems.removeAllRows();
        viewModel.setDefaultCondition();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index, rowId) {

        var row;
        if (index == -1) {
          //处理通过详情页编辑进入
          row = viewModel.salesorderList.getFocusRow();
          //通过改变index判断当前处于编辑态
          index = 0;
        } else {
          //行上的编辑按钮
          row = viewModel.salesorderList.getRowByRowId(rowId);
        }
        viewModel.index = index;
        viewModel.rowId = row.rowId;

        var id = row.getValue("id");
        viewModel.findByParentid(id, function(maindata) {

          var childdata = maindata.gatherDetails;
          // 记录下最初的子表数据
          viewModel.saleOrderItems._oldsimpledata = childdata;
          viewModel.salesorderCard.setSimpleData(row.getSimpleData());
          viewModel.saleOrderItems.setSimpleData(childdata, {
            unSelect: true
          });
          viewModel.getCurRowNum();
          // 处理合计行精度
          viewModel.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        });

      },
      //进入复制单据页
      showCopyBillPanel: function() {

        viewModel.index = -1;
        var copyRow = viewModel.salesorderList.getFocusRow();
        if (copyRow) {
          var id = copyRow.getValue("id");
          viewModel.findByParentid(id, function(maindata) {
            var childdata = maindata.saleOrderItems;
            // 给主表工厂字段赋值
            if (childdata && childdata.length > 0) {
              maindata.factoryId = childdata[0].factoryId;
              maindata.factoryName = childdata[0].factoryName;
            }

            viewModel.salesorderCard.setSimpleData(maindata);
            viewModel.saleOrderItems.setSimpleData(childdata, {
              unSelect: true,
              status: "new"
            });
            var curRow = viewModel.salesorderCard.getFocusRow();
            // 处理账号类型
            if (!viewModel.accountTypeCombo) {
              viewModel.accountTypeCombo = app.getComp("accountTypeCombo");
            }
            viewModel.accountTypeCombo.setEnable(false);
            // 为参照设置联动条件
            viewModel.seteidtCondition();
            // 获得服务器当前时间
            // viewModel.getCurDate(curRow);
            // 获得当前最大行号
            viewModel.getCurRowNum();
            // 为合计行进行精度处理
            viewModel.totalPrecisionHandle(curRow);

            //删除主表主键，编码，审计信息
            viewModel.clearBaseProp(curRow, 1);

            // 单据状态为未提交
            curRow.setValue("billStatusCode", billstatus.COMMITTED);
            curRow.setValue("billStatusName", "未提交");
            //删除子表主键，子表主表关联,并获得产品id
            var subRows = viewModel.saleOrderItems.getAllRows();
            var productids = [];
            if (subRows && subRows.length > 0) {
              for (var i = 0; i < subRows.length; i++) {
                viewModel.clearBaseProp(subRows[i], 2);
                productids.push(subRows[i].getValue("productId"));
                // 删除孙表主键，孙表和子表之间的关联
                var subStructRows = subRows[i].getValue("soProductStrucs").getAllRows();
                if (subStructRows && subStructRows.length > 0) {
                  for (var j = 0; j < subStructRows.length; j++) {
                    viewModel.clearBaseProp(subStructRows[j], 3);
                  }
                }
              }
            }

            $(".ui-bill-detail").hide();
            viewModel.goBillPanel();
            viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
            // 重新询价
            if (productids.length > 0) {
              viewModel.inquiryPrice(productids);
            }

          });

        } else {
          toastr.warning("未找到来源单据");
        }
      },
      //详情
      detail: function(obj) {
        // var that = this;
        if (!obj.rowObj) return;
        //确保grid先将行设置为focus状态

        setTimeout(function() {
          viewModel.salesorderList.setRowSelect(obj.rowIndex);
          var curRow = obj.rowObj.value
          // 为合计行进行精度处理
          // viewModel.totalPrecisionHandle(curRow);
          var id = curRow["id"];
          if (viewModel.dataHolder) {
            viewModel.dataHolder.every(function(row, index) {
              if (row['id'] == id) {
                viewModel.salesorderDetailCard.setSimpleData(row);
                viewModel.saleOrderItems.setSimpleData(row['receivDetails']);
                return false;
              }
            })
            viewModel.goDetailPanel();
          }

          viewModel.findByParentid(id, function(data) {
            viewModel.salesorderDetailCard.setSimpleData(curRow);
            viewModel.saleOrderItems.setSimpleData(data);
          })

        }, 0);
      },
      //查询子表数据
      findByParentid: function(id, callback) {

        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail/" + id,
          type: 'get',
          // data: {
          //   id: id
          // },
          success: function(data) {
            if (data) {
              if (typeof callback == "function") {
                callback(data);
              }
            } else {
              toastr.error();
            }
          }
        })
      },
      // 清除基类属性
      clearBaseProp: function(row, type) {

        // 公共
        row.setValue("id", "");
        row.setValue("creator", "");
        row.setValue("creationTime", "");
        row.setValue("modifier", "");
        row.setValue("modifiedTime", "");
        // 主表
        if (type == 1) {
          row.setValue("orderCode", "");
          row.setValue("billStatusId", "");
          row.setValue("billStatusCode", "");
          row.setValue("billStatusName", "");
          row.setValue("billMakerId", "");
          row.setValue("billMakerName", "");
          row.setValue("approverId", "");
          row.setValue("approveTime", "");
          row.setValue("approveOpinion", "");
          row.setValue("srcBillType", null);
          row.setValue("srcBillId", null);
          row.setValue("srcBillCode", null);
          row.setValue("isToTMS", "0");
        }
        // 子表
        if (type == 2) {
          row.setValue("saleOrderId", "");
          row.setValue("saleOrderCode", "");
          row.setValue("saleOrderType", "");
          row.setValue("billItemStatusId", "");
          row.setValue("billItemStatusCode", "");
          row.setValue("billItemStatusName", "");
          row.setValue("salePrice", null);
          row.setValue("dealPrice", null);
          row.setValue("confirmedQuantity", null);
          row.setValue("srcBillTypeId", null);
          row.setValue("srcBillTypeCode", null);
          row.setValue("srcBillTypeName", null);
          row.setValue("srcBillId", null);
          row.setValue("srcBillCode", null);
          row.setValue("srcBillRowId", null);
          row.setValue("srcBillRowNum", null);
          row.setValue("packedQuantity", null);
          row.setValue("unpackedQuantity", null);
          row.setValue("caredQuantity", null);
          row.setValue("vsoTransSoQuantity", null);
          row.setValue("vsoNotTransSoQuantity", null);
          row.setValue("distributeUnmetQuantity", null);
          row.setValue("closeReasonCode", null);
          row.setValue("closeReasonName", null);
          row.setValue("closedBy", null);
          row.setValue("closeTime", null);
        }
        // 孙表
        if (type == 3) {
          row.setValue("id", "");
          row.setValue("saleOrderItemId", "");
          row.setValue("parentId", "");
        }
      },
      // 添加新行
      addLineHandler: function() {
        var rowNum = viewModel.generaterowNum();
        var newrow = viewModel.saleOrderItems.createEmptyRow();
        newrow.setSimpleData({
          productLine: '',
          //  ('我是一个产品线'+Math.random()).substr(0,30),
          money: 0,
          remainMoney: 0,
          serialnum: rowNum,
        });
      },
      delLineHandler: function() {
        var indices = viewModel.saleOrderItems.getSelectedIndices();
        viewModel.saleOrderItems.removeRows(indices);
      },

      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        viewModel.clearItemsRef();
        $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      clearItemsRef: function() {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 从行号池中拿到最新的行号
      generaterowNum: function() {
        var latestnum = viewModel.curRowNum(),
          newnum = parseFloat(latestnum) + 10;
        viewModel.curRowNum(newnum);
        return newnum;
      },
      //新增子表项
      addItem: function() {

        if (viewModel.isAvailable()) {
          viewModel.saleOrderItems.createEmptyRow();
        }
      },
      //删除子表项
      delItems: function() {

        var selectedRows = viewModel.saleOrderItems.getSelectedRows();
        viewModel.saleOrderItems.removeRows(selectedRows);
        viewModel.calcItemTotal();
      },
      isAvailable: function() {

        var soTypeId = viewModel.salesorderCard.getValue("soTypeId");
        var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
        var saleChannelId = viewModel.salesorderCard.getValue("saleChannelId");
        var productGroupId = viewModel.salesorderCard.getValue("productGroupId");
        var essentialData = {
          soTypeId: "订单类型",
          saleOrgId: "销售组织",
          saleChannelId: "销售渠道",
          productGroupId: "产品组"
        }
        var errmsg = "";
        for (var key in essentialData) {
          if (!eval(key)) {
            errmsg += ("<span style='color:red'>" + essentialData[key] + "&nbsp;</span>");
          }
        }
        if (errmsg) {
          toastr.warning("请先选择" + errmsg);
          return false;
        }
        return true;
      },
      detail2: function(obj) {
        console.log(obj.rowObj.value)
        // viewModel.dataHolder
        if (viewModel.dataHolder) {
          viewModel.dataHolder.every(function(row, index) {
            if (row['id'] == obj.rowObj.value['id']) {
              viewModel.saleOrderItems.setSimpleData(row['receivDetails']);
              return false;
            }
          })
        }
      },
      //保存单据
      saveBill: function() {
        var result = 1; //viewModel.validateBill();
        // console.log();

        if (result) {
          var currentRow, index = viewModel.index;
          var salesorderData = viewModel.salesorderCard.getSimpleData()[0];
          var saleOrderItemsData = viewModel.saleOrderItems.getSimpleData();
          if (saleOrderItemsData.length < 1) {
            toastr.error("行数据不可为空");
            return;
          }
          var status = viewModel.salesorderCard.getRow(0).status;
          // console.log(status);
          var method = 'post';

          if (status === Row.STATUS.NEW) {
            method = 'post'
          } else if (status === Row.STATUS.UPDATE || status === Row.STATUS.NORMAL) {
            // method = 'put'
          }
          salesorderData.receivDetailsDtos = saleOrderItemsData;
          var _ajaxUrl = "";
          $._ajax({
            url: appCtx + viewModel.baseurl + _ajaxUrl,
            type: method,
            data: JSON.stringify(salesorderData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              toastr.success("保存成功");
              viewModel.retListPanel();
              viewModel.search();
            }
          })
        }

      },
      // 校验单据合法性
      validateBill: function() {
        var result = this.app.compsValidateMultiParam({
          element: $("#salesorder-operatepanel")[0],
          showMsg: true
        });
        // 编辑时不校验主表字段
        if (result.passed || CONST.BILLPANELSTATUS.EDIT == viewModel.billPanelStatus()) {
          var rows = viewModel.saleOrderItems.getAllRealRows();
          if (rows && rows.length > 0) {
            var errmsg = "";
            for (var i = 0; i < rows.length; i++) {
              var temperrmsg = "";
              // 数量校验
              if (rows[i].getValue("orderNum") == null || rows[i].getValue("orderNum") == "") {
                temperrmsg += " <span style='color:red'>请录入退货数量</span> "
              } else {
                var quantity = parseInt(rows[i].getValue("orderNum"));
                if (quantity <= 0) {
                  temperrmsg += " <span style='color:red'>数量不能为负</span> "
                }
              }
              // TODO 询价
              rows[i].setValue("salePrice", 9.9);
              // 价格校验
              if (rows[i].getValue("salePrice") == null || rows[i].getValue("dealPrice") == null || rows[i].getValue("salePrice") == "" || rows[i].getValue("dealPrice") == "") {
                temperrmsg += " <span style='color:red'>未询到价格</span> "
              }
              if (temperrmsg) {
                temperrmsg = "行号为：" + rows[i].getValue("rowNum") + " 销售产品为：" + rows[i].getValue("goodsName") + temperrmsg + "<br/>";
                errmsg += temperrmsg;
              }
            }
            if (errmsg) {
              errmsg = "保存失败，请检查<br/>" + errmsg
              toastr.error(errmsg);
              return false;
            }
          } else {
            toastr.warning("至少添加一个产品");
            return false;
          }
        } else {
          return false;
        }
        return true;

      },
      //取消单据
      cancelBill: function() {

        if (viewModel.billPanelStatusCheck() == 0) {
          if (!viewModel.checkupdstatus()) {
            common.dialog.confirmDialog({
              msg1: '当前订单已修改,尚未保存',
              msg2: '是否返回列表',
              width: '400px',
              onOk: function() {
                viewModel.retListPanel();
              }
            });
          } else {
            viewModel.retListPanel();
          }
        } else {
          viewModel.retListPanel();
        }
      },
      checkupdstatus: function() {
        var curRow = viewModel.salesorderCard.getFocusRow();
        if (curRow && curRow.status == "upd") {
          return false;
        }
        var childRows = viewModel.saleOrderItems.getAllRows();
        if (childRows && childRows.length > 0) {
          for (var i = 0; i < childRows.length; i++) {
            if (childRows[i].status == "upd") {
              return false;
            }
          }
        }
        return true;
      },
      //审核单据
      approveBill: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.salesorderList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.approve_ajax("/approve", id, "", 1);
        }, 0);
      },
      //弃审单据
      unapproveBill: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.salesorderList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.approve_ajax("/approve", id, "", 0);
        }, 0);
      },
      approveBillList: function() {
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows && rows.length > 0) {
          viewModel.approvelist_ajax("/approve-list", rows, "", 1);
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //弃审单据
      unapproveBillList: function() {
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows && rows.length > 0) {
          viewModel.approvelist_ajax("/approve-list", rows, "", 0);
        } else {
          toastr.warning("请至少选择一项");
        }
      },

      approve_ajax: function(url, id, remark, type) {
        $._ajax({
          url: appCtx + viewModel.baseurl + url,
          type: "post",
          data: {
            id: id,
            remark: remark,
            type: type
          },
          success: function(result) {
            if (result.success) {
              var message = "操作成功。";
              if (type == 1) {
                message = "审核成功。";
              } else if (type == 0) {
                message = "弃审成功。";
              }
              toastr.success(message);

              viewModel.search();
              viewModel.retListPanel();
            } else {
              toastr.error(result.message);
            }
          }
        })
      },
      approvelist_ajax: function(url, rows, remark, type, callback) {
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id") + "=" + rows[i].getValue("orderCode"));
        }
        $._ajax({
          url: appCtx + viewModel.baseurl + url,
          type: "post",
          data: {
            ids: ids.join(","),
            remark: remark,
            type: type
          },
          success: function(data) {
            var success = true,
              errmsg = "";
            if (data && data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                if (data[i].code == "0") {
                  errmsg += "单号为：" + data[i].content + " 审核失败,原因为：" + data[i].message + "<br/>";
                }
              }
              if (errmsg.length > 0) {
                success = false;
                toastr.error(errmsg);
              }
            }
            if (success) {
              if (typeof callback == "function") {
                callback();
              }
              var message = "操作成功。";
              if (type == 1) {
                message = "审核成功。";
              } else if (type == 0) {
                message = "弃审成功。";
              }
              toastr.success(message);
              viewModel.search();
            }
          }
        });
      },
      close_list: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.salesorderList.setRowSelectbyRowId(rowId);
        }
        var rows = viewModel.salesorderList.getSelectedRows();
        if (rows && rows.length > 0) {
          viewModel.closeReason.removeAllRows();
          viewModel.closeReason.createEmptyRow();
          var closefunc = function() {
            viewModel.closelistdialog.close();
          }
          if (!viewModel.closelistdialog) {
            viewModel.closelistdialog = u.dialog({
              id: 'closelist-dialog',
              content: "#closelist-dialog",
              hasCloseMenu: true,
              width: "500px"
            });
            var cancelButton = $("#closelist-dialog .J-cancel");
            cancelButton.off().on('click', closefunc);
          } else {
            viewModel.closelistdialog.show();
          }
          var okButton = $("#closelist-dialog .J-ok");
          okButton.off().on('click', function() {
            var closeReason = viewModel.closeReason.getValue("closeReason");
            viewModel.closelist_ajax(rows, closeReason, closefunc);
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      closelist_ajax: function(rows, closeReason, callback) {
        if (!closeReason) {
          toastr.error("请选择关闭原因");
          return;
        }
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        $._ajax({
          url: appCtx + "/order-close/close-sale-order",
          type: "post",
          data: {
            ids: ids.join(","),
            closeReason: closeReason
          },
          success: function(data) {
            if (typeof callback == "function") {
              callback();
            }
            // 全部订单关闭成功
            if (data.success === true) {
              toastr.success(data.message);
            }
            // 存在订单关闭失败，将失败订单号作为查询条件并提示失败原因
            else {
              toastr.error(data.message);
              var vsoCodes = data.data.join(",");
              viewModel.searchcomp.viewModel.params.setValue("orderCode", vsoCodes);
            }
            viewModel.search();
          }
        });
      },
      // 拼接关闭失败错误提示
      getErrorMsg: function(msglist) {
        var showmsg = "";
        if (msglist && msglist.length > 0) {
          for (var i = 0; i < msglist.length; i++) {
            // 产品组合
            if (msglist[i].productCombineName) {
              showmsg += "组合[" + msglist[i].productCombineName + "]";
            }
            // 产品
            if (msglist[i].productDesc) {
              showmsg += "产品[" + msglist[i].productDesc + "]";
            }
            showmsg += "(";
            // 活动
            if (msglist[i].activityName) {
              showmsg += "活动:" + msglist[i].activityName + ",";
            }
            // 需求类型
            if (msglist[i].reqType) {
              showmsg += "需求类型:" + msglist[i].reqType + ",";
            }
            // 启运量
            if (msglist[i].shippedQuantity) {
              showmsg += "启运量:" + msglist[i].shippedQuantity + ",";
            }
            // 配车量
            if (msglist[i].caredQuantity) {
              showmsg += "配车量:" + msglist[i].caredQuantity + ",";
            }
            showmsg.charAt(showmsg.length - 1) == "," ? showmsg = showmsg.slice(0, -1) : "";
            showmsg += ")<br>";
          }
        }
        return showmsg;
      },
      // 获取需要补全的产品组合行key（需求类型id:活动id:产品组合id）
      getCombineItemKeyMap: function(combinelist) {
        var map = {};
        for (var i = 0; i < combinelist.length; i++) {
          // 使用key "需求类型id:活动id:产品组合id"唯一标识
          var uniqueKey = combinelist[i].promotionId + ":" + combinelist[i].reqTypeId + ":" + combinelist[i].productCombineId;
          map[uniqueKey] = true;
        }
        return map;
      },
      // 补全产品组合中其他产品
      productCombineHandle: function(listdata) {
        var retListData = [];
        // 拆分成产品组合订单行数组、产品订单行数组
        var combinelist = [];
        var productlist = [];
        for (var i = 0; i < listdata.length; i++) {
          if (listdata[i].productCombineId) {
            combinelist.push(listdata[i]);
          } else {
            productlist.push(listdata[i]);
          }
        }
        // 获取需要补全的产品组合行key（需求类型id:活动id:产品组合id）
        var uniqueKeyMap = viewModel.getCombineItemKeyMap(combinelist);
        var allItems = viewModel.saleOrderItems.getSimpleData();
        var wholeCombineItems = [];
        for (var i = 0; i < allItems.length; i++) {
          var uniqueKey = allItems[i].promotionId + ":" + allItems[i].reqTypeId + ":" + allItems[i].productCombineId;
          if (uniqueKeyMap[uniqueKey]) {
            wholeCombineItems.push(allItems[i]);
          }
        }
        retListData = wholeCombineItems.concat(productlist);
        return retListData;
      },
      close_item: function() {
        var ids = [];
        var rows = viewModel.saleOrderItems.getSelectedRows();
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            // 已关闭行不能再进行关闭操作
            if (rows[i].getValue("billItemStatusCode") == "06") {
              toastr.error("状态为【已关闭】的订单行不能再次关闭");
              return;
            }
          }
          viewModel.closeReason.removeAllRows();
          viewModel.closeReason.createEmptyRow();
          // 显示要关闭的订单行
          var selectedItems = viewModel.saleOrderItems.getSimpleData({
            type: "select"
          });
          // 补全产品组合中其他产品行，保证在相同需求类型、相同活动下产品组合成套
          var closeItems = viewModel.productCombineHandle(selectedItems);
          viewModel.closeOrderItems.setSimpleData(closeItems, {
            unSelect: true
          });
          if (!viewModel.closeitemdialog) {
            viewModel.closeitemdialog = u.dialog({
              id: 'closeitem-dialog',
              content: "#closeitem-dialog",
              hasCloseMenu: true,
              width: "80%"
            });
            var cancelButton = $("#closeitem-dialog .J-cancel");
            cancelButton.off().on('click', function() {
              viewModel.closeitemdialog.close();
            });
          } else {
            viewModel.closeitemdialog.show();
          }
          var okButton = $("#closeitem-dialog .J-ok");
          okButton.off().on('click', function() {
            var closeReason = viewModel.closeReason.getValue("closeReason");
            if (!closeReason) {
              toastr.error("请选择关闭原因");
              return;
            }
            var closeItems = viewModel.closeOrderItems.getSimpleData();
            var closeItemIds = [];
            for (var i = 0; i < closeItems.length; i++) {
              closeItemIds.push(closeItems[i].id);
            }
            $._ajax({
              url: appCtx + "/order-close/close-sale-order-item",
              type: "post",
              data: {
                ids: closeItemIds.join(","),
                closeReason: closeReason,
                isForce: false
              },
              success: function(data) {
                viewModel.closeitemdialog.close();
                var message = data.message;
                // 拼接提示信息
                var msglist = data.data;
                var showmsg = viewModel.getErrorMsg(msglist);
                // 订单行可以全部关闭，提示信息并让用户确认是否继续关闭
                if (data.success) {
                  message ? message += "," : "";
                  common.dialog.confirmDialog({
                    msg1: '符合关闭条件，是否继续关闭订单行？',
                    msg2: showmsg,
                    width: '600px',
                    // type: 'error',
                    onOk: function() {
                      $._ajax({
                        url: appCtx + "/order-close/close-sale-order-item",
                        type: "post",
                        data: {
                          ids: closeItemIds.join(","),
                          closeReason: closeReason,
                          isForce: true
                        },
                        success: function(data) {
                          toastr.success();
                          viewModel.detail();
                          var items = viewModel.saleOrderItems.getSimpleData();
                          var closeCount = 0;
                          for (var i = 0; i < items.length; i++) {
                            items[i].billItemStatusCode == billstatus.ROWCLOSED ? closeCount++ : '';
                          }
                          // 全部行状态都为关闭，则订单状态变更为已完成
                          if (items.length === closeCount) {
                            var curRow = viewModel.salesorderList.getCurrentRow();
                            curRow.setValue("billStatusCode", billstatus.FINISHED);
                            curRow.setValue("billStatusName", "已完成");
                          }
                        }
                      })
                    }
                  });
                }
                // 存在订单行不能关闭，提示用户原因
                else {
                  var errorMsg = data.message + "<br>";
                  errorMsg += showmsg;
                  toastr.error(errorMsg, "", {
                    extendedTimeOut: 0,
                    timeOut: 0
                  });
                }
              }
            });
          });
        } else {
          toastr.warning("请先选择一行数据");
        }
      },
      bomexpand: function(rowId) {
        var row = viewModel.saleOrderItems.getRowByRowId(rowId);
        var childdata = row.getValue("soProductStrucs").getSimpleData();
        viewModel.soProductStrucs.setSimpleData(childdata);
        if (!viewModel.bomexpandialog) {
          viewModel.bomexpandialog = u.dialog({
            id: 'dialog_bomexpand',
            content: "#dialog_bomexpand",
            hasCloseMenu: true,
            width: "700px"
          });
        } else {
          viewModel.bomexpandialog.show();
        }
      },
      openUncaredDetaildlg: function() {
        viewModel.allocationSearchParam.removeAllRows();
        viewModel.allocationSearchParam.createEmptyRow();
        viewModel.allocationresult.removeAllRows();
        var listSearchData = viewModel.searchcomp.getSearchData();
        var defaultCondition = {
          agencyId: listSearchData["agency--id"],
          receiveAddressId: listSearchData["receiveAddress--id"],
          customerId: listSearchData["businessAccount--id"],
          distributionCenterId: listSearchData["distributionCenter--id"],
          orderCode: listSearchData["orderCode"],
          productName: listSearchData["saleOrderItems--productDesc"],
        }
        viewModel.allocationSearchParam.getRow(0).setSimpleData(defaultCondition);
        viewModel.uncaredDetailSearch(true);
        if (!viewModel.allocationresultdlg) {
          viewModel.allocationresultdlg = u.dialog({
            id: 'dialog_allocationresult',
            content: "#dialog_allocationresult",
            hasCloseMenu: true,
            width: "80%"
          });
        } else {
          viewModel.allocationresultdlg.show();
        }
      },
      uncaredDetailSearch: function(reindex) {
        if (reindex) {
          viewModel.allocationresult.pageIndex(0);
        }
        var inputsearchdata = viewModel.allocationSearchParam.getSimpleData()[0];
        delete inputsearchdata.persistStatus;
        var pageSize = viewModel.allocationresult.pageSize();
        var pageNumber = viewModel.allocationresult.pageIndex();
        var postdata = {
          searchParam: inputsearchdata,
          currentPage: pageNumber + 1,
          pageSize: pageSize
        }
        $._ajax({
          url: appCtx + "/view_allocation_result/query-page",
          type: "post",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.allocationresult.setSimpleData(data.result, {
              unSelect: true
            });
            viewModel.allocationresult.totalRow(data.totalCount);
            viewModel.allocationresult.totalPages(data.totalPage);


            viewModel.uncareditemtotalnumber(viewModel.formater.format(parseFloat(data.totalNum || 0)));
            viewModel.uncareditemtotalamount(viewModel.formater.format(parseFloat(data.totalMoney || 0)));
            viewModel.uncareditemtotalvolume(viewModel.formater3.format(parseFloat(data.totalVolumn || 0)));
            viewModel.uncareditemtotalweight(viewModel.formater3.format(parseFloat(data.totalWeigh || 0)));
            viewModel.uncaredResultBackup = {
              totalNum: data.totalNum,
              totalMoney: data.totalMoney,
              totalVolumn: data.totalVolumn,
              totalWeigh: data.totalWeigh,
            }
          }
        });
      },
      uncarditemSelectHandle: function() {
        var uncareditemtotalnumber = 0,
          uncareditemtotalamount = 0,
          uncareditemtotalvolume = 0,
          uncareditemtotalweight = 0;
        var SelectedRows = viewModel.allocationresult.getSelectedRows();
        if (u.isArray(SelectedRows) && SelectedRows.length > 0) {
          for (var i = 0; i < SelectedRows.length; i++) {
            uncareditemtotalnumber += parseFloat(SelectedRows[i].getValue("wpcNum") || 0);
            uncareditemtotalamount += parseFloat(SelectedRows[i].getValue("amount") || 0);
            uncareditemtotalvolume += parseFloat(SelectedRows[i].getValue("volume") || 0);
            uncareditemtotalweight += parseFloat(SelectedRows[i].getValue("weight") || 0);
          }
        } else {
          var backup = viewModel.uncaredResultBackup;
          uncareditemtotalnumber = parseFloat(backup.totalNum || 0);
          uncareditemtotalamount = parseFloat(backup.totalMoney || 0);
          uncareditemtotalvolume = parseFloat(backup.totalVolumn || 0);
          uncareditemtotalweight = parseFloat(backup.totalWeigh || 0);
        }
        uncareditemtotalnumber = viewModel.formater.format(uncareditemtotalnumber);
        uncareditemtotalamount = viewModel.formater.format(uncareditemtotalamount);
        uncareditemtotalvolume = viewModel.formater3.format(uncareditemtotalvolume);
        uncareditemtotalweight = viewModel.formater3.format(uncareditemtotalweight);
        viewModel.uncareditemtotalnumber(uncareditemtotalnumber);
        viewModel.uncareditemtotalamount(uncareditemtotalamount);
        viewModel.uncareditemtotalvolume(uncareditemtotalvolume);
        viewModel.uncareditemtotalweight(uncareditemtotalweight);
      },
      cleanuncaredDetailSearch: function() {
        viewModel.allocationSearchParam.removeAllRows();
        viewModel.allocationSearchParam.createEmptyRow();
      },
      uncaredDetailpageChange: function(index) {
        viewModel.allocationresult.pageIndex(index);
        viewModel.uncaredDetailSearch();
      },
      uncaredDetailsizeChange: function(size) {
        viewModel.allocationresult.pageSize(size);
        viewModel.uncaredDetailSearch(true);
      },
      viewEcrelaDetail: function() {
        if (!viewModel.ecrelaDetaildialog) {
          viewModel.ecrelaDetaildialog = u.dialog({
            id: 'dialog_ecrelaDetail',
            content: "#dialog_ecrelaDetail",
            hasCloseMenu: true,
            width: "500px"
          });
        } else {
          viewModel.ecrelaDetaildialog.show();
        }
      },
      openProductDlg: function() {
        if (viewModel.isAvailable()) {
          // 清空搜索条件和已选数据
          viewModel.productSearchParam.removeAllRows();
          viewModel.productSearchParam.createEmptyRow();
          viewModel.selectedproductList.removeAllRows();
          // 加载产品数据
          viewModel.productsearch(true);
          if (!viewModel.specialproductdialog) {
            viewModel.specialproductdialog = u.dialog({
              id: 'dialog_specialproduct',
              content: "#dialog_specialproduct",
              hasCloseMenu: true,
              width: "80%"
            });
            var okButton = $("#dialog_specialproduct .J-ok");
            okButton.off().on('click', function() {
              viewModel.insertSelectedProduct();
              viewModel.specialproductdialog.close();
            });
            var cancelButton = $("#dialog_specialproduct .J-cancel");
            cancelButton.off().on('click', function() {
              viewModel.specialproductdialog.close();
            });
          } else {
            viewModel.specialproductdialog.show();
          }
        }
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      productsearch: function(reindex) {
        if (reindex) {
          viewModel.specialproductList.pageIndex(0);
        }
        viewModel.specialproductList.removeAllRows();
        var queryData = {};
        var url = "";
        var soTypeId = viewModel.salesorderCard.getValue("soTypeId");
        var soType = common.dataconvert.valueToObj(soTypeId, viewModel.soTypeSrc);
        // 是否异型，默认为0
        if (soType) {
          // ZOR1 全友标准销售订单
          // ZOR2 全友直营办销售订单
          // ZBH1 全友合(独)资办销售订单
          // ZYH1 全友销售公司异型订单
          // ZZY1 全友资源销售订单
          // ZZY2 全友饰品销售订单
          // ZZY3 全友（资源饰品）直送销售订单
          // ZMF1 全友（资源）免费销售订单

          var sotypeCode = soType.code;
          // bugfixed 售后补件不能手工新增
          if (sotypeCode == "ZMF2") {
            toastr.warning("该类型的销售订单不能手工新增");
            return;
          }

          //不再限制新增类型
          // if($.inArray(sotypeCode,sotypeArray4Add)>-1){
          var extracondition;
          var tempqueryData = viewModel.productSearchParam.getSimpleData()[0];
          var pageSize = viewModel.specialproductList.pageSize();
          var pageNumber = viewModel.specialproductList.pageIndex();
          var productGroupId = viewModel.salesorderCard.getValue("productGroupId");
          var productGroupCode = viewModel.salesorderCard.getValue("productGroupCode");
          // 免费
          if (sotypeCode == "ZMF1" || sotypeCode == "ZMF2") {
            viewModel.isFree(1);
          } else {
            viewModel.isFree(0);
          }
          // 直发
          if (sotypeCode == "ZZY3") {
            viewModel.isDirect(1);
          } else {
            viewModel.isDirect(0);
          }
          var commonQuery = {
            "search_EQ_isEnable": 1,
            "search_IN_proState": "B,C,E",
            "search_LIKE_code": (tempqueryData.productCode ? '%' + tempqueryData.productCode + '%' : null),
            "search_LIKE_description": (tempqueryData.productName ? '%' + tempqueryData.productName + '%' : null),
            "search_LIKE_productRadSeries.name": (tempqueryData.productSeriesName ? '%' + tempqueryData.productSeriesName + '%' : null),
          };
          // 资源饰品
          if (productGroupCode == "61" || productGroupCode == "62") {
            url = "/nonFurniture";
            queryData = u.extend({
              page: pageNumber,
              size: pageSize,
              "search_EQ_prodGroup.id": productGroupId
            }, extracondition, commonQuery);
          } else {
            url = "";
            var isUnconventionality = 0;
            if (sotypeCode == "ZYH1") {
              //异型销售订单类型，是否异型字段值为1
              isUnconventionality = 1;
              extracondition = {
                "search_EQ_isSaleProduct": 1,
              }
            }
            // 单包件
            if (sotypeCode == "ZDD1") {
              extracondition = {
                "search_EQ_isProductPack": 1,
                "search_EQ_isProductSuite": 0,
                "search_EQ_isSaleProduct": 0,
              }
            }
            queryData = u.extend({
              page: pageNumber,
              size: pageSize,
              "search_EQ_prodGroup.id": productGroupId,
              "search_EQ_isUnconventionality": isUnconventionality,
              "search_EQ_proNature": 1,
              "search_EQ_prodGroup.id": productGroupId
            }, extracondition, commonQuery);
            delete queryData.persistStatus;
            if (productGroupCode == "00") {
              delete queryData["search_EQ_prodGroup.id"];
            }
          }
          // }else{
          // 	toastr.warning("该类型的销售订单不能手工新增");
          // 	return;
          // }
        }
        $._ajax({
          type: "get",
          url: window.pathMap.base + "/product-info" + url,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.specialproductList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.specialproductList.totalRow(data.totalElements);
            viewModel.specialproductList.totalPages(data.totalPages);
            viewModel.updateSelectedIndices();
          }
        })
      },
      //清空搜索条件
      productcleanSearch: function() {
        viewModel.productSearchParam.removeAllRows();
        viewModel.productSearchParam.createEmptyRow();
      },
      //页码改变时的回调函数
      productpageChange: function(index) {
        viewModel.specialproductList.pageIndex(index);
        viewModel.productsearch();
      },
      //页码改变时的回调函数
      productsizeChange: function(size) {
        viewModel.specialproductList.pageSize(size);
        viewModel.productsearch(true);
      },
      productselecthandle: function(obj) {
        var selectedRows = viewModel.selectedproductList.getAllRows();
        var curRow = viewModel.specialproductList.getRow(obj.rowIndex);
        if (selectedRows && selectedRows.length > 0) {
          var selectedIds = selectedRows.map(function(row) {
            return row.getValue("productId");
          })
          var id = curRow.getValue("productId");
          if ($.inArray(id, selectedIds) > -1) {
            return true;
          }
        }
        var data = curRow.getSimpleData();
        viewModel.selectedproductList.addSimpleData(data, null, {
          unSelect: true
        });
      },
      productunselecthandle: function(obj) {
        var id = obj.rowObj.value.productId;
        var rows = viewModel.selectedproductList.getAllRows();
        for (var i = rows.length - 1; i >= 0; i--) {
          if (rows[i].getValue("productId") === id) {
            viewModel.selectedproductList.removeRows([i], {
              forceDel: true
            });
          }
        }
      },
      updateSelectedIndices: function() {
        var selectedRows = viewModel.selectedproductList.getAllRows(),
          selectedIds,
          selectedIndices = [],
          rows;
        if (selectedRows && selectedRows.length > 0) {
          selectedIds = selectedRows.map(function(row) {
            return row.getValue("productId");
          })
          rows = viewModel.specialproductList.getAllRows();
          if (rows && rows.length > 0) {
            for (var i = 0; i < rows.length; i++) {
              var id = rows[i].getValue("productId");
              if ($.inArray(id, selectedIds) > -1) {
                selectedIndices.push(i);
              }
            }
          }
          if (selectedIndices.length > 0) {
            viewModel.specialproductList.setRowsSelect(selectedIndices);
          }
        } else {
          return
        }
      },
      insertSelectedProduct: function() {
        var selectedData = viewModel.selectedproductList.getSimpleData();
        if (selectedData && selectedData.length > 0) {
          var trueData = selectedData.map(function(row) {
            var rowNum = viewModel.generateRownum();
            var isFree = viewModel.isFree();
            var isDirect = viewModel.isDirect();
            return {
              rowNum: rowNum,
              productId: row.id,
              productCode: row.code,
              productDesc: row.description,
              productModelName: row.productModelName,
              productCategoryName: row.productCategoryName,
              productRadSeriesId: row.radSeriesId,
              productRadSeriesName: row.radSeriesName,
              billedQuantity: row.reqQuantity,
              volume: row.totalVolume,
              weight: row.totalWeight,
              //冗余单位方量和单位重量，方便表体行重新计算合计
              cubage: row.cubage,
              roughWeight: row.roughWeight,
              isFree: isFree,
              isDirect: isDirect
            };
          })
          viewModel.saleOrderItems.addSimpleData(trueData, "new", {
            unSelect: true
          });
          var ids = trueData.map(function(row) {
            return row.productId;
          });
          viewModel.inquiryPrice(ids);
        }
      },
      // 计算并显示选中行合计信息
      showSelectedItemsSum: function() {

        var orderitemtotalnumber = 0,
          orderitemtotalamount = 0,
          orderitemtotalvolume = 0,
          orderitemtotalweight = 0;
        var SelectedRows = viewModel.saleOrderItems.getSelectedRows();
        if (u.isArray(SelectedRows) && SelectedRows.length > 0) {
          for (var i = 0; i < SelectedRows.length; i++) {
            orderitemtotalnumber += parseFloat(SelectedRows[i].getValue("billedQuantity") || 0);
            orderitemtotalamount += parseFloat(SelectedRows[i].getValue("amount") || 0);
            orderitemtotalvolume += parseFloat(SelectedRows[i].getValue("volume") || 0);
            orderitemtotalweight += parseFloat(SelectedRows[i].getValue("weight") || 0);
          }
        } else {
          var curRow = viewModel.salesorderList.getCurrentRow();
          orderitemtotalnumber = parseFloat(curRow.getValue("totalQuantity") || 0);
          orderitemtotalamount = parseFloat(curRow.getValue("totalAmount") || 0);
          orderitemtotalvolume = parseFloat(curRow.getValue("totalVolume") || 0);
          orderitemtotalweight = parseFloat(curRow.getValue("totalWeight") || 0);
        }
        orderitemtotalnumber = viewModel.formater.format(orderitemtotalnumber);
        orderitemtotalamount = viewModel.formater.format(orderitemtotalamount);
        orderitemtotalvolume = viewModel.formater3.format(orderitemtotalvolume);
        orderitemtotalweight = viewModel.formater3.format(orderitemtotalweight);
        viewModel.orderitemtotalnumber(orderitemtotalnumber);
        viewModel.orderitemtotalamount(orderitemtotalamount);
        viewModel.orderitemtotalvolume(orderitemtotalvolume);
        viewModel.orderitemtotalweight(orderitemtotalweight);
      },
      selectIsCombineLast: function(rowId) {
        var indices = viewModel.getCombineOtherIndices(rowId);
        var rows = viewModel.saleOrderItems.rows();
        for (var i = 0; i < indices.length; i++) {
          // 产品组合中存在未选中产品，则当前选中行不是最后一个
          if (!rows[indices[i]].selected()) {
            return false;
          }
        }
        return true;
      },
      selectIsCombineFirst: function(rowId) {
        var indices = viewModel.getCombineOtherIndices(rowId);
        var rows = viewModel.saleOrderItems.rows();
        for (var i = 0; i < indices.length; i++) {
          // 产品组合中存在选中产品，则当前选中行不是第一个
          if (rows[indices[i]].selected()) {
            return false;
          }
        }
        return true;
      },
      unSelectIsCombineLast: function(rowId) {
        var indices = viewModel.getCombineOtherIndices(rowId);
        var rows = viewModel.saleOrderItems.rows();
        for (var i = 0; i < indices.length; i++) {
          // 产品组合中存在选中产品，则当前反选不是最后一个
          if (rows[indices[i]].selected()) {
            return false;
          }
        }
        return true;
      },
      unSelectIsCombineFirst: function(rowId) {
        var indices = viewModel.getCombineOtherIndices(rowId);
        var rows = viewModel.saleOrderItems.rows();
        for (var i = 0; i < indices.length; i++) {
          // 产品组合中存在未选中产品，则当前反选不是第一个
          if (!rows[indices[i]].selected()) {
            return false;
          }
        }
        return true;
      },
      // 在所有订单行中。根据某一产品行获取相同活动相同需求类型产品组合中其余产品行索引
      getCombineOtherIndices: function(rowId) {
        var indices = [];
        var curRow = viewModel.saleOrderItems.getRowByRowId(rowId);
        var combineId = curRow.getValue("productCombineId");
        var reqTypeId = curRow.getValue("reqTypeId");
        var promotionId = curRow.getValue("promotionId");
        var itemRows = viewModel.saleOrderItems.rows();
        for (var i = 0; i < itemRows.length; i++) {
          if (itemRows[i].rowId === rowId) {
            continue;
          }
          // 需求类型、活动、产品组合相同
          if (itemRows[i].getValue("productCombineId") == combineId && itemRows[i].getValue("reqTypeId") == reqTypeId && itemRows[i].getValue("promotionId") == promotionId) {
            indices.push(i);
          }
        }
        return indices;
      },
      orderitemSelectHandle: function(obj) {
        // 只计算detail页面的选择行合计  gridbug:grid上添加的生命周期函数影响了所有的grid
        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.DETAIL) {
          viewModel.showSelectedItemsSum();
        }
      },
      // 从行号池中拿到最新的行号
      generateRownum: function() {
        var latestnum = viewModel.curRowNum(),
          newnum = latestnum + 100;
        viewModel.curRowNum(newnum);
        return newnum;
      },
      getCurRowNum: function() {
        var data = viewModel.saleOrderItems.getSimpleData();
        var maxRowNum = 0;
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].rowNum > maxRowNum) {
              maxRowNum = data[i].rowNum;
            }
          }
        }
        viewModel.curRowNum(maxRowNum);
      },
      inquiryPrice: function(ids) {

        //客户id
        var customerId = viewModel.salesorderCard.getValue("customerId"),
          //业务账号
          accountId = viewModel.salesorderCard.getValue("businessAccountId"),
          //销售订单类型
          soTypeId = viewModel.salesorderCard.getValue("soTypeId"),
          //销售组织
          saleOrgId = viewModel.salesorderCard.getValue("saleOrgId"),
          //销售渠道
          saleChannelId = viewModel.salesorderCard.getValue("saleChannelId"),
          //产品集合
          productIdList = [];
        //去除重复的商品id
        $.unique(ids);
        //订单类型，业务账号，订单类型，需查询的产品不为空的情况下才去询价
        if (customerId && accountId && soTypeId && saleOrgId && saleChannelId && ids && ids.length > 0) {
          $._ajax({
            url: appCtx + "/order-info/search-soprice",
            type: "post",
            data: {
              productIdList: ids,
              customerId: customerId,
              accountId: accountId,
              soTypeId: soTypeId,
              saleOrgId: saleOrgId,
              saleChannelId: saleChannelId
            },
            success: function(data) {
              if (data && data.length > 0) { //询价成功
                // 先获得所有子表行
                var rows = viewModel.saleOrderItems.getAllRealRows();
                // 需要选择活动的子表行
                var needselectactivityrows = [];
                // 双重循环为产品价格赋值
                if (rows && rows.length > 0) {
                  for (var i = 0; i < rows.length; i++) {
                    // 后台校验价格非空，手动赋值
                    //询价三种情况
                    // 活动数组，默认只有一种不参加活动的情况
                    var promotionArray = [{
                      value: "",
                      name: "不参加活动",
                      price: 0,
                      structs: [],
                      remainQuantity: null
                    }];

                    for (var j = 0; j < data.length; j++) {
                      // 以产品id相同为依据，判断是否属于同一产品
                      if (rows[i].getValue("productId") == data[j].productId) {
                        if (u.isArray(data[j].findPriceDetailResultList)) {
                          var pricelist = data[j].findPriceDetailResultList;

                          // 修改价格返回的包件信息为采购订单需要的包件信息格式
                          for (var m = 0; m < pricelist.length; m++) {
                            // 无需定价的活动类型(返利),成交价取基础价
                            if (pricelist[m].activeTypeIsPrice != 1) {
                              pricelist[m].price = data[j].basicPrice;
                            }
                            if (pricelist[m].lowerLeverResult &&
                              pricelist[m].lowerLeverResult.length > 0) {
                              pricelist[m].structs =
                                pricelist[m].lowerLeverResult.map(function(item) {
                                  var salePrice = viewModel.formater.format(
                                    item.salePrice)
                                  var dealPrice = viewModel.formater.format(
                                    item.price);
                                  // 无需定价的活动类型(返利),包件的成交价取基础价
                                  if (pricelist[m].activeTypeIsPrice != 1) {
                                    dealPrice = salePrice;
                                  }
                                  return u.extend({},
                                    viewModel.tempstructData, {
                                      productId: item.packProId,
                                      salePrice: salePrice,
                                      dealPrice: dealPrice
                                    }
                                  )
                                });
                            } else {
                              pricelist[m].structs = [];
                            }
                          }

                          data[j].basicPrice = viewModel.formater.format(data[j].basicPrice);
                          rows[i].setValue("salePrice",
                            viewModel.formater.format(data[j].basicPrice));
                          promotionArray[0].price =
                            viewModel.formater.format(data[j].basicPrice);
                          // 处理不参加活动情况下,bom的成交价取基础价
                          if (pricelist[0].lowerLeverResult) {
                            if (pricelist[0].lowerLeverResult.length > 0) {
                              promotionArray[0].structs =
                                pricelist[0].lowerLeverResult.map(function(item) {
                                  return u.extend({},
                                    viewModel.tempstructData, {
                                      productId: item.packProId,
                                      salePrice: viewModel.formater.format(
                                        item.salePrice),
                                      dealPrice: viewModel.formater.format(
                                        item.salePrice)
                                    }
                                  )
                                });
                            } else {
                              // 处理单包成套可销售的情况
                              promotionArray[0].structs = [
                                u.extend({},
                                  viewModel.tempstructData, {
                                    productId: pricelist[0].packProId,
                                    salePrice: viewModel.formater.format(
                                      pricelist[0].salePrice),
                                    dealPrice: viewModel.formater.format(
                                      pricelist[0].salePrice)
                                  }
                                )
                              ]
                            }
                          }
                          // 判断价格清单长度是否为1，判断是否参加了多个活动
                          if (pricelist.length == 1) {
                            // 当参加一个活动时判断是否有活动id，
                            if (pricelist[0].activityId == null) {
                              // 不参加活动
                              rows[i].setValue("dealPrice",
                                viewModel.formater.format(data[j].basicPrice));
                              rows[i].setValue("promotionId", null,
                                true);
                              rows[i].setValue("promotionName", "不参加活动");
                              rows[i].setValue("remainQuantity", null);

                              if (promotionArray[0].structs.length > 0) {
                                viewModel.setBomPriceBystatus(
                                  rows[i].getValue("soProductStrucs"),
                                  promotionArray[0].structs);
                              }
                            } else {
                              // 只参加一个活动
                              rows[i].setValue("dealPrice",
                                viewModel.formater.format(pricelist[0].price));
                              rows[i].setValue("promotionId", pricelist[0].activityId,
                                true);
                              rows[i].setValue("promotionName",
                                pricelist[0].activityName);
                              // 根据是否有最大数量和限制数量，给剩余可开数量赋值
                              var tempNum = null;
                              if (pricelist[0].maxNumber) {
                                tempNum = parseInt(pricelist[0].maxNumber);
                                if (pricelist[0].actualTakeNum) {
                                  tempNum = tempNum - parseInt(pricelist[0].actualTakeNum);
                                }
                                rows[i].setValue("remainQuantity", tempNum);
                              }
                              // 把参加的活动添加到行上的活动列表里
                              promotionArray.push({
                                value: pricelist[0].activityId,
                                name: pricelist[0].activityName,
                                price: viewModel.formater.format(
                                  pricelist[0].price),
                                structs: pricelist[0].structs,
                                remainQuantity: tempNum
                              });
                              if (promotionArray[1].structs.length > 0) {
                                viewModel.setBomPriceBystatus(
                                  rows[i].getValue("soProductStrucs"),
                                  promotionArray[1].structs);
                              }
                            }
                          } else if (pricelist.length > 1) {
                            // 参加多个活动
                            rows[i].setValue("dealPrice",
                              viewModel.formater.format(data[j].basicPrice));
                            rows[i].setValue("promotionId", null,
                              true);
                            rows[i].setValue("promotionName", "不参加活动");
                            rows[i].setValue("remainQuantity", null);
                            if (promotionArray[0].structs.length > 0) {
                              viewModel.setBomPriceBystatus(
                                rows[i].getValue("soProductStrucs"),
                                promotionArray[0].structs);
                            }
                            // 把参加的活动添加到行上的活动列表里
                            for (var k = 0; k < pricelist.length; k++) {
                              // 根据是否有最大数量和限制数量，给剩余可开数量赋值
                              var tempremainNum = null;
                              if (pricelist[k].maxNumber) {
                                tempremainNum = parseInt(pricelist[k].maxNumber);
                                if (pricelist[k].actualTakeNum) {
                                  tempremainNum = tempremainNum - parseInt(pricelist[k].actualTakeNum);
                                }
                              }
                              promotionArray.push({
                                value: pricelist[k].activityId,
                                name: pricelist[k].activityName,
                                price: viewModel.formater.format(
                                  pricelist[k].price),
                                structs: pricelist[k].structs,
                                remainQuantity: tempremainNum
                              });
                            }
                          }
                        }
                      }
                    }
                    rows[i].setValue("promotionArray", promotionArray);
                    if (promotionArray.length > 2) {
                      // 参加活动数组大于2的需要主动弹框（包括不参加活动）
                      needselectactivityrows.push(rows[i]);
                    }
                  }
                }

                // 弹窗选择活动处理
                if (needselectactivityrows.length > 0) {
                  var editcardArray = [];
                  for (var i = 0; i < needselectactivityrows.length; i++) {
                    editcardArray.push({
                      type: "combo",
                      key: needselectactivityrows[i].rowId,
                      labelcls: "w220",
                      label: "行号:" + needselectactivityrows[i].getValue("rowNum") + " 产品:" +
                        needselectactivityrows[i].getValue("productDesc"),
                      dataSource: needselectactivityrows[i].getValue("promotionArray")
                    });
                  }
                  selectPromEdit = new editcard(
                    $("#dialog_selectprom")[0],
                    editcardArray
                  );
                  selectPromEdit.show("请为下列产品选择活动", "600px", viewModel.confirmActivity);
                }
              }

            }
          })
        }
      },
      reinquiryPrice: function() {
        var rows = viewModel.saleOrderItems.getAllRealRows();
        var ids = rows.map(function(row) {
          return row.getValue("productId");
        })
        viewModel.inquiryPrice(ids);
      },
      confirmActivity: function() {
        var rowObj = selectPromEdit.geteidtData();
        delete rowObj.id;
        delete rowObj.persistStatus;
        for (var key in rowObj) {
          var row = viewModel.saleOrderItems.getRowByRowId(key);
          row.setValue("promotionId", rowObj[key]);
        }
        selectPromEdit.close();
      },
      setBomPriceBystatus: function(dataTable, data, quantity) {
        var tempdata = dataTable.getSimpleData();
        if (tempdata && tempdata.length > 0) {
          if (!tempdata[0].id) {
            dataTable.setSimpleData(data, {
              status: "new"
            });
          } else {
            for (var i = 0; i < tempdata.length; i++) {
              for (var j = 0; j < data.length; j++) {
                if (tempdata[i].productId == data[j].productId) {
                  var billedQuantity;
                  if (quantity && tempdata[i].stdQuantity) {
                    billedQuantity = quantity * tempdata[i].stdQuantity;
                  } else {
                    billedQuantity = tempdata[i].billedQuantity;
                  }
                  u.extend(
                    tempdata[i], {
                      salePrice: data[j].salePrice,
                      dealPrice: data[j].dealPrice,
                      billedQuantity: billedQuantity
                    }
                  );
                }
              }
            }
            dataTable.setSimpleData(tempdata, {
              status: "upd"
            });
          }
        } else {
          dataTable.setSimpleData(data, {
            status: "new"
          });
        }
      },
      // 清空已选参照
      clearRef: function(referids) {
        if (referids && referids.length > 0) {
          for (var i = 0; i < referids.length; i++) {
            var refer = $("#refContainer" + referids[i]).data("uui.refer");
            refer.uncheckAll();
            refer.setValue([]);
          }
        }
      },
      changeCondition: function(domid, oldcondition, newcondition) {
        $("#" + domid).parent().attr("data-refparam", JSON.stringify(
          u.extend({},
            oldcondition,
            newcondition
          )
        ));
      },
      setDefaultCondition: function() {
        viewModel.changeCondition("customerId", {
          "EQ_isEnable": "1"
        }, {});
        viewModel.changeCondition("businessAccountId", {
          "EQ_isEnable": "1",
          "EQ_customer.isEnable": "1"
        }, {});
        viewModel.changeCondition("receiveAddressId", {
          "EQ_shipToParty.isEnable": "1",
          "EQ_account.isEnable": "1",
          "EQ_account.customer.isEnable": "1"
        }, {});
      },
      seteidtCondition: function() {
        var customerId = viewModel.salesorderCard.getValue("customerId"),
          accountId = viewModel.salesorderCard.getValue("businessAccountId");
        viewModel.changeCondition("businessAccountId", {
          "EQ_isEnable": "1",
          "EQ_customer.isEnable": "1"
        }, {
          "EQ_customer.id": customerId
        })
        viewModel.changeCondition("receiveAddressId", {
          "EQ_shipToParty.isEnable": "1",
          "EQ_account.isEnable": "1",
          "EQ_account.customer.isEnable": "1"
        }, {
          "EQ_account.id": accountId
        })
      },
      // 处理合计行精度
      totalPrecisionHandle: function(row, type) {

        // var totalQuantity = viewModel.formater.format(parseFloat(row.getValue("totalQuantity")|| 0)),
        //   totalAmount = viewModel.formater.format(parseFloat(row.getValue("totalAmount")|| 0)),
        //   totalVolume = viewModel.formater3.format(parseFloat(row.getValue("totalVolume")|| 0)),
        //   totalWeight = viewModel.formater3.format(parseFloat(row.getValue("totalWeight")|| 0));
        // viewModel.orderitemtotalnumber(totalQuantity);
        // viewModel.orderitemtotalamount(totalAmount);
        // viewModel.orderitemtotalvolume(totalVolume);
        // viewModel.orderitemtotalweight(totalWeight);
      },
      //计算子表行合计
      calcItemTotal: function() {
        var rows = viewModel.saleOrderItems.getAllRealRows();
        var orderitemtotalnumber = 0,
          orderitemtotalamount = 0,
          orderitemtotalvolume = 0,
          orderitemtotalweight = 0;
        if (u.isArray(rows) && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            orderitemtotalnumber += parseFloat(rows[i].getValue("billedQuantity") || 0);
            orderitemtotalamount += parseFloat(rows[i].getValue("amount") || 0);
            orderitemtotalvolume += parseFloat(rows[i].getValue("volume") || 0);
            orderitemtotalweight += parseFloat(rows[i].getValue("weight") || 0);
          }
          orderitemtotalnumber = viewModel.formater.format(orderitemtotalnumber);
          orderitemtotalamount = viewModel.formater.format(orderitemtotalamount);
          orderitemtotalvolume = viewModel.formater3.format(orderitemtotalvolume);
          orderitemtotalweight = viewModel.formater3.format(orderitemtotalweight);
        }
        viewModel.orderitemtotalnumber(orderitemtotalnumber);
        viewModel.orderitemtotalamount(orderitemtotalamount);
        viewModel.orderitemtotalvolume(orderitemtotalvolume);
        viewModel.orderitemtotalweight(orderitemtotalweight);
      },
      findByorderCode: function(orderCode) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/findorderbycode",
          data: {
            orderCode: orderCode
          },
          dataType: "json",
          success: function(data) {
            if (data) {
              viewModel.goDetailPanel();
              viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
              viewModel.salesorderDetailCard.setSimpleData(data);
              if (data.saleOrderItems) {
                viewModel.saleOrderItems.setSimpleData(data.saleOrderItems, {
                  unSelect: true
                });
              }

            }
          }
        })
      },

      requeryAvailability: function() {
        var rows = viewModel.saleOrderItems.getAllRealRows();
        var ids = rows.map(function(row) {
          return row.getValue("productId");
        })
        viewModel.queryAvailability(ids);
      },
      //查询可用量
      queryAvailability: function(ids) {
        var salesorderData = viewModel.salesorderCard.getSimpleData()[0];
        var saleOrderItemsData = viewModel.saleOrderItems.getSimpleData();
        var realDatas = [];
        for (var i = 0; i < saleOrderItemsData.length; i++) {
          if (saleOrderItemsData[i].persistStatus !== "fdel") {
            realDatas.push(saleOrderItemsData[i]);
          }
        }
        var factoryId = salesorderData.factoryId;
        var distributionCenterId = salesorderData.distributionCenterId;
        var soTypeId = salesorderData.soTypeId;
        if (factoryId && distributionCenterId && soTypeId) {
          //如果表头选择了工厂，则将子表的工厂都设置为表头选择的工厂
          for (var i = 0; i < realDatas.length; i++) {
            realDatas[i].factoryId = factoryId;
            realDatas[i].distributionCenterId = distributionCenterId;
            realDatas[i].soTypeId = soTypeId;
          }
        }
        salesorderData.saleOrderItems = realDatas;
        $._ajax({
          url: appCtx + viewModel.baseurl + "/find-available-quantity",
          type: "post",
          data: JSON.stringify(salesorderData),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(req) {
            var allRows = viewModel.saleOrderItems.getAllRows();
            for (var i = 0; i < realDatas.length; i++) {
              for (var productId in req) {
                if (productId === realDatas[i].productId) {
                  var quantity = req[productId];
                }
                allRows[i].setValue("quantity", quantity);
              }
            }
          }
        })
      }
    };
  }
  return events;
});