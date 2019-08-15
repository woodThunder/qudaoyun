/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-9-14
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */

function getBrowserVersion() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.match(/msie ([\d.]+)/) != null) {
		//ie6--ie9
		uaMatch = userAgent.match(/msie ([\d.]+)/);
		return "IE" + uaMatch[1];
	} else if (userAgent.match(/(trident)\/([\w.]+)/)) {
		uaMatch = userAgent.match(/trident\/([\w.]+)/);
		switch (uaMatch[1]) {
			case "4.0":
				return "IE8";
				break;
			case "5.0":
				return "IE9";
				break;
			case "6.0":
				return "IE10";
				break;
			case "7.0":
				return "IE11";
				break;
			default:
				return "undefined";
		}
	}
	return "undefined";
}
$(function () {
	var app, viewModel, exponent, modulus, userId;

	viewModel = {
		/*
		 * 数据模型
		 * */
		DataTables: {
			modifyPassword: new u.DataTable({
				meta: {
					newpassword: {
						type: "string",
						nullMsg: "密码不能为空!",
						errorMsg: "密码输入错误",
						placement: "right",
						minLength: 6,
						maxLength: 16,
						tipId: "noId",
						notipFlag: true
						//                      hasSuccess: true,
						//                      required: true
					},
					confirmPassword: {
						type: "string",
						nullMsg: "不能为空!",
						errorMsg: "输入不一致",
						placement: "right",
						minLength: 6,
						maxLength: 16,
						notipFlag: true,
						hasSuccess: true,
						required: true,
						tipId: "tip-red"
						//successId:'tip-success'
					}
				}
			}),
			login: new u.DataTable({
				meta: {
					account: {
						type: "string"
					},
					password: {
						type: "string"
					}
				}
			})
		},
		//是否记住密码，默认否
		isRememberPassword: ko.observable(true),
		//使用本地缓存密码时，密码input框中默认字符串
		USE_LOCALPASS_FLAG: "USE_LOCALPASS_FLAG",
		/*
		 * ajax funs
		 *
		 * */
		ajaxfuns: {
			getLanguageList: function () {
				//TODO 调用接口
				$.ajax({
					url: "../../i18n/classification/list",
					type: 'get',
					data: null,
					dataType: 'JSON',
					contentType: 'application/json',
					cache: false,
					success: function (res) {
						if (res.status == 1) {
							var arr = res.data;
							viewModel.language_source = [];
							for (var i = 0; i < arr.length; i++) {
								var obj = {
									value: arr[i].prelocale == null ? "zh_CN" : arr[i].prelocale.replace(/-/, '_'),
									name: arr[i].pageshow,
									serial: arr[i].serialid,
									isDefault: (arr[i].i18nDefault != null && arr[i].i18nDefault == "1") ? true : false
								}
								viewModel.language_source.push(obj);
							}

							viewModel.initI18n(viewModel.language_source);

							var combo1Obj = document.getElementById('lang_select')['u.Combo'];
							combo1Obj.setComboData(viewModel.language_source);
							var local = u.getCookie('u_locale');
							var languageDa = [{local: local}];
							viewModel.languageDa.setSimpleData(languageDa);
							viewModel.languageDa.on('valueChange', function (event) {
								var newValue = event.newValue;
								// viewModel.setEncryptParam(newValue);
								viewModel.setLocaleParam(newValue);
								// viewModel.initI18n();
							})

						}
					},


				});
			},
			loginAjax: function (parm) {
				if (window.verifyCodeImg) window.clearInterval(window.verifyCodeImg);
				$.ajax({
					url: "../../account/login",
					type: "POST",
					data: parm,
					dataType: "JSON",
					contentType: "application/json",
					cache: false,
					success: function (res) {
						u.hideLoader();
						var message;
						if (res.status === "0") {
							try {
								message = JSON.parse(res.message);
							} catch (e) {
								//                                alert(e.name + ": " + e.message);
								u.showMessage({
									showSeconds: 2,
									width: "32%",
									msg: '<i class="iconfont icon-tishi margin-r-5"></i>' +
										res.message,
									position: "center",
									msgType: "warning"
								});
								return false;
							}
							if (message.status == "50001" || message.status == "50002" || message.status == "50008" || message.status == "50009" || message.status == "50010" || message.status == "50011" || message.status == "50013" || message.status == "50014" || message.status == "50015" || message.status == "50016") {
								viewModel.Events.getVertifyCode();
							}
							if (message.status == "50012") {
								u.showMessage({
									showSeconds: 2,
									width: "32%",
									msg: '<i class="iconfont icon-tishi margin-r-5"></i>' +
										message.msg,
									position: "center",
									msgType: "warning"
								});

								//密码即将过期，修改密码
								u.confirmDialog({
									msg: msg,
									title: "提示",
									onOk: function () {
										viewModel.modifyDefaultpw();
									},
									onCancel: function () {
										window.open("../../index.html", "_self");
									}
								});
							}
							if (
								message.status == "50006" ||
								message.status == "50007" ||
								message.status == "50009" ||
								message.status == "50010" ||
								message.status == "50011"
							) {
								//密码即将过期，修改密码
								//                              u.showMessage({showSeconds: 2, width: "32%", msg: '<i class="iconfont icon-tishi margin-r-5"></i>' + message.msg, position: "center", msgType: "warning"});
								$("#userpassword").addClass("c-red");
								$("#userpassword .tip-txt.c-red").text(message.msg);
								viewModel.modifyDefaultpw();
							}
							$("#usernamebox").addClass("c-red");
							$("#usernamebox .tip-txt.c-red").text(message.msg);
							if (message.status == "50015" || message.status == "50016") {
								$('#verifyCodeBox').addClass("c-red");
								$('#verifyCodeBox .tip-txt.c-red').text(message.msg).attr('title', message.msg);

							} else if (message.status != "50010") {
								$('#userpassword').addClass("c-red");
								$('#userpassword .tip-txt.c-red').text(message.msg).attr('title', message.msg);
							}

							return false;
						}
						if (res.status == "1") {
							u.setCookie('u_locale', 'zh_CN');
							//本地缓存用户最后一次登录成功用户名
							var lastLoginName = localStorage.getItem("lastLoginName");
							var reqData = JSON.parse(this.data);
							var username = reqData.username;
							var password = reqData.password;
							if (lastLoginName == undefined || lastLoginName !== username) {
								localStorage.setItem("lastLoginName", username);
								localStorage.setItem("lastLoginPassword", password);
							}
							//缓存记住密码勾选状态，选中记住密码则本地缓存密码密文，未选则清除缓存的密码密文
							var lastLoginIsRemember = viewModel.isRememberPassword();
							localStorage.setItem("lastLoginIsRemember", lastLoginIsRemember);
							if (lastLoginIsRemember) {
								localStorage.setItem("lastLoginName", username);
								localStorage.setItem("lastLoginPassword", password);
							} else {
								localStorage.removeItem("lastLoginName");
								localStorage.removeItem("lastLoginPassword");
							}
							$.ajax({
								async: false,
								url: "/occ-base/base/channel/customers/find-by-userId?userId=" +
									$.cookie("_A_P_userId"),
								type: "GET",
								success: function (res) {
									localStorage.setItem("_A_P_customer", JSON.stringify(res));
									// 获取是否无货可下单参数
									// localStorage.setItem("_A_P_checkaval", false);
									// $.ajax({
									// 	async: false,
									// 	data: {
									// 		customer: res.id
									// 	},
									// 	url: "/occ-b2b-buyer/buyer/order-common-info/supplier-list",
									// 	type: "GET",
									// 	success: function (supplier) {
									// 		var supplierWay =
									// 			supplier && supplier.map(item => item.id).join();
									// 		$.ajax({
									// 			async: false,
									// 			data: {
									// 				search_IN_organization: supplierWay
									// 			},
									// 			url: "/occ-b2b-order/b2b/order-control-rule",
									// 			type: "GET",
									// 			success: function (CheckAval) {
									// 				var newIscheckAval = [];
									// 				if (
									// 					CheckAval &&
									// 					CheckAval.content &&
									// 					CheckAval.content.length > 0
									// 				) {
									// 					CheckAval.content.forEach(item => {
									// 						if (item.isCheckAval == 0) {
									// 							newIscheckAval.push(item.organizationId);
									// 						}
									// 					});
									// 				}
									// 				localStorage.setItem(
									// 					"_A_P_checkaval",
									// 					newIscheckAval.length > 0 ?
									// 					newIscheckAval :
									// 					CheckAval
									// 				);
									// 			},
									// 			error: function () {
									// 				console.log("提示无货可下单参数");
									// 			}
									// 		});
									// 	},
									// 	error: function () {
									// 		console.log("提示供应商");
									// 	}
									// });
								},
								error: function () {
									console.log("提示绑定用户");
								}
							});
							$.ajax({
								async: false,
								url: "/occ-base/api/base/currency/default",
								type: "GET",
								success: function (res) {
									var currency = {};
									currency.id = res.id;
									currency.code = res.code;
									currency.name = res.name;
									currency.currencySign = res.symbol; // 币符
									currency.currencyPriceScale = res.pricePrecision; // 价格精度
									// currency.currencyAmountScale = res.currencyAmountScale; // 金额精度
									currency.currencyAmountScale = res.amountPrecision; // 金额精度
									localStorage.setItem(
										"_A_P_currency",
										JSON.stringify(currency)
									);
								},
								error: function () {
									console.log("提示没有默认币种");
								}
							});
							$.ajax({
								async: false,
								url: "/occ-base/unit?size=100&page=0&EQ_isEnable=1",
								type: "GET",
								success: function (res) {
									var unit = [];
									if (res && res.content.length > 0) {
										res.content.map(function (item) {
											unit.push({
												unitCode: item.code,
												unitName: item.name,
												unitId: item.id,
												precision: item.precision
											})
										})
									}
									localStorage.setItem("_A_P_unit", JSON.stringify(unit));
								},
								error: function () {
									console.log("提示没有计量单位");
								}
							});

							//成功登陆
							message = res.message;
							window.open("../../index.html", "_self");
						}
					}
				});
			},
			//生成验证码,并显示
			generateVertifyCode: function (parm) {
				var jsonP = JSON.parse(parm)
				//页面显示验证码
				$('#verifyCodeBox').append('<img src="../../open/imgVerificationLoginCode/getCode?login_name=' + $("input[name = 'account']").val() + '&r=' + Math.random() + '" alt="验证码"/>').show();
				$('.login-con').css('height', $('.login-con').height() >= 400 ? $('.login-con').height() : $('.login-con').height() + 80);
				$('#verifyCodeBox').on('click', 'img', function () {
					$('#verifyCodeBox img').remove()
					$('#verifyCodeBox').append('<img src="../../open/imgVerificationLoginCode/getCode?login_name=' + $("input[name = 'account']").val() + '&r=' + Math.random() + '" alt="验证码"/>');
					if (window.verifyCodeImg) window.clearInterval(window.verifyCodeImg);
					window.verifyCodeImg = window.setInterval(function () {
						$('#verifyCodeBox img').remove()
						$('#verifyCodeBox').append('<img src="../../open/imgVerificationLoginCode/getCode?login_name=' + $("input[name = 'account']").val() + '&r=' + Math.random() + '" alt="验证码"/>');
					}, 60000);
				})
				if (window.verifyCodeImg) window.clearInterval(window.verifyCodeImg);
				window.verifyCodeImg = window.setInterval(function () {
					$('#verifyCodeBox img').remove()
					$('#verifyCodeBox').append('<img src="../../open/imgVerificationLoginCode/getCode?login_name=' + $("input[name = 'account']").val() + '&r=' + Math.random() + '" alt="验证码"/>');
				}, 60000);
			}
		},
		/*
		 * 修改默认密码
		 * */
		modifyDefaultpw: function () {
			//第一次登陆，需要修改密码,密码已经过期修改密码
			if (window.checkPwDialg) {
				checkPwDialg.show();
			} else {
				window.checkPwDialg = u.dialog({
					id: "checkPwDialg",
					content: "#dialog_content",
					hasCloseMenu: true
				});
			}
			viewModel.DataTables.modifyPassword.setValue("newpassword", "");
			viewModel.DataTables.modifyPassword.setValue("confirmPassword", "");
		},
		/*
		 * click 事件处理
		 * */
		Events: {
			// 触发记住密码勾选状态， 未选 -> 选中； 选中 -> 未选
			toggleRememberPassword: function () {
				$("#remember").toggleClass("checked");
				if ($("#remember").hasClass("checked")) {
					viewModel.isRememberPassword(true);
				} else {
					viewModel.isRememberPassword(false);
				}
			},
			login: function () {
				var data = {};
				if (viewModel.DataTables.login.getValue("account")) {} else {
					viewModel.DataTables.login.setValue(
						"account",
						$("[name='account']").val()
					);
					viewModel.DataTables.login.setValue(
						"password",
						$("[name='password']").val()
					);
				}
				data.username = viewModel.DataTables.login.getValue("account");
				data.password = viewModel.DataTables.login.getValue("password");
				if (!data.username) {
					//                  u.showMessage({showSeconds: 2, width: "32%", msg: '<i class="iconfont icon-tishi margin-r-5"></i>请填写账户名~', position: "center", msgType: "warning"});
					$("#usernamebox").addClass("c-red");
					return false;
				}
				if (!data.password) {
					//                  u.showMessage({showSeconds: 2, width: "32%", msg: '<i class="iconfont icon-tishi margin-r-5"></i>请填写密码~', position: "center", msgType: "warning"});
					$("#userpassword").addClass("c-red");
					return false;
				}
				if (data.username && data.password) {
					userId = data.username;
					var DEdata = {};
					DEdata.text = data.password || "";
					DEdata.exponent = exponent || "";
					DEdata.modulus = modulus || "";

					// 如果本地缓存有登录密码，且密码input框中字符串是缓存密码标识，则直接使用缓存密码密文
					var lastLoginPassword = localStorage.getItem("lastLoginPassword");
					if (
						lastLoginPassword &&
						data.password === viewModel.USE_LOCALPASS_FLAG
					) {
						data.password = lastLoginPassword;
					} else {
						data.password = u.RSAUtils.encryptedString(DEdata);
					}

					//                  data.password = u.RSAUtils.encryptedString(DEdata);
					viewModel.originPwd = data.password;
					if (!$('#verifyCodeBox').is(':hidden')) {
						if ($('#verifyCode').val()) {
							data.verifyCode = $('#verifyCode').val()
						} else {
							$('#verifyCodeBox').addClass('c-red');
							return false;
						}
					}
					var parm = JSON.stringify(data);
					viewModel.ajaxfuns.loginAjax(parm);

					var opt1 = {
						hasback: false,
						hasDesc: false
					};
					u.showLoader(opt1);
				}
			},
			cancel: function () {
				window.checkPwDialg.close();
			},
			confirm: function () {
				var opt1 = {
					hasback: false,
					hasDesc: false
				};
				var data = {};
				$(".u-msg-ok.btn").removeClass("success");
				data.newpassword = viewModel.DataTables.modifyPassword.getValue(
					"newpassword"
				);
				data.confirmPassword = viewModel.DataTables.modifyPassword.getValue(
					"confirmPassword"
				);
				if (data.newpassword || data.confirmPassword) {
					if (data.newpassword === data.confirmPassword) {
						u.showLoader(opt1);
						var DEdata = {};
						DEdata.text = data.newpassword || "";
						DEdata.exponent = exponent || "";
						DEdata.modulus = modulus || "";
						var newPassword = u.RSAUtils.encryptedString(DEdata);
						var uri = "../../open/modifyPassword";
						$.ajax({
							type: "post",
							dataType: "json",
							url: uri,
							data: JSON.stringify({
								newPassword: newPassword,
								"identification": userId,
								verificationCode: viewModel.originPwd,
								msgtype: "oldpwd"
							}),
							contentType: "application/json",
							success: function (res) {
								if (res.status === 1) {
									var DEdata = {};
									DEdata.text = data.newpassword || "";
									DEdata.exponent = exponent || "";
									DEdata.modulus = modulus || "";
									var parm = JSON.stringify({
										username: userId,
										password: u.RSAUtils.encryptedString(DEdata)
									});

									var wait = 2;
									var get_code_time = function () {
										if (wait == 0) {
											viewModel.ajaxfuns.loginAjax(parm);
											checkPwDialg.close();
										} else {
											$("#dialog_content")
												.find(".u-msg-content")
												.empty()
												.append(
													"<h4>密码修改成功！，" + wait + "S后自动关闭</h4>"
												)
												.addClass("text-center")
												.height(80);
											wait--;
											setTimeout(function () {
												get_code_time();
											}, 1000);
										}
									};
									get_code_time();
									$("#dialog_content")
										.find(".u-msg-content")
										.empty()
										.append("<h4>密码修改成功！，" + 2 + "S后自动关闭</h4>")
										.addClass("text-center")
										.height(80);
									$("#dialog_content")
										.find(".u-msg-footer")
										.hide();
								} else {
									viewModel.DataTables.modifyPassword.setValue(
										"newpassword",
										""
									);
									viewModel.DataTables.modifyPassword.setValue(
										"confirmPassword",
										""
									);
									u.showMessage({
										width: "32%",
										msg: '<i class="iconfont icon-tishi margin-r-5"></i>' +
											res.msg,
										position: "center",
										msgType: "warning"
									});
									//                                    checkPwDialg.close();
								}
							}
						});
					} else {
						viewModel.DataTables.modifyPassword.setValue("newpassword", "");
						viewModel.DataTables.modifyPassword.setValue("confirmPassword", "");
						$("#tip-red").show();
						$("#tip-red").text("两次输入不一致");
						//                      var errorInfo = '<i class="iconfont icon-tishi margin-r-5"></i>两次输入不一致!!!';
						//                      u.showMessage({ width: "32%", msg: errorInfo, position: "center", msgType: "warning"});
					}
				} else {
					//                  var errorInfo = '<i class="iconfont icon-tishi margin-r-5"></i>密码不能为空!!!';
					//                  u.showMessage({ width: "32%", msg: errorInfo, position: "center", msgType: "warning"});
					$("#tip-red").text("密码不能为空");
				}
			},
			//从服务器获取验证码
			getVertifyCode: function() {
				var json = {
					'login_name': $("input[name = 'account']").val(),
					'r': Math.random() //get 请求会有缓存问题, 添加随机数可破解(随机数后台并不需要)
				};
				$.ajax({
					type: 'get',
					dataType: 'json',
					// url: viewModel.vertifyCodeUrl,
					url: "../../open/imgVerificationStatus",
					data: json,
					contentType: 'application/json',
					success: function (res) {
						if (res.data) {
							var obj = viewModel.vertifyObj;
							if (res.data == "true") {
								//显示验证码框
								if(!obj){
									obj={};
								}
								var json = JSON.stringify({'username': obj.user});
								clearInterval(window.verifyCodeImg);
								viewModel.ajaxfuns.generateVertifyCode(json);
							} else {
								// 增加前一个校验验证码, 后一个不需要,做隐藏验证码框的操作
								if (obj.user != "" && obj.user != 'undefined' && obj.user != $("input[name = 'account']").val()) {
									if (obj.isNeedVertify == "true") {
										//隐藏验证码框
										$('#verifyCodeBox').css("display", "none");
										$('.login-con').css('height', $('.login-con').height() - 80);
										clearInterval(window.verifyCodeImg);
									}
								}
							}
							obj.isNeedVertify = res.data;
							obj.hasVertified = true;
							obj.user = $("input[name = 'account']").val();
						}
					}
				});
			}
		},

		/*
		 * 设置加密参数
		 * */
		setEncryptParam: function () {
			//缓存加密参数
			//            exponent = $.cookie("exponent");
			//            modulus = $.cookie("modulus");
			var uri = "../../open/getEncryptParam";
			$.ajax({
				type: "get",
				dataType: "json",
				url: uri,
				data: null,
				contentType: "application/json",
				success: function (res) {
					if (res.status === 1) {
						exponent = res.data.exponent || "";
						modulus = res.data.modulus || "";
						//                        if (!$.cookie("exponent")) {
						//                            var date = new Date();
						//                            date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); //三天后的这个时候过期
						//                            $.cookie("exponent", exponent, { path: '/', expires: date });  //设置3天以后过期
						//                            $.cookie("modulus", modulus, { path: '/', expires: date });
						sessionStorage.setItem("exponent", exponent); //moded by yany 修改为sessionStorage存取
						sessionStorage.setItem("modulus", modulus);
						//$.cookie("exponent", exponent,{ path: '/'});
						//$.cookie("modulus", modulus,{ path: '/'});
						//                        }
					} else {
						u.showMessage({
							showSeconds: 1,
							width: "32%",
							msg: "<i class='uf uf-exclamationsign margin-r-5'></i>" + res.msg,
							position: "center",
							msgType: "warning"
						});
					}
				}
			});
		},
		initI18n : function(settings){
			loginInitI18n(settings);
			//更改logo
			var languageType=getCookie("u_locale");
			if ("en_US"==languageType||"en-US"==languageType){
				$("#logoId").attr("class","logo-img-EN")
			}else if ("zh_TW" == languageType || "zh-TW" == languageType){
				$("#logoId").attr("class","logo-img-TW")
			}else {
				$("#logoId").attr("class","logo-img")
			}
			if(window.getBrowserVersion()=='IE9.0'){
				$(function() {
					$('input, textarea').placeholder();
					$('#verifyCode').val('').focus().blur();
					$('#verifyCode').on('focus',function(){
						$('#verifyCode').val('')
					})
				});
				$('#usernamebox input').focus();
			}
		},

	};
	app = u.createApp({
		el: "body",
		model: viewModel
	});
	if(window.location.href !== window.top.location.href){ //解决登录页嵌套问题
		window.top.location.href=window.location.href ;
	}
	viewModel.setEncryptParam();
	viewModel.DataTables.login.createEmptyRow();
	viewModel.DataTables.modifyPassword.createEmptyRow();
	$("#loginBox").on("keydown", "input", function (e) {
		if (e.keyCode === 13) {
			$("#loginBtn").focus();
		}
	});
	$("#dialog_content").on("keydown", function (e) {
		if (e.keyCode === 13) {
			$("#checkPwDialg button.u-msg-ok").focus();
		}
	});
	$("#loginBox").on("focus", "input", function (e) {
		$(this)
			.closest(".login-item")
			.removeClass()
			.addClass("login-item focus");
	});
	$("#loginBox").on("blur", "input", function (e) {
		var flag = true;
		var value = $(this).val();
		var container = $(this).closest(".login-item");
		container.removeClass().addClass("login-item");
		if (!value) {
			container.addClass("c-orange");
		}
		$(".login-item .ipt").each(function () {
			if (!$(this).val()) {
				flag = false;
			} else {
				$(this)
					.closest(".login-item")
					.addClass("c-green")
					.removeClass("c-orange c-red");
			}
		});
		if (flag) {
			$("#loginBox .login-btn").addClass("success");
		} else {
			$("#loginBox .login-btn").removeClass("success");
		}
	});
	$("#loginBtn").click(function () {
		$(".login-item").removeClass("c-green c-orange");
	});

	//修改密码
	$("#dialog_content").on("focus", "input", function (e) {
		$(this)
			.closest(".ipt-item")
			.addClass("focus");
	});
	$("#dialog_content").on("blur", "input", function (e) {
		var flag = true;
		var value = $(this).val();
		$(this)
			.closest(".ipt-item")
			.removeClass("focus");
		$(".ipt-item .ipt").each(function () {
			if (!$(this).val()) {
				flag = false;
			}
		});
		if (flag) {
			$(".u-msg-ok.btn").addClass("success");
		} else {
			$(".u-msg-ok.btn").removeClass("success");
		}
	});

	//本地缓存有最后一次登录用户名，则使用
	var lastLoginName = localStorage.getItem("lastLoginName");
	if (lastLoginName != undefined) {
		viewModel.DataTables.login.getFocusRow().setValue("account", lastLoginName);
	}
	// 本地缓存有最后一次登录密码，则使用本地缓存标识字符串作为密码（用作标识功能，最终提交到后台的是缓存的密码密文）
	var lastLoginPassword = localStorage.getItem("lastLoginPassword");
	if (lastLoginPassword != undefined) {
		viewModel.DataTables.login
			.getFocusRow()
			.setValue("password", viewModel.USE_LOCALPASS_FLAG);
		$("[name=password]").focus();
		$("[name=password]").blur();
	}
	// 使用缓存的记住密码勾选状态
	var lastLoginIsRemember = localStorage.getItem("lastLoginIsRemember");
	if (lastLoginIsRemember != undefined) {
		var booleanValue = lastLoginIsRemember === "true" ? true : false;
		viewModel.isRememberPassword(booleanValue);
	}
	//监听用户名变化，如果用户名变为记住了密码的用户，则补全密码，如果变为没记住密码的用户，则清空密码
	viewModel.DataTables.login.on("account.valueChange", function (obj) {
		var newValue = obj.newValue;
		var lastLoginName = localStorage.getItem("lastLoginName");
		var lastLoginPassword = localStorage.getItem("lastLoginPassword");
		if (newValue == lastLoginName && lastLoginPassword != undefined) {
			viewModel.DataTables.login
				.getFocusRow()
				.setValue("password", viewModel.USE_LOCALPASS_FLAG);
		} else {
			viewModel.DataTables.login.getFocusRow().setValue("password", "");
			$("#userpassword").removeClass("c-green");
		}
	});


	$("input[name = 'account']").on('blur', viewModel.Events.getVertifyCode);

	//有默认用户(缓存用户)时
	if ($("input[name = 'account']").val()) {
		viewModel.vertifyObj = {}
		viewModel.vertifyObj.user = $("input[name = 'account']").val();
		viewModel.Events.getVertifyCode();
	}
});

if (getBrowserVersion() == "IE7.0") {
	$("#loginBtn").click(function () {
		alert("升级您的浏览器后，在来吧！！~！");
	});
}