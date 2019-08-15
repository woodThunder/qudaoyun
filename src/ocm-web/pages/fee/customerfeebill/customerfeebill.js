define(['text!./customerfeebill.html', 'ocm_common', 'ocm_baseview', './meta.js', '../../flow/bpmapproveref/bpmopenbill.js', "ajaxfileupload",
  "ossupload",
  "interfaceFileImpl",
  "ocm_kindeditor", "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function(tpl, common, baseview, model, bpmopenbill) {
  'use strict'
  var viewModel, appCtx = "/occ-fee/fee",
    app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  }
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/customer-applys',
      applicationUrl: '/fee/customer-applys',
      complexList: new u.DataTable(model.options.metas.complex),
      complexItems: new u.DataTable(model.options.metas.complexItem),
      // ItemRefList: new u.DataTable(model.options.metas.ItemRef),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      // 行号池
      curRowNum: ko.observable(0),

      attachList: [],
      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      enableRadioSrc: [{
        value: "1",
        name: "启用"
      }, {
        value: "0",
        name: "停用"
      }, {
        value: CONST.DEFAULTOPTION,
        name: "全部"
      }],
      enableCheckSrc: [{
        value: "1",
        name: "是"
      }],
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      // retListPanel: common.bill.retListPanel,
      //跳转详情页
      goDetailPanel: common.bill.goDetailPanel,
      // enableFmt: function() {
      //   var row = viewModel.complexList.getFocusRow();
      //   if(!row) {
      //     return;
      //   }
      //   var enableStatus = row.getValue("enableStatus");
      //   return enableStatus==1? "启用":"停用";
      // },
      stateFmt: ko.pureComputed(function() {
        var states = viewModel.complexList.ref("state")();
        switch (states) {
          case '0':
            return '保存'
          case '1':
            return '已提交'
          case '2':
            return '审批中'
          case '3':
            return '审批通过'
          case '4':
            return '审批不通过'
          default:
            return '保存'
        }
      })
    },
    rendertype: {
      operation: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var state = obj.row.value["state"];
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

          if(state=='0'|| !state){
            obj.element.innerHTML =
              '<div class="ui-handle-icon">' +
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              editfun +
              ' title="编辑">编辑</a>' +
              "</span>    " +
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              delfun +
              ' title="删除">删除</a>' +
              "</span></div>";
            }else{
              obj.element.innerHTML =
              '<div class="ui-handle-icon">' +
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              delfun +
              ' title="删除">删除</a>' +
              "</span></div>";
            }
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      detailRender: common.rendertype.detailRender,
      billStatusRender: function(params) {
        // params.element.innerHTML = "停用";
        if (params.value == 0 || params.value == "0") {
          params.element.innerHTML = "保存";
        }
        if (params.value == 1 || params.value == "1") {
          params.element.innerHTML = "已提交";
        }
        if (params.value == 2 || params.value == "2") {
          params.element.innerHTML = "审批中";
        }
        if (params.value == 3 || params.value == "3") {
          params.element.innerHTML = "审批通过";
        }
        if (params.value == 4 || params.value == "4") {
          params.element.innerHTML = "审批不通过";
        }
        if (params.value == 9 || params.value == "9") {
          params.element.innerHTML = "关闭";
        }
      },
    },
    events: {
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.complexList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].getValue("id"));
          }
        }
        common.dialog.confirmDialog({
          msg1: '确认删除这些项？',
          msg2: '此操作不可逆',
          width: '400px',
          type: 'error',
          onOk: function() {
            $._ajax({
              url: appCtx + viewModel.baseurl + "/delete",
              type: "post",
              // data: "ids=" + ids.join(","),
              data: {
                ids: ids.join(",")
              },
              success: function(data) {
                viewModel.complexList.removeRows(rows);
              }
            });

          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.complexList.pageIndex(0);
        }
        viewModel.complexList.removeAllRows();
        var queryData = viewModel.searchcomp.getDataWithOpr ? viewModel.searchcomp.getDataWithOpr() : {};
        var pageSize = viewModel.complexList.pageSize();
        var pageNumber = viewModel.complexList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.complexList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.complexList.totalRow(data.totalElements);
            viewModel.complexList.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      cleanSearch: function() {
        viewModel.searchcomp.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.complexList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.complexList.pageSize(size);
        viewModel.search(true);
      },
      //日期格式化
      format: function(shijianchuo) {
        //日期格式格式化
        function add0(m) {
          return m < 10 ? '0' + m : m
        }
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
      },

      //进入新增单据页
      showAddBillPanel: function() {
        var curRow = viewModel.complexList.createEmptyRow();
        viewModel.complexList.setRowFocus(curRow);
        viewModel.complexItems.removeAllRows();
        curRow.setValue("billDate", viewModel.format(new Date()));
        $.ajax({
          type: 'get',
          async: 'false',
          url: '/occ-base/base/goods/get-uuid',
          success: function(uuid) {
            viewModel.pk = uuid;
            curRow.setValue('ext01', uuid);
          }
        });
        // 行号设置为0
        viewModel.curRowNum(0);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.complexList.setRowFocus(index);
       
        var id = viewModel.complexList.getValue("id");
        viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.pk = viewModel.complexList.getValue('ext01');
        viewModel.queryAttach();
        viewModel.getCurRowNum();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 从行号池中拿到最新的行号
      generateRownum: function() {
        var latestnum = viewModel.curRowNum(),
          newnum = latestnum + 10;
        viewModel.curRowNum(newnum);
        return newnum;
      },
      getCurRowNum: function() {
        var data = viewModel.complexItems.getSimpleData();
        var maxRowNum = 0;
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].rowNum > maxRowNum) {
              maxRowNum = data[i].rowNum;
            }
          }
        }
      },
      //详情
      // 方案1：clone编辑态模板，设置只读，返回删除
      // 方案2：重新定义详情模板
      // 主要看差异，如果差异不大公用模板，差异大重新定义
      // detail: function() {
      //   //确保grid先将行设置为focus状态
      //   setTimeout(function(){
      //     var curRow = viewModel.complexList.getCurrentRow();
      //     var id = curRow.getValue("id");
      //     viewModel.findByParentid(id);
      //     var $detailWrap = $("#bill-detail-wrap");
      //     $detailWrap.empty();
      //     var $billPanel_cl = $(".ui-bill-panel").clone();
      //     $billPanel_cl.show();
      //     $detailWrap.append($billPanel_cl);
      //     viewModel.showBillDetail();
      //     u.compMgr.updateComp($detailWrap[0]);
      //   }, 0);
      // },
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.pk = curRow.getValue('ext01');
          viewModel.queryAttach();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail/" + id,
          type: 'get',
          async: false,
          success: function(data) {
            viewModel.complexItems.setSimpleData(data.billDetails);
          }
        })
      },
      // 清除基类属性
      clearBaseProp: function(row) {
        row.setValue("id", "");
        row.setValue("code", "");
        row.setValue("name", "");
        row.setValue("creator", "");
        row.setValue("creationTime", "");
        row.setValue("modifier", "");
        row.setValue("modifiedTime", "");
      },
      //跳转单据详情页
      showBillDetail: function() {
        $(".ui-list-panel").addClass("animated slideInLeft");
        $(".ui-bill-panel").addClass("animated slideOutDown");
      },
      //新增子表项
      addItem: function() {
        viewModel.complexItems.createEmptyRow();
      },
      //批量新增子表项
      // addItems: function() {
      //
      // },
      //删除子表项
      delItems: function() {
        var selectedRows = viewModel.complexItems.getSelectedRows();
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.complexItems.removeRows(selectedRows);
      },
      //保存单据
      saveBill: function() {
        var result = app.compsValidateMultiParam({
          element: ".ui-bill-panel",
          showMsg: true
        });
        if (!result.passed) {
          return;
        }
        var allRows = viewModel.complexItems.getAllRows();
        if (allRows.length == 0 || allRows.every(function(row) {
            return row.status == u.Row.STATUS.FALSE_DELETE
          })) {
          toastr.error("请录入表体行数据");
          return;
        }
        var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
        var complexItemsData = viewModel.complexItems.getSimpleData();
        complexData.billDetails = complexItemsData;
        var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.complexList.getFocusRow().setSimpleData(data);
            viewModel.retListPanel();
          }
        })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //取消单据
      cancelBill: function() {
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.complexList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.complexList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.complexList.removeRow(curRow);
          viewModel.complexItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交申请单
      submitCusReqForm: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var nodeJs = "/ocm-web/pages/fee/customerfeebill/customerfeebill.js";
        var billTypeCode = "CustomerApply";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmSubmit(viewModel, listCompId, nodeJs, billTypeCode, tranTypeCode, callback);
      },

      // 收回申请单
      unsubmitCusReqForm: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "CustomerApply";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过申请单
      approveCusReqForm: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "CustomerApply";
        var tranTypeCode = null;

        var withBpmCallback = function() {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.complexList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.approveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);

      },

      // 审批不通过申请单
      disapproveCusReqForm: function() {
        var listCompId = "complexList";
        var billTypeCode = "CustomerApply";
        var tranTypeCode = null;
        var withBpmCallback = function() {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.complexList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.disapproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },

      // 取消审批申请单
      cancelApproveCusReqForm: function(data, rowId) {
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "CustomerApply";
        var tranTypeCode = null;
        var withBpmCallback = function() {
          var index = viewModel[listCompId].getSelectedIndex();
          var rowId = viewModel[listCompId].getSelectedRows()[0].rowId;
          var id = viewModel.complexList.getRow(index).getValue('id');
          viewModel.detail(index, rowId);
          viewModel.initBPMFromBill(id, viewModel);
        };
        var withoutBpmCallback = null;
        viewModel.cancelApproveWithoutBpm(viewModel, listCompId, billTypeCode, tranTypeCode, withBpmCallback,
          withoutBpmCallback);
      },
      // 审批流程的相关按钮点击事件 - end
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        var rowNum = viewModel.generateRownum();
        var newrow = viewModel.complexItems.createEmptyRow();
        newrow.setValue("serialNum", rowNum);
        // viewModel.clearItemsRef();
        // $("#addItemsRef .refer").trigger("click");
      },
      //清空已选销售产品参照
      // clearItemsRef: function() {
      //   viewModel.ItemRefList.setValue("productref", "");
      //   var refer = $("#refContainerproductref").data("uui.refer");
      //   refer.uncheckAll();
      //   refer.setValue([]);
      // },
      detail2bill: function() {
       
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      //整单关闭
      allbillclose: function() {
        var allSelectRows = viewModel.complexList.getSelectedRows();
        if (allSelectRows.length < 1) {
          toastr.warning('请至少选择一条数据！')
          return;
        } else {
          var ids = allSelectRows.map(function(item) {
            return item.getValue('id')
          });
          $._ajax({
            url: appCtx + viewModel.baseurl + '/close',
            type: 'post',
            data: {
              ids: ids.join(",")
            },
            // contentType: "application/json; charset=utf-8",
            success: function(data) {
              // viewModel.complexList.getFocusRow().setSimpleData(data);
              // viewModel.retListPanel();
            }
          })
        }
      },
      //整单打开
      allbillopen: function() {
        var allSelectRows = viewModel.complexList.getSelectedRows();
        if (allSelectRows.length < 1) {
          toastr.warning('请至少选择一条数据！')
          return;
        } else {
          var ids = allSelectRows.map(function(item) {
            return item.getValue('id')
          });
          $._ajax({
            url: appCtx + viewModel.baseurl + '/open',
            type: 'post',
            data: {
              ids: ids.join(",")
            },
            // contentType: "application/json; charset=utf-8",
            success: function(data) {
              // viewModel.complexList.getFocusRow().setSimpleData(data);
              // viewModel.retListPanel();
            }
          })
        }
      },
      //详情 行打开
      lineopen: function() {
        var allSelectRows = viewModel.complexItems.getSelectedRows();
        if (allSelectRows.length < 1) {
          toastr.warning('请至少选择一条数据！')
          return;
        } else {
          var ids = allSelectRows.map(function(item) {
            return item.getValue('id')
          });
          $._ajax({
            url: appCtx + '/customer-apply-details/open',
            type: 'post',
            data: {
              ids: ids.join(",")
            },
            // contentType: "application/json; charset=utf-8",
            success: function(data) {
              // viewModel.complexList.getFocusRow().setSimpleData(data);
              // viewModel.retListPanel();
            }
          })
        }
      },
      //详情 行关闭
      lineclose: function() {
        var allSelectRows = viewModel.complexItems.getSelectedRows();
        if (allSelectRows.length < 1) {
          toastr.warning('请至少选择一条数据！')
          return;
        } else {
          var ids = allSelectRows.map(function(item) {
            return item.getValue('id')
          });
          $._ajax({
            url: appCtx + '/customer-apply-details/close',
            type: 'post',
            data: {
              ids: ids.join(",")
            },
            // contentType: "application/json; charset=utf-8",
            success: function(data) {
              // viewModel.complexList.getFocusRow().setSimpleData(data);
              // viewModel.retListPanel();
            }
          })
        }
      },
      //上传附件开始
      doupload: function() {
        //获取表单
        var pk = viewModel.pk;
        var par = {
          fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file"
          // />,可以修改，主要看你使用的 id是什么
          filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: pk, //【必填】分組名称,未来会提供树节点
          permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
          url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
          uploadPic: true, //覆盖上传
          isreplace: true,
          //thumbnail :  "500w",//【选填】缩略图--可调节大小，和url参数配合使用，不会存储到数据库
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        };
        var f = new interface_file();
        f.filesystem_upload(par, viewModel.fileUploadCallbackGoods);
      },

      doFileDelete: function(ids) {
        $._ajax({
          url: appCtx + viewModel.pictureurl + "/delete",
          type: "post",
          async: false,
          data: {
            ids: ids.join(",")
          },
          success: function() {
            // toastr.success("删除成功");
            // viewModel.search();
          }
        });
      },
      fileDelete: function(id) {
        var par = {
          id: id, //【必填】表的id
          cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
        };
        var f = new interface_file();
        f.filesystem_delete(par, viewModel.fileDeleteCallBack);
        // }
      },
      //附件删除回调
      fileDeleteCallBack: function(data) {
        if (1 == data.status) { //删除成功状态
          // viewModel.queryImage();
          viewModel.queryAttach();
        } else {
          toastr.error(data.message);
        }
      },
      showAttachment: function() {
        // app.getComp("c1").setComboData([{ value: 'test1', name: '附件一678' }, { value: 'test2', name: '附件二' }])
        var attachList = viewModel.attachList;
        var htmlStr = "<div>";
        for (var i = 0; i < attachList.length; i++) {
          // htmlStr += "<img width=\"150\" height=\"150\" src=\""+picArr[i].url+"\" style=\"margin:5px;\"\/>"
          htmlStr += "<div style=\"display:flex\">";
          htmlStr += "<input id=\"" + attachList[i].id + "\" class=\"attachSelect\" type=\"checkbox\">";
          htmlStr += "<span>" + attachList[i].filename + "</span>";
          htmlStr +=
            "<a id=\"down_" + attachList[i].id + "\" href=\"" + attachList[i].url + "\" download = \"" +
            attachList[i].filename.split("\.")[0] + "\">下载</a>";
          htmlStr +=
            "<div id=\"" + attachList[i].id + "\" class=\"attach-del\" data-bind=\"fileDelete\">删除</div>";
          htmlStr += "</div>";
        }
        htmlStr += "</div>";

        $("#goods-card-attach")[0].innerHTML = htmlStr;
        $("#goods-add-attach").click(function() {
          $("#attachuploadbatch_id").val(undefined);
          $("#attachuploadbatch_id").trigger("click");
        });
        $(".attach-del").click(function(e) {
          viewModel.fileDelete(e.currentTarget.id);
        });
        //detail页面
        var detailStr = "<div>";
        for (var i = 0; i < attachList.length; i++) {
          detailStr += "<div style=\"display:flex\">";
          // detailStr += "<input id=\"" + attachList[i].id + "\" class=\"attachSelect\" type=\"checkbox\">"
          detailStr += "<span>" + attachList[i].filename + "</span>";
          // detailStr += "<a id=\"down_" + attachList[i].id + "\" href=\"" + attachList[i].url + "\"
          // download = \"" + attachList[i].filename.split("\.")[0] + "\">下载</a>"
          detailStr += "</div>";
        }
        detailStr += "</div>";

        $("#goods-detail-attach")[0].innerHTML = detailStr;

      },
      btnDelAttach: function() {
        var row = $(".attachSelect");

        for (var i = 0; i < row.length; i++) {
          if (!row[i].checked) {
            continue;
          }
          viewModel.fileDelete(row[i].id);
        }
      },

      downLoadAttachBatch: function() {
        //下载
        var row = $(".attachSelect");

        for (var i = 0; i < row.length; i++) {
          if (!row[i].checked) {
            continue;
          }
          var pk = "down_" + row[i].id;
          $("#" + pk)[0].click();
          // var pk = row[i].id;
          // var form = $("<form>");   //定义一个form表单
          // form.attr('style', 'display:none');   //在form表单中添加查询参数
          // form.attr('target', '');
          // form.attr('enctype', 'multipart/form-data');
          // form.attr('method', 'post');
          // form.attr('action', window.ctxfilemng + "file/download?permission=read&stream=false&id=" + pk);
          // $('#file-form').append(form);  //将表单放置在web中
          // form.submit();
        }
      },


      downLoadAttach: function() {
        //下载
        var row = viewModel.attachList;

        for (var i = 0; i < row.length; i++) {
          var pk = "down_" + row[i].id;
          $("#" + pk).trigger("click");
          // var form = $("<form>");   //定义一个form表单
          // form.attr('style', 'display:none');   //在form表单中添加查询参数
          // form.attr('target', '');
          // form.attr('enctype', 'multipart/form-data');
          // form.attr('method', 'post');
          // form.attr('action', window.ctxfilemng + "file/download?permission=read&stream=false&id=" + pk);
          // $('#file-form').append(form);  //将表单放置在web中
          // form.submit();
        }
      },

      //点击上传按钮
      btnUploadAttach: function() {
        $("#attachuploadbatch_id").val(undefined);
        $("#attachuploadbatch_id").trigger("click");

      },
      uploadAttach: function() {
        var fileNum = $("#attachuploadbatch_id")[0].files.length;
        var fileSize = 0;
        var fileSizeMb = 0;
        var fileTypeArr = [];

        var pk = viewModel.pk;
        var par = {
          fileElementId: "attachuploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file"
          // name="file"
          // />,可以修改，主要看你使用的 id是什么
          filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: "att" + pk, //【必填】分組名称,未来会提供树节点
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
      queryAttach: function() {
        //获取表单
        var pk = viewModel.pk;
        var par = {
          fileElementId: "attachuploadbatch_id",
          //建议一定要有条件否则会返回所有值
          filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
          groupname: "att" + pk, //【选填】[分組名称,未来会提供树节点]
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
      //上传附件结束
    },
    afterCreate: function() {
      app = viewModel.app;
      // 列表查询数据(无查询条件)
      viewModel.search();
      viewModel.complexList.on('saleOrgId.valuechange', function(obj) {
        if (!obj.newValue) return;
        var refer = $('div[id^="refContainersaleOrgId"]').data("uui.refer");
        var refValues = refer.values,
          orgId;
        if (refValues && refValues.length > 0) {
          orgId = refValues[0].refpk;
          $._ajax({
            url: '/occ-base/base/org-func-rels/find-by-orgid',
            type: 'get',
            data: {
              id: orgId
            },
            // contentType: "application/json; charset=utf-8",
            success: function(data) {
              if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].orgFuncId == '07') {
                    viewModel.complexList.setValue('financeOrgId', orgId);
                    break;
                  }
                }
              }

              // viewModel.complexList.getFocusRow().setSimpleData(data);
              // viewModel.retListPanel();
            }
          })
        }
      });
      viewModel.complexItems.on("actuallyMny.valuechange", function(obj) {
        if (obj.newValue == '') obj.newValue = '0'
        if (!obj.newValue) return;
        if (obj.newValue < 0) {
          obj.rowObj.setValue('actuallyMny', '0');
          return;
        }
        var allRows = viewModel.complexItems.getAllRows(),
          tMny = parseFloat(obj.newValue);
        for (var i = 0; i < allRows.length; i++) {
          if (obj.rowId != allRows[i].rowId && allRows[i].getValue('actuallyMny')) {
            tMny += parseFloat(allRows[i].getValue('actuallyMny'));
          }
        }
        var mCurRow = viewModel.complexList.getCurrentRow();
        mCurRow.setValue('totalMny', tMny);
      });
      // 选择上传文件后，直接调用上传方法
      $("#fileiptwrap").on("change", "#attachuploadbatch_id", function() {
        if (this.value) {
          viewModel.uploadAttach();
        }
      });
    }
  });

  return view;
});