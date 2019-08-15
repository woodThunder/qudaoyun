define(['ocm_common'], function (common) {
	'use strict';
	var rendertype = function (viewModel) {
		// var viewModel = this;
		var billstatus = CONST.B2BENUM.SALEORDER;
		return {
			operation: function (obj) {
				var editfun, delfun;
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var billStatusCode = obj.row.value.orderStatusCode;
				billStatusCode = parseFloat(billStatusCode);
				if (billStatusCode != '01') {
					delfun = 'class="disabled"';
					editfun = 'class="disabled"';
				} else {
					editfun =
						"data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
					delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
				}
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
			},
			dateRender: common.rendertype.dateRender,
			detailRender: common.rendertype.detailRender,
			enableRender: common.rendertype.enableRender,
			whetherRender: common.rendertype.whetherRender,
			precision2Render: common.rendertype.precision2Render,
			precision3Render: common.rendertype.precision3Render,
			whetherFormat: common.format.whetherFormat,

			billstatusCheck: ko.pureComputed(function () {
				var curbillstatus = viewModel.salesorderList.ref("billStatusCode")();
				if (curbillstatus == billstatus.COMMITTED) {
					return 1;
				}
				if (curbillstatus == billstatus.APPROVED) {
					return 2;
				}
				return 0;
			}),
			billPanelStatusCheck: ko.pureComputed(function () {
				var curbillpanelstatus = viewModel.billPanelStatus();
				if (curbillpanelstatus == CONST.BILLPANELSTATUS.ADD || curbillpanelstatus == CONST.BILLPANELSTATUS.COPY) {
					return 1;
				}
				return 0;
			}),
			billDateFormat: ko.pureComputed(function () {
				var truetime = viewModel.salesorderCard.ref("orderDate")();
				var showtime = u.date.format(truetime, 'YYYY-MM-DD');
				return showtime;
			}),
			promotionEditType: function (params) {
				var ele = params.element;
				var gridObj = params.gridObj;
				var viewModel = gridObj.viewModel;
				var field = params.field;
				var dataTableId = gridObj.dataTable.id;
				var rowObj = params.rowObj;
				if (viewModel.billPanelStatus() == CONST.BILLPANELSTATUS.EDIT) {
					ele.innerHTML = rowObj.promotionName;
					return
				}
				var innerStr = '<div class="ui-inputarea" style="width:auto" u-meta=\'{"id":"' + field + '","type":"u-combobox","data":"' + dataTableId + '","field":"promotionId","showFix":true}\'><input style="width:auto"/><span class="ui-icon uf uf-arrow-down" style="top:2px" data-role="combo-button"></span></div>';
				var innerDom = u.makeDOM(innerStr);
				ele.innerHTML = '';
				ele.appendChild(innerDom);
				var comp = app.createComp(innerDom, viewModel);
				comp.setComboData(rowObj.promotionArray);
				comp.comp.setName(rowObj.promotionName);
				gridObj.editComp = comp;
				u.compMgr.updateComp(ele);
			},
			bomStrutsRenderType: function (obj) {
				var dataTableRowId = obj.row.value['$_#_@_id'];
				var bomexpandfun = "data-bind=click:bomexpand.bind($data," + dataTableRowId + ")";
				obj.element.innerHTML =
					'<a class="ui-a-detail" ' + bomexpandfun + '><i class="uifont icon-add"></i>' + obj.value + '</a>';
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			batchColorRender: function (obj) {
				if (obj.row.value.saleOrderTypecode != "ZOR1" || obj.row.value.reqTypeCode != "01" || obj.row.value.promotionId) {
					$(obj.element).closest('tr').removeClass("u-grid-content-business-row").addClass("u-grid-content-business-row");
				}
				obj.element.innerHTML = obj.value;
			},
			isCloseRender: function (obj) {
				var showValue = "";
				var isClose = obj.value;
				if (isClose == 1) {
					showValue = "是";
				} else {
					showValue = "否";
				}
				obj.element.innerHTML = showValue;
			}
		}
	}
	return rendertype;
});