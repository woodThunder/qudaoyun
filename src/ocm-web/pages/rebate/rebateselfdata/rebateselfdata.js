define([
  "text!./rebateselfdata.html",
  "ocm_common",
  "ocm_baseview",
  "./meta.js",
  "../../flow/bpmapproveref/bpmopenbill.js",
  "ajaxfileupload",
  "ossupload",
  "interfaceFileImpl"
], function (tpl, common, baseview, model, bpmopenbill) {
  "use strict";
  var viewModel, app;
  var appCtx = window.pathMap.rebate;
  var view = baseview.extend({
    beforeCreate: function () {
      viewModel = this.viewModel;
      app = this.app;
      viewModel = u.extend(viewModel, bpmopenbill.model);
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: "/rebate/rebate-datas",
      applicationUrl: "/rebate/rebate-datas",
      fileId: "",

      RebateDataList: new u.DataTable(model.options.metas.RebateDataMeta),
      RebateDataCard: new u.DataTable(model.options.metas.RebateDataMeta),
      RebateDataDetail: new u.DataTable(model.options.metas.RebateDataMeta),

      DataBasisList: new u.DataTable(model.options.metas.DataBasisMeta),
      DataValueList: new u.DataTable(model.options.metas.DataValueMeta),

      FileList: new u.DataTable(model.options.metas.FileMeta),

      // 比较符
      comparisonSource: ko.observableArray([{
        value: "EQ",
        name: "等于"
      }, {
        value: "NOTIN",
        name: "不等于"
      }]),

      whetherSrc: CONST.WHETHER,

      enableFormat: common.format.enableFormat,

      searchcomp: {},
      searchSource: model.options.searchs.search1,

      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      button7Source: model.options.buttons.button7,

      card1Source: model.options.cards.card1,
      detail1Source: model.options.details.detail1,

      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid4Option: model.options.grids.grid4,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid7Option: model.options.grids.grid7,
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //跳转单据详情页
      goDetailPanel: common.bill.goDetailPanel,
      billPanelStatus: ko.observable(CONST.BILLPANELSTATUS.DEFAULT),
      //返回列表页
      retListPanel: common.bill.retListPanel,
    },
    rendertype: {
      detailRender: common.rendertype.detailRender,
      operationStr: function (obj, funcName, title) {
        var dataTableRowId = obj.row.value['$_#_@_id'];
        var array = [];
        var bindArray = [];

        bindArray.push("data-bind=click:");
        bindArray.push(funcName);
        bindArray.push(".bind($data,");
        bindArray.push(obj.rowIndex);
        bindArray.push(',');
        bindArray.push(dataTableRowId);
        bindArray.push(')');

        array.push('<div class="ui-handle-icon"><span class="ui-handle-word"><a href="#" ');
        array.push(bindArray.join(''));
        array.push(' title="');
        array.push(title);
        array.push('">');
        array.push(title);
        array.push('</a></span><span class="ui-handle-word">');
        return array.join('');
      },
      operation: function (obj) {
        var str = '';
        var billState = obj.row.value.state;
        if (billState == '0') {
          // 可编辑,可提交,可删除
          str = viewModel.operationStr(obj, 'showEditBillPanel', '编辑').concat(viewModel.operationStr(obj, 'submit', '提交')).concat(viewModel.operationStr(obj, 'del', '删除'));
        } else if (billState == '1') {
          // 已提交，尚未审批 . 可收回,可审批
          str = viewModel.operationStr(obj, 'unsubmit', '收回') + viewModel.operationStr(obj, 'approve', '审批');
        } else if (billState == '3') {
          str = viewModel.operationStr(obj, 'cancelApprove', '取消审批');
        }
        obj.element.innerHTML = str;
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      rebateBasisTypeRender: function (obj) {
        var value = obj.value;
        var basisTypes = CONST.REBATEBASISTYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      },
      rebateValueTypeRender: function (obj) {
        var value = obj.value;
        var basisTypes = CONST.REBATEVALUETYPE || [];
        var findType = basisTypes.find(function (type) {
          return type.value == value;
        })
        obj.element.innerHTML = findType ? (findType.name || "") : "";
      },

      //状态
      isStateGrid: function (obj) {
        var stateValue = viewModel.RebateDataList.getRow(obj.rowIndex).getValue("state");
        var stateName = "";
        if (stateValue == 0) {
          (stateName = "待处理")
        }
        if (stateValue == 1) {
          (stateName = "已提交")
        }
        if (stateValue == 2) {
          (stateName = "审批中")
        }
        if (stateValue == 3) {
          (stateName = "审批通过")
        }
        if (stateValue == 4) {
          (stateName = "审批不通过")
        }
        obj.element.innerHTML = stateName;
      }
    },
    events: {
      isState: ko.pureComputed(function () {
        var stateValue = viewModel.RebateDataList.ref("state")();
        var stateName;

        if (stateValue == 0) {
          (stateName = "待处理")
        }
        if (stateValue == 1) {
          (stateName = "已提交")
        }
        if (stateValue == 2) {
          (stateName = "审批中")
        }
        if (stateValue == 3) {
          (stateName = "审批通过")
        }
        if (stateValue == 4) {
          (stateName = "审批不通过")
        }
        return stateName;
      }),

      // 根据主键获取主子表信息
      getParentInfo: function (id, callback) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail",
          type: "get",
          data: {
            id: id
          },
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.fileId = data.fileId;
            if (typeof callback == "function") {
              callback(data);
            }
            viewModel.fileQuery();
          }
        });
      },
      // 清空
      clearPanelData: function () {
        viewModel.RebateDataCard.clear();
        viewModel.RebateDataDetail.clear();
        viewModel.DataBasisList.clear();
        viewModel.DataValueList.clear();
        viewModel.FileList.clear();
      },

      //进入新增单据页
      showAddBillPanel: function () {
        viewModel.clearPanelData();
        viewModel.isEditTip = true;
        var curRow = viewModel.RebateDataCard.createEmptyRow();
        curRow.setValue("state", "0");
        $.ajax({
          type: 'get',
          async: 'false',
          url: '/occ-base/base/goods/get-uuid',
          success: function (uuid) {
            curRow.setValue("fileId", uuid);
            viewModel.fileId = uuid;
          }
        });
        viewModel.goBillPanel();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function (index, rowId) {
        viewModel.clearPanelData();
        viewModel.index = index;
        viewModel.rowId = rowId;
        viewModel.isEditTip = true;
        var originEditData = viewModel.RebateDataList.getRowByRowId(rowId).getSimpleData();
        var mainId = originEditData.id;
        //请求完整主子表信息
        viewModel.getParentInfo(mainId, function (data) {
          viewModel.RebateDataCard.setSimpleData(data);
          viewModel.setRefparamByHeadInfo(data);
          viewModel.DataBasisList.setSimpleData(data.dataBasis, {
            unSelect: true
          });
          viewModel.DataValueList.setSimpleData(data.dataValues, {
            unSelect: true
          });
        });
        viewModel.goBillPanel();
        //设置tab显示基本信息
        $(".ui-bill-panel .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
        $(".ui-bill-panel .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },

      //点击保存按钮
      saveHandle: function () {
        var infoBase = $("#rebateDataEditPanel")[0];
        var basePass = viewModel.validate(infoBase);
        if (basePass.passed) {
          viewModel.edit();
        }
      },

      //将操作后的数据进行保存
      edit: function (index) {
        var postdata = viewModel.RebateDataCard.getSimpleData()[0];
        var dataBasis = viewModel.DataBasisList.getSimpleData();
        var dataValues = viewModel.DataValueList.getSimpleData();
        postdata.dataBasis = dataBasis;
        postdata.dataValues = dataValues;
        var type = "post";
        if (postdata.id) {
          type = "put";
          postdata.persistStatus = "upd";
        } else {
          postdata.persistStatus = "new";
        }
        //更改后台数据
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: type,
          data: JSON.stringify(postdata),
          contentType: "application/json; charset=utf-8",
          success: function (data) {
            viewModel.isEditTip = false;
            toastr.success("保存成功");
            viewModel.retListPanel();
            viewModel.search();
          }
        });
      },
      validate: function (element) {
        var result = viewModel.app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      //主表删除和批量删除
      del: function (data, rowId) {
        if (typeof data == "number") {
          viewModel.RebateDataList.setRowSelect(
            viewModel.RebateDataList.getRowByRowId(rowId)
          );
        }
        var ids = [];
        var rows = viewModel.RebateDataList.getSelectedRows();
        var status = [];
        var statustip = "";
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
            var state = rows[i].getValue("state");
            if (state != "0") {
              status.push(rows[i].getValue("billCode"));
            }
          }
          if (status.length > 0) {
            var statusArr = function () {
              for (i = 0; i < status.length; i++) {
                statustip += status[i] + "，";
              }
              return statustip.substring(0, statustip.length - 1);
            };

            toastr.warning("数据   " + statusArr() + " 非【待处理】状态，不可删除");
            return false;
          }
          common.dialog.confirmDialog({
            msg1: "确认删除这些项？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function () {
              $._ajax({
                url: appCtx + viewModel.baseurl + "/delete",
                type: "post",
                data: "ids=" + ids.join(","),
                success: function (data) {
                  toastr.success("删除成功");
                  viewModel.search();
                }
              });
            }
          });
        } else {
          toastr.warning("请先选择要删除的数据");
        }
      },
      //子表 删除和批量删除
      delChild: function (dataTable) {
        var rows = viewModel[dataTable].getSelectedRows();
        viewModel[dataTable].removeRows(rows);
      },
      //子表增行
      addRow: function (dataTable) {
        var curRow = viewModel.RebateDataCard.getCurrentRow();
        var saleOrgId = curRow.getValue("saleOrgId");
        var salePolicyId = curRow.getValue("salePolicyId");
        if (!(saleOrgId && salePolicyId)) {
          toastr.warning("请先维护表头的销售组织，返利政策！");
          return;
        }
        var curRow = viewModel[dataTable].createEmptyRow();
        if (dataTable == "DataValueList") {
          var cardRow = viewModel.RebateDataCard.getCurrentRow();
          var rebateValueType = cardRow.getValue("rebateValueType");
          curRow.setValue("rebateValueType", rebateValueType);
        }
      },
      //查看详情
      detail: function () {
        //确保grid先将行设置为focus状态
        setTimeout(function () {
          viewModel.clearPanelData();
          var curRow = viewModel.RebateDataList.getCurrentRow();
          var mainId = curRow.getValue("id");
          viewModel.getParentInfo(mainId, function (data) {
            viewModel.RebateDataDetail.setSimpleData(data);
            viewModel.DataBasisList.setSimpleData(data.dataBasis, {
              unSelect: true
            });
            viewModel.DataValueList.setSimpleData(data.dataValues, {
              unSelect: true
            });
          });
          viewModel.goDetailPanel();
          //设置tab显示基本信息
          $(".ui-bill-detail .u-tabs__tab").eq(0).addClass("is-active").siblings(".u-tabs__tab").removeClass("is-active");
          $(".ui-bill-detail .u-tabs__panel").eq(0).addClass("is-active").siblings(".u-tabs__panel").removeClass("is-active");
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
        }, 0);
      },

      //点击取消 单据页
      cancelHandle: function () {
        viewModel.backListPrompt();
      },
      backListPrompt: function () {
        // 如果是编辑标识，则返回列表时需给出提示
        if (viewModel.isEditTip) {
          common.dialog.confirmDialog({
            msg1: "有数据尚未保存，是否先保存数据?",
            msg2: "点击确认，将返回列表页",
            width: "400px",
            type: "error",
            onOk: function () {
              $("#code-text").empty();
              viewModel.search();
              viewModel.retListPanel();
            }
          });
        } else {
          viewModel.search();
          viewModel.retListPanel();
        }

      },
      //返回
      backPanel: function () {
        viewModel.search();
        viewModel.retListPanel();
      },

      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function (reindex) {
        if (reindex) {
          viewModel.RebateDataList.pageIndex(0);
        }
        viewModel.RebateDataList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr();
        queryData.size = viewModel.RebateDataList.pageSize();
        queryData.page = viewModel.RebateDataList.pageIndex();

        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function (data) {
            viewModel.RebateDataList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.RebateDataList.totalRow(data.totalElements);
            viewModel.RebateDataList.totalPages(data.totalPages);
          }
        });
      },
      //清空搜索条件
      cleanSearch: function () {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function (index) {
        viewModel.RebateDataList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function (size) {
        viewModel.RebateDataList.pageSize(size);
        viewModel.search(true);
      },


      //导入---返利依据 暂留
      importCustomer: function () {
        var urlInfo = "/rebate-data-excel/excelDataImport"; //倒入地址参数
        var urlStatusInfo = "/rebate-data-excel/excelLoadingStatus"; //请求进度地址参数
        var ele = $("#importFiel")[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出---返利依据 暂留
      exportCustomer: function () {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = "/rebate-data-excel/downloadExcelTemplate"; //导出模板地址参数
        var excelDataUrl = "/rebate-data-excel/excelDataExport"; //导出数据地址参数
        var listData = viewModel.RebateDataList; //需要导出表格的dataTable
        var ele = $("#exportFiel")[0]; //挂载元素
        common.fileHandle.exportFile(
          listData,
          ele,
          searchParams,
          templateUrl,
          excelDataUrl
        );
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交
      submit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.RebateDataList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "RebateDataList";
        var nodeJs = "/ocm-web/pages/rebate/rebateselfdata/rebateselfdata.js";
        var billTypeCode = "RebateSelfData";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },

      // 收回
      unsubmit: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.RebateDataList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "RebateDataList";
        var billTypeCode = "RebateSelfData";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过
      approve: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.RebateDataList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "RebateDataList";
        var billTypeCode = "RebateSelfData";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.RebateDataList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 审批不通过
      disapprove: function () {
        var listCompId = "RebateDataList";
        var billTypeCode = "RebateSelfData";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.RebateDataList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 取消审批
      cancelApprove: function (data, rowId) {
        if (typeof (data) == 'number') {
          viewModel.RebateDataList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "RebateDataList";
        var billTypeCode = "RebateSelfData";
        var tranTypeCode = null;
        var withBpmCallback = function () {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.RebateDataList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      // 审批流程的相关按钮点击事件 - end

      // 表头监听事件重置数据
      resetBodyGridRows: function (obj) {
        viewModel.DataBasisList.removeAllRows();
        viewModel.DataValueList.removeAllRows();
        var curRow = viewModel.RebateDataCard.getCurrentRow();
        // 清空周期等信息
        curRow.setValue("cycleId", "");
        curRow.setValue("cycleCode", "");
        curRow.setValue("cycleName", "");
        curRow.setValue("startTime", "");
        curRow.setValue("endTime", "");
        // 为返利客户增加销售组织过滤条件
        if (obj.field == "saleOrgId") {
          curRow.setValue("salePolicyId", "");
          // 需求变更，客户直接参照档案
          // var refparam = {
          //   EQ_isEnable: "1",
          //   EQ_isChannelCustomer: "1",
          //   EQ_SaleOrder: obj.newValue
          // }
          // viewModel.DataBasisList.meta.customerId.refparam = JSON.stringify(refparam);
          // viewModel.DataValueList.meta.customerId.refparam = JSON.stringify(refparam);
        }
        if (obj.field == "salePolicyId") {
          // 重新设置周期等信息
          var policyRefer = $("#refContainersalePolicyReferId").data("uui.refer");
          if (policyRefer && policyRefer.values) {
            var policyData = policyRefer.values[0];
            curRow.setValue("cycleId", policyData.cycleId);
            curRow.setValue("cycleCode", policyData.cycleCode);
            curRow.setValue("cycleName", policyData.cycleName);
            curRow.setValue("startTime", policyData.startTime);
            curRow.setValue("endTime", policyData.endTime);
            curRow.setValue("rebateValueType", policyData.rebateValueType);
          }
          var refparam = {
            "EQ_policy.id": obj.newValue
          }
          viewModel.DataBasisList.meta.basisId.refparam = JSON.stringify(refparam);
        }
      },
      //--------------------------------附件管理-------------------------------------------------
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
        viewModel.fileQuery();
        if (!fileDialog) {
          fileDialog = u.dialog({
            content: "#file-dialog",
            hasCloseMenu: true
          });
        } else {
          fileDialog.show();
        }
      },
      onOpenUploadBtn: function () {
        $("#uploadbatch_id").val(undefined);
        $("#uploadbatch_id").trigger("click");
      },

      //上传附件
      onFileUpload: function () {
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
          var pk = viewModel.fileId;
          var par = {
            fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
            // />,可以修改，主要看你使用的 id是什么
            filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
            groupname: pk, //【必填】分組名称,未来会提供树节点
            permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
            url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
            //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          };
          var f = new interface_file();
          f.filesystem_upload(par, viewModel.fileUploadCallback);
        } else {
          toastr.warning("图片总和不能超过500MB");
          return false;
        }
      },
      //上传文件回传信息
      fileUploadCallback: function (data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.FileList.addSimpleData(data.data[0]);
          //  toastr.success();
        } else {
          //error 或者加載js錯誤
          toastr.error(data.message);
        }
      },
      fileQuery: function () {
        //获取表单
        var pk = viewModel.fileId;
        var par = {
          //建议一定要有条件否则会返回所有值
          filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: pk, //【选填】[分組名称,未来会提供树节点]
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        };
        var f = new interface_file();
        f.filesystem_query(par, viewModel.fileQueryCallBack);
      },
      fileQueryCallBack: function (data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.FileList.setSimpleData(data.data);
        } else {
          //删除成功后查询
          if (data.status == 0 && !data.data) {
            viewModel.FileList.setSimpleData([]);
          }
        }
      },
      //附件删除
      fileDelete: function () {
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
          f.filesystem_delete(par, viewModel.fileDeleteCallBack);
        }
      },
      //附件删除回调
      fileDeleteCallBack: function (data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.fileQuery();
        } else {
          toastr.error(data.message);
        }
      },
      //下载
      fileDownload: function () {
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
      fileView: function () {
        var row = viewModel.FileList.getSelectedRows();
        if (row == null || row.length == 0) {
          toastr.error("请选择一个附件");
          return;
        }
        for (var i = 0; i < row.length; i++) {
          var url = row[i].getValue("url");
          parent.open(location.origin + url);
        }
      },
      //--------------------------------附件管理-------------------------------------------------
      //清空参照
      clearRefer: function (referId) {
        setTimeout(function () {
          var refer = $("#refContainer" + referId).data("uui.refer");
          refer.uncheckAll();
          refer.setValue([]);
        }, 100);
      },
      // 批量添加商品
      batchAddGoods: function (obj, type) {
        var curRow = viewModel[type].getRowByRowId(obj.rowId);
        curRow.setValue("unitId", "");
        curRow.setValue("unitName", "");
        var goodsRefer = $("#refContainergoodsId").data("uui.refer");
        if (goodsRefer && goodsRefer.values) {
          var refValues = goodsRefer.values;
          $("#refContainergoodsId").data("uui.refer").setValue("");
          curRow.setValue("goodsId", refValues[0].refpk || refValues[0].itemVal.refpk);
          curRow.setValue("goodsName", refValues[0].refname || refValues[0].itemVal.refname);
          curRow.setValue("unitId", refValues[0].basicUnitId || refValues[0].itemVal.basicUnitId);
          curRow.setValue("unitName", refValues[0].basicUnitName || refValues[0].itemVal.basicUnitName);
          if (refValues.length > 1) {
            for (var i = 1; i < refValues.length; i++) {
              var newRow = viewModel[type].createEmptyRow({
                unSelect: true
              });
              if (type == "DataValueList") {
                var cardRow = viewModel.RebateDataCard.getCurrentRow();
                var rebateValueType = cardRow.getValue("rebateValueType");
                newRow.setValue("rebateValueType", rebateValueType);
              }
              newRow.setValue("goodsId", refValues[i].refpk || refValues[0].itemVal.refpk);
              newRow.setValue("goodsName", refValues[i].refname || refValues[0].itemVal.refname);
              newRow.setValue("unitId", refValues[i].basicUnitId || refValues[0].itemVal.basicUnitId);
              newRow.setValue("unitName", refValues[i].basicUnitName || refValues[0].itemVal.basicUnitName);
            }
          }
          //viewModel.clearRefer("goodsId");
        }
      },
      setRefparamByHeadInfo: function (data) {
        var refparam = {
          EQ_state: "3",
          EQ_saleOrg: data.saleOrgId
        };
        $("#salePolicyDomId").attr("data-refparam", JSON.stringify(refparam));
        refparam = {
          "EQ_policy.id": data.salePolicyId
        }
        viewModel.DataBasisList.meta.basisId.refparam = JSON.stringify(refparam);
      }
    },
    afterCreate: function () {
      $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
        if (this.value) {
          viewModel.onFileUpload();
        }
      });

      viewModel.RebateDataCard.off("saleOrgId.valuechange").on("saleOrgId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.resetBodyGridRows(obj);
          var refparam = {
            EQ_state: "3",
            EQ_saleOrg: obj.newValue
          };
          $("#salePolicyDomId").attr("data-refparam", JSON.stringify(refparam));
        }
      });
      viewModel.RebateDataCard.off("salePolicyId.valuechange").on("salePolicyId.valuechange", function (obj) {
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.resetBodyGridRows(obj);
        }
      });
      viewModel.DataBasisList.off("basisId.valuechange").on("basisId.valuechange", function (obj) {
        var curRow = viewModel.DataBasisList.getRowByRowId(obj.rowId);
        curRow.setValue("rebateBasisType", "");
        if (obj.newValue && obj.newValue != obj.oldValue) {
          var basisRefer = $("#refContainerbasisId").data("uui.refer");
          if (basisRefer && basisRefer.values) {
            var basisData = basisRefer.values[0];
            curRow.setValue("rebateBasisType", basisData.rebateBasisType);
            //viewModel.clearRefer("basisId");
          }
        }
      });
      viewModel.DataBasisList.off("goodsId.valuechange").on("goodsId.valuechange", function (obj) {
        // var curRow = viewModel.DataBasisList.getRowByRowId(obj.rowId);
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.batchAddGoods(obj, "DataBasisList");
        }
      });
      viewModel.DataValueList.off("goodsId.valuechange").on("goodsId.valuechange", function (obj) {
        // var curRow = viewModel.DataValueList.getRowByRowId(obj.rowId);
        if (obj.newValue && obj.newValue != obj.oldValue) {
          viewModel.batchAddGoods(obj, "DataValueList");
        }
      });
    }
  });

  return view;
});