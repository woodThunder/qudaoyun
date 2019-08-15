define(['text!./cusfeebalancemanager.html','ocm_simpleview', './meta.js', 'ocm_common'], function(tpl,simpleview, model, common) {
	'use strict'
	var viewModel;
	var view = simpleview.extend({
		beforeCreate: function() {
			viewModel = this.viewModel;
		},
		tpl: tpl,
		model: model,
		baseData: {
			baseurl: '/fee/customer-balances',
			baseBillsurl: '/fee/customer-bills',
			// excelurl: '/potypes-Excel',单表档案支持导入导出时需配置此属性
			// dialogWidth: '500px',单表档案中需调整弹出宽度的可通过此属性调整
			// statusField: 'statusCode',单表档案的DTO中中表示状态字段不为isEnable时，可通过此属性调整
			simpleList: new u.DataTable(model.options.metas.potypemeta),
			// buttonSource: model.options.buttons.button1,
			searchcomp: {},
			searchSource: model.options.searchs.search1,
			dialogcardcomp: {},
			dialogcardSource: model.options.dialogs.dialog1,
			dialogcardcomp2: {},
			dialogcardSource2: model.options.dialogs.dialog2,
			dialogcardcomp3: {},
			dialogcardSource3: model.options.dialogs.dialog3,
			dialogcardcomp4: {},
			dialogcardSource4: model.options.dialogs.dialog4,
			detailSource: model.options.details.detail,
			gridOption: model.options.grids.grid1,
			enableFmt: ko.pureComputed(function() {
				var status = viewModel.simpleList.ref("isEnable")();
				return status == 1 ? "启用" : "停用";
			}),
		},
		events: $.extend({}, simpleview.prototype.events, {
			// 解冻金额
			unfreeze:function(index, rowId){
				var title="费用解冻";
				viewModel.index = index;
				if (u.isNumber(index)) {
					var currentData = viewModel.simpleList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
					if(!currentData.freezeMny){
						currentData.freezeMny=0;
					}
					viewModel.dialogcardcomp.seteidtData(currentData);
				}
				//显示模态框
				viewModel.dialogWidth
				? viewModel.dialogcardcomp.show(title, viewModel.dialogWidth, viewModel.unfreezeSave)
				: viewModel.dialogcardcomp.show(title, "500px", viewModel.unfreezeSave);
			},
			// 解冻金额
			unfreezeSave:function(){
				var postdata = viewModel.dialogcardcomp.geteidtData();
				$._ajax({
					url: appCtx + viewModel.baseurl+"/unFreeze?id="+postdata.id+"&unfreezeMny="+postdata.unfreezeMny+"",
					type: "post",
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
					  //如果index大于等于0说明是修改
					  viewModel.dialogcardcomp.close();
					  viewModel.search();
					}
				});
			},
			// 冻结金额
			freeze:function(index, rowId){
				var title="费用冻结";
				viewModel.index = index;
				if (u.isNumber(index)) {
					var currentData = viewModel.simpleList
						.getRowByRowId(rowId)
						.getSimpleData();
					viewModel.rowId = rowId;
					currentData.availableMny=currentData.mny-currentData.freezeMny;
					viewModel.dialogcardcomp2.seteidtData(currentData);
				}
				//显示模态框
				viewModel.dialogWidth
				? viewModel.dialogcardcomp2.show(title, viewModel.dialogWidth, viewModel.freezeSave)
				: viewModel.dialogcardcomp2.show(title, "500px", viewModel.freezeSave);
			},
			// 冻结金额
			freezeSave:function(){
				var postdata = viewModel.dialogcardcomp2.geteidtData();
				$._ajax({
					url: appCtx + viewModel.baseurl+"/toFreeze?id="+postdata.id+"&freezeMny="+postdata.freezeMny1+"",
					type: "post",
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
					  //如果index大于等于0说明是修改
					  viewModel.dialogcardcomp2.close();
					  viewModel.search();
					}
				});
			},
			// 交接金额
			handover:function(index, rowId){
				var title="费用交接";
				viewModel.index = index;
				var currentData = viewModel.simpleList
						.getRowByRowId(rowId)
						.getSimpleData();
					viewModel.rowId = rowId;
				viewModel.accountId = currentData.accountId;
				if(!currentData.customerId){//市场区域
					viewModel.dialogcardcomp4.seteidtData(currentData);
					viewModel.oldMarketAreaId=currentData.marketAreaId;
					//显示模态框
					viewModel.dialogWidth
					? viewModel.dialogcardcomp4.show(title, viewModel.dialogWidth, viewModel.handoverMarketSave)
					: viewModel.dialogcardcomp4.show(title, "500px", viewModel.handoverMarketSave);
				}else{//客户
					viewModel.dialogcardcomp3.seteidtData(currentData);
					viewModel.oldCustomerId=currentData.customerId;
					//显示模态框
					viewModel.dialogWidth
					? viewModel.dialogcardcomp3.show(title, viewModel.dialogWidth, viewModel.handoverCustSave)
					: viewModel.dialogcardcomp3.show(title, "500px", viewModel.handoverCustSave);
				}
			},
			// 客户交接金额
			handoverCustSave:function(){
				var postdata = viewModel.dialogcardcomp3.geteidtData();
				var url=appCtx + viewModel.baseBillsurl+"/customerBalanceChange?customerId="+viewModel.oldCustomerId+"&newCustomerId="+postdata.customerId+"&accountId="+viewModel.accountId;
				$._ajax({
					url: url,
					type: "post",
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
					  //如果index大于等于0说明是修改
					  viewModel.dialogcardcomp3.close();
					  viewModel.search();
					}
				});
			},
			// 市场区域交接金额
			handoverMarketSave:function(){
				var postdata = viewModel.dialogcardcomp4.geteidtData();
				var url=appCtx + viewModel.baseBillsurl+"/marketAreaBalanceChange?marketAreaId="+viewModel.oldMarketAreaId+"&newMarketAreaId="+postdata.marketAreaId+"&accountId="+viewModel.accountId;
				$._ajax({
					url: url,
					type: "post",
					data: JSON.stringify(postdata),
					contentType: "application/json; charset=utf-8",
					success: function(data) {
					  //如果index大于等于0说明是修改
					  viewModel.dialogcardcomp4.close();
					  viewModel.search();
					}
				});
			},
			getCurrency: function(id, mny, i) {
				if (id) {
					$._ajax({
						url: '/occ-base/api/base/currency/' + id,
						success: function(resp) {
							var newMny = mny.toFixed(resp.pricePrecision);
							viewModel.allRows[i].mny = newMny
							if (i == (viewModel.allRows.length - 1)) {
								viewModel.simpleList.setSimpleData(viewModel.allRows);
							}
						}
					});
				}
			},
			search: function(reindex) {
				if (reindex) {
					viewModel.simpleList.pageIndex(0);
				}
				viewModel.simpleList.removeAllRows();
				if (!viewModel.searchcomp) {
					var queryData = {};
				} else {
					var queryData = viewModel.searchcomp.getDataWithOpr ?
						viewModel.searchcomp.getDataWithOpr() : {};
				}
				queryData.size = viewModel.simpleList.pageSize();
				queryData.page = viewModel.simpleList.pageIndex();
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl,
					dataType: "json",
					data: queryData,
					success: function(data) {
						var con = data.content
						viewModel.simpleList.setSimpleData(con, {
							unSelect: false
						});
						viewModel.allRows = viewModel.simpleList.getSimpleData();
						viewModel.simpleList.totalRow(data.totalElements);
						viewModel.simpleList.totalPages(data.totalPages);
						for (var key = 0; key < con.length; key++) {
							var currencyId = con[key].currencyId,
								mny = con[key].mny;
							viewModel.getCurrency(currencyId, mny, key);
						}
					}
				});
			},
		}),
		rendertype: $.extend({}, common.rendertype, {
			availMnyRender:function(obj){
				obj.element.innerHTML =(obj.row.value.mny-obj.row.value.freezeMny).toFixed(4);
			},
			freezeMnyRender:function(obj){
				if(!obj.row.value.freezeMny){
					obj.row.value.freezeMny=0;
				}
				obj.element.innerHTML =obj.row.value.freezeMny;
			},
			castTypeList: function(params) {
				switch (params.value) {
					case "pay01":
						params.element.innerHTML = "冲抵订单";
						break;
					case "pay02":
						params.element.innerHTML = "货补";
						break;
					case "pay03":
						params.element.innerHTML = "实物货补";
						break;
					case "pay04":
						params.element.innerHTML = "账扣";
						break;
					default:
						params.element.innerHTML = "冲抵订单";
				}
			},
			// 管理按钮
			feeManager: function(obj) {
				var viewModel = obj.gridObj.viewModel;
				var dataTableRowId = obj.row.value["$_#_@_id"];
				var flag = "operation";
				// 解冻
				var allRuleFun1 ="data-bind=click:unfreeze.bind($data," + obj.rowIndex + "," + dataTableRowId + "," + '"' + flag + '"' + ")";
				// 冻结
				var allRuleFun2 ="data-bind=click:freeze.bind($data," + obj.rowIndex + "," + dataTableRowId + "," + '"' + flag + '"' + ")";
				// 交接
				var allRuleFun3 ="data-bind=click:handover.bind($data," + obj.rowIndex + "," + dataTableRowId + "," + '"' + flag + '"' + ")";

				obj.element.innerHTML =
				'<div class="ui-handle-icon">' +
				'<span class="ui-handle-word">' +
				'<a href="#" ' +
				allRuleFun1 +
				' title="解冻">解冻</a>' +
				"</span>    " +
				'<span class="ui-handle-word">' +
				'<a href="#" ' +
				allRuleFun2 +
				' title="冻结">冻结</a>' +
				"</span>" +
				'<span class="ui-handle-word">' +
				'<a href="#" ' +
				allRuleFun3 +
				' title="交接">交接</a>' +
				"</span>" +
				"</div>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			}
		}),
		afterCreate: function() {
			viewModel.dialogcardcomp.viewModel.params.on('accountId.valuechange', function(obj) {
				if (!obj.newValue) return;
				var refer = $('div[id^="refContaineraccountId"]').data("uui.refer");
				var refValues = refer.values[0];
				viewModel.dialogcardcomp.viewModel.params.setValue('castTypeId', refValues.castTypeId);
				viewModel.dialogcardcomp.viewModel.params.setValue('saleOrgId', refValues.saleOrgId);
				viewModel.dialogcardcomp.viewModel.params.setValue('financeOrgId', refValues.financeOrgId);
			});
		}
	});

	return view;
});