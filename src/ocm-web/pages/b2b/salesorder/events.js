define(["ocm_common", "./purchaseAfterCreate.js",], function (common, purchaseAfterCreate) {
	"use strict";
	var events = function (viewModel) {
		var billstatus = CONST.B2BENUM.SALEORDER;
		// var viewModel.CURRENCY = JSON.parse(localStorage.getItem('_A_P_currency'));

		var BILLPANELSTATUS = {
			ADD: "add",
			EDIT: "edit",
			COPY: "copy",
			DETAIL: "detail",
			DEFAULT: "default"
		};
		// var ORDERSTATUS = {
		// Saved("01", "待处理", "整单状态"),
		// Committed("02", "已提交", "整单状态"),
		// Approving("03", "审批中", "整单状态"),
		// Approved("04", "审批通过", "整单状态"),·
		// Disapproved("05", "审批不通过", "整单状态"),
		// Rejected("06", "已驳回", "整单状态"),
		// PartStockOut("07", "部分出库", "整单状态"),
		// AllStockOut("08", "全部出库", "整单状态"),
		// PartStockIn("09", "部分入库", "整单状态"),
		// AllStockIn("10", "全部入库", "整单状态");
		// }
		var ORDERSTATUSCHECK = {
			SUBMIT: {
				needCode: "01",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能提交");
				}
			},
			UNSUBMIT: {
				needCode: "02",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能收回");
				}
			},
			APPROVE: {
				needCode: "02",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能审批");
				}
			},
			UNAPPROVE: {
				needCode: "04",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态，不能取消审批");
				}
			},
			PUSH: {
				needCode: "04",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态，不能推发货单");
				}
			},
			CLOSE: {
				needCode: "04",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态，不能打开");
				}
			},
			OPEN: {
				needCode: 0,
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态、出库状态，不能关闭");
				}
			},
			REJECT: {
				needCode: "01",
				errmsg: function (s) {
					toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能驳回");
				}
			}
		};
		return {
			checkEmpty: function () {
				var allItemRows = viewModel.saleOrderItems.getAllRealRows();
				var emptyGoodsOptRows = "";
				if (allItemRows.length > 0) {
					allItemRows.forEach(function (item) {
						if (
							!item.getValue("baseGoodsOptId") &&
							parseFloat(item.getValue("isOptional")) == 1
						) {
							emptyGoodsOptRows += item.getValue("rowNum") + ",";
						}
					});
					emptyGoodsOptRows = emptyGoodsOptRows.slice(
						0,
						emptyGoodsOptRows.length - 1
					);
					if (emptyGoodsOptRows) {
						if (emptyGoodsOptRows)
							toastr.warning("请为行号" + emptyGoodsOptRows + "的商品添加选配");
						return false;
					} else {
						return true;
					}
				}
				return true;
			},
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			// callback 用于提交按钮成功后勾选选中数据
			search: function (reindex, callback) {
				if (!viewModel.salesorderList.getSimpleData) return;
				if (typeof reindex == 'function') {
					callback = reindex;
					reindex = undefined;
				}
				if (reindex) {
					viewModel.salesorderList.pageIndex(0);
				}
				viewModel.salesorderList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ?
					viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.salesorderList.pageSize();
				var pageNumber = viewModel.salesorderList.pageIndex();
				queryData.page = pageNumber;
				queryData.size = pageSize;

				//处理从首页跳转过来的情况下，带来的全局参数（afterCreate中保存的参数）
				if (viewModel.globalQueryData && viewModel.globalQueryData.length > 0) {
					for (var i = 0; i < viewModel.globalQueryData.length; i++) {
						queryData[viewModel.globalQueryData[i].key] =
							viewModel.globalQueryData[i].value;
					}
				}
				queryData["search_ISNULL_contractId"] = null;
				queryData["search_IN_saleModel"] = "01,03";
				if (!queryData["search_EQ_saleOrg"]) {
					queryData["search_NOTNULL_saleOrg"] = "~";
				}
				if (queryData["search_EQ_orderDate"]) {
					queryData["search_EQ_orderDate_date"] =
						queryData["search_EQ_orderDate"];
				}
				delete queryData["search_EQ_orderDate"];
				var url = viewModel.golbalIsDaichuku ?
					viewModel.daichukuurl :
					viewModel.baseurl;
				$._ajax({
					type: "get",
					//通过渠道上工作台首页跳转的待出库查询，需要使用单独接口调用。参数从aftercreate中接受判断
					url: appCtx + url,
					dataType: "json",
					data: queryData,
					success: function (data) {
						viewModel.salesorderList.setSimpleData(data.content, {
							unSelect: true
						});
						if (callback && typeof callback == "function") {
							callback(data.content);
						}
						if ((!reindex && !callback) || (typeof reindex == "boolean" && typeof callback == "function") || reindex) {
							viewModel.listTemplate.updateExtendData();
						}
						viewModel.salesorderList.totalRow(data.totalElements);
						viewModel.salesorderList.totalPages(data.totalPages);
					}
				});
			},
			//导出
			exportHandle: function () {
				var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
				var searchindex = viewModel.tabindex;
				if (searchindex == 1) {
					searchParams["search_IN_billStatus"] = billstatus.COMMITTED;
				} else if (searchindex == 2) {
					searchParams["search_IN_billStatus"] = billstatus.APPROVED;
				} else if (searchindex == 3) {
					searchParams["search_IN_billStatus"] = billstatus.FINISHED;
				}
				/* searchParams["search_EQ_isVso"] = 0;
				searchParams["search_IN_soType.saleBusinessType"] = "01,03"; */
				searchParams["search_IN_saleModel"] = "01,03";
				var templateUrl = "/saleOrder-excel/downloadExcelTemplate"; //导出模板地址参数
				var excelDataUrl = "/saleOrder-excel/excelDataExport"; //导出数据地址参数
				var listData = viewModel.salesorderList; //需要导出表格的dataTable
				var ele = $("#exportFiel")[0]; //挂载元素
				common.fileHandle.exportFile(
					listData,
					ele,
					searchParams,
					templateUrl,
					excelDataUrl
				);
			},
			//导入
			importHandle: function () {
				var urlInfo = "/saleOrder-excel/excelDataImport"; //倒入地址参数
				var urlStatusInfo = "/saleOrder-excel/excelLoadingStatus"; //请求进度地址参数
				var ele = $("#importFiel")[0]; //挂载元素
				var searchData = JSON.stringify({
					saleModel: '01'
				})
				common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, 1, function (data) {
					console.log(data)
				}, null, searchData);
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.salesorderList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.salesorderList.pageSize(size);
				viewModel.search(true);
			},
			//删除和批量删除
			del: function (data, rowId) {
				if (typeof data == "number") {
					viewModel.salesorderList.setRowSelectbyRowId(rowId);
				}
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderCode;
					for (var i = 0; i < rows.length; i++) {
						var orderSource = rows[i].getValue("orderSource");
						if (orderSource == "01") {
							orderCode = rows[i].getValue("orderCode");
							i = rows.length;
						}
					}
					if (orderCode) {
						toastr.warning("订单：" + orderCode + " 为门户下单，中台不能删除");
						return;
					}
					common.dialog.confirmDialog({
						msg1: "确认删除这些项？",
						msg2: "此操作不可逆",
						width: "400px",
						type: "error",
						onOk: function () {
							viewModel.del_ajax(rows);
						}
					});
				} else {
					toastr.warning("请先选择一行数据");
				}
			},
			// 计算表头合计数据
			computeHeadDataInfo: function () {
				var orderItems = viewModel.saleOrderItems.getSimpleData();
				// 计算表头货补优惠金额
				var supplementItems = orderItems.filter(function (item) {
					return item.dr != 1 && item.goodsSupplement && item.goodsSupplement == 1;
				});
				if (supplementItems && supplementItems.length > 0) {
					var totalGoodsSuppleAmount = 0;
					supplementItems.forEach(function (item) {
						totalGoodsSuppleAmount += parseFloat(item.mainNum * item.salePrice || 0);
					});
					viewModel.salesorderCard.getCurrentRow().setValue("totalGoodsSuppleAmount", viewModel.amountFormater.format(totalGoodsSuppleAmount));
				}
				// 表头合计
				var totalAmount = 0,
					totalDealAmount = 0,
					totalNum = 0,
					totalWeight = 0,
					totalVolume = 0,
					totalVolume = 0,
					totalNetWeight = 0;
				for (var i = 0; i < orderItems.length; i++) {
					if (orderItems[i].dr == 1) continue;
					// 过滤赠品行，货补行
					if (viewModel.ifOffsetGoods(orderItems[i])) {
						totalDealAmount += orderItems[i].dealAmount ? parseFloat(orderItems[i].dealAmount) : 0;
					}
					totalAmount += parseFloat(viewModel.amountFormater.format(parseFloat(orderItems[i].mainNum) * parseFloat(orderItems[i].salePrice) || 0));
					totalNum += orderItems[i].mainNum ? parseFloat(orderItems[i].mainNum) : 0;
					totalWeight += orderItems[i].rowWeight ? parseFloat(orderItems[i].rowWeight) : 0;
					totalVolume += orderItems[i].rowVolume ? parseFloat(orderItems[i].rowVolume) : 0;
					totalNetWeight += orderItems[i].rowNetWeight ? parseFloat(orderItems[i].rowNetWeight) : 0;
				}
				viewModel.salesorderCard.getCurrentRow().setValue("totalNum", totalNum);
				viewModel.salesorderCard.getCurrentRow().setValue("totalWeight", totalWeight);
				viewModel.salesorderCard.getCurrentRow().setValue("totalVolume", totalVolume);
				viewModel.salesorderCard.getCurrentRow().setValue("totalNetWeight", totalNetWeight);
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
				// 暂时保留，后续可去除
				if (orderType && "03" == orderType[0].saleModelCode) {
					totalDealAmount = 0;
				}
				viewModel.salesorderCard.getCurrentRow().setValue("totalDealAmount", totalDealAmount);
				viewModel.salesorderCard.getCurrentRow().setValue("totalAmount", totalAmount);
			},
			// 子表删除
			del_row: function (data, rowId) {

				if (typeof data == "number") {
					viewModel.saleOrderItems.setRowSelectbyRowId(rowId);
				}
				var rows = viewModel.saleOrderItems.getSelectedRows();
				// 判断选择的是否全为货补行
				// 已做过促销或冲抵，则直接返回
				var flag = "";
				var ifAllSupplymentItems = rows.every(function (row) {
					var goodsSupplement = row.getValue("goodsSupplement");
					return goodsSupplement && goodsSupplement == 1;
				})
				if (ifAllSupplymentItems) {
					flag = "03";
				}
				if (viewModel.validIfPromOrOffset(flag)) {
					return;
				}
				if (rows && rows.length > 0) {
					common.dialog.confirmDialog({
						msg1: "确认删除这些项？",
						msg2: "此操作不可逆",
						width: "400px",
						type: "error",
						onOk: function () {
							rows.forEach(function (row, index) {
								row.setValue("dr", "1");
								var productId = row.getValue("goodsId"),
									rowNum = row.getValue("rowNum"),
									allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
								allBomRows.forEach(function (item, index) {
									if (
										(item.getValue("parentGoodsId") === productId ||
											item.getValue("goodsId") === productId) &&
										item.getValue("parentRowNum") == rowNum
									) {
										item.setValue("dr", "1");
										viewModel.batchSaleOrderBomItems.removeRows(item);
									}
								});
							});
							viewModel.saleOrderItems.removeRows(rows);
							// 计算合计金额、合计数量
							viewModel.computeHeadDataInfo();
						}
					});
				} else {
					toastr.warning("请先选择一行数据");
				}
			},
			del_ajax: function (rows, callback) {
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
					success: function (data) {
						if (typeof callback == "function") {
							callback();
						}
						toastr.success();
						viewModel.salesorderList.removeRows(rows);
					}
				});
			},
			getBillIdAjax: function () {
				// viewModel.salesorderCard.setValue("id", "");
				$._ajax({
					url: appCtx + viewModel.baseurl + "/get-billId",
					type: "get",
					data: {},
					async: false,
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						if (data) {
							viewModel.pk = data;
							viewModel.newsalesorderCardId = data;
							viewModel.salesorderCard.setValue("id", data);
						} else {
							toastr.error("没获取到订单编号！");
						}
					}
				});
			},
			//进入新增单据页
			showAddBillPanel: function () {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
				viewModel.goBillPanel(function () {
					viewModel.showAddBillPanelCallBack();
					viewModel.editEventListener();
					purchaseAfterCreate(viewModel);
					viewModel.setDefaultCardEnable();
				});
			},
			setDefaultCardEnable: function () {
				viewModel.salesorderCard.setMeta("customerId", "enable", false);
				viewModel.salesorderCard.setMeta("receiveCustomerId", "enable", false);
				viewModel.salesorderCard.setMeta("orderInvoice", "enable", false);
				viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", false);
				$("#salesorderCard_customerId").attr({
					placeholder: "请先选择销售组织"
				});
				$("#salesorderCard_receiveCustomerId").attr({
					placeholder: "请先选择客户"
				});
				$("#salesorderCard_orderReceiveAddress").attr({
					placeholder: "请先选择客户"
				});
				$("#salesorderCard_orderInvoice") && $("#salesorderCard_orderInvoice").attr({
					placeholder: "请先选择客户"
				});
				$("#salesorderCard_orderTypeId").parent().attr("data-refparam", JSON.stringify({
					EQ_isEnable: "1",
					EQ_billTypeId: "SaleOrder",
					"IN_trantypeExtends.fieldValue": "01,03"
				}));
			},
			showAddBillPanelCallBack: function () {
				setTimeout(function () {
					viewModel.getBillIdAjax();
				}, 1000);
				viewModel.saleOrderItems.removeAllRows();
				viewModel.batchSaleOrderBomItems.removeAllRows();
				viewModel.salesorderCard.removeAllRows();
				// 查询是否启用调度中心
				viewModel.querySysParams();
				viewModel.index = -1;
				viewModel.isBomPanel(true);
				viewModel.orderInvoice.clear();
				viewModel.orderReceiveAddress.clear();
				// 清空费用冲抵信息
				viewModel.addOrEditClearOffset(true);
				viewModel.SearchpromAfter = "";
				viewModel.SearchpromAfterBom = "";
				viewModel.flushSelected = [];
				// 清空编辑页附件内容
				$("#saleorder-card-attach").html("");
				// 清空bom结构表
				viewModel.salesorderCard.removeAllRows();
				var curRow = viewModel.salesorderCard.createEmptyRow();
				// 行号池
				viewModel.currowNum(0);
				viewModel.currowBomNum(0);
				curRow.setValue("orderStatusId", "01");
				curRow.setValue("deliveryDate", new Date().getTime());
				curRow.setValue("orderDate", new Date().getTime());
				if (viewModel.CURRENCY) curRow.setValue("currencyId", viewModel.CURRENCY.id);
				//合计行还原
				viewModel.totalPrecisionHandle(curRow, "add");
				viewModel.attachList = [];
			},
			// TODO 进入复制单据页
			showCopyBillPanel: function () {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
				viewModel.goBillPanel(function () {
					viewModel.showCopyBillPanelCallBack();
					viewModel.editEventListener();
					purchaseAfterCreate(viewModel);
				});
			},
			showCopyBillPanelCallBack: function () {
				// 开始初始化得到订单id 为上传做铺垫
				viewModel.preferentialRatio = 1;
				viewModel.getBillIdAjax();
				viewModel.index = -1;
				viewModel.SearchpromAfter = "";
				viewModel.SearchpromAfterBom = "";
				// 清空费用冲抵信息
				viewModel.addOrEditClearOffset(true);
				// 清空编辑页附件内容
				$("#saleorder-card-attach").html("");
				var copyRow = viewModel.salesorderList.getFocusRow();
				if (copyRow) {
					var id = copyRow.getValue("id");
					viewModel.copyByParentid(id, function (maindata) {
						viewModel.isDetail = false; // 标识用于展示附件的
						maindata.promAmount = 0;
						maindata.totalGoodsSuppleAmount = 0;
						maindata.offsetAmount = 0;
						// 先渲染门户附件
						viewModel.orderAttachments = maindata.orderAttachments;
						viewModel.showAttachment("01");
						var orderItems = maindata.orderItems;
						orderItems.forEach(function (item) {
							item.promPrice = item.salePrice;
							item.salePrice = item.salePrice;
							item.promAmount = 0;
							item.isClose = 0;
							item.isDeClose = 0;
						})
						var orderItemBoms = maindata.orderItemBoms;
						viewModel.batchSaleOrderBomItems.setSimpleData(orderItemBoms);
						viewModel.salesorderCard.setSimpleData(maindata);
						viewModel.saleOrderItems.setSimpleData(orderItems, {
							status: "new",
							unSelect: true
						});
						if (orderItems && orderItems.length > 0) {
							var itemAllRows = viewModel.saleOrderItems.getAllRealRows();
							itemAllRows.map(function (item) {
								var orderNum = item.getValue("orderNum");
								item.setValue("orderNum", "0.1");
								item.setValue("orderNum", orderNum);
							})
						} else {
							viewModel.salesorderCard.setValue("offsetAmount", "0");
							viewModel.salesorderCard.setValue("totalNum", "0");
							viewModel.salesorderCard.setValue("promAmount", "0");
							viewModel.salesorderCard.setValue("totalVolume", "0");
							viewModel.salesorderCard.setValue("totalWeight", "0");
							viewModel.salesorderCard.setValue("totalNetWeight", "0");
							viewModel.salesorderCard.setValue("totalAmount", "0");
							viewModel.salesorderCard.setValue("totalDealAmount", "0");
						}
						viewModel.salesorderCard.setValue("totalGoodsSuppleAmount", "0");

						// 给主表工厂字段赋值
						if (orderItems && orderItems.length > 0) {
							maindata.factoryId = orderItems[0].factoryId;
							maindata.factoryName = orderItems[0].factoryName;
						}
						maindata.orderDate = new Date().getTime();
						// 保存 收货地址 和 发票信息
						viewModel.orderReceiveAddress.setSimpleData(
							maindata.orderReceiveAddress
						);
						viewModel.orderInvoice.setSimpleData(maindata.orderInvoice);
						// 给地址 开票单位增加条件
						var customerInoviceBase = viewModel.app.getComp("orderInvoice");
						var receiveAddressBase = viewModel.app.getComp("orderReceiveAddress");

						customerInoviceBase && $(customerInoviceBase.element).attr(
							"data-refparam",
							'{"EQ_customer.id":"' + maindata.customerId + '"}'
						);
						customerInoviceBase && $(receiveAddressBase.element).attr(
							"data-refparam",
							'{"EQ_customer.id":"' + maindata.customerId + '"}'
						);
						var orderInvoice = maindata.orderInvoice;
						var orderReceiveAddress = maindata.orderReceiveAddress;

						if (orderReceiveAddress) {
							viewModel.salesorderCard.setValue("orderReceiveAddress", orderReceiveAddress.receiveAddressId);
							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", orderReceiveAddress.receiver);
							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", orderReceiveAddress.receiverPhone);
							var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
						}
						if (orderInvoice) {
							// 客户开票单位
							viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.invoiceId);
							viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceTitle);
							viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceTitle);
						}
						var saleOrgId = maindata.saleOrgId || viewModel.salesorderCard.getValue("saleOrgId");
						// 询整单最大优惠比例
						if (saleOrgId) {
							viewModel.matchPreferentialRadio(saleOrgId, "edit");
						}
						// 查询订单行根据参数控制价格可编辑
						$._ajax({
							url: window.pathMap.b2b + "/b2b/order-control-rule/find-rule",
							data: {
								trantypeId: maindata.orderTypeId,
								saleOrgId: maindata.saleOrgId
							},
							success: function (resp) {
								if (resp && resp.length > 0) {
									var data = resp[0];
									// 存储标识，添加商品时校验对呀规则进行不同操作
									viewModel.isPriceEditFind = data.priceEditFind;
									viewModel.isPriceEditNotFind = data.priceEditNotFind;
								}
							}
						});
						var curRow = viewModel.salesorderCard.getFocusRow();
						// 获得当前最大行号, 防止获取行时行数据还没有拿到
						setTimeout(function () {
							viewModel.getCurRowNum();
							viewModel.getBomCurrowNum();
						}, 1000);
						// 为合计行进行精度处理
						viewModel.totalPrecisionHandle(curRow);
						curRow.setValue("id", "");
						curRow.setValue("creator", "");
						curRow.setValue("creationTime", "");
						curRow.setValue("modifier", "");
						curRow.setValue("modifiedTime", "");
						curRow.setValue("orderCode", "");
						curRow.setValue("orderDate", new Date().getTime());
						curRow.setValue("approveTime", "");
						curRow.setValue("approveOpinion", "");
						curRow.setValue("totalGoodsSuppleAmount", 0) // 复制订单 货补优惠金额清  0 
						curRow.setValue("orderStatusId", "01");
						$(".ui-bill-detail").hide();
						viewModel.SearchpromAfter = '';
						viewModel.SearchpromAfterBom = '';
						viewModel.orderPriceProm = '';
						viewModel.giftProms = '';
						viewModel.reqOrderPromRels = '';
						viewModel.editTemplate.updateExtendData();
					});
				} else {
					toastr.warning("未找到来源单据");
				}
			},
			//查询子表数据
			findByParentid: function (id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/detail",
					type: "get",
					data: {
						id: id
					},
					success: function (data) {
						if (data) {
							// 获取促销活动信息，重新赋值
							var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
							data.orderItems.map(function (orderItems) {
								var promotinName = '',
									promotinId = '';
								orderItems.orderPromRels.map(function (items) {
									promotinName += items.activityName + ',';
									promotinId += items.activityId + ',';
								});
								orderItems.promotinName = promotinName.substr(0, promotinName.length - 1);
								orderItems.promotinId = promotinId.substr(0, promotinId.length - 1);

								if (_A_P_unit && _A_P_unit.length > 0) {
									var weightUnitCode = orderItems.weightUnitCode;
									var volumeUnitCode = orderItems.volumeUnitCode;
									var w = _A_P_unit.filter(function (r) {
										return r.unitCode == weightUnitCode;
									});
									var v = _A_P_unit.filter(function (r) {
										return r.unitCode == volumeUnitCode;
									});
									if (w && w.length > 0) {
										orderItems.rowWeight = new u.NumberFormater(w[0].precision).format(parseFloat(orderItems.rowWeight));
									}
									if (v && v.length > 0) {
										orderItems.rowVolume = new u.NumberFormater(v[0].precision).format(parseFloat(orderItems.rowVolume));
									}
								}
							});

							if (typeof callback == "function") {
								callback(data);
							}
						} else {
							toastr.error();
						}
					}
				});
			},
			// 复制
			copyByParentid: function (id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/edit-or-copy",
					type: "get",
					data: {
						id: id,
						type: "copy"
					},
					success: function (data) {
						if (data) {
							if (typeof callback == "function") {
								callback(data);
							}
						} else {
							toastr.error();
						}
					}
				});
			},
			//根据商品id取bom
			findBomByParentId: function (id) {
				if (!id) return;
				var bomInfo;
				$._ajax({
					url: window.pathMap.base +
						"/base/goods-boms/goods-bom-by-parent-good-id",
					type: "get",
					async: false,
					data: {
						parentGoodId: id
					},
					success: function (data) {
						bomInfo = data;
					}
				});
				return bomInfo;
			},
			//获取承运商、供应商
			findCarrierData: function (selectAddressValue) {
				var value = viewModel.saleOrderItems.getRealSimpleData();
				var realAllRows = viewModel.saleOrderItems.getAllRealRows();
				var selectAddress = selectAddressValue ?
					selectAddressValue :
					viewModel.orderReceiveAddress.getSimpleData()[0];
				var carrierInfo = [];
				if (value && value.length > 0 && selectAddress) {
					value.forEach(function (item) {
						var saleOrg = item.saleOrgId || viewModel.salesorderCard.getValue("saleOrgId");
						if (item.goodsId) {
							carrierInfo.push({
								saleOrgId: saleOrg, // 销售组织
								customerId: viewModel.salesorderCard.getValue("customerId"), // 客户
								provinceId: selectAddress.receiverProvinceId,
								cityId: selectAddress.receiverCityId,
								countyId: selectAddress.receiverCountyId,
								townId: selectAddress.receiverTownId,
								goodsId: item.goodsId || item.id
							});
						}
					});
					$._ajax({
						url: window.pathMap.dispatch + "/dispatch/resource-schedule-configurations/logistic-and-supplier",
						type: "post",
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify(carrierInfo),
						success: function (data) {
							// 添加承运商
							if (data && data.length > 0) {
								// 商品行item1
								data.map(function (item) {
									realAllRows.map(function (allRows) {
										if (allRows.getValue("goodsId") == item.goodsId) {
											allRows.setValue("logisticsId", item.logisticsId);
											allRows.setValue("refshowcontent_logisticsId_name", item.logisticsName);
											allRows.setValue("supplierId", item.supplierId);
											allRows.setValue("refshowcontent_supplierId_name", item.supplierName);
											// allRows.setValue("logisticsName", item.logisticsName)
										}
									})
								})
							}
						}
					});
				}
			},
			// 清除基类属性
			clearBaseProp: function (row, type) {
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
			// 是否已促销或已冲抵, flag: 03 代表货补
			validIfPromOrOffset: function (flag) {
				// 判断是否冲抵过(货补商品不受冲抵、促销控制，依可添加)
				if (viewModel.isCostFlush != 0 && flag != "03") {
					var msg =
						viewModel.isCostFlush == 1 ?
							"已经冲抵后不可再做此操作，如要操作，请先取消冲抵。" :
							"已经促销匹配后不可再做此操作，如要操作，请先取消促销匹配。";
					toastr.warning(msg);
					return true;
				}
				return false;
			},
			//参照选择批量新增子表（销售产品）
			showAddItemsCommonRef: function (arg, saleModel, itemRefId) {
				var eleId = itemRefId ? itemRefId : "saleorderaddItemsRef";
				// 已做过促销或冲抵，则直接返回
				if (viewModel.validIfPromOrOffset(saleModel)) {
					return;
				}
				if (viewModel.isAvailable()) {
					viewModel.clearItemsRef();
					var customer = common.getRefDataByDtAndKey("salesorderCard", "customerId");
					var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
					var saleOrg = $("#refContainersalesorderCard_saleOrgId").data("uui.refer").values;
					var customerId = customer && customer[0].id;
					var saleModel = saleModel || (orderType && orderType[0].saleModelCode);
					var saleModelId = orderType && orderType[0].id;
					var saleOrgId = saleOrg && (saleOrg[0].id || saleOrg[0].refpk);
					var condition = {
						search_customerId: customerId,
						search_saleModel: saleModel,
						search_customerRankCode: "01",
						search_costType: "",
						search_organization: saleOrgId
					};

					// 如果是参照货补商品，补充查询参数
					if ("03" == saleModel) {
						condition.search_costType = "Goodssupplement";
						viewModel.setSearchEleDefaultRefParams();
					}
					$("#" + eleId).attr(
						"data-refparam",
						JSON.stringify(u.extend({}, {}, condition))
					);
					/**
					 * @example 判断成交价格和成交金额是否可编辑
					 * @param  询到价是否可改 : priceEditFind
					 * @param  询不到价是否可改 : priceEditNotFind
					 */
					// 查询订单行根据参数控制价格可编辑
					$._ajax({
						url: window.pathMap.b2b + "/b2b/order-control-rule/find-rule",
						data: {
							trantypeId: saleModelId,
							saleOrgId: saleOrgId
						},
						success: function (resp) {
							if (resp && resp.length > 0) {
								var data = resp[0];
								// 存储标识，添加商品时校验对呀规则进行不同操作
								viewModel.isPriceEditFind = data.priceEditFind;
								viewModel.isPriceEditNotFind = data.priceEditNotFind;
							}
						}
					});
					if (arg == "$normal") {
						viewModel.wichAddButton = "normal";
					} else if (arg == "$additional") {
						viewModel.wichAddButton = "additional";
					}
					$("#" + eleId + " .refer").trigger("click");
				}
			},
			//补货商品新增
			showAddSupplementItemsRef: function (arg) {
				viewModel.clearItemsRef();
				setTimeout(function () {
					$('.msgtype-table').bootstrapTable('load', {
						data: []
					})
				}, 100);
				viewModel.showAddItemsCommonRef(arg, "03", "saleorderaddSupplementItemsRef");
			},
			showAddItemsRef: function (arg) {
				viewModel.showAddItemsCommonRef(arg, "01", "saleorderaddItemsRef");
			},
			add_row: function () {
				if (viewModel.validIfPromOrOffset()) {
					return;
				}
				if (viewModel.isAvailable()) {
					var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
					var saleOrg = common.getRefDataByDtAndKey("salesorderCard", "saleOrgId");
					var saleModelId = orderType && orderType[0].id;
					var saleOrgId = saleOrg && saleOrg[0].refpk;
					/**
					 * @example 判断成交价格和成交金额是否可编辑
					 * @param  询到价是否可改 : priceEditFind
					 * @param  询不到价是否可改 : priceEditNotFind
					 */
					// 查询订单行根据参数控制价格可编辑
					$._ajax({
						url: window.pathMap.b2b + '/b2b/order-control-rule/find-rule',
						data: {
							trantypeId: saleModelId,
							saleOrgId: saleOrgId
						},
						success: function (resp) {
							if (resp && resp.length > 0) {
								var data = resp[0];
								// 存储标识，添加商品时校验对呀规则进行不同操作
								viewModel.isPriceEditFind = data.priceEditFind;
								viewModel.isPriceEditNotFind = data.priceEditNotFind;
							}
						}
					});
					var creatRow = viewModel.saleOrderItems.createEmptyRow();
					creatRow.setValue("goodsId", "");
				}
			},
			//进入修改单据页
			showEditBillPanel: function (index, rowId) {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
				viewModel.goBillPanel(
					function (index, rowId) {
						return function () {
							viewModel.showEditBillPanelCallBack(index, rowId);
							viewModel.editEventListener();
							purchaseAfterCreate(viewModel);
						}
					}(index, rowId)
				);
				// viewModel.goBillPanel().then(function(){
				//   viewModel.showEditCallBack(index, rowId)
				// });
			},
			showEditBillPanelCallBack: function (index, rowId) {
				viewModel.isBomPanel(true);
				// 查询是否启用调度中心
				viewModel.querySysParams();
				// 情况促销信息
				viewModel.SearchpromAfter = "";
				viewModel.SearchpromAfterBom = "";
				// 清空编辑页附件内容
				$("#saleorder-card-attach").html("");
				// 清空bom结构表
				viewModel.batchSaleOrderBomItems.removeAllRows();
				// 清空费用冲抵信息
				viewModel.addOrEditClearOffset(true);

				var grid = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid;
				grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), false);
				grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), false);
				grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
				grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), false);
				grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), false);
				var row;
				if (index == -1) {
					//处理通过详情页编辑进入
					row = viewModel.salesorderList.getFocusRow();
					index = 0;
				} else {
					//行上的编辑按钮
					row = viewModel.salesorderList.getRowByRowId(rowId);
				}
				viewModel.index = index;
				viewModel.rowId = row.rowId;
				var id = row.getValue("id");
				//查询子表数据
				viewModel.findByParentid(id, function (data) {
					viewModel.pk = data.id;
					viewModel.isDetail = false; // 标识用于展示附件的
					// 先渲染门户附件
					viewModel.orderAttachments = data.orderAttachments;
					viewModel.showAttachment("01");
					if ("01" == data.saleModel || "03" == data.saleModel) {
						grid.setColumnVisibleByColumn(grid.getColumnByField("deliveryNum"), false);
						grid.setColumnVisibleByColumn(grid.getColumnByField("stockOutNum"), false);
						grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
						grid.setColumnVisibleByColumn(grid.getColumnByField("returnNum"), false);
					} else {
						grid.setColumnVisibleByColumn(grid.getColumnByField("stockInNum"), false);
					}
					if ("03" == data.saleModel) {
						grid.getColumnByField("orderNum").options.editable = true;
					}
					grid.repaintGridDivs();
					// 判断是否有促销和费用冲抵
					var promAmountF = data.promAmount || 0;
					var orderPromRels = false;
					// 判断是否含有整单促销
					if (data.orderPromRels && data.orderPromRels.length > 0) orderPromRels = true;

					// 判断是否有商品行促销
					var ifGiftProms = (data.orderItems || []).some(function (item) {
						return item.isGift == 1 && item.orderPromRels && item.orderPromRels.length > 0;
					})

					var offsetAmountF = data.offsetAmount || 0;
					if (promAmountF > 0 || orderPromRels || ifGiftProms) {
						viewModel.isSearchprom = 1;
						viewModel.costFreezeEvent(true, 1);
					}
					if (offsetAmountF > 0 && "03" != data.saleModel) {
						viewModel.costFreezeEvent(true);
					}
					data.orderStatusId = data.orderStatusCode || "01";
					viewModel.salesorderCard.setSimpleData(data);
					// 保存 收货地址 和 发票信息
					viewModel.orderReceiveAddress.setSimpleData(data.orderReceiveAddress);
					viewModel.orderInvoice.setSimpleData(data.orderInvoice);
					// 给地址 开票单位增加条件
					var customerInoviceBase = viewModel.app.getComp("orderInvoice");
					var receiveAddressBase = viewModel.app.getComp("orderReceiveAddress");

					customerInoviceBase && $(customerInoviceBase.element).attr(
						"data-refparam",
						'{"EQ_customer.id":"' + data.customerId + '"}'
					);
					receiveAddressBase && $(receiveAddressBase.element).attr(
						"data-refparam",
						'{"EQ_customer.id":"' + data.customerId + '"}'
					);
					var orderInvoice = data.orderInvoice;
					var orderReceiveAddress = data.orderReceiveAddress;

					if (orderReceiveAddress) {
						viewModel.salesorderCard.setValue("orderReceiveAddress", orderReceiveAddress.receiveAddressId);
						viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", orderReceiveAddress.receiver);
						viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", orderReceiveAddress.receiverPhone);
						var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
						viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
					}
					if (orderInvoice) {
						// 客户开票单位
						viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.invoiceId);
						viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceTitle);
						viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceTitle);
					}
					// bom 表填充
					viewModel.batchSaleOrderBomItems.setSimpleData(data.orderItemBoms, {
						unSelect: true
					});
					// 重新询价
					var orderItems = data.orderItems;
					var goodsInfoDtos = [];

					var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					orderItems.forEach(function (item) {
						item.isPromGift = (item.orderPromRels && item.orderPromRels.length > 0) ? 1 : 0;
						item.goodsAttrVals = "";
						goodsInfoDtos.push({
							originalGoodsId: item.originalGoodsId,
							saleOrgId: saleOrgId
						});
					});

					// 根据选择的商品信息 去询价格
					var priceData = {
						customer: viewModel.salesorderCard.getValue("customerId"),
						saleModel: viewModel.salesorderCard.getValue("saleModel"),
						goodsInfoDtos: goodsInfoDtos
					};
					var headData = data;
					$._ajax({
						url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
						data: JSON.stringify(priceData),
						contentType: "application/json;charset=UTF-8",
						type: "POST",
						success: function (resp) {
							var newData = [];
							for (var i = 0; i < resp.length; i++) {
								var obj = {};
								if (resp[i].baseDiscountPrice) {
									obj.baseDiscountPrice = resp[i].baseDiscountPrice;
								}
								if (resp[i].basePrice) {
									obj.basePrice = resp[i].basePrice;
								}
								newData.push(obj);
							}
							var data = $.extend(true, orderItems, newData);

							viewModel.saleOrderItems.setSimpleData(orderItems, {
								unSelect: true
							});
							// 判断该订单是否使用了费用冲抵，如果是，屏蔽选择项
							if (headData.offsetAmount > 0 || headData.totalGoodsSuppleAmount > 0) {
								// 使用费用冲抵，需查询商品行费用使用明细
								if (headData.id) {
									viewModel.queryOffsetDetailsByOrderId(headData.id);
								}
							}
							viewModel.editTemplate.updateExtendData();
						}
					});


					viewModel.attachList = [];
					// 获得当前最大行号, 防止获取行时行数据还没有拿到
					setTimeout(function () {
						viewModel.getCurRowNum();
						viewModel.getBomCurrowNum();
					}, 1000);
					// viewModel.goBillPanel();
					viewModel.seteidtCondition();
					// viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
					// 获取附件
					viewModel.queryAttach();
				});
			},
			//详情
			detail: function () {
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
				viewModel.goDetailPanel(
					function () {
						viewModel.showDetailBillPanelCallBackail();
					}
				);
			},
			showDetailBillPanelCallBackail: function () {
				viewModel.isDetail = true; // 标识用于展示附件的
				viewModel.isBomPanel(true);
				// 清空bom结构表
				viewModel.batchSaleOrderBomItems.removeAllRows();
				viewModel.saleOrderItems.removeAllRows();
				viewModel.salesorderDetailCard.removeAllRows();

				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.salesorderList.getCurrentRow();
					var isShowEdit = curRow.getValue("orderStatusCode") == "01" ? "Saved" : false;
					viewModel.billPanelStatusEdit(isShowEdit);
					// 为合计行进行精度处理
					viewModel.totalPrecisionHandle(curRow);
					var id = curRow.getValue("id");
					viewModel.findByParentid(id, function (maindata) {
						viewModel.pk = maindata.id;
						// 先渲染门户附件
						viewModel.orderAttachments = maindata.orderAttachments;
						viewModel.showAttachment("01");
						var childdata = maindata.orderItems;
						var orderInvoice = maindata.orderInvoice;
						var orderReceiveAddress = maindata.orderReceiveAddress;
						viewModel.salesorderDetailCard.setSimpleData(maindata);
						if (orderReceiveAddress) {
							// viewModel.salesorderDetailCard.setValue("orderReceiveAddress", orderReceiveAddress.receiverTown + orderReceiveAddress.receiverAddress);
							viewModel.salesorderDetailCard.setValue("orderReceiveAddress", orderReceiveAddress.receiveAddressId);
							viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_firstReceiver", orderReceiveAddress.receiver);
							viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", orderReceiveAddress.receiverPhone);
							var adr = (orderReceiveAddress.country || "") + (orderReceiveAddress.receiverProvince || "") + (orderReceiveAddress.receiverCity || "") + (orderReceiveAddress.receiverTown || "") + (orderReceiveAddress.receiverAddress || "");
							viewModel.salesorderDetailCard.setValue("refrel_orderReceiveAddress_name", adr);
						}
						if (orderInvoice) {
							// 客户开票单位
							viewModel.salesorderDetailCard.setValue("orderInvoice", orderInvoice.invoiceId);
							viewModel.salesorderDetailCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceTitle);
							viewModel.salesorderDetailCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceTitle);
						}
						viewModel.saleOrderItems.setSimpleData(childdata, {
							unSelect: true
						});
						// bom 表填充
						viewModel.batchSaleOrderBomItems.setSimpleData(
							maindata.orderItemBoms, {
								unSelect: true
							}
						);
						// 审批流
						viewModel.initBPMFromBill(id, viewModel);
						// 获取附件
						viewModel.queryAttach();
						viewModel.detailTemplate.updateExtendData();
						var saleorderItemDto = viewModel.saleOrderItems.getAllRealRows();
						for (var i = 0; i < saleorderItemDto.length; i ++) {
							var curRow = saleorderItemDto[i];
							var stockData = {
								customer: viewModel.salesorderDetailCard.getValue("customerId"),
								saleModel: viewModel.salesorderDetailCard.getValue("saleModel"),
								orderItemDtos: [curRow.getSimpleData()]
							};
	
							$._ajax({
								url: window.pathMap.b2b + "/b2b/order/stock",
								data: JSON.stringify(stockData),
								contentType: "application/json;charset=UTF-8",
								type: "POST",
								async: false,
								success: function (resp) {
									var num = resp ? (resp[curRow.getValue("goodsId")] || "") : "";
									if (num) {
										curRow.setValue("existingNum", num.onhandNum)
										curRow.setValue("availableNum", num.availableNum)
									}
								}
							});
						}
					});
				}, 1);
			},
			seteidtCondition: function (data) {
				var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
				viewModel.changeCondition(
					"salesorderCard_customerId", {
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1",
						EQ_SaleOrder: saleOrgId
					}, {}
				);
			},
			//清空已选销售产品参照
			clearItemsRef: function () {
				viewModel.ItemRefList.setValue("productref", "");
				viewModel.ItemRefList.setValue("supplementproductref", "");
				var refer = $("#refContainerproductref").data("uui.refer");
				refer.uncheckAll();
				refer.setValue([]);
				var supplementRefer = $("#refContainersupplementproductref").data("uui.refer");
				supplementRefer.uncheckAll();
				supplementRefer.setValue([]);

			},
			// 从行号池中拿到最新的行号
			generaterowNum: function () {
				var latestnum = viewModel.currowNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowNum(newnum);
				return newnum;
			},
			//删除子表项
			delItems: function () {
				var selectedRows = viewModel.saleOrderItems.getSelectedRows();
				viewModel.saleOrderItems.removeRows(selectedRows);
				viewModel.calcItemTotal();
			},
			// 表头检查
			isAvailable: function (type) {
				var cardData = viewModel.salesorderCard.getCurrentRow().getSimpleData();
				var customerId = cardData.customerId,
					saleModelId = cardData.saleModelId,
					orderTypeId = cardData.orderTypeId,
					saleOrgId = cardData.saleOrgId;

				if (!saleOrgId) {
					toastr.warning("请先选择销售组织！");
					return false;
				}
				if (!customerId) {
					toastr.warning("请先选择客户！");
					return false;
				}
				if (!orderTypeId) {
					toastr.warning("请先选择客户订单类型！");
					return false;
				}
				return true;
			},
			//查询账期
			queryAccount: function (saleOrgId, customerId, orderType) {
				var url =
					"/occ-settlement/api/settlement/AccountDateSettings/settlement-checkSettings";
				$._ajax({
					url: url,
					type: "get",
					data: {
						saleOrg: saleOrgId,
						customer: customerId,
						orderType: orderType
					},
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						viewModel.salesorderCard.setValue("accountPeriodId", data.id);
						// viewModel.salesorderCard.setValue("accountPeriodName", data.name);
						// viewModel.salesorderCard.setValue("accountPeriodCode", data.code);
					}
				});
			},
			//保存单据
			saveBill: function () {
				var result = viewModel.validateBill();
				if (!viewModel.checkEmpty()) {
					return;
				}
				if (result) {
					var currentRow,
						index = viewModel.index;
					var salesorderData = common.dynamicTemplate.extendDatas(viewModel.salesorderCard.getSimpleData())[0];
					var saleOrderItemsData = common.dynamicTemplate.extendDatas(viewModel.saleOrderItems.getSimpleData());
					var batchSaleOrderBomItems = common.dynamicTemplate.extendDatas(viewModel.batchSaleOrderBomItems.getSimpleData());

					// 封装商品行费用使用明细
					saleOrderItemsData = viewModel.fillOrderItemsOffsetDetailOnSave(saleOrderItemsData);
					salesorderData.orderInvoice = viewModel.orderInvoice.getSimpleData()[0];
					salesorderData.orderReceiveAddress = viewModel.orderReceiveAddress.getSimpleData()[0];
					salesorderData.flushSelected = viewModel.flushSelected;
					var orderPriceProm = viewModel.orderPriceProm;
					// 整单优惠信息，需要挂载到表头上
					if (orderPriceProm) {
						salesorderData.orderPriceProm = orderPriceProm;
					}
					var giftProms = viewModel.giftProms;
					// 赠品信息，需挂载到对应的表体上
					if (giftProms && giftProms.length > 0) {
						for (var i = 0; i < saleOrderItemsData.length; i++) {
							for (var j = 0; j < giftProms.length; j++) {
								if (!giftProms[j].optGoodsId) {
									var giftDtos = giftProms[j].giftDtos;
									if (!giftDtos) {
										continue;
									}
									for (var m = 0; m < giftDtos.length; m++) {
										if (saleOrderItemsData[i].goodsId === giftDtos[m].goodsId) {
											giftDtos[m].promWay = 1;
											saleOrderItemsData[i].orderPromRels =
												giftProms[j].giftDtos;
										}
									}
									// saleOrderItemsData[i].goodsId
								} else
									if (saleOrderItemsData[i].goodsId == giftProms[j].optGoodsId) {
										saleOrderItemsData[i].reqOrderPromRels =
											giftProms[j].giftDtos;
										saleOrderItemsData[i].orderPromRels = giftProms[j].giftDtos;
									}
							}
						}
					}
					// 满减信息，需挂载到对应的表体上
					var reqOrderPromRels = viewModel.reqOrderPromRels;
					if (reqOrderPromRels && reqOrderPromRels.length > 0) {
						for (var i = 0; i < saleOrderItemsData.length; i++) {
							for (var j = 0; j < reqOrderPromRels.length; j++) {
								if (saleOrderItemsData[i].goodsId == reqOrderPromRels[j].optGoodsId && /* saleOrderItemsData[i].rowNum == reqOrderPromRels[j].optRowNum && */ saleOrderItemsData[i].isGift != 1) {
									saleOrderItemsData[i].reqOrderPromRels = saleOrderItemsData[i].reqOrderPromRels || [];
									saleOrderItemsData[i].reqOrderPromRels.push(
										reqOrderPromRels[j]
									);
									if (viewModel.orderPriceProm) {
										var objProm = {
											activityId: viewModel.orderPriceProm.activityId,
											activityName: viewModel.orderPriceProm.activityName,
											description: viewModel.orderPriceProm.description,
											ruleId: viewModel.orderPriceProm.ruleId,
											ruleName: viewModel.orderPriceProm.ruleName,
											ruleCode: viewModel.orderPriceProm.ruleCode,
											dr: 0,
											persistStatus: "new",
											combineType: null,
											creationTime: null,
											creator: null,
											giftId: null,
											goodCombineNum: null,
											id: null,
											isWhole: null,
											matchId: null,
											modifiedTime: null,
											modifier: null,
											oldValue: null,
											optGoodsId: null,
											promWay: 2,
											promptMessage: null,
											reqOrderId: null,
											reqOrderItemId: null,
											ruleDescripe: null
										}
										saleOrderItemsData[i].reqOrderPromRels.push(objProm);
									}
									saleOrderItemsData[i].orderPromRels = saleOrderItemsData[i].reqOrderPromRels;
								}
							}
						}
					}

					if (index >= 0) {
						for (var i = 0; i < batchSaleOrderBomItems.length; i++) {
							// 防止字段丢失
							batchSaleOrderBomItems[i].isGift = batchSaleOrderBomItems[i].isGift || 0;
							if (!batchSaleOrderBomItems[i].id) {
								if (batchSaleOrderBomItems[i].dr == 1) {
									batchSaleOrderBomItems.remove(batchSaleOrderBomItems.indexOf(batchSaleOrderBomItems[i]));
									i--;
								} else {
									batchSaleOrderBomItems[i].persistStatus = 'new';
								}
							}
						}
						for (var i = 0; i < saleOrderItemsData.length; i++) {
							if (!saleOrderItemsData[i].id) {
								if (saleOrderItemsData[i].dr == 1) {
									saleOrderItemsData.remove(saleOrderItemsData.indexOf(saleOrderItemsData[i]));
									i--;
								} else {
									saleOrderItemsData[i].persistStatus = 'new';
									saleOrderItemsData[i].currencyId = viewModel.CURRENCY.id;
									saleOrderItemsData[i].currencyName = viewModel.CURRENCY.name;
									saleOrderItemsData[i].currencyCode = viewModel.CURRENCY.code;
									saleOrderItemsData[i].currencySign = viewModel.CURRENCY.currencySign;
									saleOrderItemsData[i].currencyPriceScale = viewModel.CURRENCY.currencyPriceScale;
								}
							}
						}
					} else {
						for (var i = 0; i < batchSaleOrderBomItems.length; i++) {
							batchSaleOrderBomItems[i].isGift = batchSaleOrderBomItems[i].isGift || 0;
							if (batchSaleOrderBomItems[i].persistStatus == 'fdel') {
								batchSaleOrderBomItems.remove(batchSaleOrderBomItems.indexOf(batchSaleOrderBomItems[i]));
								i--;
							} else {
								batchSaleOrderBomItems[i].persistStatus = 'new'
							}
						}
						for (var i = 0; i < saleOrderItemsData.length; i++) {
							if (saleOrderItemsData[i].persistStatus == 'fdel') {
								saleOrderItemsData.remove(saleOrderItemsData.indexOf(saleOrderItemsData[i]));
								i--;
							} else {
								saleOrderItemsData[i].persistStatus = 'new';
								saleOrderItemsData[i].currencyId = viewModel.CURRENCY.id;
								saleOrderItemsData[i].currencyName = viewModel.CURRENCY.name;
								saleOrderItemsData[i].currencyCode = viewModel.CURRENCY.code;
								saleOrderItemsData[i].currencySign = viewModel.CURRENCY.currencySign;
								saleOrderItemsData[i].currencyPriceScale = viewModel.CURRENCY.currencyPriceScale;
							}
						}
						salesorderData.currencyId = viewModel.CURRENCY.id;
						salesorderData.currencyName = viewModel.CURRENCY.name;
						salesorderData.currencyCode = viewModel.CURRENCY.code;
						salesorderData.currencySign = viewModel.CURRENCY.currencySign;
						salesorderData.currencyPriceScale =
							viewModel.CURRENCY.currencyPriceScale;
					}
					// var orderType = $("#refContainersalesorderCard_orderTypeId").data("uui.refer").values;
					var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

					for (var i = 0; i < saleOrderItemsData.length; i++) {
						//清除促销信息
						saleOrderItemsData[i].promotinId = '';
						saleOrderItemsData[i].promotinName = '';
						saleOrderItemsData[i].ts = "";
						saleOrderItemsData[i].creationTime = "";
						saleOrderItemsData[i].modifiedTime = "";
						const orderItem = saleOrderItemsData[i];
						if (orderItem.isGift == 1 || "03" == orderType[0].saleModelCode || orderItem.goodsSupplement == 1) {
							orderItem.dealPrice = 0;
						}
						// 给bom赋值 库存组织、仓库、财务组织
						var parentGoodsId = saleOrderItemsData[i].goodsId;
						var parentRowNum = saleOrderItemsData[i].rowNum;
						for (var j = 0; j < batchSaleOrderBomItems.length; j++) {
							batchSaleOrderBomItems[j].goodsName = batchSaleOrderBomItems[j].childGoodsName;
							batchSaleOrderBomItems[j].ts = "";
							batchSaleOrderBomItems[j].creationTime = "";
							batchSaleOrderBomItems[j].modifiedTime = "";
							if (batchSaleOrderBomItems[j].parentGoodsId === parentGoodsId && batchSaleOrderBomItems[j].goodsId !== parentGoodsId && batchSaleOrderBomItems[j].parentRowNum == parentRowNum) {
								batchSaleOrderBomItems[j].deliveryInvOrgId = saleOrderItemsData[i].deliveryInvOrgId;
								batchSaleOrderBomItems[j].deliveryWarehouseId = saleOrderItemsData[i].deliveryWarehouseId;
								batchSaleOrderBomItems[j].settleFinancialOrgId = saleOrderItemsData[i].settleFinancialOrgId;
							} else {
								if (batchSaleOrderBomItems[j].goodsId === parentGoodsId && batchSaleOrderBomItems[j].parentRowNum == parentRowNum) {
									batchSaleOrderBomItems[j].deliveryInvOrgId = saleOrderItemsData[i].deliveryInvOrgId;
									batchSaleOrderBomItems[j].deliveryWarehouseId = saleOrderItemsData[i].deliveryWarehouseId;
									batchSaleOrderBomItems[j].settleFinancialOrgId = saleOrderItemsData[i].settleFinancialOrgId;
								}
							}
						}
					}
					salesorderData.orderItems = saleOrderItemsData;
					salesorderData.orderItemBoms = batchSaleOrderBomItems;
					salesorderData.orderAttachments = viewModel.orderAttachments;
					var setNewPersistStatusFn = function (value) {
						if (
							salesorderData.orderInvoice &&
							salesorderData.orderInvoice.persistStatus
						) {
							salesorderData.orderInvoice.persistStatus = value;
						}
						if (salesorderData.orderReceiveAddress) salesorderData.orderReceiveAddress.persistStatus = value;
						salesorderData.persistStatus = value;
						salesorderData.orderItems.forEach(function (data) {
							var status = data.id ? value : 'new';
							status = data.dr == 1 ? "fdel" : status;
							data.persistStatus = status;
							if (data.isGift != 1) {
								data.isGift = data.goodsSupplement == 1 ? 1 : data.isGift;
							}
							// 清空商品描述字段，防止描述里包含中文符号
							data.description = "";
						});
						salesorderData.orderItemBoms.forEach(function (data) {
							var status = data.id ? value : 'new';
							status = data.dr == 1 ? "fdel" : status;
							data.persistStatus = status;
							if (data.isGift != 1) {
								data.isGift = data.goodsSupplement == 1 ? 1 : data.isGift;
							}
							// 清空商品描述字段，防止描述里包含中文符号
							data.description = "";
						});
					};
					var _ajaxUrl = "/create-order";
					if (index >= 0) {
						_ajaxUrl = "/update-order";
					}

					if (_ajaxUrl == "/create-order") {
						setNewPersistStatusFn("new");
					} else if (_ajaxUrl == "/update-order") {
						setNewPersistStatusFn("upd");
					}
					viewModel.salesorderData = salesorderData;
					salesorderData.billTypeId = 'SaleOrder';
					salesorderData.orderSource = "02";
					/*
					 * 需求变更 20180927
					 * 用户在保存销售订单之前需要先校验信用和账单
					 * 通过：返回值中无内容
					 * 不通过：返回值中有内容，并且执行严格控制
					 *   只要有一个的返回值中控制类型creditCtrlCode是严格控制，则进行严格控制，保存失败，提示失败
					 *   所有的返回值中控制类型都是提示，则显示弹出框(继续，取消)，选择继续则进行保存
					 **/
					$._ajax({
						url: appCtx + viewModel.baseurl + "/checkSave",
						type: "post",
						data: JSON.stringify(salesorderData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							debugger
							viewModel.accountCheck = data.account;
							viewModel.creditCheck = data.credit; // 信用
							viewModel.allCarCheck = data.truck; // 满车
							viewModel.allTrayCheck = data.tray; // 满托
							viewModel.moq = data.moq; // 起订量
							viewModel.stock = data.stock; // 可用量
							//ok按钮文字
							if ((viewModel.allCarCheck != undefined && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck != undefined && viewModel.allTrayCheck.length > 0) || (viewModel.moq != undefined && viewModel.moq.length > 0) || (viewModel.stock && viewModel.stock.length > 0)) {
								$("#checkOk1")[0].innerHTML = "下一步";
								$("#checkOk2")[0].innerHTML = "下一步";
								$("#checkOk3")[0].innerHTML = "保存";
							} else if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
								$("#checkOk1")[0].innerHTML = "下一步";
								$("#checkOk2")[0].innerHTML = "保存";
							} else if (viewModel.accountCheck != undefined && viewModel.accountCheck.length > 0) {
								$("#checkOk1")[0].innerHTML = "保存";
							}

							debugger
							if (viewModel.accountCheck != undefined && viewModel.accountCheck.length > 0) {
								checkAccount()
							} else if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
								checkCredit()
							} else if ((viewModel.allCarCheck != undefined && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck != undefined && viewModel.allTrayCheck.length > 0) || (viewModel.moq != undefined && viewModel.moq.length > 0) || (viewModel.stock && viewModel.stock.length > 0)) {
								checkFill()
							} else {
								saveReal();
							}
						}
					});
				}
				//保存时账期弹框
				function checkAccount() {
					var accountCheck = viewModel.accountCheck;
					if (!viewModel.dialogSaveBilldialog) {

						//账期弹框
						viewModel.dialogSaveBilldialog = u.dialog({
							id: "dialog_save_bill",
							content: "#dialog_save_bill",
							hasCloseMenu: true,
							width: "1000px"
						});
					} else {
						viewModel.dialogSaveBilldialog.show();
					}
					viewModel.saveCheckAccountDetailItems.setSimpleData(accountCheck);
					var okButton = $("#dialog_save_bill .J-ok");
					okButton.off().on("click", function () {
						// saveReal();

						viewModel.dialogSaveBilldialog.close();
						if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
							checkCredit()
						} else if ((viewModel.allCarCheck != undefined && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck != undefined && viewModel.allTrayCheck.length > 0) || (viewModel.moq != undefined && viewModel.moq.length > 0) || (viewModel.stock && viewModel.stock.length > 0)) {
							checkFill()
						} else {
							saveReal();
						}
					})
					var cancelButton = $("#dialog_save_bill .J-cancel");
					cancelButton.off().on("click", function () {
						viewModel.dialogSaveBilldialog.close();
					});

				}
				//保存时信用弹框
				function checkCredit() {
					var creditCheck = viewModel.creditCheck;
					if (!viewModel.dialogSaveBilldialog2 && creditCheck != undefined && creditCheck.length > 0) {

						viewModel.dialogSaveBilldialog2 = u.dialog({
							id: "dialog_save_bill2",
							content: "#dialog_save_bill2",
							hasCloseMenu: true,
							width: "1000px"
						});
					} else {
						viewModel.dialogSaveBilldialog2.show();
					}
					viewModel.saveCheckCreditDetailItems.setSimpleData(creditCheck)
					var okButton2 = $("#dialog_save_bill2 .J-ok");
					okButton2.off().on("click", function () {
						// saveReal();

						viewModel.dialogSaveBilldialog2.close();
						if ((viewModel.allCarCheck != undefined && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck != undefined && viewModel.allTrayCheck.length > 0) || (viewModel.moq != undefined && viewModel.moq.length > 0) || (viewModel.stock && viewModel.stock.length > 0)) {
							checkFill()
						} else {
							saveReal();
						}
					})
					var cancelButton2 = $("#dialog_save_bill2 .J-cancel");
					cancelButton2.off().on("click", function () {
						viewModel.dialogSaveBilldialog2.close();
					});
					viewModel.dialogSaveBilldialog2.show();
				}

				//保存时满车满托弹框
				function checkFill() {
					var allCarCheck = viewModel.allCarCheck;
					var allTrayCheck = viewModel.allTrayCheck
					//满车满托弹框
					if (!viewModel.dialogSaveBilldialog3) {
						viewModel.dialogSaveBilldialog3 = u.dialog({
							id: "dialog_save_bill3",
							content: "#dialog_save_bill3",
							hasCloseMenu: true,
							width: "1000px"
						});
					} else {
						viewModel.dialogSaveBilldialog3.show();
					}
					if (viewModel.moq != undefined && viewModel.moq.length > 0) {
						$("#checkContent1").show();
						var str3_1 = "<div>";
						var moqList = viewModel.moq.split("#");
						moqList.forEach(function (item) {
							str3_1 += "<p style='margin-bottom: 5px'>" + item + "</p>"
						});
						// str3_1 += viewModel.moq;
						str3_1 += "</div>";
						$("#bill3_1")[0].innerHTML = str3_1;
						if ((viewModel.stock && viewModel.stock.length > 0) || (viewModel.allCarCheck && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck && viewModel.allTrayCheck.length > 0)) {

						} else {
							$("#bill3_1").css("border-bottom", "none");
						}
					} else {
						$("#checkContent1").hide();
					}
					if (viewModel.stock && viewModel.stock.length > 0) {
						$("#checkContent_stock").show();
						var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
						var temp = "<div style='padding-left: 20px'>" +
							viewModel.stock.map(function (item) {
								var unitList = "",
									precision = 0;
								if (_A_P_unit && _A_P_unit.length > 0) {
									unitList = _A_P_unit.filter(function (r) {
										return r.unitId == item.unit;
									});
								}
								if (unitList && unitList.length > 0) {
									precision = unitList[0].precision;
								}
								var willAmount = new u.NumberFormater(precision).format(parseFloat(item.willAmount));
								var avaAmount = new u.NumberFormater(precision).format(parseFloat(item.avaAmount));
								var html = "<div style='margin-top: 10px'>行号：" + item.rowNum + "，商品：" + item.goodsName + "可用量不足，本次需要 " + willAmount + "，当前可用 " + avaAmount + "</div>";
								return html
							}).join('') +
							"</div>";
						$("#bill_stock")[0].innerHTML = temp;
						if ((viewModel.allCarCheck && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck && viewModel.allTrayCheck.length > 0)) {

						} else {
							$("#bill_stock").css("border-bottom", "none");
						}
					} else {
						$("#checkContent_stock").hide();
					}
					if (viewModel.allCarCheck != undefined && viewModel.allCarCheck.length > 0) {
						$("#checkContent2").show();
						var allCarList = [];
						var str3_2 = "<div>";
						for (var k = 0; k < allCarCheck.length; k++) {
							str3_2 += allCarCheck[k].message;
							if (allCarCheck[k].truckQueryResultDtoList != undefined && allCarCheck[k].truckQueryResultDtoList.length > 0) {
								for (var a = 0; a < allCarCheck[k].truckQueryResultDtoList.length; a++) {
									allCarCheck[k].truckQueryResultDtoList[a].enough = allCarCheck[k].truckQueryResultDtoList[a].enough == true ? "是" : "否"
									allCarCheck[k].truckQueryResultDtoList[a].truckNum = allCarCheck[k].truckQueryResultDtoList[a].truckNum + '辆';
									allCarList.push(allCarCheck[k].truckQueryResultDtoList[a]);
								}
							}
						}
						str3_2 += "</div>";
						viewModel.saveFilledCarDetailItems.setSimpleData(allCarList)
						$("#bill3_2")[0].innerHTML = str3_2;
						if (viewModel.allTrayCheck && viewModel.allTrayCheck.length > 0) {

						} else {
							$("#bill3_2").parent().css("border-bottom", "none");
						}
					} else {
						$("#checkContent2").hide();
					}

					if (viewModel.allTrayCheck != undefined && viewModel.allTrayCheck.length > 0) {
						$("#checkContent3").show();
						var allTrayList = [];
						for (var k = 0; k < allTrayCheck.length; k++) {
							var allTrayObj = {};
							allTrayObj.goodsName = allTrayCheck[k].goodsName;
							if (allTrayCheck[k].enough == true) {
								allTrayObj.enough = "是";
							} else {
								allTrayObj.enough = "否";
							}

							//未设置托型
							if (allTrayCheck[k].filledTrayRuleDto == undefined) {
								continue;
							}
							var dimension = allTrayCheck[k].filledTrayRuleDto.dimension;
							switch (dimension) {
								case 1:
									allTrayObj.orderNum = allTrayCheck[k].orderNum;
									allTrayObj.fillNum = allTrayCheck[k].filledTrayRuleDto.goodsNumber;
									break;
								case 2:
									allTrayObj.orderNum = allTrayCheck[k].orderVolume + allTrayCheck[k].orderVolumeUnitName;
									allTrayObj.fillNum = allTrayCheck[k].filledTrayRuleDto.maxVolume + allTrayCheck[k].orderVolumeUnitName;
									break;
								case 3:
									allTrayObj.orderNum = allTrayCheck[k].orderWeight + allTrayCheck[k].orderWeightUnitName;
									allTrayObj.fillNum = allTrayCheck[k].filledTrayRuleDto.maxWeight + allTrayCheck[k].orderWeightUnitName;
									break;
							}
							allTrayList.push(allTrayObj)
						}
						if (allTrayList.length > 0) {
							viewModel.saveFilledTrayDetailItems.setSimpleData(allTrayList);
						} else {
							$("#checkContent3").hide();
						}
					} else {
						$("#checkContent3").hide();
					}



					var okButton3 = $("#dialog_save_bill3 .J-ok");
					okButton3.off().on("click", function () {
						saveReal();
						viewModel.dialogSaveBilldialog3.close();
					})
					var cancelButton3 = $("#dialog_save_bill3 .J-cancel");
					cancelButton3.off().on("click", function () {
						viewModel.dialogSaveBilldialog3.close();
					});
					viewModel.dialogSaveBilldialog3.show();

				}

				/*
				 * 保存
				 * */
				function saveReal() {
					viewModel.saveCheckAccountDetailItems.removeAllRows();
					viewModel.saveCheckCreditDetailItems.removeAllRows();
					viewModel.saveFilledCarDetailItems.removeAllRows();
					viewModel.saveFilledTrayDetailItems.removeAllRows();
					var salesorderData = viewModel.salesorderData;
					salesorderData.id =
						viewModel.salesorderCard.getSimpleData()[0].id ||
						viewModel.newsalesorderCardId;
					salesorderData.billTypeId = 'SaleOrder';
					salesorderData.orderSource = "02";
					$._ajax({
						url: appCtx + viewModel.baseurl + _ajaxUrl,
						type: "post",
						data: JSON.stringify(salesorderData),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							if (index >= 0) {
								currentRow = viewModel.salesorderList.getRowByRowId(
									viewModel.rowId
								);
							} else {
								currentRow = viewModel.salesorderList.createEmptyRow();
							}
							currentRow.setSimpleData(data);
							toastr.success("保存成功");
							viewModel.retListPanel();
							viewModel.search();
						}
					});
				}
			},
			// 校验单据合法性
			validateBill: function () {
				var result = this.app.compsValidateMultiParam({
					element: $("#salesorder-operatepanel")[0],
					showMsg: true
				});
				// 编辑时不校验主表字段
				if (
					result.passed ||
					CONST.BILLPANELSTATUS.EDIT == viewModel.billPanelStatus()
				) {
					var rows = viewModel.saleOrderItems.getAllRealRows();
					if (rows && rows.length > 0) {
						var errmsg = "";
						for (var i = 0; i < rows.length; i++) {
							var temperrmsg = "";
							if (rows[i].getValue("dr") != 1) {
								// 数量校验
								if (
									rows[i].getValue("orderNum") == null ||
									rows[i].getValue("orderNum") == ""
								) {
									temperrmsg += " <span style='color:red'>请录入数量</span> ";
								} else {
									var quantity = parseFloat(rows[i].getValue("orderNum"));
									if (quantity <= 0 && rows[i].getValue("isGift") == 0) {
										temperrmsg +=
											" <span style='color:red'>的数量必须大于0</span> ";
									}
								}
								// 价格校验
								// var orderType = $("#refContainersalesorderCard_orderTypeId").data("uui.refer").values;
								var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

								if (
									(!rows[i].getValue("salePrice") ||
										!rows[i].getValue("dealPrice")) &&
									rows[i].getValue("isGift") == 0 &&
									"03" != orderType[0].saleModelCode && rows[i].getValue("goodsSupplement") == 0
								) {
									temperrmsg +=
										" <span style='color:red'>价格不能为空或者0</span> ";
								}
								if (temperrmsg) {
									temperrmsg =
										"行号为：" +
										rows[i].getValue("rowNum") +
										" 销售产品为：" +
										// rows[i].getValue("goodsName") +
										rows[i].getValue("refrel_goodsId_name") +
										temperrmsg +
										"<br/>";
									errmsg += temperrmsg;
								}
							}
						}
						if (errmsg) {
							errmsg = "保存失败，请检查<br/>" + errmsg;
							toastr.error(errmsg);
							return false;
						}
					} else {
						toastr.warning("至少添加一个产品");
						return false;
					}
				} else {
					toastr.warning("必填项不能为空");
					return false;
				}
				return true;
			},
			//取消单据编辑
			cancelBill: function () {
				if (viewModel.billPanelStatusCheck() == 0) {
					if (!viewModel.checkupdstatus()) {
						common.dialog.confirmDialog({
							msg1: "当前订单已修改,尚未保存",
							msg2: "是否返回列表",
							width: "400px",
							onOk: function () {
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
			// 查询单据编辑状态
			checkupdstatus: function () {
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
			// 操作订单前，检查订单状态是否正确
			checkStatus: function (rows, checker, andCode) {
				var msg = "";
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					var orderStatusCode = row.getValue("orderStatusCode");
					if (andCode) {
						if (
							orderStatusCode == checker.needCode ||
							orderStatusCode == andCode
						) { } else {
							msg += "[" + row.getValue("orderCode") + "]、";
						}
					} else {
						if (orderStatusCode !== checker.needCode) {
							msg += "[" + row.getValue("orderCode") + "]、";
						}
					}
				}
				if (msg.length > 0) {
					msg = msg.substr(0, msg.length - 1);
					checker.errmsg(msg);
					return false;
				}
				return true;
			},
			//提交单据
			submitBill: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.SUBMIT)) {
						viewModel.batch_ajax("/submit-order", curRow);
					}
				}, 0);
			},
			//收回单据
			unsubmitBill: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.UNSUBMIT)) {
						viewModel.batch_ajax("/cancel-submit-order", curRow);
					}
				}, 0);
			},
			/**
			 * @example 提审批流
			 */
			// 审批流程的相关按钮点击事件 - start
			// 提交申请单
			submitBillList: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length < 1) {
					toastr.warning("请选择至少一项进行提交");
					return;
				}
				var ids = [];
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				var checkData = {
					// ids: rows[0].getValue('id'),
					ids: ids.join(','),
					itemId: '',
					orderEvent: "commit"
				}
				viewModel.checkSaleOrderSave(checkData, function () {
					viewModel.submitBillBpm(rows);
				});
			},
			submitBillBpm: function (rows) {
				var listCompId = "salesorderList";
				var billTypeCode = "SaleOrder";
				var tranTypeCode = rows[0].getValue("orderTypeCode");
				var nodeJs = "/ocm-web/pages/b2b/salesorder/salesorder.js";
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, function () {
					var selectIndex = [];
					selectIndex.push(viewModel.salesorderList.getSelectedIndex());
					viewModel.search(false, function () {
						setTimeout(function () {
							viewModel.salesorderList.setRowsSelect(selectIndex);
						}, 0)
					});
				});
			},
			findUnique: function (cb, selectedData) {
				$._ajax({
					url: viewModel.billFlowConfigUrl + "/find-unique",
					type: "get",
					data: {
						billTypeCode: "SaleOrder",
						tranTypeCode: selectedData[0].orderTypeCode
					},
					contentType: "application/json; charset=utf-8",
					success: function (billFlowConfig) {
						// if (!billFlowConfig) {
						//     toastr.error("尚未为销售订单的单据类型配置审批流程。");
						//     return;
						// }
						var processDefineCode = billFlowConfig.actProcModelCode;
						cb(processDefineCode, selectedData);
					}
				});
			},
			submitBPMByProcessDefineCode: function (processDefineCode, selectedData) {
				var nodeJs = "/ocm-web/pages/b2b/salesorder/salesorder.js";
				if (processDefineCode) {
					var url =
						appCtx +
						viewModel.baseurl +
						"/submit?processDefineCode=" +
						processDefineCode +
						"&nodeJs=" +
						nodeJs;
					$.ajax({
						type: "post",
						url: url,
						contentType: "application/json;charset=utf-8",
						data: JSON.stringify(selectedData),
						success: function (res) {
							if (res) {
								if (res.success == "success") {
									toastr.success();
									var selectIndex = [];
									selectIndex.push(viewModel.salesorderList.getSelectedIndex());
									viewModel.search(false, function () {
										setTimeout(function () {
											viewModel.salesorderList.setRowsSelect(selectIndex);
										}, 0)
									});
								} else {
									toastr.error(res.message);
								}
							} else {
								toastr.error("无返回数据");
							}
						}
					});
				} else {
					var rows = viewModel.salesorderList.getSelectedRows();
					viewModel.batch_ajax("/submit-order", rows);
				}
			},
			// 收回申请单
			unsubmitBillList: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				// if (!rows || rows.length != 1) {
				// 	toastr.warning("请选择一项进行收回");
				// 	return;
				// }
				if (!rows || rows.length < 1) {
					toastr.warning("请选择至少一项进行收回");
					return;
				}
				var listCompId = "salesorderList";
				var billTypeCode = "SaleOrder";
				var tranTypeCode = rows[0].getValue("orderTypeCode");
				var callback = null;
				viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
			},
			// 审批流程的相关按钮点击事件 - end
			//审核单据
			approveBill: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.APPROVE)) {
						viewModel.batch_ajax("/approve-order", curRow);
					}
				}, 0);
			},
			//弃审单据
			unapproveBill: function () {
				//确保grid先将行设置为focus状态
				setTimeout(function () {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.UNAPPROVE)) {
						viewModel.batch_ajax("/cancel-approve-order", curRow);
					}
				}, 0);
			},
			approveBillList: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length < 1) {
					toastr.warning("请选择至少一条数据进行审批");
					return;
				}
				var ids = [];
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				var checkData = {
					ids: ids.join(','),
					itemId: '',
					orderEvent: "approvepass"
				}
				viewModel.checkSaleOrderSave(checkData, function () {
					var listCompId = "salesorderList";
					var billTypeCode = "SaleOrder";
					var tranTypeCode = rows[0].getValue("orderTypeCode");
					var withBpmCallback = function () {
						viewModel.detail();
					};
					viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, function () {
						var selectIndex = [];
						selectIndex.push(viewModel.salesorderList.getSelectedIndex());
						viewModel.search(false, function () {
							setTimeout(function () {
								viewModel.salesorderList.setRowsSelect(selectIndex);
							}, 0)
						});
					});
				});
			},
			//弃审单据
			unapproveBillList: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length < 1) {
					toastr.warning("请选择至少一项进行取消审批");
					return;
				}
				var listCompId = "salesorderList";
				var billTypeCode = "SaleOrder";
				var tranTypeCode = rows[0].getValue("orderTypeCode");
				var withBpmCallback = function () {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback, "/cancelApproveWithoutBpmToSubmit");
			},
			// 驳回
			rejectBillPanel: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.REJECT)) {
					if (rows && rows.length > 0) {
						viewModel.batch_ajax("/reject-order", rows, "驳回");
					} else {
						toastr.warning("请至少选择一项");
					}
				}
			},
			// 订单推发货单
			pushOrderBillPanel: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.PUSH)) {
					if (rows && rows.length > 0) {
						viewModel.batch_ajax("/push-order", rows, "推单");
					} else {
						toastr.warning("请至少选择一项");
					}
				}
			},
			// 整单关闭订单
			closeOrderBillPanel: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length > 0) {
					var erro = false;
					var orderCode = "";
					for (var i = 0; i < rows.length; i++) {
						var orderStatusCode = rows[i].getValue("orderStatusCode");
						if (orderStatusCode == "08" || orderStatusCode == "07" || orderStatusCode == "04") {

						} else {
							erro = true;
							orderCode += rows[i].getValue("orderCode") + '、';
						}
					}
					if (erro) {
						toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是审批通过状态、出库状态，不能关闭");
						return;
					}
					viewModel.batch_ajax("/close-order", rows, "关闭");
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 整单打开订单
			openOrderBillPanel: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length > 0) {
					var erro = false;
					var orderCode = "";
					var ids = [];
					for (var i = 0; i < rows.length; i++) {
						var isClose = rows[i].getValue("isClose");
						if (isClose != 1) {
							erro = true;
							orderCode += rows[i].getValue("orderCode") + '、';
						}
						ids.push(rows[i].getValue("id"));
					}
					if (erro) {
						toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是关闭状态，不能打开");
						return;
					}
					var checkData = {
						ids: ids.join(','),
						itemId: '',
						orderEvent: "open"
					}
					viewModel.checkSaleOrderSave(checkData, function () {
						viewModel.batch_ajax("/open-order", rows, "打开");
					})
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 整单发货关闭
			deCloseOrderBillPanel: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length > 0) {
					var erro = false;
					var orderCode = "";
					for (var i = 0; i < rows.length; i++) {
						var orderStatusCode = rows[i].getValue("orderStatusCode");
						if (orderStatusCode == "08" || orderStatusCode == "07" || orderStatusCode == "04") {

						} else {
							erro = true;
							orderCode += rows[i].getValue("orderCode") + '、';
						}
					}
					if (erro) {
						toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是审批通过状态、出库状态，不能关闭");
						return;
					}
					viewModel.batch_ajax("/close-order-delivery", rows, "关闭");
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 整单发货打开
			deOpenOrderBillPanel: function () {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length > 0) {
					var erro = false;
					var orderCode = "";
					var ids = [];
					for (var i = 0; i < rows.length; i++) {
						var isClose = rows[i].getValue("isDeClose");
						if (isClose != 1) {
							erro = true;
							orderCode += rows[i].getValue("orderCode") + '、';
						}
						ids.push(rows[i].getValue("id"));
					}
					if (erro) {
						toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是关闭状态，不能打开");
						return;
					}
					var checkData = {
						ids: ids.join(','),
						itemId: '',
						orderEvent: "open"
					}
					viewModel.checkSaleOrderSave(checkData, function () {
						viewModel.batch_ajax("/open-order-delivery", rows, "打开");
					})
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 行关闭
			close_row: function () {
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderStatusCode = viewModel.salesorderDetailCard.getValue("orderStatusCode");
					if (orderStatusCode == "08" || orderStatusCode == "07" || orderStatusCode == "04") {
						viewModel.item_rows_ajax("/close-order-item", rows, function (data) {
							rows.forEach(function (item) {
								item.setValue('isClose', 1);
								item.setValue('isDeClose', 1);
							})
						});
					} else {
						toastr.warning("单据号为：" + viewModel.salesorderDetailCard.getValue("orderCode") + " 的订单不是审批通过状态、出库状态，不能关闭");
						return;
					}
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 行打开
			open_row: function () {
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderStatusCode = viewModel.salesorderDetailCard.getValue("orderStatusCode");
					if (orderStatusCode == "08" || orderStatusCode == "07" || orderStatusCode == "04") {
						var ids = [];
						for (var i = 0; i < rows.length; i++) {
							ids.push(rows[i].getValue("id"));
						}
						var checkData = {
							ids: viewModel.salesorderDetailCard.getValue("id"),
							itemId: ids.join(','),
							orderEvent: "rowopen"
						}
						viewModel.checkSaleOrderSave(checkData, function () {
							viewModel.item_rows_ajax("/open-order-item", rows, function (data) {
								rows.forEach(function (item) {
									item.setValue('isClose', 0);
								})
							});
						})
					} else {
						toastr.warning("单据号为：" + viewModel.salesorderDetailCard.getValue("orderCode") + " 的订单不是审批通过状态、出库状态，不能打开");
						return;
					}
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 行发货关闭
			deClose_row: function () {
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderStatusCode = viewModel.salesorderDetailCard.getValue("orderStatusCode");
					if (orderStatusCode == "08" || orderStatusCode == "07" || orderStatusCode == "04") {
						viewModel.item_rows_ajax("/close-order-item-delivery", rows, function (data) {
							rows.forEach(function (item) {
								item.setValue('isDeClose', 1);
							})
						});
					} else {
						toastr.warning("单据号为：" + viewModel.salesorderDetailCard.getValue("orderCode") + " 的订单不是审批通过状态、出库状态，不能关闭");
						return;
					}
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 行发货打开
			deOpen_row: function () {
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (rows && rows.length > 0) {
					var orderStatusCode = viewModel.salesorderDetailCard.getValue("orderStatusCode");
					if (orderStatusCode == "08" || orderStatusCode == "07" || orderStatusCode == "04") {
						viewModel.item_rows_ajax("/open-order-item-delivery", rows, function (data) {
							rows.forEach(function (item) {
								item.setValue('isDeClose', 0);
							})
						});
					} else {
						toastr.warning("单据号为：" + viewModel.salesorderDetailCard.getValue("orderCode") + " 的订单不是审批通过状态、出库状态，不能打开");
						return;
					}
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			item_rows_ajax: function (url, rows, callback) {
				var ids = [];
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + url,
					type: "post",
					data: {
						itemId: ids.join(","),
					},
					success: function (data) {
						var success = true,
							errmsg = "";
						if (data && data.length > 0) {
							for (var i = 0; i < data.length; i++) {
								if (data[i].code == "0") {
									errmsg += "单号为：" + data[i].content + " 操作失败,原因为：" + data[i].message + "<br/>";
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
							toastr.success(message);
						}
					}
				})
			},
			// 打开 and 关闭
			batch_ajax: function (url, rows, remark, callback) {
				var ids = [];
				for (var i = 0; i < rows.length; i++) {
					ids.push(rows[i].getValue("id"));
				}
				$._ajax({
					url: appCtx + viewModel.baseurl + url,
					type: "post",
					data: {
						id: ids.join(","),
						remark: remark
					},
					success: function (data) {
						var success = true,
							errmsg = "";
						if (data && data.length > 0) {
							for (var i = 0; i < data.length; i++) {
								if (data[i].code == "0") {
									errmsg += "单号为：" + data[i].content + " 操作失败,原因为：" + data[i].message + "<br/>";
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
							var selectIndex = [];
							selectIndex.push(viewModel.salesorderList.getSelectedIndex());
							toastr.success(message);
							if (url == "/submit-order") {
								viewModel.search(false, function () {
									setTimeout(function () {
										viewModel.salesorderList.setRowsSelect(selectIndex);
									}, 0)
								});
							} else {
								viewModel.search();
							}
						}
					}
				});
			},
			// 询促销 促销匹配
			searchprom: function () {
				// 已做过促销或冲抵，则直接返回
				if (viewModel.validIfPromOrOffset()) {
					return;
				}
				var result = viewModel.validateBill();
				if (!result) {
					return;
				}
				var customerId = viewModel.salesorderCard.getValue("customerId");
				var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
				var orderTypeId = viewModel.salesorderCard.getValue("orderTypeId"); // 订单类型
				var orderList = viewModel.saleOrderItems.getSimpleData();
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

				var orderItems = [];
				for (var i = 0; i < orderList.length; i++) {
					if (orderList[i].dr != 1 && orderList[i].isGift != 1 && orderList[i].goodsSupplement != 1) {
						orderList[i].salePrice = orderList[i].salePrice ? orderList[i].salePrice : 0;
						orderList[i].basePrice = orderList[i].basePrice ? orderList[i].basePrice : orderList[i].salePrice;
						orderItems.push(orderList[i]);
					}
				}
				if (!customerId) {
					toastr.warning("请先选择客户！");
					return false;
				}
				if (!saleOrgId) {
					toastr.warning("请先选择销售组织！");
					return false;
				}
				if (!orderTypeId) {
					toastr.warning("请先选择订单类型！");
					return false;
				}
				if (!orderItems || orderItems.length <= 0) {
					toastr.warning("“没有匹配到适用的促销政策”，订单可继续编辑");
					return false;
				}
				if (orderType && orderType[0].saleModelCode == "03") {
					toastr.warning("订单类型为货补订单不能进行促销匹配！");
					return;
				}
				var postdata = {
					customerId: customerId,
					saleOrgId: saleOrgId,
					isPrimaryChannel: 1,
					reqOrderItems: orderItems,
					tranType: orderTypeId
				};
				$._ajax({
					url: window.pathMap.b2b + "/b2b/prom/reqorder-prom",
					type: "post",
					contentType: "application/json;charset=UTF-8",
					data: JSON.stringify(postdata),
					success: function (res) {
						if (!res.mutualRelationShip) {
							toastr.warning("没有匹配到适用的促销政策”，订单可继续编辑");
							return;
						}
						if (res.mutualRelationShip.length > 1 || res.includeChooseGift) {
							viewModel.showProm(res, orderItems)
							return;
						}
						viewModel.promSuccess(res)
					}
				});
			},
			// 取消促销匹配
			closeSearchprom: function () {
				// 判断是否冲抵过
				if (viewModel.isCostFlush == 1) {
					toastr.warning("已经冲抵后不可再做此操作，如要操作，请先取消冲抵!");
					return;
				}
				if (viewModel.isSearchprom != 1) {
					toastr.warning("您还没有做过促销匹配，无法进行该操作!");
					return;
				}
				// 判断是否有促销前数据
				if (viewModel.SearchpromAfter && viewModel.SearchpromAfterBom) {
					viewModel.saleOrderItems.removeAllRows();
					viewModel.batchSaleOrderBomItems.removeAllRows();

					var itemRow = viewModel.saleOrderItems.getAllRealRows();
					var bomRow = viewModel.batchSaleOrderBomItems.getAllRealRows();
					itemRow.forEach(function (item) {
						item.setValue("dr", 1);
					});
					bomRow.forEach(function (item) {
						item.setValue("dr", 1);
					});
					viewModel.saleOrderItems.setSimpleData(viewModel.SearchpromAfter);
					viewModel.batchSaleOrderBomItems.setSimpleData(
						viewModel.SearchpromAfterBom
					);
				} else {
					var itemRows = viewModel.saleOrderItems.getAllRealRows();
					itemRows.forEach(function (item) {
						var amount = item.getValue("salePrice") * item.getValue("mainNum");
						item.setValue("dealPrice", item.getValue("salePrice"));
						item.setValue("promPrice", item.getValue("salePrice"));
						item.setValue("promotinId", "");
						item.setValue("promotinName", "");
						item.setValue("amount", amount);
						item.setValue("dealAmount", amount);
					})
					var giftPromRows = itemRows.filter(function (row) {
						return row.getValue("isGift") == 1 && (row.getValue("isPromGift") == 1 || row.getValue("promotinId"));
					});
					giftPromRows.forEach(function (row, index) {
						row.setValue("dr", "1");
						var goodsId = row.getValue("goodsId"),
							rowNum = row.getValue("rowNum"),
							allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
						allBomRows.forEach(function (item, index) {
							if (
								(item.getValue("parentGoodsId") === goodsId ||
									item.getValue("goodsId") === goodsId) &&
								item.getValue("parentRowNum") == rowNum
							) {
								item.setValue("dr", "1");
								viewModel.batchSaleOrderBomItems.removeRows(item);
							}
						});
					});
					viewModel.saleOrderItems.removeRows(giftPromRows);
				}
				viewModel.SearchpromAfter = '';
				viewModel.SearchpromAfterBom = '';
				viewModel.orderPriceProm = '';
				viewModel.giftProms = '';
				viewModel.reqOrderPromRels = '';

				viewModel.computeHeadDataInfo();
				viewModel.salesorderCard.setValue("promAmount", 0);
				viewModel.isSearchprom = 0;
				viewModel.costFreezeEvent(false);
			},
			// 费用冲抵
			costflushing: function () {
				// PTQDYGG-1662 销售订单已经做过费用冲抵，修改销售订单 再次做费用冲抵的时候，应该记录之前的冲抵情况，而不是可以再次冲抵判断是否冲抵过
				if (viewModel.isCostFlush == 1) {
					toastr.warning("已经冲抵后不可再做此操作，如要操作，请先取消冲抵!");
					return;
				}
				var result = viewModel.validateBill();
				if (!result) {
					return;
				}
				// 货补费用单类型  如果是
				// var costTypeId = viewModel.salesorderCard.getValue("costTypeId");
				// var orderType = $("#refContainersalesorderCard_orderTypeId").data("uui.refer").values;
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

				if (orderType && orderType[0].saleModelCode == "03") {
					toastr.warning("订单类型为货补订单不能进行费用冲抵！");
					return;
				}
				var customerId = viewModel.salesorderCard.getValue("customerId");
				var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
				var orderItems = viewModel.saleOrderItems.getSimpleData();
				var orderEnable = [];
				for (var i = 0; i < orderItems.length; i++) {
					if (orderItems[i].dr != 1) {
						orderEnable.push(orderItems[i]);
					}
				}

				if (!customerId) {
					toastr.warning("请先选择客户");
					return false;
				}
				if (!saleOrgId) {
					toastr.warning("请先选择销售组织");
					return false;
				}
				if (!orderEnable || orderEnable.length <= 0) {
					toastr.warning("请添加商品行");
					return false;
				}
				var settleFinancialOrgId = orderEnable[0].settleFinancialOrgId;
				for (var i = 1; i < orderEnable.length; i++) {
					if (settleFinancialOrgId != orderEnable[i].settleFinancialOrgId) {
						toastr.warning("结算财务组织必须一致，请重新选择！");
						return;
					}
				}
				viewModel.flushSelected = [];
				viewModel.costflushingdialog = u.dialog({
					id: "dialog_showCostflushing",
					content: "#dialog_showCostflushing",
					hasCloseMenu: true,
					width: "75%"
				});
				var postdata = {
					search_EQ_customer: customerId,
					search_EQ_saleOrg: saleOrgId,
					search_IN_billStatus: "04,06", // 04 已通过的费用单和部分冲抵
					search_EQ_castType: "flushOrder", // 默认传送冲抵订单类型
					search_IN_financeOrg: settleFinancialOrgId
				};
				$._ajax({
					url: window.pathMap.b2b + "/b2b/customer-cast/cast-rate",
					type: "get",
					contentType: "application/json;charset=UTF-8",
					data: {
						customerId: customerId,
						saleOrgId: saleOrgId
					},
					success: function (res) {
						var costF = "";
						for (var i = 0; i < res.length; i++) {
							if (res[i].financeOrgId == settleFinancialOrgId) {
								res[i].supplyMaxOccupyMny =
									viewModel.salesorderCard.getValue("totalDealAmount") *
									res[i].costOffsetRatio;
								costF = res[i];
							} else {
								if (!res || res.length == 0) {
									res = {
										costOffsetRatio: "",
										supplyMaxOccupyMny: 0
									};
								}
							}
						}
						viewModel.costFlushDetailCard.setSimpleData(costF);
					}
				});
				$._ajax({
					url: window.pathMap.fee + "/customer-casts/for-order",
					type: "get",
					data: postdata,
					success: function (res) {
						res.content.forEach(function (item) {
							item.actualFlushAmount = "";
						});
						viewModel.costFlushingEdit.setSimpleData(res.content);
					}
				});
				var closefunc = function () {
					viewModel.costFlushingEdit.removeAllRows();
					viewModel.costflushingdialog.close();
					viewModel.costflushingdialog = null;
				};
				var cancelButton = $("#dialog_showCostflushing .J-cancel");
				var confrimButton = $("#dialog_showCostflushing .J-ok");
				var closeButton = $("#dialog_showCostflushing .u-msg-close");
				cancelButton.off().on("click", closefunc);
				closeButton.off().on("click", closefunc);
				confrimButton.off().on("click", function () {
					var confrimData = viewModel.costFlushingEdit.getSimpleData();
					var costFlushDetailCard = viewModel.costFlushDetailCard.getSimpleData()[0];
					var flushAmount = 0;
					confrimData.forEach(function (item) {
						var newPush = {};
						newPush[item.id] = item.actualFlushAmount;
						viewModel.flushSelected.push(newPush);
						flushAmount += parseFloat(
							item.actualFlushAmount ? item.actualFlushAmount : 0
						);
					});
					if (flushAmount > costFlushDetailCard.supplyMaxOccupyMny) {
						toastr.warning("使用费用冲抵金额不能大于最大冲抵金额！");
						return;
					}
					if (flushAmount > 0) {
						viewModel.resetAmount(
							flushAmount,
							viewModel.costFlushDetailCard.getValue("costOffsetRatio"),
							closefunc
						);
					} else {
						toastr.warning("本次费用冲抵金额应大于0");
					}
				});
			},
			// 根据冲抵金额重新渲染商品行价格
			resetAmount: function (amout, costOffsetRatio, cb) {
				var orderItemsBom = viewModel.saleOrderItems.getAllRows();
				var saleOrderItem = viewModel.saleOrderItems.getSimpleData();
				var differenceAmount = 0;
				var orderEnable = [];
				for (var i = 0; i < saleOrderItem.length; i++) {
					if (saleOrderItem[i].dr != 1) {
						orderEnable.push(saleOrderItem[i]);
					}
				}
				differenceAmount = orderEnable[orderEnable.length - 1].dealAmount;
				var supplyMaxOccupyMny = amout;
				var totalAmount = 0;
				var totalDealAmount = 0;
				var costFulshAmount = 0; // 订单行总价格，用来计算没行兑付金额的比例
				orderEnable.forEach(function (item) {
					costFulshAmount += parseFloat(item.salePrice) * item.mainNum;
				});
				// 最大冲抵金额，=∑[min[(本次订单冲抵前金额合计*订单冲抵比例参数)，该订单可用的费用单余额合计]]
				var maxSupply =
					costFulshAmount * costOffsetRatio > amout ?
						amout :
						costFulshAmount * costOffsetRatio;
				for (var i = 0; i < orderEnable.length; i++) {
					var item = orderEnable[i];
					// 每行的总价 价格 * 数量， 没有减去促销后的价格
					var rowTotalAmount = parseFloat(item.salePrice) * item.mainNum;
					// 每笔订单可用的兑付金额
					var costAmount = maxSupply * (rowTotalAmount / costFulshAmount);
					// 判断冲抵金额 是否 大于 订单行金额， 大于则冲抵金额取订单行金额, 订单行价格可为0 但不能为负数，故此判断
					var rowAm = 0, // 行使用冲抵价格
						dealAmount = 0; // 总价
					if (costAmount >= rowTotalAmount) {
						rowAm = rowTotalAmount;
					} else {
						rowAm = costAmount;
						dealAmount = rowTotalAmount - rowAm;
					}
					totalAmount += parseFloat(rowAm);
					totalDealAmount += parseFloat(dealAmount);

					var dealPrice = dealAmount / item.mainNum;
					orderItemsBom[i].setValue("dealAmount", dealAmount); // 成交总价
					orderItemsBom[i].setValue("offsetAmount", rowAm); // 行使用冲抵价格
					orderItemsBom[i].setValue("dealPrice", dealPrice); // 成交价
				}
				// 费用冲抵金额
				viewModel.salesorderCard.setValue("offsetAmount", totalAmount);
				// 表头总金额
				viewModel.salesorderCard.setValue("totalDealAmount", totalDealAmount);

				// 做尾差
				var newSI = viewModel.saleOrderItems.getSimpleData();
				var newOrderEnable = [];
				for (var i = 0; i < newSI.length; i++) {
					if (newSI[i].dr != 1) {
						newOrderEnable.push(newSI[i]);
					}
				}
				var totalM = 0;
				for (var i = 0; i < newOrderEnable.length - 1; i++) {
					totalM += parseFloat(newOrderEnable[i].offsetAmount);
				}
				var ofa = viewModel.salesorderCard.getValue("offsetAmount");
				var difference = parseFloat(ofa) - parseFloat(totalM);
				orderItemsBom[newOrderEnable.length - 1].setValue(
					"offsetAmount",
					difference
				);
				orderItemsBom[newOrderEnable.length - 1].setValue(
					"dealAmount",
					parseFloat(differenceAmount) - parseFloat(difference)
				);
				if (cb && typeof cb == "function") {
					cb();
					viewModel.costFreezeEvent(true);
				}
			},
			// 费用冲抵成功后 各个按钮不可再点击，
			costFreezeEvent: function (isCostFlush, flag) {
				var comps = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems");
				if (!comps) {
					return
				}
				var grid = comps.grid;
				// var grid = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid;
				var orderNumOpt = grid.getColumnByField("orderNum");
				var salePriceOpt = grid.getColumnByField("salePrice");
				var dealPriceOpt = grid.getColumnByField("dealPrice");
				var dealAmountOpt = grid.getColumnByField("dealAmount");
				var isGiftOpt = grid.getColumnByField("isGift");
				var settleFinancialOrg = grid.getColumnByField("settleFinancialOrgId");
				if (isCostFlush) {
					// $(".isCostFlush input").attr("disabled", "disabled");
					viewModel.salesorderCard.setMeta("saleOrgId", "enable", false);
					viewModel.salesorderCard.setMeta("customerId", "enable", false);
					viewModel.salesorderCard.setMeta("orderTypeId", "enable", false);

					if (flag) {
						viewModel.isCostFlush = 2;
					} else {
						settleFinancialOrg && (settleFinancialOrg.options.editable = false);
						viewModel.isCostFlush = 1;
					}

					// 限制行上点击
					/**
					 * 为适配促销、费用冲抵后还可使用货补，这里不对订货量进行处理，
					 * 放到列表onBeforeEditFun事件里特殊处理
					 */
					// orderNumOpt && (orderNumOpt.options.editable = false);
					salePriceOpt && (salePriceOpt.options.editable = false);
					dealPriceOpt && (dealPriceOpt.options.editable = false);
					dealAmountOpt && (dealAmountOpt.options.editable = false);
					isGiftOpt && (isGiftOpt.options.isCostFlush = true);
				} else {
					if (viewModel.isSearchprom == 1 && viewModel.isCostFlush == 1) {
						viewModel.isCostFlush = 2;
					} else if (viewModel.isSearchprom != 1) {
						viewModel.isCostFlush = 0;
						// $(".isCostFlush input").removeAttr("disabled");
						viewModel.salesorderCard.setMeta("saleOrgId", "enable", true);
						viewModel.salesorderCard.setMeta("customerId", "enable", true);
						viewModel.salesorderCard.setMeta("orderTypeId", "enable", true);
						orderNumOpt && (orderNumOpt.options.editable = true);
						settleFinancialOrg && (settleFinancialOrg.options.editable = true);
						salePriceOpt && (salePriceOpt.options.editable = true);
						dealPriceOpt && (dealPriceOpt.options.editable = true);
						dealAmountOpt && (dealAmountOpt.options.editable = true);
						isGiftOpt && (isGiftOpt.options.isCostFlush = false);
					}
				}
				grid.repaintGridDivs();
			},
			// 取消费用冲抵
			cancelSearchFee: function () {
				var customerId = viewModel.salesorderCard.getValue("customerId");
				var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
				var orderItems = viewModel.saleOrderItems.getSimpleData();
				var orderRealItems = viewModel.saleOrderItems.getAllRealRows();
				var orderItemsBom = viewModel.saleOrderItems.getAllRows();
				var orderEnable = [];
				for (var i = 0; i < orderItems.length; i++) {
					if (orderItems[i].dr != 1) {
						orderEnable.push(orderItems[i]);
					}
					// PTQDYGG-1712 取消费用冲抵后，商品行上的冲抵金额没有归零
					orderRealItems[i].setValue("offsetAmount", 0);
				}

				var totalAmount = 0,
					totalDealAmount = 0;
				for (var i = 0; i < orderEnable.length; i++) {
					var item = orderEnable[i];
					var rate = parseFloat(item.conversionRate || "1");
					var dealAmount = item.salePrice * item.mainNum * rate || 0;
					var dealPrice = dealAmount / (item.mainNum * rate) || 0;
					orderItemsBom[i].setValue("dealAmount", dealAmount);
					orderItemsBom[i].setValue("dealPrice", dealPrice);
					totalDealAmount += dealAmount;
				}
				viewModel.salesorderCard.setValue("offsetAmount", 0);
				viewModel.salesorderCard.setValue("totalDealAmount", totalDealAmount);
				viewModel.isCostFlush = viewModel.isSearchprom == 0 ? 1 : 0;
				viewModel.costFreezeEvent(false);
			},
			openProductDlg: function () {
				if (viewModel.isAvailable()) {
					// 清空搜索条件和已选数据
					viewModel.productSearchParam.removeAllRows();
					viewModel.productSearchParam.createEmptyRow();
					viewModel.selectedproductList.removeAllRows();
					// 加载产品数据
					viewModel.productsearch(true);
					if (!viewModel.specialproductdialog) {
						viewModel.specialproductdialog = u.dialog({
							id: "dialog_specialproduct",
							content: "#dialog_specialproduct",
							hasCloseMenu: true,
							width: "80%"
						});
						var okButton = $("#dialog_specialproduct .J-ok");
						okButton.off().on("click", function () {
							viewModel.insertSelectedProduct();
							viewModel.specialproductdialog.close();
						});
						var cancelButton = $("#dialog_specialproduct .J-cancel");
						cancelButton.off().on("click", function () {
							viewModel.specialproductdialog.close();
						});
					} else {
						viewModel.specialproductdialog.show();
					}
				}
			},
			// 计算并显示选中行合计信息
			showSelectedItemsSum: function () {
				var orderitemtotalnumber = 0,
					orderitemtotalamount = 0,
					orderitemtotalvolume = 0,
					orderitemtotalweight = 0,
					orderitemtotalnetweight = 0;
				var SelectedRows = viewModel.saleOrderItems.getSelectedRows();
				if (u.isArray(SelectedRows) && SelectedRows.length > 0) {
					for (var i = 0; i < SelectedRows.length; i++) {
						orderitemtotalnumber += parseFloat(
							SelectedRows[i].getValue("billedQuantity") || 0
						);
						orderitemtotalamount += parseFloat(
							SelectedRows[i].getValue("amount") || 0
						);
						orderitemtotalvolume += parseFloat(
							SelectedRows[i].getValue("volume") || 0
						);
						orderitemtotalweight += parseFloat(
							SelectedRows[i].getValue("weight") || 0
						);
						orderitemtotalnetweight += parseFloat(
							SelectedRows[i].getValue("netWeight") || 0
						);
					}
				} else {
					var curRow = viewModel.salesorderList.getCurrentRow();
					orderitemtotalnumber = parseFloat(
						curRow.getValue("totalQuantity") || 0
					);
					orderitemtotalamount = parseFloat(
						curRow.getValue("totalAmount") || 0
					);
					orderitemtotalvolume = parseFloat(
						curRow.getValue("totalVolume") || 0
					);
					orderitemtotalweight = parseFloat(
						curRow.getValue("totalWeight") || 0
					);
					orderitemtotalnetweight = parseFloat(
						curRow.getValue("totalNeteight") || 0
					);
				}
				orderitemtotalnumber = viewModel.formater.format(orderitemtotalnumber);
				orderitemtotalamount = viewModel.formater.format(orderitemtotalamount);
				orderitemtotalvolume = viewModel.formater3.format(orderitemtotalvolume);
				orderitemtotalweight = viewModel.formater3.format(orderitemtotalweight);
				orderitemtotalnetweight = viewModel.formater3.format(orderitemtotalnetweight);
				viewModel.orderitemtotalnumber(orderitemtotalnumber);
				viewModel.orderitemtotalamount(orderitemtotalamount);
				viewModel.orderitemtotalvolume(orderitemtotalvolume);
				viewModel.orderitemtotalweight(orderitemtotalweight);
				viewModel.orderitemtotalnetweight(orderitemtotalnetweight);
			},
			selectIsCombineLast: function (rowId) {
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
			selectIsCombineFirst: function (rowId) {
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
			unSelectIsCombineLast: function (rowId) {
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
			unSelectIsCombineFirst: function (rowId) {
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
			getCombineOtherIndices: function (rowId) {
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
					if (
						itemRows[i].getValue("productCombineId") == combineId &&
						itemRows[i].getValue("reqTypeId") == reqTypeId &&
						itemRows[i].getValue("promotionId") == promotionId
					) {
						indices.push(i);
					}
				}
				return indices;
			},
			// 从行号池中拿到最新的行号
			generateRownum: function () {
				var latestnum = viewModel.currowNum(),
					newnum = latestnum + 100;
				viewModel.currowNum(newnum);
				return newnum;
			},
			getCurRowNum: function () {
				var data = viewModel.saleOrderItems.getSimpleData();
				var maxRowNum = 0;
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].rowNum > maxRowNum) {
							maxRowNum = data[i].rowNum;
						}
					}
				}
				viewModel.currowNum(maxRowNum);
			},
			// 清空已选参照
			clearRef: function (referids) {
				if (referids && referids.length > 0) {
					for (var i = 0; i < referids.length; i++) {
						var refer = $("#refContainer" + referids[i]).data("uui.refer");
						refer.uncheckAll();
						refer.setValue([]);
					}
				}
			},
			changeCondition: function (domid, oldcondition, newcondition) {
				$("#" + domid)
					.parent()
					.attr(
						"data-refparam",
						JSON.stringify(u.extend({}, oldcondition, newcondition))
					);
			},
			// setDefaultCondition: function () {
			//     viewModel.changeCondition("customerId", {
			//         "EQ_isEnable": "1",
			//         'EQ_isChannelCustomer': '1'
			//     }, {});
			// },
			// 处理合计行精度
			totalPrecisionHandle: function (row, type) {
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
			calcItemTotal: function () {
				var rows = viewModel.saleOrderItems.getAllRealRows();
				var orderitemtotalnumber = 0,
					orderitemtotalamount = 0,
					orderitemtotalvolume = 0,
					orderitemtotalweight = 0,
					orderitemtotalnetweight = 0;
				if (u.isArray(rows) && rows.length > 0) {
					for (var i = 0; i < rows.length; i++) {
						orderitemtotalnumber += parseFloat(
							rows[i].getValue("billedQuantity") || 0
						);
						orderitemtotalamount += parseFloat(rows[i].getValue("amount") || 0);
						orderitemtotalvolume += parseFloat(rows[i].getValue("volume") || 0);
						orderitemtotalweight += parseFloat(rows[i].getValue("weight") || 0);
						orderitemtotalnetweight += parseFloat(rows[i].getValue("netWeight") || 0);
					}
					orderitemtotalnumber = viewModel.formater.format(
						orderitemtotalnumber
					);
					orderitemtotalamount = viewModel.formater.format(
						orderitemtotalamount
					);
					orderitemtotalvolume = viewModel.formater3.format(
						orderitemtotalvolume
					);
					orderitemtotalweight = viewModel.formater3.format(
						orderitemtotalweight
					);
					orderitemtotalnetweight = viewModel.formater3.format(
						orderitemtotalnetweight
					);
				}
				viewModel.orderitemtotalnumber(orderitemtotalnumber);
				viewModel.orderitemtotalamount(orderitemtotalamount);
				viewModel.orderitemtotalvolume(orderitemtotalvolume);
				viewModel.orderitemtotalweight(orderitemtotalweight);
				viewModel.orderitemtotalnetweight(orderitemtotalnetweight);
			},
			findByorderCode: function (orderCode) {
				$._ajax({
					type: "get",
					url: appCtx + viewModel.baseurl + "/findorderbycode",
					data: {
						orderCode: orderCode
					},
					dataType: "json",
					success: function (data) {
						if (data) {
							viewModel.goDetailPanel();
							viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
							viewModel.salesorderDetailCard.setSimpleData(data);
							if (data.saleOrderItems) {
								viewModel.saleOrderItems.setSimpleData(data.saleOrderItems, {
									unSelect: true
								});
								viewModel.editTemplate.updateExtendData();
							}
						}
					}
				});
			},

			orderTypeChange: function (obj) {
				// var orderType = $("#refContainersalesorderCard_orderTypeId").data("uui.refer").values;
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

				viewModel.salesorderCard.setValue(
					"saleModel",
					orderType[0].saleModelCode
				);
				// if (obj.field == "orderType" || obj.field == 'costType') {
				//   var orderTypecomp = app.getComp("orderType").comp;
				//   if (obj.oldValue && obj.newValue) {
				//     var oldValue = obj.oldValue;
				//     var newValue = obj.newValue;
				//   }
				//   else {
				//     return true;
				//   }
				//   //如果子表有数据或者业务账号有数据
				//   if (viewModel.saleOrderItems.getAllRows().length > 0) {
				//     var orderTypeName = common.dataconvert.valueToName(oldValue, viewModel.soTypeSrc);
				//     orderTypecomp.setName(orderTypeName);
				//     common.dialog.confirmDialog({
				//       msg1: '是否修改销售订单类型？',
				//       msg2: '修改后将清空业务数据',
				//       width: '400px',
				//       type: 'error',
				//       onOk: function () {
				//         // 确定后清除业务数据
				//         viewModel.saleOrderItems.removeAllRows();
				//         // viewModel.salesorderCard.setValue("businessAccountId", null);
				//         viewModel.salesorderCard.setValue("soTypeId", newValue);
				//       }
				//     })
				//   } else {
				//     return true;
				//   }
				//   return false;
				// }
			},
			showFeeCustItem: function () {
				var rows = viewModel.salesorderList.getFocusRow();
				viewModel.CustomerCastflushDetailItem.removeAllRows();
				// if (rows.length == 0) {
				// 	toastr.warning("请先选择一行数据");
				// 	return;
				// }
				// var ids = [];
				// for (var i = 0; i < rows.length; i++) {
				// 	ids.push(rows[i].getValue("id"));
				// }
				if (rows) {
					var id = rows.getValue("id");
					viewModel.findFeeCustItemByid(id, function (data) {
						viewModel.CustomerCastflushDetailItem.setSimpleData(data);
						if (!viewModel.showfeecustItemdialog) {
							viewModel.showfeecustItemdialog = u.dialog({
								id: "dialog_showFeeCustItem",
								content: "#dialog_showFeeCustItem",
								hasCloseMenu: true,
								width: "45%"
							});
							var closefunc = function () {
								viewModel.CustomerCastflushDetailItem.removeAllRows();
								viewModel.showfeecustItemdialog.close();
							};
							var cancelButton = $("#dialog_showFeeCustItem .J-cancel");
							var closeButton = $("#dialog_showFeeCustItem .u-msg-close");
							cancelButton.off().on("click", closefunc);
							closeButton.off().on("click", closefunc);
						} else {
							viewModel.showfeecustItemdialog.show();
						}
					});
				} else {
					toastr.warning("未找到来源单据");
				}
			},
			//查询费用兑付明细
			findFeeCustItemByid: function (id, callback) {
				$._ajax({
					// url: appCtx + viewModel.baseurl + "/query-customercast-flush", // 原来的接口不用 
					url: appCtx + viewModel.baseurl + "/search-offset-detail-group-by-account", //该接口只用于查询冲抵明细
					type: "get",
					data: {
						orderId: id
					},
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						if (data && data.length > 0) {

							if (typeof callback == "function") {
								callback(data);
							}
						} else {
							toastr.error("没有费用兑付明细");
						}
					}
				});
			},
			/**
			 * @example 查看选配和编辑选配
			 */
			// 有bom 级 点击订单行的话提示去bom结构查看
			isGoodsBom: function () {
				toastr.warning("请在该商品的bom结构上产看选配信息！");
				return;
			},

			// 选配
			goodsOpt: function (obj) {
				var viewModel = obj.gridObj.viewModel;
				var baseGoodsOptName = $.trim(obj.row.value.baseGoodsOptValue); // 选配id
				var optName = baseGoodsOptName ? baseGoodsOptName : "添加选配";
				var detailfun =
					"data-bind=click:goodsOptionalFun.bind($data," + obj.rowIndex + ")";
				obj.element.innerHTML =
					'<a href="#" class="ui-a-detail" ' +
					detailfun +
					">" +
					optName +
					"</a>";
				ko.cleanNode(obj.element);
				ko.applyBindings(viewModel, obj.element);
			},
			/*// 查看选配
				  goodsOptDetails: function (obj) {
					  var viewModel = obj.gridObj.viewModel;
					  var baseGoodsOptVal = $.trim(obj.row.value.baseGoodsOptValue); // 选配value
					  if (baseGoodsOptVal) {
						  var detailfun = "data-bind=click:goodsOptDetailsFun.bind($data," + obj.rowIndex + ")";
						  obj.element.innerHTML =
							  '<a href="#" class="ui-a-detail" ' + detailfun + ">查看选配</a>";
					  } else {
						  obj.element.innerHTML =
							  '<span>无选配信息</span>';
					  }
	  
					  ko.cleanNode(obj.element);
					  ko.applyBindings(viewModel, obj.element);
				  },*/
			goodsOptionalFun: function (obj) {
				/**
				 * @example 编辑选配common.goodsOptional.goodsOptional()
				 * @param viewModel 当前viewModel, 用来挂载dialog
				 * @param title     弹窗title
				 * @param goodsId   商品行Id
				 * @param baseGoodsOptId   选配结果id
				 * @param el        dialog id (不加 ‘#’)
				 * @param callback  确定是回调函数*   需要把信息保存到订单杭上， 如果是新增，就调用当前功能新增接口，编辑同理
				 * @function callback --> 保存后拿到选配id 饭后添加到订单行上
				 * @param  callback --> 保存后的选配信息做展示
				 * @param  callback --> 保存后的选配信息做展示
				 * @param  callback --> 成功后调取回调，关闭弹窗
				 */
				var data = viewModel.saleOrderItems.getSimpleData()[obj];
				var thisDatable = viewModel.saleOrderItems.getAllRealRows()[obj];
				var id = data.goodsId;
				var baseGoodsOptId = data.baseGoodsOptId ? data.baseGoodsOptId : "";
				common.goodsOptional.goodsOptional(viewModel, "商品选配", id, baseGoodsOptId, "dialog_goodsOptional", viewModel.saleOrderItems, viewModel.batchSaleOrderBomItems, function (goodsOptData, goodsOptID, cb) {
					/**
					 * 循环遍历返回结果，拼接后展示
					 */
					var goodsOpt = goodsOptID[0].goodsOptDtos;
					//获取全部bom信息
					var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
					var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
					var newBomData = [];
					bomdata.forEach(function (item) {
						if (item.dr != 1) {
							newBomData.push(item);
						}
					});
					var optResult = "",
						goodsOptArr = [],
						idArr = [],
						id = "";
					for (var i = 0; i < newBomData.length; i++) {
						for (var j = 0; j < goodsOpt.length; j++) {
							if (newBomData[i].goodsId == goodsOpt[j].goodsId) {
								var tt = goodsOpt[j].goodsOptVals,
									arr = [];
								for (var k = 0; k < tt.length; k++) {
									if (tt[k].attrValCode !== "" && tt[k].attrValId !== "" && tt[k].attrValName !== "") arr.push(tt[k].prodAttrStrucItemName + ":" + tt[k].attrValName);
								}
								if (arr && arr.length > 0) {
									allrows[i].setValue("baseGoodsOptId", goodsOpt[j].id);
									allrows[i].setValue("baseGoodsOptValue", arr.join(","));
								} else {
									allrows[i].setValue("baseGoodsOptId", null);
									allrows[i].setValue("baseGoodsOptValue", null);
								}
							}
						}
					}
					// bug PTQDYGG-1088
					for (var i = 0; i < goodsOpt.length; i++) {
						// optResult += goodsOpt[i].optResult + ',';
						// id += goodsOpt[i].id + ',';
						var temp = goodsOpt[i];
						for (var j = 0; j < temp.goodsOptVals.length; j++) {
							var tem = temp.goodsOptVals[j];
							if (
								tem.attrValCode !== "" &&
								tem.attrValId !== "" &&
								tem.attrValName !== ""
							)
								goodsOptArr.push(
									tem.prodAttrStrucItemName + ":" + tem.attrValName
								);
						}
						if (temp.id && temp.optResult) idArr.push(temp.id);
					}
					// optResult = optResult.substr(0, optResult.length - 1);
					// id = id.substr(0, id.length - 1);
					if (idArr.length > 0) {
						thisDatable.setValue("baseGoodsOptId", idArr.join(","));
						thisDatable.setValue("baseGoodsOptValue", goodsOptArr.join(","));
					} else {
						thisDatable.setValue("baseGoodsOptId", null);
						thisDatable.setValue("baseGoodsOptValue", null);
					}
					cb();
				});
			},
			salesOrderGoodsOptDetailsFun: function (obj) {
				/**
				 * @example 查看选配common.goodsOptional.OptionalDetails()
				 * @param viewModel 当前viewModel, 用来挂载dialog
				 * @param title     弹窗title
				 * @param goodsId   商品行Id
				 * @param el        dialog id (不加 ‘#’)
				 */
				var data = viewModel.saleOrderItems.getSimpleData()[obj],
					id = data.goodsId,
					baseGoodsOptId = data.baseGoodsOptId ? data.baseGoodsOptId : "";

				common.goodsOptional.OptionalDetails(
					viewModel,
					"商品选配",
					id,
					baseGoodsOptId,
					"dialog_goodsOptDetails",
					viewModel.saleOrderItems,
					viewModel.batchSaleOrderBomItems
				);
			},
			//选择商品页签
			checkGoods: function () {
				viewModel.isBomPanel(true);
				if (viewModel.billPanelStatus() === "detail") {
					// $("#tab-panel-4").hide();
					// $("#tab-panel-3").show();
				} else {
					// $("#tab-panel-2").hide();
					// $("#tab-panel-1").show();
				}
			},
			//选择Bom页签
			checkBom: function () {
				viewModel.isBomPanel(false);
				if (viewModel.billPanelStatus() === "detail") {
					// $("#tab-panel-4").show();
					// $("#tab-panel-3").hide();
				} else {
					// $("#tab-panel-2").show();
					// $("#tab-panel-1").hide();
				}
			},
			// 从行号池中拿到最新的bom行号
			generateBomrowNum: function () {
				var latestnum = viewModel.currowBomNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowBomNum(newnum);
				return newnum;
			},
			getBomCurrowNum: function () {
				var data = viewModel.batchSaleOrderBomItems.getSimpleData();
				var maxrowNum = 0;
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].rowNum > maxrowNum) {
							maxrowNum = data[i].rowNum;
						}
					}
				}
				viewModel.currowBomNum(maxrowNum);
			},
			getGoodsPrice: function (ids) {
				if (!ids) {
					toastr.warning("商品id值为空！");
					return;
				}
				$._ajax({
					type: "get",
					url: appCtx + url,
					dataType: "json",
					data: ids,
					success: function (data) { }
				});
			},
			// 费用冲抵状态
			billStatusRender: function (obj) {
				var statusCode = obj.value;
				var statusName = "";
				switch (statusCode) {
					case "01":
						statusName = "未处理";
						break;
					case "02":
						statusName = "已提交";
						break;
					case "03":
						statusName = "审批中";
						break;
					case "04":
						statusName = "审批通过";
						break;
					case "05":
						statusName = "审批不通过";
						break;
					case "06":
						statusName = "部分兑付";
						break;
					case "07":
						statusName = "全部兑付";
						break;
				}
				obj.element.innerHTML = statusName;
			},
			isGiftOpt: function (obj) {
				var statusCode = obj.value;
				var statusName = "";
				switch (statusCode) {
					case "0":
						statusName = "否";
						break;
					case "1":
						statusName = "是";
						break;
				}
				obj.element.innerHTML = statusName;
			},
			// 时间格式化
			billDateComputed: ko.pureComputed(function () {
				var truetime = viewModel.salesorderDetailCard.ref("deliveryDate")();
				var showtime = u.date.format(truetime, "YYYY-MM-DD");
				return showtime;
			}),
			//返回列表页
			retListPanel: function () {
				$(".ui-panel").hide();
				$(".ui-list-panel").show();
				$(".ui-list-panel").animateCss("fadeIn");
				if (viewModel.salesorderDetailCard.removeAllRows) viewModel.salesorderDetailCard.removeAllRows();
				viewModel.isSearchprom = 0;
				viewModel.isCostFlush = 0;
				viewModel.SysParams_stock = 0;
				viewModel.isSearchprom = 0;
				viewModel.costFreezeEvent(false);
				viewModel.SearchpromAfter = '';
				viewModel.SearchpromAfterBom = '';
				viewModel.orderPriceProm = '';
				viewModel.giftProms = '';
				viewModel.reqOrderPromRels = '';
				viewModel.orderAttachments = [];
				viewModel.search();
				viewModel.oneKeyOffsetListDto = "";
			},
			//-------------------------------------------上传开始
			//点击上传按钮
			btnUploadAttach: function () {
				$("#saleattachuploadbatch_id").val(undefined);
				$("#saleattachuploadbatch_id").trigger("click");
			},
			uploadAttach: function () {
				var fileNum = $("#saleattachuploadbatch_id")[0].files.length;
				var fileSize = 0;
				var fileSizeMb = 0;
				var fileTypeArr = [];

				var pk = viewModel.pk;

				if (!pk) {
					toastr.warning("未获取到相关订单号，可以保存后编辑上传");
					return;
				}
				var par = {
					fileElementId: "saleattachuploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file"
					// name="file"
					// />,可以修改，主要看你使用的 id是什么
					filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
					groupname: "saleFile" + pk, //【必填】分組名称,未来会提供树节点
					permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
					url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
					//thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
					cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
				};
				var f = new interface_file();
				f.filesystem_upload(par, viewModel.uploadAttachCallback);
			},

			uploadAttachCallback: function (data) {
				if (1 == data.status) {
					//上传成功状态
					for (var i = 0; i < data.data.length; ++i) {
						viewModel.attachList.push(data.data[i]);
						viewModel.showAttachment();
					}
				} else {
					//error 或者加載js錯誤
					toastr.error(data.message);
				}
			},
			showAttachment: function (orderSource) {
				var attachList = orderSource == "01" ? viewModel.orderAttachments : viewModel.attachList;
				var htmlStr = "<div>";
				for (var i = 0; i < attachList.length; i++) {
					// 数据做容错
					attachList[i].url = attachList[i].url || attachList[i].attachmentUrl;
					attachList[i].filename = attachList[i].filename || attachList[i].attachmentName;
					// 判断文件是图片类型
					var postfix = attachList[i].url.split("."),
						fileExt = postfix[postfix.length - 1].toUpperCase();
					htmlStr += '<div style="display:flex; margin-left:40px">';
					if (fileExt == "JPG" || fileExt == "JPEG" || fileExt == "PNG") {
						htmlStr +=
							'<span class="attach-details" href="' +
							attachList[i].url +
							'" style="cursor: pointer">' +
							attachList[i].filename +
							"</span>";
					} else {
						htmlStr += "<span>" + attachList[i].filename + "</span>";
					}
					htmlStr +=
						'<a id="down_' +
						attachList[i].id +
						'" href="' +
						attachList[i].url +
						'" download = "' +
						attachList[i].filename.split(".")[0] +
						'" class="margin-left-15">下载</a>';
					// 编辑页才能删除
					if (!viewModel.isDetail) {
						htmlStr +=
							'<a id="' +
							attachList[i].id +
							'" class="attach-del margin-left-10" style="cursor: pointer">删除</a>';
					}
					htmlStr += "</div>";
				}
				htmlStr += "</div>";

				if (viewModel.isDetail) {
					if (orderSource == "01") {
						$("#saleorder-card-attachDetail-web")[0].innerHTML = htmlStr;
					} else {
						$("#saleorder-card-attachDetail")[0].innerHTML = htmlStr;
					}
				} else {
					if (orderSource == "01") {
						$("#saleorder-card-attach-web")[0].innerHTML = htmlStr;
					} else {
						$("#saleorder-card-attach")[0].innerHTML = htmlStr;
					}
				}
				$("#saleorder-card-attach").off("click").on("click", ".attach-del", function (e) {
					viewModel.fileDelete(e.currentTarget.id);
				});
				$("#saleorder-card-attach-web").off("click").on("click", ".attach-del", function (e) {
					viewModel.fileDelete_web($(this), e.currentTarget.id);
				});
				// 查看附件
				$(".attach-details").click(function () {
					common.flieUpload.fileDetails($(this).attr("href"));
				});
			},
			fileDelete: function (id) {
				common.dialog.confirmDialog({
					msg1: "是否要删除附件？",
					msg2: " ",
					width: "400px",
					type: "error",
					onOk: function () {
						var par = {
							id: id, //【必填】表的id
							cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
						};
						var f = new interface_file();
						f.filesystem_delete(par, viewModel.fileDeleteCallBack);
					}
				});
			},
			fileDelete_web: function (element, id) {
				for (var i = 0; i < viewModel.orderAttachments.length; i++) {
					if (viewModel.orderAttachments[i].id == id) {
						viewModel.orderAttachments[i].dr = 1;
						viewModel.orderAttachments[i].persistStatus = "fdel";
						element.parent().remove();
					}
				}
			},
			//附件删除回调
			fileDeleteCallBack: function (data) {
				if (1 == data.status) {
					//删除成功状态
					// viewModel.queryImage();
					viewModel.queryAttach();
				} else {
					toastr.error(data.message);
				}
			},
			queryAttach: function () {
				//获取表单
				var pk = viewModel.pk;
				var par = {
					fileElementId: "saleattachuploadbatch_id",
					//建议一定要有条件否则会返回所有值
					filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
					groupname: "saleFile" + pk, //【选填】[分組名称,未来会提供树节点]
					cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
				};
				var f = new interface_file();
				f.filesystem_query(par, viewModel.queryAttachCallback);
			},
			queryAttachCallback: function (data) {
				if (1 == data.status) {
					//上传成功状态
					viewModel.attachList = data.data;
					viewModel.showAttachment();
				} else {
					//删除成功后查询
					if (data.status == 0 && !data.data) {
						viewModel.attachList = [];
					}
					viewModel.showAttachment();
				}
			},
			//-------------------------------------------上传结束
			saleOrderItemsOnBeforeEditFun: function (obj) {
				var gridObj = obj.gridObj;
				var goodsSupplement = obj.rowObj.value.goodsSupplement;
				// 判断是否已冲抵或促销
				if (viewModel.isCostFlush != 0 && goodsSupplement != 1) {
					return false;
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("dealAmount"))) return false;
				// if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))) {
				// 	var row = obj.rowObj.value;
				// 	var enableBatchNoManage = row.enableBatchNoManage;
				// 	var grid = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid;
				// 	var batchCodeIdOpt = grid.getColumnByField("batchCodeId");
				// 	if (enableBatchNoManage) {
				// 		if (enableBatchNoManage == "1") {
				// 			batchCodeIdOpt.options.editable = true;
				// 			viewModel.saleOrderItems.setMeta(
				// 				"batchCodeId",
				// 				"refparam",
				// 				'{"EQ_goods":"' + row.goodsId + '", "EQ_isEnable":"1"}'
				// 			);
				// 			return true;
				// 		} else {
				// 			batchCodeIdOpt.options.editable = false;
				// 			toastr.warning("该商品未开启批号控制");
				// 			return false;
				// 		}
				// 	} else {
				// 		$._ajax({
				// 			url: "/occ-base/api/base/goods/" + row.goodsId,
				// 			type: "get",
				// 			contentType: "application/json; charset=utf-8",
				// 			success: function (data) {
				// 				enableBatchNoManage = data.enableBatchNoManage;
				// 				if (enableBatchNoManage == "1") {
				// 					batchCodeIdOpt.options.editable = true;
				// 					viewModel.saleOrderItems.setMeta(
				// 						"batchCodeId",
				// 						"refparam",
				// 						'{"EQ_goods":"' + row.goodsId + '", "EQ_isEnable":"1"}'
				// 					);
				// 					return true;
				// 				} else {
				// 					batchCodeIdOpt.options.editable = false;
				// 					toastr.warning("该商品未开启批号控制");
				// 					return false;
				// 				}
				// 			}
				// 		});
				// 	}
				// }
				if (
					obj.colIndex ==
					gridObj.getIndexOfColumn(gridObj.getColumnByField("salePrice")) ||
					obj.colIndex ==
					gridObj.getIndexOfColumn(gridObj.getColumnByField("dealPrice")) ||
					obj.colIndex ==
					gridObj.getIndexOfColumn(gridObj.getColumnByField("dealAmount"))
				) {
					var row = obj.rowObj.value;
					var price = obj.rowObj.value.basePrice;
					if (price || price > 0) {
						if (viewModel.isPriceEditFind == 1) {
							return true;
						} else {
							return false;
						}
					} else {
						if (viewModel.isPriceEditNotFind == 1) {
							return true;
						} else {
							return false;
						}
					}
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("deliveryWarehouseId"))) {
					var deliveryInvOrgId = obj.rowObj.value.deliveryInvOrgId;
					var params = deliveryInvOrgId ? '{"EQ_inventoryOrg.id":"' + deliveryInvOrgId + '","EQ_isEnable":"1"}' : '{"EQ_isEnable":"1"}';
					viewModel.saleOrderItems.setMeta("deliveryWarehouseId", "refparam", params);
				}
				if (obj.colIndex == gridObj.getIndexOfColumn(gridObj.getColumnByField("goodsId"))) {
					if (goodsSupplement == 1) return false;
					if (!viewModel.isAvailable()) {
						return false;
					}
					var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");
					var saleOrg = common.getRefDataByDtAndKey("salesorderCard", "saleOrgId");
					var customer = common.getRefDataByDtAndKey("salesorderCard", "customerId");
					var customerId = customer && customer[0].id;
					var saleModel = orderType && orderType[0].saleModelCode;
					var saleOrgId = saleOrg && saleOrg[0].refpk;
					var condition = {
						"search_customerId": customerId,
						"search_saleModel": saleModel,
						"search_customerRankCode": "01",
						"search_organization": saleOrgId
					};
					viewModel.saleOrderItems.setMeta("goodsId", "refparam", JSON.stringify(condition));
				}
				return true;
			},
			// 根据销售组织 + 客户 查询正向销售类型，客户经理，销售部门
			qureyCustomerManageAndOrderType: function (ordertypeBody, jurisdictionsBody, callBack) {

				// 根据销售组织加客户 询渠道客户交易关系（客户经理、部门，多条只取有客户经理的第一条）
				$._ajax({
					type: "get",
					url: window.pathMap.base + "/base/customer-jurisdictions",
					data: jurisdictionsBody,
					success: function (data) {
						if (!data) {
							return;
						}
						var juris = data.content;
						for (var i = 0; i < juris.length; i++) {
							if (juris[i].customerId) {
								var manage = juris[i];
								if (typeof callBack == "function") {
									callBack(manage);
									return;
								}
								viewModel.salesorderCard.setValue("salesManagerId", manage.customerManagerId);
								viewModel.salesorderCard.setValue("salesDeptId", manage.saleDepartmentId);
								viewModel.salesorderCard.setValue("marketAreaId", manage.marketAreaId);
								i = juris.length;
							}
						}
					}
				});
			},
			// 计算金额精度
			currencyPriceScale: function (str, flag) {
				if (!viewModel.CURRENCY) {
					return str;
				}
				// 单价精度
				var price = viewModel.CURRENCY.pricePrecision || 0;
				// 金额精度
				var amount = viewModel.CURRENCY.amountPrecision || 0;
				var currency = flag == "price" ? price : amount;
				return parseFloat(str).toFixed(currency);
			},
			// 树池华
			initDataValid: function (item, flag) {
				// 货补行或赠品行不考虑重复
				if (flag == "prom" || flag == "supplement") return true;

				var id = item.refpk || item.goodsId;
				var rows = viewModel.saleOrderItems.getRowsByField("goodsId", id);
				if (!rows || rows.length < 1) return true;
				var goodsRow = rows.find(function (row) {
					return row.getValue("dr") != 1 && row.getValue("isGift") != 1 && row.getValue("goodsSupplement") != 1;
				});
				// 已存在商品行，且不为删除态
				if (goodsRow && goodsRow.status != u.Row.STATUS.FALSE_DELETE) return false;
				return true;
			},
			initData: function (data, flag) {
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						data[i].ts = "";
						data[i].creationTime = "";
						data[i].modifiedTime = "";
						var id = data[i].refpk || data[i].goodsId;
						var row = viewModel.saleOrderItems.getRowByField("goodsId", id);
						var saleModel = viewModel.salesorderCard.getValue("saleModel");
						var bomdata = viewModel.findBomByParentId(id);
						var rowNum = viewModel.generaterowNum();
						var newrow = viewModel.saleOrderItems.createEmptyRow({
							unSelect: true
						});
						data[i].planDeliveryDate = new Date().getTime();
						// 为了 renderType能显示出单位 将 体积 重量单位在SetimpleData前set进DataTable里
						// newrow.setValue("volumeUnitName", data[i].volumeUnitName);
						// newrow.setValue("weightUnitName", data[i].weightUnitName);
						newrow.setSimpleData(data[i]);
						if (saleModel == "03") {
							newrow.setValue("isGift", 1);
							$(".u-checkbox-input").attr("disabled", "disabled");
						} else {
							$(".u-checkbox-input").removeAttr("disabled");
						}
						if (flag == "supplement") {
							newrow.setValue("isGift", 1); // 货补商品勾选赠品标识
							newrow.setValue("goodsSupplement", 1);
							$(".u-checkbox-input").attr("disabled", "disabled");
						} else {
							newrow.setValue("goodsSupplement", 0);
						}
						newrow.setValue("rowNum", rowNum);
						newrow.setValue("goodsId", data[i].refpk || data[i].goodsId);
						newrow.setValue("basePrice", data[i].basePrice);
						newrow.setValue("baseDiscountPrice", data[i].baseDiscountPrice);
						newrow.setValue("conversionRate", data[i].conversionRate);
						newrow.setValue("deliveryInvOrgId", data[i].inventoryOrgId || data[i].deliveryInvOrgId);
						newrow.setValue("refshowcontent_deliveryInvOrgId_name", data[i].inventoryOrgName || data[i].deliveryInvOrgName);
						newrow.setValue("refrel_goodsId_code", data[i].refcode || data[i].goodsCode);
						newrow.setValue("refrel_goodsId_name", data[i].refname || data[i].goodsName);
						newrow.setValue("refshowcontent_goodsId_name", data[i].refname || data[i].goodsName || data[i].refshowcontent_goodsId_name);
						newrow.setValue("goodsName", data[i].refname || data[i].goodsName);
						newrow.setValue("goodsCode", data[i].refcode || data[i].goodsCode);
						newrow.setValue("goodsImg", data[i].mainPictureFileUrl);
						newrow.setValue("goodsDisplayName", data[i].displayName || data[i].refname);
						newrow.setValue("isOptional", data[i].isOptional);
						newrow.setValue("mainNumUnitId", data[i].basicUnitId || data[i].mainNumUnitId);
						newrow.setValue("refshowcontent_mainNumUnitId_name", data[i].basicUnitName || data[i].mainNumUnitName || data[i].refshowcontent_mainNumUnitId_name);
						newrow.setValue("netWeight", data[i].netWeight);
						newrow.setValue("orderNumUnitId", data[i].assistUnitId || data[i].orderNumUnitId);
						newrow.setValue("refshowcontent_orderNumUnitId_name", data[i].assistUnitName || data[i].orderNumUnitName || data[i].refshowcontent_orderNumUnitId_name);
						newrow.setValue("originalGoodsId", data[i].originalGoodsId);
						newrow.setValue("productId", data[i].productId);
						newrow.setValue("productLineId", data[i].productLineId);
						newrow.setValue("refshowcontent_productLineId_name", data[i].productLineName || data[i].refshowcontent_productLineId_name);
						newrow.setValue("salePrice", data[i].salePrice);
						newrow.setValue("supplierPrice", data[i].supplierPrice);
						newrow.setValue("settleFinancialOrgId", data[i].settleFinancialOrgId);
						newrow.setValue("refshowcontent_settleFinancialOrgId_name", data[i].settleFinancialOrgName || data[i].refshowcontent_settleFinancialOrgId_name);
						newrow.setValue("version", data[i].version);
						newrow.setValue("volume", data[i].volume);
						newrow.setValue("volumeUnitId", data[i].volumeUnitId);
						newrow.setValue("weightUnitId", data[i].weightUnitId);
						newrow.setValue("weight", data[i].grossWeight || data[i].weight);
						// 上级原价
						newrow.setValue("supplierPrice", data[i].supplierPrice);
						// 货补行清空成交价、成交金额
						if (flag == "supplement") {
							newrow.setValue("dealPrice", 0);
							newrow.setValue("dealAmount", 0);
						}
						//bom产品信息的添加
						var bomdata = viewModel.findBomByParentId(id);
						if (bomdata && bomdata.length > 0) {
							var bomItem = bomdata[0].goodsBomChildren;
							var bomItemData = []
							for (var j = 0; j < bomItem.length; j++) {
								var item = bomItem[j];
								var parentRowNum = rowNum;
								var bomRowNum = viewModel.generateBomrowNum();
								if (item.isOptional == 1) {
									newrow.setValue('isOptional', 1);
									newrow.setValue("baseGoodsOptValue", '  ');
								}
								var mainNum = newrow.getValue("mainNum");
								var orderNum = newrow.getValue("orderNum");
								var parentGoodsName = newrow.getValue("goodsName");
								var bomRowNum = viewModel.generateBomrowNum();
								if (flag == "supplement") {
									item.goodsSupplement = 1;
								}
								item.id = null;
								item.goodsName = item.childGoodsName;
								item.goodsId = item.childGoodsId;
								item.refshowcontent_goodsId_name = item.childGoodsName;
								item.refshowcontent_parentGoodsId_name = parentGoodsName;
								item.goodsCode = item.childGoodsCode;
								item.version = item.childGoodsVersion;
								item.childGoodsQty = item.childGoodsQty;
								item.mainNumUnitId = item.childGoodsUnitId;
								item.refshowcontent_mainNumUnitId_name = item.childGoodsUnitName;
								item.orderNumUnitId = item.childGoodsUnitId;
								item.refshowcontent_orderNumUnitId_name = item.childGoodsUnitName;
								item.orderNum = orderNum * item.childGoodsQty || 0;
								item.mainNum = mainNum * item.childGoodsQty || 0;
								item.parentRowNum = rowNum;
								item.rowNum = bomRowNum;
								item.isGift = 0;
								item.baseGoodsOptId = '';
								item.baseGoodsOptValue = '';
								item.parentGoodsId = data[i].refpk;
								item.mainNum = '';
								viewModel.currowBomNum(bomRowNum);
								bomItemData.push(item);
							}
							viewModel.batchSaleOrderBomItems.addSimpleData(bomItemData, {
								unSelect: true,
								status: 'new'
							});
						} else {
							var parentRowNum = rowNum;
							var bomRowNum = viewModel.generateBomrowNum();
							var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
							cpRow.setSimpleData(newrow.getSimpleData(), {
								status: "new"
							});
							var parentGoodsId = cpRow.getValue("goodsId");
							var parentGoodsName = cpRow.getValue("goodsName");
							var parentGoodsCode = cpRow.getValue("goodsCode");
							cpRow.setValue("refshowcontent_goodsId_name", parentGoodsName);
							var parentGoodsName = cpRow.getValue("refrel_goodsId_name");
							cpRow.setValue("rowNum", bomRowNum);
							cpRow.setValue("parentRowNum", parentRowNum);
							cpRow.setValue("parentGoodsId", parentGoodsId);
							cpRow.setValue("refshowcontent_parentGoodsId_name", parentGoodsName);
							cpRow.setValue("refrel_parentGoodsId_code", parentGoodsCode);
							cpRow.setValue("refrel_parentGoodsId_name", parentGoodsName);
							cpRow.setValue("refshowcontent_mainNumUnitId_name", newrow.getValue("refshowcontent_mainNumUnitId_name"));
							cpRow.setValue("refshowcontent_orderNumUnitId_name", newrow.getValue("refshowcontent_orderNumUnitId_name"));
							cpRow.setValue("parentGoodsName", parentGoodsName);
							cpRow.setValue("childGoodsQty", 1);
							var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
							getRow.forEach(function (item) {
								item.persistStatus = "new";
							});
						}
					}
					viewModel.findCarrierData();
					if (viewModel.SysParams_stock) {
						setTimeout(function () {
							viewModel.findByWarehouse();
						}, 0);
					}
					// viewModel.editTemplate.updateExtendData();
				}
			},

			// 商品行价格、金额变化时，联动表头合计金额
			linkHeadAmount: function (saleCard) {
				// 计算合计金额、合计数量
				var orderItems = viewModel.saleOrderItems.getSimpleData();
				var arr = [];
				for (var i = 0; i < orderItems.length; i++) {
					if (orderItems[i].dr != 1) {
						arr.push(orderItems[i]);
					}
				}
				var totalDealAmount = 0,
					totalAmount = 0;
				for (var i = 0; i < arr.length; i++) {
					totalDealAmount += arr[i].dealAmount ? parseFloat(arr[i].dealAmount) : 0;
					var amount = parseFloat(arr[i].mainNum * parseFloat(arr[i].salePrice || 0)) || 0;
					totalAmount += amount;
				}
				saleCard.setValue("totalDealAmount", totalDealAmount);
				saleCard.setValue("totalAmount", totalAmount);
			},
			// 查询是否启用调度中心
			querySysParams: function () {
				// 1 启用  0 未启用
				$._ajax({
					type: "get",
					url: window.pathMap.base + '/base/sys-params?search_EQ_code=ENABLE_DISPATCH&search_EQ_isEnable=1',
					success: function (data) {
						if (data.content && data.content.length > 0) {
							if (data.content[0].value == 1) {
								viewModel.SysParams_stock = 1;
							} else {
								viewModel.SysParams_stock = 0;
							}
						} else {
							viewModel.SysParams_stock = 0;
						}
					}
				});
			},
			// 根据收货地址询库存组织及仓库
			findByWarehouse: function (selectAddressValue) {
				var value = viewModel.saleOrderItems.getRealSimpleData();
				var realAllRows = viewModel.saleOrderItems.getAllRealRows();
				var selectAddress = selectAddressValue ? selectAddressValue : viewModel.orderReceiveAddress.getSimpleData()[0];
				var warehouseInfo = [];
				if (value && value.length > 0 && selectAddress) {
					value.forEach(function (item) {
						if (item.goodsId || item.id) {
							warehouseInfo.push({
								saleOrgId: item.saleOrgId || viewModel.salesorderCard.getValue("saleOrgId"), // 销售组织
								provinceId: selectAddress.provinceId || selectAddress.receiverProvinceId,
								cityId: selectAddress.cityId || selectAddress.receiverCityId,
								countyId: selectAddress.countyId || selectAddress.receiverCountyId,
								townId: selectAddress.townId || selectAddress.receiverTownId,
								goodsId: item.goodsId || item.id,
								productLineId: item.productLineId
							});
						}
					});
					$._ajax({
						url: window.pathMap.b2b + "/b2b/goods/find-warehouse",
						type: "post",
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify(warehouseInfo),
						success: function (data) {
							// 重新获取最新数据
							var value = viewModel.saleOrderItems.getSimpleData();
							realAllRows.map(function (allRows) {
								allRows.setValue("deliveryInvOrgId", null);
								allRows.setMeta("deliveryInvOrgId", 'display', null);
								allRows.setValue("deliveryWarehouseId", null);
								allRows.setMeta("deliveryWarehouseId", 'display', null);
							})
							if (data && data.length > 0) {
								data.map(function (item) {
									realAllRows.map(function (allRows) {
										if (allRows.getValue("goodsId") == (item.goodsId || item.id)) {
											allRows.setValue("deliveryInvOrgId", item.inventoryOrgId);
											allRows.setValue("refshowcontent_deliveryInvOrgId_name", item.inventoryOrgName);
											allRows.setValue("deliveryWarehouseId", item.warehouseId);
											allRows.setValue("refshowcontent_deliveryWarehouseId_name", item.warehouseName);
										}
									})
								})
							}
						}
					});
				}
			},
			clearRefParams: function () {
				var salesDeptBase = viewModel.app.getComp("salesDeptId");
				var salesManagerBase = viewModel.app.getComp("salesManagerId");
				var marketAreaBase = viewModel.app.getComp("marketAreaId");
				var receiveAddressBase = viewModel.app.getComp("orderReceiveAddress");
				var customerInoviceBase = viewModel.app.getComp("orderInvoice");
				salesDeptBase && $(salesDeptBase.element).attr("data-refparam", '{"EQ_isEnable":"1"}');
				marketAreaBase && $(marketAreaBase.element).attr("data-refparam", '{}');
				salesManagerBase && $(salesManagerBase.element).attr("data-refparam", '{"EQ_isEnable":"1"}');
				customerInoviceBase && $(customerInoviceBase.element).attr("data-refparam", '{}');
				receiveAddressBase && $(receiveAddressBase.element).attr("data-refparam", '{}');
			},
			inquirePrice: function (obj, callback) {
				var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
				var goodsId = currRow.getValue("goodsId");
				if (goodsId) {
					var rate = parseFloat(currRow.getValue("conversionRate") || "1");
					var mainNum = parseFloat(obj.newValue) * rate || 0;
					// 补充组织等信息 pengjwb
					var headRow = viewModel.salesorderCard.getCurrentRow();
					var saleOrgId = headRow.getValue("saleOrgId");
					var customerId = headRow.getValue("customerId");
					var marketAreaId = headRow.getValue("marketAreaId");

					var params = {
						organizationId: saleOrgId,
						goodsId: goodsId,
						customerId: customerId,
						marketAreaId: marketAreaId,
						num: mainNum
					};
					$._ajax({
						url: window.pathMap.price + '/price/price-inquires//find-price-by-goodsid',
						type: 'post',
						data: JSON.stringify(params),
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							if (data && data.price1) {
								if (typeof callback == "function") {
									currRow.setValue("basePrice", data.prePrice1);
                  currRow.setValue("salePrice", data.price1);
                  // 要确保促销，费用后不能修改数量
                  currRow.setValue("promPrice", data.price1);
                  currRow.setValue("dealPrice", data.price1);
									callback(currRow);
								}
							} else {
                toastr.error("询价失败！");
                return;
              }
						}
					});
				}
			},
			editEventListener: function () {
				var refRow = viewModel.ItemRefList.createEmptyRow();
				viewModel.ItemRefList.setRowFocus(refRow);
				// 确定销售产品参照，为产品组合子表增行
				viewModel.ItemRefList.off("supplementproductref.valuechange").on("supplementproductref.valuechange", function (obj) {
					// 清空参照时不增行
					if (!obj.newValue) {
						return;
					}
					var bomItems = [];
					var refer = $("#refContainersupplementproductref").data("uui.refer");
					var accountRef = $("#refContaineraccountIdBase").data("uui.refer");
					// 账户主键
					var supplementAccountId = null;
					if (accountRef && accountRef.values && accountRef.values[0]) {
						supplementAccountId = accountRef.values[0].refpk;
					}
					if (!supplementAccountId) {
						toastr.info("补货账户为空，请重新选择！");
						return;
					}
					var refValues = refer.values;
					var goodsInfoDtos = [];
					var queryFinancial = [];
					var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					refValues.forEach(function (item) {
						item.goodsAttrVals = "";
						// 补充货补账户信息
						item.supplementAccountId = supplementAccountId;
						goodsInfoDtos.push({
							originalGoodsId: item.originalGoodsId,
							saleOrgId: saleOrgId
						});
						queryFinancial.push({
							saleOrgId: item.saleOrgId,
							productLineId: item.productLineId
						});
					});

					// 根据选择的商品信息 去询价格
					var priceData = {
						customer: viewModel.salesorderCard.getValue("customerId"),
						saleModel: viewModel.salesorderCard.getValue("saleModel"),
						tranType: viewModel.salesorderCard.getValue("orderTypeId"),
						goodsInfoDtos: goodsInfoDtos
					};

					$._ajax({
						url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
						data: JSON.stringify(priceData),
						contentType: "application/json;charset=UTF-8",
						type: "POST",
						success: function (resp) {
							var newData = [];
							for (var i = 0; i < resp.length; i++) {
								newData.push({
									salePrice: resp[i].baseDiscountPrice,
									basePrice: resp[i].basePrice,
									supplierPrice: resp[i].supplierPrice
								});
							}
							var data = $.extend(true, refValues, newData);
							viewModel.initData(data, "supplement");
						}
					});
				});
				viewModel.ItemRefList.off("productref.valuechange").on("productref.valuechange", function (obj) {
					// 清空参照时不增行
					if (!obj.newValue) {
						return;
					}
					var refer = $("#refContainerproductref").data("uui.refer");
					var refValues = refer.values;
					var goodsInfoDtos = [];
					var queryFinancial = [];
					var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					refValues.forEach(function (item) {
						item.goodsAttrVals = "";
						item.id = "";
						goodsInfoDtos.push({
							originalGoodsId: item.originalGoodsId,
							saleOrgId: saleOrgId
						});
						queryFinancial.push({
							saleOrgId: item.saleOrgId,
							productLineId: item.productLineId
						});
					});

					// 根据选择的商品信息 去询价格
					var priceData = {
						customer: viewModel.salesorderCard.getValue("customerId"),
						saleModel: viewModel.salesorderCard.getValue("saleModel"),
						tranType: viewModel.salesorderCard.getValue("orderTypeId"),
						goodsInfoDtos: goodsInfoDtos
					};

					$._ajax({
						url: window.pathMap.b2b + "/b2b/goods/find-price-by-goods",
						data: JSON.stringify(priceData),
						contentType: "application/json;charset=UTF-8",
						type: "POST",
						success: function (resp) {
							var newData = [];
							for (var i = 0; i < resp.length; i++) {
								newData.push({
									salePrice: resp[i].baseDiscountPrice,
									basePrice: resp[i].basePrice,
									supplierPrice: resp[i].supplierPrice
								});
							}
							var data = $.extend(true, refValues, newData);
							viewModel.initData(data);
						}
					});
				});
				// 客户订单类型 change
				viewModel.salesorderCard.off("orderTypeId.valuechange").on("orderTypeId.valuechange", function (obj) {
					var refer = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

					if (refer && refer.length > 0) {
						viewModel.salesorderCard.getCurrentRow().setValue("saleModel", refer[0].saleModelCode);
					}
					if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.orderTypeIdValueChange == 0) {
						common.dialog.confirmDialog({
							msg1: "修改或者删除订单类型，会造成订单清空！",
							msg2: "是否继续？",
							width: "400px",
							type: "error",
							onOk: function () {
								viewModel.orderTypeIdValueChange = 0;
								viewModel.saleOrderItems.removeAllRows();
								viewModel.batchSaleOrderBomItems.removeAllRows();
								viewModel.salesorderCard.setValue("offsetAmount", 0);
								viewModel.salesorderCard.setValue("totalDealAmount", 0);
								viewModel.salesorderCard.setValue("totalNum", 0);
							},
							onCancel: function () {
								viewModel.orderTypeIdValueChange = 1;
								viewModel.salesorderCard.setValue("orderTypeId", obj.oldValue);
							}
						});
					} else {
						viewModel.orderTypeIdValueChange = 0;
					}
					var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					var customerId = viewModel.salesorderCard.getValue("customerId");
					var orderType = obj.newValue;
					if (saleOrgId && customerId && orderType) {
						viewModel.queryAccount(saleOrgId, customerId, orderType);
					}
				});
				viewModel.salesorderCard.off("receiveCustomerId.valuechange").on("receiveCustomerId.valuechange", function (obj) {
					viewModel.salesorderCard.setValue("orderReceiveAddress", null);
					viewModel.salesorderCard.setValue("orderReceiveAddress", "display", null);
					viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", "");
					viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", "");
					viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", "");
					// viewModel.orderReceiveAddress.removeAllRows();
					var orgIdObj = {
						EQ_isEnable: 1,
						"EQ_customer.id": obj.newValue
					}
					$("#salesorderCard_orderReceiveAddress").parent().attr("data-refparam", JSON.stringify(orgIdObj)); // 地址
					// 根据客户查询默认地址 
					if (obj.newValue) {
						var ordertypeBody = {
							customerId: obj.newValue
						};
						viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", true);
						$("#salesorderCard_orderReceiveAddress").removeAttr("placeholder");
						$._ajax({
							type: "get",
							url: window.pathMap.base +
								"/base/customer-addresses/findByCustomerId",
							data: ordertypeBody,
							success: function (data) {
								if (!data || data.length == 0) {
									return;
								}
								var receiveAddress = data[0];
								if (receiveAddress) {
									viewModel.salesorderCard.setValue("orderReceiveAddress", receiveAddress.id);
									viewModel.salesorderCard.setValue("refshowcontent_orderReceiveAddress_name", receiveAddress.name);
									viewModel.orderReceiveAddress.setValue("receiveAddressId", receiveAddress.id);
									viewModel.orderReceiveAddress.setValue("receiver", receiveAddress.firstReceiver);
									viewModel.orderReceiveAddress.setValue("receiverTel", receiveAddress.firstReceiverTel);
									viewModel.orderReceiveAddress.setValue("receiverPhone", receiveAddress.firstReceiverPhone);
									viewModel.orderReceiveAddress.setValue("country", receiveAddress.countryName);
									viewModel.orderReceiveAddress.setValue("countryId", receiveAddress.countryId);
									viewModel.orderReceiveAddress.setValue("receiverProvince", receiveAddress.provinceName);
									viewModel.orderReceiveAddress.setValue("receiverProvinceId", receiveAddress.provinceId);
									viewModel.orderReceiveAddress.setValue("receiverCity", receiveAddress.cityName);
									viewModel.orderReceiveAddress.setValue("receiverCityId", receiveAddress.cityId);
									viewModel.orderReceiveAddress.setValue("receiverCounty", receiveAddress.countyName);
									viewModel.orderReceiveAddress.setValue("receiverCountyId", receiveAddress.countyId);
									viewModel.orderReceiveAddress.setValue("receiverTown", receiveAddress.townName);
									viewModel.orderReceiveAddress.setValue("receiverTownId", receiveAddress.townId);
									viewModel.orderReceiveAddress.setValue("receiverAddress", receiveAddress.detailAddr);

									viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", receiveAddress.firstReceiver);
									viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", receiveAddress.firstReceiverPhone);
									var adr = (receiveAddress.countryName || "") + (receiveAddress.provinceName || "") + (receiveAddress.cityName || "") + (receiveAddress.countyName || "") + (receiveAddress.townName || "") + (receiveAddress.detailAddr || "");
									viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_name", adr);
								}
							}
						});
					} else {
						viewModel.salesorderCard.setValue("orderReceiveAddress", "");
						viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", false);
						$("#salesorderCard_orderReceiveAddress").attr({
							placeholder: "请先选择客户"
						});
					}
				});
				// 客户 change
				viewModel.salesorderCard.off("customerId.valuechange").on("customerId.valuechange", function (obj) {
					var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					var orgIdObj = {
						EQ_isEnable: 1,
						"EQ_customer.id": obj.newValue
					}
					viewModel.salesorderCard.setValue("orderReceiveAddress", "");
					viewModel.salesorderCard.setValue("receiveCustomerId", obj.newValue);
					$("#salesorderCard_orderInvoice").parent().attr("data-refparam", JSON.stringify(orgIdObj)); // 发票	
					$("#salesorderCard_accountPeriodId").parent().attr("data-refparam", JSON.stringify(orgIdObj)); // 账期

					if (obj.newValue) {
						viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", true);
						viewModel.salesorderCard.setMeta("orderInvoice", "enable", true);
						$("#salesorderCard_orderReceiveAddress").removeAttr("placeholder");
						$("#salesorderCard_orderInvoice").removeAttr("placeholder");
					} else {
						viewModel.salesorderCard.setMeta("orderReceiveAddress", "enable", false);
						viewModel.salesorderCard.setMeta("orderInvoice", "enable", false);

						$("#salesorderCard_orderReceiveAddress").attr({
							placeholder: "请先选择客户"
						});
						$("#salesorderCard_orderInvoice").attr({
							placeholder: "请先选择客户"
						})
					}

					if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.customerIdValueChange == 0) {
						common.dialog.confirmDialog({
							msg1: "修改或者删除客户，会造成订单清空！",
							msg2: "是否继续？",
							width: "400px",
							type: "error",
							onOk: function () {
								var curRow = viewModel.salesorderCard.getCurrentRow();
								var customerId = curRow.getValue("customerId");
								viewModel.salesorderCard.setValue("orderInvoice", "display", null);
								viewModel.salesorderCard.setValue("receiveCustomerId", "");
								viewModel.salesorderCard.setValue("receiveCustomerId", "display", null);
								viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", "");
								viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", "");
								viewModel.salesorderCard.setValue("accountPeriodId", "");
								viewModel.salesorderCard.setValue("receiveCustomerId", obj.newValue);
								viewModel.saleOrderItems.removeAllRows();
								viewModel.batchSaleOrderBomItems.removeAllRows();
								viewModel.salesorderCard.setValue("offsetAmount", 0);
								viewModel.salesorderCard.setValue("totalDealAmount", 0);
								viewModel.salesorderCard.setValue("totalNum", 0);
								var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
								var customerId = obj.newValue;
								if (saleOrgId && customerId) {
									var ordertypeBody = {
										search_EQ_organization: saleOrgId,
										search_EQ_customer: customerId,
										search_EQ_saleModel: "01"
									};
									var jurisdictionsBody = {
										"search_IN_saleOrganization.id": saleOrgId,
										"search_IN_customer.id": customerId
									};
									// 查询对应的客户经理和部门
									viewModel.qureyCustomerManageAndOrderType(
										ordertypeBody,
										jurisdictionsBody
									);
								}
								// 根据客户查询开票单位
								if (customerId) {
									var ordertypeBody = {
										customerId: customerId
									};
									$._ajax({
										type: "get",
										url: window.pathMap.base +
											"/base/customer-invoices/findByCustomerId",
										data: ordertypeBody,
										success: function (data) {
											if (!data || data.length == 0) {
												return;
											}
											var orderInvoice = data[0];
											if (orderInvoice) {
												viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.id);
												viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
												viewModel.orderInvoice.setValue("invoiceType", orderInvoice.invoiceTypeName);
												viewModel.orderInvoice.setValue("invoiceTitle", orderInvoice.invoiceOrgName);
												viewModel.orderInvoice.setValue("invoiceBank", orderInvoice.bankName);
												viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
												viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceOrgName);
											}
										}
									});
									$._ajax({
										type: "get",
										url: window.pathMap.base +
											"/base/customer-managers/find-by-customer-id",
										data: ordertypeBody,
										success: function (data) {
											if (!data) {
												return;
											}
											var mgtCustomer = data; // {} 拿到上级客户的数据 赋值数据
											if (mgtCustomer) {
												viewModel.salesorderCard.setValue("superiorCustomerId", mgtCustomer.mgtCustomerId);
											}
										}
									});
									$._ajax({
										type: "get",
										url: window.pathMap.settlement +
											"/settlement/accountmatchs",
										data: {
											search_IN_customer: obj.newValue
										},
										success: function (data) {
											if (!data || data.content.length == 0) {
												return;
											}
											viewModel.salesorderCard.setValue("accountPeriodId", data.content[0].accountId);
										}
									});
								}
							},
							onCancel: function () {
								viewModel.customerIdValueChange = 1;
								viewModel.salesorderCard.setValue("customerId", obj.oldValue);
								viewModel.salesorderCard.setValue("receiveCustomerId", obj.oldValue);
							}
						});
					} else {
						viewModel.customerIdValueChange = 0;
						var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
						var customerId = obj.newValue;
						if (saleOrgId && customerId) {
							var ordertypeBody = {
								search_EQ_organization: saleOrgId,
								search_EQ_customer: customerId,
								search_EQ_saleModel: "01"
							};
							var jurisdictionsBody = {
								"search_IN_saleOrganization.id": saleOrgId,
								"search_IN_customer.id": customerId
							};
							// 查询对应的客户经理和部门
							viewModel.qureyCustomerManageAndOrderType(ordertypeBody, jurisdictionsBody);
						}
						// 根据客户查询开票单位、上级客户
						if (customerId) {
							var ordertypeBody = {
								customerId: customerId
							};
							$._ajax({
								type: "get",
								url: window.pathMap.base +
									"/base/customer-invoices/findByCustomerId",
								data: ordertypeBody,
								success: function (data) {
									if (!data || data.length == 0) {
										return;
									}
									var orderInvoice = data[0];
									if (orderInvoice) {
										viewModel.salesorderCard.setValue("orderInvoice", orderInvoice.id);
										viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
										viewModel.orderInvoice.setValue("invoiceType", orderInvoice.invoiceTypeName);
										viewModel.orderInvoice.setValue("invoiceTitle", orderInvoice.invoiceOrgName);
										viewModel.orderInvoice.setValue("invoiceBank", orderInvoice.bankName);
										viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
										viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceOrgName);
									}
								}
							});
							$._ajax({
								type: "get",
								url: window.pathMap.base + "/base/customer-managers/find-by-customer-id",
								data: ordertypeBody,
								success: function (data) {
									if (!data) {
										return;
									}
									var mgtCustomer = data; // {} 拿到上级客户的数据 赋值数据
									if (mgtCustomer) {
										viewModel.salesorderCard.setValue("superiorCustomerId", mgtCustomer.mgtCustomerId);
									}
								}
							});
							$._ajax({
								type: "get",
								url: window.pathMap.settlement + "/settlement/accountmatchs",
								data: {
									search_IN_customer: obj.newValue
								},
								success: function (data) {
									if (!data || data.content.length == 0) {
										return;
									}
									viewModel.salesorderCard.setValue("accountPeriodId", data.content[0].accountId);
								}
							});
						}
					}
					var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
					var customerId = obj.newValue;
					var orderType = viewModel.salesorderCard.getValue("orderTypeId");
					if (saleOrgId && customerId && orderType) {
						viewModel.queryAccount(saleOrgId, customerId, orderType);
					}
				});

				// 销售组织 change
				viewModel.salesorderCard.off("saleOrgId.valuechange").on("saleOrgId.valuechange", function (obj) {
					var saleOrgId = obj.newValue;
					var orgIdObj = {
						EQ_isEnable: 1,
						"EQ_organization.id": saleOrgId
					}
					var orgIdManageObj = {
						EQ_isEnable: 1,
						"EQ_personPosts.organization.id": saleOrgId
					}
					$("#salesorderCard_salesDeptId").parent().attr("data-refparam", JSON.stringify(orgIdObj));
					$("#salesorderCard_marketAreaId").parent().attr("data-refparam", JSON.stringify(orgIdObj));
					$("#salesorderCard_salesManagerId").parent().attr("data-refparam", JSON.stringify(orgIdManageObj));

					$("#salesorderCard_customerId").parent().attr("data-refparam", JSON.stringify({
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1",
						EQ_SaleOrder: saleOrgId
					}));
					$("#salesorderCard_receiveCustomerId").parent().attr("data-refparam", JSON.stringify({
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1",
						EQ_SaleOrder: saleOrgId
					}));

					if (obj.newValue != obj.oldValue && obj.oldValue && viewModel.saleOrgIdValueChange == 0) {
						common.dialog.confirmDialog({
							msg1: "修改或者删除销售组织，会造成订单清空！",
							msg2: "是否继续？",
							width: "400px",
							type: "error",
							onOk: function () {
								viewModel.salesorderCard.setValue("customerId", "");
								viewModel.salesorderCard.setValue("orderInvoice", "");
								viewModel.salesorderCard.setValue("orderReceiveAddress", "");
								viewModel.saleOrderItems.removeAllRows();
								viewModel.batchSaleOrderBomItems.removeAllRows();
								viewModel.salesorderCard.setValue("offsetAmount", 0);
								viewModel.salesorderCard.setValue("totalDealAmount", 0);
								viewModel.salesorderCard.setValue("totalNum", 0);
								if (saleOrgId && customerId) {
									var ordertypeBody = {
										search_EQ_organization: saleOrgId,
										search_EQ_customer: customerId,
										search_EQ_saleModel: "01"
									};
									var jurisdictionsBody = {
										"search_IN_saleOrganization.id": saleOrgId,
										"search_IN_customer.id": customerId
									};
									// 查询对应的客户经理和部门
									viewModel.qureyCustomerManageAndOrderType(
										ordertypeBody,
										jurisdictionsBody
									);
								}
								// 根据销售组织判断客户是否可点击
								if (saleOrgId) {
									$("#salesorderCard_customerId").removeAttr("placeholder");
									viewModel.salesorderCard.setMeta("customerId", "enable", true);
								} else {
									$("#customerId").attr("placeholder", "请先选择销售组织");
									viewModel.salesorderCard.setMeta("customerId", "enable", false);
								}
							},
							onCancel: function () {
								viewModel.saleOrgIdValueChange = 1;
								viewModel.salesorderCard.setValue("saleOrgId", obj.oldValue);
							}
						});
					} else {
						viewModel.saleOrgIdValueChange = 0;
					}
					// 根据销售组织判断客户是否可点击
					if (saleOrgId) {
						$("#salesorderCard_customerId").removeAttr("placeholder");
						viewModel.salesorderCard.setMeta("customerId", "enable", true);
						$("#salesorderCard_receiveCustomerId").removeAttr("placeholder");
						viewModel.salesorderCard.setMeta("receiveCustomerId", "enable", true);
					} else {
						$("#salesorderCard_customerId").attr("placeholder", "请先选择销售组织");
						viewModel.salesorderCard.setMeta("customerId", "enable", false);
						viewModel.salesorderCard.setMeta("receiveCustomerId", "enable", false);
					}

					var customerId = viewModel.salesorderCard.getValue("customerId");
					var saleOrgId = obj.newValue;
					var orderType = viewModel.salesorderCard.getValue("orderTypeId");
					if (saleOrgId && customerId && orderType) {
						viewModel.queryAccount(saleOrgId, customerId, orderType);
					}
				});

				// 收货地址 change
				viewModel.salesorderCard.off("orderReceiveAddress.valuechange").on("orderReceiveAddress.valuechange", function (obj) {
					var receiveAddress = common.getRefDataByDtAndKey("salesorderCard", "orderReceiveAddress");
					var addressSimple = viewModel.orderReceiveAddress.getSimpleData();
					var gridItemData = viewModel.saleOrderItems.getSimpleData();
					if (addressSimple.length == 0 || !addressSimple) {
						var simpleData = {
							receiveAddressId: "",
							receiver: "",
							receiverTel: "",
							receiverPhone: "",
							country: "",
							countryId: "",
							receiverProvince: "",
							receiverProvinceId: "",
							receiverCity: "",
							receiverCityId: "",
							receiverCounty: "",
							receiverCountyId: "",
							receiverTown: "",
							receiverTownId: "",
							receiverAddress: ""
						};
						viewModel.orderReceiveAddress.setSimpleData(simpleData);
					}
					if (!obj.newValue) {
						viewModel.orderReceiveAddress.setValue("dr", "1");
					}
					if (receiveAddress && receiveAddress.length > 0) {
						receiveAddress = receiveAddress[0]
						if (receiveAddress.refcode == "" && receiveAddress.refname == "" && receiveAddress.refpk == "") {
							viewModel.orderReceiveAddress.setValue("dr", "1");
							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", "");
							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", "");
						} else {
							viewModel.orderReceiveAddress.setValue("dr", "0");
							viewModel.salesorderCard.setValue("orderReceiveAddress", receiveAddress.id);

							viewModel.orderReceiveAddress.setValue("receiveAddressId", receiveAddress.id);
							viewModel.orderReceiveAddress.setValue("receiver", receiveAddress.firstReceiver);
							viewModel.orderReceiveAddress.setValue("receiverTel", receiveAddress.firstReceiverTel);
							viewModel.orderReceiveAddress.setValue("receiverPhone", receiveAddress.firstReceiverPhone);
							viewModel.orderReceiveAddress.setValue("country", receiveAddress.countryName);
							viewModel.orderReceiveAddress.setValue("countryId", receiveAddress.countryId);
							viewModel.orderReceiveAddress.setValue("receiverProvince", receiveAddress.provinceName);
							viewModel.orderReceiveAddress.setValue("receiverProvinceId", receiveAddress.provinceId);
							viewModel.orderReceiveAddress.setValue("receiverCity", receiveAddress.cityName);
							viewModel.orderReceiveAddress.setValue("receiverCityId", receiveAddress.cityId);
							viewModel.orderReceiveAddress.setValue("receiverCounty", receiveAddress.countyName);
							viewModel.orderReceiveAddress.setValue("receiverCountyId", receiveAddress.countyId);
							viewModel.orderReceiveAddress.setValue("receiverTown", receiveAddress.townName);
							viewModel.orderReceiveAddress.setValue("receiverTownId", receiveAddress.townId);
							viewModel.orderReceiveAddress.setValue("receiverAddress", receiveAddress.detailAddr);

							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiver", receiveAddress.firstReceiver);
							viewModel.salesorderCard.setValue("refrel_orderReceiveAddress_firstReceiverTel", receiveAddress.firstReceiverPhone);
						}
						// 添加承运商
						viewModel.findCarrierData(receiveAddress);
						// 根据是否启用调度中心来校验是否重新询库存组织和仓库
						if (viewModel.SysParams_stock) {
							setTimeout(function () {
								viewModel.findByWarehouse(receiveAddress);
							}, 0);
						}
					}
				});

				// 客户开票单位 change
				viewModel.salesorderCard.off("orderInvoice.valuechange").on("orderInvoice.valuechange", function (obj) {
					var orderInvoice = common.getRefDataByDtAndKey("salesorderCard", "orderInvoice");
					var invoiceSimple = viewModel.orderInvoice.getSimpleData();
					if (invoiceSimple.length == 0 || !invoiceSimple) {
						var simpleData = {
							invoiceId: "",
							invoiceType: "",
							invoiceTitle: "",
							invoiceBank: ""
						};
						viewModel.orderInvoice.setSimpleData(simpleData);
					}
					if (!obj.newValue) {
						viewModel.orderInvoice.setValue("dr", "1");
						viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", "");
						viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", "");
					}
					if (orderInvoice && orderInvoice.length > 0) {
						orderInvoice = orderInvoice[0];
						if (orderInvoice.refcode == "" && orderInvoice.refname == "" && orderInvoice.refpk == "") {
							;
							viewModel.orderInvoice.setValue("dr", "1");
						} else {
							viewModel.orderInvoice.setValue("dr", "0");
							viewModel.orderInvoice.setValue("invoiceId", orderInvoice.id);
							viewModel.orderInvoice.setValue("invoiceType", orderInvoice.invoiceTypeName);
							viewModel.orderInvoice.setValue("invoiceTitle", orderInvoice.invoiceOrgName);
							viewModel.orderInvoice.setValue("invoiceBank", orderInvoice.bankName);
							viewModel.salesorderCard.setValue("refrel_orderInvoice_invoiceOrgName", orderInvoice.invoiceOrgName);
							viewModel.salesorderCard.setValue("refshowcontent_orderInvoice_name", orderInvoice.invoiceOrgName);
						}
					}
				});

				// 商品数量改变 计算金额
				viewModel.saleOrderItems.off("orderNum.valuechange").on("orderNum.valuechange", function (obj) {
					var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
					// 计算商品行主数量、金额
					var rate = parseFloat(currRow.getValue("conversionRate") || "1");
					var mainNum = parseFloat(obj.newValue) * rate || 0;
					var salePrice = parseFloat(currRow.getValue("salePrice")) || 0;
					// 原价
					var orginalAmount = mainNum * salePrice
					/*
					* 促销后成交金额 = 促销价 * 主数量 - 促销金额(整单降价分摊)
					*/
					var isChangeDealPrice = true;
					var changeDealPrice = parseFloat(currRow.getValue("dealPrice")) || 0;
					var promPrice = parseFloat(currRow.getValue("promPrice")) || 0;
					var promAmount = parseFloat(currRow.getValue("promAmount") || "0")
					var dealAfterAmount = 0
					if (changeDealPrice > 0 && changeDealPrice != salePrice && promAmount == 0 && promPrice == 0) {
						isChangeDealPrice = false;
						salePrice = changeDealPrice;
						var dealAmount = changeDealPrice * mainNum || 0;
					} else {
						dealAfterAmount = (promPrice || salePrice) * mainNum || 0;
						var dealAmount = dealAfterAmount - promAmount;
					}
					var grossWeight = currRow.getValue("weight");
					var netWeight = currRow.getValue("netWeight");
					var rowWeight = mainNum * parseFloat(grossWeight || "0") || 0;
					var rowVolume = mainNum * parseFloat(currRow.getValue("volume") || "0") || 0;
					var rowNetWeight = mainNum * parseFloat(netWeight || "0") || 0;
					currRow.setValue("mainNum", mainNum);
					currRow.setValue("amount", orginalAmount);
					currRow.setValue("rowWeight", rowWeight);
					currRow.setValue("rowVolume", rowVolume);
					currRow.setValue("rowNetWeight", rowNetWeight);

					// 计算成交价  成本价计算方式   成交金额-促销金额-冲抵金额   /  数量
					if (isChangeDealPrice) var dealPrice = dealAmount && dealAmount > 0 ? dealAmount / mainNum || 0 : salePrice;
					if (currRow.getValue("isGift") != 1 && currRow.getValue("goodsSupplement") != 1) {
						if (isChangeDealPrice) currRow.setValue("dealPrice", dealPrice);
						currRow.setValue("dealAmount", dealAmount);
					} else {
						currRow.setValue("dealPrice", 0);
						currRow.setValue("dealAmount", 0);
					}
					// 计算合计金额、合计数量
					viewModel.computeHeadDataInfo();
					//联动bom数量
					var parentGoodsId = obj.rowObj.getValue("goodsId");
					var parentRowNum = obj.rowObj.getValue("rowNum");
					//获取全部bom信息
					var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
					for (var i = 0; i < bomdata.length; i++) {
						var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
						if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].goodsId !== parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
							var bomAmount = bomdata[i].childGoodsQty * obj.newValue;
							var bomMainNum = bomAmount * (bomdata[i].conversionRate || 1);
							var bomDealAmount = bomMainNum * (bomdata[i].dealPrice || bomdata[i].basePrice || 0);
							allrows[i].setValue("orderNum", bomAmount);
							allrows[i].setValue("mainNum", bomMainNum);
							allrows[i].setValue("dealAmount", bomDealAmount);
							allrows[i].setValue("amount", bomDealAmount);
						} else {
							if (allrows[i] && allrows[i].getValue("goodsId") === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
								var amount = obj.newValue;
								allrows[i].setValue("mainNum", amount * rate);
								allrows[i].setValue("orderNum", amount);
								allrows[i].setValue("dealAmount", dealAmount);
								allrows[i].setValue("amount", dealAmount);
								allrows[i].setValue("dealPrice", parseFloat(currRow.getValue("dealPrice")) || 0);
							}
						}
					}
				});
				// 赠品
				viewModel.saleOrderItems.off("isGift.valuechange").on("isGift.valuechange", function (obj) {
					var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
					var isChecked = currRow.getValue("isGift");
					var dealAmount = currRow.getValue("dealAmount");
					var totalDealAmount = viewModel.salesorderCard
						.getCurrentRow()
						.getValue("totalDealAmount");
					var offsetAmount = viewModel.salesorderCard
						.getCurrentRow()
						.getValue("offsetAmount");
					var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

					// 非费用货补订单：手工勾选表体的赠品标识后，表体价格系列（原价、净价）自动清0；
					if (isChecked == 0 && viewModel.isCostFlush == 0) {
						// 关闭赠品后重新 计算价格，
						var orderNum = currRow.getValue("orderNum");
						currRow.setValue("orderNum", 0.5);
						currRow.setValue("orderNum", orderNum);
						currRow.setValue("dealPrice", currRow.getValue("salePrice"));
						viewModel.costFreezeEvent(false);
					}
					if ("03" == orderType[0].saleModelCode) {
						currRow.setValue("dealPrice", 0);
						currRow.setValue("offsetAmount", 0);
						currRow.setValue("dealAmount", 0);
						viewModel.salesorderCard
							.getCurrentRow()
							.setValue(
								"totalDealAmount",
								parseFloat(totalDealAmount) - parseFloat(dealAmount)
							);
					}
					if ("03" != orderType[0].saleModelCode && isChecked == 1) {
						currRow.setValue("dealPrice", 0);
						currRow.setValue("dealAmount", 0);
						currRow.setValue("offsetAmount", 0);
						// currRow.setValue("salePrice", 0);
						viewModel.salesorderCard
							.getCurrentRow()
							.setValue(
								"totalDealAmount",
								parseFloat(totalDealAmount) - parseFloat(dealAmount)
							);
					}
					if ("03" == orderType[0].saleModelCode && isChecked == 1) {
						viewModel.salesorderCard
							.getCurrentRow()
							.setValue(
								"offsetAmount",
								parseFloat(offsetAmount) - parseFloat(dealAmount)
							);
					}
					//联动bom勾选
					var parentGoodsId = obj.rowObj.getValue("goodsId");
					var parentRowNum = obj.rowObj.getValue("rowNum");

					//获取全部bom信息
					var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
					for (var i = 0; i < bomdata.length; i++) {
						var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
						if (bomdata[i].parentGoodsId === parentGoodsId && bomdata[i].parentRowNum == parentRowNum) {
							allrows[i].setValue("isGift", obj.newValue);
						}
					}
					viewModel.computeHeadDataInfo(true);
				});
				// 830 成交价可编辑
				viewModel.saleOrderItems.off("dealPrice.valuechange").on("dealPrice.valuechange", function (obj) {
					// 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
					if (viewModel.isCostFlush != 0) {
						return;
					}
					var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
					var dealPriceOpt = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid.getColumnByField("dealPrice");
					if (dealPriceOpt && dealPriceOpt.options.editable) {
						var mainNum = parseFloat(currRow.getValue("mainNum"));
						var totalAmount = mainNum * parseFloat(obj.newValue);
						totalAmount = totalAmount ? totalAmount : 0;
						currRow.setValue("dealAmount", totalAmount);
					}
					viewModel.linkHeadAmount(viewModel.salesorderCard.getCurrentRow());
				});

				// 830 成交金额可编辑
				// viewModel.saleOrderItems.off("dealAmount.valuechange").on("dealAmount.valuechange", function (obj) {
				// 	// 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
				// 	if (viewModel.isCostFlush != 0) {
				// 		return;
				// 	}
				// 	var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
				// 	var dealPriceOpt = viewModel.app.getComp("grid_template_edituigrid_saleOrderItems").grid.getColumnByField("dealPrice");
				// 	if (dealPriceOpt.options.editable) {
				// 		var rate = parseFloat(currRow.getValue("conversionRate") || "1");
				// 		var mainNum = parseFloat(currRow.getValue("mainNum"));
				// 		var dealPrice = (parseFloat(obj.newValue)) / mainNum;

				// 		dealPrice = dealPrice ? dealPrice : 0;
				// 		currRow.setValue("dealPrice", dealPrice);
				// 	}
				// 	viewModel.linkHeadAmount(viewModel.salesorderCard.getCurrentRow());
				// });

				// 830 单价可修改
				viewModel.saleOrderItems.off("salePrice.valuechange").on("salePrice.valuechange", function (obj) {
					// 有促销或费用冲抵时，不可编辑成交金额，不再处理监听事件
					if (viewModel.isCostFlush != 0) {
						return;
					}
					var currRow = viewModel.saleOrderItems.getRowByRowId(obj.rowId);
					var orderNum = currRow.getValue("orderNum") || 0;
					if (orderNum == 0) {
						currRow.setValue("dealPrice", obj.newValue);
					}
					currRow.setValue("orderNum", orderNum);
					// 计算合计表头总原价
					var orderItems = viewModel.saleOrderItems.getSimpleData();
					var arr = [];
					for (var i = 0; i < orderItems.length; i++) {
						if (orderItems[i].dr != 1) {
							arr.push(orderItems[i]);
						}
					}
					var totalAmount = 0;
					for (var i = 0; i < arr.length; i++) {
						totalAmount += parseFloat(arr[i].mainNum * parseFloat(arr[i].salePrice) || 0);
					}
					viewModel.salesorderCard.getCurrentRow().setValue("totalAmount", totalAmount);
					//联动bom单价
					var parentGoodsId = obj.rowObj.getValue("goodsId");
					var parentRowNum = obj.rowObj.getValue("rowNum");
					//获取全部bom信息
					var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
					var salePrice = obj.newValue;
					for (var i = 0; i < bomdata.length; i++) {
						var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
						if (
							bomdata[i].parentGoodsId === parentGoodsId &&
							bomdata[i].goodsId !== parentGoodsId &&
							bomdata[i].parentRowNum == parentRowNum
						) {
							allrows[i].setValue("salePrice", salePrice);
						} else {
							if (
								allrows[i] &&
								allrows[i].getValue("goodsId") === parentGoodsId &&
								bomdata[i].parentRowNum == parentRowNum
							) {
								allrows[i].setValue("salePrice", salePrice);
							}
						}
					}
				});
				// 库存组织联动仓库
				viewModel.saleOrderItems.off('deliveryInvOrgId.valuechange').on('deliveryInvOrgId.valuechange', function (obj) {
					var currRow = viewModel.saleOrderItems.getRowByRowId(
						obj.rowId
					);
					if (currRow) {
						currRow.setValue("deliveryWarehouseId", null);
						currRow.setMeta("deliveryWarehouseId", 'display', null);
					}
					if (!currRow.getValue("goodsId")) return;
					var currentData = currRow.getSimpleData();
					currentData.description = "";
					if (obj.newValue) {
						var stockData = {
							customer: viewModel.salesorderCard.getValue("customerId"),
							saleModel: viewModel.salesorderCard.getValue("saleModel"),
							orderItemDtos: [currentData]
						};

						$._ajax({
							url: window.pathMap.b2b + "/b2b/order/stock",
							data: JSON.stringify(stockData),
							contentType: "application/json;charset=UTF-8",
							type: "POST",
							success: function (resp) {
								var num = resp ? (resp[currRow.getValue("goodsId")] || "") : "";
								if (num) {
									currRow.setValue("existingNum", num.onhandNum)
									currRow.setValue("availableNum", num.availableNum)
								}
							}
						});
					}
				});
				viewModel.saleOrderItems.off('deliveryWarehouseId.valuechange').on('deliveryWarehouseId.valuechange', function (obj) {
					var currRow = viewModel.saleOrderItems.getRowByRowId(
						obj.rowId
					);
					if (!currRow.getValue("goodsId")) return;
					if (obj.newValue) {
						var currentData = currRow.getSimpleData();
						currentData.description = "";
						var stockData = {
							customer: viewModel.salesorderCard.getValue("customerId"),
							saleModel: viewModel.salesorderCard.getValue("saleModel"),
							orderItemDtos: [currentData]
						};

						$._ajax({
							url: window.pathMap.b2b + "/b2b/order/stock",
							data: JSON.stringify(stockData),
							contentType: "application/json;charset=UTF-8",
							type: "POST",
							success: function (resp) {
								var num = resp ? (resp[currRow.getValue("goodsId")] || "") : "";
								if (num) {
									currRow.setValue("existingNum", num.onhandNum)
									currRow.setValue("availableNum", num.availableNum)
								}
							}
						});
					}
				});
				// 关闭原因枚举查询
				$._ajax({
					type: "get",
					url: window.pathMap.base + "/cust-doc-defs/cust_doc_code/batch",
					data: {
						cust_doc_code_batch: "QY034,QY077,QY102,QY103,QY104"
					},
					success: function (data) {
						var combodata = common.dataconvert.toMap(data["QY034"], "name", "id");
						viewModel.accountTypeSrc(combodata);
						var combodata1 = common.dataconvert.toMap(
							data["QY077"],
							"name",
							"code"
						);
						viewModel.closeReasonSrc(combodata1);
						var combodata2 = common.dataconvert.toMap(
							data["QY102"],
							"name",
							"code"
						);
						var combodata3 = common.dataconvert.toMap(
							data["QY103"],
							"name",
							"code"
						);
						var combodata4 = common.dataconvert.toMap(
							data["QY104"],
							"name",
							"code"
						);
						viewModel.arrivalBelongDataSource(combodata2);
						viewModel.orderTypeSource(combodata3);
						viewModel.purchaseTypeSource(combodata4);
					}
				});
				// 查询金额单位精度，币符
				$._ajax({
					url: window.pathMap.base + "/currency",
					data: {
						size: 999,
						page: 0
					},
					success: function (resp) {
						var data = resp.content;
						for (var i = 0; i < data.length; i++) {
							if (data[i].isDefault == 1 && data[i].isEnable == 1) {
								viewModel.CURRENCY = data[i];
								viewModel.priceFormater = new u.NumberFormater(data[i].pricePrecision || 2),
									viewModel.amountFormater = new u.NumberFormater(data[i].amountPrecision || 2),
									// 单价类
									viewModel.saleOrderItems.setMeta(
										"salePrice",
										"precision",
										data[i].pricePrecision
									); // 原价
								viewModel.saleOrderItems.setMeta(
									"promPrice",
									"precision",
									data[i].pricePrecision
								); // 促销价
								viewModel.saleOrderItems.setMeta(
									"dealPrice",
									"precision",
									data[i].pricePrecision
								); // 成交价
								// 金额类
								viewModel.saleOrderItems.setMeta(
									"offsetAmount",
									"precision",
									data[i].amountPrecision
								); // 冲抵金额
								viewModel.saleOrderItems.setMeta(
									"dealAmount",
									"precision",
									data[i].amountPrecision
								); // 成交金额
								viewModel.saleOrderItems.setMeta(
									"promAmount",
									"precision",
									data[i].amountPrecision
								); // 促销折扣额
								// 费用账户列表进度处理
								viewModel.setAccountScale();
								i = data.length;
							}
						}
					}
				});
				// 商品添加
				viewModel.saleOrderItems.off('goodsId.valuechange').on('goodsId.valuechange', function (obj) {
					// rowid 可能会变，最外层做判断货补使用
					var supplementRow = viewModel.saleOrderItems.getRowByRowId(
						obj.rowId
					);
					if (supplementRow.getValue("goodsSupplement") == 1) return;
					if (viewModel.isSearchprom == 1) {
						return
					}
					var refer = $("#refContainergoodsId").data("uui.refer");
					var refValues = refer.values;
					if (obj.newValue) {
						var newValueArr = obj.newValue.split(',');
						if (newValueArr.length == 1) {
							var tData = "";
							if (refValues) {
								if (refValues[0].itemVal) {
									tData = [refValues[0].itemVal]
								} else {
									tData = refValues.filter(function (refItem) {
										return refItem.refpk == obj.newValue;
									});
								}
							} else {
								tData = [viewModel.saleOrderItems.getRowByRowId(obj.rowId).getSimpleData()];
							}
							var currentRow = viewModel.saleOrderItems.getRowByRowId(
								obj.rowId
							);
							var goodsInfoDtos = [];
							var queryFinancial = [];
							var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");

							tData.forEach(function (item) {
								goodsInfoDtos.push({
									originalGoodsId: item.originalGoodsId || item.refpk,
									saleOrgId: saleOrgId
								});
								item.id = "";
								item.goodsAttrVals = '';
								queryFinancial.push({
									saleOrgId: saleOrgId,
									productLineId: item.productLineId
								});
							});
							// 根据选择的商品信息 去询价格
							var priceData = {
								customer: viewModel.salesorderCard.getValue("customerId"),
								saleModel: viewModel.salesorderCard.getValue("saleModel"),
								tranType: viewModel.salesorderCard.getValue("orderTypeId"),
								goodsInfoDtos: goodsInfoDtos
							}
							$._ajax({
								url: window.pathMap.b2b + '/b2b/goods/find-price-by-goods',
								data: JSON.stringify(priceData),
								contentType: 'application/json;charset=UTF-8',
								type: 'POST',
								success: function (resp) {
									var newData = [];
									for (var i = 0; i < resp.length; i++) {
										newData.push({
											salePrice: resp[i].baseDiscountPrice,
											basePrice: resp[i].basePrice,
											supplierPrice: resp[i].supplierPrice
										});
									}
									var data = $.extend(true, tData, newData);
									initData(data, currentRow);
								}
							});
						} else {
							setTimeout(function () {
								var currentRow = viewModel.saleOrderItems.getRowByRowId(
									obj.rowId
								);
								var currentData = [],
									data = [],
									status = "new";
								var isCurrentRow = true;
								for (var i = 0; i < refValues.length; i++) {
									var itemData = {
										goodsId: refValues[i].refpk,
									};
									if (refValues[i].refpk == currentRow.getValue("goodsId") && isCurrentRow) {
										currentData.push(itemData);
										isCurrentRow = false;
										status = currentRow.getSimpleData().persistStatus == "new" ? "new" : "upd";
									} else {
										data.push(itemData)
									}
								}
								viewModel.saleOrderItems.addSimpleData(currentData, status);
								viewModel.saleOrderItems.addSimpleData(data, 'new');
								currentRow.setValue("dr", "1");
								viewModel.saleOrderItems.removeRows(currentRow);
								var parentRowNum = currentRow.getValue("rowNum");
								var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
								allBomRows.forEach(function (item) {
									if (item.getValue("parentRowNum") == parentRowNum) {
										viewModel.batchSaleOrderBomItems.removeRows(item);
										item.setValue("dr", "1");
									}
								})
							}, 100);
						}
					} else {
						var currentRow = viewModel.saleOrderItems.getRowByRowId(
							obj.rowId
						);
						var parentRowNum = currentRow.getValue("rowNum");
						var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
						allBomRows.forEach(function (item) {
							if (item.getValue("parentRowNum") == parentRowNum) {
								viewModel.batchSaleOrderBomItems.removeRows(item);
								item.setValue("dr", "1");
							}
						})
					}

					function initData(data, currentRow) {
						if (data && data.length > 0) {
							for (var i = 0; i < data.length; i++) {
								data[i].ts = "";
								data[i].creationTime = "";
								data[i].modifiedTime = "";
								var rowNum = currentRow.getValue("rowNum") ? currentRow.getValue("rowNum") : viewModel.generaterowNum();
								var newrow = ""
								if (data.length > 1) {
									var newrow = viewModel.saleOrderItems.createEmptyRow({
										unSelect: true
									});
								} else {
									newrow = currentRow;
									var productId = currentRow.getValue("goodsId");
									var parentRowNum = currentRow.getValue("rowNum");
									var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
									allBomRows.forEach(function (item) {
										if ((item.getValue("parentGoodsId") === productId || item.getValue("goodsId") === productId) && item.getValue("parentRowNum") == parentRowNum) {
											viewModel.batchSaleOrderBomItems.removeRows(item);
											item.setValue("dr", "1");
										}
									})
								}
								var id = data[i].refpk || data[i].goodsId;
								data[i].planDeliveryDate = new Date().getTime();
								var saleModel = viewModel.salesorderCard.getValue("saleModel");
								if (saleModel == "03") {
									newrow.setValue("isGift", 1);
									$(".u-checkbox-input").attr("disabled", "disabled");
								} else {
									if (data[i].isGift == 1) {
										newrow.setValue("isGift", 1);
									} else {
										newrow.setValue("isGift", 0);
									}
									$(".u-checkbox-input").removeAttr("disabled");
								}
								newrow.setValue("rowNum", rowNum);
								newrow.setValue("basePrice", data[i].basePrice);
								newrow.setValue("conversionRate", data[i].conversionRate);
								newrow.setValue("deliveryInvOrgId", data[i].inventoryOrgId || data[i].deliveryInvOrgId);
								newrow.setValue("refshowcontent_deliveryInvOrgId_name", data[i].inventoryOrgName || data[i].deliveryInvOrgName);
								newrow.setValue("refrel_goodsId_code", data[i].refcode || data[i].goodsCode);
								newrow.setValue("refrel_goodsId_name", data[i].refname || data[i].goodsName);
								newrow.setValue("refshowcontent_goodsId_name", data[i].refname || data[i].goodsName || data[i].refshowcontent_goodsId_name);
								newrow.setValue("goodsName", data[i].refname || data[i].goodsName);
								newrow.setValue("goodsCode", data[i].refcode || data[i].goodsCode);
								newrow.setValue("goodsImg", data[i].mainPictureFileUrl);
								newrow.setValue("goodsDisplayName", data[i].displayName || data[i].refname);
								newrow.setValue("isOptional", data[i].isOptional);
								newrow.setValue("mainNumUnitId", data[i].basicUnitId || data[i].mainNumUnitId);
								newrow.setValue("refshowcontent_mainNumUnitId_name", data[i].basicUnitName || data[i].mainNumUnitName || data[i].refshowcontent_mainNumUnitId_name);
								newrow.setValue("netWeight", data[i].netWeight);
								newrow.setValue("orderNumUnitId", data[i].assistUnitId || data[i].orderNumUnitId);
								newrow.setValue("refshowcontent_orderNumUnitId_name", data[i].assistUnitName || data[i].orderNumUnitName || data[i].refshowcontent_orderNumUnitId_name);
								newrow.setValue("originalGoodsId", data[i].originalGoodsId);
								newrow.setValue("productId", data[i].productId);
								newrow.setValue("productLineId", data[i].productLineId);
								newrow.setValue("refshowcontent_productLineId_name", data[i].productLineName || data[i].refshowcontent_productLineId_name);
								newrow.setValue("salePrice", data[i].salePrice);
								newrow.setValue("supplierPrice", data[i].supplierPrice);
								newrow.setValue("settleFinancialOrgId", data[i].settleFinancialOrgId);
								newrow.setValue("refshowcontent_settleFinancialOrgId_name", data[i].settleFinancialOrgName || data[i].refshowcontent_settleFinancialOrgId_name);
								newrow.setValue("version", data[i].version);
								newrow.setValue("volume", data[i].volume);
								newrow.setValue("volumeUnitId", data[i].volumeUnitId);
								newrow.setValue("weightUnitId", data[i].weightUnitId);

								newrow.setValue("weight", data[i].grossWeight || data[i].weight);
								newrow.setValue("netWeight", data[i].netWeight);

								data[i].orderNum && data[i].orderNum > 0 ? newrow.setValue("orderNum", data[i].orderNum) : newrow.setValue("orderNum", 0);
								newrow.setValue("isClose", 0);
								newrow.setValue("isDeClose", 0);
								data[i].goodsSupplement && data[i].goodsSupplement > 0 ? newrow.setValue("goodsSupplement", 1) : newrow.setValue("goodsSupplement", 0);

								var id = data[i].refpk;
								//bom产品信息的添加
								var bomdata = viewModel.findBomByParentId(id);
								if (bomdata && bomdata.length > 0) {
									var bomItem = bomdata[0].goodsBomChildren;
									var bomItemData = []
									for (var j = 0; j < bomItem.length; j++) {
										var item = bomItem[j];
										var parentRowNum = rowNum;
										if (item.isOptional == 1) {
											newrow.setValue('isOptional', 1);
											newrow.setValue("baseGoodsOptValue", '  ');
										}
										var mainNum = newrow.getValue("mainNum");
										var orderNum = newrow.getValue("orderNum");
										var bomRowNum = viewModel.generateBomrowNum();
										var parentGoodsId = newrow.getValue("goodsId");
										var parentGoodsCode = newrow.getValue("goodsCode");
										var parentGoodsName = newrow.getValue("goodsName");
										item.refrel_parentGoodsId_name = parentGoodsName;
										item.refrel_parentGoodsId_code = parentGoodsCode;
										item.refshowcontent_parentGoodsId_name = parentGoodsName;
										item.id = null;
										item.goodsName = item.childGoodsName;
										item.goodsId = item.childGoodsId;
										item.refshowcontent_goodsId_name = item.childGoodsName;
										item.goodsCode = item.childGoodsCode;
										item.version = item.childGoodsVersion;
										item.childGoodsQty = item.childGoodsQty;
										item.mainNumUnitId = item.childGoodsUnitId;
										item.refshowcontent_mainNumUnitId_name = item.childGoodsUnitName;
										item.orderNumUnitId = item.childGoodsUnitId;
										item.refshowcontent_orderNumUnitId_name = item.childGoodsUnitName;
										item.orderNum = orderNum * item.childGoodsQty || 0;
										item.mainNum = mainNum * item.childGoodsQty || 0;
										item.parentRowNum = rowNum;
										item.rowNum = bomRowNum;
										item.isGift = 0;
										item.baseGoodsOptId = '';
										item.baseGoodsOptValue = '';
										item.parentGoodsId = data[i].refpk;
										item.mainNum = '';
										viewModel.currowBomNum(bomRowNum);
										bomItemData.push(item);
									}
									viewModel.batchSaleOrderBomItems.addSimpleData(bomItemData, {
										unSelect: true,
										status: 'new'
									});
								} else {
									var parentRowNum = rowNum;
									var bomRowNum = viewModel.generateBomrowNum();
									var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
									cpRow.setSimpleData(newrow.getSimpleData(), {
										status: "new"
									});
									var parentGoodsId = cpRow.getValue("goodsId");
									var parentGoodsCode = cpRow.getValue("goodsCode");
									var parentGoodsName = cpRow.getValue("goodsName");
									cpRow.setValue("rowNum", bomRowNum);
									cpRow.setValue("parentRowNum", parentRowNum);
									cpRow.setValue("parentGoodsId", parentGoodsId);
									cpRow.setValue("refshowcontent_parentGoodsId_name", parentGoodsName);
									cpRow.setValue("refrel_parentGoodsId_name", parentGoodsName);
									cpRow.setValue("refrel_parentGoodsId_code", parentGoodsCode);
									cpRow.setValue("refshowcontent_goodsId_name", parentGoodsName);
									cpRow.setValue("refrel_goodsId_name", parentGoodsName);
									cpRow.setValue("refrel_goodsId_code", parentGoodsCode);

									cpRow.setValue("refshowcontent_mainNumUnitId_name", newrow.getValue("refshowcontent_mainNumUnitId_name"));
									cpRow.setValue("refshowcontent_orderNumUnitId_name", newrow.getValue("refshowcontent_orderNumUnitId_name"));
									cpRow.setValue("parentGoodsName", parentGoodsName);
									cpRow.setValue("childGoodsQty", 1);
									var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
									getRow.forEach(function (item) {
										item.persistStatus = "new";
									});
								}
							}
							viewModel.findCarrierData();
							if (viewModel.SysParams_stock) {
								setTimeout(function () {
									viewModel.findByWarehouse();
								}, 0);
							}
							// setTimeout(function() {
							// 	viewModel.editTemplate.updateExtendData();
							// }, 1000)
						}
					}
				});
			},
			matchPreferentialRadio: function (saleOrgId, flag) {
				$._ajax({
					url: window.pathMap.b2b + "/b2b/order-control-rule/find-preferentialRatio",
					data: {
						saleOrgId: saleOrgId
					},
					contentType: "application/json;charset=UTF-8",
					type: "get",
					success: function (data) {
						if (typeof data == "number") {
							viewModel.preferentialRatio = +data;
							if (flag == "edit") {
								viewModel.setMaxPreferentialMoney(viewModel.salesorderCard);
							}
						}
					}
				});
			},
			setMaxPreferentialMoney: function (card, flag, noValid) {
				var totalAmount = 0;
				var totalDealAmount = 0;
				var orderItems = viewModel.saleOrderItems.getSimpleData();
				for (var i = 0; i < orderItems.length; i++) {
					if (orderItems[i].dr == 1) continue;
					// 过滤赠品行，货补行
					if (viewModel.ifOffsetGoods(orderItems[i])) {
						totalDealAmount += orderItems[i].dealAmount ? parseFloat(orderItems[i].dealAmount) : 0;
					}
					totalAmount += parseFloat(viewModel.amountFormater.format(parseFloat(orderItems[i].mainNum) * parseFloat(orderItems[i].salePrice) || 0));
				}
				// var orderType = viewModel.salesorderCard.getCurrentRow().getValue("orderTypeId");
				var orderType = common.getRefDataByDtAndKey("salesorderCard", "orderTypeId");

				// 暂时保留，后续可去除
				if (orderType && "03" == orderType[0].saleModelCode) {
					totalDealAmount = 0;
				}
				var maxPreferentialMoney = parseFloat(totalAmount * viewModel.preferentialRatio - (totalAmount - totalDealAmount)).toFixed(8);
				var msg = "请调整！";
				switch (flag) {
					case "fee":
						msg = "请调整费用冲抵！";
						break;
					case "prom":
						msg = "请调整促销！";
						break;
					case "supplement":
						msg = "请调整货补！";
						break;
				}
				if (maxPreferentialMoney < 0) {
					if (!noValid) {
						toastr.warning("超出订单最大可优惠金额，" + msg);
					}
				}
				// card.setValue("maxPreferentialMoney", maxPreferentialMoney);
			},
			// 极少场景下，商品原始版本主键丢失
			fillOriginalGoodsId: function (goods) {
				if (goods) {
					if (goods.originalGoodsId) {
						return goods.originalGoodsId;
					} else {
						if (goods.version == 1) {
							return goods.id;
						}
					}
				}
				return null;
			},
			removeAllRowsAfter: function () {
				var allRows = viewModel.saleOrderItems.getAllRows();
				allRows.forEach(function (row, index) {
					row.setValue("dr", "1");
					var productId = row.getValue("goodsId"),
						rowNum = row.getValue("rowNum"),
						allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
					allBomRows.forEach(function (item, index) {
						if (
							(item.getValue("parentGoodsId") === productId ||
								item.getValue("goodsId") === productId) &&
							item.getValue("parentRowNum") == rowNum
						) {
							item.setValue("dr", "1");
							viewModel.batchSaleOrderBomItems.removeRows(item);
						}
					});
				});
			},
			// 检验前事件
			checkSaleOrderSave: function (checkData, callback) {
				checkData = checkData ? checkData : {};
				$._ajax({
					url: appCtx + viewModel.baseurl + "/check",
					type: "GET",
					data: checkData,
					success: function (resp) {
						viewModel.creditCheck = resp.credit; // 信用
						viewModel.stock = resp.stock; // 可用量
						if (viewModel.stock && viewModel.stock.length > 0) {
							$("#checkOk2")[0].innerHTML = "下一步";
						} else if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
							$("#checkOk2")[0].innerHTML = "保存";
						}
						if (viewModel.creditCheck != undefined && viewModel.creditCheck.length > 0) {
							checkCredit()
						} else if (viewModel.stock && viewModel.stock.length > 0) {
							checkStock()
						} else {
							callback(checkData)
						}
						//保存时信用弹框
						function checkCredit() {
							var creditCheck = viewModel.creditCheck;
							if (!viewModel.dialogSaveBilldialog2 && creditCheck != undefined && creditCheck.length > 0) {
								viewModel.dialogSaveBilldialog2 = u.dialog({
									id: "dialog_save_bill2",
									content: "#dialog_save_bill2",
									hasCloseMenu: true,
									width: "1000px"
								});
							} else {
								viewModel.dialogSaveBilldialog2.show();
							}
							viewModel.saveCheckCreditDetailItems.setSimpleData(creditCheck)
							var okButton2 = $("#dialog_save_bill2 .J-ok");
							okButton2.off().on("click", function () {
								viewModel.dialogSaveBilldialog2.close();
								if (viewModel.stock && viewModel.stock.length > 0) {
									checkStock()
								} else {
									callback(checkData)
								}
							})
							var cancelButton2 = $("#dialog_save_bill2 .J-cancel");
							cancelButton2.off().on("click", function () {
								viewModel.dialogSaveBilldialog2.close();
							});
							viewModel.dialogSaveBilldialog2.show();
						}

						function checkStock() {
							var stock = viewModel.stock;
							if (!viewModel.dialogSubmitBill) {
								viewModel.dialogSubmitBill = u.dialog({
									id: "dialog_submit_bill",
									content: "#dialog_submit_bill",
									hasCloseMenu: true,
									width: "800px"
								});
							} else {
								viewModel.dialogSubmitBill.show();
							}
							var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
							var temp = "<div style='padding-left: 20px'>" +
								stock.map(function (item) {
									var unitList = "",
										precision = 0;
									if (_A_P_unit && _A_P_unit.length > 0) {
										unitList = _A_P_unit.filter(function (r) {
											return r.unitId == item.unit;
										});
									}
									if (unitList && unitList.length > 0) {
										precision = unitList[0].precision;
									}
									var willAmount = new u.NumberFormater(precision).format(parseFloat(item.willAmount));
									var avaAmount = new u.NumberFormater(precision).format(parseFloat(item.avaAmount));
									var html = "<div style='margin-top: 10px'>商品：" + item.goodsName + "可用量不足，本次需要 " + willAmount + "，当前可用 " + avaAmount + "</div>";
									return html
								}).join('') +
								"</div>";
							$("#submit_stock")[0].innerHTML = temp;
							var okButton = $("#dialog_submit_bill .J-ok");
							okButton.off().on("click", function () {
								viewModel.dialogSubmitBill.close();
								callback(checkData)
							})
							var cancelButton = $("#dialog_submit_bill .J-cancel");
							cancelButton.off().on("click", function () {
								viewModel.dialogSubmitBill.close();
							});
						}
					}
				});
			},
		};
	};
	return events;
});
// 。