define(["ocm_common"], function(common) {
	"use strict";
	var events = function(viewModel) {
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
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能提交");
				}
			},
			UNSUBMIT: {
				needCode: "02",
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能收回");
				}
			},
			APPROVE: {
				needCode: "02",
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能审批");
				}
			},
			UNAPPROVE: {
				needCode: "04",
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态，不能取消审批");
				}
			},
			PUSH: {
				needCode: "04",
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态，不能推发货单");
				}
			},
			CLOSE: {
				needCode: "04",
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态，不能打开");
				}
			},
			OPEN: {
				needCode: 0,
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是审批状态、出库状态，不能关闭");
				}
			},
			REJECT: {
				needCode: "01",
				errmsg: function(s) {
					toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能驳回");
				}
			}
		};
		return {
			checkEmpty: function() {
				var allItemRows = viewModel.saleOrderItems.getAllRealRows();
				var emptyGoodsOptRows = "";
				if (allItemRows.length > 0) {
					allItemRows.forEach(function(item) {
						if (!item.getValue("baseGoodsOptId") &&
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
			search: function(reindex, callback) {
				if (reindex) {
					viewModel.salesorderList.pageIndex(0);
				}
				viewModel.salesorderList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr ?
					viewModel.searchcomp.getDataWithOpr() : {};
				var pageSize = viewModel.salesorderList.pageSize();
				var pageNumber = viewModel.salesorderList.pageIndex();
				var searchindex = viewModel.tabindex;
				// if (searchindex == 1) {
				//   queryData["search_IN_billStatus"] = billstatus.COMMITTED;
				// }
				// else if (searchindex == 2) {
				//   queryData["search_IN_billStatus"] = billstatus.APPROVED;
				// }
				// else if (searchindex == 3) {
				//   queryData["search_IN_billStatus"] = billstatus.FINISHED;
				// }
				queryData.page = pageNumber;
				queryData.size = pageSize;
				// queryData["search_EQ_isVso"] = 0;
				// queryData["search_IN_soType.saleBusinessType"] = "01,03";

				//处理从首页跳转过来的情况下，带来的全局参数（afterCreate中保存的参数）
				if (viewModel.globalQueryData && viewModel.globalQueryData.length > 0) {
					for (var i = 0; i < viewModel.globalQueryData.length; i++) {
						queryData[viewModel.globalQueryData[i].key] =
							viewModel.globalQueryData[i].value;
					}
				}
				// if(!queryData.search_EQ_orderType) {
				//     queryData.search_IN_orderType = "GeneralSale, FeeGoodsSubsidy";
				// }
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
					success: function(data) {
						viewModel.salesorderList.setSimpleData(data.content, {
							unSelect: true
						});
						viewModel.salesorderList.totalRow(data.totalElements);
						viewModel.salesorderList.totalPages(data.totalPages);
						if (callback && typeof callback == "function") {
							callback();
						}
					}
				});
			},
			//导出
			exportHandle: function() {
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
			//删除和批量删除
			del: function(data, rowId) {
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
						onOk: function() {
							viewModel.del_ajax(rows);
						}
					});
				} else {
					toastr.warning("请先选择一行数据");
				}
			},
			// 计算表头合计数据
			computeHeadDataInfo: function(noValidPreferential) {
				var orderItems = viewModel.saleOrderItems.getSimpleData();
				// 计算表头货补优惠金额
				var supplementItems = orderItems.filter(function(item) {
					return item.dr != 1 && item.goodsSupplement && item.goodsSupplement == 1;
				});
				if (supplementItems && supplementItems.length > 0) {
					var totalGoodsSuppleAmount = 0;
					supplementItems.forEach(function(item) {
						totalGoodsSuppleAmount += parseFloat(item.mainNum * item.salePrice || 0);
					});
					viewModel.salesorderCard.getCurrentRow().setValue("totalGoodsSuppleAmount", viewModel.amountFormater.format(totalGoodsSuppleAmount));
				}
				// 表头合计
				var totalAmount = 0;
				var totalDealAmount = 0;
				var totalNum = 0;
				var totalWeight = 0;
				var totalVolume = 0;
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
				}
				viewModel.salesorderCard.getCurrentRow().setValue("totalNum", totalNum);
				viewModel.salesorderCard.getCurrentRow().setValue("totalWeight", totalWeight);
				viewModel.salesorderCard.getCurrentRow().setValue("totalVolume", totalVolume);

				var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
				// 暂时保留，后续可去除
				if (orderType && "03" == orderType[0].saleModelCode) {
					totalDealAmount = 0;
				}
				viewModel.salesorderCard.getCurrentRow().setValue("totalDealAmount", totalDealAmount);
				viewModel.salesorderCard.getCurrentRow().setValue("totalAmount", totalAmount);
				// 计算促销金额
				var offsetAmount = parseFloat(viewModel.salesorderCard.getCurrentRow().getValue("offsetAmount") || "0");
				var totalGoodsSuppleAmount = parseFloat(viewModel.salesorderCard.getCurrentRow().getValue("totalGoodsSuppleAmount") || "0");
				var totalPromAmout = totalAmount - totalDealAmount - offsetAmount - totalGoodsSuppleAmount;
				viewModel.salesorderCard.getCurrentRow().setValue("promAmount", totalPromAmout);
				viewModel.setMaxPreferentialMoney(viewModel.salesorderCard, null, noValidPreferential);
			},
			// 子表删除
			del_row: function(data, rowId) {

				if (typeof data == "number") {
					viewModel.saleOrderItems.setRowSelectbyRowId(rowId);
				}
				var rows = viewModel.saleOrderItems.getSelectedRows();
				// 判断选择的是否全为货补行
				// 已做过促销或冲抵，则直接返回
				var flag = "";
				var ifAllSupplymentItems = rows.every(function(row) {
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
						onOk: function() {
							rows.forEach(function(row, index) {
								row.setValue("dr", "1");
								var productId = row.getValue("goodsId"),
									rowNum = row.getValue("rowNum"),
									allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
								allBomRows.forEach(function(item, index) {
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
							var orderItems = viewModel.saleOrderItems.getSimpleData();
							// 删除-真删除simpleData值，避免订单删行后，再添加商品后，订单行会把之前删除的数据又加上了 -------开始 --syf
							// 如果影响了其他功能或流程，建议在显示的时候将状态为'fdel'的值过滤（不删除）
							// 需要删除的行index(Arr)
							var delRowIndex = [],
								subFlag = false;
							orderItems.forEach(function(item, index) {
								if (item.persistStatus == "fdel") {
									//  orderItems.splice(index, 1);
									delRowIndex.push(index);
								}
							});
							// 删除已删除的项
							if (delRowIndex && delRowIndex.length > 0) {
								delRowIndex.forEach(function(item) {
									if (subFlag) {
										item = item - 1;
									}
									orderItems.splice(item, 1);
									subFlag = true;
								});
							}
							// viewModel.saleOrderItems.setSimpleData(orderItems);
							// 计算合计金额、合计数量
							viewModel.computeHeadDataInfo();

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
			getBillIdAjax: function() {
				viewModel.salesorderCard.setValue("id", "");
				$._ajax({
					url: appCtx + viewModel.baseurl + "/get-billId",
					type: "get",
					data: {},
					async: false,
					contentType: "application/json; charset=utf-8",
					success: function(data) {
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
			showAddBillPanel: function() {
				// 开始初始化得到订单id 为上传做铺垫
				setTimeout(function() {
					viewModel.getBillIdAjax();
				}, 0);
				// 查询是否启用调度中心
				viewModel.querySysParams();
				viewModel.preferentialRatio = 1;
				viewModel.index = -1;
				viewModel.isBomPanel(true);
				viewModel.orderInvoice.clear();
				viewModel.orderReceiveAddress.clear();
				// 清空费用冲抵信息
				viewModel.addOrEditClearOffset(true);
				viewModel.SearchpromAfter = "";
				viewModel.SearchpromAfterBom = "";
				viewModel.flushSelected = [];
				$("#tab-panel-2").hide();
				$("#tab-panel-1").show();
				// 清空编辑页附件内容
				$("#saleorder-card-attach").html("");
				// 清空bom结构表
				viewModel.batchSaleOrderBomItems.removeAllRows();
				$("#tab2").removeClass("is-active");
				$("#tab1").addClass("is-active");
				viewModel.checkGoods();
				viewModel.salesorderCard.removeAllRows();
				var curRow = viewModel.salesorderCard.createEmptyRow();
				// 行号池
				viewModel.currowNum(0);
				viewModel.currowBomNum(0);
				// viewModel.getCurDate(curRow);
				curRow.setValue("orderDate", new Date().getTime());
				curRow.setValue("orderStatus", "未提交");
				//合计行还原
				viewModel.totalPrecisionHandle(curRow, "add");
				// 单据状态为未提交
				curRow.setValue("orderStatusCode", billstatus.COMMITTED);
				curRow.setValue("orderStatusName", "未提交");
				// 客户不可点，选择完销售组织后可点击
				$("#customerId").attr("placeholder", "请先选择销售组织");
				viewModel.salesorderCard.setMeta("customerId", "enable", false);
				// 订单类型为货补类型时可选择
				// $("#costTypeId").attr('placeholder', "订单类型为货补类型时可选");
				// viewModel.salesorderCard.setMeta("costTypeId", "enable", false);
				viewModel.attachList = [];
				viewModel.saleOrderItems.removeAllRows();
				// viewModel.setDefaultCondition();
				viewModel.goBillPanel();
				// 清空参照参数
				viewModel.clearRefParams();
				viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
			},
			// TODO 进入复制单据页
			showCopyBillPanel: function() {
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
					viewModel.copyByParentid(id, function(maindata) {
						viewModel.isDetail = false; // 标识用于展示附件的
						maindata.promAmount = 0;
						maindata.totalGoodsSuppleAmount = 0;
						maindata.offsetAmount = 0;
						// 先渲染门户附件
						viewModel.orderAttachments = maindata.orderAttachments;
						viewModel.showAttachment("01");
						var orderItems = maindata.orderItems;
						orderItems.forEach(function(item) {
							item.promPrice = item.salePrice;
							item.salePrice = item.salePrice;
							item.promAmount = 0;
						})
						var orderItemBoms = maindata.orderItemBoms;
						viewModel.batchSaleOrderBomItems.setSimpleData(orderItemBoms);
						viewModel.salesorderCard.setSimpleData(maindata);
						// 后端已经询价，去除询价
						viewModel.saleOrderItems.setSimpleData(orderItems, {
							status: "new",
							unSelect: true
						});
						// 重新计算表体金额
						if (orderItems && orderItems.length > 0) {
							var itemAllRows = viewModel.saleOrderItems.getAllRealRows();
							itemAllRows.map(function(item) {
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
						var customerInoviceBase = viewModel.app.getComp(
							"customerInoviceBase"
						);
						var receiveAddressBase = viewModel.app.getComp(
							"receiveAddressBase"
						);

						$(customerInoviceBase.element).attr(
							"data-refparam",
							'{"EQ_customer.id":"' + maindata.customerId + '"}'
						);
						$(receiveAddressBase.element).attr(
							"data-refparam",
							'{"EQ_customer.id":"' + maindata.customerId + '"}'
						);
						var orderInvoice = maindata.orderInvoice;
						var orderReceiveAddress = maindata.orderReceiveAddress;

						if (orderReceiveAddress) {
							// 收货人
							viewModel.salesorderCard.setValue(
								"receiver",
								orderReceiveAddress.receiver
							);
							// 收货人地址
							viewModel.salesorderCard.setValue(
								"receiveAddressId",
								orderReceiveAddress.receiveAddressId
							);
							viewModel.salesorderCard.setValue(
								"receiveAddressName",
								orderReceiveAddress.receiveAddressId
							);
							// 收货人电话
							viewModel.salesorderCard.setValue(
								"receiverPhone",
								orderReceiveAddress.receiverPhone
							);
						}
						if (orderInvoice) {
							// 客户开票单位
							viewModel.salesorderCard.setValue(
								"invoiceId",
								orderInvoice.invoiceId
							);
							viewModel.salesorderCard.setValue(
								"invoiceTitle",
								orderInvoice.invoiceTitle
							);
							$("#invoiceId").val(orderInvoice.invoiceTitle);
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
							success: function(resp) {
								if (resp && resp.length > 0) {
									var data = resp[0];
									// 存储标识，添加商品时校验对呀规则进行不同操作
									viewModel.isPriceEditFind = data.priceEditFind;
									viewModel.isPriceEditNotFind = data.priceEditNotFind;
								}
							}
						});
						var curRow = viewModel.salesorderCard.getFocusRow();
						// viewModel.accountTypeCombo.setEnable(false);
						// 获得当前最大行号
						// 获得当前最大行号, 防止获取行时行数据还没有拿到
						setTimeout(function() {
							viewModel.getCurRowNum();
							viewModel.getBomCurrowNum();
						}, 1000);
						// 为合计行进行精度处理
						viewModel.totalPrecisionHandle(curRow);

						//删除主表主键，编码，审计信息
						// viewModel.clearBaseProp(curRow, 1);
						curRow.setValue("id", "");
						curRow.setValue("creator", "");
						curRow.setValue("creationTime", "");
						curRow.setValue("modifier", "");
						curRow.setValue("modifiedTime", "");
						curRow.setValue("orderCode", "");
						curRow.setValue("orderDate", new Date().getTime());
						curRow.setValue("billStatusId", "");
						curRow.setValue("billStatusCode", "");
						curRow.setValue("billStatusName", "");
						curRow.setValue("approveTime", "");
						curRow.setValue("approveOpinion", "");
						curRow.setValue("totalGoodsSuppleAmount", 0) // 复制订单 货补优惠金额清  0 
						// 单据状态为未提交
						curRow.setValue("billStatusCode", billstatus.COMMITTED);
						curRow.setValue("billStatusName", "未提交");

						//删除子表主键，子表主表关联,并获得产品id
						// var subRows = viewModel.saleOrderItems.getAllRows();
						// var productids = [];
						// if (subRows && subRows.length > 0) {
						//     for (var i = 0; i < subRows.length; i++) {
						//         viewModel.clearBaseProp(subRows[i], 2);
						//         productids.push(subRows[i].getValue("productId"));
						//         // 删除孙表主键，孙表和子表之间的关联
						//         var subStructRows = subRows[i].getValue("soProductStrucs").getAllRows();
						//         if (subStructRows && subStructRows.length > 0) {
						//             for (var j = 0; j < subStructRows.length; j++) {
						//                 viewModel.clearBaseProp(subStructRows[j], 3);
						//             }
						//         }
						//     }
						// }

						$(".ui-bill-detail").hide();
						viewModel.goBillPanel();
						viewModel.billPanelStatus(CONST.BILLPANELSTATUS.COPY);
						viewModel.SearchpromAfter = '';
						viewModel.SearchpromAfterBom = '';
						viewModel.orderPriceProm = '';
						viewModel.giftProms = '';
						viewModel.reqOrderPromRels = '';
						// 重新询价
						// if (productids.length > 0) {
						//     viewModel.inquiryPrice(productids);
						// }
					});
				} else {
					toastr.warning("未找到来源单据");
				}
			},
			//详情
			detail: function() {
				$("#tab-panel-4").hide();
				$("#tab-panel-3").show();
				viewModel.isDetail = true; // 标识用于展示附件的
				// 清空bom结构表
				viewModel.batchSaleOrderBomItems.removeAllRows();
				viewModel.checkGoods();
				$("#tab4").removeClass("is-active");
				$("#tab3").addClass("is-active");
				var grid = viewModel.app.getComp("grid_salesorder_item").grid;
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("deliveryNum"),
					false
				);
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("stockOutNum"),
					false
				);
				grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("returnNum"),
					false
				);
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("stockInNum"),
					false
				);
				//确保grid先将行设置为focus状态

				setTimeout(function() {
					var curRow = viewModel.salesorderList.getCurrentRow();
					var isShowEdit = curRow.getValue("orderStatusCode") == "01" ? "Saved" : false;
					viewModel.billPanelStatusEdit(isShowEdit);
					// 为合计行进行精度处理
					viewModel.totalPrecisionHandle(curRow);
					var id = curRow.getValue("id");
					viewModel.findByParentid(id, function(maindata) {
						viewModel.pk = maindata.id;
						// 先渲染门户附件
						viewModel.orderAttachments = maindata.orderAttachments;
						viewModel.showAttachment("01");
						if ("01" == maindata.saleModel || "03" == maindata.saleModel) {
							grid.setColumnVisibleByColumn(
								grid.getColumnByField("deliveryNum"),
								true
							);
							grid.setColumnVisibleByColumn(
								grid.getColumnByField("stockOutNum"),
								true
							);
							grid.setColumnVisibleByColumn(
								grid.getColumnByField("signNum"),
								true
							);
							grid.setColumnVisibleByColumn(
								grid.getColumnByField("returnNum"),
								true
							);
						} else {
							grid.setColumnVisibleByColumn(
								grid.getColumnByField("stockInNum"),
								true
							);
						}
						grid.repaintGridDivs();
						var childdata = maindata.orderItems;
						var orderInvoice = maindata.orderInvoice;
						var orderReceiveAddress = maindata.orderReceiveAddress;
						viewModel.salesorderDetailCard.setSimpleData(maindata);

						if (orderReceiveAddress) {
							// 收货人
							viewModel.salesorderDetailCard.setValue(
								"receiver",
								orderReceiveAddress.receiver
							);
							// 收货人地址
							viewModel.salesorderDetailCard.setValue(
								"receiverAddress",
								// orderReceiveAddress.receiverTown +
                // orderReceiveAddress.receiverAddress
                orderReceiveAddress.receiverAddress ? orderReceiveAddress.receiverAddress : (orderReceiveAddress.receiverTown || "")
							);
							// 收货人电话
							viewModel.salesorderDetailCard.setValue(
								"receiverPhone",
								orderReceiveAddress.receiverPhone
							);
						}
						if (orderInvoice) {
							// 客户开票单位
							viewModel.salesorderDetailCard.setValue(
								"invoiceTitle",
								orderInvoice.invoiceTitle
							);
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
						viewModel.goDetailPanel();
						viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
						// 审批流

						viewModel.initBPMFromBill(id, viewModel);
						// 获取附件
						viewModel.queryAttach();
					});
				}, 0);
			},
			//查询子表数据
			findByParentid: function(id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/detail",
					type: "get",
					data: {
						id: id
					},
					success: function(data) {
						if (data) {
							// 获取促销活动信息，重新赋值
							var _A_P_unit = JSON.parse(localStorage.getItem('_A_P_unit'));
							data.orderItems.map(function(orderItems) {
								var promotinName = '',
									promotinId = '';
								orderItems.orderPromRels.map(function(items) {
									promotinName += items.activityName + ',';
									promotinId += items.activityId + ',';
								});
								orderItems.promotinName = promotinName.substr(0, promotinName.length - 1);
								orderItems.promotinId = promotinId.substr(0, promotinId.length - 1);

								if (_A_P_unit && _A_P_unit.length > 0) {
									var weightUnitCode = orderItems.weightUnitCode;
									var volumeUnitCode = orderItems.volumeUnitCode;
									var w = _A_P_unit.filter(function(r) {
										return r.unitCode == weightUnitCode;
									});
									var v = _A_P_unit.filter(function(r) {
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
			copyByParentid: function(id, callback) {
				$._ajax({
					url: appCtx + viewModel.baseurl + "/edit-or-copy",
					type: "get",
					data: {
						id: id,
						type: "copy"
					},
					success: function(data) {
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
			findBomByParentId: function(id) {
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
					success: function(data) {
						bomInfo = data;
					}
				});
				return bomInfo;
			},
			//获取承运商
			findCarrierData: function(selectAddressValue) {
				// var value = viewModel.saleOrderItems.getSimpleData();
				var value = viewModel.saleOrderItems.getRealSimpleData();
				var realAllRows = viewModel.saleOrderItems.getAllRealRows();
				var selectAddress = selectAddressValue ?
					selectAddressValue :
					viewModel.orderReceiveAddress.getSimpleData()[0];
				var carrierInfo = [];
				if (value && value.length > 0 && selectAddress) {
					value.forEach(function(item) {
						carrierInfo.push({
							saleOrgId: item.saleOrgId || item.supplierId, // 销售组织
							customerId: viewModel.salesorderCard.getValue("customerId"), // 客户
							provinceId: selectAddress.receiverProvinceId,
							cityId: selectAddress.receiverCityId,
							countyId: selectAddress.receiverCountyId,
							townId: selectAddress.receiverTownId,
							goodsId: item.goodsId || item.id
						});
					});
					$._ajax({
						url: window.pathMap.dispatch +
							"/api/dispatch/resource-schedule/logistics",
						type: "post",
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify(carrierInfo),
						success: function(data) {
							// 添加承运商
							if (data && data.length > 0) {
								// 商品行item1
								data.map(function(item) {
									realAllRows.map(function(allRows) {
										if (allRows.getValue("goodsId") == item.goodsId) {
											allRows.setValue("logisticsId", item.logisticsId);
											allRows.setValue("logisticsName", item.logisticsName)
										}
									})
								})
							}
						}
					});
				}
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
			// 是否已促销或已冲抵, flag: 03 代表货补
			validIfPromOrOffset: function(flag) {
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
			showAddItemsCommonRef: function(arg, saleModel, itemRefId) {
				var eleId = itemRefId ? itemRefId : "saleorderaddItemsRef";
				// 已做过促销或冲抵，则直接返回
				if (viewModel.validIfPromOrOffset(saleModel)) {
					return;
				}
				if (viewModel.isAvailable()) {
					viewModel.clearItemsRef();
					var customer = $("#refContainercustomerId").data("uui.refer").values;
					var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
					// var costType = $("#refContainercostTypeId").data("uui.refer").values;
					var saleOrg = $("#refContainersaleOrgId").data("uui.refer").values;
					var customerId = customer && customer[0].id;
					var saleModel = saleModel || (orderType && orderType[0].saleModelCode);
					var saleModelId = orderType && orderType[0].id;
					// var costTypeCode = costType && costType[0].id;
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
					// u.compMgr.updateComp($("#saleorderaddItemsRef")[0]);
					// ko.cleanNode($("#saleorderaddItemsRef")[0]);
					// ko.applyBindings(viewModel, $("#saleorderaddItemsRef")[0]);
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
						success: function(resp) {
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
			showAddSupplementItemsRef: function(arg) {
				viewModel.showAddItemsCommonRef(arg, "03", "saleorderaddSupplementItemsRef");
			},
			showAddItemsRef: function(arg) {
				viewModel.showAddItemsCommonRef(arg, "01", "saleorderaddItemsRef");
			},
			//进入修改单据页
			showEditBillPanel: function(index, rowId) {
				viewModel.isBomPanel(true);
				viewModel.preferentialRatio = 1;
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
				$("#tab2").removeClass("is-active");
				$("#tab1").addClass("is-active");
				viewModel.checkGoods();
				// 客户不可点，选择完销售组织后可点击
				// $("#customerId").attr('placeholder', "请先选择销售组织");
				// viewModel.salesorderCard.setMeta("customerId", "enable", false);

				var grid = viewModel.app.getComp("grid_salesorder_edit").grid;
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("deliveryNum"),
					false
				);
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("stockOutNum"),
					false
				);
				grid.setColumnVisibleByColumn(grid.getColumnByField("signNum"), false);
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("returnNum"),
					false
				);
				grid.setColumnVisibleByColumn(
					grid.getColumnByField("stockInNum"),
					false
				);
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
				viewModel.findByParentid(id, function(data) {
					viewModel.pk = data.id;
					viewModel.isDetail = false; // 标识用于展示附件的
					// 先渲染门户附件
					viewModel.orderAttachments = data.orderAttachments;
					viewModel.showAttachment("01");
					if ("01" == data.saleModel || "03" == data.saleModel) {
						grid.setColumnVisibleByColumn(
							grid.getColumnByField("deliveryNum"),
							true
						);
						grid.setColumnVisibleByColumn(
							grid.getColumnByField("stockOutNum"),
							true
						);
						grid.setColumnVisibleByColumn(
							grid.getColumnByField("signNum"),
							true
						);
						grid.setColumnVisibleByColumn(
							grid.getColumnByField("returnNum"),
							true
						);
					} else {
						grid.setColumnVisibleByColumn(
							grid.getColumnByField("stockInNum"),
							true
						);
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
					var ifGiftProms = (data.orderItems || []).some(function(item) {
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
					viewModel.salesorderCard.setSimpleData(data);
					// 保存 收货地址 和 发票信息
					viewModel.orderReceiveAddress.setSimpleData(data.orderReceiveAddress);
					viewModel.orderInvoice.setSimpleData(data.orderInvoice);
					// 给地址 开票单位增加条件
					var customerInoviceBase = viewModel.app.getComp(
						"customerInoviceBase"
					);
					var receiveAddressBase = viewModel.app.getComp("receiveAddressBase");

					$(customerInoviceBase.element).attr(
						"data-refparam",
						'{"EQ_customer.id":"' + data.customerId + '"}'
					);
					$(receiveAddressBase.element).attr(
						"data-refparam",
						'{"EQ_customer.id":"' + data.customerId + '"}'
					);
					var orderInvoice = data.orderInvoice;
					var orderReceiveAddress = data.orderReceiveAddress;

					if (orderReceiveAddress) {
						// 收货人
						viewModel.salesorderCard.setValue(
							"receiver",
							orderReceiveAddress.receiver
						);
						// 收货人地址
						viewModel.salesorderCard.setValue(
							"receiveAddressId",
							orderReceiveAddress.receiveAddressId
						);
						viewModel.salesorderCard.setValue(
							"receiveAddressName",
							orderReceiveAddress.receiveAddressId
						);
						// 收货人电话
						viewModel.salesorderCard.setValue(
							"receiverPhone",
							orderReceiveAddress.receiverPhone
						);
					}
					if (orderInvoice) {
						// 客户开票单位
						viewModel.salesorderCard.setValue(
							"invoiceId",
							orderInvoice.invoiceId
						);
						viewModel.salesorderCard.setValue(
							"invoiceTitle",
							orderInvoice.invoiceTitle
						);
						$("#invoiceId").val(orderInvoice.invoiceTitle);
					}
					// 重新询价
					var orderItems = data.orderItems;
					var goodsInfoDtos = [];

					var saleOrgId = data.saleOrgId || viewModel.salesorderCard.getValue("saleOrgId");
					// 询整单最大优惠比例
					if (saleOrgId) {
						viewModel.matchPreferentialRadio(saleOrgId, "edit");
					}
					orderItems.forEach(function(item) {
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
						success: function(resp) {
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
						}
					});

					// bom 表填充
					viewModel.batchSaleOrderBomItems.setSimpleData(data.orderItemBoms, {
						unSelect: true
					});
					viewModel.attachList = [];
					// 获得当前最大行号, 防止获取行时行数据还没有拿到
					setTimeout(function() {
						viewModel.getCurRowNum();
						viewModel.getBomCurrowNum();
					}, 1000);
					viewModel.goBillPanel();
					viewModel.seteidtCondition();
					viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
					// 获取附件
					viewModel.queryAttach();
				});
			},
			seteidtCondition: function(data) {
				var saleOrgId = viewModel.salesorderCard.getValue("saleOrgId");
				viewModel.changeCondition(
					"customerId", {
						EQ_isEnable: "1",
						EQ_isChannelCustomer: "1",
						EQ_SaleOrder: saleOrgId
					}, {}
				);
			},
			//清空已选销售产品参照
			clearItemsRef: function() {
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
			generaterowNum: function() {
				var latestnum = viewModel.currowNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowNum(newnum);
				return newnum;
			},
			//删除子表项
			delItems: function() {
				var selectedRows = viewModel.saleOrderItems.getSelectedRows();
				viewModel.saleOrderItems.removeRows(selectedRows);
				viewModel.calcItemTotal();
			},
			// 表头检查
			isAvailable: function(type) {
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
			queryAccount: function(saleOrgId, customerId, orderType) {
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
					success: function(data) {
						viewModel.salesorderCard.setValue("accountPeriodId", data.id);
						viewModel.salesorderCard.setValue("accountPeriodName", data.name);
						viewModel.salesorderCard.setValue("accountPeriodCode", data.code);
					}
				});
			},
			//保存单据
			saveBill: function() {
				var result = viewModel.validateBill();
				if (!viewModel.checkEmpty()) {
					return;
				}
				if (result) {
					var currentRow,
						index = viewModel.index;
					var salesorderData = viewModel.salesorderCard.getSimpleData()[0];
					var saleOrderItemsData = viewModel.saleOrderItems.getSimpleData();
					// 封装商品行费用使用明细
					saleOrderItemsData = viewModel.fillOrderItemsOffsetDetailOnSave(saleOrderItemsData);
					var batchSaleOrderBomItems = viewModel.batchSaleOrderBomItems.getSimpleData();
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
					var orderType = $("#refContainerorderTypeId").data("uui.refer")
						.values;
					for (var i = 0; i < saleOrderItemsData.length; i++) {
						//清除促销信息
						saleOrderItemsData[i].promotinId = '';
						saleOrderItemsData[i].promotinName = '';
						const orderItem = saleOrderItemsData[i];
						if (orderItem.isGift == 1 || "03" == orderType[0].saleModelCode || orderItem.goodsSupplement == 1) {
							orderItem.dealPrice = 0;
						}
						// 给bom赋值 库存组织、仓库、财务组织
						var parentGoodsId = saleOrderItemsData[i].goodsId;
						var parentRowNum = saleOrderItemsData[i].rowNum;
						for (var j = 0; j < batchSaleOrderBomItems.length; j++) {
							if (batchSaleOrderBomItems[j].parentGoodsId === parentGoodsId && batchSaleOrderBomItems[j].goodsId !== parentGoodsId && batchSaleOrderBomItems[j].parentRowNum == parentRowNum) {
								batchSaleOrderBomItems[j].deliveryInvOrgId = saleOrderItemsData[i].deliveryInvOrgId;
								batchSaleOrderBomItems[j].deliveryInvOrgCode = saleOrderItemsData[i].deliveryInvOrgCode;
								batchSaleOrderBomItems[j].deliveryInvOrgName = saleOrderItemsData[i].deliveryInvOrgName;

								batchSaleOrderBomItems[j].deliveryWarehouseId = saleOrderItemsData[i].deliveryWarehouseId;
								batchSaleOrderBomItems[j].deliveryWarehouseCode = saleOrderItemsData[i].deliveryWarehouseCode;
								batchSaleOrderBomItems[j].deliveryWarehouseName = saleOrderItemsData[i].deliveryWarehouseName;

								batchSaleOrderBomItems[j].settleFinancialOrgId = saleOrderItemsData[i].settleFinancialOrgId;
								batchSaleOrderBomItems[j].settleFinancialOrgCode = saleOrderItemsData[i].settleFinancialOrgCode;
								batchSaleOrderBomItems[j].settleFinancialOrgName = saleOrderItemsData[i].settleFinancialOrgName;
							} else {
								if (batchSaleOrderBomItems[j].goodsId === parentGoodsId && batchSaleOrderBomItems[j].parentRowNum == parentRowNum) {
									batchSaleOrderBomItems[j].deliveryInvOrgId = saleOrderItemsData[i].deliveryInvOrgId;
									batchSaleOrderBomItems[j].deliveryInvOrgCode = saleOrderItemsData[i].deliveryInvOrgCode;
									batchSaleOrderBomItems[j].deliveryInvOrgName = saleOrderItemsData[i].deliveryInvOrgName;

									batchSaleOrderBomItems[j].deliveryWarehouseId = saleOrderItemsData[i].deliveryWarehouseId;
									batchSaleOrderBomItems[j].deliveryWarehouseCode = saleOrderItemsData[i].deliveryWarehouseCode;
									batchSaleOrderBomItems[j].deliveryWarehouseName = saleOrderItemsData[i].deliveryWarehouseName;

									batchSaleOrderBomItems[j].settleFinancialOrgId = saleOrderItemsData[i].settleFinancialOrgId;
									batchSaleOrderBomItems[j].settleFinancialOrgCode = saleOrderItemsData[i].settleFinancialOrgCode;
									batchSaleOrderBomItems[j].settleFinancialOrgName = saleOrderItemsData[i].settleFinancialOrgName;
								}
							}
						}
					}
					salesorderData.orderItems = saleOrderItemsData;
					salesorderData.orderItemBoms = batchSaleOrderBomItems;
					salesorderData.orderAttachments = viewModel.orderAttachments;
					var setNewPersistStatusFn = function(value) {
						if (
							salesorderData.orderInvoice &&
							salesorderData.orderInvoice.persistStatus
						) {
							salesorderData.orderInvoice.persistStatus = value;
						}
						if (salesorderData.orderReceiveAddress) salesorderData.orderReceiveAddress.persistStatus = value;
						salesorderData.persistStatus = value;
						salesorderData.orderItems.forEach(function(data) {
							var status = data.id ? value : 'new';
							status = data.dr == 1 ? "fdel" : status;
							data.persistStatus = status;
							if (data.isGift != 1) {
								data.isGift = data.goodsSupplement == 1 ? 1 : data.isGift;
							}
						});
						salesorderData.orderItemBoms.forEach(function(data) {
							var status = data.id ? value : 'new';
							status = data.dr == 1 ? "fdel" : status;
							data.persistStatus = status;
							if (data.isGift != 1) {
								data.isGift = data.goodsSupplement == 1 ? 1 : data.isGift;
							}
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
						success: function(data) {
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
					okButton.off().on("click", function() {
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
					cancelButton.off().on("click", function() {
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
					okButton2.off().on("click", function() {
						// saveReal();

						viewModel.dialogSaveBilldialog2.close();
						if ((viewModel.allCarCheck != undefined && viewModel.allCarCheck.length > 0) || (viewModel.allTrayCheck != undefined && viewModel.allTrayCheck.length > 0) || (viewModel.moq != undefined && viewModel.moq.length > 0) || (viewModel.stock && viewModel.stock.length > 0)) {
							checkFill()
						} else {
							saveReal();
						}
					})
					var cancelButton2 = $("#dialog_save_bill2 .J-cancel");
					cancelButton2.off().on("click", function() {
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
						str3_1 += viewModel.moq;
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
						var temp = "<div style='padding-left: 20px'>" +
							viewModel.stock.map(function(item) {
								var html = "<div style='margin-top: 10px'>行号：" + item.rowNum + "，商品：" + item.goodsName + "可用量不足，本次需要 " + item.willAmount + "，当前可用 " + item.avaAmount + "</div>";
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
					okButton3.off().on("click", function() {
						saveReal();
						viewModel.dialogSaveBilldialog3.close();
					})
					var cancelButton3 = $("#dialog_save_bill3 .J-cancel");
					cancelButton3.off().on("click", function() {
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
						success: function(data) {
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
			validateBill: function() {
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
									if (quantity <= 0) {
										temperrmsg +=
											" <span style='color:red'>的数量必须大于0</span> ";
									}
								}
								// 价格校验
								var orderType = $("#refContainerorderTypeId").data("uui.refer")
									.values;
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
										rows[i].getValue("goodsName") +
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
			cancelBill: function() {
				if (viewModel.billPanelStatusCheck() == 0) {
					if (!viewModel.checkupdstatus()) {
						common.dialog.confirmDialog({
							msg1: "当前订单已修改,尚未保存",
							msg2: "是否返回列表",
							width: "400px",
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
			// 查询单据编辑状态
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
			// 操作订单前，检查订单状态是否正确
			checkStatus: function(rows, checker, andCode) {
				var msg = "";
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					var orderStatusCode = row.getValue("orderStatusCode");
					if (andCode) {
						if (
							orderStatusCode == checker.needCode ||
							orderStatusCode == andCode
						) {} else {
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
			submitBill: function() {
				//确保grid先将行设置为focus状态
				setTimeout(function() {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.SUBMIT)) {
						viewModel.batch_ajax("/submit-order", curRow);
					}
				}, 0);
			},
			//收回单据
			unsubmitBill: function() {
				//确保grid先将行设置为focus状态
				setTimeout(function() {
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
			submitBillList: function() {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行提交");
					return;
				}
				// 先询可用量
				$._ajax({
					url: appCtx + viewModel.baseurl + "/check-submit-order",
					type: "POST",
					data: {
						id: rows[0].getValue("id")
					},
					success: function(resp) {
						if (resp && resp.stock && resp.stock.length > 0) {
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
							var temp = "<div style='padding-left: 20px'>" +
								resp.stock.map(function(item) {
									var html = "<div style='margin-top: 10px'>商品：" + item.goodsName + "可用量不足，本次需要 " + item.willAmount + "，当前可用 " + item.avaAmount + "</div>";
									return html
								}).join('') +
								"</div>";
							$("#submit_stock")[0].innerHTML = temp;
							var okButton = $("#dialog_submit_bill .J-ok");
							okButton.off().on("click", function() {
								viewModel.dialogSubmitBill.close();
								viewModel.submitBillBpm(rows);
							})
							var cancelButton = $("#dialog_submit_bill .J-cancel");
							cancelButton.off().on("click", function() {
								viewModel.dialogSubmitBill.close();
							});
						} else {
							viewModel.submitBillBpm(rows);
						}
					}
				});
			},
			submitBillBpm: function(rows) {
				var listCompId = "salesorderList";
				var billTypeCode = "SaleOrder";
				var tranTypeCode = rows[0].getValue("orderTypeCode");
				var nodeJs = "/ocm-web/pages/b2b/salesorder/salesorder.js";
				viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, function() {
					var selectIndex = [];
					selectIndex.push(viewModel.salesorderList.getSelectedIndex());
					viewModel.search(false, function() {
						setTimeout(function() {
							viewModel.salesorderList.setRowsSelect(selectIndex);
						}, 0)
					});
				});
			},
			findUnique: function(cb, selectedData) {
				$._ajax({
					url: viewModel.billFlowConfigUrl + "/find-unique",
					type: "get",
					data: {
						billTypeCode: "SaleOrder",
						tranTypeCode: selectedData[0].orderTypeCode
					},
					contentType: "application/json; charset=utf-8",
					success: function(billFlowConfig) {
						// if (!billFlowConfig) {
						//     toastr.error("尚未为销售订单的单据类型配置审批流程。");
						//     return;
						// }
						var processDefineCode = billFlowConfig.actProcModelCode;
						cb(processDefineCode, selectedData);
					}
				});
			},
			submitBPMByProcessDefineCode: function(processDefineCode, selectedData) {
				var nodeJs = "/ocm-web/pages/b2b/salesorder/salesorder.js";
				//  nodeJs = encodeURIComponent(nodeJs);
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
						success: function(res) {
							if (res) {
								if (res.success == "success") {
									toastr.success();
									var selectIndex = [];
									selectIndex.push(viewModel.salesorderList.getSelectedIndex());
									viewModel.search(false, function() {
										setTimeout(function() {
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
			unsubmitBillList: function() {
				/* var selectedData = viewModel.salesorderList.getSimpleData({
					type: "select"
				});
				if (selectedData.length != 1) {
					toastr.error("请选择一条数据");
					return;
				}
				viewModel.findUnique(function (processDefineCode) {
					if (processDefineCode) {
						var item = selectedData[0];
						if (item.state > 1) {
							toastr.error(
								"订单单号“" +
								item.orderCode +
								"”已经进入审批流程的单据，不可收回！"
							);
							return;
						}
						$.ajax({
							type: "post",
							url: appCtx + viewModel.baseurl + "/unsubmit",
							contentType: "application/json;charset=utf-8",
							data: JSON.stringify(selectedData),
							success: function (res) {
								if (res) {
									if (res.detailMsg.data.success == "success") {
										toastr.success();
										viewModel.search();
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
						viewModel.batch_ajax("/cancel-submit-order", rows);
					}
				}, selectedData); */

				var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行审批");
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
			approveBill: function() {
				//确保grid先将行设置为focus状态
				setTimeout(function() {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.APPROVE)) {
						viewModel.batch_ajax("/approve-order", curRow);
					}
				}, 0);
			},
			//弃审单据
			unapproveBill: function() {
				//确保grid先将行设置为focus状态
				setTimeout(function() {
					var curRow = viewModel.salesorderList.getCurrentRow();
					if (viewModel.checkStatus(curRow, ORDERSTATUSCHECK.UNAPPROVE)) {
						viewModel.batch_ajax("/cancel-approve-order", curRow);
					}
				}, 0);
			},
			approveBillList: function() {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行审批");
					return;
				}
				var listCompId = "salesorderList";
				var billTypeCode = "SaleOrder";
				var tranTypeCode = rows[0].getValue("orderTypeCode");
				var withBpmCallback = function() {
					viewModel.detail();
				};
				viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, function() {
					var selectIndex = [];
					selectIndex.push(viewModel.salesorderList.getSelectedIndex());
					viewModel.search(false, function() {
						setTimeout(function() {
							viewModel.salesorderList.setRowsSelect(selectIndex);
						}, 0)
					});
				});
			},
			//弃审单据
			unapproveBillList: function() {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (!rows || rows.length != 1) {
					toastr.warning("请选择一项进行审批");
					return;
				}
				var listCompId = "salesorderList";
				var billTypeCode = "SaleOrder";
				var tranTypeCode = rows[0].getValue("orderTypeCode");
				var withBpmCallback = function() {
					viewModel.detail();
				};
				var withoutBpmCallback = null;
				viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback, "/cancelApproveWithoutBpmToSubmit");
			},
			// 驳回
			rejectBillPanel: function() {
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
			pushOrderBillPanel: function() {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.PUSH)) {
					if (!rows || rows.length != 1) {
						toastr.warning("请选择一项进行提交");
						return;
					}
					// 先询可用量
					$._ajax({
						url: appCtx + viewModel.baseurl + "/check-push-order",
						type: "POST",
						data: {
							id: rows[0].getValue("id")
						},
						success: function(resp) {
							if (resp && resp.stock && resp.stock.length > 0) {
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
								var temp = "<div style='padding-left: 20px'>" +
									resp.stock.map(function(item) {
										var html = "<div style='margin-top: 10px'>商品：" + item.goodsName + "可用量不足，本次需要 " + item.willAmount + "，当前可用 " + item.avaAmount + "</div>";
										return html
									}).join('') +
									"</div>";
								$("#submit_stock")[0].innerHTML = temp;
								var okButton = $("#dialog_submit_bill .J-ok");
								okButton.off().on("click", function() {
									viewModel.dialogSubmitBill.close();
									viewModel.batch_ajax("/push-order", rows, "推单");
								})
								var cancelButton = $("#dialog_submit_bill .J-cancel");
								cancelButton.off().on("click", function() {
									viewModel.dialogSubmitBill.close();
								});
							} else {
								viewModel.batch_ajax("/push-order", rows, "推单");
							}
						}
					});
				}
			},
			// 整单关闭订单
			closeOrderBillPanel: function() {
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
						toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是审批状态、出库状态，不能关闭");
						return;
					}
					viewModel.batch_ajax("/close-order", rows, "关闭");
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 整单打开订单
			openOrderBillPanel: function() {
				var rows = viewModel.salesorderList.getSelectedRows();
				if (rows && rows.length > 0) {
					var erro = false;
					var orderCode = "";
					for (var i = 0; i < rows.length; i++) {
						var isClose = rows[i].getValue("isClose");
						if (isClose != 1) {
							erro = true;
							orderCode += rows[i].getValue("orderCode") + '、';
						}
					}
					if (erro) {
						toastr.warning("单据号为：" + orderCode.substr(0, orderCode.length - 1) + " 的订单不是关闭状态，不能打开");
						return;
					}
					viewModel.batch_ajax("/open-order", rows, "打开");
				} else {
					toastr.warning("请至少选择一项");
				}
			},
			// 行关闭
			close_row: function() {
				// 判断是否冲抵过
				// if (viewModel.isCostFlush != 0) {
				// 	var msg =
				// 		viewModel.isCostFlush == 1 ?
				// 		"已经冲抵后不可再做此操作，如要操作，请先取消冲抵。" :
				// 		"已经促销匹配后不可再做此操作，如要操作，请先取消促销匹配。";
				// 	toastr.warning(msg);
				// 	return;
				// }
				// 已做过促销或冲抵，则直接返回
				if (viewModel.validIfPromOrOffset()) {
					return;
				}
				if (viewModel.validIsPromOrOffsetsaleModel)
					var rows = viewModel.saleOrderItems.getSelectedRows();
				if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.OPEN)) {
					if (rows && rows.length > 0) {
						viewModel.batch_ajax("/close-order-item", rows, "关闭");
					} else {
						toastr.warning("请至少选择一项");
					}
				}
			},
			// 行打开
			open_row: function() {
				// 判断是否冲抵过
				// if (viewModel.isCostFlush != 0) {
				// 	var msg =
				// 		viewModel.isCostFlush == 1 ?
				// 		"已经冲抵后不可再做此操作，如要操作，请先取消冲抵。" :
				// 		"已经促销匹配后不可再做此操作，如要操作，请先取消促销匹配。";
				// 	toastr.warning(msg);
				// 	return;
				// }
				// 已做过促销或冲抵，则直接返回
				if (viewModel.validIfPromOrOffset()) {
					return;
				}
				var rows = viewModel.saleOrderItems.getSelectedRows();
				if (viewModel.checkStatus(rows, ORDERSTATUSCHECK.OPEN)) {
					if (rows && rows.length > 0) {
						viewModel.batch_ajax("/open-order-item", rows, "打开");
					} else {
						toastr.warning("请至少选择一项");
					}
				}
			},
			// 打开 and 关闭
			batch_ajax: function(url, rows, remark, callback) {
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
					success: function(data) {
						var success = true,
							errmsg = "";
						if (data && data.length > 0) {
							for (var i = 0; i < data.length; i++) {
								if (data[i].code == "0") {
									errmsg +=
										"单号为：" +
										data[i].content +
										" 操作失败,原因为：" +
										data[i].message +
										"<br/>";
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
								viewModel.search(false, function() {
									setTimeout(function() {
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
			searchprom: function() {
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
				var orderType = $("#refContainerorderTypeId").data("uui.refer").values;

				var orderItems = [];
				for (var i = 0; i < orderList.length; i++) {
					if (orderList[i].dr != 1 && orderList[i].isGift != 1 && orderList[i].goodsSupplement != 1) {
						orderList[i].salePrice = orderList[i].salePrice ? orderList[i].salePrice : 0;
						orderItems.push(orderList[i]);
					}
				}
				console.log(orderItems);
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
					success: function(res) {
						if (!res.mutualRelationShip) {
							toastr.warning("没有匹配到适用的促销政策”，订单可继续编辑");
							return;
						}
						/**
						 * @example giftProms : 赠品信息
						 * @param promWay  1： 买赠， 2： 降价
						 */
						// 促销后返回当前商品及促销信息

						// 保存一份促销前的数据， 以便取消促销后还原数据
						var SearchpromAfter = viewModel.saleOrderItems.getSimpleData();
						viewModel.SearchpromAfter = SearchpromAfter.filter(function(item) {
							return item.dr != 1;
						});
						var SearchpromAfterBom = viewModel.batchSaleOrderBomItems.getSimpleData()
						viewModel.SearchpromAfterBom = SearchpromAfterBom.filter(function(bom) {
							return bom.dr != 1;
						});
						var itemData = viewModel.saleOrderItems.getSimpleData().filter(function(item) {
							return item.dr != 1;
						});
						// var itemData = viewModel.saleOrderItems.getSimpleData().filter(function(item) {
						// 	return item.goodsSupplement != 1;
						// });
						var itemBomData = viewModel.batchSaleOrderBomItems.getSimpleData().filter(function(item) {
							return item.dr != 1;
						});
						// 由于促销前会过滤赠品行、货补行，取出货补行商品，合并到促销后返回的商品行里
						// var supplementItems = SearchpromAfter.filter(function(item) {
						// 	return item.dr != 1 && item.goodsSupplement && item.goodsSupplement == 1;
						// });
						// 合并数据
						var reqOrderItems = res.reqOrderItems;
						var giftProms = res.giftProms;
						// 存储促销活动信息
						var reqOrderPromRels = [];
						// 存储全局的赠品信息
						viewModel.giftProms = res.giftProms;
						// 整单赠送
						viewModel.orderPriceProm = res.orderPriceProm;
						var orderPriceProm = res.orderPriceProm;

						// 清空当前行数据，把后台返回数据插入
						var itemRow = viewModel.saleOrderItems.getAllRealRows();
						var bomRow = viewModel.batchSaleOrderBomItems.getAllRealRows();
						viewModel.saleOrderItems.removeAllRows();
						viewModel.batchSaleOrderBomItems.removeAllRows();
						itemRow.forEach(function(item) {
							item.setValue("dr", 1);
						});
						bomRow.forEach(function(item) {
							item.setValue("dr", 1);
						});
						// 重新计算总金额
						var cardTotalAmount = 0, // 表头总金额
							promAmount = 0;
						// 遍历item数据，把促销后的金额赋值
						for (var j = 0; j < itemData.length; j++) {
							var rowNum = itemData[j].rowNum,
								goodsId = itemData[j].goodsId;

							for (var i = 0; i < reqOrderItems.length; i++) {
								var reqRowNum = reqOrderItems[i].rowNum,
									reqRGoodsId = reqOrderItems[i].goodsId;
								if (reqRowNum == rowNum && reqRGoodsId == goodsId) {
									itemData[j].basePrice = reqOrderItems[i].basePrice;
									itemData[j].promPrice = reqOrderItems[i].promPrice;
									itemData[j].promAmount = reqOrderItems[i].promAmount;
									itemData[j].salePrice = reqOrderItems[i].salePrice;
									itemData[j].dealPrice = reqOrderItems[i].dealPrice;
									// 根据返回的促销价重新计算成交金额
									var promAmountTemp = (parseFloat(reqOrderItems[i].promPrice || "0") || parseFloat(reqOrderItems[i].salePrice || "0")) * reqOrderItems[i].mainNum || 0;
									var dealAmountTemp = promAmountTemp - parseFloat(reqOrderItems[i].promAmount || "0");
									itemData[j].dealAmount = dealAmountTemp;
									itemData[j].amount = reqOrderItems[i].amount;

									// 促销信息名称 id
									var itemPriceProm = reqOrderItems[i].reqOrderPromRels;
									var activityId = "",
										activityName = "";
									if (itemPriceProm) {
										itemPriceProm.forEach(function(item) {
											activityId += item.activityId + ',';
											activityName += item.activityName + ',';;
											item.optGoodsId = reqRGoodsId;
											reqOrderPromRels.push(item);
										});
									}
									// 整单促销信息
									if (orderPriceProm && orderPriceProm.activityName) {
										activityId += orderPriceProm.activityId + ',';
										activityName += orderPriceProm.activityName + ',';
									}
									itemData[j].promotinId = activityId.substr(0, activityId.length - 1);
									itemData[j].promotinName = activityName.substr(0, activityName.length - 1);
									// 表头总促销金额，总金额
									cardTotalAmount += parseFloat(reqOrderItems[i].amount);
									// 计算降价促销
									var pricePromAmout = (reqOrderItems[i].salePrice - reqOrderItems[i].promPrice) * reqOrderItems[i].mainNum;
									promAmount += (parseFloat(reqOrderItems[i].promAmount || "0") + parseFloat(pricePromAmout || "0"));
								}
							}
						}
						viewModel.reqOrderPromRels = reqOrderPromRels;
						// 渲染总金额、促销折扣额
						viewModel.salesorderCard.setValue("totalAmount", cardTotalAmount);
						viewModel.salesorderCard.setValue("promAmount", promAmount);

						if (giftProms && giftProms.length > 0) {
							var cardTotaAmount = 0;
							for (var i = 0; i < giftProms.length; i++) {
								var giftDtos = giftProms[i].giftDtos;
								giftDtos.forEach(function(item) {
									// item.promotinId = giftProms[i].description;
									item.promotinId = giftProms[i].activityId;
									item.promotinName = giftProms[i].activityName;
                                    item.originalGoodsId = viewModel.fillOriginalGoodsId(item);
									item.isGift = 1;
									cardTotaAmount += parseFloat(item.salePrice) * parseFloat(item.goodsAmout)
								});
								for (var z = 0; z < giftDtos.length; z++) {
									// giftDtos[z].promotinId = giftProms[i].description;
									giftDtos[z].promotinId = giftProms[i].activityId;
									giftDtos[z].promotinName = giftProms[i].activityName;
									var rowNum = viewModel.generaterowNum();

									if (giftProms[i].promWay == 1) {
										// giftDtos[z].salePrice = "0";
										giftDtos[z].dealPrice = "0";
										giftDtos[z].dealAmount = "0";
										giftDtos[z].mainNum = giftDtos[z].goodsAmout;
										giftDtos[z].orderNum = "0";
										giftDtos[z].planDeliveryDate = new Date().getTime();
									}
									var newrow = viewModel.saleOrderItems.createEmptyRow({
										unSelect: true
									});
									giftDtos[z].orderNum = giftDtos[z].goodsAmout / giftDtos[z].conversionRate;

									newrow.setSimpleData(giftDtos[z]);
									newrow.setValue("rowNum", rowNum);
									// newrow.setValue("isGift", 1);
									// newrow.setValue("isGift", 0);
									newrow.setValue("isGift", 1);
									newrow.setValue("mainNum", giftDtos[z].goodsAmout);
									/* newrow.setValue(
										"orderNum",
										giftDtos[z].goodsAmout / giftDtos[z].conversionRate
									); */
									newrow.setValue(
										"settleFinancialOrgId",
										giftDtos[z].settleFinancialOrgId
									);
									newrow.setValue(
										"settleFinancialOrgName",
										giftDtos[z].settleFinancialOrgName
									);
									newrow.setValue("deliveryInvOrgName", giftDtos[z].consignInventoryOrgName);
									newrow.setValue("deliveryInvOrgId", giftDtos[z].consignInventoryOrgId);
									// 更改总数量
									var totalnum =
										parseFloat(viewModel.salesorderCard.getValue("totalNum")) +
										parseFloat(giftDtos[z].goodsAmout);
									viewModel.salesorderCard.setValue("totalNum", totalnum);

									//bom产品信息的添加
									var bomdata = viewModel.findBomByParentId(
										giftDtos[z].goodsId
									);
									if (bomdata && bomdata.length > 0) {
										var bomItem = bomdata[0].goodsBomChildren;
										for (var j = 0; j < bomItem.length; j++) {
											var bomrows = viewModel.batchSaleOrderBomItems.createEmptyRow();
											bomrows.setSimpleData(newrow.getSimpleData(), {
												status: "new"
											});
											var parentRowNum = rowNum;
											var bomRowNum = viewModel.generateBomrowNum();

											var parentGoodsId = bomrows.getValue("goodsId");
											var parentGoodsName = bomrows.getValue("goodsName");
											var version = bomrows.getValue("version");
											bomrows.setValue("isGift", 1);
											bomrows.setValue("rowNum", bomRowNum);
											bomrows.setValue("parentRowNum", parentRowNum);
											bomrows.setValue("parentGoodsId", parentGoodsId);
											bomrows.setValue("parentGoodsName", parentGoodsName);
											bomrows.setValue("mainNum", "");
											bomrows.setValue("goodsName", bomItem[j].childGoodsName);
											bomrows.setValue("goodsCode", bomItem[j].childGoodsCode);
											bomrows.setValue("goodsId", bomItem[j].childGoodsId);
											bomrows.setValue("version", bomItem[j].childGoodsVersion);
											bomrows.setValue(
												"measurementUnitId",
												bomItem[j].childGoodsUnitId
											);
											bomrows.setValue(
												"measurementUnitCode",
												bomItem[j].childGoodsUnitCode
											);
											bomrows.setValue(
												"measurementUnitName",
												bomItem[j].childGoodsUnitName
											);
											bomrows.setValue(
												"orderNumUnitId",
												bomItem[j].childGoodsUnitId
											);
											bomrows.setValue(
												"orderNumUnitName",
												bomItem[j].childGoodsUnitName
											);
											bomrows.setValue(
												"orderNumUnitCode",
												bomItem[j].childGoodsUnitCode
											);
											bomrows.setValue("orderNum", bomItem[j].childGoodsQty);
											bomrows.setValue(
												"childGoodsQty",
												bomItem[j].childGoodsQty
											);
											bomrows.setValue(
												"mainNum",
												giftDtos[z].goodsAmout * bomItem[j].childGoodsQty
											);
											bomrows.setValue(
												"orderNum",
												(giftDtos[z].goodsAmout / giftDtos[z].conversionRate) *
												bomItem[j].childGoodsQty
											);
										}
									} else {
										var parentRowNum = rowNum;
										//没有bom结构的商品直接复制过来
										var bomRowNum = viewModel.generateBomrowNum();
										var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
										cpRow.setSimpleData(newrow.getSimpleData(), {
											status: "new"
										});
										var parentGoodsId = cpRow.getValue("goodsId");
										var parentGoodsName = cpRow.getValue("goodsName");
										var version = cpRow.getValue("version");
										var parentUnitName = cpRow.getValue("mainNumUnitName");
										cpRow.setValue("rowNum", bomRowNum);
										cpRow.setValue("parentRowNum", parentRowNum);
										cpRow.setValue("parentGoodsId", parentGoodsId);
										cpRow.setValue("parentGoodsName", parentGoodsName);
										cpRow.setValue("measurementUnitName", parentUnitName);

										var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
										getRow.forEach(function(item) {
											item.persistStatus = "new";
										});
									}
								}
							}
							// 合计表头总原金额
							cardTotaAmount += parseFloat(viewModel.salesorderCard.getValue("totalAmount"));
							viewModel.salesorderCard.setValue("totalAmount", cardTotaAmount);
						}
						// PTQDYGG-1702 修改数量之后，促销折扣额的值没变
						if ((giftProms && giftProms.length > 0) || (orderPriceProm && orderPriceProm.length > 0) || (res.reqOrderItems && res.reqOrderItems.length > 0)) {
							viewModel.isSearchprom = 1;
							viewModel.costFreezeEvent(true, 1);
						}
						// viewModel.batchSaleOrderBomItems.setSimpleData(itemBomData);
						itemBomData.map(function(item) {
							var newrow = viewModel.batchSaleOrderBomItems.createEmptyRow({
								unSelect: true
							});
							newrow.setSimpleData(item);
						});
						for (var key = 0; key < itemData.length; key++) {
							var newrow = viewModel.saleOrderItems.createEmptyRow({
								unSelect: true
							});
							newrow.setSimpleData(itemData[key]);
						}
						// itemData.map(function(item) {
						// 	var newrow = viewModel.saleOrderItems.createEmptyRow({
						// 		unSelect: true
						// 	});
						// 	newrow.setSimpleData(item);
						// });
						// viewModel.initData(supplementItems, "supplement");
						viewModel.setMaxPreferentialMoney(viewModel.salesorderCard, "prom");
						// 计算促销优惠金额
						var offsetAmount = parseFloat(viewModel.salesorderCard.getValue("offsetAmount") || "0");
						var totalGoodsSuppleAmount = parseFloat(viewModel.salesorderCard.getValue("totalGoodsSuppleAmount") || "0");
						var totalPromAmout = parseFloat(viewModel.salesorderCard.getValue("totalAmount") || "0") -
							parseFloat(viewModel.salesorderCard.getValue("totalDealAmount") || "0") -
							offsetAmount - totalGoodsSuppleAmount;
						viewModel.salesorderCard.setValue("promAmount", totalPromAmout);
						// viewModel.saleOrderItems.setSimpleData(itemData);
						// viewModel.initData(itemData);
					}
				});
			},
			// 取消促销匹配
			closeSearchprom: function() {
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
					itemRow.forEach(function(item) {
						item.setValue("dr", 1);
					});
					bomRow.forEach(function(item) {
						item.setValue("dr", 1);
					});
					viewModel.saleOrderItems.setSimpleData(viewModel.SearchpromAfter);
					viewModel.batchSaleOrderBomItems.setSimpleData(
						viewModel.SearchpromAfterBom
					);
				} else {
					var itemRows = viewModel.saleOrderItems.getAllRealRows();
					itemRows.forEach(function(item) {
						var amount = item.getValue("salePrice") * item.getValue("mainNum");
						item.setValue("dealPrice", item.getValue("salePrice"));
						item.setValue("promPrice", item.getValue("salePrice"));
						item.setValue("promotinId", "");
						item.setValue("promotinName", "");
						item.setValue("amount", amount);
						item.setValue("dealAmount", amount);
					})
					var giftPromRows = itemRows.filter(function(row) {
						return row.getValue("isGift") == 1 && (row.getValue("isPromGift") == 1 || item.getValue("promotinId"));
					});
					giftPromRows.forEach(function(row, index) {
						row.setValue("dr", "1");
						var goodsId = row.getValue("goodsId"),
							rowNum = row.getValue("rowNum"),
							allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
						allBomRows.forEach(function(item, index) {
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
				/*var saleOrderItem = viewModel.saleOrderItems.getSimpleData();
				        var allRows = viewModel.saleOrderItems.getAllRealRows();
				        var allBomRows = viewModel.batchSaleOrderBomItems.getAllRealRows();
				        allRows.forEach(function (item) {
				            var salePrice = item.getSimpleData().salePrice;
				            var baseDiscountPrice = item.getValue('baseDiscountPrice');
				            if (parseFloat(salePrice) == parseFloat(baseDiscountPrice)) {

				            } else {
				                var orderNum = item.getSimpleData().orderNum;
				                item.setValue('salePrice', baseDiscountPrice);
				                item.setValue('promAmount', 0);
				                item.setValue('promPrice', 0);
				                item.setValue('orderNum', 1);
				                item.setValue('orderNum', orderNum);
				            }
				            item.setValue('promotinId', '');
				            if (item.getSimpleData().orderNum == '0') {
				                viewModel.saleOrderItems.removeRows(item);
				                item.setValue("dr", "1");
				            }
				        });
				        allBomRows.forEach(function (item) {
				            if (item.getSimpleData().orderNum == '0') {
				                viewModel.batchSaleOrderBomItems.removeRows(item);
				                item.setValue("dr", "1");
				            }
				        });*/
				viewModel.salesorderCard.setValue("promAmount", 0);
				viewModel.isSearchprom = 0;
				viewModel.costFreezeEvent(false);
			},
			// 费用冲抵
			costflushing: function() {
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
				var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
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
					success: function(res) {
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
					success: function(res) {
						res.content.forEach(function(item) {
							item.actualFlushAmount = "";
						});
						viewModel.costFlushingEdit.setSimpleData(res.content);
					}
				});
				var closefunc = function() {
					viewModel.costFlushingEdit.removeAllRows();
					viewModel.costflushingdialog.close();
					viewModel.costflushingdialog = null;
				};
				var cancelButton = $("#dialog_showCostflushing .J-cancel");
				var confrimButton = $("#dialog_showCostflushing .J-ok");
				var closeButton = $("#dialog_showCostflushing .u-msg-close");
				cancelButton.off().on("click", closefunc);
				closeButton.off().on("click", closefunc);
				confrimButton.off().on("click", function() {
					var confrimData = viewModel.costFlushingEdit.getSimpleData();
					var costFlushDetailCard = viewModel.costFlushDetailCard.getSimpleData()[0];
					var flushAmount = 0;
					confrimData.forEach(function(item) {
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
			resetAmount: function(amout, costOffsetRatio, cb) {
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
				orderEnable.forEach(function(item) {
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
			costFreezeEvent: function(isCostFlush, flag) {
				var grid = viewModel.app.getComp("grid_salesorder_edit").grid;
				var orderNumOpt = grid.getColumnByField("orderNum");
				var salePriceOpt = grid.getColumnByField("salePrice");
				var dealPriceOpt = grid.getColumnByField("dealPrice");
				var dealAmountOpt = grid.getColumnByField("dealAmount");
				var isGiftOpt = grid.getColumnByField("isGift");
				var settleFinancialOrg = grid.getColumnByField("settleFinancialOrgId");
				if (isCostFlush) {
					$(".isCostFlush input").attr("disabled", "disabled");
					if (flag) {
						viewModel.isCostFlush = 2;
					} else {
						settleFinancialOrg.options.editable = false;
						viewModel.isCostFlush = 1;
					}

					// 限制行上点击
					/**
					 * 为适配促销、费用冲抵后还可使用货补，这里不对订货量进行处理，
					 * 放到列表onBeforeEditFun事件里特殊处理
					 */
					//orderNumOpt.options.editable = false;
					salePriceOpt.options.editable = false;
					dealPriceOpt.options.editable = false;
					dealAmountOpt.options.editable = false;
					isGiftOpt.options.isCostFlush = true;
				} else {
					if (viewModel.isSearchprom == 1 && viewModel.isCostFlush == 1) {
						viewModel.isCostFlush = 2;
					} else if (viewModel.isSearchprom != 1) {
						viewModel.isCostFlush = 0;
						$(".isCostFlush input").removeAttr("disabled");
						//orderNumOpt.options.editable = true;
						settleFinancialOrg.options.editable = true;
						salePriceOpt.options.editable = true;
						dealPriceOpt.options.editable = true;
						dealAmountOpt.options.editable = true;
						isGiftOpt.options.isCostFlush = false;
					}
				}
				grid.repaintGridDivs();
			},
			// 取消费用冲抵
			cancelSearchFee: function() {
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
							id: "dialog_specialproduct",
							content: "#dialog_specialproduct",
							hasCloseMenu: true,
							width: "80%"
						});
						var okButton = $("#dialog_specialproduct .J-ok");
						okButton.off().on("click", function() {
							viewModel.insertSelectedProduct();
							viewModel.specialproductdialog.close();
						});
						var cancelButton = $("#dialog_specialproduct .J-cancel");
						cancelButton.off().on("click", function() {
							viewModel.specialproductdialog.close();
						});
					} else {
						viewModel.specialproductdialog.show();
					}
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
			generateRownum: function() {
				var latestnum = viewModel.currowNum(),
					newnum = latestnum + 100;
				viewModel.currowNum(newnum);
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
				viewModel.currowNum(maxRowNum);
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
						orderitemtotalnumber += parseFloat(
							rows[i].getValue("billedQuantity") || 0
						);
						orderitemtotalamount += parseFloat(rows[i].getValue("amount") || 0);
						orderitemtotalvolume += parseFloat(rows[i].getValue("volume") || 0);
						orderitemtotalweight += parseFloat(rows[i].getValue("weight") || 0);
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
				});
			},

			orderTypeChange: function(obj) {
				var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
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
			showFeeCustItem: function() {
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
					viewModel.findFeeCustItemByid(id, function(data) {
						viewModel.CustomerCastflushDetailItem.setSimpleData(data);
						if (!viewModel.showfeecustItemdialog) {
							viewModel.showfeecustItemdialog = u.dialog({
								id: "dialog_showFeeCustItem",
								content: "#dialog_showFeeCustItem",
								hasCloseMenu: true,
								width: "45%"
							});
							var closefunc = function() {
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
			findFeeCustItemByid: function(id, callback) {
				$._ajax({
					// url: appCtx + viewModel.baseurl + "/query-customercast-flush", // 原来的接口不用 
					url: appCtx + viewModel.baseurl + "/search-offset-detail-group-by-account", //该接口只用于查询冲抵明细
					type: "get",
					data: {
						orderId: id
					},
					contentType: "application/json; charset=utf-8",
					success: function(data) {
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
			isGoodsBom: function() {
				toastr.warning("请在该商品的bom结构上产看选配信息！");
				return;
			},

			// 选配
			goodsOpt: function(obj) {
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
			goodsOptionalFun: function(obj) {
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
				common.goodsOptional.goodsOptional(viewModel, "商品选配", id, baseGoodsOptId, "dialog_goodsOptional", viewModel.saleOrderItems, viewModel.batchSaleOrderBomItems, function(goodsOptData, goodsOptID, cb) {
					/**
					 * 循环遍历返回结果，拼接后展示
					 */
					var goodsOpt = goodsOptID[0].goodsOptDtos;
					//获取全部bom信息
					var allrows = viewModel.batchSaleOrderBomItems.getAllRealRows();
					var bomdata = viewModel.batchSaleOrderBomItems.getSimpleData();
					var newBomData = [];
					bomdata.forEach(function(item) {
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
			salesOrderGoodsOptDetailsFun: function(obj) {
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
			checkGoods: function() {
				viewModel.isBomPanel(true);
				if (viewModel.billPanelStatus() === "detail") {
					$("#tab-panel-4").hide();
					$("#tab-panel-3").show();
				} else {
					$("#tab-panel-2").hide();
					$("#tab-panel-1").show();
				}
			},
			//选择Bom页签
			checkBom: function() {
				viewModel.isBomPanel(false);
				if (viewModel.billPanelStatus() === "detail") {
					$("#tab-panel-4").show();
					$("#tab-panel-3").hide();
				} else {
					$("#tab-panel-2").show();
					$("#tab-panel-1").hide();
				}
			},
			// 从行号池中拿到最新的bom行号
			generateBomrowNum: function() {
				var latestnum = viewModel.currowBomNum(),
					newnum = parseFloat(latestnum) + 10;
				viewModel.currowBomNum(newnum);
				return newnum;
			},
			getBomCurrowNum: function() {
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
			getGoodsPrice: function(ids) {
				if (!ids) {
					toastr.warning("商品id值为空！");
					return;
				}
				$._ajax({
					type: "get",
					url: appCtx + url,
					dataType: "json",
					data: ids,
					success: function(data) {}
				});
			},
			// 费用冲抵状态
			billStatusRender: function(obj) {
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
			isGiftOpt: function(obj) {
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
			billDateComputed: ko.pureComputed(function() {
				var truetime = viewModel.salesorderDetailCard.ref("deliveryDate")();
				var showtime = u.date.format(truetime, "YYYY-MM-DD");
				return showtime;
			}),
			//返回列表页
			retListPanel: function() {
				$(".ui-panel").hide();
				$(".ui-list-panel").show();
				$(".ui-list-panel").animateCss("fadeIn");
				viewModel.isSearchprom = 0;
				viewModel.isCostFlush = 1;
				viewModel.SysParams_stock = 0;
				viewModel.isSearchprom = 0;
				viewModel.costFreezeEvent(false);
				viewModel.SearchpromAfter = '';
				viewModel.SearchpromAfterBom = '';
				viewModel.orderPriceProm = '';
				viewModel.giftProms = '';
				viewModel.reqOrderPromRels = '';
				viewModel.orderAttachments = [];
				$("#refContainerreceiveAddress").data("uui.refer").values = null;
				$("#refContainerinvoiceId").data("uui.refer").values = null;
			},
			//-------------------------------------------上传开始
			//点击上传按钮
			btnUploadAttach: function() {
				$("#saleattachuploadbatch_id").val(undefined);
				$("#saleattachuploadbatch_id").trigger("click");
			},
			uploadAttach: function() {
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

			uploadAttachCallback: function(data) {
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
			showAttachment: function(orderSource) {
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
				$("#saleorder-card-attach").off("click").on("click", ".attach-del", function(e) {
					viewModel.fileDelete(e.currentTarget.id);
				});
				$("#saleorder-card-attach-web").off("click").on("click", ".attach-del", function(e) {
					viewModel.fileDelete_web($(this), e.currentTarget.id);
				});
				// 查看附件
				$(".attach-details").click(function() {
					viewModel.fileDetails($(this).attr("href"));
				});
			},
			fileDelete: function(id) {
				common.dialog.confirmDialog({
					msg1: "是否要删除附件？",
					msg2: " ",
					width: "400px",
					type: "error",
					onOk: function() {
						var par = {
							id: id, //【必填】表的id
							cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
						};
						var f = new interface_file();
						f.filesystem_delete(par, viewModel.fileDeleteCallBack);
					}
				});
			},
			fileDelete_web: function(element, id) {
				for (var i = 0; i < viewModel.orderAttachments.length; i++) {
					if (viewModel.orderAttachments[i].id == id) {
						viewModel.orderAttachments[i].dr = 1;
						viewModel.orderAttachments[i].persistStatus = "fdel";
						element.parent().remove();
					}
				}
			},
			// 附件 查看
			fileDetails: function(url) {
				var otherHtml = [
					"<div>" +
					'<div class="u-msg-title">' +
					"<h4>附件查看</h4>" +
					"</div>" +
					'<div class="u-tabs ui-tabs u-msg-content">' +
					'<div style="text-align: center; margin-top: 20px;">' +
					'<img src="' +
					url +
					'" style="width: 70%">' +
					"</div>" +
					"</div>" +
					'<div class="u-msg-footer">' +
					'<a class="ui-btn ui-btn-primary J-cancel margin-right-5">关闭</a>' +
					"</div>",
					"</div>"
				].join("");
				$("#fileDetailsdialog").html(otherHtml);
				if (!viewModel.fileDetailsdialog) {
					viewModel.fileDetailsdialog = u.dialog({
						id: "fileDetailsdialog",
						content: "#fileDetailsdialog",
						hasCloseMenu: true,
						width: "65%"
					});
				} else {
					viewModel.fileDetailsdialog.show();
				}
				var cancelButton = $("#fileDetailsdialog .J-cancel");
				cancelButton.off().on("click", function() {
					viewModel.fileDetailsdialog.close();
				});
			},
			//附件删除回调
			fileDeleteCallBack: function(data) {
				if (1 == data.status) {
					//删除成功状态
					// viewModel.queryImage();
					viewModel.queryAttach();
				} else {
					toastr.error(data.message);
				}
			},
			queryAttach: function() {
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
			queryAttachCallback: function(data) {
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
			beforeEditCheck: function(obj) {
				var gridObj = obj.gridObj;
				var goodsSupplement = obj.rowObj.value.goodsSupplement;
				// 判断是否已冲抵或促销
				if (viewModel.isCostFlush != 0 && goodsSupplement != 1) {
					return false;
				}
				if (
					obj.colIndex ==
					gridObj.getIndexOfColumn(gridObj.getColumnByField("batchCodeId"))
				) {
					var row = obj.rowObj.value;
					var enableBatchNoManage = row.enableBatchNoManage;
					var grid = viewModel.app.getComp("grid_salesorder_edit").grid;
					var batchCodeIdOpt = grid.getColumnByField("batchCodeId");
					if (enableBatchNoManage) {
						if (enableBatchNoManage == "1") {
							batchCodeIdOpt.options.editable = true;
							viewModel.saleOrderItems.setMeta(
								"batchCodeId",
								"refparam",
								'{"EQ_goods":"' + row.goodsId + '", "EQ_isEnable":"1"}'
							);
							return true;
						} else {
							batchCodeIdOpt.options.editable = false;
							toastr.warning("该商品未开启批号控制");
							return false;
						}
					} else {
						$._ajax({
							url: "/occ-base/api/base/goods/" + row.goodsId,
							type: "get",
							contentType: "application/json; charset=utf-8",
							success: function(data) {
								enableBatchNoManage = data.enableBatchNoManage;
								if (enableBatchNoManage == "1") {
									batchCodeIdOpt.options.editable = true;
									viewModel.saleOrderItems.setMeta(
										"batchCodeId",
										"refparam",
										'{"EQ_goods":"' + row.goodsId + '", "EQ_isEnable":"1"}'
									);
									return true;
								} else {
									batchCodeIdOpt.options.editable = false;
									toastr.warning("该商品未开启批号控制");
									return false;
								}
							}
						});
					}
				}
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
					viewModel.saleOrderItems.setMeta("deliveryWarehouseId", "refparam", '{"EQ_inventoryOrg.id":"' + deliveryInvOrgId + '","EQ_isEnable":"1"}');
				}
				return true;
			},
			// 根据销售组织 + 客户 查询正向销售类型，客户经理，销售部门
			qureyCustomerManageAndOrderType: function(
				ordertypeBody,
				jurisdictionsBody
			) {
				// 根据销售组织加客户 询正向销售订单类型
				$._ajax({
					type: "get",
					url: window.pathMap.b2b + "/b2b/contrast-cust-ordertypes",
					data: ordertypeBody,
					success: function(data) {
						if (!data) {
							return;
						}
						var trantype = data.content[0];
						if (trantype) {
							viewModel.salesorderCard.setValue(
								"saleModel",
								trantype.saleModelCode
							);
							viewModel.salesorderCard.setValue(
								"orderTypeId",
								trantype.trantypeId
							);
							viewModel.salesorderCard.setValue(
								"orderTypeCode",
								trantype.trantypeCode
							);
							viewModel.salesorderCard.setValue(
								"orderTypeName",
								trantype.trantypeName
							);
						}
					}
				});

				// 根据销售组织加客户 询渠道客户交易关系（客户经理、部门，多条只取有客户经理的第一条）
				$._ajax({
					type: "get",
					url: window.pathMap.base + "/base/customer-jurisdictions",
					data: jurisdictionsBody,
					success: function(data) {
						if (!data) {
							return;
						}
						var juris = data.content;
						for (var i = 0; i < juris.length; i++) {
							if (juris[i].customerId) {
								var manage = juris[i];
								viewModel.salesorderCard.setValue(
									"salesManagerId",
									manage.customerManagerId
								);
								viewModel.salesorderCard.setValue(
									"salesManagerCode",
									manage.customerManagerCode
								);
								viewModel.salesorderCard.setValue(
									"salesManagerName",
									manage.customerManagerName
								);
								viewModel.salesorderCard.setValue(
									"salesDeptId",
									manage.saleDepartmentId
								);
								viewModel.salesorderCard.setValue(
									"salesDeptCode",
									manage.saleDepartmentCode
								);
								viewModel.salesorderCard.setValue(
									"salesDeptName",
									manage.saleDepartmentName
								);
								viewModel.salesorderCard.setValue(
									"marketAreaId",
									manage.marketAreaId
								);
								viewModel.salesorderCard.setValue(
									"marketAreaCode",
									manage.marketAreaCode
								);
								viewModel.salesorderCard.setValue(
									"marketAreaName",
									manage.marketAreaName
								);
								i = juris.length;
							}
						}
					}
				});
			},
			// 计算金额精度
			currencyPriceScale: function(str, flag) {
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
			initDataValid: function(item, flag) {
				// 货补行或赠品行不考虑重复
				if (flag == "prom" || flag == "supplement") return true;

				var id = item.refpk || item.goodsId;
				var rows = viewModel.saleOrderItems.getRowsByField("goodsId", id);
				if (!rows || rows.length < 1) return true;
				var goodsRow = rows.find(function(row) {
					return row.getValue("dr") != 1 && row.getValue("isGift") != 1 && row.getValue("goodsSupplement") != 1;
				});
				// 已存在商品行，且不为删除态
				if (goodsRow && goodsRow.status != u.Row.STATUS.FALSE_DELETE) return false;
				return true;
			},
			initData: function(data, flag) {
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						var formula = {};
						var id = data[i].refpk || data[i].goodsId;
						var row = viewModel.saleOrderItems.getRowByField("goodsId", id);
						var saleModel = viewModel.salesorderCard.getValue("saleModel");
						var itemGrid = viewModel.app.getComp("grid_salesorder_edit").grid;
						var isGiftCol = itemGrid.getColumnByField("isGift");
						// 查询bom表
						var bomdata = viewModel.findBomByParentId(id);

						var rowNum = viewModel.generaterowNum();

						// 促销或货补时，不校验商品唯一性
						if (viewModel.initDataValid(data[i], flag)) {
							var newrow = viewModel.saleOrderItems.createEmptyRow({
								unSelect: true
							});
							data[i].planDeliveryDate = new Date().getTime();
							// 为了 renderType能显示出单位 将 体积 重量单位在SetimpleData前set进DataTable里
							newrow.setValue("volumeUnitName", data[i].volumeUnitName);
							newrow.setValue("weightUnitName", data[i].weightUnitName);
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
							newrow.setValue(
								"goodsCode",
								data[i].refcode || data[i].goodsCode
							);
							newrow.setValue(
								"goodsName",
								data[i].refname || data[i].goodsName
							);
							newrow.setValue("goodsImg", data[i].mainPictureFileUrl);
							newrow.setValue("goodsDisplayName", data[i].displayName);
							newrow.setValue("mainNumUnitId", data[i].basicUnitId || data[i].mainNumUnitId);
							newrow.setValue("mainNumUnitCode", data[i].basicUnitCode || data[i].mainNumUnitCode);
							newrow.setValue("mainNumUnitName", data[i].basicUnitName || data[i].mainNumUnitName);

							newrow.setValue("measurementUnitId", data[i].basicUnitId || data[i].mainNumUnitId);
							newrow.setValue("measurementUnitCode", data[i].basicUnitCode || data[i].mainNumUnitCode);
							newrow.setValue("measurementUnitName", data[i].basicUnitName || data[i].mainNumUnitName);

							newrow.setValue("orderNumUnitId", data[i].assistUnitId || data[i].orderNumUnitId);
							newrow.setValue("orderNumUnitCode", data[i].assistUnitCode || data[i].orderNumUnitCode);
							newrow.setValue("orderNumUnitName", data[i].assistUnitName || data[i].orderNumUnitName);

							newrow.setValue("weight", data[i].grossWeight || data[i].weight);

							newrow.setValue("childGoodsQty", data[i].childGoodsQty || 1);
							newrow.setValue(
								"settleFinancialOrgName",
								data[i].settleFinancialOrgName
							);
							newrow.setValue(
								"settleFinancialOrgId",
								data[i].settleFinancialOrgId
							);
							newrow.setValue("deliveryInvOrgName", data[i].inventoryOrgName || data[i].deliveryInvOrgName);
							newrow.setValue("deliveryInvOrgId", data[i].inventoryOrgId || data[i].deliveryInvOrgId);
							newrow.setValue("deliveryInvOrgCode", data[i].inventoryOrgCode || data[i].deliveryInvOrgCode);

							newrow.setValue("baseDiscountPrice", data[i].salePrice);
							// 上级原价
							newrow.setValue("supplierPrice", data[i].supplierPrice);

							newrow.setValue("arrivalBelongCode", "01");
							// 货补行清空成交价、成交金额
							if (flag == "supplement") {
								newrow.setValue("dealPrice", 0);
								newrow.setValue("dealAmount", 0);
							}
						} else {
							// PTQDYGG-1391 销售订单，相同商品再次添加时订单一直转
							toastr.error(
								"行号：" +
								row.getValue("rowNum") +
								",商品名称：" +
								row.getValue("goodsName") +
								",商品编码：" +
								row.getValue("goodsCode") +
								"已经添加过!!!"
							);
							return;
						}
						//bom产品信息的添加
						if (bomdata && bomdata.length > 0) {
							var bomItem = bomdata[0].goodsBomChildren;
							for (var j = 0; j < bomItem.length; j++) {
								var bomrows = viewModel.batchSaleOrderBomItems.createEmptyRow();
								bomrows.setSimpleData(newrow.getSimpleData(), {
									status: "new"
								});
								var parentRowNum = rowNum;
								var bomRowNum = viewModel.generateBomrowNum();
								if (bomItem[j].isOptional == 1) {
									newrow.setValue("isOptional", 1);
									newrow.setValue("baseGoodsOptValue", "  ");
								}
								var parentGoodsId = bomrows.getValue("goodsId");
								var parentGoodsName = bomrows.getValue("goodsName");
								var version = bomrows.getValue("version");
								var basePrice = bomrows.getValue("salePrice");
								var mainNum = newrow.getValue("mainNum");
								var orderNum = newrow.getValue("orderNum");
								bomrows.setValue("rowNum", bomRowNum);
								bomrows.setValue("parentRowNum", parentRowNum);
								bomrows.setValue("parentGoodsId", parentGoodsId);
								bomrows.setValue("parentGoodsName", parentGoodsName);
								if (flag == "supplement") {
									bomrows.setValue("goodsSupplement", "1");
								}
								if (flag == "prom") {
									// 促销进来需要计算下bom行主数量
									bomrows.setValue(
										"mainNum",
										mainNum * bomItem[j].childGoodsQty
									);
								} else {
									bomrows.setValue("mainNum", "");
								}
								bomrows.setValue("goodsName", bomItem[j].childGoodsName);
								bomrows.setValue("goodsCode", bomItem[j].childGoodsCode);
								bomrows.setValue("goodsId", bomItem[j].childGoodsId);
								bomrows.setValue("version", bomItem[j].childGoodsVersion);
								bomrows.setValue(
									"measurementUnitId",
									bomItem[j].childGoodsUnitId
								);
								bomrows.setValue(
									"measurementUnitCode",
									bomItem[j].childGoodsUnitCode
								);
								bomrows.setValue(
									"measurementUnitName",
									bomItem[j].childGoodsUnitName
								);
								bomrows.setValue("orderNumUnitId", bomItem[j].childGoodsUnitId);
								bomrows.setValue(
									"orderNumUnitName",
									bomItem[j].childGoodsUnitName
								);
								bomrows.setValue(
									"orderNumUnitCode",
									bomItem[j].childGoodsUnitCode
								);
								bomrows.setValue(
									"orderNum",
									orderNum * bomItem[j].childGoodsQty
								);
								bomrows.setValue("childGoodsQty", bomItem[j].childGoodsQty);
								/*bomrows.setValue("mainNum", '');*/
							}
						} else {
							var parentRowNum = rowNum;
							//没有bom结构的商品直接复制过来
							var bomRowNum = viewModel.generateBomrowNum();
							var cpRow = viewModel.batchSaleOrderBomItems.createEmptyRow();
							cpRow.setSimpleData(newrow.getSimpleData(), {
								status: "new"
							});
							var parentGoodsId = cpRow.getValue("goodsId");
              var parentGoodsName = cpRow.getValue("goodsName");
							var version = cpRow.getValue("version");
							var basePrice = cpRow.getValue("salePrice");
							cpRow.setValue("rowNum", bomRowNum);
							cpRow.setValue("parentRowNum", parentRowNum);
              cpRow.setValue("parentGoodsId", parentGoodsId);
              cpRow.setValue("parentGoodsName", parentGoodsName);
              cpRow.setValue("childGoodsQty", 1);
							// if (flag != "prom") {
							// 	cpRow.setValue("mainNum", "");
							// }

							var getRow = viewModel.batchSaleOrderBomItems.getSimpleData();
							getRow.forEach(function(item) {
								item.persistStatus = "new";
							});
						}
					}
					viewModel.findCarrierData();
					if (viewModel.SysParams_stock) {
						setTimeout(function() {
							viewModel.findByWarehouse();
						}, 0);
					}
				}
			},

			// 商品行价格、金额变化时，联动表头合计金额
			linkHeadAmount: function(saleCard) {
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
			querySysParams: function() {
				// 1 启用  0 未启用
				$._ajax({
					type: "get",
					url: window.pathMap.base + '/base/sys-params?search_EQ_code=ENABLE_DISPATCH&search_EQ_isEnable=1',
					success: function(data) {
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
			findByWarehouse: function(selectAddressValue) {
				// var value = viewModel.saleOrderItems.getSimpleData();
				var value = viewModel.saleOrderItems.getRealSimpleData();
				var realAllRows = viewModel.saleOrderItems.getAllRealRows();
				var selectAddress = selectAddressValue ? selectAddressValue : viewModel.orderReceiveAddress.getSimpleData()[0];
				var warehouseInfo = [];
				if (value && value.length > 0 && selectAddress) {
					value.forEach(function(item) {
						warehouseInfo.push({
							saleOrgId: item.saleOrgId || item.supplierId, // 销售组织
							provinceId: selectAddress.provinceId || selectAddress.receiverProvinceId,
							cityId: selectAddress.cityId || selectAddress.receiverCityId,
							countyId: selectAddress.countyId || selectAddress.receiverCountyId,
							townId: selectAddress.townId || selectAddress.receiverTownId,
							goodsId: item.goodsId || item.id,
							productLineId: item.productLineId
						});
					});
					$._ajax({
						url: window.pathMap.b2b + "/b2b/goods/find-warehouse",
						type: "post",
						contentType: "application/json;charset=UTF-8",
						data: JSON.stringify(warehouseInfo),
						success: function(data) {
							// 重新获取最新数据
							var value = viewModel.saleOrderItems.getSimpleData();
							realAllRows.map(function(allRows) {
								allRows.setValue("deliveryInvOrgName", null);
								allRows.setValue("deliveryInvOrgCode", null);
								allRows.setValue("deliveryInvOrgId", null);
								allRows.setMeta("deliveryInvOrgId", 'display', null);
								allRows.setValue("deliveryWarehouseName", null);
								allRows.setValue("deliveryWarehouseCode", null);
								allRows.setValue("deliveryWarehouseId", null);
								allRows.setMeta("deliveryWarehouseId", 'display', null);
							})
							if (data && data.length > 0) {
								data.map(function(item) {
									realAllRows.map(function(allRows) {
										if (allRows.getValue("goodsId") == (item.goodsId || item.id)) {
											allRows.setValue("deliveryInvOrgName", item.inventoryOrgName);
											allRows.setValue("deliveryInvOrgCode", item.inventoryOrgCode);
											allRows.setValue("deliveryInvOrgId", item.inventoryOrgId);
											allRows.setValue("deliveryWarehouseName", item.warehouseName);
											allRows.setValue("deliveryWarehouseCode", item.warehouseCode);
											allRows.setValue("deliveryWarehouseId", item.warehouseId);
										}
									})
								})
							}
						}
					});
				}
			},
			clearRefParams: function() {
				var salesDeptBase = viewModel.app.getComp(
					"salesDeptBase"
				);
				var marketAreaBase = viewModel.app.getComp(
					"marketAreaBase"
				);
				var salesManagerBase = viewModel.app.getComp(
					"salesManagerBase"
				);
				var customerInoviceBase = viewModel.app.getComp(
					"customerInoviceBase"
				);
				var receiveAddressBase = viewModel.app.getComp(
					"receiveAddressBase"
				);
				$(salesDeptBase.element).attr(
					"data-refparam",
					'{"EQ_isEnable":"1"}'
				);
				$(marketAreaBase.element).attr(
					"data-refparam"
					//'{"EQ_isEnable":"1"}'
				);
				$(salesManagerBase.element).attr(
					"data-refparam",
					'{"EQ_isEnable":"1"}'
				);
				$(customerInoviceBase.element).attr("data-refparam", '{}');
				$(receiveAddressBase.element).attr("data-refparam", '{}');
			},
			matchPreferentialRadio: function(saleOrgId, flag) {
				$._ajax({
					url: window.pathMap.b2b + "/b2b/order-control-rule/find-preferentialRatio",
					data: {
						saleOrgId: saleOrgId
					},
					contentType: "application/json;charset=UTF-8",
					type: "get",
					success: function(data) {
						if (typeof data == "number") {
							viewModel.preferentialRatio = +data;
							if (flag == "edit") {
								viewModel.setMaxPreferentialMoney(viewModel.salesorderCard);
							}
						}
					}
				});
			},
			setMaxPreferentialMoney: function(card, flag, noValid) {
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
				var orderType = $("#refContainerorderTypeId").data("uui.refer").values;
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
				card.setValue("maxPreferentialMoney", maxPreferentialMoney);
			},
            // 极少场景下，商品原始版本主键丢失
            fillOriginalGoodsId: function(goods) {
                if(goods) {
                    if(goods.originalGoodsId) {
                        return goods.originalGoodsId;
                    } else {
                        if (goods.version == 1) {
                            return goods.id;
                        }
                    }
                }
                return null;
            }
		};
	};
	return events;
});
// 。