define(
  [
    "text!./banner.html",
    "ocm_simpleview",
    "./meta.js",
    "ocm_global",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl"
  ],
  function(tpl, simpleview, model) {
    var viewModel, fileDialog, picBigDialog;
    var view = simpleview.extend({
      tpl: tpl,
      beforeCreate: function() {
        viewModel = this.viewModel;
      },
      model: model,
      baseData: {
        baseurl: "/buyer/banner-settings",
        baseHeadUrl: "/buyer/banner-setting-hs",
        simpleHeadList: new u.DataTable(model.options.metas.bannerheadmeta),
        simpleList: new u.DataTable(model.options.metas.bannermeta),

        picurl: "/product-sale-series-pic",
        relationurl: "/product-sale-series-pic",
        //simplePhotoList: new u.DataTable(model.options.metas.photolistmeta),
        FileList: new u.DataTable(model.options.metas.FileMeta),

        ensureRefKeys: "dialogcardcomp",

        buttonSource: model.options.buttons.button1,
        searchcomp: {},
        searchSource: model.options.searchs.search1,
        dialogcardcomp: {},
        dialogcardSource: model.options.dialogs.dialog1,
        gridOption: model.options.grids.grid1
      },
      events: $.extend({}, simpleview.prototype.events, {
        //图片预览
        picShowList: function(obj) {
          var picturePath = viewModel.simpleList
            .getRow(obj.rowIndex)
            .getValue("imgUrl");
          var prodUrl = "";
          if (picturePath) {
            //特殊字符\  .  替换
            var prodUrl = picturePath
              .replace(/\./g, "spot")
              .replace(/\//g, "linePath")
              .replace(/\-/g, "lineThrough");
            obj.element.innerHTML =
              '<img width="30" height="30" src=' +
              picturePath +
              ' data-bind="click: picBig.bind($data,' +
              "'" +
              prodUrl +
              "'" +
              ')">';
          }
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
        // 单表操作
        operation4single: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var imgUrl = obj.row.value["imgUrl"] || "";
          var delfun =
            "data-bind=click:del.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var editfun =
            "data-bind=click:beforeEdit.bind($data," +
            obj.rowIndex +
            "," +
            dataTableRowId +
            ")";
          var htmlStr = '<div class="ui-handle-icon">';
          // if (imgUrl) {
          //   var showpicFun =
          //     "data-bind=click:picBig.bind($data," + "'" + imgUrl + "'" + ")";
          //   htmlStr +=
          //     '<span class="ui-handle-word">' +
          //     '<a href="#" ' +
          //     showpicFun +
          //     ' title="查看图片">查看图片</a>' +
          //     "</span>    ";
          // }
          htmlStr +=
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
          obj.element.innerHTML = htmlStr;
          ko.cleanNode(obj.element);
          ko.applyBindings(viewModel, obj.element);
        },
        //列中上传图片
        picUploadList: function(obj) {
          var viewModel = obj.gridObj.viewModel;
          var dataTableRowId = obj.row.value["$_#_@_id"];
          var uploadBtn =
            "data-bind=click:showFileDialog.bind($data," +
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
        //图片保存
        savePic: function() {
          var filedata = viewModel.FileList.getSimpleData();
          var currentRow = viewModel.simpleList.getCurrentRow();
          var postdata = currentRow.getSimpleData();
          if (filedata.length == 0) {
            toastr.warning("请先上传图片！");
            return false;
          } else {
            postdata.imgUrl = filedata[0].url;
          }
          type = "put";
          postdata.persistStatus = "upd";
          //更改后台数据
          $._ajax({
            url: appCtx + viewModel.baseurl,
            type: type,
            data: JSON.stringify(postdata),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              toastr.success("保存成功");
              fileDialog.hide();
              currentRow.setSimpleData(data);
              viewModel.search();
            }
          });
        },
        //表格图片
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
        },
        /**
         * 更新自动轮播时间
         */
        updateBannerHeadData: function(rowId, autoPlaySpeed) {
          var currData = viewModel.simpleHeadList
            .getRowByRowId(rowId)
            .getSimpleData();
          currData.autoPlaySpeed = autoPlaySpeed;
          console.log("updateAutoaplySpeed:" + currData.autoPlaySpeed);
          type = "put";
          currData.persistStatus = "upd";
          $.ajax({
            url: appCtx + viewModel.baseHeadUrl,
            type: type,
            data: JSON.stringify(currData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
              viewModel.simpleHeadList.setSimpleData(data);
            }
          });
        }
      }),
      afterCreate: function() {
        viewModel.dialogcardcomp.viewModel.params.on(
          "productId.valuechange",
          function(obj) {
            if (!$("#refContainerproductId").data("uui.refer").values) {
              return;
            }
            var data = $("#refContainerproductId").data("uui.refer").values[0];
            if (obj.oldValue != obj.newValue) {
              viewModel.dialogcardcomp.viewModel.params.setValue(
                "productCode",
                data.refcode
              );
              viewModel.dialogcardcomp.viewModel.params.setValue(
                "productName",
                data.refname
              );
            }
          }
        );
        viewModel.simpleHeadList.on("autoPlaySpeed.valuechange", function(obj) {
          if (obj.newValue && obj.oldValue != obj.newValue) {
            viewModel.updateBannerHeadData(obj.rowId, obj.newValue);
          }
        });
        $._ajax({
          type: "get",
          url: appCtx + viewModel.baseHeadUrl,
          dataType: "json",
          data: {},
          success: function(data) {
            if (data.content) {
              viewModel.simpleHeadList.setSimpleData(data.content);
            }
          }
        });
        // 选择上传文件后，直接调用上传方法
        $("#fileiptwrap").on("change", "#uploadbatch_id", function() {
          if (this.value) {
            viewModel.onFileUpload();
          }
        });
      }
    });

    return view;
  }
);
