define(['text!./adjustdiscount.html',
  "ocm_common",
  "ocm_baseview",
  "./meta.js",
  '../../flow/bpmapproveref/bpmopenbill.js',
  "ajaxfileupload",
  "ossupload",
  "interfaceFileImpl"
], function (tpl, common, baseview, model, bpmopenbill) {
  'use strict'
  var viewModel, app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      viewModel = _.extend(viewModel, bpmopenbill.model);
      app = this.app;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/price/adjust-discounts',
      applicationUrl: "/price/adjust-discounts",
      detailurl: '/price/adjust-discount-items',
      // 价目表定义
      priceurl: '/price/price-lists',
      discountMaintain: "/price/discount-maintain-details/find-by-priceDiscountId",
      discountAdjustList: new u.DataTable(model.options.metas.discountAdjustmeta),
      discountAdjustCard: new u.DataTable(model.options.metas.discountAdjustmeta),
      discountAdjustDetail: new u.DataTable(model.options.metas.discountAdjustDetailmeta),
      jointAdjustDetail: new u.DataTable(model.options.metas.discountAdjustDetailmeta),
      detailSelectCard: new u.DataTable(model.options.metas.discountAdjustDetailmeta),
      // 自定义价格项数量
      customPriceItemNum: 10,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      // button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      subsearchcomp: {},
      subsearchSource: model.options.searchs.search2,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      detail11Source: model.options.details.detail1,
      dialogcardcomp: {},
      gridOption: model.options.grids.grid1,

      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      curDate: ko.observable(),
      state: ko.pureComputed(function () {
        var state = viewModel.ProAttrDocList.ref("state")();
        state = parseInt(state);
        switch (state) {
          case 0:
            return "待处理";
          case 1:
            return "已提交";
          case 2:
            return "审批中";
          case 3:
            return "审批通过";
          case 4:
            return "审批不通过";
          default:
        }
      }),
      ImpactObjectSrc: [{
        value: "1",
        name: "影响折扣"
      }, {
        value: "0",
        name: "影响价格"
      }],

      defaultGridTpl: {
        domid: "grid_discountAdjustDetail",
        umeta: {
          id: "grid_discountAdjustDetail",
          data: "discountAdjustDetail",
          type: "grid",
          editable: true,
          multiSelect: true,
          showNumCol: false,
        },
        columns: [],
      }
    },
    rendertype: {
      detailRender: common.rendertype.detailRender,
      operation: function (obj) {
        var auditStatus = obj.row.value.state;
        var editfun, delfun;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        // 审批通过不能编辑
        if (auditStatus != 3) {
          editfun =
            "data-bind=click:showEditBillPanel.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          delfun =
            "data-bind=click:del.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
        } else {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
        }
        obj.element.innerHTML =
          '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          "<a " +
          editfun +
          ' title="编辑">编辑</a>' +
          "</span>    " +
          '<span class="ui-handle-word">' +
          "<a " +
          delfun +
          ' title="删除">删除</a>' +
          "</span></div>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      whetherRender: common.rendertype.whetherRender,
      // 价格精度处理的format 2位
      formater: new u.NumberFormater(2),
      approveRender: function (obj) {
        var name = "";
        var value = obj.value;
        switch (value) {
          case '0':
            name = "未审核";
            break;
          case '1':
            name = "已审核";
            break;
          case '2':
            name = "驳回";
            break;
          default:
            break;
        }
        obj.element.innerHTML = name;
      },
      approveStateRender: function (obj) {
        var showValue = "";
        switch (parseInt(obj.value)) {
          case 0:
            showValue = "待处理";
            break;
          case 1:
            showValue = "已提交";
            break;
          case 2:
            showValue = "审批中";
            break;
          case 3:
            showValue = "审批通过";
            break;
          case 4:
            showValue = "审批不通过";
            break;
          default:
            showValue = "";
            break;
        }
        obj.element.innerHTML = showValue;
      },
      approveTaskStateRender: function (obj) {
        var showValue = "";
        switch (parseInt(obj.value)) {
          case 0:
            showValue = "否";
            break;
          case 1:
            showValue = "是";
            break;
          default:
            showValue = "";
            break;
        }
        obj.element.innerHTML = showValue;
      },
      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      canEdit: ko.pureComputed(function () {
        var auditStatus = viewModel.discountAdjustList.ref("state")();
        if (auditStatus != 3) {
          return true;
        } else {
          return false;
        }
      }),
      billDateFormat: function (value) {
        var showtime = u.date.format(value, 'YYYY-MM-DD');
        return showtime;
      },
    },
    events: {
      //进入新增单据页
      showAddBillPanel: function () {
        viewModel.index = -1;
        viewModel.discountAdjustCard.removeAllRows();
        var curRow = viewModel.discountAdjustCard.createEmptyRow();

        viewModel.detailSelectCard.removeAllRows();
        viewModel.detailSelectCard.createEmptyRow();

        viewModel.discountAdjustDetail.removeAllRows();
        viewModel.setDefaultCondition();
        // viewModel.generateGridfromPrice([], $("#editgrid"));
        viewModel.getCurDate(curRow, ["adjustTime", "effectTime"])
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      setDefaultCondition: function () {
        viewModel.changeCondition("priceMaintainId", {}, {
          "EQ_priceList.organization": ""
        });
      },
      //进入修改单据页
      showEditBillPanel: function (index, rowId) {
        viewModel.discountAdjustDetail.removeAllRows();
        var row;
        if (index == -1) {
          //处理通过详情页编辑进入
          row = viewModel.discountAdjustList.getFocusRow();
          //通过改变index判断当前处于编辑态
          index = 0;
        } else {
          //行上的编辑按钮
          row = viewModel.discountAdjustList.getRowByRowId(rowId);
        }
        viewModel.index = index;
        viewModel.rowId = rowId;

        var data = row.getSimpleData();
        var isUnBpm = common.checkApprover(data.id);
        if (isUnBpm && !isUnBpm.isUnDoBpm) {
          toastr.warning(isUnBpm.message);
          return;
        }
        var id = data.id;
        viewModel.discountAdjustCard.setSimpleData(data);

        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);

        viewModel.findByParentid(id, function(returnData) {
          viewModel.seteidtCondition();
          viewModel.finddiscountMaintainByPriceListId(data.organizationId, data.priceMaintainId, $("#editgrid"));
          viewModel.discountAdjustDetail.setSimpleData(returnData.adjustDiscountItems, {
            unSelect: true
          });
        });
        // viewModel.discountAdjustDetail.setSimpleData(data.adjustDiscountItems, {
        //   unSelect: true
        // });
        // });
      },
      seteidtCondition: function () {
        var organizationId = viewModel.discountAdjustCard.getValue("organizationId");
        viewModel.changeCondition("priceMaintainId", {}, {
          "EQ_priceList.organization": organizationId
        });
      },
      validateBill: function () {
        // 校验
        var validate = $(".ui-bill-panel")[0];
        var result = app.compsValidateMultiParam({
          element: validate,
          showMsg: true
        });
        if (result.passed) {
          var rows = viewModel.discountAdjustDetail.getAllRealRows();
          if (rows && rows.length > 0) {

          } else {
            toastr.warning("至少添加一行数据");
            return false;
          }
          return true
        } else {
          return false;
        }
      },
      //保存单据
      saveAdjust: function () {
        var result = viewModel.validateBill();
        if (result) {
          // 组装数据
          var currentRow, ajaxType;
          var index = viewModel.index;
          var mainData = viewModel.discountAdjustCard.getSimpleData()[0];
          var subData = viewModel.discountAdjustDetail.getSimpleData();

          var CONST_DETAILITEMID = 'detailItemId';
          if (subData && subData.length > 0) {
            subData.map(function (item) {
              var adjustDiscountDetails = [];
              for (var key in viewModel.detailItems) {
                if (key.startsWith(CONST_DETAILITEMID)) {
                  var adjustDiscountDetail = {
                    priceItemId: '', // 价格项 ID
                    basePrice: '', //价格
                    originalDiscountIndex: '', //原价格指数
                    originalDiscountAdd: '', //原价格加成
                    originalDiscountPrice: '', //原折后价格
                    newDiscountIndex: '', // 新基准折扣指数
                    newDiscountAdd: '', // 新基准折扣加成
                    newDiscountPrice: '', // 新基准折扣加成
                    priceAdjustRatio: '', // 调价比例
                    isSpecialPrice: '' // 是否特价
                  };
                  var index = key.replace(CONST_DETAILITEMID, '');
                  adjustDiscountDetail.basePrice = item["basePrice" + index];
                  adjustDiscountDetail.originalDiscountIndex = item["originalDiscountIndex" + index];
                  adjustDiscountDetail.originalDiscountAdd = item["originalDiscountAdd" + index];
                  adjustDiscountDetail.originalDiscountPrice = item["originalDiscountPrice" + index];
                  adjustDiscountDetail.newDiscountAdd = item["newDiscountAdd" + index];
                  adjustDiscountDetail.newDiscountIndex = item["newDiscountIndex" + index];
                  adjustDiscountDetail.priceAdjustRatio = item["priceAdjustRatio" + index];
                  adjustDiscountDetail.newDiscountPrice = item["newDiscountPrice" + index];
                  adjustDiscountDetail.priceItemId = viewModel.detailItems[key];
                  adjustDiscountDetails.push(adjustDiscountDetail);
                }
              }
              item.adjustDiscountDetails = adjustDiscountDetails;
              // u.extend(item, viewModel.detailItems);
            })
            mainData.adjustDiscountItems = subData;
          }
          if (index >= 0) {
            ajaxType = "put";
          } else {
            ajaxType = "post";
          }
          // 提交
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: ajaxType,
            data: JSON.stringify(mainData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              // 回写界面
              var tempCurrentRow;
              if (viewModel.index >= 0) {
                //获取需要修改的行
                tempCurrentRow = viewModel.discountAdjustList.getRowByRowId(viewModel.rowId);
              } else {
                //添加数据
                tempCurrentRow = viewModel.discountAdjustList.createEmptyRow();
              }
              tempCurrentRow.setSimpleData(data);
              viewModel.retListPanel();
              toastr.success("保存成功");
            }
          })
        }
      },
      detailSelect: function () {
        var priceMaintainId = viewModel.discountAdjustCard.getValue("priceMaintainId");
        var postdata = viewModel.detailSelectCard.getSimpleData()[0];
        var priceIndex = postdata.priceIndex;
        var priceAdd = postdata.priceAdd;
        if (!priceMaintainId) {
          toastr.warning("请先选择价目表");
          return
        }

        $._ajax({
          url: appCtx + viewModel.detailurl + "/detailSelect?priceMaintainId=" + priceMaintainId,
          type: "post",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data) {
            if (data && data.length > 0) {
              data.map(function (item) {
                if (item.adjustDiscountDetails && item.adjustDiscountDetails.length > 0) {
                  var temp = {},
                    i;
                  for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                    if (item["detailItemId" + i]) {
                      temp[item["detailItemId" + i]] = item["basePrice" + i];
                    } else {
                      break;
                    }
                  }
                  var realCount = i - 1;
                  for (i = 1; i <= realCount; i++) {
                    item["basePrice" + i] = temp[viewModel.detailItems["detailItemId" + i]]
                    item["originalDiscountIndex" + i] = priceIndex;
                    item["originalDiscountAdd" + i] = priceAdd;
                    if (u.isNumber(item["basePrice" + i])) {
                      var oldPrice = parseFloat(item["basePrice" + i]);
                      var tempPriceIndex = priceIndex;
                      var tempPriceAdd = priceAdd;
                      if (u.isNumber(tempPriceIndex)) {
                        tempPriceIndex = parseFloat(tempPriceIndex) / 100;
                      } else {
                        tempPriceIndex = 0;
                      }
                      if (u.isNumber(tempPriceAdd)) {
                        tempPriceAdd = parseFloat(tempPriceAdd);
                      } else {
                        tempPriceAdd = 0;
                      }
                      item["newDiscountPrice" + i] = viewModel.formater.format(oldPrice * (1 + tempPriceIndex) + tempPriceAdd);
                    }
                  }
                }
              })
              viewModel.discountAdjustDetail.addSimpleData(data, 'new');
            }
          }
        })
      },
      //-------------审批流添加Start--------------
      //提交
      submit: function (obj) {
        var listCompId = "discountAdjustList";
        var nodeJs = "/ocm-web/pages/price/adjustDiscount/adjustdiscount.js";
        var billTypeCode = "AdjustDiscount";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },
      back: function () {
        var listCompId = "discountAdjustList";
        var billTypeCode = "AdjustDiscount";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },
      // 审批通过
      approve: function () {
        var listCompId = "discountAdjustList";
        var billTypeCode = "AdjustDiscount";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          viewModel.detail();
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 审批不通过
      disapprove: function () {
        var listCompId = "discountAdjustList";
        var billTypeCode = "AdjustDiscount";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          viewModel.detail();
        };
        var withoutBpmCallback = null;
        viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      cancelapprove: function () {
        var listCompId = "discountAdjustList";
        var billTypeCode = "AdjustDiscount";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          viewModel.detail();
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      //-------------审批流添加end-------------------
      audit: function () {
        var selectedRows = viewModel.discountAdjustList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var mainData = selectedRows.map(function (row) {
            return row.getSimpleData();
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/audit",
            data: JSON.stringify(mainData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("auditStatus", "1");
                // 同时改变操作列绑定字段变更以触发重新渲染
                selectedRows[i].setValue("operation", "1");
              }
              toastr.success();
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      reject: function () {
        var selectedRows = viewModel.discountAdjustList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var mainData = selectedRows.map(function (row) {
            return row.getSimpleData();
          })
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/reject",
            data: JSON.stringify(mainData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("auditStatus", "2");
                // 同时改变操作列绑定字段变更以触发重新渲染
                selectedRows[i].setValue("operation", "2");
              }
              toastr.success();
            }
          })
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //查询子表数据
      findByParentid: function (id, callback) {
        $._ajax({
          async: false,
          type: "get",
          url: appCtx + viewModel.baseurl + "/find-show-detail",
          data: {
            priceDiscountId: id
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (data && data.message) {
              toastr.error(data.message);
            } else {
              if (typeof callback == "function") {
                callback(data);
              }
            }
          }
        });
      },
      detail: function () {
        viewModel.discountAdjustDetail.removeAllRows();
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          var row = viewModel.discountAdjustList.getCurrentRow();
          var id = row.getSimpleData().id;
          var data = row.getSimpleData();
          viewModel.discountAdjustCard.setSimpleData(data);

          viewModel.goDetailPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          // viewModel.finddiscountMaintainByPriceListId(data.organizationId, data.priceMaintainId, $("#detailgrid"),{
          //   id: "grid_discountAdjustDetail_detail",
          //  editable: false,
          //   multiSelect: false,
          //   showNumCol: true
          //  });
          // console.log(data.adjustDiscountItems)
          viewModel.findByParentid(id, function(returnData) {
            // viewModel.finddiscountMaintainByPriceListId(data.organizationId, data.priceMaintainId);
            viewModel.generateGridfromExistData(returnData.adjustDiscountItems, $("#detailgrid"), {
              id: "grid_discountAdjustDetail_detail",
              editable: false,
              multiSelect: false,
              showNumCol: true
            }, true);
            viewModel.discountAdjustDetail.setSimpleData(returnData.adjustDiscountItems, {
              unSelect: true
            });
          });
          // viewModel.initBPMFromBill(id, viewModel);
        }, 0);
      },
      detail2bill: function () {
        var row = viewModel.discountAdjustList.getCurrentRow();
        viewModel.showEditBillPanel(0, row.rowId);
      },
      jointquery: function () {
        var selectedRows = viewModel.discountAdjustList.getSelectedRows();
        if (selectedRows.length == 1) {
          var adjustNumber = selectedRows[0].getValue("adjustNumber");
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/jointquery",
            dataType: "json",
            data: {
              adjustNumber: adjustNumber
            },
            success: function (data) {
              viewModel.generateGridfromExistData(data, $("#joingrid"), {
                id: "grid_jointAdjustDetail",
                data: "jointAdjustDetail",
                editable: false,
                multiSelect: false,
                showNumCol: true
              }, true);
              viewModel.jointAdjustDetail.setSimpleData(data);
              if (viewModel.dialog_joinquery) {
                viewModel.dialog_joinquery.show();
              } else {
                viewModel.dialog_joinquery = u.dialog({
                  id: 'dialog_joinquery',
                  content: "#dialog_joinquery",
                  hasCloseMenu: true,
                  width: "80%"
                });
              }
            }
          })
        } else {
          if (selectedRows.length == 0) {
            toastr.warning("请先选择一项");
          } else {
            toastr.warning("只能选择一项");
          }
        }
      },
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.discountAdjustList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.discountAdjustList.getSelectedRows();
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
                  viewModel.discountAdjustList.removeRows(rows);
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
          viewModel.discountAdjustList.pageIndex(0);
        }
        viewModel.discountAdjustList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        queryData.size = viewModel.discountAdjustList.pageSize();
        queryData.page = viewModel.discountAdjustList.pageIndex();
        queryData.withLazyLoadFields = true;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (json) {
            for (var i = 0; i < json.content.length; i++) {
              var data = json.content[i];
              var items = data.adjustDiscountItems;
              if (items != null) {
                for (var j = 0; j < items.length; j++) {
                  var item = items[j];
                  var details = item.adjustDiscountDetails;
                  for (var k = 0; k < details.length; k++) {
                    var detail = details[k];
                    item['detailItemId' + (k + 1)] = detail.priceItemId;
                    item['detailItemName' + (k + 1)] = detail.detailItemName;
                    item['newDiscountPrice' + (k + 1)] = detail.newDiscountPrice;
                    item['newDiscountIndex' + (k + 1)] = detail.newDiscountIndex;
                    item['newDiscountAdd' + (k + 1)] = detail.newDiscountAdd;
                    //   item['newImpactObject'+(k+1)] = detail.newImpactObject;
                  }
                }
              }
            }
            viewModel.discountAdjustList.setSimpleData(json.content, {
              unSelect: true
            });
            viewModel.discountAdjustList.totalRow(json.totalElements);
            viewModel.discountAdjustList.totalPages(json.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.discountAdjustList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.discountAdjustList.pageSize(size);
        viewModel.search(true);
      },

      getCurDate: function (row, fields) {
        // 服务器时间获取
        $._ajax({
          type: "post",
          url: appCtx + '/price/common/get-current-date',
          success: function (data) {
            var truetime = data;
            if (row) {
              if (u.isArray(fields) && fields.length > 0) {
                fields.map(function (field) {
                  row.setValue(field, truetime);
                })
              }
            }
            viewModel.curDate(truetime);
          }
        });
      },
      changeCondition: function (domid, oldcondition, newcondition) {
        $("#" + domid).parent().attr("data-refparam", JSON.stringify(
          u.extend({},
            oldcondition,
            newcondition
          )
        ));
      },
      // 从已有价格调整详情中拼接grid选项
      generateGridfromExistData: function (data, $ele, extraGridUmeta, isdetail) {
        function transOption(data) {
          var keyObj = {
            useGoods: {
              field: "goodsId",
              title: "商品",
              showField: "goodsName",
              "editOptions": {
                "validType": "string",
                rel: {
                  refname: "goodsName"
                }
              }
            },
            useProduct: {
              field: "productId",
              title: "产品",
              showField: "productName"
            },
            useBrand: {
              field: "brandId",
              title: "品牌",
              showField: "brandName"
            },
            useGoodsCategory: {
              field: "goodsCategoryId",
              title: "商品分类",
              showField: "goodsCategoryName"
            },
            useCustomer: {
              field: "customerId",
              title: "客户",
              showField: "customerName"
            },
            useCustomerCategory: {
              field: "customerCategoryId",
              title: "客户分类",
              showField: "customerCategoryName"
            },
            useShop: {
              field: "shopId",
              title: "门店",
              showField: "shopName"
            }
          }
          var columns = [];
          if (isdetail) {
            // 如果是详情界面
            for (var key in keyObj) {
              // if (data[key] == 1) {
              columns.push(u.extend({
                "dataType": "String",
              }, {
                field: keyObj[key].showField,
                title: keyObj[key].title,
              }))
              // }
            }
          } else {
            // 如果是编辑界面
            for (var key in keyObj) {
              if (data[key] == 1) {
                columns.push(u.extend({
                  "dataType": "String",
                  "renderType": "ncReferRender",
                  "editType": "ncReferEditType",
                  "editOptions": {
                    "validType": "string",
                  }
                }, keyObj[key]))
              }
            }
          }
          viewModel.detailItems = {};
          var priceListItems = data;
          if (data && data.length > 0) {
            for (var m = 0; m < data.length; m++) {
              var item = data[m];
              for (var i = 1; i <= viewModel.customPriceItemNum; i++) {
                if (item["detailItemId" + i]) {
                  columns.push({
                    "field": "basePrice" + i,
                    "dataType": "String",
                    "title": item["detailItemName" + i],
                    "editable": false
                  });
                  columns.push({
                    "field": "originalDiscountIndex" + i,
                    "dataType": "String",
                    "title": "原折扣指数",
                    "editType": "float",
                    "editable": false
                  });
                  columns.push({
                    "field": "originalDiscountAdd" + i,
                    "dataType": "String",
                    "title": "原价格加成",
                    "editType": "float",
                    "editable": false
                  });
                  columns.push({
                    "field": "originalDiscountPrice" + i,
                    "dataType": "String",
                    "title": "原" + item["detailItemName" + i] + "价格",
                    "editable": false
                  });
                  columns.push({
                    "field": "newDiscountIndex" + i,
                    "dataType": "String",
                    "title": "新折扣指数",
                    "editType": "float",
                    "editable": true
                  });
                  columns.push({
                    "field": "newDiscountAdd" + i,
                    "dataType": "String",
                    "title": "新价格加成",
                    "editType": "float",
                    "editable": true
                  });
                  columns.push({
                    "field": "newDiscountPrice" + i,
                    "dataType": "String",
                    "title": "新" + item["detailItemName" + i] + "价格",
                    "editable": false
                  });
                  columns.push({
                    "field": "priceAdjustRatio" + i,
                    "dataType": "String",
                    "title": item["detailItemName" + i] + "调价比例",
                    "editable": false
                  });
                  viewModel.detailItems["detailItemId" + i] = item["detailItemId" + i];
                  viewModel.detailItems["detailItemName" + i] = item["detailItemName" + i];
                } else {
                  // 价格项id不存在，则跳出循环
                  break;
                }
              }
            }
          }
          var umeta = u.extend({}, viewModel.defaultGridTpl.umeta, extraGridUmeta)
          return {
            domid: "",
            umeta: umeta,
            columns: columns
          };
        }

        var ele = $ele[0];
        // viewModel.finddiscountMaintain(data[0].discountMaintainId);
        // a38cb14f-d139-4d7d-90c3-2d8786846f03
        var options = transOption(data);
        $ele.empty();
        ele.innerHTML = viewModel.handleGridTpl(options);

        ko.cleanNode(ele);
        u.createApp({
          el: ele,
          model: viewModel
        });
      },
      // 从价目表定义中拼接grid选项
      generateGridfromPrice: function (data, $ele, extraGridUmeta) {
        console.log("generateGridfromPrice")

        function transOption(data) {
          var keyObj = {
            useGoods: {
              field: "goodsId",
              title: "商品",
              showField: "goodsName",
              "editOptions": {
                "validType": "string",
                rel: {
                  refname: "goodsName"
                }
              }
            },
            useProduct: {
              field: "productId",
              title: "产品",
              showField: "productName"
            },
            useBrand: {
              field: "brandId",
              title: "品牌",
              showField: "brandName"
            },
            useGoodsCategory: {
              field: "goodsCategoryId",
              title: "商品分类",
              showField: "goodsCategoryName"
            },
            useCustomer: {
              field: "customerId",
              title: "客户",
              showField: "customerName"
            },
            useCustomerCategory: {
              field: "customerCategoryId",
              title: "客户分类",
              showField: "customerCategoryName"
            },
            useShop: {
              field: "shopId",
              title: "门店",
              showField: "shopName"
            }
            /*,
                        usePlatstore: {
                            field: "platstoreId",
                            title: "平台店铺",
                            showField: "platstoreName"
                        }*/
          }
          var columns = [];
          for (var key in keyObj) {
            if (data[key] == 1) {
              columns.push(u.extend({
                "dataType": "String",
                "renderType": "ncReferRender",
                "editType": "ncReferEditType",
                "editOptions": {
                  "validType": "string",
                }
              }, keyObj[key]))
            }
          }

          var priceListItems = data.priceListItems;
          viewModel.detailItems = {};
          if (priceListItems && priceListItems.length > 0) {
            var count = 1;
            for (var i = 0; i < priceListItems.length; i++) {
              if (priceListItems[i].isSelected == 1) {
                columns.push({
                  "field": "basePrice" + count,
                  "dataType": "String",
                  "title": priceListItems[i].priceItemName,
                  "editable": false
                });
                /* columns.push({
                     "field": "originalImpactObject" + count,
                     "dataType": "String",
                     "title": "原影响对象",
                     "editType": "combo",
                     "editOptions": {
                         "type": "combo",
                         "datasource": "ImpactObjectSrc"
                     },
                     "renderType": "comboRender",
                     "editable": false
                 });*/
                columns.push({
                  "field": "originalDiscountIndex" + count,
                  "dataType": "String",
                  "title": "原折扣指数",
                  "editType": "float",
                  "editable": false
                });
                columns.push({
                  "field": "originalDiscountAdd" + count,
                  "dataType": "String",
                  "title": "原价格加成",
                  "editType": "float",
                  "editable": false
                });
                columns.push({
                  "field": "originalDiscountPrice" + count,
                  "dataType": "String",
                  "title": "原" + priceListItems[i].priceItemName + "价格",
                  "editable": false
                });
                /* columns.push({
                     "field": "newImpactObject" + count,
                     "dataType": "String",
                     "title": "新影响对象",
                     "editType": "combo",
                     "editOptions": {
                         "type": "combo",
                         "datasource": "ImpactObjectSrc"
                     },
                     "renderType": "comboRender",
                     "editable": true
                 });*/
                columns.push({
                  "field": "newDiscountIndex" + count,
                  "dataType": "String",
                  "title": "新折扣指数",
                  "editType": "float",
                  "editable": true
                });
                columns.push({
                  "field": "newDiscountAdd" + count,
                  "dataType": "String",
                  "title": "新价格加成",
                  "editType": "float",
                  "editable": true
                });
                columns.push({
                  "field": "newDiscountPrice" + count,
                  "dataType": "String",
                  "title": "新" + priceListItems[i].priceItemName + "价格",
                  "editable": false
                });
                columns.push({
                  "field": "priceAdjustRatio" + count,
                  "dataType": "String",
                  "title": priceListItems[i].priceItemName + "调价比例",
                  "editable": false
                });
                viewModel.detailItems["detailItemId" + count] = priceListItems[i].priceItemId;
                viewModel.detailItems["detailItemName" + count] = priceListItems[i].priceItemName;
                count++;
              }
            }
          }

          return u.extend({}, viewModel.defaultGridTpl, {
            columns: columns,
            umeta: u.extend({}, viewModel.defaultGridTpl.umeta, extraGridUmeta)
          });
        }

        var ele = $ele[0];
        var options = transOption(data);
        $ele.empty();
        ele.innerHTML = viewModel.handleGridTpl(options);

        ko.cleanNode(ele);
        u.createApp({
          el: ele,
          model: viewModel
        });
      },

      handleGridTpl: function (param) {
        function handleUmeta(meta) {
          return JSON.stringify(meta);
        }

        function handleColumns(columns) {
          if (u.isArray(columns)) {
            var optionArr = columns.map(function (item) {
              return '<div options=\'' + JSON.stringify(item) + '\'></div>'
            })
            return optionArr.join(" ");

          } else {
            throw new Error("columns must be Array");
          }
        }
        return '<div id=\'' + param.domid + '\' u-meta=\'' + handleUmeta(param.umeta) + '\'>' +
          handleColumns(param.columns) +
          '</div>'
      },
      cancelBill: function () {
        viewModel.retListPanel();
      },
      findDiscountById: function (organizationId) {
        //查询折扣调整单
        $._ajax({
          url: appCtx + baseurl + "/price/discount-maintains",
          type: 'get',
          data: {
            "search_EQ_organization": organizationId,
            "search_EQ_priceMaintain.id": priceListId,
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (!data.content || data.content.length == 0) {
              toastr.error("没查到对应的基准折扣单");
              return;
            } else if (data.content.length != 1) {
              toastr.error("找到了多个折扣单");
              return;
            }
            var priceDiscount = data.content[0];
            viewModel.discountAdjustCard.setValue('priceDiscountId', priceDiscount.id);
            viewModel.discountAdjustCard.setValue('priceDiscountName', priceDiscount.name);
            viewModel.finddiscountMaintain(priceDiscount.priceDiscountId, $ele, extraGridUmeta);
          }
        });
      },
      finddiscountMaintainByPriceListId: function (organizationId, priceListId, $ele, extraGridUmeta) {
        // 根据销售组织+价目表 查询折扣单
        $._ajax({
          url: appCtx + "/price/discount-maintains",
          type: 'get',
          data: {
            "search_EQ_organization": organizationId,
            "search_EQ_priceMaintain.id": priceListId,
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            if (!data.content || data.content.length == 0) {
              toastr.error("没查到对应的基准折扣单");
              return;
            } else if (data.content.length != 1) {
              toastr.error("找到了多个折扣单");
              return;
            }
            var priceDiscount = data.content[0];
            viewModel.discountAdjustCard.setValue('priceDiscountId', priceDiscount.id);
            viewModel.discountAdjustCard.setValue('priceDiscountName', priceDiscount.name);
            viewModel.finddiscountMaintain(priceDiscount.priceDiscountId, $ele, extraGridUmeta);
          }
        });
      },
      finddiscountMaintain: function (priceDiscountId, $ele, extraGridUmeta) {
        $._ajax({
          type: "get",
          url: appCtx + viewModel.discountMaintain,
          dataType: "json",
          data: {
            priceDiscountId: priceDiscountId
          },
          success: function (data) {
            viewModel.generateGridfromPrice(data, $ele, extraGridUmeta);
          }
        })
      },
      inquirePrice: function (value, field, row) {
        var priceMaintainId = viewModel.discountAdjustCard.getValue("priceMaintainId");
        var priceDiscountId = viewModel.discountAdjustCard.getValue("priceDiscountId");
        var postdata = {};
        postdata["goodsId"] = row.data.goodsId.value;
        postdata["customerId"] = row.data.customerId.value;
        postdata["shopId"] = row.data.shopId.value;
        postdata["customerCategoryId"] = row.data.customerCategoryId.value;
        if (!priceMaintainId) {
          toastr.warning("请先选择价目表");
          return
        }
        $._ajax({
          url: appCtx + viewModel.detailurl + "/blurrySelect?priceMaintainId=" + priceMaintainId + "&priceDiscountId=" + priceDiscountId,
          type: "post",
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data) {
            if (data.adjustDiscountDetails && data.adjustDiscountDetails.length > 0) {
              var item = data;
              var temp = {},
                i;
              /* for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                 if (item["detailItemId" + i]) {
                   temp[item["detailItemId" + i]] = item["basePrice" + i];
                 } else {
                   break;
                 }
               }
               var realCount = i-1;*/
              for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                if (u.isNumber(item["basePrice" + i])) {
                  row.setValue("basePrice" + i, data["basePrice" + i]);
                  row.setValue("originalDiscountIndex" + i, data["originalDiscountIndex" + i]);
                  row.setValue("originalDiscountAdd" + i, data["originalDiscountAdd" + i]);
                  row.setValue("originalDiscountPrice" + i, data["originalDiscountPrice" + i]);

                } else {
                  row.setValue("basePrice" + i, null);
                  row.setValue("originalDiscountIndex" + i, data["originalDiscountIndex" + i]);
                  row.setValue("originalDiscountAdd" + i, data["originalDiscountAdd" + i]);
                }
              }
            } else {
              for (i = 1; i <= viewModel.customPriceItemNum; i++) {
                if (viewModel.detailItems["detailItemId" + i]) {
                  row.setValue("basePrice" + i, null);
                }
              }
            }
          },
          error: function () {
            for (i = 1; i <= viewModel.customPriceItemNum; i++) {
              if (viewModel.detailItems["detailItemId" + i]) {
                row.setValue("basePrice" + i, null)
              }
            }
          }
        })
      },
      //新增子表项
      addItem: function () {
        viewModel.discountAdjustDetail.createEmptyRow();
      },
      //删除子表项
      delItems: function () {
        var selectedRows = viewModel.discountAdjustDetail.getSelectedRows();
        viewModel.discountAdjustDetail.removeRows(selectedRows);
      },
      searchMaintainDetail: function (reindex) {
        if (reindex) {
          viewModel.discountAdjustDetail.pageIndex(0);
        }
        var queryData = {};
        queryData.size = viewModel.discountAdjustDetail.pageSize();
        queryData.page = viewModel.discountAdjustDetail.pageIndex();
        queryData["search_EQ_discountAdjust.id"] = viewModel.detailItems.discountAdjustId;
        var addition = viewModel.subsearchcomp.getDataWithOpr();
        u.extend(queryData, addition);
        $._ajax({
          type: "get",
          url: appCtx + viewModel.detailurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.discountAdjustDetail.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.discountAdjustDetail.totalRow(data.totalElements);
            viewModel.discountAdjustDetail.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      subcleanSearch: function () {
        viewModel.subsearchcomp.clearSearch();
      },
      //页码改变时的回调函数
      subPageChange: function (index) {
        viewModel.discountAdjustDetail.pageIndex(index);
        viewModel.searchMaintainDetail();
      },
      //页码改变时的回调函数
      subSizeChange: function (size) {
        viewModel.discountAdjustDetail.pageSize(size);
        viewModel.searchMaintainDetail(true);
      },
    },
    afterCreate: function () {
      viewModel = u.extend(viewModel, bpmopenbill.model);
      viewModel.discountAdjustCard.on("organizationId.valuechange", function (obj) {
        var value = obj.newValue;
        viewModel.changeCondition("priceMaintainId", {}, {
          "EQ_priceList.organization": value
        })
      });
      viewModel.discountAdjustCard.on("priceMaintainId.valuechange", function (obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainerpriceMaintainId").data("uui.refer");
        var refValue = refer.values[0];
        var priceListId = refValue.refpk;
        var orgRefer = $("#refContainerorganizationId").data("uui.refer");
        var orgRefValue = orgRefer.values[0];
        var organizationId = orgRefValue.refpk;
        viewModel.finddiscountMaintainByPriceListId(organizationId, priceListId, $("#editgrid"));
      });
      // 商品支持多选，特殊处理
      viewModel.discountAdjustDetail.on("goodsId.valuechange", function (obj) {
        if (!obj.newValue || obj.oldValue == obj.newValue) return;
        var refer = $("#refContainergoodsId").data("uui.refer");
        if (!refer || !refer.values) return;
        var refValues = refer.values;
        $("#refContainergoodsId").data("uui.refer").setValue("");
        if (!refValues || refValues.length < 1) return;
        var curRow = viewModel.discountAdjustDetail.getRowByRowId(obj.rowId);
        curRow.setValue('goodsId', refValues[0].id);
        curRow.setValue('goodsName', refValues[0].name);
        viewModel.inquirePrice(refValues[0].id, obj.field, curRow);


        if (viewModel.addProductDetailFlag1 && refValues.length == 1) {
          viewModel.addProductDetailFlag1 = false;
          return;
        } else if (refValues.length == 1) {
          viewModel.inquirePrice(obj.newValue, obj.field, obj.rowObj);
        } else {
          for (var i = 1; i < refValues.length; i++) {
            viewModel.addProductDetailFlag1 = false;
            viewModel.addProductDetailFlag2 = false;
            var newRow1 = viewModel.discountAdjustDetail.createEmptyRow({
              unSelect: true
            });
            newRow1.setValue('goodsId', refValues[i].id);
            newRow1.setValue('goodsName', refValues[i].name);
            viewModel.inquirePrice(refValues[i].id, obj.field, newRow1);
          }

        }
      });

      viewModel.detailSelectCard.on("valuechange", function (obj) {
        var needCleanfield = {
          goodsId: "goodsId",
          productId: "productId",
          brandId: "brandId",
          goodsCategoryId: "goodsCategoryId",
          //          customerCategoryId: "customerCategoryId",
          //          customerId: "customerId"
        }
        if (needCleanfield[obj.field]) {
          if (obj.newValue) {
            for (var key in needCleanfield) {
              if (key != obj.field) {
                viewModel.detailSelectCard.setValue(key, null);
              }
            }
          }
        }
        var needCleanfieldCus = {
          //          goodsId: "goodsId",
          //          productId: "productId",
          //          brandId: "brandId",
          //          goodsCategoryId: "goodsCategoryId",
          customerCategoryId: "customerCategoryId",
          customerId: "customerId"
        }
        if (needCleanfieldCus[obj.field]) {
          if (obj.newValue) {
            for (var key in needCleanfieldCus) {
              if (key != obj.field) {
                viewModel.detailSelectCard.setValue(key, null);
              }
            }
          }
        }
      });
      viewModel.discountAdjustDetail.on("valuechange", function (obj) {
        //if (obj.field == "goodsId" || obj.field == "customerCategoryId" ||obj.field == "customerId" ||obj.field == "shopId") {
        if (obj.field == "customerCategoryId" || obj.field == "customerId" || obj.field == "shopId") {
          viewModel.inquirePrice(obj.newValue, obj.field, obj.rowObj);
        } else {
          var reg = /^(newDiscountIndex|newDiscountAdd|newDiscountPrice)(\d+)$/;
          if (reg.test(obj.field) && (obj.newValue || obj.oldValue)) {
            var row = obj.rowObj;
            var index = RegExp["$2"];
            var priceIndex = parseFloat(row.getValue("newDiscountIndex" + index)) / 100 || 0;
            var priceAdd = parseFloat(row.getValue("newDiscountAdd" + index)) || 0;
            var detailItemPrice = parseFloat(row.getValue("basePrice" + index)) || 0;
            var newPrice = detailItemPrice * (1 + priceIndex) + priceAdd;
            newPrice = viewModel.formater.format(newPrice);
            if (obj.field == "newDiscountPrice" + index) {
              var priceAdjustRatio;
              priceAdjustRatio = Math.round(viewModel.formater.format(newPrice / detailItemPrice - 1) * 100) / 100;
              row.setValue("priceAdjustRatio" + index, priceAdjustRatio);
            }
            row.setValue("newDiscountPrice" + index, newPrice);
            //调价比例
            /* var priceAdjustRatio;
             priceAdjustRatio=Math.round(viewModel.formater.format(newPrice/detailItemPrice-1)*100)/100;
             row.setValue("priceAdjustRatio" + index, priceAdjustRatio);*/
          }
        }
      });
    }
  });

  return view;
});