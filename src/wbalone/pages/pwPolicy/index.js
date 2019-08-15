/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-8-22
 * Time: 下午3:04
 * To change this template use File | Settings | File Templates.
 */
define(['dialogmin','text!./index.html','css!./index.css','i18n','css!/uui/libs/uui/css/font-awesome.min.css'],function (dialogmin,html) {
    // 引入相关的功能插件或模块

    loadI18nProperties('/pwPolicy/');


    var viewModel = {
        pwdqiangdu:[],
        errorloginthreshold:[{value:3, name:3},{value:4, name:4},{value:5, name:5}],
        pwgoback: function () {
            window.history.go(-1);
            return false;
        },
        pageInit: function () {
            u.createApp({
                el: '#pwPolicy',
                model: viewModel
            });
            // 初次加载数据
            viewModel.loadList();
            initI18n('/pwPolicy/');
        },
        listenChange: function () {    //监听事件
            viewModel.PolicyData.on('validatedays.valueChange', function (item) {
                if (item.newValue === "0") {
                    viewModel.PolicyData.setValue("alertdays", 0);
                }
            });
            viewModel.PolicyData.on('isautolock.valueChange', function (item) {
                if (item.newValue === "N") {
                    viewModel.PolicyData.setValue("unlocktime", 0);
                }
            });
        },
        selData: ko.observableArray(),
        tmpData: ko.observable(),
        loadList: function () {
            var uri = window.baseUrl + '/passwordPolicy/getPolicy';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.pwdqiangdu = res.data.passwordComplexityKeyValue;
                        var combo1Obj = document.getElementById('test-select')['u.Combo'];
                        combo1Obj.setComboData(viewModel.pwdqiangdu);
                        $.each(res.data.passwordComplexityKeyValue, function (i, item) {
                            if (item.value === res.data.pwdcomplexityId) {
                                res.data.pwdcomplexityName = item.name;

                                viewModel.selectedData(item);
                            }
                        });
                        viewModel.PolicyData.setSimpleData(res.data);
                        viewModel.tmpData(res.data);
                        viewModel.selData(res.data.passwordComplexityKeyValue);

                        $.each(viewModel.selData(), function (i, item) {
                            if (item.value === viewModel.PolicyData.getValue('pwdcomplexityId')) {
                                viewModel.selectedData(item);
                            }
                        });
                        viewModel.listenChange();
                    } else {
                        dialogmin(res.msg, "tip-alert");                    }
                }
            });
        },
        selectedData: ko.observable(),
        temType: ko.observable(false),
        edit: function () {
            $("input").removeClass("warnsigninput");
            $(".warnsign").addClass("hide");
            this.temType(false);
            //设置
            $.each(viewModel.selData(), function (i, item) {
                if (item.value === viewModel.PolicyData.getValue('pwdcomplexityId')) {
                    viewModel.selectedData(item);
                }
            });
        },
        save: function () {
            //validate form data
            var errorflag=false;
            // viewModel.PolicyData.setValue('pwdcomplexityId', viewModel.selectedData().value);
            var formData = viewModel.PolicyData.getSimpleData()[0];
            delete  formData['passwordComplexityKeyValue'];
            delete  formData['pwdcomplexityName'];
            // /^\d{6}$/.test(valiCode)
            $("input").removeClass("warnsigninput");
            $(".warnsign").addClass("hide");

            if (formData.mininumlength.length<1 || (formData.mininumlength < 6 || formData.mininumlength > 16)) {
                //u.showMessage({showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i> 取值范围介于6~16', position: "center", msgType: "error"});
                $('.mininumlengthclass').find("input").addClass("warnsigninput");
                $('.mininumlengthclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if (formData.validatedays.length<1 || (formData.validatedays > 730 || formData.validatedays < 0)) {
                //u.showMessage({showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i> 取值范围介于0~730', position: "center", msgType: "error"});
                $('.validatedaysclass').find("input").addClass("warnsigninput");
                $('.validatedaysclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if((formData.validatedays!=0)&&(formData.alertdays==formData.validatedays)){
                $('.alertdaysclass').find("input").addClass("warnsigninput");
                $('.alertdaysclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if (formData.alertdays.length<1 || (parseInt(formData.alertdays) > parseInt(formData.validatedays) || formData.alertdays < 0)) {
                //u.showMessage({showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i> 提示天数应该小于有效天数', position: "center", msgType: "error"});
                $('.alertdaysclass').find("input").addClass("warnsigninput");
                $('.alertdaysclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if ( formData.unlocktime.length<1 || (formData.unlocktime > 48 || formData.unlocktime < 0)) {
                //u.showMessage({showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i> 解锁时间间隔小于48', position: "center", msgType: "error"});
                $('.unlocktimeclass').find("input").addClass("warnsigninput");
                $('.unlocktimeclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if (formData.similaritydegree.length<1 || (formData.similaritydegree > 100 || formData.similaritydegree < 0)) {
                $('.similaritydegreeclass').find("input").addClass("warnsigninput");
                $('.similaritydegreeclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if (formData.remembercount.length<1 || (formData.remembercount > 50 || formData.similaritydegree < 0)) {
                $('.remembercountclass').find("input").addClass("warnsigninput");
                $('.remembercountclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }
            if (formData.defaultPassword.length <= 0) {
                $('.defalutPasswordclass').find(".warnsign p").text($.i18n.prop('ht.pag.pwP.0041'));
                $('.defalutPasswordclass').find("input").addClass("warnsigninput");
                $('.defalutPasswordclass').find(".warnsign").removeClass("hide");
                errorflag=true;
            }

            if(errorflag){
                return;
            }

            //var exponent = $.cookie('exponent');
            //var modulus = $.cookie('modulus');
            if(!sessionStorage.getItem('exponent')){
                u.showMessage({showSeconds: 1, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>' + $.i18n.prop('ht.pag.pwP.0044'), position: "center", msgType: "error"});
                return false;
            }
            var exponent = sessionStorage.getItem('exponent');//moded by yany 修改为sessionStorage存取
            var modulus = sessionStorage.getItem('modulus');
            var RSApwd = u.RSAUtils.encryptedString({exponent: exponent, modulus: modulus, text: formData.defaultPassword});
            formData.defaultPassword = RSApwd;
            var uri = window.baseUrl + '/passwordPolicy/update';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.PolicyData.setValue("pwdcomplexityName",viewModel.selectedData().name);

                        //viewModel.temType(true);
                        viewModel.loadList();
                        u.messageDialog({
                            msg : $.i18n.prop('ht.pag.pwP.0042'),
                            title : $.i18n.prop('ht.pag.pwP.0043'),
                            btnText : "OK"
                        });

                    } else {
                        dialogmin(res.msg, "tip-alert");
                        // u.showMessage({showSeconds: 5, width: "32%", msg: '<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>' + res.msg, position: "center", msgType: "error"});
                        /* $('.defalutPasswordclass').find(".warnsign p").html(res.msg);
                         $('.defalutPasswordclass').find("input").addClass("warnsigninput");
                         $('.defalutPasswordclass').find(".warnsign").removeClass("hide");*/
//                        viewModel.temType(true);
                    }
                }
            })
        },
        cancel: function () {
            viewModel.PolicyData.clear();
            viewModel.PolicyData.setSimpleData(viewModel.tmpData());
            this.temType(true);
        },
        passwordComplexityKeyValue: new u.DataTable({
            meta: {
                name: {type: "string"},
                value: {type: "string"}
            }
        }),
        PolicyData: new u.DataTable({
            meta: {
                defaultPassword: {type: "string"},
                alertdays: {type: 'string', required: true, regExp: /^-?\d+$/,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")},
                code: {type: "string"},
                isautolock: {type: "string"},
                validateType: {type: "string"},
                isforceupdate: {type: "string"},
                mininumlength: {type: 'string',
                    regExp: /^-?\d+$/, required: true,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")},
                name: {type: "string"},
                pwdcomplexityName: {type: "string"},
                pwdcomplexityId: {type: "string"},
                pwdlevelId: {type: "string"},
                starttime: {type: "string"},
                remembercount: {type: 'string',
                    regExp: /^-?\d+$/, required: true,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")},
                similaritydegree: {type: 'integer',regExp: /^-?\d+$/, required: true,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")},
                unlocktime: {type: 'integer',
                    regExp: /^-?\d+$/, required: true,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")},
                validatedays: {type: 'integer',
                    regExp: /^-?\d+$/, required: true,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")},
                errorloginthreshold: {type: 'integer', required: true,errorMsg: $.i18n.prop('js.pag.pwp.0001',"请输入整数")}
            }
        })
    };

    return {
        init: function (content) {
            // 插入内容
            content.innerHTML = html;
            // 执行主逻辑
            viewModel.pageInit();
        }
    }
});