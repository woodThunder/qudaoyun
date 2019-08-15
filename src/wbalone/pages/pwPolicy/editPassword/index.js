/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-8-22
 * Time: 下午3:04
 * To change this template use File | Settings | File Templates.
 */
define(function(require, module, exports) {

    var html = require('text!./index.html');
    require('css!./index.css');
	require('i18n');
    var dialogmin = require('dialogmin');

    var cookieOperation = require('cookieOperation');
    var userId = cookieOperation.get('_A_P_userId');
    var userCode = cookieOperation.get('_A_P_userLoginName');

    var viewModel = {
		initI18n: function(){
            initI18n();
        },
        step: ko.observable(),
        valiCode: ko.observable(),
        phone: ko.observable(''),
        errmsg: ko.observable(''),

        sendBtntext: ko.observable($.i18n.prop('js.pag.edi.0001')),
        sendBtnable: ko.observable(true),

        oldpsd: ko.observable(''),
        newpsd: ko.observable(''),
        confirmnewpsd: ko.observable(''),
        passwordruler: ko.observable(''),

        /**
         * 加载用X信息
         */
        getValidationPhone: function() {
            var uri = window.baseUrl + '/userMGT/getValidationPhone';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                contentType: 'application/json',
                success: function(res) {
                    if (res.status === 1) {
                        var user = res.data;
                        userId = user.userId;
                        viewModel.phone(user.phone);
                    } else {
                        alert(res.msg);
                    }
                }
            });

        },
        /**
         * 获取密码策略规则
         */
        getPassWordRuler: function() {
            var uri = window.baseUrl + '/open/getPolicy/' + userCode;
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                contentType: 'application/json',
                success: function(res) {
                    if (res.status === 1) {
                        viewModel.passwordruler(res.data);
                    } else {
                        alert(res.msg);
                    }
                }
            });

        },
        /*
         click event   //发送短信验证码
         */
        sendMsg: function() {
            var p = viewModel.phone();
            if (p) {
                var wait = 60;
                var get_code_time = function() {
                    if (wait == 0) {
                        viewModel.sendBtntext($.i18n.prop('js.pag.edi.0001'));
                        viewModel.sendBtnable(true);
                        $("#msgValiCode").hide().html('');
                        wait = 60;
                    } else {
                        viewModel.sendBtntext("(" + wait + $.i18n.prop('js.pag.edi.0002'));
                        viewModel.sendBtnable(false);
                        wait--;
                        setTimeout(function() {
                            get_code_time()
                        }, 1000)
                    }
                };
                var uri = window.baseUrl + '/open/verify/sendSMS/' + userId;
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: null,
                    contentType: 'application/json',
                    success: function(res) {
                        if (res.status === 1) {
                            get_code_time();
                            //todo  for testUI page
                            viewModel.valiCode(res.data.random);
                        } else {
                            viewModel.errmsg(res.msg);
                        }
                    }
                });
            } else {
                viewModel.errmsg($.i18n.prop('js.pag.edi.0003'));
            }
        },
        /*
         click event   //验证短信验证码
         */
        nextStep: function() {
            //todo ajax
            var valiCode = viewModel.valiCode();
            if (valiCode && /^\d{6}$/.test(valiCode)) {
                var uri = window.baseUrl + '/open/verify/checkSMS/' + userId + "/" + valiCode;
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: null,
                    contentType: 'application/json',
                    success: function(res) {
                        if (res.status === 1) {
                            viewModel.step(false);
                        } else {
                            $("#msgValiCode").show().html(res.msg);
                        }
                    }
                });
            } else {
                $("#msgValiCode").show().html($.i18n.prop('js.pag.edi.0004'));
            }
        },

        /*
         click event   //保存新密码
         */
        editFinish: function() { // TODO: WJP
            $("input").removeClass("warnsigninput");
            $(".warnsign").addClass("hide");


            // if (viewModel.newpsd().length < 6) {
            //     //u.showMessage({showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>至少输入6个字符", position: "center", msgType: "warning"});
            //     $('.newpass').find("input").addClass("warnsigninput");
            //     $('.newpass').find(".warnsign").removeClass("hide");
            //     viewModel.confirmnewpsd('');
            //     viewModel.newpsd('');
            //     return false;
            // }

            if (viewModel.newpsd() != viewModel.confirmnewpsd()) {
                //u.showMessage({showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>两次输入不一致", position: "center", msgType: "warning"});
                $('.comfirmpass').find("input").addClass("warnsigninput");
                $('.comfirmpass').find(".warnsign").removeClass("hide");
                viewModel.confirmnewpsd('');
                return false;
            }
            if (viewModel.oldpsd() == viewModel.newpsd()) {
                alert($.i18n.prop('js.pag.edi.0005'));
                viewModel.confirmnewpsd('');
                viewModel.newpsd('');
                return false;
            }

            var DEdata = {};
            DEdata.text = viewModel.confirmnewpsd() || '';

            //var exponent = $.cookie('exponent');
            //var modulus = $.cookie('modulus');
            if (!sessionStorage.getItem('exponent')) {
                u.showMessage({ showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>出现异常，请重试', position: "center", msgType: "error" });
                return false;
            }
            var exponent = sessionStorage.getItem('exponent'); //moded by yany 修改为sessionStorage存取
            var modulus = sessionStorage.getItem('modulus');

            DEdata.exponent = exponent || '';
            DEdata.modulus = modulus || '';

            var oldData = {};
            oldData.text = viewModel.oldpsd() || "";
            oldData.exponent = exponent || "";
            oldData.modulus = modulus || "";

            var oldPassword = u.RSAUtils.encryptedString(oldData);
            var newPassword = u.RSAUtils.encryptedString(DEdata);
            var uri = window.baseUrl + '/userMGT/modifyPassword';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,

                data: JSON.stringify({ "newPassword": newPassword, "identification": userId, "verificationCode": oldPassword, "msgtype": "oldpwd" }),
                contentType: 'application/json',
                success: function(res) {
                    if (res.status === 1) {
                        viewModel.step(false);
                        //                        $('#editSuccess').html('<h5>修改成功</h5>');
                        $("#editPSwordForm").hide();
                        $("#step-suc").show();
                        //u.showMessage({showSeconds: 1, width: "32%", msg: "<i class='iconfont icon-ok'></i>" + res.msg, position: "center", msgType: ""});

                    } else {
                        //u.showMessage({showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>' + res.msg, position: "center", msgType: "error"});
                        dialogmin(res.msg, "tip-alert");
                        //                        $('#editSuccess').html('ERROR：<h5 class="margin-left-25">'+res.msg+'</h5>');
                    }

                }
            });

        },
        /*
         //页面初始化
         */
        pageInit: function() {
            //viewModel.step(true);
            u.createApp({
                el: '#editPassword',
                model: viewModel
            });
            viewModel.getPassWordRuler();
            //viewModel.getValidationPhone();
            viewModel.step(false);
        }
    };

    return {
        init: function(content) {
            // 插入内容
            content.innerHTML = html;
            // 执行主逻辑
            viewModel.pageInit();
			viewModel.initI18n();
        }
    }
});
