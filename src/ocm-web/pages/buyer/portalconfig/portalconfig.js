define(
  [
    "text!./portalconfig.html",
    "ocm_common",
    "./webuploader.js",
    "ocm_kindeditor",
    "./meta.js",
    "ocm_global",
    "css!./portalconfig.css",
    "css!./webuploader.css"
  ],
  function(tpl, common, WebUploader) {
    "use strict";
    var app, baseData, events, rendertype, viewModel, editor, delHotlines;
    baseData = {
      baseUrl: "/buyer/portalConfig",
      portalConfigList: new u.DataTable(portalmeta),
      hotlineList: new u.DataTable(hotlineMeta)
    };
    rendertype = {};
    events = {
      //获取采购门户配置信息
      addHotline: function() {
        //在末尾插入行
        viewModel.hotlineList.insertRow(viewModel.hotlineList.rows().length);
        //viewModel.hotlineList.createEmptyRow();
      },
      removeHotline: function(index, row) {
        viewModel.hotlineList.removeRow(row);
        var hotlines = viewModel.hotlineList.getSimpleData();
        for (var i in hotlines) {
          if (hotlines[i].persistStatus == "fdel") {
            delHotlines.push(hotlines[i]);
            hotlines.splice(i, 1);
          }
        }
        viewModel.hotlineList.setSimpleData(hotlines);
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
      //获取门户设置信息
      getPortalConfigInfo: function() {
        delHotlines = [];
        $.ajax({
          type: "get",
          dataType: "json",
          url: appCtx + viewModel.baseUrl,
          data: null,
          contentType: "application/json",
          success: function(res) {
            if (res.content) {
              var content = res.content.length > 0 ? res.content : [{}];
              viewModel.portalConfigList.setSimpleData(content);
              viewModel.hotlineList.setSimpleData(content[0].hotlines || null);
              var contentHtml = viewModel.escapeChars(
                content[0].description || ""
              );
              if (editor) {
                editor.html(contentHtml);
              } else {
                $("#helpEditor").append(contentHtml);
              }
            } else {
              alert(res.msg);
            }
          }
        });
      },
      //保存门户设置信息
      savePortalConfigInfo: function() {
        var editsaveData = viewModel.portalConfigList.getSimpleData()[0];
        var hotlines = viewModel.hotlineList.getSimpleData() || [];
        hotlines = hotlines.concat(delHotlines);
        editsaveData.hotlines = hotlines;
        editsaveData.description = editor.html();
        var type = "put";
        if (!editsaveData.id) {
          type = "post";
          editsaveData.persistStatus = "new";
        }
        $.ajax({
          type: type,
          dataType: "json",
          url: appCtx + viewModel.baseUrl,
          data: JSON.stringify(editsaveData),
          contentType: "application/json",
          success: function(res) {
            if (!res.msg) {
              toastr.success("保存成功！");
            } else {
              toastr.error(res.msg ? res.msg : "数据设置错误~~");
            }
          }
        });
      },
      uploadimg: {
        init: function(pickId, $ele, field) {
          // 初始化Web Uploader
          var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: true,
            // swf:
            //   viewModel.baseUrl +
            //   "/vendor/trd/upload/Uploader.swf?v=" +
            //   Math.random(),
            server: "/wbalone/userMGT/fastDfs/imgUpload",
            chunked: false,
            chunkSize: 512 * 1024,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: pickId,
            fileNumLimit: 1,
            fileSizeLimit: 1024 * 1024,
            // 只允许选择图片文件。
            accept: {
              title: "Images",
              extensions: "gif,jpg,png",
              mimeTypes: "image/*"
            }
          });

          // 当有文件添加进来的时候
          uploader.on("fileQueued", function(file) {
            // 创建缩略图
            var $img = $ele;
            uploader.makeThumb(
              file,
              function(error, src) {
                if (error) {
                  $img.replaceWith("<span>不能预览</span>");
                  return;
                }
                //                        console.log(src);
                $img.attr("src", src);
              },
              100,
              100
            );
          });
          // 文件上传过程中创建进度条实时显示。
          uploader.on("uploadProgress", function(file, percentage) {
            var $li = $(".upload-tip"),
              $percent = $li.find("span");
            // 避免重复创建
            if (!$percent.length) {
              $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find("span");
            }

            $percent.css("width", percentage * 100 + "%");
          });

          // 文件上传成功，给item添加成功class, 用样式标记上传成功。
          uploader.on("uploadSuccess", function(file, res) {
            if (res.status === 1) {
              var fileName = "/" + res.data.fileName;
              viewModel.portalConfigList.setValue(field, fileName);
            }
            $(".upload-tip")
              .find("span")
              .text(res.msg);
            setTimeout(function() {
              $(".upload-tip").hide();
            }, 2000);
            /* $('#' + file.id).addClass('upload-state-done');*/
          });

          // 文件上传失败，显示上传出错。
          uploader.on("uploadError", function(file, res) {
            $(".upload-tip")
              .find("span")
              .text(res.msg);
            setTimeout(function() {
              $(".upload-tip").hide();
            }, 2000);
          });
          uploader.on("error", function(type) {
            console.log(">>>>>error:" + type);
          });
          // 完成上传完了，成功或者失败，先删除进度条。
          uploader.on("uploadComplete", function(file) {
            $(".upload-tip").hide();
            uploader.reset();
          });
        }
      }
    };
    viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

    function appInit(element, params) {
      //将模板页渲染到页面上
      element.innerHTML = tpl;
      ko.cleanNode(element);
      //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
      app = u.createApp({
        el: element,
        model: viewModel
      });

      //文件上传
      viewModel.uploadimg.init("#logoFilePicker", $("#logo-img"), "logoUrl");
      viewModel.uploadimg.init("#iosFilePicker", $("#ios-img"), "iosCodeUrl");
      viewModel.uploadimg.init(
        "#androidFilePicker",
        $("#android-img"),
        "androidCodeUrl"
      );
      viewModel.getPortalConfigInfo();
      editor = KindEditor.create("#helpEditor", {
        //uploadJson: "/wbalone/userMGT/fastDfs/imgUpload" //上传
        uploadJson: "/iuap-saas-filesystem-service/file/upload"
        //fileManagerJson: '/wbalone/userMGT/fastDfs/imgUpload',//文件空间
        //allowFileManager: true
      });
    }

    function init(element, params) {
      appInit(element, params);
    }

    return {
      init: init
    };
  }
);
