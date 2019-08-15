define(
  [
    "text!./notice.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "ocm_kindeditor",
    "css!./notice.css"
  ],
  function(tpl, common, baseview, model) {
    var BILLPANELSTATUS = {
      ADD: "add",
      EDIT: "edit",
      //  COPY: "copy",
      DETAIL: "detail",
      DEFAULT: "default"
    };
    var viewModel, editor, detailEditor;
    var view = baseview.extend({
      beforeCreate: function() {
        viewModel = this.viewModel;
      },
      tpl: tpl,
      model: model,
      baseData: {
        baseurl: "/buyer/notices",
        NoticeList: new u.DataTable(model.options.metas.noticeMeta),
        noticeCustRangeList: new u.DataTable(
          model.options.metas.noticeCustRangeMeta
        ),

        searchcomp: {},
        searchSource: model.options.searchs.search1,
        button1Source: model.options.buttons.button1,
        button2Source: model.options.buttons.button2,
        button3Source: model.options.buttons.button3,
        button4Source: model.options.buttons.button4,

        card1Source: model.options.cards.card1,
        detail1Source: model.options.details.detail1,
        grid1Option: model.options.grids.grid1,
        grid2Option: model.options.grids.grid2,
        grid3Option: model.options.grids.grid3,

        billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
        //TODO: 枚举值
        custRangeSource: [
          {
            value: "1",
            name: "全部客户"
          },
          {
            value: "2",
            name: "指定客户"
          }
        ],
        approveFormat: function() {
          viewModel.NoticeList.getValue("approveStatus");
        },
        //跳转单据页
        goBillPanel: common.bill.goBillPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel
      },
      rendertype: {
        enableRender: common.rendertype.enableRender,
        operation: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var statusCode = obj.row.value["statusCode"];
          var delfun =
            "data-bind=click:del.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var editfun =
            "data-bind=click:showEditBillPanel.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var pubFun =
            "data-bind=click:pubNotice.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var stopFun =
            "data-bind=click:stopNotice.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var strHtml = '<div class="ui-handle-icon">';
          if (statusCode == 1) {
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              pubFun +
              ' title="发布">发布</a>' +
              "</span>    ";
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              editfun +
              ' title="编辑">编辑</a>' +
              "</span>    ";
          } else if (statusCode == 2) {
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              stopFun +
              ' title="终止">终止</a>' +
              "</span>    ";
          }
          strHtml +=
            '<span class="ui-handle-word">' +
            '<a href="#" ' +
            delfun +
            ' title="删除">删除</a>' +
            "</span></div>";
          obj.element.innerHTML = strHtml;
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
        statusCodeRender: function(params) {
          var text = "";
          switch (params.value) {
            case "2":
              text = "发布";
              break;
            case "3":
              text = "终止";
              break;
            case "4":
              text = "失效";
              break;
            default:
              text = "保存";
              break;
          }
          params.element.innerHTML = text;
        },
        detailRender: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var detailfun = "data-bind=click:detail.bind($data)";
          obj.element.innerHTML =
            '<a href="#" class="ui-a-detail" ' +
            detailfun +
            ">" +
            obj.value +
            "</a>";
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
        custRangeFmt: ko.pureComputed(function() {
          var value = viewModel.NoticeList.ref("custRange")();
          return value == 1 ? "全部客户" : "指定客户";
        })
      },
      events: {
        validIndexByCol: function(colIndex, field) {
          var gridObj = viewModel.app.getComp("grid_noticeCustRangeList").grid;
          var column = gridObj.getColumnByField(field);
          return colIndex == gridObj.getIndexOfColumn(column);
        },
        ifCanEidtHandle: function(obj) {
          var colIndex = obj.colIndex;
          var customerCategoryId = viewModel.noticeCustRangeList
            .getRow(obj.rowIndex)
            .getValue("customerCategoryId");
          var customerId = viewModel.noticeCustRangeList
            .getRow(obj.rowIndex)
            .getValue("customerId");
          var channelTypeId = viewModel.noticeCustRangeList
            .getRow(obj.rowIndex)
            .getValue("channelTypeId");
          var organizationId = viewModel.noticeCustRangeList
            .getRow(obj.rowIndex)
            .getValue("organizationId");
          if (
            customerCategoryId ||
            customerId ||
            channelTypeId ||
            organizationId
          ) {
            if (customerCategoryId) {
              return viewModel.validIndexByCol(colIndex, "customerCategoryId");
            }
            if (customerId) {
              return viewModel.validIndexByCol(colIndex, "customerId");
            }
            if (channelTypeId) {
              return viewModel.validIndexByCol(colIndex, "channelTypeId");
            }
            if (organizationId) {
              return viewModel.validIndexByCol(colIndex, "organizationId");
            }
            return false;
          } else {
            return true;
          }
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
          if (reindex) {
            viewModel.NoticeList.pageIndex(0);
          }
          viewModel.NoticeList.removeAllRows();
          var queryData = viewModel.searchcomp.getDataWithOpr
            ? viewModel.searchcomp.getDataWithOpr()
            : {};
          var pageSize = viewModel.NoticeList.pageSize();
          var pageNumber = viewModel.NoticeList.pageIndex();
          queryData.size = pageSize;
          queryData.page = pageNumber;
          $._ajax({
            type: "get",
            url: appCtx + viewModel.baseurl,
            dataType: "json",
            data: queryData,
            success: function(data) {
              viewModel.NoticeList.setSimpleData(data.content, {
                unSelect: true
              });
              viewModel.NoticeList.totalRow(data.totalElements);
              viewModel.NoticeList.totalPages(data.totalPages);
            }
          });
        },
        //清空搜索条件
        cleanSearch: function() {
          viewModel.searchcomp.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
          viewModel.NoticeList.pageIndex(index);
          viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
          viewModel.NoticeList.pageSize(size);
          viewModel.search();
        },
        //特殊字符处理
        escapeChars: function(str) {
          //转义字符
          str = str.replace(/&lt;/g, "<");
          str = str.replace(/&gt;/g, ">");
          str = str.replace(/&quot;/g, '"');
          //十进制
          str = str.replace(/&#34;/g, '"');
          str = str.replace(/&#39;/g, "'");
          str = str.replace(/&#60;/g, "<");
          str = str.replace(/&#62;/g, ">");
          return str;
        },
        //进入新增单据页
        showAddBillPanel: function() {
          var curRow = viewModel.NoticeList.createEmptyRow();
          viewModel.NoticeList.setRowFocus(curRow);
          curRow.setValue("statusCode", "1");
          viewModel.goBillPanel();
          viewModel.noticeCustRangeList.clear();
          $(".J-custRange").hide();
          viewModel.billPanelStatus = BILLPANELSTATUS.ADD;
          if (!editor) {
            editor = KindEditor.create("#editEditor", {
              uploadJson: "/iuap-saas-filesystem-service/file/upload"
            });
          }
          editor.html("");
        },
        //进入修改单据页
        showEditBillPanel: function(index) {
          viewModel.NoticeList.setRowFocus(index);
          var curRow = viewModel.NoticeList.getFocusRow();
          viewModel.findByParentid(curRow.getValue("id"));
          viewModel.goBillPanel();
          viewModel.billPanelStatus = BILLPANELSTATUS.EDIT;
          //$("#editEditor").append(currData.content);
          var strHtml = viewModel.escapeChars(curRow.getValue("content") || "");
          if (!editor) {
            editor = KindEditor.create("#editEditor", {
              uploadJson: "/iuap-saas-filesystem-service/file/upload"
            });
          }
          editor.html(strHtml);
          //根据类型选择值显示
          $(".J-custRange").hide();
          var rangeShow = curRow.getValue("custRange");
          if (rangeShow == 2) {
            $(".J-custRange").show();
          }
        },
        detail: function() {
          //确保grid先将行设置为focus状态
          setTimeout(function() {
            var curRow = viewModel.NoticeList.getCurrentRow();
            var id = curRow.getValue("id");
            viewModel.findByParentid(id);
            viewModel.goDetailPanel();
            if (!detailEditor) {
              detailEditor = KindEditor.create("#detailEditor");
            }
            detailEditor.html(
              viewModel.escapeChars(curRow.getValue("content") || "")
            );
            detailEditor.readonly();
            //根据类型选择值显示
            $(".J-custRange").hide();
            var rangeShow = curRow.getValue("custRange");
            if (rangeShow == 2) {
              $(".J-custRange").show();
            }
          }, 0);
        },
        //查询子表数据
        findByParentid: function(id) {
          $._ajax({
            url: appCtx + viewModel.baseurl + "/findByNoticeId",
            type: "get",
            async: false,
            data: {
              id: id
            },
            success: function(data) {
              viewModel.noticeCustRangeList.setSimpleData(
                data.noticecustranges
              );
            }
          });
        },
        //保存单据
        saveBill: function() {
          var noticeBase = $("#noticeBase")[0];
          var basePass = viewModel.validate(noticeBase);
          var noticeData = viewModel.NoticeList.getFocusRow().getSimpleData();
          var focusRow = viewModel.NoticeList.getFocusRow();
          if (focusRow.getValue("effectivedate")) {
            var effectivedate = focusRow.getValue("effectivedate");
            if (effectivedate && effectivedate.indexOf("-")>0) {
              effectivedate = Date.parse(effectivedate);
            }
            noticeData.effectivedate = effectivedate;
          }
          if (focusRow.getValue("disabledate")) {
            var disabledate = focusRow.getValue("disabledate");
            if (disabledate && disabledate.indexOf("-")>0) {
              disabledate = Date.parse(disabledate);
            }
            noticeData.disabledate = disabledate;
          }
          if (basePass.passed) {
            var passCust = true;
            var custRange = viewModel.NoticeList.getValue("custRange");
            if (custRange == 2) {
              var validateSale = viewModel.validate($("#custRangeBase")[0]);
              if (!validateSale.passed) {
                passCust = false;
              }
            }
            if (viewModel.billPanelStatus == BILLPANELSTATUS.ADD) {
              noticeData.persistStatus = "new";
            } else if (viewModel.billPanelStatus == BILLPANELSTATUS.EDIT) {
              noticeData.persistStatus = "upd";
            } else {
              noticeData.persistStatus = "";
            }
            if (passCust) {
              var custRangeData = viewModel.noticeCustRangeList.getSimpleData();
              for (var i in custRangeData) {
                var item = custRangeData[i];
                if (
                  typeof item == "object" &&
                  !(
                    item.customerId ||
                    item.customerCategoryId ||
                    item.channelTypeId ||
                    item.organizationId
                  )
                ) {
                  toastr.error(
                    "范围为：指定客户时，客户分类/客户/渠道类型/销售组织必选一"
                  );
                  return false;
                }
              }
              noticeData.noticecustranges = custRangeData;
            }
            noticeData.content = editor.html() + "";
            var _ajaxType = noticeData.persistStatus == "upd" ? "put" : "post";
            $._ajax({
              url: appCtx + viewModel.baseurl,
              type: _ajaxType,
              data: JSON.stringify(noticeData),
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                viewModel.NoticeList.getFocusRow().setSimpleData(data);
                toastr.success("保存成功");
                viewModel.retListPanel();
              }
            });
          }
        },
        //取消单据
        cancelBill: function() {
          var curRow = viewModel.NoticeList.getCurrentRow();
          // 修改，则还原
          if (curRow.getValue("id")) {
            curRow.setSimpleData(viewModel.NoticeList.originEditData);
          } else {
            // 新增或复制，则删除
            viewModel.NoticeList.removeRow(curRow);
          }
          viewModel.retListPanel();
        },
        //发布
        pubNotice: function(index) {
          viewModel.NoticeList.setRowFocus(index);
          var curRow = viewModel.NoticeList.getFocusRow();
          var id = curRow.getValue("id");
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/pub",
            data: {
              id: id
            },
            success: function(res) {
              if (!res.msg) {
                curRow.setValue("statusCode", "2");
                viewModel.search(true);
                toastr.success("发布成功");
              } else {
                toastr.error("发布失败");
              }
            }
          });
        },
        //终止
        stopNotice: function(index) {
          viewModel.NoticeList.setRowFocus(index);
          var curRow = viewModel.NoticeList.getFocusRow();
          var id = curRow.getValue("id");
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/stop",
            data: {
              id: id
            },
            success: function(res) {
              if (!res.msg) {
                curRow.setValue("statusCode", "3");
                viewModel.search(true);
                toastr.success("终止成功");
              } else {
                toastr.error("终止失败");
              }
            }
          });
        },
        //删除和批量删除
        del: function(data, rowId) {
          if (typeof data == "number") {
            viewModel.NoticeList.setRowSelectbyRowId(rowId);
          }
          var ids = [];
          var status = [];
          var statustip = "";
          var rows = viewModel.NoticeList.getSelectedRows();
          if (rows && rows.length > 0) {
            for (var i = 0; i < rows.length; i++) {
              ids.push(rows[i].getValue("id"));
            }
            common.dialog.confirmDialog({
              msg1: "确认删除这些项？",
              msg2: "此操作不可逆",
              width: "400px",
              type: "error",
              onOk: function() {
                $._ajax({
                  url: appCtx + viewModel.baseurl + "/delete",
                  type: "post",
                  // data: "ids=" + ids.join(","),
                  data: {
                    ids: ids.join(",")
                  },
                  success: function(data) {
                    viewModel.NoticeList.removeRows(rows);
                    toastr.success("删除成功");
                  }
                });
              }
            });
          } else {
            toastr.warning("请先选择需要删除数据");
          }
        },
        validate: function(element) {
          var result = viewModel.app.compsValidateMultiParam({
            element: element,
            showMsg: true
          });
          return result;
        },
        //新增子表项
        addItem: function() {
          viewModel.noticeCustRangeList.createEmptyRow();
        },
        //删除子表项
        delItems: function() {
          var selectedRows = viewModel.noticeCustRangeList.getSelectedRows();
          viewModel.noticeCustRangeList.removeRows(selectedRows);
        }
      },
      afterCreate: function() {
        //editor = KindEditor.create('#contentEditor');
        //生效时间
        viewModel.NoticeList.on("effectiveRange.valuechange", function(obj) {
          if (!obj.newValue) {
            return;
          }
          var rowObj = obj.rowObj;
          var range = obj.newValue.split(";");
          rowObj.setValue("effectivedate", range[0]);
          rowObj.setValue("disabledate", range[1]);
        });
        //范围改变时
        viewModel.NoticeList.on("custRange.valuechange", function(obj) {
          if (
            obj.oldValue != undefined &&
            obj.oldValue != obj.newValue &&
            obj.newValue == 2
          ) {
            $(".J-custRange").show();
          } else {
            $(".J-custRange").hide();
          }
        });
        //客户范围维护时只能选择一个字段进行维护
        viewModel.noticeCustRangeList.on(
          "customerCategoryId.valuechange",
          function(obj) {
            if (obj.oldValue != obj.newValue && obj.newValue) {
              viewModel.noticeCustRangeList.setValue("customerId", "");
              viewModel.noticeCustRangeList.setValue("customerCode", "");
              viewModel.noticeCustRangeList.setValue("customerName", "");
              viewModel.noticeCustRangeList.setValue("channelTypeId", "");
              viewModel.noticeCustRangeList.setValue("channelTypeCode", "");
              viewModel.noticeCustRangeList.setValue("channelTypeName", "");
              viewModel.noticeCustRangeList.setValue("organizationId", "");
              viewModel.noticeCustRangeList.setValue("organizationCode", "");
              viewModel.noticeCustRangeList.setValue("organizationName", "");
            }
          }
        );
        viewModel.noticeCustRangeList.on("customerId.valuechange", function(
          obj
        ) {
          if (obj.oldValue != obj.newValue && obj.newValue) {
            viewModel.noticeCustRangeList.setValue("customerCategoryId", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryCode", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryName", "");
            viewModel.noticeCustRangeList.setValue("channelTypeId", "");
            viewModel.noticeCustRangeList.setValue("channelTypeCode", "");
            viewModel.noticeCustRangeList.setValue("channelTypeName", "");
            viewModel.noticeCustRangeList.setValue("organizationId", "");
            viewModel.noticeCustRangeList.setValue("organizationCode", "");
            viewModel.noticeCustRangeList.setValue("organizationName", "");
          }
        });
        viewModel.noticeCustRangeList.on("channelTypeId.valuechange", function(
          obj
        ) {
          if (obj.oldValue != obj.newValue && obj.newValue) {
            viewModel.noticeCustRangeList.setValue("customerId", "");
            viewModel.noticeCustRangeList.setValue("customerCode", "");
            viewModel.noticeCustRangeList.setValue("customerName", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryId", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryCode", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryName", "");
            viewModel.noticeCustRangeList.setValue("organizationId", "");
            viewModel.noticeCustRangeList.setValue("organizationCode", "");
            viewModel.noticeCustRangeList.setValue("organizationName", "");
          }
        });
        viewModel.noticeCustRangeList.on("organizationId.valuechange", function(
          obj
        ) {
          if (obj.oldValue != obj.newValue && obj.newValue) {
            viewModel.noticeCustRangeList.setValue("customerId", "");
            viewModel.noticeCustRangeList.setValue("customerCode", "");
            viewModel.noticeCustRangeList.setValue("customerName", "");
            viewModel.noticeCustRangeList.setValue("channelTypeId", "");
            viewModel.noticeCustRangeList.setValue("channelTypeCode", "");
            viewModel.noticeCustRangeList.setValue("channelTypeName", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryId", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryCode", "");
            viewModel.noticeCustRangeList.setValue("customerCategoryName", "");
          }
        });
      }
    });
    return view;
  }
);
