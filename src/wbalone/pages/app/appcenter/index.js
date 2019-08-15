define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    require('css!./index.css');
    var license = require('../../../tools/license.js');


    var dialogmin = require('dialogmin');
    var app = null;

    var viewModel = {
        areaName:ko.observable('全部应用'),
        areaId:ko.observable(''),
        groupName:ko.observable('请选择分组'),
        groupId:ko.observable(''),
        areaClick:function(obj){
            viewModel.areaName(obj.area.areaName);
            viewModel.areaId(obj.area.id);
            viewModel.groupName('请选择分组');
            viewModel.groupId('');
            viewModel.search.groups(obj.group);
            viewModel.loadappGroups({
                areaId: obj.area.id,
                groupId: ''
            });
        },
        groupClick:function(obj){
            viewModel.groupName(obj.name);
            viewModel.groupId(obj.id);
            viewModel.loadappGroups({
                areaId: viewModel.areaId(),
                groupId: obj.id
            });
        },
        goback: function () {
//            window.history.go(-1);
            window.location.href = "#sysmgr";
            return false;
        },
        /**
         * 页面初始化
         * @return {[type]} [description]
         */
        pageInit: function () {
            app = u.createApp({
                el: '#appCenter',
                model: viewModel
            });

            viewModel.search.init();

            viewModel.loadappGroups({});

        },
        groups: ko.observableArray([]),
        /**
         * 加载角色列表
         * @method function
         * @return {[type]} [description]
         */
        loadappGroups: function (param) {
            //请求数据
            var obj = {
                type: "get",
                url: 'appCenter/list',
                data: {
                    showway: "apparea",
                    areaId: param.areaId ? param.areaId : "",
                    groupId: param.groupId ? param.groupId : ""
                }
            };
            var successCallback = function (res) {
                if (res.status === 1) {
                    var data = res.data;
                    viewModel.groups(data);
                } else {
                    alert(res.msg ? res.msg : "返回错误，请刷新页面")
                }
            };
            u.showLoader();
            $.ajax({
                type: obj.type || 'get',
                dataType: obj.dataType || 'json',
                contentType: 'application/json',
                url: obj.url,
                data: obj.data || '',
                success: function (res) {
                    u.hideLoader();
                    successCallback(res);
                }
            });
        },
        /*
         * search module
         * */
        search: {
            area: ko.observable(),
            group: ko.observable(),
            groups: ko.observableArray(),
            appAreas: ko.observableArray(),
            load: function () {
                $.ajax({
                    url: 'appArea/listWithGroup',
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (result) {
                        if (result.status) {
                            result.data.unshift({
                                area:{
                                    "id" : "",
                                    "areaCode" : "",
                                    "areaName" : "全部应用",
                                    "isenable" : "Y",
                                    "sort" : "1",
                                    "tenantId" : "tenant"
                                },
                                "group" : [ {
                                    "id" : "",
                                    "tenantId" : "tenant",
                                    "name" : "选择分组",
                                    "groupIndex" : 1,
                                    "areaId" : ""
                                }]
                            })

                            viewModel.search.appAreas(result.data);
                        } else {
                            result.msg ? alert(result.msg) : '';
                        }
                    },
                    error: function (e) {
                        alert(e.message || "网络请求失败");
                    }
                })
            },
            init: function () {
                viewModel.search.load();
                var rootDom = $("#appCenter");
                rootDom.on('change', '#s-area', function (e) {
                    var $sel = $(e.target);
                    var data = viewModel.search.appAreas();
                    if ($sel.val() == "") {
                        //设置group为空
                        viewModel.search.groups([]);
                        viewModel.loadappGroups({});

                    } else {
//                        var selArea = data.find(function (item) {
//                            return item.area.id == $sel.val();
//                        });
                        var selGroup = ko.utils.arrayFilter(data, function (item) {
                            return item.area.id == $sel.val();
                        });
                        if (selGroup.length) {
                            viewModel.search.groups(selGroup[0].group || []);
                        }
//                        viewModel.search.groups(selArea.group || []);
                        //todo  ajax
                        viewModel.loadappGroups({
                            areaId: $("#s-area").val()
                        });
                    }
                });
                rootDom.on('change', '#s-group', function (e) {
                    var $sel = $(e.target);
                    var val = $sel.val();
                    //todo  ajax handle
                    viewModel.loadappGroups({
                        areaId: $("#s-area").val(),
                        groupId: $("#s-group").val()
                    });
                });
            }
        },
        /**
         *  bind view  click event
         * */
        show: function (data) {
            var url = data.url;
            var urltype = data.urltype || "";
            var code = data.appCode;
            license.HandleErr(data, function () {
                switch (urltype) {
                    case 'url':
                        window.location.href = '#/ifr/' + encodeURIComponent(encodeURIComponent(url));
                        break;
                    case 'view':
                        window.location.href = "#apps/" + url.replace("#", "").trim();
                        break;
                    case 'plugin':
                        if (!window.router.routes[code]) {
                            window.registerRouter(code, url);
                        }
                        window.location.href = "#/" + code;
                        break;
                    default:
                        window.location.href = '#/ifr/404';
                }
            });

        }
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