/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-9-8
 * Time: 上午9:24
 * To change this template use File | Settings | File Templates.
 */
window.host = '';
window.baseUrl = window.host + window.host + 'wbalone';
var app, viewModel;

viewModel = {
    curStep: ko.observable(0),
    imgHtml: ko.observable(),
    msgType: ko.observable(),

    errmsg: ko.observable(''),
    sendBtntext: ko.observable($.i18n.prop('js.pag.for.0001')),
    sendBtnable: ko.observable(true),

    /*
     * 数据模型
     * */
    DataTables: {
        step1: new u.DataTable({
            meta: {
                account: {
                    type: 'string'
                },
                verificationCode: {
                    type: 'string'
                }
            }
        }),
        step2: new u.DataTable({
            meta: {
                userId: {
                    type: 'string'
                },
                phone: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                valiCode: {
                    type: 'string'
                }
            }
        }),
        step3: new u.DataTable({
            meta: {
                newpsd: {
                    type: 'string'
                },
                passwordPolicy: {
                    type: 'string'
                },
                confirmnewpsd: {
                    type: 'string'
                }
            }
        }),
        step4: new u.DataTable({
            meta: {
                f1: {
                    type: 'string',
                    maxLength: 12
                }
            }
        })
    },
    /*
     * ajax funs
     *
     * */
    ajaxfuns: {
        //验证二维码  CheckPhone
        CheckCode: function() {
            if (!viewModel.DataTables.step1.getValue('verificationCode')) {
                u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0004')+"~", position: "center", msgType: "warning" });
                return;
            }
            if (!viewModel.DataTables.step1.getValue('account')) {
                u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0005')+"~", position: "center", msgType: "warning" });
                return;
            }
            var uri = '../../open/imgVerificationCode/checkCode';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: { verificationCode: viewModel.DataTables.step1.getValue('verificationCode'), identification: viewModel.DataTables.step1.getValue('account') },
                contentType: 'application/json',
                success: function(res) {
                    var cur = viewModel.curStep();
                    if (res.status === 1) {
                        viewModel.curStep(++cur);
                        viewModel.DataTables.step2.setValue('phone', res.data.phone);
                        viewModel.DataTables.step2.setValue('userId', res.data.userId);
                        // TODO: 后续改为email验证 modified by wjp
                        viewModel.DataTables.step2.setValue('email', res.data.email);
                        var passwordPolicy = res.data.passwordComplexity || "" + $.i18n.prop('js.pag.for.0002');
                        viewModel.DataTables.step3.setValue("passwordPolicy", passwordPolicy);
                        viewModel.msgType(res.data.msgtype); // 消息类型
                        if(viewModel.msgType()=="phone"){
                            viewModel.sendBtntext($.i18n.prop('js.pag.for.0001'));
                        }else{
                            viewModel.sendBtntext($.i18n.prop('js.pag.for.0012'));
                        }
                    } else {
                        u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>" + res.msg, position: "center", msgType: "warning" });
                    }
                }
            });
        },
        CheckPhone: function() {
            var valiCode = viewModel.DataTables.step2.getValue('valiCode');
            var phone = viewModel.DataTables.step2.getValue('phone');
            var userId = viewModel.DataTables.step2.getValue('userId');
            if (valiCode && /^\d{6}$/.test(valiCode)) {
                var uri = '../../open/verify/checkSMS/' + userId + "/" + valiCode;
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: {msgtype: viewModel.msgType()},
                    contentType: 'application/json',
                    success: function(res) {
                        if (res.status === 1) {
                            var cur = viewModel.curStep();
                            viewModel.curStep(++cur);
                            //var passwordPolicy = res.data.passwordComplexity || "" + $.i18n.prop('js.pag.for.0002');
                            //viewModel.DataTables.step3.setValue("passwordPolicy", passwordPolicy);

                        } else {
                            u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>" + res.msg, position: "center", msgType: "warning" });
                        }
                    }
                });
            }  else if(valiCode==null ||valiCode.trim().replace(/(^s*)|(s*$)/g, "").length ==0){
            	//验证码不能为空
            	  u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0004')+"~", position: "center", msgType: "warning" });
            } else {//验证码不正确
               // u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>验证码不能为空~~", position: "center", msgType: "warning" });
               // $.i18n.prop('js.pag.for.0001')
                u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0011')+"~", position: "center", msgType: "warning" });

            }
        },

        /*
         click event   //保存新密码
         */
        saveNewPsd: function() {
            var valiCode = viewModel.DataTables.step2.getValue('valiCode');
            var newpsd = viewModel.DataTables.step3.getValue('newpsd');
            var confirmnewpsd = viewModel.DataTables.step3.getValue('confirmnewpsd');
            // if (newpsd.length < 6) {
            //     u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0006')+"~", position: "center", msgType: "warning" });
            //
            //     viewModel.DataTables.step3.setValue('confirmnewpsd', '');
            //     viewModel.DataTables.step3.setValue('newpsd', '');
            //     return false;
            // }
            if (!newpsd.length || !confirmnewpsd.length) {
                u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0007')+"~", position: "center", msgType: "warning" });
                return false;
            }
            if (newpsd != confirmnewpsd) {
                u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0008')+"~", position: "center", msgType: "warning" });
                viewModel.DataTables.step3.setValue('confirmnewpsd', '');
                return false;
            }

            var DEdata = {};
            DEdata.text = confirmnewpsd || '';
            if (!sessionStorage.getItem('exponent')) {
                u.showMessage({ showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>'+$.i18n.prop('js.pag.for.0009'), position: "center", msgType: "error" });
                return false;
            }
            DEdata.exponent = sessionStorage.getItem('exponent') || ''; //moded by yany 修改为sessionStorage存取
            DEdata.modulus = sessionStorage.getItem('modulus') || '';

            var newPassword = u.RSAUtils.encryptedString(DEdata);
            var userId = viewModel.DataTables.step2.getValue('userId');

            //            var userId = $.cookie('_A_P_userId');
            var uri = '../../open/modifyPassword';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                // data: JSON.stringify({newPassword: newPassword,identification:userId}),
                data: JSON.stringify({ newPassword: newPassword, identification: userId, verificationCode: valiCode, msgtype: viewModel.msgType() }),
                contentType: 'application/json',
                success: function(res) {
                    if (res.status === 1) {
                        var cur = viewModel.curStep();
                        viewModel.curStep(++cur);
                        setTimeout(function() {
                            window.location.href = '../pages/login/login.html';
                        }, 3000);
                        //                        $('#editSuccess').html('<h5>编辑成功</h5>');
                        //                        u.showMessage({showSeconds: 1, width: "32%", msg: "<i class='iconfont icon-ok'></i>" + res.msg, position: "center", msgType: ""});

                    } else {
                        u.showMessage({ showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>' + res.msg, position: "center", msgType: "error" });
                        //                        $('#editSuccess').html('ERROR：<h5 class="margin-left-25">'+res.msg+'</h5>');
                    }

                }
            });

        }
    },
    /*
     * click 事件处理
     * */
    Events: {
        nextStep: function() {
            var cur = viewModel.curStep();
            switch (cur) {
                case 0:
                    viewModel.ajaxfuns.CheckCode();
                    break;
                case 1:
                    // TODO: modified by wjp
                    viewModel.ajaxfuns.CheckPhone();
                    break;
                case 2:
                    viewModel.ajaxfuns.saveNewPsd();
                    break;
                case 3:
                    break;
                default:
                    return;
            }


        },
        getvaliImage: function() {
            var timetemp = Date.parse(new Date());
            viewModel.imgHtml(
                '<img src="../../open/imgVerificationCode/getCode?ts=' + timetemp + '" alt=""/>'
            )
        },

        initI18n : function(){
            initI18n("/pages/forgetpassword/");
            var languageType=getCookie("u_locale");
            if ("en_US"==languageType){
                $("#logoId").attr("src","../../images/logo-EN.svg")
            }else if ("zh_TW" == languageType || "zh-TW" == languageType){
                $("#logoId").attr("src","../../images/logo-TW.svg")
            }else {
                $("#logoId").attr("src","../../images/logo.svg")
            }
        },

        /*
         *  //发送短信验证码
         */
        sendMsg: function() {
            var p = viewModel.DataTables.step2.getValue('phone');
            var userId = viewModel.DataTables.step2.getValue('userId');
            if (p) {
                var wait = 60;
                var get_code_time = function() {
                    if (wait == 0) {
                        if(viewModel.msgType()=="phone"){
                            viewModel.sendBtntext($.i18n.prop('js.pag.for.0001'));
                        }else{
                            viewModel.sendBtntext($.i18n.prop('js.pag.for.0012'));
                        }
                        viewModel.sendBtnable(true);
                        $("#msgValiCode").hide().html('');
                        wait = 60;
                    } else {
                        viewModel.sendBtntext("(" + wait + $.i18n.prop('js.pag.for.0003'));
                        viewModel.sendBtnable(false);
                        wait--;
                        setTimeout(function() {
                            get_code_time()
                        }, 1000)
                    }
                };

                var uri = '../../open/verify/sendSMS/' + userId;
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: { msgtype: viewModel.msgType() }, // modified by wjp
                    contentType: 'application/json',
                    success: function(res) {
                        if (res.status === 1) {
                            get_code_time();
                        } else {
                            u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>" + res.msg, position: "center", msgType: "warning" });
                        }
                    }
                });
            } else {
                if(viewModel.msgType()=="phone"){
                    u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0010')+"~", position: "center", msgType: "warning" });
                }else{
                    u.showMessage({ showSeconds: 1, width: "32%", msg: "<i class='uf uf-exclamationsign margin-r-5'></i>"+$.i18n.prop('js.pag.for.0013')+"~", position: "center", msgType: "warning" });
                }
            }
        }

    }


};
viewModel.Events.initI18n("/pages/forgetpassword/");
app = u.createApp({
    el: 'body',
    model: viewModel
});

viewModel.Events.getvaliImage();
viewModel.DataTables.step1.createEmptyRow();
viewModel.DataTables.step2.createEmptyRow();
viewModel.DataTables.step3.createEmptyRow();

if(viewModel.msgType()=="phone"){
    viewModel.sendBtntext($.i18n.prop('js.pag.for.0001'));
}else{
    viewModel.sendBtntext($.i18n.prop('js.pag.for.0012'));
}