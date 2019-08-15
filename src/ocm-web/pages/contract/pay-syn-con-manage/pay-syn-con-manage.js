define(['text!./pay-syn-con-manage.html', 'ocm_common', 'ocm_baseview', './meta.js', '../../flow/bpmapproveref/bpmopenbill.js', 'ocm-citypicker', "ajaxfileupload",
  "ossupload",
  "interfaceFileImpl"
], function (tpl, common, baseview, model, bpmopenbill) {
  'use strict'
  var viewModel, app, fileDialog, picBigDialog;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    CHANGE: "change",
    DETAIL: "detail",
    DEFAULT: "default"
  };
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
    },
    tpl: tpl,
    model: model,
    baseData: {
      index: -1,
      fileId: "",
      baseurl: '/contract/payment-syncs',
      addressurl: '/contract/receive-addresss',
      proQuoteurl: '/contract/project-quotes',
      customFieldsUrl: '/contract/con-custom-templates/get-by-saleOrg-and-contractType',
      contractlist: new u.DataTable(model.options.metas.complex), //表头
      contractCard: new u.DataTable(model.options.metas.complex), // 新增、编辑、
      contractChangeCard: new u.DataTable(model.options.metas.complex), // 变更
      contractDetail: new u.DataTable(model.options.metas.complex), // 合同明细
      proQuoteItems: new u.DataTable(model.options.metas.complexProQuoteItem), //工程合同报价
      shipAddressItem: new u.DataTable(model.options.metas.shipAddressItem), //收货地址
      FileList: new u.DataTable(model.options.metas.FileMeta), //附件上传
      executeDetailItem: new u.DataTable(model.options.metas.executeDetailItem), //详情执行情况
      ItemRefList: new u.DataTable(model.options.metas.ItemRef),
      searchcomp: {},
      arrivalBelongDataSource: ko.observableArray([]),
      orderTypeSource: ko.observableArray([]),
      purchaseTypeSource: ko.observableArray([]),
      // // 商品状态
      isClosedSource: [{
        value: '0',
        name: '打开'
      }, {
        value: '1',
        name: '关闭'
      }],
      //是否合同变更
      isContractChange: ko.observable(false),
      //当前系统日期
      curDate: ko.observable(),
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      button7Source: model.options.buttons.button7,
      button8Source: model.options.buttons.button8,
      button9Source: model.options.buttons.button9,
      buttonMenu1Source: model.options.buttons.buttonmenu1,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      detail11Source: model.options.details.detail1,
      detail2Source: model.options.details.detail2,
      grid1Option: model.options.grids.grid1,

      //工程报价表
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      //收货地址
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      // 供货执行情况
      grid8Option: model.options.grids.grid8,
      // 收款执行情况
      grid9Option: model.options.grids.grid9,
      //地址簿
      addresscardcomp: {},
      dialog1Source: model.options.dialogs.dialog1,
      addressInfo: common.address.addressInfo,
      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      // 交易约束类型
      businessType: ko.pureComputed(function () {
        var businessType = viewModel.contractDetail.ref("businessType")();
        businessType = parseInt(businessType);
        if (isNaN(businessType)) return "无";
        switch (businessType) {
          case 1:
            return "数量及单价";
          case 2:
            return "仅单价";
          default:
        }
      }),
      // 是否有质保金
      isQualityMoney: ko.pureComputed(function () {
        var isQualityMoney = viewModel.contractDetail.ref("isQualityMoney")();
        isQualityMoney = parseInt(isQualityMoney);
        if (isNaN(isQualityMoney)) return "否";
        switch (isQualityMoney) {
          case 0:
            return "否";
          case 1:
            return "是";
          default:
        }
      }),
      thridSettlement: ko.pureComputed(function () {
        var thridSettlement = viewModel.contractDetail.ref("thridSettlement")();
        thridSettlement = parseInt(thridSettlement);
        if (isNaN(thridSettlement)) return "无";
        switch (thridSettlement) {
          case 1:
            return "差价结算";
          case 2:
            return "服务结算";
          default:
        }
      }),
      contractStatus: ko.pureComputed(function () {
        var contractStatus = viewModel.contractDetail.ref("status")();
        contractStatus = parseInt(contractStatus);
        if (isNaN(contractStatus)) return "自由";
        switch (contractStatus) {
          case 0:
            return "自由";
          case 1:
            return "发布";
          case 2:
            return "终止";
          case 3:
            return "冻结";
        }
      }),
      state: ko.pureComputed(function () {
        var state = viewModel.contractDetail.ref("state")();
        state = parseInt(state);
        if (isNaN(state)) return "待处理";
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
      billDateComputed: ko.pureComputed(function () {
        var truetime = viewModel.contractDetail.ref("orderDate")();
        var showtime = u.date.format(truetime, 'YYYY-MM-DD');
        return showtime;
      }),
      selfLifingComputed: ko.pureComputed(function () {
        var selfLifingValue = viewModel.contractDetail.ref("selfLifing")();
        var showName = selfLifingValue == "01" ? "是" : "否";
        return showName;
      }),
    },
    rendertype: {
      operation: function (obj) {
        var editfun, delfun;
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var status = obj.row.value.status;
        if (status == 0 || status == 3) {
          editfun = "data-bind=click:showEditBillPanel.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
          delfun = "data-bind=click:del.bind($data," + obj.rowIndex + "," + dataTableRowId + ")";
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

        } else {
          delfun = 'class="disabled"';
          editfun = 'class="disabled"';
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
        }

        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      detailRender: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var detailfun = "data-bind=click:detail.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        obj.element.innerHTML =
          '<a href="#" class="ui-a-detail" ' +
          detailfun +
          ">" +
          obj.value +
          "</a>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      //是否有质保金format
      isQualityMoneyRender: function (obj) {
        var showValue = obj.value == "1" ? "是" : obj.value == "0" ? "否" : "";
        obj.element.innerHTML = showValue;
      },
      //交易约束类型format
      businessTypeRender: function (obj) {
        var showValue = obj.value == "1" ? "数量及单价" : obj.value == "2" ? "仅单价" : "";
        obj.element.innerHTML = showValue;
      },
      enableStatusRender: function(obj){
          var showValue = obj.value == "1" ? "是" : "否";
          obj.element.innerHTML = showValue;
      },
      // isReturnedComputed: ko.pureComputed(function() {
      //     var isReturned = viewModel.contractlist.ref("isReturned")();
      //     var showVal = isReturned == 0 ? "否" : "是";
      //     return showVal;
      // }),
      beforeEditCheck: function (obj) {
          var  flag = true
          var row = obj.rowObj.value;
         if(obj.colIndex == 2){
            flag = row.isOrdered ? false : true; //如果已有下行已下单 单价不允许修改
         }
        return flag
      },
      // 合同状态format
      contracStateFormat: function (obj) {
        var name = "";
        switch (parseInt(obj.value)) {
          case 0:
            name = "自由";
            break;
          case 1:
            name = "发布";
            break;
          case 2:
            name = "终止";
            break;
          case 3:
            name = "冻结";
            break;
          default:
            break;
        }
        obj.element.innerHTML = name;
      },
      // 第三方结算foramt
      thridSettlementFormat: function (obj) {
        var name = "";
        switch (parseInt(obj.value)) {
          case 0:
            name = "不包含";
            break;
          case 1:
            name = "商品差价结算";
            break;
          case 2:
            name = "外包服务结算";
            break;
          default:
            break;
        }
        obj.element.innerHTML = name;
      },
      // 执行类型
      executeTypeFormat: function (obj) {
        var name = "";
        switch (parseInt(obj.value)) {
          case 1:
            name = "正向";
            break;
          case 2:
            name = "退货";
            break;
          default:
            break;
        }
        obj.element.innerHTML = name;
      }
    },
    events: {
      //删除和批量删除
      del: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.contractlist.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.contractlist.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          if (rows.length == 1) {
            if (rows[0].getValue("status") == 1) {
              toastr.warning("处于发布态的合同不能删除");
              return;
            }
          }
          for (var i = 0; i < rows.length; i++) {
            var state = rows[i].getValue("state");
            if (state == 0) {
              ids.push(rows[i].getValue("id"));
            }
          }
        };
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
                toastr.success("删除成功");
                viewModel.search();
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.contractlist.pageIndex(0);
        }
        viewModel.contractlist.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.contractlist.pageSize();
        var pageNumber = viewModel.contractlist.pageIndex();
        // queryData.search_EQ_isReturned = 0;
        // queryData.search_EQ_purchaseType = "InnerPurchase";
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            // DAVCO-61 将 state 为 null 的数据 默认设置为 待处理
            if (data.content && data.content.length > 0) {
              data.content.forEach(function (item) {
                if (null === item.state) item.state = 0;
              })
            }

            viewModel.contractlist.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.contractlist.totalRow(data.totalElements);
            viewModel.contractlist.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      //新增子表项
      addItems: function () {
        viewModel.proQuoteItems.createEmptyRow({
          unSelect: true
        });
      },
      //新增地址子表项
      addAddressItem: function () {
        var type = viewModel.getTypeByBillPanelStatus();
        var cardTableHeadData = viewModel[type].getCurrentRow().getSimpleData();
        if (!cardTableHeadData.id) {
          toastr.warning("请先保存合同！");
          return
        }
        
        var curRow = viewModel.shipAddressItem.createEmptyRow({
          unSelect: true
        });
      },
      //删除地址子表项
      delAddressItem: function () {
        // var selectedRows = viewModel.shipAddressItem.getSelectedRows();
        var selectedRows = viewModel.shipAddressItem.getSelectedRows();
        var ids = [];
        var newRows = [];
        var selectRows = [];
        for (var i = 0; i < selectedRows.length; i++) {
          if (selectedRows[i].getValue("id")) {
            ids.push(selectedRows[i].getValue("id"));
            selectRows.push(selectedRows[i]);
          } else {
            newRows.push(selectedRows[i]);
          }
        }
        if (newRows.length > 0) {
          viewModel.shipAddressItem.removeRows(newRows, {
            forceDel: true
          });
        }
        if (selectRows.length == 0) {
          return;
        }
        common.dialog.confirmDialog({
          msg1: '确认删除所选地址？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            $._ajax({
              url: appCtx + viewModel.addressurl + "/delete",
              type: "post",
              data: "ids=" + ids.join(","),
              success: function () {
                viewModel.shipAddressItem.removeRows(selectRows, {
                  forceDel: true
                });
              }
            });

          }
        });


      },
      //todo check 是否有默认地址
      checkIsHasDefAddress: function (rowsData) {
        var flag = true
        var filterDefAddress = rowsData.filter(function (val) {
          return val.isDefault == 1
        })
        if (filterDefAddress.length == 0) {
          toastr.warning("请设置一个默认地址")
          flag = false
        }
        return flag
      },
      //保存地址子表项
      saveAddressItems: function () {
        //保存地址子表项
        var rowsData = viewModel.shipAddressItem.getSimpleData();
        var type = viewModel.getTypeByBillPanelStatus();
        var cardTableHeadData = viewModel[type].getCurrentRow().getSimpleData();
        if (!cardTableHeadData.id) {
          toastr.warning("请先保存合同！");
          return
        }
        var changeData = [];
        var nochangeData = [];
        if (rowsData && rowsData.length > 0) {
          rowsData.forEach(function (item, i) {
            if (rowsData[i].persistStatus != "nrm") {
              rowsData[i].contractId = cardTableHeadData.id
              changeData.push(rowsData[i]);
            } else {
              nochangeData.push(rowsData[i]);
            }
          })
        }
        if (changeData.length == 0) {
          toastr.warning("没有相关数据需要保存");
          return false;
        }
        var infoBase = $("#tab-panel-1")[0];
        var basePass = viewModel.validate(infoBase);
        if (basePass.passed) {
          if (!(viewModel.checkIsHasDefAddress(rowsData))) {
            return false;
          };
          $._ajax({
            url: appCtx + viewModel.addressurl + "/batch-save",
            type: "post",
            data: JSON.stringify(rowsData),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                toastr.success("地址保存成功！！！");
              viewModel.shipAddressItem.removeAllRows();
              viewModel.shipAddressItem.addSimpleData(data, "nrm", {
                unSelect: true
              });
              viewModel.shipAddressItem.addSimpleData(nochangeData, "nrm", {
                unSelect: true
              });
            }
          })
        }

      },
      //TODO 校验 校验约束类型如果非 仅单价 则订货数量不允许为空
      checkOrderNum: function (rowsData) {
        var flag = true
        var data = rowsData.filter(function (val) {
          return val.orderNum == null;
        })
        if (data.length > 0) {
          flag = false
        }
        return flag
      },
      //保存合同报价子表项
      saveProQuote: function () {
        var rowsData = viewModel.proQuoteItems.getSimpleData();
        var type = viewModel.isContractChange() ? "contractChangeCard" : "contractCard";
        var cardTableHeadData = viewModel[type].getCurrentRow().getSimpleData();
        if (!cardTableHeadData.id) {
          toastr.warning("请先保存合同！");
          return
        }
        var businessType = cardTableHeadData.businessType;
        //TODO 如果交易约束类型 不是仅单价 校验订货数量不能为空
        if (businessType != 2) {
          var flag = viewModel.checkOrderNum(rowsData)
          if (!flag) {
            toastr.warning("订货数量不能为空！");
            return;
          }
        }

        var infoBase = $("#tab-panel-0")[0];
        var basePass = viewModel.validate(infoBase);
        if (basePass.passed) {
          //TODO 同一个商品非关闭 唯一性校验
          if (!(viewModel.commodityUniqueCheck(rowsData))) {
            toastr.warning("相同商品只能有一个非关闭商品行");
            return false
          }
          //TODO 赠品唯一性校验，
          if (!(viewModel.giveawayUniqueCheck(rowsData))) {
            toastr.warning("相同赠品只能有一个商品行");
            return false
          }
          var changeData = [];
          var nochangeData = [];
          if (rowsData && rowsData.length > 0) {
            rowsData.forEach(function (item, i) {
              if (rowsData[i].persistStatus != "nrm") {
                rowsData[i].contractId = cardTableHeadData.id
                rowsData[i].isGift = rowsData[i].isGift == 1 ? rowsData[i].isGift : 0
                rowsData[i].isClosed = rowsData[i].isClosed == 1 ? rowsData[i].isClosed : 0
                var orderedNum = rowsData[i].orderNum ? parseFloat(rowsData[i].orderNum) : 0
                var changeRate = rowsData[i].changeRate ? parseFloat(rowsData[i].changeRate) : 0
                rowsData[i].mainNum = orderedNum * changeRate
                changeData.push(rowsData[i]);
              } else {
                nochangeData.push(rowsData[i]);
              }
            })
          }
          if (changeData.length == 0) {
            toastr.warning("没有相关数据需要保存");
            return false;
          }
          //TODO 同一个商品非关闭 唯一性校验
          if (!(viewModel.commodityUniqueCheck(changeData))) {
            toastr.warning("相同商品只能有一个非关闭商品行");
            return false
          }
          //TODO 赠品唯一性校验，
          if (!(viewModel.giveawayUniqueCheck(changeData))) {
            toastr.warning("相同赠品只能有一个商品行");
            return false
          }
          $._ajax({
            url: appCtx + viewModel.proQuoteurl + "/batch-save",
            type: "post",
            data: JSON.stringify(changeData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              toastr.success("保存成功");
              viewModel.proQuoteItems.removeAllRows();
              viewModel.proQuoteItems.addSimpleData(data, "nrm", {
                unSelect: true
              });
              // viewModel.proQuoteItems.addSimpleData(nochangeData, "nrm", {
              //   unSelect: true
              // });
              // viewModel.invoicedata = viewModel.proQuoteItems.getSimpleData();
              // viewModel.proQuoteItems.getFocusRow().setSimpleData(data);
              // viewModel.retListPanel();
              // viewModel.search();
            }
          })
        }
      },
      // //删除子表项
      // delItems: function() {
      //     var selectedRows = viewModel.complexItems.getSelectedRows();
      //     viewModel.complexItems.removeRows(selectedRows, {forceDel: true});
      // },
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.contractlist.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.contractlist.pageSize(size);
        viewModel.search(true);
      },
      //进入新增单据页
      showAddBillPanel: function () {
        viewModel.resetActivePanel("contractCard");
        viewModel.isContractChange(false);
        var curRow = viewModel.contractCard.createEmptyRow();
        curRow.setValue("status", 0);
        viewModel.setHeadFieldsEnableByOperation(true);
        viewModel.setDefaultCardEnable();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        $("#cardEdits").show();
        $("#cardDetails").hide();
        $("#cardChangeContract").hide();
      },
      //设置card 初始化禁用
      setDefaultCardEnable: function () {
        viewModel.contractCard.setMeta("customerId", "enable", false); // 客户
        viewModel.contractCard.setMeta("qualityMoney", "enable", false); // 质保金
        viewModel.contractCard.setMeta("serviceMonry", "enable", false); // 服务费
        viewModel.contractCard.setMeta("settlementDealId", "enable", false); // 结算经销商
        $("#customerId").attr({
          placeholder: "请先所属销售组织"
        });
        $("#settlementDealId").attr({
          placeholder: "请先选择第三方结算"
        });
        $("#cardEdit_serviceMonry input").attr({
          placeholder: "请先选择第三方结算"
        });
        $("#cardEdit_qualityMoney input").attr({
          placeholder: "请先选择是否有质保金"
        });
      },
      // todo 如果有子表数据 表头不能修改
      hasChildTableData: function (data) {
        var shipAddressData = data.receiveAddresses == null ? [] : data.receiveAddresses;
        var executeDetailData = data.executeDetails == null ? [] : data.executeDetails;
        var projectQuotes = data.projectQuotes == null ? [] : data.projectQuotes;
        if (shipAddressData > 0 || executeDetailData > 0 || projectQuotes.length > 0) {
          $("#cardEdits").hide();
          $("#cardDetails").show();
        }
      },
      // 重置panel
      resetActivePanel: function (type) {
        viewModel.contractCard.clear();
        viewModel.contractChangeCard.clear();
        viewModel.contractDetail.clear();
        viewModel.proQuoteItems.clear();
        viewModel.shipAddressItem.clear();
        viewModel.FileList.clear();
        viewModel.executeDetailItem.clear();
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        $(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        // 还原自定义项 pengjwb
        $("div[class*=vdef]").removeClass('visibleTrue').addClass('visibleFalse');
        $("div[class*=vdef]").each(function (index, ele) {
          viewModel[type].setMeta("vdef" + (index + 1), 'required', false);
          $(ele).find(".ui-name").html("");
        });
        viewModel.createNewComp();
        // var billPanelStatus = viewModel.billPanelStatus();
        // if (billPanelStatus == "edit") {
        //   $("#cardEdits").show().siblings().hide()
        // } else if (billPanelStatus == "change") {
        //   $("#cardChangeContract").show().siblings().hide()
        // }
      },
      showEditBillPanel: function (index, rowId) {
        //编辑
        viewModel.resetActivePanel("contractCard");
        var curRow = viewModel.contractlist.getRowByRowId(rowId);
        viewModel.isContractChange(false);
        var id = curRow.getValue("id");
        viewModel.fileId = id;
        //查询根据主键查询明细
        viewModel.findByParentid(id, "contractCard", function(data) {
          viewModel.contractCard.setSimpleData(data);
          viewModel.setContractTotalPrice();
        });
        $("#cardEdits").show();
        $("#cardDetails").hide();
        $("#cardChangeContract").hide();
        viewModel.setHeadFieldsEnableByOperation(false);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 由于表头、表体分开保存，编辑时销售组织、合同类型等不可编辑
      setHeadFieldsEnableByOperation: function(enable) {
        viewModel.contractCard.setMeta("contractTypeId", "enable", enable);
        viewModel.contractCard.setMeta("saleOrgId", "enable", enable);
        viewModel.contractCard.setMeta("customerId", "enable", enable);
        viewModel.contractCard.setMeta("runOrgId", "enable", enable);
      },
      validate: function (element) {
        var result = viewModel.app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      detail: function (index, rowId) {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          var curRow = viewModel.contractlist.getRowByRowId(rowId);
          var id = curRow.getValue("id");
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.resetActivePanel("contractDetail");
          // viewModel.initBPMFromBill(id, viewModel);
          viewModel.findByParentid(id, "contractDetail",function(data) {
            viewModel.contractDetail.setSimpleData(data);
            viewModel.setContractTotalPrice("contractDetail");
          });
          viewModel.goDetailPanel();
          
          
        }, 0);
      },
      // detail2bill: function (index, rowId) {
      //   var status = viewModel.contractlist.getValue("status");
      //   if (status != 0 && status != 3) {
      //     toastr.warning("非自由态、冻结态 不能进行编辑");
      //     return;
      //   }
      //   $("#tab-panel-2").hide();
      //   $("#tab-panel-1").hide();
      //   $("#tab-panel-0").show();
      //   viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      //   viewModel.resetActivePanel()
      //   common.bill.detail2bill();
      //   viewModel.getCustomFields(index, rowId);
      // },

      // 查询子表数据
      findByParentid: function (id, type, callback) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail",
          type: 'post',
          data: {
            id: id
          },
          success: function (data) {
            viewModel.fileId = data.id;
            // TODO 合同报价
            viewModel.proQuoteItems.setSimpleData(data.projectQuotes);
            // TODO 收货地址赋值
            viewModel.shipAddressItem.setSimpleData(data.receiveAddresses, { unSelect: true });
            viewModel.fileQueryContract();
            // 自定义字段
            viewModel.getCustomFields(data, type);
            if (typeof callback == "function") {
              callback(data);
            }
            // 设置默认筛选条件
            viewModel.setRefParamsByHeadInfo(data);
            // if (viewModel.billPanelStatus() == "edit") {
            //   viewModel.hasChildTableData(data)
            // }

          }
        });
        if (viewModel.billPanelStatus() == "detail") {
          viewModel.getGathData(id);
        }
      },
      //跳转单据详情页
      showBillDetail: function () {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },
      //新增子表项
      addItem: function () {
        viewModel.proQuoteItems.createEmptyRow();
      },
      //删除子表项
      delItems: function () {
        var selectedRows = viewModel.proQuoteItems.getSelectedRows();
            //1、 过滤出新增的行
            var newRows = selectedRows.filter(function(item){
              return item.status == "new";
            })
            //1.1、 清楚新增的空行
            viewModel.proQuoteItems.removeRows(newRows, {forceDel: true});
           // 2、过滤出需要从表中删除的数据
            selectedRows = selectedRows.filter(function(item){
                  return item.status != "new";
            })
        var ids = [];
        for (var i = 0; i < selectedRows.length; i++) {
          ids.push(selectedRows[i].getValue("id"));
        }
        if(ids.length == 0){
          return
        }
        common.dialog.confirmDialog({
          msg1: '确认删除所选商品？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function () {
            $._ajax({
              url: appCtx + viewModel.proQuoteurl + "/delete",
              type: "post",
              data: "ids=" + ids.join(","),
              success: function () {
                viewModel.proQuoteItems.removeRows(selectedRows, {
                  forceDel: true
                });
              }
            });

          }
        });

      },
      //保存单据
      saveContractBill: function () {
        var infoBase = viewModel.isContractChange() ? $("#cardChangeContract")[0] : $("#cardEdits")[0];
        var basePass = viewModel.validate(infoBase);
        var type = viewModel.isContractChange() ? "contractChangeCard" : "contractCard";
        if (basePass.passed) {
          var cardData = viewModel[type].getCurrentRow().getSimpleData();
          if (viewModel.checkContractReqfield(cardData)) {
            var _ajaxType = cardData.id ? "put" : "post";
            if (_ajaxType == "post") {
              if (cardData.isQualityMoney == undefined || cardData.isQualityMoney == null) {
                cardData.isQualityMoney = 0; //是否质保金
              }
              if (cardData.status == undefined || cardData.status == null) {
                cardData.status = 0; //合同状态
              }
            }
            $._ajax({
              url: appCtx + viewModel.baseurl,
              type: _ajaxType,
              data: JSON.stringify(cardData),
              contentType: "application/json; charset=utf-8",
              success: function (data) {
                toastr.success("保存成功！");
                viewModel.fileId = data.id;
                viewModel[type].setSimpleData(data);
                viewModel.contractDetail.setSimpleData(data);
                viewModel.setContractTotalPrice("contractDetail");
                $("#cardDetails").show().siblings().hide();
                // $("#cardEdits").hide();
                // $("#cardChangeContract").hide();
                // viewModel.retListPanel();
                // viewModel.search();
              }
            })
          }
        }
      },
      //保存合同表头时必填字段检查
      checkContractReqfield: function (cardData) {
          var effectDate = cardData.effectDate, //失效日期
          invalidDate = cardData.invalidDate, //生效日期
          thridSettlement = cardData.thridSettlement, // 第三方结算
          settlementDealId = cardData.settlementDealId, // 结算经销商
          serviceMonry = cardData.serviceMonry, // 服务费金额
          // TODO flag : effectDate 生效时间   invalidDate 失效时间
          startTimestamp = new Date(effectDate).getTime(),
          endTimestamp = new Date(invalidDate).getTime();
   
        if (parseInt(startTimestamp) - parseInt(endTimestamp) > 0) {
          toastr.warning("失效时间 不合法！");
          return false
        }
        //todo   thridSettlement 1 为 差价结算  2，服务结算
        // 第三方结算如果是“差价结算”或“服务结算”则结算经销商必填。
        if (thridSettlement) {
          if (settlementDealId == null) {
            toastr.warning("您选择了第三方结算，结算经销商不能为空！");
            return false
          }
          // 第三方结算如果是“服务结算”则“服务费金额”必填。
          if (thridSettlement == "2") {
            if (serviceMonry == null) {
              toastr.warning("您选择了第三方结算为 服务结算，请填写服务金额！");
              return false
            }
          }
        }
        return true;
      },
      //关闭商品
      closeItems: function () {
        var selectedRows = viewModel.proQuoteItems.getSelectedRows().filter(function(item){
            return item.status != "new";
        })
        var ids = selectedRows.map(function (row, index, arr) {
          return row.getValue("id")
        })
        $._ajax({
          type: "post",
          // url: appCtx + viewModel.baseurl + "/batch-close-items",
          url: appCtx + viewModel.proQuoteurl + "/batch-close-items",
          data: {
            ids: ids.join(",")
          },
          success: function (res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("isClosed", "1");
            }
          }
        })
      },
      //打开商品
      openItems: function () {
        var selectedRows = viewModel.proQuoteItems.getSelectedRows().filter(function(item){
           return item.status != "new";
        })
        var ids = selectedRows.map(function (row, index, arr) {
           return row.getValue("id")
        })
        $._ajax({
          type: "post",
          url: appCtx + viewModel.proQuoteurl + "/batch-open-items",
          data: {
            ids: ids.join(",")
          },
          success: function (res) {
            for (var i = 0; i < selectedRows.length; i++) {
              selectedRows[i].setValue("isClosed", "0");
            }
          }
        })
      },
      // //提交
      // submitBtn: function () {
      //     var listCompId = "contractlist";
      //     var nodeJs = "/ocm-web/pages/purchase/purchaseorder/quanyou/purchaseorder.js";
      //     var billTypeCode = "PurchaseBill";
      //     var tranTypeCode = null;
      //     var callback = null;
      //     viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      // },
      //TODO  1、交易商品唯一性校验 非赠品的商品同时只可以有一个非关闭状态下的，但可以有多个关闭状态下的商品。
      commodityUniqueCheck: function (rowData) {
        // rowData 商品行数据  contractData 合同表头数据
        var flag = true
        rowData.forEach(function (item) {
          var filterData = rowData.filter(function (val) {
            return val.goodsId == item.goodsId && val.isClosed != "1" && val.isGift != "1";
          })
          if (filterData.length > 1) {
            flag = false
          }
        })
        return flag
      },
      //TODO  2、赠品商品唯一性校验：商品+是赠品。即同一个赠品属性的商品，只可以出现一次，不管是否关闭
      giveawayUniqueCheck: function (rowData) {
        var flag = true
        rowData.forEach(function (item) {
          var filterData = rowData.filter(function (val) {
            return val.goodsId == item.goodsId && val.isGift == 1
          })
          if (filterData.length > 1) {
            flag = false
          }
        })
        return flag
      },
      //--------------------------------客户图片上传-------------------------------------------------
      //随机生成文件夹
      generateMixed: function () {
        var chars = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ];
        var result = "";
        for (var i = 0; i < 20; i++) {
          var id = Math.ceil(Math.random() * 35);
          result += chars[id];
        }
        return result;
      },
      //上传弹框调用
      showFileDialog: function () {
        viewModel.pk = viewModel.generateMixed();
        var pk = viewModel.pk;
        viewModel.fileQueryContract();
        if (!fileDialog) {
          fileDialog = u.dialog({
            content: "#file-dialog",
            hasCloseMenu: true
          });
        } else {
          fileDialog.show();
        }
      },
      onOpenUploadWinContract: function () {
        $("#uploadbatch_id").val(undefined);
        $("#uploadbatch_id").trigger("click");
      },
      //上传附件
      onFileUploadContract: function () {

        var contractId = viewModel.fileId; //TODO 获取合同Id
        if (!viewModel.fileId) {
          toastr.warning("请先保存合同！");
          return
        }

        var fileNum = $("#uploadbatch_id")[0].files.length;
        var fileSize = 0;
        var fileSizeMb = 0;
        var fileTypeArr = [];
        // var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
        var fileSizeSum = (function () {
          for (var i = 0; i < fileNum; i++) {
            fileSize += $("#uploadbatch_id")[0].files[i].size;
            var fileName = $("#uploadbatch_id")[0].files[i].name;
            var fileType = fileName
              .substr(fileName.lastIndexOf("."))
              .toLowerCase();
            fileTypeArr.push(fileType);
          }
          fileSizeMb = fileSize / 1024 / 1024;
          return fileSizeMb;
        })();
        // for (var i = 0; i < fileTypeArr.length; i++) {
        //     if (allowType.indexOf(fileTypeArr[i]) == -1) {
        //         toastr.warning("仅支持" + allowType + "格式文件");
        //         return false;
        //     }
        // }
        if (fileSizeSum <= 500) {
          //获取表单
          // var pk = viewModel.customerId;
          var par = {
            fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
            // />,可以修改，主要看你使用的 id是什么
            filepath: contractId, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
            groupname: contractId, //【必填】分組名称,未来会提供树节点
            permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
            url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
            //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          };
          var f = new interface_file();
          f.filesystem_upload(par, viewModel.fileUploadCallbackContract);
        } else {
          toastr.warning("图片总和不能超过500MB");
          return false;
        }
      },
      //上传文件回传信息
      fileUploadCallbackContract: function (data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.FileList.addSimpleData(data.data);
          toastr.success();
        } else {
          //error 或者加載js錯誤
          toastr.error(data.message);
        }
      },
      fileQueryContract: function () {
        viewModel.FileList.removeAllRows();
        //获取表单
        var contractId = viewModel.fileId; //TODO 获取合同Id
        var par = {
          //建议一定要有条件否则会返回所有值
          filepath: contractId, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: contractId, //【选填】[分組名称,未来会提供树节点]
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        };
        var f = new interface_file();
        f.filesystem_query(par, viewModel.fileQueryCallBackContract);
      },
      fileQueryCallBackContract: function (data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.FileList.addSimpleData(data.data);
        }

        // if(viewModel.cusReqFormId) {
        //     viewModel.fileQueryCusReqForm();
        // }
      },
      //附件删除
      fileDeleteContract: function () {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0) {
          toastr.error("请选择一个附件");
          return;
        }
        for (var i = 0; i < row.length; i++) {
          var pk = row[i].getValue("id");
          var par = {
            id: pk, //【必填】表的id
            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          };
          var f = new interface_file();
          f.filesystem_delete(par, viewModel.fileDeleteCallBackContract);
        }
      },
      //附件删除回调
      fileDeleteCallBackContract: function (data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.fileQueryContract();
        } else {
          toastr.error(data.message);
        }
      },
      //下载
      fileDownloadContract: function () {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0 || row.length > 1) {
          toastr.error("请选择一个附件");
          return;
        }
        for (var i = 0; i < row.length; i++) {
          var pk = row[i].getValue("id");
          var url = row[i].getValue("url");
          var fileName = row[i].getValue("filename");
          var $a = $("<a/>");
          $a.attr("id", "down_" + pk);
          $a.attr("href", url);
          $a.attr("download", fileName.split("\.")[0]);
          $a[0].click();
        }
      },
      //查看
      fileViewContract: function () {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0) {
          toastr.error("请选择一个附件");
          return;
        } else if (row.length > 1) {
          toastr.error("一次只能查看一个附件");
          return;
        }
        var url = row[0].getValue("url");
        parent.open(location.origin + url);
        // todo 打开全部附件 暂无误删
        // for (var i = 0; i < row.length; i++) {
        //     var url = row[i].getValue("url");
        //     parent.open(location.origin + url);
        // }
      },
      //--------------------------------客户图片上传-------------------------------------------------
      //收回
      // backBtn: function () {
      //     var listCompId = "contractlist";
      //     var billTypeCode = "PurchaseBill";
      //     var tranTypeCode = null;
      //     var callback = null;
      //     viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      //
      // },
      //取消合同
      cancelContractBill: function () {
        viewModel.proQuoteItems.removeAllRows();
        viewModel.retListPanel();
      },
      backContractBill: function () {
        viewModel.retListPanel();
        viewModel.search();
      },
      //审批通过
      approve: function () {
        var listCompId = "contractlist";
        var billTypeCode = "PurchaseBill";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          viewModel.detail();
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback, withoutBpmCallback);
      },
      // 审批不通过
      disapprove: function () {
        var listCompId = "contractlist";
        var billTypeCode = "PurchaseBill";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          viewModel.detail();
        };
        var withoutBpmCallback = null;
        viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      //取消审核
      unapprove: function () {
        var listCompId = "contractlist";
        var billTypeCode = "PurchaseBill";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          viewModel.detail();
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      //合同变更
      contractChangeFun: function () {
        var selectRows = viewModel.contractlist.getSelectedRows(); //获取选中的Rows 数据
        if (selectRows.length != 1) {
          toastr.warning("请选择一条数据进行变更！");
          return
        }
        var id = selectRows[0].getValue("id");
        if (selectRows[0].getValue("status") != 1) {
          toastr.warning("不处于发布态的合同不能变更");
          return;
        }
        viewModel.resetActivePanel("contractChangeCard");
        viewModel.isContractChange(true);
        //查询子表数据
        viewModel.findByParentid(id, "contractChangeCard", function(data) {
          viewModel.contractChangeCard.setSimpleData(data);
          viewModel.setContractTotalPrice("contractChangeCard");
        });
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.CHANGE);
        $("#cardEdits").hide();
        $("#cardDetails").hide();
        $("#cardChangeContract").show();
        
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function (arg) {
        viewModel.showAddItemsCommonRef(arg, "01");
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsCommonRef: function (arg, saleModel) {
        // 已做过促销或冲抵，则直接返回
        // if (viewModel.validIfPromOrOffset(saleModel)) {
        //     return;
        // }
          var type = viewModel.isContractChange() ? "contractChangeCard" : "contractCard";
          var cardData = viewModel[type].getCurrentRow().getSimpleData();
        // var cardData = viewModel.contractCard.getSimpleData()[0];
        if (viewModel.isAvailable(cardData)) {
          viewModel.clearItemsRef();
          
          var customerId = cardData.customerId,
            saleModelId = "0",
            runOrgId = cardData.runOrgId;
          var condition = {
            search_customerId: customerId,
            search_saleModel: saleModel,
            search_customerRankCode: "01",
            search_costType: "",
            search_organization: runOrgId
          };

          // // 如果是参照货补商品，补充查询参数
          // if ("03" == saleModel) {
          //     condition.search_costType = "Goodssupplement";
          //     viewModel.setSearchEleDefaultRefParams();
          // }
          $("#addItemsRef").attr(
            "data-refparam",
            JSON.stringify(u.extend({}, {}, condition))
          );
          $("#addItemsRef .refer").trigger("click");
        }
      },
      //清空已选销售产品参照
      clearItemsRef: function () {
        viewModel.ItemRefList.setValue("productref", "");
        var refer = $("#refContainerproductref").data("uui.refer");
        refer.uncheckAll();
        refer.setValue([]);
      },
      // 表头检查
      isAvailable: function (cardData) {
        var customerId = cardData.customerId,
          saleModelId = "0",
          runOrgId = cardData.runOrgId;

        if (!runOrgId) {
          toastr.warning("请先选择执行组织！");
          return false;
        }
        if (!customerId) {
          toastr.warning("请先选择客户！");
          return false;
        }
        return true;
      },
      //发布
      pubNotice: function () {
        // viewModel.contractlist.setRowFocus(index);
        // var curRow = viewModel.contractlist.getFocusRow();
        // var id = curRow.getValue("id");
        var selectRows = viewModel.contractlist.getSelectedRows();
        if (selectRows.length > 1) {
          toastr.warning("一次只能发布一条数据！");
          return
        }
        if (selectRows.length == 0) {
          toastr.warning("至少选择一条！");
          return
        }
        var id = selectRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/publish",
          data: {
            id: id
          },
          success: function (res) {
            if (!res.msg) {
              selectRows[0].setValue("status", "1");
              viewModel.search(true);
              toastr.success("发布成功");
            } else {
              toastr.error("发布失败");
            }
          }
        });
      },
      // 终止
      finishedPub: function () {
        var selectRows = viewModel.contractlist.getSelectedRows(); //获取选中的Rows 数据
        if (selectRows.length > 1) {
          toastr.warning("一次只能发布一条数据！");
          return
        }
        if (selectRows.length == 0) {
          toastr.warning("至少选择一条！");
          return
        }
        var id = selectRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/finished",
          data: {
            id: id
          },
          success: function (res) {
            if (!res.msg) {
              selectRows[0].setValue("status", "0");
              viewModel.search(true);
              toastr.success("取消成功");
            } else {
              toastr.error("取消发布失败");
            }
          }
        });
      },
      // 冻结
      freeze: function () {
        var selectRows = viewModel.contractlist.getSelectedRows(); //获取选中的Rows 数据
        if (selectRows.length > 1) {
          toastr.warning("一次只能发布一条数据！");
          return
        }
        if (selectRows.length == 0) {
          toastr.warning("至少选择一条！");
          return
        }
        var id = selectRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/freeze",
          data: {
            id: id
          },
          success: function (res) {
            if (!res.msg) {
              selectRows[0].setValue("status", "3");
              viewModel.search(true);
              toastr.success("冻结成功");
            } else {
              toastr.error("冻结失败");
            }
          }
        });
      },
      // 取消冻结
      cancelFreeze: function () {
        var selectRows = viewModel.contractlist.getSelectedRows(); //获取选中的Rows 数据
        if (selectRows.length > 1) {
          toastr.warning("一次只能发布一条数据！");
          return
        }
        if (selectRows.length == 0) {
          toastr.warning("至少选择一条！");
          return
        }
        var id = selectRows[0].getValue("id");
        $._ajax({
          type: "post",
          url: appCtx + viewModel.baseurl + "/cancel-freeze",
          data: {
            id: id
          },
          success: function (res) {
            if (!res.msg) {
              selectRows[0].setValue("status", "2");
              viewModel.search(true);
              toastr.success("取消冻结成功");
            } else {
              toastr.error("取消冻结失败");
            }
          }
        });
      },
      importHandle: function () {
        var urlInfo = viewModel.excelurl + '/excelDataImport'; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + '/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.contractlist; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      // 返回列表页
      retListPanel: function () {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      getGathData: function (id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/get-saleorder-by-contractid",
          type: 'get',
          async: false,
          data: {
            "id": id
          },
          success: function (data) {
              if(!data){return false}
              viewModel.executeDetailItem.setSimpleData(data);
          }
        })
      },
      //日期
      getCurDate: function (row) {
        // 服务器时间获取
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + '/search-date',
          success: function (data) {
            var truetime = u.date.format(data, 'YYYY/MM/DD');
            truetime = new Date(truetime).getTime();
            if (row) {
              row.setValue("orderDate", truetime);
            }
            viewModel.curDate(truetime);
          }
        });
      },
      // 清空已选参照
      clearRef: function (referids) {
        if (referids && referids.length > 0) {
          for (var i = 0; i < referids.length; i++) {
            var refer = $("#refContainer" + referids[i]).data("uui.refer");
            if (refer) {
              refer.uncheckAll();
              refer.setValue([]);
            }
          }
        }
      },

      //----------------行业业务代码提取（bom）---------------
      setAddressToRow: function () {
        var cardData = viewModel.contractlist.getCurrentRow().getSimpleData();
        var customerId = cardData.customerId,
          addressInfo = viewModel.getAddressByCusId(customerId);
        if (addressInfo.length > 0) {
          viewModel.shipAddressItem.setSimpleData(addressInfo);
        }
      },
      //根据客户id查询地址
      getAddressByCusId: function (customerId) {
        var addressInfo;
        $._ajax({
          url: window.pathMap.base + "/api/base/customer-address/find-by-customer-id/" + customerId,
          type: 'get',
          async: false,
          data: {
            customerId: customerId
          },
          success: function (data) {
            addressInfo = data;
          }
        })
        return addressInfo;
      },
      // todo  获取自定义项
      getCustomFields: function (cardData, type) {
        var newType = type ? type : viewModel.getTypeByBillPanelStatus();
        $("div[class*=vdef]").removeClass('visibleTrue').addClass('visibleFalse');
        if (!cardData) return;
        var saleOrgId = cardData.saleOrgId; // 销售组织
        var contractTypeId = cardData.contractTypeId; // 销售组织
        if (!(saleOrgId && contractTypeId)) {
          return;
        }
        if (saleOrgId && contractTypeId) {
          $._ajax({
            type: "post",
            url: appCtx + viewModel.customFieldsUrl,
            data: {
              "saleOrg": saleOrgId,
              "contractType": contractTypeId
            },
            success: function (data) {
              if (!data) {
                return
              }
              viewModel.setShowCustomerFields(data.billDetails, newType);
              // viewModel.search()
            }
          })
        }
      },
      setShowCustomerFields: function (data, type) {
        data.forEach(function (item, index) {
          var $ele = $("div." + item.filedName);
          if (item.isShow == 1) {
            $ele.addClass('visibleTrue').removeClass('visibleFalse');
            var text = item.showName;
            if (item.isFill) { // 是否必填
              text = '<span class="ui-redstar">*</span>' + item.showName;
              viewModel[type].setMeta(item.filedName, 'required', true);
            }
            $ele.find(".ui-name").html(text + "：");
          }
        });
        // 激活
        viewModel.createNewComp();
      },
      // 激活自定义项
      createNewComp: function () {
        $("div[class*=vdef] div[u-meta]").each(function (index, ele) {
          var options = JSON.parse(ele.getAttribute('u-meta'));
          if (!options.id) {
            options.id = Math.random();
          }
          options['type'] = options['type'] || 'string';
          if (options && options['type']) {
            var comp = u.compMgr.createDataAdapter({
              el: ele,
              options: options,
              model: viewModel,
              app: app
            });
            ele['u-meta'] = comp;
            app.comps.push(comp);
          }
        });
      },
      // 根据billPanelStatus 返回model类型
      getTypeByBillPanelStatus: function() {
        var billPanelStatus = viewModel.billPanelStatus();
        var type = "";
        switch (billPanelStatus) {
          case "add":
            type = "contractCard";
            break;
          case "edit":
            type = "contractCard";
            break;
          case "detail":
            type = "contractDetail";
            break;
          case "change":
            type = "contractChangeCard";
            break;
          default:
            break;
        };
        return type;
      },
      /*          // todo 根据表体设置  合同总价格*/
      setContractTotalPrice: function (type) {
        var rowsArr = viewModel.proQuoteItems.getSimpleData();
        if (!type) {
          type = viewModel.getTypeByBillPanelStatus();
        }
        var contractCard = viewModel[type].getCurrentRow();
        //判断是否为合同变更
        var totalPrice = 0;
        rowsArr.forEach(function (item) {
          totalPrice += item.contractMoney == null ? 0 : parseFloat(item.contractMoney);
        });
        contractCard.setValue("contractAmount", totalPrice); //表头总金额
      },
      cancelRequired: function (newValue) {
        // TODO 取消 结算经销商 、服务费金额 必选
        viewModel.contractCard.meta.settlementDeal.required = false
        viewModel.contractCard.meta.serviceMonry.required = false
        $("#cardEdits").find(".ui-item").each(function () {
          var name = $(this).find(".ui-name").find(".name").text();
          var temp = $('<span class="ui-redstar">*</span><span>' + name + '</span>')
          if (!newValue) {
            if (name == "结算经销商：" || name == "服务费金额：") {
              $(this).find(".ui-name").find(".ui-redstar").remove();
              viewModel.contractCard.setMeta("serviceMonry", "enable", false); // 服务费
              viewModel.contractCard.setMeta("settlementDealId", "enable", false); // 结算经销商
              $("#settlementDealId").attr({
                placeholder: "请先选择第三方结算"
              });
              $("#cardEdit_serviceMonry input").attr({
                placeholder: "请先选择第三方结算"
              });
              return false
            }
          } else {
            if (name == "服务费金额：") {
              $(this).find(".ui-name").find(".ui-redstar").remove();
              viewModel.contractCard.setMeta("serviceMonry", "enable", false); // 服务费
              $("#cardEdit_serviceMonry input").attr({
                placeholder: ""
              });
              return false
            }
          }


        })
      },
      //todo 校验 非 0 和非负数
      checkNonNegativeNumbers: function (val) {
        // todo  val :新值
        var number = parseFloat(val);
        var flag = number <=0 ? false : true
        return flag
      },
      clearBodyInfo: function() {
        var billPanelStatus = viewModel.billPanelStatus();
        // 新增切换组织时，清空表体信息
        if (billPanelStatus == "add") {
          viewModel.proQuoteItems.clear();
          viewModel.shipAddressItem.clear();
        }
      },
      setRefParamsByHeadInfo: function(data) {
        if (data && data.customerId) {
          viewModel.shipAddressItem.meta.addressId.refparam = '{"EQ_customer.id":"' + data.customerId + '"}';
        }
      }
    },
    afterCreate: function () {
      $.fn.collapsepanel(false, true);
      viewModel = u.extend(viewModel, bpmopenbill.model)
      //枚举
      // 子表参照聚焦行，用于绑定子表参照组件
      var refRow = viewModel.ItemRefList.createEmptyRow();
      viewModel.ItemRefList.setRowFocus(refRow);
      // 工程报价，为产品组合子表增行
      viewModel.ItemRefList.on("productref.valuechange", function (obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $("#refContainerproductref").data("uui.refer");
        var refValues = refer.values;
        if (refValues && refValues.length > 0) {
          for (var i = 0; i < refValues.length; i++) {
            var bomItems = [];
            var id = refValues[i].refpk;
            var name = refValues[i].refname;
            var newrow = viewModel.proQuoteItems.createEmptyRow({
              unSelect: true
            });
            newrow.setValue("goodsId", refValues[i].refpk);
            newrow.setValue("goodsName", refValues[i].refname); //商品名称
            newrow.setValue("goodsCode", refValues[i].refcode); //商品名称
            newrow.setValue("changeRate", refValues[i].conversionRate); //换算率
            newrow.setValue("orderUnitId", refValues[i].assistUnitId); //订货单位
            newrow.setValue("orderUnitName", refValues[i].assistUnitName);
            newrow.setValue("mainUnitId", refValues[i].basicUnitId); //主单位
            newrow.setValue("mainUnitName", refValues[i].basicUnitName);
          }
        }
      }); // 工程报价商品变更
      // 客户变更
      viewModel.contractCard.on("customerManagerId.valuechange", function (obj) {
        // 客户经理带出执行人员
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.contractCard.getRowByRowId(obj.rowId)
          rowData.setValue("runPersonId", obj.newValue);
        }

      });
      // 销售组织 change
      //TODO 监听销售组织
      viewModel.contractCard.off("saleOrgId.valuechange").on("saleOrgId.valuechange", function (obj) {
        // 所属销售组织 带出执行组织
        var saleOrgId = obj.newValue
        if (obj.newValue != obj.oldValue && obj.newValue) {
          viewModel.clearBodyInfo();
          var rowData = viewModel.contractCard.getRowByRowId(obj.rowId)
          var customerId = rowData.getValue("customerId");
          if (customerId && obj.oldValue) {
            common.dialog.confirmDialog({
              msg1: "修改或者删除销售组织，！会清空选择的客户信息",
              msg2: "是否继续？",
              width: "400px",
              type: "error",
              onOk: function () {
                viewModel.contractCard.setValue("customerId", "");
                viewModel.contractCard.setValue("customerName", "");
                viewModel.contractCard.setValue("contact", ""); // 联系人
                viewModel.contractCard.setValue("contactType", ""); // 联系方式

                // 根据销售组织判断客户是否可点击
                if (saleOrgId) {
                  $("#customerId").removeAttr("placeholder");
                  viewModel.contractCard.setMeta("customerId", "enable", true);
                } else {
                  $("#customerId").attr("placeholder", "请先选择销售组织");
                  viewModel.contractCard.setMeta("customerId", "enable", false);
                }
              },
              onCancel: function () {
                viewModel.contractCard.setValue("saleOrgId", obj.oldValue);
              }
            });
          } else {
            if (saleOrgId) {
              $("#customerId").removeAttr("placeholder");
              viewModel.contractCard.setMeta("customerId", "enable", true);
            } else {
              $("#customerId").attr("placeholder", "请先选择销售组织");
              viewModel.contractCard.setMeta("customerId", "enable", false);
            }
          }
          rowData.setValue("runOrgId", obj.newValue)
          var contractTypeId = rowData.getValue("contractTypeId");
          $("#cardEdit_customerId").attr("data-refparam", JSON.stringify({
            EQ_isEnable: "1",
            EQ_isChannelCustomer: "1",
            EQ_SaleOrder: saleOrgId
          }));

          if (!contractTypeId) {
            return
          }
          //TODO  查询自定义字段 数据
          viewModel.getCustomFields(rowData.getSimpleData());
        } else {
          if (saleOrgId) {
            $("#customerId").removeAttr("placeholder");
            viewModel.contractCard.setMeta("customerId", "enable", true);
          } else {
            $("#customerId").attr("placeholder", "请先选择销售组织");
            viewModel.contractCard.setMeta("customerId", "enable", false);
          }
        }
      });
      viewModel.contractCard.on("saleDeptId.valuechange", function (obj) {
        // 销售部门带出执行部门
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var allrow = viewModel.contractCard.getRowByRowId(obj.rowId)
          allrow.setValue("runDeptId", obj.newValue)
        }
      });
      viewModel.contractCard.off("customerId.valuechange").on("customerId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.clearBodyInfo();
            var customerId = obj.newValue
            $($("#grid_complexItem_detail_placeholder_div")[0]).find(".input-group").attr("data-refmodel", JSON.stringify({
                EQ_CustomerId: customerId
            }));

          $._ajax({
            type: "get",
            url: window.pathMap.base +
              "/base/customer-addresses/findByCustomerId",
            data: {
              "customerId": obj.newValue
            },
            success: function (data) {
              if (!data || data.length == 0) {
                return;
              }
              //todo 过滤出默认地址信息
              var defaultAddressInfo = data.filter(function (val) {
                return val.isDefault == 1
              })
              var customerInfo = defaultAddressInfo.length > 0 ? defaultAddressInfo[0] : data[0];
              if (customerInfo) {
                var Receiver = customerInfo.firstReceiver ? customerInfo.firstReceiver : customerInfo.secondReceiver
                var ReceiverPhone = customerInfo.firstReceiverPhone ? customerInfo.firstReceiverPhone : customerInfo.secondReceiverPhone
                viewModel.contractCard.setValue("contact", Receiver);
                viewModel.contractCard.setValue("contactType", ReceiverPhone);
              }
            }
          });
          viewModel.shipAddressItem.clear();
          viewModel.shipAddressItem.meta.addressId.refparam = '{"EQ_customer.id":"' + obj.newValue + '"}';
          // viewModel.setAddressToRow(); // 设置地址
        } else {
          viewModel.contractCard.setValue("contact", "");
          viewModel.contractCard.setValue("contactType", "");
        }
      });
      viewModel.contractCard.off("isQualityMoney.valuechange").on("isQualityMoney.valuechange", function (obj) {
        var rowData = viewModel.contractCard.getRowByRowId(obj.rowId);
        if (obj.newValue && obj.newValue != obj.oldValue) {
          if (obj.newValue == 1) {
            viewModel.contractCard.setMeta("qualityMoney", "enable", true); // 质保金
            $("#cardEdit_qualityMoney input").attr({
              placeholder: ""
            });
          } else {
            rowData.setValue("qualityMoney", "")
            viewModel.contractCard.setMeta("qualityMoney", "enable", false); // 质保金
            $("#cardEdit_qualityMoney input").attr({
              placeholder: ""
            });
          }
        } else {
          viewModel.contractCard.setMeta("qualityMoney", "enable", false); // 质保金
          rowData.setValue("qualityMoney", "")
          $("#cardEdit_qualityMoney input").attr({
            placeholder: "请先选择是否有质保金"
          });
        }
      });
      viewModel.contractCard.on("qualityMoney.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.contractCard.getRowByRowId(obj.rowId)
          var isQualityMoney = rowData.getValue("isQualityMoney");
          if (isQualityMoney != "1") {
            rowData.setValue("qualityMoney", 0);
          }
        }
      });
      // TODO 监听第三方结算
      viewModel.contractCard.on("thridSettlement.valuechange", function (obj) {
        //TODO  3、如果合同表体上的，“第三方结算”字段为“商品差价结算”，则工程报价表中的，“第三方结算价”字段才显示，且必填
        var rowData = viewModel.contractCard.getRowByRowId(obj.rowId);
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var grid = viewModel.app.getComp("grid_complexProQuoteItem").grid;
          var thridSettlement = grid.getColumnByField("thridSubPrice");
          $("#settlementDealId").attr({
            placeholder: ""
          });
          $("#cardEdit_serviceMonry input").attr({
            placeholder: ""
          });
          if (obj.newValue == 1) { //1、 差价结算
            grid.setColumnVisibleByColumn(thridSettlement, true);
            viewModel.contractCard.setMeta("settlementDealId", "enable", true); // 结算经销商
            rowData.setValue("serviceMonry", "");
            viewModel.cancelRequired(obj.newValue);
          } else {
            grid.setColumnVisibleByColumn(thridSettlement, false);
            viewModel.contractCard.setMeta("serviceMonry", "enable", true); // 服务费
            viewModel.contractCard.setMeta("settlementDealId", "enable", true); // 结算经销商
          }
          viewModel.contractCard.meta.settlementDeal.required = true
          viewModel.contractCard.meta.serviceMonry.required = true

          $("#cardEdits").find(".ui-item").each(function () {
            var name = $(this).find(".ui-name ").text();
            var temp = $('<span class="ui-redstar">*</span><span class="name">' + name + '</span>')
            if (obj.newValue == 2 && name == "服务费金额：") { //服务结算
              $(this).find(".ui-name ").html(temp);
            }
            if (name == "结算经销商：") {
              $(this).find(".ui-name ").html(temp);
            }
          })

        } else {
          rowData.setValue("settlementDealId", "")
          rowData.setValue("serviceMonry", "")
          viewModel.cancelRequired();
        }

      });
      // TODO 监听businessType
      viewModel.contractCard.on("businessType.valuechange", function (obj) {
        //TODO  4.1、如果交易约束类型为“仅单价”，则工程报价表页签中“合同数量”“合同金额”字段非必填。
        //TODO  4.2、	如果交易约束类为“仅单价”，则是否赠品列均为否且不可以编辑。（即仅限单价的合同在报价表中不可以添加赠品商品）。
        if (obj.newValue && obj.newValue != obj.oldValue) {
          if (obj.newValue == 2) { // 2代表 仅单价
            viewModel.proQuoteItems.setMeta("contractMoney", "required", false);
            viewModel.proQuoteItems.setMeta("orderNum", "required", false);
            viewModel.proQuoteItems.setMeta("isGift", "editable", false);
          } else {
            viewModel.proQuoteItems.setMeta("contractMoney", "required", true);
            viewModel.proQuoteItems.setMeta("orderNum", "required", true);
            viewModel.proQuoteItems.setMeta("isGift", "editable", true);
          }
          var grid = viewModel.app.getComp("grid_complexProQuoteItem").grid;
        }
      });

      //TODO 监听合同类型
      viewModel.contractCard.on("contractTypeId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.clearBodyInfo();
          var rowData = viewModel.contractCard.getRowByRowId(obj.rowId)
          var saleOrgId = rowData.getValue("saleOrgId");
          if (!saleOrgId) {
            return
          }
          // 根据合同类型 销售组织加载 自定义字段
          viewModel.getCustomFields(rowData.getSimpleData())
        }
      });
      // TODO 报价表体监听单价，金额
      viewModel.proQuoteItems.on("singlePrice.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId)
          if (obj.newValue <= 0) {
            rowData.setValue("singlePrice", "");
            return false
          }
          var mainNum = rowData.getValue("mainNum")
          var isGift = rowData.getValue("isGift")
          if (!mainNum) {
            return
          }
          // TODO 如果商品行是赠品的话设置 单条商品行总价格  清 0
          if (isGift == 1) {
            rowData.setValue("contractMoney", 0)
          }
          var contractMoney = mainNum * obj.newValue
          rowData.setValue("contractMoney", contractMoney)
          //todo 获取合同总金额
          viewModel.setContractTotalPrice();
        }
      });
      // 如果是赠品 价格清空
      viewModel.proQuoteItems.on("isGift.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId)
          var singlePrice = rowData.getValue("singlePrice") == null ? 0 : parseFloat(rowData.getValue("singlePrice"));
          var mainNum = rowData.getValue("mainNum") == null ? 0 : parseFloat(rowData.getValue("mainNum"));
          if (obj.newValue == 1) {
            rowData.setValue("contractMoney", 0)
          } else {
            rowData.setValue("contractMoney", singlePrice * mainNum)
          }
          //todo 获取合同总金额
          viewModel.setContractTotalPrice();
        }
      });
      // TODO 报价表体监听订单数量
      viewModel.proQuoteItems.on("orderNum.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId)
          if (obj.newValue <= 0) {
            rowData.setValue("orderNum", "");
            return false
          }
          var isGift = rowData.getValue("isGift")
          var changeRate = rowData.getValue("changeRate")
          if (!changeRate) {
            return
          }
          // TODO 如果商品行是赠品的话设置 单条商品行总价格  清 0
          if (isGift == 1) {
            rowData.setValue("contractMoney", 0);
          }
          var contractMoney = changeRate * obj.newValue
          rowData.setValue("mainNum", contractMoney); // 表体总金额
          //todo 获取合同总金额
          viewModel.setContractTotalPrice();
        }
      });
      // TODO 报价表体监听订单数量
      viewModel.proQuoteItems.on("mainNum.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId)
          var isGift = rowData.getValue("isGift")
          var singlePrice = rowData.getValue("singlePrice")
          if (!singlePrice) {
            return
          }
          // TODO 如果商品行是赠品的话设置 单条商品行总价格  清 0
          if (isGift == 1) {
            rowData.setValue("contractMoney", 0);
          }
          var contractMoney = singlePrice * obj.newValue
          rowData.setValue("contractMoney", contractMoney); // 表体总金额
          //todo 获取合同总金额
          viewModel.setContractTotalPrice();
        }
      });
      viewModel.proQuoteItems.on("projectBasePrice.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId)
          if (obj.newValue <= 0) {
            rowData.setValue("projectBasePrice", "");
          }
        }
      });
      viewModel.proQuoteItems.on("commonSalePrice.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId)
          if (obj.newValue <= 0) {
            rowData.setValue("commonSalePrice", "");
          }
        }
      });
      viewModel.proQuoteItems.on("thridSubPrice.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var rowData = viewModel.proQuoteItems.getRowByRowId(obj.rowId);
          if (obj.newValue <= 0) {
            rowData.setValue("thridSubPrice", "");
          }
        }
      });
      viewModel.shipAddressItem.on("isDefault.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var allData = viewModel.shipAddressItem.getAllRealRows();
          for (var i = 0; i < allData.length; i++) {
            if (allData[i].rowId == obj.rowId) {
              viewModel.shipAddressItem.getRowByRowId(obj.rowId).setValue("isDefault", 1)
            } else {
              viewModel.shipAddressItem.getRowByRowId(allData[i].rowId).setValue("isDefault", 0)
            }
          }
        }
      });
      viewModel.shipAddressItem.on("addressId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var allData = viewModel.shipAddressItem.getAllRealRows();
          var count = allData.length - 1;
          for (var i = 0; i < count; i++) {
            if (allData[i].getValue("addressId") == obj.newValue) {
              toastr.warning("地址已存在无需再次添加！！！");
              viewModel.shipAddressItem.removeRowByRowId(obj.rowId);
              break;
            }
          }
        }
      });
      // 选择上传文件后，直接调用上传方法
      $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
        if (this.value) {
          viewModel.onFileUploadContract();
        }
      });
    }
  });
  return view;
});