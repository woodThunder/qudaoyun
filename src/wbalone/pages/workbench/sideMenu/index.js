define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./menu.css');
    require('css!../../../mutlilang.css');
    // require('/uitemplate_web/static/js/uiref/reflib.js');
    // require('/uitemplate_web/static/js/uiref/refer.js');
    // require('/uitemplate_web/static/js/uiref/refGrid.ji18ns');
    // require('/uitemplate_web/static/js/uiref/refGridtree.js');
    // require('/uitemplate_web/static/js/uiref/refTree.js');
    // require('/uitemplate_web/static/js/uiref/refcommon.js');
    // require('/uitemplate_web/static/js/uiref/uiReferComp.js');

    require('reflib');
    require('refer');
    require('refGrid');
    require('refGridtree');
    require('refTree');
    require('refcommon');
    require('uiReferComp');
    require('i18n');

    var dialogmin = require('dialogmin');

    initI18n();
    var viewModel = {
        headform: new u.DataTable({
            meta: {
                'dataSourceId': {
                    'refparam': '{"isUseDataPower":true}',
                    'refmodel': '',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"pageUrl":"uitemplate_web","isCheckListEnabled":true}'
                },
                'menuRef': {
                    'refparam': '{"isUseDataPower":true}',
                    'refmodel': '',
                    'refcfg': '{"isClearData":true,"ctx":"/uitemplate_web","isMultiSelectedEnabled":false,"pageUrl":"uitemplate_web","isCheckListEnabled":true}'
                }
            }
        }),
        refInit: function (refCode) {
            if (!refCode) return alert($.i18n.prop('js.wor.sid.0001'));
            $.ajax({
                type: "get",
                url: '/uitemplate_web/iref_ctr/refInfo/',
                data: {
                    refCode: refCode || ""
                },
                traditional: true,
                async: false,
                dataType: "json",
                success: function (pRefmodel) {
                    //appMenu
                    //application
                    if (refCode === 'appMenu') {
                        viewModel.headform.setMeta('menuRef', 'refmodel', JSON.stringify(pRefmodel));
                        app.createComp(document.getElementById('menuRef'), viewModel);

                    }
                    if (refCode === 'application') {
                        viewModel.headform.setMeta('dataSourceId', 'refmodel', JSON.stringify(pRefmodel));

                        app.createComp(document.getElementById('appRef'), viewModel);
                    }
                }
            });

        },
        goback: function () {
            window.history.go(-1);
            return false;
        },
        cancelAdd: function () {
            viewModel.appDomType(true);
            viewModel.appDomtitle(viewModel.CurMenu().name || "");
            viewModel.app.clear();
        },
        currentPage:ko.observable($.i18n.prop('ht.wor.sid.0024')),
        newWindow:ko.observable($.i18n.prop('ht.wor.sid.0023')),

        /**
         * 字体图标选择
         * */
        iconFont: {
            selVal: ko.observable(),
            curIcons: ko.observable(),

            curIcon: ko.observable(),
            curColor: ko.observable(),

            icons: ko.observableArray([]),
            iconClassList: ko.observableArray([]),
            colors: ko.observableArray([]),
            init: function (config) {
                // init the icons name 
                $.each(config.icons, function (i, item) {
                    item.name = $.i18n.prop(item.name);
                });
                var config = $.extend({
                    icons: [{
                        name: $.i18n.prop('js.wor.sid.0002'),
                        fontfamily: "iconfont",
                        path: "fonts/moren/iconfont.css"
                    }]
                }, config);
                var colors = [{
                        name: "red        ",
                        colorclass: "bg-red        "
                    },
                    {
                        name: "pink       ",
                        colorclass: "bg-pink       "
                    },
                    {
                        name: "purple     ",
                        colorclass: "bg-purple     "
                    },
                    {
                        name: "deep-purple",
                        colorclass: "bg-deep-purple"
                    },
                    {
                        name: "indigo     ",
                        colorclass: "bg-indigo     "
                    },
                    {
                        name: "blue       ",
                        colorclass: "bg-blue       "
                    },
                    {
                        name: "light-blue ",
                        colorclass: "bg-light-blue "
                    },
                    {
                        name: "cyan       ",
                        colorclass: "bg-cyan       "
                    },
                    {
                        name: "teal       ",
                        colorclass: "bg-teal       "
                    },
                    {
                        name: "green      ",
                        colorclass: "bg-green      "
                    },
                    {
                        name: "light-green",
                        colorclass: "bg-light-green"
                    },
                    {
                        name: "lime       ",
                        colorclass: "bg-lime       "
                    },
                    {
                        name: "yellow     ",
                        colorclass: "bg-yellow     "
                    },
                    {
                        name: "amber      ",
                        colorclass: "bg-amber      "
                    },
                    {
                        name: "orange     ",
                        colorclass: "bg-orange     "
                    },
                    {
                        name: "deep-orange",
                        colorclass: "bg-deep-orange"
                    },
                    {
                        name: "brown      ",
                        colorclass: "bg-brown      "
                    },
                    {
                        name: "grey       ",
                        colorclass: "bg-grey       "
                    },
                    {
                        name: "blue-grey  ",
                        colorclass: "bg-blue-grey  "
                    },
                    {
                        name: "black      ",
                        colorclass: "bg-black      "
                    }
                ];
                //load css file
                var hrefs = "";
                $.each(config.icons, function (i, item) {
                    hrefs += '<link rel="stylesheet" href="' + item.path + '"/>';
                });
                $("#iconpicker").before($(hrefs));


                config.iconClass = "grey iconfont icon-appicon";
                viewModel.iconFont.loadIconsByuri(config.icons[0]);

                viewModel.iconFont.icons(config.icons);
                viewModel.iconFont.colors(colors);

                viewModel.iconFont.curIcons(config.icons[0]);
                viewModel.iconFont.curIcon({
                    category: $.i18n.prop('js.wor.sid.0002'),
                    fontClass: "iconfont icon-appicon",
                    name: "appicon"
                });

                //viewModel.iconFont.curColor({name: "grey", colorclass: "bg-grey"});//去掉默认颜色
                viewModel.iconFont.curColor({
                    name: "",
                    colorclass: ""
                });
                viewModel.iconFont.selVal(config.iconClass);

                $("#sIcon .tab>li:eq(0)").addClass("cur");
            },
            //tab 切换字体库
            tabShow: function (item, e) {
                if (item.name == viewModel.iconFont.curIcons().name) return;
                $("#sIcon .tab>li.cur").removeClass("cur");
                $(e.target).addClass("cur");
                viewModel.iconFont.curIcons(item);
                viewModel.iconFont.loadIconsByuri(item);
            },
            //选择颜色
            selColor: function (data) {
                viewModel.iconFont.curColor(data);
                viewModel.iconFont.selVal(viewModel.iconFont.curIcon().fontClass + " " + viewModel.iconFont.curColor().name);
            },
            //选择图标
            selIcon: function (data) {
                viewModel.iconFont.curIcon(data);
                viewModel.iconFont.selVal(viewModel.iconFont.curIcon().fontClass + " " + viewModel.iconFont.curColor().name || "");
            },
            loadIconsByuri: function (iconsItem) {
                $.ajax({
                    url: iconsItem.path,
                    success: function (res) {
                        var jsonArray = [];
                        var arr = res.substring(res.indexOf("/*icon-class*/"))
                            .replace("/*icon-class*/", "")
                            .trim()
                            .replace(/[\r\n]/g, "")
                            .split("}");
                        $.each(arr, function (i, item) {
                            if (item.length) {
                                jsonArray.push({
                                    "category": iconsItem.name,
                                    "name": item.substring(item.indexOf("-") + 1, item.indexOf(":")),
                                    "fontClass": iconsItem.fontfamily + " " + item.substring(item.indexOf(".") + 1, item.indexOf(":"))
                                });
                            }
                        });
                        viewModel.iconFont.iconClassList(jsonArray);
                    }
                });
            }
        },
        //控制页面显示模式
        appDomType: ko.observable(true),
        appDomtitle: ko.observable($.i18n.prop('js.wor.sid.0003')),
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {
            window.app = null;
            window.app = u.createApp({
                el: '#sideMenu',
                model: viewModel
            });
            app.init(viewModel, null, false);
            // 初次加载数据
            viewModel.loadList();
            //viewModel.initI18n();

            // viewModel.appLabel.init();

            var combo5 = document.getElementById('combo5')['u.Combo'];
            combo5.setComboData([{
                    value: "curnpage",
                    name: $.i18n.prop('js.wor.sid.0004')
                },
                {
                    value: "newpage",
                    name: $.i18n.prop('js.wor.sid.0005')
                }
            ]);


            $('#menuDl').on('click', 'div.m-cont', function () {
                $(this).next('ul').slideToggle();
                $(this).toggleClass('cur');
            });

            // $('#combo5').on('click','.u-combo-li',function(){
            //     console.log($(this).closest('.u-combo-li').text());
            // })

            //初始化功能参照数据
            //TODO fix init
            //appMenu
            //application
            viewModel.refInit('appMenu');
            viewModel.refInit('application');
            viewModel.headform.createEmptyRow(); //创建空行
            // viewModel.headform.setRowSelect(0);
            //listen 功能
            viewModel.headform.on('dataSourceId.valueChange', function (ele) {
                var appdata = $("#refContainerdataSourceId").data('uui.refer').values[0];
                if (appdata) {
                    viewModel.menuData.setValue("layoutId", appdata.refcode || "");
                }
            });

            // TODO: 确定哪里调用?
            viewModel.headform.on('menuRef.valueChange', function (ele) {

                // var pid = ele.newValue;
                // viewModel.menuData.setValue("parentId", pid);
                // var appdata = $("#refContainermenuRef").data('uui.refer').values[0];
                var appdata = ele.newValue;
                if (appdata) {
                    viewModel.menuData.setValue("parentId", appdata);
                } else {
                    viewModel.menuData.setValue("parentId", "");
                }
            });
            viewModel.mutlilang.init();
           
            //初始化选择图标组件
            /*
             * icons //array 图标资源配置项
             * 1.代表图标库name
             * 2.fontfamily 有意义不能重复，而且和对应css文件fontfamily定义一致
             * 3.图标资源css文件路径
             * */


            viewModel.iconFont.init(require('../../../fonts/iconsConfig.js'));
            /* viewModel.iconFont.init({
                icons: [
                    {
                        name: $.i18n.prop('js.wor.sid.0002'),
                        fontfamily: "iconfont",
                        path: "fonts/moren/iconfont.css"
                    },
                    {
                        name: $.i18n.prop('js.wor.sid.0006'),
                        fontfamily: "menufont",
                        path: "fonts/caidantubiao/iconfont.css"
                    },
                    {
                        name: $.i18n.prop('js.wor.sid.0007'),
                        fontfamily: "ecmifont",
                        path: "fonts/shuziyingxiao/iconfont.css"
                    }
                ]
            });*/
            $("#refContainerdataSourceId").delegate(".qy-gridTree-input", "keypress", function (event) {
                if (event.keyCode == 13) {
                    $(".qy-gridTree-searchBtn").click();
                }

            })
            $("#refContainermenuRef").delegate(".qy-tree-searchInput", "keypress", function (event) {
                if (event.keyCode == 13) {
                    $(".qy-tree-searchBtn").click();
                }

            })

        },
        initI18n: function () {
            initI18n();
        },
        afterAdd: function (element, index, row) {
            if (element.nodeType === 1) {
                u.compMgr.updateComp(element);
            }
        },
        /**
         * 加载功能标签
         * */
        appLabel: {
            init: function () {
                viewModel.appLabel.load();
                var combo3 = document.getElementById('combo3')['u.Combo'];
                combo3.setComboData(viewModel.appLabel.Datasource2);
            },
            Datasource2: [],
            load: function () {
                $.ajax({
                    url: "appMGT/pagingMenuAppList",
                    type: 'POST',
                    data: JSON.stringify({
                        pageSize: "500",
                        pageNum: "1",
                        showway: "apparea"
                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.status) {
                            var list = result.data.content;
                            var combo3 = document.getElementById('combo3')['u.Combo'];
                            combo3.setComboData(ko.utils.arrayMap(list, function (item) {
                                item.value = item.appCode;
                                item.name = item.appName;
                                return item;
                            }));
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    }
                });
            }
        },
        toggleCheck: function () {
            /*if (!viewModel.isNewMenuModel()) {
                dialogmin($.i18n.prop('js.wor.sid.0008'), "tip-alert");
                return false;
            }*/
            viewModel.isVirtualNode(!viewModel.isVirtualNode());

        },
        isVirtualNode: ko.observable(false),
        menuData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                showName: {
                    type: 'string',
                    required: false,
                    nullMsg: $.i18n.prop('js.wor.sid.0009'),
                    maxLength: 50,
                    regExp: /^[a-zA-Z0-9\u4E00-\u9FA5_\-]+$/,
                    errorMsg: $.i18n.prop('js.wor.sid.0010'),
                    placement: 'top'
                },
                
                funcId: {
                    type: 'string',
                    required: false,
                    nullMsg: $.i18n.prop('js.wor.sid.0009'),
                    errorMsg: $.i18n.prop('js.wor.sid.0011'),
                    regExp: /^[A-Za-z0-9][A-Za-z0-9_-]*$/,
                    maxLength: 24,
                    placement: 'top'
                },
                icon: {
                    type: 'string'
                },
                isvisible: true,
                isenable: true,
                parentId: {
                    type: 'string'
                },
                isVirtualNode: {},
                layoutId: {
                    type: 'string'
                },
                sort: {
                    validType: 'integer',
                    required: true,
                    nullMsg: $.i18n.prop('js.wor.sid.0009'),
                    errorMsg: $.i18n.prop('js.wor.sid.0012'),
                    min: 0,
                    max: 100,
                    placement: 'top'
                },
                openview: {
                    type: 'string'
                },
                tenantId: {
                    type: 'string'
                },
                label: {
                    type: 'string'
                }
            }
        }),
        CurMenu: ko.observable(),
        parentId: ko.observable("M0000000000001"),

        getformData: function () {
            var refValue;
            viewModel.menuData.setValue("isVirtualNode", viewModel.isVirtualNode());
            // if (viewModel.isVirtualNode()) {
            //     refValue = "";
            // } else {
            //     var combo3 = document.getElementById('combo3')['u.Combo'];
            //     refValue = combo3.value;
            // }
            viewModel.menuData.setValue("isvisible", true);
            viewModel.menuData.setValue("isenable", true);
            // viewModel.menuData.setValue("layoutId", refValue);

            if (viewModel.menuData.getValue('parentId')) {

            } else {
                viewModel.menuData.setValue("parentId", viewModel.parentId());

            }
            var combo5 = document.getElementById('combo5')['u.Combo'];
            viewModel.menuData.setValue("openview", combo5.value);
            viewModel.menuData.setValue("icon", viewModel.iconFont.selVal());

        },
        isNewMenuModel: ko.observable(true),
        setformData: function (data) {
            // var combo3 = document.getElementById('combo3')['u.Combo'];
            // combo3.setValue(data.layoutId);

            var combo5 = document.getElementById('combo5')['u.Combo'];

            combo5.setValue(data.openview);

            if (data.parentId === 'M0000000000001') {
                viewModel.headform.setValue('menuRef', '');
                // $('#menuRef input').val('');
            } else {

                // TODO: FIXME:
                viewModel.headform.setValue('menuRef', data.parentId);
                // $('#menuRef input').val(data.parentId);
            }
            if (data.layoutId === "null") {
                viewModel.headform.setValue('dataSourceId', "");
            } else {
                viewModel.headform.setValue('dataSourceId', data.layoutId);
            }


            // $('#appRef input').val(data.layoutId);

            viewModel.isVirtualNode(data.isVirtualNode == "Y");


            viewModel.iconFont.selVal(data.icon);
        },
        clearformData: function () {
            viewModel.appDomType(true);
            viewModel.appDomtitle(viewModel.CurMenu().name || "");
            viewModel.iconFont.selVal(" iconfont icon-appicon ");
            viewModel.isNewMenuModel(false);
            viewModel.isVirtualNode(false);
            // var combo3 = document.getElementById('combo3')['u.Combo'].setValue("");
            var combo5 = document.getElementById('combo5')['u.Combo'].setValue("");
        },
        Events: {
            cancelForm: function () {
                viewModel.appDomType(true);
                viewModel.appDomtitle(viewModel.CurMenu().name || "");
                viewModel.clearformData();
            },
            confirmForm: function () {
                viewModel.getformData();
                var data = viewModel.menuData.getSimpleData()[0];
                if (data.parentId === data.id) {
                    dialogmin($.i18n.prop('js.wor.sid.0013'), "tip-alert");
                    return false;
                }
                data.appCode = data.layoutId;
                //validate form data
                if (!data.showName) {
                    dialogmin($.i18n.prop('js.wor.sid.0014'), "tip-alert");
                    return false;
                }
                if (!viewModel.menuData.getValue("name"+viewModel.mutlilang.sysDefaultLanguageSerial())) {
                    dialogmin(viewModel.mutlilang.sysDefaultLanguageShow()+$.i18n.prop('js.wor.sid.0014'), "tip-alert");
                    return false;
                }else if(!viewModel.menuData.getValue("name")){
                    dialogmin(viewModel.mutlilang.simpleChineseShow()+$.i18n.prop('js.wor.sid.0014'), "tip-alert");
                    return false;
                }
                if (!data.funcId) {
                    dialogmin($.i18n.prop('js.wor.sid.0015'), "tip-alert");
                    return false;
                }
                if (!viewModel.isVirtualNode()) { //实菜单
                    if (!data.layoutId) {
                        dialogmin($.i18n.prop('js.wor.sid.0016'), "tip-alert");
                        return false;
                    }
                } else {
                    //清空绑定的功能
                    data.layoutId = null;
                    $("#appRef input").val("");
                }

                if (!data.openview) {
                    dialogmin($.i18n.prop('js.wor.sid.0017'), "tip-alert");
                    return false;
                }
                var reg = /^(?:0|[1-9][0-9]?|100)$/;
                if (!reg.test(data.sort)) {
                    dialogmin( $.i18n.prop('ht.wor.sid.0026')+" "+ $.i18n.prop('js.wor.sid.0018'), "tip-alert");
                    return false;
                }
                if(!viewModel.isNewMenuModel() && viewModel.oldMenuData.funcId === 'index' && data.funcId!=='index'){
                    dialogmin( $.i18n.prop('js.wor.sid.0029'), "tip-alert");
                    return false;
                }
                if(!viewModel.isNewMenuModel() && viewModel.oldMenuData.funcId === 'index' && data.sort!=='0'){
                    dialogmin( $.i18n.prop('js.wor.sid.0030'), "tip-alert");
                    return false;
                }
                if(data.funcId !== 'index' && data.sort =='0'){
                    dialogmin( $.i18n.prop('js.wor.sid.0031'), "tip-alert");
                    return false;
                }

                // data.openview = "curnpage";

                if (viewModel.isNewMenuModel()) { //new
                    $.ajax({
                        url: "appmenumgr/appcreateNode",
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.status) {
                                dialogmin($.i18n.prop('js.wor.sid.0019'), "tip-suc");
                                viewModel.clearformData();
                                viewModel.loadList();
                            } else {
                                result.msg ? alert(result.msg) : '';
                            }
                        }
                    });
                } else {
                    $.ajax({
                        url: "appmenumgr/appeditNode",
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.status == 1) {
                                dialogmin($.i18n.prop('js.wor.sid.0020'), "tip-suc");
                                viewModel.loadList();
                                viewModel.clearformData();

                            } else {
                                result.msg ? alert(result.msg) : '';
                            }
                        }
                    });
                }
            },
            add: function (data, event) {
                event.stopPropagation();
                event.preventDefault();
                if (data.Events) {
                    //viewModel.parentId("M0000000000001");
                    if (viewModel.parentId() == null) {
                        viewModel.parentId("M0000000000001");
                    }
                } else {
                    viewModel.parentId(data.premenu ? data.premenu.id : data.id);
                }
                viewModel.headform.setValue('dataSourceId', '');
                viewModel.headform.setValue('menuRef', '');
                viewModel.isNewMenuModel(true);
                viewModel.appDomType(false);
                viewModel.appDomtitle($.i18n.prop('js.wor.sid.0003'));
                viewModel.menuData.clear();
                viewModel.menuData.createEmptyRow();
                $("#menuRef input").val(data.name || data.premenu.name);
            },
            edit: function () {
                viewModel.appDomType(false);
                viewModel.appDomtitle($.i18n.prop('js.wor.sid.0021'));
                viewModel.isNewMenuModel(false);
                var data = viewModel.CurMenu();
                viewModel.oldMenuData = data;
                viewModel.menuData.setSimpleData(data);
                  //由于后台获取menu列表的时候会根据当前语种将name字段重新赋值为当语种中的name，所以做此处理
                  $.ajax({
                    url: "appmenumgr/appgetNodeInfo",
                    type: 'POST',
                    dataType: 'json',
                    async:false,
                    data: JSON.stringify({
                        id: data.id
                    }),
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.status) {
                            viewModel.menuData.setValue("name",result.data.name);
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    }
                });
                
                var defaltValue = viewModel.menuData.getValue("name"+viewModel.mutlilang.currentSerial);
                viewModel.menuData.setValue("showName",defaltValue);
                viewModel.setformData(data);
            },
            delete: function () {
                $("#deleteModal").modal("show");
            },
            remove: function () {
                $("#deleteModal").modal("hide");
                if(viewModel.CurMenu().funcId ==='index'){
                    dialogmin(  $.i18n.prop('js.wor.sid.0032'), "tip-alert");
                    return false;
                }
                $.ajax({
                    url: "appmenumgr/appdeleteNode",
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        id: viewModel.CurMenu().id
                    }),
                    contentType: 'application/json',
                    success: function (result) {

                        if (result.status) {
                            dialogmin($.i18n.prop('js.wor.sid.0022'), "tip-suc");
                            viewModel.loadList();
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    }
                });
            },
            // TODO: 展示节点内容
            showContent: function (data, event) {
                // event.stopPropagation();
                // event.preventDefault();
                viewModel.appDomType(true);
                var tar = event.currentTarget;

                if (data.premenu) {
                    if (viewModel.CurMenu().id == data.premenu.id) {
                        if (tar.tagName === "DT") {
                            var $dl = $(tar).parent();
                            if ($dl.hasClass('cur')) {
                                $dl.removeClass("cur");
                            } else {
                                $dl.addClass("cur");
                            }
                        }
                        return false;
                    }
                } else {
                    if (viewModel.CurMenu().id == data.id) return false;
                }

                if (tar.tagName === "DT") {
                    var $dl = $(tar).parent();
                    $(".menu .cur").removeClass("cur");
                    $dl.addClass("cur");
                }
                if (tar.tagName === "DD") {
                    $(".menu dd.cur").removeClass("cur");
                    $(tar).addClass("cur");
                }
                if (data.premenu) {
                    viewModel.menuData.setSimpleData(data.premenu);
                    viewModel.CurMenu(data.premenu);
                } else {
                    viewModel.menuData.setSimpleData(data);
                    viewModel.CurMenu(data);
                }
                viewModel.appDomtitle(viewModel.CurMenu().name || "");
            },
        },
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
                viewModel.menuData.setValue("name"+viewModel.mutlilang.currentSerial, viewModel.mutlilang.defaultLocaleValue());
            },
            saveValue: function () {
                var defaltValue = viewModel.menuData.getValue("name"+viewModel.mutlilang.currentSerial);
                viewModel.mutlilang.defaultLocaleValue(defaltValue);
                viewModel.menuData.setValue("showName",defaltValue);
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
                                viewModel.menuData.createField("name"+item.serial);
                            }
                            viewModel.menuData.createEmptyRow();
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
                                            app: app
                                        });
                                        $(this)[0]['u-meta'] = comp;
                                        app.comps.push(comp);
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
        },
        /**
         * TODO: 加载菜单列表
         */
        loadList: function () {
            var successCallback = function (res) {
                var data = res.data;
                viewModel.menus(data);
                viewModel.menuData.setSimpleData(data[0].premenu);
                viewModel.CurMenu(data[0].premenu);
                viewModel.appDomtitle(viewModel.CurMenu().name || "");

                $("#menuDl>dl:eq(0)").addClass("cur");
            };
            $.ajax({
                type: 'get',
                dataType: 'json',
                contentType: 'application/json',
                url: 'appmenumgr/appmenuTreeList',
                async: true,
                data: null,
                success: function (res) {
                    if (res.status) {
                        u.hideLoader();
                        if (res.RootNode != null) {
                            viewModel.parentId(res.RootNode);
                        }
                        if ((res && res.data == null) || (res.data && res.data.length < 1)) {
                            $("#menuDl").empty().append("<p style='height: 120px;line-height: 120px;text-align: center'>$.i18n.prop('js.wor.sid.0023')</p>");
                        } else {
                            successCallback(res);
                        }
                    } else {
                        alert(res.msg || $.i18n.prop('js.wor.sid.0024'));
                    }
                }
            });

        },
        menus: ko.observableArray([])
    };
    return {
        init: function (content) {
           // 插入内容
            content.innerHTML = html;
            viewModel.initI18n();
            // iuap 前端升级同步更改 wt 20190123
            // window.headerInit($('#sideMenu .apptitle')[0], $.i18n.prop('js.wor.sid.0025','菜单设置'),window.location.href.indexOf("modulefrom=sidebar")>0);

            // 执行主逻辑
            viewModel.pageInit();
            viewModel.initI18n();
        }
    }
});