define(['text!./creditform.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js", "ajaxfileupload",
  "ossupload",
  "interfaceFileImpl",
  "ocm_kindeditor", "/ocm-web/vendor/jquery.orgchart/js/jquery.orgchart.js"
], function(tpl, common, baseview, model, bpmopenbill) {
  'use strict'
  var viewModel, appCtx = "/occ-cr/credit",
    app;
  var BILLPANELSTATUS = {
    ADD: "add",
    EDIT: "edit",
    COPY: "copy",
    DETAIL: "detail",
    DEFAULT: "default"
  };
  var ORDERSTATUSCHECK = {
    SUBMIT: {
      needCode: '01',
      errmsg: function(s) {
        toastr.warning("单据号为：" + s + "的订单不是待处理状态，不能提交");
      }
    },
    APPROVE: {
      needCode: '02',
      errmsg: function(s) {
        toastr.warning("单据号为：" + s + "的订单不是已提交状态，不能审批");
      }
    },
    UNAPPROVE: {
      needCode: '04',
      errmsg: function(s) {
        toastr.warning("单据号为：" + s + "的订单不已审批状态，不能取消审批");
      }
    }
  };
  var view = baseview.extend({
    beforeCreate: function() {
      viewModel = this.viewModel;
      viewModel = _.extend(viewModel, bpmopenbill.model);
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/limit-approval-forms',
      applicationUrl: '/credit/limit-approval-forms',
      complexList: new u.DataTable(model.options.metas.complex),
      complexItems: new u.DataTable(model.options.metas.complexItem),
      // ItemRefList: new u.DataTable(model.options.metas.ItemRef),

      searchcomp: {},
      searchSource: model.options.searchs.search1,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button6Source: model.options.buttons.button6,
      button7Source: model.options.buttons.button7,
      card1Source: model.options.cards.card1,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,

      attachList: [],

      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      billStateSrc: [{
        value: '0',
        name: '自由'
      }, {
        value: '1',
        name: '已提交'
      }, {
        value: '2',
        name: '审批中'
      }, {
        value: '3',
        name: '审批通过'
      }, {
        value: '4',
        name: '审批不通过'
      }],
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
        var enableStatus = viewModel.complexList.ref("state")();
        var str = '';
        switch (enableStatus) {
          case '0':
          case 0:
            return '保存';
          case '1':
          case 1:
            return '已提交'
          case '2':
          case 2:
            return '审批中'
          case '3':
          case 3:
            return '审批通过'
          case '4':
          case 4:
            return '审批不通过'
        }
      }),
      enableFmt: ko.pureComputed(function() {
        var enableStatus = viewModel.complexList.ref("enableStatus")();
        return enableStatus == 1 ? "启用" : "停用";
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
        if (state == '0' || !state) {
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
        } else if (parseInt(state) < 3) {
          obj.element.innerHTML =
            '<div class="ui-handle-icon">' +
            '<span class="ui-handle-word">' +
            '<a href="#" ' +
            delfun +
            ' title="删除">删除</a>' +
            "</span></div>";
        } else if (parseInt(state) >= 3) {
          obj.element.innerHTML = ''
        }
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      enableStatusRender: common.rendertype.enableRender,
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
    },
    events: {
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
          htmlStr += "<input id=\"" + attachList[i].id + "\" url=\"" + attachList[i].url + "\" class=\"attachSelect\" type=\"checkbox\">";
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
          detailStr += "<input id=\"" + attachList[i].id + "\" url=\"" + attachList[i].url + "\" class=\"attachSelect\" type=\"checkbox\">"
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
      //查看
      fileViewCustomercast: function() {
        var row = $(".attachSelect");

        for (var i = 0; i < row.length; i++) {
          if (!row[i].checked) {
            continue;
          }
          var url = row[i].getAttribute("url");
          parent.open(location.origin + url);
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
      // 打开 and 关闭
      batch_ajax: function(url, rows, remark, callback) {
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
          ids.push(rows[i].getValue("id"));
        }
        $._ajax({
          url: appCtx + viewModel.baseurl,
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
              viewModel.search();
            }
          }
        });
      },
      // 操作订单前，检查订单状态是否正确
      checkStatus: function(rows, checker) {
        var msg = '';
        if (checker.needCode == '04') {
          for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.getValue("orderStatusCode") !== checker.needCode) {
              if (row.getValue("orderStatusCode") != '09' || row.getValue("orderStatusCode") != '07') {
                msg += '[' + row.getValue('orderCode') + ']、';
              }
            }
          }
          if (msg.length > 0) {
            checker.errmsg(msg);
            return false;
          }
        } else {
          for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.getValue("orderStatusCode") !== checker.needCode) {
              msg += '[' + row.getValue('orderCode') + ']、';
            }
          }
          if (msg.length > 0) {
            checker.errmsg(msg);
            return false;
          }
        }
        return true;
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交申请单
      submitCusReqForm: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var nodeJs = "/ocm-web/pages/cr/creditform/creditform.js";
        var billTypeCode = "CreditLimitApprovalForm";
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
        var billTypeCode = "CreditLimitApprovalForm";
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
        var billTypeCode = "CreditLimitApprovalForm";
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
        var billTypeCode = "CreditLimitApprovalForm";
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
        var billTypeCode = "CreditLimitApprovalForm";
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
      //进入新增单据页
      showAddBillPanel: function() {
        viewModel.complexList.removeAllRows();
        var curRow = viewModel.complexList.createEmptyRow();
        viewModel.complexList.setRowFocus(curRow);
        viewModel.complexItems.removeAllRows();
        viewModel.complexList.setValue('billDate', Date.parse(new Date()));
        viewModel.complexList.setValue('state', "0");
        $.ajax({
          type: 'get',
          async: 'false',
          url: '/occ-base/base/goods/get-uuid',
          success: function(uuid) {
            viewModel.pk = uuid;
            curRow.setValue('ext01', uuid);
          }
        });
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        if (typeof(index) == 'number') {
          viewModel.complexList.setRowFocus(index);
        }
        var curRow = viewModel.complexList.getCurrentRow();
        var id = curRow.getValue("id");
        var isUnBpm = common.checkApprover(id);
        if (isUnBpm && !isUnBpm.isUnDoBpm) {
          toastr.warning(isUnBpm.message);
          return;
        }
        viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.pk = viewModel.complexList.getValue('ext01');
        viewModel.queryAttach();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
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
          viewModel.pk = curRow.getValue['ext01'];
          viewModel.findByParentid(id);
          viewModel.initBPMFromBill(id, viewModel);
          viewModel.queryAttach();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/findByParentid",
          type: 'post',
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            var subArr = data.creditLimitApprovalFormItemList;
            viewModel.complexItems.setSimpleData(subArr);
            for (var key in subArr) {
              if (!isNaN(key)) {
                var curRow = viewModel.complexItems.getRow(key);
                curRow.setValue('creditLimit', subArr[key].oldCreditLimit);
              }
            }
            // console.log(viewModel.complexItems.getSimpleData());
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
      //新增子表项
      showAddItemsRef: function() {
        var newRow = viewModel.complexItems.createEmptyRow();
        newRow.setValue('validFrom', viewModel.format(new Date()))
        newRow.setValue('validUntil', viewModel.format(new Date('2999-12-31 23:59:59')))
        $._ajax({
          url: window.pathMap.base + "/currency",
          data: {},
          success: function(resp) {
            var data = resp.content;
            viewModel.CURRENCYS = data;
            for (var i = 0; i < data.length; i++) {
              if (data[i].isDefault == 1 && data[i].isEnable == 1) {
                viewModel.CURRENCY = data[i];
                newRow.setValue('currencyId', data[i].id);
                newRow.setValue('currencyName', data[i].name);

                // viewModel.complexItems.setMeta(
                //   "newCreditLimit",
                //   "precision",
                //   data[i].pricePrecision
                // );
                // viewModel.complexItems.setMeta(
                //   "oldCreditLimit",
                //   "precision",
                //   data[i].pricePrecision
                // );
                // viewModel.complexItems.setMeta(
                //   "adjustmentQuota",
                //   "precision",
                //   data[i].pricePrecision
                // );
              }
            }
          }
        });
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
        complexData.creditLimitApprovalFormItemList = complexItemsData;
        var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: _ajaxType,
          data: JSON.stringify(complexData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            toastr.success();
            viewModel.search();
            // viewModel.complexList.getFocusRow().setSimpleData(data);
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
      detail2bill: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      deptValChange: function(obj) {
        if (obj.newValue) {
          // var saleOrgId = viewModel.dialogcardcomp.viewModel.params.getValue("saleOrgId");
          var personReferFilter = {
            "EQ_isEnable": "1",
            "EQ_dr": "0",
            "EQ_personPosts.department.id": obj.newValue
          }
        }
        if (obj.dataTable == "complexList") {
          // viewModel.complexList.setMeta("applicantId", 'enable', true)//不好用
          $("#person").attr("data-refparam", JSON.stringify(personReferFilter));
          if (obj.oldValue) {
            viewModel.complexList.setValue("applicantId", null);
          }
        } else {
          $("#applicantsearch").attr("data-refparam", JSON.stringify(personReferFilter));
          // viewModel.searchcomp.viewModel.params.setMeta("applicant", 'enable', true);//不好用
          if (obj.oldValue) {
            viewModel.searchcomp.viewModel.params.setValue("applicant", null);
          }
        }

        // if (saleOrgId) {
        //   personReferFilter["EQ_personPosts.organization.id"] = saleOrgId;
        // }


      },
    },
    afterCreate: function() {

      // 列表查询数据(无查询条件)
      viewModel.search();
      app = viewModel.app;
      // 选择上传文件后，直接调用上传方法
      $("#fileiptwrap").on("change", "#attachuploadbatch_id", function() {
        if (this.value) {
          viewModel.uploadAttach();
        }
      });
      viewModel = u.extend(viewModel, bpmopenbill.model);
      viewModel.complexList.off("applicantId.valuechange").on("applicantId.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $('div[id^="refContainerapplicantId"]').data("uui.refer");
        var refValues = refer.values[0];
        viewModel.complexList.setValue('applicationSectorId', refValues.departmentId);
        viewModel.complexList.setValue('applicationSectorName', refValues.departmentName);
      });
      viewModel.complexList.on("creditCtrlStrategyId.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var newVal = obj.newValue,
          newCId = null,
          newCuId = null,
          newPId = null,
          curRow = viewModel.complexItems.getCurrentRow();
        var setDatas = {};
        setDatas.ctrlStrategyId = newVal;
        if (curRow) {
          newCId = curRow.getValue('customerId');
          newCuId = curRow.getValue('currencyId');
          newPId = curRow.getValue('productLineId');
          if (curRow.getValue('oldCreditLimit')) {
            curRow.setValue('oldCreditLimit', '')
            // curRow.setValue('oldCreditLimitPat', '')
            curRow.setValue('creditLimit', '');
            curRow.setValue('creditLimitId', '');
            // curRow.setValue('validFrom', '');
            // curRow.setValue('validUntil', '');
          }
          if (newCuId) {
            setDatas.currencyId = newCuId;
          }
          if (newPId) {
            setDatas.productLineId = newPId;
          }
          if (newCId) {
            setDatas.customerId = newCId;
          }
          if (newCId && newCuId) {
            $._ajax({
              url: '/occ-cr/cr/credit-limits/find-oldCreditLimit',
              type: 'get',
              data: setDatas,
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                if ((data && data.creditLimit) || data.creditLimit == 0) {
                  curRow.setValue('oldCreditLimit', data.creditLimit);
                  curRow.setValue('creditLimit', data.creditLimit);
                  curRow.setValue('creditLimitId', data.id);
                  // curRow.setValue('validFrom', format(data.startDate));
                  // curRow.setValue('validUntil', format(data.endDate));
                }
              }
            })
          }
        }
        // else {
        //   viewModel.complexItems.setMeta("oldCreditLimitPat", "refparam", '{"EQ_creditCtrlStrategy.id":"' + newVal + '"}');
        // }
      });
      viewModel.complexItems.on("customerId.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var newCId = obj.newValue,
          newCCS = viewModel.complexList.getValue('creditCtrlStrategyId'),
          newCuId, newPId,
          curRow = viewModel.complexItems.getCurrentRow();
        var setDatas = {};
        if (newCCS) {
          setDatas.ctrlStrategyId = newCCS;
        }
        setDatas.customerId = newCId;
        if (curRow) {
          newCuId = curRow.getValue('currencyId');
          newPId = curRow.getValue('productLineId');
          if (curRow.getValue('oldCreditLimit')) {
            curRow.setValue('oldCreditLimit', '')
            curRow.setValue('creditLimit', '');
            curRow.setValue('creditLimitId', '');
            // curRow.setValue('validFrom', '');
            // curRow.setValue('validUntil', '');
          }
          if (newCuId) {
            setDatas.currencyId = newCuId;
          }
          if (newPId) {
            setDatas.productLineId = newPId;
          }
        }
        if (newCCS && newCuId) {
          $._ajax({
            url: '/occ-cr/cr/credit-limits/find-oldCreditLimit',
            type: 'get',
            data: setDatas,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              if ((data && data.creditLimit) || data.creditLimit == 0) {
                curRow.setValue('oldCreditLimit', data.creditLimit);
                curRow.setValue('creditLimit', data.creditLimit);
                curRow.setValue('creditLimitId', data.id);
                // curRow.setValue('validFrom', format(data.startDate));
                // curRow.setValue('validUntil', format(data.endDate));
              }
            }
          })
        }
      });
      viewModel.complexItems.on("currencyId.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var refer = $('#refContainercurrencyId').data("uui.refer");
        if (refer) {
          var refValues = refer.values[0];
        }
        var newCuId = obj.newValue,
          newCCS = viewModel.complexList.getValue('creditCtrlStrategyId'),
          newCId, newPId,
          curRow = viewModel.complexItems.getCurrentRow();
        if (refValues)
          curRow.setValue('currencyName', refValues.refname);
        var setDatas = {};
        if (newCCS) {
          setDatas.ctrlStrategyId = newCCS;
        }
        setDatas.currencyId = newCuId;
        if (curRow) {
          newCId = curRow.getValue('customerId');
          newPId = curRow.getValue('productLineId');
          if (curRow.getValue('oldCreditLimit')) {
            curRow.setValue('oldCreditLimit', '')
            curRow.setValue('creditLimit', '');
            curRow.setValue('creditLimitId', '');
            // curRow.setValue('validFrom', '');
            // curRow.setValue('validUntil', '');
          }
          if (newCId) {
            setDatas.customerId = newCId;
          }
          if (newPId) {
            setDatas.productLineId = newPId;
          }
        }
        if (newCCS && newCId) {
          $._ajax({
            url: '/occ-cr/cr/credit-limits/find-oldCreditLimit',
            type: 'get',
            data: setDatas,
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              if ((data && data.creditLimit) || data.creditLimit == 0) {
                curRow.setValue('oldCreditLimit', data.creditLimit);
                curRow.setValue('creditLimit', data.creditLimit);
                curRow.setValue('creditLimitId', data.id);
                // curRow.setValue('validFrom', format(data.startDate));
                // curRow.setValue('validUntil', format(data.endDate));
              }
            }
          })
        }
      });
      viewModel.complexItems.on("productLineId.valuechange", function(obj) {
        // 清空参照时不增行
        // if (!obj.newValue) {
        //   return;
        // }
        var newPId = obj.newValue,
          newCCS = viewModel.complexList.getValue('creditCtrlStrategyId'),
          newCId, newCuId,
          curRow = viewModel.complexItems.getCurrentRow();
        var setDatas = {};
        if (newCCS) {
          setDatas.ctrlStrategyId = newCCS;
        }
        if (newPId)
          setDatas.productLineId = newPId;
        if (curRow) {
          newCId = curRow.getValue('customerId');
          newCuId = curRow.getValue('currencyId');
          if (curRow.getValue('oldCreditLimit')) {
            curRow.setValue('oldCreditLimit', '')
            curRow.setValue('creditLimit', '');
            curRow.setValue('creditLimitId', '');
            // curRow.setValue('validFrom', '');
            // curRow.setValue('validUntil', '');
          }
          if (newCId) {
            setDatas.customerId = newCId;
          }
          if (newCuId) {
            setDatas.currencyId = newCuId;
          }
        }
        if (newCCS && newCId && newCuId) {
          $._ajax({
            url: '/occ-cr/cr/credit-limits/find-oldCreditLimit',
            type: 'get',
            data: setDatas,
            contentType: "application/json; charset=utf-8",
            success: function(data) {

              if ((data && data.creditLimit) || data.creditLimit == 0) {
                curRow.setValue('oldCreditLimit', data.creditLimit);
                curRow.setValue('creditLimit', data.creditLimit);
                curRow.setValue('creditLimitId', data.id);
                // curRow.setValue('validFrom', format(data.startDate));
                // curRow.setValue('validUntil', format(data.endDate));
              }
            }
          })
        }
      });
      viewModel.complexItems.on("adjustmentQuota.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var newVal = obj.newValue;
        var row = viewModel.complexItems.getCurrentRow();
        var oldM = row.getValue('creditLimit') || '0';
        if (oldM) {
          row.setValue('newCreditLimit', parseFloat(oldM) + parseFloat(newVal));
        }
      });
      viewModel.complexItems.on("newCreditLimit.valuechange", function(obj) {
        // 清空参照时不增行
        if (!obj.newValue) {
          return;
        }
        var newVal = obj.newValue;
        var row = viewModel.complexItems.getCurrentRow();
        var oldM = row.getValue('creditLimit') || '0';
        if (oldM) {
          row.setValue('adjustmentQuota', parseFloat(newVal) - parseFloat(oldM));
        }
      });
      viewModel.complexList.on("applicationSectorId.valuechange", function(obj) {
        viewModel.deptValChange(obj)
      });
      viewModel.searchcomp.viewModel.params.on("applicationSector.valuechange", function(obj) {
        viewModel.deptValChange(obj)
      });
    }
  });

  return view;
});