define(["ocm_common"], function(common) {
  "use strict";
  var rendertype = function(viewModel) {
    // var viewModel = this;
    var billstatus = CONST.B2BENUM.SALEORDER;
    return {
      weightUnitShowFn: function(params) {
        params.element.innerHTML = "";
        var weightUnitName = params.row.value.weightUnitName ? params.row.value.weightUnitName : '';
        if (params.value) {
          params.element.innerHTML =
            params.value + weightUnitName;
        }
      },
      // 显示单位rendertype 体积
      volumeUnitShowFn: function(params) {
        params.element.innerHTML = "";
        var volumeUnitName = params.row.value.volumeUnitName ? params.row.value.volumeUnitName : '';
        if (params.value) {
          params.element.innerHTML =
              params.value + volumeUnitName;
        }
      },
      // 显示rendertype 兑付类型
      offsetTypeRender: function(params) {
        params.element.innerHTML = "";
        var offsetTypeName = params.row.value.offsetType == "1" ? "货补" : '冲抵';
        if (params.value) {
          params.element.innerHTML = offsetTypeName;
        }
      },
      isCloseRender: function(obj) {
        var showValue = "";
        var isClose = obj.value;
        if (isClose == 1) {
          showValue = "是";
        } else {
          showValue = "否";
        }
        obj.element.innerHTML = showValue;
      },
      orderSourceRender: function(obj) {
        var showValue = "";
        if (obj.value == '01') {
          showValue = "门户";
		} 
		if(obj.value == '02') {
          showValue = "中台";
        }
        obj.element.innerHTML = showValue;
      },

      operation: function(obj) {
        var editfun, delfun;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var billStatusCode = obj.row.value.orderStatusCode;
        var orderSource = obj.row.value.orderSource;
        billStatusCode = parseFloat(billStatusCode);

        if (billStatusCode != "01") {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
        } else {
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
      dateRender: common.rendertype.dateRender,
      detailRender: common.rendertype.detailRender,
      enableRender: common.rendertype.enableRender,
      whetherRender: common.rendertype.whetherRender,
      precision2Render: common.rendertype.precision2Render,
      precision3Render: common.rendertype.precision3Render,
      whetherFormat: common.format.whetherFormat,

      // 查看选配
      salesOrderGoodsOptDetails: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var baseGoodsOptVal = $.trim(obj.row.value.baseGoodsOptValue); // 选配value
        if (baseGoodsOptVal) {
          var detailfun =
            "data-bind=click:salesOrderGoodsOptDetailsFun.bind($data," +
            obj.rowIndex +
            ")";
          obj.element.innerHTML =
            '<a href="#" class="ui-a-detail" ' +
            detailfun +
            ">" +
            baseGoodsOptVal +
            "</a>";
        } else {
          obj.element.innerHTML = "<span>无选配信息</span>";
        }

        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      // 促销活动信息
      orderItemsGoodsPromActivity: function(obj) {
        var rowObj = obj.row.value;
        var promHtml = "";
        // if (rowObj.orderPromRels) {
        //   var orderPromRels = rowObj.orderPromRels.getSimpleData();
        //   if (orderPromRels && orderPromRels.length>0) {
        //     orderPromRels.forEach(function(promRel) {
        //       promHtml += promRel.description+" ";
        //     });
        //   }
        // }
        obj.element.innerHTML = promHtml;
      },
      billstatusCheck: ko.pureComputed(function() {
        var curbillstatus = viewModel.salesorderList.ref("billStatusCode")();
        if (curbillstatus == billstatus.COMMITTED) {
          return 1;
        }
        if (curbillstatus == billstatus.APPROVED) {
          return 2;
        }
        return 0;
      }),
      billPanelStatusCheck: ko.pureComputed(function() {
        var curbillpanelstatus = viewModel.billPanelStatus();
        if (
          curbillpanelstatus == CONST.BILLPANELSTATUS.ADD ||
          curbillpanelstatus == CONST.BILLPANELSTATUS.COPY
        ) {
          return 1;
        }
        return 0;
      }),
      billDateFormat: ko.pureComputed(function() {
        var truetime = viewModel.salesorderCard.ref("orderDate")();
        var showtime = u.date.format(truetime, "YYYY-MM-DD");
        return showtime;
      }),
      promotionEditType: function(params) {
        var ele = params.element;
        var gridObj = params.gridObj;
        var viewModel = gridObj.viewModel;
        var field = params.field;
        var dataTableId = gridObj.dataTable.id;
        var rowObj = params.rowObj;
        if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
          ele.innerHTML = rowObj.promotionName;
          return;
        }
        var innerStr =
          '<div class="ui-inputarea" style="width:auto" u-meta=\'{"id":"' +
          field +
          '","type":"u-combobox","data":"' +
          dataTableId +
          '","field":"promotionId","showFix":true}\'><input style="width:auto"/><span class="ui-icon uf uf-arrow-down" style="top:2px" data-role="combo-button"></span></div>';
        var innerDom = u.makeDOM(innerStr);
        ele.innerHTML = "";
        ele.appendChild(innerDom);
        var comp = app.createComp(innerDom, viewModel);
        comp.setComboData(rowObj.promotionArray);
        comp.comp.setName(rowObj.promotionName);
        gridObj.editComp = comp;
        u.compMgr.updateComp(ele);
      },
      bomStrutsRenderType: function(obj) {
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var bomexpandfun =
          "data-bind=click:bomexpand.bind($data," + dataTableRowId + ")";
        obj.element.innerHTML =
          '<a class="ui-a-detail" ' +
          bomexpandfun +
          '><i class="uifont icon-add"></i>' +
          obj.value +
          "</a>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      batchColorRender: function(obj) {
        if (
          obj.row.value.saleOrderTypecode != "ZOR1" ||
          obj.row.value.reqTypeCode != "01" ||
          obj.row.value.promotionId
        ) {
          $(obj.element)
            .closest("tr")
            .removeClass("u-grid-content-business-row")
            .addClass("u-grid-content-business-row");
        }
        obj.element.innerHTML = obj.value;
      },
      giftBooleanRender: function(obj) {
        var grid = obj.gridObj;
        var newgrid = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid;
        var isCostFlush = grid.getColumnByField("isGift").options.isCostFlush;

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
        if (grid.options.editType == "form") {
          disableStr = " is-disabled";
        }
        var htmlStr =
          '<label class="u-checkbox is-upgraded ' +
          checkStr +
          disableStr +
          '">' +
          '<input type="checkbox" class="u-checkbox-input">' +
          '<span class="u-checkbox-label"></span>' +
          '<span class="u-checkbox-focus-helper"></span><span class="u-checkbox-outline"><span class="u-checkbox-tick-outline"></span></span>' +
          "</label>";

        obj.element.innerHTML = htmlStr;

        $(obj.element)
          .find("input")
          .on("click", function(e) {
            var goodsSupplement = obj.row.value.goodsSupplement;
            // 货补商品不可点击赠品
            if (goodsSupplement == 1) return;
            if (isCostFlush) {
              return;
            }
            $(this)
              .parent()
              .toggleClass("is-checked");
            if (!obj.gridObj.options.editable) {
              stopEvent(e);
              return false;
            }
            if (
              $(this)
                .parent()
                .hasClass("is-checked")
            ) {
              this.checked = true;
            } else {
              this.checked = false;
            }
            var value = this.checked ? "1" : "0";
            var column = obj.gridCompColumn;
            var field = column.options.field;
            row.setValue(field, value);
          });
      },
      disableBooleanRender: function(obj) {
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
          .on("click", function(e) {
            if (isDisabled) {
              return;
            }
            // $(this).parent().toggleClass('is-checked');
            // if (!obj.gridObj.options.editable) {
            // 	stopEvent(e);
            // 	return false;
            // }
            // if ($(this).parent().hasClass('is-checked')) {
            // 	this.checked = true;
            // } else {
            // 	this.checked = false;
            // }
            // var value = this.checked ? "1" : "0";
            // var column = obj.gridCompColumn
            // var field = column.options.field
            // row.setValue(field, value);
          });
      }
    };
  };
  return rendertype;
});
