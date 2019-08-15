define(['text!./customercast.html', 'ocm_common', 'ocm_baseview', './meta.js', "../../flow/bpmapproveref/bpmopenbill.js", "ajaxfileupload",
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
      viewModel = _.extend(viewModel, bpmopenbill.model);
    },
    tpl: tpl,
    model: model,
    baseData: {
      baseurl: '/customer-bills',
      excelurl: '/customer-bill-excel',
      applicationUrl: '/fee/customer-bills',
      complexList: new u.DataTable(model.options.metas.customer_cast),
      mainCard: new u.DataTable(model.options.metas.customer_cast),
      complexItems: new u.DataTable(model.options.metas.customer_items),
      flushDetailList: new u.DataTable(model.options.metas.flush_detail),
      // shBilllList: new u.DataTable(model.options.metas.shBill),
      shBilllList: new u.DataTable(model.options.metas.soitemmeta),
      shBilllItems: new u.DataTable(model.options.metas.soitemmetaItem),
      resalebillListOp: new u.DataTable(model.options.metas.resalebill),
      resalebillItemOp: new u.DataTable(model.options.metas.resalebillItem),
      //已选择
      selectResalebillListOp: new u.DataTable(model.options.metas.resalebill),
      selectResalebillItemOp: new u.DataTable(model.options.metas.resalebillItem),
      //
      applaybillList: new u.DataTable(model.options.metas.applaybill),
      applaybillItem: new u.DataTable(model.options.metas.applaybillItem),
      //已选择
      referapplaybillList: new u.DataTable(model.options.metas.applaybill),
      referapplaybillItem: new u.DataTable(model.options.metas.applaybillItem),
      searchcomp: {},
      searchcomp2: {},
      searchcomp3: {},
      searchSource: model.options.searchs.search1,
      searchSource2: model.options.searchs.search2,
      searchSource3: model.options.searchs.search3,
      button1Source: model.options.buttons.button1,
      button2Source: model.options.buttons.button2,
      button3Source: model.options.buttons.button3,
      button4Source: model.options.buttons.button4,
      button5Source: model.options.buttons.button5,
      button6Source: model.options.buttons.button6,
      button7Source: model.options.buttons.button7,
      button8Source: model.options.buttons.button8,
      card1Source: model.options.cards.card1,
      card2Source: model.options.cards.card2,
      detail11Source: model.options.details.detail1,
      grid1Option: model.options.grids.grid1,
      grid2Option: model.options.grids.grid2,
      grid3Option: model.options.grids.grid3,
      grid5Option: model.options.grids.grid5,
      grid6Option: model.options.grids.grid6,
      grid6ItemOption: model.options.grids.grid6Item,
      grid6referOption: model.options.grids.grid6refer,
      grid6ItemreferOption: model.options.grids.grid6Itemrefer,
      grid7Option: model.options.grids.grid7,
      grid7ItemOption: model.options.grids.grid7Item,
      grid7referOption: model.options.grids.grid7refer,
      grid7ItemreferOption: model.options.grids.grid7Itemrefer,
      attachList: [],

      pageData: [],
      curDate: ko.observable(),
      pageModel: {
        totalPages: ko.observable(0),
        pageSize: ko.observable(0),
        pageIndex: ko.observable(0),
        totalRow: ko.observable(0),
        hasPage: ko.observable(0),
        setCurrentPage: ko.observable(0),
      },
      pageVisble: ko.pureComputed(function() {
        if (viewModel.billPanelStatus() == BILLPANELSTATUS.EDIT) {
          return false
        }
        return true
      }),
      //跳转单据页
      goShouldBillPanel: function() {
        // $(".ui-list-panel").hide();
        $(".ui-panel").hide();
        $(".ui-bill-should").show();
        $(".ui-bill-should").animateCss("fadeIn");
      },
      //返回列表页
      retShouldListPanel: function() {
        $(".ui-panel").hide();
        $(".ui-list-panel").show();
        $(".ui-list-panel").animateCss("fadeIn");
      },
      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      castTypeStr: [{
        value: 'pay01',
        name: '冲抵订单'
      }, {
        value: 'pay02',
        name: '货补'
      }, {
        value: 'pay03',
        name: '实物货补'
      }, {
        value: 'pay04',
        name: '账扣'
      }],
      billStateSrc: [{
        value: '0',
        name: '保存'
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
      orderStatus: ko.pureComputed(function() {
        var c = viewModel.complexList.ref("state")();
        switch (c) {
          case '0':
          case 0:
            return '保存'
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
      castTypeCom: ko.pureComputed(function() {
        var c = viewModel.complexList.ref("castTypeId")();
        switch (c) {
          case 'pay01':
            return '冲抵订单'
          case 'pay02':
            return '货补'
          case 'pay03':
            return '实物货补'
          case 'pay04':
            return '账扣'
        }
      })
    },
    rendertype: {
      // operation: common.rendertype.operation,
      enableStatusRender: common.rendertype.enableRender,
      // detailRender: common.rendertype.detailRender,
      detailRender: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataRowId = obj.row.value['$_#_@_id'];
        var detailfun = "data-bind=click:detail.bind($data," + obj.rowIndex + "," + dataRowId + ")";
        obj.element.innerHTML = '<a href="#" class="ui-a-detail" ' + detailfun + '>' + obj.value + '</a>';
        // viewModel.pk = obj.row.value['ext01'];
        // viewModel.queryAttach();
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      isMakeRecRender: function(obj) {
        obj.element.innerHTML = (!obj.value ? "否" : "是");
      },
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
      operation: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var statusCode = obj.row.value["state"];
        var type = obj.row.value["castTypeId"];
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
        var submit =
          "data-bind=click:submitCusReqForm.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var unsubmit =
          "data-bind=click:unsubmitCusReqForm.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var approve =
          "data-bind=click:approveCusReqForm.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var unapprove =
          "data-bind=click:cancelApproveCusReqForm.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var cashdetailFun =
          "data-bind=click:cashdetail.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var seeapproveinfo =
          "data-bind=click:showEditBillPanel.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var shouldBill =
          "data-bind=click:showShouldBill.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
        var strHtml = '<div class="ui-handle-icon">';
        switch (statusCode) {
          case '0':
          case 0:
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              submit +
              ' title="提交">提交</a>' +
              "</span>    ";
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              editfun +
              ' title="编辑">编辑</a>' +
              "</span>    ";
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              delfun +
              ' title="删除">删除</a>' +
              "</span>";
            break;
          case '1':
          case 1:
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              unsubmit +
              ' title="收回">收回</a>' +
              "</span>    ";
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              approve +
              ' title="审批">审批</a>' +
              "</span>    ";
            break;
          case '2':
          case 2:
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              delfun +
              ' title="审批">审批</a>' +
              "</span>    ";
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              delfun +
              ' title="取消审批">取消审批</a>' +
              "</span>    ";
            break;
            // strHtml +=
            //     '<span class="ui-handle-word">' +
            //     '<a href="#" ' +
            //     delfun +
            //     ' title="查看审批信息">查看审批信息</a>' +
            //     "</span>    ";
          case '3':
          case 3:
            // strHtml +=
            //     '<span class="ui-handle-word">' +
            //     '<a href="#" ' +
            //     delfun +
            //     ' title="查看审批信息">查看审批信息</a>' +
            //     "</span>    ";
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              unapprove +
              ' title="取消审批">取消审批</a>' +
              "</span>    ";
            if (type == 'pay04' && !obj.row.value["isMakeRec"]) {
              strHtml +=
                '<span class="ui-handle-word">' +
                '<a href="#" ' +
                shouldBill +
                ' title="生成应收">生成应收</a>' +
                "</span>    ";
            }
            break;
          case '4':
          case 4:
            strHtml +=
              '<span class="ui-handle-word">' +
              '<a href="#" ' +
              editfun +
              ' title="编辑">编辑</a>' +
              "</span>    ";
            break;
          default:
            // strHtml +=
            //   '<span class="ui-handle-word">' +
            //   '<a href="#" ' +
            //   cashdetailFun +
            //   ' title="查看兑付明细">查看兑付明细</a>' +
            //   "</span>    ";
        }
        obj.element.innerHTML = strHtml;
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
      //生成应收单
      showShouldBill: function(index) {
        viewModel.complexList.setRowFocus(index);
        var id = viewModel.complexList.getValue("id");
        viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
        $._ajax({
          url: appCtx + viewModel.baseurl + "/deficitHeadTabel/" + id,
          type: 'get',
          async: false,
          // data: {
          //   id: id
          // },
          success: function(data) {
            viewModel.shBilllList.setSimpleData(data);
            viewModel.shBilllItems.setSimpleData(data.subHeadTables);
            viewModel.shBilllItems.originEditData = data.subHeadTables;
            var copy = viewModel.shBilllItems.getAllRows();
            for (var key = 0; key < copy.length; key++) {
              viewModel.shBilllItems.originEditData[key].rowId = copy[key].rowId;
            }
            var sumMoney = 0,
              allRows = viewModel.shBilllItems.getAllRows();
            for (var i = 0; i < allRows.length; i++) {
              sumMoney += parseFloat(allRows[i].getValue('receivableMoney'));
            }
            viewModel.shBilllList.setValue('money', sumMoney);
            viewModel.goShouldBillPanel();
          }
        })
      },
      saveShouldBill: function() {
        var billListData = viewModel.shBilllList.getCurrentRow().getSimpleData();
        var billItemsData = viewModel.shBilllItems.getSimpleData();
        billListData.subHeadTables = billItemsData;
        if (billListData.money == 0) {
          toastr.warning("总金额为0，不能生成应收单");
          return;
        }
        var _ajaxType = viewModel.shBilllList.getValue("id") ? "put" : "post";
        $._ajax({
          url: appCtx + viewModel.baseurl + '/deficitReceBill',
          type: _ajaxType,
          data: JSON.stringify(billListData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            viewModel.search();
            viewModel.retListPanel();
          }
        })
      },
      // 审批流程的相关按钮点击事件 - start
      // 提交申请单
      submitCusReqForm: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var nodeJs = "/ocm-web/pages/fee/customercast/customercast.js";
        var billTypeCode = "CustomerBill";
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
        var billTypeCode = "CustomerBill";
        var tranTypeCode = null;
        var callback = null;
        viewModel.bpmUnsubmit(viewModel, listCompId, billTypeCode, tranTypeCode, callback);
      },

      // 审批通过申请单
      approveCusReqForm: function(data, rowId) {
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "CustomerBill";
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
        viewModel = _.extend(viewModel, bpmopenbill.model);
        var listCompId = "complexList";
        var billTypeCode = "CustomerBill";
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
        viewModel = _.extend(viewModel, bpmopenbill.model);
        if (typeof(data) == 'number') {
          viewModel.complexList.setRowSelectbyRowId(rowId);
        }
        var listCompId = "complexList";
        var billTypeCode = "CustomerBill";
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
      //兑付明细
      cashdetail: function(index) {
        viewModel.complexList.setRowFocus(index);
        var curRow = viewModel.complexList.getFocusRow();
        var id = curRow.getValue("id");
        if (!flushDetailDialog) {
          flushDetailDialog = u.dialog({
            content: "#flushItem-dialog",
            hasCloseMenu: true
          });
        } else {
          flushDetailDialog.show();
        }
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseurl + "/flushdetail",
          data: {
            id: id
          },
          success: function(data) {
            viewModel.flushDetailList.setSimpleData(data);
          }
        });
      },
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
            if (rows[i].getValue('state') == 0) {
              ids.push(rows[i].getValue("id"));
            }
          }
        }
        if (!ids.length) {
          toastr.error("只有保存态的数据可删除，请重新选择！");
          return
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
      search2: function(reindex) {
        if (reindex) {
          viewModel.applaybillList.pageIndex(0);
        }
        viewModel.applaybillList.removeAllRows();
        var queryData = viewModel.searchcomp2.getDataWithOpr ? viewModel.searchcomp2.getDataWithOpr() : {};
        var pageSize = viewModel.applaybillList.pageSize();
        var pageNumber = viewModel.applaybillList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        queryData.search_EQ_state = 3;
        $._ajax({
          type: "get",
          url: appCtx + '/customer-applys',
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.applaybillList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.applaybillList.totalRow(data.totalElements);
            viewModel.applaybillList.totalPages(data.totalPages);
          }
        })
      },
      search3: function(reindex) {
        if (reindex) {
          viewModel.resalebillListOp.pageIndex(0);
        }
        viewModel.resalebillListOp.removeAllRows();
        var queryData = viewModel.searchcomp3.getDataWithOpr ? viewModel.searchcomp3.getDataWithOpr() : {};
        var pageSize = viewModel.resalebillListOp.pageSize();
        var pageNumber = viewModel.resalebillListOp.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        queryData.search_EQ_state = 3;
        $._ajax({
          type: "get",
          url: '/occ-rebate/rebate/rebate-settlements',
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.resalebillListOp.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.resalebillListOp.totalRow(data.totalElements);
            viewModel.resalebillListOp.totalPages(data.totalPages);
          }
        })
      },
      //清空搜索条件
      // //清空搜索条件
      cleanSearch3: function() {
        viewModel.searchcomp3.clearSearch();
      },
      cleanSearch2: function() {
        viewModel.searchcomp2.clearSearch();
      },
      //页码改变时的回调函数
      pageChange2: function(index) {
        viewModel.applaybillList.pageIndex(index);
        viewModel.search2();
      },
      //页码改变时的回调函数
      sizeChange2: function(size) {
        viewModel.applaybillList.pageSize(size);
        viewModel.search2(true);
      },
      //页码改变时的回调函数
      pageChange3: function(index) {
        viewModel.applaybillList.pageIndex(index);
        viewModel.search2();
      },
      //页码改变时的回调函数
      sizeChange3: function(size) {
        viewModel.applaybillList.pageSize(size);
        viewModel.search2(true);
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
      //进入新增单据页
      showAddBillPanel: function() {
        viewModel.mainCard.removeAllRows();
        viewModel.complexItems.removeAllRows();
        // var curRow = viewModel.complexList.createEmptyRow();
        // viewModel.complexList.setRowFocus(curRow);
        var newRow = viewModel.mainCard.createEmptyRow();
        newRow.setValue('billDate', viewModel.format(new Date()));
        newRow.setValue('state', '0');
        viewModel.complexItems.removeAllRows();
        $.ajax({
          type: 'get',
          async: 'false',
          url: '/occ-base/base/goods/get-uuid', //appCtx + viewModel.baseurl + "/get-uuid", //occ-base/base/goods/get-uuid
          success: function(uuid) {
            viewModel.pk = uuid;
            newRow.setValue('ext01', uuid);
          }
        });
        // 获取默认币种
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

                viewModel.complexItems.setMeta(
                  "mny",
                  "precision",
                  data[i].pricePrecision
                );
              }
            }
          }
        });
        viewModel.attachList = [];
        viewModel.showAttachment();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //参照费用申请单生成
      refeebillfun: function() {
        viewModel.removeAllreferRows();
        viewModel.popupDialog = u.dialog({
          id: 'refeebil-popup',
          content: "#refeebil-popup",
          "width": "80%"
        });
        var okButton = $("#refeebil-popup .u-msg-ok");
        okButton.unbind("click").click(function() {
          var selRows = viewModel.applaybillList.getSelectedRows();
          if (selRows.length > 0) {
            var queryData = [];
            // viewModel.refeebillConfirm('fee');
            for (var i = 0; i < selRows.length; i++) {
              queryData.push(selRows[i].getSimpleData());
            }

            $._ajax({
              type: "post",
              url: appCtx + "/customer-bills/changeApplyToBill",
              dataType: "json",
              data: JSON.stringify(queryData),
              contentType: "application/json;",
              success: function(data) {
                viewModel.refeebillConfirm('fee', data);
                // viewModel.popupDialog.close();
              }
            });
          } else {
            toastr.warning('请至少选择一条数据！');
            return;
          }
        });
        var cancelButton = $("#refeebil-popup .u-msg-cancel");
        cancelButton.unbind("click").click(function() {
          viewModel.popupDialog.close();
        });
      },
      refeebillConfirm: function(who, datas) {
        // if (who == 'fee') {
        //   var parentArr = viewModel.applaybillList.getSimpleData({
        //     type: "select"
        //   });
        //   var itemArr = viewModel.applaybillItem.getSimpleData({
        //     type: "select"
        //   });
        // } else {
        //   var parentArr = viewModel.resalebillListOp.getSimpleData({
        //     type: "select"
        //   });
        //   var itemArr = viewModel.resalebillItemOp.getSimpleData({
        //     type: "select"
        //   });
        // }
        // if (!itemArr.length) {
        //   toastr.warning("请至少选择一条商品");
        //   return;
        // }
        // if (who == 'fee') {
        //   for (var i = 0; i < parentArr.length; i++) {
        //     parentArr[i].billDetails = [];
        //     for (var j = 0; j < itemArr.length; j++) {
        //       if (itemArr[j].applyId == parentArr[i].id) {
        //         parentArr[i].billDetails.push(itemArr[j]);
        //       }
        //     }
        //   }
        // } else {
        //   for (var i = 0; i < parentArr.length; i++) {
        //     parentArr[i].rebateSettlemenDetails = [];
        //     for (var j = 0; j < itemArr.length; j++) {
        //       if (itemArr[j].rebateSettlementId == parentArr[i].id) {
        //         parentArr[i].rebateSettlemenDetails.push(itemArr[j]);
        //       }
        //     }
        //   }
        // }
        // if (!parentArr.length) {
        //   toastr.warning("请至少选择一个订货单");
        //   return;
        // }
        // for (var p = 0; p < parentArr.length; p++) {
        //   viewModel.setDataToPanel(parentArr[p], who);
        // }
//        for (var p = 0; p < datas.length; p++) {
          viewModel.setDataToPanel(datas[0], who);
//        }
        viewModel.pageData = datas;
        viewModel.pageModel.totalPages(datas.length);
        viewModel.popupDialog.close();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
        viewModel.removeAllreferRows();
      },
      //参照返利生成
      resalebillfun: function() {
        viewModel.removeAllreferRows();
        viewModel.popupDialog = u.dialog({
          id: 'resalebill-popup',
          content: "#resalebill-popup",
          "width": "80%"
        });
        var okButton = $("#resalebill-popup .u-msg-ok");
        okButton.unbind("click").click(function() {
          var selRows = viewModel.resalebillListOp.getSelectedRows();
          if (selRows.length > 0) {
            var queryData = [];
            for (var i = 0; i < selRows.length; i++) {
              queryData.push(selRows[i].getSimpleData());
            }
            // viewModel.refeebillConfirm('sale');
            $._ajax({
              type: "post",
              url: appCtx + "/customer-bills/changeRebateStlToBill",
              dataType: "json",
              data: JSON.stringify(queryData),
              contentType: "application/json;",
              success: function(data) {
                viewModel.refeebillConfirm('sale', data)
                // viewModel.popupDialog.close();
              }
            });
          } else {
            toastr.warning('请至少选择一条数据！');
            return;
          }
        });
        var cancelButton = $("#resalebill-popup .u-msg-cancel");
        cancelButton.unbind("click").click(function() {
          viewModel.popupDialog.close();
        });
      },
      removeAllreferRows: function() {
        viewModel.applaybillList.totalRow(0);
        viewModel.applaybillList.totalPages(0);
        viewModel.applaybillList.removeAllRows();
        viewModel.applaybillItem.removeAllRows();
        viewModel.referapplaybillList.removeAllRows();
        viewModel.referapplaybillItem.removeAllRows();

        viewModel.resalebillListOp.totalRow(0);
        viewModel.resalebillListOp.totalPages(0);
        viewModel.resalebillListOp.removeAllRows();
        viewModel.resalebillItemOp.removeAllRows();
        viewModel.selectResalebillListOp.removeAllRows();
        viewModel.selectResalebillItemOp.removeAllRows();
      },
      // 选择申请单
      referSelectHandle: function(obj) {
        viewModel.applaybillItem.removeAllRows();
        viewModel.referapplaybillItem.removeAllRows();
        var listArr = [];
        var selectedRows = viewModel.applaybillList.getSelectedRows();
        // var mainIds = selectedRows.map(function(item) {
        //   return item.id;
        // })
        if (selectedRows && selectedRows.length > 0) {
          for (var i = 0; i < selectedRows.length; i++) {
            var listData = selectedRows[i].getSimpleData();
            $._ajax({
              url: appCtx + '/customer-applys' + "/detail/" + listData.id,
              type: 'get',
              async: false,
              success: function(data) {
                var newSubDatas = data.billDetails;
                viewModel.applaybillItem.addSimpleData(newSubDatas);
                selectedRows[i].setSimpleData(data);
                listArr.push(data);
                viewModel.applaybillItem.setAllRowsSelect();
                var subIds = newSubDatas.map(function(item) {
                  return item.id;
                });
                selectedRows[i].setValue("selectitemIds", subIds);
              }
            })
            // listArr.push(listData);
            // viewModel.applaybillItem.addSimpleData(listData.billDetails);

          }
        }
        viewModel.referapplaybillList.removeAllRows();
        viewModel.referapplaybillList.addSimpleData(listArr);
        viewModel.referapplaybillList.setAllRowsSelect();
      },
      referUnSelectHandle: function(obj) {
        // viewModel.referUnSelectItemHandle(obj);
        var id = obj.rowObj.value.id,
          index = obj.rowObj.valueIndex;
        var mainList = viewModel.applaybillList.getSimpleData();
        var itemId = mainList[index].billDetails;
        var rows = viewModel.referapplaybillList.getAllRows();
        var itemrows = viewModel.applaybillItem.getAllRows();
        for (var j = rows.length - 1; j >= 0; j--) {
          if (rows[j].getValue("id") == id) {
            viewModel.referapplaybillList.removeRows([j], {
              forceDel: true
            });
          }
        }
        for (var i = itemrows.length - 1; i >= 0; i--) {
          if (itemrows[i].getValue("applyId") == id) {
            viewModel.applaybillItem.removeRows([i], {
              forceDel: true
            });
            viewModel.referapplaybillItem.removeRows([i], {
              forceDel: true
            });
          }
        }
      },
      //选择申请单信息
      referSelectItemHandle: function(obj) {
        var id = obj.rowObj.value.id;
        var selectedRows = viewModel.applaybillItem.getSelectedRows();
        var referapplaybillItem = viewModel.referapplaybillItem.getSimpleData();
        for (var i = 0; i < selectedRows.length; i++) {
          var itemInfo = selectedRows[i].getSimpleData()
          if (selectedRows[i].getValue("id") == id) {
            viewModel.referapplaybillItem.addSimpleData(itemInfo);
          }
        }
      },
      referUnSelectItemHandle: function(obj) {
        function removeByValue(arr, val) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        var itemId = obj.rowObj.value.id;
        var parentRowId = obj.rowObj.value.applyId;
        var parentRow = viewModel.applaybillList.getRowByField("id", parentRowId);
        var selectitemArr = parentRow.getValue("selectitemIds")
        if (selectitemArr.length > 0) {
          for (var i = 0; i < selectitemArr.length; i++) {
            if ($.inArray(itemId, selectitemArr) > -1) {
              removeByValue(selectitemArr, itemId)
              parentRow.setValue("selectitemIds", selectitemArr);
              if (selectitemArr.length == 0) {
                var curRowId = parentRow.rowId;
                var index = viewModel.applaybillList.getIndexByRowId(curRowId);
                var subindex = viewModel.applaybillItem.getIndexByRowId(obj.rowIndex);
                viewModel.applaybillList.setRowsUnSelect(index);
                viewModel.applaybillItem.removeRows([subindex], {
                  forceDel: true
                });
              }
            }
          }
        }

        var itemrows = viewModel.referapplaybillItem.getAllRows();
        for (var i = itemrows.length - 1; i >= 0; i--) {
          if (itemrows[i].getValue("id") == itemId) {
            viewModel.referapplaybillItem.removeRows([i], {
              forceDel: true
            });
          }
        }
      },
      // 选择返利结算单
      saleSelectHandle: function(obj) {
        viewModel.resalebillItemOp.removeAllRows();
        viewModel.selectResalebillItemOp.removeAllRows();
        var listArr = [];
        var selectedRows = viewModel.resalebillListOp.getSelectedRows();
        // var mainIds = selectedRows.map(function(item) {
        //   return item.id;
        // })
        if (selectedRows && selectedRows.length > 0) {
          for (var i = 0; i < selectedRows.length; i++) {
            var listData = selectedRows[i].getSimpleData();
            $._ajax({
              url: "/occ-rebate/rebate/rebate-settlements/detail",
              type: 'get',
              async: false,
              data: {
                id: listData.id
              },
              success: function(data) {
                var newSubDatas = data.rebateSettlemenDetails;
                viewModel.resalebillItemOp.addSimpleData(newSubDatas);
                selectedRows[i].setSimpleData(data);
                listArr.push(data);
                viewModel.resalebillItemOp.setAllRowsSelect();
                var subIds = newSubDatas.map(function(item) {
                  return item.id;
                });
                selectedRows[i].setValue("selectitemIds", subIds);
              }
            })
            // listArr.push(listData);
            // viewModel.applaybillItem.addSimpleData(listData.rebateSettlemenDetails);

          }
        }
        viewModel.selectResalebillListOp.removeAllRows();
        viewModel.selectResalebillListOp.addSimpleData(listArr);
        viewModel.selectResalebillListOp.setAllRowsSelect();
      },
      saleUnSelectHandle: function(obj) {
        // viewModel.referUnSelectItemHandle(obj);
        var id = obj.rowObj.value.id,
          index = obj.rowObj.valueIndex;
        var mainList = viewModel.resalebillListOp.getSimpleData();
        var itemId = mainList[index].billDetails;
        var rows = viewModel.selectResalebillListOp.getAllRows();
        var itemrows = viewModel.resalebillItemOp.getAllRows();
        for (var j = rows.length - 1; j >= 0; j--) {
          if (rows[j].getValue("id") == id) {
            viewModel.selectResalebillListOp.removeRows([j], {
              forceDel: true
            });
          }
        }
        for (var i = itemrows.length - 1; i >= 0; i--) {
          if (itemrows[i].getValue("rebateSettlementId") == id) {
            viewModel.resalebillItemOp.removeRows([i], {
              forceDel: true
            });
            viewModel.selectResalebillItemOp.removeRows([i], {
              forceDel: true
            });
          }
        }
      },
      //选择返利结算单信息
      saleSelectItemHandle: function(obj) {
        var id = obj.rowObj.value.id;
        var selectedRows = viewModel.resalebillItemOp.getSelectedRows();
        // var referapplaybillItem = viewModel.selectResalebillItemOp.getSimpleData();
        for (var i = 0; i < selectedRows.length; i++) {
          var itemInfo = selectedRows[i].getSimpleData()
          if (selectedRows[i].getValue("id") == id) {
            viewModel.selectResalebillItemOp.addSimpleData(itemInfo);
          }
        }
      },
      saleUnSelectItemHandle: function(obj) {
        function removeByValue(arr, val) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        var itemId = obj.rowObj.value.id;
        var parentRowId = obj.rowObj.value.rebateSettlementId;
        var parentRow = viewModel.resalebillListOp.getRowByField("id", parentRowId);
        var selectitemArr = parentRow.getValue("selectitemIds")
        if (selectitemArr.length > 0) {
          for (var i = 0; i < selectitemArr.length; i++) {
            if ($.inArray(itemId, selectitemArr) > -1) {
              removeByValue(selectitemArr, itemId)
              parentRow.setValue("selectitemIds", selectitemArr);
              if (selectitemArr.length == 0) {
                var curRowId = parentRow.rowId;
                var index = viewModel.resalebillListOp.getIndexByRowId(curRowId);
                var subindex = viewModel.resalebillItemOp.getIndexByRowId(obj.rowIndex);
                viewModel.resalebillListOp.setRowsUnSelect(index);
                if (subindex > -1)
                  viewModel.resalebillItemOp.removeRows([subindex], {
                    forceDel: true
                  });
              }
            }
          }
        }

        var itemrows = viewModel.selectResalebillItemOp.getAllRows();
        for (var i = itemrows.length - 1; i >= 0; i--) {
          if (itemrows[i].getValue("id") == itemId) {
            viewModel.selectResalebillItemOp.removeRows([i], {
              forceDel: true
            });
          }
        }
      },
      resalebill: function() {
        var curRow = viewModel.complexList.createEmptyRow();
        viewModel.complexList.setRowFocus(curRow);
        curRow.setValue('billDate', viewModel.format(new Date()));
        curRow.setValue('state', '0');
        viewModel.complexItems.removeAllRows();
        $.ajax({
          type: 'get',
          async: 'false',
          url: '/occ-base/base/goods/get-uuid', //appCtx + viewModel.baseurl + "/get-uuid", //occ-base/base/goods/get-uuid
          success: function(uuid) {
            viewModel.pk = uuid;
            curRow.setValue('ext01', uuid);
          }
        });
        // 获取默认币种
        $._ajax({
          url: window.pathMap.base + "/currency",
          data: {},
          success: function(resp) {
            var data = resp.content;
            viewModel.CURRENCYS = data;
            for (var i = 0; i < data.length; i++) {
              if (data[i].isDefault == 1 && data[i].isEnable == 1) {
                viewModel.CURRENCY = data[i];
                curRow.setValue('currencyId', data[i].id);
                curRow.setValue('currencyName', data[i].name);

                viewModel.complexItems.setMeta(
                  "mny",
                  "precision",
                  data[i].pricePrecision
                );
                // viewModel.complexItems.setMeta(
                //   "mny",
                //   "precision",
                //   data[i].pricePrecision
                // );
              }
            }
          }
        });
        viewModel.attachList = [];
        viewModel.showAttachment();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      checkIsChange: function() {
        var row = viewModel.mainCard.getRow(0);
        if (row.status == 'upd') {
          return true
        }
        var rows = viewModel.complexItems.getAllRows();
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].status == 'upd') {
            return true
          }
        }
        return false;
      },
      beforPageChangeFun: function(index) {
        if (viewModel.checkIsChange()) {
          common.dialog.confirmDialog({
            msg1: '当前有修改，是否先保存后跳转？',
            msg2: '此操作不可逆',
            width: '400px',
            type: 'error',
            onOk: function() {
              viewModel.saveBill(index);
            },
            onCancel: function() {
              viewModel.pageChange4Add(index);
            }
          });
        } else {
          return true
        }
      },
      pageChange4Add: function(index) {
        viewModel.pageModel.pageIndex(index);
        var currentData = viewModel.pageData[index];
        viewModel.setDataToPanel(currentData);
      },
      setDataToPanel: function(data, who) {
        viewModel.index = -1;
        viewModel.mainCard.removeAllRows();
        var curRow = viewModel.mainCard.createEmptyRow(),
          subDatas = data.billDetails || data.rebateSettlemenDetails;
        viewModel.complexItems.removeAllRows();
        var aCompId = $("#" + 'accountCompId').attr("data-refparam");
        $("#" + 'accountCompId').attr("data-refparam", JSON.stringify(u.extend(JSON.parse(aCompId), {
          "EQ_saleOrg": data.saleOrgId,
          "EQ_financeOrg": data.financeOrgId
        })));

        // viewModel.BomItems.removeAllRows();
        // viewModel.getWarehouse(data);
        // viewModel.getGoodsInfo(data.billDetails);
        // 行号设置为0
        // viewModel.curRowNum(0);
        // viewModel.currowBomNum(0);
        curRow.setSimpleData(data);
        viewModel.getCurDate(curRow);
        // viewModel.setDefaultValue(curRow);
        curRow.status = "nrm";
        if (subDatas && subDatas.length > 0) {
          subDatas.forEach(function(item) {
            // item.rowNum = viewModel.generateRownum();
            if (item.balanceMny) {
              item.mny = item.balanceMny;
            } else if (item.accountFeeMoney) {
              item.mny = parseFloat(item.accountFeeMoney) - parseFloat(item.rebateMoney)
            }
          });
          viewModel.complexItems.setSimpleData(subDatas);
        }
      },
      getCurDate: function(row) {
        // 服务器时间获取
        $._ajax({
          type: "post",
          url: "/occ-stock/stock/common/get-current-date",
          async: false,
          success: function(data) {
            var truetime = u.date.format(data, 'YYYY/MM/DD');
            truetime = new Date(truetime).getTime();
            if (row) {
              row.setValue("billDate", truetime);
            }
            viewModel.curDate(truetime);
          }
        });
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        // viewModel.complexList.setRowFocus(index);
        setTimeout(function() {
          var curRow = viewModel.complexList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.pk = curRow.getValue('ext01');
          viewModel.complexList.originEditData = viewModel.complexList.getFocusRow().getSimpleData();
          viewModel.mainCard.setSimpleData(viewModel.complexList.originEditData);
          //查询子表数据
          viewModel.findByParentid(id);
          viewModel.queryAttach();
          viewModel.goBillPanel();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        }, 0)
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
          var state = curRow.getValue("state");
          viewModel.pk = curRow.getValue('ext01');
          viewModel.findByParentid(id);
          viewModel.initBPMFromBill(id, viewModel);
          viewModel.queryAttach();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
          if (state == '0' || state == '4') {
            $(".ui-operate-btn .customer-edit-show").show();
          } else {
            $(".ui-operate-btn .customer-edit-show").hide();
          }
        }, 0);
      },
      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: appCtx + viewModel.baseurl + "/detail/" + id,
          type: 'get',
          async: false,
          // data: {
          //   id: id
          // },
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
      delShoudItems: function() {
        var allRows = viewModel.shBilllItems.getAllRows(),
          sumMoney = 0,
          len = allRows.length,
          selectedRows = viewModel.shBilllItems.getSelectedRows();
        if (len == 1) {
          toastr.warning('至少有一行数据！')
          return;
        }
        for (var i = 0; i < selectedRows.length; i++) {
          selectedRows[i].setValue("dr", "1");
        }
        viewModel.shBilllItems.removeRows(selectedRows);

        for (var i = 0; i < len; i++) {
          if (allRows[i].status == 'fdel') continue;
          sumMoney += parseFloat(allRows[i].getValue('receivableMoney'));
        }
        viewModel.shBilllList.setValue('money', sumMoney);
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
        var currentRow, ajaxType;
        var index = viewModel.index;
        var mainData = viewModel.mainCard.getSimpleData()[0];
        var subItemsData = viewModel.complexItems.getSimpleData();
        mainData.billDetails = subItemsData;
        if (index >= 0) {
          ajaxType = "put";
        } else {
          ajaxType = "post";
          // 新增时将所有的行状态置为new
          mainData.persistStatus = 'new';
          subItemsData.forEach(function(item) {
            item.persistStatus = 'new';
          });
        }
        $._ajax({
          url: appCtx + viewModel.baseurl,
          type: ajaxType,
          data: JSON.stringify(mainData),
          contentType: "application/json; charset=utf-8",
          success: function(data) {
            common.dialog.stockConfirmDialog(data, function() {
              // 回写界面
              if (index >= 0) {
                //获取需要修改的行
                currentRow = viewModel.complexList.getRowByRowId(
                  viewModel.rowId
                );
                currentRow.setSimpleData(data);
                viewModel.retListPanel();
                toastr.success("保存成功");
              } else {
                //添加数据
                currentRow = viewModel.complexList.createEmptyRow();
                currentRow.setSimpleData(data);
                toastr.success("保存成功");

                var pageIndex = viewModel.pageModel.pageIndex();
                // 从待保存数据中删除掉当前数据
                viewModel.pageData.splice(pageIndex, 1);
                if (viewModel.pageData.length == 0) {
                  // 若没有待保存数据，则返回列表页
                  viewModel.retListPanel();
                } else {
                  // 若仍有待保存数据，切换到新数据，并修改总页数
                  viewModel.pageModel.totalPages(viewModel.pageData.length);
                  viewModel.pageChange4Add(pageIndex);
                }
              }
            });
          }
        });
        // var allRows = viewModel.complexItems.getAllRows();
        // if (allRows.length == 0 || allRows.every(function(row) {
        //     return row.status == u.Row.STATUS.FALSE_DELETE
        //   })) {
        //   toastr.error("请录入表体行数据");
        //   return;
        // }
        // var complexData = viewModel.complexList.getCurrentRow().getSimpleData();
        // var complexItemsData = viewModel.complexItems.getSimpleData();
        // complexData.billDetails = complexItemsData;
        // var _ajaxType = viewModel.complexList.getValue("id") ? "put" : "post";
        // $._ajax({
        //   url: appCtx + viewModel.baseurl,
        //   type: _ajaxType,
        //   data: JSON.stringify(complexData),
        //   contentType: "application/json; charset=utf-8",
        //   success: function(data) {
        //     viewModel.search();
        //     // viewModel.complexList.getFocusRow().setSimpleData(data);
        //     viewModel.retListPanel();
        //   }
        // })
      },
      //重置单据
      resetBill: function() {
        // var curRow = viewModel.complexList.getCurrentRow();
        // 新增重置
        // 编辑重置（修改或复制）
      },
      //应收单取消
      cancelShouldBill: function() {
        viewModel.shBilllItems.removeAllRows();
        var curRow = viewModel.shBilllList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.shBilllList.originEditData)
        }
        // 新增或复制，则删除
        else {
          viewModel.shBilllList.removeRow(curRow);
          viewModel.shBilllItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //取消单据
      cancelBill: function() {
        viewModel.complexItems.removeAllRows();
        var curRow = viewModel.mainCard.getCurrentRow();

        // 修改，则还原
        if (curRow.getValue("id")) {
          viewModel.mainCard.removeRow(curRow);
          var orgRow = viewModel.complexList.getCurrentRow();
          if (orgRow)
            orgRow.setSimpleData(viewModel.complexList.originEditData)
        }
        // 新增或复制，则删除
        else {
          var orgRow = viewModel.complexList.getCurrentRow();
          viewModel.mainCard.removeRow(curRow);
          if (orgRow) {
            viewModel.complexList.removeRow(orgRow);
          }
          viewModel.complexItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("enableStatus", "1");
              }
            }
          })
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.complexList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: appCtx + viewModel.baseurl + "/disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("enableStatus", "0");
              }
            }
          })
        }
      },
      //参照选择批量新增子表（销售产品）
      showAddItemsRef: function() {
        var newRow = viewModel.complexItems.createEmptyRow();
      },

      detail2bill: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
        common.bill.detail2bill();
      },
      //导入
      importHandle: function() {
        var urlInfo = viewModel.excelurl + '/excelDataImport'; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + '/excelLoadingStatus'; //请求进度地址参数
        var ele = $('#importFiel')[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
      },
      //导出
      exportHandle: function() {
        var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.excelurl + '/downloadExcelTemplate'; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + '/excelDataExport'; //导出数据地址参数
        var listData = viewModel.complexList; //需要导出表格的dataTable
        var ele = $('#exportFiel')[0]; //挂载元素
        common.fileHandle.exportFile(listData, ele, searchParams, templateUrl, excelDataUrl);
      },
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
    },
    afterCreate: function() {
      app = viewModel.app;
      // 选择上传文件后，直接调用上传方法
      $("#fileiptwrap").on("change", "#attachuploadbatch_id", function() {
        if (this.value) {
          viewModel.uploadAttach();
        }
      });
      viewModel.shBilllItems.on('receivableMoney.valuechange', function(obj) {
        if (!obj.newValue) return;
        var money = viewModel.shBilllList.getValue('money'),
          allRows = viewModel.shBilllItems.getAllRows(),
          sumMoney = 0,
          oldVal = obj.oldValue;
        var orDatas = viewModel.shBilllItems.originEditData;
        var curRow = viewModel.shBilllItems.getRowByRowId(obj.rowId);
        if (obj.newValue == 0 || obj.newValue == '0') {
          curRow.setValue('receivableMoney', obj.oldValue);
          toastr.warning('不能输入0！');
          return;
        }
        for (var i = 0; i < orDatas.length; i++) {
          if (curRow.rowId == orDatas[i].rowId) {
            var oMoney = orDatas[i].receivableMoney,
              curMoney = curRow.getValue('receivableMoney');
            if (oMoney < 0) {
              if (oMoney > curMoney || curMoney > 0) {
                curRow.setValue('receivableMoney', oMoney);
                toastr.warning('应收金额应在 ' + orDatas[i].receivableMoney + '~0 之间');
                break;
              }
            } else {
              if (oMoney < curMoney || curMoney < 0) {
                curRow.setValue('receivableMoney', oMoney);
                toastr.warning('应收金额应在 ' + orDatas[i].receivableMoney + '~0 之间');
                break;
              }
            }
          }
        }

        for (var i = 0; i < allRows.length; i++) {
          if (allRows[i].status == 'fdel') continue;
          sumMoney += parseFloat(allRows[i].getValue('receivableMoney'));
        }
        viewModel.shBilllList.setValue('money', sumMoney);
      });
      //以后会用开始
      // viewModel.complexItems.on('num.valuechange', function(obj) {
      //   if (!obj.newValue) return;
      //   var row = obj.rowObj,
      //     price = row.getValue('price');
      //   if (price) {
      //     row.setValue('mny', parseInt(price) * obj.newValue);
      //   }
      // });
      // viewModel.complexItems.on('price.valuechange', function(obj) {
      //   if (!obj.newValue) return;
      //   var row = obj.rowObj,
      //     price = row.getValue('num');
      //   if (price) {
      //     row.setValue('mny', parseInt(num) * obj.newValue);
      //   }
      // });
      // viewModel.complexItems.on('balanceMnyTemp.valuechange', function(obj) {
      //   if (!obj.newValue) return;
      //   var row = obj.rowObj;
      //   row.setValue('mny', obj.newValue);
      // });
      // //以后会用结束
      //账期
      viewModel.shBilllItems.on("beginDate.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var curRow = viewModel.shBilllItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue,
          account = curRow.getValue('accountId');
        if (account) {
          $._ajax({
            url: "/occ-settlement/settlement/receivablebills/endDate",
            type: "post",
            data: {
              beginDate: newVal,
              account: account
            },
            success: function(date) {
              var date = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes() + ':';
              var s = date.getSeconds();
              curRow.setValue('endDate', Y + M + D + h + m + s);
            }
          });
        } else {
          curRow.setValue('endDate', newVal);
        }
      });
      viewModel.shBilllItems.on("accountId.valuechange", function(obj) {
        if (!obj.newValue) {
          return;
        }
        var curRow = viewModel.shBilllItems.getRowByRowId(obj.rowId),
          newVal = obj.newValue,
          beginDate = curRow.getValue('beginDate');
        if (beginDate) {
          $._ajax({
            url: "/occ-settlement/settlement/receivablebills/endDate",
            type: "post",
            data: {
              beginDate: beginDate,
              account: newVal
            },
            success: function(date) {
              var date = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes() + ':';
              var s = date.getSeconds();
              curRow.setValue('endDate', Y + M + D + h + m + s);
            }
          });
        } else {
          // curRow.setValue('endDate', newVal);
        }
      });
      viewModel.mainCard.on('accountId.valuechange', function(obj) {
        if (!obj.newValue) return;
        var refer = $('div[id^="refContaineraccountId"]').data("uui.refer");
        var refValues = refer.values[0];
        if (!refValues) return;
        // viewModel.complexList.setValue('castTypeId', refValues.castTypeId);
        viewModel.mainCard.setValue('saleOrgId', refValues.saleOrgId)
        viewModel.mainCard.setValue('financeOrgId', refValues.financeOrgId)
        viewModel.mainCard.setValue('saleOrgName', refValues.saleOrgName)
        viewModel.mainCard.setValue('financeOrgName', refValues.financeOrgName)
        viewModel.mainCard.setValue('castTypeId', refValues.castTypeId);
        var params = {
          EQ_isEnable: "1",
          EQ_isChannelCustomer: "1",
          EQ_SaleOrder: refValues.saleOrgId
        };
        $("#customerId").parent().attr(
          "data-refparam",
          JSON.stringify(params)
        );
        //   var grid = app.getComp("grid_complexItem").grid,
        //     colGoodsId = grid.getColumnByField('goodsId'),
        //     colNum = grid.getColumnByField('num'),
        //     colPrice = grid.getColumnByField('price'),
        //     colBalanceMny = grid.getColumnByField('mny'),
        //     colTemp = grid.getColumnByField('balanceMnyTemp');
        //   // var gAttr = grid.getColumnAttr('editable', 'goodsId');
        switch (refValues.castTypeId) {
          case 'pay01':
            viewModel.mainCard.setValue('castTypeName', '冲抵订单');
            //       viewModel.complexItems.removeAllRows();
            //       //goodsId
            //       grid.setColumnVisibleByColumn(colGoodsId, false);
            //       grid.setRequired('goodsId', false);
            //       grid.setColumnVisibleByColumn(colNum, false);
            //       grid.setRequired('num', false);
            //       grid.setColumnVisibleByColumn(colPrice, false);
            //       grid.setRequired('price', false);
            //       grid.setColumnVisibleByColumn(colBalanceMny, false);
            //       grid.setRequired('mny', true);
            //       //tem
            //       grid.setColumnVisibleByColumn(colTemp, true);
            //       grid.setRequired('balanceMnyTemp', true);
            break;
          case 'pay02':
            viewModel.mainCard.setValue('castTypeName', '货补');
            //       viewModel.complexItems.removeAllRows();
            //       grid.setColumnVisibleByColumn(colGoodsId, false);
            //       grid.setRequired('goodsId', false);
            //       grid.setColumnVisibleByColumn(colNum, false);
            //       grid.setRequired('num', false);
            //       grid.setColumnVisibleByColumn(colPrice, false);
            //       grid.setRequired('price', false);
            //       grid.setColumnVisibleByColumn(colBalanceMny, false);
            //       grid.setRequired('mny', true);
            //       //tem
            //       grid.setColumnVisibleByColumn(colTemp, true);
            //       grid.setRequired('balanceMnyTemp', true);
            break;
          case 'pay03':
            viewModel.mainCard.setValue('castTypeName', '实物货补');
            //       viewModel.complexItems.removeAllRows();
            //       //goodsId
            //       grid.setColumnVisibleByColumn(colGoodsId, true);
            //       grid.setRequired('goodsId', false);
            //       grid.setColumnVisibleByColumn(colNum, true);
            //       grid.setRequired('num', true);
            //       grid.setColumnVisibleByColumn(colPrice, true);
            //       grid.setRequired('price', false);
            //       grid.setColumnVisibleByColumn(colBalanceMny, true);
            //       grid.setRequired('mny', false);
            //       //tem
            //       grid.setColumnVisibleByColumn(colTemp, false);
            //       grid.setRequired('balanceMnyTemp', false);
            break;
          case 'pay04':
            viewModel.mainCard.setValue('castTypeName', '账扣');
            //       viewModel.complexItems.removeAllRows();
            //       //goodsId
            //       grid.setColumnVisibleByColumn(colGoodsId, false);
            //       grid.setRequired('goodsId', false);
            //       grid.setColumnVisibleByColumn(colNum, false);
            //       grid.setRequired('num', false);
            //       grid.setColumnVisibleByColumn(colPrice, false);
            //       grid.setRequired('price', false);
            //       grid.setColumnVisibleByColumn(colBalanceMny, true);
            //       grid.setRequired('mny', false);
            break;
          default:
            viewModel.mainCard.setValue('castTypeName', '');
            //       viewModel.complexItems.removeAllRows();
            //       //goodsId
            //       grid.setColumnVisibleByColumn(colGoodsId, false);
            //       grid.setRequired('goodsId', false);
            //       grid.setColumnVisibleByColumn(colNum, false);
            //       grid.setRequired('num', false);
            //       grid.setColumnVisibleByColumn(colPrice, false);
            //       grid.setRequired('price', false);
            //       grid.setColumnVisibleByColumn(colBalanceMny, true);
            //       grid.setRequired('mny', false);
        }
      })
      // 列表查询数据(无查询条件)
      // viewModel.search();
      // // 子表参照聚焦行，用于绑定子表参照组件
      // var refRow = viewModel.ItemRefList.createEmptyRow();
      // viewModel.ItemRefList.setRowFocus(refRow);
      // // 确定销售产品参照，为产品组合子表增行
      // viewModel.ItemRefList.on("productref.valuechange", function(obj) {
      //   // 清空参照时不增行
      //   if (!obj.newValue) {
      //     return;
      //   }
      //   var refer = $("#refContainerproductref").data("uui.refer");
      //   var refValues = refer.values;
      //   if (refValues && refValues.length > 0) {
      //     for (var i = 0; i < refValues.length; i++) {
      //       var id = refValues[i].refpk;
      //       var row = viewModel.complexItems.getRowByField("productid", id);
      //       if (!row || row.status == u.Row.STATUS.FALSE_DELETE) {
      //         var newrow = viewModel.complexItems.createEmptyRow();
      //         newrow.setValue("productidCode", refValues[i].refcode);
      //         newrow.setValue("productidName", refValues[i].refname);
      //         newrow.setValue("productidStandardName", refValues[i].productModelName);
      //         newrow.setValue("productidSaleSeriesName", refValues[i].productSaleSeriesName);
      //         newrow.setValue("unitName", refValues[i].baseUnit);
      //         newrow.setValue("productid", id);
      //       }
      //     }
      //   }
      // });
    }
  });

  return view;
});