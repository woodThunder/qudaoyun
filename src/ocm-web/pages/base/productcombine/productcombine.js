define(
  [
    "text!./productcombine.html",
    "ocm_common",
    "searchbox",
    "editcard",
    "ocm-wangEditor",
    "./meta.js",
    "ocm_global",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl",
    "ocm_kindeditor",
  ],
  function(tpl, common, searchbox, editcard, wangEditor /*,bpmopenbill*/ ) {
    "use strict";
    var app,
      baseData,
      events,
      rendertype,
      viewModel,
      singledocSearch,
      singledoceidt,
      editor;
    var BILLPANELSTATUS = {
      ADD: "add",
      EDIT: "edit",
      COPY: "copy",
      DETAIL: "detail",
      DEFAULT: "default"
    };
    baseData = {
      baseurl: "/product-combine",
      excelurl: '/product-combine-excel',
      ProductCombineList: new u.DataTable(ProductCombine),
      ProductCombineItems: new u.DataTable(ProductCombineItem),
      FileList: new u.DataTable(FileMeta),
      ctxfilemng: "/iuap-saas-filesystem-service/",
      px: "",
      // ItemRefList: new u.DataTable(ItemRef),
      enableRadioSrc: [{
        value: "1",
        name: "已启用"
      }, {
        value: "2",
        name: "已停用"
      }, {
        value: "0",
        name: "未启用"
      }, {
        value: CONST.DEFAULTOPTION,
        name: "全部"
      }],
      // enableCheckSrc: [{value:"1",name:"是"}],
      // enableFmt: ko.pureComputed(function() {
      //   var enableStatus = viewModel.ProductCombineList.ref("enableStatus")();
      //   return enableStatus == 1 ? "启用" : "停用";
      // }),
      combineTypeData: [{
        name: "固定",
        value: "0"
      }, {
        name: "自由",
        value: "1"
      }],
      checkData: [{
        name: "仅商品组合",
        value: "1"
      }],
      //跳转单据页
      goBillPanel: common.bill.goBillPanel,
      //返回列表页
      retListPanel: common.bill.retListPanel,
      //详情页
      goDetailPanel: common.bill.goDetailPanel,
      billPanelStatus: ko.observable(BILLPANELSTATUS.DEFAULT),
      //组合类型
      comTypeFormat: function(dataTable, field) {
        var value = this[dataTable].ref(field)();
        value = parseInt(value);
        var showName = "";
        if (u.isNumber(value)) {
          if (value == 0) {
            showName = "固定";
          }
          if (value == 1) {
            showName = "自由";
          }
        }
        return showName;
      },
      //是否商品组合
      isProductFormat: function(dataTable, field) {
        var value = this[dataTable].ref(field)();
        if (value == null) return "否";
        value = parseInt(value);
        var showName = "";
        if (u.isNumber(value)) {
          if (value == 0) {
            showName = "否";
          }
          if (value == 1) {
            showName = "是";
          }
        }
        return showName;
      }
    };

    rendertype = {
      operation: function (obj) {
        var viewModel = obj.gridObj.viewModel;
        var dataTableRowId = obj.row.value["$_#_@_id"];
        var delfun = '';
        var editfun = '';
        if(obj.row.value.isEnable != 1) {
          editfun =
              "href='#' " +
              "data-bind=click:showEditBillPanel.bind($data," +
          obj.rowIndex +
          "," +
          dataTableRowId +
          ")";
          delfun =
              "href='#' " +
              "data-bind=click:del.bind($data," +
              obj.rowIndex +
              "," +
              dataTableRowId +
              ")";
        } else {
          editfun = "class='disabled' "
          delfun = "class='disabled' "
        }
        obj.element.innerHTML =
            '<div class="ui-handle-icon">' +
            '<span class="ui-handle-word">' +
            '<a ' +
            // obj.row.isEnable == 1?'"disable= disable"': ''+
            editfun +
            ' title="编辑">编辑</a>' +
            "</span>    " +
            '<span class="ui-handle-word">' +
            '<a ' +
            delfun +
            ' title="删除">删除</a>' +
            "</span></div>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      enableStatusRender: common.rendertype.enableRender,
      detailRender: common.rendertype.detailRender,
      //判断表格里的状态
      combinationTypeRender: function(obj) {
        var showValue = obj.value == "0" ? "固定" : "自由";
        obj.element.innerHTML = showValue;
      },
      //子表删除
      delRender: function(obj) {
        var viewModel = obj.gridObj.viewModel;
        var changefun =
          "data-bind=click:delItem.bind($data," + obj.rowIndex + ")";
        obj.element.innerHTML =
          '<div class="ui-handle-icon">' +
          '<span class="ui-handle-word">' +
          '<a href="#" ' +
          changefun +
          ' title="删除">删除</a>' +
          "</span>" +
          "</div>";
        ko.cleanNode(obj.element);
        ko.applyBindings(viewModel, obj.element);
      },
      onShelfStatusRender: function(params) {
        params.element.innerHTML = "否";
        /*默认1表示启用，0表示停用*/
        if (params.value != 0 && params.value != "0") {
          params.element.innerHTML = "是";
        }
      },
    };
    events = {
      // 放回列表页
      retListPanel: function() {
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DEFAULT);
        common.bill.retListPanel();
      },
      //随机生成文件夹
      generateMixed: function() {
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
      //添加图片
      onOpenUploadWin: function() {
        $("#uploadbatch_id").val(undefined);
        $("#uploadbatch_id").trigger("click");
      },
      //上传附件
      onFileUpload: function() {
        var fileNum = $("#uploadbatch_id")[0].files.length;
        var fileSize = 0;
        var fileSizeMb = 0;
        var fileTypeArr = [];
        var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
        var fileSizeSum = (function() {
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
        for (var i = 0; i < fileTypeArr.length; i++) {
          if (allowType.indexOf(fileTypeArr[i]) == -1) {
            toastr.warning("仅支持" + allowType + "格式文件");
            return false;
          }
        }
        if (fileSizeSum <= 500) {
          //获取表单
          var pk = viewModel.pk;
          var par = {
            fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
            filepath: pk, //【必填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
            groupname: pk, //【必填】分組名称,未来会提供树节点
            permission: "read", //【选填】 read是可读=公有     private=私有     当这个参数不传的时候会默认private
            url: true, //【选填】是否返回附件的连接地址，并且会存储到数据库
            isreplace: true,
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
      detail: function() {
        //确保grid先将行设置为focus状态
        setTimeout(function() {
          var curRow = viewModel.ProductCombineList.getCurrentRow();
          var id = curRow.getValue("id");
          viewModel.findByParentid(id);
          viewModel.showPic();
          viewModel.billPanelStatus(CONST.BILLPANELSTATUS.DETAIL);
          viewModel.goDetailPanel();
        }, 0);
      },
      //上传文件回传信息
      fileUploadCallback: function(data) {
        if (1 == data.status) {
          //上传成功状态
          viewModel.callBackHandle(data);
        } else {
          //error 或者加載js錯誤
          toastr.error(data.message);
        }
      },
      //显示图片，并往FileList塞值
      callBackHandle: function(data) {
        viewModel.FileList.addSimpleData(data.data);
        var url = data.data[0].url;
        var picUrl = url
          .replace(/spot/g, ".")
          .replace(/linePath/g, "\\")
          .replace(/lineThrough/g, "-");
        $(".upload-pictures").each(function() {
          var isSrc = $(this)
            .find(".pic")
            .attr("src");
          if (!isSrc) {
            $(this)
              .find(".pic")
              .attr("src", picUrl)
              .css("display", "block");
            return false;
          }
        });
      },
      // 点击编辑-自由
      beforeEditFun2: function(obj) {
        return viewModel.beforeEditFun(obj);
      },
      // 点击编辑-固定
      beforeEditFun: function(obj) {
        var isProduct = viewModel.ProductCombineList.getFocusRow().getValue(
          "isProduct"
        );
        // var commodityCodeCol = obj.gridObj.getColumnByField("commodityCode");
        var curField =
          obj.gridObj.gridCompColumnArr[obj.colIndex].options.field;
        if (isProduct == "1") {
          if (curField == "commodityId" || curField == "amount") {
            return true;
          } else {
            return false;
          }
        } else {
          return viewModel.isEditHandle(obj);
        }
      },
      isEditHandle: function(obj) {
        var data = viewModel.ProductCombineItems.getRow(
          obj.rowIndex
        ).getSimpleData();

        // $("#description-input")[0].value = data.description;
        var curField =
          obj.gridObj.gridCompColumnArr[obj.colIndex].options.field;
        var hasVal;
        for (var key in data) {
          if (
            data[key] &&
            (key == "commodityId" ||
              key == "productId" ||
              key == "productCategoryId")
          ) {
            hasVal = key;
          }
        }
        if (!hasVal || curField == hasVal || curField == "amount") {
          return true;
        }
      },
      // 新增子表
      addItems: function() {
        viewModel.ProductCombineItems.createEmptyRow();
      },
      // 删除子表
      delItem: function(index) {
        viewModel.ProductCombineItems.removeRow(index);
      },
      //进入新增单据页
      showAddBillPanel: function() {
        viewModel.FileList.removeAllRows();
        // 新增时默认可编辑
        viewModel.ProductCombineItems.meta.productId.enable = true;
        viewModel.ProductCombineItems.meta.productCategoryId.enable = true;
        var grid = viewModel.app.getComp("grid_ProductCombineItems2").grid;
        grid.setColumnVisibleByColumn(grid.getColumnByField("weight"), false);
        editor.html("");
        $(".upload-pictures .pic")
          .attr("src", "")
          .css("display", "none");
        viewModel.pk = viewModel.generateMixed();

        var curRow = viewModel.ProductCombineList.createEmptyRow();
        viewModel.ProductCombineList.setRowFocus(curRow);
        viewModel.ProductCombineItems.removeAllRows();
        curRow.setValue("isEnable", "0");
        curRow.setValue("combinationType", "1");
        curRow.setValue("isProduct", null);
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.ADD);
      },
      //进入修改单据页
      showEditBillPanel: function(index) {
        viewModel.ProductCombineList.setRowFocus(index);

        var id = viewModel.ProductCombineList.getFocusRow().getValue("id");
        viewModel.ProductCombineList.originEditData = viewModel.ProductCombineList.getFocusRow().getSimpleData();
        //查询子表数据
        viewModel.findByParentid(id);
        viewModel.showPic();
        viewModel.goBillPanel();
        viewModel.billPanelStatus(CONST.BILLPANELSTATUS.EDIT);
      },
      // 编辑时初始化图片 和 编辑框内容
      showPic: function() {
        var data = viewModel.FileList.getSimpleData();
        var text = viewModel.ProductCombineList.getFocusRow().getValue(
          "description"
        );
        if (data.length == 0) return;
        editor.html("");
        $(".upload-pictures .pic")
          .attr("src", "")
          .css("display", "none");
        for (var i = 0; i < data.length; i++) {
          var url = data[i].url;
          $(".upload-pictures .pic")
            .eq(i)
            .attr("src", url)
            .css("display", "block");
        }
        editor.html(text);
      },
      // 保存单据
      saveBill: function() {
        //校验必输
        var billPanel = $("#prodCombineDetail")[0];
        var basePass = viewModel.validate(billPanel);
        if (basePass.passed) {
          var curRow = viewModel.ProductCombineList.getFocusRow();
          var combinationType = curRow.getValue("combinationType");
          var data = curRow.getSimpleData();
          // var description = $("#description-input")[0].value;
          // data.description = description
          var combinationPhotos = viewModel.FileList.getSimpleData();
          var combinationDetails = viewModel.ProductCombineItems.getSimpleData();
          if (combinationDetails == null || combinationDetails.length == 0) {
            toastr.error("表体行不能为空");
            return;
          }
          var hasRealrow = "false";
          for (var i = 0; i < combinationDetails.length; i++) {
            if (combinationDetails[i]["persistStatus"] != "fdel") {
              hasRealrow = "true";
              break;
            }
          }
          if (hasRealrow == "false") {
            toastr.error("表体行不能为空");
            return;
          }
          //校验商品信息
          for (var i = 0; i < combinationDetails.length; i++) {
            if (combinationDetails[i]["persistStatus"] == "fdel") {
              continue;
            }

            var commodityId = combinationDetails[i]["commodityId"];
            var productId = combinationDetails[i]["productId"];
            var productCategoryId = combinationDetails[i]["productCategoryId"];
            if ((commodityId == null || commodityId.length == 0) && (productCategoryId == null || productCategoryId.length == 0) && (productId == null || productId.length == 0)) {
              toastr.error("商品信息未填写");
              return;
            }
          }
          //如果是固定组合，数量必须录入
          if (combinationType == "0") {
            for (var i = 0; i < combinationDetails.length; i++) {

              if (combinationDetails[i]["amount"] == null && combinationDetails[i]["persistStatus"] != "fdel") {
                toastr.error("固定组合数量必须录入");
                return;
              }
            }
          }
          data.combinationDetails = combinationDetails;
          if (combinationType == "0") {
            data.combinationPhotos = combinationPhotos;
            data.description = editor.html();
          } else {
            data.amount = "";
            data.combinationPhotos = [];
            data.description = "";
          }
          // 仅固定组合且勾选仅商品组合时才校验金额权重
          if (data.combinationType == "0" && data.isProduct == "1") {
            var sum = 0;
            for (var i = 0; i < combinationDetails.length; i++) {
                if (combinationDetails[i]["weight"] <=0 || combinationDetails[i]["weight"] >100) {
                    toastr.error("金额权重需要在1到100之间的正整数");
                    return;
                }
                if (!combinationDetails[i]["weight"].match(/^[0-9]+$/)) {
                  toastr.error("权重金额必须是正整数");
                  return;
                }
                if (combinationDetails[i]["persistStatus"] != "fdel"){
                    sum += parseFloat(combinationDetails[i]['weight']);
                }

            }
            if (sum!=100){
              toastr.error("权重和必须等于100");
              return;
            }
          }
          var _ajaxType = data.id != null ? "put" : "post";
          $._ajax({
            url: window.pathMap.prom + viewModel.baseurl,
            type: _ajaxType,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.ProductCombineList.getFocusRow().setSimpleData(data);
              viewModel.retListPanel();
            }
          });
        }
      },
      validate: function(element) {
        var result = app.compsValidateMultiParam({
          element: element,
          showMsg: true
        });
        return result;
      },
      //删除和批量删除
      del: function(data, rowId) {
        if (typeof data == "number") {
          viewModel.ProductCombineList.setRowSelectbyRowId(rowId);
        }
        var ids = [];
        var rows = viewModel.ProductCombineList.getSelectedRows();
        if (rows.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        if (rows && rows.length > 0) {
          for (var i = 0; i < rows.length; i++) {
            var isEnable = rows[i].getValue("isEnable");
            if (isEnable == 1) {
              toastr.warning("启用状态不能删除!");
              return;
            }
            ids.push(rows[i].getValue("id"));
          }
        }
        common.dialog.confirmDialog({
          msg1: "确认删除这些项？",
          msg2: "此操作不可逆",
          width: "400px",
          type: "error",
          onOk: function() {
            $._ajax({
              url: window.pathMap.prom + viewModel.baseurl + "/delete",
              type: "post",
              // data: "ids=" + ids.join(","),
              data: {
                ids: ids.join(",")
              },
              success: function(data) {
                viewModel.ProductCombineList.removeRows(rows);
              }
            });
          }
        });
      },
      //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
      search: function(reindex) {
        if (reindex) {
          viewModel.ProductCombineList.pageIndex(0);
        }
        viewModel.ProductCombineList.removeAllRows();
        var queryData = singledocSearch.getDataWithOpr();
        var pageSize = viewModel.ProductCombineList.pageSize();
        var pageNumber = viewModel.ProductCombineList.pageIndex();
        queryData.page = pageNumber;
        queryData.size = pageSize;
        $._ajax({
          type: "get",
          url: window.pathMap.prom + viewModel.baseurl,
          dataType: "json",
          data: queryData,
          success: function(data) {
            viewModel.ProductCombineList.setSimpleData(data.content, {
              unSelect: true
            });
            viewModel.ProductCombineList.totalRow(data.totalElements);
            viewModel.ProductCombineList.totalPages(data.totalPages);
          }
        });
      },
      //清空搜索条件
      cleanSearch: function() {
        singledocSearch.clearSearch();
      },
      //页码改变时的回调函数
      pageChange: function(index) {
        viewModel.ProductCombineList.pageIndex(index);
        viewModel.search();
      },
      //页码改变时的回调函数
      sizeChange: function(size) {
        viewModel.ProductCombineList.pageSize(size);
        viewModel.search(true);
      },

      //查询子表数据
      findByParentid: function(id) {
        $._ajax({
          url: window.pathMap.prom + viewModel.baseurl + "/findByParentid",
          type: "get",
          async: false,
          data: {
            id: id
          },
          success: function(data) {
            viewModel.validOnlyGoodsCombile(data);
            viewModel.ProductCombineItems.setSimpleData(
              data.combinationDetails, {
                unSelect: true
              }
            );
            viewModel.FileList.setSimpleData(data.combinationPhotos, {
              unSelect: true
            });
          }
        });
      },

      //新增子表项
      // addItem: function() {
      //   viewModel.ProductCombineItems.createEmptyRow();
      // },
      //删除子表项
      // delItems: function() {
      //   var selectedRows = viewModel.ProductCombineItems.getSelectedRows();
      //   for(var i=0;i<selectedRows.length;i++) {
      //     selectedRows[i].setValue("dr", "1");
      //   }
      //   viewModel.ProductCombineItems.removeRows(selectedRows);
      // },
      //取消单据
      cancelBill: function() {
        viewModel.ProductCombineItems.removeAllRows();
        var curRow = viewModel.ProductCombineList.getCurrentRow();
        // 修改，则还原
        if (curRow.getValue("id")) {
          curRow.setSimpleData(viewModel.ProductCombineList.originEditData);
        } else {
          // 新增或复制，则删除
          viewModel.ProductCombineList.removeRow(curRow);
          viewModel.ProductCombineItems.removeAllRows();
        }
        viewModel.retListPanel();
      },
      //启用
      enable: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: window.pathMap.prom + viewModel.baseurl + "/batch-enable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "1");
              }
            }
          });
        }
      },
      //停用
      disable: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        if (selectedRows.length == 0) {
          toastr.error("请选择数据");
          return;
        }
        if (selectedRows && selectedRows.length > 0) {
          var ids = [];
          for (var i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].getValue("id"));
          }
          $._ajax({
            type: "post",
            url: window.pathMap.prom + viewModel.baseurl + "/batch-disable",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              toastr.success();
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isEnable", "2");
              }
            }
          });
        }
      },

      //导入
      importHandle: function() {
        var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
        var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
        var pageAppCtxUrl = window.pathMap.prom;
        var ele = $("#importFiel")[0]; //挂载元素
        common.fileHandle.importFile(urlInfo, urlStatusInfo, ele, false, null, pageAppCtxUrl);
      },
      //导出
      exportHandle: function() {
        var searchParams = singledocSearch.getDataWithOpr(); //搜索查询参数
        var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
        var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
        var pageAppCtxUrl = window.pathMap.prom;
        var listData = viewModel.ProductCombineList; //需要导出表格的dataTable
        var ele = $("#exportFiel")[0]; //挂载元素
        common.fileHandle.exportFile(
          listData,
          ele,
          searchParams,
          templateUrl,
          excelDataUrl,
          false,
          false,
          pageAppCtxUrl
        );
      },
      //上架
      onshelf: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {

          for (var i = 0; i < selectedRows.length; i++) {
            if (selectedRows[i].getValue("isEnable") != "1") {
              toastr.warning("不能上架未启用的商品");
              return
            }
            if (selectedRows[i].data.isProduct.value != "1") {
              selectedRows.splice(i);
            }
          }
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          });
          $._ajax({
            type: "post",
            url: window.pathMap.prom + viewModel.baseurl + "/batch-onshelf",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isOnShelf", "1");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      //下架
      unonshelf: function() {
        var selectedRows = viewModel.ProductCombineList.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
          var ids = selectedRows.map(function(row, index, arr) {
            return row.getValue("id");
          });
          $._ajax({
            type: "post",
            url: window.pathMap.prom + viewModel.baseurl + "/batch-unonshelf",
            data: {
              ids: ids.join(",")
            },
            success: function(res) {
              for (var i = 0; i < selectedRows.length; i++) {
                selectedRows[i].setValue("isOnShelf", "0");
              }
            }
          });
        } else {
          toastr.warning("请至少选择一项");
        }
      },
      validOnlyGoodsCombile: function (data) {
        var combinationType = data.combinationType;
        var isProduct = data.isProduct;
        // 服了，竟然用两个grid来回切换
        var grid = viewModel.app.getComp("grid_ProductCombineItems2").grid;
        if (combinationType == "0" && isProduct == "1") {
          viewModel.ProductCombineItems.meta.productId.enable = false;
          viewModel.ProductCombineItems.meta.productCategoryId.enable = false;
          grid.setColumnVisibleByColumn(grid.getColumnByField("weight"), true);
        } else {
          viewModel.ProductCombineItems.meta.productId.enable = true;
          viewModel.ProductCombineItems.meta.productCategoryId.enable = true;
          grid.setColumnVisibleByColumn(grid.getColumnByField("weight"), false);
        }
      }
    };
    viewModel = u.extend({},
      baseData,
      events,
      rendertype /*, bpmopenbill.model*/
    );

    function appInit(element, params) {
      //将模板页渲染到页面上
      element.innerHTML = tpl;
      window.initButton(viewModel, element); //初始化按钮权限
      ko.cleanNode(element);
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      app = u.createApp({
        el: element,
        model: viewModel
      });
      viewModel.app = app;
      // 查询组件初始化
      singledocSearch = new searchbox($("#ProductCombine-searchcontent")[0], [{
        type: "text",
        key: "code",
        label: "产品组合编码"
      }, {
        type: "text",
        key: "name",
        label: "产品组合名称"
      }, {
        type: "radio",
        key: "combinationType",
        label: "组合类型",
        defaultvalue: "",
        dataSource: [{
          value: "0",
          name: "固定"
        }, {
          value: "1",
          name: "自由"
        }, {
          value: "",
          name: "全部"
        }]
      }, {
        type: "combo",
        key: "isEnable",
        label: "启用状态",
        dataSource: [{
          value: '',
          name: '全部'
        }, {
          value: '0',
          name: '未启用'
        }, {
          value: '1',
          name: '已启用'
        }, {
          value: '2',
          name: '已停用'
        }]
      }]);
      // 列表查询数据(无查询条件)
      viewModel.search();
      // 初始化富文本编辑器
      // editor = new wangEditor("#rich-text-container");
      // editor.customConfig.uploadImgMaxSize = 30 * 1024 * 1024;
      // editor.customConfig.uploadImgShowBase64 = true;
      // editor.create();
      //富文本
      if (!editor) {
        editor = KindEditor.create("#editEditor", {
          uploadJson: "/iuap-saas-filesystem-service/file/upload",
          afterChange: function() {
            // $('.word_count1').html(this.count()); //字数统计包含HTML代码
            // $('.word_count2').html(this.count('text')); //字数统计包含纯文本、IMG、EMBED，不包含换行符，IMG和EMBED算一个文字
            //////////
            //限制字数
            var limitNum = 500; //设定限制字数
            var pattern = '还可以输入' + limitNum + '字';
            $('.word_surplus').html(pattern); //输入显示
            if (this.count('text') > limitNum) {
              pattern = ('字数超过限制，请适当删除部分内容');
              //超过字数限制自动截取
              var strValue = editor.text();
              strValue = strValue.substring(0, limitNum);
              editor.text(strValue);
            } else {
              //计算剩余字数
              var result = limitNum - this.count('text');
              pattern = '还可以输入' + result + '字';
            }
            $('.word_surplus').html(pattern); //输入显示
            ////////
          }
        });
      }
    }

    function afterRender() {
      //绑定输入框enter事件
      $("#ProductCombine-searchcontent input")
        .off("keydown")
        .on("keydown", function(e) {
          if (e.keyCode == 13) {
            $(this).blur();
            viewModel.search();
          }
        });

      // 切换组合类型/仅商品组合
      viewModel.ProductCombineList.on("valuechange", function(obj) {
        var curRow = viewModel.ProductCombineList.getRowByRowId(obj.rowId);
        if (obj.field == "combinationType" || obj.field == "isProduct") {
          if (
            obj.field == "combinationType" &&
            (!obj.oldValue || obj.ctx == "yes")
          )
            return;
          if (
            obj.field == "isProduct" &&
            (obj.oldValue == undefined || obj.ctx == "yes")
          )
            return;
          if (viewModel.valueChanging) {
            return;
          }
          viewModel.valueChanging = true;
          common.dialog.confirmDialog({
            msg1: "确认要切换组合类型吗？",
            msg2: "此操作不可逆",
            width: "400px",
            type: "error",
            onOk: function() {
              // 组合类型切换到自由时，仅商品组合默认不勾选
              if (obj.field == "combinationType" && obj.newValue == "1") {
                curRow.setValue("isProduct", 0);
              }
              viewModel.ProductCombineItems.removeAllRows();
              viewModel.validOnlyGoodsCombile(curRow.getSimpleData());
              viewModel.valueChanging = false;
            },
            onCancel: function() {
              if (obj.field == "isProduct") {
                obj.rowObj.setValue("isProduct", obj.oldValue, "yes");
              } else if (obj.field == "combinationType") {
                obj.rowObj.setValue("combinationType", obj.oldValue, "yes");
              }
              viewModel.valueChanging = false;
            }
          });
        }
      });
      // 选择上传文件后，直接调用上传方法
      $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
        if (this.value) {
          viewModel.onFileUpload();
        }
      });
      //显示删除按钮
      $(".upload-pictures").hover(
        function() {
          var hasUrl = $(this)
            .find(".pic")
            .attr("src");
          if (hasUrl) {
            $(this).addClass("active");
          }
        },
        function() {
          $(this).removeClass("active");
        }
      );
      // 删除图片地址
      $(".upload-pictures a").on("click", function() {
        var url = $(this)
          .parent()
          .siblings(".pic")
          .attr("src");
        var row = viewModel.FileList.getRowByField("url", url);
        $(this)
          .parent()
          .siblings(".pic")
          .attr("src", "")
          .css("display", "none");
        viewModel.FileList.removeRow(row);
      });
    }

    function init(element, params) {
      appInit(element, params);
      afterRender();
      window.vm = viewModel;
    }

    return {
      init: init
    };
  }
);