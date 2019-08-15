define(["toast"], function (toast) {
	/**统一设置ajax的参数信息，发送信息前加载 loading 图标，请求完成后去掉 loading进度条图片 */
	$(function () {
		$.ajaxSetup({
			beforeSend: function (xhr) {
				var centerContent = '<div class="ant-spin ant-spin-lg ant-spin-spinning"><span class="ant-spin-dot"><i></i><i></i><i></i><i></i></span></div>';
				var opt1 = {
					hasback: false,
					hasDesc: false, //是否含有加载内容描述
					centerContent: centerContent
				};
				// 解决grid中参照第一次点击不显示问题，触发blur后不触发click
				setTimeout(function () {
					u.showLoader(opt1);
				}, 0)
			},
			complete: function (xhr, status) {
				setTimeout("u.hideLoader({hasback:true});", 200);
			},
			error: errorHandle
		});
		// 项目内部都使用_ajax发送请求-------------------
		var _ajax = $.ajax;
		// 重写jquery的ajax方法
		$._ajax = function (opt) {
			if (opt && opt.data && location.hash) {
				if (typeof opt.data === 'string') {
					if (opt.data.indexOf('=') >= 0) {
						var optDatas = {};
						var datas = opt.data.split('&');
						for (var i = 0; i < datas.length; i++) {
							var key = datas[i].split('=')[0];
							var value = datas[i].split('=')[1];
							optDatas[key] = value;
						}
						optDatas['search_AUTH_APPCODE'] =
							location.hash.split('/')[location.hash.split('/').length - 1].replace('?modulefrom=sidebar', '');
						opt.data = optDatas;
					} else {
						JSON.parse(opt.data) && (JSON.parse(opt.data)['search_AUTH_APPCODE'] =
							location.hash.split('/')[location.hash.split('/').length - 1]).replace('?modulefrom=sidebar', '');
					}
				} else if (typeof opt.data === "object") {
					opt.data['search_AUTH_APPCODE'] = location.hash.split('/')[location.hash.split('/').length - 1].replace('?modulefrom=sidebar', '');
				}
			}
			// 备份opt中error和success方法
			var fn = {
				error: function (XMLHttpRequest, textStatus, errorThrown) { },
				success: function (data, textStatus) { }
			};
			if (opt.error) {
				fn.error = opt.error;
			}
			if (opt.success) {
				fn.success = opt.success;
			}
			// 扩展增强处理
			var _opt = $.extend(opt, {
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					if (this.dataType == "script") {
						fn.error(XMLHttpRequest, textStatus);
						return;
					}
					var info = '';
					// 过滤statusText 为 abort 的错误返回
					if (XMLHttpRequest.statusText === "abort") {
						fn.error(XMLHttpRequest, textStatus);
						return;
					}
					if (XMLHttpRequest.readyState === 0) {
						info = '请求超时' + XMLHttpRequest.responseText;
					} else {
						if (XMLHttpRequest.status === 306) {
							if (XMLHttpRequest.responseText.indexOf("auth check error") > -1) {
								info = "当前用户会话已过期，请重新登录";
							} else {
								info = "当前用户未分配相应权限,请联系管理员处理";
							}
						} else if (XMLHttpRequest.status === 500) {
							// 此处判断dataType是否为json,并且message存在则提示信息
							if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.message) {
								info = XMLHttpRequest.responseJSON.message;
							} else {
								info = XMLHttpRequest.responseText;
							}
						} else if (XMLHttpRequest.status === 200) {
							console.error('请求异常，请检查。' + XMLHttpRequest.responseText);
							fn.error(XMLHttpRequest, textStatus);
							return;
						} else {
							info = '请求异常，请检查。' + XMLHttpRequest.responseText;
						}
					}
					toastr.error(info);
					fn.error(XMLHttpRequest, textStatus);
				},
				success: function (data, textStatus, response) {
					if ((data && data.success === "fail_global" && data.message) || response.status != 200) {
						toastr.error(data.message);
						fn.error(data, textStatus, response);
					} else {
						fn.success(data, textStatus, response);
					}
				},

			});
			_ajax(_opt);
		};

		function errorHandle(XMLHttpRequest, textStatus, errorThrown) {
			if (this.dataType == "script") {
				return;
			}
			var info = '';
			// 过滤statusText 为 abort 的错误返回
			if (XMLHttpRequest.statusText === "abort") {
				return;
			}
			if (XMLHttpRequest.readyState === 0) {
				info = '请求超时' + XMLHttpRequest.responseText;
			} else {
				if (XMLHttpRequest.status === 306) {
					if (XMLHttpRequest.responseText.indexOf("auth check error") > -1) {
						info = "当前用户会话已过期，请重新登录";
					} else {
						info = "当前用户未分配相应权限,请联系管理员处理";
					}
				} else if (XMLHttpRequest.status === 500) {
					// 此处判断dataType是否为json,并且message存在则提示信息
					if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.message) {
						info = XMLHttpRequest.responseJSON.message;
					} else {
						info = XMLHttpRequest.responseText;
					}
				} else if (XMLHttpRequest.status === 200) {
					console.error('请求异常，请检查。' + XMLHttpRequest.responseText);
					return;
				} else {
					info = '请求异常，请检查。' + XMLHttpRequest.responseText;
				}
			}
			toastr.error(info);
		}

		/*toastr组件*/
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"progressBar": false,
			"preventDuplicates": false,
			"positionClass": "toast-top-full-width",
			"onclick": null,
			"showDuration": "400",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "3000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut",
			"target": '#content'
		}
		var oldSuccess = toastr.success;
		toastr.success = function (message, title, optionsOverride) {
			if (!message) message = "操作成功";
			oldSuccess.call(this, message, title, optionsOverride);
		}
		var oldError = toastr.error;
		toastr.error = function (message, title, optionsOverride) {
			if (!message) message = "操作失败";
			oldError.call(this, message, title, optionsOverride);
		}

		$.confirmDialog = function (option) {
			var icon = option.type == "error" ? "uifont icon-tubiao-shibai font-c-red" : "uifont icon-tubiao-jingshi font-c-yellow";
			if (option.icon) {
				icon = option.icon;
			}
			if ($(".u-msg-dialog-top-visible").is(":visible")) return;
			var confirmDialogTemplate = '<div class="u-msg-dialog-top u-msg-dialog-top-visible" id="{id}_top">' +
				'<div class="u-msg-dialog ui-msg-dialog" style="{width}{height}{top}">' +
				'<div class="u-msg-dialog-content">' +
				'<div class="u-msg-content">' +
				'</div>' +
				'<div class="u-msg-footer">' +
				'<a class="u-msg-cancel ui-btn ui-btn-primary">{cancelText}</a><a class="u-msg-ok ui-btn ui-btn-green margin-right-5">{okText}</a></div>' +
				'</div>' +
				'</div></div>';
			var content = '<div class="ui-msgdialog-box">' +
				'<div class="ui-msgdialog-innerbox">' +
				'<i class="ui-msgdialog-icon ' + icon + '"></i>' +
				'</div>' +
				'<div class="ui-msgdialog-innerbox">' +
				'<p class="ui-msgdialog-msg-main">' + option.msg1 + '</p>' +
				'<p class="ui-msgdialog-msg-assist">' + option.msg2 + '</p>' +
				'</div>' +
				'</div> ';
			u.confirmDialog({
				msg: content,
				template: confirmDialogTemplate,
				title: option.title,
				width: option.width,
				onOk: option.onOk
			});
		}

		// 使用CSS3动画库方法
		$.fn.extend({
			animateCss: function (animationName) {
				var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				this.addClass('animated ' + animationName).one(animationEnd, function () {
					$(this).removeClass('animated ' + animationName);
				});
			}
		});


	});

});