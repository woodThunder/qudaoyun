define([
    "text!./picture.html",
    "ocm_common",
    "ocm_baseview",
    "./meta.js",
    "ajaxfileupload",
    "ossupload",
    "interfaceFileImpl"
], function (tpl, common, baseview, model) {
    "use strict";
    var viewModel, fileDialog, picBigDialog;
    var view = baseview.extend({
        beforeCreate: function () {
            viewModel = this.viewModel;
        },
		tpl: tpl,
		model: model,
		baseData : {
			baseurl : '/base/pictures',
			PictureList: new u.DataTable(model.options.metas.Picturemeta),
			PictureCategory: new u.DataTable(model.options.metas.PictureCategoryMeta),
            searchcomp: {},
            searchSource: model.options.searchs.search1,
			button1Source: model.options.buttons.button1,
			button2Source: model.options.buttons.button2,
			statusSource: [{
                value: "2",
                name: "已停用"
            },{
                value: "1",
                name: "已启用"
            }, {
                value: "0",
                name: "未启用"
            }],
			grid1Option: model.options.grids.grid1,
	    },
		rendertype: {
			//判断表格里的状态
            //启用状态
            isEnableGrid: function (obj) {
                var stateValue = viewModel.PictureList.getRow(obj.rowIndex).getValue("isEnable");
                var stateName;
                stateValue == 1 ? (stateName = "已启用") : ((stateValue == 2) ? (stateName = "已停用") : (stateName = "未启用"));
                obj.element.innerHTML = stateName;
            },
			picShow: function (obj) {
                // var pictureUrl = viewModel.PictureList.getRow(obj.rowIndex).getValue("fileUrl");
                var pictureUrl = location.origin+obj.row.value.fileUrl;
                var prodUrl = "";
                if (pictureUrl) {
                    //特殊字符\  .  替换
                    var prodUrl = pictureUrl.replace(/\./g, "spot").replace(/\//g, "linePath").replace(/\-/g, "lineThrough");
                    obj.element.innerHTML = "<img width=\"30\" height=\"30\" src=" + pictureUrl + " data-bind=\"click: picBig.bind($data," + "'" + prodUrl + "'" + ")\">";
                }
                ko.cleanNode(obj.element);
                ko.applyBindings(viewModel, obj.element);
            },
			operation:function(obj){
			  var delfun = "data-bind=click:del.bind($data," + obj.rowIndex + ")";
			  var editfun = "data-bind=click:beforeEdit.bind($data," + obj.rowIndex + ")";
			  obj.element.innerHTML = '<div class="ui-handle-icon">'+
			  '<span class="ui-handle ui-tab-icon-b">'+
			  '<a href="#" class="uifont icon-edit font-c-c" '+
			  editfun +
			  ' title="编辑"></a>'+
			  '</span>    '+
			  '<span class="ui-handle ui-tab-icon-b">'+
			  '<a href="#" class="uifont icon-shanchu1 font-c-c" '+
			  delfun +
			  ' title="删除"></a>'+
			  '</span></div>';
			  ko.cleanNode(obj.element);
			  ko.applyBindings(viewModel, obj.element);
			}
  		},
		events: {
      //弹出卡片编辑窗(通过index区分是编辑还是新增，-1为新增，大于等于0为编辑)
			beforeEdit: function(index,rowId) {
				var title;viewModel.index = index;
				if (index >= 0) {
					//修改操作
					title = "编辑";
					var currentData = viewModel.PictureList.getRowByRowId(rowId).getSimpleData();
					viewModel.rowId = rowId;
					singledoceidt.seteidtData(currentData);
				}else {
					title = "新增"
					//清空编辑框的信息
					singledoceidt.cleareidt();
				}
				//显示模态框
				singledoceidt.show(title,"900px",viewModel.edit);
			},
			//上传弹框调用
            showFileDialog: function () {
                viewModel.pk = viewModel.generateMixed();
                var pk = viewModel.pk;
                viewModel.fileQueryCustomer();
                if (!fileDialog) {
                    fileDialog = u.dialog({
                        content: "#file-dialog",
                        hasCloseMenu: true
                    });
                } else {
                    fileDialog.show();
                }
            },
            uploadPic: function () {
				// var pictureCategoryId = viewModel.PictureCategory.getSimpleData()[0].pictureCategoryId;
				// if(pictureCategoryId) {
					$("#uploadbatch_id").val(undefined);
					$("#uploadbatch_id").trigger("click");
				// } else {
				// 	toastr.warning("请先选择图片分类");
				// }
            },

			saveList: function() {
				$._ajax({
					url: appCtx + viewModel.baseurl + '/batch-save',
					type: "post",
					data: JSON.stringify(viewModel.PictureList.getSimpleData()),
					contentType: "application/json; charset=utf-8",
					success: function (data) {
						toastr.success("保存成功");
					}
				})
			},
            //上传附件
            onFileUploadCustomer: function () {
                var fileNum = $("#uploadbatch_id")[0].files.length;
                var fileSize = 0;
                var fileSizeMb = 0;
                var fileTypeArr = [];
	            var filenames = [];
                var allowType = ".jpg,.bmp,.gif,.png,.jpeg";
                var fileSizeSum = (function () {
                    for (var i = 0; i < fileNum; i++) {
                        fileSize += $("#uploadbatch_id")[0].files[i].size;
                        var fileName = $("#uploadbatch_id")[0].files[i].name;
                        var fileType = fileName
                            .substr(fileName.lastIndexOf("."))
                            .toLowerCase();
                        fileTypeArr.push(fileType);
	                    filenames.push(fileName.replace(fileType, ''));
                    }
                    fileSizeMb = fileSize / 1024 / 1024;
                    return fileSizeMb;
                })();
                for (var i = 0; i < fileTypeArr.length; i++) {
                    if (allowType.indexOf(fileTypeArr[i]) === -1) {
                        toastr.warning("仅支持" + allowType + "格式文件");
                        return false;
                    }
                }
	            if (fileSizeSum <= 500) {
		            $.ajax({
			            type:'get',
			            async: false,
			            url: '/occ-base/base/pictures?search_IN_name=' + filenames.splice(','),
			            success: function(data) {
				            if(data && data.content && data.content.length>0) {
					            var repeatPicIds = [];
					            for(var i = 0; i < data.content.length; ++i) {
						            repeatPicIds.push(data.content[i].id);
					            }
					            common.dialog.confirmDialog({
						            msg1: "相同名称图片已经存在，继续将覆盖原图片，是否继续？",
						            msg2: filenames.splice(','),
						            width: "400px",
						            type: "warn",
						            onOk: function () {
							            viewModel.doFileDelete(repeatPicIds);
							            viewModel.doupload();
						            }
					            });
				            } else {
					            viewModel.doupload();
				            }
			            }
		            });
	            } else {
		            toastr.warning("图片总和不能超过500MB");
		            return false;
	            }
            },

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
				f.filesystem_upload(par, viewModel.fileUploadCallbackCustomer);
			},
            //上传文件回传信息
            fileUploadCallbackCustomer: function (data) {
                if (1 == data.status) {
                    //上传成功状态
					var pictureCategoryId;
					var pictureCategoryName = $("#pictureCategoryIdForUp").val();
					if(viewModel.PictureCategory.getSimpleData().length > 0) {
						pictureCategoryId = viewModel.PictureCategory.getSimpleData()[0].pictureCategoryId;
					}
					var fileArr = [];
					for(var i = 0; i < data.data.length; ++i) {
						var fileObj = {};
						var uploadTime = new Date();
						fileObj.name = data.data[i].filename.substring(0,data.data[i].filename.lastIndexOf((".")));
                        fileObj.code = "code0001";
                        fileObj.isEnable = 0;
						fileObj.fileUrl = data.data[i].url;
						fileObj.persistStatus = "new";
						fileObj.pictureCategoryId = pictureCategoryId;
						fileObj.pictureCategoryName = pictureCategoryId;
						fileObj.uploadTime = uploadTime;
						fileArr.push(fileObj);
                    }
                    $._ajax({
                        url:appCtx + viewModel.baseurl + '/batch-save',
                        type:"post",
                        contentType: "application/json; charset=utf-8",
						dataType: "json",
                        data:JSON.stringify(fileArr),
                        success:function(data){
							viewModel.search();
                        }
                    });
                    //  toastr.success();
                } else {
                    //error 或者加載js錯誤
                    toastr.error(data.message);
                }
            },
			picBig: function (url) {
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

			//上一张下一张
            prev: function () {
                var current = $("#picBig").attr("src");
                for (var i = 0; i < viewModel.picArr.length; i++) {
                    if (viewModel.picArr[i] == current) {
                        if (viewModel.picArr[i - 1]) {
                            $("#picBig").attr("src", viewModel.picArr[i - 1]);
                        } else {
                            $("#imgTip")
                                .html("已经是第一张了")
                                .show()
                                .fadeOut(5000);
                        }
                    }
                }
            },
            next: function () {
                var current = $("#picBig").attr("src");
                for (var i = 0; i < viewModel.picArr.length; i++) {
                    if (viewModel.picArr[i] == current) {
                        if (viewModel.picArr[i + 1]) {
                            $("#picBig").attr("src", viewModel.picArr[i + 1]);
                        } else {
                            $("#imgTip")
                                .html("已经是最后一张了")
                                .show()
                                .fadeOut(5000);
                        }
                    }
                }
            },
			  //删除和批量删除
			del: function (data,rowId) {
				if (typeof(data) == 'number') {
					viewModel.PictureList.setRowSelectbyRowId(rowId);
				}
				var ids = [];
				var rows = viewModel.PictureList.getSelectedRows();
				var isEnable=[];
				var isEnabletip="";
				if(rows&&rows.length>0){
					for(var i = 0;i<rows.length;i++){
						ids.push(rows[i].getValue("id"));
						ids.push(rows[i].getValue("id"));
						var isEnableCode=rows[i].getValue("isEnable");
						if(isEnableCode==1 || isEnableCode=="1"){
							isEnable.push(rows[i].getValue("code"));
						}
					}
					common.dialog.confirmDialog({
						msg1: '确认删除这些项？',
						msg2: '此操作不可逆',
						width: '400px',
						type: 'error',
						onOk: function () {
							viewModel.doFileDelete(ids);
						}
					});
				}
				else{
					toastr.warning("请先选择需要删除数据");
				}
			},
			doFileDelete: function(ids) {
				$._ajax({
					url:appCtx + viewModel.baseurl + "/delete",
					type:"post",
					async: false,
					data:{
						ids:ids.join(",")
					},
					success:function(){
						toastr.success("删除成功");
						viewModel.search();
					}
				});
			},
				//启用
			enable: function() {
				var selectedRows = viewModel.PictureList.getSelectedRows();
				var ids = [];
				if (selectedRows&&selectedRows.length>0){
					for(var i=0;i<selectedRows.length;i++) {
						ids.push(selectedRows[i].getValue("id"));
					}
					ids = ids.join(",");
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-enable",
						data: {ids: ids},
						success:function(res){
							for(var i=0;i<selectedRows.length;i++) {
								selectedRows[i].setValue("isEnable", "1");
							}
							toastr.success("启用成功");
						}
					})
				}
				else {
					toastr.warning("请先选择需要启用数据");
				}
			},

			//停用
			disable: function() {
				var selectedRows = viewModel.PictureList.getSelectedRows();
				var ids = [];
				var isEnable=[];
				var isEnabletip="";
				if (selectedRows&&selectedRows.length>0){
					for(var i=0;i<selectedRows.length;i++) {
						ids.push(selectedRows[i].getValue("id"));
					}
					ids = ids.join(",");
					$._ajax({
						type: "post",
						url: appCtx + viewModel.baseurl + "/batch-disable",
						data: {ids: ids},
						success:function(res){
							for(var i=0;i<selectedRows.length;i++) {
								selectedRows[i].setValue("isEnable", "2");
							}
							toastr.success("停用成功");
						}
					})
				}
				else {
					toastr.warning("请先选择需要停用数据")
				}
			},

			//匹配商品
			match : function () {
                $._ajax({
                    type: "post",
                    url: appCtx + viewModel.baseurl + "/match",
                    success:function(res){
                        toastr.success("自动匹配成功");
                        viewModel.search();
                    }
                })
            },
			//根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
			search: function (reindex) {
				if(reindex){
					viewModel.PictureList.pageIndex(0);
				}
				viewModel.PictureList.removeAllRows();
				var queryData = viewModel.searchcomp.getDataWithOpr();
				queryData.size = viewModel.PictureList.pageSize();
				queryData.page = viewModel.PictureList.pageIndex();
				$._ajax({
					type:"get",
					url:appCtx + viewModel.baseurl,
					dataType:"json",
					data:queryData,
					success:function(data){
						viewModel.PictureList.setSimpleData(data.content,{unSelect:true});
						viewModel.PictureList.totalRow(data.totalElements);
						viewModel.PictureList.totalPages(data.totalPages);
					}
				})
			},
			//清空搜索条件
			cleanSearch: function () {
				viewModel.searchcomp.clearSearch();
			},
			//页码改变时的回调函数
			pageChange: function (index) {
				viewModel.PictureList.pageIndex(index);
				viewModel.search();
			},
			//页码改变时的回调函数
			sizeChange: function (size) {
				viewModel.PictureList.pageSize(size);
				viewModel.search(true);
			}
		},
		afterCreate: function() {
            // 选择上传文件后，直接调用上传方法
            $("#fileiptwrap").on("change", "#uploadbatch_id", function () {
                if (this.value) {
                    viewModel.onFileUploadCustomer();
                }
            });
			//增加空行
			viewModel.PictureCategory.createEmptyRow();
		}
	});
	return view;
});
