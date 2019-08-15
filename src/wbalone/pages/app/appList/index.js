define(function(require, module, exports) {
    require('i18n');
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    require('css!./table.css');
    require('css!./paginate.css');
    require('css!./appadd.css');
	require('css!./appadd.css');
	//require('../../../i18n/jquery.i18n.properties.js');
	//require('../../../i18n/i18n.iuap.js');

	require('css!../../../mutlilang.css');
    var delId = null;
    var delIndex = null;
    var license = require('../../../tools/license.js');

    var dialogmin = require('dialogmin');
	initI18n();
    var viewModel = {
        initI18n: function(){
            initI18n();
        },
        searchAreaClick: function(obj) {
            viewModel.searchareaName(obj.area.areaName);
            viewModel.searchareaId(obj.area.id);
            viewModel.searchgroupId("");
            viewModel.searchgroupName($.i18n.prop('js.app.app.0001'));
            if (obj.area.id) {
                viewModel.search.groups(obj.group);
            } else {
                viewModel.search.groups([]);
                viewModel.searchgroupId('');
                viewModel.searchgroupName($.i18n.prop('js.app.app.0001'));
            }
            viewModel.loadList({});
        },
        searchGroupClick: function(obj) {
            viewModel.searchgroupName(obj.name);
            viewModel.searchgroupId(obj.id);
            viewModel.loadList({});
        },

        areaName: ko.observable($.i18n.prop('js.app.app.0002')),
        areaId: ko.observable(''),
        groupName: ko.observable($.i18n.prop('js.app.app.0001')),
        groupId: ko.observable(''),
        searchareaName: ko.observable($.i18n.prop('js.app.app.0002')),
        searchareaId: ko.observable(''),
        searchgroupName: ko.observable($.i18n.prop('js.app.app.0001')),
        searchgroupId: ko.observable(''),
        areaClick: function(obj) {

            if(viewModel.areaId() !=obj.area.id){
                viewModel.groupName($.i18n.prop('js.app.app.0001'));
                viewModel.groupId("");
            }
            viewModel.areaName(obj.area.areaName);
            viewModel.areaId(obj.area.id);
            viewModel.search.groups(obj.group);

        },
        groupClick: function(obj) {
            viewModel.groupName(obj.name);
            viewModel.groupId(obj.id);
        },
        goback: function() {
            window.history.go(-1);
            return false;
        },
        cancelAdd: function() {
            $("input.appcode").removeAttr("disabled");
            viewModel.areaName('');
            viewModel.areaId('');
            viewModel.groupName('');
            viewModel.groupId('');
            // $("input#s-keyword").val('')
            viewModel.appDomType(true);
            viewModel.app.clear();
            viewModel.loadList({});
        },
        /*
         * search module
         * */

        search: {
            area: ko.observable(),
            group: ko.observable(),
            groups: ko.observableArray(),
            appAreas: ko.observableArray(),
            load: function() {
                $.ajax({
                    url: 'appArea/listWithGroup',
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function(result) {
                        if (result.status) {
                            result.data.unshift({
                                area: {
                                    "id": "",
                                    "areaCode": "",
                                    "areaName": $.i18n.prop('js.app.app.0003'),
                                    "isenable": "Y",
                                    "sort": "1",
                                    "tenantId": "tenant"
                                },
                                "group": [{
                                    "id": "",
                                    "tenantId": "tenant",
                                    "name": $.i18n.prop('js.app.app.0004'),
                                    "groupIndex": 1,
                                    "areaId": ""
                                }]
                            })
                            viewModel.search.appAreas(result.data);
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    },
                    error: function(e) {
                        alert(e.message || $.i18n.prop('js.app.app.0005'));
                    }
                })
            },
            init: function() {
                viewModel.search.load();
                var rootDom = $("#appManager");
                rootDom.on('change', '.add-app select.area', function(e) {
                    var $sel = $(e.target);
                    var data = viewModel.search.appAreas();
                    if ($sel.val() == "") {
                        //设置group为空
                        viewModel.search.groups([]);
                    } else {
                        var selGroup = ko.utils.arrayFilter(data, function(item) {
                            return item.area.id == $sel.val();
                        });
                        if (selGroup.length) {
                            viewModel.search.groups(selGroup[0].group || []);
                        }
                    }
                });

            }
        },
        selected: {
            areaName: ko.observable($.i18n.prop('js.app.app.0002')),
            areaId: ko.observable(''),
            groupName: ko.observable($.i18n.prop('js.app.app.0001')),
            groupId: ko.observable(''),
        },

        /*
         *功能链接类型
         */
        linkType: ko.observableArray([{
                name: $.i18n.prop('js.app.app.0006'),
                value: "view"
            },
            
            {
                name: $.i18n.prop('js.app.app.0007'),
                value: "plugin"
            },
            {
                name: $.i18n.prop('js.app.app.0008'),
                value: "url"
            }
        ]),
        linkTypeValue: ko.observable(),


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
            init: function(config) {
                // init the icons name
                $.each(config.icons, function (i, item) {
                    item.name = $.i18n.prop(item.name);
                });
                var config = $.extend({
                    icons: [{
                        name: $.i18n.prop('js.app.app.0009'),
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
                $.each(config.icons, function(i, item) {
                    hrefs += '<link rel="stylesheet" href="' + item.path + '"/>';
                });
                $("#iconpicker").before($(hrefs));


                config.iconClass = "grey iconfont icon-appicon";
                viewModel.iconFont.loadIconsByuri(config.icons[0]);

                viewModel.iconFont.icons(config.icons);
                viewModel.iconFont.colors(colors);

                viewModel.iconFont.curIcons(config.icons[0]);
                viewModel.iconFont.curIcon({
                    category: $.i18n.prop('js.app.app.0009'),
                    fontClass: "iconfont icon-appicon",
                    name: "appicon"
                });

                viewModel.iconFont.curColor({
                    name: "grey",
                    colorclass: "bg-grey"
                });
                viewModel.iconFont.selVal(config.iconClass);

                $("#sIcon .tab>li:eq(0)").addClass("cur");
            },
            //tab 切换字体库
            tabShow: function(item, e) {
                if (item.name == viewModel.iconFont.curIcons().name) return;
                $("#sIcon .tab>li.cur").removeClass("cur");
                $(e.target).addClass("cur");
                viewModel.iconFont.curIcons(item);
                viewModel.iconFont.loadIconsByuri(item);
            },
            //选择颜色
            selColor: function(data) {
                viewModel.iconFont.curColor(data);
                viewModel.iconFont.selVal(viewModel.iconFont.curIcon().fontClass + " " + viewModel.iconFont.curColor().name);
            },
            //选择图标
            selIcon: function(data) {
                viewModel.iconFont.curIcon(data);
                viewModel.iconFont.selVal(viewModel.iconFont.curIcon().fontClass + " " + viewModel.iconFont.curColor().name || "");
            },
            loadIconsByuri: function(iconsItem) {
                $.ajax({
                    url: iconsItem.path,
                    success: function(res) {
                        var jsonArray = [];
                        var arr = res.substring(res.indexOf("/*icon-class*/"))
                            .replace("/*icon-class*/", "")
                            .trim()
                            .replace(/[\r\n]/g, "")
                            .split("}");
                        $.each(arr, function(i, item) {
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
        /**
         * 加载功能标签
         * */
        appLabel: {
            init: function() {
                viewModel.appLabel.load();
                var combo3 = document.getElementById('combo3')['u.Combo'];
                combo3.setComboData(viewModel.appLabel.Datasource2);
            },
            Datasource2: [],
            appLabelData: new u.DataTable({
                meta: {
                    id: {},
                    code: {},
                    name: {},
                    status: {}
                }
            }),
            load: function() {
                $.ajax({
                    url: 'label/listByGroup',
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: {
                        group: "app"
                    },
                    success: function(result) {
                        if (result.status) {
                            if (result.data.length) {
                                var combo3 = document.getElementById('combo3')['u.Combo'];
                                combo3.setComboData(ko.utils.arrayMap(result.data, function(item) {
                                    item.value = item.code;
                                    return item;
                                }));
                            }
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    }
                })
            }
        },
        /**
         *  功能view类型的参照
         */
        appViewRef: function() {
            $.ajax({
                url: 'wbalyout/listNormalAll',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: null,
                success: function(result) {
                    if (result.status) {
                        if (result.data && result.data.length) {
                            var comboRef = document.getElementById('comboRef')['u.Combo'];
                            comboRef.setComboData(ko.utils.arrayMap(result.data, function(item) {
                                item.value = item.id;
                                return item;
                            }));
                            comboRef.setName($.i18n.prop('js.app.app.0010'));
                        }
                    } else {
                        result.msg ? alert(result.msg) : '';
                    }
                }
            })
        },
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function() {
            window.app = null;
            window.app = u.createApp({
                el: '#appManager',
                model: viewModel
            });
            viewModel.pagination.init();
            // 初次加载数据
            viewModel.loadList({});

            viewModel.appLabel.init();

            var combo5 = document.getElementById('combo5')['u.Combo'];
            combo5.setComboData([{
                    value: 'app',
                    name: $.i18n.prop('js.app.app.0011')
                },
                {
                    value: 'mgr',
                    name: $.i18n.prop('js.app.app.0012')
                }
            ]);
            combo5.selectItem(0);

            viewModel.appViewRef();


            //enanble iscontrol
            viewModel.app.appeditData.on('isControl.valueChange', function(ele) {
                var enableAction = app.getComp('enableAction');
                if (ele.newValue == 'Y') {
                    enableAction.setEnable(true);
                } else {
                    enableAction.setEnable(false);
                }

            });


            //初始化选择图标组件
            /*
             * icons //array 图标资源配置项
             * 1.代表图标库name
             * 2.fontfamily 有意义不能重复，而且和对应css文件fontfamily定义一致
             * 3.图标资源css文件路径
             * */

            viewModel.iconFont.init(require('../../../fonts/iconsConfig.js'));


            //init search
            viewModel.search.init();
            //init mutlilang
            viewModel.mutlilang.init();
            //点击搜索按钮toggle search  panel
            $("#condionSearch").click(function() {
                $("#condition-row").slideToggle("");
            });
            //处理搜索任务
            $("#condition-row")
                .on("keypress", "input", function(event) {
                    if (event.keyCode == 13) {
                        var data = {
                            "keyword": $("input#s-keyword").val(),
                            "pageNum": 1
                        };
                        viewModel.loadList(data);
                    }
                })
                .on("change", "#s-area", function(e) {
                    var $sel = $(e.target);
                    var data = viewModel.search.appAreas();
                    if ($sel.val() == "") {
                        //todo设置group为空
                        viewModel.search.groups([]);
                    } else {
                        var selGroup = ko.utils.arrayFilter(data, function(item) {
                            return item.area.id == $sel.val();
                        });
                        if (selGroup.length) {
                            viewModel.search.groups(selGroup[0].group || []);
                        }
                    }
                    var data = {
                        "keyword": $("input#s-keyword").val(),
                        "pageNum": 1
                    };
                    viewModel.loadList(data);
                })
                .on("change", "#s-group", function(e) {
                    var data = {
                        "keyword": $("input#s-keyword").val(),
                        "pageNum": 1
                    };
                    viewModel.loadList(data);
                });
        },
        afterAdd: function(element, index, row) {
            if (element.nodeType === 1) {
                u.compMgr.updateComp(element);
            }
        },
        /**
         * 删除
         */
        delete: function(index, row, event) {
            viewModel.checkFuncCodeIsReferred(index, row, "del");
        },

        deleteCheckCallBack: function(index, row, result) {
            if (result) {
                u.messageDialog({
                    msg: $.i18n.prop('js.app.app.0013'),
                    title: $.i18n.prop('js.app.app.0014'),
                    btnText: $.i18n.prop('js.app.app.0015')
                });
            } else {
                $("#deleteModal").modal("show");
                delId = row.getValue("id");
                delIndex = index;
            };
        },

        deleteconfirm: function() {
            $("#deleteModal").modal("hide");
            $.ajax({
                url: "appMGT/delete/" + delId,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                success: function(result) {
                    if (result.status) {
                        viewModel.listData.removeRow(delIndex);
                        $("#deleteModal").modal("hide");
                        dialogmin($.i18n.prop('js.app.app.0016'), "tip-suc");
                    } else {
                        result.msg ? dialogmin(result.msg, 'err') : '';
                    }
                },
                error: function(e) {
                    alert(e.message || $.i18n.prop('js.app.app.0005'));
                }
            })
        },
        /**
         * 分页控件
         * @type {Object}
         */
        pagination: {
            element: null,
            // 用于控制分页控件的显示，条目大于10的时候显示控件
            count: ko.observable(0),
            init: function() {
                // 分页控件初始化
                var ele = $('#pagination')[0];
                this.element = new u.pagination({
                    el: ele,
                    pageList: ['5', '10', '15', '20'],
                    jumppage: false,
                    showState: false
                });
                //分页
                this.element.on('pageChange', function(currentPage) {
                    viewModel.loadList({
                        pageNum: currentPage + 1,
                        pageSize: viewModel.pagination.element.options.pageSize
                    });
                });
                this.element.on('sizeChange', function(siz) {
                    viewModel.loadList({
                        pageNum: 1,
                        pageSize: siz - 0
                    });
                });
            }
        },
        /**
         * 加载功能列表
         */
        loadList: function(params) {

            //分页查询时添加上面的搜索条件
            if (params.areaId == undefined) {
                params.areaId = viewModel.searchareaId();
            }
            if (params.groupId == undefined) {
                params.groupId = viewModel.searchgroupId();
            }
            if(!params.areaId)params.groupId ="";
            if (params.keyword == undefined) {
                params.keyword = $("input#s-keyword").val();
            }

            // 查询参数
            var options = {
                "pageNum": params.pageNum || 1,
                "pageSize": params.pageSize || 10,
                "areaId": params.areaId || "",
                "groupId": params.groupId || "",
                "keyword": params.keyword || ""
            };

            //请求数据
            var obj = {
                type: "post",
                url: 'appMGT/pagingList',
                data: options
            };
            var successCallback = function(res) {
                if (res.status === 1) {
                    var data = res.data;
                    viewModel.pagination.element.update({
                        totalPages: data.totalPages,
                        pageSize: data.size,
                        currentPage: data.number + 1,
                        totalCount: data.totalElements
                    });
                    viewModel.listData.setSimpleData(data.content, {
                        unSelect: true
                    });
                    viewModel.pagination.count(data.totalElements);
                } else {
                    alert(res.msg || $.i18n.prop('js.app.app.0017'));
                }
                // 20181114 add by yy  在数据表架子完成后重新渲染一下替换的数据
                assignmentPage();
            };
            //            viewModel.createAjaxFun(obj, successCallback);
            $("#LoadingImage").show();
            $("#emptyImage").hide();
            $('#LoadingImage').parent().find('table tbody').hide();
            $.ajax({
                type: obj.type || 'get',
                dataType: obj.dataType || 'json',
                contentType: 'application/json',
                url: obj.url,
                data: JSON.stringify(obj.data),
                success: function(res) {
                    if (res.status) {
                        $("#LoadingImage").hide();
                        $('#LoadingImage').parent().find('table tbody').show();
                        if ((res && res.data == null) || (res.data && res.data.content.length < 1) || (res.data && res.data.length < 1)) {
                            $('#emptyImage').show();
                        }
                        successCallback(res);
                    } else {
                        alert(res.msg || $.i18n.prop('js.app.app.0017'));
                    }
                }
            });

        },
        /**
         * 加载功能DataTable数据模型
         */
        listData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                appName: {
                    type: 'string'
                },
                groupId: {
                    type: 'string'
                },
                areaId: {
                    type: 'string'
                },
                areaName: {
                    type: 'string'
                },
                groupName: {
                    type: 'string'
                },
                appCode: {
                    type: 'string'
                },
                system: {
                    type: 'string'
                },
                labels: {},
                appDesc: {
                    type: 'string'
                },
                isControl: {
                    type: 'string'
                },
                enableAction: {
                    type: 'string'
                },
                funcUrl: {
                    type: 'string'
                }

            }
        }),
        /**
         * 创建APP对象
         */
        app: {
            area: ko.observable(),
            group: ko.observable(),
            /*创建roleedit数据模型*/
            appeditData: new u.DataTable({
                meta: {
                    addremark: "",
                    appCode: {
                        type: 'string',
                        required: true,
                        nullMsg: $.i18n.prop('js.app.app.0018'),
                        errorMsg: $.i18n.prop('js.app.app.0019'),
                        regExp: /^[A-Za-z0-9][A-Za-z0-9_-]*$/,
                        maxLength: 24,
                        placement: 'top'
                    },
                    appDesc: {
                        type: 'string',
                        nullMsg: $.i18n.prop('js.app.app.0018'),
                        regExp: /^[a-zA-Z0-9\u4E00-\u9FA5_\-]+$/,
                        errorMsg: $.i18n.prop('js.app.app.0020'),
                        maxLength: 100,
                        placement: 'top'
                    },
                    appIcon: {
                        type: 'string'
                    },
                    appIndex: "",
                    appShowName: {
                        type: 'string',
                        required: true,
                        nullMsg: $.i18n.prop('js.app.app.0018'),
                        maxLength: 26,
                        reg: /^[a-zA-Z0-9\u4E00-\u9FA5_\-]+$/,
                        errorMsg: $.i18n.prop('js.app.app.0021'),
                        placement: 'top'
                    },
                    areaId: {
                        type: 'string'
                    },
                    groupId: {
                        type: 'string'
                    },
                    label: [],
                    showway: {
                        type: 'string'
                    },
                    url: {
                        type: 'string',
                        required: true,
                        nullMsg: $.i18n.prop('js.app.app.0018'),
                        errorMsg: $.i18n.prop('js.app.app.0020'),
                        placement: 'top'
                    },
                    urltype: {
                        type: 'string'
                    },
                    version: {
                        type: 'string'
                    },
                    isControl: {
                        type: 'string'
                    },
                    enableAction: {
                        type: 'string'
                    },
                    funcUrl: {
                        type: 'string',
                        nullMsg: $.i18n.prop('js.app.app.0018'),
                        errorMsg: $.i18n.prop('js.app.app.0020'),
                        placement: 'top'
                    }
                }
            }),
            /*fun*/
            getData: function() {
                //add
                //var isControl = app.getComp('isControl');
                //viewModel.app.appeditData.setValue('isControl', isControl.checkedValue?isControl.checkedValue:'N');
                // var enableAction = app.getComp('enableAction');
                //viewModel.app.appeditData.setValue('enableAction', enableAction.enableAction?enableAction.enableAction:'N');
                // var funcUrl = app.getComp('isControl');
                // viewModel.app.appeditData.setValue('isControl', isControl);


                viewModel.app.appeditData.setValue('areaId', viewModel.app.area());
                viewModel.app.appeditData.setValue('groupId', viewModel.app.group());

                viewModel.app.appeditData.setValue('appIcon', viewModel.iconFont.selVal());

                viewModel.app.appeditData.setValue('showway', (function() {
                    var val = $('#combo5 input').val();
                    return val === $.i18n.prop('js.app.app.0011') ? "apparea" : "sysarea";
                })());
                viewModel.app.appeditData.setValue('urltype', viewModel.linkTypeValue());
                if (viewModel.linkTypeValue() == "view") {
                    var comboRef = document.getElementById('comboRef')['u.Combo'];
                    var refValue = comboRef.value;

                    viewModel.app.appeditData.setValue('url', refValue || "");
                }
                var addsaveData = viewModel.app.appeditData.getSimpleData()[0];
                var labels = document.getElementById('combo3')['u.Combo'].value.split(',');
                //uui bug 取得的多选框值会自动加一个，号，使用pop方法移除数组末尾元素
                labels.pop();
                delete addsaveData['labels'];
                addsaveData.label = labels;

                return addsaveData;
            },
            setData: function(editdata, obj) {

                viewModel.app.appeditData.clear();
                viewModel.app.appeditData.setSimpleData(editdata); //存入useredit数据模型中
                var defaltValue = viewModel.app.appeditData.getValue("appName"+viewModel.mutlilang.currentSerial);
                viewModel.app.appeditData.setValue("appShowName",defaltValue);


                var isControl = app.getComp('isControl');
                viewModel.app.appeditData.setValue('isControl', editdata.isControl ? editdata.isControl : 'N');
                var enableAction = app.getComp('enableAction');
                viewModel.app.appeditData.setValue('enableAction', editdata.enableAction ? editdata.enableAction : 'N');


                if (viewModel.app.appeditData.getValue('isControl') == 'Y') {
                    enableAction.setEnable(true);
                } else {
                    enableAction.setEnable(false);
                }
                viewModel.app.area(editdata.areaId);
                $("#appManager .add-app select.area").trigger('change');

                viewModel.app.group(editdata.groupId);

                viewModel.iconFont.selVal(editdata.appIcon);

                var groups =ko.utils.arrayFilter(viewModel.search.appAreas(), function(item) {
                    return item.area.id == editdata.areaId;
                });
                viewModel.search.groups(groups[0].group)
                viewModel.selected.areaName(viewModel.areaName());
                viewModel.selected.areaId(viewModel.areaId());
                viewModel.selected.groupName(viewModel.groupName());
                viewModel.selected.groupId(viewModel.groupId());

                viewModel.areaName(editdata.areaName || obj.areaName);
                viewModel.areaId(editdata.areaId);
                viewModel.groupName(editdata.groupName || obj.groupName);
                viewModel.groupId(editdata.groupId);


                //                viewModel.app.appeditData.setValue('label', "buisource");

                (function() {
                    var combo3 = document.getElementById('combo3')['u.Combo'];
                    combo3.setValue(editdata.labels);
                })();
                (function() {
                    var combo5 = document.getElementById('combo5')['u.Combo'];
                    if (editdata.showway === "apparea") {
                        combo5.selectItem(0);
                    } else {
                        combo5.selectItem(1);
                    }
                })();
                //设置链接类型和地址
                viewModel.linkTypeValue(editdata.urltype);
                if (editdata.urltype == "view") {
                    var comboRef = document.getElementById('comboRef')['u.Combo'];
                    comboRef.setValue(editdata.url);
                }
            },
            clear: function() {
                viewModel.app.appeditData.clear();
                viewModel.app.appeditData.createEmptyRow();
                //clear select
                //todo     clear select
                var enableAction = app.getComp('enableAction');
                enableAction.setEnable(false);
            }
        },
        /**
         * 控制状态
         */
        modal: {
            index: ko.observable(),
            type: ko.observable(true),
            title: ko.observable('')
        },
        /**
         * 新增功能  Handler
         */
        addUser: function() {
            viewModel.appDomType(false);
            viewModel.modal.type(true);
            viewModel.modal.title($.i18n.prop('js.app.app.0023'));

            //新增时重置下拉框选中的数据
            function clearCombo(arrComId) {
                if (arrComId && Array.isArray(arrComId)) {
                    arrComId.forEach(function(item, index, arr) {
                        var combo = document.getElementById(item)['u.Combo'];
                        combo.setValue('');
                    })
                }
            }

            viewModel.app.clear();
            viewModel.app.area('');
            viewModel.linkTypeValue('');
            viewModel.app.appeditData.setValue('isControl','Y');
            var enableAction = app.getComp('enableAction');
            enableAction.setEnable(true);
            var arrComId = ['combo3', 'combo5'];
            clearCombo(arrComId);
            var combo5 = document.getElementById('combo5')['u.Combo'];
            combo5.selectItem(0); //默认选择菜单
            viewModel.areaName($.i18n.prop('js.app.app.0002'));
            viewModel.areaId('');
            viewModel.groupName($.i18n.prop('js.app.app.0001'));
            viewModel.groupId('');
            var groups =ko.utils.arrayFilter(viewModel.search.appAreas(), function(item) {
                return item.area.id == "";
            });
            viewModel.search.groups(groups[0].group)
        },

        /**
         * 保存功能   Handler
         */
        addsave: function() {
            $("input.appcode").removeAttr("disabled");
            var newapp = viewModel.app.getData();

            if (!viewModel.areaId()) {
                dialogmin($.i18n.prop('js.app.app.0024'), "tip-alert");
                return false;
            }
            if (!viewModel.groupId()) {
                dialogmin($.i18n.prop('js.app.app.0024'), "tip-alert");
                return false;
            }
            if (!newapp.label.length) {
                return dialogmin($.i18n.prop('js.app.app.0025'), "tip-alert");
                return false;
            }
            if (!newapp.appShowName) {
                dialogmin($.i18n.prop('js.app.app.0026'), "tip-alert");
                return false;
            }
            if (!viewModel.app.appeditData.getValue("appName"+viewModel.mutlilang.sysDefaultLanguageSerial())) {
                dialogmin(viewModel.mutlilang.sysDefaultLanguageShow()+$.i18n.prop('js.app.app.0026'), "tip-alert");
                return false;
            }
            if(!viewModel.app.appeditData.getValue("appName")){
                dialogmin(viewModel.mutlilang.simpleChineseShow()+$.i18n.prop('js.app.app.0026'), "tip-alert");
                return false;
            }
            if (!newapp.appCode) {
                dialogmin($.i18n.prop('js.app.app.0027'), "tip-alert");
                return false;
            }
            if (!newapp.urltype) {
                dialogmin($.i18n.prop('js.app.app.0028'), "tip-alert");
                return false;
            }
            if (!newapp.url) {
                dialogmin($.i18n.prop('js.app.app.0029'), "tip-alert");
                return false;
            }
            newapp.areaId = viewModel.areaId();
            newapp.groupId = viewModel.groupId();
            if (viewModel.modal.type()) { //true new
                var uri = 'appMGT/create';
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: uri,
                    data: JSON.stringify(newapp),
                    contentType: 'application/json',
                    success: function(res) {
                        if (res.status === 1) {
                            dialogmin($.i18n.prop('js.app.app.0030'), "tip-suc");
                            viewModel.appDomType(true);
                            viewModel.groupId('');
                            viewModel.areaId('');
                            viewModel.areaName($.i18n.prop('js.app.app.0002'));
                            viewModel.groupName($.i18n.prop('js.app.app.0001'));
                            viewModel.loadList({});
                        } else {
                            dialogmin(res.msg, "tip-alert");
                            //                            alert(res.msg || $.i18n.prop('js.app.app.0017'));
                        }
                    }
                });

            } else { //false update
                $.ajax({
                    url: "appMGT/update",
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(newapp),
                    contentType: 'application/json',
                    success: function(result) {
                        if (result.status) {
                            dialogmin($.i18n.prop('js.app.app.0031'), "tip-suc");
                            viewModel.appDomType(true);
                            // router.dispatch('on', '/appmgr');
                            viewModel.groupId('');
                            viewModel.areaId('');
                            viewModel.areaName($.i18n.prop('js.app.app.0002'));
                            viewModel.groupName($.i18n.prop('js.app.app.0001'));
                            viewModel.loadList({});
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    }
                })
            }

        },
        /**
         * 编辑功能   Handler
         */
        useredit: function(index, row) {
            // 校验功能编码是否被引用,如是则功能编码不可编辑
            viewModel.checkFuncCodeIsReferred(index, row, "update");
        },

        updateFunc: function(index, row, result) {
            if (result) {
                $("input.appcode").attr("disabled", "disabled");
            }
            var obj = {
                areaName: row.data.areaName.value,
                groupName: row.data.goupName.value,
            }

            viewModel.appDomType(false);
            viewModel.modal.type(false);
            viewModel.modal.title($.i18n.prop('js.app.app.0032'));

            viewModel.app.clear();

            $.ajax({
                url: "appMGT/findOne/" + row.getValue('id'),
                type: 'GET',
                dataType: 'json',
                async: true,
                contentType: 'application/json',
                success: function(result) {
                    if (result.status) {
                        if (result.data != null) {
                            viewModel.app.setData(result.data, obj);
                        } else {
                            alert($.i18n.prop('js.app.app.0033'))
                        }
                    } else {
                        result.msg ? alert(result.msg) : '';
                    }
                },
                error: function(e) {
                    alert(e.message || $.i18n.prop('js.app.app.0005'));
                }
            });
        },

        /**
         * 检查功能编码是否被引用
         */
        checkFuncCodeIsReferred: function(index, row, type) {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: "appmenumgr/isExistFuncRef?" + "layoutId=" + row.data.appCode.value + "&" + "tenantId=" + row.data.tenantId.value, // FIXME: 1.添加url
                // data: JSON.stringify(json),
                contentType: 'application/json',
                success: function(res) {
                    if (res) {
                        if (type == "update") {
                            viewModel.updateFunc(index, row, res.status == "1" ? true : false);
                        } else {
                            viewModel.deleteCheckCallBack(index, row, res.status == "1" ? true : false);
                        }
                    }
                }
            });
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
                viewModel.app.appeditData.setValue("appName"+viewModel.mutlilang.currentSerial, viewModel.mutlilang.defaultLocaleValue());
            },
            saveValue: function () {
                var defaltValue = viewModel.app.appeditData.getValue("appName"+viewModel.mutlilang.currentSerial);
                viewModel.mutlilang.defaultLocaleValue(defaltValue);
                viewModel.app.appeditData.setValue("appShowName",defaltValue);
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
                                viewModel.app.appeditData.createField("appName"+item.serial);
                            }
                            viewModel.app.appeditData.createEmptyRow();
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
    };

    return {
        init: function(content) {
            // 插入内容
            content.innerHTML = html;
           
            // 执行主逻辑
            viewModel.pageInit();
            viewModel.initI18n();
            viewModel.selected.areaName($.i18n.prop('js.app.app.0002'));
            viewModel.selected.groupName($.i18n.prop('js.app.app.0001'));
            viewModel.areaName($.i18n.prop('js.app.app.0002'));
            viewModel.groupName($.i18n.prop('js.app.app.0001'));
            
             window.headerInit($('#appManager .apptitle')[0], $.i18n.prop('js.app.app.0034'), window.location.href.indexOf("modulefrom=sidebar")>0, function() {
                window.location.href = '#sysmgr';
            });
        }
    }
});
