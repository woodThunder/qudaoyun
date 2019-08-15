/**
 * 支持图片上传
 * 需重写savePic，picPage方法
 */
define(
  [
    "text!/ocm-web/views/simplepicview/simplepicview.html",
    "ocm_common",
    "ocm_baseview"
  ],
  function(tpl, common, baseview) {
    "use strict";
    //var tpl = '<div class="ui-panel ui-list-panel">\r\n      <div>\r\n      <div class="page-title">\r\n      <span data-bind="text:title"></span>\r\n      </div>\r\n      </div>\r\n      <div>\r\n      <div>\r\n      <div class="oc-breadcrumb">\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <div class="title-seperator"></div>\r\n      <ui-searchbox params=\'datasource:$root.searchSource,ref:$root.searchcomp,search:$root.search,clean:$root.cleanSearch\'>\r\n      </ui-searchbox>\r\n      <div class="ui-panel-body">\r\n      <div class="ui-panel-body-head">\r\n      <div class="ui-panel-body-head-left">\r\n      <ui-buttons params=\'datasource:$root.buttonSource\'>\r\n      </ui-buttons>\r\n      </div>\r\n      </div>\r\n      <div class="ui-table-container">\r\n      <ui-grid params=\'options:$root.gridOption,vm:$root\'>\r\n      </ui-grid>\r\n      <div class="ui-statistics margin-top-10">\r\n      已选择\r\n      <span class="font-c-blue" data-bind="text:simpleList.selectedIndices().length"></span>项数据\r\n      </div>\r\n      <div class="pagination-right">\r\n      <div id=\'pagination\' class=\'pagination u-pagination pagination-sm\' u-meta=\'{"type":"pagination","data":"simpleList","pageChange":"pageChange","sizeChange":"sizeChange"}\'></div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <ui-dialogcard params=\'datasource:$root.dialogcardSource,ref:$root.dialogcardcomp,dt:$root.simpleList\'>\r\n      </ui-dialogcard>\r\n   <div class="ui-bill-detail ui-panel" style="display: none;">\r\n    <div>\r\n    <div class="page-title">\r\n    <span data-bind="text:title"></span>\r\n    </div>\r\n    </div>\r\n    <div>\r\n    <div>\r\n    <div class="oc-breadcrumb">\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class="ui-panel-btn-bg">\r\n    <div class="ui-operate-btn">\r\n    <a class="ui-btn ui-btn-primary" data-bind="click: retListPanel">返回\r\n    </a>\r\n    </div>\r\n    </div>\r\n    <div class="ui-panel-head">\r\n    <ui-detail params=\'datasource:$root.detailSource,dt:$root.simpleList,vm:$root\'>\r\n    </ui-detail>\r\n    </div>\r\n    </div><div id="exportFiel"></div>\r\n  <div id="importFiel"></div>\r\n';
    var viewModel;
    var view = baseview.extend({
      tpl: tpl,
      rendertype: common.rendertype,
      setTemplate: function(el, tpl) {
        el.innerHTML = tpl;
        viewModel = this.viewModel;
      },
      events: {
        //跳转图片维护页
        goPicPanel: common.bill.goPicPanel,
        //返回
        goPicPanelbill: common.bill.goPicPanelbill,
        //跳转单据详情页
        goDetailPanel: common.bill.goDetailPanel,
        //返回列表页
        retListPanel: common.bill.retListPanel,
        //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
        beforeEdit: function(index, rowId) {
          var title;
          viewModel.index = index;
          if (u.isNumber(index)) {
            //修改操作
            title = "编辑";
            var currentData = viewModel.simpleList
              .getRowByRowId(rowId)
              .getSimpleData();
            viewModel.rowId = rowId;
            viewModel.dialogcardcomp.seteidtData(currentData);
          } else {
            title = "新增";
            //清空编辑框的信息
            viewModel.dialogcardcomp.cleareidt();
          }
          //显示模态框
          viewModel.dialogWidth
            ? viewModel.dialogcardcomp.show(
                title,
                viewModel.dialogWidth,
                viewModel.edit
              )
            : viewModel.dialogcardcomp.show(title, "500px", viewModel.edit);
        },
        //将操作后的数据进行保存
        edit: function() {
          var result = viewModel.dialogcardcomp.validate();
          if (result.passed) {
            var index = viewModel.index;
            var currentRow,
              type = "post";
            var postdata = viewModel.dialogcardcomp.geteidtData();
            if (index >= 0) {
              type = "put";
            }
            //更改后台数据
            $._ajax({
              url: appCtx + viewModel.baseurl,
              type: type,
              data: JSON.stringify(postdata),
              contentType: "application/json; charset=utf-8",
              success: function(data) {
                //如果index大于等于0说明是修改
                viewModel.dialogcardcomp.close();
                if (index >= 0) {
                  //获取需要修改的行
                  currentRow = viewModel.simpleList.getRowByRowId(
                    viewModel.rowId
                  );
                  //将用户填写的数据更新到simpleList上
                } else {
                  //添加数据
                  currentRow = viewModel.simpleList.createEmptyRow();
                }
                currentRow.setSimpleData(data);
              }
            });
          }
        },
        //删除和批量删除
        del: function(data, rowId) {
          if (typeof data == "number") {
            viewModel.simpleList.setRowSelectbyRowId(rowId);
          }
          var ids = [];
          var rows = viewModel.simpleList.getSelectedRows();
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
                    viewModel.simpleList.removeRows(rows);
                  }
                });
              }
            });
          } else {
            toastr.warning("请至少选择一项");
          }
        },
        //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
        search: function(reindex) {
          if (viewModel.resultList && viewModel.resultList.content) {
            viewModel.simpleList.setSimpleData(viewModel.resultList.content, {
              unSelect: true
            });
            viewModel.simpleList.totalRow(viewModel.resultList.totalElements);
            viewModel.simpleList.totalPages(viewModel.resultList.totalPages);
            return false;
          }
          if (reindex) {
            viewModel.simpleList.pageIndex(0);
          }
          viewModel.simpleList.removeAllRows();

          var queryData = viewModel.searchcomp.getDataWithOpr
            ? viewModel.searchcomp.getDataWithOpr()
            : {};
          queryData.size = viewModel.simpleList.pageSize();
          queryData.page = viewModel.simpleList.pageIndex();
          $._ajax({
            type: "get",
            url:
              appCtx +
              (viewModel.searchBaseurl
                ? viewModel.searchBaseurl
                : viewModel.baseurl),
            dataType: "json",
            data: queryData,
            success: function(data) {
              viewModel.simpleList.setSimpleData(data.content, {
                unSelect: true
              });
              viewModel.simpleList.totalRow(data.totalElements);
              viewModel.simpleList.totalPages(data.totalPages);
            }
          });
        },
        //清空搜索条件
        cleanSearch: function() {
          viewModel.searchcomp.clearSearch();
        },
        //页码改变时的回调函数
        pageChange: function(index) {
          viewModel.simpleList.pageIndex(index);
          viewModel.search();
        },
        //页码改变时的回调函数
        sizeChange: function(size) {
          viewModel.simpleList.pageSize(size);
          viewModel.search(true);
        },
        //启用
        enable: function() {
          var selectedRows = viewModel.simpleList.getSelectedRows();
          if (selectedRows && selectedRows.length > 0) {
            var ids = selectedRows.map(function(row, index, arr) {
              return row.getValue("id");
            });
            $._ajax({
              type: "post",
              url: appCtx + viewModel.baseurl + "/batch-enable",
              data: {
                ids: ids.join(",")
              },
              success: function(res) {
                for (var i = 0; i < selectedRows.length; i++) {
                  viewModel.statusField
                    ? selectedRows[i].setValue(viewModel.statusField, "1")
                    : selectedRows[i].setValue("isEnable", "1");
                }
              }
            });
          } else {
            toastr.warning("请至少选择一项");
          }
        },
        //停用
        disable: function() {
          var selectedRows = viewModel.simpleList.getSelectedRows();
          if (selectedRows && selectedRows.length > 0) {
            var ids = selectedRows.map(function(row, index, arr) {
              return row.getValue("id");
            });
            $._ajax({
              type: "post",
              url: appCtx + viewModel.baseurl + "/batch-disable",
              data: {
                ids: ids.join(",")
              },
              success: function(res) {
                for (var i = 0; i < selectedRows.length; i++) {
                  viewModel.statusField
                    ? selectedRows[i].setValue(viewModel.statusField, "0")
                    : selectedRows[i].setValue("isEnable", "0");
                }
              }
            });
          } else {
            toastr.warning("请至少选择一项");
          }
        },
        detail: function() {
          //确保grid先将行设置为focus状态
          setTimeout(function() {
            viewModel.goDetailPanel();
          }, 0);
        },
        //导入
        importHandle: function() {
          var urlInfo = viewModel.excelurl + "/excelDataImport"; //倒入地址参数
          var urlStatusInfo = viewModel.excelurl + "/excelLoadingStatus"; //请求进度地址参数
          var ele = $("#importFiel")[0]; //挂载元素
          common.fileHandle.importFile(urlInfo, urlStatusInfo, ele);
        },
        //导出
        exportHandle: function() {
          var searchParams = viewModel.searchcomp.getDataWithOpr(); //搜索查询参数
          var templateUrl = viewModel.excelurl + "/downloadExcelTemplate"; //导出模板地址参数
          var excelDataUrl = viewModel.excelurl + "/excelDataExport"; //导出数据地址参数
          var listData = viewModel.simpleList; //需要导出表格的dataTable
          var ele = $("#exportFiel")[0]; //挂载元素
          common.fileHandle.exportFile(
            listData,
            ele,
            searchParams,
            templateUrl,
            excelDataUrl
          );
        },
        //表格图片
        picShow: function(obj) {
          var productPhotoUrl = viewModel.simplePhotoList
            .getRow(obj.rowIndex)
            .getValue("productPhotoUrl");
          var prodUrl = "";
          //特殊字符\  .  替换
          if (productPhotoUrl) {
            prodUrl = productPhotoUrl
              .replace(/\./g, "spot")
              .replace(/\//g, "linePath")
              .replace(/\-/g, "lineThrough");
            obj.element.innerHTML =
              '<img width="30" height="30" src=' +
              productPhotoUrl +
              ' data-bind="click: picBig.bind($data,' +
              "'" +
              prodUrl +
              "'" +
              ')">';
          }
          // obj.element.innerHTML = '<img width="30" height="30" src='+productPhotoUrl+'>';
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
        //列中上传图片
        picUploadList: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var uploadBtn =
            "data-bind=click:picPage.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          obj.element.innerHTML =
            '<div class="ui-handle-icon">' +
            '<span class="ui-handle-word">' +
            '<a href="#"' +
            uploadBtn +
            ' title="上传图片">上传图片</a>' +
            "</span>" +
            "</div>";
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
        picBig: function(url) {
          var picUrl = url
            .replace(/spot/g, ".")
            .replace(/linePath/g, "/")
            .replace(/lineThrough/g, "-");
          if (!picBigDialog) {
            picBigDialog = u.dialog({
              content: "#picBig-dialog",
              hasCloseMenu: true
            });
          } else {
            picBigDialog.show();
          }
          $("#picBig-dialog")
            .parent()
            .parent()
            .css("width", "auto");
          $("#picBig").attr("src", picUrl);
        },
        //--------------------------------图片上传-------------------------------------------------
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
        //上传弹框调用
        showFileDialog: function() {
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
            var allowExtention = ".jpg,.bmp,.gif,.png";
            var par = {
              fileElementId: "uploadbatch_id", //【必填】文件上传空间的id属性  <input type="file" id="id_file" name="file" />,可以修改，主要看你使用的 id是什么
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
        fileUploadCallback: function(data) {
          if (1 == data.status) {
            //上传成功状态
            viewModel.FileList.addSimpleData(data.data);
            //  toastr.success();
          } else {
            //error 或者加載js錯誤
            toastr.error(data.message);
          }
        },
        fileQuery: function() {
          //获取表单
          var pk = viewModel.pk;
          var par = {
            //建议一定要有条件否则会返回所有值
            filepath: pk, //【选填】单据相关的唯一标示，一般包含单据ID，如果有多个附件的时候由业务自己制定规则
            groupname: pk, //【选填】[分組名称,未来会提供树节点]
            cross_url: window.ctxfilemng //【选填】跨iuap-saas-fileservice-base 时候必填
          };
          var f = new interface_file();
          f.filesystem_query(par, viewModel.fileQueryCallBack);
        },
        fileQueryCallBack: function(data) {
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
        fileDelete: function() {
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
        fileDeleteCallBack: function(data) {
          if (1 == data.status) {
            //上传成功状态
            viewModel.fileQuery();
          } else {
            toastr.error(data.message);
          }
        },
        //下载
        fileDownload: function() {
          var row = viewModel.FileList.getSelectedRows();
          if (row == null || row.length == 0 || row.length > 1) {
            toastr.error("请选择一个附件");
            return;
          }
          for (var i = 0; i < row.length; i++) {
            var pk = row[i].getValue("id");
            var form = $("<form>"); //定义一个form表单
            form.attr("style", "display:none"); //在form表单中添加查询参数
            form.attr("target", "");
            form.attr("enctype", "multipart/form-data");
            form.attr("method", "post");
            form.attr(
              "action",
              window.ctxfilemng +
                "file/download?permission=read&stream=false&id=" +
                pk
            );
            $("#file-dialog").append(form); //将表单放置在web中
            form.submit();
          }
        },
        //查看
        fileView: function() {
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
        //删除图片
        delPic: function(data) {
          if (typeof data == "number") {
            viewModel.ProductSaleSeriesPhotoList.setRowSelect(data);
          }
          var ids = [];
          var rows = viewModel.ProductSaleSeriesPhotoList.getSelectedRows();
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
                  url: appCtx + viewModel.picurl + "/delete",
                  type: "post",
                  // data: "ids=" + ids.join(","),
                  data: {
                    ids: ids.join(",")
                  },
                  success: function(data) {
                    viewModel.ProductSaleSeriesPhotoList.removeRows(rows);
                    toastr.success("删除成功");
                  }
                });
              }
            });
          } else {
            toastr.warning("请先选择需要删除数据");
          }
        }
      },
      afterCreate: function() {
        //viewModel.search();
      }
    });

    return view;
  }
);
