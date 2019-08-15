/**
 * Created with JetBrains WebStorm.
 * User: anry
 * Date: 16-8-22
 * Time: 下午3:04
 * To change this template use File | Settings | File Templates.
 */
define(function (require, module, exports) {

    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./webuploader.css');
	require('i18n');

    require('css!./mutlilang.css');

    var WebUploader = require('./webuploader.js');

    var cookieOperation = require('cookieOperation');
    var dialogmin = require('dialogmin');
    var userId = cookieOperation.get('_A_P_userId');

    function htmldecode(s){  
            var div = document.createElement('span');  
            div.innerHTML = s;  
            return div.innerText || div.textContent;  
        } 

    var viewModel = {
		initI18n: function(){
            initI18n();
        },
        step: ko.observable(),
        valiCode: ko.observable(),
        phone: ko.observable(''),
        errmsg: ko.observable(''),
        sendBtntext: ko.observable($.i18n.prop('js.pwP.per.0001')),
        sendBtnable: ko.observable(true),

        confirmPassword: ko.observable(''),


        /*创建useredit数据模型*/
        userData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                loginName: {
                    type: 'string'
                },
                showName: {
                    type: 'string'
                },
                avator: {
                    type: 'string'
                },
                phone: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                }

            }
        }),

        /**
         * click event //发送短信验证码
         */
        sendMsg: function () {
            //validate phone number
            var p = viewModel.phone();
            if (p) {
                var wait = 60;
                var get_code_time = function () {
                    if (wait == 0) {
                        viewModel.sendBtntext($.i18n.prop('js.pwP.per.0001'));
                        viewModel.sendBtnable(true);
                        wait = 60;
                    } else {
                        viewModel.sendBtntext("(" + wait + $.i18n.prop('js.pwP.per.0002'));
                        viewModel.sendBtnable(false);
                        wait--;
                        setTimeout(function () {
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
                    success: function (res) {
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
//                viewModel.errmsg("手机号码有误，请重填");
            }
        },
        getPersonalSettingInfo:function(){
            var uri = window.baseUrl + '/unlincensecheck/getPersonalSettingInfo';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        viewModel.userData.setSimpleData(res.data);

                        var defaltValue = viewModel.userData.getValue("name"+viewModel.mutlilang.currentSerial);
                        viewModel.userData.setValue("showName",defaltValue);

                    } else {
                        alert(res.msg);
                    }
                }
            });
        },
        /**
         * click event //校验短信验证码，执行下一步
         */
        nextStep: function () {
            var valiCode = viewModel.valiCode();
            if (valiCode && /^\d{6}$/.test(valiCode)) {
                var uri = window.baseUrl + '/open/verify/checkSMS/'+userId+"/"+valiCode;
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: null,
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status === 1) {
                            viewModel.getPersonalSettingInfo();
                            viewModel.step(false);
                        } else {
                            $("#checkValiCode").show().html(res.msg);
                        }
                    }
                });
            }
            else {
                $("#checkValiCode").show().html($.i18n.prop('js.pwP.per.0003'));
            }
        },
        /**
         * click event //取消修改个人信息
         *  //目前流程不需要取消按钮
         */
        /*cancel: function () {
         },*/

        /**
         * click event //完成修改，保存个人信息
         */
        saveUserInfo: function () {
            var editsaveData = viewModel.userData.getSimpleData()[0];
            var showName=editsaveData.showName;
            var phone=editsaveData.phone;
            var email=editsaveData.email;

            //validate form data  start
            if(!showName){
                dialogmin($.i18n.prop('js.pwP.per.0010'),'tip-alert');
                return false;
            }
            if (!viewModel.userData.getValue("name"+viewModel.mutlilang.sysDefaultLanguageSerial())) {
                dialogmin(viewModel.mutlilang.sysDefaultLanguageShow()+$.i18n.prop('js.pwP.per.0010'),'tip-alert');
                return false;
            }
            if(!viewModel.userData.getValue("name")){
                dialogmin("中文简体 " + $.i18n.prop('js.pwP.per.0010'),'tip-alert');
                return false;
            }
            //validate form data  stop

            if(!/^\d{11}$/.test(phone)){
                window.message($.i18n.prop('js.pwP.per.0005'),'error');
                return;
            }
            if(!/^(\w)+(\.\w+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
                window.message($.i18n.prop('js.pwP.per.0006'),'error');
                return;
            }
            var uri = window.baseUrl + '/userMGT/personalSetting';
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: uri,
                data: JSON.stringify(editsaveData),
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        $("#editSetting").hide();
                        $("#step-suc").show();
                        //todo jump
                        u.showMessage({showSeconds: 5, width: "32%", msg: "<i class='iconfont icon-ok'></i>" + res.msg, position: "center", msgType: ""});
                    } else {
                        dialogmin(res.msg?res.msg:$.i18n.prop('js.pwP.per.0007'), "tip-alert");
                    }
                }
            });
        },
        /**
         * click event //头像上传
         */
        uploadimg: {
            init: function () {
                // 初始化Web Uploader
                var uploader = WebUploader.create({
                    // 选完文件后，是否自动上传。
                    auto: true,
                    swf: window.baseUrl + '/vendor/trd/upload/Uploader.swf',
                    server: window.baseUrl + '/userMGT/fastDfs/imgUpload',
                    chunked: false,
                    chunkSize: 512 * 1024,
                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: '#filePicker',
                    fileNumLimit: 1,
                    fileSizeLimit: 1024 * 1024,
                    // 只允许选择图片文件。
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    }
                });
                //ie9不发送上传请求，需要设置headers
                uploader.on('uploadBeforeSend', function (obj, data, headers) {
                    $.extend(headers, {
                        Accept: "*/*"
                    });
                });
                // 当有文件添加进来的时候
                uploader.on('fileQueued', function (file) {
                    // 创建缩略图
                    var $img = $('.tou-img');
                    uploader.makeThumb(file, function (error, src) {
                        if (error) {
                            $img.replaceWith($.i18n.prop('js.pwP.per.0008'));
                            return;
                        }
                        $img.attr('src', src);
                    }, 100, 100);
                });
                // 文件上传过程中创建进度条实时显示。
                uploader.on('uploadProgress', function (file, percentage) {
                    var $li = $('.upload-tip'),
                        $percent = $li.find('span');
                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $('<p class="progress"><span></span></p>')
                            .appendTo($li)
                            .find('span');
                    }

                    $percent.css('width', percentage * 100 + '%');
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on('uploadSuccess', function (file, res) {
                    $('.upload-message').show().text('');
                    if (res.status === 1) {
                        var photoName = res.data.fileName;
                        viewModel.userData.setValue('avator', res.data.accessAddress);
                    }
                    else {
                        $('.upload-message').show().text(htmldecode(res.msg));
                    }
                    setTimeout(function () {
                        $('.upload-tip').hide();
                    }, 2000);

                    /* $('#' + file.id).addClass('upload-state-done');*/
                });

                // 文件上传失败，显示上传出错。
                uploader.on('uploadError', function (file, res) {
                    $('.upload-message').show().find('span').text(htmldecode(res.msg||'上传失败'));
                    setTimeout(function () {
                        $('.upload-tip').hide();
                    }, 2000);
                });
                uploader.on('error', function (type) {
                    if(type == "Q_EXCEED_SIZE_LIMIT"){
                        $('.upload-message').show().text($.i18n.prop('js.pwP.per.0009'));
                    }
                    console.log(">>>>>error:" + type);
                });
                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on('uploadComplete', function (file) {
                    $('.upload-tip').hide();
                    uploader.reset();
                });
            }
        },
        /**
         * 加载用X信息
         */
        getValidationPhone: function () {
            var uri = window.baseUrl + '/userMGT/getValidationPhone';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: null,
                contentType: 'application/json',
                success: function (res) {
                    if (res.status === 1) {
                        var user = res.data;
                        userId =user.userId;
//                        viewModel.userData.setSimpleData(user);
                        viewModel.phone(user.phone);
                    } else {
                        alert(res.msg);
                    }
                }
            });

        },
        /**
         * page init
         */
        pageInit: function () {
            var app = u.createApp({
                el: '#personSetting',
                model: viewModel
            });
            this.app = app;
            app.init(viewModel, null, false);

            //文件上传
            viewModel.uploadimg.init();
            /*  //校验密码    去掉
             var checkPwDialg = u.dialog({
             id: 'checkPwDialg',
             content: '#dialog_content',
             hasCloseMenu: false
             });
             $("#checkPwDialg").on('click', '.u-msg-ok', function () {
             //push password to sever  for validation
             var DEdata = {};
             DEdata.text = viewModel.confirmPassword() || '';
             DEdata.exponent = sessionStorage.getItem('exponent') || '';
             DEdata.modulus = sessionStorage.getItem('modulus') || '';
             var password = u.RSAUtils.encryptedString(DEdata);
             var uri = window.baseUrl + '/userMGT/checkPassword';
             $.ajax({
             type: 'POST',
             dataType: 'json',
             url: uri,
             data: JSON.stringify({password: password}),
             contentType: 'application/json',
             success: function (res) {
             if (res.status === 1) {
             checkPwDialg.close();
             } else {
             $("#checkPwDialg").find(".error").show().html(res.msg);
             }
             }
             });

             });*/

            //初始化加载个人信息
            //viewModel.getValidationPhone();
            viewModel.step(false);
			viewModel.getPersonalSettingInfo();

            viewModel.mutlilang.init();

        },
        //国际化多字段录入 -- start--
        mutlilang: {
            sysLocale: ko.observable(''),
            show: ko.observable(false),
            defaultLocaleValue: ko.observable(''),
            sysDefaultLanguageShow: ko.observable(''),
            sysDefaultLanguageSerial: ko.observable(''),
            sysDefaultLanguagePreLocale: ko.observable(''),
            simpleChineseShow: ko.observable(''),
            locale: ko.observableArray([]),
            tempSerial: "",
            currentSerial: "",
            getCurrentSerial: function (newLocaleValue) {
                var uri = '../wbalone/i18n/classification/serialId';
                var JsonData = null;
                if (newLocaleValue && newLocaleValue.length > 0) {
                    JsonData = {
                        locale: newLocaleValue
                    }
                }
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: JsonData,
                    async: false,
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status == 1) {
                            viewModel.mutlilang.currentSerial= res.data=="1"?"":res.data;
                        }
                    }
                });
            },
            getSerial: function (newLocaleValue) {
                var uri = '../wbalone/i18n/classification/serialId';
                var JsonData = null;
                if (newLocaleValue && newLocaleValue.length > 0) {
                    JsonData = {
                        locale: newLocaleValue
                    }
                }
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: uri,
                    data: JsonData,
                    async: false,
                    contentType: 'application/json',
                    success: function (res) {
                        if (res.status == 1) {
                            viewModel.mutlilang.tempSerial = res.data=="1"?"":res.data;
                        }
                    }
                });
            },
            changeDTValue: function (e) {
                viewModel.userData.setValue("name"+viewModel.mutlilang.currentSerial, viewModel.mutlilang.defaultLocaleValue());
            },
            saveValue: function () {
                var defaltValue = viewModel.userData.getValue("name"+viewModel.mutlilang.currentSerial);
                viewModel.mutlilang.defaultLocaleValue(defaltValue);
                viewModel.userData.setValue("showName",defaltValue);
                viewModel.mutlilang.show(false);
            },
            closeMul: function () {
                viewModel.mutlilang.show(false);
            },
            showMul: function () {
                viewModel.mutlilang.show(true);
            },
            getCurrentLocales: function () {
                var cookieValue = viewModel.mutlilang.getCookie("u_locale");
                if (cookieValue == null || cookieValue.replaceAll("\"", "").length == 0) {
                    // cookieValue = "zh_CN";
                    cookieValue = viewModel.mutlilang.sysDefaultLanguagePreLocale();
                }
                viewModel.mutlilang.sysLocale(cookieValue);
                viewModel.mutlilang.getCurrentSerial(cookieValue);
            },
            getCookie: function (name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = $.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie
                                .substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            },
            getLanguageList: function () {
                //TODO 调用接口
                $.ajax({
                    url: "../wbalone/i18n/classification/list",
                    type: 'get',
                    data: null,
                    dataType: 'JSON',
                    contentType: 'application/json',
                    cache: false,
                    success: function (res) {
                        if (res.status == 1) {
                            var localeArray = [];
                            for (var index = 0; index < res.data.length; index++) {
                                viewModel.mutlilang.getSerial(res.data[index].prelocale);
                                //获取默认语种
                                if(res.data[index].i18nDefault==1){
                                    viewModel.mutlilang.sysDefaultLanguageShow( res.data[index].pageshow);
                                    viewModel.mutlilang.sysDefaultLanguagePreLocale( res.data[index].prelocale);
                                    viewModel.mutlilang.sysDefaultLanguageSerial(viewModel.mutlilang.tempSerial);
                                }
                                if(res.data[index].serialid==1){
                                    viewModel.mutlilang.simpleChineseShow( res.data[index].pageshow);
                                }
                                localeArray.push({
                                    "locale": res.data[index].prelocale,
                                    "label": res.data[index].pageshow,
                                    "serial": viewModel.mutlilang.tempSerial,
                                    "value": ""
                                });
                            }
                            viewModel.mutlilang.locale(localeArray);
                            //动态的设置字段
                            for (var i = 0; i < viewModel.mutlilang.locale().length; i++) {
                                var item = viewModel.mutlilang.locale()[i]
                                viewModel.userData.createField("name"+item.serial);
                            }
                            viewModel.userData.createEmptyRow();
                            $('.input-par').each(function () {
                                var fieldStr = $(this).attr('field');
                                var umetaStr = $(this).attr('u-meta');
                                if (fieldStr) {
                                    var options = JSON.parse(umetaStr);
                                    options.field = fieldStr;
                                    $(this).attr('u-meta', JSON.stringify(options));
                                    // ko.cleanNode($(this)[0]);
                                    options['type'] = options['type'] || 'string';
                                    if (options && options['type']) {
                                        var comp = u.compMgr.createDataAdapter({
                                            el: $(this)[0],
                                            options: options,
                                            model: viewModel,
                                            app: viewModel.app
                                        });
                                        $(this)[0]['u-meta'] = comp;
                                        viewModel.app.comps.push(comp);
                                    }
                                }

                            })
                        }
                    },
                });
            },
            init: function () {
                viewModel.mutlilang.getLanguageList();
                viewModel.mutlilang.getCurrentLocales();
            }
        }
        //国际化多字段录入 -- stop--
    };

    return {
        init: function (content) {
            // 插入内容
            content.innerHTML = html;
            // 执行主逻辑
            viewModel.pageInit();
			viewModel.initI18n();
        }
    }
});
